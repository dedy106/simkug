window.app_saku_anggaran_transaksi_fGardelK = function(owner)
{  
	if (owner)
	{
		window.app_saku_anggaran_transaksi_fGardelK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_anggaran_transaksi_fGardelK";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Anggaran Pengurang (ABK): Koreksi", 0);
		
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Tahun Anggaran");
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
	
		uses("portalui_saiCBBL");
		this.ed_nb = new portalui_saiCBBL(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(230);
		this.ed_nb.setCaption("No Bukti");
		this.ed_nb.setReadOnly(true);
	
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(256);
		this.bGen.setTop(54);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    this.bGen.hide();
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(76);
		this.ed_dok.setWidth(310);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		this.ed_desc.setTag("1");
		
		uses("portalui_saiCBBL");
		this.cb_curr = new portalui_saiCBBL(this);
		this.cb_curr.setLeft(20);
		this.cb_curr.setTop(120);
		this.cb_curr.setWidth(185);
		this.cb_curr.setCaption("Currency");
		this.cb_curr.setText("IDR");
		this.cb_curr.setReadOnly(true);
		this.cb_curr.setLabelWidth(100);
		this.cb_curr.setRightLabelVisible(false);
		this.cb_curr.setTag("9");
		
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(142);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setCaption("Dibuat Oleh");
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setRightLabelCaption("");
	
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(164);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setRightLabelCaption("");
	
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(700);
		this.ed_nilai.setTop(164);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Total ABK");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(true);
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(185);
	    this.p1.setWidth(900);
	    this.p1.setHeight(260);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Item Jurnal Transaksi');
    	
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(210);
	    this.sg1.setColCount(10);
		this.sg1.setColTitle(new Array("Kode Akun","Nama Akun","Kode Dept.","Nama Dept.","Kode RKM","Nama RKM","Periode","Volume","Satuan","Nilai Satuan"));
		this.sg1.setColWidth(new Array(9,8,7,6,5,4,3,2,1,0),new Array(100,50,80,50,120,80,120,80,120,60));	
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(2).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(5).setReadOnly(true);
		var val = new portalui_arrayMap();
			val.set(0, "01");
		    val.set(1, "02");
			val.set(2, "03");	
			val.set(3, "04");	
			val.set(4, "05");	
			val.set(5, "06");	
			val.set(6, "07");	
			val.set(7, "08");	
			val.set(8, "09");	
			val.set(9, "10");	
			val.set(10, "11");	
			val.set(11, "12");
		this.sg1.columns.get(6).setPicklist(val);
		this.sg1.columns.get(6).setButtonStyle(window.bsAuto);
		this.sg1.columns.get(7).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(9).setColumnFormat(window.cfNilai);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(234);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
	
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar;util_gridLib;util_addOnLib");
		    this.standarLib = new util_standar();
			this.gridLib=new util_gridLib();
			this.addOnLib = new util_addOnLib();
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.ed_nb.onBtnClick.set(this,"FindBtnClick");
			this.ed_nb.onChange.set(this,"doEditChange");
			
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear();
			this.sg1.appendRow();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_anggaran_transaksi_fGardelK.extend(window.portalui_childForm);
window.app_saku_anggaran_transaksi_fGardelK.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString());
};
window.app_saku_anggaran_transaksi_fGardelK.prototype.mainButtonClick = function(sender)
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
window.app_saku_anggaran_transaksi_fGardelK.prototype.simpan = function(event)
{	
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("delete from anggaran_d where no_agg ='"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			sql.add("delete from anggaran_m where no_agg ='"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			
			if (event === "ubah"){
				sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,"+
						"             kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+
						     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_nilai.getText())+",now(),'"+this.app._userLog+"','T','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"','ABK')");
				
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{			
					var nilai = parseNilai(this.sg1.getCell(7,i)) * parseNilai(this.sg1.getCell(9,i));
					sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input) values "+		
							"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(4,i)+
							"',"+parseNilai(this.sg1.getCell(7,i))+",'"+this.ed_period.getText()+this.sg1.getCell(6,i)+"',"+parseNilai(this.sg1.getCell(9,i))+","+nilai+",'C','"+this.sg1.getCell(8,i)+"'"+
							",'"+this.app._userLog+"',now())");
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
window.app_saku_anggaran_transaksi_fGardelK.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),undefined);				
				this.sg1.clear(); this.sg1.appendRow(); 
			}
			break;
		case "ubah" :	
		case "hapus" :
			this.simpan(event);
			break;
	}
	this.dp_tgl1.setFocus();
};
window.app_saku_anggaran_transaksi_fGardelK.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'anggaran_m','no_agg',this.app._lokasi+"-"+this.ed_period.getText().substr(0,4)+".",'0000'));
			this.ed_dok.setFocus();
		}
		else
		{
			system.alert(this,"Tahun harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_anggaran_transaksi_fGardelK.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_nb){
		var rs = this.dbLib.execSQL("select a.*, b.nama as nama_buat,c.nama as nama_setuju  "+				
				"	from anggaran_m a "+
				"	inner join karyawan b on b.nik = a.nik_buat and b.kode_lokasi = a.kode_lokasi "+
				"	inner join karyawan c on c.nik = a.nik_setuju and c.kode_lokasi = a.kode_lokasi "+
				"where a.no_agg = '"+sender.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
		if (typeof(rs) == "object"){
			rs = rs.rs.rows[0];
			this.ed_dok.setText(rs.no_dokumen);
			this.ed_desc.setText(rs.keterangan);
			this.cb_curr.setText(rs.kode_curr);
			this.cb_pembuat.setText(rs.nik_buat);
			this.cb_pembuat.setRightLabelCaption(rs.nama_buat);
			this.cb_setuju.setText(rs.nik_setuju);
			this.cb_setuju.setRightLabelCaption(rs.nama_setuju);
			this.ed_nilai.setText(floatToNilai(parseFloat(rs.nilai)));				
			rs = this.dbLib.execSQL("select a.kode_akun, b.nama as nama_akum, a.kode_pp, c.nama as nama_dept, a.kode_drk, d.nama, substring(a.periode,5,2) as periode, a.volume, a.satuan, a.nilai_sat "+
				"	from anggorgi_d a inner join masakun b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
				"	inner join pp c on c.kode_pp = a.kode_pp and c.kode_lokasi = a.kode_lokasi "+
				"	inner join drk d on d.kode_drk = a.kode_drk and d.kode_lokasi = a.kode_lokasi  and d.tahun = substring(a.periode,1,4) "+
				"	where a.no_agg = '"+this.ed_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");				
			this.sg1.setData(rs);
			this.sg1.setReadOnly(false);
			this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
			this.sg1.columns.get(1).setReadOnly(true);	
			this.sg1.columns.get(2).setButtonStyle(window.bsEllips);
			this.sg1.columns.get(3).setReadOnly(true);
			this.sg1.columns.get(4).setButtonStyle(window.bsEllips);
			this.sg1.columns.get(5).setReadOnly(true);
			var val = new portalui_arrayMap();
				val.set(0, "01");
			    val.set(1, "02");
				val.set(2, "03");	
				val.set(3, "04");	
				val.set(4, "05");	
				val.set(5, "06");	
				val.set(6, "07");	
				val.set(7, "08");	
				val.set(8, "09");	
				val.set(9, "10");	
				val.set(10, "11");	
				val.set(11, "12");
			this.sg1.columns.get(6).setPicklist(val);
			this.sg1.columns.get(6).setButtonStyle(window.bsAuto);
			this.sg1.columns.get(7).setColumnFormat(window.cfNilai);
			this.sg1.columns.get(9).setColumnFormat(window.cfNilai);
		}
	}	
};
window.app_saku_anggaran_transaksi_fGardelK.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (this.ed_nb){			
			this.standarLib.showListData(this, "Daftar Upload Anggaran",sender,undefined, 
										  "select distinct no_agg, keterangan  from anggaran_m where kode_lokasi ='"+this.app._lokasi+"' and jenis = 'ABK' and posted = 'F' and tanggal <= '"+this.dp_tgl1.getDateString()+"' ",
										  "select count(distinct no_agg, keterangan)  from anggaran_m where kode_lokasi ='"+this.app._lokasi+"' and jenis = 'ABK' and posted = 'F' and tanggal <= '"+this.dp_tgl1.getDateString()+"'",
										  ["no_agg","keterangan"],"where",["No Anggaran","Deskripsi"],false);
		}
		if (sender == this.cb_curr) 
		{
		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
										  "select kode_curr, nama  from curr",
										  "select count(kode_curr) from curr",
										  ["kode_curr","nama"],"where",["Kode Curr","Deskripsi"],false);
		}
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cb_setuju) 
		{   
		    this.standarLib.showListData(this, "Daftar yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_anggaran_transaksi_fGardelK.prototype.doFindBtnClick = function(sender, col, row) 
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
			case 2 : 
				this.standarLib.showListDataForSG(this, "Daftar Departemen",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  ["kode_pp","nama"],"and",["Kode PP","Deskripsi"],false);
				break;
			case 4 : 
				this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_drk, nama  from drk where tahun = '"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and block='0' and tipe = 'Posting'",
												  "select count(kode_drk) from drk where tahun = '"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and block='0' and tipe = 'Posting'",
												  ["kode_drk","nama"],"and",["Kode RKM","Deskripsi"],true);
				break;
		}
	}catch(e)
	{
		alert("[app_saku_anggaran_transaksi_fGardelK] : doFindBtnClick : " + e);
	}
};
window.app_saku_anggaran_transaksi_fGardelK.prototype.doNilaiChange = function()
{
	try
	{
		var tot = 0;
		
		for (var i = 0; i < this.sg1.rows.getLength();i++)
		{
			if ((this.sg1.getCell(9,i) != "") && (this.sg1.getCell(7,i) != ""))
				tot += nilaiToFloat(this.sg1.getCell(9,i)) * nilaiToFloat(this.sg1.getCell(7,i));
		}
		this.ed_nilai.setText(floatToNilai(tot));
	}catch(e)
	{
		alert("[app_saku_anggaran_transaksi_fGardelK]::doNilaiChange:"+e);
	}
};
window.app_saku_anggaran_transaksi_fGardelK.prototype.doCellExit = function()
{
	this.sg1.validasi();
};
window.app_saku_anggaran_transaksi_fGardelK.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_anggaran_transaksi_fGardelK.prototype.doAfterLoad = function(sender, result,data)
{
	try{	
	if (result){				
		var rs, arr;
		this.sg1.clear();		
		if (data instanceof portalui_arrayMap){
			for (var i in data.objList){
				rs = data.get(i);							
				arr = new Array();
				for (var j in rs.objList){
					if (j != "nilai")					
						arr[arr.length] = rs.get(j);				
					else arr[arr.length] = floatToNilai(parseFloat(rs.get(j)));				
				}
				this.sg1.appendData(arr);
			}						
		}
	}
	}catch(e)
	{
		alert(e);
	}
};