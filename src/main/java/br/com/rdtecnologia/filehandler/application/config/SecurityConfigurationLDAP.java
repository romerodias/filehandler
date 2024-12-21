package br.com.rdtecnologia.filehandler.application.config;//package br.com.idg.scd.config;
//

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.naming.NamingException;
import javax.sql.DataSource;
import java.util.List;

@Slf4j
@Configuration
//@ConditionalOnProperty("auth.mode.ldap")
public class SecurityConfigurationLDAP {

    @Value("${auth.mode.ldap.user-dn-patterns}") private String userDnPatterns;
    @Value("${auth.mode.ldap.user-search-base}") private String userSearchBase;
    @Value("${auth.mode.ldap.user-search-filter}") private String userSearchFilter;

    @Value("${auth.mode.ldap.group-search-filter}") private String groupSearchFilter;
    @Value("${auth.mode.ldap.group-search-base}") private String groupSearchBase;
	@Value("${auth.mode.ldap.url}") private String url;

	@Autowired private DataSource dataSource;
    @Value("${spring.queries.users-query}") private String usersQuery;
    @Value("${spring.queries.roles-query}") private String rolesQuery;

	@Bean
	public LdapAuthoritiesPopulator ldapAuthoritiesPopulator() {
		return (userData, username) -> {
			if (userData.getDn().toString().contains(LDAP_GROUP_BASE)) {
				return List.of(new SimpleGrantedAuthority("ROLE_USER"));
			} else {
				throw new BadCredentialsException("Usuário não pertence ao grupo necessário para login.");
			}
		};
	}

	@Autowired
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		log.info("Start LDAP Authentication for userDn: {}, userSearch: {}, urL: {}", userDnPatterns, userSearchBase, url);
		auth
			.ldapAuthentication()
			.userDnPatterns("uid={0},ou=usuarios")
			.ldapAuthoritiesPopulator((userData, username) -> {
				log.info("Ldap User: {}",userData);
				if (userData.toString().contains("businessCategory=ged")) {
					return List.of(new SimpleGrantedAuthority("ROLE_USER"));
				} else {
					log.error("Lpda user ({}) doest not have property businessCategory=ged", username);
					throw new BadCredentialsException("Usuário não pertence ao grupo necessário para login.");
				}
            })
			.contextSource()
			.url(url);
	}

	@Bean
	public DefaultSpringSecurityContextSource contextSourceLDAP() {
		return new DefaultSpringSecurityContextSource(url);
	}

	private static final String LDAP_GROUP_BASE = "businessCategory=ged";


	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf().disable()
				.authorizeHttpRequests((requests) -> {
					try {
						requests
						.requestMatchers(AUTH_WHITELIST).permitAll()
						.anyRequest().authenticated()
						.and()
						//.and().csrf().disable()
						.formLogin()
							.loginPage("/login")
							.defaultSuccessUrl("/")
							.failureUrl("/login?error=true")
							.defaultSuccessUrl("/", true)
							.usernameParameter("username")
							.passwordParameter("password")
							.successForwardUrl("/")
							.failureForwardUrl("/login?error=true")
					.and()
						.logout()
						.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
						.logoutSuccessUrl("/login?msg=logout-success").and().exceptionHandling()
						.accessDeniedPage("/login?error=access-denied");
					} catch (Exception e) {
						e.printStackTrace();
					}
				})
		;
		return http.build();
	}

	private static final String[] AUTH_WHITELIST = {
			"/login",
			// -- Swagger UI v2
			"/v2/api-docs",
			"v2/api-docs",
			"/swagger-resources",
			"swagger-resources",
			"/swagger-resources/**",
			"swagger-resources/**",
			"/configuration/ui",
			"configuration/ui",
			"/configuration/security",
			"configuration/security",
			"/swagger-ui.html",
			"swagger-ui.html",
			"webjars/**",
			// -- Swagger UI v3
			"/v3/api-docs/**",
			"v3/api-docs/**",
			"/swagger-ui/**",
			"swagger-ui/**",
			// CSA Controllers
			"/csa/api/token",
			// Actuators
			"/actuator/**",
			"/health/**",
						 "/app.js",
	           "/resources/**",
             "/extjs/**",
             "/static/**",
						 "/css/**",
						 "/images/**",
	    		   "/img/**"
	};


//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http
//				.authorizeRequests()
//				.anyRequest().fullyAuthenticated()
//				.and()
//				.formLogin()
//
//		;
//		return http.build();
//	}

//	@Autowired
//	public void configure(WebSecurity web) throws Exception {
//	    web
//	       .ignoring()
//	       .antMatchers(
//						 "/app.js",
//	           "/resources/**",
//             "/extjs/**",
//             "/static/**",
//						 "/css/**",
//						 "/images/**",
//	    		   "/img/**"
//				 );
//	}
}
