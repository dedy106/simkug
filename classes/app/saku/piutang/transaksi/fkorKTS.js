/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fkorKTS = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fkorKTS.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fkorKTS";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","KTS Mahasiswa : Koreksi", 0);	
		
		try
		{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_saiCB");
			this.ePeriode = new portalui_saiLabelEdit(this);
			this.ePeriode.setLeft(20);
			this.ePeriode.setTop(80);
			this.ePeriode.setWidth(150);
			this.ePeriode.setCaption("Periode");
			this.ePeriode.setText(this.app._periode);		
			this.ePeriode.setReadOnly(true);
			
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
			this.dpTgl.onSelect.set(this,"doSelectDate");										
			
			this.eSemester = new portalui_saiCB(this);
			this.eSemester.setTop(105);
			this.eSemester.setLeft(20);
			this.eSemester.setWidth(150);
			this.eSemester.setCaption("Semester");
			this.eSemester.setReadOnly(true);
			for (var i=1;i <= 16;i++){
				this.eSemester.addItem(i,( i < 10 ? '0' + i:(i.toString())));
			}
			
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
			
			this.eMhs = new portalui_saiCBBL(this);
			this.eMhs.setLeft(20);
			this.eMhs.setTop(255);
			this.eMhs.setWidth(200);
			this.eMhs.setCaption("NPM/NIM");
			this.eMhs.setText("");	
			this.eMhs.onBtnClick.set(this,"FindBtnClick");									
			
			this.ePeriodeLm = new portalui_saiCB(this);
			this.ePeriodeLm.setLeft(520);
			this.ePeriodeLm.setTop(255);
			this.ePeriodeLm.setWidth(200);
			this.ePeriodeLm.setCaption("Periode Lama");
			this.ePeriodeLm.setText(this.app._periode);		
			this.ePeriodeLm.setReadOnly(true);
			
			this.e01 = new portalui_saiLabelEdit(this);
			this.e01.setLeft(20);
			this.e01.setTop(30);
			this.e01.setWidth(200);
			this.e01.setCaption("No KTS Baru");
			this.e01.setText("");
			this.e01.setReadOnly(true);			
			this.e01.setLabelWidth(100);
			
			this.bGenerate = new portalui_button(this);
			this.bGenerate.setTop(30);
			this.bGenerate.setLeft(230);
			this.bGenerate.setCaption("Generate");
			this.bGenerate.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGenerate.onClick.set(this,"doGenerate");							
			
			this.e0 = new portalui_saiCBBL(this);
			this.e0.setLeft(520);
			this.e0.setTop(30);
			this.e0.setWidth(200);
			this.e0.setCaption("No KTS");
			this.e0.setText("");
			this.e0.setReadOnly(true);			
			this.e0.setLabelWidth(100);										
			this.e0.onBtnClick.set(this,"FindBtnClick");
			this.e0.onChange.set(this,"editChange");										
			this.e0.setRightLabelVisible(false);
			
			this.eThn = new portalui_saiCB(this);
			this.eThn.setTop(180);
			this.eThn.setLeft(20);
			this.eThn.setWidth(180);
			this.eThn.setCaption("Tahun Ajaran");
			this.eThn.addItem(0,(new Date).getFullYear().toString());
			this.eThn.addItem(1,((new Date).getFullYear()+1).toString());			
			
			this.eThn2 = new portalui_saiCB(this);
			this.eThn2.setTop(180);
			this.eThn2.setLeft(205);
			this.eThn2.setWidth(80);
			this.eThn2.setLabelWidth(0);
			this.eThn2.setCaption("-");
			this.eThn2.addItem(0,((new Date).getFullYear()+1).toString());						
			
			this.eGjl = new portalui_saiCB(this);
			this.eGjl.setTop(205);
			this.eGjl.setLeft(20);
			this.eGjl.setWidth(180);	
			this.eGjl.setCaption("Sem Gjl-Gnp");
			this.eGjl.addItem(0,"Genap");			
			this.eGjl.addItem(1,"Ganjil");						
			
			this.eKeterangan = new portalui_saiLabelEdit(this);
			this.eKeterangan.setTop(230);
			this.eKeterangan.setLeft(20);
			this.eKeterangan.setWidth(400);			
			this.eKeterangan.setCaption("Keterangan");																
			
			this.eDisc = new portalui_saiLabelEdit(this);
			this.eDisc.setTop(280);
			this.eDisc.setLeft(20);
			this.eDisc.setWidth(200);		
			this.eDisc.setTipeText(ttNilai);
			this.eDisc.setAlignment(alRight);
			this.eDisc.setCaption("Discount");
			this.eDisc.setReadOnly(true);
			
			uses("portalui_saiGrid;portalui_sgNavigator");
			this.sg1 = new portalui_saiGrid(this);
			this.sg1.setTop(310);
			this.sg1.setLeft(20);
			this.sg1.setWidth(900);
			this.sg1.setHeight(170);			
			this.sg1.setColCount(12);			
			this.sg1.setColTitle(new Array("Kode Produk","Jenis Biaya","Jumlah","Nilai Satuan","Sub Total","Periode Awal","Jenis","Akun Lawan","Akun AR","Akun Pdd","Kode PP","Kode DRK"));		
			this.sg1.columns.get(0).setButtonStyle(bsEllips);				
			this.sg1.columns.get(3).setColumnFormat(cfNilai);
			this.sg1.columns.get(4).setColumnFormat(cfNilai);
			this.sg1.columns.get(4).setReadOnly(true);
			this.sg1.columns.get(1).setReadOnly(true);
			this.sg1.columns.get(5).setReadOnly(true);
			this.sg1.columns.get(6).setReadOnly(true);
			this.sg1.columns.get(7).setReadOnly(true);
			this.sg1.columns.get(8).setReadOnly(true);
			this.sg1.columns.get(9).setReadOnly(true);
			this.sg1.columns.get(10).setReadOnly(true);
			this.sg1.columns.get(11).setReadOnly(true);
			this.sg1.columns.get(5).setButtonStyle(bsAuto);
			var prd = this.app._periode.substring(0,4) + '01';
			for (var i=1;i <= 16;i++){				
				this.sg1.columns.get(5).pickList.set(i,prd);
				prd = nextNPeriode(prd,1);
			}
			
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(480);
			this.sgn.setLeft(20);
			this.sgn.setWidth(900);
			this.sgn.setButtonStyle(0);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");
			this.rowPerPage = 100;
			
			this.eTotal = new portalui_saiLabelEdit(this.sgn);
			this.eTotal.setTop(1);
			this.eTotal.setLeft(690);
			this.eTotal.setWidth(200);
			this.eTotal.setAlignment(alRight);
			this.eTotal.setTipeText(ttNilai);
			this.eTotal.setCaption("Total");		
			this.eTotal.setReadOnly(true);
			
			setTipeButton(tbHapus);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.eJurusan.onChange.set(this,"doEditChange");
			this.eAngkatan.onChange.set(this,"doEditChange");			
			this.eJurusan.setSQL("select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ", new Array("kode_jur","nama_jur"), this.dbLib2);						
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onChange.set(this, "doSGChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onNilaiChange.set(this, "doSGNilaiChange");
			this.doLoadDataBPP();
			this.sg1.appendRow();
			this.rearrangeChild(10,23);
			this.dpTgl.setDate(NaN, NaN, NaN);
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fkorKTS]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fkorKTS.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fkorKTS.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{		
		system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");		
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
window.app_saku_piutang_transaksi_fkorKTS.prototype.doEditChange = function(sender)
{
	if (sender == this.eJurusan){
		this.eAngkatan.setSQL("select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+sender.getText()+"' ", new Array("kode_ang","nama_ang"));
		this.sg1.clear(1);	
		this.eAngkatan.setText("");
		this.eMhs.setText("");
	}else if (sender == this.eAngkatan){
		this.eMhs.setSQL("select a.npm, a.nama_mhs from mhs a where kode_lokasi = '"+this.app._lokasi+"' and kode_ang = '"+sender.getText()+"' and kode_jur ='"+this.eJurusan.getText()+"' ", ["a.npm","a.nama_mhs"]);					
		/*this.eMhs.setSQL("select distinct b.npm, b.nama_mhs from armhs_m a "+
								  "	inner join mhs b on b.npm = a.ref1 and b.kode_lokasi = a.kode_lokasi "+
								  " inner join jurusan e on e.kode_jur = b.kode_jur and e.kode_lokasi = a.kode_lokasi "+
								  " inner join angkatan d on d.kode_ang = b.kode_ang and d.kode_jur = b.kode_jur and d.kode_lokasi = a.kode_lokasi "+
								  "	left outer join arbyrmhs_m c on c.ref2 = a.no_invoice and c.kode_lokasi = a.kode_lokasi "+										  
								  "where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ang = '"+sender.getText()+"'  and b.kode_jur ='"+this.eJurusan.getText()+"' and a.periode = '"+this.ePeriodeLm.getText()+"' and c.no_bukti is null",["npm","nama_mhs"]);//and a.posted = 'F' 
		*/this.eMhs.setText("");
	}else if (sender == this.eMhs){		
		this.e0.setText("");
	}
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doModalResult = function(event, modalResult)
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
				this.hapusData(sql);
				this.dbLib.execArraySQL(sql);	
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.insertData = function(sql,event)
{	
	if (this.dataKts != undefined){
		var hapus = false;
		if (this.dataKts.periode < this.app._periode){
			if (!this.hapusData(sql)) return false;			
		}else{
			sql.add("delete from armhs_d where no_invoice = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			sql.add("delete from armhs_m where no_invoice = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("delete from armhs_j where no_dokumen = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");	
			hapus = true;
		}
	}
	//edit kts... yg lama dihapus ganti baru.
	if (true){
		if (!hapus) this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "armhs_m", "no_invoice", "INV"+this.ePeriode.getText().substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));		
		var nobukti = this.e0.getText();
		var flag = '0';
		var line, nilaiAR, akunAR, akunPdd, jenis;	
		var scriptARM = "insert into armhs_m(no_invoice, tanggal,keterangan,nilai,periode,thn_ajar,sem_gg,user_id,kode_lokasi,ref1,ref2,progress,nilai_bd, posted,flag_hapus, disc) values ";
		var scriptARD = "insert into armhs_d(no_invoice,kode_produk,semester,akun_piutang,akun_pdpt,akun_pdd,jumlah,nilai,periode_awal,periode_akhir,flag_amor, kode_lokasi) values ";
		var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk)values ";
		var akunAR, akunPdd, kodePP, kodeDRK, jurnal = false;		
		scriptARM += "('"+nobukti+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',"+parseNilai(this.eTotal.getText())+", "+
					" '"+this.ePeriode.getText()+"','"+this.eThn.getText()+"/"+this.eThn2.getText()+"','"+(this.eGjl.getText().toLowerCase() == "ganjil" ? "1":"2")+"','"+this.app._userLog+"', "+
					" '"+this.app._lokasi+"','"+this.eMhs.getText()+"','-','0',0,'F','"+flag+"',"+parseNilai(this.eDisc.getText())+")";							
		var nourut = 0;
		for (var i=0;i < this.sg1.getRowCount();i++){							
			/*if (this.sg1.cells(6,i) == 'BPP'){          
		            nilaiAR = nilaiToFloat(this.sg1.cells(4,i));
		            akunAR = this.sg1.cells(8,i);
		            akunPdd = this.sg1.cells(9,i);
		            jenis ='PDD_NON';
				}else{          
		            nilaiAR = nilaiToFloat(this.sg1.cells(4,i));
		            akunAR = this.sg1.cells(8,i);
		            akunPdd = this.sg1.cells(7,i);
		            jenis ='BEBAN_NON';				
				}				  		
				kodePP = this.sg1.cells(10,i);
				kodeDRK = this.sg1.cells(11,i);
				
				if (i !=0) {scriptARD += ",";}						
				scriptARD += "('"+nobukti+"','"+this.sg1.cells(0,i)+"','"+this.eSemester.getText()+"','"+akunAR+"','"+this.sg1.cells(7,i)+"', "+
					" '"+this.sg1.cells(9,i)+"','"+this.sg1.cells(2,i)+"',"+parseNilai(this.sg1.cells(3,i))+",'"+this.sg1.cells(5,i)+"','"+nextNPeriode(this.sg1.cells(5,i),6)+"','0','"+this.app._lokasi+"')";														
				if (this.sg1.cells(8,i)!= '-' && this.sg1.cells(7,i).substr(0,1) == "4"){          	
					if (nourut != 0) {scriptJurnal += ",";};				
					nourut++;
					scriptJurnal += "('"+nobukti+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunAR+"','D','"+this.eKeterangan.getText()+"','"+parseNilai(this.sg1.cells(4,i))+"' ,"+
						"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+this.eMhs.getText()+"','IDR','1','"+kodePP+"','"+kodeDRK+"')";
					nourut++;
					scriptJurnal += ",('"+nobukti+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunPdd+"','C','"+this.eKeterangan.getText()+"','"+parseNilai(this.sg1.cells(4,i))+"' ,"+
						"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+this.eMhs.getText()+"','IDR','1','"+kodePP+"','"+kodeDRK+"')";
					jurnal = true;
				}
				*/
				if (this.sg1.cells(6,i) == 'BPP'){          
		            nilaiAR = nilaiToFloat(this.sg1.cells(4,i));
		            akunAR = this.sg1.cells(8,i);
		            akunPdd = this.sg1.cells(9,i);
		            jenis ='PDD_NON';
				}else{          
		            nilaiAR = nilaiToFloat(this.sg1.cells(4,i));
		            akunAR = this.sg1.cells(8,i);
		            akunPdd = this.sg1.cells(7,i);
		            jenis ='BEBAN_NON';				
				}				  		
				kodePP = this.sg1.cells(10,i);
				kodeDRK = this.sg1.cells(11,i);
				if (i !=0) {scriptARD += ",";}						
				scriptARD += "('"+this.e0.getText()+"','"+this.sg1.cells(0,i)+"','"+this.eSemester.getText()+"','"+akunAR+"','"+this.sg1.cells(7,i)+"', "+
					" '"+this.sg1.cells(9,i)+"','"+this.sg1.cells(2,i)+"',"+parseNilai(this.sg1.cells(3,i))+",'"+this.sg1.cells(5,i)+"','"+nextNPeriode(this.sg1.cells(5,i),6)+"','0','"+this.app._lokasi+"')";														
				if (this.sg1.cells(8,i)!= '-' && this.sg1.cells(7,i).substr(0,1) == "4"){          	
					if (nourut != 0) {scriptJurnal += ",";};				
					nourut++;
					scriptJurnal += "('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunAR+"','D','"+this.eKeterangan.getText()+"','"+parseNilai(this.sg1.cells(4,i))+"' ,"+
						"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+this.eMhs.getText()+"','IDR','1','"+kodePP+"','"+kodeDRK+"')";
					nourut++;
					scriptJurnal += ",('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunPdd+"','C','"+this.eKeterangan.getText()+"','"+parseNilai(this.sg1.cells(4,i))+"' ,"+
						"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+this.eMhs.getText()+"','IDR','1','"+kodePP+"','"+kodeDRK+"')";
					jurnal = true;
				}else if (this.sg1.cells(7,i).substr(1,1) == "5" && cekadaAR){
					if (nourut != 0) {scriptJurnal += ",";};//akunPdd = beban		
					nourut++;
					scriptJurnal += ",('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunPdd+"','D','"+this.eKeterangan.getText()+"','"+parseNilai(this.sg1.cells(4,i))+"' ,"+
						"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+this.eMhs.getText()+"','IDR','1','"+kodePP+"','"+kodeDRK+"')";
					nourut++;
					scriptJurnal += "('"+this.e0.getText()+"','"+this.e0.getText()+"','"+nourut+"','"+this.dpTgl.getDateString()+"', '"+akunARBeban+"','C','"+this.eKeterangan.getText()+"','"+parseNilai(this.sg1.cells(4,i))+"' ,"+
						"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+this.eMhs.getText()+"','IDR','1','"+kodePP+"','"+kodeDRK+"')";
					
					if (!firstByr){
						scriptByrD += ",";
					}					
					scriptByrD +="('"+this.e0.getText()+"','"+this.sg1.cells(0,i)+"','"+akunAR+"','"+akunPdd+"','"+parseNilai(this.sg1.cells(4,i))+"',0,'"+this.app._lokasi+"' )";
					if (indexAR > -1) scriptByrD += ",('"+this.e0.getText()+"','"+this.sg1.cells(0,indexAR)+"','"+this.sg1.cells(8,indexAR)+"','"+akunPdd+"','"+parseNilai(this.sg1.cells(4,indexAR))+"',0,'"+this.app._lokasi+"' )";
				}
		}
		sql.add(scriptARM);
		sql.add(scriptARD);		
		sql.add(scriptJurnal);				
	}	
	this.dbLib.execArraySQL(sql);
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.hapusData = function(sql,event)
{		
	if (this.dataKts != undefined){
		var hapus = false;
		if (this.dataKts.periode < this.app._periode){
			if (this.dataKts.periode == this.ePeriode.getText()){
				system.alert(this,"Tolong periode dan tanggal disesuaikan dengan periode berjalan.","Proses berhenti.");
				return false;				
			}
			this.dpTgl.setDateString(this.app._periode.substr(0,4)+"/"+this.app._periode.substr(4)+"/"+"28" );			
			//return;
		}else{
			sql.add("delete from armhs_d where no_invoice = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			sql.add("delete from armhs_m where no_invoice = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("delete from armhs_j where no_dokumen = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");	
			hapus = true;
		}
	}	
	//jika periode kurang...masih belum
	if (!hapus){		
		var nobukti = this.e01.getText();
		var flag = this.e0.getText();
		var line, nilaiAR, akunAR, akunPdd, jenis;	
		var scriptARM = "insert into armhs_m(no_invoice, tanggal,keterangan,nilai,periode,thn_ajar,sem_gg,user_id,kode_lokasi,ref1,ref2,progress,nilai_bd, posted,flag_hapus, disc) values ";
		var scriptARD = "insert into armhs_d(no_invoice,kode_produk,semester,akun_piutang,akun_pdpt,akun_pdd,jumlah,nilai,periode_awal,periode_akhir,flag_amor, kode_lokasi) values ";
		var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk)";
		var line,akunAR, akunPdd, kodePP, kodeDRK, jurnal = false;		
		scriptARM += "('"+nobukti+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',-"+parseNilai(this.eTotal.getText())+", "+
					" '"+this.ePeriode.getText()+"','"+this.eThn.getText()+"/"+this.eThn2.getText()+"','"+(this.eGjl.getText().toLowerCase() == "ganjil" ? "1":"2")+"','"+this.app._userLog+"', "+
					" '"+this.app._lokasi+"','"+this.eMhs.getText()+"','-','0',0,'F','"+flag+"',"+parseNilai(this.eDisc.getText())+")";					
		scriptJurnal += "select '"+nobukti+"',no_dokumen, no_urut, tanggal, kode_akun, case when dc ='D' then 'C' else 'D' end as dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j where  no_dokumen = '"+this.e0.getText()+"' ";
		for (var i in this.dataKtsD.rs.rows){
			line = this.dataKtsD.rs.rows[i];
			if (line.jenis == 'BPP'){          		            
		            akunAR = line.akun_piutang;
		            akunPdd = line.akun_pdd;
		            jenis ='PDD_NON';
				}else{          		            
		            akunAR = line.akun_piutang;
		            akunPdd = line.akun_pdpt;
		            jenis ='BEBAN_NON';				
				}				  		
				kodePP = line.kode_pp;
				kodeDRK = line.kode_drk;
				
				if (i !=0) {scriptARD += ",";}						
				scriptARD += "('"+nobukti+"','"+line.kode_produk+"','"+this.eSemester.getText()+"','"+akunAR+"','"+line.akun_pdpt+"', "+
					" '"+line.akun_pdd+"','"+line.jumlah+"',-"+parseFloat(line.nilai)+",'"+line.periode_awal+"','"+nextNPeriode(line.periode_awal,6)+"','0','"+this.app._lokasi+"')";																	
		}
		sql.add("update armhs_m set flag_hapus = '"+this.e01.getText()+"' where no_invoice = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
		sql.add(scriptARM);
		sql.add(scriptARD);		
		sql.add(scriptJurnal);				
	}
	return true;	
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doLoadDataBPP = function(sender)
{
	try{		
		
		var sql = new server_util_arrayList();
		sql.add("select distinct periode from armhs_m where kode_lokasi  = '"+this.app._lokasi+"' ");
		sql.add("select semester, kode_ang, kode_jur,kode_produk,  jml_batas,nilai_batas, nilai_bpp  from param_bpp where kode_lokasi  = '"+this.app._lokasi+"' ");
		this.dbLib.getMultiDataProviderA(sql);
		
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doCellExit = function(sender, col, row)
{
	if (col == 2 || col == 3){
		var sub = parseNilai(this.sg1.cells(2, row)) * parseNilai(this.sg1.cells(3,row)); 
		this.sg1.setCell(4, row, floatToNilai(sub));
	}
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.FindBtnClick = function(sender, event)
{
	switch(sender){
	case this.e0 :						
			this.standarLib.showListData2(this, "Data KTS Mhs",sender,undefined, 
								  "select distinct a.no_invoice, a.keterangan, a.ref1, b.nama_mhs from armhs_m a "+
								  "	inner join mhs b on b.npm = a.ref1 and b.kode_lokasi = a.kode_lokasi "+
								  " inner join jurusan e on e.kode_jur = b.kode_jur and e.kode_lokasi = a.kode_lokasi "+
								  " inner join angkatan d on d.kode_ang = b.kode_ang and d.kode_jur = b.kode_jur and d.kode_lokasi = a.kode_lokasi "+
								  "	left outer join arbyrmhs_m c on c.ref2 = a.no_invoice and c.kode_lokasi = a.kode_lokasi "+										  
								  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.ePeriodeLm.getText()+"' and a.ref1 = '"+this.eMhs.getText()+"' and c.no_bukti is null",
								  "select count(*) as tot from armhs_m a inner join mhs b on b.npm = a.ref1 and b.kode_lokasi = a.kode_lokasi "+
								  " inner join jurusan e on e.kode_jur = b.kode_jur and e.kode_lokasi = a.kode_lokasi "+
								  " inner join angkatan d on d.kode_ang = b.kode_ang and d.kode_jur = b.kode_jur and d.kode_lokasi = a.kode_lokasi "+										  
								  "	left outer join arbyrmhs_m c on c.ref2 = a.no_invoice and c.kode_lokasi = a.kode_lokasi "+										  
								  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.ePeriodeLm.getText()+"' and a.ref1 = '"+this.eMhs.getText()+"' and c.no_bukti is null",
								  ["a.no_invoice","a.keterangan","a.ref1","b.nama_mhs"],"and",["No Invoice","Keterangan","NPM","Nama Mhs"]);
		break;
		case this.eJurusan :
			this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
								  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' ",
								  ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
		break;
		case this.eAngkatan :
			this.standarLib.showListData(this, "Data Angkatan",sender,undefined, 
								  "select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"'",
								  ["kode_ang","nama_ang"],"and",["Kode Angkatan","Nama Angkatan"]);
		break;
		case this.eMhs :
			this.standarLib.showListData(this, "Data Mahasiswa",sender,undefined, 
								  "select npm, nama_mhs from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' and kode_ang ='"+this.eAngkatan.getText()+"' ",
								  /*"select distinct b.npm, b.nama_mhs from armhs_m a "+
								  "	inner join mhs b on b.npm = a.ref1 and b.kode_lokasi = a.kode_lokasi "+
								  " inner join jurusan e on e.kode_jur = b.kode_jur and e.kode_lokasi = a.kode_lokasi "+
								  " inner join angkatan d on d.kode_ang = b.kode_ang and d.kode_jur = b.kode_jur and d.kode_lokasi = a.kode_lokasi "+
								  "	left outer join arbyrmhs_m c on c.ref2 = a.no_invoice and c.kode_lokasi = a.kode_lokasi "+										  
								  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.ePeriodeLm.getText()+"' and c.no_bukti is null and b.kode_ang = '"+this.eAngkatan.getText()+"'  and a.posted = 'F' and b.kode_jur ='"+this.eJurusan.getText()+"' ",*/
								  "select count(*) from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' and kode_ang ='"+this.eAngkatan.getText()+"' ",
								  /*"select count(distinct b.npm) from armhs_m a "+
								  "	inner join mhs b on b.npm = a.ref1 and b.kode_lokasi = a.kode_lokasi "+
								  " inner join jurusan e on e.kode_jur = b.kode_jur and e.kode_lokasi = a.kode_lokasi "+
								  " inner join angkatan d on d.kode_ang = b.kode_ang and d.kode_jur = b.kode_jur and d.kode_lokasi = a.kode_lokasi "+
								  "	left outer join arbyrmhs_m c on c.ref2 = a.no_invoice and c.kode_lokasi = a.kode_lokasi "+										  
								  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.ePeriodeLm.getText()+"' and c.no_bukti is null and b.kode_ang = '"+this.eAngkatan.getText()+"'  and a.posted = 'F' and b.kode_jur ='"+this.eJurusan.getText()+"'",*/
								  ["npm","nama_mhs"],"and",["NPM/NIM","Nama"]);
		break;
	}
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
				case "getMultiDataProvider":
					result = JSON.parse(result);
					if (typeof result != "string"){						
						this.dataBPP = result.result[1];						
						result = result.result[0];
						for (var i in result.rs.rows){
							this.ePeriodeLm.addItem(i,result.rs.rows[i].periode);
						}
						
					}
				break;
    			case "execArraySQL" :    				
    				step="info";
					if (result.toLowerCase().search("error") == -1)					
		            {
		              this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.alert(this,result,"");
    			break;
    		}
		}catch(e)
		{
		   alert("step : "+step+"; error = "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doFindBtnClick = function(sender, col, row) 
{
	this.standarLib.showListDataForSG(this, "Daftar Produk",this.sg1, this.sg1.row, this.sg1.col, 
								  "select a.kode_produk, a.nama_produk from produk a where a.kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
								  "select count(a.kode_produk)  from produk a where a.kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
								  ["kode_produk","nama_produk"],"and",["Kode Produk","Nama Produk"],false);
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doSGChange = function(sender, col, row) 
{	
	if (col == 1){
		var dataBPP = this.dataBPP;
		var tmp, found;
		var rs = this.dbLib.runSQL("Select Kode_produk,Nama_produk,nilai,jenis,kode_drk_pdpt,"+
                             "case kode_akun when '' then akun_beban else kode_akun end as akun_lawan,"+
                             "case akun_piutang when '' then '-' else akun_piutang end as akun_piutang,"+
                             "case akun_pdd when '' then '-' else akun_pdd end as akun_pdd,kode_pp,"+
                             "case kode_akun when '' then kode_drk_beban else kode_drk_pdpt end as kode_drk "+
                             "from produk where  kode_jur='"+this.eJurusan.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"' and kode_produk = '"+this.sg1.getCell(0, row)+"' ");		
		if (rs instanceof portalui_arrayMap){
			var dataProduk = rs.get(0);
			if (dataProduk != undefined){				
				var jenis = dataProduk.get("jenis");								
				if (jenis == "LAINNYA") {
					this.sg1.setCell(2,row,"0");				
					this.sg1.setCell(3,row,parseFloat(dataProduk.get("nilai")));				
					this.sg1.setCell(4,row,"0");				
				}else if (jenis == "SKS"){
					found = false;
					for (var j in dataBPP.rs.rows){
						tmp = dataBPP.rs.rows[j];
						if (tmp.semester == this.eSemester.getText() && 
							tmp.kode_ang == this.eAngkatan.getText() && 
							tmp.kode_jur == this.eJurusan.getText()  ) { found = true; break;}
					}
					if (found){						
						this.sg1.setCell(2,row,parseFloat(tmp.kode_produk));
						this.sg1.setCell(3,row,parseFloat(tmp.nilai_batas));				
						this.sg1.setCell(4,row,parseFloat(tmp.jml_batas) * parseFloat(tmp.nilai_batas));
					}
				}else if (jenis == "BPP"){										
					found = false;					
					for (var j in dataBPP.rs.rows){
						 tmp = dataBPP.rs.rows[j];
						if (tmp.semester == this.eSemester.getText() && 
							tmp.kode_ang == this.eAngkatan.getText() && 
							tmp.kode_jur == this.eJurusan.getText() &&
							tmp.kode_produk == this.sg1.getCell(0,row) ) { found = true;break;}
					}
					if (found){						
						this.sg1.setCell(2,row,1);				
						this.sg1.setCell(3,row,parseFloat(tmp.nilai_bpp));				
						this.sg1.setCell(4,row,parseFloat(tmp.nilai_bpp));				
					}
				}
				this.sg1.setCell(5,row,dataProduk.get("jenis"));
				this.sg1.setCell(6,row,dataProduk.get("akun_lawan"));
				this.sg1.setCell(7,row,dataProduk.get("akun_piutang"));
				this.sg1.setCell(8,row,dataProduk.get("akun_pdd"));
				this.sg1.setCell(9,row,dataProduk.get("kode_pp"));
				this.sg1.setCell(10,row,dataProduk.get("kode_drk"));
			}
		}else system.alert(this,e,"");
	}
	this.doNilaiChange();
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doNilaiChange = function()
{
	try
	{
		var total=0;
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{				
				if (this.sg1.getCell(7,i).substr(0,1) == '4')
					total += nilaiToFloat(this.sg1.getCell(4,i));							
				else total -= nilaiToFloat(this.sg1.getCell(4,i));							
			}
		}
		this.eTotal.setText(floatToNilai(total));		
	}catch(e)
	{
		alert("[app_saku_piutang_transaksi_fkorKTS]::doNilaiChange:"+e);
	}
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doGenerate = function(sender)
{
	this.e01.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "armhs_m", "no_invoice", "KINV"+this.ePeriode.getText().substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));		
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.formatNumeric = function(format, idx)
{
	result = idx;
	for (var i =0;i < format.length;i++)
	{
		if (result.length < format.length)
			result = "0" + result;      
	}
	return result;
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};
window.app_saku_piutang_transaksi_fkorKTS.prototype.editChange = function(sender)
{
	try{
		var dt = this.dbLib.execSQL("select a.*, b.semester, b.nama_mhs, b.kode_jur, c.nama_jur, b.kode_ang, d.nama_ang from armhs_m a inner join mhs b on b.npm = a.ref1 and b.kode_lokasi = a.kode_lokasi "+
			"inner join jurusan c on c.kode_jur = b.kode_jur and c.kode_lokasi = a.kode_lokasi "+
			"inner join angkatan d on d.kode_ang = b.kode_ang and d.kode_jur = b.kode_jur and d.kode_lokasi = a.kode_lokasi "+
			" where a.no_invoice = '"+this.e0.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");	
		
		if (typeof(dt) == "object"){				
			dt = dt.rs.rows[0];		
			if (dt == undefined) return;
			this.dataKts = dt;		
			this.dpTgl.setDateString(dt.tanggal);
			this.ePeriode.setText(dt.periode);
			this.eSemester.setText(dt.semester);			
			this.eThn.setText(dt.thn_ajar.split("/")[0]);
			this.eThn2.setText(dt.thn_ajar.split("/")[1]);
			this.eGjl.setText(dt.sem_gg == "1" ? "Ganjil" :"Genap");
			this.eKeterangan.setText(dt.keterangan);			
			this.eDisc.setText(floatToNilai(parseFloat(dt.disc == ""?0:dt.disc)));
			
			dt = this.dbLib.execSQL("select a.kode_produk, b.nama_produk , a.jumlah,a.nilai, a.jumlah * a.nilai as subtotal "+
					"  , a.periode_awal, b.jenis, a.akun_pdpt, a.akun_piutang, a.akun_pdd "+
					"  , b.kode_pp, case b.kode_akun when '' then b.kode_drk_beban else b.kode_drk_pdpt end as kode_drk "+
					" from armhs_d a inner join produk b on b.kode_produk = a.kode_produk and b.kode_lokasi = a.kode_lokasi "+
					"where a.no_invoice = '"+this.e0.getText()+"' ");
			
			var line, data;	
			this.sg1.clear();
			if (dt== undefined || dt.rs == undefined) return;
			for (var i in dt.rs.rows){
				line = dt.rs.rows[i];
				data = new Array();
				for (var c in line) 
					if (c == "nilai" || c == "subtotal")
						data.push(floatToNilai(parseFloat(line[c])));
					else 
						data.push(line[c]);
				this.sg1.appendData(data);
			}
			this.doNilaiChange();			
			this.dataKtsD = dt;
			setTipeButton(tbUbahHapus);
		}
	}catch(e){
		alert("editChage::"+e+" "+dt);
	}
};