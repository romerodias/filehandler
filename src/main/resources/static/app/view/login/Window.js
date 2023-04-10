Ext.define('Control.view.login.Window',{
	extend: 'Ext.window.Window',
	alias: 'widget.loginWindow',
	closeAction: 'hide',
	autoShow: true,
	width: 320,
	height: 150,
	modal: true,
	title: 'Login - Bloqueio de Documentos',
	closable: false,
	layout: 'fit',
	iconCls: 'silk-lock',
	resizable: false,
	
	initComponent: function(){
		this.items = {
			xtype: 'form',
			bodyStyle: 'padding:20px',
			border: false,
			defaults: {
				labelAlign: 'left',
				msgTarget: 'side',
				anchor: '99%'
			},items: [{
		        xtype:'textfield',
		        fieldLabel: 'Usuário',
		        name: 'usuario',
				allowBlank: false,
				blankText: 'O usuário é obrigatório',
				maxLength: 7,
				minLength: 7,
				width: 300,
				selectOnFocus: true,
				enableKeyEvents: true
			},{
				xtype: 'textfield',
				fieldLabel: 'Senha',
				name: 'senha',
				inputType: 'password',
				allowBlank: false,
				blankText: 'A senha é obrigatória',
				selectOnFocus: true,
				width: 250,
				enableKeyEvents: true
			},{
				xtype: 'label',
			    style: {color:'#ff0000'},
			    id: 'msgField',
			    anchor: '100%'				
			}]
		};
		
		this.buttons = [{
			 text: '<b>Entrar</b>', 
			 action: 'entrar'
		}];
		
		this.callParent(arguments);
	}
});