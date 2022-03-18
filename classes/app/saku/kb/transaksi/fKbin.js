window.app_saku_kb_transaksi_fKbin = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_fKbin.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_fKbin";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Form KasBank Masuk Modul: Input",0);
		
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
		
		uses("portalui_datePicker;util_dbLarge;app_saku_fJurnalViewer");
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
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
		
		this.eTambah = new portalui_saiLabelEdit(this);
		this.eTambah.setLeft(622);
		this.eTambah.setTop(166);
		this.eTambah.setWidth(298);
		this.eTambah.setLabelWidth(150);
		this.eTambah.setTipeText(ttNilai);
		this.eTambah.setAlignment(alRight);
		this.eTambah.setCaption("Nilai Tambah");
		this.eTambah.setText("0"); 
		this.eTambah.setReadOnly(true);

		this.cb_status = new portalui_saiCB(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(188);
		this.cb_status.setWidth(185);
		this.cb_status.setCaption("Jenis Dokumen");
		this.cb_status.setText("");
		this.cb_status.addItem(0,"PJ.PTG");
		this.cb_status.addItem(1,"PR.PTG");
		this.cb_status.addItem(2,"IF.CLS");
		this.cb_status.addItem(3,"DP.TRM");
		this.cb_status.addItem(4,"BUDEP");
		this.cb_status.addItem(5,"DEPO");
		this.cb_status.addItem(6,"SP");
		this.cb_status.addItem(7,"KP.SIMP");
		this.cb_status.addItem(8,"KP.PINJ");
		this.cb_status.addItem(9,"KP.PBRG");
		this.cb_status.addItem(10,"AR.UMUM");
		this.cb_status.addItem(11,"AR.PROYEK");
		this.cb_status.addItem(12,"AP.BANK");		
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(205);
		this.bShow.setTop(188);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(256);
		this.bPAll.setTop(210);
		this.bPAll.setCaption("APP All");
		this.bPAll.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.bTambah = new portalui_button(this,{bound:[350,210,80,18],caption:"Jurnal +",click:[this,"doTambahClick"]});		
		
		this.ed_giro = new portalui_saiLabelEdit(this);
		this.ed_giro.setLeft(20);
		this.ed_giro.setTop(210);
		this.ed_giro.setWidth(230);
		this.ed_giro.setCaption("No BG / Cheque");
		this.ed_giro.setText(""); 
		this.ed_giro.setReadOnly(false);
		this.ed_giro.setLength(50);
		this.ed_giro.setTag("1");		
		
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
	    this.p1.setCaption('Daftar Dokumen Ref. Kas Bank Masuk');
		
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(215);
		this.sg1.setColCount(14);
		this.sg1.setColTitle(["Status","Catatan","Modul","No Dokumen","PP","Tgl Dok.","Due Date","Deskripsi","Currency","Nilai","Permohonan","Peruntukan","Akun Temp","Penerima"]);
		this.sg1.setColWidth([13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,100,100,60,200,60,60,120,120,80,200,60]);
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
		
		this.p2  = new portalui_panel(this,{bound:[20,480,900,170],caption:"Jurnal Tambahan", visible: false});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,120],colCount:7,tag:2,
			    colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP"],
				colWidth:[[6,5,4,3,2,1,0],[120,80,140,60,280,100,80]],colFormat:[[4],[cfNilai]],
				columnReadOnly:[true,[1],[0,2,3,4,5,6]],ellipsClick:[this,"doEllipseClick2"],
				change:[this,"doChangeCell2"],buttonStyle:[[0,3,5],[bsEllips,bsAuto,bsEllips]],
				picklist:[[3],[new portalui_arrayMap({items:["D","C"]})]],selectCell:[this,"doSelectCell2"],
				defaultRow:1,nilaiChange:[this, "doSgChange2"],autoAppend:true});				
			this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,142,900,25],buttonStyle:2,grid:this.sg2});				
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
			this.bGen.onClick.set(this, "genClick");
			this.eTambah.onChange.set(this, "doEditChange");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_status.onChange.set(this,"doEditChange");
			this.cb_akun.onChange.set(this,"doEditChange");
			this.bShow.onClick.set(this, "showClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sgNav.onPager.set(this, "doSelectedPage");
			
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.baris = this.app._baris;
			var sql = new server_util_arrayList();
			sql.add("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' and block = '0'");
			sql.add("select kode_pp, nama from pp where tipe ='posting' and kode_lokasi ='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			this.akunkb = "";
			this.dbLarge = new util_dbLarge();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_fKbin.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_fKbin.prototype.mainButtonClick = function(sender)
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
window.app_saku_kb_transaksi_fKbin.prototype.simpan = function()
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.sg1.getCell(5,i))) && (this.sg1.getCell(0,i) == "APP"))
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
	this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
	if (this.standarLib.checkEmptyByTag(this, new Array("0","9")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
					"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.akunkb+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+(this.app._pp.split(";"))[0]+"','KBI_ALL','"+this.cb_jenis.getText()+"','"+this.ed_period.getText()+
					"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pembuat.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','"+this.cb_status.getText()+"','"+this.cb_akun.getText()+"')");
					
			sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
						"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.akunkb+
						"','"+this.ed_desc.getText()+"','D',"+parseNilai(this.ed_nilai.getText())+",'"+(this.app._pp.split(";"))[0]+"','-','-',"+
						"'"+this.app._lokasi+"','KBI_ALL','KAS',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
						
			var idx =999;
			if (this.p2.visible == true) {
				if (this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){
							sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
									"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.sg2.cells(0,i)+
									"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','-','-',"+
									"'"+this.app._lokasi+"','KBI_ALL','ADD',"+
									"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
									",'"+this.app._userLog+"',now(),'-')");
							idx++;
						}
					}						
				}
			}
			var vtmaster,vtabel,vbukti = "";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{					
				if (this.sg1.getCell(0,i) == "APP")
				{
					if ((this.sg1.getCell(2,i) == "DEPO") || (this.sg1.getCell(2,i) == "BUDEP") || (this.sg1.getCell(2,i) == "PJ.PTG")||(this.sg1.getCell(2,i) == "DP.TRM")){
						if (this.sg1.getCell(2,i) == "PJ.PTG") {vtmaster = "ptg_m";       vtabel = "ptg_j";      vbukti = "no_ptg";   };
						if (this.sg1.getCell(2,i) == "DP.TRM") {vtmaster = "droptrm_m";   vtabel = "droptrm_j";  vbukti = "no_terima";};
						if (this.sg1.getCell(2,i) == "BUDEP")  {vtmaster = "depo_d";      vtabel = "depo_j";     vbukti = "no_terima";};
						if (this.sg1.getCell(2,i) == "DEPO")   {vtmaster = "depocair_m";  vtabel = "depocair_j"; vbukti = "no_cair";};
						
						sql.add("update "+vtmaster+" set no_kas='"+this.ed_nb.getText()+"',posted = 'T',progress='2' where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',no_urut+1,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from "+vtabel+" where "+vbukti+"='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}					
					if (this.sg1.getCell(2,i) == "PR.PTG"){
						sql.add("update ptg_m set progress='3' where no_ptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDateString()+"',99,akun_pj,keterangan,'C',nilai_kas,kode_pp,'-','-',"+
		 					    "  kode_lokasi,modul,'PR.PTG','"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from ptg_m where no_ptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					}
					if (this.sg1.getCell(2,i) == "IF.CLS"){
						sql.add("update ifptg_m set no_kas='"+this.ed_nb.getText()+"',progress='3' where no_ifptg='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDateString()+"',99,a.akun_if,a.keterangan,'C',a.nilai,a.kode_pp,'-','-',"+
		 					    "  a.kode_lokasi,'IFPTG_P','IFCLS','"+this.ed_period.getText()+"',a.kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from if_m a inner join ifptg_m b on a.no_if=b.no_if and a.kode_lokasi=b.kode_lokasi where b.no_ifptg='"+this.sg1.getCell(3,i)+"' and b.kode_lokasi='"+this.app._lokasi+"'"); 
						if (this.sg1.getCell(12,i) != "0") { //ada (ditemukan) nilai beban reimburs
							sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
									"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDateString()+"',98,b.akun_ap,b.keterangan,'D',b.nilai,a.kode_pp,'-','-',"+
									"  b.kode_lokasi,'IFPTG_P','HUTIF','"+this.ed_period.getText()+"',b.kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
									"  from if_m a inner join ifptg_m b on a.no_if=b.no_if and a.kode_lokasi=b.kode_lokasi where b.no_ifptg='"+this.sg1.getCell(3,i)+"' and b.kode_lokasi='"+this.app._lokasi+"'"); 
						}
					}
					if (this.sg1.getCell(2,i) == "KP.SIMP"){
						sql.add("update kop_simpsetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_simpsetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ANGS_AR'"); //kalo di jurnal di setoran ---> and jenis= 'TAK' diubah menjadi -------------->>>> and jenis='ANGS_AR'
					}
					if (this.sg1.getCell(2,i) == "KP.PINJ"){
						sql.add("update kop_pinjsetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_pinjsetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ANGS_AR'"); //kalo di jurnal di setoran ---> and jenis= 'TAK' diubah menjadi -------------->>>> and jenis='ANGS_AR'
					}
					if (this.sg1.getCell(2,i) == "KP.PBRG"){
						sql.add("update kop_pbrgsetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_pbrgsetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ANGS_AR'"); //kalo di jurnal di setoran ---> and jenis= 'TAK' diubah menjadi -------------->>>> and jenis='ANGS_AR'
					}
					if (this.sg1.getCell(2,i) == "AR.UMUM"){
						sql.add("update kop_arsetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_arsetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ARUM_AR'"); //kalo di jurnal di setoran ---> and jenis= 'TAK' diubah menjadi -------------->>>> and jenis='ANGS_AR'
					}
					if (this.sg1.getCell(2,i) == "AP.BANK"){
						sql.add("update kop_ap_m set tgl_angsur='"+this.dp_tgl1.getDate()+"', progress='2' where no_ap='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,akun_im,keterangan,'C',nilai,kode_pp,'-','-',"+
		 					    "  kode_lokasi,'APBANK','ARIM','"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_ap_m where no_ap='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}
					if (this.sg1.getCell(2,i) == "AR.PROYEK"){
						sql.add("update kop_proyeksetor_m set progress='2' where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
		 					    "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"  select '"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.dp_tgl1.getDate()+"',1,kode_akun,keterangan,'C',nilai,kode_pp,kode_drk,'-',"+
		 					    "  kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now() "+
								"  from kop_proyeksetor_j where no_setor='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='ARPR_AR'"); 
					}
					sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi) values "+
							"                 ('"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(1,i)+"','-','"+this.app._lokasi+"')");
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
window.app_saku_kb_transaksi_fKbin.prototype.doModalResult = function(event, modalResult)
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
				
				this.eTambah.setText("0");
				this.sg2.setTag(4);
				this.sg2.clear(1);
				this.sg2.setTag(5);
				this.sg2.validasi();
				this.p2.setVisible(false);
			}
			break;
			
		case "simpan" :
			if (this.p2.visible == true) this.sg2.setTag(0);
			else this.sg2.setTag(5);
			
			this.sg1.validasi();
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
};
window.app_saku_kb_transaksi_fKbin.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"APP");
	}
	this.sg1.validasi();
};
window.app_saku_kb_transaksi_fKbin.prototype.doSelectedPage = function(sender, page)
{
	this.dbLib.listData(this.scriptSql, page, this.baris);
};
window.app_saku_kb_transaksi_fKbin.prototype.showClick = function(sender)
{
	try
	{
		this.sg1.clear(); this.sg1.appendRow();
		this.sg1.validasi();
		if ((this.cb_status.getText() != "") && (this.cb_curr.getText() != "")){
			if (this.cb_status.getText() == "SP"){
				var pageCount = this.dbLib.getRowCount("select count(a.no_bukti) from "+
				                 " (select no_setor as no_bukti from kop_simpsetor_m where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai>0 "+
								 "  union "+
								 "  select no_setor as no_bukti from kop_pinjsetor_m where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai>0 "+
								 "  union "+
								 "  select no_setor as no_bukti from kop_pbrgsetor_m where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai>0 "+
								 " )a",this.baris);
				this.scriptSql = " select 'INPROG' as status,'-' as catatan,'KP.SIMP' as modul,x.no_setor,ifnull(b.nama,'-') as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,x.akun_tak as kode_akun,'-' as nik_app "+
								 " from kop_simpsetor_m x "+
								 "              left outer join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=x.nik_app and x.kode_lokasi=c.kode_lokasi "+
								 " where x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='0'  and no_del='-' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai>0 "+
								 " union "+
								 " select 'INPROG' as status,'-' as catatan,'KP.PINJ' as modul,x.no_setor,b.nama as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,x.akun_tak as kode_akun,'-' as nik_app "+
								 " from kop_pinjsetor_m x "+
								 "              inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=x.nik_app and x.kode_lokasi=c.kode_lokasi "+
								 " where x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='0'  and no_del='-' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai>0 "+
								 " union "+
								 " select 'INPROG' as status,'-' as catatan,'KP.PBRG' as modul,x.no_setor,b.nama as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,x.akun_tak as kode_akun,'-' as nik_app "+
								 " from kop_pbrgsetor_m x "+
								 "              inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=x.nik_app and x.kode_lokasi=c.kode_lokasi "+
								 " where x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='0'  and no_del='-' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai>0 "+
								 " order by no_setor";				 
			}
			if (this.cb_status.getText() == "AR.PROYEK"){
				var pageCount = this.dbLib.getRowCount(" select count(no_setor) from kop_proyeksetor_m "+
								 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai>0",this.baris);
				this.scriptSql = " select 'INPROG' as status,'-' as catatan,'AR.PROYEK' as modul,x.no_setor,b.nama as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,x.akun_tak as kode_akun,'-' as nik_app "+
								 " from kop_proyeksetor_m x "+
								 "              inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=x.nik_app and x.kode_lokasi=c.kode_lokasi "+
								 " where x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='0'  and no_del='-' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai>0 "+
								 " order by x.no_setor";
			}
			if (this.cb_status.getText() == "AP.BANK"){
				var pageCount = this.dbLib.getRowCount(" select count(no_ap) from kop_ap_m "+
								 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",this.baris);					
				this.scriptSql = " select 'INPROG' as status,'-' as catatan,'AP.BANK' as modul,a.no_ap,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_im as kode_akun,a.nik_app "+
								 " from kop_ap_m a inner join karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi "+
								 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='0' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								 " order by a.no_ap";
			}
			if (this.cb_status.getText() == "AR.UMUM"){
				var pageCount = this.dbLib.getRowCount(" select count(no_setor) from kop_arsetor_m "+
								 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai>0",this.baris);
				this.scriptSql = " select 'INPROG' as status,'-' as catatan,'AR.UMUM' as modul,x.no_setor,b.nama as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,x.akun_tak as kode_akun,'-' as nik_app "+
								 " from kop_arsetor_m x "+
								 "              inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=x.nik_app and x.kode_lokasi=c.kode_lokasi "+
								 " where x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='0'  and no_del='-' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai>0 "+
								 " order by x.no_setor";
			}
			if (this.cb_status.getText() == "KP.PBRG"){
				var pageCount = this.dbLib.getRowCount(" select count(no_setor) from kop_pbrgsetor_m "+
								 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai>0",this.baris);
				this.scriptSql = " select 'INPROG' as status,'-' as catatan,'KP.PBRG' as modul,x.no_setor,b.nama as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,x.akun_tak as kode_akun,'-' as nik_app "+
								 " from kop_pbrgsetor_m x "+
								 "              inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=x.nik_app and x.kode_lokasi=c.kode_lokasi "+
								 " where x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='0'  and no_del='-' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai>0 "+
								 " order by x.no_setor";
			}
			if (this.cb_status.getText() == "KP.PINJ"){
				var pageCount = this.dbLib.getRowCount(" select count(no_setor) from kop_pinjsetor_m "+
								 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai>0",this.baris);
				this.scriptSql = " select 'INPROG' as status,'-' as catatan,'KP.PINJ' as modul,x.no_setor,ifnull(b.nama,'-') as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,x.akun_tak as kode_akun,'-' as nik_app "+
								 " from kop_pinjsetor_m x "+
								 "              left outer join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=x.nik_app and x.kode_lokasi=c.kode_lokasi "+
								 " where x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='0'  and no_del='-' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai>0 "+
								 " order by x.no_setor";
			}
			if (this.cb_status.getText() == "KP.SIMP"){
				var pageCount = this.dbLib.getRowCount(" select count(no_setor) from kop_simpsetor_m "+
								 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and no_del='-' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai>0",this.baris);
				this.scriptSql = " select 'INPROG' as status,'-' as catatan,'KP.SIMP' as modul,x.no_setor,ifnull(b.nama,'-') as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,x.akun_tak as kode_akun,'-' as nik_app "+
								 " from kop_simpsetor_m x "+
								 "              left outer join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=x.nik_app and x.kode_lokasi=c.kode_lokasi "+
								 " where x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='0'  and no_del='-' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai>0 "+
								 " order by x.no_setor";
			}
			if (this.cb_status.getText() == "PJ.PTG")
			{
				var pageCount = this.dbLib.getRowCount(" select count(no_ptg) from ptg_m "+
								 " where no_pj<>'PROYEK' and kode_curr = '"+this.cb_curr.getText()+"' and progress='1' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai_kas>0",this.baris);					
				this.scriptSql = " select 'INPROG' as status,f.catatan,'PJ.PTG' as modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
								 "        a.due_date,x.keterangan,x.kode_curr,x.nilai_kas as nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_pj as kode_akun,a.nik_pengaju "+
								 " from ptg_m x inner join panjar_m a on x.no_pj=a.no_pj and a.kode_lokasi=x.kode_lokasi "+
								 "              inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "              inner join karyawan c on c.nik=a.nik_pengaju and a.kode_lokasi=c.kode_lokasi "+
								 "              inner join ver_d f on f.no_bukti=x.no_ptg and f.modul='PJ.PTG' and f.no_del = '-' "+
								 " where x.no_pj<>'PROYEK' and x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='1' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai_kas>0 "+
								 " order by x.no_ptg";
			}
			if (this.cb_status.getText() == "PR.PTG")
			{
				var pageCount = this.dbLib.getRowCount(" select count(no_ptg) from ptg_m "+
								 " where no_pj='PROYEK' and kode_curr = '"+this.cb_curr.getText()+"' and progress='2' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai_kas>0",this.baris);					
				this.scriptSql = " select 'INPROG' as status,f.catatan,'PR.PTG' as modul,x.no_ptg,b.nama as nama_pp,x.tanggal,"+
								 "        x.tanggal as due_date,x.keterangan,x.kode_curr,x.nilai_kas as nilai, "+
								 "        '-' as pemohon, '-' as peruntukan,x.akun_pj as kode_akun,'-' as nik_pengaju "+
								 " from ptg_m x "+
								 "              inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "              inner join ver_d f on f.no_bukti=x.no_ptg and f.modul='PR.PTG' and f.no_del = '-' "+
								 " where x.no_pj='PROYEK' and x.kode_curr = '"+this.cb_curr.getText()+"' and x.progress='2' and x.periode<='"+this.ed_period.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.nilai_kas>0 "+
								 " order by x.no_ptg";
			}
			if (this.cb_status.getText() == "IF.CLS")
			{
				var pageCount = this.dbLib.getRowCount(" select count(no_ifptg) from ifptg_m "+
								 " where kode_curr = '"+this.cb_curr.getText()+"' and status='CLOSING' and progress='2' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nilai_kas>0",this.baris);					
				this.scriptSql = " select 'INPROG' as status,f.catatan,'IF.CLS' as modul,a.no_ifptg,b.nama as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai_kas as nilai, "+
								 "        c.nama as pemohon, a.status as peruntukan,a.nilai as kode_akun,a.nik_buat "+ //nilai diisi utk kontrol insert jenis hutif apakah ada reimbursan ato tidak
								 " from ifptg_m a "+
								 "                inner join if_m x on a.no_if=x.no_if and a.kode_lokasi=x.kode_lokasi "+
								 "				  inner join pp b on x.kode_pp=b.kode_pp and x.kode_lokasi=b.kode_lokasi "+
								 "                inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 "                inner join ver_d f on f.no_bukti=a.no_ifptg and f.modul='IF.PTG' and f.no_del = '-' "+
								 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.status='CLOSING' and a.progress='2' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								 " order by a.no_ifptg";
			}
			if (this.cb_status.getText() == "DP.TRM")
			{
				var pageCount = this.dbLib.getRowCount(" select count(no_terima) from droptrm_m "+
								 " where kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",this.baris);					
				this.scriptSql = " select 'INPROG' as status,'-' as catatan,'DP.TRM' as modul,a.no_terima,'-' as nama_pp,a.tanggal,"+
								 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
								 "        c.nama as pemohon, '-' as peruntukan,a.akun_tak as kode_akun,a.nik_buat "+
								 " from droptrm_m a inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
								 " where a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='0' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								 " order by a.no_terima";
			}
			if (this.cb_status.getText() == "BUDEP")
			{
				if (this.cb_akun.getText() == "") {
					system.alert(this,"Rekening KasBank harus dipilih dahulu.","Rek KB harus sesuai dengan dokumen bank bunga.");
					return false;
				}
				else
				{
					var pageCount = this.dbLib.getRowCount(" select count(no_terima) from depo_d "+
									 " where kode_bankcbunga='"+this.cb_akun.getText()+"' and modul = 'DEPCB_P' and kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",this.baris);					
					this.scriptSql = " select 'INPROG' as status,'-' as catatan,'BUDEP' as modul,a.no_terima,'-' as nama_pp,a.tgl_cair,"+
									 "        a.tgl_cair,a.keterangan,a.kode_curr,a.nilai_cair as nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_kas as kode_akun,a.nik_buat "+
									 " from depo_d a inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 " where a.kode_bankcbunga='"+this.cb_akun.getText()+"' and a.modul = 'DEPCB_P' and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='0' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " order by a.no_terima";
				}
			}
			if (this.cb_status.getText() == "DEPO")
			{
				if (this.cb_akun.getText() == "") {
					system.alert(this,"Rekening KasBank harus dipilih dahulu.","Rekening KB harus sesuai dengan dokumen bank tujuan cair.");
					return false;
				}
				else
				{
					var pageCount = this.dbLib.getRowCount(" select count(no_cair) from depocair_m "+
									 " where akun_kb='"+this.akunkb+"' and modul in ('DEPC_P','DEPCSB_P') and kode_curr = '"+this.cb_curr.getText()+"' and progress='0' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",this.baris);					
					this.scriptSql = " select 'INPROG' as status,'-' as catatan,'DEPO' as modul,a.no_cair,'-' as nama_pp,a.tanggal,"+
									 "        a.tanggal,a.keterangan,a.kode_curr,a.nilai, "+
									 "        c.nama as pemohon, '-' as peruntukan,a.akun_kb as kode_akun,a.nik_buat "+
									 " from depocair_m a inner join karyawan c on c.nik=a.nik_buat and a.kode_lokasi=c.kode_lokasi "+
									 " where a.akun_kb='"+this.akunkb+"' and a.modul in ('DEPC_P','DEPCSB_P') and a.kode_curr = '"+this.cb_curr.getText()+"' and a.progress='0' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 " order by a.no_cair";
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
	}catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_fKbin.prototype.genClick = function(sender)
{
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
};
window.app_saku_kb_transaksi_fKbin.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_kb_transaksi_fKbin.prototype.doEditChange = function(sender)
{
	if (sender == this.eTambah)
	{
		if (this.eTambah.getText() != "" && this.ed_nilai.getText() != "") {
			this.sg1.validasi();
		}
	}
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
			this.jenis = "BKM";
		}
		if (this.cb_jenis.getText() == "BANK")
		{
			this.jenis = "BBM";
		}
	}
	
	if (sender == this.cb_curr){
		this.cb_akun.setText("");
		if (this.cb_curr.getText() == "IDR"){	
			this.ed_kurs.setText("1");
			this.ed_kurs.setReadOnly(true);
		}
		else{
			this.ed_kurs.setReadOnly(false);
		}
	}
	
	if ((sender == this.cb_status) || (sender == this.cb_curr) || (sender == this.ed_period)) {
		this.sg1.clear();
		this.sg1.appendRow();
	}
};
window.app_saku_kb_transaksi_fKbin.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_akun) {
			if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
				this.standarLib.showListData2(this, "Daftar Akun Kas",this.cb_akun,undefined, 
										  "select  distinct c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
										  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
			} 
			else
				if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
				this.standarLib.showListData2(this, "Daftar Akun Bank",this.cb_akun,undefined, 
										  "select  distinct c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
										  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
										  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
										  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
			}
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
};
window.app_saku_kb_transaksi_fKbin.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(9,i) != "")
			{
				if (this.sg1.getCell(0, i) == "APP")					
					tot += nilaiToFloat(this.sg1.getCell(9,i));			
			}
		}
		if (this.eTambah.getText()!="") tot = tot + nilaiToFloat(this.eTambah.getText());
		this.ed_nilai.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[app_saku_kb_transaksi_fKbin]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_fKbin.prototype.doCellExit = function()
{
	this.sg1.validasi();
};
window.app_saku_kb_transaksi_fKbin.prototype.doTambahClick= function(sender){
	try{						
		if (this.p2.visible == false) {
			this.p2.setVisible(true);
		} else {
			this.eTambah.setText("0");
			this.sg1.validasi();
			this.sg2.setTag(4);
			this.sg2.clear(1);
			this.sg2.validasi();
			this.p2.setVisible(false);
		}
	}catch(e){
		systemAPI.alert(e);
	}
};

window.app_saku_kb_transaksi_fKbin.prototype.doEllipseClick2 = function(sender, col, row){
	try{						
		if (col == 0){
			this.standarLib.showListData(this, "Daftar Akun Jurnal Tambahan",sender,undefined, 
									  "select kode_akun, nama  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
									  "select count(kode_akun) from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
									  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
		}
		if (col == 5){
			this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
									  "select kode_pp, nama  from pp where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",
									  "select count(kode_pp)  from pp where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",
									  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
		}
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_saku_kb_transaksi_fKbin.prototype.doChangeCell2=function(sender, col, row){
	try{
		sender.onChange.set(undefined,undefined);
		if (col == 0) {
			var akun = this.dataAkun.get(sender.cells(0,row));
			if(akun)
				sender.cells(1,row,akun);
			else {                                    
				if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
				sender.cells(0,row,"");
				sender.cells(1,row,"");
			}
		}
		if ((col == 3) || (col == 4)){
			this.sg2.validasi();
		}
		sender.onChange.set(this,"doChangeCell2");
	}catch(e){ sender.onChange.set(this,"doChangeCell2");}
};
window.app_saku_kb_transaksi_fKbin.prototype.doSelectCell2 = function(sender, col, row){
	if ((col == 2) && (this.sg2.getCell(2,row) == "")){
		this.sg2.setCell(2,row,this.sg2.cells(1,row));
	}
};
window.app_saku_kb_transaksi_fKbin.prototype.doSgChange2 = function(sender, col, row){		
	var tot3 = 0;			
	if (this.p2.visible == true) {
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(4,i) != "") {
				if (this.sg2.cells(3,i) == "C")
					tot3 += nilaiToFloat(this.sg2.cells(4,i));
				else {if (this.sg2.cells(3,i) == "D") tot3 = tot3 - nilaiToFloat(this.sg2.cells(4,i));}
			}
		}
	}
	this.eTambah.setText(floatToNilai(tot3));
};


window.app_saku_kb_transaksi_fKbin.prototype.doRequestReady = function(sender, methodName, result)
{
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
					system.info(this,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
					if (this.jurnalViewer === undefined){
						this.jurnalViewer = new app_saku_fJurnalViewer(this.app,{bound:[this.width / 2 - 400,70,800,450]});									
					}
					this.jurnalViewer.previewHtml(this.dbLarge.getJurnalHtml("select a.no_kas as no_ju,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi, "+
								"	   a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app as nik_setuju,c.nama as nama_setuju,c.jabatan as jabatan_setuju "+
								"from kas_m a "+
								"left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
								"left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
								"where a.no_kas = '"+this.ed_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",
								"select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  "+
								"from kas_j a "+
								"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_kas='"+this.ed_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								"order by a.dc desc "));
								
					this.doModalResult("clear",mrOk);					     
				}else system.info(this,result,"");
    			break;
				
				case "getMultiDataProvider":
					eval("result = "+result+";");
					if (typeof result != "string"){
						this.dataAkun = new portalui_arrayMap();
						if (result.result[0]){	    			        
							var line;
							for (var i in result.result[0].rs.rows){
								line = result.result[0].rs.rows[i];
								this.dataAkun.set(line.kode_akun, line.nama);
							}
						}
					}else throw result;
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
							this.gridLib.SGAppendData(this.sg1,[0,1,2,3,4,5,6,7,8,9,10,11,12,13],value);	
							//this.sg1.appendData(value);
						}	
						this.sg1.hideLoading();						
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
};
