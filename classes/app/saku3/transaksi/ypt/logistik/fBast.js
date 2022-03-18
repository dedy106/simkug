window.app_saku3_transaksi_ypt_logistik_fBast = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_ypt_logistik_fBast.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ypt_logistik_fBast";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form BAST dan Akru Hutang", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 202, 20], caption: "Periode", tag: 2, readOnly: true, change: [this, "doChange"], visible: false });
		this.l_tgl1 = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tanggal", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"] });

		this.pc2 = new pageControl(this, { bound: [10, 10, 1000, 430], childPage: ["Data Jurnal", "List Jurnal"] });
		this.sg3 = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 33], colCount: 6, tag: 9,
			colTitle: ["No Bukti", "Tanggal", "No Dokumen", "Deskripsi", "Mitra", "Nilai"],
			colWidth: [[5, 4, 3, 2, 1, 0], [90, 200, 300, 180, 80, 100]],
			colFormat: [[5], [cfNilai]], readOnly: true,
			dblClick: [this, "doDoubleClick3"], autoAppend: false, defaultRow: 1
		});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 3, grid: this.sg3, pager: [this, "doPager3"] });
		this.bLoad3 = new portalui_imageButton(this.sgn3, { bound: [this.sgn3.width - 25, 2, 22, 22], image: "icon/" + system.getThemes() + "/reload.png", hint: "Load Data Jurnal", click: [this, "doLoad3"] });

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 202, 20], caption: "No Bukti", maxLength: 30, readOnly: true });
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0], { bound: [225, 12, 20, 20], hint: "Generate", image: "icon/" + system.getThemes() + "/tabCont2.png", click: [this, "doClick"] });
		this.cb_spk = new saiCBBL(this.pc2.childPage[0], { bound: [20, 13, 220, 20], caption: "SPK", multiSelection: false, maxLength: 10, tag: 1, change: [this, "doChange"] });
		this.e_adk = new saiLabelEdit(this.pc2.childPage[0], { bound: [790, 14, 200, 20], caption: "Nilai ADK", tag: 1, readOnly: true, tipeText: ttNilai, text: "0", change: [this, "doChange"] });
		this.cb_akun = new saiCBBL(this.pc2.childPage[0], { bound: [20, 14, 220, 20], caption: "Akun Hutang", readOnly: true, maxLength: 10, tag: 2 });
		this.e_total = new saiLabelEdit(this.pc2.childPage[0], { bound: [790, 15, 200, 20], caption: "Nilai Hutang", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 15, 450, 20], caption: "Deskripsi", maxLength: 150 });

		this.pc1 = new pageControl(this.pc2.childPage[0], { bound: [1, 12, 995, 304], childPage: ["Data SPK", "Data Penerimaan", "Data Barang","Otorisasi","File Dok"] });
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0], { bound: [20, 11, 220, 20], caption: "Mitra", readOnly: true, tag: 2 });
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 12, 450, 20], caption: "Bank", readOnly: true });
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 13, 450, 20], caption: "No Rekening", readOnly: true });
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 14, 450, 20], caption: "Nama Rekening", readOnly: true });

		this.sg2 = new saiGrid(this.pc1.childPage[1], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 8,
			colTitle: ["Status", "No Terima", "Tanggal", "Keterangan", "Kode Akun", "Kode PP", "Kode DRK", "Nilai"],
			colWidth: [[7, 6, 5, 4, 3, 2, 1, 0], [100, 80, 80, 80, 300, 80, 120, 80]],
			colFormat: [[7], [cfNilai]],
			columnReadOnly: [true, [0, 1, 2, 3, 4, 5, 6, 7], []],
			buttonStyle: [[0], [bsAuto]], picklist: [[0], [new portalui_arrayMap({ items: ["APP"] })]],
			change: [this, "doChangeCell2"], nilaiChange: [this, "doNilaiChange"],
			autoAppend: false, defaultRow: 1
		});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg2 });

		// this.sg = new saiGrid(this.pc1.childPage[2], {
		// 	bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 9, tag: 9,
		// 	colTitle: ["Kode Akun", "Nama Akun", "DC", "Keterangan", "Nilai", "Kode PP", "Nama PP", "Kode DRK", "Nama DRK"],
		// 	colWidth: [[8, 7, 6, 5, 4, 3, 2, 1, 0], [150, 80, 150, 80, 100, 270, 50, 200, 80]],
		// 	columnReadOnly: [true, [1, 6, 8], [0, 2, 3, 4, 5, 7]],
		// 	buttonStyle: [[0, 2, 5, 7], [bsEllips, bsAuto, bsEllips, bsEllips]],
		// 	colFormat: [[4], [cfNilai]], picklist: [[2], [new portalui_arrayMap({ items: ["D", "C"] })]], checkItem: true,
		// 	cellEnter: [this, "doCellEnter"], ellipsClick: [this, "doEllipsClick"], change: [this, "doChangeCell"], nilaiChange: [this, "doNilaiChange"],
		// 	autoAppend: true, defaultRow: 1
		// });
		// this.sgn = new portalui_sgNavigator(this.pc1.childPage[2], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 2, grid: this.sg });

		this.sg4 = new saiGrid(this.pc1.childPage[2], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 11,
			colTitle: ["ID", "Item Barang", "Merk", "Tipe", "Harga", "Jml SPK", "Jml Terima", "Kode Akun", "Kode Klp", "Nama Klp", "Jenis"],
			colWidth: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80, 150, 80, 80, 80, 80, 80, 150, 150, 200, 110]],
			colFormat: [[4, 5, 6], [cfNilai, cfNilai, cfNilai]],
			columnReadOnly: [true, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []],
			autoAppend: false, defaultRow: 1
		});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 2, grid: this.sg4 });

		this.cb_app = new saiCBBL(this.pc1.childPage[3], { bound: [20, 13, 220, 20], caption: "Diperiksa Oleh", multiSelection: false, maxLength: 10, tag: 1 });

		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
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
			
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, { bound: [0, 0, this.getWidth(), this.getHeight()], visible: false });
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer, "doSelectedPage", "doCloseReportClick", "doRowPerPageChange", "doPdfClick", "doXlsClick", true);
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
			this.doSelectDate(this.dp_d1, this.dp_d1.year, this.dp_d1.month, this.dp_d1.day);

			this.flagDokFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LOGADK','DOKFREE') and kode_lokasi = '" + this.app._lokasi + "'", true);
			if (typeof data == "object") {
				var line;
				for (var i in data.rs.rows) {
					line = data.rs.rows[i];
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;
					if (line.kode_spro == "LOGADK") this.akunADK = line.flag;
				}
			}

			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' " +
				"where a.block= '0' and a.kode_lokasi = '" + this.app._lokasi + "'", ["kode_akun", "nama"], false, ["Kode", "Nama"], "and", "Data Akun", true);

			this.cb_akun.setText(this.AkunHut);

			this.cb_app.setSQL("select a.nik,a.nama from karyawan a " +
				"where a.flag_aktif= '1' and a.kode_lokasi = '" + this.app._lokasi + "'", ["a.nik", "a.nama"], false, ["NIK", "Nama"], "and", "Data Karyawan", true);

			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '" + this.app._lokasi + "'");
			this.dbLib.getMultiDataProviderA(sql);

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fBast.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fBast.implement({
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
					this.standarLib.showListData(this, "Daftar Jenis Dok",sender,undefined, 
							"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
							"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
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
	isiSPK: function () {
		//belum pernah bast
		this.cb_spk.setSQL("select a.no_spk, a.keterangan "+
			"from log_spk_m a "+
			"inner join log_pesan_m c on a.no_pesan=c.no_pesan and a.kode_lokasi=c.kode_lokasi "+
			"inner join log_wenang x on c.kode_pp=x.pp_asal and c.kode_lokasi=x.kode_lokasi and c.nilai between x.awal and x.akhir and x.pp_proses='"+this.app._kodePP+"' "+ 					 			 

			"left join hutang_m b on a.no_spk=b.no_dokumen and a.kode_lokasi=b.kode_lokasi " +
			"where b.no_hutang is null and a.periode<='" + this.e_periode.getText() + "' and a.no_ba='-' and a.kode_lokasi='" + this.app._lokasi + "'"
			, ["no_spk", "keterangan"], false, ["No SPK", "Deskripsi"], "and", "Data SPK", true);
	},
	mainButtonClick: function (sender) {
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?", "form inputan ini akan dibersihkan");
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?", "data diform ini apa sudah benar.");
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?", "perubahan data diform ini akan disimpan.");
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?", "data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	},
	simpan: function () {
		try {
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0, 1, 2])) {
				try {
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from hutang_m where no_hutang = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from hutang_j where no_hutang = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("update fa_asset set progress='1',catatan='-' where catatan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("update log_pbadk_d set no_bast='-' where no_bast='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("update log_spk_m set no_ba='-' where no_ba='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				
					}
					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref) values  " +
						"('" + this.e_nb.getText() + "','" + this.app._lokasi + "','" + this.cb_spk.getText() + "','" + this.dp_d1.getDateString() + "','" + this.e_ket.getText() + "','-','" + this.cb_vendor.getText() + "','IDR',1,'" + this.cb_app.getText() + "','" + this.app._kodePP + "'," + parseNilai(this.e_total.getText()) + ",'" + this.e_periode.getText() + "','" + this.app._userLog + "',getdate(),'" + this.cb_akun.getText() + "','F',0,'LOGBAST','-')");

					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values " +
						"('" + this.e_nb.getText() + "','" + this.cb_spk.getText() + "','" + this.dp_d1.getDateString() + "',999,'" + this.cb_akun.getText() + "','" + this.e_ket.getText() + "','C','IDR',1," + parseNilai(this.e_total.getText()) + "," + parseNilai(this.e_total.getText()) + ",'" + this.app._kodePP + "','-','" + this.app._lokasi + "','LOGBAST','HUT','" + this.e_periode.getText() + "','" + this.app._userLog + "',getdate())");
					if (this.e_adk.getText() != "0") {
						sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values " +
							"('" + this.e_nb.getText() + "','" + this.cb_spk.getText() + "','" + this.dp_d1.getDateString() + "',777,'" + this.akunADK + "','" + this.e_ket.getText() + "','C','IDR',1," + parseNilai(this.e_adk.getText()) + "," + parseNilai(this.e_adk.getText()) + ",'" + this.app._kodePP + "','-','" + this.app._lokasi + "','LOGBAST','ADK','" + this.e_periode.getText() + "','" + this.app._userLog + "',getdate())");
					}

					if (this.sg2.getRowValidCount() > 0) {
						for (var i = 0; i < this.sg2.getRowCount(); i++) {
							if (this.sg2.rowValid(i) && this.sg2.cells(0, i) == "APP") {
								sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values " +
									"('" + this.e_nb.getText() + "','" + this.sg2.cells(1, i) + "','" + this.dp_d1.getDateString() + "'," + i + ",'" + this.sg2.cells(4, i) + "','" + this.sg2.cells(3, i) + "','D','IDR',1," + parseNilai(this.sg2.cells(7, i)) + "," + parseNilai(this.sg2.cells(7, i)) + ",'" + this.sg2.cells(5, i) + "','" + this.sg2.cells(6, i) + "','" + this.app._lokasi + "','LOGBAST','AKTAP','" + this.e_periode.getText() + "','" + this.app._userLog + "',getdate())");
								sql.add("update fa_asset set tgl_perolehan='" + this.dp_d1.getDateString() + "',tgl_susut='" + this.dp_d1.getDateString() + "',periode='" + this.e_periode.getText() + "',periode_susut='" + this.e_periode.getText() + "',progress='2',catatan='" + this.e_nb.getText() + "',kode_pp_susut='" + this.app._kodePP + "' where no_baps='" + this.sg2.cells(1, i) + "' and kode_lokasi='" + this.app._lokasi + "'");
							}
						}
					}
					// if (this.sg.getRowValidCount() > 0) {
					// 	for (var i = 0; i < this.sg.getRowCount(); i++) {
					// 		if (this.sg.rowValid(i)) {
					// 			sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values " +
					// 				"('" + this.e_nb.getText() + "','" + this.cb_spk.getText() + "','" + this.dp_d1.getDateString() + "'," + i + ",'" + this.sg.cells(0, i) + "','" + this.sg.cells(3, i) + "','" + this.sg.cells(2, i).toUpperCase() + "','IDR',1," + parseNilai(this.sg.cells(4, i)) + "," + parseNilai(this.sg.cells(4, i)) + ",'" + this.sg.cells(5, i) + "','" + this.sg.cells(7, i) + "','" + this.app._lokasi + "','LOGBAST','BBN','" + this.e_periode.getText() + "','" + this.app._userLog + "',getdate())");
					// 		}
					// 	}
					// }
					sql.add("update log_pbadk_d set no_bast='" + this.e_nb.getText() + "' where no_spk='" + this.cb_spk.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("update log_spk_m set no_ba='" + this.e_nb.getText() + "' where no_spk='" + this.cb_spk.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");


					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");															
						}	
					}	

					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch (e) {
					system.alert(this, e, "");
				}
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	},
	doModalResult: function (event, modalResult) {
		if (modalResult != mrOk) return false;
		switch (event) {
			case "clear":
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0", "1"), this.e_nb);
				//this.sg.clear(1); 
				this.sg3.clear(1); this.sg4.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbAllFalse);
				this.isiSPK();
				break;
			case "simpan":
			case "ubah":
				var data = this.dbLib.getDataProvider("select akun_hutang from vendor where kode_vendor='" + this.cb_vendor.getText() + "' and kode_lokasi='" + this.app._lokasi + "'", true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.AkunHut = line.akun_hutang;
					}
				}

				this.preView = "1";
				this.sg2.validasi();
				// this.sg.validasi();
				// for (var i = 0; i < this.sg.getRowCount(); i++) {
				// 	if (!this.sg.rowValid(i)) {
				// 		var isKosong = true;
				// 		for (var j = 0; j < this.sg.getColCount(); j++) {
				// 			if (this.sg.cells(j, i) != "") {
				// 				isKosong = false;
				// 				break;
				// 			}
				// 		}
				// 		if (!isKosong) {
				// 			system.alert(this, "Transaksi tidak valid.", "Terdapat kolom yang kosong.");
				// 			return false;
				// 		}
				// 	}
				// }

				for (var i = 0; i < this.sg4.getRowCount(); i++) {
					if (this.sg4.rowValid(i)) {
						var j = i + 1;
						if (nilaiToFloat(this.sg4.cells(5, i)) != nilaiToFloat(this.sg4.cells(6, i))) {
							system.alert(this, "Transaksi tidak valid.", "Jumlah Barang SPK tidak sama dengan yang diterima.(Tab Data Barang - Baris : " + j + ")");
							return false;
						}
					}
				}

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this, "Transaksi tidak valid.", "Nilai Hutang tidak boleh nol atau kurang.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())) {
					system.alert(this, "Periode transaksi tidak valid.", "Periode transaksi tidak boleh kurang dari periode aktif sistem.[" + this.app._periode + "]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
						system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.[" + this.app._periode + "]", "Data akan disimpan?");
					else {
						system.alert(this, "Periode transaksi tidak valid.", "Periode transaksi tidak boleh melebihi periode aktif sistem.[" + this.app._periode + "]");
						return false;
					}
				}
				else
					this.simpan();
				break;
			case "simpancek": this.simpan();
				break;
			case "hapus":
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())) {
					system.alert(this, "Periode transaksi tidak valid.", "Periode transaksi tidak boleh kurang dari periode aktif sistem.[" + this.app._periode + "]");
					return false;
				}
				else {
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hutang_m where no_hutang = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("delete from hutang_j where no_hutang = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("update fa_asset set progress='1',catatan='-' where catatan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("update log_pbadk_d set no_bast='-' where no_bast='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("update log_spk_m set no_ba='-' where no_ba='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				break;
		}
	},
	doSelectDate: function (sender, y, m, d) {
		if (m < 10) m = "0" + m;
		this.e_periode.setText(y + "" + m);

		if (this.stsSimpan == 1) {
			this.isiSPK();
			this.doClick();
		}
	},
	doChange: function (sender) {
		if (sender == this.e_periode && this.stsSimpan == 1) this.doClick();
		if (sender == this.cb_spk && this.cb_spk.getText() != "") {
			if (this.stsSimpan == 1) {
				var strSQL = "select b.kode_vendor,b.nama,b.bank+' - '+b.cabang as bank,b.no_rek,b.nama_rek,b.akun_hutang " +
					"from log_spk_m a " +
					"inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi " +
					"where a.no_spk='" + this.cb_spk.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.cb_vendor.setText(line.kode_vendor, line.nama);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.cb_akun.setText(line.akun_hutang);
					}
				}

				var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.kode_akun,b.kode_pp,b.kode_drk,b.total " +
					"from log_terima_m a inner join ( " +
					"		select no_baps,kode_akun,kode_pp,kode_drk,sum(nilai) as total  " +
					"		from fa_asset where catatan='-' and kode_lokasi='" + this.app._lokasi + "' group by kode_akun,kode_pp,kode_drk,no_baps) b on a.no_terima=b.no_baps " +
					"where a.no_po='" + this.cb_spk.getText() + "' ";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg2.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg2.appendData(["APP", line2.no_terima, line2.tgl, line2.keterangan, line2.kode_akun, line2.kode_pp, line2.kode_drk, floatToNilai(line2.total)]);
					}
				} else this.sg2.clear(1);

				var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as adk " +
					"from log_pbadk_d  " +
					"where no_spk='" + this.cb_spk.getText() + "' and kode_lokasi='" + this.app._lokasi + "' and no_bast='-'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_adk.setText(floatToNilai(line.adk));
					}
					else this.e_adk.setText("0");
				}
				else this.e_adk.setText("0");
			}

			var strSQL = "select a.no_spk+'-'+cast(a.no_urut as varchar) as id,a.item,a.merk,a.tipe,a.harga+a.ppn as harga,a.jumlah,isnull(d.jml_terima,0) as jum_terima,b.kode_akun,c.kode_klpfa,c.nama as nama_klpfa,c.jenis " +
				"from log_spk_d a inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
				"                 inner join fa_klp c on a.kode_klpfa = c.kode_klpfa and a.kode_lokasi=c.kode_lokasi  " +
				"                 left join  (select id_pesan,no_po,count(no_fa) as jml_terima from fa_asset " +
				"							   where no_po='" + this.cb_spk.getText() + "' and kode_lokasi='" + this.app._lokasi + "' " +
				"							   group by id_pesan,no_po) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk " +
				"where a.no_spk='" + this.cb_spk.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
				"order by a.item";
			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line2;
				this.sg4.clear();
				for (var i in data.rs.rows) {
					line2 = data.rs.rows[i];
					this.sg4.appendData([line2.id, line2.item, line2.merk, line2.tipe, floatToNilai(line2.harga), floatToNilai(line2.jumlah), floatToNilai(line2.jum_terima), line2.kode_akun, line2.kode_klpfa, line2.nama_klpfa, line2.jenis]);
				}
			} else this.sg4.clear(1);

		}
		if (sender == this.e_adk && this.e_adk.getText() != "") this.sg2.validasi(); //this.sg.validasi();
	},
	doClick: function (sender) {
		if (this.e_periode.getText() != "") {
			if (this.stsSimpan == 0) {
				//this.sg.clear(1); 
				this.sg2.clear(1); this.sg3.clear(1);
				this.isiSPK();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "hutang_m", "no_hutang", this.app._lokasi + "-BA" + this.e_periode.getText().substr(2, 4) + ".", "0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
	},
	doChangeCell2: function (sender, col, row) {
		try {
			if (col == 0) this.sg2.validasi(); // this.sg.validasi();
		} catch (e) {
			alert(e);
		}
	},
	// doChangeCell: function (sender, col, row) {
	// 	if ((col == 2 || col == 4) && (this.sg.cells(4, row) != "")) this.sg.validasi();
	// 	sender.onChange.set(undefined, undefined);
	// 	if (col == 0) {
	// 		if (this.sg.cells(0, row) != "") {
	// 			var akun = this.dataAkun.get(sender.cells(0, row));
	// 			if (akun) sender.cells(1, row, akun);
	// 			else {
	// 				if (trim(sender.cells(0, row)) != "") system.alert(this, "Kode Akun " + sender.cells(0, row) + " tidak ditemukan", "Inputkan kode lainnya.", "checkAkun");
	// 				sender.cells(0, row, "");
	// 				sender.cells(1, row, "");
	// 			}
	// 		}
	// 	}
	// 	if (col == 5) {
	// 		if (this.sg.cells(5, row) != "") {
	// 			var pp = this.dataPP.get(sender.cells(5, row));
	// 			if (pp) sender.cells(6, row, pp);
	// 			else {
	// 				if (trim(sender.cells(5, row)) != "") system.alert(this, "Kode PP " + sender.cells(5, row) + " tidak ditemukan", "Inputkan kode lainnya.", "checkPP");
	// 				sender.cells(5, row, "");
	// 				sender.cells(6, row, "");
	// 			}
	// 		}
	// 	}
	// 	if (col == 7) {
	// 		if (sender.cells(7, row) != "") {
	// 			var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '" + this.e_periode.getText().substr(0, 4) + "%' and b.kode_akun='" + sender.cells(0, row) + "' and b.kode_pp = '" + sender.cells(5, row) + "' and b.kode_drk = '" + sender.cells(7, row) + "' and a.kode_lokasi='" + this.app._lokasi + "'", true);
	// 			if (typeof data == "object") {
	// 				var line = data.rs.rows[0];
	// 				if (line != undefined) this.sg.cells(8, row, line.nama);
	// 				else {
	// 					this.sg.cells(7, row, "-");
	// 					this.sg.cells(8, row, "-");
	// 				}
	// 			}
	// 		}
	// 	}
	// 	sender.onChange.set(this, "doChangeCell");
	// },
	doNilaiChange: function () {
		try {
			var tot = 0;
			// for (var i = 0; i < this.sg.rows.getLength(); i++) {
			// 	if (this.sg.rowValid(i) && this.sg.cells(4, i) != "") {
			// 		if (this.sg.cells(2, i).toUpperCase() == "D") tot += nilaiToFloat(this.sg.cells(4, i));
			// 		if (this.sg.cells(2, i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg.cells(4, i));
			// 	}
			// }

			for (var i = 0; i < this.sg2.rows.getLength(); i++) {
				if (this.sg2.rowValid(i) && this.sg2.cells(0, i) == "APP") {
					tot += nilaiToFloat(this.sg2.cells(7, i));
				}
			}
			tot = tot - nilaiToFloat(this.e_adk.getText());
			this.e_total.setText(floatToNilai(tot));
		} catch (e) {
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:" + e);
		}
	},
	// doCellEnter: function (sender, col, row) {
	// 	switch (col) {
	// 		case 2:
	// 			if (this.sg.cells(2, row) == "") {
	// 				this.sg.setCell(2, row, "D");
	// 			}
	// 			break;
	// 		case 3:
	// 			if (this.sg.cells(3, row) == "") {
	// 				if (row == 0) this.sg.setCell(3, row, this.e_ket.getText());
	// 				else this.sg.setCell(3, row, this.sg.cells(3, (row - 1)));
	// 			}
	// 			break;
	// 		case 5:
	// 			if (this.sg.cells(5, row) == "") {
	// 				if (row == 0) this.sg.setCell(5, row, this.cb_pp.getText());
	// 				else {
	// 					this.sg.setCell(5, row, this.sg.cells(5, (row - 1)));
	// 					this.sg.setCell(6, row, this.sg.cells(6, (row - 1)));
	// 				}
	// 			}
	// 			break;
	// 	}
	// },
	// doEllipsClick: function (sender, col, row) {
	// 	try {
	// 		if (sender == this.sg) {
	// 			if (col == 0) {
	// 				this.standarLib.showListData(this, "Daftar Akun", sender, undefined,
	// 					"select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '" + this.app._lokasi + "'",
	// 					"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '" + this.app._lokasi + "'",
	// 					["a.kode_akun", "a.nama"], "and", ["Kode", "Nama"], false);
	// 			}
	// 			if (col == 5) {
	// 				this.standarLib.showListData(this, "Daftar PP/Unit", sender, undefined,
	// 					"select kode_pp, nama  from pp where kode_lokasi = '" + this.app._lokasi + "' and tipe='posting' and flag_aktif ='1'",
	// 					"select count(kode_pp) from pp where kode_lokasi = '" + this.app._lokasi + "' and tipe='posting' and flag_aktif ='1'",
	// 					["kode_pp", "nama"], "and", ["Kode", "Nama"], false);
	// 			}
	// 			if (col == 7) {
	// 				var vUnion = "";
	// 				var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='" + sender.cells(0, row) + "' and kode_lokasi='" + this.app._lokasi + "'", true);
	// 				if (typeof data == "object") {
	// 					var line = data.rs.rows[0];
	// 					if (line != undefined) {
	// 						if (line.status_gar != "1") var vUnion = " union select '-','-' ";
	// 					}
	// 				}
	// 				this.standarLib.showListData(this, "Daftar DRK", sender, undefined,
	// 					"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '" + this.e_periode.getText().substr(0, 4) + "%' and b.kode_akun='" + sender.cells(0, row) + "' and b.kode_pp = '" + sender.cells(5, row) + "' and a.kode_lokasi='" + this.app._lokasi + "' " + vUnion,
	// 					"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '" + this.e_periode.getText().substr(0, 4) + "%' and b.kode_akun='" + sender.cells(0, row) + "' and b.kode_pp = '" + sender.cells(5, row) + "' and a.kode_lokasi='" + this.app._lokasi + "' ",
	// 					["a.kode_drk", "a.nama"], "and", ["Kode DRK", "Nama DRK"], false);
	// 			}
	// 		}
	// 	} catch (e) {
	// 		systemAPI.alert(e);
	// 	}
	// },
	doRequestReady: function (sender, methodName, result) {
		if (sender == this.dbLib) {
			try {
				switch (methodName) {
					case "execArraySQL":
						if (result.toLowerCase().search("error") == -1) {
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							if (this.preView == "1") {								
								this.nama_report = "server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_hutang='" + this.e_nb.getText() + "' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
						} else system.info(this, result, "");
						break;
					case "getMultiDataProvider":
						eval("result = " + result + ";");
						if (typeof result != "string") {
							this.dataAkun = new portalui_arrayMap();
							if (result.result[0]) {
								var line;
								for (var i in result.result[0].rs.rows) {
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
								}
							}
						} else throw result;
						break;
				}
			}
			catch (e) {
				systemAPI.alert("step : " + step + "; error = " + e);
			}
		}
	},
	doCloseReportClick: function (sender) {
		switch (sender.getName()) {
			case "PreviewBtn":
				window.open(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
				break;
			case "PrintBtn":
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
				try {
					window.frames[this.viewer.getFullId() + "_iframe"].focus();
					window.frames[this.viewer.getFullId() + "_iframe"].print();
				} catch (e) { alert(e); }
				break;
			default:
				this.pc2.show();
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);
				this.clearLayar();
				break;
		}
	},
	clearLayar: function () {
		try {
			this.standarLib.clearByTag(this, new Array("0", "1"), this.e_nb);
			//this.sg.clear(1); 
			this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.isiSPK();
		} catch (e) {
			alert(e);
		}
	},
	doLoad3: function (sender) {
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.kode_vendor+' - '+b.nama as vendor,a.nilai " +
			"from hutang_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi " +

			"                left join (" +
			"						select distinct kode_lokasi,no_hutang " +
			"						from yk_pb_m where kode_lokasi='" + this.app._lokasi + "' " +
			"				   ) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi " +

			"where c.no_hutang is null and a.periode='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' and a.posted ='F' and a.modul='LOGBAST'";

		var data = this.dbLib.getDataProvider(strSQL, true);
		if (typeof data == "object" && data.rs.rows[0] != undefined) {
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length / 20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);
	},
	doTampilData3: function (page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length ? this.dataJU3.rs.rows.length : start + 20);
		for (var i = start; i < finish; i++) {
			line = this.dataJU3.rs.rows[i];
			this.sg3.appendData([line.no_hutang, line.tgl, line.no_dokumen, line.keterangan, line.vendor, floatToNilai(line.nilai)]);
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function (sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function (sender, col, row) {
		try {
			if (this.sg3.cells(0, row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg3.cells(0, row));

				var strSQL = "select keterangan,no_dokumen,tanggal,kode_vendor,akun_hutang,kode_pp,nik_app " +
					"from hutang_m " +
					"where no_hutang = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.dp_d1.setText(line.tanggal);
						this.cb_spk.setSQL("select no_spk, keterangan from log_spk_m where no_spk='" + line.no_dokumen + "' and kode_lokasi='" + this.app._lokasi + "'", ["no_spk", "keterangan"], false, ["No SPK", "Deskripsi"], "and", "Data SPK", true);
						this.cb_spk.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.akun_hutang);
						this.cb_app.setText(line.nik_app);
					}
				}

				var strSQL = "select b.kode_vendor,b.nama,b.bank+' - '+b.cabang as bank,b.no_rek,b.nama_rek " +
					"from log_spk_m a " +
					"inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi " +
					"where a.no_spk='" + this.cb_spk.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.cb_vendor.setText(line.kode_vendor, line.nama);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
					}
				}

				var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as adk " +
					"from log_pbadk_d  " +
					"where no_bast='" + this.e_nb.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_adk.setText(floatToNilai(line.adk));
					}
					else this.e_adk.setText("0");
				}
				else this.e_adk.setText("0");

				var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.kode_akun,b.kode_pp,b.kode_drk,b.total " +
					"from log_terima_m a inner join ( " +
					"		select no_baps,kode_akun,kode_pp,kode_drk,sum(nilai) as total  " +
					"		from fa_asset where catatan='" + this.e_nb.getText() + "' group by kode_akun,kode_pp,kode_drk,no_baps) b on a.no_terima=b.no_baps " +
					"where a.no_po='" + this.cb_spk.getText() + "' ";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg2.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg2.appendData(["APP", line2.no_terima, line2.tgl, line2.keterangan, line2.kode_akun, line2.kode_pp, line2.kode_drk, floatToNilai(line2.total)]);
					}
				} else this.sg2.clear(1);

				// var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk " +
				// 	"from hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi " +
				// 	"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi " +
				// 	"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun " +
				// 	"where a.jenis = 'BBN' and a.no_hutang = '" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' order by a.no_urut", true);
				// if (typeof data == "object" && data.rs.rows[0] != undefined) {
				// 	var line;
				// 	this.sg.clear();
				// 	for (var i in data.rs.rows) {
				// 		line = data.rs.rows[i];
				// 		this.sg.appendData([line.kode_akun, line.nama_akun, line.dc, line.keterangan, floatToNilai(line.nilai), line.kode_pp, line.nama_pp, line.kode_drk, line.nama_drk]);
				// 	}
				// } else this.sg.clear(1);


				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from log_pesan_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_pesan = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);


			}
		} catch (e) { alert(e); }
	}
});