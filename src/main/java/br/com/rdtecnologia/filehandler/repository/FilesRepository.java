package br.com.rdtecnologia.filehandler.repository;

import br.com.rdtecnologia.filehandler.model.File;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FilesRepository extends CrudRepository<File, String> {

    List<File> findAll();

    File findByName(String name);

    List<File> findByPathIdAndTenantId(String pathId, String tenantId);
}