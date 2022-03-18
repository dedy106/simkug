window.app_saku_gl_master_fJu3ref = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_master_fJu3ref.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_master_fJu3ref";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Referensi Jurnal [Buku Bantu]: Input", 0);	
		
		uses("portalui_saiCBBL");
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("No Referensi");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		
		uses("portalui_imageButton");
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(10);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(32);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("1");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(54);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency");
		this.cb_curr.setText("IDR");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("9");
		
		this.ed_debet = new portalui_saiLabelEdit(this);
		this.ed_debet.setLeft(700);
		this.ed_debet.setTop(76);
		this.ed_debet.setWidth(220);
		this.ed_debet.setTipeText(ttNilai);
		this.ed_debet.setAlignment(alRight);
		this.ed_debet.setCaption("Total Debet");
		this.ed_debet.setText("0"); 
		this.ed_debet.setReadOnly(true);

		this.ed_kredit = new portalui_saiLabelEdit(this);
		this.ed_kredit.setLeft(700);
		this.ed_kredit.setTop(98);
		this.ed_kredit.setWidth(220);
		this.ed_kredit.setTipeText(ttNilai);
		this.ed_kredit.setAlignment(alRight);
		this.ed_kredit.setCaption("Total Kredit");
		this.ed_kredit.setText("0"); 
		this.ed_kredit.setReadOnly(true);
	
		uses("portalui_label");
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(76);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tanggal Mulai");
		this.lblTgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(78);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
		
		this.lblTgl2 = new portalui_label(this);
		this.lblTgl2.setTop(98);
		this.lblTgl2.setLeft(20);
		this.lblTgl2.setWidth(101);		
		this.lblTgl2.setHeight(20);		
		this.lblTgl2.setCaption("Tanggal Selesai");
		this.lblTgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(100);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);
	
		uses('portalui_panel');
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(125);
	    this.p1.setWidth(900);
	    this.p1.setHeight(260);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Jurnal Referensi');
    	         
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(210);
	    this.sg1.setColCount(13);
		this.sg1.setColTitle(new Array("Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP",
		                               "Kode Cust","Nama Cust","Kode Vendor","Nama Vendor","NIK","Nama Kary."));
		this.sg1.setColWidth(new Array(12,11,10,9, 8,7,6,5,4,3,2,1,0),new Array(100,80,100,80,100,80, 100,80,120,30,250,120,80));	
		this.sg1.setReadOnly(false);

		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "D");
			val.set(2, "C");	
		this.sg1.columns.get(3).setPicklist(val);
		this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(8).setReadOnly(true);
		this.sg1.columns.get(9).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(10).setReadOnly(true);
		this.sg1.columns.get(11).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(12).setReadOnly(true);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(234);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
	
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
		    uses("util_dbLib");
			this.dbLib = new util_dbLib(window.system.serverApp);
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
   
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("util_addOnLib");
			this.addOnLib = new util_addOnLib();
			
			this.bShow.onClick.set(this, "showClick");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
			this.sg1.clear(); this.sg1.appendRow(); this.cb_curr.setText("IDR");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gl_master_fJu3ref.extend(window.portalui_childForm);
window.app_saku_gl_master_fJu3ref.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.period = year.toString()+month;
};

window.app_saku_gl_master_fJu3ref.prototype.mainButtonClick = function(sender)
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

