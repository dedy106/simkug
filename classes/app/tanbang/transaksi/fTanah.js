
window.app_tanbang_transaksi_fTanah = function(owner) {
	if (owner){
		window.app_tanbang_transaksi_fTanah.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_tanbang_transaksi_fTanah";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tanah", 0);	
		uses("datePicker;saiEdit;saiMemo;util_file;uploader;pageControl");				
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Tanah",readOnly:true});		
		this.ed_desk = new saiLabelEdit(this,{bound:[20,4,400,20],caption:"Deskripsi",readOnly:false, maxLength:45});
		this.ed_alamat = new saiLabelEdit(this,{bound:[20,14,400,20],caption:"Alamat", maxLength:100});		
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal Perolehan",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});		
		this.ed_nilai = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Nilai Perolehan",tipeText:ttNilai,text:"0"});		
		this.cb_kota = new saiCBBL(this,{bound:[20,14,200,20], caption:"Kota", multiSelection:false, 
				sql:["select a.kode_kodya, a.nama, b.nama as nmprop, a.kode_prop from amu_kodya a inner join amu_propinsi b on b.kode_prop = a.kode_prop and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi= '"+this.app._lokasi+"'",
				["kode_kodya","nama","nmprop", "kode_prop"],false, ["Kode Kota","Nama","Propinsi","Kode Propinsi"],"and","Daftar Kota", true],
				change:[this,"doEditChange"]
				});
		this.cb_prop = new saiCBBL(this,{bound:[20,13,200,20], caption:"Propinsi" , multiSelection:false, 
				sql:["select kode_prop, nama from amu_propinsi where kode_lokasi= '"+this.app._lokasi+"'",["kode_prop","nama"],false, ["Kode Propinsi","Nama"],"and","Daftar Kota", true],
				change:[this,"doEditChange"]
				});
		this.ed_luas = new saiLabelEdit(this,{bound:[20,15,200,20], caption:"Luas(m2)", tipeText:ttNilai});
		this.ed_tinggi = new saiLabelEdit(this,{bound:[20,14,200,20], caption:"Ketinggian(m)", tipeText:ttNilai});
		this.ed_lat = new saiLabelEdit(this,{bound:[20,15,200,20], caption:"Latitude"});
		this.ed_lng = new saiLabelEdit(this,{bound:[20,16,200,20], caption:"Longitude"});
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
				sql:["select no_fa, nama, nama2 from amu_asset where no_fa like '1011%' ",["no_fa","nama","nama2"],false, ["No Kartu","Deskripsi","Alamat"],"and","Daftar NKA", true],
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
		this.cb_status = new saiCB(this,{bound:[20,23,200,20], caption:"Status", items:["IDLE","AKTIF"], text:"AKTIF"});
		this.ed_linkungan = new saiMemo(this,{bound:[20,24,350,50],caption:"Lingkungan Sekitar.", maxLength:200});		
		
		this.rearrangeChild(10,23);		
		this.p1 = new pageControl(this,{bound:[450,10,600,400],childPage:["Peta","Upload Dokumen"]});
		this.sgUpld = new saiGrid(this.p1.childPage[1],{bound:[1,0,this.p1.width-3,this.p1.height-25],colCount:3,colTitle:["Dokumen","Upload","Deskripsi"],colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[250,80,230]], readOnly:true, change:[this,"doGridChange"], tag:3});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1.childPage[1],{bound:[1,this.p1.height - 25,this.p1.width-3,25],buttonStyle:1, grid:this.sgUpld});
		this.setTabChildIndex();		
		this.ctrlMap = new control(this.p1.childPage[0],{bound:[1,1,this.p1.width-3,this.p1.height-2]});		
		this.bGetCoor = new button(this,{bound:[230,this.ed_lat.top,80,20],caption:"Get Coord", click:"getCoord"});
		this.bSetCoor = new button(this,{bound:[230,this.ed_lng.top,80,20],caption:"Set Coord", click:"setCoord"});		
		this.mapReady();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);		
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
		this.cb_status.setText("AKTIF");
		this.onClose.set(this,"doClose");
		this.doClick();
	}
};
window.app_tanbang_transaksi_fTanah.extend(window.childForm);
window.app_tanbang_transaksi_fTanah.implement({
	getCoord: function(){
		try{
			latlng = this.ctrlMap.map.getCenter();				
			this.ed_lat.setText(latlng.lat());
			this.ed_lng.setText(latlng.lng());
		}catch(e){
			alert(e);
		}
	},
	setCoord: function(){
		try{
			var latlng = new google.maps.LatLng(parseFloat(this.ed_lat.getText()),parseFloat(this.ed_lng.getText()));
			this.ctrlMap.map.setCenter(latlng);	
			this.ctrlMap.infowindow.setContent(this.ed_desk.getText());
			this.ctrlMap.infowindow.setPosition(latlng);
			this.ctrlMap.infowindow.open(this.ctrlMap.map);			
			this.ctrlMap.marker = new google.maps.Marker({
					position: latlng, 
					map: this.ctrlMap.map,
					title: this.ed_desk.getText()
				});   
		}catch(e){
			alert(e);
		}
	},
	mapReady: function(){
		try{
			var myLatlng = new google.maps.LatLng(-6.898313613091926, 107.61920118331912);
			var myOptions = {
			  zoom: 14,
			  center: myLatlng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.ctrlMap.map = new google.maps.Map(this.ctrlMap.getCanvas(), myOptions);
			this.ctrlMap.infowindow = new google.maps.InfoWindow();
			this.ctrlMap.marker = new google.maps.Marker({
				position: myLatlng, 
				map: this.ctrlMap.map,
				title:"Telkom Japati"
			});   
		}catch(e){
			alert(e);
		}
	},
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
								files.push({file:this.sgUpld.cells(0,i), nama:this.sgUpld.cells(2,i)});
							}
						}
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						sql.add("insert into tb_tanah (kode_tanah, nama, alamat, tgl_perolehan, nilai_perolehan, kode_kodya, kode_prop,  "+
								"	latitude, longitude, luas , ketinggian, no_sertifikat, no_pbb, no_fa, kode_peruntukan, kode_guna, status, keterangan, kode_lokasi, tgl_input, nik_user )values"+
							"('"+this.ed_kode.getText()+"','"+this.ed_desk.getText()+"','"+this.ed_alamat.getText()+"','"+this.dp_tgl.getDateString()+"','"+parseNilai(this.ed_nilai.getText())+"',"+
							" '"+this.cb_kota.getText()+"','"+this.cb_prop.getText()+"','"+this.ed_lat.getText()+"','"+this.ed_lng.getText()+"', "+
							" '"+this.ed_luas.getText()+"','"+this.ed_tinggi.getText()+"','"+this.cb_sert.getText()+"','"+this.cb_pbb.getText()+"',"+
							" '"+this.cb_nka.getText()+"', '"+this.cb_untuk.getText()+"','"+this.cb_guna.getText()+"','"+this.cb_status.getText()+"', "+
							" '"+this.ed_linkungan.getText()+"', "+
							" '"+this.app._lokasi+"',now(),'"+this.app._userLog+"') ");
						if (files.length > 0){
							var scan = "insert into tb_tanah_dok(no_tanah,kode_lokasi,no_file,nama,nu) values ";						
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
			case this.cb_propinsi : this.standarLib.showListData(this, "Data Propinsi",sender,undefined, 
											  "select a.kode_propinsi, a.nama from tb_propinsi a where a.kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(*) from tb_propinsi a where a.kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_propinsi","nama"],"and",["Kode Propinsi","Nama"],false); 
								break;
			case this.cb_kota : this.standarLib.showListData(this, "Data Kota",sender,undefined, 
											  "select a.kode_kodya,a.nama from tb_kodya a ",
											  "select count(a.kode_kodya) from tb_kodya a ",
											  ["kode_kota","nama"],"and",["Kode Kota","Nama"],false); 
								break;			
			case this.cb_ba : this.standarLib.showListData(this, "Data Bisnis Area",sender,undefined, 
											  "select kode_lokfa,nama from amu_lokasi a ",
											  "select count(kode_lokfa) from amu_lokasi a ",
											  ["kode_lokfa","nama"],"and",["Kode Lokasi","Nama"],false); 
								break;									
		}
	},
	doChange: function(sender){
		this.ed_nama.clear();
		this.ed_skode.clear();
		if (sender.getText() != ""){	
			var kode = this.dbLib.getDataProvider(" ",true);
			if (typeof kode != "string" && kode.rs.rows[0] !== undefined){
				this.ed_skode.setText(kode.rs.rows[0].skode);
				this.ed_nama.setText(kode.rs.rows[0].nama);
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tb_tanah','kode_tanah',"T"+new Date().getThnBln().substring(2)+".",'0000'));
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
        	           system.alert(this,result,"Upload File gagal");
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
			systemAPI.alert("Gagal upload file");
		}
	},
	doEditChange: function(sender){
		if (sender == this.cb_kota) this.cb_prop.setText(sender.dataFromList[3]);
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
