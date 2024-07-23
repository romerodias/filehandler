Ext.define('Control.view.usuario.FormSenha',{
	extend: 'Ext.window.Window',
	alias: 'widget.usuarioformsenha',
	id: 'usuarioformsenha',
	width: 450,
	title: '',	
	height: 380,
	modal: true,
	layout: 'fit',
	border: false,
	closeAction: 'hide',
	items: [{
		xtype: 'form',
		defaults: {
			padding:'5px',
			labelAlign: 'top'
		},
		items: [{
			xtype: 'hidden',
			name: 'id'
		},{
			xtype: 'perfilcombo',
			anchor: '100%'
		},{
			xtype: 'textfield',
			fieldLabel: 'Usuário',
			name: 'usuario',
			soNumero: true,
			allowBlank: false,
			blankText: 'O usu?rio ? obrigat?rio',
			width: 250,
			selectOnFocus: true,
			enableKeyEvents: true
		}, {
			xtype: 'textfield',
			fieldLabel: 'Senha',
			name: 'senha',
			inputType: 'password',
			allowBlank: false,
			blankText: 'A senha ? obrigat?ria',
			selectOnFocus: true,
			width: 250,
			enableKeyEvents: true
		}, {
			xtype: 'textfield',
			fieldLabel: 'Repetir Senha',
			name: 'repetirSenha',
			inputType: 'password',
			allowBlank: false,
			blankText: 'A senha é obrigat?ria',
			selectOnFocus: true,
			width: 250,
			enableKeyEvents: true
		}, { 
			xtype: 'funcionariocombo',
			fieldLabel: 'Gerente',
			name: 'idgerente',
			anchor: '100%'
		}]
	}],
	buttons: [{
		text: 'Salvar',
		action: 'salvar',
		iconCls: 'icon-save'
	}]	
});