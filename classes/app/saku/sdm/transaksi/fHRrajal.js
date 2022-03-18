window.app_saku_sdm_transaksi_fHRrajal = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRrajal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRrajal";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Transaksi Rawat Jalan: Input/Koreksi", 0);	

		uses("portalui_saiCBBL");
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
		
		uses("portalui_saiLabelEdit");
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
		
		this.cb_pasien = new portalui_saiCBBL(this);
		this.cb_pasien.setLeft(20);
		this.cb_pasien.setTop(10);
		this.cb_pasien.setWidth(185);
		this.cb_pasien.setLabelWidth(100);
		this.cb_pasien.setLength(10);
		this.cb_pasien.setRightLabelVisible(false);
		this.cb_pasien.setReadOnly(false);
		this.cb_pasien.setCaption("Pasien");
		this.cb_pasien.setText("");
		this.cb_pasien.setRightLabelCaption("");
		this.cb_pasien.setTag("9");
		
		uses("portalui_saiLabelEdit");
		this.ed_umur = new portalui_saiLabelEdit(this);
		this.ed_umur.setLeft(20);
		this.ed_umur.setTop(32);
		this.ed_umur.setWidth(350);
		this.ed_umur.setLength(100);
		this.ed_umur.setReadOnly(true);
		this.ed_umur.setCaption("Usia");
		this.ed_umur.setText("");
		this.ed_umur.setTag("9");
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(98);
		this.ed_nb.setWidth(350);
		this.ed_nb.setLength(50);
		this.ed_nb.setReadOnly(false);
		this.ed_nb.setCaption("No Kuitansi");
		this.ed_nb.setText("");
		this.ed_nb.setTag("1");
		
		uses("portalui_label");
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(120);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setUnderLine(true);
		this.lbltgl1.setCaption("Tgl Berobat");
		
		uses("portalui_datePicker");	
		this.dp_tglsk = new portalui_datePicker(this);
		this.dp_tglsk.setTop(122);
		this.dp_tglsk.setLeft(120);
		this.dp_tglsk.setWidth(82);
		
		this.cb_rs = new portalui_saiCBBL(this);
		this.cb_rs.setLeft(20);
		this.cb_rs.setTop(142);
		this.cb_rs.setWidth(185);
		this.cb_rs.setLabelWidth(100);
		this.cb_rs.setRightLabelVisible(true);
		this.cb_rs.setReadOnly(true);
		this.cb_rs.setCaption("Rumah Sakit");
		this.cb_rs.setText("");
		this.cb_rs.setRightLabelCaption("");
		this.cb_rs.setTag("1");
		
		this.cb_klinik = new portalui_saiCBBL(this);
		this.cb_klinik.setLeft(20);
		this.cb_klinik.setTop(164);
		this.cb_klinik.setWidth(185);
		this.cb_klinik.setLabelWidth(100);
		this.cb_klinik.setRightLabelVisible(true);
		this.cb_klinik.setReadOnly(true);
		this.cb_klinik.setCaption("klinik Sanksi");
		this.cb_klinik.setText("");
		this.cb_klinik.setRightLabelCaption("");
		this.cb_klinik.setTag("1");
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(120);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setUnderLine(true);
		this.lbltgl2.setCaption("Tgl Tagihan");
		
		this.dp_tglsk = new portalui_datePicker(this);
		this.dp_tglsk.setTop(122);
		this.dp_tglsk.setLeft(120);
		this.dp_tglsk.setWidth(82);
	
		
		
		
		this.ed_jml = new portalui_saiLabelEdit(this);
		this.ed_jml.setLeft(20);
		this.ed_jml.setTop(186);
		this.ed_jml.setWidth(180);
		this.ed_jml.setLabelWidth(100);
		this.ed_jml.setLength(15);
		this.ed_jml.setReadOnly(false);
		this.ed_jml.setTipeText(ttNilai);
		this.ed_jml.setAlignment(alRight);
		this.ed_jml.setCaption("Lama Sanksi");
		this.ed_jml.setText("0");
		this.ed_jml.setTag("1");
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(164);
		this.lbltgl2.setLeft(280);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setUnderLine(true);
		this.lbltgl2.setCaption("Tgl Mulai");
		
		this.dp_tglmulai = new portalui_datePicker(this);
		this.dp_tglmulai.setTop(166);
		this.dp_tglmulai.setLeft(380);
		this.dp_tglmulai.setWidth(82);
		
		this.lbltgl3 = new portalui_label(this);
		this.lbltgl3.setTop(186);
		this.lbltgl3.setLeft(280);
		this.lbltgl3.setWidth(101);		
		this.lbltgl3.setHeight(20);		
		this.lbltgl3.setUnderLine(true);
		this.lbltgl3.setCaption("Tgl Berakhir");
		
		this.dp_tglselesai = new portalui_datePicker(this);
		this.dp_tglselesai.setTop(188);
		this.dp_tglselesai.setLeft(380);
		this.dp_tglselesai.setWidth(82);
		
		
		uses("portalui_button");
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(186);
		this.bhistory.setLeft(873);
		this.bhistory.setCaption("Tampil");
		
		uses('portalui_panel');
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(208);
	    this.p1.setWidth(930);
	    this.p1.setHeight(260);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat Sanksi');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(929);
		this.sg1.setHeight(235);			
		this.sg1.setColCount(7);
		this.sg1.setTag("1");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(new Array("Nomor SK","Tgl SK","Jenis Sanksi","Lama Sanksi","Tgl Mulai","Tgl Berakhir","Loker"));
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		this.cb_nik.onChange.set(this, "doEditChange");
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.cb_jenis.onBtnClick.set(this, "FindBtnClick");
		this.bhistory.onClick.set(this,"showClick");
		this.sg1.onDblClick.set(this, "sg1onDblClick");
		
		this.nourut=0;
		this.setTabChildIndex();
		try
		{
			uses("util_dbLib");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			uses("util_number");
			this.numLib = new util_number();
			
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
}

