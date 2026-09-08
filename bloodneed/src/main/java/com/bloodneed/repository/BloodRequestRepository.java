package com.bloodneed.repository;

import com.bloodneed.model.BloodRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BloodRequestRepository extends MongoRepository<BloodRequest, String> {
    List<BloodRequest> findByUrgency(String urgency);
    List<BloodRequest> findByBloodGroup(String bloodGroup);
    List<BloodRequest> findByStatus(String status);
    List<BloodRequest> findAllByOrderByCreatedAtDesc();
}