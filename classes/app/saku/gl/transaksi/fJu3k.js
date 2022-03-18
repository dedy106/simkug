window.app_saku_gl_transaksi_fJu3k = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fJu3k.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_transaksi_fJu3k";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Umum [Buku Bantu]: Koreksi", 0);	
		
		uses("portalui_saiLabelEdit");
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
	
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
	
        uses("portalui_saiCB");
		this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(56);
		this.cb_jenis.setWidth(230);
		this.cb_jenis.setCaption("Jenis");
		this.cb_jenis.setText("");
		this.cb_jenis.setTag("1");

		/*
		this.cb_jenis.addItem(0,"UMUM");
		this.cb_jenis.addItem(1,"KOREKSI");
		this.cb_jenis.addItem(2,"ADJUST");
		this.cb_jenis.addItem(3,"AUDIT");
		*/
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(78);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No Bukti JU");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		uses("portalui_button");
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(78);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		uses("portalui_saiCB");
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(700);
		this.cb_perlama.setTop(56);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		uses("portalui_saiCBBL");
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(700);
		this.cb_bukti.setTop(78);
		this.cb_bukti.setWidth(205);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No JU Lama");
		this.cb_bukti.setRightLabelCaption("");
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(78);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);

		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(100);
		this.ed_dok.setWidth(310);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(122);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("2");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(144);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setText("IDR");
		this.cb_curr.setTag("2");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(144);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("1"); 
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTag("2");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(166);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("2");
	
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(188);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("2");
		
		this.ed_debet = new portalui_saiLabelEdit(this);
		this.ed_debet.setLeft(680);
		this.ed_debet.setTop(166);
		this.ed_debet.setWidth(220);
		this.ed_debet.setTipeText(ttNilai);
		this.ed_debet.setAlignment(alRight);
		this.ed_debet.setCaption("Total Debet");
		this.ed_debet.setText("0"); 
		this.ed_debet.setReadOnly(true);

		this.ed_kredit = new portalui_saiLabelEdit(this);
		this.ed_kredit.setLeft(680);
		this.ed_kredit.setTop(188);
		this.ed_kredit.setWidth(220);
		this.ed_kredit.setTipeText(ttNilai);
		this.ed_kredit.setAlignment(alRight);
		this.ed_kredit.setCaption("Total Kredit");
		this.ed_kredit.setText("0"); 
		this.ed_kredit.setReadOnly(true);
		
		this.bGar = new portalui_imageButton(this);
		this.bGar.setLeft(900);
		this.bGar.setTop(188);
		this.bGar.setHint("Hitung Anggaran");
		this.bGar.setImage("icon/"+system.getThemes()+"/tabCont2.png");
		this.bGar.setWidth(22);
		this.bGar.setHeight(22);
			
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(210);
	    this.p1.setWidth(900);
	    this.p1.setHeight(260);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Jurnal Transaksi');
    	         
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(210);
	    this.sg1.setColCount(13);
		this.sg1.setColTitle(new Array("Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP",
		                               "Kode Cust","Nama Cust","Kode Vendor","Nama Vendor","NIK","Nama Kary."));
		this.sg1.setColWidth(new Array(12,11,10,9,8,7, 6,5,4,3,2,1,0),new Array(100,80,100,80,100,80, 100,80,120,30,250,120,80));	
		this.sg1.setReadOnly(false);

		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "D");
			val.set(2, "C");	
		this.sg1.columns.get(3).setPicklist(val);
		this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(8).setReadOnly(true);
		this.sg1.columns.get(9).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(10).setReadOnly(true);
		this.sg1.columns.get(11).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(12).setReadOnly(true);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(234);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
	
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();		    
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("util_addOnLib");
			this.addOnLib = new util_addOnLib();
			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(new Array("Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"));
			this.jurnal.p.setCaption('Data Anggaran');
			
			var val = this.dbLib.loadQuery("select concat(kode_jenis,'-',nama) as jenis from ju_jenis where kode_lokasi='"+this.app._lokasi+"' ");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.cb_jenis.addItem(j,val[j].split(";"));
					}
				}
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onCellEnter.set(this, "doCellEnter");
						
			var val = this.dbLib.loadQuery("select distinct periode from ju_m where modul = 'JU2' and kode_lokasi = '"+this.app._lokasi+"' and not (periode < '"+this.app._periode.substr(0,4)+"01')",true);
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
				
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			//this.cb_jenis.setText("UMUM");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gl_transaksi_fJu3k.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fJu3k.implement({
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	},
	ubah: function(){
		this.hitungGar();
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
			{
				system.alert(this,"Nilai transaksi melebihi saldo anggaran.","Periksa kembali data anggaran.");
				return false;
			}
		}
		
		this.bGen.click();
		if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2")))
		{
			try
			{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode)) 
				{
					sql.add(" update ju_m set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_ju,'r') where no_ju ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,"+
							"                  periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1)"+
							" select concat(no_ju,'r'),kode_lokasi,no_dokumen,'"+this.dp_tgl1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
							"       '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_setuju,now(),'"+this.app._userLog+"','F',no_ju,'-',ref1 "+
							" from ju_m where no_ju = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");									
					
					sql.add(" insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
							"	   			    kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
							" select concat(no_ju,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
							"        kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
							" from ju_j where no_ju = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
					
					sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+	
							"   select concat(no_bukti,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
							"   from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
					this.nb = this.ed_nb.getText();
				}
				else
				{
					sql.add("delete from ju_j where no_ju='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_m where no_ju='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'JU'");			
					this.nb = this.cb_bukti.getText();
				}
				
				sql.add("insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,"+
						"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
						"('"+this.nb+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','JU2','"+this.jenis+"','"+
						     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_debet.getText())+",'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',now(),'"+this.app._userLog+"','F','-','-','-')");
				
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{			
					if (this.sg1.rowValid(i)){
						sql.add("insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg1.getCell(0,i)+
							"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i).toUpperCase()+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','-',"+
							"'"+this.sg1.getCell(7,i)+"','-','-','"+this.sg1.getCell(9,i)+"','-','"+this.sg1.getCell(11,i)+"','"+this.app._lokasi+"','JU2','"+this.jenis+"',"+
							"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");
					}
				}
				
				//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
				if (this.gridJurnal.getLength() > 0)
				{					
					var baris1 = true;
					var line,scr1;
					var DC = "";
					for (var i in this.gridJurnal.objList)
					{
						scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
						line = this.gridJurnal.get(i);
						if (parseFloat(line.get("nilai")) < 0) {DC = "C";}
						else {DC = "D";}
						scr1 += "('"+this.nb+"','JU2','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
						        "','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
						baris1 = false;
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
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(); this.sg1.appendRow();
				}
				break;
				
			case "ubah" :
				this.sg1.validasi();
				if  (nilaiToFloat(this.ed_debet.getText()) != nilaiToFloat(this.ed_kredit.getText())){
					system.alert(this,"Total debet dan kredit tidak sama.","");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
				{
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if (parseFloat(this.periodeLama) > parseFloat(this.ed_period.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
				{
					if (this.app._pernext == "1")
					  system.confirm(this, "ubahcek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data perubahan akan disimpan?");
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
				if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
				{
					try
					{
						var tgl = new Date();
						uses("server_util_arrayList");
						sql = new server_util_arrayList();	
						
						if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
						{
							system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
							return false;
						}
						
						if (parseFloat(this.periodeLama) < parseFloat(this.app._periode)) 
						{
							sql.add(" update ju_m set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_ju,'r') where no_ju ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add(" insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,"+
									"                  periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1)"+
									" select concat(no_ju,'r'),kode_lokasi,no_dokumen,'"+this.dp_tgl1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
									"       '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_setuju,now(),'"+this.app._userLog+"','F',no_ju,'-',ref1 "+
									" from ju_m where no_ju = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");									
							
							sql.add(" insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"	   			    kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
									" select concat(no_ju,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"        kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
									" from ju_j where no_ju = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
							
							sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+	
									"   select concat(no_bukti,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
									"   from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
						}
						else
						{
							sql.add("delete from ju_j where no_ju='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from ju_m where no_ju='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'JU'");			
						}
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
				break;
		}
	},
	genClick: function(sender){
		try
		{
			if ((this.ed_period.getText() != "") && (this.jenis != undefined))
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ju_m','no_ju',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}
			else
			{
				system.alert(this,"Periode dan jenis harus valid.","");
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	showClick: function(sender){
		if (this.cb_bukti.getText() != "")
		{
			if (this.cb_bukti != undefined) {
				try 
				{
					this.standarLib.clearByTag(this, new Array("2"),undefined);				
					var line, data = this.dbLib.runSQL(" select  a.no_dokumen, a.keterangan, a.kode_curr, a.kurs, a.nik_buat, a.nik_setuju, b.nama as nama_pembuat, c.nama as nama_setuju,a.periode,a.posted "+
												 " from ju_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi = b.kode_lokasi "+
												 "             inner join karyawan c on a.nik_setuju = c.nik and a.kode_lokasi = c.kode_lokasi "+
												 " where a.no_ju='"+this.cb_bukti.getText()+"'  and a.kode_lokasi='"+this.app._lokasi+"'"); //and a.posted = 'F'
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{									
							line = data.get(0);
							this.posted = line.get("posted");
							this.periodeLama = line.get("periode");
							
							this.ed_dok.setText(line.get("no_dokumen"));
							this.ed_desc.setText(line.get("keterangan"));
							this.cb_curr.setText(line.get("kode_curr"));
							this.ed_kurs.setText(line.get("kurs"));
							this.cb_pembuat.setText(line.get("nik_buat"));
							this.cb_setuju.setText(line.get("nik_setuju"));
							this.cb_pembuat.setRightLabelCaption(line.get("nama_pembuat"));
							this.cb_setuju.setRightLabelCaption(line.get("nama_setuju"));
						} 
					}

					this.sg1.clear(); 
					var strSql = " select  a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai,a.kode_pp, ifnull(c.nama,'-') as nama_pp, a.kode_cust,ifnull(d.nama,'-') as nama_cust, a.kode_vendor,ifnull(e.nama,'-') as nama_vendor, a.nik,ifnull(f.nama,'-') as nama_kar  "+
								 " from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "             left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								 "             left outer join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
								 "             left outer join vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
								 "             left outer join karyawan f on a.nik=f.nik and a.kode_lokasi=f.kode_lokasi "+
								 " where a.no_ju = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					
					var data = this.dbLib.runSQL(strSql);
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{									
							for (var i in data.objList)
							{
								line = data.get(i);
								this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12),
									new Array(line.get("kode_akun"),line.get("nama_akun"),line.get("keterangan"),line.get("dc"),line.get("nilai"),
											  line.get("kode_pp"),line.get("nama_pp"),line.get("kode_cust"),line.get("nama_cust"), line.get("kode_vendor"),line.get("nama_vendor"),line.get("nik"),line.get("nama_kar")));					
							}
						} 
					}
					this.sg1.validasi();
				} catch(e)
				{
					system.alert(this,e,"");
				}
			}
		}
	},
	doEditChange: function(sender){
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "") && (this.jenis != undefined)) 
			//	this.bGen.click();
		}
		
		if (sender == this.cb_jenis)
		{
			this.ed_nb.setText("");
			this.jenis = this.cb_jenis.getText().substr(0,2);		
			
			/*
			if (this.cb_jenis.getText() == "UMUM")
			{
				this.jenis = "JU";
			}
			if (this.cb_jenis.getText() == "KOREKSI")
			{
				this.jenis = "JK";
			}
			if (this.cb_jenis.getText() == "ADJUST")
			{
				this.jenis = "JA";
			}
			if (this.cb_jenis.getText() == "AUDIT")
			{
				this.jenis = "JD";
			} */
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
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_bukti) 
			{
			    if (this.ed_period != "") 
				{
				  this.standarLib.showListData(this, "Daftar Bukti JU Periode "+this.ed_period.getText(),this.cb_bukti,undefined, 
													 "select no_ju, no_dokumen, keterangan from ju_m where periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' and modul = 'JU2' ", //posted = 'F' and 
													 "select count(no_ju)      from ju_m where periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' and modul = 'JU2' ", //posted = 'F' and 
													 new Array("no_ju","no_dokumen","keterangan"),"and", new Array("No Bukti","No Dokumen","Keterangan"),false);
				}
				this.standarLib.clearByTag(this, new Array("2"),undefined);				
				this.sg1.clear(); this.sg1.appendRow();
			}
			if (sender == this.cb_curr) 
			{
			    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr, nama  from curr",
											  "select count(kode_curr) from curr",
											  new Array("kode_curr","nama"),"where", new Array("Kode Curr","Deskripsi"),false);
			}
			if (sender == this.cb_pembuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Petugas",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
			}
			
			if (sender == this.cb_setuju) 
			{   
			    this.standarLib.showListData(this, "Daftar yang Menyetujui",this.cb_setuju,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
			}
		}
		catch(e)
		{
			systemAPI.alert(e);
		}
	},
	doFindBtnClick: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
													  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
													  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
													  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
					break;
				case 5 : 
					this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
					break;
				case 7 : 
					this.standarLib.showListDataForSG(this, "Daftar Customer",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_cust, a.nama from cust a where a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(a.kode_cust)  from cust a where a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_cust","a.nama"),"and",new Array("Kode Cust","Deskripsi"),true);
					break;
				case 9 : 
					this.standarLib.showListDataForSG(this, "Daftar Vendor",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_vendor, a.nama from vendor a where a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(a.kode_vendor)  from vendor a where a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_vendor","a.nama"),"and",new Array("Kode Vendor","Deskripsi"),true);
					break;
				case 11 : 
					this.standarLib.showListDataForSG(this, "Daftar Karyawan",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.nik, a.nama from karyawan a where a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(a.nik)  from karyawan a where a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.nik","a.nama"),"and",new Array("NIK","Nama"),true);
					break;
			}
		}catch(e){
			systemAPI.alert("[app_saku_gl_transaksi_fJu3k] : doFindBtnClick : " + e);
		}		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i)){
					if (this.sg1.getCell(4,i) != ""){
						if (this.sg1.getCell(3, i).toUpperCase() == "D")					
							totD += nilaiToFloat(this.sg1.getCell(4,i));			
						if (this.sg1.getCell(3, i).toUpperCase() == "C")					
							totC += nilaiToFloat(this.sg1.getCell(4,i));			
					}
				}
			}
			this.ed_debet.setText(floatToNilai(totD));
			this.ed_kredit.setText(floatToNilai(totC));
		}catch(e){
			alert("[app_saku_gl_transaksi_fJu3k]::doNilaiChange:"+e);
		}
	},
	doCellExit: function(sender, col, row) {
		try
		{
			switch(col)
			{
				case 3 : 
				case 4 : 
							this.sg1.validasi();
					break;
			}
		}catch(e)
		{
			alert("doFindBtnClick : " + e);
		}	
	},
	hitungGar: function(){
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0;
					
	    for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			if (!this.sg1.rowValid(i)) continue;
			kdAkun = this.sg1.getCell(0,i);
			kdPP = this.sg1.getCell(5,i);
			//kdDRK = this.sg1.getCell(7,i);
			
			if (this.sg1.getCell(3,i) == "D") {nreal = nilaiToFloat(this.sg1.getCell(4,i));}
			else {nreal = nilaiToFloat(this.sg1.getCell(4,i)) * -1;}
			
			nemu = false;
			ix = 0;
						
			for (var j in dtJurnal.objList)
			{		
			  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) ) //&& (kdDRK == dtJurnal.get(j).get("kode_drk"))
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
				row.set("kode_pp",kdPP);
				row.set("kode_drk","-"); //kdDRK
				row.set("nilai",nreal);
				row.set("saldo_gar",0);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			}
		}
		
		if (dtJurnal.getLength() > 0){
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
			dtJurnal.setTag2(dataDesc);
		}
		this.gridJurnal = dtJurnal;
		//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
		var line = undefined;
		var sls = 0;
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			var baris,data = this.dbLib.runSQL("select fn_cekagg3('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"','"+this.cb_bukti.getText()+"') as gar ");
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
	},
	garClick: function(sender){
		try
		{
			if (this.ed_debet.getText() != "0")
			{
				this.jurnal.sg.clear();
				this.hitungGar();
				if (this.gridJurnal != undefined){				
					this.jurnal.setData(this.gridJurnal);
					this.jurnal.showModal();
				}
			}
		} catch	(e)
		{
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
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
	}
});