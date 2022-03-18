window.app_saku_fa_transaksi_fFasusut = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFasusut.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFasusut";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyusutan Asset Reguler: Input", 0);	
			
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
		this.ed_nb.setCaption("No Penyusutan");
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
		
		uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(323);
		this.cb_curr.setTop(76);
		this.cb_curr.setWidth(150);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(470);
		this.ed_kurs.setTop(76);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("1");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(50);
				
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
		
		this.cb_drk = new portalui_saiCBBL(this);
		this.cb_drk.setLeft(20);
		this.cb_drk.setTop(164);
		this.cb_drk.setWidth(185);
		this.cb_drk.setCaption("Data RKM");
		this.cb_drk.setText(""); 
		this.cb_drk.setReadOnly(true);
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setRightLabelCaption("");	
		
		this.bHitung = new portalui_button(this);
		this.bHitung.setLeft(600);
		this.bHitung.setTop(164);
		this.bHitung.setCaption("Hitung");
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(680);
		this.ed_total.setTop(164);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(100);
		this.ed_total.setCaption("Total Penyusutan");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
		this.ed_total.setTag("1");
		
		this.bGar = new portalui_imageButton(this);
		this.bGar.setLeft(900);
		this.bGar.setTop(164);
		this.bGar.setHint("Hitung Anggaran");
		this.bGar.setImage("icon/"+system.getThemes()+"/tabCont2.png");
		this.bGar.setWidth(22);
		this.bGar.setHeight(22);
		
		this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(186);
	    this.p1.setWidth(900);
	    this.p1.setHeight(268);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Asset');
    	
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(245);
		this.sg1.setTag("2");
		this.sg1.setColTitle(new Array("No","No Asset","Barcode","Deskripsi","Nilai Perolehan","Tgl Perolehan","Kode Dept","Akun Asset","Akun BP","Akun AP",
		                               "%Susut","Umur","Nilai Buku","Nilai Residu","Nilai Susut"));
		
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
			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(new Array("Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"));
			this.jurnal.p.setCaption('Data Anggaran');
			
			this.bGen.onClick.set(this, "genClick");
			this.bHitung.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg1.clearAll();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFasusut.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFasusut.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_transaksi_fFasusut.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			sql.add("insert into fasusut_m (no_fasusut,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_total.getText())+","+
					"'-','"+this.cb_drk.getText()+"','F','FA_SST','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");
					
			
			for (var i=1; i <= this.sg1.getRowCount(); i++)
			{			
				sql.add("update fa_asset set periode_susut = '"+nextNPeriode(this.ed_period.getText(),1)+"' where no_fa='"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del) values "+	
						"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(1,i)+"','"+this.ed_period.getText()+"',"+
						parseNilai(this.sg1.getCell(14,i))+",'"+this.app._lokasi+"','"+this.sg1.getCell(8,i)+"','"+
						this.sg1.getCell(9,i)+"','"+this.sg1.getCell(6,i)+"','"+this.cb_drk.getText()+"','"+this.sg1.getCell(7,i)+"','D','-')");
			}
			
			var scr1 = "insert into fasusut_j (no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
			var awal = true;
			var line = undefined;
			for (var i in this.gridJurnal.objList)
			{
				if (!awal) { scr1 += ",";}
				
				line = this.gridJurnal.get(i);
				scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+line.get("kode_akun")+
					 	"','"+line.get("keterangan")+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'"+line.get("kode_pp")+"','"+this.cb_drk.getText()+"',"+
						"'"+this.app._lokasi+"','FA_SST','SST','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())";
				awal = false;
			}
			sql.add(scr1);
			
			//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
			var scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
			var baris1 = true;
			var line = undefined;
			var DC = "";
			for (var i in this.gridJurnal2.objList)
			{
				if (!baris1) { scr1 += ",";}	
				line = this.gridJurnal2.get(i);
				DC = "D";
				scr1 += "('"+this.ed_nb.getText()+"','SST','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
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
window.app_saku_fa_transaksi_fFasusut.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clearAll(); 
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			}
			break;
		
		case "simpan" :		
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (nilaiToFloat(this.ed_total.getText()) == 0)
			{
				system.alert(this,"Nilai penyusutan tidak valid.","Nilai total tidak boleh nol.");
				return false;
			}
			this.hitungGar();
			/*
			for (var i in this.gridJurnal2.objList)
			{
				line = this.gridJurnal2.get(i);
				if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
				{
					system.alert(this,"Beban Penyusutan melebihi saldo anggaran.","Periksa kembali data anggaran.");
					return false;
				}
			}
			*/
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
window.app_saku_fa_transaksi_fFasusut.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fasusut_m','no_fasusut',this.app._lokasi+"-SST"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}
			else
			{
				system.alert(this,"Periode harus valid.","");			
			}
		}
		if (sender == this.bHitung)
		{
			this.sg1.clearAll();
			var data = this.dbLib.runSQL(" select a.no_fa,a.barcode,a.nama,a.nilai,a.tgl_perolehan,a.kode_pp,b.kode_akun,b.akun_bp,b.akun_deprs,a.persen,a.umur,(a.nilai-ifnull(c.total_susut,0)) as nilai_buku,a.nilai_residu,"+
										 " case when (a.nilai*a.persen/12/100) < (a.nilai-ifnull(c.total_susut,0)-nilai_residu) then truncate(a.nilai*a.persen/12/100,0) else truncate(a.nilai-ifnull(c.total_susut,0)-nilai_residu,0) end  as nilai_susut "+
										 " from fa_asset a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
										 "                 left outer join (select x.kode_lokasi,x.no_fa,sum(x.nilai) as total_susut "+
										 "                                  from fasusut_d x inner join fasusut_m y on x.no_fasusut=y.no_fasusut and x.kode_lokasi=y.kode_lokasi "+
										 "                                  where y.no_del='-' and y.kode_lokasi='"+this.app._lokasi+"' and x.dc='D' group by x.kode_lokasi,x.no_fa) c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi "+
										 " where a.progress='1' and a.kode_lokasi = '"+this.app._lokasi+"' and periode_susut = '"+this.ed_period.getText()+"' and a.jenis='ASSET' and a.persen<>0 limit 0,100");		
			
			if (data instanceof portalui_arrayMap)
			{
				this.sg1.setData(data);
				var tot = 0;
				for (var i in data.objList)
				{
					tot += parseFloat(data.get(i).get("nilai_susut"));
				}
				this.ed_total.setText(floatToNilai(tot));
			}else alert(rs);
			
			var row,dtJurnal = new portalui_arrayMap();
			var nemu = false;
			var dtJrnl = 0;
			var line = undefined;
			
			for (var i in this.sg1.data.objList)
			{
				line = this.sg1.data.get(i);
				kdAkun = this.sg1.data.get(i).get("akun_bp");			
				kdPP = this.sg1.data.get(i).get("kode_pp");
				
				nemu = false;
				ix = 0;
				
				for (var j in dtJurnal.objList)
				{		
				  if (kdAkun == dtJurnal.get(j).get("kode_akun") && kdPP == dtJurnal.get(j).get("kode_pp") )
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
					row.set("keterangan","Jurnal Penyusutan "+ this.ed_period.getText());
					row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai_susut")));
					row.set("kode_pp",kdPP);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai_susut")));				
				}
				
				
				ix = -1;
				kdAkun = this.sg1.data.get(i).get("akun_deprs");
				for (var j in dtJurnal.objList)
				{		
				  if (kdAkun == dtJurnal.get(j).get("kode_akun") && kdPP == dtJurnal.get(j).get("kode_pp"))
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
					row.set("keterangan","Jurnal Penyusutan "+ this.ed_period.getText());
					row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai_susut")));
					row.set("kode_pp",kdPP);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {				
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai_susut")));				
				}
			}
			this.gridJurnal = dtJurnal;
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFasusut.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFasusut.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};											  
window.app_saku_fa_transaksi_fFasusut.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_drk) 
		{   
			this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
										  "select kode_drk,nama   from drk where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and tahun='"+this.ed_period.getText().substr(0,4)+"'",
										  "select count(kode_drk) from drk where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and tahun='"+this.ed_period.getText().substr(0,4)+"'",
										  new Array("kode_drk","nama"),"and",new Array("Kode RKM","Deskripsi"),false);			
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik,nama   from karyawan where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",
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
window.app_saku_fa_transaksi_fFasusut.prototype.hitungGar = function()
{
	var row,dtJurnal2 = new portalui_arrayMap();
	var nemu = false;
	var nreal,ix,dtJrnl = 0;
				
    for (var i=1; i <= this.sg1.getRowCount(); i++)
	{
		kdAkun = this.sg1.getCell(8,i);
		kdPP = this.sg1.getCell(6,i);
		kdDRK = this.cb_drk.getText();
		nreal = nilaiToFloat(this.sg1.getCell(14,i));
		
		nemu = false;
		ix = 0;
					
		for (var j in dtJurnal2.objList)
		{		
		  if ((kdAkun == dtJurnal2.get(j).get("kode_akun")) && (kdPP == dtJurnal2.get(j).get("kode_pp")) && (kdDRK == dtJurnal2.get(j).get("kode_drk")))
		  {
			nemu = true;
			row = dtJurnal2.get(j);
			ix = j;
			break;
		  }
		}
		
		if (!nemu){
			row = new portalui_arrayMap();
			row.set("kode_akun",kdAkun);
			row.set("kode_pp",kdPP);
			row.set("kode_drk",kdDRK);
			row.set("nilai",nreal);
			row.set("saldo_gar",0);
			dtJrnl++;
			dtJurnal2.set(dtJrnl,row);						
		}else {
			dtJurnal2.get(ix).set("nilai",row.get("nilai") + nreal);				
		}
	}
	
	if (dtJurnal2.getLength() > 0){
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
		dtJurnal2.setTag2(dataDesc);
	}
	this.gridJurnal2 = dtJurnal2;
	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	var line = undefined;
	var sls = 0;
	for (var i in this.gridJurnal2.objList)
	{
		line = this.gridJurnal2.get(i);
		var baris,data = this.dbLib.runSQL("select fn_cekagg2('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"') as gar ");
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
window.app_saku_fa_transaksi_fFasusut.prototype.garClick = function(sender)
{
	try
	{
		if (this.ed_total.getText() != "0")
		{
			this.jurnal.sg.clear();
			this.hitungGar();
			if (this.gridJurnal2 != undefined){				
				this.jurnal.setData(this.gridJurnal2);
				this.jurnal.showModal();
			}
		}
	} catch	(e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFasusut.prototype.doRequestReady = function(sender, methodName, result)
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