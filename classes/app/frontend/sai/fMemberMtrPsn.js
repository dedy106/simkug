//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberMtrPsn = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberMtrPsn.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fMemberMtrPsn";											
			this.initComponent();		
			this.setCaption("Monitoring Pemesanan");
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fMemberMtrPsn]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberMtrPsn.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberMtrPsn.implement({
	initComponent: function(){		
		try{
			uses("util_standar;portalui_button;portalui_saiGrid;portalui_sgNavigator");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.p1mp = new portalui_panel(this,{bound:[10,10,this.width - 25,170],border:3,caption:"Daftar Order"});
			this.sg1mp = new portalui_saiGrid(this.p1mp,{bound:[1,20,this.p1mp.width - 4,146],colCount:5,readOnly:true,colTitle:["No. Order","Tanggal","Keterangan","Cabang","Kota"],
                colWidth:[[4,3,2,1,0],[100,100,300,100,100]],dblClick:[this,"sg1onDblClick"]});
			this.p1mp2 = new portalui_panel(this,{bound:[10,200,this.width - 25,180],border:3,caption:"Detail Order"});
			this.sg1mp2 = new portalui_saiGrid(this.p1mp2,{bound:[1,20,this.p1mp.width - 4,128],colCount:6,readOnly:true,colTitle:["Kode Barang","Nama Barang","Bonus","Jumlah","Harga","Sub Total"],
                colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],colFormat:[[4,5],[cfNilai, cfNilai]]});
			this.totalmp2 = new portalui_saiLabelEdit(this.p1mp2,{bound:[325,155,250,20],tipeText:ttNilai, alignment:alRight,caption:"Total",readOnly:true});
			var brg = this.dbLib.getDataProvider("select a.no_order,date_format(a.tanggal,'%d-%m-%Y') as tgl,a.keterangan,c.nama as nmcbg,d.nama as nmkota "+
				"from portal_order_m a "+
				"left outer join portal_cabang c on a.cabang=c.kode_cab "+
				"left outer join portal_kota d on a.kota=d.kode_kota "+
				"where a.kode_cust='"+this.app.userlog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_order desc ",true);
			if (typeof(brg) !== "string")
			{
				if (brg.rs.rows[0]!=undefined)
				{
					this.sg1mp.clear();
					this.sg1mp.showLoading();
					this.sg1mp.setData(brg);										
					this.sg1mp.setColWidth([4,3,2,1,0],[100,100,300,100,100]);
				}
			}
			for (var k=0; k < this.sg1mp.rows.getLength(); k++)
			{
				if (this.sg1mp.getCell(3,k)=="undefined")
					this.sg1mp.setCell(3,k,"-");
				if (this.sg1mp.getCell(4,k)=="undefined")
					this.sg1mp.setCell(4,k,"-");
			}			
		}catch(e){
			alert(e);
		}
	},
	doSizeChange: function(width, height){				
	},
	sg1onDblClick:function(sender, col, row){
		try{
			var data = this.dbLib.getDataProvider("select a.kode_produk,b.nama as nmbrg, a.bonus,a.jumlah,a.harga,(a.jumlah*a.harga) as tot "+
					"from portal_order_d a inner join portal_produk b on a.kode_produk=b.kode_produk "+
					"where a.no_order='"+this.sg1mp.getCell(0,row)+"'",true);			
			if (typeof(data) != "string")
			{
				if (data.rs.rows[0] != undefined)
				{
					this.sg1mp2.clear();
					this.sg1mp2.showLoading();
					this.sg1mp2.setData(data);										
					this.sg1mp2.setColWidth([5,4,3,2,1,0],[100,100,100,100,100,100]);
					this.sg1mp2.columns.get(4).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(5).setColumnFormat(cfNilai);
				}
			}
			var tot=0;
			for (var k=0; k < this.sg1mp2.rows.getLength(); k++)
				tot+=nilaiToFloat(this.sg1mp2.getCell(5,k));			
			this.totalmp2.setText(floatToNilai(tot));
		}catch(e){
			alert(e);
		}
	}	
});
