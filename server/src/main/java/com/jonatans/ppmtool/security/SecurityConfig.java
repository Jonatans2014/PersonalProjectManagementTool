package com.jonatans.ppmtool.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;




/*

Spring @Configuration annotation is part of the spring core framework. Spring Configuration annotation indicates that the class has @Bean definition methods. So Spring container can process the class and generate Spring Beans to be used in the application.

Spring @Configuration
Spring @Configuration annotation allows us to use annotations for dependency injection. Let’s understand how to create Spring Configuration classes.
https://www.journaldev.com/21033/spring-configuration-annotation
 */

/*

down vote
accepted
The @EnableWebSecurity is a marker annotation. It allows Spring to find (it's a @Configuration and, therefore, @Component) and automatically apply the class to the global WebSecurity.

If I don't annotate any of my class with @EnableWebSecurity still the application prompting for username and password.

Yes, it is the default behavior. If you looked at your classpath, you could find other classes marked with that annotation (depends on your dependencies):

SpringBootWebSecurityConfiguration;
FallbackWebSecurityAutoConfiguration;
WebMvcSecurityConfiguration.

https://stackoverflow.com/questions/44671457/what-is-the-use-of-enablewebsecurity-in-sprin
 */

/*
    EnableWebSecurity will provide configuration via HttpSecurity providing the configuration you could find with <http></http> tag in xml configuration, it's allow you to configure your access based on urls patterns, the authentication endpoints, handlers etc...

EnableGlobalMethodSecurity provides AOP security on methods, some of annotation it will enable are PreAuthorize PostAuthorize also it has support for JSR-250. There is also more parameters in configuration for you

For your needs, it's better mix the two. With REST you can achieve all you need only with @EnableWebSecurity, since HttpSecurity#antMatchers(HttpMethod,String...) accepts controls over Http methods
    https://stackoverflow.com/questions/29721098/enableglobalmethodsecurity-vs-enablewebsecurity
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .headers().frameOptions().sameOrigin() //To enable H2 Database
                .and()
                .authorizeRequests()
                .antMatchers(
                        "/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()
                .anyRequest().authenticated();
    }
}