window.app_eclaim_transaksi_fPesan = function(owner)
{
  if (owner)
	{
		window.app_eclaim_transaksi_fPesan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim_transaksi_fPesan";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		uses("portalui_saiCBBL;portalui_uploader;server_util_mail;portalui_richTextArea;util_file;portalui_checkBox");		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kirim Pesan",0);	
		this.kpd = new portalui_saiCBBL(this,{bound:[20,10,250,20],caption:"Kepada",change:[this,"doChange"]});		
		this.kpd.setMultiSelection(false);		
		this.kpd.setSQL("select nik,nama,email from eclaim_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",["nik","nama","email"],undefined,["User ID","Nama","Email"],"where","Data User");
		this.subjek = new portalui_saiLabelEdit(this,{bound:[20,32,620,20],caption:"Subyek"});		
		this.attfile = new portalui_saiLabelEdit(this,{bound:[20,54,400,20],caption:"File Attachment",text:"-"});		
		this.attach = new portalui_uploader(this,{bound:[430,54,80,20],afterUpload:[this,"doAfterLoad"],param1:"uploadTo", param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true});		
		this.cbEmail = new portalui_checkBox(this,{bound:[530,54,100,20],caption:"Forward to Email",selected:true});
		this.pPesan = new portalui_panel(this,{bound:[20,77,620,300],border:pbFlat,caption:"Pesan"});					
			this.mPesan = new portalui_richTextArea(this.pPesan,{bound:[1,20,618,278]});			
			this.mPesan.display();		
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);		
			this.standarLib = new util_standar();
			this.mail = new server_util_mail();
			this.mail.addListener(this);
			this.mail.setUser("admin@roojax.com","saisai","tls");
			this.mail.configSmtp("smtp.gmail.com",465);
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.fileUtil.getRootDir();			
			this.separator = "/";
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
			this.fileUtil.cleanUp(this.rootDir + "/server/media/tmp");
			
			this.onClose.set(this, "doClose");
		}catch(e){
			alert("[app_eclaim_transaksi_fPesan]->constructor : "+e);
		}
	}
};
window.app_eclaim_transaksi_fPesan.extend(window.portalui_childForm);
window.app_eclaim_transaksi_fPesan.implement({
	
	getPeriodeNow: function(){
		if ((new Date).getBln()<10)
			var bln="0"+(new Date).getBln();
		return ((new Date).getFullYear().toString()+bln);
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");		
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		this.event = event;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0"),this.kpd);
					this.filename = "";
					this.tmpFile = "";	
				}
			break;
			case "simpan" :
				if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
				{
					try
					{
						var id=this.standarLib.noBuktiOtomatis(this.dbLib, "eclaim_pesan", "no_pesan", "PSN/"+this.getPeriodeNow()+"/","0000");
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("insert into eclaim_pesan (no_pesan,kode_lokasi,tanggal,dari, kepada,subyek,isi_pesan,flag_email,no_file_dok,tgl_input,flag_read,periode,nik_user,modul) values  "+
								"('"+id+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.kpd.getText()+"','"+this.subjek.getText()+"','"+this.mPesan.getText(2)+"','0','"+this.attfile.getText()+"','"+(new Date).getDateStr()+"','0','"+this.getPeriodeNow()+"','"+this.app._userLog+"','SALES') ");
												
						this.dbLib.execArraySQL(sql);
						this.attfile.setText("-");
						this.saveData = true;
					}catch(e){
						system.alert(this, e,"");
					}
				}
			break;
		}
		this.kpd.setFocus();
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
				{
					case "execArraySQL" :    										
						if (result.toLowerCase().search("error") == -1)					
						{							
							this.app._mainForm.pesan(2,"transfer file.............");
							if (this.cbEmail.isSelected())
								this.mail.send(undefined,this.kpd.dataFromList[2],this.subjek.getText(),this.mPesan.getText(2),(this.dataUpload? this.rootDir+"/"+this.attach.param2 +this.dataUpload.tmpfile: undefined));
							if (this.attfile.getText() != "-" && this.dataUpload !== undefined){
								this.fileUtil.copyFileTo(this.rootDir+"/"+this.attach.param2 +this.dataUpload.tmpfile,this.rootDir+"/"+this.attach.param4 +this.dataUpload.filedest);																
							}else {							
								this.app._mainForm.pesan(2,"process completed ("+ this.kpd.getText()+")");
								this.app._mainForm.bClear.click();
							}
						}else this.app._mainForm.pesan(0, result);
					break;
				}
			}catch(e){
			   alert(e);
			}
		}
		if (sender == this.file)
		{
			if (methodName == "copyFileTo")
			{
				if (result){
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					this.app._mainForm.bClear.click();
				}else system.alert(this,"Error transfer...","");
			}
		}
	},
	doAfterLoad: function(sender, result, data, filename){
		try{
			if (result) this.attfile.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.attach.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},	
	doClose: function(sender){
		if (this.dataUpload !== undefined) this.fileUtil.deleteFiles(this.dataUpload.temporary);		
	},
	doChange: function(sender){
		if (sender == this.kpd){
			/*alert(sender.dataFromList[2]);
			var data = this.dbLib.runSQL("select a.email from eclaim_hakakses a where a.nik='"+this.kpd.getText()+"' order by a.nama ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					var kepada=data.get("email");
				}
			}else throw(data);						*/
		}
	}
});
