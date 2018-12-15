package br.com.rdtecnologia.filehandler.service;

import br.com.rdtecnologia.filehandler.core.FileHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;

@Service
public class FileHandlerService {

    @Autowired
    private FileHandler fileHandler;

    public void block(File file) throws FileNotFoundException {
        fileHandler.block(file);
    }

    public void unblock(File file) throws FileNotFoundException {
        fileHandler.unblock(file);
    }

}
