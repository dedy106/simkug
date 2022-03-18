window.app_saku3_transaksi_travel_prod_fBayar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fBayar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fBayar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Individu", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[20,10,1000,440], childPage:["Data Pembayaran","List Pembayaran"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9,
		            colTitle:["No Bukti","Tanggal","Nama Jamaah","Paket","Jadwal","Nilai Paket","Nilai Tambahan","Total"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,80,200,200,80,100]],
					readOnly:true,
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],					
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Rekening KasBank", multiSelection:false, tag:2});						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});									
		this.cb_regis = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"No Registrasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_jadwal = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Jadwal",tag:3, readOnly:true});										
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Nama Jamaah",tag:3, readOnly:true});		
		this.e_paket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Paket",tag:3, readOnly:true});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,14,this.pc2.width-4,269], childPage:["Pembayaran","Rincian Biaya","Historis Pembayaran","Kalkulator Kurs"]});				
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:200,tag:1});
		this.e_status = new saiCB(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Status Bayar",items:["TUNAI","TRANSFER"],readOnly:true,tag:2});		
		this.c_curr = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Currency",readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_kurs = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,16,200,22],caption:"Kurs", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Saldo Paket", tag:3, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilaip = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,17,200,20],caption:"Bayar Paket Curr", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_saldot = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Saldo Biaya+ (IDR)", tag:3, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.e_nilait = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,19,200,22],caption:"Bayar Tambahan", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});														
		this.e_saldom = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Saldo Dok (IDR)", tag:3, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.e_nilaim = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,16,200,22],caption:"Bayar Dokumen", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});												
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,22],caption:"Total Bayar (IDR)", tag:3, tipeText:ttNilai, text:"0"});						
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,257],colCount:6,tag:9,
		            colTitle:["Kode","Nama Biaya","Curr","Tarif","Jumlah","Nilai"],
					colWidth:[[5,4,3,2,1,0],[150,150,150,80,300,100]],
					columnReadOnly:[true,[0,1,2,3,4,5]],					
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
					nilaiChange:[this,"doNilaiChange4"],
					autoAppend:false,defaultRow:1});		
					
		this.sg5 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,257],colCount:7,tag:9,
		            colTitle:["No Bukti","Tgl Bayar","Curr","Kurs","Nilai Paket","Nilai Tambahan (IDR)","Total (IDR)"],
					colWidth:[[6,5,4,3,2,1,0],[100,110,100,100,80,100,100]],
					readOnly:true,					
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});	
					
		this.e_nilaiIDR = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,200,20],caption:"IDR --> USD", tag:9, tipeText:ttNilai, text:"0"});			
		this.bHitung = new button(this.pc1.childPage[3],{bound:[225,19,60,18],caption:"Konversi",click:[this,"doConvert"]});					
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		
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

			this.isiCBReg();		
			this.cb_akun.setSQL("select a.kode_akun, a.nama "+
								 "from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag in ('001','009') ",
								 ["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
								 
			this.akunTitip = "";

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fBayar.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fBayar.implement({
	isiCBReg: function() {
		var strSQL = "select a.no_reg, b.nama "+
					 "from dgw_reg a "+
					 "inner join dgw_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+

					 "left join ("+
					 "			select no_reg,sum(nilai) as tot_tambahan from dgw_reg_biaya "+									 
					 "			where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' group by no_reg "+
					 "			) d on a.no_reg=d.no_reg "+

					 "left join ("+
					 "			 select no_reg,sum(nilai_p) as bayar_paket,sum(nilai_t+nilai_m) as bayar_tambahan from dgw_pembayaran "+
					 " 			 where kode_lokasi='"+this.app._lokasi+"' group by no_reg "+
					 "			) c on a.no_reg=c.no_reg "+

					 "where a.kode_lokasi='"+this.app._lokasi+"' and "+
					 "( ((a.harga+harga_room) > isnull(c.bayar_paket,0)) or (isnull(d.tot_tambahan,0) > isnull(c.bayar_tambahan,0) +a.diskon) )";

		this.cb_regis.setSQL(strSQL,["a.no_reg","a.nama"],false,["No Registrasi","Nama"],"and","Data Registrasi",true);
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
					var bayarPaketIDR = nilaiToFloat(this.e_nilaip.getText()) * nilaiToFloat(this.e_kurs.getText());

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBREG','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.cb_regis.getText()+"','"+this.e_ket.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','"+this.cb_regis.getText()+"','-','-','"+this.cb_akun.getText()+"','-','BM')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+parseNilai(this.e_total.getText())+","+
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
							
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunTitip+"','C',"+bayarPaketIDR+","+
							nilaiToFloat(this.e_nilaip.getText())+",'"+this.e_ket.getText()+"','KB','TTPPAKET','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										

					if (nilaiToFloat(this.e_nilait.getText()) != 0) {		
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunTambah+"','C',"+nilaiToFloat(this.e_nilait.getText())+","+
								nilaiToFloat(this.e_nilait.getText())+",'"+this.e_ket.getText()+"','KB','PDTAMBAH','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
					}
					if (nilaiToFloat(this.e_nilaim.getText()) != 0) {		
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunDokumen+"','C',"+nilaiToFloat(this.e_nilaim.getText())+","+
								nilaiToFloat(this.e_nilaim.getText())+",'"+this.e_ket.getText()+"','KB','PDDOKUMEN','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
					}

					sql.add("insert into dgw_pembayaran (no_kwitansi,no_reg,jadwal,tgl_bayar,paket,sistem_bayar,kode_lokasi,periode,nilai_t,nilai_p,kode_curr,kurs,nilai_m) values  "+ 
							"('"+this.e_nb.getText()+"','"+this.cb_regis.getText()+"','"+this.e_jadwal.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_paket.getText()+"','"+this.e_status.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_nilait.getText())+","+nilaiToFloat(this.e_nilaip.getText())+",'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_nilaim.getText())+")");
					
					//hitung selisih kurs pembyaran dan closing jadwal (untuk yg di piutang-kan - saat berangkat blm lunas)
					//jika pembayran dilakukan setelah berangkat
					if (this.kurs_closing != 0 && this.kurs_closing != nilaiToFloat(this.e_kurs.getText()))  {
						var sls = (nilaiToFloat(this.e_kurs.getText()) - this.kurs_closing) * nilaiToFloat(this.e_nilaip.getText());
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
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',777,'"+akunKurs+"','"+dc+"',"+sls+","+
									sls+",'Selisih Kurs Piutang Closing','KB','SKURS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
					
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',778,'"+this.akunTitip+"','"+dcPiutang+"',"+sls+","+
									sls+",'Selisih Kurs a.n "+this.e_nama.getText()+"','KB','SLSPIU','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");															
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
				this.pc2.setActivePage(this.pc2.childPage[0]);	
				this.isiCBReg();								
				break;
				
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";		
				if (nilaiToFloat(this.e_nilaip.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar Paket melebihi Saldo Paket.");
					return false;						
				}	
				if (nilaiToFloat(this.e_nilait.getText()) > nilaiToFloat(this.e_saldot.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar Biaya Tambahan melebihi Saldo Biaya Tambahan.");
					return false;						
				}	
				if (nilaiToFloat(this.e_nilaim.getText()) > nilaiToFloat(this.e_saldom.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar Dokumen melebihi Saldo Dokumen.");
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
				else this.simpan();
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
				this.cb_regis.setText("","");
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);				
				this.sg3.clear(1);				
				this.sg4.clear(1);
				this.sg5.clear(1);	
				this.isiCBReg();					
			}			

			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));						
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){		
		try{
			if (sender == this.cb_regis && this.cb_regis.getText()!= "") {		
				var data = this.dbLib.getDataProvider(
							   "select a.nama,d.tgl_berangkat,e.nama as paket,e.kode_curr,b.harga + b.harga_room as harga_tot,  "+
							   "case when d.no_closing ='-' then f.kode_akun else f.akun_piutang end as kode_akun,"+
							   "d.kurs_closing, d.no_closing, f.akun_piutang, b.diskon "+

							   "from dgw_peserta a inner join dgw_reg b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
							   "				   inner join dgw_jadwal d on b.no_paket=d.no_paket and b.no_jadwal=d.no_jadwal and b.kode_lokasi=d.kode_lokasi "+
							   "			       inner join dgw_paket e on b.no_paket=e.no_paket and b.kode_lokasi=e.kode_lokasi "+
							   "				   inner join dgw_jenis_produk f on e.kode_produk=f.kode_produk and e.kode_lokasi=f.kode_lokasi "+							  
							   "where b.no_reg='"+this.cb_regis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);		
							   				   
				if (typeof data == "object") {
					var line = data.rs.rows[0];							
					if (line != undefined) {										
						this.e_nama.setText(line.nama);
						this.e_jadwal.setText(line.tgl_berangkat);						
						this.e_paket.setText(line.paket);
						this.hargapaket = parseFloat(line.harga_tot);												
						this.c_curr.setText(line.kode_curr);
						this.akunTitip = line.kode_akun;
						this.kurs_closing = parseFloat(line.kurs_closing);
						this.diskon = parseFloat(line.diskon);
						
						if (line.no_closing != "-") {
							this.akunDokumen = line.akun_piutang;
							this.akunTambah = line.akun_piutang;
						}
						
						var strSQL = "select a.kode_biaya, a.tarif, a.nilai, a.jml, b.nama, 'IDR' as curr, b.jenis "+									 
									 "from dgw_reg_biaya a "+									 
									 "inner join dgw_biaya b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi "+
									 "where a.nilai <> 0 and a.no_reg='"+this.cb_regis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 
									 "union all "+
									 
									 "select 'ROOM' as kode_biaya, harga_room as tarif, harga_room as nilai, 1 as jml, 'ROOM' as nama, 'USD' as curr, '-' as jenis "+
								     "from dgw_reg  "+									 
									 "where harga_room <> 0 and no_reg='"+this.cb_regis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 
									 "union all "+
									 
									 "select 'PAKET' as kode_biaya, harga as tarif, harga as nilai, 1 as jml, 'PAKET' as nama, 'USD' as curr, '-' as jenis "+
								     "from dgw_reg  "+									 
									 "where harga <> 0 and no_reg='"+this.cb_regis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 
									 "union all "+
									 
									 "select 'DISKON' as kode_biaya, -diskon as tarif, -diskon as nilai, 1 as jml, 'DISKON' as nama, 'IDR' as curr, '-' as jenis "+
								     "from dgw_reg  "+									 
									 "where diskon <> 0 and no_reg='"+this.cb_regis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+

									 "order by curr desc";
										 
									 
						var totTambah = totDok = 0;			 
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg4.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];	
								if (line.jenis == "TAMBAHAN") totTambah += parseFloat(line.nilai);						
								if (line.jenis == "DOKUMEN") totDok += parseFloat(line.nilai);						

								this.sg4.appendData([line.kode_biaya.toUpperCase(),line.nama.toUpperCase(),line.curr.toUpperCase(),floatToNilai(line.tarif),floatToNilai(line.jml),floatToNilai(line.nilai)]);
							}
						} 
						else this.sg4.clear(1);														
						this.sg4.validasi();

						//data bayar
						var data = this.dbLib.getDataProvider("select isnull(sum(nilai_p),0) as paket, isnull(sum(nilai_t),0) as tambahan, isnull(sum(nilai_m),0) as dokumen "+
									 						  "from dgw_pembayaran "+
															  "where no_reg='"+this.cb_regis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_kwitansi <>'"+this.e_nb.getText()+"'",true);						   
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){										
								this.bayarTambah = parseFloat(line.tambahan);
								this.bayarPaket = parseFloat(line.paket);
								this.bayarDok = parseFloat(line.dokumen);					
							}
						}
						
						var saldo = this.hargapaket - this.bayarPaket;
						var saldot = totTambah - this.bayarTambah - this.diskon;						 
						var saldom = totDok - this.bayarDok;						 

						this.e_saldo.setText(floatToNilai(saldo));
						this.e_saldot.setText(floatToNilai(saldot));
						this.e_saldom.setText(floatToNilai(saldom));
						
						//historis bayar
						var strSQL = "select no_kwitansi,tgl_bayar,kode_curr,kurs,nilai_p,nilai_t,(nilai_p*kurs) + nilai_t + nilai_m as total_idr "+
									 "from dgw_pembayaran where no_reg='"+this.cb_regis.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and no_kwitansi <>'"+this.e_nb.getText()+"' "+
									 "order by tgl_bayar desc";
									 					
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg5.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg5.appendData([line.no_kwitansi,line.tgl_bayar,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.nilai_p),floatToNilai(line.nilai_t),floatToNilai(line.total_idr)]);
							}
						} 
						else this.sg5.clear(1);	
						
					}				
				}
			}
			if ( (sender == this.e_kurs || sender == this.e_nilaip || sender == this.e_nilait || sender == this.e_nilaim) && this.stsSimpan==1 ) {
				var total = (nilaiToFloat(this.e_kurs.getText()) *  nilaiToFloat(this.e_nilaip.getText())) + nilaiToFloat(this.e_nilait.getText()) + nilaiToFloat(this.e_nilaim.getText());
				total = Math.round(total);				
				this.e_total.setText(floatToNilai(total));
			}
			
			if (sender == this.c_curr && this.c_curr.getText()!= "" && this.stsSimpan==1){
				var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = '"+this.c_curr.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by id DESC ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_kurs.setText(floatToNilai(line.kurs));							
					}					
				}
			}		
		 	
		}catch(e){
			systemAPI.alert(e);
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
			this.isiCBReg();			
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																					
		var strSQL = "select a.no_kwitansi, a.tgl_bayar, a.no_reg, paket, a.jadwal, round(a.nilai_p,4) as nilai_p, a.nilai_t, (a.nilai_p * a.kurs) + a.nilai_t as total_idr "+
					 "from dgw_pembayaran a inner join trans_m b on a.no_kwitansi=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
					 "where b.kode_lokasi='"+this.app._lokasi+"' and b.posted='F' and b.form='KBREG' ";								 
		var data = this.dbLib.getDataProvider(strSQL,true);		
		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doConvert:function(sender){	
		try{							
			if (this.e_kurs.getText() != "" && this.e_nilaiIDR.getText() != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);				
				var total = (nilaiToFloat(this.e_nilaiIDR.getText()) /  nilaiToFloat(this.e_kurs.getText()));
				total = Math.round(total * 100) / 100;
				this.e_nilaip.setText(floatToNilai(total));
			}
		} catch(e){
			alert(e);
		}
	},	
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_kwitansi,line.tgl_bayar,line.no_reg,line.paket,line.jadwal,line.nilai_p,line.nilai_t,line.total_idr]); 
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

				this.cb_regis.setSQL(
							"select a.no_reg, b.nama "+
							"from dgw_reg a "+		
							"inner join dgw_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+					
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_reg='"+this.sg3.cells(2,row)+"'",
							["no_reg","nama"],false,["No Registrasi","Nama"],"and","Data Registrasi",true);
				this.cb_regis.setText(this.sg3.cells(2,row));
				
				var data = this.dbLib.getDataProvider(
								"select a.sistem_bayar,a.kurs,a.nilai_p,a.nilai_t,b.param1,b.keterangan,b.nilai1 "+
								"from dgw_pembayaran a inner join trans_m b on a.no_kwitansi = b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_reg='"+this.cb_regis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kwitansi ='"+this.e_nb.getText()+"'",true);						   								
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_ket.setText(line.keterangan);				
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.e_nilaip.setText(floatToNilai(line.nilai_p));		
						this.e_nilait.setText(floatToNilai(line.nilai_t));	
						this.cb_akun.setText(line.param1);			
						this.e_status.setText(line.sistem_bayar);
						this.e_total.setText(floatToNilai(line.nilai1));
					}
				}
																	
			}
		} catch(e) {alert(e);}
	}
});