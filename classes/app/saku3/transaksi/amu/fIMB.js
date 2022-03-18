window.app_saku3_transaksi_amu_fIMB = function (owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fIMB.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fIMB";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data IMB", 0);

        uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
        uses("saiGrid", true);
        this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar IMB", "Data IMB"] });    
        this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [680, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
        this.c_show = new saiCB(this.pc1.childPage[0], { bound: [940, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

        this.sg1 = new saiGrid(this.pc1.childPage[0], {
            bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64], colCount: 3, tag: 9,
            colTitle: ["No IMB", "Tanggal Terbit", "Pilih"],
            colWidth: [[2,1,0], [100,100,150]],
            colFormat: [[2], [cfButton]], colAlign: [[2], [alCenter]],
            readOnly: true,
            dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
        });
        this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });		

        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 250, 20], caption: "No IMB", maxLength: 50, change: [this, "doChange"] });
        this.e_tgl_trb = new portalui_label(this.pc1.childPage[1], { bound: [20, 16, 100, 20], caption: "Tanggal Terbit", underline: true });
        this.dp_tgl_trb = new portalui_datePicker(this.pc1.childPage[1], { bound: [120, 16, 98, 18], selectDate: [this, "doSelectDate"] });
         	
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,17,960,370], childPage:["Item Gedung"]});		
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:0,
		            colTitle:["Kode Gedung","Nama Gedung"],
					colWidth:[[1,0],[400,100]],					
					columnReadOnly:[true,[0],[1]],
					buttonStyle:[[0],[bsEllips]], 	
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});		

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

            this.stsCol = [0, 0, 0];
            
			var sql = new server_util_arrayList();
			sql.add("select id_gedung,nama_gedung from amu_gedung where kode_lokasi='"+this.app._lokasi+"'");						
            this.dbLib.getMultiDataProviderA(sql);
            
            this.c_show.setText("10");
            this.timeout = null;
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_saku3_transaksi_amu_fIMB.extend(window.childForm);
window.app_saku3_transaksi_amu_fIMB.implement({
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
                    sql.add("insert into amu_imb(kode_lokasi,no_imb,tanggal_terbit) values " +
                        "('"+this.app._lokasi+"','"+this.cb_kode.getText()+"','" + this.dp_tgl_trb.getDateString() + "')");
                    if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								                           
								sql.add("insert into amu_imb_d(no_imb,kode_lokasi,id_gedung,nu) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+i+")");
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
                    sql.add("delete from amu_imb where no_imb = '"+this.cb_kode.getText()+"' ");
                    sql.add("delete from amu_imb_d where no_imb = '"+this.cb_kode.getText()+"' ");
                    sql.add("insert into amu_imb(kode_lokasi,no_imb,tanggal_terbit) values " +
                            "('"+this.app._lokasi+"','"+this.cb_kode.getText()+"','" + this.dp_tgl_trb.getDateString() + "')");
                    if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								                           
								sql.add("insert into amu_imb_d(no_imb,kode_lokasi,id_gedung,nu) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+i+")");
							}
						}
					}			
                    this.dbLib.execArraySQL(sql);                    
                    setTipeButton(tbAllFalse);
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
                    sql.add("delete from amu_imb where no_imb = '"+this.cb_kode.getText()+"' ");
                    sql.add("delete from amu_imb_d where no_imb = '"+this.cb_kode.getText()+"' ");
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
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Gedung",sender,undefined, 
						    "select id_gedung,nama_gedung from amu_gedung where kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from amu_gedung where kode_lokasi='"+this.app._lokasi+"'",
							["id_gedung","nama_gedung"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
    },
	doCellEnter1: function(sender, col, row){
		switch(col){			
								
		}
	},	
	doChangeCell1: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg2.cells(0,row) != "") {				
				var ged = this.dataGedung.get(sender.cells(0,row));				
				if (ged) { 
					sender.cells(1,row,ged);
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Gedung "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkGedung");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell2");		
	},
    doChange: function (sender) {
        try {
            if (sender == this.cb_kode && this.cb_kode.getText() != "") {
                var strSQL = "select a.no_imb,a.id_gedung,b.nama_gedung " +
                             "from amu_imb_d a inner join amu_gedung b on a.id_gedung=b.id_gedung where a.no_imb ='" + this.cb_kode.getText() + "' order by a.nu ";
                var data = this.dbLib.getDataProvider(strSQL, true);
                if (typeof data == "object") {
                    var line = data.rs.rows[0];
                    if (line != undefined) {
                        for (var i in data.rs.rows){
                            line = data.rs.rows[i];							
                            this.sg2.appendData([line.id_gedung,line.nama_gedung]);
                        }
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
                this.dp_tgl_trb.setDateString(this.sg1.cells(1, row));
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
                    case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataGedung = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataGedung.set(line.id_gedung, line.nama_gedung);										
								}								
							}							
						}else throw result;
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
        var strSQL = "select no_imb, tanggal_terbit from amu_imb " +
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
            this.sg1.appendData([line.no_imb, line.tanggal_terbit, "Pilih"]);
        }
        this.sg1.setNoUrut(start);
    },
    doPager: function (sender, page) {
        this.doTampilData(page);
    },
    doCari: function (sender) {
        try {

            var show = parseInt(this.c_show.getText());
            var column_array = ['no_imb', 'tanggal_terbit'];

            var search = this.e_kode2.getText();
            var filter_string = " (";

            for (var i = 0; i < column_array.length; i++) {

                if (i == (column_array.length - 1)) {
                    filter_string += column_array[i] + " like '%" + search + "%' )";
                } else {
                    filter_string += column_array[i] + " like '%" + search + "%' or ";
                }
            }

            var strSQL = "select no_imb, tanggal_terbit " +
                "from amu_imb " +
                "where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "'";

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

                var column_array = ['no_imb', 'tanggal_terbit'];

                var search = this.e_kode2.getText();
                var filter_string = " (";

                for (var i = 0; i < column_array.length; i++) {

                    if (i == (column_array.length - 1)) {
                        filter_string += column_array[i] + " like '%" + search + "%' )";
                    } else {
                        filter_string += column_array[i] + " like '%" + search + "%' or ";
                    }
                }

                var strSQL = "select no_imb, tanggal_terbit " +
                    "from amu_imb " +
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
    }
});