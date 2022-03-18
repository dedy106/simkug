//C:\Program FilesVista\Klorofil;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;D:\Program Files\MySQL\MySQL Server 5.0\bin;D:\PROGRA~1\Borland\Delphi6\Bin;D:\PROGRA~1\Borland\Delphi6\Projects\Bpl;D:\Program Files\Common Files\Adobe\AGL;D:\Program Files\Microsoft SQL Server\80\Tools\BINN;D:\Program Files\Java\jdk1.6.0_12\jre\bin
window.app_saku_ar_transaksi_fKorBayar = function(owner)
{
  if (owner)
	{
		try
		{
			window.app_saku_ar_transaksi_fKorBayar.prototype.parent.constructor.call(this,owner);
			this.className  = "app_saku_ar_transaksi_fKorBayar";
			this.setTop(60);
			this.setWidth(1280);
			this.setHeight(550);
			this.itemsValue = new portalui_arrayList();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pembayaran : Koreksi", 0);
			
			this.e_periode = new portalui_saiLabelEdit(this);
			this.e_periode.setTop(10);
			this.e_periode.setLeft(20);
			this.e_periode.setWidth(180);
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
			this.dp_tgl.setWidth(98);
		
			this.e_jenis = new portalui_saiCB(this);
			this.e_jenis.setTop(36);
			this.e_jenis.setLeft(20);
			this.e_jenis.setWidth(180);
			this.e_jenis.setCaption("Jenis");
			this.e_jenis.addItem(0,"KM");
			this.e_jenis.addItem(1,"BM");
			
			uses("portalui_saiCBBL");
			this.e_nb1 = new portalui_saiCBBL(this);
			this.e_nb1.setTop(20);
			this.e_nb1.setLeft(20);
			this.e_nb1.setCaption("No Pembayaran");
			this.e_nb1.setWidth(200);		
			this.e_nb1.setReadOnly(true);					
			
			this.e_nb = new portalui_saiLabelEdit(this);
			this.e_nb.setTop(20);
			this.e_nb.setLeft(320);
			this.e_nb.setCaption("No Pembayaran Rev");
			this.e_nb.setWidth(200);		
			this.e_nb.setReadOnly(true);					
			
			this.bGen = new portalui_button(this);
			this.bGen.setTop(20);
			this.bGen.setLeft(530);
			this.bGen.setCaption("Generate");
			
			this.e_dok = new portalui_saiLabelEdit(this);
			this.e_dok.setTop(40);
			this.e_dok.setLeft(20);
			this.e_dok.setWidth(500);
			this.e_dok.setCaption("No Dokumen/Ref");
			this.e_dok.setReadOnly(true);
			
			this.e_cust = new portalui_saiCBBL(this);
			this.e_cust.setTop(50);
			this.e_cust.setLeft(20);
			this.e_cust.setWidth(200);
			this.e_cust.setCaption("Customer");			
			this.e_cust.setReadOnly(true);
			this.e_cust.setBtnVisible(false);
			
			this.e_invoice = new portalui_saiCBBL(this);
			this.e_invoice.setTop(80);
			this.e_invoice.setLeft(20);
			this.e_invoice.setWidth(200);
			this.e_invoice.setCaption("No Invoice");		
			this.e_invoice.setReadOnly(true);
			this.e_invoice.setBtnVisible(false);
			
			this.e_ket = new portalui_saiLabelEdit(this);
			this.e_ket.setTop(60);
			this.e_ket.setLeft(20);
			this.e_ket.setWidth(500);
			this.e_ket.setCaption("Keterangan");
			
			this.e_nilai = new portalui_saiLabelEdit(this);
			this.e_nilai.setTop(65);
			this.e_nilai.setLeft(20);
			this.e_nilai.setWidth(180);
			this.e_nilai.setTipeText(ttNilai);
			this.e_nilai.setCaption("Nilai Bayar");
			this.e_nilai.setReadOnly(true);
			
			this.e_nilaitagihan = new portalui_saiLabelEdit(this);
			this.e_nilaitagihan.setTop(65);
			this.e_nilaitagihan.setLeft(320);
			this.e_nilaitagihan.setWidth(200);
			this.e_nilaitagihan.setTipeText(ttNilai);
			this.e_nilaitagihan.setCaption("Nilai Tagihan");
			this.e_nilaitagihan.setReadOnly(true);
			
			this.e_pph = new portalui_saiLabelEdit(this);
			this.e_pph.setTop(68);
			this.e_pph.setLeft(20);
			this.e_pph.setWidth(180);
			this.e_pph.setTipeText(ttNilai);
			this.e_pph.setCaption("PPh");		
			this.e_pph.setReadOnly(true);
			
			this.e_ppn = new portalui_saiLabelEdit(this);
			this.e_ppn.setTop(68);
			this.e_ppn.setLeft(320);
			this.e_ppn.setWidth(200);
			this.e_ppn.setTipeText(ttNilai);
			this.e_ppn.setCaption("PPN");		
			this.e_ppn.setReadOnly(true);
			
			this.e_curr = new portalui_saiCBBL(this);
			this.e_curr.setTop(70);
			this.e_curr.setLeft(20);
			this.e_curr.setWidth(200);
			this.e_curr.setCaption("Currency");
			this.e_curr.setReadOnly(true);
			this.e_curr.setBtnVisible(false);			
			
			this.e_kurs = new portalui_saiLabelEdit(this);
			this.e_kurs.setTop(75);
			this.e_kurs.setLeft(20);
			this.e_kurs.setWidth(180);
			this.e_kurs.setTipeText(ttNilai);
			this.e_kurs.setCaption("Kurs");			
			this.e_kurs.setReadOnly(true);
			
			this.e_akun = new portalui_saiCBBL(this);
			this.e_akun.setTop(78);
			this.e_akun.setLeft(20);
			this.e_akun.setWidth(200);
			this.e_akun.setCaption("Piutang IM");
			this.e_akun.setReadOnly(true);
			this.e_akun.setBtnVisible(false);
			
			this.e_akunpph = new portalui_saiCBBL(this);
			this.e_akunpph.setTop(79);
			this.e_akunpph.setLeft(20);
			this.e_akunpph.setWidth(200);
			this.e_akunpph.setCaption("Akun PPH");
			this.e_akunpph.setReadOnly(true);
			this.e_akunpph.setBtnVisible(false);
			
			this.b_jurnal = new portalui_button(this);
			this.b_jurnal.setTop(85);
			this.b_jurnal.setLeft(120);
			this.b_jurnal.setWidth(78);
			this.b_jurnal.setCaption("Cek Jurnal");
			
			this.e_nb1.onBtnClick.set(this, "FindBtnClick");
			this.e_nb1.onChange.set(this,"doChange");
			
			this.e_cust.onBtnClick.set(this,"FindBtnClick");
			this.e_cust.onChange.set(this,"doChange");
			
			this.e_curr.onBtnClick.set(this,"FindBtnClick");
			this.e_curr.onChange.set(this,"doChange");
			
			this.e_akun.onBtnClick.set(this,"FindBtnClick");			
			this.e_akunpph.onBtnClick.set(this,"FindBtnClick");			
			this.e_invoice.onBtnClick.set(this,"FindBtnClick");			
			this.e_invoice.onChange.set(this,"doChange");
			
			this.dp_tgl.onSelect.set(this,"doSelectDate");
			this.bGen.onClick.set(this,"doGenerate");
			this.dp_tgl.setDateString((new Date).getDateStr());	
			this.b_jurnal.onClick.set(this,"PreviewJurnal");
			
			setTipeButton(tbHapus);
			this.maximize();		
			this.setTabChildIndex();
			this.rearrangeChild(10,23);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			uses("app_saku_fJurnalViewer");
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColCount(6);
			this.jurnal.sg.setColTitle(new Array("Kode Akun","DC","Keterangan","Nilai","Kode PP","Kode DRK"));
			this.e_curr.setText("IDR");
			this.e_curr.setRightLabelCaption("Indonesia Rupiah");
			this.e_kurs.setText("1");
		}catch(e)
		{
			alert("[app_saku_ar_transaksi_fKorBayar]->constructor : "+e);
		}
	}
};
window.app_saku_ar_transaksi_fKorBayar.extend(window.portalui_childForm);
window.app_saku_ar_transaksi_fKorBayar.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		try{		
			if (nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_pph.getText()) != nilaiToFloat(this.e_nilaitagihan.getText()) + nilaiToFloat(this.e_ppn.getText()))		
				throw("Nilai Bayar + Nilai PPH harus sama dengan nilai piutang (Nilai Tagihan + PPN)");
			if (this.e_periode.getText() < this.app._periode)
				throw("Periode tidak boleh kurang periode berjalan("+this.app._periode+")");
			system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
		}catch(e){
			system.alert(this,"Proses dihentikan",e);
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
};
window.app_saku_ar_transaksi_fKorBayar.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e_nb);				
				this.e_curr.setText("IDR");
				this.e_curr.setRightLabelCaption("Indonesia Rupiah");
				this.e_kurs.setText("1");
			}
			break;
		case "hapus" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0"])))
			{
				try
				{
					this.createJurnal();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					
					sql.add("insert into arbyr_m (no_bukti, kode_lokasi, periode, tanggal, no_dokumen, keterangan,nilai, kode_curr, kurs, nilai_pph,ref1, kode_cust, nilai_bd, progress, flag_hapus, jenis, posted, cd_ambil, akun_pph, akun_im ) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"' "+
								","+parseNilai(this.e_nilai.getText())+",'"+this.e_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_pph.getText())+" "+
								",'"+this.e_invoice.getText()+"','"+this.e_cust.getText()+"', 0,'0','"+this.e_nb1.getText()+"','"+this.e_jenis.getText()+"','F',0,'"+this.e_akun.getText()+"','"+this.e_akunpph.getText()+"') ");
					sql.add("update ar_inv set progress = '0' where no_invoice = '"+this.e_invoice.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("update arbyr_m set progress = '0',flag_hapus='"+this.e_nb.getText()+"' where no_bukti = '"+this.e_nb1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					var scriptJurnal = "insert into ar_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
					
					var urut = 0;
					for (var i in this.dtJurnal.objList){
						line = this.dtJurnal.get(i);									
						if (line.get("dc") =="D"){
							urut++;
							if (i >0) {scriptJurnal += ",";}
							scriptJurnal+="('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+urut+"','"+this.dp_tgl.getDateString()+"','"+line.get("kode_akun")+"' "+
								",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_INV','"+this.e_periode.getText()+"' "+
								",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
						}
					}
					for (var i in this.dtJurnal.objList){
						line = this.dtJurnal.get(i);									
						if (line.get("dc") =="C"){				
							urut++;
							scriptJurnal+=" ,('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+urut+"','"+this.dp_tgl.getDateString()+"','"+line.get("kode_akun")+"' "+
								",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_INV','"+this.e_periode.getText()+"' "+
								",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
						}
					}		
					sql.add(scriptJurnal);
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
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
					sql.add("delete from ar_inv where no_invoice='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);						
		   }
			break;
	}	
};
window.app_saku_ar_transaksi_fKorBayar.prototype.doGenerate = function(sender)
{
	this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "arbyr_m","no_bukti","KBYR"+this.e_periode.getText().substr(2 ),"00000","and kode_lokasi ='"+this.app._lokasi+"' "));
};
window.app_saku_ar_transaksi_fKorBayar.prototype.doChange = function(sender)
{
	if (sender.getText() != "")
	{
		if (sender == this.e_nb1){
			try
			{
				var rs = this.dbLib.execSQL("select a.jenis,a.tanggal, a.no_dokumen, a.kode_cust, b.nama "+
						"	  , a.ref1, c.keterangan as ket, c.nilai as n_ar, c.nilai_ppn as ar_ppn, g.akun_piutang "+
						"	  , a.keterangan "+
						"	  , a.nilai , a.nilai_pph "+
						"	  , a.kode_curr, ifnull(d.nama,'-') as nama_curr,a.kurs "+
						"	  , a.akun_im, e.nama as nm_im, a.akun_pph, f.nama as nm_pph "+
						" from arbyr_m a "+
						"	  inner join cust b on b.kode_cust = a.kode_cust and b.kode_lokasi = a.kode_lokasi "+
						"	  inner join ar_inv c on c.no_invoice = a.ref1 and c.kode_lokasi = a.kode_lokasi "+
						"		inner join ar_kontrak g on g.no_kontrak = c.no_kontrak and g.kode_lokasi = a.kode_lokasi "+
						"		left outer join curr d on d.kode_curr = a.kode_curr "+
						"		left outer join masakun e on e.kode_akun = a.akun_im and e.kode_lokasi = a.kode_lokasi "+
						"		left outer join masakun f on f.kode_akun = a.akun_pph and f.kode_lokasi = a.kode_lokasi "+
					"where a.kode_lokasi = '"+this.app._lokasi +"' and a.no_bukti = '"+sender.getText()+"' ");
				if (typeof(rs) == "object"){										
					this.dp_tgl.setDateString(rs.rs.rows[0].tanggal);
					this.e_jenis.setText(rs.rs.rows[0].jenis);
					this.e_dok.setText(rs.rs.rows[0].no_dokumen);
					this.e_cust.setText(rs.rs.rows[0].kode_cust);
					this.e_cust.setRightLabelCaption(rs.rs.rows[0].nama);
					this.e_invoice.setText(rs.rs.rows[0].ref1);
					this.e_invoice.setRightLabelCaption(rs.rs.rows[0].ket);
					this.e_nilai.setText(floatToNilai(rs.rs.rows[0].nilai));
					this.e_pph.setText(floatToNilai(rs.rs.rows[0].nilai_pph));
					this.e_curr.setText(rs.rs.rows[0].kode_curr);
					this.e_kurs.setText(floatToNilai(rs.rs.rows[0].kurs));
					this.e_akun.setText(rs.rs.rows[0].akun_im);
					this.e_akun.setRightLabelCaption(rs.rs.rows[0].nm_im);
					this.e_ket.setText(rs.rs.rows[0].keterangan);
					this.e_akunpph.setText(rs.rs.rows[0].akun_pph);
					this.e_akunpph.setRightLabelCaption(rs.rs.rows[0].nm_pph);
					this.akun_piutang = rs.rs.rows[0].akun_piutang;
					this.e_nilaitagihan.setText(floatToNilai(rs.rs.rows[0].n_ar));
					this.e_ppn.setText(floatToNilai(rs.rs.rows[0].ar_ppn));
				}
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	}
};
window.app_saku_ar_transaksi_fKorBayar.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e_akun)
			this.standarLib.showListData(this, "Data Master Akun",sender,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
									  "select count(*) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
									  ["a.kode_akun","a.nama"],"and",["Kode Akun","Keterangan"]);
		if (sender == this.e_akunpph)
			this.standarLib.showListData(this, "Data Master Akun",sender,undefined, 
									  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015' ",
									  "select count(*) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015' ",
									  ["a.kode_akun","a.nama"],"and",["Kode Akun","Keterangan"]);
		if (sender == this.e_cust)
			this.standarLib.showListData(this, "Data Customer",sender,undefined, 
								  "select  kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"' ",
								  "select count(*) from cust  where kode_lokasi = '"+this.app._lokasi+"'",
								  new Array("kode_cust","nama"),"and",new Array("Kode Cust","Nama "));
if (sender == this.e_curr)
	this.standarLib.showListData(this, "Data Currency",sender,undefined, 
								  "select kode_curr, nama from curr ",
								  "select count(*) from curr",
								  ["kode_curr","nama"],"where",["Kode Curr","Nama"]);
		if (sender == this.e_nb1)
			this.standarLib.showListData2(this, "Data Pembayaran",sender,undefined, 
								  "select a.no_bukti, a.keterangan, a.ref1 from arbyr_m a where a.kode_lokasi = '"+this.app._lokasi+"' and a.progress = '0' and posted = 'F' ",
								  "select count(*) from arbyr_m a  where a.kode_lokasi = '"+this.app._lokasi+"' and a.progress = '0' and posted = 'F' ",
								  ["a.no_bukti","a.keterangan"],"and",["No Bukti","Keterangan","No Invoice"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_ar_transaksi_fKorBayar.prototype.doRequestReady = function(sender, methodName, result)
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
		            }else system.alert(this,result,"");
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};
window.app_saku_ar_transaksi_fKorBayar.prototype.doSelectDate = function(sender, y, m, d){	
	this.e_periode.setText(y +""+ (m < 10 ? "0"+m:m));
	this.bGen.click();
};
window.app_saku_ar_transaksi_fKorBayar.prototype.PreviewJurnal = function(sender){	
	this.createJurnal();
	if (this.dtJurnal != undefined){								
		this.jurnal.setData(this.dtJurnal);
		this.jurnal.showModal();
	}
};
window.app_saku_ar_transaksi_fKorBayar.prototype.createJurnal = function(sender){	
	try{
		this.dtJurnal =new portalui_arrayMap();
		var data = new portalui_arrayMap();		
		var kdPP = this.app._kodePP;
		data.set("kode_akun",this.e_akun.getText());	
		data.set("dc","D");
		data.set("keterangan",this.e_ket.getText());
		data.set("nilai",nilaiToFloat(this.e_nilai.getText()) );
		data.set("kode_pp",kdPP);
		data.set("kode_drk",'-');
		this.dtJurnal.set(0,data);	
		
		data = new portalui_arrayMap();	
		data.set("kode_akun",this.e_akunpph.getText());	
		data.set("dc","D");
		data.set("keterangan",this.e_ket.getText());
		data.set("nilai",nilaiToFloat(this.e_pph.getText()));
		data.set("kode_pp",kdPP);
		data.set("kode_drk",'-');
		this.dtJurnal.set(1,data);		
		
		data = new portalui_arrayMap();	
		data.set("kode_akun",this.akun_piutang);	
		data.set("dc","C");
		data.set("keterangan",this.e_ket.getText());
		data.set("nilai",nilaiToFloat(this.e_nilai.getText())+ nilaiToFloat(this.e_pph.getText()));
		data.set("kode_pp",kdPP);
		data.set("kode_drk",'-');	
		this.dtJurnal.set(2,data);	
		
		var desc1 = new portalui_arrayMap();
		desc1.set("kode_akun",80);		
		desc1.set("dc",50);
		desc1.set("keterangan",250);
		desc1.set("nilai",100);
		desc1.set("kode_pp",80);
		desc1.set("kode_drk",80);
		var desc2 = new portalui_arrayMap();
		desc2.set("kode_akun","S");		
		desc2.set("dc","S");
		desc2.set("keterangan","S");
		desc2.set("nilai","N");
		desc2.set("kode_pp","S");
		desc2.set("kode_drk","S");	
		var dataDesc = new portalui_arrayMap();
		dataDesc.set(0,desc1);
		dataDesc.set(1,desc2);
		this.dtJurnal.setTag2(dataDesc);	
	}catch(e){
		system.alert(this,e,"");
	}
};