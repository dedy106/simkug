window.app_saku_gaji_transaksi_fPot = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_transaksi_fPot.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_transaksi_fPot";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Potongan Gaji Reguler",0);
		
		this.cb_jenis = new portalui_saiCBBL(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(10);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.setLabelWidth(100);
		this.cb_jenis.setReadOnly(true);
		this.cb_jenis.setCaption("Jenis Potongan");
		this.cb_jenis.setText("");
		this.cb_jenis.setRightLabelCaption("");
		this.cb_jenis.setTag("2");
		
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
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(54);
		this.ed_nilai.setWidth(180);
		this.ed_nilai.setReadOnly(false);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Potongan");
		this.ed_nilai.setText("0"); 
		
		this.ed_perawal = new portalui_saiLabelEdit(this);
		this.ed_perawal.setLeft(20);
		this.ed_perawal.setTop(76);
		this.ed_perawal.setWidth(180);
		this.ed_perawal.setLength(6);
		this.ed_perawal.setReadOnly(false);
		this.ed_perawal.setTipeText(ttAngka);
		this.ed_perawal.setAlignment(alRight);
		this.ed_perawal.setCaption("Periode Awal");
		this.ed_perawal.setText("0"); 
		
		this.ed_perakhir = new portalui_saiLabelEdit(this);
		this.ed_perakhir.setLeft(20);
		this.ed_perakhir.setTop(98);
		this.ed_perakhir.setWidth(180);
		this.ed_perawal.setLength(6);
		this.ed_perakhir.setReadOnly(false);
		this.ed_perakhir.setTipeText(ttAngka);
		this.ed_perakhir.setAlignment(alRight);
		this.ed_perakhir.setCaption("Periode Akhir");
		this.ed_perakhir.setText("0"); 
		
		this.bTampil = new portalui_button(this);
		this.bTampil.setTop(98);
		this.bTampil.setLeft(770);
		this.bTampil.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(120);
	    this.p1.setWidth(825);
	    this.p1.setHeight(330);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Potongan Karyawan');
		
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(820);
    	this.sg1.setHeight(305);
		this.sg1.setTag("8");
		this.sg1.setColTitle(["No","NIK","Nama","Jenis","Nilai","Periode Awal","Periode Akhir"]);
		
		setTipeButton(tbAllFalse);
		this.bShow.onClick.set(this, "showClick");
		this.bTampil.onClick.set(this, "tampilClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.cb_jenis.onBtnClick.set(this, "FindBtnClick");
		
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
			
			var line,data = this.dbLib.runSQL("select max(periode) as periode from periode where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_perawal.setText(line.get("periode"));
					this.ed_perakhir.setText(line.get("periode"));
				}
			}
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gaji_transaksi_fPot.extend(window.portalui_childForm);
window.app_saku_gaji_transaksi_fPot.prototype.mainButtonClick = function(sender)
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
window.app_saku_gaji_transaksi_fPot.prototype.doModalResult = function(event, modalResult)
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
				if (this.standarLib.checkEmptyByTag(this, new Array("0","2","9")))
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into gaji_pot (nik,kode_param,periode1,periode2,nilai,kode_lokkonsol)  values "+
								"('"+this.ed_kode.getText()+"','"+this.cb_jenis.getText()+"','"+this.ed_perawal.getText()+"','"+this.ed_perakhir.getText()+"',"+parseNilai(this.ed_nilai.getText())+",'"+this.lokkonsol+"') ");
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
					sql.add(" update gaji_pot set  "+
							" nilai="+parseNilai(this.ed_nilai.getText())+
							" , periode1='"+this.ed_perawal.getText()+"',periode2='"+this.ed_perakhir.getText()+
							"' where nik='"+this.ed_kode.getText()+"' and kode_param= '"+this.cb_jenis.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from gaji_pot where nik='"+this.ed_kode.getText()+"' and kode_param= '"+this.cb_jenis.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_gaji_transaksi_fPot.prototype.showClick = function(sender)
{	
	if (this.ed_kode.getText() != "")
	{
		try
		{
			uses("server_util_arrayMap");
			var data = this.dbLib.loadQuery("select a.nilai,a.periode1,a.periode2 "+
			                                "from gaji_pot a "+
											"where a.nik = '"+this.ed_kode.getText()+"' and a.kode_param = '"+this.cb_jenis.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"'");
			if (data != undefined) 
			{
			  if  (data != "") 
			  {
				var field = data.split("\r\n");
				field = field[1].split(";");
				this.ed_nilai.setText(floatToNilai(parseFloat(field[0])));
				this.ed_perawal.setText(field[1]);
				this.ed_perakhir.setText(field[2]);
				setTipeButton(tbUbahHapus);
			  }
			  else
			{	
			  this.ed_nilai.setText("0");
			  setTipeButton(tbSimpan);
			}
			}
			else
			{	
			  this.ed_nilai.setText("0");
			  setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_gaji_transaksi_fPot.prototype.tampilClick = function(sender)
{
	this.sg1.clearAll();
	var temp = this.dbLib.runSQL("select a.nik,b.nama,c.nama as jenis,a.nilai,a.periode1,a.periode2 "+
	                             "from gaji_pot a "+
								 "              inner join karyawan b on a.nik=b.nik and a.kode_lokkonsol = b.kode_lokkonsol "+
								 "              inner join gaji_param_d c on a.kode_param=c.kode_param and a.kode_lokkonsol = c.kode_lokkonsol "+
								 "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.ed_kode.getText()+"' ");
		
		if (temp instanceof portalui_arrayMap){
			this.sg1.setData(temp);
		}else alert(rs);
};
window.app_saku_gaji_transaksi_fPot.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.ed_nilai.setText("0");
		}
		if (sender == this.cb_jenis) 
		{
			this.standarLib.showListData(this, "Daftar Jenis Potongan",sender,undefined, 
										  "select kode_param,nama   from gaji_param_d where jenis = 'POT' and kode_lokkonsol ='"+this.lokkonsol+"' and kode_ref= 'LOD'",
										  "select count(kode_param) from gaji_param_d where jenis = 'POT' and kode_lokkonsol ='"+this.lokkonsol+"' and kode_ref= 'LOD'",
										  ["kode_param","nama"],"and",["Kode","Nama"],false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_gaji_transaksi_fPot.prototype.doRequestReady = function(sender, methodName, result)
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