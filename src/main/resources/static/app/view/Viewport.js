Ext.define('Control.view.Viewport',{
	extend: 'Ext.container.Viewport',
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
    	}],
		collapsible:false,
		split: false,
		height: 42
	},{
		region: 'center',
		layout: 'border',
		xtype: 'mainpanel'
	}]					
});