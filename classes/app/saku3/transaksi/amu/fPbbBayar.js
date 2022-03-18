window.app_saku3_transaksi_amu_fPbbBayar = function(owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fPbbBayar.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fPbbBayar";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Pajak Bumi dan Bangunan Pembayaran", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar PBB", "Data PBB"] });
        this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doClick"]});
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth: 0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64],colCount: 5,tag: 9,
            colTitle: ["No Bukti", "ID PBB", "NOP", "Tanggal", "Pilih"],
            colWidth: [[4, 3, 2, 1, 0],[70, 100, 200, 100, 100]],
            colFormat: [[4],[cfButton]],colAlign: [[4],[alCenter]],
            colHide:[[1],[true]],readOnly: true,
            dblClick: [this, "doDoubleClick"],click: [this, "doSort"],autoAppend: false,defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

        this.label1 = new portalui_label(this.pc1.childPage[1], { bound: [20, 18, 100, 20], caption: "Tanggal", underline: true });
        this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 18, 98, 18], selectDate: [this, "doSelectDate"] });                
        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "No Bukti", maxLength: 100, change: [this, "doChange"],readOnly:true });
        //this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});        
        this.e_ket = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 19, 450, 20], caption: "Keterangan", tag: 1, text: "", maxLength: 200 });        
        this.cb_nop = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 300, 20], caption: "NOP", maxLength: 20, tag:0, multiSelection: false, change: [this, "doChange"] });
        
        this.e_idpbb = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 450, 20], caption: "IDPBB", readOnly:true, tag: 1,visible:false });
        this.e_sppt = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 450, 20], caption: "NOSPPT", readOnly:true, tag: 1,visible:false });

		this.e_obyek = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 18, 450, 20], caption: "Letak Objek Pajak", readOnly:true, tag:9 });
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 17, 450, 20], caption: "Nama Wajib Pajak", readOnly:true, tag: 9 });
        this.e_alamat = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 450, 20], caption: "Alamat Wajib Pajak", readOnly:true, tag: 9 });
        this.e_sppt = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 21, 220, 20], caption: "SPPT", maxLength: 20, readOnly:true, change: [this, "doChange"] });        
        this.e_jthtempo = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 19, 200, 20], caption: "Tgl Jatuh Tempo", readOnly:true, tag: 1 });
        this.e_ttl = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 15, 200, 20], caption: "PBB Terhutang", readOnly:true, tipeText: ttNilai, text: "0", maxLength: 20, tag: 1 });
        this.e_diskon = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 200, 20], caption: "Discount", readOnly:true, tipeText: ttNilai, text: "0", maxLength: 20, tag: 1 });        
        this.e_terbayar = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 21, 200, 20], caption: "Terbayar", readOnly:true, tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });        
        this.e_saldo = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 20, 200, 20], caption: "Saldo", readOnly:true, tag: 1, tipeText: ttNilai, text: "0", maxLength: 20,change:[this,"doChange"]});                        
        this.e_denda = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 22, 200, 20], caption: "Nilai Denda",  tag: 1, tipeText: ttNilai, text: "0", maxLength: 20,readOnly:true,change:[this,"doChange"]});        
        this.e_nilai = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 21, 200, 20], caption: "Nilai Bayar",  tag: 1, tipeText: ttNilai, text: "0", maxLength: 20 });        
        
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
            this            
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fPbbBayar.extend(window.childForm);
window.app_saku3_transaksi_amu_fPbbBayar.implement({
    isiCBnop: function() {        
        this.cb_nop.setSQL("select b.nop,b.tahun from amu_pbb_d b "+     
                           "left join amu_pbb_diskon c on b.no_bukti=c.no_sppt "+                        
                           "left join amu_pbb_denda e on b.no_bukti=e.no_sppt "+                        
                           "left join (select nop,tahun,sum(nilai) as bayar from amu_pbb_bayar "+                           
                           "           group by nop,tahun) d on d.nop=b.nop and d.tahun=b.tahun "+
                           "where b.pbb_terutang + isnull(e.nilai,0) - isnull(c.nilai,0) - isnull(d.bayar,0) > 0 and b.kode_lokasi='" + this.app._lokasi + "'", ["a.nop", "a.tahun"], false, ["NOP", "Tahun"], "where", "Data PBB", true);
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
                    
                    sql.add("INSERT INTO amu_pbb_bayar (no_bayar, nop, tahun, no_pbb, no_sppt , kode_lokasi, tanggal, keterangan, nilai, denda) VALUES "+
                            "('"+this.cb_kode.getText()+"', '"+this.cb_nop.getText() +"', '"+this.cb_nop.rightLabelCaption+"', '"+this.e_idpbb.getText()+"', '"+this.e_sppt.getText()+"', '"+this.app._lokasi+"', '"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"', "+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_denda.getText())+")");

                    sql.add("update amu_pbb_d set no_bayar='"+this.cb_kode.getText()+"' where no_bukti='"+this.e_sppt.getText()+"' ");

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
                    sql.add("delete from amu_pbb_bayar where no_bayar = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");
                    sql.add("update amu_pbb_d set no_bayar='-' where no_bukti='"+this.e_sppt.getText()+"' ");

                    sql.add("INSERT INTO amu_pbb_bayar (no_bayar, nop, tahun, no_pbb, no_sppt , kode_lokasi, tanggal, keterangan, nilai ,denda) VALUES "+
                            "('"+this.cb_kode.getText()+"', '"+this.cb_nop.getText() +"', '"+this.cb_nop.rightLabelCaption+"', '"+this.e_idpbb.getText()+"', '"+this.e_sppt.getText()+"', '"+this.app._lokasi+"', '"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"', "+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_denda.getText())+")");

                    sql.add("update amu_pbb_d set no_bayar='"+this.cb_kode.getText()+"' where no_bukti='"+this.e_sppt.getText()+"' ");

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
                    sql.add("delete from amu_pbb_bayar where no_bayar = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");
                    sql.add("update amu_pbb_d set no_bayar='-' where no_bukti='"+this.e_sppt.getText()+"' ");
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
                if (nilaiToFloat(this.e_nilai.getText()) <  nilaiToFloat(this.e_denda.getText())) {
                    system.alert(this,"Nilai Bayar tidak valid.","Nilai Bayar harus lebih besar dari denda.");
					return false;
                }
                if (nilaiToFloat(this.e_nilai.getText()) <=  0) {
                    system.alert(this,"Nilai Bayar tidak valid.","Nilai Bayar harus lebih besar dari nol.");
					return false;
                }
                if (nilaiToFloat(this.e_nilai.getText()) >  (nilaiToFloat(this.e_saldo.getText())+nilaiToFloat(this.e_denda.getText()))  ) {
                    system.alert(this,"Nilai Bayar tidak valid.","Nilai Bayar tidak boleh melebihi saldo+denda.");
					return false;
                }
                else
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
                var strSQL = "select a.obyek,b.no_bukti,a.nop, a.nama, a.alamat,a.id_pbb,b.no_bukti,  "+
                             "convert(varchar,b.jatuh_tempo,103) as jatuh_tempo,b.pbb_terutang, isnull(c.nilai,0) as diskon, b.pbb_terutang - isnull(c.nilai,0) - isnull(d.bayar,0) as saldo, isnull(d.bayar,0) as terbayar, isnull(e.nilai,0)-isnull(d.byr_denda,0) as denda "+
                             "from amu_pbb a "+
                             "inner join amu_pbb_d b on a.id_pbb=b.id_pbb  "+                             
                             "left join amu_pbb_diskon c on b.no_bukti=c.no_sppt "+
                             "left join amu_pbb_denda e on b.no_bukti=e.no_sppt "+
                             "left join (select nop,tahun,sum(nilai) as bayar,sum(denda) as byr_denda from amu_pbb_bayar "+
                             "           where no_bayar <> '"+this.cb_kode.getText()+"' and nop ='" + this.cb_nop.getText() + "' and tahun='"+this.cb_nop.rightLabelCaption+"' "+
                             "           group by nop,tahun) d on d.nop=b.nop and d.tahun=b.tahun "+
                             "where b.nop ='" + this.cb_nop.getText() + "' and b.tahun='"+this.cb_nop.rightLabelCaption+"'";                
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        this.e_idpbb.setText(line.id_pbb);	
                        this.e_sppt.setText(line.no_bukti);	                        

                        this.e_obyek.setText(line.obyek);	
                        this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat); 						
                        this.e_sppt.setText(line.no_bukti);	
                        
                        this.e_jthtempo.setText(line.jatuh_tempo);						
                        this.e_diskon.setText(floatToNilai(line.diskon));	
                        this.e_ttl.setText(floatToNilai(line.pbb_terutang));                        
                        this.e_terbayar.setText(floatToNilai(line.terbayar));	
                        this.e_saldo.setText(floatToNilai(line.saldo)); //tanpa denda, denda harus lunas sekali bayar
                        this.e_denda.setText(floatToNilai(line.denda));	
                        var tot = nilaiToFloat(this.e_saldo.getText()) + nilaiToFloat(this.e_denda.getText());	                        					
                        if (this.stsSimpan==1) this.e_nilai.setText(floatToNilai(tot));							

                    }
                }                
            }

            if (sender == this.cb_kode && this.cb_kode.getText() != "") {            
                var strSQL = "select  * from amu_pbb_bayar where no_bayar ='" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'";                
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {  
                        this.stsSimpan=0;                                             
                        this.cb_nop.setSQL("select nop,tahun from amu_pbb_d "+                       
                                           "where nop='"+line.nop+"' and tahun='"+line.tahun+"' and kode_lokasi='" + this.app._lokasi + "' ", ["nop","tahun"], false, ["NOP","Tahun"], "where", "Data PBB", true);                        
                        this.cb_nop.setText(line.nop);
                        this.dp_d1.setText(line.tanggal);                        
                        this.e_ket.setText(line.keterangan);                                            
                        this.e_denda.setText(floatToNilai(line.denda));
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

            // if ((sender == this.e_saldo || sender == this.e_denda) && this.e_saldo.getText()!="" && this.e_denda.getText()!="" && this.stsSimpan==1) {
            //     var tot = nilaiToFloat(this.e_saldo.getText()) + nilaiToFloat(this.e_denda.getText());
            //     alert(tot);
            //     this.e_nilai.setText(floatToNilai(tot));
            // }
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
        var strSQL = "select a.no_bayar, a.no_pbb,b.nop, convert(varchar,a.tanggal,103) as tanggal " +
                    "from  amu_pbb_bayar a " +
                    "inner join amu_pbb b on a.no_pbb=b.id_pbb " +
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
            this.sg1.appendData([line.no_bayar, line.no_pbb, line.nop, line.tanggal, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function(sender, page) {
        this.doTampilData(page);
    },
    doCari: function(sender) {
        try {
            var show = parseInt(this.c_show.getText());
            var column_array = ['a.no_bayar', 'a.no_pbb', 'a.nop', 'a.tanggal'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select a.no_bayar, a.no_pbb,b.nop, convert(varchar,a.tanggal,103) as tanggal " +
                        "from  amu_pbb_bayar a " +
                        "inner join amu_pbb b on a.no_pbb=b.id_pbb " +
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

                var column_array = ['a.no_bayar', 'a.no_pbb', 'b.nop', 'a.tanggal'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select a.no_bayar, a.no_pbb,b.nop, convert(varchar,a.tanggal,103) as tanggal " +
                            "from  amu_pbb_bayar a " +
                            "inner join amu_pbb b on a.no_pbb=b.id_pbb " +
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
            this.stsSimpan = 1;
            this.isiCBnop();        
            this.standarLib.clearByTag(this, new Array("1"), this.cb_kode);
            this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"amu_pbb_bayar","no_bayar",this.app._lokasi+"-BYR"+this.periode.substr(2,2)+".","0000"));
            this.e_ket.setFocus();
            setTipeButton(tbSimpan);
        }
        catch(e) {
            alert(e);
        }    
	}
});