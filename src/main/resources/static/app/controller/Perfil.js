    Ext.define('Control.controller.Perfil',{
	extend: 'Ext.app.Controller',
	models: ['Perfil'],
	stores: ['Perfil'],
	views: ['perfil.List',
	  'perfil.Combo',
	  'perfil.Panel',
	  'perfil.Form'
	],
	refs: [{
		ref: 'perfilList', selector: 'perfillist'
	}],

	init: function() {
		this.control({
			'perfillist button[action=novo]' : {
				click: this.buttonNovoPressed
			},
			'perfillist button[action=editar]' : {
				click: this.buttonNovoPressed
			},
			'perfilform button[action=salvar]' : {
				click: this.btnSavePressed
			},
			'perfillist button[action=excluir]' : {
				click: this.excluir
			},
			'perfillist' : {
				itemclick: this.perfilItemClick,
				render: this.loadGrid
			}
		});
	},



	buttonNovoPressed: function(btn) {
		var	win = (!Ext.getCmp('perfilform'))? Ext.widget('perfilform') : Ext.getCmp('perfilform'),
			form = win.down('form');
		
		form.getForm().reset();
		
		switch(btn.action){
			case 'novo' :
				win.setTitle('Perfil : Novo');
				break;
			case 'editar' :
				var gridRecord = this.getPerfilList().getSelectionModel().getSelection()[0];
				var record = this.getPerfilList().getStore().findRecord("id" , gridRecord.get("id"));
				win.setTitle('Perfil : Editar');
				form.loadRecord(record);
				break;
		}
		win.show();
	},



	btnSavePressed: function(btn) {
		var win = btn.up().up(),
			form = win.down('form').getForm(),
			grid = this.getPerfilList();
		if(form.isValid()) {
			var formValues = form.getValues();
			win.el.mask('Salvando dados, aguarde...');
			Ext.Ajax.request({
				url: Control.util.urlBackEnd + '/perfil/salvar',
				method: 'POST',
				jsonData: Ext.encode(formValues),
				success: function(respose) {
					var json = Ext.decode(respose.responseText);
					if(json.success == false) {
						Control.util.showAlert(json.data);
						win.el.unmask();
					} else {
						form.reset();
						win.el.unmask();
						grid.getStore().load();
						win.hide();
					}
				},
				failure: function(o,response) {
					var json = Ext.decode(o.responseText);
					Ext.Msg.alert({
						title: 'Atencao',
						msg: json.data,
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.MessageBox.OK
					});
					win.el.unmask();
				}
			});			
		}
	},



	acaoEdit: function(column, recordIndex, checked) {
        let perfilSelecionado = this.getPerfilList().getSelectionModel().getSelection()[0];
        let papelSelecionado = this.getPerfilPapelList().getStore().getAt(recordIndex);

        let url = "";
        if(checked) {
          url = "/perfil/adicionar-papel/" + perfilSelecionado.data.id + "/" + papelSelecionado.data.id;
        } else {
          url = "/perfil/remover-papel/" + perfilSelecionado.data.id + "/" + papelSelecionado.data.id;
        }

		Ext.Ajax.request({
			url: url,
			success: function(response) {
				var json = Ext.decode(response.responseText);
				if(json.success){
				}
				else {
					Control.util.showAlert(json.data);
				}
			}
		});
	},


  perfilItemClick: function(component, item) {
		this.getPerfilPapelList().getStore().proxy.url = "perfil/papel/listar/"+item.data.id
		this.getPerfilPapelList().getStore().load();
  },

  loadGrid: function(grid) {
    grid.getStore().load();
  },
  
  
  	excluir: function() {
  		var grid = this.getPerfilList(),
  			record = grid.getSelectionModel().getSelection()[0];
  		
  		if(record.length ===0) {
  			Ext.Msg.alert({
  				title: 'Atenção',
  				msg: 'Selecione perfil!',
  				icon: Ext.MessageBox.INFO,
  				buttons: Ext.MessageBox.OK
  			});
  			return false;
  		}
  		
  		Ext.Msg.confirm('Atenção','Realmente deseja excluir o perfil ' + record.get('nome')  + '?', function(btn){
  			if(btn!='yes') return;
  			grid.el.mask('Excluindo, aguarde...');
  			Ext.Ajax.request({
  			  method: 'DELETE',
  				url: Control.util.urlBackEnd + '/perfil/' + record.get('id'),
  				success: function(response) {
  					var json = Ext.decode(response.responseText);
  					if(json.success){
  						grid.getStore().remove(record);
  						grid.el.unmask();
  					}
  					else {
  						Ext.Msg.alert({
  							title: 'Atenção',
  							msg: json.data,
  							icon: Ext.MessageBox.ERROR,
  							buttons: Ext.MessageBox.OK
  						});						
  						grid.el.unmask();
  					}				
  				}
  			});			
  		});
  	}	



});