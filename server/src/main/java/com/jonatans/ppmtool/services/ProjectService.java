package com.jonatans.ppmtool.services;

import com.jonatans.ppmtool.domain.Backlog;
import com.jonatans.ppmtool.domain.Project;
import com.jonatans.ppmtool.domain.User;
import com.jonatans.ppmtool.exception.ProjectIdException;
import com.jonatans.ppmtool.exception.ProjectNotFoundException;
import com.jonatans.ppmtool.repositories.BacklogRepository;
import com.jonatans.ppmtool.repositories.ProjectRepository;
import com.jonatans.ppmtool.repositories.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/*The @Service annotation is also a specialization of the component annotation.
It doesn’t currently provide any additional behavior over the @Component annotation,
but it’s a good idea to use @Service over @Component in service-layer classes because it specifies intent better.
Additionally, tool support and additional behavior might rely on it in the future.*/

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserAuthRepository UserAuthRepository;

    public Project saveOrUpdateProject(Project project, String email){
        try{


            if(project.getId() != null){
                Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
                if(existingProject !=null &&(!existingProject.getProjectLeader().equals(email))){
                    throw new ProjectNotFoundException("Project not found in your account");
                }else if(existingProject == null){
                    throw new ProjectNotFoundException("Project with ID: '"+project.getProjectIdentifier()+"' cannot be updated because it doesn't exist");
                }
            }

            //set the one to many relationship User and the Project entities
            User user = UserAuthRepository.findByEmail(email);
            project.setUser(user);
            project.setProjectLeader(user.getEmail());
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            if(project.getId()==null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            if(project.getId()!=null){
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);

        }catch (Exception e){
            throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists");
        }

    }


    public Project findProjectByIdentifier(String projectId, String email){

        //Only want to return the project if the user looking for it is the owner

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdException("Project ID '"+projectId+"' does not exist");

        }

        if(!project.getProjectLeader().equals(email)){
            throw new ProjectNotFoundException("Project not found in your account");
        }



        return project;
    }

    public Iterable<Project> findAllProjects(String email){
        return projectRepository.findAllByProjectLeader(email);
    }


    public void deleteProjectByIdentifier(String projectid, String email){


        projectRepository.delete(findProjectByIdentifier(projectid, email));
    }

}
