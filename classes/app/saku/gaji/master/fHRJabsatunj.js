window.app_saku_gaji_master_fHRJabsatunj = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_master_fHRJabsatunj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_master_fHRJabsatunj";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Tunjangan Jabatan Struktural Akademik", 0);
		
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
				
		this.cb_jabf = new portalui_saiCBBL(this);
		this.cb_jabf.setLeft(20);
		this.cb_jabf.setTop(32);
		this.cb_jabf.setWidth(185);
		this.cb_jabf.setLabelWidth(100);
		this.cb_jabf.setReadOnly(true);
		this.cb_jabf.setRightLabelVisible(false);
		this.cb_jabf.setCaption("Jabatan Fungsional");
		this.cb_jabf.setText("");
		this.cb_jabf.setRightLabelCaption("");
		this.cb_jabf.setTag("2");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(210);
		this.bShow.setTop(32);
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		
		this.ed_tunjjab = new portalui_saiLabelEdit(this);
		this.ed_tunjjab.setLeft(20);
		this.ed_tunjjab.setTop(54);
		this.ed_tunjjab.setWidth(220);
		this.ed_tunjjab.setReadOnly(false);
		this.ed_tunjjab.setTipeText(ttNilai);
		this.ed_tunjjab.setAlignment(alRight);
		this.ed_tunjjab.setCaption("Tarif Tunjangan");
		this.ed_tunjjab.setText("0");
		
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
	    this.p1.setCaption('Daftar Tarif Tunjangan Jabatan Struk. Akademik');
		
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(720);
    	this.sg1.setHeight(335);
		this.sg1.setTag("8");
		this.sg1.setColTitle(["No","Kode","Nama Jabatan Struk.","Kode Fung.","Nama Jab. Fung.","Tunj. Jabatan"]);
		
		setTipeButton(tbAllFalse);
		this.bShow.onClick.set(this, "showClick");
		this.bTampil.onClick.set(this, "tampilClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.cb_jabf.onBtnClick.set(this, "FindBtnClick");
		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			
			this.lokkonsol = this.app._lokKonsol;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gaji_master_fHRJabsatunj.extend(window.portalui_childForm);
window.app_saku_gaji_master_fHRJabsatunj.prototype.mainButtonClick = function(sender)
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
window.app_saku_gaji_master_fHRJabsatunj.prototype.doModalResult = function(event, modalResult)
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
						sql.add("insert into hr_tunjjabs (kode_jabs,kode_jabf,tunjjab,kode_lokkonsol)  values "+
								"('"+this.ed_kode.getText()+"','"+this.cb_jabf.getText()+"','"+parseNilai(this.ed_tunjjab.getText())+"','"+this.lokkonsol+"') ");
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
					sql.add(" update hr_tunjjabs set  "+
							" tunjjab="+parseNilai(this.ed_tunjjab.getText())+
							" where kode_jabs='"+this.ed_kode.getText()+"' and kode_jabf = '"+this.cb_jabf.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from hr_tunjjabs where kode_jabs='"+this.ed_kode.getText()+"' and kode_jabf = '"+this.cb_jabf.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_gaji_master_fHRJabsatunj.prototype.showClick = function(sender)
{	
	if (this.ed_kode.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.kode_jabs,a.kode_jabf,b.nama as nama_jab,a.tunjjab "+
			                                "from hr_tunjjabs a inner join hr_jabatan b on a.kode_jabf=b.kode_jab and a.kode_lokkonsol=b.kode_lokkonsol "+
											"where a.kode_jabs = '"+this.ed_kode.getText()+"' and a.kode_jabf = '"+this.cb_jabf.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");
			if (data != undefined) 
			{
			  if  (data != "") 
			  {
				var field = data.split("\r\n");
				var field = field[1].split(";");
				
				this.cb_jabf.setText(field[1].toUpperCase());
				this.cb_jabf.setRightLabelCaption(field[2]);
				this.ed_tunjjab.setText(floatToNilai(parseFloat(field[3])));
				setTipeButton(tbUbahHapus);
			  }
			  else
			{	
			  this.ed_tunjjab.setText("0");
			  setTipeButton(tbSimpan);
			}
			}
			else
			{	
			  this.ed_tunjjab.setText("0");
			  setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_gaji_master_fHRJabsatunj.prototype.tampilClick = function(sender)
{
	this.sg1.clearAll();
	var temp = this.dbLib.runSQL("select a.kode_jabs,b.nama,a.kode_jabf,c.nama as nama_jabf,a.tunjjab "+
	                             "from hr_tunjjabs a inner join hr_jabatan b on a.kode_jabs=b.kode_jab and a.kode_lokkonsol = b.kode_lokkonsol "+
								 "                   inner join hr_jabatan c on a.kode_jabf=c.kode_jab and a.kode_lokkonsol = c.kode_lokkonsol "+
								 "where a.kode_lokkonsol = '"+this.lokkonsol+"' ");
		
		if (temp instanceof portalui_arrayMap){
			this.sg1.setData(temp);
		}else alert(rs);
};
window.app_saku_gaji_master_fHRJabsatunj.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and keterangan = 'STRUKTURAL AKADEMIK'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and keterangan = 'STRUKTURAL AKADEMIK'",
										  new Array("kode_jab","nama"),"and",new Array("Kode Jabatan","Deskripsi"),false);
			this.cb_jabf.setText("");
		}
		if (sender == this.cb_jabf) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and keterangan = 'FUNGSIONAL AKADEMIK'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and keterangan = 'FUNGSIONAL AKADEMIK'",
										  new Array("kode_jab","nama"),"and",new Array("Kode Jabatan","Deskripsi"),false);
			this.cb_jabf.setText("");
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_gaji_master_fHRJabsatunj.prototype.doRequestReady = function(sender, methodName, result)
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