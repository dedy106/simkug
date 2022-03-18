window.app_saku_fa_transaksi_fFaklaimsts = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFaklaimsts.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFaklaimsts";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Progress Klaim Asuransi: Input", 0);	
				
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
		this.ed_nb.setCaption("No Update");
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
		this.cb_klaim = new portalui_saiCBBL(this);
		this.cb_klaim.setLeft(20);
		this.cb_klaim.setTop(120);
		this.cb_klaim.setWidth(240);
		this.cb_klaim.setCaption("No Klaim");
		this.cb_klaim.setText(""); 
		this.cb_klaim.setReadOnly(true);
		this.cb_klaim.setLabelWidth(100);
		this.cb_klaim.setRightLabelVisible(false);
		this.cb_klaim.setRightLabelCaption("");	
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(260);
		this.bShow.setTop(120);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nklaim = new portalui_saiLabelEdit(this);
		this.ed_nklaim.setLeft(20);
		this.ed_nklaim.setTop(142);
		this.ed_nklaim.setWidth(220);
		this.ed_nklaim.setTipeText(ttNilai);
		this.ed_nklaim.setAlignment(alRight);
		this.ed_nklaim.setLabelWidth(100);
		this.ed_nklaim.setCaption("Nilai Klaim");
		this.ed_nklaim.setText("0"); 
		this.ed_nklaim.setReadOnly(true);
	
		this.cb_polis = new portalui_saiCBBL(this);
		this.cb_polis.setLeft(20);
		this.cb_polis.setTop(164);
		this.cb_polis.setWidth(240);
		this.cb_polis.setCaption("Polis");
		this.cb_polis.setText(""); 
		this.cb_polis.setReadOnly(true);
		this.cb_polis.setLabelWidth(100);
		this.cb_polis.setRightLabelVisible(true);
		this.cb_polis.setRightLabelCaption("");	
		this.cb_polis.setBtnVisible(false);
		
		this.cb_vendor = new portalui_saiCBBL(this);
		this.cb_vendor.setLeft(20);
		this.cb_vendor.setTop(186);
		this.cb_vendor.setWidth(185);
		this.cb_vendor.setCaption("Vendor");
		this.cb_vendor.setText(""); 
		this.cb_vendor.setReadOnly(true);
		this.cb_vendor.setLabelWidth(100);
		this.cb_vendor.setRightLabelVisible(true);
		this.cb_vendor.setRightLabelCaption("");	
		this.cb_vendor.setBtnVisible(false);
		
		this.cb_status = new portalui_saiCBBL(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(208);
		this.cb_status.setWidth(185);
		this.cb_status.setCaption("Status");
		this.cb_status.setText(""); 
		this.cb_status.setReadOnly(true);
		this.cb_status.setLabelWidth(100);
		this.cb_status.setRightLabelVisible(true);
		this.cb_status.setRightLabelCaption("");	
		
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(230);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setText(""); 
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");	
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(252);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");	
		
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(274);
	    this.p1.setWidth(900);
	    this.p1.setHeight(178);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Asset');
    	
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(155);
		this.sg1.setTag("2");
		this.sg1.setColTitle(new Array("No","No Asset","Barcode","Deskripsi","Merk","Tipe","No Seri","Lokasi",
		                               "Departemen","Png Jawab","Nilai","Akun Asset","Nilai Klaim"));
		
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
			this.cb_klaim.onBtnClick.set(this, "FindBtnClick");
			this.cb_status.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clearAll();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFaklaimsts.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFaklaimsts.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_fa_transaksi_fFaklaimsts.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add(" insert into faklaim_sts (no_klaimsts,no_klaim,no_dokumen,kode_lokasi,tanggal,keterangan,"+
			        " kode_status,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input,status_lama) values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_klaim.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+
					     this.ed_desc.getText()+"','"+this.cb_status.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+
						 this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now(),'"+this.stsLama+"')");
					
			sql.add(" update faklaim_m set kode_status = '"+this.cb_status.getText()+"' where no_klaim='"+this.cb_klaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_fa_transaksi_fFaklaimsts.prototype.doModalResult = function(event, modalResult)
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
window.app_saku_fa_transaksi_fFaklaimsts.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'faklaim_sts','no_klaimsts',this.app._lokasi+"-KST"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_fa_transaksi_fFaklaimsts.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFaklaimsts.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};											  
window.app_saku_fa_transaksi_fFaklaimsts.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_status) 
		{  
			this.standarLib.showListData(this, "Daftar Status Klaim Asuransi",this.cb_status,undefined, 
										  "select kode_status,nama   from fa_status where jenis = 'K'",
										  "select count(kode_status) from fa_status where jenis = 'K'",
										  new Array("kode_status","nama"),"and",new Array("Kode Status","Keterangan"),false);
			
		}
		if (sender == this.cb_klaim) 
		{  
			this.standarLib.showListData(this, "Daftar Klaim Asuransi",this.cb_klaim,undefined, 
										  "select no_klaim,keterangan from faklaim_m where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(no_klaim)     from faklaim_m where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("no_klaim","keterangan"),"and",new Array("No Klaim","Keterangan"),false);
			
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
window.app_saku_fa_transaksi_fFaklaimsts.prototype.showClick = function(sender)
{
	if (this.cb_klaim.getText() != "")
	{
		try
		{	
			this.sg1.clearAll();
			var line,data = this.dbLib.runSQL(" select a.kode_vendor,b.nama as nama_vendor,c.nilai,a.no_polis,a.keterangan,d.kode_status,d.nama as nama_sts "+
											  " from fapolis_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
											  "                  inner join faklaim_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+
											  "                  inner join fa_status d on c.kode_status=d.kode_status "+
											  " where c.no_klaim='"+this.cb_klaim.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
							
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.cb_polis.setText(line.get("no_polis"));
					this.cb_polis.setRightLabelCaption(line.get("keterangan"));
					this.cb_vendor.setText(line.get("kode_vendor"));
					this.cb_vendor.setRightLabelCaption(line.get("nama_vendor"));
					this.cb_status.setText(line.get("kode_status"));
					this.cb_status.setRightLabelCaption(line.get("nama_sts"));
					this.ed_nklaim.setText(floatToNilai(parseFloat(line.get("nilai"))));
					this.stsLama = line.get("kode_status");
				} 
			}
			
			var line,data = this.dbLib.runSQL(" select a.no_fa,a.barcode,a.nama,a.merk,a.tipe,a.no_seri,b.nama as lokfa,c.nama as pp,d.nama as pnj,f.kode_akun,a.nilai,g.nilai as klaim "+
						                                  " from fa_asset a inner join fa_lokasi b on a.kode_lokfa = b.kode_lokfa and a.kode_lokasi=b.kode_lokasi "+
														  "     		    inner join pp c on a.kode_pp = c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
														  "     		    inner join karyawan d on a.nik_pnj = d.nik and a.kode_lokasi=d.kode_lokasi "+
														  "     		    inner join fa_klpakun f on a.kode_klpakun = f.kode_klpakun and a.kode_lokasi=f.kode_lokasi "+
														  "                 inner join faklaim_d g on a.no_fa=g.no_fa and a.kode_lokasi=g.kode_lokasi "+
														  " where a.kode_lokasi='"+this.app._lokasi+"' and g.no_klaim='"+this.cb_klaim.getText()+"'");					
			if (data instanceof portalui_arrayMap)
			{
				this.sg1.setData(data);
			}else alert(rs);
			
		}catch(e)
		{
			alert("[doNilaiChange:"+e);
		}
	}
};
window.app_saku_fa_transaksi_fFaklaimsts.prototype.doRequestReady = function(sender, methodName, result)
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