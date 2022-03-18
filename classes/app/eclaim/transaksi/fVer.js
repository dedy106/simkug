window.app_eclaim_transaksi_fVer = function(owner) {
	if (owner){
		window.app_eclaim_transaksi_fVer.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim_transaksi_fVer";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Verifikasi Laporan Awal:Input", 0);	
		uses("uploader;saiMemo;util_file;datePicker");
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal SJU",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.l_tglpng = new label(this,{bound:[20,2,100,20],caption:"Tanggal Penanggung",underline:true});
		this.dp_tglpng = new datePicker(this,{bound:[120,2,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,3,200,20],caption:"No Ver",readOnly:true});
		this.bGen = new button(this,{bound:[230,3,80,20],caption:"Generate",click:"doClick"});
		this.cb_klaim = new saiCBBL(this,{bound:[20,4,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.ed_dok = new saiLabelEdit(this,{bound:[20,6,300,20],caption:"No Dokumen", maxLength:45});		
		this.cb_buat = new saiCBBL(this,{bound:[20,8,200,20],caption:"Dibuat Oleh", btnClick:[this,"doFindBtnClick"]});
		this.ed_ket = new saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});							
		this.p1 = new panel(this,{bound:[20,10,600,230],caption:"Upload Dokumen (Max 2 Mb)"});
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
		
		this.cb_buat.setText(this.app._userLog,this.app._namaUser);
	}
};
window.app_eclaim_transaksi_fVer.extend(window.childForm);
window.app_eclaim_transaksi_fVer.implement({
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
						var no_ver=this.ed_kode.getText();
						sql.add("insert into eclaim_ver (no_ver, no_klaim, periode, tanggal, no_dokumen, kode_lokasi, tgl_input, nik_user, status,keterangan,host,ip,nik_ver,tgl_png,kode_ttg) values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_klaim.getText()+"','"+this.ed_Periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_dok.getText()+"',"+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"','0','"+this.ed_ket.getText()+"','"+this.app._hostname+"','"+this.app._iphost+"','"+this.cb_buat.getText()+"','"+this.dp_tglpng.getDateString()+"','"+this.app._kodeTtg+"') ");
						sql.add("update eclaim_klaim set progress = '1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_ttg ='"+this.app._kodeTtg+"' ");
						if (files.length > 0){
							var scan = "insert into eclaim_ver_dok (no_ver,kode_lokasi,no_file,nama,nu,kode_ttg) values ";						
							var first = true;
							var noUrut=1;
							for (var i in files){
								if (!first) scan +=",";
								scan += "('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+files[i]+"','"+files[i]+"',"+noUrut+",'"+this.app._kodeTtg+"')";
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
										  "select no_klaim, penyebab from eclaim_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('0')  ",
										  "select count(no_klaim) from eclaim_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('0') ",
										  ["no_klaim","penyebab"],"and",["No Klaim","Keterangan"],false); 
		}
		if (sender == this.cb_buat){
			this.standarLib.showListData(this, "Data Karyawan",sender,undefined, 
											  "select nik, nama from eclaim_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and status_admin='A' ",
											  "select count(*) from eclaim_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and status_admin='A' ",	  
											  ["nik","nama"],"and",["NIK","Nama"],false);  
		}
		
	},	
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'eclaim_ver','no_ver',"VER/BDG/"+this.ed_Periode.getText().substring(2)+"/",'000'));
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
		this.dataUpload.original = "eclaim_"+new Date()+filename;
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
	doMail: function(no_ver){
		try{
			this.nama_report="server_report_eclaim_rptVerifikasi";
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
