window.app_saku3_transaksi_yakes21_pbh_fOtorisasi = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_yakes21_pbh_fOtorisasi.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_yakes21_pbh_fOtorisasi";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Otorisasi", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid", true);

		this.c_modul = new saiCB(this,{bound:[20,11,200,20],caption:"Modul",items:["SPB"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 430], childPage: ["List Data", "Entry Data"] });
		this.sg1 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 35], colCount: 2, tag: 9,
			colTitle: ["Kode", "Lokasi"],
			colWidth: [[1, 0], [80, 300]],
			readOnly: true,
			dblClick: [this, "doDoubleClick"], autoAppend: false, defaultRow: 1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "ID Otorisasi", maxLength: 10, change: [this, "doChange"] });
		this.cb_lokasi = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Kode Lokasi",maxLength:15,tag:2,multiSelection:false});        
        this.cb_sah = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"NIK Mengesahkan",maxLength:15,tag:2,multiSelection:false, change: [this, "doChange"] });
		this.e_jabsah = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 400, 20], caption: "Jabatan", maxLength: 50,tag:2});
		this.cb_fiat = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"NIK Fiat",maxLength:15,tag:2,multiSelection:false,  change: [this, "doChange"] });
		this.e_jabfiat = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 18, 400, 20], caption: "Jabatan", maxLength: 50,tag:2});
		this.e_batas_b = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Batas Bawah",maxLength:50,tag:1,tipeText:ttNilai, text:"0"});	
        this.e_batas_a = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Batas Atas",maxLength:50,tag:1,tipeText:ttNilai, text:"0"});				

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);

		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi <> '00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
            this.cb_sah.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_fiat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
            
			this.c_modul.setText("");
			this.doLoad();

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_pbh_fOtorisasi.extend(window.childForm);
window.app_saku3_transaksi_yakes21_pbh_fOtorisasi.implement({	
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
					sql.add("insert into pbh_otorisasi(id,kode_lokasi,modul,nik_sah,nik_fiat,nilai_min,nilai_max,jab_sah,jab_fiat) values "+
							"('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.c_modul.getText()+"','"+this.cb_sah.getText()+"','"+this.cb_fiat.getText()+"',"+nilaiToFloat(this.e_batas_b.getText())+","+nilaiToFloat(this.e_batas_a.getText())+",'"+this.e_jabsah.getText()+"','"+this.e_jabfiat.getText()+"')");					
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
					sql.add("delete from pbh_otorisasi where id = '" + this.cb_kode.getText() + "'");
					sql.add("insert into pbh_otorisasi(id,kode_lokasi,modul,nik_sah,nik_fiat,nilai_min,nilai_max,jab_sah,jab_fiat) values "+
							"('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.c_modul.getText()+"','"+this.cb_sah.getText()+"','"+this.cb_fiat.getText()+"',"+nilaiToFloat(this.e_batas_b.getText())+","+nilaiToFloat(this.e_batas_a.getText())+",'"+this.e_jabsah.getText()+"','"+this.e_jabfiat.getText()+"')");					

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
					sql.add("delete from pbh_otorisasi where id = '" + this.cb_kode.getText() + "'");
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
				this.pc1.setActivePage(this.pc1.childPage[0]);
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
			if (sender == this.c_modul && this.c_modul.getText() != "") this.doLoad();
			if (sender == this.cb_sah && this.cb_sah.getText()!="" && this.e_jabsah.getText()=="") {
				var strSQL = "select jabatan from karyawan where nik ='" + this.cb_sah.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_jabsah.setText(line.jabatan);
					}
				}
			}
			if (sender == this.cb_fiat && this.cb_fiat.getText()!="" && this.e_jabfiat.getText()=="") {
				var strSQL = "select jabatan from karyawan where nik ='" + this.cb_fiat.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_jabfiat.setText(line.jabatan);
					}
				}
			}

			if (sender == this.cb_kode && this.cb_kode.getText() != "") {
				var strSQL = "select * from pbh_otorisasi where id ='" + this.cb_kode.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.cb_lokasi.setText(line.kode_lokasi);
						this.cb_sah.setText(line.nik_sah);
						this.e_jabsah.setText(line.jab_sah);
						this.cb_fiat.setText(line.nik_fiat);
						this.e_jabfiat.setText(line.jab_fiat);
						this.e_batas_b.setText(floatToNilai(line.nilai_min));
						this.e_batas_a.setText(floatToNilai(line.nilai_max));										
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
		var strSQL = "select id,kode_lokasi " +
			"from pbh_otorisasi where modul='"+this.c_modul.getText()+"' " +			
			" order by kode_lokasi";
		var data = this.dbLib.getDataProvider(strSQL, true);
		if (typeof data == "object" && data.rs.rows[0] != undefined) {
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / 20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);
	},
	doTampilData: function (page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : start + 20);
		for (var i = start; i < finish; i++) {
			line = this.dataJU.rs.rows[i];
			this.sg1.appendData([line.id, line.kode_lokasi]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function (sender, page) {
		this.doTampilData(page);
	}
});
