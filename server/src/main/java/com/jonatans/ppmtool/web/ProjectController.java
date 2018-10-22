package com.jonatans.ppmtool.web;


import com.jonatans.ppmtool.domain.Project;
import com.jonatans.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


/*@Controller annotation is an annotation used in Spring MVC framework (the component of Spring Framework used to implement Web Application). The @Controller annotation indicates that a particular class serves the role of a controller. The @Controller annotation acts as a stereotype for the annotated class, indicating its role. The dispatcher scans such annotated classes for
mapped methods and detects @RequestMapping annotations.*/


/*@RestController is a convenience annotation that does nothing
  more than adding the @Controller and
  @ResponseBody annotations (see: Javadoc)*/
@RestController
@RequestMapping("/api/project")
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


    /*Specifically, @PostMapping is a composed annotation that acts as a
    shortcut for @RequestMapping(method = RequestMethod.POST).*/
    @PostMapping("")
    // "?" used for generic type
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result){

        //Traverse trough the getFieldErros and
        //return the right error messages
        if(result.hasErrors()){
            Map<String, String> errorMap = new HashMap<>();

            for(FieldError error: result.getFieldErrors()){
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
        }
        Project project1 = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }
}
