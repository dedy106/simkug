//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_kopeg_fProfil = function(owner){
	try{
		if (owner)
		{
			window.app_frontend_kopeg_fProfil.prototype.parent.constructor.call(this, owner);
			window.app_frontend_kopeg_fProfil.prototype.parent.setBorder.call(this, 0);		
			window.app_frontend_kopeg_fProfil.prototype.parent.setColor.call(this, "");		
			this.className = "app_frontend_kopeg_fProfil";											
			this.initComponent();		
		}
	}catch(e)
	{
		systemAPI.alert("[app_frontend_kopeg_fProfil]::contruct:"+e,"");
	}
};
window.app_frontend_kopeg_fProfil.extend(window.portalui_panel);
window.app_frontend_kopeg_fProfil.implement({
	initComponent: function(){
		uses("util_standar;portalui_image");			
		try{
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;
			
			this.img = new portalui_image(this);													
			this.img.setBound(0,0,this.getForm().tab.getWidth()-2,100);			
			this.img.setImage("image/themes/"+system.getThemes()+"/logo_depan_kopeg.png");
			this.profile = new portalui_FEtabPanel(this);
			this.profile.setBound(10,100,260,410);					
			this.profile.setBgColor("");	
			this.profile.addPage(["Profile"]);						
			this.profile.setBackground("#ffffff");
			this.profile.onTabChange.set(this,"doTabChange");
			this.profile.childPage[0].getCanvas().style.background="url(image/themes/"+system.getThemes()+"/back_tab.gif)";
			this.profile.onChildItemsClick.set(this,"doChildItemsClick");
			
			this.detail = new portalui_FEtabPanel(this);
			this.detail.setBound(280,top,this.getForm().tab.width - 300,410);					
			this.detail.setBgColor("");			
			this.detail.addPage(["Detail"]);
			this.detail.onTabChange.set(this,"doTabChange");
			this.detail.childPage[0].getCanvas().style.background="url(image/themes/"+system.getThemes()+"/back_tab.gif)";
			this.dbLib.getDataProviderA("select judul,kode_konten from portal_konten where kode_klp='K02' and kode_lokasi='"+this.app._kodeLokasi+"' ");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSizeChange: function(width, height){
		this.img.setBound(0,0,this.width - 2,100);			
		this.detail.setBound(280,100,this.width - 300,410);					
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
		try{
			if (sender == this.profile)
			{
				var temp = this.dbLib.getDataProvider("select judul,deskripsi from portal_konten where kode_konten='"+id+"' ");
				if (temp!=undefined)
				{				
					eval("temp = "+temp+";");
					if (temp.rs.rows!=undefined)
					{
						var data=temp.rs.rows[0];
						this.detail.setChildCaption(0,data.judul);
						var canvas = this.detail.childPage[0].getCanvas();						
						canvas.style.padding="5px";
						canvas.style.overflow="auto";
						this.detail.childPage[0].setHeight(document.all ? this.detail.height - 20 : this.detail.height - 30);
						this.detail.childPage[0].setWidth(document.all ? this.detail.width: this.detail.width - 10);
						canvas.innerHTML="<div style='font-size:12px;'>"+data.deskripsi+"</div>";
					}
				}else systemAPI.alert("temp="+temp);
			}
		}catch(e){
			systemAPI.alert("app_frontend_kopeg_transaksi_fTabProfil::doChildItemsClick : "+e);
		}
	}
});