window.app_saku3_transaksi_amu_fSumResap = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_amu_fSumResap.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_amu_fSumResap";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Sumur Imbuhan Resapan", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid", true);
		
		this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar Sumur", "Data Sumur"] });
		this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

		this.sg1 = new saiGrid(this.pc1.childPage[0], {bound: [1, 5, this.pc1.width - 5, this.pc1.height - 65], colCount: 5, tag: 9,
			colTitle: ["ID Sumur", "Nama", "Lahan", "No Reg", "Pilih"],
			colWidth: [[4,3,2,1,0], [70,350,250,250,80]],colHide: [[0],[true]],
			colFormat: [[4], [cfButton]], colAlign: [[4], [alCenter]],readOnly: true,
			dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "ID Sumur", maxLength: 10, change: [this, "doChange"],readOnly:true });
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Sumur", maxLength: 50, tag: 1 });				
		this.cb_lahan = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "Lahan", maxLength: 20, multiSelection: false,change: [this, "doChange"],rightLabelVisible:false });
		this.e_namalahan = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Lahan", readOnly:true, tag: 1 });
		this.e_kawas = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 450, 20], caption: "Kawasan", readOnly:true, tag: 1 });                		
		this.cb_lembaga = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 14, 220, 20], caption: "Lembaga", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });				
		this.c_aktif = new saiCB(this.pc1.childPage[1], { bound: [20, 25, 200, 20], caption: "Status Aktif", items: ["1.Aktif", "0.NonAktif"], readOnly: true, tag: 2 , change: [this, "doChange"]});
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,996,256], childPage:["Data Sumur"]});		
		this.cb_jenis = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 14, 220, 20], caption: "Jenis", maxLength: 20, tag: 2, readOnly:true });				
		this.e_coor = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 11, 400, 20], caption: "Koordinat", maxLength: 50, tag: 1 });		
		this.e_noreg = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 400, 20], caption: "No Regristrasi", maxLength: 50, tag: 1 });		
		this.e_posbang = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 600, 20], caption: "Posisi Bangunan", maxLength: 50, tag: 1 });
		this.e_dimensi = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 14, 600, 20], caption: "Dimensi Bangunan", maxLength: 50, tag: 1 });
		this.c_meter = new saiCB(this.pc2.childPage[0], { bound: [20, 15, 200, 20], caption: "Meter Air", items: ["Ada", "Tidak"], readOnly: true, tag: 2});
		this.e_dalam = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 16, 200, 20], caption: "Kedalaman (m bmp)", tag: 1, tipeText:ttNilai, text:"0" });
		this.e_jambang = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 17, 400, 20], caption: "Jambang (D/P)", maxLength: 50, tag: 1 });
		this.e_posisi = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 18, 400, 20], caption: "Posisi Saringan (D)", maxLength: 50, tag: 1 });
		this.e_tahun = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 11, 200, 20], caption: "Tahun Pembuatan", maxLength: 5, tag: 2,tipeText:ttAngka });

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);

		setTipeButton(tbSimpan);
		this.maximize();
		this.setTabChildIndex();

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");			
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun", true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];
				if (line != undefined) {
					this.tahun = line.tahun;
					this.e_tahun.setText(this.tahun);
				}
			}
			this.cb_jenis.setText("02","Sumur Imbuhan / Resapan");
			this.doLoad();
			
			this.stsCol = [0, 0, 0, 0, 0];
			this.cb_lahan.setSQL("select id_lahan,nama_lahan from amu_lahan where  kode_lokasi='" + this.app._lokasi + "'", ["id_lahan", "nama_lahan"], false, ["ID", "Nama"], "where", "Data Lahan", true);
			this.cb_lembaga.setSQL("select id_lembaga,nama from amu_lembaga", ["id_lembaga", "nama"], false, ["ID", "Nama"], "where", "Data Lembaga", true);
			this.c_show.setText("10");
			this.timeout = null;

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_amu_fSumResap.extend(window.childForm);
window.app_saku3_transaksi_amu_fSumResap.implement({
	doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		//this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_sumur_resap", "id_sumur",this.cb_jenis.getText() + this.tahun.substr(2,2) + ".", "000"));                    				
		
		var AddFormat = "__%"+"/02/"+this.tahun;
		var data = this.dbLib.getDataProvider("select isnull(max(id_sumur),0) as id_sumur from amu_sumur_resap where id_sumur like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				if (line.id_sumur == "0") this.cb_kode.setText("01"+"/02/"+this.tahun);
				else {
					var idx = parseFloat(line.id_sumur.substr(0,2)) + 1;
					idx = idx.toString();					
					if (idx.length == 1) var nu = "0"+idx;
					if (idx.length == 2) var nu = idx;
					this.cb_kode.setText(nu+"/02/"+this.tahun);						
				}
			} 
		}

		this.e_nama.setFocus();     																	
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
					if (this.stsSimpan == 0) {
						sql.add("delete from amu_sumur_resap where id_sumur = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");						
					}

					sql.add("insert into amu_sumur_resap (id_jenis_sumur,tahun,kode_lokasi,id_sumur,id_lahan,id_lembaga,flag_aktif,nama_sumur,koordinat,no_reg,posisi_bangun,dimensi_bangun,meter_air,dalam,jambang,posisi,tgl_input,nik_user) values "+
							"('"+this.cb_jenis.getText()+"','"+this.e_tahun.getText()+"','"+this.app._lokasi+"','"+this.cb_kode.getText()+"','"+this.cb_lahan.getText()+"','"+this.cb_lembaga.getText()+"','"+this.c_aktif.getText().substr(0,1)+"','"+this.e_nama.getText()+"','"+this.e_coor.getText()+"','"+this.e_noreg.getText()+"','"+this.e_posbang.getText()+"','"+this.e_dimensi.getText()+"','"+this.c_meter.getText()+"',"+nilaiToFloat(this.e_dalam.getText())+",'"+this.e_jambang.getText()+"','"+this.e_posisi.getText()+"',getdate(),'"+this.app._userLog+"')");

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
					sql.add("delete from amu_sumur_resap where id_sumur = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");						
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
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.doLoad();
				this.doTambah();
				break;
			case "simpan":
			case "ubah":
				this.simpan();
				break;
			case "simpancek": this.simpan();
				break;			
			case "hapus":
				this.hapus();
				break;
		}
	},
	doChange: function (sender) {
		try {
			if (sender == this.cb_kode && this.cb_kode.getText() != "") {
				var strSQL = "select * from amu_sumur_resap where id_sumur ='" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_nama.setText(line.nama_sumur);
						this.cb_lahan.setText(line.id_lahan);						
						this.cb_lembaga.setText(line.id_lembaga);						
						if (line.flag_aktif == "0") this.c_aktif.setText("0.NonAktif");
						else this.c_aktif.setText("1.Aktif");

						this.e_tahun.setText(line.tahun);
						this.e_coor.setText(line.koordinat);
						this.e_noreg.setText(line.no_reg);
						this.e_posbang.setText(line.posisi_bangun);
						this.e_dimensi.setText(line.dimensi_bangun);
						this.c_meter.setText(line.meter_air);
						this.e_dalam.setText(floatToNilai(line.dalam));
						this.e_jambang.setText(line.jambang);
						this.e_posisi.setText(line.posisi);

						this.stsSimpan = 0;
						setTipeButton(tbUbahHapus);
					}
					else {
						this.stsSimpan = 1;
						this.standarLib.clearByTag(this, new Array("1"), undefined);
						setTipeButton(tbSimpan);						
					}
				}
			}

			if (sender == this.cb_lahan && this.cb_lahan.getText() != "") {
				var strSQL = "select a.nama_lahan,f.nama as kawasan "+ 
							 "from amu_lahan a "+
							 "inner join amu_kawasan f on f.id_kawasan=a.id_kawasan "+
							 "where a.id_lahan ='" + this.cb_lahan.getText() + "' and a.kode_lokasi='"+this.app._lokasi+"' ";											 
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_namalahan.setText(line.nama_lahan);
						this.e_kawas.setText(line.kawasan);
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
		var strSQL = "select a.id_sumur, a.nama_sumur, a.no_reg, b.nama_lahan from amu_sumur_resap a inner join amu_lahan b on a.id_lahan=b.id_lahan where a.kode_lokasi='" + this.app._lokasi + "'";
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
			this.sg1.appendData([line.id_sumur, line.nama_sumur, line.nama_lahan, line.no_reg, "Pilih"]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function (sender, page) {
		this.doTampilData(page);
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['a.id_sumur', 'a.nama_sumur', 'b.nama_lahan', 'a.no_reg'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}

			var strSQL = "select a.id_sumur, a.nama_sumur, b.nama_Lahan, a.no_reg " +
				"from amu_sumur_resap a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
				"where " + filter_string + "and a.kode_lokasi= '" + this.app._lokasi + "' ";

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

				var column_array = ['a.id_sumur', 'a.nama_sumur', 'b.nama_lahan', 'a.no_reg'];

				var search = this.e_kode2.getText();
				var filter_string = " (";

				for (var i = 0; i < column_array.length; i++) {

					if (i == (column_array.length - 1)) {
						filter_string += column_array[i] + " like '%" + search + "%' )";
					} else {
						filter_string += column_array[i] + " like '%" + search + "%' or ";
					}
				}

				var strSQL = "select a.id_sumur, a.nama_sumur, b.nama_lahan, a.no_reg " +
					"from amu_sumur_resap a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
					"where " + filter_string + "and a.kode_lokasi= '" + this.app._lokasi + "'  " +
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