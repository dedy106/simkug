window.app_saku3_transaksi_amu_fGedungMilik = function(owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fGedungMilik.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fGedungMilik";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Gedung Milik", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Gedung Milik", "Data Gedung Milik"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth: 0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64],colCount: 4,tag: 9,
            colTitle: ["No Bukti", "Gedung", "Keterangan", "Pilih"],
            colWidth: [[3, 2, 1, 0],[70, 350, 200, 100]],            
            colFormat: [[3],[cfButton]],colAlign: [[3], [alCenter]],
            readOnly: true,
            dblClick: [this, "doDoubleClick"],click: [this, "doSort"],autoAppend: false,defaultRow: 1
        });        
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "No Bukti", readOnly:true, change: [this, "doChange"] });
        this.cb_gedung = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "ID Gedung", maxLength: 20, multiSelection: false, change: [this, "doChange"],rightLabelVisible:false });
        this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Gedung", readOnly:true, tag: 1 });		
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 450, 20], caption: "Alamat Gedung", readOnly:true, tag: 1 });
		this.e_namalahan = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Lahan", readOnly:true, tag: 1 });
        this.e_kawas = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 450, 20], caption: "Kawasan", readOnly:true, tag: 1 });                		
        this.e_lembaga = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 17, 450, 20], caption: "Lembaga", readOnly:true, tag: 1 });                		
        this.e_nilpe = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 15, 200, 20], caption: "Nilai Perolehan", tag: 1, tipeText: ttNilai, text: "0", maxLength: 10 });
		this.e_tgl_pr = new portalui_label(this.pc1.childPage[1], { bound: [20, 16, 100, 20], caption: "Tanggal Perolehan", underline: true });
		this.dp_tgl_pr = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 16, 98, 18]});
        this.e_ket = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 450, 20], caption: "Keterangan", maxLength: 250, tag: 1 });

        this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,186], childPage:["Data IMB"]});
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:8,
		            colTitle:["No IMB","Keterangan","Tgl Terbit"],
					colWidth:[[2,1,0],[100,400,200]],										
					buttonStyle:[[2],[bsDate]], 					
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		
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
            this.cb_gedung.setSQL("select id_gedung,nama_gedung from amu_gedung where kode_lokasi='" + this.app._lokasi + "' and status='Milik'", ["id_gedung", "nama_gedung"], false, ["ID", "Nama"], "where", "Data Gedung", true);
            this.c_show.setText("10");
            this.timeout = null;

        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fGedungMilik.extend(window.childForm);
