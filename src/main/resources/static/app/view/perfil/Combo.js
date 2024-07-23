Ext.define('Control.view.perfil.Combo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.perfilcombo',
	fieldLabel: 'Perfil',
	triggerAction: 'all',
	labelAlign: 'top',
	displayField: 'nome',
	valueField: 'id',
	queryMode: 'remote',
	queryParam: 'nome',
	remoteFilter: true,
	allowBlank: false,
	name: 'idperfil',
	trigger2Cls: 'x-form-clear-trigger',
	somenteAtivos: false,
	forceSelection: true,	
	initComponent: function() {
		this.store = Ext.create('Control.store.Perfil');
		//this.store.proxy.url = "funcionario/encontrarPorNome";
		this.onTrigger2Click = this.onTriggerClearClick;
		this.callParent();
	},
	
	addRecord: function(record) {
		var me = this;
		var novoPerfil = new Control.model.Perfil({
			 id: record.id,
			 nome: record.nome
		});
		me.store.insert(0,novoPerfil);
		me.setValue(record.id); 			
	},
	
	onTriggerClearClick: function() {
		this.clearValue();
	},

  getValue : function() {
    var me = this;
    return me.displayTplData[0];
  },

  getSlectedRecord: function() {
    var me = this;
    return me.displayTplData[0];
  }
});