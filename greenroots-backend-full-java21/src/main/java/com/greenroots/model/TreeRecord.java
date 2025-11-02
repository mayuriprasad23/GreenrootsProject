package com.greenroots.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tree_record")
public class TreeRecord {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String fullName;
 private String contactNumber;
 private String treeSpecies;
 private String preferredLocation;
 private String specificLocation;
 private LocalDate datePlanted;
 private String notes;
 private String email;  // user email

 @ManyToOne
 @JoinColumn(name = "user_id")
 private User user;


 // ===== GETTERS & SETTERS =====

 public Long getId() {
  return id;
 }

 public void setId(Long id) {
  this.id = id;
 }

 public String getFullName() {
  return fullName;
 }

 public void setFullName(String fullName) {
  this.fullName = fullName;
 }

 public String getContactNumber() {
  return contactNumber;
 }

 public void setContactNumber(String contactNumber) {
  this.contactNumber = contactNumber;
 }

 public String getTreeSpecies() {
  return treeSpecies;
 }

 public void setTreeSpecies(String treeSpecies) {
  this.treeSpecies = treeSpecies;
 }

 public String getPreferredLocation() {
  return preferredLocation;
 }

 public void setPreferredLocation(String preferredLocation) {
  this.preferredLocation = preferredLocation;
 }

 public String getSpecificLocation() {
  return specificLocation;
 }

 public void setSpecificLocation(String specificLocation) {
  this.specificLocation = specificLocation;
 }

 public LocalDate getDatePlanted() {
  return datePlanted;
 }

 public void setDatePlanted(LocalDate datePlanted) {
  this.datePlanted = datePlanted;
 }

 public String getNotes() {
  return notes;
 }

 public void setNotes(String notes) {
  this.notes = notes;
 }

 public String getEmail() {
  return email;
 }

 public void setEmail(String email) {
  this.email = email;
 }
}
