window.app_saku3_transaksi_tu_proyekbaru_fPrBebanSch = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_tu_proyekbaru_fPrBebanSch.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tu_proyekbaru_fPrBebanSch";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form Akru Beban Schedule", 0);

		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 200, 20], caption: "Periode", readOnly: true, tag: 2, visible: false });
		this.l_tgl = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tanggal", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"] });

		this.pc3 = new pageControl(this, { bound: [20, 12, 1000, 430], childPage: ["Akru Beban", "List Akru"] });
		this.sg3 = new saiGrid(this.pc3.childPage[1], {bound: [1, 5, this.pc3.width - 5, this.pc3.height - 33], colCount: 4, tag: 9,
			colTitle: ["No Bukti", "Tanggal", "Keterangan", "Nilai"],
			colWidth: [[3, 2, 1, 0], [100, 300, 100, 100]],
			readOnly: true, colFormat: [[3], [cfNilai]],
			dblClick: [this, "doDoubleClick3"], autoAppend: false, defaultRow: 1
		});
		this.sgn3 = new portalui_sgNavigator(this.pc3.childPage[1], { bound: [1, this.pc3.height - 25, this.pc3.width - 1, 25], buttonStyle: 3, grid: this.sg3, pager: [this, "doPager3"] });
		this.bLoad3 = new portalui_imageButton(this.sgn3, { bound: [this.sgn3.width - 25, 2, 22, 22], image: "icon/" + system.getThemes() + "/reload.png", hint: "Load Data", click: [this, "doLoad3"] });

		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[0], { bound: [20, 13, 202, 20], caption: "No Bukti", maxLength: 30, readOnly: true });
		this.i_gen = new portalui_imageButton(this.pc3.childPage[0], { bound: [225, 13, 20, 20], hint: "Generate", image: "icon/" + system.getThemes() + "/tabCont2.png", click: [this, "doClick"] });
		this.e_totbeban = new portalui_saiLabelEdit(this.pc3.childPage[0], { bound: [790, 13, 200, 20], caption: "Total Beban", tipeText: ttNilai, text: "0", readOnly: true });
		this.e_ket = new portalui_saiLabelEdit(this.pc3.childPage[0], { bound: [20, 14, 450, 20], caption: "Keterangan", maxLength: 150 });
		this.e_totbdd = new portalui_saiLabelEdit(this.pc3.childPage[0], { bound: [790, 14, 200, 20], caption: "Total BDD", tipeText: ttNilai, text: "0", readOnly: true });
		this.cb_app = new portalui_saiCBBL(this.pc3.childPage[0], { bound: [20, 15, 222, 20], caption: "NIK Approve", tag: 2, multiSelection: false });
		this.e_totbmhd = new portalui_saiLabelEdit(this.pc3.childPage[0], { bound: [790, 15, 200, 20], caption: "Total BMHD", tipeText: ttNilai, text: "0", readOnly: true });
		this.bTampil = new portalui_button(this.pc3.childPage[0], { bound: [690, 15, 80, 18], caption: "Tampil", click: [this, "doTampilClick"] });

		this.pc1 = new pageControl(this.pc3.childPage[0], { bound: [1, 12, 995, 328], childPage: ["Daftar Beban"] });

		//kolom ---> "Nilai Schedule","Realisasi Beban","Nilai BMHD" hanya untuk tampilan saja (duplikasi dr kol seblmnya yg hasil hitungan)		
		this.sg1 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 16, tag: 9,
			colTitle: ["ID Proyek", "Periode Sch", "Deskripsi", "Akun Beban", "Akun BDD", "Akun BMHD", "PP", "DRK", "Saldo Beban Sch", "Saldo BDD", "Ni Rekls BDD", "Nilai BMHD", "Rev Saldo BMHD",
				"Nilai Schedule", "Realisasi Beban", "Nilai BMHD"],
			colWidth: [[15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100, 100, 100, 100, 100, 100, 100, 100, 80, 100, 80, 80, 80, 300, 80, 150]],
			colHide: [[3, 4, 5, 7, 8, 9, 10, 11, 12], [true, true, true, true, true, true, true, true, true]],
			colFormat: [[8, 9, 10, 11, 12, 13, 14, 15], [cfNilai, cfNilai, cfNilai, cfNilai, cfNilai, cfNilai, cfNilai, cfNilai]], readOnly: true, autoAppend: false, defaultRow: 1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

		this.rearrangeChild(10, 23);
		this.pc3.childPage[0].rearrangeChild(10, 23);

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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1, this.dp_d1.year, this.dp_d1.month, this.dp_d1.day);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif ='1' and a.kode_lokasi='" + this.app._lokasi + "' ", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data Karyawan", true);
		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fPrBebanSch.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_proyekbaru_fPrBebanSch.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0, 2])) {
				try {
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from trans_j where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");

						sql.add("delete from prb_prbeban_d where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from prb_bmhd_d where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("update prb_prbeban_d set no_ref1='-' where no_ref1 = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values " +
						"('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','SCHBEBAN','BEBAN','F','-','-','" + this.app._kodePP + "','" + this.dp_d1.getDateString() + "','-','" + this.e_ket.getText() + "','IDR',1," + parseNilai(this.e_totbeban.getText()) + ",0,0,'" + this.app._userLog + "','" + this.app._userLog + "','-','-','-','-','-','-','UMUM')");

					for (var i = 0; i < this.dataJU.rs.rows.length; i++) {
						var line = this.dataJU.rs.rows[i];
						//reverse prb_prbeban_d yang belum sampe kasbank(hanya AJUBEBAN, BDD tidak ikut), 
						//aggregate by periode_sch dan modulnya. akun dll diabaikan krn blm jurnal final di kasbanknya
						sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) " +
							"select '" + this.e_nb.getText() + "','" + this.app._lokasi + "','" + this.e_periode.getText() + "',periode_sch,'" + this.dp_d1.getDateString() + "','REVERSE','REVERSE','REVERSE','" + this.e_ket.getText() + "','C',sum(a.nilai),getdate(),'" + line.kode_proyek + "',a.modul,'" + this.e_nb.getText() + "','NONITAJU' " +
							"from prb_prbeban_d a inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.no_kas='-' " +
							"where a.modul='AJUBEBAN' and a.kode_proyek='" + line.kode_proyek + "' and periode_sch='" + line.periode + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
							"group by a.periode_sch,a.modul");

						//update no_ref1 sbg flag untuk AJUBEBAN yg belum di kasbank-an
						sql.add("update a set a.no_ref1='" + this.e_nb.getText() + "' " +
							"from prb_prbeban_d a left join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.no_kas<>'-' " +
							"where b.no_aju is null and a.no_ref1='-' and a.modul='AJUBEBAN' and a.periode_sch='" + this.e_periode.getText() + "' and a.kode_proyek='" + line.kode_proyek + "' and a.kode_lokasi='" + this.app._lokasi + "'");

						sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values " +
							"('" + this.e_nb.getText() + "','" + this.app._lokasi + "','" + this.e_periode.getText() + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','" + line.akun_beban + "','" + line.kode_pp + "','" + line.kode_proyek + "','" + this.e_ket.getText() + "','D'," + nilaiToFloat(line.saldo_beban) + ",getdate(),'" + line.kode_proyek + "','AJUBEBAN','" + this.e_nb.getText() + "','NONITAJU')");

						if (parseFloat(line.saldo_beban) != 0) 
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values " +
									"('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + line.kode_proyek + "','" + this.dp_d1.getDateString() + "',0,'" + line.akun_beban + "','D'," + parseNilai(line.saldo_beban) + "," +
									parseNilai(line.saldo_beban) + ",'" + this.e_ket.getText() + "','SCHBEBAN','BEBAN','IDR',1,'" + line.kode_pp + "','" + line.kode_drkb + "','-','-','-','-','-','-','-')");

						if (parseFloat(line.nilai_bdd) != 0) {
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + line.kode_proyek + "','" + this.dp_d1.getDateString() + "',0,'" + line.akun_bdd + "','C'," + parseNilai(line.nilai_bdd) + "," +
								parseNilai(line.nilai_bdd) + ",'" + this.e_ket.getText() + "','SCHBEBAN','BDD','IDR',1,'" + line.kode_pp + "','-','-','-','-','-','-','-','-')");

							sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "','" + this.e_periode.getText() + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','" + line.akun_bdd + "','" + line.kode_pp + "','-','" + this.e_ket.getText() + "','C'," + nilaiToFloat(line.nilai_bdd) + ",getdate(),'" + line.kode_proyek + "','BDD','-','NONITAJU')");
						}
						if (parseFloat(line.nilai_bmhd) != 0) {
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + line.kode_proyek + "','" + this.dp_d1.getDateString() + "',0,'" + line.akun_bmhd + "','C'," + parseNilai(line.nilai_bmhd) + "," +
								parseNilai(line.nilai_bmhd) + ",'" + this.e_ket.getText() + "','SCHBEBAN','BMHD','IDR',1,'" + line.kode_pp + "','-','-','-','-','-','-','-','-')");

							sql.add("insert into prb_bmhd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','" + line.akun_bmhd + "','" + line.kode_pp + "','" + this.e_ket.getText() + "','D'," + nilaiToFloat(line.nilai_bmhd) + ",getdate(),'" + line.kode_proyek + "','SCHBEBAN','-')");
						}

						if (parseFloat(line.rev_bmhd) != 0) {
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + line.kode_proyek + "','" + this.dp_d1.getDateString() + "',0,'" + line.akun_bmhd + "','D'," + parseNilai(line.rev_bmhd) + "," +
								parseNilai(line.rev_bmhd) + ",'" + this.e_ket.getText() + "','SCHBEBAN','REVBMHD','IDR',1,'" + line.kode_pp + "','-','-','-','-','-','-','-','-')");

							sql.add("insert into prb_bmhd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','" + line.akun_bmhd + "','" + line.kode_pp + "','" + this.e_ket.getText() + "','C'," + nilaiToFloat(line.rev_bmhd) + ",getdate(),'" + line.kode_proyek + "','SCHBEBAN','-')");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"), this.e_nb);
					this.sg1.clear(1); this.sg3.clear(1);
					this.bTampil.setVisible(true);
				}
				break;
			case "simpan":
			case "ubah":
				this.preView = "1";
				if (nilaiToFloat(this.e_totbeban.getText()) <= 0) {
					system.alert(this, "Transaksi tidak valid.", "Total Beban tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (nilaiToFloat(this.e_totbeban.getText()) != (nilaiToFloat(this.e_totbdd.getText()) + nilaiToFloat(this.e_totbmhd.getText()))) {
					system.alert(this, "Transaksi tidak valid.", "Total Jurnal tidak Balance (Beban = BDD + BMHD).");
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
				else this.simpan();
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
					sql.add("delete from trans_m where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("delete from trans_j where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("delete from prb_prbeban_d where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("delete from prb_bmhd_d where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("update prb_prbeban_d set no_ref1='-' where no_ref1 = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				break;
		}
	},
	doSelectDate: function (sender, y, m, d) {
		if (m < 10) m = "0" + m;
		this.e_periode.setText(y + "" + m);

		this.sg1.clear(1);
		this.e_totbeban.setText("0");
		this.e_totbdd.setText("0");
		this.e_totbmhd.setText("0");
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick: function (sender) {
		if (this.stsSimpan == 0) {
			this.sg1.clear(1); this.sg3.clear(1);
			this.bTampil.setVisible(true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "trans_m", "no_bukti", this.app._lokasi + "-PRB" + this.e_periode.getText().substr(2, 4) + ".", "0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},
	doTampilClick: function (sender) {
		try {
			/*	
			data yang tampil adalah per periode (=periode) tidak <= periode,
			sebab saldo bdd tidak ada periodenya shg tidak bisa di selisihkan

			nilai beban yang dijurnal adalah nilai dari saldo beban di sch (posisi debet) dgn syarat pengajuannya (it_aju_m) mesti bersyarat sudah dibayar (selesai)
			nilai bdd = jika saldo bdd nya lebih besar dari saldo beban sch, ambil nilai saldo beban sch sbg nilai bdd-nya
			            jika saldo bdd lebih kecil dari saldo beban sch, ambil saldo bdd sbg nilai bdd-nya
			nilai bmhd = saldo beban - nilai bdd
			*/

			if (this.e_periode.getText() != "") {
				if (this.stsSimpan == 1) var vJoinTrans = " ";
				else var vJoinTrans = " inner join prb_prbeban_d xx on a.kode_proyek=xx.kode_proyek and a.periode=xx.periode_sch and a.kode_lokasi=xx.kode_lokasi and xx.no_bukti='" + this.e_nb.getText() + "' and dc ='D' ";

				this.sg1.clear(1);
				var strSQL = "select a.kode_proyek,a.periode,b.nama,c.akun_beban,c.akun_bdd,c.akun_bmhd,b.kode_pp,c.kode_drkb " +
					",(a.nilai_beban - isnull(cc.totbeban_sch,0)) as saldo_beban " +
					",isnull(dd.totbdd,0)+isnull(ddd.totbdd,0) as saldo_bdd " +

					",case when (isnull(dd.totbdd,0)+isnull(ddd.totbdd,0)) >= (a.nilai_beban - isnull(cc.totbeban_sch,0)) then (a.nilai_beban - isnull(cc.totbeban_sch,0)) " +
					"      else (isnull(dd.totbdd,0)+isnull(ddd.totbdd,0)) end as nilai_bdd " +

					", (a.nilai_beban - isnull(cc.totbeban_sch,0)) - " +
					"  (case when (isnull(dd.totbdd,0)+isnull(ddd.totbdd,0)) >= (a.nilai_beban - isnull(cc.totbeban_sch,0)) then (a.nilai_beban - isnull(cc.totbeban_sch,0)) " +
					"   else (isnull(dd.totbdd,0)+isnull(ddd.totbdd,0)) end) as nilai_bmhd " +

					//",isnull(ee.revbmhd,0) as rev_bmhd " +
					",0 as rev_bmhd " +

					",a.nilai_beban, isnull(cc.totbeban_sch,0) as real_beban " +


					"from prb_proyek_d a " +
					"inner join prb_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi and b.versi='PRO20' " +
					"inner join prb_proyek_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi " +

					"  " + vJoinTrans + " " +

					//bersyarat = pengajuan yg sudah dibayar ditambah dgn pengajuan akruan -->(b.no_kas<>'-' or a.no_ref1<>'-')
					//dan tentunya periode kasbank nya harus <= periode sistem
					"left join (" +
					"		select a.kode_proyek,a.kode_lokasi,a.periode_sch,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as totbeban_sch " +
					"		from prb_prbeban_d a " +
					"		left join ( " +
					"				  select a.no_aju,a.no_kas,a.kode_lokasi " +
					"			      from it_aju_m a inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi " +
					"				  where b.kode_lokasi='" + this.app._lokasi + "' and b.periode<='" + this.e_periode.getText() + "' " +
					"				  ) b on a.no_bukti = b.no_aju and a.kode_lokasi=b.kode_lokasi " +
					"		where a.modul = 'AJUBEBAN' and a.kode_lokasi='" + this.app._lokasi + "' " +
					" 			  and a.periode = '" + this.e_periode.getText() + "' and a.no_bukti <> '" + this.e_nb.getText() + "' " +
					"			  and (  isnull(b.no_kas,'-') <> '-' or (a.no_ref1<>'-' and a.no_ref1<>'" + this.e_nb.getText() + "') ) " +
					"		group by a.kode_proyek,a.kode_lokasi,a.periode_sch " +
					") cc on a.kode_proyek=cc.kode_proyek and a.periode=cc.periode_sch and a.kode_lokasi=cc.kode_lokasi " +

					//bersyarat sudah dibayar
					//dan periode kas nya <= periode
					"left join (" +
					"		select a.kode_proyek,a.kode_lokasi,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as totbdd " +
					"		from prb_prbeban_d a " +
					"			 inner join ( " +
					"					select a.*   " +
					"				    from it_aju_m a inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi " +
					" 					where b.kode_lokasi='" + this.app._lokasi + "' and b.periode<='" + this.e_periode.getText() + "' " +
					"			        ) b on a.no_bukti = b.no_aju and a.kode_lokasi=b.kode_lokasi " +
					"		where a.jenis='ITAJU' and a.periode <= '" + this.e_periode.getText() + "' and a.modul='BDD' and a.kode_lokasi='" + this.app._lokasi + "' and a.no_bukti<>'" + this.e_nb.getText() + "' " +
					"		group by a.kode_proyek,a.kode_lokasi " +
					") dd on a.kode_proyek=dd.kode_proyek and a.kode_lokasi=dd.kode_lokasi " +

					"left join (" +
					"		select a.kode_proyek,a.kode_lokasi,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as totbdd " +
					"		from prb_prbeban_d a " +
					"		where a.jenis='NONITAJU' and a.periode <= '" + this.e_periode.getText() + "' and a.modul='BDD' and a.kode_lokasi='" + this.app._lokasi + "' and a.no_bukti<>'" + this.e_nb.getText() + "' " +
					"		group by a.kode_proyek,a.kode_lokasi " +
					") ddd on a.kode_proyek=ddd.kode_proyek and a.kode_lokasi=ddd.kode_lokasi " +

					//reverse saldo bmhd (transaksi sebelumnya yang lawannya sisa beban sch) 
					//tidak jadi logic ini (sep2019) --> supaya tidak double jurnal beban gantung dgn periode sebelumnya (sch).. saldo bmhd tidak boleh dipakai transaksi --> hnya boleh reverse
					//periode yg bisa direvese adalah dalam tahun yg sama (andin-april2019)
					
					/* -- dipisahkan form reverse nya: 5/6/20 --zoom
					"left join (" +
					"		select a.kode_proyek,a.kode_lokasi,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as revbmhd " +
					"		from prb_bmhd_d a " +
					"		where a.periode <= '" + this.e_periode.getText() + "' and a.periode like '" + this.e_periode.getText().substr(0, 4) + "%' and a.kode_lokasi='" + this.app._lokasi + "' and a.no_bukti<>'" + this.e_nb.getText() + "' " +
					"		group by a.kode_proyek,a.kode_lokasi " +
					") ee on a.kode_proyek=ee.kode_proyek and a.kode_lokasi=ee.kode_lokasi " +
					*/

					"where a.periode = '" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
					"order by a.kode_proyek,a.periode";


				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / 20));
					this.sgn1.rearrange();
					this.doTampilData(1);

					var totbeban = totbdd = totbmhd = 0;
					for (var i = 0; i < this.dataJU.rs.rows.length; i++) {
						line = this.dataJU.rs.rows[i];
						totbeban = totbeban + parseFloat(line.saldo_beban);
						totbdd = totbdd + parseFloat(line.nilai_bdd);
						totbmhd = totbmhd + parseFloat(line.nilai_bmhd);
					}

					this.e_totbeban.setText(floatToNilai(totbeban));
					this.e_totbdd.setText(floatToNilai(totbdd));
					this.e_totbmhd.setText(floatToNilai(totbmhd));
				} else this.sg1.clear(1);

				this.pc1.setActivePage(this.pc1.childPage[0]);
			}
			else {
				system.alert(this, "Periode harus valid.", "Filter dari tanggal transaksi.");
				this.sg1.clear(1);
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	},
	doPager: function (sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function (page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : start + 20);
		for (var i = start; i < finish; i++) {
			line = this.dataJU.rs.rows[i];
			this.sg1.appendData([line.kode_proyek, line.periode, line.nama, line.akun_beban, line.akun_bdd, line.akun_bmhd, line.kode_pp, line.kode_drkb, nilaiToFloat(line.saldo_beban), nilaiToFloat(line.saldo_bdd), nilaiToFloat(line.nilai_bdd), floatToNilai(line.nilai_bmhd), floatToNilai(line.rev_bmhd),
			nilaiToFloat(line.nilai_beban), nilaiToFloat(line.real_beban), nilaiToFloat(line.nilai_bmhd)]);
		}
		this.sg1.setNoUrut(start);
	},
	doRequestReady: function (sender, methodName, result) {
		if (sender == this.dbLib) {
			try {
				switch (methodName) {
					case "execArraySQL":
						if (result.toLowerCase().search("error") == -1) {
							if (this.preView == "1") {
								this.nama_report = "server_report_saku3_tu_proyek_rptAkruBebanJurnal";
								this.filter2 = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_bukti='" + this.e_nb.getText() + "' ";
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
								this.pc3.hide();
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
						}
						else {
							if (result.toLowerCase().search("primary key") == -1) {
								alert(error);
							}
							else this.simpan();
						}
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
				this.pc3.show();
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
			this.sg1.clear(1); this.sg3.clear(1);
			this.pc3.setActivePage(this.pc3.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.bTampil.setVisible(true);
			this.stsSimpan = 1;
			this.doClick();
		} catch (e) {
			alert(e);
		}
	},
	doLoad3: function (sender) {
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 " +
			"from trans_m a " +
			"where a.kode_lokasi='" + this.app._lokasi + "' and a.periode='" + this.e_periode.getText() + "' and a.posted='F' and a.modul='SCHBEBAN'";
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
			this.sg3.appendData([line.no_bukti, line.tgl, line.keterangan, floatToNilai(line.nilai1)]);
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function (sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function (sender, col, row) {
		try {
			if (this.sg3.cells(0, row) != "") {
				this.pc3.setActivePage(this.pc3.childPage[0]);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg3.cells(0, row));
				this.bTampil.setVisible(false);

				var strSQL = "select * from trans_m " +
					"where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik1);
					}
				}
				this.doTampilClick();
				this.pc1.setActivePage(this.pc1.childPage[0]);
			}
		} catch (e) { alert(e); }
	}
});