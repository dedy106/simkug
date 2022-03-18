window.app_saku_gl_transaksi_fUnposting3 = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fUnposting3.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_transaksi_fUnposting3";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Unposting Transaksi : Input", 0);	
				
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode Unposting");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		this.ed_period.setTag("9");
		   
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(32);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tanggal Transaksi");
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
		this.ed_nb.setCaption("No Unposting");
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
		
		uses("portalui_saiCBBL");
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(100);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Diunposting Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption(" ");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(122);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption(" ");
		
		this.cb_status = new portalui_saiCB(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(144);
		this.cb_status.setWidth(185);
		this.cb_status.setReadOnly(true);
		this.cb_status.setCaption("Jenis Transaksi");
		this.cb_status.setText("");
		//this.cb_status.addItem(0,"JU");
		
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
		this.bPAll.setCaption("UnPost All");
		//this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(340);
		this.cb_bukti.setTop(144);
		this.cb_bukti.setWidth(185);
		this.cb_bukti.setLabelWidth(80);
		this.cb_bukti.setTag("9");
		//this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setCaption("No Bukti");
		this.cb_bukti.setText(""); 
		this.cb_bukti.setRightLabelCaption(" ");
		
	    this.eJml = new portalui_saiLabelEdit(this);
		this.eJml.setLeft(740);
		this.eJml.setTop(118);
		this.eJml.setWidth(180);
		this.eJml.setLength(150);
		this.eJml.setTag("9");
		this.eJml.setTipeText(ttNilai);
		this.eJml.setAlignment(alRight);
		this.eJml.setReadOnly(false);
		this.eJml.setCaption("Jml Baris");
		
		this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(166);
	    this.p1.setWidth(900);
	    this.p1.setHeight(310);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Transaksi Telah Diposting');
	    
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(145);
		this.sg1.setColCount(9);
		
		this.sg1.setColTitle(["Status","Modul","No Bukti","No Dokumen","Departemen","Tgl Dok.","Deskripsi","Currency","Nilai"]);
		this.sg1.setColWidth([8,7,6,5,4,3,2,1,0],[120,60,200,60,100,120,120,50,80]);			
		this.sg1.setReadOnly(false);    
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "UNPOSTING");
			val.set(2, "POSTED");
		this.sg1.columns.get(0).setPicklist(val);		   			
    	this.sg1.columns.get(1).setReadOnly(true);
    	this.sg1.columns.get(2).setReadOnly(true);
    	this.sg1.columns.get(3).setReadOnly(true);
    	this.sg1.columns.get(4).setReadOnly(true);
    	this.sg1.columns.get(5).setReadOnly(true);	
    	this.sg1.columns.get(6).setReadOnly(true);
    	this.sg1.columns.get(7).setReadOnly(true);
		this.sg1.columns.get(8).setColumnFormat(window.cfNilai);
    	this.sg1.columns.get(8).setReadOnly(true);
		
		uses("portalui_saiTable");	
		this.sg2 = new portalui_saiTable(this.p1);
    	this.sg2.setLeft(1);
		this.sg2.setTop(170);
    	this.sg2.setWidth(895);
    	this.sg2.setHeight(135);
		this.sg2.setTag("2");
		this.sg2.setColTitle(["No","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode Dept.","Nama Dept.","Kode DRK","Nama DRK"]);

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
			uses("util_addOnLib");
			this.addOnLib=new util_addOnLib();
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.cb_pembuat.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onChange.set(this, "doEditChange");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_status.onChange.set(this,"doEditChange");
			this.bShow.onClick.set(this, "showClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onDblClick.set(this,"sg1ondblclick");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			
			var val = this.dbLib.loadQuery("select kode_jenis from ju_jenis where kode_lokasi='"+this.app._lokasi+"' ");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.cb_status.addItem(j,"JU"+val[j].split(";"));
					}
				}
			j++; this.cb_status.addItem(j,"BELI"); 
			j++; this.cb_status.addItem(j,"KBIV"); 
			j++; this.cb_status.addItem(j,"GBIV");
			j++; this.cb_status.addItem(j,"JUAL");
			j++; this.cb_status.addItem(j,"JHPP");
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);				
			this.ed_period.setText(this.app._periode);
			this.sg1.clear(1);
			this.baris = this.app._baris;
			this.sg2.clearAll(); 
			this.eJml.setText(this.app._baris); 
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_gl_transaksi_fUnposting3.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fUnposting3.prototype.mainButtonClick = function(sender)
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

