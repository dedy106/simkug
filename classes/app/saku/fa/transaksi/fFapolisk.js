window.app_saku_fa_transaksi_fFapolisk = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFapolisk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFapolisk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Polis Asuransi: Koreksi", 0);	
				
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
	
	    uses("portalui_label");
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(32);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tanggal");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(34);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Polis");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
			
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		uses("portalui_saiCBBL");
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(54);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Polis Lama");
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setRightLabelCaption("");
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(54);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(98);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tanggal Mulai");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(100);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);
	
		this.lbltgl3 = new portalui_label(this);
		this.lbltgl3.setTop(98);
		this.lbltgl3.setLeft(350);
		this.lbltgl3.setWidth(101);		
		this.lbltgl3.setHeight(20);		
		this.lbltgl3.setCaption("Tanggal Selesai");
		this.lbltgl3.setUnderLine(true);
		
		this.dp_tgl3 = new portalui_datePicker(this);
		this.dp_tgl3.setTop(100);
		this.dp_tgl3.setLeft(438);
		this.dp_tgl3.setWidth(82);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(120);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(50);
		this.ed_desc.setTag("2");
				
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(142);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setText(""); 
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");	
		this.cb_buat.setTag("2");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(164);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");	
		this.cb_setuju.setTag("2");
		
		this.cb_vendor = new portalui_saiCBBL(this);
		this.cb_vendor.setLeft(20);
		this.cb_vendor.setTop(186);
		this.cb_vendor.setWidth(185);
		this.cb_vendor.setCaption("Asuradur");
		this.cb_vendor.setText(""); 
		this.cb_vendor.setReadOnly(true);
		this.cb_vendor.setLabelWidth(100);
		this.cb_vendor.setRightLabelVisible(true);
		this.cb_vendor.setRightLabelCaption("");	
		this.cb_vendor.setTag("2");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(208);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setLabelWidth(100);
		this.ed_nilai.setCaption("Nilai Polis");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);
		this.ed_nilai.setTag("2");
		
		this.ed_premi = new portalui_saiLabelEdit(this);
		this.ed_premi.setLeft(260);
		this.ed_premi.setTop(208);
		this.ed_premi.setWidth(220);
		this.ed_premi.setTipeText(ttNilai);
		this.ed_premi.setAlignment(alRight);
		this.ed_premi.setLabelWidth(100);
		this.ed_premi.setCaption("Nilai Premi");
		this.ed_premi.setText("0"); 
		this.ed_premi.setReadOnly(false);
		this.ed_premi.setTag("2");
		
		this.ed_nasset = new portalui_saiLabelEdit(this);
		this.ed_nasset.setLeft(700);
		this.ed_nasset.setTop(208);
		this.ed_nasset.setWidth(220);
		this.ed_nasset.setTipeText(ttNilai);
		this.ed_nasset.setAlignment(alRight);
		this.ed_nasset.setLabelWidth(100);
		this.ed_nasset.setCaption("Tot. Nilai Asset");
		this.ed_nasset.setText("0"); 
		this.ed_nasset.setReadOnly(true);
		this.ed_nasset.setTag("2");
				
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(230);
	    this.p1.setWidth(900);
	    this.p1.setHeight(218);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Asset');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(168);
	    this.sg1.setColCount(16);
	    this.sg1.setColTitle(new Array("No Asset","Barcode","Deskripsi","Merk","Tipe","No Seri","Lokasi","Departemen","Png Jawab","Nilai","Nilai Buku","Akun Asset","Akun AP","Kode Lokasi","Kode Dept","NIK Pnj"));
		this.sg1.setColWidth(new Array(15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0),new Array(80,80,80,80,80,100,100,120,120,120,100,100,100,200,100,110));	
		this.sg1.setReadOnly(false);
		
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(6).setReadOnly(true);	
		this.sg1.columns.get(7).setReadOnly(true);	
		this.sg1.columns.get(8).setReadOnly(true);	
		this.sg1.columns.get(9).setReadOnly(true);	
		this.sg1.columns.get(9).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(10).setReadOnly(true);	
		this.sg1.columns.get(10).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(11).setReadOnly(true);	
		this.sg1.columns.get(12).setReadOnly(true);	
		this.sg1.columns.get(13).setReadOnly(true);	
		this.sg1.columns.get(14).setReadOnly(true);	
		this.sg1.columns.get(15).setReadOnly(true);	
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(193);
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
		    
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.bGen.onClick.set(this, "genClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_vendor.onBtnClick.set(this, "FindBtnClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFapolisk.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFapolisk.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_fa_transaksi_fFapolisk.prototype.ubah = function()
{	
	if ( (new Date()).strToDate(this.dp_tgl3.getDate())  < (new Date()).strToDate(this.dp_tgl2.getDate()))
	{
		system.alert(this,"Tanggal mulai tidak valid.","Tanggal selesai harus lebih besar dari tanggal mulai.");
		return false;
	}
	if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
	{
		system.alert(this,"Nilai Polis tidak valid.","Nilai tidak boleh nol atau kurang");
		return false;
	}
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add("update fapolis_m set no_link='"+this.ed_nb.getText()+"',no_del = 'DEL' where no_polis ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}
			else
			{
				sql.add(" delete from fapolis_m where no_polis ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from fapolis_d where no_polis ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}
			
			sql.add(" insert into fapolis_m (no_polis,no_dokumen,kode_lokasi,kode_vendor,tanggal,keterangan,tgl_mulai,tgl_selesai,"+
			        " nilai,nilai_premi,nilai_asset,kode_curr,kurs,kode_pp,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.cb_vendor.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.dp_tgl2.getDate()+"','"+this.dp_tgl3.getDate()+"',"+
					parseNilai(this.ed_nilai.getText())+","+parseNilai(this.ed_premi.getText())+","+parseNilai(this.ed_nasset.getText())+",'IDR',1,'-',"+
					"'"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");
					
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				sql.add("insert into fapolis_d (no_polis,no_fa,kode_lokasi,nilai) values "+	
						"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(0,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg1.getCell(9,i))+")");
			}
			
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_fa_transaksi_fFapolisk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
		
		case "ubah" :	
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (nilaiToFloat(this.ed_nilai.getText()) == 0)
			{
				system.alert(this,"Nilai tidak valid.","Nilai polis tidak boleh kosong.");
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
					sql.add("update fapolis_m set no_del = 'DEL' where no_polis ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				else
				{
					sql.add(" delete from fapolis_m where no_polis ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from fapolis_d where no_polis ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;									
			
	}
};
window.app_saku_fa_transaksi_fFapolisk.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fapolis_m','no_polis',this.app._lokasi+"-POL"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}
			else
			{
				system.alert(this,"Periode harus valid.","");			
			}
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFapolisk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};

window.app_saku_fa_transaksi_fFapolisk.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};

window.app_saku_fa_transaksi_fFapolisk.prototype.showClick = function(sender)
{
	if (this.cb_bukti.getText() != "")
	{
		var line,data = this.dbLib.runSQL(" select a.no_dokumen,a.tgl_mulai,a.tgl_selesai,a.keterangan,a.nik_buat,a.nik_setuju,a.kode_vendor,a.nilai,a.nilai_premi,a.nilai_asset,"+
								          "        b.nama as nama_buat,c.nama as nama_setuju,a.periode,d.nama as nama_vendor "+
		                                  " from fapolis_m a "+
		                                  "        inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
										  "        inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
										  "        inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
										  " where a.no_polis = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.periodeLama = line.get("periode");
				this.ed_dok.setText(line.get("no_dokumen"));
				this.ed_desc.setText(line.get("keterangan"));
				this.dp_tgl2.setText(line.get("tgl_mulai"));
				this.dp_tgl3.setText(line.get("tgl_selesai"));
				this.cb_buat.setText(line.get("nik_buat"));
				this.cb_buat.setRightLabelCaption(line.get("nama_buat"));
				this.cb_setuju.setText(line.get("nik_setuju"));
				this.cb_setuju.setRightLabelCaption(line.get("nama_setuju"));
				this.cb_vendor.setText(line.get("kode_vendor"));
				this.cb_vendor.setRightLabelCaption(line.get("nama_vendor"));
				this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
				this.ed_premi.setText(floatToNilai(parseFloat(line.get("nilai_premi"))));
				this.ed_nasset.setText(floatToNilai(parseFloat(line.get("nilai_asset"))));
			} 
		}
		
		this.sg1.showLoading();
		var line,data = this.dbLib.runSQL(" select a.no_fa,a.barcode,a.nama,a.merk,a.tipe,a.no_seri,b.nama as lokfa,c.nama as pp,d.nama as pnj,(a.nilai-ifnull(e.tot_susut,0)) as nb,a.kode_akun,f.akun_deprs,a.kode_lokfa,a.kode_pp,a.nik_pnj,a.nilai "+
										  " from fapolis_d z "+
										  "                 inner join fa_asset a on z.no_fa=a.no_fa and z.kode_lokasi=a.kode_lokasi "+
										  "                 inner join fa_lokasi b on a.kode_lokfa = b.kode_lokfa and a.kode_lokasi=b.kode_lokasi "+
										  "     		    inner join pp c on a.kode_pp = c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
										  "     		    inner join karyawan d on a.nik_pnj = d.nik and a.kode_lokasi=d.kode_lokasi "+
										  "     		    inner join fa_klpakun f on a.kode_klpakun = f.kode_klpakun and a.kode_lokasi=f.kode_lokasi "+
										  "                 left outer join (select x.kode_lokasi,x.no_fa,sum(x.nilai) as tot_susut "+
										  "                                  from fasusut_d x inner join fasusut_m y on x.no_fasusut=y.no_fasusut and x.kode_lokasi=y.kode_lokasi "+
										  "                                  where y.no_del='-' and y.kode_lokasi='"+this.app._lokasi+"' group by x.kode_lokasi,x.no_fa) e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi "+
										  " where z.kode_lokasi='"+this.app._lokasi+"' and z.no_polis='"+this.cb_bukti.getText()+"'");
										  
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				this.sg1.clear();
				for (var i in data.objList)
				{
					line = data.get(i);
					this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15),
					new Array(line.get("no_fa"),line.get("barcode"),line.get("nama"),line.get("merk"),line.get("tipe"),line.get("no_seri"),line.get("lokfa"),line.get("pp"),line.get("pnj"),line.get("nilai"),line.get("nb"),
					          line.get("kode_akun"),line.get("akun_deprs"),line.get("kode_lokfa"),line.get("kode_pp"),line.get("nik_pnj")));
				}
			} 
		}			
		this.sg1.validasi();
		this.sg1.hideLoading();	
	}
};
												  
