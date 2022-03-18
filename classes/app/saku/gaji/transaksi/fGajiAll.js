/**
 * @author dweexfuad
 * Design:
 * 			- Load Data Master Param (untuk membuat kolom grid)
 * 			- Load Master Riwayat yg masih aktif
 * 			- Proses
 */
window.app_saku_gaji_transaksi_fGajiAll = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_transaksi_fGajiAll.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_transaksi_fGajiAll";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Gaji Karyawan", 0);	
		
		uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;util_addOnLib");	
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode", readOnly:true});			
		this.lblTgl1 = new portalui_label(this,{bound:[20,11,101,20],caption:"Tanggal", underline:true});				
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,11,82,18]});		
        this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,12,220,20],caption:"No Bukti", readOnly:true});			
		this.bGen = new portalui_button(this,{bound:[246,12, 80,20],caption:"Gen. No Bukti", icon:"url(icon/"+system.getThemes()+"/process.png)", click:"genClick"});			    
		this.cb_dok = new portalui_saiCBBL(this,{bound:[20,13,240,20],caption:"Dokumen",multiSelection:false,
			sql:["select no_dok, keterangan  from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"' ",["no_dok","keterangan"],false, ["No Dokumen","Keterangan"],"and","Daftar Dokumen",true]
		});						
		//tingkat, usia, gadas, stspeg, loker/pp, status, pddk/jenjang, absen, jabs, jabf, profesi,
		//-------------														
		this.ed_totalGaji = new portalui_saiLabelEdit(this,{bound:[20,164,185,20],caption:"Gaji diterima",tipeText:ttNilai, alignment:alRight, readOnly:true});				
		this.p1 = new portalui_panel(this,{bound:[20,15,900,310], caption:"Data Fixed Gaji"});						
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,260]});
		this.sgn1 = new portalui_sgNavigator(this.p1,{bound:[1,20,898,25], grid:this.sg1, buttonStyle:bsView});				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();
		this.rearrangeChild(20,23);
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();			
		    this.addOnLib = new util_addOnLib();			
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");			
			this.bHitung.onClick.set(this, "hitungClick");
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_dok.onChange.set(this, "doEditChange");
			this.bShow.onClick.set(this, "showClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg2.onNilaiChange.set(this, "doNilaiChange2");
			this.sg1.onChange.set(this, "doChange");
			this.sg2.onChange.set(this, "doChange2");
			
			this.sg1.clear(1);
			this.sg2.clear(1);
			this.loadParam();			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gaji_transaksi_fGajiAll.extend(window.portalui_childForm);
window.app_saku_gaji_transaksi_fGajiAll.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);		
	},
	genClick: function(sender){
		try
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'gaji_m','no_gaji',this.lokkonsol+"-GJ"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.cb_dok.setFocus();
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
	},
	simpan: function(){
		this.bGen.click();
		if (this.standarLib.checkEmptyByTag(this, new Array("0")))
		{
			try
			{				
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add("insert into gaji_m (no_gaji,tanggal,keterangan,nik,no_dok,kode_lokkonsol,periode,progress,no_del,no_link,nik_user,tgl_input,kode_lokasi, thp) values "+
						"('"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDate()+"','Gaji periode "+this.ed_period.getText()+"','"+this.cb_nik.getText()+"','"+this.cb_dok.getText()+"','"+this.lokkonsol+"','"+
							 this.ed_period.getText()+"','0','-','-','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+parseNilai(this.ed_totalGaji.getText())+"' )");
						
				var scr1 = "insert into gaji_d (no_gaji,nik,no_dok,kode_param,kode_lokkonsol,nilai,dc) values ";
				var baris1 = true;
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if (!baris1) { scr1 += ",";}	
					scr1 += "('"+this.ed_nb.getText()+"','"+this.cb_nik.getText()+"','"+this.cb_dok.getText()+
							"','"+this.sg1.getCell(0,i)+"','"+this.lokkonsol+"',"+parseNilai(this.sg1.getCell(2,i))+",'D')";				
					baris1 = false;
				}
				for (var i=0; i < this.sg2.rows.getLength(); i++)
				{
					if (!baris1) { scr1 += ",";}	
					scr1 += "('"+this.ed_nb.getText()+"','"+this.cb_nik.getText()+"','"+this.cb_dok.getText()+
							"','"+this.sg2.getCell(0,i)+"','"+this.lokkonsol+"',"+parseNilai(this.sg2.getCell(2,i))+",'C')";				
					baris1 = false;
				}			
				sql.add(scr1);
							
				this.dbLib.execArraySQL(sql);	
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0"),undefined);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(); this.sg1.appendRow();
					this.sg2.clear(); this.sg2.appendRow();
				}
				break;
			
			case "simpan" :
				/*if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}*/
				/*if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
				{
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else
					{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else */
				this.simpan();
				break;

			case "simpancek" : this.simpan();
				break;
		}
	},
	showClick: function(sender){		
		if ((this.cb_dok.getText() != ""))
		{
			try
			{				
				var sql = new server_util_arrayList();
				sql.add("select a.nik, ifnull(a.jml,0) as jml "+
									"from hr_absen a "+
									"where a.periode = '"+this.ed_period.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' ");
				sql.add("select gadas,nik "+
									"from hr_gadas where kode_lokkonsol = '"+this.lokkonsol+"' and status_aktif = '1' ");
				sql.add("select jenjang,nik "+
									"from hr_angkat where kode_lokkonsol = '"+this.lokkonsol+"' and status_aktif = '1'");
				sql.add("select tingkat2,nik "+
									"from hr_tingkat where kode_lokkonsol = '"+this.lokkonsol+"' and status_aktif = '1' ");
				sql.add("select datediff(now(),tgl_lahir) as jmlhari,status,nik "+
									"from karyawan where kode_lokkonsol = '"+this.lokkonsol+"' ");
				sql.add("select a.kode_loker2,b.nama as nama_loker,a.nik "+
									"from hr_rwymutasi a inner join hr_lokasi b on a.kode_lokasi2=b.kode_lokasi and a.kode_lokkonsol=b.kode_lokkonsol "+
									"where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.status_aktif = '1' ");
				sql.add("select a.kode_status2,b.nama as nama_status, a.nik "+
									"from hr_rwystatus a inner join hr_status2 b on a.kode_status2=b.kode_status and a.kode_lokkonsol=b.kode_lokkonsol "+
									"where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.status_aktif = '1' ");
				sql.add("select a.jab_baru, a.kode_jabs, b.keterangan. a.nik "+
									"from hr_jabs a inner join hr_jabatan b on a.kode_jabs=b.kode_jab and a.kode_lokkonsol=b.kode_lokkonsol "+
									"where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.status_aktif = '1' ");
				sql.add("select jab_baru, kode_jabf, nik "+
									"from hr_jabf "+
									"where kode_lokkonsol = '"+this.lokkonsol+"' and status_aktif = '1' ");
				sql.add("select a.nama as nama_prof, b.kode_profesi2,a.jenis, b.nik "+
									"from hr_profesi a inner join hr_rwyprofesi b on a.kode_profesi=b.kode_profesi2 and a.kode_lokkonsol=b.kode_lokkonsol "+
									"where b.kode_lokkonsol = '"+this.lokkonsol+"' and b.status_aktif = '1' ");
				sql.add("select datediff(now(),tgl_masuk) as jmlhari,nik "+
									"from karyawan where kode_lokkonsol = '"+this.lokkonsol+"' ");
				sql.add("select a.kode_param,a.nama,0 as nilai "+
									" from gaji_param_d a "+
									" where a.no_dok = '"+this.cb_dok.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' and a.jenis='PDPT' order by a.nu ");
				sql.add("select a.kode_param,a.nama,0 as nilai "+
									" from gaji_param_d a "+
									" where a.no_dok = '"+this.cb_dok.getText()+"' and a.kode_lokkonsol='"+this.lokkonsol+"' and a.jenis='POT' order by a.nu ");
				sql.add("select concat(a.kode_pp,' - ',b.nama)as nama_pp,a.alamat,a.grade, a.nik "+
									" from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									" where a.kode_lokasi='"+this.app._lokasi+"'  ");
				sql.add("select kode_param, nik, ifnull(nilai,0) as nilai "+
									"from gaji_pot where kode_lokkonsol = '"+this.lokkonsol+"' and "+this.ed_period.getText()+" between periode1 and periode2 ");
				sql.add("select kode_param, nik, ifnull(nilai,0) as nilai "+
									"from gaji_pdpt where kode_lokkonsol = '"+this.lokkonsol+"' and "+this.ed_period.getText()+" between periode1 and periode2");								
				sql.add("select a.kode_param, a.value1, a.value2, a.nik "+
									"from hr_sk_d a inner join hr_sk b on b.no_sk = a.no_sk and a.nik = b.nik and a.kode_lokkonsol = b.kode_lokkonsol "+
									"where a.kode_lokkonsol = '"+this.lokkonsol+"' and b.aktif ='1' ");
				sql.add("select  tjab, a.nik"+
									"from hr_belajar_m a "+
									"where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.status ='0'");
				var line,data = this.dbLib.getMultiDataProvider(sql,true);
				this.dtTrans = data.result[0];
				var tmp = new portalui_arrayMap();
				for (var i in this.dtTrans){
					if (i == 0) continue;
					line = this.dtTrans[i].split(";"); 
					tmp.set(line[0],parseFloat(line[1]));
				}
				this.dtTrans = tmp;
				var absen = this.dtTrans.get(this.cb_nik.getText());
				this.ed_absen.setText(absen == undefined || absen == "" ? "0": absen);
				if (this.ed_absen.getText() == "undefined") this.ed_absen.setText("0");				
				var dataGadas = data[1].split("<br>"); 				
				if (dataGadas[1] !== undefined){										
					this.ed_gadas.setText(floatToNilai(parseFloat(dataGadas[1].split(";")[0])));					
				}else this.ed_gadas.setText(0);				
				var dataJenjang = data[2].split("<br>"); 
				if (dataJenjang[1] !== undefined){					
					this.ed_jenjang.setText(dataJenjang[1].split(";")[0]);					
				}else this.ed_jenjang.setText(0);				
				var dataTingkat = data[3].split("<br>");
				if (dataTingkat[1] !== undefined){
					this.ed_tingkat.setText(dataTingkat[1].split(";")[0]);					
				}else this.ed_tingkat.setText(0);				
				var dataUsia = data[4].split("<br>");
				if (dataUsia[1] !== undefined){
					line = dataUsia[1].split(";");
					var thnbln = dayToYear(line[0]);
					this.ed_usia.setText(thnbln[0]);
					this.ed_status.setText(line[1]);
				}else{
					this.ed_usia.setText(0);
					this.ed_status.setText('-');
				}				
				var dataLoker = data[5].split("<br>");
				if (dataLoker[1] !== undefined)
				{
					line = dataLoker[1].split(";");
					this.kodepp = line[0];
					this.ed_pp.setText(line[1]);					
				}else{
					this.kodepp = "-";
					this.ed_pp.setText("-");					
				}												
				var dataRiwayat = data[6].split("<br>");
				if (dataRiwayat[1] !== undefined)
				{
					line = dataRiwayat[1].split(";");
					this.kodestspeg = line[0];
					this.ed_stspeg.setText(line[1]);
				}else{
					this.kodestspeg = "-";
					this.ed_stspeg.setText("-");
				}												
				var dataJabs = data[7].split("<br>");
				if (dataJabs[1] !== undefined){
					line = dataJabs[1].split(";");
					this.jenisjabs = line[2];
					this.kodejabs = line[1];
					this.ed_jabs.setText(line[0]);
				}else{
					this.jenisjabs = "-";
					this.kodejabs = "-";
					this.ed_jabs.setText("-");
				}				
				var dataJabf = data[8].split("<br>");
				if (dataJabf[1] !== undefined)
				{
					line = dataJabf[1].split(";");
					this.kodejabf = line[1];
					this.ed_jabf.setText(line[0]);
				}else{
						this.kodejabf = "-";
						this.ed_jabf.setText("-");
				}												
				var dataProf = data[9].split("<br>");
				if (dataProf[1] !== undefined){
					line = dataProf[1].split(";");
					this.kodeprof = line[1];
					this.ed_prof.setText(line[0]);
					this.jenisprof = line[2];
				}else{
					this.kodeprof = "-";
					this.ed_prof.setText("-");
					this.jenisprof = "-";					
				}				
				var dataMasuk = data[10].split("<br>");
				if (dataMasuk[1] !== undefined)
				{
					line = dataMasuk[1].split(";");
					this.masaKrj = line[0];
				}else{
					this.masaKrj = 0;
				}				
				this.sg1.clear(); 				
				var dataParam = data[11].split("<br>");
				if (dataParam[1] !== undefined)
				{
					for (var i in dataParam){
						if (i == 0) continue;
						line = dataParam[i].split(";");
						this.sg1.appendData([line[0],line[1],line[2],"DEF"]);
					}
					this.sg1.validasi();
				}else
					this.sg1.appendRow();			
				this.sg2.clear(); 				
				dataParam = data[12].split("<br>");
				if (dataParam[1] !== undefined){
					for (var i in dataParam){
						if (i == 0) continue;
						line = dataParam[i].split(";");
						this.sg2.appendData([line[0],line[1],line[2],"DEF"]);					
					}
					this.sg2.validasi();
				}else
					this.sg2.appendRow();			
				this.sg1.validasi();
				this.sg2.validasi();
				var dataTmp =	data[14].split("<br>");			
				var line2, tmp = new portalui_arrayMap();			
				for (var i in dataTmp){
					if (i == 0) continue;
					line = new portalui_arrayMap();
					line2 = dataTmp[i].split(";");				
					line.set("kode_param",line2[0]);
					line.set("nik",line2[1]);
					line.set("nilai",line2[2]);
					tmp.set(i-1,line);
				}
				
				this.dataPotongan = tmp;
				dataTmp =	data[15].split("<br>");
				tmp = new portalui_arrayMap();			
				for (var i in dataTmp){
					if (i == 0) continue;
					line = new portalui_arrayMap();
					line2 = dataTmp[i].split(";");				
					line.set("kode_param",line2[0]);
					line.set("nik",line2[1]);
					line.set("nilai",line2[2]);
					tmp.set(i-1,line);
				}
				this.dataPdpt = tmp;
				var dataPP = data[13].split("<br>");
				if (dataPP[1] !== undefined)
				{
					line = dataPP[1].split(";");
					//this.ed_pp.setText(line[0]);
					//this.ed_grade.setText(line[1]);
				}else{
					//this.ed_pp.setText('-');
					//this.ed_grade.setText('-');
				}
				dataTmp = data[16].split("<br>");
				tmp = new portalui_arrayMap();			
				for (var i in dataTmp){
					if (i == 0) continue;
					line = new portalui_arrayMap();
					line2 = dataTmp[i].split(";");				
					line.set("kode_param",line2[0]);
					line.set("value1",line2[1]);
					line.set("value2",line2[2]);
					tmp.set(i-1,line);
				}
				this.dataKontrak = tmp;
				dataTmp = data[17].split("<br>");
				this.dataTjabPddk = undefined;
				for (var i in dataTmp){
					line2 = dataTmp[i].split(";");
					this.dataTjabPddk = parseFloat(line2[0]);
				}
				var line,tmp  = this.dbLib.getDataProvider("select mk, gd, ty, tp from hr_tkbw where kode_lokasi = '"+this.app._lokasi+"' and status = '"+this.ed_status.getText()+"' ", true);
				this.dataRenumerasiTKBW = new portalui_arrayMap();			
				for (var i in tmp.rs.rows){
					line = tmp.rs.rows[i];
					this.dataRenumerasiTKBW.set(tmp.mk, line);
				}
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	hitungClick: function(sender){	
		this.sg2.onChange.set(undefined, undefined);
		this.sg1.onChange.set(undefined, undefined);
		for (var i=0; i < this.sg1.rows.getLength(); i++)
			this.sg1.setCell(3,i,"CAL");
		this.doChange(this.sg1,3,0);
		//this.hitungPPh();
		this.sg1.validasi();		
		for (var i=0; i < this.sg2.rows.getLength(); i++)
			this.sg2.setCell(3,i,"CAL");
		this.doChange2(this.sg2,3,0);
		this.sg2.validasi();	
		this.sg1.onChange.set(this, "doChange");
		this.sg2.onChange.set(this, "doChange2");	
		var tot = nilaiToFloat(this.ed_npdpt.getText()) -  nilaiToFloat(this.ed_npot.getText());
		this.ed_totalGaji.setText(floatToNilai(Math.round(tot)));
	},
	doEditChange: function(sender){
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if ((this.cb_pp.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
		}
		if (sender == this.cb_nik)
		{		
			this.app._mainForm.setFormCaption("Data Gaji Karyawan");
			/*var line,data = runArraySQL("select concat(a.kode_pp,' - ',b.nama)as nama_pp,a.alamat,a.grade "+
									" from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik='"+this.cb_nik.getText()+"'\r\n"+
								"select kode_param, nik, ifnull(nilai,0) as nilai "+
											  "from gaji_pot where kode_lokkonsol = '"+this.lokkonsol+"' and nik='"+this.cb_nik.getText()+"' and "+this.ed_period.getText()+" between periode1 and periode2");		
			data = data.split("\r\n");
			var dataTmp =	data[1].split(";");
			var line2, tmp = new portalui_arrayMap();
			for (var i in dataTmp){
				if (i == 0) continue;
				line = new portalui_arrayMap();
				line2 = dataTmp[1].split(";");
				line.set("kode_param",line2[0]),line.set("nik",line2[1]),line.set("nilai",line2[2]);
				tmp.set(i-1,line);
			}
			this.dataPotongan = tmp;T
			var dataPP = data[0].split(";");
			if (dataPP[1] !== undefined)
			{
				line = dataPP[1].split(";");
				this.ed_pp.setText(line[0]);
				this.ed_grade.setText(line[1]);
			}else{
				this.ed_pp.setText('-');
				this.ed_grade.setText('-');
			}
			*/
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_nik) 
			{
				this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);
				this.sg1.clear(); this.sg1.appendRow();
				this.sg2.clear(); this.sg2.appendRow();
			}
			if (sender == this.cb_dok) 
			{
				this.standarLib.showListData(this, "Daftar Dokumen",sender,undefined, 
											  "select no_dok, keterangan  from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"' ",
											  "select count(no_dok)       from gaji_param_m where kode_lokkonsol='"+this.lokkonsol+"' ",
											  ["no_dok","keterangan"],"and",["No Dokumen","Keterangan"],false);
				this.sg1.clear(); this.sg1.appendRow();
				this.sg2.clear(); this.sg2.appendRow();
			}
		}catch(e)
		{
			alert(e);
		}
	},
	doChange: function(sender, col, row) {
		try
		{
			switch(col)
			{
				case 2 :    
							this.sg1.validasi();
					break;
				case 3 : 
						this.sg1.onChange.set(undefined, undefined);					
						var gdas = false, ngadas = 0;
						for (var i=0; i < this.sg1.rows.getLength(); i++)
						{		
							  if (this.sg1.getCell(3,i) == "DEF")
							  {
								if (this.sg1.cells(2,i) == "") this.sg1.setCell(2,i,"0");
							  }else{
								var dtKontrak = this.getDataKontrak(this.sg1.getCell(0,i));// poltek 17-03-2010
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "GDAS") && (this.kodestspeg == "1"))
								{			
									if (dtKontrak){									
										ngadas = dtKontrak.nilai1;
									}else ngadas = nilaiToFloat(this.ed_gadas.getText());
									this.sg1.setCell(2,i,floatToNilai(ngadas));								
								}else
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "GDAS") && (this.kodestspeg != "1"))
								{																
									var tjabs2 = dtKontrak;// 14/10/2009 
									if (tjabs2 !== undefined) {                                    
										gdas = true;
										ngadas = tjabs2.nilai1;
									}else if (this.kodestspeg == "5"){
										if (this.dataRenumerasiTKBW){
											var line;
											for (var i in this.dataRenumerasiTKBW.objList){
												line = this.datare.get(i);
											}
										}else ngadas = 0;	
									}else ngadas = 0;
									this.sg1.setCell(2,i,floatToNilai(ngadas));    
								}else
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "PDAS") && (this.kodestspeg != "1"))
								{
									var tjabs2 = dtKontrak; 					
									if (tjabs2 !== undefined) this.sg1.setCell(2,i,tjabs2.nilai1);
									else if (!gdas) this.sg1.setCell(2,i,this.ed_gadas.getText());								
								}else														
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TYAY"))
								{
									var tyay = 0;								 
									var tjabs2 = dtKontrak; 
									if (tjabs2 !== undefined) {
										this.sg1.setCell(2,i,tjabs2.nilai1); 
										tyay = parseFloat(tjabs2.nilai1);
									}else {
										if (this.kodestspeg == "1")
										{
											tyay = nilaiToFloat(this.ed_gadas.getText()) * parseFloat(this.nTyay);
											this.sg1.setCell(2,i,floatToNilai(tyay));									
										}else if (this.kodestspeg == "5"){
											tyay = nilaiToFloat(this.ed_gadas.getText()) * parseFloat(this.nTyay) * 0.8;
											this.sg1.setCell(2,i,floatToNilai(tyay));
										} 
									}
									this.tyay = tyay;
								}else																				
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TJAB"))
								{
									var tjabs , tjabs2 = 0;
									tjabs2 = dtKontrak;
									if (tjabs2 === undefined){
										tjabs2 = this.getTunjJabatanStruk();
										var tjabf = this.getTunjJabatanFung();								
										if (parseFloat(tjabs2) > parseFloat(tjabf)) tjabs = tjabs2; else  tjabs = tjabf; 
										
										if (this.dataTjabPddk !== undefined &&  !isNaN(this.dataTjabPddk) )//jika masih belajar ambil dari hr_belajar_m (tjab) 080909
											tjabs= tjabs * this.dataTjabPddk / 100;																	
										this.sg1.setCell(2,i,floatToNilai(tjabs));								
									}else {
										tjabs = tjabs2.nilai1;
										this.sg1.setCell(2,i,floatToNilai(tjabs));								
									}								
									this.tjabs = tjabs;
								}else							
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TPROF"))
								{				
									var tprof = dtKontrak;
									if (tprof === undefined){
										tprof = this.getTunjProfesi();
									}else{
										tprof = tprof.nilai1;
									}
									this.sg1.setCell(2,i,floatToNilai(tprof));								
									this.tprof = tprof === undefined ? 0 : tprof;
								}else							
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "THRT"))
								{
									var ttht = ptingkat = pusia = 0;
									if (this.kodestspeg == "1") {	
										var ttht = dtKontrak;								
										if (ttht){
											ttht = ttht.nilai1;
										}else{
											var tyay = this.tyay;//nilaiToFloat(this.ed_gadas.getText()) * parseFloat(this.nTyay);									
											var tprof = this.tprof;//this.getTunjProfesi();
											var tot1 = Math.round(5/100 * (nilaiToFloat(this.ed_gadas.getText()) + parseFloat(tyay) + parseFloat(tprof)));
											pusia = this.getDplkUsia(this.ed_usia.getText());
											ptingkat = this.getDplkTingkat(this.ed_tingkat.getText());															
											ttht = Math.round(tot1 * pusia/100 * ptingkat /100);
										}
										this.sg1.setCell(2,i,floatToNilai(ttht));
										this.ttht = ttht;
										for (var k=0; k < this.sg2.rows.getLength(); k++)
										{
											if ((this.sg2.getCell(3,k) == "CAL") && (this.sg2.getCell(0,k) == "PTHT"))
											{
												var ptht = this.ttht * 2;
												this.sg2.setCell(2,k,floatToNilai(ptht));
											}
										}
									}else this.ttht = 0;	
											
								}else
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TRAN"))
								{
									var data = dtKontrak;
									if (data === undefined){
										//if (this.ed_absen.getText() != "0") 
										//{
											var jhari,tarif,ttrans = 0;
											jhari = this.dtTrans.get(this.cb_nik.getText());
											if (this.kodejabs == "-" && this.kodejabf != "-")
												tarif = this.dtTunjTrans.get("TJF"); //aturan baru
											else tarif = this.dtTunjTrans.get(this.kodejabs);									
											ttrans = (tarif === undefined ? 0 : tarif);	//jhari *
										//
										//} //else ttrans = 0;
										if (this.dataTjabPddk !== undefined && !isNaN(this.dataTjabPddk) && this.dataTjabPddk != 100) ttrans = 0;
									}else{
										var ttrans = data.nilai1 != 0 ? data.nilai1 : data.nilai2 * nilaiToFloat(this.ed_absen.getText());
									}
									this.sg1.setCell(2,i,floatToNilai(ttrans));		
									this.ttrans = ttrans;
								}else
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TCUT"))
								{
									var cuti = 0;			
									var data = dtKontrak;
									if (data === undefined){		
										var tyay = this.tyay;//nilaiToFloat(this.ed_gadas.getText()) * parseFloat(this.nTyay);
										var tprof = this.tprof;//this.getTunjProfesi();								
										if (parseInt(this.ed_period.getText().substr(4,2)) == this.blnCuti && 
											((this.masaKrj > 360 && (this.kodestspeg == "1" || this.kodestspeg == "5" || this.kodestspeg == "2")) || (this.masaKrj > 180 && !(this.kodestspeg == "1" || this.kodestspeg == "5" || this.kodestspeg == "2"))) ) //cuti diberikan setelah setahun masa kerja
										{
											cuti = nilaiToFloat(this.ed_gadas.getText()) + parseFloat(tyay) + parseFloat(this.tjabs) + parseFloat(tprof);
										}
									}else{
										if (parseInt(this.ed_period.getText().substr(4,2)) == this.blnCuti ) cuti = data.nilai1;
									}
									this.sg1.setCell(2,i,floatToNilai(cuti));								
									this.cuti = cuti;
								}else
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TPKS"))
								{
									var pakser = 0;								
									if (parseInt(this.ed_period.getText().substr(4,2)) == this.blnPakser)
									{
										pakser = this.nilaiPakser;
									}
									this.sg1.setCell(2,i,floatToNilai(pakser));
									this.pakser = pakser;
								}else
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "BPLS"))
								{
									//cek dah ambil hp blm  ... ? kl udah cek jabatannya,,,trus ambil selilsihnya dr yg lama 								
									var data = dtKontrak;
									if (data === undefined){		
										var pulsa = 0;								
										var ptmp = this.dtTunjHP.get(this.kodejabs);
										if (ptmp === undefined) ptmp = 0;
										var ptmpf = this.dtTunjHP.get(this.kodejabf);					
										if (ptmpf === undefined) ptmpf = 0;								
										if (parseFloat(ptmpf) > parseFloat(ptmp)) ptmp = parseFloat(ptmpf);
										//kalo hp > 3bln. pulsa tidak.
										//if (this.masaKrj >= this.jmlMasakrj) 
										pulsa = (ptmp === undefined ? 0 : ptmp);
									}else{
										var pulsa = data.nilai1;
									}
									this.sg1.setCell(2,i,floatToNilai(pulsa));		
									this.pulsa = pulsa;
								}else							
								if ((this.sg1.getCell(3,i) == "CAL") && !(this.sg1.getCell(0,i) == "GDAS" || this.sg1.getCell(0,i) == "PDAS" || 
									this.sg1.getCell(0,i) == "TYAY" || this.sg1.getCell(0,i) == "TJAB" || this.sg1.getCell(0,i) == "TPROF" || 
									this.sg1.getCell(0,i) == "THRT" || this.sg1.getCell(0,i) == "TRAN" || this.sg1.getCell(0,i) == "TCUT" || 
									this.sg1.getCell(0,i) == "TPKS" || this.sg1.getCell(0,i) == "BPLS"))
								{								
									var data = dtKontrak;
									if (data === undefined){		
										var value = this.getTunjParam(this.sg1.cells(0,i));									
									}else{
										var value = data.nilai1;
									}
									this.sg1.setCell(2,i,floatToNilai(value));
								}
								/*
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "LMBR"))
								{
									var lmbr = this.getTunjParam(this.sg1.cells(0,i));
									this.sg1.setCell(2,i,floatToNilai(lmbr));
									this.lmbr = lmbr;
								}
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "TKHS"))
								{
									var tkhs = this.getTunjParam(this.sg1.cells(0,i));
									this.sg1.setCell(2,i,floatToNilai(tkhs));
									this.tkhs = tkhs;
								}
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "RAPL"))
								{
									var rapl = this.getTunjParam(this.sg1.cells(0,i));
									this.sg1.setCell(2,i,floatToNilai(rapl));
									this.rapl = rapl;
								}
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "KBKT"))
								{
									var kbkt = this.getTunjParam(this.sg1.cells(0,i));
									this.sg1.setCell(2,i,floatToNilai(kbkt));
									this.kbkt = kbkt;
								}
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "DANA"))
								{
									this.dana = this.getTunjParam(this.sg1.cells(0,i));
									this.sg1.setCell(2,i,floatToNilai(this.dana));
									
								}
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "CUTA"))
								{
									this.cuta = this.getTunjParam(this.sg1.cells(0,i));
									this.sg1.setCell(2,i,floatToNilai(this.cuta));
									
								}
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "ULTH"))
								{
									this.ulth = this.getTunjParam(this.sg1.cells(0,i));
									this.sg1.setCell(2,i,floatToNilai(this.ulth));
									
								}
								if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "LAJR"))
								{
									this.lajr = this.getTunjParam(this.sg1.cells(0,i));
									this.sg1.setCell(2,i,floatToNilai(this.lajr));
									
								}*/
							}
						}
						this.sg1.onChange.set(this, "doChange");										
					break;
			}
		}catch(e)
		{
			alert("doFindBtnClick : " + e);
		}
	},
	doChange2: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
							this.sg2.validasi();
					break;
				case 3 : 
						this.sg2.onChange.set(undefined, undefined);
						for (var i=0; i < this.sg2.rows.getLength(); i++)
						{
							if ((this.sg2.getCell(3,i) == "CAL") && (this.sg2.getCell(0,i) == "PPPH"))
							{
								this.sg2.setCell(2,i,floatToNilai(this.pph21));
								continue;
							}
							if ((this.sg2.getCell(3,i) == "CAL") && (this.sg2.getCell(0,i) == "PTHT") && (this.kodestspeg == "1"))
							{
								var ptht = this.ttht * 2;
								this.sg2.setCell(2,i,floatToNilai(ptht));
								continue;
							}
							if ((this.sg2.getCell(3,i) == "CAL") && !((this.sg2.getCell(0,i) == "PPPH") || (this.sg2.getCell(0,i) == "PTHT")))
							{
								//var line,data = this.dbLib.runSQL("select ifnull(nilai,0) as nilai "+
											 // "from gaji_pot where kode_param='"+this.sg2.getCell(0,i)+"' and kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' and "+this.ed_period.getText()+" between periode1 and periode2");
								 var data = this.dataPotongan;// (dipindah ke onSelectDate atau disaat NIK Change)
								if (data instanceof portalui_arrayMap)
								{
									var nilai = 0;
									for (var p in data.objList){
										line = data.get(p);
										if (line.get("kode_param") == this.sg2.getCell(0,i) && line.get("nik") == this.cb_nik.getText()){
											nilai = parseFloat(line.get("nilai"));																		
											break;
										}
									}
									this.sg2.setCell(2,i,floatToNilai(nilai));
								}							
							}
						}					
						this.sg2.onChange.set(this, "doChange2");
					break;
			}
		}catch(e)
		{
			alert("doFindBtnClick : " + e);
		}
	},
	doNilaiChange: function(){
		try
		{
			this.sg1.onChange.set(undefined, undefined);
			this.hitungPPh();
			this.sg1.onChange.set(this, "doChange");
			var tot = 0; this.pdas = 0; this.tkhs = 0; this.lmbr = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++)
			{
				if (this.sg1.getCell(2,i) != "")
				{
					tot += nilaiToFloat(this.sg1.getCell(2,i));		
					if (this.sg1.getCell(0,i) == 'PDAS') this.pdas = nilaiToFloat(this.sg1.getCell(2,i));
					if (this.sg1.getCell(0,i) == 'TKHS') this.tkhs = nilaiToFloat(this.sg1.getCell(2,i));
					if (this.sg1.getCell(0,i) == 'LMBR') this.lmbr = nilaiToFloat(this.sg1.getCell(2,i));
				}
			}
			this.ed_npdpt.setText(floatToNilai(Math.round(tot)));		
		}catch(e)
		{
			alert("doNilaiChange:"+e);
		}
	},
	doNilaiChange2: function(){
		try
		{
			var tot = 0; 
			for (var i = 0; i < this.sg2.rows.getLength();i++)
			{
				if (this.sg2.getCell(2,i) != "")
				{
					tot += nilaiToFloat(this.sg2.getCell(2,i));			
				}
			}
			this.ed_npot.setText(floatToNilai(Math.round(tot)));
		}catch(e)
		{
			alert("doNilaiChange:"+e);
		}		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
					{
					  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.cb_nik.getText()+")");
					  this.app._mainForm.bClear.click();              
					}else
						 system.info(this, result,"");
					break;
			}
		}
	},
	loadParam: function(){	
		try{
			var data = runArraySQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'\r\n"+
								"select a.kode_jabs, ifnull(a.tunjjab,0) as tunjjab,b.tingkat from hr_tunjjabsna a inner join hr_jabatan b on b.kode_jab = a.kode_jabs and b.kode_lokkonsol = a.kode_lokkonsol where a.kode_lokkonsol = 'table1_kode_lokkonsol'\r\n"+
								"select kode_jabs, kode_jabf, ifnull(tunjjab,0) as tunjjab from hr_tunjjabs where kode_lokkonsol = 'table1_kode_lokkonsol'\r\n"+
								"select kode_jab, pddk, ifnull(tunjjab,0) as tunjjab from hr_tunjjab where kode_lokkonsol = 'table1_kode_lokkonsol'\r\n"+
								"select kode_profesi, pddk, ifnull(tunjprof,0) as tunjprof from hr_tunjprof where kode_lokkonsol = 'table1_kode_lokkonsol'\r\n"+
								"select batasmin, batasmax, ifnull(persen,0) as persen from hr_dplk where kode_lokkonsol = 'table1_kode_lokkonsol' and jenis = 'USIA'\r\n"+
								"select batasmin, batasmax, ifnull(persen,0) as persen from hr_dplk where kode_lokkonsol = 'table1_kode_lokkonsol' and jenis = 'TINGKAT'\r\n"+
								"select kode_jab, ifnull(tarif,0) as tarif from hr_tunjtrans where kode_lokkonsol = 'table1_kode_lokkonsol'\r\n"+
								"select kode_jab,ifnull(pulsa,0) as pulsa from hr_tunjhp where kode_lokkonsol = 'table1_kode_lokkonsol'\r\n"+
								"select kode_ptkp, ifnull(nilai,0) as nilai from gaji_ptkp where kode_lokkonsol = 'table1_kode_lokkonsol'\r\n"+						
								"select kode_spro,value1,value2 "+
										  "from spro where (kode_lokasi = 'table1_kode_lokkonsol' or kode_lokasi = '"+this.app._lokasi+"' )and  kode_spro in ('TYAY','TPKS','TCUT','BYJAB','TPLS','TJAB','HPPH')");			
								
			var dataRes = data.split("\r\n");	
			this.dtJabatansna = dataRes[1].split("<br>");
			this.dtTunjJabs = dataRes[2].split("<br>");
			this.dtTunjJabf = dataRes[3].split("<br>");
			this.dtTunjProf = dataRes[4].split("<br>");
			this.dtDplkUsia = dataRes[5].split("<br>");
			this.dtDplkTingkat = dataRes[6].split("<br>");
			this.dtTunjTrans = dataRes[7].split("<br>");
			this.dtTunjHP = dataRes[8].split("<br>");
			this.dtPtkp = dataRes[9].split("<br>");
			this.lokkonsol = dataRes[0].split("<br>")[1];
			this.dtSpro = dataRes[10].split("<br>");
			for (var i in this.dtSpro){
				if (i == 0) continue;
				line = this.dtSpro[i].split(";");
				if (line[0] == "TYAY") this.nTyay = parseFloat(line[1]);
				if (line[0] == "BYJAB") this.byJab = parseFloat(line[1]);
				if (line[0] == "TCUT") this.blnCuti = parseFloat(line[1]);	
				if (line[0] == "TPLS") this.jmlMasakrj = parseFloat(line[1]);							
				if (line[0] == "TPKS") {
					this.blnPakser = parseFloat(line[1]);	
					this.nilaiPakser = parseFloat(line[2]);	
				}
				if (line[0] == "TJAB") {
					this.jabPT = parseFloat(line[1]);	
					this.jabTKBW = parseFloat(line[2]);	
				}
				if (line[0] == "HPPH") this.tipeHitungPPH = {tipe:parseFloat(line[1]), nilaiPPh:parseFloat(line[2]) };
			}		
			var line,tmp = new portalui_arrayMap();
			for (var i in this.dtJabatansna){
				if (i == 0) continue;
				line = this.dtJabatansna[i].split(";");		
				tmp.set(line[0],{nilai:line[1],tingkat:line[2]});
			}
			this.dtJabatansna = tmp;	
			tmp = new portalui_arrayMap();		
			for (var i in this.dtTunjJabs){
				if (i == 0) continue;
				line = this.dtTunjJabs[i].split(";");		
				data = new portalui_arrayMap();
				data.set("kode_jabs",line[0]),data.set("kode_jabf",line[1]),data.set("tunjjab",line[2]);
				tmp.set(i,data);
			}
			this.dtTunjJabs = tmp;	
			tmp = new portalui_arrayMap();
			for (var i in this.dtTunjJabf){
				if (i == 0) continue;
				line = this.dtTunjJabf[i].split(";");
				data = new portalui_arrayMap();
				data.set("kode_jab",line[0]),data.set("pddk",line[1]),data.set("tunjjab",line[2]);
				tmp.set(i,data);
			}
			this.dtTunjJabf = tmp;	
			tmp = new portalui_arrayMap();
			for (var i in this.dtTunjProf){
				if (i == 0) continue;
				line = this.dtTunjProf[i].split(";");
				data = new portalui_arrayMap();
				data.set("kode_profesi",line[0]),data.set("pddk",line[1]),data.set("tunjprof",line[2]);
				tmp.set(i,data);
			}
			this.dtTunjProf = tmp;	
			tmp = new portalui_arrayMap();
			for (var i in this.dtDplkUsia){
				if (i == 0) continue;
				line = this.dtDplkUsia[i].split(";");
				data = new portalui_arrayMap();
				data.set("batasmin",line[0]),data.set("batasmax",line[1]),data.set("persen",line[2]);
				tmp.set(i,data);
			}
			this.dtDplkUsia = tmp;	
			tmp = new portalui_arrayMap();
			for (var i in this.dtDplkTingkat){
				if (i == 0) continue;
				line = this.dtDplkTingkat[i].split(";");
				data = new portalui_arrayMap();
				data.set("batasmin",line[0]),data.set("batasmax",line[1]),data.set("persen",line[2]);
				tmp.set(i-1,data);
			}
			this.dtDplkTingkat = tmp;
			tmp = new portalui_arrayMap();
			var lineTmp;	
			for (var i in this.dtTunjTrans){
				if (i == 0) continue;
				line = this.dtTunjTrans[i].split(";");		
				tmp.set(line[0],line[1]);
			}
			this.dtTunjTrans = tmp;
			tmp = new portalui_arrayMap();		
			for (var i in this.dtTunjHP){
				if (i == 0) continue;
				line = this.dtTunjHP[i].split(";");
				tmp.set(line[0],line[1]);
			}
			this.dtTunjHP = tmp;
			tmp = new portalui_arrayMap();		
			for (var i in this.dtPtkp){
				if (i == 0) continue;
				line = this.dtPtkp[i].split(";");
				tmp.set(line[0],line[1]);
			}
			this.dtPtkp = tmp;
		}catch(e){
			systemAPI.alert(e);
		}		
	},
	getDplkUsia: function(usia){
		var line;
		for (var i in this.dtDplkUsia.objList){
			line = this.dtDplkUsia.get(i);
			if (parseInt(usia) >= parseInt(line.get("batasmin")) && parseInt(usia) <= parseInt(line.get("batasmax"))){
				return line.get("persen");
			}
		}
		return 0;
	},
	getDplkTingkat: function(tingkat){
		var line;
		for (var i in this.dtDplkTingkat.objList){
			line = this.dtDplkTingkat.get(i);
			if (parseInt(tingkat) >= parseInt(line.get("batasmin")) && parseInt(tingkat) <= parseInt(line.get("batasmax"))){
				return line.get("persen");
			}
		}
		return 0;
	},
	getTunjProf: function(kdProf, pddk){
		var line;
		for (var i in this.dtTunjProf.objList){
			line = this.dtTunjProf.get(i);		
			if (kdProf == line.get("kode_profesi") && pddk == line.get("pddk")){
				return line.get("tunjprof");
			}
		}
		return 0;
	},
	getTunjJabs: function(kdJabs, kdJabf){
		var line;
		for (var i in this.dtTunjJabs.objList){
			line = this.dtTunjJabs.get(i);		
			if (kdJabs == line.get("kode_jabs") && kdJabf == line.get("kode_jabf")){
				return line.get("tunjjab");
			}
		}
		return 0;
	},
	getTunjJabf: function(kdJabf, pddk){
		var line;
		for (var i in this.dtTunjJabf.objList){
			line = this.dtTunjJabf.get(i);
			if (kdJabf == line.get("kode_jab") && pddk == line.get("pddk")){
				return line.get("tunjjab");
			}
		}
		return 0;
	},
	getTunjJabatanStruk: function(){
		try{
			var tjabs2 = 0;
			
			if (this.jenisjabs == "-")
			{
				tjabs2 = 0;
			}
			else
			{
				if (this.jenisjabs == "STRUKTURAL NON AKADEMIK")
				{
					tjabs2 = this.dtJabatansna.get(this.kodejabs);				
					if (tjabs2 === undefined) throw "Data Jabatan Struktural NA tidak ditemukan";
					if (this.app._lokasi != '13' && parseInt(this.ed_tingkat.getText()) < parseInt(tjabs2.tingkat)){
						if (this.kodestspeg == "1")
							tjabs2 = tjabs2.nilai * this.jabPT / 100;
						else //if (this.kodestspeg == "2" || this.kodestspeg == "3")
							tjabs2 = tjabs2.nilai * this.jabTKBW / 100;
							
					}else tjabs2 = tjabs2.nilai; 
					 
				}
				else
				{	
					//sa, cek jab+jabf if no then 90% <---tidak bisa harus dimasukan tabulasi dgn nilai 90%nya
					tjabs2 = this.getTunjJabs(this.kodejabs, this.kodejabf);
				}
			}							
			return tjabs2;
		}catch(e){
			systemAPI.alert(e,"Jabatan ("+this.kodejabs+") tidak terdapat di Data Tunjangan Jabatan Struktural NA");
		}
	},
	getTunjJabatanFung= function(){
		var tjabf;
		if (this.kodejabf == "-"){
		  tjabf = 0;
		}else{	
			tjabf = this.getTunjJabf(this.kodejabf, this.ed_jenjang.getText());
		}
		return tjabf;
	},
	getTunjProfesi: function(){
		var tprof = 0;
		if (this.kodestspeg == "1")
		{		
			if (this.kodeprof == "-")
			{
				tprof = 0;
			}
			else
			{
				if (this.jenisprof == "NONAKADEMIK")
					tprof = this.getTunjProf(this.kodeprof, this.ed_tingkat.getText());
				else
					tprof = this.getTunjProf(this.kodeprof, this.ed_jenjang.getText());
			}
		} 
		return tprof;
	},
	getTunjParam: function(kode){
		var data = this.dataPdpt;
		var nilai = 0;
		if (data instanceof portalui_arrayMap)
		{		
			for (var p in data.objList){
				line = data.get(p);
				if (line.get("kode_param") == kode && line.get("nik") == this.cb_nik.getText()){
					nilai = parseFloat(line.get("nilai"));																		
					break;
				}
			}		
		}	
		return nilai;
	},
	hitungPPh: function(){
		try{
			var rowPPh;
			var totbln = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){
				if ((this.sg1.getCell(3,i) == "CAL") && (this.sg1.getCell(0,i) == "PH21")){
					rowPPh = i;						
				}else if (this.sg1.getCell(0,i) == "THRT"){
					this.ttht = nilaiToFloat(this.sg1.getCell(2,i));
					totbln += nilaiToFloat(this.sg1.getCell(2,i));
				}else if (this.sg1.getCell(0,i) == "PILN"){
					totbln -= nilaiToFloat(this.sg1.getCell(2,i));// ga ikut penjumlahan PPH
				}else totbln += nilaiToFloat(this.sg1.getCell(2,i));
			}		
			if (rowPPh !== undefined){
				var pph21 = 0;												
				//var totbln = nilaiToFloat(this.ed_gadas.getText()) + parseFloat(this.tyay) + parseFloat(this.tprof) + parseFloat(this.tjabs) + parseFloat(this.ttht) + parseFloat(this.ttrans) + parseFloat(this.pulsa) + parseFloat(this.pdas) + parseFloat(this.tkhs) + parseFloat(this.lmbr) + parseFloat(this.cuti) + parseFloat(this.pakser) +  parseFloat(this.dana) +  parseFloat(this.cuta) +  parseFloat(this.rapl)+  parseFloat(this.ulth)+  parseFloat(this.kbkt);														
				var bjbt = Math.round(5/100 * totbln);						
				if ((this.kodejabs != "-" && this.kodejabs != "ST") || (this.kodejabf != "-"))
				{
					if (bjbt > this.byJab) bjbt = this.byJab;
				}						
				
				var ptkp = this.dtPtkp.get(this.ed_status.getText());
				if (this.tipeHitungPPH && this.tipeHitungPPH.tipe == 1){
					var totthn = (totbln - bjbt - this.ttht) - ptkp;
					totthn = totthn * 12;								
					ppph = (totthn > this.tipeHitungPPH.nilai ? 15/100 : 5/100);
					var pphtahun = Math.round(totthn * ppph);
				}else{
					var totthn = (totbln - bjbt - this.ttht) * 12;
					totthn = totthn - ptkp;
					var pphtahun = Math.round(totthn * 5/100);
				}			
								
				pph21 = Math.round(pphtahun/12);			
				this.sg1.setCell(2,rowPPh,floatToNilai(pph21));
				this.pph21 = pph21;
				
				for (var k=0; k < this.sg2.rows.getLength(); k++)
				{
					if ((this.sg2.getCell(3,k) == "CAL") && (this.sg2.getCell(0,k) == "PPPH"))
					{
						this.sg2.setCell(2,k,floatToNilai(this.pph21));
					}
				}	
			}
		}catch(e){
			alert(e);
		}
	},
	getDataKontrak: function(kode){
		var data = this.dataKontrak;
		var nilai = undefined;
		if (data instanceof portalui_arrayMap)
		{		
			for (var p in data.objList){
				line = data.get(p);
				if (line.get("kode_param") == kode){
					nilai = {nilai1: parseFloat(line.get("value1")), nilai2:parseFloat(line.get("value2"))};
					break;
				}
			}		
		}	
		return nilai;	
	}
});
