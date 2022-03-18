window.app_tanbang_transaksi_fDokumen = function(owner) {
	if (owner){
		window.app_tanbang_transaksi_fDokumen.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_tanbang_transaksi_fDokumen";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Dokumen", 0);	
		uses("datePicker;saiEdit;saiMemo;util_file;uploader");		
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});				
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Arsip",readOnly:true});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
		this.ed_desk = new saiLabelEdit(this,{bound:[20,4,250,20],caption:"Deskripsi",readOnly:false, maxLength:45});		
		this.ed_no = new saiLabelEdit(this,{boundl:[20,5,250,20],caption:"No Dokumen"});
		this.cb_tanah = new saiCBBL(this,{bound:[20,14,200,20], caption:"Tanah"});		
		this.cb_gedung = new saiCBBL(this,{bound:[20,13,200,20], caption:"Gedung"});		
		this.cb_lantai = new saiCBBL(this,{bound:[20,12,200,20], caption:"Lantai"});				
		this.l1 = new label(this,{bound:[20,15,100,20], caption:"Tgl Awal",underline:true});
		this.dp_tgl1 = new datePicker(this,{bound:[120,15,100,18]});
		this.l2 = new label(this,{bound:[240,15,50,20], caption:"Sd",underline:true});
		this.dp_tgl2 = new datePicker(this,{bound:[290,15,100,18]});		
		this.cb_jenis = new saiCB(this,{bound:[20,12,200,20], caption:"Jenis Dokumen", items:["Sertifikat","PBB","SHM","HGB","AJB","HGU"]});				
		this.cb_status = new saiCB(this,{bound:[20,23,200,20], caption:"Status", items:["NONAKTIF","AKTIF"]});		
		
		this.rearrangeChild(10,23);		
		this.p1 = new panel(this,{bound:[450,10,400,230],caption:"Upload Dokumen"});
		this.sgUpld = new saiGrid(this.p1,{bound:[1,20,395,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,230]], readOnly:true, change:[this,"doGridChange"], tag:3});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,395,25],buttonStyle:1, grid:this.sgUpld});
		this.setTabChildIndex();
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.ed_Periode.setText(new Date().getThnBln());		
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
				
		this.onClose.set(this,"doClose");
	}
};
window.app_tanbang_transaksi_fDokumen.extend(window.childForm);
window.app_tanbang_transaksi_fDokumen.implement({	
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
						/*this.cb_ttg.getText() = undefined & alamat belum ada
						sql.add("insert into tlk_klaim (no_klaim, kode_ttg, periode, tanggal, alamat, kode_curr, kurs,nik_buat,kode_obyek, kode_sebab, kode_asuransi, pic, no_telp, "+
							" no_fax, penyebab,  tindakan, progress,kode_lok, no_dokumen, no_polis, tgl_dokumen,nilai , kode_lokasi, tgl_input, nik_user, host, ip)values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_ttg.getText()+"','"+this.ed_periode.getText()+"','"+this.dp_tgl.getDateString()+"', "+
							" '"+this.cb_curr.getText()+"','"+parseNilai(this.ed_kurs.getText())+"','"+this.cb_buat.getText()+"','"+this.cb_obyek.getText()+"','"+this.cb_sebab.getText()+"', "+
							" '"+this.cb_ja.getText()+"','"+this.ed_pic.getText()+"','"+this.ed_telp.getText()+"','"+this.ed_fax.getText()+"','"+this.ed_penyebab.getText()+"', "+
							" '"+this.ed_tindakan.getText()+"','0','"+this.cb_lok.getText()+"','-','-',now(),0, "+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.app._hostname+"','"+this.app._iphost+"') ");*/
						sql.add("insert into tlk_klaim (no_klaim, kode_ttg, periode, tanggal, alamat, kode_curr, kurs,nik_buat,kode_obyek, kode_sebab, kode_asuransi, pic, no_telp, "+
							" no_fax, penyebab,  tindakan, progress,kode_lok, no_dokumen, no_polis, tgl_dokumen,nilai , kode_lokasi, tgl_input, nik_user, host, ip, kode_kota,keterangan,status)values"+
							"('"+this.ed_kode.getText()+"','"+this.app._kodeTtg+"','"+this.ed_Periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_alamat.getText()+"',"+
							" '"+this.cb_curr.getText()+"',"+parseNilai(this.ed_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_obyek.getText()+"','"+this.cb_sebab.getText()+"', "+
							" '"+this.cb_ja.getText()+"','"+this.ed_pic.getText()+"','"+this.ed_telp.getText()+"','"+this.ed_fax.getText()+"','"+this.ed_penyebab.getText()+"', "+
							" '"+this.ed_tindakan.getText()+"','0','"+this.cb_lok.getText()+"','"+this.ed_dok.getText()+"','"+this.cb_polis.getText()+"','"+this.dp_tgl2.getDateString()+"',"+parseNilai(this.ed_nilai.getText())+", "+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.app._hostname+"','"+this.app._iphost+"','-','"+this.ed_keterangan.getText()+"','0') ");
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
						this.dbLib.execArraySQL(sql);
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
	doSelectedDate: function(sender, y, m, d){
       this.ed_Periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){
		switch(sender){			
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
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tb_dokumen','kode_dokumen',"D"+this.ed_Periode.getText().substring(2)+"/",'00000'));
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
                   if ((typeof result == "boolean" && result == false) || result.indexOf("error") != -1){
        	           systemAPI.alert(result,"Upload File gagal");
                   }else{ 
        		      this.app._mainForm.pesan(2,"upload "+result);	
					  this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");							
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
    }
});
