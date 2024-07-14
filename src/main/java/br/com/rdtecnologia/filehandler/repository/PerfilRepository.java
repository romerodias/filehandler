package br.com.rdtecnologia.filehandler.repository;

import br.com.rdtecnologia.filehandler.model.Perfil;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface PerfilRepository extends JpaSpecificationExecutor<Perfil>,
        PagingAndSortingRepository<Perfil, Integer> {

}
