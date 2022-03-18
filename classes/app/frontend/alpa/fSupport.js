//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fSupport = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fSupport.prototype.parent.constructor.call(this, owner,options);
			this.setBorder(0);		
			this.setColor("");		
			this.className = "app_frontend_alpa_fSupport";											
			this.initComponent();
			this.getClientCanvas().style.overflow = "auto";
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fSupport]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fSupport.extend(window.portalui_panel);
window.app_frontend_alpa_fSupport.implement({
	initComponent: function(){
		try{
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.swf1 = new portalui_flashObj(this,{bound:[0,0,this.width,150],flashId:this.getFullId()+"_swf1",flashFile:"classes/app/frontend/alpa/swf/support.swf"});   								
			this.profile = new portalui_roundPanel(this,{bound:[10,160,200,this.height - 170],background:"image/themes/dynpro/roundpanelBgCenter.png",caption:"Profile",icon:"image/themes/dynpro/iconpanel.png",color:"#efefef",titleBg:"#b5c6d5",view :0, itemClick:[this,"doChildItemsClick"]});			
			this.detail = new portalui_roundPanel(this,{bound:[220,160,this.width - 230,this.height - 170],background:"image/themes/dynpro/roundpanelBgCenter.png",caption:"Detail",icon:"image/themes/dynpro/iconpanel.png",color:"#efefef",titleBg:"#b5c6d5"});
			this.dbLib.getDataProviderA("select judul,kode_konten from portal_konten where kode_klp='K07' and kode_lokasi='"+this.app._lokasi+"' ");
		}catch(e){
			alert(e);
		}
	},
	doSizeChange: function(width, height){
		if (this.swf1 !== undefined)this.swf1.setBound(0,0,width,150);			
		if (this.detail !== undefined)this.detail.setBound(220,160,width - 230,height - 170);
		if (this.profile !== undefined)this.profile.setBound(10,160,200,height - 170);
	},
	doRequestReady: function(sender, methodName, result){
	   try{
    		if (sender == this.dbLib){
      
    			eval("result = "+result+";");
    			var img = [], judul = [], shortDesc = [], kd = [];
    			for (var i in result.rs.rows){				
    				img[img.length] = "";
    				judul[judul.length] =result.rs.rows[i].judul;                
                    shortDesc[shortDesc.length] = result.rs.rows[i].judul;
                    kd[kd.length] = result.rs.rows[i].kode_konten;
    			}
    			
    			this.profile.addItems(img, judul, shortDesc, kd);
    			this.doChildItemsClick(this.profile,result.rs.rows[0].kode_konten);				
    		}
  		}catch(e){
  		    alert(e);
        }
	},
	doChildItemsClick: function(sender,id,item){
		try{
			if (sender == this.profile)
			{
			    this.detail.fade(); 
				var temp = this.dbLib.getDataProvider("select judul,deskripsi from portal_konten where kode_konten='"+id+"' and kode_lokasi='"+this.app._lokasi+"' ");
				if (temp!=undefined)
				{				
					eval("temp = "+temp+";");
					if (temp.rs.rows!=undefined)
					{
						var data=temp.rs.rows[0];
						this.detail.setCaption(data.judul);
						var canvas = this.detail.getClientCanvas();										
						canvas.innerHTML="<div style='font-size:12px;padding-left:10px'>"+urldecode(data.deskripsi)+"</div>";
					}
				}else throw (temp);
			}
		}catch(e){
			systemAPI.alert("app_frontend_alpa_transaksi_fTabProfil::doChildItemsClick : ",e);
		}
	}
});
