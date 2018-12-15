package br.com.rdtecnologia.filehandler.controller;

import br.com.rdtecnologia.filehandler.core.FileHandler;
import br.com.rdtecnologia.filehandler.service.FileHandlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.File;

@RestController
@RequestMapping("/file-handler")
@EnableSwagger2
public class FileHandlerController {

    @Autowired
    private FileHandlerService fileHandlerService;

    @PostMapping("/block")
    public void block(@RequestParam("filepath") String filePath) {
        fileHandlerService.block(new File(filePath));
    }

    @PostMapping("/unblock")
    public void unblock(@RequestParam("filepath") String filePath) {
        fileHandlerService.unblock(new File(filePath));
    }
}
