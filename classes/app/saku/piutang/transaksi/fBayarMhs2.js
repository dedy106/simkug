/*
	1. testing jika piutang dibayar dari discount
	2. mahasiswa dapet beasiswa
*/
/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fBayarMhs2 = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fBayarMhs2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fBayarMhs2";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pembayaran KTS Mahasiswa : Input", 0);
		this.maximize();
		try
		{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox");
			this.e0 = new portalui_saiLabelEdit(this);
			this.e0.setLeft(20);
			this.e0.setTop(30);
			this.e0.setWidth(200);
			this.e0.setCaption("No Bukti");
			this.e0.setText("");
			this.e0.setReadOnly(false);			
			this.e0.setLabelWidth(100);					
			
			this.bGenerate = new portalui_button(this);
			this.bGenerate.setTop(30);
			this.bGenerate.setLeft(230);
			this.bGenerate.setCaption("Generate");
			this.bGenerate.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGenerate.onClick.set(this,"doGenerate");		
			
			this.l1 = new portalui_label(this);
			this.l1.setLeft(20);
			this.l1.setTop(55);
			this.l1.setHeight(20);
			this.l1.setWidth(100);
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
			
			this.dpTgl = new portalui_datePicker(this);
			this.dpTgl.setTop(55);
			this.dpTgl.setLeft(120);
			this.dpTgl.setWidth(100);		
			this.dpTgl.setHeight(18);
			this.dpTgl.onSelect.set(this,"doSelectDate");			
			
			this.ePeriode = new portalui_saiLabelEdit(this);
			this.ePeriode.setLeft(20);
			this.ePeriode.setTop(80);
			this.ePeriode.setWidth(150);
			this.ePeriode.setCaption("Periode");
			this.ePeriode.setText(this.app._periode);		
			this.ePeriode.setReadOnly(true);					
			
			this.eJenis = new portalui_saiCB(this);
			this.eJenis.setTop(105);
			this.eJenis.setLeft(20);
			this.eJenis.setWidth(180);	
			this.eJenis.setCaption("Jenis Bayar");
			this.eJenis.addItem(0,"KM");			
			this.eJenis.addItem(1,"BM");			
			this.eJenis.addItem(2,"TT");			
			
			this.eJurusan = new portalui_saiCBBL(this);
			this.eJurusan.setTop(130);
			this.eJurusan.setLeft(20);
			this.eJurusan.setWidth(150);
			this.eJurusan.setCaption("Jurusan");
			this.eJurusan.onBtnClick.set(this,"FindBtnClick");
			
			this.eAngkatan = new portalui_saiCBBL(this);
			this.eAngkatan.setTop(155);
			this.eAngkatan.setLeft(20);
			this.eAngkatan.setWidth(150);
			this.eAngkatan.setCaption("Angkatan");
			this.eAngkatan.onBtnClick.set(this,"FindBtnClick");
			
			this.eKeterangan = new portalui_saiLabelEdit(this);
			this.eKeterangan.setTop(180);
			this.eKeterangan.setLeft(20);
			this.eKeterangan.setWidth(700);			
			this.eKeterangan.setCaption("Keterangan");
			
			this.eMhs = new portalui_saiCBBL(this);
			this.eMhs.setLeft(20);
			this.eMhs.setTop(205);
			this.eMhs.setWidth(200);
			this.eMhs.setCaption("NPM/NIM");
			this.eMhs.setText("");	
			this.eMhs.onBtnClick.set(this,"FindBtnClick");
			this.eMhs.onChange.set(this,"doChange");
			
			this.eBaddebt = new portalui_saiLabelEdit(this);
			this.eBaddebt.setLeft(520);
			this.eBaddebt.setTop(205);
			this.eBaddebt.setWidth(200);			
			this.eBaddebt.setTipeText(ttNilai);
			this.eBaddebt.setAlignment(alRight);
			this.eBaddebt.setText("0");
			this.eBaddebt.setReadOnly(true);
			this.eBaddebt.setCaption("Penyisihan");			
			
			this.eKts = new portalui_saiCBBL(this);
			this.eKts.setLeft(20);
			this.eKts.setTop(230);
			this.eKts.setWidth(200);
			this.eKts.setCaption("KTS/No Invoice");
			this.eKts.setText("");	
			this.eKts.onBtnClick.set(this,"FindBtnClick");
			this.eKts.onChange.set(this,"doKtsChange");
			
			this.eDisc = new portalui_saiLabelEdit(this);
			this.eDisc.setLeft(520);
			this.eDisc.setTop(230);
			this.eDisc.setWidth(200);			
			this.eDisc.setTipeText(ttNilai);
			this.eDisc.setAlignment(alRight);
			this.eDisc.setText("0");
			this.eDisc.setCaption("Discount");			
			this.eDisc.setReadOnly(true);
			
			this.eKtsDisc = new portalui_saiCBBL(this);
			this.eKtsDisc.setLeft(20);
			this.eKtsDisc.setTop(231);
			this.eKtsDisc.setWidth(200);
			this.eKtsDisc.setCaption("KTS Discount");
			this.eKtsDisc.setText("");	
			this.eKtsDisc.onBtnClick.set(this,"FindBtnClick");
			this.eKtsDisc.onChange.set(this,"doKtsChange");
			
			this.cbMerge = new portalui_checkBox(this,{bound:[620,231,200,20],caption:"Merge"});
			
			this.eNilai = new portalui_saiLabelEdit(this);
			this.eNilai.setLeft(20);
			this.eNilai.setTop(255);
			this.eNilai.setWidth(200);			
			this.eNilai.setTipeText(ttNilai);
			this.eNilai.setAlignment(alRight);
			this.eNilai.setText("0");
			this.eNilai.setCaption("Nilai Bayar");						
			
			this.eTotal = new portalui_saiLabelEdit(this);
			this.eTotal.setTop(255);
			this.eTotal.setLeft(520);
			this.eTotal.setWidth(200);
			this.eTotal.setCaption("Total Tagihan");
			this.eTotal.setAlignment(alRight);
			this.eTotal.setTipeText(ttNilai);
			this.eTotal.setReadOnly(true);								
			
			this.eCD = new portalui_saiLabelEdit(this);
			this.eCD.setLeft(20);
			this.eCD.setTop(256);
			this.eCD.setWidth(200);			
			this.eCD.setTipeText(ttNilai);
			this.eCD.setAlignment(alRight);
			this.eCD.setText("0");
			this.eCD.setCaption("Saldo Deposit");						
			this.eCD.setReadOnly(true);
			
			this.eCDPakai = new portalui_saiLabelEdit(this);
			this.eCDPakai.setLeft(520);
			this.eCDPakai.setTop(256);
			this.eCDPakai.setWidth(200);			
			this.eCDPakai.setTipeText(ttNilai);
			this.eCDPakai.setAlignment(alRight);
			this.eCDPakai.setText("0");
			this.eCDPakai.setCaption("Deposit diambil");
			
			uses("portalui_saiGrid;portalui_sgNavigator");
			this.sg1 = new portalui_saiGrid(this);
			this.sg1.setTop(280);
			this.sg1.setLeft(20);
			this.sg1.setWidth(900);
			this.sg1.setHeight(200);			
			this.sg1.setColCount(12);
			this.sg1.setColTitle(new Array("Kode Produk","Jenis Biaya","Jumlah","Nilai Satuan","Nilai Tagihan","Nilai Bayar","Discount","Jenis","Akun Lawan","Kode PP","Kode DRK","Akun Deprs"));
			this.sg1.columns.get(2).setColumnFormat(cfNilai);			
			this.sg1.columns.get(3).setColumnFormat(cfNilai);
			this.sg1.columns.get(4).setColumnFormat(cfNilai);
			this.sg1.columns.get(5).setColumnFormat(cfNilai);
			this.sg1.columns.get(6).setColumnFormat(cfNilai);
			this.sg1.columns.get(0).setReadOnly(true);
			this.sg1.columns.get(1).setReadOnly(true);
			this.sg1.columns.get(2).setReadOnly(true);
			this.sg1.columns.get(3).setReadOnly(true);
			this.sg1.columns.get(4).setReadOnly(true);
			this.sg1.columns.get(7).setReadOnly(true);
			this.sg1.columns.get(9).setReadOnly(true);
			this.sg1.columns.get(10).setReadOnly(true);
			
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(480);
			this.sgn.setLeft(20);
			this.sgn.setWidth(700);
			this.sgn.setButtonStyle(0);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");
			this.rowPerPage = 100;
			
			this.eTotalDisc = new portalui_saiLabelEdit(this.sgn);
			this.eTotalDisc.setTop(1);
			this.eTotalDisc.setLeft(490);
			this.eTotalDisc.setWidth(200);
			this.eTotalDisc.setCaption("Total Pakai Disc");
			this.eTotalDisc.setAlignment(alRight);
			this.eTotalDisc.setTipeText(ttNilai);
			this.eTotalDisc.setReadOnly(true);								
			
			this.eTotalByr = new portalui_saiLabelEdit(this.sgn);
			this.eTotalByr.setTop(1);
			this.eTotalByr.setLeft(240);
			this.eTotalByr.setWidth(200);
			this.eTotalByr.setCaption("Total Bayar");
			this.eTotalByr.setAlignment(alRight);
			this.eTotalByr.setTipeText(ttNilai);
			this.eTotalByr.setReadOnly(true);					
			
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib(window.system.serverApp);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.eJurusan.onChange.set(this,"doEditChange");
			this.eAngkatan.onChange.set(this,"doEditChange");
			this.eMhs.onChange.set(this,"doChange");
			this.eJurusan.onExit.set(this,"doEditExit");
			this.eAngkatan.onExit.set(this,"doEditExit");
			this.eMhs.onExit.set(this,"doEditExit");			
			this.eJurusan.setSQL("select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ", new Array("kode_jur","nama_jur"), this.dbLib2);			
			this.dpTgl.setDateString(new Date().getDateStr());
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onChange.set(this, "doSGChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onNilaiChange.set(this, "doSGNilaiChange");
			this.doLoadDataBPP();
			this.sg1.appendRow();						
			this.rearrangeChild(10,23);
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fBayarMhs2]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fBayarMhs2.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{		
		try {
			if (parseFloat(parseNilai(this.eCDPakai.getText())) > parseFloat(parseNilai(this.eCD.getText()))){
				throw("Nilai Pakai Deposit tidak boleh melebihi saldo deposit");}		
			if (parseFloat(parseNilai(this.eTotalDisc.getText())) > parseFloat(parseNilai(this.eDisc.getText()))){
				throw("Nilai Pakai Disc tidak boleh melebihi Disc");}				
			if (parseFloat(parseNilai(this.eTotalByr.getText())) > parseFloat(parseNilai(this.eNilai.getText())) + parseFloat(parseNilai(this.eCDPakai.getText()))){
				throw("Nilai Pakai Pembayaran melebihi Nilai Bayar");}
			if ((new Date().strToDate(this.ktsDate)) > (new Date(this.dpTgl.getDateString())))
				throw("Tanggal Pembayaran tidak boleh kurang dari tanggal Penagihan");
			//if (parseNilai(this.eTotalByr.getText()) +  parseNilai(this.eTotalDisc.getText()) + parseNilai(this.eCDPakai.getText()) > parseNilai(this.eTotal.getText()))
			//	throw("Nilai Pembayaran melebihi Total Tagihan");
			system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");		
		}catch(e){
			system.alert(this,e,"Cek Data Inputannya!");
		}
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e0);				
				this.sg1.clear(1);
				this.dpTgl.setDateString(new Date().getDateStr());
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0"])))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					this.insertData(sql);
				}catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{				
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();					
					this.insertData(sql);
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from load_mhs where kode_jur='"+this.e0.getText()+"' and kode_ang='"+this.e1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);					
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.insertData = function(sql)
{	
	if (this.sg1.getRowCount() <= 0) {
		paget.alert(this,"Data Produk tidak boleh kosong","");
		return false;		
	}
//------------------------------------- buffering spro	
	var tmp = this.dbLib.loadQuery("select kode_spro, nama, modul, flag, value1, value2 from spro where kode_lokasi = '"+this.app._lokasi+"' and (flag = '"+this.eJurusan.getText()+"' or kode_spro in ('ARIM','CD','ARDISC','OI','DRKOI')) ");	
	var dataSPRO = new Array();
	tmp = tmp.split("\r\n");
	var line;
	for (var i in tmp){
		line = tmp[i].split(";");
		if (i > 0) {			
			dataSPRO[line[0]] = line;
		}
	}
//------------------------------------- end buffering spro	
	var totD = 0, totC = 0;
	var line, nilaiAR, akunAR, akunPdd, jenis;		
	var scriptARM = "insert into arbyrmhs_m(no_bukti, tanggal,keterangan,nilai,periode,jenis,user_id,kode_lokasi,ref1,ref2,progress,flag_hapus, disc,posted, cd_ambil, nilai_bd) values";
	var scriptARD = "insert into arbyrmhs_d(no_bukti,kode_produk,akun_piutang,akun_lawan,nilai,disc,kode_lokasi) values";
	var scriptJurnal = "insert into armhs_j_byr(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
	var akunAR, akunPdd, kodePP, kodeDRK;
	scriptARM += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',"+parseNilai(this.eNilai.getText())+", "+
				" '"+this.ePeriode.getText()+"','"+this.eJenis.getText()+"','"+this.app._userLog+"', "+
				" '"+this.app._lokasi+"','"+this.eMhs.getText()+"','"+this.eKtsDisc.getText()+"','0','0','"+parseNilai(this.eDisc.getText())+"','T','"+parseNilai(this.eCDPakai.getText())+"','"+parseNilai(this.eBaddebt.getText())+"')";			
	var nourut = 0;
	var akunIM = "AKUNIM";//dataSPRO["ARIM"][4]; //kolom flag	//tgl 29012010 tidak pake akun IM.... waktu kasbank di update jd akun kasbank
	sql.add("insert into armhs_m select 'K"+this.eKts.getText()+"',tanggal, keterangan, nilai, periode, thn_ajar,sem_gg, '"+this.app._userLog+"',kode_lokasi, ref1, ref2, progress, nilai_bd, '"+this.eKtsDisc.getText()+"','F',disc, semester    from armhs_m where no_invoice = '"+this.eKts.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
	sql.add("insert into armhs_d select 'K"+this.eKts.getText()+"',kode_produk, semester, akun_piutang, akun_pdpt, akun_pdd, jumlah, -nilai, periode_awal, periode_akhir, flag_amor, kode_lokasi  from armhs_d where no_invoice = '"+this.eKts.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");	
	//copy jurnal dari armhs_d dari no bukti eKts lama --> eKts Disc	
	sql.add("insert into armhs_d select '"+this.eKtsDisc.getText()+"',kode_produk, semester, akun_piutang, akun_pdpt, akun_pdd, jumlah, nilai, periode_awal, periode_akhir, flag_amor, kode_lokasi  from armhs_d where no_invoice = '"+this.eKts.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
	//set lfag hapus armhs_m dari no bukti eKts lama
	sql.add("update armhs_m set flag_hapus = '"+this.eKtsDisc.getText()+"' where no_invoice = '"+this.eKts.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
	//copy jurnal dari armhs_j dari no bukti eKts lama --> eKts Disc
	sql.add("insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai, modul,jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) select '"+this.eKtsDisc.getText()+"',no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j where no_bukti = '"+this.eKts.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
	//Reklas jurnal dari armhs_j dari no bukti eKts lama 
	sql.add("insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai, modul,jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) select 'K"+this.eKts.getText()+"','"+this.eKtsDisc.getText()+"', no_urut, tanggal, kode_akun, case when dc='D' then 'C' else 'D' end, concat('(Koreksi)',keterangan), nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j where no_bukti = '"+this.eKts.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
//-------------------------------------- check penyisihan
	if (this.eBaddebt.getText() != '0'){        
		var akunOI = dataSPRO["OI"][5];
		var drkOI = dataSPRO["OI"][4];
		var totByrBPP = 0;
		for (var i=0;i < this.sg1.getRowCount();i++)
		{
			if (this.sg1.getCell(8,i).substr(0,1) == '1'){ //akun piutang saja
				var kodeProduk = this.sg1.cells(0,i);
				var akunDeprs = this.sg1.cells(11,i);
				totByrBPP = nilaiToFloat(this.sg1.cells(5,i)) + nilaiToFloat(this.sg1.cells(6,i));
			}			
		}
		
		if (nilaiToFloat(this.eBaddebt.getText()) > totByrBPP)
			var nilaiBD = -totByrBPP;
		else var nilaiBD = -(nilaiToFloat(this.eBaddebt.getText()));
		
		sql.add("insert into ar_susut(no_susut, tanggal, keterangan, periode, ref1, nilai, kode_lokasi, akun_beban, akun_deprs, kode_pp, p_susut,status, posted, susut_sblm, ref2, nilai_bayar, kode_drk, prd_sblm, drk_pdpt) values "+
				" ('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.ePeriode.getText()+"','"+this.eKts.getText()+"', "+
				"	"+nilaiBD+",'"+this.app._lokasi+"','"+akunOI+"','"+akunDeprs+"','"+this.app._kodePP+"',0,'Pdpt','"+this.ePeriode.getText()+"', "+
				"	'"+this.eMhs.getText()+"',"+totByrBPP+",'-','-','"+drkOI+"'  )"+
				" ");
		sql.add("update armhs_m set nilai_bd = nilai_bd + "+(nilaiBD)+" where no_invoice = '"+this.eKts.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
		nourut++;
		totD += Math.abs(nilaiBD);
		totC += Math.abs(nilaiBD);
		scriptJurnal += "('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunDeprs+"','D','"+this.eKeterangan.getText()+"',"+Math.abs(nilaiBD)+" ,"+
					"	'ARAKUM','KB_AKUM','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR','1','"+this.app._kodePP+"','"+drkOI+"')";
		nourut++;			
		scriptJurnal += ",('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunOI+"','C','"+this.eKeterangan.getText()+"',"+Math.abs(nilaiBD)+" ,"+
					"	'ARAKUM','KB_OI','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR','1','"+this.app._kodePP+"','"+drkOI+"')";					
    }
//-------------------------------------------------------------
//----------------------------------------------- Disc
	if (nourut > 0) scriptJurnal+=",";
	nourut++;
	scriptJurnal += "('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunIM+"','D','"+this.eKeterangan.getText()+"','"+parseNilai(this.eNilai.getText())+"' ,"+
				"	'ARIM','ARKB','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+this.app._kodePP+"','-')";				
	totD += nilaiToFloat(this.eNilai.getText());
	if (parseFloat(parseNilai(this.eTotalDisc.getText())) > 0){
		var akunDisc = dataSPRO["ARDISC"][3]; //
		nourut++;
		scriptJurnal += ",('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunDisc+"','D','"+this.eKeterangan.getText()+"',"+parseNilai(this.eTotalDisc.getText())+" ,"+
					"	'ARDISC','DISC','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+this.app._kodePP+"','-')";		
		totD += nilaiToFloat(this.eTotalDisc.getText());
	}				
//----------------------------------------- cek deposit
	var slsh = parseFloat(parseNilai(this.eNilai.getText())) - parseFloat(parseNilai(this.eTotalByr.getText()));				
	if ( slsh > 0) {		
		nourut++;
		var akunCd = dataSPRO["CD"][4]; //kolom flag
		var scriptCD = "insert into ar_cd(no_buktikas, tanggal, kode_akun, dc, keterangan, nilai, periode, user_id, tgl_input, kode_lokasi, ref1, ref2, kode_pp) values "+
				"('"+this.e0.getText()+"', '"+this.dpTgl.getDateString()+"','"+akunCd+"','D','"+this.eKeterangan.getText()+"','"+slsh+"' "+
				",'"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','"+this.eMhs.getText()+"' "+
				",'"+this.eKts.getText()+"','"+this.sg1.cells(9,0)+"')";					
		totC += slsh;
		scriptJurnal += ",('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunCd+"','C','"+this.eKeterangan.getText()+"','"+slsh+"' ,"+
					"	'ARCD','CDIN','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+this.app._kodePP+"','-')";
	}
	if (nilaiToFloat(this.eCDPakai.getText()) > 0){
		var akunCd = dataSPRO["CD"][4]; //
		nourut++;
		var scriptCD = "insert into ar_cd(no_buktikas, tanggal, kode_akun, dc, keterangan, nilai, periode, user_id, tgl_input, kode_lokasi, ref1, ref2, kode_pp) values "+
				"('"+this.e0.getText()+"', '"+this.dpTgl.getDateString()+"','"+akunCd+"','C','"+this.eKeterangan.getText()+"','"+parseNilai(this.eCDPakai.getText())+"' "+
				",'"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','"+this.eMhs.getText()+"' "+
				",'"+this.eKts.getText()+"','"+this.sg1.cells(9,0)+"')";					
		totD += nilaiToFloat(this.eCDPakai.getText());
		scriptJurnal += ",('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunCd+"','D','"+this.eKeterangan.getText()+"',"+parseNilai(this.eCDPakai.getText())+" ,"+
					"	'ARCD','CDOUT','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+this.app._kodePP+"','-')";
	}
//-------------------------------------------------
	if (this.app._dbEng == "mysqlt"){		
		var nilaiAR;
		for (var i=0;i < this.sg1.getRowCount();i++)
		{										  							
			kodePP = this.sg1.cells(9,i);
			kodeDRK = this.sg1.cells(10,i);			
			akunAR = this.sg1.cells(8,i);			
			if (akunAR.charAt(0) == '1')
				var dc = 'C';
			else if (akunAR.charAt(0) == '4')
				var dc = 'C';
			else if (akunAR.charAt(0) == '5')
				var dc = 'D';				
			if (i !=0) {scriptARD +=",";}						
				scriptARD += "('"+this.e0.getText()+"','"+this.sg1.cells(0,i)+"','"+akunAR+"','"+this.sg1.cells(8,i)+"',"+parseNilai(this.sg1.cells(5,i))+" "+
						","+parseNilai(this.sg1.cells(6,i))+",'"+this.app._lokasi+"')";			
			nilaiAR = Math.abs(nilaiToFloat(this.sg1.cells(5,i))) + nilaiToFloat(this.sg1.cells(6,i));
			nourut++;	
			scriptJurnal += ",('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunAR+"','"+dc+"','"+this.eKeterangan.getText()+"','"+(nilaiAR)+"' ,"+
					"	'ARMHS','ARBYR','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+kodePP+"','"+kodeDRK+"')";			
			if (dc == "D") totD += nilaiAR;
			else totC += nilaiAR;
		}		
		sql.add(scriptARM);
		sql.add(scriptARD);		
		sql.add(scriptJurnal);	
		if (scriptCD != "" && scriptCD != undefined)
			sql.add(scriptCD);		
	}else{				
		scriptARD = "";
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
		}
	}
	if (totD != totC) {
		system.alert(this,"Total Debet tidak sama dengan Total Kredit<br>debet ("+totD+") :: kredit ("+totC+")","Cek transaksinya");
		return false;
	}
	//langsun g diinsert ke kasbank jika tidak ada nilai bayar
	if (this.eNilai.getText() != "0") {
		var script1 = "insert into arkb_m(no_buktikas, tanggal, keterangan, akun_kasbank, nilai_kasbank, periode, ref1, ref2, modul, jenis, flag_hapus, ref3, kode_lokasi,posted, nik_user) values";
		var script3 = "insert into arkb_d(no_buktikas, no_urut, no_bukti, nilai, progress, kode_lokasi) values ";
		script1 += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','-', "+
			"'0','"+this.ePeriode.getText()+"','-','-','ARMHS','"+this.eJenis.getText()+"','0','-','"+this.app._lokasi+"','T','"+this.app._userLog+"')";
		script3 += "('"+this.e0.getText()+"','1','"+this.e0.getText()+"',0,0,'"+this.app._lokasi+"')";
		sql.add(script1);
		sql.add(script3);
	}
	this.dbLib.execArraySQL(sql);	
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doLoadDataBPP = function(sender)
{
	try{
		var rs = this.dbLib.loadQuery("select semester, kode_ang, kode_jur,kode_produk,  jml_batas,nilai_batas, nilai_bpp  from param_bpp where kode_lokasi  = '"+this.app._lokasi+"' ");
		this.dataBPP = rs.split("\r\n");
		
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doEditExit = function(sender)
{
	sender.checkItem();	
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doEditChange = function(sender)
{
	if (sender == this.eJurusan){
		this.eAngkatan.setSQL("select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+sender.getText()+"' ", new Array("kode_ang","nama_ang"), this.dbLib2);					
		this.eAngkatan.setText("");
		this.eMhs.setText("");		
	}else if (sender == this.eAngkatan){
		this.eMhs.setSQL("select npm, nama_mhs from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_ang = '"+sender.getText()+"' and kode_jur ='"+this.eJurusan.getText()+"' ", new Array("npm","nama_mhs"), this.dbLib2);					
		this.eMhs.setText("");
	}
	this.eKts.setText("");
	this.sg1.clear(1);	
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.FindBtnClick = function(sender, event)
{
	switch(sender){
		case this.eJurusan :
			this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
									  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' ",
									  ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
		break;
		case this.eAngkatan :
			this.standarLib.showListData(this, "Data Angkatan",sender,undefined, 
									  "select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
									  "select count(*) from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"'",
									  ["kode_ang","nama_ang"],"and",["Kode Angkatan","Nama Angkatan"]);
		break;
		case this.eMhs :
			this.standarLib.showListData(this, "Data Mahasiswa",sender,undefined, 
									  "select npm, nama_mhs from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' and kode_ang ='"+this.eAngkatan.getText()+"' ",
									  "select count(*) from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' and kode_ang ='"+this.eAngkatan.getText()+"' ",
									  ["npm","nama_mhs"],"and",["NPM/NIM","Nama"]);
		break;
		case this.eKts :
		case this.eKtsDisc :
			var krg = "isnull(c.nilai,0)";
			if (this.app._dbEng == "mysqlt") krg = "ifnull(c.nilai,0)"; 
			this.standarLib.showListData(this, "Data KTS / Invoice",sender,undefined, 
										  "select distinct d.no_invoice, d.keterangan from armhs_d a "+											
											" inner join produk b on b.kode_produk = a.kode_produk and a.kode_lokasi = b.kode_lokasi "+
											" inner join armhs_m  d on d.no_invoice = a.no_Invoice and a.kode_lokasi = d.kode_lokasi "+
											" left outer join (select z.kode_lokasi, ref2, kode_produk, sum(case when substring(akun_piutang,1,1) = '1' or akun_piutang = '-' then x.nilai + x.disc else -x.nilai + x.disc end) as nilai from arbyrmhs_d x inner join arbyrmhs_m z on z.no_bukti = x.no_bukti and z.kode_lokasi = x.kode_lokasi group by z.kode_lokasi,ref2, kode_produk) c on c.ref2 = a.no_invoice and c.kode_produk = b.kode_produk  and c.kode_lokasi = a.kode_lokasi "+
											" where a.kode_lokasi = '"+this.app._lokasi+"' and (a.jumlah * a.nilai - "+krg+" > 0)  and ref1 ='"+this.eMhs.getText()+"' and flag_hapus = '0'",
										  "select count(distinct d.no_invoice, d.keterangan) from armhs_d a "+
											" inner join produk b on b.kode_produk = a.kode_produk and a.kode_lokasi = b.kode_lokasi "+
											" inner join armhs_m  d on d.no_invoice = a.no_Invoice and a.kode_lokasi = d.kode_lokasi "+
											" left outer join (select z.kode_lokasi, ref2, kode_produk, sum(case when substring(akun_piutang,1,1) = '1' or akun_piutang = '-' then x.nilai + x.disc else -x.nilai + x.disc end) as nilai from arbyrmhs_d x inner join arbyrmhs_m z on z.no_bukti = x.no_bukti and z.kode_lokasi = x.kode_lokasi group by z.kode_lokasi,ref2, kode_produk) c on c.ref2 = a.no_invoice and c.kode_produk = b.kode_produk  and c.kode_lokasi = a.kode_lokasi "+
											" where a.kode_lokasi = '"+this.app._lokasi+"' and (a.jumlah * a.nilai - "+krg+" > 0)  and ref1 ='"+this.eMhs.getText()+"' and flag_hapus = '0'",
										  new Array("no_invoice","keterangan"),"and",new Array("KTS/No Invoice","Keterangan"));
		break;
	}
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doFindBtnClick = function(sender, col, row) 
{
	this.standarLib.showListDataForSG(this, "Daftar Produk",this.sg1, this.sg1.row, this.sg1.col, 
								  "select a.kode_produk, a.nama_produk from produk a where a.kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
								  "select count(a.kode_produk)  from produk a where a.kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
								  ["kode_produk","nama_produk"],"and",["Kode Produk","Nama Produk"],false);
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doNilaiChange = function()
{
	try
	{
		var total=0;
		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{				
				if (this.sg1.getCell(8,i).substr(0,1) == '1') 
					total += nilaiToFloat(this.sg1.getCell(4,i));							
				else total -= nilaiToFloat(this.sg1.getCell(4,i));							
			}
		}
		this.eTotal.setText(floatToNilai(total));		
	}catch(e)
	{
		alert("[app_saku_piutang_transaksi_fBayarMhs2]::doNilaiChange:"+e);
	}
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doGenerate = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "arbyrmhs_m", "no_bukti", "BYR"+this.ePeriode.getText().substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doChange = function(sender){	
	this.eCD.setText("0");
	this.eCDPakai.setText("0");
	this.eCDPakai.setReadOnly(true);
	if (sender.getText() != ""){				
		var rs = this.dbLib.runSQL("select "+(this.app._dbEng =="mysqlt" ? "ifnull" : "isnull")+"(sum(case when dc='D' then nilai else -nilai end),0) as nilai from ar_cd where ref1 = '"+this.eMhs.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
		if (rs instanceof portalui_arrayMap){
			if (rs.get(0) != undefined){				
				this.eCD.setText(floatToNilai(parseFloat(rs.get(0).get("nilai"))));				
				this.eCDPakai.setReadOnly(rs.get(0).get("nilai") == 0);
			}
		}
	}
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doKtsChange = function(sender)
{
	try{		
		var krg = "ifnull(c.nilai,0)"; 
		var rs = this.dbLib.runSQL("select a.kode_produk, b.nama_produk, a.jumlah, a.nilai, a.jumlah * a.nilai - "+krg+" as tagihan "+
			", b.jenis, (case when ((a.akun_piutang <> '-') and (a.akun_piutang <> '') and (not a.akun_piutang is null )) then a.akun_piutang else case when a.akun_pdpt <> '-' then a.akun_pdpt else b.akun_beban end end) as akun_piutang, b.kode_pp, case b.kode_akun when '' then b.kode_drk_beban else b.kode_drk_pdpt end as kode_drk, case when b.akun_deprs = '' then '-' else b.akun_deprs end akun_deprs, d.disc, d.tanggal, d.nilai_bd from armhs_d a "+
			" inner join produk b on b.kode_produk = a.kode_produk and a.kode_lokasi = b.kode_lokasi "+
			" inner join armhs_m  d on d.no_invoice = a.no_Invoice and a.kode_lokasi = d.kode_lokasi "+
			" left outer join (select ref2, kode_produk, sum(case when substring(akun_piutang,1,1) = '1' or akun_piutang = '-'  then x.nilai + x.disc else -x.nilai + x.disc end) as nilai from arbyrmhs_d x inner join arbyrmhs_m z on z.no_bukti = x.no_bukti and z.kode_lokasi = x.kode_lokasi and z.kode_lokasi = '"+this.app._lokasi+"' group by ref2, kode_produk) c on c.ref2 = a.no_invoice and c.kode_produk = b.kode_produk "+
			" where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_invoice = '"+sender.getText()+"' and (a.jumlah * a.nilai - "+krg+" > 0) ");		
		if (rs instanceof portalui_arrayMap){
			var row, data;				
			if (sender == this.eKtsDisc){
				if (this.sg1.getRowCount() > this.detailKts){
					for (var i= this.detailKts - 1; i < this.detailKts;i = i+0){
						this.sg1.delRow(i);
						if (this.sg1.getRowCount() <= this.detailKts) break;
					}
				}
			}else this.sg1.clear();	
			for (var i in rs.objList){
				row = rs.get(i);
				this.ktsDate = row.get("tanggal");
				this.eDisc.setText(floatToNilai(parseFloat(row.get("disc"))));
				this.eBaddebt.setText(floatToNilai(parseFloat(row.get("nilai_bd"))));
				data = new Array();
				for (var r in row.objList){					
					if (r == "nilai" || r == "tagihan")
						data.push(floatToNilai(parseFloat(row.get(r))));
					else 
						data.push(row.get(r));
					if (r == "tagihan"){
						if (row.get("akun_piutang").substr(0,1) == "1")						
							data.push("0");
						else data.push(floatToNilai(-(row.get("tagihan"))));
						data.push("0");
					}
				}
				this.sg1.appendData(data);
			}
			if (sender == this.eKts) this.detailKts = this.sg1.getRowCount();
			this.doNilaiChange();
		}else {
			this.sg1.clear(1);			
			system.alert(this,rs,"");
		}
	}catch(e){
		system.alert(this,e,"");
	}	
};
window.app_saku_piutang_transaksi_fBayarMhs2.prototype.doSGChange = function()
{
	try
	{
		var total=0, totalDisc = 0;
		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(5,i) != "")
			{				
				total += nilaiToFloat(this.sg1.getCell(5,i));	
				if (this.sg1.getCell(8,i).substr(0,1) == '1')				
					totalDisc += nilaiToFloat(this.sg1.getCell(6,i));							
				else if (this.sg1.getCell(8,i).substr(0,1) != '1' && this.sg1.getCell(6,i) != '0') this.sg1.setCell(6,i,'0');
			}
		}
		this.eTotalByr.setText(floatToNilai(total));		
		this.eTotalDisc.setText(floatToNilai(totalDisc));		
	}catch(e)
	{
		alert("[app_saku_piutang_transaksi_fBayarMhs2]::doNilaiChange:"+e);
	}
};
