window.app_saku_logistik_transaksi_fPrk = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fPrk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fPrk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Form Purchase Request: Koreksi",0);
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setReadOnly(true);
		this.ed_period.setTag("9");
	
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
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No PR");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(78);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No PR Lama");
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(78);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
	        
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(78);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("2");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(100);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(100);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(290);
		this.ed_dok.setTop(100);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(122);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");
		this.cb_pp.setTag("2");
		
		this.cb_drk = new portalui_saiCBBL(this);
		this.cb_drk.setLeft(20);
		this.cb_drk.setTop(144);
		this.cb_drk.setWidth(185);
		this.cb_drk.setCaption("Data RKM");
		this.cb_drk.setReadOnly(true);
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setRightLabelCaption("");
		this.cb_drk.setTag("2");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(166);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("2");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(188);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("2");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(680);
		this.ed_nilai.setTop(188);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai PR");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("2");

		this.bGar = new portalui_imageButton(this);
		this.bGar.setLeft(900);
		this.bGar.setTop(188);
		this.bGar.setHint("Hitung Anggaran");
		this.bGar.setImage("icon/"+system.getThemes()+"/tabCont2.png");
		this.bGar.setWidth(22);
		this.bGar.setHeight(22);
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(210);
	    this.p1.setWidth(900);
	    this.p1.setHeight(260);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Barang');
		
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(210);
	    this.sg1.setColCount(9);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Kode Brg","Nama Barang","Satuan","Keterangan","Qty","Nilai","SubTotal"]);
		this.sg1.setColWidth([8,7,6,5,4,3,2,1,0],[100,100,50,150,50,150,80,100,80]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(6).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(7).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(8).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(8).setReadOnly(true);	
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(234);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
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
			this.addOnLib = new util_addOnLib();
			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.standarLib.clearByTag(this,["0","2","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]);
			this.cb_pp.setRightLabelCaption(pp[1]);
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fPrk.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fPrk.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_transaksi_fPrk.prototype.ubah = function()
{
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","2")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add(" update pr_m set no_del = '"+this.ed_nb.getText()+"' where no_pr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
						"    select no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
						"    from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul ='PR'");			
			}
			else
			{
				sql.add(" delete from pr_m where no_pr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from pr_d where no_pr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'PR'");			
			}
			
			sql.add("insert into pr_m (no_pr,no_po,kode_lokasi,no_dokumen,kode_drk,tanggal,keterangan,kode_pp,progress,"+
					"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,no_del,no_link) values  "+
					"('"+this.ed_nb.getText()+"','-','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.cb_drk.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_pp.getText()+"','0','"+
					 this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+","+
				     "'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',now(),'"+this.app._userLog+"','-','-')");
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				var j = i+1;
				sql.add("insert into pr_d (no_pr,no_urut,kode_akun,kode_brg,kode_lokasi,kode_sat,keterangan,jumlah,nilai) values "+	
						"('"+this.ed_nb.getText()+"',"+j+",'"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(2,i)+"','"+this.app._lokasi+"','"+this.sg1.getCell(4,i)+"','"+this.sg1.getCell(5,i)+"',"+parseNilai(this.sg1.getCell(6,i))+","+parseNilai(this.sg1.getCell(7,i))+")");
			}
		
			//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
			var scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
			var baris1 = true;
			var line = undefined;
			var DC = "";
			for (var i in this.gridJurnal.objList)
			{
				if (!baris1) { scr1 += ",";}	
				line = this.gridJurnal.get(i);
				if (parseFloat(line.get("nilai")) < 0) {DC = "C";}
				else {DC = "D";}
				scr1 += "('"+this.ed_nb.getText()+"','PR','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
				        "','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
				baris1 = false;
			}	
			sql.add(scr1);
			
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_logistik_transaksi_fPrk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","2","9"],undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear();  this.sg1.appendRow();
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				var pp = this.app._pp.split(";");
				this.cb_pp.setText(pp[0]);
				this.cb_pp.setRightLabelCaption(pp[1]);
			}
			break;
			
		case "ubah" :
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				for (var j=i; j < this.sg1.rows.getLength(); j++)
				{
					if (((this.sg1.getCell(0,i)) == (this.sg1.getCell(0,j))) && ((this.sg1.getCell(2,i)) == (this.sg1.getCell(2,j))) && (i != j) )
					{
						var a = i+1; var b = j+1;
						system.alert(this,"Data [Akun dan Barang] tidak boleh duplikasi.","[baris "+b+" dan "+a+"]");
						return false;
					}
				}		
			}
			if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
			{
				system.alert(this,"Nilai PR tidak valid.","Nilai tidak boleh nol atau kurang");
				return false;
			}
			this.hitungGar();
			for (var i in this.gridJurnal.objList)
			{
				line = this.gridJurnal.get(i);
				if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
				{
					system.alert(this,"Nilai pengajuan PR melebihi saldo anggaran.","Periksa kembali data anggaran.");
					return false;
				}
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
			}
			else this.ubah();
			break;
			
		case "ubahcek" : this.ubah();
			break;			
			
		case "hapus" :
			try
			{	
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add(" update pr_m set no_del = 'DEL' where no_pr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
					        "    select no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
							"    from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul ='PR' ");			
				}
				else
				{
					sql.add(" delete from pr_m where no_pr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from pr_d where no_pr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'PR'");			
				}		
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
			
			break;	
	}
};
window.app_saku_logistik_transaksi_fPrk.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'pr_m','no_pr',this.app._lokasi+"-PR"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_logistik_transaksi_fPrk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_logistik_transaksi_fPrk.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	
	if (sender == this.cb_curr)
	{
		this.cb_akun.setText("");
		if (this.cb_curr.getText() == "IDR")
		{	
			this.ed_kurs.setText("1");
			this.ed_kurs.setReadOnly(true);
		}
		else
		{
			this.ed_kurs.setReadOnly(false);
		}
	}	
};
window.app_saku_logistik_transaksi_fPrk.prototype.showClick = function(sender)
{
	if (this.cb_bukti.getText() != "")
	{
		if (this.cb_bukti != undefined) {
			try 
			{
				this.standarLib.clearByTag(this, new Array("2"),undefined);				
				var line,data = this.dbLib.runSQL(" select  a.no_dokumen, a.keterangan, a.kode_curr, a.kurs, a.nik_buat, a.nik_setuju, b.nama as nama_buat, c.nama as nama_setuju, "+
												  "         a.periode,a.kode_pp,d.nama as nama_pp,a.kode_drk,e.nama as nama_drk  "+
												  " from pr_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi = b.kode_lokasi "+
												  "             inner join karyawan c on a.nik_setuju = c.nik and a.kode_lokasi = c.kode_lokasi "+
												  "             inner join pp d on a.kode_pp = d.kode_pp and a.kode_lokasi = d.kode_lokasi "+
												  "             inner join drk e on a.kode_drk = e.kode_drk and a.kode_lokasi = e.kode_lokasi and e.tahun = substring(a.periode,1,4) "+
												  " where a.no_pr='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						line = data.get(0);
						this.periodeLama = line.get("periode");
						this.ed_dok.setText(line.get("no_dokumen"));
						this.ed_desc.setText(line.get("keterangan"));
						this.cb_curr.setText(line.get("kode_curr"));
						this.ed_kurs.setText(line.get("kurs"));
						this.cb_pembuat.setText(line.get("nik_buat"));
						this.cb_pembuat.setRightLabelCaption(line.get("nama_buat"));
						this.cb_setuju.setText(line.get("nik_setuju"));
						this.cb_setuju.setRightLabelCaption(line.get("nama_setuju"));
						this.cb_drk.setText(line.get("kode_drk"));
						this.cb_drk.setRightLabelCaption(line.get("nama_drk"));
						this.cb_pp.setText(line.get("kode_pp"));
						this.cb_pp.setRightLabelCaption(line.get("nama_pp"));
					} 
				}

				this.sg1.clear(); 
				var strSql = " select  a.kode_akun,b.nama as nama_akun,a.kode_brg,c.nama as nama_brg,a.kode_sat,a.keterangan,a.jumlah,a.nilai,(a.jumlah * a.nilai) as total "+
							 " from pr_d a inner join masakun b on a.kode_akun = b.kode_akun and a.kode_lokasi = b.kode_lokasi "+
							 "             inner join barang_m c on a.kode_brg = c.kode_brg and a.kode_lokasi = c.kode_lokasi "+
							 " where a.no_pr = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				
				var data = this.dbLib.runSQL(strSql);
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8),
								new Array(line.get("kode_akun"),line.get("nama_akun"),line.get("kode_brg"),line.get("nama_brg"),
								          line.get("kode_sat"),line.get("keterangan"),line.get("jumlah"),line.get("nilai"),line.get("total")));					
						}
						this.sg1.validasi();
					} 
				}
				
			} catch(e)
			{
				system.alert(this,e,"");
			}
		}
	}
};
window.app_saku_logistik_transaksi_fPrk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} 
				else {var sts = "";}
				this.standarLib.showListData(this, "Daftar Purchase Request",this.cb_bukti,undefined, 
				  								 "select no_pr, keterangan from pr_m where progress in ('0','X') and periode<='"+this.ed_period.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' " +sts,
												 "select count(no_pr)      from pr_m where progress in ('0','X') and periode<='"+this.ed_period.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' " +sts,
												 new Array("no_pr","keterangan"),"and", new Array("No PR","Keterangan"),false);
			}
			this.standarLib.clearByTag(this, new Array("2"),undefined);				
			this.sg1.clear(); this.sg1.appendRow();
		}
		if (sender == this.cb_drk) 
		{								  
			this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
										  " select distinct d.kode_drk, d.nama from anggaran_d b "+
										  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
										  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' "+ //and upper(d.jenis_akun) = 'INVESTASI'
										  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",
										  " select count(distinct d.kode_drk) from anggaran_d b "+
										  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
										  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"'  "+ //and upper(d.jenis_akun) = 'INVESTASI'
										  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",
										  new Array("kode_drk","nama"),"and",new Array("Kode RKM","Deskripsi"),false);
			this.sg1.clear(); this.sg1.appendRow();
		}
		if (sender == this.cb_pp) 
		{   
		    if (this.app._userStatus != 'A') 
			{var sts = " and kode_pp = '"+this.app._kodePP+"'";} 
			else {var sts = " ";}
			this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' "+sts,
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' "+sts,
										  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
			this.sg1.clear(); this.sg1.appendRow();
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama  from curr",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"where",new Array("Kode Currency","Deskripsi"),false);
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fPrk.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 2 : 
					var line,data = this.dbLib.runSQL(" select nama,kode_sat,concat(merk,' ',tipe) as ket,harga_ref from barang_m where kode_lokasi='"+this.app._lokasi+"' and kode_brg='"+this.sg1.getCell(2,row)+"'");
					if (data instanceof portalui_arrayMap)
					{
						line = data.get(0);
						if (line != undefined)
						{
							this.sg1.setCell(3,row,line.get("nama"));
							this.sg1.setCell(4,row,line.get("kode_sat"));
							this.sg1.setCell(5,row,line.get("ket"));
							this.sg1.setCell(6,row,"0");
							this.sg1.setCell(7,row,floatToNilai(parseFloat(line.get("harga_ref"))));
							this.sg1.setCell(8,row,"0");
						} 
					}				
				break;
			case 6 :
			case 7 : 
					var total = nilaiToFloat(this.sg1.getCell(6,row)) * nilaiToFloat(this.sg1.getCell(7,row));
					this.sg1.setCell(8,row,floatToNilai(total));
					this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fPrk] : doFindBtnClick : " + e);
	}
};
window.app_saku_logistik_transaksi_fPrk.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
													"select distinct a.kode_akun, a.nama from masakun a inner join anggaran_d b on a.kode_akun = b.kode_akun where b.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_drk='"+this.cb_drk.getText()+"'",
													"select distinct count(a.kode_akun)  from masakun a inner join anggaran_d b on a.kode_akun = b.kode_akun where b.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_drk='"+this.cb_drk.getText()+"'",
													new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
				break;
			case 2 : 
				this.standarLib.showListDataForSG(this, "Daftar Item Barang",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_brg,nama   from barang_m where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_brg) from barang_m where kode_lokasi = '"+this.app._lokasi+"'",
												  new Array("kode_brg","nama"),"and",new Array("Kode Barang","Nama Barang"),false);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fPrk] : doFindBtnClick : " + e);
	}
};
window.app_saku_logistik_transaksi_fPrk.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(8,i) != "")
			{
				tot += nilaiToFloat(this.sg1.getCell(8,i));			
			}
		}
		this.ed_nilai.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fPrk]::doNilaiChange:"+e);
	}
};
window.app_saku_logistik_transaksi_fPrk.prototype.hitungGar = function()
{
	var row,dtJurnal = new portalui_arrayMap();
	var nemu = false;
	var nreal,ix,dtJrnl = 0;
	var kdAkun = "";
				
    for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		kdAkun = this.sg1.getCell(0,i);
		nreal = nilaiToFloat(this.sg1.getCell(8,i));		
		nemu = false;
		ix = 0;
					
		for (var j in dtJurnal.objList)
		{		
		  if (kdAkun == dtJurnal.get(j).get("kode_akun")) 
		  {
			nemu = true;
			row = dtJurnal.get(j);
			ix = j;
			break;
		  }
		}
		
		if (!nemu){
			row = new portalui_arrayMap();
			row.set("kode_akun",kdAkun);
			row.set("kode_pp",this.cb_pp.getText());
			row.set("kode_drk",this.cb_drk.getText());
			row.set("nilai",nreal);
			row.set("saldo_gar",0);
			dtJrnl++;
			dtJurnal.set(dtJrnl,row);						
		}else {
			dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
		}
	}
	
	if (dtJurnal.getLength() > 0){
		var desc1 = new portalui_arrayMap();
		desc1.set("kode_akun",150);
		desc1.set("kode_pp",150);
		desc1.set("kode_drk",150);
		desc1.set("nilai",150);
		desc1.set("saldo_gar",150);
		
		var desc2 = new portalui_arrayMap();
		desc2.set("kode_akun","S");
		desc2.set("kode_pp","S");
		desc2.set("kode_drk","S");	
		desc2.set("nilai","N");
		desc2.set("saldo_gar","N");
		
		var dataDesc = new portalui_arrayMap();
		dataDesc.set(0,desc1);
		dataDesc.set(1,desc2);
		dtJurnal.setTag2(dataDesc);
	}
	this.gridJurnal = dtJurnal;
	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	var line = undefined;
	var sls = 0;
	for (var i in this.gridJurnal.objList)
	{
		line = this.gridJurnal.get(i);
		var baris,data = this.dbLib.runSQL("select fn_cekagg3('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"','"+this.cb_bukti.getText()+"') as gar ");
		if (data instanceof portalui_arrayMap)
		{
			baris = data.get(0);
			if (baris != undefined)
			{
				baris = baris.get("gar");
				data = baris.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				line.set("saldo_gar",sls);
				this.gridJurnal.set(i,line);		
			} 
		} else alert(data);
	}	
};
window.app_saku_logistik_transaksi_fPrk.prototype.garClick = function(sender)
{
	try
	{
		if (this.ed_nilai.getText() != "0")
		{
			this.jurnal.sg.clear();
			this.hitungGar();
			if (this.gridJurnal != undefined){				
				this.jurnal.setData(this.gridJurnal);
				this.jurnal.showModal();
			}
		}
	} catch	(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fPrk.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
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