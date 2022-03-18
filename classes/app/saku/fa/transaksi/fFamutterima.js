window.app_saku_fa_transaksi_fFamutterima = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFamutterima.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFamutterima";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Terima Asset: Input", 0);	
				
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
		this.ed_nb.setCaption("No Mutasi Kirim");
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
		
		this.cb_kirim = new portalui_saiCBBL(this);
		this.cb_kirim.setLeft(20);
		this.cb_kirim.setTop(164);
		this.cb_kirim.setWidth(235);
		this.cb_kirim.setCaption("No Mutasi Kirim");
		this.cb_kirim.setText(""); 
		this.cb_kirim.setReadOnly(true);
		this.cb_kirim.setLabelWidth(100);
		this.cb_kirim.setRightLabelVisible(false);
		this.cb_kirim.setRightLabelCaption("");	
			
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(255);
		this.bShow.setTop(164);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.cb_tak = new portalui_saiCBBL(this);
		this.cb_tak.setLeft(20);
		this.cb_tak.setTop(186);
		this.cb_tak.setWidth(185);
		this.cb_tak.setCaption("Akun Mutasi Asset");
		this.cb_tak.setText(""); 
		this.cb_tak.setReadOnly(true);
		this.cb_tak.setLabelWidth(100);
		this.cb_tak.setRightLabelVisible(true);
		this.cb_tak.setRightLabelCaption("");	
		
		this.cb_vendor = new portalui_saiCBBL(this);
		this.cb_vendor.setLeft(20);
		this.cb_vendor.setTop(208);
		this.cb_vendor.setWidth(185);
		this.cb_vendor.setCaption("Vendor");
		this.cb_vendor.setText(""); 
		this.cb_vendor.setReadOnly(true);
		this.cb_vendor.setLabelWidth(100);
		this.cb_vendor.setRightLabelVisible(true);
		this.cb_vendor.setRightLabelCaption("");	
		
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(230);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setCaption("Lokasi Asal");
		this.cb_lokasi.setText(""); 
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setRightLabelCaption("");	
		
		this.cb_lokfa = new portalui_saiCBBL(this);
		this.cb_lokfa.setLeft(20);
		this.cb_lokfa.setTop(252);
		this.cb_lokfa.setWidth(185);
		this.cb_lokfa.setCaption("Lokasi Asset Tuj.");
		this.cb_lokfa.setText(""); 
		this.cb_lokfa.setReadOnly(true);
		this.cb_lokfa.setLabelWidth(100);
		this.cb_lokfa.setRightLabelVisible(true);
		this.cb_lokfa.setRightLabelCaption("");	
		
		this.ed_nasset = new portalui_saiLabelEdit(this);
		this.ed_nasset.setLeft(700);
		this.ed_nasset.setTop(230);
		this.ed_nasset.setWidth(220);
		this.ed_nasset.setTipeText(ttNilai);
		this.ed_nasset.setAlignment(alRight);
		this.ed_nasset.setLabelWidth(100);
		this.ed_nasset.setCaption("Tot. Nilai Asset");
		this.ed_nasset.setText("0"); 
		this.ed_nasset.setReadOnly(true);
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(700);
		this.ed_total.setTop(252);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(100);
		this.ed_total.setCaption("Tot. Nilai Buku");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
		
		this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(276);
	    this.p1.setWidth(900);
	    this.p1.setHeight(180);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Asset');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(160);
	    this.sg1.setColCount(21);
	    this.sg1.setColTitle(new Array("Klp Asset","Nm Klp Asset","Klp Akun","Nm Klp Akun","Kode Dept","Nama Dept","Kode Lok","Lokasi Asset","NIK Pnj","Nama Pnj",
		                               "No Asset Baru","No Asset","Barcode","Deskripsi","Merk","Tipe","No Seri","Nilai","Nilai Buku","Akun Asset","Akun AP"));
		this.sg1.setColWidth(new Array(20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0),
		                     new Array(80,80,100,100,80,100,100,120,100,110,110, 100,60,100,60,100,60,100,60,100,60));	
		this.sg1.setReadOnly(false);
	
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(2).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(4).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(6).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(8).setButtonStyle(window.bsEllips);
		
		this.sg1.columns.get(17).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(18).setColumnFormat(window.cfNilai);
		
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(7).setReadOnly(true);	
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
		this.sg1.columns.get(19).setReadOnly(true);	
		this.sg1.columns.get(20).setReadOnly(true);	
		
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
			this.cb_tak.onBtnClick.set(this, "FindBtnClick");
			this.cb_kirim.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFamutterima.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFamutterima.prototype.mainButtonClick = function(sender)
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

