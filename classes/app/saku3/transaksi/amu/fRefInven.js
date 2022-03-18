window.app_saku3_transaksi_amu_fRefInven = function(owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fRefInven.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fRefInven";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Referensi Jadwal Inventarisasi", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Data PngJawab", "Data PngJawab"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth: 0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64],colCount: 4,tag: 9,
            colTitle: ["No Bukti", "Deskripsi", "No SK", "Pilih"],
            colWidth: [[3, 2, 1, 0],[70, 350, 200, 100]],
            colFormat: [[3],[cfButton]],
            colAlign: [[3],[alCenter]],
            readOnly: true,dblClick: [this, "doDoubleClick"],click: [this, "doSort"],autoAppend: false,defaultRow: 1
        });        
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "No Bukti", maxLength: 20, change: [this, "doChange"],readOnly:true });
        this.e_ket = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Deskripsi", maxLength: 200, tag: 1 });
        this.e_nosk = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 450, 20], caption: "No SK", maxLength: 100, tag: 1 });
        this.e_tgl_mulai = new portalui_label(this.pc1.childPage[1], { bound: [20, 21, 100, 20], caption: "Tanggal Mulai", underline: true });
        this.dp_tgl_mulai = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 21, 98, 18], selectDate: [this, "doSelectDate"]});
        this.e_tgl_akhir = new portalui_label(this.pc1.childPage[1], { bound: [20, 23, 100, 20], caption: "Tanggal Berakhir", underline: true });
        this.dp_tgl_akhir = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 23, 98, 18] });
        this.c_status = new saiCB(this.pc1.childPage[1], { bound: [20, 21, 200, 20], caption: "Status Aktif", items: ["1-Aktif", "0-Non Aktif"], readOnly: true, tag: 2 });

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
            this.doSelectDate(this.dp_tgl_mulai,this.dp_tgl_mulai.year,this.dp_tgl_mulai.month,this.dp_tgl_mulai.day);

            var data = this.dbLib.getDataProvider("select year(getdate()) as tahun", true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];
				if (line != undefined) {
					this.tahun = line.tahun;
				}
            }
            
            this.doLoad();
            this.stsCol = [0, 0, 0, 0];
            this.c_show.setText("10");
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fRefInven.extend(window.childForm);
window.app_saku3_transaksi_amu_fRefInven.implement({    
    doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_jadwal_inv", "no_bukti", this.app._lokasi + "-JD" + this.tahun.substr(2,2) + ".", "0000"));                    				
		this.e_ket.setFocus();     																	
    },
    doSelectDate: function(sender, y, m, d) {
        try {            
            //alert("select convert(varchar,dateadd(month,3,'"+this.dp_tgl_mulai.getDateString()+"'),103) as tgl)");
            var data = this.dbLib.getDataProvider("select convert(varchar,dateadd(month,3,'"+this.dp_tgl_mulai.getDateString()+"')-1,103) as tgl", true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];
				if (line != undefined) {
					this.dp_tgl_akhir.setText(line.tgl);
				}
            }

        }
        catch(e) {
            alert(e);
        }
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
                    sql.add("insert into amu_jadwal_inv(no_bukti, kode_lokasi, keterangan, no_sk,  tgl_mulai, tgl_selesai, nik_user, tgl_input, flag_aktif) values " +
                            "('" + this.cb_kode.getText() + "','" + this.app._lokasi + "','" + this.e_ket.getText() + "','" + this.e_nosk.getText() + "','" + this.dp_tgl_mulai.getDateString() + "','" + this.dp_tgl_akhir.getDateString() + "','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"')");
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
                    sql.add("delete from amu_jadwal_inv where no_bukti = '" + this.cb_kode.getText() + "' ");
                    sql.add("insert into amu_jadwal_inv(no_bukti, kode_lokasi, keterangan, no_sk,  tgl_mulai, tgl_selesai, nik_user, tgl_input, flag_aktif) values " +
                            "('" + this.cb_kode.getText() + "','" + this.app._lokasi + "','" + this.e_ket.getText() + "','" + this.e_nosk.getText() + "','" + this.dp_tgl_mulai.getDateString() + "','" + this.dp_tgl_akhir.getDateString() + "','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"')");
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
                    sql.add("delete from amu_jadwal_inv where no_bukti = '" + this.cb_kode.getText() + "' ");
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
                this.pc1.setActivePage(this.pc1.childPage[1]);
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
                var strSQL = "select * " +
                             "from amu_jadwal_inv where no_bukti ='" + this.cb_kode.getText() + "'";                             
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.e_ket.setText(line.keterangan);
                        this.e_nosk.setText(line.no_sk);
                        this.dp_tgl_mulai.setDateString(line.tgl_mulai);
                        this.dp_tgl_akhir.setDateString(line.tgl_selesai);    
                        this.c_status.setText(line.flag_aktif);                    
                        setTipeButton(tbUbahHapus);
                        this.stsSimpan=0;
                    } else {
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                        this.stsSimpan=1;
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
        var strSQL = "select  a.no_bukti,a.keterangan, a.no_sk from amu_jadwal_inv a " +
                     "where a.kode_lokasi='" + this.app._lokasi + "' order by a.flag_aktif desc";
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
            this.sg1.appendData([line.no_bukti, line.keterangan, line.no_sk, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function(sender, page) {
        this.doTampilData(page);
    },
    doCari: function(sender) {
        try {
            var show = parseInt(this.c_show.getText());
            var column_array = ['a.no_bukti', 'a.keterangan', 'a.no_sk'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select a.no_bukti, a.keterangan, a.no_sk " +
                "from amu_pnj_ruang a  " +
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

                var column_array = ['a.no_bukti', 'a.keterangan', 'a.no_sk'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select a.no_bukti, a.keterangan, a.no_sk " +
                    "from amu_jadwal_inv a " +
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