window.app_saku_sdm_transaksi_fHRrajal.extend(window.portalui_childForm);
window.app_saku_sdm_transaksi_fHRrajal.prototype.sg1init = function(sg)
{
	sg.columns.get(4).setColumnFormat(window.cfNilai);
	sg.setColWidth(new Array(6,5,4,3,2,1,0),
					new Array(180,100,100,80,180,80,180));
}

window.app_saku_sdm_transaksi_fHRrajal.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var data = this.dbLib.runSQL("select a.no_sk,a.tgl_sk,a.kode_lokasi,a.kode_sanksi,a.lama,a.tgl_mulai,a.tgl_selesai,b.nama as nama_lokasi,c.nama as nama_sanksi "+
									 "from hr_rwysanksi a "+
									 "              inner join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol=b.kode_lokkonsol "+
									 "              inner join hr_sanksi c on a.kode_sanksi=c.kode_sanksi and a.kode_lokkonsol=c.kode_lokkonsol "+
									 "where a.no_sk='"+this.sg1.cells(0,row)+"' and a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.ed_nosk.setText(line.get("no_sk"));
				this.dp_tglsk.setDateString(line.get("tgl_sk"));
				this.cb_pp.setText(line.get("kode_lokasi"));
				this.cb_pp.setRightLabelCaption(line.get("nama_lokasi"));
				this.cb_jenis.setText(line.get("kode_sanksi"));
				this.cb_jenis.setRightLabelCaption(line.get("nama_sanksi"));
				this.ed_jml.setText(line.get("lama"));
				this.dp_tglmulai.setDateString(line.get("tgl_mulai"));
				this.dp_tglselesai.setDateString(line.get("tgl_selesai"));
			}
			else
			{
				setTipeButton(tbSimpan);
			}
		}
	}catch(e)
	{
		page.alert(this, e,"");
	}
}

window.app_saku_sdm_transaksi_fHRrajal.prototype.doEditChange = function(sender)
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
}

window.app_saku_sdm_transaksi_fHRrajal.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		page.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		page.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		page.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		page.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
}
window.app_saku_sdm_transaksi_fHRrajal.prototype.doModalResult = function(event, modalResult)
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
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					sql.add("insert into hr_rwysanksi (nik,no_sk,tgl_sk,kode_lokasi,kode_sanksi,lama,tgl_mulai,tgl_selesai,"+
					        "                          kode_lokkonsol,user_id,tgl_input) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							            this.cb_pp.getText()+"','"+this.cb_jenis.getText()+"',"+parseNilai(this.ed_jml.getText())+
										",'"+this.dp_tglmulai.getDate()+"','"+this.dp_tglselesai.getDate()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now())");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					page.alert(this, e,"");
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
					sql.add("update hr_rwysanksi set tgl_sk='"+this.dp_tglsk.getDate()+"',kode_lokasi='"+this.cb_pp.getText()+"',"+
					        "kode_sanksi='"+this.cb_jenis.getText()+"',lama="+parseNilai(this.ed_jml.getText())+" "+
							",tgl_mulai='"+this.dp_tglmulai.getDate()+"',tgl_selesai='"+this.dp_tglselesai.getDate()+"',user_id='"+this.app._userLog+"',tgl_input=now() "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					this.dbLib.execArraySQL(sql);	
				}catch(e)
				{
					page.alert(this, e,"");
				}					
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from hr_rwysanksi where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_sk='"+this.ed_nosk.getText()+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
}

window.app_saku_sdm_transaksi_fHRrajal.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select a.no_sk,a.tgl_sk,b.nama as nama_sanksi,a.lama,a.tgl_mulai,a.tgl_selesai,c.nama as loker "+
											 "from hr_rwysanksi a "+
											 "         inner join hr_sanksi b on a.kode_sanksi=b.kode_sanksi and a.kode_lokkonsol=b.kode_lokkonsol "+
											 "         inner join hr_lokasi c on a.kode_lokasi=c.kode_lokasi and a.kode_lokkonsol=c.kode_lokkonsol "+
											 "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' order by a.tgl_sk desc");

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
							
							dt=this.sg1.getCell(4,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(4,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
							
							dt=this.sg1.getCell(5,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(5,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
						}
					} else
					{
						this.sg1.clear(1);
					}
				}
			}catch(e)
			{
				page.alert(this, e,"");
			}
		}
	}
}

window.app_saku_sdm_transaksi_fHRrajal.prototype.FindBtnClick = function(sender, event)
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
		if (sender == this.cb_pp) 
		{
			this.standarLib.showListData(this, "Daftar Lokasi Kerja",this.cb_pp,undefined, 
										  "select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' ",
										  "select count(kode_lokasi) from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' ",
										  new Array("kode_lokasi","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.cb_jenis) 
		{
			this.standarLib.showListData(this, "Daftar Sanksi",sender,undefined, 
										  "select kode_sanksi, nama  from hr_sanksi where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_sanksi) from hr_sanksi where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_sanksi","nama"),"and",new Array("Kode Sanksi","Deskripsi"),false);
		}
	}catch(e)
	{
		alert(e);
	}
}

window.app_saku_sdm_transaksi_fHRrajal.prototype.doRequestReady = function(sender, methodName, result)
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
			   	     page.info(this, result,"");
				break;
		}
	}
}
