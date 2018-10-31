package com.jonatans.ppmtool.web;


import com.jonatans.ppmtool.domain.Project;
import com.jonatans.ppmtool.services.MapValidationErrorService;
import com.jonatans.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;


/*@Controller annotation is an annotation used in Spring MVC framework (the component of Spring Framework used to implement Web Application). The @Controller annotation indicates that a particular class serves the role of a controller. The @Controller annotation acts as a stereotype for the annotated class, indicating its role. The dispatcher scans such annotated classes for
mapped methods and detects @RequestMapping annotations.*/


/*@RestController is a convenience annotation that does nothing
  more than adding the @Controller and
  @ResponseBody annotations (see: Javadoc)*/
@RestController
@RequestMapping("/auth")
@CrossOrigin
public class ProjectController {

    /*@Autowired is an annotation with a completely different meaning: it
    basically tells the DI container to inject a dependency.
     */
    //Inject projectSEVICE IN OUR PROJECTController
    @Autowired
    private ProjectService projectService;

    /*ResponseEntity represents an HTTP response, including headers, body, and status. While @ResponseBody puts the return value into the body of the response, ResponseEntity
    also allows us to add headers and status code.
     */

    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    /*Specifically, @PostMapping is a composed annotation that acts as a
    shortcut for @RequestMapping(method = RequestMethod.POST).*/
    // "?" used for generic type

    //principal is a person who is logged inn the owner of the token
    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Project project1 = projectService.saveOrUpdateProject(project, principal.getName());
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }





    //Controller to get an object by ID
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId, Principal principal){

        Project project = projectService.findProjectByIdentifier(projectId, principal.getName());

        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    //Controller to get all Projects
    @GetMapping("/all")
    public Iterable<Project> getAllProjects(Principal principal){return projectService.findAllProjects(principal.getName());}




    //controller to delete a project by using its PIdentifier
    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId, Principal principal){
        projectService.deleteProjectByIdentifier(projectId, principal.getName());

        return new ResponseEntity<String>("Project with ID: '"+projectId+"' was deleted", HttpStatus.OK);
    }
}
