package br.com.rdtecnologia.filehandler.repository;

import br.com.rdtecnologia.filehandler.model.File;
import br.com.rdtecnologia.filehandler.model.Perfil;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PerfilRepository extends JpaSpecificationExecutor<Perfil>,
        PagingAndSortingRepository<Perfil, Integer>, CrudRepository<Perfil, Integer> {

}
