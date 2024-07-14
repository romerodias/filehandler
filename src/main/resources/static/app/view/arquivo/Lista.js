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
                text: 'Novo',
                action: 'novo',
                iconCls: 'silk-application-add'
            },{
                text: 'Download',
                action: 'download',
                iconCls: 'silk-application-edit'
            },{
                text: 'Deletar',
                action: 'deletar',
                iconCls: 'silk-application-delete'
            },{
				text: 'Enviar',
				action: 'bloquear',
				iconCls: 'lock-go',
				tooltip: 'Enviar arquivo por e-mail',
				disabled: true
			},{
				text: 'Desbloquear',
				action: 'desbloquear',
				iconCls: 'lock-delete',
				hidden: true
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
				dataIndex: 'name',
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