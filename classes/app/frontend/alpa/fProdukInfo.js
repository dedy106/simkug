//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fProdukInfo = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fProdukInfo.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fProdukInfo";											
			this.initComponent();		
			this.setCaption("Info Produk");
			this.onItemClick.set(this,"doItemsClick");
			this.onClose.set(this,"doClose");
			this.setView(3);
			this.setToolbarVisible(true);
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fProdukInfo]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fProdukInfo.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fProdukInfo.implement({
	initComponent: function(){		
		try{
			uses("util_standar;util_file");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.file = new util_file();
			this.dbLib.getDataProviderA("select a.kode_konten, c.folder,a.gambar,a.deskripsi,a.tanggal, a.judul "+
			         " ,e.folder as fldfile,e.nama as nmfile "+
					"from portal_konten a "+
                    "  left outer join portal_file c on a.gambar=c.no_file "+
					"  left outer join portal_file e on a.no_file_dok=e.no_file "+
                    " where a.kode_klp='K08' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_input desc ");			
		}catch(e){
			alert(e);
		}
	},	
	doRequestReady:function(sender, methodName, result){	
		try{
            if (sender == this.dbLib && methodName == "getDataProvider"){   
                eval("result = "+result);
                if (typeof result != "string"){
                    var img = [],desc = [],id1 = [],kd=[], more = [];	
                    for (var i in result.rs.rows){								
						img[img.length] = "server/"+result.rs.rows[i].folder+"/"+result.rs.rows[i].gambar;
                        desc[desc.length] = result.rs.rows[i].judul;
                        id1[id1.length] = result.rs.rows[i].deskripsi;
                        kd[kd.length] =result.rs.rows[i].kode_konten;                        
                        more[more.length]= {price: 0,icon:"icon/dynpro/keranjang.png", btnCaption:"Beli",
                                    satuan:"",jenis_motor:result.rs.rows[i].deskripsi, merk:"", pabrik:"",warna:"",spesifikasi:result.rs.rows[i].deskripsi,
                                    id:result.rs.rows[i].kode_konten,nama:result.rs.rows[i].judul, diskon:0};
					}
					this.addItems(img, desc, id1, kd, more);  
                    this.dataProdukBaru = {img:img, title:desc, shortDesc:id1,id:kd,more:more };                                          
                }else throw result;
            }
		}catch(e){
			systemAPI.alert(this+"#Request Failed",e);
		}
	},
	doItemsClick: function(sender,id,item){
	    var html = "<div >"+item.title+"</div><br><img src='"+item.img+"'></img>";
	    this.getClientCanvas().style.padding = "5px";   
        this.getClientCanvas().innerHTML = html;       
        this.setBtnCloseVisible(true);
    },
    doMouseCloseClick: function(event){
        try{
            this.show();
            this.fade();
            this.setBtnCloseVisible(false);
            this.addItems(this.dataProdukBaru.img, this.dataProdukBaru.title, this.dataProdukBaru.shortDesc, this.dataProdukBaru.id, this.dataProdukBaru.more);                        
        }catch(e){
            alert(e);
        }
    }
});
