package com.bloodneed.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "donors")
public class Donor {
    @Id
    private String id;
    private String name;
    private String email;
    private String bloodGroup;
    private String location;
    private String phone;
    private boolean available;
    private int totalDonations;
    private LocalDateTime lastDonation;
    private LocalDateTime createdAt;

    public Donor() {}

    public Donor(String name, String email, String bloodGroup, String location, String phone) {
        this.name = name;
        this.email = email;
        this.bloodGroup = bloodGroup;
        this.location = location;
        this.phone = phone;
        this.available = true;
        this.totalDonations = 0;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public int getTotalDonations() { return totalDonations; }
    public void setTotalDonations(int totalDonations) { this.totalDonations = totalDonations; }
    public LocalDateTime getLastDonation() { return lastDonation; }
    public void setLastDonation(LocalDateTime lastDonation) { this.lastDonation = lastDonation; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}