window.app_saku_gl_transaksi_fUnposting3.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				try
				{
					this.standarLib.clearByTag(this, new Array("0","1","2"),undefined);				
					this.sg1.clear(1);
					this.sg2.clearAll();
				} catch(e)			
				{
					system.alert(this, e,"");
				}
			}
			break;
			
		case "simpan" :
			try
			{	
				var cekData = "F";
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if (this.sg1.getCell(0,i) == "UNPOSTING") 
					cekData = "T";
				}
				if (cekData == "F")
				{
					system.alert(this,"Tidak ada transaksi yang akan di-unposting.","Pilih UNPOSTING untuk membatalkan transaksi yang telah di posting di kolom status.");
					return false;
				}
			} catch(e)
			{
				system.alert(this, e,"");
			}
			
			this.bGen.click();
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
				
					sql.add("insert into unposting_m (no_unpost,kode_lokasi,keterangan,tanggal,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input) values "+
							"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"','"+
							this.cb_status.getText()+"','"+this.ed_period.getText()+"','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
							"','"+this.app._userLog+"',now())");
															
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						if (this.sg1.getCell(0,i) == "UNPOSTING")
						{
							sql.add("insert into unposting_d (no_unpost,modul,no_bukti,status,catatan) values "+
								    "('"+this.ed_nb.getText()+"','"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(0,i)+"','-')");
							
							sql.add("call sp_unpost_modul ('"+this.sg1.getCell(1,i)+"','"+this.app._lokasi+"','"+this.sg1.getCell(2,i)+"','"+this.ed_nb.getText()+"')");
						}
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
};
window.app_saku_gl_transaksi_fUnposting3.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'unposting_m','no_unpost',this.app._lokasi+"-UPOS"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
		}
		else
		{
			system.alert(this,"Periode harus valid.","");
		}
	}catch (e){
		systemAPI.alert(e);
	}
};
window.app_saku_gl_transaksi_fUnposting3.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"UNPOSTING");
	}
};
window.app_saku_gl_transaksi_fUnposting3.prototype.doSelectedPage = function(sender, page)
{
	try
	{
		this.baris = nilaiToFloat(this.eJml.getText());
		this.dbLib.listData(this.scriptSql, page, this.baris);
	} catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_saku_gl_transaksi_fUnposting3.prototype.showClick = function(sender)
{
	try
	{
		this.sg1.clear();
		this.sg1.appendRow();
		this.baris = nilaiToFloat(this.eJml.getText());		
		if (this.cb_status.getText() != "")
		{
			if ((this.cb_status.getText() != "JUAL") && (this.cb_status.getText().substr(0,2) == "JU")) {
				if (this.cb_bukti.getText() == "") {
					var pageCount = this.dbLib.getRowCount(" select count(no_ju) "+
														   " from ju_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='"+this.cb_status.getText().substr(2,2)+"'", this.baris);							
					this.scriptSql = " select 'POSTED' as status,'JU' as modul,a.no_ju as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai "+
									 " from ju_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.jenis='"+this.cb_status.getText().substr(2,2)+"'";
				}
				else {
					var pageCount = this.dbLib.getRowCount(" select count(no_ju) "+
														   " from ju_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='"+this.cb_status.getText().substr(2,2)+"' and no_ju='"+this.cb_bukti.getText()+"' ", this.baris);							
					this.scriptSql = " select 'POSTED' as status,'JU' as modul,a.no_ju as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai "+
									 " from ju_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.jenis='"+this.cb_status.getText().substr(2,2)+"' and a.no_ju='"+this.cb_bukti.getText()+"' ";
				}
			}
			else {
				if (this.cb_status.getText() == "JHPP"){
					var pageCount = this.dbLib.getRowCount("select count(aa.no_hpp) from ("+
														   " select no_hpp "+
														   " from inv_hpp_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
														   ")aa", this.baris);		
					this.scriptSql = " select 'POSTED' as status,'JHPP' as modul,a.no_hpp as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from inv_hpp_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";
				}
				if (this.cb_status.getText() == "JUAL"){
					var pageCount = this.dbLib.getRowCount("select count(aa.no_jual) from ("+
														   " select no_jual "+
														   " from inv_jual_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
														   " union "+
														   " select no_retur as no_jual "+
														   " from inv_jualretur_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'" +
														   ")aa", this.baris);		
					this.scriptSql = " select 'POSTED' as status,'JUAL' as modul,a.no_jual as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from inv_jual_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 " union"+
									 " select 'POSTED' as status,'RETJUAL' as modul,a.no_retur as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai "+
									 " from inv_jualretur_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";
				}
				if (this.cb_status.getText() == "BELI"){
					var pageCount = this.dbLib.getRowCount("select count(aa.no_beli) from ("+
														   " select no_beli "+
														   " from inv_beli_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
														   " union "+
														   " select no_retur as no_beli "+
														   " from inv_beliretur_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'" +
														   ")aa", this.baris);		
					this.scriptSql = " select 'POSTED' as status,'BELI' as modul,a.no_beli as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from inv_beli_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 " union"+
									 " select 'POSTED' as status,'RETBELI' as modul,a.no_retur as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai "+
									 " from inv_beliretur_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";			
				}
				if (this.cb_status.getText() == "KBIV"){
					var pageCount = this.dbLib.getRowCount(" select count(no_kas) "+
														   " from kas_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' kode_lokasi='"+this.app._lokasi+"'", this.baris);		
					this.scriptSql = " select 'POSTED' as status,'KB' as modul,a.no_kas as no_bukti,a.ref1 as no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai "+
									 " from kas_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";				
				}
				if (this.cb_status.getText() == "GBIV"){
					var pageCount = this.dbLib.getRowCount(" select count(no_gb) "+
														   " from gb_m "+
														   " where posted = 'T' and periode='"+this.ed_period.getText()+"' kode_lokasi='"+this.app._lokasi+"'", this.baris);		
					this.scriptSql = " select 'POSTED' as status,'GB' as modul,a.no_gb as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,a.keterangan,a.kode_curr,a.nilai "+
									 " from gb_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'T' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";				
				}
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
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_saku_gl_transaksi_fUnposting3.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
	
	if (sender == this.cb_status)
	{
		this.sg1.clear();  this.sg1.appendRow(); 
		this.sg2.clearAll();  
		if ((this.cb_status.getText() != "JUAL") && (this.cb_status.getText().substr(0,2) == "JU")) {
		      this.cb_bukti.setSQL("select distinct no_bukti, no_dokumen from gldt where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.app._periode+"' and modul like 'JU%' ",["no_bukti","no_dokumen"],true);
		}
	}
};
												  
window.app_saku_gl_transaksi_fUnposting3.prototype.sg1ondblclick = function(sender, col , row)
{
	this.sg2.clearAll();
	if (this.sg1.getCell(0,row) != "") 
	{
		if ((this.cb_status.getText() != "JUAL") && (this.cb_status.getText().substr(0,2) == "JU")) {
			var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
										"       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
										"from   ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
										"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=c.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
										"where a.no_ju = '"+this.sg1.getCell(2,row)+"' order by a.dc desc");
		}
		else {
			if (this.cb_status.getText() == "JHPP") {
				if (this.sg1.cells(1,row) == "JHPP") {
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
												"       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   inv_hpp_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=c.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_hpp = '"+this.sg1.getCell(2,row)+"' order by a.dc desc");
				}
			}
			if (this.cb_status.getText() == "JUAL") {
				if (this.sg1.cells(1,row) == "JUAL") {
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
												"       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   inv_jual_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=c.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_jual = '"+this.sg1.getCell(2,row)+"' order by a.dc desc");
				}
				if (this.sg1.cells(1,row) == "RETJUAL") {	
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
												"       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   inv_jualretur_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=c.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_retur = '"+this.sg1.getCell(2,row)+"' order by a.dc desc");
				}
			}
			if (this.cb_status.getText() == "BELI") {
				if (this.sg1.cells(1,row) == "BELI") {
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
												"       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   inv_beli_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=c.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_beli = '"+this.sg1.getCell(2,row)+"' order by a.dc desc");
				}
				if (this.sg1.cells(1,row) == "RETBELI") {	
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
												"       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   inv_beliretur_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=c.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_retur = '"+this.sg1.getCell(2,row)+"' order by a.dc desc");
				}
			}
			if (this.cb_status.getText() == "KBIV") 
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
			                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
											"from   kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
											"where a.no_kas = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.cb_status.getText() == "GBIV") 
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
			                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
											"from   gb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
											"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
											"where a.no_gb = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}			
		}
		
		if (temp instanceof portalui_arrayMap){
			this.sg2.setData(temp);
		}else systemAPI.alert(rs);
	}
};
window.app_saku_gl_transaksi_fUnposting3.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) {   
			if ((this.cb_status.getText() != "JUAL") && (this.cb_status.getText().substr(0,2) == "JU")) {
				this.standarLib.showListData(this, "Daftar Bukti",this.cb_bukti,undefined, 
											"select distinct no_bukti, no_dokumen, keterangan from gldt where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.app._periode+"' and modul like 'JU%' ",
											"select count(distinct  no_bukti)       		  from gldt where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.app._periode+"' and modul like 'JU%' ",
											new Array("no_bukti","no_dokumen","keterangan"),"and",new Array("No Bukti","No Dokumen","Keterangan"),false);
			}		
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas Unposting",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_saku_gl_transaksi_fUnposting3.prototype.doRequestReady = function(sender, methodName, result)
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
					//this.sg2.clear();
					//this.sg2.appendRow();
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
							value[1] = value[1].toUpperCase();
							
							var dt=value[5].split(" ");
							var tgl=dt[0].split("-");
							value[5]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							value[8]=floatToNilai(parseFloat(value[8]));
							this.sg1.appendData(value);	
						}	
						this.sg1.hideLoading();	
						//if need empty value						
					}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
			        {
			          system.alert(this,result);
			        }else 
			        { 
						system.info(this,"Data tidak ditemukan.","Jenis transaksi "+this.cb_status.getText()+" tidak ada yang siap untuk di-unposting.");
						this.sg1.appendRow();
						return false;
			        }  
				break;
    		}
		}catch(e){
			systemAPI.alert("step : "+step+"; error = "+e);
		}
    }
};