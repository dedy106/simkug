window.app_saku3_transaksi_amu_fLahanGabung = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_amu_fLahanGabung.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_amu_fLahanGabung";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Lahan", 0);

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid", true);
		
		this.pc1 = new pageControl(this, { bound: [20, 12, 1000, 450], childPage: ["Daftar Lahan", "Data Lahan"] });		
		this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

		this.sg1 = new saiGrid(this.pc1.childPage[0], {
			bound: [1, 5, this.pc1.width - 5, this.pc1.height - 64], colCount: 4, tag: 9,
			colTitle: ["ID Lahan", "Nama Lahan", "Alamat", "Pilih"],
			colWidth: [[3,2,1,0], [70, 350, 300, 100]],
			colFormat: [[3], [cfButton]], colAlign: [[3], [alCenter]],
			readOnly: true,
			dblClick: [this, "doDoubleClick"], click: [this, "doSort"], autoAppend: false, defaultRow: 1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg1, pager: [this, "doPager"] });

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 10, 200, 20], caption: "ID Lahan", readOnly:true, maxLength: 10, change: [this, "doChange"] });		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 500, 20], caption: "Uraian Aset", maxLength: 50, tag: 1 });
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 12, 500, 20], caption: "Alamat", maxLength: 100, tag: 1 });		
		this.c_aktif = new saiCB(this.pc1.childPage[1], { bound: [20, 23, 200, 20], caption: "Status Aktif", items: ["1-Aktif", "0-Non Aktif"], readOnly: true, tag: 2 });
		this.c_sts = new saiCB(this.pc1.childPage[1], { bound: [20, 24, 200, 20], caption: "Status Lahan", items: ["Milik", "Sewa"], readOnly: true, tag: 2,change:[this,"doChange"] });

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,301], childPage:["Data Lokasi","Data Milik / Sewa"]});
		this.cb_desa = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 14, 220, 20], caption: "Desa/Kelurahan", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });
		this.cb_prov = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 13, 220, 20], caption: "Provinsi", maxLength: 20, readOnly:true, tag: 1});
		this.cb_kota = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 14, 220, 20], caption: "Kota/Kab", maxLength: 20,  readOnly:true, tag: 1});		
		this.cb_kec = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 13, 220, 20], caption: "Kecamatan", maxLength: 20,  readOnly:true, tag: 1});		
		this.cb_kawas = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 15, 220, 20], caption: "Kawasan", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 11, 500, 20], caption: "Keterangan", maxLength: 200, tag: 1 });
		this.e_coorX = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 22, 200, 20], caption: "Koor X", maxLength: 50, tag: 8 });
		this.e_coorY = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 23, 200, 20], caption: "Koor Y", maxLength: 50, tag: 8 });

		this.sgm = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:11,tag:9,
					colTitle:["No Sertifikat","Atas Nama","Tgl Perolehan","Cara Perolehan","Status","Luas (m2)","Nilai Perolehan","Tgl Terbit","Tgl Jth Tempo","No AJB","Tgl AJB"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,150,100,100,100,80,80,100,100,300,200]],										
					buttonStyle:[[2,3,4,7,8,10],[bsDate,bsAuto,bsAuto,bsDate,bsDate,bsDate]], 
					colFormat:[[5,6],[cfNilai,cfNilai]],
					pasteEnable:true,
					picklist:[[3,4],[new portalui_arrayMap({items:["Beli", "Hibah"]}),new portalui_arrayMap({items:["HM", "HGU", "HGB", "HP", "HS", "HMT", "HMHH", "HHL"]})]],checkItem: true,					
					autoAppend:true,defaultRow:1});
		this.sgnm = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sgm});				

		this.sgs = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:9,visible:false,
					colTitle:["No PKS YPT","Mitra","No PKS Mitra","Luas (m2)","Nilai","Tgl Mulai","Tgl Berakhir","Keterangan"],
					colWidth:[[7,6,5,4,3,2,1,0],[200,100,100,100,100,150,200,150]],															
					buttonStyle:[[5,6],[bsDate,bsDate]], 
					colFormat:[[3,4],[cfNilai,cfNilai]],	
					pasteEnable:true,				
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
			
			this.stsCol = [0, 0, 0, 0];
			this.cb_kawas.setSQL("select id_kawasan,nama from amu_kawasan", ["id_kawasan", "nama"], false, ["ID", "Nama"], "where", "Data Kawasan", true);
			this.cb_desa.setSQL("select id, nama from amu_desa ", ["id", "nama"], false, ["ID", "Nama"], "and", "Data Desa", true);
			this.c_show.setText("10");
			this.timeout = null;

			this.doLoad();

		} catch (e) {
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_amu_fLahanGabung.extend(window.childForm);
window.app_saku3_transaksi_amu_fLahanGabung.implement({
	doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_lahan", "id_lahan", "LH" + this.tahun.substr(2,2) + ".", "000"));                    				
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
						sql.add("delete from amu_lahan where id_lahan = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");
						
						if (this.c_sts.getText() == "Milik") 
							sql.add("delete from amu_sertifikat_lahan where id_lahan = '" + this.cb_kode.getText() + "' ");
						else sql.add("delete from amu_lahan_sewa where id_lahan = '" + this.cb_kode.getText() + "' ");						
					}

					sql.add("insert into amu_lahan(kode_lokasi,id_lahan,nama_lahan,alamat,coor_x,coor_y,id_provinsi,id_kota,id_kecamatan,id_desa,id_kawasan, status_dokumen,keterangan) values " + //no_hgb,tgl_hgb,tgl_jt_hgb,no_ajb,tgl_ajb
							"('" + this.app._lokasi + "','" + this.cb_kode.getText() + "','" + this.e_nama.getText() + "','" + this.e_alamat.getText() + "','" + this.e_coorX.getText() + "','" + this.e_coorY.getText() + "','" + this.cb_prov.getText() + "','" + this.cb_kota.getText() + "','" + this.cb_kec.getText() + "','"+this.cb_desa.getText()+"','"+this.cb_kawas.getText()+"', '"+this.c_sts.getText()+"','"+this.e_ket.getText()+"')"); 

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
									sql.add("insert amu_sertifikat_lahan(no_bukti,kode_lokasi,id_lahan,no_sertifikat,tanggal_terbit,jatuh_tempo,status,nilai_perolehan,cara_perolehan,atas_nama,tanggal_perolehan,luas, no_ajb,tgl_ajb) values "+
											"('"+nb+"','"+this.app._lokasi+"','"+this.cb_kode.getText()+"','"+this.sgm.cells(0,i)+"','"+this.sgm.getCellDateValue(7,i)+"','"+this.sgm.getCellDateValue(8,i)+"','"+this.sgm.cells(4,i)+"',"+nilaiToFloat(this.sgm.cells(6,i))+",'"+this.sgm.cells(3,i)+"','"+this.sgm.cells(1,i)+"','"+this.sgm.getCellDateValue(2,i)+"',"+nilaiToFloat(this.sgm.cells(5,i))+", '"+this.sgm.cells(9,i)+"','"+this.sgm.getCellDateValue(10,i)+"')");
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
									sql.add("insert amu_lahan_sewa(no_bukti, id_lahan, kode_lokasi, mitra, no_pks_ypt, no_pks_mitra, luas, nilai, tgl_mulai, tgl_selesai, keterangan, flag_aktif) values "+
											"('"+nb+"', '"+this.cb_kode.getText()+"', '"+this.app._lokasi+"', '"+this.sgs.cells(1,i)+"', '"+this.sgs.cells(0,i)+"', '"+this.sgs.cells(2,i)+"', "+nilaiToFloat(this.sgs.cells(3,i))+", "+nilaiToFloat(this.sgs.cells(4,i))+", '"+this.sgs.getCellDateValue(5,i)+"', '"+this.sgs.getCellDateValue(6,i)+"', '"+this.sgs.cells(7,i)+"', '1')");
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
			if (this.cb_kode.getText() != "") {
				try {
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from amu_lahan where id_lahan = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"' ");
					if (this.c_sts.getText() == "Milik") sql.add("delete from amu_sertifikat_lahan where id_lahan = '" + this.cb_kode.getText() + "' ");
					else sql.add("delete from amu_lahan_sewa where id_lahan = '" + this.cb_kode.getText() + "' ");						
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0", "1","8"), this.cb_kode);
				setTipeButton(tbAllFalse);	
				this.sgm.clear(1);
				this.sgs.clear(1);							
				this.doLoad();
				this.doTambah();
				break;
			case "simpan":
			case "ubah":
				if (this.stsSimpan == 0 && (this.c_sts.getText() != this.stsLama)) {
					system.alert(this,"Status Lahan tidak sesuai dengan Data yang sudah tersimpan.","Data tidak dapat diubah.");
					return false;
				}
				else this.simpan();
				break;
			case "simpancek": this.simpan();
				break;			
			case "hapus":
				if (this.stsLama != this.c_sts.getText()) {
					system.alert(this,"Status Lahan tidak sesuai dengan Data yang sudah tersimpan.","Data tidak dapat dihapus.");
					return false;
				}
				else this.hapus();
				break;
		}
	},
	doChange: function (sender) {				
		try {
			if (sender == this.cb_kode && this.cb_kode.getText() != "") {
				var strSQL = "select id_lahan,nama_lahan,alamat,coor_x,coor_y,nilai_perolehan,atas_nama,cara_perolehan,id_provinsi,id_kota,id_kecamatan,id_desa,tanggal_perolehan,nop,luas,status_dokumen,keterangan,id_kawasan  "+ //,no_hgb,no_ajb,tgl_hgb,tgl_jt_hgb,tgl_ajb
							 "from amu_lahan where id_lahan ='" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"' ";											 
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_nama.setText(line.nama_lahan);
						this.e_alamat.setText(line.alamat);
						this.cb_prov.setText(line.id_provinsi);
						this.cb_kota.setText(line.id_kota);
						this.cb_kec.setText(line.id_kecamatan);
						this.cb_desa.setText(line.id_desa);
						this.cb_kawas.setText(line.id_kawasan);
						this.c_sts.setText(line.status_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.e_coorX.setText(line.coor_x);
						this.e_coorY.setText(line.coor_y);
						
						this.stsLama = line.status_dokumen;
						this.stsSimpan = 0;
						this.loadDetail();
						setTipeButton(tbUbahHapus);
					}
					else {
						this.stsSimpan = 1;
						this.standarLib.clearByTag(this, new Array("1"), undefined);
						this.sgm.clear(1);
						this.sgs.clear(1);
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
				var strSQL = "select no_sertifikat,atas_nama,convert(varchar,tanggal_perolehan,103) as tgl_oleh,cara_perolehan,status,luas,nilai_perolehan,convert(varchar,tanggal_terbit,103) as tgl_terbit,convert(varchar,jatuh_tempo,103) as jth_tempo,no_ajb, convert(varchar,tgl_ajb,103) as tgl_ajb "+
							 "from amu_sertifikat_lahan where id_lahan='"+this.cb_kode.getText()+"' order by no_bukti";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgm.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sgm.appendData([line.no_sertifikat,line.atas_nama,line.tgl_oleh,line.cara_perolehan,line.status,floatToNilai(line.luas),floatToNilai(line.nilai_perolehan),line.tgl_terbit,line.jth_tempo,line.no_ajb,line.tgl_ajb]);
					}
				} else this.sgm.clear(1);
			}
			else {
				var strSQL = "select no_pks_ypt,mitra,no_pks_mitra,luas,nilai,convert(varchar,tgl_mulai,103) as tgl1,convert(varchar,tgl_selesai,103) as tgl2,keterangan "+
							 "from amu_lahan_sewa where id_lahan='"+this.cb_kode.getText()+"' order by no_bukti";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgs.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						this.sgs.appendData([line.no_pks_ypt,line.mitra,line.no_pks_mitra,floatToNilai(line.luas),floatToNilai(line.nilai),line.tgl1,line.tgl2,line.keterangan]);
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
		var strSQL = "select id_lahan, nama_lahan, alamat from amu_lahan where  kode_lokasi='" + this.app._lokasi + "'";
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
			this.sg1.appendData([line.id_lahan, line.nama_lahan, line.alamat, "Pilih"]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function (sender, page) {
		this.doTampilData(page);
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['id_lahan', 'nama_lahan'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}

			var strSQL = "select id_lahan, nama_lahan, alamat " +
				"from amu_lahan " +
				"where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "' ";
			
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

				var column_array = ['id_lahan', 'nama_lahan', 'alamat'];

				var search = this.e_kode2.getText();
				var filter_string = " (";

				for (var i = 0; i < column_array.length; i++) {

					if (i == (column_array.length - 1)) {
						filter_string += column_array[i] + " like '%" + search + "%' )";
					} else {
						filter_string += column_array[i] + " like '%" + search + "%' or ";
					}
				}

				var strSQL = "select id_lahan, nama_lahan, alamat " +
					"from amu_lahan " +
					"where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "' " +
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