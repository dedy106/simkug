window.app_saku_sdm_transaksi_fHRplafon = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRplafon.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRplafon";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Plafon Kesehatan Pegawai: Input/Koreksi", 0);	

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
		
		uses("portalui_saiLabelEdit");
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(450);
		this.ed_nama.setLength(100);
		this.ed_nama.setReadOnly(true);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setTag("1");
		
		this.cb_jenis = new portalui_saiCBBL(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(54);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.setLabelWidth(100);
		this.cb_jenis.setRightLabelVisible(true);
		this.cb_jenis.setReadOnly(true);
		this.cb_jenis.setCaption("Jenis Medic");
		this.cb_jenis.setText("");
		this.cb_jenis.setRightLabelCaption("");
		this.cb_jenis.setTag("1");
		
		this.ed_tahun = new portalui_saiLabelEdit(this);
		this.ed_tahun.setLeft(20);
		this.ed_tahun.setTop(76);
		this.ed_tahun.setWidth(180);
		this.ed_tahun.setLabelWidth(100);
		this.ed_tahun.setLength(4);
		this.ed_tahun.setReadOnly(false);
		this.ed_tahun.setTipeText(ttAngka);
		this.ed_tahun.setAlignment(alRight);
		this.ed_tahun.setCaption("Tahun");
		this.ed_tahun.setText("");
		this.ed_tahun.setTag("2");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(98);
		this.ed_nilai.setWidth(180);
		this.ed_nilai.setLabelWidth(100);
		this.ed_nilai.setLength(15);
		this.ed_nilai.setReadOnly(false);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Plafon");
		this.ed_nilai.setText("0");
		this.ed_nilai.setTag("1");
		
		this.ed_persen = new portalui_saiLabelEdit(this);
		this.ed_persen.setLeft(20);
		this.ed_persen.setTop(120);
		this.ed_persen.setWidth(180);
		this.ed_persen.setLabelWidth(100);
		this.ed_persen.setLength(15);
		this.ed_persen.setReadOnly(false);
		this.ed_persen.setTipeText(ttNilai);
		this.ed_persen.setAlignment(alRight);
		this.ed_persen.setCaption("% Penggantian");
		this.ed_persen.setText("0");
		this.ed_persen.setTag("1");
		
		uses("portalui_button");
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(120);
		this.bhistory.setLeft(873);
		this.bhistory.setCaption("Tampil");
		
		uses('portalui_panel');
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(142);
	    this.p1.setWidth(930);
	    this.p1.setHeight(330);
	    this.p1.setName('p1');
	    this.p1.setCaption('Data Plafon');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(300);			
		this.sg1.setColCount(6);
		this.sg1.setTag("1");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(new Array("NIK","Nama","Jenis","Tahun","Nilai Plafon","% Penggantian"));
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
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
			
			this.ed_tahun.setText(this.app._periode.substr(0,4));
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


window.app_saku_sdm_transaksi_fHRplafon.extend(window.portalui_childForm);
window.app_saku_sdm_transaksi_fHRplafon.prototype.sg1init = function(sg)
{
	sg.setColWidth(new Array(5,4,3,2,1,0),
					new Array(100,100,100,200,300,100));
}

window.app_saku_sdm_transaksi_fHRplafon.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var data = this.dbLib.runSQL("select a.kode_medic,b.nama as nama_medic,a.tahun,a.nilai,a.persen "+
									 "from hr_plafon a inner join hr_medic_m b on a.kode_medic=b.kode_medic and a.kode_lokkonsol = b.kode_lokkonsol "+
									 "where a.nik='"+this.sg1.cells(0,row)+"' and a.kode_lokkonsol = '"+this.lokkonsol+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.cb_nik.setText(this.sg1.cells(0,row));
				this.ed_nama.setText(this.sg1.cells(1,row));
				this.cb_jenis.setText(line.get("kode_medic"));
				this.cb_jenis.setRightLabelCaption(line.get("nama_medic"));
				this.ed_tahun.setText(line.get("tahun"));
				this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
				this.ed_persen.setText(floatToNilai(parseFloat(line.get("persen"))));
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

window.app_saku_sdm_transaksi_fHRplafon.prototype.mainButtonClick = function(sender)
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
window.app_saku_sdm_transaksi_fHRplafon.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2"),this.cb_nik);
				this.ed_tahun.setText(this.app._periode.substr(0,4));
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
					sql.add("insert into hr_plafon (nik,kode_medic,tahun,nilai,persen, "+
					        "                       kode_lokkonsol,user_id,tgl_input) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.cb_jenis.getText()+"','"+this.ed_tahun.getText()+"',"+
										parseNilai(this.ed_nilai.getText())+","+parseNilai(this.ed_persen.getText())+",'"+
										this.lokkonsol+"','"+this.app._userLog+"',now())");
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
					sql.add("update hr_plafon set nilai="+parseNilai(this.ed_nilai.getText())+",persen="+parseNilai(this.ed_persen.getText())+",user_id='"+this.app._userLog+"',tgl_input=now() "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and kode_medic = '"+this.cb_jenis.getText()+"' and tahun='"+this.ed_tahun.getText()+"' ");
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
				sql.add(" delete from hr_plafon "+
						" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and kode_medic = '"+this.cb_jenis.getText()+"' and tahun='"+this.ed_tahun.getText()+"' ");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
}

window.app_saku_sdm_transaksi_fHRplafon.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.lokkonsol != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select a.nik,d.nama,b.nama as nama_medic,a.tahun,a.nilai,a.persen "+
									 "from hr_plafon a "+
									 "     inner join hr_medic_m b on a.kode_medic=b.kode_medic and a.kode_lokkonsol = b.kode_lokkonsol "+
									 "     inner join karyawan d on a.nik=d.nik and  a.kode_lokkonsol = d.kode_lokkonsol "+
									 "where a.kode_lokkonsol = '"+this.lokkonsol+"' ");

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
				page.alert(this, e,"");
			}
		}
	}
}

window.app_saku_sdm_transaksi_fHRplafon.prototype.FindBtnClick = function(sender, event)
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
		}
		if (sender == this.cb_jenis) 
		{
			this.standarLib.showListData(this, "Daftar Jenis Medic",sender,undefined, 
										  "select kode_medic, nama  from hr_medic_m where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_medic) from hr_medic_m where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_medic","nama"),"and",new Array("Kode Jenis","Deskripsi"),false);
		}
	}catch(e)
	{
		alert(e);
	}
}

window.app_saku_sdm_transaksi_fHRplafon.prototype.doRequestReady = function(sender, methodName, result)
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

