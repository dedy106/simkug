window.app_saku_piutang_transaksi_fSetoranMhs = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fSetoranMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fSetoranMhs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Setoran Pembayaran : Input",0);
		
		try
		{
			uses("portalui_saiCBBL");
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
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
			
			uses("portalui_datePicker");
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
			
			this.eJenis = new portalui_saiCB(this);
			this.eJenis.setTop(105);
			this.eJenis.setLeft(20);
			this.eJenis.setWidth(180);	
			this.eJenis.setCaption("Jenis Bayar");
			this.eJenis.addItem(0,"Cash");			
			this.eJenis.addItem(1,"Transfer");			
			
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
			this.eKeterangan.setWidth(400);			
			this.eKeterangan.setCaption("Keterangan");
			
			this.eMhs = new portalui_saiCBBL(this);
			this.eMhs.setLeft(20);
			this.eMhs.setTop(205);
			this.eMhs.setWidth(200);
			this.eMhs.setCaption("NPM/NIM");
			this.eMhs.setText("");	
			this.eMhs.onBtnClick.set(this,"FindBtnClick");
			
			this.eKts = new portalui_saiCBBL(this);
			this.eKts.setLeft(20);
			this.eKts.setTop(230);
			this.eKts.setWidth(200);
			this.eKts.setCaption("KTS/No Invoice");
			this.eKts.setText("");	
			this.eKts.onBtnClick.set(this,"FindBtnClick");
			
			uses("portalui_saiGrid");
			this.sg1 = new portalui_saiGrid(this);
			this.sg1.setTop(255);
			this.sg1.setLeft(20);
			this.sg1.setWidth(700);
			this.sg1.setHeight(200);			
			this.sg1.setColCount(10);
			this.sg1.setColTitle(new Array("Kode Produk","Jenis Biaya","Jumlah","Nilai Satuan","Nilai Tagihan","Nilai Bayar","Jenis","Akun Lawan","Kode PP","Kode DRK"));		
			this.sg1.columns.get(0).setButtonStyle(bsEllips);				
			this.sg1.columns.get(3).setColumnFormat(cfNilai);
			this.sg1.columns.get(4).setColumnFormat(cfNilai);
			this.sg1.columns.get(5).setButtonStyle(bsAuto);
			var prd = '200803';
			for (var i=1;i <= 16;i++){				
				this.sg1.columns.get(5).pickList.set(i,prd);
				prd = nextNPeriode(prd,6);
			}
			uses("portalui_sgNavigator");
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(455);
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
		
			this.dbLib = new util_dbLib(window.system.serverApp);
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onChange.set(this, "doSGChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onNilaiChange.set(this, "doSGNilaiChange");
			this.doLoadDataBPP();
			this.sg1.appendRow();
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fSetoranMhs]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fSetoranMhs.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.mainButtonClick = function(sender)
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
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, ["0"],this.e0);				
				this.sg1.clear();
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
				}
				catch(e)
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
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.insertData = function(sql)
{	
	var line, nilaiAR, akunAR, akunPdd, jenis;	
	var scriptARM = "insert into arbyrmhs_m(no_bukti, tanggal,keterangan,nilai,periode,jenis,user_id,kode_lokasi,ref1,ref2,progress) values";
	var scriptARD = "insert into arbyrmhs_d(no_bukti,kode_produk,akun_piutang,akun_pdpt,akun_pdd,jumlah,nilai) values";
	var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, posted, user_id, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
	var akunAR, akunPdd, kodePP, kodeDRK;
	scriptARM += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',"+parseFloat(this.eTotal.getText())+", "+
				" '"+this.ePeriode.getText()+"','"+this.eJenis.getText()+"','"+this.app._userLog+"', "+
				" '"+this.app._lokasi+"','"+this.eMhs.getText()+"','"+this.eKts.getText()+"','0')";
	if (this.app._dbEng == "mysqlt"){
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
			if (i !=0) {scriptARD +=",";}						
			scriptARD += "('"+this.e0.getText()+"','"+this.sg1.cells(0,i)+"','"+this.eSemester.getText()+"','"+akunAR+"','"+this.sg1.cells(7,i)+"', "+
				" '"+this.sg1.cells(9,i)+"','"+this.sg1.cells(2,i)+"',"+parseNilai(this.sg1.cells(3,i))+",'"+this.sg1.cells(5,i)+"','"+nextNPeriode(this.sg1.cells(5,i),6)+"','0')";			
				
			if (this.sg1.cells(8,i)!= '-' && this.sg1.cells(7,i).substr(1,1) == "4"){          	
				scriptJurnal += "('"+this.e0.getText()+"','"+this.e0.getText()+"','1','"+this.dpTgl.getDateString()+"', '"+akunAR+"','D','"+this.eKeterangan.getText()+"','"+parseNilai(this.sg1.cells(4,i))+"' ,"+
					"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','F','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+kodePP+"','"+kodeDRK+"')";
				scriptJurnal += "('"+this.e0.getText()+"','"+this.e0.getText()+"','2','"+this.dpTgl.getDateString()+"', '"+akunPdd+"','C','"+this.eKeterangan.getText()+"','"+parseNilai(this.sg1.cells(4,i))+"' ,"+
					"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','F','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+kodePP+"','"+kodeDRK+"')";
			}
		}		
		sql.add(scriptARM);
		sql.add(scriptARD);		
	}else{				
		scriptARD = "";
		for (var i=0; i < this.sg1.rows.getLength(); i++)
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
			scriptARD += "insert into armhs_d(no_invoice,kode_produk,semester,akun_piutang,akun_pdpt,akun_pdd,jumlah,nilai,periode_awal,periode_akhir,flag_amor) values"+
				"('"+this.e0.getText()+"','"+line.get("kodeProduk")+"','"+line.get("semester")+"','"+line.get("akunAR")+"','"+line.get("akunLawan")+"', "+
			" '"+line.get("akunPdd")+"','"+line.get("jumlah")+"',"+parseFloat(line.get("nilaiSatuan"))+",'"+line.get("periodeAwal")+"','"+nextNPeriode(line.get("periodeAwal"),6)+"','0');";
		}
	}					
	this.dbLib.execArraySQL(sql);	
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doLoadDataBPP = function(sender)
{
	try{		
		
		var rs = this.dbLib.loadQuery("select semester, kode_ang, kode_jur,kode_produk,  jml_batas,nilai_batas, nilai_bpp  from param_bpp where kode_lokasi  = '"+this.app._lokasi+"' ");
		this.dataBPP = rs.split("\r\n");
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doEditChange = function(sender)
{
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.FindBtnClick = function(sender, event)
{
	switch(sender){
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
									  "select count(*) from mhs where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' and kode_ang ='"+this.eAngkatan.getText()+"' ",
									["npm","nama_mhs"],"and",["NPM/NIM","Nama"]);
			break;
		case this.eKts :
			this.standarLib.showListData(this, "Data KTS / Invoice",sender,undefined, 
								  "select no_invoice, keterangan from armhs_m where kode_lokasi = '"+this.app._lokasi+"' and ref1 ='"+this.eMhs.getText()+"' and flag_hapus = '0'",
								  "select count(*) from armhs_Mwhere kode_lokasi = '"+this.app._lokasi+"' and ref1 ='"+this.eMhs.getText()+"'",
								["no_invoice","keterangan"],"and",["KTS/No Invoice","Keterangan"]);
			break;
	}
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doFindBtnClick = function(sender, col, row) 
{
	this.standarLib.showListDataForSG(this, "Daftar Produk",this.sg1, this.sg1.row, this.sg1.col, 
								  "select a.kode_produk, a.nama_produk from produk a where a.kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
								  "select count(a.kode_produk)  from produk a where a.kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
								["kode_produk","nama_produk"],"and",["Kode Produk","Nama Produk"],false);
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doSGChange = function(sender, col, row) 
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
			this.doNilaiChange();
		}else system.alert(this,e,"");
	}	
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doNilaiChange = function()
{
	try
	{
		var total=0;
		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{				
				total += nilaiToFloat(this.sg1.getCell(4,i));							
			}
		}
		this.eTotal.setText(floatToNilai(total));		
	}catch(e)
	{
		alert("[app_saku_piutang_transaksi_fSetoranMhs]::doNilaiChange:"+e);
	}
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doGenerate = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "arbyrmhs_m", "no_bukti", "BYR"+this.app._periode.substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.formatNumeric = function(format, idx)
{
	result = idx;
	for (var i =0;i < format.length;i++)
	{
		if (result.length < format.length)
			result = "0" + result;      
	}
	return result;
};
window.app_saku_piutang_transaksi_fSetoranMhs.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
};