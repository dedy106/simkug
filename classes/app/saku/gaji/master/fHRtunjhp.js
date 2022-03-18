window.app_saku_gaji_master_fHRtunjhp = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_master_fHRtunjhp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_master_fHRtunjhp";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Bantuan Komunikasi", 0);
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setLabelWidth(100);		
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setCaption("Kode Jabatan");
		this.ed_kode.setText("");
		this.ed_kode.setRightLabelCaption("");
		this.ed_kode.setTag("2");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(210);
		this.bShow.setTop(10);
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		
		this.ed_hp = new portalui_saiLabelEdit(this);
		this.ed_hp.setLeft(20);
		this.ed_hp.setTop(32);
		this.ed_hp.setWidth(200);
		this.ed_hp.setReadOnly(false);
		this.ed_hp.setTipeText(ttNilai);
		this.ed_hp.setAlignment(alRight);
		this.ed_hp.setCaption("Handset");
		this.ed_hp.setText("0"); 
		
		this.ed_pulsa = new portalui_saiLabelEdit(this);
		this.ed_pulsa.setLeft(20);
		this.ed_pulsa.setTop(54);
		this.ed_pulsa.setWidth(200);
		this.ed_pulsa.setReadOnly(false);
		this.ed_pulsa.setTipeText(ttNilai);
		this.ed_pulsa.setAlignment(alRight);
		this.ed_pulsa.setCaption("Pulsa");
		this.ed_pulsa.setText("0"); 
	
		this.bTampil = new portalui_button(this);
		this.bTampil.setTop(54);
		this.bTampil.setLeft(670);
		this.bTampil.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(76);
	    this.p1.setWidth(725);
	    this.p1.setHeight(360);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Bantuan Komunikasi');
		
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(720);
    	this.sg1.setHeight(335);
		this.sg1.setTag("8");
		this.sg1.setColTitle(["No","Kode","Nama Jabatan","Handset","Pulsa"]);
		
		setTipeButton(tbAllFalse);
		this.bShow.onClick.set(this, "showClick");
		this.bTampil.onClick.set(this, "tampilClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
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
window.app_saku_gaji_master_fHRtunjhp.extend(window.portalui_childForm);
window.app_saku_gaji_master_fHRtunjhp.prototype.mainButtonClick = function(sender)
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
window.app_saku_gaji_master_fHRtunjhp.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
				setTipeButton(tbAllFalse);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				if (this.standarLib.checkEmptyByTag(this, new Array("0","2")))
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into hr_tunjhp (kode_jab,hp,pulsa,kode_lokkonsol)  values "+
								"('"+this.ed_kode.getText()+"','"+parseNilai(this.ed_hp.getText())+"','"+parseNilai(this.ed_pulsa.getText())+"','"+this.lokkonsol+"') ");
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk)
			{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add(" update hr_tunjhp set  "+
							" hp="+parseNilai(this.ed_hp.getText())+
							" , pulsa="+parseNilai(this.ed_pulsa.getText())+" where kode_jab='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from hr_tunjhp where kode_jab='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_gaji_master_fHRtunjhp.prototype.showClick = function(sender)
{	
	if (this.ed_kode.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.kode_jab,a.hp,a.pulsa "+
			                                "from hr_tunjhp a "+
											"where a.kode_jab = '"+this.ed_kode.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");
			if (data != undefined) 
			{
			  if  (data != "") 
			  {
				var field = data.split("\r\n");
				var field = field[1].split(";");
				this.ed_hp.setText(floatToNilai(parseFloat(field[1])));
				this.ed_pulsa.setText(floatToNilai(parseFloat(field[2])));
				setTipeButton(tbUbahHapus);
			  }
			  else
			{	
			  this.ed_hp.setText("0");
			  this.ed_pulsa.setText("0");
			  setTipeButton(tbSimpan);
			}
			}
			else
			{	
			  this.ed_hp.setText("0");
			  this.ed_pulsa.setText("0");
			  setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_gaji_master_fHRtunjhp.prototype.tampilClick = function(sender)
{
	this.sg1.clearAll();
	var temp = this.dbLib.runSQL("select a.kode_jab,b.nama,a.hp,a.pulsa "+
	                             "from hr_tunjhp a inner join hr_jabatan b on a.kode_jab=b.kode_jab and a.kode_lokkonsol = b.kode_lokkonsol "+
								 "where a.kode_lokkonsol = '"+this.lokkonsol+"' ");
		
		if (temp instanceof portalui_arrayMap){
			this.sg1.setData(temp);
		}else alert(rs);
};
window.app_saku_gaji_master_fHRtunjhp.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' ",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' ",
										  new Array("kode_jab","nama"),"and",new Array("Kode Jabatan","Deskripsi"),false);
			this.ed_hp.setText("0");
			this.ed_pulsa.setText("0");
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_gaji_master_fHRtunjhp.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};