/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fKBMhs = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fKBMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fKBMhs";
		this.maximize();
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setoran Kas Bank Piutang : Input", 0);
		
		try
		{
			uses("portalui_saiCBBL;portalui_checkBox;portalui_radioButton;portalui_saiGrid;portalui_sgNavigator;portalui_datePicker");
			this.eJenis = new portalui_saiCB(this,{bound:[20,10,200,20], caption:"Jenis", items:["KM","BM","TT"]});									
			this.e0 = new portalui_saiLabelEdit(this,{bound:[20,11, 200, 20], caption:"No BuktiKas", });
			this.bGenerate = new portalui_button(this,{bound:[230, 11,200,20], caption:"Generate", icon:"url(icon/"+system.getThemes()+"/process.png", click:[this,"doGenerate"]});			
			this.l1 = new portalui_label(this,{bound:[20,12,100,20], caption:"Tanggal", underline:true});
			this.dpTgl = new portalui_datePicker(this,{bound:[120,12,100,18], select:[this, "doSelectDate"]});
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20, 13, 150, 20], caption:"Periode", text:this.app._periode, readOnly:true});						
			this.eKeterangan = new portalui_saiLabelEdit(this,{bound:[20,14, 400, 20], caption:"Keterangan"});
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,135,200,20], caption:"Akun Kasbank", btnClick:[this, "FindBtnClick"]});
			this.cbLoad = new portalui_checkBox(this,{bound:[530,135,200,20],caption:"Default Akun",selected:true});						
			this.bLoad = new portalui_button(this,{bound:[660,135,80,20], caption:"Load Data", icon:"url(icon/"+system.getThemes()+"/process.png)", click:[this, "doGenerate"]});						
			this.bSelect = new portalui_button(this,{bound:[750,135,80,20], caption:"Pilih Semua", icon:"url(icon/"+system.getThemes()+"/process.png)", click:[this, "doGenerate"]});						
			this.bJurnal = new portalui_button(this,{bound:[840, 135, 80,20], caption:"Lihat Jurnal", icon:"url(icon/"+system.getThemes()+"/process.png)", click:[this, "doGenerate"]});			
						
			this.sg1 = new portalui_saiGrid(this,{bound:[20,160,900,300],colCount:11,
				colTitle:['FLAG','No Pembayaran','Tanggal','Keterangan','Nilai','Discount','Periode','No Invoice','NPM','Jurusan','Modul'],
				colWidth:[[7,6,5,4,3,2,1],[100,250,80,80,250,100,110]], buttonStyle:[[0],[bsAuto]], colReadOnly:[true,[1,2,3,4,5,6,7,8,9,10],[]],
				colFormat:[[4,5],[cfNilai, cfNilai]]});
			var val = new portalui_arrayMap();
			    val.set(1, "TRUE");
				val.set(2, "FALSE");	
			this.sg1.columns.get(0).setPicklist(val);			
						
			this.sgn = new portalui_sgNavigator(this,{bound:[20,460,900,25], grid:this.sg1, buttonStyle:3});			
			this.sgn.onPager.set(this, "doSelectedPage");						
			
			this.eTotal = new portalui_saiLabelEdit(this.sgn);
			this.eTotal.setTop(1);
			this.eTotal.setLeft(670);
			this.eTotal.setWidth(200);			
			this.eTotal.setAlignment(alRight);
			this.eTotal.setTipeText(ttNilai);
			this.eTotal.setCaption("Total");
			this.eTotal.setReadOnly(true);
			this.rearrangeChild(10,23);							
			this.setTabChildIndex();
			
			this.p1 = new portalui_panel(this,{bound:[620,10,300,100],caption:"Cari Data KTS"});
			this.field = new portalui_saiLabelEdit(this.p1,{bound:[10,25,250,20],caption:"Cari", tag:9});
			this.rb1 = new portalui_radioButton(this.p1,{bound:[10,50,80,20],caption:"NPM",selected:true});
			this.rb2 = new portalui_radioButton(this.p1,{bound:[100,50,80,20],caption:"Invoice"});
			this.rb3 = new portalui_radioButton(this.p1,{bound:[190,50,80,20],caption:"Pembayaran"});
			this.bCari = new portalui_button(this.p1,{bound:[20,75, 80, 20],caption:"Cari", click:[this,"doClick"]});
			
			setTipeButton(tbSimpan);
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.dtJurnal = undefined;
			uses("app_saku_fJurnalViewer");			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			//this.jurnal.sg.setColTitle(new Array("Kode Akun","Nama","DC","Keterangan","Nilai","Kode PP","Kode DRK"));			
			
			this.sg1.onChange.set(this,"sgChange");
			this.sg1.clear(1);
			this.dpTgl.setDateString(new Date().getDateStr());
			this.eJenis.onChange.set(this,"doEditChange");
			this.cbLoad.onChange.set(this,"doEditChange");			
			this.rowPerPage = 100;
		}catch(e)
		{
			systemAPI.alert("[app_saku_piutang_transaksi_fKBMhs]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fKBMhs.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fKBMhs.prototype.mainButtonClick = function(sender)
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
window.app_saku_piutang_transaksi_fKBMhs.prototype.doModalResult = function(event, modalResult)
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
					this.createJurnal();
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
window.app_saku_piutang_transaksi_fKBMhs.prototype.insertData = function(sql)
{	
	var line;	
	var script1 = "insert into arkb_m(no_buktikas, tanggal, keterangan, akun_kasbank, nilai_kasbank, periode, ref1, ref2, modul, jenis, flag_hapus, ref3, kode_lokasi,posted, nik_user) values";
	
	var script3 = "insert into arkb_d(no_buktikas, no_urut, no_bukti, nilai, progress, kode_lokasi) values ";
	var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) ";
	script1 += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eAkun.getText()+"', "+
			"'"+parseNilai(this.eTotal.getText())+"','"+this.ePeriode.getText()+"','-','-','ARMHS','"+this.eJenis.getText()+"','0','-','"+this.app._lokasi+"','F','"+this.app._userLog+"')";
	var inv = new Array();	
	if (this.app._dbEng == "mysqlt"){
		var appInv = 0, line;
		for (var i in this.sg1.data.rs.rows){			
			line = this.sg1.data.rs.rows[i];
			if (line.flag.toUpperCase() == "TRUE"){
				if (appInv > 0) {script3 += ",";}
				appInv++;
				script3 += "('"+this.e0.getText()+"','"+appInv+"','"+line.no_bukti+"','"+parseFloat(line.nilai)+"','0','"+this.app._lokasi+"')";
				inv.push("'"+line.no_bukti+"'");
				
			}
		}
		//jurnal diambil dari armhs_j_byr
		/*var urut=0;
		for (var i in this.dtJurnal.objList){
			line = this.dtJurnal.get(i);						
			if (line.get("dc") =="D"){
				urut++;
				if (i >0) {scriptJurnal += ",";}
				scriptJurnal+="('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getDateString()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_AM','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}
		for (var i in this.dtJurnal.objList){
			line = this.dtJurnal.get(i);						
			if (line.get("dc") =="C"){				
				urut++;
				scriptJurnal+=" ,('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getDateString()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_AM','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}
		*/		
		if (inv.length > 0){
			sql.add(script1);
			var script2 = "update arbyrmhs_m set progress = '1' where kode_lokasi = '"+this.app._lokasi+"' ";	
			sql.add(script2 + " and no_bukti in ("+inv+")");		
			scriptJurnal += "select '"+this.e0.getText()+"',no_dokumen, no_urut, tanggal, case when kode_akun = 'AKUNIM' then '"+this.eAkun.getText()+"' else kode_akun end, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j_byr where  no_bukti in ("+inv+")";
			sql.add(scriptJurnal);
			sql.add(script3);		
		}		
	}					
	if (inv.length > 0){
		this.dbLib.execArraySQL(sql);	
	}else{
		systemAPI.alert("Tidak ada invoice yang dipilih. Data tidak bisa disimpan.");
	}
};
window.app_saku_piutang_transaksi_fKBMhs.prototype.FindBtnClick = function(sender, event)
{
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
};
window.app_saku_piutang_transaksi_fKBMhs.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_piutang_transaksi_fKBMhs.prototype.doGenerate = function(sender)
{
	try{
		if(sender == this.bGenerate)
			this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "arkb_m", "no_buktikas", this.eJenis.getText()+this.ePeriode.getText().substr(2),"00000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
		if (sender == this.bLoad){
			var isnull = this.app._dbEng == "mysqlt" ? "ifnull" : "isnull";
			var rs = this.dbLib.getDataProvider("select 'FALSE' as flag, a.no_bukti, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan, a.nilai, a.disc, a.periode, a.ref2 as no_invoice, a.ref1 as npm, b.kode_jur,'MHS' as modul "+
					"from arbyrmhs_m a "+
					" inner join mhs b on b.kode_lokasi = a.kode_lokasi and b.npm = a.ref1 "+
					" where a.progress = '0' and a.jenis = '"+this.eJenis.getText()+"' and a.akun_kb like '"+this.eAkun.getText()+"%' and a.kode_lokasi= '"+this.app._lokasi+"' and a.nilai <> 0 and a.tanggal <= '"+this.dpTgl.getDateString()+"' ",true);		
		   if (typeof rs != "string"){
				this.sg1.clear();
				var row;									
				this.sg1.data = rs;
				this.loadData(1, this.rowPerPage);
				this.sgn.setTotalPage(Math.ceil(rs.rs.rows.length / this.rowPerPage) );
				this.sgn.rearrange();
		   }else alert(rs);
		}
		if (sender == this.bSelect && this.sg1.data){
			var line;
			var start = ( this.page - 1)* this.rowPerPage;
			var finish = ( this.sg1.data.rs.rows.length < start + this.rowPerPage ? this.sg1.data.rs.rows.length : start + this.rowPerPage);			
			var line, data = this.sg1.data, line,dataToAppend, first = true, tableColumn = [];		
			this.sg1.startNo = start;
			for (var i=start;i < finish;i++){
				line = data.rs.rows[i];
				line.flag = "TRUE";
				this.sg1.data.rs.rows[i] = line;
			}
			this.sgChange(this.sg1, 0, 0);
			this.loadData(this.page, this.rowPerPage);
		}
		if (sender == this.bJurnal){
			try{			
				var inv = [];
				for (var i = 0;i < this.sg1.getRowCount();i++){			
					if (this.sg1.cells(0,i).toUpperCase() == "TRUE"){			
						line = this.sg1.data.rs.rows[i];
						inv.push("'"+line.no_bukti+"'");
					}
				}
				if (inv.length != 0){
					this.dtJurnal = this.dbLib.getDataProvider("select '"+this.e0.getText()+"',no_dokumen, no_urut, date_format(tanggal,'%d/%m/%Y') as tanggal, case when kode_akun = 'AKUNIM' then '"+this.eAkun.getText()+"' else kode_akun end as kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j_byr where  no_bukti in ("+inv+")",true);
					//this.createJurnal();
					if (this.dtJurnal != undefined){								
						this.jurnal.setData(this.dtJurnal);
						this.jurnal.showModal();
					}
				}
			}catch(e){
				alert(e);
			}
		}	
	}catch(e){
		alert(e);
	}
};
window.app_saku_piutang_transaksi_fKBMhs.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};
window.app_saku_piutang_transaksi_fKBMhs.prototype.createJurnal = function()
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
//------------------------------------ data Jurusan
		var tmp = this.dbLib.loadQuery("select kode_jur, kode_proyek from jurusan where kode_lokasi = '"+this.app._lokasi+"' ");
		var dataJur = new Array();
		tmp = tmp.split("\r\n");
		var line;
		for (var i in tmp){
			line = tmp[i].split(";");
			if (i > 0) {			
				dataJur[line[0]] = line;
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
				kdAkun = dataSPRO["ARIM"][4];			
				kdPP = dataJur[line.get("kode_jur")][1];								
				
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
window.app_saku_piutang_transaksi_fKBMhs.prototype.sgChange = function(sender, col, row){
	try{	
		if (col == 0){
			this.sg1.data.rs.rows[this.sg1.startNo + row].flag = sender.cells(0,row);
			var line, total = 0;
			for (var i in this.sg1.data.rs.rows){		
				line = this.sg1.data.rs.rows[i];
				if (line.flag == "TRUE") total += parseFloat(line.nilai);
			}
			this.eTotal.setText(floatToNilai(parseFloat(total)));		
		}	
	}catch(e){
		alert(e);
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
window.app_saku_piutang_transaksi_fKBMhs.prototype.doSelectedPage = function(sender, page){
	this.loadData(page, this.rowPerPage);
};
window.app_saku_piutang_transaksi_fKBMhs.prototype.loadData = function(page, rowPerPage){
	try{
		this.sg1.showLoading();
		this.page = page;
		var start = ( page - 1)* rowPerPage;
		var finish = ( this.sg1.data.rs.rows.length < start + rowPerPage ? this.sg1.data.rs.rows.length : start + rowPerPage);
		this.sg1.clear();
		var line, data = this.sg1.data, line,dataToAppend, first = true, tableColumn = [];		
		this.sg1.startNo = start;
		for (var i=start;i < finish;i++){
			line = data.rs.rows[i];
			dataToAppend = [];			
			for (var c in line) {
				if (c == "flag" || c == "modul") 
					dataToAppend.push(line[c].toUpperCase());
				else if (c == "nilai" || c == "disc")
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
		systemAPI.alert(e);
	}	
};
window.app_saku_piutang_transaksi_fKBMhs.prototype.doClick= function(sender){
		var filter = "";
		if (this.rb1.isSelected()) filter = "and a.ref1 = '"+this.field.getText()+"' ";
		else if (this.rb2.isSelected()) filter = "and a.ref2 = '"+this.field.getText()+"' ";
		else if (this.rb3.isSelected()) filter = "and a.no_bukti = '"+this.field.getText()+"' ";
		var isnull = this.app._dbEng == "mysqlt" ? "ifnull" : "isnull";
		var rs = this.dbLib.getDataProvider("select 'FALSE' as flag, a.no_bukti, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan, a.nilai, a.disc, a.periode, a.ref2 as no_invoice, a.ref1 as npm, b.kode_jur,'MHS' as modul "+
				"from arbyrmhs_m a "+
				" inner join mhs b on b.kode_lokasi = a.kode_lokasi and b.npm = a.ref1 "+
				" where a.progress = '0' and a.jenis = '"+this.eJenis.getText()+"' and a.akun_kb like '"+this.eAkun.getText()+"%' and a.kode_lokasi= '"+this.app._lokasi+"' and a.nilai <> 0 and a.tanggal <= '"+this.dpTgl.getDateString()+"' "+filter,true);				
		
		if (typeof rs != "string"){
			this.sg1.clear();
			var row;									
			this.sg1.data = rs;
			this.loadData(1, this.rowPerPage);
			this.sgn.setTotalPage(Math.ceil(rs.rs.rows.length / this.rowPerPage) );
			this.sgn.rearrange();
		}else alert(rs);	   	 
};
