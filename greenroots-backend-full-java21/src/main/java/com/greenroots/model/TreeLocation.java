package com.greenroots.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tree_location")
public class TreeLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Tree name (species)
    private String treeName;

    // Name of location (e.g., Navi Mumbai)
    private String locationName;

    private double latitude;
    private double longitude;

    private String datePlanted;
    

    // Who planted it
    private String plantedByEmail;

    // Getters and Setters
    public Long getId() { return id; }

    public String getTreeName() { return treeName; }
    public void setTreeName(String treeName) { this.treeName = treeName; }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getDatePlanted() { return datePlanted; }
    public void setDatePlanted(String datePlanted) { this.datePlanted = datePlanted; }

    public String getPlantedByEmail() { return plantedByEmail; }
    public void setPlantedByEmail(String plantedByEmail) { this.plantedByEmail = plantedByEmail; }
}
