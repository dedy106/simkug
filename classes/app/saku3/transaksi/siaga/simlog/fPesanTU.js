window.app_saku3_transaksi_siaga_simlog_fPesanTU = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_siaga_simlog_fPesanTU.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siaga_simlog_fPesanTU";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form Purchase Request", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 202, 20], caption: "Periode", tag: 2, readOnly: true, visible: false, change: [this, "doChange"] });
		this.l_tgl1 = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tanggal", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"], date: new Date().getDateStr() });

		this.pc2 = new pageControl(this, { bound: [10, 10, 1000, 440], childPage: ["Data Request", "List Request"] });
		this.sg3 = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 33], colCount: 6, tag: 9,
			colTitle: ["No Request", "Tanggal", "Jenis", "No Dokumen", "Deskripsi", "Nilai"],
			colWidth: [[5, 4, 3, 2, 1, 0], [100, 410, 180, 80, 80, 100]], colFormat: [[5], [cfNilai]], readOnly: true,
			dblClick: [this, "doDoubleClick3"], autoAppend: false, defaultRow: 1
		});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 3, grid: this.sg3, pager: [this, "doPager3"] });
		this.bLoad3 = new portalui_imageButton(this.sgn3, { bound: [this.sgn3.width - 25, 2, 22, 22], image: "icon/" + system.getThemes() + "/reload.png", hint: "Load Data Jurnal", click: [this, "doLoad3"] });

		this.c_jenis = new saiCB(this.pc2.childPage[0], { bound: [20, 22, 202, 20], caption: "Jenis", items: ["CAPEX", "OPEX"], readOnly: true, tag: 2, change: [this, "doChange"] });
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 202, 20], caption: "No Request", maxLength: 30, readOnly: true });
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0], { bound: [225, 12, 20, 20], hint: "Generate", image: "icon/" + system.getThemes() + "/tabCont2.png", click: [this, "doClick"] });

		this.pc1 = new pageControl(this.pc2.childPage[0], { bound: [1, 20, 995, 360], childPage: ["Anggaran", "Detail", "Maksud-Tujuan", "Aspek Strategis", "Otorisasi"] });
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 16, 450, 20], caption: "No Dokumen", maxLength: 50 });
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 17, 450, 20], caption: "Deskripsi", maxLength: 150 });
		this.cb_ppaju = new saiCBBL(this.pc1.childPage[0], { bound: [20, 13, 220, 20], caption: "PP Pengaju", multiSelection: false, maxLength: 10, tag: 2 });
		this.cb_proyek = new saiCBBL(this.pc1.childPage[0], { bound: [20, 14, 220, 20], caption: "Proyek", multiSelection: false, maxLength: 10, tag: 2 });
		this.cb_app = new saiCBBL(this.pc1.childPage[0], { bound: [20, 17, 220, 20], caption: "Approve Budget", multiSelection: false, maxLength: 10, tag: 2 });
		this.cb_akun = new saiCBBL(this.pc1.childPage[0], { bound: [20, 14, 220, 20], caption: "Mata Anggaran", multiSelection: false, maxLength: 10, tag: 2, change: [this, "doChange"] });
		this.e_gar = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 16, 200, 20], caption: "Sisa Anggaran", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });
		this.c_curr = new saiCB(this.pc1.childPage[0], { bound: [20, 20, 155, 20], caption: "Mt Uang - Kurs", readOnly: true, tag: 2, change: [this, "doChange"] });
		this.e_kurs = new saiLabelEdit(this.pc1.childPage[0], { bound: [180, 20, 40, 20], caption: "Kurs", tag: 1, labelWidth: 0, tipeText: ttNilai, readOnly: true, text: "1", change: [this, "doChange"] });
		this.e_totalCurr = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 18, 200, 20], caption: "Total Curr", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });
		this.e_total = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 17, 200, 20], caption: "Total IDR", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });
		//this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		//this.uploader = new uploader(this.pc1.childPage[0],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[0], { bound: [580, 15, 80, 18], caption: "Lihat File", click: [this, "doLihat"], visible: false });
		this.e_catatan = new saiMemo(this.pc1.childPage[0], { bound: [20, 13, 450, 60], caption: "Catatan Approve", tag: 9, visible: false });

		this.sgUpld = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 13, this.pc1.width - 5, this.pc1.height - 160], colCount: 3,
			colTitle: ["Path File", "Upload", "DownLoad"],
			colWidth: [[2, 1, 0], [80, 100, 480]],
			//colHide: [[0, 1], [true, true]],
			columnReadOnly: [true, [0, 1, 2], []],
			colFormat: [[1, 2], [cfUpload, cfButton]],
			//buttonStyle: [[0], [bsEllips]],
			click: [this, "doSgBtnClick"], colAlign: [[2], [alCenter]],
			readOnly: true, change: [this, "doGridChange"], rowCount: 1, tag: 9
		});
		this.sgUpld.setUploadParam([1], "uploadTo", "server/media/", "object", "server/media/");
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 1, grid: this.sgUpld });

		this.sgFile = new saiGrid(this.pc1.childPage[0], {
			bound: [40, 50, 300, 100], colCount: 2, tag: 9, visible: false,
			colTitle: ["namaFile", "status"],
			colWidth: [[1, 0], [80, 180]],
			readOnly: true, autoAppend: false, defaultRow: 1
		});

		this.sg = new saiGrid(this.pc1.childPage[1], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 7,
			colTitle: ["Item Barang", "Merk", "Tipe", "Spesifikasi", "Jumlah", "Hrg Curr", "Total Curr"],
			colWidth: [[6, 5, 4, 3, 2, 1, 0], [80, 80, 60, 180, 180, 180, 180]],
			colFormat: [[4, 5, 6], [cfNilai, cfNilai, cfNilai]],
			columnReadOnly: [true, [6], [0, 1, 2, 3, 4, 5]],
			change: [this, "doChangeCell"], nilaiChange: [this, "doNilaiChange"],
			autoAppend: true, defaultRow: 1
		});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 2, grid: this.sg });

		this.mDesk1 = new tinymceCtrl(this.pc1.childPage[2], { bound: [1, 5, 990, 343], withForm: false });
		this.mDesk2 = new tinymceCtrl(this.pc1.childPage[3], { bound: [1, 5, 990, 343], withForm: false });


		this.cb_ttd1 = new saiCBBL(this.pc1.childPage[4], { bound: [20, 17, 220, 20], caption: "Direncanakan Oleh", multiSelection: false, maxLength: 10, tag: 2, change: [this, "doChangeJab"] });
		this.c_jabttd1 = new saiCB(this.pc1.childPage[4], { bound: [700, 17, 220, 20], caption: "Jabatan", readOnly: true, tag: 0 });
		this.cb_ttd2 = new saiCBBL(this.pc1.childPage[4], { bound: [20, 18, 220, 20], caption: "Diperiksa Oleh", multiSelection: false, maxLength: 10, tag: 2, change: [this, "doChangeJab"] });
		this.c_jabttd2 = new saiCB(this.pc1.childPage[4], { bound: [700, 18, 220, 20], caption: "Jabatan", readOnly: true, tag: 0 });
		this.cb_ttd3 = new saiCBBL(this.pc1.childPage[4], { bound: [20, 19, 220, 20], caption: "Disetujui Oleh", multiSelection: false, maxLength: 10, tag: 2, change: [this, "doChangeJab"] });
		this.c_jabttd3 = new saiCB(this.pc1.childPage[4], { bound: [700, 19, 220, 20], caption: "Jabatan", readOnly: true, tag: 0 });


		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, { bound: [0, 0, this.getWidth(), this.getHeight()], visible: false });
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer, "doSelectedPage", "doCloseReportClick", "doRowPerPageChange", "doPdfClick", "doXlsClick", true);
		this.report = new server_report_report();
		this.report.addListener(this);

		setTipeButton(tbSimpan);
		this.maximize();
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1, this.dp_d1.year, this.dp_d1.month, this.dp_d1.day);

			this.c_jabttd1.items.clear();
			this.c_jabttd2.items.clear();
			this.c_jabttd3.items.clear();
			var data = this.dbLib.getDataProvider("select nama from kug_jab where kode_lokasi='" + this.app._lokasi + "'", true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line;
				for (var i in data.rs.rows) {
					line = data.rs.rows[i];
					this.c_jabttd1.addItem(i, line.nama);
					this.c_jabttd2.addItem(i, line.nama);
					this.c_jabttd3.addItem(i, line.nama);
				}
			}

			this.flagGarFree = "0"; this.flagDokFree = "0"; this.minCapex = 0;
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('MINCAPEX','GARFREE','DOKFREE') and kode_lokasi = '" + this.app._lokasi + "'", true);
			if (typeof data == "object") {
				var line;
				for (var i in data.rs.rows) {
					line = data.rs.rows[i];
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;
					if (line.kode_spro == "MINCAPEX") this.minCapex = parseFloat(line.value1);
				}
			}

			//this.cb_ppaju.setSQL("select distinct a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP Pengaju",true);
			this.cb_ppaju.setSQL("select a.kode_pp, a.nama from pp a where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["kode_pp", "nama"], false, ["Kode", "Nama"], "and", "Data PP Pengaju", true);
			this.cb_ppaju.setText(this.app._kodePP);

			this.cb_proyek.setSQL("select kode_proyek,nama from log_proyek where flag_aktif='1' and kode_lokasi='" + this.app._lokasi + "'", ["kode_proyek", "nama"], false, ["Kode", "Nama"], "and", "Data Proyek", true);

			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='" + this.app._kodeBidang + "' " +
				"where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);

			this.cb_ttd1.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);
			this.cb_ttd2.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);
			this.cb_ttd3.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);

			this.c_jenis.setText("CAPEX");

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";

			this.e_catatan.setReadOnly(true);

			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr", true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line;
				for (var i in data.rs.rows) {
					line = data.rs.rows[i];
					this.c_curr.addItem(i, line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fPesanTU.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fPesanTU.implement({
	doChangeJab: function (sender) {
		if (this.stsSimpan == 1) {
			if (sender == this.cb_ttd1 && this.cb_ttd1.getText() != "") {
				var strSQL = "select b.nama from karyawan a inner join kug_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.nik='" + this.cb_ttd1.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.c_jabttd1.setText(line.nama);
					}
				}
			}
			if (sender == this.cb_ttd2 && this.cb_ttd2.getText() != "") {
				var strSQL = "select b.nama from karyawan a inner join kug_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.nik='" + this.cb_ttd2.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.c_jabttd2.setText(line.nama);
					}
				}
			}
			if (sender == this.cb_ttd3 && this.cb_ttd3.getText() != "") {
				var strSQL = "select b.nama from karyawan a inner join kug_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.nik='" + this.cb_ttd3.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.c_jabttd3.setText(line.nama);
					}
				}
			}
		}
	},
	doSgBtnClick: function (sender, col, row) {
		try {
			if (col === 2)
				window.open("server/media/" + this.sgUpld.getCell(0, row));
		} catch (e) {
			alert(e);
		}
	},
	doGridChange: function (sender, col, row, param1, result, data) {
		try {
			if (sender == this.sgUpld && col == 1) {
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles += ";";
				this.uploadedFiles += this.rootDir + "/" + this.sgUpld.columns.get(1).param2 + data.tmpfile;
				this.sgUpld.cells(0, row, data.tmpfile);
				this.sgUpld.cells(2, row, "DownLoad");
			}
		} catch (e) {
			alert(e + " " + data);
		}
	},
	/*doEllipsClickDok: function (sender, col, row) {
		try {
			if (sender == this.sgUpld) {
				if (col == 0) {
					this.standarLib.showListData(this, "Daftar Jenis Dok", sender, undefined,
						"select kode_jenis, nama  from dok_jenis where kode_lokasi='" + this.app._lokasi + "' ",
						"select count(*) from dok_jenis where kode_lokasi='" + this.app._lokasi + "' ",
						["kode_jenis", "nama"], "and", ["Kode", "Nama"], false);
				}
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	},*/
	// doLihat: function (sender) {
	// 	try {
	// 		if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/" + this.e_file.getText());
	// 	} catch (e) {
	// 		alert(e);
	// 	}
	// },
	// doAfterLoad: function (sender, result, data, filename) {
	// 	try {
	// 		if (result) this.e_file.setText(data.filedest);
	// 		this.dataUpload = data;
	// 		if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
	// 		else this.dataUpload.temporary = "";
	// 		this.dataUpload.temporary += this.rootDir + "/" + this.uploader.param2 + this.dataUpload.tmpfile;
	// 	} catch (e) {
	// 		alert(e);
	// 	}
	// },
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
						sql.add("delete from log_pesan_m where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_pesan_d where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from angg_r where no_bukti='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					}

					sql.add("insert into log_pesan_m(no_pesan,kode_lokasi,tgl_input,nik_user,periode,jenis,tanggal,no_dokumen,keterangan,kode_pp,kode_drk,kode_akun,saldo_gar,nilai,nik_buat,nik_app,kode_dana,no_app,progress,maksud,aspek,no_terima,no_spph,lok_proses,kode_ppaju, kode_curr,kurs,nilai_curr,nik_ttd1,nik_ttd2,nik_ttd3, jab_ttd1,jab_ttd2,jab_ttd3,kode_proyek) values " +
						"('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + this.c_jenis.getText() + "','" + this.dp_d1.getDateString() + "','" + this.e_dok.getText() + "','" + this.e_ket.getText() + "','" + this.cb_ppaju.getText() + "','-','" + this.cb_akun.getText() + "'," + nilaiToFloat(this.e_gar.getText()) + "," + nilaiToFloat(this.e_total.getText()) + ",'" + this.app._userLog + "','" + this.cb_app.getText() + "','-','-','0','" + urlencode(this.mDesk1.getCode()) + "','" + urlencode(this.mDesk2.getCode()) + "','-','-','" + this.app._lokasi + "','" + this.cb_ppaju.getText() + "',  '" + this.c_curr.getText() + "'," + nilaiToFloat(this.e_kurs.getText()) + "," + nilaiToFloat(this.e_totalCurr.getText()) + ",'" + this.cb_ttd1.getText() + "','" + this.cb_ttd2.getText() + "','" + this.cb_ttd3.getText() + "','" + this.c_jabttd1.getText() + "','" + this.c_jabttd2.getText() + "','" + this.c_jabttd3.getText() + "','" + this.cb_proyek.getText() + "')");

					if (this.sg.getRowValidCount() > 0) {
						for (var i = 0; i < this.sg.getRowCount(); i++) {
							if (this.sg.rowValid(i)) {
								sql.add("insert into log_pesan_d(no_pesan,kode_lokasi,no_urut,item,merk,tipe,catatan,jumlah,nilai,harga,no_po,no_ba,kode_dana,jum_po,kode_klpfa,ppn) values " +
									"('" + this.e_nb.getText() + "','" + this.app._lokasi + "'," + i + ",'" + this.sg.cells(0, i) + "','" + this.sg.cells(1, i) + "','" + this.sg.cells(2, i) + "','" + this.sg.cells(3, i) + "'," + nilaiToFloat(this.sg.cells(4, i)) + "," + nilaiToFloat(this.sg.cells(5, i)) + ",0,'-','-','-',0,'-',0)");
							}
						}
					}
					//sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi) values('" + this.e_nb.getText() + "','" + this.e_file.getText() + "',0,'PESAN','" + this.app._lokasi + "')");
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values " +
						"('" + this.e_nb.getText() + "','LOGREQ','" + this.app._lokasi + "','" + this.cb_akun.getText() + "','-','-','" + this.e_periode.getText() + "','" + this.e_periode.getText() + "','D'," + nilaiToFloat(this.e_gar.getText()) + "," + nilaiToFloat(this.e_total.getText()) + ")");

					//dokumen						
					var ix = 0;
					for (var i = 0; i < this.sgUpld.getRowCount(); i++) {
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2, i) != "-") {
							for (var j = 0; j < this.sgFile.getRowCount(); j++) {
								if (this.sgUpld.cells(0, i) == this.sgFile.cells(0, j)) {
									this.sgFile.cells(1, j, "PAKAI");
								}
							}
							sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi)values('" + this.e_nb.getText() + "','" + this.sgUpld.cells(1, i).tmpfile + "','" + ix + "','-','" + this.app._lokasi + "')");
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
					this.standarLib.clearByTag(this, new Array("0", "1", "9"), this.e_nb);
				this.sg.clear(1);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbSimpan);
				this.bLihat.hide();
				this.stsSimpan = 1;
				if (this.stsSimpan == 1) this.doClick();
				this.e_catatan.hide();
				break;
			case "simpan":
			case "ubah":
				this.preView = "1";

				if (this.stsSimpan == 1) {
					if (this.flagDokFree == "1") {
						var data = this.dbLib.getDataProvider("select no_pesan from log_pesan_m where no_dokumen='" + this.e_dok.getText() + "' and kode_lokasi='" + this.app._lokasi + "'", true);
						if (typeof data == "object") {
							var line = data.rs.rows[0];
							if (line != undefined) {
								system.alert(this, "No Dokumen sudah terpakai.", "Terpakai di No Request : " + line.no_pesan);
								return false;
							}
						}
					}
				}

				/*
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){							
						if ( (nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.e_kurs.getText())) < this.minCapex && (this.c_jenis.getText() == "CAPEX" || this.cb_akun.getText().substr(0,1) == "1")) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Harga kurang dari "+floatToNilai(this.minCapex)+" memakai anggaran OPEX.(Baris : "+k+")");
							return false;						
						}
					}
				}
				*/

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.doHitungGar();

				/*
				if (nilaiToFloat(this.e_gar.getText()) < nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total melebihi saldo anggaran.");
					return false;						
				}		
				*/
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this, "Transaksi tidak valid.", "Total tidak boleh nol atau kurang.");
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

				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from log_pesan_m where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from log_pesan_d where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from angg_r where no_bukti='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);

				break;
		}
	},
	doSelectDate: function (sender, y, m, d) {
		if (m < 10) m = "0" + m;
		if (parseFloat(this.app._periode.substr(4, 2)) <= 12) this.e_periode.setText(y + "" + m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y + "" + m);
		}
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick: function (sender) {
		if (this.stsSimpan == 0) {
			this.sg.clear(1); this.sg3.clear(1);
			this.e_nilai.setText("0");
			this.bLihat.hide();
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "log_pesan_m", "no_pesan", this.app._lokasi + "-PR" + this.e_periode.getText().substr(2, 4) + ".", "0000"));
		this.e_dok.setFocus();

	},
	doChangeCell: function (sender, col, row) {
		if (col == 4 || col == 5) {
			if (this.sg.cells(4, row) != "" && this.sg.cells(5, row) != "") {
				
				var subttl = Math.round( (nilaiToFloat(this.sg.cells(4, row)) * nilaiToFloat(this.sg.cells(5, row))) * 100 ) / 100;
				
				this.sg.cells(6, row, subttl);
				this.sg.validasi();
			}
		}
	},
	doNilaiChange: function () {
		try {
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength(); i++) {
				if (this.sg.rowValid(i) && this.sg.cells(6, i) != "") {
					tot += nilaiToFloat(this.sg.cells(6, i));
				}
			}
			this.e_totalCurr.setText(floatToNilai(tot));
			this.e_total.setText(floatToNilai(   Math.round(tot * nilaiToFloat(this.e_kurs.getText()))    ));
		} catch (e) {
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:" + e);
		}
	},
	doChange: function (sender) {
		if (sender == this.c_jenis) {
			this.cb_akun.setText("", "");
			this.e_gar.setText("0");

			/*
			if (this.c_jenis.getText() == "CAPEX") 
				this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '038' "+			                        
									"where a.modul='A' and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			else this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '038' "+
									 "where a.modul<>'A' and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			*/

			if (this.c_jenis.getText() == "CAPEX")
				this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a " +
					"inner join fa_klpakun b on a.kode_akun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi " +
					"where a.kode_lokasi='" + this.app._lokasi + "' and a.modul='A'", ["kode_akun", "nama"], false, ["Kode", "Nama"], "and", "Data Akun", true);
			else
				this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a " +
					"inner join fa_klpakun b on a.kode_akun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi " +
					"where a.kode_lokasi='" + this.app._lokasi + "' and a.modul<>'A'", ["kode_akun", "nama"], false, ["Kode", "Nama"], "and", "Data Akun", true);
		}

		if (sender == this.cb_akun || sender == this.e_periode) {
			this.e_gar.setText("0");
			this.doHitungGar();
		}

		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.validasi();
			}
			else {
				var strSQL = "select kurs from gr_kurs where kode_curr ='" + this.c_curr.getText() + "' and ('" + this.dp_d1.getDateString() + "' between tgl_awal and tgl_akhir) ";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));
					else this.e_kurs.setText("0");
				}
				this.e_kurs.setReadOnly(false);
				this.sg.validasi();
			}
		}
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}

	},
	doHitungGar: function () {
		if (this.cb_akun.getText() != "" && this.e_periode.getText() != "") {
			var sisa = 0;
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg7('" + this.app._lokasi + "','" + this.cb_akun.getText() + "','" + this.e_periode.getText() + "') as gar ", true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg8('" + this.app._lokasi + "','" + this.cb_akun.getText() + "','" + this.e_periode.getText() + "','" + this.e_nb.getText() + "') as gar ", true);

			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sisa = parseFloat(data[0]) - parseFloat(data[1]);
				this.e_gar.setText(floatToNilai(sisa));
			}
		}
	},
	doRequestReady: function (sender, methodName, result) {
		if (sender == this.dbLib) {
			try {
				switch (methodName) {
					case "execArraySQL":
						if (result.toLowerCase().search("error") == -1) {
							for (var i = 0; i < this.sgFile.getRowCount(); i++) {
								if (this.sgFile.cells(1, i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir + "/server/media/" + this.sgFile.cells(0, i));
								}
							}
							
							if (this.preView == "1") {								
								this.nama_report = "server_report_saku3_siaga_simlog_rptPesan";
								this.filter2 = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_pesan='" + this.e_nb.getText() + "' ";
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
								system.info(this, "Transaksi telah sukses tereksekusi (No Request : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						} else system.info(this, result, "");
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
			this.standarLib.clearByTag(this, new Array("0", "1", "9"), this.e_nb);
			this.sg.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_jenis.setText("CAPEX");
			setTipeButton(tbSimpan);
			this.bLihat.hide();
			this.e_catatan.hide();
			this.stsSimpan = 1;
		} catch (e) {
			alert(e);
		}
	},
	doLoad3: function (sender) {
		var strSQL = "select no_pesan,convert(varchar,tanggal,103) as tgl,jenis,no_dokumen,keterangan,nilai " +
			"from log_pesan_m  " +
			"where periode='" + this.e_periode.getText() + "' and kode_lokasi='" + this.app._lokasi + "' and progress in ('0','R','L') order by no_pesan";
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
			this.sg3.appendData([line.no_pesan, line.tgl, line.jenis, line.no_dokumen, line.keterangan, floatToNilai(line.nilai)]);
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
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbUbahHapus);
				this.bLihat.show();
				this.e_catatan.show();
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg3.cells(0, row));

				var strSQL = "select a.*, case when a.no_terima ='-' then isnull(c.catatan,'-') else isnull(d.catatan,'-') end  as catatan " +
					"from log_pesan_m a " +
					"	left join app_d c on c.no_app=a.no_app and a.kode_lokasi=c.kode_lokasi and c.modul ='LOGREQ_APP' " +
					"	left join app_d d on d.no_app=a.no_terima and a.kode_lokasi=d.kode_lokasi and d.modul ='LOGREQ_TRM' " +
					"where a.no_pesan = '" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.c_jenis.setText(line.jenis);
						this.cb_proyek.setText(line.kode_proyek);
						this.cb_ppaju.setText(line.kode_ppaju);
						this.cb_akun.setText(line.kode_akun);
						this.cb_app.setText(line.nik_app);

						this.cb_ttd1.setText(line.nik_ttd1);
						this.cb_ttd2.setText(line.nik_ttd2);
						this.cb_ttd3.setText(line.nik_ttd3);
						this.c_jabttd1.setText(line.jab_ttd1);
						this.c_jabttd2.setText(line.jab_ttd2);
						this.c_jabttd3.setText(line.jab_ttd3);

						this.c_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.mDesk1.setCode(urldecode(line.maksud));
						this.mDesk2.setCode(urldecode(line.aspek));
						//this.e_file.setText(line.no_gambar);
						//this.fileBfr = line.no_gambar;

						this.e_catatan.setText(line.catatan);
					}
				}

				this.sgUpld.clear(); this.sgFile.clear();
				var data = this.dbLib.getDataProvider(
					"select kode_jenis,no_gambar " +
					"from log_pesan_dok " +
					"where no_pesan = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "' order by nu", true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line;
					for (var i in data.rs.rows) {
						line = data.rs.rows[i];
						this.sgFile.appendData([line.no_gambar, "HAPUS"]);
						this.sgUpld.appendData([line.no_gambar, { filedest: line.no_gambar, tmpfile: line.no_gambar }, "DownLoad"]);
					}
				} else this.sgUpld.clear(1);

				var strSQL = "select no_urut,item,merk,tipe,catatan,jumlah,nilai,jumlah*nilai as total from log_pesan_d where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "' order by no_urut";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg.appendData([line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.nilai), floatToNilai(line2.total)]);
					}
				} else this.sg.clear(1);
			}
		} catch (e) { alert(e); }
	}
});