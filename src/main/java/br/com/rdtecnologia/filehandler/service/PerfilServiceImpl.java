package br.com.rdtecnologia.filehandler.service;

import br.com.rdtecnologia.filehandler.model.Perfil;
import br.com.rdtecnologia.filehandler.model.Usuario;
import br.com.rdtecnologia.filehandler.repository.PerfilRepository;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PerfilServiceImpl implements PerfilService {

    @Autowired private PerfilRepository perfilRepository;


    @Override
    public Page<Perfil> listar(Pageable p, String contractId) {
       return perfilRepository.findAll(makeFilter(contractId), p);
    }

    @Transactional
    public Perfil salvar(Perfil perfil) {
        return perfilRepository.save(perfil);
    }

    public void deletar(Perfil perfil) {
        perfilRepository.delete(perfilRepository.findById(perfil.getId()).get());
    }

    @Transactional
    public void deletar(Integer idPerfil) {
        perfilRepository.delete(perfilRepository.findById(idPerfil).get());
    }

    private static Specification<Perfil> makeFilter(String tenantId) {
        return (root, query, builder) -> {
            var predicates = new ArrayList<Predicate>();
            predicates.add(builder.equal(root.get("contractId"), tenantId));
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