window.app_saku_fa_transaksi_fFapolisk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{   
			this.standarLib.showListData(this, "Daftar Polis",this.cb_bukti,undefined, 
										  "select no_polis, keterangan from fapolis_m where periode<='"+this.ed_period.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_del='-' ",
										  "select count(no_polis)      from fapolis_m where periode<='"+this.ed_period.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_del='-' ",
										  new Array("no_polis","keterangan"),"and",new Array("No Bukti","Deskripsi"),false);
			this.standarLib.clearByTag(this, new Array("2"),undefined);
		}
		if (sender == this.cb_vendor) 
		{   
			this.standarLib.showListData(this, "Daftar Vendor Forwarder",this.cb_vendor,undefined, 
										  "select kode_vendor,nama   from vendor where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("kode_vendor","nama"),"and",new Array("Kode Vendor","Nama"),false);
			
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_setuju,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};

window.app_saku_fa_transaksi_fFapolisk.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
					var line,data = this.dbLib.runSQL(" select a.barcode,a.nama,a.merk,a.tipe,a.no_seri,b.nama as lokfa,c.nama as pp,d.nama as pnj,(a.nilai-ifnull(e.tot_susut,0)) as nb,f.kode_akun,f.akun_deprs,a.kode_lokfa,a.kode_pp,a.nik_pnj,a.nilai "+
					                                  " from fa_asset a inner join fa_lokasi b on a.kode_lokfa = b.kode_lokfa and a.kode_lokasi=b.kode_lokasi "+
													  "     		    inner join pp c on a.kode_pp = c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
													  "     		    inner join karyawan d on a.nik_pnj = d.nik and a.kode_lokasi=d.kode_lokasi "+
													  "     		    inner join fa_klpakun f on a.kode_klpakun = f.kode_klpakun and a.kode_lokasi=f.kode_lokasi "+
													  "                 left outer join (select x.kode_lokasi,x.no_fa,sum(x.nilai) as tot_susut "+
													  "                                  from fasusut_d x inner join fasusut_m y on x.no_fasusut=y.no_fasusut and x.kode_lokasi=y.kode_lokasi "+
													  "                                  where y.no_del='-' and y.kode_lokasi='"+this.app._lokasi+"' group by x.kode_lokasi,x.no_fa) e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi "+
													  " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_fa='"+this.sg1.getCell(0,row)+"'");
					
					if (data instanceof portalui_arrayMap)
					{
						line = data.get(0);
						if (line != undefined)
						{
							this.sg1.setCell(1,row,line.get("barcode"));
							this.sg1.setCell(2,row,line.get("nama"));
							this.sg1.setCell(3,row,line.get("merk"));
							this.sg1.setCell(4,row,line.get("tipe"));
							this.sg1.setCell(5,row,line.get("no_seri"));
							this.sg1.setCell(6,row,line.get("lokfa"));
							this.sg1.setCell(7,row,line.get("pp"));
							this.sg1.setCell(8,row,line.get("pnj"));
							this.sg1.setCell(9,row,floatToNilai(parseFloat(line.get("nilai"))));
							this.sg1.setCell(10,row,floatToNilai(parseFloat(line.get("nb"))));
							this.sg1.setCell(11,row,line.get("kode_akun"));
							this.sg1.setCell(12,row,line.get("akun_deprs"));
							this.sg1.setCell(13,row,line.get("kode_lokfa"));
							this.sg1.setCell(14,row,line.get("kode_pp"));
							this.sg1.setCell(15,row,line.get("nik_pnj"));
						} 
					}	
					this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr] : doFindBtnClick : " + e);
	}
};

window.app_saku_fa_transaksi_fFapolisk.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Item Asset",this.sg1, this.sg1.row, this.sg1.col, 
												  "select no_fa,barcode from fa_asset where progress='1' and kode_lokasi='"+this.app._lokasi+"'",
												  "select count(no_fa)  from fa_asset where progress='1' and kode_lokasi='"+this.app._lokasi+"'",
												  new Array("no_fa","barcode"),"and",new Array("No Asset","Barcode"),false);
				break;
		}
	}catch(e)
	{
		alert("[doFindBtnClick : " + e);
	}
};

window.app_saku_fa_transaksi_fFapolisk.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(9,i) != "")
			{
				tot += nilaiToFloat(this.sg1.getCell(9,i));			
			}
		}
		this.ed_nasset.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[doNilaiChange:"+e);
	}
};

window.app_saku_fa_transaksi_fFapolisk.prototype.doRequestReady = function(sender, methodName, result)
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