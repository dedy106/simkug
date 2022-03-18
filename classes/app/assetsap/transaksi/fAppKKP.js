/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fAppKKP = function(owner) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fAppKKP.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fAppKKP";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Approval KKP Rekonsiliasi", 0);	
			uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox;app_assetsap_transaksi_fSvrUpload");
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
			this.ed_kode = new saiLabelEdit(this,{bound:[20,2,220,20],caption:"No Approve",readOnly:true});
			this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
			this.ed_rekon = new saiCBBL(this, {
				bound: [20, 31, 220, 20],
				caption: "No KKP Rekon",
				multiSelection: false,				
				sql:["select a.no_rekon, b.nama from amu_rekon_m a inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["no_rekon","nama"],false, ["No Rekon","Nama Lokasi"],"and","Data Rekon KKP",true],
				change:[this,"doChange"]
			});
			this.ed_lokfa = new saiCBBL(this, {
				bound: [20, 30, 220, 20],
				caption: "Area Bisnis",
				multiSelection: false,
				text:this.app._kodeLokfa,
				rightLabel: this.app._namaLokfa,
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'UBIS' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
				change:[this,"doChange"]
			});
			this.ed_jenis = new saiCB(this,{bound:[20,1,200,20], caption:"Jenis", items:["TB","NTB"], change:[this,"doChange"]});			
			this.ed_nik2 = new saiCBBL(this, {
				bound: [20, 5, 200, 20],
				caption: "Pemeriksa",
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
window.app_assetsap_transaksi_fAppKKP.extend(window.childForm);
window.app_assetsap_transaksi_fAppKKP.implement({
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
						sql.add("insert into amu_appkkp_m (no_app,kode_lokasi, kode_lokfa, tanggal, nik_user, tgl_input, jenis, nik_app, progress)"+
							" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.app._userLog+"',now(),'"+this.ed_jenis.getText()+"','"+this.ed_nik2.getText()+"','0' )");
						var line, nka, listnka = new arrayMap();
						var nkatemp = "";
						for (var i in this.dataAsset.rs.rows){
							line = this.dataAsset.rs.rows[i];							
							sql.add("insert into amu_appkkp_d (no_app, kode_lokasi, no_gabung,  periode) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+line.no_gabung+"','"+this.app._periode+"') ");
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
				//this.sg.clear(1);			
				//this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
				this.ed_nik2.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
				//this.ed_nik3.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);				
			}
			if (sender == this.ed_jenis){				
				//this.sg.clear();
				if (this.ed_jenis.getText() == "TB"){				
					this.sg.setColCount(31);
					this.sg.setColTitle("No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status,No Sertifikat, Luas, Update Deskripsi, Update Lokasi/Alamat,Keterangan,No KKIL,Tgl Invet.,Asset tercatat per Count Date,Selisih,Penj. Selisih,Update Deskripsi Aset,Update Lokasi/Alamat,Update BA,Status Final, Cara Verifikasi, Tindak Lanjut(Final)");
					this.sg.setColWidth([30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
							   [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 200, 200, 80, 80, 50, 80, 150]);
					this.sg.setPickList([22],[new arrayMap({items:["YA","TIDAK"]})]);
					this.sg.setButtonStyle([22, 27 ],[bsAuto, bsEllips]);
					this.sg.setColFormat([8,9,10,11],[cfNilai, cfNilai, cfNilai, cfNilai]);
					this.sg.setHeaderColor([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],['#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4']);
					this.statusFinal = 27;
					this.sg.setReadOnly([],[]);
				}else {
					this.sg.setColCount(29);
					this.sg.setColTitle("No Gabung, No Kartu, SN, APC, Class, Deskripsi Aset, Deskripsi Alamat, Cap Date, Harga Perolehan, Akumulasi Penyusutan, Nilai Buku, Quantity SAP,Jml Fisik Lap,No Label,Status, Update Deskripsi, Update Lokasi/Alamat,Keterangan,No KKIL,Tgl Invet.,Asset tercatat per Count Date,Selisih,Penj. Selisih,Update Deskripsi Aset,Update Lokasi/Alamat,Update BA,Status Final, Cara Verifikasi, Tindak Lanjut(Final)");
					this.sg.setColWidth([28,27,26,25,24,23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
							   [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 100, 100, 100, 80, 100, 100, 100, 200, 200, 80, 80, 50, 80, 150]);
					this.sg.setPickList([21],[new arrayMap({items:["YA","TIDAK"]})]);
					this.sg.setButtonStyle([21,26],[bsAuto, bsEllips]);
					this.sg.setColFormat([8,9,10,11],[cfNilai, cfNilai, cfNilai, cfNilai]);					
					this.statusFinal = 26;
					this.sg.setHeaderColor([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],['#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#d7bf21','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#57a609','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4','#4cafd4']);
				}
				this.sg.clear(1);
			}
			if (sender == this.ed_rekon){
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:["select a.kode_lokfa, a.jenis, date_format(a.tanggal, '%d-%m-%Y') as tgl, a.nik_app1, a.nik_app2, a.nik_app3 "+
					" from amu_rekon_m a "+
					" where a.no_rekon = '"+ sender.getText()+"' ",		
												
					"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, c.no_inv as no_bukti  " +
					" ,	ifnull(g.info_kkp,'YA') as kkil, ifnull(g.status_asset,'YA') as pcd, ifnull(g.selisih,case when j.jenis = 'TB' then 0 else a.jml_fisik - b.jml_fisik end) as slsh "+
					" , ifnull(g.penjelasan,'-') as ket, ifnull(g.keterangan,b.nama) as updesk, ifnull(g.lokasi,b.alamat) as uplokasi, ifnull(g.ba,'-') as upba, ifnull(g.status_final,b.kode_status) as statusfinal, ifnull(g.verifikasi,'-') as crverify, ifnull(g.tindakan2,'-') as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv  " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi "+
					"	inner join amu_lokasi i on i.kode_lokfa = h.kode_induk and i.kode_lokasi = a.kode_lokasi and i.kode_induk = '00' "+					
					"	inner join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode and g.no_label = b.no_label and g.no_rekon = '"+sender.getText()+"' "+
					"	inner join amu_rekon_m j on j.no_rekon = g.no_rekon and c.jenis = j.jenis "+
					" where a.kode_lokasi = '" +this.app._lokasi +"'  and a.periode = '"+this.app._periode+"'  "+
					" union "+
					"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, c.no_inv as no_bukti  " +
					" ,	ifnull(g.info_kkp,'YA') as kkil, ifnull(g.status_asset,'YA') as pcd, ifnull(g.selisih,case when j.jenis = 'TB' then 0 else a.jml_fisik - b.jml_fisik end) as slsh "+
					" , ifnull(g.penjelasan,'-') as ket, ifnull(g.keterangan,b.nama) as updesk, ifnull(g.lokasi,b.alamat) as uplokasi, ifnull(g.ba,'-') as upba, ifnull(g.status_final,b.kode_status) as statusfinal, ifnull(g.verifikasi,'-') as crverify, ifnull(g.tindakan2,'-') as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv  " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi and h.kode_induk = '00' "+
					"	inner join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode and g.no_label = b.no_label and g.no_rekon = '"+sender.getText()+"' "+
					"	inner join amu_rekon_m j on j.no_rekon = g.no_rekon and c.jenis = j.jenis "+
					" where  a.kode_lokasi = '" +this.app._lokasi +"' and a.periode = '"+this.app._periode+"'   "
					]}),true);									
				var line = data.result[0].rs.rows[0];
				this.ed_lokfa.setText(line.kode_lokfa);						
				this.ed_jenis.setText(line.jenis);
				this.ed_nik2.setText(line.nik_app2);
				this.dataAsset = data.result[1];							
				this.doLoadData(1);
				this.dataColumn = ['kkil','pcd','slsh','ket','updesk','uplokasi','upba','statusfinal','crverify','lanjutan2'];
				this.sgn.setTotalPage(Math.ceil(this.dataAsset.rs.rows.length / 30));
				this.sgn.rearrange();				
				this.ed_lokfa.onChange.set(this,"doChange");
				this.ed_jenis.onChange.set(this,"doChange");
			}
		}catch(e){
			this.ed_lokfa.onChange.set(this,"doChange");
			this.ed_jenis.onChange.set(this,"doChange");
			error_log(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_appkkp_m','no_app',"APP/"+this.dp_tgl.getYear()+"/",'00000'));
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
				downloadFile(this.dbLib.sqlToXls2("select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, c.no_inv as no_bukti  " +
					" ,	ifnull(g.info_kkp,'YA') as kkil, ifnull(g.status_asset,'YA') as pcd, ifnull(g.selisih,case when j.jenis = 'TB' then 0 else a.jml_fisik - b.jml_fisik end) as slsh "+
					" , ifnull(g.penjelasan,'-') as ket, ifnull(g.keterangan,b.nama) as updesk, ifnull(g.lokasi,b.alamat) as uplokasi, ifnull(g.ba,'-') as upba, ifnull(g.status_final,b.kode_status) as statusfinal, ifnull(g.verifikasi,'-') as crverify, ifnull(g.tindakan2,'-') as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv  " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi "+
					"	inner join amu_lokasi i on i.kode_lokfa = h.kode_induk and i.kode_lokasi = a.kode_lokasi and i.kode_induk = '00' "+					
					"	inner join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode and g.no_label = b.no_label and g.no_rekon = '"+this.ed_rekon.getText()+"' "+
					"	inner join amu_rekon_m j on j.no_rekon = g.no_rekon and c.jenis = j.jenis "+
					" where a.kode_lokasi = '" +this.app._lokasi +"'  and a.periode = '"+this.app._periode+"' and i.kode_lokfa = j.kode_lokfa "+
					" union "+
					"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, c.no_inv as no_bukti  " +
					" ,	ifnull(g.info_kkp,'YA') as kkil, ifnull(g.status_asset,'YA') as pcd, ifnull(g.selisih,case when j.jenis = 'TB' then 0 else a.jml_fisik - b.jml_fisik end) as slsh "+
					" , ifnull(g.penjelasan,'-') as ket, ifnull(g.keterangan,b.nama) as updesk, ifnull(g.lokasi,b.alamat) as uplokasi, ifnull(g.ba,'-') as upba, ifnull(g.status_final,b.kode_status) as statusfinal, ifnull(g.verifikasi,'-') as crverify, ifnull(g.tindakan2,'-') as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv  " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi and h.kode_induk = '00' "+
					"	inner join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode and g.no_label = b.no_label and g.no_rekon = '"+this.ed_rekon.getText()+"' "+
					"	inner join amu_rekon_m j on j.no_rekon = g.no_rekon and c.jenis = j.jenis "+
					" where  a.kode_lokasi = '" +this.app._lokasi +"' and a.periode = '"+this.app._periode+"'  and h.kode_lokfa = j.kode_lokfa ",						
						(this.ed_jenis.getText() == "NTB" ? new server_util_arrayList({items:["No Gabung", "No Kartu", "SN", "APC", "Class", "Deskripsi Aset", "Deskripsi Alamat", "Cap Date", "Harga Perolehan", "Akumulasi Penyusutan", "Nilai Buku", "Quantity SAP","Jml Fisik Lap","No Label","Status","Update Desk","Update Lokasi/Alamat","Keterangan", "No KKIL","Tgl Invet.","KKIL = SAP","Asset tercatat per Count Date","Selisih,Ket. Selisih","Tindak Lanjut","Update Deskripsi","Update Lokasi","Update BA","Status Final", "Cara Verifikasi", "Tindak Lanjut(Final)"]}) : new server_util_arrayList({items:["No Gabung", "No Kartu", "SN", "APC", "Class", "Deskripsi Aset", "Deskripsi Alamat", "Cap Date", "Harga Perolehan", "Akumulasi Penyusutan", "Nilai Buku", "Quantity SAP","Jml Fisik Lap","No Label","Status","No Sertifikat/DLL","Luas","Update Desk","Update Lokasi/Alamat","Keterangan", "No KKIL","Tgl Invet.","KKIL = SAP","Asset tercatat per Count Date","Selisih,Ket. Selisih","Tindak Lanjut","Update Deskripsi","Update Lokasi","Update BA","Status Final", "Cara Verifikasi", "Tindak Lanjut(Final)"]})), "KKP.xls") );							
			}
			if (sender == this.bTampil){
				var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, c.no_inv as no_bukti  " +
					" ,	ifnull(g.info_kkp,'YA') as kkil, ifnull(g.status_asset,'YA') as pcd, ifnull(g.selisih,case when j.jenis = 'TB' then 0 else a.jml_fisik - b.jml_fisik end) as slsh "+
					" , ifnull(g.penjelasan,'-') as ket, ifnull(g.keterangan,b.nama) as updesk, ifnull(g.lokasi,b.alamat) as uplokasi, ifnull(g.ba,'-') as upba, ifnull(g.status_final,b.kode_status) as statusfinal, ifnull(g.verifikasi,'-') as crverify, ifnull(g.tindakan2,'-') as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi "+
					"	inner join amu_lokasi i on i.kode_lokfa = h.kode_induk and i.kode_lokasi = a.kode_lokasi and i.kode_induk = '00' "+					
					"	inner join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode and g.no_label = b.no_label and g.no_rekon = '"+this.ed_rekon.getText()+"' "+
					"	inner join amu_rekon_m j on j.no_rekon = g.no_rekon and c.jenis = j.jenis "+
					" where a.kode_lokasi = '" +this.app._lokasi +"'  and a.periode = '"+this.app._periode+"' and i.kode_lokfa = j.kode_lokfa "+
					" union "+
					"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpakun, a.kode_klpfa, a.nama, a.nama2,a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.jml_fisik " +
					" , b.jml_fisik as jmlfisik_lap, b.no_label, b.kode_status, f.nama as ket_status, b.ket_lokasi as desk,b.keterangan, b.alamat as almt, date_format(c.tanggal,'%d-%m-%Y') as tanggal, b.no_sertifikat, b.luas, c.no_inv as no_bukti  " +
					" ,	ifnull(g.info_kkp,'YA') as kkil, ifnull(g.status_asset,'YA') as pcd, ifnull(g.selisih,case when j.jenis = 'TB' then 0 else a.jml_fisik - b.jml_fisik end) as slsh "+
					" , ifnull(g.penjelasan,'-') as ket, ifnull(g.keterangan,b.nama) as updesk, ifnull(g.lokasi,b.alamat) as uplokasi, ifnull(g.ba,'-') as upba, ifnull(g.status_final,b.kode_status) as statusfinal, ifnull(g.verifikasi,'-') as crverify, ifnull(g.tindakan2,'-') as lanjutan2 "+
					" from amu_asset a " +
					"	inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b. no_fa = a.no_fa and b.no_sn = a.no_sn " +
					"	inner join amu_kkl_m c on c.no_inv = b.no_inv  " +
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa and a.periode = d.periode  and d.jenis_proc = 'FISIK' " +
					//"	inner join amu_distaset_d e on e.no_gabung = a.no_gabung and e.periode = a.periode "+
					"	inner join amu_status f on f.kode_status = b.kode_status and f.jenis = c.jenis "+
					"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi and h.kode_induk = '00' "+
					"	inner join amu_rekon_d g on g.no_gabung = a.no_gabung and g.periode = a.periode and g.no_label = b.no_label and g.no_rekon = '"+this.ed_rekon.getText()+"' "+
					"	inner join amu_rekon_m j on j.no_rekon = g.no_rekon and c.jenis = j.jenis "+
					" where  a.kode_lokasi = '" +this.app._lokasi +"' and a.periode = '"+this.app._periode+"'  and h.kode_lokfa = j.kode_lokfa ", true);
				
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
