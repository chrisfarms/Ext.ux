// combines multiple forms into one 
Ext.ux.TabbedFormPanel = Ext.extend(Ext.TabPanel,{

    initComponent: function(){
        // build a form for each set of fields
        this.forms = [];
        for(var i=0; i<this.fields.length; i++){
            var formConfig = this.fields[i];
            formConfig.record = this.record;
            this.forms.push(new Ext.form.FormPanel(formConfig));
        }
        // add sub views
        Ext.apply(this, {
            items: this.forms
        });
        // set the height to viewport height
        // since fullscreen will take up the wrong width
        this.height = Ext.Viewport.getSize().height;
        // super
        Ext.ux.TabbedFormPanel.superclass.initComponent.apply(this, arguments);
    },
    
    load: function(record){
        for(var i=0; i<this.forms.length; i++){
            this.forms[i].load(record);
        }
    },
    
    getValues: function(){
        var values = {};
        for(var i=0; i<this.forms.length; i++){
            if(this.forms[i]===false)
                continue;
            var formValues = this.forms[i].getValues();
            for(var k in formValues){
                if(formValues.hasOwnProperty(k))
                    values[k] = formValues[k];
            }
        }
        return values;
    }
});