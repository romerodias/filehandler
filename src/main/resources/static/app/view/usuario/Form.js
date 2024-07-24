Ext.define('Control.view.usuario.Form',{
	extend: 'Ext.window.Window',
	alias: 'widget.usuarioform',
	id: 'usuarioform',
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
			name: 'ID'
		},{
			xtype: 'perfilcombo',
			name: 'perfil',
			anchor: '100%'
		},{
			xtype: 'textfield',
			fieldLabel: 'Usuário',
			name: 'NOME',
			soNumero: true,
			allowBlank: false,
			blankText: 'O usu?rio ? obrigat?rio',
			width: 250,
			selectOnFocus: true,
			enableKeyEvents: true
		}, {
			xtype: 'textfield',
			fieldLabel: 'Senha',
			name: 'SENHA',
			inputType: 'password',
			allowBlank: true,
			blankText: 'A senha ? obrigat?ria',
			selectOnFocus: true,
			width: 250,
			enableKeyEvents: true
		}, {
			xtype: 'textfield',
			fieldLabel: 'Repetir Senha',
			name: 'repetir_senha',
			inputType: 'password',
			allowBlank: true,
			blankText: 'A senha é obrigat?ria',
			selectOnFocus: true,
			width: 250,
			enableKeyEvents: true
		}]
	}],
	buttons: [{
		text: 'Salvar',
		action: 'salvar',
		iconCls: 'icon-save'
	}]	
});