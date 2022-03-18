window.app_eclaim2_transaksi_fPelaksanaanK = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fPelaksanaanK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fPelaksanaanK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pelaksanaan Pekerjaan: Input", 0);	
		uses("uploader;saiMemo;util_file;datePicker;pageControl");
		this.cb_klaim = new saiCBBL(this,{bound:[20,3,200,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"],
			change:[this,"doChange"]
		});
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,200,20],caption:"No Pelaksanaan",readOnly:true, multiSelection:false,
			change:[this,"doChange"]
		});				
		this.cb_penunjukan = new saiCBBL(this,{bound:[20,4,200,20],caption:"No Penunjukan"});
		this.cb_vendor = new saiCBBL(this,{bound:[20,5,200,20],caption:"Vendor",multiSelection:false,
			sql:["select kode_vendor, nama from tlk_vendor where kode_lokasi = '"+this.app._lokasi+"'  ",["kode_vendor","nama"],false,["Kode","Nama"],"and","Daftar Vendor",true]			
		});
		this.ed_dok = new saiLabelEdit(this,{bound:[20,6,300,20],caption:"No Dokumen", maxLength:45});				
		this.ed_bobot = new saiLabelEdit(this,{bound:[20,7,200,20],caption:"Bobot", tipeText:ttNilai, text:"100"});				
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tgl Pengerjaan",underline:true});
		this.dp_tgl2 = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.dp_tgl3 = new datePicker(this,{bound:[230,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.bGen2 = new button(this,{bound:[340,1,80,20],caption:"Gen. Jadwal",click:"doClick"});
		this.ed_ket = new saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});							
		this.p1 = new pageControl(this,{bound:[20,10,600,230],childPage:["Item Pekerjaan","Upload Dokumen"]});
		this.sg1 = new saiGrid(this.p1.childPage[0],{bound:[1,5,597,195],colCount:5,colTitle:"Pekerjaan,Tgl Mulai, Tgl Selesai, Target(%), Realisasi(%)", colWidth:[[4,3,2,1,0],[80,80,80,80,150]],
					buttonStyle:[[1,2],[bsDate, bsDate]], rowCount:1, tag:9});
		this.sgn0 = new sgNavigator(this.p1.childPage[0],{bound:[1,this.p1.height - 25,598,25],buttonStyle:1, grid:this.sg1});
		this.sgUpld = new saiGrid(this.p1.childPage[1],{bound:[1,5,597,195],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,480]], readOnly:true, change:[this,"doGridChange"], rowCount:1,tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1.childPage[1],{bound:[1,this.p1.height - 25,598,25],buttonStyle:1, grid:this.sgUpld});
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.ed_Periode.setText(this.dp_tgl.getThnBln());
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.app._rootDir;			
		this.separator = "/";
				
		this.onClose.set(this,"doClose");
	}
};
window.app_eclaim2_transaksi_fPelaksanaanK.extend(window.childForm);
window.app_eclaim2_transaksi_fPelaksanaanK.implement({
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
			switch(event){
				case "clear" :
					if (result == mrOk) {
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.eKontrak);		
						this.sgUpld.clear(1);
					}
				break;
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						var sql = new server_util_arrayList();
						this.saveFiles = "", this.dest = "", first = true;
						var files = [];
						for (var i=0; i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.cells(0,i) != ""){ 
								if (this.fileBfr.get(this.sgUpld.cells(0,i)) === undefined){
									if (!first) { 
										this.saveFiles += ";";
										this.dest += ";";
									}                               
									this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
									this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
									first = false;
								}
								files.push(this.sgUpld.cells(0,i));
							}
						}
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						sql.add("delete from tlk_pelaksanaan_d where no_pelaksanaan = '"+this.ed_kode.getText()+"' and kode_lokasi =  '"+this.app._lokasi+"'  ");
						sql.add("delete from tlk_pelaksanaan_dok where no_pelaksanaan = '"+this.ed_kode.getText()+"' and kode_lokasi =  '"+this.app._lokasi+"'  ");
						sql.add("update tlk_pelaksanaan set no_penunjukan='"+this.cb_penunjukan.getText()+"', kode_vendor='"+this.cb_vendor.getText()+"',  "+
							" bobot='"+parseNilai(this.ed_bobot.getText())+"', tgl_mulai='"+this.dp_tgl2.getDateString()+"', tgl_selesai='"+this.dp_tgl3.getDateString()+"',periode='"+this.ed_Periode.getText()+"', tanggal='"+this.dp_tgl.getDateString()+"', no_dokumen='"+this.ed_dok.getText()+"', tgl_input=now(), nik_user='"+this.app._userLog+"', keterangan = '"+this.ed_ket.getText()+"' "+
							" where no_pelaksanaan = '"+this.ed_kode.getText()+"' and kode_lokasi =  '"+this.app._lokasi+"' ");
						
						sql.add("update tlk_klaim set progress = '9', flag9='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						for (var i=0; i < this.sg1.getRowCount(); i++){
							if (this.sg1.rowValid(i)){
								//data  tgl awal minggu di taruh di colData[tgl1, tgl2, tgl3];
								var d1, d2;
								for (var c=1;c < this.sg1.getColCount(); c++){
									d1 = this.colData[c-1];
									d2 = d1.DateAdd("d",6);
									sql.add("insert into tlk_pelaksanaan_d (no_pelaksanaan, nu,nm_pekerjaan, tgl_mulai, tgl_selesai, target, realisasi, kode_lokasi)"+
										" values('"+this.ed_kode.getText()+"','"+i+"','"+this.sg1.cells(0,i)+"','"+d1.getDateStr()+"','"+d2.getDateStr()+"','"+parseNilai(this.sg1.cells(c,i))+"','0','"+this.app._lokasi+"')");
								}
							}
						}
						if (files.length > 0){
							var scan = "insert into tlk_pelaksanaan_dok (no_pelaksanaan,kode_lokasi,no_file,nama,nu) values ";						
							var first = true;
							var noUrut=1;
							for (var i in files){
								if (!first) scan +=",";
								scan += "('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+files[i]+"','"+files[i]+"',"+noUrut+")";
								first = false;
								noUrut++;
							}
							sql.add(scan);
						}
						this.uplFile = 0;
						this.dbLib.execArraySQL(sql);
					}
				break;		
				case "hapus":
					this.delFiles = "";
					for (var i=0; i < this.sgUpld.getRowCount();i++){		
						if (this.sgUpld.cells(0,i) != ""){ 
							if (this.delFiles != "") { 								
								this.delFiles += ";";
							}                               							
							this.delFiles += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;														
						}
					}
					var sql = new server_util_arrayList();
					sql.add("update tlk_klaim set progress = '8',flag9='0' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from tlk_pelaksanaan_dok where no_pelaksanaan = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from tlk_pelaksanaan_d where no_pelaksanaan = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from tlk_pelaksanaan where no_pelaksanaan = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);
				break;			
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){
		if (sender == this.dp_tgl) this.ed_Periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){
		if (sender == this.cb_klaim){
			this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
										  "select no_klaim, penyebab from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and progress='9' and status='1' ",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and progress='9' and status='1' ",
										  ["no_klaim","penyebab"],"and",["No Klaim","Keterangan"],false); 
		}		
		if (sender == this.cb_penunjukan){
			this.standarLib.showListData(this, "Data Penunjukan",sender,undefined, 
										  "select no_penunjukan, keterangan from tlk_penunjukan where kode_lokasi = '"+this.app._lokasi+"' and no_klaim = '"+this.cb_klaim.getText()+"'  ",
										  "select count(no_penunjukan) from tlk_penunjukan where kode_lokasi = '"+this.app._lokasi+"' and no_klaim = '"+this.cb_klaim.getText()+"' ",
										  ["no_penunjukan","keterangan"],"and",["No Pelaksanaan","Keterangan"],false); 
		}
		if (sender == this.cb_vendor){
			this.standarLib.showListData(this, "Data Vendor",sender,undefined, 
										  "select distinct a.kode_vendor, a.nama from tlk_vendor a inner join tlk_penunjukan_d b on b.kode_lokasi = a.kode_lokasi and b.kode_vendor = a.kode_vendor and b.no_penunjukan = '"+this.cb_penunjukan.getText()+"' where a.kode_lokasi = '"+this.app._lokasi+"'  ",
										  "select count(distinct a.kode_vendor) from tlk_vendor a inner join tlk_penunjukan_d b on b.kode_lokasi = a.kode_lokasi and b.kode_vendor = a.kode_vendor and b.no_penunjukan = '"+this.cb_penunjukan.getText()+"' where a.kode_lokasi = '"+this.app._lokasi+"'  ",
										  ["a.kode_vendor","a.nama"],"and",["Kode Vendor","Nama Vendor"],false); 
		}		
	},	
	doClick: function(sender){
		if (sender == this.bGen) this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_pelaksanaan','no_pelaksanaan',"PLK/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
		if (sender == this.bGen2){	
			try{
				this.sg1.clear();		
				var d1 = this.dp_tgl2.toSysDate();
				var d2 = this.dp_tgl3.toSysDate();							
				var colCount = 1;
				var colTitle = ["Pekerjaan"];
				this.colData = [];
				var dataFormat = [[],[]];								
				while (d1 < d2){					
					d3 = d1.DateAdd("d",6);
					colTitle[colTitle.length] = d1.weekOfMonth()+" "+d1.getFullYear();//d1.lclFormat();//, d3.lclFormat(), d1.weekOfMonth(),"0"]);
					this.colData[this.colData.length] = d1;
					dataFormat[0][dataFormat[0].length] = this.colData.length;
					dataFormat[1][dataFormat[1].length] = cfNilai;					
					d1 = d3.DateAdd("d",1);
					
				}
				this.sg1.setColCount(colTitle.length);
				this.sg1.setColTitle(colTitle);
				this.sg1.setColFormat(dataFormat[0],dataFormat[1]);
				this.sg1.setColWidth([0],[220]);
				this.sg1.setRowCount(1);
			}catch(e){
				alert(e);
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		/*if (sender == this.dbLib){
			if (methodName == "execArraySQL" && result.search("error") != -1){
				this.app._mainForm.pesan(2,"transfer file.............");
				this.fileLib.copyFileTo(this.dataUpload.tmpfile,this.dataUpload.rootSvr+"/server/media/"+this.dataUpload.original);
			}else{
				systemAPI.alert(result);
			}
		}
		if (sender == this.fileLib){
			if (methodName == "copyFileTo" && result.search("error") != -1){
				this.app._mainForm.pesan(2,"Proses Lengkap (kode lokasi : "+ this.ed_kode.getText()+" tersimpan.)");
				this.app._mainForm.bClear.click();
			}else systemAPI.alert(result);
		}*/
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{														
                            if (this.saveFiles != ""){//baru
                                this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");							
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);
                            }else if (this.saveFiles == ""){
                                system.alert(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
								this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);		
								this.sgUpld.clear(1);
							}
						}else system.info(this,result,"");
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){
	        switch(methodName){
    	       case "copyFilesTo" : 
                   if (result.indexOf("error") != -1){
        	           systemAPI.alert(result);
                   }else{ 
						this.app._mainForm.pesan(2,"upload "+result);	
						system.alert(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
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
	},
	/*doAfterUpload: function(sender, result, data, filename){
		if(result) this.ed_file.setText(filename);
		this.dataUpload = data;
		this.dataUpload.original = "tlk_"+new Date()+filename;
	},*/
	doChange: function(sender){
		try{
			if (sender == this.cb_klaim){			
				this.cb_penunjukan.setSQL("select no_penunjukan, keterangan from tlk_penunjukan where no_klaim = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",["no_penunjukan","keterangan"],false,["No Penunjukan","Keterangan"],"and","Daftar Penunjukan",true);		
				this.ed_kode.setSQL("select no_pelaksanaan, keterangan from tlk_pelaksanaan where no_klaim = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",["no_pelaksanaan","keterangan"],false,["No Pelaksanaan","Keterangan"],"and","Daftar Pelaksanaan",true);			
			}
			if (sender == this.ed_kode){
					var sql = new server_util_arrayList();
					sql.add("select periode, date_format(tanggal, '%d-%m-%Y') as tgl, no_dokumen, keterangan, kode_vendor, no_penunjukan, date_format(tgl_mulai, '%d-%m-%Y') as tgl_mulai, date_format(tgl_selesai, '%d-%m-%Y') as tgl_selesai from tlk_pelaksanaan where no_pelaksanaan = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("select no_file, nu from tlk_pelaksanaan_dok where no_pelaksanaan = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi +"' ");
					sql.add("select nu, nm_pekerjaan, tgl_mulai, target from tlk_pelaksanaan_d a where a.no_pelaksanaan = '"+sender.getText()+"' and a.kode_lokasi = '"+this.app._lokasi +"' order by nu, tgl_mulai");
					var data = this.dbLib.getMultiDataProvider(sql,true);
					setTipeButton(tbAllFalse);
					this.sgUpld.clear(0);				
					this.sg1.clear(0);				
					if (typeof data != "String" && data.result[0].rs.rows[0] != undefined){
						var line = data.result[0].rs.rows[0];
						this.dp_tgl.setText(line.tgl);
						this.ed_ket.setText(line.keterangan);
						this.ed_dok.setText(line.no_dokumen);
						this.ed_Periode.setText(line.periode);
						this.cb_penunjukan.setText(line.no_penunjukan);
						this.cb_vendor.setText(line.kode_vendor);
						this.dp_tgl2.setText(line.tgl_mulai);
						this.dp_tgl3.setText(line.tgl_selesai);
						this.doClick(this.bGen2);
						this.sg1.clear();
						this.fileSblm = new arrayMap();											
						for (var i in data.result[1].rs.rows){
							line = data.result[1].rs.rows[i];
							this.sgUpld.appendData([line.no_file,'Download']);
							this.sgUpld.rows.get(i).values[1]= {filedest:line.no_file, tmpfile:line.no_file};
							this.fileSblm.set(line.no_file,line.no_file);
						}
						var tmp = "";
						var dt = [];							
						for (var i in data.result[2].rs.rows){
							line = data.result[2].rs.rows[i];							
							if (tmp != line.nm_pekerjaan && tmp != ""){
								this.sg1.appendData(dt);
								dt = [];
								dt.push(line.nm_pekerjaan);
								tmp = line.nm_pekerjaan;
							}else if (tmp == ""){
								tmp = line.nm_pekerjaan;
								dt.push(line.nm_pekerjaan);
							}
							dt.push(floatToNilai(line.target));							
						}
						this.sg1.appendData(dt);
						setTipeButton(tbUbahHapus);				
					}else this.sgUpld.clear(1);
				}	
		}catch(e){
			alert(e);
		}
	},
	doAfterUpload: function(sender, result, data, filename){
		if (result){
			this.app._mainForm.pesan(2,"upload file "+filename+" sukses");										
		}else{
			systemAPI.alert("Gagal upload file");
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
