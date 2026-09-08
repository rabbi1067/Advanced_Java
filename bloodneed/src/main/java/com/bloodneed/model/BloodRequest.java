package com.bloodneed.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.PrePersist;
import java.time.LocalDateTime;

@Document(collection = "blood_requests")
public class BloodRequest {
    @Id
    private String id;
    private String name;
    private String bloodGroup;
    private String location;
    private String phone;
    private String urgency;
    private String description;
    private LocalDateTime createdAt;
    private String status;
    private String matchedDonorId;

    public BloodRequest() {}

    public BloodRequest(String name, String bloodGroup, String location, String phone, String urgency, String description) {
        this.name = name;
        this.bloodGroup = bloodGroup;
        this.location = location;
        this.phone = phone;
        this.urgency = urgency;
        this.description = description;
        this.status = "pending";
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMatchedDonorId() { return matchedDonorId; }
    public void setMatchedDonorId(String matchedDonorId) { this.matchedDonorId = matchedDonorId; }
}