window.app_hrmis_sdm_transaksi_fHRrwypddk = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_transaksi_fHRrwypddk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Pendidikan Pegawai: Input/Koreksi", 0);	

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
		
		this.cb_jenjang = new portalui_saiCB(this);
		this.cb_jenjang.setTop(98);
		this.cb_jenjang.setLeft(20);
		this.cb_jenjang.setWidth(185);
		this.cb_jenjang.setReadOnly(true);
		this.cb_jenjang.setCaption("Jenjang Pendidikan");
		this.cb_jenjang.addItem(0,"SD");
		this.cb_jenjang.addItem(1,"SLTP");
		this.cb_jenjang.addItem(2,"SLTA");
		this.cb_jenjang.addItem(3,"D1");
		this.cb_jenjang.addItem(4,"D2");
		this.cb_jenjang.addItem(5,"D3");
		this.cb_jenjang.addItem(6,"D4");
		this.cb_jenjang.addItem(7,"S1");
		this.cb_jenjang.addItem(8,"S2");
		this.cb_jenjang.addItem(9,"S3");
		this.cb_jenjang.setLength(100);
		this.cb_jenjang.setTag("1");
		
		this.ed_jurusan = new portalui_saiLabelEdit(this);
		this.ed_jurusan.setLeft(20);
		this.ed_jurusan.setTop(120);
		this.ed_jurusan.setWidth(300);
		this.ed_jurusan.setLabelWidth(100);
		this.ed_jurusan.setLength(100);
		this.ed_jurusan.setReadOnly(false);
		this.ed_jurusan.setCaption("Jurusan");
		this.ed_jurusan.setText("");
		this.ed_jurusan.setTag("1");
		
		this.ed_institusi = new portalui_saiLabelEdit(this);
		this.ed_institusi.setLeft(20);
		this.ed_institusi.setTop(142);
		this.ed_institusi.setWidth(300);
		this.ed_institusi.setLabelWidth(100);
		this.ed_institusi.setLength(100);
		this.ed_institusi.setReadOnly(false);
		this.ed_institusi.setCaption("Institusi");
		this.ed_institusi.setText("");
		this.ed_institusi.setTag("1");
		
		this.cb_dana = new portalui_saiCB(this);
		this.cb_dana.setTop(76);
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
		
		this.ed_tahun = new portalui_saiLabelEdit(this);
		this.ed_tahun.setLeft(500);
		this.ed_tahun.setTop(98);
		this.ed_tahun.setWidth(180);
		this.ed_tahun.setLength(4);
		this.ed_tahun.setLabelWidth(120);
		this.ed_tahun.setReadOnly(false);
		this.ed_tahun.setTipeText(ttAngka);
		this.ed_tahun.setAlignment(alRight);
		this.ed_tahun.setCaption("Tahun");
		this.ed_tahun.setText("0");
		this.ed_tahun.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(500);
		this.ed_desc.setTop(120);
		this.ed_desc.setWidth(320);
		this.ed_desc.setLabelWidth(120);
		this.ed_desc.setLength(100);
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setCaption("Keterangan");
		this.ed_desc.setText("");
		this.ed_desc.setTag("1");
		
		this.ed_setara = new portalui_saiLabelEdit(this);
		this.ed_setara.setLeft(500);
		this.ed_setara.setTop(142);
		this.ed_setara.setWidth(320);
		this.ed_setara.setLabelWidth(120);
		this.ed_setara.setLength(100);
		this.ed_setara.setReadOnly(false);
		this.ed_setara.setCaption("Setara");
		this.ed_setara.setText("");
		this.ed_setara.setTag("1");
		
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(142);
		this.bhistory.setLeft(873);
		this.bhistory.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(164);
	    this.p1.setWidth(930);
	    this.p1.setHeight(300);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat Pendidikan');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(929);
		this.sg1.setHeight(275);			
		this.sg1.setColCount(8);
		this.sg1.setTag("2");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["No","Jenjang Pddk","Jurusan","Institusi","Tahun","Keterangan","Setara","Pendanaan"]);
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
window.app_hrmis_sdm_transaksi_fHRrwypddk.extend(window.portalui_childForm);
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.sg1init = function(sg)
{
	sg.setColWidth([7,6,5,4,3,2,1,0],[100,200,200,120,110,100,120,50]);
};
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var data = this.dbLib.runSQL("select jenjang, jurusan, institusi, tahun, keterangan, setara, dana "+
									 "from hr_rwypddk "+
									 "where no_urut='"+this.sg1.cells(0,row)+"' and kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"'");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.cb_jenjang.setText(line.get("jenjang"));
				this.ed_jurusan.setText(line.get("jurusan"));
				this.ed_institusi.setText(line.get("institusi"));
				this.ed_tahun.setText(line.get("tahun"));
				this.ed_desc.setText(line.get("keterangan"));
				this.ed_setara.setText(line.get("setara"));
				this.cb_dana.setText(line.get("dana"));
				this.nourut=this.sg1.cells(0,row);
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
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.doEditChange = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.doModalResult = function(event, modalResult)
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
					var data = this.dbLib.runSQL("select max(no_urut) as maks from hr_rwypddk where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
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
					sql.add("insert into hr_rwypddk (nik,no_urut,jenjang,jurusan,institusi,tahun,keterangan,setara,"+
					        "                        kode_lokkonsol,user_id,tgl_input,dana) "+
					        "values ('"+this.cb_nik.getText()+"',"+this.nourut+",'"+this.cb_jenjang.getText()+"','"+this.ed_jurusan.getText()+"','"+
							            this.ed_institusi.getText()+"',"+parseNilai(this.ed_tahun.getText())+",'"+this.ed_desc.getText()+"','"+this.ed_setara.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'"+this.cb_dana.getText()+"')");
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
					sql.add("update hr_rwypddk set "+
					        "jenjang='"+this.cb_jenjang.getText()+"',institusi='"+this.ed_institusi.getText()+"',tahun="+parseNilai(this.ed_tahun.getText())+","+
							"keterangan='"+this.ed_desc.getText()+"',setara='"+this.ed_setara.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now(),dana='"+this.cb_dana.getText()+"' "+
							",jurusan='"+this.ed_jurusan.getText()+
							"' where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and no_urut="+this.nourut);
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
				sql.add("delete from hr_rwypddk where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_urut="+this.nourut);
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.show2Click = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select no_urut,jenjang,jurusan,institusi,tahun,keterangan,setara,dana "+
											 "from hr_rwypddk "+
											 "where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' order by tahun desc");

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
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.FindBtnClick = function(sender, event)
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
window.app_hrmis_sdm_transaksi_fHRrwypddk.prototype.doRequestReady = function(sender, methodName, result)
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