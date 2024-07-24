Ext.define('Control.store.Perfil',{
	extend: 'Ext.data.Store'
	,model: 'Control.model.Perfil'
	,remoteSort: true
	,pageSize: Control.util.Util.pageSize
	,proxy: {
		 type	: 'ajax'
		,api 	: {
			read 	: '/perfil/listar'
		}
		,reader 	: {
			 type 				: 'json'
			,root 				: 'data'
			,successProperty 	: 'success'
			,totalProperty		: 'totalCount'
		}
	}
});