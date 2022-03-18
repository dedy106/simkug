window.app_saku2_transaksi_yks_fBillTAKTerima = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fBillTAKTerima.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fBillTAKTerima";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK Terima Billing: Input", 0);	
		
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
		this.bTampil = new button(this,{bound:[500,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});					
		this.i_app = new portalui_imageButton(this,{bound:[585,17,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.bJurnal = new button(this,{bound:[615,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,300], childPage:["Data Billing","Detail Billing TAK","Jurnal TAK"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
				colTitle:["Status","No Bukti","Modul","Lokasi Asal","Tanggal","Keterangan","Nilai"],
				colWidth:[[6,5,4,3,2,1,0],[100,300,80,70,70,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				colFormat:[[6],[cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:17,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker Valid","Loker BAST","Area Host","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai","Nilai Kunj","Nilai CS"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,70,70,70,70,100,70,70,70,100,100,100,70,100,70]],
				colFormat:[[14,15,16],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager"]});				
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Lok. Asal","Kode DRK"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,70,80,100,240,50,200,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7],[3]],
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
window.app_saku2_transaksi_yks_fBillTAKTerima.extend(window.childForm);
window.app_saku2_transaksi_yks_fBillTAKTerima.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-ARTT"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted,no_valid2) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','TAKTERIMA','0','F','-')");	
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into yk_valid_j(no_valid,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(7,i)+"','"+this.app._lokasi+"','TAKTERIMA','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								if (this.sg2.cells(7,i) != "-") {
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','ARTAK','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.kodepp+"','"+this.sg2.cells(7,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.sg2.cells(2,i)+"',0,"+parseNilai(this.sg2.cells(4,i))+")");
								}								
							}
						}
					}	
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){
								//loker bast takkirim mnjadi loker nya takterima
								sql.add("update yk_valid_tak set progress='1',no_terima='"+this.e_nb.getText()+"' where no_valid='"+this.sg.cells(1,i)+"' and jenis='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.sg.cells(3,i)+"' and kode_loktuj='"+this.app._lokasi+"'");
								if (this.sg.cells(2,i) == "TAKBP" || this.sg.cells(2,i) == "TAKCC") {																								      
									sql.add("insert into yk_bill_d(no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,band,nikkes,pasien,tgl_masuk,tgl_keluar,dokter,icdx,kode_produk,nilai,nilai_kunj,nilai_cs,pph,loker_valid,no_hutang,no_piutang,loker_bast,no_kas,jenis,periode,no_app,no_valid,no_tak,flag_aktif,no_selesai) "+
											"select '"+this.e_nb.getText()+"',a.no_urut,'"+this.app._lokasi+"',a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker_bast,a.band,a.nikkes,a.pasien,a.tgl_masuk,a.tgl_keluar,a.dokter,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs,0,'-',a.no_tak,'-','-',a.no_piutang,'TAKTERIMA','"+this.e_periode.getText()+"',a.no_app,'-','-','0','-' "+ //no_piutang = no_bill asal diisikan ke no_kas
											"from yk_bill_tak a inner join yk_valid_tak b on a.no_tak=b.no_valid and a.kode_lokkirim=b.kode_lokasi and b.jenis='"+this.sg.cells(2,i)+"' and a.kode_lokasi=b.kode_loktuj and a.no_kas=b.jenis "+
											"where a.no_kas+a.no_tak='"+this.sg.cells(2,i)+this.sg.cells(1,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"'"); 
								}
								if (this.sg.cells(2,i) == "TAKKJ" || this.sg.cells(2,i) == "TAKCS") {							
									sql.add("insert into yk_billkunj_d(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,kode_produk,loker_valid,no_piutang,loker_bast,no_kas,periode,umum,gigi,kbia,matkes,cs,no_valid,no_tak,flag_aktif,jenis,no_selesai) "+
											"select '"+this.e_nb.getText()+"',a.no_urut,'"+this.app._lokasi+"',a.no_ref,a.nik,a.nama,a.loker_bast,a.band,a.nikkes,a.pasien,a.dokter,a.tgl_masuk,a.kode_produk,'-','-','-',a.no_tak,'"+this.e_periode.getText()+"',a.umum,a.gigi,a.kbia,a.matkes,a.cs,'-','-','0','TAKTERIMA','-' "+
											"from yk_billkunj_tak a inner join yk_valid_tak b on a.no_tak=b.no_valid and a.kode_lokkirim=b.kode_lokasi and b.jenis='"+this.sg.cells(2,i)+"' and a.kode_lokasi=b.kode_loktuj "+
											"where a.no_kas+a.no_tak='"+this.sg.cells(2,i)+this.sg.cells(1,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"'"); 
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
					if (this.app._pernext == "1") {					 
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					}
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
		var nobuktikj=nobuktics = nobukti = ""; 
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && (this.sg.cells(2,i) == "TAKBP" || this.sg.cells(2,i) == "TAKCC")) {
				nobukti += ",'"+this.sg.cells(2,i)+this.sg.cells(1,i)+"'";
			}
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "TAKCS") {
				nobuktics += ",'"+this.sg.cells(1,i)+"'";
			}
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "TAKKJ") {
				nobuktikj += ",'"+this.sg.cells(1,i)+"'";
			}			
		}
		nobukti = nobukti.substr(1); 
		nobuktics = nobuktics.substr(1); 
		nobuktikj = nobuktikj.substr(1); 
		if (nobukti == "") nobukti = "''"; 
		if (nobuktics == "") nobuktics = "''"; 
		if (nobuktikj == "") nobuktikj = "''"; 
		
		var ket = this.e_ket.getText();
		if (ket == "") ket = "-";
		var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis,a.lokasal,a.kode_drk "+
					"from "+
					"( "+					
					"select case b.jenis when 'PENSIUN' then 'TAKCC' else 'TAKBP' end as jenis,d.kode_lokasi as lokasal, "+
					"	    case b.jenis when 'PENSIUN' then c.akun_takcc else c.akun_takbp end as kode_akun,  "+ 
					"	    'C' as dc, sum(a.nilai) as nilai, "+
					"	    '-' as kode_drk "+
					"from yk_bill_tak a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 	    inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"                   inner join yk_valid_tak d on a.no_tak=d.no_valid and d.kode_lokasi=a.kode_lokkirim  "+
					"where (case b.jenis when 'PENSIUN' then 'TAKCC' else 'TAKBP' end)=d.jenis and d.kode_loktuj='"+this.app._lokasi+"' and d.jenis+a.no_tak in ("+nobukti+")  and d.kode_loktuj=b.kode_lokasi "+
					"group by "+
					"d.kode_lokasi, "+
					"case b.jenis when 'PENSIUN' then c.akun_takcc else c.akun_takbp end, "+					
					"case b.jenis when 'PENSIUN' then 'TAKCC' else 'TAKBP' end "+
					"union all "+					
					"select b.jenis,d.kode_lokasi as lokasal, "+					
					"      case b.jenis when 'PENSIUN' then c.akun_cc "+
					"		 			when 'PEGAWAI' then c.akun_unbill "+
					"					when 'GROUP' then c.akun_ap "+
					"					when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+					
					"	   'D' as dc, sum(a.nilai) as nilai, "+
					"	   case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk "+
					"from yk_bill_tak a inner join cust b on a.loker_bast=b.kode_cust "+
					"				    inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"                   inner join yk_valid_tak d on a.no_tak=d.no_valid and d.kode_lokasi=a.kode_lokkirim "+
					"where (case b.jenis when 'PENSIUN' then 'TAKCC' else 'TAKBP' end)=d.jenis and d.kode_loktuj='"+this.app._lokasi+"' and d.jenis+a.no_tak in ("+nobukti+") and d.kode_loktuj=b.kode_lokasi "+
					"group by "+
					"b.jenis,d.kode_lokasi, "+
					"      case b.jenis when 'PENSIUN' then c.akun_cc "+
					"		 			when 'PEGAWAI' then c.akun_unbill "+
					"					when 'GROUP' then c.akun_ap "+
					"					when 'MITRA' then c.akun_mitra "+
					"	    end,  "+					
					"case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end "+

					"union all "+
					"select 'KUNJ' as jenis,d.kode_lokasi as lokasal, "+
					"	   c.akun_unbill, "+
					"	   'D' as dc,sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,c.drk_kunj as kode_drk "+
					"from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust "+
					"					    inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"                       inner join yk_valid_tak d on a.no_tak=d.no_valid and d.kode_lokasi=a.kode_lokkirim "+
					"where b.jenis <> 'PENSIUN' and d.jenis='TAKKJ' and (a.umum+a.gigi+a.kbia+a.matkes) <> 0 and d.kode_loktuj='"+this.app._lokasi+"' and a.no_tak in ("+nobuktikj+") and d.kode_loktuj=b.kode_lokasi "+
					"group by c.akun_unbill,d.kode_lokasi,c.drk_kunj "+
					"union all "+
					"select 'TAKKJ' as jenis,d.kode_lokasi as lokasal, "+
					"	   c.akun_takbp, "+
					"	   'C' as dc,sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'-' as kode_drk "+
					"from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust "+
					"					    inner join yk_kunj c on a.kode_produk=c.kode_produk  "+
					"                       inner join yk_valid_tak d on a.no_tak=d.no_valid and d.kode_lokasi=a.kode_lokkirim "+
					"where b.jenis <> 'PENSIUN' and d.jenis='TAKKJ' and (a.umum+a.gigi+a.kbia+a.matkes) <> 0 and d.kode_loktuj='"+this.app._lokasi+"' and a.no_tak in ("+nobuktikj+") and d.kode_loktuj=b.kode_lokasi "+
					"group by c.akun_takbp,d.kode_lokasi "+
					
					
					"union all "+					
					"select 'CS' as jenis,d.kode_lokasi as lokasal, "+
					//"	   c.akun_hutcs, "+ <<------------------------------------------ biar gak masuk ke titipan cs tp tanpa uang masukan saja ke unbill sbg kredit
					"	   c.akun_unbill, "+
					"	   'C' as dc,sum(a.cs) as nilai,'-' as kode_drk "+
					"from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust "+
					"					    inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"                       inner join yk_valid_tak d on a.no_tak=d.no_valid and d.kode_lokasi=a.kode_lokkirim "+
					"where b.jenis <> 'PENSIUN' and d.jenis='TAKCS' and a.cs <> 0 and d.kode_loktuj='"+this.app._lokasi+"' and a.no_tak in ("+nobuktics+") and d.kode_loktuj=b.kode_lokasi "+
					"group by c.akun_unbill,d.kode_lokasi "+
					"union all "+
					"select 'TAKCS' as jenis,d.kode_lokasi as lokasal, "+
					"	   c.akun_takbp, "+
					"	   'D' as dc,sum(a.cs) as nilai,'-' as kode_drk "+
					"from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust "+
					"					    inner join yk_kunj c on a.kode_produk=c.kode_produk  "+
					"                       inner join yk_valid_tak d on a.no_tak=d.no_valid and d.kode_lokasi=a.kode_lokkirim "+
					"where b.jenis <> 'PENSIUN' and d.jenis='TAKCS' and a.cs <> 0 and d.kode_loktuj='"+this.app._lokasi+"' and a.no_tak in ("+nobuktics+") and d.kode_loktuj=b.kode_lokasi "+
					"group by c.akun_takbp,d.kode_lokasi "+

				
					") a inner join masakun b on a.kode_akun=b.kode_akun and a.lokasal=b.kode_lokasi "+
					"order by a.lokasal,a.dc desc ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),ket,floatToNilai(line.nilai),line.jenis.toUpperCase(),line.lokasal,line.kode_drk,line.nama_drk]);
			}
		}
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-ARTT"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
		else {
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) this.sg.cells(0,i,"APP");
			}
		}
	},
	doLoad:function(sender){	
		if (this.e_periode.getText() != "") {
			this.sg1.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			var data = this.dbLib.getDataProvider(			              
						  "select a.no_valid as no_bukti,jenis as modul,a.kode_lokasi,convert(varchar,a.tanggal,103) as tanggal,b.keterangan,b.nilai "+
			              "from yk_valid_tak b inner join yk_valid_m a on a.no_valid=b.no_valid and a.kode_lokasi=b.kode_lokasi "+
						  "where a.modul = 'TAKKIRIM' and b.no_terima='-' and b.progress = '0' and b.periode<='"+this.e_periode.getText()+"' and b.kode_loktuj = '"+this.app._lokasi+"' ",true); 
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_bukti,line.modul.toUpperCase(),line.kode_lokasi,line.tanggal,line.keterangan,floatToNilai(line.nilai)]);
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
			if (this.sg.cells(2,row) == "TAKBP" || this.sg.cells(2,row) == "TAKCC") {
				if (this.sg.cells(2,row) == "TAKBP") var jenis = "b.jenis <> 'PENSIUN'";
				else var jenis = "b.jenis = 'PENSIUN'";
				var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker_valid,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,0  as nilai_kunj,0 as nilai_cs "+
							 "from yk_bill_tak a inner join cust b on a.loker_bast=b.kode_cust "+
							 "where "+jenis+" and a.nilai <> 0 and a.no_tak = '"+this.sg.cells(1,row)+"' and a.kode_lokkirim = '"+this.sg.cells(3,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
			}
			if (this.sg.cells(2,row) == "TAKCS") {
				var strSQL = "select '-' as kode_vendor,a.no_ref,a.nik,a.nama,a.loker_valid,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_masuk,103) as tgl_keluar,'-' as icdx,a.kode_produk,0 as nilai,0 as nilai_kunj,a.cs as nilai_cs "+
							 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust "+
							 "where a.cs<>0 and a.no_tak = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokkirim='"+this.sg.cells(3,row)+"'";
				var data = this.dbLib.getDataProvider(strSQL,true,500);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
			}
			if (this.sg.cells(2,row) == "TAKKJ") {
				var strSQL = "select '-' as kode_vendor,a.no_ref,a.nik,a.nama,a.loker_valid,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_masuk,103) as tgl_keluar,'-' as icdx,a.kode_produk,0 as nilai,a.umum+a.gigi+a.kbia+a.matkes as nilai_kunj,0 as nilai_cs "+
							 "from yk_billkunj_tak a inner join cust b on a.loker_bast=b.kode_cust "+
							 "where a.umum+a.gigi+a.kbia+a.matkes<>0 and a.no_tak = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokkirim='"+this.sg.cells(3,row)+"'";
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
			this.sg1.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker_valid,line.loker_bast,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.nilai_kunj),floatToNilai(line.nilai_cs)]);
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