package com.jonatans.ppmtool.services;

import com.jonatans.ppmtool.domain.User;
import com.jonatans.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    /*
    The UserDetailsService is a core interface in Spring Security framework, which is used to retrieve the
    user’s authentication and authorization information.

    It has a single read-only method named as loadUserByUsername() which locate the user based on the username.

    This post shows you how to create a custom UserDetailsService for authentication in Spring MVC web application.
    https://www.boraji.com/spring-security-5-custom-userdetailsservice-example
     */

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user==null) new UsernameNotFoundException("User not found");
        return user;
    }


    @Transactional
    public User loadUserById(Long id){
        User user = userRepository.getById(id);
        if(user==null) new UsernameNotFoundException("User not found");
        return user;

    }
}