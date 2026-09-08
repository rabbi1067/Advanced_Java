package com.bloodneed.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String bloodGroup;
    private String role;
    private String avatar;
    private LocalDateTime joinedAt;
    private int donations;
    private int requestsHelped;
    private boolean emailNotified;
    private boolean smsNotified;
    private boolean darkMode;
    private boolean multiDeviceSync;

    public User() {}

    public User(String name, String email, String password, String bloodGroup) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.bloodGroup = bloodGroup;
        this.role = "user";
        this.avatar = name.substring(0, 1).toUpperCase();
        this.joinedAt = LocalDateTime.now();
        this.donations = 0;
        this.requestsHelped = 0;
        this.emailNotified = true;
        this.smsNotified = false;
        this.darkMode = false;
        this.multiDeviceSync = true;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public LocalDateTime getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }
    public int getDonations() { return donations; }
    public void setDonations(int donations) { this.donations = donations; }
    public int getRequestsHelped() { return requestsHelped; }
    public void setRequestsHelped(int requestsHelped) { this.requestsHelped = requestsHelped; }
    public boolean isEmailNotified() { return emailNotified; }
    public void setEmailNotified(boolean emailNotified) { this.emailNotified = emailNotified; }
    public boolean isSmsNotified() { return smsNotified; }
    public void setSmsNotified(boolean smsNotified) { this.smsNotified = smsNotified; }
    public boolean isDarkMode() { return darkMode; }
    public void setDarkMode(boolean darkMode) { this.darkMode = darkMode; }
    public boolean isMultiDeviceSync() { return multiDeviceSync; }
    public void setMultiDeviceSync(boolean multiDeviceSync) { this.multiDeviceSync = multiDeviceSync; }
}