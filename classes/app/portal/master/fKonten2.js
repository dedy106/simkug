window.app_portal_master_fKonten2 = function(owner)
{
	if (owner)
	{
		window.app_portal_master_fKonten2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fKonten2";
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
		this.lTgl.setHeight(18);
		this.lTgl.setCaption("Tanggal");
		this.lTgl.setUnderLine(true);
		uses("portalui_datePicker;portalui_saiCBBL;portalui_saiMemo;portalui_uploader;portalui_checkBox;portalui_richTextArea");
		this.dpTgl = new portalui_datePicker(this);
		this.dpTgl.setTop(32);
		this.dpTgl.setLeft(120);
		this.dpTgl.setWidth(82);
				
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(54);
		this.e0.setWidth(200);
		this.e0.setHeight(20);
		this.e0.setCaption("Kode Konten");		
		this.e0.setReadOnly(true);
		this.e0.setBtnVisible(false);
		this.e0.setRightLabelVisible(false);
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(205);
		this.bGen.setTop(54);
		this.bGen.setCaption("Generate");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		this.bGen.onClick.set(this,"doGen");
		
		this.eKlp = new portalui_saiCBBL(this);
		this.eKlp.setLeft(20);
		this.eKlp.setTop(65);
		this.eKlp.setWidth(200);
		this.eKlp.setCaption("Kelompok");		
		this.eKlp.onBtnClick.set(this, "FindBtnClick");
		this.eKlp.setRightLabelVisible(true);
		
		this.eJudul = new portalui_saiLabelEdit(this);
		this.eJudul.setTop(60);
		this.eJudul.setLeft(20);
		this.eJudul.setWidth(400);
		this.eJudul.setCaption("Judul");
				
		this.e1 = new portalui_saiMemo(this);
		this.e1.setLeft(20);
		this.e1.setTop(76);
		this.e1.setWidth(400);
		this.e1.setHeight(100);
		this.e1.setCaption("Keterangan");
		this.e1.setReadOnly(false);
		
		
		this.cbblNik = new portalui_saiCBBL(this);
		this.cbblNik.setTop(225);
		this.cbblNik.setWidth(250);
		this.cbblNik.setLeft(20);
		this.cbblNik.setCaption("Pembuat");
		this.cbblNik.onBtnClick.set(this,"FindBtnClick");
		this.cbblNik.setText(this.app._userLog);
		
		this.e02 = new portalui_saiCBBL(this);
		this.e02.setLeft(20);
		this.e02.setTop(230);
		this.e02.setWidth(260);
		this.e02.setCaption("Gambar");
		this.e02.setText("");
		this.e02.setReadOnly(true);
		this.e02.setName("e02");
		this.e02.setBtnVisible(false);
		this.e02.setTag("1");
				
		this.uploader = new portalui_uploader(this);
		this.uploader.setLeft(265);
		this.uploader.setTop(230);
		this.uploader.setWidth(80);
		this.uploader.setHeight(20);
		this.uploader.onAfterUpload.set(this,"doAfterLoad");
		this.uploader.setParam4("data");
		this.uploader.setParam3("object");
		this.uploader.setParam1(this.app._userLog);
		this.uploader.setAutoSubmit(true);
		this.uploader.onChange.set(this,"doFileChange");
		
		this.e03 = new portalui_saiCBBL(this);
		this.e03.setLeft(20);
		this.e03.setTop(240);
		this.e03.setWidth(260);
		this.e03.setCaption("File");
		this.e03.setText("");
		this.e03.setReadOnly(true);
		this.e03.setName("e02");
		this.e03.setBtnVisible(false);
		this.e03.setTag("1");
				
		this.uploader3 = new portalui_uploader(this);
		this.uploader3.setLeft(265);
		this.uploader3.setTop(240);
		this.uploader3.setWidth(80);
		this.uploader3.setHeight(20);
		this.uploader3.onAfterUpload.set(this,"doAfterLoad3");
		this.uploader3.setParam4("data");
		this.uploader3.setParam3("object");
		this.uploader3.setParam1(this.app._userLog);
		this.uploader3.setAutoSubmit(true);
		this.uploader3.onChange.set(this,"doFileChange3");
				
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
		this.rearrangeChild(10,23);
		
		this.pDesk = new portalui_panel(this);
		this.pDesk.setTop(10);
		this.pDesk.setLeft(440);
		this.pDesk.setWidth(555);
		this.pDesk.setHeight(300);
		this.pDesk.setBorder(3);
		this.pDesk.setCaption("Deskripsi");			
			this.mDesk = new portalui_richTextArea(this.pDesk);
			this.mDesk.setTop(20);
			this.mDesk.setLeft(0);
			this.mDesk.setWidth(553);
			this.mDesk.setHeight(278);
			this.mDesk.display();
			this.bCode = new portalui_imageButton(this.pDesk,{bound:[530,2,16,16],image:"icon/dynpro/bGenLocal.png",click:[this,"doCodeClick"],hint:"Source Code(HTML)"});
		
		var tmpDate=new Date();
		var tmp="";		
		this.user=tmp.concat(this.app._userLog,"_",tmpDate.valueOf(),"_");
		
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
			uses("util_file",true);
			this.file = new util_file();
			this.file.addListener(this);
			
		}catch(e)
		{
			alert("[app_portal_master_fKonten2]->constructor : "+e);
		}
	}
};
window.app_portal_master_fKonten2.extend(window.portalui_childForm);
window.app_portal_master_fKonten2.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fKonten2.prototype.doModalResult = function(event, modalResult)
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
					//this.nama=this.user+this.filename;
					//this.nama3=this.user+this.filename3;
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();			
					sql.add("insert into portal_konten (kode_konten,kode_lokasi,kode_klp,nik_buat,tanggal,judul,keterangan,gambar,no_file_dok,periode,nik_user,tgl_input,deskripsi,status_slide,status_front,status_aktif) values  "+
							"('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.eKlp.getText()+"','"+this.cbblNik.getText()+"','"+this.dpTgl.getDate()+"','"+this.eJudul.getText()+"','"+this.e1.getText()+"','"+this.no_gambar2+"','"+this.no_file2+"','"+this.app._periode+"','"+this.ed_periode.getText().substr(2,4)+"','"+(new Date).getDateStr()+"','"+urlencode(this.mDesk.getText(2))+"','"+(this.cbSlide.selected ? '1':'0')+"','"+(this.cbFront.selected ? '1':'0')+"','"+(this.cbAktif.selected ? '1':'0')+"') ");
					if (this.no_gambar!=this.no_gambar2)
					{
						sql.add("delete from portal_file where no_file='"+this.no_gambar+"'");
						sql.add("insert into portal_file(no_file, nama,  tanggal,folder, tipe,size, ext,kode_lokasi) values "+
							" ('"+this.no_gambar2+"','"+this.filename+"','"+(new Date).sqlDateStr(this.tgl)+"','"+this.folder+"','"+this.tipe+
								"','"+this.size+"','"+this.ext+"','"+this.app._lokasi+"') ");
										}
					if (this.no_file!=this.no_file2)
					{
						sql.add("delete from portal_file where no_file='"+this.no_file+"'");
						sql.add("insert into portal_file(no_file, nama,  tanggal,folder, tipe,size, ext,kode_lokasi) values "+
							" ('"+this.no_file2+"','"+this.filename3+"','"+(new Date).sqlDateStr(this.tgl3)+"','"+this.folder3+"','"+this.tipe3+
								"','"+this.size3+"','"+this.ext3+"','"+this.app._lokasi+"') ");
					}
					//alert(sql.get(0));alert(sql.get(1));alert(sql.get(2));
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
window.app_portal_master_fKonten2.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_periode.setText(year.toString()+month);
};
window.app_portal_master_fKonten2.prototype.doGen = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_konten", "kode_konten", "KTN"+this.ed_periode.getText().substr(2,4)+"","0000"," and kode_lokasi='"+this.app._lokasi+"'"));	
	this.e0.setFocus();
};
window.app_portal_master_fKonten2.prototype.FindBtnClick = function(sender, event)
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
window.app_portal_master_fKonten2.prototype.doRequestReady = function(sender, methodName, result)
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
						this.uploadFile();
						  
		            }else system.info(this,result,"");
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
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
};
window.app_portal_master_fKonten2.prototype.doCodeClick = function(sender)
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

