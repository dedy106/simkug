window.app_saku_fa_transaksi_fFasstcepat = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFasstcepat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFasstcepat";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Percepatan Penyusutan Asset: Input", 0);	
				
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
		this.ed_nb.setCaption("No Penyusutan");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(300);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(323);
		this.cb_curr.setTop(76);
		this.cb_curr.setWidth(150);
		this.cb_curr.setCaption("Currency dan Kurs");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		
		this.ed_kurs = new portalui_saiLabelEdit(this);
		this.ed_kurs.setLeft(470);
		this.ed_kurs.setTop(76);
		this.ed_kurs.setWidth(50);
		this.ed_kurs.setLabelWidth(0);
		this.ed_kurs.setTipeText(ttNilai);
		this.ed_kurs.setAlignment(alRight);
		this.ed_kurs.setCaption("");
		this.ed_kurs.setReadOnly(true);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(50);
			
		this.cb_buat = new portalui_saiCBBL(this);
		this.cb_buat.setLeft(20);
		this.cb_buat.setTop(120);
		this.cb_buat.setWidth(185);
		this.cb_buat.setCaption("Dibuat Oleh");
		this.cb_buat.setText(""); 
		this.cb_buat.setReadOnly(true);
		this.cb_buat.setLabelWidth(100);
		this.cb_buat.setRightLabelVisible(true);
		this.cb_buat.setRightLabelCaption("");	
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(142);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");	
		
		this.cb_drk = new portalui_saiCBBL(this);
		this.cb_drk.setLeft(20);
		this.cb_drk.setTop(164);
		this.cb_drk.setWidth(185);
		this.cb_drk.setCaption("Data RKM");
		this.cb_drk.setText(""); 
		this.cb_drk.setReadOnly(true);
		this.cb_drk.setLabelWidth(100);
		this.cb_drk.setRightLabelVisible(true);
		this.cb_drk.setRightLabelCaption("");	
		
		this.cb_fa = new portalui_saiCBBL(this);
		this.cb_fa.setLeft(20);
		this.cb_fa.setTop(186);
		this.cb_fa.setWidth(235);
		this.cb_fa.setCaption("No Asset");
		this.cb_fa.setText(""); 
		this.cb_fa.setReadOnly(true);
		this.cb_fa.setLabelWidth(100);
		this.cb_fa.setRightLabelVisible(false);
		this.cb_fa.setRightLabelCaption("");	
				
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(255);
		this.bShow.setTop(186);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_barcode = new portalui_saiLabelEdit(this);
		this.ed_barcode.setLeft(20);
		this.ed_barcode.setTop(208);
		this.ed_barcode.setWidth(215);
		this.ed_barcode.setLabelWidth(100);
		this.ed_barcode.setCaption("Barcode - Deskripsi");
		this.ed_barcode.setText(""); 
		this.ed_barcode.setReadOnly(true);
		this.ed_barcode.setTag("1");
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(240);
		this.ed_nama.setTop(208);
		this.ed_nama.setWidth(250);
		this.ed_nama.setLabelWidth(0);
		this.ed_nama.setHint("Deskripsi Asset");
		this.ed_nama.setText(""); 
		this.ed_nama.setReadOnly(true);
		this.ed_nama.setTag("1");
		
		this.ed_merk = new portalui_saiLabelEdit(this);
		this.ed_merk.setLeft(20);
		this.ed_merk.setTop(230);
		this.ed_merk.setWidth(215);
		this.ed_merk.setLabelWidth(100);
		this.ed_merk.setCaption("Merk - Tipe");
		this.ed_merk.setText(""); 
		this.ed_merk.setReadOnly(true);
		this.ed_merk.setTag("1");
		
		this.ed_tipe = new portalui_saiLabelEdit(this);
		this.ed_tipe.setLeft(240);
		this.ed_tipe.setTop(230);
		this.ed_tipe.setWidth(250);
		this.ed_tipe.setLabelWidth(0);
		this.ed_tipe.setHint("Tipe");
		this.ed_tipe.setText(""); 
		this.ed_tipe.setReadOnly(true);
		this.ed_tipe.setTag("1");
		
		this.ed_nasset = new portalui_saiLabelEdit(this);
		this.ed_nasset.setLeft(500);
		this.ed_nasset.setTop(208);
		this.ed_nasset.setWidth(200);
		this.ed_nasset.setTipeText(ttNilai);
		this.ed_nasset.setAlignment(alRight);
		this.ed_nasset.setLabelWidth(100);
		this.ed_nasset.setCaption("Nilai Perolehan");
		this.ed_nasset.setText("0"); 
		this.ed_nasset.setReadOnly(true);
		
		this.ed_nbuku = new portalui_saiLabelEdit(this);
		this.ed_nbuku.setLeft(500);
		this.ed_nbuku.setTop(230);
		this.ed_nbuku.setWidth(200);
		this.ed_nbuku.setTipeText(ttNilai);
		this.ed_nbuku.setAlignment(alRight);
		this.ed_nbuku.setLabelWidth(100);
		this.ed_nbuku.setCaption("Nilai Buku");
		this.ed_nbuku.setText("0"); 
		this.ed_nbuku.setReadOnly(true);
		
		this.ed_totsusut = new portalui_saiLabelEdit(this);
		this.ed_totsusut.setLeft(720);
		this.ed_totsusut.setTop(208);
		this.ed_totsusut.setWidth(200);
		this.ed_totsusut.setTipeText(ttNilai);
		this.ed_totsusut.setAlignment(alRight);
		this.ed_totsusut.setLabelWidth(100);
		this.ed_totsusut.setCaption("Akum. Penyusutan");
		this.ed_totsusut.setText("0"); 
		this.ed_totsusut.setReadOnly(true);
		
		this.ed_nresidu = new portalui_saiLabelEdit(this);
		this.ed_nresidu.setLeft(720);
		this.ed_nresidu.setTop(230);
		this.ed_nresidu.setWidth(200);
		this.ed_nresidu.setTipeText(ttNilai);
		this.ed_nresidu.setAlignment(alRight);
		this.ed_nresidu.setLabelWidth(100);
		this.ed_nresidu.setCaption("Nilai Residu");
		this.ed_nresidu.setText("0"); 
		this.ed_nresidu.setReadOnly(true);
		
		this.ed_nsusut = new portalui_saiLabelEdit(this);
		this.ed_nsusut.setLeft(20);
		this.ed_nsusut.setTop(252);
		this.ed_nsusut.setWidth(215);
		this.ed_nsusut.setTipeText(ttNilai);
		this.ed_nsusut.setAlignment(alRight);
		this.ed_nsusut.setLabelWidth(100);
		this.ed_nsusut.setCaption("Nilai Susut");
		this.ed_nsusut.setText("0"); 
		this.ed_nsusut.setReadOnly(true);
		
		this.ed_jml = new portalui_saiLabelEdit(this);
		this.ed_jml.setLeft(289);
		this.ed_jml.setTop(252);
		this.ed_jml.setWidth(200);
		this.ed_jml.setTipeText(ttNilai);
		this.ed_jml.setAlignment(alRight);
		this.ed_jml.setLabelWidth(100);
		this.ed_jml.setCaption("Jumlah Susut");
		this.ed_jml.setText("0"); 
		this.ed_jml.setReadOnly(false);
		
		uses("portalui_checkBox");
		this.cb1 = new portalui_checkBox(this);
		this.cb1.setLeft(500);
		this.cb1.setTop(258);
		this.cb1.setWidth(100);
		this.cb1.setCaption("Sampai Nilai Residu");
	
		this.bHitung = new portalui_button(this);
		this.bHitung.setLeft(845);
		this.bHitung.setTop(274);
		this.bHitung.setCaption("Hitung");
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(20);
		this.ed_total.setTop(274);
		this.ed_total.setWidth(215);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(100);
		this.ed_total.setCaption("Total Penyusutan");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
				
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(298);
	    this.p1.setWidth(900);
	    this.p1.setHeight(268);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Penyusutan Asset');
    	
		uses('portalui_saiGrid');
		this.sg1 = new portalui_saiGrid(this.p1); 
	    this.sg1.setLeft(1);
	    this.sg1.setTop(20);
	    this.sg1.setWidth(895);
	    this.sg1.setHeight(168);
	    this.sg1.setColCount(9);
	    this.sg1.setColTitle(new Array("Kode Dept","Nama Dept","Akun Beban","Nama Akun","Akun Depr.","Nama Akun","Persen","Susut Ref.","Nilai Susut"));
		this.sg1.setColWidth(new Array(8,7,6,5,4,3,2,1,0),new Array(100,100,65,120,80,120,80,120,80));	
		this.sg1.setReadOnly(true);
		this.sg1.columns.get(6).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(7).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(8).setColumnFormat(window.cfNilai);
		
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
			
			this.bGen.onClick.set(this, "genClick");
			this.bHitung.onClick.set(this, "genClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			this.cb_fa.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.cb1.onChange.set(this, "doEditChange");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg1.clear(); this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFasstcepat.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFasstcepat.prototype.mainButtonClick = function(sender)
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

window.app_saku_fa_transaksi_fFasstcepat.prototype.simpan = function()
{	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();

			sql.add("insert into fasusut_m (no_fasusut,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_total.getText())+","+
					"'-','"+this.cb_drk.getText()+"','F','FA_CPT','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
					"'"+this.app._userLog+"',now())");					
			
			sql.add("update fa_asset set periode_susut = '"+nextNPeriode(this.ed_period.getText(),1)+"' where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			
			sql.add("insert into fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del) values "+	
						"('"+this.ed_nb.getText()+"','"+this.cb_fa.getText()+"','"+this.ed_period.getText()+"',"+
						parseNilai(this.ed_total.getText())+",'"+this.app._lokasi+"','"+this.akunbp+"','"+
						this.akunap+"','"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.akunasset+"','D','-')");
			
			sql.add("insert into fasusut_j (no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
					"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',1,'"+this.akunbp+"','"+this.ed_desc.getText()+"','D','"+parseNilai(this.ed_total.getText())+"','"+this.kodepp+"','"+this.cb_drk.getText()+"',"+
					"'"+this.app._lokasi+"','FA_CPT','BP','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now())");
			sql.add("insert into fasusut_j (no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
					"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
					"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',2,'"+this.akunap+"','"+this.ed_desc.getText()+"','C','"+parseNilai(this.ed_total.getText())+"','"+this.kodepp+"','"+this.cb_drk.getText()+"',"+
					"'"+this.app._lokasi+"','FA_CPT','AP','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'"+this.app._userLog+"',now())");
			
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};

window.app_saku_fa_transaksi_fFasstcepat.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);	
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear(); this.sg1.appendRow();
				this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			}
			break;
		
		case "simpan" :	
			if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
			{
				system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
				return false;
			}
			if (nilaiToFloat(this.ed_total.getText()) == 0)
			{
				system.alert(this,"Nilai penyusutan tidak valid.","Nilai total tidak boleh nol.");
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

window.app_saku_fa_transaksi_fFasstcepat.prototype.genClick = function(sender)
{
	try
	{
		if (sender == this.bGen)
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fasusut_m','no_fasusut',this.app._lokasi+"-SST"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}
			else
			{
				system.alert(this,"Periode harus valid.","");			
			}
		}
		if (sender == this.bHitung)
		{
			if (nilaiToFloat(this.ed_nbuku.getText()) > nilaiToFloat(this.ed_nresidu.getText()))
			{
				this.sg1.clear();
				var nbuku = nilaiToFloat(this.ed_nbuku.getText()) - nilaiToFloat(this.ed_nresidu.getText());
				if (this.cb1.isSelected()) 
				{
					this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8),
					new Array(this.kodepp,this.namapp,this.akunbp,this.namabp,this.akunap,this.namaap,floatToNilai(parseFloat(this.persen)),this.ed_nsusut.getText(),floatToNilai(nbuku)));
				}
				else
				{
					this.sg1.showLoading();	
					var jml = nilaiToFloat(this.ed_jml.getText()) - 1;
					var nsst = 0;
					
					for (var i=0; i <= jml; i++)
					{
						if (nbuku > nilaiToFloat(this.ed_nsusut.getText()))
						{ 
							nsst = nilaiToFloat(this.ed_nsusut.getText());
							nbuku = nbuku - nsst;
						}
						else
						{nsst = nbuku;}
						
						this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8),
						new Array(this.kodepp,this.namapp,this.akunbp,this.namabp,this.akunap,this.namaap,floatToNilai(parseFloat(this.persen)),this.ed_nsusut.getText(),floatToNilai(nsst)));
					}
					this.sg1.hideLoading();	
				}	
				this.sg1.validasi();
			}
			else
			{
				system.alert(this,"Nilai Buku sudah mencapai Residu.","");
			}
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFasstcepat.prototype.showClick = function(sender)
{
	try
	{
		var line,data = this.dbLib.runSQL(" select a.barcode,a.nama,a.merk,a.tipe,a.nilai,a.kode_pp,b.kode_akun,b.akun_bp,b.akun_deprs,a.persen,(a.nilai-ifnull(c.total_susut,0)) as nilai_buku,a.nilai_residu,ifnull(c.total_susut,0) as total_susut,truncate((a.nilai*a.persen/12/100),0) as nilai_susut, "+
									 "        ifnull(f.nama,'-') as nama_pp,d.nama as nama_bp,e.nama as nama_ap "+
									 " from fa_asset a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
									 "                 inner join masakun d on b.akun_bp = d.kode_akun and b.kode_lokasi=d.kode_lokasi "+
									 "                 inner join masakun e on b.akun_deprs = e.kode_akun and b.kode_lokasi=e.kode_lokasi "+
									 "                 left outer join pp f on a.kode_pp = f.kode_pp and a.kode_lokasi=f.kode_lokasi "+
									 "                 left outer join (select x.kode_lokasi,x.no_fa,sum(x.nilai) as total_susut "+
									 "                                  from fasusut_d x inner join fasusut_m y on x.no_fasusut=y.no_fasusut and x.kode_lokasi=y.kode_lokasi "+
									 "                                  where y.no_del='-' and y.kode_lokasi='"+this.app._lokasi+"'  and x.dc='D' group by x.kode_lokasi,x.no_fa) c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi "+
									 " where a.no_fa = '"+this.cb_fa.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");		
						
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_barcode.setText(line.get("barcode"));
				this.ed_nama.setText(line.get("nama"));
				this.ed_merk.setText(line.get("merk"));
				this.ed_tipe.setText(line.get("tipe"));
				
				this.akunasset = line.get("kode_akun");
				this.akunbp = line.get("akun_bp");
				this.akunap = line.get("akun_deprs");
				this.kodepp = line.get("kode_pp");
				this.namabp = line.get("nama_bp");
				this.namaap = line.get("nama_ap");
				this.namapp = line.get("nama_pp");
				this.persen = parseFloat(line.get("persen"));
				
				this.ed_nasset.setText(floatToNilai(parseFloat(line.get("nilai"))));
				this.ed_nbuku.setText(floatToNilai(parseFloat(line.get("nilai_buku"))));
				this.ed_nresidu.setText(floatToNilai(parseFloat(line.get("nilai_residu"))));
				this.ed_nbuku.setText(floatToNilai(parseFloat(line.get("nilai_buku"))));
				this.ed_totsusut.setText(floatToNilai(parseFloat(line.get("total_susut"))));
				this.ed_nsusut.setText(floatToNilai(parseFloat(line.get("nilai_susut"))));
			} 
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_fa_transaksi_fFasstcepat.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_fa_transaksi_fFasstcepat.prototype.doEditChange = function(sender,selected)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if (this.ed_period.getText() != "") this.bGen.click();
	}
	
	if (sender == this.cb1)
	{
		this.ed_jml.setReadOnly(selected);
		this.ed_jml.setText(selected?"0":this.ed_jml.getText());
	}
};											  
window.app_saku_fa_transaksi_fFasstcepat.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_fa) 
		{   
			this.standarLib.showListData(this, "Daftar Asset",this.cb_fa,undefined, 
										  "select no_fa,nama   from fa_asset where kode_lokasi='"+this.app._lokasi+"' and progress = '1' and persen <> 0 and nilai>0 and jenis = 'ASSET'",
										  "select count(no_fa) from fa_asset where kode_lokasi='"+this.app._lokasi+"' and progress = '1' and persen <> 0 and nilai>0 and jenis = 'ASSET'",
										  new Array("no_fa","nama"),"and",new Array("No Asset","Deskripsi"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
		}
		if (sender == this.cb_drk) 
		{   
			this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
										  "select kode_drk,nama   from drk where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and tahun='"+this.ed_period.getText().substr(0,4)+"'",
										  "select count(kode_drk) from drk where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and tahun='"+this.ed_period.getText().substr(0,4)+"'",
										  new Array("kode_drk","nama"),"and",new Array("Kode RKM","Deskripsi"),false);
			
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
window.app_saku_fa_transaksi_fFasstcepat.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;  
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if (this.sg1.getCell(8,i) != "")
			{
				tot += nilaiToFloat(this.sg1.getCell(8,i));			
			}
		}
		this.ed_total.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[doNilaiChange:"+e);
	}
};
window.app_saku_fa_transaksi_fFasstcepat.prototype.doRequestReady = function(sender, methodName, result)
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