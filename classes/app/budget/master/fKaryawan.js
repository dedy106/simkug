/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fKaryawan";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar;");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Tahun Anggaran",maxLength:4,change:[this,"doChange"]});								
			this.eNik = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"NIK", multiSelection:false,change:[this,"doEditChange"],rightLabelVisible:false});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama",tag:"1"});									
			this.eLoker = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode PP", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			this.eBand = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kode Band", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			this.eJab = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Kode Jabatan", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			this.eKota = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Kode Kota", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			this.cStatus = new portalui_saiCB(this,{bound:[20,27,300,20],caption:"Status Org",items:["5. Organik Dalmed","6. Pengurus","7. Paramedis","8. Organik","9. TPBW"],tag:"1"});

			this.bTampil = new portalui_button(this,{bound:[829,27,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
			this.p1 = new portalui_panel(this,{bound:[10,28,900,300],caption:"Daftar Karyawan"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,250],
						colTitle:["NIK","Nama","Band","Kode Jab","Nama Jabatan","Status","Kode Loker","Nama Loker","Kode Kota","Nama Kota"],tag:"9"});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,275,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();	
			
			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],undefined,["Kode Band","Nama"],"and","Data Band",false);
			this.eLoker.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],undefined,["Kode PP","Nama"],"and","Data Lokasi PP",false);
			this.eJab.setSQL("select kode_jab, nama from agg_jab ",["kode_jab","nama"],undefined,["Kode Jabatan","Nama"],"and","Data Jabatan",false);
			this.eKota.setSQL("select kode_kota, nama from agg_kota ",["kode_kota","nama"],undefined,["Kode Kota","Nama"],"and","Data Kota",false);
			
			this.eTahun.setText("2011");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fKaryawan.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fKaryawan.implement({
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
			var status_org=this.cStatus.getText().substr(0,1);
			
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
						sql.add("insert into agg_karyawan (nik, kode_lokasi, kode_jab, kode_band, kode_pp, kode_kota, nama,  status_org) "+
						        "values ('"+this.eNik.getText()+"','"+this.app._lokasi+"','"+this.eJab.getText()+"','"+this.eBand.getText()+"','"+this.eLoker.getText()+"','"+this.eKota.getText()+"','"+this.eNama.getText()+"','"+status_org+"') ");
						this.dbLib.execArraySQL(sql);					
						this.standarLib.clearByTag(this, new Array("0","1"),this.eNik);	
					}
					break;
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{	
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_karyawan set kode_jab = '"+this.eJab.getText()+"',kode_band='"+this.eBand.getText()+"',kode_pp='"+this.eLoker.getText()+"',kode_kota='"+this.eKota.getText()+"',nama='"+this.eNama.getText()+"',status_org='"+status_org+"' "+
							    "where nik = '"+this.eNik.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);	
						this.standarLib.clearByTag(this, new Array("0","1"),this.eNik);
					}
					break;
				case "hapus" :
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from  agg_karyawan where nik = '"+this.eNik.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);	
					this.standarLib.clearByTag(this, new Array("0","1"),this.eNik);	
					break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},	
	doEditChange: function(sender){
		if(sender == this.eNik){
			if (this.eNik.getText() != ""){
				var sql = "select a.nama,a.kode_jab,a.kode_band,a.kode_pp,a.kode_kota, "+
						"	   b.nama as nama_jab,c.nama as nama_band,d.nama as nama_pp,e.nama as nama_kota, "+
						"      a.status_org "+
						"from agg_karyawan a "+
						"inner join agg_jab b on a.kode_jab=b.kode_jab "+
						"inner join agg_band c on a.kode_band=c.kode_band "+
						"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
						"inner join agg_kota e on a.kode_kota=e.kode_kota "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.nik='"+this.eNik.getText()+"'";
				var data = this.dbLib.getDataProvider(sql,true);			
				if (typeof data == "object")
				{
					this.standarLib.clearByTag(this, new Array("1"),this.eNik);
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.eNama.setText(line.nama);
						this.eLoker.setText(line.kode_pp,line.nama_pp);
						this.eBand.setText(line.kode_band,line.nama_band);
						this.eJab.setText(line.kode_jab,line.nama_jab);
						this.eKota.setText(line.kode_kota,line.nama_kota);
						this.cStatus.setText(line.status_org.toUpperCase());
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
			var temp = this.dbLib.runSQL("select a.nik,a.nama,a.kode_band,a.kode_jab,b.nama as nama_jab,a.status_org,"+
			                            "        a.kode_pp,c.nama as nama_pp,a.kode_kota,d.nama as nama_kota "+
										"from agg_karyawan a "+
										"	inner join agg_jab b on a.kode_jab=b.kode_jab "+
										"	inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
										"	inner join agg_kota d on a.kode_kota=d.kode_kota "+
										"where a.kode_lokasi='"+this.app._lokasi+"' order by a.nik ");
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
	doChange: function(sender) {
		if (sender == this.eTahun && this.eTahun.getText() != "") {
			this.eNik.setSQL("select nik, nama from agg_karyawan where tahun = '"+this.eTahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],undefined,["NIK","Nama"],"and","Data Karyawan",false);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});