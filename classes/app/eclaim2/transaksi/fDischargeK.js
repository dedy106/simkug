window.app_eclaim2_transaksi_fDischargeK = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fDischargeK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fDischargeK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Discharge Form", 0);	
		uses("uploader;saiMemo;util_file;datePicker");		
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,18],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,200,20],caption:"No Discharge",readOnly:true, btnClick:[this,"doFindBtnClick"], change:[this,"doChange"]});		
		this.cb_klaim = new saiCBBL(this,{bound:[20,3,200,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});	
		this.cb_bast = new saiCBBL(this,{bound:[20,3,200,20],caption:"No BAST", btnClick:[this,"doFindBtnClick"]});	
		this.ed_dok = new saiLabelEdit(this,{bound:[20,6,350,20],caption:"No Dokumen", maxLength:45});						
		this.ed_ket = new saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});		
			
		this.p1 = new panel(this,{bound:[20,10,600,230],caption:"Upload Dokumen"});
		this.sgUpld = new saiGrid(this.p1,{bound:[1,20,598,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,480]], readOnly:true, change:[this,"doGridChange"], rowCount:1,tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,598,25],buttonStyle:1, grid:this.sgUpld});
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.ed_Periode.setText(this.dp_tgl.getThnBln());
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
		
		this.onClose.set(this,"doClose");
	}
};
window.app_eclaim2_transaksi_fDischargeK.extend(window.childForm);
window.app_eclaim2_transaksi_fDischargeK.implement({
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
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.eKontrak);		
						this.sgUpld.clear(1);
					}
				break;
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						this.saveFiles = "", this.dest = "", first = true;
						var files = [];
						for (var i=0; i < this.sgUpld.getRowCount();i++){					   
							if (this.sgUpld.cells(0,i) != ""){ 
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
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						sql.add("delete from tlk_df_dok where no_df = '"+this.ed_kode.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"'");
						sql.add("update from tlk_df set no_bast='"+this.cb_bast.getText()+"', periode='"+this.ed_Periode.getText()+"', tanggal='"+this.dp_tgl.getDateString()+"', no_dokumen='"+this.ed_dok.getText()+"', keterangan='"+this.ed_ket.getText()+"' where no_df = '"+this.ed_kode.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"'");						
						sql.add("update tlk_klaim set progress = '12',flag13='1', status='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						if (files.length > 0){
							var scan = "insert into tlk_df_dok (no_df,kode_lokasi,no_file,nama,nu) values ";						
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
				case "ubah" :
					
				break;
				case "hapus" :
					sql.add("delete from tlk_df_dok where no_df = '"+this.ed_kode.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"'");
					sql.add("delete from tlk_df where no_df = '"+this.ed_kode.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"'");
					sql.add("update tlk_klaim set progress = '12',flag13='0' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
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
		if (sender == this.ed_kode){
			this.standarLib.showListData(this, "Data Discharge Form",sender,undefined, 
										  "select no_df, keterangan from tlk_df where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"'  and nik_user = '"+this.app._userLog+"' ",
										  "select count(no_df) from tlk_df where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"' and nik_user = '"+this.app._userLog+"'  ",
										  ["no_df","keterangan"],"and",["No Discharge Form","Keterangan"],false); 
		}
		if (sender == this.cb_bast){
			this.standarLib.showListData(this, "Data BAST",sender,undefined, 
										  "select no_bast, keterangan from tlk_bast where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"'  and nik_user = '"+this.app._userLog+"'  and jenis='FUL' ",
										  "select count(no_bast) from tlk_bast where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"' and nik_user = '"+this.app._userLog+"'  and jenis='FUL' ",
										  ["no_bast","keterangan"],"and",["No BAST","Keterangan"],false); 
		}
		if (sender == this.cb_klaim){			
			this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
										  "select no_klaim, alamat from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress='12' and status='1'  ",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress='12' and status='1' ",
										  ["no_klaim","alamat"],"and",["No Klaim","Lokasi"],false); 
		}
	},
	doChange: function(sender){		
		if (sender == this.ed_kode){
			if (sender.getText() != ""){	
				var slq = new server_util_arrayList({items:[
					"select * from tlk_df where kode_lokasi = '"+this.app._lokasi+"' and no_df = '"+sender.getText()+"' ",
					"select * from tlk_df_dok where kode_lokasi = '"+this.app._lokasi+"' and no_df = '"+sender.getText()+"' ",
				]});
				var data = this.dbLib.getMultiDataProvider(sql,true);
				if (typeof data != "string" && data.result[0].rs.rows[0] !== undefined){
					var dok = data.result[1];	
					data = data.result[0].rs.rows[0];	
					this.ed_periode.setText(data.periode);
					this.dp_tgl.setDate(data.tgl);
					this.cb_klaim.setText(data.no_klaim,"");
					this.ed_dok.setText(data.no_dokumen);
					this.cb_bast.setText(data.no_bast);
					this.ed_ket.setText(data.keterangan);
					this.sgUpld.clear();
					for (var d in dok.rs.rows){
						var line = dok.rs.rows[i];
						this.sgUpld.appendData([line.no_file, {filedest:line.nama, tmpfile:line.nama}]);
					}
					setTipeButton(tbUbahHapus);
				}else setTipeButton(tbSimpan);
			}
		}	
	},
	doClick: function(sender){		
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
	doAfterUpload: function(sender, result, data, filename){
		if (result){
			this.app._mainForm.pesan(2,"upload file "+filename+" sukses");							
			this.uplFile++;
			if (this.uplFile == 3) this.app._mainForm.bClear.click();              
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
