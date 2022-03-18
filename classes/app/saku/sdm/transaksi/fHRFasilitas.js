window.app_saku_sdm_transaksi_fHRFasilitas = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRFasilitas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRFasilitas";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Fasilitas : Input/Koreksi", 0);	

		uses("portalui_saiCBBL");
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(10);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setCaption("Kode Lokasi");
		this.cb_lokasi.setText("");
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setRightLabelCaption("");
		this.cb_lokasi.setTag("9");
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(32);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("Departemen / PP");
		this.cb_pp.setText("");
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		this.cb_pp.setTag("9");
		
		this.cb_loker = new portalui_saiCBBL(this);
		this.cb_loker.setLeft(20);
		this.cb_loker.setTop(54);
		this.cb_loker.setWidth(185);
		this.cb_loker.setCaption("Loker ");
		this.cb_loker.setText("");
		this.cb_loker.setReadOnly(true);
		this.cb_loker.setLabelWidth(100);
		this.cb_loker.setRightLabelVisible(true);
		this.cb_loker.setRightLabelCaption("");
		this.cb_loker.setTag("9");
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(76);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("NIK");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		this.ed_kode.setTag("9");
		
		uses("portalui_saiLabelEdit");
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(98);
		this.ed_nama.setWidth(400);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(true);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("9");
		
		this.ed_jenis = new portalui_saiLabelEdit(this);
		this.ed_jenis.setLeft(20);
		this.ed_jenis.setTop(120);
		this.ed_jenis.setWidth(250);
		this.ed_jenis.setCaption("Jenis");
		this.ed_jenis.setText("");
		this.ed_jenis.setReadOnly(false);
		this.ed_jenis.setLength(100);
		this.ed_jenis.setTag("1");
		
		this.ed_jumlah = new portalui_saiLabelEdit(this);
		this.ed_jumlah.setLeft(20);
		this.ed_jumlah.setTop(142);
		this.ed_jumlah.setWidth(250);
		this.ed_jumlah.setTipeText(ttNilai);
		this.ed_jumlah.setAlignment(alRight);
		this.ed_jumlah.setCaption("Jumlah");
		this.ed_jumlah.setText("");
		this.ed_jumlah.setReadOnly(false);
		this.ed_jumlah.setLength(100);
		this.ed_jumlah.setTag("1");
		
		uses("portalui_label");
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(164);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tgl Mulai");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tglawal = new portalui_datePicker(this);
		this.dp_tglawal.setTop(166);
		this.dp_tglawal.setLeft(120);
		this.dp_tglawal.setWidth(82);
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(186);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tgl Akhir");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tglakhir = new portalui_datePicker(this);
		this.dp_tglakhir.setTop(188);
		this.dp_tglakhir.setLeft(120);
		this.dp_tglakhir.setWidth(82);
		
		uses("portalui_button");
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(10);
		this.bhistory.setLeft(500);
		this.bhistory.setCaption("History");
		this.bhistory.setIcon("url(icon/"+page.getThemes()+"/process.png)");
		
		uses('portalui_panel');
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(500);
	    this.p1.setTop(35);
	    this.p1.setWidth(454);
	    this.p1.setHeight(193);
	    this.p1.setName('p1');
	    this.p1.setCaption('Fasilitas');
		
		uses("portalui_saiSG");
		this.sg1 = new portalui_saiSG(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(450);
		this.sg1.setHeight(170);			
		this.sg1.setColCount(4);
		this.sg1.setTag("9");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(new Array("Jenis","Jumlah","Tgl Mulai","Tgl Akhir"));
		this.sg1.onChange.set(this,"sg1onChange");	
		this.sg1.onDblClick.set(this, "sg1onDblClick");	
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_lokasi.onBtnClick.set(this, "FindBtnClick");
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.cb_loker.onBtnClick.set(this, "FindBtnClick");
		this.bhistory.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.status="";
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
			
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
			
		}catch(e)
		{
			alert(e);
		}
	}
}
window.app_saku_sdm_transaksi_fHRFasilitas.extend(window.portalui_childForm);

window.app_saku_sdm_transaksi_fHRFasilitas.prototype.sg1init = function(sg)
{
	sg.setColWidth(new Array(3,2,1,0),
					new Array(80,80,100,150));
	sg.columns.get(1).setColumnFormat(cfNilai);
}

