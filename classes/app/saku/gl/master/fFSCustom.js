window.app_saku_gl_master_fFSCustom = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_master_fFSCustom.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_master_fFSCustom";
		this.setTop(60);
		this.maximize();
			
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Versi  Custom Report", 0);			
//------------------------------------------------------------------------
		uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar");
		this.elokasi = new portalui_saiCBBL(this,{bound:[20,10,150,20], caption:"Lokasi", multiSelection:false,
			sql:["select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",["kode_lokasi","nama"], false, ["Kode Lokasi","Nama"],"and","Daftar Lokasi",true]
		});				
		this.e0 = new portalui_saiCBBL(this,{bound:[20,11,200,20], caption:"Kode Klp", multiSelection:false, change:[this,"doEditChange"],
			sql:["select kode_fs, nama from fscustom where kode_lokasi ='"+this.app._lokasi+"' ",["kode_fs","nama"], false, ["Kode FS","Nama"], "and","Daftar FS",false]
		});				
		this.e1 = new portalui_saiLabelEdit(this,{bound:[20,12,400,20], caption:"Nama Klp"});		
		this.l1 = new portalui_label(this,{bound:[20,13,100,20], caption:"Periode Aktif", underline:true});			
		this.d1 = new portalui_datePicker(this,{bound:[120,13,100,18]});		
		this.l2 = new portalui_label(this,{bound:[225, 13, 20, 20], caption:"to"});				
		this.d2 = new portalui_datePicker(this,{bound:[240,13,100, 18]});		
		this.l2 = new portalui_label(this,{bound:[350,13,120,20], caption:"(optional)"});		
		this.l2.fnt.setItalics(true);					
		this.cb1 = new portalui_checkBox(this,{bound:[120,14,120,20],caption:"Status Aktif"});		
		
		setTipeButton(tbSimpan);
		this.rearrangeChild(20,23);
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gl_master_fFSCustom.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku_gl_master_fFSCustom.prototype.mainButtonClick = function(sender)
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
window.app_saku_gl_master_fFSCustom.prototype.doModalResult = function(event, modalResult)
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
					sql.add("insert into fscustom (kode_fs, nama,tgl_awal, tgl_akhir, flag_status, tgl_input,nik_user, kode_lokasi ) values ('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.d1.getDateString()+"','"+this.d2.getDateString()+"','"+status+"',now(),'"+this.app._userLog+"','"+this.elokasi.getText()+"' ) ");
					this.dbLib.execArraySQL(sql);	
				}catch(e){
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
					sql.add("update fscustom set nama = '"+this.e1.getText()+"',flag_status = '"+status+"',tgl_awal='"+this.d1.getDateString()+"',tgl_akhir='"+this.d2.getDateString()+"',tgl_input=now(),nik_user='"+this.app._userLog+"' where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
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
					var rs = this.dbLib.runSQL("select kode_fs from customreport where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
					if (rs instanceof portalui_arrayMap)
						if (rs.getTag1() != 0)
							throw("kode fs ini sudah terpakai. tidak dapat dihapus");
					sql.add("delete from  fscustom where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
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
window.app_saku_gl_master_fFSCustom.prototype.keyPress = function(sender, charCode, buttonState )
{
//	setTipeButton(tbSimpan);
};
window.app_saku_gl_master_fFSCustom.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{			
			var data = this.dbLib.runSQL("select * from fscustom where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
						
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
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}

};
window.app_saku_gl_master_fFSCustom.prototype.FindBtnClick = function(sender, event)
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
			this.standarLib.showListData(this, "Data Versi Custom Report",sender,this.e1, 
										  "select kode_fs, nama from fscustom where kode_lokasi = '"+this.elokasi.getText()+"' ","select count(*) from fscustom where kode_lokasi = '"+this.elokasi.getText()+"' ",
										  new Array("kode_fs","nama"),"and",new Array("Kode FS Custom","Nama"));
	}catch(e)
	{
		alert(e);
	}
};

window.app_saku_gl_master_fFSCustom.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)
					system.info(this,"Transaksi Sukses ("+ this.e0.getText()+")","");
				else system.alert(this, result,""); 
				break;
		}
	}
};
