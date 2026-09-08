package com.bloodneed.controller;

import com.bloodneed.model.Donor;
import com.bloodneed.model.BloodRequest;
import com.bloodneed.repository.DonorRepository;
import com.bloodneed.repository.BloodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        try {
            long totalDonors = donorRepository.count();
            long totalRequests = bloodRequestRepository.count();
            long urgentNeeds = bloodRequestRepository.findByUrgency("critical").size();
            long donationsToday = bloodRequestRepository.count();
            stats.put("totalDonors", totalDonors);
            stats.put("totalRequests", totalRequests);
            stats.put("urgentNeeds", urgentNeeds);
            stats.put("donationsToday", donationsToday);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/donors")
    public ResponseEntity<List<Donor>> getAllDonors() {
        return ResponseEntity.ok(donorRepository.findAll());
    }

    @GetMapping("/donors/blood/{bloodGroup}")
    public ResponseEntity<List<Donor>> getDonorsByBloodGroup(@PathVariable String bloodGroup) {
        return ResponseEntity.ok(donorRepository.findByAvailableAndBloodGroup(true, bloodGroup));
    }

    @PostMapping("/donors")
    public ResponseEntity<Map<String, Object>> addDonor(@RequestBody Donor donor) {
        Map<String, Object> response = new HashMap<>();
        try {
            donor.setAvailable(true);
            donor.setTotalDonations(0);
            donor.setCreatedAt(java.time.LocalDateTime.now());
            donorRepository.save(donor);
            response.put("success", true);
            response.put("donor", donor);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/requests")
    public ResponseEntity<List<BloodRequest>> getAllRequests() {
        return ResponseEntity.ok(bloodRequestRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping("/requests")
    public ResponseEntity<Map<String, Object>> createRequest(@RequestBody BloodRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            request.setCreatedAt(java.time.LocalDateTime.now());
            request.setStatus("pending");
            bloodRequestRepository.save(request);
            response.put("success", true);
            response.put("request", request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PutMapping("/requests/{id}")
    public ResponseEntity<Map<String, Object>> updateRequest(@PathVariable String id, @RequestBody Map<String, String> update) {
        Map<String, Object> response = new HashMap<>();
        try {
            var req = bloodRequestRepository.findById(id);
            if (req.isPresent()) {
                BloodRequest r = req.get();
                r.setStatus(update.get("status"));
                bloodRequestRepository.save(r);
                response.put("success", true);
                response.put("request", r);
                return ResponseEntity.ok(response);
            }
            response.put("success", false);
            response.put("error", "Request not found");
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/activity")
    public ResponseEntity<List<Map<String, Object>>> getActivity() {
        try {
            List<Map<String, Object>> activity = new java.util.ArrayList<>();
            List<BloodRequest> requests = bloodRequestRepository.findAllByOrderByCreatedAtDesc();
            List<Donor> donors = donorRepository.findAllByOrderByCreatedAtDesc();
            int reqCount = 0;
            int donCount = 0;
            for (BloodRequest r : requests) {
                if (reqCount >= 5) break;
                Map<String, Object> item = new HashMap<>();
                item.put("type", r.getUrgency().equals("critical") ? "emergency" : "request");
                item.put("text", r.getUrgency().equals("critical") ?
                    "Emergency - " + r.getBloodGroup() + " needed in " + r.getLocation() :
                    "Request - " + r.getName() + " needs " + r.getBloodGroup());
                item.put("time", "Just now");
                item.put("dotColor", r.getUrgency().equals("critical") ? "red" : "blue");
                activity.add(item);
                reqCount++;
            }
            for (Donor d : donors) {
                if (donCount >= 3) break;
                Map<String, Object> item = new HashMap<>();
                item.put("type", "donation");
                item.put("text", "Donation - New donor: " + d.getName());
                item.put("time", "Just now");
                item.put("dotColor", "green");
                activity.add(item);
                donCount++;
            }
            return ResponseEntity.ok(activity);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}