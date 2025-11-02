package com.greenroots.controller;

import com.greenroots.model.User;
import com.greenroots.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Constructor injection (preferred)
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Register a user. Expects JSON body:
     * { "name":"...", "email":"...", "password":"..." }
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        // simple validation
        if (user.getEmail() == null || user.getPassword() == null || user.getName() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        // check duplicate
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // save user (using BCrypt for password)
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        saved.setPassword(null); // do not return password in response
        return ResponseEntity.ok(saved);

    }

    /**
     * Login endpoint. Expects JSON body:
     * { "email":"...", "password":"..." }
     * Returns user JSON (password omitted) on success.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        if (loginData.getEmail() == null || loginData.getPassword() == null) {
            return ResponseEntity.badRequest().body("Missing email or password");
        }

        Optional<User> maybe = userRepository.findByEmail(loginData.getEmail());

        if (maybe.isPresent() && passwordEncoder.matches(loginData.getPassword(), maybe.get().getPassword())) {
            User user = maybe.get();
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }


        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
