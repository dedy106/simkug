window.app_hrmis_gaji_master_fGajikar = function(owner)
{
	if (owner)
	{
		window.app_hrmis_gaji_master_fGajikar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_gaji_master_fGajikar";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Data Referensi Gaji Karyawan",0);
		
		this.cb_nik = new portalui_saiCBBL(this);
		this.cb_nik.setLeft(20);
		this.cb_nik.setTop(10);
		this.cb_nik.setWidth(250);
		this.cb_nik.setCaption("Karyawan");
		this.cb_nik.setText("");
		this.cb_nik.setReadOnly(false);
		this.cb_nik.setLabelWidth(100);
		this.cb_nik.setRightLabelVisible(true);
		this.cb_nik.setRightLabelCaption("");
		
		this.cb_dok = new portalui_saiCBBL(this);
		this.cb_dok.setLeft(20);
		this.cb_dok.setTop(32);
		this.cb_dok.setWidth(250);
		this.cb_dok.setCaption("Dokumen");
		this.cb_dok.setText("");
		this.cb_dok.setReadOnly(false);
		this.cb_dok.setLabelWidth(100);
		this.cb_dok.setRightLabelVisible(true);
		this.cb_dok.setRightLabelCaption("");
				
		this.ed_tahun = new portalui_saiLabelEdit(this);
		this.ed_tahun.setLeft(20);
		this.ed_tahun.setTop(54);
		this.ed_tahun.setWidth(150);
		this.ed_tahun.setCaption("Tahun");
		this.ed_tahun.setText("");
		this.ed_tahun.setReadOnly(true);
		this.ed_tahun.setTipeText(ttAngka);
		this.ed_tahun.setLength(4);
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(180);
		this.bShow.setTop(54);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(76);
		this.p1.setWidth(455);
		this.p1.setLeft(10);
		this.p1.setHeight(400);
		this.p1.setCaption("Data Parameter Fixed Gaji Pendapatan");
		
		uses("portalui_saiGrid",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(450);
		this.sg1.setHeight(350);
		this.sg1.setColCount(3);
		this.sg1.setColTitle(["Kode","Deskripsi","Nilai Ref"]);
		this.sg1.setColWidth([2,1,0],[80,250,80]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setReadOnly(true);	
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setColumnFormat(window.cfNilai);
		
		this.p2 = new portalui_panel(this);
		this.p2.setTop(76);
		this.p2.setWidth(455);
		this.p2.setLeft(510);
		this.p2.setHeight(400);
		this.p2.setCaption("Data Parameter Fixed Gaji Potongan");
		
		this.sg2 = new portalui_saiGrid(this.p2);
		this.sg2.setTop(20);
		this.sg2.setLeft(1);
		this.sg2.setWidth(450);
		this.sg2.setHeight(350);
		this.sg2.setColCount(3);
		this.sg2.setColTitle(["Kode","Deskripsi","Nilai Ref"]);
		this.sg2.setColWidth([2,1,0],[80,250,80]);
		this.sg2.setReadOnly(false);
		this.sg2.columns.get(0).setReadOnly(true);	
		this.sg2.columns.get(1).setReadOnly(true);	
		this.sg2.columns.get(2).setColumnFormat(window.cfNilai);
		
		setTipeButton(tbUbahHapus);
		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.cb_nik.onBtnClick.set(this, "FindBtnClick");
			this.cb_dok.onBtnClick.set(this, "FindBtnClick");
			this.cb_dok.onChange.set(this, "doEditChange");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.clear(); this.sg1.appendRow();
			this.sg2.clear(); this.sg2.appendRow();
			
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
window.app_hrmis_gaji_master_fGajikar.extend(window.portalui_childForm);
window.app_hrmis_gaji_master_fGajikar.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_gaji_master_fGajikar.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),undefined);				
				this.sg1.clear(); this.sg1.appendRow();
				this.sg2.clear(); this.sg2.appendRow();
			}
			break;
		/*
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					
					var scr1 = "insert into gaji_kar_m (no_dok,kode_param,kode_lokasi,nik,nilai) values ";
					var baris1 = true;
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						if (!baris1) { scr1 += ",";}	
						scr1 += "('"+this.cb_dok.getText()+"','"+this.sg1.getCell(0,i)+"','"+this.app._lokasi+"','"+this.cb_nik.getText()+"',"+parseNilai(this.sg1.getCell(2,i))+")";
						baris1 = false;
					}
					for (var i=0; i < this.sg2.rows.getLength(); i++)
					{
						if (!baris1) { scr1 += ",";}	
						scr1 += "('"+this.cb_dok.getText()+"','"+this.sg2.getCell(0,i)+"','"+this.app._lokasi+"','"+this.cb_nik.getText()+"',"+parseNilai(this.sg2.getCell(2,i))+")";
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
		*/
		case "ubah" :
			if (modalResult == mrOk)
			{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					
					sql.add("delete from gaji_kar_m where no_dok='"+this.cb_dok.getText()+"' and nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");					
					var scr1 = "";
					var baris1 = true;
					for (var i=0; i < this.sg1.rows.getLength(); i++){
						if (this.sg1.rowValid(i)){
							scr1 = "insert into gaji_kar_m (no_dok,kode_param,kode_lokkonsol,nik,nilai) values ('"+this.cb_dok.getText()+"','"+this.sg1.getCell(0,i)+"','"+this.lokkonsol+"','"+this.cb_nik.getText()+"',"+parseNilai(this.sg1.getCell(2,i))+")";						
							sql.add(scr1);
						}
					}
					for (var i=0; i < this.sg2.rows.getLength(); i++)
					{
						if (this.sg2.rowValid(i)){
							scr1 = "insert into gaji_kar_m (no_dok,kode_param,kode_lokkonsol,nik,nilai) values ('"+this.cb_dok.getText()+"','"+this.sg2.getCell(0,i)+"','"+this.lokkonsol+"','"+this.cb_nik.getText()+"',"+parseNilai(this.sg2.getCell(2,i))+")";						
							sql.add(scr1);
						}
					}										
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from gaji_kar_m where no_dok='"+this.cb_dok.getText()+"' and nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_gaji_master_fGajikar.prototype.showClick = function(sender)
{	
	if (this.cb_dok.getText() != "")
	{
		try
		{
			this.sg1.clear(); 
			var strSql = " select a.kode_param,a.nama,ifnull(b.nilai,0) as nilai "+
						 " from gaji_param_d a left outer join gaji_kar_m b on a.kode_param=b.kode_param and a.no_dok=b.no_dok and a.kode_lokkonsol=b.kode_lokkonsol and b.nik='"+this.cb_nik.getText()+"' "+
						 " where a.no_dok = '"+this.cb_dok.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' and a.jenis='PDPT' order by a.nu";
			
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1,2),
							new Array(line.get("kode_param"),line.get("nama"),line.get("nilai")));					
					}
					this.sg1.validasi();
				} 
				else
				this.sg1.appendRow();
			}
			this.sg2.clear(); 
			var strSql = " select a.kode_param,a.nama,ifnull(b.nilai,0) as nilai "+
						 " from gaji_param_d a left outer join gaji_kar_m b on a.kode_param=b.kode_param and a.no_dok=b.no_dok and a.kode_lokkonsol=b.kode_lokkonsol and b.nik='"+this.cb_nik.getText()+"' "+
						 " where a.no_dok = '"+this.cb_dok.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' and a.jenis='POT' order by a.nu";
			
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg2,new Array(0,1,2),
							new Array(line.get("kode_param"),line.get("nama"),line.get("nilai")));
					}
					this.sg2.validasi();
				} 
				else
				this.sg2.appendRow();
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_hrmis_gaji_master_fGajikar.prototype.doEditChange = function(sender)
{	
	if (sender == this.cb_dok)
	{
		var line,data = this.dbLib.runSQL(" select tahun  from gaji_param_m "+
										  " where kode_lokkonsol='"+this.lokkonsol+"' and no_dok='"+this.cb_dok.getText()+"'");											 
	
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_tahun.setText(line.get("tahun"));
			} 
		}
	}
};
window.app_hrmis_gaji_master_fGajikar.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(nik) from karyawan where kode_lokonsol='"+this.lokkonsol+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
			this.sg1.clear(); this.sg1.appendRow();
			this.sg2.clear(); this.sg2.appendRow();
		}
		if (sender == this.cb_dok)
		{
			this.standarLib.showListData(this, "Daftar Dokumen",sender,undefined, 
										  "select no_dok, keterangan  from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"' and tahun='"+this.app._periode.substr(0,4)+"'",
										  "select count(no_dok)       from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"' and tahun='"+this.app._periode.substr(0,4)+"'",
										  new Array("no_dok","keterangan"),"and",new Array("No Dokumen","Keterangan"),false);
			this.sg1.clear(); this.sg1.appendRow();
			this.sg2.clear(); this.sg2.appendRow();
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_gaji_master_fGajikar.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.cb_nik.getText()+")");
	              this.app._mainForm.bClear.click();
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};