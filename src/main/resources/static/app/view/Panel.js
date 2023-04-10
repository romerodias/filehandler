Ext.define('Control.view.Panel',{
	extend: 'Ext.tab.Panel',
	alias: 'widget.mainpanel',
	id: 'mainpanel',
	defaults: {closable: true},
	activeTab: 0,
	items: [{
		title: 'Principal',
		closable: false,
		layout: 'border',
		items: [{
			region: 'center',
			xtype: 'arquivolista',
			flex: 5,
			title: 'Arquivos'
		},{
			region: 'west',
			xtype: 'diretoriotree',
			split: true,
			flex: 2,
			title: 'Diretórios'
		}]
	},{
		title: 'Consultar Log',
		closable: false,
		layout: 'border',
		hidden: true,
		items: [{
			region: 'center',
			xtype: 'logconsultapanel'
		}]
	}]
});