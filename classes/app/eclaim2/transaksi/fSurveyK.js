window.app_eclaim2_transaksi_fSurveyK = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fSurveyK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fSurveyK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Survey: Koreksi", 0);	
		uses("portalui_uploader;portalui_saiMemo;util_file;portalui_datePicker");		
		this.ed_periode = new portalui_saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,1,100,20],caption:"Tanggal Survey",underline:true});
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,2,220,20],caption:"No Survey",readOnly:true, btnClick:[this,"doFindBtnClick"], rightLabelVisible:false, change:[this,"doChange"]});		
		this.cb_klaim = new portalui_saiCBBL(this,{bound:[20,3,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,6,300,20],caption:"No Dokumen", maxLength:50});
		this.cb_la = new portalui_saiCBBL(this,{bound:[20,7,200,20],caption:"Loss Adjuster", btnClick:[this,"doFindBtnClick"]});
		this.cStatus = new portalui_saiCB(this,{bound:[20,8,200,20],caption:"Status",items:["LIABLE","NOT LIABLE"],tag:2});
		this.ed_ket = new portalui_saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});							
		this.p1 = new portalui_panel(this,{bound:[20,10,600,230],caption:"Upload Dokumen"});
		this.sgUpld = new portalui_saiGrid(this.p1,{bound:[1,20,598,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,480]], readOnly:true, change:[this,"doGridChange"],tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height - 25,598,25],buttonStyle:1, grid:this.sgUpld});
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbAllFalse);
		this.ed_periode.setText(this.dp_tgl.getThnBln());
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);			
		this.fileBfr = new portalui_arrayMap();
		this.onClose.set(this,"doClose");
	}
};
window.app_eclaim2_transaksi_fSurveyK.extend(window.portalui_childForm);
window.app_eclaim2_transaksi_fSurveyK.implement({
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
					if (result == mrOk) {
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.eKontrak);		
						this.sgUpld.clear(1);
					}
				break;
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
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
						if (this.cStatus.getText() === "LIABLE") 
						{
							var status = "1";
							var status2 = "0";
							var progress="3";
						}
						else
						{
							var status = "0";
							var status2 = "1";
							var progress="15";
						}
						sql.add("delete from tlk_survey_dok where kode_lokasi = '"+this.app._lokasi+"' and no_survey = '"+this.ed_kode.getText()+"' ");
						sql.add("delete from tlk_survey where kode_lokasi = '"+this.app._lokasi+"' and no_survey = '"+this.ed_kode.getText()+"' ");
						sql.add("insert into tlk_survey (no_survey, no_klaim, periode, tanggal, no_dokumen, kode_lokasi, tgl_input, nik_user, kode_la,status,keterangan) values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_klaim.getText()+"','"+this.ed_periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_dok.getText()+"',"+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.cb_la.getText()+"','"+status+"','"+this.ed_ket.getText()+"') ");
						sql.add("update tlk_klaim set progress = '"+progress+"',flag3='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						if (files.length > 0){
							var scan = "insert into tlk_survey_dok (no_survey,kode_lokasi,no_file,nama,nu) values ";						
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
				case "hapus" :
					sql.add("delete from tlk_survey_dok where kode_lokasi = '"+this.app._lokasi+"' and no_survey = '"+this.ed_kode.getText()+"' ");
					sql.add("delete from tlk_survey where kode_lokasi = '"+this.app._lokasi+"' and no_survey = '"+this.ed_kode.getText()+"' ");
					sql.add("update tlk_klaim set progress = '1',flag3='0' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){
       this.ed_periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){
		switch (sender){
			case this.cb_klaim : 
				this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
										  "select no_klaim, alamat from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('3') and status='1'  ",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('3') and status='1' ",
										  ["no_klaim","alamat"],"and",["No Klaim","Alamat"],false); 
			break;
			case this.cb_la :
				this.standarLib.showListData(this, "Data Loss Adjuster",sender,undefined, 
										  "select kode_la, nama from tlk_la where kode_lokasi = '"+this.app._lokasi+"'  ",
										  "select count(kode_la) from tlk_la where kode_lokasi = '"+this.app._lokasi+"'  ",
										  ["kode_la","nama"],"and",["Kode","Nama"],false); 
			break;
			case this.ed_kode :
				this.standarLib.showListData(this, "Data Survey",sender,undefined, 
										  "select a.no_survey, a.keterangan from tlk_survey a inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"' and b.progress in ('3','15') ",
										  "select count(a.no_survey) from tlk_survey a inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"' and b.progress in ('3','15') ",
										  ["no_survey","keterangan"],"and",["No Survey","Keterangan"],false); 
			break;
		}
	},
	doChange: function(sender){
		try{	
			if (sender == this.ed_kode){				
				if (sender.getText() != ""){	
					var data = this.dbLib.getDataProvider("select a.*, b.alamat, c.nama as nm_la from tlk_survey a "+
						" inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi and b.kode_ttg= '"+this.app._kodeTtg+"' "+
						" inner join tlk_la c on c.kode_la = a.kode_la and c.kode_lokasi = a.kode_lokasi "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_survey = '"+sender.getText()+"' ",true);
					if (typeof data != "string" && data.rs.rows[0] !== undefined){
						data = data.rs.rows[0];	
						
						this.cb_klaim.setText(data.no_klaim,data.alamat);
						this.ed_dok.setText(data.no_dokumen);
						this.cb_la.setText(data.kode_la, data.nm_la);
						this.cStatus.setText(data.status == "1" ? "LIABLE":"NOT LIABLE");
						this.ed_ket.setText(data.keterangan);
						this.ed_periode.setText(data.periode);
						this.dp_tgl.setText(data.tanggal)
						data = this.dbLib.getDataProvider("select nama,nu from tlk_survey_dok where no_survey = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by nu",true);
						this.sgUpld.clear();
						this.fileBfr = new portalui_arrayMap();
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];
							this.sgUpld.appendData([line.nama, {filedest:line.nama, filename:line.nama}]);
							this.fileBfr.set(line.nama, line.nama);
						}
						setTipeButton(tbUbahHapus);
					}else setTipeButton(tbAllFalse);
				}else setTipeButton(tbAllFalse);
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_survey','no_survey',"SRV/"+this.ed_periode.getText().substring(2)+"/",'0000'));
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
							var delFile = "", first = true, ketemu = true;
                            for (var i in this.fileBfr.objList){
                                ketemu = false;
                                for (var r=0;r < this.sgUpld.getRowCount();r++){
                                    if (this.sgUpld.cells(0,r) == this.fileBfr.get(i)){
                                        ketemu = true;
                                        break;
                                    }
                                }
							     if (!ketemu){
							         if (!first) delFile += ";";
                                     delFile += this.rootDir+"/server/media/"+this.fileBfr.get(i);
                                     first = false;
                                 }
                            }
                            if (delFile != "") this.fileUtil.deleteFiles(delFile);
                            if ((delFile != "" && this.fileBfr.getLength() > 0)){//cek dulu jika ada perbedaan , upload yg beda aja
                                this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+").. waiting upload");							
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);
                            }else if (delFile == "" && this.fileBfr.getLength() > 0){//menambah
                                this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+").. waiting upload");
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);
                            }else if (this.fileBfr.getLength() == 0 && this.saveFiles != ""){//baru
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
