window.app_saku3_transaksi_amu_fLahanSewa = function(owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fLahanSewa.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fLahanSewa";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Sertifikat Lahan", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Lahan Sewa", "Data Lahan Sewa"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth: 0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64],
            colCount: 4,
            tag: 9,
            colTitle: ["No Bukti", "Lahan", "No PKS", "Pilih"],
            colWidth: [ [3, 2, 1, 0],[70, 200, 250, 100]],
            colFormat: [[3],[cfButton]],colAlign: [[3],[alCenter]],readOnly: true,
            dblClick: [this, "doDoubleClick"],click: [this, "doSort"],autoAppend: false,defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 200, 20], caption: "No Bukti", maxLength: 20, change: [this, "doChange"],readOnly:true});
        this.cb_lahan = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "ID Lahan", maxLength: 20, multiSelection: false, change: [this, "doChange"] });        
        this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Uraian Aset",  readOnly:true, tag: 1 });
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1], { bound: [520, 11, 450, 20], caption: "Alamat", readOnly:true, tag: 1 });        
        this.e_desa = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 14, 450, 20], caption: "Desa/Kelurahan", readOnly:true, tag: 1});
		this.e_prov = new saiLabelEdit(this.pc1.childPage[1], { bound: [520, 14, 450, 20], caption: "Provinsi",  readOnly:true, tag: 1});
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 15, 450, 20], caption: "Kota/Kab",   readOnly:true, tag: 1});		
		this.e_kec = new saiLabelEdit(this.pc1.childPage[1], { bound: [520, 15, 450, 20], caption: "Kecamatan",   readOnly:true, tag: 1});		
        this.e_kawas = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 450, 20], caption: "Kawasan", readOnly:true, tag: 1 });                
        
        this.e_nopks = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 450, 20], caption: "No PKS YPT", maxLength: 100, tag: 1 });
        this.e_mitra = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 15, 450, 20], caption: "Mitra", maxLength: 100, tag: 1 });
        this.e_nopks2 = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 14, 450, 20], caption: "No PKS Mitra", maxLength: 100, tag: 1 });
        this.e_luas = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 200, 20], caption: "Luas", tag: 1, tipeText: ttNilai, text: "0", maxLength: 50 });
        this.e_nilai = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 15, 200, 20], caption: "Nilai", tag: 1, tipeText: ttNilai, text: "0", maxLength: 50 });
        this.e_tgl_mulai = new portalui_label(this.pc1.childPage[1], { bound: [20, 21, 100, 20], caption: "Tanggal Mulai", underline: true });
        this.dp_tgl_mulai = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 21, 98, 18]});
        this.e_tgl_akhir = new portalui_label(this.pc1.childPage[1], { bound: [20, 23, 100, 20], caption: "Tanggal Berakhir", underline: true });
        this.dp_tgl_akhir = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 23, 98, 18]});
        this.e_ket = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 450, 20], caption: "Keterangan", maxLength: 250, tag: 1 });

        this.rearrangeChild(10, 23);
        this.pc1.childPage[0].rearrangeChild(10, 23);
        this.pc1.childPage[1].rearrangeChild(10, 23);
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

            this.standarLib = new util_standar();
            var data = this.dbLib.getDataProvider("select year(getdate()) as tahun", true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];
				if (line != undefined) {
					this.tahun = line.tahun;
				}
			}
            this.doLoad();

            this.stsCol = [0, 0, 0, 0];
            this.cb_lahan.setSQL("select id_lahan,nama_lahan from amu_lahan where kode_lokasi='" + this.app._lokasi + "' and status_dokumen='Sewa'", ["id_lahan", "nama_lahan"], false, ["ID", "Nama"], "where", "Data Lahan", true);
            this.c_show.setText("10");
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fLahanSewa.extend(window.childForm);
window.app_saku3_transaksi_amu_fLahanSewa.implement({
    doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_lahan_sewa", "no_bukti", this.app._lokasi + "-LS" + this.tahun.substr(2,2) + ".", "0000"));                    				
		this.cb_lahan.setFocus();     																	
    },
    mainButtonClick: function(sender) {
        if (sender == this.app._mainForm.bClear)
            system.confirm(this, "clear", "screen akan dibersihkan?", "form inputan ini akan dibersihkan");
        if (sender == this.app._mainForm.bSimpan)
            system.confirm(this, "simpan", "Apa data sudah benar?", "data diform ini apa sudah benar.");
        if (sender == this.app._mainForm.bEdit)
            system.confirm(this, "ubah", "Apa perubahan data sudah benar?", "perubahan data diform ini akan disimpan.");
        if (sender == this.app._mainForm.bHapus)
            system.confirm(this, "hapus", "Yakin data akan dihapus?", "data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
    },
    simpan: function() {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("insert into amu_lahan_sewa(no_bukti, id_lahan, kode_lokasi, mitra, no_pks_ypt, no_pks_mitra, luas, nilai, tgl_mulai, tgl_selesai, keterangan, flag_aktif) values " +
                            "('" + this.cb_kode.getText() + "','" + this.cb_lahan.getText() + "','" + this.app._lokasi + "','" + this.e_mitra.getText() + "','" + this.e_nopks.getText() + "','" + this.e_nopks2.getText() + "'," + nilaiToFloat(this.e_luas.getText()) + "," + nilaiToFloat(this.e_nilai.getText()) + ",'" + this.dp_tgl_mulai.getDateString() + "','" + this.dp_tgl_akhir.getDateString() + "','" + this.e_ket.getText() + "','1')");
                    setTipeButton(tbAllFalse);
                    this.dbLib.execArraySQL(sql);
                } catch (e) {
                    system.alert(this, e, "");
                }
            }
        } catch (e) {
            systemAPI.alert(e);
        }
    },
    ubah: function() {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from amu_lahan_sewa where no_bukti = '" + this.cb_kode.getText() + "' ");
                    sql.add("insert into amu_lahan_sewa(no_bukti, id_lahan, kode_lokasi, mitra, no_pks_ypt, no_pks_mitra, luas, nilai, tgl_mulai, tgl_selesai, keterangan, flag_aktif) values " +
                            "('" + this.cb_kode.getText() + "','" + this.cb_lahan.getText() + "','" + this.app._lokasi + "','" + this.e_mitra.getText() + "','" + this.e_nopks.getText() + "','" + this.e_nopks2.getText() + "'," + nilaiToFloat(this.e_luas.getText()) + "," + nilaiToFloat(this.e_nilai.getText()) + ",'" + this.dp_tgl_mulai.getDateString() + "','" + this.dp_tgl_akhir.getDateString() + "','" + this.e_ket.getText() + "','1')");
                    setTipeButton(tbAllFalse);
                    this.dbLib.execArraySQL(sql);
                } catch (e) {
                    system.alert(this, e, "");
                }
            }
        } catch (e) {
            systemAPI.alert(e);
        }
    },
    hapus: function() {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from amu_lahan_sewa where no_bukti = '" + this.cb_kode.getText() + "' ");
                    setTipeButton(tbAllFalse);
                    this.dbLib.execArraySQL(sql);
                } catch (e) {
                    system.alert(this, e, "");
                }
            }
        } catch (e) {
            systemAPI.alert(e);
        }
    },
    doModalResult: function(event, modalResult) {
        if (modalResult != mrOk) return false;
        switch (event) {
            case "clear":
                if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0", "1"), this.cb_kode);
                setTipeButton(tbAllFalse);
                this.doLoad();
                this.doTambah();                
                break;
            case "simpan":
                this.simpan();
                break;
            case "simpancek":
                this.simpan();
                break;
            case "ubah":
                this.ubah();
                break;
            case "hapus":
                this.hapus();
                break;
        }
    },
    doChange: function(sender) {
        try {

            if (sender == this.cb_kode && this.cb_kode.getText() != "") {
                var strSQL = "select  no_bukti,id_lahan, kode_lokasi, mitra, no_pks_ypt, no_pks_mitra, luas, nilai, tgl_mulai, tgl_selesai, keterangan " +
                             "from amu_lahan_sewa where no_bukti ='" + this.cb_kode.getText() + "'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.cb_lahan.setText(line.id_lahan);
                        this.e_nopks.setText(line.no_pks_ypt);
                        this.e_nopks2.setText(line.no_pks_mitra);
                        this.e_mitra.setText(line.mitra);
                        this.e_luas.setText(floatToNilai(line.luas));
                        this.e_nilai.setText(floatToNilai(line.nilai));
                        this.dp_tgl_mulai.setDateString(line.tgl_mulai);
                        this.dp_tgl_akhir.setDateString(line.tgl_selesai);
                        this.e_ket.setText(line.keterangan);
                        this.stsSimpan = 0;
                        setTipeButton(tbUbahHapus);
                    } else {
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                        this.stsSimpan = 1;
                    }
                }
            }
            if (sender == this.cb_lahan && this.cb_lahan.getText()!="") {
                var strSQL = "select a.nama_lahan,a.alamat, e.nama as desa, b.nama as kec, c.nama as kota, d.nama as prov,f.nama as kawasan "+ 
                             "from amu_lahan a "+
                             "inner join amu_desa e on a.id_desa=e.id  "+
                             "inner join amu_kecamatan b on e.id_kecamatan=b.id "+
                             "inner join amu_kota c on b.id_kota=c.id "+
                             "inner join amu_provinsi d on c.id_provinsi=d.id "+
                             "inner join amu_kawasan f on f.id_kawasan=a.id_kawasan "+
                             "where a.id_lahan ='" + this.cb_lahan.getText() + "' and a.kode_lokasi='"+this.app._lokasi+"' ";											 
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_nama.setText(line.nama_lahan);
						this.e_alamat.setText(line.alamat);
                        this.e_desa.setText(line.desa);
                        this.e_kec.setText(line.kec);
                        this.e_kota.setText(line.kota);
                        this.e_prov.setText(line.prov);
                        this.e_kawas.setText(line.kawasan);
                    }
                }
            }
        } catch (e) {
            systemAPI.alert(e);
        }
    },
    doDoubleClick: function(sender, col, row) {
        try {
            if (this.sg1.cells(0, row) != "") {
                setTipeButton(tbUbahHapus);
                this.pc1.setActivePage(this.pc1.childPage[1]);
                this.cb_kode.setText(this.sg1.cells(0, row));
            }
        } catch (e) { alert(e); }
    },
    doRequestReady: function(sender, methodName, result) {
        if (sender == this.dbLib) {
            try {
                switch (methodName) {
                    case "execArraySQL":
                        if (result.toLowerCase().search("error") == -1) {
                            this.app._mainForm.pesan(2, "transaksi telah sukses tersimpan (Kode : " + this.cb_kode.getText() + ")");
                            this.app._mainForm.bClear.click();
                        } else system.info(this, result, "");
                    break;

                }
            } catch (e) {
                systemAPI.alert("step : " + step + "; error = " + e);
            }
        }
    },
    doLoad: function(sender) {
        var show = parseInt(this.c_show.getText());
        var strSQL = "select  a.no_bukti, b.nama_lahan, a. no_pks_ypt "+
                     "from amu_lahan_sewa a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
                     "where a.kode_lokasi='" + this.app._lokasi + "'";
        var data = this.dbLib.getDataProvider(strSQL, true);
        if (typeof data == "object" && data.rs.rows[0] != undefined) {
            this.dataJU = data;
            this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
            this.sgn1.rearrange();
            this.doTampilData(1);
        } else this.sg1.clear(1);
    },
    doTampilData: function(page) {
        var show = parseInt(this.c_show.getText());
        this.sg1.clear();
        var line;
        this.page = page;
        var start = (page - 1) * show;
        var finish = (start + show > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : start + show);
        for (var i = start; i < finish; i++) {
            line = this.dataJU.rs.rows[i];
            this.sg1.appendData([line.no_bukti, line.nama_lahan, line.no_pks_ypt, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function(sender, page) {
        this.doTampilData(page);
    },
    doCari: function(sender) {
        try {
            var show = parseInt(this.c_show.getText());
            var column_array = ['a.no_bukti', 'b.nama_lahan', 'a.no_pks_ypt'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select a.no_bukti, b.nama_lahan, a.no_pks_ypt " +
                "from amu_lahan_sewa a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
                "where " + filter_string + "and a.kode_lokasi= '" + this.app._lokasi + "'";

            var data = this.dbLib.getDataProvider(strSQL, true);
            if (typeof data == "object" && data.rs.rows[0] != undefined) {
                this.dataJU = data;
                this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
                this.sgn1.rearrange();
                this.doTampilData(1);
            } else this.sg1.clear(1);
            this.pc1.setActivePage(this.pc1.childPage[0]);
        } catch (e) {
            alert(e);
        }
    },
    doSort: function(sender, col, row) {
        try {

            var show = parseInt(this.c_show.getText());
            if (col == 3) {
                this.doDoubleClick(sender, col, row);
            } else {
                if (this.stsCol[col] == 1) {
                    this.stsCol[col] = 0;
                    var ordertype = " asc ";
                } else {
                    this.stsCol[col] = 1;
                    var ordertype = " desc ";
                }

                var column_array = ['a.no_bukti', 'b.nama_lahan', 'a.no_pks_ypt'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select a.no_bukti, b.nama_lahan, a.no_pks_ypt " +
                    "from amu_lahan_sewa a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
                    "where " + filter_string + "and a.kode_lokasi= '" + this.app._lokasi + "'" +
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
    }
});