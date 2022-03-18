window.app_saku_gl_transaksi_fUploadJurnal = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fUploadJurnal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_transaksi_fUploadJurnal";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload Jurnal Umum [Buku Bantu]: Input", 0);	
		
		uses("portalui_datePicker;portalui_saiGrid;portalui_saiCBBL;util_addOnLib;app_saku_fJurnalViewer;portalui_sgNavigator");
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,56,230,20],caption:"Jenis",tag:1});
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,144,185,20],readOnly:true,caption:"Currency dan Kurs",text:"IDR",tag:1, rightLabelVisible:false});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,144,45,20],labelWidth:0,tipeText:ttNilai,alignment:alRight,caption:"",text:"1",readOnly:true,tag:1});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,166,185,20],readOnly:true,caption:"Dibuat Oleh"});
		this.ed_debet = new portalui_saiLabelEdit(this,{bound:[680,166,220,20],tipeText:ttNilai,alignment:alRight,caption:"Total Debet",text:"0",readOnly:true});
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,188,185,20],caption:"Disetujui Oleh",readOnly:true});
		this.ed_kredit = new portalui_saiLabelEdit(this,{bound:[680,188,220,20],tipeText:ttNilai ,alignment:alRight,caption:"Total Kredit",text:"0",readOnly:true});
		this.bGar = new portalui_imageButton(this,{bound:[900,188,22,22],hint:"Hitung Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",visible:false});
		this.p1 = new portalui_panel(this,{bound:[20,21,900,260],caption:"Daftar Item Jurnal"});
    	this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,210],colCount:16,
                         colTitle:["Tanggal","No Bukti","No Dokumen","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode Cust","Nama Cust","Kode Vendor","Nama Vendor","NIK","Nama Kary."],
                         colWidth:[[15,14,13,12,11,10,9,8,7, 6,5,4,3,2,1,0],[100,80,100,80,100,80,100,80,100, 50,250,250,80,150,120,80]],readOnly:true,
                         buttonStyle:[[3,6,8,10,12,14],[bsEllips,bsAuto,bsEllips,bsEllips,bsEllips,bsEllips]],
                         colReadOnly:[true,[4,6,9,11,13,15],[]],colFormat:[[7],[cfNilai]]});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,234,898,25],grid:this.sg1,buttonStyle:4,afterUpload:[this,"doAfterUpload"],pager:[this,"doPager"]});
		this.sgn.uploader.setParam3("object");
        setTipeButton(tbSimpan);
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		try
		{
		    this.dbLib = new util_dbLib(window.system.serverApp);
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();
			this.addOnLib = new util_addOnLib();
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(new Array("Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"));
			this.jurnal.p.setCaption('Data Anggaran');
						
						
			this.cb_jenis.onChange.set(this,"doEditChange");			
			this.bGar.onClick.set(this, "garClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			var val = this.dbLib.loadQuery("select concat(kode_jenis,'-',nama) as jenis from ju_jenis where kode_lokasi='"+this.app._lokasi+"' ");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.cb_jenis.addItem(j,val[j].split(";"));
					}
				}
		
			this.standarLib.clearByTag(this, new Array("0","1"),this.cb_jenis);				
			this.loadAkun();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gl_transaksi_fUploadJurnal.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fUploadJurnal.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.simpan = function()
{	
	try
	{
		if  (nilaiToFloat(this.ed_debet.getText()) != nilaiToFloat(this.ed_kredit.getText()))
		{
			system.alert(this,"Total debet dan kredit tidak sama.","");
			return false;
		}
	} catch (e)
	{
		system.alert(this, e,"");
	}
	
//	/this.hitungGar();
	/*for (var i in this.gridJurnal.objList)
	{
		line = this.gridJurnal.get(i);
		if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
		{
			system.alert(this,"Nilai transaksi melebihi saldo anggaran.","Periksa kembali data anggaran.");
			return false;
		}
	}*/
	//this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
		    var nb = "", periode, tgl,NoUrut = 1, total = 0,line;           
		    var scriptJuM = "insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,"+
    					"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1) values  ";		
			var scriptJuJ = "insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";	
			if (periode === this.app._periode) var table = "gldt"; else var table = "gldt_h";
            var scriptGldt = "insert into "+table+" (no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";			
			var first = true, firstMaster = true, beda = true, lineBfr, lastTotal=0;
            for (var i=0; i < this.dataUpload.rows.length; i++)
			{			
                if (i % 500 == 0) {
                    if ( i > 0){
                        sql.add(scriptJuM);
                        sql.add(scriptJuJ);
                        sql.add(scriptGldt);
                    }
                    scriptJuM = "insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,"+
    					"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1) values  ";		
        			scriptJuJ = "insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
        						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";	
        			if (periode === this.app._periode) var table = "gldt"; else var table = "gldt_h";
                    scriptGldt = "insert into "+table+" (no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
        						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";			
                    first = true,firstMaster = true;			  
                }
                line = this.dataUpload.rows[i];
			    if (nb  != line.no_jurnal){     				
    				NoUrut = 1;	     
                    nb = line.no_jurnal;
    				periode = line.tanggal.split("/");
                    tgl = periode[2]+"/"+periode[1]+"/"+periode[0];
                    periode = periode[2]+""+periode[1];        
                    total = 0;
			    } 
			    if (!first) {scriptJuJ +=",";scriptGldt +=",";}
                scriptJuJ +=  "('"+line.no_jurnal+"','"+line.no_dok+"','"+tgl+"',"+NoUrut+",'"+line.kode_akun+
						"','"+line.keterangan+"','"+line.dc.toUpperCase()+"',"+parseFloat(line.nilai)+",'"+line.kode_pp+"','-',"+
						"'"+line.kode_cust+"','-','-','"+line.kode_vendor+"','-','"+line.nik+"','"+this.app._lokasi+"','JU2','"+this.jenis+"',"+
						"'"+periode+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())";
			    scriptGldt += "('"+line.no_jurnal+"','"+line.no_dok+"','"+tgl+"',"+NoUrut+",'"+line.kode_akun+
						"','"+line.keterangan+"','"+line.dc.toUpperCase()+"',"+parseFloat(line.nilai)+",'"+line.kode_pp+"','-',"+
						"'"+line.kode_cust+"','-','-','"+line.kode_vendor+"','-','"+line.nik+"','"+this.app._lokasi+"','JU2','"+this.jenis+"',"+
						"'"+periode+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now())";
			     NoUrut++;
                 if (line.dc.toUpperCase() == "D") total += parseFloat(line.nilai);
                 first = false;
                 if (lineBfr !== undefined && lineBfr.no_jurnal != line.no_jurnal){
                    periode = lineBfr.tanggal.split("/");
                    tgl = periode[2]+"/"+periode[1]+"/"+periode[0];
                    periode = periode[2]+""+periode[1];        
                    if (!firstMaster) scriptJuM += ",";                
			        scriptJuM += "('"+lineBfr.no_jurnal+"','"+this.app._lokasi+"','"+lineBfr.no_dok+"','"+tgl+"','"+lineBfr.keterangan+"','-','JU2','"+this.jenis+"','"+
    					     periode+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+(lastTotal)+",'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',now(),'"+this.app._userLog+"','T','-','-','-')";			                    				     
                    firstMaster = false; 					     
                 }
                 lastTotal = total;
                 beda = false;
                 lineBfr = line;
			}								
            periode = lineBfr.tanggal.split("/");
            tgl = periode[2]+"/"+periode[1]+"/"+periode[0];
            periode = periode[2]+""+periode[1];        
            if (!firstMaster) scriptJuM += ",";
	        scriptJuM += "('"+lineBfr.no_jurnal+"','"+this.app._lokasi+"','"+lineBfr.no_dok+"','"+tgl+"','"+lineBfr.keterangan+"','-','JU2','"+this.jenis+"','"+
				     periode+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+(total)+",'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',now(),'"+this.app._userLog+"','T','-','-','-')";   
				     
            sql.add(scriptJuM);
            sql.add(scriptJuJ);
            sql.add(scriptGldt);
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.ed_jenis);				
				//this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow(); this.ed_kurs.setText("1");
			}
			break;
			
		case "simpan" :
			this.simpan();
			break;

		case "simpancek" : this.simpan();
			break;
	}
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.genClick = function(sender)
{
	try
	{		
	}
	catch (e)
	{
		alert(e);
	}
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.showClick = function(sender)
{
	if (this.cb_bukti != undefined) 
	{
		if (this.cb_bukti.getText() != "") {
			try 
			{
				var data = this.dbLib.runSQL(" select  keterangan, kode_curr "+
											 " from refju_m "+
											 " where no_refju='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						line = data.get(0);
						this.ed_desc.setText(line.get("keterangan"));
						this.cb_curr.setText(line.get("kode_curr"));
					} 
				}

				this.sg1.clear(); 
				if (this.app._dbEng == "mysqlt")
				{
					var strSql = " select  a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai,a.kode_pp, ifnull(c.nama,'-') as nama_pp, a.kode_cust,ifnull(d.nama,'-') as nama_cust, a.kode_vendor,ifnull(e.nama,'-') as nama_vendor, a.nik,ifnull(f.nama,'-') as nama_kary "+
											 " from refju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											 "                left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
											 "                left outer join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
											 "                left outer join vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
											 "                left outer join karyawan f on a.nik=f.nik and a.kode_lokasi=f.kode_lokasi "+
											 " where a.no_refju = '"+this.cb_bukti.getText()+"'";
				}else
				if (this.app._dbEng == "ado_mssql")
				{
					
				}
				
				var data = this.dbLib.runSQL(strSql);
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							this.sg1.appendData(new Array(line.get("kode_akun"),line.get("nama_akun"),line.get("keterangan"),line.get("dc"),line.get("nilai"),
										  line.get("kode_pp"),line.get("nama_pp"),line.get("kode_cust"),line.get("nama_cust"),line.get("kode_vendor"),line.get("nama_vendor"),line.get("nik"),line.get("nama_kary")));					
						}
						this.sg1.validasi();
					} 
				}
				
			} catch(e)
			{
				system.alert(this,e,"");
			}
		}
	}
};
window.app_saku_gl_transaksi_fUploadJurnal.prototype.doEditChange = function(sender)
{
	
	if (sender == this.cb_jenis)
	{
		this.jenis = this.cb_jenis.getText().substr(0,2);
		/*
		if (this.cb_jenis.getText() == "UMUM")
		{
			this.jenis = "JU";
		}
		if (this.cb_jenis.getText() == "KOREKSI")
		{
			this.jenis = "JK";
		}
		if (this.cb_jenis.getText() == "ADJUST")
		{
			this.jenis = "JA";
		}
		if (this.cb_jenis.getText() == "AUDIT")
		{
			this.jenis = "JD";
		}*/
	}
	
	if (sender == this.cb_curr)
	{
		if (this.cb_curr.getText() == "IDR")
		{	
			this.ed_kurs.setText("1");
			this.ed_kurs.setReadOnly(true);
		}
		else
		{
			this.ed_kurs.setReadOnly(false);
		}
	}	
};
	
