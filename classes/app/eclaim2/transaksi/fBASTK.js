window.app_eclaim2_transaksi_fBASTK = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fBASTK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fBASTK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Berita Acara Serah Terima: Koreksi", 0);	
		uses("uploader;saiMemo;util_file;datePicker;pageControl");
		this.cb_klaim = new saiCBBL(this,{bound:[20,3,200,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"], change:[this,"doChange"]});		
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,200,20],caption:"No BAST",readOnly:true, multiSelection:false, change:[this,"doChange"]});
		this.ed_dok = new saiLabelEdit(this,{bound:[20,6,300,20],caption:"No Dokumen", maxLength:45});		
		this.ed_ket = new saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});							
		this.p1 = new pageControl(this,{bound:[20,10,600,230],childPage:["B A U T","Upload Dokumen"]});
		this.sg1 = new saiGrid(this.p1.childPage[0],{bound:[1,5,597,195],colCount:6,colTitle:"No BAUT,Tanggal,Keterangan, No Dokumen,Kode Vendor,Nama", colWidth:[[4,3,2,1,0],[150,100,200,80,100]],
					readOnly:true, rowCount:1, tag:9});
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
window.app_eclaim2_transaksi_fBASTK.extend(window.childForm);
window.app_eclaim2_transaksi_fBASTK.implement({
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
							if (this.sgUpld.cells(0,i) != ""){ 
								if (!first) { 
									this.saveFiles += ";";
									this.dest += ";";
								}                               
								this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
								this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
								files.push(this.sgUpld.cells(1,i).filedest);
								first = false;                        
							}
						}
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						sql.add("delete from tlk_bast_dok where no_bast = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("delete from tlk_bast_d where no_bast = '"+this.ed_kode.getText()+"' ");
						sql.add("update tlk_bast set periode='"+this.ed_Periode.getText()+"', tanggal='"+this.dp_tgl.getDateString()+"', no_dokumen='"+this.ed_dok.getText()+"', keterangan='"+this.ed_ket.getText()+"'  "+
						" where no_bast = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						
						for (var i=0; i < this.sg1.getRowCount(); i++){
							if (this.sg1.rowValid(i))
								sql.add("insert into tlk_bast_d (no_bast, nu,no_baut)"+
									" values('"+this.ed_kode.getText()+"','"+i+"','"+this.sg1.cells(0,i)+"')");
						}
						sql.add("update tlk_klaim set progress = '13',flag12='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						if (files.length > 0){
							var scan = "insert into tlk_bast_dok (no_bast,kode_lokasi,no_file,nama,nu) values ";						
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
					var sql = new server_util_arrayList();
					sql.add("delete from tlk_bast_dok where no_bast = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from tlk_bast_d where no_bast = '"+this.ed_kode.getText()+"'");
					sql.add("delete from tlk_bast where no_bast = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("update tlk_klaim set progress = '8',flag12='0' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
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
										  "select no_klaim, alamat from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('12') and flag12='1' and status='1' ",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('12') and flag12='1' and status='1' ",
										  ["no_klaim","alamat"],"and",["No Klaim","Lokasi"],false); 
		}				
	},	
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_bast','no_bast',"BA/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
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
	doAfterUpload: function(sender, result, data, filename){
		if (result){
			this.app._mainForm.pesan(2,"upload file "+filename+" sukses");										
		}else{
			systemAPI.alert("Gagal upload file");
		}
	},
	doChange: function (sender){
		if (sender == this.ed_kode){
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
				"select periode, date_format(tanggal,'%d-%m-%Y') as tgl, no_dokumen, kode_lokasi, tgl_input, nik_user,keterangan from tlk_bast where no_bast = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",
				"select no_file, nu from tlk_bast_dok where no_bast = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "				
				]}),true);
			setTipeButton(tbAllFalse);
			if (typeof data != "String"){
				var line = data.result[0].rs.rows[0];
				if (line){
					this.dp_tgl.setText(line.tgl);
					this.ed_dok.setText(line.no_dokumen);
					this.ed_ket.setText(line.keterangan);				
					this.sgUpld.clear();
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						this.sgUpld.appendData([line.no_file, {filedest:line.no_file,tmpfile:line.no_file }]);
					}					
					setTipeButton(tbUbahHapus);
				}
			}
		}
		if (sender == this.cb_klaim){
			this.ed_kode.setSQL("select no_bast, keterangan from tlk_bast where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+sender.getText()+"' and jenis = 'FUL'",["no_bast","keterangan"],false, ["No BAST","Keterangan"],"and","Daftar BAST", true);
			var data = this.dbLib.getDataProvider("select no_baut, date_format(tanggal,'%d/%m/%Y') as tgl, keterangan, a.kode_vendor, nama, no_dokumen from tlk_baut a inner join tlk_vendor b on b.kode_vendor = a.kode_vendor where no_klaim= '"+sender.getText()+"' ",true);
			this.sg1.clear();
			if (typeof data != "string"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.no_baut, line.tgl, line.keterangan, line.no_dokumen, line.kode_vendor, line.nama]);
				}
			}
		}
		if (sender == this.cb_vendor){
			
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
