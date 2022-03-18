/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fPembina = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fPembina.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fPembina";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pembina", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar;");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Tahun Anggaran",maxLength:4,change:[this,"doEditChange"]});								
			this.eKode = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"NIK", rightLabelVisible:false, multiSelection:false,change:[this,"doEditChange"]});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama",tag:"1"});									
			this.eJab = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Kode Jabatan", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			this.eLoker = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode PP", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			this.eBand = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kode Band", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			this.eKota = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Kode Kota", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			
			this.bTampil = new portalui_button(this,{bound:[729,25,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,27,800,273],caption:"Daftar Pembina"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,800,230],tag:"9",
						colTitle: "NIK,Nama,Kode Jab,Nama Jabatan,Kode Loker,Nama Loker,Kode Band,Kode Kota,Kota", readOnly:true
			});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,250,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();	
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}


			this.eJab.setSQL("select kode_jab, nama from agg_jab ",["kode_jab","nama"],undefined,["Kode Jabatan","Nama"],"and","Data Jabatan",false);
			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],undefined,["Kode Band","Nama"],"and","Data Band",false);
			this.eLoker.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],undefined,["Kode Loker","Nama"],"and","Data PP",false);
			this.eKota.setSQL("select kode_kota, nama from agg_kota ",["kode_kota","nama"],undefined,["Kode Kota","Nama"],"and","Data Kota",false);

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fPembina.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fPembina.implement({
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eNik);												
					break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_pmbn (nik, kode_lokasi,  kode_jab, kode_band, kode_loker, kode_kota, nama,tahun) "+
						        "values ('"+this.eKode.getText()+"','"+this.app._lokasi+"','"+this.eJab.getText()+"','"+this.eBand.getText()+"','"+this.eLoker.getText()+"','"+this.eKota.getText()+"','"+this.eNama.getText()+"','"+this.eTahun.getText()+"')");
						this.dbLib.execArraySQL(sql);					
						this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);	
					}
					break;
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{	
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_pmbn set kode_jab='"+this.eJab.getText()+"',kode_band='"+this.eBand.getText()+"',kode_loker='"+this.eLoker.getText()+"',kode_kota='"+this.eKota.getText()+"',nama='"+this.eNama.getText()+"' "+
							    "where nik = '"+this.eKode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);	
						this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);
					}
					break;
				case "hapus" :
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from agg_pmbn where nik = '"+this.eKode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.eTahun.getText()+"'");
					this.dbLib.execArraySQL(sql);	
					this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);	
					break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	
	doEditChange: function(sender){
		if (sender == this.eTahun) {
			this.eKode.setSQL("select nik, nama from agg_pmbn where tahun = '"+this.eTahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],undefined,["NIK","Nama"],"and","Data Pembina",false);
		}
		if(sender == this.eKode){
			if (this.eKode.getText() != ""){
				var sql = "select a.nama,a.kode_jab,a.kode_band,a.kode_loker,a.kode_kota, "+
						"	   c.nama as nama_band,d.nama as nama_loker,e.nama as nama_kota,f.nama as nama_jab "+
						"from agg_pmbn a "+
						"	inner join agg_band c on a.kode_band=c.kode_band "+
						"	inner join agg_pp d on a.kode_loker=d.kode_pp "+
						"	inner join agg_kota e on a.kode_kota=e.kode_kota "+
						"	inner join agg_jab f on a.kode_jab=f.kode_jab "+
						"where a.tahun = '"+this.eTahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik='"+this.eKode.getText()+"'";
				var data = this.dbLib.getDataProvider(sql,true);			
				if (typeof data == "object")
				{
					this.standarLib.clearByTag(this, new Array("1"),this.eKode);
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.eNama.setText(line.nama);
						this.eLoker.setText(line.kode_loker,line.nama_loker);
						this.eBand.setText(line.kode_band,line.nama_band);
						this.eKota.setText(line.kode_kota,line.nama_kota);
						this.eJab.setText(line.kode_jab,line.nama_jab);
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
			var temp = this.dbLib.runSQL("select a.nik,a.nama,a.kode_jab,f.nama as nama_jab,a.kode_loker,b.nama as nama_loker,a.kode_band,a.kode_kota,c.nama as nama_kota "+
											"from agg_pmbn a "+
											"		inner join agg_pp b on a.kode_loker=b.kode_pp "+
											"		inner join agg_kota c on a.kode_kota=c.kode_kota "+
											"		inner join agg_jab f on a.kode_jab=f.kode_jab "+
											"where a.kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.eTahun.getText()+"' "+
											"order by a.nik ");
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eKode.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});