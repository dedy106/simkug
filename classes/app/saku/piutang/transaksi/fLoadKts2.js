/**
 * @author dweexfuad
 */
/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fLoadKts2 = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_transaksi_fLoadKts2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fLoadKts2";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load KTS Mahasiswa : Input", 0);
		
		try
		{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_saiCB;portalui_uploader");
			this.e0 = new portalui_saiLabelEdit(this);
			this.e0.setLeft(20);
			this.e0.setTop(30);
			this.e0.setWidth(200);
			this.e0.setCaption("No Load");
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
			this.l1.setHeight(18);
			this.l1.setWidth(100);
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
			
			/*this.eJurusan = new portalui_saiCBBL(this);
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
			this.eAngkatan.onBtnClick.set(this,"FindBtnClick");*/
			
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
			
			this.eFile = new portalui_saiLabelEdit(this);
			this.eFile.setLeft(20);
			this.eFile.setTop(255);
			this.eFile.setWidth(400);
			this.eFile.setCaption("File");
			this.eFile.setText("");		
			
			this.bDownload = new portalui_button(this,{bound:[600,255, 130,20],caption:"Download Format",click:"doClickDownload"});
			this.uploader = new portalui_uploader(this);
			this.uploader.setLeft(750);
			this.uploader.setTop(255);
			this.uploader.setWidth(80);
			this.uploader.setHeight(20);		
			this.uploader.onAfterUpload.set(this,"doAfterLoad");
			this.uploader.onChange.set(this,"doFileChange");
			this.uploader.setParam4("gridupload");
			this.uploader.setParam3("object");
			this.uploader.setAutoSubmit(true);
			
			this.bValidasi = new portalui_button(this);
			this.bValidasi.setTop(255);
			this.bValidasi.setLeft(840);
			this.bValidasi.setCaption("Validasi");
			this.bValidasi.setIcon("url(icon/"+system.getThemes()+"/bCopy.png)");
			this.bValidasi.onClick.set(this,"doClick");		
			
			uses("portalui_saiTable;portalui_sgNavigator");
			this.sg1 = new portalui_saiGrid(this,{bound:[20,280,900,200],colCount:15,colTitle:["Kode Produk","Jenis Biaya","Jumlah","Nilai Satuan","Sub Total","Periode Awal","Jenis","Akun Lawan","Akun AR","Akun Pdd","Kode PP","Kode DRK","NPM","No KTS","Angkatan"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,100,100,100,100,100,100,100,100,100,100,100,100,100,100]],colFormat:[[2,3,4],[cfNilai, cfNilai, cfNilai]],
				readOnly:true});						
			
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(481);
			this.sgn.setLeft(20);
			this.sgn.setWidth(900);
			this.sgn.setButtonStyle(3);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");
			this.rowPerPage = 50;
			
			this.eTotal = new portalui_saiLabelEdit(this.sgn);
			this.eTotal.setTop(1);
			this.eTotal.setLeft(670);
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
			//this.eJurusan.onChange.set(this,"doEditChange");
			//this.eAngkatan.onChange.set(this,"doEditChange");
			//this.eJurusan.onExit.set(this,"doEditExit");
			//this.eAngkatan.onExit.set(this,"doEditExit");			
			this.eSemester.onExit.set(this,"doCBexit");			
			//this.eJurusan.setSQL("select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ", new Array("kode_jur","nama_jur"), this.dbLib2);			
			this.dpTgl.setDateString((new Date()).getDateStr());
			this.rearrangeChild(10,23);
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fLoadKts2]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fLoadKts2.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fLoadKts2.implement({
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
		sql.add(" insert into loadkts (noktsload,periode,semester,kode_jur,kode_ang,thn_ajar1,thn_ajar2,jenis_sem,tanggal,keterangan,namafile,nilaiload, kode_lokasi,posted) values "+
				  "('"+this.e0.getText()+"', '"+this.ePeriode.getText()+"', '"+this.eSemester.getText()+"', '-', "+
				  "	'-', '"+this.eThn.getText()+"', '"+this.eThn2.getText()+"','"+this.eGjl.getText()+"', "+
				  " '"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eFile.getText()+"',"+parseNilai(this.eTotal.getText())+", '"+this.app._lokasi+"','F') ");
											
		var line;
		var script ="insert into loadkts_d (noktsload,kode_produk, periode_awal, npm, no_kts) values ";	          				  	
		var scriptARM = "insert into armhs_m(no_invoice, tanggal,keterangan,nilai,periode,thn_ajar,sem_gg,user_id,kode_lokasi,ref1,ref2,progress,nilai_bd,posted,flag_hapus, semester, disc) values";
		var scriptARD = "insert into armhs_d(no_invoice,kode_produk,semester,akun_piutang,akun_pdpt,akun_pdd,jumlah,nilai,periode_awal,periode_akhir,flag_amor,kode_lokasi) values";
		var akunAR, akunPdd, kodePP, kodeDRK, ix = 0,scriptJurnal = [], npm;
		if (this.app._dbEng == "mysqlt"){
			for (var i in this.sg1.data.objList)
			{
				line = this.sg1.data.get(i);				
				akunAR = line.get("akunAR");
				akunPdd = line.get("akunPdd");
				kodePP = line.get("kodePP");
				kodeDRK = line.get("kodeDRK");		
				if (line.get("jenis") == 'BPP'){          		            
		            jenis ='PDD_NON';
				}else{          		            
		            jenis ='BEBAN_NON';
					akunPdd = line.get("akunLawan");				
				}				  									
																	
				if (i !=0) {scriptARD +=",";}
				if (npm != line.get("npm")) {
					if (npm !== undefined){
						script += ",";scriptARM += "," ;
					}
					script += "('" + this.e0.getText() + "','" + line.get("kodeProduk") + "','" + line.get("periodeAwal") + "','" + line.get("npm") + "','" + line.get("noKTS") + "' )";
					scriptARM += "('" + line.get("noKTS") + "','" + this.dpTgl.getDateString() + "','" + this.eKeterangan.getText() + "'," + parseFloat(line.get("subTotal")) + ", " +
					" '" +this.ePeriode.getText() +"','" +this.eThn.getText() +"/" +this.eThn2.getText() +"','" +this.eGjl.getText() +"','" +this.app._userLog +"', " +
					" '" +this.app._lokasi +"','" +line.get("npm") +"','-','0',0,'F','0','" +this.eSemester.getText() +"',0)";
					npm = line.get("npm");
				}
				scriptARD += "('"+line.get("noKTS")+"','"+line.get("kodeProduk")+"','"+this.eSemester.getText()+"','"+line.get("akunAR")+"','"+line.get("akunLawan")+"', "+
					" '"+line.get("akunPdd")+"','"+line.get("jumlah")+"',"+parseFloat(line.get("nilaiSatuan"))+",'"+line.get("periodeAwal")+"','"+nextNPeriode(line.get("periodeAwal"),line.get("jml_bulan") - 1)+"','0','"+this.app._lokasi+"')";
				ix++;
				scriptJurnal.push("('"+line.get("noKTS")+"','"+line.get("noKTS")+"','"+ix+"','"+this.dpTgl.getDateString()+"', '"+akunAR+"','D','"+this.eKeterangan.getText()+"','"+parseFloat(line.get("subTotal"))+"' ,"+
					"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+kodePP+"','"+kodeDRK+"')");	
				ix++;
				scriptJurnal.push("('"+line.get("noKTS")+"','"+line.get("noKTS")+"','"+ix+"','"+this.dpTgl.getDateString()+"', '"+akunPdd+"','C','"+this.eKeterangan.getText()+"','"+parseFloat(line.get("subTotal"))+"' ,"+
					"	'ARMHS','"+jenis+"','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+kodePP+"','"+kodeDRK+"')");	
			}
			sql.add(script);
			sql.add(scriptARM);
			sql.add(scriptARD);		
			sql.add("insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values " +scriptJurnal);
			
		}							
		this.dbLib.execArraySQL(sql);
	},
	doClick: function(sender){
		try{
			var line, rs, tmp,found;			
			rs = this.dbLib.getDataProvider("Select kode_jur, Kode_produk,Nama_produk,nilai,jenis,kode_drk_pdpt,"+
								 "case when kode_akun = '' or kode_akun = '-' then akun_beban else kode_akun end as akun_lawan,"+
	                             "case when akun_piutang = '' or akun_piutang = '-' then '-' else akun_piutang end as akun_piutang,"+
	                             "case when akun_pdd = '' or akun_pdd = '-' then '-' else akun_pdd end as akun_pdd,kode_pp,"+
	                             "case when kode_akun = '' or kode_akun ='-' then kode_drk_beban else kode_drk_pdpt end as kode_drk "+
								 "from produk where kode_lokasi  = '"+this.app._lokasi+"' order by kode_produk",true);		
			var dataProduk = rs;
			rs = this.dbLib.loadQuery("select npm from mhs where kode_lokasi  = '"+this.app._lokasi+"' ");				
			var dataMhs = rs.split("\r\n");
			rs = this.dbLib.getDataProvider("select semester, kode_ang, kode_jur,kode_produk,  jml_batas,nilai_batas, nilai_bpp, jml_bulan  from param_bpp where kode_lokasi  = '"+this.app._lokasi+"' ",true);
			var dataBPP = rs;
			var total = 0;
			if (this.sg1.data == undefined) return;				
			for (var i in this.sg1.data.objList){
				line = this.sg1.data.get(i);
				found = dataMhs.indexOf(line.get("npm")) != -1;
				if (!found)
					throw("Mahasiswa tidak terdaftar dgn NPM "+line.get("npm")+" baris ke "+ (parseInt(i,10) + 1));
				found = false;
				for (var j in dataProduk.rs.rows){
					if (dataProduk.rs.rows[j].kode_produk == line.get("kodeProduk")){	
						found = true;
						tmp = dataProduk.rs.rows[j];
						break;
					}
				}
				if (found){									
					this.sg1.data.get(i).set("namaProduk",tmp.nama_produk);				
					this.sg1.data.get(i).set("jenis",tmp.jenis);
					this.sg1.data.get(i).set("akunLawan",tmp.akun_lawan);
					this.sg1.data.get(i).set("akunAR",tmp.akun_piutang);
					this.sg1.data.get(i).set("akunPdd",tmp.akun_pdd);
					this.sg1.data.get(i).set("kodePP",tmp.kode_pp);
					this.sg1.data.get(i).set("kodeDRK",tmp.kode_drk);				
					kodeJur = tmp.kode_jur;
					jenis = tmp.jenis;							
					if (this.sg1.data.get(i).get("nilaiSatuan") != 0) {
						tmp.nilai = this.sg1.data.get(i).get("nilaiSatuan");						
					}			
					if (jenis == "LAINNYA") {						
						this.sg1.data.get(i).set("jumlah",1);				
						this.sg1.data.get(i).set("nilaiSatuan",parseFloat(tmp.nilai));				
						this.sg1.data.get(i).set("subTotal",parseFloat(tmp.nilai));
					}else if (jenis == "SKS"){
						found = false;
						for (var j in dataBPP.rs.rows){
							if (dataBPP.rs.rows[j].semester == this.eSemester.getText() && 
								dataBPP.rs.rows[j].kode_ang == this.sg1.data.get(i).get("angkatan") && 
								dataBPP.rs.rows[j].kode_jur == kodeJur ) { found = true; tmp = dataBPP.rs.rows[j];break;}
						}
						if (found){						
							if (this.sg1.data.get(i).get("nilaiSatuan") != 0) {								
								tmp.nilai_bpp = this.sg1.data.get(i).get("nilaiSatuan");								
							}			
							this.sg1.data.get(i).set("jumlah",parseFloat(tmp.jml_batas));				
							this.sg1.data.get(i).set("nilaiSatuan",parseFloat(tmp.nilai_batas));				
							this.sg1.data.get(i).set("subTotal",parseFloat(tmp.jml_batas) * parseFloat(tmp.nilai_batas));
							this.sg1.data.get(i).set("jml_bulan",parseFloat(tmp.jml_bulan));
						}
					}else if (jenis == "BPP"){										
						found = false;
						for (var j in dataBPP.rs.rows){
							if (dataBPP.rs.rows[j].semester == this.eSemester.getText() && 
								dataBPP.rs.rows[j].kode_ang == this.sg1.data.get(i).get("angkatan") && 
								dataBPP.rs.rows[j].kode_jur == kodeJur &&
								dataBPP.rs.rows[j].kode_produk == this.sg1.data.get(i).get("kodeProduk")) { found = true; tmp = dataBPP.rs.rows[j];break;}
						}
						if (found){						
							if (this.sg1.data.get(i).get("nilaiSatuan") != 0) {
								tmp.nilai_bpp = this.sg1.data.get(i).get("nilaiSatuan");								
							}			
							this.sg1.data.get(i).set("jumlah",1);				
							this.sg1.data.get(i).set("nilaiSatuan",parseFloat(tmp.nilai_bpp));				
							this.sg1.data.get(i).set("subTotal",parseFloat(tmp.nilai_bpp));				
							this.sg1.data.get(i).set("jml_bulan",parseFloat(tmp.jml_bulan));
						}
					}
					total += parseFloat(this.sg1.data.get(i).get("subTotal"));	
				}else throw("Produk "+line.get("kodeProduk")+" tidak ditemukan.\r\nProcess Stop.");
				tmp = "";
			}
			this.eTotal.setText(floatToNilai(total));
			this.sg1.clear();
			this.loadData(1,this.rowPerPage);
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
	doAfterLoad: function(sender, result,data){
		try{	
			if (result){				
				var rs, arr;		
				this.sg1.clear();
				if (data instanceof portalui_arrayMap){			
					this.sg1.setData(data, 1);
					this.sgn.setTotalPage(data.getTotalPage(this.rowPerPage));
					this.sgn.rearrange();
					this.sgn.activePage = 0;				
				}else if (typeof data !== "string") {						
					if (this.ePeriode.getText() == "") throw("Periode tidak valid");
					var rowCount = parseInt(data.rows.length);
					var fieldDesc = new portalui_arrayMap();
					var desc1 = new portalui_arrayMap();
					var desc2 = new portalui_arrayMap();
					this.headerFile = new Array("kodeProduk","namaProduk","jumlah","nilaiSatuan","subTotal","periodeAwal","jenis","akunLawan","akunAR","akunPdd","kodePP","kodeDRK","npm","noKTS","angkatan");
					for (var i in this.headerFile){
						desc1.set(this.headerFile[i],250);
						if ( i == 3 || i == 4)
							desc2.set(this.headerFile[i],"N");
						else desc2.set(this.headerFile[i],"S"); 
					}
					fieldDesc.set(0,desc1);
					fieldDesc.set(1,desc2);
					var dataRow, line;//, data = temp[1].split("\n");
					var result = new portalui_arrayMap();
					var nobukti = this.standarLib.noBuktiOtomatis(this.dbLib, "armhs_m", "no_invoice", "INV"+this.ePeriode.getText().substr(2),"00000"," and kode_lokasi = '"+this.app._lokasi+"' ");					
					var lastId = parseInt(nobukti.substr(7),10);
					var npm, first = true;			
					for (var i in data.rows){				
						line = new portalui_arrayMap();
						dataRow = data.rows[i];//data[i].split(";");
						if (dataRow["npm"] != npm) {							
							npm = dataRow["npm"];
							if (!first) {
								lastId++;
								nobukti = "INV" + this.ePeriode.getText().substr(2) + this.formatNumeric("00000", lastId.toString());
							}			
							first = false;			
						}																								
						for (var r in dataRow){
							if (r == "kode_produk"){
								line.set("kodeProduk",trim(dataRow[r]));
								line.set("namaProduk",'-');						
								line.set("jumlah",0);
								line.set("nilaiSatuan",0);
								line.set("subTotal",0);
							}else if (r == "periode_awal"){
								line.set("periodeAwal",dataRow[r]);
								line.set("jenis","-");
								line.set("akunLawan","-");
								line.set("akunAR","-");
								line.set("akunPdd","-");
								line.set("kodePP","-");
								line.set("kodeDRK","-");						
							}else if (r == "npm") {
								line.set("npm",dataRow[r]);	
								line.set("noKTS",nobukti);						
							}else if (r == "nilai"){		
								line.set("jumlah",1);
								line.set("nilaiSatuan",parseFloat(dataRow[r]));
								line.set("subTotal",parseFloat(dataRow[r]));
							}else line.set("angkatan",dataRow[r]);	
						}						
						result.set(i,line);
						if (i == data.length - 2) break;
					}			
					this.headerFile = new Array("kodeProduk","namaProduk","jumlah","nilaiSatuan","subTotal","periodeAwal","jenis","akunLawan","akunAR","akunPdd","kodePP","kodeDRK","npm","noKTS","angkatan");
					result.setTag1(rowCount);
					result.setTag2(fieldDesc);			
					this.sg1.data = result;
					this.sgn.setTotalPage(result.getTotalPage(this.rowPerPage));			
					this.sgn.rearrange();
					this.sgn.setButtonStyle(3);
					this.sgn.activePage = 0;	
					this.loadData(1,this.rowPerPage);
				}else 
					if (data.search("\r\n") == -1) throw(data);
			}
		}catch(e){
			alert(e);
		}
	},
	loadData: function(page, rowPerPage){
		var start = ( page - 1)* rowPerPage;
		var finish = ( this.sg1.data.getLength() < start + rowPerPage ? this.sg1.data.getLength() : start + rowPerPage);
		this.sg1.clear();
		var data = this.sg1.data, line,dataToAppend;		
		for (var i=start;i < finish;i++){
			line = data.get(i);
			dataToAppend = [];
			for (var c in line.objList) {
				if (c == "nilaiSatuan" || c == "subTotal")
					dataToAppend.push(floatToNilai(line.get(c)));
				else 
					dataToAppend.push(line.get(c));
			}
			this.sg1.appendData(dataToAppend);
		}
		this.sg1.setNoUrut(start);
	},
	doFileChange: function(sender, filename, allow){
		if (allow)
			this.eFile.setText(filename);
	},
	doSelectedPage: function(sender, page){	
		this.loadData(page,this.rowPerPage);
	},
	doGenerate: function(sender){
		this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "loadkts", "noktsload", "L"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
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
		window.open("server/media/formatUploadAR.xls");
	}
});