window.app_saku_gl_transaksi_fUploadJurnal.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{
			this.standarLib.showListData(this,  "Daftar Refernsi Jurnal",this.cb_bukti,undefined, 
												"select no_refju, keterangan from refju_m where kode_lokasi='"+this.app._lokasi+"'",
												"select count(no_refju)      from refju_m where kode_lokasi='"+this.app._lokasi+"'",
												new Array("no_refju","keterangan"),"and", new Array("No Referensi","Keterangan"),false);
			this.sg1.clear(); this.sg1.appendRow(); this.ed_desc.setText("");
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama  from curr",
										  "select count(kode_curr) from curr",
										  new Array("kode_curr","nama"),"where", new Array("Kode Curr","Deskripsi"),false);
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
		}
		
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.doCellEnter = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 2 : 
						if (this.sg1.getCell(2,row) == "")
						this.sg1.setCell(2,row,this.ed_desc.getText());
				break;
			case 3 : 
						if (this.sg1.getCell(3,row) == "")
						this.sg1.setCell(3,row,"D");
				break;
			case 5 : 
						if ((this.sg1.getCell(5,row) == "") && (row > 0)) {
						this.sg1.setCell(5,row,this.sg1.getCell(5,(row-1)));
						this.sg1.setCell(6,row,this.sg1.getCell(6,(row-1)));
						}
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}	
};


