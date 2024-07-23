Ext.define('Control.view.toolbar.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.customtoolbar',
    initComponent: function () {
        Ext.apply(this, {
            items: ['->', {
                id: 'InfoLogin',
                menu: [{
                    scope: this,
                    iconCls: 'silk-door-out',
                    handler: this.onSairClick,
                    tooltip: 'Sair do sistema',
                    text: 'Sair'
                }, {
                    text: 'Alterar Senha',
                    iconCls: 'silk-lock',
                    id: 'MenuAlterarSenha',
                    title: 'Alterar Senha',
                    eXtype: 'usuarioformalterarsenha',
                    handler: this.openForm,
                    hidden: true
                }, {
                    text: 'Perfis',
                    title: 'Cadastro de Perfis',
                    eXtype: 'perfilpanel',
                    //hidden: true,
                    handler: this.onClickMenu,
                    id: 'MenuCadastroPerfil',
                    requestContract: false
                }, {
                    text: 'Usuários',
                    title: 'Cadastro de Usuários',
                    eXtype: 'usuariolista',
                    //hidden: true,
                    handler: this.onClickMenu,
                    id: 'MenuCadastroUsuario',
                    requestContract: false
                }]

            }]
        });

        this.callParent(arguments);
    },

    onClickMenu: function () {
        var panel = Ext.getCmp('mainpanel');
        var me = this;
        var tabPanel = this.up('toolbar');

        tabPanel.openTab(panel, me);
    },

    openForm: function () {
        var me = this;
        var win = (!Ext.getCmp(me.eXtype)) ?
            Ext.widget(me.eXtype) : Ext.getCmp(me.eXtype);
        var win = Ext.getCmp(me.eXtype);
        win.show();
    },

    openTab: function (panel, novaAba) {
        var currentTab = null;
        var existeAba = panel.items.findBy(function (aba) {
            currentTab = aba;
            return aba.title === novaAba.title;
        }
        );
        if (!existeAba) {
            if (novaAba.eXtype != undefined) {
                novaAba = panel.add({
                    title: novaAba.title,
                    xtype: novaAba.eXtype
                });
            }
            else {
                novaAba = panel.add({
                    title: novaAba.title,
                    xtype: 'panel',
                    layout: 'fit',
                    items: [{
                        xtype: "component",
                        autoEl: {
                            tag: "iframe",
                            src: novaAba.script
                        }
                    }]
                });
            }
            panel.setActiveTab(novaAba);
        } else {
            panel.setActiveTab(currentTab);
        }
    },
    onSairClick: function () {
        Ext.Msg.confirm('Sair do Sistema', 'Tem certeza que deseja sair do sistema?', function (btn) {
            if (btn != 'yes')
                return;
            Ext.getBody().mask('Efetuando logoff...');
            Ext.Ajax.request({
                url: 'logout',
                success: function () {
                    window.location = '';
                }
            });
        }, this);
    }
});