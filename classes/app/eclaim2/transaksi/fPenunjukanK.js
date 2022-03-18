window.app_eclaim2_transaksi_fPenunjukanK = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fPenunjukanK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fPenunjukanK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Penunjukan Vendor: Koreksi", 0);	
		uses("uploader;saiMemo;util_file;datePicker;pageControl");
		
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,2,220,20],caption:"No Penunjukan",readOnly:true, change:[this,"doChange"],btnClick:[this,"doFindBtnClick"], rightLabelVisib:false});
		this.cb_klaim = new saiCBBL(this,{bound:[20,3,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"], change:[this,"doChange"]});
		this.ed_dok = new saiLabelEdit(this,{bound:[20,6,300,20],caption:"No Dokumen", maxLength:45});				
		this.ed_ket = new saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});							
		this.p1 = new pageControl(this,{bound:[20,10,600,230],childPage:["Vendor","Upload Dokumen"]});
		this.sg1 = new saiGrid(this.p1.childPage[0],{bound:[1,5,597,195],colCount:4,colTitle:"Kode Vendor, Nama Vendor, No SPK, Tgl SPK", colWidth:[[3,2,1,0],[80,150,150,80]],
					buttonStyle:[[0,3],[bsEllips,bsDate]], rowCount:1, tag:9, ellipsClick:[this, "doEllipsClick"]});
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
window.app_eclaim2_transaksi_fPenunjukanK.extend(window.childForm);
window.app_eclaim2_transaksi_fPenunjukanK.implement({
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
						var sql = new server_util_arrayList();
						this.saveFiles = "", this.dest = "", first = true;
						var files = [];
						for (var i=0; i < this.sgUpld.getRowCount();i++){		
							if (this.sgUpld.cells(0,i) != "" && this.fileSblm.get(this.sgUpld.cells(1,i).filedest) == undefined){ 
								if (this.saveFiles != "") { 
									this.saveFiles += ";";
									this.dest += ";";
								}                               
								this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
								this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
								files.push(this.sgUpld.cells(1,i).filedest);
								first = false;                        
							}else if (this.sgUpld.cells(0,i) != ""){
								files.push(this.sgUpld.cells(1,i).filedest);
							}
						}
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						
						sql.add("delete from tlk_penunjukan_d where no_penunjukan = '"+this.ed_kode.getText()+"' and kode_lokasi =  '"+this.app._lokasi+"'  ");
						sql.add("delete from tlk_penunjukan_dok where no_penunjukan = '"+this.ed_kode.getText()+"' and kode_lokasi =  '"+this.app._lokasi+"'  ");
						sql.add("update tlk_penunjukan set periode='"+this.ed_Periode.getText()+"', tanggal='"+this.dp_tgl.getDateString()+"', no_dokumen='"+this.ed_dok.getText()+"', tgl_input=now(), nik_user='"+this.app._userLog+"', keterangan = '"+this.ed_ket.getText()+"' "+
							" where no_penunjukan = '"+this.ed_kode.getText()+"' and kode_lokasi =  '"+this.app._lokasi+"' ");
						sql.add("update tlk_klaim set progress = '8', flag8='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						for (var i=0; i < this.sg1.getRowCount(); i++){
							sql.add("insert into tlk_penunjukan_d (no_penunjukan, kode_vendor, no_spk, tgl_spk, kode_lokasi)values('"+this.ed_kode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.getCellDateValue(3,i)+"','"+this.app._lokasi+"')");
						}
						if (files.length > 0){
							var scan = "insert into tlk_penunjukan_dok (no_penunjukan,kode_lokasi,no_file,nama,nu) values ";						
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
						this.sgUpld.clear(1);
						this.sg1.clear(1);
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
					sql.add("update tlk_klaim set progress = '6',flag8='0' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from tlk_penunjukan_dok where no_penunjukan = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from tlk_penunjukan_d where no_penunjukan = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from tlk_penunjukan where no_penunjukan = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);
				break;			
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){
       this.ed_Periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){
		if (sender == this.cb_klaim){
			this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
										  "select no_klaim, alamat from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'  and progress = '8' and status='1' ",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress = '8' and status='1' ",
										  ["no_klaim","alamat"],"and",["No Klaim","Lokasi"],false); 
		}	
		if (sender == this.ed_kode){
			this.standarLib.showListData(this, "Data Penunjukan ",sender,undefined, 
										  "select a.no_penunjukan, a.keterangan from tlk_penunjukan a inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
										  " where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"' and b.progress='8'  and b.status='1' ",
										  "select count(a.no_penunjukan) from tlk_penunjukan a inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
										  " where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"' and b.progress='8' and b.status='1' ",
										  ["a.no_penunjukan","a.keterangan"],"and",["No Penunjukan","Keterangan"],false); 
		}
	},	
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_penunjukan','no_penunjukan',"PNJ/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
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
                                system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
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
			if (sender == this.ed_kode){
				var sql = new server_util_arrayList();
				sql.add("select no_klaim,periode, date_format(tanggal, '%d-%m-%Y') as tgl, no_dokumen, keterangan from tlk_penunjukan where no_penunjukan = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("select no_file, nu from tlk_penunjukan_dok where no_penunjukan = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi +"' ");
				sql.add("select a.kode_vendor, b.nama,date_format(tgl_spk, '%d/%m/%Y') as tgl_spk, a.no_spk from tlk_penunjukan_d a inner join tlk_vendor b on b.kode_vendor = a.kode_vendor and a.kode_lokasi = b.kode_lokasi where a.no_penunjukan = '"+sender.getText()+"' and a.kode_lokasi = '"+this.app._lokasi +"' ");
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
					this.cb_klaim.setText(line.no_klaim);
					this.fileSblm = new arrayMap();					
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						this.sgUpld.appendData([line.no_file,'Download']);
						this.sgUpld.rows.get(i).values[1]= {filedest:line.no_file, tmpfile:line.no_file};
						this.fileSblm.set(line.no_file,line.no_file);
					}
					for (var i in data.result[2].rs.rows){
						line = data.result[2].rs.rows[i];
						this.sg1.appendData([line.kode_vendor,line.nama, line.no_spk, line.tgl_spk]);
					}
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
    },
    doEllipsClick: function(sender, col, row){
		this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
		  "select kode_vendor, nama from tlk_vendor where kode_lokasi = '"+this.app._lokasi+"'",
		  "select count(kode_vendor)  from tlk_vendor where  kode_lokasi = '"+this.app._lokasi+"'",
		  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
	}
});
