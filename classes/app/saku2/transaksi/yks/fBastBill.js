window.app_saku2_transaksi_yks_fBastBill = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fBastBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fBastBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Piutang BAST: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.e_debet = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.bTampil = new button(this,{bound:[520,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.bJurnal = new button(this,{bound:[615,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,300], childPage:["Data Billing","Detail Billing","Jurnal Piutang"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
				colTitle:["Status","No Bukti","Modul","Lokasi","Tanggal","Keterangan"],
				colWidth:[[5,4,3,2,1,0],[400,80,70,70,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5],[]],				
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:17,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker","Loker BAST","Area Host","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai","Nilai Kunj","Nilai CS"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,70,70,70,70,100,70,70,70,100,100,100,70,100,70]],
				colFormat:[[14,15,16],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager"]});				
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,240,50,200,100]],
					columnReadOnly:[true,[0,1,2,4,5,6],[3]],
					colFormat:[[4],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
	
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
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
window.app_saku2_transaksi_yks_fBastBill.extend(window.childForm);
window.app_saku2_transaksi_yks_fBastBill.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-PIU"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','BAST','X','F')");	
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into yk_valid_j(no_valid,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','PIU','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								if (this.sg2.cells(6,i) != "-") {
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','PIU','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.sg2.cells(2,i)+"',0,"+parseNilai(this.sg2.cells(4,i))+")");
								}								
							}
						}
					}										
					sql.add("insert into yk_valid_d(no_valid,kode_lokasi,no_bill,nilai,modul,keterangan,periode,dc,progress,no_kirim,no_reklas,kode_cust,kode_produk) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','-',sum(case dc when 'D' then nilai else -nilai end),'BAST','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','D','0','-','-','-','-' "+
							"from yk_valid_j where jenis in ('PIUTANG','PIUKUNJ','PIUCS') and no_valid='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP") {
								if (this.sg.cells(2,i) == "BILL") {
									sql.add("update yk_bill_m set progress='3' where no_bill = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
									sql.add("update a set a.no_piutang='"+this.e_nb.getText()+"' "+
											"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.kode_lokasi=a.kode_lokasi and a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' ");
								}
								if (this.sg.cells(2,i) == "KJCS") {
									sql.add("update yk_billkunj_m set progress='2' where no_bill = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
									sql.add("update a set a.no_piutang='"+this.e_nb.getText()+"' "+
											"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.kode_lokasi=a.kode_lokasi and a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' and b.jenis <> 'PENSIUN'");
								}
								if (this.sg.cells(2,i) == "TAKTERIMA") {
									sql.add("update yk_valid_m set progress='2' where no_valid = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
									sql.add("update a set a.no_piutang='"+this.e_nb.getText()+"' "+
											"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.kode_lokasi=a.kode_lokasi and a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' ");
									sql.add("update a set a.no_piutang='"+this.e_nb.getText()+"' "+
											"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.kode_lokasi=a.kode_lokasi and a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-'  and b.jenis <> 'PENSIUN'");
								}
								if (this.sg.cells(2,i) == "BAREV") {
									sql.add("update yk_valid_m set progress='2' where no_valid = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
									sql.add("update a set a.no_piutang='"+this.e_nb.getText()+"',periode='"+this.e_periode.getText()+"' "+
											"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.kode_lokasi=a.kode_lokasi and a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' ");
									sql.add("update a set a.no_piutang='"+this.e_nb.getText()+"',periode='"+this.e_periode.getText()+"' "+
											"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.kode_lokasi=a.kode_lokasi and a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-'  and b.jenis <> 'PENSIUN'");
								}
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
					this.sg.clear(1);
					this.sg1.clear(1);
					this.sg2.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
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
				this.simpan();
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
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doJurnal:function(sender){		
		this.sg2.clear(); 
		var nobuktibarev=nobuktikjcs=nobukti=nobuktitak=""; 
		for (var i=0;i < this.sg.getRowCount();i++){			
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "BAREV") {
				nobuktibarev += ",'"+this.sg.cells(1,i)+"'";
			}
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "TAKTERIMA") {
				nobuktitak += ",'"+this.sg.cells(1,i)+"'";
			}
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "BILL") {
				nobukti += ",'"+this.sg.cells(1,i)+"'";
			}
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "KJCS") {
				nobuktikjcs += ",'"+this.sg.cells(1,i)+"'";
			}
		}
		nobuktibarev = nobuktibarev.substr(1);	
		nobuktitak = nobuktitak.substr(1);	
		nobukti = nobukti.substr(1);	
		nobuktikjcs = nobuktikjcs.substr(1);	
		if (nobuktibarev == "") nobuktibarev = "''";
		if (nobuktitak == "") nobuktitak = "''";
		if (nobukti == "") nobukti = "''";
		if (nobuktikjcs == "") nobuktikjcs = "''";
		
		var ket = this.e_ket.getText();
		if (ket == "") ket = "-";
		
		//yg direverse (unbill/cc) memakai loker akru awal (hutang ato restitusi)
		var strSQL ="select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis,a.kode_drk "+
					"from "+
					"( "+					
					
					//BPCC
					"select case b.jenis when 'PENSIUN' then 'CC' else 'PIUTANG' end as jenis,"+
					"       case b.jenis when 'PENSIUN' then c.akun_cc "+
					"		 			 when 'PEGAWAI' then c.akun_bp "+
					"					 when 'GROUP' then c.akun_ap "+
					"					 when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+
					"	    'D' as dc, sum(a.nilai) as nilai, "+
					"	    case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+ 
					"		          inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobukti+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi, "+
					"	  case b.jenis when 'PENSIUN' then c.akun_cc "+
					"				   when 'PEGAWAI' then c.akun_bp "+
					"				   when 'GROUP' then c.akun_ap "+
					"				   when 'MITRA' then c.akun_mitra "+
					"		  end, "+
					"		  case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end,case b.jenis when 'PENSIUN' then 'CC' else 'PIUTANG' end "+
					"union all "+
					"select 'R-BPCC' as jenis,"+
					"       case d.jenis when 'PENSIUN' then c.akun_cc "+
					"					 when 'PEGAWAI' then c.akun_unbill "+
					"					 when 'GROUP' then c.akun_ap "+
					"					 when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+
					"	    'C' as dc, sum(a.nilai) as nilai, "+
					"	    case d.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"		          inner join cust d on a.loker=d.kode_cust "+
					"		          inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobukti+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi, "+
					"	  case d.jenis when 'PENSIUN' then c.akun_cc "+
					"				   when 'PEGAWAI' then c.akun_unbill "+
					"				   when 'GROUP' then c.akun_ap "+
					"				   when 'MITRA' then c.akun_mitra "+ 
					"		  end, "+
					"		  case d.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end "+
					"union all "+					
					//KUNJ
					"select 'PIUKUNJ' as jenis,c.akun_pku as kode_akun,  "+
					"	   'D' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pku,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pkg as kode_akun,  "+
					"	   'D' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pkg,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pkb as kode_akun,  "+
					"	   'D' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pkb,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pmk as kode_akun,  "+
					"	   'D' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pmk,c.drk_kunj "+
					"union all "+					
					"select 'UMUM' as jenis,c.akun_ku as kode_akun,  "+
					"	   'C' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_ku,c.drk_kunj "+
					"union all "+
					"select 'GIGI' as jenis,c.akun_kg as kode_akun,  "+
					"	   'C' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_kg,c.drk_kunj "+
					"union all "+
					"select 'KBKIA' as jenis,c.akun_kb as kode_akun,  "+
					"	   'C' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_kb,c.drk_kunj "+
					"union all "+
					"select 'MATKES' as jenis,c.akun_mk as kode_akun,  "+
					"	   'C' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_mk,c.drk_kunj "+
					"union all "+
					
					//CS
					"select 'HUTCS' as jenis,c.akun_hutcs as kode_akun,  "+
					"	   'D' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_hutcs,c.drk_kunj "+
					"union all "+
					"select 'PIUCS' as jenis,c.akun_piucs as kode_akun,  "+
					"	   'C' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktikjcs+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_piucs,c.drk_kunj "+
					"union all "+

					//-----------------
					//TAKBPCC
					"select case b.jenis when 'PENSIUN' then 'CC' else 'PIUTANG' end as jenis,"+
					"       case b.jenis when 'PENSIUN' then c.akun_cc "+
					"		 			 when 'PEGAWAI' then c.akun_bp "+
					"					 when 'GROUP' then c.akun_ap "+
					"					 when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+
					"	    'D' as dc, sum(a.nilai) as nilai, "+
					"	    case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+ 
					"		          inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi, "+
					"	  case b.jenis when 'PENSIUN' then c.akun_cc "+
					"				   when 'PEGAWAI' then c.akun_bp "+
					"				   when 'GROUP' then c.akun_ap "+
					"				   when 'MITRA' then c.akun_mitra "+
					"		  end, "+
					"		  case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end,case b.jenis when 'PENSIUN' then 'CC' else 'PIUTANG' end "+
					"union all "+
					"select 'R-TAKBPCC' as jenis,"+
					"       case d.jenis when 'PENSIUN' then c.akun_cc "+
					"					 when 'PEGAWAI' then c.akun_unbill "+
					"					 when 'GROUP' then c.akun_ap "+
					"					 when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+
					"	    'C' as dc, sum(a.nilai) as nilai, "+
					"	    case d.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"		          inner join cust d on a.loker=d.kode_cust "+
					"		          inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi, "+
					"	  case d.jenis when 'PENSIUN' then c.akun_cc "+
					"				   when 'PEGAWAI' then c.akun_unbill "+
					"				   when 'GROUP' then c.akun_ap "+
					"				   when 'MITRA' then c.akun_mitra "+ 
					"		  end, "+
					"		  case d.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end "+
					"union all "+					
					//TAKKJ
					"select 'PIUKUNJ' as jenis,c.akun_pku as kode_akun,  "+
					"	   'D' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pku,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pkg as kode_akun,  "+
					"	   'D' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pkg,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pkb as kode_akun,  "+
					"	   'D' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pkb,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pmk as kode_akun,  "+
					"	   'D' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pmk,c.drk_kunj "+
					"union all "+
					"select 'R-UNBILKJ' as jenis,c.akun_unbill as kode_akun,  "+
					"	   'C' as dc, sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.umum+a.gigi+a.kbia+a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_unbill,c.drk_kunj "+
					"union all "+					
					//TAKCS
					"select 'TAKCS' as jenis,"+
					//"c.akun_hutcs as kode_akun,  "+
					"      c.akun_unbill as kode_akun,  "+
					"	   'D' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_unbill,c.drk_kunj "+
					"union all "+
					"select 'PIUCS' as jenis,c.akun_piucs as kode_akun,  "+
					"	   'C' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktitak+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_piucs,c.drk_kunj "+										
					"union all "+					
					
					//--------------------
					//BAREV					
					"select case b.jenis when 'PENSIUN' then 'CC' else 'PIUTANG' end as jenis,"+
					"       case b.jenis when 'PENSIUN' then c.akun_cc "+
					"		 			 when 'PEGAWAI' then c.akun_bp "+
					"					 when 'GROUP' then c.akun_ap "+
					"					 when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+
					"	    'D' as dc, sum(a.nilai) as nilai, "+
					"	    case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+ 
					"		          inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi, "+
					"	  case b.jenis when 'PENSIUN' then c.akun_cc "+
					"				   when 'PEGAWAI' then c.akun_bp "+
					"				   when 'GROUP' then c.akun_ap "+
					"				   when 'MITRA' then c.akun_mitra "+
					"		  end, "+
					"		  case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end,case b.jenis when 'PENSIUN' then 'CC' else 'PIUTANG' end "+
					"union all "+
					"select 'R-BPCC' as jenis,"+
					"       case d.jenis when 'PENSIUN' then c.akun_cc "+
					"					 when 'PEGAWAI' then c.akun_unbill "+
					"					 when 'GROUP' then c.akun_ap "+
					"					 when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+
					"	    'C' as dc, sum(a.nilai) as nilai, "+
					"	    case d.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"		          inner join cust d on a.loker=d.kode_cust "+
					"		          inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi, "+
					"	  case d.jenis when 'PENSIUN' then c.akun_cc "+
					"				   when 'PEGAWAI' then c.akun_unbill "+
					"				   when 'GROUP' then c.akun_ap "+
					"				   when 'MITRA' then c.akun_mitra "+ 
					"		  end, "+
					"		  case d.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end "+					
					"union all "+										
					//BAREV KUNJ LOKAL
					"select 'PIUKUNJ' as jenis,c.akun_pku as kode_akun,  "+
					"	   'D' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pku,c.drk_kunj "+					
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pkg as kode_akun,  "+
					"	   'D' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pkg,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pkb as kode_akun,  "+
					"	   'D' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pkb,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pmk as kode_akun,  "+
					"	   'D' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pmk,c.drk_kunj "+					
					"union all "+					
					"select 'UMUM' as jenis,c.akun_ku as kode_akun,  "+
					"	   'C' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_ku,c.drk_kunj "+
					"union all "+
					"select 'GIGI' as jenis,c.akun_kg as kode_akun,  "+
					"	   'C' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_kg,c.drk_kunj "+
					"union all "+
					"select 'KBKIA' as jenis,c.akun_kb as kode_akun,  "+
					"	   'C' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_kb,c.drk_kunj "+
					"union all "+
					"select 'MATKES' as jenis,c.akun_mk as kode_akun,  "+
					"	   'C' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_mk,c.drk_kunj "+										
					"union all "+										
					//BAREV CS LOKAL
					"select 'HUTCS' as jenis,c.akun_hutcs as kode_akun,  "+
					"	   'D' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_hutcs,c.drk_kunj "+
					"union all "+
					"select 'PIUCS' as jenis,c.akun_piucs as kode_akun,  "+
					"	   'C' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_piucs,c.drk_kunj "+					
					"union all "+										
					//BAREV KUNJ TAKTERIMA
					"select 'PIUKUNJ' as jenis,c.akun_pku as kode_akun,  "+
					"	   'D' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pku,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pkg as kode_akun,  "+
					"	   'D' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pkg,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pkb as kode_akun,  "+
					"	   'D' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+")  and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pkb,c.drk_kunj "+
					"union all "+
					"select 'PIUKUNJ' as jenis,c.akun_pmk as kode_akun,  "+
					"	   'D' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_pmk,c.drk_kunj "+
					"union all "+
					"select 'R-UNBILKJ' as jenis,c.akun_unbill as kode_akun,  "+
					"	   'C' as dc, sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.umum+a.gigi+a.kbia+a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_unbill,c.drk_kunj "+					
					"union all "+					
					//BAREV CS TAKTERIMA
					"select 'TAKCS' as jenis,"+					
					"      c.akun_unbill as kode_akun,  "+
					"	   'D' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_unbill,c.drk_kunj "+
					"union all "+
					"select 'PIUCS' as jenis,c.akun_piucs as kode_akun,  "+
					"	   'C' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and b.jenis <> 'PENSIUN' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and a.no_bill in ("+nobuktibarev+") and a.no_tak='-' and a.no_piutang='-' and no_valid<>'-' "+
					"group by  a.kode_lokasi,c.akun_piucs,c.drk_kunj "+
					
					
					") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.dc desc,a.kode_akun";	
					
					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),ket,floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk]);
			}
		}
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-PIU"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},
	doLoad:function(sender){	
		if (this.e_periode.getText() != "") {
			this.sg1.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
			var data = this.dbLib.getDataProvider(
			              "select no_bill as no_bukti,'BILL' as modul,kode_lokasi,convert(varchar,tanggal,103) as tanggal,keterangan "+
			              "from yk_bill_m where progress = '2' and periode<='"+this.e_periode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
						  "union "+						  
						  "select no_bill as no_bukti,'KJCS' as modul,kode_lokasi,convert(varchar,tanggal,103) as tanggal,keterangan "+
			              "from yk_billkunj_m where progress = '1' and periode<='"+this.e_periode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
						  "union "+
						  "select no_valid as no_bukti,modul,kode_lokasi,convert(varchar,tanggal,103) as tanggal,keterangan "+
			              "from yk_valid_m where modul in ('TAKTERIMA','BAREV') and progress = '1' and periode<='"+this.e_periode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
						  "",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_bukti,line.modul.toUpperCase(),line.kode_lokasi,line.tanggal,line.keterangan]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			this.pc1.setActivePage(this.pc1.childPage[0]);
			if (this.sg.cells(2,row) == "BILL") {
				var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs "+
							 "from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
							 "where a.flag_aktif ='1' and a.no_tak = '-' and a.no_piutang='-' and a.no_bill = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true,500);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
			}
			if (this.sg.cells(2,row) == "KJCS") {
				var strSQL = "select '-' as kode_vendor,a.no_ref,a.nik,a.nama,a.loker,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_masuk,103) as tgl_keluar,'-' as icdx,a.kode_produk,0 as nilai,(a.umum+a.gigi+a.kbia+a.matkes) as nilai_kunj,a.cs as nilai_cs "+
							 "from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							 "where a.flag_aktif ='1' and a.no_tak = '-' and a.no_piutang='-' and a.no_bill = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true,500);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
			}
			if (this.sg.cells(2,row) == "TAKTERIMA" || this.sg.cells(2,row) == "BAREV") {
				var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs "+
							 "from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
							 "where a.flag_aktif ='1' and a.no_tak = '-' and a.no_piutang='-' and a.no_bill = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							 "union "+
							 "select '-' as kode_vendor,a.no_ref,a.nik,a.nama,a.loker,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_masuk,103) as tgl_keluar,'-' as icdx,a.kode_produk,0 as nilai,(a.umum+a.gigi+a.kbia+a.matkes) as nilai_kunj,a.cs as nilai_cs "+
							 "from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							 "where a.flag_aktif ='1' and a.no_tak = '-' and a.no_piutang='-' and a.no_bill = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'";								
				var data = this.dbLib.getDataProvider(strSQL,true,500);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
			}
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} else system.alert(this,"Data tidak valid.","HR Peserta harus diisi.");
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker,line.loker_bast,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.nilai_kunj),floatToNilai(line.nilai_cs)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
						if (result.toLowerCase().search("error") == -1)					
						{
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