package com.jonatans.ppmtool.security;

import com.google.gson.Gson;
import com.jonatans.ppmtool.exception.InvalidLoginResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws IOException, ServletException {


        /*
        A servlet is a Java programming language class that is used to extend the capabilities of servers that host
        applications accessed by means of a request-response programming model. Although servlets can respond to any type of request,
        they are commonly used to extend the applications hosted by web servers. For such applications, Java Servlet technology defines HTTP-specific servlet classes.

        The javax.servlet and javax.servlet.http packages provide interfaces and classes for writing servlets.
        All servlets must implement the Servlet interface, which defines life-cycle methods. When implementing a generic service,
        you can use or extend the GenericServlet class provided with the Java Servlet API. The HttpServlet class provides methods,
        such as doGet and doPost, for handling HTTP-specific services.
        https://docs.oracle.com/javaee/5/tutorial/doc/bnafe.html

        HttpServletResponse is a predefined interface present in javax.servlet.http package. It can be said that it is a mirror image of request object.
        The response object is where the servlet can write information about the data it will send back.
        https://www.quora.com/What-is-HttpServletResponse
         */
        //declare login reponse expection
        InvalidLoginResponse loginResponse = new InvalidLoginResponse();
        String jsonLoginResponse = new Gson().toJson(loginResponse);

        //set ocntent type to json
        httpServletResponse.setContentType("application/json");
        httpServletResponse.setStatus(401);
        httpServletResponse.getWriter().print(jsonLoginResponse);


    }
}