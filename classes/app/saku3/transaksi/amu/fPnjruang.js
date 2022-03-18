window.app_saku3_transaksi_amu_fPnjruang = function(owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fPnjruang.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fPnjruang";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Penanggungjawab Ruangan", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Data PngJawab", "Data PngJawab"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth: 0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64],colCount: 4,tag: 9,
            colTitle: ["No Bukti", "Nama PngJawab", "No SK", "Pilih"],
            colWidth: [[3, 2, 1, 0],[70, 350, 200, 100]],
            colFormat: [[3],[cfButton]],
            colAlign: [[3],[alCenter]],
            readOnly: true,dblClick: [this, "doDoubleClick"],click: [this, "doSort"],autoAppend: false,defaultRow: 1
        });        
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "No Bukti", maxLength: 20, change: [this, "doChange"],readOnly:true });
        this.cb_gedung = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "ID Gedung", maxLength: 20, multiSelection: false, change: [this, "doChange"] });
        this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Gedung", readOnly:true, tag: 1 });		
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 450, 20], caption: "Alamat Gedung", readOnly:true, tag: 1 });
		this.e_namalahan = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Lahan", readOnly:true, tag: 1 });
        this.e_kawas = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 450, 20], caption: "Kawasan", readOnly:true, tag: 1 });                		
        this.e_lembaga = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 17, 450, 20], caption: "Lembaga", readOnly:true, tag: 1 });                		        
        this.e_nosk = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 13, 450, 20], caption: "No SK", maxLength: 100, tag: 1 });
        this.cb_nik = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "N I K PngJawab", maxLength: 20, multiSelection: false});
        this.e_tgl_mulai = new portalui_label(this.pc1.childPage[1], { bound: [20, 21, 100, 20], caption: "Tanggal Mulai", underline: true });
        this.dp_tgl_mulai = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 21, 98, 18]});
        this.e_tgl_akhir = new portalui_label(this.pc1.childPage[1], { bound: [20, 23, 100, 20], caption: "Tanggal Berakhir", underline: true });
        this.dp_tgl_akhir = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 23, 98, 18] });
        this.c_status = new saiCB(this.pc1.childPage[1], { bound: [20, 21, 200, 20], caption: "Status Aktif", items: ["1-Aktif", "0-Non Aktif"], readOnly: true, tag: 2 });

        this.sgr = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,133],colCount:3,tag:0,
                    colTitle:["ID Ruangan","Nama Ruangan","Lantai"],
                    colWidth:[[2,1,0],[100,200,100]],			
                    columnReadOnly:[true,[0,1,2],[]],							
                    buttonStyle:[[0],[bsEllips]], ellipsClick:[this,"doEllipsClickr"],change:[this,"doChangeCellr"],                    
                    autoAppend:true,defaultRow:1});
        this.sgnr = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sgr});				

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
            this.cb_gedung.setSQL("select id_gedung,nama_gedung from amu_gedung where kode_lokasi='" + this.app._lokasi + "'", ["id_gedung", "nama_gedung"], false, ["ID", "Nama"], "where", "Data Gedung", true);
            this.cb_nik.setSQL("select nik,nama from karyawan where flag_aktif='1'", ["nik", "nama"], false, ["NIK", "Nama"], "where", "Data Karyawan", true);
            this.c_show.setText("10");
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fPnjruang.extend(window.childForm);
window.app_saku3_transaksi_amu_fPnjruang.implement({
    doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_pnj_ruang", "no_bukti", this.app._lokasi + "-PJ" + this.tahun.substr(2,2) + ".", "0000"));                    				
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
                    sql.add("insert into amu_pnj_ruang(no_bukti, id_gedung, kode_lokasi, no_sk, nik, tgl_mulai, tgl_selesai, nik_user, tgl_input, flag_aktif) values " +
                            "('" + this.cb_kode.getText() + "','" + this.cb_gedung.getText() + "','" + this.app._lokasi + "','" + this.e_nosk.getText() + "','" + this.cb_nik.getText() + "','" + this.dp_tgl_mulai.getDateString() + "','" + this.dp_tgl_akhir.getDateString() + "','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"')");

                    if (this.sgr.getRowValidCount() > 0){
                        for (var i=0;i < this.sgr.getRowCount();i++){
                            if (this.sgr.rowValid(i)){
                                sql.add("insert into amu_pnj_ruang_d(no_bukti,kode_lokasi,no_ruangan,id_gedung) values "+
                                        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sgr.cells(0,i)+"','"+this.cb_gedung.getText()+"')");
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
                    sql.add("delete from amu_pnj_ruang where no_bukti = '" + this.cb_kode.getText() + "' ");
                    sql.add("delete from amu_pnj_ruang_d where no_bukti = '" + this.cb_kode.getText() + "' ");
                    sql.add("insert into amu_pnj_ruang(no_bukti, id_gedung, kode_lokasi, no_sk, nik, tgl_mulai, tgl_selesai, nik_user, tgl_input, flag_aktif) values " +
                            "('" + this.cb_kode.getText() + "','" + this.cb_gedung.getText() + "','" + this.app._lokasi + "','" + this.e_nosk.getText() + "','" + this.cb_nik.getText() + "','" + this.dp_tgl_mulai.getDateString() + "','" + this.dp_tgl_akhir.getDateString() + "','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"')");
                    
                    if (this.sgr.getRowValidCount() > 0){
                        for (var i=0;i < this.sgr.getRowCount();i++){
                            if (this.sgr.rowValid(i)){
                                sql.add("insert into amu_pnj_ruang_d(no_bukti,kode_lokasi,no_ruangan,id_gedung) values "+
                                        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sgr.cells(0,i)+"','"+this.cb_gedung.getText()+"')");
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
                    sql.add("delete from amu_pnj_ruang where no_bukti = '" + this.cb_kode.getText() + "' ");
                    sql.add("delete from amu_pnj_ruang_d where no_bukti = '" + this.cb_kode.getText() + "' ");
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
                this.sgr.clear(1);   
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
                var strSQL = "select  id_gedung, kode_lokasi, no_ruangan, no_sk, nik, tgl_mulai, tgl_selesai,flag_aktif " +
                             "from amu_pnj_ruang where no_bukti ='" + this.cb_kode.getText() + "'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.cb_gedung.setText(line.id_gedung);
                        this.e_nosk.setText(line.no_sk);
                        this.cb_nik.setText(line.nik);
                        this.dp_tgl_mulai.setDateString(line.tgl_mulai);
                        this.dp_tgl_akhir.setDateString(line.tgl_selesai);    
                        this.c_status.setText(line.flag_aktif); 
                        
                        var data = this.dbLib.getDataProvider("select * from amu_pnj_ruang_d a inner join amu_ruangan b on a.no_ruangan=b.no_ruangan and a.id_gedung=b.id_gedung where a.no_bukti='"+this.cb_kode.getText()+"'",true);
                        if (typeof data == "object" && data.rs.rows[0] != undefined){
                            var line;
                            this.sgr.clear();
                            for (var i in data.rs.rows){
                                line = data.rs.rows[i];												
                                this.sgr.appendData([line.no_ruangan,line.nama_ruangan,line.lantai]);
                            }
                        } else this.sgr.clear(1);

                        setTipeButton(tbUbahHapus);
                        this.stsSimpan=0;
                    } else {
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                        this.stsSimpan=1;
                    }                    
                }  
            }

            if (sender == this.cb_gedung && this.cb_gedung.getText() != "") {
                var strSQL = "select a.nama_lahan,f.nama as kawasan,g.nama as lembaga,b.nama_gedung,b.alamat  "+ 
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
    doEllipsClickr: function(sender, col, row){
		try{			
			if (sender == this.sgr && this.cb_gedung.getText()!="") {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Ruangan",sender,undefined, 
						    "select no_ruangan,nama_ruangan from amu_ruangan where id_gedung='"+this.cb_gedung.getText()+"'",
							"select count(*) from amu_ruangan where id_gedung='"+this.cb_gedung.getText()+"'",
							["no_ruangan","nama"],"and",["ID","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
    },	
    doChangeCellr: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sgr.cells(0,row) != "") {				
				var strSQL = "select lantai  "+ 
                             "from amu_ruangan  "+
                             "where no_ruangan ='" + this.sgr.cells(0,row) + "' and id_gedung='"+this.cb_gedung.getText()+"'";											 
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {                        
                        this.sgr.cells(2,row,line.lantai);                                                
                    }
                }				
			}
		}				
		sender.onChange.set(this,"doChangeCellr");		
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
        var strSQL = "select  a.no_bukti,b.nama, a.no_sk from amu_pnj_ruang a inner join karyawan b on a.nik=b.nik  " +
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
            this.sg1.appendData([line.no_bukti, line.nama, line.no_sk, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function(sender, page) {
        this.doTampilData(page);
    },
    doCari: function(sender) {
        try {
            var show = parseInt(this.c_show.getText());
            var column_array = ['a.no_bukti', 'b.nama', 'a.no_sk'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select a.no_bukti, b.nama, a.no_sk " +
                "from amu_pnj_ruang a inner join karyawan b on a.nik=b.nik " +
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

                var column_array = ['a.no_bukti', 'b.nama', 'a.no_sk'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select a.no_bukti, b.nama, a.no_sk " +
                    "from amu_pnj_ruang a inner join karyawan b on a.nik=b.nik " +
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