window.app_saku_gl_transaksi_fUploadJurnal.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
				break;
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar Customer",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.kode_cust, a.nama from cust a where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.kode_cust)  from cust a where a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.kode_cust","a.nama"),"and",new Array("Kode Cust","Deskripsi"),true);
				break;
			case 9 : 
				this.standarLib.showListDataForSG(this, "Daftar Vendor",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.kode_vendor, a.nama from vendor a where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.kode_vendor)  from vendor a where a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.kode_vendor","a.nama"),"and",new Array("Kode Vendor","Deskripsi"),true);
				break;
			case 11 : 
				this.standarLib.showListDataForSG(this, "Daftar Karyawan",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.nik, a.nama from karyawan a where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.nik)  from karyawan a where a.kode_lokasi='"+this.app._lokasi+"'",
												  new Array("a.nik","a.nama"),"and",new Array("NIK","Nama"),true);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_gl_transaksi_fUploadJurnal] : doFindBtnClick : " + e);
	}
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.doNilaiChange = function()
{
	try
	{
		var totD = totC = 0, line;		
		for (var i = 0; i < this.dataUpload.rows.length;i++)
		{
            line = this.dataUpload.rows[i];
			if (line.nilai != "")
			{
				if (line.dc.toUpperCase() == "D")					
					totD += parseFloat(line.nilai);			
				if (line.dc.toUpperCase() == "C")					
					totC += parseFloat(line.nilai);			
			}
		}
		this.ed_debet.setText(floatToNilai(totD));
		this.ed_kredit.setText(floatToNilai(totC));
	}catch(e)
	{
		alert("[app_saku_gl_transaksi_fUploadJurnal]::doNilaiChange:"+e);
	}
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 3 : 
			case 4 : 
						this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}	
};

