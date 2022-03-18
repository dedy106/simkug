window.app_saku_fa_transaksi_fFamutkirim = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFamutkirim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFamutkirim";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Kirim Asset: Input", 0);	
				
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
		
		this.cb_vendor = new portalui_saiCBBL(this);
		this.cb_vendor.setLeft(20);
		this.cb_vendor.setTop(164);
		this.cb_vendor.setWidth(185);
		this.cb_vendor.setCaption("Vendor");
		this.cb_vendor.setText(""); 
		this.cb_vendor.setReadOnly(true);
		this.cb_vendor.setLabelWidth(100);
		this.cb_vendor.setRightLabelVisible(true);
		this.cb_vendor.setRightLabelCaption("");	
		
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(186);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setCaption("Lokasi Tujuan");
		this.cb_lokasi.setText(""); 
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setRightLabelCaption("");	
		
		this.cb_lokfa = new portalui_saiCBBL(this);
		this.cb_lokfa.setLeft(20);
		this.cb_lokfa.setTop(208);
		this.cb_lokfa.setWidth(185);
		this.cb_lokfa.setCaption("Lokasi Asset Tuj.");
		this.cb_lokfa.setText(""); 
		this.cb_lokfa.setReadOnly(true);
		this.cb_lokfa.setLabelWidth(100);
		this.cb_lokfa.setRightLabelVisible(true);
		this.cb_lokfa.setRightLabelCaption("");	
		
		this.cb_tak = new portalui_saiCBBL(this);
		this.cb_tak.setLeft(20);
		this.cb_tak.setTop(230);
		this.cb_tak.setWidth(185);
		this.cb_tak.setCaption("Akun Mutasi Asset");
		this.cb_tak.setText(""); 
		this.cb_tak.setReadOnly(true);
		this.cb_tak.setLabelWidth(100);
		this.cb_tak.setRightLabelVisible(true);
		this.cb_tak.setRightLabelCaption("");	
		
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
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(700);
		this.ed_total.setTop(230);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(100);
		this.ed_total.setCaption("Tot. Nilai Buku");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
		
		uses('portalui_panel');
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(252);
	    this.p1.setWidth(900);
	    this.p1.setHeight(200);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Asset');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(150);
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
		this.sgn.setTop(170);
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
			this.cb_vendor.onBtnClick.set(this, "FindBtnClick");
			this.cb_lokasi.onBtnClick.set(this, "FindBtnClick");
			this.cb_lokasi.onChange.set(this, "doEditChange");
			this.cb_lokfa.onBtnClick.set(this, "FindBtnClick");
			this.cb_tak.onBtnClick.set(this, "FindBtnClick");
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFamutkirim.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFamutkirim.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_transaksi_fFamutkirim.prototype.simpan = function()
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
			
			sql.add(" insert into famutkirim_m (no_kirim,no_dokumen,kode_lokasi,lokasi_tuj,lokfa_tuj,kode_vendor,tanggal,keterangan,"+
			        " nilai,nilai_buku,kode_curr,kurs,kode_pp,kode_drk,modul,posted,progress,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.cb_lokasi.getText()+"','"+this.cb_lokfa.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"',"+
					parseNilai(this.ed_nasset.getText())+","+parseNilai(this.ed_total.getText())+",'IDR',1,'-','-','"+vmodul+"','"+vposted+"','0',"+
					"'"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");
					
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				sql.add("update fa_asset set progress='M' where no_fa='"+this.sg1.getCell(0,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into famutasi_d (no_kirim,no_terima,no_fa,no_fabaru,kode_lokasi,lokasi_tuj,lokfa_asal,lokfa_tuj,pp_asal,pnj_asal,nilai,nilai_buku,kode_akun,akun_ap) values "+	
						"('"+this.ed_nb.getText()+"','-','"+this.sg1.getCell(0,i)+"','-','"+this.app._lokasi+"','"+this.cb_lokasi.getText()+"','"+this.sg1.getCell(13,i)+"','"+this.cb_lokfa.getText()+"','"+this.sg1.getCell(14,i)+"','"+this.sg1.getCell(15,i)+"',"+
						parseNilai(this.sg1.getCell(9,i))+","+parseNilai(this.sg1.getCell(10,i))+",'"+this.sg1.getCell(11,i)+"','"+this.sg1.getCell(12,i)+"')");
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
						kdAkun = this.sg1.getCell(12,i);
						
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
							row.set("nilai",nilaiToFloat(this.sg1.getCell(10,i)));
							dtJrnl++;
							dtJurnal.set(dtJrnl,row);						
						}else {
							dtJurnal.get(ix).set("nilai",row.get("nilai") + nilaiToFloat(this.sg1.getCell(10,i)));				
						}
						
						ix = -1;
						kdAkun = this.sg1.getCell(11,i);
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
							row.set("nilai",nilaiToFloat(this.sg1.getCell(9,i)));
							dtJrnl++;
							dtJurnal.set(dtJrnl,row);						
						}else {				
							dtJurnal.get(ix).set("nilai",row.get("nilai") + nilaiToFloat(this.sg1.getCell(9,i)));				
						}
					}
					this.gridJurnal = dtJurnal;
					//-----------------------------------------------------------------------------------------  grouping jurnal
					
					var scr1 = "insert into famutkirim_j (no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
								"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var awal = true;
					var line = undefined;
					for (var i in this.gridJurnal.objList)
					{
						if (!awal) { scr1 += ",";}
						
						line = this.gridJurnal.get(i);
						scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+line.get("kode_akun")+
							 	"','"+line.get("keterangan")+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'-','-',"+
								"'"+this.app._lokasi+"','MUTKRM','ASSET','"+this.ed_period.getText()+
								"','IDR',1"+
								",'"+this.app._userLog+"',now())";
						awal = false;
					}
					if (nilaiToFloat(this.ed_nasset.getText()) != nilaiToFloat(this.ed_total.getText()))
					{
						var nilaitak = nilaiToFloat(this.ed_nasset.getText()) -  nilaiToFloat(this.ed_total.getText());
						scr1 += ",";
						scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.cb_tak.getText()+
								 	"','"+this.ed_desc.getText()+"','D',"+nilaitak+",'-','-',"+
									"'"+this.app._lokasi+"','MUTKRM','TAK','"+this.ed_period.getText()+
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
window.app_saku_fa_transaksi_fFamutkirim.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","9"),this.dp_tgl1);	
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
window.app_saku_fa_transaksi_fFamutkirim.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'famutkirim_m','no_kirim',this.app._lokasi+"-KRM"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_fa_transaksi_fFamutkirim.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFamutkirim.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
	if (sender == this.cb_lokasi)
	{
		if (this.cb_lokasi.getText() == this.app._lokasi) 
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
};											  
window.app_saku_fa_transaksi_fFamutkirim.prototype.FindBtnClick = function(sender, event)
{
	try
	{
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
		if (sender == this.cb_lokfa) 
		{   
			this.standarLib.showListData(this, "Daftar Lokasi Asset",this.cb_lokfa,undefined, 
										  "select kode_lokfa,nama   from fa_lokasi where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe = 'posting'",
										  "select count(kode_lokfa) from fa_lokasi where kode_lokasi='"+this.cb_lokasi.getText()+"' and tipe = 'posting'",
										  new Array("kode_lokfa","nama"),"and",new Array("Kode Lokasi","Nama"),false);
			
		}
		if (sender == this.cb_lokasi) 
		{   
			this.standarLib.showListData(this, "Daftar Lokasi Perusahaan",this.cb_lokasi,undefined, 
										  "select a.kode_lokasi,a.nama   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"'",
										  "select count(a.kode_lokasi)   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"'",
										  new Array("kode_lokasi","nama"),"and",new Array("Kode Lokasi","Nama"),false);
			
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
window.app_saku_fa_transaksi_fFamutkirim.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
					var line,data = this.dbLib.runSQL(" select a.barcode,a.nama,a.merk,a.tipe,a.no_seri,b.nama as lokfa,c.nama as pp,d.nama as pnj,(a.nilai-ifnull(e.tot_susut,0)) as nb,a.kode_akun,f.akun_deprs,a.kode_lokfa,a.kode_pp,a.nik_pnj,a.nilai "+
					                                  " from fa_asset a inner join fa_lokasi b on a.kode_lokfa = b.kode_lokfa and a.kode_lokasi=b.kode_lokasi "+
													  "     		    inner join pp c on a.kode_pp = c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
													  "     		    inner join karyawan d on a.nik_pnj = d.nik and a.kode_lokasi=d.kode_lokasi "+
													  "     		    inner join fa_klpakun f on a.kode_klpakun = f.kode_klpakun and a.kode_lokasi=f.kode_lokasi "+
													  "                 left outer join (select x.kode_lokasi,x.no_fa,sum(case when x.dc='D' then x.nilai else 0 end) as tot_susut "+
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
window.app_saku_fa_transaksi_fFamutkirim.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Item Asset",this.sg1, this.sg1.row, this.sg1.col, 
												  "select no_fa,barcode from fa_asset where progress='1' and kode_lokasi='"+this.app._lokasi+"' and jenis = 'ASSET' ",
												  "select count(no_fa)  from fa_asset where progress='1' and kode_lokasi='"+this.app._lokasi+"' and jenis = 'ASSET' ",
												  new Array("no_fa","barcode"),"and",new Array("No Asset","Barcode"),false);
				break;
		}
	}catch(e)
	{
		alert("[doFindBtnClick : " + e);
	}
};
window.app_saku_fa_transaksi_fFamutkirim.prototype.doNilaiChange = function()
{
	try
	{
		var tot = nb = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(9,i) != "")
			{
				tot += nilaiToFloat(this.sg1.getCell(9,i));			
			}
			if (this.sg1.getCell(10,i) != "")
			{
				nb += nilaiToFloat(this.sg1.getCell(10,i));			
			}
		}
		this.ed_nasset.setText(floatToNilai(tot));
		this.ed_total.setText(floatToNilai(nb));
	}catch(e)
	{
		alert("[doNilaiChange:"+e);
	}
};
window.app_saku_fa_transaksi_fFamutkirim.prototype.doRequestReady = function(sender, methodName, result)
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