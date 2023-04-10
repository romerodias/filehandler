<?php

/**
 * @copyright (c) 2014, rdtecnologia.com.br  
 * @license MIT Licence 
 */
class AuthDAO extends Conexao{

  public function verifyUserAcess($user){
    $select = "
			SELECT cont,id FROM permissao WHERE id = ?
		";
    return $this->banco->fetchRow($select,$user);
  }
  
  
  public function deletarUsuario($usuario) {
    $this->banco->delete("permissao","id = '$usuario'");
  }
  
  
  public function listar(){
    $select = "
			SELECT cont,id FROM permissao
		";
    return $this->banco->fetchAll($select);
  }

  
  public function cadastrar($usuario) {
    $this->banco->insert("permissao",array("id" => $usuario["id"]));
  }
  
}