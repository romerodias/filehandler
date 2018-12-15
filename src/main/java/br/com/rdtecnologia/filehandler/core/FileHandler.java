package br.com.rdtecnologia.filehandler.core;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;

@Component
public class FileHandler  {

    public Boolean block(File file) throws FileNotFoundException {
        if (file.exists()) {

            System.out.println("canExecute: "  + file.canExecute());
            System.out.println("canRead: "  + file.canRead());
            System.out.println("canWrite: "  + file.canWrite());

            file.setWritable(false, false);
            file.setExecutable(true, false);
            file.setReadable(true, false);
            return true;
        } else {
            throw new FileNotFoundException("Arquivo não encontrado: " + file.getAbsolutePath());
        }
    }

    public Boolean unblock(File file) throws FileNotFoundException {
        if (file.exists()) {

            System.out.println("canExecute: "  + file.canExecute());
            System.out.println("canRead: "  + file.canRead());
            System.out.println("canWrite: "  + file.canWrite());

            file.setWritable(true, false);
            file.setExecutable(true, false);
            file.setReadable(true, false);
            return true;
        } else {
            throw new FileNotFoundException("Arquivo não encontrado: " + file.getAbsolutePath());
        }
    }

}
