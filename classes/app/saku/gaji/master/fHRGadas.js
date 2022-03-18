window.app_saku_gaji_master_fHRGadas = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_master_fHRGadas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_master_fHRGadas";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Gaji Dasar berdasarkan Pangkal Tingkat", 0);
		
		this.cb_pangti = new portalui_saiCB(this);
		this.cb_pangti.setLeft(20);
		this.cb_pangti.setTop(10);
		this.cb_pangti.setWidth(185);
		this.cb_pangti.setMustCheck(false);
		this.cb_pangti.setCaption("Pangkal Tingkat");
		this.cb_pangti.setText("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(210);
		this.bShow.setTop(10);
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
				
		this.ed_tarif = new portalui_saiLabelEdit(this);
		this.ed_tarif.setLeft(20);
		this.ed_tarif.setTop(32);
		this.ed_tarif.setWidth(200);
		this.ed_tarif.setReadOnly(false);
		this.ed_tarif.setTipeText(ttNilai);
		this.ed_tarif.setAlignment(alRight);
		this.ed_tarif.setCaption("Tarif");
		this.ed_tarif.setText("0");
		
		this.bTampil = new portalui_button(this);
		this.bTampil.setTop(32);
		this.bTampil.setLeft(670);
		this.bTampil.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(54);
	    this.p1.setWidth(725);
	    this.p1.setHeight(360);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Tarif Tunjangan Transport');
		
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(720);
    	this.sg1.setHeight(335);
		this.sg1.setTag("8");
		this.sg1.setColTitle(["No","PangTi","Tarif"]);
		
		setTipeButton(tbAllFalse);
		this.bShow.onClick.set(this, "showClick");
		this.bTampil.onClick.set(this, "tampilClick");
		
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
			
			var val = this.dbLib.loadQuery("select distinct pangti from hr_gadaspangkal where kode_lokkonsol='"+this.lokkonsol+"'");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
			for (var j in val)
			{
				if (j>0)
				{                   
					var isi = val[j].split(";");             
					this.cb_pangti.addItem(j,val[j].split(";"));
				}
			}
		
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gaji_master_fHRGadas.extend(window.portalui_childForm);
window.app_saku_gaji_master_fHRGadas.prototype.mainButtonClick = function(sender)
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
window.app_saku_gaji_master_fHRGadas.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.cb_pangti);				
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
						sql.add("insert into hr_gadaspangkal (pangti,tarif,kode_lokkonsol)  values "+
								"('"+this.cb_pangti.getText()+"','"+parseNilai(this.ed_tarif.getText())+"','"+this.lokkonsol+"') ");
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
					sql.add(" update hr_gadaspangkal set  "+
							" tarif="+parseNilai(this.ed_tarif.getText())+
							" where pangti='"+this.cb_pangti.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from hr_gadaspangkal where pangti='"+this.cb_pangti.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_gaji_master_fHRGadas.prototype.showClick = function(sender)
{	
	if (this.cb_pangti.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.pangti,a.tarif "+
			                                "from hr_gadaspangkal a "+
											"where a.pangti = '"+this.cb_pangti.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");
			if (data != undefined) 
			{
			  if  (data != "") 
			  {
				var field = data.split("\r\n");
				var field = field[1].split(";");
				this.ed_tarif.setText(floatToNilai(parseFloat(field[1])));
				setTipeButton(tbUbahHapus);
			  }
			  else
			{	
			  this.ed_tarif.setText("0");
			  setTipeButton(tbSimpan);
			}
			}
			else
			{	
			  this.ed_tarif.setText("0");
			  setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_gaji_master_fHRGadas.prototype.tampilClick = function(sender)
{
	this.sg1.clearAll();
	var temp = this.dbLib.runSQL("select a.pangti,a.tarif "+
	                             "from hr_gadaspangkal a "+
								 "where a.kode_lokkonsol = '"+this.lokkonsol+"' ");
		
		if (temp instanceof portalui_arrayMap){
			this.sg1.setData(temp);
		}else alert(rs);
};
window.app_saku_gaji_master_fHRGadas.prototype.doRequestReady = function(sender, methodName, result)
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