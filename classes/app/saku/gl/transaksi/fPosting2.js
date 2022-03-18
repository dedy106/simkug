window.app_saku_gl_transaksi_fPosting2 = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fPosting2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_transaksi_fPosting2";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi : Input", 0);	
				
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode Posting");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		this.ed_period.setTag("9");
		    
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(32);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tgl Transaksi");
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
		this.ed_nb.setCaption("No Posting");
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
		this.cb_pembuat.setTag("9"); 		
		this.cb_pembuat.setCaption("Diposting Oleh");
		this.cb_pembuat.setText(""); 		
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelCaption(" ");
		this.cb_pembuat.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"]);
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(122);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setTag("9");
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 		
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelCaption(" ");
		this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"]);
		
		this.cb_status = new portalui_saiCB(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(144);
		this.cb_status.setWidth(185);
		this.cb_status.setCaption("Jenis Transaksi");
		this.cb_status.setText("");
		this.cb_status.addItem(0,"JU");
		this.cb_status.addItem(1,"KB");
		this.cb_status.addItem(2,"DEPOSITO");
		this.cb_status.addItem(3,"PJ.PTG");
		this.cb_status.addItem(4,"PR.PTG");
		this.cb_status.addItem(5,"IF.PTG");
		this.cb_status.addItem(6,"FF.PTG");
		this.cb_status.addItem(7,"ASSET");
		this.cb_status.addItem(8,"ARMHS");
		this.cb_status.addItem(9,"SPB");
		this.cb_status.addItem(10,"A/P");
		this.cb_status.addItem(11,"KP.SPB");
		this.cb_status.addItem(12,"KP.SIMP");
		this.cb_status.addItem(13,"KP.PINJ");
		this.cb_status.addItem(14,"KP.PBRG");
		this.cb_status.addItem(15,"AR.UMUM");
		this.cb_status.addItem(16,"AR.PROYEK");
		this.cb_status.addItem(17,"AP.BANK");
		
		this.cb_status.setReadOnly(true);
			
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
		this.bPAll.setCaption("Post All");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.eJml = new portalui_saiLabelEdit(this);
		this.eJml.setLeft(340);
		this.eJml.setTop(144);
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
	    this.p1.setHeight(335);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Transaksi Belum Posting');
	    
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(145);
		this.sg1.setColCount(9);
		this.sg1.setColTitle(["Status","Modul","No Bukti","No Dokumen","PP","Tgl Dok.","Deskripsi","Currency","Nilai"]);
		this.sg1.setColWidth([8,7,6,5,4,3,2,1,0],[120,60,200,60,100,120,120,50,80]);			
		this.sg1.setReadOnly(false);    
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "POSTING");
			val.set(2, "INPROG");
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
		
		uses("portalui_saiGrid;portalui_sgNavigator");	
		this.sg2 = new portalui_saiGrid(this.p1, {
			bound: [1, 170, 895, 135],
			tag: 2,
			colTitle: ["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"]
		});    			
		this.sgNav =  new portalui_sgNavigator(this,{bound:[623,140,297,25], grid:this.sg, border:0, buttonStyle:3});		
		this.sgNav2 =  new portalui_sgNavigator(this.p1,{bound:[1,305,895,25], grid:this.sg2, border:0, buttonStyle:3, pager:[this,"doPager"]});
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
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);				
			this.ed_period.setText(this.app._periode);
			this.sg1.clear(1);
			this.baris = this.app._baris;
			
			this.eJml.setText(this.app._baris); 
			this.cb_pembuat.setText(this.app._userLog,this.app._namaUser);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_gl_transaksi_fPosting2.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fPosting2.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					try
					{
						this.standarLib.clearByTag(this, new Array("0","1","2"),undefined);				
						this.sg1.clear(); this.sg1.appendRow();
						this.sg2.clear();
						this.eJml.setText(this.app._baris); 
						this.cb_pembuat.setText(this.app._userLog,this.app._namaUser);
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
						if (this.sg1.getCell(0,i) == "POSTING") 
							cekData = "T";
					}
					if (cekData == "F")
					{
						system.alert(this,"Tidak ada transaksi yang akan diposting.","Pilih POSTING untuk mem-posting transaksi di kolom status.");
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
					
						sql.add("insert into posting_m (no_post,kode_lokasi,keterangan,tanggal,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input) values "+
								"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"','"+
								this.cb_status.getText()+"','"+this.ed_period.getText()+"','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
								"','"+this.app._userLog+"',now())");
																
						for (var i=0; i < this.sg1.rows.getLength(); i++)
						{
							if (this.sg1.getCell(0,i) == "POSTING")
							{
								sql.add("insert into posting_d (no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi) values "+
									    "('"+this.ed_nb.getText()+"','"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(0,i)+"','-','-','"+this.app._lokasi+"')");
								
								sql.add("call sp_post_modul ('"+this.sg1.getCell(1,i)+"','"+this.app._lokasi+"','"+this.sg1.getCell(2,i)+"')");
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
	},
	genClick: function(sender){
		try
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'posting_m','no_post',this.app._lokasi+"-POS"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_desc.setFocus();
			}
			else
			{
				system.alert(this,"Periode harus valid.","");
			}
		}catch (e){
			systemAPI.alert(e);
		}
	},
	pAllClick: function(sender){
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			this.sg1.setCell(0,i,"POSTING");
		}
	},
	doSelectedPage: function(sender, page){
		try
		{
			this.dbLib.listData(this.scriptSql, page, nilaiToFloat(this.eJml.getText()) );
		} catch(e)
		{
			system.alert(this, e,"");
		}
	},
	showClick: function(sender){
		try
		{
			this.sg1.clear();
			this.sg1.appendRow();
					
			if (this.cb_status.getText() != ""){
				if (this.cb_status.getText() == "AR.PROYEK"){
					var pageCount = this.dbLib.getRowCount("select count(x.no_bukti) from "+
														   "(select a.no_ar as no_bukti "+
														   "from kop_arproyek_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_bukti as no_bukti "+
														   "from kop_proyekbayar_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   ") x ", nilaiToFloat(this.eJml.getText()));																   
					this.scriptSql = " select 'INPROG' as status,'AR.PRKB' as modul,a.no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_proyekbayar_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'AR.PRAK' as modul,a.no_ar as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_arproyek_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' ";
				}
				if (this.cb_status.getText() == "AP.BANK"){
					var pageCount = this.dbLib.getRowCount("select count(x.no_bukti) from "+
														   "(select a.no_ap as no_bukti "+
														   "from kop_ap_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_kjpe as no_bukti "+
														   "from kop_apkjpe_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   ") x ", nilaiToFloat(this.eJml.getText()));																   
					this.scriptSql = " select 'INPROG' as status,'AP.AKRU' as modul,a.no_ap as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_ap_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'AP.KJPE' as modul,a.no_kjpe as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_apkjpe_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' ";
				}
				if (this.cb_status.getText() == "AR.UMUM"){
					var pageCount = this.dbLib.getRowCount("select count(x.no_bukti) from "+
														   "(select a.no_ar as no_bukti "+
														   "from kop_ar_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_bukti as no_bukti "+
														   "from kop_arbayar_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_rekon as no_bukti "+
														   "from kop_rekon_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   ") x ", nilaiToFloat(this.eJml.getText()));																   
					this.scriptSql = " select 'INPROG' as status,'AR.REKN' as modul,a.no_rekon,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_rekon_m a left outer join pp b on a.kode_ppar=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+ 
									 " select 'INPROG' as status,'AR.UMKB' as modul,a.no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_arbayar_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'AR.UMAK' as modul,a.no_ar as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_ar_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' ";
				}
				if (this.cb_status.getText() == "KP.PBRG"){
					var pageCount = this.dbLib.getRowCount("select count(x.no_bukti) from "+
														   "(select a.no_jual as no_bukti "+
														   "from kop_jual_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_pbrg as no_bukti "+
														   "from kop_pbrg_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_akru as no_bukti "+
														   "from kop_pbrgakru_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														
														
														   "select a.no_bill as no_bukti "+
														   "from kop_pbrgbill_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_angs as no_bukti "+
														   "from kop_pbrgangs_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_inv as no_bukti "+
														   "from kop_pbrginv_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   ") x ", nilaiToFloat(this.eJml.getText()));																   
					this.scriptSql = " select 'INPROG' as status,'PB.JUAL' as modul,a.no_jual as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai_um as nilai "+
									 " from kop_jual_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'PB.KONT' as modul,a.no_pbrg as no_bukti,a.no_kontrak as no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_pbrg_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'PB.AKRU' as modul,a.no_akru as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from kop_pbrgakru_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'PB.BILL' as modul,a.no_bill as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from kop_pbrgbill_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'PB.ANGS' as modul,a.no_angs as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from kop_pbrgangs_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'PB.INV' as modul,a.no_inv as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from kop_pbrginv_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' ";
				}
				if (this.cb_status.getText() == "KP.PINJ"){
					var pageCount = this.dbLib.getRowCount("select count(x.no_bukti) from "+
														   "(select a.no_bill as no_bukti "+
														   "from kop_pinjbill_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_angs as no_bukti "+
														   "from kop_pinjangs_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_inv as no_bukti "+
														   "from kop_pinjinv_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   ") x ", nilaiToFloat(this.eJml.getText()));																   
					this.scriptSql = " select 'INPROG' as status,'PJ.BILL' as modul,a.no_bill as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from kop_pinjbill_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'PJ.ANGS' as modul,a.no_angs as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from kop_pinjangs_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
									 "union "+
									 " select 'INPROG' as status,'PJ.INV' as modul,a.no_inv as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
									 " from kop_pinjinv_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' ";
				}
				if (this.cb_status.getText() == "KP.SIMP"){
					var pageCount = this.dbLib.getRowCount("select count(x.no_bukti) from "+
														   "(select a.no_bill as no_bukti "+
														   "from kop_simpbill_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_angs as no_bukti "+
														   "from kop_simpangs_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_inv as no_bukti "+
														   "from kop_simpinv_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_pinbuk as no_bukti "+
														   "from kop_simpbuk_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_pbdepo as no_bukti "+
														   "from kop_pbdepo_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "select a.no_bunga as no_bukti "+
														   "from kop_simpbunga_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' "+
														   ") x ", nilaiToFloat(this.eJml.getText()));																   
					
					this.scriptSql = " select 'INPROG' as status,'KP.BILL' as modul,a.no_bill as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
								 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
								 " from kop_simpbill_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
								 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
								 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
								 "union "+
								 " select 'INPROG' as status,'KP.ANGS' as modul,a.no_angs as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
								 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
								 " from kop_simpangs_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
								 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
								 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
								 "union "+
								 " select 'INPROG' as status,'KP.INV' as modul,a.no_inv as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
								 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
								 " from kop_simpinv_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
								 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
								 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
								 "union "+
								 " select 'INPROG' as status,'KP.PBS' as modul,a.no_pinbuk as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
								 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
								 " from kop_simpbuk_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi  "+
								 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
								 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
								 "union "+
								 " select 'INPROG' as status,'KP.PBDP' as modul,a.no_pbdepo as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
								 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
								 " from kop_pbdepo_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
								 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
								 "' and a.kode_lokasi ='"+this.app._lokasi+"' "+
								 "union "+
								 " select 'INPROG' as status,'KP.SBNG' as modul,a.no_bunga as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
								 "       a.keterangan,a.kode_curr,a.nilai as nilai "+
								 " from kop_simpbunga_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
								 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
								 "' and a.kode_lokasi ='"+this.app._lokasi+"' ";
								 
				}
				if (this.cb_status.getText() == "KP.SPB"){
					var pageCount = this.dbLib.getRowCount("select count(a.no_spb) "+
														   "from spb_m a "+
														   "where a.modul ='KP.SPB' and a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('1','2') ", nilaiToFloat(this.eJml.getText()));		
														   
					this.scriptSql = " select 'INPROG' as status,'KP.SPB' as modul,a.no_spb as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
								 "       a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai "+
								 " from spb_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
								 " where a.modul ='KP.SPB' and a.posted = 'F' and a.periode='"+this.ed_period.getText()+
								 "' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress in ('1','2')";			
				}
				if (this.cb_status.getText() == "A/P")
				{
					var pageCount = this.dbLib.getRowCount("select count(a.no_spb) "+
														   "from spb_m a "+
														   "where a.modul ='A/P' and a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('1','2') ", nilaiToFloat(this.eJml.getText()));		
					if (this.app._dbEng == "mysqlt")
					{
						this.scriptSql = " select 'INPROG' as status,'A/P' as modul,a.no_spb as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn-a.nilai_pot as nilai "+
									 " from spb_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.modul ='A/P' and a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress in ('1','2')";			
					}			
				}
				if (this.cb_status.getText() == "DEPOSITO")
				{
					var pageCount = this.dbLib.getRowCount(" select count(a.no_akru) "+
														   " from depo_akru_m a  "+
														   " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
														   "       a.kode_lokasi='"+this.app._lokasi+"'", nilaiToFloat(this.eJml.getText()));		
					this.scriptSql = " select 'INPROG' as status,'DEPOSITO' as modul,a.no_akru as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									     "        a.keterangan,a.kode_curr,a.nilai "+
									     " from depo_akru_m a "+
									     "              left outer join pp b on b.kode_pp=a.kode_pp and b.kode_lokasi=a.kode_lokasi "+
									     " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									     "       a.kode_lokasi ='"+this.app._lokasi+"'";								
				}
				if (this.cb_status.getText() == "ASSET")
				{
					var pageCount = this.dbLib.getRowCount("select count(x.no_bukti) "+
														   "from ( "+
														   "  select no_faapp as no_bukti from fa_app where posted = 'F' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "  select no_fasusut as no_bukti from fasusut_m where posted = 'F' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "  select no_kirim as no_bukti from famutkirim_m where kode_lokasi <> lokasi_tuj and posted = 'F' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "  select no_terima as no_bukti from famutterima_m where kode_lokasi <> lokasi_asal and posted = 'F' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
														   "union "+
														   "  select no_woapp as no_bukti from fawoapp_m where posted = 'F' and periode='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
														   ") x", nilaiToFloat(this.eJml.getText()));		
					this.scriptSql = "   select 'INPROG' as status,'AS.APP' as modul,a.no_faapp as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
										 "          a.keterangan,a.kode_curr,a.nilai "+
										 "   from fa_app a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
										 "   where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
										 "union"+	
										 "   select 'INPROG' as status,'AS.SST' as modul,a.no_fasusut as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
										 "          a.keterangan,a.kode_curr,a.nilai "+
										 "   from fasusut_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
										 "   where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
										 "union"+	
										 "   select 'INPROG' as status,'AS.KRM' as modul,a.no_kirim as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
										 "          a.keterangan,a.kode_curr,a.nilai "+
										 "   from famutkirim_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
										 "   where a.kode_lokasi <> a.lokasi_tuj and a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
										 "union"+	
										 "   select 'INPROG' as status,'AS.TRM' as modul,a.no_terima as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
										 "          a.keterangan,a.kode_curr,a.nilai "+
										 "   from famutterima_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
										 "   where a.kode_lokasi <> a.lokasi_asal and a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
										 "union"+	
										 "   select 'INPROG' as status,'AS.WO' as modul,a.no_woapp as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
										 "          a.keterangan,a.kode_curr,a.nilai "+
										 "   from fawoapp_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi  "+
										 "   where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";					
				}
				if (this.cb_status.getText() == "SPB")
				{
					var pageCount = this.dbLib.getRowCount("select count(a.no_spb) "+
														   "from spb_m a "+
														   "where a.modul ='SPB' and a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('1','2') ", nilaiToFloat(this.eJml.getText()));		
					this.scriptSql = " select 'INPROG' as status,'SPB' as modul,a.no_spb as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai+a.nilai_ppn as nilai "+
									 " from spb_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
									 " where a.modul ='SPB' and a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress in ('1','2')";								
				}
				if (this.cb_status.getText() == "FF.PTG")
				{
					var pageCount = this.dbLib.getRowCount(" select count(a.no_ffptg) "+
														   " from ffptg_m a "+
														   " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
														   "       a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'", nilaiToFloat(this.eJml.getText()));		
					this.scriptSql = " select 'INPROG' as status,'FF.PTG' as modul,a.no_ffptg as no_bukti,a.no_ff as no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									     "        a.keterangan,a.kode_curr,a.nilai "+
									     " from ffptg_m a inner join ff_m c on a.no_ff=c.no_ff and a.kode_lokasi=c.kode_lokasi "+
									     "              left outer join pp b on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
									     " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									     "       a.progress = '2' and a.kode_lokasi ='"+this.app._lokasi+"'";								
				}
				if (this.cb_status.getText() == "IF.PTG")
				{
					var pageCount = this.dbLib.getRowCount(" select count(a.no_ifptg) "+
														   " from ifptg_m a "+
														   " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
														   "       a.progress in ('1','2') and a.kode_lokasi='"+this.app._lokasi+"'", nilaiToFloat(this.eJml.getText()));		
					this.scriptSql = " select 'INPROG' as status,'IF.PTG' as modul,a.no_ifptg as no_bukti,a.no_if as no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									     "        a.keterangan,a.kode_curr,a.nilai "+
									     " from ifptg_m a inner join if_m c on a.no_if=c.no_if and a.kode_lokasi=c.kode_lokasi "+
									     "              left outer join pp b on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
									     " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									     "       a.progress in ('1','2') and a.kode_lokasi ='"+this.app._lokasi+"'";								
				}
				if (this.cb_status.getText() == "PJ.PTG")
				{
					var pageCount = this.dbLib.getRowCount(" select count(a.no_ptg) "+
														   " from ptg_m a "+
														   " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
														   "       a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'", nilaiToFloat(this.eJml.getText()));		
					this.scriptSql = " select 'INPROG' as status,'PJ.PTG' as modul,a.no_ptg as no_bukti,a.no_pj as no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									     "        a.keterangan,a.kode_curr,a.nilai "+
									     " from ptg_m a inner join panjar_m c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasi "+
									     "              left outer join pp b on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
									     " where a.no_pj<>'PROYEK' and a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									     "       a.progress = '2' and a.kode_lokasi ='"+this.app._lokasi+"'";								
				}
				if (this.cb_status.getText() == "PR.PTG")
				{
					var pageCount = this.dbLib.getRowCount(" select count(a.no_ptg) "+
														   " from ptg_m a "+
														   " where a.no_pj='PROYEK' and a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
														   "       a.progress in ('2','3') and a.kode_lokasi='"+this.app._lokasi+"'", nilaiToFloat(this.eJml.getText()));		
					this.scriptSql = " select 'INPROG' as status,'PR.PTG' as modul,a.no_ptg as no_bukti,a.no_pj as no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									     "        a.keterangan,a.kode_curr,a.nilai "+
									     " from ptg_m a "+
									     "              left outer join pp b on b.kode_pp=a.kode_pp and b.kode_lokasi=a.kode_lokasi "+
									     " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									     "       a.progress in ('2','3') and a.kode_lokasi ='"+this.app._lokasi+"'";								
				}
				if (this.cb_status.getText() == "KB")
				{
					var pageCount = this.dbLib.getRowCount(" select count(a.no_kas) "+
														   " from kas_m a  "+
														   " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
														   "       a.kode_lokasi='"+this.app._lokasi+"'", nilaiToFloat(this.eJml.getText()));		
					this.scriptSql = " select 'INPROG' as status,'KB' as modul,a.no_kas as no_bukti,a.ref1 as no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									     "        a.keterangan,a.kode_curr,a.nilai "+
									     " from kas_m a "+
									     "              left outer join pp b on b.kode_pp=a.kode_pp and b.kode_lokasi=a.kode_lokasi "+
									     " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									     "       a.kode_lokasi ='"+this.app._lokasi+"' order by a.no_kas";					
				}
				if (this.cb_status.getText() == "JU")
				{
					var pageCount = this.dbLib.getRowCount("select count(a.no_ju) "+
														   "from ju_m a "+
														   "where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
														   "' and a.kode_lokasi='"+this.app._lokasi+"'", nilaiToFloat(this.eJml.getText()));
					
					this.scriptSql = " select 'INPROG' as status,'JU' as modul,a.no_ju as no_bukti,a.no_dokumen,ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									 "       a.keterangan,a.kode_curr,a.nilai "+
									 " from ju_m a left outer join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									 " where a.posted = 'F' and a.periode='"+this.ed_period.getText()+
									 "' and a.kode_lokasi ='"+this.app._lokasi+"'";
											
				}
				if (this.cb_status.getText() == "ARMHS"){
					this.scriptSql = "select distinct 'INPROG' as status,'AR.AMOR' as modul,a.no_gen as no_bukti,a.no_gen as no_dokumen "+
									"		  ,  ifnull(b.nama,'-') as nama_pp,a.tanggal, "+
									"		  a.keterangan,'IDR' as kode_curr,sum(nilai) as nilai "+
									" from ar_amor a "+
									"		  left outer join pp b on b.kode_pp = a.kode_pp and b.kode_lokasi = a.kode_lokasi "+
									" where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									"       a.kode_lokasi='"+this.app._lokasi+"'" +
									"	group by a.no_gen, a.tanggal, a.keterangan "+
									"	union all"+								
									"	select distinct 'INPROG' as status,'AR.MHS' as modul,a.no_invoice as no_bukti,a.no_invoice as no_dokumen"+
									"		  ,  ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									"		  a.keterangan,'IDR' as kode_curr,a.nilai as nilai"+
									"	from armhs_m a"+
									"		  inner join armhs_d c on c.no_invoice = a.no_invoice and c.kode_lokasi = a.kode_lokasi"+
									"		  inner join produk e on e.kode_produk = c.kode_produk and e.kode_lokasi = c.kode_lokasi"+
									"		  left outer join pp b on b.kode_pp = e.kode_pp and b.kode_lokasi = a.kode_lokasi"+
									" where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									"       a.kode_lokasi='"+this.app._lokasi+"'"+
									"	union all"+
									"	select distinct 'INPROG' as status,'AR.BD' as modul,a.no_susut as no_bukti,a.no_susut as no_dokumen"+
									"		  ,  ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									"		  a.keterangan,'IDR' as kode_curr,sum(nilai) as nilai"+
									"	from ar_susut a"+
									"		  left outer join pp b on b.kode_pp = a.kode_pp and b.kode_lokasi = a.kode_lokasi "+
									" where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									"       a.kode_lokasi='"+this.app._lokasi+"'"+
									"	group by a.no_susut, a.tanggal, a.keterangan"+
									"	union all"+
									"	select distinct 'INPROG' as status,'AR.WO' as modul,a.no_wo as no_bukti,a.no_wo as no_dokumen"+
									"		  ,  ifnull(b.nama,'-') as nama_pp,a.tanggal,"+
									"		  a.keterangan,'IDR' as kode_curr,sum(nilai) as nilai"+
									"	from ar_wo a"+
									"		  left outer join pp b on b.kode_pp = a.kode_pp and b.kode_lokasi = a.kode_lokasi "+
									" where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									"       a.kode_lokasi='"+this.app._lokasi+"'"+
									"	group by a.no_wo, a.tanggal, a.keterangan"+
									"	union all"+									
									"	select distinct 'INPROG' as status,'AR.KB' as modul,a.no_buktikas as no_bukti,a.no_buktikas as no_dokumen "+
									"		  ,  '-'as nama_pp,a.tanggal "+
									"		  , a.keterangan,'IDR' as kode_curr,a.nilai_kasbank as nilai "+
									"	from arkb_m a " +
									" where a.posted = 'F' and a.periode='"+this.ed_period.getText()+"' and "+
									"       a.kode_lokasi='"+this.app._lokasi+"'";
					var pageCount = this.dbLib.getRowCount(" select count(*) "+
														   " from ("+this.scriptSql+") a  ", nilaiToFloat(this.eJml.getText()));		
					
									
				}						
				this.dbLib.listData(this.scriptSql, 1, nilaiToFloat(this.eJml.getText()));
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
		}catch(e)
		{
			systemAPI.alert(e);
		}
	},
	doEditChange: function(sender){
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if (this.ed_period.getText() != "") this.bGen.click();
		}
		
		if (sender == this.cb_status)
		{
			this.sg1.clear();  this.sg1.appendRow(); 
			//this.sg2.clear();  this.sg2.appendRow();
		}
	},
	sg1ondblclick: function(sender, col , row){		
		if (this.sg1.getCell(0,row) != "") {	
			if (this.sg1.getCell(1,row) == "AR.PRKB"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_proyekbayar_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_bukti = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "AR.PRAK"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_arproyek_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_ar = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "AP.KJPE"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_apkjpe_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_kjpe = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "AP.AKRU"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_ap_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_ap = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "AR.REKN"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_rekon_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_rekon = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "AR.UMKB"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_arbayar_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_bukti = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "AR.UMAK"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_ar_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_ar = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PB.INV"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pbrginv_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_inv = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PB.ANGS"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pbrgangs_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_angs = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PB.BILL"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pbrgbill_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_bill = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PB.AKRU"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pbrgakru_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_akru = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PB.KONT"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pbrg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_pbrg = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PB.JUAL"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_jual_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_jual = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PJ.INV"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pinjinv_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_inv = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PJ.ANGS"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pinjangs_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_angs = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "PJ.BILL"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pinjbill_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_bill = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "KP.SBNG"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_simpbunga_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_bunga = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "KP.PBDP"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_pbdepo_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_pbdepo = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "KP.PBS"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_simpbuk_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_pinbuk = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "KP.INV"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_simpinv_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_inv = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "KP.ANGS"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_simpangs_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_angs = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "KP.BILL"){
					var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kop_simpbill_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_bill = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");
			}
			if (this.sg1.getCell(1,row) == "A/P") 
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_spb = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "DEPOSITO") 
			{							
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   depo_akru_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_akru = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "AR.MHS" || this.sg1.getCell(1,row) == "AR.AMOR"  || this.sg1.getCell(1,row) == "AR.WO" ||
				this.sg1.getCell(1,row) == "AR.BD" || this.sg1.getCell(1,row) == "AR.BYR" || this.sg1.getCell(1,row) == "AR.KB") 
			{			
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   armhs_j a left outer join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_bukti = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");							
			}
			if (this.sg1.getCell(1,row) == "AS.WO") 
			{			
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   fawoapp_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_woapp = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "AS.TRM") 
			{			
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   famutterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_terima = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'  order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "AS.KRM") 
			{			
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   famutkirim_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_kirim = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "AS.APP") 
			{
				
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   fa_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_faapp = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "AS.SST") 
			{
				
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   fasusut_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_fasusut = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if ((this.sg1.getCell(1,row) == "SPB") || (this.sg1.getCell(1,row) == "KP.SPB"))
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_spb = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "FF.PTG") 
			{	
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   ffptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_ffptg = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "IF.PTG") 
			{	
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   ifptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_ifptg = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "PJ.PTG" || this.sg1.getCell(1,row) == "PR.PTG" ) 
			{	
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   ptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_ptg = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "KB")  
			{	
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_kas = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}
			if (this.sg1.getCell(1,row) == "JU") 
			{
				
				var temp = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
				                                "       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												"from   ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
												"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
												"where a.no_ju = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc");				
			}				
			if (temp instanceof portalui_arrayMap)
			{
				for (var i in temp.objList)
				{
					temp.get(i).set("nilai",nilaiToFloat(format_number(temp.get(i).get("nilai"),2,',','.')));
				}												
				this.sg2.setData(temp,true,10);
				this.sgNav2.setTotalPage(this.sg2.pageCount);				
				this.sgNav2.rearrange();
				this.sgNav2.activePage = 0;
			}else systemAPI.alert(rs);
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_pembuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Petugas Posting",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' ", //and kode_pp='"+this.app._kodePP+"'
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' ", //and kode_pp='"+this.app._kodePP+"'
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
							this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
							//this.app._mainForm.bClear.click();         error  progress bar atas ....   
							this.standarLib.clearByTag(this, new Array("0","1","2"),undefined);				
							this.sg1.clear(); this.sg1.appendRow();
							this.sg2.clear();						
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
								//buat koma value[8]=format_number(parseFloat(value[8]),2,',','.');
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
							system.info(this,"Data tidak ditemukan.","Jenis transaksi "+this.cb_status.getText()+" tidak ada yang siap posting.");
							this.sg1.appendRow();
							return false;
				        }  
					break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doPager: function(sender, page){
		this.sg2.selectPage(page);
	}
});
