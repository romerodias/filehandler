Ext.define('Control.controller.Main',{
	extend: 'Ext.app.Controller',
	stores: ['Diretorio','Arquivo','ArquivoLog'],
	models: ['Arquivo','ArquivoLog'],
	views: ['Viewport','Panel',
	    'diretorio.Tree',
	    'diretorio.Form',
	    'arquivo.Lista',
	    'arquivo.Form',
	    'arquivo.log.Lista',
	    'arquivo.log.Form',
	    'log.consulta.Lista',
	    'log.consulta.Panel'],
	
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
			'diretoriotree button[action=desbloquear]' : { click: this.unblockFolder },
			'arquivolista button[action=novo]' : { click: this.openFormToUpload },
			'arquivoform button[action=salvar]' : { click: this.addUpload },
			'arquivolista button[action=download]' : { click: this.downloadFile },
			'arquivolista button[action=deletar]' : { click: this.deleteFile },
			'diretoriotree button[action=novo]' : { click: this.newDirectory },
			'diretorioform button[action=salvar]' : { click: this.saveDirectory }
		});
	},

    deleteFile: function() {
        var grid = this.getArquivoLista();
        let record = grid.getSelectionModel().getSelection()[0];

        if(!record.data.name){
          Ext.Msg.alert('Atenção','Selecione um arquivo para ser deletado!');
          return false;
        }

		Ext.Msg.confirm('Atenção','Realmente deseja excluir o arquivo ' + record.get('name')  + '?', function(btn){
			if(btn!='yes') return;
			grid.el.mask('Excluindo, aguarde...');


            Ext.Ajax.request({
                url: '/file-handler/' + record.data.id,
                method: 'DELETE',
                success: function(respose) {
                    var json = Ext.decode(respose.responseText);
                    if(json.success == false) {
                        Control.util.showAlert(json.data);
                        grid.el.unmask();
                    } else {
                        grid.el.unmask();
                        grid.getStore().load();
                    }
                },
                failure: function(o,response) {
                    var json = Ext.decode(o.responseText);
                    Control.util.showAlert(json.data);
                    grid.el.unmask();
                }
            });
		});

    },

    downloadFile: function() {
        var grid = this.getArquivoLista();
        let record = grid.getSelectionModel().getSelection()[0];
        if(!record.data.name){
          Ext.Msg.alert('Atenção','Selecione um arquivo para ser baixado!');
          return false;
        }
        var url = '/file-handler/download/' + record.data.id;
        window.location = url;
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
//		var btnViewLog = Ext.ComponentQuery.query('arquivolista button[action=novo]')[0];
//		var btnLockFile = Ext.ComponentQuery.query('arquivolista button[action=download]')[0];
//		var btnUnlockFile = Ext.ComponentQuery.query('arquivolista button[action=delete]')[0];
//		btnViewLog.disable();
//		btnLockFile.disable();
//		btnUnlockFile.disable();
	},
	
	/* Enable directory tree buttons */
	enableTreeButtons: function(directoryId) {
		var btnNovo = Ext.ComponentQuery.query('arquivolista button[action=novo]')[0];
	    var btnDownload = Ext.ComponentQuery.query('arquivolista button[action=download]')[0];
    	var btnDelete = Ext.ComponentQuery.query('arquivolista button[action=delete]')[0];

	    /* with directory id parameter search for permission to create file and delete files */
		Ext.Ajax.request({
             url: '/file-handler/acl/' + directoryId,
             success: function(request) {
             var json = Ext.decode(request.responseText);
			 console.log(json);
                if(json.totalCount == 1) {
                   btnNovo.setDisabled(!json.data[0].canWrite);
				   btnDelete.setDisabled(!json.data[0].canDelete);
                } else {
                    btnNovo.setDisabled(false);
                    btnDelete.setDisabled(false);
                }
            }
        });


//		var btnLockFile = Ext.ComponentQuery.query('diretoriotree button[action=novo]')[0];
//		var btnUnlockFile = Ext.ComponentQuery.query('diretoriotree button[action=download]')[0];
//		btnLockFile.enable();
//		btnUnlockFile.enable();
	},
	
	/* Disable directory tree buttons */
	disableTreeButtons: function() {
//		var btnLockFile = Ext.ComponentQuery.query('diretoriotree button[action=bloquear]')[0];
//		var btnUnlockFile = Ext.ComponentQuery.query('diretoriotree button[action=desbloquear]')[0];
//		btnLockFile.disable();
//		btnUnlockFile.disable();
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
		this.enableTreeButtons(rec.raw.id);

		arquivoLista.el.mask('Carregando arquivos, aguarde...');
		arquivoLista.getStore().proxy.extraParams.node = rec.raw.id;
		arquivoLista.getStore().load({
			params: {
				node: rec.raw.id
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
	},

	openFormToUpload: function(btn) {
		var win = (!Ext.getCmp('arquivoform'))? Ext.widget('arquivoform') : Ext.getCmp('arquivoform'),
			form = win.down('form'),
			tree = this.getDiretorioTree(),
			node = tree.getSelectionModel().getSelection()[0];

        form.getForm().reset();

		if(node.raw) {
	        form.getForm().findField('path').setValue(node.raw.id);
	    } else {
            Ext.MessageBox.alert({
                title: 'Atenção',
                msg: 'Selecione um diretório válido!',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
            return false;
	    }
		win.show();
	},

    newDirectory: function(btn) {
        var win = (!Ext.getCmp('diretorioform'))? Ext.widget('diretorioform') : Ext.getCmp('diretorioform'),
            form = win.down('form'),
            tree = this.getDiretorioTree();
		var node = tree.getSelectionModel().getSelection()[0];
        form.getForm().reset();
		if(node.raw)
	        form.getForm().findField('id').setValue(node.raw.id);
        win.show();
    },

    addUpload: function(btn) {
        var win = btn.up('window'),
            form = win.down('form'),
            grid = this.getArquivoLista();

        if(form.getForm().isValid()) {
            win.el.mask('Salvando dados, aguarde..');
            form.getForm().submit({
                url: '/file-handler/upload',
                success: function(frm, action){
                    win.el.unmask();
                    form.getForm().reset();
                    win.hide();
                    grid.getStore().load();
                },
                failure: function(o,response){
                    var json = Ext.decode(response.response.responseText);
                    Control.util.showAlert(json.data);
                    win.el.unmask();
                }
            });
        }
    },

    saveDirectory: function(btn) {
       var win = btn.up('window'),
           form = win.down('form'),
           grid = this.getDiretorioTree();

       if(form.getForm().isValid()) {
           win.el.mask('Salvando dados, aguarde..');
           form.getForm().submit({
               url: '/file-handler/directory',
               success: function(frm, action){
                   win.el.unmask();
                   form.getForm().reset();
                   win.hide();
                   grid.getStore().load();
               },
               failure: function(o,response){
                   var json = Ext.decode(response.response.responseText);
                   Control.util.showAlert(json.data);
                   win.el.unmask();
               }
           });
       }
   }
});