/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_saku_inventory_report_fDashboard = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_saku_inventory_report_fDashboard.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_saku_inventory_report_fDashboard";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();
			this.app._mainForm.pButton.hide();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard Inventory", 99);	
			uses("portalui_tabPage;portalui_childPage;portalui_roundPanel;portalui_chart");
			var frameWidth = this.width / 3 - 20;
			this.tab = new portalui_tabPage(this,{bound:[0,0,this.width - 2, this.height - 5],borderColor:"#35aedb"});			
			this.tab.actClr = "#299fcb";this.tab.deactClr = "#35aedb";	        
			this.tab.setHeaderHeight(30);
			this.tab.addPage(["Summary","Penjualan","Pembelian","Stock"]);                        
			this.fr1 = new portalui_roundPanel(this.tab.childPage[0],{bound:[10,30,frameWidth,350],caption:"Penjualan",background:"image/themes/dynpro/bluegradient.png",color:"#edf5f8",titleBg:"#95cae8"});									
	        this.fr1.chart = new portalui_chart(this.fr1,{bound:[5,0,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50]});
	        this.fr1.chart.setRightPadding(0);
			this.fr1.chart.setChartType(2);
			this.fr1.chart.setShowBorder(false);			
			this.fr1.chart.setTitle("");
			var data = {"STPD":{"Jml Dok": 30},"FPJP":{"Jml Dok": 55},"Purchase Request":{"Jml Dok": 50},
						"Purchase Order":{"Jml Dok": 40},"Invoice":{"Jml Dok": 65},"Approval GA":{"Jml Dok": 30},
						"Approval Accounting":{"Jml Dok": 95},"Approval Treasury":{"Jml Dok": 15},
						"Pembayaran":{"Jml Dok": 5}};
			this.fr1.chart.setDataProvider(data);			
			this.fr2 = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.fr1.left+this.fr1.width + 15,30,frameWidth,350],caption:"Pembelian",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});						
			this.fr2.chart = new portalui_chart(this.fr2,{bound:[5,0,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50]});
	        this.fr2.chart.setRightPadding(50);
			this.fr2.chart.setChartType(3);
			this.fr2.chart.setShowBorder(false);			
			this.fr2.chart.setTitle("");
			var data = {"Jml Dok":{"STPD": 60,"FPJP":55,"Purchase Request":50,"Purchase Order":40,"Invoice":35,"Approval GA":30,
                        "Approval Accounting":25,"Approval Treasury":15,"Pembayaran":5}};
			this.fr2.chart.setDataProvider(data);	
			this.fr3 = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.fr2.left+this.fr2.width + 15,30,frameWidth,350],caption:"Stock",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
			this.fr3.chart = new portalui_chart(this.fr3,{bound:[5,0,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50]});
	        this.fr3.chart.setRightPadding(50);
			this.fr3.chart.setChartType(2);
			this.fr3.chart.setShowBorder(false);
			this.fr3.chart.setTitle("");
			var data = {"STPD":{"Jml Dok": 20},"FPJP":{"Jml Dok": 35},"Purchase Request":{"Jml Dok": 50},
						"Purchase Order":{"Jml Dok": 40},"Invoice":{"Jml Dok": 55},"Approval GA":{"Jml Dok": 30},
						"Approval Accounting":{"Jml Dok": 65},"Approval Treasury":{"Jml Dok": 15},
						"Pembayaran":{"Jml Dok": 15}};
			this.fr3.chart.setDataProvider(data);				
			
			
			this.fr4 = new portalui_roundPanel(this.tab.childPage[1],{bound:[10,30,frameWidth,350],caption:"Penjualan Terlaris",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});									
	        this.fr4.chart = new portalui_chart(this.fr4,{bound:[5,0,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50]});
	        this.fr4.chart.setRightPadding(0);
			this.fr4.chart.setChartType(2);
			this.fr4.chart.setShowBorder(false);			
			this.fr4.chart.setTitle("");
			var data = {"STPD":{"Jml Dok": 40},"FPJP":{"Jml Dok": 55},"Purchase Request":{"Jml Dok": 42},
						"Purchase Order":{"Jml Dok": 89},"Invoice":{"Jml Dok": 28},"Approval GA":{"Jml Dok": 10},
						"Approval Accounting":{"Jml Dok": 20},"Approval Treasury":{"Jml Dok": 56},
						"Pembayaran":{"Jml Dok": 75}};
			this.fr4.chart.setDataProvider(data);			
			this.fr5 = new portalui_roundPanel(this.tab.childPage[1],{bound:[this.fr4.left+this.fr4.width + 15,30,frameWidth,350],caption:"Penjualan Barang Promosi",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});						
			this.fr5.chart = new portalui_chart(this.fr5,{bound:[5,0,this.fr5.getClientWidth() - 30,this.fr5.getClientHeight() - 50]});
	        this.fr5.chart.setRightPadding(50);
			this.fr5.chart.setChartType(3);
			this.fr5.chart.setShowBorder(false);			
			this.fr5.chart.setTitle("");
			var data = {"Jml Dok":{"STPD": 60,"FPJP":95,"Purchase Request":43,"Purchase Order":30,"Invoice":75,"Approval GA":20,
                        "Approval Accounting":95,"Approval Treasury":25,"Pembayaran":85}};
			this.fr5.chart.setDataProvider(data);	
			this.fr6 = new portalui_roundPanel(this.tab.childPage[1],{bound:[this.fr5.left+this.fr5.width + 15,30,frameWidth,350],caption:"Total Penjualan",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
			this.fr6.chart = new portalui_chart(this.fr6,{bound:[5,0,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50]});
	        this.fr6.chart.setRightPadding(50);
			this.fr6.chart.setChartType(2);
			this.fr6.chart.setShowBorder(false);
			this.fr6.chart.setTitle("");
			var data = {"STPD":{"Jml Dok": 20},"FPJP":{"Jml Dok": 35},"Purchase Request":{"Jml Dok": 50},
						"Purchase Order":{"Jml Dok": 40},"Invoice":{"Jml Dok": 55},"Approval GA":{"Jml Dok": 30},
						"Approval Accounting":{"Jml Dok": 65},"Approval Treasury":{"Jml Dok": 15},
						"Pembayaran":{"Jml Dok": 15}};
			this.fr6.chart.setDataProvider(data);				
			
			this.fr7 = new portalui_roundPanel(this.tab.childPage[2],{bound:[10,30,frameWidth,350],caption:"Pembelian",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});									
	        this.fr7.chart = new portalui_chart(this.fr7,{bound:[5,0,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50]});
	        this.fr7.chart.setRightPadding(0);
			this.fr7.chart.setChartType(2);
			this.fr7.chart.setShowBorder(false);			
			this.fr7.chart.setTitle("");
			var data = {"STPD":{"Jml Dok": 80},"FPJP":{"Jml Dok": 55},"Purchase Request":{"Jml Dok": 50},
						"Purchase Order":{"Jml Dok": 40},"Invoice":{"Jml Dok": 65},"Approval GA":{"Jml Dok": 30},
						"Approval Accounting":{"Jml Dok": 85},"Approval Treasury":{"Jml Dok": 15},
						"Pembayaran":{"Jml Dok": 5}};
			this.fr7.chart.setDataProvider(data);			
			this.fr8 = new portalui_roundPanel(this.tab.childPage[2],{bound:[this.fr7.left+this.fr7.width + 15,30,frameWidth,350],caption:"Pembelian Barang Baru",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});						
			this.fr8.chart = new portalui_chart(this.fr8,{bound:[5,0,this.fr8.getClientWidth() - 30,this.fr8.getClientHeight() - 50]});
	        this.fr8.chart.setRightPadding(50);
			this.fr8.chart.setChartType(3);
			this.fr8.chart.setShowBorder(false);			
			this.fr8.chart.setTitle("");
			var data = {"Jml Dok":{"STPD": 16,"FPJP":65,"Purchase Request":50,"Purchase Order":30,"Invoice":65,"Approval GA":38,
                        "Approval Accounting":45,"Approval Treasury":85,"Pembayaran":50}};
			this.fr8.chart.setDataProvider(data);	
			this.fr9 = new portalui_roundPanel(this.tab.childPage[2],{bound:[this.fr8.left+this.fr8.width + 15,30,frameWidth,350],caption:"Total Pembelian",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
			this.fr9.chart = new portalui_chart(this.fr9,{bound:[5,0,this.fr9.getClientWidth() - 30,this.fr9.getClientHeight() - 50]});
	        this.fr9.chart.setRightPadding(50);
			this.fr9.chart.setChartType(2);
			this.fr9.chart.setShowBorder(false);
			this.fr9.chart.setTitle("");
			var data = {"STPD":{"Jml Dok": 5},"FPJP":{"Jml Dok": 38},"Purchase Request":{"Jml Dok": 58},
						"Purchase Order":{"Jml Dok": 32},"Invoice":{"Jml Dok": 51},"Approval GA":{"Jml Dok": 73},
						"Approval Accounting":{"Jml Dok": 45},"Approval Treasury":{"Jml Dok": 20},
						"Pembayaran":{"Jml Dok": 98}};
			this.fr9.chart.setDataProvider(data);				
			
			this.fr10 = new portalui_roundPanel(this.tab.childPage[3],{bound:[10,30,frameWidth,350],caption:"Stock Barang Baku",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});									
	        this.fr10.chart = new portalui_chart(this.fr10,{bound:[5,0,this.fr10.getClientWidth() - 30,this.fr10.getClientHeight() - 50]});
	        this.fr10.chart.setRightPadding(0);
			this.fr10.chart.setChartType(2);
			this.fr10.chart.setShowBorder(false);			
			this.fr10.chart.setTitle("");
			var data = {"STPD":{"Jml Dok": 10},"FPJP":{"Jml Dok": 55},"Purchase Request":{"Jml Dok": 50},
						"Purchase Order":{"Jml Dok": 20},"Invoice":{"Jml Dok": 45},"Approval GA":{"Jml Dok": 30},
						"Approval Accounting":{"Jml Dok": 15},"Approval Treasury":{"Jml Dok": 85},
						"Pembayaran":{"Jml Dok": 75}};
			this.fr10.chart.setDataProvider(data);			
			this.fr11 = new portalui_roundPanel(this.tab.childPage[3],{bound:[this.fr10.left+this.fr10.width + 15,30,frameWidth,350],caption:"Stock Barang Jadi",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});						
			this.fr11.chart = new portalui_chart(this.fr11,{bound:[5,0,this.fr11.getClientWidth() - 30,this.fr11.getClientHeight() - 50]});
	        this.fr11.chart.setRightPadding(50);
			this.fr11.chart.setChartType(3);
			this.fr11.chart.setShowBorder(false);			
			this.fr11.chart.setTitle("");
			var data = {"Jml Dok":{"STPD": 10,"FPJP":25,"Purchase Request":50,"Purchase Order":40,"Invoice":35,"Approval GA":30,
                        "Approval Accounting":45,"Approval Treasury":75,"Pembayaran":90}};
			this.fr11.chart.setDataProvider(data);	
			this.fr12 = new portalui_roundPanel(this.tab.childPage[3],{bound:[this.fr11.left+this.fr11.width + 15,30,frameWidth,350],caption:"Total Stock"});			
			this.fr12.chart = new portalui_chart(this.fr12,{bound:[5,0,this.fr12.getClientWidth() - 30,this.fr12.getClientHeight() - 50]});
	        this.fr12.chart.setRightPadding(50);
			this.fr12.chart.setChartType(2);
			this.fr12.chart.setShowBorder(false);
			this.fr12.chart.setTitle("");
			var data = {"STPD":{"Jml Dok": 20},"FPJP":{"Jml Dok": 55},"Purchase Request":{"Jml Dok": 30},
						"Purchase Order":{"Jml Dok": 60},"Invoice":{"Jml Dok": 35},"Approval GA":{"Jml Dok": 80},
						"Approval Accounting":{"Jml Dok": 95},"Approval Treasury":{"Jml Dok": 5},
						"Pembayaran":{"Jml Dok": 75}};
			this.fr12.chart.setDataProvider(data);				
		}catch(e){				
			this.app.alert(e,"");
		}
    }
};
window.app_saku_inventory_report_fDashboard.extend(window.portalui_childForm);
window.app_saku_inventory_report_fDashboard.implement({
    doClose: function(sender){
        this.app._mainForm.pButton.show();
    }
});
//----------------------------- Function ---------------------------------------
