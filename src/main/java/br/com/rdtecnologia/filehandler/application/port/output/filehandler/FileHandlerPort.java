package br.com.rdtecnologia.filehandler.application.port.output.filehandler;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface FileHandlerPort {
    void createFolder(String folderName);

    void deleteFile(String file) throws IOException;

    void init();

    String store(MultipartFile file) throws Exception;

    String storeToPath(MultipartFile file, String path) throws Exception;

    String store(MultipartFile file, String fileName) throws Exception;

    Stream<Path> loadAll();

    Path load(String filename);

    Path findFilePathByName(String fileName);

    Resource loadAsResource(String filename);

    void deleteAll();

    void copy(String fileNameFrom, String fileNameTo) throws IOException;

    File convertToFilePath(String fileName);

    String getFilePath();
}