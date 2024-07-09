Ext.define('SCD.controller.Usuario', {
    extend: 'Ext.app.Controller',
    models: ['Usuario'],
    stores: ['Usuario'],
    views: ['usuario.Lista',
        'usuario.Form'
    ],
    refs: [{ ref: 'usuarioLista', selector: 'usuariolista' }],
    init: function () {
        this.control({
            'usuariolista button[action=novo]': { click: this.buttonNovoPressed },
            'usuariolista button[action=activate]': { click: this.activateDisableUser },
            'usuariolista button[action=disable]': { click: this.activateDisableUser },
            'usuariolista button[action=editar]': { click: this.buttonNovoPressed },
            'usuarioform button[action=salvar]': { click: this.btnSavePressed },
            'usuariolista button[action=excluir]': { click: this.excluir },
            'usuariolista': { itemdblclick: this.itemDblClick, render: this.loadGrid }
        });
    },

    excluirDocumento: function () {
        var grid = this.getUsuarioUploadLista(),
            record = grid.getSelectionModel().getSelection()[0];
        if (record.length === 0) {
            Ext.Msg.alert({
                title: 'Atenção',
                msg: 'Selecione documento!',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.OK
            });
            return false;
        }

        Ext.Msg.confirm('Atenção', 'Realmente deseja excluir o colabo' + record.get('nome') + '?', function (btn) {
            if (btn != 'yes') return;
            grid.el.mask('Excluindo, aguarde...');
            Ext.Ajax.request({
                url: '/usuario/excluirDocumento',
                params: {
                    id: record.get('id'),
                    path: record.get('path'),
                    filename: record.get('filename')
                },
                success: function (response) {
                    var json = Ext.decode(response.responseText);
                    if (json.success) {
                        grid.getStore().remove(record);
                        grid.el.unmask();
                    }
                    else {
                        SCD.util.showAlert(json.data);
                        grid.el.unmask();
                    }
                }
            });
        });
    },

    addUpload: function (btn) {
        var win = btn.up('window'),
            form = win.down('form'),
            grid = this.getUsuarioUploadLista();


        if (form.getForm().isValid()) {
            win.el.mask('Salvando dados, aguarde..');
            form.getForm().submit({
                url: '/Upload/salvar',
                success: function (frm, action) {
                    win.el.unmask();
                    grid.getStore().add(Ext.create('SCD.model.Upload', {
                        nome: form.getForm().findField('nome').getValue(),
                        path: action.result.path,
                        filename: action.result.filename,
                        extension: action.result.extension
                    }));

                    form.getForm().reset();
                    win.hide();
                },
                failure: function (o, response) {
                    var json = Ext.decode(response.response.responseText);
                    SCD.util.showAlert(json.data);
                    win.el.unmask();
                }
            });
        }
    },

    loadGrid: function (grid) {
        grid.getStore().load();
    },

    itemDblClick: function (view, record) {
        var win = (!Ext.getCmp('usuarioform')) ? Ext.widget('usuarioform') : Ext.getCmp('usuarioform'),
            form = win.down('form');
        win.setTitle('Usuario : Editar');
        form.loadRecord(record);
        win.show();
    },


    buttonNovoPressed: function (btn) {
        var win = (!Ext.getCmp('usuarioform')) ? Ext.widget('usuarioform') :
            Ext.getCmp('usuarioform'),
            form = win.down('form');

        form.getForm().reset();

        switch (btn.action) {
            case 'novo':
                win.setTitle('Usuario : Novo');
                break;

            case 'editar':
                win.setTitle('Usuario : Editar');
                var gridRecord = this.getUsuarioLista().getSelectionModel().getSelection()[0];
                var record = this.getUsuarioLista().getStore().findRecord("ID",
                    gridRecord.get("ID"));
                var comboFuncionario = form.down("colaboradorcombo");
                var comboPerfil = form.down("perfilcombo");
                form.loadRecord(record);
                comboFuncionario.addRecord(record.raw.funcionario);
                comboPerfil.addRecord(record.raw.perfil);
                break;
        }
        win.show();
    },



    btnSavePressed: function (btn) {
        var win = btn.up().up(),
            form = win.down('form').getForm(),
            grid = this.getUsuarioLista();
        if (form.isValid()) {
            var formValues = form.getValues();

            if (formValues.SENHA != formValues.repetir_senha) {
                Ext.Msg.alert({
                    title: 'Atencao',
                    msg: 'Os campos senha e repertir senha devem ser identicos!',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
                return false;
            }

            win.el.mask('Salvando dados, aguarde...');
            Ext.Ajax.request({
                url: SCD.util.urlBackEnd + '/usuario/salvar',
                method: 'POST',
                jsonData: Ext.encode(formValues),
                success: function (respose) {
                    var json = Ext.decode(respose.responseText);
                    if (json.success == false) {
                        SCD.util.showAlert(json.data);
                        win.el.unmask();
                    } else {
                        form.reset();
                        win.el.unmask();
                        grid.getStore().load();
                        win.hide();
                    }
                },
                failure: function (o, response) {
                    console.log(o);
                    console.log(response);
                    var json = Ext.decode(o.responseText);
                    SCD.util.showAlert(json.data);
                    win.el.unmask();
                }
            });
        }
    },

    excluir: function () {
        var grid = this.getUsuarioLista(),
            record = grid.getSelectionModel().getSelection()[0];

        if (record.length === 0) {
            SCD.util.showAlert('Selecione usuario!');
            return false;
        }

        Ext.Msg.confirm('Atenção', 'Realmente deseja excluir o usuario ' + record.get('NOME') + '?', function (btn) {
            if (btn != 'yes') return;
            grid.el.mask('Excluindo, aguarde...');
            Ext.Ajax.request({
                url: SCD.util.urlBackEnd + '/usuario/excluir/' + record.get('IDINFO'),
                success: function (response) {
                    var json = Ext.decode(response.responseText);
                    if (json.success) {
                        grid.getStore().remove(record);
                        grid.el.unmask();
                    }
                    else {
                        SCD.util.showAlert(json.data);
                        grid.el.unmask();
                    }
                }
            });
        });
    },


    activateDisableUser: function (btn) {
        var grid = this.getUsuarioLista(),
            record = grid.getSelectionModel().getSelection()[0];

        if (record.length === 0) {
            SCD.util.showAlert('Selecione usuario!');
            return false;
        }
        var action = btn.action;
        Ext.Msg.confirm('Atenção', 'Realmente deseja ' + btn.action + ' o usuario ' + record.get('NOME') + '?', function (btn) {
            if (btn != 'yes') return;
            grid.el.mask('Excluindo, aguarde...');
            Ext.Ajax.request({
                method: 'PATCH',
                url: SCD.util.urlBackEnd + '/usuario/' + record.get('ID') + '/' + action,
                success: function (response) {
                    var json = Ext.decode(response.responseText);
                    if (json.success) {
                        grid.getStore().remove(record);
                        grid.el.unmask();
                    }
                    else {
                        SCD.util.showAlert(json.data);
                        grid.el.unmask();
                    }
                }
            });
        });
    }
});