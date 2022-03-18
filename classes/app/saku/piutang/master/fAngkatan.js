window.app_saku_piutang_master_fAngkatan = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_master_fAngkatan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_master_fAngkatan";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Angkatan : Input/Koreksi", 0);
		
		uses("portalui_saiCBBL;portalui_datePicker");
		this.e2 = new portalui_saiCBBL(this);
		this.e2.setTop(20);
		this.e2.setLeft(20);
		this.e2.setWidth(200);
		this.e2.setCaption("Kode Jurusan");
		this.e2.setText("");
		this.e2.onBtnClick.set(this,"FindBtnClick");
		
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(45);
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
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(45);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		this.bGen.onClick.set(this,"doGenerate");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(70);
		this.e1.setWidth(150);
		this.e1.setCaption("Tahun Ajaran");
		this.e1.setText("");
		this.e1.setReadOnly(false);				
		
		uses("portalui_saiEdit");
		this.e12 = new portalui_saiEdit(this);
		this.e12.setLeft(175);
		this.e12.setTop(70);
		this.e12.setWidth(50);		
		this.e12.setText("");
		this.e12.setReadOnly(false);				
		
		this.e3 = new portalui_saiCB(this);
		this.e3.setTop(95);
		this.e3.setLeft(20);
		this.e3.setWidth(200);
		this.e3.setCaption("Jenis");
		this.e3.setText("");
		this.e3.addItem(0,"S1");
		this.e3.addItem(1,"MM");
		
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
			alert("[app_saku_piutang_master_fAngkatan]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_master_fAngkatan.extend(window.portalui_childForm);
window.app_saku_piutang_master_fAngkatan.prototype.mainButtonClick = function(sender)
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
window.app_saku_piutang_master_fAngkatan.prototype.doModalResult = function(event, modalResult)
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
					sql.add("insert into angkatan (kode_ang,  nama_ang, kode_jur,jenis, kode_lokasi) values  "+
							"('"+this.e0.getText()+"','"+this.e1.getText()+"/"+this.e12.getText()+"','"+this.e2.getText()+"','"+this.e3.getText()+"','"+this.app._lokasi+"') ");
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
					sql.add("update angkatan set  "+
							"nama_ang = '"+this.e1.getText()+"/"+this.e12.getText()+"', "+
							"kode_jur = '"+this.e2.getText()+"' ,"+
							"jenis = '"+this.e3.getText()+"' "+
							"	where kode_ang = '"+this.e0.getText()+"'  and kode_lokasi = '"+this.app._lokasi+"' and kode_jur ='"+this.e2.getText()+"' ");
					this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from angkatan where kode_ang='"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and kode_jur ='"+this.e2.getText()+"'");
					this.dbLib.execArraySQL(sql);	
					this.standarLib.clearByTag(this, ["0"],this.e0);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_master_fAngkatan.prototype.doGenerate = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "angkatan","kode_ang","","00","and kode_jur = '"+this.e2.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' "));
};
window.app_saku_piutang_master_fAngkatan.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select a.kode_ang, a.nama_ang,a.kode_jur, b.nama_jur, a.jenis  from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi where a.kode_ang = '"+this.e0.getText()+"' and a.kode_jur = '"+this.e2.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					var nama = data.get("nama_ang").split("/");
					this.e1.setText(nama[0]);this.e12.setText(nama[1]);					
					this.e3.setText(data.get("jenis"));
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_piutang_master_fAngkatan.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e2)
			this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
										  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan  where kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data PP/Proyek",sender,undefined, 
										  "select kode_ang, nama_ang from angkatan  where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.e2.getText()+"' ","select count(*) from angkatan  where kode_lokasi = '"+this.app._lokasi+"'  and kode_jur = '"+this.e2.getText()+"'",
										  ["kode_ang","nama_ang"],"and",["Kode Angkatan","Nama Angkatan"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_piutang_master_fAngkatan.prototype.doRequestReady = function(sender, methodName, result)
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