/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fRekonK = function(owner) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fRekonK.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fRekonK";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","KKP (Rekonsiliasi Hasil Inventarisasi)(Koreksi)", 0);	
			uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox");
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
			this.ed_kode = new saiCBBL(this,{bound:[20,2,200,20],caption:"No Rekon",readOnly:true, multiSelection:false,
				change:[this,"doChange"],
				sql:["select a.no_rekon, a.kode_lokfa, b.nama from amu_rekon_m a inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa "+
					"where a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["no_rekon","kode_lokfa","nama"],false, ["No Rekon","Bus Area","Nama"],"where","Daftar Rekon/KKP", true]
				
			});
			this.ed_lokfa = new saiCBBL(this, {
				bound: [20, 30, 200, 20],
				caption: "Area Bisnis",
				multiSelection: false,
				text:this.app._kodeLokfa,
				rightLabel: this.app._namaLokfa,
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'UBIS' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
				change:[this,"doChange"]
			});
			this.ed_jenis = new saiCB(this,{bound:[20,1,200,20], caption:"Jenis", items:["TB","NTB"], change:[this,"doChange"]});
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 200, 20],
				caption: "Officer",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});
			this.ed_nik2 = new saiCBBL(this, {
				bound: [20, 4, 200, 20],
				caption: "Pemeriksa",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});							
			this.ed_nik3 = new saiCBBL(this, {
				bound: [20, 5, 200, 20],
				caption: "Disetujui",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});							
			
			this.bTampil = new button(this, {
				bound: [800, 5, 80, 20],
				caption: "Tampil",
				click:[this,"doTampil"]
			});
			this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
			this.sg = new saiGrid(this.p1, {
				bound: [1, 20, 898, 180],
				colCount: 32,			
				colTitle: "No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status,Update Deskripsi,Update Alamat/Lokasi,Keterangan,Tgl Invet., No KKIL,KKIL = KKP,Asset tercatat per Count Date,Selisih,Ket. Selisih,Tindak Lanjut,Update Deskripsi,Update BA,Update UBIS,Status Final, Cara Verifikasi, Tindak Lanjut(Final)",
				colWidth: [[31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
						   [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 100, 80, 200, 80, 50, 80, 150]],				
				change: [this, "doGridChange"],
				rowCount: 1,
				tag: 9,
				buttonStyle:[[0,18,19],[bsEllips, bsAuto, bsAuto]],
				colHint:[[19],["Asset tercatat diSAP per count date"]],
				colFormat:[[7,8,9],[cfNilai, cfNilai, cfNilai]],
				ellipsClick: [this,"doEllipsClick"],
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
			this.doChange(this.ed_jenis);				
			this.onClose.set(this,"doClose");			
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fRekonK.extend(window.childForm);
window.app_assetsap_transaksi_fRekonK.implement({
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
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){					
						sql.add("update amu_rekon_m set tanggal = '"+this.dp_tgl.getDateString()+"', nik_app1 = '"+this.ed_nik1.getText()+"', nik_app2 = '"+this.ed_nik1.getText()+"', nik_app3 = '"+this.ed_nik1.getText()+"')"+
							" where no_rekon = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("delete from amu_rekon_d where no_rekon = '"+this.ed_kode.getText()+"' ");
						var line, nka, listnka = new arrayMap();
						for (var i in this.dataAsset.rs.rows){
							line = this.dataAsset.rs.rows[i];
							if (nka != line.no_gabung){								
								nka = line.no_gabung;
								listnka.set(nka, 99);
								status = 99;
							}
							if (line.statusfinal != "-" && status > parseFloat(line.statusfinal) ) status = parseFloat(line.statusfinal);
							listnka.set(nka, status);							
							sql.add("insert into amu_rekon_d (no_rekon, kode_lokasi, no_gabung, no_label, info_kkp, status_asset, selisih, penjelasan, tindakan, keterangan, ba,lokasi, status_final, verifikasi, tindakan2, periode) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+line.no_gabung+"','"+line.no_label+"' ,'"+line.kkil+"','"+line.pcd+"', '"+line.slsh+"','"+line.ket+"','-','"+line.updesk+"' ,'"+line.upba+"','"+line.uplokasi+"','"+line.statusfinal+"','"+line.crverify+"','"+line.lanjutan2+"','"+this.app._periode+"') ");
						}
						for (var i in listnka.objList){
							sql.add("update amu_rekon_d set status_nka = '"+listnka.get(i)+"' where no_gabung = '"+i+"' and periode = '"+this.app._periode+"' ");
						}
						this.dbLib.execArraySQL(sql);
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					sql.add("delete from amu_rekon_d where no_rekon = '"+this.ed_kode.getText()+"' ");
					sql.add("delete from amu_rekon_m where no_rekon = '"+this.ed_kode.getText()+"' ");
					this.dbLib.execArraySQL(sql);
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
		try{
			if (sender == this.ed_kode){
				this.ed_lokfa.onChange.set(this,undefined);				
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:["select a.kode_lokfa, a.jenis, date_format(a.tanggal, '%d-%m-%Y') as tgl, a.nik_app1, a.nik_app2, a.nik_app3 "+
					" from amu_rekon_m a "+
					" where a.no_rekon = '"+sender.getText()+"' ",
					"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, e.no_bukti  " +
					" ,	ifnull(g.info_kkp,'YA') as kkil, ifnull(g.status_asset,'YA') as pcd, ifnull(g.selisih,case when j.jenis = 'TB' then 0 else a.jml_fisik - b.jml_fisik end) as slsh "+
					" , ifnull(g.penjelasan,'-') as ket, ifnull(g.keterangan,b.nama) as updesk, ifnull(g.lokasi,b.alamat) as uplokasi, ifnull(g.ba,'-') as upba, ifnull(g.status_final,b.kode_status) as statusfinal, ifnull(g.verifikasi,'-') as crverify, ifnull(g.tindakan2,'-') as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv and c.jenis = '"+this.ed_jenis.getText()+"' " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi "+
					"	inner join amu_lokasi i on i.kode_lokfa = h.kode_induk and i.kode_lokasi = a.kode_lokasi and i.kode_induk = '00' "+					
					"	inner join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode and g.no_label = b.no_label and g.no_rekon = '"+sender.getText()+"' "+
					"	inner join amu_rekon_m j on j.no_rekon = g.no_rekon "+
					" where a.kode_lokasi = '" +this.app._lokasi +"' and c.progress = '3' and a.periode = '"+this.app._periode+"' and i.kode_lokfa = j.kode_lokfa "+
					" union "+
					"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, e.no_bukti  " +
					" ,	ifnull(g.info_kkp,'YA') as kkil, ifnull(g.status_asset,'YA') as pcd, ifnull(g.selisih,case when j.jenis = 'TB' then 0 else a.jml_fisik - b.jml_fisik end) as slsh "+
					" , ifnull(g.penjelasan,'-') as ket, ifnull(g.keterangan,b.nama) as updesk, ifnull(g.lokasi,b.alamat) as uplokasi, ifnull(g.ba,'-') as upba, ifnull(g.status_final,b.kode_status) as statusfinal, ifnull(g.verifikasi,'-') as crverify, ifnull(g.tindakan2,'-') as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv and c.jenis = '"+this.ed_jenis.getText()+"' " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi and h.kode_induk = '00' "+
					"	inner join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode and g.no_label = b.no_label and g.no_rekon = '"+sender.getText()+"' "+
					"	inner join amu_rekon_m j on j.no_rekon = g.no_rekon "+
					" where  a.kode_lokasi = '" +this.app._lokasi +"' and c.progress = '3' and a.periode = '"+this.app._periode+"'  and h.kode_lokfa = j.kode_lokfa "
					]}),true);
				var line = data.result[0].rs.rows[0];
				this.ed_lokfa.setText(line.kode_lokfa);
				this.dp_tgl.setText(line.tgl);
				this.ed_nik1.setText(line.nik_app1);
				this.ed_nik2.setText(line.nik_app2);
				this.ed_nik3.setText(line.nik_app3);
				
				this.dataAsset = data.result[1];					
				//alert(this.dataAsset.rs.rows.length);
				this.doLoadData(1);
				this.dataColumn = ['kkil','pcd','slsh','ket','updesk','uplokasi','upba','statusfinal','crverify','lanjutan2'];
				this.sgn.setTotalPage(Math.ceil(this.dataAsset.rs.rows.length / 30));
				this.sgn.rearrange();				
				this.ed_lokfa.onChange.set(this,"doChange");
			}
			if (sender == this.ed_lokfa){
				this.sg.clear(1);			
				this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
				this.ed_nik2.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
				this.ed_nik3.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);				
			}
			if (sender == this.ed_jenis){				
				this.sg.clear();
				if (this.ed_jenis.getText() == "TB"){				
					this.sg.setColCount(32);
					this.sg.setColTitle("No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status,No Sertifikat, Luas, Update Deskripsi, Update Lokasi/Alamat,Keterangan,No KKIL,Tgl Invet.,KKIL = KKP,Asset tercatat per Count Date,Selisih,Penj. Selisih,Update Deskripsi Aset,Update Lokais/Alamat,Update BA,Status Final, Cara Verifikasi, Tindak Lanjut(Final)");
					this.sg.setColWidth([31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
							   [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 200, 200, 80, 80, 50, 80, 150]);
					this.sg.setPickList([22,23],[new arrayMap({items:["YA","TIDAK"]}),new arrayMap({items:["YA","TIDAK"]})]);
					this.sg.setButtonStyle([22,23, 29 ],[bsAuto, bsAuto, bsEllips]);
					this.statusFinal = 29;
					this.sg.setReadOnly([],[]);
				}else {
					this.sg.setColCount(30);
					this.sg.setColTitle("No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status, Update Deskripsi, Update Lokasi/Alamat,Keterangan,No KKIL,Tgl Invet.,KKIL = KKP,Asset tercatat per Count Date,Selisih,Penj. Selisih,Update Deskripsi Aset,Update Lokais/Alamat,Update BA,Status Final, Cara Verifikasi, Tindak Lanjut(Final)");
					this.sg.setColWidth([29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
							   [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 200, 200, 80, 80, 50, 80, 150]);
					this.sg.setPickList([21,22],[new arrayMap({items:["YA","TIDAK"]}),new arrayMap({items:["YA","TIDAK"]})]);
					this.sg.setButtonStyle([21,22,27],[bsAuto, bsAuto, bsEllips]);
					this.statusFinal = 27;
				}			
				this.sg.clear(1);
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_rekon_m','no_rekon',"RKN/"+this.dp_tgl.getYear()+"/",'00000'));
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
		if (this.ed_jenis.getText() == "TB"){
			if (col > 21) this.dataAsset.rs.rows[this.start + row][this.dataColumn[col - 22]] = sender.cells(col, row);						
		}else if (col > 19) this.dataAsset.rs.rows[this.start + row][this.dataColumn[col - 20]] = sender.cells(col, row);						
    },
	doTampil: function(sender){
		try {			
			var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
			" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, e.no_bukti  " +
			" ,	'YA' as kkil, 'YA' as pcd, case when '"+this.ed_jenis.getText()+"' = 'TB' then 0 else a.jml_fisik - b.jml_fisik end as slsh, '-'as ket, b.nama as updesk, b.alamat as uplokasi, '-' as upba, b.kode_status as statusfinal, '-' as crverify, '-' as lanjutan2 "+
			" from amu_asset a " +
			"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and c.jenis = '"+this.ed_jenis.getText()+"' " +
			"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
			"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
			"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
			"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi "+
			"	inner join amu_lokasi i on i.kode_lokfa = h.kode_induk and i.kode_lokasi = a.kode_lokasi and i.kode_induk = '00' "+
			"	left outer join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode "+
			" where g.no_gabung is null and a.kode_lokasi = '" +this.app._lokasi +"' and c.progress = '3' and a.periode = '"+this.app._periode+"' and c.jenis = '"+this.ed_jenis.getText()+"' and i.kode_lokfa = '"+this.ed_lokfa.getText()+"' "+
			" union "+
			"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
			" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, e.no_bukti  " +
			" ,	'YA' as kkil, 'YA' as pcd, case when '"+this.ed_jenis.getText()+"' = 'TB' then 0 else a.jml_fisik - b.jml_fisik end as slsh, '-'as ket, b.nama as updesk, b.alamat as uplokasi, '-' as upba, b.kode_status as statusfinal, '-' as crverify, '-' as lanjutan2 "+
			" from amu_asset a " +
			"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and c.jenis = '"+this.ed_jenis.getText()+"' " +
			"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
			"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
			"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
			"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi and h.kode_induk = '00' "+
			"	left outer join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode "+
			" where g.no_gabung is null and a.kode_lokasi = '" +this.app._lokasi +"' and c.progress = '3' and a.periode = '"+this.app._periode+"' and c.jenis = '"+this.ed_jenis.getText()+"' and h.kode_lokfa = '"+this.ed_lokfa.getText()+"' ", true);
			
			if (typeof data != "string") {
				this.dataAsset = data;
				this.doLoadData(1);
				this.dataColumn = ['kkil','pcd','slsh','ket','updesk','uplokasi','upba','statusfinal','crverify','lanjutan2'];
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / 30));
				this.sgn.rearrange();
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
				//colTitle: "No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status,Ket. Status,Update Lokasi,Keterangan,Tgl Invet., No KKIL,KKIL = KKP,Asset tercatat per Count Date,Selisih,Ket. Selisih,Tindak Lanjut,Update Deskripsi,Update BA,Update UBIS,Status Final, Cara Verifikasi, Tindak Lanjut(Final)",
				if (this.ed_jenis.getText() == "TB") {
					this.sg.appendData([line.no_gabung, line.no_fa, line.no_sn, line.kode_klpakun, line.kode_klpfa, line.nama, line.nama2, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), floatToNilai(line.jml_fisik), floatToNilai(line.jmlfisik_lap), line.no_label, line.kode_status, line.no_sertifikat, floatToNilai(line.luas), line.desk, line.almt, line.keterangan, line.no_bukti,  line.tanggal, line.kkil, line.pcd, line.slsh, line.ket, line.updesk, line.uplokasi, line.upba, line.statusfinal, line.crverify, line.lanjutan2]);
				} else 
					this.sg.appendData([line.no_gabung, line.no_fa, line.no_sn, line.kode_klpakun, line.kode_klpfa, line.nama, line.nama2, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), floatToNilai(line.jml_fisik), floatToNilai(line.jmlfisik_lap), line.no_label, line.kode_status, line.desk, line.almt, line.keterangan,  line.no_bukti, line.tanggal,line.kkil, line.pcd, line.slsh, line.ket,line.updesk, line.uplokasi,line.upba,  line.statusfinal, line.crverify, line.lanjutan2]);
			}	
			this.start = start;		
		}catch(e){
			alert(e);
		}
	},
	doEllipsClick:function(sender, col ,row){		
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Asset SAP",this.sg, this.sg.row, this.sg.col, 
								"select a.no_gabung, a.no_fa, a.no_sn, a.nama from amu_asset a "+
								" inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
								" where a.periode = '"+this.app._periode+"'  and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ",
								"select count(*) from amu_asset a "+
								" inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
								" where a.periode = '"+this.app._periode+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ",
								["a.no_gabung","a.nama"],"and",["ID gabung","No Kartu Asset","No SN","Deskripsi Asset"],false);
					break;				
				case this.statusFinal :
					this.standarLib.ListDataSGFilter(this, "Daftar Status Aset",this.sg, this.sg.row, this.sg.col, 
						  "select kode_status, nama from amu_status where jenis= '"+this.ed_jenis.getText()+"'",
						  "select count(kode_status)  from amu_status where jenis= '"+this.ed_jenis.getText()+"' ",
						  ["kode_status","nama"],"where",["Kode Status","Nama"],false);
				break;
			}	
	}
});
