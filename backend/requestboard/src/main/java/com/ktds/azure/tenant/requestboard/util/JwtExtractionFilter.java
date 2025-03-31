package com.ktds.azure.tenant.requestboard.util;
import com.ktds.azure.tenant.requestboard.model.UserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

public class JwtExtractionFilter extends OncePerRequestFilter {

    private static final String AUTH_HEADER = "Authorization";
    private static final String JWT_SECRET = "${jwt.secret}"; // Use a secure key from properties

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = extractTokenFromRequest(request);

        if (token != null) {
            try {
                // Extract claims from token
                Claims claims = Jwts.parser()
                        .setSigningKey(JWT_SECRET)
                        .parseClaimsJws(token)
                        .getBody();

                // Extract user information
                String name = claims.get("name", String.class);
                String email = claims.get("email", String.class);
                String role = claims.get("role", String.class);

                // Store in session
                HttpSession session = request.getSession();
                session.setAttribute("userName", name);
                session.setAttribute("userEmail", email);
                session.setAttribute("userRole", role);

                // Create a user object if you prefer
                UserInfo userInfo = new UserInfo(name, email, role);
                session.setAttribute("userInfo", userInfo);

            } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException |
                     SignatureException | IllegalArgumentException e) {
                // Return error response
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"success\": false, \"message\": \"Invalid token\"}");
                response.setContentType("application/json");
                return;
            }
        } else {
            // No token found, you can either continue or return error based on your requirements
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"success\": false, \"message\": \"No token provided\"}");
            response.setContentType("application/json");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        return request.getHeader(AUTH_HEADER);
    }
}