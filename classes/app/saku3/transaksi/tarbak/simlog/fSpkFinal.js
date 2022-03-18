window.app_saku3_transaksi_tarbak_simlog_fSpkFinal = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_tarbak_simlog_fSpkFinal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tarbak_simlog_fSpkFinal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form SPK / PO Final", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this, { bound: [20, 11, 202, 20], caption: "Periode", tag: 2, readOnly: true, change: [this, "doChange"], visible: false });
		this.l_tgl1 = new portalui_label(this, { bound: [20, 11, 100, 18], caption: "Tanggal", underline: true });
		this.dp_d1 = new portalui_datePicker(this, { bound: [120, 11, 100, 18], selectDate: [this, "doSelectDate"] });

		this.pc2 = new pageControl(this, { bound: [10, 10, 1000, 440], childPage: ["Data SPK", "List SPK"] });
		this.sg3 = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 33], colCount: 6, tag: 9,
			colTitle: ["No Bukti", "Tanggal", "Deskripsi", "Mitra", "Nilai", "Pilih"],
			colWidth: [[5, 4, 3, 2, 1, 0], [70, 100, 200, 300, 80, 100]], readOnly: true,
			colFormat: [[4, 5], [cfNilai, cfButton]],
			click: [this, "doSgBtnClick3"], colAlign: [[6], [alCenter]],
			dblClick: [this, "doDoubleClick3"], autoAppend: false, defaultRow: 1
		});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 3, grid: this.sg3, pager: [this, "doPager3"] });
		this.bLoad3 = new portalui_imageButton(this.sgn3, { bound: [this.sgn3.width - 25, 2, 22, 22], image: "icon/" + system.getThemes() + "/reload.png", hint: "Load Data", click: [this, "doLoad3"] });

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 200, 20], caption: "No Bukti", maxLength: 30, readOnly: true });
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0], { bound: [225, 12, 20, 20], hint: "Generate", image: "icon/" + system.getThemes() + "/tabCont2.png", click: [this, "doClick"] });
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 16, 450, 20], caption: "No Kontrak", maxLength: 50 });
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 450, 20], caption: "Deskripsi", maxLength: 150 });
		this.cb_pesan = new saiCBBL(this.pc2.childPage[0], { bound: [20, 17, 220, 20], caption: "No Request", multiSelection: false, maxLength: 10, tag: 1, change: [this, "doChange"] });
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0], { bound: [770, 17, 200, 20], caption: "Nilai DPP", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0], { bound: [20, 18, 220, 20], caption: "Vendor", multiSelection: false, maxLength: 10, tag: 1, change: [this, "doChange"] });
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0], { bound: [770, 18, 200, 20], caption: "Nilai PPN", tag: 1, tipeText: ttNilai, text: "0", change: [this, "doChange"],visible:false });
		this.i_ppn = new portalui_imageButton(this.pc2.childPage[0], { bound: [975, 18, 20, 20], hint: "Hitung PPN", image: "icon/" + system.getThemes() + "/tabCont2.png", click: [this, "doPPN"],visible:false });
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 14, 450, 20], caption: "Alamat", readOnly: true });
		this.e_total = new saiLabelEdit(this.pc2.childPage[0], { bound: [770, 14, 200, 20], caption: "Nilai SPK", tag: 1, readOnly: true, tipeText: ttNilai, text: "0" });

		this.pc1 = new pageControl(this.pc2.childPage[0], { bound: [1, 12, 996, 269], childPage: ["Item Barang", "File Dok","Budget"] });
		this.sg4 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 33], colCount: 11, tag: 0,
			colTitle: ["Kode Brg", "Nama", "ID Pesan", "Item Barang", "Merk", "Tipe", "Spesifikasi", "Jumlah", "Harga", "Total","Kd Akun"],
			colWidth: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80, 80, 80, 60, 150, 150, 150, 150, 60, 150, 80]],
			columnReadOnly: [true, [0, 1, 2, 9, 10], [3, 4, 5, 6, 7, 8]],
			colHide: [[2], []],			
			buttonStyle: [[0], [bsEllips]],
			colFormat: [[7, 8, 9], [cfNilai, cfNilai, cfNilai]],
			change: [this, "doChangeCell4"], nilaiChange: [this, "doNilaiChange4"], ellipsClick: [this, "doEllipsClick4"],			
			autoAppend: false, defaultRow: 1
		});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg4 });

		this.sgUpld = new saiGrid(this.pc1.childPage[1], {
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
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 1, grid: this.sgUpld });

		this.sgFile = new saiGrid(this.pc1.childPage[1], {
			bound: [40, 50, 300, 100], colCount: 2, tag: 9, visible: false,
			colTitle: ["namaFile", "status"],
			colWidth: [[1, 0], [80, 180]],
			readOnly: true, autoAppend: false, defaultRow: 1
		});

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,
			colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK",  "Saldo Awal","Nilai","Saldo Akhir"],
			colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,200,100,120,100,100,100]],
			colHide:[[1],[true]],
			columnReadOnly:[true,[0,1,3,5,6,7,8],[2,4]],
			buttonStyle:[[2,4],[bsEllips,bsEllips]], 
			ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],
			colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		


		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);

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
			this.isiPesan();
			this.cb_vendor.setSQL("select a.kode_vendor, a.nama from vendor a  " +
				"where a.kode_lokasi='" + this.app._lokasi + "'", ["kode_vendor", "nama"], false, ["Kode", "Nama"], "and", "Data Vendor", true);

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simlog_fSpkFinal.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simlog_fSpkFinal.implement({
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
	isiPesan: function () {
		this.cb_pesan.setSQL("select no_pesan,keterangan from log_pesan_m  " +
			"where progress='0' and kode_lokasi='" + this.app._lokasi + "'", ["no_pesan", "keterangan"], false, ["No Request", "Deskripsi"], "and", "Data Request", true);
	},
	doChangeCell4: function (sender, col, row) {
		if (col == 7 || col == 8) {
			if (this.sg4.cells(7, row) != "" && this.sg4.cells(8, row) != "") {
				this.sg4.cells(9, row, floatToNilai(nilaiToFloat(this.sg4.cells(7, row)) * nilaiToFloat(this.sg4.cells(8, row))));
				this.sg4.validasi();
				this.doRekap();				
			}
		}

		sender.onChange.set(undefined, undefined);
		if (col == 0) {
			if (sender.cells(0, row) != "") {
				var klp = this.dataKlp.get(sender.cells(0, row));
				if (klp) {
					sender.cells(1, row, klp);
					
					var strSQL = "select b.kode_akun from fa_klp a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='" + this.app._lokasi + "' and a.kode_klpfa='"+sender.cells(0,row)+"' ";
					var data = this.dbLib.getDataProvider(strSQL, true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];
						if (line != undefined) {
							sender.cells(10,row,line.kode_akun);
						}
					}
					this.doRekap();
				}
				else {
					if (trim(sender.cells(0, row)) != "") system.alert(this, "Kode Barang " + sender.cells(0, row) + " tidak ditemukan", "Inputkan kode lainnya.", "Cek Klp Barang");
					sender.cells(0, row, "");
					sender.cells(1, row, "");
				}
			}
		}
		sender.onChange.set(this, "doChangeCell4");
	},
	doPPN: function () {
		// if (this.e_nilai.getText() != "") {
		// 	var ppn = Math.round(nilaiToFloat(this.e_nilai.getText()) * 0.1);
		// 	this.e_ppn.setText(floatToNilai(ppn));
		// }
		//tidak ada ppn
	},
	doNilaiChange4: function () {
		try {
			var tot = 0;
			for (var i = 0; i < this.sg4.rows.getLength(); i++) {
				if (this.sg4.rowValid(i) && this.sg4.cells(9, i) != "") {					
					tot += nilaiToFloat(this.sg4.cells(9, i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
			var ppn = nilaiToFloat(this.e_ppn.getText());
			this.e_ppn.setText(floatToNilai(ppn));
			this.e_total.setText(floatToNilai(tot + ppn));
		} catch (e) {
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:" + e);
		}
	},
	doEllipsClick4: function (sender, col, row) {
		try {
			if (sender == this.sg4) {
				if (col == 0) {
					this.standarLib.showListData(this, "Daftar Kelompok Barang", sender, undefined,
						"select a.kode_klpfa,a.nama,c.kode_akun,c.nama as nama_akun from fa_klp a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi inner join masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi=b.kode_lokasi where a.kode_lokasi='" + this.app._lokasi + "'",
						"select count(*) from (select a.kode_klpfa,a.nama from fa_klp a where a.kode_lokasi='" + this.app._lokasi + "') a ",
						["a.kode_klpfa", "a.nama","c.kode_akun","c.nama"], "and", ["Kode", "Nama","Akun","Nama Akun"], false);
				}
			}
		} catch (e) {
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);	    			
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var pp = this.dataPP.get(sender.cells(2,row));
				if (pp) sender.cells(3,row,pp);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode PP "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}		
		if (col == 4) {
			if (sender.cells(4,row) != "") {							
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(2,row)+"' and b.kode_drk = '"+sender.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(5,row,line.nama);
					else {						
						this.sg.cells(4,row,"-");
						this.sg.cells(5,row,"-");						
					}
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell2");				
	},
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {				
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}		
				if (col == 4){					
					var vUnion = "";
					var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.status_gar != "1") var vUnion = " union select '-','-' "; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion ,
							"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
				}		
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRekap : function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg4.getRowCount();i++){
			if (this.sg4.rowValid(i)){
				nilai = nilaiToFloat(this.sg4.cells(9,i));
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg4.cells(10,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg4.cells(10,i),"-","-","-","-","-","0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(7,idx));
					total = total + nilai;
					this.sg2.setCell(7,idx,total);
				}
			}
		}
	},
	doHitungGar: function(){
		try {			
			var sls = 0;
			for (var i=0;i < this.sg2.getRowCount();i++){
				if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
				else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			
				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					this.sg2.cells(6,i,floatToNilai(sls));
					sls = sls - nilaiToFloat(this.sg2.cells(7,i));
					this.sg2.cells(8,i,floatToNilai(sls));
				}
			}
		}
		catch(e) {
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
						sql.add("delete from log_spk_m where no_spk = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_spk_d where no_spk = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("update log_pesan_m set progress= '0' where no_pesan='" + this.cb_pesan.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						sql.add("delete from angg_r where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					}

					sql.add("update log_pesan_m set progress= '3' where no_pesan='" + this.cb_pesan.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
					sql.add("insert into log_spk_m(no_spk,no_pks,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_buat,keterangan,no_tap,kode_vendor,total,no_dokumen,modul,no_sanggup,nilai,ppn,no_pesan,no_spph,tgl_spph,no_sph,tgl_sph,no_ba,flag_revisi) values " +
						"('" + this.e_nb.getText() + "','-','" + this.app._lokasi + "',getdate(),'" + this.app._userLog + "','" + this.e_periode.getText() + "','" + this.dp_d1.getDateString() + "','" + this.app._userLog + "','" + this.e_ket.getText() + "','-','" + this.cb_vendor.getText() + "'," + nilaiToFloat(this.e_total.getText()) + ",'" + this.e_dok.getText() + "','TL','-'," + nilaiToFloat(this.e_nilai.getText()) + "," + nilaiToFloat(this.e_ppn.getText()) + ",'" + this.cb_pesan.getText() + "','-','" + this.dp_d1.getDateString() + "','-','" + this.dp_d1.getDateString() + "','-','0')");

					for (var i = 0; i < this.sg4.getRowCount(); i++) {
						if (this.sg4.rowValid(i)) {
							sql.add("insert into log_spk_d(no_spk,kode_lokasi,no_urut,item,merk,tipe,catatan,jumlah,harga,ppn,kode_klpfa, harga_po) values " +
								"('" + this.e_nb.getText() + "','" + this.app._lokasi + "'," + this.sg4.cells(2, i) + ",'" + this.sg4.cells(3, i) + "','" + this.sg4.cells(4, i) + "','" + this.sg4.cells(5, i) + "','" + this.sg4.cells(6, i) + "'," + nilaiToFloat(this.sg4.cells(7, i)) + "," + nilaiToFloat(this.sg4.cells(8, i)) + ",0,'" + this.sg4.cells(0, i) + "',"+nilaiToFloat(this.sg4.cells(8, i))+")");
						}
					}

					//dokumen						
					var ix = 0;
					for (var i = 0; i < this.sgUpld.getRowCount(); i++) {
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2, i) != "-") {
							for (var j = 0; j < this.sgFile.getRowCount(); j++) {
								if (this.sgUpld.cells(2, i) == this.sgFile.cells(0, j)) {
									this.sgFile.cells(1, j, "PAKAI");
								}
							}
							sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi,no_ref)values('" + this.e_nb.getText() + "','" + this.sgUpld.cells(3, i).tmpfile + "','" + ix + "','" + this.sgUpld.cells(0, i) + "','" + this.app._lokasi + "','" + this.e_nb.getText() + "')");
						}
					}

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(7,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','PO','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
							}
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
				this.sg4.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbAllFalse);
				this.isiPesan();
				break;
			case "simpan":
			case "ubah":
				this.doHitungGar();				
				this.preView = "1";
				for (var i = 0; i < this.sg4.getRowCount(); i++) {
					if (this.sg4.rowValid(i)) {
						if (this.sg4.cells(0, i) == "-" || this.sg4.cells(0, i) == "") {
							var j = i + 1;
							system.alert(this, "Data Item tidak valid.", "Kode Barang harus diisi (baris " + j + ").");
							return false;
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this, "Transaksi tidak valid.", "Nilai SPK tidak boleh nol atau kurang.");
					return false;
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
				sql.add("delete from log_pesan_dok where no_pesan='" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("update log_pesan_m set progress= '0' where no_pesan='" + this.cb_pesan.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				sql.add("delete from angg_r where no_bukti = '" + this.e_nb.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);

				break;
		}
	},
	doSelectDate: function (sender, y, m, d) {
		if (m < 10) m = "0" + m;
		this.e_periode.setText(y + "" + m);
		if (this.stsSimpan == 1) {
			this.isiPesan();
			this.doClick();
		}
	},
	doChange: function (sender) {
		if (sender == this.e_periode && this.stsSimpan == 1) this.doClick();
		if (sender == this.cb_vendor && this.cb_vendor.getText() != "") {
			var strSQL = "select alamat from vendor where kode_vendor='" + this.cb_vendor.getText() + "' and kode_lokasi='" + this.app._lokasi + "'";
			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];
				if (line != undefined) {
					this.e_alamat.setText(line.alamat);
				}
			}
		}
		if (sender == this.cb_pesan && this.cb_pesan.getText() != "") {
			var sql = new server_util_arrayList();
			sql.add("select a.kode_klpfa,a.nama from fa_klp a where a.kode_lokasi='" + this.app._lokasi + "' union select '-','-' ");
			sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

			if (this.stsSimpan == 1) {
				var strSQL = "select '-' as kode_klpfa,'-' as nama,'-' as kode_akun,no_urut,item,merk,tipe,catatan,jumlah,nilai,jumlah * nilai as total " +
					"from log_pesan_d where no_pesan='" + this.cb_pesan.getText() + "' and kode_lokasi='" + this.app._lokasi + "' order by no_urut";
			}
			else {
				var strSQL = "select a.kode_klpfa,b.nama,c.kode_akun,a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga as nilai,a.ppn,a.jumlah*a.harga as total " +
					"from log_spk_d a " +
					"inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi " +
					"inner join fa_klpakun c on b.kode_klpakun=c.kode_klpakun and b.kode_lokasi=c.kode_lokasi " +
					"where a.no_spk ='" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' order by a.no_urut";
			}			
			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line2;
				this.sg4.clear();
				for (var i in data.rs.rows) {
					line2 = data.rs.rows[i];
					this.sg4.appendData([line2.kode_klpfa, line2.nama, line2.no_urut, line2.item, line2.merk, line2.tipe, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.nilai), floatToNilai(line2.total),line2.kode_akun]);
				}
			} else this.sg4.clear(1);
		}
		// if (sender == this.e_ppn && this.e_ppn.getText() != "") {
		// 	this.doNilaiChange4();
		// }
	},
	doClick: function (sender) {
		if (this.e_periode.getText() != "") {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1); this.sg4.clear(1);
				this.sgUpld.clear(1); this.sgFile.clear(1);
				this.isiPesan();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "log_spk_m", "no_spk", this.app._lokasi + "-SPK" + this.e_periode.getText().substr(2, 4) + ".", "0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
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
								this.nama_report = "server_report_saku3_ypt_logistik_rptSpk";
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
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						} else system.info(this, result, "");
						break;
					case "getMultiDataProvider":
						eval("result = " + result + ";");
						if (typeof result != "string") {
							this.dataKlp = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();
							if (result.result[0]) {
								var line;
								for (var i in result.result[0].rs.rows) {
									line = result.result[0].rs.rows[i];
									this.dataKlp.set(line.kode_klpfa, line.nama);
								}
							}
							if (result.result[1]) {
								var line;
								for (var i in result.result[1].rs.rows) {
									line = result.result[1].rs.rows[i];
									this.dataPP.set(line.kode_pp, line.nama);
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
			this.sg4.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.isiPesan();
		} catch (e) {
			alert(e);
		}
	},
	doLoad3: function (sender) {
		var strSQL = "select a.no_spk,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama,a.total as nilai " +
			"from log_spk_m a " +
			"inner join vendor b on a.kode_vendor=b.kode_vendor and b.kode_lokasi=a.kode_lokasi " +
			"where a.periode='" + this.e_periode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' and a.no_ba='-'";
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
			this.sg3.appendData([line.no_spk, line.tgl, line.keterangan, line.nama, floatToNilai(line.nilai), "Pilih"]);
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function (sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function (sender, col, row) {
		try {
			if (col == 5) this.doDoubleClick3(this.sg3, 0, row);
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

				var strSQL = "select a.* " +
					"from log_spk_m a  " +
					"where a.no_spk = '" + this.e_nb.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.cb_pesan.setSQL("select no_pesan,keterangan from log_pesan_m  " +
							"where no_pesan='" + line.no_pesan + "' and kode_lokasi='" + this.app._lokasi + "'", ["no_pesan", "keterangan"], false, ["No Request", "Deskripsi"], "and", "Data Request", true);
						this.cb_pesan.setText(line.no_pesan);
						this.cb_vendor.setText(line.kode_vendor);
						this.e_ket.setText(line.keterangan);
					}
				}

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

				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,a.kode_pp,a.kode_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir,b.nama as nama_akun,c.nama as nama_pp, isnull(d.nama,'-') as nama_drk "+
							"from angg_r a "+
							"	inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"	inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"	left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode1,1,4)=d.tahun "+
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun,a.kode_pp,a.kode_drk",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);	


			}
		} catch (e) { alert(e); }
	}
});