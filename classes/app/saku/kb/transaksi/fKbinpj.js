window.app_saku_kb_fKbinpj = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_fKbinpj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_fKbinpj";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kas Bank Masuk dari Ptg PK : Input", 0);
		
		uses("portalui_saiLabelEdit");
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(145);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		this.ed_period.onChange.set(this, "doEditChange");
	
	    uses("portalui_label");
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
		this.dp_tgl1.onSelect.set(this, "doSelect");
	
        this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(56);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.onChange.set(this,"doEditChange");
		this.cb_jenis.setCaption("Jenis KB");
		this.cb_jenis.setText("");
		this.cb_jenis.addItem(0,"KAS");
		this.cb_jenis.addItem(1,"BANK");
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(78);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No Bukti KB");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		uses("portalui_button");
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(78);
		this.bGen.setCaption("Gen");
		this.bGen.onClick.set(this, "genClick");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	        
		uses("portalui_saiCBBL");
		this.cb_noptg = new portalui_saiCBBL(this);
		this.cb_noptg.setLeft(20);
		this.cb_noptg.setTop(100);
		this.cb_noptg.setWidth(250);
		this.cb_noptg.setCaption("No Pertgg. PK");
		this.cb_noptg.setText("IDR");
		this.cb_noptg.setReadOnly(false);
		this.cb_noptg.onExit.set(this, "EditExit");
		this.cb_noptg.onChange.set(this, "doEditChange");
		this.cb_noptg.onKeyPress.set(this, "keyPress");
		this.cb_noptg.onBtnClick.set(this, "FindBtnClick");
		this.cb_noptg.setLabelWidth(100);
		this.cb_noptg.setRightLabelVisible(true);
		this.cb_noptg.setRightLabelCaption(" ");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(122);
		this.ed_nilai.setWidth(230);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai KasBank");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(144);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(166);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setText("IDR");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.onExit.set(this, "EditExit");
		this.cb_curr.onChange.set(this, "doEditChange");
		this.cb_curr.onKeyPress.set(this, "keyPress");
		this.cb_curr.onBtnClick.set(this, "FindBtnClick");
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(166);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("0"); 
		this.ed_kurs.setReadOnly(true);
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(188);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun KasBank");
		this.cb_akun.setText(""); 
		this.cb_akun.setReadOnly(false);
		this.cb_akun.onExit.set(this, "EditExit");
		this.cb_akun.onChange.set(this, "doEditChange");
		this.cb_akun.onKeyPress.set(this, "keyPress");
		this.cb_akun.onBtnClick.set(this, "FindBtnClick");
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setRightLabelCaption(" ");
		
		this.cb_akunar = new portalui_saiCBBL(this);
		this.cb_akunar.setLeft(20);
		this.cb_akunar.setTop(210);
		this.cb_akunar.setWidth(185);
		this.cb_akunar.setCaption("Akun Piutang");
		this.cb_akunar.setText(""); 
		this.cb_akunar.setReadOnly(true);
		this.cb_akunar.onExit.set(this, "EditExit");
		this.cb_akunar.onChange.set(this, "doEditChange");
		this.cb_akunar.onKeyPress.set(this, "keyPress");
		this.cb_akunar.onBtnClick.set(this, "FindBtnClick");
		this.cb_akunar.setLabelWidth(100);
		this.cb_akunar.setRightLabelVisible(true);
		this.cb_akunar.setRightLabelCaption(" ");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(232);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setReadOnly(false);
		this.cb_pembuat.onExit.set(this, "EditExit");
		this.cb_pembuat.onChange.set(this, "doEditChange");
		this.cb_pembuat.onKeyPress.set(this, "keyPress");
		this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption(" ");
		
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
		
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR");
			this.ed_kurs.setText("1");
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_fKbinpj.extend(window.portalui_childForm);
window.app_saku_kb_fKbinpj.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_fKbinpj.prototype.simpan = function()
{
	if ( (new Date()).strToDate(this.tglPtg)  > (new Date()).strToDate(this.dp_tgl1.getDate()))
	{	
		system.alert(this,"Tanggal kasbank tidak valid (kurang dari tgl pertgg.).","Tanggal Pertgg. : "+this.tglPtg);
		return false;
	}
	
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("update ptg_m set progress = '2' where no_ptg='"+this.cb_noptg.getText()+"'");
			sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
					"             periode,kode_curr,kurs,nilai,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_noptg.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','KBI_PTG','"+this.cb_jenis.getText()+"','"+this.ed_period.getText()+
					"','"+this.cb_curr.getText()+"','"+parseNilai(this.ed_kurs.getText())+"','"+parseNilai(this.ed_nilai.getText())+"',now(),'"+this.app._userLog+"','F','-','-','-')");
			
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.cb_noptg.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.cb_akun.getText()+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nilai.getText())+",'-','-',"+
						"'-','"+this.app._lokasi+"','KBI_PTG','KAS',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
						"('"+this.ed_nb.getText()+"','"+this.cb_noptg.getText()+"','"+this.dp_tgl1.getDate()+"',1,'"+this.cb_akunar.getText()+
						"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilai.getText())+",'-','-',"+
						"'-','"+this.app._lokasi+"','KBI_PTG','ARPTG',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())");
			
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_fKbinpj.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR");
				this.ed_kurs.setText("1");
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
				system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
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
window.app_saku_kb_fKbinpj.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_saku_kb_fKbinpj.prototype.genClick = function(sender)
{
	try
	{
		if ((this.ed_period.getText() != "") && (this.jenis != undefined))
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.jenis+"/"+this.ed_period.getText().substr(2,6)+"/",'00000'));
			this.ed_desc.setFocus();
		}
		else
		{
			system.alert(this,"Periode dan jenis KB harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_fKbinpj.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_fKbinpj.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	
	if (sender == this.cb_noptg)
	{
		if (this.cb_noptg.getText() != "")
		{
			var temp = this.dbLib.loadQuery("select a.nilai_kas, a.kode_curr,b.kode_akun,c.nama as nama_akun,a.tanggal  "+   
											"from ptg_m a inner join ptg_j b on a.no_ptg=b.no_ptg and b.jenis = 'ARPTG' "+
											"             inner join masakun c on b.kode_akun=c.kode_akun "+
											"where a.no_ptg = '"+this.cb_noptg.getText()+"'");
											
			if (temp != "")
			{
				var baris = temp.split("\r\n");
				var data = baris[1].split(";");		
				this.ed_nilai.setText(strToNilai(data[0].toString()));
				this.cb_curr.setText(data[1]);
				this.cb_akunar.setText(data[2]);
				this.cb_akunar.setRightLabelCaption(data[3]);	
				
				var dt=data[4].split(" ");
				var tgl=dt[0].split("-");
				this.tglPtg = tgl[2]+"/"+tgl[1]+"/"+tgl[0];
			}
		}
		else
		{
			this.cb_noptg.setRightLabelCaption(" ");
			this.cb_akunar.setText("");
			this.cb_akunar.setRightLabelCaption(" ");
			this.cb_curr.setText("IDR");
			this.ed_nilai.setText("0");
		}
	}
	
	if (sender == this.cb_jenis)
	{
		this.ed_nb.setText("");
		if (this.cb_jenis.getText() == "KAS")
		{
			this.jenis = "BKM";
		}
		if (this.cb_jenis.getText() == "BANK")
		{
			this.jenis = "BBM";
		}
	}
	
	if (sender == this.cb_curr)
	{
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
window.app_saku_kb_fKbinpj.prototype.sg1ondblclick = function(sender, col , row)
{
};
window.app_saku_kb_fKbinpj.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_noptg) 
		{
		    this.standarLib.showListData(this, "Daftar Bukti Pertanggungan PK",this.cb_noptg,undefined, 
										  "select no_ptg, keterangan from ptg_m where progress = '1' and nilai_kas > 0 and periode<='"+this.ed_period.getText()+"'",
										  "select count(no_ptg) from ptg_m where progress = '1' and nilai_kas > 0 and periode<='"+this.ed_period.getText()+"'",
										  new Array("no_ptg","keterangan"),"and");
		}
		if (sender == this.cb_akun) 
		{
		    this.standarLib.showListData(this, "Daftar Akun KasBank",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join lokasi_akun b on a.kode_akun=b.kode_akun where a.block= '0' and a.kode_flag='001' and b.kode_lokasi ='"+this.app._lokasi+"' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  "select count(a.kode_akun)  from masakun a inner join lokasi_akun b on a.kode_akun=b.kode_akun where a.block= '0' and a.kode_flag='001' and b.kode_lokasi ='"+this.app._lokasi+"' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  new Array("a.kode_curr","a.nama"),"and");
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr ",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"where");
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas Cashier",this.cb_pembuat,undefined, 
										  "select nik, nama from karyawan ",
										  "select count(nik) from karyawan ",
										  new Array("nik","nama"),"where");
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_fKbinpj.prototype.doFindBtnClick = function(sender, col, row) 
{
};
window.app_saku_kb_fKbinpj.prototype.doFindBtnClick2 = function(sender, col, row) 
{	
};
window.app_saku_kb_fKbinpj.prototype.sg2onChange = function(sender, col , row)
{
};
window.app_saku_kb_fKbinpj.prototype.doCellExit = function()
{
};
window.app_saku_kb_fKbinpj.prototype.doNilaiChange = function()
{	
};
window.app_saku_kb_fKbinpj.prototype.doCellExit = function()
{	
};
window.app_saku_kb_fKbinpj.prototype.doRequestReady = function(sender, methodName, result)
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
				}
				else system.info(this,result,"");
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