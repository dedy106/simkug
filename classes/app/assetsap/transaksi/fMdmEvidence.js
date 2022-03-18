/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fMdmEvidence = function(owner) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fMdmEvidence.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fMdmEvidence";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Evidence Modem Data dan IMUX", 0);	
			uses("util_file;datePicker;checkBox;saiCBBL;saiGrid");								
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
			this.ed_jns = new saiCB(this,{bound:[20,3,250,20], caption:"Prosedur", change:[this,"doChange"], tag:99});
			this.ed_lokfa = new saiCBBL(this, {
					bound: [20, 4, 200, 20],
					caption: "Bus.Area",
					multiSelection: false,
					change:[this,"doChange"]			
				});
			this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Evidence",readOnly:true});
			this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});											
			this.ed_refevd = new saiCBBL(this,{bound:[20,4,300,20],caption:"Ref. Evidence", maxLength:150, 
				multiSelection: false,			
				change:[this,"doChange"]
			});		
			
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 200, 20],
				caption: "NIK Buat",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});		
			this.ed_nik2 = new saiCBBL(this, {
				bound: [20, 4, 200, 20],
				caption: "NIK Reviewer",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});		
			this.l_tgl2 = new label(this,{bound:[20,1,100,20],caption:"Tanggal Review",underline:true});
			this.dp_tgl2 = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
			this.ed_kes = new saiLabelEdit(this, {bound:[20,2,700,20],caption:"Kesimpulan"});
			this.p2 = new panel(this,{
					bound:[20,39, 400,225],
					caption:"Data Modul"
				});
			this.sg = new saiGrid(this.p2,{bound:[1,20,398,180],colCount:2,colTitle:["Parameter","Value"],
					colWidth:[[1,0],[200,150]], change:[this,"doGridChange"],rowCount:1,tag:99,
					ellipsClick:[this,"doFindBtnClick"],
					buttonStyle:[[1],[bsEllips]],
					colReadOnly:[true,[0],[]]});		
					
			this.p1 = new panel(this,{
					bound:[440,39, 600,225],
					caption:"Data Dokumen Evidence"
				});
			this.sgUpld = new saiGrid(this.p1,{bound:[1,20,598,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,480]], readOnly:true, change:[this,"doGridChange"],rowCount:1,tag:9});
			this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");		
			this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:1, grid:this.sgUpld});
			
			this.rearrangeChild(10,23);			
			this.setTabChildIndex();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
			this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");			
			this.onClose.set(this,"doClose");
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.fileUtil.getRootDir();			
			this.separator = "/";
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fMdmEvidence.extend(window.childForm);
window.app_assetsap_transaksi_fMdmEvidence.implement({
	doClose: function(sender){		
		if (this.uploadedFiles !="" ) this.fileUtil.deleteFiles(this.uploadedFiles);
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
						uses("server_util_arrayList");
						sql = new server_util_arrayList();						
						sql.add("insert into amu_evd(no_evd, kode_lokasi, nama, nik_buat, tgl_buat, nik_review, tgl_review,kode_lokfa, periode, jns_proc, kesimpulan )  values "+
								"('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_refevd.getText()+"','"+this.ed_nik1.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_nik2.getText()+"','"+this.dp_tgl2.getDateString()+"', '"+this.ed_lokfa.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"','"+this.ed_kes.getText()+"' )");
						for (var i=0;i < this.sg.getRowCount(); i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into amu_evd_d(no_evd, param, value, no_urut, jns_proc)values"+
									" ('"+this.ed_kode.getText()+"', '"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+i+",'"+this.ed_jns.getText()+"' )");
							}							
						}
						var ix = 0;
						this.saveFiles = "", this.dest = "", first = true;
						var files = [];
						for (var i=0;i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.rowValid(i)){
								ix++;
								sql.add("insert into amu_evd_dok(no_evd, no_gambar, nu)values('"+this.ed_kode.getText()+"','"+this.sgUpld.cells(1,i).filedest+"','"+ix+"')");									
								if (!first) { 
									this.saveFiles += ";";
									this.dest += ";";
								}                               
								this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
								this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
								first = false;                       
								files.push(this.sgUpld.cells(0,i));
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
	doFindBtnClick: function(sender, col, row){		
		if (sender == this.sg){
			switch (row){
				case 0 :
					this.standarLib.ListDataSGFilter(this, "Data Kontrak",sender, sender.row, sender.col,
											  "select no_kontrak, keterangan from amu_kontrak where kode_lokasi = '"+this.app._lokasi+"' ",											
											  "select count(*) from amu_kontrak  where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["no_kontrak","keterangan"],"and",["No Kontrak","Keterangan"]);
				break;
				case 1 :
					this.standarLib.ListDataSGFilter(this, "Data NMS",sender, sender.row, sender.col,
											  "select distinct nms from amu_kontrak_d where kode_lokasi = '"+this.app._lokasi+"' and no_kontrak = '"+sender.cells(1,0)+"'",											
											  "select count(*) from amu_kontrak_d  where kode_lokasi = '"+this.app._lokasi+"' and no_kontrak = '"+sender.cells(1,0)+"'",
											  ["nms"],"and",["NMS"]);
				break;
				case 2:
					this.standarLib.ListDataSGFilter(this, "Data Serial Number",sender, sender.row, sender.col,
											  "select distinct sn from amu_kontrak_d where kode_lokasi = '"+this.app._lokasi+"' and no_kontrak = '"+sender.cells(1,0)+"' and nms = '"+sender.cells(1,1) +"'",											
											  "select count(*) from amu_kontrak_d  where kode_lokasi = '"+this.app._lokasi+"' and no_kontrak = '"+sender.cells(1,0)+"' and nms = '"+sender.cells(1,1) +"'",
											  ["sn"],"and",["Serial Number"]);
				break;
			}
		}
	},
	doChange: function(sender){
		if (sender == this.ed_jns){			
			this.ed_refevd.setSQL("select distinct no_evd from amu_alt_ver_d where kode_lokasi = '"+this.app._lokasi+"' and jns_proc = '"+sender.getText()+"' ", ["no_evd"],false, ["Referensi Evidence"],"and","Referensi Evidence dari Konversi",false);
			this.ed_lokfa.setSQL("select kode_lokfa, nama from (select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct periode,kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa and d.periode = x.periode "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = x.periode and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and x.periode = '"+this.app._periode+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct periode,kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa and d.periode = x.periode "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = x.periode and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and x.periode = '"+this.app._periode+"'  and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R" ? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct periode,kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa and d.periode = x.periode "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = x.periode and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and x.periode = '"+this.app._periode+"'  and a.kode_induk = '00' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R"? this.app._kodeLokfa : "%")+"' and a.kode_induk = '00') ", 
						["kode_lokfa","nama"],false, ["Klp Aset","Nama"],"where","Data Kelompok Aset",true);
			this.sg.clear();
			switch (this.ed_jns.getText().toLowerCase()){				
				case "modem data & imux":									
					this.p2.setCaption("DATA MODUL");										
					this.sg.appendData(["Nomor Kontrak","-"]);			
					this.sg.appendData(["Slot NMS","-"]);			
					this.sg.appendData(["Serial Number","-"]);								
					
				break;				
			}
		}		
		if (sender == this.ed_lokfa){
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);			
			this.ed_nik2.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);			
		}
		if (sender == this.ed_refevd){		
			try{	
				switch (this.ed_jns.getText().toLowerCase()){					
					case "modem data & imux":									
						var dbField = "no_kontrak, kode_vendor, no_kontrak2, status_sn";
					break;					
				}									
			}catch(e){
				alert(e);
			}
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_evd','no_evd',this.ed_lokfa.getText()+"."+this.dp_tgl.getPeriode().substring(2)+".",'00000'));
	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib)
			{
				switch	(methodName)
				{
					case "execArraySQL" :
						if (result.toLowerCase().search("error") == -1)					
						{
						  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_kode.getText()+")");
						  this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);					  
						}else
							 system.alert(this, result,"");
						break;
					case "getDataProvider":
						result = JSON.parse(result);						
						var line;						
						for (var i in result.rs.rows) {
							line = result.rs.rows[i];
							if (line.nama.toLowerCase().indexOf("modem") != -1)
								this.ed_jns.addItem(line.kode_klp, line.nama);
						}						
						this.doChange(this.ed_jns);
	    			break;
				}
			}else if (sender == this.fileUtil){				
				switch(methodName){
				   case "copyFilesTo" : 
					   if (result.indexOf("error") != -1){
						   systemAPI.alert(result);
					   }else{ 
							this.app._mainForm.pesan(2,"upload "+result);	
							system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);		
							this.sgUpld.clear(1);
							showProgress("delete temporary...");
							if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles);
					   }
					break;
					case "deleteFiles" :
						hideProgress("delete temporary...");
					break;
				 }
			}
		}catch(e){
			alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.filedest);
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});
