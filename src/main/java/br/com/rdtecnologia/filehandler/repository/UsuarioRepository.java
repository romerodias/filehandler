package br.com.rdtecnologia.filehandler.repository;

import br.com.rdtecnologia.filehandler.model.Usuario;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface UsuarioRepository extends JpaSpecificationExecutor<Usuario>,
		PagingAndSortingRepository<Usuario, Integer> {

	public List<Usuario> findAllByOrderByNameAsc();

	Usuario findByName(String name);
}
