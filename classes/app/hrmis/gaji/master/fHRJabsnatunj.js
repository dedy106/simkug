window.app_hrmis_gaji_master_fHRJabsnatunj = function(owner)
{
	if (owner)
	{
		window.app_hrmis_gaji_master_fHRJabsnatunj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_gaji_master_fHRJabsnatunj";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Tunjangan Jabatan Struktural Non Akademik", 0);
		
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
				
		this.ed_tunjjab = new portalui_saiLabelEdit(this);
		this.ed_tunjjab.setLeft(20);
		this.ed_tunjjab.setTop(32);
		this.ed_tunjjab.setWidth(220);
		this.ed_tunjjab.setReadOnly(false);
		this.ed_tunjjab.setTipeText(ttNilai);
		this.ed_tunjjab.setAlignment(alRight);
		this.ed_tunjjab.setCaption("Tarif Tunjangan");
		this.ed_tunjjab.setText("0"); 
	
		//this.ed_tingkat = new portalui_saiLabelEdit(this,{bound:[20,55,220,20],tipeText:ttNilai, caption:"Tingkat"});
		this.bTampil = new portalui_button(this);
		this.bTampil.setTop(32);
		this.bTampil.setLeft(670);
		this.bTampil.setCaption("Tampil");
		
		this.p1 = new portalui_panel(this);
		this.p1.setLeft(20);
		this.p1.setTop(56);
		this.p1.setWidth(725);
		this.p1.setHeight(360);
		this.p1.setName('p1');
		this.p1.setCaption('Daftar Tarif Tunjangan Jabatan Struk. Non Akademik');
		
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(720);
    	this.sg1.setHeight(335);
		this.sg1.setTag("8");
		this.sg1.setColTitle(["No","Kode","Nama Jabatan Struk.","Tunj. Jabatan"]);
		
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
			
			this.lokkonsol = this.app._lokKonsol;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_gaji_master_fHRJabsnatunj.extend(window.portalui_childForm);
window.app_hrmis_gaji_master_fHRJabsnatunj.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_gaji_master_fHRJabsnatunj.prototype.doModalResult = function(event, modalResult)
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
						sql.add("insert into hr_tunjjabsna (kode_jabs,tunjjab,kode_lokkonsol)  values "+
								"('"+this.ed_kode.getText()+"','"+parseNilai(this.ed_tunjjab.getText())+"','"+this.lokkonsol+"' ) ");
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
					sql.add(" update hr_tunjjabsna set  "+
							" tunjjab="+parseNilai(this.ed_tunjjab.getText())+
							//" , tingkat = '"+this.ed_tingkat.getText()+"' "+
							" where kode_jabs='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from hr_tunjjabsna where kode_jabs='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_gaji_master_fHRJabsnatunj.prototype.showClick = function(sender)
{	
	if (this.ed_kode.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.kode_jabs,a.tunjjab "+//,a.tingkat 
			                                "from hr_tunjjabsna a "+
											"where a.kode_jabs = '"+this.ed_kode.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");			
			if (data != undefined) 
			{
			  if  (data != "") 
			  {
				var field = data.split("\r\n");
				var field = field[1].split(";");				
				this.ed_tunjjab.setText(floatToNilai(parseFloat(field[1])));
				//this.ed_tingkat.setText(field[2]);
				setTipeButton(tbUbahHapus);
			  } else{	
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
window.app_hrmis_gaji_master_fHRJabsnatunj.prototype.tampilClick = function(sender)
{
	this.sg1.clearAll();
	var temp = this.dbLib.runSQL("select a.kode_jabs,b.nama,a.tunjjab   "+//,a.tingkat 
	                             "from hr_tunjjabsna a inner join hr_jabatan b on a.kode_jabs=b.kode_jab and a.kode_lokkonsol = b.kode_lokkonsol "+
								 "where a.kode_lokkonsol = '"+this.lokkonsol+"' ");
		
		if (temp instanceof portalui_arrayMap){
			this.sg1.setData(temp);
		}else alert(rs);
};
window.app_hrmis_gaji_master_fHRJabsnatunj.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and keterangan = 'STRUKTURAL NON AKADEMIK'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and keterangan = 'STRUKTURAL NON AKADEMIK'",
										  new Array("kode_jab","nama"),"and",new Array("Kode Jabatan","Deskripsi"),false);
			this.ed_tunjjab.setText("0");
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_gaji_master_fHRJabsnatunj.prototype.doRequestReady = function(sender, methodName, result)
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