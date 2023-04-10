<?php

/**
 * @copyright (c) 2014, rdtecnologia.com.br  
 * @license MIT Licence 
 */
class Conexao{

  protected $banco;

  function __construct(){
    try{
      $this->banco = BancoZend::getInstance();
    } catch(Zend_Db_Adapter_Exception $e){
      throw new Exception($e-> getMessage());
    } catch(Zend_Exception $e){
      throw new Exception($e-> getMessage());
    }
  }
}