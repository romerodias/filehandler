package br.com.rdtecnologia.filehandler.service;

import br.com.rdtecnologia.filehandler.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioService {
	Page<Usuario> listar(Pageable p, String contractId);
	Usuario salvar(Usuario usuario);
	void deletar(Usuario usuario);
	UserDetails userDetails();
	Usuario alterarSenha(Usuario usuario);
	Usuario findByLogin(String login);
	Boolean userHasRole(String role);
	Usuario obterUsuarioLogado();
	Usuario activate(Integer userId);
	Usuario disable(Integer userId);
}
