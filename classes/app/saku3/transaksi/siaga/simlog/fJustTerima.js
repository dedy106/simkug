window.app_saku3_transaksi_siaga_simlog_fJustTerima = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_siaga_simlog_fJustTerima.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siaga_simlog_fJustTerima";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form Approval Logistik", 0);

		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 202, 20], caption: "Periode", tag: 2, readOnly: true, visible: false });
		this.l_tgl1 = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tgl Terima", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"] });

		this.pc1 = new pageControl(this, { bound: [10, 18, 1000, 440], childPage: ["Daftar Request", "Data Request", "Cari Data"] });
		this.sg = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 35], colCount: 10, tag: 0,
			colTitle: ["No Request", "Status", "Tanggal", "Modul", "PP", "No Dokumen", "Deskripsi", "Nilai", "Pembuat", "No App"],
			colWidth: [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100, 120, 100, 320, 120, 150, 70, 70, 80, 100]],
			readOnly: true, colFormat: [[7], [cfNilai]],
			dblClick: [this, "doDoubleClick"], autoAppend: false, defaultRow: 1
		});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg, pager: [this, "doPager"] });

		this.c_status = new saiCB(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "Status", items: ["APPROVE", "RETURN"], readOnly: true, tag: 2 });
		this.c_jenis = new saiCB(this.pc1.childPage[1], { bound: [270, 10, 200, 20], caption: "Jenis Pengadaan", items: ["PO", "SPK", "COD", "PJR"], readOnly: true, tag: 2 });

		this.e_memo = new saiMemo(this.pc1.childPage[1], { bound: [20, 11, 450, 60], caption: "Catatan Approve", tag: 9, readOnly: true });
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 200, 20], caption: "No Approve", readOnly: true, visible: false });

		this.pc2 = new pageControl(this.pc1.childPage[1], { bound: [2, 18, 995, 319], childPage: ["Data PR", "Detail Request", "Maksud-Tujuan", "Aspek Strategis", "Data Budget"] });
		this.e_noreq = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 11, 450, 20], caption: "No Request", readOnly: true });
		this.e_tgl = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 200, 20], caption: "Tgl Request", readOnly: true });
		this.e_modul = new saiLabelEdit(this.pc2.childPage[0], { bound: [270, 13, 200, 20], caption: "Modul", readOnly: true });
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 450, 20], caption: "No Dokumen", readOnly: true });
		this.e_pp = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 11, 450, 20], caption: "PP/Unit", readOnly: true });
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 14, 450, 20], caption: "Deskripsi", readOnly: true });
		this.e_curr = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 200, 20], caption: "Kode Curr", readOnly: true });
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0], { bound: [270, 12, 200, 20], caption: "Kurs Request", readOnly: true, tipeText: ttNilai, text: "0" });
		this.e_nilaiCurr = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 11, 200, 20], caption: "Nilai Curr", readOnly: true, tipeText: ttNilai, text: "0" });
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 200, 20], caption: "Nilai IDR", readOnly: true, tipeText: ttNilai, text: "0" });
		this.e_buat = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 11, 450, 20], caption: "Pembuat", readOnly: true });
		this.e_tahu = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 14, 450, 20], caption: "Mengetahui", readOnly: true });
		// this.e_file = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"File Upload", readOnly:true, tag:9});		
		// this.bLihat = new button(this.pc2.childPage[0], { bound: [487, 16, 80, 18], caption: "Lihat File", click: [this, "doLihat"] });

		this.sgUpld = new saiGrid(this.pc2.childPage[0], {
			bound: [1, 15, this.pc2.width - 5, this.pc2.height - 65], colCount: 3,
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
		this.sgnUpld = new sgNavigator(this.pc2.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 1, grid: this.sgUpld });

		this.sgFile = new saiGrid(this.pc2.childPage[0], {
			bound: [40, 50, 300, 100], colCount: 2, tag: 9, visible: false,
			colTitle: ["namaFile", "status"],
			colWidth: [[1, 0], [80, 180]],
			readOnly: true, autoAppend: false, defaultRow: 1
		});

		this.sg3 = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 35], colCount: 7,
			colTitle: ["Item Barang", "Merk", "Tipe", "Spesifikasi", "Jumlah", "Hrg Curr", "Total Curr"],
			colWidth: [[6, 5, 4, 3, 2, 1, 0], [80, 80, 60, 180, 180, 180, 180]],
			colFormat: [[4, 5, 6], [cfNilai, cfNilai, cfNilai]],
			readOnly: true,
			autoAppend: false, defaultRow: 1
		});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 3, grid: this.sg3 });

		this.mDesk1 = new tinymceCtrl(this.pc2.childPage[2], { bound: [1, 5, 990, 303], withForm: false });
		this.mDesk2 = new tinymceCtrl(this.pc2.childPage[3], { bound: [1, 5, 990, 303], withForm: false });

		this.sg2 = new saiGrid(this.pc2.childPage[4], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 35], colCount: 5, tag: 9,
			colTitle: ["Kode Akun", "Nama Akun", "Saldo Awal", "Nilai", "Saldo Akhir"],
			colWidth: [[4, 3, 2, 1, 0], [100, 100, 100, 500, 100]],
			readOnly: true, colFormat: [[2, 3, 4], [cfNilai, cfNilai, cfNilai]], autoAppend: false, defaultRow: 1
		});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[4], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 3, grid: this.sg2 });

		this.c_status2 = new saiCB(this.pc1.childPage[2], { bound: [20, 10, 202, 20], caption: "Status", items: ["INPROG", "APPROVE", "RETURN"], readOnly: true, tag: 9 });
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2], { bound: [20, 15, 450, 20], caption: "No Request", tag: 9 });
		this.bCari = new button(this.pc1.childPage[2], { bound: [120, 10, 80, 18], caption: "Cari Data", click: [this, "doCari"] });

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);



		setTipeButton(tbAllFalse);
		this.maximize();
		this.setTabChildIndex();

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, { bound: [0, 0, this.getWidth(), this.getHeight()], visible: false });
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer, "doSelectedPage", "doCloseReportClick", "doRowPerPageChange", "doPdfClick", "doXlsClick", true);
		this.report = new server_report_report();
		this.report.addListener(this);

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.doSelectDate(this.dp_d1, this.dp_d1.year, this.dp_d1.month, this.dp_d1.day);

			this.c_status.setText("");
		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fJustTerima.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fJustTerima.implement({
	// doLihat: function (sender) {
	// 	try {
	// 		if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/" + this.e_file.getText());
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
	mainButtonClick: function (sender, desk) {
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0, 1, 2])) {
				try {
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.c_status.getText() == "APPROVE") var prog = "2";
					else var prog = "L";

					if (this.e_modul.getText() == "LOGREQ") {
						sql.add("update log_pesan_m set progress='" + prog + "',no_terima='" + this.e_nb.getText() + "' where no_pesan='" + this.e_noreq.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						var modul = 'LOGREQ_TRM';
					}

					sql.add("update a set no_appseb ='" + this.e_nb.getText() + "' " +
						"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' " +
						"where b.no_bukti ='" + this.e_noreq.getText() + "' and b.modul='" + modul + "' and b.kode_lokasi='" + this.app._lokasi + "'");

					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values " +
						"('" + this.e_nb.getText() + "','" + this.dp_d1.getDateString() + "','" + this.app._lokasi + "','" + this.e_periode.getText() + "','" + this.app._userLog + "',getdate(),'" + this.c_status.getText() + "','" + modul + "','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values " +
						"('" + this.e_nb.getText() + "','" + prog + "','" + modul + "','" + this.e_noreq.getText() + "','" + this.app._lokasi + "','" + this.e_memo.getText() + "')");

					sql.add("insert into log_justerima_m(no_terima,no_pesan,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_serah,nik_terima,jenis) values " +
						"('" + this.e_nb.getText() + "','" + this.e_noreq.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','-','-','" + this.c_jenis.getText() + "')");

					// //dokumen						
					// var ix = 0;
					// for (var i = 0; i < this.sgUpld.getRowCount(); i++) {
					// 	if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2, i) != "-") {
					// 		for (var j = 0; j < this.sgFile.getRowCount(); j++) {
					// 			if (this.sgUpld.cells(0, i) == this.sgFile.cells(0, j)) {
					// 				this.sgFile.cells(1, j, "PAKAI");
					// 			}
					// 		}
					// 		sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi)values('" + this.e_noreq.getText() + "','" + this.sgUpld.cells(1, i).tmpfile + "','" + ix + "','-','" + this.app._lokasi + "')");
					// 	}
					// }

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
				this.sg2.clear(1); this.sg3.clear(1);
				this.doClick();
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.c_status.setText("");
				setTipeButton(tbAllFalse);
				break;
			case "simpan":
			case "ubah":
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.simpan();
				break;
			case "simpancek": this.simpan();
				break;
			case "hapus":
				this.preView = "0";
				if (this.e_modul.getText() == "LOGREQ") {
					var data = this.dbLib.getDataProvider("select distinct progress from log_pesan_m where progress not in ('2','L') and no_pesan='" + this.e_noreq.getText() + "' and kode_lokasi = '" + this.app._lokasi + "'", true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];
						if (line != undefined) {
							system.alert(this, "Transaksi tidak valid.", "No Pengajuan LOGREQ sudah diprogress lain.");
							return false;
						}
					}
				}
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();

				if (this.e_modul.getText() == "LOGREQ") {
					sql.add("update log_pesan_m set progress='1',no_terima='-' where no_pesan='" + this.e_noreq.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					var modul = "LOGREQ_TRM";
				}
				var data = this.dbLib.getDataProvider("select a.no_app from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and b.no_bukti='" + this.e_noreq.getText() + "' " +
					"where a.no_appseb='-' and a.kode_lokasi='" + this.app._lokasi + "' and a.modul='" + modul + "'", true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						sql.add("delete from app_m where no_app='" + line.no_app + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from app_d where no_app='" + line.no_app + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_justerima_m where no_terima='" + line.no_app + "' and kode_lokasi='" + this.app._lokasi + "'");						
					}
				}
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
		}
	},
	doSelectDate: function (sender, y, m, d) {
		if (m < 10) m = "0" + m;
		if (parseFloat(this.app._periode.substr(4, 2)) <= 12) this.e_periode.setText(y + "" + m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y + "" + m);
		}
		this.doClick();
		this.doLoad();
	},
	doClick: function (sender) {
		if (this.e_noreq.getText() != "") {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "app_m", "no_app", this.app._lokasi + "-LTR" + this.e_periode.getText().substr(2, 4) + ".", "0000"));
			this.c_status.setFocus();
		}
	},
	doDoubleClick: function (sender, col, row) {
		try {
			if (this.sg.cells(0, row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[1]);

				this.e_noreq.setText(this.sg.cells(0, row));
				this.e_tgl.setText(this.sg.cells(2, row));
				this.e_pp.setText(this.sg.cells(4, row));
				this.e_dok.setText(this.sg.cells(5, row));
				this.e_ket.setText(this.sg.cells(6, row));
				this.e_nilai.setText(this.sg.cells(7, row));
				this.e_buat.setText(this.sg.cells(8, row));
				this.e_modul.setText(this.sg.cells(3, row));
				this.stsProg = this.sg.cells(1, row);

				this.doClick();

				if (this.stsProg == "APPROVE" || this.stsProg == "RETURN") {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;

					var strSQL = "select a.jenis, isnull(c.catatan,'-') as catatan " +
						"from log_justerima_m a " +
						"	   inner join log_pesan_m b on a.no_terima=b.no_terima and a.kode_lokasi=b.kode_lokasi " +
						"	   left join app_d c on c.no_app=a.no_terima and a.kode_lokasi=c.kode_lokasi and c.modul ='LOGREQ_TRM' " +
						"where a.no_pesan='" + this.e_noreq.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";

					var data = this.dbLib.getDataProvider(strSQL, true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];
						if (line != undefined) {
							this.e_memo.setText(line.catatan);
							this.c_jenis.setText(line.jenis);
						}
					}
				}
				else {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}

				var strSQL = "select a.nilai_curr,a.kode_curr,a.kurs,   a.nik_app+' - '+b.nama as tahu,isnull(c.no_gambar,'-') as no_gambar,a.maksud,a.aspek " +
					"from log_pesan_m a " +
					"		inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi " +
					"		left join log_pesan_dok c on a.no_pesan=c.no_pesan and a.kode_lokasi=c.kode_lokasi " +
					"where a.no_pesan='" + this.e_noreq.getText() + "' ";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_tahu.setText(line.tahu);
						// this.e_file.setText(line.no_gambar);
						this.mDesk1.setCode(urldecode(line.maksud));
						this.mDesk2.setCode(urldecode(line.aspek));

						this.e_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.e_nilaiCurr.setText(floatToNilai(line.nilai_curr));
					}
				}

				var modulGar = this.e_modul.getText();
				var data = this.dbLib.getDataProvider(
					"select a.kode_akun,b.nama as nama_akun,a.saldo,a.nilai,a.saldo-a.nilai as sakhir " +
					"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi " +
					"where a.no_bukti = '" + this.e_noreq.getText() + "' and a.modul='" + modulGar + "' order by a.kode_akun", true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows) {
						line = data.rs.rows[i];
						this.sg2.appendData([line.kode_akun, line.nama_akun, floatToNilai(line.saldo), floatToNilai(line.nilai), floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);

				var strSQL = "select no_urut,item,merk,tipe,catatan,jumlah,nilai,jumlah*nilai as total from log_pesan_d where no_pesan='" + this.e_noreq.getText() + "' and kode_lokasi='" + this.app._lokasi + "' order by no_urut";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg3.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg3.appendData([line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.nilai), floatToNilai(line2.total)]);
					}
				} else this.sg3.clear(1);

				this.sgUpld.clear(); this.sgFile.clear();
				var data = this.dbLib.getDataProvider(
					"select kode_jenis,no_gambar " +
					"from log_pesan_dok " +
					"where no_pesan = '" + this.e_noreq.getText() + "' and kode_lokasi='" + this.app._lokasi + "' order by nu", true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line;
					for (var i in data.rs.rows) {
						line = data.rs.rows[i];
						this.sgFile.appendData([line.no_gambar, "HAPUS"]);
						this.sgUpld.appendData([line.no_gambar, { filedest: line.no_gambar, tmpfile: line.no_gambar }, "DownLoad"]);
					}
				} else this.sgUpld.clear(1);


			}
		} catch (e) { alert(e); }
	},
	doLoad: function (sender) {
		var strSQL = "select a.tanggal,a.no_pesan,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,'LOGREQ' as modul,b.kode_pp+' | '+b.nama as pp,no_dokumen,a.keterangan,a.nilai,c.nik+' | '+c.nama as pembuat,a.no_terima " +
			"from log_pesan_m a " +
			"					 inner join pp b on a.kode_ppaju=b.kode_pp and a.kode_lokasi=b.kode_lokasi " +
			"                   inner join karyawan c on a.nik_ttd1=c.nik " +
			"where a.progress='1' and a.lok_proses='" + this.app._lokasi + "' and a.periode<='" + this.e_periode.getText() + "' " +
			"order by a.tanggal";

		var data = this.dbLib.getDataProvider(strSQL, true);
		if (typeof data == "object" && data.rs.rows[0] != undefined) {
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / 20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
	},
	doCari: function (sender) {
		var filter = "";
		if (this.c_status2.getText() == "INPROG") filter = " and a.progress = '1' ";
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '2' ";
		if (this.c_status2.getText() == "RETURN") filter = " and a.progress = 'L'  ";

		if (this.e_ket2.getText() != "") filter = " and a.no_pesan like '%" + this.e_ket2.getText() + "%' ";

		var strSQL = "select a.tanggal as due_date, a.no_pesan," +
			"case when a.progress = '1' then 'INPROG' " +
			"     when a.progress = '2' then 'APPROVE' " +
			"     when a.progress = 'L' then 'RETURN' " +
			"end as status," +
			"convert(varchar,a.tanggal,103) as tgl,'LOGREQ' as modul,b.kode_pp+' | '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' | '+c.nama as pembuat,a.no_terima " +
			"from log_pesan_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi " +
			"                   inner join karyawan c on a.nik_ttd1=c.nik " +
			"where a.periode='" + this.e_periode.getText() + "' and a.lok_proses='" + this.app._lokasi + "' " + filter + " " +
			"order by a.tanggal";

		var data = this.dbLib.getDataProvider(strSQL, true);
		if (typeof data == "object" && data.rs.rows[0] != undefined) {
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / 20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData: function (page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : start + 20);
		for (var i = start; i < finish; i++) {
			line = this.dataJU.rs.rows[i];
			this.sg.appendData([line.no_pesan, line.status.toUpperCase(), line.tgl, line.modul.toUpperCase(), line.pp, line.no_dokumen, line.keterangan, floatToNilai(line.nilai), line.pembuat, line.no_terima]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function (sender, page) {
		this.doTampilData(page);
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
								this.nama_report = "server_report_saku3_siaga_simlog_rptAppLog";
								this.filter2 = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_terima='" + this.e_nb.getText() + "' ";
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
								this.pc1.hide();
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Request : " + this.e_nb.getText() + ")", "");
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);
				this.clearLayar();
				this.pc1.show();
				break;
		}
	},
	clearLayar: function () {
		try {
			this.standarLib.clearByTag(this, new Array("0", "1", "9"), this.e_nb);
			this.sg2.clear(1); this.sg3.clear(1);
			this.doClick();
			this.doLoad();
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_status.setText("");
			setTipeButton(tbAllFalse);
		} catch (e) {
			alert(e);
		}
	}
});