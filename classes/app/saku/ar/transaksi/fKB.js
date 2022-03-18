/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_ar_transaksi_fKB = function(owner)
{
	if (owner)
	{
		window.app_saku_ar_transaksi_fKB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_ar_transaksi_fKB";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setoran Kas Bank Piutang : Input", 0);
		
		try
		{
			this.eJenis = new portalui_saiCB(this);
			this.eJenis.setTop(10);
			this.eJenis.setLeft(20);
			this.eJenis.setWidth(200);
			this.eJenis.setCaption("Jenis");
			this.eJenis.addItem(0,"KM");
			this.eJenis.addItem(1,"BM");
			
			uses("portalui_saiCBBL");
			this.e0 = new portalui_saiLabelEdit(this);
			this.e0.setLeft(20);
			this.e0.setTop(35);
			this.e0.setWidth(200);
			this.e0.setCaption("No BuktiKas");
			this.e0.setText("");
			this.e0.setReadOnly(false);			
			this.e0.setLabelWidth(100);					
			
			this.bGenerate = new portalui_button(this);
			this.bGenerate.setTop(35);
			this.bGenerate.setLeft(230);
			this.bGenerate.setCaption("Generate");
			this.bGenerate.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGenerate.onClick.set(this,"doGenerate");		
			
			this.l1 = new portalui_label(this);
			this.l1.setLeft(20);
			this.l1.setTop(60);
			this.l1.setWidth(100);
			this.l1.setHeight(18);
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
			
			uses("portalui_datePicker");
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
			this.sg1.setColCount(11);
			this.sg1.setColTitle(['FLAG','No Pembayaran','Tanggal','Keterangan','Nilai','Discount','Periode','No Invoice','Customer','Nama Customer','Akun IM']);
			this.sg1.setColWidth([10,7,6,5,4,3,2,1],[100,250,80,80,250,100,110,200]);
			this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
			var val = new portalui_arrayMap();
			    val.set(1, "TRUE");
				val.set(2, "FALSE");	
			this.sg1.columns.get(0).setPicklist(val);
			this.sg1.columns.get(7).setColumnFormat(cfNilai);
			this.sg1.setColumnReadOnly(true,[1,2,3,4,5,6,7,8,9,10],[0]);
			
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
			this.eTotal.setCaption("Total");
			this.eTotal.setReadOnly(true);
			
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar;app_saku_fJurnalViewer");
			this.standarLib = new util_standar();
			this.dtJurnal = undefined;
			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(new Array("Kode Akun","Nama","DC","Keterangan","Nilai","Kode PP","Kode DRK"));			
			
			this.sg1.onChange.set(this,"sgChange");
			this.rearrangeChild(10,23);
			this.dpTgl.setDateString(new Date().getDateStr());
		}catch(e)
		{
			alert("[app_saku_ar_transaksi_fKB]->constructor : "+e);
		}
	}
};
window.app_saku_ar_transaksi_fKB.extend(window.portalui_childForm);
window.app_saku_ar_transaksi_fKB.prototype.mainButtonClick = function(sender)
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
window.app_saku_ar_transaksi_fKB.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e0);				
				this.sg1.clear();
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0"])))
			{
				try
				{
					this.createJurnal();
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
					this.dbLib.execArraySQL(sql);					
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_ar_transaksi_fKB.prototype.insertData = function(sql)
{	
	var line;	
	var script1 = "insert into arkb_m(no_buktikas, tanggal, keterangan, akun_kasbank, nilai_kasbank, periode, ref1, ref2, modul, jenis, flag_hapus, ref3, kode_lokasi,posted, nik_user) values";
	
	var script3 = "insert into arkb_d(no_buktikas, no_urut, no_bukti, nilai, progress, kode_lokasi) values ";
	var scriptJurnal = "insert into ar_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
	script1 += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eAkun.getText()+"', "+
			"'"+parseNilai(this.eTotal.getText())+"','"+this.ePeriode.getText()+"','-','-','ARMHS','"+this.eJenis.getText()+"','0','-','"+this.app._lokasi+"','F','"+this.app._userLog+"')";
	var inv = new Array();	
	if (this.app._dbEng == "mysqlt"){
		for (var i in this.sg1.data.objList)
		{
			line = this.sg1.data.get(i);
			if (i > 0) {script3 += ",";}
			script3 += "('"+this.e0.getText()+"','"+i+"','"+line.get("no_bukti")+"','"+parseFloat(line.get("nilai"))+"','0','"+this.app._lokasi+"')";
			inv.push("'"+line.get("no_bukti")+"'");
		}		
		var urut=0;
		for (var i in this.dtJurnal.objList){
			line = this.dtJurnal.get(i);			
			urut++;
			if (line.get("dc") =="D"){
				if (urut >0) {scriptJurnal += ",";}
				scriptJurnal+="('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getDateString()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_AM','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}
		for (var i in this.dtJurnal.objList){
			line = this.dtJurnal.get(i);			
			urut++;
			if (line.get("dc") =="C"){				
				scriptJurnal+=" ,('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getDateString()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_AM','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}		
		sql.add(script1);
		var script2 = "update arbyrmhs_m set progress = '1' where kode_lokasi = '"+this.app._lokasi+"' ";	
		if (inv.length > 0)
			sql.add(script2 + " and no_bukti in ("+inv+")");		
		sql.add(script3);
		sql.add(scriptJurnal);
	}else{
		script = "";
		scriptARM = "";
		scriptARD = "";
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{										
		}
		
	}					
	this.dbLib.execArraySQL(sql);	
};
window.app_saku_ar_transaksi_fKB.prototype.FindBtnClick = function(sender, event)
{
	switch(sender){
		case this.eAkun :
			this.standarLib.showListData(this, "Data Akun",sender,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag = "+ (this.eJenis.getText()=="KM"?"'001'":"'009'") +" where a.kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(*) from masakun a inner join flag_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.kode_flag = "+ (this.eJenis.getText()=="KM"?"'001'":"'009'") +" where a.kode_lokasi = '"+this.app._lokasi+"'",
										 ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama"]);
			break;		
	}
};
window.app_saku_ar_transaksi_fKB.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_ar_transaksi_fKB.prototype.doGenerate = function(sender)
{
	if(sender == this.bGenerate)
		this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "arkb_m", "no_buktikas", this.eJenis.getText()+this.ePeriode.getText().substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
	if (sender == this.bLoad){
		var isnull = this.app._dbEng == "mysqlt" ? "ifnull" : "isnull";
		var rs = this.dbLib.runSQL(
				"select 'FALSE' as flag, a.no_bukti, a.tanggal, a.keterangan, a.nilai,0 as disc, a.periode, a.ref1 as no_invoice, a.kode_cust as npm, b.nama,a.akun_im "+
				"from arbyr_m a "+
				" inner join cust b on b.kode_lokasi = a.kode_lokasi and b.kode_cust = a.kode_cust "+
				" where a.progress = '0' and a.flag_hapus = '-' and a.jenis = '"+this.eJenis.getText()+"' and a.kode_lokasi= '"+this.app._lokasi+"' "+
				"  ");		
	   if (rs instanceof portalui_arrayMap){
			this.sg1.clear();
			var row;			
			for (var i in rs.objList){
				rs.get(i).set("flag",rs.get(i).get("flag").toUpperCase());				
			}			
			this.sg1.setData(rs);						
			this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
			var val = new portalui_arrayMap();
				val.set(1, "TRUE");
				val.set(2, "FALSE");	
			this.sg1.columns.get(0).setPicklist(val);
	   }else alert(rs);
	}
	if (sender == this.bJurnal){
		try{
			this.createJurnal();
			if (this.dtJurnal != undefined){								
				this.jurnal.setData(this.dtJurnal);
				this.jurnal.showModal();
			}
		}catch(e){
			alert(e);
		}
	}	
};
window.app_saku_ar_transaksi_fKB.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};
window.app_saku_ar_transaksi_fKB.prototype.createJurnal = function()
{
	try{
		var dtJurnal = new portalui_arrayMap();	
		var nemu, kdAkun, kdPP, kdDrk,row;
//----------------------------------- buffer spro;
		var tmp = this.dbLib.loadQuery("select kode_spro, nama, modul, flag, value1, value2 from spro where kode_lokasi = '"+this.app._lokasi+"' ");
		var dataSPRO = new Array();
		tmp = tmp.split("\r\n");
		var line;
		for (var i in tmp){
			line = tmp[i].split(";");
			if (i > 0) {			
				dataSPRO[line[0]] = line;
			}
		}		
//----------------------------------- buffering Akun	
		var row, ix, dtJrnl = -1,bufferAkun= new Array(), tmp = this.dbLib.loadQuery("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ");		
		tmp = tmp.split("\r\n");
		for (var i in tmp){	
			row = tmp[i].split(";");
			if (i > 0)
				bufferAkun[row[0]] = row[1];
		}		
//----------------------------------- end buffering Akun			
		kdDrk = '-';
	    var total = 0;		
		var dtJrnl = 0;
//----------------------------------- jurnal Piutang IM-- dibyrmhs_m harus ditambah akun im biar dinamis		
		for (var i = 0;i < this.sg1.getRowCount();i++){			
			if (this.sg1.cells(0,i).toUpperCase() == "TRUE")
			{
				total += nilaiToFloat(this.sg1.cells(4,i));
				line = this.sg1.data.get(i);
				kdAkun = this.sg1.cells(9,i);//akun IM
				kdPP = this.app._kodePP;
				
				nemu = false;
				ix = 0;			
				for (var j in dtJurnal.objList){		
				  if (kdAkun == dtJurnal.get(j).get("kode_akun") && kdPP == dtJurnal.get(j).get("kode_pp") && kdDrk == dtJurnal.get(j).get("kode_drk")){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("nama",bufferAkun[kdAkun]);
					row.set("dc","C");
					row.set("keterangan",this.eKeterangan.getText());
					row.set("nilai",parseFloat(parseNilai(this.sg1.cells(4,i))));
					row.set("kode_pp",kdPP);
					row.set("kode_drk",kdDrk);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(parseNilai(this.sg1.cells(4,i))));				
				}
			}	
		}
		this.eTotal.setText(floatToNilai(parseFloat(total)));		
		if (total > 0){			
//-------------------  jurnal kas		
			kdAkun = this.eAkun.getText();			
			row = new portalui_arrayMap();
			row.set("kode_akun",kdAkun);
			row.set("nama",bufferAkun[kdAkun]);
			row.set("dc","D");
			row.set("keterangan",this.eKeterangan.getText());
			row.set("nilai",parseNilai(this.eTotal.getText()));
			row.set("kode_pp",kdPP);
			row.set("kode_drk",kdDrk);
			dtJurnal.set(0,row);
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",80);
			desc1.set("nama",200);
			desc1.set("dc",50);
			desc1.set("keterangan",250);
			desc1.set("nilai",100);
			desc1.set("kode_pp",80);
			desc1.set("kode_drk",80);
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("nama","S");
			desc2.set("dc","S");
			desc2.set("keterangan","S");
			desc2.set("nilai","N");
			desc2.set("kode_pp","S");
			desc2.set("kode_drk","S");	
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
			this.dtJurnal = dtJurnal;
		}		
	}catch(e){
		alert(e);
	}
};
window.app_saku_ar_transaksi_fKB.prototype.sgChange = function(sender, col, row)
{
	if (col == 0){
		this.createJurnal();
	}
};