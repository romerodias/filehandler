package br.com.rdtecnologia.filehandler.controller;

import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnList;
import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnTree;
import br.com.rdtecnologia.filehandler.controller.response.DirectoryResponse;
import br.com.rdtecnologia.filehandler.model.ActionOverFile;
import br.com.rdtecnologia.filehandler.repository.ActionOverFileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/audit")
@Slf4j
public class AuditController {

    @Autowired private ActionOverFileRepository actionOverFileRepository;

    @GetMapping
    public JsonReturnList<ActionOverFile> get(
            @RequestParam("absolute_path") String absolutePath) {

        log.info("Start to find log audit for absolute path: {}", absolutePath);

        return new JsonReturnList<ActionOverFile>(
            actionOverFileRepository.findByAbsolutePath(absolutePath)
        );

    }
}
