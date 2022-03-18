/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fMdmVerifikasi = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fMdmVerifikasi.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fMdmVerifikasi";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Verifikasi Modem Data Data Aset", 0);	
		uses("datePicker;saiCBBL;saiGrid;util_file;app_assetsap_transaksi_fSvrUpload;checkBox");
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Verifikasi",readOnly:true});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});											
		this.ed_jns = new saiCB(this,{bound:[20,4,200,20], caption:"Jenis Prosedur", change:[this,"doEditChange"]			
		});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Bus. Area",
			multiSelection: false,			
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_klpfa","nama"],false, ["Klp Aset","Nama"],"and","Data Kelompok Aset",true],
			change:[this,"doChange"]		
		});
				
		this.cbUpload = new checkBox(this,{bound:[830,30,80,20], caption:"Upload Ulang"});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pembuat",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.app._kodeLokfa+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});		
		this.bTampil = new button(this,{bound:[730,3,80,20], caption:"tampil", click:[this,"doTampil"]});
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
			autoPaging : true, rowPerPage:20, pasteEnable:true, afterPaste:[this,"doAfterPaste"],
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
window.app_assetsap_transaksi_fMdmVerifikasi.extend(window.childForm);
window.app_assetsap_transaksi_fMdmVerifikasi.implement({
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
						if (this.dataKonversi === undefined){
							sql.add("insert into amu_alt_ver_m(no_ver,  kode_lokasi, kode_klp, tanggal, nik_buat, periode, jns_proc, kode_lokfa)values"+
								"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','-','"+this.dp_tgl.getDateString()+"','"+this.ed_nik1.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"','"+this.ed_lokfa.getText()+"')");
							
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){
									sql.add("insert into amu_alt_ver_d (no_ver,kode_lokasi, no_gabung, no_evd, no_konv, periode,jns_proc  ) "+
										" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(this.evidenceField,i)+"','"+this.sg.cells(this.evidenceField+1,i)+"','"+this.app._periode+"','"+this.ed_jns.getText()+"')");
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
						}else {
							var ttd1 = new server_util_arrayList();
							for (var i=0; i < this.sg2.getRowCount(); i++)
								if (this.sg2.rowValid(i)) ttd1.add(this.sg2.cells(0,i));
							var ttd2 = new server_util_arrayList();
							for (var i=0; i < this.sg3.getRowCount(); i++)
								if (this.sg3.rowValid(i)) ttd2.add(this.sg3.cells(0,i));							
							this.svrUpload.uploadVerifikasi(this.ed_kode.getText(),this.app._periode,  this.dp_tgl.getDateString(), this.ed_jns.getText(), this.app._lokasi, this.app._userLog, "-", this.filename, this.ed_lokfa.getText(), ttd1, ttd2, this.cbUpload.selected);
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
							if (line.nama.toLowerCase().indexOf("modem") != -1)
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
													  "select count(*) from amu_karyawan ",
													  ["nik","nama"],"where",["NIK","Nama"],false);
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
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa and x.kode_lokasi = a.kode_lokasi and x.periode = '"+this.app._periode+"' "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF' and periode = '"+this.app._periode+"') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa and x.kode_lokasi = a.kode_lokasi and x.periode = '"+this.app._periode+"' "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF' and periode = '"+this.app._periode+"') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R" ? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa and x.kode_lokasi = a.kode_lokasi and x.periode = '"+this.app._periode+"' "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF' and periode = '"+this.app._periode+"') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R"? this.app._kodeLokfa : "%")+"' and a.kode_induk = '00') ", 
						["kode_lokfa","nama"],false, ["Klp Aset","Nama"],"where","Data Kelompok Aset",true);
			this.gridColumn = {};		
			switch (sender.getText()){
				case "Modem Data & IMUX":		
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri, Status, Ref. Evidence";
					this.gridColumn.dbField = "b.no_kontrak, b.kode_vendor, b.no_kontrak2, b.status_sn";
					this.gridColumn.dbTable = "";				
					this.gridColumn.dbFieldSQL = "no_kontrak,kode_vendor,no_kontrak2,status_sn,status_app,evd";
					this.gridColumn.buttonStyle = [[0,15],[bsEllips,bsEllips]];
					this.colWidth = [[15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,120,80,80, 100, 80, 80, 120, 120, 120, 80, 80, 200, 200, 50, 150,150]];
					this.evidenceField = 15;
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
			this.sg.setColFormat([7,8,9],[cfNilai, cfNilai, cfNilai]);			
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
	doTampil:function(sender){		
		try{
			
			var data = this.dbLib.getDataProvider("select a.no_gabung,a.no_fa, a.no_sn, a.nama, a.nama2, a.nilai, a.nilai_ap, a.nilai_buku, "+
							" date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.kode_lokfa, a.alamat, b.status_app, b.no_konv, case when b.status_app = 'APP' then 'OK' else '-' end as evd,"+
							"  "+this.gridColumn.dbField+" "+
						"	from amu_asset a "+
						  "	inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung and b.kode_lokasi = a.kode_lokasi and b.periode = a.periode and b.jns_proc = '"+this.ed_jns.getText()+"' "+
						  this.gridColumn.dbTable+
						  "	where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' ",true);
			if (typeof data == "string"){
				systemAPI.alert(data);
				return;
			}
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];
				var tmp = [line.no_gabung, line.no_fa, line.no_sn, line.nama, line.nama2, line.kode_lokfa,line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku)];			
				for (var c in this.gridColumn.dbFieldSQL){
					tmp[tmp.length] = line[this.gridColumn.dbFieldSQL[c]];				
				}								
				this.sg.appendData(tmp);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doAfterPaste: function (sender, rowCount, page){
		this.sgn.setTotalPage(sender.getTotalPage());
		this.sgn.rearrange();		
	}
});
