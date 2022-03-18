window.app_saku_fa_transaksi_fFawoapp = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFawoapp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFawoapp";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Write Off Asset: Input", 0);	
				
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
		this.ed_nb.setCaption("No Verifikasi");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
			
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(50);
		
		uses("portalui_saiCBBL");
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(120);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setText(""); 
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");	
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(142);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");	
		
		this.cb_wo = new portalui_saiCBBL(this);
		this.cb_wo.setLeft(20);
		this.cb_wo.setTop(164);
		this.cb_wo.setWidth(235);
		this.cb_wo.setCaption("No Pengajuan WO");
		this.cb_wo.setText(""); 
		this.cb_wo.setReadOnly(true);
		this.cb_wo.setLabelWidth(100);
		this.cb_wo.setRightLabelVisible(false);
		this.cb_wo.setRightLabelCaption("");	
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(255);
		this.bShow.setTop(164);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(300);
		this.bPAll.setTop(164);
		this.bPAll.setCaption("APP All");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_nasset = new portalui_saiLabelEdit(this);
		this.ed_nasset.setLeft(700);
		this.ed_nasset.setTop(142);
		this.ed_nasset.setWidth(220);
		this.ed_nasset.setTipeText(ttNilai);
		this.ed_nasset.setAlignment(alRight);
		this.ed_nasset.setLabelWidth(100);
		this.ed_nasset.setCaption("Tot. Asset");
		this.ed_nasset.setText("0"); 
		this.ed_nasset.setReadOnly(true);
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(700);
		this.ed_total.setTop(164);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(100);
		this.ed_total.setCaption("Tot. Depresiasi");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
			
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(186);
	    this.p1.setWidth(900);
	    this.p1.setHeight(285);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Asset');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(240);
	    this.sg1.setColCount(19);
	    this.sg1.setColTitle(new Array("Status","No Asset","Barcode","Deskripsi","Merk","Tipe","No Seri","Nilai Perolehan","Tgl Perolehan","Departemen",
		                               "Lokasi","Png Jawab","Akun Asset","Akun AP","%Susut","Umur","Nilai Buku","Nilai Residu","Nilai Deprs."));
		this.sg1.setColWidth(new Array(18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0),
		                     new Array(80,80,80,60,60,60,60,100,100, 100,80,100,100,100,100,120,100,110,80));	
		this.sg1.setReadOnly(false);
	
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "APP");
			val.set(2, "NONAPP");
		this.sg1.columns.get(0).setPicklist(val);
		this.sg1.columns.get(7).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(14).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(15).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(16).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(17).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(18).setColumnFormat(window.cfNilai);
		
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(6).setReadOnly(true);	
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
		this.sg1.columns.get(18).setReadOnly(true);	
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(260);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
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
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_wo.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.bPAll.onClick.set(this, "pAllClick");
			
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			
			try
			{
				var data = this.dbLib.runSQL("select flag from spro where kode_spro = 'OEWO' and kode_lokasi='"+this.app._lokasi+"'");
				var row = undefined;
				row = data.get(0);
				this.akunOE = row.get("flag");
			}
			catch(e)
			{
				system.alert(this, e,"Kode OEWO di SPRO undefined");
			}
			
				
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFawoapp.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFawoapp.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_transaksi_fFawoapp.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("update fawo_m set progress='1' where no_wo='"+this.cb_wo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
			sql.add(" insert into fawoapp_m (no_woapp,no_wo,no_dokumen,kode_lokasi,tanggal,keterangan,"+
			        " nilai,nilai_ap,kode_curr,kurs,kode_pp,kode_drk,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_wo.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"',"+
					parseNilai(this.ed_nasset.getText())+","+parseNilai(this.ed_total.getText())+",'IDR',1,'-','-','F',"+
					"'"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				if (this.sg1.getCell(0,i).toUpperCase() == 'NONAPP')
				{
					var progress = "1";					
					var stsapp = "NONAPP";					
				}
				if (this.sg1.getCell(0,i).toUpperCase() == 'APP')
				{
					var progress = "X";	
					var stsapp = "APP";					
				}
				sql.add("update fa_asset set progress='"+progress+"' where no_fa='"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("update fawo_d set status_app='"+stsapp+"' where no_fa='"+this.sg1.getCell(1,i)+"' and no_wo='"+this.cb_wo.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}		
			
			//-----------------------------------------------------------------------------------------  grouping jurnal
			var row,dtJurnal = new portalui_arrayMap();
			var nemu = false;
			var dtJrnl = 0;
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i).toUpperCase() == 'APP')
				{
					kdAkun = this.sg1.getCell(13,i);
					
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
						row.set("dc","D");
						row.set("keterangan",this.ed_desc.getText());
						row.set("nilai",nilaiToFloat(this.sg1.getCell(18,i)));
						dtJrnl++;
						dtJurnal.set(dtJrnl,row);						
					}else {
						dtJurnal.get(ix).set("nilai",row.get("nilai") + nilaiToFloat(this.sg1.getCell(18,i)));				
					}
					
					ix = -1;
					kdAkun = this.sg1.getCell(12,i);
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
						row.set("dc","C");
						row.set("keterangan",this.ed_desc.getText());
						row.set("nilai",nilaiToFloat(this.sg1.getCell(7,i)));
						dtJrnl++;
						dtJurnal.set(dtJrnl,row);						
					}else {				
						dtJurnal.get(ix).set("nilai",row.get("nilai") + nilaiToFloat(this.sg1.getCell(7,i)));				
					}
				}
			}
			this.gridJurnal = dtJurnal;
			//-----------------------------------------------------------------------------------------  grouping jurnal
			
			var scr1 = "insert into fawoapp_j (no_woapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
			var awal = true;
			var line = undefined;
			for (var i in this.gridJurnal.objList)
			{
				if (!awal) { scr1 += ",";}	
				line = this.gridJurnal.get(i);
				scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+line.get("kode_akun")+
						"','"+line.get("keterangan")+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'-','-',"+
						"'"+this.app._lokasi+"','WO','ASSET','"+this.ed_period.getText()+
						"','IDR',1"+
						",'"+this.app._userLog+"',now())";
				awal = false;
			}
			if (nilaiToFloat(this.ed_nasset.getText()) != nilaiToFloat(this.ed_total.getText()))
			{
				var nilaiOE = nilaiToFloat(this.ed_nasset.getText()) -  nilaiToFloat(this.ed_total.getText());
				scr1 += ",";
				scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.akunOE+
							"','"+this.ed_desc.getText()+"','D',"+nilaiOE+",'-','-',"+
							"'"+this.app._lokasi+"','WO','OE','"+this.ed_period.getText()+
							"','IDR',1"+
							",'"+this.app._userLog+"',now())";
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
window.app_saku_fa_transaksi_fFawoapp.prototype.doModalResult = function(event, modalResult)
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
			}
			break;
		
		case "simpan" :	
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			var cekData = "F";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if ((this.sg1.getCell(0,i) != "APP") && (this.sg1.getCell(0,i) != "NONAPP"))
				cekData = "T";
			}
			if (cekData == "T")
			{
				system.alert(this,"Terdapat transaksi yang tidak diproses.","Pilih APP atau NON APP untuk memvalidasi transaksi di kolom status.");
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
window.app_saku_fa_transaksi_fFawoapp.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fawoapp_m','no_woapp',this.app._lokasi+"-AWO"+this.ed_period.getText().substr(2,4)+".",'0000'));
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

window.app_saku_fa_transaksi_fFawoapp.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};

