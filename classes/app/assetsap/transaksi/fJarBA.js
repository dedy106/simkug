/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fJarBA = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fJarBA.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fJarBA";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","BA Kesimpulan Jaringan", 0);	
		try{
			uses("datePicker;saiCBBL;saiGrid;util_file;uploader;app_assetsap_transaksi_fSvrUpload;checkBox");			
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});			
			this.ed_jns = new saiCB(this,{bound:[20,4,200,20], caption:"Jenis Prosedur", change:[this,"doEditChange"]});
			this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Konversi",readOnly:true});
			this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});														
			this.ed_klpfa = new saiCBBL(this, {
				bound: [20, 30, 200, 20],
				caption: "Kelompok Aset",
				multiSelection: false,			
				sql:["select kode_klpfa, nama from amu_klp where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_klpfa","nama"],false, ["Klp Aset","Nama"],"and","Data Kelompok Aset",true],
				change:[this,"doChange"]		
			});
			
			this.ed_lokfa = new saiCBBL(this, {
				bound: [20, 4, 200, 20],
				caption: "Bus.Area",
				multiSelection: false,
				change:[this,"doChange"]			
			});
			
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 200, 20],
				caption: "Pembuat",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.app._kodeLokfa+"'", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});	
			this.cbUpload = new checkBox(this,{bound:[830,3,80,20], caption:"Upload Ulang"});
			this.ed_file = new saiLabelEdit(this, {bound:[20,6,400,20], caption:"Attachment"});
			this.upl_1 = new uploader(this,{bound:[430,6,80,20], param3: "object", param2 :"server/tmp/", param1 : "uploadTo",
					autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"});			
			this.uploader = new uploader (this,{bound:[820,6,100,18],caption:"Upload Konversi", param3: "object",		
				afterUpload: [this, "doUploadFinish"],			
				param2 :"server/tmp/",		
				param1 : "uploadTo",
				autoSubmit:true});
			
			this.bDownload = new button(this,{bound:[730,6,80,20],caption:"Download", click:[this,"doDownload"],hint:"Download format upload KKIL"});
			this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
			this.sg = new saiGrid(this.p1, {
				bound: [1, 20, 898, 180],
				colCount: 16,
				colTitle: "No Gabung, No Aset, SN,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Status",
				colWidth: [[15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [150,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]],
				colReadOnly: [true,[1,2,3,4,5,6,7,8,9],[]],
				change: [this, "doGridChange"],
				rowCount: 1,
				tag: 9,
				//readOnly:true,
				buttonStyle:[[0,10,11,12,13,14,15],[bsEllips, bsEllips, bsEllips, bsEllips, bsEllips, bsEllips, bsAuto ]],
				ellipsClick: [this,"doEllipsClick"],
				colFormat:[[6,7,8],[cfNilai, cfNilai, cfNilai]],
				picklist:[[15],[new arrayMap({items:["APP","NOTAPP"]})]]
			});		
			this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
			
			this.p2 = new panel(this,{bound:[20,12,440,200],caption:"Disiapkan Oleh"});
			this.sg2 = new saiGrid(this.p2,{bound:[1,20,438,145], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, ellipsClick:[this,"doEllipsClick"]});
			this.sgn2 = new sgNavigator(this.p2,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg2, pager:[this,"doPager"]});
			this.p3 = new panel(this,{bound:[480,12,440,200],caption:"Direview Oleh"});
			this.sg3 = new saiGrid(this.p3,{bound:[1,20,438,145], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, ellipsClick:[this,"doEllipsClick"]});
			this.sgn3 = new sgNavigator(this.p3,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg3, pager:[this,"doPager"]});
			
			this.rearrangeChild(10,23);			
			this.setTabChildIndex();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
						
			this.onClose.set(this,"doClose");				
			this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");
			this.dataGrid = new arrayMap();
			
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
			this.svrUpload.addListener(this);
			this.fileUtil.getRootDirA();			
			this.rowPerPage = 20;
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fJarBA.extend(window.childForm);
window.app_assetsap_transaksi_fJarBA.implement({
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
						this.dataKonversi = undefined;	
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						//if (this.ed_jns.getText() == "Jaringan") 
						//	var nbver = this.standarLib.noBuktiOtomatis(this.dbLib,'amu_alt_ver_m','no_ver',"VER/"+this.dp_tgl.getYear()+"/",'0000');						
						if (this.dataKonversi === undefined){
							sql.add("insert into amu_alt_konv_m (no_konv,  kode_lokasi, kode_klp, tanggal, nik_buat, periode, jns_proc, lampiran, kode_lokfa)values"+
								"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','"+this.ed_klpfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_nik1.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"', '"+this.ed_file.getText()+"','"+this.ed_lokfa.getText()+"')");
							if (this.ed_jns.getText() == "Jaringan")
								sql.add("insert into amu_alt_ver_m(no_ver,  kode_lokasi, kode_klp, tanggal, nik_buat, periode, jns_proc, kode_lokfa)values"+
									"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','-','"+this.dp_tgl.getDateString()+"','"+this.ed_nik1.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"','"+this.ed_lokfa.getText()+"')");
							var dataGrid = [];
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){//disimpan sesuai dgn yg ada aja
									dataGrid = [];
									for (var j in this.gridColumn.saveField ) dataGrid[dataGrid.length] = "'"+this.dataGrid.get(i)[this.gridColumn.saveField[j]]+"'";
									sql.add("insert into amu_alt_konv_d (no_konv,kode_lokasi, no_gabung, "+this.gridColumn.dbField+", status_app, periode,jns_proc ) "+
										" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+dataGrid.join(",")+", '"+this.app._periode+"','"+this.ed_jns.getText()+"')");
									if (this.ed_jns.getText() == "Jaringan")
										sql.add("insert into amu_alt_ver_d (no_ver,kode_lokasi, no_gabung, no_evd, no_konv, periode,jns_proc  ) "+
											" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(13,i)+"','"+this.ed_kode.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"')");
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
							//nobukti, periode, tgl, jns, lokasi,userlog, klp
						}else {
							var ttd1 = new server_util_arrayList();
							for (var i=0; i < this.sg2.getRowCount(); i++)
								if (this.sg2.rowValid(i)) ttd1.add(this.sg2.cells(0,i));
							var ttd2 = new server_util_arrayList();
							for (var i=0; i < this.sg3.getRowCount(); i++)
								if (this.sg3.rowValid(i)) ttd2.add(this.sg3.cells(0,i));
							this.svrUpload.uploadKonversi(this.ed_kode.getText(),this.app._periode,  this.dp_tgl.getDateString(), this.ed_jns.getText(), this.app._lokasi, this.app._userLog, this.ed_klpfa.getText(), this.filename, this.ed_lokfa.getText(), ttd1, ttd2, this.cbUpload.selected);
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
		if (sender == this.ed_klpfa){
			this.sg.clear(1);
		}		
		if (sender == this.ed_lokfa){
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);			
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_alt_konv_m','no_konv',"KNV/"+this.dp_tgl.getYear()+"/",'0000'));
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
					case "uploadKonversi":
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
			var dataRow = this.dataGrid.get(row, data);
			if (dataRow === undefined) dataRow = [];
			switch (col){
				case 0 :				
					var data = this.dbLib.getDataProvider("select no_fa, no_sn, nama, nama2, kode_lokfa,nilai, nilai_ap, nilai_buku, date_format(tgl_perolehan,'%d-%m-%Y') as tgl_perolehan from amu_asset a where no_gabung = '" + sender.cells(0,row) + "' and kode_lokasi = '" + this.app._lokasi + "' and periode = '"+this.app._periode+"' ", true);
					if (typeof data != "string"){
						if (data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];
							this.sg.editData(row,[line.no_fa, line.no_sn, line.nama, line.nama2, line.kode_lokfa,line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku)],
							[1,2,3,4,5,6,7,8,9]);
						}					
						for (var i=0; i < 10;i++) dataRow[i] = sender.cells(i, row);						
					}
				break;
				default:
					if (sender.columns.get(col) === undefined) return;					
					//if (sender.columns.get(col).buttonStyle == bsEllips){
					//	dataRow[col] = sender.dataFromList[0];
					//	sender.cells(col, row, sender.dataFromList[1]);																
					//}else 
					dataRow[col] = sender.cells(col, row);	
					
					if (col == 13 && this.ed_jns.getText().toLowerCase() == "sentral"){					
						var data = this.dbLib.getDataProvider("select nama,lokasi,kode_area, fkn, host, tipe, fungsi  from amu_sentral where kode_sentral ='"+sender.dataFromList[0]+"' ",true);
						if (typeof data != "string"){
							var line = data.rs.rows[0];
							if (line != undefined) this.sg.editData(row,[line.lokasi, line.kode_area, line.fkn, line.fungsi, line.host, line.tipe],[12,14,15,16,17,18]);
						}
					}else if ((col == 10 || col == 15 || col == 22) && this.ed_jns.getText().toLowerCase() == "tanah & bangunan" ){
						var data = this.dbLib.getDataProvider("select a.no_surat, b.alamat, a.tanah, a.bangun, c.nama as sts  "+
							" from amu_sentral a "+
							" inner join amu_lok b on b.kode_lokfa = a.kode_lokfa  "+
							" inner join amu_fisik c on c.kode_fisik = a.kode_fisik  "+
							" where kode_sentral ='"+sender.dataFromList[0]+"' ");
						if (typeof data != "string"){
							var line = data.rs.rows[0];
							if (line != undefined) this.sg.ediData(row,[line.no_surat, line.alamat, line.tanah, line.bangun, sts],[col + 1, col + 2, col + 3, col + 4, col + 5]);
						}
					}
				break;			
			}
			this.dataGrid.set(row, dataRow);
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
														  " left outer join amu_alt_konv_d b on b.no_gabung = a.no_gabung and b.kode_lokasi = a.kode_lokasi and a.periode = b.periode "+
														  " where b.no_gabung is null and a.kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.ed_lokfa.getText()+"'  and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.periode = '"+this.app._periode+"' and a.no_gabung not in ("+data+")",
														  "select count(a.no_fa) from amu_asset a "+
														  " left outer join amu_alt_ver_d b on b.no_gabung = a.no_gabung and b.kode_lokasi = a.kode_lokasi and a.periode = b.periode "+													  
														  " where b.no_gabung is null and a.kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.ed_lokfa.getText()+"' and kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.periode = '"+this.app._periode+"' and a.no_gabung not in ("+data+")",
														  ["a.no_gabung","a.nama"],"and",["ID gabung","No Kartu Asset","No SN","Deskripsi Asset"],false);
						break;							
					default:
						//this.standarLib.ListDataSGFilter(this, "Daftar "+this.gridColumn.kolom[col],this.sg, this.sg.row, this.sg.col, 
						//								  "select "+this.tableParam.get(trim(this.gridColumn.dbTable[col - 10]))[0]+" from "+this.gridColumn.dbTable[col - 10],
						//								  "select count(*)  from "+this.gridColumn.dbTable[col - 10],
						//								  this.tableParam.get(trim(this.gridColumn.dbTable[col - 10]))[0].split(","),"where",
						//								  this.tableParam.get(trim(this.gridColumn.dbTable[col - 10]))[1].split(","),false);
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
				/*case 10:
					this.standarLib.ListDataSGFilter(this, "Daftar Lokasi/Netre",this.sg, this.sg.row, this.sg.col, 
													  "select kode_lok, nama from amu_lok a",
													  "select count(kode_lok)  from amu_lok ",
													  ["kode_lok","nama"],"and",["Kode Lokasi","Nama"],false);
				break;
				case 11:
					this.standarLib.ListDataSGFilter(this, "Daftar Tipe",this.sg, this.sg.row, this.sg.col, 
													  "select kode_tipe, nama from amu_tipe a",
													  "select count(kode_tipe)  from amu_tipe ",
													  ["kode_tipe","nama"],"and",["Kode Tipe","Nama"],false);
				break;
				case 12:
					this.standarLib.ListDataSGFilter(this, "Daftar Komponen",this.sg, this.sg.row, this.sg.col, 
													  "select kode_komp, nama from amu_komp a",
													  "select count(kode_komp)  from amu_komp ",
													  ["kode_komp","nama"],"and",["Kode Komponen","Nama"],false);
				break;
				case 13:
					this.standarLib.ListDataSGFilter(this, "Daftar Sistra",this.sg, this.sg.row, this.sg.col, 
													  "select kode_proyek, nama from amu_proyek a",
													  "select count(kode_proyek)  from amu_proyek ",
													  ["kode_proyek","nama"],"and",["Kode Proyek","Nama"],false);
				break;
				case 14:
					this.standarLib.ListDataSGFilter(this, "Daftar Link/Point/Lokasi",this.sg, this.sg.row, this.sg.col, 
													  "select kode_link, nama from amu_link a",
													  "select count(kode_link)  from amu_link ",
													  ["kode_link","nama"],"and",["Kode Link","Nama"],false);
				break;
			}	
			* */
	},
	doEditChange: function(sender){
		try{
			if (sender.getText() == "") return;
			this.ed_klpfa.setSQL("select a.kode_klpfa, a.nama from amu_klp a "+
				" inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') b on b.kode_klpfa = a.kode_klpfa "+
				" inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
				"where a.kode_lokasi = '"+this.app._lokasi+"' ", ["a.kode_klpfa","a.nama"],false, ["Asset Class","Nama"],"and","Data Kelompok Aset",true);
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
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Kelas aset, Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, ARNET, Lokasi,Kode Central,Nama Central, Area Code, FKN, Fungsi, Host, Tipe Sentral, Status";
					this.gridColumn.dbField = "kode_netre, kode_arnet, lokasi_sentral, kode_sentral, nama_sentral, kode_area, fkn, fungsi, host, tipe_sentral";
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku, kode_netre, kode_arnet, lokasi_sentral, kode_sentral, nama_sentral, kode_area, fkn, fungsi, host, tipe_sentral";
					this.gridColumn.dbField2 = "'-' as kode_netre,'-' as  kode_arnet,'-' as  lokasi_sentral,'-' as  kode_sentral,'-' as  nama_sentral,'-' as  kode_area,'-' as  fkn,'-' as  fungsi,'-' as  host,'-' as  tipe_sentral";
					this.gridColumn.dbTable = "amu_lokasi,amu_lokasi,amu_sentral";
					this.gridColumn.saveField = [10,11,12,20];
					this.gridColumn.buttonStyle = [[0,11,12,13,14,15,16,17,18,19,20, 21],[bsEllips,bsEllips,bsEllips, bsNone, bsEllips, bsNone,bsNone, bsNone, bsNone, bsNone, bsNone,bsAuto]];
					this.picklist = [[21],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.colWidth = [[21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,100,100,100,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 150,200, 50, 150,150]];
				break;
				case "RCE & MUX":
				case "RMS":
				case "SKKL / SKSO":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Status";
					this.gridColumn.dbField = "kode_lok, kode_tipe, kode_komp, kode_proyek, kode_link";
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku,kode_lok, kode_tipe, kode_komp, kode_proyek, kode_link";
					this.gridColumn.dbField2 = "'-' as kode_lok,'-' as  kode_tipe,'-' as  kode_komp,'-' as  kode_proyek,'-' as  kode_link";
					this.gridColumn.dbTable = "amu_lok,amu_tipe, amu_komp, amu_proyek, amu_link";
					this.gridColumn.saveField = [10,11,12,13,14,15];
					this.picklist = [[15],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.gridColumn.buttonStyle = [[0,10,11,12,13,14,15],[bsEllips,bsEllips,bsEllips, bsEllips, bsEllips, bsEllips,bsAuto]];
					this.colWidth = [[15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
				break;
				case "Modem Data & IMUX":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri, Status";
					this.gridColumn.dbField = "no_kontrak, kode_vendor, no_kontrak2, status_sn";
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku,no_kontrak, kode_vendor, no_kontrak2, status_sn";
					this.gridColumn.dbField2 = "'-' as no_kontrak,'-' as  kode_vendor,'-' as  no_kontrak2,'-' as status_sn";
					this.gridColumn.dbTable = "amu_kontrak, amu_vendor, amu_kontrak";
					this.gridColumn.saveField = [10,11,12,13,14];
					this.picklist = [[14,13],[new arrayMap({items:["APP","NOTAPP"]}),new arrayMap({items:["ADA","TIDAK ADA"]})]];
					this.gridColumn.buttonStyle = [[0,10,11,12,13,14],[bsEllips,bsEllips,bsEllips,bsEllips, bsAuto,bsAuto]];
					this.colWidth = [[14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,80, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
				break;
				case "Satelit":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Nama Satelit, Status";
					this.gridColumn.dbField = "kode_satelit";
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku,kode_satelit";
					this.gridColumn.dbField2 = "'-' as kode_satelit";
					this.gridColumn.dbTable = "amu_satelit";				
					this.gridColumn.saveField = [10,11];
					this.gridColumn.buttonStyle = [[0,10,11],[bsEllips,bsEllips, bsAuto]];
					this.picklist = [[11],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.colWidth = [[11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
				break;				
				case "Server":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Sub UBIS, Lokasi Aset/Perangkat, IP Perangkat,Nama Aplikasi/Tools, Tipe Switch, IP Switch, Status";
					this.gridColumn.dbField = "kode_netre,lokasi_server, ip_server, kode_aplikasi, tipe_switch, ip_switch";
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku,kode_arnet,lokasi_server, ip_server, kode_aplikasi, tipe_switch, ip_switch";
					this.gridColumn.dbField2 = "'-' as kode_arnet,'-' as lokasi_server,'-' as  ip_server,'-' as  kode_aplikasi,'-' as  tipe_switch,'-' as  ip_switch";
					this.gridColumn.dbTable = "amu_ubis, amu_sbis, amu_aplikasi, amu_jenisapl, amu_lok";		
					this.gridColumn.saveField = [10,11,12,13,14,15,16];		
					this.gridColumn.buttonStyle = [[0,10,11,12,13,14,15,16],[bsEllips,bsEllips,bsEllips, bsEllips, bsEllips, bsEllips, bsAuto]];				
					this.picklist = [[16],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.colWidth = [[16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
				break;				
				case "RBS":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Level 1,	Level 2,Lokasi BSC/BTS, Area Operasional,Vendor,Alat Monitoring,Status BTS / BSC, Status Rekonsiliasi, Status";
					this.gridColumn.dbField = "kode_lokrbs_m, kode_lokrbs_d, kode_lok, kode_regional,  kode_vendor, kode_alat, sts_rbs,sts_rekon ";
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku,kode_lokrbs_m, kode_lokrbs_d, kode_lok, kode_regional,  kode_vendor, kode_alat, sts_rbs, sts_rekon";
					this.gridColumn.dbField2 = "'-' as kode_lokrbs_m,'-' as kode_lokrbs_d,'-' as kode_lok,'-' as kode_regional,'-' as kode_vendor,'-' as kode_alat,'-' as sts_rbs,'-' as sts_rekon ";
					this.gridColumn.dbTable = "amu_lokrbs_m, amu_lokrbs_d, amu_lok, amu_regional, amu_vendor, amu_alat";
					this.gridColumn.saveField = [10,11,12,13,14,15,16,17,18];
					this.gridColumn.buttonStyle = [[0,10,11,12,13,14,15,16,17,18],[bsEllips,bsEllips,bsEllips, bsEllips, bsEllips, bsEllips, bsEllips, bsAuto,bsNone,bsAuto]];
					this.picklist = [[18,17],[new arrayMap({items:["APP","NOTAPP"]}),new arrayMap({items:["0","1"]})]];
					this.colWidth = [[18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,130,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
				break;				
				case "STM & IMS":				
				//
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Kelas Aset,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Group Utama,Kategori,Kelompok Asset,Merk,Vendor,Lokasi/ Daerah/ STO,Nama Aset,Jumlah,Satuan,Keterangan, Status";
					this.gridColumn.dbField = "kode_group, kode_klpstm, kode_klpfa, kode_merk, kode_vendor, kode_lokstm, kode_sto, jumlah, kode_satuan, keterangan  ";				
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku,kode_group, kode_klpstm, kode_klpfa, kode_merk, kode_vendor, kode_lokstm, kode_sto, jumlah, kode_satuan, keterangan";
					this.gridColumn.dbField2 = "'-' as kode_group,'-' as  kode_klpstm,'-' as  kode_klpfa,'-' as  kode_merk,'-' as  kode_vendor,'-' as  kode_lokstm,'-' as  kode_sto,'-' as  jumlah,'-' as  kode_satuan,'-' as  keterangan  ";				
					this.gridColumn.dbTable = "amu_group, amu_klpstm, amu_klp, amu_merk, amu_vendor, amu_lokstm, amu_sto, -, amu_satuan,-";
					this.gridColumn.saveField = [10,11,12,13,14,15,16,17,18,19,20];
					this.gridColumn.buttonStyle = [[0,10,11,12,13,14,15,16,17,18,19,20],[bsEllips,bsEllips,bsEllips, bsEllips, bsEllips, bsEllips, bsEllips, bsEllips, bsNone, bsEllips, bsNone, bsAuto]];
					this.picklist = [[20],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.colWidth = [[20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,100,100,100,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
				break;				
				case "LAN & WAN":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Sub UBIS/Regional, Lokasi, Nama Perangkat,IP Perangkat, Tipe Switch, IP Switch, Status";
					this.gridColumn.dbField = "lokasi_server,nama_sentral, ip_server, tipe_switch, ip_switch";				
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku,lokasi_server,nama_sentral, ip_server, tipe_switch, ip_switch";
					this.gridColumn.dbField2 = "'-' as lokasi_server,'-' as nama_sentral,'-' as ip_server,'-' as tipe_switch,'-' as ip_switch";				
					this.gridColumn.dbTable = "amu_ubis, amu_sbis, amu_aplikasi, amu_jenisapl, amu_lok";		
					this.gridColumn.saveField = [10,11,12,13,14,15];		
					this.gridColumn.buttonStyle = [[0,10,11,12,13,14,15],[bsEllips,bsEllips,bsEllips, bsEllips, bsEllips, bsEllips, bsAuto]];				
					this.picklist = [[15],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.colWidth = [[15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
				break;
				case "Jaringan":	
				//	
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,location,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Regional, Area, STO/MDF, Ref. Evidence, Status";
					this.gridColumn.dbField = "kode_netre, kode_arnet, kode_sto ";				
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,tgl_perolehan, nilai, nilai_ap, nilai_buku,kode_netre, kode_arnet, kode_sto";
					this.gridColumn.dbField2 = "'-' as kode_netre,'-' as kode_arnet,'-' as kode_sto ";				
					this.gridColumn.dbTable = "amu_regional, amu_area, amu_sto";
					this.gridColumn.saveField = [11,12,13,14,15];
					this.gridColumn.buttonStyle = [[0,11,12,13,14,15],[bsEllips,bsEllips,bsEllips, bsEllips,bsNone, bsAuto]];
					this.picklist = [[15],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.colWidth = [[15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,150,100, 80, 80, 120, 120, 120, 80,100, 80, 200, 200, 50, 150,150]];
				break;
				case "Tanah & Bangunan":								
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku, No Sertifikat, Lokasi Aset (Sertifikat), Luas Tanah, Luas Bangunan, Status Dokumen, NOP,Lokasi Aset(NOP), Luas Tanah, Luas Bangunan, NKA Link Bangunan, Status Dokumen, Jenis Dokumen, No, Lokasi Sesuai Dokumen, Pelanggan, NKA Link Tanah, Status Dokumen, Status";
					this.gridColumn.dbField = "no_sertifikat, status_sertifikat, no_pbb,  no_fapbb, status_pbb, jenis_dok, no_dok,  lokasi, no_cust, no_falain, status_dok";				
					this.gridColumn.dbTable = "amu_arsip,-,-,-,-,amu_arsip,-,-,-,amu_asset,-,-,amu_arsip,-,amu_cust,amu_asset,-";
					//No Sertifikat, Lokasi Aset (Sertifikat), Luas Tanah, Luas Bangunan, Status Dokumen, NOP,Lokasi Aset(NOP), Luas Tanah, Luas Bangunan, NKA Link Bangunan, Status Dokumen, Jenis Dokumen, No, Lokasi Sesuai Dokumen, Pelanggan, NKA Link Tanah
					this.gridColumn.saveField = [10,14,15,16,19,20,21,22,23,24,25,26,27];
					this.gridColumn.buttonStyle = [[0,10,14,15,16,19,20,21,22,24,25,26,27],[bsEllips, bsEllips, bsAuto, bsEllips, bsEllips,bsEllips, bsEllips,bsEllips, bsEllips, bsEllips,bsEllips,bsAuto,bsAuto]];
					this.picklist = [[13],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.colWidth = [[13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
				break;
			}		
			this.gridColumn.dbTable = this.gridColumn.dbTable.split(",");		
			var kolom = this.gridColumn.kolom.split(",");
			this.gridColumn.kolom = kolom;
			this.sg.clear();
			this.sg.setColCount(kolom.length);
			this.sg.setColTitle(kolom);	
			this.sg.setColFormat([7,8,9],[cfNilai, cfNilai, cfNilai]);
			this.sg.setColWidth(this.colWidth[0], this.colWidth[1]);
			this.sg.setButtonStyle(this.gridColumn.buttonStyle[0],this.gridColumn.buttonStyle[1]);
			this.sg.setPickList(this.picklist[0], this.picklist[1]);
			this.sg.setColumnReadOnly(true,[1,2,3,4,5,6,7,8,9],[]);
			this.sg.appendRow();
		}catch(e){
			alert(e);
		}
	},
	doUploadFinish: function(sender, result, data, filename){
		try{				
			if (result){				
				if (sender == this.uploader){
					this.dataKonversi = filename;
					this.svrUpload.setFile(filename,this.rootDir+"/"+sender.param2+urldecode(data));			
				}
				if (sender == this.upl_1){
					this.ed_file.setText(filename);
					//this.svrUpload2.setFile(filename,this.rootDir+"/"+sender.param2+urldecode(data));
					this.filename = filename +";"+urldecode(data);
				}
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	},
	tampilGrid: function(result){
		this.dataKonv = undefined;
		var line;
		this.sg.clear();
		var nka = [];
		for (var i in result.rows){
			line  = result.rows[i];
			data = [(line["no kartu aset"] || line["nka"]) + (line["sub no"] || line["sub nbr"] || line["sn"])];
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
					data[data.length] = line[c] == "" ? "-" : line[c];					
				//}				
			}
			if (c != "status_app"){
				if (data[data.length - 1] != "-")
					data[data.length] = "APP";
				else data[data.length] = "NOTAPP";
			}
			this.sg.appendData(data);			
			nka[nka.length] = "'" +data[0] +"'";
		}				
		this.sg.setNoUrut(parseFloat(result.start));
		/*var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.nama, a.nama2 from amu_asset a "+
				"inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') b on b.kode_klpfa = a.kode_klpfa "+
				" inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
				"where a.no_gabung in ("+nka+") ",true) ;
		*/			
	},
	doPager: function(sender, page){
		if (this.dataKonv == undefined){
			this.svrUpload.getData(page);	
		}else {
			this.tampil(page);
		}
	},
	tampil: function(page){
		
		var start = (page - 1) * this.rowPerPage;
		var finish = (start + this.rowPerPage > this.dataKonv.rows.length ? this.dataKonv.rows.length : start + this.rowPerPage);
		var line;
		this.sg.clear();
		for (var i = start; i < finish; i++){
			line = this.dataKonv.rows[i];
			this.sg.appendData([]);
		}
	},
	checkBusA: function(){
		this.svrUpload.checkBusA(this.ed_lokfa.getText(),'-');
	},
	doTampil : function(sender){		
		var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, a.nama2, a.nama, a.kode_lokfa,a.nilai, a.nilai_ap, a.nilai_buku, "+
			" date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.alamat, '-' as status_app, "+
			this.gridColumn.dbField2+
			" from amu_asset a "+
			"	left outer join amu_alt_konv_d b on b.no_gabung = a.no_gabung "+
			"  inner join (select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+this.ed_lokfa.getText()+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00'  "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+this.ed_lokfa.getText()+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_induk = '00' and a.kode_lokfa like '"+this.ed_lokfa.getText()+"' and a.kode_induk = '00') zz on zz.kode_lokfa = a.kode_lokfa  "+
			" where a.kode_lokasi = '" + this.app._lokasi + "' and b.no_gabung is null", true);
		this.dataKonv = data.rs;
		this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / this.rowPerPage));
		this.sgn.rearrange();
		this.doPager(this.sgn,1);
	},
	doDownload: function(sender){		
		downloadFile(this.fileUtil.getFileContents(this.rootDir+"/docs/template/"+this.ed_jns.getText().replace("/","-").toLowerCase()+".xls"));
	}
	
});

/*
 * this.tableParam = new arrayMap();
			this.tableParam.set("amu_lok",["kode_lok, nama","Kode Lokasi, Nama"]);		
			this.tableParam.set("amu_lokasi",["kode_lokfa, nama","Bus.Area, Nama"]);		
			this.tableParam.set("amu_tipe",["kode_tipe, nama","Kode Tipe, Nama"]);
			this.tableParam.set("amu_komp",["kode_komp, nama","Kode Komponen, Nama"]);
			this.tableParam.set("amu_proyek",["kode_proyek, nama","No Proyek, Nama"]);
			this.tableParam.set("amu_link",["kode_link, nama","Kode Link, Nama"]);
			this.tableParam.set("amu_area",["kode_area, nama","Kode Area, Nama"]);
			this.tableParam.set("amu_satelit",["kode_satelit, nama","Kode Satelit, Nama"]);
			this.tableParam.set("amu_ubis",["kode_ubis, nama", "Kode UBIS, Nama"]);
			this.tableParam.set("amu_sbis",["kode_sbis, nama","Kode SBIS, Nama"]);
			this.tableParam.set("amu_aplikasi",["kode_aplikasi, nama","Kode Aplikasi, Nama"]);
			this.tableParam.set("amu_jenisapl",["kode_jenis, nama", "Kode Jenis, Nama"]);
			this.tableParam.set("amu_lokrbs_m",["kode_lokrbs_m, nama", "Kode Lokasi, Nama"]);
			this.tableParam.set("amu_lokrbs_d",["kode_lokrbs_d, nama", "Kode Sub Lokasi, Nama"]);
			this.tableParam.set("amu_regional",["kode_regional, nama", "Kode Regional, Nama"]);
			this.tableParam.set("amu_vendor",["kode_vendor, nama", "Kode Vendor, Nama"]);
			this.tableParam.set("amu_alat",["kode_alat, nama", "Kode Alat, Nama"]);
			this.tableParam.set("amu_group",["kode_group, nama", "Kode Group, Nama"]);
			this.tableParam.set("amu_klpstm",["kode_klpstm, nama", "Kode Klp(STM), Nama"]);
			this.tableParam.set("amu_klp",["kode_klpfa, nama", "Kode Klp Aset, Nama"]);
			this.tableParam.set("amu_merk",["kode_merk, nama", "Kode Merk, Nama"]);
			this.tableParam.set("amu_lokstm",["kode_lokstm, nama", "Kode Lokasi(STM), Nama"]);
			this.tableParam.set("amu_sto",["kode_sto, nama", "Kode STO, Nama"]);
			this.tableParam.set("amu_satuan",["kode_satuan, nama", "Kode Satuan, Nama"]);			
			this.tableParam.set("amu_arnet",["kode_arnet, nama", "Kode ARNET, Nama"]);			
			this.tableParam.set("amu_sentral",["kode_sentral, nama","Kode Central, Nama"]);			
			this.tableParam.set("amu_kontrak",["no_kontrak, keterangan", "No Kontrak, Keterangan"]);			
			this.tableParam.set("amu_arsip",["no_arsip,no_surat, nama","No Arsip, No Sertifikat, Nama"]);			
			this.tableParam.set("amu_asset",["no_gabung, no_fa, no_sn, nama","No Gabung, NKA, SN, Nama"]);
 * */
