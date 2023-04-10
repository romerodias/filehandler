/**
 * @class Ext.ux.SimpleSearch
 * @extends Ext.form.Panel 
 * Provide a simple search form to a Ext.grid.Panel
 * @author Romero Gonçalves Dias
 * @version 1.0.0
 */
Ext.define('Horas.util.SimpleSearch',{
	
	/* Begin Definitions */
	extend: 'Ext.form.Panel',
	alias: 'widget.simplesearch',
	
	
	/**
	 * @cfg {Array}
	 * Array that store the collections to load in combo
	 */
	arrData: [],
	
	/**
	 * @cfg (String) The text to display on textfield 
	 */
	searchText: 'Procurar',
	
	/**
	 * @cfg {Object} Adicional objects to load into the collections 
	 */
	arrElements: {},
	
	initComponent: function(a) 
	{
		var me = this;
		me.layout = 'hbox';
		me.border = false;
		me.arrData = [];
		
		/* If the user wants to add a pre-defined data to load in combo */
		if(typeof me.arrElements == 'object'){
			Ext.Array.each(me.arrElements,function(el){
				me._addRow(el);
			});
		};
		
		/* Define components */
		me.comboDataItens = Ext.create('Ext.form.field.ComboBox',{
			name: 'indice',
			displayField: 'cabecalho',
			valueField: 'campo',
            typeAhead: true,
		    mode: 'local',
		    forceSelection: true,
		    triggerAction: 'all',
		    queryMode: 'local',
			store:  Ext.create('Ext.data.ArrayStore', {
			    fields: ['cabecalho','campo']
			})
		});
		
		me.textField = Ext.create('Ext.form.field.Text',{
			emptyText: me.searchText
		});
		
		me.button = Ext.create('Ext.button.Button',{
			iconCls: 'silk-find'
		});
		
		me.items = [me.comboDataItens,me.textField,me.button];
		
		/*  Listen Events */
		me.button.on('click',me._onButtonClick,me); /* Button - Executa a função this::_onButtonClick no escopo da classe SimpleSearch */
		me.on('render',me._loadDataInCombo,me); /* Form -  Escuta o evento render e passa ser retornado os campos a serem pesquisados */
		me.comboDataItens.on('afterrender',me._selectFirstRecord,me); /* ComboDataItens - Escuta o evento afterrender e então seleciona o primeiro elemento */
		
		
		/* form parent::initComponent */
		me.callParent(arguments);
	},
	
	/**
	 * @private 
	 * Select the combo first record 
	 **/
	_selectFirstRecord: function() 
	{
		if(this.arrDataIndex.length) {
			this.comboDataItens.setValue(this.arrDataIndex[0]);
		}
	},
	
	
	/**
	 * @private
	 * This function evalute a search throught the grid panel
	 */
	_onButtonClick: function() 
	{
		var me = this,
			dataItem = me.comboDataItens.getValue(),
			content = me.textField.getValue();
		
		if(!dataItem){
			Ext.Msg.alert('Atenção','Preencha os argumentos da consulta corretamente!');
			return;
		}

		me.grid.getStore().proxy.extraParams = Ext.decode('{"'+ dataItem +'" : "' + content +'"}');
		me.grid.getStore().loadPage(1);
	},

	
	/**
	 * @private
	 * Carrega os dados no combo
	 */
	_loadDataInCombo: function() 
	{
		var me = this;
		me.grid = me.up('gridpanel');
		
		var arrGridColumns = me.grid.columns;
		var arrTmp = [];
		
		/* Recupera somente as colunas que estão marcardas como allowSimpleSearch: true */
		Ext.Array.each(arrGridColumns,function(k,v){
			if(typeof k.allowSimpleSearch != 'undefined' ){
				if(k.allowSimpleSearch === true) arrTmp.push(k);
			}
		});
				
		me.arrDataIndex = Ext.Array.pluck(arrTmp,"dataIndex");
		
		me.arrHeader = Ext.Array.pluck(arrTmp,"text");
		
		for(var i = 0; i < me.arrHeader.length; i++) {
			me._addRow({
				cabecalho: me.arrHeader[i], 
				campo: me.arrDataIndex[i]
			});
		}
		
		/* Carregas os dados na store do combo */
		me.comboDataItens.getStore().loadData(Ext.decode(Ext.encode(me.arrData)));
	},
	
	
	/**
	 * @private
	 * add element to the collections array this::arrData
	 */
	_addRow: function(el)
	{
		this.arrData.push(el);
	}
	
	
});