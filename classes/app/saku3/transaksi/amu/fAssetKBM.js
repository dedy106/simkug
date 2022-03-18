window.app_saku3_transaksi_amu_fAssetKBM = function (owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fAssetKBM.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fAssetKBM";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Asset KBM", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar Asset KBM", "Data Asset KBM"] });

        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [20, 10, 200, 20], caption: "Show", items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [720, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 68], colCount: 4, tag: 9,
            colTitle: ["Kode Barcode", "No Polisi", "Penanggung Jawab", "Pilih"],
            colWidth: [[0, 1, 2, 3], [250, 80, 250, 100]],
            colFormat: [[3], [cfButton]], colAlign: [[3], [alCenter]],
            readOnly: true,
            dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 300, 20], caption: "Kode Barcode", maxLength: 50, change: [this, "doChange"] });
        this.e_no_rangka = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 300, 20], caption: "Nomor Rangka", maxLength: 50, tag: 1 });
        this.e_merk = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 200, 20], caption: "Merk", maxLength: 50, tag: 1 });
        this.e_tipe = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 200, 20], caption: "Tipe", maxLength: 50, tag: 1 });
        this.e_warna = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 14, 200, 20], caption: "Warna", maxLength: 50, tag: 1 });
        this.e_png_jawab = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 15, 300, 20], caption: "Penanggung Jawab", maxLength: 50, tag: 1 });
        this.e_mesin = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 300, 20], caption: "No Mesin", maxLength: 50, tag: 1 });
        this.e_polisi = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 17, 200, 20], caption: "No Polisi", maxLength: 50, tag: 1 });
        this.cb_klp_asset = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 18, 220, 20], caption: "Kelompok Asset", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });

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
            this.doLoad();

            this.stsCol = [0, 0, 0, 0];
            this.cb_klp_asset.setSQL("select kode_klp,nama_klp from amu_klp_brg where kode_lokasi='" + this.app._lokasi + "'", ["kode_klp", "nama_klp"], false, ["Kode", "Nama"], "where", "Data Kelompok Asset", true);
            this.c_show.setText("10");
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fAssetKBM.extend(window.childForm);
window.app_saku3_transaksi_amu_fAssetKBM.implement({
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
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("insert into amu_asset_kbm(kd_asset,no_rangka,merk,tipe,warna,png_jawab,no_mesin,no_polisi,kode_klp,kode_lokasi) values " +
                        "('" + this.cb_kode.getText() + "','" + this.e_no_rangka.getText() + "','" + this.e_merk.getText() + "','" + this.e_tipe.getText() + "','" + this.e_warna.getText() + "','" + this.e_png_jawab.getText() + "','" + this.e_mesin.getText() + "','" + this.e_polisi.getText() + "','" + this.cb_klp_asset.getText() + "','" + this.app._lokasi + "')");
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
                    sql.add("delete from amu_asset_kbm where kd_asset = '" + this.cb_kode.getText() + "' ");
                    sql.add("insert into amu_asset_kbm(kd_asset,no_rangka,merk,tipe,warna,png_jawab,no_mesin,no_polisi,kode_klp,kode_lokasi) values " +
                        "('" + this.cb_kode.getText() + "','" + this.e_no_rangka.getText() + "','" + this.e_merk.getText() + "','" + this.e_tipe.getText() + "','" + this.e_warna.getText() + "','" + this.e_png_jawab.getText() + "','" + this.e_mesin.getText() + "','" + this.e_polisi.getText() + "','" + this.cb_klp_asset.getText() + "','" + this.app._lokasi + "')");
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
                    sql.add("delete from amu_asset_kbm where kd_asset = '" + this.cb_kode.getText() + "' ");
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
        try {
            if (sender == this.cb_kode && this.cb_kode.getText() != "") {
                var strSQL = "select no_rangka,merk,tipe,warna,png_jawab,no_mesin,no_polisi,kode_klp from amu_asset_kbm where kd_asset ='" + this.cb_kode.getText() + "'";

                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.e_no_rangka.setText(line.no_rangka);
                        this.e_merk.setText(line.merk);
                        this.e_tipe.setText(line.tipe);
                        this.e_warna.setText(line.warna);
                        this.e_png_jawab.setText(line.png_jawab);
                        this.e_mesin.setText(line.no_mesin);
                        this.e_polisi.setText(line.no_polisi);
                        this.cb_klp_asset.setText(line.kode_klp);
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
                            this.app._mainForm.pesan(2, "transaksi telah sukses tersimpan (Kode : " + this.cb_kode.getText() + ")");
                            this.app._mainForm.bClear.click();
                        } else system.info(this, result, "");
                        break;
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
        var strSQL = "select kd_asset, no_polisi, png_jawab from amu_asset_kbm where kode_lokasi='" + this.app._lokasi + "'";
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
            this.sg1.appendData([line.kd_asset, line.no_polisi, line.png_jawab, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function (sender, page) {
        this.doTampilData(page);
    },
    doCari: function (sender) {
        try {

            var show = parseInt(this.c_show.getText());
            var column_array = ['kd_asset', 'no_polisi', 'png_jawab'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select kd_asset, no_polisi, png_jawab " +
                "from amu_asset_kbm " +
                "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "'";
            //alert(strSQL);

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

                var column_array = ['kd_asset', 'no_polisi', 'png_jawab'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select kd_asset, no_polisi, png_jawab " +
                    "from amu_asset_kbm " +
                    "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "'" +
                    " order by " + column_array[col] + " " + ordertype;
                //alert(strSQL);

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
        if (m < 10) m = "0" + m;
        var periode = '201812';
        if (parseFloat(periode.substr(4, 2)) <= 12) {
            this.e_periode.setText(y + "" + m);
        }
        else {
            this.e_periode.setText(periode);
        }
        if (this.stsSimpan == 1) this.doClick();
    },
	/*doUploadFinish: function (sender, result, data, filename) {
		try {
			if (result) {
				this.fileDest = data;
				this.iFoto.setImage(sender.param2 + data.tmpfile);
				this.iFoto.setProportional(true);
				this.e_foto.setText(trim(data.filedest));
			} else system.alert(this, "Error upload", "");
		} catch (e) {
			system.alert(this, "Error upload", e);
		}
	}*/
    // doUploadFinish2: function(sender, result, data, filename){
    // 	try{				
    // 		if (result){			
    // 			this.fileDest2 = data;
    // 			// this.iTtd.setImage(sender.param2+data.tmpfile);		
    // 			// this.iTtd.setProportional(true);
    // 			this.e_dok.setText(trim(data.filedest) );
    // 		}else system.alert(this,"Error upload","");
    // 	}catch(e){
    // 		system.alert(this,"Error upload",e);
    // 	}
    // }
});