//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_kopeg_fCustMenu = function(owner){
	try{
		if (owner)
		{
			window.app_frontend_kopeg_fCustMenu.prototype.parent.constructor.call(this, owner);
			window.app_frontend_kopeg_fCustMenu.prototype.parent.setBorder.call(this, 0);		
			window.app_frontend_kopeg_fCustMenu.prototype.parent.setColor.call(this, "");		
			this.className = "app_frontend_kopeg_fCustMenu";											
			this.initComponent();		
			this.p_tmp = undefined;
		}
	}catch(e)
	{
		systemAPI.alert("[app_frontend_kopeg_fCustMenu]::contruct:"+e,"");
	}
};
window.app_frontend_kopeg_fCustMenu.extend(window.portalui_panel);
window.app_frontend_kopeg_fCustMenu.implement({
	initComponent: function(){
		uses("util_standar;portalui_image;portalui_saiGrid;portalui_datePicker;portalui_saiCBBL;util_file");
		uses("portalui_saiCB;portalui_uploader;portalui_saiMemo;portalui_pager;server_util_mail");			
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);									
			this.standarLib = new util_standar();			
			var top = document.all ? 104:102;						
			this.img = new portalui_image(this);
			this.img.setBound(0,0,100,100);			
			this.img.setImage("image/themes/"+system.getThemes()+"/logo_depan_kopeg.png");			
			this.salesMenu = new portalui_FEtabPanel(this);
			this.salesMenu.setBound(10,top,260,410);					
			this.salesMenu.setBgColor("");	
			this.salesMenu.addPage(["Menu Anggota"]);						
			this.salesMenu.setBackground("#ffffff");
			this.salesMenu.onTabChange.set(this,"doTabChange");
			this.salesMenu.childPage[0].getCanvas().style.background="url(image/themes/dynpro/back_tab.gif)";			
			this.salesMenu.childPage[0].getCanvas().style.overflow = "auto";
			this.salesMenu.onChildItemsClick.set(this,"doChildItemsClick");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Profil Anggota</td></tr></table>","app_frontend_kopeg_fCustProfil","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Input Pemesanan</td></tr></table>","app_frontend_kopeg_fCustPesan","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Edit Pemesanan</td></tr></table>","app_frontend_kopeg_fCustEPesan","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Input Pembayaran</td></tr></table>","app_frontend_kopeg_fCustBayar","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Edit Pembayaran</td></tr></table>","app_frontend_kopeg_fCustEBayar","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Monitoring Pemesanan</td></tr></table>","app_frontend_kopeg_fCustMtrPsn","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Monitoring Pembayaran</td></tr></table>","app_frontend_kopeg_fCustMtrByr","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Kirim Pesan</td></tr></table>","app_frontend_kopeg_fCustSend","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Inbox Pesan</td></tr></table>","app_frontend_kopeg_fCustInbox","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Saldo Pinjaman</td></tr></table>","app_frontend_kopeg_fCustPinj","");
			this.salesMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Saldo Simpanan</td></tr></table>","app_frontend_kopeg_fCustSimp","");			
			this.detail = new portalui_FEtabPanel(this);
			this.detail.setBound(280,document.all ? 104: 102,350,410);	
			this.detail.setBgColor("");
			this.detail.addPage(["Deskripsi Member"]);
			this.detail.onTabChange.set(this,"doTabChange");
			this.detail.childPage[0].getCanvas().style.overflow="auto";			
			this.childBlock = new portalui_panel(this.detail);
			this.childBlock.setBound(1,1,this.detail.width-2,this.detail.height-2);
			this.childBlock.setColor("#FFF");
			this.childBlock.hide();			
			this.load = new portalui_image(this.childBlock);
			this.load.setBound(this.childBlock.getWidth() / 2 - 15,this.childBlock.getHeight() / 2 - 30,31,31);
			this.load.setImage("image/gridload.gif");			
			this.mail = new server_util_mail();
			this.p_tmp="";
			this.filename = "";
			this.tmpFile = "";
			this.saveData = false;
			this.file = new util_file();
			this.file.addListener(this);
			this.formBayar=false;
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSizeChange: function(width, height){
		this.img.setWidth(this.width - 2);			
		this.detail.setWidth(this.width - 300);					
		this.detail.rearrangeHeader();
		this.childBlock.setWidth(this.detail.getWidth()-2);			
		this.childBlock.setHeight(this.detail.getHeight()-20);			
		this.load.setLeft(this.childBlock.getWidth() / 2 - 15);
		this.load.setLeft(this.childBlock.getHeight() / 2 - 30);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			eval("result = "+result+";");			
			for (var i in result.rs.rows){				
				this.profile.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>"+result.rs.rows[i].judul+"</td></tr></table>",result.rs.rows[i].kode_konten,"");
			}
			this.doChildItemsClick(this.profile,result.rs.rows[0].kode_konten);				
		}
	},
	doChildItemsClick: function(sender,id,item){
		try
		{			
			if (this.app.ceklogin)
			{				
				for (var i in this.detail.childPage[0].childs.objList)
						system.getResource(i).free();
				
				
				this.childBlock.show();
				uses(id,true);
				eval("this.p_tmp = new "+id+"(this.detail.childPage[0]);");						
				this.detail.setChildCaption(0,this.p_tmp.title);																
				this.p_tmp.setBound(1,1,this.detail.width - (document.all ? 4: 2),document.all ? 390 :400);										
				this.childBlock.hide();
			}else systemAPI.alert("Silakan login dulu!");			
		}catch(e){
			this.childBlock.hide();
			systemAPI.alert("fCustMenu::doChildItemsClick : "+e);
		}
	}
});