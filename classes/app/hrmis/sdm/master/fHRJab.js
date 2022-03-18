window.app_hrmis_sdm_master_fHRJab = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_master_fHRJab.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_master_fHRJab";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Jabatan", 0);	

		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode Jabatan");
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
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		
		this.ed_desc = new portalui_saiCB(this);
		this.ed_desc.setTop(54);
		this.ed_desc.setLeft(20);
		this.ed_desc.setWidth(300);
		this.ed_desc.setReadOnly(true);
		this.ed_desc.setCaption("Keterangan");
		this.ed_desc.addItem(0,"FUNGSIONAL AKADEMIK");
		this.ed_desc.addItem(1,"FUNGSIONAL NON AKADEMIK");
		this.ed_desc.addItem(2,"STRUKTURAL AKADEMIK");
		this.ed_desc.addItem(3,"STRUKTURAL NON AKADEMIK");
		this.ed_desc.addItem(4,"NON STRUKTURAL / FUNGSIONAL");
		this.ed_desc.setLength(100);
		this.ed_desc.setTag("9");
		
		this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setTop(76);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setWidth(300);
		this.cb_jenis.setReadOnly(true);
		this.cb_jenis.setCaption("Jenis");
		this.cb_jenis.addItem(0,"FUNGSIONAL");
		this.cb_jenis.addItem(1,"STRUKTURAL");
		this.cb_jenis.setLength(100);
		this.cb_jenis.setTag("9");
		
		this.ed_tingkat = new portalui_saiLabelEdit(this,{bound:[20,98,300,20],caption:"Tingkat"});
		this.bTampil = new portalui_button(this);
		this.bTampil.setTop(98);
		this.bTampil.setLeft(670);
		this.bTampil.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(120);
	    this.p1.setWidth(725);
	    this.p1.setHeight(360);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Master Jabatan');
		
		uses("portalui_saiTable");
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(720);
    	this.sg1.setHeight(335);
		this.sg1.setTag("8");
		this.sg1.setColTitle(new Array("No","Kode","Nama","Keterangan","Jenis","Tingkat"));
		
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
			
			this.lokkonsol = this.app._lokKonsol;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_master_fHRJab.extend(window.portalui_childForm);
window.app_hrmis_sdm_master_fHRJab.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_master_fHRJab.prototype.doModalResult = function(event, modalResult)
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
					sql.add("insert into hr_jabatan (kode_jab,nama,keterangan,jenis,kode_lokkonsol, tingkat)  values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_desc.getText()+"','"+this.cb_jenis.getText()+"','"+this.lokkonsol+"','"+this.ed_tingkat.getText()+"') ");
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
					sql.add(" update hr_jabatan set  "+
							" nama = '"+this.ed_nama.getText()+"',keterangan='"+this.ed_desc.getText()+
							"', jenis = '"+this.cb_jenis.getText()+"' ,tingkat = '"+this.ed_tingkat.getText()+"' "+
							" where kode_jab='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from hr_jabatan where kode_jab='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_master_fHRJab.prototype.showClick = function(sender)
{	
	if (this.ed_kode.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.kode_jab,a.nama,a.keterangan,a.jenis, a.tingkat "+
			                                "from hr_jabatan a where a.kode_jab = '"+this.ed_kode.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");
			if (data != undefined) 
			{
			  if  (data != "") 
			  {
				var field = data.split("\r\n");
				var field = field[1].split(";");
				
				this.ed_nama.setText(field[1]);
				this.ed_desc.setText(field[2]);
				this.cb_jenis.setText(field[3].toUpperCase());
				this.ed_tingkat.setText(field[4]);
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
window.app_hrmis_sdm_master_fHRJab.prototype.tampilClick = function(sender)
{
	this.sg1.clearAll();
	var temp = this.dbLib.runSQL("select kode_jab,nama,keterangan,jenis,tingkat from hr_jabatan where kode_lokkonsol = '"+this.lokkonsol+"'");
		if (temp instanceof portalui_arrayMap){
			this.sg1.setData(temp);
		}else alert(rs);
};
window.app_hrmis_sdm_master_fHRJab.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_jab","nama"),"and",new Array("Kode Jabatan","Deskripsi"),false);
			this.ed_nama.setText("");
			this.ed_desc.setText("");
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_master_fHRJab.prototype.doRequestReady = function(sender, methodName, result)
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