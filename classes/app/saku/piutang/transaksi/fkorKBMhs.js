/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fkorKBMhs = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fkorKBMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fkorKBMhs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kas Bank Mhs : Koreksi", 0);
		
		try
		{
			this.eJenis = new portalui_saiCB(this);
			this.eJenis.setTop(10);
			this.eJenis.setLeft(20);
			this.eJenis.setWidth(200);
			this.eJenis.setCaption("Jenis");
			this.eJenis.addItem(0,"KM");
			this.eJenis.addItem(1,"BM");
			this.eJenis.addItem(2,"TT");
			
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox");
			this.e0 = new portalui_saiCBBL(this);
			this.e0.setLeft(20);
			this.e0.setTop(35);
			this.e0.setWidth(200);
			this.e0.setCaption("No BuktiKas");
			this.e0.setText("");
			this.e0.setReadOnly(false);			
			this.e0.setLabelWidth(100);		
			this.e0.onBtnClick.set(this,"FindBtnClick");			
			this.e0.onChange.set(this,"editChange");										
			this.e0.setRightLabelVisible(false);
			
			this.e01 = new portalui_saiLabelEdit(this);
			this.e01.setLeft(320);
			this.e01.setTop(35);
			this.e01.setWidth(200);
			this.e01.setCaption("No BuktiKas Baru");
			this.e01.setText("");
			this.e01.setReadOnly(true);			
			this.e01.setLabelWidth(100);					
			
			this.bGenerate = new portalui_button(this);
			this.bGenerate.setTop(35);
			this.bGenerate.setLeft(520);
			this.bGenerate.setCaption("Generate");
			this.bGenerate.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGenerate.onClick.set(this,"doGenerate");		
			
			this.l1 = new portalui_label(this);
			this.l1.setLeft(20);
			this.l1.setTop(60);
			this.l1.setWidth(100);
			this.l1.setHeight(20);
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
						
			this.dpTgl = new portalui_datePicker(this);
			this.dpTgl.setTop(60);
			this.dpTgl.setLeft(120);
			this.dpTgl.setWidth(100);		
			this.dpTgl.onSelect.set(this,"doSelectDate");
			
			this.ePeriode = new portalui_saiLabelEdit(this);
			this.ePeriode.setLeft(20);
			this.ePeriode.setTop(85);
			this.ePeriode.setWidth(150);
			this.ePeriode.setCaption("Periode");
			this.ePeriode.setText(this.app._periode);		
			this.ePeriode.setReadOnly(true);
			
			this.eKeterangan = new portalui_saiLabelEdit(this);
			this.eKeterangan.setLeft(20);
			this.eKeterangan.setTop(110);
			this.eKeterangan.setWidth(400);
			this.eKeterangan.setCaption("Keterangan");
			this.eKeterangan.setText("");					
			
			this.eAkun = new portalui_saiCBBL(this);
			this.eAkun.setTop(135);
			this.eAkun.setLeft(20);
			this.eAkun.setWidth(200);
			this.eAkun.setCaption("Akun KasBank");
			this.eAkun.onBtnClick.set(this,"FindBtnClick");
			
			this.cbLoad = new portalui_checkBox(this,{bound:[630,135,200,20],caption:"Default Akun",selected:true});
			
			this.bLoad = new portalui_button(this);
			this.bLoad.setTop(135);
			this.bLoad.setLeft(760);
			this.bLoad.setCaption("Load Data");
			this.bLoad.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bLoad.onClick.set(this,"doGenerate");		
			
			this.bJurnal = new portalui_button(this);
			this.bJurnal.setTop(135);
			this.bJurnal.setLeft(840);
			this.bJurnal.setCaption("Lihat Jurnal");
			this.bJurnal.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bJurnal.onClick.set(this,"doGenerate");		
			
			uses("portalui_saiGrid");
			this.sg1 = new portalui_saiGrid(this);
			this.sg1.setTop(160);
			this.sg1.setLeft(20);
			this.sg1.setWidth(900);
			this.sg1.setHeight(300);			
			this.sg1.setColCount(10);
			this.sg1.setColTitle(new Array('FLAG','No Pembayaran','Tanggal','Keterangan','Nilai','Discount','Periode','No Invoice','NPM','Jurusan'));
			this.sg1.setColWidth(new Array(9,8,7,6,5,4,3,2,1,0), new Array(100,100,100,80,100,100,110,250,80,100,100,80));
			this.sg1.setColFormat([4,5],[cfNilai, cfNilai]);
			this.sg1.setColumnReadOnly(true,[1,2,3,4,5,6,7,8,9],[]);
			this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
			var val = new portalui_arrayMap();
			    val.set(1, "TRUE");
				val.set(2, "FALSE");	
			this.sg1.columns.get(0).setPicklist(val);			
			
			uses("portalui_sgNavigator");
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(460);
			this.sgn.setLeft(20);
			this.sgn.setWidth(900);
			this.sgn.setButtonStyle(3);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");			
			this.sgn.setTotalPage(1);
			
			this.eTotal = new portalui_saiLabelEdit(this.sgn);
			this.eTotal.setTop(1);
			this.eTotal.setLeft(670);
			this.eTotal.setWidth(200);			
			this.eTotal.setAlignment(alRight);
			this.eTotal.setTipeText(ttNilai);
			this.eTotal.setReadOnly(true);
			this.eTotal.setCaption("Total");
			//--------------
			
			setTipeButton(tbHapus);
			this.maximize();		
			this.setTabChildIndex();
		
			uses("util_dbLib");
			this.dbLib = new util_dbLib(window.system.serverApp);
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.dtJurnal = new portalui_arrayMap();
			this.rearrangeChild(10,23);
			this.eJenis.onChange.set(this,"doEditChange");
			this.cbLoad.onChange.set(this,"doEditChange");
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fkorKBMhs]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fkorKBMhs.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.mainButtonClick = function(sender)
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
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.doModalResult = function(event, modalResult)
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
					this.dbLib.execArraySQL(sql);	
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
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.insertData = function(sql)
{	
	if (this.dataAsli != undefined){
		var hapus = false;
		if (this.dataAsli.periode < this.app._periode){
			this.hapusData(sql);
		}else {			
			sql.add("update arbyrmhs_m a, arkb_d b set a.progress = '0' where b.kode_lokasi = a.kode_lokasi and b.no_bukti = a.no_bukti and b.no_buktikas = '"+this.e0.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("delete from arkb_d where no_buktikas = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("delete from arkb_m where no_buktikas = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("delete from armhs_j where no_bukti = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");						
			hapus = true;
		}
	}
	if (true){		
		if (!hapus) this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "arkb_m", "no_buktikas", this.eJenis.getText()+this.ePeriode.getText().substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
		var line;	
		var script1 = "insert into arkb_m(no_buktikas, tanggal, keterangan, akun_kasbank, nilai_kasbank, periode, ref1, ref2, modul, jenis, flag_hapus, ref3, kode_lokasi,posted, nik_user) values";		
		var script3 = "insert into arkb_d(no_buktikas, no_urut, no_bukti, nilai, progress, kode_lokasi) values ";
		var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) ";
		script1 += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eAkun.getText()+"', "+
				"'"+parseNilai(this.eTotal.getText())+"','"+this.ePeriode.getText()+"','-','-','ARMHS','"+this.eJenis.getText()+"','0','-','"+this.app._lokasi+"','F','"+this.app._userLog+"')";
		var inv = new Array();	
		if (this.app._dbEng == "mysqlt"){
			var appInv = 0;
			for (var i = 0;i < this.sg1.getRowCount();i++){			
				if (this.sg1.cells(0,i).toUpperCase() == "TRUE")
				{								
					if (appInv > 0) {script3 += ",";}
					appInv++;
					script3 += "('"+this.e0.getText()+"','"+appInv+"','"+this.sg1.getCell(1,i)+"','"+parseNilai(this.sg1.getCell(4,i))+"','0','"+this.app._lokasi+"')";
					inv.push("'"+this.sg1.cells(1,i)+"'");
					
				}
			}									
			if (inv.length > 0){
				sql.add(script1);
				var script2 = "update arbyrmhs_m set progress = '1' where kode_lokasi = '"+this.app._lokasi+"' ";	
				sql.add(script2 + " and no_bukti in ("+inv+")");		
				//pake no dokumen untuk antisipasi dari upload pembayaran
				scriptJurnal += "select '"+this.e0.getText()+"',no_dokumen, no_urut, tanggal, case when kode_akun = 'AKUNIM' then '"+this.eAkun.getText()+"' else kode_akun end, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j_byr where  no_dokumen in ("+inv+")";
				sql.add(scriptJurnal);
				sql.add(script3);
			}
		}					
	}
	if (!hapus){		
		/*var line;	
		var script1 = "update arkb_m set keterangan = '"+this.eKeterangan.getText()+"' , akun_kasbank ='"+this.eAkun.getText()+"', "+
			"	nilai_kasbank='"+parseNilai(this.eTotal.getText())+"' where no_buktikas ='"+this.e01.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'";		
		var script2 = "update arbyrmhs_m set progress = '0' where kode_lokasi = '"+this.app._lokasi+"' ";			
		var script3 = "delete from arkb_d where kode_lokasi = '"+this.app._lokasi+"' ";
		var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) ";		
		var inv = new Array();	
		if (this.app._dbEng == "mysqlt"){
			var appInv = 0;
			var tot = 0;
			for (var i = 0;i < this.sg1.getRowCount();i++){			
				if (this.sg1.cells(0,i).toUpperCase() == "FALSE"){			
					line = this.sg1.data.get(i);
					inv.push("'"+sg1.cells(1,i)+"'");
					tot += nilaiToFloat(sg1.cells(4,i));
				}
			}					
			sql.add(script1);			
			if (inv.length > 0){
				sql.add(script2 + " and no_bukti in ("+inv+")");		
				sql.add(script3 + " and no_bukti in ("+inv+")");		
				scriptJurnal += "select '"+this.e0.getText()+"',no_dokumen, no_urut, tanggal, kode_akun, case when dc ='D' then 'C' else 'D' end as dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j where  no_dokumen in ("+inv+") and no_bukti = '"+this.e0.getText()+"' and modul <> 'ARIM'";
				scriptJurnal += "select '"+this.e0.getText()+"',no_dokumen, no_urut, tanggal, kode_akun, case when dc ='D' then 'C' else 'D' end as dc, keterangan, "+tot+",modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j where  no_dokumen in ("+inv+") and no_bukti = '"+this.e0.getText()+"' and modul ='ARIM'";
				sql.add(scriptJurnal);
			}					
		}*/					
	}	
};
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.hapusData = function(sql)
{	
	if (this.dataAsli != undefined){
		var hapus = false;
		if (this.dataAsli.periode < this.app._periode){
			this.dpTgl.setDateString(this.app._periode.substr(0,4)+"/"+this.app._periode.substr(4)+"/"+"01" );
		}else {			
			sql.add("update arbyrmhs_m a, arkb_d b set a.progress = '0' where b.kode_lokasi = a.kode_lokasi and b.no_bukti = a.no_bukti and b.no_buktikas = '"+this.e0.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("delete from arkb_d where no_buktikas = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("delete from arkb_m where no_buktikas = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("delete from armhs_j where no_bukti = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
			hapus = true;
		}
	}
	if (!hapus){
		var line;	
		var script1 = "insert into arkb_m(no_buktikas, tanggal, keterangan, akun_kasbank, nilai_kasbank, periode, ref1, ref2, modul, jenis, flag_hapus, ref3, kode_lokasi,posted) values ";
		var script2 = "update arbyrmhs_m set progress = '0' where kode_lokasi = '"+this.app._lokasi+"' ";	
		var scriptUpd = "update arkb_m set flag_hapus = '"+this.e01.getText()+"' where kode_lokasi = '"+this.app._lokasi+"' and no_buktikas = '"+this.e0.getText()+"' ";	
		var script3 = "insert into arkb_d(no_buktikas, no_urut, no_bukti, nilai, progress, kode_lokasi) values ";
		var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) ";
		script1 += "('"+this.e01.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eAkun.getText()+"', "+
				"'-"+parseNilai(this.eTotal.getText())+"','"+this.ePeriode.getText()+"','-','-','ARMHS','"+this.eJenis.getText()+"','"+this.e0.getText()+"','-','"+this.app._lokasi+"','F')";
		var inv = new Array();	
		if (this.app._dbEng == "mysqlt"){
			for (var i in this.sg1.data.objList)
			{
				line = this.sg1.data.get(i);
				if (i > 0) {script3 += ",";}
				script3 += "('"+this.e01.getText()+"','"+i+"','"+line.get("no_bukti")+"','-"+parseFloat(line.get("nilai"))+"','0','"+this.app._lokasi+"')";
				inv.push("'"+line.get("no_bukti")+"'");
			}					
			sql.add(script1);
			if (inv.length > 0){
				sql.add(script2 + " and no_bukti in ("+inv+")");		
				scriptJurnal += "select '"+this.e01.getText()+"',no_dokumen, no_urut, tanggal, kode_akun, case when dc ='D' then 'C' else 'D' end as dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j where  no_bukti = '"+this.e0.getText()+"' ";
				sql.add(scriptJurnal);
			}
			sql.add(script3);
			sql.add(scriptJurnal);
		}				
	}	
};
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.FindBtnClick = function(sender, event)
{	
	switch(sender){
		case this.e0 :						
			this.standarLib.showListData(this, "Data Penerimaan Kas/Bank Mahasiswa",sender,undefined, 
										  "select no_buktikas, keterangan from arkb_m where kode_lokasi = '"+this.app._lokasi+"' and posted = 'F' and jenis = '"+this.eJenis.getText()+"' ",
										  "select count(*) from arkb_m where kode_lokasi = '"+this.app._lokasi+"' and posted = 'F' and jenis = '"+this.eJenis.getText()+"'",
										  ["no_buktikas","keterangan"],"and",["No Buktikas","Keterangan"]);
		break;		
		case this.eAkun :
			if (!this.cbLoad.isSelected())
				this.standarLib.showListData(this, "Data Akun",sender,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag in ('001','009','030') where a.kode_lokasi = '"+this.app._lokasi+"' ",
									  "select count(*) from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag in ('001','009','030') where a.kode_lokasi = '"+this.app._lokasi+"' ",
									  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama"]);									  
			else
				this.standarLib.showListData(this, "Data Akun",sender,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag = "+ (this.eJenis.getText()=="KM"?"'001'":this.eJenis.getText()=="BM"?"'009'":"'030'") +" where a.kode_lokasi = '"+this.app._lokasi+"' ",
									  "select count(*) from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag = "+ (this.eJenis.getText()=="KM"?"'001'":this.eJenis.getText()=="BM"?"'009'":"'030'") +" where a.kode_lokasi = '"+this.app._lokasi+"'",
									  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama"]);		
		break;		
	}
};
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.doGenerate = function(sender)
{
	if(sender == this.bGenerate)
		this.e01.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "arkb_m", "no_buktikas", "K"+this.eJenis.getText()+this.ePeriode.getText().substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
	if (sender == this.bLoad){
		this.editChange();
	}
	if (sender == this.bJurnal){
		try{
			this.createJurnal();
			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.setData(this.dtJurnal);
			this.jurnal.showModal();
		}catch(e){
			alert(e);
		}
	}	
};
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
	this.e0.setSQL("select distinct a.no_buktikas, a.no_bukti from arkb_d a "+
		"	inner join arkb_m b on b.no_buktikas = a.no_buktikas and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.posted = 'F' and b.jenis = '"+this.eJenis.getText()+"' ",["a.no_buktikas","a.no_bukti"],true);							
};
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.createJurnal = function()
{
	try{		
	}catch(e){
		alert(e);
	}
};
window.app_saku_piutang_transaksi_fkorKBMhs.prototype.editChange = function(sender)
{
	try{
		var dt = this.dbLib.execSQL("select a.tanggal, a.periode, a.keterangan, a.akun_kasbank, b.nama, a.jenis, a.nilai_kasbank "+
			"from arkb_m a inner join masakun b on b.kode_lokasi = a.kode_lokasi and b.kode_akun = a.akun_kasbank "+
			" where a.no_buktikas = '"+this.e0.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ");		

		if (typeof(dt) == "object"){		
			dt = dt.rs.rows[0];		
			this.sg1.clear();
			if (dt === undefined) return;
			this.dataAsli = dt;		
			this.dpTgl.setDateString(dt.tanggal);
			this.ePeriode.setText(dt.periode);
			this.eJenis.setText(dt.jenis);						
			this.eKeterangan.setText(dt.keterangan);		
			this.eAkun.setText(dt.akun_kasbank);
			this.eAkun.setRightLabelCaption(dt.nama);
			this.eTotal.setText(floatToNilai(parseFloat(dt.nilai_kasbank)));			
			
			var sql = new server_util_arrayList();
			sql.add("select 'TRUE' as flag, a.no_bukti, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan, a.nilai, a.disc, a.periode, a.ref2 as no_invoice, a.ref1 as npm, b.kode_jur  "+
				"from arbyrmhs_m a "+
				" inner join mhs b on b.kode_lokasi = a.kode_lokasi and b.npm = a.ref1 "+
				"	inner join arkb_d c on c.no_bukti = a.no_bukti and c.kode_lokasi = a.kode_lokasi "+
				" where c.no_buktikas = '"+this.e0.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ");
			sql.add("select * from armhs_j where no_bukti = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			var rs = this.dbLib.getMultiDataProvider(sql,true);
			var line, data;	
			this.sg1.clear();
			if (typeof rs != "string"){				
				this.dtJurnal = rs.result[1];				
				var row, data = rs.result[0];		
				for (var i in data.rs.rows){
					row = data.rs.rows[i];
					this.sg1.appendData([row.flag.toUpperCase(),row.no_bukti, row.tanggal, row.keterangan, floatToNilai(row.nilai), floatToNilai(row.disc), row.periode, row.no_invoice, row.npm, row.kode_jur]);
				}						
				this.dataAsliD = data;
			}else alert(rs);						
			setTipeButton(tbUbahHapus);
		}
	}catch(e){
		system.alert(this,e,"");
	}
};


window.app_saku_piutang_transaksi_fKBMhs.prototype.doEditChange = function(sender){
	if (sender == this.eJenis || sender == this.cbLoad){
		if (this.cbLoad.isSelected()){
			this.eAkun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag = "+ (sender.getText()=="KM"?"'001'":sender.getText()=="BM"?"'009'":"'030'") +" where a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"]);							
		}else{
			this.eAkun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag in ('001','009','030') where a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"]);							
		}
	}
};