window.app_saku_sdm_transaksi_fHRFasilitas.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{			
		setTipeButton(tbUbahHapus);
		var dt=this.sg1.getCell(2,row).split("/");
		var dtawal=dt[2]+"-"+dt[1]+"-"+dt[0];
		dt=this.sg1.getCell(3,row).split("/");
		var dtakhir=dt[2]+"-"+dt[1]+"-"+dt[0];
		var data = this.dbLib.runSQL("select no_urut,tgl_mulai,tgl_akhir,jumlah "+
									 "from hr_fasilitas "+
									 "where nik='"+this.ed_kode.getText()+"' and tgl_mulai='"+dtawal+"' and tgl_akhir='"+dtakhir+
									 "' and jenis='"+this.sg1.cells(0,row)+"' and jumlah="+this.numLib.strToFloat(this.sg1.cells(1,row)));
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				line = data.get(0);		
				this.nourut=parseInt(line.get("no_urut"));
				this.ed_jenis.setText(this.sg1.cells(0,row));
				this.ed_jumlah.setText(this.numLib.floatToNilai(parseFloat(line.get("jumlah"))));
				this.dp_tglawal.setDateString(line.get("tgl_mulai"));
				this.dp_tglakhir.setDateString(line.get("tgl_akhir"));	
			}
		}
	}catch(e)
	{
		page.alert(this, e,"");
	}
}

window.app_saku_sdm_transaksi_fHRFasilitas.prototype.mainButtonClick = function(sender)
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
window.app_saku_sdm_transaksi_fHRFasilitas.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);
				setTipeButton(tbSimpan);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{					
					var data = this.dbLib.runSQL("select max(no_urut) as maks from hr_fasilitas where nik='"+this.ed_kode.getText()+"' ");
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
					sql.add("insert into hr_fasilitas (nik,jenis,jumlah,tgl_mulai,tgl_akhir,user_id,tgl_input,no_urut) values ('"+this.ed_kode.getText()+"','"+this.ed_jenis.getText()+"','"+this.numLib.strToFloat(this.ed_jumlah.getText())+"','"+this.dp_tglawal.getDate()+"','"+this.dp_tglakhir.getDate()+"','"+this.app._userLog+"','"+tgl.getFullYear()+"-"+tgl.getBln()+"-"+tgl.getDate()+"',"+this.nourut+")");
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
					sql.add("update hr_fasilitas set jenis='"+this.ed_jenis.getText()+"',jumlah="+this.numLib.strToFloat(this.ed_jumlah.getText())+
					",tgl_mulai='"+this.dp_tglawal.getDate()+"',tgl_akhir='"+this.dp_tglakhir.getDate()+
					"' where nik='"+this.ed_kode.getText()+"' and no_urut="+this.nourut);
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
				sql.add("delete from hr_fasilitas where nik='"+this.ed_kode.getText()+"' and no_urut="+this.nourut);
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
}

window.app_saku_sdm_transaksi_fHRFasilitas.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.ed_kode.getText() != "")
		{
			try
			{			
				var data = this.dbLib.runSQL("select jenis,jumlah,tgl_mulai,tgl_akhir "+
											 "from hr_fasilitas "+
											 "where nik='"+this.ed_kode.getText()+"' order by tgl_mulai desc ");

				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.clear();
						this.sg1.setData(data);										
						this.sg1init(this.sg1);
						for (var i=0;i < this.sg1.getRowCount();i++)
						{
							var dt=this.sg1.getCell(2,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(2,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
							dt=this.sg1.getCell(3,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(3,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
						}
					}else
					{
						this.sg1.clear();
					}
				}
			}catch(e)
			{
				page.alert(this, e,"");
			}
		}
	}
}

window.app_saku_sdm_transaksi_fHRFasilitas.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_lokasi) 
		{
			this.standarLib.showListData(this, "Daftar Lokasi",this.cb_lokasi,undefined, 
										  "select kode_lokasi, nama  from lokasi ",
										  "select count(kode_lokasi) from lokasi ",
										  new Array("kode_lokasi","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.ed_kode,this.ed_nama, 
										  "select nik, nama from karyawan where kode_lokasi='"+this.cb_lokasi.getText()+"' and kode_loker like '"+this.cb_loker.getText()+"' and kode_pp like '"+this.cb_pp.getText()+"%'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.cb_lokasi.getText()+"' and kode_loker like '"+this.cb_loker.getText()+"' and kode_pp like '"+this.cb_pp.getText()+"%'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
		}
		if (sender == this.cb_pp) 
		{
			this.standarLib.showListData(this, "Daftar Departemen",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  new Array("kode_pp","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.cb_loker) 
		{
			this.standarLib.showListData(this, "Daftar Loker",this.cb_loker,undefined, 
										  "select kode_loker, nama  from hr_loker where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  "select count(kode_loker) from hr_loker where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe= 'posting'",
										  new Array("kode_loker","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
	}catch(e)
	{
		alert(e);
	}
}

window.app_saku_sdm_transaksi_fHRFasilitas.prototype.doRequestReady = function(sender, methodName, result)
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

