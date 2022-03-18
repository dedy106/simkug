/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fBAAlt = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fBAAlt.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fBAAlt";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","BA Verifikasi / Kesimpulan", 0);	
		uses("datePicker;saiCBBL;saiGrid;app_assetsap_transaksi_fSvrUpload;util_file;checkBox");
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
		this.cbUpload = new checkBox(this,{bound:[830,30,80,20], caption:"Upload Ulang"});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pembuat",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});
		this.ed_nover = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "No Verifikasi",
			multiSelection: false,
			sql:["select no_ver  from amu_alt_ver_m where kode_lokasi = '"+this.app._lokasi+"' ", ["no_ver"],false, ["No Verifikasi"],"and","Data Verifikasi",true],
			change:[this,"doChange"]		
		});		
		this.bTampil = new button(this, {
			bound:[720,4,80,20],
			caption: "Tampil",
			click: [this, "doTampil"]
		});
		this.uploader = new uploader (this,{bound:[820,4,100,18],caption:"Upload Data BA", param3: "object",		
				afterUpload: [this, "doUploadFinish"],			
				param2 :"server/tmp/",		
				param1 : "uploadTo",
				autoSubmit:true});		
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
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
		this.p2 = new panel(this,{bound:[20,12,440,200],caption:"Disiapkan Oleh"});
		this.sg2 = new saiGrid(this.p2,{bound:[1,20,438,145], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, change:[this,"doGridChange2"], ellipsClick:[this,"doEllipsClick"]});
		this.sgn2 = new sgNavigator(this.p2,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg2, pager:[this,"doPager"]});
		this.p3 = new panel(this,{bound:[480,12,440,200],caption:"Direview Oleh"});
		this.sg3 = new saiGrid(this.p3,{bound:[1,20,438,145], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, change:[this,"doGridChange2"], ellipsClick:[this,"doEllipsClick"]});
		this.sgn3 = new sgNavigator(this.p3,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg3, pager:[this,"doPager"]});
		
		this.rearrangeChild(10,23);			
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");		
		this.dataGrid = new arrayMap();
		this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
		this.svrUpload.addListener(this);
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.fileUtil.getRootDirA();	
		this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");
		this.doClick();
	}
};
window.app_assetsap_transaksi_fBAAlt.extend(window.childForm);
window.app_assetsap_transaksi_fBAAlt.implement({
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
						this.dataKonv = undefined;
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){						
						this.doClick();
						if (this.dataKonversi === undefined){							
							sql.add("insert into amu_alt_baver_m(no_ba,  kode_lokasi, kode_klp, tanggal, nik_buat, jns_proc,periode, kode_lokfa)values"+
								"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','-','"+this.dp_tgl.getDateString()+"','"+this.ed_nik1.getText()+"','"+this.ed_jns.getText()+"','"+this.app._periode+"','"+ this.ed_lokfa.getText()+"')");
								
							if (this.dataKo === undefined){
								for (var i=0;i < this.sg.getRowCount();i++){
									if (this.sg.rowValid(i)){
										sql.add("insert into amu_alt_baver_d (no_ba,kode_lokasi, no_gabung, kesimpulan, jns_proc, periode  ) "+
											" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(this.evidenceField,i)+"','"+this.ed_jns.getText()+"','"+this.app._periode+"')");
									}
								}
							}else {
								var line;
								for (var i in this.dataKonv.rows){
									line = this.dataKonv.rows[i];
									sql.add("insert into amu_alt_baver_d (no_ba,kode_lokasi, no_gabung, kesimpulan, jns_proc, periode  ) "+
											" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+line.no_gabung+"','"+line.kesimpulan+"','"+this.ed_jns.getText()+"','"+this.app._periode+"')");
								}
							}
							for (var i=0; i < this.sg2.getRowCount(); i++){
								if (this.sg2.rowValid(i)){
									sql.add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('"+this.ed_kode.getText()+"',0,'"+this.sg2.cells(0,i)+"',"+i+")");
								}
							}
							for (var i=0; i < this.sg3.getRowCount(); i++){
								if (this.sg3.rowValid(i)){
									sql.add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('"+this.ed_kode.getText()+"',1,'"+this.sg3.cells(0,i)+"',"+i+")");
								}
							}
							this.dbLib.execArraySQL(sql);
						}else  {						
							var ttd1 = new server_util_arrayList();
							for (var i=0; i < this.sg2.getRowCount(); i++)
								if (this.sg2.rowValid(i)) ttd1.add(this.sg2.cells(0,i));
							var ttd2 = new server_util_arrayList();
							for (var i=0; i < this.sg3.getRowCount(); i++)
								if (this.sg3.rowValid(i)) ttd2.add(this.sg3.cells(0,i));
							this.svrUpload.uploadBA(this.ed_kode.getText(),this.app._periode,  this.dp_tgl.getDateString(), this.ed_jns.getText(), this.app._lokasi, this.app._userLog, "-", this.filename, this.ed_lokfa.getText(), ttd1, ttd2, this.cbUpload.selected );
						}
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
			this.ed_nover.setSQL("select no_ver  from amu_alt_ver_m where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.ed_lokfa.getText()+"' and jns_proc = '"+this.ed_jns.getText()+"' ", ["no_ver"],false, ["No Verifikasi"],"and","Data Verifikasi",true);
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
							if (line.nama.toLowerCase().indexOf("modem") == -1 && line.nama.toLowerCase() != "jaringan")
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
			if(methodName == "getRootDir"){				
				this.rootDir = result;			
				this.separator = "/";
				this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);			
				this.onClose.set(this,"doClose");									
			}
        }
        try{
			if (sender == this.svrUpload){				
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
					case "checkBusA":												
						if (result.getLength() > 0){
							system.alert(this, "Ada data upload yg beda dengan Bus. Area "+this.ed_lokfa.getText(),"data ba yg salah");
						}
					break;				
					case "uploadBA":
						if (result.toLowerCase().search("error") == -1)					
						{							
							system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")","");
						}else system.info(this,result,"");
					break;
				}
			}
		}catch(e){
			system.alert(this, e, "");
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
				case this.evidenceField:
					this.dataKonv.rows[(this.page - 1) * this.rowPerPage + row].kesimpulan = this.sg.cells(col, row);
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
				if (sender == this.sg){
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
				}
				if (sender == this.sg2 || sender == this.sg3){
					this.standarLib.showListDataForSG(this, "Daftar Karyawan",sender, sender.row, sender.col, 
														  "select nik, nama from amu_karyawan ",
														  "select count(*) from amu_karyawan ",
														  ["nik","nama"],"where",["NIK","Nama"],false);
				}		
			}catch(e){
				alert(e);
			}
			
	},
	doEditChange: function(sender){	
		try{
			if (sender.getText() == "") return;
			this.ed_nover.setSQL("select no_ver  from amu_alt_ver_m where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.ed_lokfa.getText()+"' and jns_proc = '"+this.ed_jns.getText()+"' ", ["no_ver"],false, ["No Verifikasi"],"and","Data Verifikasi",true);
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
					this.dbField = "no_gabung,no_fa,no_sn,nama,kode_klpfa,nama2,kode_lokfa,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Kelas Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, ARNET, Lokasi,Kode Central,Nama Central, Area Code, FKN, Fungsi, Host, Tipe Sentral, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_netre as nmlok, b.kode_arnet as nmarnet, b.lokasi_sentral, b.kode_sentral, b.nama_sentral as nmsentral, b.kode_area, b.fkn, b.fungsi, b.host, b.tipe_sentral";
					this.gridColumn.dbTable = "	";				
					this.gridColumn.buttonStyle = [[0,23],[bsEllips,bsAuto]];
					this.picklist = [[23],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "nmlok,nmarnet,lokasi_sentral,kode_sentral,nmsentral,kode_area,fkn,fungsi,host,tipe_sentral,status_app,evd,kesimpulan";
					this.colWidth = [[23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100,100,100,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 150,200, 50, 150,150]];					
				break;
				case "RCE & MUX":
				case "RMS":
				case "SKKL / SKSO":
					this.dbField = "no_gabung,no_fa,no_sn,nama,nama2,kode_lokfa,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_netre as nmlok, b.kode_tipe as nmtipe, b.kode_komp as nmkomp, b.kode_proyek as nmproyek, b.kode_link as nmlink";
					this.gridColumn.dbTable = "";				
					this.gridColumn.dbFieldSQL = "nmlok,nmtipe,nmkomp,nmproyek,nmlink,status_app,evd,kesimpulan";
					this.gridColumn.buttonStyle = [[0,17],[bsEllips,bsAuto]];
					this.picklist = [[17],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.colWidth = [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,80,100, 100,100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];				
				break;
				case "Modem Data & IMUX":		
					this.dbField = "no_gabung,no_fa,no_sn,nama,nama2,kode_lokfa,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.no_kontrak, b.kode_vendor, b.no_kontrak2, b.status_sn";
					this.gridColumn.dbTable = "";				
					this.gridColumn.dbFieldSQL = "no_kontrak,kode_vendor,no_kontrak2,status_sn,status_app,evd,kesimpulan";
					this.gridColumn.buttonStyle = [[0,16],[bsEllips,bsAuto]];
					this.picklist = [[16],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.colWidth = [[16,15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,120,80,80, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "Satelit":
					this.dbField = "no_gabung,no_fa,no_sn,nama,nama2,kode_lokfa,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Nama Satelit, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_satelit";
					this.gridColumn.dbTable = "";
					this.gridColumn.dbFieldSQL = "kode_satelit,status_app,evd,kesimpulan";
					this.gridColumn.buttonStyle = [[0,13],[bsEllips,bsAuto]];				
					this.picklist = [[13],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.colWidth = [[13,12,11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,100,80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "Server":				
					this.dbField = "no_gabung,no_fa,no_sn,nama,nama2,kode_lokfa,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,UBIS, SBIS, Nama Aplikasi/Tools, Jenis, Lokasi, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_netre,b.lokasi_server, b.ip_server, b.kode_aplikasi, b.tipe_switch, b.ip_switch";				
					this.gridColumn.dbTable = "";				
					this.gridColumn.buttonStyle = [[0,17],[bsEllips,bsAuto]];								
					this.picklist = [[17],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "kode_netre, lokasi_server, ip_server, kode_aplikasi, tipe_switch, ip_switch,status_app,evd,kesimpulan";
					this.colWidth = [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,100,80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];				
				break;
				case "RBS":				
					this.dbField = "no_gabung,no_fa,no_sn,nama,nama2,kode_lokfa,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Level 1,	Level 2,Lokasi BSC/BTS, Area Operasional,Vendor,Alat Monitoring,Status BTS / BSC, Status Rekonsiliasi, status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.level1, b.level2, b.lokasi_rbs, b.kode_sto, b.kode_vendor, b.kode_alat, b.sts_rbs";				
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,19],[bsEllips,bsAuto]];				
					this.picklist = [[19],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "level1,level2,lokasi_rbs,kode_sto,kode_vendor,kode_alat,sts_rbs,status_app,evd,kesimpulan";
					this.colWidth = [[19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;			
				case "STM & IMS":			
					this.dbField = "no_gabung,no_fa,no_sn,nama,nama2,kode_klpfa,kode_lokfa,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Kelas Aset,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Group Utama,Kategori,Kelompok Asset,Merk,Vendor,Lokasi/ Daerah/ STO,Nama Aset,Jumlah,Satuan,Keterangan, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_group, b.kode_klpstm, b.kode_klpfa, b.kode_merk, b.kode_vendor, b.kode_lokstm, b.kode_sto, b.jumlah, b.kode_satuan, b.keterangan ";				
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,23],[bsEllips,bsAuto]];		
					this.picklist = [[23],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "kode_group,kode_klpstm,kode_klpfa,kode_merk,kode_merk,kode_vendor, kode_lokstm, kode_sto, jumlah,keterangan,status_app,evd,kesimpulan";
					this.colWidth = [[23,22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100,100,100,100,100,100, 100, 100, 80, 80, 100,120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "LAN & WAN":
					this.dbField = "no_gabung,no_fa,no_sn,nama,nama2,kode_lokfa,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Sub UBIS/Regional, Lokasi, Nama Perangkat,IP Perangkat, Tipe Switch, IP Switch, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_ubis, b.kode_sbis, b.kode_aplikasi, b.kode_jenisapl, b.kode_lok";
					this.gridColumn.dbTable = "";							
					this.gridColumn.buttonStyle = [[0,17],[bsEllips,bsAuto]];							
					this.picklist = [[17],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.gridColumn.dbFieldSQL = "kode_ubis,kode_sbis,kode_aplikasi,kode_jenisapl,kode_lok,status_app,evd,kesimpulan";
					this.colWidth = [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];					
				break;
				case "Jaringan":	
					this.dbField = "no_gabung,no_fa,no_sn,nama,nama2,kode_lokfa,ref2,tgl_perolehan,nilai,nilai_ap,nilai_buku";
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Location,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Regional, Area, STO, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "b.kode_netre, b.kode_arnet, b.kode_sto";
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,16],[bsEllips,bsAuto]];				
					this.picklist = [[16],[new arrayMap({items:["Ada/Eksis","Tidak dapat diverifikasi"]})]];
					this.colWidth = [[16,15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100, 80, 80, 120, 120, 120, 80,150, 80, 200, 200, 50, 150,150]];
					this.gridColumn.dbFieldSQL = "kode_netre,kode_arnet,status_app,evd,kesimpulan";					
				break;
				case "Tanah & Bangunan":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Jenis Dokumen, No Dokumen, Status Dokumen, Lokasi, Luas Tanah, Luas Bangunan, NKA Link, Keterangan, Status, Ref. Evidence, Kesimpulan";
					this.gridColumn.dbField = "jns_dok,no_dok,sts_dok,lokasi_dok,luastnh_dok,luasbg_dok,nka_dok,ket_dok";				
					this.gridColumn.dbTable = "";								
					this.gridColumn.buttonStyle = [[0,20],[bsEllips, bsAuto]];
					this.colWidth = [[20,19,18,17,16,15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,100,100,100,100,100,100,100,100,100,100,100,100,100,80,100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 20;
					this.gridColumn.dbFieldSQL = "jns_dok,no_dok,sts_dok,lokasi_dok,luastnh_dok,luasbg_dok,nka_dok,ket_dok,evd,kesimpulan";
				break;
			}		
			this.gridColumn.dbTable = this.gridColumn.dbTable.split(",");		
			this.dbField += "," + this.gridColumn.dbFieldSQL;
			this.gridColumn.dbFieldSQL = this.gridColumn.dbFieldSQL.split(",");		
			this.dbField = this.dbField.split(",");
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
	},
	doTampil : function(sender){				
		var data = this.dbLib.getDataProvider("select a.no_gabung,a.no_fa, a.no_sn, a.nama2, a.nama,a.kode_klpfa, a.ref1, a.ref2, a.kode_lokfa,a.nilai, a.nilai_ap, a.nilai_buku, "+
			" date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.alamat, b.status_app, b.no_konv, xx.no_ver,xx.no_evd as evd, case when xx.no_evd <> '-' then 'Ada/Eksis' else 'Tidak dapat diverifikasi' end as kesimpulan, "+
			this.gridColumn.dbField+
			" from amu_asset a "+
			"	inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung and a.periode = b.periode "+
			"	inner join amu_alt_ver_d xx on xx.no_gabung = a.no_gabung and xx.periode = a.periode "+
			" 	inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
			"	left outer join amu_alt_baver_d zz on zz.no_gabung = a.no_gabung and zz.periode = a.periode "+			
			"   left outer join (select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa and x.kode_lokasi = a.kode_lokasi and x.periode = '"+this.app._periode+"' "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF' and periode = '"+this.app._periode+"') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00'  "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa and x.kode_lokasi = a.kode_lokasi and x.periode = '"+this.app._periode+"' "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF' and periode = '"+this.app._periode+"') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa and x.kode_lokasi = a.kode_lokasi and x.periode = '"+this.app._periode+"' "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF' and periode = '"+this.app._periode+"') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_induk = '00' and a.kode_induk = '00') zx on zx.kode_lokfa = a.kode_lokfa  "+
			" where a.kode_lokasi = '" + this.app._lokasi + "' and a.periode = '"+this.app._periode+"'and xx.no_ver = '"+this.ed_nover.getText()+"' and zz.no_gabung is null", true);		
		
		this.dataKonv = data.rs;
		this.rowPerPage = 20;
		this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / this.rowPerPage));		
		this.sgn.rearrange();
		this.tampil(1);
	},
	doUploadFinish: function(sender, result, data, filename){
		try{	
			if (result){
				this.dataKonversi = filename;
				this.svrUpload.setFile(filename,this.rootDir+"/"+sender.param2+urldecode(data));			
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	},
	tampilGrid: function(result){
		var line;
		this.sg.clear();
		var nka = [];
		for (var i in result.rows){
			line  = result.rows[i];
			data = [line["no kartu aset"] + line["sub no"]];			
			/*data[data.length] = line["no kartu aset"];
			data[data.length] = line["sub no"];
			data[data.length] = line["deskripsi aset"];
			data[data.length] = line["deskripsi alamat"] || line["lokasi"];
			data[data.length] = line["bus area"] || line["ba"];
			data[data.length] = line["cap date"];
			data[data.length] = floatToNilai(line["nilai perolehan"]);
			data[data.length] = floatToNilai(line["akumulasi penyusutan"]);
			data[data.length] = floatToNilai(line["nilai buku"]);			
			* */			
			
			for (var c in line){												
				//if (c !="no kartu aset" && c != "sub no" && c != "ba" && c != "bus area" && c != "deskripsi aset" && trim(c) != "kelas aset" && c != "deskripsi alamat" && trim(c) != "cap date" && trim(c) != "nilai perolehan" && trim(c) != "nilai buku" && trim(c) != "akumulasi penyusutan"){
					if (c.indexOf("evidence") > -1)
						data[data.length] = line[c] == "-" ? "NOTAPP" : "APP";
					data[data.length] = line[c] == "" ? "-" : line[c];					
				//}						
			}								
			if (c.indexOf("evidence") > -1){
				data[data.length] = line[c] != "-" ? "Ada/Eksis" : "Tidak Dapat Diverifikasi";
			}
			this.sg.appendData(data);			
			nka[nka.length] = "'" +data[0] +"'";
		}
		this.sg.setNoUrut(parseFloat(result.start));
		var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.nama, a.nama2 from amu_asset a "+
				"inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') b on b.kode_klpfa = a.kode_klpfa "+
				" inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
				"where a.no_gabung in ("+nka+") ",true) ;
		if (data.rs.rows.length > 0){
			
		}
	},
	doPager: function(sender, page){
		try{
			this.page = page;
			if (this.dataKonv != undefined)
				this.tampil(page);
			else
				this.svrUpload.getData(page);
		}catch(e){
			alert(e);
		}
	},
	checkBusA: function(){
		this.svrUpload.checkBusA(this.ed_lokfa.getText(),'-');
	},
	tampil: function(page){	
		this.page = page;	
		var start = (page - 1) * this.rowPerPage;
		var finish = (start + this.rowPerPage > this.dataKonv.rows.length ? this.dataKonv.rows.length : start + this.rowPerPage);
		var line;
		this.sg.clear();
		for (var i = start; i < finish; i++){
			line = this.dataKonv.rows[i];
			data = [];
			for (var j in this.dbField) data[data.length] = line[trim(this.dbField[j])];
			this.sg.appendData(data);
		}
		this.sg.setNoUrut(start);
	},
	doGridChange2 : function(sender, col, row){
		if (col == 0){
			sender.cells(1,row, this.app._listNIK.get(sender.cells(0,row)) );	
		}		
	}
});