window.app_saku_gl_transaksi_fUploadJurnal.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :    	
				if (result.toLowerCase().search("error") == -1)					
				{
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
      		break;
    		}    		
		}
		catch(e)
		{
			systemAPI.alert(this+"$request():"+result,e);
		}
    }
};
window.app_saku_gl_transaksi_fUploadJurnal.implement({
    doAfterUpload: function(sender, result, data, fileName){
        try{
            if (typeof data != "string"){
                this.sg1.clear();
                this.pager = 100;
                this.sgn.setTotalPage(Math.ceil(data.rows.length / this.pager));                
                this.sgn.rearrange();
                this.recordCount = data.rows.length;
                this.dataUpload = data;
                this.loadDataPerPage(1);
                this.doNilaiChange();
            }            
        }catch(e){
            systemAPI.alert(e+" "+fileName,data);
        }
    },
    loadDataPerPage: function(page){
        this.sg1.clear();
        if (this.dataUpload.rows.length == 0) return;
        var startIx = (page - 1) * this.pager;
        var finish = startIx + this.pager -1;        
        var line, namaakun, namapp, namacust, namavendor, namakary;
        if (finish > this.dataUpload.rows.length) finish = this.dataUpload.rows.length -1;
        for(var i=startIx;i< finish;i++){
            line = this.dataUpload.rows[i];
            namaakun = this.dtAkun.get(line.kode_akun);
            if (namaakun == undefined) {
               system.alert(this,"Kode Akun ("+line.kode_akun+")tidak terdaftar","Baris ke "+i+" "+line.kode_akun+" - "+line.keterangan+" - "+line.dc+" - "+line.name+" - "+line.kode_cust+" - "+line.kode_vendor);
               break;                
            }
            namapp = this.dtPP.get(line.kode_pp);
            if (namapp == undefined) {
               system.alert(this,"Kode PP ("+line.kode_pp+")tidak terdaftar","Baris ke "+i+" "+line.kode_akun+" - "+line.keterangan+" - "+line.dc+" - "+line.name+" - "+line.kode_cust+" - "+line.kode_vendor);
               break;                
            }
            if (line.kode_cust != "" && line.kode_cust != undefined && line.kode_cust != "-") 
               namacust = this.dtCust.get(line.kode_cust);
            else { namacust = "-"; line.kode_cust = "-";};
            if (line.kode_vendor != "" && line.kode_vendor != undefined && line.kode_vendor != "-") 
               namavendor = this.dtVendor.get(line.kode_vendor);
            else { namavendor = "-"; line.kode_vendor = "-";};
            if (line.nik != "" && line.nik != undefined && line.nik != "-") 
               namakary = this.dtKary.get(line.nik);
            else { namakary = "-"; line.nik = "-";};
            this.sg1.appendData([line.tanggal, line.no_jurnal, line.no_dok, line.kode_akun,namaakun, line.keterangan,line.dc, floatToNilai(parseFloat(line.nilai)),line.kode_pp, namapp, line.kode_cust, namacust, line.kode_vendor,namavendor, line.nik,namakary]);
        } 
        this.sg1.setNoUrut(startIx);
    },
    doPager: function(sender, page){
        this.loadDataPerPage(page);  
    },
    loadAkun: function(){
        var data = runArraySQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"'\r\n"+
                        "select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi +"' and tipe='posting' \r\n"+
                        "select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"' \r\n"+
                        "select kode_vendor, nama from vendor where kode_lokasi = '"+this.app._lokasi +"'\r\n"+
                        "select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi +"' ");
        data = data.split("\r\n");
        this.dtAkun = data[0].split("<br>");
        var line;
		var tmp = new portalui_arrayMap();
		for (var i in this.dtAkun){
			if (i == 0) continue;
			line = this.dtAkun[i].split(";"); 
			tmp.set(line[0],line[1]);
		}
		this.dtAkun = tmp;
		this.dtPP = data[1].split("<br>");
		var tmp = new portalui_arrayMap();
		for (var i in this.dtPP){
			if (i == 0) continue;
			line = this.dtPP[i].split(";"); 
			tmp.set(line[0],line[1]);
		}
		this.dtPP = tmp;
		this.dtCust = data[2].split("<br>");
		var tmp = new portalui_arrayMap();
		for (var i in this.dtCust){
			if (i == 0) continue;
			line = this.dtCust[i].split(";"); 
			tmp.set(line[0],line[1]);
		}
		this.dtCust = tmp;
		this.dtVendor = data[3].split("<br>");
		var tmp = new portalui_arrayMap();
		for (var i in this.dtVendor){
			if (i == 0) continue;
			line = this.dtVendor[i].split(";"); 
			tmp.set(line[0],line[1]);
		}
		this.dtVendor = tmp;
		this.dtKary = data[4].split("<br>");
		var tmp = new portalui_arrayMap();
		for (var i in this.dtKary){
			if (i == 0) continue;
			line = this.dtKary[i].split(";"); 
			tmp.set(line[0],line[1]);
		}
		this.dtKary = tmp;
    }
    
});
