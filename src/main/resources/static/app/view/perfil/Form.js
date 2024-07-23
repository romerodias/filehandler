Ext.define('Control.view.perfil.Form',{
	extend: 'Ext.window.Window',
	alias: 'widget.perfilform',
	id: 'perfilform',
	title: "Cadastro de Perfil",
	width: 480,
	title: '',	
	height: 200,
	modal: true,
	border: false,
	layout: 'fit',	
	closeAction: 'hide',
	items: [{
		xtype: 'tabpanel',
		items: [{
			title: 'Principal',
			items: [{
				xtype: 'form',
				border: false,
				defaults: {
					padding:'10px',
					labelAlign: 'top'
				},
				items: [{
					xtype: 'textfield',
					fieldLabel: 'Nome',
					name: 'nome',
					allowBlank: false,
					anchor: '100%'
				},{
					xtype: 'hidden',
					name: 'id'
				}]
			}]
		}]
	}],
	buttons: [{
		text: 'Salvar',
		action: 'salvar',
		iconCls: 'icon-save'
	}]	
});