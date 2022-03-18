/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fRekapKK = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fRekapKK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fRekapKK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Rekapitulasi Hasil Verifikasi", 0);	
		uses("datePicker;saiCBBL;saiGrid");						
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"Kesimpulan",readOnly:true});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});			
		this.ed_jns = new saiCB(this,{bound:[20,4,200,20], caption:"Jenis Prosedur", change:[this,"doEditChange"]});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Bus. Area",
			multiSelection: false,
			sql:["select kode_klpfa, nama from amu_klp where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_klpfa","nama"],false, ["Klp Aset","Nama"],"and","Data Kelompok Aset",true],
			change:[this,"doChange"]		
		});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pembuat",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});		
		this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 18,
			colTitle: "Id Gabung, No Asset, SN,Jenis Asset,Deskripsi Asset,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Nama Link/Point/Lokasi, Ref. Evidence, Kesimpulan",
			colWidth: [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,150,150,100, 100, 100, 80, 80, 250, 80, 100, 80, 80, 150, 80, 50, 150,150]],
			//colReadOnly: [true,[1,2,3,4,5,6,7,8,9],[]],
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9,
			readOnly:true,
			buttonStyle:[[0,16,17],[bsEllips, bsEllips, bsAuto]],
			ellipsClick: [this,"doEllipsClick"],
			colFormat:[[6,7,8],[cfNilai, cfNilai, cfNilai]],
			picklist:[[17],[new arrayMap({items:["Ada/Eksis","Tidak Dapat diverifikasi"]})]]
		});		
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:1, grid:this.sg});
		this.rearrangeChild(10,23);			
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");		
		this.dataGrid = new arrayMap();
		this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");
		this.doClick();
	}
};
window.app_assetsap_transaksi_fRekapKK.extend(window.childForm);
window.app_assetsap_transaksi_fRekapKK.implement({
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
						this.ed_jenis.setText("TB");
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						sql.add("insert into amu_alt_baver_m(no_ba,  kode_lokasi, kode_klp, tanggal, nik_buat, jns_proc,periode)values"+
							"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','-','"+this.dp_tgl.getDateString()+"','"+this.ed_nik1.getText()+"','"+this.ed_jns.getText()+"','"+this.app._periode+"')");
						alert(this.evidenceField);
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into amu_alt_baver_d (no_ba,kode_lokasi, no_gabung, kesimpulan, jns_proc, periode  ) "+
									" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(this.evidenceField,i)+"','"+this.ed_jns.getText()+"','"+this.app._periode+"')");
							}
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
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);					
		}		
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_alt_baver_m','no_ba',"BAV/"+this.dp_tgl.getYear()+"/",'0000'));
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
	    			case "getDataProvider":						
						result = JSON.parse(result);						
						var line;						
						for (var i in result.rs.rows) {
							line = result.rs.rows[i];
							this.ed_jns.addItem(line.kode_klp, line.nama);
						}
						this.doEditChange(this.ed_jns);
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
		try{
			this.sg.onChange.set(this,undefined);				
			switch (col){
				case 0 :					
					var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.nama2, a.nama, a.kode_lokfa,a.nilai, a.nilai_ap, a.nilai_buku, "+
						" date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.alamat, b.status_app, b.no_konv, xx.no_ver,xx.no_evd as evd, case when xx.no_evd <> '-' then 'Ada/Eksis' else 'Tidak dapat diverifikasi' end as kesimpulan, "+
						this.gridColumn.dbField+
						" from amu_asset a "+
						"	inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung "+
						"	inner join amu_alt_ver_d xx on xx.no_gabung = a.no_gabung "+
						this.gridColumn.dbTable+					
						" where a.no_gabung = '" + sender.cells(0,row) + "' and a.kode_lokasi = '" + this.app._lokasi + "' ", true);
						
					if (typeof data != "string"){
						if (data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];
							var kolom = [1,2,3,4,5,6,7,8,9], ix = 9;
							var data = [line.no_fa, line.no_sn, line.nama, line.nama2, line.kode_lokfa, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku)];
							for (var c in this.gridColumn.dbFieldSQL){
								data[data.length] = line[this.gridColumn.dbFieldSQL[c]];
								ix++;
								kolom[kolom.length] = ix;
							}
							this.sg.editData(row,data,kolom);
						}										
					}
				break;
				
			}		
			this.sg.onChange.set(this,"doGridChange");		
		}catch(e){
			this.sg.onChange.set(this,"doGridChange");		
			alert(e);
		}
    },    
	doEllipsClick:function(sender, col ,row){		
			try{
				switch(col)
				{
					case 0 : 
						var data = ["' '"];
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.cells(0,i) != "")
								data[data.length] = "'"+this.sg.cells(0,i)+"'";
						}
						this.standarLib.showListDataForSG(this, "Daftar Asset SAP",this.sg, this.sg.row, this.sg.col, 
														  "select a.no_gabung, a.no_fa, a.no_sn,a.nama from amu_asset a "+
														  "	inner join amu_alt_ver_d c on c.no_gabung = a.no_gabung and c.kode_lokasi = a.kode_lokasi and c.periode = a.periode and c.jns_proc = '"+this.ed_jns.getText()+"' and a.no_gabung not in ("+data+")  "+
														  "	where a.kode_lokasi = '"+this.app._lokasi+"'  and a.periode = '"+this.app._periode+"' ",
														  
														  " select count(a.no_fa)  from amu_asset a "+
														  "	inner join amu_alt_ver_d c on c.no_gabung = a.no_gabung and c.kode_lokasi = a.kode_lokasi and c.periode = a.periode and c.jns_proc = '"+this.ed_jns.getText()+"' and a.no_gabung not in ("+data+")  "+
														  "	where a.kode_lokasi = '"+this.app._lokasi+"'  and a.periode = '"+this.app._periode+"' ",													  
														  ["a.no_gabung","a.nama"],"and",["ID gabung","No Kartu Asset","No SN","Deskripsi Asset"],false);
						break;												
				}			
			}catch(e){
				alert(e);
			}
	},
	doEditChange: function(sender){	
		try{
			if (sender.getText() == "") return;
			this.ed_lokfa.setSQL("select kode_lokfa, nama from (select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R" ? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R"? this.app._kodeLokfa : "%")+"' and a.kode_induk = '00') ", 
						["kode_lokfa","nama"],false, ["Klp Aset","Nama"],"where","Data Kelompok Aset",true);
			this.gridColumn = {};		
			switch (sender.getText()){
				case "Sentral":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, ARNET, Lokasi,Kode Central,Nama Central, Area Code, FKN, Fungsi, Host, Tipe Sentral, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_netre as nmlok, b.kode_arnet as nmarnet, b.lokasi_sentral, b.kode_sentral, b.nama_sentral as nmsentral, b.kode_area, b.fkn, b.fungsi, b.host, b.tipe_sentral";
					this.gridColumn.dbTable = "	";				
					this.gridColumn.buttonStyle = [[0,22],[bsEllips,bsAuto]];				
					this.picklist = [[22],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "nmlok,nmarnet,lokasi_sentral,kode_sentral,nmsentral,kode_area,fkn,fungsi,host,tipe_sentral,status_app,evd,kesimpulan";
					this.colWidth = [[22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100,100,100,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "RCE & MUX":
				case "RMS":
				case "SKKL / SKSO":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_netre as nmlok, b.kode_tipe as nmtipe, b.kode_komp as nmkomp, b.kode_proyek as nmproyek, b.kode_link as nmlink";
					this.gridColumn.dbTable = "";				
					this.gridColumn.dbFieldSQL = "nmlok,nmtipe,nmkomp,nmproyek,nmlink,status_app,evd,kesimpulan";
					this.gridColumn.buttonStyle = [[0,16],[bsEllips,bsAuto]];
					this.picklist = [[16],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.colWidth = [[16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];				
				break;
				case "Modem Data & IMUX":		
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.no_kontrak, b.kode_vendor, b.no_kontrak2, b.status_sn";
					this.gridColumn.dbTable = "";				
					this.gridColumn.dbFieldSQL = "no_kontrak,kode_vendor,no_kontrak2,status_sn,status_app,evd,kesimpulan";
					this.gridColumn.buttonStyle = [[0,16],[bsEllips,bsAuto]];
					this.picklist = [[16],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.colWidth = [[16,15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,120,80,80, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "Satelit":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Nama Satelit, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_satelit";
					this.gridColumn.dbTable = "";
					this.gridColumn.dbFieldSQL = "kode_satelit,status_app,evd,kesimpulan";
					this.gridColumn.buttonStyle = [[0,13],[bsEllips,bsAuto]];				
					this.picklist = [[13],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.colWidth = [[13,12,11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,100,80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "Server":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,UBIS, SBIS, Nama Aplikasi/Tools, Jenis, Lokasi, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_netre,b.lokasi_server, b.ip_server, b.kode_aplikasi, b.tipe_switch, b.ip_switch";				
					this.gridColumn.dbTable = "";				
					this.gridColumn.buttonStyle = [[0,17],[bsEllips,bsAuto]];								
					this.picklist = [[17],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "kode_netre, lokasi_server, ip_server, kode_aplikasi, tipe_switch, ip_switch,status_app,evd,kesimpulan";
					this.colWidth = [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,100,80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];				
				break;
				case "RBS":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Level 1,	Level 2,Lokasi BSC/BTS, Area Operasional,Vendor,Alat Monitoring,Status BTS / BSC, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.level1, b.level2, b.lokasi_rbs, b.kode_sto, b.kode_vendor, b.kode_alat, b.sts_rbs";				
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,19],[bsEllips,bsAuto]];				
					this.picklist = [[19],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "level1,level2,lokasi_rbs,kode_sto,kode_vendor,kode_alat,sts_rbs,status_app,evd,kesimpulan";
					this.colWidth = [[19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;			
				case "STM & IMS":			
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Group Utama,Kategori,Kelompok Asset,Merk,Vendor,Lokasi/ Daerah/ STO,Nama Aset,Jumlah,Satuan,Keterangan, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_group, b.kode_klpstm, b.kode_klpfa, b.kode_merk, b.kode_vendor, b.kode_lokstm, b.kode_sto, b.jumlah, b.kode_satuan, b.keterangan ";				
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,22],[bsEllips,bsAuto]];		
					this.picklist = [[22],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "kode_group,kode_klpstm,kode_klpfa,kode_merk,kode_merk,kode_vendor, kode_lokstm, kode_sto, jumlah,keterangan,status_app,evd,kesimpulan";
					this.colWidth = [[22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100,100,100,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "LAN & WAN":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Sub UBIS/Regional, Lokasi, Nama Perangkat,IP Perangkat, Tipe Switch, IP Switch, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_ubis, b.kode_sbis, b.kode_aplikasi, b.kode_jenisapl, b.kode_lok";
					this.gridColumn.dbTable = "";							
					this.gridColumn.buttonStyle = [[0,17],[bsEllips,bsAuto]];							
					this.picklist = [[17],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "kode_ubis,kode_sbis,kode_aplikasi,kode_jenisapl,kode_lok,status_app,evd,kesimpulan";
					this.colWidth = [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "Jaringan":	
				//	
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Regional, Area, STO, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_netre, b.kode_arnet, b.kode_sto";
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,15],[bsEllips,bsAuto]];				
					this.picklist = [[15],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.colWidth = [[15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.gridColumn.dbFieldSQL = "kode_netre,kode_arnet,status_app,evd,kesimpulan";					
				break;
				case "Tanah & Bangunan":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset, No Sertifikat, Lokasi Aset (Sertifikat), Luas Tanah, Luas Bangunan, Status Dokumen, NOP,Lokasi Aset(NOP), Luas Tanah, Luas Bangunan, NKA Link Bangunan, Status Dokumen, Jenis Dokumen, No, Lokasi Sesuai Dokumen, Pelanggan, NKA Link Tanah, Status Dokumen, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "c.no_surat, cc.alamat as alm_sertifikat,cc.tanah, cc.bangun as bgn,ccc.nama as status_sertifikat, "+
							" d.no_surat as no_nop,  dd.alamat as alm_pbb,dd.tanah as tnhpbb, dd.bangun as bgnpbb, b.no_fapbb, ddd.nama as status_pbb, "+
							" b.jenis_dok, f.no_surat as no_dok,  ff.alamat, g.nama as nmcust, b.no_falain, fff.nama as status_dok";				
					this.gridColumn.dbTable = "left outer join amu_arsip c on c.no_arsip = b.no_sertifikat "+
						" left outer join amu_lokfa cc on cc.kode_lokfa = c.kode_lokfa "+
						" left outer join amu_fisik ccc on ccc.kode_fisik = c.kode_fisik "+
						" left outer join amu_arsip  d on d.no_arsip = b.no_pbb "+
						" left outer join amu_lokfa dd on dd.kode_lokfa = d.kode_lokfa "+
						" left outer join amu_fisik ddd on ddd.kode_fisik = d.kode_fisik "+
						" left outer join amu_asset e on e.no_gabung = b.no_fapbb "+
						" left outer join amu_arsip f on f.no_arsip = b.no_dok "+
						" left outer join amu_lokfa ff on ff.kode_lokfa = f.kode_lokfa "+
						" left outer join amu_fisik fff on fff.kode_fisik = f.kode_fisik "+
						" left outer join amu_cust g on g.kode_cust = b.kode_cust "+
						" left outer join amu_asset h on h.no_gabung = b.no_falain ";								
					this.gridColumn.buttonStyle = [[0,28],[bsEllips, bsEllips]];
					this.colWidth = [[28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,100,100,100,100,100,100,100,100,100,100,100,100,100,80,100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 28;
					this.gridColumn.dbFieldSQL = "no_surat,alm_sertifikat,tanah,bgn,status_sertifikat,no_nop,alm_pbb,tnhpbb,bgnpbb,no_fapbb,status_pbb,jenis_dok,no_dok,alamat,nmcust,no_falain,status_dok,status_app,evd,kesimpulan";
				break;
			}		
			this.gridColumn.dbTable = this.gridColumn.dbTable.split(",");		
			this.gridColumn.dbFieldSQL = this.gridColumn.dbFieldSQL.split(",");		
			var kolom = this.gridColumn.kolom.split(",");
			this.gridColumn.kolom = kolom;		
			this.sg.clear();
			this.sg.setColCount(kolom.length);
			this.sg.setColTitle(kolom);		
			this.sg.setColWidth(this.colWidth[0], this.colWidth[1]);
			this.sg.setButtonStyle(this.gridColumn.buttonStyle[0],this.gridColumn.buttonStyle[1]);
			this.sg.setColumnReadOnly(true,[1,2,3,4,5,6,7,8,9],[]);
			this.sg.setPickList(this.picklist[0],this.picklist[1]);
			this.evidenceField = this.gridColumn.buttonStyle[0][1];
			this.sg.appendRow();
		}catch(e){
			alert(e);
		}
	}
});
