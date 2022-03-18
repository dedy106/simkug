window.app_kopeg_proyek_fPtgpj = function(owner){
	if (owner){
		window.app_kopeg_proyek_fPtgpj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_proyek_fPtgpj";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Panjar Proyek: Input", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_kb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[275,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Dokumen", maxLength: 50});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,25,480,20],caption:"Keterangan", maxLength: 150});
		this.e_nilaipj = new portalui_saiLabelEdit(this,{bound:[700,25,200,20],caption:"Total Panjar",tipeText:ttNilai,readOnly:true, text:"0"});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,20,200,20],caption:"PP/Unit Kerja", multiSelection:false,change:[this,"doChange"]});
		this.e_pakai = new portalui_saiLabelEdit(this,{bound:[700,20,200,20],caption:"Total Pertanggungan",tipeText:ttNilai,readOnly:true, text:"0"});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,26,200,20], multiSelection:false,caption:"Akun Selisih",change:[this,"doChange"]});		
		this.e_kas = new portalui_saiLabelEdit(this,{bound:[700,26,200,20],caption:"Nilai Selisih",tipeText:ttNilai,readOnly:true, text:"0"});
		this.i_gar = new portalui_imageButton(this,{bound:[900,26,20,20],hint:"Hitung Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"garClick"]});	
		
		this.p0 = new portalui_panel(this,{bound:[20,31,900,150],caption:"Data Panjar Proyek"});
		this.sg0 = new portalui_saiGrid(this.p0,{bound:[0,20,895,120],colCount:6,tag:2,
			    colTitle:["No Panjar","Keterangan","Akun PJ","NIK","Nama","Nilai"],
				colWidth:[[5,4,3,2,1,0],[100,200,80,70,250,150]],
				colFormat:[[5],[cfNilai]],
				columnReadOnly:[true,[0,1,2,3,4,5],[]],
				ellipsClick:[this,"doEllipseClick0"],change:[this,"doChangeCell0"],
				buttonStyle:[[0],[bsEllips]],nilaiChange:[this, "doSgChange0"],defaultRow:1});				
				
				
		this.p1 = new portalui_panel(this,{bound:[20,30,900,270],caption:"Data Jurnal Pemakaian"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,895,220],colCount:9,tag:2,
			    colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,80,150,80,100,70,230,150,80]],colFormat:[[4],[cfNilai]],
				columnReadOnly:[true,[1,6,8,0,3,5],[2,4]],
				ellipsClick:[this,"doEllipseClick"],
				change:[this,"doChangeCell"],
				buttonStyle:[[0,3,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]],
				picklist:[[3],[new portalui_arrayMap({items:["D","C"]})]],
				selectCell:[this,"doSelectCell"],
				defaultRow:1,nilaiChange:[this, "doSgChange"],autoAppend:true});				
			this.sgn2 = new portalui_sgNavigator(this.p1,{bound:[0,242,900,25],buttonStyle:2,grid:this.sg1});				
		
		this.rearrangeChild(10, 22);		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
		    this.sg1.onCellEnter.set(this, "doCellEnter");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();			

			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');			
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'posting'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Selisih",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_proyek_fPtgpj.extend(window.portalui_childForm);
window.app_kopeg_proyek_fPtgpj.implement({
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
	simpan: function(){			
		try{									
			this.hitungGar();
			for (var i in this.gridJurnal.objList)
			{			
				line = this.gridJurnal.get(i);			
				if ((line.get("kode_drk") == "-") && (line.get("kode_akun").substr(0,1) == "5"))
				{
					system.alert(this,"Akun Beban harus diisi DRKnya.","Periksa kembali data akun.");
					return false;
				}
				if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
				{
					system.alert(this,"Nilai transaksi melebihi saldo anggaran.","Periksa kembali data anggaran.");
					return false;
				}
			}
			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
			
					this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ptg_m','no_ptg',this.app._lokasi+"-PTG"+this.e_periode.getText().substr(2,4)+".",'0000'));
					var nkas = nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_pakai.getText());
					for (var i=0; i < this.sg0.rows.getLength(); i++){
						sql.add("update panjar_m set progress = '3' where no_pj='"+this.sg0.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}				
					//akun_pj diisi akun selisih supaya bisa diload di alat_bayar/kasbank masuk 
					//[akun temporary supaya bs di jurnal posting, meski blm selsai kasbanknya]
					sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,"+ 
							"keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,"+
							"modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input)  values "+
							"('"+this.e_kb.getText()+"','PROYEK','-','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"','"+
							this.e_ket.getText()+"','PROYEK','IDR',1,'"+this.cb_akun.getText()+"','-','-','-','"+this.app._lokasi+"','"+this.cb_pp.getText()+
							"','PTG_P',"+parseNilai(this.e_pakai.getText())+","+nkas+",'-','0','F','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',now())");
							
					
					var scr1 = "insert into ptg_j (no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var baris1 = true;
					for (var i=0; i < this.sg1.rows.getLength(); i++){
						if (this.sg1.rowValid(i)) {
							if (!baris1) { scr1 += ",";}	
							scr1 += "('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+i+",'"+this.sg1.getCell(0,i)+
									"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
									"'"+this.app._lokasi+"','PTG_P','BBN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							baris1 = false;
							sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
									"('"+this.e_kb.getText()+"','PJR','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.sg1.cells(3,i)+"',0,"+parseNilai(this.sg1.cells(4,i))+")");
						}
					}	
					for (var i=0; i < this.sg0.rows.getLength(); i++){
						if (this.sg0.rowValid(i)) {
							scr1 += ",";
							scr1 += "('"+this.e_kb.getText()+"','"+this.sg0.cells(0,i)+"','"+this.dp_d1.getDate()+"',"+i+",'"+this.sg0.getCell(2,i)+
									"','"+this.sg0.getCell(1,i)+"','C',"+parseNilai(this.sg0.getCell(5,i))+",'"+this.cb_pp.getText()+"','-',"+
									"'"+this.app._lokasi+"','PTG_P','PJR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						
							sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
									"    select no_bukti,'PTG',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.e_periode.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
									"    from angg_r where no_bukti = '"+this.sg0.cells(0,i)+"' and kode_lokasi = '"+this.app._lokasi+"' and modul ='PJR' ");			
						}
					}
					if (nkas != 0) {
						if (nkas <0) var vDC = "C";
						else var vDC = "D";
						
						scr1 += ",";
						scr1 += "('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',999,'"+this.cb_akun.getText()+
								"','"+this.e_ket.getText()+"','"+vDC+"',"+Math.abs(nkas)+",'"+this.cb_pp.getText()+"','-',"+
								"'"+this.app._lokasi+"','PTG_P','SLS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					sql.add(scr1);
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_kb);
					this.sg0.clear(1);
					this.sg1.clear(1);
				}
				break;			
			case "simpan" :	
				for (var i=0; i < this.sg0.rows.getLength(); i++){
					for (var j=i; j < this.sg0.rows.getLength(); j++){
						if (this.sg0.cells(0,i) == this.sg0.cells(0,j) &&  i!=j) {
							system.alert(this,"Transaksi tidak valid.","Data Panjar duplikasi.");
							return false;
						}
					}
				}
				if (nilaiToFloat(this.e_pakai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pertanggungan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
				
		}
	},
	/*
	doChange: function(sender){
		try{			
			if (sender  == this.cb_pp && this.cb_pp.getText()!="") {
				this.cb_proyek.setSQL("select no_proyek, no_dokumen from kop_proyek_m where kode_pp = '"+this.cb_pp.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",["no_proyek","no_dokumen"],false,["No Proyek","No Dokuemen"],"and","Data Proyek",true);
			}
			if (sender  == this.cb_proyek && this.cb_proyek.getText()!="") {
				this.sg0.clear(1);
				var data = this.dbLib.getDataProvider(" select f.no_pj,f.keterangan,f.akun_pj,f.nik_pengaju,j.nama,f.nilai from "+						
													  " panjar_m f "+
													  "	          inner join karyawan j on f.nik_pengaju = j.nik and f.kode_lokasi = j.kode_lokasi "+																	  
													  " where f.kode_lokasi = '"+this.app._lokasi+"' and f.catatan ='"+this.cb_proyek.getText()+"' and f.kode_pp='"+this.cb_pp.getText()+"' and f.progress='2' and f.modul='PJR_P' and f.periode<='"+this.e_periode.getText()+"' order by f.no_pj");
													  //" where f.kode_lokasi = '"+this.app._lokasi+"' and f.no_pj in ('21-PJR1004.0005' ,'21-PJR1004.0001', '21-PJR1005.0003' ) and f.kode_pp='"+this.cb_pp.getText()+"' and f.progress='2' and f.modul='PJR_P' and f.periode<='"+this.e_periode.getText()+"' order by f.no_pj");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg0.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (line !== undefined)
							this.sg0.appendData([line.no_pj, line.keterangan, line.akun_pj, line.nik_pengaju, line.nama, floatToNilai(line.nilai)]);
					}
					this.sg0.validasi();
					this.sg1.validasi();
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	*/
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
	},
	doEllipseClick0: function(sender, col, row){
		try{								
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Panjar",sender,undefined, 
										  " select f.no_pj,f.keterangan,f.akun_pj,f.nik_pengaju,j.nama,f.nilai from panjar_m f inner join karyawan j on f.nik_pengaju = j.nik and f.kode_lokasi = j.kode_lokasi "+																	  
										  " where f.kode_lokasi = '"+this.app._lokasi+"' and f.kode_pp='"+this.cb_pp.getText()+"' and f.progress='2' and f.modul='PJR_P' and f.periode<='"+this.e_periode.getText()+"' order by f.no_pj",
										  " select count(f.no_pj) from panjar_m f where f.kode_lokasi = '"+this.app._lokasi+"' and f.kode_pp='"+this.cb_pp.getText()+"' and f.progress='2' and f.modul='PJR_P' and f.periode<='"+this.e_periode.getText()+"' ",
										  ["f.no_pj","f.keterangan","f.akun_pj","f.nik_pengaju","j.nama","f.nilai"],"and",["No Panjar","Keterangan","Akun PJ","NIK","Nama","Nilai"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipseClick: function(sender, col, row){
		try{								
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun Jurnal",sender,undefined, 
										  "select kode_akun, nama  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_akun) from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 5){
				this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
										  "select kode_pp, nama  from pp where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_pp)  from pp where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 7){
				this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg1, this.sg1.row, this.sg1.col,
												  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.kode_drk","a.nama"],"and",["Kode RKM","Deskripsi"],true);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCellExit: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 3 : 
				case 4 : 
							this.sg1.validasi();
					break;
			}
		}catch(e)
		{
			systemAPI.alert("doFindBtnClick : " + e);
		}	
	},
	doChangeCell0: function(sender, col, row){
		if (col == 0) { 
			this.sg0.setCell(2,row,this.sg0.dataFromList[2]);
			this.sg0.setCell(3,row,this.sg0.dataFromList[3]);
			this.sg0.setCell(4,row,this.sg0.dataFromList[4]);
			this.sg0.setCell(5,row,floatToNilai(nilaiToFloat(this.sg0.dataFromList[5])));
			
			
			this.sg0.validasi();
			this.sg1.validasi();
		}
	},
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);
		if (col == 0) {
			var akun = this.dataAkun.get(sender.cells(0,row));
			if(akun)
				sender.cells(1,row,akun);
			else {                                    
				if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
				sender.cells(1,row,"");
				sender.cells(2,row,"");
			}
		}
		sender.onChange.set(this,"doChangeCell");
	},
	doSgChange: function(sender, col, row){
		var tot3 = 0;				
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if (this.sg1.cells(4,i) != "") {
				if (this.sg1.cells(3,i) == "D")
					tot3 += nilaiToFloat(this.sg1.cells(4,i));
				else {
					if (this.sg1.cells(3,i) == "C") tot3 = tot3 - nilaiToFloat(this.sg1.cells(4,i));
				}
			}
		}
		this.e_pakai.setText(floatToNilai(tot3));
		this.e_kas.setText(floatToNilai(nilaiToFloat(this.e_nilaipj.getText())-nilaiToFloat(this.e_pakai.getText())));
	},
	doSgChange0: function(sender, col, row){
		var tot3 = 0;				
		for (var i = 0;i < this.sg0.getRowCount();i++){
			if (this.sg0.cells(5,i) != "") {
				tot3 += nilaiToFloat(this.sg0.cells(5,i));
			}
		}
		this.e_nilaipj.setText(floatToNilai(tot3));
		this.e_kas.setText(floatToNilai(nilaiToFloat(this.e_nilaipj.getText())-nilaiToFloat(this.e_pakai.getText())));
	},
	doCellEnter: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
				        if (this.sg1.getCell(2,row) == ""){
				            if (row == 0) this.sg1.setCell(2,row,this.e_ket.getText());
							else this.sg1.setCell(2,row,this.sg1.getCell(2,(row-1)) );
				        }
					break;
				case 5 : 
							if (row == 0) {
								this.sg1.setCell(5,row,this.cb_pp.getText());
								this.sg1.setCell(6,row,this.cb_pp.rightLabelCaption);
							} else {
								if ((this.sg1.getCell(5,row) == "") && (row > 0)) {
									this.sg1.setCell(5,row,this.sg1.getCell(5,(row-1)));
									this.sg1.setCell(6,row,this.sg1.getCell(6,(row-1)));
								}
							}
					break;
				case 7 : 
							if ((this.sg1.getCell(7,row) == "") && (row > 0)) {
								this.sg1.setCell(7,row,this.sg1.getCell(7,(row-1)));
								this.sg1.setCell(8,row,this.sg1.getCell(8,(row-1)));
							}
					break;
			}
		}catch(e)
		{
			alert("doFindBtnClick : " + e);
		}	
	},
	doClick:function(sender){
		if (sender == this.b_gen) {
			this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ptg_m','no_ptg',this.app._lokasi+"-PTG"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.e_dok.setFocus();
		}
	},
	
	hitungGar: function(){
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0;
					
	    for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			if (!this.sg1.rowValid(i)) continue;
			kdAkun = this.sg1.getCell(0,i);
			kdPP = this.sg1.getCell(5,i);
			kdDRK = this.sg1.getCell(7,i);
			
			if (this.sg1.getCell(3,i) == "D") {nreal = nilaiToFloat(this.sg1.getCell(4,i));}
			else {nreal = nilaiToFloat(this.sg1.getCell(4,i)) * -1;}
			
			nemu = false;
			ix = 0;
						
			for (var j in dtJurnal.objList)
			{		
			  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && (kdDRK == dtJurnal.get(j).get("kode_drk")))
			  {
				nemu = true;
				row = dtJurnal.get(j);
				ix = j;
				break;
			  }
			}
			
			if (!nemu){
				row = new portalui_arrayMap();
				row.set("kode_akun",kdAkun);
				row.set("kode_pp",kdPP);
				row.set("kode_drk",kdDRK);
				row.set("nilai",nreal);
				row.set("saldo_gar",0);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			}
		}
		
		if (dtJurnal.getLength() > 0){
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",150);
			desc1.set("kode_pp",150);
			desc1.set("kode_drk",150);
			desc1.set("nilai",150);
			desc1.set("saldo_gar",150);
			
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("kode_pp","S");
			desc2.set("kode_drk","S");	
			desc2.set("nilai","N");
			desc2.set("saldo_gar","N");
			
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
		}
		this.gridJurnal = dtJurnal;
		//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------		
		var nopj=""; 
		for (var i=0;i < this.sg0.getRowCount();i++){
			if (this.sg0.rowValid(i))  {
				nopj += ",'"+this.sg0.cells(0,i)+"'";
			}			
		}
		nopj = nopj.substr(1);	
		
		
		var line = undefined;
		var sls = 0;
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);						
			var strSQL = "select gar1-ifnull(real1,0) AS sisa1,gar2-ifnull(real2,0) AS sisa2,gar3-ifnull(real3,0) AS sisa3,gar4-ifnull(real4,0) AS sisa4   from "+						 
						 "("+
						 "select kode_pp,kode_akun,kode_drk,substring(periode,1,4) as tahun, "+
						 "sum(case when substring(periode, 5,2) between '01' and '03' then case when dc='D' then nilai else -nilai end else 0 end) as gar1,"+
						 "sum(case when substring(periode, 5,2) between '04' and '06' then case when dc='D' then nilai else -nilai end else 0 end) as gar2,"+
						 "sum(case when substring(periode, 5,2) between '07' and '09' then case when dc='D' then nilai else -nilai end else 0 end) as gar3,"+
						 "sum(case when substring(periode, 5,2) between '10' and '12' then case when dc='D' then nilai else -nilai end else 0 end) as gar4 "+
						 "from anggaran_d "+
						 "where substring(periode,1,4)='"+this.e_periode.getText().substr(0,4)+"' and kode_drk='"+line.get("kode_drk")+"' and kode_pp='"+line.get("kode_pp")+"' and kode_akun='"+line.get("kode_akun")+"' "+
						 "group by kode_pp,kode_akun,kode_drk,substring(periode,1,4) "+
						 ")a left outer join "+						 
						 "("+
						 "select kode_pp,kode_akun,kode_drk,substring(periode1,1,4) as tahun, "+
						 "sum(case when substring(periode1, 5,2) between '01' and '03' then case when dc='D' then nilai else -nilai end else 0 end) as real1,"+
						 "sum(case when substring(periode1, 5,2) between '04' and '06' then case when dc='D' then nilai else -nilai end else 0 end) as real2,"+
						 "sum(case when substring(periode1, 5,2) between '07' and '09' then case when dc='D' then nilai else -nilai end else 0 end) as real3,"+
						 "sum(case when substring(periode1, 5,2) between '10' and '12' then case when dc='D' then nilai else -nilai end else 0 end) as real4 "+
						 "from angg_r "+
						 "where no_bukti not in ("+nopj+") and substring(periode1,1,4)='"+this.e_periode.getText().substr(0,4)+"' and kode_drk='"+line.get("kode_drk")+"' and kode_pp='"+line.get("kode_pp")+"' and kode_akun='"+line.get("kode_akun")+"' "+
						 "group by kode_pp,kode_akun,kode_drk,substring(periode1,1,4) "+
						 ")b on a.kode_pp=b.kode_pp and a.kode_akun=b.kode_akun and a.kode_drk=b.kode_drk and a.tahun=b.tahun ";
			var baris,data = this.dbLib.runSQL(strSQL);
			if (data instanceof portalui_arrayMap)
			{
				baris = data.get(0);
				if (baris != undefined)
				{
					if (this.e_periode.getText().substr(4,2)=="01" || this.e_periode.getText().substr(4,2)=="02" || this.e_periode.getText().substr(4,2)=="03") sls = parseFloat(baris.get("sisa1"));					
					if (this.e_periode.getText().substr(4,2)=="04" || this.e_periode.getText().substr(4,2)=="05" || this.e_periode.getText().substr(4,2)=="06") sls = parseFloat(baris.get("sisa2"));
					if (this.e_periode.getText().substr(4,2)=="07" || this.e_periode.getText().substr(4,2)=="08" || this.e_periode.getText().substr(4,2)=="09") sls = parseFloat(baris.get("sisa3"));
					if (this.e_periode.getText().substr(4,2)=="10" || this.e_periode.getText().substr(4,2)=="11" || this.e_periode.getText().substr(4,2)=="12") sls = parseFloat(baris.get("sisa4"));
					
					line.set("saldo_gar",sls);
					this.gridJurnal.set(i,line);		
				} 
			}
			else alert(data);
		}	
	},
	garClick: function(sender){
		try
		{
			if (this.e_pakai.getText() != "0")
			{
				this.jurnal.sg.clear();
				this.hitungGar();
				if (this.gridJurnal != undefined){				
					this.jurnal.setData(this.gridJurnal);
					this.jurnal.showModal();
				}
			}
		} catch	(e){
			alert(e);
		}
	},
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No Bukti : "+ this.e_kb.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});