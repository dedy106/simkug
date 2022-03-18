window.app_saku3_transaksi_travel_prod_fBayargroup = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fBayargroup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fBayargroup";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Group", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[20,10,1000,420], childPage:["Data Pembayaran Group","List Pembayaran Group"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
				colTitle:["No Bukti","Tanggal","Nama Agen","Total"],
				colWidth:[[3,2,1,0],[100,300,80,100]],
				readOnly:true,
				colFormat:[[3],[cfNilai]],					
				dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Rekening KasBank", multiSelection:false, tag:2});						
		this.e_status = new saiCB(this.pc2.childPage[0],{bound:[780,15,200,20],caption:"Status Bayar",items:["TUNAI","TRANSFER"],readOnly:true,tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});									
		this.e_nilaip = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,16,200,22],caption:"Bayar Paket", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"], readOnly:true});
		this.cb_agen = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No Agen", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_nilait = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,17,200,22],caption:"Bayar Tambah", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"], readOnly:true});
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Currency",readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_nilaim = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,18,200,22],caption:"Bayar Dokumen", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"] , readOnly:true});
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,22],caption:"Kurs", tag:2, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,19,200,22],caption:"Total Bayar (IDR)", tag:9, tipeText:ttNilai, text:"0",readOnly:false});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,14,this.pc2.width-5,270], childPage:["Filter","Data Registrasi","Kalkulator"]});				
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:200,tag:1});
		this.cb_paket = new saiCBBL(this.pc1.childPage[0],{bound:[20,28,220,20],caption:"Paket",tag:1,multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_jadwal = new saiCBBL(this.pc1.childPage[0],{bound:[20,22,220,20],caption:"Jadwal", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_peserta = new saiCBBL(this.pc1.childPage[0],{bound:[20,23,220,20],caption:"No Jamaah", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.bTampil = new portalui_button(this.pc1.childPage[0],{bound:[120,12,90,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,
				colTitle:["No Registrasi","Jadwal","Paket","No Jamaah","Nama",
							"Saldo Paket","Saldo Tambah", "Saldo Dokumen", 
							"Bayar Paket","Bayar Tambah","Bayar Dokumen",  
							"No Closing","Kredit Paket","Kurs Closing"],
				colWidth:[[13,12,11, 10,9,8,7,6,5,4,3,2,1,0],[80,80,80, 90,90,90,  90,90,90,  220,80,100,80,100]],
				colHide:[[11,12,13],[true,true,true]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7, 11,12,13],[8,9,10]],					
				colFormat:[[5,6,7,8,9,10, 13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				nilaiChange:[this,"doNilaiChange4"],change:[this,"doChangeCell4"],
				autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});

		this.e_nilaiIDR = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"IDR --> USD", tag:9, tipeText:ttNilai, text:"0"});			
		this.bHitung = new button(this.pc1.childPage[2],{bound:[225,15,60,18],caption:"Konversi",click:[this,"doConvert"]});					
		this.e_nilaiUSD = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,200,22],caption:"Nilai USD", tag:9, tipeText:ttNilai, text:"0", readOnly:true});
		this.bDist = new button(this.pc1.childPage[2],{bound:[225,16,60,18],caption:"Distribusi",click:[this,"doHitung"]});		
		this.e_nTambah = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,22],caption:"Nilai Tambah", tag:9, tipeText:ttNilai, text:"0"});
		this.bTambah = new button(this.pc1.childPage[2],{bound:[225,17,60,18],caption:"Distribusi",click:[this,"disTambah"]});		
		this.e_nDok = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,18,200,22],caption:"Nilai Dokumen", tag:9, tipeText:ttNilai, text:"0"});
		this.bDok = new button(this.pc1.childPage[2],{bound:[225,18,60,18],caption:"Distribusi",click:[this,"disDok"]});		
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LKURS','RKURS','AKUNT','AKUND','AKUNOI','AKUNOE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "LKURS") this.lKurs = line.flag;
					if (line.kode_spro == "RKURS") this.rKurs = line.flag;
					if (line.kode_spro == "AKUNT") this.akunTambah = line.flag;
					if (line.kode_spro == "AKUND") this.akunDokumen = line.flag;

					if (line.kode_spro == "AKUNOI") this.akunOI = line.flag;
					if (line.kode_spro == "AKUNOE") this.akunOE = line.flag;
				}
			}	
			this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
		
			this.cb_akun.setSQL("select a.kode_akun, a.nama "+
								 "from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag in ('001','009') ",
								 ["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.akunTitip = "";
			this.c_curr.setText("USD");		
			
			this.cb_paket.setSQL("select no_paket, nama from dgw_paket where kode_lokasi='"+this.app._lokasi+"' ",["no_paket","nama"],false,["Kode","Nama"],"and","Data Paket",true);
			this.cb_peserta.setSQL("select no_peserta, nama from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Peserta","Nama"],"and","Data Peserta",false);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fBayargroup.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fBayargroup.implement({
	doChangeCell4: function(sender, col, row){		
		if (col == 8 || col == 9 || col == 10) this.sg4.validasi();					
	},	
	doNilaiChange4: function(){
		try{				
			var totP = totT = totM = 0 ;							
			for (var i=0; i < this.sg4.getRowCount();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(8,i) != "" && this.sg4.cells(9,i) != "" && this.sg4.cells(10,i) != ""){										
					totP += nilaiToFloat(this.sg4.cells(8,i));														
					totT += nilaiToFloat(this.sg4.cells(9,i));														
					totM += nilaiToFloat(this.sg4.cells(10,i));														
				}
			}
			this.e_nilaip.setText(floatToNilai(Math.round(totP * 100)/100));			
			this.e_nilait.setText(floatToNilai(totT));
			this.e_nilaim.setText(floatToNilai(totM));						
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
			if (this.stsSimpan == 1) this.doClick();	
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("delete from dgw_pembayaran where no_kwitansi='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBGROUP','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+
							parseNilai(this.e_total.getText())+",0,0,'"+this.cb_agen.getText()+"','-','-','-','-','-','"+this.cb_akun.getText()+"','"+this.e_status.getText()+"','BM')");

					/*
					if (nilaiToFloat(this.e_nilaip.getText()) > 0) {
						var paketIDR = nilaiToFloat(this.e_nilaip.getText()) * nilaiToFloat(this.e_kurs.getText());
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',998,'"+this.cb_akun.getText()+"','D',"+paketIDR+","+
								parseNilai(this.e_nilaip.getText())+",'"+this.e_ket.getText()+"','KB','KBPKT','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");															
					}

					if (nilaiToFloat(this.e_nilait.getText()) > 0) {	
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','D',"+nilaiToFloat(this.e_nilait.getText())+","+
								nilaiToFloat(this.e_nilait.getText())+",'"+this.e_ket.getText()+"','KB','KBTBH','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																																			
					}

					if (nilaiToFloat(this.e_nilaim.getText()) > 0) {	
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',997,'"+this.cb_akun.getText()+"','D',"+nilaiToFloat(this.e_nilaim.getText())+","+
								nilaiToFloat(this.e_nilaim.getText())+",'"+this.e_ket.getText()+"','KB','KBDOK','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																																			
					}
					*/

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','D',"+parseNilai(this.e_total.getText())+","+
							parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','KB','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");															

					var totalOri = (nilaiToFloat(this.e_kurs.getText()) *  nilaiToFloat(this.e_nilaip.getText())) + nilaiToFloat(this.e_nilait.getText()) + nilaiToFloat(this.e_nilaim.getText());							
					var sls = nilaiToFloat(this.e_total.getText()) - totalOri;
					
					if (sls != 0) {								
						if (sls < 0) {							
							sls = sls * -1;
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',998,'"+this.akunOE+"','D',"+sls+","+
									sls+",'"+this.e_ket.getText()+"','KB','SLSKOMA','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																																			
						}
						else {							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',998,'"+this.akunOI+"','C',"+sls+","+
									sls+",'"+this.e_ket.getText()+"','KB','SLSKOMA','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																																			
						}
					}		

					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("insert into dgw_pembayaran (no_kwitansi,no_reg,jadwal,tgl_bayar,paket,sistem_bayar,kode_lokasi,periode,nilai_t,nilai_p,kode_curr,kurs,nilai_m) values  "+ 
										"('"+this.e_nb.getText()+"','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(1,i)+"','"+this.dp_d1.getDateString()+"','"+this.sg4.cells(2,i)+"','"+this.e_status.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg4.cells(9,i))+","+nilaiToFloat(this.sg4.cells(8,i))+",'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.sg4.cells(10,i))+")");
					
								if (nilaiToFloat(this.sg4.cells(8,i)) > 0) {
									var paketIDR = nilaiToFloat(this.sg4.cells(8,i)) * nilaiToFloat(this.e_kurs.getText());

									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(12,i)+"','C',"+paketIDR+","+
											nilaiToFloat(this.sg4.cells(8,i))+",'"+this.e_ket.getText()+"','KB','KB','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");	 																																		

									//hitung selisih kurs pembyaran dan closing jadwal (untuk yg di piutang-kan - saat berangkat blm lunas)								
									//jika bayar setelah berangkat
									if (this.sg4.cells(11,i) != "-") {
										this.kurs_closing = nilaiToFloat(this.sg4.cells(13,i));
										if (this.kurs_closing != 0 && this.kurs_closing != nilaiToFloat(this.e_kurs.getText()))  {
											var sls = (nilaiToFloat(this.e_kurs.getText()) - this.kurs_closing) * nilaiToFloat(this.sg4.cells(8,i));
											if (sls !=0 ) {
												if (sls > 0){ 
													var akunKurs = this.lKurs;
													var dc = "C";
													var dcPiutang = "D";
												}
												else {
													var akunKurs = this.rKurs;
													var dc = "D";
													var dcPiutang = "C";
												}
												sls = Math.abs(sls);

												sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
														"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',777,'"+akunKurs+"','"+dc+"',"+sls+","+
														sls+",'Selisih Kurs Piutang Closing','KB','SKURS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
										
												sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
														"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',778,'"+this.sg4.cells(10,i)+"','"+dcPiutang+"',"+sls+","+
														sls+",'Selisih Kurs Piutang Closing','KB','SLSPIU','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																						
											}
										}		
									}					
								}

								if (nilaiToFloat(this.sg4.cells(9,i)) > 0) {
									var j = i + 1000;
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunTambah+"','C',"+nilaiToFloat(this.sg4.cells(9,i))+","+
											nilaiToFloat(this.sg4.cells(9,i))+",'Pembayaran a.n Reg "+this.sg4.cells(0,i)+"','KB','PDTAMBAH','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
								}

								if (nilaiToFloat(this.sg4.cells(10,i)) > 0) {
									var j = i + 3000;
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunDokumen+"','C',"+nilaiToFloat(this.sg4.cells(10,i))+","+
											nilaiToFloat(this.sg4.cells(10,i))+",'Pembayaran a.n Reg "+this.sg4.cells(0,i)+"','KB','PDDOKUMEN','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
								}

							}
						}
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);
				this.sg3.clear(1);
				this.sg4.clear(1);
				this.pc2.setActivePage(this.pc2.childPage[0]);	
				this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
				this.stsSimpan = 1;							
				break;
				
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";	
				//this.sg4.validasi(); 
				var totP = totT = totM = 0;
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						totP += nilaiToFloat(this.sg4.cells(8,i));
						totT += nilaiToFloat(this.sg4.cells(9,i));
						totM += nilaiToFloat(this.sg4.cells(10,i));
						
						if ((nilaiToFloat(this.sg4.cells(5,i)) < nilaiToFloat(this.sg4.cells(8,i))) || (nilaiToFloat(this.sg4.cells(6,i)) < nilaiToFloat(this.sg4.cells(9,i))) || (nilaiToFloat(this.sg4.cells(7,i)) < nilaiToFloat(this.sg4.cells(10,i))) ) {
							var j = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Pembayaran melebihi Saldo.[Baris : "+j+"]");
							return false;
						}
					}
				}
				
				totP = Math.round(totP * 100) / 100;
				if (nilaiToFloat(this.e_nilaip.getText()) != totP) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar Paket tidak sama dengan rincian");
					return false;						
				}
				if (nilaiToFloat(this.e_nilait.getText()) != totT) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar Tambahan tidak sama dengan rincian");
					return false;						
				}
				if (nilaiToFloat(this.e_nilaim.getText()) != totM) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar Tambahan tidak sama dengan rincian");
					return false;						
				}															
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar tidak boleh nol atau kurang");
					return false;						
				}	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				this.simpan();
				break;				
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from dgw_pembayaran where no_kwitansi='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) this.doClick();
	},	
	doClick:function(sender) {
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.cb_agen.setText("","");
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);				
				this.sg3.clear(1);				
				this.sg4.clear(1);
				this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);				
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));						
			setTipeButton(tbSimpan);
		}		
	},
	doLoadData:function(sender) {
		if (this.cb_agen.getText()!= "" && this.cb_paket.getText()!= "" && this.cb_jadwal.getText()!= ""  && this.stsSimpan==1) {						
			if (this.cb_peserta.getText() != "") var jamaahRef = " and b.no_peserta_ref='"+this.cb_peserta.getText()+"' ";
			else var jamaahRef = " ";

			var strSQL = "select a.nama, b.no_reg, b.no_peserta, "+
						"round((b.harga+b.harga_room) - isnull(g.bayar_p,0),4) as saldo_p, "+
						"isnull(h.nilai_t,0) - isnull(g.bayar_t,0) - b.diskon as saldo_t, "+
						"isnull(i.nilai_m,0) - isnull(g.bayar_m,0) as saldo_m, "+
						"convert(varchar,c.tgl_berangkat,103) as tgl_berangkat, e.nama as paket, "+
						"case when c.no_closing ='-' then f.kode_akun else f.akun_piutang end as kode_akun, "+
						"c.no_closing, c.kurs_closing "+

						"from dgw_peserta a "+

						"inner join dgw_reg b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi and b.no_paket='"+this.cb_paket.getText()+"' and b.no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' "+jamaahRef+" "+
						"inner join dgw_jadwal c on b.no_paket = c.no_paket and b.no_jadwal = c.no_jadwal and b.kode_lokasi=c.kode_lokasi "+
						"inner join dgw_paket e on b.no_paket=e.no_paket and b.kode_lokasi=e.kode_lokasi "+	
						"inner join dgw_jenis_produk f on e.kode_produk=f.kode_produk and e.kode_lokasi=f.kode_lokasi "+	
					
						"left join ("+
						"   select a.no_reg,a.kode_lokasi,sum(a.nilai) as nilai_t "+
						"   from dgw_reg_biaya a inner join dgw_biaya b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi and b.jenis='TAMBAHAN' "+
						"   where a.kode_lokasi='"+this.app._lokasi+"' group by a.no_reg,a.kode_lokasi  "+							
						") h on b.no_reg=h.no_reg and a.kode_lokasi=h.kode_lokasi "+

						"left join ("+
						"   select a.no_reg,a.kode_lokasi,sum(a.nilai) as nilai_m "+
						"   from dgw_reg_biaya a inner join dgw_biaya b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi and b.jenis='DOKUMEN' "+
						"   where a.kode_lokasi='"+this.app._lokasi+"' group by a.no_reg,a.kode_lokasi  "+							
						") i on b.no_reg=i.no_reg and a.kode_lokasi=i.kode_lokasi "+

						"left join ("+
						"   select no_reg,kode_lokasi,sum(nilai_p) as bayar_p, sum(nilai_t) as bayar_t, sum(nilai_m) as bayar_m "+
						"   from dgw_pembayaran "+
						"   where kode_lokasi='"+this.app._lokasi+"' and no_kwitansi <> '"+this.e_nb.getText()+"' group by no_reg,kode_lokasi  "+							
						") g on b.no_reg=g.no_reg and a.kode_lokasi=g.kode_lokasi "+

						"where ( ((b.harga+b.harga_room) - isnull(g.bayar_p,0) > 0)  or  (isnull(h.nilai_t,0) - b.diskon - isnull(g.bayar_t,0) > 0)  or  (isnull(i.nilai_m,0) - isnull(g.bayar_m,0) > 0) ) "+
						"and b.no_agen='"+this.cb_agen.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];									
					this.sg4.appendData([line.no_reg,line.tgl_berangkat,line.paket,line.no_peserta,line.nama,floatToNilai(line.saldo_p),floatToNilai(line.saldo_t),floatToNilai(line.saldo_m),"0","0","0",line.no_closing,line.kode_akun,floatToNilai(line.kurs_closing)]);
				}
			} 
			else this.sg4.clear(1);
			this.jmlRow = parseFloat(this.sg4.getRowCount());
			this.pc1.setActivePage(this.pc1.childPage[1]);		
		}		
		else {
			this.cb_agen.getText()!= "" && this.cb_paket.getText()!= "" && this.cb_jadwal.getText()!= ""
			system.alert(this,"Agen / Paket / Jadwal harus ditentukan","");
		}		
	},
	doChange:function(sender){		
		try {
			if (sender == this.cb_paket && this.cb_paket.getText()!="") {
				if (sender == this.cb_paket && this.cb_paket.getText() != "") {
					this.cb_jadwal.setText("","");
					this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl_berangkat,no_jadwal from dgw_jadwal where no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["tgl_berangkat","no_jadwal"],false,["Jadwal","ID Jadwal"],"and","Data Jadwal",true);
				}
			}
			if (sender == this.c_curr && this.c_curr.getText() != ""  && this.stsSimpan==1) {
				var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = 'USD' and kode_lokasi='"+this.app._lokasi+"' order by id desc ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_kurs.setText(floatToNilai(line.kurs));	
					}					
				}
			}					
			if (sender == this.e_kurs || sender == this.e_nilaip || sender == this.e_nilait || sender == this.e_nilaim) {
				var total = (nilaiToFloat(this.e_kurs.getText()) *  nilaiToFloat(this.e_nilaip.getText())) + nilaiToFloat(this.e_nilait.getText()) + nilaiToFloat(this.e_nilaim.getText());
				total = Math.round(total);				
				this.e_total.setText(floatToNilai(total));				
			}	
		}catch(e){
			systemAPI.alert(e);
		}	
	},
	doConvert:function(sender){	
		try{							
			if (this.e_kurs.getText() != "" && this.e_nilaiIDR.getText() != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);				
				var total = (nilaiToFloat(this.e_nilaiIDR.getText()) /  nilaiToFloat(this.e_kurs.getText()));
				total = Math.round(total * 100) / 100;				
				this.e_nilaiUSD.setText(floatToNilai(total));
			}
		} catch(e){
			alert(e);
		}
	},
	doHitung:function(sender){	
		try{
			//nilai paket = USD										
			if (this.e_nilaiUSD.getText() != "" && this.e_nilaiUSD.getText() != "0" && this.jmlRow != 0) {
				var total = (nilaiToFloat(this.e_nilaiUSD.getText()) /  this.jmlRow);
				this.nilaiDis = Math.round(total*100)/100;
				
				var nTemp = 0;
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						if (nilaiToFloat(this.sg4.cells(5,i))  > 0) {
							if (nilaiToFloat(this.sg4.cells(5,i)) > this.nilaiDis) {
								this.sg4.cells(8,i,this.nilaiDis);
								nTemp += this.nilaiDis;
							}
							else {
								this.sg4.cells(8,i,nilaiToFloat(this.sg4.cells(5,i)));
								nTemp += nilaiToFloat(this.sg4.cells(5,i));
							}
							var j=i;
						}
					}
				}	

				var selisih = (nilaiToFloat(this.e_nilaiUSD.getText()) * 100) - (nTemp * 100);
				var recAkhir = Math.round(selisih + (nilaiToFloat(this.sg4.cells(8,j)) * 100));							
				this.sg4.cells(8,j,recAkhir/100);				
			}
			this.pc1.setActivePage(this.pc1.childPage[1]);	

		} catch(e){
			alert(e);
		}
	},	
	disTambah:function(sender){	
		try{			
            //nilai tambah = IDR
			if (this.e_nTambah.getText() != "" && this.jmlRow != 0) {
				var total = (nilaiToFloat(this.e_nTambah.getText()) /  this.jmlRow);
				this.nilaiDis = Math.round(total);
				
				var nTemp = 0;
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						if (nilaiToFloat(this.sg4.cells(6,i))  > 0) {
							if (nilaiToFloat(this.sg4.cells(6,i)) > this.nilaiDis) {
								this.sg4.cells(9,i,this.nilaiDis);
								nTemp += this.nilaiDis;
							}
							else {
								this.sg4.cells(9,i,nilaiToFloat(this.sg4.cells(6,i)));
								nTemp += nilaiToFloat(this.sg4.cells(6,i));
							}
							var j=i;
						}
					}
				}	
				
				var selisih = (nilaiToFloat(this.e_nTambah.getText())) - (nTemp);
				var recAkhir = Math.round(selisih + nilaiToFloat(this.sg4.cells(9,j)));							
				this.sg4.cells(9,j,recAkhir);			
				
			}
			
		} catch(e){
			alert(e);
		}
	},	
	disDok:function(sender){	
		try{			
            //nilai tambah = IDR
			if (this.e_nDok.getText() != "" && this.jmlRow != 0) {
				var total = (nilaiToFloat(this.e_nDok.getText()) /  this.jmlRow);
				this.nilaiDis = Math.round(total);
				
				var nTemp = 0;
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						if (nilaiToFloat(this.sg4.cells(7,i))  > 0) {
							if (nilaiToFloat(this.sg4.cells(7,i)) > this.nilaiDis) {
								this.sg4.cells(10,i,this.nilaiDis);
								nTemp += this.nilaiDis;
							}
							else {
								this.sg4.cells(10,i,nilaiToFloat(this.sg4.cells(7,i)));
								nTemp += nilaiToFloat(this.sg4.cells(7,i));
							}
							var j=i;
						}
					}
				}	
				
				var selisih = (nilaiToFloat(this.e_nDok.getText())) - (nTemp);
				var recAkhir = Math.round(selisih + nilaiToFloat(this.sg4.cells(10,j)));							
				this.sg4.cells(10,j,recAkhir);			
				
			}
			
		} catch(e){
			alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_travel_rptPembayaran";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kwitansi='"+this.e_nb.getText()+"' ";
								this.filter2 = this.app._namaUser;
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
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			this.sg3.clear(1); 
			this.sg4.clear(1); 
			setTipeButton(tbAllFalse);		
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
			this.stsSimpan = 1;			
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bukti, convert(varchar,a.tanggal,103) as tanggal, b.no_agen+' - '+b.nama_agen as agen, a.nilai1 "+
					 "from trans_m a inner join dgw_agent b on a.nik1=b.no_agen and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F'  and a.form='KBGROUP' order by a.no_bukti";			
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
			this.sg3.appendData([line.no_bukti,line.tanggal,line.agen,floatToNilai(line.nilai1)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				this.e_nb.setText(this.sg3.cells(0,row));
				
				var data = this.dbLib.getDataProvider("select b.nik1,a.sistem_bayar,a.kurs,sum(a.nilai_p) as nilai_p,sum(a.nilai_t) as nilai_t,b.param1,b.keterangan,b.nilai1 "+
													  "from dgw_pembayaran a inner join trans_m b on a.no_kwitansi = b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
													  "where a.no_kwitansi='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
													  "group by a.sistem_bayar,a.kurs,b.param1,b.nik1,b.keterangan,b.nilai1",true);						   
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_ket.setText(line.keterangan);						
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.e_nilaip.setText(floatToNilai(line.nilai_p));		
						this.e_nilait.setText(floatToNilai(line.nilai_t));	
						this.cb_akun.setText(line.param1);			
						this.e_status.setText(line.sistem_bayar);
						this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where no_agen='"+line.nik1+"' and kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
						this.cb_agen.setText(line.nik1);

						var nTotalIDR = parseFloat(line.nilai1);
					}
				}

				var strSQL = "select a.nama, b.no_reg, b.no_peserta, i.nilai_p,i.nilai_t,i.nilai_m, "+
							 "round((b.harga+b.harga_room) - isnull(g.bayar_p,0),4) as saldo_p, "+
							 " isnull(h.nilai_t,0) - isnull(g.bayar_t,0) - b.diskon as saldo_t, "+
							 " isnull(h.nilai_m,0) - isnull(g.bayar_m,0) as saldo_m, "+
							 "convert(varchar,c.tgl_berangkat,103) as tgl_berangkat, e.nama as paket, case when c.no_closing ='-' then f.kode_akun else f.akun_piutang end as kode_akun, c.no_closing, c.kurs_closing "+
							 "from dgw_peserta a "+
							 "inner join dgw_reg b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
							 "inner join dgw_jadwal c on b.no_paket = c.no_paket and b.no_jadwal = c.no_jadwal  "+
							 "inner join dgw_paket e on b.no_paket=e.no_paket and b.kode_lokasi=e.kode_lokasi "+	
							 "inner join dgw_jenis_produk f on e.kode_produk=f.kode_produk and e.kode_lokasi=f.kode_lokasi "+	
							 "inner join dgw_pembayaran i on b.no_reg=i.no_reg and b.kode_lokasi=i.kode_lokasi "+	
							
							 "left join ("+
							 "   select a.no_reg,a.kode_lokasi, "+
							 "			sum(case when b.jenis='TAMBAHAN' then a.nilai else 0 end) as nilai_t, "+
							 "			sum(case when b.jenis='DOKUMEN' then a.nilai else 0 end) as nilai_m "+
							 "   from dgw_reg_biaya a inner join dgw_biaya b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi "+
							 "   where a.kode_lokasi='"+this.app._lokasi+"' group by a.no_reg,a.kode_lokasi  "+							
							 ") h on b.no_reg=h.no_reg and a.kode_lokasi=h.kode_lokasi "+

							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai_p) as bayar_p, sum(nilai_t) as bayar_t , sum(nilai_m) as bayar_m "+
							 "   from dgw_pembayaran "+
							 "   where kode_lokasi='"+this.app._lokasi+"' and no_kwitansi <> '"+this.e_nb.getText()+"' group by no_reg,kode_lokasi  "+							
							 ") g on b.no_reg=g.no_reg and a.kode_lokasi=g.kode_lokasi "+

							 "where i.no_kwitansi='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.no_reg,line.tgl_berangkat,line.paket,line.no_peserta,line.nama,floatToNilai(line.saldo_p),floatToNilai(line.saldo_t),floatToNilai(line.saldo_m),floatToNilai(line.nilai_p),floatToNilai(line.nilai_t),floatToNilai(line.nilai_m),line.no_closing,line.kode_akun,floatToNilai(line.kurs_closing)]);
					}
				} 
				else this.sg4.clear(1);

				this.jmlRow = parseFloat(this.sg4.getRowCount());	
				this.e_total.setText(floatToNilai(nTotalIDR));								
			}
		} catch(e) {alert(e);}
	}
});
