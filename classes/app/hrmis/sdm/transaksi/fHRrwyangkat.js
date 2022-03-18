window.app_hrmis_sdm_transaksi_fHRrwyangkat = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_transaksi_fHRrwyangkat";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Pegangkatan Pegawai: Input/Koreksi", 0);	

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
		
		this.lbltgl3 = new portalui_label(this);
		this.lbltgl3.setTop(164);
		this.lbltgl3.setLeft(20);
		this.lbltgl3.setWidth(101);		
		this.lbltgl3.setHeight(20);		
		this.lbltgl3.setUnderLine(true);
		this.lbltgl3.setCaption("Tgl Mulai Bekerja");
		
		this.dp_tglawal = new portalui_datePicker(this);
		this.dp_tglawal.setTop(166);
		this.dp_tglawal.setLeft(120);
		this.dp_tglawal.setWidth(82);
		
		this.cb_jenjang = new portalui_saiCB(this);
		this.cb_jenjang.setTop(186);
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
		this.ed_jurusan.setTop(208);
		this.ed_jurusan.setWidth(350);
		this.ed_jurusan.setLength(50);
		this.ed_jurusan.setReadOnly(false);
		this.ed_jurusan.setCaption("Jurusan");
		this.ed_jurusan.setText("");
		this.ed_jurusan.setTag("1");

		//-----
		this.ed_pangkal = new portalui_saiLabelEdit(this);
		this.ed_pangkal.setLeft(500);
		this.ed_pangkal.setTop(76);
		this.ed_pangkal.setWidth(150);
		this.ed_pangkal.setLabelWidth(120);
		this.ed_pangkal.setLength(10);
		this.ed_pangkal.setReadOnly(false);
		this.ed_pangkal.setCaption("Pangkal Tingkat");
		this.ed_pangkal.setText("");
		this.ed_pangkal.setTag("1");
		
		this.ed_tingkat = new portalui_saiLabelEdit(this);
		this.ed_tingkat.setLeft(500);
		this.ed_tingkat.setTop(98);
		this.ed_tingkat.setWidth(150);
		this.ed_tingkat.setLabelWidth(120);
		this.ed_tingkat.setLength(10);
		this.ed_tingkat.setReadOnly(false);
		this.ed_tingkat.setCaption("Tingkat");
		this.ed_tingkat.setText("");
		this.ed_tingkat.setTag("1");
		
		this.ed_tahun = new portalui_saiLabelEdit(this);
		this.ed_tahun.setLeft(500);
		this.ed_tahun.setTop(120);
		this.ed_tahun.setWidth(150);
		this.ed_tahun.setLabelWidth(120);
		this.ed_tahun.setReadOnly(false);
		this.ed_tahun.setTipeText(ttAngka);
		this.ed_tahun.setAlignment(alRight);
		this.ed_tahun.setCaption("Masa Kerja [Thn - Bln]");
		this.ed_tahun.setText("0");
		this.ed_tahun.setTag("1");
		
		this.ed_bulan = new portalui_saiLabelEdit(this);
		this.ed_bulan.setLeft(670);
		this.ed_bulan.setTop(120);
		this.ed_bulan.setWidth(30);
		this.ed_bulan.setLabelWidth(0);
		this.ed_bulan.setReadOnly(false);
		this.ed_bulan.setTipeText(ttAngka);
		this.ed_bulan.setAlignment(alRight);
		this.ed_bulan.setText("0");
		this.ed_bulan.setCaption("");
		this.ed_bulan.setTag("1");
		
		this.ed_gaji = new portalui_saiLabelEdit(this);
		this.ed_gaji.setLeft(500);
		this.ed_gaji.setTop(142);
		this.ed_gaji.setWidth(200);
		this.ed_gaji.setLabelWidth(120);
		this.ed_gaji.setLength(15);
		this.ed_gaji.setReadOnly(false);
		this.ed_gaji.setTipeText(ttNilai);
		this.ed_gaji.setAlignment(alRight);
		this.ed_gaji.setCaption("Gaji Dasar");
		this.ed_gaji.setText("0");
		this.ed_gaji.setTag("1");
		
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
				
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(500);
		this.ed_desc.setTop(208);
		this.ed_desc.setWidth(350);
		this.ed_desc.setLabelWidth(120);
		this.ed_desc.setLength(150);
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
	    this.p1.setHeight(235);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat Pengangkatan');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(210);			
		this.sg1.setColCount(15);
		this.sg1.setTag("2");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["Nomor SK","Tgl SK","Tgl Berlaku","Tgl Mulai Kerja","Jenjang Pddkan","Jurusan","Pangkal Tk","Tingkat","Ms Krj (Tahun)","Ms Krj (Bulan)",
							"Gaji Dasar","Loker","Unit Kerja","Keterangan","Status Aktif"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.lokkonsol= this.app._lokKonsol;
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		this.cb_nik.setSQL("select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"]);         		
		this.cb_pp.onBtnClick.set(this, "FindBtnClick");
		this.cb_pp.setSQL("select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_lokasi","nama"]);
		this.cb_loker.setSQL("select kode_loker, nama  from hr_loker where tipe= 'posting'",["kode_loker","nama"]);		
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
			
			this.cb1.setSelected(true);			
			this.sg1.clear(1); 			
			this.cb_nik.onChange.set(this, "doEditChange");
    		this.ed_nosk.onChange.set(this, "doChange");
    		this.ed_pangkal.onChange.set(this, "doChange");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRrwyangkat.extend(window.portalui_childForm);
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.sg1init = function(sg)
{
	sg.setColWidth([14,13,12,11,10, 9,8,7,6,5,4,3,2,1,0],
				[80,100,80,80,80, 80,80,70,70,80,80,80,80,80,100]);
};
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		this.doLoadData(this.cb_nik.getText(), this.sg1.cells(0,row));
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.doEditChange = function(sender)
{
	if (this.cb_nik.getText() != "")
	{
		this.ed_nosk.setSQL("select no_sk, keterangan, tgl_sk, tgl_berlaku  from hr_sk where kode_lokkonsol='"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ",["no_sk","keterangan"]);
		var line,data = this.dbLib.runSQL("select alamat, tempat_lahir ,tgl_lahir,nama "+
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
	if (sender == this.ed_nosk){
	   
    }	
};
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.doModalResult = function(event, modalResult)
{			
	var stsAktif = "0";
    if (this.cb1.isSelected()) stsAktif = "1";
					
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","2"],this.cb_nik);
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
						sql.add("update hr_angkat set status_aktif = '0' where no_sk<>'"+this.ed_nosk.getText()+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
					
					sql.add("insert into hr_angkat (nik,no_sk,tgl_sk,tgl_skmulai,tgl_masuk,jenjang,jurusan,pangkal,tingkat,mk_tahun,mk_bulan,gadas,kode_lokasi,"+
					        "                       kode_loker,keterangan,kode_lokkonsol,user_id,tgl_input,status_aktif) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							            this.dp_tglskmulai.getDate()+"','"+this.dp_tglawal.getDate()+"','"+this.cb_jenjang.getText()+"','"+
										this.ed_jurusan.getText()+"','"+this.ed_pangkal.getText()+"','"+this.ed_tingkat.getText()+"',"+parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_bulan.getText())+","+
										parseNilai(this.ed_gaji.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"','"+
										this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'"+stsAktif+"')");
					sql.add("update karyawan set kode_lokasi = '"+this.cb_pp.getText()+"' where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"' ");
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
						sql.add("update hr_angkat set status_aktif = '0' where no_sk<>'"+this.ed_nosk.getText()+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"'");
						
					sql.add("update hr_angkat set tgl_sk='"+this.dp_tglsk.getDate()+"',tgl_skmulai='"+this.dp_tglskmulai.getDate()+"',tgl_masuk='"+this.dp_tglawal.getDate()+
					        "',jenjang='"+this.cb_jenjang.getText()+"',jurusan='"+this.ed_jurusan.getText()+"',pangkal='"+this.ed_pangkal.getText()+"',tingkat='"+this.ed_tingkat.getText()+"',mk_tahun="+parseNilai(this.ed_tahun.getText())+
							",mk_bulan="+parseNilai(this.ed_bulan.getText())+",gadas="+parseNilai(this.ed_gaji.getText())+",kode_lokasi='"+this.cb_pp.getText()+"',"+
					        "kode_loker='"+this.cb_loker.getText()+"',keterangan='"+this.ed_desc.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now(), status_aktif='"+stsAktif+"' "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					sql.add("update karyawan set kode_lokasi = '"+this.cb_pp.getText()+"' where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"' ");
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
				sql.add("delete from hr_angkat where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_sk='"+this.ed_nosk.getText()+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.show2Click = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select a.no_sk,a.tgl_sk,a.tgl_skmulai,a.tgl_masuk,a.jenjang,a.jurusan,a.pangkal,a.tingkat,"+
											 "       a.mk_tahun,a.mk_bulan,a.gadas,b.nama as nama_lokasi, c.nama as nama_loker,a.keterangan,a.status_aktif "+
											 "from hr_angkat a "+
											 "            inner join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol = b.kode_lokkonsol "+
											 "            left outer join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokkonsol = c.kode_lokkonsol "+
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
							
							dt=this.sg1.getCell(3,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(3,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
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
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.FindBtnClick = function(sender, event)
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
										  "select count(kode_lokasi) from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"'  and kode_lokasi = '"+this.app._lokasi+"' ",
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
		if (sender == this.ed_nosk) 
		{
			this.standarLib.showListData(this, "Daftar SK Pegawai",sender,undefined, 
										  "select no_sk, keterangan, tgl_sk, tgl_berlaku  from hr_sk where kode_lokkonsol='"+this.lokkonsol+"' and nik ='"+this.cb_nik.getText()+"' ",
										  "select count(no_sk) from hr_sk where kode_lokkonsol='"+this.lokkonsol+"' and nik ='"+this.cb_nik.getText()+"'",
										  ["no_sk","keterangan","tgl_sk","tgl_berlaku"],"and",["No SK","Keterangan","Tgl SK","Tgl Berlaku"],false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_transaksi_fHRrwyangkat.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch(methodName)
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
window.app_hrmis_sdm_transaksi_fHRrwyangkat.implement({
    doLoadData: function(nik, sk){
        var data = this.dbLib.runSQL("select a.no_sk,e.tgl_sk,e.tgl_berlaku as tgl_skmulai,a.tgl_masuk,a.jenjang,a.jurusan,a.pangkal,a.tingkat,"+
		                             "       a.mk_tahun,a.mk_bulan,a.gadas,a.kode_lokasi,a.kode_loker,a.keterangan,"+
		                             "       b.nama as nama_lokasi, c.nama as nama_loker,a.status_aktif  "+
									 "from hr_angkat a inner join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol = b.kode_lokkonsol "+
									 "                 inner join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokkonsol = c.kode_lokkonsol "+
									 "	 inner join hr_sk e on e.no_sk = a.no_sk and e.kode_lokkonsol = a.kode_lokkonsol "+
									 "where a.no_sk='"+sk+"' and a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.ed_nosk.onChange.set(undefined, undefined);
				this.ed_nosk.setText(line.get("no_sk"));
				this.ed_nosk.onChange.set(this, "doChange");
				this.dp_tglsk.setDateString(line.get("tgl_sk"));
				this.dp_tglskmulai.setDateString(line.get("tgl_skmulai"));
				this.dp_tglawal.setDateString(line.get("tgl_masuk"));
				this.cb_jenjang.setText(line.get("jenjang"));
				this.ed_jurusan.setText(line.get("jurusan"));
				this.ed_pangkal.setText(line.get("pangkal"));
				this.ed_tingkat.setText(line.get("tingkat"));
				this.ed_tahun.setText(line.get("mk_tahun"));
				this.ed_bulan.setText(line.get("mk_bulan"));
				this.ed_gaji.setText(floatToNilai(parseFloat(line.get("gadas"))));
				this.cb_pp.setText(line.get("kode_lokasi"));
				this.cb_pp.setRightLabelCaption(line.get("nama_lokasi"));
				this.cb_loker.setText(line.get("kode_loker"),line.get("nama_loker"));
				this.ed_desc.setText(line.get("keterangan"));
				this.cb1.setSelected(line.get("status_aktif") == '0'? false:true);	
			}
			else
			{
				setTipeButton(tbSimpan);
			}
		}
    },
	doChange: function(sender){
		if (sender == this.ed_nosk){
			try{
				var data = this.dbLib.getDataProvider("select tgl_sk, tgl_mulai, tgl_berlaku, datediff (day,tgl_mulai,now()) as jmlhari  from hr_sk where kode_lokkonsol = '"+this.app._lokKonsol+"' and nik = '"+this.cb_nik.getText()+"' and no_sk='"+sender.getText()+"' ",true);			
				if (data.rs.rows[0] !== undefined){
					this.dp_tglsk.setText(data.rs.rows[0].tgl_sk);
					this.dp_tglskmulai.setText(data.rs.rows[0].tgl_berlaku);
					this.dp_tglawal.setText(data.rs.rows[0].tgl_mulai);
					var thnbln = dayToYear(data.rs.rows[0].jmlhari);
					this.ed_tahun.setText(thnbln[0]);
					this.ed_bulan.setText(thnbln[1]);
					this.doLoadData(this.cb_nik.getText(), sender.getText());
				}
			}catch(e){
				alert(e);
			}
		}
		if (sender == this.ed_pangkal && sender.getText() != "" ){	
			try{
				var data = this.dbLib.getDataProvider("select max(tarif) as tarif from hr_gadaspangkal where  pangti =  case when "+sender.getText()+" >= pangti then pangti else "+sender.getText()+"  end",true);			
				if (data.rs.rows[0] !== undefined){
					this.ed_gaji.setText(floatToNilai(data.rs.rows[0].tarif));
				}
			}catch(e){
				alert(e);
			}
		}
		if (sender == this.cb_status){
			if (this.cb_status.getText() != '4')
				this.cb_bantu.setText('-','-');
		}
	}
});
