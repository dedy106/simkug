window.app_saku_piutang_master_fJurusan = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_master_fJurusan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_master_fJurusan";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jurusan : Input/Koreksi", 0);
		
		uses("portalui_saiCBBL;portalui_datePicker");
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(30);
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
		this.e1.setTop(55);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
		this.e2 = new portalui_saiCBBL(this);
		this.e2.setTop(80);
		this.e2.setLeft(20);
		this.e2.setWidth(200);
		this.e2.setCaption("Kode PP");
		this.e2.setText("");
		this.e2.onBtnClick.set(this,"FindBtnClick");
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_saku_piutang_master_fJurusan]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_master_fJurusan.extend(window.portalui_childForm);
window.app_saku_piutang_master_fJurusan.prototype.mainButtonClick = function(sender)
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
window.app_saku_piutang_master_fJurusan.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, ["0"],this.e0);				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, ["0"])))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into jurusan (kode_jur, nama_jur, kode_proyek, kode_lokasi) values  "+
							"('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.e2.getText()+"','"+this.app._lokasi+"') ");
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
					sql.add("update jurusan set  "+
							"nama_jur = '"+this.e1.getText()+"', "+
							"kode_proyek = '"+this.e2.getText()+"' "+
							"	where kode_jur = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from jurusan where kode_jur='"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);	
					this.standarLib.clearByTag(this, new Array("0"),this.e0);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_master_fJurusan.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_saku_piutang_master_fJurusan.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select a.kode_jur, a.nama_jur,a.kode_proyek, b.nama  "+
						"from jurusan a inner join pp b on b.kode_pp = a.kode_proyek and b.kode_lokasi = a.kode_lokasi "+
						"where kode_jur = '"+this.e0.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("nama_jur"));
					this.e2.setText(data.get("kode_proyek"));
					this.e2.setRightLabelCaption(data.get("nama"));
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_piutang_master_fJurusan.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Jurusan",this.e0,this.e1, 
										  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi ='"+this.app._lokasi+"' ",
										  ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
		if (sender == this.e2)
			this.standarLib.showListData(this, "Data PP/Proyek",sender,undefined, 
										  "select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from pp where kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_pp","nama"],"and",["Kode PP","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_piutang_master_fJurusan.prototype.doRequestReady = function(sender, methodName, result)
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