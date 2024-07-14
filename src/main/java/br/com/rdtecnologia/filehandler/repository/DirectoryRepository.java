package br.com.rdtecnologia.filehandler.repository;

import br.com.rdtecnologia.filehandler.model.Directory;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DirectoryRepository extends CrudRepository<Directory, String> {

    List<Directory> findByParentAndTenantId(String parent, String tenantId);
    Directory findByIdAndTenantId(String id, String tenantId);
}