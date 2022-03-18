window.app_saku_kb_transaksi_fVerspbk = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_fVerspbk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_fVerspbk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Dokumen KasBank Keluar: Koreksi", 0);
		
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
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(56);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Verifikasi");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(680);
		this.cb_perlama.setTop(34);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(56);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Verifikasi Lama");
		this.cb_bukti.setRightLabelCaption("");
		
		this.bLoad = new portalui_imageButton(this);
		this.bLoad.setLeft(902);
		this.bLoad.setTop(56);
		this.bLoad.setHint("Load Data");
		this.bLoad.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bLoad.setWidth(22);
		this.bLoad.setHeight(22);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(78);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("1");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(100);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);		
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("1");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(122);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);		
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("1");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(546);
		this.bPAll.setTop(122);
		this.bPAll.setCaption("INPROG");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(144);
	    this.p1.setWidth(900);
	    this.p1.setHeight(310);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Ref. Kas Bank Keluar');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(150);
		this.sg1.setColCount(15);
		this.sg1.setColTitle(["Status","Catatan","Modul","No Dokumen","PP","Tgl Dok.","Due Date","Deskripsi","Currency","Nilai","Permohonan","Peruntukan","Nilai Lain","No Del","Progress"]);
		this.sg1.setColWidth([14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,80,80,100,100,100,60,250,60,60,120,120,80,200,60]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
			val.set(1, "INPROG");
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
		this.sg1.columns.get(12).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(12).setReadOnly(true);	
		this.sg1.columns.get(13).setReadOnly(true);
		
		uses("portalui_saiTable");	
		this.sg2 = new portalui_saiTable(this.p1);
    	this.sg2.setLeft(1);
		this.sg2.setTop(170);
    	this.sg2.setWidth(895);
    	this.sg2.setHeight(135);
		this.sg2.setTag("2");
		this.sg2.setColTitle(["No","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"]);
		
		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(120);
		this.sgNav.setLeft(623);
		this.sgNav.setWidth(297);
		this.sgNav.setGrid(this.sg);
		this.sgNav.setBorder(0);
		this.sgNav.setButtonStyle(3);
		
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
			this.addOnLib=new util_addOnLib();
			
			var val = this.dbLib.loadQuery("select periode from periode where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.app._periode.substr(0,4)+"%' "+
				"union "+
				"select distinct periode from ver_m where kode_lokasi = '"+this.app._lokasi+"' and periode > '"+this.app._periode+"'");
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
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onChange.set(this, "doEditChange");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.bLoad.onClick.set(this, "loadClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onDblClick.set(this,"sg1ondblclick");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.bGen.onClick.set(this, "genClick");
			
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow(); this.sg2.clearAll();
			this.baris = this.app._baris;
			this.cb_setuju.setSQL("select nik, nama from karyawan  where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
			this.cb_pembuat.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_fVerspbk.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_fVerspbk.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_fVerspbk.prototype.ubah = function()
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
				sql.add(" update ver_m set no_del = 'DEL' where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" update ver_d set status = 'DEL' where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add(" delete from ver_m where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from ver_d where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				this.nb = this.cb_bukti.getText();
			}
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if ((this.sg1.getCell(2,i) == "KP.SPB") || (this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "SPP") || (this.sg1.getCell(2,i) == "A/P"))
				{
					sql.add("update spb_m set progress='0' where no_spb='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
				if (this.sg1.getCell(2,i) == "PJR")
				{
					sql.add("update panjar_m set progress='0' where no_pj='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
				if (this.sg1.getCell(2,i) == "PJ.PTG")
				{
					sql.add("update ptg_m set progress='0' where no_ptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
				if (this.sg1.getCell(2,i) == "I/F")
				{
					sql.add("update if_m set progress='0' where no_if='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
				if (this.sg1.getCell(2,i) == "IF.PTG")
				{
					sql.add("update ifptg_m set progress='0' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
				if (this.sg1.getCell(2,i) == "DP.KRM")
				{
					sql.add("update dropkrm_m set progress='0' where no_kirim='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
				if (this.sg1.getCell(2,i) == "DEPO")
				{
					sql.add("update depo_m set progress='0' where no_depo='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
				}
			}
								
			sql.add("insert into ver_m (no_ver,kode_lokasi,keterangan,tanggal,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,nilai) values "+
					"       ('"+this.nb+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"','"+
							this.modul+"','"+this.ed_period.getText()+"','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
							"','"+this.app._userLog+"',now(),0)");
												
			
			var progress = "";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i) != "INPROG")
				{
					sql.add("insert into ver_d (no_ver,modul,no_bukti,status,catatan,no_del,kode_lokasi) values "+
							"('"+this.nb+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(1,i)+"','-','"+this.app._lokasi+"')");
			
					if ((this.sg1.getCell(2,i) == "KP.SPB") || (this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "SPP") || (this.sg1.getCell(2,i) == "A/P"))
					{
						if (this.sg1.getCell(0,i) == "APP")
						{
							if (this.sg1.getCell(14,i) == "1") progress = '1'; else progress = this.sg1.getCell(14,i);
							sql.add("update spb_m set progress='"+progress+"' where no_spb='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(0,i) == "NONAPP")
						{
							sql.add("update spb_m set progress='X' where no_spb='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}	
					if (this.sg1.getCell(2,i) == "PJR")
					{
						if (this.sg1.getCell(0,i) == "APP")
						{
							if (this.sg1.getCell(14,i) == "1") progress = '1'; else progress = this.sg1.getCell(14,i);
							sql.add("update panjar_m set progress='"+progress+"' where no_pj='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(0,i) == "NONAPP")
						{
							sql.add("update panjar_m set progress='X' where no_pj='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
					if (this.sg1.getCell(2,i) == "PJ.PTG")  
					{
						if (this.sg1.getCell(0,i) == "APP")
						{
							if (this.sg1.getCell(11,i) == "CLOSING"){//nilaiToFloat(this.sg1.getCell(9,i)) == nilaiToFloat(this.sg1.getCell(12,i))
								 progress = "2";
							} else { progress = "1";}
							// cek dah ada kasbank belum...ato posisi 2 memang gr2 dah close???
							sql.add("update ptg_m set progress='"+progress+"' where no_ptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(0,i) == "NONAPP")
						{
							sql.add("update ptg_m set progress='X' where no_ptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
					if (this.sg1.getCell(2,i) == "I/F")
					{
						if (this.sg1.getCell(0,i) == "APP")
						{
							if (this.sg1.getCell(14,i) == "1") progress = '1'; else progress = this.sg1.getCell(14,i);
							sql.add("update if_m set progress='"+progress+"' where no_if='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(0,i) == "NONAPP")
						{
							sql.add("update if_m set progress='X' where no_if='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
					if (this.sg1.getCell(2,i) == "IF.PTG") 
					{
						if (this.sg1.getCell(0,i) == "APP")
						{
							if (this.sg1.getCell(11,i) == "CLOSING"){ //((nilaiToFloat(this.sg1.getCell(9,i)) == nilaiToFloat(this.sg1.getCell(12,i))) && 
								var progress = "2";
							} else { var progress = "1"; }
							sql.add("update ifptg_m set progress='"+progress+"' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(0,i) == "NONAPP")
						{
							sql.add("update ifptg_m set progress='X' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
					if (this.sg1.getCell(2,i) == "DP.KRM")
					{
						if (this.sg1.getCell(0,i) == "APP")
						{
							if (this.sg1.getCell(14,i) == "1") progress = '1'; else progress = this.sg1.getCell(14,i);
							sql.add("update dropkrm_m set progress='"+progress+"' where no_kirim='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(0,i) == "NONAPP")
						{
							sql.add("update dropkrm_m set progress='X' where no_kirim='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
					if (this.sg1.getCell(2,i) == "DEPO")
					{
						if (this.sg1.getCell(0,i) == "APP")
						{
							if (this.sg1.getCell(14,i) == "1") progress = '1'; else progress = this.sg1.getCell(14,i);
							sql.add("update depo_m set progress='"+progress+"' where no_depo='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg1.getCell(0,i) == "NONAPP")
						{
							sql.add("update depo_m set progress='X' where no_depo='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
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
window.app_saku_kb_transaksi_fVerspbk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
				this.sg2.clearAll();
			}
			break;
		case "ubah" :		
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i).toUpperCase() == "INPROG")
				{
					if (this.sg1.getCell(13,i) != "-")
					{
						system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah dihapus.","Approval tidak dapat diubah.");
						return false;
					}
					if ((this.sg1.getCell(14,i) != "1") && (this.sg1.getCell(14,i) != "X"))
					{
						if (! (((this.sg1.getCell(2,i) == "PJ.PTG") && (nilaiToFloat(this.sg1.getCell(9,i)) == nilaiToFloat(this.sg1.getCell(12,i)))) || ((this.sg1.getCell(2,i) == "IF.PTG") && (this.sg1.getCell(11,i) == "CLOSING"))) )//ifptg = nilaiToFloat(this.sg1.getCell(9,i)) == nilaiToFloat(this.sg1.getCell(12,i))
						{
							system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah berubah progress.","Approval tidak dapat diubah.");
							return false;
						}
						if (! ((this.sg1.getCell(2,i) == "PR.PTG") && (nilaiToFloat(this.sg1.getCell(12,i))==0)))
						{
							system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah berubah progress.","Approval tidak dapat diubah.");
							return false;
						}
					}
					if (((this.sg1.getCell(14,i) == "2") && (this.sg1.getCell(2,i) == "PJ.PTG")) || ((this.sg1.getCell(14,i) == "3") && (this.sg1.getCell(2,i) == "PR.PTG")))
					{
						var line,data = this.dbLib.runSQL("select posted from ptg_m where no_ptg= '"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
						if (data instanceof portalui_arrayMap)
						{
							line = data.get(0);
							if (line != undefined)
							{
								if (line.get("posted") == "T")
								{
									system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah diposting.","Unposting dahulu untuk membatalkan verifikasinya.");
									return false;
								}
							} 
						}
					}
					if ((this.sg1.getCell(14,i) == "2") && (this.sg1.getCell(2,i) == "IF.PTG"))
					{
						var line,data = this.dbLib.runSQL("select posted from ifptg_m where no_ifptg= '"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
						if (data instanceof portalui_arrayMap)
						{
							line = data.get(0);
							if (line != undefined)
							{
								if (line.get("posted") == "T")
								{
									system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah diposting.","Unposting dahulu untuk membatalkan verifikasinya.");
									return false;
								}
							} 
						}
					}
					if ((this.sg1.getCell(14,i) == "1") && (this.sg1.getCell(2,i) == "A/P"))
					{
						var line,data = this.dbLib.runSQL("select posted from spb_m where no_spb= '"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
						if (data instanceof portalui_arrayMap)
						{
							line = data.get(0);
							if (line != undefined)
							{
								if (line.get("posted") == "T")
								{
									system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah diposting.","Unposting dahulu untuk membatalkan verifikasinya.");
									return false;
								}
							} 
						}
					}
				}
			}
			
			var cekData = "F";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.sg1.getCell(5,i))) && ((this.sg1.getCell(0,i) == "APP") || (this.sg1.getCell(0,i) == "NONAPP")) )
				{
					system.alert(this,"Tanggal verifikasi kurang dari tanggal dokumen [baris "+i+"].","");
					return false;
				}
				if ((this.sg1.getCell(0,i) == "APP") || (this.sg1.getCell(0,i) == "NONAPP"))
				cekData = "T";
			}
			if (cekData == "F")
			{
				system.alert(this,"Tidak ada transaksi yang diverifikasi.","Pilih APP atau NON APP untuk memverifikasi di kolom status.");
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
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if (this.sg1.getCell(13,i) != "-")
					{
						system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah dihapus.","Approval tidak dapat diubah.");
						return false;
					}	
					if ((this.sg1.getCell(14,i) != "1") && (this.sg1.getCell(14,i) != "X"))
					{
						if (! (((this.sg1.getCell(2,i) == "PJ.PTG") && (nilaiToFloat(this.sg1.getCell(9,i)) == nilaiToFloat(this.sg1.getCell(12,i)))) || ((this.sg1.getCell(2,i) == "IF.PTG") && (nilaiToFloat(this.sg1.getCell(9,i)) == nilaiToFloat(this.sg1.getCell(12,i))))) )
						{
							system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah berubah progress.","Approval tidak dapat diubah.");
							return false;
						}
						if (! (((this.sg1.getCell(2,i) == "PR.PTG") && (nilaiToFloat(this.sg1.getCell(12,i))==0)) ) )
						{
							system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah berubah progress.","Approval tidak dapat diubah.");
							return false;
						}
						
						
					}
					if (((this.sg1.getCell(14,i) == "2") && (this.sg1.getCell(2,i) == "PJ.PTG"))  || ((this.sg1.getCell(14,i) == "3") && (this.sg1.getCell(2,i) == "PR.PTG")))
					{
						var line,data = this.dbLib.runSQL("select posted from ptg_m where no_ptg= '"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
						if (data instanceof portalui_arrayMap)
						{
							line = data.get(0);
							if (line != undefined)
							{
								if (line.get("posted") == "T")
								{
									system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah diposting.","Unposting dahulu untuk membatalkan verifikasinya.");
									return false;
								}
							} 
						}
					}
					if ((this.sg1.getCell(14,i) == "2") && (this.sg1.getCell(2,i) == "IF.PTG"))
					{
						var line,data = this.dbLib.runSQL("select posted from ifptg_m where no_ifptg= '"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
						if (data instanceof portalui_arrayMap)
						{
							line = data.get(0);
							if (line != undefined)
							{
								if (line.get("posted") == "T")
								{
									system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah diposting.","Unposting dahulu untuk membatalkan verifikasinya.");
									return false;
								}
							} 
						}
					}
					if ((this.sg1.getCell(14,i) == "1") && (this.sg1.getCell(2,i) == "A/P"))
					{
						var line,data = this.dbLib.runSQL("select posted from spb_m where no_spb= '"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
						if (data instanceof portalui_arrayMap)
						{
							line = data.get(0);
							if (line != undefined)
							{
								if (line.get("posted") == "T")
								{
									system.alert(this,"Status transaksi bukti : "+this.sg1.getCell(3,i)+" sudah diposting.","Unposting dahulu untuk membatalkan verifikasinya.");
									return false;
								}
							} 
						}
					}
				}
				
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	

				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add(" update ver_m set no_del = 'DEL' where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" update ver_d set status = 'DEL' where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}else{
					sql.add(" delete from ver_m where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from ver_d where no_ver ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if ((this.sg1.getCell(2,i) == "KP.SPB") || (this.sg1.getCell(2,i) == "SPB") || (this.sg1.getCell(2,i) == "SPP") || (this.sg1.getCell(2,i) == "A/P"))
					{
						sql.add("update spb_m set progress='0' where no_spb='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "PJR")
					{
						sql.add("update panjar_m set progress='0' where no_pj='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "PJ.PTG" || this.sg1.getCell(2,i) == "PR.PTG" )
					{
						sql.add("update ptg_m set progress='0' where no_ptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "I/F")
					{
						sql.add("update if_m set progress='0' where no_if='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "IF.PTG")
					{
						sql.add("update ifptg_m set progress='0' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "DP.KRM")
					{
						sql.add("update dropkrm_m set progress='0' where no_kirim='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg1.getCell(2,i) == "DEPO")
					{
						sql.add("update depo_m set progress='0' where no_depo='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}						
				}
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;			
	}
};
window.app_saku_kb_transaksi_fVerspbk.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"INPROG");
	}
};
window.app_saku_kb_transaksi_fVerspbk.prototype.doSelectedPage = function(sender, page)
{
	this.dbLib.listData(this.scriptSql, page, this.baris);
};
window.app_saku_kb_transaksi_fVerspbk.prototype.loadClick = function(sender)
{
	try
	{
		var line,data = this.dbLib.runSQL("select a.modul,a.periode,a.keterangan,a.nik_buat,a.nik_app,b.nama as nama_buat,c.nama as nama_app,a.tanggal  "+
		                                  "from ver_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi=b.kode_lokasi "+
										  "             inner join karyawan c on a.nik_app = c.nik and a.kode_lokasi=c.kode_lokasi "+
										  "where a.no_ver='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.modul = line.get("modul");
				this.periodeLama = line.get("periode");
				this.dp_tgl1.setText(line.get("tanggal"));
				this.ed_desc.setText(line.get("keterangan"));
				this.cb_pembuat.setText(line.get("nik_buat"));
				this.cb_pembuat.setRightLabelCaption(line.get("nama_buat"));
				this.cb_setuju.setText(line.get("nik_app"));
				this.cb_setuju.setRightLabelCaption(line.get("nama_app"));
			} 
		}
		
		this.sg1.clear();
		this.sg1.appendRow();
		this.sg2.clearAll();
		
		if (this.modul != "")
		{
			if (this.modul == "KP.SPB") {
				var pageCount = this.dbLib.getRowCount("select count(a.no_spb) "+
								"from spb_m a inner join ver_d x on x.no_bukti=a.no_spb and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.modul = 'KP.SPB' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);																
				this.scriptSql= "select x.status,x.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								"       a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+
								"       c.nama as pemohon, d.nama as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"             inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								"             inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								"             inner join ver_d x on x.no_bukti=a.no_spb and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.jenis in ('PINJ_AS','PINJ_TK') and a.modul = 'KP.SPB' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' "+
								"union "+
							    "select x.status,x.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								"       a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+
								"       c.nama as pemohon, d.nama as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"             inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								"             inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								"             inner join ver_d x on x.no_bukti=a.no_spb and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.jenis = 'PBRG' and a.modul = 'KP.SPB' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' "+
								"union "+
								"select x.status,x.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								"       a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+
								"       c.nama as pemohon, d.nama as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"             inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								"             inner join kop_loker d on d.kode_loker=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								"             inner join ver_d x on x.no_bukti=a.no_spb and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.jenis = 'PINJ' and a.modul = 'KP.SPB' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' "+
								"union "+
								"select x.status,x.catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								"       a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+
								"       c.nama as pemohon, d.nama as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"             inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								"             inner join kop_agg d on d.kode_agg=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								"             inner join ver_d x on x.no_bukti=a.no_spb and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.jenis in ('SIMP','SIMPDEPO','PBRGDEPO','PINJDEPO') and a.modul = 'KP.SPB' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' ";								
			}
			if ((this.modul == "SPB") || (this.modul == "SPP") || (this.modul == "A/P")){
				var pageCount = this.dbLib.getRowCount("select count(a.no_spb) "+
								"from spb_m a inner join ver_d x on x.no_bukti=a.no_spb and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.modul <> 'KP.SPB' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);
																
				this.scriptSql = "select x.status,x.catatan,substring(a.modul,1,3) as modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								"       a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+
								"       c.nama as pemohon, d.nama as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"             inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								"             inner join vendor d on d.kode_vendor=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
								"             inner join ver_d x on x.no_bukti=a.no_spb and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.jenis <> 'NPKO' and a.modul <> 'KP.SPB' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' "+
								"union "+
								"select x.status,x.catatan,substring(a.modul,1,3) as modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
								"       a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+
								"       c.nama as pemohon, a.no_dokumen as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"             inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								"             inner join ver_d x on x.no_bukti=a.no_spb and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.jenis = 'NPKO' and a.modul <> 'KP.SPB' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' ";
			}
			if (this.modul == "PJR")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_pj) "+
								"from panjar_m a inner join ver_d x on x.no_bukti=a.no_pj and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				this.scriptSql = "select x.status,x.catatan,'PJR' as modul,a.no_pj,b.nama as nama_pp,a.tanggal,"+
								"       a.due_date,a.keterangan,a.kode_curr,a.nilai-a.nilai_pot as nilai, "+
								"       c.nama as pemohon, '-' as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from panjar_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"                inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								"                inner join ver_d x on x.no_bukti=a.no_pj and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver ='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
			}
			if (this.modul == "PJ.PTG")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_ptg) "+
								"from ptg_m a inner join ver_d x on x.no_bukti=a.no_ptg and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.no_pj<>'PROYEK' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				this.scriptSql = "select x.status,x.catatan,'PJ.PTG' as modul,a.no_ptg,b.nama as nama_pp,a.tanggal,"+
								"       d.due_date,a.keterangan,a.kode_curr,a.nilai, "+
								"       c.nama as pemohon, '-' as peruntukan, d.nilai as nilai_lain,a.no_del,a.progress "+
								"from ptg_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"             inner join panjar_m d on d.no_pj = a.no_pj and a.kode_lokasi=d.kode_lokasi "+
								"             inner join karyawan c on c.nik=d.nik_pengaju and c.kode_lokasi=d.kode_lokasi "+
								"             inner join ver_d x on x.no_bukti=a.no_ptg and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.no_pj<>'PROYEK' and x.no_ver ='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
			}
			if (this.modul == "PR.PTG")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_ptg) "+
								"from ptg_m a inner join ver_d x on x.no_bukti=a.no_ptg and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.no_pj='PROYEK' and x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);
				this.scriptSql = "select x.status,x.catatan,'PR.PTG' as modul,a.no_ptg,b.nama as nama_pp,a.tanggal,"+
								"       a.tanggal  as due_date,a.keterangan,a.kode_curr,a.nilai, "+
								"       '-' as pemohon, '-' as peruntukan, a.nilai_kas as nilai_lain,a.no_del,a.progress "+
								"from ptg_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"             inner join ver_d x on x.no_bukti=a.no_ptg and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where a.no_pj=PROYEK' and x.no_ver ='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
			}
			if (this.modul == "I/F")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_if) "+
								"from if_m a inner join ver_d x on x.no_bukti=a.no_if and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);								
				this.scriptSql = "select x.status,x.catatan,'I/F' as modul,a.no_if,b.nama as nama_pp,a.tanggal,"+
								"       a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
								"       c.nama as pemohon, '-' as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from if_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"            inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								"            inner join ver_d x on x.no_bukti=a.no_if and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver ='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
			}
			if (this.modul == "IF.PTG")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_ifptg) "+
								"from ifptg_m a inner join ver_d x on x.no_bukti=a.no_ifptg and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);								
				this.scriptSql = "select x.status,x.catatan,'IF.PTG' as modul,a.no_ifptg,b.nama as nama_pp,a.tanggal,"+
								"       a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								"       c.nama as pemohon, a.status as peruntukan, d.nilai as nilai_lain,a.no_del,a.progress "+
								"from ifptg_m a "+
								"               inner join if_m d on d.no_if = a.no_if and a.kode_lokasi=d.kode_lokasi "+
								"				inner join pp b on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
								"               inner join karyawan c on c.nik=d.nik_pengaju and c.kode_lokasi=d.kode_lokasi "+
								"               inner join ver_d x on x.no_bukti=a.no_ifptg and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver ='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
			}
			if (this.modul == "DP.KRM")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_kirim) "+
								"from dropkrm_m a inner join ver_d x on x.no_bukti=a.no_kirim and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);								
				this.scriptSql = "select x.status,x.catatan,'DP.KRM' as modul,a.no_kirim,'-' as nama_pp,a.tanggal,"+
								"       a.due_date,a.keterangan,a.kode_curr,a.nilai, "+
								"       c.nama as pemohon, '-' as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from dropkrm_m a "+
								"               inner join karyawan c on c.nik=a.nik_buat and c.kode_lokasi=a.kode_lokasi "+
								"               inner join ver_d x on x.no_bukti=a.no_kirim and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver ='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
			}
			if (this.modul == "DEPO")
			{
				var pageCount = this.dbLib.getRowCount("select count(a.no_depo) "+
								"from depo_m a inner join ver_d x on x.no_bukti=a.no_depo and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'",this.baris);								
				this.scriptSql = "select x.status,x.catatan,'DEPO' as modul,a.no_depo,'-' as nama_pp,a.tanggal,"+
								"       a.tanggal as due_date,a.keterangan,a.kode_curr,a.nilai, "+
								"       c.nama as pemohon, '-' as peruntukan, 0 as nilai_lain,a.no_del,a.progress "+
								"from depo_m a "+
								"            inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								"            inner join ver_d x on x.no_bukti=a.no_depo and a.kode_lokasi=x.kode_lokasi and x.modul = '"+this.modul+"' "+
								"where x.no_ver ='"+this.cb_bukti.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
			}
			
			this.dbLib.listData(this.scriptSql, 1, this.baris);
		}
		
		this.sgNav.setTotalPage(pageCount);
		this.sgNav.rearrange();
		this.sgNav.activePage = 0;	
		this.sgNav.setButtonStyle(3);
		if (pageCount > 0)
		{
			if (this.sgNav.imgBtn1 != undefined)
				this.sgNav.setSelectedPage(this.sgNav.imgBtn1);
		}
		
	} catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_fVerspbk.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ver_m','no_ver',this.app._lokasi+"-VER"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
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
window.app_saku_kb_transaksi_fVerspbk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_fVerspbk.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
};
window.app_saku_kb_transaksi_fVerspbk.prototype.sg1ondblclick = function(sender, col , row)
{
	this.sg2.clearAll();
	if (this.sg1.getCell(0,row) != "") 
	{		
		if ((this.sg1.getCell(2,row) == "KP.SPB") || (this.sg1.getCell(2,row) == "SPB") || (this.sg1.getCell(2,row) == "SPP") || (this.sg1.getCell(2,row) == "A/P") ) 
		{
			
			if (this.app._dbEng == "mysqlt")
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
			                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
											"from   spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
											"where a.no_spb = '"+this.sg1.getCell(3,row)+"' order by a.dc desc");
			}else
			if (this.app._dbEng == "ado_mssql")
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
			                                "       a.kode_pp,isnull(c.nama ,'-') as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
											"from   spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
											"where a.no_spb = '"+this.sg1.getCell(3,row)+"' order by a.dc desc");
			}
		}
		if (this.sg1.getCell(2,row) == "PJR")
		{
			
			if (this.app._dbEng == "mysqlt")
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
			                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
											"from   panjar_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
											"where a.no_pj = '"+this.sg1.getCell(3,row)+"' order by a.dc desc");
			}		
		}		
		if (this.sg1.getCell(2,row) == "PJ.PTG")
		{
			
			if (this.app._dbEng == "mysqlt")
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
			                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
											"from   ptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
											"where a.no_ptg = '"+this.sg1.getCell(3,row)+"' order by a.dc desc");
			}		
		}
		if (this.sg1.getCell(2,row) == "I/F")
		{
			
			if (this.app._dbEng == "mysqlt")
			{
				var temp = this.dbLib.runSQL("select a.akun_if as kode_akun,b.nama as nama_akun,a.keterangan,ucase('D') as dc,a.nilai,"+
			                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,'-' as kode_drk,'-' as nama_drk "+
											"from   if_m a inner join masakun b on a.akun_if=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"where a.no_if = '"+this.sg1.getCell(3,row)+"' ");
			}		
		}	
		if (this.sg1.getCell(2,row) == "IF.PTG")
		{
			
			if (this.app._dbEng == "mysqlt")
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
			                                "        a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
											"from   ifptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"                 left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"                 left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
											"where a.no_ifptg = '"+this.sg1.getCell(3,row)+"' order by a.dc desc");
			}		
		}
		if (this.sg1.getCell(2,row) == "DP.KRM")
		{
			
			if (this.app._dbEng == "mysqlt")
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
			                                "        a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
											"from   dropkrm_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"                   left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"                   left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
											"where a.no_kirim = '"+this.sg1.getCell(3,row)+"' order by a.dc desc");
			}		
		}
		if (this.sg1.getCell(2,row) == "DEPO")
		{
			
			if (this.app._dbEng == "mysqlt")
			{
				var temp = this.dbLib.runSQL("select a.akun_depo as kode_akun,b.nama as nama_akun,a.keterangan,ucase('D') as dc,a.nilai,"+
			                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,'-' as kode_drk,'-' as nama_drk "+
											"from   depo_m a inner join masakun b on a.akun_depo=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"                left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"where a.no_depo = '"+this.sg1.getCell(3,row)+"' ");
			}		
		}
		if (temp instanceof portalui_arrayMap){
			this.sg2.setData(temp);
		}else alert(rs);
	}
};
window.app_saku_kb_transaksi_fVerspbk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
		    if (this.ed_period != "") 
			{
				this.standarLib.showListData(this, "Daftar Bukti Verifikasi",this.cb_bukti,undefined, 
				  								 "select no_ver, keterangan from ver_m where periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 "select count(no_ver)      from ver_m where periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",
												 ["no_ver","keterangan"],"and",["No Verifikasi","Keterangan"],false);
			}
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
			this.sg1.clear(); this.sg1.appendRow();			
			this.sg2.clearAll();
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas Verifikasi",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_fVerspbk.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.nb +")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
								
				case "listData" :
					this.sg1.clear();
					if ((result != "") && (result != undefined))
					{
						this.list = this.standarLib.strToArray(result);				
						var values = undefined;								
						var value = Array();
						this.sg1.showLoading();
						for (var i in this.list.objList)
						{
							values = this.list.get(i);				
							for (var i in values.objList)
								value[i] = values.get(i);
							value[0] = value[0].toUpperCase();
							value[2] = value[2].toUpperCase();
							value[13] = value[13].toUpperCase();
							value[14] = value[14].toUpperCase();
							
							var dt=value[5].split(" ");
							var tgl=dt[0].split("-");
							value[5]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							var dt=value[6].split(" ");
							var tgl=dt[0].split("-");
							value[6]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14),value);	
							//this.sg1.appendData(value);
						}			
						this.sg1.hideLoading();
					}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
			        {
			          system.alert(this,result);
			        }else 
			        { 
						system.info(this,"Data tidak ditemukan.","No dokumen tidak ada yang siap diubah.");
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
};
