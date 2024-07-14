Ext.define('Control.view.arquivo.Form',{
	extend: 'Ext.window.Window',
	alias: 'widget.arquivoform',
	title: "Cadastro Documento",
	width: 480,
	title: '',	
	height: 200,
	modal: true,
	border: false,
	layout: 'fit',	
	closeAction: 'hide',
	items: [{
		xtype: 'tabpanel',
		items: [{
			title: 'Principal',
			items: [{
				xtype: 'form',
				border: false,
				defaults: {
					padding:'10px',
					labelAlign: 'top'
				},
				items: [{
          xtype: 'filefield',
          name: 'documento',
          fieldLabel: 'Arquivo',
          labelWidth: 50,
          msgTarget: 'side',
          allowBlank: false,
          anchor: '100%',
          buttonText: '...',
          listeners: {
             change: function(fld, value) {
                 var upload = fld.fileInputEl.dom;
                 var files = upload.files;
                 var names = [];
                 var names2 = [];

                 if (files) {
                     for (var i = 0; i < files.length; i++){
                         names.push(files[i].name);
                         names2.push({archivo:files[i].name})
                         value = names.join(', ');
                     }
                 }
                 fld.setRawValue(value);
             },
             afterrender:function(cmp){
                 cmp.fileInputEl.set({
                     multiple:'multiple'
                 });
             }
         }
				},{
				  xtype: 'hidden',
				  name: 'path'
				}]
			}]
		}]
	}],
	buttons: [{
		text: 'Salvar',
		action: 'salvar',
		iconCls: 'icon-save'
	}]	
});