/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fLoadBayar2 = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_transaksi_fLoadBayar2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fLoadBayar2";
		this.setTop(60);
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Pembayaran KTS Mahasiswa : Input", 0);
		
		try
		{
			uses("portalui_saiCBBL;portalui_checkBox;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
			this.eJenis = new portalui_saiCB(this,{bound:[20,10,200,20],caption:"Jenis",items:["KM","BM","TT"]});			
			this.e0 = new portalui_saiLabelEdit(this,{bound:[20, 11, 200, 20], caption:"No Bukti"});
			this.bGenerate = new portalui_button(this,{bound:[230, 11, 80, 20], caption:"Generate", icon:"url(icon/"+system.getThemes()+"/proses.png", click:[this, "doGenerate"]});
			this.l1 = new portalui_label(this,{bound:[20,12, 100, 20], caption:"Tanggal", underline:true});			
			this.dpTgl = new portalui_datePicker(this,{bound:[120, 12, 100, 18], selectDate:[this, "doSelectDate"]});
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20, 13, 150, 20], caption:"Periode", text:this.app._periode, readOnly:true});			
			this.eKeterangan = new portalui_saiLabelEdit(this,{bound:[20, 14, 400, 20], caption:"Keterangan"});			
			this.eJurusan = new portalui_saiCBBL(this,{bound:[20,15,150,20],caption:"Jurusan"});						
			this.eAngkatan = new portalui_saiCBBL(this,{bound:[20,16,150,20],caption:"Angkatan"});			
			this.cbLoad = new portalui_checkBox(this,{bound:[630,16,200,20],caption:"Default Akun",selected:true});				
			this.eAkun = new portalui_saiCBBL(this,{bound:[20, 15, 200, 20], caption:"Akun Kas Bank", btnClick:[this, "FindBtnClick"]});
			this.bDownload = new portalui_button(this,{bound:[500,15, 130,20],caption:"Download Format",click:"doClickDownload"});
			this.uploader = new portalui_uploader(this,{bound:[650, 15, 80, 20], param4:"gridUpload", param3:"object", autoSubmit:true, afterUpload:[this, "doAfterLoad"]});
			this.bValidasi = new portalui_button(this,{bound:[740, 15, 80, 20], caption:"Load Invoice", icon:"url(icon/"+system.getThemes()+"bCopy.png)", click:[this, "doClick"]});
			this.bMatch = new portalui_button(this,{bound:[840, 15, 80, 20], caption:"Matching", icon:"url(icon/"+system.getThemes()+"bCopy.png)", click:[this, "doClick"]});			
			
			this.sg2 = new portalui_saiGrid(this,{bound:[20,280,900,200],colCount:4,colTitle:["NPM","Nama","Nilai Bayar","Nilai Pakai"],
				colWidth:[[2,1,0],[100,350,100]],colFormat:[[2,3],[cfNilai, cfNilai]],rowCount:1,
				readOnly:true});									
			this.sgn2 = new portalui_sgNavigator(this,{bound:[20, 40, 900, 25], grid:this.sg2, buttonStyle:bsView, pager:[this, "doSelectedPage"]});														
			this.sg1 = new portalui_saiGrid(this,{bound:[20,280,900,200],colCount:11,colTitle:["NPM","Nama","No Invoice","Kode Produk","Nama Produk","Nilai Tagihan","Nilai Bayar","Jenis","Akun Lawan","Kode DRK","Akun Deprs","No Bayar"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100]],colFormat:[[5,6],[cfNilai, cfNilai]],rowCount:1,
				readOnly:true});									
			this.sgn = new portalui_sgNavigator(this,{bound:[20, 40, 900, 25], grid:this.sg1, buttonStyle:bsView, pager:[this, "doSelectedPage"]});								
			this.eTotal = new portalui_saiLabelEdit(this.sgn,{bound:[670, 1, 200, 20], caption:"Total", tipeText:ttNilai, readOnly:true});					
			this.eTotal2 = new portalui_saiLabelEdit(this.sgn2,{bound:[670, 1, 200, 20], caption:"Total", tipeText:ttNilai, readOnly:true});
			this.l2 = new portalui_label(this,{bound:[20,12, 100, 20], caption:" ", underline:true});			
			this.setTabChildIndex();
			this.rearrangeChild(10,23);
			this.rowPerPage = 50;
			setTipeButton(tbSimpan);				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib();			
			this.standarLib = new util_standar();
			this.eJurusan.onChange.set(this,"doEditChange");
			this.eAngkatan.onChange.set(this,"doEditChange");			
			this.eJurusan.setSQL("select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ", new Array("kode_jur","nama_jur"), this.dbLib2);			
			this.dpTgl.setDateString((new Date()).getDateStr());			
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fLoadBayar2]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fLoadBayar2.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fLoadBayar2.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
		{
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		}
		if (sender == this.app._mainForm.bSimpan)
		{
			try{
				if (this.ePeriode.getText() < this.app._periode)
					throw("Periode input tidak boleh kurang dari periode berjalan("+this.app._periode+")");
				system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");		
			}catch(e){
				
				this.getApplication().alert(this,e,"");
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
	},
	doModalResult: function(event, modalResult){
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this,["0"],this.e0);				
					this.sg1.clear(1);
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
						sql.add("delete from load_mhs where kode_jur='"+this.e0.getText()+"' and kode_ang='"+this.e1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);					
			   }
			break;
		}
		this.e0.setFocus();
	},
	insertData: function(sql){	
		var angk = this.eAngkatan.rightLabelCaption.split("/");		
		sql.add(" insert into loadkts (noktsload,periode,semester,kode_jur,kode_ang,thn_ajar1,thn_ajar2,jenis_sem,tanggal,keterangan,namafile,nilaiload, kode_lokasi,posted) values "+
				  "('"+this.e0.getText()+"', '"+this.ePeriode.getText()+"', '1', '"+this.eJurusan.getText()+"', '"+this.eAngkatan.getText()+"',"+
				  "	'"+angk[0]+"', '"+angk[1]+"','1', "+
				  " '"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eFile.getText()+"',"+parseNilai(this.eTotal.getText())+", '"+this.app._lokasi+"','F') ");
											
		var line;
		var script ="insert into loadkts_d (noktsload,kode_produk, periode_awal, npm, no_kts) values ";	          				  	
		var scriptARM = "insert into arbyrmhs_m(no_bukti, tanggal,keterangan,nilai,periode,jenis,user_id,kode_lokasi,ref1,ref2,progress,flag_hapus, disc,posted, cd_ambil, nilai_bd,akun_kb) values";
		var scriptARD = "insert into arbyrmhs_d(no_bukti,kode_produk,akun_piutang,akun_lawan,nilai,disc,kode_lokasi) values";
		var scriptKBM = "insert into arkb_m(no_buktikas, tanggal, keterangan, akun_kasbank, nilai_kasbank, periode, ref1, ref2, modul, jenis, flag_hapus, ref3, kode_lokasi,posted, nik_user) values";	
		var scriptKBD = "insert into arkb_d(no_buktikas, no_urut, no_bukti, nilai, progress, kode_lokasi) values ";		
		var akunAR, akunPdd, kodePP, kodeDRK, scriptJurnal1 = [], scriptJurnal2 = [];
		scriptKBM += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eAkun.getText()+"', "+
			"'"+parseNilai(this.eTotal.getText())+"','"+this.ePeriode.getText()+"','-','-','ARMHS','"+this.eJenis.getText()+"','0','-','"+this.app._lokasi+"','F','"+this.app._userLog+"')";
		if (this.app._dbEng == "mysqlt"){
			var nu = 1;	
			for (var i in this.sg1.data.rs.row){
				line = this.sg1.data.rs.row[i];										
				if (i !=0) {script += ",";scriptARM += "," ;scriptARD +=",";scriptKBD+=",";}
				script += "('"+this.e0.getText()+"','"+line.kode_produk+"','"+this.ePeriode.getText()+"','"+line.npm+"','"+line.no_bukti+"' )";			
				scriptARM += "('"+line.no_bukti+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',"+parseFloat(line.nilai_bayar)+", "+
					" '"+this.ePeriode.getText()+"','"+this.eJenis.getText()+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+line.npm+"','"+line.no_invoice+"',1,'0',0,'T',0,0,'"+this.eAkun.getText()+"')";
				scriptARD += "('"+line.no_bukti+"','"+line.kode_produk+"','"+line.akun_piutang+"','"+line.akun_piutang+"','"+parseFloat(line.nilai_bayar)+"',0,'"+this.app._lokasi+"')";
				scriptKBD += "('"+this.e0.getText()+"','"+i+"','"+line.no_bukti+"','"+parseFloat(line.nilai_bayar)+"','"+this.app._lokasi+"')";
				scriptJurnal1.push("('"+this.e0.getText()+"','"+line.no_bukti+"',"+nu+",'"+this.dpTgl.getDateString()+"','"+this.eAkun.getText()+"','D','upload bayar "+line.no_invoice+"','"+parseFloat(line.nilai_bayar)+"','ARIM','ARKB','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+line.no_invoice+"','IDR',1,'"+line.kode_pp+"','"+line.kode_drk+"')");
				nu++;
				scriptJurnal1.push("('"+this.e0.getText()+"','"+line.no_bukti+"',"+nu+",'"+this.dpTgl.getDateString()+"','"+line.akun_lawan+"','C','upload bayar "+line.no_invoice+"','"+parseFloat(line.nilai_bayar)+"','AR','ARKB','"+this.ePeriode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+line.no_invoice+"','IDR',1,'"+line.kode_pp+"','"+line.kode_drk+"')");
				nu++;
			}
			sql.add(script);
			sql.add(scriptARM);
			sql.add(scriptARD);		
			sql.add(scriptKBD);
		}		
		sql.add("insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values "+scriptJurnal1);
		sql.add("insert into armhs_j_byr(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) "+
			"	select no_bukti,no_dokumen, no_urut, tanggal, case when dc='D' then 'AKUNIM' else kode_akun end, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk from armhs_j where no_bukti = '"+this.e0.getText()+"' ");				
		this.dbLib.execArraySQL(sql);
	},
	doClick: function(sender){
		try{
			if (sender == this.bValidasi){
				var line, rs, total = 0;				
				rs = this.dbLib.getDataProvider("select e.npm, e.nama, a.no_invoice, a.kode_produk, b.nama_produk, a.jumlah, a.nilai, a.jumlah * a.nilai - ifnull(c.nilai,0) as tagihan "+
						", b.jenis, (case when ((a.akun_piutang <> '-') and (a.akun_piutang <> '') and (not a.akun_piutang is null )) then a.akun_piutang else a.akun_pdpt end) as akun_piutang, b.kode_pp, case b.kode_akun when '' then b.kode_drk_beban else b.kode_drk_pdpt end as kode_drk, case when b.akun_deprs = '' then '-' else b.akun_deprs end akun_deprs, d.disc, d.tanggal, d.nilai_bd from armhs_d a "+
						" inner join produk b on b.kode_produk = a.kode_produk and a.kode_lokasi = b.kode_lokasi "+
						" inner join armhs_m  d on d.no_invoice = a.no_Invoice and a.kode_lokasi = d.kode_lokasi "+
						" inner join mhs e on e.npm = d.ref1 and e.kode_lokasi = a.kode_lokasi "+
						" left outer join (select ref2, kode_produk, sum(case when substring(akun_piutang,1,1) = '1' or akun_piutang = '-'  then x.nilai + x.disc else -x.nilai + x.disc end) as nilai from arbyrmhs_d x inner join arbyrmhs_m z on z.no_bukti = x.no_bukti and z.kode_lokasi = x.kode_lokasi and z.kode_lokasi = '"+this.app._lokasi+"' group by ref2, kode_produk) c on c.ref2 = a.no_invoice and c.kode_produk = b.kode_produk "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and (a.jumlah * a.nilai - ifnull(c.nilai,0) > 0) and e.kode_jur = '"+this.eJurusan.getText()+"' and e.kode_ang  = '"+this.eAngkatan.getText()+"'",true);								
				for (var i in rs.rs.rows){
					line = rs.rs.rows[i];					
					total += parseFloat(line.nilai_tagihan);
					line.no_bukti = '-';
					line.nilai_bayar = 0;
					rs.rs.rows[i] = line;
				}
				this.sg1.data = rs;
				this.eTotal.setText(floatToNilai(total));
				this.loadData(1, this.rowPerPage, this.sgn);
			}else if (sender == this.bMatch){
				var rs, arr;		
				this.sg1.clear();
				if (typeof data !== "string") {											
					var nobukti = this.standarLib.noBuktiOtomatis(this.dbLib, "arbyrmhs_m", "no_bukti", "BYR"+this.ePeriode.getText().substr(2),"00000"," and kode_lokasi = '"+this.app._lokasi+"' ");
					var lastId = parseInt(nobukti.substr(7),10);			
					var upload;
					for (var i in this.sg1.data.rs.rows){
						line = this.sg1.data.rs.rows[i];
						upload = this.dataUpload.get(line.npm);
						if (upload != undefined){
							if (parseFloat(line.tagihan) > parseFloat(upload.nilai_bayar) - parseFloat(upload.nilai_pakai)) line.nilai_bayar = parseFloat(upload.nilai_bayar) - parseFloat(upload.nilai_pakai);
							else line.nilai_bayar = parseFloat(line.tagihan);
							upload.nilai_pakai += line.nilai_bayar;
							nobukti = "BYR"+this.ePeriode.getText().substr(2) + this.formatNumeric("00000",lastId.toString());						
							line.no_bayar = nobukti;
							lastId++;			
							this.sg1.data.rs.rows[i] = line;
							this.dataUpload.set(line.npm, upload);
						}
					}								
					result.setTag1(rowCount);
					result.setTag2(fieldDesc);								
					this.sgn.setTotalPage(result.getTotalPage(this.rowPerPage));			
					this.sgn.rearrange();
					this.sgn.setButtonStyle(3);
					this.sgn.activePage = 0;	
					this.loadData(1,this.rowPerPage, this.sgn);
				}else 
					if (data.search("\r\n") == -1) throw(data);
			}
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doEditExit: function(sender){
		sender.checkItem();	
	},
	doEditChange: function(sender){	
		if (sender == this.eJurusan){
			this.eAngkatan.setSQL("select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+sender.getText()+"' ", new Array("kode_ang","nama_ang"), this.dbLib2);				
			this.eAngkatan.setText("");		
		}
	},
	FindBtnClick: function(sender, event){
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
			case this.eAkun:
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
	},
	doAfterLoad: function(sender, result,data, filename){
		try{	
			if (result){		
				this.eFile = filename;
				this.sg1.clear();
				if (typeof data !== "string") {						
					var line;
					this.sg2.clear();					
					this.dataUpload = new portalui_arrayMap();
					for (var i in data.rows){
						line = data.rows[i];
						line.nilai_pakai = 0;
						this.dataUpload.set(line.npm, line);
					}
					this.sg2.data = data;
					this.loadData(1, this.rowPerPage, this.sgn2);
				}
			}
		}catch(e){
			alert(e);
		}
	},
	loadData: function(page, rowPerPage, sender){
		if (sender == this.sgn){
			var start = ( page - 1)* rowPerPage;
			var finish = ( this.sg1.data.getLength() < start + rowPerPage ? this.sg1.data.getLength() : start + rowPerPage);
			this.sg1.clear();
			var data = this.sg1.data, line,dataToAppend;		
			for (var i=start;i < finish;i++){
				line = data.rs.rows[i];			
				this.sg1.appendData([line.npm, line.nama, line.no_invoice, line.kode_produk, line.nama_produk, floatToNilai(line.tagihan), floatToNilai(line.nilai_bayar), line.jenis, line.akun_piutang, line.kode_drk, line.deprs,line.no_bukti]);
			}
			this.sg1.setNoUrut(start);
		}
		if  (sender == this.sgn2){
			var start = ( page - 1)* rowPerPage;
			var finish = ( this.sg2.data.getLength() < start + rowPerPage ? this.sg2.data.getLength() : start + rowPerPage);
			this.sg2.clear();
			var data = this.sg2.data, line,dataToAppend;		
			for (var i=start;i < finish;i++){
				line = data.rows[i];
				dataToAppend = [];
				for (var c in line) dataToAppend.push(line[c]);
				this.sg2.appendData(dataToAppend);
			}
			this.sg2.setNoUrut(start);
		}
	},
	doFileChange: function(sender, filename, allow){		
		this.eFile = filename;
	},
	doSelectedPage: function(sender, page){	
		this.loadData(page,this.rowPerPage, sender);
	},
	doGenerate: function(sender){
		this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "loadkts", "noktsload", "LB"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
	},
	formatNumeric: function(format, idx){
		result = idx;
		for (var i =0;i < format.length;i++)
		{
			if (result.length < format.length)
				result = "0" + result;      
		}
		return result;
	},
	doSelectDate: function(sender, y,m,d){
		this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	},
	doClickDownload: function(sender){
		window.open("server/media/formatUploadBayar2.xls");
	}
});
