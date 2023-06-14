package br.com.rdtecnologia.filehandler.service;

import br.com.rdtecnologia.filehandler.core.FileHandler;
import br.com.rdtecnologia.filehandler.model.ActionOverFile;
import br.com.rdtecnologia.filehandler.repository.ActionOverFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class FileHandlerService {

    @Autowired private FileHandler fileHandler;
    @Autowired private ActionOverFileRepository actionOverFileRepository;

    public UserDetails getUserSessionDetails() {
        return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public void block(File file) throws IOException {
        fileHandler.block(file);
        actionOverFileRepository.save(
            ActionOverFile.builder()
                .absolutePath(file.getAbsolutePath())
                .action("BLOCK")
                .date(LocalDateTime.now())
                .file(file.getName())
                .user(getUserSessionDetails().getUsername())
                .build());
    }

    public void unblock(File file) throws IOException {
        fileHandler.unblock(file);
        actionOverFileRepository.save(
            ActionOverFile.builder()
                .absolutePath(file.getAbsolutePath())
                .action("UNBLOCK")
                .date(LocalDateTime.now())
                .file(file.getName())
                .user(getUserSessionDetails().getUsername())
                .build());
    }

}
