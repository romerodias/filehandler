Ext.Loader.setPath('Ext.ux', 'extjs/examples/ux');

Ext.Loader.setPath('Control.util', 'app/util');

Ext.Loader.setPath('ux', 'app/ux');

Ext.Loader.setConfig({
    disableCaching: true
});

Ext.Loader.setConfig({
	enabled: true
});


Ext.require([
	'Ext.layout.container.Border',
	'Ext.container.Viewport',
//	'Ext.window.*',
	'Ext.toolbar.Paging',
//	'Ext.tip.*',
//	'Ext.form.*',
	'Ext.grid.Panel',
//	'Ext.data.*',
//	'Ext.state.*',
//	'Ext.util.*',
//	'Ext.toolbar.*',
	'Control.util.Util',
	'Control.util.Alert',
	'Control.util.ExportGrid',
	'Ext.ux.TextMaskPlugin',
    'Ext.layout.container.*',
    'Ext.resizer.Splitter',
    'Ext.fx.target.Element',
    'Ext.fx.target.Component',
    'Ext.window.MessageBox'
]);

//Ext.BLANK_IMAGE_URL = 'resources/images/s.gif';

Ext.application({
	 name: 'Control',
	 appFolder: 'app',
	 controllers: ['Login','Main','Usuario'],
	 autoCreateViewport: false,
	 
	 launch: function() 
	 {
		Ext.tip.QuickTipManager.init();
		
		//Ext.create('Control.view.Viewport');
		
		String.prototype.repeat = function(num) {
			return new Array(isNaN(num)? 1 : ++num).join(this);
	    }
		
		/* Incluse the Ajax request timeout */
		Ext.override(Ext.data.proxy.Ajax, { timeout: 60000 });
		//Ext.override(Ext.form.action.Action, { timeout: 60 });
		
		/**
		 * @Override
		 * @author Romero Gon�alves Dias
		 * 
		 * Add functionalities to store
		 */
		Ext.override(Ext.data.Store, {
			/**
			 * Retrieve an array containning the values from a column
			 * @param recordId {string} the field name
			 * @return {Object[]} An array of valures found in records fields
			 */
			getValuesById: function(fieldName) {
				var arrValues = [];
				this.each(function(record){
					arrValues.push(record.get(fieldName));	
				}, this);				
				return arrValues;
			},
			
			
			/**
			 * Finds the records in this store by a specific field value
			 * @param fieldName {String}
			 * @param value {String}
			 * @return {Object[]} An array of models
			 */
			findRecords: function(fieldName, value) {
				var arrRecords = [];
				this.each(function(record){
					if(record.get(fieldName) == value)
						arrRecords.push(record);	
				}, this);
				
				return arrRecords;
			}
		});
		
		
		/**
		 * @override
		 */
		Ext.override(Ext.grid.Panel, {
			/**
			 * Get the selected rows in a grid
			 * @return {Ext.data.Model[]} The selected records
			 */
			getSelectedItems: function()
			{
				return this.getSelectionModel().getSelection();
			},
			/**
			 * Return the values of the currently selected records
			 * @param {String} The field name 
			 * @return {Object[]} An array with field's value
			 */
			getFieldFromSelectedItems: function(fieldName) {
				var range = this.getSelectedItems();
				var arrValues = [];
				
				Ext.each(range,function(rec){
					arrValues.push(rec.get(fieldName));
				});
				
				return arrValues;
			}
		
		
		});
		
		var timeTest = /^([0-9][0-9][0-9]):([0-5][0-9])$/;
		Ext.apply(Ext.form.field.VTypes,{
			time: function(val,field){
				//console.log(val);
				return timeTest.test(val);
			},
			timeText: 'N�o � um hora v�lida. O formato � 999:59'
			//timeMask: /[\d{3}:\d{2}/i
		});
		//Ext.create('Ext.form.field.Text',{})
		
		Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider',{
		    expires: new Date(new Date().getTime()+(1000*60*60*24*7)) //7 days from now
		}));   
		
		
		Ext.override(Ext.tree.View, { 
		    setRootNode: function(node) {
		        var me = this;        
		        me.store.setNode(node);
		        me.node = node;
		        if (!me.rootVisible && me.store.autoLoad) {
		            node.expand();
		        }
		    }
		}); 

        Ext.create('Control.view.Viewport');

        Ext.widget('button', {
            renderTo: 'btn-sair',
            iconCls: 'silk-door-out',
            text: 'Sair',
            handler: function(){

                Ext.Msg.confirm('Sair do Sistema','Realmente deseja sair do sistema?',function(btn){
                    if(btn!='yes') return;
                    Ext.Ajax.request({
                        url: 'logout',
                        success: function() {
                            window.location = '';
                        }
                    });
                });
            }
        });

		
	}
});