window.app_tanbang_transaksi_fRuang = function(owner) {
	if (owner){
		window.app_tanbang_transaksi_fRuang.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_tanbang_transaksi_fRuang";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Ruangan", 0);	
		uses("datePicker;saiEdit;saiMemo;util_file;uploader;pageControl");				
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Ruang",readOnly:true});		
		this.ed_desk = new saiLabelEdit(this,{bound:[20,4,250,20],caption:"Deskripsi",readOnly:false, maxLength:45});		
		this.cb_gedung = new saiCBBL(this,{bound:[20,13,200,20], caption:"Gedung",multiSelection:false,
			sql:["select a.kode_gedung, a.nama,b.nama as nmtnh, a.alamat, a.kode_tanah from tb_gedung a inner join tb_tanah b on b.kode_tanah = a.kode_tanah and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi= '"+this.app._lokasi+"'  ",["kode_gedung","nama","nmtnh","alamat","kode_tanah"],false, ["Kode Gedung","Deskripsi","Deskripsi Tanah","Alamat","Kode Tanah"],"and","Daftar Gedung", true],
			change:[this,"doEditChange"]});			
		this.cb_tanah = new saiCBBL(this,{bound:[20,14,200,20], caption:"Tanah",readOnly:true});	
		this.cb_lantai = new saiCBBL(this,{bound:[20,12,200,20], caption:"Lantai",multiSelection:false,			
			change:[this,"doEditChange"]});			
		this.ed_luas = new saiLabelEdit(this,{bound:[20,15,200,20], caption:"Luas"});
		this.ed_jml = new saiLabelEdit(this,{bound:[20,14,200,20], caption:"Max Orang"});								
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
		
		this.p1 = new pageControl(this,{bound:[450,10,400,230],childPage:["Fasilitas","Upload Dokumen"]});
		this.sgUpld = new saiGrid(this.p1.childPage[1],{bound:[1,0,395,200],colCount:3,colTitle:["Dokumen","Upload","Deskripsi"],colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[100,80,130]], readOnly:true, change:[this,"doGridChange"], tag:3});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1.childPage[1],{bound:[1,this.p1.height - 25,395,25],buttonStyle:1, grid:this.sgUpld});
	
		this.sg2 = new saiGrid(this.p1.childPage[0],{bound:[1,0,395,200],colCount:2,colTitle:["Kode","Nama Fasilitas"],
					colWidth:[[1,0],[230,80]], buttonStyle:[[0],[bsEllips]], change:[this,"doGridChange"], tag:3,ellipsClick:[this,"doEllipsClick"]});		
		this.sgn2 = new sgNavigator(this.p1.childPage[0],{bound:[1,this.p1.height - 25,395,25],buttonStyle:1, grid:this.sg2});
		this.setTabChildIndex();
		
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
window.app_tanbang_transaksi_fRuang.extend(window.childForm);
window.app_tanbang_transaksi_fRuang.implement({	
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
						sql.add("insert into tb_ruang (kode_ruang, nama, kode_lantai, luas, jml_org, kode_peruntukan, kode_guna, tgl_input, nik_user,kode_lokasi )values"+
							"('"+this.ed_kode.getText()+"','"+this.ed_desk.getText()+"','"+this.cb_gedung.getText()+"',"+parseFloat(this.ed_luas.getText())+", "+
							" "+parseFloat(this.ed_jml.getText())+",'"+this.cb_untuk.getText()+"','"+this.cb_guna.getText()+"', now(), '"+this.app._userLog+"','"+this.app._lokasi+"') ");
						for (var i=0; i < this.sg2.getRowCount(); i++){
							if (this.sg2.rowValid(i))
								sql.add("insert into tb_ruang_fasilitas(kode_ruang, kode_fasilitas, tgl_input, nik_user)values"+
									" ('"+this.ed_kode.getText()+"','"+this.sg2.cells(0,i)+"', now(), '"+this.app._userLog+"')");
						}
						if (files.length > 0){
							var scan = "insert into tb_ruang_dok(kode_ruang,kode_lokasi,no_file,nama,nu) values ";						
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
			var kode = this.dbLib.getDataProvider("select * from tb_ruang  where kode_lokasi = '"+this.app._lokasi+"' and kode_ruang = '"+sender.getText()+"' ",true);
			if (typeof kode != "string" && kode.rs.rows[0] !== undefined){
				this.ed_nama.setText(kode.rs.rows[0].nama);
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tb_ruang','kode_ruang',"R"+new Date().getThnBln().substr(2)+".",'0000'));
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
	doEditChange: function(sender){
		if (sender == this.cb_gedung){
			this.cb_tanah.setText(sender.dataFromList[4],sender.dataFromList[2]);
			this.cb_lantai.setSQL("select a.kode_lantai, a.nama, no_lantai from tb_lantai a where kode_gedung = '"+sender.getText()+"'  and a.kode_lokasi= '"+this.app._lokasi+"' ",["kode_lantai","nama","no_lantai"],false, ["Kode","Deskripsi Lantai","No Lantai"],"and","Daftar Lantai Gedung "+sender.getText(), true);
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
