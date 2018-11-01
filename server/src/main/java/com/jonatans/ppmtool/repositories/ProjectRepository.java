package com.jonatans.ppmtool.repositories;

import com.jonatans.ppmtool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


/*@Repository is an annotation that marks the specific class as a Data Access Object, thus clarifying it's role. Other markers
of the same category are @Service and @Controller*/
@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    //find object by using its identifier
    Project findByProjectIdentifier(String projectId);




    // return all objects
    @Override
    Iterable<Project> findAll();

    Iterable<Project> findAllByProjectLeader(String email);
}
