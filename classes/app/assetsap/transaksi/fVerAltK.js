/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fVerAltK = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fVerAltK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fVerAltK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Verifikasi Data Aset:Hapus Data Upload", 0);	
		uses("datePicker;saiCBBL;saiGrid;util_file;app_assetsap_transaksi_fSvrUpload;checkBox");
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,200,20],caption:"No Verifikasi",readOnly:true, change:[this,"doChange"]});		
		this.ed_jns = new saiCB(this,{bound:[20,4,200,20], caption:"Jenis Prosedur", change:[this,"doEditChange"]			
		});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Bus. Area",
			multiSelection: false,			
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_klpfa","nama"],false, ["Klp Aset","Nama"],"and","Data Kelompok Aset",true],
			change:[this,"doChange"]		
		});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pembuat",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.app._kodeLokfa+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});		
		this.uploader = new uploader (this,{bound:[820,3,100,18],caption:"Upload Verifikasi", param3: "object",		
				afterUpload: [this, "doUploadFinish"],			
				param2 :"server/tmp/",		
				param1 : "uploadTo",
				autoSubmit:true});
		this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 18,
			colTitle: "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Nama Link/Point/Lokasi, Ref. Evidence, Preview",
			colWidth: [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [150,150,150,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]],
			colReadOnly: [true,[1,2,3,4,5,6,7,8,9],[]],
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9,
			//readOnly:true,
			click:[this,"doSgClick"], 
			buttonStyle:[[0,16],[bsEllips, bsEllips]],
			ellipsClick: [this,"doEllipsClick"],
			colFormat:[[6,7,8,17],[cfNilai, cfNilai, cfNilai, cfButton]]
		});		
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsTransNav, grid:this.sg});
		
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
		this.dataGrid = new arrayMap();
		this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");
		
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
		this.svrUpload.addListener(this);
		this.fileUtil.getRootDirA();	
	}
};
window.app_assetsap_transaksi_fVerAltK.extend(window.childForm);
window.app_assetsap_transaksi_fVerAltK.implement({
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
				case "hapus" :
					sql.add("delete from amu_alt_ver_d where no_konv = '"+ this.ed_kode.getText()+"' ");
					sql.add("delete from amu_alt_ttd where no_bukti = '"+ this.ed_kode.getText()+"' ");
					sql.add("delete from amu_alt_ver_m where no_konv = '"+ this.ed_kode.getText()+"' ");
					this.dbLib.execArraySQL(sql);
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
		if (sender == this.ed_kode){	
			try{
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:["select a.kode_klp, date_format(a.tanggal,'%d-%m-%Y') as tgl, a.nik_buat, a.lampiran, d.no_evd "+
					"	"+this.gridColumn.dbField3+
					"	from amu_alt_ver_m a "+
					" inner join amu_alt_ver_d d on d.no_ver = a.no_ver "+
					" inner join amu_alt_konv_d b on d.no_gabung = b.no_gabung "+
					"	inner join amu_asset c on d.no_gabung = b.no_gabung "+
					"where a.no_ver = '"+this.ed_kode.getText()+"' ",
					"select a.nik, b.nama, a.status from amu_alt_ttd a inner join amu_karyawan b on b.nik = a.nik order by a.status, a.no_urut"]}),true);
				setTipeButton(tbAllFalse);
				
				if (typeof data != "string"){
					var line;
					this.sg.clear();
					var field = this.gridColumn.dbField3.split(",");
					this.dataKonv = data.result[0].rs;					
					this.sgn.setTotalPage(Math.ceil(this.dataKonv.rows.length / this.rowPerPage));
					this.sgn.rearrange();									
					this.tampil(1);
					var line;
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						if (line.status == "0") this.sg2.appendData([line.nik, line.nama]);
						if (line.status == "1") this.sg3.appendData([line.nik, line.nama]);
					}
					setTipeButton(tbHapus);
				}
			}catch(e){
				alert(e);
			}		
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_alt_ver_m','no_ver',"VER/"+this.dp_tgl.getYear()+"/",'0000'));
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
					case "uploadVerifikasi":
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
			this.sg.onChange.set(this,"");				
			switch (col){
				case 0 :			
					var data = ["' '"];
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.cells(0,i) != "")
							data[data.length] = "'"+this.sg.cells(0,i)+"'";
					}
					var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.nama, a.nama2, a.nilai, a.nilai_ap, a.nilai_buku, "+
						" date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.kode_lokfa, a.alamat, b.status_app, b.no_konv,'-' as evd,"+
						"  "+this.gridColumn.dbField+" "+
						" from amu_asset a "+
						"	inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung and a.periode = b.periode "+
						this.gridColumn.dbTable+
						" where a.no_gabung = '" + sender.cells(0,row) + "' and a.kode_lokasi = '" + this.app._lokasi + "' and a.periode = '"+this.app._periode+"' ", true);
					if (typeof data != "string"){
						if (data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];
							var data = [line.no_fa, line.no_sn, line.nama, line.nama2, line.kode_lokfa,line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku)];
							var kolom = [1,2,3,4,5,6,7,8,9], ix = 9;
							for (var c in this.gridColumn.dbFieldSQL){
								data[data.length] = line[this.gridColumn.dbFieldSQL[c]];
								ix++;
								kolom[kolom.length] = ix;
							}
							this.sg.editData(row,data,kolom);
						}										
					}else alert(data);
				break;				
			}		
			this.sg.onChange.set(this,"doGridChange");		
		}catch(e){
			this.sg.onChange.set(this,"doGridChange");		
			alert(e);
		}
    },    
	doEllipsClick:function(sender, col ,row){		
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
														  "select a.no_gabung, a.no_fa, a.no_sn, a.nama from amu_asset a "+
														  "	inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung and b.kode_lokasi = a.kode_lokasi and b.periode = a.periode and b.jns_proc = '"+this.ed_jns.getText()+"' and a.no_gabung not in ("+data+")  "+
														  "	where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' ",
														  "select count(a.no_fa)  from amu_asset a "+
														  "	inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung and b.kode_lokasi = a.kode_lokasi and b.periode = a.periode "+
														  "where  a.kode_lokasi = '"+this.app._lokasi+"'  and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' and a.no_gabung not in ("+data+") ",
														  ["a.no_gabung","a.nama","a.no_sn","a.nama"],"and",["ID gabung","No Kartu Asset","No SN","Deskripsi Asset"],false);
						break;								
					case this.evidenceField:
						this.standarLib.ListDataSGFilter(this, "Daftar Ref. Evidence",this.sg, this.sg.row, this.sg.col, 
														  "select no_evd  from amu_evd a where kode_lokfa = '"+this.app._kodeLokfa+"' and kode_lokasi ='"+this.app._lokasi+"' and periode = '"+this.app._periode+"' ",
														  "select count(no_evd)  from amu_evd where kode_lokfa = '"+this.app._kodeLokfa+"' and kode_lokasi ='"+this.app._lokasi+"' and periode = '"+this.app._periode+"' ",
														  ["no_evd"],"and",["Evidence"],false);
					break;
				}	
			}
			if (sender == this.sg2 || sender == this.sg3){
				this.standarLib.showListDataForSG(this, "Daftar Karyawan",sender, sender.row, sender.col, 
													  "select nik, nama from amu_karyawan ",
													  "select nik, nama from amu_karyawan ",
													  ["nik","nama"],"and",["NIK","Nama"],false);
			}		
	},
	doSgClick: function(sender, col, row){
		if (col == 17){
			if (this.imageViewer === undefined){
				uses("app_saku_gl_fJurnalViewer");
				this.imageViewer = new app_saku_gl_fJurnalViewer(this.app,{bound:[this.width / 2 - 400,70,800,450]});								
			}
			this.imageViewer.location("server/media/"+sender.cells(17,row));
		}
	},	
	doEditChange: function(sender){
		try{
			if (sender.getText() == "") return;
			this.ed_lokfa.setSQL("select distinct kode_lokfa, nama from (select a.kode_lokfa, a.nama from amu_lokasi a "+
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
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Kelas Aset, Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, ARNET, Lokasi,Kode Central,Nama Central, Area Code, FKN, Fungsi, Host, Tipe Sentral, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.kode_netre as nmlok, b.kode_arnet as nmarnet, b.lokasi_sentral, b.kode_sentral, b.nama_sentral as nmsentral, b.kode_area, b.fkn, b.fungsi, b.host, b.tipe_sentral";
					this.gridColumn.dbField3 = "c.no_gabung, c.no_fa, c.no_sn, c.nama, c.kode_klpfa, c.nama2,c.kode_lokfa,c.tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, b.kode_netre, b.kode_arnet, b.lokasi_sentral, b.kode_sentral, b.nama_sentral, b.kode_area, b.fkn, b.fungsi, b.host, b.tipe_sentral, b.status_app";
					this.gridColumn.dbTable = "	";				
					this.gridColumn.buttonStyle = [[0,22],[bsEllips,bsEllips]];				
					this.gridColumn.dbFieldSQL = "nmlok,nmarnet,lokasi_sentral,kode_sentral,nmsentral,kode_area,fkn,fungsi,host,tipe_central,status_app,evd";
					this.colWidth = [[22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,80,100,100,100,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 150,200, 50, 150,150]];
					this.evidenceField = 22;
				break;
				case "RCE & MUX":
				case "RMS":
				case "SKKL / SKSO":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.kode_netre as nmlok, b.kode_tipe as nmtipe, b.kode_komp as nmkomp, b.kode_proyek as nmproyek, b.kode_link as nmlink";
					this.gridColumn.dbField3 = "c.no_gabung, c.no_fa, c.no_sn, c.nama, c.kode_klpfa, c.nama2,c.kode_lokfa,c.tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, b.kode_netre, b.kode_arnet, b.lokasi_sentral, b.kode_sentral, b.nama_sentral, b.kode_area, b.fkn, b.fungsi, b.host, b.tipe_sentral, b.status_app";
					this.gridColumn.dbTable = "";				
					this.gridColumn.dbFieldSQL = "nmlok,nmtipe,nmkomp,nmproyek,nmlink,status_app,evd";
					this.gridColumn.buttonStyle = [[0,10,11,12,13,14,15,16],[bsEllips,bsEllips,bsEllips, bsEllips, bsEllips, bsEllips,bsNone, bsEllips]];
					this.colWidth = [[16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 15;
				break;
				case "Modem Data & IMUX":		
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.no_kontrak, b.kode_vendor, b.no_kontrak2, b.status_sn";
					this.gridColumn.dbTable = "";				
					this.gridColumn.dbFieldSQL = "no_kontrak,kode_vendor,no_kontrak2,status_sn,status_app,evd";
					this.gridColumn.buttonStyle = [[0,15],[bsEllips,bsEllips]];
					this.colWidth = [[16,15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,120,80,80, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 15;
				break;
				case "Satelit":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Nama Satelit, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.kode_satelit";
					this.gridColumn.dbTable = "";
					this.gridColumn.dbFieldSQL = "kode_satelit,status_app,evd";
					this.gridColumn.buttonStyle = [[0,12],[bsEllips,bsEllips]];				
					this.colWidth = [[13,12,11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,00,80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 12;
				break;
				case "Server":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,UBIS, SBIS, Nama Aplikasi/Tools, Jenis, Lokasi, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.kode_netre,b.lokasi_server, b.ip_server, b.kode_aplikasi, b.tipe_switch, b.ip_switch";				
					this.gridColumn.dbTable = "";				
					this.gridColumn.buttonStyle = [[0,16],[bsEllips,bsEllips]];								
					this.gridColumn.dbFieldSQL = "kode_netre, lokasi_server, ip_server, kode_aplikasi, tipe_switch, ip_switch,status_app,evd";
					this.colWidth = [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,100,80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 16;
				break;
				case "RBS":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Level 1,	Level 2,Lokasi BSC/BTS, Area Operasional,Vendor,Alat Monitoring,Status BTS / BSC, Status Rekonsiliasi,Status, Ref. Evidence";
					this.gridColumn.dbField = "b.kode_lokrbs_m, b.kode_lokrbs_d, b.lokasi_rbs, b.kode_sto, b.kode_vendor, b.kode_alat, b.sts_rbs,b.sts_rekon";				
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,19],[bsEllips,bsEllips]];				
					this.gridColumn.dbFieldSQL = "kode_lokrbs_m,kode_lokrbs_d,lokasi_rbs,kode_sto,kode_vendor,kode_alat,sts_rbs,sts_rekon,status_app,evd";
					this.colWidth = [[19,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,80,150,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 19;
				break;			
				case "STM & IMS":			
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Kelas Aset,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset,Group Utama,Kategori,Kelompok Asset,Merk,Vendor,Lokasi/ Daerah/ STO,Nama Aset,Jumlah,Satuan,Keterangan, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.kode_group, b.kode_klpstm, b.kode_klpfa, b.kode_merk, b.kode_vendor, b.kode_lokstm, b.kode_sto, b.jumlah, b.kode_satuan, b.keterangan ";				
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,22],[bsEllips,bsEllips]];		
					this.gridColumn.dbFieldSQL = "kode_group,kode_klpstm,kode_klpfa,kode_merk,kode_merk,kode_vendor, kode_lokstm, kode_sto, jumlah,keterangan,status_app,evd";
					this.colWidth = [[22,21,20,19,18,17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,80,100,100,100,100,100,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 22;
				break;
				case "LAN & WAN":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Sub UBIS/Regional, Lokasi, Nama Perangkat,IP Perangkat, Tipe Switch, IP Switch, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.lokasi_server, b.nama_sentral, b.ip_server, b.tipe_switch, b.ip_switch";
					this.gridColumn.dbTable = "";							
					this.gridColumn.buttonStyle = [[0,16],[bsEllips,bsEllips]];							
					this.gridColumn.dbFieldSQL = "lokasi_server,nama_sentral,ip_server,tipe_switch,ip_switch,status_app,evd";
					this.colWidth = [[17,16,15,14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,80,100, 100, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 16;
				break;
				case "Jaringan":	
				//	
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Location,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Regional, Area, STO, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.kode_netre, b.kode_arnet, b.kode_sto";
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,15],[bsEllips,bsEllips]];				
					this.colWidth = [[15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,80,100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.gridColumn.dbFieldSQL = "kode_netre,kode_arnet,status_app,evd";
					this.evidenceField = 15;
				break;
				case "Tanah & Bangunan":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Alamat Asset, No Sertifikat, Lokasi Aset (Sertifikat), Luas Tanah, Luas Bangunan, Status Dokumen, NOP,Lokasi Aset(NOP), Luas Tanah, Luas Bangunan, NKA Link Bangunan, Status Dokumen, Jenis Dokumen, No, Lokasi Sesuai Dokumen, Pelanggan, NKA Link Tanah, Status Dokumen, Status, Ref. Evidence";
					this.gridColumn.dbField = "c.no_surat, cc.alamat as alm_sertifikat,cc.tanah, cc.bangun as bgn,ccc.nama as status_sertifikat, "+
							" d.no_surat as no_nop,  dd.alamat as alm_pbb,dd.tanah as tnhpbb, dd.bangun as bgnpbb, b.no_fapbb, ddd.nama as status_pbb, "+
							" b.jenis_dok, f.no_surat as no_dok,  ff.alamat, g.nama as nmcust, b.no_falain, fff.nama as status_dok";				
					this.gridColumn.dbTable = "";
					this.gridColumn.buttonStyle = [[0,28],[bsEllips, bsEllips]];
					this.colWidth = [[28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,100,100,100,100,100,100,100,100,100,100,100,100,100,80,100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 28;
					this.gridColumn.dbFieldSQL = "no_surat,alm_sertifikat,tanah,bgn,status_sertifikat,no_nop,alm_pbb,tnhpbb,bgnpbb,no_fapbb,status_pbb,jenis_dok,no_dok,alamat,nmcust,no_falain,status_dok,status_app,evd";
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
			this.sg.appendRow();
		}catch(e){
			alert(e);
		}
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
		this.svrUpload.getData(page);
	},
	checkBusA: function(){
		this.svrUpload.checkBusA(this.ed_lokfa.getText(),'-');
	},
	tampil: function(page){		
		var start = (page - 1) * this.rowPerPage;
		var finish = (start + this.rowPerPage > this.dataKonv.rows.length ? this.dataKonv.rows.length : start + this.rowPerPage);
		var line;
		this.sg.clear();
		var field = this.gridColumn.dbField3.split(",");
		for (var i = start; i < finish; i++){
			line = this.dataKonv.rows[i];
			if (i == 0){
				this.dp_tgl.setText(line.tgl);
				this.ed_nik1.setText(line.nik_buat);
				this.ed_file.setText(line.lampiran);
			}
			var tmp = [];
			for (var c in field) tmp[tmp.length] = line[trim(field[c]).split(".")[1]];
			this.sg.appendData(tmp);						
		}
		this.sg.setNoUrut(start);
	}
});
