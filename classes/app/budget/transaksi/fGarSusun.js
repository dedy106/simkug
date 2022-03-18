window.app_saku_anggaran_transaksi_fGarSusun = function(owner)
{  
	if (owner)
	{
		window.app_saku_anggaran_transaksi_fGarSusun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_anggaran_transaksi_fGarSusun";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyusunan Data Anggaran: Input", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Tahun Anggaran",tag:9, readOnly:true});
		this.lblTgl1 = new portalui_label(this,{bound:[20,11,101,20],caption:"Tgl Anggaran",underline:true});				
		uses("portalui_datePicker;portalui_saiCBBL;portalui_uploader;portalui_saiGrid");	
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,11,82,18]});
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,12,230,20],caption:"No Bukti", readOnly:true});
		this.bGen = new portalui_button(this,{bound:[256,12,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,13,310,20], caption:"No Dokumen", maxLength:50, tag:1});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,14,500,20], caption:"Deskripsi", maxLength:150, tag:1});		
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,15,185,20],caption:"Currency", text:"IDR"});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,16,185, 20], caption:"Dibuat Oleh"});			
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,17,185,20], caption:"Disetujui Oleh"});
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total Pengajuan", tipeText:ttNilai, readOnly:true, text:"0"});
		
		this.uploader = new portalui_uploader(this,{bound:[600,17, 80, 20],afterLoad:[this,"doAfterLoad"], param4:"gridupload", param3:"kode_akun;nama_akun;kode_dept;nama_dept;kode_rkm;nama_rkm;periode;volume;satuan;nilai", autoSubmit:true});		
	    this.p1 = new portalui_panel(this,{bound:[20, 18, 900, 260], caption:"Daftar Item Jurnal Transaksi"});	    
    			
    	this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898, 210],colCount:10, colTitle:["Kode Akun","Nama Akun","Kode Dept.","Nama Dept.","Kode RKM","Nama RKM","Periode","Volume","Satuan","Nilai Satuan"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,50,80,50,120,80,120,80,120,60]], buttonStyle:[[0,2,4,6],[bsEllips, bsEllips, bsEllips, bsAuto]],
				colReadOnly:[true,[1,3,5],[]],colFormat:[[7,9],[cfNilai, cfNilai]]});    			
		var val = new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]});			
		this.sg1.columns.get(6).setPicklist(val);				
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,234,898, 25], buttonStyle:bsTransExt, pager:[this,"doSelectedPage"]});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
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
window.app_saku_anggaran_transaksi_fGarSusun.extend(window.portalui_childForm);
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString());
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.mainButtonClick = function(sender)
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
window.app_saku_anggaran_transaksi_fGarSusun.prototype.simpan = function()
{	
	try
	{
		if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
		{
			system.alert(this,"Total pengajuan tidak boleh nol atau kurang.","");
			return false;
		}
	} catch (e)
	{
		system.alert(this, e,"");
	}
	
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
	{
		try
		{
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("insert into anggsusun_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,"+
					"             kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+
					     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_nilai.getText())+",now(),'"+this.app._userLog+"','F','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"','ORGI')");
			
			if (this.dataAgg == undefined)
			{
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{								
					var nilai = nilaiToFloat(this.sg1.getCell(7,i)) * nilaiToFloat(this.sg1.getCell(9,i));
					sql.add("insert into anggsusun_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input) values "+		
							"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(4,i)+
							"',"+parseNilai(this.sg1.getCell(7,i))+",'"+this.ed_period.getText()+this.sg1.getCell(6,i)+"',"+parseNilai(this.sg1.getCell(9,i))+","+nilai+",'D','"+this.sg1.getCell(8,i)+"'"+
							",'"+this.app._userLog+"',now())");
				}
			} else
			{
				var line, nilai;
				for (var i in this.dataAgg.objList){	
					line = this.dataAgg.get(i);					
					nilai =  parseFloat(line.get("volume")) * parseFloat(line.get("nilai"));
					sql.add("insert into anggsusun_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input) values "+		
							"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.get("kode_dept")+"','"+line.get("kode_akun")+"','"+line.get("kode_rkm")+
							"',"+parseFloat(line.get("volume"))+",'"+this.ed_period.getText()+line.get("periode")+"',"+parseFloat(line.get("nilai"))+","+nilai+",'D','"+line.get("satuan")+"'"+
							",'"+this.app._userLog+"',now())");
				}
			}
			sql.add("insert into anggsusun_orgi select * from anggsusun_d where no_agg = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doModalResult = function(event, modalResult)
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
		case "simpan" :
			if (parseFloat(this.app._periode.substr(0,4)) > parseFloat(this.ed_period.getText())) 
			{
				system.alert(this,"Tahun anggaran tidak valid.","Tahun anggaran tidak boleh kurang dari tahun aktif sistem.["+this.app._periode.substr(0,4)+"]");
				return false;
			}else this.simpan();
		break;
	}
	this.dp_tgl1.setFocus();
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'anggsusun_m','no_agg',this.app._lokasi+"-"+this.ed_period.getText().substr(0,4)+".",'0000'));
			this.ed_dok.setFocus();
		}else
		{
			system.alert(this,"Tahun harus valid.","");
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
	}
};	
window.app_saku_anggaran_transaksi_fGarSusun.prototype.FindBtnClick = function(sender, event)
{
	try
	{
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
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doFindBtnClick = function(sender, col, row) 
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
											  ["kode_drk","nama"],"and",["Kode RKM","Deskripsi"],false);
			break;
		}
	}catch(e)
	{
		alert("[app_saku_anggaran_transaksi_fGarSusun] : doFindBtnClick : " + e);
	}
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doNilaiChange = function()
{
	try
	{
		if (!(this.dataAgg instanceof portalui_arrayMap)){
			var tot = 0;
			
			for (var i = 0; i < this.sg1.rows.getLength();i++)
			{
				if ((this.sg1.getCell(9,i) != "") && (this.sg1.getCell(7,i) != ""))
					tot += nilaiToFloat(this.sg1.getCell(9,i)) * nilaiToFloat(this.sg1.getCell(7,i));
			}
			this.ed_nilai.setText(floatToNilai(tot));
		}
	}catch(e)
	{
		alert("[app_saku_anggaran_transaksi_fGarSusun]::doNilaiChange:"+e);
	}
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doCellExit = function()
{
	this.sg1.validasi();
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doAfterLoad = function(sender, result,data)
{
	try{	
		if (result){			
			if (data instanceof portalui_arrayMap){	
				this.dataAgg = data;		
				this.rowPerPage = this.app._baris == undefined ? 30:this.app._baris;
				this.sgn.setTotalPage(Math.ceil(data.getLength() / this.rowPerPage));
				this.sgn.rearrange();
				this.sgn.setButtonStyle(3);
				this.doLoadData(this.dataAgg, 1);
				var line,tot = 0;						
				for (var i in this.dataAgg.objList)
				{
					line = this.dataAgg.get(i);										
					tot += parseFloat(line.get("nilai")) * parseFloat(line.get("volume"));			
				}								
				this.ed_nilai.setText(floatToNilai(tot));
				/*-----------------------before
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
				*/
			}	
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doLoadData = function(data, page)
{
	var rs, arr;
	this.sg1.clear();		
	
	if (data instanceof portalui_arrayMap){		
		var start = (page - 1) * parseInt(this.rowPerPage);
		var last = start + parseInt(this.rowPerPage);		
		for (var i=start;i < last; i++){
			rs = data.get(i);	
			if (rs === undefined) continue;
			arr = new Array();
			for (var j in rs.objList){
				if (j != "nilai" && j != "volume")					
					arr[arr.length] = rs.get(j);				
				else arr[arr.length] = floatToNilai(parseFloat(rs.get(j)));	
			}
			this.sg1.appendData(arr);		
		}						
	}
	//this.sg1.validasi();
};
window.app_saku_anggaran_transaksi_fGarSusun.prototype.doSelectedPage = function(sender, page)
{
	this.doLoadData(this.dataAgg, page);		
};