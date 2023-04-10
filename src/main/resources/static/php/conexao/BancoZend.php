<?php

/**
 * @copyright (c) 2014, rdtecnologia.com.br  
 * @license MIT Licence 
 */
class BancoZend{

  private static $instance;

  private static $teste;

  private function __construct(){}

  private static function setInstance(){
    if( ! self::$instance){
      try{
        self::$instance = Zend_Db::factory('Pdo_Mysql',
            array(
                'host' =>Config::getValue('DB','host'),
                'dbname' =>Config::getValue('DB','dbname'),
                'username' =>Config::getValue('DB','username'),
                'password' =>Config::getValue('DB','password'),
                'port' =>Config::getValue('DB','port'),
                'profiler' =>true
            ));
      } catch(Zend_Db_Adapter_Exception $e){
        throw new Exception($e-> getMessage());
      } catch(Zend_Exception $e){
        throw new Exception($e-> getMessage());
      } catch(Exception $e){
        throw new Exception($e-> getMessage());
      }
    }
  }

  public static function getInstance(){
    self::setInstance();
    return self::$instance;
  }

  public static function logQuery(){
    self::$teste = self::getInstance();
    $texto_query[0] = self::$teste-> getProfiler()
      -> getLastQueryProfile()
      -> getQuery();
    $texto_query[1] = self::$teste-> getProfiler()
      -> getLastQueryProfile()
      -> getQueryParams();
    $query = $texto_query[0];
    foreach($texto_query[1] as $valor){
      $posicao = strpos($query,"?");
      $query = substr_replace($query,"'" . $valor . "'",$posicao,1);
    }
    $arrayQuery = explode(" ",$query);
    $operacao = strtoupper(trim($arrayQuery[0]));
    if($operacao != 'SELECT'){
      if($operacao == 'INSERT' || $operacao == 'DELETE'){
        $tabela = $arrayQuery[2];
      } else{
        $tabela = $arrayQuery[1];
      }
      $QUERY = preg_replace('/\s{2,}/',' ',$QUERY);
      $query = str_replace("'","`",$query);
      $query = str_replace('"',"",$query);
      $arrData = array(
          "IDINFO" =>$_SESSION['cod_func'],
          "OPERACAO" =>$operacao,
          "TABELA" =>$tabela,
          "QUERY" =>$query,
          "DATA" =>Util::getDataAtual()
      );
      self::$teste-> insert("log",$arrData);
    }
  }

  public static function logThisEntry(Array $args){
    $arrData = array(
        "IDINFO" =>$args['IDINFO'],
        "OPERACAO" =>$args['OPERACAO'],
        "TABELA" =>$args['TABELA'],
        "QUERY" =>$args['QUERY'],
        "DATA" =>Util::getDataAtual()
    );
    self::getInstance()-> insert("log",$arrData);
  }
}