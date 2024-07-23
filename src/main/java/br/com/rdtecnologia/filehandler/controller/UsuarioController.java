package br.com.rdtecnologia.filehandler.controller;

import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnList;
import br.com.rdtecnologia.filehandler.controller.converter.JsonReturnSuccess;
import br.com.rdtecnologia.filehandler.model.SystemContract;
import br.com.rdtecnologia.filehandler.model.Usuario;
import br.com.rdtecnologia.filehandler.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/usuario")
public class UsuarioController extends BaseController {

  @Autowired private UsuarioService usuarioService;

  @PostMapping("/salvar")
  public JsonReturnSuccess<Usuario> salvar(@RequestBody Usuario usuario) {
    SystemContract systemContract = new SystemContract();
    systemContract.setId(getUserContractId());
    usuario.setContract(systemContract);
    return new JsonReturnSuccess<>(usuarioService.salvar(usuario));
  }

  @GetMapping("/listar")
  public JsonReturnList<Usuario> listar(
      @RequestParam("start") Integer page,
      @RequestParam("limit") Integer size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
    return new JsonReturnList<>(usuarioService.listar(pageable, getUserContractId()));
  }

  @PostMapping("/deletar")
  public JsonReturnSuccess<Usuario> deletar(@RequestBody Usuario usuario) {
    usuarioService.deletar(usuario);
    return new JsonReturnSuccess<>(usuario);
  }

  @GetMapping("/detalhes")
  public UserDetails userDetails() {
    return getUserSessionDetails();
  }



  @PatchMapping("/{user_id}/activate")
  public JsonReturnSuccess<Usuario> activate(@PathVariable("user_id") Integer userId) {
    Usuario usuario = usuarioService.activate(userId);
    return new JsonReturnSuccess<>(usuario);
  }

  @PatchMapping("/{user_id}/disable")
  public JsonReturnSuccess<Usuario> disable(@PathVariable("user_id") Integer userId) {
    Usuario usuario =  usuarioService.disable(userId);
    return new JsonReturnSuccess<>(usuario);
  }

}