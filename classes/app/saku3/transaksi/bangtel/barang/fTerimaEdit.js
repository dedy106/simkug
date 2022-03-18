window.app_saku3_transaksi_bangtel_barang_fTerimaEdit = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_bangtel_barang_fTerimaEdit.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_bangtel_barang_fTerimaEdit";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form Penerimaan Barang", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 202, 20], caption: "Periode", tag: 2, readOnly: true, visible: false });
		this.l_tgl1 = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tanggal", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"] });

		this.pc2 = new pageControl(this, { bound: [10, 10, 1000, 440], childPage: ["Data Penerimaan", "List Penerimaan"] });
		this.sg3 = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 35], colCount: 5, tag: 9,
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
		this.cb_po = new saiCBBL(this.pc2.childPage[0], { bound: [20, 15, 220, 20], caption: "No PO", multiSelection: false, maxLength: 10, tag: 1, change: [this, "doChange"] });
		this.cb_buat = new saiCBBL(this.pc2.childPage[0], { bound: [20, 17, 220, 20], caption: "Penerima", multiSelection: false, maxLength: 10, tag: 2 });
		this.e_pic = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 16, 450, 20], caption: "Pengirim", maxLength: 50 });
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,16,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				

		this.pc1 = new pageControl(this.pc2.childPage[0], { bound: [1, 12, 996, 246], childPage: ["Item PO", "Data Proyek", "File Dok"] });
		this.sg = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 35], colCount: 8,
			colTitle: ["Kd Barang", "Nama Barang", "Satuan","Harga","Jml PO", "Jml Terima","SubTotal","Idx"],
			colWidth: [[ 7, 6, 5, 4, 3, 2, 1, 0], [50, 100, 100, 100, 100, 80, 300, 100]],
			//colHide: [[6], [true]],
			colFormat: [[3,4,5,6], [cfNilai, cfNilai, cfNilai, cfNilai]],
			//dibuat satu kali penerimaan tidak boleh nyicil.. 
			columnReadOnly: [true, [0, 1, 2, 3, 4, 5, 6, 7], []],			
			change: [this, "doChangeCell"], nilaiChange:[this,"doNilaiChange"],
			autoAppend: false, defaultRow: 1
		});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg });

		this.e_kodeproyek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Proyek", readOnly:true, tag:1});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true, tag:1});	
		this.e_kontrak = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"No Kontrak", readOnly:true, tag:1});	
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Customer", readOnly:true, tag:1});	
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Cabang", readOnly:true, tag:1});	
		
		this.e_spasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"", readOnly:true, tag:9, visible:false});	
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Akun BYMHD",readOnly:true, maxLength:10, tag:2});								
		this.cb_gudang = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:2});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 35], colCount: 5,
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
		this.pc1.childPage[1].rearrangeChild(10, 23);	

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

			this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
								"inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);

			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"where b.kode_flag = '004' and b.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);											

			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='" + this.app._lokasi + "'", ["kode_vendor", "nama"], false, ["Kode", "Nama"], "and", "Data Vendor", true);
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a " +
								"where a.flag_aktif='1' and a.kode_lokasi='" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Data NIK", true);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PBBMHD') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PBBMHD") this.akunBMHD = line.flag;																
				}
			}						

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_barang_fTerimaEdit.extend(window.childForm);
window.app_saku3_transaksi_bangtel_barang_fTerimaEdit.implement({
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
						sql.add("delete from brg_trans_d where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from trans_m where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from trans_j where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");						
						sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					}

					//dibuat satu kali penerimaan
					sql.add("insert into log_terima_m(no_terima,kode_lokasi,tgl_input,nik_user,periode,tanggal,no_dokumen,keterangan,kode_vendor,no_po,nik_buat,nik_app,pengirim,kode_gudang) values " +
						    "('" + this.e_nb.getText() + "','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','"+this.e_dok.getText()+"','" + this.e_ket.getText() + "','" + this.cb_vendor.getText() + "','" + this.cb_po.getText() + "','" + this.cb_buat.getText() + "','" + this.cb_buat.getText() + "','" + this.e_pic.getText() + "','"+this.cb_gudang.getText()+"')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){									
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGBELI','LOGTRM',"+i+",'"+this.cb_gudang.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(7,i)+"',getdate(),'"+this.sg.cells(2,i)+"','D',0,"+nilaiToFloat(this.sg.cells(5,i))+",0,"+nilaiToFloat(this.sg.cells(3,i))+",0,0,0,0,"+nilaiToFloat(this.sg.cells(6,i))+")");							
							}
						}
					}	

					//-------------- jurnal
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','MI','LOGTRM','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'"+this.app._userLog+"','-','-','-','-','-','-','"+this.cb_gudang.getText()+"','"+this.cb_akun.getText()+"')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.e_ket.getText()+"','LOGTRM','HUTANG','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
							
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select a.no_bukti,a.kode_lokasi,getdate(),'"+this.app._userLog+"',a.periode,'"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,c.akun_pers,'D',sum(a.total),sum(a.total),'"+this.e_ket.getText()+"','LOGTRM','BARANG','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-' "+
							"from brg_trans_d a "+
							"inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							"inner join brg_barangklp c on b.kode_klp=c.kode_klp and b.kode_lokasi=c.kode_lokasi "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.no_bukti,a.kode_lokasi,c.akun_pers,a.periode");


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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0", "1"), this.e_nb);
				this.sg.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='" + this.app._lokasi + "'", ["kode_vendor", "nama"], false, ["Kode", "Nama"], "and", "Data Vendor", true);
				setTipeButton(tbSimpan);
				break;
			case "simpan":
			case "ubah":
				this.preView = "1";				
				this.sg.validasi();				
				if (this.sg.getRowValidCount() > 0) {
					for (var i = 0; i < this.sg.getRowCount(); i++) {
						if (this.sg.rowValid(i) && (nilaiToFloat(this.sg.cells(4, i)) < nilaiToFloat(this.sg.cells(5, i)))) {
							var j = i + 1;
							system.alert(this, "Jumlah terima baris " + j + " tidak valid.", "Jumlah terima melebihi sisa PO.");
							return false;
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh sama/kurang dari nol.");
					return false;						
				}
				else this.simpan();
				break;
			case "simpancek": this.simpan();
				break;
			case "hapus":
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from log_terima_m where no_terima = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from brg_trans_d where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from trans_m where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from trans_j where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");						
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
	doClick: function (sender) {
		if (this.e_periode.getText() != "") {
			if (this.stsSimpan == 0) {
				this.sg.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
				this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='" + this.app._lokasi + "'", ["kode_vendor", "nama"], false, ["Kode", "Nama"], "and", "Data Vendor", true);
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
				this.cb_po.setSQL("select distinct a.no_spk, a.keterangan "+
					"from log_spk_m a " +
					"     inner join log_spk_d b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
					
					"     left join (" +
					"			select b.no_po,b.no_po+'-'+a.no_batch as id_pesan,sum(a.jumlah+a.bonus) as jml_terima " +
					"			from brg_trans_d a inner join log_terima_m b on a.no_bukti=b.no_terima and a.kode_lokasi=b.kode_lokasi "+
					"			where a.kode_lokasi='" + this.app._lokasi + "' " +
					"			group by b.no_po,b.no_po+'-'+a.no_batch) d on d.id_pesan=b.no_spk+'-'+cast(b.no_urut as varchar) and d.no_po=b.no_spk " +

					"where b.jumlah-isnull(d.jml_terima,0) > 0 and a.periode<='" + this.e_periode.getText() + "' and a.kode_vendor='" + this.cb_vendor.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'" 
					, ["no_spk", "keterangan"], false, ["No SPK", "Keterangan"], "and", "Data SPK", true);
			}

			if (sender == this.cb_po && this.cb_po.getText() != "" && this.stsSimpan == 1) {
				this.e_ket.setText(this.cb_po.rightLabelCaption);
				var strSQL = "select c.kode_barang,c.nama,c.sat_kecil,a.harga,a.jumlah-isnull(d.jml_terima,0) as sisa,a.no_urut,   a.harga * (a.jumlah-isnull(d.jml_terima,0)) as tot "+
					"from log_spk_d a " +
					"		inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
					"		inner join brg_barang c on a.kode_klpfa=c.kode_barang and a.kode_lokasi=c.kode_lokasi  "+
					
					"     left join (" +
					"			select b.no_po,b.no_po+'-'+a.no_batch as id_pesan,sum(a.jumlah+a.bonus) as jml_terima " +
					"			from brg_trans_d a inner join log_terima_m b on a.no_bukti=b.no_terima and a.kode_lokasi=b.kode_lokasi "+
					"			where a.kode_lokasi='" + this.app._lokasi + "' " +
					"			group by b.no_po,b.no_po+'-'+a.no_batch) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk " +

					"where a.no_spk='" + this.cb_po.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
					"order by a.no_urut";

				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg.appendData([line2.kode_barang, line2.nama, line2.sat_kecil, floatToNilai(line2.harga), floatToNilai(line2.sisa), floatToNilai(line2.sisa), floatToNilai(line2.tot) ,line2.no_urut]);
					}
				} else this.sg.clear(1);

				var strSQL = "select a.kode_proyek, a.nama, a.no_pks, b.nama as cust, d.nama as cabang, f.akun_bmhd "+
							"from spm_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							"				   inner join log_pesan_m c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+
							"				   inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
							"				   inner join log_spk_m e on c.no_pesan=e.no_pesan and e.kode_lokasi=c.kode_lokasi "+
							"				   inner join spm_proyek_jenis f on a.kode_jenis=f.kode_jenis and a.kode_lokasi=f.kode_lokasi "+
							"where e.no_spk ='"+this.cb_po.getText()+"' and e.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_kodeproyek.setText(line.kode_proyek);
						this.e_nama.setText(line.nama);
						this.e_kontrak.setText(line.no_pks);						
						this.e_cust.setText(line.cust);		
						this.e_cabang.setText(line.cabang);								
						this.cb_akun.setText(line.akun_bmhd);					
					}
					else {
						this.e_kodeproyek.setText("-");
						this.e_nama.setText("-");
						this.e_kontrak.setText("-");						
						this.e_cust.setText("-");	
						this.e_cabang.setText("-");		
						this.cb_akun.setText(this.akunBMHD);									
					}
				}

			}
		}
		catch (e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){		
		if (col == 5) {
			if (this.sg.cells(5,row) != "" && this.sg.cells(3,row) != "") {				
				this.sg.cells(6,row,parseFloat(nilaiToFloat(this.sg.cells(3,row))  * nilaiToFloat(this.sg.cells(5,row))));
			}
		}		
		this.sg.validasi();
		
	},
	doNilaiChange: function(){		
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){
					tot += nilaiToFloat(this.sg.cells(6,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[]::doNilaiChange:"+e);
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
								this.nama_report = "server_report_saku3_bangtel_barang_rptTerima";
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
			this.sg.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='" + this.app._lokasi + "'", ["kode_vendor", "nama"], false, ["Kode", "Nama"], "and", "Data Vendor", true);
		} catch (e) {
			alert(e);
		}
	},
	doLoad3: function (sender) {
		var strSQL = "select a.no_terima,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama " +
					 "from log_terima_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi " +
					 "					  inner join trans_m c on a.no_terima=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.posted='F' "+
					 "					  inner join log_spk_m d on a.no_po=d.no_spk and a.kode_lokasi=d.kode_lokasi and d.no_pakaibrg='-' "+
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

				var strSQL = "select a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.kode_vendor,a.no_po,a.nik_buat,b.keterangan as ket_po,c.nama as nama_vendor,a.pengirim,d.param2 as kode_gudang,d.param3 as akun_bmhd " +
					"from log_terima_m a inner join log_spk_m b on a.no_po=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
					"                    inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi " +
					"					 inner join trans_m d on a.no_terima=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
					"where a.no_terima='" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_buat.setText(line.nik_buat);
						this.e_pic.setText(line.pengirim);
						this.cb_gudang.setText(line.kode_gudang);
						this.cb_akun.setText(line.akun_bmhd);

						this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_vendor='"+line.kode_vendor+"' and kode_lokasi='" + this.app._lokasi + "'", ["kode_vendor", "nama"], false, ["Kode", "Nama"], "and", "Data Vendor", true);
						this.cb_vendor.setText(line.kode_vendor, line.nama_vendor);
						this.cb_po.setSQL("select a.no_spk, a.keterangan from log_spk_m a " +
										  "where a.no_spk='" + line.no_po + "' and a.kode_lokasi='" + this.app._lokasi + "'", ["no_spk", "keterangan"], false, ["No SPK", "Keterangan"], "and", "Data SPK", true);
						this.cb_po.setText(line.no_po, line.ket_po);	
						
						var strSQL = "select a.kode_proyek, a.nama, a.no_pks, b.nama as cust, d.nama as cabang "+
									"from spm_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
									"				   inner join log_pesan_m c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+
									"				   inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
									"				   inner join log_spk_m e on c.no_pesan=e.no_pesan and e.kode_lokasi=c.kode_lokasi "+
									"where e.no_spk ='"+this.cb_po.getText()+"' and e.kode_lokasi='"+this.app._lokasi+"'";						   
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){				
								this.e_kodeproyek.setText(line.kode_proyek);
								this.e_nama.setText(line.nama);
								this.e_kontrak.setText(line.no_pks);						
								this.e_cust.setText(line.cust);		
								this.e_cabang.setText(line.cabang);						
							}
							else {
								this.e_kodeproyek.setText("-");
								this.e_nama.setText("-");
								this.e_kontrak.setText("-");						
								this.e_cust.setText("-");	
								this.e_cabang.setText("-");											
							}
						}
					}
				}

				var strSQL = "select c.kode_barang,c.nama,c.sat_kecil,a.harga,a.jumlah-isnull(d.jml_terima,0) as sisa, z.jum,  z.jum * a.harga as total, a.no_urut "+
					"from log_spk_d a " +
					"		inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
					"		inner join brg_barang c on a.kode_klpfa=c.kode_barang and a.kode_lokasi=c.kode_lokasi  "+					
					
					"		inner join (select b.no_po,a.kode_barang,a.kode_lokasi,a.no_batch,a.jumlah+a.bonus as jum "+
					"					from brg_trans_d a inner join log_terima_m b on a.no_bukti=b.no_terima and a.kode_lokasi=b.kode_lokasi "+
					"					where b.no_terima='"+this.e_nb.getText()+"' and b.kode_lokasi ='"+this.app._lokasi+"' "+
					"				    ) z on a.kode_klpfa=z.kode_barang and a.kode_lokasi=z.kode_lokasi and z.no_batch=a.no_urut and a.no_spk=z.no_po "+
					
					"     left join (" +
					"			select b.no_po,b.no_po+'-'+a.no_batch as id_pesan,sum(a.jumlah+a.bonus) as jml_terima " +
					"			from brg_trans_d a inner join log_terima_m b on a.no_bukti=b.no_terima and a.kode_lokasi=b.kode_lokasi "+
					"			where a.kode_lokasi='" + this.app._lokasi + "' and a.no_bukti <>'"+this.e_nb.getText()+"' " +
					"			group by b.no_po,b.no_po+'-'+a.no_batch) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk " +

					"where a.no_spk='" + this.cb_po.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
					"order by a.no_urut";

				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg.appendData([line2.kode_barang, line2.nama, line2.sat_kecil, floatToNilai(line2.harga), floatToNilai(line2.sisa), floatToNilai(line2.jum),floatToNilai(line2.total),line2.no_urut]);
					}
				} else this.sg.clear(1);

				
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