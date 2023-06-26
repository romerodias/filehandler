Ext.define('Control.view.arquivo.Lista', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.arquivolista',
	border: false,
	stateId: 'arquivolista',
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	store: 'Arquivo',
	initComponent: function() {
		Ext.apply(this,{	
			tbar: [{
				text: 'Bloquear',
				action: 'bloquear',
				iconCls: 'lock-go',
				disabled: true
			},{
				text: 'Desbloquear',
				action: 'desbloquear',
				iconCls: 'lock-delete',
				disabled: true
			},{
				text: 'Ver Log',
				action: 'viewlog',
				iconCls: 'silk-report',
				disabled: true
			}],
			scroll: false,
			viewConfig: {
		        style: { 
		        	overflow: 'auto', 
		        	overflowX: 'hidden' 
		        }
			},	
			columns: [{
                header: '',
                dataIndex: 'canWrite',
                sortable: true,
                renderer: Control.util.getLock,
                width: 30
            },{
				header: 'Arquivo',
				dataIndex: 'text',
				sortable: true,
				width: 300,
				renderer: Control.util.getIconExtension
			},{
				header: 'Observações',
				dataIndex: 'observation',
				sortable: true,
				width: 300
			}]
		});
			
		this.callParent(arguments);
	}	
});