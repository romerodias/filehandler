Ext.define('Control.store.Diretorio' ,{
	extend: 'Ext.data.TreeStore',
	autoLoad: false,
	root: {
		text: 'Diretórios',
		expanded: false, 
		id: ''
	},
	proxy: {
		type: 'ajax',
		url: 'file-handler/list-dir',
		reader: {
			 type: 'json',
			 successProperty: 'success',
			 root: 'data'
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
	
//	constructor: function() {
//		var me = this;
//		//console.log(me);
//		//me.root.id = "c:";
//		
//		Ext.Ajax.request({
//			url: 'service/DiretorioBLL/getRootDir',
//			async: false,
//			success: function(frm, action) {
//				var dir = Ext.decode(frm.responseText);
//				//console.log(me.root.id);
//				
//				me.root.id = dir.data;
//				//
//			},
//			failure: function(o,response){
//				var json = Ext.decode(response.response.responseText);
//				Control.alert.info(json.data);
//			}
//		});
//		
//		
//		//console.log(me.root.id);
//		me.callParent(arguments);
//	
//	}
});