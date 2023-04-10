<?php

/**
 * @copyright (c) 2014, rdtecnologia.com.br  
 * @license MIT Licence 
 */
class LdapBLL{

  private static $conection;

  const DC = 'id';

  const MAX_LENGTH_PW = 6;

  private $ldapIpAddr = "10.10.10.29";

  private static function conectar(){
    self::$conection = ldap_connect(sprintf("ldap://%s","10.10.10.29"),389);
    ldap_set_option(self::$conection,LDAP_OPT_PROTOCOL_VERSION,3);
  }

  public static function validarUsuario($usr,$pwd){
    self::conectar();
    if((@ldap_bind(self::$conection,"uid=$usr,ou=usuarios,dc=id",$pwd))){
      $query2 = "(&(uid=$usr))";
      $result = ldap_search(self::$conection,"dc=id",$query2);
      $info = ldap_get_entries(self::$conection,$result);
      $_SESSION["nome"] = $info[0]["displayname"][0];
      $_SESSION["id"] = $usr;
      return true;
    } else{
      throw new Exception(ldap_error(self::$conection));
    }
  }

  public static function getUserEmail($user){
    if( ! $user){
      exit(0);
    }
    self::conectar();
    $query2 = "uid=id$user";
    $result = ldap_search(self::$conection,"dc=id",$query2);
    $info = ldap_get_entries(self::$conection,$result);
    return $info[0]['mail'][0];
  }

  public static function changePassword($user,$oldPassword,$newPassword,$confirmNewPassword){
    if(strcmp($newPassword,$confirmNewPassword) !== 0)
      throw new Exception('Digite a senha novamente!');
    if(strlen($newPassword) < self::MAX_LENGTH_PW)
      throw new Exception(
          sprintf('Sua senha deve contar no mínimo %d caracteres.',
              self::MAX_LENGTH_PW));
    self::validarUsuario($user,$oldPassword);
    $dn = "ui=$user,ou=usuarios,dc={" . self::DC . "}";
    $arrEntry = array(
        'userPassword' =>$newPassword
    );
    return ldap_mod_replace(self::$conection,$dn,$arrEntry);
  }
} 
