window.app_saku_piutang_transaksi_fGenKts = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fGenKts.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fGenKts";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Generate KTS Mahasiswa : Input",0);
		
		try
		{
			uses("portalui_saiCBBL");
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
			
			uses("portalui_saiCB");
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
			
			this.eProduk = new portalui_saiCBBL(this);
			this.eProduk.setLeft(20);
			this.eProduk.setTop(255);
			this.eProduk.setWidth(200);
			this.eProduk.setCaption("Produk");
			this.eProduk.setText("");	
			this.eProduk.onBtnClick.set(this,"FindBtnClick");				
			
			this.bLoad = new portalui_button(this);
			this.bLoad.setLeft(740);
			this.bLoad.setTop(255);
			this.bLoad.setWidth(80);
			this.bLoad.setHeight(18);		
			this.bLoad.onClick.set(this,"doClick");
			this.bLoad.setCaption("Load");
			
			this.bValidasi = new portalui_button(this);
			this.bValidasi.setTop(255);
			this.bValidasi.setLeft(840);
			this.bValidasi.setCaption("Validasi");
			this.bValidasi.setIcon("url(icon/"+system.getThemes()+"/bCopy.png)");
			this.bValidasi.onClick.set(this,"doClick");		
			
			this.ePeriodeAwal = new portalui_saiLabelEdit(this);
			this.ePeriodeAwal.setLeft(20);
			this.ePeriodeAwal.setTop(256);
			this.ePeriodeAwal.setWidth(180);
			this.ePeriodeAwal.setCaption("Periode Awal");
			this.ePeriodeAwal.setText("");				
			
			uses("portalui_saiTable",true);
			this.sg1 = new portalui_saiTable(this);
			this.sg1.setTop(280);
			this.sg1.setLeft(20);
			this.sg1.setWidth(900);
			this.sg1.setHeight(200);			
			this.sg1.setColTitle(new Array("No","Kode Produk","Jenis Biaya","Jumlah","Nilai Satuan","Sub Total","Periode Awal","Jenis","Akun Lawan","Akun AR","Akun Pdd","Kode PP","Kode DRK","NPM","No KTS"));
			
			uses("portalui_sgNavigator");
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(481);
			this.sgn.setLeft(20);
			this.sgn.setWidth(900);
			this.sgn.setButtonStyle(3);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");
			this.rowPerPage = 100;
			
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
			uses("util_standar");
			this.standarLib = new util_standar();
			this.rearrangeChild(10,23);
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fGenKts]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fGenKts.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fGenKts.prototype.mainButtonClick = function(sender)
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
window.app_saku_piutang_transaksi_fGenKts.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, ["0"],this.e0);				
				this.sg1.clearAll();
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
window.app_saku_piutang_transaksi_fGenKts.prototype.insertData = function(sql)
{	
	sql.add(" insert into loadkts (noktsload,periode,semester,kode_jur,kode_ang,thn_ajar1,thn_ajar2,jenis_sem,tanggal,keterangan,namafile,nilaiload, kode_lokasi,posted) values "+
              "('"+this.e0.getText()+"', '"+this.ePeriode.getText()+"', '"+this.eSemester.getText()+"', '"+this.eJurusan.getText()+"', "+
			  "	'"+this.eAngkatan.getText()+"', '"+this.eThn.getText()+"', '"+this.eThn2.getText()+"','"+this.eGjl.getText()+"', "+
			  " '"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.eFile.getText()+"',"+parseNilai(this.eTotal.getText())+", '"+this.app._lokasi+"','F') ");
										
	var line;
	var script ="insert into loadkts_d (kode_produk, periode_awal, npm) values ";
	var scriptARM = "insert into armhs_m(no_invoice, tanggal,keterangan,nilai,periode,thn_ajar,sem_gg,user_id,kode_lokasi,ref1,ref2,progress,nilai_bd,posted,flag_hapus) values";
	var scriptARD = "insert into armhs_d(no_invoice,kode_produk,semester,akun_piutang,akun_pdpt,akun_pdd,jumlah,nilai,periode_awal,periode_akhir,flag_amor) values";
	var akunAR, akunPdd, kodePP, kodeDRK;
	if (this.app._dbEng == "mysqlt"){
		for (var i in this.sg1.data.objList)
		{
			line = this.sg1.data.get(i);		
			akunAR = line.get("akunAR");
			akunPdd = line.get("akunPdd");
			kodePP = line.get("akunPP");
			kodeDRK = line.get("akunDRK");
			if (i !=0) {script += ",";scriptARM += "," ;scriptARD +=",";}
			script += "('"+line.get("kodeProduk")+"','"+line.get("periodeAwal")+"','"+line.get("npm")+"')";
			scriptARM += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',"+parseFloat(line.get("subTotal"))+", "+
				" '"+this.ePeriode.getText()+"','"+this.eThn.getText()+"/"+this.eThn2.getText()+"','"+this.eGjl.getText()+"','"+this.app._userLog+"', "+
				" '"+this.app._lokasi+"','"+line.get("npm")+"','-','0',0,'F','0')";			
			scriptARD += "('"+this.e0.getText()+"','"+line.get("kodeProduk")+"','"+line.get("semester")+"','"+line.get("akunAR")+"','"+line.get("akunLawan")+"', "+
				" '"+line.get("akunPdd")+"','"+line.get("jumlah")+"',"+parseFloat(line.get("nilaiSatuan"))+",'"+line.get("periodeAwal")+"','"+nextNPeriode(line.get("periodeAwal"),6)+"','0')";
		}
		sql.add(script);
		sql.add(scriptARM);
		sql.add(scriptARD);		
	}else{
		script = "";
		scriptARM = "";
		scriptARD = "";
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{							
			line = this.sg1.data.get(i);		
			akunAR = line.get("akunAR");
			akunPdd = line.get("akunPdd");
			kodePP = line.get("akunPP");
			kodeDRK = line.get("akunDRK");			
			script +="insert into loadkts_d (kode_produk, periode_awal, npm) values "+
					"('"+line.get("kodeProduk")+"','"+line.get("periodeAwal")+"','"+line.get("npm")+"');";			
			scriptARM += "insert into armhs_m(no_invoice, tanggal,keterangan,nilai,periode,thn_ajar,sem_gg,user_id,kode_lokasi,ref1,ref2,progress,nilai_bd,posted) values"+
					"('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"',"+parseFloat(line.get("subTotal"))+", "+
				" '"+this.ePeriode.getText()+"','"+this.eThn.getText()+"/"+this.eThn2.getText()+"','"+this.eGjl.getText()+"','"+this.app._userLog+"', "+
				" '"+this.app._lokasi+"','"+line.get("npm")+"','-','0',0,'F','0');";			
			scriptARD += "insert into armhs_d(no_invoice,kode_produk,semester,akun_piutang,akun_pdpt,akun_pdd,jumlah,nilai,periode_awal,periode_akhir,flag_amor) values"+
				"('"+this.e0.getText()+"','"+line.get("kodeProduk")+"','"+line.get("semester")+"','"+line.get("akunAR")+"','"+line.get("akunLawan")+"', "+
				" '"+line.get("akunPdd")+"','"+line.get("jumlah")+"',"+parseFloat(line.get("nilaiSatuan"))+",'"+line.get("periodeAwal")+"','"+nextNPeriode(line.get("periodeAwal"),6)+"','0');";
		}
	}					
	sql.add("insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, user_id, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values " +
				"('"+this.e0.getText()+"','"+this.e0.getText()+"','1','"+this.dpTgl.getDateString()+"', '"+akunAR+"','D','"+this.eKeterangan.getText()+"','"+parseNilai(this.eTotal.getText())+"' ,"+
				"	'ARMHS','PDD_NON','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+kodePP+"','"+kodeDRK+"')");
	sql.add("insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, user_id, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values " +
				"('"+this.e0.getText()+"','"+this.e0.getText()+"','2','"+this.dpTgl.getDateString()+"', '"+akunPdd+"','C','"+this.eKeterangan.getText()+"','"+parseNilai(this.eTotal.getText())+"' ,"+
				"	'ARMHS','PDD_NON','"+this.ePeriode.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.app._lokasi+"','-','IDR','1','"+kodePP+"','"+kodeDRK+"')");
	this.dbLib.execArraySQL(sql);	
};
window.app_saku_piutang_transaksi_fGenKts.prototype.doClick = function(sender)
{
	try{
		if (sender == this.bLoad){
			this.dbLib.loadQueryA("select '"+this.eProduk.getText()+"' as kode_produk,'"+this.ePeriodeAwal.getText()+"' as periode_awal, npm where mhs where kode_lokasi ='"+this.app._lokasi+"'  and status ='1' ");
		}
		if (sender == this.bValidasi){
			var line, rs, tmp,found;			
			rs = this.dbLib.loadQuery("Select Kode_produk,Nama_produk,nilai,jenis,kode_drk_pdpt,"+
	                             "case when kode_akun = '' or kode_akun = '-' then akun_beban else kode_akun end as akun_lawan,"+
	                             "case when akun_piutang = '' or akun_piutang = '-' then '-' else akun_piutang end as akun_piutang,"+
	                             "case when akun_pdd = '' or akun_pdd = '-' then '-' else akun_pdd end as akun_pdd,kode_pp,"+
	                             "case when kode_akun = '' or kode_akun ='-' then kode_drk_beban else kode_drk_pdpt end as kode_drk "+
	                             "from produk where  kode_jur='"+this.eJurusan.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"' order by kode_produk");		
			var dataProduk = rs.split("\r\n");			
			rs = this.dbLib.loadQuery("select npm from mhs where kode_lokasi  = '"+this.app._lokasi+"' ");				
			var dataMhs = rs.split("\r\n");	
			
			rs = this.dbLib.loadQuery("select semester, kode_ang, kode_jur,kode_produk,  jml_batas,nilai_batas, nilai_bpp  from param_bpp where kode_lokasi  = '"+this.app._lokasi+"' ");				
			var dataBPP = rs.split("\r\n");
			var total = 0;
			if (this.sg1.data == undefined) return;				
			for (var i in this.sg1.data.objList){
				line = this.sg1.data.get(i);
				found = dataMhs.indexOf(line.get("npm")) != -1;
				if (!found)
					throw("Mahasiswa tidak terdaftar dgn NPM "+line.get("npm")+"");
				found = false;
				for (var j=1;j < dataProduk.length - 2;j++){
					if (dataProduk[j].search(line.get("kodeProduk")) != -1){
						found = true;
						tmp = dataProduk[j];
						break;
					}
				}
				if (found){
					tmp = tmp.split(";");								
					this.sg1.data.get(i).set("namaProduk",tmp[1]);				
					this.sg1.data.get(i).set("jenis",tmp[3]);
					this.sg1.data.get(i).set("akunLawan",tmp[5]);
					this.sg1.data.get(i).set("akunAR",tmp[6]);
					this.sg1.data.get(i).set("akunPdd",tmp[7]);
					this.sg1.data.get(i).set("kodePP",tmp[8]);
					this.sg1.data.get(i).set("kodeDRK",tmp[9]);				
					
					jenis = tmp[3];				
					if (jenis == "LAINNYA") {
						this.sg1.data.get(i).set("jumlah",0);				
						this.sg1.data.get(i).set("nilaiSatuan",parseFloat(tmp[2]));				
						this.sg1.data.get(i).set("subTotal",0);				
					}else if (jenis == "SKS"){
						found = false;
						for (var j=1; j < dataBPP.length; j++){
							if (dataBPP[j].search(this.eSemester.getText()) != -1 && 
								dataBPP[j].search(this.eAngkatan.getText()) != -1 && 
								dataBPP[j].search(this.eJurusan.getText()) != -1 ) { found = true; tmp = dataBPP[j];break;}
						}
						if (found){
							tmp = tmp.split(";");
							this.sg1.data.get(i).set("jumlah",parseFloat(tmp[4]));				
							this.sg1.data.get(i).set("nilaiSatuan",parseFloat(tmp[5]));				
							this.sg1.data.get(i).set("subTotal",parseFloat(tmp[4]) * parseFloat(tmp[5]));
						}
					}else if (jenis == "BPP"){										
						found = false;
						for (var j=1; j < dataBPP.length; j++){
							if (dataBPP[j].search(this.eSemester.getText()) != -1 && 
								dataBPP[j].search(this.eAngkatan.getText()) != -1 && 
								dataBPP[j].search(this.eJurusan.getText()) != -1  &&
								dataBPP[j].search(this.sg1.data.get(i).get("kodeProduk")) != -1 ) { found = true; tmp = dataBPP[j];break;}
						}
						if (found){
							tmp = tmp.split(";");
							this.sg1.data.get(i).set("jumlah",1);				
							this.sg1.data.get(i).set("nilaiSatuan",parseFloat(tmp[6]));				
							this.sg1.data.get(i).set("subTotal",parseFloat(tmp[6]));				
						}
					}
					
					total += this.sg1.data.get(i).get("subTotal");	
				}else throw("Produk "+line.get("kodeProduk")+" tidak ditemukan.\r\nProcess Stop.");
				tmp = "";
			}
			this.eTotal.setText(floatToNilai(total));
			this.sg1.clearAll();
			this.sg1.setData(this.sg1.data,1, this.rowPerPage);
		}
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_saku_piutang_transaksi_fGenKts.prototype.doEditChange = function(sender)
{
};
window.app_saku_piutang_transaksi_fGenKts.prototype.FindBtnClick = function(sender, event)
{
	switch(sender){
		case this.eJurusan :
			this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
									  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' ",
									["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
			break;
		case this.eProduk :
			this.standarLib.showListData(this, "Data Produk",sender,undefined, 
								  "select kode_produk, nama_produk from produk where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
								  "select count(*) from produk where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ",
								["kode_produk","nama_produk"],"and",["Kode Produk","Nama Produk"]);
			break;
		case this.eAngkatan :
			this.standarLib.showListData(this, "Data Angkatan",sender,undefined, 
								  "select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"'",
								["kode_ang","nama_ang"],"and",["Kode Angkatan","Nama Angkatan"]);
			break;
	}
};
window.app_saku_piutang_transaksi_fGenKts.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
				case "loadQuery" :    				
					this.doAfterLoad(undefined, true, result);
					break;
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
window.app_saku_piutang_transaksi_fGenKts.prototype.doAfterLoad = function(sender, result,data)
{
	try{	
	if (result){				
		var rs, arr;
		this.sg1.clearAll();			
		if (data instanceof portalui_arrayMap){			
			this.sg1.setData(data, 1);
			this.sgn.setTotalPage(data.getTotalPage(this.rowPerPage));
			this.sgn.rearrange();
			this.sgn.activePage = 0;				
		}else {
			if (data.search("\r\n") == -1) throw(data);
			var temp = data.split("\r\n");
			var header = temp[0].split(";");			
			var rowCount = parseInt(temp[2]);
			var fieldDesc = new portalui_arrayMap();
			var desc1 = new portalui_arrayMap();
			var desc2 = new portalui_arrayMap();
			this.headerFile = new Array("kodeProduk","namaProduk","jumlah","nilaiSatuan","subTotal","periodeAwal","jenis","akunLawan","akunAR","akunPdd","kodePP","kodeDRK","npm","noKTS");
			for (var i in this.headerFile){
				desc1.set(this.headerFile[i],250);
				if ( i == 3 || i == 4)
					desc2.set(this.headerFile[i],"N");
				else desc2.set(this.headerFile[i],"S"); 
			}
			fieldDesc.set(0,desc1);
			fieldDesc.set(1,desc2);
			var dataRow, line, data = temp[1].split("\n");
			var result = new portalui_arrayMap();
			var nobukti = this.standarLib.noBuktiOtomatis(this.dbLib, "armhs_m", "no_invoice", "INV"+this.app._periode.substr(2),"00000"," and kode_lokasi = '"+this.app._lokasi+"' ");
			var lastId = parseInt(nobukti.substr(7));			
			for (var i in data){				
				line = new portalui_arrayMap();
				dataRow = data[i].split(";");					
				for (var r in dataRow){																		
					if (r == 0){
						line.set("kodeProduk",dataRow[r]);
						line.set("namaProduk",'-');						
						line.set("jumlah",0);
						line.set("nilaiSatuan",0);
						line.set("subTotal",0);
					}else if (r == 1){
						line.set("periodeAwal",dataRow[r]);
						line.set("jenis","-");
						line.set("akunLawan","-");
						line.set("akunAR","-");
						line.set("akunPdd","-");
						line.set("kodePP","-");
						line.set("kodeDRK","-");						
					}else if (r == 2) {
						line.set("npm",dataRow[r]);	
						line.set("noKTS",nobukti);						
					}
				}
				lastId++;
				nobukti = "INV"+this.app._periode.substr(2) + this.formatNumeric("00000",lastId.toString());
				result.set(i,line);
				if (i == data.length - 2) break;
			}			
			this.headerFile = new Array("kodeProduk","namaProduk","jumlah","nilaiSatuan","subTotal","periodeAwal","jenis","akunLawan","akunAR","akunPdd","kodePP","kodeDRK","npm","noKTS");
			result.setTag1(rowCount);
			result.setTag2(fieldDesc);			
			this.sg1.setData(result, 1,this.rowPerPage);
			this.sgn.setTotalPage(result.getTotalPage(this.rowPerPage));			
			this.sgn.rearrange();
			this.sgn.setButtonStyle(3);
			this.sgn.activePage = 0;	
		}
	}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_piutang_transaksi_fGenKts.prototype.doSelectedPage = function(sender, page){	
	this.sg1.clearAll();
	this.sg1.setData(this.sg1.data, page,this.rowPerPage);
};
window.app_saku_piutang_transaksi_fGenKts.prototype.doGenerate = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "loadmhs_m", "no_bukti", "L"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
};
window.app_saku_piutang_transaksi_fGenKts.prototype.formatNumeric = function(format, idx)
{
	result = idx;
	for (var i =0;i < format.length;i++)
	{
		if (result.length < format.length)
			result = "0" + result;      
	}
	return result;
};
window.app_saku_piutang_transaksi_fGenKts.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};