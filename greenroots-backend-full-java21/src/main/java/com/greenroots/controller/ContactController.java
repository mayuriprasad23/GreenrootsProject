package com.greenroots.controller;

import com.greenroots.model.ContactMessage;
import com.greenroots.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactMessageRepository contactRepo;

    @PostMapping("/send")
    public ResponseEntity<String> saveMessage(@RequestBody ContactMessage msg) {
        contactRepo.save(msg);
        return ResponseEntity.ok("✅ Message sent successfully!");
    }
}