window.app_saku_fa_transaksi_fFawoapp.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};
window.app_saku_fa_transaksi_fFawoapp.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"APP");
	}
	this.sg1.validasi();
};

window.app_saku_fa_transaksi_fFawoapp.prototype.showClick = function(sender)
{
	if (this.cb_wo.getText() != "")
	{
		try
		{
			this.sg1.showLoading();
			var line,data = this.dbLib.runSQL(" select a.no_fa,a.barcode,a.nama,a.merk,a.tipe,a.no_seri,a.nilai,a.tgl_perolehan,b.nama as nama_pp,c.nama as nama_lokfa,d.nama as nama_pnj,"+
			                                 "         (a.nilai-ifnull(e.tot_susut,0)) as nb,f.kode_akun,f.akun_deprs,a.persen,a.umur,a.nilai_residu,ifnull(e.tot_susut,0) as nilai_ap "+
											  " from fawo_d z inner join fa_asset a on z.no_fa=a.no_fa and z.kode_lokasi=a.kode_lokasi "+
											  "     		    inner join pp b on a.kode_pp = b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
											  "     		    inner join fa_lokasi c on a.kode_lokfa = c.kode_lokfa and a.kode_lokasi=c.kode_lokasi "+
											  "     		    inner join karyawan d on a.nik_pnj = d.nik and a.kode_lokasi=d.kode_lokasi "+
											  "     		    inner join fa_klpakun f on a.kode_klpakun = f.kode_klpakun and a.kode_lokasi=f.kode_lokasi "+
											  "                 left outer join (select x.kode_lokasi,x.no_fa,sum(x.nilai) as tot_susut "+
											  "                                  from fasusut_d x inner join fasusut_m y on x.no_fasusut=y.no_fasusut and x.kode_lokasi=y.kode_lokasi "+
											  "                                  where y.no_del='-' and y.kode_lokasi='"+this.app._lokasi+"' group by x.kode_lokasi,x.no_fa) e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi "+
											  " where z.kode_lokasi='"+this.app._lokasi+"' and z.no_wo='"+this.cb_wo.getText()+"'");
						
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					this.sg1.clear();
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18),
						new Array("INPROG",line.get("no_fa"),line.get("barcode"),line.get("nama"),line.get("merk"),line.get("tipe"),
						line.get("no_seri"),floatToNilai(parseFloat(line.get("nilai"))),line.get("tgl_perolehan"),line.get("nama_pp"),
						line.get("nama_lokfa"),line.get("nama_pnj"),line.get("kode_akun"),line.get("akun_deprs"),
						floatToNilai(parseFloat(line.get("persen"))),floatToNilai(parseFloat(line.get("umur"))),
						floatToNilai(parseFloat(line.get("nb"))),floatToNilai(parseFloat(line.get("nilai_residu"))),
						floatToNilai(parseFloat(line.get("nilai_ap")))));					
					}
				} 
			}			
			this.sg1.validasi();
			this.sg1.hideLoading();
		}catch(e)
		{
			alert("[ShowClick:"+e);
		}
	}
};
												  
