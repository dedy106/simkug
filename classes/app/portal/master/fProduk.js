window.app_portal_master_fProduk = function(owner)
{
  if (owner)
	{
		window.app_portal_master_fProduk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fProduk";
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
		
		this.eDeskShort = new portalui_saiLabelEdit(this);
		this.eDeskShort.setTop(1);
		this.eDeskShort.setLeft(440);
		this.eDeskShort.setWidth(550);
		this.eDeskShort.setCaption("Deskripsi Pendek");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(35);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");		
		this.e1.setReadOnly(false);
		/*
		uses("portalui_saiMemo");
		this.eDeskLong = new portalui_saiMemo(this);
		this.eDeskLong.setTop(35);
		this.eDeskLong.setLeft(450);
		this.eDeskLong.setWidth(350);
		this.eDeskLong.setHeight(90);
		this.eDeskLong.setCaption("Deskripsi Panjang");*/
		
		this.eKategori = new portalui_saiCBBL(this);
		this.eKategori.setLeft(20);
		this.eKategori.setTop(60);
		this.eKategori.setWidth(200);
		this.eKategori.setCaption("Kategori");
		this.eKategori.setRightLabelVisible(true);
		this.eKategori.onBtnClick.set(this, "FindBtnClick");		
		
		this.eModel = new portalui_saiLabelEdit(this);
		this.eModel.setLeft(20);
		this.eModel.setTop(85);
		this.eModel.setWidth(250);
		this.eModel.setCaption("Model");		
		
		this.eMerk = new portalui_saiCBBL(this);
		this.eMerk.setLeft(20);
		this.eMerk.setTop(110);
		this.eMerk.setWidth(200);
		this.eMerk.setCaption("Merk");
		this.eMerk.setRightLabelVisible(true);
		this.eMerk.onBtnClick.set(this, "FindBtnClick");		
		
		this.ePabrik = new portalui_saiCBBL(this);
		this.ePabrik.setLeft(20);
		this.ePabrik.setTop(135);
		this.ePabrik.setWidth(200);
		this.ePabrik.setCaption("Pabrik");
		this.ePabrik.setRightLabelVisible(true);
		this.ePabrik.onBtnClick.set(this, "FindBtnClick");
		
		this.eWarna = new portalui_saiLabelEdit(this);
		this.eWarna.setLeft(20);
		this.eWarna.setTop(160);
		this.eWarna.setWidth(200);
		this.eWarna.setCaption("Warna");
		
		this.eBerat = new portalui_saiLabelEdit(this);
		this.eBerat.setLeft(20);
		this.eBerat.setTop(185);
		this.eBerat.setWidth(200);
		this.eBerat.setCaption("Berat");
		
		this.eHarga = new portalui_saiLabelEdit(this);
		this.eHarga.setLeft(20);
		this.eHarga.setTop(210);
		this.eHarga.setWidth(200);
		this.eHarga.setTipeText(ttNilai);
		this.eHarga.setAlignment(alRight);
		this.eHarga.setCaption("Harga");
		
		this.eHargaSpec = new portalui_saiLabelEdit(this);
		this.eHargaSpec.setTop(235);
		this.eHargaSpec.setLeft(20);
		this.eHargaSpec.setWidth(200);
		this.eHargaSpec.setTipeText(ttNilai);
		this.eHargaSpec.setAlignment(alRight);
		this.eHargaSpec.setCaption("Harga Special");
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setLeft(20);
		this.lTgl.setTop(265);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(18);
		this.lTgl.setUnderLine(true);
		this.lTgl.setCaption("Tgl. Mulai Special");
		uses("portalui_datePicker",true);
		this.dp_mspec = new portalui_datePicker(this);
		this.dp_mspec.setTop(265);
		this.dp_mspec.setLeft(120);
		this.dp_mspec.setWidth(82);
		
		this.lTgl2 = new portalui_label(this);
		this.lTgl2.setLeft(20);
		this.lTgl2.setTop(285);
		this.lTgl2.setWidth(100);
		this.lTgl2.setHeight(18);
		this.lTgl2.setUnderLine(true);
		this.lTgl2.setCaption("Tgl. Akhir Special");
		this.dp_aspec = new portalui_datePicker(this);
		this.dp_aspec.setTop(285);
		this.dp_aspec.setLeft(120);
		this.dp_aspec.setWidth(82);
		
		this.satuan = new portalui_saiCB(this);
		this.satuan.setTop(290);
		this.satuan.setLeft(20);
		this.satuan.setWidth(200);
		this.satuan.setCaption("Satuan");
		this.satuan.addItem(0,"PCS");
		this.satuan.addItem(1,"SET");
		this.satuan.setLength(100);
		this.satuan.setTag("9");
		
		this.eStok = new portalui_saiLabelEdit(this);
		this.eStok.setTop(291);
		this.eStok.setLeft(20);
		this.eStok.setWidth(150);
		this.eStok.setCaption("Stok");
		
		this.eStokState = new portalui_saiCB(this);
		this.eStokState.setTop(292);
		this.eStokState.setLeft(20);
		this.eStokState.setWidth(200);
		this.eStokState.setCaption("Status Stok");
		this.eStokState.addItem(0,"Ada");
		this.eStokState.addItem(1,"Kosong");
		this.eStokState.setLength(100);
		this.eStokState.setTag("9");
		
		this.eState = new portalui_saiLabelEdit(this);
		this.eState.setTop(293);
		this.eState.setLeft(20);
		this.eState.setWidth(150);
		this.eState.setCaption("Status");
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setLeft(20);
		this.lTgl.setTop(294);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(18);
		this.lTgl.setUnderLine(true);
		this.lTgl.setCaption("Tgl. Awal");
		this.dp_awal = new portalui_datePicker(this);
		this.dp_awal.setTop(294);
		this.dp_awal.setLeft(120);
		this.dp_awal.setWidth(82);
		
		this.lTgl2 = new portalui_label(this);
		this.lTgl2.setLeft(20);
		this.lTgl2.setTop(295);
		this.lTgl2.setWidth(100);
		this.lTgl2.setHeight(18);
		this.lTgl2.setUnderLine(true);
		this.lTgl2.setCaption("Tgl. Selesai");	
		this.dpSelesai = new portalui_datePicker(this);
		this.dpSelesai.setTop(295);
		this.dpSelesai.setLeft(120);
		this.dpSelesai.setWidth(82);
		
		this.rearrangeChild(10,23);
		
		this.uploader = new portalui_saiCBBL(this);
		this.uploader.setTop(33);
		this.uploader.setWidth(210);		
		this.uploader.setLeft(440);
		this.uploader.setCaption("Gambar");
		this.uploader.setRightLabelVisible(true);
		this.uploader.onBtnClick.set(this,"FindBtnClick");
		
		uses("portalui_checkBox",true);
		this.cbSlide = new portalui_checkBox(this);
		this.cbSlide.setTop(56);
		this.cbSlide.setLeft(440);
		this.cbSlide.setWidth(80);
		this.cbSlide.setCaption("Status Slide");
		
		this.cbFront = new portalui_checkBox(this);
		this.cbFront.setTop(56);
		this.cbFront.setLeft(550);
		this.cbFront.setWidth(80);
		this.cbFront.setCaption("Status Front");
		
		uses("portalui_pageControl",true);
		uses("portalui_childPage",true);
		this.pControl = new portalui_pageControl(this);
		this.pControl.setBGColor(system.getConfig("form.color"));
		this.pControl.setTop(75);
		this.pControl.setWidth(550);
		this.pControl.setHeight(295);
		this.pControl.setLeft(440);
		
			this.page1 = new portalui_childPage(this.pControl);
			this.page1.setCaption("Deskripsi");
			this.page2 = new portalui_childPage(this.pControl);
			this.page2.setCaption("Spesifikasi");
			this.page3 = new portalui_childPage(this.pControl);
			this.page3.setCaption("Fitur");
			this.page4 = new portalui_childPage(this.pControl);
			this.page4.setCaption("Angsuran");
			
			uses("portalui_richTextArea",true);
			this.desk = new portalui_richTextArea(this.page1);
			this.desk.setTop(0);
			this.desk.setLeft(0);
			this.desk.setWidth(548);
			this.desk.setHeight(293);
			this.desk.display();
			
			this.spec = new portalui_richTextArea(this.page2);
			this.spec.setTop(0);
			this.spec.setLeft(0);
			this.spec.setWidth(548);
			this.spec.setHeight(293);
			this.spec.display();
			
			this.ftur = new portalui_richTextArea(this.page3);
			this.ftur.setTop(0);
			this.ftur.setLeft(0);
			this.ftur.setWidth(548);
			this.ftur.setHeight(293);
			this.ftur.display();
			
			this.angs = new portalui_richTextArea(this.page4);
			this.angs.setTop(0);
			this.angs.setLeft(0);
			this.angs.setWidth(548);
			this.angs.setHeight(293);
			this.angs.display();
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar",true);
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_portal_master_fProduk]->constructor : "+e);
		}
	}
};
window.app_portal_master_fProduk.extend(window.portalui_childForm);
window.app_portal_master_fProduk.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fProduk.prototype.doModalResult = function(event, modalResult)
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
				this.spec.setText("");
				this.ftur.setText("");
				this.angs.setText("");
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
							"warna, berat, harga, harga_special, tgl_mulai_special, tgl_akhir_special, desk_pendek, desk_panjang, stok, status_stok, status, tgl_awal, tgl_selesai, no_dok_file,status_slide,status_front,satuan,spesifikasi,angsuran,fitur) values  "+
							"('"+this.e0.getText()+"','"+this.eKategori.getText()+"','"+this.e1.getText()+"','"+this.app._lokasi+"','"+(new Date).getDateStr()+"','"+this.app._userLog+"','"+this.eModel.getText()+"','"+this.eMerk.getText()+"','"+this.ePabrik.getText()+"' "+
							"	,'"+this.eWarna.getText()+"','"+this.eBerat.getText()+"','"+parseNilai(this.eHarga.getText())+"','"+parseNilai(this.eHargaSpec.getText())+"' "+
							"	,'"+this.dp_mspec.getDateString()+"','"+this.dp_aspec.getDateString()+"','"+this.eDeskShort.getText()+"','"+this.desk.getText(2)+"','"+this.eStok.getText()+"' "+
							" 	,'"+this.eStokState.getText()+"','"+this.eState.getText()+"','"+this.dp_awal.getDateString()+"','"+this.dpSelesai.getDateString()+"','"+this.uploader.getText()+"','"+(this.cbSlide.selected ? '1':'0')+"','"+(this.cbFront.selected ? '1':'0')+"','"+this.satuan.getText()+"','"+this.spec.getText(2)+"','"+this.angs.getText(2)+"','"+this.ftur.getText(2)+"') ");
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
window.app_portal_master_fProduk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.uploader)
			this.standarLib.showListData(this, "Data File",sender,undefined, 
										  "select no_dok_file, nama from portal_dokumen","select count(*) from portal_dokumen",
										  ["no_dok_file","nama"],"where",["Kode","Nama"]);
		if (sender == this.eKategori)
			this.standarLib.showListData(this, "Data Kategori",sender,undefined, 
										  "select kode_kategori, nama from portal_kategori where tipe='posting' ",
										  "select count(*) from portal_kategori where tipe='posting' ",
										  ["kode_kategori","nama"],"where",["Kode","Nama"]);
		if (sender == this.eMerk)
			this.standarLib.showListData(this, "Data Merk",sender,undefined, 
										  "select kode_merk, nama from portal_merk ",
										  "select count(*) from portal_merk ",
										  ["kode_merk","nama"],"where",["Kode","Nama"]);
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
window.app_portal_master_fProduk.prototype.doRequestReady = function(sender, methodName, result)
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