/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fRekon = function(owner) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fRekon.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fRekon";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","KKP Rekonsiliasi Hasil Inventarisasi", 0);	
			uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox;app_assetsap_transaksi_fSvrUpload");
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
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'UBIS' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
				change:[this,"doChange"]
			});
			this.ed_jenis = new saiCB(this,{bound:[20,1,180,20], caption:"Jenis", items:["TB","NTB"], change:[this,"doChange"]});
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 200, 20],
				caption: "Pembuat",
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
			this.bDownload = new button(this, {
				bound: [600, 5, 80, 20],
				caption: "Download KKP",
				click:[this,"doTampil"]
			});
			
			this.upl_2 = new uploader(this,{bound:[700,5,80,20], param3:"object",param2 :"server/tmp/", param1 : "uploadTo",
					autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Upload KKP"});					
			this.bTampil = new button(this, {
				bound: [800, 5, 80, 20],
				caption: "Tampil",
				click:[this,"doTampil"]
			});
			this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
			this.sg = new saiGrid(this.p1, {
				bound: [1, 20, 898, 180],
				colCount: 31,			
				colTitle: "No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status,Update Deskripsi,Update Alamat/Lokasi,Keterangan,Tgl Invet., No KKIL,Asset tercatat per Count Date,Selisih,Ket. Selisih,Tindak Lanjut,Update Deskripsi,Update BA,Update UBIS,Status Final, Cara Verifikasi, Tindak Lanjut(Final)",
				colWidth: [[30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
						   [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 100, 80, 200, 80, 50, 80, 150]],				
				change: [this, "doGridChange"],
				rowCount: 1,
				tag: 9,
				buttonStyle:[[0,18],[bsEllips, bsAuto]],
				colHint:[[19],["Asset tercatat diSAP per count date"]],
				colColor:[[18,19,20,21,22,23,24,25,26,27,28,29,30],['#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c','#6ff66c']],
				colFormat:[[8,9,10],[cfNilai, cfNilai, cfNilai]],
				ellipsClick: [this,"doEllipsClick"],
				picklist:[[18],[new arrayMap({items:['YA', 'Tidak']})]]
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
			this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
			this.svrUpload.addListener(this);
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.fileUtil.getRootDirA();						
			setTipeButton(tbSimpan);			
			this.doChange(this.ed_jenis);				
			this.onClose.set(this,"doClose");
			this.doClick();
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fRekon.extend(window.childForm);
window.app_assetsap_transaksi_fRekon.implement({
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
						sql.add("insert into amu_rekon_m (no_rekon,kode_lokasi, kode_lokfa, tanggal, nik_user, tgl_input, jenis, nik_app1, nik_app2, nik_app3, progress)"+
							" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.app._userLog+"',now(),'"+this.ed_jenis.getText()+"','"+this.ed_nik1.getText()+"','"+this.ed_nik2.getText()+"','"+this.ed_nik3.getText()+"','0' )");
						var line, nka, listnka = new arrayMap();
						var nkatemp = "";
						var status = 99;
						for (var i in this.dataAsset.rs.rows){
							line = this.dataAsset.rs.rows[i];
							nkatemp = nka;							
							if ((trim(line.no_gabung) == "" || trim(line.no_gabung) == "--" || trim(line.no_gabung) == "-") && (trim(nkatemp) != "" && trim(nkatemp) != "-" && trim(nkatemp) != "-")) line.no_gabung = nkatemp;
							
							if (nka != line.no_gabung){
								nka = line.no_gabung;
								listnka.set(nka, 99);
								status = 99;
							}
							
							if (line.statusfinal != "-" && status > parseFloat(line.statusfinal) ) status = parseFloat(line.statusfinal);
							listnka.set(nka, status);
							sql.add("insert into amu_rekon_d (no_rekon, kode_lokasi, no_gabung, no_label, info_kkp, status_asset, selisih, penjelasan, tindakan, keterangan, ba,lokasi, status_final, verifikasi, tindakan2, periode) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+line.no_gabung+"','"+line.no_label+"' ,'YA','"+line.pcd+"', '"+line.slsh+"','"+line.ket+"','-','"+line.updesk+"' ,'"+line.upba+"','"+line.uplokasi+"','"+line.statusfinal+"','"+line.crverify+"','"+line.lanjutan2+"','"+this.app._periode+"') ");
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
			if (sender == this.ed_lokfa){
				this.sg.clear(1);			
				this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
				this.ed_nik2.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
				this.ed_nik3.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);				
			}
			if (sender == this.ed_jenis){				
				this.sg.clear();
				if (this.ed_jenis.getText() == "TB"){				
					this.sg.setColCount(31);
					this.sg.setColTitle("No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status,No Sertifikat, Luas, Update Deskripsi, Update Lokasi/Alamat,Keterangan,No KKIL,Tgl Invet.,Asset tercatat per Count Date,Selisih,Penj. Selisih,Update Deskripsi Aset,Update Lokasi/Alamat,Update BA,Status Final, Cara Verifikasi, Tindak Lanjut(Final)");
					this.sg.setColWidth([30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
							   [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 200, 200, 80, 80, 50, 80, 150]);
					this.sg.setPickList([22],[new arrayMap({items:["YA","TIDAK"]})]);
					this.sg.setButtonStyle([22, 28 ],[bsAuto, bsEllips]);
					this.sg.setColFormat([8,9,10,11],[cfNilai, cfNilai, cfNilai, cfNilai]);
					this.sg.setHeaderColor([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],['#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4']);
					this.statusFinal = 28;
					this.sg.setReadOnly([],[]);
				}else {
					this.sg.setColCount(29);
					this.sg.setColTitle("No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status, Update Deskripsi, Update Lokasi/Alamat,Keterangan,No KKIL,Tgl Invet.,Asset tercatat per Count Date,Selisih,Penj. Selisih,Update Deskripsi Aset,Update Lokasi/Alamat,Update BA,Status Final, Cara Verifikasi, Tindak Lanjut(Final)");
					this.sg.setColWidth([28,27,26,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
							   [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 200, 200, 80, 80, 50, 80, 150]);
					this.sg.setPickList([21],[new arrayMap({items:["YA","TIDAK"]})]);
					this.sg.setButtonStyle([21,27],[bsAuto, bsEllips]);
					this.sg.setColFormat([8,9,10,11],[cfNilai, cfNilai, cfNilai, cfNilai]);					
					this.statusFinal = 26;
					this.sg.setHeaderColor([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],['#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4']);
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
			if (methodName == "getRootDir"){
				this.rootDir = result;			
				this.separator = "/";
				this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);				
			}else alert(result);	
        }else if (sender == this.svrUpload){
			try{
				switch (methodName){
						case "setFile":									
							if (result === undefined) throw("Data tidak bisa dibaca.");
							result = JSON.parse(result);
							this.dataPreparation(result);
							this.sgn.setTotalPage(Math.ceil(result.recCount / 20));
							this.sgn.rearrange();
							//this.tampilGrid(result);
							this.doLoadData(1);
						break;
						case "getData":						
							result = JSON.parse(result);
							this.tampilGrid(result);
						break;									
						case "uploadKKIL":					
							if (this.fromView) {
								this.app._mainForm.pButton.hide();
								this.formView.show();
								this.free();
								this.formView.refresh();
							}else{								
								this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
								this.app._mainForm.bClear.click();
							}
						break;
					}
			}catch(e){
				system.alert(this,e,"Data tidak bisa dibaca.");
			}
		}
	},	
	dataPreparation: function(data){
		this.dataAsset = {rs : {} };
		this.dataAsset.rs.rows = [];
		this.fields = this.ed_jenis.getText() == "TB" ? "no_gabung,no_fa,no_sn,kode_klpakun,kode_klpfa,nama,nama2,tgl_perolehan,nilai,nilai_ap,"+
					  "nilai_buku,jml_fisik,jmlfisik_lap,no_label,kode_status,no_sertifikat,luas,desk,almt,keterangan,no_bukti,tanggal,"+
					  "pcd,slsh,ket,updesk,uplokasi,upba,statusfinal,crverify,lanjutan2" :
					  "no_gabung,no_fa,no_sn,kode_klpakun,kode_klpfa,nama,nama2,tgl_perolehan,nilai,nilai_ap,"+
					  "nilai_buku,jml_fisik,jmlfisik_lap,no_label,kode_status,desk,almt,keterangan,no_bukti,tanggal,"+
					  "pcd,slsh,ket,updesk,uplokasi,upba,statusfinal,crverify,lanjutan2";
		this.fields = this.fields.split(",");
		var row, line, c;
		for (var i in data.rows){
			line = data.rows[i];			
			row = {}, c = 1;
			if (line.no_gabung === undefined && line["no gabung"] === undefined) {
				row.no_gabung = (line.no_fa || line["no kartu"] || line["no. kartu aset"]) + (line.no_sn || line["sn"]);
			}else c = 0;
			for (var j in line){
				row[this.fields[c]]	= line[j];
				c++;
			}
			this.dataAsset.rs.rows[this.dataAsset.rs.rows.length] = row;
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
		if (this.ed_jenis.getText() == "TB"){
			if (col > 21) this.dataAsset.rs.rows[this.start + row][this.dataColumn[col - 22]] = sender.cells(col, row);						
		}else if (col > 19) this.dataAsset.rs.rows[this.start + row][this.dataColumn[col - 20]] = sender.cells(col, row);						
    },
	doTampil: function(sender){
		try {			
			if (sender == this.bDownload){				
				downloadFile(this.dbLib.sqlToXls2("select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan,a.nilai, a.nilai_ap, a.nilai_buku, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, " + (this.ed_jenis.getText() == "TB" ? " b.no_sertifikat, b.luas," :"") +" b.ket_lokasi as desk,b.keterangan, b.alamat as almt, c.no_inv as no_bukti,date_format(c.tanggal,'%d-%m-%Y') as tanggal  " +
					" ,	'YA' as kkil, 'YA' as pcd, case when '"+this.ed_jenis.getText()+"' = 'TB' then 0 else a.jml_fisik - b.jml_fisik end as slsh, '-'as ket, b.nama as updesk, b.alamat as uplokasi, '-' as upba, b.kode_status as statusfinal, '-' as crverify, '-' as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv and c.jenis = '"+this.ed_jenis.getText()+"' " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi "+
					"	inner join amu_lokasi i on i.kode_lokfa = h.kode_induk and i.kode_lokasi = a.kode_lokasi and i.kode_induk = '00' "+
					"	left outer join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode "+
					" where g.no_gabung is null and a.kode_lokasi = '" +this.app._lokasi +"' and c.progress = '2' and a.periode = '"+this.app._periode+"' and c.jenis = '"+this.ed_jenis.getText()+"' and i.kode_lokfa = '"+this.ed_lokfa.getText()+"' "+
					" union "+
					"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan,a.nilai, a.nilai_ap, a.nilai_buku,  a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, " + (this.ed_jenis.getText() == "TB" ? " b.no_sertifikat, b.luas," :"") +" b.ket_lokasi as desk,b.alamat as almt, b.keterangan, c.no_inv as no_bukti,date_format(c.tanggal,'%d-%m-%Y') as tanggal  " +
					" ,	'YA' as kkil, 'YA' as pcd, case when '"+this.ed_jenis.getText()+"' = 'TB' then 0 else a.jml_fisik - b.jml_fisik end as slsh, '-'as ket, b.nama as updesk, b.alamat as uplokasi, '-' as upba, b.kode_status as statusfinal, '-' as crverify, '-' as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv and c.jenis = '"+this.ed_jenis.getText()+"' " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi and h.kode_induk = '00' "+
					"	left outer join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode "+
					" where g.no_gabung is null and a.kode_lokasi = '" +this.app._lokasi +"' and c.progress = '2' and a.periode = '"+this.app._periode+"' and c.jenis = '"+this.ed_jenis.getText()+"' and h.kode_lokfa = '"+this.ed_lokfa.getText()+"' ",						
						(this.ed_jenis.getText() == "NTB" ? new server_util_arrayList({items:["No Gabung", "No Kartu", "SN", "APC", "Class", "Deskripsi Aset", "Deskripsi Alamat", "Cap Date", "Harga Perolehan", "Akumulasi Penyusutan", "Nilai Buku", "Quantity SAP","Jml Fisik Lap","No Label","Status","Update Desk","Update Lokasi/Alamat","Keterangan", "No KKIL","Tgl Invet.","KKIL = SAP","Asset tercatat per Count Date","Selisih,Ket. Selisih","Tindak Lanjut","Update Deskripsi","Update Lokasi","Update BA","Status Final", "Cara Verifikasi", "Tindak Lanjut(Final)"]}) : new server_util_arrayList({items:["No Gabung", "No Kartu", "SN", "APC", "Class", "Deskripsi Aset", "Deskripsi Alamat", "Cap Date", "Harga Perolehan", "Akumulasi Penyusutan", "Nilai Buku", "Quantity SAP","Jml Fisik Lap","No Label","Status","No Sertifikat/DLL","Luas","Update Desk","Update Lokasi/Alamat","Keterangan", "No KKIL","Tgl Invet.","KKIL = SAP","Asset tercatat per Count Date","Selisih,Ket. Selisih","Tindak Lanjut","Update Deskripsi","Update Lokasi","Update BA","Status Final", "Cara Verifikasi", "Tindak Lanjut(Final)"]})), "KKP.xls") );							
			}
			if (sender == this.bTampil){
				var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
				" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, c.no_inv as no_bukti  " +
				" ,	'YA' as kkil, 'YA' as pcd, case when '"+this.ed_jenis.getText()+"' = 'TB' then 0 else a.jml_fisik - b.jml_fisik end as slsh, '-'as ket, b.nama as updesk, b.alamat as uplokasi, '-' as upba, b.kode_status as statusfinal, '-' as crverify, '-' as lanjutan2 "+
				" from amu_asset a " +
				"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
				"	inner join amu_kkl_m c on c.no_inv = b.no_inv and c.jenis = '"+this.ed_jenis.getText()+"' " +
				"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
				//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
				"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
				"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi "+
				"	inner join amu_lokasi i on i.kode_lokfa = h.kode_induk and i.kode_lokasi = a.kode_lokasi and i.kode_induk = '00' "+
				"	left outer join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode "+
				" where g.no_gabung is null and a.kode_lokasi = '" +this.app._lokasi +"' and c.progress = '2' and a.periode = '"+this.app._periode+"' and c.jenis = '"+this.ed_jenis.getText()+"' and i.kode_lokfa = '"+this.ed_lokfa.getText()+"' "+
				" union "+
				"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
				" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, c.no_inv as no_bukti  " +
				" ,	'YA' as kkil, 'YA' as pcd, case when '"+this.ed_jenis.getText()+"' = 'TB' then 0 else a.jml_fisik - b.jml_fisik end as slsh, '-'as ket, b.nama as updesk, b.alamat as uplokasi, '-' as upba, b.kode_status as statusfinal, '-' as crverify, '-' as lanjutan2 "+
				" from amu_asset a " +
				"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
				"	inner join amu_kkl_m c on c.no_inv = b.no_inv and c.jenis = '"+this.ed_jenis.getText()+"' " +
				"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
				//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
				"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
				"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi and h.kode_induk = '00' "+
				"	left outer join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode "+
				" where g.no_gabung is null and a.kode_lokasi = '" +this.app._lokasi +"' and c.progress = '2' and a.periode = '"+this.app._periode+"' and c.jenis = '"+this.ed_jenis.getText()+"' and h.kode_lokfa = '"+this.ed_lokfa.getText()+"' ", true);
				if (typeof data != "string") {
					this.dataAsset = data;
					this.doLoadData(1);
					this.dataColumn = ['pcd','slsh','ket','updesk','uplokasi','upba','statusfinal','crverify','lanjutan2'];
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / 20));
					this.sgn.rearrange();
				}
				else 
					systemAPI.alert(data);
			}
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
			var start = (page - 1) * 20;
			var finish = start + 20;
			if (finish > this.dataAsset.rs.rows.length) 
				finish = this.dataAsset.rs.rows.length;								
			for (var i = start; i < finish; i++) {
				line = this.dataAsset.rs.rows[i];						
				//colTitle: "No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status,Ket. Status,Update Lokasi,Keterangan,Tgl Invet., No KKIL,KKIL = KKP,Asset tercatat per Count Date,Selisih,Ket. Selisih,Tindak Lanjut,Update Deskripsi,Update BA,Update UBIS,Status Final, Cara Verifikasi, Tindak Lanjut(Final)",
				if (this.ed_jenis.getText() == "TB") {
					this.sg.appendData([line.no_gabung, line.no_fa, line.no_sn, line.kode_klpakun, line.kode_klpfa, line.nama, line.nama2, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), floatToNilai(line.jml_fisik), floatToNilai(line.jmlfisik_lap), line.no_label, line.kode_status, line.no_sertifikat, line.luas, line.desk, line.almt, line.keterangan, line.no_bukti,  line.tanggal, line.pcd, line.slsh, line.ket, line.updesk, line.uplokasi, line.upba, line.statusfinal, line.crverify, line.lanjutan2]);
				} else 
					this.sg.appendData([line.no_gabung, line.no_fa, line.no_sn, line.kode_klpakun, line.kode_klpfa, line.nama, line.nama2, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), floatToNilai(line.jml_fisik), floatToNilai(line.jmlfisik_lap), line.no_label, line.kode_status, line.desk, line.almt, line.keterangan,  line.no_bukti, line.tanggal,line.pcd, line.slsh, line.ket,line.updesk, line.uplokasi,line.upba,  line.statusfinal, line.crverify, line.lanjutan2]);
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
	},
	doUploadFinish: function(sender, result, data, filename){
		try{	
			if (sender == this.upl_2){
				if (result){								
					this.svrUpload.setFile(filename,this.rootDir+"/"+sender.param2+urldecode(data),true);					
					this.dataUpload = filename+";"+urldecode(data);					
				}else system.alert(this,"Error upload","");
			}			
		}catch(e){
			alert(e);
		}
	},	
	//doPager: function(sender, page){
	//	this.svrUpload.getData(page);
	//},
	tampilGrid: function(result){
		try{
			var line;
			this.sg.clear();			
			var nka = [], data = [], first = true, no_fa;
			for (var i in result.rows){
				line  = result.rows[i];				
				no_fa = (line["no kartu"] || line["no_fa"] || line["no. kartu aset"])+ (line["sn"] || line["no_sn"] );
				if (this.dataFA.get(no_fa)) system.alert(this,"Aset ini "+ no_fa+" sudah di input KKP","");
				first = false;
				if (line.no_gabung === undefined) data[data.length] = no_fa;
				data = [];
				for (var c in line){					
					data[data.length] = line[c] == "" ? "-" : line[c];					
				}						
				this.sg.appendData(data);						
			}				
			this.sg.setNoUrut(parseFloat(result.start));					
		}catch(e){
			alert(e);
		}
	}
});


/*
 * or ORA-12899: value too large for column "VEAT"."AMU_REKON_D"."STATUS_ASSET" (actual: 16, maximum: 10) 
 * insert into amu_rekon_d (no_rekon, kode_lokasi, no_gabung, no_label, info_kkp, status_asset, selisih, penjelasan, tindakan, keterangan, ba,lokasi, status_final, verifikasi, tindakan2, periode) 
 * values('RKN/2010/00034','48','1020270005010','1' ,'_','T761.2010.000003', '27/10/2010','YA','-','YA' ,'Pencatatan di SAP tidak sesuai','1','Alat Ukur Protocol Tester Siemens K1297 ','N/A','1','201006')

 * if (this.ed_jenis.getText() == "TB"){
					switch (c){
						case 0 : row.no_fa = line[j];
						case 1 : row.no_sn = line[j];
						case 2 : row.kode_klpakun = line[j];
						case 3 : row.kode_klpfa = line[j];
						case 4 : row.nama = line[j];
						case 5 : row.nama2 = line[j];
						case 6 : row.tgl_perolehan = line[j];
						case 7 : row.no_sn = line[j];
						case 8 : row.nilai = line[j];
						case 9 : row.nilai_ap = line[j];
						case 10 : row.nilai_buku = line[j];
						case 11 : row.jml_fisik = line[j];
						case 12 : row.jmlfisik_lap = line[j];
						case 13 : row.no_label = line[j];
						case 14 : row.kode_status = line[j];
						case 15 : row.no_sertifikat = line[j];
						case 16 : row.luas = line[j];
						case 17 : row.desk = line[j];
						case 18 : row.almt = line[j];
						case 19 : row.keterangan = line[j];
						case 20 : row.no_bukti = line[j];
						case 21 : row.tanggal = line[j];				
						case 22 : row.kkil = line[j];
						case 23 : row.pcd = line[j];
						case 24 : row.slsh = line[j];
						case 25 : row.ket = line[j];
						case 26 : row.updesk = line[j];
						case 27 : row.uplokasi = line[j];
						case 28 : row.upba = line[j];
						case 29 : row.statusfinal = line[j];
						case 30 : row.crverify = line[j];
						case 31 : row.lanjutan2 = line[j];
					}				
				}else {
					switch (c){
						case 0 : row.no_fa = line[j];
						case 1 : row.no_sn = line[j];
						case 2 : row.kode_klpakun = line[j];
						case 3 : row.kode_klpfa = line[j];
						case 4 : row.nama = line[j];
						case 5 : row.nama2 = line[j];
						case 6 : row.tgl_perolehan = line[j];
						case 7 : row.no_sn = line[j];
						case 8 : row.nilai = line[j];
						case 9 : row.nilai_ap = line[j];
						case 10 : row.nilai_buku = line[j];
						case 11 : row.jml_fisik = line[j];
						case 12 : row.jmlfisik_lap = line[j];
						case 13 : row.no_label = line[j];
						case 14 : row.kode_status = line[j];					
						case 15 : row.desk = line[j];
						case 16 : row.almt = line[j];
						case 17 : row.keterangan = line[j];
						case 18 : row.no_bukti = line[j];
						case 19 : row.tanggal = line[j];				
						case 20 : row.kkil = line[j];
						case 21 : row.pcd = line[j];
						case 22 : row.slsh = line[j];
						case 23 : row.ket = line[j];
						case 24 : row.updesk = line[j];
						case 25 : row.uplokasi = line[j];
						case 26 : row.upba = line[j];
						case 27 : row.statusfinal = line[j];
						case 28 : row.crverify = line[j];
						case 29 : row.lanjutan2 = line[j];
					}
				}
 * */
