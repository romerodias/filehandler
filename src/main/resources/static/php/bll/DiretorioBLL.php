<?php

/**
 * @copyright (c) 2014, rdtecnologia.com.br  
 * @license MIT Licence
 * 
 * Este arquivo deve estar com codificação Cp1252 para correto
 * funcionamento com diretórios que contenham acentuação gráfica
 */
class DiretorioBLL {

  private $defaultPath = '';

  public function DiretorioBLL(){
    $this->defaultPath = Config::getValue('APP','baseDir');
  }

  public function getFolders(array $args = array()){
    $dirHandler = new DirHandler();
    $basePath = $this->defaultPath;
    if( ! empty($args['node']))
      $basePath = $args['node'];
      $arr = $dirHandler-> getDir($basePath);
    echo json_encode($arr);
  }

  public function getFiles(array $args = array()){
    $dirHandler = new DirHandler();
    $basePath = '';
    $arrFileLocoked = array();
    if( ! empty($args['node']))
      $basePath = $args['node'];
    if(empty($basePath))
      return false;
    $a = Config::getValue('APP','denyExtensions');
    $dirHandler-> setNotShowExtensions($a);
    $arr = $dirHandler-> getFiles($basePath);
    if($arr){
      foreach($arr as &$node){
        if($node['PERM'] == '0555'){
          $node['STATUS'] = 'Bloqueado';
          $node['MD5'] = md5_file($basePath . '/' . $node['FILENAME']);
          $arrFileLocoked[] = $node['MD5'];
        } else 
          if(($node['PERM'] == '0766')){
            $node['STATUS'] = utf8_encode('Bloqueado por Referência');
          } else{
            $node['STATUS'] = 'Desbloquedo';
          }
      }
    }
    if($arrFileLocoked){
      $logDAO = new LogDAO();
      $arrFileMd5 = $logDAO-> getByMd5($arrFileLocoked);
      foreach($arr as &$file){
        if($file['STATUS'] == 'Bloqueado'){
          foreach($arrFileMd5 as $fileMD5){
            if($file['MD5'] == $fileMD5['md5']){
              $file['OBSERVACOES'] = 'Bloqueado em: ' .
                  date('d/m/Y H:i:s',strtotime($fileMD5['data'])) . ' Por: id' .
                  $fileMD5['id'];
            }
          }
        }
      }
    }
    echo json_encode($arr);
  }

  public function bloquear(array $args = array()){
    $dirHandler = new DirHandler();
    $path = $args['path'];
    $files = $args['files'];
    $arrFiles = explode(',',$files);
    if(empty($path))
      throw new Exception(
          'Nï¿½o foi especificado o caminho para encontrar o arquivo');
    if( ! $arrFiles)
      throw new Exception('Nï¿½o foi informado arquivo(s) a ser(em) bloqueado(s)');
    $dirHandler-> bloquearArquivos($path,$arrFiles);
    if($arrFiles){
      $logDAO = new LogDAO();
      foreach($arrFiles as $file){
        $logData = array(
            'id' =>Util::getUserLogado(),
            'data' =>Util::getDataAtual(),
            'acao' =>'BLOQUEAR',
            'arquivo' => utf8_decode(DirHandler::scapePath($path) . '/' . $file),
            'md5' =>md5_file($path . '/' . $file),
            'logtype' =>'file'
        );
        $logDAO-> log($logData);
      }
    }
    Util::successMsg();
  }

  public function desbloquear(array $args = array()){
    $dirHandler = new DirHandler();
    $path = $args['path'];
    $files = $args['files'];
    $arrFiles = explode(',',$files);
    if(empty($path))
      throw new Exception(
          'Nï¿½o foi especificado o caminho para encontrar o arquivo');
    if( ! $arrFiles)
      throw new Exception('Nï¿½o foi informado arquivo(s) a ser(em) bloqueado(s)');
    $dirHandler-> desbloquearArquivos($path,$arrFiles);
    if($arrFiles){
      $logDAO = new LogDAO();
      foreach($arrFiles as $file){
        $logData = array(
            'id' =>Util::getUserLogado(),
            'data' =>Util::getDataAtual(),
            'acao' =>'DESBLOQUEAR',
            'arquivo' =>$path . '/' . $file,
            'md5' =>md5_file($path . '/' . $file),
            'logtype' =>'file'
        );
        $logDAO-> log($logData);
      }
    }
    Util::successMsg();
  }

  public function getLog(array $args){
    $log = array();
    $qtdRows = 0;
    if($args['FILENAME']){
      $fileName = trim($args['FILENAME']);
      $logDAO = new LogDAO();
      $log = $logDAO-> getByFileName($fileName);
    }
    if($args['initialDate'] && $args['finalDate']){
      $initialDate = $args['initialDate'];
      $finalDate = $args['finalDate'];
      $document = $args['document'];
      $sort = $args['sort'];
      if($sort){
        $sort = json_decode(stripslashes($sort),true);
        $sortProperty = $sort[0]['property'];
        $direction = $sort[0]['direction'];
      }
      $logDAO = new LogDAO();
      $log = $logDAO-> getByDate($initialDate,$finalDate,$args['start'],
          $args['limit'],$document,$sortProperty,$direction);
      $qtdRows = $logDAO-> getByDateCount($initialDate,$finalDate,$document);
      $qtdRows = $qtdRows['qtd'];
    }
    Util::echoArrJson($log,$qtdRows);
  }

  public function getListOfDocumentLastAction(array $args){
    $logDAO = new LogDAO();
    $log = $logDAO-> getListOfDocumentLastAction($args);
    $data = "";
    $matches = array();
    if($log){
      foreach($log as $action){
        if(trim($action['LastAction']) == 'BLOQUEAR'){
          preg_match(
              '/[A-Z]{2}\-[A-Z]{2}\-[0-9]{4}\-[0-9]{4}\-[A-Z]{2}[0-9]{3}\-[0-9]{3}\-\R[0-9]{1,}\.dwg/i',
              trim($action['Doc']),$matches);
          print_r($matches) . '<br>';
          if( ! $matches[0]){
            $data .= $action['Doc'] . ' ' . $matches[0] . '<br>';
          }
        }
      }
    }
    echo $data;
  }

  public function blockFolder(array $args){
    $path = $args['path'];
    if( ! $path)
      throw new Exception("A pasta não foi informada!");
    $dirHandler = new DirHandler();
    $dirHandler-> lockFolder($path);
    $logData = array(
        'id' =>Util::getUserLogado(),
        'data' =>Util::getDataAtual(),
        'acao' =>'BLOQUEAR',
        'arquivo' =>$path,
        'md5' =>null,
        'logtype' =>'directory'
    );
    $logDAO = new LogDAO();
    $logDAO-> log($logData);
    Util::successMsg();
  }

  public function unblockFolder(array $args){
    $path = $args['path'];
    if( ! $path)
      throw new Exception("A pasta não foi informada!");
    $dirHandler = new DirHandler();
    $dirHandler-> unlockFolder($path);
    $logData = array(
        'id' =>Util::getUserLogado(),
        'data' =>Util::getDataAtual(),
        'acao' =>'DESBLOQUEAR',
        'arquivo' =>$path,
        'md5' =>null,
        'logtype' =>'directory'
    );
    $logDAO = new LogDAO();
    $logDAO-> log($logData);
    Util::successMsg();
  }

  public function getRootDir(){
    $rootDir = Config::getValue('APP','baseDir');
    Util::successMsg($rootDir);
  }
}