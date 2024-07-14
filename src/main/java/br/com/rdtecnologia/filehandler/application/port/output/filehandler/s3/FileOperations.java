package br.com.rdtecnologia.filehandler.application.port.output.filehandler.s3;

import br.com.rdtecnologia.filehandler.application.port.output.filehandler.FileHandlerPort;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Path;
import java.util.stream.Stream;

@Component
public class FileOperations implements FileHandlerPort {

    @Value("${file.operations.s3.bucket.name}")
    private String bucketName;

    @Autowired
    public AmazonS3 s3client;

    @Override
    public void createFolder(String folderName) {
        // Create metadata for your folder and set content-length to 0
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(0);
        // Create empty content
        InputStream emptyContent = new ByteArrayInputStream(new byte[0]);
        // Create a PutObjectRequest passing the folder name suffixed by /
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, folderName, emptyContent, metadata);
        // Send request to S3 to create a folder
        s3client.putObject(putObjectRequest);
    }


    @Override
    public void deleteFile(String file) throws IOException {
        s3client.deleteObject(bucketName,file);
    }

    @Override
    public void init() {}

    @Override
    public String store(MultipartFile file) throws Exception {
        s3client.putObject(
            bucketName,
            file.getOriginalFilename(),
            convertMultiPartToFile(file)
        );
        return file.getOriginalFilename();
    }


    @Override
    public String storeToPath(MultipartFile file, String path) throws Exception {
        s3client.putObject(
            bucketName,
                path + file.getOriginalFilename(),
            convertMultiPartToFile(file)
        );
        return file.getOriginalFilename();
    }



    private File convertMultiPartToFile(MultipartFile file ) throws IOException {
        File convFile = new File( file.getOriginalFilename() );
        FileOutputStream fos = new FileOutputStream( convFile );
        fos.write( file.getBytes() );
        fos.close();
        return convFile;
    }

    @Override
    public String store(MultipartFile file, String fileName) throws Exception {
        s3client.putObject(
            bucketName,
            fileName,
            convertMultiPartToFile(file)
        );
        return fileName;
    }

    @Override
    public Stream<Path> loadAll() {
        return null;
    }

    @Override
    public Path load(String filename) {
        File destinationFile = new File(filename);
        try {
            S3Object s3object = s3client.getObject(bucketName, filename);
            S3ObjectInputStream inputStream = s3object.getObjectContent();
            FileUtils.copyInputStreamToFile(inputStream, destinationFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return destinationFile.toPath();
    }

    @Override
    public Path findFilePathByName(String fileName) {
        return null;
    }

    @Override
    public Resource loadAsResource(String filename) {
        return null;
    }

    @Override
    public void deleteAll() {
        String objkeyArr[] = {
            "document/hello.txt",
            "document/pic.png"
        };

        DeleteObjectsRequest delObjReq = new DeleteObjectsRequest("baeldung-bucket")
                .withKeys(objkeyArr);
        s3client.deleteObjects(delObjReq);
    }

    @Override
    public void copy(String fileNameFrom, String fileNameTo) throws IOException {
        s3client.copyObject(
            bucketName,
            fileNameFrom,
            bucketName,
            fileNameTo
        );
    }

    @Override
    public File convertToFilePath(String fileName) {
        return null;
    }

    @Override
    public String getFilePath() {
        return null;
    }
}
