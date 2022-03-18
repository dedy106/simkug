window.app_saku3_transaksi_amu_fMAssetBer = function (owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fMAssetBer.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fMAssetBer";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Monitoring Asset Bergerak", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar Monitoring", "Data Monitoring"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doClick"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth: 0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64], colCount: 6, tag: 9,
            colTitle: ["ID Monitoring", "Kode Barcode", "ID Gedung", "No Ruangan", "Tanggal", "Pilih"],
            colWidth: [[0, 1, 2, 3, 4, 5], [150, 150, 150, 150, 150, 70]],
            colFormat: [[5], [cfButton]], colAlign: [[5], [alCenter]],
            readOnly: true,
            dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.e_periode = new portalui_saiLabelEdit(this, { bound: [150, 21, 220, 20], caption: "Periode", tag: 2, readOnly: true, visible: false });
        this.e_tgl = new portalui_label(this.pc1.childPage[1], { bound: [20, 21, 100, 20], caption: "Tanggal", underline: true });
        this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 21, 98, 18] , selectDate: [this, "doSelectDate"] });
        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "No Monitoring", maxLength: 20, change: [this, "doChange"], readOnly: true });
        this.cb_gedung = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 11, 220, 20], caption: "Gedung", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
        this.cb_ruangan = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "Ruangan", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
        this.e_user = new portalui_saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 450, 20], caption: "NIK", tag: 2, readOnly: true });
       
        this.sgr = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,294],colCount:6,tag:0,
            colTitle:["Barcode","Spesifikasi","No Seri","Merk","Tipe","Status"],
            colWidth:[[5,4,3,2,1,0],[120,150,150,150,250,100]],			
            columnReadOnly:[true,[0,1,2,3,4,5],[]],							
            buttonStyle:[[0,5],[bsEllips,bsAuto]], 
            picklist:[[5],[new portalui_arrayMap({items:["Berfungsi","Tidak Berfungsi","Hilang"]})]],checkItem: true,
            ellipsClick:[this,"doEllipsClickr"],change:[this,"doChangeCellr"],                    
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
            this.doLoad();
            this.stsSimpan = 1;
            this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

            this.stsCol = [0, 0, 0, 0];            
            this.c_show.setText("10");
            this.timeout = null;

            this.e_user.setText(this.app._userLog+" | "+this.app._namaUser);
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fMAssetBer.extend(window.childForm);
window.app_saku3_transaksi_amu_fMAssetBer.implement({
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
                    sql.add("insert into amu_mon_asset_bergerak(tanggal,kode_lokasi,mon_id,id_gedung,no_ruangan,tgl_input,nik_user) values " +
                            "('"+this.dp_d1.getDateString()+"','" + this.app._lokasi + "','" + this.cb_kode.getText() + "','" + this.cb_gedung.getText() + "','" + this.cb_ruangan.getText() + "',getdate(),'"+this.app._userLog+"')");

                    if (this.sgr.getRowValidCount() > 0){
                        for (var i=0;i < this.sgr.getRowCount();i++){
                            if (this.sgr.rowValid(i)){
                                sql.add("insert into amu_mon_asset_bergerak_d(mon_id,kode_lokasi,no_ruangan,id_gedung,barcode,status) values "+
                                        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_ruangan.getText()+"','"+this.cb_gedung.getText()+"','"+this.sgr.cells(0,i)+"','"+this.sgr.cells(5,i)+"')");
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
    ubah: function () {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from amu_mon_asset_bergerak where mon_id = '" + this.cb_kode.getText() + "' ");
                    sql.add("delete from amu_mon_asset_bergerak_d where mon_id = '" + this.cb_kode.getText() + "' ");

                    sql.add("insert into amu_mon_asset_bergerak(tanggal,kode_lokasi,mon_id,id_gedung,no_ruangan,tgl_input,nik_user) values " +
                            "('"+this.dp_d1.getDateString()+"','" + this.app._lokasi + "','" + this.cb_kode.getText() + "','" + this.cb_gedung.getText() + "','" + this.cb_ruangan.getText() + "',getdate(),'"+this.app._userLog+"')");

                    if (this.sgr.getRowValidCount() > 0){
                        for (var i=0;i < this.sgr.getRowCount();i++){
                            if (this.sgr.rowValid(i)){
                                sql.add("insert into amu_mon_asset_bergerak_d(mon_id,kode_lokasi,no_ruangan,id_gedung,barcode,status) values "+
                                        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_ruangan.getText()+"','"+this.cb_gedung.getText()+"','"+this.sgr.cells(0,i)+"','"+this.sgr.cells(5,i)+"')");
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
    hapus: function () {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    sql.add("delete from amu_mon_asset_bergerak where mon_id = '" + this.cb_kode.getText() + "' ");
                    sql.add("delete from amu_mon_asset_bergerak_d where mon_id = '" + this.cb_kode.getText() + "' ");
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
                this.sgr.clear(1);
                this.doLoad();
                this.pc1.setActivePage(this.pc1.childPage[1]);
                this.doClick();
                break;
            case "simpan":
                this.stsAktif = "0";
                var strSQL = "select substring(flag_aktif,1,1) as aktif from amu_jadwal_inv where '"+this.dp_d1.getDateString()+"' between tgl_mulai and tgl_selesai";                             
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.stsAktif = line.aktif;
                    }
                    else this.stsAktif = "0";
                }


                if (this.stsAktif != "1") {                    
                    system.alert(this,"Jadwal inventarisasi belum aktif.","");
                    return false;
                }  
                else this.simpan();

                break;
            case "simpancek": this.simpan();
                break;
            case "ubah":                
                this.stsAktif = "0";
                var strSQL = "select substring(flag_aktif,1,1) as aktif from amu_jadwal_inv where '"+this.dp_d1.getDateString()+"' between tgl_mulai and tgl_selesai";                             
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.stsAktif = line.aktif;
                    }
                    else this.stsAktif = "0";
                }
                if (this.stsAktif != "1") {                    
                    system.alert(this,"Jadwal inventarisasi belum aktif.","");
                    return false;
                }  
                else this.ubah();

                break;
            case "hapus":
                this.hapus();
                break;
        }
    },
    doChange: function (sender) {              
        try {
            if ((sender == this.cb_gedung || sender == this.dp_d1)  && this.cb_gedung.getText() != "") {
                if (this.stsSimpan == 1) {
                    this.cb_ruangan.setSQL("select a.no_ruangan,a.nama_ruangan  "+
                                        "from amu_ruangan a "+
                                        "inner join amu_pnj_ruang_d b on a.no_ruangan=b.no_ruangan and a.id_gedung=b.id_gedung "+                                   
                                        "inner join amu_pnj_ruang c on b.no_bukti=c.no_bukti and b.id_gedung=c.id_gedung and c.nik='"+this.app._userLog+"' and '"+this.dp_d1.getDateString()+"' between c.tgl_mulai and c.tgl_selesai "+                                   
                                        "where a.id_gedung='" + this.cb_gedung.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'",
                                        ["a.no_ruangan", "a.nama_ruangan"], false, ["No", "Nama"], "and", "Data Ruangan", true);
                }
            }  

            if (sender == this.cb_kode && this.cb_kode.getText() != "") {
                var strSQL = "select a.tanggal,a.nik_user +' | '+isnull(b.nama,'-') as nik_user,a.id_gedung,a.no_ruangan " +
                             "from amu_mon_asset_bergerak a inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+
                             "where a.mon_id ='" + this.cb_kode.getText() + "'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.stsSimpan=0;                        
                        this.dp_d1.setText(line.tanggal);
                        this.e_user.setText(line.nik_user);                           
                        

                        this.cb_gedung.setSQL("select id_gedung,nama_gedung from amu_gedung where id_gedung='"+line.id_gedung+"' and kode_lokasi='" + this.app._lokasi + "'", ["id_gedung", "nama_gedung"], false, ["ID", "Nama"], "where", "Data Gedung", true);                        
                        this.cb_gedung.setText(line.id_gedung);                        
                        this.cb_ruangan.setSQL("select no_ruangan,nama_ruangan from amu_ruangan where no_ruangan='"+line.no_ruangan+"' and kode_lokasi='" + this.app._lokasi + "'", ["no_ruangan", "nama_ruangan"], false, ["ID", "Nama"], "where", "Data Ruangan", true);
                        this.cb_ruangan.setText(line.no_ruangan);
                        
                        var data = this.dbLib.getDataProvider("select b.barcode,b.spesifikasi,b.no_seri,b.merk,b.tipe,a.status "+
                                    "from amu_mon_asset_bergerak_d a inner join amu_asset_bergerak b on a.barcode=b.barcode and a.id_gedung=b.id_gedung and a.no_ruangan=b.no_ruang "+
                                    "where a.mon_id='"+this.cb_kode.getText()+"'",true);

                        if (typeof data == "object" && data.rs.rows[0] != undefined){
                            var line;
                            this.sgr.clear();
                            for (var i in data.rs.rows){
                                line = data.rs.rows[i];												
                                this.sgr.appendData([line.barcode,line.spesifikasi,line.no_seri,line.merk,line.tipe,line.status]);
                            }
                        } else this.sgr.clear(1);

                        
                        setTipeButton(tbUbahHapus);
                    }
                    else {
                        this.stsSimpan=1;
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
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
					this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
						    "select barcode,spesifikasi,no_seri,merk,tipe from amu_asset_bergerak where id_gedung='" + this.cb_gedung.getText() + "'and no_ruang='" + this.cb_ruangan.getText() + "' and kode_lokasi='" + this.app._lokasi + "'",
							"select count(*) from amu_asset_bergerak where id_gedung='" + this.cb_gedung.getText() + "'and no_ruang='" + this.cb_ruangan.getText() + "' and kode_lokasi='" + this.app._lokasi + "'",
							["barcode","spesifikasi","no_seri","merk","tipe"],"and",["Barcode","Spesifikasi","No Seri","Merk","Tipe"],false);				
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
				var strSQL = "select no_seri,merk,tipe   "+ 
                             "from amu_asset_bergerak  "+
                             "where barcode ='" + this.sgr.cells(0,row) + "' and no_ruang='"+this.cb_ruangan.getText()+"' and id_gedung='"+this.cb_gedung.getText()+"'";											 
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {                        
                        this.sgr.cells(2,row,line.no_seri);  
                        this.sgr.cells(3,row,line.merk);  
                        this.sgr.cells(4,row,line.tipe);                                               
                    }
                }				
			}
		}				
		sender.onChange.set(this,"doChangeCellr");		
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
        var strSQL = "select mon_id,kd_asset,id_gedung,no_ruangan,convert(varchar,tanggal,103) as tanggal from amu_mon_asset_bergerak " +
                     "where kode_lokasi='" + this.app._lokasi + "'";
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
            this.sg1.appendData([line.mon_id, line.kd_asset, line.id_gedung, line.no_ruangan, line.tanggal, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function (sender, page) {
        this.doTampilData(page);
    },
    doCari: function (sender) {
        try {

            // // alert(strSQL);
            // clearTimeout(this.timeout);

            // // Make a new timeout set to go off in 800ms
            // this.timeout = setTimeout(function () {
            //     console.log('input data:',this.e_kode2.getText() );
            // }, 500);

            var show = parseInt(this.c_show.getText());
            var column_array = ['mon_id', 'kd_asset', 'id_lahan', 'no_ruangan', 'tanggal'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select select mon_id,kd_asset,id_gedung,no_ruangan,convert(varchar,tanggal,103) as tanggal " +
                "from amu_mon_asset_bergerak " +
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
            if (col == 5) {
                this.doDoubleClick(sender, col, row);
            } else {
                if (this.stsCol[col] == 1) {
                    this.stsCol[col] = 0;
                    var ordertype = " asc ";
                } else {
                    this.stsCol[col] = 1;
                    var ordertype = " desc ";
                }

                var column_array = ['mon_id', 'kd_asset', 'id_lahan', 'no_ruangan', 'tanggal'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select select mon_id,kd_asset,id_gedung,no_ruangan,convert(varchar,tanggal,103) as tanggal " +
                    "from amu_mon_asset_bergerak " +
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
    doSelectDate: function(sender, y, m, d) {
        try {
            if (m < 10) m = "0" + m;        
            this.e_periode.setText(y + "" + m);            
        }
        catch(e) {
            alert(e);
        }
    },
    doClick: function (sender) {        
        try {
            this.cb_gedung.setSQL("select id_gedung,nama_gedung from amu_gedung where kode_lokasi='" + this.app._lokasi + "'", ["id_gedung", "nama_gedung"], false, ["ID", "Nama"], "where", "Data Gedung", true);
            this.stsSimpan=1;
            this.pc1.setActivePage(this.pc1.childPage[1]);	   
            this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_mon_asset_bergerak", "mon_id", this.app._lokasi + "-NMA" + this.e_periode.getText().substr(2,2) + ".", "0000"));        
            this.cb_gedung.setFocus();   
        }
        catch(e) {
            alert(e);
        }
    }
});