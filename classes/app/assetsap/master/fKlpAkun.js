/**
 * @author dweexfuad
 */
window.app_assetsap_master_fKlpAkun = function(owner){
	if (owner){
		window.app_assetsap_master_fKlpAkun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fKlpAkun";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Akun", 0);
		uses("saiCBBL");
		this.edkd = new saiCBBL(this, {
			bound: [20, 10, 200, 20],
			caption: "Kode Klp Akun",
			multiSelection: false,
			sql : ["select kode_klpakun, nama from amu_klpakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_klpakun","nama"],false, ["Kode","Nama"],"and","Data Kelompok Akun Asset",false],
			change:[this,"doChange"]
		});
		this.edNama = new saiLabelEdit(this, {
			bound: [20,11,500,20],
			caption:"Nama"
		});
		this.edUmur = new saiLabelEdit(this, {
			bound: [20, 12, 200, 20],
			caption: "Umur",
			tipeText: ttNilai
		});
		this.edPersen = new saiLabelEdit(this, {
			bound: [20, 13, 200, 20],
			caption: "Persen",
			tipeText:ttNilai
		});
		this.edAkun = new saiCBBL(this, {
			bound: [20, 14, 200, 20],
			caption: "Kode Akun",
			multiSelection:false,
			sql: ["select kode_akun, nama from amu_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Master Akun",true]
		});
		this.edBp = new saiCBBL(this, {
			bound: [20, 15, 200, 20],
			caption: "Akun BP",
			multiSelection:false,
			sql: ["select kode_akun, nama from amu_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Master Akun",true]
		});
		this.edDeprs = new saiCBBL(this, {
			bound: [20, 16, 200, 20],
			caption: "Akun Deprs",
			multiSelection:false,
			sql: ["select kode_akun, nama from amu_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Master Akun",true]
		});
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);		
		this.rearrangeChild(10,23);
		setTipeButton(tbAllFalse)
	}
};
window.app_assetsap_master_fKlpAkun.extend(childForm);
window.app_assetsap_master_fKlpAkun.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, result){
		try {
			if (result != mrOk) return false;
			var sql = new server_util_arrayList();			
			switch (event){
				case "simpan":
					sql.add("insert into amu_klpakun (kode_klpakun, kode_lokasi, nama, umur, persen, kode_akun, akun_bp, akun_deprs)values "+
						"('"+this.edkd.getText()+"','"+this.app._lokasi+"', '"+this.edNama.getText()+"', '"+parseNilai(this.edUmur.getText())+"', '"+parseNilai(this.edPersen.getText())+"', '"+this.edAkun.getText()+"','"+this.edBp.getText()+"', '"+this.edDeprs.getText()+"')");
				break;
				case "ubah":
					sql.add("update  amu_klpakun set nama= '"+this.edNama.getText()+"', umur = '"+parseNilai(this.edUmur.getText())+"', persen='"+parseNilai(this.edPersen.getText())+"' "+
						", kode_akun = '"+this.edAkun.getText()+"', akun_bp = '"+this.edBp.getText()+"', akun_deprs='"+this.edDeprs.getText()+"' "+
						" where kode_klpakun = '"+this.edkd.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				break;
				case "hapus":
					sql.add("delete amu_klpakun where kode_lokasi ='"+this.app._lokasi+"' and kode_klpakun = '"+this.edkd.getText()+"' ");
				break;
				case "clear":
					this.edkd.clear();
				break;							
			}
			if (sql.getLength() > 0) this.dbLib.execArraySQL(sql);
		}catch (e) {
		
		}
	},
	doChange: function(sender){
		if (sender == this.edkd){
			var data = this.dbLib.getDataProvider("select * from amu_klpakun where kode_klpakun = '"+this.edkd.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data != "string") {
				if (data.rs.rows[0] != undefined) {
					var line = data.rs.rows[0];
					this.edNama.setText(line.nama);
					this.edUmur.setText(line.umur);
					this.edPersen.setText(line.persen);
					this.edAkun.setText(line.kode_akun);
					this.edBp.setText(line.akun_bp);
					this.edDeprs.setText(line.akun_deprs);
					setTipeButton(tbUbahHapus);
				}else 
					setTipeButton(tbSimpan);
			}else {				
				setTipeButton(tbSimpan);
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			if (result.search("error") == -1){
				system.info(this, "Data berhasil disimpan","");
			}else {
				systemAPI.alert("Transaksi Gagal ",result);
			}
		}
	}
});
