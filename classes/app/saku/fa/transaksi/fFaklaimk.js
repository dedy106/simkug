window.app_saku_fa_transaksi_fFaklaimk = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFaklaimk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFaklaimk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Klaim Asuransi: Koreksi", 0);	
		
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
	
	    uses("portalui_label");
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(32);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tanggal");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(34);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Klaim");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		uses("portalui_saiCBBL");
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(54);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No Klaim Lama");
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(54);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(50);
		this.ed_desc.setTag("2");
		
		uses("portalui_saiCBBL");
		this.cb_polis = new portalui_saiCBBL(this);
		this.cb_polis.setLeft(20);
		this.cb_polis.setTop(120);
		this.cb_polis.setWidth(240);
		this.cb_polis.setCaption("No Polis");
		this.cb_polis.setText(""); 
		this.cb_polis.setReadOnly(true);
		this.cb_polis.setLabelWidth(100);
		this.cb_polis.setRightLabelVisible(false);
		this.cb_polis.setRightLabelCaption("");	
		this.cb_polis.setTag("2");
		
		this.ed_npolis = new portalui_saiLabelEdit(this);
		this.ed_npolis.setLeft(20);
		this.ed_npolis.setTop(142);
		this.ed_npolis.setWidth(220);
		this.ed_npolis.setTipeText(ttNilai);
		this.ed_npolis.setAlignment(alRight);
		this.ed_npolis.setLabelWidth(100);
		this.ed_npolis.setCaption("Nilai Polis");
		this.ed_npolis.setText("0"); 
		this.ed_npolis.setReadOnly(true);
		this.ed_npolis.setTag("2");
	
		this.cb_vendor = new portalui_saiCBBL(this);
		this.cb_vendor.setLeft(20);
		this.cb_vendor.setTop(164);
		this.cb_vendor.setWidth(185);
		this.cb_vendor.setCaption("Vendor");
		this.cb_vendor.setText(""); 
		this.cb_vendor.setReadOnly(true);
		this.cb_vendor.setLabelWidth(100);
		this.cb_vendor.setRightLabelVisible(true);
		this.cb_vendor.setRightLabelCaption("");	
		this.cb_vendor.setTag("2");
				
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(186);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setText(""); 
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");	
		this.cb_buat.setTag("2");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(208);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");	
		this.cb_setuju.setTag("2");
		
		this.cb_status = new portalui_saiCBBL(this);
		this.cb_status.setLeft(20);
		this.cb_status.setTop(230);
		this.cb_status.setWidth(185);
		this.cb_status.setCaption("Status Klaim");
		this.cb_status.setText(""); 
		this.cb_status.setReadOnly(true);
		this.cb_status.setLabelWidth(100);
		this.cb_status.setRightLabelVisible(true);
		this.cb_status.setRightLabelCaption("");	
		this.cb_status.setTag("2");
		
		this.ed_nasset = new portalui_saiLabelEdit(this);
		this.ed_nasset.setLeft(700);
		this.ed_nasset.setTop(208);
		this.ed_nasset.setWidth(220);
		this.ed_nasset.setTipeText(ttNilai);
		this.ed_nasset.setAlignment(alRight);
		this.ed_nasset.setLabelWidth(100);
		this.ed_nasset.setCaption("Tot. Nilai Asset");
		this.ed_nasset.setText("0"); 
		this.ed_nasset.setReadOnly(true);
		this.ed_nasset.setTag("2");
		
		this.ed_nklaim = new portalui_saiLabelEdit(this);
		this.ed_nklaim.setLeft(700);
		this.ed_nklaim.setTop(230);
		this.ed_nklaim.setWidth(220);
		this.ed_nklaim.setTipeText(ttNilai);
		this.ed_nklaim.setAlignment(alRight);
		this.ed_nklaim.setLabelWidth(100);
		this.ed_nklaim.setCaption("Tot. Klaim");
		this.ed_nklaim.setText("0"); 
		this.ed_nklaim.setReadOnly(true);
		this.ed_nklaim.setTag("2");
		
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(252);
	    this.p1.setWidth(900);
	    this.p1.setHeight(218);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Asset');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(168);
	    this.sg1.setColCount(14);
	    this.sg1.setColTitle(new Array("Status","Catatan","Nilai Klaim","No Asset","Barcode","Deskripsi","Merk","Tipe","No Seri","Lokasi",
		                               "Departemen","Png Jawab","Nilai","Akun Asset"));
		this.sg1.setColWidth(new Array(13,12,11,10,9,8,7,6,5,4,3,2,1,0),new Array(80,100,120,120,120,100,100,100,150,100,110,100,220,80));	
		this.sg1.setReadOnly(false);
		
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "KLAIM");
			val.set(2, "INPROG");
		this.sg1.columns.get(0).setPicklist(val);		   		
		this.sg1.columns.get(2).setColumnFormat(window.cfNilai);		
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(6).setReadOnly(true);	
		this.sg1.columns.get(7).setReadOnly(true);	
		this.sg1.columns.get(8).setReadOnly(true);	
		this.sg1.columns.get(9).setReadOnly(true);	
		this.sg1.columns.get(10).setReadOnly(true);	
		this.sg1.columns.get(11).setReadOnly(true);	
		this.sg1.columns.get(12).setReadOnly(true);	
		this.sg1.columns.get(12).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(13).setReadOnly(true);	
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(193);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		setTipeButton(tbUbahHapus);
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
			
			this.bGen.onClick.set(this, "genClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_status.onBtnClick.set(this, "FindBtnClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFaklaimk.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFaklaimk.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_fa_transaksi_fFaklaimk.prototype.ubah = function()
{	
	if  (nilaiToFloat(this.ed_nklaim.getText()) <= 0)
	{
		system.alert(this,"Nilai klaim tidak valid.","Nilai tidak boleh nol atau kurang");
		return false;
	}
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add("update faklaim_m set no_del = 'DEL' where no_klaim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("update faklaim_d set status = 'DEL' where no_klaim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}
			else
			{
				sql.add(" delete from faklaim_m where no_klaim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from faklaim_d where no_klaim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}		
			
			sql.add(" insert into faklaim_m (no_klaim,no_polis,no_dokumen,kode_lokasi,kode_vendor,tanggal,keterangan,"+
			        " nilai,kode_curr,kurs,kode_pp,kode_status,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.cb_polis.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.cb_vendor.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"',"+
					parseNilai(this.ed_nklaim.getText())+",'IDR',1,'-','"+this.cb_status.getText()+"',"+
					"'"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");
					
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				if (this.sg1.getCell(0,i) == "KLAIM")
				{
					sql.add("insert into faklaim_d (no_klaim,no_fa,kode_lokasi,nilai,catatan,status) values "+	
					    	"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(3,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg1.getCell(2,i))+",'"+this.sg1.getCell(1,i)+"','KLAIM')");
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
window.app_saku_fa_transaksi_fFaklaimk.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
			}
			break;
		
		case "ubah" :	
			var cekData = "F";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{
				if (this.sg1.getCell(0,i) == "KLAIM") 
				cekData = "T";
			}
			if (cekData == "F")
			{
				system.alert(this,"Tidak ada transaksi yang diklaim.","Pilih KLAIM untuk di kolom status.");
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
				  system.confirm(this, "ubahcek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
				else
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
			}
			else this.ubah();
			break;
			
		case "ubahcek" : this.ubah();			
			break;
			
		case "hapus" :	
			try
			{	
				uses("server_util_arrayList");
				sql = new server_util_arrayList();	
				
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
				{
					sql.add("update faklaim_m set no_del = 'DEL' where no_klaim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("update faklaim_d set status = 'DEL' where no_klaim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				else
				{
					sql.add(" delete from faklaim_m where no_klaim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from faklaim_d where no_klaim ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;										
	}
};
window.app_saku_fa_transaksi_fFaklaimk.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'faklaim_m','no_klaim',this.app._lokasi+"-KLM"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}
			else
			{
				system.alert(this,"Periode harus valid.","");			
			}
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFaklaimk.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFaklaimk.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
};											  
window.app_saku_fa_transaksi_fFaklaimk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{   
			this.standarLib.showListData(this, "Daftar Klaim",this.cb_bukti,undefined, 
										  "select no_klaim, keterangan from faklaim_m where periode<='"+this.ed_period.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_del='-' ",
										  "select count(no_klaim)      from faklaim_m where periode<='"+this.ed_period.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and no_del='-' ",
										  new Array("no_klaim","keterangan"),"and",new Array("No Bukti","Deskripsi"),false);
			this.standarLib.clearByTag(this, new Array("2"),undefined);
		}
		if (sender == this.cb_status) 
		{  
			this.standarLib.showListData(this, "Daftar Status Klaim Asuransi",this.cb_status,undefined, 
										  "select kode_status,nama   from fa_status where jenis = 'K'",
										  "select count(kode_status) from fa_status where jenis = 'K'",
										  new Array("kode_status","nama"),"and",new Array("Kode Status","Keterangan"),false);
			
		}
		if (sender == this.cb_buat) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_setuju,undefined, 
										  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFaklaimk.prototype.showClick = function(sender)
{
	try
	{	
		var line,data = this.dbLib.runSQL(" select a.no_polis,f.nilai as np,a.no_dokumen,a.keterangan,a.nik_buat,a.nik_setuju,a.kode_vendor,a.nilai,a.kode_status,"+
								          "        b.nama as nama_buat,c.nama as nama_setuju,a.periode,d.nama as nama_vendor,e.nama as nama_status "+
		                                  " from faklaim_m a "+
		                                  "        inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
										  "        inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
										  "        inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
										  "        inner join fa_status e on a.kode_status=e.kode_status and e.jenis ='K' "+
										  "        inner join fapolis_m f on a.no_polis=f.no_polis and a.kode_lokasi=f.kode_lokasi "+
										  " where a.no_klaim = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.periodeLama = line.get("periode");
				this.ed_dok.setText(line.get("no_dokumen"));
				this.ed_desc.setText(line.get("keterangan"));
				this.cb_polis.setText(line.get("no_polis"));
				this.cb_buat.setText(line.get("nik_buat"));
				this.cb_buat.setRightLabelCaption(line.get("nama_buat"));
				this.cb_setuju.setText(line.get("nik_setuju"));
				this.cb_setuju.setRightLabelCaption(line.get("nama_setuju"));
				this.cb_vendor.setText(line.get("kode_vendor"));
				this.cb_vendor.setRightLabelCaption(line.get("nama_vendor"));
				this.cb_status.setText(line.get("kode_status"));
				this.cb_status.setRightLabelCaption(line.get("nama_status"));
				this.ed_nklaim.setText(floatToNilai(parseFloat(line.get("nilai"))));				
				this.ed_npolis.setText(floatToNilai(parseFloat(line.get("np"))));
			} 
		}
	
		this.sg1.showLoading();
		var line,data = this.dbLib.runSQL(" select a.no_fa,a.barcode,a.nama,a.merk,a.tipe,a.no_seri,b.nama as lokfa,c.nama as pp,d.nama as pnj,f.kode_akun,a.nilai,h.nilai as nk,h.catatan "+
										  " from fa_asset a inner join fa_lokasi b on a.kode_lokfa = b.kode_lokfa and a.kode_lokasi=b.kode_lokasi "+
										  "     		    inner join pp c on a.kode_pp = c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
										  "     		    inner join karyawan d on a.nik_pnj = d.nik and a.kode_lokasi=d.kode_lokasi "+
										  "     		    inner join fa_klpakun f on a.kode_klpakun = f.kode_klpakun and a.kode_lokasi=f.kode_lokasi "+
										  "                 inner join fapolis_d g on a.no_fa=g.no_fa and a.kode_lokasi=g.kode_lokasi "+
										  "                 inner join faklaim_d h on g.no_fa=h.no_fa and g.kode_lokasi=h.kode_lokasi "+
										  " where h.kode_lokasi='"+this.app._lokasi+"' and g.no_polis='"+this.cb_polis.getText()+"' and h.no_klaim='"+this.cb_bukti.getText()+"'");					
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				this.sg1.clear();
				for (var i in data.objList)
				{
					line = data.get(i);
					this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13),
					new Array("KLAIM",line.get("catatan"),line.get("nk"),line.get("no_fa"),line.get("barcode"),line.get("nama"),line.get("merk"),line.get("tipe"),line.get("no_seri"),line.get("lokfa"),line.get("pp"),line.get("pnj"),
					floatToNilai(parseFloat(line.get("nilai"))),line.get("kode_akun")));					
				}
			} 
		}			
		this.sg1.validasi();
		this.sg1.hideLoading();
	}catch(e)
	{
		alert("[doNilaiChange:"+e);
	}
};
window.app_saku_fa_transaksi_fFaklaimk.prototype.doCellExit = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
			case 2 :
					this.sg1.validasi();
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fFr] : doFindBtnClick : " + e);
	}
};
window.app_saku_fa_transaksi_fFaklaimk.prototype.doNilaiChange = function()
{
	try
	{
		var tot = tot2 = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(0,i).toUpperCase() == "KLAIM")
			{
				if (this.sg1.getCell(12,i) != "")
				{
					tot += nilaiToFloat(this.sg1.getCell(12,i));			
				}
				if (this.sg1.getCell(2,i) != "")
				{
					tot2 += nilaiToFloat(this.sg1.getCell(2,i));			
				}
			}
		}
		this.ed_nasset.setText(floatToNilai(tot));
		this.ed_nklaim.setText(floatToNilai(tot2));
	}catch(e)
	{
		alert("[doNilaiChange:"+e);
	}
};
window.app_saku_fa_transaksi_fFaklaimk.prototype.doRequestReady = function(sender, methodName, result)
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
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
      		break;
    		}    		
		}
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
};