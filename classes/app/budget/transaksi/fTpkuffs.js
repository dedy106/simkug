/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_transaksi_fTpkuffs = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fTpkuffs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fTpkuffs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data TPKU FFS", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Tahun Anggaran",maxLength:4,change:[this,"doEditChange"]});								
			this.eKode = new portalui_saiCBBL(this,{bound:[20,21,250,20],caption:"No Kontrak", multiSelection:false,change:[this,"doEditChange"]});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Dokter",tag:"1"});									
			this.eAlamat = new portalui_saiLabelEdit(this,{bound:[20,32,400,20], caption:"Alamat",tag:"1"});
			this.eKota = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Kode Kota", multiSelection:false,tag:"1",readOnly:true,change:[this,"doEditChange"]});					
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,30,200,20],caption:"Kode Akun", multiSelection:false,tag:"1"});					
			this.ePP = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"PP", multiSelection:false,tag:"1"});					
			this.eRka = new portalui_saiCBBL(this,{bound:[20,30,200,20],caption:"RKA", multiSelection:false,tag:"1"});					
			this.eJenis = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Jenis TPKU", multiSelection:false,readOnly:true,tag:"1",change:[this,"doEditChange"]});					
			this.eKunj = new portalui_saiLabelEdit(this,{bound:[460,26,200,20], caption:"Jumlah Kunjungan",tipeText:ttNilai,readOnly:true,text:"0",tag:"1",change:[this,"doEditChange"]});			
			
			this.eTarif = new portalui_saiLabelEdit(this,{bound:[20,32,200,20], caption:"Tarif",tipeText:ttNilai,readOnly:true,text:"0",tag:"1",change:[this,"doEditChange"]});			
			this.eJml = new portalui_saiLabelEdit(this,{bound:[240,32,200,20], caption:"Jumlah Peserta",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doEditChange"]});			
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[460,32,200,20], caption:"Nilai ",tipeText:ttNilai,readOnly:true,text:"0",tag:"1"});			
			this.eDiskon = new portalui_saiLabelEdit(this,{bound:[20,43,200,20], caption:"% Diskon",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doEditChange"]});			
			this.ePderita = new portalui_saiLabelEdit(this,{bound:[240,43,200,20], caption:"% Penderita",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doEditChange"]});			
			this.eMin = new portalui_saiLabelEdit(this,{bound:[460,43,200,20], caption:"Nilai Minimal",tipeText:ttNilai,readOnly:true,text:"0",tag:"1"});			
			this.eTarifFinal = new portalui_saiLabelEdit(this,{bound:[20,44,200,20], caption:"Tarif Final",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doEditChange"]});			
			this.ePkunj = new portalui_saiLabelEdit(this,{bound:[240,44,200,20], caption:"% Kunjungan",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doEditChange"]});			
			this.eFinal = new portalui_saiLabelEdit(this,{bound:[460,44,200,20], caption:"Nilai Final [bulan]",tipeText:ttNilai,text:"0",tag:"1"});			
			
			this.bTampil = new portalui_button(this,{bound:[729,44,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,28,800,273],caption:"Daftar Dokter TPKU FFS"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,800,230],tag:"9",
						colTitle: "No Kontrak,Dokter,Alamat,Kode Kota,Kota,Kode PP,Nama PP,Kode RKA,Nama RKA,Kode Akun,Nama Akun,Jml Peserta,% Penderita, % Kunjungan, Jml Kunjungan, Tarif,% Diskon , Tarif Final, Nilai, Nilai Final", readOnly:true
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


			this.eAkun.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],undefined,["Kode Akun","Nama"],"and","Data Akun",false);
			this.eKota.setSQL("select kode_kota, nama, idx from agg_kota ",["kode_kota","nama","idx"],undefined,["Kode Kota","Nama","Indeks"],"where","Data Kota",false);
			this.ePP.setSQL("select kode_pp, nama from agg_pp where tipe = 'posting' and kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],undefined,["Kode","Nama"],"and","Data PP",false);
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fTpkuffs.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_transaksi_fTpkuffs.implement({
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
						for (var j=1; j <= 12; j++){
							sql.add("insert into agg_tpku (no_kontrak,kode_lokasi,dokter,alamat,kode_kota,kode_tpku,tahun,nilai,kode_pp,kode_rka,kode_akun,periode,jumlah,tarif,nilai_final,p_derita,p_kunjungan, "+
									"jml_kunjungan,p_diskon,tarif_final) "+
									"values ('"+this.eKode.getText()+"','"+this.app._lokasi+"','"+this.eNama.getText()+"','"+this.eAlamat.getText()+"','"+
									            this.eKota.getText()+"','"+this.eJenis.getText()+"','"+this.eTahun.getText()+"',"+parseNilai(this.eNilai.getText())+",'"+
												this.ePP.getText()+"','"+this.eRka.getText()+"','"+this.eAkun.getText()+"','"+this.eTahun.getText()+(j<10?"0":"")+j+"',"+
												parseNilai(this.eJml.getText())+","+parseNilai(this.eTarif.getText())+","+parseNilai(this.eFinal.getText())+","+parseNilai(this.ePderita.getText())+","+parseNilai(this.ePkunj.getText())+","+parseNilai(this.eKunj.getText())+","+parseNilai(this.eDiskon.getText())+","+parseNilai(this.eTarifFinal.getText())+")");
						}
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,keterangan,progress) "+
								"		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai_final,'"+this.eKode.getText()+"','"+this.eTahun.getText()+"','BTPKU',b.nama,'0' "+  
								"		from agg_tpku a "+
								"					   inner join agg_rka b on a.kode_rka=b.kode_rka and substring(a.periode,1,4)=b.tahun "+
								"					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.tahun=c.tahun "+						
								"		where no_kontrak = '"+this.eKode.getText()+"' and a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"'");				
						
						this.dbLib.execArraySQL(sql);					
						this.standarLib.clearByTag(this, new Array("0","1"),this.eTahun);	
					}
					break;
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{	
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_d where no_bukti = '"+this.eKode.getText()+"' and modul='BTPKU' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"' ");
						sql.add("update agg_tpku set kode_tpku='"+this.eJenis.getText()+"',p_derita="+parseNilai(this.ePderita.getText())+",p_kunjungan="+parseNilai(this.ePkunj.getText())+",jml_kunjungan="+parseNilai(this.eKunj.getText())+",p_diskon="+parseNilai(this.eDiskon.getText())+",tarif_final="+parseNilai(this.eTarifFinal.getText())+",tarif="+parseNilai(this.eTarif.getText())+",nilai_final="+parseNilai(this.eFinal.getText())+",jumlah="+parseNilai(this.eJml.getText())+",kode_akun='"+this.eAkun.getText()+"',kode_rka='"+this.eRka.getText()+"',kode_pp='"+this.ePP.getText()+"',nilai="+parseNilai(this.eNilai.getText())+",kode_kota='"+this.eKota.getText()+"',alamat='"+this.eAlamat.getText()+"',dokter='"+this.eNama.getText()+"'  "+
							    "where no_kontrak = '"+this.eKode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.eTahun.getText()+"'");
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,keterangan,progress) "+
								"		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai_final,'"+this.eKode.getText()+"','"+this.eTahun.getText()+"','BTPKU',b.nama,'0' "+  
								"		from agg_tpku a "+
								"					   inner join agg_rka b on a.kode_rka=b.kode_rka and substring(a.periode,1,4)=b.tahun "+
								"					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.tahun=c.tahun "+						
								"		where no_kontrak = '"+this.eKode.getText()+"' and a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"'");				
						
						this.dbLib.execArraySQL(sql);	
						this.standarLib.clearByTag(this, new Array("0","1"),this.eTahun);
					}
					break;
				case "hapus" :
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from agg_d where no_bukti = '"+this.eKode.getText()+"' and modul='BTPKU' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"' ");
					sql.add("delete from agg_tpku where no_kontrak = '"+this.eKode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.eTahun.getText()+"'");
					this.dbLib.execArraySQL(sql);	
					this.standarLib.clearByTag(this, new Array("0","1"),this.eTahun);	
					break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		try {
			if (sender == this.eJml || sender == this.ePderita || sender == this.ePkunj) {
				if (this.eJml.getText()!="" && this.ePderita.getText()!="" && this.ePkunj.getText()!="") {
					this.eKunj.setText(floatToNilai( Math.round(nilaiToFloat(this.ePderita.getText())/100 * nilaiToFloat(this.ePkunj.getText())/100 * nilaiToFloat(this.eJml.getText()))));
				}
			}
			if (sender == this.eDiskon || sender == this.eTarif) {
				if (this.eDiskon.getText()!="" && this.eTarif.getText()!="") {
					this.eTarifFinal.setText(floatToNilai(nilaiToFloat(this.eTarif.getText()) - Math.round(nilaiToFloat(this.eDiskon.getText())/100 * nilaiToFloat(this.eTarif.getText()))));
				}
			}
			if (sender == this.eKunj || sender == this.eTarifFinal ) {
				if (this.eKunj.getText()!="" && this.eTarifFinal.getText()!="") {
					this.eNilai.setText(floatToNilai(nilaiToFloat(this.eKunj.getText()) * nilaiToFloat(this.eTarifFinal.getText())));
					if (nilaiToFloat(this.eNilai.getText()) < nilaiToFloat(this.eMin.getText())) this.eFinal.setText(this.eMin.getText());
					else this.eFinal.setText(this.eNilai.getText());
				}
			}
			if (sender == this.eTahun || sender == this.eKota) {
				var idx =0;
				if (sender == this.eKota && this.eKota.getText()!="") idx = nilaiToFloat(this.eKota.dataFromList[2]);
				this.eJenis.setSQL("select kode_tpku, nama, round(tarif*"+idx+"/100,0) as tarif, nilai from agg_bpcc_jenis_tpku where jenis = 'FFS' and tahun = '"+this.eTahun.getText()+"' ",["kode_tpku","nama","tarif","nilai"],undefined,["Kode","Nama","Tarif","Nilai"],"and","Data Jenis TPKU",false);
			}
			if (sender == this.eTahun) {
				this.eKode.setSQL("select distinct no_kontrak, dokter from agg_tpku where tahun = '"+this.eTahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",["no_kontrak","dokter"],undefined,["Kontrak","Dokter"],"and","Data Kontrak TPKU",false);
				this.eRka.setSQL("select kode_rka, nama from agg_rka where tahun = '"+this.eTahun.getText()+"'  ",["kode_rka","nama"],undefined,["Kode","Nama"],"and","Data RKA",false);				
			}
			if (sender == this.eJenis) {
				if (this.eJenis.getText() != ""){
					this.eTarif.setText(this.eJenis.dataFromList[2]);
					this.eMin.setText(this.eJenis.dataFromList[3]);
				}
			}
		
			
			if(sender == this.eKode){
				if (this.eKode.getText() != ""){
					var sql = "select a.dokter,a.alamat,a.kode_kota,a.kode_tpku,xx.nama as nama_tpku, "+
							"	   e.nama as nama_kota,a.tarif,a.nilai_final,a.nilai,a.kode_pp,a.kode_rka,b.nama as nama_pp, c.nama as nama_rka,a.kode_akun,d.nama as nama_akun,a.jumlah,p_derita,p_kunjungan,jml_kunjungan,p_diskon,tarif_final "+
							"from agg_tpku a "+
							"   inner join agg_bpcc_jenis_tpku xx on a.kode_tpku=xx.kode_tpku "+
							"	inner join agg_kota e on a.kode_kota=e.kode_kota "+
							"	inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"	inner join agg_rka c on a.kode_rka=c.kode_rka and a.tahun=c.tahun "+
							"	inner join agg_masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
							"where a.periode like '____01' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kontrak='"+this.eKode.getText()+"' and a.tahun = '"+this.eTahun.getText()+"' ";				
					var data = this.dbLib.getDataProvider(sql,true);			
					if (typeof data == "object")
					{
						this.standarLib.clearByTag(this, new Array("1"),this.eKode);
						var line = data.rs.rows[0];							
						if (line != undefined)
						{
							this.eNama.setText(line.dokter);
							this.eAlamat.setText(line.alamat);
							this.eJenis.setText(line.kode_tpku,line.nama_tpku);
							this.eKota.setText(line.kode_kota,line.nama_kota);
							this.ePP.setText(line.kode_pp,line.nama_pp);
							this.eRka.setText(line.kode_rka,line.nama_rka);
							this.eAkun.setText(line.kode_akun,line.nama_akun);
							this.eNilai.setText(floatToNilai(line.nilai));
							this.eJml.setText(floatToNilai(line.jumlah));
							this.eTarif.setText(floatToNilai(line.tarif));
							this.eFinal.setText(floatToNilai(line.nilai_final));
							
							this.ePderita.setText(floatToNilai(line.p_derita));
							this.ePkunj.setText(floatToNilai(line.p_kunjungan));
							this.eKunj.setText(floatToNilai(line.jml_kunjungan));
							this.eDiskon.setText(floatToNilai(line.p_diskon));
							this.eTarifFinal.setText(floatToNilai(line.tarif_final));
							setTipeButton(tbUbahHapus);
						}
						else
						{
							setTipeButton(tbSimpan);
						}
					} 			
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select a.no_kontrak,a.dokter,a.alamat,a.kode_kota,c.nama as nama_kota,b.kode_pp,b.nama as nama_pp,d.kode_rka,d.nama as nama_rka,a.kode_akun,e.nama as nama_akun,a.jumlah,a.p_derita,a.p_kunjungan,a.jml_kunjungan,a.tarif,a.p_diskon,a.tarif_final,a.nilai,a.nilai_final "+
											"from agg_tpku a "+
											"		inner join agg_kota c on a.kode_kota=c.kode_kota "+
											"		inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
											"		inner join agg_rka d on a.kode_rka=d.kode_rka and a.tahun=d.tahun "+
											"		inner join agg_masakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
											"where a.periode like '____01' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun = '"+this.eTahun.getText()+"' "+
											"order by a.no_kontrak ");
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