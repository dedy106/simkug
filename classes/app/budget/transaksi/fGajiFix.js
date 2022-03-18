window.app_budget_transaksi_fGajiFix = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fGajiFix.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fGajiFix";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Perhitungan Biaya Gaji Karyawan", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar");
		this.eLokasi = new portalui_saiCBBL(this,{bound:[20,24,200,20],change:[this,"doChange"],caption:"Lokasi", multiSelection:false});
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,21,182,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,23,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,23,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
		this.cPP = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"PP", multiSelection:false});
		this.bLoad = new portalui_button(this,{bound:[820,24,100,20],caption:"Hitung",click:[this,"doClick"]});
		
		uses("portalui_saiGrid;portalui_sgNavigator");
		this.p1 = new portalui_panel(this,{bound:[20,26,900,440],caption:"Data Penggajian"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,390],colCount:8,
								colWidth:[[0,1,2,3,4,5,6,7],[100,200,60,100,100,100,100,100]]});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,415,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 30,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);		
		
		var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
		eval("data = "+data+";");
		if (typeof data == "object"){
			var line;
			line = data.rs.rows[0];							
			this.eTahun.setText(line.tahun);
		}
		var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.eTahun.getText()+"'",true);
		if (typeof data == "object"){
			this.prog = data.rs.rows[0].progress;
		}
		
		this.eLokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);		
		this.eLokasi.setText(this.app._lokasi);		
		this.initColumn();
	}
};
window.app_budget_transaksi_fGajiFix.extend(window.portalui_childForm);
window.app_budget_transaksi_fGajiFix.implement({	
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(); this.sg1.appendRow(); 
				}
				break;
			case "simpan" :
					try{
						if (this.prog != "0") {
							system.alert(this,"Transaksi tidak valid.","Transaksi SDM/SPPD telah di Close.");
							return false;
						} 

						uses("server_util_arrayList");
						var sql = new server_util_arrayList();												
						// INSERT UTK SATU TAHUN or LOOP 12 kali											
						var line, param,sqlText;		
						var fieldName = this.colTitle;	
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_gaji_m","no_gaji",this.eLokasi.getText()+"-GJ"+this.eTahun.getText()+'.',"000"));
						sql.add("delete from agg_gaji_m where kode_lokasi='"+this.eLokasi.getText()+"' and tahun= '"+this.eTahun.getText()+"'");
						sql.add("delete a from agg_gaji_d a inner join agg_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun where a.kode_lokasi='"+this.eLokasi.getText()+"' and a.tahun= '"+this.eTahun.getText()+"'");
						sql.add("delete a from agg_d a inner join agg_karyawan b on a.no_bukti=b.nik and a.tahun=b.tahun where a.modul='BGAJI' and a.tahun= '"+this.eTahun.getText()+"' and b.kode_lokasi='"+this.eLokasi.getText()+"' ");
						
						sql.add("insert into agg_gaji_m(no_gaji,kode_lokasi,keterangan,tahun,jenis,tgl_input,nik_user) values "+
								"('"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','-','"+this.eTahun.getText()+"','X',now(),'"+this.app._userLog+"')");											
						showProgress("Prepare Saving of "+this.dataGaji.length+" data");
						for (var i in  this.dataGaji){	
							line = this.dataGaji[i];
							showProgress("proses "+i+" of "+this.dataGaji.length+" data. "+ line[1]);
                            for (var c in this.colTitle){
								fieldName = this.colTitle[c].toLowerCase();										
                                if (parseFloat(line[fieldName]) > 0){									
									param = this.dataParam.get(fieldName);
									if (param && param.jns_periode.substr(0,1) == "A"){
										var p = 1;
										while (p <=12){
											sqlText ="insert into agg_gaji_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi, tahun)values";							
											sqlText += "('"+line.nik+"','"+fieldName+"','"+this.eTahun.getText()+(p < 10 ? "0" + p :p)+"','"+line.jenis_agg.substr(0,1)+"','F','"+this.cPP.getText()+"','"+parseFloat(line[fieldName])+"','"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+"') ";  //line.kode_pp
											sql.add(sqlText);
											p += 3;
										}
									}else if (param && param.jns_periode.substr(0,1) == "B"){
										sqlText ="insert into agg_gaji_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi,tahun)values";
										sqlText += "('"+line.nik+"','"+fieldName+"','"+this.eTahun.getText()+"01','"+line.jenis_agg.substr(0,1)+"','F','"+this.cPP.getText()+"','"+parseFloat(line[fieldName])+"','"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+"') "; //line.kode_pp
										sql.add(sqlText);
										sqlText ="insert into agg_gaji_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi,tahun)values";							
										sqlText += "('"+line.nik+"','"+fieldName+"','"+this.eTahun.getText()+"07','"+line.jenis_agg.substr(0,1)+"','F','"+this.cPP.getText()+"','"+parseFloat(line[fieldName])+"','"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+"') "; //line.kode_pp
										sql.add(sqlText);
									}else if (param && param.jns_periode.substr(0,1) == "C"){
										for (var p=1; p <= 12; p++){
											sqlText ="insert into agg_gaji_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi,tahun)values";							
											sqlText += "('"+line.nik+"','"+fieldName+"','"+this.eTahun.getText()+(p < 10 ? "0" + p :p)+"','"+line.jenis_agg.substr(0,1)+"','F','"+this.cPP.getText()+"','"+parseFloat(line[fieldName])+"','"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+"') "; //line.kode_pp
											sql.add(sqlText);
										}
									}
									else if (param && param.jns_periode.substr(0,1) == "D"){
										sqlText ="insert into agg_gaji_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi,tahun)values";							
										sqlText += "('"+line.nik+"','"+fieldName+"','"+this.eTahun.getText()+"04','"+line.jenis_agg.substr(0,1)+"','F','"+this.cPP.getText()+"','"+parseFloat(line[fieldName])+"','"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+"') "; //line.kode_pp
										sql.add(sqlText);
										sqlText ="insert into agg_gaji_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi,tahun)values";							
										sqlText += "('"+line.nik+"','"+fieldName+"','"+this.eTahun.getText()+"10','"+line.jenis_agg.substr(0,1)+"','F','"+this.cPP.getText()+"','"+parseFloat(line[fieldName])+"','"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+"') "; //line.kode_pp
										sql.add(sqlText);
									}else if (param){
										var p = parseFloat(param.jns_periode);
										sqlText ="insert into agg_gaji_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi,tahun)values";							
										sqlText += "('"+line.nik+"','"+fieldName+"','"+this.eTahun.getText()+(p < 10 ? "0" + p :p)+"','"+line.jenis_agg.substr(0,1)+"','F','"+this.cPP.getText()+"','"+parseFloat(line[fieldName])+"','"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+"') ";//line.kode_pp
										sql.add(sqlText);
									}
    							}														        							
							}								
						}											
						showProgress("saving "+i+" of "+this.dataGaji.length+" data.");						
						//masukin data gaji custom misal : retensi
						for (var p=1; p <= 12; p++){
							sql.add("insert into agg_gaji_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi,tahun) "+
									" select a.nik,a.kode_param,'"+this.eTahun.getText()+(p < 10 ? "0" + p :p)+"','E','F','"+this.cPP.getText()+"',a.nilai,'"+this.ed_nb.getText()+"',a.kode_lokasi,'"+this.eTahun.getText()+
									"' from agg_gaji_custom a inner join agg_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun where a.tahun = '"+this.eTahun.getText()+"' and a.kode_lokasi ='"+this.eLokasi.getText()+"' ");
						}
						//tdas tambah index kota
						sql.add("update a set a.nilai = round(a.nilai*c.idx/100,0) "+
								"from agg_gaji_d a "+
								"inner join agg_karyawan b on a.nik=b.nik "+
								"inner join agg_kota c on b.kode_kota=c.kode_kota "+
								"where a.kode_param = 'tdas' and b.status_org in ('7','9') and a.kode_lokasi='"+this.eLokasi.getText()+"' and a.tahun = '"+this.eTahun.getText()+"' "); 
						
						sql.add("update a set a.nilai = a.nilai+b.kenaikan "+
								"from agg_gaji_d a  "+
								"inner join "+
								"( "+
								"select a.nik,c.idx,round(a.nilai*c.idx/100,0) - a.nilai as kenaikan "+
								"from agg_gaji_d a  "+
								"inner join agg_karyawan b on a.nik=b.nik "+
								"inner join agg_kota c on b.kode_kota=c.kode_kota "+
								"where a.kode_param = 'tdas' and b.status_org in ('7','9') "+
								") b on a.nik=b.nik "+
								"where a.kode_lokasi='"+this.eLokasi.getText()+"' and a.tahun = '"+this.eTahun.getText()+"' and a.kode_param in ('thr','cuti','psg','mf','ppn','bas','jms','ins')");
								
						//thr,ins,mf di tambah nilai custom misal : retensi
						sql.add("update a set a.nilai=a.nilai+c.nilai "+
								"from agg_gaji_d a "+
								"inner join agg_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
								"inner join agg_gaji_custom c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
								"where a.kode_param in ('thr','ins','mf') and a.kode_lokasi='"+this.eLokasi.getText()+"' and a.tahun = '"+this.eTahun.getText()+"' "); 
						
								
								
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,keterangan,progress,jenis_agg) "+
								"select "+
								"	case when (zz.status_org = '8' and x.kode_pp<>'X') then substring(x.kode_pp,1,2) "+
								"		 when (zz.status_org = '8' and x.kode_pp='X') then '"+this.cPP.getText().substr(0,2)+"' "+
								"		 when (zz.status_org = '9' and x.kode_pp2<>'X') then substring(x.kode_pp2,1,2) "+
								"		 when (zz.status_org = '9' and x.kode_pp2='X') then '"+this.cPP.getText().substr(0,2)+"' "+
								"		 when (zz.status_org = '7' and x.kode_pp3<>'X') then substring(x.kode_pp3,1,2) "+
								"		 when (zz.status_org = '7' and x.kode_pp3='X') then '"+this.cPP.getText().substr(0,2)+"' "+
								"		 when (zz.status_org = '6' and x.kode_pp4<>'X') then substring(x.kode_pp4,1,2) "+
								"		 when (zz.status_org = '6' and x.kode_pp4='X') then '"+this.cPP.getText().substr(0,2)+"' "+
								"		 when (zz.status_org = '5' and x.kode_pp5='Y') then '"+this.cPP.getText().substr(0,2)+"' "+
								"		 when (zz.status_org = '5' and x.kode_pp5='X') then '"+this.cPP.getText().substr(0,2)+"' "+
								"		 when (zz.status_org = '5' and x.kode_pp5='993100') then substring(x.kode_pp5,1,2) "+
								"	end as kode_lokasi, "+
								"	case when (zz.status_org = '8') then substring(x.kode_rka,1,7)  "+
								"		 when (zz.status_org = '9') then substring(x.kode_rka2,1,7) "+
								"		 when (zz.status_org = '7') then substring(x.kode_rka3,1,7) "+
								"		 when (zz.status_org = '6') then substring(x.kode_rka4,1,7) "+
								"		 when (zz.status_org = '5') then substring(x.kode_rka5,1,7) "+
								"	end as kode_pk, "+ 
								"	case when (zz.status_org = '8') then substring(x.kode_rka,1,9)  "+
								"		 when (zz.status_org = '9') then substring(x.kode_rka2,1,9) "+
								"		 when (zz.status_org = '7') then substring(x.kode_rka3,1,9) "+
								"		 when (zz.status_org = '6') then substring(x.kode_rka4,1,9) "+
								"		 when (zz.status_org = '5') then substring(x.kode_rka5,1,9) "+
								"	end as kode_drk, "+
								"	case when (zz.status_org = '8') then x.kode_rka   "+
								"		 when (zz.status_org = '9') then x.kode_rka2  "+
								"		 when (zz.status_org = '7') then x.kode_rka3  "+
								"		 when (zz.status_org = '6') then x.kode_rka4  "+
								"		 when (zz.status_org = '5') then x.kode_rka5  "+
								"	end as kode_rka,  "+
								"	case when (zz.status_org = '8') then x.kode_akun  "+
								"		 when (zz.status_org = '9') then x.kode_akun2 "+
								"		 when (zz.status_org = '7') then x.kode_akun3 "+
								"		 when (zz.status_org = '6') then x.kode_akun4 "+
								"		 when (zz.status_org = '5') then x.kode_akun5 "+
								"	end as kode_akun, "+
								"	case when (zz.status_org = '8' and x.kode_pp<>'X') then x.kode_pp "+
								"		 when (zz.status_org = '8' and x.kode_pp='X') then '"+this.cPP.getText()+"' "+
								"		 when (zz.status_org = '9' and x.kode_pp2<>'X') then x.kode_pp2 "+
								"		 when (zz.status_org = '9' and x.kode_pp2='X') then '"+this.cPP.getText()+"' "+
								"		 when (zz.status_org = '7' and x.kode_pp3<>'X') then x.kode_pp3 "+
								"		 when (zz.status_org = '7' and x.kode_pp3='X') then '"+this.cPP.getText().substr(0,2)+"1000' "+
								"		 when (zz.status_org = '6' and x.kode_pp4<>'X') then x.kode_pp4 "+
								"		 when (zz.status_org = '6' and x.kode_pp4='X') then '"+this.cPP.getText()+"' "+
								"		 when (zz.status_org = '5' and x.kode_pp5='993100') then x.kode_pp5 "+
								"		 when (zz.status_org = '5' and x.kode_pp5='X') then '"+this.cPP.getText().substr(0,2)+"3000' "+
								"		 when (zz.status_org = '5' and x.kode_pp5='Y') then '"+this.cPP.getText().substr(0,2)+"1000' "+
								"	end as kode_pp, "+
								"	a.periode,substring(a.periode,5,2),1,1,a.nilai,a.tahun,a.nik,'BGAJI','-' as nama_rka,'0',"+
								"	case when zz.status_org in ('5','6','8') then x.flag "+
								"        when zz.status_org in ('7','9') then x.flag2 "+
								"   end jenis_agg  "+
								"from agg_gaji_d a "+
								"inner join agg_param	x on a.kode_param=x.kode_param and a.tahun=x.tahun "+
								"inner join agg_karyawan zz on a.nik=zz.nik and a.kode_lokasi=zz.kode_lokasi and a.tahun=zz.tahun "+
								"where a.nilai<> 0 and a.tahun='"+this.eTahun.getText()+"' and a.kode_lokasi='"+this.eLokasi.getText()+"'");				
						
						sql.add("update a set a.keterangan = c.nama "+
								"from agg_d a inner join agg_karyawan b on a.no_bukti=b.nik and a.tahun=b.tahun "+
								"			  inner join agg_rka c on a.kode_rka=c.kode_rka and a.tahun=c.tahun "+
								"where a.modul='BGAJI' and a.tahun= '"+this.eTahun.getText()+"' and b.kode_lokasi='"+this.eLokasi.getText()+"' ");
						
						this.dbLib.execArraySQL(sql);
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}		
	},
	doChange: function(sender){
		if (this.eLokasi.getText()!= "") {
			this.cPP.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.eLokasi.getText()+"' and tipe = 'posting'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		}
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_gaji_m","no_gaji",this.eLokasi.getText()+"-GJ"+this.eTahun.getText()+'.',"000"));
		
		if (sender == this.bLoad){
			if (this.cPP.getText() != "") {
				try{
					var sqlAll = new server_util_arrayList();
					var sql ="select a.nik, a.nama, case when a.jenis_agg='E' then 'EXIST' when a.jenis_agg='P' then 'ESTIMASI' else 'TAMBAH' end as jenis_agg, a.kode_pp, a.kode_band,a.kode_loker, a.kode_jab, a.kode_kota,c.idx as idx,  datediff(month, a.tgl_masuk, getDate())  as mk, a.status, a.status_org ";
					
					for (var c in this.colTitle) sql += ",round(isnull(b."+this.colTitle[c]+",0),0) as "+this.colTitle[c];
					sql +=" from agg_karyawan a "+
						"inner join agg_kota c on a.kode_kota=c.kode_kota "+										
						"left join (select y.kode_band ";
					
					for (var c in this.colTitle) sql += ",isnull(sum(case y.kode_param when '"+this.colTitle[c]+"' then y.jumlah * y.nilai end),0) as "+this.colTitle[c];				
					sql +=	"	   from agg_norma_fix y where tahun = '"+this.eTahun.getText()+"' "+
						"	   group by y.kode_band "+
						"	   )b on a.kode_band=b.kode_band "+
						" where a.tahun='"+this.eTahun.getText()+"' and a.kode_lokasi='"+this.eLokasi.getText()+"' and substring(a.kode_band,1,2)<>'00' order by a.kode_band";							
					//
					sqlAll.add(sql);				
					
					sqlAll.add("select kode_band,kode_param, persen, nilai, nilai_sat, kali from agg_norma_fix where tahun = '"+this.eTahun.getText()+"' order by kode_band");				
					sqlAll.add("select jml_awal, jml_akhir, persen from agg_gaji_mk");
					var total = 0,dataProvider = this.dbLib.getMultiDataProvider(sqlAll,true);
					if (typeof dataProvider != "string"){
						var line,data = [], band, detNorma;
						this.sg1.clear();
						this.dataGaji = [];
						this.dataNorma =new portalui_arrayMap();
						for (var i in dataProvider.result[1].rs.rows){
							line = dataProvider.result[1].rs.rows[i];
							if (band != line.kode_band){							
								this.dataNorma.set(band, new portalui_arrayMap());
								band = line.kode_bank;
							}
							detNorma = this.dataNorma.get(band);
							detNorma.set(line.kode_param, line);						
						}					
						this.dataMasaKerja = dataProvider.result[2].rs.rows;
						var nilai, field, paramValue = new portalui_arrayMap();
						for (var i in dataProvider.result[0].rs.rows){
							line = dataProvider.result[0].rs.rows[i];
							data = [line.nik, line.nama, line.jenis_agg.toUpperCase(), line.kode_pp, line.kode_band, line.kode_loker, line.kode_jab, line.kode_kota, line.idx];
							total = 0;						
							for (var c in this.colTitle) {				
								field = this.colTitle[c];			
								nilai = parseFloat(line[field.toLowerCase()]);
								dtNorma = detNorma.get(line.kode_band);							
								switch (field){
									case "GDAS": 
										/*
										var persen = 0, mk;
										for (var i in this.dataMasaKerja){
											mk = this.dataMasaKerja[i];
											if (mk.jml_awal <= line.mk && line.mk >= mk.jml_akhir) 
												persen = mk.persen;										
										}
										if (mk && mk.jml_akhir < line.mk) persen = mk.persen;
										nilai = nilai * persen / 100;
										*/										
									break;
									case "TPOS"://sesuai norma
									break;
									case "TDAS": 
										//if (dtNorma && dtNorma.get(field)) 
										//	nilai = nilai * line.idx * dtNorma.get(field).persen / 100;																
									break;
									case "TRET":
									break;
									case "THP":
										//nilai =  (parseFloat(line["gdas"]) + parseFloat(line["tpos"]) + parseFloat(line["tdas"]) + parseFloat(line["tret"]) );
									break;
									case "TKSJ":								
									case "TKSJP":								
									case "TFAS":								
									case "TFASP": //sesuai norma								
									case "PKER":
									break;
									case "CUTI":									
										//nilai =  (parseFloat(line["gdas"]) + parseFloat(line["tpos"]) + parseFloat(line["tdas"]) + parseFloat(line["tret"]));
									break;
									case "LBR":
									break;
									case "UMLBR":
									break;
									case "UTLBR":
									break;																
									case "THR": 
										//nilai =  (parseFloat(line["gdas"]) + parseFloat(line["tpos"]) + parseFloat(line["tdas"]) + parseFloat(line["tret"]));
									break;		
									case "SF":
									case "SFP":
									break;
									case "PTPKK":
									case "PADUM":
										//nilai =  (parseFloat(line["gdas"]) + parseFloat(line["tpos"]) + parseFloat(line["tdas"]) + parseFloat(line["tret"])) * 2;
									break;
									case "JAMS":
										//nilai =  Math.round((parseFloat(line["gdas"]) + parseFloat(line["tpos"]) + parseFloat(line["tdas"]) + parseFloat(line["tret"])) * (10.24 / 100));
									break;
									case "MF": //100 % total gaji
									break;
									case "PPN": //100 % total gaji
									break;
									case "PKP": 
										//nilai =  (parseFloat(line["pph"]) * 12);
									break;
									case "PLTH": //table pelatihan
									case "SEM": //table pelatihan
									break;
									case "IBOR":
									case "IBOP":
									case "IBOH":
									case "RKR":
									case "PKERT":
									case "PKSR"://sesuai norma
									case "PHG":
									break;
									case "LKBM": 
										//if (line.status == 0 && line.kode_band == "03.01") ;
										//else nilai = 0;
									break;
									case "LKBMP":
										//if (line.status == 0 && (line.kode_band >= "01" && line.kode_band <= "02.01")) ;
										//else nilai = 0;
									break;
									case "TLKBM":
										//if (line.status == 0) ;
										//else nilai = 0;
									break;								
								}							
								line[field.toLowerCase()] = nilai;
								
								data[data.length] = floatToNilai(nilai);
								total += parseFloat(line[field.toLowerCase()]);
							}
							//line["mf"] = Math.round(total * 10 /100);
							//line["ppn"] = Math.round((total + (total * 10 / 100)) * 0.1);
							//total += line["mf"] + line ["ppn"];
							data[data.length] = floatToNilai(total);						
							this.dataGaji[this.dataGaji.length] = line;
						}
						this.loadData(1);
						this.sgn.setTotalPage(Math.ceil(this.dataGaji.length / 20));
						this.sgn.rearrange();
					}
				}catch(e){
					alert(e+ dataProvider);
				}
			} 
			else system.alert(this,"PP harus diisi","");
		}
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}
	},
	initColumn: function(){
		try{
			var data = this.dbLib.getDataProvider("select kode_param, nama, jns_periode  from agg_param where tahun = '"+this.eTahun.getText()+"' and jenis = 'PDPT' order by no_urut",true);
			if (typeof data != "string"){							
				this.sg1.setColCount(data.rs.rows.length + 10);
				var line,title = [];	
                var hint = ["NIK","NAMA","JENIS","KODE PP","BAND","LOKER","JABATAN","KOTA","INDEX"];				
                this.dataParam = new portalui_arrayMap();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					title.push(line.kode_param);					
					hint.push(line.nama.toUpperCase()+"-"+line.jns_periode);
					this.sg1.columns.get(parseInt(i)+9).setHint(line.nama);
					this.sg1.columns.get(parseInt(i)+9).setColumnFormat(cfNilai);
					if (line.nama.length <= 15)
						this.sg1.columns.get(parseInt(i)+9).setColWidth(100);
					else this.sg1.columns.get(parseInt(i)+9).setColWidth(250);
					this.dataParam.set(line.kode_param.toLowerCase(), line);
				}					
				hint.push("TOTAL");
				this.sg1.columns.get(8).setColumnFormat(cfNilai);
				this.sg1.columns.get(data.rs.rows.length+9).setColumnFormat(cfNilai);
				this.sg1.setColWidth([1],[200]);
				this.sg1.setColTitle(hint);
				this.colTitle = title;
			}
		}catch(e){
			alert(e);
		}
	},
	loadData: function(page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		if (finish > this.dataGaji.length ) finish = this.dataGaji.length;
		this.sg1.clear();
		var data, total;
		for (var i=start;i < finish;i++){
			line = this.dataGaji[i];
			data = [line.nik, line.nama, line.jenis_agg.toUpperCase(), line.kode_pp, line.kode_band, line.kode_loker, line.kode_jab, line.kode_kota, line.idx];
			total = 0;
			for (var c in this.colTitle) {
				data[data.length] = floatToNilai(line[this.colTitle[c].toLowerCase()]);
				total += parseFloat(line[this.colTitle[c].toLowerCase()]);
			}
			data[data.length] = floatToNilai(total);
			this.sg1.appendData(data);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page){
		this.loadData(page);
	}
});
