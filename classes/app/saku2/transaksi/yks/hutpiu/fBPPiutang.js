window.app_saku2_transaksi_yks_hutpiu_fBPPiutang = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fBPPiutang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_hutpiu_fBPPiutang";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Titipan Pelunasan Piutang : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_pp = new saiCBBL(this,{bound:[20,19,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});				
		this.cb_drk = new saiCBBL(this,{bound:[20,20,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});				
		this.cb_akun = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Beban", multiSelection:false, maxLength:10, tag:2});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[760,17,220,20],caption:"Nilai Titipan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.bTampil = new button(this,{bound:[560,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.bJurnal = new button(this,{bound:[660,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});
				
		this.pc1 = new pageControl(this,{bound:[20,20,960,280], childPage:["Data Billing","Detail Billing","Detail Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
				colTitle:["Status","No Piutang","Loker","Tanggal","Keterangan","Jenis","Nilai"],
				colWidth:[[6,5,4,3,2,1,0],[100,60,300,80,70,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				colFormat:[[6],[cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:14,tag:9,
				colTitle:["No Ref","NIK","Nama","Loker","Loker BAST","Area Host","Band","NIKKES","Nama Pasien","Tgl Masuk","Kode Biaya","Nilai","Nilai Kunj","Nilai CS"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,100,70,70,70,70,100,70,70,70,100,100,100,70,100]],
				colFormat:[[11,12,13],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager"]});				
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis"],
					colWidth:[[5,4,3,2,1,0],[70,100,270,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[900,5,100,25],caption:"Preview",selected:true});
		this.rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
				
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Daftar PP",true);			
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_hutpiu_fBPPiutang.extend(window.childForm);
window.app_saku2_transaksi_yks_hutpiu_fBPPiutang.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-TAR"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','TTPAR','X','F')");						
					
					sql.add("insert into yk_valid_j(no_valid,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','0','"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TTPAR','TTP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','TTPAR','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+parseNilai(this.e_nilai.getText())+")");							
																						
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into yk_valid_j(no_valid,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','TTPAR','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");							
								if (this.sg2.cells(2,i)=="D") {
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"('"+this.e_nb.getText()+"','TTPAR','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+parseNilai(this.sg2.cells(4,i))+")");							
								}
							}
						}
					}						
					var nobukti = "";
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
							nobukti += ",'"+this.sg.cells(1,i)+this.sg.cells(2,i)+"'";
						}
					}
					nobukti = nobukti.substr(1);
					sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
							"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"where a.flag_aktif='1' and b.jenis <> 'PENSIUN' and a.no_selesai = '-' and a.nilai <> 0 and a.no_piutang+a.loker_bast in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"where a.flag_aktif='1' and b.jenis <> 'PENSIUN' and a.no_selesai = '-' and a.umum+a.gigi+a.kbia+a.matkes+a.cs <> 0 and a.no_piutang+a.loker_bast in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.sg.clear(1); this.sg1.clear(1);  this.sg2.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh nol atau kurang.");
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
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
		this.cb_drk.setSQL("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
	},
	doLoad:function(sender){
		if (this.e_periode.getText() != "") {					   
			var data = this.dbLib.getDataProvider(
			           "select a.no_valid,a.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(a.nilai) as nilai "+
					   "from ( "+
					   "select a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from yk_valid_m a inner join yk_bill_d b on a.no_valid=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join cust c on b.loker_bast=c.kode_cust "+
			           "where b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis <> 'PENSIUN' and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('BAST','BAREV','TAKTERIMA') and b.no_tak = '-' "+
					   "group by a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union "+
					   "select a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) as nilai "+
					   "from yk_valid_m a inner join yk_billkunj_d b on a.no_valid=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join cust c on b.loker_bast=c.kode_cust "+
			           "where b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis <> 'PENSIUN' and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('BAST','BAREV','TAKTERIMA') and b.no_tak = '-' "+
					   "group by a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+					   
					   "union all "+					   
					   
					   "select a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from yk_hutang_m a inner join yk_bill_d b on a.no_hutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                   inner join yk_bill_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "                   inner join cust c on b.loker_bast=c.kode_cust "+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis = 'PEGAWAI' and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'HUTKES' "+
					   "group by a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union all "+
					   "select a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) as nilai "+
					   "from yk_hutang_m a inner join yk_billkunj_d b on a.no_hutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                   inner join yk_billkunj_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "                   inner join cust c on b.loker_bast=c.kode_cust "+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis = 'PEGAWAI' and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','PDPT','PDPTREV') "+
					   "group by a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+					   					   
					   "union all "+					   
					   
					   "select a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from yk_hutang_m a inner join yk_bill_d b on a.no_hutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                   inner join yk_bill_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "                   inner join cust c on b.loker_bast=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis in ('GROUP','MITRA') and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'HUTKES' "+
					   "group by a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union all "+
					   "select a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) as nilai "+
					   "from yk_hutang_m a inner join yk_billkunj_d b on a.no_hutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                   inner join yk_billkunj_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "                   inner join cust c on b.loker_bast=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis in ('GROUP','MITRA') and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','PDPT','PDPTREV') "+
					   "group by a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+					   					   
					   "union all "+					   
					   
					   "select a.no_kas,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from kas_m a inner join yk_bill_d b on a.no_kas=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "             inner join yk_bill_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "             inner join cust c on b.loker_bast=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis in ('GROUP','MITRA') and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'KBRES' "+
					   "group by a.no_kas,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union all "+
					   "select a.no_kas,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) as nilai "+
					   "from kas_m a inner join yk_billkunj_d b on a.no_kas=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "             inner join yk_billkunj_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "             inner join cust c on b.loker_bast=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis in ('GROUP','MITRA') and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'KBRES' "+
					   "group by a.no_kas,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+					   
					   
					   ") a where a.nilai <> 0 group by a.no_valid,a.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul",true);
						  
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_valid,line.loker_bast,line.tanggal,line.keterangan,line.modul,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-TAR"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
	},
	 doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg2.clear();
			this.sg2.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "C") tot = tot + nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "D") tot = tot - nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			var strSQL = "select a.no_ref,a.nik,a.nama,a.loker_valid,a.loker_bast,a.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,a.kode_produk,0 as nilai,a.umum+a.gigi+a.kbia+a.matkes as kunj,a.cs "+
						 "from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
						 "where a.flag_aktif ='1' and a.no_selesai = '-' and b.jenis <> 'PENSIUN' and a.no_piutang+a.loker_bast = '"+this.sg.cells(1,row)+this.sg.cells(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "union "+
						 "select a.no_ref,a.nik,a.nama,a.loker_valid,a.loker_bast,a.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,a.kode_produk,a.nilai as nilai,0 as kunj,0 as cs "+
						 "from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
						 "where a.flag_aktif ='1' and a.no_selesai = '-' and b.jenis <> 'PENSIUN' and a.no_piutang+a.loker_bast = '"+this.sg.cells(1,row)+this.sg.cells(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.no_ref,line.nik,line.nama,line.loker_valid,line.loker_bast,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doJurnal:function(sender){				
		this.sg2.clear(); 
		var nobukti = "";
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
				nobukti += ",'"+this.sg.cells(1,i)+this.sg.cells(2,i)+"'";
			}
		}
		nobukti = nobukti.substr(1);		
		var ket = this.e_ket.getText();
		if (ket == "") ket = "-";
		//yg flag aktif ='X' sudah dijurnal balik		
		var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis "+
					"from "+
					"( "+					
							"select 'PIUBP' as jenis,a.kode_lokasi,case b.jenis "+
							"		 	when 'PEGAWAI' then c.akun_bp "+
							"			when 'GROUP' then c.akun_ap "+
							"			when 'MITRA' then c.akun_mitra "+
							"	    end as kode_akun,  "+
							"	    'C' as dc, sum(a.nilai) as nilai  "+
							"from yk_bill_d a "+
							"         inner join cust b on a.loker_bast = b.kode_cust  "+
							"         inner join yk_produk c on a.kode_produk = c.kode_produk  "+
							"where a.flag_aktif ='1' and a.no_selesai = '-' and b.jenis <> 'PENSIUN' and a.no_piutang+a.loker_bast in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
		                    "group by a.kode_lokasi,case b.jenis "+
							"		 	when 'PEGAWAI' then c.akun_bp "+
							"			when 'GROUP' then c.akun_ap "+
							"			when 'MITRA' then c.akun_mitra "+
							"	    end "+
							"union "+
							
							//KUNJ
							"select 'PIUKUNJ' as jenis,a.kode_lokasi,c.akun_pku as kode_akun,  "+
							"	   'C' as dc, sum(a.umum) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and a.no_selesai = '-' and b.jenis <> 'PENSIUN' and a.umum<> 0 and a.no_piutang+a.loker_bast in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by  a.kode_lokasi,c.akun_pku "+
							"union "+
							"select 'PIUKUNJ' as jenis,a.kode_lokasi,c.akun_pkg as kode_akun,  "+
							"	   'C' as dc, sum(a.gigi) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and a.no_selesai = '-' and b.jenis <> 'PENSIUN' and a.gigi<> 0 and a.no_piutang+a.loker_bast in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by  a.kode_lokasi,c.akun_pkg "+
							"union "+
							"select 'PIUKUNJ' as jenis,a.kode_lokasi,c.akun_pkb as kode_akun,  "+
							"	   'C' as dc, sum(a.kbia) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and a.no_selesai = '-' and b.jenis <> 'PENSIUN' and a.kbia<> 0 and a.no_piutang+a.loker_bast in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by  a.kode_lokasi,c.akun_pkb "+
							"union "+
							"select 'PIUKUNJ' as jenis,a.kode_lokasi,c.akun_pmk as kode_akun,  "+
							"	   'C' as dc, sum(a.matkes) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and a.no_selesai = '-' and b.jenis <> 'PENSIUN' and a.matkes<> 0 and a.no_piutang+a.loker_bast in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by  a.kode_lokasi,c.akun_pmk "+
							"union "+
							"select 'PIUCS' as jenis,a.kode_lokasi,c.akun_piucs as kode_akun,  "+
							"	   'D' as dc, sum(a.cs) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and a.no_selesai = '-' and b.jenis <> 'PENSIUN' and a.cs<> 0 and a.no_piutang+a.loker_bast in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by  a.kode_lokasi,c.akun_piucs "+

							
					") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.dc desc,a.kode_akun",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase()]);
			}
		}
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[2]);		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");
							this.clearLayar();							
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1);  this.sg2.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});