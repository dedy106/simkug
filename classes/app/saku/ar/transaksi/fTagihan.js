window.app_saku_ar_transaksi_fTagihan = function(owner)
{
  if (owner)
	{
		try
		{
			window.app_saku_ar_transaksi_fTagihan.prototype.parent.constructor.call(this,owner);
			this.className  = "app_saku_ar_transaksi_fTagihan";
			this.setTop(60);
			this.setWidth(1280);
			this.setHeight(550);
			this.itemsValue = new portalui_arrayList();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tagihan : Input", 0);
			
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
			this.dp_tgl.setWidth(95);
			
			uses("portalui_saiCBBL");
			this.e_nb = new portalui_saiCBBL(this);
			this.e_nb.setTop(20);
			this.e_nb.setLeft(20);
			this.e_nb.setCaption("No Tagihan");
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
			
			this.e_kontrak = new portalui_saiCBBL(this);
			this.e_kontrak.setTop(80);
			this.e_kontrak.setLeft(20);
			this.e_kontrak.setWidth(200);
			this.e_kontrak.setCaption("No Kontrak");		
			this.e_kontrak.setReadOnly(true);
			
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
			this.e_nilai.setReadOnly(true);
			this.e_nilai.setCaption("Nilai");		
			
			this.e_ppn = new portalui_saiLabelEdit(this);
			this.e_ppn.setTop(68);
			this.e_ppn.setLeft(20);
			this.e_ppn.setWidth(180);
			this.e_ppn.setTipeText(ttNilai);
			this.e_ppn.setReadOnly(true);
			this.e_ppn.setCaption("PPN");		
			
			this.e_curr = new portalui_saiCBBL(this);
			this.e_curr.setTop(70);
			this.e_curr.setLeft(20);
			this.e_curr.setWidth(200);
			this.e_curr.setCaption("Currency");
			
			this.e_kurs = new portalui_saiLabelEdit(this);
			this.e_kurs.setTop(75);
			this.e_kurs.setLeft(20);
			this.e_kurs.setWidth(180);
			this.e_kurs.setTipeText(ttNilai);
			this.e_kurs.setCaption("Kurs");			
			
			this.b_jurnal = new portalui_button(this);
			this.b_jurnal.setTop(85);
			this.b_jurnal.setLeft(120);
			this.b_jurnal.setWidth(78);
			this.b_jurnal.setCaption("Cek Jurnal");		
			
			this.e_nb.onBtnClick.set(this, "FindBtnClick");
			this.e_nb.onChange.set(this,"doChange");
			
			this.e_cust.onBtnClick.set(this,"FindBtnClick");
			this.e_cust.onChange.set(this,"doChange");
			
			this.e_curr.onBtnClick.set(this,"FindBtnClick");
			this.e_curr.onChange.set(this,"doChange");
			
			this.e_kontrak.onBtnClick.set(this, "FindBtnClick");
			this.e_kontrak.onChange.set(this, "doChange");
			this.dp_tgl.onSelect.set(this,"doSelectDate");
			this.bGen.onClick.set(this,"doGenerate");
			this.dp_tgl.setDateString((new Date).getDateStr());	
			this.b_jurnal.onClick.set(this,"PreviewJurnal");
			
			setTipeButton(tbSimpan);
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
		}catch(e)
		{
			alert("[app_saku_ar_transaksi_fTagihan]->constructor : "+e);
		}
	}
};
window.app_saku_ar_transaksi_fTagihan.extend(window.portalui_childForm);
window.app_saku_ar_transaksi_fTagihan.prototype.mainButtonClick = function(sender)
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
window.app_saku_ar_transaksi_fTagihan.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e_nb);				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0"])))
			{
				try
				{
					this.createJurnal();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					
					sql.add("insert into ar_inv (no_invoice, kode_lokasi, periode, tanggal, no_dokumen, keterangan,nilai, kode_curr, kurs, nilai_ppn,no_kontrak, kode_pp, flag_hapus, progress, nilai_bd) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"' "+
								","+parseNilai(this.e_nilai.getText())+",'"+this.e_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.e_kontrak.getText()+"','"+this.app._kodePP+"','0','0',0) ");
					sql.add("update ar_kontrak set progress = '1' where no_kontrak = '"+this.e_kontrak.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					var urut = 0;
					var scriptJurnal = "insert into ar_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode, nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
					for (var i in this.dtJurnal.objList){
						line = this.dtJurnal.get(i);									
						if (line.get("dc") =="D"){
							if (i >0) {scriptJurnal += ",";}
							urut++;
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
window.app_saku_ar_transaksi_fTagihan.prototype.doGenerate = function(sender)
{
	this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "ar_inv","no_invoice","INV."+this.e_periode.getText().substr(2 ),"00000","and kode_lokasi ='"+this.app._lokasi+"' "));
};
window.app_saku_ar_transaksi_fTagihan.prototype.doChange = function(sender)
{
	if (sender.getText() != "")
	{
		if (sender == this.e_kontrak){
			try
			{
				var rs = this.dbLib.execSQL("select a.akun_pdpt, a.akun_piutang, a.akun_ppn, a.nilai, a.nilai_ppn, a.kode_curr, a.kurs, b.nama from ar_kontrak a inner join curr b on b.kode_curr = a.kode_curr where kode_lokasi = '"+this.app._lokasi +"' and no_kontrak = '"+this.e_kontrak.getText()+"' ");
				if (typeof(rs) == "object"){
					this.akun_pdpt = rs.rs.rows[0].akun_pdpt;
					this.akun_piutang = rs.rs.rows[0].akun_piutang;
					this.akun_ppn = rs.rs.rows[0].akun_ppn;					
					this.e_nilai.setText(floatToNilai(rs.rs.rows[0].nilai));
					this.e_ppn.setText(floatToNilai(rs.rs.rows[0].nilai_ppn));
					this.e_curr.setText(rs.rs.rows[0].kode_curr);
					this.e_curr.setRightLabelCaption(rs.rs.rows[0].nama);
					this.e_kurs.setText(floatToNilai(rs.rs.rows[0].kurs));
				}
			}catch(e)
			{
				system.alert(this, e,rs.rs.rows[0]);
			}
		}
	}
};
window.app_saku_ar_transaksi_fTagihan.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e_nb)
			this.standarLib.showListData(this, "Data Kontrak",sender,undefined, 
									  "select no_invoice, keterangan from ar_inv where kode_lokasi='"+this.app._lokasi+"'",
									  "select count(*) from ar_inv where kode_lokasi='"+this.app._lokasi+"'",
									  ["no_inv","keterangan"],"and",["No Invoice","Keterangan"]);
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
		if (sender == this.e_kontrak)
			this.standarLib.showListData(this, "Data Kontrak",sender,undefined, 
									  "select no_kontrak, keterangan from ar_kontrak where kode_lokasi = '"+this.app._lokasi+"' and kode_cust = '"+this.e_cust.getText()+"' and progress = '0' and tgl_tagih <= '"+this.dp_tgl.getDateString()+"' ",
									  "select count(*) from ar_kontrak where kode_lokasi = '"+this.app._lokasi+"' and kode_cust = '"+this.e_cust.getText()+"' and progress = '0' and tgl_tagih <= '"+this.dp_tgl.getDateString()+"'",
									["no_kontrak","keterangan"],"where",["No Kontrak","Keterangan"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_ar_transaksi_fTagihan.prototype.doRequestReady = function(sender, methodName, result)
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
	    };
	}
};
window.app_saku_ar_transaksi_fTagihan.prototype.doSelectDate = function(sender, y, m, d){	
	this.e_periode.setText(y +""+ (m < 10 ? "0"+m:m));
	this.bGen.click();
};
window.app_saku_ar_transaksi_fTagihan.prototype.PreviewJurnal = function(sender){	
	this.createJurnal();
	if (this.dtJurnal != undefined){								
		this.jurnal.setData(this.dtJurnal);
		this.jurnal.showModal();
	}
};
window.app_saku_ar_transaksi_fTagihan.prototype.createJurnal = function(sender){	
	this.dtJurnal =new portalui_arrayMap();
	var data = new portalui_arrayMap();		
	var kdPP = this.app._kodePP;
	data.set("kode_akun",this.akun_piutang);	
	data.set("dc","D");
	data.set("keterangan",this.e_ket.getText());
	data.set("nilai",nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText()));
	data.set("kode_pp",kdPP);
	data.set("kode_drk",'-');
	this.dtJurnal.set(0,data);	
	data = new portalui_arrayMap();		
	data.set("kode_akun",this.akun_pdpt);	
	data.set("dc","C");
	data.set("keterangan",this.e_ket.getText());
	data.set("nilai",nilaiToFloat(this.e_nilai.getText()));
	data.set("kode_pp",kdPP);
	data.set("kode_drk",'-');
	this.dtJurnal.set(1,data);	
	
	data = new portalui_arrayMap();		
	data.set("kode_akun",this.akun_ppn);	
	data.set("dc","C");
	data.set("keterangan",this.e_ket.getText());
	data.set("nilai",nilaiToFloat(this.e_ppn.getText()));
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
};