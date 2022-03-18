window.app_saku3_transaksi_amu_fLembaga = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_amu_fLembaga.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_amu_fLembaga";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Lembaga", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid", true);
		
		this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar Lembaga", "Data Lembaga"] });
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [680, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [940, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

		this.sg1 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64], colCount: 4, tag: 9,
			colTitle: ["ID Lembaga", "ID Lokasi", "Nama Lembaga", "Pilih"],
			colWidth: [[3,2,1,0], [70,350,80,80]],
			colFormat: [[3], [cfButton]], colAlign: [[3], [alCenter]],
			readOnly: true,
			dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "ID", maxLength: 10, change: [this, "doChange"] });
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama", maxLength: 50, tag: 1 });
		this.cb_lokasi = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 30, 220, 20], caption: "Lokasi", maxLength: 20, multiSelection: false, change: [this, "doChange"] });
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 31, 220, 20], caption: "PP", maxLength: 20, multiSelection: false });
		this.cb_desa = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 14, 220, 20], caption: "Desa/Kelurahan", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
		this.cb_kawas = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 15, 220, 20], caption: "Kawasan", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
		this.cb_prov = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 13, 220, 20], caption: "Provinsi", maxLength: 20, readOnly:true, tag: 1});
		this.cb_kota = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 14, 220, 20], caption: "Kota/Kab", maxLength: 20,  readOnly:true, tag: 1});		
		this.cb_kec = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 13, 220, 20], caption: "Kecamatan", maxLength: 20,  readOnly:true, tag: 1});				
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 450, 20], caption: "Alamat", maxLength: 150, tag: 1 });
		this.e_tel1 = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 300, 20], caption: "No Telp 1", maxLength: 50, tag: 1 });
		this.e_tel2 = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 14, 300, 20], caption: "No Telp 2", maxLength: 50, tag: 1 });		
		this.e_email = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 300, 20], caption: "Email 1", maxLength: 50, tag: 1 });
		this.e_email2 = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 300, 20], caption: "Email 2", maxLength: 50, tag: 1 });
		this.e_web = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 18, 300, 20], caption: "Web Site", maxLength: 50, tag: 1 });
		
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,32,370,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[410,32,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",autoSubmit:true, afterUpload:[this,"doAfterLoad"]}); 
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);

		this.img = new image(this.pc1.childPage[1],{bound:[520,100,160,180]});

		setTipeButton(tbSimpan);
		this.maximize();
		this.setTabChildIndex();

		try {

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");

			this.uploader.param4 = "server/media/";	
			
			this.standarLib = new util_standar();
			this.doLoad();

			this.stsCol = [0, 0, 0, 0];
			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi ", ["kode_lokasi", "nama"], false, ["ID", "Nama"], "where", "Data Lokasi", true);
			this.cb_desa.setSQL("select id, nama from amu_desa ", ["id", "nama"], false, ["ID", "Nama"], "and", "Data Desa", true);
			this.cb_kawas.setSQL("select id_kawasan,nama from amu_kawasan", ["id_kawasan", "nama"], false, ["ID", "Nama"], "where", "Data Kawasan", true);
			this.c_show.setText("10");
			this.timeout = null;
		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_amu_fLembaga.extend(window.childForm);
window.app_saku3_transaksi_amu_fLembaga.implement({
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_foto.setText(data.filedest);
			this.dataUpload = data;
			this.img.setImage(this.uploader.param2 +this.dataUpload.tmpfile);
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;			
		}catch(e){
			alert(e);
		}
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
					sql.add("insert into amu_lembaga(id_lembaga,nama,kode_lokasi,kode_pp,no_tel1,no_tel2,email,email2,web,id_desa,id_kawasan,alamat,gambar) values " +
							"('" + this.cb_kode.getText() + "','" + this.e_nama.getText() + "','" + this.cb_lokasi.getText() + "','"+this.cb_pp.getText()+"','"+this.e_tel1.getText()+"','"+this.e_tel2.getText()+"','"+this.e_email.getText()+"','"+this.e_email2.getText()+"','"+this.e_web.getText()+"','"+this.cb_desa.getText()+"','"+this.cb_kawas.getText()+"','"+this.e_alamat.getText()+"','"+this.e_foto.getText()+"')");
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
					sql.add("delete from amu_lembaga where id_lembaga = '" + this.cb_kode.getText() + "' ");
					sql.add("insert into amu_lembaga(id_lembaga,nama,kode_lokasi,kode_pp,no_tel1,no_tel2,email,email2,web,id_desa,id_kawasan,alamat,gambar) values " +
							"('" + this.cb_kode.getText() + "','" + this.e_nama.getText() + "','" + this.cb_lokasi.getText() + "','"+this.cb_pp.getText()+"','"+this.e_tel1.getText()+"','"+this.e_tel2.getText()+"','"+this.e_email.getText()+"','"+this.e_email2.getText()+"','"+this.e_web.getText()+"','"+this.cb_desa.getText()+"','"+this.cb_kawas.getText()+"','"+this.e_alamat.getText()+"','"+this.e_foto.getText()+"')");
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
					sql.add("delete from amu_lembaga where id_lembaga = '" + this.cb_kode.getText() + "' ");
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
	doChange: function (sender) {
		try {
			if (sender == this.cb_kode && this.cb_kode.getText() != "") {				
				var strSQL = "select id_lembaga,nama,kode_lokasi,kode_pp,no_tel1,no_tel2,email,email2,web,id_desa,id_kawasan,alamat,gambar " +
							 "from amu_lembaga where id_lembaga ='" + this.cb_kode.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_nama.setText(line.nama);
						this.cb_lokasi.setText(line.kode_lokasi);
						this.cb_pp.setText(line.kode_pp);
						this.cb_prov.setText(line.id_provinsi);
						this.cb_kota.setText(line.id_kota);
						this.cb_kec.setText(line.id_kecamatan);
						this.cb_desa.setText(line.id_desa);
						this.cb_kawas.setText(line.id_kawasan);
						this.e_tel1.setText(line.no_tel1);
						this.e_tel2.setText(line.no_tel2);
						this.e_email.setText(line.email);
						this.e_email2.setText(line.email2);
						this.e_web.setText(line.web);
						this.e_alamat.setText(line.alamat);

						this.e_foto.setText(line.gambar);
						this.img.setImage(this.uploader.param4 + line.gambar);
						this.fileBfr = line.gambar;	

						setTipeButton(tbUbahHapus);
					}
					else {
						this.standarLib.clearByTag(this, new Array("1"), undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
			
			if (sender == this.cb_desa && this.cb_desa.getText() != "") {
				var strSQL = "select b.id as id_kec,b.nama as nama_kec, c.id as id_kota,c.nama as nama_kota, d.id as id_prov,d.nama as nama_prov "+
							 "from amu_desa a "+
							 "inner join amu_kecamatan b on a.id_kecamatan=b.id "+
							 "inner join amu_kota c on b.id_kota=c.id "+
							 "inner join amu_provinsi d on c.id_provinsi=d.id "+
							 "where a.id ='"+this.cb_desa.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.cb_kec.setText(line.id_kec,line.nama_kec);
						this.cb_kota.setText(line.id_kota,line.nama_kota);
						this.cb_prov.setText(line.id_prov,line.nama_prov);
					}					
				}	
			}
		
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") {
				this.cb_pp.setSQL("select kode_pp,nama from pp where kode_lokasi='"+this.cb_lokasi.getText()+"' ", ["kode_pp", "nama"], false, ["ID", "Nama"], "where", "Data PP", true);
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

							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_foto.getText()) this.fileUtil.deleteFile(this.rootDir+"/"+this.folderImg+this.fileBfr);
							}																
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);

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
		var strSQL = "select id_lembaga, kode_lokasi, nama from amu_lembaga ";
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
			this.sg1.appendData([line.id_lembaga, line.kode_lokasi, line.nama, "Pilih"]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function (sender, page) {
		this.doTampilData(page);
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['id_lembaga', 'kode_lokasi', 'nama'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}

			var strSQL = "select id_lembaga, kode_lokasi, nama from amu_lembaga " +"where" + filter_string;			
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

				var column_array = ['id_lembaga', 'kode_lokasi', 'nama'];

				var search = this.e_kode2.getText();
				var filter_string = " (";

				for (var i = 0; i < column_array.length; i++) {

					if (i == (column_array.length - 1)) {
						filter_string += column_array[i] + " like '%" + search + "%' )";
					} else {
						filter_string += column_array[i] + " like '%" + search + "%' or ";
					}
				}

				var strSQL = "select id_lembaga, kode_lokasi, nama " +
					"from amu_lembaga " +
					"where " + filter_string +
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