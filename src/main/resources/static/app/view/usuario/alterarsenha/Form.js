Ext.define('Control.view.usuario.alterarsenha.Form',{
	extend: 'Ext.window.Window',
	alias: 'widget.usuarioformalterarsenha',
	id: 'usuarioformalterarsenha',
	width: 281,
	title: 'Alterar Senha',
	height: 196,
	modal: true,
	layout: 'fit',
	border: false,
	closeAction: 'hide',
	items: [{
		xtype: 'form',
		defaults: {
			padding:'5px',
			labelAlign: 'top'
		},
		items: [{
			xtype: 'hidden',
			name: 'ID'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Senha',
			name: 'senha',
			inputType: 'password',
			allowBlank: false,
			blankText: 'A senha ? obrigat?ria',
			selectOnFocus: true,
			width: 250,
			enableKeyEvents: true
		}, {
			xtype: 'textfield',
			fieldLabel: 'Repetir Senha',
			name: 'repetir_senha',
			inputType: 'password',
			allowBlank: false,
			blankText: 'A senha é obrigat?ria',
			selectOnFocus: true,
			width: 250,
			enableKeyEvents: true
		}]
	}],
	buttons: [{
		text: 'Salvar',
		action: 'salvar',
		iconCls: 'icon-save',
		handler: function(btn) {
		    var win = btn.up().up();
		    var form = win.down('form').getForm();
		    if(form.isValid()) {
                var formValues = form.getValues();
                win.el.mask('Alterando sua senha, aguarde...');
                Ext.Ajax.request({
                    url: Control.util.urlBackEnd + '/usuario/alterar-senha',
                    method: 'POST',
                    jsonData: Ext.encode(formValues),
                    success: function(respose) {
                        var json = Ext.decode(respose.responseText);
                        if(json.success == false) {
                            Ext.Msg.alert({
                                title: 'Atenção',
                                msg: json.data,
                                icon: Ext.MessageBox.ERROR,
                                buttons: Ext.MessageBox.OK
                            });
                            win.el.unmask();
                        } else {
                            form.reset();
                            win.el.unmask();
                            win.hide();
                        }
                    },
                    failure: function(o,response) {
                        console.log(o);
                        console.log(response);
                        var json = Ext.decode(o.responseText);
                        Ext.Msg.alert({
                            title: 'Atenção',
                            msg: json.data,
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.MessageBox.OK
                        });
                        win.el.unmask();
                    }
                });
            }
		}
	}]	
});