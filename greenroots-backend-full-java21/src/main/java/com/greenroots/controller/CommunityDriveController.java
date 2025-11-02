package com.greenroots.controller;

import com.greenroots.model.CommunityDrive;
import com.greenroots.repository.CommunityDriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community")
@CrossOrigin
public class CommunityDriveController {

    @Autowired
    private CommunityDriveRepository communityDriveRepository;

    @PostMapping("/submit")
    public ResponseEntity<String> submitForm(@RequestBody CommunityDrive drive) {
        communityDriveRepository.save(drive);
        return ResponseEntity.ok("Community plantation request submitted successfully!");
    }
}
