package br.com.rdtecnologia.filehandler.core;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;

@Component
@Slf4j
public class FileHandler  {

    public Boolean block(File file) throws FileNotFoundException {
        if (file.exists()) {

            file.setWritable(false, false);
            file.setExecutable(true, false);
            file.setReadable(true, false);

            log.info("File {} canWrite: ", file.getName(), file.canWrite());

            return true;
        } else {
            log.error("File does not exists {} canWrite: ", file.getName());
            throw new FileNotFoundException("Arquivo não encontrado: " + file.getAbsolutePath());
        }
    }

    public Boolean unblock(File file) throws FileNotFoundException {
        if (file.exists()) {
            file.setWritable(true, false);
            file.setExecutable(true, false);
            file.setReadable(true, false);

            log.info("File {} canWrite: ", file.getName(), file.canWrite());
            return true;
        } else {
            log.error("File does not exists {} canWrite: ", file.getName());
            throw new FileNotFoundException("Arquivo não encontrado: " + file.getAbsolutePath());
        }
    }

}
