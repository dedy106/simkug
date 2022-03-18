window.app_saku_sdm_transaksi_fHRcekup = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRcekup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRcekup";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat General Check Up: Input/Koreksi", 0);	

		this.cb_nik = new portalui_saiCBBL(this);
		this.cb_nik.setLeft(20);
		this.cb_nik.setTop(10);
		this.cb_nik.setWidth(185);
		this.cb_nik.setLabelWidth(100);
		this.cb_nik.setLength(10);
		this.cb_nik.setRightLabelVisible(false);
		this.cb_nik.setReadOnly(false);
		this.cb_nik.setCaption("NIK Pegawai");
		this.cb_nik.setText("");
		this.cb_nik.setRightLabelCaption("");
		this.cb_nik.setTag("9");
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(350);
		this.ed_nama.setLength(100);
		this.ed_nama.setReadOnly(true);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setTag("9");
		
		this.ed_tmplahir = new portalui_saiLabelEdit(this);
		this.ed_tmplahir.setLeft(20);
		this.ed_tmplahir.setTop(54);
		this.ed_tmplahir.setWidth(240);
		this.ed_tmplahir.setLabelWidth(100);
		this.ed_tmplahir.setLength(100);
		this.ed_tmplahir.setReadOnly(true);
		this.ed_tmplahir.setCaption("Tempat / Tgl Lahir");
		this.ed_tmplahir.setText("");
		this.ed_tmplahir.setTag("9");
		
		this.ed_tgllahir = new portalui_saiLabelEdit(this);
		this.ed_tgllahir.setLeft(270);
		this.ed_tgllahir.setTop(54);
		this.ed_tgllahir.setWidth(100);
		this.ed_tgllahir.setLabelWidth(0);
		this.ed_tgllahir.setLength(100);
		this.ed_tgllahir.setReadOnly(true);
		this.ed_tgllahir.setCaption("");
		this.ed_tgllahir.setText("");
		this.ed_tgllahir.setTag("9");
		
		this.ed_alamat = new portalui_saiLabelEdit(this);
		this.ed_alamat.setLeft(20);
		this.ed_alamat.setTop(76);
		this.ed_alamat.setWidth(450);
		this.ed_alamat.setLength(100);
		this.ed_alamat.setReadOnly(true);
		this.ed_alamat.setCaption("Alamat");
		this.ed_alamat.setText("");
		this.ed_alamat.setTag("9");
		
		//--------------------		
		this.lblTgl3 = new portalui_label(this);
		this.lblTgl3.setTop(98);
		this.lblTgl3.setLeft(20);
		this.lblTgl3.setWidth(101);		
		this.lblTgl3.setHeight(18);		
		this.lblTgl3.setCaption("Tanggal CheckUp");
		this.lblTgl3.setUnderLine(true);
		uses("portalui_datePicker");
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(100);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(99);
		
		this.ed_kategori = new portalui_saiLabelEdit(this);
		this.ed_kategori.setLeft(20);
		this.ed_kategori.setTop(120);
		this.ed_kategori.setWidth(350);
		this.ed_kategori.setLength(100);
		this.ed_kategori.setLabelWidth(100);
		this.ed_kategori.setReadOnly(false);
		this.ed_kategori.setCaption("Kategori");
		this.ed_kategori.setText("");
		this.ed_kategori.setTag("1");
		
		this.ed_catat = new portalui_saiLabelEdit(this);
		this.ed_catat.setLeft(20);
		this.ed_catat.setTop(142);
		this.ed_catat.setWidth(350);
		this.ed_catat.setLength(100);
		this.ed_catat.setLabelWidth(100);
		this.ed_catat.setReadOnly(false);
		this.ed_catat.setCaption("Catatan");
		this.ed_catat.setText("");
		this.ed_catat.setTag("1");
		
		this.ed_tindak = new portalui_saiLabelEdit(this);
		this.ed_tindak.setLeft(20);
		this.ed_tindak.setTop(164);
		this.ed_tindak.setWidth(350);
		this.ed_tindak.setLength(100);
		this.ed_tindak.setLabelWidth(100);
		this.ed_tindak.setReadOnly(false);
		this.ed_tindak.setCaption("Tindak Lanjut");
		this.ed_tindak.setText("");
		this.ed_tindak.setTag("1");
		
		this.ed_lokasi = new portalui_saiLabelEdit(this);
		this.ed_lokasi.setLeft(20);
		this.ed_lokasi.setTop(186);
		this.ed_lokasi.setWidth(350);
		this.ed_lokasi.setLength(100);
		this.ed_lokasi.setLabelWidth(100);
		this.ed_lokasi.setReadOnly(false);
		this.ed_lokasi.setCaption("Lokasi Mitra");
		this.ed_lokasi.setText("");
		this.ed_lokasi.setTag("1");
		
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(186);
		this.bhistory.setLeft(873);
		this.bhistory.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(208);
	    this.p1.setWidth(930);
	    this.p1.setHeight(282);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat General Check Up');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(257);			
		this.sg1.setColCount(5);
		this.sg1.setTag("5");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["Tanggal","Kategori","Catatan","Tindakan","Lokasi"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		this.cb_nik.onChange.set(this, "doEditChange");
		this.bhistory.onClick.set(this,"showClick");
		this.sg1.onDblClick.set(this, "sg1onDblClick");
		
		this.nourut=0;
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
			this.sg1.clear(1); 
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sdm_transaksi_fHRcekup.extend(window.portalui_childForm);
window.app_saku_sdm_transaksi_fHRcekup.prototype.sg1init = function(sg)
{
	sg.setColWidth([4,3,2,1,0],[100,200,200,200,100]);
};
window.app_saku_sdm_transaksi_fHRcekup.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var data = this.dbLib.runSQL("select date_format(tanggal,'%d/%m/%Y') as tanggal,kategori,catatan,tindak,lokasi "+
									 "from hr_cekup a "+
									 "where tanggal='"+this.sg1.getCellDateValue(0,row)+"' and kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.dp_tgl1.setText(line.get("tanggal"));
				this.ed_kategori.setText(line.get("kategori"));
				this.ed_catat.setText(line.get("catatan"));
				this.ed_tindak.setText(line.get("tindak"));
				this.ed_lokasi.setText(line.get("lokasi"));
			}
			else
			{
				setTipeButton(tbSimpan);
			}
		}
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_saku_sdm_transaksi_fHRcekup.prototype.doEditChange = function(sender)
{
	if (this.cb_nik.getText() != "")
	{
		var line,data = this.dbLib.runSQL("select alamat, tempat_lahir ,tgl_lahir "+
		                                  "from karyawan where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_tmplahir.setText(line.get("tempat_lahir"));
				var dt=line.get("tgl_lahir").split(" ");
					dt=dt[0].split("-");
				this.ed_tgllahir.setText(dt[2]+"/"+dt[1]+"/"+dt[0]);							
				this.ed_alamat.setText(line.get("alamat"));
			}
		}
	}
};
window.app_saku_sdm_transaksi_fHRcekup.prototype.mainButtonClick = function(sender)
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
window.app_saku_sdm_transaksi_fHRcekup.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","2","5"],this.cb_nik);
				this.sg1.clear(1); 
				setTipeButton(tbSimpan);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0","1","2","9"])))
			{
				try
				{					
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					sql.add("insert into hr_cekup (nik,tanggal,kategori,catatan,tindak,lokasi,"+
					        "                     kode_lokkonsol,user_id,tgl_input) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_kategori.getText()+"','"+this.ed_catat.getText()+"','"+this.ed_tindak.getText()+"','"+this.ed_lokasi.getText()+"','"+
										this.lokkonsol+"','"+this.app._userLog+"',now())");
					
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0","1","2","9"])))
			{
				try
				{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("update hr_cekup set lokasi='"+this.ed_lokasi.getText()+"',kategori = '"+this.ed_kategori.getText()+"',catatan='"+this.ed_catat.getText()+"',tindak='"+this.ed_tindak.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now() "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and tanggal='"+this.dp_tgl1.getDate()+"' ");
					this.dbLib.execArraySQL(sql);	
				}catch(e)
				{
					system.alert(this, e,"");
				}					
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1","2"))))
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from hr_cekup where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and tanggal='"+this.dp_tgl1.getDate()+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_sdm_transaksi_fHRcekup.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select date_format(tanggal,'%d/%m/%Y') as tanggal,kategori,catatan,tindak,lokasi "+
											 "from hr_cekup "+
											 "where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' order by tanggal desc");

				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.setData(data);										
					} else
					{
						this.sg1.clear(1);
					}
				}
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	}
};
window.app_saku_sdm_transaksi_fHRcekup.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.cb_nik,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
			this.sg1.clear(1);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_sdm_transaksi_fHRcekup.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};