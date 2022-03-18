window.app_saku_logistik_transaksi_fTr2 = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fTr2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fTr2";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Temporary Receive: Input", 0);	

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
	        
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(78);
		this.ed_dok.setWidth(310);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(122);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Penerima");
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption("");
		
		this.cb_po = new portalui_saiCBBL(this);
		this.cb_po.setLeft(20);
		this.cb_po.setTop(144);
		this.cb_po.setWidth(250);
		this.cb_po.setCaption("No PO");
		this.cb_po.setReadOnly(true);
		this.cb_po.setLabelWidth(100);
		this.cb_po.setRightLabelVisible(false);
		this.cb_po.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(270);
		this.bShow.setTop(144);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.bOk = new portalui_button(this);
		this.bOk.setLeft(845);
		this.bOk.setTop(144);
		this.bOk.setCaption("Detail");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(760);
		this.bPAll.setTop(144);
		this.bPAll.setCaption("APP All");
		
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
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.cb_po.onBtnClick.set(this, "FindBtnClick");
			this.cb_po.onChange.set(this, "doEditChange");
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

			this.standarLib.clearByTag(this, new Array("0","9"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow(); this.sg2.clear(); this.sg2.appendRow();
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fTr2.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fTr2.prototype.mainButtonClick = function(sender)
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
window.app_saku_logistik_transaksi_fTr2.prototype.simpan = function()
{
	this.bGen.click();
	var y = 0;
	for (var i = 0; i < this.sg1.rows.getLength();i++)
	{
		y++;
		this.sg1.setCell(0,i,this.ed_nb.getText()+'-'+formatNumeric('0000',y));
	}
	
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
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
window.app_saku_logistik_transaksi_fTr2.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","9"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
				this.sg1.clear();  this.sg1.appendRow(); this.sg2.clear(); this.sg2.appendRow();
			}
			break;
			
		case "simpan" :
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
window.app_saku_logistik_transaksi_fTr2.prototype.genClick = function(sender)
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
window.app_saku_logistik_transaksi_fTr2.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg2.rows.getLength(); i++)
	{
		this.sg2.setCell(0,i,"APP");
	}
};
window.app_saku_logistik_transaksi_fTr2.prototype.showClick = function(sender)
{
	this.sg2.clear(); 
	var strSql =  " select 'INPROG' as status,a.kode_brg,c.nama as nama_brg,a.kode_sat,a.kode_akun,"+
	              "             (case '"+this.ppnlog+"' when '0' then a.nilai else (a.nilai + round(a.nilai * "+this.pppn+")) end) as nilai,"+
				  "             sum(a.jumlah) as jumlah,sum(a.jumlah)-ifnull(b.terima,0) as sisa,c.merk,c.tipe,d.jenis "+
				  " from po_d a inner join barang_m c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi "+
				  "				inner join barang_klp d on c.kode_klpbrg = d.kode_klpbrg and c.kode_lokasi = d.kode_lokasi "+
				  "             left outer join "+
				  " 		    (select y.kode_akun,y.kode_brg,x.no_po,sum(y.jumlah) as terima from tr_m x "+
				  "              inner join tr_d y on x.no_tr=y.no_tr and x.kode_lokasi = y.kode_lokasi and y.progress<>'X' "+
				  "              where x.no_del='-' group by y.kode_akun,y.kode_brg,x.no_po) b "+
				  "             on b.kode_brg=a.kode_brg and b.kode_akun=a.kode_akun and b.no_po=a.no_po "+
				  " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_po='"+this.cb_po.getText()+"' and a.status='1' group by a.kode_brg,c.nama,a.kode_sat,a.kode_akun ";
	
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
							  line.get("merk"),line.get("tipe"),line.get("nilai"),line.get("jumlah"),line.get("sisa"),line.get("sisa"),line.get("jenis")));					
			}
			this.sg2.validasi();
		} 
	}
};
window.app_saku_logistik_transaksi_fTr2.prototype.okClick = function(sender)
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
					nilaiHP = nilaiToFloat(this.sg2.getCell(7,i)); // *  nilaiToFloat(this.sg2.getCell(10,i)); sudah ditambah field jumlah jd gak perlu dikalikan lg
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
window.app_saku_logistik_transaksi_fTr2.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_saku_logistik_transaksi_fTr2.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
	}
	if (sender == this.cb_po)
	{
		this.sg1.clear(); this.sg1.appendRow();
		this.sg2.clear(); this.sg2.appendRow();
	}
};
window.app_saku_logistik_transaksi_fTr2.prototype.doCellChange = function(sender, col, row) 
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
		alert("[app_saku_logistik_transaksi_fTr2] : doChange : " + e);
	}
};
window.app_saku_logistik_transaksi_fTr2.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_po) 
		{   
		    this.standarLib.showListData(this, "Daftar Purchase Order",this.cb_po,undefined, 
										  "select no_po, keterangan  from po_m where kode_lokasi='"+this.app._lokasi+"' and no_del='-' and periode<='"+this.ed_period.getText()+"' and progress = '1'",
										  "select count(no_po)       from po_m where kode_lokasi='"+this.app._lokasi+"' and no_del='-' and periode<='"+this.ed_period.getText()+"' and progress = '1'",
										  new Array("no_po","keterangan"),"and",new Array("No PO","Keterangan"),false);
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
window.app_saku_logistik_transaksi_fTr2.prototype.doRequestReady = function(sender, methodName, result)
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