window.app_saku2_transaksi_siaga_fKbPiutang3E = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKbPiutang3E.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fKbPiutang3E";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penerimaan Piutang: Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.e_nb = new saiCBBL(this,{bound:[20,16,240,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.c_jenis = new saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["CD","BD"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_bank = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kas/Bank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});					
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});						
		this.e_tambah = new saiLabelEdit(this,{bound:[800,15,200,20],caption:"Total Tambahan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.cb_akun = new saiCBBL(this,{bound:[20,11,200,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});									
		this.e_saldo = new saiLabelEdit(this,{bound:[800,11,200,20],caption:"Total Saldo", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.c_curr = new saiLabelEdit(this,{bound:[20,14,140,20],caption:"Mt Uang - Kurs", tag:2, readOnly:true, text:"IDR",change:[this,"doChange"]});				
		this.e_kurs = new saiLabelEdit(this,{bound:[170,14,50,20],caption:"", tag:1, labelWidth:2, readOnly:true, tipeText:ttNilai, text:"1",tag:2,change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this,{bound:[800,14,200,20],caption:"Total KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.cb_cust = new saiCBBL(this,{bound:[20,11,220,20],caption:"Customer", readOnly:true, tag:0,change:[this,"doChange"]});					
		this.e_beban = new saiLabelEdit(this,{bound:[800,11,200,20],caption:"Total Beban", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,270], childPage:["Data Pelunasan","Jurnal Tambahan","Data Anggaran","NoBukti Baru"]});				
				this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:9,
				colTitle:["No Invoice","Keterangan","Akun AR","Kurs","Saldo","Nilai KB","Nilai Beban","Sls Kurs"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,80,60,100,250,100]],
				columnReadOnly:[true,[0,1,2,3,4,7],[5,6]],
				colFormat:[[3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR","Kode PP","Nama PP","DRK","Nama DRK"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,50,100,50,100,100,250,40,150,80]],					
					columnReadOnly:[true,[1,5,7,9],[0,2,3,4,6,8]],
					buttonStyle:[[0,2,6,8],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[875,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.cb2 = new portalui_checkBox(this.pc1.childPage[3],{bound:[20,10,100,25],caption:"Ubah No Bukti",selected:false});
		this.c_jenis2 = new saiCB(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"Jenis",items:["CD","BD"], readOnly:true,tag:4,change:[this,"doChange2"]});
		this.e_cabang2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,180,20],caption:"Cabang", readOnly:true, text:"",tag:4,change:[this,"doChange2"]});						
		this.cb_bank2 = new saiCBBL(this.pc1.childPage[3],{bound:[20,14,200,20],caption:"Kas/Bank", multiSelection:false, maxLength:10,tag:4,change:[this,"doChange2"]});			
		this.e_bulan = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,180,20],caption:"Periode", readOnly:true, text:"",change:[this,"doChange2"],tag:4});						
		this.e_nu = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,14,180,20],caption:"No Urut", maxLength:3, text:"0",change:[this,"doChange2"],tipeText:ttNilai,tag:4});
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,220,20],caption:"No Bukti Baru", readOnly:true,tag:4});								
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
									
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			this.cb_cabang.setSQL("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_cabang","b.nama"],false,["Kode","Nama"],"and","Data Cabang",true);
			this.cb_bank.setSQL("select kode_bank, nama from gr_bank where kode_lokasi='"+this.app._lokasi+"'",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			this.cb_bank.setText("KAS");
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}				
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");		

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('RKURS','LKURS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					// if (line.kode_spro == "AKUNOI") this.akunOI = line.flag;								
					// if (line.kode_spro == "AKUNOE") this.akunOE = line.flag;
					if (line.kode_spro == "RKURS") this.akunRSK = line.flag;								
					if (line.kode_spro == "LKURS") this.akunLSK = line.flag;													
				}
			}
			this.cb_bank2.setSQL("select kode_bank, nama from gr_bank where kode_lokasi='"+this.app._lokasi+"'",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fKbPiutang3E.extend(window.childForm);
window.app_saku2_transaksi_siaga_fKbPiutang3E.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					var data = this.dbLib.getDataProvider("select akun_oe,akun_oi from gr_piuumum where kode_cabang='"+this.cb_cabang.getText()+"'",true);		
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){										
							this.akunOE = line.akun_oe;
							this.akunOI = line.akun_oi;
						} 
					}

					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete gr_piutangbayar_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					this.nb = this.e_nb.getText();
					if (this.cb2.isSelected()) {
						this.nb = this.e_nb2.getText();
						this.c_jenis.setText(this.c_jenis2.getText());
						this.cb_bank.setText(this.cb_bank.getText(),this.cb_bank.rightLabelCaption);
					}
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.nb+"','"+this.app._lokasi+"','-','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','KBPIUTANG3','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_total.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_cust.getText()+"','"+this.cb_cust.rightLabelCaption+"','"+this.cb_bank.getText()+"')");
										
					var kasIDR = Math.round(nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText()));
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.nb+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+kasIDR+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBPIUTANG3','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',"+nilaiToFloat(this.e_total.getText())+")");
										
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "0"){														
							if (nilaiToFloat(this.sg1.cells(5,i)) <= nilaiToFloat(this.sg1.cells(4,i))) 
								var nilai = nilaiToFloat(this.sg1.cells(5,i)) + nilaiToFloat(this.sg1.cells(6,i));					
							else var nilai = nilaiToFloat(this.sg1.cells(4,i));															
							var nilaiIDR = Math.round(nilai * nilaiToFloat(this.sg1.cells(3,i)));														
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.nb+"','"+this.sg1.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(2,i)+"','"+this.e_ket.getText()+"','C',"+nilaiIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPIUTANG3','AR','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilai+")");							
							
							var nilaiLain = 0;
							if (nilaiToFloat(this.sg1.cells(6,i)) > 0) 
								nilaiLain = nilaiToFloat(this.sg1.cells(6,i));
							else {
								if (nilaiToFloat(this.sg1.cells(5,i)) > nilaiToFloat(this.sg1.cells(4,i))) 							
								nilaiLain = nilaiToFloat(this.sg1.cells(4,i)) - nilaiToFloat(this.sg1.cells(5,i));
							}							
							sql.add("insert into gr_piutangbayar_d(no_bukti,kode_lokasi,no_piutang,akun_piutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs) values "+
									"('"+this.nb+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"',"+parseNilai(this.sg1.cells(5,i))+","+nilaiLain+","+parseNilai(parseNilai(this.sg1.cells(7,i)))+",'"+this.e_periode.getText()+"','D','KB','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+")");							
						}
					}																													
					if (nilaiToFloat(this.e_beban.getText()) > 0) {						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
								"('"+this.nb+"','-','"+this.dp_d1.getDateString()+"',98,'"+this.akunOE+"','"+this.e_ket.getText()+"','D',"+this.nilaiOEIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPIUTANG3','OE','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+parseNilai(this.e_beban.getText())+")");										
					}					
					if (this.nilaiOI != 0) {						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
								"('"+this.nb+"','-','"+this.dp_d1.getDateString()+"',99,'"+this.akunOI+"','"+this.e_ket.getText()+"','C',"+this.nilaiOIIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPIUTANG3','OI','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+this.nilaiOI+")");										
					}
					if (this.nilaiSK > 0) {						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							    "('"+this.nb+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunLSK+"','"+this.e_ket.getText()+"','C',"+this.nilaiSK+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBPIUTANG3','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+this.nilaiSK+")");				
					}
					if (this.nilaiSK < 0) {						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							    "('"+this.nb+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunRSK+"','"+this.e_ket.getText()+"','D',"+Math.abs(this.nilaiSK)+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBPIUTANG','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+Math.abs(this.nilaiSK)+")");				
					}
					
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){																    
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg4.cells(5,i))+",'"+this.sg4.cells(6,i)+"','"+this.sg4.cells(8,i)+"','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBPIUTANG3','TAMBAH','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg4.cells(4,i))+")");
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :				
				if (this.cb2.isSelected()) {				
					this.doCheck();					
					if (this.ketemu) {
						system.alert(this,"Transaksi tidak valid.","No Bukti Baru sudah terpakai.");
						return false;
					}					
				}								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();				
				for (var i = 0; i < this.sg1.rows.getLength();i++){
					if (this.sg1.rowValid(i)){											
						if ((nilaiToFloat(this.sg1.cells(5,i)) > nilaiToFloat(this.sg1.cells(4,i))) && (nilaiToFloat(this.sg1.cells(6,i)) != 0)) {
							var j = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Beban tidak valid. Baris : "+j);
							return false;						
						}						
						if ( (nilaiToFloat(this.sg1.cells(6,i)) > 0) && ((nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(5,i))) > nilaiToFloat(this.sg1.cells(4,i))) ) {
							var j = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Beban tidak valid. Baris : "+j);
							return false;						
						}
					}
				}				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
					return false;						
				}				
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				this.cb1.setSelected(false);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					this.nb = this.e_nb2.getText();
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from gr_piutangbayar_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12)this.e_periode.setText(y+""+m);			
		else this.e_periode.setText(this.app._periode);	
		
		var sql = new server_util_arrayList();			
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' ");
		this.dbLib.getMultiDataProviderA(sql);		
	},
	doChange2:function(sender){									
		var idx = parseFloat(this.e_nu.getText());
		idx = idx.toString();
		if (idx.length == 1) var nu = "00"+idx;
		if (idx.length == 2) var nu = "0"+idx;
		if (idx.length == 3) var nu = idx;						
		this.e_nb2.setText(this.c_jenis2.getText() + nu + "/" + this.e_bulan.getText() + "/" + this.e_periode.getText().substr(2,2) + "/" + this.e_cabang2.getText() +"/" +this.cb_bank2.getText());
	},
	doCheck:function(sender){	
		this.ketemu = false;		
		var data = this.dbLib.getDataProvider("select keterangan "+
			           "from kas_m where no_kas='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.ketemu = true;
			} 
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.cb_cabang) {			
			if (this.e_periode.getText()!="" && this.cb_cabang.getText()!="") {
				this.e_nb.setSQL("select no_kas, keterangan from kas_m where modul = 'KBPIUTANG3' and kode_pp ='"+this.cb_cabang.getText()+"' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
			}			
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.cb1.setSelected(true);						
			var data = this.dbLib.getDataProvider("select a.tanggal,a.periode,a.keterangan,a.jenis,a.nik_buat,b.nama as nama_buat,a.kode_pp,c.nama as nama_cab,a.kode_bank,d.nama as nama_bank,a.akun_kb,f.nama as nama_akun,a.ref1,f.kode_curr,a.kurs, "+
					   "    g.kode_cust,g.nama as nama_cust "+
			           "from kas_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			           "	inner join gr_cabang c on a.kode_pp=c.kode_cabang and a.kode_lokasi=c.kode_lokasi "+
					   "	inner join gr_bank d on a.kode_bank=d.kode_bank and a.kode_lokasi=d.kode_lokasi "+					   
					   "    inner join masakun f on a.akun_kb=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+					   					   
					   "    inner join gr_cust g on a.no_link=g.kode_cust and a.kode_lokasi=g.kode_lokasi "+					   					   
					   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.jenis);					
					this.cb_cabang.setText(line.kode_pp,line.nama_cab);
					this.cb_bank.setText(line.kode_bank,line.nama_bank);
					this.e_ket.setText(line.keterangan);										
					this.cb_buat.setText(line.nik_buat,line.nama_buat);					
					this.cb_akun.setText(line.akun_kb,line.nama_akun);						
					this.c_curr.setText(line.kode_curr);					
					this.e_kurs.setText(floatToNilai(line.kurs));
					this.c_jenis2.setText(line.jenis);					
					this.e_cabang2.setText(line.kode_pp);
					this.cb_bank2.setText(line.kode_bank,line.nama_bank);
					this.e_bulan.setText(this.e_nb.getText().substr(6,1));
					this.cb_cust.setText(line.kode_cust,line.nama_cust);
				} 
			}					
			var strSQL = "select a.no_piutang,a.keterangan,a.akun_piutang,a.kurs,a.nilai_curr-isnull(c.bayar,0) as saldo,x.nilai_kas,case when x.nilai_lain > 0 then x.nilai_lain else 0 end as nilai_lain "+
			             "from gr_piutang_m a "+
						 "       inner join gr_piutangbayar_d x on a.no_piutang=x.no_piutang and a.kode_lokasi=x.kode_lokasi "+
						 "       left join (select no_piutang,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_piutangbayar_d where no_bukti <> '"+this.e_nb.getText()+"' group by no_piutang,kode_lokasi ) c on a.no_piutang=c.no_piutang and a.kode_lokasi=c.kode_lokasi "+
						 "where x.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_piutang,line.keterangan,line.akun_piutang,floatToNilai(line.kurs),floatToNilai(line.saldo),floatToNilai(line.nilai_kas),floatToNilai(line.nilai_lain),"0"]);
				}
			} else this.sg1.clear(1);			
			this.sg1.validasi();
			
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk  "+
						"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
						"             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.jenis='TAMBAH' and a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg4.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg4.clear(1);				
			this.pc1.setActivePage(this.pc1.childPage[0]);			 			
		}
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg1.validasi();
			}
			else {				
				this.e_kurs.setReadOnly(false); this.sg1.validasi();
			}
		}
		if (sender == this.e_kurs) {
			this.sg1.validasi();
		}
	},			
	doNilaiChange1: function(){
		try{
			this.nilaiOEIDR = this.nilaiOIIDR = this.nilaiOI = 0;
			this.nilaiSK = 0;
			var tambah = beban = nilai = saldo = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(5,i)!="0" && this.sg1.cells(4,i) != "" && this.e_kurs.getText()!="") {					
					if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != "" && this.sg1.cells(5,i) != "") {
						this.sg1.cells(7,i,floatToNilai(Math.round((nilaiToFloat(this.e_kurs.getText())-nilaiToFloat(this.sg1.cells(3,i))) * nilaiToFloat(this.sg1.cells(5,i)))));
						this.nilaiSK += nilaiToFloat(this.sg1.cells(7,i));				    
					}
					saldo += nilaiToFloat(this.sg1.cells(4,i));					
					nilai += nilaiToFloat(this.sg1.cells(5,i));					
					beban += nilaiToFloat(this.sg1.cells(6,i));					
					this.nilaiOEIDR += Math.round(nilaiToFloat(this.sg1.cells(6,i)) * nilaiToFloat(this.sg1.cells(3,i)));				    
					if (nilaiToFloat(this.sg1.cells(5,i)) > nilaiToFloat(this.sg1.cells(4,i))) {
						this.nilaiOI += nilaiToFloat(this.sg1.cells(5,i)) - nilaiToFloat(this.sg1.cells(4,i));				    
						this.nilaiOIIDR += Math.round((nilaiToFloat(this.sg1.cells(5,i)) - nilaiToFloat(this.sg1.cells(4,i))) * nilaiToFloat(this.sg1.cells(3,i)));				    
					}
				}
			}	
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != ""){					
					if (this.sg4.cells(2,i).toUpperCase() == "D") tambah += nilaiToFloat(this.sg4.cells(4,i));						
					if (this.sg4.cells(2,i).toUpperCase() == "C") tambah -= nilaiToFloat(this.sg4.cells(4,i));						
				}
			}
			nilai = nilai - tambah;
			this.e_saldo.setText(floatToNilai(saldo));
			this.e_total.setText(floatToNilai(nilai));			
			this.e_beban.setText(floatToNilai(beban));		
			this.e_tambah.setText(floatToNilai(tambah));		
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},				
	doChangeCell1: function(sender, col, row){		
		if (col == 5 || col == 6) {	
			this.sg1.validasi();
		}
	},	
	doChangeCell4: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg4.cells(2,row) != "" && this.sg4.cells(4,row) != "" && this.e_kurs.getText() != "") {				
				this.sg4.cells(5,row,Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg4.cells(4,row))));
				this.sg1.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 6) {
			if (sender.cells(6,row) != "") {
				var pp = this.dataPP.get(sender.cells(6,row));
				if (pp) sender.cells(7,row,pp);
				else {
					if (trim(sender.cells(6,row)) != "") system.alert(this,"Kode PP "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(6,row,"");
					sender.cells(7,row,"");
				}
			}
		}
		if (col == 8) {
			if (sender.cells(8,row) != "") {
				var drk = this.dataDRK.get(sender.cells(8,row));
				if (drk) sender.cells(9,row,drk);
				else {
					if (trim(sender.cells(8,row)) != "") system.alert(this,"Kode DRK "+sender.cells(8,row)+" tidak ditemukan","Inputkan kode lainnya.","checkDRK");
					sender.cells(8,row,"");
					sender.cells(9,row,"");
				}
			}
		}
		sender.onChange.set(this,"doChangeCell4");			
	},
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 6){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 8){
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
												  "select kode_drk, nama  from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",
												  "select count(kode_drk) from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",
												  ["kode_drk","nama"],"and",["Kode","Nama"],false);				
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_siaga_rptBuktiBank";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.nb+"' ";
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
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.nb+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataDRK = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataDRK.set(line.kode_drk, line.nama);
								}
							}							
						}else throw result;
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
				this.pc1.show();   
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
			this.sg1.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbUbahHapus);	
		} catch(e) {
			alert(e);
		}
	}
});