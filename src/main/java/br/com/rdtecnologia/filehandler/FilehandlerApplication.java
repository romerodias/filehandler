package br.com.rdtecnologia.filehandler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@ComponentScan({"br.com.rdtecnologia.filehandler"})
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class,ManagementWebSecurityAutoConfiguration.class})
public class FilehandlerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilehandlerApplication.class, args);
	}

}

