window.app_tanbang_transaksi_fGedung = function(owner) {
	if (owner){
		window.app_tanbang_transaksi_fGedung.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_tanbang_transaksi_fGedung";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Gedung", 0);	
		uses("datePicker;saiEdit;saiMemo;util_file;uploader;pageControl");				
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Gedung",readOnly:true});		
		this.ed_desk = new saiLabelEdit(this,{bound:[20,4,400,20],caption:"Deskripsi",readOnly:false, maxLength:45});
		this.ed_alamat = new saiLabelEdit(this,{bound:[20,14,400,20],caption:"Alamat", maxLength:100});		
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal Perolehan",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});		
		this.ed_nilai = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Nilai Perolehan",tipeText:ttNilai,text:"0"});		
		this.cb_tanah = new saiCBBL(this,{bound:[20,14,200,20], caption:"Tanah" , multiSelection:false, 
				sql:["select kode_tanah, nama,alamat from tb_tanah where kode_lokasi= '"+this.app._lokasi+"'  ",["kode_tanah","nama","alamat"],false, ["Kode Tanah","Deskripsi","Alamat"],"and","Daftar Tanah", true],
				change:[this,"doEditChange"]
			});		
		this.ed_luas = new saiLabelEdit(this,{bound:[20,15,200,20], caption:"Luas Gross(m2)", tipeText:ttNilai});
		this.ed_luas2 = new saiLabelEdit(this,{bound:[20,12,200,20], caption:"Luas Semi Gross(m2)", tipeText:ttNilai});
		this.ed_luas3 = new saiLabelEdit(this,{bound:[20,11,200,20], caption:"Luas Nett(m2)", tipeText:ttNilai});
		this.ed_tinggi = new saiLabelEdit(this,{bound:[20,14,200,20], caption:"Tinggi(m)", tipeText:ttNilai});		
		this.ed_lantai = new saiLabelEdit(this,{bound:[20,15,200,20], caption:"Jumlah Lantai", tipeText:ttNilai});
		this.ed_hlmn = new saiLabelEdit(this,{bound:[20,13,200,20], caption:"Luas Halaman(m2)",tipeText:ttNilai});		
		this.cb_sert = new saiCBBL(this,{bound:[20,17,200,20], caption:"Sertifikat", multiSelection:false, 
				sql:["select no_dokumen, no_sertifikat from tb_dokumen where kode_lokasi= '"+this.app._lokasi+"' and jenis = 'sertifikat' ",["no_dokumen","no_sertifikat"],false, ["No Dokumen","No Sertifikat"],"and","Daftar Sertifikat", true],
				change:[this,"doEditChange"]
			});
		this.cb_pbb = new saiCBBL(this,{bound:[20,18,200,20], caption:"No PBB", multiSelection:false, 
				sql:["select no_dokumen, no_sertifikat from tb_dokumen where kode_lokasi= '"+this.app._lokasi+"' and jenis = 'pbb' ",["no_dokumen","no_sertifikat"],false, ["No Dokumen","No Sertifikat"],"and","Daftar Sertifikat", true],
				change:[this,"doEditChange"]			
			});
		this.cb_ba = new saiCBBL(this,{bound:[20,20,200,20], caption:"BA", multiSelection:false, 
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi= '"+this.app._lokasi+"' ",["kode_lokfa","nama"],false, ["Kode Lokasi","Nama"],"and","Daftar Lokasi Aset", true],
				change:[this,"doEditChange"]
			});		
		this.cb_nka = new saiCBBL(this,{bound:[20,19,200,20], caption:"No Kartu SAP", multiSelection:false, 
				sql:["select no_fa, nama, nama2 from amu_asset where no_fa like '1012%' ",["no_fa","nama","nama2"],false, ["No Kartu","Deskripsi","Alamat"],"and","Daftar NKA", true],
				change:[this,"doEditChange"]
			});		
		this.cb_untuk = new saiCBBL(this,{bound:[20,21,200,20], caption:"Peruntukan", multiSelection:false, 
				sql:["select kode_peruntukan, nama from tb_peruntukan where kode_lokasi= '"+this.app._lokasi+"' ",["kode_peruntukan","nama"],false, ["Kode","Deskripsi"],"and","Daftar Peruntukan", true],
				change:[this,"doEditChange"]
			});
		this.cb_guna = new saiCBBL(this,{bound:[20,22,200,20], caption:"Penggunaan", multiSelection:false, 
				sql:["select kode_peruntukan, nama from tb_peruntukan where kode_lokasi= '"+this.app._lokasi+"' ",["kode_peruntukan","nama"],false, ["Kode","Deskripsi"],"and","Daftar Peruntukan", true],
				change:[this,"doEditChange"]
			});		
		this.cb_status = new saiCB(this,{bound:[20,23,200,20], caption:"Status", items:["IDLE","AKTIF"]});		
		
		this.rearrangeChild(10,23);		
		
		this.p1 = new pageControl(this,{bound:[450,10,600,400],childPage:["Fasilitas","Upload Dokumen"]});
		this.sgUpld = new saiGrid(this.p1.childPage[1],{bound:[1,0,595,this.p1.height - 25],colCount:3,colTitle:["Dokumen","Upload","Deskripsi"],colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[250,80,230]], readOnly:true, change:[this,"doGridChange"], tag:3});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1.childPage[1],{bound:[1,this.p1.height - 25,595,25],buttonStyle:1, grid:this.sgUpld});
				
		this.sg2 = new saiGrid(this.p1.childPage[0],{bound:[1,0,595,this.p1.height - 25],colCount:2,colTitle:["Kode","Nama"],
					colWidth:[[1,0],[430,80]], colReadOnly:[true,[1],[]], buttonStyle:[[0],[bsEllips]], change:[this,"doGridChange"], tag:3, ellipsClick:[this,"doEllipsClick"]});		
		this.sgn2 = new sgNavigator(this.p1.childPage[0],{bound:[1,this.p1.height - 25,595,25],buttonStyle:1, grid:this.sg2});
		this.setTabChildIndex();
		this.cb_status.setText("AKTIF");
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);		
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
		this.doClick();		
		this.onClose.set(this,"doClose");
	}
};
window.app_tanbang_transaksi_fGedung.extend(window.childForm);
window.app_tanbang_transaksi_fGedung.implement({	
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
								files.push({
									file: this.sgUpld.cells(0, i),
									nama: this.sgUpld.cells(2, i)
								});
							}
						}						
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						sql.add("insert into tb_gedung (kode_gedung, nama, alamat, tgl_perolehan, nilai_perolehan, kode_tanah,  "+
								"	luas, luas_semi, luas_nett , tinggi, luas_hlmn, no_sertifikat, no_pbb, no_fa, kode_peruntukan, kode_guna, status, kode_lokasi, tgl_input, nik_user )values"+
							"('"+this.ed_kode.getText()+"','"+this.ed_desk.getText()+"','"+this.ed_alamat.getText()+"','"+this.dp_tgl.getDateString()+"','"+parseNilai(this.ed_nilai.getText())+"',"+
							" '"+this.cb_tanah.getText()+"','"+parseNilai(this.ed_luas.getText())+"','"+parseNilai(this.ed_luas2.getText())+"','"+parseNilai(this.ed_luas3.getText())+"', "+
							" '"+parseNilai(this.ed_tinggi.getText())+"','"+parseNilai(this.ed_hlmn.getText())+"','"+this.cb_sert.getText()+"','"+this.cb_pbb.getText()+"',"+
							" '"+this.cb_nka.getText()+"', '"+this.cb_untuk.getText()+"','"+this.cb_guna.getText()+"','"+this.cb_status.getText()+"', "+							
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"') ");
						for (var i=0; i < this.sg2.getRowCount(); i++){
							if (this.sg2.rowValid(i))
								sql.add("insert into tb_gedung_fasilitas(kode_gedung, kode_fasilitas, tgl_input, nik_user)values"+
									" ('"+this.ed_kode.getText()+"','"+this.sg2.cells(0,i)+"', now(), '"+this.app._userLog+"')");
						}
						if (files.length > 0){
							var scan = "insert into tb_gedung_dok(no_klaim,kode_lokasi,no_file,nama,nu) values ";						
							var first = true;
							var noUrut=1;
							for (var i in files){
								if (!first) scan +=",";
								scan += "('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+files[i].file+"','"+files[i].nama+"',"+noUrut+")";
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
    },
	doFindBtnClick: function(sender){
		switch(sender){			
		}
	},
	doChange: function(sender){		
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tb_gedung','kode_gedung',"G"+new Date().getThnBln().substring(2)+".",'0000'));
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
                                system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");							
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
                   if ((typeof result == "boolean" && result == false) || result.indexOf("error") != -1){
        	           system.alert(result,"Upload File gagal");
                   }else{ 
        		      system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");							
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
			system.alert(this,"Gagal upload file");
		}
	},
	doEllipsClick: function(sender, col, row){
		if (sender == this.sg2){
			if (col == 0){			
				this.standarLib.showListData(this, "Daftar Fasilitas",sender,undefined, 
											  "select kode_fasilitas,nama  from tb_fasilitas where  kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(kode_fasilitas)  from tb_fasilitas where  kode_lokasi = '"+this.app._lokasi+"'",
											  ["kode_fasilitas","nama"],"and",["Kode","Nama"],false);				
			}
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
