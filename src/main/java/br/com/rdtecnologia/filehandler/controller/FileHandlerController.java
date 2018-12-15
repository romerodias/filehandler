package br.com.rdtecnologia.filehandler.controller;

import br.com.rdtecnologia.filehandler.core.FileHandler;
import br.com.rdtecnologia.filehandler.service.FileHandlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;

@RestController
@RequestMapping("/file-handler")
@EnableSwagger2
public class FileHandlerController {

    @Autowired
    private FileHandlerService fileHandlerService;

    @GetMapping("/block")
    public void block(@RequestParam("filepath") String filePath) throws FileNotFoundException, UnsupportedEncodingException {

        byte[] decodedBytes = Base64.getDecoder().decode(filePath);
        String filePathDecoded = new String(decodedBytes);

        fileHandlerService.block(new File(new String(filePathDecoded.getBytes("UTF-8"))));
    }

    @GetMapping("/unblock")
    public void unblock(@RequestParam("filepath") String filePath)throws FileNotFoundException, UnsupportedEncodingException {
        byte[] decodedBytes = Base64.getDecoder().decode(filePath);
        String filePathDecoded = new String(decodedBytes);
        fileHandlerService.unblock(new File(new String(filePathDecoded.getBytes("UTF-8"))));
    }
}
