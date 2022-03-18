/**
 * @author dweexfuad
 */
window.app_budget_master_fBandTarif = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBandTarif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBandTarif";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Maksimal Jumlah Hari SPPD per Band", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar");
			this.eLokasi = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Lokasi", multiSelection:false,tag:2,change:[this,"doEditChange"]});	
			this.eBand = new portalui_saiCBBL(this,{bound:[20,20,200,20],caption:"Kode Band", multiSelection:false,change:[this,"doEditChange"]});				
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,21,180,20], caption:"Tahun",tipeText:ttAngka,maxLength:4,change:[this,"doEditChange"]});			
			this.eHari = new portalui_saiLabelEdit(this,{bound:[20,22,180,20], caption:"Max Hari",tipeText:ttNilai,text:"0",tag:"1"});
			this.bTampil = new portalui_button(this,{bound:[429,22,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,23,500,383],caption:"Daftar Jml Maksimal Hari SPPD per Band"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,500,330],colTitle:"Kode Band,Jml Hari,Tahun",tag:"9"});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,355,500,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
			this.rearrangeChild(10,23);
			
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],false,["Kode Band","Nama"],"where","Data Program Kerja",true);
			this.eLokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Bisnis Area",true);
			this.eLokasi.setText(this.app._lokasi);
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBandTarif.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBandTarif.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return;
		try{
			switch (event)
			{
				case "clear" :
					this.standarLib.clearByTag(this, new Array("0","1"),this.eBand);														
					break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this, [0,1])){
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_band_sppd (kode_band, kode_lokasi,hari,tahun ) "+
						        "values ('"+this.eBand.getText()+"','"+this.eLokasi.getText()+"',"+parseNilai(this.eHari.getText())+",'"+this.eTahun.getText()+"') ");
						this.dbLib.execArraySQL(sql);	
						this.standarLib.clearByTag(this, new Array("0","1"),this.eNik);		
					}
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_band_sppd set hari ="+parseNilai(this.eHari.getText())+" where kode_band = '"+this.eBand.getText()+"' and kode_lokasi = '"+this.eLokasi.getText()+"' and tahun='"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);	
						this.standarLib.clearByTag(this, new Array("0","1"),this.eNik);		
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_band_sppd where kode_band = '"+this.eBand.getText()+"' and kode_lokasi = '"+this.eLokasi.getText()+"' and tahun='"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);	
						this.standarLib.clearByTag(this, new Array("0","1"),this.eNik);		
					break;
			}
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if(sender == this.eLokasi || sender == this.eBand || sender == this.eTahun){
			if (this.eLokasi.getText() != "" && this.eBand.getText() != "" && this.eTahun.getText() != "" ){
				var sql = "select hari from agg_band_sppd where kode_lokasi = '"+this.eLokasi.getText()+"' and kode_band='"+this.eBand.getText()+"' and tahun='"+this.eTahun.getText()+"'";
				var data = this.dbLib.getDataProvider(sql,true);			
				if (typeof data == "object")
				{
					this.standarLib.clearByTag(this, new Array("1"),this.eKode);
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.eHari.setText(floatToNilai(line.hari));
						setTipeButton(tbUbahHapus);
					}
					else
					{
						setTipeButton(tbSimpan);
					}
				}			
			}
		}
	},	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select kode_band,hari,tahun from agg_band_sppd where kode_lokasi = '"+this.eLokasi.getText()+"' order by kode_band");
			if (temp instanceof portalui_arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.sg1.selectPage(page);
	
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eBand.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
