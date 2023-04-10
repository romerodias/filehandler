/**  
 * Versão 1.1.0 
 * 01/04/2015
 * Criar controle de log por file ou directory 
 * */
use control;
alter table log add logtype varchar(50) null;
update log set logtype = 'file';

