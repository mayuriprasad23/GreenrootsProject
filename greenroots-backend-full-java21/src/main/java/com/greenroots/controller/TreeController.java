package com.greenroots.controller;

import com.greenroots.model.TreeLocation;
import com.greenroots.model.TreeRecord;
import com.greenroots.repository.TreeLocationRepository;
import com.greenroots.repository.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tree")
@CrossOrigin
public class TreeController {

    @Autowired
    private TreeRepository treeRepository;

    @Autowired
    private TreeLocationRepository treeLocationRepository;

    // ✅ Save Tree & Map Coordinates
    @PostMapping("/plant")
    public ResponseEntity<String> saveTree(@RequestBody TreeRecord record) {

        // Save Tree details
        treeRepository.save(record);

        // AUTO-ASSIGN Coordinates based on location name
        double lat = 0.0, lng = 0.0;

        switch (record.getPreferredLocation()) {
            case "South Mumbai": lat = 18.921984; lng = 72.834654; break;
            case "Central Mumbai": lat = 19.018300; lng = 72.844000; break;
            case "Western Suburbs": lat = 19.145000; lng = 72.835000; break;
            case "Eastern Suburbs": lat = 19.075800; lng = 72.908300; break;
            case "Navi Mumbai": lat = 19.033000; lng = 73.029700; break;
            case "Thane": lat = 19.218300; lng = 72.978100; break;
            default: lat = 19.0760; lng = 72.8777; // Mumbai default
        }

        // Save Map Location in tree_location table
        TreeLocation loc = new TreeLocation();
        loc.setTreeName(record.getTreeSpecies());
        loc.setLocationName(record.getPreferredLocation());
        loc.setLatitude(lat);
        loc.setLongitude(lng);
        loc.setDatePlanted(record.getDatePlanted().toString());

        loc.setPlantedByEmail(record.getEmail());

        treeLocationRepository.save(loc);

        return ResponseEntity.ok("Tree planted & mapped successfully!");
    }

    // ✅ Get all tree markers for Map
    @GetMapping("/locations")
    public List<TreeLocation> getTreeLocations() {
        return treeLocationRepository.findAll();
    }
}
