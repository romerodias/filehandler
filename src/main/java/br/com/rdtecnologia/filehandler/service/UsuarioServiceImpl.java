package br.com.rdtecnologia.filehandler.service;

import br.com.rdtecnologia.filehandler.model.Usuario;
import br.com.rdtecnologia.filehandler.repository.PerfilRepository;
import br.com.rdtecnologia.filehandler.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UsuarioServiceImpl implements UsuarioService {

  @Autowired private UsuarioRepository usuarioRepository;
  @Autowired private PerfilRepository perfilRepository;
 // @Autowired private FuncionarioRepository funcionarioRepository;


  @Override
  public Page<Usuario> listar(Pageable p, String contractId) {
//    BaseJpaSpecification<Usuario> spec1 = new BaseJpaSpecification<>(
//            new SpecSearchCriteria("contract.id", SearchOperation.EQUALITY, contractId));
//
//    Specifications<Usuario> specifications = Specifications.where(spec1);
//
//    return usuarioRepository.findAll(specifications, p);
    return null;
  }

  @Override
  @Transactional
  public Usuario salvar(Usuario usuario) {
//    if (usuario.getId() == null) {
//      usuario.setFuncionario(funcionarioRepository.findById(usuario.getFuncionario().getId()).get());
//      usuario.setPerfil(perfilRepository.findById(usuario.getPerfil().getId()).get());
//      usuario.setActive(1);
//      usuario.setPassword("{noop}" + usuario.getPassword());
//      return usuarioRepository.save(usuario);
//    } else {
//      Usuario usuarioEditar = usuarioRepository.findById(usuario.getId()).get();
//      usuarioEditar.setPerfil(usuario.getPerfil());
//
//      if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
//        usuarioEditar.setPassword("{noop}" + usuario.getPassword());
//      }
//      return usuarioEditar;
//    }
    return null;
  }

  @Override
  @Transactional
  public Usuario alterarSenha(Usuario usuario) {
      Usuario usuarioEditar = findByLogin(usuario.getName());
      usuarioEditar.setPassword("{noop}" + usuario.getPassword());
      return usuarioEditar;
  }

  @Override
  public Usuario findByLogin(String login) {
    return usuarioRepository.findByName(login);
  }

  @Override
  public void deletar(Usuario usuario) {
    //usuarioRepository.delete(usuarioRepository.findById(usuario.getId()).get());
  }

  public UserDetails userDetails() {
    return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  @Override
  public Boolean userHasRole(String role) {
    return userDetails().getAuthorities().contains(new SimpleGrantedAuthority(role));
  }

  public Usuario obterUsuarioLogado() {
    UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return findByLogin(user.getUsername());
  }

  @Override
  @Transactional
  public Usuario activate(Integer userId) {
//    log.info("Start to activate a userId: {}", userId);
//    Usuario usuario = usuarioRepository.findById(userId).get();
//    usuario.setActive(1);
//    log.info("Finish to activate a userId: {}", userId);
//    return usuario;
    return null;
  }

  @Override
  @Transactional
  public Usuario disable(Integer userId) {
//    log.info("Start to disable a userId: {}", userId);
//    Usuario usuario = usuarioRepository.findById(userId).get();
//    usuario.setActive(0);
//    log.info("Finish to disable a userId: {}", userId);
//    return usuario;
    return null;
  }
}
