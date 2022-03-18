window.app_saku3_transaksi_siaga_simlog_fSpk = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_siaga_simlog_fSpk.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siaga_simlog_fSpk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form SPK", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 202, 20], caption: "Periode", tag: 2, readOnly: true, change: [this, "doChange"], visible: false });
		this.l_tgl1 = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tanggal", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"] });

		this.pc2 = new pageControl(this, { bound: [10, 10, 1000, 440], childPage: ["Data SPK", "List SPK"] });
		this.sg3 = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 33], colCount: 5, tag: 9,
			colTitle: ["No Bukti", "Tanggal", "Deskripsi", "Mitra", "Nilai"],
			colWidth: [[4, 3, 2, 1, 0], [100, 200, 310, 80, 100]], readOnly: true,
			colFormat: [[4], [cfNilai]],
			dblClick: [this, "doDoubleClick3"], autoAppend: false, defaultRow: 1
		});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 3, grid: this.sg3, pager: [this, "doPager3"] });
		this.bLoad3 = new portalui_imageButton(this.sgn3, { bound: [this.sgn3.width - 25, 2, 22, 22], image: "icon/" + system.getThemes() + "/reload.png", hint: "Load Data", click: [this, "doLoad3"] });

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 200, 20], caption: "No Bukti", maxLength: 30, readOnly: true });
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0], { bound: [225, 12, 20, 20], hint: "Generate", image: "icon/" + system.getThemes() + "/tabCont2.png", click: [this, "doClick"] });
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 450, 20], caption: "Perihal", maxLength: 150 });
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0], { bound: [790, 13, 100, 18], caption: "Tgl Garansi", underline: true });
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0], { bound: [890, 13, 98, 18] });
		this.cb_tap = new saiCBBL(this.pc2.childPage[0], { bound: [20, 18, 220, 20], caption: "No Penetapan", multiSelection: false, maxLength: 10, tag: 1, change: [this, "doChange"] });
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0], { bound: [790, 18, 200, 20], caption: "Nilai Curr", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });
		this.e_vendor = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 450, 20], caption: "Mitra", readOnly: true });
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0], { bound: [790, 12, 200, 20], caption: "PPN Curr", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 14, 450, 20], caption: "Alamat", readOnly: true });
		this.e_total = new saiLabelEdit(this.pc2.childPage[0], { bound: [790, 14, 200, 20], caption: "Total Curr", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });
		this.e_curr = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 200, 20], caption: "Mt Uang", readOnly: true, change: [this, "doChange"] });
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0], { bound: [270, 13, 200, 20], caption: "Kurs", tag: 1, tipeText: ttNilai, text: "0", readOnly: true, change: [this, "doChange"] });
		this.e_totalidr = new saiLabelEdit(this.pc2.childPage[0], { bound: [790, 13, 200, 20], caption: "Total SPK IDR", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });

		this.pc1 = new pageControl(this.pc2.childPage[0], { bound: [1, 12, 995, 268], childPage: ["Item Brg/Jasa", "Ketentuan", "Termin Tagihan", "File Dok", "Otorisasi"] });
		this.sg4 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 35], colCount: 10, tag: 0,
			colTitle: ["ID-SPH", "Item Brg/Jasa", "Merk", "Tipe", "Spesifikasi", "Jumlah", "Harga", "Total", "Kode Brg", "Nama"],
			colWidth: [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [200, 70, 100, 80, 60, 180, 150, 150, 200, 50]],
			colFormat: [[5, 6, 7], [cfNilai, cfNilai, cfNilai]],
			columnReadOnly: [true, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], []],
			autoAppend: false, defaultRow: 1
		});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg4 });

		this.e_harga = new saiMemo(this.pc1.childPage[1], { bound: [10, 12, 450, 70], caption: "Harga", tag: 1 });
		this.e_bayar = new saiMemo(this.pc1.childPage[1], { bound: [530, 12, 450, 70], caption: "Sis. Pembayaran", tag: 1 });
		this.e_kirim = new saiMemo(this.pc1.childPage[1], { bound: [10, 13, 450, 70], caption: "Pengiriman", tag: 1 });
		this.e_garansi = new saiMemo(this.pc1.childPage[1], { bound: [530, 13, 450, 70], caption: "Garansi", tag: 1 });
		this.e_denda = new saiMemo(this.pc1.childPage[1], { bound: [10, 12, 450, 70], caption: "Denda", tag: 1 });
		this.e_spek = new saiMemo(this.pc1.childPage[1], { bound: [530, 12, 450, 70], caption: "Spesifikasi Barang", tag: 1 });

		this.sg5 = new saiGrid(this.pc1.childPage[2], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 2, tag: 1,
			colTitle: ["Deskripsi", "Nilai"],
			colWidth: [[1, 0], [150, 500]],
			colFormat: [[1], [cfNilai]],
			change: [this, "doChangeCell5"], nilaiChange: [this, "doNilaiChange5"],
			autoAppend: true, defaultRow: 1
		});
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[2], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 2, grid: this.sg5 });
		this.e_tot = new saiLabelEdit(this.sgn5, { bound: [790, 1, 200, 20], caption: "Total Termin", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });

		this.e_dok = new saiLabelEdit(this.pc1.childPage[3], { bound: [20, 11, 450, 20], caption: "No Dokumen", maxLength: 50, tag: 9 });
		//this.e_file = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		//this.uploader = new uploader(this.pc1.childPage[3],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[3], { bound: [580, 15, 80, 18], caption: "Lihat File", click: [this, "doLihat"], visible: false });

		this.sgUpld = new saiGrid(this.pc1.childPage[3], {
			bound: [1, 15, this.pc1.width - 5, this.pc1.height - 65], colCount: 3,
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
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 1, grid: this.sgUpld });

		this.sgFile = new saiGrid(this.pc1.childPage[3], {
			bound: [40, 50, 300, 100], colCount: 2, tag: 9, visible: false,
			colTitle: ["namaFile", "status"],
			colWidth: [[1, 0], [80, 180]],
			readOnly: true, autoAppend: false, defaultRow: 1
		});

		this.cb_ttd1 = new saiCBBL(this.pc1.childPage[4], { bound: [20, 17, 220, 20], caption: "NIK TTD1 ", multiSelection: false, maxLength: 10, tag: 2, change: [this, "doChangeJab"] });
		this.c_jabttd1 = new saiCB(this.pc1.childPage[4], { bound: [700, 17, 220, 20], caption: "Jabatan TTD1", readOnly: true, tag: 0 });
		//this.cb_ttd2 = new saiCBBL(this.pc1.childPage[4], { bound: [20, 18, 220, 20], caption: "NIK TTD2", multiSelection: false, maxLength: 10, tag: 2, change: [this, "doChangeJab"] });
		//this.c_jabttd2 = new saiCB(this.pc1.childPage[4], { bound: [700, 18, 220, 20], caption: "Jabatan TTD1", readOnly: true, tag: 0 });
		//this.cb_ttd3 = new saiCBBL(this.pc1.childPage[4], { bound: [20, 19, 220, 20], caption: "NIK TTD3", multiSelection: false, maxLength: 10, tag: 2, change: [this, "doChangeJab"] });
		//this.c_jabttd3 = new saiCB(this.pc1.childPage[4], { bound: [700, 19, 220, 20], caption: "Jabatan TTD1", readOnly: true, tag: 0 });

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);

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

			this.cb_ttd1.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);
			//this.cb_ttd2.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);
			//this.cb_ttd3.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);

			this.c_jabttd1.items.clear();
			//this.c_jabttd2.items.clear();
			//this.c_jabttd3.items.clear();
			var data = this.dbLib.getDataProvider("select nama from kug_jab where kode_lokasi='" + this.app._lokasi + "'", true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line;
				for (var i in data.rs.rows) {
					line = data.rs.rows[i];
					this.c_jabttd1.addItem(i, line.nama);
					//this.c_jabttd2.addItem(i, line.nama);
					//this.c_jabttd3.addItem(i, line.nama);
				}
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fSpk.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fSpk.implement({
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
			/*
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
			*/
		}
	},
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
						sql.add("delete from log_spk_m where no_spk = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_spk_d where no_spk = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_spk_termin where no_spk = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("update log_tap_m set no_spk = '-' where no_spk='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from angg_r where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					}

					sql.add("update log_tap_m set no_spk='" + this.e_nb.getText() + "' where no_tap='" + this.cb_tap.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");

					sql.add("insert into log_spk_m(no_spk,no_pks,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_buat,keterangan,no_tap,kode_vendor,total,ppn, no_dokumen,modul,no_sanggup,ket_harga,ket_bayar,ket_kirim,ket_garansi,ket_denda,ket_spek,tgl_garansi, kode_curr, kurs, nik_ttd1,nik_ttd2,nik_ttd3,  jab_ttd1,jab_ttd2,jab_ttd3) values " +
						"('" + this.e_nb.getText() + "','-','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','-','" + this.e_ket.getText() + "','" + this.cb_tap.getText() + "','" + this.kodeVendor + "'," + nilaiToFloat(this.e_total.getText()) + "," + nilaiToFloat(this.e_ppn.getText()) + ", '" + this.e_dok.getText() + "','SPK','-',  '" + this.e_harga.getText() + "','" + this.e_bayar.getText() + "','" + this.e_kirim.getText() + "','" + this.e_garansi.getText() + "','" + this.e_denda.getText() + "','" + this.e_spek.getText() + "','" + this.dp_d2.getDateString() + "','" + this.e_curr.getText() + "'," + nilaiToFloat(this.e_kurs.getText()) + ",'" + this.cb_ttd1.getText() + "','-','-','" + this.c_jabttd1.getText() + "','-','-')");

					//sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi) values('" + this.e_nb.getText() + "','" + this.e_file.getText() + "',0,'SPK','" + this.app._lokasi + "')");

					for (var i = 0; i < this.sg4.getRowCount(); i++) {
						if (this.sg4.rowValid(i)) {
							sql.add("insert into log_spk_d(no_spk,kode_lokasi,no_urut,item,merk,tipe,catatan,jumlah,harga,ppn,kode_klpfa) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "'," + this.sg4.cells(0, i) + ",'" + this.sg4.cells(1, i) + "','" + this.sg4.cells(2, i) + "','" + this.sg4.cells(3, i) + "','" + this.sg4.cells(4, i) + "'," + nilaiToFloat(this.sg4.cells(5, i)) + "," + nilaiToFloat(this.sg4.cells(6, i)) + ",0,'" + this.sg4.cells(8, i) + "')");
						}
					}
					for (var i = 0; i < this.sg5.getRowCount(); i++) {
						if (this.sg5.rowValid(i)) {
							sql.add("insert into log_spk_termin(no_spk,kode_lokasi,nu,keterangan,nilai) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "'," + i + ",'" + this.sg5.cells(0, i) + "'," + nilaiToFloat(this.sg5.cells(1, i)) + ")");
						}
					}

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

					//koreksi ke angg_r di periode pengajuan
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) " +
						"select '" + this.e_nb.getText() + "','LOGPO',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,'C',saldo,nilai " +
						"from angg_r where no_bukti='" + this.noPesan + "' and kode_lokasi='" + this.app._lokasi + "'");

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) " +
						"select '" + this.e_nb.getText() + "','LOGPO',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,'D',0," + nilaiToFloat(this.e_totalidr.getText()) + " " +
						"from angg_r where no_bukti='" + this.noPesan + "' and kode_lokasi='" + this.app._lokasi + "'");

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
				this.sg4.clear(1); this.sg3.clear(1); this.sg5.clear(1);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbAllFalse);
				this.cb_tap.setSQL("select a.no_tap, a.keterangan from log_tap_m a " +
					"inner join  log_spph_m b on a.no_tap=b.no_tap and a.kode_lokasi=b.kode_lokasi " +
					"where a.no_spk='-' and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' and a.modul='SPK'", ["no_tap", "keterangan"], false, ["No TAP", "Deskripsi"], "and", "Data Penetapan", true);
				break;
			case "simpan":
			case "ubah":
				var data = this.dbLib.getDataProvider("select no_spk from log_spk_m where no_spk <>'" + this.e_nb.getText() + "' and no_dokumen='" + this.e_dok.getText() + "' and kode_lokasi='" + this.app._lokasi + "'", true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						system.alert(this, "No Dokumen sudah terpakai.", "Terpakai di no bukti : " + line.no_spk);
						return false;
					}
				}
				if (nilaiToFloat(this.e_tot.getText()) != nilaiToFloat(this.e_total.getText())) {
					system.alert(this, "Transaksi tidak valid.", "Total Termin dan Nilai PO tidak sama.");
					return false;
				}
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);

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

				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from log_spk_m where no_spk = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from log_spk_d where no_spk = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from log_spk_termin where no_spk = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("update log_tap_m set no_spk = '-' where no_spk='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from angg_r where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
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
		if (this.stsSimpan == 1) {
			this.cb_tap.setSQL("select a.no_tap, a.keterangan from log_tap_m a " +
				"inner join  log_spph_m b on a.no_tap=b.no_tap and a.kode_lokasi=b.kode_lokasi " +
				"where a.no_spk='-' and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' and a.modul='SPK'", ["no_tap", "keterangan"], false, ["No TAP", "Deskripsi"], "and", "Data Penetapan", true);
			this.doClick();
		}
	},
	doChange: function (sender) {
		try {
			if (sender == this.e_periode && this.stsSimpan == 1) this.doClick();
			if (sender == this.cb_tap && this.cb_tap.getText() != "") {
				var strSQL = "select a.no_spph,b.no_pesan, d.kode_curr, d.kurs " +
					"from log_tap_m a inner join log_pesan_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi " +
					"                 inner join log_nego_m c on c.no_tap=a.no_tap and c.kode_lokasi=a.kode_lokasi " +
					"                 inner join log_sph_m d on c.no_sph=d.no_sph and c.kode_lokasi=d.kode_lokasi " +
					"where a.no_tap='" + this.cb_tap.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.noSPPH = line.no_spph;
						this.noPesan = line.no_pesan;
						this.e_curr.setText(line.kode_curr);
						if (this.stsSimpan == 1) this.e_kurs.setText(floatToNilai(line.kurs));
					}
				}

				var strSQL = "select a.kode_vendor,a.nama,a.alamat,b.nilai,b.ppn,b.nilai+b.ppn as total " +
					"from vendor a inner join log_nego_m b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi " +
					"where b.no_tap='" + this.cb_tap.getText() + "' and b.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.kodeVendor = line.kode_vendor;
						this.e_vendor.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.ppn));
						this.e_total.setText(floatToNilai(line.total));
						this.doChange(this.e_kurs);
					}
				}
				if (this.stsSimpan == 1) {
					var strSQL = "select a.id_sph,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai_nego,a.jumlah*a.nilai_nego as total, e.kode_klpfa, e.nama " +
						"from log_sph_d a inner join log_nego_m b on a.no_sph=b.no_sph and a.kode_lokasi=b.kode_lokasi " +
						"                 inner join log_sph_m c on a.no_sph=c.no_sph " +
						"                 inner join log_spph_d d on c.no_spph=d.no_spph and a.no_urut=d.no_urut " +
						"                 inner join log_pesan_m x on d.no_spph=x.no_spph " +
						"                 inner join fa_klp e on d.kode_klpfa=e.kode_klpfa and e.kode_klpakun=x.kode_akun " +
						"where b.no_tap='" + this.cb_tap.getText() + "' and b.kode_lokasi='" + this.app._lokasi + "' order by a.no_urut";
					var data = this.dbLib.getDataProvider(strSQL, true);
					if (typeof data == "object" && data.rs.rows[0] != undefined) {
						var line2;
						this.sg4.clear();
						for (var i in data.rs.rows) {
							line2 = data.rs.rows[i];
							this.sg4.appendData([line2.id_sph, line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.nilai_nego), floatToNilai(line2.total), line2.kode_klpfa, line2.nama]);
						}
					} else this.sg4.clear(1);
				}
			}

			if (sender == this.e_curr) {
				if (this.e_curr.getText() == "IDR") {
					this.e_kurs.setReadOnly(true); this.e_kurs.setText("1");
				}
				else {
					if (this.stsSimpan == 1) {
						var strSQL = "select kurs from gr_kurs where kode_curr ='" + this.e_curr.getText() + "' and ('" + this.dp_d1.getDateString() + "' between tgl_awal and tgl_akhir) ";
						var data = this.dbLib.getDataProvider(strSQL, true);
						if (typeof data == "object") {
							var line = data.rs.rows[0];
							if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));
							else this.e_kurs.setText("0");
						}
					}
					this.e_kurs.setReadOnly(false);
				}
			}
			if (sender == this.e_kurs && this.e_kurs.getText() != "") {
				var totIDR = nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText());
				this.e_totalidr.setText(floatToNilai(totIDR));
			}
		}
		catch (e) {
			alert(e);
		}
	},
	doClick: function (sender) {
		if (this.e_periode.getText() != "") {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1); this.sg4.clear(1); this.sg5.clear(1);
				this.bLihat.hide();
				this.cb_tap.setText("");
				this.cb_tap.setSQL("select a.no_tap, a.keterangan from log_tap_m a " +
					"inner join  log_spph_m b on a.no_tap=b.no_tap and a.kode_lokasi=b.kode_lokasi " +
					"where a.no_spk='-' and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' and a.modul='SPK'", ["no_tap", "keterangan"], false, ["No TAP", "Deskripsi"], "and", "Data Penetapan", true);
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "log_spk_m", "no_spk", this.app._lokasi + "-SPK" + this.e_periode.getText().substr(2, 4) + ".", "0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
	},
	doChangeCell5: function (sender, col, row) {
		if (col == 1) this.sg5.validasi();
	},
	doNilaiChange5: function () {
		try {
			var tot = 0;
			for (var i = 0; i < this.sg5.rows.getLength(); i++) {
				if (this.sg5.rowValid(i) && this.sg5.cells(1, i) != "") {
					tot += nilaiToFloat(this.sg5.cells(1, i));
				}
			}
			this.e_tot.setText(floatToNilai(tot));
		} catch (e) {
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:" + e);
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
								// if (this.fileBfr && this.dataUpload) {
								// 	if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir + "/server/media/" + this.fileBfr);
								// }
								// if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir + "/" + this.uploader.param2 + this.dataUpload.tmpfile, this.rootDir + "/" + this.uploader.param4 + this.dataUpload.filedest);

								this.nama_report = "server_report_saku3_siaga_simlog_rptFormSpk";
								this.filter2 = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_spk='" + this.e_nb.getText() + "' ";
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
								// if (this.fileBfr && this.dataUpload) {
								// 	if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir + "/server/media/" + this.fileBfr);
								// }
								// 
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
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
			this.sg4.clear(1); this.sg3.clear(1); this.sg5.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.cb_tap.setSQL("select a.no_tap, a.keterangan from log_tap_m a " +
				"inner join  log_spph_m b on a.no_tap=b.no_tap and a.kode_lokasi=b.kode_lokasi " +
				"where a.no_spk='-' and a.periode<='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' and a.modul='SPK'", ["no_tap", "keterangan"], false, ["No TAP", "Deskripsi"], "and", "Data Penetapan", true);
		} catch (e) {
			alert(e);
		}
	},
	doLoad3: function (sender) {
		var strSQL = "select a.no_spk,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama,a.total as nilai " +
			"from log_spk_m a " +
			"inner join vendor b on a.kode_vendor=b.kode_vendor and b.kode_lokasi=a.kode_lokasi " +
			"left join (select distinct no_po from log_terima_m where kode_lokasi='" + this.app._lokasi + "') c on a.no_spk=c.no_po  " +
			"where c.no_po is null and a.periode='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' and a.modul='SPK'";
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
			this.sg3.appendData([line.no_spk, line.tgl, line.keterangan, line.nama, floatToNilai(line.nilai)]);
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
				this.stsSimpan = 0;
				this.bLihat.show();
				this.e_nb.setText(this.sg3.cells(0, row));

				this.cb_tap.setSQL("select no_tap, keterangan from log_tap_m where no_spk='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "' and modul='SPK'", ["no_tap", "keterangan"], false, ["No TAP", "Deskripsi"], "and", "Data Penetapan", true);

				var strSQL = "select a.keterangan,a.tanggal,a.nik_buat,a.kode_vendor,c.no_tap,a.no_dokumen, a.tgl_garansi,a.ket_harga,a.ket_bayar,a.ket_kirim,a.ket_garansi,a.ket_denda,a.ket_spek, " +
					"a.kode_curr,a.kurs,a.nik_ttd1,a.nik_ttd2,a.nik_ttd3,a.jab_ttd1,a.jab_ttd2,a.jab_ttd3 " +
					"from log_spk_m a " + //inner join log_pesan_dok b on a.no_spk=b.no_pesan and a.kode_lokasi=b.kode_lokasi and b.kode_jenis='SPK' 
					"				   inner join log_tap_m c on a.no_spk=c.no_spk and a.kode_lokasi=c.kode_lokasi " +
					"where a.no_spk = '" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.e_dok.setText(line.no_dokumen);
						this.cb_ttd1.setText(line.nik_buat);
						//this.e_file.setText(line.no_gambar);
						this.cb_tap.setText(line.no_tap);

						this.dp_d2.setText(line.tgl_garansi);
						this.e_harga.setText(line.ket_harga);
						this.e_bayar.setText(line.ket_bayar);
						this.e_kirim.setText(line.ket_kirim);
						this.e_garansi.setText(line.ket_garansi);
						this.e_denda.setText(line.ket_denda);
						this.e_spek.setText(line.ket_spek);

						this.cb_ttd1.setText(line.nik_ttd1);
						//this.cb_ttd2.setText(line.nik_ttd2);
						//this.cb_ttd3.setText(line.nik_ttd3);
						this.c_jabttd1.setText(line.jab_ttd1);
						//this.c_jabttd2.setText(line.jab_ttd2);
						//this.c_jabttd3.setText(line.jab_ttd3);

						this.e_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));

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

				//di spk_d no_urut = id_sph di sph_d
				var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.jumlah*a.harga as total,a.kode_klpfa,b.nama " +
					"from log_spk_d a " +
					"inner join log_tap_m c on a.no_spk=c.no_spk " +
					"inner join log_pesan_m d on c.no_spph=d.no_spph " +
					"inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and d.kode_akun=b.kode_klpakun " +
					"where a.no_spk ='" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg4.appendData([line2.no_urut, line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.harga), floatToNilai(line2.total), line2.kode_klpfa, line2.nama]);
					}
				} else this.sg4.clear(1);

				var strSQL = "select * from log_spk_termin where no_spk ='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "' order by nu";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg5.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg5.appendData([line2.keterangan, floatToNilai(line2.nilai)]);
					}
				} else this.sg5.clear(1);

			}
		} catch (e) { alert(e); }
	}
});