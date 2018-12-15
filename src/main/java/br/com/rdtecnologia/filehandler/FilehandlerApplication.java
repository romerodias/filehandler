package br.com.rdtecnologia.filehandler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@ComponentScan({"br.com.rdtecnologia.filehandler"})
@SpringBootApplication
public class FilehandlerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilehandlerApplication.class, args);
	}

}

