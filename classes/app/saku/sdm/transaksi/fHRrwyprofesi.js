window.app_saku_sdm_transaksi_fHRrwyprofesi = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRrwyprofesi";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Profesi Pegawai: Input/Koreksi", 0);	

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
		
		this.ed_nosk = new portalui_saiCBBL(this);
		this.ed_nosk.setLeft(20);
		this.ed_nosk.setTop(98);
		this.ed_nosk.setWidth(350);
		this.ed_nosk.setLength(50);
		this.ed_nosk.setReadOnly(false);
		this.ed_nosk.setRightLabelVisible(false);
		this.ed_nosk.setCaption("Nomor SK");
		this.ed_nosk.setText("");
		this.ed_nosk.setTag("1");
		this.ed_nosk.onBtnClick.set(this,"FindBtnClick");
		this.ed_nosk.onChange.set(this,"doChange");
		
		uses("portalui_checkBox");
		this.cb1 = new portalui_checkBox(this);
		this.cb1.setLeft(375);
		this.cb1.setTop(105);
		this.cb1.setWidth(100);
		this.cb1.setCaption("Data Aktif");
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(120);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setUnderLine(true);
		this.lbltgl1.setCaption("Tanggal SK");
		
		uses("portalui_datePicker");	
		this.dp_tglsk = new portalui_datePicker(this);
		this.dp_tglsk.setTop(122);
		this.dp_tglsk.setLeft(120);
		this.dp_tglsk.setWidth(82);
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(142);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setUnderLine(true);
		this.lbltgl2.setCaption("Tgl Berlaku SK");
		
		this.dp_tglskmulai = new portalui_datePicker(this);
		this.dp_tglskmulai.setTop(144);
		this.dp_tglskmulai.setLeft(120);
		this.dp_tglskmulai.setWidth(82);
		
		this.cb_profesi1 = new portalui_saiCBBL(this);
		this.cb_profesi1.setLeft(20);
		this.cb_profesi1.setTop(164);
		this.cb_profesi1.setWidth(185);
		this.cb_profesi1.setLabelWidth(100);
		this.cb_profesi1.setRightLabelVisible(true);
		this.cb_profesi1.setCaption("Profesi Lama");
		this.cb_profesi1.setText("");
		this.cb_profesi1.setRightLabelCaption("");
		this.cb_profesi1.setTag("1");
		
		this.cb_profesi2 = new portalui_saiCBBL(this);
		this.cb_profesi2.setLeft(20);
		this.cb_profesi2.setTop(186);
		this.cb_profesi2.setWidth(185);
		this.cb_profesi2.setLabelWidth(100);
		this.cb_profesi2.setRightLabelVisible(true);
		this.cb_profesi2.setCaption("Profesi Baru");
		this.cb_profesi2.setText("");
		this.cb_profesi2.setRightLabelCaption("");
		this.cb_profesi2.setTag("1");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(208);
		this.ed_desc.setWidth(350);
		this.ed_desc.setLabelWidth(100);
		this.ed_desc.setLength(100);
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setCaption("Keterangan");
		this.ed_desc.setText("");
		this.ed_desc.setTag("1");
		
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(208);
		this.bhistory.setLeft(873);
		this.bhistory.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(230);
	    this.p1.setWidth(930);
	    this.p1.setHeight(238);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat Profesi');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(213);			
		this.sg1.setColCount(7);
		this.sg1.setTag("2");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["Nomor SK","Tgl SK","Tgl Berlaku","Profesi Lama","Profesi Baru","Keterangan","Status Aktif"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		//this.cb_nik.onChange.set(this, "doEditChange");
		this.cb_profesi1.onBtnClick.set(this, "FindBtnClick");
		this.cb_profesi2.onBtnClick.set(this, "FindBtnClick");
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
			
			this.cb1.setSelected(true);
			this.lokkonsol = this.app._lokKonsol;
			this.sg1.clear(1); 
			this.cb_profesi1.setSQL("select kode_profesi, nama  from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",["kode_profesi","nama"]);
			this.cb_profesi2.setSQL("select kode_profesi, nama  from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",["kode_profesi","nama"]);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sdm_transaksi_fHRrwyprofesi.extend(window.portalui_childForm);
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.sg1init = function(sg)
{
	sg.setColWidth([6,5,4,3,2,1,0],
					[80,220,200,200,80,80,120]);
};
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var data = this.dbLib.runSQL("select a.no_sk,a.tgl_sk,a.tgl_skmulai,a.kode_profesi1,a.kode_profesi2,a.keterangan, "+
		                             "       b.nama as nama_prof1, c.nama as nama_prof2, a.status_aktif "+
									 "from hr_rwyprofesi a "+
									 "                inner join hr_profesi b on a.kode_profesi1 = b.kode_profesi and a.kode_lokkonsol = b.kode_lokkonsol "+
									 "                inner join hr_profesi c on a.kode_profesi2 = c.kode_profesi and a.kode_lokkonsol = c.kode_lokkonsol "+
									 "where a.no_sk='"+this.sg1.cells(0,row)+"' and a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.ed_nosk.setText(line.get("no_sk"));
				this.dp_tglsk.setDateString(line.get("tgl_sk"));
				this.dp_tglskmulai.setDateString(line.get("tgl_skmulai"));
				this.cb_profesi1.setText(line.get("kode_profesi1"));
				this.cb_profesi1.setRightLabelCaption(line.get("nama_prof1"));
				this.cb_profesi2.setText(line.get("kode_profesi2"));
				this.cb_profesi2.setRightLabelCaption(line.get("nama_prof2"));
				this.ed_desc.setText(line.get("keterangan"));
				this.cb1.setSelected(line.get("status_aktif") == '0'? false:true);	
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
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.doEditChange = function(sender)
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
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.mainButtonClick = function(sender)
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
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.doModalResult = function(event, modalResult)
{			
	var stsAktif = "0";
    if (this.cb1.isSelected()) stsAktif = "1";
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2"),this.cb_nik);
				this.sg1.clear(1); 
				this.cb1.setSelected(true);
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
					if (stsAktif == "1")
						sql.add("update hr_rwyprofesi set status_aktif = '0' where no_sk<>'"+this.ed_nosk.getText()+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");					
					sql.add("insert into hr_rwyprofesi (nik,no_sk,tgl_sk,tgl_skmulai,kode_profesi1,kode_profesi2,keterangan,"+
					        "                          kode_lokkonsol,user_id,tgl_input, status_aktif ) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							            this.dp_tglskmulai.getDate()+"','"+this.cb_profesi1.getText()+"','"+this.cb_profesi2.getText()+"','"+
										this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'"+stsAktif+"')");
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
					if (stsAktif == "1")
						sql.add("update hr_rwyprofesi set status_aktif = '0' where no_sk<>'"+this.ed_nosk.getText()+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");					
					sql.add("update hr_rwyprofesi set tgl_sk='"+this.dp_tglsk.getDate()+"',tgl_skmulai='"+this.dp_tglskmulai.getDate()+"',"+
					        "kode_profesi1='"+this.cb_profesi1.getText()+"',kode_profesi2='"+this.cb_profesi2.getText()+"' "+
							",keterangan='"+this.ed_desc.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now(),status_aktif = '"+stsAktif+"' "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and no_sk='"+this.ed_nosk.getText()+"' ");
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
				sql.add("delete from hr_rwyprofesi where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_sk='"+this.ed_nosk.getText()+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.show2Click = function(sender)
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
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select a.no_sk,f.tgl_sk,f.tgl_berlaku as tgl_skmulai,b.nama as nama_prof1,c.nama as nama_prof2,a.keterangan,a.status_aktif "+
											 "from hr_rwyprofesi a "+
											 "             inner join hr_profesi b on a.kode_profesi1=b.kode_profesi and a.kode_lokkonsol = b.kode_lokkonsol "+
											 "             inner join hr_profesi c on a.kode_profesi2=c.kode_profesi and a.kode_lokkonsol = c.kode_lokkonsol "+
											 "	 inner join hr_sk f on f.no_sk = a.no_sk and f.kode_lokkonsol = a.kode_lokkonsol "+
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
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.cb_nik,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
			this.sg1.clear(1);
		}
		if (sender == this.cb_profesi1) 
		{
			this.standarLib.showListData(this, "Daftar Profesi Pegawai Lama",sender,undefined, 
										  "select kode_profesi, nama  from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_profesi) from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_profesi","nama"),"and",new Array("Kode Profesi","Deskripsi"),false);
		}
		if (sender == this.cb_profesi2) 
		{
			this.standarLib.showListData(this, "Daftar Profesi Pegawai Baru",sender,undefined, 
										  "select kode_profesi, nama  from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_profesi) from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_profesi","nama"),"and",new Array("Kode Profesi","Deskripsi"),false);
		}
		if (sender == this.ed_nosk) 
		{
			this.standarLib.showListData(this, "Daftar SK Pegawai",sender,undefined, 
										  "select no_sk, keterangan, tgl_sk, tgl_berlaku  from hr_sk where kode_lokkonsol='"+this.lokkonsol+"' and nik ='"+this.cb_nik.getText()+"' ",
										  "select count(no_sk) from hr_sk where kode_lokkonsol='"+this.lokkonsol+"' and nik ='"+this.cb_nik.getText()+"'",
										  ["no_sk","ketetangan","tgl_sk","tgl_berlaku"],"and",["No SK","Keterangan","Tgl SK","Tgl Berlaku"],false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_sdm_transaksi_fHRrwyprofesi.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_sdm_transaksi_fHRrwyprofesi.implement({
	doChange: function(sender){
		if (sender == this.ed_nosk){
			try{
				var data = this.dbLib.getDataProvider("select tgl_sk, tgl_mulai, tgl_berlaku, datediff(now(),tgl_mulai) as jmlhari  from hr_sk where kode_lokkonsol = '"+this.app._lokKonsol+"' and nik = '"+this.cb_nik.getText()+"' and no_sk ='"+this.ed_nosk.getText()+"' ",true);			
				if (data.rs.rows[0] !== undefined){
					this.dp_tglsk.setText(data.rs.rows[0].tgl_sk);
					this.dp_tglskmulai.setText(data.rs.rows[0].tgl_berlaku);					
				}
			}catch(e){
				alert(e);
			}
		}		
	}
});
