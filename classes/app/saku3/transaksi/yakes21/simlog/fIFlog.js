window.app_saku3_transaksi_yakes21_simlog_fIFlog = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_simlog_fIFlog.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_simlog_fIFlog";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pemakaian IF Logistik", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
					readOnly:true,
					colFormat:[[3,4],[cfNilai,cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false,tag:0});				
		this.cb_if = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Pemegang IF",tag:2,readOnly:true,multiSelection:false,change:[this,"doChange"]}); 		
		this.e_saldoif = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.bGen = new button(this.pc2.childPage[0],{bound:[875,18,80,18],caption:"Gen Detail",click:[this,"doDetail"]});

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,351], childPage:["Item Pemakaian","Item Barang","List ID","File Dok","Cattn Approval"]});				
		this.cb_pesan = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"No Juskeb", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});												
		this.cb_lok = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Lokasi Barang", multiSelection:false, maxLength:10, tag:1});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Kuitansi", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]}); 			
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Unit / PP",tag:2,readOnly:true, change:[this,"doChange"]}); 		
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Mata Anggaran",tag:1,readOnly:true,change:[this,"doChange"]});         		
		this.cb_drk = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"DRK",tag:1,readOnly:true,change:[this,"doChange"]});         				
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Saldo Budget", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Uraian", maxLength:150});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai Bruto", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});		
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Disetujui Oleh",tag:2,multiSelection:false});         						
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Status Pajak",items:["NON","P21","P23","P42"], readOnly:true,tag:2,change:[this,"doChange"]});						
		this.e_npersen = new saiCB(this.pc1.childPage[0],{bound:[270,20,200,20],caption:"Persentase", tag:0, visible:false,change:[this,"doChange"]});
		this.e_ndpp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Nilai DPP", tag:0, tipeText:ttNilai, text:"0",visible:false,change:[this,"doChange"]});						
		this.e_npajak = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,11,200,20],caption:"Nilai Pajak", tag:0, tipeText:ttNilai, text:"0",visible:false,change:[this,"doChange"]});		
		this.e_netto = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai Netto", readOnly:true, tag:0, tipeText:ttNilai, text:"0"});

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag: 0,
					colTitle:["Kode Brg","Nama","Item Barang","Merk","Tipe","Spesifikasi","Jumlah","Harga","Total","ID"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[50,100,80,60,150,150,150,150,150,70]],															
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],					
					buttonStyle:[[0],[bsEllips]], 					
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],ellipsClick:[this,"doEllipsClick"],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,
					colTitle:["ID","No Tag","Item Barang","Merk","Tipe","No Seri","Harga","Kode Akun","Klp Aset","Jenis"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,80,80,200,150,150,200,120,110]],
					colFormat:[[6],[cfNilai]],
					columnReadOnly:[true,[0,2,3,4,6,7,8,9],[1,5]],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"selectPage"]});			

		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClickDok"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.sgctt = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
				colTitle:["Catatan"],
				colWidth:[[0],[100]],					
				readOnly:true,autoAppend:false,defaultRow:1});					        

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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.isiCBnik();
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							   "where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data PP",true);						
			this.cb_pp.setText(this.app._kodePP);
			this.cb_lok.setSQL("select kode_lok,nama from fa_lokasi where kode_lokasi = '"+this.app._lokasi+"'",["kode_lok","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21','PPH23','PPH42','SAPHIF')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;								
					if (line.kode_spro == "PPH23") this.akunPPH23 = line.flag;
					if (line.kode_spro == "PPH42") this.akunPPH42 = line.flag;	
					if (line.kode_spro == "SAPHIF") this.akunHutIF = line.flag;								
				}
			}	
			
			this.c_status.setText("NON");
			this.doLoadCtt(this.e_nb.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_simlog_fIFlog.extend(window.childForm);
window.app_saku3_transaksi_yakes21_simlog_fIFlog.implement({	
	isiCBpesan: function() {
		// if (this.app._lokasi == "99") var bidang = " and b.kode_bidang='"+this.app._kodeBidang+"' ";
		// else var bidang = " ";
		var bidang = "";
		this.cb_pesan.setSQL("select a.no_pesan,a.keterangan from log_pesan_m a "+
			                 "inner join log_justerima_m c on a.no_pesan=c.no_pesan "+
							 "inner join pbh_ver_m d on c.no_terima=d.no_ver and d.no_flag='-' "+
							 "inner join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi ='"+this.app._lokasi+"' "+
							 "where a.progress='2' and a.lok_proses = '"+this.app._lokasi+"' and c.jenis = 'IF' and a.periode<='"+this.e_periode.getText()+"' "+bidang,
		["no_pesan","keterangan"],false,["No Request","Deskripsi"],"and","Data Request",true);			
	},
	isiCBnik: function() {
		try {
			//utk pusat per bidang, utk area per lokasi
			if (this.app._lokasi == "99") {
				// this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
				// 				"	inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+
				// 				"	inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi  "+
				// 				"where c.kode_bidang='"+this.app._kodeBidang+"' and c.kode_lokasi='"+this.app._lokasi+"' ",
				// ["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			

				// this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
				// 				"inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
				// 				"inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
				// 				"where c.kode_pp='"+this.app._kodePP+"' and b.kode_lokasi='"+this.app._lokasi+"'",
				// ["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			


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
			else {
				// this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
				// 				"inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
				// 				"where b.kode_lokasi='"+this.app._lokasi+"' ",
				// ["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			

				this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
								"inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
								"inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
								"where c.kode_pp='"+this.app._kodePP+"' and b.kode_lokasi='"+this.app._lokasi+"'",
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

		}
		catch(e){
			alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis, nama  from pbh_dok_ver  ", 
					"select count(*) from pbh_dok_ver ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClickDok: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Kelompok Barang",sender,undefined, 
							"select kode_klpfa, nama  from fa_klp where kode_klpfa<>'-' and kode_klpakun = '"+this.cb_akun.getText()+"'",
							"select count(kode_klpfa) from fa_klp where kode_klpfa<>'-' and kode_klpakun = '"+this.cb_akun.getText()+"'",
							["kode_klpfa","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if (this.stsSimpan == 0) {																								
						sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from fa_asset where catatan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from fa_nilai where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("update log_pesan_m set progress='2',no_spph='-' where no_spph='"+this.e_nb.getText()+"'");
					}	
					
					sql.add("insert into if_aju_m(no_aju,kode_lokasi,periode,tgl_input,user_input,tanggal,tgl_kuitansi,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,sts_pajak,npajak,no_app,progress,nik_app,no_reim,no_kasopen,posted,nik_setuju, nilai_dpp,persen, nik_if,form) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','IFAJU','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+
							this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.c_status.getText()+"',"+nilaiToFloat(this.e_npajak.getText())+",'-','0','"+this.cb_app.getText()+"','-','"+this.noKasOpen+"','X','"+this.cb_app.getText()+"', "+nilaiToFloat(this.e_ndpp.getText())+","+nilaiToFloat(this.e_npersen.getText())+",'"+this.cb_if.getText()+"','IFLOG')");
					
					var nilaiHut = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_npajak.getText());
					sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'BEBAN')");					
					sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"','"+this.akunHutIF+"','"+this.cb_pp.getText()+"','-','C','"+this.e_ket.getText()+"',"+nilaiHut+",'HUTIF')");
					
					if (this.c_status.getText() != "NON") {
						if (this.c_status.getText() == "P21") {
							var akunPajak = this.akunPPH21; 
							var ket = 'PPh Psl 21 '+this.e_ket.getText();
						}
						if (this.c_status.getText() == "P23") {
							var akunPajak = this.akunPPH23;
							var ket = 'PPh Psl 23 '+this.e_ket.getText();
						}
						if (this.c_status.getText() == "P42") {
							var akunPajak = this.akunPPH42;
							var ket = 'PPh Psl 4 Ayat 2 '+this.e_ket.getText();
						}								
							sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
									"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',2,'"+this.e_periode.getText()+"','"+akunPajak+"','"+this.cb_pp.getText()+"','-','C','"+ket+"',"+nilaiToFloat(this.e_npajak.getText())+",'"+this.c_status.getText()+"')");
					}	
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','IFAJU','"+this.e_nb.getText()+"')");															
						}	
					}		



					//-------- FA ---
					sql.add("update log_pesan_m set progress='3',no_spph='"+this.e_nb.getText()+"' where no_pesan='"+this.cb_pesan.getText()+"'");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("update log_pesan_d set harga="+nilaiToFloat(this.sg.cells(6,i))+",jum_po="+nilaiToFloat(this.sg.cells(7,i))+",kode_klpfa='"+this.sg.cells(0,i)+"' where no_pesan='"+this.cb_pesan.getText()+"' and no_urut="+this.sg.cells(9,i)+" ");
							}
						}
					}	

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,no_baps,kode_lokfa,nik_pnj,no_po,id_pesan,kode_vendor,tgl_baps,kode_unit,jenis,catatan) values "+
										"('"+this.sg2.cells(1,i)+"','"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(8,i)+"','-','"+this.cb_akun.getText()+"',0,0,'"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(5,i)+"',"+nilaiToFloat(this.sg2.cells(6,i))+",1,'-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','1','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','"+this.cb_lok.getText()+"','-','"+this.cb_pesan.getText()+"','"+this.sg2.cells(0,i)+"','-','"+this.dp_d1.getDateString()+"','-','"+this.jenisBarang+"','"+this.e_nb.getText()+"')");															
								sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
										"('"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','D',"+nilaiToFloat(this.sg2.cells(6,i))+",'"+this.e_periode.getText()+"')");
							}
						}
					}					
					sql.add("update a set a.nilai_susut=round(a.nilai/c.umur,0), a.kode_klpakun=c.kode_klpakun, a.umur=c.umur, a.persen=c.persen, a.kode_pp=f.kode_pp, a.kode_drk=f.kode_drk "+
					        "from fa_asset a "+
							"		inner join fa_klp b on a.kode_klpfa=b.kode_klpfa "+
							"       inner join fa_klpakun c on a.kode_akun=c.kode_akun "+
							"		inner join log_pesan_m f on a.no_po=f.no_pesan	"+
							"where a.no_baps='"+this.e_nb.getText()+"'");

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai)  "+
							"select '"+this.e_nb.getText()+"','IFLOG',kode_lokasi,kode_akun,kode_pp,kode_drk,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"',case dc when 'C' then 'D' else 'C' end,0,nilai "+
							"from angg_r where no_bukti='"+this.cb_pesan.getText()+"' ");

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','IFLOG','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',"+nilaiToFloat(this.e_saldo.getText())+","+nilaiToFloat(this.e_nilai.getText())+")");

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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);										
					setTipeButton(tbSimpan);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.c_status.setText("NON");
					this.sg3.clear(1);
					this.doClick();
					this.isiCBnik();
					this.cb_if.setText("");
					this.cb_if.setText(this.nikIF);
					this.isiCBpesan();
				break;
			case "simpan" :									
			case "ubah" :									
				this.preView = "1";
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldoif.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Netto tidak boleh melebihi Saldo IF.");
					return false;
				}
				if (nilaiToFloat(this.e_ndpp.getText()) > nilaiToFloat(this.e_nilai.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai DPP tidak boleh melebihi Nilai Total.");
					return false;
				}
				if (nilaiToFloat(this.e_npajak.getText()) > nilaiToFloat(this.e_ndpp.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Pajak tidak boleh melebihi Nilai DPP.");
					return false;
				}

				if (this.stsGar == "1") {									
					if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
						system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi Saldo Budget.");
						return false;						
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {				
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from fa_asset where catatan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("delete from fa_nilai where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update log_pesan_m set progress='2',no_spph='-' where no_spph='"+this.e_nb.getText()+"'");
					
					//membuang historis catatan
					sql.add("delete from pbh_ver_m where no_bukti = '"+this.e_nb.getText()+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (this.stsSimpan == 1) this.doClick();		
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);this.sg.clear(1);this.sg2.clear(1);
		}		
		this.cb_drk.setSQL("select a.kode_drk, a.nama from drk a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_drk","a.nama"],false,["Kode","Nama"],"and","Data DRK",true);						
		this.isiCBpesan();
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"if_aju_m","no_aju",this.app._lokasi+"-IFA"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.cb_pesan.setFocus();
		setTipeButton(tbSimpan);
		this.stsSimpan = 1;
	},	
	doChange:function(sender){
		try {
			if (sender == this.cb_if && this.cb_if.getText()!="") {
				var strSQL = "select a.nik_app,a.no_kas,a.nilai - isnull(b.pakai,0) as saldo  "+
							"from if_nik a "+

							"		left join  ("+						
							"			 select a.nik_if,a.kode_lokasi,sum(a.nilai-a.npajak) as pakai "+
							"			 from if_aju_m a "+
							"			 left join if_reim_m b on a.no_reim=b.no_reim and a.kode_lokasi=b.kode_lokasi and b.no_kas <> '-' "+
							"			 where b.no_reim is null and a.nik_if='"+this.cb_if.getText()+"' and a.no_kasopen='"+this.noKasOpen+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju<>'"+this.e_nb.getText()+"' "+
							"			 group by a.nik_if,a.kode_lokasi "+												
							"		) b on a.nik = b.nik_if and a.kode_lokasi=b.kode_lokasi "+

							"where a.jenis='OPERASIONAL' and a.nik ='"+this.cb_if.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'";						   

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						if (this.stsSimpan == 1) {							
							//if (this.app._lokasi == "99") this.cb_app.setText(line.nik_app);
							//else this.cb_app.setText("","");
						}
						this.noKasOpen = line.no_kas;
						this.nikIF = this.cb_if.getText();
						this.e_saldoif.setText(floatToNilai(line.saldo));											
					}
				}
			}

			if (sender == this.c_status){
				if (this.c_status.getText() == "NON") {
					this.e_ndpp.setTag("9");				
					this.e_npersen.setTag("9");				
					this.e_npajak.setTag("9");	

					this.e_ndpp.setText("0");	
					this.e_npersen.setText("0");	
					this.e_npajak.setText("0");		
					this.e_netto.setText(this.e_nilai.getText());

					this.e_ndpp.hide();	
					this.e_npersen.hide();	
					this.e_npajak.hide();				
				}
				else {
					this.e_ndpp.setTag("0");				
					this.e_npajak.setTag("0");
					this.e_npersen.setText("");

					this.e_ndpp.show();	
					this.e_npersen.show();					
					this.e_npajak.show();	
									
					this.e_npersen.items.clear();
					var data = this.dbLib.getDataProvider("select tarif from yk_tarif_pajak where kode_pajak='"+this.c_status.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.e_npersen.addItem(i,floatToNilai(line.tarif));
						}
					} 
					
				}
			}
				
			if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
				var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.cb_pesan.getText()+"') as saldo ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.e_saldo.setText(floatToNilai(line.saldo));                       
				}
			}
			
			if ((sender == this.e_ndpp || sender == this.e_npersen) && this.e_ndpp.getText() != "" && this.e_npersen.getText()!= "") {
				var npajak = Math.round(nilaiToFloat(this.e_ndpp.getText()) * nilaiToFloat(this.e_npersen.getText())/100 );
				this.e_npajak.setText(floatToNilai(npajak));
			}

			if ((sender == this.e_nilai || sender == this.e_npajak) && this.e_nilai.getText() != "" && this.e_npajak.getText()!= "") {
				var nilaiHut = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_npajak.getText());
				this.e_netto.setText(floatToNilai(nilaiHut));
			}

			//--juskeb
			if (sender == this.cb_pesan && this.cb_pesan.getText()!="") {	
				var data = this.dbLib.getDataProvider("select kode_akun,kode_drk,kode_pp,jenis from log_pesan_m where no_pesan = '"+this.cb_pesan.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.cb_pp.setText(line.kode_pp);
						this.cb_akun.setText(line.kode_akun);
						this.cb_drk.setText(line.kode_drk);
						if (line.jenis == "CAPEX") this.jenisBarang = "A";
						else this.jenisBarang = "I";
					}
				}

				var sql = new server_util_arrayList();						
				sql.add("select kode_klpfa,nama from fa_klp where kode_klpakun = '"+this.cb_akun.getText()+"' union select '-','-' ");			
				this.dbLib.getMultiDataProviderA(sql);			
 
				if (this.stsSimpan == 1) {
					var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai,a.jumlah*a.nilai as total,c.jenis "+								
								"from log_pesan_d a "+
								"  	inner join log_pesan_m b on a.no_pesan=b.no_pesan "+
								" 	inner join log_justerima_m c on a.no_pesan=c.no_pesan "+						 
								"  	inner join pbh_ver_m d on c.no_terima=d.no_ver and d.no_flag='-' "+
								"where a.no_pesan = '"+this.cb_pesan.getText()+"' order by a.no_urut";							
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line2;
						this.sg.clear();
						for (var i in data.rs.rows){
							line2 = data.rs.rows[i];																		
							this.sg.appendData(["-","-",line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai),floatToNilai(line2.total),line2.no_urut]);					
						}
						this.jenis = line2.jenis;					
					} else this.sg.clear(1);
				}

			}

		}
		catch(e){
			alert(e);
		}
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != "" ){					
					tot += nilaiToFloat(this.sg.cells(8,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));									
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCell: function(sender, col, row){
		try {			
			if (col == 6 || col == 7) {
				if (this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") {				
					this.sg.cells(8,row, Math.round((nilaiToFloat(this.sg.cells(7,row))  * nilaiToFloat(this.sg.cells(6,row))) * 100)/100);
					this.sg.validasi();		
				}
			}
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {						
				if (sender.cells(0,row) != "") {								
					var klp = this.dataKlp.get(sender.cells(0,row));				
					if (klp) {
						sender.cells(1,row,klp);																	
					}
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Barang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","Cek Klp Barang");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");						
					}				
				}
			}									
			sender.onChange.set(this,"doChangeCell");		
		}catch(e)
		{
			alert(e);
		}
	},
	doDetail:function(sender){						
		this.sg2.clear();
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(0,i) != "-") {				
				
				var nuAkhir = 0;				
				//YYLLLL-ABCDEF0000; TAHUN+LOKBRG-KLP+URUT
				var formatIDMaster = this.e_periode.getText().substr(2,2)+this.cb_lok.getText()+ "-"+this.sg.cells(0,i); 
				
				var strSQL = "select isnull(max(no_fa),0) as no_fa from fa_asset where kode_lokasi='"+this.app._lokasi+"' and no_fa like '"+formatIDMaster+"____%'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						nuAkhir = parseFloat(line.no_fa.substr(line.no_fa.length-4,4));						
					}
				}					
				for (var k=0;k < this.sg2.getRowCount();k++){
					if (this.sg2.rowValid(k)){
						if (formatIDMaster == this.sg2.cells(1,k).substr(0,13)) nuAkhir = parseFloat(this.sg2.cells(1,k).substr(this.sg2.cells(1,k).length-4,4));
					}
				}				
				
				for (var j=0;j < nilaiToFloat(this.sg.cells(6,i));j++){
					var k = nuAkhir + j + 1;
					var idx = k.toString();
					if (idx.length == 1) var nu = "000"+idx;
					if (idx.length == 2) var nu = "00"+idx;
					if (idx.length == 3) var nu = "0"+idx;
					if (idx.length == 4) var nu = idx;
						
					var noTag = formatIDMaster+nu;
					this.sg2.appendData([this.cb_pesan.getText()+"/"+this.sg.cells(9,i),noTag,this.sg.cells(2,i),this.sg.cells(3,i),this.sg.cells(4,i),"-",this.sg.cells(7,i),this.cb_akun.getText(),this.sg.cells(0,i),this.jenisBarang]);
				}												
			}
		}
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}						
							if (this.preView == "1") {
								// this.nama_report="server_report_saku3_if_rptIfForm";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataKlp = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataKlp.set(line.kode_klpfa, line.nama);
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_status.setText("NON");
			this.sg3.clear(1); this.sg.clear(1); this.sg2.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
			this.doClick();
			this.isiCBnik();
			this.cb_if.setText("");
			this.cb_if.setText(this.nikIF);
			//this.isiCBpesan();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																								
		// if (this.app._lokasi == "99") var bidang = " and b.kode_bidang='"+this.app._kodeBidang+"' ";
		// else var bidang = " ";

		var bidang = " ";
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,modul,a.keterangan,a.nilai "+
		             "from if_aju_m a "+					 						 
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join (select distinct catatan from fa_asset where progress='1' and kode_lokasi='"+this.app._lokasi+"') c on a.no_aju=c.catatan "+					 
					 "where a.form = 'IFLOG' and a.posted<>'T' and a.modul='IFAJU' "+bidang+" and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') order by a.no_aju";		
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
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) {
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
				this.doLoadCtt(this.e_nb.getText());							
								
				var strSQL = "select b.no_pesan,a.keterangan,a.tgl_kuitansi,a.tanggal,a.nik_app,a.kode_akun,a.kode_pp,a.kode_drk,a.nilai,a.sts_pajak,a.npajak,a.nik_setuju, a.nilai_dpp,a.persen "+
							 "from if_aju_m a "+
							 "		inner join log_pesan_m b on a.no_aju=b.no_spph "+								 
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";														
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.tgl_kuitansi);
						this.cb_app.setText(line.nik_app);
						this.cb_akun.setText(line.kode_akun);
						this.cb_pp.setText(line.kode_pp);
						this.cb_drk.setText(line.kode_drk);
						this.c_status.setText(line.sts_pajak);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ndpp.setText(floatToNilai(line.nilai_dpp));
						this.e_npersen.setText(floatToNilai(line.persen));
						this.e_npajak.setText(floatToNilai(line.npajak));						
						this.cb_app.setText(line.nik_setuju);						
						this.doChange(this.cb_if);

						this.cb_pesan.setSQL("select a.no_pesan,a.keterangan from log_pesan_m a where a.no_pesan='"+line.no_pesan+"' ",["no_pesan","keterangan"],false,["No Request","Deskripsi"],"and","Data Request",true);			
						this.cb_pesan.setText(line.no_pesan);

					}
				}	
				
				var strSQL = "select a.kode_klpfa,e.nama as nama_klp,a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jum_po as jumlah,a.harga as nilai,a.jum_po * a.harga as total,c.jenis "+
							 "from log_pesan_d a "+
							 "  	inner join log_pesan_m b on a.no_pesan=b.no_pesan "+
							 " 		inner join log_justerima_m c on a.no_pesan=c.no_pesan "+						 
							 "  	inner join pbh_ver_m d on c.no_terima=d.no_ver and d.no_flag='-' "+		
							 "		inner join fa_klp e on a.kode_klpfa=e.kode_klpfa "+					 
							 "where a.no_pesan = '"+this.cb_pesan.getText()+"' order by a.no_urut";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];																		
						this.sg.appendData([line2.kode_klpfa,line2.nama_klp,line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai),floatToNilai(line2.total),line2.no_urut]);					
					}									
				} else this.sg.clear(1);

				var strSQL = "select * from fa_asset a where a.no_po = '"+this.cb_pesan.getText()+"' order by a.no_fa";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];	
						this.sg2.appendData([line2.id_pesan,line2.no_fa,line2.nama,line2.merk,line2.tipe,line2.no_seri,floatToNilai(line2.nilai),line2.kode_klpakun,line2.kode_klpfa,line2.jenis]);					
					}		
					this.cb_lok.setText(line2.kode_lokfa);							
				} else this.sg2.clear(1);
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);

			}									
		} catch(e) {alert(e);}
	},	
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and no_ver<>'"+this.noAppLama+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from pbh_ver_m "+
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and no_ver<>'"+this.noAppLama+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});