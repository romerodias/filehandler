<?php

/**
 * @copyright (c) 2014, rdtecnologia.com.br  
 * @license MIT Licence 
 */
class AuthBLL{

  public function permiteAcessoMetodo($class = '',$metodo = ''){
    $arrMetodos = $this-> getMethodsFromClass($class);
    return in_array($metodo,$arrMetodos);
  }

  public function autenticar(array $arr = array()){
    include 'cookie/Cookie.php';
    Cookie::setLoginCookie($arr['usuario']);
    $idSistema = 4;
    $usuario = trim(strtolower($arr['usuario']));
    $senha = trim($arr['senha']);
    $erro = "";
    $erro .= ( ! $usuario) ? 'O usuário deve ser preenchido!<br/>': "";
    $erro .= ( ! $senha) ? 'A senha deve ser preenchida!<br/>': "";
    if($erro){
      throw new Exception($erro);
    }
    $authDAO = new AuthDAO();
    $arrUser = $authDAO-> verifyUserAcess($usuario);
    if( ! $arrUser)
      throw new Exception('Permissão negada para acesso a este sistema!');
    LdapBLL::validarUsuario($usuario,$senha);
    $_SESSION['cod_func'] = substr($usuario,2,5);
    Util::successMsg();
  }

  public function verificarSessao(){
    if($_SESSION['cod_func'] != ''){
      return true;
    } else{
      throw new Exception("Seu login é inválido!");
    }
  }

  public static function validarSessao(){
    if($_SESSION['cod_func'] != '')
      return true;
    else
      throw new Exception("Sua sessão expirou! Efetue login!");
  }

  public function sair(){
    $_SESSION["cod_func"] = "";
    session_destroy();
    Util::successMsg();
  }

  public function getClasseUserAcesso(){
    $arrGetClass = array();
    if($_SESSION['arrAuth']['arrMetodosAcessos']){
      $arrClasse = $_SESSION['arrAuth']['arrMetodosAcessos'];
      foreach($arrClasse as $key => $value){
        foreach($value as $k => $v){
          $arrGetClass[$k] = $k;
        }
      }
    }
    return $arrGetClass;
  }

  public function getUserPerfil(){
    return $_SESSION['arrAuth']['idPerfil'];
  }

  public function verificarUserPerfil($idPerfil = null){
    $strIdPerfil = $this-> getUserPerfil();
    if( ! $strIdPerfil){
      return false;
    }
    $arrPerfil = explode(',',$strIdPerfil);
    return in_array($idPerfil,$arrPerfil);
  }

  public function getInfoLogin(){
    echo json_encode(
        array(
            'InfoLogin' =>utf8_encode(Util::abreviarNome(self::getUserName())),
            'idInfo' =>Util::getUserLogado(),
            'menuAcesso' =>$this-> getAcessoMenu()
        ));
  }

  public static function getUserName(){
    return $_SESSION['arrAuth']['arrUserInfo']['NOME'];
  }

  public function getRelatorio(){
    return $_SESSION['arrAuth']['arrAcessoRelatorio'];
  }

  public function temAcessoAoRelatorio($relatorio){
    $arrRelatporios = $this-> getRelatorio();
    return in_array($relatorio,$arrRelatporios);
  }

  public function getMethodsFromClass($className = ''){
    if( ! $className)
      return;
    if( ! $_SESSION['arrAutorizacao'])
      return;
    $arrReturn = array();
    foreach($_SESSION['arrAutorizacao'] as $key => $value){
      foreach($value as $k => $v){
        if($k == $className){
          foreach($v as $methodKey => $methodValue){
            $arrReturn[] = $methodKey;
          }
        }
      }
    }
    return $arrReturn;
  }

  public function getAcessoMetodos($arrData = array()){
    $this-> validarSessao();
    $nomeClasse = trim($arrData['nomeClasse']);
    if( ! $nomeClasse){
      throw new Exception('O nome da classe não foi informado!');
    }
    $arrMetodos = $this-> getMethodsFromClass($nomeClasse);
    echo json_encode($arrMetodos);
  }

  public function verifyUserLogged(){
    include 'cookie/Cookie.php';
    if(Util::getUserLogado())
      Util::successMsg();
    else
      Util::failureMsg(Cookie::getLoginCookie());
  }
  
  public function deletarUsuario($arrData = array()){
    $dao = new AuthDAO();
    $dao->deletarUsuario($arrData['usuario'])
    Util::successMsg();
  }
  
  public function listar(){
    $dao = new AuthDAO();
    echo json_encode($dao->listar());
  }

  public function cadastrar($arrData = array()){
    $dao = new AuthDAO();
    $dao->cadastrar($arrData);
    Util::successMsg();
  }
  
}