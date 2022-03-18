window.app_saku_kb_transaksi_proses_depo_fDepojdwk = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_depo_fDepojdwk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjadwalan Kembali Deposito: Koreksi", 0);	
		
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
		this.ed_nb.setCaption("No Penjadwalan");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(680);
		this.cb_perlama.setTop(34);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(56);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Penjdwl Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bLoad = new portalui_imageButton(this);
		this.bLoad.setLeft(902);
		this.bLoad.setTop(56);
		this.bLoad.setHint("Load Data");
		this.bLoad.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bLoad.setWidth(22);
		this.bLoad.setHeight(22);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(78);
		this.ed_dok.setWidth(220);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(150);
		this.ed_dok.setTag("1");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("1");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(122);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("1");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(144);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("1");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(550);
		this.bPAll.setTop(144);
		this.bPAll.setCaption("INPROG");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(166);
	    this.p1.setWidth(900);
	    this.p1.setHeight(310);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Ref. Kas Bank Keluar');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(280);
		this.sg1.setColCount(18);
		this.sg1.setColTitle(["Status","No Depo Baru","Tgl Baru","Jth Tmp Baru","No Dok Baru","%Rate Baru","Basis Baru","No Depo Lama","Bank","Cabang","No Dokumen","Deskripsi","Nilai Penempatan","Tanggal","Tgl Jth Tempo","Akun Deposito","% Rate","Basis"]);
		this.sg1.setColWidth([17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,60,80,80,80,110,150,80, 120,80,100,60,60,100,80,80,100,60]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
			val.set(1, "INPROG");
		this.sg1.columns.get(0).setPicklist(val);
    	this.sg1.columns.get(1).setReadOnly(true);
    	this.sg1.columns.get(7).setReadOnly(true);
    	this.sg1.columns.get(8).setReadOnly(true);
    	this.sg1.columns.get(9).setReadOnly(true);
    	this.sg1.columns.get(10).setReadOnly(true);
    	this.sg1.columns.get(11).setReadOnly(true);
    	this.sg1.columns.get(12).setReadOnly(true);	
		this.sg1.columns.get(13).setReadOnly(true);	
		this.sg1.columns.get(14).setReadOnly(true);	
		this.sg1.columns.get(15).setReadOnly(true);	
		this.sg1.columns.get(16).setReadOnly(true);	
		this.sg1.columns.get(17).setReadOnly(true);
		this.sg1.columns.get(5).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(6).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(12).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(16).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(17).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(2).setButtonStyle(window.bsDate);
		this.sg1.columns.get(3).setButtonStyle(window.bsDate);
		
		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(140);
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
			this.cb_pembuat.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onChange.set(this, "doEditChange");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.bLoad.onClick.set(this, "loadClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.sg1.onChange.set(this, "doCellChange");
			this.bGen.onClick.set(this, "genClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			
			var val = this.dbLib.loadQuery("select periode from periode where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.app._periode.substr(0,4)+"%'");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.cb_perlama.addItem(j,val[j].split(";"));
					}
				}
				
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow(); 
			this.baris = this.app._baris;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.ubah = function()
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
				sql.add(" update depojdw_m set no_del = 'DEL' where no_jadwal ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" update depojdw_d set status = 'DEL' where no_jadwal ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					sql.add(" update depo_m set no_depolink='-',progress = '2' where no_depo = '"+this.sg1.getCell(7,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" update depo_m set progress = 'X', no_del='DEL' where no_depo = '"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add(" delete from depojdw_m where no_jadwal ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from depojdw_d where no_jadwal ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					sql.add(" update depo_m set no_depolink='-',progress = '2' where no_depo = '"+this.sg1.getCell(7,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add(" delete from depo_m where no_depo = '"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				}
				this.nb = this.cb_bukti.getText();
			}
			
			sql.add("insert into depojdw_m (no_jadwal,kode_lokasi,no_dokumen,keterangan,tanggal,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,nilai) values "+
					"       ('"+this.nb+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"','"+
							this.ed_period.getText()+"','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
							"','"+this.app._userLog+"',now(),0)");
												
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i).toUpperCase() == "APP")
				{		
					sql.add("insert into depo_m (no_depo,no_kas,no_dokumen,tanggal,due_date,tgl_akru,bank,cabang,rate,basis,"+
							"keterangan,catatan,kode_curr,kurs,akun_kb,akun_depo,akun_cbunga,nik_buat,nik_setuju,kode_lokasi,kode_pp,"+
							"modul,nilai,progress,periode,no_del,no_link,nik_user,tgl_input,tgl_just,jam,pic_bank,pic_karyawan,jk_waktu,akun_ar,akun_pdpt,"+
							"ctgl_just,cjam,cpic_bank,cpic_karyawan,csurat,cnik_setuju,cnilai,no_depolink,cakun_kb) "+
							"    select '"+this.sg1.getCell(1,i)+"','RESCH',no_dokumen,'"+this.sg1.getCellDateValue(2,i)+"','"+this.sg1.getCellDateValue(3,i)+"','"+this.sg1.getCellDateValue(2,i)+"',bank,cabang,"+
							parseNilai(this.sg1.getCell(5,i))+","+parseNilai(this.sg1.getCell(6,i))+","+
							"           keterangan,catatan,kode_curr,kurs,akun_kb,akun_depo,akun_cbunga,'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',kode_lokasi,kode_pp,"+
							"           modul,nilai,progress,periode,no_del,no_link,'"+this.app._userLog+"',now(),tgl_just,jam,pic_bank,pic_karyawan,jk_waktu,akun_ar,akun_pdpt,ctgl_just,cjam,cpic_bank,cpic_karyawan,csurat,cnik_setuju,cnilai,no_depolink,cakun_kb "+
							"    from depo_m where no_depo ='"+this.sg1.getCell(7,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
			
					sql.add(" update depo_m set no_depolink='"+this.sg1.getCell(1,i)+"',progress = '9' where no_depo = '"+this.sg1.getCell(7,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("insert into depojdw_d (no_jadwal,no_depo,no_depolama,status,kode_lokasi) values "+
							"('"+this.nb+"','"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(7,i)+"','APP','"+this.app._lokasi+"')");

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
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
		case "ubah" :
			
			var cekData = "F";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i).toUpperCase == "INPROG")
				{
					var data = this.dbLib.runSQL(" select a.no_akru from depo_akru_d  a "+
												"                   inner join depo_akru_m c on a.no_akru=c.no_akru and a.kode_lokasi=c.kode_lokasi "+
											     " where a.no_depo ='"+this.sg1.getCell(1,i)+"' and c.no_del='-'");		
				
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							system.alert(this,"Terdapat data akru bunga deposito.","Transaksi tidak dapat diubah ["+this.sg1.getCell(1,i)+"].");
							return false;
						}
					}
				}
			}
			
			var cekData2 = "F";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i).toUpperCase() == "APP") cekData2 = "T";
			}
			if (cekData2 == "F")
			{
				system.alert(this,"Tidak ada transaksi yang diapprove.","Pilih APP untuk meng-approve di kolom status.");
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
			}	else this.ubah();
			break;			
			
		case "ubahcek" : this.ubah();
			break;
			
		case "hapus" :
			try
			{	
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					var data = this.dbLib.runSQL(" select a.no_akru from depo_akru_d  a "+
												"                   inner join depo_akru_m c on a.no_akru=c.no_akru and a.kode_lokasi=c.kode_lokasi "+
												 " where a.no_depo ='"+this.sg1.getCell(1,i)+"' and c.no_del='-'");		
				
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							system.alert(this,"Terdapat data akru bunga deposito.","Transaksi tidak dapat diubah ["+this.sg1.getCell(1,i)+"].");
							return false;

						}
					}					
				}
				
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	

				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add(" update depojdw_m set no_del = 'DEL' where no_jadwal ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" update depojdw_d set status = 'DEL' where no_jadwal ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						sql.add(" update depo_m set no_depolink='-',progress = '2' where no_depo = '"+this.sg1.getCell(7,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add(" update depo_m set progress = 'X', no_del='DEL' where no_depo = '"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					}
				}
				else
				{
					sql.add(" delete from depojdw_m where no_jadwal ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from depojdw_d where no_jadwal ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						sql.add(" update depo_m set no_depolink='-',progress = '2' where no_depo = '"+this.sg1.getCell(7,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add(" delete from depo_m where no_depo = '"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					}
				}
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;		
			
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"INPROG");
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.doSelectedPage = function(sender, page)
{
	this.dbLib.listData(this.scriptSql, page, this.baris);
};
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.loadClick = function(sender)
{
	try
	{
		var line,data = this.dbLib.runSQL("select a.periode,a.keterangan,a.no_dokumen,a.nik_buat,a.nik_app,b.nama as nama_buat,c.nama as nama_app  "+
		                                  "from depojdw_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi=b.kode_lokasi "+
										  "                 inner join karyawan c on a.nik_app = c.nik and a.kode_lokasi=c.kode_lokasi "+
										  "where a.no_jadwal='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.periodeLama = line.get("periode");
				this.ed_dok.setText(line.get("no_dokumen"));
				this.ed_desc.setText(line.get("keterangan"));
				this.cb_pembuat.setText(line.get("nik_buat"));
				this.cb_pembuat.setRightLabelCaption(line.get("nama_buat"));
				this.cb_setuju.setText(line.get("nik_app"));
				this.cb_setuju.setRightLabelCaption(line.get("nama_app"));
			} 
		}
		
		this.sg1.clear(); this.sg1.appendRow();
		var pageCount = this.dbLib.getRowCount("select count(a.no_depo) "+
											   "from depo_m a inner join depojdw_d b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
											   "              inner join depojdw_m c on b.no_jadwal=c.no_jadwal and b.kode_lokasi=c.kode_lokasi "+
											   "where a.progress='2' and a.kode_lokasi='"+this.app._lokasi+"'",this.baris);

		this.scriptSql = "select 'APP' as status,a.no_depo,a.tanggal as tgl_baru,a.due_date as duedate_baru,a.no_dokumen,a.rate,a.basis,b.no_depo as depolama,b.bank,b.cabang,b.no_dokumen,b.keterangan,"+
			   			 "         b.nilai,b.tanggal,b.due_date,b.akun_depo,b.rate,b.basis "+
						 "from depo_m a inner join depo_m b on a.no_depo=b.no_depolink and a.kode_lokasi=b.kode_lokasi "+
						 "              inner join depojdw_d c on a.no_depo=c.no_depo and a.kode_lokasi=c.kode_lokasi and c.status='APP' "+
						 "where a.progress='2' and a.kode_lokasi='"+this.app._lokasi+"'";
		

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
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'depojdw_m','no_jadwal',this.app._lokasi+"-DJD"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_dok.setFocus();
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
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Bukti Penjadwalan Deposito",this.cb_bukti,undefined, 
				  								 "select no_jadwal, keterangan from depojdw_m where periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_jadwal)      from depojdw_m where periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 ["no_jadwal","keterangan"],"and",["No Penjadwalan","Keterangan"],false);
			}
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas Verifikasi",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdwk.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.nb +")");
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

							var dt=value[13].split(" ");
							var tgl=dt[0].split("-");
							value[13]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							
							var dt=value[14].split(" ");
							var tgl=dt[0].split("-");
							value[14]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							
							value[16] = floatToNilai(parseFloat(value[16]));
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17),value);	
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