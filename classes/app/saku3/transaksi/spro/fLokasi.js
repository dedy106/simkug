window.app_saku3_transaksi_spro_fLokasi = function(owner){
	if (owner){
		window.app_saku3_transaksi_spro_fLokasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spro_fLokasi";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi Perusahaan", 0);	
		try
		{		
			uses("portalui_saiCBBL;portalui_uploader;portalui_label;portalui_checkBox;util_standar;util_file;portalui_datePicker");
			this.ed_kode = new portalui_saiCBBL(this);
			this.ed_kode.setLeft(20);
			this.ed_kode.setTop(10);
			this.ed_kode.setWidth(185);
			this.ed_kode.setCaption("Kode");
			this.ed_kode.setText("");
			this.ed_kode.setReadOnly(false);
			this.ed_kode.setLabelWidth(100);
			this.ed_kode.setRightLabelVisible(false);
			this.ed_kode.setRightLabelCaption("");
			this.ed_kode.setMultiSelection(false);
			this.ed_kode.setSQL("select kode_lokasi, nama from lokasi",["kode_lokasi","nama"],undefined,["Kode","Nama"],"where","Data Lokasi",false);
					
			this.bShow = new portalui_imageButton(this);
			this.bShow.setLeft(205);
			this.bShow.setTop(10);
			this.bShow.setHint("Load Data");
			this.bShow.setImage("icon/"+system.getThemes()+"/tabCont2.png");
			this.bShow.setWidth(22);
			this.bShow.setHeight(22);
			this.bShow.setVisible(false);
					
			this.ed_nama = new portalui_saiLabelEdit(this);
			this.ed_nama.setLeft(20);
			this.ed_nama.setTop(32);
			this.ed_nama.setWidth(500);
			this.ed_nama.setCaption("Nama");
			this.ed_nama.setText("");
			this.ed_nama.setReadOnly(false);
			this.ed_nama.setLength(100);
			this.ed_nama.setTag("1");
			
			this.ed_alamat = new portalui_saiLabelEdit(this);
			this.ed_alamat.setLeft(20);
			this.ed_alamat.setTop(54);
			this.ed_alamat.setWidth(500);
			this.ed_alamat.setCaption("Alamat");
			this.ed_alamat.setText("");
			this.ed_alamat.setReadOnly(false);
			this.ed_alamat.setLength(150);
			this.ed_alamat.setTag("1");
			
			this.ed_kota = new portalui_saiLabelEdit(this);
			this.ed_kota.setLeft(20);
			this.ed_kota.setTop(76);
			this.ed_kota.setWidth(300);
			this.ed_kota.setCaption("Kota");
			this.ed_kota.setText("");
			this.ed_kota.setReadOnly(false);
			this.ed_kota.setLength(50);
			this.ed_kota.setTag("1");
			
			this.ed_pos = new portalui_saiLabelEdit(this);
			this.ed_pos.setLeft(20);
			this.ed_pos.setTop(98);
			this.ed_pos.setWidth(150);
			this.ed_pos.setCaption("Kode Pos");
			this.ed_pos.setText("");
			this.ed_pos.setReadOnly(false);
			this.ed_pos.setLength(5);
			this.ed_pos.setTipeText(ttAngka);
			this.ed_pos.setTag("1");
			
			this.ed_tel = new portalui_saiLabelEdit(this);
			this.ed_tel.setLeft(20);
			this.ed_tel.setTop(120);
			this.ed_tel.setWidth(300);
			this.ed_tel.setCaption("No Telepon");
			this.ed_tel.setText("");
			this.ed_tel.setReadOnly(false);
			this.ed_tel.setLength(50);
			this.ed_tel.setTag("1");
			
			this.ed_fax = new portalui_saiLabelEdit(this);
			this.ed_fax.setLeft(20);
			this.ed_fax.setTop(142);
			this.ed_fax.setWidth(300);
			this.ed_fax.setCaption("No Faximile");
			this.ed_fax.setText("");
			this.ed_fax.setReadOnly(false);
			this.ed_fax.setLength(50);
			this.ed_fax.setTag("1");
			
			this.ed_mail = new portalui_saiLabelEdit(this);
			this.ed_mail.setLeft(20);
			this.ed_mail.setTop(164);
			this.ed_mail.setWidth(300);
			this.ed_mail.setCaption("Email");
			this.ed_mail.setText("");
			this.ed_mail.setReadOnly(false);
			this.ed_mail.setLength(100);
			this.ed_mail.setTag("1");
			
			this.ed_web = new portalui_saiLabelEdit(this);
			this.ed_web.setLeft(20);
			this.ed_web.setTop(186);
			this.ed_web.setWidth(300);
			this.ed_web.setCaption("Web site");
			this.ed_web.setText("");
			this.ed_web.setReadOnly(false);
			this.ed_web.setLength(100);
			this.ed_web.setTag("1");
			
			this.ed_pic = new portalui_saiLabelEdit(this);
			this.ed_pic.setLeft(20);
			this.ed_pic.setTop(208);
			this.ed_pic.setWidth(300);
			this.ed_pic.setCaption("Contact Person");
			this.ed_pic.setText("");
			this.ed_pic.setReadOnly(false);
			this.ed_pic.setLength(50);
			this.ed_pic.setTag("1");
			
			this.ed_npwp = new portalui_saiLabelEdit(this);
			this.ed_npwp.setLeft(20);
			this.ed_npwp.setTop(230);
			this.ed_npwp.setWidth(300);
			this.ed_npwp.setCaption("N P W P");
			this.ed_npwp.setText("");
			this.ed_npwp.setReadOnly(false);
			this.ed_npwp.setLength(50);
			this.ed_npwp.setTag("1");
			
			this.lblTgl1 = new portalui_label(this);
			this.lblTgl1.setTop(252);
			this.lblTgl1.setLeft(20);
			this.lblTgl1.setWidth(101);		
			this.lblTgl1.setHeight(20);		
			this.lblTgl1.setCaption("Tanggal PKP");
			this.lblTgl1.setUnderLine(true);
			
			this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,254,82,16]});			
			
			this.ed_logo = new portalui_saiLabelEdit(this);
			this.ed_logo.setLeft(20);
			this.ed_logo.setTop(274);
			this.ed_logo.setWidth(500);
			this.ed_logo.setCaption("Logo Perusahaan");
			this.ed_logo.setText("");
			this.ed_logo.setReadOnly(true);
			this.ed_logo.setLength(150);
			this.ed_logo.setTag("1");
					
			this.uploader = new portalui_uploader(this);
			this.uploader.setLeft(530);
			this.uploader.setTop(274);
			this.uploader.setWidth(80);
			this.uploader.setHeight(20);		
			this.uploader.onAfterUpload.set(this,"doAfterLoad");
			this.uploader.setParam4("server/media/");
			this.uploader.setParam3("object");		
			this.uploader.setParam2("server/media/tmp/");		
			this.uploader.setParam1("uploadTo");					
			this.uploader.setAutoSubmit(true);
			this.uploader.onChange.set(this,"doFileChange");
					
			this.lblSts = new portalui_label(this);
			this.lblSts.setTop(303);
			this.lblSts.setLeft(20);
			this.lblSts.setWidth(101);		
			this.lblSts.setHeight(20);		
			this.lblSts.setCaption("Status Lokasi");
			this.lblSts.setUnderLine(true);
					
			this.cb1 = new portalui_checkBox(this);
			this.cb1.setTop(304);
			this.cb1.setLeft(120);
			this.cb1.setWidth(100);
			this.cb1.setCaption("Lokasi Konsolidasi");
			
			this.lblSts2 = new portalui_label(this);
			this.lblSts2.setTop(332);
			this.lblSts2.setLeft(20);
			this.lblSts2.setWidth(101);		
			this.lblSts2.setHeight(20);		
			this.lblSts2.setCaption("Status Lokasi");
			this.lblSts2.setUnderLine(true);
			
			this.cb2 = new portalui_checkBox(this);
			this.cb2.setTop(333);
			this.cb2.setLeft(120);
			this.cb2.setWidth(100);
			this.cb2.setCaption("Lokasi Kantor Pusat");
			
			this.img = new portalui_image(this,{bound:[550,10,150,200]});
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.bShow.onClick.set(this, "showClick");
			this.ed_kode.onChange.set(this, "doEditChange");
			//this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.rootDir = this.fileUtil.getRootDir();			
			this.separator = "/";
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
			this.onClose.set(this,"doClose");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spro_fLokasi.extend(window.portalui_childForm);