window.app_saku_gl_master_fJu3ref.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				try
				{
					this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);				
					this.sg1.clear(); this.sg1.appendRow(); this.cb_curr.setText("IDR");
				} catch(e)			
				{
					system.alert(this, e,"");
				}
			}
			break;
			
		case "simpan" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();	
					sql.add("insert into refju_m (no_refju,kode_lokasi,keterangan,modul,jenis,tgl_awal,tgl_akhir,"+
					"                     kode_curr,nilai,tgl_input,nik_user) values  "+
					"('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','JU2','JU2','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+"','"+
					     this.cb_curr.getText()+"',"+parseNilai(this.ed_debet.getText())+",now(),'"+this.app._userLog+"')");
			
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{			
						if (this.sg1.rowValid(i))
							sql.add("insert into refju_j (no_refju,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
								"kode_lokasi,modul,jenis,kode_curr,nik_user,tgl_input) values "+	
								"('"+this.ed_kode.getText()+"',"+i+",'"+this.sg1.getCell(0,i)+
								"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i).toUpperCase()+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','-',"+
								"'"+this.sg1.getCell(7,i)+"','-','-','"+this.sg1.getCell(9,i)+"','-','"+this.sg1.getCell(11,i)+"','"+this.app._lokasi+"','JU2','JU2',"+
								"'"+this.cb_curr.getText()+"','"+
								this.app._userLog+"',now())");
					}
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();	
					
					sql.add("delete from refju_j where no_refju='"+this.ed_kode.getText()+"'");
					sql.add("delete from refju_m where no_refju='"+this.ed_kode.getText()+"'");
			
					sql.add("insert into refju_m (no_refju,kode_lokasi,keterangan,modul,jenis,tgl_awal,tgl_akhir,"+
					"                     kode_curr,nilai,tgl_input,nik_user) values  "+
					"('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','JU2','JU2','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+"','"+
					     this.cb_curr.getText()+"',"+parseNilai(this.ed_debet.getText())+",now(),'"+this.app._userLog+"')");
			
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{			
						sql.add("insert into refju_j (no_refju,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
								"kode_lokasi,modul,jenis,kode_curr,nik_user,tgl_input) values "+	
								"('"+this.ed_kode.getText()+"',"+i+",'"+this.sg1.getCell(0,i)+
								"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i).toUpperCase()+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','-',"+
								"'"+this.sg1.getCell(7,i)+"','-','-','"+this.sg1.getCell(9,i)+"','-','"+this.sg1.getCell(11,i)+"','"+this.app._lokasi+"','JU2','JU2',"+
								"'"+this.cb_curr.getText()+"','"+
								this.app._userLog+"',now())");
					}
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "hapus" :
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();	
					
					sql.add("delete from refju_j where no_refju='"+this.ed_kode.getText()+"'");
					sql.add("delete from refju_m where no_refju='"+this.ed_kode.getText()+"'");
			
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
	}
};

