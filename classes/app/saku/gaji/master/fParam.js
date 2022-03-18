window.app_saku_gaji_master_fParam = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_master_fParam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_master_fParam";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Data Referensi Parameter Gaji",0);
		
		this.ed_nb = new portalui_saiCBBL(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(10);
		this.ed_nb.setWidth(250);
		this.ed_nb.setCaption("Dokumen");
		this.ed_nb.setText("");
		this.ed_nb.setReadOnly(false);
		this.ed_nb.setLabelWidth(100);
		this.ed_nb.setRightLabelVisible(false);
		this.ed_nb.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(267);
		this.bShow.setTop(10);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(32);
		this.ed_desc.setWidth(470);
		this.ed_desc.setCaption("Keterangan");
		this.ed_desc.setText("");
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
				
		this.ed_tahun = new portalui_saiLabelEdit(this);
		this.ed_tahun.setLeft(20);
		this.ed_tahun.setTop(54);
		this.ed_tahun.setWidth(150);
		this.ed_tahun.setCaption("Tahun");
		this.ed_tahun.setText("");
		this.ed_tahun.setReadOnly(false);
		this.ed_tahun.setTipeText(ttAngka);
		this.ed_tahun.setLength(4);
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(76);
		this.p1.setWidth(710);
		this.p1.setLeft(10);
		this.p1.setHeight(400);
		this.p1.setCaption("Data Parameter Gaji");
		
		uses("portalui_saiGrid;portalui_sgNavigator",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(705);
		this.sg1.setHeight(350);
		this.sg1.setColCount(7);
		this.sg1.setColTitle(["Kode","Deskripsi","Jenis","Kode Akun","Nama Akun","Status","Kode Ref"]);
		this.sg1.setColWidth([6,5,4,3,2,1,0],[50,80,130,60,80,200,80]);	
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(2).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "PDPT");
			val.set(2, "POT");
		this.sg1.columns.get(2).setPicklist(val);
		this.sg1.columns.get(3).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(5).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "FIXED");
			val.set(2, "VARIABLE");
		this.sg1.columns.get(5).setPicklist(val);
		this.sg1.columns.get(6).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
			val.set(1, "REF");
			val.set(2, "INP");
			val.set(3, "LOD");
		this.sg1.columns.get(6).setPicklist(val);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(373);
		this.sgn.setLeft(1);
		this.sgn.setWidth(710);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.bShow.onClick.set(this, "showClick");
			this.ed_nb.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			
			this.ed_tahun.setText(this.app._periode.substr(0,4));
			this.sg1.clear(); this.sg1.appendRow();
			
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
window.app_saku_gaji_master_fParam.extend(window.portalui_childForm);
window.app_saku_gaji_master_fParam.prototype.mainButtonClick = function(sender)
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
window.app_saku_gaji_master_fParam.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),undefined);				
				this.ed_tahun.setText(this.app._periode.substr(0,4));
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into gaji_param_m (no_dok,keterangan,tahun,kode_lokkonsol,nik_user,tgl_input)  values "+
							"('"+this.ed_nb.getText()+"','"+this.ed_desc.getText()+"','"+this.ed_tahun.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now())");
					
					var scr1 = "insert into gaji_param_d(nu,no_dok,kode_param,nama,jenis,kode_akun,sts_param,kode_lokkonsol,kode_ref) values ";
					var baris1 = true;
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						if (!baris1) { scr1 += ",";}	
						scr1 += "("+i+",'"+this.ed_nb.getText()+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"','"+this.sg1.getCell(5,i)+"','"+this.lokkonsol+"','"+this.sg1.getCell(6,i)+"')";
						baris1 = false;
					}	
					sql.add(scr1);
			
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
					sql.add("delete from gaji_param_d where no_dok='"+this.ed_nb.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					sql.add("delete from gaji_param_m where no_dok='"+this.ed_nb.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					sql.add("insert into gaji_param_m (no_dok,keterangan,tahun,kode_lokkonsol,nik_user,tgl_input)  values "+
							"('"+this.ed_nb.getText()+"','"+this.ed_desc.getText()+"','"+this.ed_tahun.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now())");
					
					var scr1 = "insert into gaji_param_d(nu,no_dok,kode_param,nama,jenis,kode_akun,sts_param,kode_lokkonsol,kode_ref) values ";
					var baris1 = true;
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						if (!baris1) { scr1 += ",";}	
						scr1 += "("+i+",'"+this.ed_nb.getText()+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"','"+this.sg1.getCell(5,i)+"','"+this.lokkonsol+"','"+this.sg1.getCell(6,i)+"')";
						baris1 = false;
					}
					sql.add(scr1);
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from gaji_param_d where no_dok='"+this.ed_nb.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
				sql.add("delete from gaji_param_m where no_dok='"+this.ed_nb.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
	setTipeButton(tbAllFalse);
};
window.app_saku_gaji_master_fParam.prototype.showClick = function(sender)
{	
	if (this.ed_nb.getText() != "")
	{
		try
		{
			var line,data = this.dbLib.runSQL(" select keterangan,tahun  from gaji_param_m "+
											  " where kode_lokkonsol='"+this.lokkonsol+"' and no_dok='"+this.ed_nb.getText()+"'");											 
		
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_desc.setText(line.get("keterangan"));
					this.ed_tahun.setText(line.get("tahun"));
					setTipeButton(tbUbahHapus);
				} else
				{
					setTipeButton(tbSimpan);
				}
			}
			
			this.sg1.clear(); 
			var strSql = " select a.kode_param,a.nama,a.jenis,a.kode_akun,b.nama as nama_akun,a.sts_param , a.kode_ref "+
						 " from gaji_param_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokkonsol=b.kode_lokasi "+
						 " where a.no_dok = '"+this.ed_nb.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' order by a.nu";
			
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6),
							new Array(line.get("kode_param"),line.get("nama"),line.get("jenis"),line.get("kode_akun"),
									  line.get("nama_akun"),line.get("sts_param"),line.get("kode_ref")));					
					}
					this.sg1.validasi();
				} 
				else
				this.sg1.appendRow();
			}
		
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_gaji_master_fParam.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 3 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.lokkonsol+"'",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.lokkonsol+"'",
												  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}
};
window.app_saku_gaji_master_fParam.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_nb) 
		{
			this.standarLib.showListData(this, "Daftar Dokumen Penggajian",this.ed_nb,undefined, 
										  "select no_dok, keterangan  from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(no_dok)       from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"'",
										  ["no_dok","nama"],"and",["No Dokumen","Deskripsi"],false);
			this.ed_desc.setText(""); this.sg1.clear(); this.sg1.appendRow();
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_gaji_master_fParam.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};