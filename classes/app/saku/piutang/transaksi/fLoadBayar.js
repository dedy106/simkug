/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fLoadBayar = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_transaksi_fLoadBayar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fLoadBayar";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Pembayaran KTS Mahasiswa : Input", 0);
		
		try
		{
			this.eJenis = new portalui_saiCB(this);
			this.eJenis.setTop(10);
			this.eJenis.setLeft(20);
			this.eJenis.setWidth(200);
			this.eJenis.setCaption("Jenis");
			this.eJenis.addItem(0,"KM");
			this.eJenis.addItem(1,"BM");
			this.eJenis.addItem(2,"TT");
			
			uses("portalui_saiCBBL;portalui_checkBox");
			this.e0 = new portalui_saiLabelEdit(this);
			this.e0.setLeft(20);
			this.e0.setTop(35);
			this.e0.setWidth(200);
			this.e0.setCaption("No BuktiKas");
			this.e0.setText("");
			this.e0.setReadOnly(false);			
			this.e0.setLabelWidth(100);					
			
			this.bGenerate = new portalui_button(this);
			this.bGenerate.setTop(35);
			this.bGenerate.setLeft(230);
			this.bGenerate.setCaption("Generate");
			this.bGenerate.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGenerate.onClick.set(this,"doGenerate");		
			
			this.l1 = new portalui_label(this);
			this.l1.setLeft(20);
			this.l1.setTop(60);
			this.l1.setWidth(100);
			this.l1.setHeight(20);
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
			
			uses("portalui_datePicker");
			this.dpTgl = new portalui_datePicker(this);
			this.dpTgl.setTop(60);
			this.dpTgl.setLeft(120);
			this.dpTgl.setWidth(100);		
			this.dpTgl.onSelect.set(this,"doSelectDate");
			
			this.ePeriode = new portalui_saiLabelEdit(this);
			this.ePeriode.setLeft(20);
			this.ePeriode.setTop(85);
			this.ePeriode.setWidth(150);
			this.ePeriode.setCaption("Periode");
			this.ePeriode.setText(this.app._periode);		
			this.ePeriode.setReadOnly(true);
			
			this.eKeterangan = new portalui_saiLabelEdit(this);
			this.eKeterangan.setLeft(20);
			this.eKeterangan.setTop(110);
			this.eKeterangan.setWidth(400);
			this.eKeterangan.setCaption("Keterangan");
			this.eKeterangan.setText("");					
			this.cbLoad = new portalui_checkBox(this,{bound:[630,110,200,20],caption:"Default Akun",selected:true});	
			
			this.eJurusan = new portalui_saiCBBL(this,{bound:[20,15,150,20],caption:"Jurusan", multiSelection:false});						
			this.eAngkatan = new portalui_saiCBBL(this,{bound:[20,16,150,20],caption:"Angkatan", multiSelection:false});			
			
			this.eAkun = new portalui_saiCBBL(this);
			this.eAkun.setTop(135);
			this.eAkun.setLeft(20);
			this.eAkun.setWidth(200);
			this.eAkun.setCaption("Akun KasBank");
			this.eAkun.onBtnClick.set(this,"FindBtnClick");					
			
			this.bDownload = new portalui_button(this,{bound:[600,135, 130,20],caption:"Download Format",click:"doClickDownload"});
			this.uploader = new portalui_uploader(this);
			this.uploader.setLeft(750);
			this.uploader.setTop(135);
			this.uploader.setWidth(80);
			this.uploader.setHeight(20);		
			this.uploader.onAfterUpload.set(this,"doAfterLoad");
			this.uploader.onChange.set(this,"doFileChange");
			this.uploader.setParam4("gridupload");
			this.uploader.setParam3("object");
			this.uploader.setAutoSubmit(true);
			
			this.bValidasi = new portalui_button(this);
			this.bValidasi.setTop(135);
			this.bValidasi.setLeft(840);
			this.bValidasi.setCaption("Validasi");
			this.bValidasi.setIcon("url(icon/"+system.getThemes()+"/bCopy.png)");
			this.bValidasi.onClick.set(this,"doClick");		
			
			uses("portalui_sgNavigator");
			this.sg1 = new portalui_saiGrid(this,{bound:[20,280,900,200],colCount:12,colTitle:["NPM","Nama","No Invoice","Kode Produk","Nama Produk","Nilai Tagihan","Nilai Bayar","Jenis","Akun Lawan","Kode DRK","Akun Deprs","No Bukti"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100]],colFormat:[[5,6],[cfNilai, cfNilai]],
				readOnly:true});						
			
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(481);
			this.sgn.setLeft(20);
			this.sgn.setWidth(900);
			this.sgn.setButtonStyle(3);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");
			this.rowPerPage = 50;
			
			this.eTotal = new portalui_saiLabelEdit(this.sgn);
			this.eTotal.setTop(1);
			this.eTotal.setLeft(670);
			this.eTotal.setWidth(200);
			this.eTotal.setCaption("Total");
			this.eTotal.setAlignment(alRight);
			this.eTotal.setTipeText(ttNilai);
			this.eTotal.setReadOnly(true);
			
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib(window.system.serverApp);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.eJurusan.onChange.set(this,"doEditChange");
			this.eAngkatan.onChange.set(this,"doEditChange");
			this.eJenis.onChange.set(this,"doEditChange");
			this.cbLoad.onChange.set(this,"doEditChange");
			///this.eJurusan.onExit.set(this,"doEditExit");
			//this.eAngkatan.onExit.set(this,"doEditExit");						
			this.eJurusan.setSQL("select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ", new Array("kode_jur","nama_jur"), this.dbLib2);			
			this.doEditChange(this.eJenis);
			this.dpTgl.setDateString((new Date()).getDateStr());
			this.rearrangeChild(10,23);
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fLoadBayar]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fLoadBayar.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fLoadBayar.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
		{
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		}
		if (sender == this.app._mainForm.bSimpan)
		{
			try{
				if (this.ePeriode.getText() < this.app._periode)
					throw("Periode input tidak boleh kurang dari periode berjalan("+this.app._periode+")");
				system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");		
			}catch(e){
				
				this.getApplication().alert(this,e,"");
			}
		}
		if (sender == this.app._mainForm.bEdit)
		{
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
		}
		if (sender == this.app._mainForm.bHapus)
		{
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
		}
	},
	doModalResult: function(event, modalResult){
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this,["0"],this.e0);				
					this.sg1.clear(1);
				}
			break;
			case "simpan" :
				if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, ["0"])))
				{
					try
					{
						if (this.eTotal.getText() == "0" || this.eTotal.getText() == "") {
							throw("Nilai upload tidak boleh nol. Klik tombol validasi dahulu");
						}
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						this.insertData(sql);
					}catch(e)
					{
						system.alert(this, e,"");
					}
				}
			break;
			case "ubah" :
				if (modalResult == mrOk)
				{				
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();					
						this.insertData(sql);
				}
			break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {			  
					  uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from load_mhs where kode_jur='"+this.e0.getText()+"' and kode_ang='"+this.e1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);					
			   }
			break;
		}
		this.e0.setFocus();
	},
	insertData: function(sql){	
		var angk = this.eAngkatan.rightLabelCaption.split("/");		
		sql.add(" insert into loadkts (noktsload,periode,semester,kode_jur,kode_ang,thn_ajar1,thn_ajar2,jenis_sem,tanggal,keterangan,namafile,nilaiload, kode_lokasi,posted) values "+
				  "('"+this.e0.getText()+"', '"+this.ePeriode.getText()+"', '1', '"+this.eJurusan.getText()+"', '"+this.eAngkatan.getText()+"',"+
				  "	'"+angk[0]+"', '"+angk[1]+"','1', "+
				  " '"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eFile+"',"+parseNilai(this.eTotal.getText())+", '"+this.app._lokasi+"','F') ");
											
		var line;
		var script ="insert into loadkts_d (noktsload,kode_produk, periode_awal, npm, no_kts) values ";	          				  	
		var scriptARM = "insert into arbyrmhs_m(no_bukti, tanggal,keterangan,nilai,periode,jenis,user_id,kode_lokasi,ref1,ref2,progress,flag_hapus, disc,posted, cd_ambil, nilai_bd,akun_kb) values";
		var scriptARD = "insert into arbyrmhs_d(no_bukti,kode_produk,akun_piutang,akun_lawan,nilai,disc,kode_lokasi) values";
		var scriptKBM = "insert into arkb_m(no_buktikas, tanggal, keterangan, akun_kasbank, nilai_kasbank, periode, ref1, ref2, modul, jenis, flag_hapus, ref3, kode_lokasi,posted, nik_user) values";	
		var scriptKBD = "insert into arkb_d(no_buktikas, no_urut, no_bukti, nilai, progress, kode_lokasi) values ";		
		var akunAR, akunPdd, kodePP, kodeDRK, scriptJurnal1 = [], scriptJurnal2 = [];
		scriptKBM += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eAkun.getText()+"', "+
			"'"+parseNilai(this.eTotal.getText())+"','"+this.ePeriode.getText()+"','-','-','ARMHS','"+this.eJenis.getText()+"','0','-','"+this.app._lokasi+"','F','"+this.app._userLog+"')";
		if (this.app._dbEng == "mysqlt"){
			var nu = 1;	
			for (var i in this.sg1.data.objList){
				line = this.sg1.data.get(i);										
				if (i !=0) {script += ",";scriptARM += "," ;scriptARD +=",";scriptKBD+=",";}
				script += "('"+this.e0.getText()+"','"+line.get("kode_produk")+"','"+this.ePeriode.getText()+"','"+line.get("npm")+"','"+line.get("no_bukti")+"' )";			
				scriptARM += "('"+line.get("no_bukti")+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',"+parseFloat(line.get("nilai_bayar"))+", "+
					" '"+this.ePeriode.getText()+"','"+this.eJenis.getText()+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+line.get("npm")+"','"+line.get("no_invoice")+"',0,'0',0,'T',0,0,'"+this.eAkun.getText()+"')";
				scriptARD += "('"+line.get("no_bukti")+"','"+line.get("kode_produk")+"','"+line.get("akun_lawan")+"','"+line.get("akun_lawan")+"','"+parseFloat(line.get("nilai_bayar"))+"',0,'"+this.app._lokasi+"')";
				scriptKBD += "('"+this.e0.getText()+"','"+i+"','"+line.get("no_bukti")+"','"+parseFloat(line.get("nilai_bayar"))+"',0,'"+this.app._lokasi+"')";
				scriptJurnal1.push("('"+this.e0.getText()+"','"+line.get("no_bukti")+"',"+nu+",'"+this.dpTgl.getDateString()+"','"+this.eAkun.getText()+"','D','upload bayar "+line.get("no_invoice")+"','"+parseFloat(line.get("nilai_bayar"))+"','ARIM','ARKB','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+line.get("no_invoice")+"','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')");
				nu++;
				scriptJurnal1.push("('"+this.e0.getText()+"','"+line.get("no_bukti")+"',"+nu+",'"+this.dpTgl.getDateString()+"','"+line.get("akun_lawan")+"','C','upload bayar "+line.get("no_invoice")+"','"+parseFloat(line.get("nilai_bayar"))+"','AR','ARKB','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+line.get("no_invoice")+"','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')");
				nu++;
			}
			sql.add(script);
			sql.add(scriptARM);
			sql.add(scriptARD);		
			sql.add(scriptKBD);
			sql.add(scriptKBM);			
		}		
		sql.add("insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values "+scriptJurnal1);						
		sql.add("insert into armhs_j_byr(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) "+
			"	select no_bukti,no_dokumen, no_urut, tanggal, case when dc='D' then 'AKUNIM' else kode_akun end, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j where no_bukti = '"+this.e0.getText()+"' ");				
		this.dbLib.execArraySQL(sql);
	},
	doClick: function(sender){
		try{
			var line, rs, tmp,found;
			var sql = new server_util_arrayList();
			sql.add("select npm,nama_mhs from mhs where kode_lokasi  = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' and kode_ang  = '"+this.eAngkatan.getText()+"'  ");
			sql.add("select a.no_invoice, a.kode_produk, b.nama_produk, a.jumlah, a.nilai, a.jumlah * a.nilai - ifnull(c.nilai,0) as tagihan "+
					", b.jenis, (case when ((a.akun_piutang <> '-') and (a.akun_piutang <> '') and (not a.akun_piutang is null )) then a.akun_piutang else a.akun_pdpt end) as akun_piutang, b.kode_pp, case b.kode_akun when '' then b.kode_drk_beban else b.kode_drk_pdpt end as kode_drk, case when b.akun_deprs = '' then '-' else b.akun_deprs end akun_deprs, d.disc, d.tanggal, d.nilai_bd from armhs_d a "+
					" inner join produk b on b.kode_produk = a.kode_produk and a.kode_lokasi = b.kode_lokasi "+
					" inner join armhs_m  d on d.no_invoice = a.no_Invoice and a.kode_lokasi = d.kode_lokasi "+
					" inner join mhs e on e.npm = d.ref1 and e.kode_lokasi = a.kode_lokasi "+
					" left outer join (select ref2, kode_produk, sum(case when substring(akun_piutang,1,1) = '1' or akun_piutang = '-'  then x.nilai + x.disc else -x.nilai + x.disc end) as nilai "+
							" from arbyrmhs_d x inner join arbyrmhs_m z on z.no_bukti = x.no_bukti and z.kode_lokasi = x.kode_lokasi and z.kode_lokasi = '"+this.app._lokasi+"' "+
							" inner join mhs y on y.npm = z.ref1 and y.kode_lokasi = z.kode_lokasi and y.kode_jur = '"+this.eJurusan.getText()+"' and y.kode_ang  = '"+this.eAngkatan.getText()+"'  "+
							" group by ref2, kode_produk) c on c.ref2 = a.no_invoice and c.kode_produk = b.kode_produk "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and (a.jumlah * a.nilai - ifnull(c.nilai,0) > 0)and e.kode_jur = '"+this.eJurusan.getText()+"' and e.kode_ang  = '"+this.eAngkatan.getText()+"' ");
			tmp = this.dbLib.getMultiDataProvider(sql,true);				
			var dataMhs = new portalui_arrayMap();
			rs = tmp.result[0];
			for (var i in rs.rs.rows){
				line = rs.rs.rows[i];
				dataMhs.set(line.npm, line.nama_mhs);
			}			
			rs = tmp.result[1];
			var dataAR = new portalui_arrayMap();			
			for (var j in rs.rs.rows){
				line = rs.rs.rows[j];
				dataAR.set(line.no_invoice, line);
			}
			var total = 0,namamhs,invoice;
			if (this.sg1.data == undefined) return;				
			for (var i in this.sg1.data.objList){
				line = this.sg1.data.get(i);
				namamhs = dataMhs.get(trim(line.get("npm")));
				if (namamhs == undefined)
					throw("Mahasiswa tidak terdaftar dgn NPM "+line.get("npm")+" baris ke "+ (parseInt(i,10) + 1));
				invoice = dataAR.get(line.get("no_invoice"));
				if (invoice != undefined){				
					this.sg1.data.get(i).set("nama",namamhs);				
					this.sg1.data.get(i).set("no_invoice",invoice.no_invoice);
					this.sg1.data.get(i).set("kode_produk",invoice.kode_produk);
					this.sg1.data.get(i).set("nama_produk",invoice.nama_produk);
					this.sg1.data.get(i).set("nilai_tagihan",invoice.tagihan);
					this.sg1.data.get(i).set("jenis",invoice.jenis);
					this.sg1.data.get(i).set("akun_lawan",invoice.akun_piutang);					
					this.sg1.data.get(i).set("akun_piutang",invoice.akun_piutang);					
					this.sg1.data.get(i).set("akun_deprs",invoice.akun_deprs);
					this.sg1.data.get(i).set("kode_pp",invoice.kode_pp);
					this.sg1.data.get(i).set("kode_drk",invoice.kode_drk);				
					kodeJur = tmp.kode_jur;										
					total += parseFloat(this.sg1.data.get(i).get("nilai_bayar"));	
				}else throw("data invoice "+line.get("no_invoice")+" tidak ditemukan.\r\nProcess Stop.");
				tmp = "";
			}
			this.eTotal.setText(floatToNilai(total));
			this.loadData(1, this.rowPerPage);
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doEditExit: function(sender){
		sender.checkItem();	
	},
	doEditChange: function(sender){	
		if (sender == this.eJurusan){
			this.eAngkatan.setSQL("select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+sender.getText()+"' ", new Array("kode_ang","nama_ang"), this.dbLib2);				
			this.eAngkatan.setText("");		
		}
		if (sender == this.eJenis || sender == this.cbLoad){
			if (this.cbLoad.isSelected()){
				this.eAkun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag = "+ (sender.getText()=="KM"?"'001'":sender.getText()=="BM"?"'009'":"'030'") +" where a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"]);							
			}else{
				this.eAkun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag in ('001','009','030') where a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"]);							
			}
		}
	},
	FindBtnClick: function(sender, event){
		switch(sender){
			case this.eJurusan :
				this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
											  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
			break;
			case this.eAngkatan :
				this.standarLib.showListData(this, "Data Angkatan",sender,undefined, 
											  "select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"'",
											  ["kode_ang","nama_ang"],"and",["Kode Angkatan","Nama Angkatan"]);
			break;
			case this.eAkun:
				if (!this.cbLoad.isSelected())
					this.standarLib.showListData(this, "Data Akun",sender,undefined, 
												  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag in ('001','009','030') where a.kode_lokasi = '"+this.app._lokasi+"' ",
												  "select count(*) from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag in ('001','009','030') where a.kode_lokasi = '"+this.app._lokasi+"' ",
												  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama"]);									  
				else
					this.standarLib.showListData(this, "Data Akun",sender,undefined, 
												  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag = "+ (this.eJenis.getText()=="KM"?"'001'":this.eJenis.getText()=="BM"?"'009'":"'030'") +" where a.kode_lokasi = '"+this.app._lokasi+"' ",
												  "select count(*) from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag = "+ (this.eJenis.getText()=="KM"?"'001'":this.eJenis.getText()=="BM"?"'009'":"'030'") +" where a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama"]);		
			break;
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
				{
					case "execArraySQL" :    				
						step="info";					
						if (result.toLowerCase().search("error") == -1)					
						{
						  this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
						  this.app._mainForm.bClear.click();              
						}else system.info(this,result,"");
						break;
				}
			}catch(e)
			{
			   alert("step : "+step+"; error = "+e);
			}
		}
	},
	doAfterLoad: function(sender, result,data, filename){
		try{	
			if (result){				
				var rs, arr;		
				this.eFile = filename;
				this.sg1.clear();
				if (data instanceof portalui_arrayMap){			
					this.sg1.setData(data, 1);
					this.sgn.setTotalPage(data.getTotalPage(this.rowPerPage));
					this.sgn.rearrange();
					this.sgn.activePage = 0;				
				}else if (typeof data !== "string") {						
					var rowCount = parseInt(data.rows.length);
					var fieldDesc = new portalui_arrayMap();
					var desc1 = new portalui_arrayMap();
					var desc2 = new portalui_arrayMap();					
					this.headerFile = new Array("npm","nama","no_invoice","kode_produk","nama_produk","nilai_tagihan","nilai_bayar","jenis","akun_lawan","kode_drk","akun_deprs");
					for (var i in this.headerFile){
						desc1.set(this.headerFile[i],250);
						if ( i == 5 || i == 6)
							desc2.set(this.headerFile[i],"N");
						else desc2.set(this.headerFile[i],"S"); 
					}
					fieldDesc.set(0,desc1);
					fieldDesc.set(1,desc2);
					var dataRow, line;
					var result = new portalui_arrayMap();
					var nobukti = this.standarLib.noBuktiOtomatis(this.dbLib, "arbyrmhs_m", "no_bukti", "BYR"+this.ePeriode.getText().substr(2),"00000"," and kode_lokasi = '"+this.app._lokasi+"' ");
					var lastId = parseInt(nobukti.substr(7),10);								
					for (var i in data.rows){				
						line = new portalui_arrayMap();
						dataRow = data.rows[i];//data[i].split(";");					
						for (var r in dataRow){
							if (r == "npm"){
								line.set("npm",trim(dataRow[r]));								
								line.set("nama","-");
							}else if (r == "no_invoice"){
								line.set("no_invoice",dataRow[r]);								
							}else if (r == "kode_produk") {
								line.set("kode_produk",dataRow[r]);	
								line.set("nama_produk",'-');						
								line.set("nilai_tagihan",0);														
							}else if (r == "nilai_bayar"){
								line.set("nilai_bayar",dataRow[r]);
								line.set("jenis","-");
								line.set("akun_lawan","-");
								line.set("kode_drk","-");
								line.set("akun_deprs","-");
							}
							line.set("no_bukti",nobukti);
						}
						lastId++;
						nobukti = "BYR"+this.ePeriode.getText().substr(2) + this.formatNumeric("00000",lastId.toString());
						result.set(i,line);
						if (i == data.length - 2) break;
					}			
					this.headerFile = new Array("npm","nama","no_invoice","kode_produk","nama_produk","nilai_tagihan","nilai_bayar","jenis","akun_lawan","kode_drk","akun_deprs");
					result.setTag1(rowCount);
					result.setTag2(fieldDesc);			
					this.sg1.data = result;
					this.sgn.setTotalPage(result.getTotalPage(this.rowPerPage));			
					this.sgn.rearrange();
					this.sgn.setButtonStyle(3);
					this.sgn.activePage = 0;	
					this.loadData(1,this.rowPerPage);
				}else 
					if (data.search("\r\n") == -1) throw(data);
			}
		}catch(e){
			alert(e);
		}
	},
	loadData: function(page, rowPerPage){
		var start = ( page - 1)* rowPerPage;
		var finish = ( this.sg1.data.getLength() < start + rowPerPage ? this.sg1.data.getLength() : start + rowPerPage);
		this.sg1.clear();
		var data = this.sg1.data, line,dataToAppend;		
		for (var i=start;i < finish;i++){
			line = data.get(i);
			dataToAppend = [];			
			this.sg1.appendData([line.get("npm"),line.get("nama"),line.get("no_invoice"),line.get("kode_produk"),line.get("nama_produk"),floatToNilai(line.get("nilai_tagihan")),floatToNilai(line.get("nilai_bayar")),line.get("jenis"),line.get("akun_lawan"),line.get("kode_drk"),line.get("akun_deprs"),line.get("no_bukti")]);
		}
		this.sg1.setNoUrut(start);
	},
	doFileChange: function(sender, filename, allow){		
	},
	doSelectedPage: function(sender, page){	
		this.loadData(page,this.rowPerPage);
	},
	doGenerate: function(sender){
		this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "loadkts", "noktsload", this.eJenis.getText()+"LB"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
	},
	formatNumeric: function(format, idx){
		result = idx;
		for (var i =0;i < format.length;i++)
		{
			if (result.length < format.length)
				result = "0" + result;      
		}
		return result;
	},
	doSelectDate: function(sender, y,m,d){
		this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
		this.bGenerate.click();
	},
	doClickDownload: function(sender){
		window.open("server/media/formatUploadBayar.xls");
	}
});
