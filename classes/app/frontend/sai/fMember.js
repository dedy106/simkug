//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMember = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMember.prototype.parent.constructor.call(this, owner,options);
			this.setBorder(0);		
			this.setColor("");		
			this.alreadyLoad = false;
			this.className = "app_frontend_alpa_fMember";											
			this.initComponent();
			this.getClientCanvas().style.overflow = "auto";
		}
	}catch(e)
	{
		systemAPI.alert("[app_frontend_alpa_fMember]::contruct:",e);
	}
};
window.app_frontend_alpa_fMember.extend(window.portalui_panel);
window.app_frontend_alpa_fMember.implement({
	initComponent: function(){
		try{
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.swf1 = new portalui_flashObj(this,{bound:[0,0,this.width,150],flashId:this.getFullId()+"_swf1",flashFile:"classes/app/frontend/alpa/swf/member.swf"});   								
			
            this.pLogin = new portalui_roundPanel(this,{bound:[10,160,200,180],background:"image/themes/dynpro/greygradient.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#ccd9ef",caption:"Login Member"});
            this.uid = new portalui_saiLabelEdit(this.pLogin,{bound:[10,5,170,40],caption:"User Name",lblPosition:1});
            this.pwd = new portalui_saiLabelEdit(this.pLogin,{bound:[10,50,170,40],caption:"Password",password:true,lblPosition:1,keyDown:[this,"keyDown"]});
            this.bLogin = new portalui_button(this.pLogin,{bound:[10,95,80,20],caption:"Login",click:[this,"doClick"]});
            
            this.profile = new portalui_roundPanel(this,{bound:[10,350,200,this.height - 360],background:"image/themes/dynpro/roundpanelBgCenter.png",caption:"Profile",icon:"image/themes/dynpro/iconpanel.png",color:"#efefef",titleBg:"#b5c6d5",view :0, itemClick:[this,"doChildItemsClick"]});						            
			this.detail = new portalui_roundPanel(this,{bound:[230,160,this.width - 240,this.height - 170],background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",caption:"Info Member",view:0,itemClick:[this,"doChildItemsClick"]});			
			if (this.app._isLog) this.initMenu(this.app._mainForm.dataUser);
			else this.dbLib.getDataProviderA("select judul,kode_konten from portal_konten where kode_klp='K06' and kode_lokasi='"+this.app._lokasi+"' ");
		}catch(e){
			systemAPI.alert("Initialization failed",e);
		}
	},
	doRequestReady: function(sender, methodName, result){
	    try{    		
	       if (sender == this.dbLib){
	           if (methodName == "getDataProvider"){
	               eval("result = "+result);
	               if (typeof result != "string"){
	                   var img = [], judul = [], shortDesc = [], kd = [];
            			for (var i in result.rs.rows){				
            				img[img.length] = "";
            				judul[judul.length] =result.rs.rows[i].judul;                
                            shortDesc[shortDesc.length] = result.rs.rows[i].judul;
                            kd[kd.length] = result.rs.rows[i].kode_konten;
            			}
            			this.defaultMenu = {img:img,judul:judul, shortDesc:shortDesc, id:kd};
            			this.profile.addItems(img, judul, shortDesc, kd);
            			if (img.length != 0) this.doChildItemsClick(this.profile,result.rs.rows[0].kode_konten,this.profile.items.more[0].item);				
                   }
               }
           }
  		}catch(e){
  		    systemAPI.alert("Request Failed",e);
        }
	},
	doChildItemsClick: function(sender,className,item){
		try{
			if (sender == this.profile)
			{	
                if (item === undefined || item.img == "isClassName"){
                    uses(className,true);
    			    if (this.detail !== undefined) this.detail.free();
		            eval("this.detail = new "+className+"(this,{bound:[220,160,this.width -230,this.height - 170],background:\"image/themes/dynpro/roundpanelBgCenter.png\",caption:\"Detail\",icon:\"image/themes/dynpro/iconpanel.png\",color:\"#efefef\",titleBg:\"#b5c6d5\"});");			    
                }else {
                    this.detail.fade(); 
                    var id = className;
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
    				}else throw(temp);
                }
			}
		}catch(e){
			systemAPI.alert("app_frontend_alpa_transaksi_fTabProfil::doChildItemsClick : ",e);
		}
	},
	initMenu: function(userInfo){
	    this.bLogin.setCaption("Logout");            
        this.bLogin.setTop(this.uid.top);
        this.pwd.hide();
        this.uid.hide();
        this.profile.show();
        this.pLogin.setHeight(80);
        this.profile.setHeight(this.height - 260);
        this.profile.setTop(250);
        this.profile.setCaption("Logout");
        this.userInfo = userInfo;
        var img = [], title=[], shortDesc=[],id=[];
        for (var i=0;i < 10;i++) img[img.length] = "isClassName";
        for (var i=0;i < 10;i++) shortDesc[shortDesc.length] = "";
        title[title.length] = "Profil Anggota";id[id.length] = "app_frontend_alpa_fMemberProfile";
        title[title.length] = "Input Pemesanan";id[id.length] = "app_frontend_alpa_fMemberPesan";
        title[title.length] = "Edit Pemesanan";id[id.length] = "app_frontend_alpa_fMemberEPesan";
        title[title.length] = "Input Pembayaran";id[id.length] = "app_frontend_alpa_fMemberBayar";
        title[title.length] = "Edit Pembayaran";id[id.length] = "app_frontend_alpa_fMemberEBayar";
        title[title.length] = "Monitoring Pemesanan";id[id.length] = "app_frontend_alpa_fMemberMtrPsn";
        title[title.length] = "Monitoring Pembayaran";id[id.length] = "app_frontend_alpa_fMemberMtrByr";
        title[title.length] = "Kirim Pesan";id[id.length] = "app_frontend_alpa_fMemberSend";
        title[title.length] = "Inbox Pesan";id[id.length] = "app_frontend_alpa_fMemberInbox";        
	   if (userInfo.status == "anggota"){	        
	        title[title.length] = "PHT";id[id.length] = "app_frontend_alpa_fCustPHT";	        
       }else{            
	        title[title.length] = "Point Sales";id[id.length] = "app_frontend_alpa_fPointSales";	        	        
       }
       this.profile.setCaption(userInfo.nama);
       this.profile.addItems(img, title, shortDesc, id);
       this.doChildItemsClick(this.profile,"app_frontend_alpa_fMemberProfile");
       this.alreadyLoad = true;
    },
    deinit: function(){
       this.bLogin.setCaption("Login");            
       this.pwd.show();
       this.uid.show();
       this.uid.setText(this.app._mainForm.dataUser.id);   
       this.bLogin.setTop(this.pwd.top + 43);
       this.profile.show();
       this.profile.setCaption("Login Form");
       this.pLogin.setHeight(180);
       this.profile.setHeight(this.height - 360);
       this.profile.setTop(350);
       this.alreadyLoad = false;
       if (this.defaultMenu === undefined){
            this.dbLib.getDataProviderA("select judul,kode_konten from portal_konten where kode_klp='K06' and kode_lokasi='"+this.app._lokasi+"' ");
       }else{
          this.profile.addItems(this.defaultMenu.img, this.defaultMenu.judul, this.defaultMenu.shortDesc, this.defaultMenu.id);
          this.doChildItemsClick(this.profile,result.rs.rows[0].kode_konten,this.profile.items.more[0].item);				
       }
    },
    keyDown: function(sender, keyCode, buttonState){
		if (sender === this.pwd)
			if (keyCode === 13)
				this.doClick(this.bLogin);
	},
    doClick: function(sender){
        if (sender.caption == "Login"){
            if (this.app._mainForm.userLogin(this.uid.getText(), this.pwd.getText()) ){            
                this.initMenu(this.app._mainForm.dataUser);
            }
        }else {
            this.deinit();
			this.data = undefined;
			this.uid.setReadOnly(false);
			this.uid.setText(this.app.userlog);
			this.uid.setCaption("User Id");
			this.pwd.show();
			this.pwd.setText("");				
			this.bLogin.setCaption("Login");
			this.pLogin.setCaption("Login");						
			this.app._myCart = new portalui_arrayMap(); 
			this.app._mainForm.dataUser = {};
			this.app._mainForm.logout();
        }
    }
});
