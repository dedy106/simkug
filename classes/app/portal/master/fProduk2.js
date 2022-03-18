window.app_portal_master_fProduk2 = function(owner)
{
  if (owner)
	{
		window.app_portal_master_fProduk2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fProduk2";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Produk : Input", 0);	
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(1);
		this.e0.setWidth(215);
		this.e0.setCaption("Kode Produk");
		this.e0.setReadOnly(false);
		this.e0.setBtnVisible(false);
		this.e0.setRightLabelVisible(false);
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(35);
		this.e1.setWidth(500);
		this.e1.setCaption("Nama");		
		this.e1.setReadOnly(false);
		
		this.eKategori = new portalui_saiCBBL(this);
		this.eKategori.setLeft(20);
		this.eKategori.setTop(60);
		this.eKategori.setWidth(200);
		this.eKategori.setCaption("Kategori");
		this.eKategori.setRightLabelVisible(true);
		this.eKategori.onBtnClick.set(this, "FindBtnClick");		
		
		this.ePabrik = new portalui_saiCBBL(this);
		this.ePabrik.setLeft(20);
		this.ePabrik.setTop(135);
		this.ePabrik.setWidth(200);
		this.ePabrik.setCaption("Pabrik");
		this.ePabrik.setRightLabelVisible(true);
		this.ePabrik.onBtnClick.set(this, "FindBtnClick");
		
		this.eHarga = new portalui_saiLabelEdit(this);
		this.eHarga.setLeft(20);
		this.eHarga.setTop(210);
		this.eHarga.setWidth(200);
		this.eHarga.setTipeText(ttNilai);
		this.eHarga.setAlignment(alRight);
		this.eHarga.setCaption("Harga");
		
		this.satuan = new portalui_saiCB(this);
		this.satuan.setTop(290);
		this.satuan.setLeft(20);
		this.satuan.setWidth(200);
		this.satuan.setCaption("Satuan");
		this.satuan.addItem(0,"PCS");
		this.satuan.addItem(1,"SET");
		this.satuan.setLength(100);
		this.satuan.setTag("9");
		
				
		this.e02 = new portalui_saiCBBL(this);
		this.e02.setLeft(20);
		this.e02.setTop(300);
		this.e02.setWidth(260);
		this.e02.setCaption("Gambar");
		this.e02.setText("");
		this.e02.setReadOnly(true);
		this.e02.setName("e02");
		this.e02.setBtnVisible(false);
		this.e02.setTag("1");
		
		uses("portalui_uploader",true);
		this.uploader = new portalui_uploader(this);
		this.uploader.setLeft(265);
		this.uploader.setTop(300);
		this.uploader.setWidth(80);
		this.uploader.setHeight(20);
		this.uploader.onAfterUpload.set(this,"doAfterLoad");
		this.uploader.setParam4("data");
		this.uploader.setParam3("object");
		this.uploader.setParam1(this.app._userLog);
		this.uploader.setAutoSubmit(true);
		this.uploader.onChange.set(this,"doFileChange");
		
		uses("portalui_checkBox",true);
		this.cbSlide = new portalui_checkBox(this);
		this.cbSlide.setTop(56);
		this.cbSlide.setLeft(20);
		this.cbSlide.setWidth(80);
		this.cbSlide.setCaption("Status Slide");
		
		this.cbFront = new portalui_checkBox(this);
		this.cbFront.setTop(56);
		this.cbFront.setLeft(100);
		this.cbFront.setWidth(80);
		this.cbFront.setCaption("Status Front");
		
		uses("portalui_pageControl",true);
		uses("portalui_childPage",true);
		this.pControl = new portalui_pageControl(this);
		this.pControl.setBGColor(system.getConfig("form.color"));
		this.pControl.setTop(75);
		this.pControl.setWidth(570);
		this.pControl.setHeight(210);
		this.pControl.setLeft(20);
		
			this.page1 = new portalui_childPage(this.pControl);
			this.page1.setCaption("Deskripsi");
						
			uses("portalui_richTextArea",true);
			this.desk = new portalui_richTextArea(this.page1);
			this.desk.setTop(0);
			this.desk.setLeft(0);
			this.desk.setWidth(548);
			this.desk.setHeight(200);
			this.desk.display();
		
		this.rearrangeChild(10,23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar",true);
			this.standarLib = new util_standar();
			uses("util_file",true);
			this.filename = "";
			this.tmpFile = "";
			this.saveData = false;
			this.file = new util_file();
			this.file.addListener(this);
		}catch(e)
		{
			alert("[app_portal_master_fProduk2]->constructor : "+e);
		}
	}
};
window.app_portal_master_fProduk2.extend(window.portalui_childForm);
window.app_portal_master_fProduk2.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fProduk2.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);
				this.cbSlide.setSelected(false);
				this.cbFront.setSelected(false);
				this.desk.setText("");
				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("insert into portal_produk (kode_produk, kode_kategori, nama, kode_lokasi, tgl_input, nik_user, model, kode_merk, kode_pabrik , "+
							"warna, berat, harga, harga_special, tgl_mulai_special, tgl_akhir_special, desk_pendek, desk_panjang, stok, status_stok, status, tgl_awal, tgl_selesai, no_file,status_slide,status_front,satuan,spesifikasi,angsuran,fitur) values  "+
							"('"+this.e0.getText()+"','"+this.eKategori.getText()+"','"+this.e1.getText()+"','"+this.app._lokasi+"','"+(new Date).getDateStr()+"','"+this.app._userLog+"','-','-','"+this.ePabrik.getText()+"' "+
							"	,'-','-','"+parseNilai(this.eHarga.getText())+"',0 "+
							"	,'"+(new Date).getDateStr()+"','"+(new Date).getDateStr()+"','-','"+this.desk.getText(2)+"','0' "+
							" 	,'-','-','"+(new Date).getDateStr()+"','"+(new Date).getDateStr()+"','"+this.e02.getText()+"','"+(this.cbSlide.selected ? '1':'0')+"','"+(this.cbFront.selected ? '1':'0')+"','"+this.satuan.getText()+"','-','-','-') ");
					sql.add("insert into portal_file(no_file, nama,  tanggal,folder, tipe,size, ext,kode_lokasi) values "+
							" ('"+this.filename+"','"+this.filename+"','"+(new Date).sqlDateStr(this.tgl)+"','"+this.folder+"','"+this.tipe+
								"','"+this.size+"','"+this.ext+"','"+this.app._lokasi+"') ");
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
window.app_portal_master_fProduk2.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.uploader)
			this.standarLib.showListData(this, "Data File",sender,undefined, 
										  "select no_dok_file, nama from portal_dokumen","select count(*) from portal_dokumen",
										  ["no_dok_file","nama"],"where",["Kode","Nama"]);
		if (sender == this.eKategori)
			this.standarLib.showListData(this, "Data Kategori",sender,undefined, 
										  "select kode_kategori, nama from portal_kategori where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_kategori where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_kategori","nama"],"where",["Kode","Nama"]);
		if (sender == this.ePabrik)
			this.standarLib.showListData(this, "Data Pabrik",sender,undefined, 
										  "select kode_pabrik, nama from portal_pabrik ",
										  "select count(*) from portal_pabrik ",
										  ["kode_pabrik","nama"],"where",["Kode","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_master_fProduk2.prototype.doRequestReady = function(sender, methodName, result)
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

window.app_portal_master_fProduk2.prototype.doAfterLoad = function(sender, result, data)
{
	try{
		if (!result && this.saveData)
		{
			uses("server_util_arrayList",true);
			sql = new server_util_arrayList();
			sql.add("delete from portal_file where no_file = '"+this.e02.getText()+"' ");
			this.dbLib.execArraySQL(sql);
			this.saveData = false;
		}else if (this.saveData){
			this.saveData = false;
		}
	}catch(e)
	{
		alert("doAfterLoad: "+e);
	}
};
window.app_portal_master_fProduk2.prototype.doFileChange = function(sender, filename, allow, data)
{
	try{
		if (this.tmpFile !== ""){
			this.file = new util_file();								
			this.file.deleteFile(this.tmpFile);			
		}
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
		}else throw(data);
	}catch(e){
		alert("doFileChange: "+ e);
	}
};
window.app_portal_master_fProduk2.prototype.uploadFile = function(sender)
{
	if (this.tmpFile !== ""){
		var rootDir = this.file.getRootDir();
		var separator = rootDir.charAt(rootDir.length-1);
		this.file.copyFileTo(this.tmpFile,rootDir +this.folder +separator+this.filename,true);
		this.file.deleteFile(this.tmpFile);
		this.tmpFile = "";
	}
};
window.app_portal_master_fProduk2.prototype.doClose = function(sender)
{
	if (this.tmpFile !== ""){								
		this.file.deleteFile(this.tmpFile);
	}
};
