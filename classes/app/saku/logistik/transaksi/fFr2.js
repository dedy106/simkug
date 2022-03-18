window.app_saku_logistik_transaksi_fFr2 = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fFr2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fFr2";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Final Receive: Input",0);
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(1);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText("");
		this.ed_period.setReadOnly(true);
	
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(2);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(18);		
		this.lbltgl1.setCaption("Tanggal");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(2);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(3);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No FR");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(3);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(4);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(5);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(8);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Penerima");
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption("");
		
		this.cb_po = new portalui_saiCBBL(this);
		this.cb_po.setLeft(20);
		this.cb_po.setTop(6);
		this.cb_po.setWidth(240);
		this.cb_po.setCaption("PO");
		this.cb_po.setText(""); 
		this.cb_po.setReadOnly(true);
		this.cb_po.setLabelWidth(100);
		this.cb_po.setRightLabelVisible(false);
		this.cb_po.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(260);
		this.bShow.setTop(6);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(700);
		this.ed_nilai.setTop(6);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Total Asset");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		
		this.bOk = new portalui_button(this);
		this.bOk.setLeft(446);
		this.bOk.setTop(6);
		this.bOk.setCaption("Detail");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(7);
	    this.p1.setWidth(900);
	    this.p1.setHeight(175);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Barang PO');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(145);
	    this.sg1.setColCount(27);
	    this.sg1.setColTitle(["Kode Brg","Nama Barang","Kode Akun","Jenis","Kode PP","Nama PP","Klp Asset","Nama Klp","Klp Akun","Nama Klp Akun","Kd Lokasi","Nama Lok","NIK Pnj","Nama Pnj","Tgl Awl Susut","Kd Kds","Kondisi","Satuan","Harga","Merk","Tipe","No Seri","Jml PO","Jml Terima","Residu","Umur","%Susut"]);
		this.sg1.setColWidth([26,25,24,23,22,21,20, 19,18,17,16,15,14,13,12,11,10, 9,8,7,6,5,4,3,2,1,0],
		                     [60,60,60,80,80,80,80, 80,100,50,50,40,80,90,60,90,60, 100,80,100,80,100,80,80,80,100,80]);	
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(4).setButtonStyle(window.bsEllips);		
		this.sg1.columns.get(6).setButtonStyle(window.bsEllips);		
		this.sg1.columns.get(8).setButtonStyle(window.bsEllips);		
		this.sg1.columns.get(10).setButtonStyle(window.bsEllips);		
		this.sg1.columns.get(12).setButtonStyle(window.bsEllips);		
		this.sg1.columns.get(14).setButtonStyle(window.bsDate);
		this.sg1.columns.get(15).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(0).setReadOnly(true);	
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(7).setReadOnly(true);	
		this.sg1.columns.get(9).setReadOnly(true);	
		this.sg1.columns.get(11).setReadOnly(true);	
		this.sg1.columns.get(13).setReadOnly(true);	
		this.sg1.columns.get(16).setReadOnly(true);	
		this.sg1.columns.get(17).setReadOnly(true);	
		this.sg1.columns.get(18).setReadOnly(true);	
		this.sg1.columns.get(22).setReadOnly(true);
		this.sg1.columns.get(23).setReadOnly(true);
		this.sg1.columns.get(25).setReadOnly(true);
		this.sg1.columns.get(26).setReadOnly(true);
		this.sg1.columns.get(18).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(22).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(23).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(24).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(25).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(26).setColumnFormat(window.cfNilai);
		
	    this.p2 = new portalui_panel(this);
	    this.p2.setLeft(20);
	    this.p2.setTop(8);
	    this.p2.setWidth(900);
	    this.p2.setHeight(125);
	    this.p2.setName('p2');
	    this.p2.setCaption('Detail Barang PO');
    	
		uses('portalui_saiGrid');
		this.sg2 = new portalui_saiGrid(this.p2); 
	    this.sg2.setLeft(1);
	    this.sg2.setTop(20);
	    this.sg2.setWidth(895);
	    this.sg2.setHeight(100);
	    this.sg2.setColCount(28);
	    this.sg2.setColTitle(["No Asset","No Inventori","No Tag TR","Kode Brg","Nama Barang","Kode Akun","Jenis","Kode PP","Nama PP","Klp Asset",
		                               "Nama Klp","Klp Akun","Nama Klp Akun","Kd Lokasi","Nama Lok","NIK Pnj","Nama Pnj","Tgl Awl Susut","Kd Kds","Kondisi",
									   "Satuan","Harga","Merk","Tipe","No Seri","Residu","Umur","%Susut"]);
		this.sg2.setColWidth([27,26,25,24,23,22,21,20, 19,18,17,16,15,14,13,12,11,10, 9,8,7,6,5,4,3,2,1,0],
		                     [60,60,60,80,80,80,100,50, 50,40,80,90,60,90,60,100,80,100, 80,100,80,80,80,100,80,120,100,100]);	
		this.sg2.setReadOnly(false);
		this.sg2.columns.get(7).setButtonStyle(window.bsEllips);		
		this.sg2.columns.get(9).setButtonStyle(window.bsEllips);		
		this.sg2.columns.get(11).setButtonStyle(window.bsEllips);		
		this.sg2.columns.get(13).setButtonStyle(window.bsEllips);		
		this.sg2.columns.get(15).setButtonStyle(window.bsEllips);		
		this.sg2.columns.get(17).setButtonStyle(window.bsDate);
		this.sg2.columns.get(18).setButtonStyle(window.bsEllips);
		this.sg2.columns.get(3).setReadOnly(true);	
		this.sg2.columns.get(4).setReadOnly(true);	
		this.sg2.columns.get(5).setReadOnly(true);	
		this.sg2.columns.get(6).setReadOnly(true);	
		this.sg2.columns.get(8).setReadOnly(true);	
		this.sg2.columns.get(10).setReadOnly(true);	
		this.sg2.columns.get(12).setReadOnly(true);	
		this.sg2.columns.get(14).setReadOnly(true);	
		this.sg2.columns.get(16).setReadOnly(true);	
		this.sg2.columns.get(19).setReadOnly(true);	
		this.sg2.columns.get(20).setReadOnly(true);	
		this.sg2.columns.get(21).setReadOnly(true);	
		this.sg2.columns.get(26).setReadOnly(true);	
		this.sg2.columns.get(27).setReadOnly(true);
		this.sg2.columns.get(21).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(25).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(26).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(27).setColumnFormat(window.cfNilai);
		
		this.rearrangeChild(10,22);
		setTipeButton(tbSimpan);
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
			this.cb_po.onBtnClick.set(this, "FindBtnClick");
			this.cb_po.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg2.onEllipsClick.set(this, "do2FindBtnClick");
			this.sg2.onCellExit.set(this, "do2CellExit");
			this.bOk.onClick.set(this, "detailClick");

			data = this.dbLib.runSQL("select flag from spro where kode_spro = 'PPNLOG' and kode_lokasi='"+this.app._lokasi+"'");
			var row = undefined;
			row = data.get(0);
			this.ppnlog = row.get("flag");			
			
			data = this.dbLib.runSQL("select value1 from spro where kode_spro = 'PPPNM' and kode_lokasi='"+this.app._lokasi+"'");
			var row = undefined;
			row = data.get(0);
			this.pppn = parseFloat(row.get("value1"))/100;
			
			var line,data = this.dbLib.runSQL("select a.kode_status,a.nama from fa_status a inner join spro b on a.kode_status=b.flag where b.kode_spro = 'KDSBAIK' and b.kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.kodeSTS = line.get("kode_status");
					this.namaSTS = line.get("nama");
				} 
			}
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			this.sg2.clear(); this.sg2.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fFr2.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fFr2.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_transaksi_fFr2.prototype.simpan = function()
{	
	this.sg1.validasi();
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("insert into fr_m (no_fr,kode_lokasi,no_dokumen,no_po,tanggal,keterangan,"+
					"             periode,nik_terima,tgl_input,nik_user,no_del,no_link) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.cb_po.getText()+"','"+
					this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.ed_period.getText()+"','"+this.cb_pembuat.getText()+"',now(),'"+this.app._userLog+"','-','-')");
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				sql.add("insert into fr_d (no_fr,kode_lokasi,kode_brg,kode_akun,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,tgl_susut,kode_status,merk,tipe,no_seri,residu) values "+	
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(2,i)+"','"+
						this.sg1.getCell(4,i)+"','"+this.sg1.getCell(6,i)+"','"+this.sg1.getCell(8,i)+"','"+this.sg1.getCell(10,i)+"','"+
						this.sg1.getCell(12,i)+"','"+this.sg1.getCellDateValue(14,i)+"','"+this.sg1.getCell(15,i)+"','"+
						this.sg1.getCell(19,i)+"','"+this.sg1.getCell(20,i)+"','"+this.sg1.getCell(21,i)+"',"+
						parseNilai(this.sg1.getCell(24,i))+")");
			}
			
			var psusut = "";
			for (var i=0; i < this.sg2.rows.getLength(); i++)
			{			
				psusut = this.sg2.getCellDateValue(17,i).substr(0,4)+this.sg2.getCellDateValue(17,i).substr(5,2);
				sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,kode_brg,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,"+
				        "                     progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri,kode_status,kode_akun,jenis) values "+
						"('"+
						this.sg2.getCell(0,i)+"','"+this.sg2.getCell(1,i)+"','"+this.app._lokasi+"','"+this.sg2.getCell(7,i)+"','"+this.sg2.getCell(9,i)+"','"+this.sg2.getCell(11,i)+"','"+this.sg2.getCell(13,i)+"','"+this.sg2.getCell(15,i)+"','"+this.sg2.getCell(3,i)+"','"+
						this.sg2.getCell(4,i)+"','"+this.kodeCurr+"',"+this.kurs+","+parseNilai(this.sg2.getCell(21,i))+","+
						parseNilai(this.sg2.getCell(25,i))+",'-','-','0','"+this.dp_tgl1.getDate()+"','"+this.ed_period.getText()+"','"+this.sg2.getCellDateValue(17,i)+"','"+
						this.app._userLog+"',now(),"+parseNilai(this.sg2.getCell(26,i))+","+parseNilai(this.sg2.getCell(27,i))+",'"+psusut+"','"+this.sg2.getCell(22,i)+"','"+
						this.sg2.getCell(23,i)+"','"+this.sg2.getCell(24,i)+"','"+this.sg2.getCell(18,i)+"','"+this.sg2.getCell(5,i)+"','"+this.sg2.getCell(6,i)+"')");
				
				sql.add("insert into fa_d (no_fr,no_fa,no_urut,barcode,no_tag,kode_lokasi) values "+	
						"('"+this.ed_nb.getText()+"','"+this.sg2.getCell(0,i)+"',"+i+",'"+this.sg2.getCell(1,i)+"','"+this.sg2.getCell(2,i)+"','"+this.app._lokasi+"')");
				//pake langsung per PO saja ... sql.add("update tr_d set progress='1' where no_tag='"+this.sg2.getCell(2,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}
			
			/*
			sql.add("update a set a.progress='1' from tr_d a inner join tr_m b on a.no_tr=b.no_tr and a.kode_lokasi=b.kode_lokasi "+
				    "       where b.no_po='"+this.cb_po.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and a.progress='0'");
			*/		
			
			sql.add(" update tr_d a, tr_m b set a.progress='1' where a.no_tr=b.no_tr and a.kode_lokasi=b.kode_lokasi and "+
				    " b.no_po='"+this.cb_po.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and a.progress='0'");
					
			sql.add("update po_m set progress = '9' where no_po = '"+this.cb_po.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);		
				this.sg1.clear(); this.sg1.appendRow(); this.sg2.clear(); this.sg2.appendRow();
			}
			break;
		
		case "simpan" :	
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
			{
				if (this.app._pernext == "1")
				  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
			}		
			else this.simpan();
			break;
			
		case "simpancek" : this.simpan();			
			break;
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fr_m','no_fr',this.app._lokasi+"-FR"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_logistik_transaksi_fFr2.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_logistik_transaksi_fFr2.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
	if (sender == this.cb_po)
	{
		var line,data = this.dbLib.runSQL("select kode_curr,kurs from po_m where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.kodeCurr = line.get("kode_curr");
				this.kurs = parseFloat(line.get("kurs"));
			} 
		}
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.showClick = function(sender)
{
	data = this.dbLib.runSQL("select nilai_ppn from po_m where no_po = '"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
	var row = undefined;
	row = data.get(0);
	this.nppn = parseFloat(row.get("nilai_ppn"));
	if ((this.ppnlog == "1") && (this.nppn != 0)) {var vppn = "T";}
    else {var vppn = "F";}	
	
	this.sg1.clear();  this.sg2.clear(); 
	var strSql =  " select a.kode_brg,b.nama as nama_brg,a.kode_akun,c.jenis,'-' as kode_pp,'-' as nama_pp,a.kode_sat,'"+this.dp_tgl1.getText()+"' as tgl,'"+this.kodeSTS+"' as kode_kondisi,'"+this.namaSTS+"' as nama_kondisi,"+
	              "        (case '"+vppn+"' when 'F' then a.nilai else (a.nilai + round(a.nilai * "+this.pppn+")) end) as harga,b.merk,b.tipe,sum(a.jumlah) as jumlah,f.jml_terima "+
	              " from po_d a inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
				  "             inner join barang_klp c on b.kode_klpbrg=c.kode_klpbrg and b.kode_lokasi=c.kode_lokasi "+
				  "             left outer join "+
				  "                 (select y.no_po,x.kode_brg,x.kode_akun,sum(x.jumlah) as jml_terima "+
				  "                  from tr_d x inner join tr_m y on x.no_tr=y.no_tr and x.kode_lokasi=y.kode_lokasi and x.progress<>'X' "+
				  "                  where y.no_del = '-' and x.kode_lokasi='"+this.app._lokasi+"' "+
				  "                  group by y.no_po,x.kode_brg,x.kode_akun) f on a.kode_brg=f.kode_brg and a.kode_akun=f.kode_akun and a.no_po=f.no_po "+				  
	              " where a.no_po = '"+this.cb_po.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.status='1' group by a.kode_brg,b.nama,a.kode_akun,c.jenis,a.kode_sat order by a.no_urut";
	              
	var data = this.dbLib.runSQL(strSql);
	if (data instanceof portalui_arrayMap)
	{
		if (data.get(0) != undefined)
		{									
			for (var i in data.objList)
			{
				line = data.get(i);
				this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26),
				    new Array(line.get("kode_brg"),line.get("nama_brg"),line.get("kode_akun"),line.get("jenis"),line.get("kode_pp"),line.get("nama_pp"),'-','-','-','-',
					'-','-','-','-',line.get("tgl"),line.get("kode_kondisi").toUpperCase(),line.get("nama_kondisi").toUpperCase(),line.get("kode_sat"),line.get("harga"),line.get("merk"),
					line.get("tipe"),'-',line.get("jumlah"),line.get("jml_terima"),'0','0','0'));					
			}
			this.sg1.validasi();
		} else this.sg1.appendRow();
	} else this.sg1.appendRow();
};
window.app_saku_logistik_transaksi_fFr2.prototype.detailClick = function(sender)
{
	this.sg2.clear();
	var noasset = this.standarLib.noBuktiOtomatis(this.dbLib,'fa_asset','no_fa',this.app._lokasi+"-AS"+this.ed_period.getText().substr(2,4)+".",'0000');
	var nu = parseFloat(noasset.substr(10,4));
	var nilaiHP = 0;
	
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{			
		if (nilaiToFloat(this.sg1.getCell(22,i)) !=  nilaiToFloat(this.sg1.getCell(23,i))) 
		{
			var j = i+1;
			system.alert(this,"Data final receive tidak valid.","Terdapat barang yang jumlah diterimanya tidak sama dengan jumlah pemesanan.[baris : "+j+"]");
			return false;
		} else
		{
			if (this.sg1.getCell(3,i) !=  "HABISPAKAI")
			{									   
				var strSql =  " select a.no_tag,a.no_seri,a.merk,a.tipe "+
				              " from tr_d a inner join tr_m b on a.no_tr=b.no_tr and a.kode_lokasi = b.kode_lokasi and a.progress<>'X' "+
				              " where a.kode_brg = '"+this.sg1.getCell(0,i)+"' and a.kode_akun = '"+this.sg1.getCell(2,i)+
							  "' and b.no_po = '"+this.cb_po.getText()+"' and b.no_del='-' and b.kode_lokasi = '"+this.app._lokasi+"' order by a.no_urut";
							  
				var data = this.dbLib.runSQL(strSql);
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						for (var k in data.objList)
						{
							noasset = this.app._lokasi+"-AS"+this.ed_period.getText().substr(2,4)+"."+formatNumeric('0000',nu);
							line = data.get(k);
							this.gridLib.SGAppendData(this.sg2,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27),
								new Array(noasset,"-",line.get("no_tag"), this.sg1.getCell(0,i),this.sg1.getCell(1,i),this.sg1.getCell(2,i),this.sg1.getCell(3,i),this.sg1.getCell(4,i),this.sg1.getCell(5,i),this.sg1.getCell(6,i),this.sg1.getCell(7,i),this.sg1.getCell(8,i),this.sg1.getCell(9,i), 
								                                      this.sg1.getCell(10,i),this.sg1.getCell(11,i),this.sg1.getCell(12,i),this.sg1.getCell(13,i),this.sg1.getCell(14,i),this.sg1.getCell(15,i),this.sg1.getCell(16,i),this.sg1.getCell(17,i),this.sg1.getCell(18,i),line.get("merk"),
																	  line.get("tipe"),line.get("no_seri"),this.sg1.getCell(24,i),this.sg1.getCell(25,i),this.sg1.getCell(26,i)));	
							nu++;							
						}
					} 
				}
			}
			else
			{
				//why ??? ------> j : buat dipakai di spb log final
				//bermasalah kalo TR lebih dari sekali .... gak boleh ngambil data TR kayak non HABISPAKAI
				noasset = this.app._lokasi+"-HP"+this.ed_period.getText().substr(2,4)+"."+formatNumeric('0000',nu);
				nilaiHP = nilaiToFloat(this.sg1.getCell(18,i)) *  nilaiToFloat(this.sg1.getCell(23,i));
				this.gridLib.SGAppendData(this.sg2,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27),
					new Array(noasset,"-",this.cb_po.getText(), this.sg1.getCell(0,i),this.sg1.getCell(1,i),this.sg1.getCell(2,i),this.sg1.getCell(3,i),this.sg1.getCell(4,i),this.sg1.getCell(5,i),this.sg1.getCell(6,i),this.sg1.getCell(7,i),this.sg1.getCell(8,i),this.sg1.getCell(9,i), 
														  this.sg1.getCell(10,i),this.sg1.getCell(11,i),this.sg1.getCell(12,i),this.sg1.getCell(13,i),this.sg1.getCell(14,i),this.sg1.getCell(15,i),this.sg1.getCell(16,i),this.sg1.getCell(17,i),floatToNilai(nilaiHP),this.sg1.getCell(19,i),
														  this.sg1.getCell(20,i),this.sg1.getCell(21,i),this.sg1.getCell(24,i),this.sg1.getCell(25,i),this.sg1.getCell(26,i)));	
				nu++;
			}
		}
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		var sts = true;
		switch(col)
		{
			case 4 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										          new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
				break;
			case 6 : 
				if (this.sg1.getCell(3,row).toUpperCase() == "ASSET") {sts = false;}
				this.standarLib.showListDataForSG(this, "Daftar Kelompok Asset",this.sg1, this.sg1.row, this.sg1.col, 
					 							  "select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										          "select count(kode_klpfa) from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											      new Array("kode_klpfa","nama"),"and",new Array("Kode Klp Asset","Deskripsi"),sts);
				
				break;
			case 8 : 
				if (this.sg1.getCell(3,row).toUpperCase() == "ASSET") {sts = false;}
				this.standarLib.showListDataForSG(this, "Daftar Kelompok Akun Asset",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_klpakun,nama   from fa_klpakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun = '"+this.sg1.getCell(2,row)+"' ",
												  "select count(kode_klpakun) from fa_klpakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun = '"+this.sg1.getCell(2,row)+"' ",
												  new Array("kode_klpakun","nama"),"and",new Array("Kode Klp Akun Asset","Deskripsi"),sts);
				this.sg2.setCell(25,row,"0");
				this.sg2.setCell(26,row,"0");
				break;
			case 10 : 
				this.standarLib.showListDataForSG(this, "Daftar Lokasi Asset",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_lokfa,nama   from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_lokfa) from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										          new Array("kode_lokfa","nama"),"and",new Array("Kode Lokasi Asset","Deskripsi"),false);
				break;
			case 12 : 
				this.standarLib.showListDataForSG(this, "Daftar Karyawan Penanggung Jawab",this.sg1, this.sg1.row, this.sg1.col, 
												  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
												  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
				break;
			case 15 : 
				this.standarLib.showListDataForSG(this, "Daftar Kondisi Barang",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_status,nama   from fa_status where jenis = 'S'",
												  "select count(kode_status) from fa_status where jenis = 'S'",
												  new Array("kode_status","nama"),"and",new Array("Kode","Deskripsi"),false);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr2] : doFindBtnClick : " + e);
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.do2FindBtnClick = function(sender, col, row) 
{
	try
	{
		var sts = true;
		switch(col)
		{
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg2, this.sg2.row, this.sg2.col, 
												  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										          new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
				break;
			case 9 : 
				if (this.sg2.getCell(6,row).toUpperCase() == "ASSET") {sts = false;}
				this.standarLib.showListDataForSG(this, "Daftar Kelompok Asset",this.sg2, this.sg2.row, this.sg2.col, 
					 							  "select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										          "select count(kode_klpfa) from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											      new Array("kode_klpfa","nama"),"and",new Array("Kode Klp Asset","Deskripsi"),sts);
				
				break;
			case 11 : 
				if (this.sg2.getCell(6,row).toUpperCase() == "ASSET") {sts = false;}
				this.standarLib.showListDataForSG(this, "Daftar Kelompok Akun Asset",this.sg2, this.sg2.row, this.sg2.col, 
												  "select kode_klpakun,nama   from fa_klpakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun = '"+this.sg2.getCell(5,row)+"' ",
												  "select count(kode_klpakun) from fa_klpakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun = '"+this.sg2.getCell(5,row)+"' ",
												  new Array("kode_klpakun","nama"),"and",new Array("Kode Klp Akun Asset","Deskripsi"),sts);
				this.sg2.setCell(26,row,"0");
				this.sg2.setCell(27,row,"0");
				break;
			case 13 : 
				this.standarLib.showListDataForSG(this, "Daftar Lokasi Asset",this.sg2, this.sg2.row, this.sg2.col, 
												  "select kode_lokfa,nama   from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_lokfa) from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
										          new Array("kode_lokfa","nama"),"and",new Array("Kode Lokasi Asset","Deskripsi"),false);
				break;
			case 15 : 
				this.standarLib.showListDataForSG(this, "Daftar Karyawan Penanggung Jawab",this.sg2, this.sg2.row, this.sg2.col, 
												  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
												  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
				break;
			case 18 : 
				this.standarLib.showListDataForSG(this, "Daftar Kondisi Barang",this.sg2, this.sg2.row, this.sg2.col, 
												  "select kode_status,nama   from fa_status where jenis = 'S'",
												  "select count(kode_status) from fa_status where jenis = 'S'",
												  new Array("kode_status","nama"),"and",new Array("Kode","Deskripsi"),false);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr2] : doFindBtnClick : " + e);
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 8 : 
					var line,data = this.dbLib.runSQL(" select umur,persen from fa_klpakun "+
					                                  " where kode_lokasi='"+this.app._lokasi+"' and kode_klpakun='"+this.sg1.getCell(8,row)+"'");
					if (data instanceof portalui_arrayMap)
					{
						line = data.get(0);
						if (line != undefined)
						{
							this.sg1.setCell(25,row,line.get("umur"));
							this.sg1.setCell(26,row,line.get("persen"));
						} 
					}	
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr2] : doCellExit : " + e);
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.do2CellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 11 : 
					var line,data = this.dbLib.runSQL(" select umur,persen from fa_klpakun "+
					                                  " where kode_lokasi='"+this.app._lokasi+"' and kode_klpakun='"+this.sg2.getCell(11,row)+"'");
					if (data instanceof portalui_arrayMap)
					{
						line = data.get(0);
						if (line != undefined)
						{
							this.sg2.setCell(26,row,line.get("umur"));
							this.sg2.setCell(27,row,line.get("persen"));
						} 
					}	
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr2] : doCellExit : " + e);
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if ((this.sg1.getCell(18,i) != "") && (this.sg1.getCell(23,i) != ""))
			{
				tot += nilaiToFloat(this.sg1.getCell(18,i)) * nilaiToFloat(this.sg1.getCell(23,i));			
			}
		}
		this.ed_nilai.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr2]::doNilaiChange:"+e);
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Penerima",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
		}
		if (sender == this.cb_po) 
		{   
		    this.standarLib.showListData(this, "Daftar PO",sender,undefined, 
										  "select no_po, keterangan from po_m where kode_lokasi='"+this.app._lokasi+"' and no_del='-' and periode<='"+this.ed_period.getText()+"' and progress = '1'",
										  "select count(no_po)      from po_m where kode_lokasi='"+this.app._lokasi+"' and no_del='-' and periode<='"+this.ed_period.getText()+"' and progress = '1'",
										  new Array("no_po","keterangan"),"and",new Array("No PO","Deskripsi"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fFr2.prototype.doRequestReady = function(sender, methodName, result)
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