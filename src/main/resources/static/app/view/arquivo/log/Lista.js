Ext.define('Control.view.arquivo.log.Lista', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.arquivologlista',
	border: false,
	store: 'ArquivoLog',
	initComponent: function() {
		Ext.apply(this,{	
			scroll: false,
			viewConfig: {
		        style: { 
		        	overflow: 'auto', 
		        	overflowX: 'hidden' 
		        }
			},				
			columns: [{
				header: 'Id',
				dataIndex: 'cont',
				hidden: true,
				width: 50
			},{
				header: 'Usuario',
				dataIndex: 'user',
				sortable: true,
				flex: 1
			},{
				header: 'Data',
				dataIndex: 'date',
				sortable: true,
				flex: 2
			},{
				header: 'Ação',
				dataIndex: 'action',
				sortable: true,
				flex: 1
			},{
				header: 'Arquivo',
				dataIndex: 'file',
				sortable: true,
				flex: 3
			}]
		});
			
		this.callParent(arguments);
	}	
});