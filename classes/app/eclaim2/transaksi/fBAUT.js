window.app_eclaim2_transaksi_fBAUT = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fBAUT.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fBAUT";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Berita Acara Uji Terima: Input", 0);	
		uses("uploader;saiMemo;util_file;datePicker;pageControl");
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No BAUT",readOnly:true});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
		this.cb_klaim = new saiCBBL(this,{bound:[20,3,200,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.cb_pelaksanaan = new saiCBBL(this,{bound:[20,4,200,20],caption:"No Pelaksanaan", btnClick:[this,"doFindBtnClick"], change:[this,"doChange"]});
		this.cb_vendor = new saiCBBL(this,{bound:[20,5,200,20],caption:"Vendor", btnClick:[this,"doFindBtnClick"], change:[this,"doChange"]});
		this.ed_dok = new saiLabelEdit(this,{bound:[20,6,300,20],caption:"No Dokumen", maxLength:45});		
		this.ed_ket = new saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});							
		this.p1 = new pageControl(this,{bound:[20,10,600,230],childPage:["Item Pekerjaan","Upload Dokumen"]});
		this.sg1 = new saiGrid(this.p1.childPage[0],{bound:[1,5,597,195],colCount:3,colTitle:"Pekerjaan,Tgl Selesai, Realisasi(%)", colWidth:[[2,1,0],[80,80,250]],
					rowCount:1, tag:9, buttonStyle:[[1],[bsDate]],colReadOnly:[true,[0],[]],change:[this,"doGridChange"],});
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
window.app_eclaim2_transaksi_fBAUT.extend(window.childForm);
window.app_eclaim2_transaksi_fBAUT.implement({
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
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
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
						
						sql.add("insert into tlk_baut (no_baut, no_klaim, periode, tanggal, no_dokumen, kode_lokasi, tgl_input, nik_user,keterangan, no_pelaksanaan, kode_vendor) values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_klaim.getText()+"','"+this.ed_Periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_dok.getText()+"',"+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.ed_ket.getText()+"','"+this.cb_pelaksanaan.getText()+"','"+this.cb_vendor.getText()+"') ");
						
						for (var i=0; i < this.sg1.getRowCount(); i++){
							if (this.sg1.rowValid(i))
								sql.add("update tlk_pelaksanaan_d set tgl_realisasi='"+this.sg1.getCellDateValue(1,i)+"',realisasi = '"+parseNilai(this.sg1.cells(2,i))+"' "+
									" where no_pelaksanaan = '"+ this.cb_pelaksanaan.getText()+"' and nu = '"+i+"' ");
						}
						sql.add("update tlk_klaim set progress = '10', flag10='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						if (files.length > 0){
							var scan = "insert into tlk_baut_dok (no_baut,kode_lokasi,no_file,nama,nu) values ";						
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
										  "select no_klaim, penyebab from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('9') and flag10='0' and status='1' ",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('9') and flag10='0' and status='1' ",
										  ["no_klaim","penyebab"],"and",["No Klaim","Keterangan"],false); 
		}		
		if (sender == this.cb_pelaksanaan){
			this.standarLib.showListData(this, "Data Pelaksanaan",sender,undefined, 
										  "select no_pelaksanaan, keterangan from tlk_pelaksanaan where kode_lokasi = '"+this.app._lokasi+"' and no_klaim = '"+this.cb_klaim.getText()+"' ",
										  "select count(no_pelaksanaan) from tlk_pelaksanaan where kode_lokasi = '"+this.app._lokasi+"' and no_klaim = '"+this.cb_klaim.getText()+"' ",
										  ["no_pelaksanaan","keterangan"],"and",["No Pelaksanaan","Keterangan"],false); 
		}
		if (sender == this.cb_vendor){
			this.standarLib.showListData(this, "Data Vendor",sender,undefined, 
										  "select distinct a.kode_vendor, a.nama from tlk_vendor a inner join tlk_pelaksanaan b on b.kode_lokasi = a.kode_lokasi and b.kode_vendor = a.kode_vendor and b.no_pelaksanaan = '"+this.cb_pelaksanaan.getText()+"' where a.kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(distinct a.kode_vendor) from tlk_vendor a inner join tlk_pelaksanaan b on b.kode_lokasi = a.kode_lokasi and b.kode_vendor = a.kode_vendor and b.no_pelaksanaan = '"+this.cb_pelaksanaan.getText()+"' where a.kode_lokasi = '"+this.app._lokasi+"' ",
										  ["a.kode_vendor","a.nama"],"and",["Kode Vendor","Nama Vendor"],false); 
		}		
	},	
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_baut','no_baut',"BAUT/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
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
	doChange: function (sender){
		if (sender == this.cb_pelaksanaan){
			var data = this.dbLib.getDataProvider("select distinct nu, nm_pekerjaan, realisasi from tlk_pelaksanaan_d where no_pelaksanaan= '"+this.cb_pelaksanaan.getText()+"' order by nu",true);
			this.sg1.clear();
			if (typeof data != "string"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.nm_pekerjaan, '-', floatToNilai(line.realisasi)]);
				}
			}
		}
		if (sender == this.cb_vendor){
			
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{			
			if (sender == this.sg1 && col == 0){
				
			}
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
