package com.jonatans.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
public class User implements UserDetails {

    /*
    Provides core user information.
Implementations are not used directly by Spring Security for security purposes. They simply store user information
which is later encapsulated into Authentication objects.
This allows non-security related user information (such as email addresses, telephone numbers etc) to be stored in a convenient location.
Concrete implementations must take particular care to ensure the non-null contract detailed for each method is enforced.
See User for a reference implementation (which you might like to extend or use in your code).
     */



    /*
     For example if we declare a new variable it will add its entry in database. But if a variable is marked @Transient then
      it will not be added in the database. This means it has no persistence representation in that
     hibernate session.
     And after an application is closed these transient objects will be destroyed through garbage collection.
     https://www.quora.com/What-is-Transient-in-Hibernate-What-is-use-of-this
     */

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Email(message = "Username needs to be an email")
        @NotBlank(message = "username is required")
        @Column(unique = true)
        private String username;
        @NotBlank(message = "Please enter your full name")
        private String fullName;
        @NotBlank(message = "Password field is required")
        private String password;
        @Transient
        private String confirmPassword;
        private Date create_At;
        private Date update_At;


    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    //OneToMany with Project
    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();


    //bidirectional with user
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }

    /*
    UserDetails interface methods
     */

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}