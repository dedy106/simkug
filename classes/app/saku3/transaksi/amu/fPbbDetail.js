window.app_saku3_transaksi_amu_fPbbDetail = function(owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fPbbDetail.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fPbbDetail";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Pajak Bumi dan Bangunan", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar PBB", "Data PBB"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doClick"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth: 0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64],colCount: 5,tag: 9,
            colTitle: ["No Bukti", "ID PBB", "NOP", "Tgl Jatuh Tempo", "Pilih"],
            colWidth: [[4, 3, 2, 1, 0],[70, 100, 200, 100, 100]],
            colHide:[[1],[true]],
            colFormat: [[4],[cfButton]],colAlign: [[4],[alCenter]],
            readOnly: true,dblClick: [this, "doDoubleClick"],click: [this, "doSort"],
            autoAppend: false,defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.e_tahun = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 19, 200, 20], caption: "Tahun SPPT", tag: 2,  text: "", readOnly:true, maxLength: 20,change:[this,"doChange"]});
        
        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "No Bukti", maxLength: 100, change: [this, "doChange"],readOnly:true });
        //this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
        this.cb_idpbb = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "ID PBB", maxLength: 20, multiSelection: false, change: [this, "doChange"] });
        this.e_nop = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 19, 600, 20], caption: "NOP", readOnly:true, tag: 1 });
		this.e_obyek = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 18, 600, 20], caption: "Letak Objek Pajak", readOnly:true, tag: 1 });
		this.e_namapbb = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 17, 600, 20], caption: "Nama Wajib Pajak", readOnly:true, tag: 1 });
        this.e_alamatpbb = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 600, 20], caption: "Alamat Wajib Pajak", readOnly:true, tag: 1 });
        
        this.e_lahan = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 19, 200, 20], caption: "Luas Lahan", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });
        this.e_gedung = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 21, 200, 20], caption: "Luas Bangunan", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });        
        this.e_njoptanah = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 22, 200, 20], caption: "NJOP Tanah", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });
        this.e_njopgedung = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 23, 200, 20], caption: "NJOP Gedung", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });
        this.e_njoptkp = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 24, 200, 20], caption: "NJOP TKP", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });
        this.e_njoppbb = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 26, 200, 20], caption: "NJOP PBB", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });
        this.e_tarif = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 24, 200, 20], caption: "Tarif", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });
        this.e_ttl = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 15, 200, 20], caption: "PBB Terhutang", tag: 1, tipeText: ttNilai, text: "0", maxLength: 20, tag: 1 });
        this.e_jth_tmp = new portalui_label(this.pc1.childPage[1], { bound: [20, 18, 100, 20], caption: "Tgl Jatuh Tempo", underline: true });
        this.dp_jth_tmp = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 18, 98, 18], selectDate: [this, "doSelectDate"] });        
        
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
            this.doSelectDate(this.dp_jth_tmp,this.dp_jth_tmp.year,this.dp_jth_tmp.month,this.dp_jth_tmp.day);
            this.doLoad();
            this.stsSimpan = 1;
            this.stsCol = [0, 0, 0, 0];
            this.c_show.setText("10");                        
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fPbbDetail.extend(window.childForm);
window.app_saku3_transaksi_amu_fPbbDetail.implement({
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
                    
                    sql.add("INSERT INTO amu_pbb_d (no_bukti, id_pbb, kode_lokasi, jatuh_tempo, luas_lahan, luas_gedung, njop_lahan, njop_gedung, njop_tkp, njop_pbb, tarif, pbb_terutang, no_bayar, tahun, nop) VALUES "+
                            "('"+this.cb_kode.getText()+"', '"+this.cb_idpbb.getText() +"', '"+this.app._lokasi+"', '"+this.dp_jth_tmp.getDateString()+"', "+nilaiToFloat(this.e_lahan.getText())+", "+nilaiToFloat(this.e_gedung.getText())+", "+nilaiToFloat(this.e_njoptanah.getText())+", "+nilaiToFloat(this.e_njopgedung.getText())+", "+nilaiToFloat(this.e_njoptkp.getText())+", "+nilaiToFloat(this.e_njoppbb.getText())+", "+nilaiToFloat(this.e_tarif.getText())+", "+nilaiToFloat(this.e_ttl.getText())+",'-','"+this.e_tahun.getText()+"','"+this.e_nop.getText()+"')");

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
                    sql.add("delete from amu_pbb_d where no_bukti = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");
                    sql.add("INSERT INTO amu_pbb_d (no_bukti, id_pbb, kode_lokasi, jatuh_tempo, luas_lahan, luas_gedung, njop_lahan, njop_gedung, njop_tkp, njop_pbb, tarif, pbb_terutang, no_bayar, tahun, nop) VALUES "+
                            "('"+this.cb_kode.getText()+"', '"+this.cb_idpbb.getText() +"', '"+this.app._lokasi+"', '"+this.dp_jth_tmp.getDateString()+"', "+nilaiToFloat(this.e_lahan.getText())+", "+nilaiToFloat(this.e_gedung.getText())+", "+nilaiToFloat(this.e_njoptanah.getText())+", "+nilaiToFloat(this.e_njopgedung.getText())+", "+nilaiToFloat(this.e_njoptkp.getText())+", "+nilaiToFloat(this.e_njoppbb.getText())+", "+nilaiToFloat(this.e_tarif.getText())+", "+nilaiToFloat(this.e_ttl.getText())+",'-','"+this.e_tahun.getText()+"','"+this.e_nop.getText()+"')");
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
                    sql.add("delete from amu_pbb_d where no_bukti = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");
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
                this.stsSimpan = 1;
                this.isiCBpbb();
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
                var strSQL = "select  * from amu_pbb_d where no_bukti ='" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'";                
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {      
                        this.stsSimpan = 0;                                          
                        this.cb_idpbb.setSQL("select id_pbb,nop from amu_pbb "+                       
                                             "where id_pbb='"+line.id_pbb+"' and kode_lokasi='" + this.app._lokasi + "' ", ["id_pbb","nop"], false, ["ID PBB", "NOP"], "where", "Data PBB", true);                                                                     
                        this.cb_idpbb.setText(line.id_pbb);                        
                        this.dp_jth_tmp.setText(line.jatuh_tempo);                        
                        this.e_lahan.setText(floatToNilai(line.luas_lahan));
                        this.e_gedung.setText(floatToNilai(line.luas_gedung));                    
                        this.e_njoptanah.setText(floatToNilai(line.njop_lahan));
                        this.e_njopgedung.setText(floatToNilai(line.njop_gedung));
                        this.e_njoptkp.setText(floatToNilai(line.njop_tkp));
                        this.e_njoppbb.setText(floatToNilai(line.njop_pbb));
                        this.e_tarif.setText(floatToNilai(line.tarif));
                        this.e_ttl.setText(floatToNilai(line.pbb_terutang));
                        this.stsSimpan=0;
                        setTipeButton(tbUbahHapus);
                    } else {
                        this.stsSimpan = 1;
                        this.standarLib.clearByTag(this, new Array("1"), undefined);
                        setTipeButton(tbSimpan);
                        this.isiCBpbb(); 
                    }
                }
            }

            if (sender == this.cb_idpbb && this.cb_idpbb.getText()!= "") {
                var strSQL = "select id_pbb, kode_lokasi, nop, obyek, nama, alamat,id_lembaga " +
                             "from amu_pbb where id_pbb ='" + this.cb_idpbb.getText() + "'";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.e_nop.setText(line.nop);
                        this.e_obyek.setText(line.obyek);
						this.e_namapbb.setText(line.nama);
						this.e_alamatpbb.setText(line.alamat); 						
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
                this.cb_idpbb.setText(this.sg1.cells(1, row));                
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
        var strSQL = "select a.no_bukti, a.id_pbb,b.nop, a.jatuh_tempo " +
            "from  amu_pbb_d a " +
            "inner join amu_pbb b on a.id_pbb=b.id_pbb " +
            "left join amu_pbb_diskon c on a.no_bukti=c.no_sppt "+
            "where c.no_sppt is null and a.kode_lokasi='" + this.app._lokasi + "' and a.no_bayar='-' ";
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
            this.sg1.appendData([line.no_bukti, line.id_pbb, line.nop, line.jatuh_tempo, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function(sender, page) {
        this.doTampilData(page);
    },
    doCari: function(sender) {
        try {
            var show = parseInt(this.c_show.getText());
            var column_array = ['a.no_bukti', 'a.id_pbb', 'a.nop', 'a.jatuh_tempo'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select a.no_bukti, a.id_pbb,b.nop, a.jatuh_tempo " +
                "from  amu_pbb_d a " +
                "inner join amu_pbb b on a.id_pbb=b.id_pbb " +
                "left join amu_pbb_diskon c on a.no_bukti=c.no_sppt "+            
                "where " + filter_string + "and a.kode_lokasi= '" + this.app._lokasi + "'  and a.no_bayar='-' and c.no_sppt is null";

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

                var column_array = ['a.no_bukti', 'a.id_pbb', 'b.nop', 'a.jatuh_tempo'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select a.no_bukti, a.id_pbb,b.nop, a.jatuh_tempo " +
                    "from  amu_pbb_d a " +
                    "inner join amu_pbb b on a.id_pbb=b.id_pbb " +
                    "left join amu_pbb_diskon c on a.no_bukti=c.no_sppt "+            
                    "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "'  and a.no_bayar='-' and c.no_sppt is null " +
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
    isiCBpbb: function() {
        this.cb_idpbb.setSQL("select a.id_pbb,a.nop from amu_pbb a "+
                             "left join amu_pbb_d b on a.id_pbb=b.id_pbb and year(jatuh_tempo)='"+this.e_tahun.getText()+"' "+                             
                             "where b.no_bukti is null and a.kode_lokasi='" + this.app._lokasi + "'", ["a.id_pbb", "a.nop"], false, ["ID", "NOP"], "where", "Data PBB", true);
    },
    doSelectDate: function(sender, y, m, d) {
        if (m < 10) m = "0" + m;        
        this.periode = y + "" + m;    
        this.e_tahun.setText(y);   
        if (this.stsSimpan == 1) {
            this.doClick();
            this.isiCBpbb();
        }
    },
    doClick:function(sender){
        try {
            this.pc1.setActivePage(this.pc1.childPage[1]);	   
            this.isiCBpbb();
            this.standarLib.clearByTag(this, new Array("1"), this.cb_kode);
            this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"amu_pbb_d","no_bukti",this.app._lokasi+"-SPT"+this.periode.substr(2,2)+".","0000"));
            this.cb_idpbb.setFocus();
            setTipeButton(tbSimpan);
            this.stsSimpan = 1;
        }
        catch(e) {
            alert(e);
        }    
	}
});