package com.jonatans.ppmtool.services;

import com.jonatans.ppmtool.domain.Backlog;
import com.jonatans.ppmtool.domain.Project;
import com.jonatans.ppmtool.exception.ProjectIdException;
import com.jonatans.ppmtool.repositories.BacklogRepository;
import com.jonatans.ppmtool.repositories.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;


/*The @Service annotation is also a specialization of the component annotation.
It doesn’t currently provide any additional behavior over the @Component annotation,
but it’s a good idea to use @Service over @Component in service-layer classes because it specifies intent better.
Additionally, tool support and additional behavior might rely on it in the future.*/

@Service
public class ProjectService {


    //Inject ProjectRepo to projectService
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            //if project id is null then set the backlog
            //set a new backlog only if there is a new project
              if(project.getId()==null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }


            //when project is updated is return a null backlog so set it back
            //set the backlog when updating a project
            if(project.getId()!=null){
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }



            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }


    }


    //Find the object by using its ID
    public Project findProjectByIdentifier(String projectId){

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        //if there is not object witth the rigth id, show an error msg.
        if(project == null){
            throw new ProjectIdException("Project ID '"+projectId+"' does not exist");

        }


        return project;
    }



    /*
        With iterable, it return a json object that has all the json
        elements or all the objects within that list that we want to display in this case
        we want to see a list
     */
    // return all objects

    public Iterable<Project> findAllProjects()
    {
        return projectRepository.findAll();
    }


    //delete a project from the db by using the identifier
    public void deleteProjectByIdentifier(String projectid){
        Project project = projectRepository.findByProjectIdentifier(projectid.toUpperCase());

        if(project == null){
            throw  new ProjectIdException("Cannot Project with ID '"+projectid+"'. This project does not exist");
        }

        projectRepository.delete(project);
    }
}
