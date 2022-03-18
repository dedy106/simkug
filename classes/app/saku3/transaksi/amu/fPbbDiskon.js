window.app_saku3_transaksi_amu_fPbbDiskon = function(owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fPbbDiskon.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fPbbDiskon";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Pajak Bumi dan Bangunan Diskon", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar PBB", "Data PBB"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doClick"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth: 0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64],colCount: 5,tag: 9,
            colTitle: ["No Bukti", "ID PBB", "NOP", "Tahun", "Pilih"],
            colWidth: [[4, 3, 2, 1, 0],[70, 100, 200, 100, 100]],
            colHide:[[1],[true]],
            colFormat: [[4],[cfButton]],colAlign: [[4],[alCenter]],readOnly: true,
            dblClick: [this, "doDoubleClick"],click: [this, "doSort"],autoAppend: false,defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.label1 = new portalui_label(this.pc1.childPage[1], { bound: [20, 18, 100, 20], caption: "Tanggal", underline: true });
        this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 18, 98, 18], selectDate: [this, "doSelectDate"] });                
        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "No Bukti", maxLength: 100, change: [this, "doChange"],readOnly:true });
        //this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});        
        this.e_ket = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 19, 600, 20], caption: "Keterangan", tag: 0, text: "", maxLength: 200 });
        this.cb_nop = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 300, 20], caption: "NOP", maxLength: 20, multiSelection: false, change: [this, "doChange"],tag:1 });
        this.e_idpbb = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 600, 20], caption: "IDPBB", readOnly:true, tag: 1,visible:false });
        this.e_sppt = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 600, 20], caption: "NOSPPT", readOnly:true, tag: 1,visible:false });
		this.e_obyek = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 18, 600, 20], caption: "Letak Objek Pajak", readOnly:true, tag:9 });
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 17, 600, 20], caption: "Nama Wajib Pajak", readOnly:true, tag: 9 });
        this.e_alamat = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 600, 20], caption: "Alamat Wajib Pajak", readOnly:true, tag: 9 });        
        this.e_jthtempo = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 19, 200, 20], caption: "Tgl Jatuh Tempo", readOnly:true, tag: 1 });
        this.e_ttl = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 15, 200, 20], caption: "PBB Terhutang", readOnly:true, tipeText: ttNilai, text: "0", maxLength: 20, tag: 1 });        
        this.e_nilai = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 21, 200, 20], caption: "Nilai Diskon", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });        
        
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
            this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
            this.doLoad();

            this.stsCol = [0, 0, 0, 0];
            this.c_show.setText("10");    
            this.isiCBnop();        
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fPbbDiskon.extend(window.childForm);
window.app_saku3_transaksi_amu_fPbbDiskon.implement({
    isiCBnop: function() {
        this.cb_nop.setSQL("select b.nop,b.tahun from amu_pbb_d b  "+
                           "left join amu_pbb_diskon c on b.no_bukti=c.no_sppt "+
                           "where c.no_sppt is null and b.kode_lokasi='" + this.app._lokasi + "' and b.no_bayar='-'", 
                           ["b.nop","b.tahun"], false, ["NOP","Tahun"], "where", "Data PBB", true);
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
                    sql.add("INSERT INTO amu_pbb_diskon (no_diskon, nop, tahun, no_pbb, no_sppt, kode_lokasi, tanggal, keterangan, nilai) VALUES "+
                            "('"+this.cb_kode.getText()+"', '"+this.cb_nop.getText() +"','"+this.cb_nop.rightLabelCaption+"', '"+this.e_idpbb.getText()+"', '"+this.e_sppt.getText()+"', '"+this.app._lokasi+"', '"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"', "+nilaiToFloat(this.e_nilai.getText())+")");

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
                    sql.add("delete from amu_pbb_diskon where no_diskon = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");
                    sql.add("INSERT INTO amu_pbb_diskon (no_diskon, nop, tahun, no_pbb, no_sppt, kode_lokasi, tanggal, keterangan, nilai) VALUES "+
                            "('"+this.cb_kode.getText()+"', '"+this.cb_nop.getText() +"','"+this.cb_nop.rightLabelCaption+"', '"+this.e_idpbb.getText()+"', '"+this.e_sppt.getText()+"', '"+this.app._lokasi+"', '"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"', "+nilaiToFloat(this.e_nilai.getText())+")");

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
                    sql.add("delete from amu_pbb_diskon where no_diskon = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");
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
                this.isiCBnop();
                this.stsSimpan=1;
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
            if (sender == this.cb_nop && this.cb_nop.getText()!="") {
                var strSQL = "select a.obyek,b.no_bukti,a.nop, a.nama, a.alamat,a.id_pbb,   convert(varchar,b.jatuh_tempo,103) as jatuh_tempo,b.pbb_terutang "+
                             "from amu_pbb a "+
                             "inner join amu_pbb_d b on a.id_pbb=b.id_pbb and b.no_bayar='-' "+                             
                             "where a.nop ='" + this.cb_nop.getText() + "' and b.tahun='"+this.cb_nop.rightLabelCaption+"' ";                
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {                        
                        this.e_obyek.setText(line.obyek);	
                        this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat); 						
                        this.e_idpbb.setText(line.id_pbb);	
                        this.e_sppt.setText(line.no_bukti);	                        
                        this.e_jthtempo.setText(line.jatuh_tempo);						
                        this.e_ttl.setText(floatToNilai(line.pbb_terutang));						
                    }
                }                
            }
           
            if (sender == this.cb_kode && this.cb_kode.getText() != "") {            
                var strSQL = "select * from amu_pbb_diskon where no_diskon ='" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'";                                
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {     
                        this.stsSimpan=0;                                           
                        this.cb_nop.setSQL("select nop,tahun from amu_pbb_d "+                       
                                           "where nop='"+line.nop+"' and tahun='"+line.tahun+"' and kode_lokasi='" + this.app._lokasi + "' ", ["nop","tahun"], false, ["NOP","Tahun"], "where", "Data PBB", true);                        
                        this.cb_nop.setText(line.nop,line.tahun);
                        this.dp_d1.setText(line.tanggal);                        
                        this.e_ket.setText(line.keterangan);                    
                        this.e_nilai.setText(floatToNilai(line.nilai));                        
                        setTipeButton(tbUbahHapus);
                    } else {
                        this.stsSimpan=1;
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                        this.isiCBnop();  
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
        var strSQL = "select a.no_diskon, a.no_pbb,b.nop, a.tahun " +
                     "from  amu_pbb_diskon a " +
                     "inner join amu_pbb b on a.no_pbb=b.id_pbb " +
                     "inner join amu_pbb_d c on a.no_sppt=c.no_bukti and c.no_bayar='-' " +
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
            this.sg1.appendData([line.no_diskon, line.no_pbb, line.nop, line.tahun, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function(sender, page) {
        this.doTampilData(page);
    },
    doCari: function(sender) {
        try {
            var show = parseInt(this.c_show.getText());
            var column_array = ['a.no_diskon', 'a.no_pbb', 'a.nop', 'a.tahun'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select a.no_diskon, a.no_pbb,b.nop, a.tahun " +
                        "from  amu_pbb_diskon a " +
                        "inner join amu_pbb b on a.no_pbb=b.id_pbb " +
                        "inner join amu_pbb_d c on a.no_sppt=c.no_bukti and c.no_bayar='-' " +
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
            if (col == 4) {
                this.doDoubleClick(sender, col, row);
            } else {
                if (this.stsCol[col] == 1) {
                    this.stsCol[col] = 0;
                    var ordertype = " asc ";
                } else {
                    this.stsCol[col] = 1;
                    var ordertype = " desc ";
                }

                var column_array = ['a.no_diskon', 'a.no_pbb', 'b.nop', 'a.tahun'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select a.no_diskon, a.no_pbb,b.nop, a.tahun " +
                            "from  amu_pbb_diskon a " +
                            "inner join amu_pbb b on a.no_pbb=b.id_pbb " +
                            "inner join amu_pbb_d c on a.no_sppt=c.no_bukti and c.no_bayar='-' " +
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
    doSelectDate: function(sender, y, m, d) {
        if (m < 10) m = "0" + m;        
        this.periode = y + "" + m;   
        if (this.stsSimpan==1) this.doClick();    
    },
    doClick:function(sender){
        try {            
            this.pc1.setActivePage(this.pc1.childPage[1]);	   
            this.isiCBnop();
            this.stsSimpan=1;
            this.standarLib.clearByTag(this, new Array("1"), this.cb_kode);
            this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"amu_pbb_diskon","no_diskon",this.app._lokasi+"-DIS"+this.periode.substr(2,2)+".","0000"));
            this.e_ket.setFocus();
            setTipeButton(tbSimpan);            
        }
        catch(e) {
            alert(e);
        }    
	}
});