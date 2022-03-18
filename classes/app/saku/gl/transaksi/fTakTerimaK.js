window.app_saku_gl_transaksi_fTakTerimaK = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fTakTerimaK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_transaksi_fTakTerimaK";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal TAK Terima: Input", 0);	
				
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setTag("3");
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		
	    uses("portalui_label;portalui_datePicker");
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(32);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tanggal");
		this.lblTgl1.setUnderLine(true);
		
		uses("portalui_saiCBBL");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(34);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
		
        this.cb_jenis = new portalui_saiCB(this);
		this.cb_jenis.setLeft(20);
		this.cb_jenis.setTop(56);
		this.cb_jenis.setWidth(185);
		this.cb_jenis.setCaption("Jenis");
		this.cb_jenis.setText("");
		this.cb_jenis.setTag("1");
		this.cb_jenis.addItem(0,"TAK");
		
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(78);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No Bukti TAK");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(78);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_perlama = new portalui_saiCB(this,{bound:[680,56,185,20],caption:"Periode Kirim"});		
		this.cb_bukti = new portalui_saiCBBL(this,{bound:[680,78,220,20],caption:"No TAK Kirim",multiSelection:false});		
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(78);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);

		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(100);
		this.ed_dok.setWidth(310);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(122);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("2");
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(144);
		this.cb_curr.setWidth(185);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setText("IDR");
		this.cb_curr.setTag("2");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(205);
		this.ed_kurs.setTop(144);
		this.ed_kurs.setWidth(45);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("1"); 
		this.ed_kurs.setTag("2");
		
		this.ed_lokasi = new portalui_saiCBBL(this, {
			bound: [680, 121, 220, 20],
			caption: "Lokasi Asal",
			multiSelection: false,
			sql:["select kode_lokasi, nama from lokasi ",["kode_lokasi","nama"],false, ["Kode Lokasi","Nama"],"where","Daftar Lokasi",true]
		});			
			
		this.ed_akun = new portalui_saiCBBL(this, {
			bound: [680, 144, 220, 20],
			caption: "Akun TAK",
			multiSelection: false,
			sql:["select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false, ["Kode Akun","Nama"],"and","Daftar Akun",true]
		});			
			
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(166);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("2");
		this.cb_pembuat.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
	
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(188);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setTag("2");
		this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
		
		this.ed_debet = new portalui_saiLabelEdit(this);
		this.ed_debet.setLeft(680);
		this.ed_debet.setTop(166);
		this.ed_debet.setWidth(220);
		this.ed_debet.setTipeText(ttNilai);
		this.ed_debet.setAlignment(alRight);
		this.ed_debet.setCaption("Total Debet");
		this.ed_debet.setText("0"); 
		this.ed_debet.setReadOnly(true);

		this.ed_kredit = new portalui_saiLabelEdit(this);
		this.ed_kredit.setLeft(680);
		this.ed_kredit.setTop(188);
		this.ed_kredit.setWidth(220);
		this.ed_kredit.setTipeText(ttNilai);
		this.ed_kredit.setAlignment(alRight);
		this.ed_kredit.setCaption("Total Kredit");
		this.ed_kredit.setText("0"); 
		this.ed_kredit.setReadOnly(true);
	
		this.bGar = new portalui_imageButton(this);
		this.bGar.setLeft(900);
		this.bGar.setTop(188);
		this.bGar.setHint("Hitung Anggaran");
		this.bGar.setImage("icon/"+system.getThemes()+"/tabCont2.png");
		this.bGar.setWidth(22);
		this.bGar.setHeight(22);
	
		this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(210);
	    this.p1.setWidth(900);
	    this.p1.setHeight(260);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Jurnal Transaksi');
    	         
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(210);
	    this.sg1.setColCount(9);
		this.sg1.setColTitle(new Array("Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"));
		this.sg1.setColWidth(new Array(8,7,6,5,4,3,2,1,0),new Array(180,80,100,80,120,50,230,120,80));	
		this.sg1.setReadOnly(false);

		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "D");
			val.set(2, "C");	
		this.sg1.columns.get(3).setPicklist(val);
		//this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(8).setReadOnly(true);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(234);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		uses("portalui_checkBox");	
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
	
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{		   
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();		    
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("util_addOnLib");
			this.addOnLib = new util_addOnLib();
			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(new Array("Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"));
			this.jurnal.p.setCaption('Data Anggaran');
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.ed_dok.onExit.set(this,"doExit");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.cb_perlama.onChange.set(this,"doEditChange");						
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			//this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onCellEnter.set(this, "doCellEnter");
			this.sg1.onChange.set(this, "doSgChange");

			var val = this.dbLib.loadQuery("select distinct periode from ju_m where kode_lokasi2='"+this.app._lokasi+"' and jenis ='TAK' and not (periode < '"+this.app._periode.substr(0,4)+"01') order by periode");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
				for (var j in val)
				{
					if (j>0)
					{                   
						var isi = val[j].split(";");             
						this.cb_perlama.addItem(j,val[j].split(";"));
					}
				}
				
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			this.cb_jenis.setText("TAK");
			
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
			this.cb_pembuat.setText(this.app._userLog,this.app._namaUser);			
			this.cb_perlama.setText(this.app._periode);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_gl_transaksi_fTakTerimaK.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fTakTerimaK.implement({
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);
		this.loadMasterData();
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");					
	},
	simpan: function(){	
		var line,data = this.dbLib.runSQL("select no_dokumen from ju_m "+
										  "where no_dokumen = '"+this.ed_dok.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_ju <> '"+this.cb_bukti.getText()+"'");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined){
				system.alert(this,"No Dokumen sudah terpakai.","");
				return false;
			} 
		}
		this.hitungGar();
		/*
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
			{
				system.alert(this,"Nilai transaksi melebihi saldo anggaran.","Periksa kembali data anggaran.");
				return false;
			}
		}
		*/
		//this.bGen.click();
		this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ju_m','no_ju',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
		if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2"))){
			try{
				var tgl = new Date();
				this.nb = this.ed_nb.getText();;
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add(" update ju_m set no_link='"+this.ed_nb.getText()+"' where no_ju ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.ed_lokasi.getText()+"'");
				
				sql.add("insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis, "+
						"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_lokasi2) values  "+
						"('"+this.nb+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','JU','"+this.cb_jenis.getText()+"','"+
						     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_debet.getText())+",'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',now(),'"+this.app._userLog+"','F','-','"+this.cb_bukti.getText()+"','"+this.ed_akun.getText()+"','"+this.ed_lokasi.getText()+"' )");
				var totD= 0, totC = 0;
				for (var i=0; i < this.sg1.rows.getLength(); i++){			
					if (this.sg1.rowValid(i)){
						if (this.sg1.getCell(3,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg1.cells(4,i));
						else if (this.sg1.getCell(3,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg1.cells(4,i));
						sql.add("insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg1.getCell(0,i)+
							"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i).toUpperCase()+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
							"'-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+this.jenis+"',"+
							"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");
					}
				}
				var nilaiTak = totD - totC;															
				var dc = nilaiTak < 0 ? "D" :"C";
				sql.add("insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.ed_akun.getText()+
							"','"+this.ed_desc.getText()+"','"+dc+"',"+Math.abs(nilaiTak)+",'"+this.app._kodePP+"','-',"+
							"'-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+this.jenis+"',"+
							"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())"); 				
				//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
				if (this.gridJurnal.getLength() > 0){					
					var baris1 = true;
					var line = undefined;
					var DC = "";
					var scr1 = "";
					for (var i in this.gridJurnal.objList){
						scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";	
						line = this.gridJurnal.get(i);
						if (parseFloat(line.get("nilai")) < 0) {DC = "C";}
						else {DC = "D";}
						scr1 += "('"+this.nb+"','JU','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
						        "','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
						sql.add(scr1);
					}						
				}
				this.dbLib.execArraySQL(sql);	
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(); this.sg1.appendRow();
					this.cb_jenis.setText("TAK");
					this.cb_pembuat.setText(this.app._userLog,this.app._namaUser);
				}
				break;
			case "simpan" :
				this.sg1.validasi();
				if  (Math.abs(nilaiToFloat(this.ed_debet.getText()) - nilaiToFloat(this.ed_kredit.getText())) != Math.abs(parseFloat(this.nilaiTAK))){
					system.alert(this,"Nilai TAK tidak sama dgn TAK Kirim.","");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if (parseFloat(this.periodeLama) > parseFloat(this.ed_period.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) {
					if (this.app._pernext == "1")
						system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;

			case "simpancek" : this.simpan();
				break;
			}
		if (event == "checkAkun"){
		    this.setActiveControl(this.sg1);  
            this.sg1.setRowIndex(this.sg1.row,0);
        }            
	},
	genClick: function(sender){
		try{
			if ((this.ed_period.getText() != "") && (this.jenis != undefined)){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ju_m','no_ju',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}
			else{
				system.alert(this,"Periode dan jenis harus valid.","");
			}
		}catch (e){
			systemAPI.alert(e);
		}
	},
	showClick: function(sender){
		if (this.cb_bukti.getText() != ""){
			if (this.cb_bukti != undefined) {
				try {
					this.standarLib.clearByTag(this, new Array("2"),undefined);				
					var sql = new server_util_arrayList();
					sql.add("select  a.tanggal,a.no_dokumen, a.keterangan, a.kode_curr, a.kurs, a.nik_buat, a.nik_setuju, b.nama as nama_pembuat, c.nama as nama_setuju,a.periode,a.posted, a.ref1, a.kode_lokasi2, a.kode_lokasi "+
												 " from ju_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi = b.kode_lokasi "+
												 "             inner join karyawan c on a.nik_setuju = c.nik and a.kode_lokasi = c.kode_lokasi "+
												 " where a.no_ju='"+this.cb_bukti.getText()+"'  and a.kode_lokasi2='"+this.app._lokasi+"'");
					sql.add("select  a.no_urut, a.kode_akun, b.nama as nama_akun, a.keterangan, case when a.dc = 'D' then 'C' else 'D' end dc,a.nilai,a.kode_pp, ifnull(c.nama,'-') as nama_pp, a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
								 " from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "             left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								 "             left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
								 " where a.no_ju = '"+this.cb_bukti.getText()+"' ");
					
					this.loadMaster = false;
					this.dbLib.getMultiDataProviderA(sql); //and a.posted = 'F'														
				} catch(e){
					system.alert(this,e,"");
				}
			}
		}
	},
	doExit: function(sender){
		if (this.ed_dok.getText() != "") {
			var line,data = this.dbLib.runSQL("select no_dokumen from ju_m "+
											  "where no_dokumen = '"+this.ed_dok.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap){
				line = data.get(0);
				if (line != undefined){
					system.alert(this,"No Dokumen sudah terpakai.","");
					return false;
				} 
			}
		}
	},
	doEditChange: function(sender){
		if (sender == this.ed_period){
			this.ed_nb.setText("");
			//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "") && (this.jenis != undefined)) 
			//	this.bGen.click();
		}
		if (sender == this.cb_perlama){
		      this.cb_bukti.setSQL("select no_ju, no_dokumen from ju_m a where modul = 'JU' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi2='"+this.app._lokasi+"'",["no_ju","no_dokumen"],true,["No JU","Dokumen"],"and","Daftar Transaksi",true);
        }
		if (sender == this.cb_jenis){
			this.ed_nb.setText("");
			this.jenis = 'TAK';
		}
		
		if (sender == this.cb_curr){
			if (this.cb_curr.getText() == "IDR"){	
				this.ed_kurs.setText("1");
				this.ed_kurs.setReadOnly(true);
			}
			else{
				this.ed_kurs.setReadOnly(false);
			}
		}	
	},
	FindBtnClick: function(sender, event){
		try{
			if (sender == this.cb_bukti) {
			    if (this.cb_perlama.getText() != "") {
				  this.standarLib.showListData(this, "Daftar Bukti JU Periode "+this.ed_period.getText(),this.cb_bukti,undefined, 
													 "select no_ju, no_dokumen from ju_m where modul = 'JU' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'", //posted = 'F' and 
													 "select count(no_ju)      from ju_m where modul = 'JU' and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'", //posted = 'F' and 
													 new Array("no_ju","no_dokumen"),"and", new Array("No Bukti","No Dokumen"),false);
				}
				this.standarLib.clearByTag(this, new Array("2"),undefined);				
				this.sg1.clear(); this.sg1.appendRow();
			}
			if (sender == this.cb_curr) {
			    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr, nama  from curr",
											  "select count(kode_curr) from curr",
											  new Array("kode_curr","nama"),"where", new Array("Kode Curr","Deskripsi"),false);
			}
			if (sender == this.cb_pembuat) {   
			    this.standarLib.showListData(this, "Daftar Petugas",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
			}
			if (sender == this.cb_setuju) {   
			    this.standarLib.showListData(this, "Daftar yang Menyetujui",this.cb_setuju,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFindBtnClick: function(sender, col, row) {
		try{
			switch(col){
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
					this.standarLib.showListDataForSG(this, "Daftar Anggaran",this.sg1, this.sg1.row, this.sg1.col,
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_drk","a.nama"),"and",new Array("Kode Anggaran","Deskripsi"),true);
					break;
			}
		}catch(e){
			systemAPI.alert("[app_saku_gl_transaksi_fTakTerimaK] : doFindBtnClick : " + e);
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i)){
					if (this.sg1.getCell(4,i) != ""){
						if (this.sg1.getCell(3, i).toUpperCase() == "D")					
							totD += nilaiToFloat(this.sg1.getCell(4,i));			
						if (this.sg1.getCell(3, i).toUpperCase() == "C")					
							totC += nilaiToFloat(this.sg1.getCell(4,i));			
					}
				}
			}
			this.ed_debet.setText(floatToNilai(totD));
			this.ed_kredit.setText(floatToNilai(totC));
		}catch(e){
			alert("[app_saku_gl_transaksi_fTakTerimaK]::doNilaiChange:"+e);
		}
	},
	doCellExit: function(sender, col, row) {
		try{
			switch(col){
				case 3 : 
				case 4 : 
							this.sg1.validasi();
					break;
			}
		}catch(e){
			systemAPI.alert("doFindBtnClick : " + e);
		}	
	},
	doSgChange: function(sender, col, row){
	   try{
           sender.onChange.set(undefined,undefined);
    	   if (col == 0) {
                var akun = this.dataAkun.get(sender.cells(0,row));
                if(akun)
                    sender.cells(1,row,akun);
                else {                                    
                    if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
                    sender.cells(0,row,"");
                    sender.cells(1,row,"");
                }
            }
    	   if (col == 5) {
                var pp = this.dataPP.get(sender.cells(5,row));
                if (pp) sender.cells(6,row,pp);
                else sender.cells(6,row,"-");
            }
    	   if (col == 7) {
    	       var drk = this.dataDRK.get(sender.cells(7,row));
    	       if (drk) sender.cells(8,row,drk);
    	       else sender.cells(8,row,"-");
            }
            if (col == 3){
                if (this.sg1.getCell(3, row).toUpperCase() != "C" && this.sg1.getCell(3, row).toUpperCase() != "D")
                    this.sg1.cells(3,row,"D");            
                else this.sg1.cells(3,row,this.sg1.getCell(3, row).toUpperCase());            
            }
            sender.onChange.set(this,"doSgChange");
        }catch(e){
            sender.onChange.set(this,"doSgChange");
        }
    },	
	hitungGar: function(){
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0;
					
	    for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			if (!this.sg1.rowValid(i)) continue;
			kdAkun = this.sg1.getCell(0,i);
			kdPP = this.sg1.getCell(5,i);
			kdDRK = this.sg1.getCell(7,i);
			
			if (this.sg1.getCell(3,i) == "D") {nreal = nilaiToFloat(this.sg1.getCell(4,i));}
			else {nreal = nilaiToFloat(this.sg1.getCell(4,i)) * -1;}
			
			nemu = false;
			ix = 0;
						
			for (var j in dtJurnal.objList)
			{		
			  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && (kdDRK == dtJurnal.get(j).get("kode_drk")))
			  {
				nemu = true;
				row = dtJurnal.get(j);
				ix = j;
				break;
			  }
			}
			
			if (!nemu){
				row = new portalui_arrayMap();
				row.set("kode_akun",kdAkun);
				row.set("kode_pp",kdPP);
				row.set("kode_drk",kdDRK);
				row.set("nilai",nreal);
				row.set("saldo_gar",0);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			}
		}
		
		if (dtJurnal.getLength() > 0){
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",150);
			desc1.set("kode_pp",150);
			desc1.set("kode_drk",150);
			desc1.set("nilai",150);
			desc1.set("saldo_gar",150);
			
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("kode_pp","S");
			desc2.set("kode_drk","S");	
			desc2.set("nilai","N");
			desc2.set("saldo_gar","N");
			
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
		}
		this.gridJurnal = dtJurnal;
		//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
		var line = undefined;
		var sls = 0;
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			var baris,data = this.dbLib.runSQL("select fn_cekagg3('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"','"+this.cb_bukti.getText()+"') as gar ");
			if (data instanceof portalui_arrayMap)
			{
				baris = data.get(0);
				if (baris != undefined)
				{
					baris = baris.get("gar");
					data = baris.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					line.set("saldo_gar",sls);
					this.gridJurnal.set(i,line);		
				} 
			} else alert(data);
		}	
	},
	garClick: function(sender){
		try
		{
			if (this.ed_debet.getText() != "0")
			{
				this.jurnal.sg.clear();
				this.hitungGar();
				if (this.gridJurnal != undefined){				
					this.jurnal.setData(this.gridJurnal);
					this.jurnal.showModal();
				}
			}
		} catch	(e){
			alert(e);
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
						this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.nb +")");
						if (this.cb1.isSelected()) {
							this.nama_report="server_report_gl_rptBuktiJurnal3";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.nb+"' ";			
							this.viewer.prepare();
						    this.viewer.setVisible(true);
						    this.app._mainForm.pButton.setVisible(false);
						    this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter1,1,this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
						    this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							//this.report.preview(this.nama_report,this.filter,1,1,this.showFilter, this.app._namalokasi,this.filter2);
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter,this.app._namalokasi,this.filter2));
							this.page = 1;
							this.allBtn = false;
							this.p1.hide();
						} else this.clearLayar();//this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
	    			break;
	    			case "getMultiDataProvider":										
	    			    eval("result = "+result+";");
						if (this.loadMaster){
							if (typeof result != "string"){
								this.dataAkun = new portalui_arrayMap();
								this.dataPP = new portalui_arrayMap();
								this.dataDRK = new portalui_arrayMap();
								if (result.result[0]){	    			        
									var line;
									for (var i in result.result[0].rs.rows){
										line = result.result[0].rs.rows[i];
										this.dataAkun.set(line.kode_akun, line.nama);
									}
								}
								if (result.result[1]){	    			        
									var line;
									for (var i in result.result[1].rs.rows){
										line = result.result[1].rs.rows[i];
										this.dataPP.set(line.kode_pp, line.nama);
									}
								}
								if (result.result[2]){
									var line;
									for (var i in result.result[2].rs.rows){
										line = result.result[2].rs.rows[i];
										this.dataDRK.set(line.kode_drk, line.nama);
									}
								}
							}else throw result;
						}else{				
							data = result;
							if (typeof data != "string"){
								if (data.result[0].rs.rows[0] != undefined){									
									line = data.result[0].rs.rows[0];
									this.posted = line.posted;
									this.periodeLama = line.periode;
									this.dp_tgl1.onSelect.set(this, undefined);
									this.dp_tgl1.setText(line.tanggal);
									this.ed_period.setText(line.periode);
									this.ed_dok.setText(line.no_dokumen);
									this.ed_desc.setText(line.keterangan);
									this.cb_curr.setText(line.kode_curr);
									this.ed_kurs.setText(line.kurs);
									this.cb_pembuat.setText(line.nik_buat);
									this.cb_setuju.setText(line.nik_setuju);
									this.cb_pembuat.setRightLabelCaption(line.nama_pembuat);
									this.cb_setuju.setRightLabelCaption(line.nama_setuju);
									this.ed_akun.setText(line.ref1);
									this.dp_tgl1.onSelect.set(this, "doSelect");
									this.ed_lokasi.setText(line.kode_lokasi);
									this.sg1.clear(); 			
									var lineM = line;
									var dataD = data.result[1];
									for (var i in dataD.rs.rows){
										line = dataD.rs.rows[i];
										if (line.kode_akun != lineM.ref1) this.sg1.appendData([line.kode_akun,line.nama_akun,line.keterangan,line.dc.toUpperCase(),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
										else this.nilaiTAK = parseFloat(line.nilai);
									} 
									this.sg1.validasi();
								} 
							}else throw result;
						}
	    			break;
	      		break;
	    		}    		
			}catch(e)
			{
				alert(e);
			}
	    }
		if (methodName === "preview"){
			this.viewer.preview(result);
		}
	},
	doCloseReportClick: function(sender)
	{
		switch(sender.getName())
		{
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.p1.show();
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();//this.app._mainForm.bClear.click();    
			break;
		}
	},
	loadMasterData: function(){
	    var sql = new server_util_arrayList();
	    sql.add("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' and block = '0' ");
	    sql.add("select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'");
	    sql.add("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and a.kode_lokasi='"+this.app._lokasi+"' ");
		this.loadMaster = true;
	    this.dbLib.getMultiDataProviderA(sql);
    },
	clearLayar : function(){
		this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
		this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
		this.sg1.clear(1);
		this.cb_jenis.setText("TAK");
		this.cb_pembuat.setText(this.app._userLog,this.app._namaUser);
		this.ed_dok.setText("");
	}
});
