package br.com.rdtecnologia.filehandler.controller;

import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnList;
import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnSuccess;
import br.com.rdtecnologia.filehandler.model.Perfil;
import br.com.rdtecnologia.filehandler.service.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfil")
@CrossOrigin
public class PerfilController extends BaseController {

  @Autowired private PerfilService perfilService;


  @PostMapping("/salvar")
  public JsonReturnSuccess<Perfil> salvar(@RequestBody Perfil perfil) {
    perfil.setContractId(getUserContractId());
    Perfil p = perfilService.salvar(perfil);
    return new JsonReturnSuccess<>(p);
  }

  @GetMapping("/listar")
  public JsonReturnList<Perfil> listar(
          @RequestParam("start") Integer page,
          @RequestParam("limit") Integer size) {

    Pageable pageable = PageRequest.of(page, size, Sort.by("id"));
    List<Perfil> atividadeList = perfilService.listar(pageable, getUserContractId()).getContent();
    return new JsonReturnList<>(atividadeList.size(), atividadeList);
  }

  @DeleteMapping("/{idPerfil}")
  public JsonReturnSuccess deletar(@PathVariable("idPerfil") Integer idPerfil) {
    perfilService.deletar(idPerfil);
    return new JsonReturnSuccess();
  }


}