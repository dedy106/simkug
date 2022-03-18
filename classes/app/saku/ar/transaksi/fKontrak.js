window.app_saku_ar_transaksi_fKontrak = function(owner)
{
  if (owner)
	{
		window.app_saku_ar_transaksi_fKontrak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_ar_transaksi_fKontrak";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kontrak : Input", 0);
		
		this.e_periode = new portalui_saiLabelEdit(this);
		this.e_periode.setTop(10);
		this.e_periode.setLeft(20);
		this.e_periode.setWidth(150);
		this.e_periode.setCaption("Periode");
		this.e_periode.setReadOnly(true);
		
		this.l_tgl = new portalui_label(this);
		this.l_tgl.setTop(35);
		this.l_tgl.setWidth(100);
		this.l_tgl.setLeft(20);
		this.l_tgl.setHeight(18);
		this.l_tgl.setCaption("Tanggal");
		this.l_tgl.setUnderLine(true);
		
		uses("portalui_datePicker");
		this.dp_tgl = new portalui_datePicker(this);
		this.dp_tgl.setTop(35);
		this.dp_tgl.setLeft(120);
		this.dp_tgl.setWidth(100);
		
		uses("portalui_saiCBBL");
		this.e_nb = new portalui_saiCBBL(this);
		this.e_nb.setTop(20);
		this.e_nb.setLeft(20);
		this.e_nb.setCaption("No Kontrak");
		this.e_nb.setWidth(200);		
		this.e_nb.setReadOnly(true);		
		this.e_nb.setBtnVisible(false);
		
		this.bGen = new portalui_button(this);
		this.bGen.setTop(20);
		this.bGen.setLeft(220);
		this.bGen.setCaption("Generate");
		
		this.e_dok = new portalui_saiLabelEdit(this);
		this.e_dok.setTop(40);
		this.e_dok.setLeft(20);
		this.e_dok.setWidth(500);
		this.e_dok.setCaption("No Dokumen/Ref");
		
		this.e_cust = new portalui_saiCBBL(this);
		this.e_cust.setTop(50);
		this.e_cust.setLeft(20);
		this.e_cust.setWidth(200);
		this.e_cust.setCaption("Customer");
		
		this.l_tgl = new portalui_label(this);
		this.l_tgl.setTop(55);
		this.l_tgl.setWidth(100);
		this.l_tgl.setLeft(20);
		this.l_tgl.setHeight(18);
		this.l_tgl.setCaption("Tanggal Tagih");
		this.l_tgl.setUnderLine(true);
		
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(55);
		this.dp_tgl2.setLeft(120);
		this.dp_tgl2.setWidth(100);
		
		this.e_ket = new portalui_saiLabelEdit(this);
		this.e_ket.setTop(60);
		this.e_ket.setLeft(20);
		this.e_ket.setWidth(500);
		this.e_ket.setCaption("Keterangan");
		
		this.e_nilai = new portalui_saiLabelEdit(this);
		this.e_nilai.setTop(65);
		this.e_nilai.setLeft(20);
		this.e_nilai.setWidth(200);
		this.e_nilai.setTipeText(ttNilai);
		this.e_nilai.setCaption("Nilai");
		
		this.e_ppn = new portalui_saiLabelEdit(this);
		this.e_ppn.setTop(68);
		this.e_ppn.setLeft(20);
		this.e_ppn.setWidth(200);
		this.e_ppn.setTipeText(ttNilai);
		this.e_ppn.setCaption("PPN");		
		
		this.e_curr = new portalui_saiCBBL(this);
		this.e_curr.setTop(70);
		this.e_curr.setLeft(20);
		this.e_curr.setWidth(200);
		this.e_curr.setCaption("Currency");
		
		this.e_kurs = new portalui_saiLabelEdit(this);
		this.e_kurs.setTop(75);
		this.e_kurs.setLeft(20);
		this.e_kurs.setWidth(200);
		this.e_kurs.setTipeText(ttNilai);
		this.e_kurs.setCaption("Kurs");
		this.e_kurs.setReadOnly(true);
		
		this.e_akun = new portalui_saiCBBL(this);
		this.e_akun.setTop(80);
		this.e_akun.setLeft(20);
		this.e_akun.setWidth(200);
		this.e_akun.setCaption("Akun Piutang");		
		
		this.e_pdpt = new portalui_saiCBBL(this);
		this.e_pdpt.setTop(82);
		this.e_pdpt.setLeft(20);
		this.e_pdpt.setWidth(200);
		this.e_pdpt.setCaption("Akun Pdpt");		
		
		this.e_akunppn = new portalui_saiCBBL(this);
		this.e_akunppn.setTop(83);
		this.e_akunppn.setLeft(20);
		this.e_akunppn.setWidth(200);
		this.e_akunppn.setCaption("Akun PPN");		
		
		this.e_deprs = new portalui_saiCBBL(this);
		this.e_deprs.setTop(84);
		this.e_deprs.setLeft(20);
		this.e_deprs.setWidth(200);
		this.e_deprs.setCaption("Akun Deprs");		
		
		this.e_beban = new portalui_saiCBBL(this);
		this.e_beban.setTop(85);
		this.e_beban.setLeft(20);
		this.e_beban.setWidth(200);
		this.e_beban.setCaption("Akun Beban");		
		
		this.e_drk1 = new portalui_saiCBBL(this);
		this.e_drk1.setTop(84);
		this.e_drk1.setLeft(20);
		this.e_drk1.setWidth(200);
		this.e_drk1.setCaption("DRK Pendapatan");		
		
		this.e_drk2 = new portalui_saiCBBL(this);
		this.e_drk2.setTop(85);
		this.e_drk2.setLeft(20);
		this.e_drk2.setWidth(200);
		this.e_drk2.setCaption("DRK Beban");
		
		this.e_nb.onBtnClick.set(this, "FindBtnClick");
		this.e_nb.onChange.set(this,"doChange");
		
		this.e_cust.onBtnClick.set(this,"FindBtnClick");
		this.e_cust.onChange.set(this,"doChange");
		
		this.e_curr.onBtnClick.set(this,"FindBtnClick");
		this.e_curr.onChange.set(this,"doChange");
		
		this.e_akun.onBtnClick.set(this,"FindBtnClick");
		this.e_pdpt.onBtnClick.set(this,"FindBtnClick");
		this.e_deprs.onBtnClick.set(this,"FindBtnClick");
		this.e_beban.onBtnClick.set(this,"FindBtnClick");
		this.e_akunppn.onBtnClick.set(this,"FindBtnClick");
		this.e_drk1.onBtnClick.set(this,"FindBtnClick");
		this.e_drk2.onBtnClick.set(this,"FindBtnClick");
		
		this.dp_tgl.onSelect.set(this,"doSelectDate");
		this.bGen.onClick.set(this,"doGenerate");
		this.dp_tgl.setDateString((new Date).getDateStr());			
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.e_curr.setText("IDR");
			this.e_curr.setRightLabelCaption("Indonesia");
			this.e_kurs.setText("1");
		}catch(e)
		{
			alert("[app_saku_ar_transaksi_fKontrak]->constructor : "+e);
		}
	}
};
window.app_saku_ar_transaksi_fKontrak.extend(window.portalui_childForm);
window.app_saku_ar_transaksi_fKontrak.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		if (this.dp_tgl.toSysDate() > this.dp_tgl2.toSysDate())
		{
			system.alert(this,"Tanggal Tagihan tidak boleh kurang dari Tanggal Kontrak","");
			this.dp_tgl2.setFocus();
			return;
		}
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
window.app_saku_ar_transaksi_fKontrak.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e_nb);				
				this.e_curr.setText("IDR");
				this.e_curr.setRightLabelCaption("Indonesia");
				this.e_kurs.setText("1");	
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0"])))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into ar_kontrak (no_kontrak, kode_lokasi, periode, tanggal, no_dokumen, keterangan, kode_cust, tgl_tagih, nilai, kode_curr, kurs, nilai_ppn, akun_piutang, akun_pdpt, akun_ppn, akun_deprs, akun_beban, kode_drk_pdpt, kode_drk_beban, progress) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.e_cust.getText()+"' "+
								",'"+this.dp_tgl2.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_ppn.getText())+" "+
								",'"+this.e_akun.getText()+"','"+this.e_pdpt.getText()+"','"+this.e_akunppn.getText()+"','"+this.e_deprs.getText()+"','"+this.e_beban.getText()+"','"+this.e_drk1.getText()+"','"+this.e_drk2.getText()+"','0') ");
					
					this.dbLib.execArraySQL(sql);	
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
					sql.add("");
					this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from ar_kontrak where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);						
		   }
			break;
	}
};
window.app_saku_ar_transaksi_fKontrak.prototype.doGenerate = function(sender)
{
	this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "ar_kontrak","no_kontrak",this.app._lokasi + this.e_periode.getText().substr(2 ),"00000","and kode_lokasi ='"+this.app._lokasi+"' "));
};
window.app_saku_ar_transaksi_fKontrak.prototype.doEditChange = function(sender)
{
	if (sender.getText() != "")
	{
		if (sender == this.e_nb){
			try
			{
				setTipeButton(tbSimpan);
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	}
};
window.app_saku_ar_transaksi_fKontrak.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e_nb)
			this.standarLib.showListData(this, "Data Kontrak",sender,undefined, 
									  "select no_kontrak, keterangan from ar_kontrak where kode_lokasi='"+this.app._lokasi+"'",
									  "select count(*) from ar_kontrak where kode_lokasi='"+this.app._lokasi+"'",
									  ["no_kontrak","keterangan"],"and",["No Kontrak","Keterangan"]);
		if (sender == this.e_cust)
			this.standarLib.showListData(this, "Data Customer",sender,undefined, 
									  "select  kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"' ",
									  "select count(*) from cust  where kode_lokasi = '"+this.app._lokasi+"'",
									  ["kode_cust","nama"],"and",["Kode Cust","Nama "]);
		if (sender == this.e_curr)
			this.standarLib.showListData(this, "Data Currency",sender,undefined, 
									  "select kode_curr, nama from curr ",
									  "select count(*) from curr",
									  ["kode_curr","nama"],"where",["Kode Curr","Nama"]);
		if (sender == this.e_akun)
			this.standarLib.showListData(this, "Data Master Akun(Akun Piutang)",sender,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
									  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
									  ["a.kode_akun","nama"],"where",["Kode Akun","Nama"]);
		if (sender == this.e_pdpt)
			this.standarLib.showListData(this, "Data Master Akun(Akun Pendapatan)",sender,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022' ",
									  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022' ",
									  ["a.kode_akun","nama"],"where",["Kode Akun","Nama"]);
		if (sender == this.e_akunppn)
			this.standarLib.showListData(this, "Data Master Akun(Akun Pajak)",sender,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='021' ",
									  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='021' ",
									  ["a.kode_akun","nama"],"where",["Kode Akun","Nama"]);
		if (sender == this.e_deprs)
			this.standarLib.showListData(this, "Data Master Akun (Akun Penyisihan)",sender,undefined,
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='023' ",
									  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='023' ",
									  ["kode_akun","nama"],"where",["Kode Akun","Nama"]);
		if (sender == this.e_beban)
			this.standarLib.showListData(this, "Data Master Akun (Akun Beban)",sender,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='020' ",
									  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='020' ",
									  ["kode_akun","nama"],"where",["Kode Akun","Nama"]);
		
		if (sender == this.e_drk1 || sender == this.e_drk2)
			this.standarLib.showListData(this, "Data DRK",sender,undefined, 
									  "select a.kode_drk, a.nama from drk a where a.kode_lokasi = '"+this.app._lokasi+"' and tahun = '"+this.dp_tgl.year+"' ",
									  "select count(a.kode_drk)  from drk a where a.kode_lokasi = '"+this.app._lokasi+"' and tahun = '"+this.dp_tgl.year+"' ",
									  ["kode_drk","nama"],"where",["Kode DRK","Nama"], true);
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_ar_transaksi_fKontrak.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"process completed ("+ this.e_nb.getText()+")");
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
window.app_saku_ar_transaksi_fKontrak.prototype.doChange = function(sender){	
	if (sender == this.e_curr){
		if (trim(sender.getText()) == "IDR"){
			this.e_kurs.setReadOnly(true);
			this.e_kurs.setText("1");
		}else this.e_kurs.setReadOnly(false);
	}
};
window.app_saku_ar_transaksi_fKontrak.prototype.doSelectDate = function(sender, y, m, d){	
	this.e_periode.setText(y +""+ (m < 10 ? "0"+m:m));
	this.bGen.click();
};