package com.jonatans.ppmtool.domain;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Project {

    /*  The @GeneratedValue annotation is to configure the way of increment of the specified column(field). For example when using Mysql, you may specify auto_increment in the definition of table
        to make it self-incremental, and then use
     */
    /*
        The @Idannotation is inherited from javax.persistence.Id， indicating the member field below is the primary key of current entity. Hence your Hibernate and spring framework as well as you can do some reflect works based on this annotation.
        for details please check javadoc for Id
    * */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //refactor this afterwards, really bad
    @NotBlank(message = "Project name is required")
    private String projectName;

    @NotBlank(message = "Project identifier is required")
    @Size(min=4, max=5, message = "Please use 4 to 5 chars")
    @Column(updatable = false, unique = true)
    private String projectIdentifier;

    @NotBlank(message = "Project description is required")
    private String description;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date start_date;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date end_date;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date created_At;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;

    public Project() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }


    /*@PrePersist: The method annotated with @PrePersist in listener bean class is called before persisting
    data by entity manager persist() method. */
    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    /*@PreUpdate: The method annotated with @PreUpdate in listener
    bean class is called before updating data*/
    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }


}
