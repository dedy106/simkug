window.app_saku3_transaksi_amu_fPKSaman = function (owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fPKSaman.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fPKSaman";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Amandemen PKS", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar PKS", "Data PKS"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64], colCount: 3, tag: 9,
            colTitle: ["ID Amandemen", "Perihal", "Pilih"],
            colWidth: [[2,1,0], [70,350,120]],
            colFormat: [[2], [cfButton]], colAlign: [[2], [alCenter]],
            readOnly: true,
            dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "ID Amandemen", maxLength: 10, change: [this, "doChange"],readOnly:true });                
        this.cb_pks = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 15, 220, 20], caption: "ID PKS", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
        this.e_jenis = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 200, 20], caption: "Jenis PKS", maxLength: 50, tag: 1 });
        this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tanggal PKS", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,100,18]}); 
        this.e_nopks = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 14, 500, 20], caption: "No PKS", maxLength: 200, tag: 1 });
        this.cb_vendor = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Mitra",tag:2,multiSelection:false});         		
        this.e_nopks2 = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 500, 20], caption: "No PKS Mitra", maxLength: 200, tag: 1 });
        this.e_ket = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 17, 500, 20], caption: "Perihal", maxLength: 200, tag: 1 });
        this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tanggal Mulai", underline:true});
        this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,98,18]}); 
        this.l_tgl3 = new portalui_label(this.pc1.childPage[1],{bound:[20,14,100,18],caption:"Tanggal Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,14,98,18]}); 

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
            this.stsSimpan=1;
            var data = this.dbLib.getDataProvider("select year(getdate()) as tahun", true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];
				if (line != undefined) {
					this.tahun = line.tahun;
				}
			}
            this.doLoad();
            this.cb_pks.setSQL("select id_pks,keterangan from amu_pks where id_amandemen='-' and kode_lokasi='"+this.app._lokasi+"'",["id_pks","keterangan"],false,["ID","Keterangan"],"and","Data PKS",true);													
            this.cb_vendor.setSQL("select a.kode_vendor,a.nama from vendor a inner join vendor_klp b on a.kode_klpvendor=b.kode_klpvendor and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["ID","Nama"],"and","Data Mitra",true);													

            this.stsCol = [0, 0, 0];
            this.c_show.setText("10");
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fPKSaman.extend(window.childForm);
window.app_saku3_transaksi_amu_fPKSaman.implement({
    doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_pks", "id_pks",this.app._lokasi+"-AMD" + this.tahun.substr(2,2) + ".", "0000"));                    				
		this.cb_pks.setFocus();     																	
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
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("update amu_pks set id_amandemen='"+this.cb_kode.getText()+"' where id_pks='"+this.cb_pks.getText()+"' ");
                    sql.add("insert into amu_pks(id_pks,jenis,tanggal,no_pks,no_pks_mitra,kode_vendor,keterangan,tgl_mulai,tgl_selesai,kode_lokasi,id_amandemen,modul) values " +
                            "('" + this.cb_kode.getText() + "','"+this.e_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nopks.getText()+"','"+this.e_nopks2.getText()+"','"+this.cb_vendor.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"', '" + this.app._lokasi + "','-','AMD')");
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
                    sql.add("update amu_pks set id_amandemen='-' where id_amandemen='"+this.cb_kode.getText()+"' ");
                    sql.add("delete from amu_pks where id_pks = '" + this.cb_kode.getText() + "' ");
                    
                    sql.add("update amu_pks set id_amandemen='"+this.cb_kode.getText()+"' where id_pks='"+this.cb_pks.getText()+"' ");
                    sql.add("insert into amu_pks(id_pks,jenis,tanggal,no_pks,no_pks_mitra,kode_vendor,keterangan,tgl_mulai,tgl_selesai,kode_lokasi,id_amandemen,modul) values " +
                            "('" + this.cb_kode.getText() + "','"+this.e_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nopks.getText()+"','"+this.e_nopks2.getText()+"','"+this.cb_vendor.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"', '" + this.app._lokasi + "','"+this.idAmandemen+"','AMD')");
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
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from amu_pks where id_pks = '" + this.cb_kode.getText() + "' ");
                    sql.add("update amu_pks set id_amandemen='-' where id_amandemen='"+this.cb_kode.getText()+"'");
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
                this.cb_pks.setSQL("select id_pks,keterangan from amu_pks where id_amandemen='-' and kode_lokasi='"+this.app._lokasi+"'",["id_pks","keterangan"],false,["ID","Keterangan"],"and","Data PKS",true);													
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
            if (sender == this.cb_kode &&  this.cb_kode.getText() != "") {
                var strSQL = "select * from amu_pks where id_pks ='" + this.cb_kode.getText() + "'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.stsSimpan=0;       

                        this.cb_pks.setSQL("select id_pks,keterangan from amu_pks where id_amandemen='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["id_pks","keterangan"],false,["ID","Keterangan"],"and","Data PKS",true);													
                        var strSQL2 = "select id_pks,keterangan from amu_pks where id_amandemen ='" + this.cb_kode.getText() + "'";
                        var data2 = this.dbLib.getDataProvider(strSQL2, true);
                        if (typeof data2 == "object") {
                            var line2 = data2.rs.rows[0];
                            if (line2 != undefined) {
                                this.cb_pks.setText(line2.id_pks,line2.keterangan);
                            }
                        }

                        this.e_jenis.setText(line.jenis);
                        this.dp_d1.setText(line.tanggal);
                        this.dp_d2.setText(line.tgl_mulai);
                        this.dp_d3.setText(line.tgl_selesai);
                        this.cb_vendor.setText(line.kode_vendor);
                        this.e_ket.setText(line.keterangan);
                        this.e_nopks.setText(line.no_pks);
                        this.e_nopks2.setText(line.no_pks_mitra);
                        this.idAmandemen = line.id_amandemen; //utk mode edit
                        
                        setTipeButton(tbUbahHapus);
                    }
                    else {
                        this.stsSimpan=1;
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                    }
                }
            }

            if (sender == this.cb_pks &&  this.cb_pks.getText() != "" && this.stsSimpan==1) {
                var strSQL = "select * from amu_pks where id_pks ='" + this.cb_pks.getText() + "'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.e_jenis.setText(line.jenis);
                        this.dp_d1.setText(line.tanggal);
                        this.dp_d2.setText(line.tgl_mulai);
                        this.dp_d3.setText(line.tgl_selesai);
                        this.cb_vendor.setText(line.kode_vendor);
                        this.e_ket.setText(line.keterangan);
                        this.e_nopks.setText(line.no_pks);
                        this.e_nopks2.setText(line.no_pks_mitra);                        
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
                }
            }
            catch (e) {
                systemAPI.alert("step : " + step + "; error = " + e);
            }
        }
    },
    doLoad: function (sender) {
        var show = parseInt(this.c_show.getText());
        var strSQL = "select id_pks, keterangan from amu_pks where kode_lokasi='" + this.app._lokasi + "' and modul='AMD' ";
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
            this.sg1.appendData([line.id_pks, line.keterangan, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function (sender, page) {
        this.doTampilData(page);
    },
    doCari: function (sender) {
        try {

            var show = parseInt(this.c_show.getText());
            var column_array = ['id_pks', 'keterangan'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select id_pks, keterangan " +
                "from amu_pks " +
                "where" + filter_string + "and kode_lokasi= '" + this.app._lokasi + "' and modul='AMD' ";
            
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

                var column_array = ['id_pks', 'keterangan'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select id_pks, keterangan " +
                    "from amu_pks " +
                    "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "' and modul='AMD' " +
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