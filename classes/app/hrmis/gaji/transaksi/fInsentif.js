window.app_hrmis_gaji_transaksi_fInsentif= function(owner)
{
	if (owner)
	{
		window.app_hrmis_gaji_transaksi_fInsentif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_gaji_transaksi_fInsentif";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Insentif Gaji: Input", 0);	
		
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
		this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(54);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Intensif");
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
		this.ed_dok.setLength(150);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(98);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
			
		this.cb_tingkat = new portalui_saiCB(this);
		this.cb_tingkat.setLeft(20);
		this.cb_tingkat.setTop(120);
		this.cb_tingkat.setWidth(185);
		this.cb_tingkat.setCaption("Tingkat");
		this.cb_tingkat.setText("");
		this.cb_tingkat.setReadOnly(true);
		this.cb_tingkat.addItem(0,"1");
		this.cb_tingkat.addItem(1,"2");
		this.cb_tingkat.addItem(2,"3");
		this.cb_tingkat.addItem(3,"4");
		this.cb_tingkat.addItem(4,"5");
		this.cb_tingkat.addItem(5,"6");
		this.cb_tingkat.addItem(6,"7");
		this.cb_tingkat.addItem(7,"8");
		this.cb_tingkat.addItem(8,"9");
		this.cb_tingkat.addItem(9,"10");
		this.cb_tingkat.addItem(10,"11");
		this.cb_tingkat.addItem(11,"12");
		this.cb_tingkat.addItem(12,"13");
		this.cb_tingkat.addItem(13,"14");
		this.cb_tingkat.addItem(14,"15");
		this.cb_tingkat.addItem(15,"16");
		this.cb_tingkat.addItem(16,"17");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(600);
		this.ed_nilai.setTop(120);
		this.ed_nilai.setWidth(220);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai Insentif");
		this.ed_nilai.setText("0"); 
		this.ed_nilai.setReadOnly(false);
		
		this.bLoad = new portalui_button(this);
		this.bLoad.setLeft(845);
		this.bLoad.setTop(120);
		this.bLoad.setCaption("Hitung");
		
	    this.p2 = new portalui_panel(this);
	    this.p2.setLeft(20);
	    this.p2.setTop(142);
	    this.p2.setWidth(900);
	    this.p2.setHeight(350);
	    this.p2.setName('p2');
	    this.p2.setCaption('Daftar Insentif');
		
		uses("portalui_saiGrid;portalui_sgNavigator");
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[1,20,895,290],tag:2,colCount:11,
			colTitle:["NIK","Nama","Status","Loker","Unit Kerja","Jab. Struk","Jab Fung.","Tingkat","Nilai","PPh","THP"],
			colWidth:[[0,1,2,3,4,5,6,7,8,9,10],[80,200,80,100,100,100,100,100,100,100,100]],
			colFormat:[[8,9,10],[cfNilai, cfNilai, cfNilai]]});	
		this.sgn = new portalui_sgNavigator(this.p2,{bound:[1,315,895,25],afterUpload:[this,"doAfterUpload"],grid:this.sg2,buttonStyle:4});
		this.sgn.uploader.setParam3("object");
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			uses("util_addOnLib");
			this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bLoad.onClick.set(this, "loadClick");
			
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_gaji_transaksi_fInsentif.extend(window.portalui_childForm);
window.app_hrmis_gaji_transaksi_fInsentif.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_gaji_transaksi_fInsentif.prototype.simpan = function()
{
	this.bGen.click();
	if (this.standarLib.checkEmptyByTag(this, new Array("0")))
	{
		try
		{				
			var tgl = new Date();
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			
			sql.add("insert into gaji_int_m (no_gaji,kode_lokasi,no_dokumen,tanggal,keterangan,progress,nilai,"+
							"                periode,tingkat,tgl_input,nik_user,kode_lokkonsol) values  "+
							"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','0',"+parseNilai(this.ed_nilai.getText())+",'"+
								 this.ed_period.getText()+"','"+this.cb_tingkat.getText()+"',now(),'"+this.app._userLog+"','"+this.lokkonsol+"')");
								 
			
			for (var i = 1; i <= this.sg2.getRowCount(); i++)
			{
				sql.add("insert into gaji_int_d (no_gaji,nik,status,tingkat,kode_jabs,kode_jabf,nilai,nilai_pph,kode_lokasi,kode_lokkonsol)  "+
						"value('"+this.ed_nb.getText()+"','"+this.sg2.getCell(1,i)+"','"+this.sg2.getCell(3,i)+"','"+this.sg2.getCell(8,i)+"','"+this.sg2.getCell(6,i)+"','"+this.sg2.getCell(7,i)+"',"+parseNilai(this.sg2.getCell(9,i))+","+parseNilai(this.sg2.getCell(10,i))+",'"+this.app._lokasi+"','"+this.lokkonsol+"')");
			}
			this.dbLib.execArraySQL(sql);	
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_hrmis_gaji_transaksi_fInsentif.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),undefined);				
				this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
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
window.app_hrmis_gaji_transaksi_fInsentif.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'gaji_int_m','no_gaji',this.app._lokasi+"-INT"+this.ed_period.getText().substr(2,4)+".",'0000'));
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
window.app_hrmis_gaji_transaksi_fInsentif.prototype.loadClick = function(sender)
{
	try
	{
		//this.sg2.clearAll();
		var temp = this.dbLib.runSQL("select a.nik,a.nama,a.status,b.nama as nama_loker,d.nama as nama_uker,  "+
									"		ifnull(c.kode_jabs,'-') as jabs, ifnull(h.kode_jabf,'-') as jabf, e.tingkat2 as tingkat, (f.value1*0)+"+parseNilai(this.ed_nilai.getText())+" as nilai, "+
									"		(((("+parseNilai(this.ed_nilai.getText())+" - "+
									"		case when ((ifnull(c.kode_jabs,'-') = '-') and (ifnull(h.kode_jabf,'-') = '-')) then 5/100*"+parseNilai(this.ed_nilai.getText())+" else "+
									"		case when 5/100*"+parseNilai(this.ed_nilai.getText())+" > f.value1 then f.value1 else 5/100*"+parseNilai(this.ed_nilai.getText())+" end end)*12)-g.nilai)*5/100)/12 as pph, "+
									"		"+parseNilai(this.ed_nilai.getText())+" - "+
									"		((((("+parseNilai(this.ed_nilai.getText())+" - "+
									"		case when ((ifnull(c.kode_jabs,'-') = '-') and (ifnull(h.kode_jabf,'-') = '-')) then 5/100*"+parseNilai(this.ed_nilai.getText())+" else  "+
									"		case when 5/100*"+parseNilai(this.ed_nilai.getText())+" > f.value1 then f.value1 else 5/100*"+parseNilai(this.ed_nilai.getText())+" end end)*12)-g.nilai)*5/100)/12 ) as netto "+
									"	, f.value1, g.nilai as gajiptpkp "+
									"from karyawan a  "+
									"     inner join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol=b.kode_lokkonsol "+
									"     inner join hr_loker d on a.kode_loker=d.kode_loker and a.kode_lokkonsol=d.kode_lokkonsol "+
									"     inner join hr_tingkat e on a.nik=e.nik and a.kode_lokkonsol=e.kode_lokkonsol and e.status_aktif='1'  "+
									"     inner join gaji_ptkp g on a.status=g.kode_ptkp and a.kode_lokkonsol=g.kode_lokkonsol "+
									"     inner join spro f on f.kode_lokasi=a.kode_lokkonsol and f.kode_spro = 'BYJAB' "+
									"     left outer join (select aa.nik,aa.kode_jabs,aa.kode_lokkonsol "+
									"		      from hr_jabs aa "+
									"		      where aa.status_aktif='1') c on c.nik=a.nik and c.kode_lokkonsol=a.kode_lokkonsol "+
									"     left outer join (select aa.nik,aa.kode_jabf,aa.kode_lokkonsol "+
									"		      from hr_jabf aa "+
									"		      where aa.status_aktif='1') h on h.nik=a.nik and h.kode_lokkonsol=a.kode_lokkonsol "+
									"where e.tingkat2 = '"+this.cb_tingkat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokkonsol = '"+this.lokkonsol+"'");
		
		if (temp instanceof portalui_arrayMap){
			//this.sg2.setData(temp);
			this.dataKaryawan = temp;
			this.HitungData();
		}else alert(rs);
		
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_hrmis_gaji_transaksi_fInsentif.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_period.setText(year.toString()+month);
};
window.app_hrmis_gaji_transaksi_fInsentif.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
		//if ((this.cb_pp.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
	}
};
window.app_hrmis_gaji_transaksi_fInsentif.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_hrmis_gaji_transaksi_fInsentif.implement({
	doAfterUpload: function(sender, result, data){		
		try{
			this.dataUpload = data;
			this.HitungData();
		}catch(e){
			alert(e);
		}
	},
	HitungData : function(){
		if (this.dataUpload === undefined) return;
		this.sg2.clear();
		this.sg2.showLoading();
		var line,lineData = [];
		var data = this.dataUpload;
		for (var i in data.rows){
			line = data.rows[i];							
			lineData = this.cariDataKaryawan(line.nik, line.nama, parseFloat(line.nilai));						
			this.sg2.appendData(lineData);
		}				
		this.sg2.hideLoading();		
	},
	cariDataKaryawan: function(nik,nama, nilai){
		try{
			var line,pph =0 , netto = 0;
			var dataTmp = [nik, nama, '-','-','-','-','-','-',floatToNilai(nilai),0,0];			
			if (this.dataKaryawan !== undefined){
				for (var i in this.dataKaryawan.objList){
					line = this.dataKaryawan.get(i);
					if (line.get("nik") == nik){
						dataTmp = [];
						pph = (((( nilai - (line.get("jabs") == "-" && line.get("jabf") == "-" ? 5/100 * nilai : (5/100* nilai > parseFloat(line.get("value1")) ? parseFloat(line.get("value1")) : 5/100 * nilai)) ) * 12) - parseFloat(line.get("gajiptpkp"))) * 5/100) / 12;
						netto = nilai - ((((( nilai - (line.get("jabs") == "-" && line.get("jabf") == "-" ? 5/100 * nilai : (5/100* nilai > parseFloat(line.get("value1")) ? parseFloat(line.get("value1")) : 5/100 * nilai)) ) * 12) - parseFloat(line.get("gajiptpkp"))) * 5/100) / 12);
						for (var c in line.objList) {
							if (c == "nilai")
								dataTmp[dataTmp.length] = floatToNilai(nilai);
							else if (c == "pph")
								dataTmp[dataTmp.length] = floatToNilai(pph);
							else if (c == "netto")
								dataTmp[dataTmp.length] = floatToNilai(netto);
							else if (c == "nik")
								dataTmp[dataTmp.length] = nik;
							else if (c == "nama")
								dataTmp[dataTmp.length] = nama;
							else 
								dataTmp[dataTmp.length] = line.get(c);				
						}
						return dataTmp;
					}
				}
			}
			return dataTmp;						
		}catch(e){
			alert(e);
		}
	}
});