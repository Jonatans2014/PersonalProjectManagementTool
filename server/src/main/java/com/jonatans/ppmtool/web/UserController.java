package com.jonatans.ppmtool.web;


import com.jonatans.ppmtool.domain.User;
import com.jonatans.ppmtool.exception.ResourceNotFoundException;
import com.jonatans.ppmtool.repositories.UserRepository;
import com.jonatans.ppmtool.security.CurrentUser;
import com.jonatans.ppmtool.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
