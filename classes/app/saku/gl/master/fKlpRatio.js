window.app_saku_gl_master_fKlpRatio = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_master_fKlpRatio.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_master_fKlpRatio";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Versi Cash Flow", 0);	
		
//------------------------------------------------------------------------
		uses("portalui_saiCBBL");
		this.elokasi = new portalui_saiCBBL(this);
		this.elokasi.setTop(20);
		this.elokasi.setLeft(20);
		this.elokasi.setWidth(150);
		this.elokasi.setCaption("Lokasi");
		this.elokasi.onBtnClick.set(this,"FindBtnClick");		
		
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(45);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode Klp");
		this.e0.setText("");
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100)
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption(" ");

		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(70);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama Klp");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
		this.l1 = new portalui_label(this);
		this.l1.setTop(95);
		this.l1.setWidth(100);
		this.l1.setLeft(20);
		this.l1.setCaption("Periode Aktif");
		this.l1.setUnderLine(true);
		
		uses("portalui_datePicker");
		this.d1 = new portalui_datePicker(this);
		this.d1.setTop(97);
		this.d1.setLeft(120);
		this.d1.setWidth(100);
		
		this.l2 = new portalui_label(this);
		this.l2.setTop(95);
		this.l2.setWidth(20);
		this.l2.setLeft(225);
		this.l2.setCaption("to");
		
		this.d2 = new portalui_datePicker(this);
		this.d2.setTop(97);
		this.d2.setLeft(240);
		this.d2.setWidth(100);
		
		this.l2 = new portalui_label(this);
		this.l2.setTop(95);
		this.l2.setWidth(120);
		this.l2.setLeft(350);
		this.l2.setCaption("(optional)");
		this.l2.fnt.setItalics(true);		
		
		uses("portalui_checkBox");
		this.cb1 = new portalui_checkBox(this);
		this.cb1.setTop(120);
		this.cb1.setLeft(120);
		this.cb1.setWidth(120);
		this.cb1.setCaption("status Aktif");
				
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_gl_master_fKlpRatio.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku_gl_master_fKlpRatio.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
};
window.app_saku_gl_master_fKlpRatio.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.e0.setText("");
				this.e0.setRightLabelCaption("");
				this.e1.setText("");				
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					var status  = '0';
					if (this.cb1.isSelected())
						status = '1';
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into klp_rasio (klp_rasio, nama,tgl_awal, tgl_akhir, flag_status, tgl_input,nik_user, kode_lokasi ) values ('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.d1.getDate()+"','"+this.d2.getDate()+"','"+status+"','"+(new Date).getDateStr()+"','"+this.app._userLog+"','"+this.elokasi.getText()+"' ) ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk)
			{
				try
				{
					var status  = '0';
					if (this.cb1.isSelected())
						status = '1';
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("update klp_rasio set nama = '"+this.e1.getText()+"',flag_status = '"+status+"',tgl_awal='"+this.d1.getDate()+"',tgl_akhir='"+this.d2.getDate()+"',tgl_input='"+(new Date).getDateStr()+"',nik_user='"+this.app._userLog+"' where klp_rasio = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
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
			    try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					var rs = this.dbLib.runSQL("select klp_rasio from rasio_m where klp_rasio = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
					if (rs instanceof portalui_arrayMap)
						if (rs.getTag1() != 0)
							throw("kode fs ini sudah terpakai. tidak dapat dihapus");
					sql.add("delete from  klp_rasio where klp_rasio = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
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
window.app_saku_gl_master_fKlpRatio.prototype.keyPress = function(sender, charCode, buttonState )
{
//	setTipeButton(tbSimpan);
};
window.app_saku_gl_master_fKlpRatio.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{			
			var data = this.dbLib.runSQL("select * from klp_rasio where klp_rasio = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
						
			if (data instanceof portalui_arrayMap)
			{				
				if (data.get(0) != undefined){
					this.e1.setText(data.get(0).get("nama"));
					this.e0.setRightLabelCaption(data.get(0).get("nama"));
					this.cb1.setSelected(data[4] == '1'?true:false);								
					this.d1.setDateString(data.get(0).get("tgl_awal"));				
					this.d2.setDateString(data.get(0).get("tgl_akhir"));
					setTipeButton(tbUbahHapus);
				}else setTipeButton(tbSimpan);
			}else
			{
				setTipeButton(tbSimpan);
			}
		}catch(e){
			system.alert(this, e,"");
		}
	}

};
window.app_saku_gl_master_fKlpRatio.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.elokasi){
			var lokasi = this.app._lokasi;
			if (this.app._userStatus == "A") lokasi = "%";
			this.standarLib.showListData(this, "Data Lokasi",sender,undefined, 
										  "select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"'","select count(*) from lokasi where kode_lokasi like '"+lokasi+"'",
										  new Array("kode_lokasi","nama"),"and",new Array("Kode Lokasi","Nama"));
		}if (sender == this.e0)
			this.standarLib.showListData(this, "Data Versi Cash Flow",sender,this.e1, 
										  "select klp_rasio, nama from klp_rasio where kode_lokasi = '"+this.elokasi.getText()+"' ",
										  "select count(*) from klp_rasio where kode_lokasi = '"+this.elokasi.getText()+"' ",
										  new Array("klp_rasio","nama"),"and",new Array("Kode FS Custom","Nama"));
	}catch(e){
		alert(e);
	}
};

window.app_saku_gl_master_fKlpRatio.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
				else this.app._mainForm.pesan(0, result); 
				break;
		}
	}
};