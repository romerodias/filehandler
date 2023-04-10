/**
 * This class has the responsability to send some information 
 * from the grid to the back-end
 * 
 * @author Romero Gonçalves Dias
 * 
 * This class need to pass to back-end the follow informations:
 * 	columns
 *  headers 
 *  extraParans
 *  filters 
 *  sorters
 */

Ext.define('Control.util.ExportGrid',{
	alias: 'widget.exportgrid',
	extend: 'Ext.button.Button',
	text: 'Exportar',
	iconCls: 'icon-excel',
	tooltip: 'Exportar tabela em excel',
	listeners: {
		click: function() { 
			/*TODO
				 Enviar para o back-end
					classe
					metodo
					argumento
					colunasIndex - O back-end espera uma string separada por "-" (traço)
					colunasHead - O back-end espera uma string separada por "-" (traço)
			 */
			var grid = this.up().up(),
				arrObjParams = [],
				urlRead = grid.store.proxy.url,
			    objParams = {};
			
			var arrUrl = urlRead.split('/');
			var objUrl = {
				classe: arrUrl[1],
				metodo: arrUrl[2]
			};
			
			
			
			//console.log(arrUrl);
			//console.log(objUrl);
			//console.log(Ext.urlEncode(objUrl));
			//return false;
			//var objClasseMetodo = Ext.urlEncode(objUrl);
			var objClasseMetodo = objUrl;
			var extraParams = grid.store.proxy.extraParams;
			
			//console.log(extraParams);
			
			//return false;
			
			if(extraParams) {
				Ext.apply(objParams,extraParams);
			}
			Ext.apply(objParams,objClasseMetodo);
			
			if(grid.filters){
				var filter = grid.filters.buildQuery(grid.filters.getFilterData());
				var arrFilter = Ext.decode(filter.filter);
	
				Ext.Array.each(arrFilter, function(name, index){
					Ext.apply(objParams,Ext.decode('{"'+name.field+'":"'+name.value+'"}'));
				});
			}
			
			/*argumento*/
			
			/* Pega a ordenação*/

			//colunasIndex
			
			var arrColunas = [];
			
			Ext.Array.each(grid.columns,function(obj){
				if(!obj.hidden){
					arrColunas.push(obj);
				}
			});
			var columnIndex = Ext.Array.pluck(arrColunas, 'dataIndex');
			var colunas = Ext.Array.pluck(arrColunas,'text');
			
			Ext.apply(
				objParams,
				this.makeObjColumnIndex(columnIndex),
				this.makeObjColumnName(colunas)
			);

			var strUrl = Ext.urlEncode(objParams);
			
			//TODO
			//Verificar a quantidade de caracteres que o browser suporta e veirica
			//a quantidade de caracteres gerada pela função para validar se o browser irá
			//suportar 
			
			/* Send data to back-end */
			window.location = 'exportar?' + strUrl;
		}
	},
	
	/*
	 * Returna um objeto para indice das colunas
	 */
	makeObjColumnIndex : function(arrColumns) {
		var obj = {
			i: arrColumns.join('-')
		};
		return obj;
	},
	
	makeObjColumnName : function(arrNames) {
		return {
			h: arrNames.join('-')
		};
	}
//	menu: [
//	       {text: 'Excel'},
//	       {text: 'PDF'},
//	 ]
});