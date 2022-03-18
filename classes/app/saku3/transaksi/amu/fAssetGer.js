window.app_saku3_transaksi_amu_fAssetGer = function (owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fAssetGer.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fAssetGer";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Inventaris", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar Inventaris", "Data Inventaris"] });

        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64], colCount: 3, tag: 9,
            colTitle: ["Kode Inventaris", "Nama Inventaris", "Pilih"],
            colWidth: [[2,1,0], [70,350,100]],
            colFormat: [[2], [cfButton]], colAlign: [[2], [alCenter]],
            readOnly: true,
            dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.e_kode_pp = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 9, 200, 20], caption: "PP / Unit", maxLength: 20, readOnly: true, text: this.app._kodePP });        
        //this.iFoto = new image(this.pc1.childPage[1], {bound:[620, this.e_kode_pp.top, 100,100]});
        	
        this.e_per = new portalui_label(this.pc1.childPage[1], { bound: [20, 10, 100, 20], caption: "Tgl Perolehan", underline: true });
        this.dp_per = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 10, 98, 18], selectDate: [this, "doSelectDate"] });
        this.e_nilpe = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 200, 20], caption: "Nilai Perolehan", tag: 1, tipeText: ttNilai, text: "0", maxLength: 50 });
        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 200, 20], caption: "Format ID", maxLength: 20, change: [this, "doChange"], readOnly: true });        
        this.e_jumlah = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 14, 200, 20], caption: "Qty Barang", tag: 1, tipeText: ttNilai, text: "1" });
        this.e_nama_inv = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 400, 20], caption: "Nama Barang", maxLength: 50, tag: 1 });
        this.e_spes = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 14, 400, 20], caption: "Spesifikasi", maxLength: 100, tag: 1 });
        
        this.pc2 = new pageControl(this.pc1.childPage[1], { bound: [1, 12, 996, 255], childPage: ["Data Detail", "File Dok"] });
        this.cb_gedung = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 15, 220, 20], caption: "ID Gedung", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
        this.cb_ruang = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 16, 220, 20], caption: "ID Ruang", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
        this.cb_lokasi = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 18, 220, 20], caption: "ID Lokasi", maxLength: 20, multiSelection: false, tag: 1});
        this.cb_klp_asset = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 17, 220, 20], caption: "Jenis Barang", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
        this.e_no_seri = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 18, 400, 20], caption: "Nomor Seri", maxLength: 50, tag: 1 });
        this.e_merk = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 19, 400, 20], caption: "Merk", maxLength: 50, tag: 1 });
        this.e_tipe = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 20, 400, 20], caption: "Tipe", maxLength: 50, tag: 1 });
        this.e_warna = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 21, 200, 20], caption: "Warna", maxLength: 50, tag: 1 });
        this.c_sat = new saiCB(this.pc2.childPage[0], { bound: [20, 22, 200, 20], caption: "Satuan", items: ["Buah", "Unit"], readOnly: true, tag: 2 });
        this.e_sumber = new saiCB(this.pc2.childPage[0], { bound: [20, 23, 200, 20], caption: "Sumber Dana", items: ["CAPEX", "OPEX","HIBAH","BOS"], readOnly: true, tag: 2 });

        //this.e_foto = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,24,400,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
        //this.uploader = new uploader(this.pc1.childPage[1],{bound:[430,24,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});
        
        this.sgUpld = new saiGrid(this.pc2.childPage[1], {
			bound: [1, 5, this.pc2.width - 5, this.pc2.height - 33], colCount: 5,
			colTitle: ["Kd Jenis", "Jenis Dokumen", "Path File", "Upload", "DownLoad"],
			colWidth: [[4, 3, 2, 1, 0], [80, 80, 480, 200, 80]],
			columnReadOnly: [true, [0, 1, 2, 3, 4], []],
			colFormat: [[3, 4], [cfUpload, cfButton]],
			buttonStyle: [[0], [bsEllips]],
			click: [this, "doSgBtnClick"], colAlign: [[4], [alCenter]],
			ellipsClick: [this, "doEllipsClickDok"], readOnly: true, change: [this, "doGridChange"], rowCount: 1, tag: 9
		});
		this.sgUpld.setUploadParam([3], "uploadTo", "server/media/", "object", "server/media/");
		this.sgnUpld = new sgNavigator(this.pc2.childPage[1], { bound: [1, this.pc2.height - 25, this.pc2.width - 1, 25], buttonStyle: 1, grid: this.sgUpld });

		this.sgFile = new saiGrid(this.pc2.childPage[1], {
			bound: [40, 50, 300, 100], colCount: 2, tag: 9, visible: false,
			colTitle: ["namaFile", "status"],
			colWidth: [[1, 0], [80, 180]],
			readOnly: true, autoAppend: false, defaultRow: 1
		});
        
        this.rearrangeChild(10, 23);

        this.pc1.childPage[0].rearrangeChild(10, 23);
        this.pc1.childPage[1].rearrangeChild(10, 23);
        this.pc2.childPage[0].rearrangeChild(10, 23);
        setTipeButton(tbSimpan);
        this.maximize();
        this.setTabChildIndex();

        try {
            this.dbLib = new util_dbLib();
            this.dbLib.addListener(this);
            uses("util_standar");
            
            this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";

            this.stsSimpan = 1;
            this.doSelectDate(this.dp_per,this.dp_per.year,this.dp_per.month,this.dp_per.day);

            this.standarLib = new util_standar();
            this.doLoad();

            this.stsCol = [0, 0, 0, 0, 0];
            this.cb_gedung.setSQL("select id_gedung,nama_gedung from amu_gedung where kode_lokasi='" + this.app._lokasi + "'", ["id_gedung", "nama_gedung"], false, ["ID", "Nama"], "where", "Data Gedung", true);
            this.cb_klp_asset.setSQL("select kode_klp,nama_klp from amu_klp_brg where kode_lokasi='" + this.app._lokasi + "'", ["kode_klp", "nama_klp"], false, ["Kode", "Nama"], "where", "Data Kelompok Asset", true);
            this.cb_lokasi.setSQL("select id,nama from amu_desa ", ["id", "nama"], false, ["Kode", "Nama"], "where", "Data Desa", true);
            
            this.e_kode_pp.setText(this.app._kodePP);
            this.c_show.setText("10");
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fAssetGer.extend(window.childForm);
window.app_saku3_transaksi_amu_fAssetGer.implement({
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
    doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_foto.setText(trim(data.filedest) );
			this.dataUpload = data;
			this.iFoto.setImage(this.uploader.param2 +this.dataUpload.tmpfile);
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
            this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
            this.iFoto.setProportional(true);
			
		}catch(e){
			alert(e);
		}
	},
    simpan: function () {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    var d = this.dp_per.getDateString();
                    var split = d.split('/');
                    var periode = split[0].substring(2, 4) + split[1];
                    var formatKode = this.app._lokasi + "-IF" + periode;
                    var cekKode = "select distinct no_bukti from amu_asset_bergerak where kode_lokasi='" + this.app._lokasi + "' and kode_pp='"+this.app._kodePP+"' order by no_bukti desc";
                    var data = this.dbLib.getDataProvider(cekKode, true);
                    if (typeof data == "object") {
                        var line = data.rs.rows[0];
                        if (line != undefined) {
                            angkaAkhir = parseFloat(line.no_bukti.substr(line.no_bukti.length - 4, 4));
                        } else {
                            angkaAkhir = 0000;
                        }
                    }

                    var formatKodeBrg = this.app._lokasi + "-BG" + periode;
                    var cekKodeBrg = "select distinct kd_asset from amu_asset_bergerak where kode_lokasi='" + this.app._lokasi + "' and kode_pp='"+this.app._kodePP+"' order by kd_asset desc";
                    var data = this.dbLib.getDataProvider(cekKodeBrg, true);
                    if (typeof data == "object") {
                        var line = data.rs.rows[0];
                        if (line != undefined) {
                            angkaAkhirBrg = parseFloat(line.kd_asset.substr(line.kd_asset.length - 4, 4));
                        } else {
                            angkaAkhirBrg = 0000;
                        }
                    }
                
                    var kodeAngkaBrg = angkaAkhirBrg + 1;
                    var kodeStringBrg = kodeAngkaBrg.toString();
                    if (kodeStringBrg.length == 1) var kdb = "000" + kodeStringBrg;
                    if (kodeStringBrg.length == 2) var kdb = "00" + kodeStringBrg;
                    if (kodeStringBrg.length == 3) var kdb = "0" + kodeStringBrg;
                    if (kodeStringBrg.length == 4) var kdb = kodeStringBrg;
                    var kodeFixBrg = formatKodeBrg + "." + kdb;
                    
                    var jml = nilaiToFloat(this.e_jumlah.getText());
                    for (var i = 0; i < jml; i++) {
                        var kodeAngka = angkaAkhir + i + 1;
                        var kodeString = kodeAngka.toString();
                        if (kodeString.length == 1) var kd = "000" + kodeString;
                        if (kodeString.length == 2) var kd = "00" + kodeString;
                        if (kodeString.length == 3) var kd = "0" + kodeString;
                        if (kodeString.length == 4) var kd = kodeString;
                        var kodeFix = formatKode + "." + kd;

                        sql.add("insert into amu_asset_bergerak(no_bukti,no_seri,merk,tipe,warna,satuan,spesifikasi,id_gedung,no_ruang,kode_klp,tanggal_perolehan,kode_lokasi,kode_pp,nilai_perolehan,kd_asset,sumber_dana,nama_inv,foto,id_desa) values " +
                                "('" + kodeFix + "','" + this.e_no_seri.getText() + "','" + this.e_merk.getText() + "','" + this.e_tipe.getText() + "','" + this.e_warna.getText() + "','" + this.c_sat.getText() + "','" + this.e_spes.getText() + "','" + this.cb_gedung.getText() + "','" + this.cb_ruang.getText() + "','" + this.cb_klp_asset.getText() + "','" + this.dp_per.getDateString() + "','" + this.app._lokasi + "','" + this.e_kode_pp.getText() + "','" + nilaiToFloat(this.e_nilpe.getText()) + "','" + kodeFixBrg + "','" + this.e_sumber.getText() + "','" + this.e_nama_inv.getText() + "','-','"+this.cb_lokasi.getText()+"')");
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
							sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('" + this.cb_kode.getText() + "','" + this.sgUpld.cells(3, i).tmpfile + "','" + ix + "','" + this.sgUpld.cells(0, i) + "','" + this.app._lokasi + "','AM92', '" + this.cb_kode.getText() + "')");
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
    ubah: function () {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from log_pesan_dok where modul='AM92' and no_pesan='" + this.cb_kode.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");

                    sql.add("update amu_asset_bergerak set id_desa='"+this.cb_lokasi.getText()+"',no_seri ='" + this.e_no_seri.getText() + "',merk ='" + this.e_tipe.getText() + "',tipe ='" + this.e_tipe.getText() + "',warna ='" + this.e_warna.getText() + "',satuan ='" + this.c_sat.getText() + "',spesifikasi ='" + this.e_spes.getText() + "',id_gedung ='" + this.cb_gedung.getText() + "',no_ruang ='" + this.cb_ruang.getText() + "',kode_klp ='" + this.cb_klp_asset.getText() + "',tanggal_perolehan ='" + this.dp_per.getDateString() + "',nilai_perolehan ='" + nilaiToFloat(this.e_nilpe.getText()) + "',sumber_dana ='" + this.e_sumber.getText() + "' ,nama_inv ='" + this.e_nama_inv.getText() + 
                            "' where kode_lokasi='" + this.app._lokasi + "' and kode_pp='" + this.e_kode_pp.getText() + "' and no_bukti='" + this.cb_kode.getText() + "'");

                    //dokumen						
					var ix = 0;
					for (var i = 0; i < this.sgUpld.getRowCount(); i++) {
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2, i) != "-") {
							for (var j = 0; j < this.sgFile.getRowCount(); j++) {
								if (this.sgUpld.cells(2, i) == this.sgFile.cells(0, j)) {
									this.sgFile.cells(1, j, "PAKAI");
								}
							}
							sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref)values('" + this.cb_kode.getText() + "','" + this.sgUpld.cells(3, i).tmpfile + "','" + ix + "','" + this.sgUpld.cells(0, i) + "','" + this.app._lokasi + "','AM92','" + this.cb_kode.getText() + "')");
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
    hapus: function () {
        try {
            if (this.cb_kode.getText() != "") {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from log_pesan_dok where modul='AM92' and no_pesan='" + this.cb_kode.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
                    sql.add("delete from amu_asset_bergerak where no_bukti = '" + this.cb_kode.getText() + "' and kode_pp='"+this.app._kodePP+"' ");
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
                if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0", "1"), this.cb_kode);
                setTipeButton(tbAllFalse);
                this.doLoad();
                this.pc1.setActivePage(this.pc1.childPage[1]);
                break;
            case "simpan":
                this.simpan();
                break;
            case "simpancek": this.simpan();
                break;
            case "ubah":
                this.ubah();
                break;
            case "hapus":
                this.hapus();
                break;
        }
    },
    doChange: function (sender) {
        if (sender == this.cb_gedung && this.cb_gedung.getText() != "") {
            this.cb_ruang.setSQL("select no_ruangan, nama_ruangan from amu_ruangan where id_gedung='" + this.cb_gedung.getText() + "'", ["no_ruangan", "nama_ruangan"], false, ["NO", "Nama Ruang"], "and", "Data Ruangan", true);
        }
        try {
            if (sender == this.cb_kode && this.cb_kode.getText() != "") {
                var strSQL = "select id_desa,no_seri,merk,tipe,warna,satuan,spesifikasi,id_gedung,no_ruang,kode_klp,tanggal_perolehan,kode_pp,nilai_perolehan,sumber_dana,nama_inv,foto "+
                             "from amu_asset_bergerak where no_bukti ='" + this.cb_kode.getText() + "'";
                             
                var strSQL2 = "select kd_asset from amu_asset_bergerak where no_bukti ='" + this.cb_kode.getText() + "' ";
                var data2 = this.dbLib.getDataProvider(strSQL2, true);
                if (typeof data2 == "object") {
                    var line2 = data2.rs.rows[0];
                    if (line2 != undefined) {
                        var kd_inv = line2.kd_asset;
                        this.stsSimpan = 0;
                    }
                    else {
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                        this.stsSimpan = 1;
                    }
                }
                var strSQL3 = "select count(no_bukti) as jumlah from amu_asset_bergerak where kd_asset ='" + kd_inv + "'";
                var data3 = this.dbLib.getDataProvider(strSQL3, true);
                if (typeof data3 == "object") {
                    var line3 = data3.rs.rows[0];
                    if (line3 != undefined) {
                        this.e_jumlah.setText(line3.jumlah);
                    }
                    else {
                        this.e_jumlah.setText("0");
                    }
                }
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {                                           
                        this.e_nilpe.setText(floatToNilai(line.nilai_perolehan));
                        this.e_merk.setText(line.merk);
                        this.e_tipe.setText(line.tipe);
                        this.e_no_seri.setText(line.no_seri);
                        this.e_spes.setText(line.spesifikasi);
                        this.e_warna.setText(line.warna);
                        this.c_sat.setText(line.satuan);
                        this.cb_gedung.setText(line.id_gedung);
                        this.cb_ruang.setText(line.no_ruang);
                        this.cb_lokasi.setText(line.id_desa);
                        this.cb_klp_asset.setText(line.kode_klp);
                        this.dp_per.setDateString(line.tanggal_perolehan);
                        this.e_kode_pp.setText(line.kode_pp);
                        this.e_sumber.setText(line.sumber_dana);
                        this.e_nama_inv.setText(line.nama_inv);
                        
						// this.e_foto.setText(trim(line.foto));
                        // this.iFoto.setImage("server/media/"+trim(line.foto));
                        // this.fileBfr = line.foto;	
                        

                        this.sgUpld.clear(); this.sgFile.clear();
                        var data = this.dbLib.getDataProvider(
                            "select b.kode_jenis,b.nama,a.no_gambar " +
                            "from log_pesan_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi " +
                            "where a.no_pesan = '" + this.cb_kode.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' order by a.nu", true);
                        if (typeof data == "object" && data.rs.rows[0] != undefined) {
                            var line;
                            for (var i in data.rs.rows) {
                                line = data.rs.rows[i];
                                this.sgFile.appendData([line.no_gambar, "HAPUS"]);
                                this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, { filedest: line.no_gambar, tmpfile: line.no_gambar }, "DownLoad"]);
                            }
                        } else this.sgUpld.clear(1);
                        
						
                        setTipeButton(tbUbahHapus);
                    }
                    else {
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                    }
                }
            }
        } catch (e) {
            systemAPI.alert(e);
        }
    },
    doDoubleClick: function (sender, col, row) {
        try {
            if (this.sg1.cells(0, row) != "") {
                setTipeButton(tbUbahHapus);
                this.pc1.setActivePage(this.pc1.childPage[1]);
                this.cb_kode.setText(this.sg1.cells(0, row));
            }
        } catch (e) { alert(e); }
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
                            
                            this.app._mainForm.pesan(2, "transaksi telah sukses tersimpan (Kode : " + this.cb_kode.getText() + ")");
                            this.app._mainForm.bClear.click();
                        } else system.info(this, result, "");
                    break;
                }
            }
            catch (e) {
                systemAPI.alert("step : " + step + "; error = " + e);
            }
        }
    },
    doLoad: function (sender) {
        var show = parseInt(this.c_show.getText());
        var strSQL = "select no_bukti, nama_inv from amu_asset_bergerak where kode_lokasi='" + this.app._lokasi + "'";
        var data = this.dbLib.getDataProvider(strSQL, true);
        if (typeof data == "object" && data.rs.rows[0] != undefined) {
            this.dataJU = data;
            this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
            this.sgn1.rearrange();
            this.doTampilData(1);
        } else this.sg1.clear(1);
    },
    doTampilData: function (page) {
        var show = parseInt(this.c_show.getText());
        this.sg1.clear();
        var line;
        this.page = page;
        var start = (page - 1) * show;
        var finish = (start + show > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : start + show);
        for (var i = start; i < finish; i++) {
            line = this.dataJU.rs.rows[i];
            this.sg1.appendData([line.no_bukti, line.nama_inv, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function (sender, page) {
        this.doTampilData(page);
    },
    doCari: function (sender) {
        try {

            var show = parseInt(this.c_show.getText());
            var column_array = ['no_bukti', 'nama_inv'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select no_bukti, nama_inv " +
                "from amu_asset_bergerak " +
                "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "' and kode_pp='"+this.app._kodePP+"'";
            
            var data = this.dbLib.getDataProvider(strSQL, true);
            if (typeof data == "object" && data.rs.rows[0] != undefined) {
                this.dataJU = data;
                this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
                this.sgn1.rearrange();
                this.doTampilData(1);
            } else this.sg1.clear(1);
            this.pc1.setActivePage(this.pc1.childPage[0]);
        }
        catch (e) {
            alert(e);
        }
    },
    doSort: function (sender, col, row) {
        try {

            var show = parseInt(this.c_show.getText());
            if (col == 2) {
                this.doDoubleClick(sender, col, row);
            } else {
                if (this.stsCol[col] == 1) {
                    this.stsCol[col] = 0;
                    var ordertype = " asc ";
                } else {
                    this.stsCol[col] = 1;
                    var ordertype = " desc ";
                }

                var column_array = ['no_bukti', 'nama_inv'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select no_bukti, nama_inv " +
                    "from amu_asset_bergerak " +
                    "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "' and kode_pp='"+this.app._kodePP+"'" +
                    " order by " + column_array[col] + " " + ordertype;
                
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object" && data.rs.rows[0] != undefined) {
                    this.dataJU = data;
                    this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
                    this.sgn1.rearrange();
                    this.doTampilData(1);
                } else this.sg1.clear(1);
            }
        } catch (e) {

            alert(e);
        }
    },
    doSelectDate: function (sender, y, m, d) {
        try {
            if (m < 10) m = "0" + m;
            this.periode = y + "" + m;       
            this.doClick(this.i_gen);
        }
        catch(e) {
            alert(e);
        }
    },
    doClick: function (sender) {
        try {
            if (sender == this.i_gen) {
                var d = this.dp_per.getDateString();
                var split = d.split('/');
                var periode = split[0].substring(2, 4) + split[1];
                //this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_asset_bergerak", "no_bukti", this.app._lokasi + "-IF" + periode + ".", "0000"));            
                if (this.stsSimpan == 1) this.cb_kode.setText(this.app._lokasi + "-IF" + this.periode.substr(2,4) + ".XXXX");            
            }
        }
        catch(e) {
            alert(e);
        }
    }
});