Ext.define('SCD.view.usuario.Lista',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.usuariolista',
	store: 'Usuario',
	selModel: Ext.create('Ext.selection.RowModel', {singleSelect: true}),
	forceFit: true,
	border: false,
	viewConfig: {
    getRowClass: function(record,index,p,store) {
      if(record.data.CANCELADO == 1){
        return 'red-row';
      } else {
        return;
      }
    }
	},		
	tbar: [{
		text: 'Novo',
		action: 'novo',
		iconCls: 'silk-application-add'
	},{
		text: 'Editar',
		action: 'editar',
		iconCls: 'silk-application-update'
	},{
		text: 'Ativar',
		iconCls: 'silk-lock',
		action: 'activate'
	},{
		text: 'Desativar',
		iconCls: 'silk-lock-open',
		action: 'disable'
	}],
	columns: [{
		header: 'Id',
		dataIndex: 'ID',
		hidden: true,
		flex: 1
	},{
		header: 'Usuário',
		dataIndex: 'NOME',
		sortable: true,
		flex: 1
	},{
		header: 'Ativo?',
		dataIndex: 'active',
		sortable: true,
		flex: 1,
		renderer: SCD.util.renderSimNaoInteger
	},{
		header: 'Funcionário',
		dataIndex: 'funcionario.nome',
		renderer: function(v, m, r) {
			if(typeof r.data["funcionario"] != "undefined")
				return r.data.funcionario.NOME;
			else
				return r.raw.funcionario.NOME;
		},		
		sortable: true,
		flex: 3
	},{
		header: 'Perfil',
		dataIndex: 'perfil.nome',
		sortable: true,
		renderer: function(v, m, r) {
			if(typeof r.data["perfil"] != "undefined")
				return r.data.perfil.nome;
			else
				return r.raw.perfil.nome;
		},
		flex: 2
	}]
	,dockedItems: [{
		xtype: 'pagingtoolbar',
		displayMsg: 'Total de {0} - {1} de {2}',
		store: 'Usuario',
		dock: 'bottom',
		displayInfo: true
	}]
});	