/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fVerifikasi = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fVerifikasi.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fVerifikasi";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Verifikasi Final Hasil Inventarisasi", 0);	
		uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox");
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Rekon",readOnly:true});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Area Bisnis",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel: this.app._namaLokfa,
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]
		});
		this.ed_jenis = new saiCB(this,{bound:[20,1,200,20], caption:"Jenis", items:["TB","NTB"]});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pemeriksa",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});
		this.ed_nik2 = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "Disetujui",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});							
		this.ed_nik3 = new saiCBBL(this, {
			bound: [20, 5, 200, 20],
			caption: "Disetujui",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});							
		this.ed_ket = new saiMemo(this, {
			bound: [20, 9, 500, 50],
			caption: "Keterangan",
			maxLength: 150
		});
		this.bTampil = new button(this, {
			bound: [20, 10, 80, 20],
			caption: "Tampil",
			click:[this,"doTampil"]
		});
		this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 29,
			colTitle: ["No Gabung","No Asset", "SN", "Jenis Asset", "Deskripsi Asset",  "Alamat Asset", "Cap Date", "Harga Perolehan", "Akm. Penyusutan", "Nilai Buku","Jumlah Fisik SAP", "Jml Fisik Lap.", "Label","Status","Ket. Status","Update Lokasi","Keterangan","Tgl Invet.","KKIL = KKP","Asset tercatat per Count Date","Selisih","Ket. Selisih","Tindak Lanjut","Update Deskripsi","Update BA","Update UBIS","Status Final","Cara Verifikasi","Tindak Lanjut"],
			colWidth: [[28,26,27,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [250,250,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 100, 80, 200, 80, 50, 80, 150]],
			colReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],[]],
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9,
			buttonStyle:[[0,18,19],[bsEllips, bsAuto, bsAuto]],
			colHint:[[19],["Asset tercatat diSAP per count date"]],
			colFormat:[[7,8,9],[cfNilai, cfNilai, cfNilai]],
			picklist:[[18,19],[new arrayMap({items:['YA', 'Tidak']}),new arrayMap({items:['YA', 'Tidak']})]]
		});		
		this.sgn = new sgNavigator(this.p1, {
			bound: [1, this.p1.height - 25, 898, 25],
			buttonStyle: 3,
			grid: this.sg,
			pager:[this,"doPager"]
		});
		this.rearrangeChild(10,23);			
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);					
		this.onClose.set(this,"doClose");
	}
};
window.app_assetsap_transaksi_fVerifikasi.extend(window.childForm);
window.app_assetsap_transaksi_fVerifikasi.implement({
	doClose: function(sender){				
	},
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
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sg.clear(1);
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						sql.add("insert into amu_ver_m (no_ver,kode_lokasi, kode_lokfa, tanggal, nik_user, tgl_input, jenis)"+
							" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.app._userLog+"',now(),'"+this.ed_jenis.getText()+"' )");
						var line;
						for (var i in this.dataAsset.rs.rows){
							line = this.dataAsset.rs.rows[i];							
							sql.add("insert into amu_ver_d (no_ver, kode_lokasi, no_gabung, status_final, verifikasi, tindak_lanjut) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+line.no_gabung+"' ,'"+line.status_final+"','"+line.verifikasi+"', '"+line.tindak_lanjut+"') ");
						}
						this.dbLib.execArraySQL(sql);
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){		
	},
	doChange: function(sender){
		if (sender == this.ed_lokfa){
			this.sg.clear(1);			
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
			this.ed_nik2.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
			this.ed_nik3.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
		}		
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_ver_m','no_ver',"VER/"+this.dp_tgl.getYear()+"/",'0000'));
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();							                                                       
						}else system.info(this,result,"");
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	        
        }
	},	
	doGridChange: function(sender, col, row,param1,result, data){
		if (col > 25) {
			this.dataAsset.rs.rows[this.start + row][this.dataColumn[col - 26]] = sender.cells(col, row);			
		}
    },
	doTampil: function(sender){
		try {
			var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, a.jenis, a.nama, a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik, a.alamat " +
			" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, b.ket_status, b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal " +
			" ,	d.info_kkp, d.status_asset, d.selisih, d.penjelasan, d.tindakan, d.keterangan, d.lokasi, d.ba "+
			" , '-' as status_final, '-' as verifikasi, '-' as tindak_lanjut "+
			" from amu_asset a " +
			"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv " +
			" 	inner join amu_rekon_d d on d.no_gabung = a.no_gabung "+
			" where a.kode_lokasi = '" +this.app._lokasi +"' and a.jenis = '"+this.ed_jenis.getText()+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ", true);
			if (typeof data != "string") {
				this.dataAsset = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / 50));
				this.sgn.rearrange();
				this.doLoadData(1);
				
				this.dataColumn = ['status_final','verifikasi','tindak_lanjut'];
				
			}
			else 
				systemAPI.alert(data);
		}catch(e){
			alert(e);
			
		}		
	},
	doPager: function(sender, page){
		this.doLoadData(page);
	},
	doLoadData: function(page){
		try {
			var line;
			this.sg.clear();
			var start = (page - 1) * 50;
			var finish = start + 50;
			if (finish > this.dataAsset.rs.rows.length) 
				finish = this.dataAsset.rs.rows.length;								
			for (var i = start; i < finish; i++) {
				line = this.dataAsset.rs.rows[i];						
				this.sg.appendData([line.no_gabung, line.no_fa, line.no_sn, line.jenis, line.nama, line.alamat, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), line.jml_fisik, line.jmlfisik_lap, line.no_label, line.kode_status, line.ket_status, 
					line.almt, line.keterangan, line.tanggal, line.info_kkp, line.status_asset, line.selisih, line.penjelasan, line.tindakan, line.keterangan, line.lokasi,line.ba, line.status_final, line.verifikasi, line.tindak_lanjut]);
			}	
			this.start = start;		
		}catch(e){
			alert(e);
		}
	}	
});
