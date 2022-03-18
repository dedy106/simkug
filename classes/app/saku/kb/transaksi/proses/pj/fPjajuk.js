window.app_saku_kb_transaksi_proses_pj_fPjajuk= function(owner){
	if (owner){
		window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_pj_fPjajuk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Form Pengajuan Panjar: Koreksi",0);
		uses("portalui_checkBox;portalui_datePicker;server_report_report;portalui_reportViewer;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBBL");
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
	
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(32);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tanggal");
		this.lblTgl1.setUnderLine(true);
		
			
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(34);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
		this.cb_pp = new portalui_saiCBBL(this);
		this.cb_pp.setLeft(20);
		this.cb_pp.setTop(54);
		this.cb_pp.setWidth(185);
		this.cb_pp.setLabelWidth(100);
		this.cb_pp.setReadOnly(false);
		this.cb_pp.setRightLabelVisible(true);
		this.cb_pp.setCaption("PP");
		this.cb_pp.setText(""); 
		this.cb_pp.setRightLabelCaption("");
		this.cb_pp.setSQL("select kode_pp, nama from pp where tipe = 'posting' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],true);
		
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(76);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Panjar");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(76);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_perlama = new portalui_saiCB(this);
		this.cb_perlama.setLeft(680);
		this.cb_perlama.setTop(54);
		this.cb_perlama.setWidth(185);
		this.cb_perlama.setCaption("Periode Bukti");
		this.cb_perlama.setText("");
		this.cb_perlama.setMustCheck(true);
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(76);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Panjar Lama");
		this.cb_bukti.setRightLabelCaption("");
		this.cb_bukti.setSQL("select no_pj, keterangan from panjar_m where progress in ('0','X') and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",["no_pj","keterangan"],true);
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(76);
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(98);
		this.ed_dok.setWidth(300);
		this.ed_dok.setLength(150);
		this.ed_dok.setTag("2");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(120);
		this.ed_desc.setWidth(500);
		this.ed_desc.setLength(150);
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setTag("2");
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		
		this.lblTgl2 = new portalui_label(this);
		this.lblTgl2.setTop(142);
		this.lblTgl2.setLeft(20);
		this.lblTgl2.setWidth(101);		
		this.lblTgl2.setHeight(20);		
		this.lblTgl2.setCaption("Tgl. Jth Tempo");
		this.lblTgl2.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(144);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(82);
		
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(323);
		this.cb_curr.setTop(142);
		this.cb_curr.setWidth(150);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setText("IDR");
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(470);
		this.ed_kurs.setTop(142);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setReadOnly(true);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("1"); 
		
		this.cb_pemohon = new portalui_saiCBBL(this);
		this.cb_pemohon.setLeft(20);
		this.cb_pemohon.setTop(164);
		this.cb_pemohon.setWidth(185);
		this.cb_pemohon.setLabelWidth(100);
		this.cb_pemohon.setReadOnly(false);
		this.cb_pemohon.setTag("2");
		this.cb_pemohon.setRightLabelVisible(true);
		this.cb_pemohon.setCaption("Diajukan Oleh");
		this.cb_pemohon.setText(""); 
		this.cb_pemohon.setRightLabelCaption("");
		this.cb_pemohon.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(186);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(false);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(208);
		this.cb_akun.setWidth(185);
		this.cb_akun.setLabelWidth(100);
		this.cb_akun.setReadOnly(false);
		this.cb_akun.setTag("2");
		this.cb_akun.setRightLabelVisible(true);
		this.cb_akun.setCaption("Akun Panjar");
		this.cb_akun.setText(""); 
		this.cb_akun.setRightLabelCaption("");
		this.cb_akun.setSQL("select kode_akun, nama from masakun where block = '0' and kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],true);
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(680);
		this.ed_nilai.setTop(208);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("2");
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Pengajuan");
		this.ed_nilai.setText("0"); 
		
		this.bGar = new portalui_imageButton(this);
		this.bGar.setLeft(900);
		this.bGar.setTop(208);
		this.bGar.setHint("Hitung Anggaran");
		this.bGar.setImage("icon/"+system.getThemes()+"/tabCont2.png");
		this.bGar.setWidth(22);
		this.bGar.setHeight(22);
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(230);
	    this.p1.setWidth(900);
	    this.p1.setHeight(238);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Jurnal Peruntukan');
    	         
		
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(188);
	    this.sg1.setColCount(9);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"]);
		this.sg1.setColWidth([8,7,6,5,4,3,2,1,0],[180,80,100,80,120,30,250,120,80]);
		this.sg1.setReadOnly(false);
		this.sg1.setTag("2");
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "D");
		this.sg1.columns.get(3).setPicklist(val);
		this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(8).setReadOnly(true);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(212);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[800,5,100,25],caption:"Preview",selected:true});
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');
				
			this.standarLib.clearByTag(this,["0","2"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear();  this.sg1.appendRow();
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pemohon.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");	
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");	
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onCellEnter.set(this, "doCellEnter");
			this.sg1.onChange.set(this, "doSgChange");
			this.bShow.onClick.set(this, "showClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			
			var val = this.dbLib.loadQuery("select periode from panjar_m where catatan = '-' and kode_lokasi='"+this.app._lokasi+"' and progress in ('0','X') and no_del='-' order by periode desc");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
			for (var j in val){
				if (j>0){                   
					var isi = val[j].split(";");             
					this.cb_perlama.addItem(j,val[j].split(";"));
				}
			}				
			this.cb_perlama.setText(this.app._periode);
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
		}catch(e){
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear){
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan){
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit){
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus){
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.ubah = function(){	
	this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'panjar_m','no_pj',this.app._lokasi+"-PJR"+this.ed_period.getText().substr(2,4)+".",'0000'));
	if (this.standarLib.checkEmptyByTag(this, new Array("0"))){
		try{				
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode)){
				sql.add(" update panjar_m set no_del = '"+this.ed_nb.getText()+"' where no_pj ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
						"        select no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
						"        from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul ='PJR'");			
				this.nb = this.ed_nb.getText();
			}
			else{
				sql.add(" delete from panjar_m where no_pj ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from panjar_j where no_pj ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
				sql.add(" delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'PJR'");			
				this.nb = this.cb_bukti.getText();
			}
			sql.add("insert into panjar_m (no_pj,no_kas,no_dokumen,tanggal,due_date,"+
					"keterangan,catatan,kode_curr,kurs,akun_pj,nik_pengaju,nik_setuju,kode_lokasi,kode_pp,"+
					"modul,nilai,nilai_pot,kode_drk,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.nb+"','-','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+"','"+this.ed_desc.getText()+"','-','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.cb_akun.getText()+"','"+this.cb_pemohon.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+
					"','PJR_P',"+parseNilai(this.ed_nilai.getText())+",0,'-','0','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");		
					
			var scr1 = "insert into panjar_j (no_pj,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
			var baris1 = true;
			for (var i=0; i < this.sg1.rows.getLength(); i++){
				if (this.sg1.rowValid(i)) {
					if (!baris1) { scr1 += ",";}	
					scr1 += "('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg1.getCell(0,i)+
							"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
							"'"+this.app._lokasi+"','PJR','BBN','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+
							parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now())";
					baris1 = false;
				}
			}	
			sql.add(scr1);
			//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
			var scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
			var baris1 = true;
			var line = undefined;
			var DC = "";
			for (var i in this.gridJurnal.objList){
				if (!baris1) { scr1 += ",";}	
				line = this.gridJurnal.get(i);
				if (parseFloat(line.get("nilai")) < 0) {DC = "C";}
				else {DC = "D";}
				scr1 += "('"+this.nb+"','PJR','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
				        "','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
				baris1 = false;
			}	
			sql.add(scr1);
			this.dbLib.execArraySQL(sql);	
		}
		catch(e) {
			system.alert(this, e,"");
		}
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doModalResult = function(event, modalResult){
	if (modalResult != mrOk) return false;
	switch (event){
		case "clear" :
			if (modalResult == mrOk){
				this.standarLib.clearByTag(this, new Array("0","2"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				var pp = this.app._pp.split(";");
				this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			}
			break;
		case "ubah" :
			if  (nilaiToFloat(this.ed_nilai.getText()) <= 0){
				system.alert(this,"Nilai pengajuan panjar tidak valid.","Nilai tidak boleh nol atau kurang.");
				return false;
			}	
			this.hitungGar();
			for (var i in this.gridJurnal.objList){
				line = this.gridJurnal.get(i);
				if ((line.get("kode_drk") == "-") && (line.get("kode_akun").substr(0,1) == "5"))
					{
						system.alert(this,"Akun Beban harus diisi DRKnya.","Periksa kembali data akun.");
						return false;
					}
				if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0)){
					system.alert(this,"Nilai pengajuan panjar melebihi saldo anggaran.","Periksa kembali data anggaran.");
					return false;
				}
			}
			if ( (new Date()).strToDate(this.dp_tgl1.getDate())  > (new Date()).strToDate(this.dp_tgl2.getDate())){
				system.alert(this,"Tanggal tidak valid."," Tanggal pengajuan melebihi tgl maksimal pertanggungan.");
				return false;
			}
			if (parseFloat(this.periodeLama) > parseFloat(this.ed_period.getText())){
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
				return false;
			}
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText())){
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) {
				if (this.app._pernext == "1")
				  system.confirm(this, "ubahcek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
			}
			else this.ubah();
			break;
		case "ubahcek" : this.ubah();
			break;
		case "hapus" :
			try{	
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode)){
					sql.add(" update panjar_m set no_del = 'DEL' where no_pj ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
					        "        select no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
							"        from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul ='PJR' ");			
				}
				else{
					sql.add(" delete from panjar_m where no_pj ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from panjar_j where no_pj ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
					sql.add(" delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'PJR'");			
				}		
				this.dbLib.execArraySQL(sql);	
			} catch(e){
				alert(e)
			}
			break;
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.genClick = function(sender){
	try{
		if (this.ed_period.getText() != ""){
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'panjar_m','no_pj',this.app._lokasi+"-PJR"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_dok.setFocus();
		}
		else{
			system.alert(this,"Periode harus valid.","");
		}
	}
	catch (e){
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doSelect = function(sender, year, month, day){
	if (month < 10) month = "0"+month;
	this.ed_period.setText(year.toString()+month);
	this.loadMasterData();
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doEditChange = function(sender){
	if (sender == this.ed_period){
		this.ed_nb.setText("");
		//if ((this.cb_pp.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
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
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.showClick = function(sender){
	if (this.cb_bukti.getText() != ""){
		if (this.cb_bukti != undefined) {
			try {
				this.standarLib.clearByTag(this, new Array("2"),undefined);				
				var line,data = this.dbLib.runSQL(" select a.no_dokumen, a.keterangan, a.kode_curr, a.kurs, a.nik_pengaju, a.nik_setuju, b.nama as nama_aju, c.nama as nama_setuju, "+
												  "        a.due_date,a.periode,a.akun_pj,d.nama as nama_akun,a.tanggal "+
												  " from panjar_m a inner join karyawan b on a.nik_pengaju = b.nik and a.kode_lokasi = b.kode_lokasi "+
												  "                 inner join karyawan c on a.nik_setuju = c.nik and a.kode_lokasi = c.kode_lokasi "+
												  "                 inner join masakun d on a.akun_pj = d.kode_akun and a.kode_lokasi = d.kode_lokasi "+
												  " where a.no_pj='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
				if (data instanceof portalui_arrayMap){
					if (data.get(0) != undefined){									
						line = data.get(0);
						this.periodeLama = line.get("periode");
						this.dp_tgl1.setText(line.get("tanggal"));
						this.ed_period.setText(line.get("periode"));
						this.ed_dok.setText(line.get("no_dokumen"));
						this.ed_desc.setText(line.get("keterangan"));
						this.cb_curr.setText(line.get("kode_curr"));
						this.ed_kurs.setText(line.get("kurs"));
						this.cb_pemohon.setText(line.get("nik_pengaju"));
						this.cb_pemohon.setRightLabelCaption(line.get("nama_aju"));
						this.cb_setuju.setText(line.get("nik_setuju"));
						this.cb_setuju.setRightLabelCaption(line.get("nama_setuju"));
						this.cb_akun.setText(line.get("akun_pj"));
						this.cb_akun.setRightLabelCaption(line.get("nama_akun"));
						this.dp_tgl2.setText(line.get("due_date"));
					} 
				}
				this.sg1.clear(); 
				var strSql = " select  a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai,a.kode_pp, ifnull(c.nama,'-') as nama_pp, a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
							 " from panjar_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "             left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							 "             left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							 " where a.no_pj = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				
				var data = this.dbLib.runSQL(strSql);
				if (data instanceof portalui_arrayMap){
					if (data.get(0) != undefined){									
						for (var i in data.objList){
							line = data.get(i);
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8),
								new Array(line.get("kode_akun"),line.get("nama_akun"),line.get("keterangan"),line.get("dc"),line.get("nilai"),
										  line.get("kode_pp"),line.get("nama_pp"),line.get("kode_drk"),line.get("nama_drk")));					
						}
						this.sg1.validasi();
					} 
				}
			} catch(e){
				system.alert(this,e,"");
			}
		}
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.FindBtnClick = function(sender, event){
	try{
		if (sender == this.cb_bukti) {
		    if (this.ed_period != "") {
				if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} 
				else {var sts = "";}
				this.standarLib.showListData(this, "Daftar Pengajuan Panjar",this.cb_bukti,undefined, 
				  								 "select no_pj, keterangan from panjar_m where catatan = '-' and progress in ('0','X') and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' " +sts,
												 "select count(no_pj)      from panjar_m where catatan = '-' and progress in ('0','X') and periode='"+this.cb_perlama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"' " +sts,
												 ["no_pj","keterangan"],"and",["No Panjar","Keterangan"],false);
			}
			this.standarLib.clearByTag(this,["2"],undefined);				
			this.sg1.clear(); this.sg1.appendRow();
		}
		if (sender == this.cb_curr) {
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr  ",
										  "select count(kode_curr) from curr ",
										  ["kode_curr","nama"],"where",["Kode Curr","Nama"],false);
		}
		if (sender == this.cb_pp) {   
		    if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} 
			else {var sts = "";}
			this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting'"+sts,
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting'"+sts,
										  ["kode_pp","nama"],"and",["Kode PP","Nama"],false);		
		}
		if (sender == this.cb_pemohon) {   
		    this.standarLib.showListData(this, "Karyawan Pengaju Panjar",this.cb_pemohon,undefined, 
										  "select nik, nama  from karyawan  where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan  where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);		
		}
		if (sender == this.cb_setuju) {   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);		
		}
		if (sender == this.cb_akun) {
			this.standarLib.showListData(this, "Daftar Akun Panjar",this.cb_akun,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='002' ",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='002' ",
										  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
		}
	}catch(e){
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doCellExit = function(sender, col, row) {
	try{
		switch(col){
			case 3 : 
			case 4 : 
						this.sg1.validasi();
				break;
		}
	}catch(e){
		alert("doFindBtnClick : " + e);
	}	
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doCellEnter = function(sender, col, row) {
	try{
		switch(col){
			case 2 : 
						if (this.sg1.getCell(2,row) == ""){
				            if (row == 0) this.sg1.setCell(2,row,this.ed_desc.getText());
							else this.sg1.setCell(2,row,this.sg1.getCell(2,(row-1)) );
				        }
				break;
			case 3 : 
						if (this.sg1.getCell(3,row) == "")
						this.sg1.setCell(3,row,"D");
				break;
			case 5 : 
						if (this.sg1.getCell(5,row) == "") {
						this.sg1.setCell(5,row,this.cb_pp.getText());
						this.sg1.setCell(6,row,this.cb_pp.rightLabelCaption);
						}
				break;
		}
	}catch(e){
		alert("doFindBtnClick : " + e);
	}	
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doFindBtnClick = function(sender, col, row) {
	try{
		switch(col){
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
				break;
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and kode_pp = '"+this.cb_pp.getText()+"'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and kode_pp = '"+this.cb_pp.getText()+"'",
												  ["kode_pp","nama"],"and",["Kode PP","Deskripsi"],false);
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg1, this.sg1.row, this.sg1.col,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.kode_drk","a.nama"],"and",["Kode RKM","Deskripsi"],true);
				break;
		}
	}catch(e){
		alert("doFindBtnClick : " + e);
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doNilaiChange = function(){
	try{
		var totD = totC = nKB = 0; 
		for (var i = 0; i < this.sg1.rows.getLength();i++){
			if (this.sg1.rowValid(i) && this.sg1.getCell(4,i) != ""){
				if (this.sg1.getCell(3, i).toUpperCase() == "D")					
					totD += nilaiToFloat(this.sg1.getCell(4,i));			
				if (this.sg1.getCell(3, i).toUpperCase() == "C")					
					totC += nilaiToFloat(this.sg1.getCell(4,i));			
			}
		}
		nKB = totD - totC;
		this.kredit = totC;
		this.ed_nilai.setText(floatToNilai(nKB));
	}catch(e){
		alert("[GUI_kb_transaksi_nonpro_kb_fKbout]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doSgChange= function(sender, col, row){
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
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.hitungGar = function(){
	var row,dtJurnal = new portalui_arrayMap();
	var nemu = false;
	var nreal,ix,dtJrnl = 0;
    for (var i=0; i < this.sg1.rows.getLength(); i++){
		if (this.sg1.rowValid(i)) {
			kdAkun = this.sg1.getCell(0,i);
			kdPP = this.sg1.getCell(5,i);
			kdDRK = this.sg1.getCell(7,i);
			
			if (this.sg1.getCell(3,i) == "D") {nreal = nilaiToFloat(this.sg1.getCell(4,i));}
			else {nreal = nilaiToFloat(this.sg1.getCell(4,i)) * -1;}
			nemu = false;
			ix = 0;
			for (var j in dtJurnal.objList){		
			  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && (kdDRK == dtJurnal.get(j).get("kode_drk"))){
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
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	var line = undefined;
	var sls = 0;
	for (var i in this.gridJurnal.objList){
		line = this.gridJurnal.get(i);
		var baris,data = this.dbLib.runSQL("select fn_cekagg3('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"','"+this.cb_bukti.getText()+"') as gar ");
		if (data instanceof portalui_arrayMap){
			baris = data.get(0);
			if (baris != undefined){
				baris = baris.get("gar");
				data = baris.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				line.set("saldo_gar",sls);
				this.gridJurnal.set(i,line);		
			} 
		} else alert(data);
	}	
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.garClick = function(sender){
	try{
		if (this.ed_nilai.getText() != "0"){
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
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.loadMasterData= function(){
	var sql = new server_util_arrayList();
	sql.add("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' and block = '0'");
	sql.add("select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'");
	sql.add("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and a.kode_lokasi='"+this.app._lokasi+"' ");
	this.dbLib.getMultiDataProviderA(sql);
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doRequestReady = function(sender, methodName, result){
	if (sender == this.dbLib){
		try{   
			switch(methodName){
    			case "execArraySQL" :
    				step="info";
				if (result.toLowerCase().search("error") == -1){
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.nb +")");
					if (this.cb1.isSelected()) {
						this.nama_report="server_report_kb_rptPjAju";
						this.filter1 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pj='"+this.nb+"' ";
						this.filter2 = "";			
						this.viewer.prepare();
					    this.viewer.setVisible(true);
					    this.app._mainForm.pButton.setVisible(false);
					    this.app._mainForm.reportNavigator.setVisible(true);
						this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter1,1,this.filter2));
						this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					    this.app._mainForm.reportNavigator.rearrange();
						this.showFilter = undefined;
						this.report.preview(this.nama_report,this.filter1,1,1,this.showFilter, this.app._namalokasi,this.filter2);
						this.status=true;
						this.page = 1;
						this.allBtn = false;								
					} else this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
				case "getMultiDataProvider":
					eval("result = "+result+";");
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
				break;
    		}
		}
		catch(e){
			alert("step : "+step+"; error = "+e);
		}
    }
	if (methodName === "preview"){
		if (this.status){
			this.status=false;
			this.viewer.preview(result);
			this.report.preview("server_report_kb_rptPjAju2",this.filter1,1,1, this.showFilter,this.app._lokasi,this.filter2);
		}else this.viewer.preview(result,true);
	}
};
window.app_saku_kb_transaksi_proses_pj_fPjajuk.prototype.doCloseReportClick= function(sender)
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
			this.viewer.setVisible(false);
			this.app._mainForm.pButton.setVisible(true);
			this.app._mainForm.reportNavigator.setVisible(false);  
			this.clearLayar();//this.app._mainForm.bClear.click();    
		break;
	}
};
