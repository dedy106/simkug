/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fKTS = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_transaksi_fKTS.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fKTS";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","KTS Mahasiswa : Input", 0);
		
		try
		{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_saiCB");
			this.e0 = new portalui_saiLabelEdit(this);
			this.e0.setLeft(20);
			this.e0.setTop(30);
			this.e0.setWidth(200);
			this.e0.setCaption("No KTS");
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
			this.l1.setWidth(100);
			this.l1.setHeight(20);
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
			
			this.dpTgl = new portalui_datePicker(this);
			this.dpTgl.setTop(55);
			this.dpTgl.setLeft(120);
			this.dpTgl.setWidth(100);		
			this.dpTgl.onSelect.set(this,"doSelectDate");
			
			this.ePeriode = new portalui_saiLabelEdit(this);
			this.ePeriode.setLeft(20);
			this.ePeriode.setTop(80);
			this.ePeriode.setWidth(150);
			this.ePeriode.setCaption("Periode");
			this.ePeriode.setText(this.app._periode);		
			this.ePeriode.setReadOnly(true);
			
			this.eSemester = new portalui_saiCB(this);
			this.eSemester.setTop(105);
			this.eSemester.setLeft(20);
			this.eSemester.setWidth(150);
			this.eSemester.setCaption("Semester");
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
			
			this.eMhs = new portalui_saiCBBL(this);
			this.eMhs.setLeft(20);
			this.eMhs.setTop(255);
			this.eMhs.setWidth(200);
			this.eMhs.setCaption("NPM/NIM");
			this.eMhs.setText("");	
			this.eMhs.onBtnClick.set(this,"FindBtnClick");
			
			this.eDisc = new portalui_saiLabelEdit(this);
			this.eDisc.setTop(280);
			this.eDisc.setLeft(20);
			this.eDisc.setWidth(200);		
			this.eDisc.setTipeText(ttNilai);
			this.eDisc.setAlignment(alRight);
			this.eDisc.setCaption("Discount");
			
			uses("portalui_saiGrid;portalui_sgNavigator");
			this.sg1 = new portalui_saiGrid(this);
			this.sg1.setTop(310);
			this.sg1.setLeft(20);
			this.sg1.setWidth(700);
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
			
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(480);
			this.sgn.setHeight(25);
			this.sgn.setLeft(20);
			this.sgn.setWidth(700);
			this.sgn.setButtonStyle(0);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");
			this.rowPerPage = 100;
			
			this.eTotal = new portalui_saiLabelEdit(this.sgn);
			this.eTotal.setTop(1);
			this.eTotal.setLeft(490);
			this.eTotal.setWidth(200);
			this.eTotal.setCaption("Total");
			this.eTotal.setAlignment(alRight);
			this.eTotal.setTipeText(ttNilai);
			this.eTotal.setReadOnly(true);
			
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
			this.eJurusan.onExit.set(this,"doEditExit");
			this.eAngkatan.onExit.set(this,"doEditExit");
			this.eMhs.onExit.set(this,"doEditExit");					
			this.eJurusan.setSQL("select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ", new Array("kode_jur","nama_jur"), this.dbLib2);			
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onChange.set(this, "doSGChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onNilaiChange.set(this, "doSGNilaiChange");
			this.doLoadDataBPP();
			this.sg1.appendRow();
			this.rearrangeChild(10,23);
			this.setPeriodeAwal();
			this.dpTgl.setDateString((new Date).getDateStr());
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fKTS]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fKTS.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fKTS.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{		
		try{
			var cek, prd = new Array();
			for (var i=0;i < this.sg1.getRowCount();i++){ 
				if (this.sg1.getCell(6,i) == "BPP") {
					prd.push("'"+this.sg1.cells(5,i)+"'");
					break;
				}
			}
			cek = this.dbLib.runSQL("select a.no_invoice from armhs_m a inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
					' inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = a.kode_lokasi '+
					" where a.ref1 = '"+this.eMhs.getText()+"' and b.periode_awal in ("+prd +") and c.jenis = 'BPP' and a.flag_hapus = '0' ");			
			if (cek instanceof portalui_arrayMap) 
				if (cek.get(0) != undefined)
					throw(this.eMhs.getText() + " sudah mempunyai tagihan BPP untuk periode "+ prd +". "+cek.get(0).get("no_invoice"));
			
			if (this.app._periode > this.ePeriode.getText()) 
					throw("Periode input tidak boleh kurang dari Periode GL ("+this.app._periode+")");						
			system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");		
		}catch(e){
			system.alert(this, e,"");
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
window.app_saku_piutang_transaksi_fKTS.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, ["0"],this.e0);				
				this.sg1.clear(1);
				this.dpTgl.setDateString((new Date).getDateStr());
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, ["0"])))
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
					this.dbLib.execArraySQL(sql);					
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_transaksi_fKTS.prototype.insertData = function(sql)
{	
	try{
		var line, nilaiAR, akunAR, akunPdd, jenis;	
		var scriptARM = "insert into armhs_m(no_invoice, tanggal,keterangan,nilai,periode,thn_ajar,sem_gg,user_id,kode_lokasi,ref1,ref2,progress,nilai_bd, posted,flag_hapus, disc, semester) values";
		var scriptARD = "insert into armhs_d(no_invoice,kode_produk,semester,akun_piutang,akun_pdpt,akun_pdd,jumlah,nilai,periode_awal,periode_akhir,flag_amor, kode_lokasi) values";
		var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
		
		var akunAR, akunPdd, kodePP, kodeDRK, jurnal = false;
		scriptARM += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',"+parseNilai(this.eTotal.getText())+", "+
					" '"+this.ePeriode.getText()+"','"+this.eThn.getText()+"/"+this.eThn2.getText()+"','"+(this.eGjl.getText().toLowerCase() == "ganjil" ? "1":"2")+"','"+this.app._userLog+"', "+
					" '"+this.app._lokasi+"','"+this.eMhs.getText()+"','-','0',0,'F','0',"+parseNilai(this.eDisc.getText())+",'"+this.eSemester.getText()+"')";			
		sql.add("update mhs set semester = '"+this.eSemester.getText()+"' where npm ='"+this.eMhs.getText()+"' and kode_lokasi = '"+this.app._lokasi +"' ");
		var nourut = 0;		
		
		if (this.app._dbEng == "mysqlt"){
			var cekadaAR = false, akunARBeban, adaBeban = false, nilaiBeban = 0, indexAR = -1;
			for (var i=0;i < this.sg1.getRowCount();i++){
				cekadaAR = cekadaAR || this.sg1.cells(7,i).substr(0,1) == "4";
				if (this.sg1.cells(7, i).substr(0, 1) == "4") {
					akunARBeban = this.sg1.cells(8, i);
					indexAR = i;
				}else if (this.sg1.cells(7, i).substr(0, 1) == "5") {
					adaBeban = true;
					nilaiBeban += parseFloat(this.sg1.cells(4,i)); 
				}				
			}
			if (adaBeban && cekadaAR){
				var scriptByrM = "insert into arbyrmhs_m(no_bukti, tanggal,keterangan,nilai,periode,jenis,user_id,kode_lokasi,ref1,ref2,progress,flag_hapus, disc,posted, cd_ambil, nilai_bd) values ";
				var scriptByrD = "insert into arbyrmhs_d(no_bukti,kode_produk,akun_piutang,akun_lawan,nilai,disc,kode_lokasi) values ";
				scriptByrM +="('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.sg1.cells(1,i)+"','"+nilaiBeban+"','"+this.ePeriode.getText()+"','BB','"+this.app._userLog+"','"+this.app._lokasi+"', "+
						" '"+this.eMhs.getText()+"','"+this.e0.getText()+"',1, '0',0,'T',0,0)";
				var firstByr = true;
			}
			for (var i=0;i < this.sg1.getRowCount();i++)
			{							
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
			if (jurnal) sql.add(scriptJurnal);		
		}					
		this.dbLib.execArraySQL(sql);	
	}catch(e){
		system.alert(this,e,this+" ");
	}
};
window.app_saku_piutang_transaksi_fKTS.prototype.doLoadDataBPP = function(sender)
{
	try{					
		var rs = this.dbLib.loadQuery("select semester, kode_ang, kode_jur,kode_produk,  jml_batas,nilai_batas, nilai_bpp,jml_bulan  from param_bpp where kode_lokasi  = '"+this.app._lokasi+"' ");					
		this.dataBPP = rs.split("\r\n");
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_saku_piutang_transaksi_fKTS.prototype.doCellExit = function(sender, col, row)
{
	if (col == 2 || col == 3){
		var sub = parseNilai(this.sg1.cells(2, row)) * parseNilai(this.sg1.cells(3,row)); 
		this.sg1.setCell(4, row, floatToNilai(sub));
	}
};
window.app_saku_piutang_transaksi_fKTS.prototype.FindBtnClick = function(sender, event)
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
										  "select npm, nama_mhs from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' and kode_ang ='"+this.eAngkatan.getText()+"'",
										  "select count(*) from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' and kode_ang ='"+this.eAngkatan.getText()+"' ",
										  ["npm","nama_mhs"],"and",["NPM/NIM","Nama"]);
			break;
	}
};
window.app_saku_piutang_transaksi_fKTS.prototype.doRequestReady = function(sender, methodName, result)
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
		            }else system.alert(this,result,"");
    				break;
    		}
		}catch(e)
		{
		   alert("step : "+step+"; error = "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fKTS.prototype.doFindBtnClick = function(sender, col, row) 
{
	this.standarLib.showListDataForSG(this, "Daftar Produk",this.sg1, this.sg1.row, this.sg1.col, 
									  "select a.kode_produk, a.nama_produk from produk a where a.kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
									  "select count(a.kode_produk)  from produk a where a.kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
									  ["kode_produk","nama_produk"],"and",["Kode Produk","Nama Produk"],false);
};
window.app_saku_piutang_transaksi_fKTS.prototype.doSGChange = function(sender, col, row) 
{	
	if (col == 1){		
		if (this.sg1.findText(this.sg1.cells(0, row), 0, row, true)){
			system.alert(this, "Produk "+this.sg1.cells(0, row)+" sudah ada.","Produk dibatalkan");
			this.sg1.clearRow(row);
			return false;
		}
		var dataBPP = this.dataBPP;
		var tmp, found;
		var rs = this.dbLib.runSQL("Select Kode_produk,Nama_produk,nilai,jenis,kode_drk_pdpt,"+
                             "case when kode_akun = '' or kode_akun = '-' then akun_beban else kode_akun end as akun_lawan,"+
	                             "case when akun_piutang = '' or akun_piutang = '-' then '-' else akun_piutang end as akun_piutang,"+
	                             "case when akun_pdd = '' or akun_pdd = '-' then '-' else akun_pdd end as akun_pdd,kode_pp,"+
	                             "case when kode_akun = '' or kode_akun ='-' then kode_drk_beban else kode_drk_pdpt end as kode_drk "+
                             "from produk where  kode_jur='"+this.eJurusan.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"' and kode_produk = '"+this.sg1.getCell(0, row)+"' ");		
		if (rs instanceof portalui_arrayMap){
			var dataProduk = rs.get(0);
			if (dataProduk != undefined){
				this.sg1.setCell(6,row,dataProduk.get("jenis"));
				this.sg1.setCell(7,row,dataProduk.get("akun_lawan"));
				this.sg1.setCell(8,row,dataProduk.get("akun_piutang"));
				this.sg1.setCell(9,row,dataProduk.get("akun_pdd"));
				this.sg1.setCell(10,row,dataProduk.get("kode_pp"));
				this.sg1.setCell(11,row,dataProduk.get("kode_drk"));
				
				var jenis = dataProduk.get("jenis");								
				if (jenis == "LAINNYA") {
					this.sg1.setCell(2,row,"0");				
					this.sg1.setCell(3,row,parseFloat(dataProduk.get("nilai")));				
					this.sg1.setCell(4,row,"0");				
				}else if (jenis == "SKS"){
					found = false;
					for (var j=1; j < dataBPP.length; j++){
						tmp = dataBPP[j].split(";");
						if (tmp[0] == this.eSemester.getText() && 
							tmp[1] == this.eAngkatan.getText() && 
							tmp[2] == this.eJurusan.getText()  ) { found = true; break;}
					}
					if (found){						
						this.sg1.setCell(2,row,parseFloat(tmp[4]));				
						this.sg1.setCell(3,row,parseFloat(tmp[5]));				
						this.sg1.setCell(4,row,parseFloat(tmp[4]) * parseFloat(tmp[5]));
					}
				}else if (jenis == "BPP"){										
					found = false;					
					for (var j=1; j < dataBPP.length; j++){
						 tmp = dataBPP[j].split(";");
						if (tmp[0] == this.eSemester.getText() && 
							tmp[1] == this.eAngkatan.getText() && 
							tmp[2] == this.eJurusan.getText() &&
							tmp[3] == this.sg1.getCell(0,row) ) { found = true;;break;}
					}
					if (found){						
						this.sg1.setCell(2,row,1);				
						this.sg1.setCell(3,row,parseFloat(tmp[6]));				
						this.sg1.setCell(4,row,parseFloat(tmp[6]));				
					}
				}
			}			
		}else system.alert(this,e,"");
	}	
	this.doNilaiChange();
};
window.app_saku_piutang_transaksi_fKTS.prototype.doNilaiChange = function()
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
		alert("[app_saku_piutang_transaksi_fKTS]::doNilaiChange:"+e);
	}
};
window.app_saku_piutang_transaksi_fKTS.prototype.doGenerate = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "armhs_m", "no_invoice", "INV"+this.ePeriode.getText().substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));		
};
window.app_saku_piutang_transaksi_fKTS.prototype.formatNumeric = function(format, idx)
{
	result = idx;
	for (var i =0;i < format.length;i++)
	{
		if (result.length < format.length)
			result = "0" + result;      
	}
	return result;
};
window.app_saku_piutang_transaksi_fKTS.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};
window.app_saku_piutang_transaksi_fKTS.prototype.setPeriodeAwal = function()
{
	var prd = this.app._periode.substr(0,4) + '01';
	for (var i=1;i <= 16;i++){				
		this.sg1.columns.get(5).pickList.set(i,prd);
		prd = nextNPeriode(prd,1);
	}
};
window.app_saku_piutang_transaksi_fKTS.prototype.doEditExit = function(sender)
{
	sender.checkItem();	
};
window.app_saku_piutang_transaksi_fKTS.prototype.doEditChange = function(sender)
{
	if (sender == this.eJurusan){
		this.eAngkatan.setSQL("select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+sender.getText()+"' ", new Array("kode_ang","nama_ang"), this.dbLib2);
		this.sg1.clear(1);	
		this.eAngkatan.setText("");
		this.eMhs.setText("");
	}else if (sender == this.eAngkatan){
		this.eMhs.setSQL("select npm, nama_mhs from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_ang = '"+sender.getText()+"' and kode_jur ='"+this.eJurusan.getText()+"' ", new Array("npm","nama_mhs"), this.dbLib2);					
		this.eMhs.setText("");
	}
};
