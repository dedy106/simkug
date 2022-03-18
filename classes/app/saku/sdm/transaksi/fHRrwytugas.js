window.app_saku_sdm_transaksi_fHRrwytugas = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRrwytugas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRrwytugas";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Pengalaman Kerja: Input/Koreksi", 0);	

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
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(98);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setUnderLine(true);
		this.lbltgl1.setCaption("Tanggal Mulai");
		
		uses("portalui_datePicker");	
		this.dp_tglmulai = new portalui_datePicker(this);
		this.dp_tglmulai.setTop(100);
		this.dp_tglmulai.setLeft(120);
		this.dp_tglmulai.setWidth(82);
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(120);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setUnderLine(true);
		this.lbltgl2.setCaption("Tanggal Selesai");
		
		this.dp_tglselesai = new portalui_datePicker(this);
		this.dp_tglselesai.setTop(122);
		this.dp_tglselesai.setLeft(120);
		this.dp_tglselesai.setWidth(82);
		
		this.ed_jabs = new portalui_saiLabelEdit(this);
		this.ed_jabs.setLeft(20);
		this.ed_jabs.setTop(142);
		this.ed_jabs.setWidth(300);
		this.ed_jabs.setLabelWidth(100);
		this.ed_jabs.setLength(100);
		this.ed_jabs.setReadOnly(false);
		this.ed_jabs.setCaption("Jabatan Struktural");
		this.ed_jabs.setText("");
		this.ed_jabs.setTag("1");
		
		this.ed_jabf = new portalui_saiLabelEdit(this);
		this.ed_jabf.setLeft(20);
		this.ed_jabf.setTop(164);
		this.ed_jabf.setWidth(300);
		this.ed_jabf.setLabelWidth(100);
		this.ed_jabf.setLength(100);
		this.ed_jabf.setReadOnly(false);
		this.ed_jabf.setCaption("Jabatan Fungsional");
		this.ed_jabf.setText("");
		this.ed_jabf.setTag("1");
		//-----
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(500);
		this.cb_pp.setTop(120);
		this.cb_pp.setWidth(205);
		this.cb_pp.setLabelWidth(120);		
		this.cb_pp.setCaption("Lokasi Kerja");
		this.cb_pp.setText("");
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		this.cb_pp.setTag("1");
		
		this.cb_loker = new portalui_saiCBBL(this);
		this.cb_loker.setLeft(500);
		this.cb_loker.setTop(142);
		this.cb_loker.setWidth(205);
		this.cb_loker.setLabelWidth(120);
		this.cb_loker.setCaption("Unit Kerja");
		this.cb_loker.setText("");
		this.cb_loker.setRightLabelVisible(true);
		this.cb_loker.setRightLabelCaption("");
		this.cb_loker.setTag("1");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(500);
		this.ed_desc.setTop(164);
		this.ed_desc.setWidth(350);
		this.ed_desc.setLabelWidth(120);
		this.ed_desc.setLength(150);
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setCaption("Tugas Pokok");
		this.ed_desc.setText("");
		this.ed_desc.setTag("1");
		
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
	    this.p1.setCaption('Riwayat Pengalaman Kerja');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(257);			
		this.sg1.setColCount(8);
		this.sg1.setTag("2");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["No","Tgl Mulai","Tgl Selesai","Jab Struktural","Jab Fungsional","Lokasi Kerja","Unit Kerja","Tugas Pokok"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		//this.cb_nik.onChange.set(this, "doEditChange");
		//this.cb_jab1.onBtnClick.set(this, "FindBtnClick");
		//this.cb_jab2.onBtnClick.set(this, "FindBtnClick");
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.cb_loker.onBtnClick.set(this, "FindBtnClick");
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
			this.cb_nik.setSQL("select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"]);         
            this.cb_pp.setSQL("select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_lokasi","nama"]);
    		this.cb_loker.setSQL("select kode_loker, nama  from hr_loker where tipe= 'posting'",["kode_loker","nama"]);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sdm_transaksi_fHRrwytugas.extend(window.portalui_childForm);
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.sg1init = function(sg)
{
	sg.setColWidth([7,6,5,4,3,2,1,0],
				[260,100,100,110,110,80,80,50]);
};
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var data = this.dbLib.runSQL("select a.no_urut,a.tgl_mulai,a.tgl_selesai,a.jabs,a.jabf,a.kode_lokasi,a.kode_loker,a.keterangan, "+
									 "       b.nama as nama_lokasi,c.nama as nama_loker "+
									 "from hr_tugas a "+
									 "                inner join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol=b.kode_lokkonsol "+
									 "                inner join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokkonsol=c.kode_lokkonsol "+
									 "where a.no_urut='"+this.sg1.cells(0,row)+"' and a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.nourut = line.get("no_urut");
				this.dp_tglmulai.setDateString(line.get("tgl_mulai"));
				this.dp_tglselesai.setDateString(line.get("tgl_selesai"));
				this.ed_jabs.setText(line.get("jabs"));
				this.ed_jabf.setText(line.get("jabf"));
				this.cb_pp.setText(line.get("kode_lokasi"));
				this.cb_pp.setRightLabelCaption(line.get("nama_lokasi"));
				this.cb_loker.setText(line.get("kode_loker"));
				this.cb_loker.setRightLabelCaption(line.get("nama_loker"));
				this.ed_desc.setText(line.get("keterangan"));
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
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.doEditChange = function(sender)
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
};
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.mainButtonClick = function(sender)
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
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.doModalResult = function(event, modalResult)
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
				if ( (new Date()).strToDate(this.dp_tglselesai.getDate())  < (new Date()).strToDate(this.dp_tglmulai.getDate()))
				{
					system.alert(this,"Tanggal tidak valid.","Tanggal Mulai lebih akhir dari Tanggal Selesai");
					return false;
				}
				try
				{					
					var data = this.dbLib.runSQL("select max(no_urut) as maks from hr_tugas where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
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
					sql.add("insert into hr_tugas (nik,no_urut,tgl_mulai,tgl_selesai,jabs,jabf,kode_lokasi,kode_loker,keterangan,"+
					        "                      kode_lokkonsol,user_id,tgl_input) "+
					        "values ('"+this.cb_nik.getText()+"',"+this.nourut+",'"+this.dp_tglmulai.getDate()+"','"+
							            this.dp_tglselesai.getDate()+"','"+this.ed_jabs.getText()+"','"+
										this.ed_jabf.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"','"+this.ed_desc.getText()+"','"+
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
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				if ( (new Date()).strToDate(this.dp_tglselesai.getDate())  < (new Date()).strToDate(this.dp_tglmulai.getDate()))
				{
					system.alert(this,"Tanggal tidak valid.","Tanggal Mulai lebih akhir dari Tanggal Selesai");
					return false;
				}
				try
				{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("update hr_tugas set tgl_mulai='"+this.dp_tglmulai.getDate()+"',tgl_selesai='"+this.dp_tglselesai.getDate()+"',"+
					        "jabs='"+this.ed_jabs.getText()+"',jabf='"+this.ed_jabf.getText()+"',kode_lokasi='"+this.cb_pp.getText()+"',kode_loker='"+this.cb_loker.getText()+
							"',keterangan='"+this.ed_desc.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now() "+
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
				sql.add("delete from hr_tugas where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_urut="+this.nourut);
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.show2Click = function(sender)
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
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select a.no_urut,a.tgl_mulai,a.tgl_selesai,a.jabs,a.jabf,b.nama as nama_lokasi,c.nama as nama_loker,a.keterangan "+
											 "from hr_tugas a "+
											 "                inner join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol=b.kode_lokkonsol "+
											 "                inner join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokkonsol=c.kode_lokkonsol "+
											 "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' order by a.no_urut desc");

				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.setData(data);										
						
						for (var i=0;i < this.sg1.getRowCount();i++)
						{
							var dt=this.sg1.getCell(1,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(1,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
							
							dt=this.sg1.getCell(2,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(2,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
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
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.cb_nik,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
			this.sg1.clear(1);
		}
		/*
		if (sender == this.cb_jab1) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan Struktural",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'STRUKTURAL'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'STRUKTURAL'",
										  new Array("kode_jab","nama"),"and",new Array("Kode","Deskripsi"),true);
		}
		if (sender == this.cb_jab2) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan Fungsional",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'FUNGSIONAL'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'FUNGSIONAL'",
										  new Array("kode_jab","nama"),"and",new Array("Kode","Deskripsi"),true);
		}
		*/
		if (sender == this.cb_pp) 
		{
			this.standarLib.showListData(this, "Daftar Lokasi Kerja",this.cb_pp,undefined, 
										  "select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' ",
										  "select count(kode_lokasi) from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' ",
										  new Array("kode_lokasi","nama"),"and",new Array("Kode","Deskripsi"),false);
			this.cb_loker.setText("");
			this.cb_loker.setRightLabelCaption("");
		}
		if (sender == this.cb_loker) 
		{
			this.standarLib.showListData(this, "Daftar Unit Kerja",this.cb_loker,undefined, 
										  "select kode_loker, nama  from hr_loker where kode_lokasi='"+this.cb_pp.getText()+"' and tipe= 'posting'",
										  "select count(kode_loker) from hr_loker where kode_lokasi='"+this.cb_pp.getText()+"' and tipe= 'posting'",
										  new Array("kode_loker","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_sdm_transaksi_fHRrwytugas.prototype.doRequestReady = function(sender, methodName, result)
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
