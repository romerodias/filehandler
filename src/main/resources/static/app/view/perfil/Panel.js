Ext.define('Control.view.perfil.Panel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.perfilpanel',
	layout: 'border',
	items: [{
		region: 'west',
		title: 'Perfíl',
		xtype: 'perfillist',
		split: true,
		flex: 1
	},{
		region: 'center',
		title: 'Acesso',
		//xtype: 'perfilpapellist',
		split: true,
		flex: 3
	}]
});