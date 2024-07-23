Ext.define('Control.store.Usuario',{
	extend: 'Ext.data.Store',
	model: 'Control.model.Usuario',
	remoteSort: false,
	pageSize : Control.util.Util.pageSize,
	proxy: {
		type: 'ajax',
		url: '/usuario/listar',
		reader: {
			type: 'json',
			root: 'rows',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	}	
});