window.app_eclaim2_master_fTertanggung = function(owner) {
	if (owner){
		window.app_eclaim2_master_fTertanggung.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_master_fTertanggung";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tertanggung", 0);	
		
		uses("checkBox;util_file;saiCBBL;uploader");
		this.ed_kode = new saiCBBL(this,{bound:[20,1,200,20], caption:"Kode ",rightLabelVisible:false, btnClick:[this,"doFindBtnClick"],change:[this,"doChange"]});
		this.bGen = new button(this,{bound:[230,1,80,20],caption:"Generate",click:"doClick"});
		this.ed_nama = new saiLabelEdit(this,{bound:[20,2,500,20],caption:"Nama",maxLength:100, tag:1});
		this.ed_alamat = new saiLabelEdit(this,{bound:[20,3,500,20],caption:"Alamat", maxLength:100, tag:1});
		this.ed_kota = new saiLabelEdit(this,{bound:[20,4,300,20],caption:"Kota", maxLength:50, tag:1});
		this.ed_kdpos = new saiLabelEdit(this,{bound:[20,5,200,20],caption:"Kode Pos", maxLength:10, tag:1});
		this.ed_telp = new saiLabelEdit(this,{bound:[20,6,200,20],caption:"No Telepon", maxLength:50, tag:1});
		this.ed_fax = new saiLabelEdit(this,{bound:[20,7,200,20],caption:"No Fax", maxLength:50, tag:1});
		this.ed_pic = new saiLabelEdit(this,{bound:[20,8,300,20],caption:"PIC", maxLength:30, tag:1});
		this.ed_email = new saiLabelEdit(this,{bound:[20,9,300,20],caption:"Email", maxLength:50, tag:1});
		this.ed_web = new saiLabelEdit(this,{bound:[20,10,300,20],caption:"Website", maxLength:50, tag:1});
		this.ed_npwp = new saiLabelEdit(this,{bound:[20,11,300,20],caption:"NPWP", maxLength:30, tag:1});		
		this.ed_skode = new saiLabelEdit(this,{bound:[20,3,150,20],caption:"SKODE",maxLength:10});
		this.ed_file = new saiLabelEdit(this,{bound:[20,4,300,20],caption:"File Logo", readOnly:true, tag:1});
		this.up_file = new uploader(this,{bound:[330,4,80,20],param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true,afterUpload:[this,"doAfterLoad"], tag:1});
		this.ed_aktif = new checkBox(this,{bound:[20,5,150,20],caption:"Status Aktif"});
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.ed_kode.setText(this.app._kodeTtg,this.app._namaTtg);
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);					
		this.onClose.set(this, "doClose");
	}
};
window.app_eclaim2_master_fTertanggung.extend(window.childForm);
window.app_eclaim2_master_fTertanggung.implement({
	doClose: function(sender){		
		if (this.dataUpload !== undefined) this.fileUtil.deleteFiles(this.dataUpload.temporary);		
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
			var aktif = this.ed_aktif.isSelected() ? "1" :"0";
			switch(event){
				case "clear":
					this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);	
					this.ed_kode.setText(this.app._kodeTtg,this.app._namaTtg);
					return;
				break;
				case "simpan" :
					sql.add("insert into tlk_ttg (kode_ttg, nama, alamat, kota, kodepos, no_telp, no_fax, pic, email, web, npwp, skode, status,kode_lokasi, gambar, tgl_input, nik_user)values"+
						"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+this.ed_kota.getText()+"','"+this.ed_kdpos.getText()+"',"+
						"'"+this.ed_telp.getText()+"','"+this.ed_fax.getText()+"','"+this.ed_pic.getText()+"','"+this.ed_email.getText()+"','"+this.ed_web.getText()+"',"+
						"'"+this.ed_npwp.getText()+"','"+this.ed_skode.getText()+"','"+aktif+"','"+this.app._lokasi+"','"+this.ed_file.getText()+"',now(),'"+this.app._userLog+"') ");
				break;
				case "ubah" :
					sql.add("update tlk_ttg set nama = '"+this.ed_nama.getText()+"', skode='"+this.ed_skode.getText()+"' "+
					", alamat='"+this.ed_alamat.getText()+"', kota='"+this.ed_kota.getText()+"', kodepos = '"+this.ed_kdpos.getText()+"' "+
					", no_telp='"+this.ed_telp.getText()+"', no_fax='"+this.ed_fax.getText()+"', pic='"+this.ed_pic.getText()+"', email ='"+this.ed_email.getText()+"' "+
					", web='"+this.ed_web.getText()+"', npwp = '"+this.ed_npwp.getText()+"', status='"+aktif+"', gambar = '"+this.ed_file.getText()+"' "+
					" where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg ='"+this.ed_kode.getText()+"'  ");
				break;
				case "hapus" :
					sql.add("delete from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg ='"+this.ed_kode.getText()+"'  ");
				break;
			}			
			this.dbLib.execArraySQL(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFindBtnClick: function(sender){
		this.standarLib.showListData(this, "Data Tertanggung",this.ed_kode,this.ed_nama, 
										  "select kode_ttg, nama from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_ttg) from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_ttg","nama","skode"],"and",["Kode Tertanggung","Deskripsi"],false); 
	},
	doChange: function(sender){		
		if (sender.getText() != ""){	
			var kode = this.dbLib.getDataProvider("select nama, alamat, kota, kodepos, no_telp, no_fax, pic, email, web, npwp, skode, gambar,status from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg = '"+sender.getText()+"' ",true);
			if (typeof kode != "string" && kode.rs.rows[0] !== undefined){
				var line = kode.rs.rows[0];
				this.ed_skode.setText(line.skode);
				this.ed_nama.setText(line.nama);
				this.ed_alamat.setText(line.alamat);
				this.ed_kota.setText(line.kota);
				this.ed_kdpos.setText(line.kodepos);
				this.ed_telp.setText(line.no_telp);
				this.ed_fax.setText(line.no_fax);
				this.ed_pic.setText(line.pic);
				this.ed_email.setText(line.email);
				this.ed_web.setText(line.web);
				this.ed_npwp.setText(line.npwp);
				this.ed_file.setText(line.gambar);
				this.ed_aktif.setSelected(line.status == "1");
				this.fileBfr = line.gambar;
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_ttg','kode_ttg',"TG",'000'));
	},	
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib){
				if (methodName == "execArraySQL"){									
					if (result.search("error") == -1){
						if (this.fileBfr !== undefined && this.fileBfr != this.ed_file.getText()){
							this.fileUtil.deleteFiles(this.rootDir+"/"+this.up_file.param4 +this.fileBfr);
						}
						if (this.ed_file.getText() != "-" && this.dataUpload !== undefined)
							this.fileUtil.copyFileTo(this.rootDir+"/"+this.up_file.param2 +this.dataUpload.tmpfile,this.rootDir+"/"+this.up_file.param4 +this.dataUpload.filedest);
						else {
							this.app._mainForm.pesan(2,"Proses Lengkap (Tertanggung: "+ this.ed_kode.getText()+" tersimpan.)");
							this.app._mainForm.bClear.click();
						}
					}else systemAPI.alert(result);				
				}
			}
			if (sender == this.fileUtil){
				if ( (methodName == "copyFileTo")){					
					if ((typeof result == "boolean" && result)){
						this.app._mainForm.pesan(2,"Proses Lengkap (Tertanggung: "+ this.ed_kode.getText()+" tersimpan.)");
						this.app._mainForm.bClear.click();
					}else systemAPI.alert(result);
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad: function(sender, result, data, filename){
		if (result) this.ed_file.setText(data.filedest);
		this.dataUpload = data;
		if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
		else this.dataUpload.temporary = "";
		this.dataUpload.temporary = this.rootDir+"/"+this.up_file.param2 +this.dataUpload.tmpfile;
	}
});
