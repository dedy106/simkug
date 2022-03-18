window.app_portal_master_fProdukK2 = function(owner)
{
  if (owner)
	{
		window.app_portal_master_fProdukK2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fProdukK2";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Produk : Koreksi", 0);	
		
		uses("portalui_saiCBBL",true);
		this.eKategori = new portalui_saiCBBL(this);
		this.eKategori.setLeft(20);
		this.eKategori.setTop(1);
		this.eKategori.setWidth(200);
		this.eKategori.setCaption("Kategori");
		this.eKategori.setReadOnly(true);
		this.eKategori.setRightLabelVisible(true);
		this.eKategori.onBtnClick.set(this, "FindBtnClick");
		
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(2);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode Produk");		
		this.e0.setReadOnly(true);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");		
		this.e0.setRightLabelVisible(false);
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(35);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");		
		this.e1.setReadOnly(false);
		
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
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			uses("util_file",true);
			this.filename = "";
			this.tmpFile = "";
			this.saveData = false;
			this.file = new util_file();
			this.file.addListener(this);
		}catch(e)
		{
			alert("[app_portal_master_fProdukK2]->constructor : "+e);
		}
	}
};
window.app_portal_master_fProdukK2.extend(window.portalui_childForm);
window.app_portal_master_fProdukK2.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fProdukK2.prototype.doModalResult = function(event, modalResult)
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
		case "ubah" :
			if (modalResult == mrOk)
			{				
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("update portal_produk set  "+
						"	kode_kategori = '"+this.eKategori.getText()+"' "+
						"	, nama = '"+this.e1.getText()+"' "+
						"	, kode_pabrik = '"+this.ePabrik.getText()+"'  "+
						"	, harga = '"+parseNilai(this.eHarga.getText())+"'  "+
						"	, desk_panjang = '"+this.desk.getText(2)+"' "+
						"	, no_file = '"+this.e02.getText()+
						"',status_slide='"+(this.cbSlide.selected ? '1':'0')+
						"',status_front='"+(this.cbFront.selected ? '1':'0')+
						"',satuan='"+this.satuan.getText()+
						"' where kode_produk = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("insert into portal_file(no_file, nama,  tanggal,folder, tipe,size, ext,kode_lokasi) values "+
							" ('"+this.filename+"','"+this.filename+"','"+(new Date).sqlDateStr(this.tgl)+"','"+this.folder+"','"+this.tipe+
								"','"+this.size+"','"+this.ext+"','"+this.app._lokasi+"') ");
				this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from portal_produk where kode_produk='"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_master_fProdukK2.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_master_fProdukK2.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select a.kode_produk,a.nama,a.kode_pabrik,a.kode_kategori,b.nama as nmktgr,c.nama as nmpabrik,a.harga,a.satuan,a.no_file,a.desk_panjang,a.status_slide,a.status_front "+
			            " from portal_produk a "+
						"	left outer join portal_kategori b on b.kode_kategori = a.kode_kategori "+
						"	left outer join portal_pabrik c on a.kode_pabrik = c.kode_pabrik "+
						"	where a.kode_produk = '"+this.e0.getText()+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("nama"));
					this.eKategori.setText(data.get("kode_kategori"));
					this.eKategori.setRightLabelCaption(data.get("nmktgr"));
					this.ePabrik.setText(data.get("kode_pabrik"));
					this.ePabrik.setRightLabelCaption(data.get("nmpabrik"));
					this.eHarga.setText(floatToNilai(parseFloat(data.get("harga")))); 
					this.satuan.setText(data.get("satuan"));
					this.e02.setText(data.get("no_file"));
					this.cbSlide.setSelected((data.get("status_slide") == 1 ? true:false));
					this.cbFront.setSelected((data.get("status_front") == 1 ? true:false));
					this.desk.setText(data.get("desk_panjang"));
					
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_master_fProdukK2.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Barang",sender,this.e1, 
										  "select kode_produk, nama from portal_produk where kode_kategori='"+this.eKategori.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_produk where kode_kategori='"+this.eKategori.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_produk","nama"],"where",["Kode","Nama"]);
		if (sender == this.uploader)
			this.standarLib.showListData(this, "Data Gambar",sender,undefined, 
										  "select no_dok_file, nama from portal_dokumen where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_dokumen where kode_lokasi='"+this.app._lokasi+"'",
										  ["no_dok_file","nama"],"where",["Kode","Nama"]);
		if (sender == this.eKategori)
			this.standarLib.showListData(this, "Data Kategori",sender,undefined, 
										  "select kode_kategori, nama from portal_kategori where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_kategori where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_kategori","nama"],"and",["Kode","Nama"]);
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
window.app_portal_master_fProdukK2.prototype.doRequestReady = function(sender, methodName, result)
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

window.app_portal_master_fProdukK2.prototype.doAfterLoad = function(sender, result, data)
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
window.app_portal_master_fProdukK2.prototype.doFileChange = function(sender, filename, allow, data)
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
window.app_portal_master_fProdukK2.prototype.uploadFile = function(sender)
{
	if (this.tmpFile !== ""){
		var rootDir = this.file.getRootDir();
		var separator = rootDir.charAt(rootDir.length-1);
		this.file.copyFileTo(this.tmpFile,rootDir +this.folder +separator+this.filename,true);
		this.file.deleteFile(this.tmpFile);
		this.tmpFile = "";
	}
};
window.app_portal_master_fProdukK2.prototype.doClose = function(sender)
{
	if (this.tmpFile !== ""){								
		this.file.deleteFile(this.tmpFile);
	}
};