window.app_saku_fa_transaksi_fFawoapp.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_wo) 
		{   
		    this.standarLib.showListData(this, "Daftar Pengajuan Write Off",this.cb_wo,undefined, 
										  "select no_wo, keterangan from fawo_m where progress='0' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.ed_period.getText()+"'",
										  "select count(no_wo)      from fawo_m where progress='0' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.ed_period.getText()+"'",
										  new Array("no_wo","keterangan"),"and",new Array("No Pengajuan","Keterangan"),false);
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


window.app_saku_fa_transaksi_fFawoapp.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
					this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("[doFindBtnClick : " + e);
	}
};

window.app_saku_fa_transaksi_fFawoapp.prototype.doNilaiChange = function()
{
	try
	{
		var tot = ap = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(0,i).toUpperCase() == "APP") 
			{
				if (this.sg1.getCell(7,i) != "")
				{
					tot += nilaiToFloat(this.sg1.getCell(7,i));			
				}
				if (this.sg1.getCell(18,i) != "")
				{
					ap += nilaiToFloat(this.sg1.getCell(18,i));			
				}
			}
		}
		this.ed_nasset.setText(floatToNilai(tot));
		this.ed_total.setText(floatToNilai(ap));
	}catch(e)
	{
		alert("[doNilaiChange:"+e);
	}
};

window.app_saku_fa_transaksi_fFawoapp.prototype.doRequestReady = function(sender, methodName, result)
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