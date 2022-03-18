window.app_saku_gaji_transaksi_fGabsen = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_transaksi_fGabsen.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_transaksi_fGabsen";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Absensi Karyawan", 0);
		
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(20);
		this.cb_perlama.setTop(10);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode");
		this.cb_perlama.setText("");
		this.cb_perlama.setTag("9");
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(32);
		this.ed_kode.setWidth(185);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setReadOnly(true);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setCaption("Karyawan");
		this.ed_kode.setText("");
		this.ed_kode.setRightLabelCaption("");
		this.ed_kode.setTag("2");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(210);
		this.bShow.setTop(32);
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		
		this.ed_hadir = new portalui_saiLabelEdit(this);
		this.ed_hadir.setLeft(20);
		this.ed_hadir.setTop(54);
		this.ed_hadir.setWidth(180);
		this.ed_hadir.setReadOnly(false);
		this.ed_hadir.setTipeText(ttNilai);
		this.ed_hadir.setAlignment(alRight);
		this.ed_hadir.setCaption("Kehadiran");
		this.ed_hadir.setText("0"); 
		
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
	    this.p1.setCaption('Daftar Absensi Karyawan');
		
		uses("portalui_saiTable");
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(720);
    	this.sg1.setHeight(335);
		this.sg1.setTag("8");
		this.sg1.setColTitle(["No","NIK","Nama","Periode","Kehadiran"]);
		
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
			
			var val = this.dbLib.loadQuery("select max(a.periode) as periode from periode a inner join lokasi b on a.kode_lokasi=b.kode_lokasi "+
			                               "where b.kode_lokkonsol='"+this.lokkonsol+"' ");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.cb_perlama.addItem(j,val[j].split(";"));
					}
				}
				
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gaji_transaksi_fGabsen.extend(window.portalui_childForm);
window.app_saku_gaji_transaksi_fGabsen.prototype.mainButtonClick = function(sender)
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
window.app_saku_gaji_transaksi_fGabsen.prototype.doModalResult = function(event, modalResult)
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
				if (this.standarLib.checkEmptyByTag(this,["0","2","9"]))
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into hr_absen (nik,periode,jml,kode_lokkonsol)  values "+
								"('"+this.ed_kode.getText()+"','"+this.cb_perlama.getText()+"',"+parseNilai(this.ed_hadir.getText())+",'"+this.lokkonsol+"') ");
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
					sql.add(" update hr_absen set  "+
							" jml="+parseNilai(this.ed_hadir.getText())+
							" where nik='"+this.ed_kode.getText()+"' and periode = '"+this.cb_perlama.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from hr_absen where nik='"+this.ed_kode.getText()+"' and periode = '"+this.cb_perlama.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_gaji_transaksi_fGabsen.prototype.showClick = function(sender)
{	
	if (this.ed_kode.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.jml "+
			                                "from hr_absen a "+
											"where a.nik = '"+this.ed_kode.getText()+"' and a.periode = '"+this.cb_perlama.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");
			if (data != undefined) 
			{
			  if  (data != "") 
			  {
				var field = data.split("\r\n");
				field = field[1].split(";");
				this.ed_hadir.setText(floatToNilai(parseFloat(field)));
				setTipeButton(tbUbahHapus);
			  }
			  else
			{	
			  this.ed_hadir.setText("0");
			  setTipeButton(tbSimpan);
			}
			}
			else
			{	
			  this.ed_hadir.setText("0");
			  setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_gaji_transaksi_fGabsen.prototype.tampilClick = function(sender)
{
	this.sg1.clearAll();
	var temp = this.dbLib.runSQL("select a.nik,b.nama,a.periode,a.jml "+
	                             "from hr_absen a "+
								 "                inner join karyawan b on a.nik=b.nik and a.kode_lokkonsol = b.kode_lokkonsol "+
								 "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.periode = '"+this.cb_perlama.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' ");
		
		if (temp instanceof portalui_arrayMap){
			this.sg1.setData(temp);
		}else alert(rs);
};
window.app_saku_gaji_transaksi_fGabsen.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.ed_hadir.setText("0");
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_gaji_transaksi_fGabsen.prototype.doRequestReady = function(sender, methodName, result)
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