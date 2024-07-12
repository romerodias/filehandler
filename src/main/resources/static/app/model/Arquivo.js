Ext.define('Control.model.Arquivo',{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'PATH', type: 'string'
	},{
		name: 'FILENAME', type: 'string'
	},{
		name: 'PERM', type: 'string'
	},{
		name: 'extension' , type: 'string'
	},{
		name: 'STATUS' , type: 'string'
	},{
		name: 'OWNER', type: 'string'
	},{
		name: 'observation' , type: 'string'
	},{
		name: 'name' , type: 'string'
	},{
		name: 'canWrite' , type: 'boolean'
	}]
});