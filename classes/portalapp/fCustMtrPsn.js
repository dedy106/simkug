//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fCustMtrPsn = function(owner){
	try{
		if (owner)
		{
			window.portalapp_fCustMtrPsn.prototype.parent.constructor.call(this, owner);
			window.portalapp_fCustMtrPsn.prototype.parent.setBorder.call(this, 0);		
			window.portalapp_fCustMtrPsn.prototype.parent.setColor.call(this, "");		
			this.className = "portalapp_fCustMtrPsn";											
			this.initComponent();		
			this.title = "Monitoring Pemesanan";
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fCustMtrPsn]::contruct:"+e,"");
	}
};
window.portalapp_fCustMtrPsn.extend(window.portalui_panel);
window.portalapp_fCustMtrPsn.implement({
	initComponent: function(){		
		try{
			uses("util_standar;portalui_button;portalui_saiGrid;portalui_sgNavigator");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.p1mp = new portalui_panel(this);
			this.p1mp.setBound(10,10,630,170);
			this.p1mp.setBorder(3);
			this.p1mp.setName('p1');
			this.p1mp.setCaption('Daftar Order');
			this.sg1mp = new portalui_saiGrid(this.p1mp);
			this.sg1mp.setBound(1,20,625,146);
			this.sg1mp.setName('sg1mp');
			this.sg1mp.setColCount(6);
			this.sg1mp.setReadOnly(true);
			this.sg1mp.setColTitle(["No. Order","Customer","Tanggal","Keterangan","Cabang","Kota"]);
			this.sg1mp.setColWidth([5,4,3,2,1,0],[100,100,100,100,100,100]);
			this.sg1mp.onDblClick.set(this, "sg1onDblClick");
			this.p1mp2 = new portalui_panel(this);
			this.p1mp2.setBound(10,200,630,180);
			this.p1mp2.setBorder(3);
			this.p1mp2.setName('p1');
			this.p1mp2.setCaption('Detail Order');
			this.sg1mp2 = new portalui_saiGrid(this.p1mp2);
			this.sg1mp2.setBound(1,20,625,128);
			this.sg1mp2.setName('saiSG1');
			this.sg1mp2.setColCount(6);
			this.sg1mp2.setReadOnly(true);
			this.sg1mp2.setColTitle(["Kode Barang","Nama Barang","Bonus","Jumlah","Harga","Sub Total"]);
			this.sg1mp2.setColWidth([5,4,3,2,1,0],[100,100,100,100,100,100]);
			this.sg1mp2.columns.get(4).setColumnFormat(cfNilai);
			this.sg1mp2.columns.get(5).setColumnFormat(cfNilai);
			this.totalmp2 = new portalui_saiLabelEdit(this.p1mp2);
			this.totalmp2.setBound(375,155,250,20);
			this.totalmp2.setTipeText(ttNilai);
			this.totalmp2.setAlignment(alRight);
			this.totalmp2.setCaption("Total");
			this.totalmp2.setReadOnly(true);
			this.totalmp2.setLength(100);
			var brg = this.dbLib.getDataProvider("select a.no_order,b.nama as nmcust,date_format(a.tanggal,'%d-%m-%Y') as tgl,a.keterangan,c.nama as nmcbg,d.nama as nmkota "+
				"from portal_order_m a left outer join portal_cust b on a.kode_cust=b.kode_cust "+
				"left outer join portal_cabang c on a.cabang=c.kode_cab "+
				"left outer join portal_kota d on a.kota=d.kode_kota "+
				"where a.kode_cust='"+this.app.userlog+"' and a.status in ('C','F') order by a.no_order ");
			eval("brg= "+brg+";");
			if (typeof(brg) == "object")
			{
				if (brg.rs.rows!=undefined)
				{
					this.sg1mp.clear();
					this.sg1mp.showLoading();
					this.sg1mp.setData(brg);										
					this.sg1mp.setColWidth([5,4,3,2,1,0],[100,100,100,100,100,100]);
				}
			}
			for (var k=0; k < this.sg1mp.rows.getLength(); k++)
			{
				if (this.sg1mp.getCell(4,k)=="undefined")
					this.sg1mp.setCell(4,k,"-");
				if (this.sg1mp.getCell(5,k)=="undefined")
					this.sg1mp.setCell(5,k,"-");
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		try{
			var data = this.dbLib.getDataProvider("select a.kode_produk,b.nama as nmbrg, a.bonus,a.jumlah,a.harga,(a.jumlah*a.harga) as tot "+
					"from portal_order_d a inner join portal_produk b on a.kode_produk=b.kode_produk "+
					"where a.no_order='"+this.sg1mp.getCell(0,row)+"'");			
			eval("data = "+data+";");
			if (typeof(data) == "object")
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
			systemAPI.alert(e);
		}
	}	
});