window.app_saku_logistik_transaksi_fVerpok = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fVerpok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fVerpok";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Dokumen PO: Koreksi", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(32);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tanggal");
		this.lblTgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(34);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(56);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Verifikasi");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(56);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Verifikasi Lama");
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setRightLabelCaption("");
		
		this.bLoad = new portalui_imageButton(this);
		this.bLoad.setLeft(902);
		this.bLoad.setTop(56);
		this.bLoad.setHint("Load Data");
		this.bLoad.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bLoad.setWidth(22);
		this.bLoad.setHeight(22);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(78);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("1");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(100);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("1");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(122);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("1");
	
		this.bShow = new portalui_button(this);
		this.bShow.setLeft(465);
		this.bShow.setTop(122);
		this.bShow.setCaption("Tampil");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(546);
		this.bPAll.setTop(122);
		this.bPAll.setCaption("APP All");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(144);
	    this.p1.setWidth(900);
	    this.p1.setHeight(330);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Purchase Order');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(165);
		this.sg1.setColCount(14);
		this.sg1.setColTitle(["Status","Catatan","No PO","No Dokumen","Vendor","Tgl Mulai","Tgl Selesai","Deskripsi","Currency","Nilai","PPN","Pnj","No Del","Progress"]);
		this.sg1.setColWidth([13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,80,100,100,100,60,200,80,80,100,100,100,200,60]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
			val.set(1, "INPROG");
		this.sg1.columns.get(0).setPicklist(val);
    	this.sg1.columns.get(1).setReadOnly(false);
    	this.sg1.columns.get(2).setReadOnly(true);
    	this.sg1.columns.get(3).setReadOnly(true);
    	this.sg1.columns.get(4).setReadOnly(true);
    	this.sg1.columns.get(5).setReadOnly(true);
    	this.sg1.columns.get(6).setReadOnly(true);
    	this.sg1.columns.get(7).setReadOnly(true);
    	this.sg1.columns.get(8).setReadOnly(true);
		this.sg1.columns.get(9).setColumnFormat(window.cfNilai);
    	this.sg1.columns.get(9).setReadOnly(true);
		this.sg1.columns.get(10).setColumnFormat(window.cfNilai);
    	this.sg1.columns.get(10).setReadOnly(true);
		this.sg1.columns.get(11).setReadOnly(true);
		this.sg1.columns.get(12).setReadOnly(true);
		this.sg1.columns.get(13).setReadOnly(true);
		
		uses("portalui_saiTable");	
		this.sg2 = new portalui_saiTable(this.p1);
    	this.sg2.setLeft(1);
		this.sg2.setTop(190);
    	this.sg2.setWidth(895);
    	this.sg2.setHeight(135);
		this.sg2.setTag("2");
		this.sg2.setColTitle(["No","Kode Akun","Nama Akun","Kode Brg","Nama Brg","Satuan","Qty","Nilai","Sub Ttl"]);
		
		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(120);
		this.sgNav.setLeft(623);
		this.sgNav.setWidth(297);
		this.sgNav.setGrid(this.sg);
		this.sgNav.setBorder(0);
		this.sgNav.setButtonStyle(3);
		
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("util_addOnLib");
			this.addOnLib=new util_addOnLib();
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onChange.set(this, "doEditChange");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onDblClick.set(this,"sg1ondblclick");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.bGen.onClick.set(this, "genClick");
			this.bLoad.onClick.set(this, "loadClick");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow(); this.sg2.clearAll();
			this.baris = this.app._baris;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fVerpok.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fVerpok.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_transaksi_fVerpok.prototype.ubah = function()
{
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add(" update verpo_m set no_del = 'DEL' where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" update verpo_d set status = 'DEL' where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}
			else
			{
				sql.add(" delete from verpo_m where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from verpo_d where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				sql.add("update po_m set progress='0' where no_po='"+this.sg1.getCell(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
			}
			
			sql.add("insert into verpo_m (no_ver,kode_lokasi,keterangan,tanggal,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,nilai) values "+
					"       ('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"',"+
							"'"+this.ed_period.getText()+"','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
							"','"+this.app._userLog+"',now(),0)");
												
			var vprog = "";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i) != "INPROG")
				{
					sql.add("insert into verpo_d (no_ver,no_bukti,status,catatan,no_del,kode_lokasi) values "+
							"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(1,i)+"','-','"+this.app._lokasi+"')");
					
					if (this.sg1.getCell(0,i) == "APP") {vprog = "1";}
					if (this.sg1.getCell(0,i) == "NONAPP") {vprog = "X";}
					
					sql.add("update po_m set progress='"+vprog+"' where no_po='"+this.sg1.getCell(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
			}					
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_logistik_transaksi_fVerpok.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
				this.sg2.clearAll();
			}
			break;
		case "ubah" :
			
			var cekData = "F";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(12,i) != "-")
				{
					system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(2,i)+" sudah dihapus.","Approval tidak dapat diubah.");
					return false;
				}
				if ((this.sg1.getCell(13,i) != "1") && (this.sg1.getCell(13,i) != "X"))
				{
					system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(2,i)+" sudah berubah progress.","Approval tidak dapat diubah.");
					return false;
				}
				if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.sg1.getCell(5,i))) && ((this.sg1.getCell(0,i) == "APP") || (this.sg1.getCell(0,i) == "NONAPP")))
				{
					system.alert(this,"Tanggal verifikasi kurang dari tanggal dokumen [baris "+i+"].","");
					return false;
				}
				if ((this.sg1.getCell(0,i) == "APP") || (this.sg1.getCell(0,i) == "NONAPP"))
				cekData = "T";
			}			
			if (cekData == "F")
			{
				system.alert(this,"Tidak ada transaksi yang diverifikasi.","Pilih APP atau NON APP untuk memverifikasi di kolom status.");
				return false;
			}
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
			{
				if (this.app._pernext == "1")
				  system.confirm(this, "ubahcek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
			}else this.ubah();
			break;			
			
		case "ubahcek" : this.ubah();
			break;		

		case "hapus" :
			try
			{	
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if (this.sg1.getCell(12,i) != "-")
					{
						system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(2,i)+" sudah dihapus.","Approval tidak dapat diubah.");
						return false;
					}
					if ((this.sg1.getCell(13,i) != "1") && (this.sg1.getCell(13,i) != "X"))
					{
						system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(2,i)+" sudah berubah progress.","Approval tidak dapat diubah.");
						return false;
					}
				}
				
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	

				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add(" update verpo_m set no_del = 'DEL' where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" update verpo_d set status = 'DEL' where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				else
				{
					sql.add(" delete from verpo_m where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from verpo_d where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					sql.add("update po_m set progress='0' where no_po='"+this.sg1.getCell(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;			
	}
};
window.app_saku_logistik_transaksi_fVerpok.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"INPROG");
	}
};
window.app_saku_logistik_transaksi_fVerpok.prototype.doSelectedPage = function(sender, page)
{
	this.dbLib.listData(this.scriptSql, page, this.baris);
};
window.app_saku_logistik_transaksi_fVerpok.prototype.loadClick = function(sender)
{
	try
	{
		var line,data = this.dbLib.runSQL("select a.periode,a.keterangan,a.nik_buat,a.nik_app,b.nama as nama_buat,c.nama as nama_app  "+
		                                  "from verpo_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi=b.kode_lokasi "+
										  "               inner join karyawan c on a.nik_app = c.nik and a.kode_lokasi=c.kode_lokasi "+
										  "where a.no_ver='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.periodeLama = line.get("periode");
				this.ed_desc.setText(line.get("keterangan"));
				this.cb_pembuat.setText(line.get("nik_buat"));
				this.cb_pembuat.setRightLabelCaption(line.get("nama_buat"));
				this.cb_setuju.setText(line.get("nik_app"));
				this.cb_setuju.setRightLabelCaption(line.get("nama_app"));
			} 
		}
		
		this.sg1.clear();
		this.sg1.appendRow();
		this.sg2.clearAll();
		
		var pageCount = this.dbLib.getRowCount("select count(a.no_po) "+
						"from po_m a inner join verpo_d x on x.no_bukti=a.no_po and a.kode_lokasi=x.kode_lokasi "+
						"where x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);
			
		this.scriptSql = "select x.status,x.catatan,a.no_po,a.no_dokumen,b.nama as vendor,a.tgl_mulai,a.tgl_selesai,"+
						 "       a.keterangan,a.kode_curr,a.nilai,a.nilai_ppn, "+
						 "       d.nama as pnj,a.no_del,a.progress "+
						 "from po_m a "+
						 "            inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						 "            inner join karyawan d on d.nik=a.nik_pnj and a.kode_lokasi=d.kode_lokasi "+
						 "            inner join verpo_d x on x.no_bukti=a.no_po and a.kode_lokasi=x.kode_lokasi "+
						 "where x.no_ver ='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
		
		this.dbLib.listData(this.scriptSql, 1, this.baris);
		
		this.sgNav.setTotalPage(pageCount);
		this.sgNav.rearrange();
		this.sgNav.activePage = 0;	
		this.sgNav.setButtonStyle(3);
		if (pageCount > 0)
		{
			if (this.sgNav.imgBtn1 != undefined)
				this.sgNav.setSelectedPage(this.sgNav.imgBtn1);
		}
		
	} catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fVerpok.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'verpo_m','no_ver',this.app._lokasi+"-VPO"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
		}
		else
		{
			system.alert(this,"Periode harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fVerpok.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_logistik_transaksi_fVerpok.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
};
window.app_saku_logistik_transaksi_fVerpok.prototype.sg1ondblclick = function(sender, col , row)
{
	this.sg2.clearAll();
	if (this.sg1.getCell(0,row) != "") 
	{		
		if (this.app._dbEng == "mysqlt")
		{
			var temp = this.dbLib.runSQL("select a.kode_akun,c.nama as nama_akun,a.kode_brg,b.nama as nama_brg,a.kode_sat,a.jumlah,a.nilai,(a.nilai * a.jumlah) as total "+
			                             "from po_d a inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
			                             "            inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
										 "where a.no_po = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.status = '1'");
		}				
		if (temp instanceof portalui_arrayMap){
			this.sg2.setData(temp);
		}else alert(rs);
	}
};
window.app_saku_logistik_transaksi_fVerpok.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Bukti Verifikasi",this.cb_bukti,undefined, 
				  								 "select no_ver, keterangan from verpo_m where periode<='"+this.ed_period.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_ver)      from verpo_m where periode<='"+this.ed_period.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 new Array("no_ver","keterangan"),"and", new Array("No Verifikasi","Keterangan"),false);
			}
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
			this.sg1.clear(); this.sg1.appendRow();			
			this.sg2.clearAll();
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas Verifikasi",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fVerpok.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
								
				case "listData" :
					this.sg1.clear();
					if ((result != "") && (result != undefined))
					{
						this.list = this.standarLib.strToArray(result);				
						var values = undefined;								
						var value = Array();
						this.sg1.showLoading();
						for (var i in this.list.objList)
						{
							values = this.list.get(i);				
							for (var i in values.objList)
								value[i] = values.get(i);
							value[0] = value[0].toUpperCase();
							value[12] = value[12].toUpperCase();
							value[13] = value[13].toUpperCase();

							var dt=value[5].split(" ");
							var tgl=dt[0].split("-");
							value[5]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							
							var dt=value[6].split(" ");
							var tgl=dt[0].split("-");
							value[6]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13),value);	
						}			
						this.sg1.hideLoading();
					}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
			        {
			          system.alert(this,result);
			        }else 
			        { 
						system.info(this,"Data tidak ditemukan.","");
						this.sg1.appendRow();
						return false;
			        }  
				break;
    		}
    		
		}
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
};