package com.greenroots.controller;

import com.greenroots.model.EventRegistration;
import com.greenroots.repository.EventRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@CrossOrigin
public class EventRegistrationController {

    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerForEvent(@RequestBody EventRegistration registration) {
        eventRegistrationRepository.save(registration);
        return ResponseEntity.ok("Successfully registered for event!");
    }
}
