Ext.define('Control.controller.Login',{
	extend: 'Ext.app.Controller',
	views: ['login.Window'],
	refs: [{ref: 'loginwindow',selector: 'loginWindow'}],
	init: function(){
		this.control({
			'loginWindow button[action=entrar]' : {
				click: this.tryLogin
			},
			'loginWindow' : {
				'beforerender': this.verifyUserLogged
			},
			'loginWindow textfield[name=usuario]' : {
				keyup: this.verifyEnter
			},
			'loginWindow textfield[name=senha]' : {
				keyup: this.verifyEnter
			}
		});
	},
	
	/* When the FormLogin had been rendered, this function will verify if the user did logging yet. */
	verifyUserLogged: function() {
		var me = this.getLoginwindow();
		Ext.Ajax.request({
			url: 'service/AuthBLL/verifyUserLogged',
			scope: this,
			success: function(obj,action){
				var responseJson = Ext.decode(obj.responseText);
				if(responseJson.success == true) {
					me.hide();
					me.fireEvent('logged',this); 					
					return;
				} 
				else {
					/* Seta o login do usuário, caso estiver em um cookie */
					me.down('form').getForm().findField('usuario').setValue(responseJson.data);
					me.down('form').getForm().findField('senha').focus();
				}	
			},
			failure: function() {
				Ext.Msg.alert('Erro de conexão','Erro de conexão!');
			}
		});
	},
	
	
	
	/* Verify the authenticity from the user */
	tryLogin: function(btn) {
		var formLogin = btn.up().up().down('form'),
		    window = formLogin.up();
		
		if(formLogin.getForm().isValid()) {
			window.el.mask('Processando sua requisição, aguarde...');
			formLogin.getForm().submit({
				url: 'service/AuthBLL/autenticar',
				scope: this,
				success: function(form,action){
					window.el.unmask();	
					this.getLoginwindow().fireEvent('logged',this); //Fire a logged event to inform any listeners that are listening this component.
					this.getLoginwindow().hide(); //Hide the window login
				},
				failure: function(form,action) {
					window.el.unmask();
					Ext.getCmp('msgField').setText(action.result.data);
				}
			});
		}
	},
	
	
	esqueceuSenha: function(btn) {
		var formLogin = btn.up(),
			cpf = formLogin.getForm().findField('CPF').getValue(),
			msgField = Ext.getCmp('msgField'),
			window = formLogin.up();
		
		if(cpf=='') {
			msgField.setText('Favor informar seu CPF!');
			return;
		} else {
			msgField.setText('');
		}
		
		window.el.mask('Processando sua requisição, aguarde...');
		
		Ext.Ajax.request({
			url: 'service/UsuarioBLL/esqueceuSenha',
			params: {
				CPF: cpf
			},
			success: function(obj,action){
				var responseJson = Ext.decode(obj.responseText);
				if(responseJson.success == false) {
					msgField.setText(responseJson.data);
					window.el.unmask();
				} else {
					msgField.setText('');
					window.el.unmask();
					Ext.Msg.alert({
						title: 'Mensagem enviada com sucesso',
						msg: responseJson.data,
						icon: Ext.MessageBox.INFO,
						buttons: Ext.MessageBox.OK
					});					
				}
			}
		});
	},
	
	/**
	 * @private
	 */
	verifyEnter: function(txt,e) {
	    if(e.getKey() === e.ENTER){
	      e.stopEvent();
	      var btn = Ext.ComponentQuery.query('loginWindow button[action=entrar]')[0];
	      if (btn){
	        this.tryLogin(btn);
	      }
	    }
	  }
});