package com.bloodneed.controller;

import com.bloodneed.model.User;
import com.bloodneed.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (userRepository.existsByEmail(user.getEmail())) {
                response.put("success", false);
                response.put("error", "Email already registered");
                return ResponseEntity.badRequest().body(response);
            }
            user.setRole("user");
            user.setAvatar(user.getName().substring(0, 1).toUpperCase());
            userRepository.save(user);
            response.put("success", true);
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent() && user.get().getPassword().equals(password)) {
                response.put("success", true);
                response.put("user", user.get());
                return ResponseEntity.ok(response);
            }
            response.put("success", false);
            response.put("error", "Invalid credentials");
            return ResponseEntity.unauthorized().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                response.put("success", true);
                response.put("user", user.get());
                return ResponseEntity.ok(response);
            }
            response.put("success", false);
            response.put("error", "User not found");
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<Map<String, Object>> updateProfile(@PathVariable String id, @RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<User> existing = userRepository.findById(id);
            if (existing.isPresent()) {
                User u = existing.get();
                u.setName(user.getName());
                u.setEmail(user.getEmail());
                u.setBloodGroup(user.getBloodGroup());
                u.setDarkMode(user.isDarkMode());
                u.setMultiDeviceSync(user.isMultiDeviceSync());
                u.setEmailNotified(user.isEmailNotified());
                u.setSmsNotified(user.isSmsNotified());
                userRepository.save(u);
                response.put("success", true);
                response.put("user", u);
                return ResponseEntity.ok(response);
            }
            response.put("success", false);
            response.put("error", "User not found");
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}