window.app_saku_gl_master_fJu3ref.prototype.showClick = function(sender)
{
	if (this.ed_kode.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL(" select keterangan,kode_curr,tgl_awal,tgl_akhir "+
										 " from  refju_m "+
										 " where no_refju='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					line = data.get(0);
					this.ed_desc.setText(line.get("keterangan"));
					this.cb_curr.setText(line.get("kode_curr"));
					this.dp_tgl1.setText(line.get("tgl_awal"));
					this.dp_tgl2.setText(line.get("tgl_akhir"));
					
					this.sg1.clear(); 
					if (this.app._dbEng == "mysqlt")
					{
						var strSql = " select  a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai,a.kode_pp, ifnull(c.nama,'-') as nama_pp, a.kode_cust,ifnull(d.nama,'-') as nama_cust, a.kode_vendor,ifnull(e.nama,'-') as nama_vendor, a.nik,ifnull(f.nama,'-') as nama_kary   "+
									 " from refju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "             left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "             left outer join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
									 "             left outer join vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
									 "             left outer join karyawan f on a.nik=f.nik and a.kode_lokasi=f.kode_lokasi "+
									 " where a.no_refju = '"+this.ed_kode.getText()+"'";
					}else
					if (this.app._dbEng == "ado_mssql")
					{
						
					}
					
					var data = this.dbLib.runSQL(strSql);
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{									
							for (var i in data.objList)
							{
								line = data.get(i);
								this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12),
									new Array(line.get("kode_akun"),line.get("nama_akun"),line.get("keterangan"),line.get("dc"),line.get("nilai"),
											  line.get("kode_pp"),line.get("nama_pp"),line.get("kode_cust"),line.get("nama_cust"),line.get("kode_vendor"),line.get("nama_vendor"),line.get("nik"),line.get("nama_kary")));					
							}
							this.sg1.validasi();
							setTipeButton(tbUbahHapus);
						} else
						{
							this.standarLib.clearByTag(this, new Array("1"),undefined);	
							this.sg1.clear(); this.sg1.appendRow();
							setTipeButton(tbSimpan);
						}
					} else
					{
						this.standarLib.clearByTag(this, new Array("1"),undefined);	
						this.sg1.clear(); this.sg1.appendRow();
						setTipeButton(tbSimpan);
					}
				} 
				else
				{
					this.standarLib.clearByTag(this, new Array("1"),undefined);	
					this.sg1.clear(); this.sg1.appendRow();
					setTipeButton(tbSimpan);
				}
			}
			else 
			{	
				this.standarLib.clearByTag(this, new Array("1"),undefined);	
				setTipeButton(tbSimpan);
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
	
window.app_saku_gl_master_fJu3ref.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama  from curr",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"where", new Array("Kode Curr","Deskripsi"),false);
		}
		if (sender == this.ed_kode) 
		{   
		    this.standarLib.showListData(this, "Daftar Refernsi Jurnal",this.ed_kode,undefined, 
										  "select no_refju, keterangan  from refju_m where kode_lokasi ='"+this.app._lokasi+"' and modul = 'JU2'",
										  "select count(no_refju)       from refju_m where kode_lokasi ='"+this.app._lokasi+"' and modul = 'JU2'",
										  new Array("no_refju","keterangan"),"and", new Array("No Bukti Ref.","Keterangan"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	this.sg1.clear(); this.sg1.appendRow();
		}
	}
	catch(e)
	{
		alert(e);
	}
};

window.app_saku_gl_master_fJu3ref.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
				break;
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar Departemen",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),true);
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar Customer",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.kode_cust, a.nama from cust a where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.kode_cust)  from cust a where a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.kode_cust","a.nama"),"and",new Array("Kode Cust","Deskripsi"),true);
				break;
			case 9 : 
				this.standarLib.showListDataForSG(this, "Daftar Vendor",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.kode_vendor, a.nama from vendor a where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.kode_vendor)  from vendor a where a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.kode_vendor","a.nama"),"and",new Array("Kode Vendor","Deskripsi"),true);
				break;
			case 11 : 
				this.standarLib.showListDataForSG(this, "Daftar Karyawan",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.nik, a.nama from karyawan a where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.nik)  from karyawan a where a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.nik","a.nama"),"and",new Array("NIK","Nama"),true);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_gl_master_fJu3ref] : doFindBtnClick : " + e);
	}
};

window.app_saku_gl_master_fJu3ref.prototype.doNilaiChange = function()
{
	try
	{
		var totD = totC = 0;
		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{
				if (this.sg1.getCell(3, i).toUpperCase() == "D")					
					totD += nilaiToFloat(this.sg1.getCell(4,i));			
				if (this.sg1.getCell(3, i).toUpperCase() == "C")					
					totC += nilaiToFloat(this.sg1.getCell(4,i));			
			}
		}
		this.ed_debet.setText(floatToNilai(totD));
		this.ed_kredit.setText(floatToNilai(totC));
	}catch(e)
	{
		alert("[app_saku_gl_master_fJu3ref]::doNilaiChange:"+e);
	}
};

window.app_saku_gl_master_fJu3ref.prototype.doCellExit = function()
{
	this.sg1.validasi();
};

window.app_saku_gl_master_fJu3ref.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :
    				step="info";
				if (result.toLowerCase().search("error") == -1)					
				{
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_kode.getText()+")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
      		break;
    		}    		
		}
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
};