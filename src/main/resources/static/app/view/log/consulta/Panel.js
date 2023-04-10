/**
 * This is an painel to perform some search against the log 
 * 
 * @author Romero Gonçalves Dias
 */

Ext.define('Control.view.log.consulta.Panel', {
	extend: 'Ext.panel.Panel',
	border: false,
	layout: 'border',
	alias: 'widget.logconsultapanel',
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				region: 'center',
				layout: 'border',
				items: [{
					region: 'north',
					title: 'Consultar Log',
					xtype: 'form',
					layout: 'hbox',
					defaults: {
						labelAlign: 'top',
						margin: 5
					},
					items: [{
						xtype: 'textfield',
						name: 'document',
						fieldLabel: 'Documento',
						width: 200,
						enableKeyEvents: true
					},{
						xtype: 'datefield',
						fieldLabel: 'Data Inicial',
						name: 'initialDate',
						submitFormat: 'Y-m-d',
						allowBlank: false,
						width: 100,
						enableKeyEvents: true
					},{
						xtype: 'datefield',
						fieldLabel: 'Data FInal',
						name: 'finalDate',
						submitFormat: 'Y-m-d',
						allowBlank: false,
						width: 100,
						enableKeyEvents: true
					},{
						xtype: 'button',
						text: 'Buscar',
						action: 'buscar',
						margin: '23 5 5 5',
						iconCls: 'icon-find'
					}]
				},{
					region: 'center',
					layout: 'fit',
					xtype: 'logconsultalista'
				}]
			}]			
		});
		me.callParent();
	}
});