Ext.define('Control.controller.Main',{
	extend: 'Ext.app.Controller',
	stores: ['Diretorio','Arquivo','ArquivoLog'],
	models: ['Arquivo','ArquivoLog'],
	views: ['Viewport','Panel','diretorio.Tree','arquivo.Lista','arquivo.log.Lista','arquivo.log.Form','log.consulta.Lista','log.consulta.Panel'],
	
	refs: [{
		ref: 'diretorioTree', selector: 'diretoriotree'
	},{
		ref: 'arquivoLista', selector: 'arquivolista'
	},{
		ref: 'arquivoLogLista', selector: 'arquivologlista'
	},{
		ref: 'logConsultaLista', selector: 'logconsultalista'
	}],
	
	init: function() {
		this.control({
			'diretoriotree' : {
				itemclick: this.treeItemClick,
				render: this.loadTree,
				beforerender: this.loadBaseDirOnTree
			},
			'arquivolista button[action=bloquear]' : {
				click: this.bloquear
			},
			'arquivolista button[action=desbloquear]' : {
				click: this.desbloquear
			},
			'arquivolista button[action=viewlog]' : {
				click: this.abrirLog
			},			
			'arquivolista' : {
				itemclick: this.habilitarBotoes
			},
			'logconsultapanel button[action=buscar]' : {
				click: this.searchLog
			},
			'logconsultapanel [name=document]' : {
				keyup: this.verifyEnter
			},
			'diretoriotree button[action=bloquear]' : {
				click: this.blockFolder
			},
			'diretoriotree button[action=desbloquear]' : {
				click: this.unblockFolder
			}
			
		});
	},
	

	loadBaseDirOnTree: function() {
		var store = this.getStore('Diretorio');
//		Ext.Ajax.request({
//			url: 'service/DiretorioBLL/getRootDir',
//			async: false,
//			success: function(frm, action) {
//				var dir = Ext.decode(frm.responseText);
//				store.tree.root.data.id = dir.data;
//				//console.log(store.tree.root.data.id);
//
//			},
//			failure: function(o,response){
//				var json = Ext.decode(response.response.responseText);
//				Control.alert.info(json.data);
//			}
//		});
	},
	
	
	/**
	 * Lock a folder
	 */
	blockFolder: function(item) {
		var tree = this.getDiretorioTree();
		var node = tree.getSelectionModel().getSelection()[0];
		var path = tree.processParentsNodes(node).getParentsNodes('/');
		
		/* Verify if an path was selected */
		if(!path){
			Control.alert.info('� necess�rio informar os arquivos a serem bloqueados!');			
			return false;
		}
		
		/* Verify if it's the root item */
		if(node.isRoot()) {
			Control.alert.info("This is the root directory and it won't be locked.");
			return false;
		}
		
		/* Verify if the item is already locked */
		if(node.raw.perm == '0555'){
			Control.alert.info("This folder is alredy lock.");
			return false;		
		}
		tree.el.mask('Bloqueando pasta, aguarde...');
		Ext.Ajax.request({
			url: 'service/DiretorioBLL/blockFolder',
			params: {
				path: path
			},
			success: function(frm, action) {
				node.set('iconCls','folder-lock');
				tree.el.unmask();		
			},
			failure: function(o,response){
				var json = Ext.decode(response.response.responseText);
				Control.alert.info(json.data);
				tree.el.unmask();
			}
		});
		console.log(path);
	},
	
	
	/**
	 * Unlock a folder
	 * @private
	 */
	unblockFolder: function(item) {
		var tree = this.getDiretorioTree();
		var node = tree.getSelectionModel().getSelection()[0];
		var path = tree.processParentsNodes(node).getParentsNodes('/');	
		
		if(!path){
			Control.alert.info('� necess�rio informar os arquivos a serem bloqueados!');			
			return false;
		}
		
		if(node.isRoot()) {
			Control.alert.info("This is the root directory and it won't be locked.");
			return false;
		}
		
		
		if(node.raw.perm == '0777'){
			Control.alert.info("This folder is alredy unlock.");
			return false;		
		}
		
		tree.el.mask('Desbloqueando pasta, aguarde...');
		
		Ext.Ajax.request({
			url: 'service/DiretorioBLL/unblockFolder',
			params: {
				path: path
			},
			success: function(frm, action) {
				node.set('iconCls','');
				tree.el.unmask();		
			},
			failure: function(o,response){
				var json = Ext.decode(response.response.responseText);
				Control.alert.info(json.data);
				tree.el.unmask();
			}
		});
	},
	
	
	/**
	 * @private
	 */
	verifyEnter: function(cmp, e) {
		console.log(cmp);
	    if(e.getKey() === e.ENTER){
	      e.stopEvent();
	      if (cmp){
	        this.searchLog(cmp);
	      }
	    }
	 },
	  
	
	/* Perform a log search */
	searchLog: function(btn) {
		var form = btn.up("form");
		var grid = this.getLogConsultaLista();
		if(form.getForm().isValid()) {
			grid.el.mask('Consultando log, aguarde...');
			grid.getStore().proxy.extraParams  = form.getForm().getValues()
			grid.getStore().load({
				callback: function() {
					grid.el.unmask();
				}
			});
		}
	},
	
	/* Enable buttons */
	habilitarBotoes: function() {
		var btnViewLog = Ext.ComponentQuery.query('arquivolista button[action=viewlog]')[0];
		var btnLockFile = Ext.ComponentQuery.query('arquivolista button[action=bloquear]')[0];
		var btnUnlockFile = Ext.ComponentQuery.query('arquivolista button[action=desbloquear]')[0];
		btnViewLog.enable();
		btnLockFile.enable();
		btnUnlockFile.enable();
	},
	
	/* Disable buttons */
	desabilitarBotoes: function() {
		var btnViewLog = Ext.ComponentQuery.query('arquivolista button[action=viewlog]')[0];
		var btnLockFile = Ext.ComponentQuery.query('arquivolista button[action=bloquear]')[0];
		var btnUnlockFile = Ext.ComponentQuery.query('arquivolista button[action=desbloquear]')[0];
		btnViewLog.disable();
		btnLockFile.disable();
		btnUnlockFile.disable();		
	},
	
	/* Enable directory tree buttons */
	enableTreeButtons: function() {
		var btnLockFile = Ext.ComponentQuery.query('diretoriotree button[action=bloquear]')[0];
		var btnUnlockFile = Ext.ComponentQuery.query('diretoriotree button[action=desbloquear]')[0];
		btnLockFile.enable();
		btnUnlockFile.enable();		
	},
	
	/* Disable directory tree buttons */
	disableTreeButtons: function() {
		var btnLockFile = Ext.ComponentQuery.query('diretoriotree button[action=bloquear]')[0];
		var btnUnlockFile = Ext.ComponentQuery.query('diretoriotree button[action=desbloquear]')[0];
		btnLockFile.disable();
		btnUnlockFile.disable();			
	},

	
	/**
	 * Carregar o store da TreePanel
	 * diretorioTreeRenderListener
	 */
	loadTree: function(cmp) {
		cmp.getStore().load({
			callback: function(){
				cmp.getRootNode().expand(false);
			}
		});
	},
	
	
	/**
	 * Carrega os arquivos na grid de arquivos
	 * 
	 * diretorioTreeItemClickListener
	 */
	treeItemClick: function(view, rec) {
		this.desabilitarBotoes();
		var node = this.getDiretorioTree().processParentsNodes(rec).getParentsNodes('/');
		var arquivoLista = this.getArquivoLista();
		
		/* Disable buttons on root level */
		if(rec.isRoot())
			this.disableTreeButtons();
		else
			this.enableTreeButtons();
		
		arquivoLista.el.mask('Carregando arquivos, aguarde...');
		arquivoLista.getStore().load({
			params: {
				node: node
			},
			callback: function() {
				arquivoLista.el.unmask();
			}
		});
	},
	
	
	/**
	 * Bloquear um ou v�rios arquivos
	 * arquivoListaButtonClickListener
	 */
	bloquear: function() {
		var gridArquivo = this.getArquivoLista();
		var node = this.getDiretorioTree().getSelectionModel().getSelection()[0];
		var files = gridArquivo.getFieldFromSelectedItems('text');
		var path = this.getDiretorioTree().processParentsNodes(node).getParentsNodes('/');
		
		if(files.length == 0){
			Ext.MessageBox.alert({
				title: 'Aten��o',
				msg: '� necess�rio informar os arquivos a serem bloqueados!',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});			
			return false;
		}
		
		gridArquivo.el.mask('Bloqueando arquivos, aguarde...');
		
		Ext.Ajax.request({
			url: 'file-handler/block',
			params: {
				path: path,
				files: files.join(',')
			},
			success: function(frm, action) {
				gridArquivo.getStore().load({
					params: {
						node: path
					},
					callback: function() {
						gridArquivo.el.unmask();
					}
				});				
			},
			failure: function(o,response){
				var json = Ext.decode(response.response.responseText);
				Ext.MessageBox.alert({
					title: 'Aten��o',
					msg: json.data,
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.MessageBox.OK
				});
				gridArquivo.el.unmask();
			}
		});
	},
	
	
	/**
	 * Desbloquear um ou v�rios arquivos
	 * arquivoListaButtonDesbloquearClickListener
	 */
	desbloquear: function() {
		var gridArquivo = this.getArquivoLista();
		var node = this.getDiretorioTree().getSelectionModel().getSelection()[0];
		var files = gridArquivo.getFieldFromSelectedItems('text');
		var path = this.getDiretorioTree().processParentsNodes(node).getParentsNodes('/');
		
		if(files.length == 0) {
			Ext.MessageBox.alert({
				title: 'Aten��o',
				msg: '� necess�rio informar os arquivos a serem desbloqueados!',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});			
			return false;
		}
		
		gridArquivo.el.mask('Desbloquear arquivos, aguarde...');
		
		Ext.Ajax.request({
			url: 'file-handler/unblock',
			params: {
				path: path,
				files: files.join(',')
			},
			success: function(frm, action) {
				//console.log(action);
				gridArquivo.getStore().load({
					params: {
						node: path
					},
					callback: function() {
						gridArquivo.el.unmask();
					}
				});	
			},
			failure: function(o,response){
				var json = Ext.decode(response.response.responseText);
				Ext.MessageBox.alert({
					title: 'Aten��o',
					msg: json.data,
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.MessageBox.OK
				});
				gridArquivo.el.unmask();
			}
		});
	},
	
	
	/**
	 * Abre a tela de visualiza��o de log do arquivo 
	 */
	abrirLog: function() {
		var gridArquivo = this.getArquivoLista();
		var node = this.getDiretorioTree().getSelectionModel().getSelection()[0];
		var files = gridArquivo.getFieldFromSelectedItems('id');
		
		if(files.length == 0){
			Ext.MessageBox.alert({
				title: 'Aten��o',
				msg: '� necess�rio selecionar um arquivo!',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});			
			return false;
		}
		
		if(files.length > 1){
			Ext.MessageBox.alert({
				title: 'Aten��o',
				msg: 'Selecione somente <b>um</b> arquivo!',
				icon: Ext.MessageBox.INFO,
				buttons: Ext.MessageBox.OK
			});			
			return false;
		}		
		
		var	win = Ext.widget('arquivologform');
		var logLista = this.getArquivoLogLista();
		win.show();
		logLista.getStore().load({
			params: {
				absolute_path: files[0]
			}
		});
	}
});