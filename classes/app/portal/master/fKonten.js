window.app_portal_master_fKonten = function(owner)
{
	if (owner)
	{
		window.app_portal_master_fKonten.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fKonten";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Konten : Input", 0);	
		
		this.ed_periode = new portalui_saiLabelEdit(this);
		this.ed_periode.setLeft(20);
		this.ed_periode.setTop(10);
		this.ed_periode.setWidth(182);
		this.ed_periode.setCaption("Periode");		
		this.ed_periode.setReadOnly(true);
		this.ed_periode.setTag("9");
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setTop(32);
		this.lTgl.setLeft(20);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(20);
		this.lTgl.setCaption("Tanggal");
		this.lTgl.setUnderLine(true);
		uses("portalui_datePicker",true);
		this.dpTgl = new portalui_datePicker(this);
		this.dpTgl.setTop(34);
		this.dpTgl.setLeft(120);
		this.dpTgl.setWidth(82);
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(54);
		this.e0.setWidth(260);
		this.e0.setCaption("Kode Konten");		
		this.e0.setReadOnly(true);
		this.e0.setBtnVisible(false);
		this.e0.setRightLabelVisible(false);
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(265);
		this.bGen.setTop(55);
		this.bGen.setCaption("Generate");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		this.bGen.onClick.set(this,"doGen");
		
		uses("portalui_saiMemo",true);
		this.e1 = new portalui_saiMemo(this);
		this.e1.setLeft(20);
		this.e1.setTop(76);
		this.e1.setWidth(400);
		this.e1.setHeight(100);
		this.e1.setCaption("Keterangan");
		this.e1.setReadOnly(false);
		
		this.eKlp = new portalui_saiCBBL(this);
		this.eKlp.setLeft(20);
		this.eKlp.setTop(179);
		this.eKlp.setWidth(250);
		this.eKlp.setCaption("Kelompok");		
		this.eKlp.onBtnClick.set(this, "FindBtnClick");
		this.eKlp.setRightLabelVisible(true);
		
		this.eJudul = new portalui_saiLabelEdit(this);
		this.eJudul.setTop(202);
		this.eJudul.setLeft(20);
		this.eJudul.setWidth(400);
		this.eJudul.setCaption("Judul");
		
		this.cbblNik = new portalui_saiCBBL(this);
		this.cbblNik.setTop(225);
		this.cbblNik.setWidth(250);
		this.cbblNik.setLeft(20);
		this.cbblNik.setCaption("Pembuat");
		this.cbblNik.onBtnClick.set(this,"FindBtnClick");
		
		this.uploader = new portalui_saiCBBL(this);
		this.uploader.setTop(248);
		this.uploader.setWidth(250);		
		this.uploader.setLeft(20);		
		this.uploader.setCaption("File Dokumen");	
		this.uploader.onBtnClick.set(this,"FindBtnClick");
		
		this.cbImg = new portalui_saiCBBL(this);
		this.cbImg.setTop(271);
		this.cbImg.setWidth(250);		
		this.cbImg.setLeft(20);		
		this.cbImg.setCaption("Gambar");
		this.cbImg.onBtnClick.set(this,"FindBtnClick");
		
		uses("portalui_checkBox",true);
		this.cbSlide = new portalui_checkBox(this);
		this.cbSlide.setTop(300);
		this.cbSlide.setLeft(20);
		this.cbSlide.setWidth(80);
		this.cbSlide.setCaption("Status Slide");
		
		this.cbFront = new portalui_checkBox(this);
		this.cbFront.setTop(300);
		this.cbFront.setLeft(120);
		this.cbFront.setWidth(80);
		this.cbFront.setCaption("Status Front");
		
		this.cbAktif = new portalui_checkBox(this);
		this.cbAktif.setTop(300);
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
		
		setTipeButton(tbSimpan);
		this.maximize();
		this.dpTgl.onSelect.set(this, "doSelect");
		this.doSelect(this.dpTgl,this.dpTgl.year,this.dpTgl.month,this.dpTgl.day);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_portal_master_fKonten]->constructor : "+e);
		}
	}
};
window.app_portal_master_fKonten.extend(window.portalui_childForm);
window.app_portal_master_fKonten.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fKonten.prototype.doModalResult = function(event, modalResult)
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
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();					
					sql.add("insert into portal_konten (kode_konten,kode_lokasi,kode_klp,nik_buat,tanggal,judul,keterangan,gambar,no_file_dok,periode,nik_user,tgl_input,deskripsi,status_slide,status_front,status_aktif) values  "+
							"('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.eKlp.getText()+"','"+this.cbblNik.getText()+"','"+this.dpTgl.getDate()+"','"+this.eJudul.getText()+"','"+this.e1.getText()+"','"+this.cbImg.getText()+"','"+this.uploader.getText()+"','"+this.app._periode+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+urlencode(this.mDesk.getText(2))+"','"+(this.cbSlide.selected ? '1':'0')+"','"+(this.cbFront.selected ? '1':'0')+"','"+(this.cbAktif.selected ? '1':'0')+"') ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
	}
	this.e0.setFocus();
};
window.app_portal_master_fKonten.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_periode.setText(year.toString()+month);
};
window.app_portal_master_fKonten.prototype.doGen = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_konten", "kode_konten", "KTN"+this.ed_periode.getText().substr(2,4)+"","0000"," and kode_lokasi='"+this.app._lokasi+"'"));	
	this.e0.setFocus();
};
window.app_portal_master_fKonten.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.uploader)
			this.standarLib.showListData(this, "Data File",this.uploader,undefined, 
										  "select no_dok_file, nama from portal_dokumen where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_dokumen where kode_lokasi='"+this.app._lokasi+"'",
										  ["no_dok_file","nama"],"where",["Kode","Nama"]);
		if (sender == this.cbImg)
			this.standarLib.showListData(this, "Data File",sender,undefined, 
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
										  ["nik","nama"],"where",["NIK","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_master_fKonten.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_portal_master_fKonten.prototype.doCodeClick = function(sender)
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
