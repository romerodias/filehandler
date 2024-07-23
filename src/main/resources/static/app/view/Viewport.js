Ext.define('Control.view.Viewport',{
	extend: 'Ext.container.Viewport',
    requires: ['Control.view.toolbar.Toolbar'],
	id: 'main-viewport',
	border: false,
	layout: 'border',
	items: [{
		region: 'north',
		items: [{
            xtype: 'box',
            id: 'header',
            html: '<h1 style="float:left">RD DOC :: Gerênciamento Eletrônico de Documentos</h1><span id="btn-sair" style="float:right; margin: 8px"></span>',
            height: 42,
            width: '100%'
    	},{
            xtype: 'customtoolbar'
        }],
		collapsible:false,
		split: false,
		height: 72
	},{
		region: 'center',
		layout: 'border',
		xtype: 'mainpanel'
	}]					
});