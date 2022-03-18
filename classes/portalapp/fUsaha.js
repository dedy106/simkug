//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fUsaha = function(owner){
	try{
		if (owner)
		{
			window.portalapp_fUsaha.prototype.parent.constructor.call(this, owner);
			window.portalapp_fUsaha.prototype.parent.setBorder.call(this, 0);		
			window.portalapp_fUsaha.prototype.parent.setColor.call(this, "");		
			this.className = "portalapp_fUsaha";											
			this.initComponent();		
			this.title = "Unit Usaha";
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fUsaha]::contruct:"+e,"");
	}
};
window.portalapp_fUsaha.extend(window.portalui_panel);
window.portalapp_fUsaha.implement({
	initComponent: function(){
		try{			
			uses("util_standar");			
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.img = new portalui_image(this);													
			this.img.setBound(0,0,this.app._mainForm.tab.width-2,100);					
			this.img.setImage("image/themes/"+system.getThemes()+"/logo_depan_kopeg.png");
			this.profile = new portalui_FEtabPanel(this);
			this.profile.setBound(10,(document.all ? 104 : 102),260,410);					
			this.profile.setBgColor("");	
			this.profile.addPage([" UNIT USAHA "]);						
			this.profile.setBackground("#ffffff");
			this.profile.onTabChange.set(this,"doTabChange");
			this.profile.childPage[0].getCanvas().style.background="url(image/themes/"+system.getThemes()+"/back_tab.gif)";
			this.profile.onChildItemsClick.set(this,"doChildItemsClick");
			
			this.detail = new portalui_FEtabPanel(this);
			this.detail.setBound(290,(document.all ? 104 : 102),this.app._mainForm.tab.width - (document.all ? 320: 330), document.all ? 410:400);					
			this.detail.setBgColor("");			
			this.detail.addPage(["Deskripsi"]);
			this.detail.onTabChange.set(this,"doTabChange");
			this.detail.childPage[0].getCanvas().style.background="url(image/themes/"+system.getThemes()+"/back_tab.gif)";
			this.dbLib.getDataProviderA("select judul,kode_konten from portal_konten where kode_klp='K09' and kode_lokasi='"+this.app._kodeLokasi+"' ");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChildItemsClick: function(sender,id,item){
		try{			
			var temp = this.dbLib.getDataProvider("select judul,deskripsi from portal_konten where kode_konten='"+id+"' ");
			eval("temp ="+temp+";");
			if (temp!=undefined){
				tmp=temp.rs.rows;
				if (tmp[0]!=undefined)
				{
					var data=tmp[0];
					this.detail.setChildCaption(0,data.judul);					
					var canvas = this.detail.childPage[0].getCanvas();
					this.detail.childPage[0].setWidth(this.detail.width - (document.all ? 0: 10));
					canvas.style.padding="5px";
					canvas.style.overflow="auto";
					canvas.innerHTML="<div style='font-size:12px;'>"+data.deskripsi+"</div>";
				}
			}else throw("temp="+temp);
		}catch(e){
			systemAPI.alert("fUsaha::doChildItemsClick : "+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){			
			if (methodName == "getDataProvider"){
				eval("result= "+result+";");
				for (var i in result.rs.rows){				
					this.profile.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>"+result.rs.rows[i].judul+"</td></tr></table>",result.rs.rows[i].kode_konten,"");
				}
				if (result.rs.rows[0] != undefined)
					this.doChildItemsClick(this.profile,result.rs.rows[0].kode_konten);
			}
		}
	}
});