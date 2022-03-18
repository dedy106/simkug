window.app_saku_logistik_transaksi_fTr2k = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fTr2k.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fTr2k";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Temporary Receive: Koreksi",0);
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Periode");
		this.ed_period.setReadOnly(true);
		this.ed_period.setTag("9");
	
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
	
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(56);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No TR");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.cb_bukti = new portalui_saiCBBL(this);
		this.cb_bukti.setLeft(680);
		this.cb_bukti.setTop(78);
		this.cb_bukti.setWidth(225);
		this.cb_bukti.setText("");
		this.cb_bukti.setCaption("No TR Lama");
		this.cb_bukti.setReadOnly(true);
		this.cb_bukti.setLabelWidth(100);
		this.cb_bukti.setRightLabelVisible(false);
		this.cb_bukti.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(902);
		this.bShow.setTop(78);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(78);
		this.ed_dok.setWidth(310);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		this.ed_dok.setTag("2");
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("2");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(122);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Penerima");
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption("");
		this.cb_pembuat.setTag("2");
		
		this.cb_po = new portalui_saiCBBL(this);
		this.cb_po.setLeft(20);
		this.cb_po.setTop(144);
		this.cb_po.setWidth(250);
		this.cb_po.setCaption("No PO");
		this.cb_po.setReadOnly(true);
		this.cb_po.setLabelWidth(100);
		this.cb_po.setRightLabelVisible(false);
		this.cb_po.setRightLabelCaption("");
		this.cb_po.setTag("2");
		
		this.bOk = new portalui_button(this);
		this.bOk.setLeft(845);
		this.bOk.setTop(144);
		this.bOk.setCaption("Detail");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(760);
		this.bPAll.setTop(144);
		this.bPAll.setCaption("INPROG");
		
	    this.p2 = new portalui_panel(this);
	    this.p2.setLeft(20);
	    this.p2.setTop(166);
	    this.p2.setWidth(900);
	    this.p2.setHeight(135);
	    this.p2.setName('p2');
	    this.p2.setCaption('Daftar Item Barang PO');
		
		uses("portalui_saiGrid");
    	this.sg2 = new portalui_saiGrid(this.p2);
    	this.sg2.setLeft(1);
	    this.sg2.setTop(20);
    	this.sg2.setWidth(895);
    	this.sg2.setHeight(110);
	    this.sg2.setColCount(12);
		this.sg2.setColTitle(["Status","Kode Brg","Nama Barang","Satuan","Kode Akun","Merk","Tipe","Harga","Jml PO","Sisa Blm Trm","Jml yg Diterima","Jenis"]);
		this.sg2.setColWidth([11,10, 9,8,7,6,5,4,3,2,1,0],[80,80, 80,80,100,100,100,60,50,150,80,60]);
		this.sg2.setReadOnly(false);
		this.sg2.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "APP");
			val.set(2, "INPROG");
		this.sg2.columns.get(0).setPicklist(val);
		this.sg2.columns.get(1).setReadOnly(true);	
		this.sg2.columns.get(2).setReadOnly(true);	
		this.sg2.columns.get(3).setReadOnly(true);	
		this.sg2.columns.get(4).setReadOnly(true);	
		this.sg2.columns.get(5).setReadOnly(true);	
		this.sg2.columns.get(6).setReadOnly(true);	
		this.sg2.columns.get(7).setReadOnly(true);	
		this.sg2.columns.get(8).setReadOnly(true);	
		this.sg2.columns.get(9).setReadOnly(true);	
		this.sg2.columns.get(11).setReadOnly(true);
		this.sg2.columns.get(7).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(8).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(9).setColumnFormat(window.cfNilai);
		this.sg2.columns.get(10).setColumnFormat(window.cfNilai);
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(305);
	    this.p1.setWidth(900);
	    this.p1.setHeight(165);
	    this.p1.setName('p2');
	    this.p1.setCaption('Detail Item Barang yang Diterima');
		
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(140);
	    this.sg1.setColCount(10);
		this.sg1.setColTitle(["No Temp","Kode Brg","Nama Barang","Satuan","Kode Akun","Harga","Merk","Tipe","No Seri","Jumlah"]);
		this.sg1.setColWidth([9,8,7,6,5,4,3,2,1,0],[80,110,100,110,100,80,50,120,80,120]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setReadOnly(true);	
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setReadOnly(true);	
		this.sg1.columns.get(3).setReadOnly(true);	
		this.sg1.columns.get(4).setReadOnly(true);	
		this.sg1.columns.get(5).setReadOnly(true);	
		this.sg1.columns.get(9).setReadOnly(true);	
		this.sg1.columns.get(5).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(9).setColumnFormat(window.cfNilai);
		
		setTipeButton(tbUbahHapus);
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
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.bShow.onClick.set(this, "showClick");
			this.bOk.onClick.set(this, "okClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg2.onChange.set(this, "doCellChange");
			
			data = this.dbLib.runSQL("select flag from spro where kode_spro = 'PPNLOG' and kode_lokasi='"+this.app._lokasi+"'");
			var row = undefined;
			row = data.get(0);
			this.ppnlog = row.get("flag");			
			
			data = this.dbLib.runSQL("select value1 from spro where kode_spro = 'PPPNM' and kode_lokasi='"+this.app._lokasi+"'");
			var row = undefined;
			row = data.get(0);
			this.pppn = parseFloat(row.get("value1"))/100;

			this.standarLib.clearByTag(this, new Array("0","2","9"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow(); this.sg2.clear(); this.sg2.appendRow();
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fTr2k.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fTr2k.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_transaksi_fTr2k.prototype.ubah = function()
{
	this.bGen.click();
	var y = 0;
	for (var i = 0; i < this.sg1.rows.getLength();i++)
	{
		y++;
		this.sg1.setCell(0,i,this.ed_nb.getText()+'-'+formatNumeric('0000',y));
	}
	
	if (this.standarLib.checkEmptyByTag(this, new Array("0","2")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			if (parseFloat(this.periodeLama) < parseFloat(this.app._periode))
			{
				sql.add(" update tr_m set no_del = 'DEL' where no_tr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" update tr_d set progress = 'X' where no_tr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}
			else
			{
				sql.add(" delete from tr_m where no_tr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add(" delete from tr_d where no_tr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			}
			
			sql.add("insert into tr_m (no_tr,kode_lokasi,no_dokumen,no_po,tanggal,keterangan,"+
					"             periode,nik_terima,tgl_input,nik_user,no_del,no_link) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.cb_po.getText()+"','"+
					this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.ed_period.getText()+"','"+this.cb_pembuat.getText()+"',now(),'"+this.app._userLog+"','-','-')");
			
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{			
				var j = i+1;
				sql.add("insert into tr_d (no_tr,no_urut,kode_brg,kode_lokasi,kode_sat,kode_akun,merk,tipe,no_seri,no_tag,harga,progress,jumlah) values "+	
						"('"+this.ed_nb.getText()+"',"+j+",'"+this.sg1.getCell(1,i)+"','"+this.app._lokasi+"','"+this.sg1.getCell(3,i)+"','"+this.sg1.getCell(4,i)+"','"+
						this.sg1.getCell(6,i)+"','"+this.sg1.getCell(7,i)+"','"+this.sg1.getCell(8,i)+"','"+this.sg1.getCell(0,i)+"',"+parseNilai(this.sg1.getCell(5,i))+",'0',"+parseNilai(this.sg1.getCell(9,i))+")");
			}

			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_logistik_transaksi_fTr2k.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","2","9"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear();  this.sg1.appendRow(); this.sg2.clear(); this.sg2.appendRow();
			}
			break;
			
		case "ubah" :
			var cekData = "F";
			for (var i=0; i < this.sg2.rows.getLength(); i++)
			{
				if (this.sg2.getCell(0,i) == "APP") 
				cekData = "T";
			}			
			if (cekData == "F")
			{
				system.alert(this,"Tidak ada transaksi yang diapprove.","Pilih APP untuk meng-generate detail di kolom status.");
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
					sql.add(" update tr_m set no_del = 'DEL' where no_tr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" update tr_d set progress = 'X' where no_tr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				else
				{
					sql.add(" delete from tr_m where no_tr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add(" delete from tr_d where no_tr ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				}
				this.dbLib.execArraySQL(sql);	
			} catch(e)
			{
				alert(e)
			}
		    break;			
	}
};
window.app_saku_logistik_transaksi_fTr2k.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tr_m','no_tr',this.app._lokasi+"-TR"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_saku_logistik_transaksi_fTr2k.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg2.rows.getLength(); i++)
	{
		this.sg2.setCell(0,i,"INPROG");
	}
};
window.app_saku_logistik_transaksi_fTr2k.prototype.showClick = function(sender)
{
	if (this.cb_bukti.getText() != "")
	{
		var line,data = this.dbLib.runSQL("select a.periode,a.keterangan,a.no_dokumen,a.nik_terima,b.nama as nama_terima,a.no_po "+
										  "from tr_m a inner join karyawan b on a.nik_terima = b.nik and a.kode_lokasi=b.kode_lokasi "+
										  "where a.no_tr='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.periodeLama = line.get("periode");
				this.ed_desc.setText(line.get("keterangan"));
				this.ed_dok.setText(line.get("no_dokumen"));
				this.cb_pembuat.setText(line.get("nik_terima"));
				this.cb_pembuat.setRightLabelCaption(line.get("nama_terima"));
				this.cb_po.setText(line.get("no_po"));
			} 
		}

		this.sg2.clear(); 
		var strSql =  " select 'APP' as status,a.kode_brg,c.nama as nama_brg,a.kode_sat,a.kode_akun,"+
		              "             (case '"+this.ppnlog+"' when '0' then a.nilai else (a.nilai + round(a.nilai * "+this.pppn+")) end) as nilai,"+
					  "             sum(a.jumlah) as jumlah,sum(a.jumlah)-ifnull(b.terima_all,0) as sisa,c.merk,c.tipe,d.jenis,e.terima "+
					  " from po_d a inner join barang_m c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi "+
					  "				inner join barang_klp d on c.kode_klpbrg = d.kode_klpbrg and c.kode_lokasi = d.kode_lokasi "+
					  "             inner join "+
					  " 		    (select i.no_tr,j.kode_akun,j.kode_brg,i.no_po,sum(j.jumlah) as terima from tr_m i "+
					  "              inner join tr_d j on i.no_tr=j.no_tr and i.kode_lokasi=j.kode_lokasi and j.progress<>'X' "+
					  "              where i.no_del='-' and i.no_tr = '"+this.cb_bukti.getText()+"' "+
					  "              group by i.no_tr,i.no_po,j.kode_akun,j.kode_brg,i.no_po) e "+
					  "             on e.kode_brg=a.kode_brg and e.kode_akun=a.kode_akun and e.no_po=a.no_po "+				  
					  "             left outer join "+
					  " 		    (select y.kode_akun,y.kode_brg,x.no_po,sum(y.jumlah) as terima_all from tr_m x "+
					  "              inner join tr_d y on x.no_tr=y.no_tr and x.kode_lokasi = y.kode_lokasi and y.progress<>'X' "+
					  "              where x.no_del='-' and x.no_tr <> '"+this.cb_bukti.getText()+"' group by y.kode_akun,y.kode_brg,x.no_po) b "+
					  "             on b.kode_brg=a.kode_brg and b.kode_akun=a.kode_akun and b.no_po=a.no_po "+
					  " where a.kode_lokasi='"+this.app._lokasi+"' and e.no_tr='"+this.cb_bukti.getText()+"' and a.status='1' group by a.kode_brg,c.nama,a.kode_sat,a.kode_akun order by a.no_urut";
		
		var line,data = this.dbLib.runSQL(strSql);
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				for (var i in data.objList)
				{
					line = data.get(i);
					this.gridLib.SGAppendData(this.sg2,new Array(0,1,2,3,4,5,6,7,8,9,10,11),
					    new Array(line.get("status").toUpperCase(),line.get("kode_brg"),line.get("nama_brg"),line.get("kode_sat"),line.get("kode_akun"),
								  line.get("merk"),line.get("tipe"),line.get("nilai"),line.get("jumlah"),line.get("sisa"),line.get("terima"),line.get("jenis")));					
				}
				this.sg2.validasi();
			} 
		}

		this.sg1.clear(); 
		var strSql =  " select a.no_tag,a.kode_brg,b.nama as nama_brg,a.kode_sat,a.kode_akun,a.harga,a.merk,a.tipe,a.no_seri,a.jumlah "+
		              " from tr_d a inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
					  " where a.no_tr = '"+this.cb_bukti.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.progress<>'X' order by a.no_tag";
		
		var line,data = this.dbLib.runSQL(strSql);
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				for (var i in data.objList)
				{
					line = data.get(i);
					this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9),
					    new Array(line.get("no_tag").toUpperCase(),line.get("kode_brg"),line.get("nama_brg"),line.get("kode_sat"),
						          line.get("kode_akun"),line.get("harga"),
								  line.get("merk"),line.get("tipe"),line.get("no_seri"),line.get("jumlah")));					
				}
				this.sg1.validasi();
			} 
		}	
	}
};
window.app_saku_logistik_transaksi_fTr2k.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_logistik_transaksi_fTr2k.prototype.okClick = function(sender)
{
	var vApp = "F";
	var j = 0; 
	for (var i=0; i < this.sg2.rows.getLength(); i++)
	{
		if (this.sg2.getCell(0,i).toUpperCase() == "APP") 
		{
			j = i +1;
			if (nilaiToFloat(this.sg2.getCell(10,i)) > nilaiToFloat(this.sg2.getCell(9,i)))
			{
				system.alert(this,"Jumlah terima tidak valid.","Jumlah terima melebihi sisa barang PO[baris: "+j+"].");
				return false;
			}
			vApp = "T";
		}
	}
	if (vApp == "F")
	{
		system.alert(this,"Tidak ada data yang di-APP untuk diterima.","Pilih APP di kolom status untuk terima barang.");
		return false;
	}
	
	if (this.ed_nb.getText() == "")
	{
		system.alert(this,"No bukti TR tidak valid.","No TR harus terisi / tergenerate.");
	}
	else	
	{
		this.sg1.clear(); var x = y = -1; 
		var nilaiHP = 0;
		for (var i=0; i < this.sg2.rows.getLength(); i++)
		{
			if (this.sg2.getCell(0,i).toUpperCase() == "APP") 
			{
				if (this.sg2.getCell(11,i) != "HABISPAKAI")
				{
					if ((this.sg2.getCell(0,i).toUpperCase() == "APP") && (this.sg2.getCell(10,i) != "0"))
					{
						for (var j = 0; j < nilaiToFloat(this.sg2.getCell(10,i));j++)
						{
							x++;
							y=x+1;
							this.sg1.appendRow();
							this.sg1.setCell(0,x,this.ed_nb.getText()+'-'+formatNumeric('0000',y));
							this.sg1.setCell(1,x,this.sg2.getCell(1,i));
							this.sg1.setCell(2,x,this.sg2.getCell(2,i));
							this.sg1.setCell(3,x,this.sg2.getCell(3,i));
							this.sg1.setCell(4,x,this.sg2.getCell(4,i));
							this.sg1.setCell(5,x,this.sg2.getCell(7,i));
							this.sg1.setCell(6,x,this.sg2.getCell(5,i));
							this.sg1.setCell(7,x,this.sg2.getCell(6,i));
							this.sg1.setCell(8,x,"-");
							this.sg1.setCell(9,x,"1");
						}
					}
				}
				else   //why ??? ------> j : buat dipakai di spb log final
				{
					nilaiHP = nilaiToFloat(this.sg2.getCell(7,i)); // *  nilaiToFloat(this.sg2.getCell(10,i)); sudah ditambah field jumlah
					x++;
					y=x+1;
					this.sg1.appendRow();
					this.sg1.setCell(0,x,this.ed_nb.getText()+'-'+formatNumeric('0000',y));
					this.sg1.setCell(1,x,this.sg2.getCell(1,i));
					this.sg1.setCell(2,x,this.sg2.getCell(2,i));
					this.sg1.setCell(3,x,this.sg2.getCell(3,i));
					this.sg1.setCell(4,x,this.sg2.getCell(4,i));
					this.sg1.setCell(5,x,floatToNilai(nilaiHP));
					this.sg1.setCell(6,x,this.sg2.getCell(5,i));
					this.sg1.setCell(7,x,this.sg2.getCell(6,i));
					this.sg1.setCell(8,x,"-");
					this.sg1.setCell(9,x,this.sg2.getCell(10,i));
				}
			}
		}
	}
};
window.app_saku_logistik_transaksi_fTr2k.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
};
window.app_saku_logistik_transaksi_fTr2k.prototype.doCellChange = function(sender, col, row) 
{
	try
	{
		switch(col)
		{
			case 0 : 
					if (this.sg1.getCell(0,0) != "") {this.sg1.clear(); this.sg1.appendRow();}
				break;
		}
	}catch(e)
	{
		alert("[app_saku_logistik_transaksi_fTr2k] : doChange : " + e);
	}
};
window.app_saku_logistik_transaksi_fTr2k.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_bukti) 
		{   
		    this.standarLib.showListData(this, "Daftar Temporary Receive",this.cb_bukti,undefined, 
										  "select a.no_tr, a.keterangan  from tr_m a inner join po_m b on a.no_po = b.no_po and a.kode_lokasi=b.kode_lokasi "+
										  "where a.kode_lokasi='"+this.app._lokasi+"' and b.progress not in ('9','F','J') and a.periode<='"+this.ed_period.getText()+"'",
										  "select a.no_tr, a.keterangan  from tr_m a inner join po_m b on a.no_po = b.no_po and a.kode_lokasi=b.kode_lokasi "+
										  "where a.kode_lokasi='"+this.app._lokasi+"' and b.progress not in ('9','F','J') and a.periode<='"+this.ed_period.getText()+"'",
										  new Array("no_tr","keterangan"),"and",new Array("No TR","Keterangan"),false);
		    this.sg1.clear(); this.sg1.appendRow();
			this.sg2.clear(); this.sg2.appendRow();
			this.standarLib.clearByTag(this, new Array("2"),undefined);				
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Penerima",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_logistik_transaksi_fTr2k.prototype.doRequestReady = function(sender, methodName, result)
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