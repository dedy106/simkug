//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fCustMtrByr = function(owner){
	try{
		if (owner)
		{
			window.portalapp_fCustMtrByr.prototype.parent.constructor.call(this, owner);
			window.portalapp_fCustMtrByr.prototype.parent.setBorder.call(this, 0);		
			window.portalapp_fCustMtrByr.prototype.parent.setColor.call(this, "");		
			this.className = "portalapp_fCustMtrByr";											
			this.initComponent();		
			this.title = "Monitoring Pembayaran";
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fCustMtrByr]::contruct:"+e,"");
	}
};
window.portalapp_fCustMtrByr.extend(window.portalui_panel);
window.portalapp_fCustMtrByr.implement({
	initComponent: function(){		
		try{
			uses("util_standar;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_saiLabelEdit;portalui_font");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.p1mb = new portalui_panel(this);
			this.p1mb.setBound(10,10,630,170);
			this.p1mb.setBorder(3);
			this.p1mb.setName('p1');
			this.p1mb.setCaption('Daftar Pembayaran');
			this.sg1mb = new portalui_saiGrid(this.p1mb);
			this.sg1mb.setBound(1,20,625,146);
			this.sg1mb.setName('sg1mb');
			this.sg1mb.setColCount(5);
			this.sg1mb.setReadOnly(true);
			this.sg1mb.setColTitle(["No. Bayar","Tanggal","Keterangan","Nama File","Nilai Pembayaran"]);
			this.sg1mb.setColWidth([4,3,2,1,0],[125,125,150,100,100]);
			this.sg1mb.columns.get(4).setColumnFormat(cfNilai);
			this.sg1mb.onDblClick.set(this, "sg1onDblClick");
			this.p1mb2 = new portalui_panel(this);
			this.p1mb2.setBound(10,200,480,180);
			this.p1mb2.setBorder(3);
			this.p1mb2.setName('p1');
			this.p1mb2.setCaption('Detail Pembayaran');
			this.sg1mb2 = new portalui_saiGrid(this.p1mb2);
			this.sg1mb2.setBound(1,20,475,128);
			this.sg1mb2.setName('saiSG1');
			this.sg1mb2.setColCount(3);
			this.sg1mb2.setReadOnly(true);
			this.sg1mb2.setColTitle(["No. Order","Keterangan","Total Nilai Order"]);
			this.sg1mb2.setColWidth([2,1,0],[150,200,100]);
			this.sg1mb2.columns.get(2).setColumnFormat(cfNilai);						
			this.totalmb2 = new portalui_saiLabelEdit(this.p1mb2);
			this.totalmb2.setBound(225,155,250,20);
			this.totalmb2.setTipeText(ttNilai);
			this.totalmb2.setAlignment(alRight);
			this.totalmb2.setCaption("Total");
			this.totalmb2.setReadOnly(true);
			this.totalmb2.setLength(100);						
			var brg = this.dbLib.getDataProvider("select no_bayar,date_format(tanggal,'%d-%m-%Y') as tgl, keterangan,no_file_dok,nilai "+
					"from portal_bayar_m "+
					"where kode_sales='"+this.app.userlog+"' ");			
			eval("brg="+brg+";");
			if (typeof(brg)== "object")
			{
				if (brg.rs.rows[0]!=undefined)
				{
					this.sg1mb.clear();
					this.sg1mb.showLoading();
					this.sg1mb.setData(brg);										
					this.sg1mb.setColWidth([4,3,2,1,0],[125,125,150,100,100]);
					this.sg1mb.columns.get(4).setColumnFormat(cfNilai);
				}
			}
			for (var k=0; k < this.sg1mb.rows.getLength(); k++)
				if (this.sg1mb.getCell(3,k) != "-" && this.sg1mb.getCell(3,k) != "")
					this.sg1mb.setCell(3,k,"<a href='server/media/"+this.sg1mb.getCell(3,k)+"' target='_blank'>"+this.sg1mb.getCell(3,k)+"</a>");			
							
		}catch(e){
			systemAPI.alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		try{
			var data = this.dbLib.getDataProvider("select a.no_order,b.keterangan, sum(c.jumlah*c.harga) as total "+
						"from portal_bayar_d a inner join portal_order_m b on a.no_order=b.no_order "+
						"inner join portal_order_d c on b.no_order=c.no_order "+
						"where a.no_bayar = '"+this.sg1mb.getCell(0,row)+"' "+
						"group by b.no_order ");
			eval("data = "+data+";");
			if (typeof(data) == "object")
			{
				if (data.rs.rows[0] != undefined)
				{
					this.sg1mb2.clear();
					this.sg1mb2.showLoading();
					this.sg1mb2.setData(data);										
					this.sg1mb2.setColWidth([2,1,0],[150,200,100]);
					this.sg1mb2.columns.get(2).setColumnFormat(cfNilai);
				}
			}
			var tot=0;
			for (var k=0; k < this.sg1mb2.rows.getLength(); k++)
				tot+=nilaiToFloat(this.sg1mb2.getCell(2,k));			
			this.totalmb2.setText(floatToNilai(tot));
		}catch(e){
			systemAPI.alert(e);
		}
	}	
});