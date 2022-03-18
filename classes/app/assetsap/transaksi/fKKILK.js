/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fKKILK = function(owner, ba, no_inv, formView) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fKKILK.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fKKILK";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Inventarisasi Tanah Bangunan (Koreksi)", 0);	
			uses("saiMemo;util_file;datePicker;uploader;checkBox;app_assetsap_transaksi_fSvrUpload");								
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"], tag:9, hint:"Tanggal inventarisasi dilapangan."});
			this.ed_jenis = new saiLabelEdit(this,{bound:[20,10,150,20], caption:"Jenis",text:"TB", readOnly:true, tag:9});
			this.ed_lokfa = new saiCBBL(this, {
				bound: [20, 30, 150, 20],
				caption: "Bus. Area",
				multiSelection: false,
				text:this.app._kodeLokfa,
				rightLabel:this.app._namaLokfa,						
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
				change:[this,"doChange"],
				tag:9
			});
			this.ed_kode = new saiCBBL(this,{bound:[20,2,250,20],caption:"No Inventarisasi",readOnly:true,
				multiSelection: false,
				change:[this,"doChange"]
			});	
			this.ed_area = new saiLabelEdit(this, {
				bound: [20, 30, 200, 20],
				caption: "Lokasi Aset (Area)",
				multiSelection: false,							
				sql:["select kode_area, nama from amu_dcsarea ", ["kode_area","nama"],false, ["Kode","Nama"],"and","Data Area",true],				
				tag:9
			});		
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 200, 20],
				caption: "Pembuat",
				multiSelection: false,
				text: this.app._userLog,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true],
				tag:9
			});
			this.ed_klpfa = new saiCBBL(this, {
				bound: [20, 4, 200, 20],
				caption: "Kelompok Aset",
				multiSelection: false,
				change:[this, "doChange"]
				//sql:["select kode_klpfa, nama from amu_klp where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_klpfa","nama"],false, ["Kode Group","Nama"],"and","Data Kelompok Aset(Asset Class)",true]
			});							
			this.ed_nofa = new saiCBBL(this, {
				bound: [20, 5, 220, 20],
				caption: "No Asset/NKA",
				multiSelection: false,
				rightLabelVisible:false,
				change:[this, "doChange"]			
			});				
			this.ed_file = new saiLabelEdit(this, {bound:[20,6,400,20], caption:"Attachment KKIL"});
			this.upl_1 = new uploader(this,{bound:[430,6,80,20], param3: "object", param2 :"server/tmp/", param1 : "uploadTo",
					autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"});
			this.upl_2 = new uploader(this,{bound:[830,6,80,20], param3: "object", param2 :"server/tmp/", param1 : "uploadTo",
					autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Upload KKIL"});
			this.bCopy = new button(this,{bound:[730,6,80,20],caption:"Copy Almt.", click:[this,"doCopy"]});
			this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
			this.sg = new saiGrid(this.p1, {
				bound: [1, 20, 898, 180],
				colCount: 9,
				colTitle: ["Alamat Aset","Jumlah Fisik","No. Label", "Status","Ket. Status","No Sertifikat/IMB/PBB/DLL", "Luas", "Update Deskripsi & Lokasi", "Keterangan"],
				colWidth: [[8,7,6,5, 4, 3, 2, 1, 0], [150,150, 100, 250,150,80, 130,100,250]],
				colReadOnly: [true,[4],[]],
				change: [this, "doGridChange"],
				cellEnter:[this,"doCellEnter"],
				rowCount: 1,
				tag: 1,
				buttonStyle:[[3],[bsEllips]],
				ellipsClick: [this,"doEllipsClick"],
				colFormat:[[1],[cfNilai]]
			});		
			this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
			this.rearrangeChild(10,23);	
			//aset info
			this.pinfo = new panel(this, {bound:[350, 10, 570,this.ed_file.top - 13], caption:"Data SAP AM"});
			this.ed_nka = new saiLabelEdit(this.pinfo,{bound:[10,0,500,20], caption:"NKA", readOnly:true});
			this.ed_nama = new saiLabelEdit(this.pinfo,{bound:[10,1,500,20], caption:"Deskripsi", readOnly:true});
			this.ed_sn = new saiLabelEdit(this.pinfo,{bound:[10,2,200,20], caption:"SN Aset", readOnly:true});
			this.ed_tgl = new saiLabelEdit(this.pinfo,{bound:[310,2,200,20], caption:"Cap. Date", readOnly:true});
			this.ed_n1 = new saiLabelEdit(this.pinfo,{bound:[10,3,200,20], caption:"Harga Perolehan", readOnly:true, tipeText:ttNilai});
			this.ed_n2 = new saiLabelEdit(this.pinfo,{bound:[310,3,200,20], caption:"Akum. Penyusutan", readOnly:true, tipeText:ttNilai});
			this.ed_n3 = new saiLabelEdit(this.pinfo,{bound:[10,4,200,20], caption:"Nilai Buku", readOnly:true, tipeText:ttNilai});
			this.ed_jml = new saiLabelEdit(this.pinfo,{bound:[310,4,200,20], caption:"Quantity SAP", readOnly:true, tipeText:ttNilai});
			this.ed_alm = new saiLabelEdit(this.pinfo,{bound:[10,5,500,20], caption:"Alamat", readOnly:true});
			//"Cap Date", "Harga Perolehan", "Akm. Penyusutan", "Nilai Buku", "Alamat Asset", "Jumlah Fisik"
			this.pinfo.rearrangeChild(30,23);
			this.setTabChildIndex();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
						
			this.onClose.set(this,"doClose");		
			this.doChange(this.ed_lokfa);			
			this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
			this.svrUpload.addListener(this);
			this.svrUpload2 = new app_assetsap_transaksi_fSvrUpload();
			this.svrUpload2.addListener(this);
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.fileUtil.getRootDirA();						
			this.cekStatus = 0;
			this.dbLib.getDataProviderA("select kode_status,nama from amu_status where jenis = 'TB' ");
			this.fromView = false;			
			
			if (no_inv){
				this.ed_lokfa.setText(ba);
				this.ed_kode.setText(no_inv);
				this.fromView = true;
				this.formView = formView;
			}else this.ed_nik1.setText(this.app._userLog);
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fKKILK.extend(window.childForm);
window.app_assetsap_transaksi_fKKILK.implement({
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
			system.confirm(this, "delete", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
		if (sender == this.app._mainForm.bBack){
			if (this.fromView){
				this.app._mainForm.pButton.hide();
				this.formView.show();
				this.free();
				this.formView.refresh();		
			}else{
				this.app._mainForm.bTutup.click();
			}
		}
	},
	doModalResult: function(event, result){	
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			this.dbEvent = event;
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);		
						this.sg.clear(1);								
					}
				break;
				case "ubah" :
					if (this.filename == undefined && this.oldFilename == undefined){
						system.alert(this,"Tolong lampirkan data hasil scan KKIL sebagai evidence","");
						return;
					}					
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						if (this.dataUpload === undefined){							
							var c = 0;
							for (var row=0; row < this.sg.getRowCount();row++){								
								if (this.sg.rowValid(row)){
									for (var i=row+1; i < this.sg.getRowCount();i++){
										if (this.sg.cells(2,i) == this.sg.cells(2,row) && this.sg.cells(2,row) != "-" ) {
											system.alert(this,"No Label "+this.sg.cells(2,row)+" sudah dimasukkan di baris ke "+i,"Data tidak dapat disimpan.");
											return;
										}
									}
									if (this.dataStatus.get(this.sg.cells(3,row)) === undefined){
										system.alert(this,"Ada Status tidak dikenal ("+trim(this.sg.cells(3, row))+" baris "+row +")","Proses tidak dilanjutkan...");
										return;
									}
									if (this.sg.cells(2, row).length != 18 && this.ed_klpfa.getText() != "101101") {
										switch (this.sg.cells(3,row)){
											case "2":
											case "4":
											case "5":
											break;
											default:
												system.alert(this,"Ada Label yg Panjangnya tidak 18 digit ("+trim(this.sg.cells(2, row))+" baris "+row +")","Proses tidak dilanjutkan...");
												return;
											break;
										}										
									}else if (trim(this.sg.cells(2, row)).substr(0,4) != "TLKM" && this.ed_klpfa.getText() != "101101") {
										switch (this.sg.cells(3,row)){
											case "2":
											case "4":
											case "5":
											break;
											default:
												system.alert(this,"Label harus diawali TLKM ("+trim(this.sg.cells(2, row)) +" baris "+row+")","Proses tidak dilanjutkan...");
												return;
											break;
										}													
									}			
									c++;						
								}														
							}						
							if (c == 0){
								system.alert(this,"Data Inventarisasi belum valid","Cek kembali inputan anda.");
								return;
							}
							sql.add("delete from amu_kkl_d where no_inv = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							sql.add("update amu_kkl_m set kode_lokfa = '"+this.ed_lokfa.getText()+"' , tanggal = '"+this.dp_tgl.getDateString()+"' "+
								" , nik_modified='"+this.app._userLog+"', tgl_modified=now(),nik_buat='"+this.ed_nik1.getText()+"' "+
								" , lampiran = '"+this.ed_file.getText()+"',kode_lokfa2 ='"+this.ed_area.getText()+"',progress='0'  where no_inv = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							var status = 99;
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){
									sql.add("insert into amu_kkl_d (no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, no_sertifikat, luas,ket_lokasi, keterangan, periode ) "+
									" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_nofa.getText()+"','"+ this.ed_nofa.rightLabelCaption+"','"+ this.ed_sn.getText()+"','"+this.sg.cells(0,i)+"', "+
									"'"+this.sg.cells(1,i)+"','"+ this.sg.cells(2,i)+"','"+ this.sg.cells(3,i)+"','"+this.sg.cells(7,i)+"','"+ this.sg.cells(5,i)+"','"+ this.sg.cells(6,i)+"','"+ this.sg.cells(7,i)+"','"+ this.sg.cells(8,i)+"','"+this.app._periode+"' )");
									if (this.sg.cells(3,i) != "-" && status > parseFloat(this.sg.cells(3,i))) status = parseFloat(this.sg.cells(3,i));
								}
							}		
							sql.add("update amu_kkl_d set status_nka = '"+status+"' where periode = '"+this.app._periode+"' and no_gabung = '"+this.ed_nofa.getText()+"' ");
							this.dbLib.execArraySQL(sql);
							//this.svrUpload2.uploadAttachment();
						}else {							
							this.svrUpload.uploadKKIL(this.ed_kode.getText(), this.app._periode, this.dp_tgl.getDateString(), this.ed_jenis.getText(), this.app._lokasi, this.ed_lokfa.getText(), this.app._userLog,this.ed_nik1.getText(),this.filename, this.ed_area.getText, true);
						}
						
					}					
				break;				
				case "delete" :
					sql.add("delete from amu_kkl_m where no_inv = '"+this.ed_kode.getText()+"' ");
					sql.add("delete from amu_kkl_d where no_inv = '"+this.ed_kode.getText()+"' ");
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
			if (this.ed_lokfa) var diva = this.ed_lokfa.getText().substr(0,2) == "TD" || this.ed_lokfa.getText().substr(0,2) == "TC";
			if (sender == this.ed_kode){
				var data = this.dbLib.getDataProvider("select d.kode_klpfa, a.nik_buat, date_format(a.tanggal,'%d-%m-%Y') as tgl, b.no_gabung, "+
					" b.alamat, b.jml_fisik, b.no_label, b.kode_status, c.nama as nm_status, b.no_sertifikat, b.luas, b.ket_lokasi, b.keterangan, a.lampiran, a.kode_lokfa2  "+
					" from amu_kkl_m a inner join amu_kkl_d b on b.no_inv = a.no_inv "+
					"	inner join amu_status c on c.kode_status = b.kode_status and c.jenis = 'TB' "+
					"	inner join amu_asset d on d.no_gabung = b.no_gabung "+
					" where a.no_inv = '"+this.ed_kode.getText()+"' ", true);
			   this.ed_nofa.setSQL("select a.no_gabung, a.no_fa, a.no_sn, a.nama from amu_asset a "+
					" left outer join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
					" where a.periode = '"+this.app._periode+"' and b.no_gabung is null and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and (a.kode_lokfa = '"+this.ed_lokfa.getText()+"' or a.ref1 = '"+( diva ? this.ed_lokfa.getText() :"" )+"' )"+
					" union "+
					"select d.no_gabung, d.no_fa, d.no_sn, d.nama "+
					" from amu_kkl_m a inner join amu_kkl_d b on b.no_inv = a.no_inv "+
					"	inner join amu_status c on c.kode_status = b.kode_status and c.jenis = 'TB' "+
					"	inner join amu_asset d on d.no_gabung = b.no_gabung "+
					" where a.no_inv = '"+this.ed_kode.getText()+"' ", ["a.no_gabung","a.no_fa","a.no_sn","a.nama"],false, ["No Gabung","NKA","SN","Deskripsi"],"and","Data SAP AM",true);	
			   if (data.rs.rows[0]){
					var line, first = true;					
					this.ed_klpfa.onChange.set(this, undefined);
					//this.ed_nofa.onChange.set(this, undefined);
					line = data.rs.rows[0];						
					this.dp_tgl.setText(line.tgl);
					this.ed_nik1.setText(line.nik_buat);
					this.ed_klpfa.setText(line.kode_klpfa);
					this.ed_nofa.setText(line.no_gabung);
					this.ed_file.setText(line.lampiran);
					this.ed_area.setText(line.kode_lokfa2);
					this.oldFilename = line.lampiran;
					this.sg.clear();
					for (var i in data.rs.rows){						
						this.sg.appendData([line.alamat, line.jml_fisik, line.no_label, line.kode_status, line.nm_status, line.no_sertifikat, line.luas, line.ket_lokasi, line.keterangan]);				
									
					}
					setTipeButton(tbUbahHapus);				
					//this.ed_nofa.onChange.set(this, "doChange");
					this.ed_klpfa.onChange.set(this, "doChange");
				}else setTipeButton(tbAllFalse);
			}
			if (sender == this.ed_lokfa){
				this.sg.clear(1);							
				this.ed_nik1.clear();
				this.ed_klpfa.clear();
				this.ed_nofa.clear();
				this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);			
				this.ed_klpfa.setSQL("select distinct a.kode_klpfa, a.nama, e.group_aset from amu_klp a "+
					"	inner join amu_lokasi c on c.kode_lokfa = '"+this.ed_lokfa.getText()+"' " +				
					"	inner join amu_asset d on d.kode_klpfa = a.kode_klpfa and d.periode = '"+this.app._periode+"' and (d.kode_lokfa = '"+this.ed_lokfa.getText()+"' or d.ref1 = '"+( diva ? this.ed_lokfa.getText() :"" )+"' ) "+
					"	inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.periode = '"+this.app._periode+"' and b.jenis_proc = 'FISIK' " +
					"	left outer join xgroupfa e on e.asset_class = d.kode_klpfa "+
					" where a.kode_lokasi = '"+this.app._lokasi+"'  and a.kode_klpfa like '101%'", ["a.kode_klpfa","a.nama","e.group_aset"],false, ["Class","Asset Class","Group"],"and","Data Kelompok Aset(Asset Class)",true);
				this.ed_kode.setSQL("select distinct a.no_inv, b.no_gabung, c.nama from amu_kkl_m a "+
					" inner join amu_kkl_d b on b.no_inv = a.no_inv "+
					"	inner join amu_asset c on c.no_gabung = b.no_gabung "+
					" where a.progress in ('0','6') and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.jenis = 'TB' ",["no_inv", "no_gabung","nama"],false, ["No Inventarisasi","No NKA+SNo.","Deskripsi"],"where","Daftar Inventarisasi Aset Fisk",true);
			}	
			if (sender == this.ed_klpfa){
				this.ed_nofa.clear();
				this.ed_nofa.setSQL("select a.no_gabung, a.no_fa, a.no_sn, a.nama from amu_asset a "+
					" left outer join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
					" where a.periode = '"+this.app._periode+"' and b.no_gabung is null and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and (a.kode_lokfa = '"+this.ed_lokfa.getText()+"' or a.ref1 = '"+( diva ? this.ed_lokfa.getText() :"" )+"' ) ", ["a.no_gabung","a.no_fa","a.no_sn","a.nama"],false, ["No Gabung","NKA","SN","Deskripsi"],"and","Data SAP AM",true);
				this.cekStatus = 1;
				this.dbLib.getDataProviderA("select a.no_gabung, a.no_fa, a.no_sn, a.nama from amu_asset a "+
					" inner join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
					" where a.periode = '"+this.app._periode+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and (a.kode_lokfa = '"+this.ed_lokfa.getText()+"' or a.ref1 = '"+( diva ? this.ed_lokfa.getText() :"" )+"' ) ");
			}	
			if (sender == this.ed_nofa){
				this.sg.clear(1);
				var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.jenis, a.nama, a.nilai, a.nilai_ap, a.nilai_buku, a.jml_fisik, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nama2, ifnull(b.bun,'-') as bun "+
					" 	from amu_asset a "+
					"	left outer join xsapqtybun b on b.no_gabung = a.no_gabung "+
					" where a.no_gabung = '" + this.ed_nofa.getText() + "' and a.kode_lokasi = '" + this.app._lokasi + "' and a.periode =  '"+this.app._periode+"' ", true);
				if (typeof data != "string"){
					if (data.rs.rows[0] != undefined){						
						var line = data.rs.rows[0];
						this.ed_nka.setText(line.no_fa);
						this.ed_nama.setText(line.nama);
						this.ed_sn.setText(line.no_sn);
						this.ed_tgl.setText(line.tgl_perolehan);
						this.ed_alm.setText(line.nama2);
						this.ed_jml.setText(line.jml_fisik);
						this.ed_n1.setText(floatToNilai(line.nilai));
						this.ed_n2.setText(floatToNilai(line.nilai_ap));
						this.ed_n3.setText(floatToNilai(line.nilai_buku));						
						this.ed_jml.setCaption("Quantity SAP(" +line.bun+")");
					}
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_kkl_m','no_inv',"INV."+this.ed_lokfa.getText()+"."+this.dp_tgl.getYear()+".",'000000'));
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
							if (this.filename) {var file = this.filename.split(";");
								if (this.oldFilename != file[0]){
									this.saveFiles = this.rootDir+"/"+this.upl_1.param2 + file[1];
									this.dest = this.rootDir+"/server/media/amu/" + file[0];
									this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);					  				
								}
							}
							if (this.dbEvent == "delete"){
								this.fileUtil.deleteFile(this.rootDir+"/server/media/amu/" + this.oldFilename);
							}
							if (this.fromView) {
								this.app._mainForm.pButton.hide();
								this.formView.show();
								this.free();
								this.formView.refresh();
							}else{								
								this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
								this.app._mainForm.bClear.click();
                            }                          
						}else system.info(this,result,"");
	    			break;
	    			case "getDataProvider":
						if (this.cekStatus != 1){
							eval("result = "+result+";");
							this.dataStatus = new arrayMap();
							for (var i in result.rs.rows){
								this.dataStatus.set(result.rs.rows[i].kode_status, result.rs.rows[i].nama);
							}							
						}else {
							result = JSON.parse(result);
							this.dataFA = new arrayMap();
							var line;
							for (var i in result.rs.rows){
								line = result.rs.rows[i];
								this.dataFA.set(line.no_gabung, line);
							}
						}
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
			}
        }else if (sender == this.svrUpload){
			switch (methodName){
					case "setFile":						
						result = JSON.parse(result);
						this.sgn.setTotalPage(Math.ceil(result.recCount / 20));
						this.sgn.rearrange();
						this.tampilGrid(result);
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
		}else if (sender == this.svrUplaod2){
			
		}
        
	},	
	doGridChange: function(sender, col, row,param1,result, data){	
		try{
			sender.onChange.set(this,undefined);
			sender.onCellEnter.set(this,undefined);
			if (col == 2){
				if (sender.cells(2,row) != "" && sender.cells(2,row).length != 18 && this.ed_klpfa.getText() != "101101"){
					switch (this.sg.cells(3,row)){
						case "2":
						case "4":
						case "5":
						break;
						default:
							system.alert(this,"No Label harus 18 digit.(Abaikain pesan ini jika akan memasukkan status 2, 4, dan 5).","Cek Inputan Label Kembali");
							sender.setRowIndex(row,2);
							return;
						break;
					}								
				}
				
				for (var i=0; i < this.sg.getRowCount();i++){
					if (this.sg.cells(2,i) == this.sg.cells(2,row) && i != row) {
						systemAPI.alert("No Label "+this.sg.cells(2,row)+" sudah dimasukkan di baris ke "+i);					
						break;
					}
				}
			}
			if (col == 3){				
				this.sg.cells(4,row, this.dataStatus.get(this.sg.cells(3,row)));				
			}		
			sender.onChange.set(this,"doGridChange");
			sender.onCellEnter.set(this,"doCellEnter");
		}catch(e){
			alert(e);
		}
    },
	doEllipsClick:function(sender, col ,row){		
			switch(col)
			{
				case 3 : 
					this.standarLib.showListDataForSG(this, "Daftar Status Aset",this.sg, this.sg.row, this.sg.col, 
													  "select kode_status, nama from amu_status where jenis= 'TB'",
													  "select count(kode_status)  from amu_status where jenis= 'TB' ",
													  ["kode_status","nama"],"where",["Kode Status","Nama"],false);
					break;				
			}	
	},
	doUploadFinish: function(sender, result, data, filename){
		try{	
			if (sender == this.upl_2){
				if (result){							
					this.svrUpload.setFile(filename,this.rootDir+"/"+sender.param2+urldecode(data));					
					this.dataUpload = filename+";"+urldecode(data);
				}else system.alert(this,"Error upload","");
			}
			if (sender == this.upl_1){
				this.ed_file.setText(filename);
				//this.svrUpload2.setFile(filename,this.rootDir+"/"+sender.param2+urldecode(data));
				this.filename = filename +";"+urldecode(data);
			}
		}catch(e){
			alert(e);
		}
	},	
	doPager: function(sender, page){
		this.svrUpload.getData(page);
	},
	tampilGrid: function(result){
		try{
			var line;
			this.sg.clear();
			this.ed_nofa.onChange.set(this, undefined);
			var nka = [], data = [], first = true;
			for (var i in result.rows){
				line  = result.rows[i];
				if (first){
					this.ed_nofa.setText((line["no kartu"] || line["no_fa"])+ (line["sn"] || line["no_sn"] ));							
					if (this.dataFA.get(this.ed_nofa.getText())) system.alert(this,"Aset ini sudah di input KKIL","");
				}
				first = false;
				data = [];
				for (var c in line){
					if (c.search("nomor") > -1 || c == "no_bukti" || c == "no bukti") continue;
					else  if (c !="no kartu" && c != "sn" && c.search("nomor") == -1 && c != "no_bukti" && c != "no_sn"){
						data[data.length] = line[c] == "" ? "-" : line[c];					
					}
				}						
				this.sg.appendData(data);						
			}				
			this.sg.setNoUrut(parseFloat(result.start));		
			this.ed_nofa.onChange.set(this, "doChange");
		}catch(e){
			alert(e);
		}
	},
	doCellEnter: function(sender, col, row){
		sender.onChange.set(this,undefined);
		sender.onCellEnter.set(this,undefined);
		if (col == 2 && sender.cells(2,row) == ""){
			sender.cells(2,row,"TLKM");
		}
		sender.onChange.set(this,"doGridChange");
		sender.onCellEnter.set(this,"doCellEnter");
	},
	doCopy: function(sender){
		this.sg.cells(0,this.sg.row, this.ed_alm.getText());		
	}
});


/*
 * 
 * */
