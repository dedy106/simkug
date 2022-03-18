window.app_eclaim2_transaksi_fLAkSwa = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fLAkSwa.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fLAkSwa";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Laporan Awal:Koreksi", 0);	
		uses("datePicker;saiEdit;saiMemo;util_file;uploader");		
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});		
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal Kejadian",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,220,20],caption:"No Klaim",readOnly:true, rightLabelVisible:false,btnClick:[this,"doFindBtnClick"],change:[this,"doChange"]});
		//this.cb_ja = new saiCBBL(this,{bound:[20,3,200,20],caption:"Produk Asuransi", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		this.ed_dok = new saiLabelEdit(this,{bound:[20,4,250,20],caption:"No Dokumen",readOnly:false, maxLength:45});
		this.l_tgl2 = new label(this,{bound:[20,5,100,20],caption:"Tanggal Dokumen",underline:true});
		this.dp_tgl2 = new datePicker(this,{bound:[120,5,100,18]});
		this.cb_polis = new saiCBBL(this,{bound:[20,6,250,20],caption:"No Polis", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,7,200,20],caption:"Dibuat Oleh", readOnly:true});
		this.cb_sebab = new saiCBBL(this,{bound:[20,8,200,20],caption:"Penyebab", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		this.cb_obyek = new saiCBBL(this,{bound:[20,9,200,20],caption:"Obyek", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		this.cb_lok = new saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi", readOnly:true,btnClick:[this,"doFindBtnClick"]});		
		//this.cb_kota = new saiCBBL(this,{bound:[20,11,200,20],caption:"Kota", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		this.cb_curr = new saiCBBL(this,{bound:[20,12,200,20],caption:"Currency", readOnly:true,btnClick:[this,"doFindBtnClick"]});
		//this.ed_kurs = new saiEdit(this,{bound:[220,12,100,20],tipeText:ttNilai,text:"0"});
		this.ed_nilai = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Nilai Estimasi",tipeText:ttNilai,text:"0"});
		this.ed_alamat = new saiLabelEdit(this,{bound:[20,14,350,20],caption:"Lokasi Kejadian", maxLength:100});
		this.ed_penyebab = new saiMemo(this,{bound:[20,15,350,50],caption:"Kronologi", maxLength:200});
		//this.ed_keterangan = new saiMemo(this,{bound:[20,16,350,50],caption:"Ket Kerusakan", maxLength:200});
		this.ed_tindakan = new saiMemo(this,{bound:[20,16,350,50],caption:"Tindakan", maxLength:200});
		this.ed_pic = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"Contact Person", maxLength:45});
		this.ed_telp = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"No Telepon", maxLength:45});
		this.ed_fax = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"No Fax", maxLength:45});
		this.rearrangeChild(10,23);
		
		this.p1 = new panel(this,{bound:[450,132,350,230],caption:"Upload Dokumen"});
		this.sgUpld = new saiGrid(this.p1,{bound:[1,20,348,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,230]], readOnly:true, change:[this,"doGridChange"], rowCount:1,tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,348,25],buttonStyle:1, grid:this.sgUpld});
		this.setTabChildIndex();
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);			
		
		//this.cb_ja.setSQL("select kode_asuransi,nama from tlk_asuransi where kode_lokasi = '"+this.app._lokasi+"'",["kode_asuransi","nama"]);		
		this.ed_Periode.setText(this.dp_tgl.getThnBln());
		this.cb_buat.setText(this.app._userLog,this.app._namaUser);
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);		
		
		this.fileBfr = new arrayMap();
		this.onClose.set(this,"doClose");
		var userLogin="";
		if (this.app._userStatus=='U')
		{
			userLogin = " and nik_buat='"+this.app._userLog+"'"; 
		}
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
window.app_eclaim2_transaksi_fLAkSwa.extend(window.childForm);
window.app_eclaim2_transaksi_fLAkSwa.implement({
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
				case "simpan" :
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
						var no_klaim=this.ed_kode.getText();
						sql.add("delete from tlk_klaim where no_klaim = '"+this.ed_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and kode_ttg = '"+this.app._kodeTtg+"' ");
						sql.add("delete from tlk_klaim_dok where no_klaim = '"+this.ed_kode.getText()+"' ");
						/*this.cb_ttg.getText() = undefined & alamat belum ada
						sql.add("insert into tlk_klaim (no_klaim, kode_ttg, periode, tanggal, alamat, kode_curr, kurs,nik_buat,kode_obyek, kode_sebab, kode_asuransi, pic, no_telp, "+
							" no_fax, penyebab,  tindakan, progress,kode_lok, no_dokumen, no_polis, tgl_dokumen,nilai , kode_lokasi, tgl_input, nik_user, host, ip)values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_ttg.getText()+"','"+this.ed_periode.getText()+"','"+this.dp_tgl.getDateString()+"', "+
							" '"+this.cb_curr.getText()+"','"+parseNilai(this.ed_kurs.getText())+"','"+this.cb_buat.getText()+"','"+this.cb_obyek.getText()+"','"+this.cb_sebab.getText()+"', "+
							" '"+this.cb_ja.getText()+"','"+this.ed_pic.getText()+"','"+this.ed_telp.getText()+"','"+this.ed_fax.getText()+"','"+this.ed_penyebab.getText()+"', "+
							" '"+this.ed_tindakan.getText()+"','0','"+this.cb_lok.getText()+"','-','-',now(),0, "+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.app._hostname+"','"+this.app._iphost+"') ");*/
						sql.add("insert into tlk_klaim (no_klaim, kode_ttg, periode, tanggal, alamat, kode_curr, kurs,nik_buat,kode_obyek, kode_sebab, kode_asuransi, pic, no_telp, "+
							" no_fax, penyebab,  tindakan, progress,kode_lok, no_dokumen, no_polis, tgl_dokumen,nilai , kode_lokasi, tgl_input, nik_user, host, ip, keterangan)values"+
							"('"+this.ed_kode.getText()+"','"+this.app._kodeTtg+"','"+this.ed_Periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_alamat.getText()+"',"+
							" '"+this.cb_curr.getText()+"',"+parseNilai(this.ed_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_obyek.getText()+"','"+this.cb_sebab.getText()+"', "+
							" 'P12','"+this.ed_pic.getText()+"','"+this.ed_telp.getText()+"','"+this.ed_fax.getText()+"','"+this.ed_penyebab.getText()+"', "+
							" '"+this.ed_tindakan.getText()+"','0','"+this.cb_lok.getText()+"','"+this.ed_dok.getText()+"','"+this.cb_polis.getText()+"','"+this.dp_tgl2.getDateString()+"',"+parseNilai(this.ed_nilai.getText())+", "+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.app._hostname+"','"+this.app._iphost+"','-') ");
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
						this.uplFile = 0;
						this.dbLib.execArraySQL(sql);
						this.doMail(no_klaim);
					}
				break;									
				case "hapus" :
					sql.add("delete from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and no_klaim ='"+this.ed_kode.getText()+"' and progress='0' and status='0' ");
					sql.add("delete from tlk_klaim_dok where no_klaim ='"+this.ed_kode.getText()+"' ");
					this.dbLib.execArraySQL(sql);
				break;
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){
       //this.ed_Periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){
		switch(sender){
			/*
			case this.cb_ja : this.standarLib.showListData(this, "Data Jenis Asuransi",sender,undefined, 
											  "select kode_asuransi,nama from tlk_asuransi where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(kode_asuransi) from tlk_asuransi where kode_lokasi = '"+this.app._lokasi+"'",											  
											  ["kode_asuransi","nama"],"and",["No Asuransi","Keterangan"],false); 
								break;*/
			case this.cb_curr : this.standarLib.showListData(this, "Data Currency",sender,undefined, 
											  "select kode_curr,nama from curr ",
											  "select count(*) from curr ",  
											  ["kode_curr","nama"],"and",["Kode Curr","nama"],false); 
								break;
			case this.cb_obyek : this.standarLib.showListData(this, "Data Obyek",sender,undefined, 
											  "select kode_obyek, nama from tlk_obyek where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' ",
											  "select count(*) from tlk_obyek where kode_lokasi = '"+this.app._lokasi+"'  and kode_ttg='"+this.app._kodeTtg+"'  ",
											  ["kode_obyek","nama"],"and",["Kode Obyek","Nama"],false); 
								break;
			case this.cb_sebab : this.standarLib.showListData(this, "Data Penyebab",sender,undefined, 
											  "select kode_sebab, nama from tlk_sebab where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'  ",
											  "select count(*) from tlk_sebab where kode_lokasi = '"+this.app._lokasi+"'  and kode_ttg='"+this.app._kodeTtg+"' ",
											  ["kode_sebab","nama"],"and",["Kode Penyebab","Nama"],false); 
								break;
			case this.cb_lok : this.standarLib.showListData(this, "Data Lokasi",sender,undefined, 
											  "select a.kode_lok, a.nama from tlk_lokasi a where a.kode_lokasi = '"+this.app._lokasi+"'  and a.kode_ttg='"+this.app._kodeTtg+"' ",
											  "select count(*) from tlk_lokasi a where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ",
											  ["a.kode_lok","a.nama"],"and",["Kode Lokasi","Nama"],false); 
								break;
			/*
			case this.cb_kota : this.standarLib.showListData(this, "Data Kota",sender,undefined, 
											  "select a.kode_kota,a.nama from tlk_kota a inner join tlk_lokasi_kota b on b.kode_kota = a.kode_kota and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='Posting' and a.kode_ttg='"+this.app._kodeTtg+"' and b.kode_lok = '"+this.cb_lok.getText()+"' group by a.kode_kota ",
											  "select count(a.kode_kota) from tlk_kota a inner join tlk_lokasi_kota b on b.kode_kota = a.kode_kota and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='Posting' and a.kode_ttg='"+this.app._kodeTtg+"' and b.kode_lok = '"+this.cb_lok.getText()+"' ",
											  ["kode_kota","nama"],"and",["Kode Kota","Nama"],false); 
								break;
			*/
			case this.cb_buat : this.standarLib.showListData(this, "Data Karyawan",sender,undefined, 
											  "select nik, nama from tlk_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
											  "select count(*) from tlk_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",	  
											  ["nik","nama"],"and",["NIK","Nama"],false); 
								break;
			case this.cb_polis : this.standarLib.showListData(this, "Data Polis",sender,undefined, 
											  "select no_polis, nilai from tlk_polis where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
											  "select count(*) from tlk_polis where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
											  ["no_polis","nilai"],"and",["No Polis","Nilai"],false);
								break;
			case this.ed_kode : this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
											  "select no_klaim, penyebab,nilai from tlk_klaim where status='0' and kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress = '0' and nik_buat = '"+this.app._userLog+"' ",
											  "select count(*) from tlk_klaim where status='0' and kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress = '0' and nik_buat = '"+this.app._userLog+"' ",
											  ["no_klaim","penyebab","nilai"],"and",["No Klaim","Penyebab","Nilai"],false);
								break;
		}		
	},
	doChange: function(sender){		
		try{
			if (sender.getText() != ""){	
				var kode = this.dbLib.getDataProvider("select a.*,b.nama as nama_as, c.keterangan as nama_polis, d.nama, e.nama as nama_sebab, f.nama as nama_obyek, g.nama as nama_lok from tlk_klaim a "+				
					" left outer join tlk_asuransi b on b.kode_asuransi = a.kode_asuransi and b.kode_lokasi = a.kode_lokasi "+
					" left outer join tlk_polis c on c.no_polis = a.no_polis and c.kode_ttg = a.kode_ttg and c.kode_lokasi = a.kode_lokasi "+
					" left outer join tlk_hakakses d on d.nik = a.nik_buat and d.kode_ttg = a.kode_ttg and d.kode_lokasi = a.kode_lokasi "+
					" left outer join tlk_sebab e on e.kode_sebab = a.kode_sebab and e.kode_ttg = a.kode_ttg and e.kode_lokasi = a.kode_lokasi "+
					" left outer join tlk_obyek f on f.kode_obyek = a.kode_obyek and f.kode_ttg = a.kode_ttg and f.kode_lokasi = a.kode_lokasi "+
					" left outer join tlk_lokasi g on g.kode_lok = a.kode_lok and g.kode_ttg = a.kode_ttg and g.kode_lokasi = a.kode_lokasi "+
					" where  a.kode_lokasi = '"+this.app._lokasi+"' and a.no_klaim = '"+sender.getText()+"' ",true);								
				if (typeof kode != "string" && kode.rs.rows[0] !== undefined){
					var data = kode.rs.rows[0];
					this.ed_Periode.setText(data.periode), this.dp_tgl.setText(data.tanggal), 
					this.ed_dok.setText(data.no_dokumen), this.dp_tgl2.setText(data.tgl_dokumen), this.cb_polis.setText(data.no_polis, data.nama_polis);
					this.cb_buat.setText(data.nik_buat, data.nama), this.cb_sebab.setText(data.kode_sebab, data.nama_sebab), this.cb_obyek.setText(data.kode_obyek, data.nama_obyek), this.cb_lok.setText(data.kode_lok, data.nama_lok);
					this.cb_curr.setText(data.kode_curr), this.ed_nilai.setText(floatToNilai(parseFloat(data.nilai)));
					this.ed_alamat.setText(data.alamat), this.ed_penyebab.setText(data.penyebab), this.ed_tindakan.setText(data.tindakan), this.ed_pic.setText(data.pic);
					this.ed_telp.setText(data.no_telp), this.ed_fax.setText(data.no_fax);
					data = this.dbLib.getDataProvider("select nama,nu from tlk_klaim_dok where no_klaim = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by nu",true);
					this.sgUpld.clear();
					this.fileBfr = new arrayMap();
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						this.sgUpld.appendData([line.nama, {filedest:line.nama, filename:line.nama}]);
						this.fileBfr.set(line.nama, line.nama);
					}
					this.dataUpld= data.rs.rows;
					setTipeButton(tbUbahHapus);
				}else setTipeButton(tbAllFalse);
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_klaim','no_klaim',"KLM/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
	},
	doRequestReady: function(sender, methodName, result){
		/*if (methodName == "execArraySQL" && result.search("error") != -1){
			this.app._mainForm.pesan(2,"Proses Lengkap (kode lokasi : "+ this.ed_kode.getText()+" tersimpan.)");
			this.app._mainForm.bClear.click();
		}else{
			systemAPI.alert(result);
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
	doAfterUpload: function(sender, result, data, filename){
		if (result){
			this.app._mainForm.pesan(2,"upload file "+filename+" sukses");			
		}else{
			systemAPI.alert("Gagal upload file");
		}
	},
	doMail: function(noklaim){
		try{
			this.nama_report="server_report_eclaim2_rptLapAwal";
			this.filter = " where a.no_klaim='"+noklaim+"' ";
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
