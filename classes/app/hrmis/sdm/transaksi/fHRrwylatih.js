window.app_hrmis_sdm_transaksi_fHRrwylatih = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_transaksi_fHRrwylatih";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Pelatihan Pegawai: Input/Koreksi", 0);	

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
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(10);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
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
		this.ed_latih = new portalui_saiLabelEdit(this);
		this.ed_latih.setLeft(20);
		this.ed_latih.setTop(98);
		this.ed_latih.setWidth(300);
		this.ed_latih.setLabelWidth(100);
		this.ed_latih.setLength(100);
		this.ed_latih.setReadOnly(false);
		this.ed_latih.setCaption("Nama Pelatihan");
		this.ed_latih.setText("");
		this.ed_latih.setTag("1");
		
		this.ed_lama = new portalui_saiLabelEdit(this);
		this.ed_lama.setLeft(20);
		this.ed_lama.setTop(120);
		this.ed_lama.setWidth(180);
		this.ed_lama.setLabelWidth(100);
		this.ed_lama.setLength(15);
		this.ed_lama.setReadOnly(false);
		this.ed_lama.setTipeText(ttNilai);
		this.ed_lama.setAlignment(alRight);
		this.ed_lama.setCaption("Lama Kegiatan [Hari]");
		this.ed_lama.setText("0");
		this.ed_lama.setTag("1");
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(142);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setUnderLine(true);
		this.lbltgl1.setCaption("Tanggal Mulai");
		
		uses("portalui_datePicker");	
		this.dp_tglmulai = new portalui_datePicker(this);
		this.dp_tglmulai.setTop(144);
		this.dp_tglmulai.setLeft(120);
		this.dp_tglmulai.setWidth(82);
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(164);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setUnderLine(true);
		this.lbltgl2.setCaption("Tanggal Selesai");
		
		this.dp_tglselesai = new portalui_datePicker(this);
		this.dp_tglselesai.setTop(166);
		this.dp_tglselesai.setLeft(120);
		this.dp_tglselesai.setWidth(82);
		
		this.cb_dana = new portalui_saiCB(this);
		this.cb_dana.setTop(120);
		this.cb_dana.setLeft(500);
		this.cb_dana.setWidth(205);
		this.cb_dana.setLabelWidth(120);
		this.cb_dana.setReadOnly(true);
		this.cb_dana.setCaption("Pendanaan");
		this.cb_dana.addItem(0,"Yayasan");
		this.cb_dana.addItem(1,"Sendiri");
		this.cb_dana.addItem(2,"Pihak Lain");
		this.cb_dana.setLength(100);
		this.cb_dana.setTag("1");
		
		this.ed_panitia = new portalui_saiLabelEdit(this);
		this.ed_panitia.setLeft(500);
		this.ed_panitia.setTop(142);
		this.ed_panitia.setWidth(320);
		this.ed_panitia.setLabelWidth(120);
		this.ed_panitia.setLength(100);
		this.ed_panitia.setReadOnly(false);
		this.ed_panitia.setCaption("Penyelenggara");
		this.ed_panitia.setText("");
		this.ed_panitia.setTag("1");
		
		this.ed_kota = new portalui_saiLabelEdit(this);
		this.ed_kota.setLeft(500);
		this.ed_kota.setTop(164);
		this.ed_kota.setWidth(320);
		this.ed_kota.setLabelWidth(120);
		this.ed_kota.setLength(50);
		this.ed_kota.setReadOnly(false);
		this.ed_kota.setCaption("Kota");
		this.ed_kota.setText("");
		this.ed_kota.setTag("1");
		
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(164);
		this.bhistory.setLeft(873);
		this.bhistory.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(186);
	    this.p1.setWidth(930);
	    this.p1.setHeight(282);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat Pelatihan');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(929);
		this.sg1.setHeight(257);			
		this.sg1.setColCount(8);
		this.sg1.setTag("2");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["No","Nama Pelatihan","Lama Kegiatan","Tgl Mulai","Tgl Selesai","Penyelenggara","Kota","Pendanaan"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		//this.cb_nik.onChange.set(this, "doEditChange");
		this.bhistory.onClick.set(this,"showClick");
		this.sg1.onDblClick.set(this, "sg1onDblClick");
		this.bShow.onClick.set(this, "show2Click");
		
		this.nourut=0;
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			
			this.lokkonsol = this.app._lokKonsol;
			this.sg1.clear(1); 
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRrwylatih.extend(window.portalui_childForm);
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.sg1init = function(sg)
{
	sg.setColWidth([7,6,5,4,3,2,1,0],[100,200,200,120,110,100,120,50]);
};
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var data = this.dbLib.runSQL("select latih, lama, tgl_mulai, tgl_selesai, panitia, kota, dana "+
									 "from hr_rwylatih "+
									 "where no_urut='"+this.sg1.cells(0,row)+"' and kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"'");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.ed_latih.setText(line.get("latih"));
				this.ed_lama.setText(line.get("lama"));
				this.dp_tglmulai.setText(line.get("tgl_mulai"));
				this.dp_tglselesai.setText(line.get("tgl_selesai"));
				this.ed_panitia.setText(line.get("panitia"));
				this.ed_kota.setText(line.get("kota"));
				this.cb_dana.setText(line.get("dana"));
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
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.doEditChange = function(sender)
{
	if (sender == this.cb_nik)
	{
		if (this.cb_nik.getText() != "")
		{
			var line,data = this.dbLib.runSQL("select nama, alamat, tempat_lahir ,tgl_lahir "+
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
					this.ed_nama.setText(line.get("nama"));
				}
			}
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2"),this.cb_nik);
				this.sg1.clear(1); 
				setTipeButton(tbSimpan);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1","9"))))
			{
				try
				{					
					var data = this.dbLib.runSQL("select max(no_urut) as maks from hr_rwylatih where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							line = data.get(0);		
							if (line.get("maks")==undefined)
								this.nourut=1;
							else this.nourut=parseInt(line.get("maks"))+1;
						}
					}
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					sql.add("insert into hr_rwylatih (nik,no_urut,latih,lama,tgl_mulai,tgl_selesai,panitia,kota,"+
					        "                        kode_lokkonsol,user_id,tgl_input,dana) "+
					        "values ('"+this.cb_nik.getText()+"',"+this.nourut+",'"+this.ed_latih.getText()+"',"+
							            parseNilai(this.ed_lama.getText())+",'"+this.dp_tglmulai.getDate()+"','"+this.dp_tglselesai.getDate()+"','"+
										this.ed_panitia.getText()+"','"+this.ed_kota.getText()+
										"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'"+this.cb_dana.getText()+"')");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("update hr_rwylatih set "+
					        "latih='"+this.ed_latih.getText()+"',lama="+parseNilai(this.ed_lama.getText())+",tgl_mulai='"+this.dp_tglmulai.getDate()+"',"+
							"tgl_selesai='"+this.dp_tglselesai.getDate()+"',panitia='"+this.ed_panitia.getText()+"',kota='"+this.ed_kota.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now(),dana='"+this.cb_dana.getText()+"' "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and no_urut="+this.nourut);
					this.dbLib.execArraySQL(sql);	
				}catch(e)
				{
					system.alert(this, e,"");
				}					
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from hr_rwylatih where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_urut="+this.nourut);
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.show2Click = function(sender)
{
	if (this.cb_nik.getText() != "")
	{
		try
		{
			this.doEditChange(this.cb_nik);
			this.bhistory.click(this.bhistory);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select no_urut,latih,lama,tgl_mulai,tgl_selesai,panitia,kota,dana "+
											 "from hr_rwylatih "+
											 "where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' order by tgl_mulai desc");

				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.setData(data);	
						for (var i=0;i < this.sg1.getRowCount();i++)
						{
							var dt=this.sg1.getCell(3,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(3,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
							
							dt=this.sg1.getCell(4,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(4,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
						}
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
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.cb_nik,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
			this.sg1.clear(1);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_transaksi_fHRrwylatih.prototype.doRequestReady = function(sender, methodName, result)
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