<?php 
/**
* @copyright (c) 2014, rdtecnologia.com.br  
* @license MIT Licence 
*/
 class LogDAO extends Conexao { protected $_name = 'log'; public function log(array $args) { $this->banco->insert("log", $args); } public function getByMd5(array $arrFileMd5) { $select = "
			SELECT 	(SELECT id FROM log as logid WHERE logid.md5 = log.md5 ORDER BY logid.cont DESC LIMIT 1) AS id, 
					MAX(data) AS data,
					md5 
			FROM 	log 
			WHERE 	md5 in ('" . implode("','", $arrFileMd5) . "')
			GROUP BY 
					md5
		"; return $this->banco->fetchAll($select); } public function getByFileName($fileName) { $sql = "
			select 	cont,
					id as user,
					DATE_FORMAT(data,'%d/%m/%y %H:%i') as dt,
					acao,
					arquivo
			from 	log 
			WHERE 	arquivo like '%$fileName'
			order by 
					data				
		"; return $this->banco->fetchAll($sql); } public function getListOfDocumentLastAction(array $array) { $sql = "
			SELECT	Max(cont),
					RIGHT(cast(log.arquivo as char(800)),32) AS Doc, 
					(
						SELECT caminho.arquivo
						FROM 	log as caminho 
						WHERE caminho.cont = Max(log.cont)
					) AS Path, 
					(
						SELECT caminho.acao
						FROM 	log as caminho 
						WHERE caminho.cont = Max(log.cont)
					) AS LastAction,
					(
						SELECT caminho.data
						FROM 	log as caminho 
						WHERE caminho.cont = Max(log.cont)
					) AS Data
			FROM 	log
			WHERE right(cast(log.arquivo as char(800)),4) = '.dwg'
					and year(log.data) in (2014)
			GROUP BY RIGHT(cast(log.arquivo as char(800)),32) 
		   	ORDER BY Max(cont) DESC
			"; return $this->banco->fetchAll($sql); } 
			
			public function getByDate($initialDate, $finalDate, $start, $limit, $document = "", $sort = "", $direction = "") { $limit = ($start != "" && $limit != "")? "LIMIT $start, $limit" : "" ; $where =""; if(trim($document) != ""){ $where = " AND log.arquivo LIKE '%$document%'"; } $where .= " AND log.logtype = 'file'"; $sortStmt = "ORDER BY cont DESC"; if($sort && $direction){ $sortStmt = sprintf("ORDER BY %s %s", $sort, $direction); } $sql = "
			SELECT	cont,
					cast(log.arquivo as char(800)) AS doc,
					acao,
					data,
					id as user
			FROM 	log
			WHERE 	data between '$initialDate 00:00:00' AND '$finalDate 23:59:59'
					$where
			$sortStmt					
		   	
		   	$limit
			"; return $this->banco->fetchAll($sql); } 
			
			public function getByDateCount($initialDate, $finalDate, $document = "") { $where =""; if(trim($document) != ""){ $where = " AND log.arquivo LIKE '%$document%'"; } $sql = "
			SELECT	count(cont) as qtd
			FROM 	log
			WHERE 	data between '$initialDate 00:00:00' AND '$finalDate 23:59:59'
					$where
		"; return $this->banco->fetchRow($sql); } }