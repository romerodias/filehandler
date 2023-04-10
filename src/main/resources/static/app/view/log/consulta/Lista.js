Ext.define('Control.view.log.consulta.Lista',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.logconsultalista',
	forceFit: true,
	border: false,
	//store: 'ArquivoLog',
	initComponent: function() {
		var myStore = Ext.create('Control.store.ArquivoLog', {remoteSort: true});
		
		Ext.apply(this,{
			store: myStore,
			tbar: [{
				xtype: 'exportgrid',
				tooltip: 'Exportar'
			}],	
			scroll: false,
			viewConfig: {
		        style: { 
		        	overflow: 'auto', 
		        	overflowX: 'hidden' 
		        }
			},	
			columns: [{
				header: 'ID',
				dataIndex: 'cont',
				hidden: true
			},{
				header: 'Documento',
				dataIndex: 'doc',
				sortable: true,
				width: 150
			},{
				header: 'Data',
				dataIndex: 'data',
				sortable: true,
				width: 80
			},{
				header: 'A��o',
				dataIndex: 'acao',
				sortable: true,
				width: 120
			},{
				header: 'Usu�rio',
				dataIndex: 'user',
				sortable: true,
				width: 80
			}],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				displayMsg: 'Total de {0} - {1} de {2}',
				store: myStore,
				dock: 'bottom',
				displayInfo: true
			}]
		});
		this.callParent(arguments);
	}
});