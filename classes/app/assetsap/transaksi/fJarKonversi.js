/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fJarKonversi = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fJarKonversi.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fJarKonversi";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Konversi Data Jaringan", 0);	
		try{
			uses("datePicker;saiCBBL;saiGrid;util_file;uploader;app_assetsap_transaksi_fSvrUpload;checkBox");			
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});			
			this.ed_jns = new saiCB(this,{bound:[20,4,180,20], caption:"Jenis Prosedur", change:[this,"doEditChange"]});
			this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Konversi",readOnly:true});
			this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});														
			this.ed_klpfa = new saiCBBL(this, {
				bound: [20, 30, 200, 20],
				caption: "Class Aset",
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
				autoPaging : true, rowPerPage:20, pasteEnable:true, afterPaste:[this,"doAfterPaste"],
				buttonStyle:[[0,10,11,12,13,14,15],[bsEllips, bsEllips, bsEllips, bsEllips, bsEllips, bsEllips, bsAuto ]],
				ellipsClick: [this,"doEllipsClick"],
				colFormat:[[7,8,9],[cfNilai, cfNilai, cfNilai]],
				picklist:[[15],[new arrayMap({items:["APP","NOTAPP"]})]]
			});		
			this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
			
			this.p2 = new panel(this,{bound:[20,12,440,150],caption:"Disiapkan Oleh"});
			this.sg2 = new saiGrid(this.p2,{bound:[1,20,438,95], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, change:[this,"doGridChange2"],ellipsClick:[this,"doEllipsClick"]});
			this.sgn2 = new sgNavigator(this.p2,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg2, pager:[this,"doPager"]});
			this.p3 = new panel(this,{bound:[480,12,440,150],caption:"Direview Oleh"});
			this.sg3 = new saiGrid(this.p3,{bound:[1,20,438,95], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, change:[this,"doGridChange2"],ellipsClick:[this,"doEllipsClick"]});
			this.sgn3 = new sgNavigator(this.p3,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg3, pager:[this,"doPager"]});
			
			this.rearrangeChild(10,23);			
			this.setTabChildIndex();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
						
			this.onClose.set(this,"doClose");				
			this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp",undefined,"klp");
			this.dbLib.getDataProviderA("select kode_area, nama, kode_regional from amu_dcsarea ",undefined,"area");
			this.dbLib.getDataProviderA("select kode_loksto, nama, plant, kode_area from amu_loksto ",undefined,"sto");
			this.dataGrid = new arrayMap();
			
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
			this.svrUpload.addListener(this);
			this.fileUtil.getRootDirA();			
			this.rowPerPage = 20;
			this.tableParam = new arrayMap();						
			this.listNIK = this.app._listNIK;
			this.sto = new arrayMap();
			this.area = new arrayMap();
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fJarKonversi.extend(window.childForm);
window.app_assetsap_transaksi_fJarKonversi.implement({
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
						sql.add("insert into amu_alt_konv_m (no_konv,  kode_lokasi, kode_klp, tanggal, nik_buat, periode, jns_proc, lampiran, kode_lokfa)values"+
							"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','"+this.ed_klpfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_nik1.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"', '"+this.ed_file.getText()+"','"+this.ed_lokfa.getText()+"')");							
						sql.add("insert into amu_alt_ver_m(no_ver,  kode_lokasi, kode_klp, tanggal, nik_buat, periode, jns_proc, kode_lokfa)values"+
								"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','-','"+this.dp_tgl.getDateString()+"','"+this.ed_nik1.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"','"+this.ed_lokfa.getText()+"')");
						var dataGrid = [];
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){//disimpan sesuai dgn yg ada aja
								dataGrid = [];									
								for (var j in this.gridColumn.saveField ) {
									var value = this.sg.cells(this.gridColumn.saveField[j],i);
									dataGrid[dataGrid.length] = "'"+value+"'";//this.dataGrid.get(i)[this.gridColumn.saveField[j]]
								}									
								sql.add("insert into amu_alt_konv_d (no_konv,kode_lokasi, no_gabung, "+this.gridColumn.dbField+", status_app, periode,jns_proc ) "+
									" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+dataGrid.join(",")+", '"+this.app._periode+"','"+this.ed_jns.getText()+"')");									
								sql.add("insert into amu_alt_ver_d (no_ver,kode_lokasi, no_gabung, no_evd, no_konv, periode,jns_proc  ) "+
										" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(14,i)+"','"+this.ed_kode.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"')");
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
	doRequestReady: function(sender, methodName, result, callObj, callback){		
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
							if (callObj == "klp"){
								if (line.nama.toLowerCase().indexOf("jaringan") != -1)
									this.ed_jns.addItem(line.kode_klp, line.nama);
							}else if (callObj == "area"){
								this.area.set(line.kode_area+":"+line.kode_regional, line.nama);
							}else if (callObj == "area"){
								this.sto.set(line.kode_area+":"+line.plant+":"+line.kode_loksto, line.nama);
							}
						}	
						if (callObj == "klp")
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
			if (sender.cells(0, row) == "") return;
			this.sg.onChange.set(this,undefined);		
			var dataRow = this.dataGrid.get(row, data);
			if (dataRow === undefined) dataRow = [];						
			switch (col){
				case 0 :									
					var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, a.nama2, a.nama, a.kode_lokfa, a.ref1, a.ref2, a.nilai, a.nilai_ap, a.nilai_buku, "+
						" date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.alamat, '-' as status_app, "+
						" a.ref1 as kode_netre, e.kode_area as area, d.nama as sto, d.kode_loksto as evd "+
						" from amu_asset a "+
						"	left outer join amu_loksto d on d.plant = a.ref1 and d.kode_loksto = a.ref2 "+
						"	left outer join amu_dcsarea e on e.kode_area = d.kode_area "+
						" where a.no_gabung = '" + sender.cells(0,row) + "' and a.kode_lokasi = '" + this.app._lokasi + "' and a.periode = '"+this.app._periode+"' ", true);
					if (typeof data != "string"){
						if (data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];							
							this.sg.editData(row,[line.no_fa, line.no_sn, line.nama, line.nama2, line.kode_lokfa, line.ref1, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), line.kode_netre, line.area, line.sto, line.evd],
							[1,2,3,4,5,6,7,8,9, 10, 11, 12, 13,14]);
						}else {
							system.alert(this,"NKA tidak tidak ditemukan",sender.cells(0,row));
						}											
					}else system.alert(this,data);
				break;
				default:
					if (sender.columns.get(col) === undefined) return;					
					//if (sender.columns.get(col).buttonStyle == bsEllips){
					//	dataRow[col] = sender.dataFromList[0];
					//	sender.cells(col, row, sender.dataFromList[1]);																
					//}else 
					dataRow[col] = sender.cells(col, row);	
										
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
					case 11:
						this.standarLib.ListDataSGFilter(this, "Daftar Regional",this.sg, this.sg.row, this.sg.col, 
														  "select kode_regional, nama from amu_regional ",
														  "select count(*) from amu_regional",
														  ["kode_regional","nama"],"where",
														  ["Kode Regional","Nama Regional"],false);
					break;
					case 12:
						this.standarLib.ListDataSGFilter(this, "Daftar Area",this.sg, this.sg.row, this.sg.col, 
														  "select kode_area, nama from amu_dcsarea where kode_regional = '"+this.sg.cells(11,row)+"' ",
														  "select count(*) from amu_dcsarea where kode_regional = '"+this.sg.cells(11,row)+"' ",
														  ["kode_area","nama"],"where",
														  ["Kode Area","Nama Area"],false);
					break;
					case 13:
						this.standarLib.ListDataSGFilter(this, "Daftar STO",this.sg, this.sg.row, this.sg.col, 
														  "select kode_loksto, nama from amu_loksto where plant = '"+this.sg.cells(11,row)+"' and kode_area = '"+this.sg.cells(12,row)+"'",
														  "select count(*) from amu_loksto where plant = '"+this.sg.cells(11,row)+"' and kode_area = '"+this.sg.cells(12,row)+"'",
														  ["kode_loksto","nama"],"where",
														  ["Kode STO","Nama STO"],false);
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
				case "Jaringan":	
				//	
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Deskripsi Aset,Deskripsi Alamat,Bus. Area,location,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Regional, Area, STO/MDF, Ref. Evidence, Status";
					this.gridColumn.dbField = "kode_netre, kode_arnet, kode_sto ";				
					this.gridColumn.dbField3 = "no_gabung, no_fa, no_sn, nama, nmklp, nama2,kode_lokfa,ref1,tgl_perolehan, nilai, nilai_ap, nilai_buku,kode_netre, kode_arnet, kode_sto";
					this.gridColumn.dbField2 = "a.ref1 as kode_netre,'-' as kode_arnet,'-' as kode_sto ";				
					this.gridColumn.dbTable = "amu_regional, amu_area, amu_sto";
					this.gridColumn.saveField = [11,12,13,15];
					this.gridColumn.buttonStyle = [[0,11,12,13,14,15],[bsEllips,bsEllips,bsEllips, bsEllips,bsNone, bsAuto]];
					this.picklist = [[15],[new arrayMap({items:["APP","NOTAPP"]})]];
					this.colWidth = [[15,14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80,150,100, 80, 80, 120, 120, 120, 80,100, 80, 200, 200, 50, 150,150]];
				break;				
			}		
			this.gridColumn.dbTable = this.gridColumn.dbTable.split(",");		
			var kolom = this.gridColumn.kolom.split(",");
			this.gridColumn.kolom = kolom;
			this.sg.clear();
			this.sg.setColCount(kolom.length);
			this.sg.setColTitle(kolom);	
			this.sg.setColFormat([8,9,10],[cfNilai, cfNilai, cfNilai]);
			this.sg.setColWidth(this.colWidth[0], this.colWidth[1]);
			this.sg.setButtonStyle(this.gridColumn.buttonStyle[0],this.gridColumn.buttonStyle[1]);
			this.sg.setPickList(this.picklist[0], this.picklist[1]);
			this.sg.setColumnReadOnly(true,[1,2,3,4,5,6,7,8,9,10],[]);
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
		var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, a.nama2, a.nama, a.kode_lokfa, a.ref1, a.ref2, a.nilai, a.nilai_ap, a.nilai_buku, "+
			" date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.alamat, '-' as status_app, "+
			" a.plant as kode_netre, e.nama as area, d.nama as sto "+
			" from amu_asset a "+
			"	left outer join amu_loksto d on d.plant = a.ref1 and d.kode_loksto = a.ref2 "+
			"	left outer join amu_dcsarea e on e.kode_area = d.kode_area "+
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
	},
	doGridChange2 : function(sender, col, row){
		if (col == 0){
			sender.cells(1,row, this.listNIK.get(sender.cells(0, row)));
		}
	},
	validasiData : function(){
		
	},
	doAfterPaste : function(sender){
		this.sgn.setTotalPage(sender.getTotalPage());
		this.sgn.rearrange();
		var data = ["' '"];
		for (var i=0; i < sender.getRowCount(); i++){
			data.push("'"+sender.cells(0,i)+"'");
		}
		var dt = this.dbLib.getDataProviderKeyMap("select a.no_gabung, a.no_fa, a.no_sn, a.nama2, a.nama, a.kode_lokfa, a.ref1, a.ref2, a.nilai, a.nilai_ap, a.nilai_buku, "+
			" date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.alamat, '-' as status_app, "+
			" a.ref1 as kode_netre, e.kode_area as area, d.nama as sto, d.kode_loksto as evd "+
			" from amu_asset a "+
			"	left outer join amu_loksto d on d.plant = a.ref1 and d.kode_loksto = a.ref2 "+
			"	left outer join amu_dcsarea e on e.kode_area = d.kode_area "+
			" where a.no_gabung in (" + data + ") and a.kode_lokasi = '" + this.app._lokasi + "' and a.periode = '"+this.app._periode+"' ", true, "no_gabung");
		if (typeof dt == "string"){
			systemAPI.alert(dt);
			return;
		}		
		for (var i=0; i < sender.getRowCount(); i++){			
			if (dt.rs.data[sender.cells(0,i)] == undefined){
				system.alert("Aset tidak ada ("+sender.cells(0,i)+")");
				return false;
			}else {
				var area = sender.cells(12,i)+":"+sender.cells(11,i);
				var sto = sender.cells(12,i)+":"+sender.cells(11,i)+":"+sender.cells(14,i);
				if (this.area.get(area) == undefined && sender.cells(12,i) != "-"){
					system.alert("Area tidak ada ("+sender.cells(12,i)+")");
					return false;
				}
				if (this.sto.get(sto) == undefined && sender.cells(14,i) != "-"){
					system.alert("STO tidak ada ("+sender.cells(14,i)+")");
					return false;
				}
			}
		}
	}
	
});
