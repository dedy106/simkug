window.app_portal_master_fKontenK = function(owner)
{
  if (owner)
	{
		window.app_portal_master_fKontenK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fKontenK";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Konten : Koreksi", 0);	
		
		uses("portalui_saiCBBL",true);
		this.eKlp = new portalui_saiCBBL(this);
		this.eKlp.setLeft(20);
		this.eKlp.setTop(10);
		this.eKlp.setWidth(200);
		this.eKlp.setCaption("Kelompok");
		this.eKlp.setReadOnly(true);
		this.eKlp.onBtnClick.set(this, "FindBtnClick");
		this.eKlp.setRightLabelVisible(true);
		
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(32);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode Konten");		
		this.e0.setReadOnly(true);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");		
		this.e0.setRightLabelVisible(false);
		
		uses("portalui_saiMemo",true);
		this.e1 = new portalui_saiMemo(this);
		this.e1.setLeft(20);
		this.e1.setTop(54);
		this.e1.setWidth(400);
		this.e1.setHeight(100);
		this.e1.setCaption("Keterangan");		
		this.e1.setReadOnly(false);
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setTop(156);
		this.lTgl.setLeft(20);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(20);
		this.lTgl.setCaption("Tanggal");
		this.lTgl.setUnderLine(true);
		uses("portalui_datePicker",true);
		this.dpTgl = new portalui_datePicker(this);
		this.dpTgl.setTop(158);
		this.dpTgl.setLeft(120);
		this.dpTgl.setWidth(82);
		
		this.eJudul = new portalui_saiLabelEdit(this);
		this.eJudul.setTop(180);
		this.eJudul.setLeft(20);
		this.eJudul.setWidth(400);
		this.eJudul.setCaption("Judul");
		
		this.cbblNik = new portalui_saiCBBL(this);
		this.cbblNik.setTop(203);
		this.cbblNik.setWidth(250);
		this.cbblNik.setLeft(20);
		this.cbblNik.setCaption("Pembuat");
		this.cbblNik.onBtnClick.set(this,"FindBtnClick");
		
		this.uploader = new portalui_saiCBBL(this);
		this.uploader.setTop(227);
		this.uploader.setWidth(250);		
		this.uploader.setLeft(20);		
		this.uploader.setCaption("File Dokumen");	
		this.uploader.onBtnClick.set(this,"FindBtnClick");
		
		this.cbImg = new portalui_saiCBBL(this);
		this.cbImg.setTop(250);
		this.cbImg.setWidth(275);		
		this.cbImg.setLeft(20);		
		this.cbImg.setCaption("Gambar");
		this.cbImg.setReadOnly(false);
		this.cbImg.onBtnClick.set(this,"FindBtnClick");
		
		uses("portalui_checkBox",true);
		this.cbSlide = new portalui_checkBox(this);
		this.cbSlide.setTop(280);
		this.cbSlide.setLeft(20);
		this.cbSlide.setWidth(80);
		this.cbSlide.setCaption("Status Slide");
		
		this.cbFront = new portalui_checkBox(this);
		this.cbFront.setTop(280);
		this.cbFront.setLeft(120);
		this.cbFront.setWidth(80);
		this.cbFront.setCaption("Status Front");
		
		this.cbAktif = new portalui_checkBox(this);
		this.cbAktif.setTop(280);
		this.cbAktif.setLeft(220);
		this.cbAktif.setWidth(80);
		this.cbAktif.setCaption("Status Aktif");
		this.pDesk = new portalui_panel(this);
		this.pDesk.setTop(10);
		this.pDesk.setLeft(440);
		this.pDesk.setWidth(555);
		this.pDesk.setHeight(300);
		this.pDesk.setBorder(3);
		this.pDesk.setCaption("Deskripsi");
			uses("portalui_richTextArea",true);
			this.mDesk = new portalui_richTextArea(this.pDesk);
			this.mDesk.setTop(20);
			this.mDesk.setLeft(0);
			this.mDesk.setWidth(553);
			this.mDesk.setHeight(278);
			this.mDesk.display();
			this.bCode = new portalui_imageButton(this.pDesk,{bound:[530,2,16,16],image:"icon/dynpro/bGenLocal.png",click:[this,"doCodeClick"],hint:"Source Code(HTML)"});
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_portal_master_fKontenK]->constructor : "+e);
		}
	}
};
window.app_portal_master_fKontenK.extend(window.portalui_childForm);
window.app_portal_master_fKontenK.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_portal_master_fKontenK.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);
				this.cbSlide.setSelected(false);
				this.cbFront.setSelected(false);
				this.cbAktif.setSelected(false);
				this.mDesk.setText("");
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{				
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("update portal_konten set kode_klp='"+this.eKlp.getText()+"',nik_buat='"+this.cbblNik.getText()+
				"',tanggal='"+this.dpTgl.getDate()+"',judul='"+this.eJudul.getText()+"',keterangan='"+this.e1.getText()+
				"',gambar='"+this.cbImg.getText()+"',no_file_dok='"+this.uploader.getText()+
				"',deskripsi='"+urlencode(this.mDesk.getText(2))+"',status_slide='"+(this.cbSlide.selected ? '1':'0')+
				"',status_front='"+(this.cbFront.selected ? '1':'0')+"',status_aktif='"+(this.cbAktif.selected ? '1':'0')+
				"' where kode_konten = '"+this.e0.getText()+"' ");
				this.dbLib.execArraySQL(sql);
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from portal_konten where kode_konten='"+this.e0.getText()+"'");
				this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_master_fKontenK.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_master_fKontenK.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select * from portal_konten where kode_konten = '"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("keterangan"));
					this.dpTgl.setDateString(data.get("tanggal"));
					this.eJudul.setText(data.get("judul"));
					this.cbblNik.setText(data.get("nik_buat"));					
					this.mDesk.setText(urldecode(data.get("deskripsi")));
					this.uploader.setText(data.get("no_file_dok"));
					this.cbImg.setText(data.get("gambar"));
					this.cbSlide.setSelected((data.get("status_slide") == 1 ? true:false));
					this.cbFront.setSelected((data.get("status_front") == 1 ? true:false));
					this.cbAktif.setSelected((data.get("status_aktif") == 1 ? true:false));
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_master_fKontenK.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Kelompok Konten",this.e0,undefined, 
										  "select kode_konten,judul from portal_konten where kode_klp='"+this.eKlp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_konten where kode_klp='"+this.eKlp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_konten","judul"],"where",["Kode","Judul"]);
		if (sender == this.cbImg)
			this.standarLib.showListData(this, "Data File",sender,undefined, 
										  "select no_dok_file, nama from portal_dokumen where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_dokumen where kode_lokasi='"+this.app._lokasi+"'",
										  ["no_dok_file","nama"],"where",["Kode","Nama"]);
		        
        if (sender == this.uploader)
			this.standarLib.showListData(this, "Data File",this.uploader,this.cbImg, 
										  "select no_dok_file, nama from portal_dokumen where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_dokumen where kode_lokasi='"+this.app._lokasi+"'",
										  ["no_dok_file","nama"],"where",["Kode","Nama"]);
		if (sender == this.eKlp)
			this.standarLib.showListData(this, "Data Kelompok Konten",this.eKlp,undefined,
										  "select kode_klp, nama from portal_klp_konten where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_klp_konten where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_klp","nama"],"where",["Kode","Nama"]);
		if (sender == this.cbblNik)
			this.standarLib.showListData(this, "Data Pembuat",this.cbblNik,undefined,
										  "select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"where",["Kode","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_master_fKontenK.prototype.doRequestReady = function(sender, methodName, result)
{
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
						this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
						this.app._mainForm.bClear.click();
		            }else system.info(this,result,"");
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};
window.app_portal_master_fKontenK.prototype.doCodeClick = function(sender)
{
	try{		
		this.mDesk.toggleMode();			
		if (this.mDesk.viewMode == 2){
			sender.setHint("Preview");
		}else sender.setHint("Source Code (HTML)");
	}catch(e){
		alert(e);
	}
};
