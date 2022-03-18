window.app_eclaim2_transaksi_fProgressK = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fProgressK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fProgressK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Progress Pelaksanaan Pekerjaan: Input", 0);	
		uses("uploader;saiMemo;util_file;datePicker;pageControl");
		this.cb_klaim = new saiCBBL(this,{bound:[20,3,200,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"], change:[this,"doChange"]});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,200,20],btnClick:[this,"doFindBtnClick"],caption:"No Progress",change:[this,"doChange"],readOnly:true});
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
				
		this.cb_pelaksanaan = new saiCBBL(this,{bound:[20,4,200,20],caption:"No Pelaksanaan", readOnly:true,change:[this,"doChange"]});
		this.cb_vendor = new saiCBBL(this,{bound:[20,5,200,20],caption:"Vendor", readOnly:true, change:[this,"doChange"]});		
		this.ed_ket = new saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});							
		this.p1 = new pageControl(this,{bound:[20,10,600,230],childPage:["Realisasi Item Pekerjaan","Upload Dokumen"]});
		this.sg1 = new saiGrid(this.p1.childPage[0],{bound:[1,5,597,195],colCount:3,colTitle:"Pekerjaan, < Minggu ini(%),Minggu ini(%)", colWidth:[[2,1,0],[80,80,250]],
					rowCount:1, tag:9, colFormat:[[1,2],[cfNilai,cfNilai]],colReadOnly:[true,[0],[]],change:[this,"doGridChange"],colReadOnly:[true,[1],[]]});
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
window.app_eclaim2_transaksi_fProgressK.extend(window.childForm);
window.app_eclaim2_transaksi_fProgressK.implement({
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
						//this.doClick();
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
						
						sql.add("update tlk_progresspk set periode ='"+this.ed_Periode.getText()+"', tanggal='"+this.dp_tgl.getDateString()+"', "+
							" keterangan='"+this.ed_ket.getText()+"'  "+
							" where no_progress ='"+this.ed_kode.getText()+"' ");
						
						sql.add("delete from tlk_progresspk_d where no_progress = '"+this.ed_kode.getText()+"' ");
						sql.add("delete from tlk_progresspk_dok where no_progress = '"+this.ed_kode.getText()+"' ");
						for (var i=0; i < this.sg1.getRowCount(); i++){
							if (this.sg1.rowValid(i))
								sql.add("insert into tlk_progresspk_d (no_progress, nu,nm_pekerjaan,realisasi, kode_lokasi)"+
									" values('"+this.ed_kode.getText()+"','"+i+"','"+this.sg1.cells(0,i)+"','"+parseNilai(this.sg1.cells(2,i))+"','"+this.app._lokasi+"')");
						}
						if (files.length > 0){
							var scan = "insert into tlk_progresspk_dok (no_progress,kode_lokasi,no_file,nama,nu) values ";						
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
												
						sql.add("delete from tlk_progresspk where no_progress = '"+this.ed_kode.getText()+"' ");
						sql.add("delete from tlk_progresspk_d where no_progress = '"+this.ed_kode.getText()+"' ");
						sql.add("delete from tlk_progresspk_dok where no_progress = '"+this.ed_kode.getText()+"' ");						
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
										  "select no_klaim, penyebab from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress='9' and status='1'",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress='9' and status='1' ",
										  ["no_klaim","penyebab"],"and",["No Klaim","Keterangan"],false); 
		}	
		if (sender == this.ed_kode){
			this.standarLib.showListData(this, "Data Progress",sender,undefined, 
										  "select no_progress, keterangan from tlk_progresspk where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"' ",
										  "select count(no_progress) from tlk_progresspk where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"' ",
										  ["no_progress","keterangan"],"and",["No Progress","Keterangan"],false); 
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
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_progresspk','no_progress',"PRG/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
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
		if (sender == this.ed_kode){
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
						" select a.periode, a.tanggal, a.keterangan, a.no_pelaksanaan, a.kode_vendor, b.nama "+
						" from tlk_progresspk a inner join tlk_vendor b on b.kode_vendor = a.kode_vendor  "+
						" where a.no_progress = '"+sender.getText()+"' ",
						"select a.nm_pekerjaan, a.realisasi, sum(d.realisasi * b.bobot/100) as prog from tlk_progresspk_d a "+
						" inner join tlk_progresspk c on c.no_progress = a.no_progress "+
						" inner join tlk_pelaksanaan b on b.no_pelaksanaan = c.no_pelaksanaan "+						
						" left outer join (select b.no_pelaksanaan, a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress and b.no_klaim = '"+ this.cb_klaim.getText()+"' and b.no_progress <> '"+sender.getText()+"' order by b.tanggal) d on d.tanggal <=  a.tgl_mulai and d.nm_pekerjaan = a.nm_pekerjaan and d.no_pelaksanaan = b.no_pelaksanaan "+
						"	where a.no_progress = '"+sender.getText()+"' group by a.nm_pekerjaan"
						]}),true);
			
			setTipeButton(tbAllFalse);
			if (typeof data != "string"){
				var dt1 = data.result[0];
				this.ed_Periode.setText(dt1.rs.rows[0].periode);
				this.ed_ket.setText(dt1.rs.rows[0].keterangan);
				this.cb_vendor.setText(dt1.rs.rows[0].kode_vendor, dt1.rs.rows[0].nama);
				this.cb_pelaksanaan.setText(dt1.rs.rows[0].no_pelaksanaan);
				setTipeButton(tbUbahHapus);
				var line;
				this.sg1.clear();
				for (var i in data.result[1].rs.rows){
					line = data.result[1].rs.rows[i];
					this.sg1.appendData([line.nm_pekerjaan, line.prog, line.realisasi]);					
				}
				this.sgUpld.clear();
				for (var i in data.result[2].rs.rows){
					line = data.result[2].rs.rows[i];
					this.sgUpld.appendData([line.no_file, {tmpfile:line.no_file, filedest:line.no_file}]);					
				}
			}
		}
		if (sender == this.cb_pelaksanaan){
			try{
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
						"select a.nu,a.nm_pekerjaan,sum(d.realisasi * b.bobot / 100) as prog "+
						"	from (select distinct nu,no_pelaksanaan, tgl_mulai, nm_pekerjaan from (select distinct a.nu,a.no_pelaksanaan,a.tgl_mulai, a.nm_pekerjaan from tlk_pelaksanaan_d a inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan and b.no_klaim = '"+ this.cb_klaim.getText() +"' "+
						"	 union	"+
						"		select distinct c.nu,a.no_pelaksanaan, a.tanggal, c.nm_pekerjaan from tlk_progresspk a inner join tlk_progresspk_d c on c.no_progress = a.no_progress inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan and a.tanggal > b.tgl_selesai and b.no_klaim = a.no_klaim and b.no_klaim = '"+ this.cb_klaim.getText()+"' ) a ) a "+
						" inner join tlk_pelaksanaan b on b.no_pelaksanaan = a.no_pelaksanaan "+
						" left outer join (select b.no_pelaksanaan, a.nm_pekerjaan, b.tanggal, a.realisasi from tlk_progresspk_d a inner join tlk_progresspk b on b.no_progress = a.no_progress and b.no_klaim = '"+ this.cb_klaim.getText()+"' order by b.tanggal) d on d.tanggal <=  a.tgl_mulai and d.nm_pekerjaan = a.nm_pekerjaan and d.no_pelaksanaan = a.no_pelaksanaan "+
						" where b.no_klaim = '"+ this.cb_klaim.getText()+"' group by a.nm_pekerjaan, a.nu order by a.nm_pekerjaan, a.nu",
						"select distinct a.kode_vendor, a.nama from tlk_vendor a inner join tlk_pelaksanaan b on b.kode_lokasi = a.kode_lokasi and b.kode_vendor = a.kode_vendor and b.no_pelaksanaan = '"+this.cb_pelaksanaan.getText()+"' where a.kode_lokasi = '"+this.app._lokasi+"'"
						]}),true);
			
				this.sg1.clear();
				if (typeof data != "string" && data.result[1].rs.rows[0]){
					var line;
					this.cb_vendor.setText(data.result[1].rs.rows[0].kode_vendor,data.result[1].rs.rows[0].nama);
					data = data.result[0];
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						this.sg1.appendData([line.nm_pekerjaan, floatToNilai(line.prog),'0']);
					}
				}
			}catch(e){
				alert(e);
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
