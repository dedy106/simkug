window.app_saku_logistik_transaksi_fPok = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fPok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fPok";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Form Purchase Order : Koreksi",0);
		
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
	
		/*
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(56);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No PO");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		uses("portalui_button");
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		*/
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(20);
		this.cb_bukti.setTop(56);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No PO Lama");
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(242);
		this.bShow.setTop(56);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		//uses("portalui_saiCBBL");
		//this.ed_dok = new portalui_saiCBBL(this);
		//this.ed_dok.setRightLabelVisible(false);
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(78);
		this.ed_dok.setWidth(310);
		this.ed_dok.setCaption("No Dok. Kontrak");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLabelWidth(100);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("2");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(122);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("2");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(122);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setReadOnly(true);
		
		this.cb_vendor = new portalui_saiCBBL(this);
		this.cb_vendor.setLeft(20);
		this.cb_vendor.setTop(144);
		this.cb_vendor.setWidth(185);
		this.cb_vendor.setCaption("Vendor");
		this.cb_vendor.setReadOnly(true);
		this.cb_vendor.setLabelWidth(100);
		this.cb_vendor.setRightLabelVisible(true);
		this.cb_vendor.setRightLabelCaption("");
		this.cb_vendor.setTag("2");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(166);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Penanggung Jawab");
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("2");
		
		this.lbltgl2 = new portalui_label(this);
		this.lbltgl2.setTop(188);
		this.lbltgl2.setLeft(20);
		this.lbltgl2.setWidth(101);		
		this.lbltgl2.setHeight(20);		
		this.lbltgl2.setCaption("Tanggal Mulai");
		this.lbltgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(190);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);
	
		this.lbltgl3 = new portalui_label(this);
		this.lbltgl3.setTop(188);
		this.lbltgl3.setLeft(250);
		this.lbltgl3.setWidth(101);		
		this.lbltgl3.setHeight(20);		
		this.lbltgl3.setCaption("Tanggal Selesai");
		this.lbltgl3.setUnderLine(true);
		
		this.dp_tgl3 = new portalui_datePicker(this);
		this.dp_tgl3.setTop(190);
		this.dp_tgl3.setLeft(350);
		this.dp_tgl3.setWidth(82);
		
		this.ed_spb = new portalui_saiLabelEdit(this);
		this.ed_spb.setLeft(680);
		this.ed_spb.setTop(122);
		this.ed_spb.setWidth(220);
		this.ed_spb.setTipeText(ttNilai);
		this.ed_spb.setAlignment(alRight);
		this.ed_spb.setCaption("Nilai SPP");
		this.ed_spb.setText("0"); 
		this.ed_spb.setReadOnly(true);
		this.ed_spb.setTag("2");
		
		this.ed_denda = new portalui_saiLabelEdit(this);
		this.ed_denda.setLeft(680);
		this.ed_denda.setTop(144);
		this.ed_denda.setWidth(220);
		this.ed_denda.setTipeText(ttNilai);
		this.ed_denda.setAlignment(alRight);
		this.ed_denda.setCaption("% Denda/1000");
		this.ed_denda.setText("0"); 
		this.ed_denda.setReadOnly(false);
		this.ed_denda.setTag("2");
		
		this.ed_ppn = new portalui_saiLabelEdit(this);
		this.ed_ppn.setLeft(680);
		this.ed_ppn.setTop(166);
		this.ed_ppn.setWidth(220);
		this.ed_ppn.setTipeText(ttNilai);
		this.ed_ppn.setAlignment(alRight);
		this.ed_ppn.setCaption("Nilai PPN");
		this.ed_ppn.setText("0"); 
		this.ed_ppn.setReadOnly(false);
		this.ed_ppn.setTag("2");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(680);
		this.ed_nilai.setTop(188);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai PO");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("2");
		
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
	    this.p1.setCaption('Daftar Item Barang');
		
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(210);
	    this.sg1.setColCount(14);
		this.sg1.setColTitle(["No PR","RKM","Kode Brg","Nama Barang","Satuan","Kode Akun","Qty","Harga","SubTotal","Kode PP","Kode RKM","Harga PR","Periode PR","Jml Terima"]);
		this.sg1.setColWidth([13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,60,100,60, 60,100,100,50,80,50,200,80,110,100]);	
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(0).setReadOnly(true);	
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(6).setReadOnly(true);	
		this.sg1.columns.get(6).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(7).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(8).setReadOnly(true);	
		this.sg1.columns.get(8).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(9).setReadOnly(true);	
		this.sg1.columns.get(10).setReadOnly(true);	
		this.sg1.columns.get(11).setReadOnly(true);	
		this.sg1.columns.get(11).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(12).setReadOnly(true);	
		this.sg1.columns.get(13).setReadOnly(true);	
		
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
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Periode","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			//this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.ed_nilai.onChange.set(this, "doEditChange");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_vendor.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			//this.ed_dok.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.standarLib.clearByTag(this, new Array("0","2","9"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			
			data = this.dbLib.runSQL("select value1 from spro where kode_spro = 'PPPNM' and kode_lokasi='"+this.app._lokasi+"'");
			var row = undefined;
			row = data.get(0);
			this.pppn = row.get("value1");
			this.ed_ppn.setText("0");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fPok.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fPok.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_transaksi_fPok.prototype.ubah = function()
{
	//this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","2")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			var strSql = " select no_pr from po_d "+
						 " where no_po = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and status='1'";
			var line,data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						sql.add(" delete from angg_r where no_bukti ='"+line.get("no_pr")+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'PO'");
					}
				} 
			}
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				//supaya data reverse, tidak ditarik lagi utk reverse kedua makanya pake 'r', gara2 no po nya tetep gak berubah...
				sql.add(" insert into angg_r (concat(no_bukti,'r') as no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
						"    select no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
						"    from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul ='PO' ");			
			}
			else
			{
				sql.add(" delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'PO'");													
			}
			
			sql.add(" update po_d set status = 'X' where no_po = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("update po_m set no_dokumen='"+this.ed_dok.getText()+"',keterangan='"+this.ed_desc.getText()+"',kode_curr='"+this.cb_curr.getText()+"',kurs="+parseNilai(this.ed_kurs.getText())+
			        ",kode_vendor='"+this.cb_vendor.getText()+"',nik_pnj='"+this.cb_pembuat.getText()+"',tanggal='"+this.dp_tgl1.getDate()+"',tgl_mulai='"+this.dp_tgl2.getDate()+"',tgl_selesai='"+this.dp_tgl3.getDate()+
					"',p_denda="+parseNilai(this.ed_denda.getText())+",nilai="+parseNilai(this.ed_nilai.getText())+",nilai_ppn="+parseNilai(this.ed_ppn.getText())+" where no_po = '"+this.cb_bukti.getText()+"' ");
					
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				var j = i+1;
				sql.add("insert into po_d (no_po,no_pr,no_urut,kode_brg,kode_lokasi,kode_sat,kode_akun,jumlah,nilai,status) values "+	
						"('"+this.cb_bukti.getText()+"','"+this.sg1.getCell(0,i)+"',"+j+",'"+this.sg1.getCell(2,i)+"','"+this.app._lokasi+"','"+
						this.sg1.getCell(4,i)+"','"+this.sg1.getCell(5,i)+"',"+parseNilai(this.sg1.getCell(6,i))+","+parseNilai(this.sg1.getCell(7,i))+",'1')");
			}
		
			//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
			var scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
			var baris1 = true;
			var line = undefined;
			var DC = "";
			for (var i in this.gridJurnal.objList)
			{
				if (!baris1) { scr1 += ",";}	
				line = this.gridJurnal.get(i);
				DC = "D";
				scr1 += "('"+this.cb_bukti.getText()+"','PO','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
				        "','"+line.get("periode")+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
				baris1 = false;
			}	
			var npr = 0;
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				if (!baris1) { scr1 += ",";}	
				DC = "C";
				npr = nilaiToFloat(this.sg1.getCell(11,i)) * nilaiToFloat(this.sg1.getCell(6,i));
				scr1 += "('"+this.sg1.getCell(0,i)+"','PO','"+this.app._lokasi+"','"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(9,i)+"','"+this.sg1.getCell(10,i)+
				        "','"+this.sg1.getCell(12,i)+"','"+this.ed_period.getText()+"','"+DC+"',0,"+npr+")";
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
window.app_saku_logistik_transaksi_fPok.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","2","9"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear();  this.sg1.appendRow();
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			}
			break;
			
		case "ubah" :
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				for (var j=i; j < this.sg1.rows.getLength(); j++)
				{
					if (((this.sg1.getCell(0,i)) == (this.sg1.getCell(0,j))) && ((this.sg1.getCell(2,i)) == (this.sg1.getCell(2,j))) && 
					   ((this.sg1.getCell(5,i)) == (this.sg1.getCell(5,j))) && (i != j) )
					{
						var a = i+1; var b = j+1;
						system.alert(this,"Data [PR, Akun dan Barang] tidak boleh duplikasi.","[baris "+b+" dan "+a+"]");
						return false;
					}
				}		
			}
			this.hitungGar();
			for (var i in this.gridJurnal.objList)
			{
				line = this.gridJurnal.get(i);
				if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
				{
					system.alert(this,"Nilai PO melebihi saldo anggaran.","Periksa kembali data anggaran.");
					return false;
				}
			}
			if ( (new Date()).strToDate(this.dp_tgl3.getDate())  < (new Date()).strToDate(this.dp_tgl2.getDate()))
			{
				system.alert(this,"Tanggal mulai tidak valid.","Tanggal selesai harus lebih besar dari tanggal mulai kontrak.");
				return false;
			}
			if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
			{
				system.alert(this,"Nilai PO tidak valid.","Nilai tidak boleh nol atau kurang");
				return false;
			}
			//sama dengan spb juga gak boleh,,,,tambah 0,1 saja kalo ada kasus ...karena finalisasi harus lewat spb yang mana nilai spb tidak boleh nol
			if  (nilaiToFloat(this.ed_spb.getText()) >= nilaiToFloat(this.ed_nilai.getText()))
			{
				system.alert(this,"Nilai PO tidak valid.","Nilai tidak boleh kurang dari nilai SPP");
				return false;
			}
			if  ((nilaiToFloat(this.ed_spb.getText()) > 0) && (this.cb_vendor.getText() != this.kdVendor))
			{
				system.alert(this,"Vendor tidak valid.","PO sudah pernah dibuat SPP untuk vendor lama.");
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
				if (this.progress != "0") 
				{
					system.alert(this,"PO tidak dapat dihapus.","Status PO sudah lebih dari verifikasi PO.");
					return false;
				}				
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				
				var strSql = " select no_pr from po_d "+
						     " where no_po = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and status='1'";
				var line,data = this.dbLib.runSQL(strSql);
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							sql.add(" delete from angg_r where no_bukti ='"+line.get("no_pr")+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'PO'");
						}
					} 
				}
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add(" update po_m set no_del = 'DEL' where no_po ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");					
					sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
					        "    select no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
							"    from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul ='PO' ");			
					sql.add(" update po_d set status = 'X' where no_po = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				else
				{
					sql.add(" delete from po_m where no_po ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'PO'");													
					sql.add(" delete from po_d where no_po ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				}		
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
			
			break;	
	}
};
/*
window.app_saku_logistik_transaksi_fPok.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'po_m','no_po',this.app._lokasi+"-PO"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
*/
window.app_saku_logistik_transaksi_fPok.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_logistik_transaksi_fPok.prototype.doEditChange = function(sender)
{

	/*
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	*/
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
	
	if (sender == this.ed_nilai)
	{
		if ((this.ed_nilai.getText() != "0") && (this.ed_nilai.getText() != undefined))
		{
			//var nppn = this.pppn / 100 * nilaiToFloat(this.ed_nilai.getText());
			//this.ed_ppn.setText(format_number(nppn,2,',','.')); 
			var nppn = Math.round(this.pppn / 100 * nilaiToFloat(this.ed_nilai.getText()));
			this.ed_ppn.setText(floatToNilai(nppn)); 
		} else
		{
			this.ed_ppn.setText("0");
		}
	}
};
window.app_saku_logistik_transaksi_fPok.prototype.showClick = function(sender)
{
	if (this.cb_bukti.getText() != "")
	{
		if (this.cb_bukti != undefined) {
			try 
			{
				this.standarLib.clearByTag(this, new Array("2"),undefined);				
				var line,data = this.dbLib.runSQL(" select  a.no_po, a.no_dokumen, a.keterangan, a.kode_curr, a.kurs, a.nik_pnj, a.kode_vendor, c.nama as nama_lokasi, b.nama as nama_pnj, "+
												  "         a.periode, a.tgl_mulai, a.tgl_selesai, a.p_denda,a.nilai,a.nilai_ppn,a.progress "+
												  " from po_m a inner join karyawan b on a.nik_pnj = b.nik and a.kode_lokasi = b.kode_lokasi "+
												  "             inner join vendor c on a.kode_vendor = c.kode_vendor and a.kode_lokasi = c.kode_lokasi "+
												  " where a.no_po='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						line = data.get(0);
						this.periodeLama = line.get("periode");
						this.kdVendor = line.get("kode_vendor");
						this.progress = line.get("progress");
						this.ed_dok.setText(line.get("no_dokumen"));
						this.ed_desc.setText(line.get("keterangan"));
						this.cb_curr.setText(line.get("kode_curr"));
						this.ed_kurs.setText(line.get("kurs"));
						this.cb_pembuat.setText(line.get("nik_pnj"));
						this.cb_pembuat.setRightLabelCaption(line.get("nama_pnj"));
						this.cb_vendor.setText(line.get("kode_vendor"));
						this.cb_vendor.setRightLabelCaption(line.get("nama_vendor"));
						this.ed_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));
						this.ed_ppn.setText(floatToNilai(parseFloat(line.get("nilai_ppn"))));
						this.ed_denda.setText(floatToNilai(parseFloat(line.get("p_denda"))));
						this.dp_tgl2.setText(line.get("tgl_mulai"));
						this.dp_tgl3.setText(line.get("tgl_selesai"));
					} 
				}				
				var line,data = this.dbLib.runSQL("select ifnull(sum(nilai+nilai_ppn-nilai_pot),0) as spb "+
										 " from spb_m a inner join spb_d b on a.kode_lokasi=b.kode_lokasi and a.no_spb=b.no_spb "+
										 " where b.no_bukti = '"+this.cb_bukti.getText()+"' and b.modul='PO' and a.no_del='-' ");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						line = data.get(0);
						this.ed_spb.setText(line.get("spb"));
					} 
				}
				
				this.sg1.clear(); 
				var strSql = " select a.no_pr, c.nama as nama_drk, a.kode_brg, d.nama as nama_brg,a.kode_sat,a.kode_akun,a.jumlah,a.nilai,(a.jumlah * a.nilai) as total,b.kode_pp, "+
				             " b.kode_drk,f.nilai as nilai_pr,b.periode,ifnull(e.terima,0) as terima "+
				             " from po_d a inner join pr_m b on a.no_pr=b.no_pr and a.kode_lokasi = b.kode_lokasi "+
							 "             inner join drk c on b.kode_drk=c.kode_drk and b.kode_lokasi = c.kode_lokasi and c.tahun = substring(b.periode,1,4) "+
							 "			   inner join barang_m d on a.kode_brg = d.kode_brg and a.kode_lokasi=d.kode_lokasi "+
							 "             inner join pr_d f on a.kode_brg = f.kode_brg and a.kode_akun = f.kode_akun and a.kode_lokasi=f.kode_lokasi and a.no_pr=f.no_pr and b.no_pr=f.no_pr "+
							 "             left outer join (select x.kode_brg,x.kode_lokasi,x.kode_akun,sum(x.jumlah) as terima "+
							 "                              from tr_d x inner join tr_m y on x.no_tr=y.no_tr and x.kode_lokasi=y.kode_lokasi and x.progress<>'X' "+
							 "                              where y.no_po = '"+this.cb_bukti.getText()+"' and y.no_del='-' "+
							 "                              group by x.kode_brg,x.kode_lokasi,x.kode_akun) e on e.kode_brg = a.kode_brg and a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
							 " where a.status = '1' and a.no_po = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				
				var data = this.dbLib.runSQL(strSql);
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13),
								new Array(line.get("no_pr"),line.get("nama_drk"),line.get("kode_brg"),line.get("nama_brg"),line.get("kode_sat"),
										  line.get("kode_akun"),line.get("jumlah"),line.get("nilai"),line.get("total"),line.get("kode_pp"),line.get("kode_drk"),
										  line.get("nilai_pr"),line.get("periode"),line.get("terima")));					
						}
						this.sg1.validasi();
					} 
				}
			} catch(e)
			{
				system.alert(this,e,"");
			}
		}
	}
};
window.app_saku_logistik_transaksi_fPok.prototype.FindBtnClick = function(sender, event)
{
	try
	{		
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar PO",this.cb_bukti,undefined, 
				  								 "select no_po, keterangan from po_m where periode<='"+this.ed_period.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' and progress not in ('1','9','F','J')",
												 "select count(no_po)      from po_m where periode<='"+this.ed_period.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' and progress not in ('1','9','F','J')",
												 new Array("no_po","keterangan"),"and", new Array("No PO","Keterangan"),false);
			}
			this.standarLib.clearByTag(this, new Array("2"),undefined);				
			this.sg1.clear(); this.sg1.appendRow();
		}
		/*
		if (sender == this.ed_dok) 
		{
			this.standarLib.showListData(this, "Daftar Dokumen Kontrak/SPK/PKS ",this.ed_dok,undefined, 
										  "select no_dokumen,keterangan from po_m where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.ed_period.getText()+"' and progress<> '0'",
										  "select count(no_dokumen) 	from po_m where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.ed_period.getText()+"' and progress<> '0'",
										  new Array("no_dokumen","keterangan"),"and",new Array("No Dokumen","Keterangan"),false);
		}*/
		if (sender == this.cb_vendor) 
		{
			this.standarLib.showListData(this, "Daftar Vendor",this.cb_vendor,undefined, 
										  "select kode_vendor,nama   from vendor where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("kode_vendor","nama"),"and",new Array("Kode Vendor","Nama Vendor"),false);
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr ",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"where",new Array("Kode Currency","Deskripsi"),false);
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Penanggung Jawab",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fPok.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 2 : 
					var line,data = this.dbLib.runSQL(" select a.kode_sat,a.kode_akun,a.jumlah,d.nilai,a.nilai as nilai_pr,b.kode_pp,b.kode_drk,b.periode,ifnull(e.terima,0) as terima "+
					                "from pr_d a inner join pr_m b on a.no_pr=b.no_pr and a.kode_lokasi=b.kode_lokasi "+
									"            inner join po_d c on a.no_pr=c.no_pr and a.kode_brg=c.kode_brg and a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									"            left outer join (select x.kode_brg,x.kode_lokasi,x.kode_akun,sum(x.jumlah) as terima "+
									"                              from tr_d x inner join tr_m y on x.no_tr=y.no_tr and x.kode_lokasi=y.kode_lokasi and x.progress<>'X' "+
									"                              where y.no_po = '"+this.cb_bukti.getText()+"' and y.no_del='-' "+
									"                              group by x.kode_brg,x.kode_lokasi,x.kode_akun) e on e.kode_brg = a.kode_brg and a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_brg='"+this.sg1.getCell(2,row)+"' and a.no_pr = '"+this.sg1.getCell(0,row)+"' ");
					if (data instanceof portalui_arrayMap)
					{
						line = data.get(0);
						if (line != undefined)
						{
							this.sg1.setCell(4,row,line.get("kode_sat"));
							this.sg1.setCell(5,row,line.get("kode_akun"));
							this.sg1.setCell(6,row,floatToNilai(parseFloat(line.get("jumlah"))));
							this.sg1.setCell(7,row,floatToNilai(parseFloat(line.get("nilai"))));
							this.sg1.setCell(8,row,"0");
							this.sg1.setCell(9,row,line.get("kode_pp"));
							this.sg1.setCell(10,row,line.get("kode_drk"));
							this.sg1.setCell(11,row,floatToNilai(parseFloat(line.get("nilai_pr"))));
							this.sg1.setCell(12,row,line.get("periode"));
							this.sg1.setCell(13,row,line.get("terima"));
						} 
					}				
				break;
				
			case 7 : 
					var total = nilaiToFloat(this.sg1.getCell(6,row)) * nilaiToFloat(this.sg1.getCell(7,row));
					this.sg1.setCell(8,row,floatToNilai(total));
					this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fPok] : doFindBtnClick : " + e);
	}
};
window.app_saku_logistik_transaksi_fPok.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				if ((this.sg1.getCell(13,row) == "0") || (this.sg1.getCell(13,row) == ""))
				{
					this.standarLib.showListDataForSG(this, "Daftar Purchase Request",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.no_pr,b.nama as nama_drk  from pr_m a inner join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi = b.kode_lokasi and b.tahun = substring(a.periode,1,4) where a.kode_lokasi = '"+this.app._lokasi+"' and progress = '1'",
												  "select count(a.no_pr)  	 		  from pr_m a inner join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi = b.kode_lokasi and b.tahun = substring(a.periode,1,4) where a.kode_lokasi = '"+this.app._lokasi+"' and progress = '1'",
												  new Array("no_pr","nama_drk"),"and",new Array("No PR","RKM"),false);
				}
				break;
			case 2 : 
				if ((this.sg1.getCell(13,row) == "0") || (this.sg1.getCell(13,row) == ""))
				{
					this.standarLib.showListDataForSG(this, "Daftar Barang PR",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_brg,b.nama from pr_d a "+
												  "                         inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi = b.kode_lokasi "+
												  "							left outer join po_d c on a.no_pr=c.no_pr and a.kode_brg=c.kode_brg and a.kode_lokasi = c.kode_lokasi and c.status='1'"+
												  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_pr = '"+this.sg1.getCell(0,row)+"' and c.no_po is null ",
												  "select count(a.kode_brg) from pr_d a "+
												  "                         inner join barang_m b on a.kode_barang=b.kode_barang and a.kode_lokasi = b.kode_lokasi "+
												  "							left outer join po_d c on a.no_pr=c.no_pr and a.kode_brg=c.kode_brg and a.kode_lokasi = c.kode_lokasi and c.status='1'"+
												  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_pr = '"+this.sg1.getCell(0,row)+"' and c.no_po is null ",
												  new Array("a.kode_brg","b.nama"),"and",new Array("Kode Barang","Nama"),false);
				}
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fPok] : doFindBtnClick : " + e);
	}
};
window.app_saku_logistik_transaksi_fPok.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(8,i) != "")
			{
				tot += nilaiToFloat(this.sg1.getCell(8,i));			
			}
		}
		this.ed_nilai.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fPok]::doNilaiChange:"+e);
	}
};
window.app_saku_logistik_transaksi_fPok.prototype.hitungGar = function()
{
	var row,dtJurnal = new portalui_arrayMap();
	var nemu = false;
	var ngar,nreal,ix,dtJrnl = 0;
	var periode = kdAkun = kdPP = kdDRK = "";
				
    for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		kdAkun = this.sg1.getCell(5,i);
		kdPP = this.sg1.getCell(9,i);
		kdDRK = this.sg1.getCell(10,i);
		periode = this.sg1.getCell(12,i);
		
		nreal = nilaiToFloat(this.sg1.getCell(8,i));		
		ngar = nilaiToFloat(this.sg1.getCell(11,i)) * nilaiToFloat(this.sg1.getCell(6,i));		
		nemu = false;
		ix = 0;
					
		for (var j in dtJurnal.objList)
		{		
		  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && 
		      (kdDRK == dtJurnal.get(j).get("kode_drk")) && (periode == dtJurnal.get(j).get("periode"))) 
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
			row.set("kode_drk",kdDRK);
			row.set("periode",periode);
			row.set("nilai",nreal);
			row.set("saldo_gar",ngar);
			dtJrnl++;
			dtJurnal.set(dtJrnl,row);						
		}else {
			dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			dtJurnal.get(ix).set("saldo_gar",row.get("saldo_gar") + ngar);				
		}
	}
	
	if (dtJurnal.getLength() > 0){
		var desc1 = new portalui_arrayMap();
		desc1.set("kode_akun",125);
		desc1.set("kode_pp",125);
		desc1.set("kode_drk",125);
		desc1.set("periode",75);
		desc1.set("nilai",150);
		desc1.set("saldo_gar",150);
		
		var desc2 = new portalui_arrayMap();
		desc2.set("kode_akun","S");
		desc2.set("kode_pp","S");
		desc2.set("kode_drk","S");	
		desc2.set("periode","S");	
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
		var baris,data = this.dbLib.runSQL("select fn_cekagg3('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+line.get("periode")+"','"+this.cb_bukti.getText()+"') as gar ");
		if (data instanceof portalui_arrayMap)
		{
			baris = data.get(0);
			if (baris != undefined)
			{
				baris = baris.get("gar");
				data = baris.split(";");
				sls = parseFloat(line.get("saldo_gar")) + parseFloat(data[0]) - parseFloat(data[1]);
				line.set("saldo_gar",sls);
				this.gridJurnal.set(i,line);		
			} 
		} else alert(data);
	}	
};
window.app_saku_logistik_transaksi_fPok.prototype.garClick = function(sender)
{
	try
	{
		if (this.ed_nilai.getText() != "0")
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
};
window.app_saku_logistik_transaksi_fPok.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.cb_bukti.getText()+")");
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