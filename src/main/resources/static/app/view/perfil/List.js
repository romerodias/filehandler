Ext.define('Control.view.perfil.List',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.perfillist',
	store: 'Perfil',
	forceFit: true,
	border: false,
  initComponent: function() {
    Ext.apply(this,{
      tbar: [{
        text: 'Novo',
        action: 'novo',
        iconCls: 'silk-application-add'
      },{
        text: 'Excluir',
        iconCls: 'silk-application-delete',
        action: 'excluir'
      }],
      columns: [{
        header: 'Id',
        dataIndex: 'id',
        hidden: true,
        flex: 1
      },{
        header: 'Nome',
        dataIndex: 'nome',
        sortable: true,
        flex: 9
      }]
    });
    this.callParent(arguments);
  },
	dockedItems: [{
		xtype: 'pagingtoolbar',
		displayMsg: 'Total de {0} - {1} de {2}',
		store: 'Perfil',
		dock: 'bottom',
		displayInfo: true
	}]
});	