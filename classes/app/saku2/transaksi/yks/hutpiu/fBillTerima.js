window.app_saku2_transaksi_yks_hutpiu_fBillTerima = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fBillTerima.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_hutpiu_fBillTerima";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing TAK Terima: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.e_debet = new saiLabelEdit(this,{bound:[790,15,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[790,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
				
		this.bTampil = new button(this,{bound:[560,17,80,18],caption:"Tampil Data",click:[this,"doTampil"]});					
		this.i_appAll = new portalui_imageButton(this,{bound:[650,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.bJurnal = new button(this,{bound:[698,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,970,330], childPage:["Data Bukti Jurnal","Detail Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
				colTitle:["Status","No Piutang","Modul","Lokasi Asal","Nilai"],
				colWidth:[[4,3,2,1,0],[100,100,100,150,80]],
				columnReadOnly:[true,[0,1,2,3,4],[]],
				colFormat:[[4],[cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK","Lokasi Tuj"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7,8],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[910,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_hutpiu_fBillTerima.extend(window.childForm);
window.app_saku2_transaksi_yks_hutpiu_fBillTerima.implement({
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','TAKTERIMA','X','F')");	
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "0"){
								sql.add("insert into yk_valid_j(no_valid,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','TAKKIRIM','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
																
								/*
								if (this.sg2.cells(6,i) != "-") {
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','ARTAKTRM','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+parseNilai(this.sg2.cells(4,i))+")");
								}
								*/
							}
						}
					}

					for (var i=0;i < this.sg.getRowCount();i++){						
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
							sql.add("update yk_valid_tak set progress='1',no_terima='"+this.e_nb.getText()+"' where no_valid='"+this.sg.cells(1,i)+"' and jenis='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.sg.cells(3,i)+"' and kode_loktuj='"+this.app._lokasi+"'");
							if (this.sg.cells(2,i) == "TAKBILL") {					
								sql.add("insert into yk_bill_d(no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,band,nikkes,pasien,tgl_masuk,tgl_keluar,dokter,icdx,kode_produk,nilai,nilai_kunj,nilai_cs,pph,loker_valid,no_hutang,no_piutang,loker_bast,no_kas,jenis,periode,no_app,no_valid,no_tak,flag_aktif,no_selesai,no_rujuk,kode_keg) "+
										"select '"+this.e_nb.getText()+"',a.no_urut,'"+this.app._lokasi+"',a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker_bast,a.band,a.nikkes,a.pasien,a.tgl_masuk,a.tgl_keluar,a.dokter,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs,0,loker_bast,a.no_tak,'"+this.e_nb.getText()+"',loker_bast,a.no_piutang,'TAKTERIMA','"+this.e_periode.getText()+"',a.no_app,'VALID2012','-','1','-',a.no_rujuk,a.kode_keg "+ //no_piutang = no_bill asal diisikan ke no_kas
										"from yk_bill_tak a inner join yk_valid_tak b on a.no_tak=b.no_valid and a.kode_lokkirim=b.kode_lokasi and b.jenis='"+this.sg.cells(2,i)+"' and a.kode_lokasi=b.kode_loktuj and a.no_kas=b.jenis "+
										"where a.no_kas+a.no_tak='"+this.sg.cells(2,i)+this.sg.cells(1,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"'"); 								
							}
							if (this.sg.cells(2,i) == "TAKKJ" || this.sg.cells(2,i) == "TAKCS") {
								sql.add("insert into yk_billkunj_d(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,kode_produk,loker_valid,no_piutang,loker_bast,no_kas,periode,umum,gigi,kbia,matkes,cs,no_valid,no_tak,flag_aktif,jenis,no_selesai,no_rujuk,kode_keg) "+
										"select '"+this.e_nb.getText()+"',a.no_urut,'"+this.app._lokasi+"',a.no_ref,a.nik,a.nama,a.loker_bast,a.band,a.nikkes,a.pasien,a.dokter,a.tgl_masuk,a.kode_produk,loker_bast,'"+this.e_nb.getText()+"',loker_bast,a.no_tak,'"+this.e_periode.getText()+"',a.umum,a.gigi,a.kbia,a.matkes,a.cs,'VALID2012','-','1','TAKTERIMA','-',a.no_rujuk,a.kode_keg "+
										"from yk_billkunj_tak a inner join yk_valid_tak b on a.no_tak=b.no_valid and a.kode_lokkirim=b.kode_lokasi and b.jenis='"+this.sg.cells(2,i)+"' and a.kode_lokasi=b.kode_loktuj "+
										"where a.no_kas+a.no_tak='"+this.sg.cells(2,i)+this.sg.cells(1,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"'");
							}							
						}
					}			
					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
				break;
			case "simpan" :					
				this.sg2.validasi();
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick(this.i_gen);
	},
	doTampil:function(sender){		
		if (this.e_periode.getText() != "") {
			var strSQL = "select b.no_valid,b.jenis,b.kode_lokasi,b.nilai "+
			             "from yk_valid_tak b inner join yk_valid_m a on a.no_valid=b.no_valid and a.kode_lokasi=b.kode_lokasi "+
						 "where a.modul = 'TAKKIRIM' and b.no_terima='-' and b.progress = '0' and b.periode<='"+this.e_periode.getText()+"' and b.kode_loktuj = '"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_valid,line.jenis,line.kode_lokasi,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Data tidak valid.","Periode harus diisi.");
	},
	doJurnal:function(sender){		
		try {
			var nobill = nokunj = nocs = "";					
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "TAKBILL") {					
					nobill += ",'"+this.sg.cells(1,i)+"'";					
				}
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "TAKKJ") {					
					nokunj += ",'"+this.sg.cells(1,i)+"'";					
				}
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "TAKCS") {					
					nocs += ",'"+this.sg.cells(1,i)+"'";					
				}
			}			
			nobill = nobill.substr(1); if (nobill == "") nobill = "''";
			nokunj = nokunj.substr(1); if (nokunj == "") nokunj = "''";
			nocs   = nocs.substr(1);   if (nocs == "")   nocs = "''";
			
			var strSQL = "select 'TT PIUTANG PENGOBATAN ' as ket,c.akun_takbp as kode_akun,d.nama as nama_akun,'C' as dc, "+
						 "sum(a.nilai) as nilai,'TAKBILL' as jenis, '-' as kode_drk,'-' as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_bill_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	         inner join yk_produk c on a.kode_produk=c.kode_produk "+
						 "		 	         inner join masakun d on c.akun_takbp=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "where a.nilai<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nobill+") "+
						 "group by b.kode_lokasi,c.akun_takbp,d.nama "+						 
						 "union all "+						 
						 "select 'TT PIUTANG KUNJUNGAN ' as ket,c.akun_takbp as kode_akun,d.nama as nama_akun,'C' as dc, "+
						 "sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'TAKKJ' as jenis, '-' as kode_drk,'-' as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	             inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	             inner join masakun d on c.akun_takbp=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "where (a.umum+a.gigi+a.kbia+a.matkes)<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nokunj+") "+
						 "group by b.kode_lokasi,c.akun_takbp,d.nama "+
						 "union all "+
						 "select 'TT COST SHARING ' as ket,c.akun_takbp as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.cs) as nilai,'TAKCS' as jenis, '-' as kode_drk,'-' as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	             inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	             inner join masakun d on c.akun_takbp=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "where a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nocs+") "+
						 "group by b.kode_lokasi,c.akun_takbp,d.nama "+
						 
						 //kredit
						 "union all "+
						 "select 'TT PIU '+c.nama as ket,case b.jenis when 'GROUP' then c.akun_ap when 'MITRA' then c.akun_mitra end as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.nilai) as nilai,'TT-BILL' as jenis, c.kode_drkbp as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_bill_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	         inner join yk_produk c on a.kode_produk=c.kode_produk "+
						 "		 	         inner join masakun d on (case b.jenis when 'GROUP' then c.akun_ap when 'MITRA' then c.akun_mitra end )=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	         inner join drk e on c.kode_drkbp=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where a.nilai<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nobill+") "+
						 "group by b.kode_lokasi,c.nama,case b.jenis when 'GROUP' then c.akun_ap when 'MITRA' then c.akun_mitra end,d.nama,c.kode_drkbp,e.nama "+						 						 
						 "union all "+						 
						 "select 'TT PIUKJ '+c.nama as ket,c.akun_pku as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.umum) as nilai,'TT-KJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	             inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	             inner join masakun d on c.akun_pku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	             inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where (a.umum)<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nokunj+") "+
						 "group by b.kode_lokasi,c.nama,c.akun_pku,d.nama,c.drk_kunj,e.nama "+
						 "union all "+						 
						 "select 'TT PIUKJ '+c.nama as ket,c.akun_pkb as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.kbia) as nilai,'TT-KJKBIA' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	             inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	             inner join masakun d on c.akun_pkb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	             inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where (a.kbia)<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nokunj+") "+
						 "group by b.kode_lokasi,c.nama,c.akun_pkb,d.nama,c.drk_kunj,e.nama "+
						 "union all "+						 
						 "select 'TT PIUKJ '+c.nama as ket,c.akun_pmk as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.matkes) as nilai,'TT-KJMKES' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	             inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	             inner join masakun d on c.akun_pmk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	             inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where (a.matkes)<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nokunj+") "+
						 "group by b.kode_lokasi,c.nama,c.akun_pmk,d.nama,c.drk_kunj,e.nama "+
						 "union all "+						 
						 "select 'TT PIUKJ '+c.nama as ket,c.akun_pkg as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.gigi) as nilai,'TT-KJGIGI' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	             inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	             inner join masakun d on c.akun_pkg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	             inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where (a.gigi)<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nokunj+") "+
						 "group by b.kode_lokasi,c.nama,c.akun_pkg,d.nama,c.drk_kunj,e.nama "+
						 "union all "+
						 "select 'TT COST SHARING ' as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'C' as dc, "+
						 "sum(a.cs) as nilai,'TT-PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust and b.jenis in ('GROUP','MITRA') "+
						 "		 	             inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	             inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "		 	             inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak in ("+nocs+") "+
						 "group by b.kode_lokasi,c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
						 
						 "order by dc desc,kode_akun";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk,line.loktuj]);
				}
			}
			this.sg2.validasi();								
			this.pc1.setActivePage(this.pc1.childPage[1]);
						
		}
		catch(e) {
			systemAPI.alert("step : "+step+"; error = "+e);
		}
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-TTBIL"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}		
		if (sender == this.i_appAll) {
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) 
					this.sg.cells(0,i,"APP");
			}
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
   	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg2.clear(1);
			this.sg2.validasi();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});