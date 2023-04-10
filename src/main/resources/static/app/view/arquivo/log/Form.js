Ext.define('Control.view.arquivo.log.Form', {
	extend: 'Ext.window.Window',
	alias: 'widget.arquivologform',
	width: 550,
	height: 350,
	maximizable: true,
	title: 'Visualizar Log de Arquivo',
	modal: true,
	layout: 'fit',
	items: [{
		xtype: 'arquivologlista'
	}]
});