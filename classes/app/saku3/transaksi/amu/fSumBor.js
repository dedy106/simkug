window.app_saku3_transaksi_amu_fSumBor = function (owner) {
	if (owner) {
		window.app_saku3_transaksi_amu_fSumBor.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_amu_fSumBor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick", "Data Sumur Bor Produksi", 0);

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
		this.e_nosumur = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 200, 20], caption: "Nomor Sumur", maxLength: 50, tag: 1 });				
		this.cb_lahan = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 12, 220, 20], caption: "Lahan", maxLength: 20, multiSelection: false,change: [this, "doChange"],rightLabelVisible:false });
		this.e_nosumurlahan = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 11, 450, 20], caption: "Nama Lahan", readOnly:true, tag: 1 });
		this.e_kawas = new saiLabelEdit(this.pc1.childPage[1], { bound: [20, 16, 450, 20], caption: "Kawasan", readOnly:true, tag: 1 });                		
		this.cb_lembaga = new portalui_saiCBBL(this.pc1.childPage[1], { bound: [20, 14, 220, 20], caption: "Lembaga", maxLength: 20, multiSelection: false, tag: 1, change: [this, "doChange"] });				
		this.c_aktif = new saiCB(this.pc1.childPage[1], { bound: [20, 25, 200, 20], caption: "Status Aktif", items: ["1.Aktif", "0.NonAktif"], readOnly: true, tag: 2 , change: [this, "doChange"]});
	
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,996,256], childPage:["Data Sumur 1","Data Sumur 2","Data Sumur 3"]});		
		this.cb_jenis = new portalui_saiCBBL(this.pc2.childPage[0], { bound: [20, 11, 220, 20], caption: "Jenis", maxLength: 20, tag: 2, readOnly:true });				
		this.e_tahun = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 200, 20], caption: "Tahun Pembuatan", maxLength: 5, tag: 2,tipeText:ttAngka });
		this.e_coor = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 450, 20], caption: "Koordinat", maxLength: 50, tag: 1 });		
		this.e_noijin = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 14, 450, 20], caption: "No Ijin (IPAT)", maxLength: 50, tag: 1 });		
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[20,15,100,18],caption:"Jatuh Tempo Ijin", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,15,98,18]}); 		
		this.e_volum = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 16, 200, 20], caption: "Volume NPA", tag: 1, tipeText:ttNilai, text:"0" });		
		this.e_kelompok = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 11, 200, 20], caption: "Kelompok", maxLength: 50, tag: 1 });
		this.e_cekung = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 12, 450, 20], caption: "Cek. Air Tanah", maxLength: 50, tag: 1 });
		this.e_zona = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 13, 200, 20], caption: "Zonasi", maxLength: 50, tag: 1 });		
		this.e_kua = new saiLabelEdit(this.pc2.childPage[0], { bound: [20, 14, 450, 20], caption: "Kualts. Air Tanah", maxLength: 50, tag: 1 });
		
		this.e_dalam = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 15, 200, 20], caption: "Kedalaman Sumur", tag: 1, tipeText:ttNilai, text:"0" });		
		this.e_matpipa = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 16, 450, 20], caption: "Matrl. Pipa Konstrks.", maxLength: 50, tag: 1 });
		this.e_diapipa = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 17, 200, 20], caption: "Dia. Pipa Konstrks.", maxLength: 50, tag: 1 });
		this.e_pjsaring = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 18, 200, 20], caption: "Panjang Saringan", tag: 1, tipeText:ttNilai, text:"0" });
		this.e_possaring = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 19, 450, 20], caption: "Posisi Saringan", maxLength: 50, tag: 1 });
		this.e_diaisap = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 20, 200, 20], caption: "Dia. Pipa Isap", maxLength: 50, tag: 1 });
		this.e_pjpiso = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 21, 200, 20], caption: "Pj. Pipa Pisometer", maxLength: 50, tag: 1 ,tipeText:ttNilai, text:"0"});
		this.e_diapiso = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 22, 200, 20], caption: "Dia. Pipa Pisometer", maxLength: 50, tag: 1 });		
		this.e_mat = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 11, 200, 20], caption: "MAT", tag: 1});
		this.e_pompa = new saiLabelEdit(this.pc2.childPage[1], { bound: [20, 12, 450, 20], caption: "Jenis Pompa", maxLength: 50, tag: 1 });
		
		this.e_kapasitas = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 13, 200, 20], caption: "Kapasitas", tag: 1, tipeText:ttNilai, text:"0" });		
		this.e_posisi = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 14, 200, 20], caption: "Posisi", tag: 1, tipeText:ttNilai, text:"0" });		
		this.e_akifer = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 15, 450, 20], caption: "Jenis Akifer", maxLength: 50, tag: 1 });
		this.e_matsta = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 16, 200, 20], caption: "MAT Statis", tag: 1});
		this.e_matdim = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 17, 200, 20], caption: "MAT Dinamis", tag: 1 });
		this.e_debit = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 18, 200, 20], caption: "Debit Pemompaan", maxLength: 50, tag: 1,tipeText:ttNilai, text:"0" });
		this.e_transmi = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 19, 450, 20], caption: "Transmisivitas", maxLength: 50, tag: 1 });
		this.e_debitambil = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 20, 200, 20], caption: "Debit Pengambilan", maxLength: 50, tag: 1,tipeText:ttNilai, text:"0" });
		this.e_debit2 = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 21, 200, 20], caption: "Debit Pemompaan", maxLength: 50, tag: 1,tipeText:ttNilai, text:"0" });
		this.e_waktu = new saiLabelEdit(this.pc2.childPage[2], { bound: [20, 22, 200, 20], caption: "Waktu Pemompaan", maxLength: 50, tag: 1,tipeText:ttNilai, text:"0" });
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);

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
			this.cb_jenis.setText("03","Sumur Bor Produksi");
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
window.app_saku3_transaksi_amu_fSumBor.extend(window.childForm);
window.app_saku3_transaksi_amu_fSumBor.implement({
	doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		//this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "amu_sumur_bor", "id_sumur",this.cb_jenis.getText() + this.tahun.substr(2,2) + ".", "000"));                    				

		var AddFormat = "__%"+"/03/"+this.tahun;
		var data = this.dbLib.getDataProvider("select isnull(max(id_sumur),0) as id_sumur from amu_sumur_bor where id_sumur like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				if (line.id_sumur == "0") this.cb_kode.setText("01"+"/03/"+this.tahun);
				else {
					var idx = parseFloat(line.id_sumur.substr(0,2)) + 1;
					idx = idx.toString();					
					if (idx.length == 1) var nu = "0"+idx;
					if (idx.length == 2) var nu = idx;
					this.cb_kode.setText(nu+"/03/"+this.tahun);						
				}
			} 
		}

		this.e_nosumur.setFocus();     																	
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
						sql.add("delete from amu_sumur_bor where id_sumur = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");						
					}

					sql.add("insert into amu_sumur_bor (id_jenis_sumur,tahun,kode_lokasi,id_sumur,id_lahan,id_lembaga,flag_aktif,nomor_sumur,koordinat,no_ijin,volume,kelompok,cek_air,zonasi,kualitas,dalam,material_pipa,dia_pipa,pj_saring,pos_saring,dia_isap,pj_piso,dia_piso,mat,pompa,kapasitas,posisi,akifer,mat_statis,mat_dinamis,debit_pompa,transmisivitas,debit_ambil,debit_pompa2,waktu_pompa,jt_ijin,tgl_input,nik_user) values "+
							"('"+this.cb_jenis.getText()+"','"+this.e_tahun.getText()+"','"+this.app._lokasi+"','"+this.cb_kode.getText()+"','"+this.cb_lahan.getText()+"','"+this.cb_lembaga.getText()+"','1','"+this.e_nosumur.getText()+"','"+this.e_coor.getText()+"','"+this.e_noijin.getText()+"',"+nilaiToFloat(this.e_volum.getText())+",'"+this.e_kelompok.getText()+"','"+this.e_cekung.getText()+"','"+this.e_zona.getText()+"','"+this.e_kua.getText()+"',"+nilaiToFloat(this.e_dalam.getText())+
							",'"+this.e_matpipa.getText()+"','"+this.e_diapipa.getText()+"','"+this.e_pjsaring.getText()+"','"+this.e_possaring.getText()+"','"+this.e_diaisap.getText()+"','"+this.e_pjpiso.getText()+"','"+this.e_diapiso.getText()+"','"+this.e_mat.getText()+"','"+this.e_pompa.getText()+"',"+nilaiToFloat(this.e_kapasitas.getText())+","+nilaiToFloat(this.e_posisi.getText())+",'"+this.e_akifer.getText()+"','"+this.e_matsta.getText()+
							"','"+this.e_matdim.getText()+"',"+nilaiToFloat(this.e_debit.getText())+",'"+this.e_transmi.getText()+"',"+nilaiToFloat(this.e_debitambil.getText())+","+nilaiToFloat(this.e_debit2.getText())+","+nilaiToFloat(this.e_waktu.getText())+",'"+this.dp_d1.getDateString()+"',getdate(),'"+this.app._userLog+"')");
					
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
					sql.add("delete from amu_sumur_bor where id_sumur = '" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'");						
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
				this.pc2.setActivePage(this.pc2.childPage[0]);
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
				var strSQL = "select * from amu_sumur_bor where id_sumur ='" + this.cb_kode.getText() + "' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_nosumur.setText(line.nomor_sumur);
						this.cb_lahan.setText(line.id_lahan);						
						this.cb_lembaga.setText(line.id_lembaga);						
						if (line.flag_aktif == "0") this.c_aktif.setText("0.NonAktif");
						else this.c_aktif.setText("1.Aktif");
						this.e_tahun.setText(line.tahun);
						this.e_coor.setText(line.koordinat);

						this.e_noijin.setText(line.no_ijin);
						this.dp_d1.setText(line.jt_ijin);
						this.e_volum.setText(floatToNilai(line.volume));
						this.e_kelompok.setText(line.kelompok);
						this.e_cekung.setText(line.cek_air);
						this.e_zona.setText(line.zonasi);
						this.e_kua.setText(line.kualitas);
						
						this.e_dalam.setText(floatToNilai(line.dalam));
						this.e_matpipa.setText(line.material_pipa);
						this.e_diapipa.setText(line.dia_pipa);
						this.e_pjsaring.setText(line.pj_saring);
						this.e_possaring.setText(line.pos_saring);
						this.e_diaisap.setText(line.dia_isap);
						this.e_pjpiso.setText(line.pj_piso);
						this.e_diapiso.setText(line.dia_piso);
						this.e_mat.setText(line.mat);
						this.e_pompa.setText(line.pompa);
						
						this.e_kapasitas.setText(floatToNilai(line.kapasitas));
						this.e_posisi.setText(floatToNilai(line.posisi));
						this.e_akifer.setText(line.akifer);
						this.e_matsta.setText(line.mat_statis);
						this.e_matdim.setText(line.mat_dinamis);
						this.e_debit.setText(floatToNilai(line.debit_pompa));
						this.e_transmi.setText(line.transmisivitas);
						this.e_debitambil.setText(floatToNilai(line.debit_ambil));
						this.e_debit2.setText(floatToNilai(line.debit_pompa2));
						this.e_waktu.setText(floatToNilai(line.waktu_pompa));
						
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
						this.e_nosumurlahan.setText(line.nama_lahan);
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
		var strSQL = "select a.id_sumur, a.nomor_sumur, a.no_ijin, b.nama_lahan from amu_sumur_bor a inner join amu_lahan b on a.id_lahan=b.id_lahan where a.kode_lokasi='" + this.app._lokasi + "'";
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
			this.sg1.appendData([line.id_sumur, line.nomor_sumur, line.nama_lahan, line.no_ijin, "Pilih"]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function (sender, page) {
		this.doTampilData(page);
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['a.id_sumur', 'a.nomor_sumur', 'b.nama_lahan', 'a.no_ijin'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}

			var strSQL = "select a.id_sumur, a.nomor_sumur, b.nama_Lahan, a.no_ijin " +
				"from amu_sumur_bor a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
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

				var column_array = ['a.id_sumur', 'a.nomor_sumur', 'b.nama_lahan', 'a.no_ijin'];

				var search = this.e_kode2.getText();
				var filter_string = " (";

				for (var i = 0; i < column_array.length; i++) {

					if (i == (column_array.length - 1)) {
						filter_string += column_array[i] + " like '%" + search + "%' )";
					} else {
						filter_string += column_array[i] + " like '%" + search + "%' or ";
					}
				}

				var strSQL = "select a.id_sumur, a.nomor_sumur, b.nama_lahan, a.no_ijin " +
					"from amu_sumur_bor a inner join amu_lahan b on a.id_lahan=b.id_lahan " +
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