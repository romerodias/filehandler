package br.com.rdtecnologia.filehandler.repository;

import br.com.rdtecnologia.filehandler.model.ActionOverFile;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ActionOverFileRepository  extends CrudRepository<ActionOverFile, Long> {

    List<ActionOverFile> findByAbsolutePath(String absolutePath);
}