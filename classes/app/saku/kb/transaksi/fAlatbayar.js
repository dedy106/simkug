window.app_saku_kb_transaksi_fAlatbayar = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_fAlatbayar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_fAlatbayar";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Alat Bayar : Input", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
	
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
		
        this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(56);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.setCaption("Jenis KB");
		this.cb_jenis.setText("");
		this.cb_jenis.addItem(0,"KAS");
		this.cb_jenis.addItem(1,"BANK");
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(78);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No KasBank");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(78);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(122);
		this.ed_dok.setWidth(230);
		this.ed_dok.setCaption("No Dok KB");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(260);
		this.cb_curr.setTop(122);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setText("IDR");
		this.cb_curr.setTag("9");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(455);
		this.ed_kurs.setTop(122);
		this.ed_kurs.setWidth(65);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("1"); 
		this.ed_kurs.setTag("9");
		this.ed_kurs.setReadOnly(true);
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(144);
		this.cb_akun.setWidth(185);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setReadOnly(true);
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setCaption("Rek. KasBank");
		this.cb_akun.setText(""); 
		this.cb_akun.setRightLabelCaption("");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(166);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);		
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
		
		this.cb_status = new portalui_saiCB(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(188);
		this.cb_status.setWidth(185);
		this.cb_status.setCaption("Jenis Dokumen");
		this.cb_status.setText("");
		this.cb_status.addItem(0,"ALL");
		this.cb_status.addItem(1,"SPB");
		this.cb_status.addItem(2,"SPP");
		this.cb_status.addItem(3,"PJR");
		this.cb_status.addItem(4,"PJ.PTG");
		this.cb_status.addItem(5,"PR.PTG");
		this.cb_status.addItem(6,"I/F");
		this.cb_status.addItem(7,"IF.PTG");
		this.cb_status.addItem(8,"DP.KRM");
		this.cb_status.addItem(9,"DEPO");
		this.cb_status.addItem(10,"A/P");
		this.cb_status.addItem(11,"KP.SPB");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(205);
		this.bShow.setTop(188);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_giro = new portalui_saiLabelEdit(this);
		this.ed_giro.setLeft(20);
		this.ed_giro.setTop(210);
		this.ed_giro.setWidth(230);
		this.ed_giro.setCaption("No BG / Cheque");
		this.ed_giro.setText(""); 
		this.ed_giro.setReadOnly(false);
		this.ed_giro.setLength(50);
		this.ed_giro.setTag("1");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(256);
		this.bPAll.setTop(210);
		this.bPAll.setCaption("APP All");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_cari = new portalui_saiLabelEdit(this);
		this.ed_cari.setLeft(340);
		this.ed_cari.setTop(210);
		this.ed_cari.setWidth(230);
		this.ed_cari.setCaption("Search by No Dok");
		this.ed_cari.setText(""); 
		this.ed_cari.setReadOnly(false);
		this.ed_cari.setLength(50);
		this.ed_cari.setTag("8");
		
		this.b_cari = new portalui_imageButton(this,{bound:[570,210,20,20],hint:"Cari",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doCariClick"]});
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(622);
		this.ed_nilai.setTop(188);
		this.ed_nilai.setWidth(298);
		this.ed_nilai.setLabelWidth(150);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Total KasBank");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(232);
	    this.p1.setWidth(900);
	    this.p1.setHeight(240);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Ref. Kas Bank Keluar');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(215);
		this.sg1.setColCount(14);
		this.sg1.setColTitle(["Status","Catatan","Modul","No Dokumen","PP","Tgl Dok.","Due Date","Deskripsi","Currency","Nilai","Permohonan","Peruntukan","Akun Temp","Penerima"]);
		this.sg1.setColWidth([13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,100,100,60,200,60,60,120,120,80,200,60]);
		this.sg1.setRowSelect(true);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setTitle("Status");
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "APP");
			val.set(2, "INPROG");
		this.sg1.columns.get(0).setPicklist(val);
    	this.sg1.columns.get(1).setReadOnly(false);
    	this.sg1.columns.get(2).setReadOnly(true);
    	this.sg1.columns.get(3).setReadOnly(true);
    	this.sg1.columns.get(4).setReadOnly(true);
    	this.sg1.columns.get(5).setReadOnly(true);
    	this.sg1.columns.get(6).setReadOnly(true);
    	this.sg1.columns.get(7).setReadOnly(true);
    	this.sg1.columns.get(8).setReadOnly(true);
		this.sg1.columns.get(9).setColumnFormat(window.cfNilai);
    	this.sg1.columns.get(9).setReadOnly(true);
    	this.sg1.columns.get(10).setReadOnly(true);
    	this.sg1.columns.get(11).setReadOnly(true);
    	this.sg1.columns.get(12).setReadOnly(true);
    	this.sg1.columns.get(13).setReadOnly(true);
		
		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(210);
		this.sgNav.setLeft(623);
		this.sgNav.setWidth(297);
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
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("util_addOnLib");
			this.addOnLib=new util_addOnLib();
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.cb_akun.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_status.onChange.set(this,"doEditChange");
			this.bShow.onClick.set(this, "showClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onChange.set(this, "doChangeCell");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sgNav.onPager.set(this, "doSelectedPage");
			
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.baris = this.app._baris;
			this.cb_pembuat.setText(this.app._userLog, this.app._namaUser);
			this.cb_pembuat.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp ='"+this.app._kodePP+"'",["nik","nama"]);
			this.akunkb = "";
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_fAlatbayar.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_fAlatbayar.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){
		//for (var i=0; i < this.sg1.rows.getLength(); i++)
		var line;
		for (var i in this.dataSPB.rs.rows){
			line = this.dataSPB.rs.rows[i];
			if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(line.tanggal)) && (line.status.toLowerCase() == "APP"))//this.sg1.getCell(5,i)
			{
				system.alert(this,"Tanggal kasbank kurang dari tanggal dokumen [baris "+i+"].","");
				return false;
			}
		}

		if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
		{
			system.alert(this,"Total KasBank tidak valid / tidak boleh nol.","");
			return false;
		}
		if  (this.akunkb == "" || this.akunkb == undefined)
		{
			system.alert(this,"Akun KasBank tidak valid.","Pilih kembali Rek KasBank");
			return false;
		}
		setTipeButton(tbAllFalse);
		this.bGen.click();
		if (this.standarLib.checkEmptyByTag(this, new Array("0","9")) && this.dataSPB)
		{
			try
			{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
				sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
						"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.akunkb+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+(this.app._pp.split(";"))[0]+"','KBO_ALB','"+this.cb_jenis.getText()+"','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pembuat.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_akun.getText()+"')");
						
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
							"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.akunkb+
							"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilai.getText())+",'"+(this.app._pp.split(";"))[0]+"','-','-',"+
							"'"+this.app._lokasi+"','KBO_ALB','KAS',"+
							"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
							
				var vtabel,vbukti = "",line, nobukti;
				for (var i in this.dataSPB.rs.rows)
				{					
					line = this.dataSPB.rs.rows[i];
					if (line.status.toLowerCase() == "app")
					{
						if ((line.modul.toLowerCase() == "kp.spb") ||(line.modul.toLowerCase()== "spb") || (line.modul.toLowerCase() == "spp") || (line.modul.toLowerCase() == "a/p"))
						{
							sql.add("update spb_m set progress='2' where no_spb='"+line.no_spb+"' and kode_lokasi='"+this.app._lokasi+"'");
							var jenis = 'BYMHD';
							nobukti = line.no_spb;
							if (line.modul.toLowerCase() == "spp")
							{
								var line2,data2 = this.dbLib.runSQL("select jenis from spb_m where no_spb = '"+line.no_spb+"' and kode_lokasi = '"+this.app._lokasi+"'");
								if (data2 instanceof portalui_arrayMap)
								{
									line2 = data2.get(0);
									if (line2 != undefined)
									{
										if (line2.get("jenis") == "PO_FINAL")
										{
											sql.add("update fa_asset a,fa_spb b, fa_app c set a.progress = '1' "+
													"where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_faapp=c.no_faapp and b.kode_lokasi=c.kode_lokasi "+
													"      and c.no_spb='"+line.no_spb+"' and c.kode_lokasi = '"+this.app._lokasi+"'");
										}
									}
								}
							}
						}
						
						if (line.modul.toLowerCase() == "pjr")
						{
							sql.add("update panjar_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_pj='"+(line.no_pj  || line.no_spb)+"' and kode_lokasi='"+this.app._lokasi+"'");
							var jenis = 'PJR';
							nobukti = line.no_pj || line.no_spb;
						}
						if (line.modul.toLowerCase() == "pj.ptg")
						{
							var jenis = 'PTG';
							sql.add("update ptg_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_ptg='"+(line.no_ptg || line.no_spb)+"' and kode_lokasi='"+this.app._lokasi+"'");
							nobukti = line.no_ptg || line.no_spb;
						}
						if (line.modul.toLowerCase() == "pr.ptg")
						{
							var jenis = 'PR.PTG';
							sql.add("update ptg_m set no_kas='"+this.ed_nb.getText()+"',progress='3' where no_ptg='"+(line.no_ptg || line.no_spb)+"' and kode_lokasi='"+this.app._lokasi+"'");
							nobukti = line.no_ptg || line.no_spb;
						}						
						if (line.modul.toLowerCase()== "i/f")
						{
							sql.add("update if_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_if='"+(line.no_if || line.no_spb)+"' and kode_lokasi='"+this.app._lokasi+"'");
							var jenis = 'IFD';
							nobukti = line.no_if || line.no_spb;
						}
						if (line.modul.toLowerCase() == "if.ptg")
						{
							sql.add("update ifptg_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_ifptg='"+(line.no_ifptg || line.no_spb)+"' and kode_lokasi='"+this.app._lokasi+"'");
							nobukti = line.no_ifptg || line.no_spb;
						}
						if (line.modul.toLowerCase() == "dp.krm")
						{
							sql.add("update dropkrm_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_kirim='"+(line.no_kirim || line.no_spb)+"' and kode_lokasi='"+this.app._lokasi+"'");
							nobukti = line.no_kirim || line.no_spb;
						}
						if (line.modul.toLowerCase() == "depo")
						{
							sql.add("update depo_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_depo='"+(line.no_depo || line.no_spb)+"' and kode_lokasi='"+this.app._lokasi+"'");
							nobukti = line.no_depo || line.no_spb;
						}
						
						if (  (line.modul.toLowerCase() == "pr.ptg") || (line.modul.toLowerCase() == "kp.spb") || (line.modul.toLowerCase() == "if.ptg") || (line.modul.toLowerCase() == "spb") || (line.modul.toLowerCase() == "pjr") || (line.modul.toLowerCase() == "i/f") || (line.modul.toLowerCase() == "depo") || (line.modul.toLowerCase() == "a/p") )
						{
							sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
									"('"+this.ed_nb.getText()+"','"+nobukti+"','"+this.dp_tgl1.getDate()+"',1,'"+line.kode_akun+
									"','"+line.catatan+"','D',"+line.nilai+",'"+(this.app._pp.split(";"))[0]+"','-','-',"+
									"'"+this.app._lokasi+"','KBO_ALB','"+jenis+"',"+
									"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
									",'"+this.app._userLog+"',now())");
						}
						if ((line.modul.toLowerCase() == "spp")||(line.modul.toLowerCase()  == "pj.ptg")||(line.modul.toLowerCase()  == "dp.krm"))
						{
							if (line.modul.toLowerCase() == "spp")    {vtabel = "spb_j";     vbukti = "no_spb";  };
							if (line.modul.toLowerCase() == "pj.ptg") {vtabel = "ptg_j";   vbukti = "no_ptg";};
							if (line.modul.toLowerCase() == "dp.krm") {vtabel = "dropkrm_j"; vbukti = "no_kirim";};
							
							sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
									"  select '"+this.ed_nb.getText()+"','"+nobukti+"','"+this.dp_tgl1.getDate()+"',no_urut+1,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-',"+
									"  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
									"  from "+vtabel+" where "+vbukti+"='"+nobukti+"' and kode_lokasi='"+this.app._lokasi+"' ");
						}
						
						sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
								"                 ('"+this.ed_nb.getText()+"','"+nobukti+"','"+line.modul+"','"+line.catatan+"','-','"+this.app._lokasi+"',"+line.nilai+")");
					
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
					this.standarLib.clearByTag(this, new Array("0","8"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(); this.sg1.appendRow();
					this.dataSPB = undefined;
					this.ed_nilai.setText('0');
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
	},
	pAllClick: function(sender){
		/*
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			this.sg1.setCell(0,i,"APP");
		}
		this.sg1.validasi();
		* */		
		if (this.dataSPB === undefined) return;
		var tot = 0;
		for (var i in this.dataSPB.rs.rows){
			this.dataSPB.rs.rows[i].status = "app";			
			tot += parseFloat(this.dataSPB.rs.rows[i].nilai);
		}		
		this.ed_nilai.setText(floatToNilai(tot));
	},
	doCariClick: function(sender){
		var nemu = false;
		for (var i=0; i < this.sg1.rows.getLength(); i++){
			if (this.sg1.cells(3,i) == this.ed_cari.getText()) {
				this.sg1.goToRow(i);
				nemu = true;
				break;
			}
		}
		if (!nemu){
			var line;
			if (this.dataSPB === undefined) return;
			for (var i in this.dataSPB.rs.rows){
				line = this.dataSPB.rs.rows[i];
				if (line.no_dokumen == this.ed_Cari.getText()){
					this.loadPage( Math.ceil(i) / this.baris);
					for (var i=0; i < this.sg1.rows.getLength(); i++){
						if (this.sg1.cells(3,i) == this.ed_cari.getText()) {
							this.sg1.goToRow(i);		
							break;
						}
					}
					break;
				}
			}
		}
	},
	doSelectedPage: function(sender, page){
		//this.dbLib.listData(this.scriptSql, page, this.baris);
		//this.dbLib.getDataProviderPageA(this.scriptSql, page, this.baris);
		this.loadPage(page);
	},
	showClick: function(sender){
		try
		{
			this.sg1.clear();
			this.sg1.validasi();
			if (this.sg1.getRowCount() == 0) this.sg1.appendRow();
			if ((this.cb_status.getText() != "") && (this.cb_curr.getText() != ""))
			{
				if (this.cb_status.getText() == "KP.SPB"){
					var pageCount = this.dbLib.getRowCount(" select count(no_spb) from spb_m "+
									 " where modul = 'KP.SPB' and kode_curr = '"+this.cb_curr.getText()+"' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",this.baris);
					this.scriptSql = " select 'INPROG' as status,f.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //nilai sudah include -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join kop_agg d on d.kode_agg=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=a.modul and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis in ('SIMP','SIMPDEPO','PBRGDEPO','PINJDEPO') and a.modul = '"+this.cb_status.getText()+"' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " union "+
									 " select 'INPROG' as status,f.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //nilai sudah include -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join kop_loker d on d.kode_loker=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=a.modul and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis = 'PINJ' and a.modul = '"+this.cb_status.getText()+"' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " union "+
									 " select 'INPROG' as status,f.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //nilai sudah include -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=a.modul and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis = 'PBRG' and a.modul = '"+this.cb_status.getText()+"' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+									 
									 " union "+
									 " select 'INPROG' as status,f.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //nilai sudah include -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=a.modul and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis in ('PINJ_AS','PINJ_TK') and a.modul = '"+this.cb_status.getText()+"' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " order by no_spb";
				}
				if ((this.cb_status.getText() == "SPB") || (this.cb_status.getText() == "SPP") || (this.cb_status.getText() == "A/P")){
					var pageCount = this.dbLib.getRowCount(" select count(no_spb) from spb_m "+
									 " where modul <> 'KP.SPB' and substring(modul,1,3) = '"+this.cb_status.getText()+"' and kode_curr = '"+this.cb_curr.getText()+"' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",this.baris);					
					this.scriptSql = " select 'INPROG' as status,f.catatan,substring(a.modul,1,3) as modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //nilai sudah include -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=substring(a.modul,1,3) and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis <> 'NPKO' and substring(a.modul,1,3) = '"+this.cb_status.getText()+"' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " union "+
									 " select 'INPROG' as status,f.catatan,substring(a.modul,1,3) as modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //nilai sudah include -a.nilai_pot
									 "        c.nama as pemohon, a.no_dokumen as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=substring(a.modul,1,3) and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis = 'NPKO' and substring(a.modul,1,3) = '"+this.cb_status.getText()+"' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+								 
									 " order by no_spb "; 
				}
				if (this.cb_status.getText() == "PJR")
				{
					var pageCount = this.dbLib.getRowCount(" select count(no_pj) from panjar_m "+
									 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",this.baris);					
					this.scriptSql = " select 'INPROG' as status,f.catatan,'PJR' as modul,a.no_pj,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai-a.nilai_pot as nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju "+
									 " from panjar_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_pj and f.modul=substring(a.modul,1,3) and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " order by a.no_pj";
				}
				if (this.cb_status.getText() == "PJ.PTG")
				{
					var pageCount = this.dbLib.getRowCount(" select count(no_ptg) from ptg_m "+
									 " where no_pj<>'PROYEK' and kode_curr = '"+this.cb_curr.getText()+"' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai_kas<0",this.baris);					
					this.scriptSql = " select 'INPROG' as status,f.catatan,'PJ.PTG' as modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
									 "        a.due_date,x.keterangan,x.kode_curr,abs(x.nilai_kas) as nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju "+
									 " from ptg_m x inner join panjar_m a on x.no_pj=a.no_pj and a.kode_lokasi=x.kode_lokasi "+
									 "              inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=x.no_ptg and f.modul='PJ.PTG' and f.no_del = '-' "+
									 " where x.no_pj<>'PROYEK' and x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='1' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai_kas<0 "+
									 " order by x.no_ptg";
				}
				if (this.cb_status.getText() == "PR.PTG")
				{
					var pageCount = this.dbLib.getRowCount(" select count(no_ptg) from ptg_m "+
									 " where no_pj='PROYEK' and kode_curr = '"+this.cb_curr.getText()+"' and progress='2' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai_kas<0",this.baris);					
					this.scriptSql = " select 'INPROG' as status,f.catatan,'PR.PTG' as modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
									 "        x.tanggal as due_date,x.keterangan,x.kode_curr,abs(x.nilai_kas) as nilai, "+
									 "        '-' as pemohon, '-' as peruntukan,x.akun_pj as kode_akun,'-' as nik_pengaju "+
									 " from ptg_m x " +
									 "              inner join ver_d f on f.no_bukti=x.no_ptg and f.modul='PR.PTG' and f.no_del = '-' "+									 
									 "              left join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
									 " where x.no_pj='PROYEK' and x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='2' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai_kas<0 "+
									 " order by x.no_ptg";
				}
				if (this.cb_status.getText() == "I/F")
				{
					var pageCount = this.dbLib.getRowCount(" select count(no_if) from if_m "+
									 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",this.baris);					
					this.scriptSql = " select 'INPROG' as status,f.catatan,'I/F' as modul,a.no_if,b.nama as nama_pp,a.tanggal,"+
									 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_if as kode_akun,a.nik_pengaju "+
									 " from if_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "             inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
									 "             inner join ver_d f on f.no_bukti=a.no_if and f.modul='I/F' and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " order by a.no_if";
				}
				if (this.cb_status.getText() == "IF.PTG")
				{
					var pageCount = this.dbLib.getRowCount(" select count(no_ifptg) from ifptg_m "+
									 " where kode_curr = '"+this.cb_curr.getText()+"' and status='REIMBURSE' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",this.baris);					
					this.scriptSql = " select 'INPROG' as status,f.catatan,'IF.PTG' as modul,a.no_ifptg,b.nama as nama_pp,a.tanggal,"+
									 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai_kas as nilai, "+
									 "        c.nama as pemohon, a.status as peruntukan,a.akun_ap as kode_akun,a.nik_buat "+
									 " from ifptg_m a "+
									 "                inner join if_m x on a.no_if=x.no_if and a.kode_lokasi=x.kode_lokasi "+
									 "				  inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
									 "                inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "                inner join ver_d f on f.no_bukti=a.no_ifptg and f.modul='IF.PTG' and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.status='REIMBURSE' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " order by a.no_ifptg";
				}
				if (this.cb_status.getText() == "DP.KRM")
				{
					var pageCount = this.dbLib.getRowCount(" select count(no_kirim) from dropkrm_m "+
									 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_del= '-'",this.baris);					
					this.scriptSql = " select 'INPROG' as status,f.catatan,'DP.KRM' as modul,a.no_kirim,'-' as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_buat "+
									 " from dropkrm_m a "+
									 "                  inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "                  inner join ver_d f on f.no_bukti=a.no_kirim and f.modul='DP.KRM' and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='-' "+
									 " order by a.no_kirim";
				}
				if (this.cb_status.getText() == "DEPO")
				{
					if (this.cb_akun.getText() == "") {
						system.alert(this,"Rekening KasBank harus dipilih dahulu.","Rek KB harus sesuai dengan dokumen bank sumber.");
						return false;
					}
					else
					{
						var pageCount = this.dbLib.getRowCount(" select count(no_depo) from depo_m "+
										 " where kode_bank='"+this.cb_akun.getText()+"' and modul = 'DEPO_P' and kode_curr = '"+this.cb_curr.getText()+"' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",this.baris);					
						this.scriptSql = " select 'INPROG' as status,f.catatan,'DEPO' as modul,a.no_depo,'-' as nama_pp,a.tanggal,"+
										 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
										 "        c.nama as pemohon, '-' as peruntukan,a.akun_depo as kode_akun,a.bank "+
										 " from depo_m a "+
										 "               inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
										 "               inner join ver_d f on f.no_bukti=a.no_depo and f.modul='DEPO' and f.no_del = '-' and f.status='APP' "+
										 " where a.kode_bank='"+this.cb_akun.getText()+"' and a.modul = 'DEPO_P' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
										 " order by a.no_depo";
					}
				}
						
				if (this.cb_status.getText() == "ALL")
				{
					var pageCount = this.dbLib.getRowCount("select count(z.no_bukti) from "+
									"(select a.no_spb as no_bukti "+
									" from spb_m a "+
									" where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									" union "+
									" select a.no_pj as no_bukti "+
									" from panjar_m a "+
									" where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									" union "+
									" select a.no_ptg as no_bukti "+
									" from ptg_m a "+
									" where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nilai_kas<0 "+
									" union "+
									" select a.no_if as no_bukti "+
									" from if_m a "+
									" where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									" union "+
									" select a.no_ifptg as no_bukti "+
									" from ifptg_m a "+
									" where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									" union "+
									" select a.no_kirim as no_bukti "+
									" from dropkrm_m a "+
									" where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									" union "+
									" select a.no_depo as no_bukti "+
									" from depo_m a "+
									" where a.kode_bank='"+this.cb_akun.getText()+"' and a.modul = 'DEPO_P' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									") z ",this.baris);
					
					this.scriptSql = " select 'INPROG' as status,f.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //nilai sudah include -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=a.modul and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis = 'PINJ' and a.modul = 'KP.SPB' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " union "+
									 " select 'INPROG' as status,f.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //nilai sudah include -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=a.modul and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis = 'PBRG' and a.modul = 'KP.SPB' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " union "+
									 " select 'INPROG' as status,f.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //field nilai sudah include -->  -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join kop_agg d on d.kode_agg=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=a.modul and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis in ('SIMP','SIMPDEPO') and a.modul = 'KP.SPB' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									 " union "+
									 " select 'INPROG' as status,f.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //field nilai sudah include -->  -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join kop_loker d on d.kode_loker=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=a.modul and f.no_del = '-' and f.status='APP' "+
									 " where a.jenis = 'PINJ' and a.modul = 'KP.SPB' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									 " union "+
									 " select 'INPROG' as status,f.catatan,substring(a.modul,1,3) as modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+ //field nilai sudah include -->  -a.nilai_pot
									 "        c.nama as pemohon, d.nama as peruntukan,a.akun_hutang as kode_akun,a.kode_terima "+
									 " from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_spb and f.modul=substring(a.modul,1,3) and f.no_del = '-' and f.status='APP' "+
									 " where a.modul <> 'KP.SPB' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									 " union "+
									 " select 'INPROG' as status,f.catatan,'PJR' as modul,a.no_pj,b.nama as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai-a.nilai_pot as nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju "+
									 " from panjar_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=a.no_pj and f.modul=substring(a.modul,1,3) and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"+
									 " union "+								 
									 " select 'INPROG' as status,f.catatan,'PJ.PTG' as modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
									 "        a.due_date,x.keterangan,x.kode_curr,abs(x.nilai_kas) as nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju "+
									 " from ptg_m x inner join panjar_m a on x.no_pj=a.no_pj and a.kode_lokasi=x.kode_lokasi "+
									 "              inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=x.no_ptg and f.modul='PJ.PTG' and f.no_del = '-' "+
									 " where x.no_pj <> 'PROYEK' and x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='1' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai_kas<0 "+								 
									 " union "+								 
									 " select 'INPROG' as status,f.catatan,'PR.PTG' as modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
									 "        x.tanggal as due_date,x.keterangan,x.kode_curr,abs(x.nilai_kas) as nilai, "+
									 "        '-' as pemohon, '-' as peruntukan,x.akun_pj as kode_akun,'-' as nik_pengaju "+
									 " from ptg_m x "+
									 "              inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
									 "              inner join ver_d f on f.no_bukti=x.no_ptg and f.modul='PR.PTG' and f.no_del = '-' "+
									 " where x.no_pj = 'PROYEK' and x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='2' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai_kas<0 "+								 
									 " union "+
									 " select 'INPROG' as status,f.catatan,'I/F' as modul,a.no_if,b.nama as nama_pp,a.tanggal,"+
									 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_if as kode_akun,a.nik_pengaju "+
									 " from if_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 "             inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
									 "             inner join ver_d f on f.no_bukti=a.no_if and f.modul='I/F' and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " union "+
									 " select 'INPROG' as status,f.catatan,'IF.PTG' as modul,a.no_ifptg,b.nama as nama_pp,a.tanggal,"+
									 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai_kas as nilai, "+
									 "        c.nama as pemohon, a.status as peruntukan,a.akun_ap as kode_akun,a.nik_buat "+
									 " from ifptg_m a "+
									 "                inner join if_m x on a.no_if=x.no_if and a.kode_lokasi=x.kode_lokasi "+
									 "				  inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
									 "                inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "                inner join ver_d f on f.no_bukti=a.no_ifptg and f.modul='IF.PTG' and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.status='REIMBURSE' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " union "+
									 " select 'INPROG' as status,f.catatan,'DP.KRM' as modul,a.no_kirim,'-' as nama_pp,a.tanggal,"+
									 "        a.due_date,a.keterangan,a.kode_curr,a.nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_buat "+
									 " from dropkrm_m a "+
									 "                  inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "                  inner join ver_d f on f.no_bukti=a.no_kirim and f.modul='DP.KRM' and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='-' "+
									 " union "+
									 " select 'INPROG' as status,f.catatan,'DEPO' as modul,a.no_depo,'-' as nama_pp,a.tanggal,"+
									 "        a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_depo as kode_akun,a.bank "+
									 " from depo_m a "+
									 "               inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 "               inner join ver_d f on f.no_bukti=a.no_depo and f.modul='DEPO' and f.no_del = '-' and f.status='APP' "+
									 " where a.kode_bank='"+this.cb_akun.getText()+"' and a.modul = 'DEPO_P' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='1' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 "order by modul";
				}	
				
				this.dbLib.getDataProviderA(this.scriptSql);//, 1, this.baris
			}			
		}catch (e)
		{
			alert(e);
		}
	},
	genClick: function(sender){
		try
		{
			if ((this.ed_period.getText() != "") && (this.jenis != undefined))
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_desc.setFocus();
			}
			else
			{
				system.alert(this,"Periode dan jenis kb harus valid.","");
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);
	},
	doEditChange: function(sender){
		if ((sender == this.cb_akun) && (this.cb_akun.getText() != ""))
		{
			this.akunkb = this.cb_akun.dataFromList[2];
		}
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
		}
		
		if (sender == this.cb_jenis)
		{
			this.ed_nb.setText("");
			if (this.cb_jenis.getText() == "KAS")
			{
				this.jenis = "BKK";
			}
			if (this.cb_jenis.getText() == "BANK")
			{
				this.jenis = "BBK";
			}
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
		
		if ((sender == this.cb_status) || (sender == this.cb_curr) || (sender == this.ed_period)) 
		{
			this.sg1.clear();
			this.sg1.appendRow();
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_akun) 
			{
				if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
					this.standarLib.showListData2(this, "Daftar Rekening Kas",this.cb_akun,undefined, 
											  "select distinct c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
											  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
				} else
					if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
						this.standarLib.showListData2(this, "Daftar Rekening Bank",this.cb_akun,undefined, 
											  "select  distinct c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
											  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
						
						/*this.standarLib.showListData(this, "Daftar Akun Bank",this.cb_akun,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);*/
				}
				this.sg1.clear(); this.sg1.appendRow();
			}
			if (sender == this.cb_curr) 
			{
				this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr, nama  from curr ",
											  "select count(kode_curr) from curr",
											  ["kode_curr","nama"],"where",["Kode Currency","Deskripsi"],false);
			}
			if (sender == this.cb_pembuat) 
			{   
				this.standarLib.showListData(this, "Daftar Petugas Cashier",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_pp ='"+this.app._kodePP+"'",
											  "select count(nik) from karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_pp ='"+this.app._kodePP+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);
			}
		}
		catch(e)
		{
			alert(e);
		}
	},
	doNilaiChange: function(){
		try
		{
			if (this.dataSPB === undefined) return;
			var tot = 0,line;		
			for (var i in this.dataSPB.rs.rows){
				line = this.dataSPB.rs.rows[i];
				if (line.status.toLowerCase() == "app")					
						tot += parseFloat(line.nilai);		
			}
			this.ed_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_kb_transaksi_fAlatbayar]::doNilaiChange:"+e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (this.dataSPB && col == 0){
			this.dataSPB.rs.rows[(this.page - 1) * this.baris + row].status = sender.cells(0,row);
		}
		this.sg1.validasi();
	},
	doCellExit: function(){
		
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
					setTipeButton(tbSimpan);
					if (result.toLowerCase().search("error") == -1)					
					{
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
					break;
				
					case "getDataProvider" :							
						eval("result = "+result);	
						this.dataSPB = result;					
						if (typeof result != "string"){
							this.sgNav.setTotalPage(Math.ceil(result.rs.rows.length / this.baris));
							this.sgNav.rearrange();
							this.sgNav.activePage = 0;	
							this.sgNav.setButtonStyle(3);							
							if (result.rs.rows[0]){
								this.loadPage(1);
							}else{
								system.info(this,"Data tidak ditemukan.","Jenis dokumen "+this.cb_status.getText()+" tidak ada yang siap dibayarkan.");
								this.sg1.appendRow();
								return false;
							}
						}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
						{
						  system.alert(this,result);
						}else 
						{ 
							system.info(this,"Data tidak ditemukan.","Jenis dokumen "+this.cb_status.getText()+" tidak ada yang siap dibayarkan.");
							this.sg1.appendRow();
							return false;
						}  
					break;
				}
			}
			catch(e)
			{
				alert("step : "+step+"; error = "+e);
			}
		}
	},
	loadPage: function(page){
		if (this.dataSPB === undefined) return;
		this.sg1.clear();
		var line,data;
		this.page = page;
		var start = (page - 1) * this.baris;
		var finish = start + this.baris;
		if (finish > this.dataSPB.rs.rows.length) finish = this.dataSPB.rs.rows.length;
		for (var i = start;i < finish;i++){
			line = this.dataSPB.rs.rows[i];								
			data = [];
			line.modul = line.modul.toUpperCase();
			line.status = line.status.toUpperCase();
			for (var c in line) {
				if (c == "nilai")
					data[data.length] = floatToNilai(Math.round(parseFloat(line[c])));			
				else if (c == "tanggal" || c == "due_date"){
					var dt=line[c].split(" ");
					var tgl=dt[0].split("-");
					data[data.length] = tgl[2]+"/"+tgl[1]+"/"+tgl[0];
				}else
					data[data.length] = line[c];									
			}
			this.sg1.appendData(data);
		}
	}
});

