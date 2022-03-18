window.app_hrmis_sdm_transaksi_fHRrwycuti = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_transaksi_fHRrwycuti";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Cuti Pegawai: Input/Koreksi", 0);	

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
		
		//--------------------
		this.cb_jenis = new portalui_saiCBBL(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(98);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.setLabelWidth(100);
		this.cb_jenis.setLength(10);
		this.cb_jenis.setRightLabelVisible(false);
		this.cb_jenis.setReadOnly(false);
		this.cb_jenis.setCaption("Jenis Cuti");
		this.cb_jenis.setText("");
		this.cb_jenis.setRightLabelCaption("");
		this.cb_jenis.setTag("2");
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(120);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setUnderLine(true);
		this.lbltgl1.setCaption("Tanggal Mulai");
		
		uses("portalui_datePicker");	
		this.dp_tglmulai = new portalui_datePicker(this);
		this.dp_tglmulai.setTop(122);
		this.dp_tglmulai.setLeft(120);
		this.dp_tglmulai.setWidth(82);
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(142);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setUnderLine(true);
		this.lbltgl2.setCaption("Tgl Berakhir");
		
		this.dp_tglakhir = new portalui_datePicker(this);
		this.dp_tglakhir.setTop(144);
		this.dp_tglakhir.setLeft(120);
		this.dp_tglakhir.setWidth(82);
		
		this.ed_sisa = new portalui_saiLabelEdit(this);
		this.ed_sisa.setLeft(20);
		this.ed_sisa.setTop(164);
		this.ed_sisa.setWidth(180);
		this.ed_sisa.setLabelWidth(100);
		this.ed_sisa.setLength(15);
		this.ed_sisa.setReadOnly(true);
		this.ed_sisa.setTipeText(ttNilai);
		this.ed_sisa.setAlignment(alRight);
		this.ed_sisa.setCaption("Sisa Cuti");
		this.ed_sisa.setText("0");
		this.ed_sisa.setTag("1");
		
		this.ed_lokasi = new portalui_saiLabelEdit(this);
		this.ed_lokasi.setLeft(20);
		this.ed_lokasi.setTop(186);
		this.ed_lokasi.setWidth(360);
		this.ed_lokasi.setLabelWidth(100);
		this.ed_lokasi.setLength(100);
		this.ed_lokasi.setReadOnly(false);
		this.ed_lokasi.setCaption("Lokasi Cuti");
		this.ed_lokasi.setText("");
		this.ed_lokasi.setTag("1");
		
		this.ed_lama = new portalui_saiLabelEdit(this);
		this.ed_lama.setLeft(500);
		this.ed_lama.setTop(142);
		this.ed_lama.setWidth(200);
		this.ed_lama.setLabelWidth(120);
		this.ed_lama.setLength(15);
		this.ed_lama.setReadOnly(false);
		this.ed_lama.setTipeText(ttNilai);
		this.ed_lama.setAlignment(alRight);
		this.ed_lama.setCaption("Lama Cuti");
		this.ed_lama.setText("0");
		this.ed_lama.setTag("1");
		
		this.ed_tambah = new portalui_saiLabelEdit(this);
		this.ed_tambah.setLeft(500);
		this.ed_tambah.setTop(164);
		this.ed_tambah.setWidth(200);
		this.ed_tambah.setLabelWidth(120);
		this.ed_tambah.setLength(15);
		this.ed_tambah.setReadOnly(false);
		this.ed_tambah.setTipeText(ttNilai);
		this.ed_tambah.setAlignment(alRight);
		this.ed_tambah.setCaption("Tambah Hari");
		this.ed_tambah.setText("0");
		this.ed_tambah.setTag("1");
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(500);
		this.ed_total.setTop(186);
		this.ed_total.setWidth(200);
		this.ed_total.setLabelWidth(120);
		this.ed_total.setLength(15);
		this.ed_total.setReadOnly(true);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setCaption("Total Hari");
		this.ed_total.setText("0");
		this.ed_total.setTag("1");
		
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
	    this.p1.setCaption('Riwayat Cuti');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(929);
		this.sg1.setHeight(235);			
		this.sg1.setColCount(7);
		this.sg1.setTag("2");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["Kode Cuti","Jenis Cuti","Tgl Mulai","Tgl Berakhir","Lokasi Cuti","Lama Cuti","Tambah Hari"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		//this.cb_nik.onChange.set(this, "doEditChange");
		this.cb_jenis.onBtnClick.set(this, "FindBtnClick");
		this.cb_jenis.onChange.set(this, "doEditChange");
		this.bhistory.onClick.set(this,"showClick");
		this.sg1.onDblClick.set(this, "sg1onDblClick");
		this.ed_lama.onChange.set(this, "doEditChange");
		this.ed_tambah.onChange.set(this, "doEditChange");
		this.bShow.onClick.set(this, "show2Click");
		this.dp_tglmulai.onSelect.set(this,"tanggal");
		this.dp_tglakhir.onSelect.set(this,"tanggal");
		
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
window.app_hrmis_sdm_transaksi_fHRrwycuti.extend(window.portalui_childForm);
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.sg1init = function(sg)
{
	sg.columns.get(5).setColumnFormat(window.cfNilai);
	sg.columns.get(6).setColumnFormat(window.cfNilai);
	sg.setColWidth([6,5,4,3,2,1,0],[100,100,320,80,80,100,120]);
};
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.tanggal = function(sender,y,m,d)
{
	var d1 = this.dp_tglakhir.toSysDate();
	var d2 = this.dp_tglmulai.toSysDate();
	this.ed_lama.setText(d1.DateDiff(d2));
};
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
		var dt=this.sg1.getCell(2,row).split("/");
		var tglmulai = dt[2]+"/"+dt[1]+"/"+dt[0];
		var data = this.dbLib.runSQL("select a.kode_cuti,a.tgl_mulai,a.tgl_akhir,a.lokasi,a.lama_ini,a.tambah_hari,b.nama as nama_cuti, b.jumlah "+
									 "from hr_rwycuti a inner join hr_mcuti b on a.kode_cuti=b.kode_cuti and a.kode_lokkonsol=b.kode_lokkonsol "+
									 "where a.tgl_mulai='"+tglmulai+"' and a.kode_cuti='"+this.sg1.cells(0,row)+"' and a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' ");
	
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.cb_jenis.setText(line.get("kode_cuti"));
				this.cb_jenis.setRightLabelCaption(line.get("nama_cuti"));
				this.dp_tglmulai.setDateString(line.get("tgl_mulai"));
				this.dp_tglakhir.setDateString(line.get("tgl_akhir"));
				this.ed_lokasi.setText(line.get("lokasi"));
				this.ed_lama.setText(floatToNilai(parseFloat(line.get("lama_ini"))));
				this.ed_tambah.setText(floatToNilai(parseFloat(line.get("tambah_hari"))));
				
				this.ed_sisa.setText(parseFloat(line.get("jumlah")) - parseFloat(line.get("lama_ini")));
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
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.doEditChange = function(sender)
{
	if ((sender == this.ed_lama) || (sender == this.ed_tambah)) 
	{
		var total = nilaiToFloat(this.ed_lama.getText()) +  nilaiToFloat(this.ed_tambah.getText()); 
		this.ed_total.setText(floatToNilai(total)); 
	}
	if (sender == this.cb_jenis)
	{
		this.ed_sisa.setText("0");
		if ((this.cb_jenis.getText() != "") && (this.cb_nik.getText() != ""))
		{
			var thnini = this.dp_tglmulai.getYear();
			var thnlalu = parseFloat(thnini) - 1;
			var line,data = this.dbLib.runSQL("select a.jumlah,ifnull(b.lama_ini,0) as lama_ini "+
										      "from hr_mcuti a "+
			                                  "         left outer join (select nik,year(tgl_mulai) as thn,kode_cuti,kode_lokkonsol,sum(lama_ini) as lama_ini "+
											  "                          from hr_rwycuti where year(tgl_mulai) = '"+thnini+"' group by nik,year(tgl_mulai) ,kode_cuti,kode_lokkonsol ) b "+
											  "                          on a.kode_cuti=b.kode_cuti and a.kode_lokkonsol = b.kode_lokkonsol  and b.thn = '"+thnini+"' and b.nik = '"+this.cb_nik.getText()+"' "+			                                  
											  "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.kode_cuti = '"+this.cb_jenis.getText()+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					var totalpakai = parseFloat(line.get("lama_ini"));					
					if (totalpakai >= parseFloat(line.get("jumlah")))
					{
						var sisanow = totalpakai - parseFloat(line.get("jumlah"));
						this.ed_sisa.setText(floatToNilai(sisanow));
					}
					else
					{
						var sisanow = parseFloat(line.get("jumlah")) - totalpakai;
						this.ed_sisa.setText(floatToNilai(sisanow));
					}					
				}
			}
		}
	}
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
			
			var line,data = this.dbLib.runSQL("select year(tgl_masuk) as thnaktif "+
			                                  "from hr_dinas2 where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.thnaktif = line.get("thnaktif");
				}
			}
			
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.doModalResult = function(event, modalResult)
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
		    var totalsisa = parseFloat(this.ed_sisa.getText());
			if (parseFloat(this.ed_lama.getText()) > totalsisa)
			{
				system.alert(this,"Lama cuti melebihi total sisa.","");
				return false;
			}
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1","9"))))
			{
				try
				{					
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					sql.add("insert into hr_rwycuti (nik,kode_cuti,tgl_mulai,tgl_akhir,lokasi,lama_ini,tambah_hari,"+
					        "                        kode_lokkonsol,user_id,tgl_input) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_tglmulai.getDate()+"','"+
							            this.dp_tglakhir.getDate()+"','"+this.ed_lokasi.getText()+"',"+ 
										parseNilai(this.ed_lama.getText())+","+parseNilai(this.ed_tambah.getText())+",'"+this.lokkonsol+"','"+this.app._userLog+"',now())");
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
					sql.add("update hr_rwycuti set tgl_akhir='"+this.dp_tglakhir.getDate()+"',"+
					        "lokasi='"+this.ed_lokasi.getText()+"',lama_ini="+parseNilai(this.ed_lama.getText())+", tambah_hari="+parseNilai(this.ed_tambah.getText())+" "+ 
							",user_id='"+this.app._userLog+"',tgl_input=now() "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and tgl_mulai='"+this.dp_tglmulai.getDate()+"' and kode_cuti = '"+this.cb_jenis.getText()+"' ");
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
				sql.add("delete from hr_rwycuti where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and kode_cuti='"+this.cb_jenis.getText()+"' and tgl_mulai='"+this.dp_tglmulai.getDate()+"' ");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.show2Click = function(sender)
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
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.cb_nik.getText() != "")
		{
			try
			{			
				this.sg1.clear();									   
			    var data = this.dbLib.runSQL("select a.kode_cuti,b.nama as nama_cuti,a.tgl_mulai,a.tgl_akhir,a.lokasi,a.lama_ini,tambah_hari "+
											 "from hr_rwycuti a inner join hr_mcuti b on a.kode_cuti=b.kode_cuti and a.kode_lokkonsol=b.kode_lokkonsol "+
											 "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.nik = '"+this.cb_nik.getText()+"' order by a.tgl_mulai desc");

				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.setData(data);										
						
						for (var i=0;i < this.sg1.getRowCount();i++)
						{
							var dt=this.sg1.getCell(2,i).split(" ");
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
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.FindBtnClick = function(sender, event)
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
		if (sender == this.cb_jenis) 
		{
			this.standarLib.showListData(this, "Daftar Jenis Cuti",sender,undefined, 
										  "select kode_cuti, nama, jumlah  from hr_mcuti where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_cuti) from hr_mcuti where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_cuti","nama","jumlah"),"and",new Array("Kode Cuti","Deskripsi","Jumlah"),false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_transaksi_fHRrwycuti.prototype.doRequestReady = function(sender, methodName, result)
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