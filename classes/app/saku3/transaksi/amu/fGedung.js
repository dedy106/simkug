window.app_saku3_transaksi_amu_fGedung = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_amu_fGedung.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_amu_fGedung";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Gedung", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid", true);
		
		this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar Gedung", "Data Gedung"] });
		this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

		this.sg1 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 65], colCount: 5, tag: 9,
			colTitle: ["ID Gedung", "Nama Gedung", "Lahan", "Alamat", "Pilih"],
			colWidth: [[4,3,2,1,0], [70,350,250,250,80]],colHide: [[0],[true]],
			colFormat: [[4], [cfButton]], colAlign: [[4], [alCenter]],readOnly: true,
			dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "ID Gedung", maxLength: 10, change: [this, "doChange"],readOnly:true });
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Gedung", maxLength: 50, tag: 1 });				
		this.cb_lahan = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "Lahan", maxLength: 20, multiSelection: false,change: [this, "doChange"],rightLabelVisible:false });
		this.e_namalahan = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Lahan", readOnly:true, tag: 1 });
		this.e_kawas = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 450, 20], caption: "Kawasan", readOnly:true, tag: 1 });                		
		this.cb_lembaga = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 14, 220, 20], caption: "Lembaga", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });				
		this.c_sts = new saiCB(this.pc1.childPage[1], { bound: [20, 24, 200, 20], caption: "Status Gedung", items: ["Milik", "Sewa"], readOnly: true, tag: 2 , change: [this, "doChange"]});
		this.c_aktif = new saiCB(this.pc1.childPage[1], { bound: [20, 25, 200, 20], caption: "Status Aktif", items: ["1.Aktif", "0.NonAktif"], readOnly: true, tag: 2 , change: [this, "doChange"]});
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,232], childPage:["Data Gedung","Data Milik / Sewa"]});
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 450, 20], caption: "Alamat Gedung", maxLength: 100, tag: 1 });
		this.e_luas_lt = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 17, 200, 20], caption: "Luas Lantai (m2)", maxLength: 100, tag: 1,tipeText:ttNilai,text:"0"});
		this.e_lt = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 18, 200, 20], caption: "Jumlah Lantai", maxLength: 100, tag: 1,tipeText:ttNilai,text:"0" });
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 19, 200, 20], caption: "Jumlah Ruangan", maxLength: 100, tag: 1,tipeText:ttNilai,text:"0" });				
		this.e_coorX = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 20, 200, 20], caption: "Koor X", maxLength: 50, tag: 9 });
		this.e_coorY = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 21, 200, 20], caption: "Koor Y", maxLength: 50, tag: 9 });

		this.sgm = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:9,
					colTitle:["Keterangan","Nilai Perolehan","Tgl Perolehan","No IMB","Tgl Terbit","Luas (m2)","Jml Lantai","Jml Ruangan"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,150,100,100,300]],										
					buttonStyle:[[2,4],[bsDate,bsDate]], 
					colFormat:[[1,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:true,defaultRow:1});
		this.sgnm = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sgm});				

		this.sgs = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,visible:false,
					colTitle:["Mitra","No PKS","Nilai","Luas (m2)","Tgl Mulai","Tgl Berakhir","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[200,100,100,100,100,150,250]],															
					buttonStyle:[[4,5],[bsDate,bsDate]], 
					colFormat:[[2,3],[cfNilai,cfNilai]],					
					autoAppend:true,defaultRow:1});
		this.sgns = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sgs});				

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
				}
			}
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
window.app_saku3_transaksi_amu_fGedung.extend(window.childForm);
window.app_saku3_transaksi_amu_fGedung.implement({
	doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_gedung", "id_gedung","GD" + this.tahun.substr(2,2) + ".", "000"));                    				
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
						sql.add("delete from amu_gedung where id_gedung = '" + this.cb_kode.getText() + "' ");
						if (this.c_sts.getText() == "Milik")
							sql.add("delete from amu_gedung_milik where id_gedung = '" + this.cb_kode.getText() + "' ");										
						else sql.add("delete from amu_gedung_sewa where id_gedung = '" + this.cb_kode.getText() + "' ");						
					}

					sql.add("insert into amu_gedung(kode_lokasi,id_gedung,id_lahan,nama_gedung,alamat,coor_x,coor_y,luas_lantai,jumlah_ruang,id_lembaga,status,jumlah_lantai,flag_aktif) values " +
							"('" + this.app._lokasi + "','" + this.cb_kode.getText() + "','" + this.cb_lahan.getText() + "','" + this.e_nama.getText() + "','" + this.e_alamat.getText() + "','" + this.e_coorX.getText() + "','" + this.e_coorY.getText() + "'," + nilaiToFloat(this.e_luas_lt.getText()) + "," +  nilaiToFloat(this.e_jml.getText()) + ",'"+this.cb_lembaga.getText()+"','"+this.c_sts.getText()+"',"+ nilaiToFloat(this.e_lt.getText())+",'"+this.c_aktif.getText().substr(0,1)+"')");

					var idx = 0;
					var idx2 = "";		
					if (this.c_sts.getText() == "Milik") {
						if (this.sgm.getRowValidCount() > 0){
							for (var i=0;i < this.sgm.getRowCount();i++){
								if (this.sgm.rowValid(i)){									
									idx = i+1;
									idx2 = idx.toString();
									if (idx2.length == 1) var nu = "00"+idx2;
									if (idx2.length == 2) var nu = "0"+idx2;
									if (idx2.length == 3) var nu = idx2;
								
									var nb = this.cb_kode.getText() + "|" + idx2;									
									sql.add("insert into  amu_gedung_milik (no_bukti,id_gedung,n_oleh,tgl_oleh,nik_user,tgl_input,keterangan,kode_lokasi, no_imb,tgl_terbit,luas,lantai,ruang) values " +
							 				"('"+nb+"','"+this.cb_kode.getText()+"',"+nilaiToFloat(this.sgm.cells(1,i))+",'"+this.sgm.getCellDateValue(2,i)+"','"+this.app._userLog+"',getdate(),'"+this.sgm.cells(0,i)+"','"+this.app._lokasi+"', '"+this.sgm.cells(3,i)+"','"+this.sgm.getCellDateValue(4,i)+"',"+nilaiToFloat(this.sgm.cells(5,i))+","+nilaiToFloat(this.sgm.cells(6,i))+","+nilaiToFloat(this.sgm.cells(7,i))+")");
							 									
								}
							}
						}							
					}
					else {
						if (this.sgs.getRowValidCount() > 0){
							for (var i=0;i < this.sgs.getRowCount();i++){
								if (this.sgs.rowValid(i)){
									idx = i+1;
									idx2 = idx.toString();
									if (idx2.length == 1) var nu = "00"+idx2;
									if (idx2.length == 2) var nu = "0"+idx2;
									if (idx2.length == 3) var nu = idx2;	

									var nb = this.cb_kode.getText() + "|" + idx2;										
									sql.add("insert into amu_gedung_sewa(no_bukti, id_gedung, kode_lokasi, mitra, no_pks,  nilai, luas, tgl_mulai, tgl_selesai, keterangan, flag_aktif) values "+
											"('"+nb+"', '"+this.cb_kode.getText()+"', '"+this.app._lokasi+"', '"+this.sgs.cells(0,i)+"', '"+this.sgs.cells(1,i)+"', "+nilaiToFloat(this.sgs.cells(2,i))+", "+nilaiToFloat(this.sgs.cells(3,i))+", '"+this.sgs.getCellDateValue(4,i)+"', '"+this.sgs.getCellDateValue(5,i)+"', '"+this.sgs.cells(6,i)+"', '1')");
								}
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
					sql.add("delete from amu_gedung where id_gedung = '" + this.cb_kode.getText() + "' ");
					if (this.c_sts.getText() == "Milik")
						sql.add("delete from amu_gedung_milik where id_gedung = '" + this.cb_kode.getText() + "' ");										
					else sql.add("delete from amu_gedung_sewa where id_gedung = '" + this.cb_kode.getText() + "' ");						
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
				this.sgm.clear(1);
				this.sgs.clear(1);
				this.doLoad();
				this.doTambah();
				break;
			case "simpan":
			case "ubah":
				if (this.stsSimpan == 0 && (this.c_sts.getText() != this.stsLama)) {
					system.alert(this,"Status Gedung tidak sesuai dengan Data yang sudah tersimpan.","Data tidak dapat diubah.");
					return false;
				}
				else this.simpan();
				break;
			case "simpancek": this.simpan();
				break;			
			case "hapus":
				if (this.stsLama != this.c_sts.getText()) {
					system.alert(this,"Status Gedung tidak sesuai dengan Data yang sudah tersimpan.","Data tidak dapat dihapus.");
					return false;
				}
				else this.hapus();
				break;
		}
	},
	doChange: function (sender) {
		try {
			if (sender == this.cb_kode && this.cb_kode.getText() != "") {
				var strSQL = "select id_gedung,id_lahan,id_kawasan,id_lembaga,status,nama_gedung,alamat,coor_x,coor_y,tanggal_perolehan,nilai_perolehan,nop,luas_lantai,luas_lain,jumlah_ruang,atas_nama,jumlah_lantai,flag_aktif " +
					"from amu_gedung where id_gedung ='" + this.cb_kode.getText() + "' ";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_nama.setText(line.nama_gedung);
						this.cb_lahan.setText(line.id_lahan);						
						this.cb_lembaga.setText(line.id_lembaga);
						this.e_alamat.setText(line.alamat);
						this.e_coorX.setText(line.coor_x);
						this.e_coorY.setText(line.coor_y);
						this.c_sts.setText(line.status);						
					    this.e_luas_lt.setText(line.luas_lantai);
						this.e_jml.setText(line.jumlah_ruang);
						this.e_lt.setText(line.jumlah_lantai);
						if (line.flag_aktif == "0") this.c_aktif.setText("0.NonAktif");
						else this.c_aktif.setText("1.Aktif");

						this.stsLama = line.status;
						this.stsSimpan = 0;
						this.loadDetail();
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

			if (sender == this.c_sts && this.c_sts.getText()!= "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
			    if (this.c_sts.getText() == "Milik") {
					this.sgm.show();
					this.sgs.hide();
					this.sgm.setTag("1");
					this.sgs.setTag("9");
				}
				else {					
					this.sgs.show();
					this.sgm.hide();
					this.sgm.setTag("9");
					this.sgs.setTag("1");
				}
			}

		} catch (e) {
			systemAPI.alert(e);
		}
	},
	loadDetail: function() {
		try {
			if (this.c_sts.getText() == "Milik") {	
				var strSQL = "select keterangan,convert(varchar,tgl_oleh,103) as tgl_oleh,luas,lantai,ruang,n_oleh,no_imb,convert(varchar,tgl_terbit,103) as tgl_terbit "+
							 "from amu_gedung_milik where id_gedung='"+this.cb_kode.getText()+"' order by no_bukti";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgm.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sgm.appendData([line.keterangan,floatToNilai(line.n_oleh),line.tgl_oleh,line.no_imb,line.tgl_terbit,floatToNilai(line.luas),floatToNilai(line.lantai),floatToNilai(line.ruang)]);
					}
				} else this.sgm.clear(1);
			}
			else {
				var strSQL = "select mitra,no_pks,luas,nilai,convert(varchar,tgl_mulai,103) as tgl1,convert(varchar,tgl_selesai,103) as tgl2,keterangan "+
							 "from amu_gedung_sewa where id_gedung='"+this.cb_kode.getText()+"' order by no_bukti";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgs.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						this.sgs.appendData([line.mitra,line.no_pks,floatToNilai(line.nilai),floatToNilai(line.luas),line.tgl1,line.tgl2,line.keterangan]);
					}
				} else this.sgs.clear(1);
			}
		}
		catch(e) {
			alert(e);
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
		var strSQL = "select a.id_gedung, a.nama_gedung, a.alamat, b.nama_lahan from amu_gedung a inner join amu_lahan b on a.id_lahan=b.id_lahan where a.kode_lokasi='" + this.app._lokasi + "'";
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
			this.sg1.appendData([line.id_gedung, line.nama_gedung, line.nama_lahan, line.alamat, "Pilih"]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function (sender, page) {
		this.doTampilData(page);
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['a.id_gedung', 'a.nama_gedung', 'b.nama_lahan', 'a.alamat'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}

			var strSQL = "select a.id_gedung, a.nama_gedung, b.nama_Lahan, a.alamat " +
				"from amu_gedung a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
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

				var column_array = ['a.id_gedung', 'a.nama_gedung', 'b.nama_lahan', 'a.alamat'];

				var search = this.e_kode2.getText();
				var filter_string = " (";

				for (var i = 0; i < column_array.length; i++) {

					if (i == (column_array.length - 1)) {
						filter_string += column_array[i] + " like '%" + search + "%' )";
					} else {
						filter_string += column_array[i] + " like '%" + search + "%' or ";
					}
				}

				var strSQL = "select a.id_gedung, a.nama_gedung, b.nama_lahan, a.alamat " +
					"from amu_gedung a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
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