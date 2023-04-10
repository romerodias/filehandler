package br.com.rdtecnologia.filehandler.controller;

import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnTree;
import br.com.rdtecnologia.filehandler.controller.response.DirectoryResponse;
import br.com.rdtecnologia.filehandler.controller.response.FileResponse;
import br.com.rdtecnologia.filehandler.service.FileHandlerService;
import com.google.common.io.Files;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/file-handler")
//@EnableSwagger2
@Slf4j
public class FileHandlerController {

    @Autowired private FileHandlerService fileHandlerService;
    @Value("${base.path}") private String basePath;

    @PostMapping("/block")
    public void block(
        @RequestParam("path") String Path,
        @RequestParam("files") String files)throws FileNotFoundException, UnsupportedEncodingException {

        List<String> filesToBlock = Arrays.asList(files.split(","));

        for(String f: filesToBlock) {
            f = basePath + Path + "/" + f;
            log.info("Start to block file: {}", f);
            fileHandlerService.block(new File(f));
            log.info("Finish to block file: {}", f);
        }
    }

    @PostMapping("/unblock")
    public void unblock(
        @RequestParam("path") String Path,
        @RequestParam("files") String files)throws FileNotFoundException, UnsupportedEncodingException {

        List<String> filesToBlock = Arrays.asList(files.split(","));

        for(String f: filesToBlock) {
            f = basePath + Path + "/" + f;
            log.info("Start to unblock file: {}", f);
            fileHandlerService.unblock(new File(f));
            log.info("Finish to unblock file: {}", f);
        }
    }

    @GetMapping("/list-dir")
    public JsonReturnTree<DirectoryResponse> listDirectories(
        @RequestParam(value = "node", required = false) String node) {

        if(node == null || node.isEmpty())
            node = basePath;
        else
            node = basePath + node;

        log.info("Start to find directories for node: {}", node);

        return new JsonReturnTree<>(
            Arrays.stream(new File(node).listFiles(File::isDirectory))
            .map(d ->
                DirectoryResponse
                    .builder()
                    .id(d.getPath())
                    .text(d.getName())
                    .leaf(false)
                    .cls("folder")
                    .iconCls("")
                    .build()
                )
                .collect(Collectors.toList()));

    }
    @GetMapping("/list-files")
    public JsonReturnTree<FileResponse> listFiles(
        @RequestParam(value = "node", required = false) String node) {

        if(node == null || node.isEmpty())
            node = basePath;
        else
            node = basePath + node;

        log.info("Start to find files for node: {}", node);

        return new JsonReturnTree<>(
            Arrays.stream(new File(node).listFiles(File::isFile))
            .map(d ->
                FileResponse
                    .builder()
                    .id(d.getPath())
                    .text(d.getName())
                    .leaf(true)
                    .cls("")
                    .iconCls("")
                    .canExecute(d.canExecute())
                    .canRead(d.canRead())
                    .canWrite(d.canWrite())
                    .extension(Files.getFileExtension(d.getName()))
                    .build()
                )
                .collect(Collectors.toList()));

    }
}
