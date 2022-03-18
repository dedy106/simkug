window.app_portal_master_fCabang = function(owner)
{
  if (owner)
	{
		window.app_portal_master_fCabang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fCabang";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Cabang : Input/Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_checkBox",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(10);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode");
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
		this.e1.setTop(33);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
		this.el = new portalui_label(this);
		this.el.setLeft(20);
		this.el.setTop(56);
		this.el.setWidth(100);
		this.el.setUnderLine(true);
		this.el.setCaption("Lokasi");
		this.cbaktif = new portalui_checkBox(this);
		this.cbaktif.setTop(60);
		this.cbaktif.setLeft(120);
		this.cbaktif.setWidth(80);
		this.cbaktif.setCaption("Di Jawa");
		
		setTipeButton(tbSimpan);
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
			alert("[app_portal_master_fCabang]->constructor : "+e);
		}
	}
};
window.app_portal_master_fCabang.extend(window.portalui_childForm);
window.app_portal_master_fCabang.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fCabang.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);
				setTipeButton(tbSimpan);
				this.cbaktif.setSelected(false);
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("insert into portal_cabang (kode_cab,nama,kode_lokasi,status_jawa) values "+
							"('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.app._lokasi+"','"+(this.cbaktif.selected ? 'T':'F')+"') ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{				
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("update portal_cabang set  "+
						"nama = '"+this.e1.getText()+
						"',status_jawa = '"+(this.cbaktif.selected ? 'T':'F')+
						"' where kode_cab = '"+this.e0.getText()+"' ");
				this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
		   {			  
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("delete from portal_cabang where kode_cab='"+this.e0.getText()+"'");
				this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_master_fCabang.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_master_fCabang.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select kode_cab,nama,status_jawa from portal_cabang where kode_cab = '"+this.e0.getText()+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("nama"));
					this.cbaktif.setSelected((data.get("status_jawa") == "T" ? true:false));
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_master_fCabang.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		this.standarLib.showListData(this, "Data Cabang",this.e0,this.e1, 
										  "select kode_cab, nama from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(*) from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  ["kode_cab","nama"],"where",["Kode","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_master_fCabang.prototype.doRequestReady = function(sender, methodName, result)
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