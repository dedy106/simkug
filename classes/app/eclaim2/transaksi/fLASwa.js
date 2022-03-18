window.app_eclaim2_transaksi_fLASwa = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fLASwa.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fLASwa";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Laporan Awal", 0);	
		uses("datePicker;saiEdit;saiMemo;util_file;uploader");		
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,3,100,20],caption:"Tanggal Kejadian",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,3,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Klaim",readOnly:true});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
		//this.cb_ja = new saiCBBL(this,{bound:[20,3,200,20],caption:"Produk Asuransi", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		this.ed_dok = new saiLabelEdit(this,{bound:[20,4,250,20],caption:"No Dokumen",readOnly:false, maxLength:45});
		this.l_tgl2 = new label(this,{bound:[20,5,100,20],caption:"Tanggal Dokumen",underline:true});
		this.dp_tgl2 = new datePicker(this,{bound:[120,5,100,18]});
		this.cb_polis = new saiCBBL(this,{bound:[20,6,250,20],caption:"No Polis",readOnly:true, btnClick:[this,"doFindBtnClick"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,7,200,20],caption:"Dibuat Oleh", readOnly:true});
		this.cb_sebab = new saiCBBL(this,{bound:[20,8,200,20],caption:"Penyebab", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		this.cb_obyek = new saiCBBL(this,{bound:[20,9,200,20],caption:"Obyek", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		this.cb_lok = new saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi", readOnly:true,btnClick:[this,"doFindBtnClick"]});		
		//this.cb_kota = new saiCBBL(this,{bound:[20,11,200,20],caption:"Kota", readOnly:false,btnClick:[this,"doFindBtnClick"]});
		this.cb_curr = new saiCBBL(this,{bound:[20,12,200,20],caption:"Currency", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		//this.ed_kurs = new saiEdit(this,{bound:[220,12,100,20],tipeText:ttNilai,text:"0"});
		this.ed_nilai = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Nilai Estimasi",tipeText:ttNilai,text:"0"});
		this.ed_alamat = new saiLabelEdit(this,{bound:[20,14,350,20],caption:"Lokasi Kejadian", maxLength:100});
		this.ed_penyebab = new saiMemo(this,{bound:[20,15,350,50],caption:"Kronologi", maxLength:200});
		//this.ed_keterangan = new saiMemo(this,{bound:[20,16,350,50],caption:"Ket Kerusakan", maxLength:200});
		this.ed_tindakan = new saiMemo(this,{bound:[20,16,350,50],caption:"Tindakan", maxLength:200});
		this.ed_pic = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"Contact Person", maxLength:50});
		this.ed_telp = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"No Telepon", maxLength:45});
		this.ed_fax = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"No Fax", maxLength:45});
		this.rearrangeChild(0,23);
		
		
		this.p1 = new panel(this,{bound:[450,132,350,230],caption:"Upload Dokumen"});
		this.sgUpld = new saiGrid(this.p1,{bound:[1,20,345,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,230]], readOnly:true, change:[this,"doGridChange"], tag:3});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,345,25],buttonStyle:1, grid:this.sgUpld});
		this.setTabChildIndex();
		
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		if (this.app.fileUtil == undefined)
			this.app.fileUtil = new util_file();
		this.fileUtil = this.app.fileUtil;
		this.fileUtil.addListener(this);
		
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.ed_Periode.setText(this.dp_tgl.getThnBln());
		this.cb_buat.setText(this.app._userLog,this.app._namaUser);
		//this.cb_ja.setText("P12");
		
		this.rootDir = this.app._rootDir;			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
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
		
	}
};
window.app_eclaim2_transaksi_fLASwa.extend(window.childForm);
window.app_eclaim2_transaksi_fLASwa.implement({
	doClose: function(sender){
		if (this.uploadedFiles !="" ) this.fileUtil.deleteFiles(this.uploadedFiles, undefined, this);
		this.dbLib.delListener(this);
		this.fileUtil.delListener(this);
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
						this.standarLib.clearByTag(this, new Array("0","1","3"),this.eKontrak);		
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
								first = false;
								files.push(this.sgUpld.cells(0,i));
							}
						}
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						var no_klaim=this.ed_kode.getText();
						
						sql.add("insert into tlk_klaim (no_klaim, kode_ttg, periode, tanggal, alamat, kode_curr, kurs,nik_buat,kode_obyek, kode_sebab, kode_asuransi, pic, no_telp, "+
							" no_fax, penyebab,  tindakan, progress,kode_lok, no_dokumen, no_polis, tgl_dokumen,nilai , kode_lokasi, tgl_input, nik_user, host, ip, kode_kota,keterangan,status)values"+
							"('"+this.ed_kode.getText()+"','"+this.app._kodeTtg+"','"+this.ed_Periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_alamat.getText()+"',"+
							" '"+this.cb_curr.getText()+"',"+parseNilai(this.ed_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_obyek.getText()+"','"+this.cb_sebab.getText()+"', "+
							" 'P12','"+this.ed_pic.getText()+"','"+this.ed_telp.getText()+"','"+this.ed_fax.getText()+"','"+this.ed_penyebab.getText()+"', "+
							" '"+this.ed_tindakan.getText()+"','0','"+this.cb_lok.getText()+"','"+this.ed_dok.getText()+"','"+this.cb_polis.getText()+"','"+this.dp_tgl2.getDateString()+"',"+parseNilai(this.ed_nilai.getText())+", "+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.app._hostname+"','"+this.app._iphost+"','-','-','0') ");
						if (files.length > 0){
							var scan = "insert into tlk_klaim_dok(no_klaim,kode_lokasi,no_file,nama,nu) values ";						
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
						this.dbLib.execArraySQL(sql, undefined, this);
						this.doReport(no_klaim);
						this.cb_buat.setText(this.app._userLog,this.app._namaUser);
					}
				break;
				case "ubah" :
					//sql.add("update tlk_klaim  where kode_lokasi = '"+this.app._lokasi+"' and no_klaim ='"+this.ed_kode.getText()+"'  ");
				break;
				case "delete" :
					//sql.add("delete from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and no_klaim ='"+this.ed_kode.getText()+"'  ");
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doReport: function(noklaim){
		try{
			this.nama_report="server_report_eclaim2_rptLapAwalMail";
			this.filter = " where a.no_klaim='"+noklaim+"' ";
			this.filter2 = this.app._email+"/"+this.app._emailadm+"/"+this.app._emailttg;
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){
       this.ed_Periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){
		switch(sender){
			/*
			case this.cb_ja : this.standarLib.showListData(this, "Data Jenis Asuransi",sender,undefined, 
											  "select a.kode_asuransi,a.nama from tlk_asuransi a "+
											  "	inner join tlk_asuransi_ttg b on b.kode_lokasi = a.kode_lokasi and b.kode_asuransi = a.kode_asuransi "+
											  " where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"' ",
											  "select count(a.kode_asuransi) from tlk_asuransi a "+
											  "	inner join tlk_asuransi_ttg b on b.kode_lokasi = a.kode_lokasi and b.kode_asuransi = a.kode_asuransi "+
											  " where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"' ",											  
											  ["a.kode_asuransi","a.nama"],"and",["No Asuransi","Keterangan"],false); 
								break;*/
			case this.cb_curr : this.standarLib.showListData(this, "Data Currency",sender,undefined, 
											  "select kode_curr,nama from curr ",
											  "select count(*) from curr ",  
											  ["kode_curr","nama"],"and",["Kode Curr","nama"],false); 
								break;
			case this.cb_obyek : this.standarLib.showListData(this, "Data Obyek",sender,undefined, 
											  "select kode_obyek, nama from tlk_obyek where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ",
											  "select count(*) from tlk_obyek where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ",
											  ["kode_obyek","nama"],"and",["Kode Obyek","Nama"],false); 
								break;
			case this.cb_sebab : this.standarLib.showListData(this, "Data Penyebab",sender,undefined, 
											  "select kode_sebab, nama from tlk_sebab where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'  ",
											  "select count(*) from tlk_sebab where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ",
											  ["kode_sebab","nama"],"and",["Kode Penyebab","Nama"],false); 
								break;
			case this.cb_lok : this.standarLib.showListData(this, "Data Lokasi",sender,undefined, 
											  "select a.kode_lok, a.nama from tlk_lokasi a where a.kode_lokasi = '"+this.app._lokasi+"'  and a.kode_ttg='"+this.app._kodeTtg+"' ",
											  "select count(*) from tlk_lokasi a where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ",
											  ["a.kode_lok","a.nama"],"and",["Kode Lokasi","Nama"],false); 
								break;
			/*
			case this.cb_kota : 
								alert("select a.kode_kota,a.nama from tlk_kota a where a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='Posting' and a.kode_ttg='"+this.app._kodeTtg+"'");	
								this.standarLib.showListData(this, "Data Kota",sender,undefined, 
											  "select a.kode_kota,a.nama from tlk_kota a where a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='Posting' and a.kode_ttg='"+this.app._kodeTtg+"'  ",
											  "select count(a.kode_kota) from tlk_kota a where a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='Posting' and a.kode_ttg='"+this.app._kodeTtg+"'  ",
											  ["kode_kota","nama"],"and",["Kode Kota","Nama"],false); 
								break;
			*/
			case this.cb_buat : this.standarLib.showListData(this, "Data Karyawan",sender,undefined, 
											  "select nik, nama from tlk_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
											  "select count(*) from tlk_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",	  
											  ["nik","nama"],"and",["NIK","Nama"],false); 
								break;
			case this.cb_polis : this.standarLib.showListData(this, "Data Polis",sender,undefined, 
											  "select no_polis, keterangan from tlk_polis where kode_lokasi = '"+this.app._lokasi+"'  and kode_ttg='"+this.app._kodeTtg+"'",
											  "select count(*) from tlk_polis where kode_lokasi = '"+this.app._lokasi+"'  and kode_ttg='"+this.app._kodeTtg+"'",
											  ["no_polis","ketrangan"],"and",["No Polis","Keterangan"],false);
								break;
		}
	},
	doChange: function(sender){
		this.ed_nama.clear();
		this.ed_skode.clear();
		if (sender.getText() != ""){	
			var kode = this.dbLib.getDataProvider("select * from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and no_klaim = '"+sender.getText()+"' ",true);
			if (typeof kode != "string" && kode.rs.rows[0] !== undefined){
				this.ed_skode.setText(kode.rs.rows[0].skode);
				this.ed_nama.setText(kode.rs.rows[0].nama);
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_klaim','no_klaim',"KLM/BDG/"+this.ed_Periode.getText().substring(2)+"/",'000'));
	},
	doRequestReady: function(sender, methodName, result, callbackObj){
		/*if (methodName == "execArraySQL" && result.search("error") != -1){
			this.app._mainForm.pesan(2,"Proses Lengkap (kode lokasi : "+ this.ed_kode.getText()+" tersimpan.)");
			this.app._mainForm.bClear.click();
		}else{
			systemAPI.alert(result);
		}*/
		if (sender == this.dbLib && this == callbackObj)
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
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true, undefined, this);
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
		}else if (sender == this.fileUtil && this == callbackObj){
	        switch(methodName){
    	       case "copyFilesTo" : 
                   if ((typeof result == "boolean" && result == false) || result.indexOf("error") != -1){
        	           systemAPI.alert(result,"Upload File gagal");
                   }else{ 
        		      this.app._mainForm.pesan(2,"upload "+result);	
					  this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");							
					  this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);		
					  this.sgUpld.clear(1);
        		      showProgress("delete temporary...");
        		      if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles, undefined, this);
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
	/*doFileChange: function(sender, filename, result, data){
		if (sender == this.upl_layout) this.l_layout.setText(data.filedest);
		if (sender == this.upl_peta) this.l_peta.setText(data.filedest);
	},*/
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
