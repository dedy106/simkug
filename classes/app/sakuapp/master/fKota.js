window.app_sakuapp_master_fKota = function (owner) {
	if (owner) {
		window.app_sakuapp_master_fKota.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_amu_fKota";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Kota", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid", true);
		this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar Kota", "Data Kota"] });

		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [20, 10, 200, 20], caption: "Show", items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [720, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });

		this.sg1 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 68], colCount: 4, tag: 9,
			colTitle: ["ID Kota", "ID Provinsi", "Nama Kota", "Pilih"],
			colWidth: [[0, 1, 2, 3], [80, 80, 350, 100]],
			colFormat: [[3], [cfButton]], colAlign: [[3], [alCenter]],
			readOnly: true, autoPaging:true, rowPerPage:50,
			dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "Id", maxLength: 10, change: [this, "doChange"] });
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 500, 20], caption: "Nama", maxLength: 50, tag: 1 });
		this.cb_prov = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 30, 220, 20], caption: "Provinsi", maxLength: 20, multiSelection: false });

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

			this.stsCol = [0, 0, 0, 0];
			this.cb_prov.setSQL("select id,nama from amu_provinsi ", ["id", "nama"], false, ["ID", "Nama"], "where", "Data Provinsi", true);

			// this.cb_prov.setServices(this.app.services, "callServices",["financial_Kota","listProv",[this.app._lokasi]],["kode_prov","nama"],"");
			
			// this.app.services.callServices("financial_Kota", "listProv", [this.app._lokasi], (data) => {
			// 	// data.rs.rows.forEach( (val, index) => {
			// 	// 	this.cb_prov.addItem([val.id, val.nama]);
			// 	// } );
				
			// 	this.cb_prov.setBufferData(data);
            // });

			this.c_show.setText("10");
			this.timeout = null;
		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_sakuapp_master_fKota.extend(window.childForm);
window.app_sakuapp_master_fKota.implement({
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
					
					let self = this;
                    let id = self.cb_kode.getText();
					let id_provinsi = self.cb_prov.getText();
                    let nama = self.e_nama.getText();
					
                    try {
                        if (id != '' && nama != '') {
                            self.app.services.callServices("financial_Kota", "addKota", [id, id_provinsi, nama], (data) => {
                                if (data == 'process completed') {
                                    system.info(self, "Data berhasil disimpan");
                                    self.loadData();
                                }else system.alert(self, data);
                            })
                        } else {
                            system.alert(self, "Inputan Tidak Boleh Kosong");
                        }

                    } catch (e) {
                        systemAPI.alert(e);
                    }
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
					let self = this;
                    let id = self.cb_kode.getText();
					let id_provinsi = self.cb_prov.getText();
                    let nama = self.e_nama.getText();
                    self.app.services.callServices("financial_Kota", "ubahKota", [id, id_provinsi, nama], (data) => {
                        if (data == 'process completed') {
                            system.info(self, "Data berhasil disimpan");
                            self.loadData();
                        }else system.alert(self, data);
                    })
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
					let self = this;
                    let id = self.cb_kode.getText();
                    self.app.services.callServices("financial_Kota", "hapusKota", [id], (data) => {
                        if (data == 'process completed') {
                            system.info(self, "Data berhasil dihapus");
                            self.loadData();
                        }else system.alert(self, data);
                    })
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
				var strSQL = "select id,nama,id_provinsi " +
					"from amu_kota where id ='" + this.cb_kode.getText() + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_nama.setText(line.nama);
						this.cb_prov.setText(line.id_provinsi);
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
						break;
				}
			}
			catch (e) {
				systemAPI.alert("step : " + step + "; error = " + e);
			}
		}
	},
	doLoad: function (sender) {
		let self = this;
        self.sg1.clear(0);
        this.app.services.callServices("financial_Kota", "listKota", [], (data) => {
            // console.log(JSON.stringify(data));
            data.rs.rows.forEach( (val, index) => {
                this.sg1.appendData([val.id, val.id_provinsi,val.nama,"Pilih"]);
            } );
            
        });
		
	},
	
	doPager: function (sender, page) {
		this.sg1.selectPage(page);
	},
	
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['id', 'id_provinsi', 'nama'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}
			
			let self = this;
			self.sg1.clear(0);
			this.app.services.callServices("financial_Kota", "findKota", [filter_string], (data) => {
				// console.log(JSON.stringify(data));
				data.rs.rows.forEach( (val, index) => {
					this.sg1.appendData([val.id, val.id_provinsi,val.nama,"Pilih"]);
				} );
				
			});
		
			
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

				var column_array = ['id', 'id_provinsi', 'nama'];

				var search = this.e_kode2.getText();
				var filter_string = " (";

				for (var i = 0; i < column_array.length; i++) {

					if (i == (column_array.length - 1)) {
						filter_string += column_array[i] + " like '%" + search + "%' )";
					} else {
						filter_string += column_array[i] + " like '%" + search + "%' or ";
					}
				}

				var strSQL = "select id, id_provinsi, nama " +
					"from amu_kota " +
					"where " + filter_string +
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
	
});