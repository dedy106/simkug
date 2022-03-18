window.app_portal_transaksi_fPromosi = function(owner)
{
  if (owner)
	{
		window.app_portal_transaksi_fPromosi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fPromosi";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Promosi/Diskon : Input/Koreksi", 0);
		
		this.ed_periode = new portalui_saiLabelEdit(this);
		this.ed_periode.setLeft(20);
		this.ed_periode.setTop(1);
		this.ed_periode.setWidth(182);
		this.ed_periode.setCaption("Periode");		
		this.ed_periode.setReadOnly(true);
		this.ed_periode.setTag("9");
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setLeft(20);
		this.lTgl.setTop(2);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(18);
		this.lTgl.setUnderLine(true);
		this.lTgl.setCaption("Tanggal");
		uses("portalui_datePicker",true);
		this.dp_Tgl = new portalui_datePicker(this);
		this.dp_Tgl.setTop(2);
		this.dp_Tgl.setLeft(120);
		this.dp_Tgl.setWidth(82);
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(3);
		this.e0.setWidth(250);
		this.e0.setCaption("No. Promosi");		
		this.e0.setReadOnly(false);
		this.e0.setBtnVisible(false);
		this.e0.setRightLabelVisible(false);
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(265);
		this.bGen.setTop(3);
		this.bGen.setCaption("Generate");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		this.bGen.onClick.set(this,"doGen");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(35);
		this.e1.setWidth(500);
		this.e1.setCaption("Keterangan");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
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
		setTipeButton(tbSimpan);
		this.dp_Tgl.onSelect.set(this, "doSelect");
		this.doSelect(this.dp_Tgl,this.dp_Tgl.year,this.dp_Tgl.month,this.dp_Tgl.day);
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
			alert("[app_portal_transaksi_fPromosi]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fPromosi.extend(window.portalui_childForm);
window.app_portal_transaksi_fPromosi.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fPromosi.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_periode.setText(year.toString()+month);
};
window.app_portal_transaksi_fPromosi.prototype.doGen = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_promosi", "kode_promosi", "PRM/"+this.ed_periode.getText()+"/","0000"));	
};
window.app_portal_transaksi_fPromosi.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("insert into portal_promosi (kode_promosi, keterangan, tanggal, kode_produk, diskon,  tgl_mulai, tgl_akhir, nik_user, tgl_input,kode_lokasi) values  "+
							"('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.dp_Tgl.getDate()+"','"+this.eProduk.getText()+"','"+parseNilai(this.eDiskon.getText())+"' "+
							",'"+this.dp_Awal.getDate()+"','"+this.dp_Akhir.getDate()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"') ");
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
window.app_portal_transaksi_fPromosi.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_transaksi_fPromosi.prototype.FindBtnClick = function(sender, event)
{
	try
	{
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
window.app_portal_transaksi_fPromosi.prototype.doRequestReady = function(sender, methodName, result)
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