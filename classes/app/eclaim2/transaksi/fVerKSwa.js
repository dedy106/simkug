window.app_eclaim2_transaksi_fVerKSwa = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fVerKSwa.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fVerKSwa";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Verifikasi Laporan Awal:Input", 0);	
		uses("uploader;saiMemo;util_file;datePicker");
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal SJU",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.l_tglpng = new label(this,{bound:[20,2,100,20],caption:"Tanggal Jasindo",underline:true});
		this.dp_tglpng = new datePicker(this,{bound:[120,2,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiCBBL(this,{bound:[20,3,220,20],caption:"No Ver",readOnly:true, multiSelection:false,change:[this, "doChange"]});		
		this.cb_klaim = new saiCBBL(this,{bound:[20,4,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.ed_dok = new saiLabelEdit(this,{bound:[20,5,300,20],caption:"No Dokumen", maxLength:45});	
		this.cb_buat = new saiCBBL(this,{bound:[20,8,200,20],caption:"Dibuat Oleh", btnClick:[this,"doFindBtnClick"]});
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
		this.onClose.set(this,"doClose");
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		/*kirim mail*/
		uses("server_util_mail;portalui_ConfirmMail");
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
		//data awal
		this.ed_kode.setSQL("select a.no_ver, a.keterangan, a.no_klaim "+
							"from tlk_ver_swa a "+
							"inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi = '"+this.app._lokasi+"' and kode_ttg = '"+this.app._kodeTtg+"' and b.progress='1' and b.status='0' "
							,["no_ver","keterangan","no_klaim"],false,["No Ver","Keterangan","No Klaim"],"and","Data Verifikasi Klaim",true);

	}
};
window.app_eclaim2_transaksi_fVerKSwa.extend(window.childForm);
window.app_eclaim2_transaksi_fVerKSwa.implement({
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
				case "hapus" :
					if (this.progress == 1){
						this.delFiles = "";
						this.saveFiles = "", this.dest = "";
						var sql = new server_util_arrayList();
						for (var i in this.dataUpld){
							line = this.dataUpld[i];							
							if (line.status == 0) {
								if (this.delFiles != "")  this.delFiles += ";";
								this.delFiles += this.rootDir+"/server/media/"+line.file;
							}			
						}
						sql.add("delete from tlk_ver_swa where no_ver = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi +"' ");
						sql.add("delete from tlk_ver_dok_swa where no_ver = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi +"' ");
						sql.add("update tlk_klaim set progress = '0', flag1='0' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");

						this.dbLib.execArraySQL(sql);
					}else system.alert(this, "Data verifikasi tidak dapat dihapus. Karena data klaim sudah bergerak dari verifikasi","");
				break;
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){						
						var sql = new server_util_arrayList();
						this.saveFiles = "", this.dest = "", first = true;
						var files = [], line, gridFile = new arrayMap();
						this.delFiles = "";
						for (var i in this.dataUpld){
							line = this.dataUpld[i];
							for (var l=0; l < this.sgUpld.getRowCount();l++){		
								if (this.sgUpld.cells(0,l) == line.file){
									 line.status = 1;
									 gridFile.set(l,line);
								}
							}				
							if (line.status == 0) {
								if (this.delFiles != "")  this.delFiles += ";";
								this.delFiles += this.rootDir+"/server/media/"+line.file;
							}			
						}
						
						for (var i=0; i < this.sgUpld.getRowCount();i++){		
							if (this.sgUpld.cells(0,i) != ""){ 
								if (gridFile.get(i) === undefined){
									if (this.saveFiles != "") { 
										this.saveFiles += ";";
										this.dest += ";";
									}                               
									this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
									this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
									files.push(this.sgUpld.cells(1,i).filedest);								
								}
							}
						}
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						var no_ver=this.ed_kode.getText();
						sql.add("update tlk_ver_swa set no_klaim ='"+this.cb_klaim.getText()+"', tanggal='"+this.dp_tgl.getDateString()+"', no_dokumen = '"+this.ed_dok.getText()+
								"',keterangan='"+this.ed_ket.getText()+"',host='"+this.app._hostname+"',ip='"+this.app._iphost+"',nik_ver='"+this.cb_buat.getText()+"',tgl_input=now(),tgl_png='"+this.dp_tgl.getDateString()+"' "+
								" where no_ver = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+ this.app._lokasi +"'");
						sql.add("delete from tlk_ver_dok_swa where no_ver = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi +"' ");
						if (files.length > 0){
							var scan = "insert into tlk_ver_dok_swa (no_ver,kode_lokasi,no_file,nama,nu) values ";						
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
						this.doMail(no_ver);
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
										  "select no_klaim, penyebab from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('0') and flag1='0' and status='0' ",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('0') and flag1='0' and status='0' ",
										  ["no_klaim","penyebab"],"and",["No Klaim","Keterangan"],false); 
		}		
		if (sender == this.cb_buat){
			this.standarLib.showListData(this, "Data Karyawan",sender,undefined, 
											  "select nik, nama from tlk_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and status_admin='A' ",
											  "select count(*) from tlk_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and status_admin='A' ",	  
											  ["nik","nama"],"and",["NIK","Nama"],false);  
		}
	},	
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_ver_swa','no_ver',"VER/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
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
							if (this.delFiles != "") this.fileUtil.deleteFiles(this.delFiles);
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
    },
    doChange: function(sender){
		try{
			if (sender == this.ed_kode){
				var data = this.dbLib.getDataProvider("select date_format(a.tanggal,'%d/%m/%Y')as tgl,date_format(a.tgl_png,'%d/%m/%Y')as tgl_png, a.no_dokumen, a.keterangan, a.no_klaim, b.penyebab,b.progress,  ifnull(c.no_file,'-') as no_file, nu,a.nik_ver,d.nama as nama_ver "+
					"from tlk_ver_swa a "+
					"inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi  "+
					" left outer join tlk_ver_dok_swa c on c.no_ver = a.no_ver and c.kode_lokasi = a.kode_lokasi "+
					" left join tlk_hakakses d on a.nik_ver=d.nik "+
					" where a.no_ver = '"+sender.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					" order by nu",true);
				setTipeButton(tbAllFalse);
				if (data.rs.rows[0]){
					var line;
					this.sgUpld.clear();
					this.dataUpld = [];
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						this.sgUpld.appendData([line.no_file, {tmpfile:line.no_file, filedest:line.no_file}]);
						this.dataUpld.push({file:line.no_file,status:0});
					}				
					this.dp_tgl.setText(line.tgl);
					this.dp_tglpng.setText(line.tgl_png);
					this.ed_dok.setText(line.no_dokumen);
					this.ed_ket.setText(line.keterangan);
					this.cb_klaim.setText(line.no_klaim, line.penyebab);
					this.cb_buat.setText(line.nik_ver, line.nama_ver);
					this.noklaim = line.no_klaim;
					this.progress = line.progress;
					setTipeButton(tbUbahHapus);
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doMail: function(no_ver){
		try{
			this.nama_report="server_report_eclaim2_rptVerifikasi";
			this.filter = " where h.no_ver='"+no_ver+"' ";
			this.filter2 = "";
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.showFilter = "";
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
			this.page = 1;
			this.allBtn = false;
			var subject = this.app._namaForm;
			var pesan = this.viewer.getContent();
			this.mail.send(undefined,to,subject,pesan);		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
			break;
		}
	}
	
});
