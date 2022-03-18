//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fPointSales = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fPointSales.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fPointSales";											
			this.initComponent();		
			this.setCaption("Info Point Sales");
			this.onItemClick.set(this,"doItemsClick");
			this.onClose.set(this,"doClose");			
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fPointSales]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fPointSales.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fPointSales.implement({
	initComponent: function(){		
		try{
			uses("util_standar;util_file");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.file = new util_file();
			this.sg1 = new portalui_saiGrid(this,{bound:[10,20,this.width - 20,203],name:"saiSG1",colCount:5,
				colTitle:["No Poin","Keterangan","Periode","Tanggal","Aktif"],
                colWidth:[[4,3,2,1,0],[76,100,100,250,100]],
                dblClick:[this,"doDoubleClick"],readOnly:true,rowCount:1});			
			this.sgn1 = new portalui_sgNavigator(this,{bound:[10,this.sg1.top + this.sg1.height,this.width - 20,25],grid:this.sg1,buttonStyle:4});
			
			this.sg2 = new portalui_saiGrid(this,{bound:[10,this.sg1.top + this.sg1.height + 50,this.width - 20,303],name:"saiSG1",colCount:14,
				colTitle:["Cabang","Kode Cust","Nama Cust","Tgl Faktur","No Faktur","Kota","Kode Produk","Nama Produk","Satuan","Jumlah","Bonus","Harga","Sub Total","Nilai"],
                colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,76,100,100,250,100]],
                change:[this,"sg1onChange"],ellipsClick:[this,"doFindBtnClick"],readOnly:true,rowCount:1});			
			this.sgn = new portalui_sgNavigator(this,{bound:[10,this.sg2.top + this.sg2.height,this.width - 20,25],grid:this.sg2,buttonStyle:4});
			this.rowPerPage = 15;
			this.dbLib.getDataProviderPageA("select * from portal_poin_m where kode_lokasi = '"+this.app._lokasi+"' order by tanggal desc",1,this.rowPerPage);
		}catch(e){
			alert(e);
		}
	},	
	doRequestReady:function(sender, methodName, result){	
		try{
            if (sender == this.dbLib && methodName == "getDataProviderPage"){   
                eval("result = "+result);
                if (typeof result != "string"){
                    var line;
					this.sg1.clear();
                    for (var i in result.rs.rows){
						line = result.rs.rows[i];
						this.sg1.appendData([line.no_poin, line.keterangan, line.periode, new Date().lclFormat(line.tanggal), line.flag_aktif == "1" ? "true" : "false"]);
					}					                    
                }else throw result;
            }
		}catch(e){
			systemAPI.alert(this+"#Request Failed",e);
		}
	},	
    doDoubleClick: function(sender, col, row){
        try{			
			this.sg2.clear();
			var line,data = this.dbLib.getDataProviderPage("select a.*, b.nama from portal_poin_d a inner join portal_produk b on b.kode_produk = a.kode_produk and b.kode_lokasi = a.kode_lokasi "+
				" where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_poin = '"+sender.cells(col,row)+"' ",1,this.rowPerPage,true);			
			if (typeof data != "string"){				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.cabang, line.kode_cust, line.nama_cust, new Date().lclFormat(line.tgl_faktur), line.no_faktur, line.kota, line.kode_produk, line.nama ,line.sat, line.jumlah, line.bonus, floatToNilai(line.harga), floatToNilai(line.subttl), floatToNilai(line.nilai)]);
				}					         
			}
        }catch(e){
            alert(e);
        }
    }
});
