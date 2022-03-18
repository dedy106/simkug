window.app_saku2_transaksi_kopeg_sju_fKbPremiBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fKbPremiBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fKbPremiBatal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pengembalian Premi: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCBBL(this,{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});	
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.c_status = new saiCB(this,{bound:[20,12,200,20],caption:"Status",items:["MCM","TRANSFER","CHEQUE","GIRO"], readOnly:true,tag:2});
		this.e_bank = new saiLabelEdit(this,{bound:[20,14,320,20],caption:"Bank - No Ref.",maxLength:30});				
		this.e_dok = new saiLabelEdit(this,{bound:[350,14,120,20],caption:"",  labelWidth:0, maxLength:30});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_piutang = new saiCBBL(this,{bound:[20,16,220,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});
		this.cb_akun = new saiCBBL(this,{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});									
		this.c_curr = new saiLabelEdit(this,{bound:[20,14,140,20],caption:"Curr - Kurs", tag:2, readOnly:true, text:"IDR",change:[this,"doChange"]});				
		this.e_kurs = new saiLabelEdit(this,{bound:[170,14,50,20],caption:"", tag:1, labelWidth:0, readOnly:true, tipeText:ttNilai, text:"1",tag:2,change:[this,"doChange"]});				
		this.cb_cust = new saiCBBL(this,{bound:[20,20,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.cb_batal = new saiCBBL(this,{bound:[20,19,220,20],caption:"No Batal", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});					
		this.e_total = new saiLabelEdit(this,{bound:[720,19,200,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		//this.e_beban = new saiLabelEdit(this,{bound:[720,19,200,20],caption:"Nilai Penyelesaian", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,180], childPage:["Data Batal Premi"]});		//,"Jurnal Penyelesaian"
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Tgl JthTempo","No Polis / Keterangan","Tot Premi","No Akru","No Bayar","N Bayar","N Kembali","ID"],
					colWidth:[[7,6,5,4,3,2,1,0],[50,100,100,100,100,100,300,80]],													
					columnReadOnly:[true,[0,1,2,3,4,5,7],[6]],					
					colFormat:[[2,5,6],[cfNilai,cfNilai,cfNilai]],					
					nilaiChange:[this,"doNilaiChange1"],change:[this,"doChangeCell1"],autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true});
		/*
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[120,80,80,250,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],checkItem:true,
					picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		*/
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
						
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			this.cb_piutang.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('003') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Piutang",true);
			this.c_jenis.setSQL("select no_dokumen, nama from sju_dokumen where modul = 'KB' and kode_lokasi='"+this.app._lokasi+"'",["no_dokumen","nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);	
			
			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fKbPremiBatal.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fKbPremiBatal.implement({
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText()+"','"+this.e_dok.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBBTLPOL','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_batal.getText()+"','"+this.e_bank.getText()+"','-')");
										
					var kasIDR = Math.round(nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_piutang.getText()+"','"+this.e_ket.getText()+"','D',"+kasIDR+",'"+this.app._kodePP+"','-','-','"+this.cb_batal.getText()+"','"+this.app._lokasi+"','KBBTLPOL','PIUTANG','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+kasIDR+",'"+this.app._kodePP+"','-','-','"+this.cb_batal.getText()+"','"+this.app._lokasi+"','KBBTLPOL','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");																																		
					/*
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								var nilaiLawanIDR = Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiLawanIDR+",'"+this.sg.cells(5,i)+"','-','-','-','"+this.app._lokasi+"','KBBTLPOL','LAWAN','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-','"+nilaiToFloat(this.sg.cells(4,i))+"')");								
							}
						}
					}
					*/					
					sql.add("update sju_batalpolis_m set akun_piutang='"+this.cb_piutang.getText()+"',no_kas='"+this.e_nb.getText()+"' where no_batal='"+this.cb_batal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
										
					//sudah akru blm bayar jurnal balik
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){								
							if (this.sg1.cells(3,i) != "-" && this.sg1.cells(4,i) == "-") {																			
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) "+
										"select '"+this.e_nb.getText()+"',no_polis,'"+this.dp_d1.getDateString()+"',99,kode_akun,no_polis,dc,nilai,kode_pp,'-','-','-',kode_lokasi,'KBBTLPOL','REVERSE','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"','"+nilaiToFloat(this.e_kurs.getText())+"','"+this.app._userLog+"',getdate(),'-',nilai_curr "+
										"from ( "+								
										 
										 "select a.kode_lokasi,d.akun_piutang as kode_akun,'C' as dc,b.kode_pp, "+
										 "sum((a.premi-a.diskon+a.p_cost+a.materai) * a.kurs) as nilai, a.no_polis,sum(a.premi-a.diskon+a.p_cost+a.materai) as nilai_curr "+						 
										 "from sju_polis_termin a "+
										 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='0' "+
										 "inner join sju_quo_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
										 "inner join sju_tipe d on b.kode_tipe=d.kode_tipe and b.kode_lokasi=d.kode_lokasi "+
										 "inner join sju_vendor e on b.kode_vendor=e.kode_vendor and b.kode_lokasi=e.kode_lokasi "+
										 "inner join sju_batalpolis_d f on a.no_bill=f.no_bill and a.no_polis=f.no_polis and a.kode_lokasi=f.kode_lokasi "+
										 "where f.no_batal='"+this.cb_batal.getText()+"' and f.kode_lokasi='"+this.app._lokasi+"' and a.nu="+this.sg1.cells(7,i)+" and a.no_bill='"+this.sg1.cells(3,i)+"' "+
										 "group by a.kode_lokasi,b.kode_pp,d.akun_piutang,a.no_polis "+										 
										 "union all "+
																	 
										 "select a.kode_lokasi,d.akun_fee as kode_akun,'D' as dc,b.kode_pp, "+
										 "sum(a.fee * a.kurs) as nilai, a.no_polis,sum(a.fee) as nilai_curr "+
										 "from sju_polis_termin a "+
										 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='0' "+
										 "inner join sju_quo_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
										 "inner join sju_tipe d on b.kode_tipe=d.kode_tipe and b.kode_lokasi=d.kode_lokasi "+
										 "inner join sju_vendor e on b.kode_vendor=e.kode_vendor and b.kode_lokasi=e.kode_lokasi "+
										 "inner join sju_batalpolis_d f on a.no_bill=f.no_bill and a.no_polis=f.no_polis and a.kode_lokasi=f.kode_lokasi "+
										 "where f.no_batal='"+this.cb_batal.getText()+"' and f.kode_lokasi='"+this.app._lokasi+"' and a.nu="+this.sg1.cells(7,i)+" and a.no_bill='"+this.sg1.cells(3,i)+"' "+
										 "group by a.kode_lokasi,b.kode_pp,d.akun_fee,a.no_polis "+						 							 
										 "union all "+
										 
										 "select a.kode_lokasi,'"+this.akunPPN+"' as kode_akun,'D' as dc,b.kode_pp, "+						 
										 "sum(a.ppn * a.kurs) as nilai, a.no_polis,sum(a.ppn) as nilai_curr "+						 
										 "from sju_polis_termin a "+
										 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='0' "+
										 "inner join sju_quo_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
										 "inner join sju_tipe d on b.kode_tipe=d.kode_tipe and b.kode_lokasi=d.kode_lokasi "+
										 "inner join sju_vendor e on b.kode_vendor=e.kode_vendor and b.kode_lokasi=e.kode_lokasi "+
										 "inner join sju_batalpolis_d f on a.no_bill=f.no_bill and a.no_polis=f.no_polis and a.kode_lokasi=f.kode_lokasi "+
										 "where f.no_batal='"+this.cb_batal.getText()+"' and f.kode_lokasi='"+this.app._lokasi+"' and a.nu="+this.sg1.cells(7,i)+" and a.no_bill='"+this.sg1.cells(3,i)+"' "+
										 "group by a.kode_lokasi,b.kode_pp,a.no_polis "+							 
										 "union all "+						 
										 
										 "select a.kode_lokasi,e.akun_hutang as kode_akun,'D' as dc,b.kode_pp, "+						 
										 "sum(  (a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn) * a.kurs) as nilai,a.no_polis,sum(a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn) as nilai_curr "+
										 "from sju_polis_termin a "+
										 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='0' "+
										 "inner join sju_quo_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
										 "inner join sju_tipe d on b.kode_tipe=d.kode_tipe and b.kode_lokasi=d.kode_lokasi "+
										 "inner join sju_vendor e on b.kode_vendor=e.kode_vendor and b.kode_lokasi=e.kode_lokasi "+
										 "inner join sju_batalpolis_d f on a.no_bill=f.no_bill and a.no_polis=f.no_polis and a.kode_lokasi=f.kode_lokasi "+
										 "where f.no_batal='"+this.cb_batal.getText()+"' and f.kode_lokasi='"+this.app._lokasi+"' and a.nu="+this.sg1.cells(7,i)+" and a.no_bill='"+this.sg1.cells(3,i)+"' "+
										 "group by a.kode_lokasi,b.kode_pp,e.akun_hutang,a.no_polis) a "+
										 " ");										 								
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
					this.sg1.clear(1); //this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				/*
				this.sg.validasi();
				if (nilaiToFloat(this.e_beban.getText()) != nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Kas dan Nilai Penyelesaian tidak sama.");
					return false;						
				}
				*/
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}		
		this.doClick();
	},
	doChange:function(sender){		
		if (sender == this.e_periode || sender == this.c_jenis) this.doClick();
		if ((sender == this.cb_cust || sender == this.c_curr) && this.cb_cust.getText()!="" && this.c_curr.getText()!="") {			
			this.sg1.clear(1);
			this.cb_batal.setText("","");
			this.cb_batal.setSQL("select a.no_batal, a.keterangan from sju_batalpolis_m a inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
			                     "where a.kode_curr='"+this.c_curr.getText()+"' and b.kode_cust='"+this.cb_cust.getText()+"' and a.no_kas='-' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_batal","a.keterangan"],false,["Kode","Nama"],"and","Data Pembatalan",true);					
		}
		if (sender == this.cb_batal && this.cb_batal.getText()!="") {								
			var data = this.dbLib.getDataProvider("select a.nu,a.no_polis,a.kode_lokasi,a.nu,a.keterangan,a.no_bill,convert(varchar,a.due_date,103) as due_date, a.premi-a.diskon+a.p_cost+a.materai as total,isnull(b.no_bukti,'-') as no_bayar,isnull(b.nilai_kas,0) as nilai_bayar,isnull(c.nilai_kembali,0) as nilai_kembali,aa.nilai "+
						"from sju_polis_termin a "+
						"inner join sju_batalpolis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi "+
						"left join sju_polisbayar_d b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and a.nu=b.nu and a.no_bill=b.no_bill "+
						"left join sju_batalpolis_d c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi and a.nu=c.nu and a.no_bill=c.no_bill "+
						"where aa.kode_curr='"+this.c_curr.getText()+"' and aa.no_batal = '"+this.cb_batal.getText()+"' and aa.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg1.appendData([line.due_date,line.keterangan,floatToNilai(line.total),line.no_bill,line.no_bayar,floatToNilai(line.nilai_bayar),floatToNilai(line.nilai_kembali),line.nu]);
				}
			} else this.sg1.clear(1);
			//this.e_total.setText(floatToNilai(line.nilai));
		}
		if (sender == this.c_jenis) {
			this.doClick();				
		}																		
		if (sender == this.cb_akun && this.cb_akun.getText()!="") {
			this.sg1.clear(1); //this.sg.clear(1);
			var data = this.dbLib.getDataProvider("select kode_curr from masakun where kode_akun = '"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);		
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.c_curr.setText(line.kode_curr);						
				} 
			}					
		}
		if (sender == this.c_curr) {
			this.cb_batal.setText("","");  this.sg1.clear(1);
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); 
			}
			else {
				this.e_kurs.setText("0"); this.e_kurs.setReadOnly(false);
			}
		}									
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%"+this.c_jenis.getText().substr(2,3);
			var data = this.dbLib.getDataProvider("select isnull(max(no_kas),0) as no_kas from kas_m where no_kas like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_kas == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
					else {
						var idx = parseFloat(line.no_kas.substr(8,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/"+nu+this.c_jenis.getText().substr(2,3));						
					}
				} 
			}
			this.e_bank.setFocus();
			setTipeButton(tbSimpan);
		}		
	},							
	doChangeCell1: function(sender, col, row){
		if (col == 6) this.doNilaiChange1();
	},
	doNilaiChange1: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(6,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;								
								this.pc1.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;		
					/*					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}							
						}else throw result;
					break;
					*/
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
			this.sg1.clear(1); //this.sg.clear(1); 					
			setTipeButton(tbSimpan);		
			this.doClick();
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	},
	/*
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") tot += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg.cells(4,i));
				}
			}			
			this.e_beban.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"D");						
					}
				break;			
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
	*/
});