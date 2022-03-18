window.app_saku2_transaksi_yks_hutpiu_fAkruPiuPdpt = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fAkruPiuPdpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_hutpiu_fAkruPiuPdpt";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Piutang Pendapatan: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.e_debet = new saiLabelEdit(this,{bound:[810,15,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[810,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
				
		this.bTampil = new button(this,{bound:[610,17,80,18],caption:"Tampil Data",click:[this,"doTampil"]});					
		this.bJurnal = new button(this,{bound:[708,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,990,360], childPage:["Data Billing","Detail Jurnal Akru"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
				colTitle:["Status","No Bill","Tanggal","Keterangan","Total BP","Total Kunj","Total CS","Jenis"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,100,300,80,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK"],
					colWidth:[[7,6,5,4,3,2,1,0],[150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[930,5,100,25],caption:"Preview",selected:true});
		
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
window.app_saku2_transaksi_yks_hutpiu_fAkruPiuPdpt.extend(window.childForm);
window.app_saku2_transaksi_yks_hutpiu_fAkruPiuPdpt.implement({
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
					sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','PDPT','BILL','IDR',1,"+parseNilai(this.e_kredit.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"')");
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "0"){
								sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','PDPT','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								/*
								if (this.sg2.cells(6,i) != "-") {
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','PDPT','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+parseNilai(this.sg2.cells(4,i))+")");
								}
								*/
							}
						}
					}
					var nobukti = "";
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
							nobukti += ",'"+this.sg.cells(1,i)+"'";
						}
					}
					nobukti = nobukti.substr(1);					
					
					sql.add("update yk_bill_m set no_valid='"+this.e_nb.getText()+"',no_hutang = '"+this.e_nb.getText()+"',progress ='1' where progress = '0' and no_bill in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_m set no_valid='"+this.e_nb.getText()+"',progress ='1' where progress = '0' and no_bill in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update yk_bill_d set no_piutang='"+this.e_nb.getText()+"',no_valid='"+this.e_nb.getText()+"',no_hutang ='"+this.e_nb.getText()+"' where no_bill in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_d set no_piutang='"+this.e_nb.getText()+"',no_valid='"+this.e_nb.getText()+"' where no_bill in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					
					
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
				var j = 0;
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") j++;											
				}
				if (j != 1) {
					system.alert(this,"Approve hanya diperbolehkan satu bukti.","Hanya satu Bukti Approval.");
					return false;						
				}
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
			var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai,b.total_kunj,b.total_cs,a.jenis "+
			             "from yk_bill_m a left join yk_billkunj_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
						 "where substring(a.jenis,1,4) = 'PDPT' and a.progress = '0' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_bill,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.total_kunj),floatToNilai(line.total_cs),line.jenis]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Data tidak valid.","Periode harus diisi.");
	},
	doJurnal:function(sender){		
		try {
			var nobukti = "";
			var jenis = "";
			var j = 0;			
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
					j++;
					nobukti += ",'"+this.sg.cells(1,i)+"'";
					jenis = this.sg.cells(7,i);
				}
			}
			if (j != 1) {
				system.alert(this,"Approve hanya diperbolehkan satu bukti.","Hanya satu Bukti Approval.");
				return false;						
			}
			nobukti = nobukti.substr(1);
			if (nobukti == "") nobukti = "''";
			
			if (jenis == "PDPT") {var dcPiu = "D"; var dcPdpt = "C";} 
			else {var dcPiu = "C"; var dcPdpt = "D";}
			
			//KUNJUNGAN dan CS
			var strSQL = "select 'PIU KUNJ '+c.nama as ket,c.akun_pku as kode_akun,d.nama as nama_akun,'"+dcPiu+"' as dc, "+
						"abs(sum(a.umum)) as nilai,'PIUKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.umum)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_pku,d.nama,c.drk_kunj,e.nama "+												
						"union all "+						
						"select 'PIU KUNJ '+c.nama as ket,c.akun_pkg as kode_akun,d.nama as nama_akun,'"+dcPiu+"' as dc, "+
						"abs(sum(a.gigi)) as nilai,'PIUKUNJGG' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pkg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.gigi)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_pkg,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PIU KUNJ '+c.nama as ket,c.akun_pkb as kode_akun,d.nama as nama_akun,'"+dcPiu+"' as dc, "+
						"abs(sum(a.kbia)) as nilai,'PIUKUNJKB' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pkb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.kbia)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_pkb,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PIU KUNJ '+c.nama as ket,c.akun_pmk as kode_akun,d.nama as nama_akun,'"+dcPiu+"' as dc, "+
						"abs(sum(a.matkes)) as nilai,'PIUKUNJMK' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pmk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.matkes)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_pmk,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PDPT KUNJ '+c.nama as ket,c.akun_ku as kode_akun,d.nama as nama_akun,'"+dcPdpt+"' as dc, "+
						"abs(sum(a.umum)) as nilai,'PDPTKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_ku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.umum)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_ku,d.nama,c.drk_kunj,e.nama "+												
						"union all "+						
						"select 'PDPT KUNJ '+c.nama as ket,c.akun_kg as kode_akun,d.nama as nama_akun,'"+dcPdpt+"' as dc, "+
						"abs(sum(a.gigi)) as nilai,'PDPTKUNJGG' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_kg=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.gigi)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_kg,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PDPT KUNJ '+c.nama as ket,c.akun_kb as kode_akun,d.nama as nama_akun,'"+dcPdpt+"' as dc, "+
						"abs(sum(a.kbia)) as nilai,'PDPTKUNJKB' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_kb=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.kbia)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_kb,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PDPT KUNJ '+c.nama as ket,c.akun_mk as kode_akun,d.nama as nama_akun,'"+dcPdpt+"' as dc, "+
						"abs(sum(a.matkes)) as nilai,'PDPTKUNJMK' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_mk=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.matkes)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_mk,d.nama,c.drk_kunj,e.nama "+
						"union all "+
						
						//CS						
						"select 'TTP CS '+c.nama as ket,c.akun_hutcs as kode_akun,d.nama as nama_akun,'"+dcPiu+"' as dc, "+
						"abs(sum(a.cs)) as nilai,'HUTCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_hutcs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.cs)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_hutcs,d.nama,c.drk_kunj,e.nama "+
						"union all "+						
						"select 'PIU CS '+c.nama as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'"+dcPdpt+"' as dc, "+
						"abs(sum(a.cs)) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where abs(a.cs)<> 0 and b.jenis <> 'PENSIUN' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill in ("+nobukti+") "+
						"group by  c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
						
						"order by dc desc,kode_akun";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk]);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_hutang_m","no_hutang",this.app._lokasi+"-PDPT"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
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