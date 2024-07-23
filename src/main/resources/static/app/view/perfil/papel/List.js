Ext.define('Control.view.perfil.papel.List', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.perfilpapellist',
	store: 'PerfilModulo',
	selModel: Ext.create('Ext.selection.RowModel', {singleSelect: true}),
	forceFit: true,
	border: false,
//	viewConfig: {
//        style: { overflow: 'auto', overflowX: 'hidden' }
//	},
	stateful: true,	
	plugins: Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit: 1}),	
	columns: [{
		xtype: 'checkcolumn',
		header: '',
		width: 20,
		align: 'center',
		dataIndex: 'ativo',
		editor: {
			xtype: 'checkbox',
			cls: 'x-grid-checkheader-editor'
		},
		listeners: {
      checkchange : function(column, recordIndex, checked) {
          this.up('gridpanel').fireEvent('edit', column, recordIndex, checked);
      }
    }
	},{
		header: 'Id',
		dataIndex: 'id',
		sortable: true,
		hidden: true
	},{
		header: 'Ação',
		dataIndex: 'nome',
		sortable: true
	}]
});