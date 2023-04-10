Ext.define('Control.store.Arquivo',{
	extend: 'Ext.data.Store',
	model: 'Control.model.Arquivo',
	proxy: {
		type: 'ajax',
		url: 'file-handler/list-files',
		reader: {
			type: 'json',
			root: 'data',
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
	}
		
});