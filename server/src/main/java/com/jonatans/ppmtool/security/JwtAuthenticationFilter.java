package com.jonatans.ppmtool.security;

import com.jonatans.ppmtool.domain.User;
import com.jonatans.ppmtool.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;

import static com.jonatans.ppmtool.security.SecurityConstants.HEADER_STRING;
import static com.jonatans.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;


    // use to fetch a user
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {

            //calling the method to get jwt token
            String jwt = getJWTFromRequest(httpServletRequest);

            //token cannot be null and need to be validated
            if(StringUtils.hasText(jwt)&& tokenProvider.validateToken(jwt)){
                //get our user ID
                Long userId = tokenProvider.getUserIdFromJWT(jwt);

                // then get the user details
                User userDetails = customUserDetailsService.loadUserById(userId);

                //then set up the authentication
                //pass user details and null credentials and a emptylist
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, Collections.emptyList());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }

        }catch (Exception ex){
            logger.error("Could not set user authentication in security context", ex);
        }

        //research about it later
        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }


    //extract JWT token
    private String getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader(HEADER_STRING);

        if(StringUtils.hasText(bearerToken)&&bearerToken.startsWith(TOKEN_PREFIX)){
            return bearerToken.substring(7, bearerToken.length());
        }

        return null;
    }
}