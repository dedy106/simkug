window.app_saku3_transaksi_yakes21_dakem_fAjuDakem = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_dakem_fAjuDakem.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_dakem_fAjuDakem";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pengajuan Klaim DAKEM", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
				
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,		            
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","NIK - Nama","Pendanaan","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,80,200,300,100,80,100]],
					readOnly:true,
					colFormat:[[6],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_saldoif = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,200,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,17,200,20],caption:"Nilai Klaim", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,328], childPage:["Data Klaim","Data Peserta"]});		
		this.c_dana = new saiCB(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Pendanaan", readOnly:true,tag:2,change:[this,"doChange"]});				
		this.cb_if = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Pemegang IF",tag:2,readOnly:true,change:[this,"doChange"],multiSelection:false}); 				
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Disetujui Oleh",tag:2,multiSelection:false});         								
		this.e_nik = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"NIK - Nama", maxLength:50,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[232,14,300,20],caption:"",labelWidth:0,readOnly:true});		
		this.e_mkerja = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Masa Kerja - Almt.",readOnly:true});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[232,16,300,20],caption:"Alamat",labelWidth:0,readOnly:true});		
		this.e_aw = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,512,20],caption:"Ahli Waris", maxLength:50});		
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,22,222,20],caption:"Status Ahli Waris",items:["PASANGAN","ANAK","KERABAT LAINNYA"], readOnly:true,tag:2,change:[this,"doChange"]});						
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,120,18]}); 
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,21,222,20],caption:"Jenis Pembayaran",items:["TUNAI","TRANSFER"],change:[this,"doChange"],change:[this,"doChange"]});		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,512,20],caption:"Nama Bank", maxLength:50,tag:9});		
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,512,20],caption:"Cabang", maxLength:50,tag:9});		
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,512,20],caption:"No Rekening", maxLength:50,tag:9});		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,512,20],caption:"Nama Rekening", maxLength:50,tag:9});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Status","NIKES","Nama","Tgl Meninggal","Tgl Klaim","Nilai","Status Klaim","Tgl Lahir"],					
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,100,100,100,270,80,80]],
					columnReadOnly:[true,[0,1,2,3,4,6,7],[5]],
					buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],colFormat:[[5],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			//this.dbSika = new util_dbLib(undefined,'dbSIKA');
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
			this.isiCBnik();
		    this.c_jenis.setText("TUNAI");
			this.progSeb = "0";
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('VENDORDKM','SAPDAKEM','SAPHDAKEM') ",true);		
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "SAPDAKEM") this.akunDakem = line.flag;		
					if (line.kode_spro == "SAPHDAKEM")  this.akunHutDakem = line.flag;	
					if (line.kode_spro == "VENDORDKM")  this.vendorDKM = line.flag;														
				}
			}
			
			this.c_dana.addItem(0,"IFUND");
			this.c_dana.addItem(1,"PUSAT");
			this.c_dana.setText("IFUND");

			// var data = this.dbLib.getDataProvider("select min(anak) as ni_terbawah from yk_dakem_tarif where anak > 0",true);
			// if (typeof data == "object") {
			// 	var line = data.rs.rows[0];			
			// 	this.niBawah = parseFloat(line.ni_terbawah); 
			// }

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_dakem_fAjuDakem.extend(window.childForm);
window.app_saku3_transaksi_yakes21_dakem_fAjuDakem.implement({
	isiCBnik: function() {
		try {			
			// this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
			// 				"inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
			// 				"where b.kode_lokasi='"+this.app._lokasi+"'",
			// ["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			

			// this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
			// 					"inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
			// 					"inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
			// 					"where c.kode_pp='"+this.app._kodePP+"' and b.kode_lokasi='"+this.app._lokasi+"'",
			// 	["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			


			this.cb_if.setSQL("select distinct a.nik, a.nama from karyawan a "+
							  "inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
							  "inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
							  "inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
							  "where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"'",
			["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			


			//ut default sesuai karyawan PP pemegang IF dan yg login					
			var strSQL = "select distinct a.nik,b.no_kas from karyawan a "+
					"		inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+
					"		inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
					"where c.kode_pp='"+this.app._kodePP+"' and c.kode_lokasi='"+this.app._lokasi+"'";							  
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.noKasOpen = line.no_kas;
					this.cb_if.setText(line.nik);
					this.nikIF = this.cb_if.getText();
				}
				else {
					this.noKasOpen = "-";
					this.cb_if.setText("");
					this.nikIF = "";
				}
			}

		}
		catch(e){
			alert(e);
		}
	},
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.c_jenis.getText() == "TUNAI") {
				this.e_bank.setTag("9");
				this.e_cabang.setTag("9");
				this.e_norek.setTag("9");
				this.e_namarek.setTag("9");
			}
			else {
				this.e_bank.setTag("0");
				this.e_cabang.setTag("0");
				this.e_norek.setTag("0");
				this.e_namarek.setTag("0");
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_dakem_m where no_dakem = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_dakem_d where kdtrans = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		

						sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}					
					
					sql.add("insert into yk_dakem_m(no_dakem,kode_lokasi,periode,nik_user,tgl_input,tanggal,no_dokumen,keterangan,nik_buat,nik,aw,status_aw,tgl_transfer,jenis_bayar, bank,cabang,no_rek,nama_rek,alamat, akun_dakem,no_app,nik_app,kode_pp,progress,no_pb) values "+ 
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"', '"+this.e_ket.getText()+"', '"+this.app._userLog+"', '"+this.e_nik.getText()+"', '"+this.e_aw.getText()+"', '"+this.c_status.getText()+"', '"+this.dp_d2.getDateString()+"', '"+this.c_jenis.getText()+"', '"+this.e_bank.getText()+"', '"+this.e_cabang.getText()+"', '"+this.e_norek.getText()+"', '"+this.e_namarek.getText()+"','"+this.e_alamat.getText()+"','"+this.akunDakem+"','-','"+this.cb_app.getText()+"','"+this.app._kodePP+"','0','-')");					
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(6,i) == "BELUM" && this.sg.cells(0,i) == "APP"){
								sql.add("insert into yk_dakem_d(kdtrans,nik,nikkes,namaaw,statusaw,nominal,tglmeninggal,namabank,norek,cabang,no_kas,kode_lokasi,periode,nama_nikes,tgl_lahir) values "+
										"('"+this.e_nb.getText()+"', '"+this.e_nik.getText()+"', '"+this.sg.cells(1,i)+"', '"+this.e_aw.getText()+"', '"+this.c_status.getText()+"', "+nilaiToFloat(this.sg.cells(5,i))+", '"+this.sg.getCellDateValue(3,i)+"', '"+this.e_bank.getText()+"', '"+this.e_norek.getText()+"', '"+this.e_cabang.getText()+"', '-', '"+this.app._lokasi+"', '"+this.e_periode.getText()+"','"+this.sg.cells(2,i)+"','"+this.sg.getCellDateValue(7,i)+"')");
							}
						}
					}	

					if (this.c_dana.getText() == "IFUND") {
						//tidak ada hub sama budget,, tidak ada approval if
						sql.add("insert into if_aju_m(no_aju,kode_lokasi,periode,tgl_input,user_input,tanggal,tgl_kuitansi,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,sts_pajak,npajak,no_app,progress,nik_app,no_reim,no_kasopen,posted,nik_setuju, nilai_dpp,persen, nik_if,form) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','IFAJU','"+this.akunDakem+"','"+this.app._kodePP+"','-','"+
								this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'NON',0,'-','0','"+this.cb_app.getText()+"','-','"+this.noKasOpen+"','F','"+this.cb_app.getText()+"', "+nilaiToFloat(this.e_nilai.getText())+",0,'"+this.cb_if.getText()+"','DAKEM')");
						
						sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
								"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.akunDakem+"','"+this.app._kodePP+"','-','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'BEBAN')");					
						sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
								"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"','"+this.akunHutDakem+"','"+this.app._kodePP+"','-','C','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'HUTIF')");
					}
					else {
						//---posted = 'X' ,menjadi 'F' mennggu form approve 
						sql.add("insert into hutang_m (no_hutang, kode_lokasi, no_dokumen, tanggal, keterangan, kode_vendor, kode_curr, kurs, nik_app, kode_pp, nilai, periode, nik_user, tgl_input, akun_hutang, posted, nilai_ppn, modul, no_ref, dc) values "+
								"('"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '-', '"+this.dp_d1.getDateString()+"', '"+this.e_ket.getText()+"', '"+this.e_nik.getText()+"', 'IDR', 1, '"+this.cb_app.getText()+"', '"+this.app._kodePP+"', "+parseNilai(this.e_nilai.getText())+", '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '"+this.akunHutDakem+"', 'X', 0, 'PBDAKEM', '"+this.e_nb.getText()+"','D')")
						
						sql.add("insert into hutang_j (no_hutang, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input) values "+
								"('"+this.e_nb.getText()+"', '-', '"+this.dp_d1.getDateString()+"', 0, '"+this.akunDakem+"', '"+this.e_ket.getText()+"', 'D', 'IDR', 1, "+nilaiToFloat(this.e_nilai.getText())+", "+nilaiToFloat(this.e_nilai.getText())+", '"+this.app._kodePP+"', '-', '"+this.app._lokasi+"', 'PBDAKEM', 'BEBAN', '"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
						sql.add("insert into hutang_j (no_hutang, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input) values "+
								"('"+this.e_nb.getText()+"', '-', '"+this.dp_d1.getDateString()+"', 1, '"+this.akunHutDakem+"', '"+this.e_ket.getText()+"', 'C', 'IDR', 1, "+nilaiToFloat(this.e_nilai.getText())+", "+nilaiToFloat(this.e_nilai.getText())+", '"+this.app._kodePP+"', '-', '"+this.app._lokasi+"', 'PBDAKEM', 'HUTANG', '"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");

					}	

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
					setTipeButton(tbAllFalse);
					this.sg.clear(1); this.sg3.clear(1);
					this.doClick(this.i_gen);					
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";		
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);		
				// if (this.c_dana.getText() == "PUSAT" && nilaiToFloat(this.e_saldoif.getText()) > this.niBawah ) {
				// 	system.alert(this,"Transaksi tidak valid.","Dana IF masih bersaldo melebihi tarif dakem terendah.");
				// 	return false;
				// }			

				if (this.c_dana.getText() == "PUSAT" && this.c_jenis.getText()=="TUNAI") {
					system.alert(this,"Transaksi tidak valid.","Dana PUSAT tidak boleh berjenis TUNAI.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldoif.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh melebihi Saldo IF.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
			case "hapus" :	
				this.preView = "0";											
				if (this.progSeb == "0") {
					var sql = new server_util_arrayList();				
					
					sql.add("delete from yk_dakem_m where no_dakem = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_dakem_d where kdtrans = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		

					
					sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					this.dbLib.execArraySQL(sql);				
				}
				else system.alert(this,"Transaksi tidak valid.","Progress transaksi tidak sesuai.");
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		if (this.stsSimpan == 1) this.doClick(this.i_gen);		
	},
	doChange:function(sender){
		try {			
			if (this.stsSimpan==1) {				
				if (sender == this.e_nik || this.e_nik.getText()!="") {
					this.niksika = this.e_nik.getText();
					this.nikkessika = this.e_nik.getText()+'.000';
					var self = this;
					var datap = [];
					this.app.services.getPesertaSIKA(self.nikkessika, function(res) {
						if(res.status == 'success'){
							if(typeof res.data == 'object' && res.data.length > 0){
								line = res.data[0];
								self.jenis = line.ID_JNS_PESERTA;
								if (self.jenis == "21" || self.jenis == "22" || self.jenis == "23" || self.jenis == "24") {	
									// varibel miliday sebagai pembagi untuk menghasilkan hari
									var miliday = 24 * 60 * 60 * 1000;
									//buat object Date
									var tanggal1 = new Date(line.TGL_CAPEG);
									var tanggal2 = new Date(line.TGL_HENTI_KERJA);
									// Date.parse akan menghasilkan nilai bernilai integer dalam bentuk milisecond
									var tglPertama = Date.parse(tanggal1);
									var tglKedua = Date.parse(tanggal2);
									var mkerja = Math.floor(((tglKedua - tglPertama) / miliday)/365.2199);

									self.e_nama.setText(line.NM_PESERTA);					
									self.e_mkerja.setText(mkerja);					
									self.e_alamat.setText(line.ALMT);
									
									var datap2 = [];
									var self2 = self;
									self.app.services.getPesertaSIKAByNIK(self.niksika, function(res2) {	
										if(res2.status == 'success'){
											if(typeof res2.data == 'object' && res2.data.length > 0){
												datap2 = res2.data;
												if (self2.stsSimpan == 1) {
													if (typeof datap2 == "object" && datap2.length > 0){
														var line2;
														self2.sg.clear();
														for (var i in datap2){
															line2 = datap2[i];					
															if(line2.TGL_MENINGGAL != null){
																// conver tgl meninggal 2021-01-01 to 01/01/2021
																var date_str = line2.TGL_MENINGGAL.split(' ');
																var str = date_str[0].split('-');
																var tgl_meninggal = str[2]+'/'+str[1]+'/'+str[0];
																// end convert

																var tmp = line2.TGL_LHR.split(' ');
																var arr_bln = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
																var idx = arr_bln.indexOf(tmp[0])+1;
																idx = idx.toString();
																var bln = (idx.length == 1 ? '0'+idx : idx);
																if(tmp.length == 5){
																	var tgl = (tmp[2].length == 1 ? '0'+tmp[2] : tmp[2]);
																	tgl_lahir = tgl+"/"+bln+"/"+tmp[3];
																}else{
																	var tgl = (tmp[1].length == 1 ? '0'+tmp[1] : tmp[1]);
																	tgl_lahir = tgl+"/"+bln+"/"+tmp[2];
																}
																self2.sg.appendData(["INPROG",line2.NIKES,line2.NM_PESERTA,tgl_meninggal,'-',0,"BELUM",tgl_lahir]);
															}
														}
													} 
													else {
														self2.sg.clear(1);	
														system.info(this,"Tidak ada peserta berstatus meninggal","Hubungi Admin SIKA.");
													}
													for (var i=0;i < self2.sg.getRowCount();i++){
														if (self2.sg.rowValid(i)){				
															var data = self2.dbLib.getDataProvider("select convert(varchar,tglmeninggal,103) as tgl,nominal from yk_dakem_d where nikkes='"+self2.sg.cells(1,i)+"' ",true);	
															if (typeof data == "object"){
																var line = data.rs.rows[0];							
																if (line != undefined){					
																	self2.sg.cells(4,i,line.tgl)
																	self2.sg.cells(5,i,floatToNilai(line.nominal))
																	self2.sg.cells(6,i,"SUDAH");							
																}
																else {
																	var strSQL = "select (case when substring('"+self2.sg.cells(1,i)+"',8,3) = '000' then kk "+
																	" when substring('"+self2.sg.cells(1,i)+"',8,3) like '_00' then pas "+
																	" when substring('"+self2.sg.cells(1,i)+"',8,3) like '___' then anak end) as nilai "+
																	"from yk_dakem_tarif where "+nilaiToFloat(self2.e_mkerja.getText())+" between mk1 and mk2";							
																	var data0 = self2.dbLib.getDataProvider(strSQL,true);	
																	if (typeof data0 == "object"){
																		var line0 = data0.rs.rows[0];							
																		if (line0 != undefined){					
																			self2.sg.cells(5,i,floatToNilai(line0.nilai));
																		} 
																	}	 						
																}
															}					
														}
													}
												}								
												self2.sg.validasi();
											}else{	
												system.alert(this,'NIK Tidak ditemukan ('+self2.niksika+')', res2.message);
												return false;
											}	
										}else{	
											system.alert(this,'NIK Tidak ditemukan ('+self2.niksika+')', res2.message);
											return false;
										}
									});



								}
								else {
									if (self.jenis != "00") {
										system.alert(this,"Transaksi tidak valid.","NIK tidak berstatus 21-22-23-24 (Pensiun)");
										self.sg.clear(1);
									}
								}			
							}else{	
								self.sg.clear(1);
								self.e_nama.setText('');					
								self.e_mkerja.setText('');					
								self.e_alamat.setText('');
								system.alert(this,'NIK Tidak ditemukan ('+self.niksika+')', res.message);
								return false;
							}	
						}else{	
							self.sg.clear(1);
							self.e_nama.setText('');					
							self.e_mkerja.setText('');					
							self.e_alamat.setText('');
							system.alert(this,'NIK Tidak ditemukan ('+self.niksika+')', res.message);
							return false;
						}
					});	
				}
			}
			if (sender == this.c_jenis || this.c_jenis.getText()!="") {
				if (this.c_jenis.getText() == "TUNAI") {
					this.e_bank.setReadOnly(true);
					this.e_cabang.setReadOnly(true);
					this.e_norek.setReadOnly(true);
					this.e_namarek.setReadOnly(true);					
				}
				else {
					this.e_bank.setReadOnly(false);
					this.e_cabang.setReadOnly(false);
					this.e_norek.setReadOnly(false);
					this.e_namarek.setReadOnly(false);
				}
			}

			if (sender == this.cb_if && this.cb_if.getText()!="") {
				var strSQL = "select a.nik_app,a.no_kas,a.nilai - isnull(b.pakai,0) as saldo "+
							"from if_nik a "+

							"		left join  ("+						
							"			 select a.nik_if,a.kode_lokasi,sum(a.nilai-a.npajak) as pakai "+
							"			 from if_aju_m a "+
							"			 left join if_reim_m b on a.no_reim=b.no_reim and a.kode_lokasi=b.kode_lokasi and b.no_kas <> '-' "+
							"			 where b.no_reim is null and a.nik_if='"+this.cb_if.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju<>'"+this.e_nb.getText()+"' "+
							"			 group by a.nik_if,a.kode_lokasi "+												
							"		) b on a.nik = b.nik_if and a.kode_lokasi=b.kode_lokasi "+

							"where a.jenis='OPERASIONAL' and a.nik ='"+this.cb_if.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'";						   

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.noKasOpen = line.no_kas;
						this.nikIF = this.cb_if.getText();			
						this.e_saldoif.setText(floatToNilai(line.saldo));											
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0)  {
				this.sg.clear(1);
				this.sg3.clear(1);
				this.progSeb = "0";
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_dakem_m","no_dakem",this.app._lokasi+"-DKM"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},		
	doChangeCell: function(sender, col, row){
		if ((col == 0 || col == 5) && (this.sg.cells(5,row) != "")) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) == "BELUM" && this.sg.cells(0,i) == "APP" && this.sg.cells(5,i) != "") 
				  tot += nilaiToFloat(this.sg.cells(5,i));				
			}
			this.e_nilai.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								// this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);						
			setTipeButton(tbAllFalse);
			this.isiCBnik();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_dakem,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,b.nikkes +' - '+ b.nama_nikes as nikes,'IFUND' as dana "+
		             "from yk_dakem_m a "+
					 "inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi = b.kode_lokasi "+					 					 
					 "inner join if_aju_m c on a.no_dakem=c.no_aju and a.kode_lokasi=c.kode_lokasi and c.form='DAKEM' "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.progress in ('0','R') "+
					 "union  "+
					 "select a.no_dakem,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,b.nikkes +' - '+ b.nama_nikes as nikes,'PUSAT' as dana "+
		             "from yk_dakem_m a "+
					 "inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi = b.kode_lokasi "+					 					 					 					 
					 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') "+
					 " ";		

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_dakem,line.tgl,line.no_dokumen,line.keterangan,line.nikes,line.dana.toUpperCase(),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 6) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
				this.c_dana.setText(this.sg3.cells(5,row));																							
				
				var data4 = this.dbLib.getDataProvider("select nikkes from yk_dakem_d where kdtrans='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);	
				if (typeof data4 == "object"){
					var line4 = data4.rs.rows[0];							
					if (line4 != undefined){										
						this.nikkes = line4.nikkes;
					}						
				}			

				var strSQL = "select * from yk_dakem_m where no_dakem='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.progSeb = line.progress;							
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);
						this.e_nik.setText(line.nik);
						this.e_aw.setText(line.aw);
						this.c_status.setText(line.status_aw);					
						this.dp_d2.setText(line.tgl_transfer);	
						this.c_jenis.setText(line.jenis_bayar);											
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);

						this.nikkessika = this.e_nik.getText()+'.000';
						this.niksika = this.e_nik.getText();
						var self = this;
						this.app.services.getPesertaSIKA(this.nikkessika, function(res) {	
							if(res.status == 'success'){
								if(typeof res.data == 'object' && res.data.length > 0){
									line = res.data[0];
									
									// varibel miliday sebagai pembagi untuk menghasilkan hari
									var miliday = 24 * 60 * 60 * 1000;
									//buat object Date
									var tanggal1 = new Date(line.TGL_CAPEG);
									var tanggal2 = new Date(line.TGL_HENTI_KERJA);
									// Date.parse akan menghasilkan nilai bernilai integer dalam bentuk milisecond
									var tglPertama = Date.parse(tanggal1);
									var tglKedua = Date.parse(tanggal2);
									var mkerja = Math.floor(((tglKedua - tglPertama) / miliday)/365.2199);
									
									self.e_nama.setText(line.NM_PESERTA);					
									self.e_mkerja.setText(mkerja);					
									self.e_alamat.setText(line.ALMT);
								}else{	
									system.alert(this,'NIK Tidak ditemukan ('+self.nikkessika+')', res.message);
									return false;
								}	
							}else{	
								system.alert(this,'NIK Tidak ditemukan ('+self.nikkessika+')', res.message);
								return false;
							}
						})

						var datap2 = [];
						var self2 = this;
						this.app.services.getPesertaSIKAByNIK(this.niksika, function(res2) {	
							if(res2.status == 'success'){
								if(typeof res2.data == 'object' && res2.data.length > 0){
									datap2 = res2.data;
									if (typeof datap2 == "object" && datap2.length > 0){
										var line2;
										self2.sg.clear();
										for (var i in datap2){
											line2 = datap2[i];					
											if(line2.TGL_MENINGGAL != null){
												// conver tgl meninggal 2021-01-01 to 01/01/2021
												var date_str = line2.TGL_MENINGGAL.split(' ');
												var str = date_str[0].split('-');
												var tgl_meninggal = str[2]+'/'+str[1]+'/'+str[0];
												// end convert

												var tmp = line2.TGL_LHR.split(' ');
												var arr_bln = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
												var idx = arr_bln.indexOf(tmp[0])+1;
												idx = idx.toString();
												var bln = (idx.length == 1 ? '0'+idx : idx);
												if(tmp.length == 5){
													var tgl = (tmp[2].length == 1 ? '0'+tmp[2] : tmp[2]);
													tgl_lahir = tgl+"/"+bln+"/"+tmp[3];
												}else{
													var tgl = (tmp[1].length == 1 ? '0'+tmp[1] : tmp[1]);
													tgl_lahir = tgl+"/"+bln+"/"+tmp[2];
												}
												self2.sg.appendData(["APP",line2.NIKES,line2.NM_PESERTA,tgl_meninggal,'-',0,"BELUM",tgl_lahir]);
											}
										}
									} 
									else {
										self2.sg.clear(1);	
										system.info(this,"Tidak ada peserta berstatus meninggal","Hubungi Admin SIKA.");
									}
									
									for (var i=0;i < self2.sg.getRowCount();i++){
										if (self2.sg.rowValid(i)){					
											var data2 = self2.dbLib.getDataProvider("select convert(varchar,tglmeninggal,103) as tgl,nominal from yk_dakem_d where nikkes='"+self2.sg.cells(1,i)+"' ",true);	
											if (typeof data2 == "object"){
												var line2 = data2.rs.rows[0];							
												if (line2 != undefined){					
													self2.sg.cells(4,i,line2.tgl)
													self2.sg.cells(5,i,floatToNilai(line2.nominal))
													self2.sg.cells(6,i,"BELUM");		
												}						
											}					
										}
									}
								}else{	
									system.alert(this,'NIK Tidak ditemukan ('+self2.niksika+')', res2.message);
									return false;
								}	
							}else{	
								system.alert(this,'NIK Tidak ditemukan ('+self2.niksika+')', res2.message);
								return false;
							}
						});
															
					}
					this.sg.validasi();
				}				
			}									
		} catch(e) {alert(e);}
	}	
});
