package br.com.rdtecnologia.filehandler.core;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.util.HashSet;
import java.util.Set;

@Component
@Slf4j
public class FileHandler  {



    public Boolean block(File file) throws IOException {
        if (file.exists()) {
            Set<PosixFilePermission> crunchifyPermissions = new HashSet<>();

            /* -------------------------- OWNER Permissions ----------------------- */
            // Read permission, owner.
            crunchifyPermissions.add(PosixFilePermission.OWNER_READ);

            /* -------------------------- GROUP Permissions ----------------------- */
            // PosixFilePermission: Defines the bits for use with the permissions attribute.
            // The PosixFilePermissions class defines methods for manipulating set of permissions.
            // Read permission, group.
            crunchifyPermissions.add(PosixFilePermission.GROUP_READ);

            /* -------------------------- OTHERS Permissions ----------------------- */
            // Read permission, others.
            crunchifyPermissions.add(PosixFilePermission.OTHERS_READ);


//            file.setWritable(false, false);
//            file.setExecutable(true, false);
//            file.setReadable(true, false);
            Files.setPosixFilePermissions(Paths.get(file.getPath()), crunchifyPermissions);

            log.info("File {} canWrite: {} - PoxisFilePermission: {}",
                    file.getName(), file.canWrite(), Files.getPosixFilePermissions(Paths.get(file.getPath())));

            return true;
        } else {
            log.error("File does not exists {} canWrite: ", file.getName());
            throw new FileNotFoundException("Arquivo não encontrado: " + file.getAbsolutePath());
        }
    }

    public Boolean unblock(File file) throws IOException {
        if (file.exists()) {
            Set<PosixFilePermission> crunchifyPermissions = new HashSet<>();
            /* -------------------------- OWNER Permissions ----------------------- */
            // Read permission, owner.
            crunchifyPermissions.add(PosixFilePermission.OWNER_READ);
            // Write permission, owner.
            crunchifyPermissions.add(PosixFilePermission.OWNER_WRITE);
            // Execute/search permission, owner.
            crunchifyPermissions.add(PosixFilePermission.OWNER_EXECUTE);

            /* -------------------------- GROUP Permissions ----------------------- */
            // PosixFilePermission: Defines the bits for use with the permissions attribute.
            // The PosixFilePermissions class defines methods for manipulating set of permissions.
            // Read permission, group.
            crunchifyPermissions.add(PosixFilePermission.GROUP_READ);
            // Write permission, group.
            crunchifyPermissions.add(PosixFilePermission.GROUP_WRITE);
            // Execute/search permission, group.
            crunchifyPermissions.add(PosixFilePermission.GROUP_EXECUTE);

            /* -------------------------- OTHERS Permissions ----------------------- */
            // Read permission, others.
            crunchifyPermissions.add(PosixFilePermission.OTHERS_READ);
            // Write permission, others.
            crunchifyPermissions.add(PosixFilePermission.OTHERS_WRITE);
            // Execute/search permission, others.
            crunchifyPermissions.add(PosixFilePermission.OTHERS_EXECUTE);

//            file.setWritable(true, false);
//            file.setExecutable(true, false);
//            file.setReadable(true, false);
            Files.setPosixFilePermissions(Paths.get(file.getPath()), crunchifyPermissions);

            log.info("File {} canWrite: {} - PoxisFilePermission: {}",
                    file.getName(), file.canWrite(), Files.getPosixFilePermissions(Paths.get(file.getPath())));

            return true;
        } else {
            log.error("File does not exists {} canWrite: ", file.getName());
            throw new FileNotFoundException("Arquivo não encontrado: " + file.getAbsolutePath());
        }
    }

}
