package com.greenroots.model;

import jakarta.persistence.*;

@Entity
@Table(name = "corporate_partnerships")
public class CorporatePartnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String contactPerson;
    private String email;
    private String phone;
    private String companySize;
    private String partnershipInterest;
    private int expectedTrees;
    private String timeline;

    @Column(columnDefinition = "TEXT")
    private String message;

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getCompanySize() { return companySize; }
    public void setCompanySize(String companySize) { this.companySize = companySize; }
    public String getPartnershipInterest() { return partnershipInterest; }
    public void setPartnershipInterest(String partnershipInterest) { this.partnershipInterest = partnershipInterest; }
    public int getExpectedTrees() { return expectedTrees; }
    public void setExpectedTrees(int expectedTrees) { this.expectedTrees = expectedTrees; }
    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