window.app_saku_fa_transaksi_fFamutterima.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			if (this.cb_lokasi.getText() == this.app._lokasi)
			{
				vposted = "X";
				vmodul = "NONTAK";
			}
			else
			{
				vposted = "F";
				vmodul = "TAK";
			}
			
			sql.add("update famutkirim_m set progress='1' where no_kirim='"+this.cb_kirim.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
			sql.add(" insert into famutterima_m (no_terima,no_kirim,no_dokumen,kode_lokasi,lokasi_asal,kode_lokfa,kode_vendor,tanggal,keterangan,"+
			        " nilai,nilai_buku,kode_curr,kurs,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_kirim.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.cb_lokasi.getText()+"','"+this.cb_lokfa.getText()+"','"+
					this.cb_vendor.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"',"+
					parseNilai(this.ed_nasset.getText())+","+parseNilai(this.ed_total.getText())+",'IDR',1,'-','-','"+vmodul+"','"+vposted+"',"+
					"'"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				if (this.app._lokasi == this.cb_lokasi.getText())
				{
					sql.add("update fa_asset set progress='1',kode_klpfa='"+this.sg1.getCell(0,i)+"',kode_klpakun='"+
					        this.sg1.getCell(2,i)+"',kode_pp='"+this.sg1.getCell(4,i)+"',kode_lokfa='"+
							this.sg1.getCell(6,i)+"',nik_pnj='"+this.sg1.getCell(8,i)+
							"' where no_fa='"+this.sg1.getCell(11,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
				else
				{
					sql.add(" insert into fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri) "+
							" select '"+this.sg1.getCell(10,i)+"',barcode,'"+this.app._lokasi+"','"+this.sg1.getCell(4,i)+"','"+this.sg1.getCell(0,i)+"','"+
							            this.sg1.getCell(2,i)+"','"+this.sg1.getCell(6,i)+"','"+this.sg1.getCell(8,i)+"',nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,1,tgl_perolehan,periode,tgl_susut,'"+
										this.app._userLog+"',now(),umur,persen,periode_susut,merk,tipe,no_seri from fa_asset "+
							" where no_fa='"+this.sg1.getCell(11,i)+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
				}
				sql.add("update famutasi_d set no_terima='"+this.ed_nb.getText()+"',no_fabaru='"+this.sg1.getCell(10,i)+"' where no_kirim='"+this.cb_kirim.getText()+"' and no_fa='"+this.sg1.getCell(11,i)+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
			}	

			if (vposted == "F")
			{
				//-----------------------------------------------------------------------------------------  grouping jurnal
				if (this.app._lokasi != this.cb_lokasi.getText())
				{
					var row,dtJurnal = new portalui_arrayMap();
					var nemu = false;
					var dtJrnl = 0;
					
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						kdAkun = this.sg1.getCell(19,i);
						
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
							row.set("nilai",nilaiToFloat(this.sg1.getCell(17,i)));
							dtJrnl++;
							dtJurnal.set(dtJrnl,row);						
						}else {
							dtJurnal.get(ix).set("nilai",row.get("nilai") + nilaiToFloat(this.sg1.getCell(17,i)));				
						}
						
						ix = -1;
						kdAkun = this.sg1.getCell(20,i);
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
							row.set("nilai",nilaiToFloat(this.sg1.getCell(18,i)));
							dtJrnl++;
							dtJurnal.set(dtJrnl,row);						
						}else {				
							dtJurnal.get(ix).set("nilai",row.get("nilai") + nilaiToFloat(this.sg1.getCell(18,i)));				
						}
					}
					this.gridJurnal = dtJurnal;
					//-----------------------------------------------------------------------------------------  grouping jurnal
					
					var scr1 = "insert into famutterima_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
								"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var awal = true;
					var line = undefined;
					for (var i in this.gridJurnal.objList)
					{
						if (!awal) { scr1 += ",";}	
						line = this.gridJurnal.get(i);
						scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+line.get("kode_akun")+
							 	"','"+line.get("keterangan")+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'-','-',"+
								"'"+this.app._lokasi+"','MUTTRM','ASSET','"+this.ed_period.getText()+
								"','IDR',1"+
								",'"+this.app._userLog+"',now())";
						awal = false;
					}
					if (nilaiToFloat(this.ed_nasset.getText()) != nilaiToFloat(this.ed_total.getText()))
					{
						var nilaitak = nilaiToFloat(this.ed_nasset.getText()) -  nilaiToFloat(this.ed_total.getText());
						scr1 += ",";
						scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.cb_tak.getText()+
								 	"','"+this.ed_desc.getText()+"','C',"+nilaitak+",'-','-',"+
									"'"+this.app._lokasi+"','MUTTRM','TAK','"+this.ed_period.getText()+
									"','IDR',1"+
									",'"+this.app._userLog+"',now())";
					}
					sql.add(scr1);
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
window.app_saku_fa_transaksi_fFamutterima.prototype.doModalResult = function(event, modalResult)
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
window.app_saku_fa_transaksi_fFamutterima.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'famutterima_m','no_terima',this.app._lokasi+"-TRM"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_fa_transaksi_fFamutterima.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFamutterima.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};

window.app_saku_fa_transaksi_fFamutterima.prototype.showClick = function(sender)
{
	try
	{
		this.sg1.showLoading();
		var line,data = this.dbLib.runSQL(" select a.kode_vendor,b.nama as nama_vendor,a.kode_lokasi,c.nama as nama_lokasi,a.lokfa_tuj,d.nama as nama_lokfa,a.lokasi_tuj "+
										  " from famutkirim_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
										  "                     inner join lokasi c on a.kode_lokasi=c.kode_lokasi "+
										  "                     inner join fa_lokasi d on a.lokfa_tuj=d.kode_lokfa and a.lokasi_tuj=d.kode_lokasi "+
										  " where a.no_kirim='"+this.cb_kirim.getText()+"' and a.lokasi_tuj='"+this.app._lokasi+"'");
						
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.cb_vendor.setText(line.get("kode_vendor"));
				this.cb_vendor.setRightLabelCaption(line.get("nama_vendor"));
				this.cb_lokasi.setText(line.get("kode_lokasi"));
				this.cb_lokasi.setRightLabelCaption(line.get("nama_lokasi"));
				this.cb_lokfa.setText(line.get("lokfa_tuj"));
				this.cb_lokfa.setRightLabelCaption(line.get("nama_lokfa"));
				if (line.get("kode_lokasi") == line.get("lokasi_tuj"))
				{  
					this.cb_tak.setTag("9"); 
					this.cb_tak.setColor("silver");
				}
				else
				{
					this.cb_tak.setTag("0");
					this.cb_tak.setColor(system.getConfig("text.disabled"));
				}
			} 
		}
		
		if (line.get("kode_lokasi") != line.get("lokasi_tuj"))
		{  
			var nofa = this.standarLib.noBuktiOtomatis(this.dbLib,'fa_asset','no_fa',this.app._lokasi+"-AS"+this.ed_period.getText().substr(2,4)+".",'0000');
			var idx = parseFloat(nofa.substr(10,4));
			nofa = nofa.substr(0,10);
		} 
		var line,data = this.dbLib.runSQL(" select a.no_fa,a.barcode,a.nama,a.merk,a.tipe,a.no_seri,a.nilai,(a.nilai-ifnull(e.tot_susut,0)) as nb,f.kode_akun,f.akun_deprs "+
										  " from famutasi_d z inner join fa_asset a on z.no_fa=a.no_fa and z.kode_lokasi=a.kode_lokasi "+
										  "     		    inner join fa_klpakun f on a.kode_klpakun = f.kode_klpakun and a.kode_lokasi=f.kode_lokasi "+
										  "                 left outer join (select x.kode_lokasi,x.no_fa,sum(x.nilai) as tot_susut "+
										  "                                  from fasusut_d x inner join fasusut_m y on x.no_fasusut=y.no_fasusut and x.kode_lokasi=y.kode_lokasi "+
										  "                                  where y.no_del='-' and y.kode_lokasi='"+this.cb_lokasi.getText()+"' group by x.kode_lokasi,x.no_fa) e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi "+
										  " where z.lokasi_tuj='"+this.app._lokasi+"' and z.no_kirim='"+this.cb_kirim.getText()+"'");
					
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				this.sg1.clear();
				for (var i in data.objList)
				{
					line = data.get(i);
					if (line.get("kode_lokasi") != line.get("lokasi_tuj")) nofa = nofa + formatNumeric('0000',idx);
					else nofa = line.get("no_fa");
					
					this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20),
					new Array("-","-","-","-","-","-","-","-","-","-",nofa,line.get("no_fa"),line.get("barcode"),line.get("nama"),line.get("merk"),line.get("tipe"),
					line.get("no_seri"),floatToNilai(parseFloat(line.get("nilai"))),
					floatToNilai(parseFloat(line.get("nb"))),line.get("kode_akun"),line.get("akun_deprs")));					
					idx = idx+1;
				}
			} 
		}			
		this.sg1.validasi();
		this.sg1.hideLoading();
	}catch(e)
	{
		alert("[ShowClick:"+e);
	}
};
												  
