package com.bloodneed.repository;

import com.bloodneed.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DonorRepository extends MongoRepository<Donor, String> {
    List<Donor> findByBloodGroup(String bloodGroup);
    List<Donor> findByAvailable(boolean available);
    List<Donor> findByAvailableAndBloodGroup(boolean available, String bloodGroup);
}