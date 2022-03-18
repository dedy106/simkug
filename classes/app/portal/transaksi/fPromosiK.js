window.app_portal_transaksi_fPromosiK = function(owner)
{
  if (owner)
	{
		window.app_portal_transaksi_fPromosiK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fPromosiK";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Data Promosi/Diskon : Koreksi",0);
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(10);
		this.e0.setWidth(220);
		this.e0.setCaption("Kode Promosi");
		this.e0.setText("");
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption(" ");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(35);
		this.e1.setWidth(500);
		this.e1.setCaption("Keterangan");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setLeft(20);
		this.lTgl.setTop(60);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(18);
		this.lTgl.setUnderLine(true);
		this.lTgl.setCaption("Tanggal");
		uses("portalui_datePicker",true);
		this.dp_Tgl = new portalui_datePicker(this);
		this.dp_Tgl.setTop(60);
		this.dp_Tgl.setLeft(120);
		this.dp_Tgl.setWidth(82);		
		
		this.eProduk = new portalui_saiCBBL(this);
		this.eProduk.setLeft(20);
		this.eProduk.setTop(85);
		this.eProduk.setWidth(200);
		this.eProduk.setCaption("Produk");
		this.eProduk.setText("");
		this.eProduk.setRightLabelVisible(true);
		this.eProduk.onBtnClick.set(this,"FindBtnClick");
		this.eProduk.setReadOnly(false);
		
		this.eDiskon = new portalui_saiLabelEdit(this);
		this.eDiskon.setLeft(20);
		this.eDiskon.setTop(110);
		this.eDiskon.setWidth(200);
		this.eDiskon.setCaption("Diskon");
		this.eDiskon.setText("");		
		this.eDiskon.setTipeText(ttNilai);
		this.eDiskon.setReadOnly(false);
		
		
		this.lTgl1 = new portalui_label(this);
		this.lTgl1.setLeft(20);
		this.lTgl1.setTop(160);
		this.lTgl1.setWidth(100);
		this.lTgl1.setHeight(18);
		this.lTgl1.setUnderLine(true);
		this.lTgl1.setCaption("Tanggal Awal");
		this.dp_Awal = new portalui_datePicker(this);
		this.dp_Awal.setTop(160);
		this.dp_Awal.setLeft(120);
		this.dp_Awal.setWidth(82);		
		
		this.lTgl2 = new portalui_label(this);
		this.lTgl2.setLeft(20);
		this.lTgl2.setTop(185);
		this.lTgl2.setWidth(100);
		this.lTgl2.setHeight(18);
		this.lTgl2.setUnderLine(true);
		this.lTgl2.setCaption("Tanggal Akhir");
		this.dp_Akhir = new portalui_datePicker(this);
		this.dp_Akhir.setTop(185);
		this.dp_Akhir.setLeft(120);
		this.dp_Akhir.setWidth(82);		
		
		this.rearrangeChild(10,23);
		setTipeButton(tbUbahHapus);
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
			alert("[app_portal_transaksi_fPromosiK]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fPromosiK.extend(window.portalui_childForm);
window.app_portal_transaksi_fPromosiK.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fPromosiK.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);				
			}
		break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{				
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("update portal_promosi set  "+
						"	keterangan = '"+this.e1.getText()+"', "+
						"	tanggal = '"+this.dp_Tgl.getDate()+"', "+
						"	kode_produk = '"+this.eProduk.getText()+"', "+
						"	diskon = "+parseNilai(this.eDiskon.getText())+
						"	,tgl_mulai = '"+this.dp_Awal.getDate()+"', "+
						"	tgl_akhir = '"+this.dp_Akhir.getDate()+"' "+
						"	where kode_promosi = '"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList",true);					
					var sql = new server_util_arrayList();
					sql.add("delete from portal_promosi where kode_promosi='"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_transaksi_fPromosiK.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_transaksi_fPromosiK.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select a.*,b.nama as nmprdk,c.nama as nmdok "+
			"from portal_promosi a inner join portal_produk b on a.kode_produk=b.kode_produk "+
			"inner join portal_dokumen c on b.no_dok_file=c.no_dok_file "+
			"where a.kode_promosi = '"+this.e0.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("keterangan"));
					this.dp_Tgl.setDateString(data.get("tanggal"));
					this.eProduk.setText(data.get("kode_produk"));
					this.eProduk.setRightLabelCaption(data.get("nmprdk"));
					this.eDiskon.setText(floatToNilai(parseFloat(data.get("diskon"))));
					this.dp_Awal.setDateString(data.get("tgl_mulai"));
					this.dp_Akhir.setDateString(data.get("tgl_akhir"));
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fPromosiK.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Promosi",sender,undefined, 
										  "select kode_promosi, keterangan from portal_promosi where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_promosi where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_promosi","keterangan"],"where",["Kode","Keterangan"]);
		if (sender == this.eProduk)
			this.standarLib.showListData(this, "Data Produk",sender,undefined, 
										  "select kode_produk, nama from portal_produk where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_produk where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_produk","nama"],"where",["Kode Produk","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fPromosiK.prototype.doRequestReady = function(sender, methodName, result)
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