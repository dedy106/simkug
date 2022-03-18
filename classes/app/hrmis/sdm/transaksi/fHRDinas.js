window.GUI_sdm_transaksi_fHRDinas = function(owner)
{
	if (owner)
	{
		window.GUI_sdm_transaksi_fHRDinas.prototype.parent.constructor.call(this,owner);
		this.className  = "GUI_sdm_transaksi_fHRDinas";
		this.maximize();
		this.itemsValue = new controls_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kedinasan : Input/Koreksi", 0);	

		uses("controls_saiCBBL");
		this.cb_lokasi = new controls_saiCBBL(this);
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
		
		this.cb_pp = new controls_saiCBBL(this);
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
		
		this.cb_loker = new controls_saiCBBL(this);
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
		
		this.ed_kode = new controls_saiCBBL(this);
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
		
		uses("controls_saiLabelEdit");
		this.ed_nama = new controls_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(98);
		this.ed_nama.setWidth(400);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(true);
		this.ed_nama.setLength(100);
		this.ed_nama.setTag("9");
		
		uses("controls_label");
		this.lbltgl1 = new controls_label(this);
		this.lbltgl1.setTop(120);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tgl Awal Berlaku");
		this.lbltgl1.setUnderLine(true);
		
		uses("controls_datePicker");	
		this.dp_tglawal = new controls_datePicker(this);
		this.dp_tglawal.setTop(122);
		this.dp_tglawal.setLeft(120);
		this.dp_tglawal.setWidth(82);
		
		this.ed_divisi = new controls_saiCBBL(this);
		this.ed_divisi.setLeft(20);
		this.ed_divisi.setTop(142);
		this.ed_divisi.setWidth(185);
		this.ed_divisi.setCaption("Divisi");
		this.ed_divisi.setText("");
		this.ed_divisi.setReadOnly(false);
		this.ed_divisi.setLabelWidth(100);
		this.ed_divisi.setRightLabelVisible(true);
		this.ed_divisi.setRightLabelCaption("");
		this.ed_divisi.setTag("1");
		
		this.ed_status = new controls_saiLabelEdit(this);
		this.ed_status.setLeft(450);
		this.ed_status.setTop(10);
		this.ed_status.setWidth(250);
		this.ed_status.setCaption("Status");
		this.ed_status.setText("");
		this.ed_status.setReadOnly(false);
		this.ed_status.setLength(100);
		this.ed_status.setTag("1");
		
		this.ed_grade = new controls_saiLabelEdit(this);
		this.ed_grade.setLeft(450);
		this.ed_grade.setTop(32);
		this.ed_grade.setWidth(250);
		this.ed_grade.setCaption("Grade");
		this.ed_grade.setText("");
		this.ed_grade.setReadOnly(false);
		this.ed_grade.setLength(50);
		this.ed_grade.setTag("1");
		
		this.ed_jabatan = new controls_saiLabelEdit(this);
		this.ed_jabatan.setLeft(450);
		this.ed_jabatan.setTop(54);
		this.ed_jabatan.setWidth(250);
		this.ed_jabatan.setCaption("Jabatan");
		this.ed_jabatan.setText("");
		this.ed_jabatan.setReadOnly(false);
		this.ed_jabatan.setLength(100);
		this.ed_jabatan.setTag("1");
		
		this.lbltgl2 = new controls_label(this);
		this.lbltgl2.setTop(76);
		this.lbltgl2.setLeft(450);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tanggal SK");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tglsk = new controls_datePicker(this);
		this.dp_tglsk.setTop(78);
		this.dp_tglsk.setLeft(550);
		this.dp_tglsk.setWidth(82);
		
		this.ed_nosk = new controls_saiLabelEdit(this);
		this.ed_nosk.setLeft(450);
		this.ed_nosk.setTop(98);
		this.ed_nosk.setWidth(250);
		this.ed_nosk.setCaption("Nomor SK");
		this.ed_nosk.setText("");
		this.ed_nosk.setReadOnly(false);
		this.ed_nosk.setLength(100);
		this.ed_nosk.setTag("1");
		
		this.ed_ket = new controls_saiLabelEdit(this);
		this.ed_ket.setLeft(450);
		this.ed_ket.setTop(120);
		this.ed_ket.setWidth(250);
		this.ed_ket.setCaption("Keterangan");
		this.ed_ket.setText("");
		this.ed_ket.setReadOnly(false);
		this.ed_ket.setLength(100);
		this.ed_ket.setTag("1");
		
		uses("controls_button");
		this.bhistory = new controls_button(this);
		this.bhistory.setTop(172);
		this.bhistory.setLeft(20);
		this.bhistory.setCaption("History");
		this.bhistory.setIcon("url(icon/"+page.getThemes()+"/process.png)");
		
		uses('controls_panel');
	    this.p1 = new controls_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(197);
	    this.p1.setWidth(1004);
	    this.p1.setHeight(217);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat Kedinasan');
		
		uses("controls_saiSG");
		this.sg1 = new controls_saiSG(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(1000);
		this.sg1.setHeight(194);			
		this.sg1.setColCount(9);
		this.sg1.setTag("9");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(new Array("Tgl Awal","Divisi","Lokasi Kerja","Status","Grade","Jabatan","Tgl SK","Nomor SK","Keterangan"));
		this.sg1.onChange.set(this,"sg1onChange");	
		this.sg1.onDblClick.set(this, "sg1onDblClick");
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_lokasi.onBtnClick.set(this, "FindBtnClick");
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.cb_loker.onBtnClick.set(this, "FindBtnClick");
		this.bhistory.onClick.set(this,"showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.ed_divisi.onBtnClick.set(this, "FindBtnClick");
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
window.GUI_sdm_transaksi_fHRDinas.extend(window.controls_childForm);

window.GUI_sdm_transaksi_fHRDinas.prototype.sg1init = function(sg)
{
	sg.setColWidth(new Array(8,7,6,5,4,3,2,1,0),
					new Array(150,100,80,150,80,100,150,80,80));
}

window.GUI_sdm_transaksi_fHRDinas.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{			
		setTipeButton(tbUbahHapus);
		var dt=this.sg1.getCell(0,row).split("/");
		var dtawal=dt[2]+"-"+dt[1]+"-"+dt[0];
		dt=this.sg1.getCell(6,row).split("/");
		var dtakhir=dt[2]+"-"+dt[1]+"-"+dt[0];
		var data = this.dbLib.runSQL("select no_urut,tgl_berlaku,tgl_sk "+
									 "from hr_dinas "+
									 "where nik='"+this.ed_kode.getText()+"' and tgl_berlaku='"+dtawal+"' and tgl_sk='"+dtakhir+
									 "' and loker='"+this.sg1.cells(1,row)+"' and status='"+this.sg1.cells(3,row)+ 
									 "' and grade='"+this.sg1.cells(4,row)+"' and jabatan='"+this.sg1.cells(5,row)+
									 "' and no_sk='"+this.sg1.cells(7,row)+"' and keterangan='"+this.sg1.cells(8,row)+"'");

		if (data instanceof controls_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				line = data.get(0);		
				this.nourut=parseInt(line.get("no_urut"));
				this.dp_tglawal.setDateString(line.get("tgl_berlaku"));
				this.ed_divisi.setText(this.sg1.cells(1,row));
				this.ed_divisi.setRightLabelCaption(this.sg1.cells(2,row));
				this.ed_status.setText(this.sg1.cells(3,row));
				this.ed_grade.setText(this.sg1.cells(4,row));
				this.ed_jabatan.setText(this.sg1.cells(5,row));
				this.dp_tglsk.setDateString(line.get("tgl_sk"));
				this.ed_nosk.setText(this.sg1.cells(7,row));
				this.ed_ket.setText(this.sg1.cells(8,row));
			}
		}
	}catch(e)
	{
		page.alert(this, e,"");
	}
}

window.GUI_sdm_transaksi_fHRDinas.prototype.mainButtonClick = function(sender)
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
window.GUI_sdm_transaksi_fHRDinas.prototype.doModalResult = function(event, modalResult)
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
					var data = this.dbLib.runSQL("select max(no_urut) as maks from hr_dinas where nik='"+this.ed_kode.getText()+"' ");
					if (data instanceof controls_arrayMap)
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
					sql.add("insert into hr_dinas (nik,tgl_berlaku,loker,status,grade,jabatan,tgl_sk,no_sk,keterangan,user_id,tgl_input,no_urut) values ('"+this.ed_kode.getText()+"','"+this.dp_tglawal.getDate()+"','"+this.ed_divisi.getText()+"','"+this.ed_status.getText()+"','"+this.ed_grade.getText()+"','"+this.ed_jabatan.getText()+"','"+this.dp_tglsk.getDate()+"','"+this.ed_nosk.getText()+"','"+this.ed_ket.getText()+"','"+this.app._userLog+"','"+tgl.getFullYear()+"-"+tgl.getBln()+"-"+tgl.getDate()+"',"+this.nourut+")");
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
					sql.add("update hr_dinas set tgl_berlaku='"+this.dp_tglawal.getDate()+"',loker='"+this.ed_divisi.getText()+
					"',status='"+this.ed_status.getText()+"',grade='"+this.ed_grade.getText()+
					"',jabatan='"+this.ed_jabatan.getText()+"',tgl_sk='"+this.dp_tglsk.getDate()+
					"',no_sk='"+this.ed_nosk.getText()+"',keterangan='"+this.ed_ket.getText()+
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
				sql.add("delete from hr_dinas where nik='"+this.ed_kode.getText()+"' and no_urut="+this.nourut);
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
}

window.GUI_sdm_transaksi_fHRDinas.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.ed_kode.getText() != "")
		{
			try
			{			
				var data = this.dbLib.runSQL("select b.tgl_berlaku,b.loker,c.nama,b.status,b.grade,b.jabatan,b.tgl_sk,b.no_sk,b.keterangan "+
											 "from hr_dinas b inner join hr_loker c on b.loker=c.kode_loker "+
											 "where b.nik='"+this.ed_kode.getText()+"' order by b.tgl_berlaku desc ");

				if (data instanceof controls_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.clear();
						this.sg1.setData(data);										
						this.sg1init(this.sg1);
						for (var i=0;i < this.sg1.getRowCount();i++)
						{
							var dt=this.sg1.getCell(0,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(0,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
							dt=this.sg1.getCell(6,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(6,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
						}
					} else
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

window.GUI_sdm_transaksi_fHRDinas.prototype.FindBtnClick = function(sender, event)
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
		if (sender == this.ed_divisi) 
		{
			this.standarLib.showListData(this, "Daftar Divisi",this.ed_divisi,undefined, 
										  "select kode_loker, nama  from hr_loker where tipe= 'posting'",
										  "select count(kode_loker) from hr_loker where tipe= 'posting' ",
										  new Array("kode_loker","nama"),"and",new Array("Kode","Lokasi Kerja"),false);
		}
	}catch(e)
	{
		alert(e);
	}
}

window.GUI_sdm_transaksi_fHRDinas.prototype.doRequestReady = function(sender, methodName, result)
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

