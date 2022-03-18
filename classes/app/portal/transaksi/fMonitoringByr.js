//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_portal_transaksi_fMonitoringByr = function(owner,options){
	try{
		if (owner)
		{
			window.app_portal_transaksi_fMonitoringByr.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_portal_transaksi_fMonitoringByr";											
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Monitoring Pemesanan Barang",0);				
            this.initComponent();					
            this.onClose.set(this,"doClose");		
		}
	}catch(e)
	{
		alert("[app_portal_transaksi_fMonitoringByr]::contruct:"+e,"");
	}
};
window.app_portal_transaksi_fMonitoringByr.extend(window.portalui_childForm);
window.app_portal_transaksi_fMonitoringByr.implement({
	initComponent: function(){		
		try{
			uses("util_standar;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_flashObj");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.graph = new portalui_flashObj(this,{bound:[10,10,500,300],flashId:this.getFullId()+"_swf1",flashFile:"swf/open-flash-chart.swf",objectReady:[this,"doLoad"]});            
			this.bChart1 = new portalui_button(this,{bound:[10,330,80,20],caption:"Chart1",click:[this,"doClick"]});
			this.bChart2 = new portalui_button(this,{bound:[100,330,80,20],caption:"Chart2",click:[this,"doClick"]});
			this.chart = {
              "title":{
                "text":  "Analisa Rasio",
                "style": "{font-size: 20px; color:#0000ff; font-family: Verdana; text-align: center;}"
              },
            
              "y_legend":{
                "text": "Nilai",
                "style": "{color: #736AFF; font-size: 12px;}"
              },
            
              "elements":[
                {
                  "type":      "bar_glass",
                  "alpha":     0.5,
                  "colour":    "#9933CC",
                  "tip":       "Tip for purple bars<br>val=#val#, top=#top#",
                  "text--":      "Page views",
                  "font-size--": 10,
                  "values" :   [9]
                },
                {
                  "type":      "bar_glass",
                  "alpha":     0.5,
                  "colour":    "#44FF44",
                  "tip":       "Tip for green bars<br>val=#val#, top=#top#",
                  "text--":      "Page views",
                  "font-size--": 10,
                  "values" :   [6]
                },
                {
                  "type":      "bar_glass",
                  "alpha":     0.5,
                  "colour":    "#aaFF33",
                  "tip":       "Tip for green bars<br>val=#val#, top=#top#",
                  "text--":      "Page views",
                  "font-size--": 10,
                  "values" :   [8]
                }
              ],
            
              "x_axis":{
                "stroke":       1,
                "tick_height":  10,
                "colour":      "#d000d0",
                "grid_colour": "#00ff00",
                "labels": {
                  "labels": ["January"]
                }
               },
            
              "y_axis":{
                "stroke":      4,
                "tick_length": 3,
                "colour":      "#d000d0",
                "grid_colour": "#00ff00",
                "offset":      0,
                "max":         20
              },
            
              "tooltip":{
                "text": "Global Tooltip<br>val=#val#, top=#top#"
              }
            };                                          
            this.chart2 = {
	"title":{
		"text":"Pie for you sir?",
		"style":"{font-size: 30px;}"
	},
	"bg_colour": "#000000",
	"elements":[
		{
			"type":      "pie",
			"colours":   ["#d01f3c","#356aa0","#C79810"],
			"alpha":     0.6,
			"start-angle": 35,
			"radius":	55,
			"values" :   [
				2,
				3,
				{"value":65,"label":"hello (#val#)", "tip":"99 bottles of beer","on-click":"http://eden"},
				{"value":65,"on-click":"my_function"}
			]
		}
	]
};
		}catch(e){
			alert(e);
		}
	},
	doLoad: function(sender){	  	   			
	   var obj = this.graph.getObject();
       obj.load( JSON.stringify(this.chart) ); 
    },
    doClick: function(sender){
        var obj = this.graph.getObject();
        if (sender == this.bChart1) obj.load( JSON.stringify(this.chart) ); 
        else obj.load( JSON.stringify(this.chart2) ); 
    },
	doSizeChange: function(width, height){				
	},
	sg1onDblClick:function(sender, col, row){
		try{
			var data = this.dbLib.getDataProvider("select a.kode_produk,b.nama as nmbrg, a.bonus,a.jumlah,a.harga,(a.jumlah*a.harga) as tot "+
					"from portal_order_d a inner join portal_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi = b.kode_lokasi "+
					"where a.no_order='"+this.sg1mp.getCell(0,row)+"'  and a.kode_lokasi = '"+this.app._lokasi+"'  ",true);			
			if (typeof(data) != "string")
			{
				if (data.rs.rows[0] != undefined)
				{
					this.sg1mp2.clear();
					this.sg1mp2.showLoading();
					this.sg1mp2.setData(data);										
					this.sg1mp2.setColWidth([5,4,3,2,1,0],[100,100,100,100,100,100]);
					this.sg1mp2.columns.get(4).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(5).setColumnFormat(cfNilai);
				}
			}
			var tot=0;
			for (var k=0; k < this.sg1mp2.rows.getLength(); k++)
				tot+=nilaiToFloat(this.sg1mp2.getCell(5,k));			
			this.totalmp2.setText(floatToNilai(tot));
		}catch(e){
			alert(e);
		}
	}	
});
