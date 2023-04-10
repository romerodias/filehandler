//package br.com.rdtecnologia.filehandler.application.config;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//import javax.servlet.http.HttpServletResponse;
//import javax.sql.DataSource;
//
////@Configuration
////@EnableWebSecurity
////@ConditionalOnProperty(prefix= "auth.mode.jdbc", name = "SecurityConfigurationJDBC")
//public class SecurityConfigurationJDBC extends WebSecurityConfigurerAdapter {
//
//    @Autowired private DataSource dataSource;
//    @Autowired AuthenticationSuccessHandler authenticationSuccessHandler;
//    @Value("${spring.queries.users-query}") private String usersQuery;
//    @Value("${spring.queries.roles-query}") private String rolesQuery;
//
//  @Override
//  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//      auth
//        .jdbcAuthentication()
//        .usersByUsernameQuery(usersQuery)
//        .authoritiesByUsernameQuery(rolesQuery)
//        .dataSource(dataSource);
//  }
//
//  @Override
//  protected void configure(HttpSecurity http) throws Exception {
//    http
//        .authorizeRequests()
//        //.antMatchers("/").permitAll()
//        .antMatchers("/login.html").permitAll()
//        .antMatchers("/login").permitAll()
//        .antMatchers("/dev").permitAll()
//        .antMatchers("/error").permitAll()
//        .antMatchers("/actuator/prometheus").permitAll()
//        .anyRequest().authenticated()
//
//        .and()
//          .csrf()
//          .disable()
//        .formLogin()
//          .loginPage("/login")
//          .failureUrl("/login?error=true")
//          .usernameParameter("username")
//          .passwordParameter("password")
//          .defaultSuccessUrl("/")
//          .successHandler(authenticationSuccessHandler)
//          .and()
//        .logout()
//            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//            .logoutSuccessUrl("/login").and().exceptionHandling()
//            .accessDeniedHandler((request, response, e)->{
//              response.setContentType("application/json;charset=UTF-8");
//              response.setStatus(HttpServletResponse.SC_FORBIDDEN);
////              try {
////                response.getWriter().write(new JSONPObject().
////                    .put("timestamp", LocalDateTime.now())
////                    .put("message", "Access denied")
////                    .put("context", e.getMessage())
////                    .toString());
////              } catch (Exception ex) {
////                ex.printStackTrace();
////              }
//            })
//            //.and().antMatcher("/dashboard.html").headers().frameOptions().disable().and()
////            .and().headers().frameOptions().sameOrigin()
//    ;
//  }
//
//  @Override
//  public void configure(WebSecurity web) throws Exception {
//      web
//        .ignoring()
//        .antMatchers(
//            "/dashboard.html",
//            "/app.js",
//            "/resources/**",
//            "/extjs/**",
//            "/static/**",
//            "/css/**",
//            "/images/**",
//            "/img/**");
//  }
//}
