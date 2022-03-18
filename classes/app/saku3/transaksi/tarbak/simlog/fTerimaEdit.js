window.app_saku3_transaksi_tarbak_simlog_fTerimaEdit = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_tarbak_simlog_fTerimaEdit.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tarbak_simlog_fTerimaEdit";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form Penerimaan Barang", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 202, 20], caption: "Periode", tag: 2, readOnly: true, visible: false });
		this.l_tgl1 = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tanggal", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"] });

		this.pc2 = new pageControl(this, { bound: [10, 10, 1000, 440], childPage: ["Data Penerimaan", "List Penerimaan"] });
		this.sg3 = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 33], colCount: 5, tag: 9,
			colTitle: ["No Bukti", "Tanggal", "Deskripsi", "Vendor", "Pilih"],
			colWidth: [[4, 3, 2, 1, 0], [70, 200, 310, 80, 100]], readOnly: true,
			colFormat: [[4], [cfButton]],
			click: [this, "doSgBtnClick3"], colAlign: [[4], [alCenter]],
			dblClick: [this, "doDoubleClick3"], autoAppend: false, defaultRow: 1
		});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 3, grid: this.sg3, pager: [this, "doPager3"] });
		this.bLoad3 = new portalui_imageButton(this.sgn3, { bound: [this.sgn3.width - 25, 2, 22, 22], image: "icon/" + system.getThemes() + "/reload.png", hint: "Load Data", click: [this, "doLoad3"] });

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 202, 20], caption: "No Bukti", maxLength: 30, readOnly: true });
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0], { bound: [225, 12, 20, 20], hint: "Generate", image: "icon/" + system.getThemes() + "/tabCont2.png", click: [this, "doClick"] });
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 16, 450, 20], caption: "No Dokumen", maxLength: 50 });
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 17, 450, 20], caption: "Deskripsi", maxLength: 150 });
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0], { bound: [20, 14, 220, 20], caption: "Vendor", multiSelection: false, maxLength: 10, tag: 1, change: [this, "doChange"] });
		this.cb_po = new saiCBBL(this.pc2.childPage[0], { bound: [20, 15, 220, 20], caption: "No SPK", multiSelection: false, maxLength: 10, tag: 1, change: [this, "doChange"] });
		this.cb_buat = new saiCBBL(this.pc2.childPage[0], { bound: [20, 17, 220, 20], caption: "Penerima", multiSelection: false, maxLength: 10, tag: 2 });
		this.e_pic = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 16, 450, 20], caption: "Pengirim", maxLength: 50 });
		this.bGen = new button(this.pc2.childPage[0], { bound: [875, 16, 80, 18], caption: "Gen Detail", click: [this, "doDetail"] });

		this.pc1 = new pageControl(this.pc2.childPage[0], { bound: [1, 12, 996, 246], childPage: ["Item SPK", "Detail Barang", "File Dok"] });
		this.sg = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 15,
			colTitle: ["ID Barang", "Item Barang", "Merk", "Tipe", "Kode Klp", "Nama Klp", "Jenis", "Harga PO", "Harga Final", "Sisa SPK", "Jml Terima", "Kd Lok", "Nm Lokasi", "Formt Barcode","Idx"],
			colWidth: [[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [50, 100, 150, 80, 70, 70, 100, 100, 80, 150, 70, 160, 130, 200, 110]],
			colHide: [[0, 6], [true, true]],
			colFormat: [[7, 8, 9, 10], [cfNilai, cfNilai, cfNilai, cfNilai]],
			columnReadOnly: [true, [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13], [8, 10, 11]],
			buttonStyle: [[11], [bsEllips]],
			change: [this, "doChangeCell"], ellipsClick: [this, "doEllipsClick"], cellEnter:[this,"doCellEnter"],
			autoAppend: false, defaultRow: 1
		});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg });

		this.sg2 = new saiGrid(this.pc1.childPage[1], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 11,
			colTitle: ["ID PO", "ID Barang", "Item Barang", "Merk", "Tipe", "No Seri", "Harga", "Klp Aset", "Jenis", "KdLok", "Nama Lokasi"],
			colWidth: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [150, 80, 80, 80, 100, 200, 170, 140, 200, 120, 120]],
			colFormat: [[6], [cfNilai]],
			columnReadOnly: [true, [0, 1, 2, 3, 4, 6, 7, 8, 10], [5, 9]],
			buttonStyle: [[9], [bsEllips]],
			change: [this, "doChangeCell2"], ellipsClick: [this, "doEllipsClick2"],
			autoAppend: false, defaultRow: 1
		});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg2, pager: [this, "selectPage"] });

		this.sgUpld = new saiGrid(this.pc1.childPage[2], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 5,
			colTitle: ["Kd Jenis", "Jenis Dokumen", "Path File", "Upload", "DownLoad"],
			colWidth: [[4, 3, 2, 1, 0], [80, 80, 480, 200, 80]],
			columnReadOnly: [true, [0, 1, 2, 3, 4], []],
			colFormat: [[3, 4], [cfUpload, cfButton]],
			buttonStyle: [[0], [bsEllips]],
			click: [this, "doSgBtnClick"], colAlign: [[4], [alCenter]],
			ellipsClick: [this, "doEllipsClickDok"], readOnly: true, change: [this, "doGridChange"], rowCount: 1, tag: 9
		});
		this.sgUpld.setUploadParam([3], "uploadTo", "server/media/", "object", "server/media/");
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 1, grid: this.sgUpld });

		this.sgFile = new saiGrid(this.pc1.childPage[2], {
			bound: [40, 50, 300, 100], colCount: 2, tag: 9, visible: false,
			colTitle: ["namaFile", "status"],
			colWidth: [[1, 0], [80, 180]],
			readOnly: true, autoAppend: false, defaultRow: 1
		});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);

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
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1, this.dp_d1.year, this.dp_d1.month, this.dp_d1.day);

			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='" + this.app._userLog + "' and kode_lokasi='" + this.app._lokasi + "'", true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line = data.rs.rows[0];
				this.cb_buat.setText(line.nik, line.nama);
			} else this.cb_buat.setText("", "");

			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='" + this.app._lokasi + "'", ["kode_vendor", "nama"], false, ["Kode", "Nama"], "and", "Data Vendor", true);
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a " +
				"where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);

			var sql = new server_util_arrayList();
			sql.add("select kode_lok,nama from fa_lokasi where kode_lokasi = '" + this.app._lokasi + "'");
			this.dbLib.getMultiDataProviderA(sql);

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simlog_fTerimaEdit.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simlog_fTerimaEdit.implement({
	doGridChange: function (sender, col, row, param1, result, data) {
		try {
			if (sender == this.sgUpld && col == 3) {
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles += ";";
				this.uploadedFiles += this.rootDir + "/" + this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2, row, data.tmpfile);
				this.sgUpld.cells(4, row, "DownLoad");
			}
		} catch (e) {
			alert(e + " " + data);
		}
	},
	doEllipsClickDok: function (sender, col, row) {
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
	},
	doSgBtnClick: function (sender, col, row) {
		try {
			if (col === 4)
				window.open("server/media/" + this.sgUpld.getCell(2, row));
		} catch (e) {
			alert(e);
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
						sql.add("delete from log_terima_m where no_terima = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from fa_asset where no_baps='" + this.e_nb.getText() + "'");
						sql.add("delete from fa_nilai where no_bukti='" + this.e_nb.getText() + "'");
						sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					}

					if (this.sg.getRowValidCount() > 0) {
						for (var i = 0; i < this.sg.getRowCount(); i++) {
							if (this.sg.rowValid(i)) {
								sql.add("update log_spk_d set harga = "+nilaiToFloat(this.sg.cells(8,i))+" where no_urut="+this.sg.cells(14,i)+" and no_spk='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}

					sql.add("insert into log_terima_m(no_terima,kode_lokasi,tgl_input,nik_user,periode,tanggal,no_dokumen,keterangan,kode_vendor,no_po,nik_buat,nik_app,pengirim) values " +
						    "('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','"+this.e_dok.getText()+"','" + this.e_ket.getText() + "','" + this.cb_vendor.getText() + "','" + this.cb_po.getText() + "','" + this.cb_buat.getText() + "','" + this.cb_buat.getText() + "','" + this.e_pic.getText() + "')");

					if (this.sg2.getRowValidCount() > 0) {
						for (var i = 0; i < this.sg2.getRowCount(); i++) {
							if (this.sg2.rowValid(i)) {
								sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,no_baps,kode_lokfa,nik_pnj,no_po,id_pesan,kode_vendor,tgl_baps,kode_unit,jenis,catatan) values " +
									"('" + this.sg2.cells(1, i) + "','" + this.sg2.cells(1, i) + "','" + this.app._lokasi + "','" + this.sg2.cells(7, i) + "','-','-',0,0,'" + this.sg2.cells(2, i) + "','" + this.sg2.cells(3, i) + "','" + this.sg2.cells(4, i) + "','" + this.sg2.cells(5, i) + "'," + nilaiToFloat(this.sg2.cells(6, i)) + ",1,'-','-','" + this.dp_d1.getDateString() + "','" + this.dp_d1.getDateString() + "','" + this.e_periode.getText() + "','" + this.e_periode.getText() + "','1','" + this.app._userLog + "',getdate(),'" + this.e_nb.getText() + "','" + this.sg2.cells(9, i) + "','-','" + this.cb_po.getText() + "','" + this.sg2.cells(0, i) + "','" + this.cb_vendor.getText() + "','" + this.dp_d1.getDateString() + "','-','" + this.sg2.cells(8, i) + "','-')");

								sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values " +
									"('" + this.sg2.cells(1, i) + "','" + this.app._lokasi + "','" + this.e_nb.getText() + "','D'," + nilaiToFloat(this.sg2.cells(6, i)) + ",'" + this.e_periode.getText() + "')");
							}
						}
					}

					sql.add("update a set a.nilai_susut=round(a.nilai/c.umur,0), a.kode_klpakun=c.kode_klpakun, a.kode_akun=c.kode_akun, a.umur=c.umur, a.persen=c.persen, a.kode_pp=f.kode_pp, a.kode_pp_susut=f.kode_pp, a.kode_drk=f.kode_drk " +
						"from fa_asset a inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi " +
						"                inner join fa_klpakun c on b.kode_klpakun=c.kode_klpakun and a.kode_lokasi=c.kode_lokasi " +
						"                inner join log_spk_d d on a.id_pesan=d.no_spk+'-'+cast(d.no_urut as varchar) and a.no_po=d.no_spk " +
						"				 inner join log_spk_m e on d.no_spk=e.no_spk and d.kode_lokasi=e.kode_lokasi " +
						"                inner join log_pesan_m f on f.no_pesan=e.no_pesan and e.kode_lokasi=f.kode_lokasi " +
						"where a.no_baps='" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'");

					//dokumen						
					var ix = 0;
					for (var i = 0; i < this.sgUpld.getRowCount(); i++) {
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2, i) != "-") {
							for (var j = 0; j < this.sgFile.getRowCount(); j++) {
								if (this.sgUpld.cells(2, i) == this.sgFile.cells(0, j)) {
									this.sgFile.cells(1, j, "PAKAI");
								}
							}
							sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi,no_ref)values('" + this.e_nb.getText() + "','" + this.sgUpld.cells(3, i).tmpfile + "','" + ix + "','" + this.sgUpld.cells(0, i) + "','" + this.app._lokasi + "','" + this.cb_po.getText() + "')");
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
				this.sg.clear(1); this.sg2.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbSimpan);
				break;
			case "simpan":
			case "ubah":
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (this.sg.getRowValidCount() > 0) {
					for (var i = 0; i < this.sg.getRowCount(); i++) {
						if (this.sg.rowValid(i) && (nilaiToFloat(this.sg.cells(5, i)) < nilaiToFloat(this.sg.cells(6, i)))) {
							var j = i + 1;
							system.alert(this, "Jumlah terima baris " + j + " tidak valid.", "Jumlah terima melebihi sisa PO/SPK.");
							return false;
						}
					}
				}
				this.simpan();
				break;
			case "simpancek": this.simpan();
				break;
			case "hapus":
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from log_terima_m where no_terima = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from fa_asset where no_baps='" + this.e_nb.getText() + "'");
				sql.add("delete from fa_nilai where no_bukti='" + this.e_nb.getText() + "'");
				sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);

				break;
		}
	},
	doSelectDate: function (sender, y, m, d) {
		if (m < 10) m = "0" + m;
		this.e_periode.setText(y + "" + m);
		if (this.stsSimpan == 1) this.doClick();
	},
	doDetail: function (sender) {
		this.sg2.clear();
		for (var i = 0; i < this.sg.getRowCount(); i++) {
			if (this.sg.cells(4, i) != "-" && this.sg.cells(11, i) != "-" && nilaiToFloat(this.sg.cells(10, i)) > 0) {
				if (nilaiToFloat(this.sg.cells(10, i)) > nilaiToFloat(this.sg.cells(9, i))) {
					this.sg2.clear(1);
					var k = i + 1;
					system.alert(this, "Jumlah terima baris " + k + " tidak valid.", "Jumlah terima melebihi sisa SPK.");
					return false;
				}
				else {
					var nuAkhir = 0;
					var formatID = this.sg.cells(13, i);
					var lFormatID = formatID.length;
					//0102036abcd

					var strSQL = "select isnull(max(no_fa),0) as no_fa from fa_asset where no_fa like '" + formatID + "____'";
					var data = this.dbLib.getDataProvider(strSQL, true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];
						if (line != undefined) {
							nuAkhir = parseFloat(line.no_fa.substr(line.no_fa.length - 4, 4));
						}
					}

					for (var k = 0; k < this.sg2.getRowCount(); k++) {
						if (this.sg2.rowValid(k)) {
							if (formatID == this.sg2.cells(1, k).substr(0, lFormatID)) nuAkhir = parseFloat(this.sg2.cells(1, k).substr(this.sg2.cells(1, k).length - 4, 4));
						}
					}

					for (var j = 0; j < nilaiToFloat(this.sg.cells(10, i)); j++) {
						var k = nuAkhir + j + 1;
						var idx = k.toString();
						if (idx.length == 1) var nu = "000" + idx;
						if (idx.length == 2) var nu = "00" + idx;
						if (idx.length == 3) var nu = "0" + idx;
						if (idx.length == 4) var nu = idx;

						var noTag = formatID + nu;
						this.sg2.appendData([this.sg.cells(0, i), noTag, this.sg.cells(1, i), this.sg.cells(2, i), this.sg.cells(3, i), "-", this.sg.cells(8, i), this.sg.cells(4, i), this.sg.cells(6, i), this.sg.cells(11, i), this.sg.cells(12, i)]);
					}
				}
			}
		}
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doClick: function (sender) {
		if (this.e_periode.getText() != "") {
			if (this.stsSimpan == 0) {
				this.sg.clear(1); this.sg2.clear(1);
				this.sgUpld.clear(1); this.sgFile.clear(1);
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "log_terima_m", "no_terima", this.app._lokasi + "-TR" + this.e_periode.getText().substr(2, 4) + ".", "0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}
	},
	doChange: function (sender) {
		try {
			if ((sender == this.cb_vendor || sender == this.e_periode) && this.cb_vendor.getText() != "" && this.e_periode.getText() != "" && this.stsSimpan == 1) {
				this.sg.clear(1);
				this.sg2.clear(1);
				this.cb_po.setSQL("select distinct a.no_spk, a.keterangan from log_spk_m a " +
					"     inner join log_spk_d b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
					"     left join (" +
					"			select id_pesan,no_po,count(no_fa) as jml_terima " +
					"			from fa_asset where kode_lokasi='" + this.app._lokasi + "' " +
					"			group by id_pesan,no_po) d on d.id_pesan=b.no_spk+'-'+cast(b.no_urut as varchar) and d.no_po=b.no_spk " +
					"where a.periode<='" + this.e_periode.getText() + "' and b.jumlah-isnull(d.jml_terima,0)>0 and a.kode_vendor='" + this.cb_vendor.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'"
					, ["no_spk", "keterangan"], false, ["No SPK", "Keterangan"], "and", "Data SPK", true);
			}

			if (sender == this.cb_po && this.cb_po.getText() != "" && this.stsSimpan == 1) {
				this.e_ket.setText(this.cb_po.rightLabelCaption);
				var strSQL = "select a.no_spk+'-'+cast(a.no_urut as varchar) as id,a.item,a.merk,a.tipe,a.harga_po, harga,a.jumlah-isnull(d.jml_terima,0) as jumlah," +
					"'-' as kode_lok,'-' as nama_lok, c.kode_klpfa,c.nama as nama_klpfa,c.jenis,c.barcode,a.no_urut " +
					"from log_spk_d a " +
					"		inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
					"		inner join fa_klp c on a.kode_klpfa = c.kode_klpfa and c.kode_lokasi=a.kode_lokasi " +

					"       left join (select id_pesan,no_po,count(no_fa) as jml_terima " +
					"				   from fa_asset where no_po='" + this.cb_po.getText() + "' and kode_lokasi='" + this.app._lokasi + "' " +
					" 				   group by id_pesan,no_po) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk " +

					"where a.no_spk='" + this.cb_po.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
					"order by a.item";

				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg.appendData([line2.id, line2.item, line2.merk, line2.tipe, line2.kode_klpfa, line2.nama_klpfa, line2.jenis, floatToNilai(line2.harga_po), floatToNilai(line2.harga), floatToNilai(line2.jumlah), "0", "-", "-", line2.barcode, line2.no_urut]);
					}
				} else this.sg.clear(1);
			}
		}
		catch (e) {
			alert(e);
		}
	},
	doEllipsClick: function (sender, col, row) {
		try {
			if (sender == this.sg) {
				if (col == 11) {
					this.standarLib.showListData(this, "Daftar Lokasi", sender, undefined,
						"select kode_lok,nama from fa_lokasi where kode_lokasi ='" + this.app._lokasi + "' union select '-','-' ",
						"select count(*) from fa_lokasi where kode_lokasi ='" + this.app._lokasi + "'",
						["kode_lok", "nama"], "and", ["Kode", "Nama"], false);
				}
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	},
	doChangeCell: function (sender, col, row) {
		sender.onChange.set(undefined, undefined);
		if (col == 11) {
			if (this.sg.cells(11, row) != "") {
				var lokasi = this.dataLok.get(sender.cells(11, row));
				if (lokasi) sender.cells(12, row, lokasi);
				else {
					if (trim(sender.cells(11, row)) != "") system.alert(this, "Kode Lokasi " + sender.cells(11, row) + " tidak ditemukan", "Inputkan kode lainnya.", "checkAkun");
					sender.cells(11, row, "");
					sender.cells(12, row, "");
				}
			}
		}
		sender.onChange.set(this, "doChangeCell");
	},
	doCellEnter: function(sender, col, row){
		switch(col){		
			case 11 : 
					if (this.sg.cells(11,row) == "-") {
						this.sg.setCell(11,row,"");
					}
				break;										
		}
	},	
	doEllipsClick2: function (sender, col, row) {
		try {
			if (sender == this.sg2) {
				if (col == 9) {
					this.standarLib.showListData(this, "Daftar Lokasi", sender, undefined,
						"select kode_lok,nama from fa_lokasi where kode_lokasi ='" + this.app._lokasi + "'",
						"select count(*) from fa_lokasi where kode_lokasi ='" + this.app._lokasi + "'",
						["kode_lok", "nama"], "and", ["Kode", "Nama"], false);
				}
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function (sender, col, row) {
		sender.onChange.set(undefined, undefined);
		if (col == 9) {
			if (this.sg.cells(9, row) != "") {
				var lokasi = this.dataLok.get(sender.cells(9, row));
				if (lokasi) sender.cells(10, row, lokasi);
				else {
					if (trim(sender.cells(9, row)) != "") system.alert(this, "Kode Lokasi " + sender.cells(9, row) + " tidak ditemukan", "Inputkan kode lainnya.", "checkAkun");
					sender.cells(9, row, "");
					sender.cells(10, row, "");
				}
			}
		}
		sender.onChange.set(this, "doChangeCell2");
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
								this.nama_report = "server_report_saku2_kopeg_logistik_rptTerima";
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
							this.dataLok = new portalui_arrayMap();
							if (result.result[0]) {
								var line;
								for (var i in result.result[0].rs.rows) {
									line = result.result[0].rs.rows[i];
									this.dataLok.set(line.kode_lok, line.nama);
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
			this.sg.clear(1); this.sg2.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch (e) {
			alert(e);
		}
	},
	doLoad3: function (sender) {
		var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama " +
			"from log_terima_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi " +
			"where a.periode='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
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
			this.sg3.appendData([line.no_terima, line.tgl, line.keterangan, line.nama, "Pilih"]);
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function (sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function (sender, col, row) {
		try {
			if (col == 4) this.doDoubleClick3(this.sg3, 0, row);
		} catch (e) {
			alert(e);
		}
	},
	doDoubleClick3: function (sender, col, row) {
		try {
			if (this.sg3.cells(0, row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg3.cells(0, row));

				var strSQL = "select a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.kode_vendor,a.no_po,a.nik_buat,b.keterangan as ket_po,c.nama as nama_vendor,a.pengirim " +
					"from log_terima_m a inner join log_spk_m b on a.no_po=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
					"                    inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi " +
					"where a.no_terima='" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_vendor.setText(line.kode_vendor, line.nama_vendor);
						this.cb_po.setSQL("select a.no_spk, a.keterangan from log_spk_m a " +
							"where a.no_spk='" + line.no_po + "' and a.kode_lokasi='" + this.app._lokasi + "'", ["no_spk", "keterangan"], false, ["No SPK", "Keterangan"], "and", "Data SPK", true);
						this.cb_po.setText(line.no_po, line.ket_po);
						this.cb_buat.setText(line.nik_buat);
						this.e_pic.setText(line.pengirim);
					}
				}

				var strSQL = "select a.no_spk+'-'+cast(a.no_urut as varchar) as id,a.item,a.merk,a.tipe,a.harga_po,a.harga,a.jumlah-isnull(d.jml_terima,0) as jumlah,c.kode_klpfa,c.nama as nama_klpfa,c.jenis,e.jum_aset,c.barcode,a.no_urut " +
					"from log_spk_d a inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
					"                 inner join log_pesan_m bb on b.no_pesan=bb.no_pesan and b.kode_lokasi=bb.kode_lokasi " +
					"                 inner join fa_klp c on a.kode_klpfa = c.kode_klpfa and a.kode_lokasi=c.kode_lokasi " +

					"                 inner join (select id_pesan,no_po,count(no_fa) as jum_aset from fa_asset where kode_lokasi='" + this.app._lokasi + "' and no_baps='" + this.e_nb.getText() + "' and no_po='" + this.cb_po.getText() + "' group by id_pesan,no_po) e on e.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and e.no_po=a.no_spk " +
					"                 left join  (select id_pesan,no_po,count(no_fa) as jml_terima from fa_asset where kode_lokasi='" + this.app._lokasi + "' and no_baps<>'" + this.e_nb.getText() + "' and no_po='" + this.cb_po.getText() + "' group by id_pesan,no_po) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk " +
					"where a.no_spk='" + this.cb_po.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
					"order by a.item";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg.appendData([line2.id, line2.item, line2.merk, line2.tipe, line2.kode_klpfa, line2.nama_klpfa, line2.jenis, floatToNilai(line2.harga_po), floatToNilai(line2.harga), floatToNilai(line2.jumlah), floatToNilai(line2.jum_aset), "-", "-", line2.barcode, line2.no_urut]);
					}
				} else this.sg.clear(1);

				var strSQL = "select a.id_pesan,a.no_fa,a.nama,a.merk,a.tipe,a.no_seri,a.nilai,a.kode_akun,a.kode_klpfa,a.kode_unit,a.jenis,a.kode_lokfa,b.nama as namalok " +
					"from fa_asset a inner join fa_lokasi b on a.kode_lokfa=b.kode_lok and a.kode_lokasi=b.kode_lokasi " +
					"where a.no_baps='" + this.e_nb.getText() + "' and a.no_po='" + this.cb_po.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
					"order by a.no_fa";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg2.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg2.appendData([line2.id_pesan, line2.no_fa, line2.nama, line2.merk, line2.tipe, line2.no_seri, floatToNilai(line2.nilai), line2.kode_klpfa, line2.jenis, line2.kode_lokfa, line2.namalok]);
					}
				} else this.sg2.clear(1);

				this.sgUpld.clear(); this.sgFile.clear();
				var data = this.dbLib.getDataProvider(
					"select b.kode_jenis,b.nama,a.no_gambar " +
					"from log_pesan_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi " +
					"where a.no_pesan = '" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' order by a.nu", true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line;
					for (var i in data.rs.rows) {
						line = data.rs.rows[i];
						this.sgFile.appendData([line.no_gambar, "HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, { filedest: line.no_gambar, tmpfile: line.no_gambar }, "DownLoad"]);
					}
				} else this.sgUpld.clear(1);

			}
		} catch (e) { alert(e); }
	}
});