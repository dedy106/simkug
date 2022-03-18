window.app_saku_fa_fFaasset = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_fFaasset.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_fFaasset";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Asset: Input", 0);	
		
//-----------------------------------------------------------------------------------------------------------------------------------------------------------		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(145);
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
		this.ed_nb.setCaption("No Asset");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
			
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_barcode = new portalui_saiLabelEdit(this);
		this.ed_barcode.setLeft(20);
		this.ed_barcode.setTop(76);
		this.ed_barcode.setWidth(220);
		this.ed_barcode.setCaption("Barcode");
		this.ed_barcode.setText(""); 
		this.ed_barcode.setReadOnly(false);
		this.ed_barcode.setLength(50);
		    
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(98);
		this.ed_nama.setWidth(500);
		this.ed_nama.setCaption("Deskripsi");
		this.ed_nama.setText(""); 
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		
		uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(120);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency - Kurs");
		this.cb_curr.setText(""); 
		this.cb_curr.setReadOnly(false);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(true);
		this.cb_curr.setRightLabelCaption("");	
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(250);
		this.ed_kurs.setTop(120);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setText(""); 
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setReadOnly(true);
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(142);
		this.cb_pp.setWidth(185);
		this.cb_pp.setCaption("Departemen");
		this.cb_pp.setText(""); 
		this.cb_pp.setReadOnly(false);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setRightLabelCaption("");	
		
		this.cb_klpfa = new portalui_saiCBBL(this);
		this.cb_klpfa.setLeft(20);
		this.cb_klpfa.setTop(164);
		this.cb_klpfa.setWidth(185);
		this.cb_klpfa.setCaption("Kelompok Asset");
		this.cb_klpfa.setText(""); 
		this.cb_klpfa.setReadOnly(false);
		this.cb_klpfa.setLabelWidth(100);
		this.cb_klpfa.setRightLabelVisible(true);
		this.cb_klpfa.setRightLabelCaption("");	
		
		this.cb_klpakun = new portalui_saiCBBL(this);
		this.cb_klpakun.setLeft(20);
		this.cb_klpakun.setTop(186);
		this.cb_klpakun.setWidth(185);
		this.cb_klpakun.setCaption("Kelompok Akun");
		this.cb_klpakun.setText(""); 
		this.cb_klpakun.setReadOnly(false);
		this.cb_klpakun.setLabelWidth(100);
		this.cb_klpakun.setRightLabelVisible(true);
		this.cb_klpakun.setRightLabelCaption("");	
		
		this.cb_lokfa = new portalui_saiCBBL(this);
		this.cb_lokfa.setLeft(20);
		this.cb_lokfa.setTop(208);
		this.cb_lokfa.setWidth(185);
		this.cb_lokfa.setCaption("Lokasi Asset");
		this.cb_lokfa.setText(""); 
		this.cb_lokfa.setReadOnly(false);
		this.cb_lokfa.setLabelWidth(100);
		this.cb_lokfa.setRightLabelVisible(true);
		this.cb_lokfa.setRightLabelCaption("");	
		
		this.ed_catat = new portalui_saiLabelEdit(this);
		this.ed_catat.setLeft(20);
		this.ed_catat.setTop(230);
		this.ed_catat.setWidth(500);
		this.ed_catat.setCaption("Catatan");
		this.ed_catat.setText(""); 
		this.ed_catat.setReadOnly(false);
		this.ed_catat.setLength(50);
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(252);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tgl Awal Susut");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(254);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);	
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(720);
		this.ed_nilai.setTop(252);
		this.ed_nilai.setWidth(200);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Asset");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);
			
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(275);
	    this.p1.setWidth(900);
	    this.p1.setHeight(220);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Barang Asset');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(175);
	    this.sg1.setColCount(7);
	    this.sg1.columns.get(6).setColWidth(100);
		this.sg1.columns.get(5).setColWidth(120);
		this.sg1.columns.get(4).setColWidth(50);
		this.sg1.columns.get(3).setColWidth(150);
		this.sg1.columns.get(2).setColWidth(150);
		this.sg1.columns.get(1).setColWidth(200);
		this.sg1.columns.get(0).setColWidth(80);
		this.sg1.setReadOnly(false);

		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
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
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_fa_fFaasset.extend(window.portalui_childForm);
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
window.app_saku_fa_fFaasset.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_fFaasset.prototype.simpan = function()
{	
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("insert into  () values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_task.getText()+"','"+this.cb_proyek.getText()+"','-','"+
					     this.dp_tgl1.getDate()+"','"+this.ed_subyek.getText()+"','"+
						 this.cb_pengirim.getText()+"','"+this.cb_penerima.getText()+"','"+this.ed_desc.getText()+"','0','"+this.ed_period.getText()+
						 "','"+ this.app._userLog+"',now())");
						 
			this.dbLib.execArraySQL(sql);	
		}catch(e){
			system.alert(this, e,"");
		}
	}
};
window.app_saku_fa_fFaasset.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
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
			
		case "ubah" :
			if (modalResult == mrOk)
			{
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
		   }
			break;
	}
	this.dp_tgl1.setFocus();
};
window.app_saku_fa_fFaasset.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'prj_tiket','no_tiket',"TIC"+this.ed_period.getText().substr(2,4),'00000'));
			this.ed_barcode.setFocus();
		}
		else
		{
			system.alert(this,"Periode harus valid.","");			
		}
	}catch (e){
		alert(e);
	}
};
window.app_saku_fa_fFaasset.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_fFaasset.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		if (this.ed_period.getText() != "") this.bGen.click();
	}
};											  
window.app_saku_fa_fFaasset.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_proyek) 
		{   
		    this.standarLib.showListData(this, "Daftar proyek",this.cb_proyek,undefined, 
										  "select kode_proyek,nama   from proyek where progress<>'9'",
										  "select count(kode_proyek) from proyek where progress<>'9'",
										  new Array("kode_proyek","nama"),"where",new Array("Kode Proyek","Deskripsi"),false);
		}
		
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_fFaasset.prototype.doRequestReady = function(sender, methodName, result)
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
					  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
					  this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
    				break;
    		}	
		}catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
	}
};