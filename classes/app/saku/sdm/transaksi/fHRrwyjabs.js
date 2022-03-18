window.app_saku_sdm_transaksi_fHRrwyjabs = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRrwyjabs";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Jabatan Struktural: Input/Koreksi", 0);	

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
		
		this.ed_tingkat = new portalui_saiLabelEdit(this);
		this.ed_tingkat.setLeft(20);
		this.ed_tingkat.setTop(164);
		this.ed_tingkat.setWidth(180);
		this.ed_tingkat.setLength(10);
		this.ed_tingkat.setReadOnly(false);
		this.ed_tingkat.setCaption("Tingkat");
		this.ed_tingkat.setText("");
		this.ed_tingkat.setTag("1");
		
		this.ed_jabslama = new portalui_saiLabelEdit(this);
		this.ed_jabslama.setLeft(20);
		this.ed_jabslama.setTop(186);
		this.ed_jabslama.setWidth(300);
		this.ed_jabslama.setLabelWidth(100);
		this.ed_jabslama.setLength(100);
		this.ed_jabslama.setReadOnly(false);
		this.ed_jabslama.setCaption("Jabatan Lama");
		this.ed_jabslama.setText("");
		this.ed_jabslama.setTag("1");
		
		this.ed_jabsbaru = new portalui_saiLabelEdit(this);
		this.ed_jabsbaru.setLeft(500);
		this.ed_jabsbaru.setTop(120);
		this.ed_jabsbaru.setWidth(300);
		this.ed_jabsbaru.setLabelWidth(120);
		this.ed_jabsbaru.setLength(100);
		this.ed_jabsbaru.setReadOnly(false);
		this.ed_jabsbaru.setCaption("Jabatan Baru");
		this.ed_jabsbaru.setText("");
		this.ed_jabsbaru.setTag("1");
		
		this.cb_jab = new portalui_saiCBBL(this);
		this.cb_jab.setLeft(500);
		this.cb_jab.setTop(142);
		this.cb_jab.setWidth(205);
		this.cb_jab.setLabelWidth(120);
		this.cb_jab.setRightLabelVisible(true);
		this.cb_jab.setCaption("Setingkat");
		this.cb_jab.setText("");
		this.cb_jab.setRightLabelCaption("");
		this.cb_jab.setTag("1");
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(500);
		this.cb_pp.setTop(164);
		this.cb_pp.setWidth(205);
		this.cb_pp.setLabelWidth(120);
		this.cb_pp.setCaption("Lokasi Kerja");
		this.cb_pp.setText("");
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		this.cb_pp.setTag("1");
		
		this.cb_loker = new portalui_saiCBBL(this);
		this.cb_loker.setLeft(500);
		this.cb_loker.setTop(186);
		this.cb_loker.setWidth(205);
		this.cb_loker.setLabelWidth(120);
		this.cb_loker.setCaption("Unit Kerja");
		this.cb_loker.setText("");
		this.cb_loker.setRightLabelVisible(true);
		this.cb_loker.setRightLabelCaption("");
		this.cb_loker.setTag("1");
		
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(186);
		this.bhistory.setLeft(873);
		this.bhistory.setCaption("Tampil");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(208);
	    this.p1.setWidth(930);
	    this.p1.setHeight(260);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat Jabatan Struktural');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(235);			
		this.sg1.setColCount(10);
		this.sg1.setTag("2");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["Nomor SK","Tgl SK","Tgl Berlaku","Tingkat","Jabatan Lama","Jabatan Baru","Setingkat","Loker","Unit Krj","Status Aktif"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.lokkonsol= this.app._lokKonsol;			
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		this.cb_nik.setSQL("select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"]);         
        this.cb_nik.onChange.set(this, "doEditChange");
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.cb_loker.onBtnClick.set(this, "FindBtnClick");
		this.cb_pp.setSQL("select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_lokasi","nama"]);
		this.cb_loker.setSQL("select kode_loker, nama  from hr_loker where tipe= 'posting'",["kode_loker","nama"]);		
		this.cb_jab.onBtnClick.set(this, "FindBtnClick");
		this.cb_jab.setSQL("select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'STRUKTURAL'",["kode_jab","nama"]);
		//this.cb_jab2.onBtnClick.set(this, "FindBtnClick");
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
			this.sg1.clear(1); 
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sdm_transaksi_fHRrwyjabs.extend(window.portalui_childForm);
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.sg1init = function(sg)
{
	sg.setColWidth([9,8,7,6,5,4,3,2,1,0],
				[80,100,100,100,120,120,80,80,80,120]);
};
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		this.doLoadData(this.sg1.cells(0,row));
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.doEditChange = function(sender)
{
	if (this.cb_nik.getText() != "")
	{
		this.sg1.clear(1);
		this.ed_nosk.setSQL("select no_sk, keterangan, tgl_sk, tgl_berlaku  from hr_sk where kode_lokkonsol='"+this.lokkonsol+"' and nik ='"+this.cb_nik.getText()+"' ",["no_sk","keterangan"]);
        var line,data = this.dbLib.runSQL("select nama, alamat, tempat_lahir ,tgl_lahir "+
		                                  "from karyawan where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_nama.setText(line.get("nama"));
				this.ed_tmplahir.setText(line.get("tempat_lahir"));
				var dt=line.get("tgl_lahir").split(" ");
					dt=dt[0].split("-");
				this.ed_tgllahir.setText(dt[2]+"/"+dt[1]+"/"+dt[0]);							
				this.ed_alamat.setText(line.get("alamat"));
			}
		}		
	}
};
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.mainButtonClick = function(sender)
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
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.doModalResult = function(event, modalResult)
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
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0","1","9"])))
			{
				try
				{					
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					if (stsAktif == "1")
						sql.add("update hr_jabs set status_aktif = '0' where no_sk<>'"+this.ed_nosk.getText()+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
					sql.add("insert into hr_jabs (nik,no_sk,tgl_sk,tgl_skmulai,tingkat,jab_lama,jab_baru,kode_jabs,kode_lokasi,"+
					        "                     kode_loker,kode_lokkonsol,user_id,tgl_input,status_aktif) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							            this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"','"+
										this.ed_jabslama.getText()+"','"+this.ed_jabsbaru.getText()+"','"+this.cb_jab.getText()+"',"+
										"'"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'"+stsAktif+"')");
					
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
						sql.add("update hr_jabs set status_aktif = '0' where no_sk<>'"+this.ed_nosk.getText()+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
					sql.add("update hr_jabs set tgl_sk='"+this.dp_tglsk.getDate()+"',tgl_skmulai='"+this.dp_tglskmulai.getDate()+"',"+
					        "tingkat='"+this.ed_tingkat.getText()+"',jab_lama='"+this.ed_jabslama.getText()+"',jab_baru='"+this.ed_jabsbaru.getText()+"',kode_jabs='"+this.cb_jab.getText()+
							"',kode_lokasi='"+this.cb_pp.getText()+"',"+
					        "kode_loker='"+this.cb_loker.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now(),status_aktif='"+stsAktif+"' "+
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
				sql.add("delete from hr_jabs where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_sk='"+this.ed_nosk.getText()+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.show2Click = function(sender)
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
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select a.no_sk,e.tgl_sk,e.tgl_berlaku as tgl_skmulai,a.tingkat,a.jab_lama,a.jab_baru,ifnull(d.nama,'-') as nama_jabs,"+
											 "       b.nama as nama_lokasi, c.nama as nama_loker,a.status_aktif "+
											 "from hr_jabs a "+
											 "            inner join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol = b.kode_lokkonsol "+
											 "            left outer join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokkonsol = c.kode_lokkonsol "+
											 "	          inner join hr_sk e on e.no_sk = a.no_sk and e.kode_lokkonsol = a.kode_lokkonsol and e.nik = a.nik  "+
											 "            left outer join hr_jabatan d on a.kode_jabs=d.kode_jab and a.kode_lokkonsol = d.kode_lokkonsol "+
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
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.cb_nik,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
			this.sg1.clear(1);
		}
		if (sender == this.cb_pp) 
		{
			this.standarLib.showListData(this, "Daftar Lokasi Kerja",this.cb_pp,undefined, 
										  "select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_lokasi) from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
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
		if (sender == this.cb_jab) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan Setingkat",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'STRUKTURAL'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'STRUKTURAL'",
										  new Array("kode_jab","nama"),"and",new Array("Kode","Deskripsi"),true);
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
window.app_saku_sdm_transaksi_fHRrwyjabs.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_sdm_transaksi_fHRrwyjabs.implement({
	doChange: function(sender){
		if (sender == this.ed_nosk){
			try{
				var data = this.dbLib.getDataProvider("select tgl_sk, tgl_mulai, tgl_berlaku, datediff(now(),tgl_mulai) as jmlhari  from hr_sk where kode_lokkonsol = '"+this.app._lokKonsol+"' and nik = '"+this.cb_nik.getText()+"' and no_sk = '"+sender.getText()+"'",true);			
				if (data.rs.rows[0] !== undefined){
					this.dp_tglsk.setText(data.rs.rows[0].tgl_sk);
					this.dp_tglskmulai.setText(data.rs.rows[0].tgl_berlaku);					
					this.doLoadData(sender.getText());
				}
			}catch(e){
				alert(e);
			}
		}		
	},
	doLoadData: function(sk){
        var data = this.dbLib.runSQL("select a.no_sk,a.tgl_sk,a.tgl_skmulai,a.tingkat,a.jab_lama,a.jab_baru,a.kode_jabs,"+
		                             "       a.kode_lokasi,a.kode_loker, "+
		                             "       b.nama as nama_lokasi, c.nama as nama_loker, ifnull(d.nama,'-') as nama_jabs, a.status_aktif "+
									 "from hr_jabs a inner join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol = b.kode_lokkonsol "+
									 "                 inner join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokkonsol = c.kode_lokkonsol "+
									 "                 left outer join hr_jabatan d on a.kode_jabs=d.kode_jab and a.kode_lokkonsol = d.kode_lokkonsol "+
									 "where a.no_sk='"+sk+"' and a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.ed_nosk.onChange.set(undefined, undefined);
				this.ed_nosk.setText(line.get("no_sk"));
				this.ed_nosk.onChange.set(this,"doChange");
				this.dp_tglsk.setDateString(line.get("tgl_sk"));
				this.dp_tglskmulai.setDateString(line.get("tgl_skmulai"));
				this.ed_tingkat.setText(line.get("tingkat"));
				this.cb_jab.setText(line.get("kode_jabs"));
				this.cb_jab.setRightLabelCaption(line.get("nama_jabs"));
				this.ed_jabslama.setText(line.get("jab_lama"));
				this.ed_jabsbaru.setText(line.get("jab_baru"));
				this.cb_pp.setText(line.get("kode_lokasi"));
				this.cb_pp.setRightLabelCaption(line.get("nama_lokasi"));
				this.cb_loker.setText(line.get("kode_loker"));
				this.cb_loker.setRightLabelCaption(line.get("nama_loker"));
				this.cb1.setSelected(line.get("status_aktif") == '0'? false:true);	
			}
			else
			{
				setTipeButton(tbSimpan);
			}
		}
    }
});
