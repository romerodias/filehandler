<?php
/**
 * 
 * Classe para manipulaï¿½ï¿½o de arquivos e diretï¿½rios
 * 
 * @author 	Romero Gonï¿½alves Dias
 * @license Info Design Engenharia e Projetos
 * @version 1.0.0
 * 
 * 
 * Este arquivo deve estar com codificação Cp1252 para correto
 * funcionamento com diretórios que contenham acentuação gráfica
 */
class DirHandler {
	
	private $notShowExtensions;

	public function getDir($diretorio = '') { 
		//$diretorio = utf8_decode($diretorio); 
		if (! is_dir($diretorio)) 
			return false; 
		
			$arrDir = array(); 
			$dirInterator = new DirectoryIterator($diretorio); 
			foreach($dirInterator as $file) { 
			if ($file->isDir() && ! $file->isDot()) { 

				$perm = substr(sprintf('%o', $file->getPerms()), - 4); 
					
				$icon = ($perm == "0555" || $perm == "0550") ? 'folder-lock' : ''; 

				$arrDir[] = array( 
			    'text' => $file->getFileName(), 
					'id' => md5($file->getPathname() . '/' . $file->getFileName()), 
					'leaf' => false, 'perm' => $perm, 
					'cls' => 'folder', 'iconCls' => $icon ); 
			} 
		} 
		if($arrDir) {
		  usort($arrDir, array( self, "orderByText" )); 
		}
		return $arrDir; 
	} 

	public function getFiles($diretorio = "") {
	  if (! is_dir($diretorio)) {
	    return false;
	  }
			
		$arrFiles = array();
		//throw new Exception(utf8_decode($diretorio));
		$dirInterator = new DirectoryIterator($diretorio);
		foreach($dirInterator as $file) {
			if ($file->isFile() && ! $file->isDot()) {
				$extension = strtolower(substr(strrchr($file->getFileName(), '.'), 1));
				if ($this->notShowExtensions) {
					if (in_array(strtolower($extension), $this->notShowExtensions)) {
						continue;
					}
				}
				$arrFiles[] = array(
					'FILENAME' => $file->getFileName(),
					'ARQUIVO' => $file->getFileName(),
					'EXTENSION' => $extension,
					'PERM' => substr(sprintf('%o', $file->getPerms()), - 4),
					'OWNER' => $file->getOwner()
				);
			}
		}
		return $arrFiles;
	}


	public function bloquearArquivos($path = "", array $arrFiles = array()) {
		if (! $arrFiles)
			return false;
		
		if (empty($path))
			return false;
		
		foreach($arrFiles as $file) {
			exec("sudo /bin/chmod 555 " . self::scapePath($path . '/' . $file));
			exec("sudo /bin/chown root " . self::scapePath($path . '/' . $file));
  	 	exec("sudo /bin/chattr +i " . self::scapePath($path . '/' . $file));
		}
		return true;
	}


	public function desbloquearArquivos($path = "", array $arrFiles = array()) {
		if (! $arrFiles)
			return false;
		
		if (empty($path))
			return false;
		
		foreach($arrFiles as $file) {
 			exec("sudo /bin/chattr -i " . self::scapePath($path . '/' . $file));
			exec("sudo /bin/chmod 777 " . self::scapePath($path . '/' . $file));
			exec("sudo /bin/chown root " . self::scapePath($path . '/' . $file));
		}
		return true;
	}
	
	
	public function lockFolder($path) {
		if (! $path)
			return false;
		
		if(!is_dir($path)){
			throw new Exception($path . " não é um diretório válido!");
		}
		
		$resposta = "";
		
		exec("sudo /bin/chmod 555 " . self::scapePath($path), $resposta);
		exec("sudo /bin/chown root.root " . self::scapePath($path), $resposta);
	
		return true;			
	}


	public function unlockFolder($path) {
		if (! $path)
			return false;
		
		if(!is_dir($path)){
			throw new Exception($path . " nï¿½o ï¿½ um diretï¿½rio vï¿½lido!");
		}
		
		$resposta = "";
		
		exec("sudo /bin/chmod 777 " . self::scapePath($path), $resposta);
		exec("sudo /bin/chown root.engenharia " . self::scapePath($path), $resposta);
		
		return true;		
	}
	

	public static function orderByText($a, $b) {
		return strcmp($a['text'], $b['text']);
	}


	public static function scapePath($path) {
		$arrSearch = array(
				" ",
				"&",
				"(",
				")"
		);
		$arrReplace = array(
				"\\ ",
				"\\&",
				"\\(",
				"\\)"
		);
		return str_replace($arrSearch, $arrReplace, $path);
	}


	public function getNotShowExtensions() {
		return $this->notShowExtensions;
	}


	public function setNotShowExtensions(array $notShowExtensions) {
		$this->notShowExtensions = $notShowExtensions;
	}
}