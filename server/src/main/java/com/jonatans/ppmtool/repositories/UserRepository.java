package com.jonatans.ppmtool.repositories;



import com.jonatans.ppmtool.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    User findByUsername(String username);

    User getById(Long id);

}
