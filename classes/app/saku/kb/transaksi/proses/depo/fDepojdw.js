window.app_saku_kb_transaksi_proses_depo_fDepojdw = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_depo_fDepojdw";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjadwalan Kembali Deposito: Input", 0);	
		
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
		this.ed_nb.setCaption("No Penjadwalan");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	        
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(78);
		this.ed_dok.setWidth(220);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(150);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(122);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(144);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(520);
		this.bShow.setTop(144);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(550);
		this.bPAll.setTop(144);
		this.bPAll.setCaption("APP All");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(166);
	    this.p1.setWidth(900);
	    this.p1.setHeight(310);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Ref. Kas Bank Keluar');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(280);
		this.sg1.setColCount(18);
		this.sg1.setColTitle(["Status","No Depo Baru","Tgl Baru","Jth Tmp Baru","No Dok Baru","%Rate Baru","Basis Baru","No Depo Lama","Bank","Cabang","No Dokumen","Deskripsi","Nilai Penempatan","Tanggal","Tgl Jth Tempo","Akun Deposito","% Rate","Basis"]);
		this.sg1.setColWidth([17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,60,80,80,80,110,150,80, 120,80,100,60,60,100,80,80,100,60]);	
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "APP");
			val.set(2, "INPROG");
		this.sg1.columns.get(0).setPicklist(val);
    	this.sg1.columns.get(1).setReadOnly(true);
    	this.sg1.columns.get(7).setReadOnly(true);
    	this.sg1.columns.get(8).setReadOnly(true);
    	this.sg1.columns.get(9).setReadOnly(true);
    	this.sg1.columns.get(10).setReadOnly(true);
    	this.sg1.columns.get(11).setReadOnly(true);
    	this.sg1.columns.get(12).setReadOnly(true);	
		this.sg1.columns.get(13).setReadOnly(true);	
		this.sg1.columns.get(14).setReadOnly(true);	
		this.sg1.columns.get(15).setReadOnly(true);	
		this.sg1.columns.get(16).setReadOnly(true);	
		this.sg1.columns.get(17).setReadOnly(true);
		this.sg1.columns.get(5).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(6).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(12).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(16).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(17).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(2).setButtonStyle(window.bsDate);
		this.sg1.columns.get(3).setButtonStyle(window.bsDate);
		
		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(140);
		this.sgNav.setLeft(623);
		this.sgNav.setWidth(297);
		this.sgNav.setGrid(this.sg);
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
			this.cb_pembuat.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onChange.set(this, "doEditChange");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.sg1.onChange.set(this, "doCellChange");
			this.bGen.onClick.set(this, "genClick");
			
			this.standarLib.clearByTag(this, new Array("0"),undefined);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow(); 
			this.baris = this.app._baris;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdw.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("insert into depojdw_m (no_jadwal,kode_lokasi,no_dokumen,keterangan,tanggal,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,nilai) values "+
					"       ('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"','"+
							this.ed_period.getText()+"','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
							"','"+this.app._userLog+"',now(),0)");
												
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i).toUpperCase() == "APP")
				{		
					sql.add("insert into depo_m (no_depo,no_kas,no_dokumen,tanggal,due_date,tgl_akru,bank,cabang,rate,basis,"+
							"keterangan,catatan,kode_curr,kurs,akun_kb,akun_depo,akun_cbunga,nik_buat,nik_setuju,kode_lokasi,kode_pp,"+
							"modul,nilai,progress,periode,no_del,no_link,nik_user,tgl_input,tgl_just,jam,pic_bank,pic_karyawan,jk_waktu,akun_ar,akun_pdpt,"+
							"ctgl_just,cjam,cpic_bank,cpic_karyawan,csurat,cnik_setuju,cnilai,no_depolink,cakun_kb) "+
							"    select '"+this.sg1.getCell(1,i)+"','RESCH',no_dokumen,'"+this.sg1.getCellDateValue(2,i)+"','"+this.sg1.getCellDateValue(3,i)+"','"+this.sg1.getCellDateValue(2,i)+"',bank,cabang,"+
							parseNilai(this.sg1.getCell(5,i))+","+parseNilai(this.sg1.getCell(6,i))+","+
							"           keterangan,catatan,kode_curr,kurs,akun_kb,akun_depo,akun_cbunga,'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',kode_lokasi,kode_pp,"+
							"           modul,nilai,progress,periode,no_del,no_link,'"+this.app._userLog+"',now(),tgl_just,jam,pic_bank,pic_karyawan,jk_waktu,akun_ar,akun_pdpt,ctgl_just,cjam,cpic_bank,cpic_karyawan,csurat,cnik_setuju,cnilai,no_depolink,cakun_kb "+
							"    from depo_m where no_depo ='"+this.sg1.getCell(7,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
			
					sql.add(" update depo_m set no_depolink='"+this.sg1.getCell(1,i)+"',progress = '9' where no_depo = '"+this.sg1.getCell(7,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("insert into depojdw_d (no_jadwal,no_depo,no_depolama,status,kode_lokasi) values "+
							"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(7,i)+"','APP','"+this.app._lokasi+"')");

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
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
		case "simpan" :
			
			var cekData = "F";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i) == "APP") cekData = "T";
			}
			
			if (cekData == "F")
			{
				system.alert(this,"Tidak ada transaksi yang diapprove.","Pilih APP untuk menjadwalulang di kolom status.");
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
				  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
			}else this.simpan();
			break;			
		case "simpancek" : this.simpan();
			break;			
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"APP");
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.doSelectedPage = function(sender, page)
{
	this.dbLib.listData(this.scriptSql, page, this.baris);
};
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.showClick = function(sender)
{
	try
	{
		this.sg1.clear(); this.sg1.appendRow();
		var pageCount = this.dbLib.getRowCount("select count(a.no_depo) "+
						"from depo_m a "+
						"where a.progress='2' and a.due_date <= '"+this.dp_tgl1.getDate()+"' and a.kode_lokasi='"+this.app._lokasi+"'",this.baris);
		this.scriptSql = "select 'INPROG' as status,'-','"+this.dp_tgl1.getText()+"','"+this.dp_tgl1.getText()+"','-',0,0,no_depo,bank,cabang,no_dokumen,keterangan,"+
						"         nilai,tanggal,due_date,akun_depo,rate,basis "+
						"from depo_m "+
						"where progress='2' and due_date <= '"+this.dp_tgl1.getDate()+"' and kode_lokasi='"+this.app._lokasi+"'";
		
		this.dbLib.listData(this.scriptSql, 1, this.baris);
			
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
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'depojdw_m','no_jadwal',this.app._lokasi+"-DJD"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.doCellChange = function(sender, col, row) 
{
		try
	{
		switch(col)
		{
			case 0 : 
					if (this.sg1.getCell(0,row) == 'APP')
					{
						var ndepo = this.standarLib.noBuktiOtomatis(this.dbLib,'depo_m','no_depo',this.app._lokasi+"-DPS"+this.ed_period.getText().substr(2,4)+".",'0000');
						this.sg1.setCell(1,row,ndepo);
						this.sg1.setCell(5,row,this.sg1.getCell(16,row));
						this.sg1.setCell(6,row,this.sg1.getCell(17,row));
					}else
					{
						this.sg1.setCell(1,row,'-');
						this.sg1.setCell(5,row,'0');
						this.sg1.setCell(6,row,'0');
					}
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
};
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_pembuat) 
		{   
			this.standarLib.showListData(this, "Daftar Petugas Verifikasi",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
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
window.app_saku_kb_transaksi_proses_depo_fDepojdw.prototype.doRequestReady = function(sender, methodName, result)
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

							var dt=value[13].split(" ");
							var tgl=dt[0].split("-");
							value[13]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							
							var dt=value[14].split(" ");
							var tgl=dt[0].split("-");
							value[14]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							
							value[16] = floatToNilai(parseFloat(value[16]));
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17),value);	
						}			
						this.sg1.hideLoading();
					}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
			        {
			          system.alert(this,result);
			        }else 
			        { 
						system.info(this,"Data tidak ditemukan.","");
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