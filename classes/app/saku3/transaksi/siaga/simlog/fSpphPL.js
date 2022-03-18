window.app_saku3_transaksi_siaga_simlog_fSpphPL = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_siaga_simlog_fSpphPL.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siaga_simlog_fSpphPL";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form SPPH", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 202, 20], caption: "Periode", tag: 2, readOnly: true, change: [this, "doChange"], visible: false });
		this.l_tgl1 = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tanggal SPPH", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"] });

		this.pc2 = new pageControl(this, { bound: [10, 10, 1000, 440], childPage: ["Data SPPH", "List SPPH"] });
		this.sg3 = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 33], colCount: 3, tag: 9,
			colTitle: ["No SPPH", "Tanggal", "Deskripsi"],
			colWidth: [[2, 1, 0], [410, 80, 150]], readOnly: true,
			dblClick: [this, "doDoubleClick3"], autoAppend: false, defaultRow: 1
		});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 3, grid: this.sg3, pager: [this, "doPager3"] });
		this.bLoad3 = new portalui_imageButton(this.sgn3, { bound: [this.sgn3.width - 25, 2, 22, 22], image: "icon/" + system.getThemes() + "/reload.png", hint: "Load Data", click: [this, "doLoad3"] });

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 220, 20], caption: "No SPPH", maxLength: 30, readOnly: true });
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0], { bound: [245, 12, 20, 20], hint: "Generate", image: "icon/" + system.getThemes() + "/tabCont2.png", click: [this, "doClick"] });
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 17, 450, 20], caption: "Perihal", maxLength: 150 });
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0], { bound: [20, 11, 100, 18], caption: "Tgl SPH", underline: true });
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0], { bound: [120, 11, 100, 18] });
		this.e_curr = new saiLabelEdit(this.pc2.childPage[0], { bound: [680, 11, 200, 20], caption: "Kode Curr", readOnly: true });
		this.cb_buat = new saiCBBL(this.pc2.childPage[0], { bound: [20, 13, 220, 20], caption: "Yang Membuat", multiSelection: false, maxLength: 10, tag: 2 });
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0], { bound: [680, 13, 200, 20], caption: "Kurs Request", readOnly: true, tipeText: ttNilai, text: "0" });
		this.cb_app = new saiCBBL(this.pc2.childPage[0], { bound: [20, 15, 220, 20], caption: "Yang Menyetujui", multiSelection: false, maxLength: 10, tag: 2 });
		this.e_dok2 = new saiLabelEdit(this.pc2.childPage[0], { bound: [680, 15, 300, 20], caption: "No Dokumen", readOnly: true });
		this.cb_pesan = new saiCBBL(this.pc2.childPage[0], { bound: [20, 14, 220, 20], caption: "No Request", multiSelection: false, maxLength: 10, tag: 1, change: [this, "doChange"] });
		this.e_jenis = new saiLabelEdit(this.pc2.childPage[0], { bound: [680, 14, 300, 20], caption: "Jenis", readOnly: true });

		this.pc1 = new pageControl(this.pc2.childPage[0], { bound: [1, 12, 995, 269], childPage: ["Daftar Pesan", "Daftar Mitra", "Rekap BQ", "File Dok"] });
		this.sg4 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 7, tag: 9,
			colTitle: ["Item Barang", "Merk", "Tipe", "Spesifikasi", "Jumlah", "Harga Curr", "Total Curr"],
			colWidth: [[6, 5, 4, 3, 2, 1, 0], [80, 80, 60, 180, 180, 180, 180]],
			colFormat: [[4, 5, 6], [cfNilai, cfNilai, cfNilai]],
			readOnly: true, autoAppend: false, defaultRow: 1
		});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg4 });

		this.sg2 = new saiGrid(this.pc1.childPage[1], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 30], colCount: 3, tag: 0,
			colTitle: ["Kode Mitra", "Nama", "Alamat"],
			colWidth: [[2, 1, 0], [500, 300, 80]],
			columnReadOnly: [true, [1, 2], [0]],
			buttonStyle: [[0], [bsEllips]], checkItem: true,
			ellipsClick: [this, "doEllipsClick2"], change: [this, "doChangeCell2"],
			autoAppend: true, defaultRow: 1
		});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 2, grid: this.sg2 });

		this.sg5 = new saiGrid(this.pc1.childPage[2], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 35], colCount: 9, tag: 0,
			colTitle: ["Kode Brg", "Nama", "Item Barang", "Merk", "Tipe", "Spesifikasi", "Jumlah", "Harga Curr", "Total Curr"],
			colWidth: [[8, 7, 6, 5, 4, 3, 2, 1, 0], [80, 80, 60, 200, 200, 200, 200, 200, 70]],
			colFormat: [[6, 7, 8], [cfNilai, cfNilai, cfNilai]],
			buttonStyle: [[0], [bsEllips]],
			change: [this, "doChangeCell5"], nilaiChange: [this, "doNilaiChange5"], ellipsClick: [this, "doEllipsClick5"],
			afterPaste: [this, "doAfterPaste"], pasteEnable: true, autoPaging: true, rowPerPage: 200,
			autoAppend: false, defaultRow: 1
		});
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[2], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 2, grid: this.sg4 });

		this.e_dok = new saiLabelEdit(this.pc1.childPage[3], { bound: [20, 11, 450, 20], caption: "No Dokumen", maxLength: 50, tag: 9 });
		// this.e_file = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		// this.uploader = new uploader(this.pc1.childPage[3],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});
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

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
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

			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='" + this.app._kodeBidang + "' " +
				"where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='" + this.app._kodeBidang + "' " +
				"where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fSpphPL.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fSpphPL.implement({
	doAfterPaste: function (sender, totalRow) {
		try {
			this.cekRek = false;
			for (var i = 0; i < this.sg5.getRowCount(); i++) {
				if (this.sg5.rowValid(i)) {
					var data = this.dbLib.getDataProvider("select nama from fa_klp where kode_klpfa='" + this.sg5.cells(0, i) + "'", true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];
						if (line != undefined) {
							this.doChangeCell(this.sg5, 0, i);
						}
						else {
							var j = i + 1;
							system.alert(this, "Data Kelompok Barang tidak valid.", "Kode Kelompok " + this.sg5.cells(0, i) + " tidak terdaftar. (Baris : " + j + ")");
							this.sg5.clear(1);
							return false;
						}
					}
				}
			}
		} catch (e) { alert(e); }
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
						sql.add("delete from log_spph_m where no_spph = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_spph_vendor where no_spph = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_spph_d where no_spph = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("update log_pesan_m set progress='2',no_spph='-' where no_spph='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					}

					sql.add("update log_pesan_m set progress='3',no_spph='" + this.e_nb.getText() + "' where no_pesan='" + this.cb_pesan.getText() + "'");
					sql.add("insert into log_spph_m(no_spph,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_buat,nik_app,keterangan,no_tap,no_dokumen,due_date,modul,no_sanggup, kode_curr,kurs) values " +
						"('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','" + this.cb_buat.getText() + "','" + this.cb_app.getText() + "','" + this.e_ket.getText() + "','-','" + this.e_dok.getText() + "','" + this.dp_d2.getDateString() + "','" + this.e_jenis.getText() + "','-','" + this.e_curr.getText() + "'," + nilaiToFloat(this.e_kurs.getText()) + ")");

					for (var i = 0; i < this.sg5.getRowCount(); i++) {
						if (this.sg5.rowValid(i)) {
							sql.add("insert into log_spph_d(no_spph,kode_lokasi,no_urut,item,merk,tipe,catatan,jumlah,harga,ppn,kode_klpfa) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "'," + i + ",'" + this.sg5.cells(2, i) + "','" + this.sg5.cells(3, i) + "','" + this.sg5.cells(4, i) + "','" + this.sg5.cells(5, i) + "'," + nilaiToFloat(this.sg5.cells(6, i)) + "," + nilaiToFloat(this.sg5.cells(7, i)) + ",0,'" + this.sg5.cells(0, i) + "')");
						}
					}
					for (var i = 0; i < this.sg2.getRowCount(); i++) {
						if (this.sg2.rowValid(i)) {
							sql.add("insert into log_spph_vendor(no_spph,kode_lokasi,kode_vendor,no_sph) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "','" + this.sg2.cells(0, i) + "','-')");
						}
					}

					//sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi) values('" + this.e_nb.getText() + "','" + this.e_file.getText() + "',0,'SPPH','" + this.app._lokasi + "')");
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
				this.sg2.clear(1); this.sg3.clear(1); this.sg5.clear(1); this.sg4.clear(1);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				setTipeButton(tbAllFalse);
				this.cb_pesan.setSQL("select a.no_pesan,a.keterangan from log_pesan_m a " +
					"inner join log_justerima_m c on a.no_pesan=c.no_pesan " +
					"inner join app_m d on c.no_terima=d.no_app and d.no_appseb='-' " +
					"where a.progress='2' and a.lok_proses = '" + this.app._lokasi + "' and c.jenis in ('PO','SPK') and a.periode<='" + this.e_periode.getText() + "' ",
					["no_pesan", "keterangan"], false, ["No Request", "Deskripsi"], "and", "Data Request", true);
				break;
			case "simpan":
			case "ubah":
				this.preView = "1";
				var totBQ = 0;
				for (var i = 0; i < this.sg5.getRowCount(); i++) {
					if (this.sg5.rowValid(i)) {
						totBQ += nilaiToFloat(this.sg5.cells(8, i));
						if (this.sg5.cells(0, i) == "-" || this.sg5.cells(0, i) == "") {
							var j = i + 1;
							system.alert(this, "Rekap BQ tidak valid.", "Kode Barang harus diisi (baris " + j + ").");
							return false;
						}
					}
				}

				//melebihi tidak boleh, karena faktor budget... jika kurang diperbolehkan
				if (totBQ > this.totReq) {
					system.alert(this, "Transaksi tidak valid.", "Total Item Barang BQ melebihi dengan Total Pesanan.");
					return false;
				}

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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);

				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from log_spph_m where no_spph = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from log_spph_vendor where no_spph = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from log_spph_d where no_spph = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("update log_pesan_m set progress='2',no_spph='-' where no_spph='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
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
			this.cb_pesan.setText("", "");
			this.cb_pesan.setSQL("select a.no_pesan,a.keterangan from log_pesan_m a " +
				"inner join log_justerima_m c on a.no_pesan=c.no_pesan " +
				"inner join app_m d on c.no_terima=d.no_app and d.no_appseb='-' " +
				"where a.progress='2' and a.lok_proses = '" + this.app._lokasi + "' and c.jenis in ('PO','SPK') and a.periode<='" + this.e_periode.getText() + "' ",
				["no_pesan", "keterangan"], false, ["No Request", "Deskripsi"], "and", "Data Request", true);
			this.doClick();
		}
	},
	doChange: function (sender) {
		if (sender == this.e_periode && this.stsSimpan == 1) this.doClick();
		if (sender == this.cb_pesan && this.stsSimpan == 1) {
			var data = this.dbLib.getDataProvider("select kode_akun,kode_curr,kurs from log_pesan_m where no_pesan = '" + this.cb_pesan.getText() + "'", true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];
				if (line != undefined) {
					this.akunAktap = line.kode_akun;
					this.e_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
				}
			}

			var sql = new server_util_arrayList();
			sql.add("select kode_vendor,nama from vendor where kode_lokasi = '" + this.app._lokasi + "'");
			sql.add("select kode_klpfa,nama from fa_klp where kode_klpakun = '" + this.akunAktap + "' union select '-','-' ");
			this.dbLib.getMultiDataProviderA(sql);

			this.totReq = 0;
			var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai,a.jumlah*a.nilai as total,c.jenis,b.no_dokumen " +
				"from log_pesan_d a " +
				"  inner join log_pesan_m b on a.no_pesan=b.no_pesan " +
				"  inner join log_justerima_m c on a.no_pesan=c.no_pesan " +
				"	inner join app_m d on c.no_terima=d.no_app and d.no_appseb='-' " +
				"where a.no_pesan = '" + this.cb_pesan.getText() + "' order by a.no_urut";
			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line2;
				this.sg4.clear();
				this.sg5.clear();
				for (var i in data.rs.rows) {
					line2 = data.rs.rows[i];
					this.totReq += parseFloat(line2.total);
					this.sg4.appendData([line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.nilai), floatToNilai(line2.total)]);
					this.sg5.appendData(["-", "-", line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.nilai), floatToNilai(line2.total)]);
				}
			} else this.sg4.clear(1);
			this.e_jenis.setText(line2.jenis);
			this.e_dok2.setText(line2.no_dokumen);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doClick: function (sender) {
		if (this.e_periode.getText() != "") {
			if (this.stsSimpan == 0) {
				this.sg2.clear(1); this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1);
				this.bLihat.hide();
				this.cb_pesan.setSQL("select a.no_pesan,a.keterangan from log_pesan_m a " +
					"inner join log_justerima_m c on a.no_pesan=c.no_pesan " +
					"inner join app_m d on c.no_terima=d.no_app and d.no_appseb='-' " +
					"where a.progress='2' and a.lok_proses = '" + this.app._lokasi + "' and c.jenis in ('PO','SPK') and a.periode<='" + this.e_periode.getText() + "' ",
					["no_pesan", "keterangan"], false, ["No Request", "Deskripsi"], "and", "Data Request", true);
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "log_spph_m", "no_spph", this.app._lokasi + "-SPPH" + this.e_periode.getText().substr(2, 4) + ".", "0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
	},
	doChangeCell5: function (sender, col, row) {
		try {
			if (col == 6 || col == 7) {
				if (this.sg5.cells(6, row) != "" && this.sg5.cells(7, row) != "") {
					this.sg5.cells(8, row, nilaiToFloat(this.sg5.cells(7, row)) * nilaiToFloat(this.sg5.cells(6, row)));
					this.sg5.validasi();
				}
			}
			sender.onChange.set(undefined, undefined);
			if (col == 0) {
				if (sender.cells(0, row) != "") {
					var klp = this.dataKlp.get(sender.cells(0, row));
					if (klp) {
						sender.cells(1, row, klp);
					}
					else {
						if (trim(sender.cells(0, row)) != "") system.alert(this, "Kode Barang " + sender.cells(0, row) + " tidak ditemukan", "Inputkan kode lainnya.", "Cek Klp Barang");
						sender.cells(0, row, "");
						sender.cells(1, row, "");
					}
				}
			}
			sender.onChange.set(this, "doChangeCell5");
		} catch (e) {
			alert(e);
		}
	},
	doChangeCell2: function (sender, col, row) {
		sender.onChange.set(undefined, undefined);
		if (col == 0) {
			if (sender.cells(0, row) != "") {
				var vendor = this.dataVendor.get(sender.cells(0, row));
				if (vendor) {
					sender.cells(1, row, vendor);
					var strSQL = "select alamat from vendor where kode_vendor='" + sender.cells(0, row) + "' and kode_lokasi='" + this.app._lokasi + "'";
					var data = this.dbLib.getDataProvider(strSQL, true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];
						if (line != undefined) {
							sender.cells(2, row, line.alamat);
						}
					}

				}
				else {
					if (trim(sender.cells(0, row)) != "") system.alert(this, "Kode Mitra " + sender.cells(0, row) + " tidak ditemukan", "Inputkan kode lainnya.", "checkAkun");
					sender.cells(0, row, "");
					sender.cells(1, row, "");
					sender.cells(2, row, "");
				}
			}
		}
		sender.onChange.set(this, "doChangeCell2");
	},
	doEllipsClick2: function (sender, col, row) {
		try {
			if (sender == this.sg2) {
				if (col == 0) {
					this.standarLib.showListData(this, "Daftar Mitra", sender, undefined,
						"select kode_vendor, nama  from vendor where kode_lokasi = '" + this.app._lokasi + "'",
						"select count(kode_vendor) from vendor where kode_lokasi = '" + this.app._lokasi + "'",
						["kode_vendor", "nama"], "and", ["Kode", "Nama"], false);
				}
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	},
	doEllipsClick5: function (sender, col, row) {
		try {
			if (sender == this.sg5) {
				if (col == 0) {
					this.standarLib.showListData(this, "Daftar Kelompok Barang", sender, undefined,
						"select kode_klpfa, nama  from fa_klp where kode_klpfa<>'-' and kode_klpakun = '" + this.akunAktap + "'",
						"select count(kode_klpfa) from fa_klp where kode_klpfa<>'-' and kode_klpakun = '" + this.akunAktap + "'",
						["kode_klpfa", "nama"], "and", ["Kode", "Nama"], false);
				}
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	},
	doRequestReady: function (sender, methodName, result) {
		if (sender == this.dbLib) {
			try {
				switch (methodName) {
					case "execArraySQL":
						if (result.toLowerCase().search("error") == -1) {
							if (this.preView == "1") {
								for (var i = 0; i < this.sgFile.getRowCount(); i++) {
									if (this.sgFile.cells(1, i) == "HAPUS") {
										this.fileUtil.deleteFile(this.rootDir + "/server/media/" + this.sgFile.cells(0, i));
									}
								}
								this.nama_report = "server_report_saku3_siaga_simlog_rptSpph";
								this.filter2 = " where a.kode_lokasi='" + this.app._lokasi + "' and f.no_spph='" + this.e_nb.getText() + "' ";
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
							this.dataVendor = new portalui_arrayMap();
							this.dataKlp = new portalui_arrayMap();
							if (result.result[0]) {
								var line;
								for (var i in result.result[0].rs.rows) {
									line = result.result[0].rs.rows[i];
									this.dataVendor.set(line.kode_vendor, line.nama);
								}
							}
							if (result.result[1]) {
								var line;
								for (var i in result.result[1].rs.rows) {
									line = result.result[1].rs.rows[i];
									this.dataKlp.set(line.kode_klpfa, line.nama);
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
			this.standarLib.clearByTag(this, new Array("0", "1", "9"), this.e_nb);
			this.dataJU5 = { rs: { rows: [] } };
			this.sg2.clear(1); this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.cb_pesan.setSQL("select a.no_pesan,a.keterangan from log_pesan_m a " +
				"inner join log_justerima_m c on a.no_pesan=c.no_pesan " +
				"inner join app_m d on c.no_terima=d.no_app and d.no_appseb='-' " +
				"where a.progress='2' and a.lok_proses = '" + this.app._lokasi + "' and c.jenis in ('PO','SPK') and a.periode<='" + this.e_periode.getText() + "' ",
				["no_pesan", "keterangan"], false, ["No Request", "Deskripsi"], "and", "Data Request", true);
		} catch (e) {
			alert(e);
		}
	},
	doLoad3: function (sender) {
		var strSQL = "select distinct a.no_spph,convert(varchar,a.tanggal,103) as tgl,a.keterangan " +
			"from log_spph_m a " +
			"	   left join log_sph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi " +
			"where b.no_sph is null and a.periode='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' and a.modul in ('PO','SPK') and a.no_tap='-'";
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
			this.sg3.appendData([line.no_spph, line.tgl, line.keterangan]);
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

				var strSQL = "select a.kode_curr,a.kurs, c.kode_akun,a.keterangan,a.tanggal,a.nik_buat,a.nik_app,isnull(b.no_gambar,'-')as no_gambar,a.no_dokumen,c.no_pesan,a.due_date  " +
					"from log_spph_m a " +
					"          inner join log_pesan_m c on a.no_spph=c.no_spph and a.kode_lokasi=c.kode_lokasi " +
					"			left join log_pesan_dok b on a.no_spph=b.no_pesan and a.kode_lokasi=b.kode_lokasi and b.kode_jenis='SPPH' " +
					"where a.no_spph = '" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_app);
						// this.e_file.setText(line.no_gambar);
						this.cb_pesan.setSQL("select no_pesan,keterangan from log_pesan_m where no_pesan='" + line.no_pesan + "'", ["no_pesan", "keterangan"], false, ["No Request", "Deskripsi"], "and", "Data Request", true);
						this.cb_pesan.setText(line.no_pesan);
						this.akunAktap = line.kode_akun;

						this.e_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
					}
				}

				var sql = new server_util_arrayList();
				sql.add("select kode_vendor,nama from vendor where kode_lokasi = '" + this.app._lokasi + "'");
				sql.add("select kode_klpfa,nama from fa_klp where kode_klpakun = '" + this.akunAktap + "' union select '-','-' ");
				this.dbLib.getMultiDataProviderA(sql);

				var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai,a.jumlah*a.nilai as total,c.jenis,b.no_dokumen " +
					"from log_pesan_d a " +
					"  inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi " +
					"  inner join log_justerima_m c on a.no_pesan=c.no_pesan and a.kode_lokasi=c.kode_lokasi and b.no_terima=c.no_terima " +
					"where a.no_pesan = '" + this.cb_pesan.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.totReq += parseFloat(line2.total);
						this.sg4.appendData([line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.nilai), floatToNilai(line2.total)]);
					}
				} else this.sg4.clear(1);
				this.e_jenis.setText(line2.jenis);
				this.e_dok2.setText(line2.no_dokumen);

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


				var strSQL = "select b.kode_klpfa,b.nama,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.harga * a.jumlah as total " +
					"from log_spph_d a " +
					"inner join log_pesan_m c on c.no_spph=a.no_spph " +
					"inner join fa_klp b on a.kode_klpfa = b.kode_klpfa and b.kode_klpakun=c.kode_akun " +
					"where a.no_spph='" + this.e_nb.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg5.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg5.appendData([line2.kode_klpfa, line2.nama, line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.harga), floatToNilai(line2.total)]);
					}
				} else this.sg5.clear(1);

				var data = this.dbLib.getDataProvider("select a.kode_vendor,b.nama,b.alamat from log_spph_vendor a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi where a.no_spph='" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'", true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows) {
						line = data.rs.rows[i];
						this.sg2.appendData([line.kode_vendor, line.nama, line.alamat]);
					}
				} else this.sg2.clear(1);
			}
		} catch (e) { alert(e); }
	}
});