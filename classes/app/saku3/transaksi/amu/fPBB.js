window.app_saku3_transaksi_amu_fPBB = function (owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fPBB.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fPBB";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Pajak Bumi dan Bangunan", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar PBB", "Data PBB"] });
        // this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64], colCount: 4, tag: 9,
            colTitle: ["Id PBB", "N O P", "Obyek", "Pilih"],
            colWidth: [[3,2,1,0], [70,600,200,50]],
            colHide:[[0],[true]],
            colFormat: [[3], [cfButton]], colAlign: [[3], [alCenter]],
            readOnly: true,
            dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.e_nop = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 19, 300, 20], caption: "N O P", maxLength: 100, tag: 2,change: [this, "doChange"]});
        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "Id PBB", maxLength: 100, change: [this, "doChange"], readOnly:true});
		this.cb_lembaga = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 31, 220, 20], caption: "Lembaga", maxLength: 20, multiSelection: false,change: [this, "doChange"] });
        this.cb_kawas = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 32, 220, 20], caption: "Kawasan", readOnly:true });        
		this.e_obyek = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 18, 600, 20], caption: "Letak Objek Pajak", maxLength: 200, tag: 1 });
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 17, 600, 20], caption: "Nama Wajib Pajak", maxLength: 100, tag: 1 });
        this.e_alamat = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 600, 20], caption: "Alamat Wajib Pajak", maxLength: 200, tag: 1 });

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
            
            this.standarLib = new util_standar();
            this.doLoad();
			this.cb_lembaga.setSQL("select id_lembaga,nama from amu_lembaga", ["id_lembaga", "nama"], false, ["ID", "Nama"], "where", "Data Lembaga", true);
            this.stsCol = [0, 0, 0, 0];
              this.c_show.setText("10");
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fPBB.extend(window.childForm);
window.app_saku3_transaksi_amu_fPBB.implement({
    // doTambah: function() {
    //     this.pc1.setActivePage(this.pc1.childPage[1]);	        																	
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
            if (this.standarLib.checkEmptyByTag(this, [0, 1,2])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("insert into amu_pbb(kode_lokasi,id_pbb,nop, obyek, nama, alamat,id_lembaga) values " +
                            "('" + this.app._lokasi + "','" + this.cb_kode.getText() + "','"+this.e_nop.getText()+"','" + this.e_obyek.getText() + "','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_lembaga.getText()+"')");
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
            if (this.standarLib.checkEmptyByTag(this, [0, 1,2])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from amu_pbb where id_pbb = '" + this.cb_kode.getText() + "' ");
                    sql.add("insert into amu_pbb(kode_lokasi,id_pbb,nop, obyek, nama, alamat,id_lembaga) values " +
                            "('" + this.app._lokasi + "','" + this.cb_kode.getText() + "','"+this.e_nop.getText()+"','" + this.e_obyek.getText() + "','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_lembaga.getText()+"')");
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
            if (this.standarLib.checkEmptyByTag(this, [0, 1,2])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from amu_pbb where id_pbb = '" + this.cb_kode.getText() + "' ");
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
                if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0", "1","2"), this.cb_kode);
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
        if (sender == this.e_njop_l && this.e_njop_l.getText() != "" || sender == this.e_njop_b && this.e_njop_b.getText() != "") {
            total = nilaiToFloat(this.e_njop_l.getText()) + nilaiToFloat(this.e_njop_b.getText())
            this.e_ttl.setText(total);
        }
        
        try {
            if (sender == this.e_nop && this.e_nop.getText() != "") {
                var strSQL = "select id_pbb from amu_pbb where nop = '"+this.e_nop.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.cb_kode.setText(line.id_pbb);
                    }                    
                    else {
                        var strSQL = "select (max(cast (id_pbb as int) )+1) as idpbb From amu_pbb";
                        var data = this.dbLib.getDataProvider(strSQL, true);
                        if (typeof data == "object") {
                            var line = data.rs.rows[0];
                            if (line != undefined) {
                                this.cb_kode.setText(line.idpbb);                                
                            }                    
                        }
                    }
                }
            }

            if (sender == this.cb_kode && this.cb_kode.getText() != "") {
                var strSQL = "select id_pbb, kode_lokasi, nop, obyek, nama, alamat,id_lembaga " +
                             "from amu_pbb where id_pbb ='" + this.cb_kode.getText() + "'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {                    
                        this.e_obyek.setText(line.obyek);
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat); 
						this.cb_lembaga.setText(line.id_lembaga);						
                        setTipeButton(tbUbahHapus);
                    }
                    else {
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);                                                
                    }
                }
            }
            if (sender == this.cb_lembaga && this.cb_lembaga.getText() != "") {
                var strSQL = "select b.id_kawasan,b.nama from amu_lembaga a inner join amu_kawasan b on a.id_kawasan=b.id_kawasan where a.id_lembaga='"+this.cb_lembaga.getText()+"' ";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.cb_kawas.setText(line.id_kawasan,line.nama);
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
                this.e_nop.setText(this.sg1.cells(1, row));
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
                }
            }
            catch (e) {
                systemAPI.alert("step : " + step + "; error = " + e);
            }
        }
    },
    doLoad: function (sender) {
        var show = parseInt(this.c_show.getText());
        var strSQL = "select id_pbb,nop,obyek from amu_pbb " +
            "where kode_lokasi='" + this.app._lokasi + "' order by nop";
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
            this.sg1.appendData([line.id_pbb, line.nop, line.obyek, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function (sender, page) {
        this.doTampilData(page);
    },
    doCari: function (sender) {
        try {
            var show = parseInt(this.c_show.getText());
            var column_array = ['id_pbb', 'nop', 'obyek'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select id_pbb,nop,obyek " +
                "from amu_pbb " +
                "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "' order by nop";
            
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

                var column_array = ['id_pbb', 'nop', 'obyek'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select id_pbb,nop,obyek " +
                    "from amu_pbb " +
                    "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "'" +
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
    doClick: function (sender) {        
        this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_pbb", "id_pbb", this.app._lokasi + "-NPB" + this.app._periode + ".", "000"));                    
    }
});