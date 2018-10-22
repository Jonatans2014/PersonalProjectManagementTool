package com.jonatans.ppmtool.services;

import com.jonatans.ppmtool.domain.Project;
import com.jonatans.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/*@Service annotation is used in your service layer and annotates classes that perform service tasks, often you don't use it but in many case you use this annotation to represent a best practice. For example, you could directly call a DAO class to persist an object to your database but this is horrible. It is pretty good to call a service class that calls a DAO. This is
a good thing to perform the separation
of concerns pattern.*/
@Service
public class ProjectService {


    /*@Autowired is an annotation with a completely
    different meaning: it basically tells the DI
    container to inject a dependency.*/

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project){

        //Logic

        return projectRepository.save(project);
    }

}
