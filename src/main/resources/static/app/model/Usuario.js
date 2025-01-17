Ext.define('SCD.model.Usuario',{
	extend: 'Ext.data.Model',
	fields: [{
		name: 'ID', type: 'int'
	},{
		name: 'active', type: 'int'
	},{
		name: 'NOME', type: 'string'
	}],
	associations: [{ 
    	type: 'hasOne', 
    	model: 'SCD.model.Colaborador',
    	name: 'funcionario', 
    	associationKey: 'funcionario',
    	getterName: 'getFuncionario',
    	setterName: 'setFuncionario'
    },{
    	type: 'hasOne', 
    	model: 'SCD.model.Perfil',
    	name: 'perfil', 
    	associationKey: 'perfil',
    	getterName: 'getPerfil',
    	setterName: 'setPerfil'
    }]
});