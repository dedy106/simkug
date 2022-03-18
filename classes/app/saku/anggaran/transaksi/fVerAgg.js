window.app_saku_anggaran_transaksi_fVerAgg = function(owner)
{
	if (owner)
	{
		window.app_saku_anggaran_transaksi_fVerAgg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_anggaran_transaksi_fVerAgg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Anggaran: Input", 0);	
		
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
	        
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(78);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(100);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);		
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setTag("3");
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(122);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setTag("3");
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");			
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(205);
		this.bShow.setTop(144);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(246);
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
    	this.sg1.setHeight(145);
		this.sg1.setColCount(13);
		this.sg1.setColTitle(["Status","Catatan","Modul","No Dokumen","PP","Tgl Dok.","Due Date","Deskripsi","Currency","Nilai","Permohonan","Peruntukan","Nilai Lain"]);
		this.sg1.setColWidth([12,11,10,9,8,7,6,5,4,3,2,1,0],[80,100,100,100,60,250,60,60,120,120,80,200,60]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "APP");
			val.set(2, "NONAPP");
			val.set(3, "INPROG");
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
			this.sg1.onDblClick.set(this,"sg1ondblclick");
			this.sg1.onCellExit.set(this,"doCellChange");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.bGen.onClick.set(this, "genClick");
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow(); this.sg2.clearAll();
			this.baris = this.app._baris;
			this.cb_setuju.setSQL("select nik, nama from karyawan  where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
			this.cb_pembuat.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["nik","nama"]);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_anggaran_transaksi_fVerAgg.extend(window.portalui_childForm);
window.app_saku_anggaran_transaksi_fVerAgg.prototype.mainButtonClick = function(sender)
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
window.app_saku_anggaran_transaksi_fVerAgg.prototype.simpan = function()
{
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","3")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
		
			sql.add("insert into anggver_m (no_ver,kode_lokasi,keterangan,tanggal,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,nilai) values "+
					"       ('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"','"+
							"-','"+this.ed_period.getText()+"','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
							"','"+this.app._userLog+"',now(),0)");
												
			//for (var i=0; i < this.sg1.rows.getLength(); i++)
			var line;
			for (var i in this.sg1.data.rs.rows){
				line = this.sg1.data.rs.rows[i];
				if (line.status != "INPROG")
				{
					sql.add("insert into anggver_d (no_ver,modul,no_bukti,status,catatan,no_del,kode_lokasi) values "+
							"('"+this.ed_nb.getText()+"','"+ line[this.sg1.tableColumn[2]] +"','"+line[this.sg1.tableColumn[3]]+"','"+line[this.sg1.tableColumn[0]]+"','"+line[this.sg1.tableColumn[1]]+"','-','"+this.app._lokasi+"')");
					if ((line[this.sg1.tableColumn[2]] == "KP.SPB") || (line[this.sg1.tableColumn[2]] == "SPB") || (line[this.sg1.tableColumn[2]] == "SPP") || (line[this.sg1.tableColumn[2]] == "A/P")) 
					{
						if (line[this.sg1.tableColumn[0]] == "APP")
						{
							sql.add("update spb_m set progress='1' where no_spb='"+line[this.sg1.tableColumn[3]]+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (line[this.sg1.tableColumn[0]] == "NONAPP")
						{
							sql.add("update spb_m set progress='X' where no_spb='"+line[this.sg1.tableColumn[3]]+"' and kode_lokasi='"+this.app._lokasi+"'");
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
window.app_saku_anggaran_transaksi_fVerAgg.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
				this.sg2.clearAll();
			}
			break;
		case "simpan" :
			
			var cekData = "F", line;
			for (var i in this.sg1.data.rs.rows)
			{
				line = this.sg1.data.rs.rows[i];
				if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(line[this.sg1.tableColumn[5]])) && ((line[this.sg1.tableColumn[0]] == "APP") || (line[this.sg1.tableColumn[0]] == "NONAPP")))
				{
					system.alert(this,"Tanggal verifikasi kurang dari tanggal dokumen [baris "+i+"].","");
					return false;
				}
				if ((line[this.sg1.tableColumn[0]] == "APP") || (line[this.sg1.tableColumn[0]] == "NONAPP"))
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
window.app_saku_anggaran_transaksi_fVerAgg.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"APP");
	}
	//this.appAll = true;
	this.sg1.onChange.set(undefined,undefined);
	for (var i in this.sg1.data.rs.rows){
		this.sg1.data.rs.rows[i].status = "APP";
	}
	this.sg1.onChange.set(this,"doCellChange");
};
window.app_saku_anggaran_transaksi_fVerAgg.prototype.doSelectedPage = function(sender, page)
{
	//this.dbLib.listData(this.scriptSql, page, this.baris);
	this.loadDataApproval(page, this.baris);
};
window.app_saku_anggaran_transaksi_fVerAgg.prototype.showClick = function(sender)
{
	try
	{
		this.sg1.clear();
		this.sg1.appendRow();
		this.sg2.clearAll();
				
		var pageCount = this.dbLib.getRowCount("select count(a.no_spb) "+
						"from spb_m a "+
						"where a.modul = 'KP.SPB' and a.progress='0' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",this.baris);
		this.scriptSql = "select 'INPROG' as status,'-' as catatan,a.modul,a.no_spb,b.nama as nama_pp,a.tanggal,"+
						"       a.due_date,a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai, "+  //nilai_pot sudah include di nilai
						"       c.nama as pemohon, d.nama as peruntukan, 0 as nilai_lain "+
						"from spb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"             inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
						"             inner join kop_agg d on d.kode_agg=a.kode_terima and a.kode_lokasi=d.kode_lokasi "+
						"where a.jenis in ('SIMP','SIMPDEPO') and a.modul = '"+this.cb_status.getText()+"' and a.progress='0' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		this.dbLib.getDataProviderA(this.scriptSql);		
		
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
window.app_saku_anggaran_transaksi_fVerAgg.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'anggver_m','no_ver',this.app._lokasi+"-VER"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_anggaran_transaksi_fVerAgg.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_anggaran_transaksi_fVerAgg.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
	if (sender == this.cb_status){
		this.appAll = false;
		this.sg2.clearAll();
		this.sg1.clear(1);
	}
};
window.app_saku_anggaran_transaksi_fVerAgg.prototype.doCellChange = function(sender, col , row){
	if (col == 0){
		sender.data.rs.rows[sender.startNo + row].status = sender.cells(0, row);
	}
	if (col == 1) sender.data.rs.rows[sender.startNo + row].catatan = sender.cells(1, row);
};
window.app_saku_anggaran_transaksi_fVerAgg.prototype.sg1ondblclick = function(sender, col , row)
{
	this.sg2.clearAll();
	if (this.sg1.getCell(0,row) != "") 
	{		
		if ((this.sg1.getCell(2,row) == "KP.SPB") || (this.sg1.getCell(2,row) == "SPB") || (this.sg1.getCell(2,row) == "SPP") || (this.sg1.getCell(2,row) == "A/P")){
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
window.app_saku_anggaran_transaksi_fVerAgg.prototype.FindBtnClick = function(sender, event)
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
window.app_saku_anggaran_transaksi_fVerAgg.prototype.doRequestReady = function(sender, methodName, result)
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
				case "getDataProvider":
					result = JSON.parse(result);
					this.sg1.data = result;					
					for (var i in this.sg1.data.rs.rows){						
						this.sg1.data.rs.rows[i].status = this.sg1.data.rs.rows[i].status.toUpperCase();
						this.sg1.data.rs.rows[i].modul = this.sg1.data.rs.rows[i].modul.toUpperCase();
					}
					this.loadDataApproval(1,this.baris);
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
							
							var dt=value[5].split(" ");
							var tgl=dt[0].split("-");
							value[5]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							var dt=value[6].split(" ");
							var tgl=dt[0].split("-");
							value[6]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12),value);	
						}			
						this.sg1.hideLoading();
					}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
			        {
			          system.alert(this,result);
			        }else 
			        { 
						system.info(this,"Data tidak ditemukan.","Jenis dokumen "+this.cb_status.getText()+" tidak ada yang siap diverifikasi.");
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
window.app_saku_anggaran_transaksi_fVerAgg.prototype.loadDataApproval = function(page, rowPerPage){
	try{	
		this.sg1.showLoading();
		var start = ( page - 1)* rowPerPage;
		var finish = ( this.sg1.data.rs.rows.length < start + rowPerPage ? this.sg1.data.rs.rows.length : start + rowPerPage);
		this.sg1.clear();
		var data = this.sg1.data, line,dataToAppend, first = true, tableColumn = [];		
		this.sg1.startNo = start;
		for (var i=start;i < finish;i++){
			line = data.rs.rows[i];
			dataToAppend = [];
			data.rs.rows[i].status = line.status.toUpperCase();
			data.rs.rows[i].modul = line.modul.toUpperCase();
			for (var c in line) {
				if (c == "status" || c == "modul") 
					dataToAppend.push(line[c].toUpperCase());
				else if (c == "nilai" || c == "nilai_lain")
					dataToAppend.push(floatToNilai(line[c]));
				else 
					dataToAppend.push(line[c]);
				if (first) tableColumn.push(c);
			}
			this.sg1.appendData(dataToAppend);
			first = false;
		}
		this.sg1.setNoUrut(start);	
		this.sg1.tableColumn = tableColumn;
		this.sg1.hideLoading();
	}catch(e){
		this.sg1.hideLoading();
		alert(e);
	}
};