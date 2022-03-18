window.app_saku_kb_transaksi_proses_if_fReimb= function(owner)
{
	if (owner)
	{
		window.app_saku_kb_transaksi_proses_if_fReimb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_proses_if_fReimb";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Reimburse: Input", 0);
		
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
		this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' ",["kode_pp","nama"],true);
		
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
		
		this.cb_noif = new portalui_saiCBBL(this);
		this.cb_noif.setLeft(20);
		this.cb_noif.setTop(142);
		this.cb_noif.setWidth(240);
		this.cb_noif.setLabelWidth(100);
		this.cb_noif.setReadOnly(true);
		this.cb_noif.setRightLabelVisible(false);
		this.cb_noif.setCaption("No ImprestFund");
		this.cb_noif.setText(""); 
		this.cb_noif.setRightLabelCaption("");
		
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
		this.cb_pemohon.setReadOnly(false);
		this.cb_pemohon.setRightLabelVisible(true);
		this.cb_pemohon.setCaption("Dibuat Oleh");
		this.cb_pemohon.setText(""); 
		this.cb_pemohon.setRightLabelCaption("");
		this.cb_pemohon.setTag("1");
		this.cb_pemohon.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
		
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
		this.cb_setuju.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
		
		this.cb_status = new portalui_saiCB(this);
		this.cb_status.setLeft(680);
		this.cb_status.setTop(142);
		this.cb_status.setWidth(223);
		this.cb_status.setCaption("Status");
		this.cb_status.addItem(0,"REIMBURSE");
		this.cb_status.addItem(1,"CLOSING");
		this.cb_status.setReadOnly(true);
		
		this.ed_nilaiif = new portalui_saiLabelEdit(this);
		this.ed_nilaiif.setLeft(680);
		this.ed_nilaiif.setTop(164);
		this.ed_nilaiif.setWidth(220);
		this.ed_nilaiif.setTipeText(ttNilai);
		this.ed_nilaiif.setAlignment(alRight);
		this.ed_nilaiif.setCaption("Nilai I/F");
		this.ed_nilaiif.setText("0"); 
		this.ed_nilaiif.setReadOnly(true);
		this.ed_nilaiif.setTag("1");
		
		this.ed_saldoif = new portalui_saiLabelEdit(this);
		this.ed_saldoif.setLeft(680);
		this.ed_saldoif.setTop(186);
		this.ed_saldoif.setWidth(220);
		this.ed_saldoif.setTipeText(ttNilai);
		this.ed_saldoif.setAlignment(alRight);
		this.ed_saldoif.setCaption("Saldo I/F Tercatat");
		this.ed_saldoif.setText("0"); 
		this.ed_saldoif.setReadOnly(true);
		this.ed_saldoif.setTag("1");
		
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
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(188);
	    this.sg1.setColCount(9);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"]);
		this.sg1.setColWidth([8,7,6,5,4,3,2,1,0],[180,80,100,80,120,30,250,120,80]);
		this.sg1.setReadOnly(false);
		this.sg1.setTag("9");
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
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');
			
			this.standarLib.clearByTag(this,["0","1","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear();  this.sg1.appendRow();
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
			this.cb_status.setText("REIMBURSE");
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");	
			this.cb_noif.onBtnClick.set(this, "FindBtnClick");	
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onCellEnter.set(this, "doCellEnter");
			this.sg1.onChange.set(this, "doSgChange");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'BYMHDIF' and kode_lokasi = '"+this.app._lokasi+"' "); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "BYMHDIF") this.akunHutIF = line.flag;
				}
			}
			
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.simpan = function(){
	if  (nilaiToFloat(this.ed_nilai.getText()) < 0){
		system.alert(this,"Nilai pengajuan pertanggungan tidak valid.","Nilai tidak boleh kurang dari nol.");
		return false;
	}
	if  ((nilaiToFloat(this.ed_nilai.getText()) == 0) && (this.cb_status.getText() != "CLOSING")){
		system.alert(this,"Nilai pengajuan pertanggungan tidak valid.","Nilai tidak boleh nol untuk status REIMBURSE.");
		return false;
	}
	if  (nilaiToFloat(this.ed_nilai.getText()) > nilaiToFloat(this.ed_nilaiif.getText())){
		system.alert(this,"Nilai pengajuan pertanggungan tidak valid.","Nilai pertanggungan tidak boleh melebihi nilai i/f.");
		return false;
	}
	this.hitungGar();
	for (var i in this.gridJurnal.objList)
	{
		line = this.gridJurnal.get(i);
		if ((line.get("kode_drk") == "-") && (line.get("kode_akun").substr(0,1) == "5"))
		{
			system.alert(this,"Akun Beban harus diisi DRKnya.","Periksa kembali data akun.");
			return false;
		}
		if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
		{
			system.alert(this,"Nilai pengajuan pertanggungan melebihi saldo anggaran.","Periksa kembali data anggaran.");
			return false;
		}
	}
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{				
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			var nkas = nilaiToFloat(this.ed_nilaiif.getText()) - nilaiToFloat(this.ed_nilai.getText());
			if (this.cb_status.getText() == "CLOSING") {
				sql.add("update if_m set progress = '9' where no_if='"+this.cb_noif.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				var nilaiKB = nilaiToFloat(this.ed_nilaiif.getText()) - nilaiToFloat(this.ed_nilai.getText()); 
			} else var nilaiKB = nilaiToFloat(this.ed_nilai.getText()); 
				
			sql.add("insert into ifptg_m (no_ifptg,no_if,no_kas,no_dokumen,tanggal,keterangan,catatan,kode_curr,kurs,akun_ap,akun_kas,nik_buat,nik_setuju,kode_lokasi,"+
					"modul,status,nilai,nilai_kas,progress,posted,periode,no_del,no_link,nik_user,tgl_input)  values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_noif.getText()+"','-','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+
					this.ed_desc.getText()+"','-','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.akunHutIF+"','-','"+this.cb_pemohon.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"',"+
					"'IFPTG_P','"+this.cb_status.getText()+"',"+parseNilai(this.ed_nilai.getText())+","+nilaiKB+",'0','F','"+this.ed_period.getText()+"','-','-','"+this.app._userLog+"',now())");
					
			if (nilaiToFloat(this.ed_nilai.getText()) != 0){
				var scr1,baris1 = true;
				for (var i=0; i < this.sg1.rows.getLength(); i++){
					if (this.sg1.rowValid(i)){
						scr1 = "insert into ifptg_j (no_ifptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
						scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+(i+1)+",'"+this.sg1.getCell(0,i)+
								"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
								"'"+this.app._lokasi+"','IFPTG_P','BBN','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
								",'"+this.app._userLog+"',now())";
						sql.add(scr1);
					}
				}
				scr1 = "insert into ifptg_j (no_ifptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
					   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
				scr1 += "('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',99,'"+this.akunHutIF+
					"','"+this.ed_desc.getText()+"','C',"+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pp.getText()+"','-',"+
					"'"+this.app._lokasi+"','IFPTG_P','HUTIF','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
					",'"+this.app._userLog+"',now())";
				sql.add(scr1);
			} 
			//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
			if (this.gridJurnal.getLength() > 0)
			{
				var scr1,baris1 = true;
				var line = undefined;
				var DC = "";
				for (var i in this.gridJurnal.objList)
				{
					scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
					line = this.gridJurnal.get(i);
					if (parseFloat(line.get("nilai")) < 0) {DC = "C";}
					else {DC = "D";}
					scr1 += "('"+this.ed_nb.getText()+"','IF.PTG','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
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
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				var pp = this.app._pp.split(";");
				this.cb_pp.setText(pp[0]); this.cb_pp.setRightLabelCaption(pp[1]);
				this.cb_status.setText("REIMBURSE");
			}
			break;
		
		case "simpan" :
			/*
			if (this.cb_status.getText() != "CLOSING" && nilaiToFloat(this.ed_saldoif.getText()) != nilaiToFloat(this.ed_nilaiif.getText())) {
				system.alert(this,"Ditemukan reimburse yang belum final.","Selesaikan seluruh reimburse untuk Closing I/F");
				return false;
			}
			*/
			this.sg1.validasi();
			if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.tgl_if)))
			{
				system.alert(this,"Tanggal Reimburse kurang dari tanggal Pencairan IF ["+this.tgl_if+"].","");
				return false;
			}
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
			{
				if (this.app._pernext == "1")
				  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else
				{
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
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ifptg_m','no_ifptg',this.app._lokasi+"-IFP"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_dok.setFocus();
		}
		else
		{
			system.alert(this,"Periode harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
	this.loadMasterData();
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.cb_pp.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
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
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.showClick = function(sender)
{
	try 
	{
		if (this.cb_noif.getText() != "")
		{
			var line,data = this.dbLib.runSQL(" select a.keterangan,a.nik_pengaju,b.nama as nama_pengaju,a.kode_curr,a.kurs,a.nilai,a.akun_if,date_format(a.tanggal,'%d/%m/%Y') as tgl_if "+
											  " from if_m a inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi "+
											  " where a.no_if = '"+this.cb_noif.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.tgl_if = line.get("tgl_if");
					this.akunif = line.get("akun_if");
					this.cb_pemohon.setText(line.get("nik_pengaju"));
					this.cb_pemohon.setRightLabelCaption(line.get("nama_pengaju"));
					this.cb_curr.setText(line.get("kode_curr"));
					this.ed_kurs.setText(floatToNilai(line.get("kurs")));
					this.ed_nilaiif.setText(floatToNilai(line.get("nilai")));
					this.ed_saldoif.setText(floatToNilai(line.get("nilai")));
					this.ed_ket.setText(line.get("keterangan"));
				} 
			}
			var line,data = this.dbLib.runSQL(" select  ifnull(sum(nilai),0) as totptg "+
											  " from ifptg_m "+
											  " where progress in ('0','1') and no_if = '"+this.cb_noif.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined){
					this.ed_saldoif.setText(floatToNilai(nilaiToFloat(this.ed_nilaiif.getText()) - parseFloat(line.get("totptg"))));
				} 
			} 
		}
	} catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_noif) 
		{
		    this.standarLib.showListData(this, "Daftar Imprest Fund",this.cb_noif,undefined, 
										  "select no_if, keterangan  from if_m where kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='IFD_P' and periode<='"+this.ed_period.getText()+"' and kode_pp='"+this.cb_pp.getText()+"'",
										  "select count(no_if)       from if_m where kode_lokasi = '"+this.app._lokasi+"' and progress='2' and modul='IFD_P' and periode<='"+this.ed_period.getText()+"' and kode_pp='"+this.cb_pp.getText()+"'",
										  ["no_if","keterangan"],"and",["No I/F","Keterangan"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama from curr  ",
										  "select count(kode_curr) from curr ",
										  ["kode_curr","nama"],"where",["Kode Curr","Nama"],false);
		}
		if (sender == this.cb_pp) 
		{   
		    if (this.app._userStatus == "U"){var sts = " and kode_pp = '"+this.app._kodePP+"' ";} 
			else {var sts = "";}
			this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
										  "select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting'"+sts,
										  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe = 'posting'"+sts,
										  ["kode_pp","nama"],"and",["Kode PP","Nama"],false);		
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);		
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doCellExit = function(sender, col, row) 
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
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doCellEnter = function(sender, col, row) 
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
						if (this.sg1.getCell(5,row) == "") {
						this.sg1.setCell(5,row,this.cb_pp.getText());
						this.sg1.setCell(6,row,this.cb_pp.rightLabelCaption);
						}
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}	
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doFindBtnClick = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col,
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
				break;
			case 5 : 
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and kode_pp ='"+this.cb_pp.getText()+"'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and kode_pp ='"+this.cb_pp.getText()+"'",
												  ["kode_pp","nama"],"and",["Kode PP","Deskripsi"],false);
				break;
			case 7 : 
				this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg1, this.sg1.row, this.sg1.col,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.kode_drk","a.nama"],"and",["Kode RKM","Deskripsi"],true);
				break;
		}
	}catch(e)
	{
		alert("doFindBtnClick : " + e);
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doSgChange=function(sender, col, row){
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
		sender.onChange.set(this,"doSgChange");
	}catch(e){
		sender.onChange.set(this,"doSgChange");
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doNilaiChange = function()
{
	try
	{
		var totD = totC = nKB = 0; 
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(4,i) != "")
			{
				if (this.sg1.getCell(3, i).toUpperCase() == "D")					
					totD += nilaiToFloat(this.sg1.getCell(4,i));			
				if (this.sg1.getCell(3, i).toUpperCase() == "C")					
					totC += nilaiToFloat(this.sg1.getCell(4,i));			
			}
		}
		nKB = totD - totC;
		
		this.kredit = totC;
		this.ed_nilai.setText(floatToNilai(nKB));
	}catch(e)
	{
		alert("[GUI_kb_transaksi_nonpro_kb_fKbout]::doNilaiChange:"+e);
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.hitungGar = function()
{
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
		var baris,data = this.dbLib.runSQL("select fn_cekagg2('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"') as gar ");
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
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.garClick = function(sender)
{
	try
	{
		if (this.ed_nilai.getText() != "0")
		{
			this.jurnal.sg.clear();
			this.hitungGar();
			if (this.gridJurnal != undefined){				
				this.jurnal.setData(this.gridJurnal);
				this.jurnal.showModal();
			}
		}
	} catch	(e)
	{
		alert(e);
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.loadMasterData =  function(){
	var sql = new server_util_arrayList();
	sql.add("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' and block = '0' ");
	sql.add("select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'");
	sql.add("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and a.kode_lokasi='"+this.app._lokasi+"' ");
	this.dbLib.getMultiDataProviderA(sql);
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
					if (this.cb1.isSelected()) {
						this.nama_report="server_report_kopeg_rptSpbIF";
						this.filter1 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ifptg='"+this.ed_nb.getText()+"' ";
						this.viewer.prepare();
						this.viewer.setVisible(true);
						this.app._mainForm.pButton.setVisible(false);
						this.app._mainForm.reportNavigator.setVisible(true);
						this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter1,1,this.filter2));
						this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
						this.app._mainForm.reportNavigator.rearrange();
						this.showFilter = undefined;
						this.status=true;
						this.report.preview(this.nama_report,this.filter1,1,1,this.showFilter, this.app._lokasi,this.filter2);
						this.page = 1;
						this.allBtn = false;
					} else this.clearLayar(); //this.app._mainForm.bClear.click();              
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
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
	if (methodName === "preview"){
		if (this.status){
			this.status=false;
			this.viewer.preview(result);
			this.report.preview("server_report_kopeg_rptSpbIF2",this.filter1,1,1, this.showFilter,this.app._lokasi,this.filter2);
		}else this.viewer.preview(result,true);
	}
};
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.doCloseReportClick = function(sender){
	switch(sender.getName()){
		case "PreviewBtn" :        
			window.open(this.report.previewWithHeader(this.nama_report,this.filter1,1,1, this.showFilter,this.app._namalokasi,this.filter2));
		break;
		case "PrintBtn" :
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter1,1,1, this.showFilter,this.app._namalokasi,this.filter2));
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
window.app_saku_kb_transaksi_proses_if_fReimb.prototype.clearLayar = function(sender){
	this.standarLib.clearByTag(this, new Array("1","3"),this.e_nb);		
	this.sg2.clear(1); 
};