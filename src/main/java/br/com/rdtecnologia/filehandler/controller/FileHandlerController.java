package br.com.rdtecnologia.filehandler.controller;

import br.com.rdtecnologia.filehandler.application.port.output.filehandler.FileHandlerPort;
import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnList;
import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnSuccess;
import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnTree;
import br.com.rdtecnologia.filehandler.controller.response.DirectoryResponse;
import br.com.rdtecnologia.filehandler.model.Directory;
import br.com.rdtecnologia.filehandler.repository.DirectoryRepository;
import br.com.rdtecnologia.filehandler.repository.FilesRepository;
import br.com.rdtecnologia.filehandler.service.FileHandlerService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermission;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/file-handler")
@Slf4j
public class FileHandlerController extends BaseController {

    @Autowired private FileHandlerService fileHandlerService;
    @Value("${base.path}") private String basePath;

    @Autowired private DirectoryRepository directoryRepository;

    @PostMapping("/block")
    public void block(
        @RequestParam("path") String Path,
        @RequestParam("files") String files) throws IOException {

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
        @RequestParam("files") String files) throws IOException {

        List<String> filesToBlock = Arrays.asList(files.split(","));

        for(String f: filesToBlock) {
            f = basePath + Path + "/" + f;
            log.info("Start to unblock file: {}", f);
            fileHandlerService.unblock(new File(f));
            log.info("Finish to unblock file: {}", f);
        }
    }

    @PostMapping("/directory")
    public void createFolder(
        @RequestParam("name") String name,
        @RequestParam("id") String id) throws IOException {

        String dir = name + "/";

        String parentDirPath = null;

        if(id != null && !id.trim().isEmpty()) {
            parentDirPath = directoryRepository.findByIdAndTenantId(id, getUserContractId()).getPath();
            dir = parentDirPath + name + "/";
        }
        if(id == null || id.isEmpty()) id = null;

        log.info("Start to create folder with name: {}", dir);

        fileHandlerPort.createFolder(dir);

        directoryRepository.save(Directory.builder()
            .createdAt(LocalDateTime.now())
            .parent(id)
            .path(dir)
            .name(name)
            .tenantId(getUserContractId())
            .build());
    }

    @GetMapping("/list-dir")
    public JsonReturnTree<DirectoryResponse> listDirectories(
        @RequestParam(value = "node", required = false) String node) {

        /**
        if(node == null || node.isEmpty())
            node = basePath; // search for root nodes
        else
            node = basePath + node; // for given node, search for its childs
        **/

        if(node == null || node.isEmpty())
            node = null;

        log.info("Start to find directories for node: {}", node);

           List<DirectoryResponse> list =  directoryRepository.findByParentAndTenantId(node, getUserContractId()).stream()
            .map(d ->
                DirectoryResponse
                    .builder()
                    .id(d.getId())
                    .text(d.getName())
                    .leaf(false)
                    .cls("folder")
                    .iconCls("")
                    .build()
                )
                .collect(Collectors.toList());

           list.sort(new Comparator<DirectoryResponse>() {
               @Override
               public int compare(DirectoryResponse o1, DirectoryResponse o2) {
                   return o1.getText().toUpperCase().compareTo(o2.getText().toUpperCase());
               }});

        return new JsonReturnTree<>(list);
    }

    @Autowired private FilesRepository filesRepository;

    @GetMapping("/list-files")
    public JsonReturnList<br.com.rdtecnologia.filehandler.model.File> listFiles(
        @RequestParam(value = "node", required = false) String node) {

        log.info("List files in directory: {} for tenantId: {}", node, getUserContractId());

        return new JsonReturnList<>(filesRepository.findByPathIdAndTenantId(node, getUserContractId()));

//        if(node == null || node.isEmpty())
//            node = basePath;
//        else
//            node = basePath + node;
//
//        log.info("Start to find files for node: {}", node);
//
//        return new JsonReturnTree<>(
//            Arrays.stream(new File(node).listFiles(File::isFile))
//            .map(d ->
//                FileResponse
//                    .builder()
//                    .id(d.getPath())
//                    .text(d.getName())
//                    .leaf(true)
//                    .cls("")
//                    .iconCls("")
//                    .canExecute(d.canExecute())
//                    .canRead(d.canRead())
//                    .canWrite(canWrite(d.toPath()))
//                    .extension(Files.getFileExtension(d.getName()))
//                    .build()
//                )
//                    .sorted(new Comparator<FileResponse>() {
//                        @Override
//                        public int compare(FileResponse o1, FileResponse o2) {
//                            return o1.getText().toUpperCase().compareTo(o2.getText().toUpperCase());
//                        }})
//                .collect(Collectors.toList()));

    }

    public Boolean canWrite(Path path) {
        try {
            return java.nio.file.Files.getPosixFilePermissions(path).contains(PosixFilePermission.GROUP_WRITE);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Autowired private FileHandlerPort fileHandlerPort;

    @GetMapping("/download/{file_id}")
    public void download(HttpServletResponse response, @PathVariable("file_id") String fileId)
        throws IOException, ParseException {

        // TODO permissao

        log.info("Start to download file to file id :{}",fileId);

        br.com.rdtecnologia.filehandler.model.File file = filesRepository.findById(fileId).get();
        Directory dir = directoryRepository.findById(file.getPathId()).get();

        log.info("Start to download file to file id :{} and path: {}",fileId, dir.getPath());

        makeDownload(response,fileHandlerPort.load(dir.getPath() + file.getName()).toFile());
    }


    @DeleteMapping("/{file_id}")
    public JsonReturnSuccess delete(HttpServletResponse response, @PathVariable("file_id") String fileId)
        throws IOException, ParseException {

        //permissao

        //se é do teant

        br.com.rdtecnologia.filehandler.model.File file = filesRepository.findById(fileId).get();
        Directory dir = directoryRepository.findById(file.getPathId()).get();

        log.info("Start to delete file:{} and path: {}",file.getName(), dir.getPath());

        fileHandlerPort.deleteFile(dir.getPath() + file.getName());

        filesRepository.delete(filesRepository.findById(fileId).get());
        return new JsonReturnSuccess(fileId);
    }


    @PostMapping("/upload")
    public void uploadDocumento(
        @RequestParam("documento") MultipartFile file,
        @RequestParam("path") String path ) throws Exception {

        // permissao

        Directory dir = directoryRepository.findByIdAndTenantId(path, getUserContractId());

        log.info("Uplaod od arquivo: {} to path: {}", file.getOriginalFilename(), dir.getPath());

        fileHandlerPort.storeToPath(file, dir.getPath());

        filesRepository.save(br.com.rdtecnologia.filehandler.model.File.builder()
            .name(file.getOriginalFilename())
            .size(file.getSize())
            .tenantId(getUserContractId())
            .pathId(dir.getId())
            .createdAt(LocalDateTime.now())
            .build());
    }
}
