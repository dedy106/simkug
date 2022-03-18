//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fBelanja = function(owner, options, requester){
    if (owner){		
        window.app_frontend_alpa_fBelanja.prototype.parent.constructor.call(this,owner,options);
        if (options !== undefined) this.updateByOptions(options);
        uses("portalui_label;portalui_bevel;portalui_imageslide");
        this.p1 = new portalui_roundPanel(this,{bound:[0,0,600,500],icon:"image/themes/dynpro/iconpanel.png",caption:"Informasi Produk",background:"image/themes/dynpro/roundpanelBgCenter.png",color:"#efefef",titleBg:"#95cae8"});
        this.b1 = new portalui_bevel(this.p1,{bound:[20,10,this.width - 50,150],border:2});        
        this.cInfo = new portalui_control(this.p1,{bound:[30,20,400,200]});
        this.cImg = new portalui_control(this.p1,{bound:[this.p1.width - 150,40,120,100]});
        this.llPrice = new portalui_label(this.p1,{bound:[20,165,this.p1.width - 180,25],caption:"Harga Produk",fontColor:"#cd5689",fontSize:13});
        this.lRp1 = new portalui_label(this.p1,{bound:[this.p1.width - 180,165,30,25],caption:"Rp.",fontColor:"#cd5689",fontSize:13});        
        this.lPrice = new portalui_label(this.p1,{bound:[this.p1.width - 150,165,100,25],caption:"",fontColor:"#cd5689",fontSize:13,alignment:"right"});
        this.llMyCart = new portalui_label(this.p1,{bound:[20,190,this.p1.width - 180,25],caption:"Total Belanja Anda",fontColor:"#cd5689",fontSize:13});
        this.lRp2 = new portalui_label(this.p1,{bound:[this.p1.width - 180,190,30,25],caption:"Rp.",fontColor:"#cd5689",fontSize:13});
        this.lMyCart = new portalui_label(this.p1,{bound:[this.p1.width - 150,190,100,25],caption:"",fontColor:"#cd5689",fontSize:13,alignment:"right"});
        this.b1 = new portalui_bevel(this.p1,{bound:[20,219,this.width - 50,1]});
        this.lcart = new portalui_label(this.p1,{bound:[this.p1.width / 2 - 50,220,120,20],caption:"Keranjang Anda",fontColor:"#65a2c1",fontSize:11});
        this.imgSlide = new portalui_imageslide(this.p1,{bound:[20,240,this.width - 50,150]});
        this.imgSlide.addStyle("border-left:1px solid #cccccc;border-top:1px solid #cccccc;border-right:1px solid #999999;border-bottom:1px solid #999999;");
        this.imgSlide.makeRound(10, {tl:10,br:10});
        this.b1 = new portalui_bevel(this.p1,{bound:[20,this.p1.height - 90,this.width - 50,1]});
        this.bOrder = new portalui_button(this.p1,{bound:[30,this.p1.height - 80,80,20],color:"#138e0a",icon:"icon/dynpro/keranjang.png",caption:"Order",hint:"Melanjutkan untuk membeli produk ini",click:[this,"doClick"],showHint:true});
        this.bCancel = new portalui_button(this.p1,{bound:[130,this.p1.height - 80,80,20],color:"#f00",icon:"icon/dynpro/cancel.png",caption:"Batal",hint:"Batal membeli produk ini",click:[this,"doClick"],showHint:true});
        this.bTutup = new portalui_button(this.p1,{bound:[this.p1.width - 130,this.p1.height - 80,80,20],caption:"Belanja lagi",click:[this,"doClick"],showHint:true,hint:"Kembali untuk belanja"});
        this.requester = requester;
        this.closeToHide = false;
        this.dbLib = new util_dbUtility();
        this.dbLib.addListener(this);
    }
};
window.app_frontend_alpa_fBelanja.extend(window.portalui_commonForm);
window.app_frontend_alpa_fBelanja.implement({	
    setInfo: function(info, userInfo){        
        try{
            this.cInfo.getCanvas().innerHTML = "<table width='100%' border='0' cellpadding='0' cellspacing='0'>"+
                            "<tr align='left' valign='top'><td width='90px'>Merk</td><td>"+info.merk+"</td></tr>"+
                            "<tr align='left' valign='top'><td>Motor</td><td>"+info.jenis_motor+"</td></tr>"+
                            "<tr align='left' valign='top'><td>Warna</td><td>"+info.warna+"</td></tr>"+
                            "<tr align='left' valign='top'><td>Satuan</td><td>"+info.satuan+"</td></tr>"+
                            "<tr align='left' valign='top'><td>Pabrikan</td><td>"+info.pabrik+"</td></tr>"+
                            "<tr align='left' valign='top'><td>Deskripsi</td><td>"+info.item.shortDesc+"</td></tr>"+
                            "</table>";
            this.lPrice.setCaption(floatToNilai(info.price));            
            this.cImg.getCanvas().innerHTML = "<img src='"+info.item.img+"' width='120px' height='120px' style='position:absolute;height:120;height:120;left:0;top:0'/>";
            this.produkInfo = info;            
            this.userInfo = userInfo;
            this.updateInfo();
        }catch(e){
            alert(e);
        }
    },
    setCaption: function(data){
        this.p1.setCaption(data);
    },
    updateInfo: function(){
        if (this.app._isLog){
            var total = 0,img=[],title=[],shortDesc=[],kd=[];                        
            var totItem = 0;
            for (var i in this.app._myCart.objList){
                total += parseFloat(this.app._myCart.get(i).price);
                img[img.length] = this.app._myCart.get(i).item.img;
                title[title.length] = this.app._myCart.get(i).item.title;
                shortDesc[shortDesc.length] = "";
                kd[kd.length] = this.app._myCart.get(i).item.id;
                totItem++;
            } 
            this.imgSlide.addItems(img, title, shortDesc, kd);
            this.llMyCart.setCaption("Total Belanja Anda ["+totItem+" items]");
            this.lMyCart.setCaption(floatToNilai(total));             
        }else{
            this.llMyCart.hide();           
            this.lMyCart.hide(); 
            this.bOrder.hide();           
            this.bCancel.hide();                       
            this.lRp2.hide();                       
        }
    },
    doClick: function(sender){
        try{
            if (sender == this.bOrder) {
                this.close();
                uses("app_frontend_alpa_fOrder",true);
                this.fOrder = new app_frontend_alpa_fOrder(this.app,{bound:[system.screenWidth / 2 - 300,system.screenHeight / 2 - 250,650,500]},this);
                this.fOrder.setCaption("Daftar Belanja Anda");
                this.fOrder.setInfo(this.userInfo);
                this.fOrder.showModal();                
            }else if (sender == this.bCancel) {
                this.app._myCart.del(this.produkInfo.item.id);
                this.updateInfo();
                this.app._mainForm.updateUserCart();
                this.close();
            }else this.close();
            
        }catch(e){
            alert(e);
        }
    },
    doRequestReady: function(sender, methodName, result){
       if (sender == this.dbLib){          
          eval("result = "+result+";");
          if (typeof result != "string"){                
              
          }else systemAPI.alert(result);
       } 
        
    }
});
