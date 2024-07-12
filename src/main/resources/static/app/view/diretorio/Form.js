Ext.define('Control.view.diretorio.Form', {
	extend: 'Ext.window.Window',
	alias: 'widget.diretorioform',
	width: 500,
	title: '',
	height: 150,
	modal: true,
	layout: 'fit',
	border: false,
	closeAction: 'hide',
	title: "Novo Diretório",
	items: [ {
		xtype: 'form',
		defaults: {
			margin: 10,
			labelAlign: 'top'
		},
		items: [ {
			xtype: 'textfield',
			fieldLabel: 'Nome',
			anchor: '100%',
			name: 'name',
			flex: 2
		},{
			xtype: 'hidden',
			name: 'id'
		} ]
	} ],
	buttons: [ {
		text: 'Salvar',
		action: 'salvar',
		iconCls: 'icon-save'
	}, {
		text: 'Cancelar',
		action: 'cancelar',
		iconCls: 'icon-cancelar',
		handler: function() {
			this.up('window').hide();
		}
	} ]
});