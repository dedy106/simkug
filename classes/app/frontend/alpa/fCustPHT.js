//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fCustPHT = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fCustPHT.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fCustPHT";											
			this.initComponent();		
			this.setCaption("Monitoring PHT");
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fCustPHT]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fCustPHT.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fCustPHT.implement({
	initComponent: function(){		
		try{
			uses("util_standar;util_file;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_uploader;portalui_saiCBBL;portalui_saiLabelEdit;portalui_saiMemo;server_util_mail");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.file = new util_file();
			this.p1 = new portalui_panel(this,{bound:[10,10,this.width - 20,200],caption:"Daftar PHT"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,this.p1.width-2,155],name:"saiSG1",colCount:5,
				colTitle:["No PHT","Keterangan","Periode","Tanggal","Aktif"],
                colWidth:[[4,3,2,1,0],[76,100,100,250,100]],
                dblClick:[this,"doDoubleClick"],readOnly:true,rowCount:1});			
			this.sgn1 = new portalui_sgNavigator(this.p1,{bound:[1,this.sg1.top + this.sg1.height,this.p1.width - 2,25],grid:this.sg1,buttonStyle:4, pager:[this,"doPager"]});
			
			this.p2 = new portalui_panel(this,{bound:[10,this.p1.top + this.p1.height+ 20,this.width - 20,180],border:3,caption:"Detail PHT"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[1,20,this.p2.width - 2,128],colCount:9,readOnly:true,
                colTitle:["No. Kontrak","Periode Awal","Periode Akhir","Nilai","Keterangan","Nilai Cap","Retur","Status Akt","Status Cap"],
                colWidth:[[4,3,2,1,0],[100,100,100,100,100]],colFormat:[[2,3],[cfNilai, cfNilai]]});			
			this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[1,this.sg2.top + this.sg2.height,this.p2.width - 2,25],grid:this.sg2,buttonStyle:4});
			this.rowPerPage = 15;
			this.sgn1.setTotalPage(this.dbLib.getRowCount("select count(*) from portal_pht_m a inner join portal_pht_d b on b.no_pht = a.no_pht and b.kode_lokasi = a.kode_lokasi "+
				" where b.kode_cust = '"+this.app._userLog+"' and a.kode_lokasi ='"+this.app._lokasi+"' ",this.rowPerPage));			
			this.dbLib.getDataProviderPageA("select a.no_pht, a.keterangan, a.periode, a.tanggal, a.flag_aktif from portal_pht_m a inner join portal_pht_d b on b.no_pht = a.no_pht and b.kode_lokasi = a.kode_lokasi "+
				" where b.kode_cust = '"+this.app._userLog+"' and a.kode_lokasi ='"+this.app._lokasi+"' order by a.tanggal desc",1,this.rowPerPage);			
		}catch(e){
			alert(e);
		}
	},
	doPager: function(sender, page){
		this.activeSender = sender;
		if (sender == this.sgn1) {
			this.dbLib.getDataProviderPageA("select a.no_pht, a.keterangan, a.periode, a.tanggal, a.flag_aktif from portal_pht_m a inner join portal_pht_d b on b.no_pht = a.no_pht and b.kode_lokasi = a.kode_lokasi "+
				" where b.kode_cust = '"+this.app._userLog+"' and a.kode_lokasi ='"+this.app._lokasi+"' order by a.tanggal desc",page,this.rowPerPage);			
		}else{
			this.dbLib.getDataProviderPageA("select no_kontrak, periode_aw, periode_ak, nilai_pht, keterangan, nilai_cap,  retur, status_akt, status_cap from portal_pht_d where no_pht = '"+this.sg2.cells(this.sg2.col, this.sg2.row)+"' and kode_lokasi ='"+this.app._lokasi+"' ",page,this.rowPerPage);			
		}
	},
	doRequestReady:function(sender, methodName, result){	
		try{
			if (sender == this.dbLib ){
				switch(methodName){
					case "getDataProviderPage": 
						eval("result = "+result+";");
						var line,values, grid;
						if (this.activeSender == this.sgn1) grid = this.sg1;
						else grid = this.sg2;
						grid.clear();
						for (var i in result.rs.rows){
							line = result.rs.rows[i];
							values = [];
							for (var c in line) values.push(line[c]);
							this.sg1.appendData(values);
						}
					break;
				}
			}
		}catch(e){
			systemAPI.alert(e,result);
		}
	},
	sg1onDblClick: function(sender, col, row){
		this.sgn2.setTotalPage(this.dbLib.getRowCount("select count(*) from portal_pht_d where no_pht = '"+this.sg2.cells(this.sg2.col, this.sg2.row)+"'  and kode_lokasi ='"+this.app._lokasi+"' ",this.rowPerPage));
		this.dbLib.getDataProviderPageA("select no_kontrak, periode_aw, periode_ak, nilai_pht, keterangan, nilai_cap,  retur, status_akt, status_cap from portal_pht_d where no_pht = '"+this.sg2.cells(this.sg2.col, this.sg2.row)+"' and kode_lokasi ='"+this.app._lokasi+"' ",1,this.rowPerPage);			
	}
});