window.app_saku3_transaksi_amu_fGedungMilik.implement({
    doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_gedung_milik", "no_bukti", this.app._lokasi + "-GM" + this.tahun.substr(2,2) + ".", "0000"));                    				
		this.cb_gedung.setFocus();     																	
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
                    sql.add("insert into  amu_gedung_milik (no_bukti,id_gedung,n_oleh,tgl_oleh,nik_user,tgl_input,keterangan,kode_lokasi) values " +
                             "('"+this.cb_kode.getText()+"','"+this.cb_gedung.getText()+"',"+nilaiToFloat(this.e_nilpe.getText())+",'"+this.dp_tgl_pr.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_ket.getText()+"','"+this.app._lokasi+"')");

                    if (this.sg.getRowValidCount() > 0){
                        for (var i=0;i < this.sg.getRowCount();i++){
                            if (this.sg.rowValid(i)){
                             sql.add("insert into amu_imb(kode_lokasi,id_imb,no_imb,nama,tgl_terbit,id_gedung) values " +
                                     "('" + this.app._lokasi + "','" + this.cb_kode.getText() + "','" + this.sg.cells(0,i)+ "','" + this.sg.cells(1,i)+ "','" + this.sg.getCellDateValue(2,i) + "','"+this.cb_gedung.getText()+"')");
                            }
                        }
                    }

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
                    sql.add("delete from amu_gedung_milik where no_bukti = '" + this.cb_kode.getText() + "' ");
                    sql.add("delete from amu_imb where id_gedung = '" + this.cb_gedung.getText() + "' ");
                    sql.add("insert into  amu_gedung_milik (no_bukti,id_gedung,n_oleh,tgl_oleh,nik_user,tgl_input,keterangan,kode_lokasi) values " +
                             "('"+this.cb_kode.getText()+"','"+this.cb_gedung.getText()+"',"+nilaiToFloat(this.e_nilpe.getText())+",'"+this.dp_tgl_pr.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_ket.getText()+"','"+this.app._lokasi+"')");

                    if (this.sg.getRowValidCount() > 0){
                        for (var i=0;i < this.sg.getRowCount();i++){
                            if (this.sg.rowValid(i)){
                                sql.add("insert into amu_imb(kode_lokasi,id_imb,no_imb,nama,tgl_terbit,id_gedung) values " +
                                        "('" + this.app._lokasi + "','" + this.cb_kode.getText() + "','" + this.sg.cells(0,i)+ "','" + this.sg.cells(1,i)+ "','" + this.sg.getCellDateValue(2,i) + "','"+this.cb_gedung.getText()+"')");
                            }
                        }
                    }
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
                    sql.add("delete from amu_gedung_milik where no_bukti = '" + this.cb_kode.getText() + "' ");
                    sql.add("delete from amu_imb where id_gedung = '" + this.cb_gedung.getText() + "' ");
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
                this.sg.clear(1);
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
                var strSQL = "select  * from amu_gedung_milik where no_bukti ='" + this.cb_kode.getText() + "'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.cb_gedung.setText(line.id_gedung);
                        this.e_nilpe.setText(floatToNilai(line.n_oleh));
                        this.dp_tgl_pr.setDateString(line.tgl_oleh);
                        this.e_ket.setText(line.keterangan);

                        var str = "select no_imb,nama,convert(varchar,tgl_terbit,103) as tgl from amu_imb where id_gedung='"+this.cb_gedung.getText()+"' order by id_imb";
                        var data = this.dbLib.getDataProvider(str,true);
                        if (typeof data == "object" && data.rs.rows[0] != undefined){
                            var line;
                            this.sg.clear();
                            for (var i in data.rs.rows){
                                line = data.rs.rows[i];												
                                this.sg.appendData([line.no_imb,line.nama,line.tgl]);
                            }
                        } else this.sg.clear(1);	

                        setTipeButton(tbUbahHapus);
                        this.stsSimpan=0;
                    } else {
                        this.stsSimpan=1;
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                    }
                }
            }

            if (sender == this.cb_gedung && this.cb_gedung.getText() != "") {
                var strSQL = "select a.nama_lahan,f.nama as kawasan,g.nama as lembaga,b.nama_Gedung,b.alamat  "+ 
                             "from amu_lahan a "+
                             "inner join amu_gedung b on a.id_lahan=b.id_lahan "+
                             "inner join amu_kawasan f on f.id_kawasan=a.id_kawasan "+
                             "inner join amu_lembaga g on b.id_lembaga=g.id_lembaga "+
							 "where b.id_gedung ='" + this.cb_gedung.getText() + "' and a.kode_lokasi='"+this.app._lokasi+"' ";											 
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
                        this.e_nama.setText(line.nama_gedung);
                        this.e_alamat.setText(line.alamat);                        
						this.e_namalahan.setText(line.nama_lahan);
                        this.e_kawas.setText(line.kawasan);
                        this.e_lembaga.setText(line.lembaga);                        
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
        var strSQL = "select  a.no_bukti,b.nama_gedung,a.keterangan from amu_gedung_milik a inner join amu_gedung b on a.id_gedung=b.id_gedung where a.kode_lokasi='"+this.app._lokasi+"'";            
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
            this.sg1.appendData([line.no_bukti, line.nama_gedung, line.keterangan, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function(sender, page) {
        this.doTampilData(page);
    },
    doCari: function(sender) {
        try {
            var show = parseInt(this.c_show.getText());
            var column_array = ['a.no_bukti', 'b.nama_gedung', 'a.keterangan'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select a.no_bukti, b.nama_gedung, a.keterangan " +
                "from amu_gedung_milik a inner join amu_gedung b on a.id_gedung=b.id_gedung " +
                "where " + filter_string + " and a.kode_lokasi='"+this.app._lokasi+"'";

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

                var column_array = ['a.no_bukti', 'b.nama_gedung', 'a.keterangan'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select a.no_bukti, b.nama_gedung, a.keterangan " +
                    "from amu_gedung_milik a inner join amu_gedung b on a.id_gedung=b.id_gedung " +
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