window.app_saku_fa_transaksi_fFamutterima.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_kirim) 
		{   
			this.standarLib.showListData(this, "Daftar Mutasi Asset Kirim",this.cb_kirim,undefined, 
										  "select no_kirim, keterangan from famutkirim_m where progress='0' and lokasi_tuj='"+this.app._lokasi+"' and periode<='"+this.ed_period.getText()+"'",
										  "select count(no_kirim)      from famutkirim_m where progress='0' and lokasi_tuj='"+this.app._lokasi+"' and periode<='"+this.ed_period.getText()+"'",
										  new Array("no_kirim","keterangan"),"and",new Array("No Mutasi","Keterangan"),false);
		}
		if (sender == this.cb_tak) 
		{   
		    if (this.cb_lokasi.getText() != this.app._lokasi)
			{
				this.standarLib.showListData(this, "Daftar Akun Mutasi Asset",this.cb_tak,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '016'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '016'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama"),false);
			}
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
window.app_saku_fa_transaksi_fFamutterima.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Kelompok Asset",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_klpfa) from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
												  new Array("kode_klpfa","nama"),"and",new Array("Kode Klp Asset","Deskripsi"),false);
				break;
			case 2 : 
				this.standarLib.showListDataForSG(this, "Daftar Kelompok Akun Asset",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_klpakun,nama   from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_klpakun) from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",
												  new Array("kode_klpakun","nama"),"and",new Array("Kode Klp Akun Asset","Deskripsi"),false);
				break;
			case 4 : 
				this.standarLib.showListDataForSG(this, "Daftar Departemen",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
												  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
												  new Array("kode_pp","nama"),"and",new Array("Kode Dept","Deskripsi"),false);
				break;
			case 6 : 
				this.standarLib.showListDataForSG(this, "Daftar Lokasi Asset",this.sg1, this.sg1.row, this.sg1.col, 
												  "select kode_lokfa,nama   from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting'",
												  "select count(kode_lokfa) from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting'",
												  new Array("kode_lokfa","nama"),"and",new Array("Kode Lokasi","Nama"),false);
				break;
			case 8 : 
				this.standarLib.showListDataForSG(this, "Daftar Karyawan Penanggung Jawab",this.sg1, this.sg1.row, this.sg1.col, 
												  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
												  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
				break;
		}
	}catch(e)
	{
		alert("[doFindBtnClick : " + e);
	}
};
window.app_saku_fa_transaksi_fFamutterima.prototype.doNilaiChange = function()
{
	try
	{
		var tot = nb = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(17,i) != "")
			{
				tot += nilaiToFloat(this.sg1.getCell(17,i));			
			}
			if (this.sg1.getCell(18,i) != "")
			{
				nb += nilaiToFloat(this.sg1.getCell(18,i));			
			}
		}
		this.ed_nasset.setText(floatToNilai(tot));
		this.ed_total.setText(floatToNilai(nb));
	}catch(e)
	{
		alert("[doNilaiChange:"+e);
	}
};
window.app_saku_fa_transaksi_fFamutterima.prototype.doRequestReady = function(sender, methodName, result)
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