/*
 * try
			{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
				sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
						"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.akunkb+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+(this.app._pp.split(";"))[0]+"','KBO_ALB','"+this.cb_jenis.getText()+"','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pembuat.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_akun.getText()+"')");
						
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
							"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.akunkb+
							"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilai.getText())+",'"+(this.app._pp.split(";"))[0]+"','-','-',"+
							"'"+this.app._lokasi+"','KBO_ALB','KAS',"+
							"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
							
				var vtabel,vbukti = "";
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{					
					if (this.sg1.getCell(0,i) == "APP")
					{
						if ((this.sg1.getCell(2,i) == "KP.SPB") ||(this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "SPP") || (this.sg1.getCell(2,i) == "A/P"))
						{
							sql.add("update spb_m set progress='2' where no_spb='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							var jenis = 'BYMHD';
							
							if (this.sg1.getCell(2,i) == "SPP")
							{
								var line2,data2 = this.dbLib.runSQL("select jenis from spb_m where no_spb = '"+this.sg1.getCell(3,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
								if (data2 instanceof portalui_arrayMap)
								{
									line2 = data2.get(0);
									if (line2 != undefined)
									{
										if (line2.get("jenis") == "PO_FINAL")
										{
											sql.add("update fa_asset a,fa_spb b, fa_app c set a.progress = '1' "+
													"where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_faapp=c.no_faapp and b.kode_lokasi=c.kode_lokasi "+
													"      and c.no_spb='"+this.sg1.getCell(3,i)+"' and c.kode_lokasi = '"+this.app._lokasi+"'");
										}
									}
								}
							}
						}
						
						if (this.sg1.getCell(2,i) == "PJR")
						{
							sql.add("update panjar_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_pj='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							var jenis = 'PJR';
						}
						if (this.sg1.getCell(2,i) == "PJ.PTG")
						{
							sql.add("update ptg_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_ptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}					
						if (this.sg1.getCell(2,i) == "I/F")
						{
							sql.add("update if_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_if='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							var jenis = 'IFD';
						}
						if (this.sg1.getCell(2,i) == "IF.PTG")
						{
							sql.add("update ifptg_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(2,i) == "DP.KRM")
						{
							sql.add("update dropkrm_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_kirim='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(2,i) == "DEPO")
						{
							sql.add("update depo_m set no_kas='"+this.ed_nb.getText()+"',progress='2' where no_depo='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						
						if ((this.sg1.getCell(2,i) == "KP.SPB") || (this.sg1.getCell(2,i) == "IF.PTG") || (this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "PJR") || (this.sg1.getCell(2,i) == "I/F") || (this.sg1.getCell(2,i) == "DEPO") || (this.sg1.getCell(2,i) == "A/P") )
						{
							sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
									"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,'"+this.sg1.getCell(12,i)+
									"','"+this.sg1.getCell(1,i)+"','D',"+parseNilai(this.sg1.getCell(9,i))+",'"+(this.app._pp.split(";"))[0]+"','-','-',"+
									"'"+this.app._lokasi+"','KBO_ALB','"+jenis+"',"+
									"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
									",'"+this.app._userLog+"',now())");
						}
						if ((this.sg1.getCell(2,i) == "SPP")||(this.sg1.getCell(2,i) == "PJ.PTG")||(this.sg1.getCell(2,i) == "DP.KRM"))
						{
							if (this.sg1.getCell(2,i) == "SPP")    {vtabel = "spb_j";     vbukti = "no_spb";  };
							if (this.sg1.getCell(2,i) == "PJ.PTG") {vtabel = "ptg_j";   vbukti = "no_ptg";};
							if (this.sg1.getCell(2,i) == "DP.KRM") {vtabel = "dropkrm_j"; vbukti = "no_kirim";};
							
							sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
									"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',no_urut+1,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-',"+
									"  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
									"  from "+vtabel+" where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' ");
						}
						
						sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
								"                 ('"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(1,i)+"','-','"+this.app._lokasi+"',"+parseNilai(this.sg1.getCell(9,i))+")");
					
					}
				}
				
				this.dbLib.execArraySQL(sql);	
 */
