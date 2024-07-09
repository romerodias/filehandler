Ext.define('SCD.store.Usuario',{
	extend: 'Ext.data.Store',
	model: 'SCD.model.Usuario',
	remoteSort: false,
	pageSize : SCD.util.Util.pageSize,
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