window.app_saku3_transaksi_spro_fLokasi.implement({
	doClose: function(sender){
		if (this.dataUpload !="" ) this.fileUtil.deleteFiles(this.dataUpload.temporary);
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.ed_logo.setText(data.filedest);
			this.dataUpload = data;
			this.img.setImage(this.uploader.param2 +this.dataUpload.tmpfile);
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
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
	doModalResult: function(event, modalResult){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);				
					this.cb1.setSelected(false);
					this.cb2.setSelected(false);
					this.img.setImage("");
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{
						var status = "0";
						if (this.cb1.isSelected()) status = "1";
						var statusPst = "0";
						if (this.cb2.isSelected()) statusPst = "1";
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into lokasi (kode_lokasi, nama, alamat, kota, kodepos, no_telp, no_fax, flag_konsol, logo, email, website, npwp, pic, kode_lokkonsol, tgl_pkp, flag_pusat) values "+
								"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+this.ed_kota.getText()+
								"','"+this.ed_pos.getText()+"','"+this.ed_tel.getText()+"','"+this.ed_fax.getText()+"','"+status+"','"+this.ed_logo.getText()+"','"+this.ed_mail.getText()+
								"','"+this.ed_web.getText()+"','"+this.ed_npwp.getText()+"','"+this.ed_pic.getText()+"','-','"+this.dp_tgl1.getDateString()+"','"+statusPst+"')");
						
						sql.add("insert into posting_lock (kode_lokasi,flag_lock) values ('"+this.ed_kode.getText()+"','OPEN')");
						this.dbLib.execArraySQL(sql);	
					}
					catch(e){
						system.alert(this, e,"");
					}
				}
				break;		
			case "ubah" :
				if (modalResult == mrOk)
				{
					try
					{
						var status = "0";
						if (this.cb1.isSelected()) status = "1";
						var statusPst = "0";
						if (this.cb2.isSelected()) statusPst = "1";
						
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("update lokasi set nama='"+this.ed_nama.getText()+"', alamat='"+this.ed_alamat.getText()+"', kota='"+
							 this.ed_kota.getText()+"', kodepos='"+this.ed_pos.getText()+"', no_telp='"+this.ed_tel.getText()+"', no_fax='"+
							 this.ed_fax.getText()+"', flag_konsol='"+status+"', logo='"+this.ed_logo.getText()+"', email='"+
							 this.ed_mail.getText()+"', website='"+this.ed_web.getText()+"', npwp='"+this.ed_npwp.getText()+"', pic='"+
							 this.ed_pic.getText()+"',tgl_pkp='"+this.dp_tgl1.getDateString()+"',flag_pusat='"+statusPst+"' where kode_lokasi='"+this.ed_kode.getText()+"'");
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from lokasi where kode_lokasi='"+this.ed_kode.getText()+"'");
						sql.add("delete from posting_lock where kode_lokasi='"+this.ed_kode.getText()+"'");
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
	},
	doEditChange: function(sender){
		this.showClick();
	},
	showClick: function(sender){
		if (this.ed_kode.getText() != "")
		{
			try 
			{ 			
				this.standarLib.clearByTag(this, [1],undefined);				
				setTipeButton(tbSimpan);
				var line,data = this.dbLib.runSQL("select nama, alamat, kota, kodepos, no_telp, no_fax, flag_konsol, logo, email, website, npwp, pic, date_format(tgl_pkp,'%d/%m/%Y') as tgl, flag_pusat from lokasi "+
												  "where kode_lokasi = '"+this.ed_kode.getText()+"'");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.ed_nama.setText(line.get("nama"));
						this.ed_alamat.setText(line.get("alamat"));
						this.ed_kota.setText(line.get("kota"));
						this.ed_pos.setText(line.get("kodepos"));
						this.ed_tel.setText(line.get("no_telp"));
						this.ed_fax.setText(line.get("no_fax"));
						this.ed_logo.setText(line.get("logo"));
						this.ed_mail.setText(line.get("email"));
						this.ed_web.setText(line.get("website"));
						this.ed_npwp.setText(line.get("npwp"));
						this.ed_pic.setText(line.get("pic"));
						this.dp_tgl1.setText(line.get("tgl"));
						this.cb1.setSelected(line.get("flag_konsol") == '1'? true:false);		
						this.cb2.setSelected(line.get("flag_pusat") == '1'? true:false);		
						this.fileBfr = line.get("logo");
						this.img.setImage(this.uploader.param4 +line.get("logo"));
						setTipeButton(tbUbahHapus);				
					}
				}else {
					setTipeButton(tbSimpan);
				}
			} catch(e){
				system.alert(this,e,"");
			}	
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.ed_kode) 
			{
				this.standarLib.showListData(this, "Data Lokasi",this.ed_kode,this.ed_nama, 
											  "select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"'",
											  ["kode_lokasi","nama"],"and",["Kode Lokasi","Deskripsi"],false); 
				this.standarLib.clearByTag(this, new Array("1"),undefined);				
				this.img.setImage("");
			}
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
				{
					case "execArraySQL" :    				
						step="info";
						if (result.toLowerCase().search("error") == -1)					
						{							
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.ed_logo.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/image/"+this.fileBfr);
							}							
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);						  
							this.app._mainForm.pesan(2,"Proses Lengkap (kode lokasi : "+ this.ed_kode.getText()+" tersimpan.)");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
						break;
				}
			}catch(e){
			   alert("step : "+step+"; error = "+e);
			}    
		}
	}
});
