//package com.greenroots.model;
//
//public class CommunityDrive {
//
//    private int id;
//    private String name;
//    private String email;
//    private String phone;
//    private String organization;
//    private String preferredArea;
//    private String participationType; // "I want to"
//    private String message;
//
//    // Getters & Setters
//    public int getId() { return id; }
//    public void setId(int id) { this.id = id; }
//
//    public String getName() { return name; }
//    public void setName(String name) { this.name = name; }
//
//    public String getEmail() { return email; }
//    public void setEmail(String email) { this.email = email; }
//
//    public String getPhone() { return phone; }
//    public void setPhone(String phone) { this.phone = phone; }
//
//    public String getOrganization() { return organization; }
//    public void setOrganization(String organization) { this.organization = organization; }
//
//    public String getPreferredArea() { return preferredArea; }
//    public void setPreferredArea(String preferredArea) { this.preferredArea = preferredArea; }
//
//    public String getParticipationType() { return participationType; }
//    public void setParticipationType(String participationType) { this.participationType = participationType; }
//
//    public String getMessage() { return message; }
//    public void setMessage(String message) { this.message = message; }
//}
package com.greenroots.model;

import jakarta.persistence.*;

@Entity
@Table(name = "community_drive")
public class CommunityDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String organization;
    private String preferredArea;
    private String participationType;
    private String message;

    // ✅ Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getPreferredArea() { return preferredArea; }
    public void setPreferredArea(String preferredArea) { this.preferredArea = preferredArea; }

    public String getParticipationType() { return participationType; }
    public void setParticipationType(String participationType) { this.participationType = participationType; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
