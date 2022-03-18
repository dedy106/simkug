window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_nonpro_depo_fDepoakruk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Bunga Deposito: Koreksi - Reverse", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
	
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
		this.ed_nb.setCaption("No Akru Bunga");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(700);
		this.cb_perlama.setTop(32);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(700);
		this.cb_bukti.setTop(54);
		this.cb_bukti.setWidth(205);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Akru Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bLoad = new portalui_imageButton(this);
		this.bLoad.setLeft(902);
		this.bLoad.setTop(54);
		this.bLoad.setHint("Load Data");
		this.bLoad.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bLoad.setWidth(22);
		this.bLoad.setHeight(22);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("1");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(323);
		this.cb_curr.setTop(76);
		this.cb_curr.setWidth(150);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
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
		this.ed_desc.setTag("1");
		
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(120);
		this.cb_pp.setWidth(185);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setReadOnly(true);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setText(""); 
		this.cb_pp.setRightLabelCaption("");	
		this.cb_pp.setTag("1");
		
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(142);
		this.cb_buat.setWidth(185);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setText(""); 
		this.cb_buat.setRightLabelCaption("");	
		this.cb_buat.setTag("1");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(164);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");	
		this.cb_setuju.setTag("1");
		
		this.cb_drk = new portalui_saiCBBL(this);
		this.cb_drk.setLeft(20);
		this.cb_drk.setTop(186);
		this.cb_drk.setWidth(185);
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setReadOnly(true);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setCaption("Data RKM");
		this.cb_drk.setText(""); 
		this.cb_drk.setRightLabelCaption("");	
		this.cb_drk.setTag("1");
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(700);
		this.ed_total.setTop(186);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(100);
		this.ed_total.setCaption("Total Akru Bunga");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
		this.ed_total.setTag("1");
		
		this.bHitung = new portalui_button(this);
		this.bHitung.setLeft(620);
		this.bHitung.setTop(186);
		this.bHitung.setCaption("Hitung");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(208);
	    this.p1.setWidth(900);
	    this.p1.setHeight(268);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Deposito');
    	
		uses("portalui_saiTable");	
		this.sg1 = new portalui_saiTable(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(245);
		this.sg1.setTag("1");
		this.sg1.setColTitle(["No","No Deposito","Bank","Cabang","No Dokumen","Deskripsi","Nilai Penempatan","Tanggal","Tgl Jth Tempo","Tgl Akru Sblm","Akun Piutang","Akun Pdpt","% Rate","Basis","Jml Hari","Nilai Bunga","Progress"]);
	
		setTipeButton(tbUbahHapus);
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
			this.bLoad.onClick.set(this, "loadClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			
			var val = this.dbLib.loadQuery("select periode from periode where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.app._periode.substr(0,4)+"%'");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.cb_perlama.addItem(j,val[j].split(";"));
					}
				}
			
			this.standarLib.clearByTag(this,["0","1"],undefined);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg1.clearAll();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.ubah = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this,["0","1"]))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
				
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add("update depo_akru_m set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_akru,'r') where no_akru ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");							    					
				sql.add("insert into depo_akru_m (no_akru,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input)"+
						"      select concat(no_akru,'r'),no_dokumen,kode_lokasi,'"+this.dp_tgl1.getDate()+"',keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,'F',modul,'"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"',no_akru,'"+this.ed_nb.getText()+"','"+this.app._userLog+"',now() "+
						"      from depo_akru_m where no_akru = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
				sql.add("insert into depo_akru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
						"   select concat(no_akru,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,"+
						"   kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
						"   from depo_akru_j where no_akru = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
				sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
						"    select concat(no_bukti,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
						"    from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul ='DEPO_AKRU'");			
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add(" delete from depo_akru_m where no_akru ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from depo_akru_j where no_akru ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from depo_akru_d where no_akru ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'DEPO_AKRU'");			
				this.nb = this.cb_bukti.getText();
			}	
			
			sql.add("insert into depo_akru_m (no_akru,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_total.getText())+","+
					"'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','F','DEPO_AKRU','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");
					
			var tglakru,tgllama,duedate = "";
			for (var i=1; i <= this.sg1.getRowCount(); i++)
			{			
				tgllama = this.sg1.getCell(9,i).substr(6,4) +'-'+ this.sg1.getCell(9,i).substr(3,2) +'-'+ this.sg1.getCell(9,i).substr(0,2);
				duedate = this.sg1.getCell(8,i).substr(6,4) +'-'+ this.sg1.getCell(8,i).substr(3,2) +'-'+ this.sg1.getCell(8,i).substr(0,2);
				if ( (new Date()).strToDate(this.dp_tgl1.getDate()) > (new Date()).strToDate(duedate) )
				{
					tglakru = duedate;
				}
				else 
				{
					tglakru = this.dp_tgl1.getDate();
				}
				
				sql.add("update depo_m set tgl_akru = '"+tglakru+"' where no_depo='"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into depo_akru_d (no_akru,no_depo,periode,nilai,kode_lokasi,akun_ar,akun_pdpt,kode_pp,kode_drk,tgl_akru_before,jml_hari,progress) values "+	
						"('"+this.nb+"','"+this.sg1.getCell(1,i)+"','"+this.ed_period.getText()+"',"+
						parseNilai(this.sg1.getCell(15,i))+",'"+this.app._lokasi+"','"+this.sg1.getCell(10,i)+"','"+
						this.sg1.getCell(11,i)+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+tgllama+"',"+nilaiToFloat(this.sg1.getCell(14,i))+",'0')");
			}
			
			var scr1 = "insert into depo_akru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
			var awal = true;
			var line = undefined;
			for (var i in this.gridJurnal.objList)
			{
				if (!awal) { scr1 += ",";}
				
				line = this.gridJurnal.get(i);
				scr1 += "('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+line.get("kode_akun")+
					 	"','"+line.get("keterangan")+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.app._lokasi+"','DEPO','AKRU','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())";
				awal = false;				
			}
			sql.add(scr1);
			
			//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
			if (this.gridJurnal.getLength() > 0)
			{
				var scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
				var baris1 = true;
				var line = undefined;
				var DC = "";
				for (var i in this.gridJurnal.objList)
				{
					if (!baris1) { scr1 += ",";}	
					line = this.gridJurnal.get(i);
					scr1 += "('"+this.nb+"','DEPO_AKRU','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+
					        "','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','D',0,"+Math.abs(parseFloat(line.get("nilai")))+")";
					baris1 = false;
				}	
				sql.add(scr1);
			}
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1"],undefined);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clearAll(); 
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			}
			break;
		
		case "ubah" :	
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (nilaiToFloat(this.ed_total.getText()) == 0)
			{
				system.alert(this,"Nilai akru tidak valid.","Nilai total tidak boleh nol.");
				return false;
			}
			if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
			{
				system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
				return false;
			}
			for (var i=1; i <= this.sg1.getRowCount(); i++)
			{
				if (this.sg1.getCell(16,i) != "0")
				{
					system.alert(this,"Terdapat data akru yang sudah dicairkan.","Akru yang sudah dicairkan tidak dapat dibatalkan/diubah.[baris : "+i+"]");
					return false;
				}
			}
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
			{
				if (this.app._pernext == "1")
				  system.confirm(this, "ubahcek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
			}
			else this.ubah();
			break;
			
		case "ubahcek" : this.ubah();			
			break;
			
		case "hapus" :
			try
			{	
				if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
				{
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				for (var i=1; i <= this.sg1.getRowCount(); i++)
				{
					if (this.sg1.getCell(16,i) != "0")
					{
						system.alert(this,"Terdapat data akru yang sudah dicairkan.","Akru yang sudah dicairkan tidak dapat dibatalkan/diubah.[baris : "+i+"]");
						return false;
					}
				}
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				var tglakrubefore = "";
				for (var i=1; i <= this.sg1.getRowCount(); i++)
				{			
					tglakrubefore = this.sg1.getCell(9,i).substr(6,4) +'-'+ this.sg1.getCell(9,i).substr(3,2) +'-'+ this.sg1.getCell(9,i).substr(0,2);
					sql.add("update depo_m set tgl_akru = '"+tglakrubefore+"' where no_depo='"+this.sg1.getCell(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add("update depo_akru_m set no_del = concat(no_akru,'r') where no_akru ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");							    					
					sql.add("insert into depo_akru_m (no_akru,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input)"+
							"      select concat(no_akru,'r'),no_dokumen,kode_lokasi,'"+this.dp_tgl1.getDate()+"',keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,'F',modul,'"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"',no_akru,'-','"+this.app._userLog+"',now() "+
							"      from depo_akru_m where no_akru = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
					sql.add("insert into depo_akru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
							"   select concat(no_akru,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,"+
						    "   kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
							"   from depo_akru_j where no_akru = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
					sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"    select concat(no_bukti,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
							"    from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul ='DEPO_AKRU'");			
				}
				else
				{
					sql.add(" delete from depo_akru_m where no_akru ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from depo_akru_j where no_akru ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from depo_akru_d where no_akru ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'DEPO_AKRU'");			
				}		
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}			
			break;
			
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'depo_akru_m','no_akru',this.app._lokasi+"-DPA"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
			var data = this.dbLib.runSQL(" select a.no_depo,a.bank,a.cabang,a.no_dokumen,a.keterangan,a.nilai,a.tanggal,a.due_date,b.tgl_akru_before,a.akun_ar,a.akun_pdpt,a.rate,a.basis, "+
  									     "       case when '"+this.dp_tgl1.getDate()+"'< a.due_date then datediff('"+this.dp_tgl1.getDate()+"',b.tgl_akru_before) else  datediff(a.due_date,b.tgl_akru_before) end as jmlhari,"+
										 "       case when rate <> 0 then "+
										 "             case when '"+this.dp_tgl1.getDate()+"'< a.due_date then round((datediff('"+this.dp_tgl1.getDate()+"',b.tgl_akru_before) * a.rate/100/a.basis * a.nilai),0) "+
										 "             else round((datediff(a.due_date,b.tgl_akru_before) * a.rate/100/a.basis * a.nilai),0) end "+
										 "        else 0 end "+
										 "        as nbunga,b.progress "+										 
									     " from depo_m a inner join depo_akru_d b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
									     " where b.no_akru = '"+this.cb_bukti.getText()+"' and b.tgl_akru_before<'"+this.dp_tgl1.getDate()+"' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='2' ");		
			
			if (data instanceof portalui_arrayMap)
			{
				this.sg1.setData(data);
				var tot = 0;
				for (var i in data.objList)
				{
					if (parseFloat(data.get(i).get("nbunga")) != 0)
						tot += parseFloat(data.get(i).get("nbunga"));
				}
				//this.ed_total.setText(format_number(tot,2,',','.'));
				this.ed_total.setText(floatToNilai(tot));
			}else alert(rs);

			var row,dtJurnal = new portalui_arrayMap();
			var nemu = false;
			var dtJrnl = 0;
			var line = undefined;
			
			for (var i in this.sg1.data.objList)
			{
				line = this.sg1.data.get(i);
				kdAkun = this.sg1.data.get(i).get("akun_ar");			
				
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
					row.set("nilai",parseFloat(this.sg1.data.get(i).get("nbunga")));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nbunga")));				
				}
				
				
				ix = -1;
				kdAkun = this.sg1.data.get(i).get("akun_pdpt");
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
					row.set("nilai",parseFloat(this.sg1.data.get(i).get("nbunga")));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {				
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nbunga")));				
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
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.loadClick = function(sender)
{
	try 
	{
		if (this.cb_bukti.getText() != "")
		{
			if (this.cb_bukti != undefined) {
				try 
				{
					this.standarLib.clearByTag(this, new Array("1"),undefined);				
					var line,data = this.dbLib.runSQL(" select  a.no_dokumen, a.keterangan, a.kode_curr, a.kurs, a.nik_buat, a.nik_setuju, b.nama as nama_buat, c.nama as nama_setuju, "+
													  "         a.periode,a.posted,a.kode_pp,d.nama as nama_pp,a.kode_drk,e.nama as nama_drk,a.nilai "+
													  " from depo_akru_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi = b.kode_lokasi "+
													  "                    inner join karyawan c on a.nik_setuju = c.nik and a.kode_lokasi = c.kode_lokasi "+
													  "                    inner join pp d on d.kode_pp = a.kode_pp and a.kode_lokasi = d.kode_lokasi "+
													  "                    inner join drk e on e.kode_drk = a.kode_drk and a.kode_lokasi = e.kode_lokasi and e.tahun = substring(a.periode,1,4) "+
													  " where a.no_akru='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{									
							line = data.get(0);
							this.periodeLama = line.get("periode");
							this.posted = line.get("posted");
							this.ed_dok.setText(line.get("no_dokumen"));
							this.ed_desc.setText(line.get("keterangan"));
							this.cb_curr.setText(line.get("kode_curr"));
							this.ed_kurs.setText(line.get("kurs"));
							this.cb_buat.setText(line.get("nik_buat"));
							this.cb_buat.setRightLabelCaption(line.get("nama_buat"));
							this.cb_setuju.setText(line.get("nik_setuju"));
							this.cb_setuju.setRightLabelCaption(line.get("nama_setuju"));
							this.ed_total.setText(floatToNilai(parseFloat(line.get("nilai"))));
							this.cb_pp.setText(line.get("kode_pp"));
							this.cb_pp.setRightLabelCaption(line.get("nama_pp"));
							this.cb_drk.setText(line.get("kode_drk"));
							this.cb_drk.setRightLabelCaption(line.get("nama_drk"));
						} 
					}
										 
					this.sg1.clearAll(); 
					var strSql = "select a.no_depo,b.bank,b.cabang,b.no_dokumen,b.keterangan,b.nilai as ndepo,b.tanggal,b.due_date,a.tgl_akru_before,b.akun_ar,b.akun_pdpt,b.rate,b.basis,a.jml_hari,a.nilai,a.progress "+
					             "from depo_akru_d a inner join depo_m b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
					             "where a.no_akru = '"+this.cb_bukti.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
					var data = this.dbLib.runSQL(strSql);
					if (data instanceof portalui_arrayMap)
					{
						this.sg1.setData(data);
					}else alert(rs);
					
				} catch(e)
				{
					system.alert(this,e,"");
				}
			}
		}
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Bukti Akru Bunga Deposito",this.cb_bukti,undefined, 
				  								 "select no_akru, keterangan from depo_akru_m where periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_akru)      from depo_akru_m where periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 ["no_akru","keterangan"],"and",["No Akru","Keterangan"],false);
			}
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
			this.sg1.clearAll(); 
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr ",
										  "select count(kode_curr) from curr",
										  ["kode_curr","nama"],"where",["Kode Currency","Deskripsi"],false);
			this.sg1.clearAll();
		}
		if (sender == this.cb_drk) 
		{   
			this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
										  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis_akun='Pendapatan'",
										  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis_akun='Pendapatan'",
										  ["a.kode_drk","a.nama"],"and",["Kode RKM","Deskripsi"],true);			
		}
		if (sender == this.cb_pp) 
		{   
			this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and kode_pp='"+this.app._kodePP+"'",
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and kode_pp='"+this.app._kodePP+"'",
										  ["kode_pp","nama"],"and",["Kode PP","Deskripsi"],false);
			
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.cb_pp.getText()+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.cb_pp.getText()+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_setuju,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_nonpro_depo_fDepoakruk.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.nb +")");
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