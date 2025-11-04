package com.greenroots.controller;

import com.greenroots.model.CorporatePartnership;
import com.greenroots.repository.CorporatePartnershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/corporate")
@CrossOrigin
public class CorporatePartnershipController {

    @Autowired
    private CorporatePartnershipRepository repo;

    @PostMapping("/request")
    public ResponseEntity<String> saveRequest(@RequestBody CorporatePartnership partnership) {
        repo.save(partnership);
        return ResponseEntity.ok("✅ Partnership request submitted!");
    }
}

