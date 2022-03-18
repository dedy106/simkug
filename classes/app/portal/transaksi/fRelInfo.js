window.app_portal_transaksi_fRelInfo = function(owner)
{
	if (owner)
	{
		window.app_portal_transaksi_fRelInfo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fRelInfo";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Relasi Informasi : Input/Koreksi", 0);
		
		uses("portalui_saiCBBL",true);
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(1);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.onChange.set(this, "doEditChange");
		this.ed_kode.setRightLabelCaption("");
		
		this.ed_judul = new portalui_saiLabelEdit(this);
		this.ed_judul.setLeft(20);
		this.ed_judul.setTop(2);
		this.ed_judul.setWidth(400);
		this.ed_judul.setCaption("Judul");
		this.ed_judul.setText("");
		this.ed_judul.setReadOnly(true);
		this.ed_judul.setLength(100);
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(444);
		this.bGen.setTop(2);
		this.bGen.setCaption("Show Data");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(3);
		this.p1.setWidth(500);
		this.p1.setLeft(20);
		this.p1.setHeight(390);
		this.p1.setCaption("Informasi yang terelasi");
		
		uses("portalui_saiGrid",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(495);
		this.sg1.setHeight(340);
		this.sg1.setColCount(2);
		this.sg1.setColTitle(new Array("Kode","Nama Customer"));
		this.sg1.setColWidth(new Array(1,0),new Array(365,100));	
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);
		
		uses("portalui_sgNavigator",true);
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(363);
		this.sgn.setLeft(1);
		this.sgn.setWidth(495);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar",true);
			this.standarLib = new util_standar();
			uses("util_gridLib",true);
			this.gridLib=new util_gridLib();
			
			this.bGen.onClick.set(this, "genClick");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.clear();
			this.sg1.appendRow();			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_portal_transaksi_fRelInfo.extend(window.portalui_childForm);
window.app_portal_transaksi_fRelInfo.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fRelInfo.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);	
				this.sg1.clear(); 
				this.sg1.appendRow();
			}
		break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						sql.add("insert into portal_cust_info (kode_cust,kode_info) values ('"+this.sg1.getCell(0,i)+"','"+this.ed_kode.getText()+"' )");
					}
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
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("delete from portal_cust_info where kode_info='"+this.ed_kode.getText()+"' ");
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						sql.add("insert into portal_cust_info (kode_cust,kode_info) values ('"+this.sg1.getCell(0,i)+"','"+this.ed_kode.getText()+"' )");
					}
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
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("delete from portal_cust_info where kode_info='"+this.ed_kode.getText()+"'");
				this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.ed_kode.setFocus();
};
window.app_portal_transaksi_fRelInfo.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG2(this, "Daftar Customer",this.sg1, this.sg1.row, this.sg1.col, 
				"select kode_cust,nama,perusahaan from portal_cust ","select count(*) from portal_cust ",
				["kode_cust","nama"],"where",["Kode Customer","Nama Customer","Perusahaan"]);
			break;			
		}
	}catch(e)
	{
		alert("[app_portal_transaksi_fRelInfo] : doFindBtnClick : " + e);
	}
};
window.app_portal_transaksi_fRelInfo.prototype.doEditChange = function(sender)
{
	if (this.ed_kode.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select b.kode_cust,c.nama "+
			"from portal_cust_info b inner join portal_cust c on b.kode_cust=c.kode_cust "+
			"where b.kode_info = '"+this.ed_kode.getText()+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){				
					this.sg1.clear();
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1),
							new Array(line.get("kode_cust"),line.get("nama")));					
					}
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fRelInfo.prototype.genClick = function(sender)
{
	try 
	{
		this.sg1.clear();
		//setTipeButton(tbSimpan);
		var data = this.dbLib.runSQL("select kode_cust,nama from portal_cust ");
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				for (var i in data.objList)
				{
					line = data.get(i);
					this.gridLib.SGAppendData(this.sg1,new Array(0,1),
						new Array(line.get("kode_cust"),line.get("nama")));					
				}
			} else {this.sg1.appendRow();}
		}else {this.sg1.appendRow();}
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_portal_transaksi_fRelInfo.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData2(this, "Data Informasi",sender,this.ed_judul, 
			"select kode_info,judul from portal_info ",
			"select count(*) from portal_info ",
			["kode_info","judul"],"where",["Kode","Judul"]);
			this.sg1.clear();
			this.sg1.appendRow();
		}
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_portal_transaksi_fRelInfo.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (relasi informasi : "+ this.ed_kode.getText()+" tersimpan.)");
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