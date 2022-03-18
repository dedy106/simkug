window.app_saku3_transaksi_yakes21_spj_fPDAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_spj_fPDAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_spj_fPDAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan SPPD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data SPPD","List SPPD"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Jenis","No Dokumen","Deskripsi","Nilai","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,100,300,100,80,70,100]],
					colFormat:[[5,6],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});										
		this.e_nilaiut = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Maksud/Tujuan", maxLength:150});				
		this.e_nilaiuh = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Nilai U. Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_dasar = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Dasar Perj. Dinas", maxLength:150});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,305], childPage:["Data SPPD","Data Transport","Uang Harian","Otorisasi","File Dok","Cattn. Apprv"]});
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Pendanaan", readOnly:true,tag:2,change:[this,"doChange"]});				
		this.cb_if = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[270,10,220,20],caption:"Pemegang IF",tag:2,readOnly:true,multiSelection:false,change:[this,"doChange"],visible:false}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Kegiatan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]}); 		
		this.e_saldoif = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,13,200,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0", readOnly:true,visible:false});

		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"PP / Unit", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Mata Anggaran", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});								
		this.cb_drk = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});								
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Saldo Budget", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Tempat", maxLength:50,tag:2});										
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"NIK SPPD", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});						
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,350,20],caption:"Nama SPPD / Band", maxLength:50, readOnly:true});							
		this.e_band = new saiLabelEdit(this.pc1.childPage[0],{bound:[375,17,95,20], labelWidth:0, readOnly:true});											
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Bank", maxLength:50});							
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"No Rekening", maxLength:50});									
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Nama Rekening", maxLength:50});							
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,160,160,170,70,80,60]],
					columnReadOnly:[true,[0,1,2,3,4,5,8],[6,7]],
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,200,80]],
					columnReadOnly:[true,[0,1,4,7,2,3],[5,6]],
					colFormat:[[2,3,4,5,6,7],[cfDate,cfDate,cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2,3],[bsEllips,bsDate,bsDate]], 					
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});					
		
		this.cb_app = new saiCBBL(this.pc1.childPage[3],{bound:[20,15,220,20],caption:"Budget Approval", multiSelection:false, maxLength:10, tag:2});						
		this.cb_fiat = new saiCBBL(this.pc1.childPage[3],{bound:[20,18,220,20],caption:"NIK Fiatur", multiSelection:false, maxLength:10, tag:2});										
		this.cb_pemberi = new saiCBBL(this.pc1.childPage[3],{bound:[20,16,220,20],caption:"Pemberi Perintah", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});										
		this.e_jab = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,450,20],caption:"Jabatan", maxLength:50,tag:2});										
		
		this.cb_ttdperintah = new saiCBBL(this.pc1.childPage[3],{bound:[20,16,220,20],caption:"TTD Srt Perintah", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});										
		this.e_jabperintah = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,450,20],caption:"Jabatan", maxLength:50,tag:2});										
		
		this.cb_atas1 = new saiCBBL(this.pc1.childPage[3],{bound:[20,18,220,20],caption:"NIK Atasan 1", multiSelection:false, readOnly:true, tag:2,change:[this,"doChange"]});								
		this.e_jabatas1 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,450,20],caption:"Jabatan", maxLength:50,tag:2});							
		this.cb_atas2 = new saiCBBL(this.pc1.childPage[3],{bound:[20,18,220,20],caption:"NIK Atasan 2", multiSelection:false, readOnly:true, tag:2,change:[this,"doChange"]});								
		this.e_jabatas2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,450,20],caption:"Jabatan", maxLength:50,tag:2});							
		
		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[4],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.sgctt = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
				colTitle:["Catatan"],
				colWidth:[[0],[100]],					
				readOnly:true,autoAppend:false,defaultRow:1});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);
		
				
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

			
			this.c_jenis.items.clear();
			if (this.app._lokasi == "99") {
				this.c_jenis.addItem(0,"PUSAT");
			 this.c_jenis.setText("PUSAT");	
			}
			else {
				this.c_jenis.addItem(0,"IFUND");
				this.c_jenis.addItem(1,"PUSAT");
			 this.c_jenis.setText("IFUND");	
			}

			this.c_jenis.addItem(0,"IFUND");
			this.c_jenis.addItem(1,"PUSAT");
			this.c_jenis.setText("");

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
									
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='"+this.app._kodeBidang+"' "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);									
			this.cb_pemberi.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_ttdperintah.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							   
			
			this.cb_fiat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <>'00' where b.kode_bidang='2' and a.flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						        "where b.kode_flag = '030' and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun SPPD",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('HUTSPPD','SAPHIF')",true);	
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																				
					if (line.kode_spro == "SAPHIF")  this.akunHutIF = line.flag;
					if (line.kode_spro == "HUTSPPD")  this.akunBMHD = line.flag;							
				}
			}

			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='NIKMBDH' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];			
				this.cb_fiat.setText(line.flag);
			}

			if (this.app._lokasi == "99" ) {
				var data = this.dbLib.getDataProvider("select a.nik_bidang,a.jabatan,b.nama from bidang a inner join karyawan b on a.nik_bidang=b.nik where a.kode_bidang ='"+this.app._kodeBidang+"'",true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];			
					this.nikBidang= line.nik_bidang;																								
					this.cb_pemberi.setText(line.nik_bidang);																
				}
			}	

			this.cb_app.setText(this.app._userLog);
			this.cb_pp.setText(this.app._kodePP);
								
			this.doLoadCtt(this.e_nb.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_spj_fPDAju.extend(window.childForm);
window.app_saku3_transaksi_yakes21_spj_fPDAju.implement({
	isiCBnik: function() {
		try {
			//utk pusat per bidang, utk area per lokasi
			if (this.app._lokasi == "99") {
				this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
								"	inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+
								"	inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi  "+
								"where c.kode_bidang='"+this.app._kodeBidang+"' and c.kode_lokasi='"+this.app._lokasi+"' ",
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
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},			
	doLoadNIK: function(sender) {	
		var data2 = this.dbLib.getDataProvider("select nik_app,nik_app2 from pdss_role_nik where nik='"+this.cb_nik.getText()+"'",true);
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			var line2 = data2.rs.rows[0];							
			
			this.jenisApp1 = line2.nik_app.toUpperCase();
			
			if (this.jenisApp1.toUpperCase() != "LOS") {
				this.cb_atas1.setBtnVisible(false);
				this.cb_atas2.setBtnVisible(false);
				
				if (this.jenisApp1.toUpperCase() == "BID") {		
					this.cb_atas1.setBtnVisible(true);					
					this.cb_atas1.setSQL("select nik, nama from karyawan where nik ='"+this.nikBidang+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);								
					if (this.app._kodeBidang == "1") this.cb_atas1.setText(this.nikBidang);					
				}
				else {
					if (this.jenisApp1.toUpperCase() == "MAN") {
						this.cb_atas1.setBtnVisible(true);
						this.cb_atas1.setSQL("select nik, nama from karyawan where jabatan like 'man%' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);				
					}				
					else {
						this.cb_atas1.setSQL("select '-' as nik, '-' as nama",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",false);			
						this.cb_atas1.setBtnVisible(false);
						this.cb_atas1.setText(line2.nik_app);
					}
				}
				this.cb_atas2.setText(line2.nik_app2);
			
				var data2 = this.dbLib.getDataProvider("select nik2 from pdss_poh_nik where nik='"+this.cb_atas1.getText()+"' and flag_aktif='1' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas1.setText(line2.nik2);
				}	
			
				var data2 = this.dbLib.getDataProvider("select nik2 from pdss_poh_nik where nik='"+this.cb_atas2.getText()+"' and flag_aktif='1' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas2.setText(line2.nik2);
				}
		
				var data2 = this.dbLib.getDataProvider("select nik,nama,jabatan from karyawan where nik='"+this.cb_atas1.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas1.setText(line2.nik,line2.nama);
					this.e_jabatas1.setText(line2.jabatan);
				} else this.e_jabatas1.setText("-");	
		
				var data2 = this.dbLib.getDataProvider("select nik,nama,jabatan from karyawan where nik='"+this.cb_atas2.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas2.setText(line2.nik,line2.nama);
					this.e_jabatas2.setText(line2.jabatan);
				
				} else this.e_jabatas2.setText("");	
			}
			else {
				this.cb_atas1.setBtnVisible(true);
				this.cb_atas1.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
				
				this.cb_atas2.setBtnVisible(true);
				this.cb_atas2.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
				
			}
			
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

					//-------------------  koreksi data sebelumnya ---------------------
					if (this.stsSimpan == 0) {								
						sql.add("delete from pdss_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from yk_spj_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from yk_spj_dt where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from yk_spj_dh where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						//utk yg loncat ke atasan2
						sql.add("delete from pdss_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																							
						sql.add("delete from app_m where modul = 'SPPD' and no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from app_d where modul = 'SPPD' and no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from yk_spj_app where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						

						//kalo pake dana if
						sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						//kalo pake dana pusat
						sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from hutang_bayar where no_bayar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}													
					
					var vProg = "0";
					sql.add("insert into pdss_aju_m (no_aju,kode_lokasi,periode,nik_user,tgl_input,progress,no_app1,no_app2,no_app3,tanggal,no_dokumen,keterangan,tgl_awal,tgl_akhir,kode_bidang,tempat,nik,nama,kode_pp,nik_app,jabatan,nik_app2,jabatan2) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+vProg+"','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+
							"','"+this.dp_d2.getDateString()+"','"+this.app._kodeBidang+"','"+this.e_tempat.getText()+"','"+this.cb_nik.getText()+"','"+this.e_nama.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_atas1.getText()+"','"+this.e_jabatas1.getText()+"','"+this.cb_atas2.getText()+"','"+this.e_jabatas2.getText()+"')");
					
					//-----------utk yg nik app1 nya = '-', langsung loncat ke app2
					if (this.cb_atas1.getText() == "-") {
						var vProg = "M";
						sql.add("update pdss_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nb.getText()+"' and no_flag='-' and form='APPATS' and modul='PDSS' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into pdss_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vProg+"','PDSS','APPATS','"+this.e_nb.getText()+"','-','-')");
						sql.add("update pdss_aju_m set no_app1='"+this.e_nb.getText()+"',progress='"+vProg+"' where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					//----------------- insert ke surat penerbitan ------------- 
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'APPROVE','SPPD','-')");										
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','APPROVE','SPPD','"+this.e_nb.getText()+"','"+this.app._lokasi+"','-')");
					sql.add("insert into yk_spj_app(no_app,kode_lokasi,maksud,dasar,nik_app,jabatan,no_dokumen,no_ver,no_spb,progress,periode,tanggal) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.e_dasar.getText()+"','"+this.cb_pemberi.getText()+
							"','"+this.e_jab.getText()+"','"+this.e_dok.getText()+"','-','-','"+vProg+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"')");					
					
					//------------------------------------  data sppd -------------------------------------					
					//rincian transport		
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into yk_spj_dt(no_spj,kode_lokasi,no_urut,kode_trans,asal,tujuan,kode_jenis,nilai,jumlah,tarif) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(6,i))+")");
							}
						}
					}

					//rincian uang harian
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into yk_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,persen,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+")");
							}
						}
					}

					//-----------------------------------  jurnal data realisasi -------------------------
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','PDAJU','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',"+parseNilai(this.e_saldo.getText())+","+nilaiToFloat(this.e_total.getText())+")");
					
					sql.add("insert into yk_spj_m(no_spj,kode_lokasi,kode_loktuj,kode_bidangtuj,modul,periode,tanggal,due_date,kode_pp,no_dokumen,keterangan,tempat,nik_buat,nama_spj, "+
							"		nik_app,nik_perintah,jabatan,akun_uhar,akun_tran,transport,harian,tgl_input,nik_user,kode_drk, band,nik_bdh,form,bank,no_rek,nama_rek) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._kodeBidang+"','PD21','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_pp.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.e_tempat.getText()+"','"+this.cb_nik.getText()+"','"+this.e_nama.getText()+
							"','"+this.cb_app.getText()+"','"+this.cb_ttdperintah.getText()+"','"+this.e_jabperintah.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_akun.getText()+"',"+nilaiToFloat(this.e_nilaiut.getText())+","+nilaiToFloat(this.e_nilaiuh.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_drk.getText()+"','"+this.e_band.getText()+
							"','"+this.cb_fiat.getText()+"','"+this.c_jenis.getText()+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"')");						
																								
					if (this.c_jenis.getText() == "IFUND") {	
						//---progress = 'X' ,menjadi '0' mennggu form approval dr atasan 1-2 -- (0--> approve kpa)												
						sql.add("insert into if_aju_m(no_aju,kode_lokasi,periode,tgl_input,user_input,tanggal,tgl_kuitansi,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,sts_pajak,npajak,no_app,progress,nik_app,no_reim,no_kasopen,posted,nik_setuju, nilai_dpp,persen, nik_if,form) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','IFAJU','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+
								this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'NON',0,'-','X','"+this.cb_app.getText()+"','-','"+this.noKasOpen+"','X','"+this.cb_app.getText()+"', "+nilaiToFloat(this.e_total.getText())+",0,'"+this.cb_if.getText()+"','SPJ')");
						
						sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
								"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'BEBAN')");					
						sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
								"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"','"+this.akunHutIF+"','"+this.cb_pp.getText()+"','-','C','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'HUTIF')");
					}
					else {						

						sql.add("insert into hutang_m (no_hutang, kode_lokasi, no_dokumen, tanggal, keterangan, kode_vendor, kode_curr, kurs, nik_app, kode_pp, nilai, periode, nik_user, tgl_input, akun_hutang, posted, nilai_ppn, modul, no_ref, dc) values "+
								"('"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '-', '"+this.dp_d1.getDateString()+"', '"+this.e_ket.getText()+"', '"+this.cb_nik.getText()+"', 'IDR', 1, '"+this.cb_app.getText()+"', '"+this.cb_pp.getText()+"', "+parseNilai(this.e_total.getText())+", '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '"+this.akunBMHD+"', 'X', 0, 'PBSPJ', '"+this.e_nb.getText()+"','D')")
						
						sql.add("insert into hutang_j (no_hutang, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input) values "+
								"('"+this.e_nb.getText()+"', '-', '"+this.dp_d1.getDateString()+"', 0, '"+this.cb_akun.getText()+"', '"+this.e_ket.getText()+"', 'D', 'IDR', 1, "+nilaiToFloat(this.e_total.getText())+", "+nilaiToFloat(this.e_total.getText())+", '"+this.cb_pp.getText()+"', '"+this.cb_drk.getText()+"', '"+this.app._lokasi+"', 'PBSPJ', 'BEBAN', '"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
						sql.add("insert into hutang_j (no_hutang, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input) values "+
								"('"+this.e_nb.getText()+"', '-', '"+this.dp_d1.getDateString()+"', 1, '"+this.akunBMHD+"', '"+this.e_ket.getText()+"', 'C', 'IDR', 1, "+nilaiToFloat(this.e_total.getText())+", "+nilaiToFloat(this.e_total.getText())+", '"+this.cb_pp.getText()+"', '-', '"+this.app._lokasi+"', 'PBSPJ', 'BMHD', '"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");

						//---progress = 'X' ,menjadi '0' mennggu form approval dr atasan 1-2 -- (0--> approve kpa)												
						sql.add("insert into hutang_bayar (no_bayar,no_hutang,kode_lokasi,akun_hutang,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor,sts_pajak,pajak) values  "+
								"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.akunBMHD+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','PBSPJ','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",'D','-','-',0)");		

						sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas) values  "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'PBSPJ','X','"+this.cb_pp.getText()+"','"+this.cb_app.getText()+"','"+this.cb_nik.getText()+"','"+this.e_nb.getText()+"','-','-','"+this.akunBMHD+"','-','NONBT','-','-')");
						sql.add("insert into pbh_rek(kode_vendor,nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
								"('"+this.cb_nik.getText()+"',1,'"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBSPJ','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_nama.getText()+"',"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+")");
						sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunBMHD+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PBSPJ','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");																
					}

					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','SPJ','"+this.e_nb.getText()+"')");	
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
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);										
					setTipeButton(tbAllFalse);						
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";						
				this.sg.validasi();																				
				this.sg2.validasi();																				
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Transportasi.");
							return false;
						}
					}					
				}						
				for (var i=0;i < this.sg2.getRowCount();i++){					
					if (!this.sg2.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg2.getColCount();j++){
							if (this.sg2.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Uang Harian.");
							return false;
						}
					}					
				}											
				if (this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){							
							var strSQL = "select a.no_spj from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj where a.no_spj <> '"+this.e_nb.getText()+"' and b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' and a.tgl_mulai between '"+this.sg2.getCellDateValue(2,i)+"' and '"+this.sg2.getCellDateValue(3,i)+"' "+
										 "union "+
										 "select a.no_spj from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj where a.no_spj <> '"+this.e_nb.getText()+"' and b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' and a.tgl_selesai between '"+this.sg2.getCellDateValue(2,i)+"' and '"+this.sg2.getCellDateValue(3,i)+"' ";
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined){		
									system.alert(this,"Transaksi tidak valid.","NIK + Nama sudah dibuat SPJ untuk tanggal '"+this.sg2.cells(2,i)+"' dan '"+this.sg2.cells(3,i)+"' ");
									return false;						
								} 
							}
							
							var strSQL = "select max(a.no_spj) as no_spj "+
										 "from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj "+
										 "where a.no_spj <> '"+this.e_nb.getText()+"' and "+
										 "b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' and '"+this.sg2.getCellDateValue(2,i)+"' between ( "+
										 "select MAX(a.tgl_mulai) "+
										 "from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj "+
										 "where a.no_spj <> '"+this.e_nb.getText()+"' and "+
										 "b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' "+
										 ") "+
										 "and "+
										 "( "+
										 "select MAX(a.tgl_selesai) "+
										 "from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj "+
										 "where a.no_spj <> '"+this.e_nb.getText()+"' and "+
										 "b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' "+
										 ") ";
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined && line.no_spj != "-"){		
									system.alert(this,"Transaksi tidak valid.","NIK + Nama sudah dibuat SPJ untuk tanggal '"+this.sg2.cells(2,i)+"' dan '"+this.sg2.cells(3,i)+"' ("+line.no_spj+")");
									return false;						
								} 
							}
								
							var d = new Date();
							var d1 = d.strToDate(this.sg2.cells(2,i));
							var d2 = d.strToDate(this.sg2.cells(3,i));
							if (d1 > d2) {							
								var k = i+1;
								system.alert(this,"Tanggal tidak valid.","Tanggal berangkat harus lebih awal dari tanggal tiba. (Baris: "+k+")");
								return false;
							}							
						}
					}
				}
				if (this.cb_akun.getText().substr(0,1) != "2") {
					if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
						system.alert(this,"Transaksi tidak valid.","Total SPPD tidak boleh melebihi saldo anggaran.");
						return false;						
					}
				}
				if (this.c_jenis.getText() == "IFUND" && nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldoif.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total SPPD melebihi Saldo IF.");
					return false;						
				}				
				if (this.stsGar == "1") {									
					if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
						system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi Saldo Budget.");
						return false;						
					}
				}			
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total SPPD tidak boleh nol atau kurang dari nol.");
					return false;						
				}				
				else this.simpan();				
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();				
				
				sql.add("delete from pdss_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from yk_spj_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from yk_spj_dt where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from yk_spj_dh where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				
				//utk yg loncat ke atasan2
				sql.add("delete from pdss_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																							
				sql.add("delete from app_m where modul = 'SPPD' and no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from app_d where modul = 'SPPD' and no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
				sql.add("delete from yk_spj_app where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						

				//kalo pake dana if
				sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				//kalo pake dana pusat
				sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from hutang_bayar where no_bayar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		
		if (this.stsSimpan == 1) this.doClick();		
	},
	doChange:function(sender){ 
		try {
			if (sender == this.c_jenis && this.c_jenis.getText()!="") {				
				if (this.c_jenis.getText()=="PUSAT") {
					this.cb_if.hide(); this.e_saldoif.hide();
					this.cb_if.setTag("9"); this.e_saldoif.setTag("9");
				}
				else {
					this.isiCBnik();
					this.cb_if.show(); this.e_saldoif.show();
					this.cb_if.setTag("2"); this.e_saldoif.setTag("1");
				}
			}

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

							"where a.jenis='OPERASIONAL' and a.no_kas='"+this.noKasOpen+"' and a.nik ='"+this.cb_if.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'";						   

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
			
			if (sender == this.e_nilaiut || this.e_nilaiuh) {
				if (this.e_nilaiut.getText()!="" && this.e_nilaiuh.getText()!="") {
					this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilaiut.getText()) + nilaiToFloat(this.e_nilaiuh.getText())));
				}
			}		
			if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();								
			if (sender == this.cb_nik && this.stsSimpan ==1) {
				this.sg2.clear(1);			
				if (this.cb_nik.getText() != "") {				
					
					if (this.cb_nik.getText().substr(0,5) == "99999" || this.cb_nik.getText().substr(0,1) == "L" || this.cb_nik.getText().substr(0,1) == "M") this.e_nama.setReadOnly(false);
					else this.e_nama.setReadOnly(true);

					if (this.stsSimpan == 1) {
						var data2 = this.dbLib.getDataProvider("select nama,grade,bank,no_rek,nama_rek from karyawan where nik='"+this.cb_nik.getText()+"'",true);
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2 = data2.rs.rows[0];							
							this.kodegrade = line2.grade;
							this.e_band.setText(line2.grade);
							this.e_nama.setText(line2.nama);

							this.e_bank.setText(line2.bank);
							this.e_norek.setText(line2.no_rek);
							this.e_namarek.setText(line2.nama_rek);
						} 
						else {
							this.kodegrade = ""; 
							this.e_band.setText("");
							this.e_nama.setText("");
							this.e_norek.setText("");
						}
									
						this.doLoadNIK();
					}
				}
			}
			if (sender == this.cb_pemberi && this.cb_pemberi.getText() != "" && this.stsSimpan == 1) {			
				var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_pemberi.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.e_jab.setText(line2.jabatan);
				} else this.e_jab.setText("");				
			}
			
			if (sender == this.cb_ttdperintah && this.cb_ttdperintah.getText() != "" && this.stsSimpan == 1) {			
				var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttdperintah.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.e_jabperintah.setText(line2.jabatan);
				} else this.e_jabperintah.setText("");				
			}

			if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="" && this.stsSimpan==1) {
				var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.stsGar = line.status_gar;
					} 
				}
				if (this.stsGar == "1") this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.modul='RELEASE'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);							
				else this.cb_drk.setSQL("select '-' as kode_drk, '-' as nama ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);							
			}

			if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
				var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as saldo ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.e_saldo.setText(floatToNilai(line.saldo));                       
				}
			}

			if (sender == this.cb_atas1 && this.cb_atas1.getText() != "" && this.stsSimpan == 1 &&  (this.cb_nik.getText().substr(0,5) == "99999" || this.cb_nik.getText().substr(0,1) == "L" || this.cb_nik.getText().substr(0,1) == "M")  ) {			
				var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_atas1.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.e_jabatas1.setText(line2.jabatan);
				} else this.e_jabatas1.setText("");				
			}

			if (sender == this.cb_atas2 && this.cb_atas2.getText() != "" && this.stsSimpan == 1 &&  (this.cb_nik.getText().substr(0,5) == "99999" || this.cb_nik.getText().substr(0,1) == "L" || this.cb_nik.getText().substr(0,1) == "M")  ) {			
				var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_atas2.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.e_jabatas2.setText(line2.jabatan);
				} else this.e_jabatas2.setText("");				
			}


		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {								
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);					
				}								
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_spj_m","no_spj",this.app._lokasi+"-PD"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();				
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},		
	doChangeCell: function(sender, col, row) {
		if (col == 0 && this.sg.cells(0,row) != "") {			
			this.sg.cells(2,row,"");
			this.sg.cells(3,row,"");
			this.sg.cells(4,row,"");				
			this.sg.cells(5,row,"");				
			this.sg.cells(6,row,"0");
			this.sg.cells(7,row,"0");
			this.sg.cells(8,row,"0");
		}
		if (col == 2 && this.sg.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider("select nilai,asal,tujuan from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and kode_trans='"+this.sg.cells(2,row)+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																			
				this.sg.cells(4,row,line.asal);
				this.sg.cells(5,row,line.tujuan);				
				this.sg.cells(6,row,floatToNilai(line.nilai));
				this.sg.cells(7,row,"1");				
				this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));				
				this.sg.cells(3,row,line.nama);
			}
			this.sg.validasi();
		}
		if (col == 7 || col == 6 ) {
				if (this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));
				this.sg.validasi();
		}
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(8,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(8,i));			
				}
			}
			this.e_nilaiut.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Jenis Angkutan",this.sg, this.sg.row, this.sg.col, 
													"select kode_jenis,nama from yk_spj_jenis",
													"select count(kode_jenis) from yk_spj_jenis",
														new Array("kode_jenis","nama"),"where",new Array("Kode","Jenis"),false);					
					break;					
				case 2 :
						this.standarLib.showListDataForSG(this, "Daftar Rute",this.sg, this.sg.row, this.sg.col, 
													"select kode_trans, nama from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and flag_aktif='1' ",
													"select count(kode_trans) from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and flag_aktif='1' ",
														new Array("kode_trans","nama"),"and",new Array("Kode","Nama"),false);					
					break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},			
	doEllipsClick2: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Jenis SPPD",this.sg2, this.sg2.row, this.sg2.col, 
													"select sts_spj, nama  from yk_status_spj ",
													"select count(sts_spj) from yk_status_spj ",									
						new Array("sts_spj","nama"),"where",new Array("Kode","Jenis"),false);					
				break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	doChangeCell2: function(sender, col, row) {
		if (col == 2 || col == 3 || col == 0) {
			if (col == 0) {
				var data = this.dbLib.getDataProvider("select nilai from yk_spj_harian where kode_band = '"+this.kodegrade+"' and sts_spj = '"+this.sg2.cells(0,row)+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.nilai_uh = parseFloat(line.nilai);
						this.sg2.setCell(6,row,"100");
					}
				}
			}
			if (this.sg2.cells(2,row)=="" || this.sg2.cells(3,row)=="") this.sg2.cells(4,row,"0");
			else {				
				var d = new Date();
				var d1 =  d.strToDate(this.sg2.cells(2, row));
				var d2 = d.strToDate(this.sg2.cells(3, row));
				var jumlah = d2.DateDiff(d1) + 1;
				if (parseFloat(jumlah) > 0) this.sg2.cells(4,row,floatToNilai(jumlah));
				else this.sg2.cells(4,row,"0");				
			}
		}		
		if (col == 4 && this.sg2.cells(4,row)!="") {
			this.sg2.setCell(5,row,floatToNilai(this.nilai_uh));
			this.sg2.setCell(7,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(6,row))/100 )));
		}
		if (col == 5 || col == 6 ) {
			if (this.sg2.cells(5,row)!="" && this.sg2.cells(6,row)!="") {
				this.sg2.setCell(7,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(6,row))/100 )));
			}
		}
		this.sg2.validasi();
	},	
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(7,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(7,i));			
				}
			}
			this.e_nilaiuh.setText(floatToNilai(tot));
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
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}	

							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_spj_rptSpjForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);						
			this.pc1.setActivePage(this.pc1.childPage[0]);																		
			setTipeButton(tbAllFalse);					
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		// if (this.app._userStatus == "A") var bidang = ""; 
		// else var bidang = " b.kode_bidang = '"+this.app._kodeBidang+"' and "; 		

		var strSQL = "select a.no_spj,convert(varchar,a.tanggal,103) as tgl,form,a.no_dokumen,a.keterangan,a.transport+a.harian as nilai "+
					 "from yk_spj_m a "+						 					 
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+							 
					 "inner join pdss_aju_m c on a.no_spj=c.no_aju "+
					 "where c.nik_user ='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PD21' and c.progress in ('0','A','B','V','R') "; 						 
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
			this.sg3.appendData([line.no_spj,line.tgl,line.form,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
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
				this.doLoadCtt(this.e_nb.getText());
												
				var strSQL = "select a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_perintah,a.nik_app,a.akun_uhar,a.kode_pp,a.kode_drk,a.nik_buat,a.jabatan,a.nama_spj,a.tempat,a.band,a.nik_bdh,"+				             
				             "a.transport+a.harian as total, c.dasar, c.nik_app as nik_tahu, c.jabatan as jab_tahu,a.form,a.bank,a.no_rek,a.nama_rek "+
							 "from yk_spj_m a "+
							 "		inner join yk_spj_app c on a.no_spj=c.no_app and a.kode_lokasi=c.kode_lokasi "+							
							 "where a.modul='PD21' and a.no_spj = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";	

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.c_jenis.setText(line.form);
																
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						
						this.cb_app.setText(line.nik_app);
						this.cb_fiat.setText(line.nik_bdh);						

						this.cb_pemberi.setText(line.nik_tahu);												
						this.e_jab.setText(line.jab_tahu);

						this.cb_ttdperintah.setText(line.nik_perintah);												
						this.e_jabperintah.setText(line.jabatan);

						this.cb_pp.setText(line.kode_pp);
						this.cb_akun.setText(line.akun_uhar);
						this.cb_drk.setText(line.kode_drk);
						this.cb_nik.setText(line.nik_buat);
						
						this.e_band.setText(line.band);
						this.e_nama.setText(line.nama_spj);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.e_tempat.setText(line.tempat);
						this.e_dasar.setText(line.dasar);
												
					}
				}								
				var strSQL = "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
							 "from yk_spj_dt a inner join yk_spj_jenis b on a.kode_jenis=b.kode_jenis  "+
							 "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){				
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_jenis,line.nama_jenis,line.kode_trans,line.nama,line.asal,line.tujuan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();		
				
				var strSQL = "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.persen,a.nilai "+
							 "from yk_spj_dh a inner join yk_status_spj b on a.sts_spj=b.sts_spj "+
							 "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.persen),floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);
				this.sg2.validasi();
								
				var strSQL = "select a.*,isnull(c.catatan,'-') as cat1,isnull(d.catatan,'-') as cat2 "+
				             "from pdss_aju_m a  "+		
				             "     left join pdss_app_m c on a.no_app1=c.no_app "+		
				             "     left join pdss_app_m d on a.no_app2=d.no_app "+					 
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																
						this.cb_atas1.setText(line.nik_app);		
						this.e_jabatas1.setText(line.jabatan);
						
						this.cb_atas2.setText(line.nik_app2);		
						this.e_jabatas2.setText(line.jabatan2);	
								
					}
				}
				
				var data2 = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.cb_atas1.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas1.setText(line2.nik,line2.nama);
				}
				var data2 = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.cb_atas2.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas2.setText(line2.nik,line2.nama);
				}
				
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
						 "union "+
						 "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pdss_app_m "+
						 "where no_bukti='"+kode+"' and no_app<>'"+this.noAppLama+"' "+

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
								  "union all "+
								  "select catatan,no_app as no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from pdss_app_m "+
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and no_app<>'"+this.noAppLama+"' "+
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