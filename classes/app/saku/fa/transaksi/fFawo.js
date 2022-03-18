window.app_saku_fa_transaksi_fFawo = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFawo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFawo";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Write Off Asset: Input", 0);	
		
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
		this.ed_nb.setCaption("No Pengajuan WO");
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
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(700);
		this.ed_total.setTop(142);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(100);
		this.ed_total.setCaption("Tot. Nilai Buku");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
		this.ed_total.setTag("1");
		
		this.bHitung = new portalui_button(this);
		this.bHitung.setLeft(620);
		this.bHitung.setTop(142);
		this.bHitung.setCaption("Tampil");
				
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(164);
	    this.p1.setWidth(900);
	    this.p1.setHeight(310);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Asset');
    	
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(285);
		this.sg1.setTag("2");
		this.sg1.setColTitle(new Array("No","No Asset","Barcode","Deskripsi","Merk","Tipe","No Seri","Nilai Perolehan","Tgl Perolehan","Kode Dept",
		                               "Akun Asset","Akun BP","Akun AP","%Susut","Umur","Nilai Buku","Nilai Residu","Nilai Deprs."));
		
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
			this.bHitung.onClick.set(this, "genClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			
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
window.app_saku_fa_transaksi_fFawo.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFawo.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_transaksi_fFawo.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			sql.add("insert into fawo_m (no_wo,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,progress,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_total.getText())+","+
					"'-','-','0','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");
					
			for (var i=1; i <= this.sg1.getRowCount(); i++)
			{			
				sql.add("update fa_asset set progress='W' where no_fa='"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into fawo_d (no_wo,no_fa,periode,nilai,nilai_ap,kode_lokasi,akun_ap,kode_pp,kode_drk,kode_akun,status_app,nilai_buku) values "+	
						"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(1,i)+"','"+this.ed_period.getText()+"',"+
						parseNilai(this.sg1.getCell(7,i))+","+parseNilai(this.sg1.getCell(17,i))+",'"+this.app._lokasi+"','"+
						this.sg1.getCell(12,i)+"','"+this.sg1.getCell(9,i)+"','-','"+this.sg1.getCell(10,i)+"','0',"+parseNilai(this.sg1.getCell(15,i))+" )");
			}
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_fa_transaksi_fFawo.prototype.doModalResult = function(event, modalResult)
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

window.app_saku_fa_transaksi_fFawo.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fawo_m','no_wo',this.app._lokasi+"-PWO"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
			var data = this.dbLib.runSQL(" select a.no_fa,a.barcode,a.nama,a.merk,a.tipe,a.no_seri,a.nilai,a.tgl_perolehan,a.kode_pp,b.kode_akun,b.akun_bp,b.akun_deprs,a.persen,a.umur,(a.nilai-ifnull(c.total_susut,0)) as nilai_buku,a.nilai_residu,ifnull(c.total_susut,0) as nilai_ap "+
										 " from fa_asset a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
										 "                 left outer join (select x.kode_lokasi,x.no_fa,sum(x.nilai) as total_susut "+
										 "                                  from fasusut_d x inner join fasusut_m y on x.no_fasusut=y.no_fasusut and x.kode_lokasi=y.kode_lokasi "+
										 "                                  where y.no_del='-' and y.kode_lokasi='"+this.app._lokasi+"' group by x.kode_lokasi,x.no_fa) c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi "+
										 " where a.jenis = 'ASSET' and b.persen <> 0 and a.progress='1' and a.kode_lokasi = '"+this.app._lokasi+"' and ((a.nilai-ifnull(c.total_susut,0)) <= nilai_residu) and a.nilai>0");		
			
			if (data instanceof portalui_arrayMap)
			{
				this.sg1.setData(data);
				var tot = 0;
				for (var i in data.objList)
				{
					tot += parseFloat(data.get(i).get("nilai_buku"));
				}
				this.ed_total.setText(floatToNilai(tot));
			}else alert(rs);
		}
	}
	catch (e)
	{
		alert(e);
	}
};

window.app_saku_fa_transaksi_fFawo.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFawo.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};											  
window.app_saku_fa_transaksi_fFawo.prototype.FindBtnClick = function(sender, event)
{
	try
	{
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
window.app_saku_fa_transaksi_fFawo.prototype.doRequestReady = function(sender, methodName, result)
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