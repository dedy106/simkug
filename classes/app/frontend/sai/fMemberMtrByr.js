//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberMtrByr = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberMtrByr.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fMemberMtrByr";											
			this.initComponent();		
			this.title = "Monitoring Pembayaran";
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fMemberMtrByr]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberMtrByr.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberMtrByr.implement({
	initComponent: function(){		
		try{
			uses("util_standar;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_font");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.p1mp = new portalui_panel(this,{bound:[10,10,this.width - 25,170],border:3,caption:"Daftar Pembayaran"});
			this.sg1mb = new portalui_saiGrid(this.p1mp,{bound:[1,20,this.p1mp.width - 4,146],colCount:5,readOnly:true,colTitle:["No. Bayar","Tanggal","Keterangan","Nama File","Nilai Pembayaran"],
                colWidth:[[4,3,2,1,0],[100,100,100,100,100]],dblClick:[this,"sg1onDblClick"],colFormat:[[4],[cfNilai]]});
			this.p1mp2 = new portalui_panel(this,{bound:[10,200,this.width - 25,180],border:3,caption:"Detail Pembayaran"});
			this.sg1mb2 = new portalui_saiGrid(this.p1mp2,{bound:[1,20,this.p1mp2.width - 4,128],colCount:3,readOnly:true,colTitle:["No Order","Keterangan","Total Nilai Order"],
                colWidth:[[2,1,0],[100,100,100]],colFormat:[[2],[cfNilai]]});
			this.totalmb2 = new portalui_saiLabelEdit(this.p1mp2,{bound:[325,155,250,20],tipeText:ttNilai, alignment:alRight,caption:"Total",readOnly:true});			
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
			alert(e);
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
			alert(e);
		}
	}	
});
