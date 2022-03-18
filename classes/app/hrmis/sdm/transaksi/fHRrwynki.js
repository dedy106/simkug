window.app_hrmis_sdm_transaksi_fHRrwynki = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_transaksi_fHRrwynki";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat NKI: Input/Koreksi", 0);	

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
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(98);
		this.cb_pp.setWidth(185);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);		
		this.cb_pp.setCaption("Lokasi Kerja");
		this.cb_pp.setText("");
		this.cb_pp.setRightLabelCaption("");
		this.cb_pp.setTag("1");
		
		this.cb_loker = new portalui_saiCBBL(this);
		this.cb_loker.setLeft(20);
		this.cb_loker.setTop(120);
		this.cb_loker.setWidth(185);
		this.cb_loker.setLabelWidth(100);
		this.cb_loker.setRightLabelVisible(true);
		this.cb_loker.setCaption("Unit Kerja");
		this.cb_loker.setText("");
		this.cb_loker.setRightLabelCaption("");
		this.cb_loker.setTag("1");
		
		this.ed_tahun = new portalui_saiLabelEdit(this);
		this.ed_tahun.setLeft(20);
		this.ed_tahun.setTop(142);
		this.ed_tahun.setWidth(150);
		this.ed_tahun.setLength(4);
		this.ed_tahun.setLabelWidth(100);
		this.ed_tahun.setReadOnly(false);
		this.ed_tahun.setTipeText(ttAngka);
		this.ed_tahun.setAlignment(alRight);
		this.ed_tahun.setCaption("Tahun");
		this.ed_tahun.setText("0");
		this.ed_tahun.setTag("2");
		
		this.ed_nprestasi = new portalui_saiLabelEdit(this);
		this.ed_nprestasi.setLeft(20);
		this.ed_nprestasi.setTop(164);
		this.ed_nprestasi.setWidth(150);
		this.ed_nprestasi.setLabelWidth(100);
		this.ed_nprestasi.setReadOnly(false);
		this.ed_nprestasi.setTipeText(ttNilai);
		this.ed_nprestasi.setAlignment(alRight);
		this.ed_nprestasi.setCaption("Nilai Prestasi");
		this.ed_nprestasi.setText("0");
		this.ed_nprestasi.setTag("1");
		
		this.ed_ngap = new portalui_saiLabelEdit(this);
		this.ed_ngap.setLeft(500);
		this.ed_ngap.setTop(54);
		this.ed_ngap.setWidth(150);
		this.ed_ngap.setLabelWidth(120);
		this.ed_ngap.setReadOnly(false);
		this.ed_ngap.setTipeText(ttNilai);
		this.ed_ngap.setAlignment(alRight);
		this.ed_ngap.setCaption("Nilai Gap Kompetensi");
		this.ed_ngap.setText("0");
		this.ed_ngap.setTag("1");
		
		this.ed_nkreatif = new portalui_saiLabelEdit(this);
		this.ed_nkreatif.setLeft(500);
		this.ed_nkreatif.setTop(76);
		this.ed_nkreatif.setWidth(150);
		this.ed_nkreatif.setLabelWidth(120);
		this.ed_nkreatif.setReadOnly(false);
		this.ed_nkreatif.setTipeText(ttNilai);
		this.ed_nkreatif.setAlignment(alRight);
		this.ed_nkreatif.setCaption("Nilai Kreatifitas");
		this.ed_nkreatif.setText("0");
		this.ed_nkreatif.setTag("1");
		
		this.ed_nparti = new portalui_saiLabelEdit(this);
		this.ed_nparti.setLeft(500);
		this.ed_nparti.setTop(98);
		this.ed_nparti.setWidth(150);
		this.ed_nparti.setLabelWidth(120);
		this.ed_nparti.setReadOnly(false);
		this.ed_nparti.setTipeText(ttNilai);
		this.ed_nparti.setAlignment(alRight);
		this.ed_nparti.setCaption("Nilai Partisipatif");
		this.ed_nparti.setText("0");
		this.ed_nparti.setTag("1");
		
		this.ed_nmanaj = new portalui_saiLabelEdit(this);
		this.ed_nmanaj.setLeft(500);
		this.ed_nmanaj.setTop(120);
		this.ed_nmanaj.setWidth(150);
		this.ed_nmanaj.setLabelWidth(120);
		this.ed_nmanaj.setReadOnly(false);
		this.ed_nmanaj.setTipeText(ttNilai);
		this.ed_nmanaj.setAlignment(alRight);
		this.ed_nmanaj.setCaption("Nilai Manajerial");
		this.ed_nmanaj.setText("0");
		this.ed_nmanaj.setTag("1");
		
		this.ed_nhasil = new portalui_saiLabelEdit(this);
		this.ed_nhasil.setLeft(500);
		this.ed_nhasil.setTop(142);
		this.ed_nhasil.setWidth(150);
		this.ed_nhasil.setLabelWidth(120);
		this.ed_nhasil.setReadOnly(false);
		this.ed_nhasil.setTipeText(ttNilai);
		this.ed_nhasil.setAlignment(alRight);
		this.ed_nhasil.setCaption("Hasil");
		this.ed_nhasil.setText("0");
		this.ed_nhasil.setTag("1");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(500);
		this.ed_desc.setTop(164);
		this.ed_desc.setWidth(350);
		this.ed_desc.setLength(100);
		this.ed_desc.setLabelWidth(120);
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setCaption("Keterangan");
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
	    this.p1.setCaption('Riwayat NKI');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(257);			
		this.sg1.setColCount(10);
		this.sg1.setTag("3");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["Lokasi Keja","Unit Kerja","Tahun","N. Prestasi","N. Gap Komp.","N. Kreatif","N. Partisipasif","N. Manajerial","Hasil","Keterangan"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		//this.cb_nik.onChange.set(this, "doEditChange");
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
			
			this.ed_tahun.setText(this.app._periode.substr(0,4));
			this.lokkonsol = this.app._lokKonsol;
			this.sg1.clear(1); 
		    this.cb_pp.setSQL("select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_lokasi","nama"]);    		
		    this.cb_loker.setSQL("select kode_loker, nama  from hr_loker where tipe= 'posting'",["kode_loker","nama"]);  	
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRrwynki.extend(window.portalui_childForm);
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.sg1init = function(sg)
{
	sg.columns.get(2).setColumnFormat(window.cfNilai);
	sg.columns.get(3).setColumnFormat(window.cfNilai);
	sg.columns.get(4).setColumnFormat(window.cfNilai);
	sg.columns.get(5).setColumnFormat(window.cfNilai);
	sg.columns.get(6).setColumnFormat(window.cfNilai);
	sg.columns.get(7).setColumnFormat(window.cfNilai);
	sg.columns.get(8).setColumnFormat(window.cfNilai);

	sg.setColWidth([9,8,7,6,5,4,3,2,1,0],[100,80,80,80,80,80,80,80,120,120]);
};
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var data = this.dbLib.runSQL("select a.kode_lokasi,a.kode_loker, b.nama as nama_lokasi, c.nama as nama_loker, a.tahun, a.nprestasi, a.ngap, a.nkreatif, a.nparti, a.nmanaj, a.nhasil, a.keterangan "+
									 "from hr_nki a "+
									 "             inner join hr_lokasi b on a.kode_lokasi = b.kode_lokasi and a.kode_lokkonsol=b.kode_lokkonsol "+
									 "             inner join hr_loker c on a.kode_loker = c.kode_loker and a.kode_lokkonsol=c.kode_lokkonsol "+
									 "where a.tahun='"+this.sg1.cells(2,row)+"' and a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.cb_pp.setText(line.get("kode_lokasi"));
				this.cb_pp.setRightLabelCaption(line.get("nama_lokasi"));
				this.cb_loker.setText(line.get("kode_loker"));
				this.cb_loker.setRightLabelCaption(line.get("nama_loker"));
				this.ed_tahun.setText(line.get("tahun"));
				this.ed_nprestasi.setText(line.get("nprestasi"));
				this.ed_ngap.setText(line.get("ngap"));
				this.ed_nkreatif.setText(line.get("nkreatif"));
				this.ed_nparti.setText(line.get("nparti"));
				this.ed_nmanaj.setText(line.get("nmanaj"));
				this.ed_nhasil.setText(line.get("nhasil"));
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
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.doEditChange = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2","3"),this.cb_nik);
				this.sg1.clear(1); 
				this.ed_tahun.setText(this.app._periode.substr(0,4));
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
					sql.add("insert into hr_nki (nik,kode_lokasi,kode_loker,tahun,nprestasi,ngap,nkreatif,nparti,nmanaj,nhasil,keterangan,"+
					        "                    kode_lokkonsol,user_id,tgl_input) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"',"+parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_nprestasi.getText())+","+
							            parseNilai(this.ed_ngap.getText())+","+parseNilai(this.ed_nkreatif.getText())+","+
										parseNilai(this.ed_nparti.getText())+","+parseNilai(this.ed_nmanaj.getText())+","+parseNilai(this.ed_nhasil.getText())+",'"+this.ed_desc.getText()+"','"+
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
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1","2","9"))))
			{
				try
				{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("update hr_nki set kode_lokasi = '"+this.cb_pp.getText()+"',kode_loker='"+this.cb_loker.getText()+"',nprestasi="+parseNilai(this.ed_nprestasi.getText())+",ngap="+parseNilai(this.ed_ngap.getText())+","+
					        "nkreatif="+parseNilai(this.ed_nkreatif.getText())+",nparti="+parseNilai(this.ed_nparti.getText())+",nmanaj="+parseNilai(this.ed_nmanaj.getText())+",nhasil="+parseNilai(this.ed_nhasil.getText())+
							",keterangan='"+this.ed_desc.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now() "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and tahun='"+this.ed_tahun.getText()+"' ");
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
				sql.add("delete from hr_nki where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and tahun='"+this.ed_tahun.getText()+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.show2Click = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select b.nama as lokasi,c.nama as loker, a.tahun,a.nprestasi,a.ngap,a.nkreatif,a.nparti,a.nmanaj,a.nhasil,a.keterangan "+
											 "from hr_nki a "+
											 "             inner join hr_lokasi b on a.kode_lokasi = b.kode_lokasi and a.kode_lokkonsol=b.kode_lokkonsol "+
											 "             inner join hr_loker c on a.kode_loker = c.kode_loker and a.kode_lokkonsol=c.kode_lokkonsol "+
											 "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' order by a.tahun desc");

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
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.FindBtnClick = function(sender, event)
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
window.app_hrmis_sdm_transaksi_fHRrwynki.prototype.doRequestReady = function(sender, methodName, result)
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
