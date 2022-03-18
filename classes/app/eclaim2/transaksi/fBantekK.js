window.app_eclaim2_transaksi_fBantekK = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fBantekK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fBantekK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Bantuan Teknis : Koreksi", 0);	
		uses("uploader;saiMemo;util_file;datePicker");
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,220,20],caption:"No BANTEK",multiSelection:false, change:[this,"doChange"]});
		this.cb_klaim = new saiCBBL(this,{bound:[20,3,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});						
		this.ed_dok = new saiLabelEdit(this,{bound:[20,6,300,20],caption:"No Dokumen", maxLength:45});				
		this.cb_vendor = new saiCBBL(this,{bound:[20,3,200,20],caption:"Vendor", btnClick:[this,"doFindBtnClick"]});
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
		this.rootDir = this.app._rootDir;			
		this.separator = "/";
		this.ed_kode.setSQL("select a.no_bantek, a.keterangan "+
							"from tlk_bantek a "+
							"inner join tlk_klaim b on a.no_klaim=b.no_klaim "+
							"where  a.kode_lokasi = '"+this.app._lokasi+"' and b.progress='2' ",["no_bantek","keterangan"],false,["No Bantek","Keterangan"],"where","Daftar Bantek", true);
		
		this.onClose.set(this,"doClose");
	}
};
window.app_eclaim2_transaksi_fBantekK.extend(window.childForm);
window.app_eclaim2_transaksi_fBantekK.implement({
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
							if (this.sgUpld.cells(0,i) != "" && this.fileSblm.get( this.sgUpld.cells(1,i).filedest) == undefined){ 
								if (this.saveFiles != "") { 
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
						sql.add("delete from tlk_bantek_dok where no_bantek= '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");						
						sql.add("update tlk_bantek set kode_vendor='"+this.cb_vendor.getText()+"' , periode ='"+this.ed_Periode.getText()+"', tanggal='"+this.dp_tgl.getDateString()+"' "+
							" ,	no_dokumen = '"+this.ed_dok.getText()+"', tgl_input=now(), nik_user='"+this.app._userLog+"', keterangan='"+this.ed_ket.getText()+"' "+
							" where no_bantek = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_klaim = '"+this.cb_klaim.getText()+"' ");
						//sql.add("update tlk_klaim set progress = '2', flag2='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						if (files.length > 0){
							var scan = "insert into tlk_bantek_dok (no_bantek,kode_lokasi,no_file,nama,nu) values ";						
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
					sql.add("delete from tlk_bantek_dok where no_bantek= '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");						
					sql.add("delete from tlk_bantek where no_bantek= '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");						
					sql.add("update tlk_klaim set progress = '1', flag2='0' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
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
										  "select no_klaim, penyebab from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('2')  and status='1'",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('2') and status='1' ",
										  ["no_klaim","penyebab"],"and",["No Klaim","Keterangan"],false); 
		}		
		if (sender == this.cb_vendor){
			this.standarLib.showListData(this, "Data Vendor",sender,undefined, 
										  "select kode_vendor, nama from tlk_vendor where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(kode_vendor) from tlk_vendor where kode_lokasi = '"+this.app._lokasi+"'  ",
										  ["kode_vendor","nama"],"and",["Kode Vendor","Nama"],false); 
		}		
	},	
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_bantek','no_bantek',"BNT/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
	},
	doChange: function(sender){
		if (sender == this.ed_kode){
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
				"select a.keterangan, a.no_klaim,date_format(a.tanggal,'%d-%m-%Y') as tgl, a.status, a.kode_vendor, a.no_dokumen from tlk_bantek a "+
				" where a.no_bantek = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'" ,
				"select no_file, nu from tlk_bantek_dok a  "+
				" where a.no_bantek = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by nu",
				]}),true);
			 setTipeButton(tbAllFalse);
			 this.sgUpld.clear();
			if (typeof data != "String"){
				if (data.result[0].rs.rows[0] != undefined){
					var line = data.result[0].rs.rows[0];
					this.cb_klaim.setText(line.no_klaim);
					this.ed_ket.setText(line.keterangan);
					this.dp_tgl.setText(line.tgl);s
					this.cb_vendor.setText(line.kode_vendor);
					this.ed_dok.setText(line.no_dokumen);					
					this.fileSblm = new arrayMap();
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						this.sgUpld.appendData([line.no_file,'Download']);
						this.sgUpld.rows.get(i).values[1]= {filedest:line.no_file, tmpfile:line.no_file};
						this.fileSblm.set(line.no_file,line.no_file);
					}
					setTipeButton(tbUbahHapus);
				}
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
