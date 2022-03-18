window.app_saku2_transaksi_aka_aka2_fBatalInvLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fBatalInvLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fBatalInvLoad";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Tagihan per Load", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_titip = new saiCBBL(this,{bound:[20,18,220,20],caption:"Akun PDD", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_load = new saiCBBL(this,{bound:[20,19,220,20],caption:"Bukti Load", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"] });				
		this.bTampil = new button(this,{bound:[120,11,98,20],caption:"Data Tagihan", click:[this,"doLoad"]});
		
		this.e_piutang = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_amor = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Total Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_lunas = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Total Pembayaran", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.p1 = new panel(this,{bound:[20,23,1000,340],caption:"Data Tagihan",visible:false});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:15,tag:9,
		            colTitle:["No Invoice","Periode","Kode Produk","Nama Produk","Akun Piutang","Akun PDPT","Akun PYT","Nilai Piutang","Nilai Amortisasi","Nilai Pelunasan","Kode DRK","Kode PP","Kode Akt","Tahun Aka","Kode Jalur"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,100,100,100,100,70,70,70,100,80,60,150]],
					colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoPaging:true, rowPerPage:20,
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.pp = "";
			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_titip.setText(line.flag,line.nama);
			} else this.cb_titip.setText("","");									
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_aka2_fBatalInvLoad.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fBatalInvLoad.implement({
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
	simpan: function(){			
		try{						
			if (this.e_lunas.getText() != "0") this.cb_titip.setTag("2"); 
			else this.cb_titip.setTag("9"); 
			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_batal_m","no_batal",this.app._lokasi+"-BTL"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					sql.add("delete from aka_batal_tmp ");				
					sql.add("update aka_bill_m set no_dokumen ='"+this.e_nb.getText()+"' where no_bill='"+this.cb_load.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");				
					sql.add("insert into aka_batal_m(no_batal,no_dokumen,tanggal,keterangan,nilai_tagih,nilai_amor,nilai_bayar,posted,modul,kode_drk,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_load.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_piutang.getText())+","+parseNilai(this.e_amor.getText())+","+parseNilai(this.e_lunas.getText())+",'F','BATALLOAD','-','"+this.cb_titip.getText()+"','"+this.cb_load.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					

					/*	lemot ganti query	
					var line;
					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka,modul,kode_drk,kode_jalur) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.no_inv+"','"+line.nim+"','"+this.e_periode.getText()+"','"+line.kode_produk+"','"+line.akun_piutang+"','"+line.akun_pdpt+"','"+line.akun_pdd+"',"+parseFloat(line.nilai)+",'-','-','"+line.kode_pp+"','C','"+line.kode_akt+"','"+line.tahunaka+"','BATAL','"+line.kode_drk+"','"+line.kode_jalur+"')");
								
						if (line.kode_bpp == "BPP") {									
							sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_pdd+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.nilai)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','AKRUPYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
							sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.nilai)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','AKRUPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						
							if (parseFloat(line.pdd) != 0) {										
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.pdd)+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','BATAL','AMORPDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+line.akun_pdd+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.pdd)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','AMORPYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								
								sql.add("insert into aka_amor_d(no_amor,nim,no_inv,periode,nilai,kode_lokasi,akun_pdd,akun_pdpt,kode_produk,kode_pp,kode_drk,dc,no_del) values "+
										"('"+this.e_nb.getText()+"','"+line.nim+"','"+line.no_inv+"','"+this.e_periode.getText()+"',"+parseFloat(line.pdd)+",'"+this.app._lokasi+"','"+line.akun_pdd+"','"+line.akun_pdpt+"','"+line.kode_produk+"','"+line.kode_pp+"','"+line.kode_drk+"','C','BATAL')");									
							}
							if (parseFloat(line.lunas)  != 0) {
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.lunas)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','RKNPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.lunas)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','RKNTTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								
								sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul) values "+
										"	('"+this.e_nb.getText()+"','"+line.nim+"','"+line.no_inv+"','"+this.e_periode.getText()+"',"+parseFloat(line.lunas)+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+line.akun_piutang+"','"+line.kode_produk+"','C','BATAL')");
							}							
						}
						else {
							if (parseFloat(line.nilai) > 0) {									
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.nilai)+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','BATAL','AKRUPDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.nilai)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','AKRUPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
							}
							else {										
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',"+Math.abs(parseFloat(line.nilai))+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','AKRUPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','C',"+Math.abs(parseFloat(line.nilai))+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','BATAL','AKRUPDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");										
							}
							
							if (parseFloat(line.lunas)  != 0) {
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.lunas)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','RKNPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
								sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.lunas)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','BATAL','RKNTTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								
								sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul) values "+
										"	('"+this.e_nb.getText()+"','"+line.nim+"','"+line.no_inv+"','"+this.e_periode.getText()+"',"+parseFloat(line.lunas)+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+line.akun_piutang+"','"+line.kode_produk+"','C','BATAL')");
							}
						}				
					}
					*/


					sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka,modul,kode_drk,kode_jalur) "+
							"select "+
							"'"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_inv,nim,'"+this.e_periode.getText()+"',kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,'-','-', "+
							"kode_pp,'C',kode_akt,tahunaka,'BATAL',kode_drk,kode_jalur "+
							"from aka_tagih_tmp		"+
							"where no_inv like '"+this.cb_load.getText()+"%' ");

					//-------------------------------- kode_bpp == "BPP" --------------------------------
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,akun_pdd,'"+this.e_ket.getText()+"','D',sum(nilai) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','AKRUPYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp='BPP' "+
							"group by akun_pdd,kode_pp ");

					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,akun_piutang,'"+this.e_ket.getText()+"','C',sum(nilai) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','AKRUPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp='BPP' "+
							"group by akun_piutang,kode_pp ");

					//pdd-------------------------------------- kode_bpp == "BPP" and pdd <> 0 --------------------------------------
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+							
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,akun_pdpt,'"+this.e_ket.getText()+"','D',sum(pdd) as nilai,kode_pp,kode_drk, "+
							"'"+this.app._lokasi+"','BATAL','AMORPDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp='BPP' and pdd<>0 "+
							"group by akun_pdpt,kode_pp,kode_drk ");
							
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+		
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,akun_pdd,'"+this.e_ket.getText()+"','C',sum(pdd) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','AMORPYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp='BPP' and pdd<>0 "+
							"group by akun_pdd,kode_pp ");
							
					sql.add("insert into aka_amor_d(no_amor,nim,no_inv,periode,nilai,kode_lokasi,akun_pdd,akun_pdpt,kode_produk,kode_pp,kode_drk,dc,no_del) "+
							"select "+
							"'"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',pdd,'"+this.app._lokasi+"',akun_pdd,akun_pdpt,kode_produk,kode_pp,kode_drk,'C','BATAL' "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp='BPP' and pdd<>0 ");
					//pdd-------------------------------------- kode_bpp == "BPP" and pdd <> 0 --------------------------------------
					
					//lunas------------------------------------ kode_bpp == "BPP" and lunas <> 0 ------------------------------------					
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,akun_piutang,'"+this.e_ket.getText()+"','D',sum(lunas) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','RKNPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp='BPP' and lunas<>0 "+
							"group by akun_piutang,kode_pp ");

					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','C',sum(lunas) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','RKNTTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp='BPP' and lunas<>0 "+
							"group by kode_pp ");

					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul) "+
							"select "+
							"'"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',lunas,'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'C','BATAL' "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp='BPP' and lunas<>0 ");
					//lunas------------------------------------ kode_bpp == "BPP" and lunas <> 0 ------------------------------------
					//xx------------------------------ kode_bpp == "BPP" -------------------------------xx


					//-------------------------------- kode_bpp == "NONBPP" ------------------------------
					//nilai > 0
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,akun_pdpt,'"+this.e_ket.getText()+"','D',sum(nilai) as nilai,kode_pp,kode_drk, "+
							"'"+this.app._lokasi+"','BATAL','AKRUPDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp<>'BPP' and nilai>0 "+
							"group by akun_pdpt,kode_pp,kode_drk ");

					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,akun_piutang,'"+this.e_ket.getText()+"','C',sum(nilai) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','AKRUPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+ 
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp<>'BPP' and nilai>0 "+
							"group by akun_piutang,kode_pp ");
					
					//nilai < 0
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+							
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,akun_piutang,'"+this.e_ket.getText()+"','D',abs(sum(nilai)) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','AKRUPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+ 
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp<>'BPP' and nilai<0 "+
							"group by akun_piutang,kode_pp ");
							
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+							
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,akun_pdpt,'"+this.e_ket.getText()+"','C',abs(sum(nilai)) as nilai,kode_pp,kode_drk, "+
							"'"+this.app._lokasi+"','BATAL','AKRUPDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp<>'BPP' and nilai<0 "+
							"group by akun_pdpt,kode_pp,kode_drk ");
							

					//lunas------------------------------------ kode_bpp == "NONBPP" and lunas <> 0 ------------------------------------					
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+							
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,akun_piutang,'"+this.e_ket.getText()+"','D',sum(lunas) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','RKNPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp<>'BPP' and lunas<>0 "+
							"group by akun_piutang,kode_pp");
							
					sql.add("insert into aka_batal_tmp(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+						
							"select "+
							"'"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','C',sum(lunas) as nilai,kode_pp,'-', "+
							"'"+this.app._lokasi+"','BATAL','RKNTTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_tagih_tmp "+ 
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp<>'BPP' and lunas<>0 "+
							"group by kode_pp");
														
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul) "+
							"select "+
							"'"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',lunas,'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'C','BATAL' "+
							"from aka_tagih_tmp "+
							"where no_inv like '"+this.cb_load.getText()+"%' and kode_bpp<>'BPP' and lunas<>0 ");
							
					//lunas------------------------------------ kode_bpp == "NONBPP" and lunas <> 0 ------------------------------------
					//xx------------------------------ kode_bpp == "NONBPP" ----------------------------xx
					
					sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)  "+
							"select no_batal,'"+this.cb_load.getText()+"',tanggal,0,kode_akun,keterangan,dc,sum(nilai),kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,'IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_batal_tmp where no_batal='"+this.e_nb.getText()+"' "+
							"group by no_batal,tanggal,kode_akun,keterangan,dc,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode");
					
					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					this.cb_titip.setTag("2");
					setTipeButton(tbSimpan);
					this.cb_load.setSQL("select no_bill, keterangan from aka_bill_m where periode <='"+this.e_periode.getText()+"' and no_dokumen='-' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_piutang.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai piutang tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
		this.cb_load.setSQL("select no_bill, keterangan from aka_bill_m where periode <='"+this.e_periode.getText()+"' and no_dokumen='-' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_batal_m","no_batal",this.app._lokasi+"-BTL"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
	},
	doLoad: function(sender){		
		try {
			/* lemot ganti sp.. grid tidak tampil krn gak muat memorynya 50 ribu data
			if (this.cb_load.getText()!= "") {				
				var strSQL = "select substring(a.kode_produk,1,3) as kode_bpp,a.nim,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.nilai,isnull(d.tot_pdd,0) as pdd,isnull(b.tot_lunas,0) as lunas,a.kode_drk,a.kode_pp,a.kode_akt,a.tahunaka,a.kode_jalur "+
							 "from  ("+
						 
							 "      select a.nim,a.no_bill,'20'+substring(a.no_inv,7,4) as periode,a.kode_lokasi,a.no_inv,a.kode_produk,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.kode_drk,a.kode_pp,a.kode_akt,a.tahunaka,a.kode_jalur,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai  "+
							 "      from aka_bill_d a "+
							 "      where a.no_bill='"+this.cb_load.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "      group by a.nim,a.no_bill,a.kode_lokasi,a.no_inv,a.kode_produk,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.kode_drk,a.kode_pp,a.kode_akt,a.tahunaka,a.kode_jalur "+
							 "      ) a "+
						 
							 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur   "+
						 
							 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
							 "                 from aka_rekon_d where substring(no_inv,1,15) = '"+this.cb_load.getText()+"' group by no_inv,kode_produk,kode_lokasi) b on a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
						 
							 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_pdd "+
							 "                 from aka_amor_d where substring(no_inv,1,15) = '"+this.cb_load.getText()+"' group by no_inv,kode_produk,kode_lokasi) d on a.no_inv=d.no_inv and a.kode_produk=d.kode_produk and a.kode_lokasi=d.kode_lokasi "+						 
						 
							 "where a.no_bill = '"+this.cb_load.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					var line;
					var totP = totA = totL = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						totP = totP + parseFloat(line.nilai);
						totA = totA + parseFloat(line.pdd);
						totL = totL + parseFloat(line.lunas);
					}		
					this.e_piutang.setText(floatToNilai(totP));
					this.e_amor.setText(floatToNilai(totA));
					this.e_lunas.setText(floatToNilai(totL));
			
					
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					
					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];							
						this.sg.appendData([line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_piutang,line.akun_pdpt,line.akun_pdd,floatToNilai(line.nilai),floatToNilai(line.pdd),floatToNilai(line.lunas),line.kode_drk,line.kode_pp,line.kode_akt,line.tahunaka,line.kode_jalur]);
					}
				
				} else this.sg.clear(1);				
			}
			*/

			//insert ke table aka_tagih_tmp
			if (this.cb_load.getText()!= "") {	
				var sql = "call sp_aka_loadinv ('"+this.app._lokasi+"','"+this.cb_load.getText()+"')";
				this.dbLib.execQuerySync(sql);	
				
				var strSQL = "select * from aka_tagih_tmp where no_inv like '"+this.cb_load.getText()+"%' ";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					var line;
					var totP = totA = totL = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						totP = totP + parseFloat(line.nilai);
						totA = totA + parseFloat(line.pdd);
						totL = totL + parseFloat(line.lunas);
					}		
					this.e_piutang.setText(floatToNilai(totP));
					this.e_amor.setText(floatToNilai(totA));
					this.e_lunas.setText(floatToNilai(totL));							
				} 				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doTampilData: function(page) {
		this.sg.doSelectPage(page);				
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChange: function(sender){		
		if (sender == this.cb_load && this.cb_load.getText()!="") {
			this.sg.clear(1);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});