window.app_kopeg_proyek_fPtgaju= function(owner){
	if (owner){
		window.app_kopeg_proyek_fPtgaju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_proyek_fPtgaju";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar Kontrak: Input", 0);	
		
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
		this.lblTgl1.setUnderLine(true);
		this.lblTgl1.setCaption("Tanggal");
		
		uses("portalui_datePicker");	
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
		this.ed_nb.setCaption("No Pertanggungan");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(76);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	        
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(98);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(150);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(120);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.cb_nopj = new portalui_saiCBBL(this);
		this.cb_nopj.setLeft(20);
		this.cb_nopj.setTop(142);
		this.cb_nopj.setWidth(240);
		this.cb_nopj.setLabelWidth(100);
		this.cb_nopj.setReadOnly(true);
		this.cb_nopj.setRightLabelVisible(false);
		this.cb_nopj.setCaption("No Panjar");
		this.cb_nopj.setText(""); 
		this.cb_nopj.setRightLabelCaption("");
		this.cb_nopj.setSQL("select no_pj, keterangan  from panjar_m where catatan <>'-' and kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='PJR_P'",["no_pj","nama"],true);		
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(258);
		this.bShow.setTop(142);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
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
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setText("1"); 
		this.ed_kurs.setReadOnly(true);
		
		this.ed_ket = new portalui_saiLabelEdit(this);
		this.ed_ket.setLeft(20);
		this.ed_ket.setTop(164);
		this.ed_ket.setWidth(500);
		this.ed_ket.setCaption("Keterangan");
		this.ed_ket.setText(""); 
		this.ed_ket.setReadOnly(true);
		this.ed_ket.setTag("1");
		
		this.cb_pemohon = new portalui_saiCBBL(this);
		this.cb_pemohon.setLeft(20);
		this.cb_pemohon.setTop(186);
		this.cb_pemohon.setWidth(185);
		this.cb_pemohon.setLabelWidth(100);
		this.cb_pemohon.setReadOnly(true);
		this.cb_pemohon.setCaption("Pemegang Panjar");
		this.cb_pemohon.setText(""); 
		this.cb_pemohon.setRightLabelCaption("");
		this.cb_pemohon.setTag("1");
				
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(208);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(false);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption("");
		this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
		
		this.ed_nilaipj = new portalui_saiLabelEdit(this);
		this.ed_nilaipj.setLeft(680);
		this.ed_nilaipj.setTop(186);
		this.ed_nilaipj.setWidth(220);
		this.ed_nilaipj.setTipeText(ttNilai);
		this.ed_nilaipj.setAlignment(alRight);
		this.ed_nilaipj.setCaption("Nilai Panjar");
		this.ed_nilaipj.setText("0"); 
		this.ed_nilaipj.setReadOnly(true);
		this.ed_nilaipj.setTag("1");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(680);
		this.ed_nilai.setTop(208);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Pertanggungan");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		this.ed_nilai.setTag("1");
		
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
		
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	//this.sg1.setHeight(188);
		this.sg1.setHeight(210);
	    this.sg1.setColCount(9);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"]);
		this.sg1.setColWidth([8,7,6,5,4,3,2,1,0],[180,80,100,80,120,30,250,120,80]);
		this.sg1.setReadOnly(false);
		this.sg1.setTag("1");
		this.sg1.columns.get(0).setReadOnly(true);	
		this.sg1.columns.get(1).setReadOnly(true);	
		var val = new portalui_arrayMap();
		    val.set(1, "D");
		this.sg1.columns.get(3).setPicklist(val);
		this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setReadOnly(true);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(7).setReadOnly(true);
		this.sg1.columns.get(8).setReadOnly(true);
		
		/*
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(212);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		*/	
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
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
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear();  this.sg1.appendRow();
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			
			data = this.dbLib.runSQL("select flag from spro where kode_spro = 'PTGLBH' and kode_lokasi='"+this.app._lokasi+"'");
			var row = undefined;
			row = data.get(0);
			this.vLebih = row.get("flag");			
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pemohon.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");	
			this.cb_nopj.onBtnClick.set(this, "FindBtnClick");	
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_kopeg_proyek_fPtgaju.extend(window.portalui_childForm);
window.app_kopeg_proyek_fPtgaju.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear){
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan) {
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit){
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus){
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_kopeg_proyek_fPtgaju.prototype.simpan = function(){
	this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ptg_m','no_ptg',this.app._lokasi+"-PTG"+this.ed_period.getText().substr(2,4)+".",'0000'));
	if (this.standarLib.checkEmptyByTag(this, new Array("0"))){
		try{				
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			var nkas = nilaiToFloat(this.ed_nilaipj.getText()) - nilaiToFloat(this.ed_nilai.getText());
			if (nkas != 0) var vposted = "X"; else var vposted = "F";
			sql.add("update panjar_m set progress = '3' where no_pj='"+this.cb_nopj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,"+
					"keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,"+
					"modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_nopj.getText()+"','-','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+
					this.ed_desc.getText()+"','"+this.nopro+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.akunpj+"','-','"+this.cb_pemohon.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+
					"','PTG_P',"+parseNilai(this.ed_nilai.getText())+","+nkas+",'-','0','"+vposted+"','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
					
			var scr1 = "insert into ptg_j (no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
					   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
			var baris1 = true;
			for (var i=0; i < this.sg1.rows.getLength(); i++){
				if (this.sg1.rowValid(i)) {
					if (!baris1) { scr1 += ",";}	
					scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg1.getCell(0,i)+
							"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
							"'"+this.app._lokasi+"','PTG_P','BBN','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+
							parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now())";
					baris1 = false;
				}
			}	
			i++;
			scr1 += ",";	
			scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.akunpj+
					"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilaipj.getText())+",'"+this.cb_pp.getText()+"','-',"+
					"'"+this.app._lokasi+"','PTG_P','PJR','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+
					parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now())";
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
				scr1 += "('"+this.ed_nb.getText()+"','PTG','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
				        "','"+this.periodepj+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
				baris1 = false;
			}	
			sql.add(scr1);
			sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
					        "    select no_bukti,'PTG',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
							"    from angg_r where no_bukti = '"+this.cb_nopj.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul ='PJR' ");			
			
			this.dbLib.execArraySQL(sql);	
		}
		catch(e){
			system.alert(this, e,"");
		}
	}
};
window.app_kopeg_proyek_fPtgaju.prototype.doModalResult = function(event, modalResult){
	if (modalResult != mrOk) return false;
	switch (event){
		case "clear" :
			if (modalResult == mrOk){
				this.standarLib.clearByTag(this, new Array("0"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				var pp = this.app._pp.split(";");
				this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			}
			break;
		case "simpan" :
			this.sg1.validasi();
			if  (nilaiToFloat(this.ed_nilai.getText()) < 0){
				system.alert(this,"Nilai pengajuan pertanggungan tidak valid.","Nilai tidak boleh kurang dari nol.");
				return false;
			}
			if (this.vLebih != "1"){
				if  (nilaiToFloat(this.ed_nilai.getText()) > nilaiToFloat(this.ed_nilaipj.getText())){
					system.alert(this,"Nilai pengajuan pertanggungan tidak valid.","Nilai pertanggungan tidak boleh melebihi nilai panjar.");
					return false;
				}
			}	
			this.hitungGar();
			for (var i in this.gridJurnal.objList){
				line = this.gridJurnal.get(i);
				if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0)){
					system.alert(this,"Nilai pengajuan pertanggungan melebihi saldo anggaran.","Periksa kembali data anggaran.");
					return false;
				}
			}			
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText())){
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())){
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
};
window.app_kopeg_proyek_fPtgaju.prototype.genClick = function(sender){
	try{
		if (this.ed_period.getText() != ""){
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ptg_m','no_ptg',this.app._lokasi+"-PTG"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_dok.setFocus();
		}
		else system.alert(this,"Periode harus valid.","");
	}
	catch (e) {
		alert(e);
	}
};
window.app_kopeg_proyek_fPtgaju.prototype.doSelect = function(sender, year, month, day){
	if (month < 10) month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_kopeg_proyek_fPtgaju.prototype.doEditChange = function(sender){
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
window.app_kopeg_proyek_fPtgaju.prototype.showClick = function(sender){
	try {
		if (this.cb_nopj.getText() != ""){
			var line,data = this.dbLib.runSQL(" select concat(a.catatan,'-',a.keterangan) as keterangan,a.nik_pengaju,b.nama as nama_pengaju,a.kode_curr,a.kurs,a.nilai,a.periode,a.akun_pj,a.catatan as no_proyek "+
											  " from panjar_m a inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi "+
											  " where a.no_pj = '"+this.cb_nopj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap){
				line = data.get(0);
				if (line != undefined){
					this.periodepj = line.get("periode");
					this.akunpj = line.get("akun_pj");
					this.nopro = line.get("no_proyek");
					this.cb_pemohon.setText(line.get("nik_pengaju"));
					this.cb_pemohon.setRightLabelCaption(line.get("nama_pengaju"));
					this.cb_curr.setText(line.get("kode_curr"));
					this.ed_kurs.setText(floatToNilai(line.get("kurs")));
					this.ed_nilaipj.setText(floatToNilai(line.get("nilai")));
					this.ed_ket.setText(line.get("keterangan"));
				} 
			}
			this.sg1.clear(); 
			var strSql = " select  a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai,a.kode_pp, ifnull(c.nama,'-') as nama_pp, a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
						 " from panjar_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "             left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "             left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						 " where a.no_pj = '"+this.cb_nopj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			
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
		}
	} catch(e){
		system.alert(this,e,"");
	}
};
window.app_kopeg_proyek_fPtgaju.prototype.FindBtnClick = function(sender, event){
	try{
		if (sender == this.cb_nopj) {
		    this.standarLib.showListData(this, "Daftar Bukti Panjar",this.cb_nopj,undefined, 
										  "select no_pj, keterangan  from panjar_m where  catatan <>'-' and kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='PJR_P' and periode<='"+this.ed_period.getText()+"' and kode_pp='"+this.cb_pp.getText()+"'",
										  "select count(no_pj)       from panjar_m where  catatan <>'-' and kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='PJR_P' and periode<='"+this.ed_period.getText()+"' and kode_pp='"+this.cb_pp.getText()+"'",
										  ["no_pj","keterangan"],"and",["No Panjar","Keterangan"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
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
		if (sender == this.cb_setuju) {   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);		
		}
	}catch(e){
		alert(e);
	}
};
window.app_kopeg_proyek_fPtgaju.prototype.doCellExit = function(sender, col, row) {
	try{
		switch(col){
			case 4 : 
						this.sg1.validasi();
				break;
		}
	}catch(e){
		alert("doFindBtnClick : " + e);
	}	
};
window.app_kopeg_proyek_fPtgaju.prototype.doNilaiChange = function(){
	try{
		var totD = totC = nKB = 0; 
		for (var i = 0; i < this.sg1.rows.getLength();i++){
			if (this.sg1.rowValid(i)) {
				if (this.sg1.getCell(4,i) != ""){
					if (this.sg1.getCell(3, i).toUpperCase() == "D")					
						totD += nilaiToFloat(this.sg1.getCell(4,i));			
					if (this.sg1.getCell(3, i).toUpperCase() == "C")					
						totC += nilaiToFloat(this.sg1.getCell(4,i));			
				}
			}
		}
		nKB = totD - totC;
		
		this.kredit = totC;
		this.ed_nilai.setText(floatToNilai(nKB));
	}catch(e)
	{
		alert("[app_kopeg_proyek_fPtgaju]::doNilaiChange:"+e);
	}
};
window.app_kopeg_proyek_fPtgaju.prototype.hitungGar = function(){
	var row,dtJurnal = new portalui_arrayMap();
	var nemu = false;
	var nreal,ix,dtJrnl = 0;
				
    for (var i=0; i < this.sg1.rows.getLength(); i++){
		if (!this.sg1.rowValid(i)) continue;
		kdAkun = this.sg1.getCell(0,i);
		kdPP = this.sg1.getCell(5,i);
		kdDRK = this.sg1.getCell(7,i);
		
		if (this.sg1.getCell(3,i) == "D") {nreal = nilaiToFloat(this.sg1.getCell(4,i));}
		else {nreal = nilaiToFloat(this.sg1.getCell(4,i)) * -1;}
		
		nemu = false;
		ix = 0;
					
		for (var j in dtJurnal.objList){		
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
	for (var i in this.gridJurnal.objList){
		line = this.gridJurnal.get(i);
		var baris,data = this.dbLib.runSQL("select fn_cekagg3('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.periodepj+"','"+this.cb_nopj.getText()+"') as gar ");
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
};
window.app_kopeg_proyek_fPtgaju.prototype.garClick = function(sender){
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
window.app_kopeg_proyek_fPtgaju.prototype.doRequestReady = function(sender, methodName, result){
	if (sender == this.dbLib){
		try{   
			switch(methodName){
    			case "execArraySQL" :
    				step="info";
				if (result.toLowerCase().search("error") == -1)					{
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
    		}
		}
		catch(e){
			alert("step : "+step+"; error = "+e);
		}
    }
};