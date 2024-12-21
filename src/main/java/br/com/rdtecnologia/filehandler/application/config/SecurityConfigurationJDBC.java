//package br.com.rdtecnologia.filehandler.application.config;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//
//import javax.sql.DataSource;
//
//@Configuration
//public class SecurityConfigurationJDBC {
//
//    @Autowired private DataSource dataSource;
//    @Autowired AuthenticationSuccessHandler authenticationSuccessHandler;
//    @Value("${spring.queries.users-query}") private String usersQuery;
//    @Value("${spring.queries.roles-query}") private String rolesQuery;
//
//
//    @Autowired
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//      auth
////        .jdbcAuthentication()
////        .usersByUsernameQuery(usersQuery)
////        .authoritiesByUsernameQuery(rolesQuery)
////        .dataSource(dataSource);
////    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////	    http
////            .csrf().disable()
////            .authorizeHttpRequests((requests) -> {
////                try {
////                    requests
////                        .requestMatchers(AUTH_WHITELIST).permitAll()
////                        .anyRequest().authenticated()
////                    .and()
////                    .formLogin()
////                        .loginPage("/login")
////                        .defaultSuccessUrl("/")
////                        .failureUrl("/login?error=true")
////                        .defaultSuccessUrl("/", true)
////                        .successHandler(authenticationSuccessHandler)
////                        .usernameParameter("username")
////                        .passwordParameter("password")
////                        .successForwardUrl("/")
////                        .failureForwardUrl("/login?error=true")
////                .and()
////                    .logout()
////                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
////                    .logoutSuccessUrl("/login?msg=logout-success").and().exceptionHandling()
////                    .accessDeniedPage("/login?error=access-denied");
////                } catch (Exception e) {
////                    e.printStackTrace();
////                }
////            })
////		;
//
//        http.csrf().disable()
//            .authorizeHttpRequests((requests) -> requests
//                .requestMatchers(AUTH_WHITELIST).permitAll()
////                        .requestMatchers("/login/**").permitAll()
////                        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
////                        .requestMatchers("/admin/**").hasAnyRole("ADMIN")
//                .anyRequest().authenticated()
//            )
//            .formLogin((form) -> form
//                    .loginPage("/login")
//                    .loginProcessingUrl("/login")
//                    .defaultSuccessUrl("/")
//                    .permitAll()
//            )
//            .logout((logout) -> logout.permitAll())
//            .exceptionHandling().accessDeniedPage("/access-denied");
//		return http.build();
//    }
//
//
//    private static final String[] AUTH_WHITELIST = {
//        "/login",
//        "/dev",
//        "/error",
//        "/actuator/prometheus",
//        "/v2/api-docs",
//        "v2/api-docs",
//        "/swagger-resources",
//        "swagger-resources",
//        "/swagger-resources/**",
//        "swagger-resources/**",
//        "/swagger-ui.html",
//        "swagger-ui.html",
//        // -- Swagger UI v3
//        "/v3/api-docs/**",
//        "v3/api-docs/**",
//        "/swagger-ui/**",
//        "swagger-ui/**",
//        // CSA Controllers
//        "/csa/api/token",
//        // Actuators
//        "/actuator/**",
//        "/health/**",
//        "/app.js",
//        "/resources/**",
//        "/extjs/**",
//        "/static/**",
//        "/css/**",
//        "/images/**",
//         "/img/**"
//	};
//}
