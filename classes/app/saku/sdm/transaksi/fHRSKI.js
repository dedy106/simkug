window.app_saku_sdm_transaksi_fHRSKI = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRSKI.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRSKI";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data SKI : Input/Koreksi", 0);	

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
		
		this.ed_tahun = new portalui_saiLabelEdit(this);
		this.ed_tahun.setLeft(20);
		this.ed_tahun.setTop(120);
		this.ed_tahun.setWidth(200);
		this.ed_tahun.setCaption("Tahun");
		this.ed_tahun.setText("");
		this.ed_tahun.setReadOnly(false);
		this.ed_tahun.setLength(100);
		this.ed_tahun.setTag("1");
		
		this.ed_avg = new portalui_saiLabelEdit(this);
		this.ed_avg.setLeft(20);
		this.ed_avg.setTop(142);
		this.ed_avg.setWidth(200);
		this.ed_avg.setCaption("Rata-rata DP3");
		this.ed_avg.setText("");
		this.ed_avg.setReadOnly(false);
		this.ed_avg.setLength(100);
		this.ed_avg.setTag("1");
		
		this.ed_ski = new portalui_saiLabelEdit(this);
		this.ed_ski.setLeft(20);
		this.ed_ski.setTop(164);
		this.ed_ski.setWidth(200);
		this.ed_ski.setCaption("Nilai SKI");
		this.ed_ski.setText("");
		this.ed_ski.setReadOnly(false);
		this.ed_ski.setLength(100);
		this.ed_ski.setTag("1");
		
		this.ed_kompetensi = new portalui_saiLabelEdit(this);
		this.ed_kompetensi.setLeft(20);
		this.ed_kompetensi.setTop(186);
		this.ed_kompetensi.setWidth(200);
		this.ed_kompetensi.setCaption("Kompetensi");
		this.ed_kompetensi.setText("");
		this.ed_kompetensi.setReadOnly(false);
		this.ed_kompetensi.setLength(100);
		this.ed_kompetensi.setTag("1");
		
		this.ed_ket = new portalui_saiLabelEdit(this);
		this.ed_ket.setLeft(20);
		this.ed_ket.setTop(208);
		this.ed_ket.setWidth(250);
		this.ed_ket.setCaption("Keterangan");
		this.ed_ket.setText("");
		this.ed_ket.setReadOnly(false);
		this.ed_ket.setLength(100);
		this.ed_ket.setTag("1");
		
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
	    this.p1.setWidth(524);
	    this.p1.setHeight(217);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat SKI');
		
		uses("portalui_saiSG");
		this.sg1 = new portalui_saiSG(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(520);
		this.sg1.setHeight(194);			
		this.sg1.setColCount(5);
		this.sg1.setTag("9");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(new Array("Tahun","Rata-rata DP3","Nilai SKI","Kompetensi","Keterangan"));
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
window.app_saku_sdm_transaksi_fHRSKI.extend(window.portalui_childForm);

window.app_saku_sdm_transaksi_fHRSKI.prototype.sg1init = function(sg)
{
	sg.setColWidth(new Array(4,3,2,1,0),
					new Array(100,100,100,100,80));	
}

window.app_saku_sdm_transaksi_fHRSKI.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{			
		setTipeButton(tbUbahHapus);
		var data = this.dbLib.runSQL("select no_urut "+
									 "from hr_ski "+
									 "where nik='"+this.ed_kode.getText()+"' and tahun='"+this.sg1.cells(0,row)+
									 "' and avg='"+this.sg1.cells(1,row)+"' and nilai_ski='"+this.sg1.cells(2,row)+ 
									 "' and kompentensi='"+this.sg1.cells(3,row)+"' and keterangan='"+this.sg1.cells(4,row)+"'");
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				line = data.get(0);		
				this.nourut=parseInt(line.get("no_urut"));
				this.ed_tahun.setText(this.sg1.cells(0,row));
				this.ed_avg.setText(this.sg1.cells(1,row));
				this.ed_ski.setText(this.sg1.cells(2,row));
				this.ed_kompetensi.setText(this.sg1.cells(3,row));
				this.ed_ket.setText(this.sg1.cells(4,row));
			}
		}
	}catch(e)
	{
		page.alert(this, e,"");
	}
}

window.app_saku_sdm_transaksi_fHRSKI.prototype.mainButtonClick = function(sender)
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
window.app_saku_sdm_transaksi_fHRSKI.prototype.doModalResult = function(event, modalResult)
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
					var data = this.dbLib.runSQL("select max(no_urut) as maks from hr_ski where nik='"+this.ed_kode.getText()+"' ");
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
					sql.add("insert into hr_ski (nik,tahun,avg,nilai_ski,kompentensi,keterangan,user_id,tgl_input,no_urut) values ('"+this.ed_kode.getText()+"','"+this.ed_tahun.getText()+"','"+this.ed_avg.getText()+"','"+this.ed_ski.getText()+"','"+this.ed_kompetensi.getText()+"','"+this.ed_ket.getText()+"','"+this.app._userLog+"','"+tgl.getFullYear()+"-"+tgl.getBln()+"-"+tgl.getDate()+"',"+this.nourut+")");
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
					sql.add("update hr_ski set tahun='"+this.ed_tahun.getText()+"',avg='"+this.ed_avg.getText()+
					"',nilai_ski='"+this.ed_ski.getText()+"',kompentensi='"+this.ed_kompetensi.getText()+
					"',keterangan='"+this.ed_ket.getText()+
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
				sql.add("delete from hr_ski where nik='"+this.ed_kode.getText()+"' and no_urut="+this.nourut);
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
}

window.app_saku_sdm_transaksi_fHRSKI.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.ed_kode.getText() != "")
		{
			try
			{			
				var data = this.dbLib.runSQL("select tahun,avg,nilai_ski,kompentensi,keterangan "+
											 "from hr_ski "+
											 "where nik='"+this.ed_kode.getText()+"' order by tahun desc");

				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.clear();
						this.sg1.setData(data);										
						this.sg1init(this.sg1);
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

window.app_saku_sdm_transaksi_fHRSKI.prototype.FindBtnClick = function(sender, event)
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

window.app_saku_sdm_transaksi_fHRSKI.prototype.doRequestReady = function(sender, methodName, result)
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

