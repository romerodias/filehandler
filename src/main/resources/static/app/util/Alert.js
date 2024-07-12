Ext.define('Control.util.Alert', {
	alternateClassName: 'Control.alert',
	statics: {
		/**
		 * 
		 */
		info: function(options) {
			var configObj = {
				title: "RD DOC :: Gerênciamento Eletrônico de Documentos",
				icon: Ext.MessageBox.INFO,
				buttons: Ext.MessageBox.OK
			};
	
			if(Ext.isObject(options)) {
				if(options["title"])
					configObj.title = options.title;
				if(options["msg"])
					configObj.msg = options.msg;				
			}
			
			if(Ext.isString(options)) {
				configObj.msg = options;
			}
	
			this.loadAlert(configObj);
		},
		
		loadAlert: function(configObj) {
			Ext.Msg.alert(configObj);
		}
	}
});