window.app_saku_sdm_master_fHRstatus = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_master_fHRstatus.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_master_fHRstatus";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Status Pegawai", 0);
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode Status");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(10);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(300);
		this.ed_nama.setCaption("Keterangan");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		
		this.bTampil = new portalui_button(this);
		this.bTampil.setTop(32);
		this.bTampil.setLeft(670);
		this.bTampil.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(54);
	    this.p1.setWidth(725);
	    this.p1.setHeight(410);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Master Status Pegawai');
		
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(720);
    	this.sg1.setHeight(385);
		this.sg1.setTag("8");
		this.sg1.setColTitle(["No","Kode Status","Keterangan"]);
		
		setTipeButton(tbSimpan);
		this.bShow.onClick.set(this, "showClick");
		this.bTampil.onClick.set(this, "tampilClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sdm_master_fHRstatus.extend(window.portalui_childForm);
window.app_saku_sdm_master_fHRstatus.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_saku_sdm_master_fHRstatus.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into hr_status2 (kode_status,nama,kode_lokkonsol)  values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.lokkonsol+"') ");
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
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add(" update hr_status2 set  "+
							" nama = '"+this.ed_nama.getText()+"' where kode_status='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from hr_status2 where kode_status='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_sdm_master_fHRstatus.prototype.showClick = function(sender)
{	
	if (this.ed_kode.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.kode_status,a.nama from hr_status2 a where a.kode_status = '"+this.ed_kode.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");
			if (data != undefined) 
			{
			  if  (data != "") 
			  {
				var field = data.split("\r\n");
				var field = field[1].split(";");
				
				this.ed_nama.setText(field[1]);
				setTipeButton(tbUbahHapus);
			  }
			  else
			{	
			  this.ed_nama.setText("");
			  setTipeButton(tbSimpan);
			}
			}
			else
			{	
			  this.ed_nama.setText("");
			  setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_sdm_master_fHRstatus.prototype.tampilClick = function(sender)
{
	this.sg1.clearAll();
	var temp = this.dbLib.runSQL("select kode_status,nama from hr_status2 where kode_lokkonsol = '"+this.lokkonsol+"'");
		
		if (temp instanceof portalui_arrayMap){
			this.sg1.setData(temp);
		}else alert(rs);
};
window.app_saku_sdm_master_fHRstatus.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Status Pegawai",sender,undefined, 
										  "select kode_status, nama  from hr_status2 where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_status) from hr_status2 where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_status","nama"),"and",new Array("Kode Status","Deskripsi"),false);
			this.ed_nama.setText("");
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_sdm_master_fHRstatus.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};