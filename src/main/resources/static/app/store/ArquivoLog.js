Ext.define('Control.store.ArquivoLog',{
	extend: 'Ext.data.Store',
	model: 'Control.model.ArquivoLog',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		url: 'audit',
		reader: {
			type: 'json',
			root: 'rows',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		listeners: {
	        exception: function(proxy, response, operation) {
	        	var json = Ext.decode(response.responseText);
	            Ext.MessageBox.show({
	                title: 'Erro',
	                msg: json.data,
	                icon: Ext.MessageBox.ERROR,
	                buttons: Ext.Msg.OK
	            });
	        }
	    }
	},
	
	
	initComponent: function() {
		this.callParent(arguments);
	}
		
});