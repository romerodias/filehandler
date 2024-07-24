package br.com.rdtecnologia.filehandler.service;

import br.com.rdtecnologia.filehandler.model.Perfil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface PerfilService {

    Perfil salvar(Perfil perfil);

   // void deletar(Perfil perfil);

    void deletar(Integer idPerfil);

 //   void adicionarPapel(Integer idPerfil, Integer idPapel);

  //  void removerPapel(Integer idperfil, Integer idPapel);

    Page<Perfil> listar(Pageable p, String contractId);
}
