Ext.define('Control.view.diretorio.Tree' ,{
	extend: 'Ext.tree.Panel',
	alias: 'widget.diretoriotree',
	heigth: 400,
	width: 400,
	useArrows: true,
	store: 'Diretorio',

	initComponent: function() {
		var me = this;
		me.store = Ext.data.StoreManager.lookup(me.store);
		//me.store.load();
		//me.expandAll();
		
		Ext.apply(me, {
			tbar: [{
				text: 'Bloquear',
				action: 'bloquear',
				iconCls: 'lock-go',
				hidden: true
			},{
				text: 'Desbloquear',
				action: 'desbloquear',
				iconCls: 'lock-delete',
				hidden: true
			}]
		});
		
		
		me.callParent(arguments);
	},
	
	listeners: {
		beforeload: function(store, operation, eOpts) {
			//console.log(this.getSelectionModel().getSelectedNode());
			//console.log(this);
			//console.log(operation.node);
			//console.log(operation.node.getPath());
			//operation.params.node = "teste";
			operation.params.node  = this.processParentsNodes(operation.node).getParentsNodes('/');
		}
	},
	
	
	/**
	* @cfg {Object}
	* Array contendo os parent�s nodes
	*/
	arrNodes: [],

	/**
	* @private
	* Itera sobre os parent�s nodes at� chegar ao root
	* @return void
	*/
	processParentsNodes: function(parentNode) {
		Ext.each(parentNode, function(node){
			
			if(node.isRoot())
				this.arrNodes.push(node.data.id);
			else
				this.arrNodes.push(node.data.text);
				
				
			if(node.isRoot() !== 0){
				this.processParentsNodes(node.parentNode);
			}
		},this);
		return this;
	},

	/**
	* Recupera a lista de parent�s nodes
	* @param {String} separator String que ser� retornada entre os elementos do array
	* @return {String}
	*/
	getParentsNodes: function(separator) {
		separator = separator || '-';
		var arrNodes = this.arrNodes || [];
		this.arrNodes = []; //Reseta o array de nodes
		return arrNodes.reverse().join(separator);
	},

	//Utilizando a fun��o
	onTreePanelItemClick: function(tree,record)
	{
		//ser� retornado os nodes Node1*Node2*Node3
		//console.log(this.processParentsNodes(record.parentNode).getParentsNodes('*'));
	}	
});