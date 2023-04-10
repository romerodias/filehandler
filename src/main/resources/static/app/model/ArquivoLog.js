Ext.define('Control.model.ArquivoLog',{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id', type: 'int'
	},{
		name: 'user', type: 'string'
	},{
		name: 'action' , type: 'string'
	},{
		name: 'file', type: 'string'
	},{
		name: 'absolute_path', type: 'string'
	},{
		name: 'date', type: 'string'
	}]
});