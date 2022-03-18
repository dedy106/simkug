window.app_saku_kb_transaksi_proses_drop_fDroptrm = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_drop_fDroptrm";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Droping Dana: Input",0);
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setReadOnly(true);
		this.ed_period.setTag("9");
	
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
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No Terima");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.cb_nokirim = new portalui_saiCBBL(this);
		this.cb_nokirim.setLeft(20);
		this.cb_nokirim.setTop(120);
		this.cb_nokirim.setWidth(240);
		this.cb_nokirim.setLabelWidth(100);
		this.cb_nokirim.setReadOnly(true);
		this.cb_nokirim.setRightLabelVisible(false);
		this.cb_nokirim.setCaption("No Droping");
		this.cb_nokirim.setText(""); 
		this.cb_nokirim.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(258);
		this.bShow.setTop(120);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_ket = new portalui_saiLabelEdit(this);
		this.ed_ket.setLeft(20);
		this.ed_ket.setTop(142);
		this.ed_ket.setWidth(500);
		this.ed_ket.setCaption("Keterangan");
		this.ed_ket.setText(""); 
		this.ed_ket.setReadOnly(true);
		this.ed_ket.setLength(150);
		this.ed_ket.setTag("1");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(164);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setTag("1");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(164);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("1");
		
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(186);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setLabelWidth(100);
		this.cb_lokasi.setReadOnly(true);
		this.cb_lokasi.setRightLabelVisible(true);
		this.cb_lokasi.setCaption("Lokasi Asal");
		this.cb_lokasi.setRightLabelCaption("");
		this.cb_lokasi.setTag("1");
		
		this.cb_tak = new portalui_saiCBBL(this);
		this.cb_tak.setLeft(20);
		this.cb_tak.setTop(208);
		this.cb_tak.setWidth(185);
		this.cb_tak.setLabelWidth(100);
		this.cb_tak.setReadOnly(true);
		this.cb_tak.setRightLabelVisible(true);
		this.cb_tak.setCaption("Akun Mutasi");
		this.cb_tak.setRightLabelCaption("");
		
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(230);
		this.cb_buat.setWidth(185);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setRightLabelCaption("");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(252);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setRightLabelCaption("");
		
		this.ed_nilaii = new portalui_saiLabelEdit(this);
		this.ed_nilaii.setLeft(700);
		this.ed_nilaii.setTop(208);
		this.ed_nilaii.setWidth(220);
		this.ed_nilaii.setTipeText(ttNilai);
		this.ed_nilaii.setAlignment(alRight);
		this.ed_nilaii.setCaption("Nilai Terima Inv.");
		this.ed_nilaii.setText("0"); 
		this.ed_nilaii.setReadOnly(true);	
		this.ed_nilaii.setTag("1");
		
		this.ed_nilaix = new portalui_saiLabelEdit(this);
		this.ed_nilaix.setLeft(700);
		this.ed_nilaix.setTop(230);
		this.ed_nilaix.setWidth(220);
		this.ed_nilaix.setTipeText(ttNilai);
		this.ed_nilaix.setAlignment(alRight);
		this.ed_nilaix.setCaption("Nilai Terima Expl.");
		this.ed_nilaix.setText("0"); 
		this.ed_nilaix.setReadOnly(true);	
		this.ed_nilaix.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(700);
		this.ed_nilai.setTop(252);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Total Terima");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);	
		this.ed_nilai.setTag("1");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(274);
	    this.p1.setWidth(900);
	    this.p1.setHeight(170);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Rincian Droping');
		
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(145);
		this.sg1.setTag("2");
		this.sg1.setColTitle(["No","Status","Kode PP","Nama PP","Uraian","Jumlah"]);
		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(445);
		this.sgNav.setLeft(21);
		this.sgNav.setWidth(899);
		this.sgNav.setGrid(this.sg1);
		this.sgNav.setBorder(0);
		this.sgNav.setButtonStyle(3);
		
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
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bShow.onClick.set(this, "showClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_nokirim.onBtnClick.set(this, "FindBtnClick");
			this.cb_tak.onBtnClick.set(this, "FindBtnClick");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			
			this.standarLib.clearByTag(this,["0","1","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg1.clearAll(); 
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_drop_fDroptrm.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.simpan = function()
{
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			sql.add("update dropkrm_m set progress='3' where no_kirim = '"+this.cb_nokirim.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' ");
			
			sql.add("insert into droptrm_m (no_terima,no_kirim,no_dokumen,no_kas,tanggal,akun_tak,"+
					"keterangan,kode_curr,kurs,nik_buat,nik_setuju,lok_asal,kode_lokasi,"+
					"modul,jenis,nilai,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_nokirim.getText()+"','"+this.ed_dok.getText()+"','-','"+this.dp_tgl1.getDate()+"',"+
					"'"+this.cb_tak.getText()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+
					"','"+this.cb_lokasi.getText()+"','"+this.app._lokasi+"',"+
					"'DROP','TRM',"+parseNilai(this.ed_nilai.getText())+",'X','0','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
					
			sql.add("insert into droptrm_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
					"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+ 
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',1,'"+this.cb_tak.getText()+
					"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilai.getText())+",'"+this.app._kodePP+"','-',"+
					"'"+this.app._lokasi+"','DROPT','TAK','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
					",'"+this.app._userLog+"',now())");
										
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","9"],undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
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
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "") 
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'droptrm_m','no_terima',this.app._lokasi+"-DPT"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.doEditChange = function(sender)
{

	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	
	if (sender == this.cb_curr)
	{
		this.cb_akun.setText("");
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
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.showClick = function(sender)
{
	try 
	{
		if (this.cb_nokirim.getText() != "")
		{
			var line,data = this.dbLib.runSQL(" select a.keterangan,a.kode_curr,a.kurs,a.nilai,"+
											  "        a.kode_lokasi,d.nama as nama_lokasi "+
											  " from dropkrm_m a inner join lokasi d on a.kode_lokasi=d.kode_lokasi "+
											  " where a.no_kirim = '"+this.cb_nokirim.getText()+"' and a.lok_tujuan='"+this.app._lokasi+"' and a.progress='2' and a.no_del='-'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.cb_lokasi.setText(line.get("kode_lokasi"));
					this.cb_lokasi.setRightLabelCaption(line.get("nama_lokasi"));
					this.cb_curr.setText(line.get("kode_curr"));
					this.ed_kurs.setText(floatToNilai(line.get("kurs")));
					this.ed_nilai.setText(floatToNilai(line.get("nilai")));
					this.ed_ket.setText(line.get("keterangan"));
				} 
			}
			
			this.sg1.clearAll();
			var data = this.dbLib.runSQL(" select a.status,a.kode_pp,b.nama,a.keterangan,a.nilai "+
							 " from dropkrm_d a inner join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi='"+this.app._lokasi+"' "+
							 " where a.no_kirim = '"+this.cb_nokirim.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.no_urut ");		
			
			if (data instanceof portalui_arrayMap)
			{
				this.sg1.setData(data);
				var tot = tot2 = 0;
				for (var i in data.objList)
				{
					if (parseFloat(data.get(i).get("nilai")) != 0)
					{
						if (data.get(i).get("status") == "INVESTASI") tot += parseFloat(data.get(i).get("nilai"));
						if (data.get(i).get("status") == "EKSPLOITASI") tot2 += parseFloat(data.get(i).get("nilai"));
					}
				}
				this.ed_nilaii.setText(floatToNilai(tot));
				this.ed_nilaix.setText(floatToNilai(tot2));
			}else alert(rs);
		}
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nokirim) 
		{  
			this.standarLib.showListData(this, "Daftar Pengiriman Droping",this.cb_nokirim,undefined, 
										  "select no_kirim, keterangan from dropkrm_m where lok_tujuan='"+this.app._lokasi+"' and progress='2' and no_del='-' and periode<='"+this.ed_period.getText()+"' ",
										  "select count(no_kirim)      from dropkrm_m where lok_tujuan='"+this.app._lokasi+"' and progress='2' and no_del='-' and periode<='"+this.ed_period.getText()+"' ",
										  ["no_kirim","keterangan"],"and",["No Droping","Keterangan"],false);
			this.sg1.clearAll();
		}
		if (sender == this.cb_tak) 
		{
			this.standarLib.showListData(this, "Daftar Akun Mutasi",this.cb_tak,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='019' ",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='019' ",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Pembuat",this.cb_buat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  ["nik","nama"],"and",["NIK","Nama Karyawan"],false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama Karyawan"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_drop_fDroptrm.prototype.doRequestReady = function(sender, methodName, result)
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