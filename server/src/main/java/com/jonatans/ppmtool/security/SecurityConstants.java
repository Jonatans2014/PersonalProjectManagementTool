package com.jonatans.ppmtool.security;

import java.util.ArrayList;
import java.util.List;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 300_000; //30 seconds
    public static final String tokenSecret= "926D96C90030DD58429D2751AC1BDBBC ";
    public static final long tokenExpirationMsec = 864000000;
    String authorizedRedirectUris = "http://localhost:3000/oauth2/redirect";
    private static final SecurityConstants.OAuth2 oAuth2 = new SecurityConstants.OAuth2();
    /*
    List<String> authorizedRedirectUris = new ArrayList<String>() {{
        add("http://localhost:3000/oauth2/redirect");
        add("myandroidapp://oauth2/redirect");
        add("myiosapp://oauth2/redirect");
    }};
    */

    public static final class OAuth2 {
        List<String> authorizedRedirectUris = new ArrayList<String>() {{
            add("http://localhost:3000/oauth2/redirect");
            add("myandroidapp://oauth2/redirect");
            add("myiosapp://oauth2/redirect");
        }};

        public List<String> getAuthorizedRedirectUris() {
            return authorizedRedirectUris;
        }

        public SecurityConstants.OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
            this.authorizedRedirectUris = authorizedRedirectUris;
            return this;
        }
    }





    public static SecurityConstants.OAuth2 getoAuth2() {
        return oAuth2;
    }


}