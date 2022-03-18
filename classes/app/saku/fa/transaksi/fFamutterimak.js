window.app_saku_fa_transaksi_fFamutterimak = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFamutterimak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFamutterimak";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Terima Asset: Koreksi", 0);	
				
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
		
		uses("portalui_saiCBBL");
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(54);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Bukti Lama");
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setRightLabelCaption("");
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(54);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(50);
		this.ed_desc.setTag("2");
				
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
		this.cb_buat.setTag("2");
		
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
		this.cb_setuju.setTag("2");
		
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
		this.cb_kirim.setTag("2");
		
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
		this.cb_tak.setTag("2");
		
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
		this.cb_vendor.setTag("2");
		
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
		this.cb_lokasi.setTag("2");
		
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
		this.cb_lokfa.setTag("2");
		
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
		this.ed_nasset.setTag("2");
		
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
		this.ed_total.setTag("2");
		
		uses('portalui_panel');
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
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_tak.onBtnClick.set(this, "FindBtnClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFamutterimak.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFamutterimak.prototype.mainButtonClick = function(sender)
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
window.app_saku_fa_transaksi_fFamutterimak.prototype.ubah = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			if (this.app._lokasi != this.cb_lokasi.getText())
			{
				sql.add("update fa_asset a, famutasi_d b set a.progress='X' where a.no_fa=b.no_fabaru and a.kode_lokasi=b.lokasi_tuj and b.no_kirim='"+this.cb_kirim.getText()+"' and b.kode_lokasi = '"+this.cb_lokasi.getText()+"' and b.no_terima='"+this.cb_bukti.getText()+"' and b.lokasi_tuj='"+this.app._lokasi+"'");
			}
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				if (this.lokasiLama.getText() == this.app._lokasi) {vposted = "X";} else {vposted = "F";}
				sql.add("update famutterima_m set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_terima,'r') where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into famutterima_m (no_terima,no_kirim,no_dokumen,kode_lokasi,lokasi_asal,kode_lokfa,kode_vendor,tanggal,keterangan,nilai,nilai_buku,kode_curr,kurs,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input)"+
						"      select concat(no_terima,'r'),no_kirim,no_dokumen,kode_lokasi,lokasi_asal,kode_lokfa,kode_vendor,'"+this.dp_tgl1.getDate()+"',keterangan,nilai,nilai_buku,kode_curr,kurs,kode_pp,kode_drk,modul,'"+vposted+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"',no_terima,'-','"+this.app._lokasi+"',now() "+
						"      from famutterima_m where no_terima= '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");																				
				if (this.posted != "X")
				{
					sql.add("insert into famutterima_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						"                      kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
						"   select concat(no_terima,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,"+
						"   kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
						"   from famutterima_j where no_terima = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				}
			}
			else
			{
				sql.add(" delete from famutterima_m where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from famutterima_j where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}

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
					sql.add("update fa_asset set kode_klpfa='"+this.sg1.getCell(0,i)+"',kode_klpakun='"+
					        this.sg1.getCell(2,i)+"',kode_pp='"+this.sg1.getCell(4,i)+"',kode_lokfa='"+
							this.sg1.getCell(6,i)+"',nik_pnj='"+this.sg1.getCell(8,i)+"' "+
							" where no_fa='"+this.sg1.getCell(10,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					/*
					sql.add(" insert into fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri) "+
							" select '"+this.sg1.getCell(10,i)+"',barcode,'"+this.app._lokasi+"','"+this.sg1.getCell(4,i)+"','"+this.sg1.getCell(0,i)+"','"+
							            this.sg1.getCell(2,i)+"','"+this.sg1.getCell(6,i)+"','"+this.sg1.getCell(8,i)+"',nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,1,tgl_perolehan,periode,tgl_susut,'"+
										this.app._userLog+"',now(),umur,persen,periode_susut,merk,tipe,no_seri from fa_asset "+
							" where no_fa='"+this.sg1.getCell(11,i)+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					*/
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
window.app_saku_fa_transaksi_fFamutterimak.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
		
		case "ubah" :	
			if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
			{
				system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
				return false;
			}
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
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
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				
				if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode)))
				{
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if (this.app._lokasi == this.cb_lokasi.getText())
				{
					sql.add("update fa_asset a, famutasi_d b set a.progress='M' where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_kirim='"+this.cb_kirim.getText()+"' and b.kode_lokasi = '"+this.cb_lokasi.getText()+"'");
				} else
				{
					sql.add("update fa_asset a, famutasi_d b set a.progress='X' where a.no_fa=b.no_fabaru and a.kode_lokasi=b.lokasi_tuj and b.no_kirim='"+this.cb_kirim.getText()+"' and b.kode_lokasi = '"+this.cb_lokasi.getText()+"' and b.no_terima='"+this.cb_bukti.getText()+"' and b.lokasi_tuj='"+this.app._lokasi+"'");
				}
				sql.add("update famutkirim_m set progress='0' where no_kirim='"+this.cb_kirim.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
				sql.add("update famutasi_d set no_terima='-',no_fabaru='-' where no_kirim='"+this.cb_kirim.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
				
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					if (this.lokasiLama.getText() == this.app._lokasi) {vposted = "X";} else {vposted = "F";}
					sql.add("update famutterima_m set no_del = concat(no_terima,'r') where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("insert into famutterima_m (no_terima,no_kirim,no_dokumen,kode_lokasi,lokasi_asal,kode_lokfa,kode_vendor,tanggal,keterangan,nilai,nilai_buku,kode_curr,kurs,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input)"+
							"      select concat(no_terima,'r'),no_kirim,no_dokumen,kode_lokasi,lokasi_asal,kode_lokfa,kode_vendor,'"+this.dp_tgl1.getDate()+"',keterangan,nilai,nilai_buku,kode_curr,kurs,kode_pp,kode_drk,modul,'"+vposted+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"',no_terima,'-','"+this.app._lokasi+"',now() "+
							"      from famutterima_m where no_terima= '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");																				
					if (this.posted != "X")
					{
						sql.add("insert into famutterima_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							"                      kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
							"   select concat(no_terima,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,"+
						    "   kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
							"   from famutterima_j where no_terima = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					}
				}
				else
				{
					sql.add(" delete from famutterima_m where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from famutterima_j where no_terima ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;								
	}
};
window.app_saku_fa_transaksi_fFamutterimak.prototype.genClick = function(sender)
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
window.app_saku_fa_transaksi_fFamutterimak.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFamutterimak.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};
window.app_saku_fa_transaksi_fFamutterimak.prototype.showClick = function(sender)
{
	try
	{
		if (this.cb_bukti.getText() != "")
		{
			var line,data = this.dbLib.runSQL(" select a.no_kirim,a.no_dokumen,a.keterangan,a.nik_buat,a.nik_setuju,a.kode_vendor,a.lokasi_asal,a.kode_lokfa, b.nama as nama_buat,"+
			                                  "        c.nama as nama_setuju, d.nama as nama_vendor,a.posted,e.nama as nama_lokasi,f.nama as nama_lokfa,a.nilai,a.nilai_buku "+
											  " from famutterima_m a "+
											  "				inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
											  "				inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
											  "				inner join vendor d on a.kode_vendor=d.kode_vendor and a.lokasi_asal=d.kode_lokasi "+
											  "				inner join lokasi e on a.lokasi_asal=e.kode_lokasi  "+
											  "				inner join fa_lokasi f on a.kode_lokfa=f.kode_lokfa and f.kode_lokasi=a.kode_lokasi "+
											  " where a.no_terima = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokasiLama = line.get("lokasi_asal");
					this.periodeLama = line.get("periode");
					this.posted = line.get("posted");
					this.ed_dok.setText(line.get("no_dokumen"));
					this.ed_desc.setText(line.get("keterangan"));
					this.cb_vendor.setText(line.get("kode_vendor"));
					this.cb_vendor.setRightLabelCaption(line.get("nama_vendor"));
					this.cb_buat.setText(line.get("nik_buat"));
					this.cb_buat.setRightLabelCaption(line.get("nama_buat"));
					this.cb_setuju.setText(line.get("nik_setuju"));
					this.cb_setuju.setRightLabelCaption(line.get("nama_setuju"));
					this.cb_lokasi.setText(line.get("lokasi_asal"));
					this.cb_lokasi.setRightLabelCaption(line.get("nama_lokasi"));
					this.cb_lokfa.setText(line.get("kode_lokfa"));
					this.cb_lokfa.setRightLabelCaption(line.get("nama_lokfa"));
					this.ed_nasset.setText(floatToNilai(parseFloat(line.get("nilai"))));
					this.ed_total.setText(floatToNilai(parseFloat(line.get("nilai_buku"))));
					this.cb_kirim.setText(line.get("no_kirim"));
					if (this.app._lokasi == line.get("lokasi_asal"))
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
			
			var line,data = this.dbLib.runSQL(" select a.kode_akun,b.nama as nama_akun "+
											  " from  famutterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  " where a.jenis = 'TAK' and a.no_terima = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.cb_tak.setText(line.get("kode_akun"));
					this.cb_tak.setRightLabelCaption(line.get("nama_akun"));
				} else
				{
					this.cb_tak.setText("");
					this.cb_tak.setRightLabelCaption("");
				}
			}
			
			this.sg1.showLoading();
			var line,data = this.dbLib.runSQL(" select z.no_fabaru,a.no_fa,a.barcode,a.nama,a.merk,a.tipe,a.no_seri,a.nilai,(a.nilai-ifnull(e.tot_susut,0)) as nb,f.kode_akun,f.akun_deprs, "+
										  "            i.nik_pnj as nik_pnj2, ifnull(j.nama,'-') as nama_pnj2,i.kode_lokfa as kode_lokfa2,ifnull(k.nama,'-') as nama_lokfa2,i.kode_pp as kode_pp2,ifnull(l.nama,'-') as nama_pp2,"+
										  "            i.kode_klpakun as kode_klpakun2,ifnull(m.nama,'-') as nama_klpakun2, "+
										  "			   i.kode_klpfa as kode_klpfa2,ifnull(n.nama,'-') as nama_klp2 "+
										  " from famutasi_d z inner join fa_asset a on z.no_fa=a.no_fa and z.kode_lokasi=a.kode_lokasi "+
										  "     		    inner join fa_klpakun f on a.kode_klpakun = f.kode_klpakun and a.kode_lokasi=f.kode_lokasi "+
										  "     		    inner join fa_asset i on z.no_fabaru = i.no_fa and z.lokasi_tuj=i.kode_lokasi "+
										  "     		    left outer join karyawan j on i.nik_pnj=j.nik and i.kode_lokasi=j.kode_lokasi "+
										  "     		    left outer join fa_lokasi k on i.kode_lokfa=k.kode_lokfa and i.kode_lokasi=k.kode_lokasi "+
										  "     		    left outer join pp l on i.kode_pp=l.kode_pp and i.kode_lokasi=l.kode_lokasi "+
										  "     		    left outer join fa_klpakun m on i.kode_klpakun=m.kode_klpakun and i.kode_lokasi=m.kode_lokasi "+
										  "     		    left outer join fa_klp n on i.kode_klpfa=n.kode_klpfa and i.kode_lokasi=n.kode_lokasi "+
										  "                 left outer join (select x.kode_lokasi,x.no_fa,sum(x.nilai) as tot_susut "+
										  "                                  from fasusut_d x inner join fasusut_m y on x.no_fasusut=y.no_fasusut and x.kode_lokasi=y.kode_lokasi "+
										  "                                  where y.no_del='-' and y.kode_lokasi='"+this.cb_lokasi.getText()+"' group by x.kode_lokasi,x.no_fa) e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi "+
										  " where z.lokasi_tuj='"+this.app._lokasi+"' and z.no_kirim='"+this.cb_kirim.getText()+"' and z.no_terima='"+this.cb_bukti.getText()+"'");
					
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					this.sg1.clear();
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20),
						new Array(line.get("kode_klpfa2"),line.get("nama_klp2"),line.get("kode_klpakun2"),line.get("nama_klpakun2"),line.get("kode_pp2"),line.get("nama_pp2"),line.get("kode_lokfa2"),line.get("nama_lokfa2"),
						line.get("nik_pnj2"),line.get("nama_pnj2"),line.get("no_fabaru"),line.get("no_fa"),line.get("barcode"),line.get("nama"),line.get("merk"),line.get("tipe"),
						line.get("no_seri"),floatToNilai(parseFloat(line.get("nilai"))),
						floatToNilai(parseFloat(line.get("nb"))),line.get("kode_akun"),line.get("akun_deprs")));					
					}
				} 
			}			
			this.sg1.validasi();
			this.sg1.hideLoading();	
		}
	}catch(e)
	{
		alert("[ShowClick:"+e);
	}
};											  
window.app_saku_fa_transaksi_fFamutterimak.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{   
			this.standarLib.showListData(this, "Daftar Bukti Terima",this.cb_bukti,undefined, 
										  "select no_terima, keterangan from famutterima_m where periode<='"+this.ed_period.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_del='-' ",
										  "select count(no_terima)      from famutterima_m where periode<='"+this.ed_period.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_del='-' ",
										  new Array("no_terima","keterangan"),"and",new Array("No Bukti","Deskripsi"),false);
			this.standarLib.clearByTag(this, new Array("2"),undefined);
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
window.app_saku_fa_transaksi_fFamutterimak.prototype.doFindBtnClick = function(sender, col, row) 
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
window.app_saku_fa_transaksi_fFamutterimak.prototype.doNilaiChange = function()
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
window.app_saku_fa_transaksi_fFamutterimak.prototype.doRequestReady = function(sender, methodName, result)
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