window.app_portal_master_fKonten2.prototype.doAfterLoad = function(sender, result, data)
{
	try{
		if (!result && this.saveData)
		{
			
			this.saveData = false;
		}else if (this.saveData){
			this.saveData = false;
		}
	}catch(e)
	{
		alert("doAfterLoad: "+e);
	}
};
window.app_portal_master_fKonten2.prototype.doFileChange = function(sender, filename, allow, data)
{
	try{
		if (this.tmpFile !== "") this.file.deleteFile(this.tmpFile);			
		
		this.uploader.setParam2("");
        eval("data = "+urldecode(data));    
		if (data){
			this.e02.setText(data.filename);
			this.filename=data.filename;
			this.folder=data.folder;
			this.tgl=data.tanggal;
			this.tipe=data.tipe;
			this.size=data.size;
			this.ext=data.ext;
			this.tmpFile = data.tmpfile;
			this.no_gambar2=this.user+this.filename;
		}else throw(data);
	}catch(e){
		alert("doFileChange: "+ e);
	}
};

window.app_portal_master_fKonten2.prototype.doFileChange3 = function(sender, filename, allow, data)
{
	try{
		if (this.tmpFile3 !== "") this.file.deleteFile(this.tmpFile3);
		
		this.uploader.setParam2("");
        eval("data = "+urldecode(data));    
		if (data){
			this.e03.setText(data.filename);
			this.filename3=data.filename;
			this.folder3=data.folder;
			this.tgl3=data.tanggal;
			this.tipe3=data.tipe;
			this.size3=data.size;
			this.ext3=data.ext;
			this.tmpFile3 = data.tmpfile;
			this.no_file2=this.user+this.filename3;
		}else throw(data);
	}catch(e){
		alert("doFileChange: "+ e);
	}
};

window.app_portal_master_fKonten2.prototype.uploadFile = function(sender)
{
	
	try{
		if (this.tmpFile !== ""){
			var rootDir = this.file.getRootDir();
			var separator = rootDir.charAt(rootDir.length-1);
			this.file.copyFileTo(this.tmpFile,rootDir +this.folder +separator+this.user+this.filename,true);
			this.file.deleteFile(this.tmpFile);
			this.tmpFile = "";		
		}
		if (this.tmpFile3 !== ""){
			if (rootDir == undefined) var rootDir = this.file.getRootDir();
			var separator = rootDir.charAt(rootDir.length-1);
			this.file.copyFileTo(this.tmpFile3,rootDir +this.folder3 +separator+this.user+this.filename3,true);
			this.file.deleteFile(this.tmpFile3);
			this.tmpFile3 = "";		
		}
	}catch(e){
		alert(e);
	}
};
window.app_portal_master_fKonten2.prototype.doClose = function(sender)
{
	if (this.tmpFile !== ""){								
		this.file.deleteFile(this.tmpFile);
	}
	if (this.tmpFile3 !== ""){								
		this.file.deleteFile(this.tmpFile3);
	}
};