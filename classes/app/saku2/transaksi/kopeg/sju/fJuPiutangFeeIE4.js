window.app_saku2_transaksi_kopeg_sju_fJuPiutangFeeIE4 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fJuPiutangFeeIE4.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fJuPiutangFeeIE4";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Penerimaan Invoice (Fee): Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Penerimaan","List Penerimaan",]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No KasBank","Tanggal","Deskripsi","Penanggung","Tertanggung"],
					colWidth:[[4,3,2,1,0],[200,200,250,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.c_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});	
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_terima = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Nilai Terima", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});										
		this.e_sisa = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Sisa Terima", tag:1, tipeText:ttNilai, text:"0",readOnly:true});					
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun Penyelesaian", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});											
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Bayar", tag:1, tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});			
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,140,20],caption:"Curr - Kurs", tag:2, readOnly:true, text:"IDR",change:[this,"doChange"]});				
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[170,14,50,20],caption:"", tag:1, labelWidth:0, tipeText:ttNilai, text:"1",tag:2,change:[this,"doChange"]});		//readOnly:true, 								
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.c_ppn = new saiCB(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"PPN Dipungut",items:["SJU","PENANGGUNG"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_beban = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,255], childPage:["Filter Data","Data Invoice","Jurnal Sisa"]});		
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Penanggung", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});							
		this.cb_cust = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});							
		this.bLoad = new button(this.pc1.childPage[0],{bound:[120,10,80,18],caption:"Load Data",click:[this,"doLoad"]});			
		
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:16,tag:0,
				colTitle:["Status","No Bill","No Register","No Polis | Sertifikat","Akun AR","Kurs","Tagihan","Nilai Bayar","Sisa","Sls Kurs","Akun AP","Nilai Hut","Nilai PPh","Nilai PPN","Brokerage","Cust"],				
				colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,60,80,80,100,100,60,60,200,80,100,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,8,9,10,11,12,13,14,15],[7]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],
				colFormat:[[5,6,7,8,9,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],																
				dblClick:[this,"doDoubleClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Kurs","Nilai","Kode PP","Nama PP"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,60,80,80,250,50,200,80]],					
					//columnReadOnly:[true,[1,2,4,5,7],[0,3,6]],
					columnReadOnly:[true,[1,7],[0,2,3,4,5,6]],
					buttonStyle:[[0,2,6],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],checkItem:true,
					picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.e_sls = new saiLabelEdit(this.sgn,{bound:[780,1,200,20],caption:"Tot Jurnal Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSGJurnal = "1";	//tervalidasi otomatis		
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_vendor.setSQL("select kode_vendor, nama from sju_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Penanggung",true);			
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('034') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.c_jenis.setSQL("select no_dokumen, nama from sju_dokumen where modul = 'JU' and kode_lokasi='"+this.app._lokasi+"'",["no_dokumen","nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);	
			
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                                      "where a.kode_spro in ('HUTPPN','PPPHSJU','AKUNOI','AKUNOE','RKURS','LKURS') and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNOI") { this.akunOI = line.flag;	this.namaOI = line.nama;}							
					if (line.kode_spro == "AKUNOE") { this.akunOE = line.flag; this.namaOE = line.nama; }
					if (line.kode_spro == "RKURS") this.akunRSK = line.flag;								
					if (line.kode_spro == "LKURS") this.akunLSK = line.flag;													
					if (line.kode_spro == "PPPHSJU") this.akunPPH = line.flag;	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;
				}
			}
			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fJuPiutangFeeIE4.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fJuPiutangFeeIE4.implement({
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
			if (this.stsSimpan==1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.cb_vendor.getText() != "") var custVendor = this.cb_vendor.getText();
					if (this.cb_cust.getText() != "") var custVendor = this.cb_cust.getText();
					
					if (this.stsSimpan == 0) {
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_polisbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_hutbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_ppn.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','JUFEE4','"+this.c_jenis.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','"+this.cb_cust.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_akun.getText()+"',getdate(),'"+this.app._userLog+"')");
					
					var kasIDR = Math.round(nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+kasIDR+",'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','JUFEE4','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-','-')");
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BAYAR"){														
							//---------------------------piutang
							var nilaiPiu = nilaiToFloat(this.sg1.cells(6,i));
							var nilaiPiuIDR = Math.round(nilaiPiu * nilaiToFloat(this.sg1.cells(5,i)) * 100)/100;
							//dibuat lunas di nilai lain supaya tidak muncul lagi						
							var nilaiLain = nilaiToFloat(this.sg1.cells(6,i)) - nilaiToFloat(this.sg1.cells(7,i));							
							
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(2,i)+"','"+this.dp_d1.getDateString()+"',98,'"+this.sg1.cells(4,i)+"','piutang atas "+this.sg1.cells(15,i)+" polis "+this.sg1.cells(3,i)+"','C',"+nilaiPiuIDR+",'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','JUFEE4','ARKB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg1.cells(5,i))+",'"+this.app._userLog+"',getdate(),'-','-')");
														
							if (this.c_ppn.getText() == "PENANGGUNG") {
								var nilaiPPN = nilaiToFloat(this.sg1.cells(13,i));
								var nilaiPPNIDR = Math.round(nilaiPPN * nilaiToFloat(this.sg1.cells(5,i)) * 100)/100;								
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"('"+this.e_nb.getText()+"','"+this.sg1.cells(2,i)+"','"+this.dp_d1.getDateString()+"',95,'"+this.akunPPN+"','koreksi ppn atas "+this.sg1.cells(15,i)+" polis "+this.sg1.cells(3,i)+"','D',"+nilaiPPNIDR+",'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','JUFEE4','HUTPPN','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg1.cells(5,i))+",'"+this.app._userLog+"',getdate(),'-','-')");
							}							
							sql.add("insert into sju_polisbayar_d(no_bukti,kode_lokasi,no_bill,no_polis,nu,akun_piutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs,no_kashut,kode_vendor,ke)  "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_bill,no_polis,nu,akun_piutang,premi-diskon+p_cost+materai,0,0,'"+this.e_periode.getText()+"','D','JUFEE',kode_curr,"+nilaiToFloat(this.e_kurs.getText())+",'"+this.e_nb.getText()+"',kode_vendor,ke "+
									"from sju_polis_termin where no_bill='"+this.sg1.cells(1,i)+"' and no_polis='"+this.sg1.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
							sql.add("update a set a.nilai_kas = a.nilai_kas - "+nilaiLain+",nilai_lain="+nilaiLain+",nilai_sk="+nilaiToFloat(this.sg1.cells(9,i))+" "+
									"from sju_polisbayar_d a inner join sju_polis_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi and b.status='LEADER' "+
									"where a.no_bill='"+this.sg1.cells(1,i)+"' and a.no_polis='"+this.sg1.cells(2,i)+"' and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");		
							
							//---------------------------hutang
							var nilaiAP = nilaiToFloat(this.sg1.cells(11,i));
							var nilaiAPIDR = Math.round(nilaiAP * nilaiToFloat(this.sg1.cells(5,i)) * 100)/100;									
							var pph = nilaiToFloat(this.sg1.cells(12,i));
							var pphIDR = Math.round(pph * nilaiToFloat(this.e_kurs.getText()) * 100)/100;									
							
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(2,i)+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg1.cells(10,i)+"','hutang premi atas polis "+this.sg1.cells(3,i)+"','D',"+nilaiAPIDR+",'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','JUFEE4','AP','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg1.cells(5,i))+",'"+this.app._userLog+"',getdate(),'-','-')");																						
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(2,i)+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunPPH+"','pph atas polis "+this.sg1.cells(3,i)+"','D',"+pphIDR+",'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','JUFEE4','PPH','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-','-')");						

							sql.add("insert into sju_hutbayar_d(no_bukti,kode_lokasi,no_bill,no_polis,nu,akun_hutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs,kode_vendor,ke) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_bill,no_polis,nu,akun_hutang,"+nilaiAP+",0,0,'"+this.e_periode.getText()+"','D','JUFEE',kode_curr,kurs,kode_vendor,ke "+
									"from sju_polis_termin where no_bill='"+this.sg1.cells(1,i)+"' and no_polis='"+this.sg1.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");																								
						}
					}	
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var nilaiSlsIDR = Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.sg.cells(5,i)) * 100)/100;
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiSlsIDR+",'"+this.sg.cells(6,i)+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUFEE4','SLS','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.app._userLog+"',getdate(),'-','-')");
							}
						}
					}					
					if (this.nilaiSK > 0) {						
						sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunLSK+"','"+this.e_ket.getText()+"','C',"+this.nilaiSK+",'"+this.app._kodePP+"','-','-','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','JUFEE4','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					}
					if (this.nilaiSK < 0) {						
						sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunRSK+"','"+this.e_ket.getText()+"','D',"+Math.abs(this.nilaiSK)+",'"+this.app._kodePP+"','-','-','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','JUFEE4','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					}
					
					this.stsSGJurnal = "1";			
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
					this.sg1.clear(1); this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :								
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.stsSGJurnal = "0";
				this.sg1.validasi();			
				var tot = 0;				
				for (var i = 0; i < this.sg1.rows.getLength();i++){
					if (this.sg1.rowValid(i)){											
						if (this.sg1.cells(0,i) == "BAYAR") {						    							
							tot += nilaiToFloat(this.sg1.cells(7,i));
							if (this.c_ppn.getText() == "SJU") var tagihan = Math.round((nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(12,i))) * 100) / 100;							
							else var tagihan = Math.round((nilaiToFloat(this.sg1.cells(6,i)) - nilaiToFloat(this.sg1.cells(13,i)) + nilaiToFloat(this.sg1.cells(12,i))) * 100) / 100;							
							
							if (this.c_ppn.getText() == "SJU") var bayarhutang = Math.round((nilaiToFloat(this.sg1.cells(7,i)) + nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(11,i)) + nilaiToFloat(this.sg1.cells(12,i)) + nilaiToFloat(this.sg1.cells(12,i))) * 100) / 100 ;
							else var bayarhutang = Math.round((nilaiToFloat(this.sg1.cells(7,i)) + nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(11,i)) + nilaiToFloat(this.sg1.cells(12,i)) + nilaiToFloat(this.sg1.cells(12,i)) ) * 100) / 100 ;
							
							if (tagihan != bayarhutang)  {
								var j = i+1;
								system.alert(this,"Transaksi tidak valid.","Nilai Bayar + Sisa tidak sama dengan Tagihan. Baris : "+j);
								return false;						
							}
							if (nilaiToFloat(this.sg1.cells(7,i)) + Math.abs(nilaiToFloat(this.sg1.cells(8,i))) == 0) {
								system.alert(this,"Transaksi tidak valid.","Status BAYAR bernilai nol di baris : "+j);
								return false;						
							}
						}
						else {
							if (this.sg1.cells(7,i) != "0" || this.sg1.cells(8,i) != "0") {
								var j = i+1;
								system.alert(this,"Transaksi tidak valid.","Nilai Bayar + Sisa tidak sama nol dgn Status INPROG. Baris : "+j);
								return false;						
							}
						}
					}
				}				
				if (nilaiToFloat(this.e_terima.getText()) != nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Sisa KB tidak nol.");
					return false;						
				}				
				if (Math.round(tot * 100)/100 != nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total rincian bayar tidak sama dengan Total KasBank.");
					return false;						
				}				
				if (nilaiToFloat(this.e_beban.getText()) != nilaiToFloat(this.e_sls.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Selisih tidak sesuai dengan Total Jurnal Selisih.");
					return false;						
				}				
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
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_polisbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_hutbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) this.doClick();		
		this.sg1.clear(1); this.sg.clear(1); 					
		this.doLoad3();
	},	
	doLoad:function(sender){				
		if (this.stsSimpan==1) {
			this.pc1.setActivePage(this.pc1.childPage[1]);
			if (this.cb_vendor.getText()!="") {
				var filter1 = " a.kode_vendor='"+this.cb_vendor.getText()+"' and ";
				var filter2 = " a.kode_vendor='"+this.cb_vendor.getText()+"' and ";
			}
			else {
				var filter1 = " aa.kode_cust='"+this.cb_cust.getText()+"' and ";
				var filter2 = " a.kode_cust='"+this.cb_cust.getText()+"' and ";
			}
				
			var strSQL = "select a.kode_lokasi,a.no_bill,a.no_polis,a.keterangan,a.akun_piutang,a.akun_hutang,a.kurs,round(a.total-isnull(b.bayar,0),2) as saldo,a.hutang,a.pph,a.ppn,a.fee,c.nama as nama_cust "+
						 "from ( "+						 
						 "select a.kode_vendor,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan,a.akun_piutang,a.akun_hutang,a.kurs, "+
						 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as total,sum(round(a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn,2)) as hutang,sum(a.pph) as pph,sum(a.ppn) as ppn,sum(a.fee) as fee "+ 
						 "from sju_polis_termin a inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
						 "where "+filter1+" (a.premi-a.diskon+a.p_cost+a.materai)>0  and a.kode_lokasi='"+this.app._lokasi+"' and no_bill <> '-' "+
						 "group by a.kode_vendor,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok,aa.no_dok2,a.akun_piutang,a.akun_hutang,a.kurs "+
						 ")a  "+						 
						 "inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+						 
						 "left join ( "+
						 "    select no_bill,no_polis,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						 "    from sju_polisbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_bill,no_polis,kode_lokasi) b "+
						 "on a.no_bill=b.no_bill and a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+						 
						 "where "+filter2+" a.total>isnull(b.bayar,0) and a.kode_lokasi ='"+this.app._lokasi+"' order by a.no_polis";						 
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData(["INPROG",line.no_bill,line.no_polis,line.keterangan,line.akun_piutang,floatToNilai(line.kurs),floatToNilai(line.saldo),"0","0","0",line.akun_hutang,floatToNilai(line.hutang),floatToNilai(line.pph),floatToNilai(line.ppn),floatToNilai(line.fee),line.nama_cust]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
		}		
	},	
	doChange:function(sender){		
		if (sender == this.e_terima || sender == this.e_total) {
			if (this.e_terima.getText() != "" && this.e_total.getText() != "") {
				var sisa = Math.round(  (nilaiToFloat(this.e_terima.getText()) - nilaiToFloat(this.e_total.getText())) * 100) / 100;
				this.e_sisa.setText(floatToNilai(sisa));
			}			
		}
		if (sender == this.c_ppn) {
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i)){						
					this.sg1.cells(0,i,"INPROG");
				}
			}		
			this.sg1.validasi();
		}
		if (sender == this.cb_vendor && this.cb_vendor.getText() != "") {
			this.cb_cust.setText("","");				
		}
		if (sender == this.cb_cust && this.cb_cust.getText() != "") {
			this.cb_vendor.setText("","");				
		}
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan == 1) {
			this.doClick();
			var data = this.dbLib.getDataProvider("select kurs from sju_kurs where kode_curr ='"+this.c_curr.getText()+"' and tanggal='"+this.dp_d1.getDateString()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));											
			}
		}		
		if (sender == this.c_jenis && this.stsSimpan==1) {
			this.doClick();				
		}																		
		if (sender == this.cb_akun && this.cb_akun.getText()!="") {						
			var data = this.dbLib.getDataProvider("select kode_curr from masakun where kode_akun = '"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);		
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.c_curr.setText(line.kode_curr);						
				} 
			}					
		}		
						
		if (sender == this.e_kurs) this.sg1.validasi();
			
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);
				this.sg.clear(1);
			}
			this.stsSimpan = 1;
			this.stsSGJurnal = "1";										
			this.cb_vendor.setSQL("select kode_vendor, nama from sju_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Penanggung",true);			
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%";//+this.c_jenis.getText().substr(2,3);
			var data = this.dbLib.getDataProvider("select isnull(max(no_ju),0) as no_ju from ju_m where no_ju like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_ju == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
					else {
						var idx = parseFloat(line.no_ju.substr(8,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/"+nu+this.c_jenis.getText().substr(2,3));						
					}
				} 
			}
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},		
	doNilaiChange1: function(){
		try{			
			if (this.stsSGJurnal == "1") { this.sg.clear(); this.e_sls.setText("0"); }
			this.nilaiSK = 0;
			var beban = saldo = bayar = 0;						
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="BAYAR" && this.sg1.cells(6,i) != "" && this.e_kurs.getText()!="") {
					if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "" && this.sg1.cells(7,i) != "") {
						this.sg1.cells(9,i,Math.round((nilaiToFloat(this.e_kurs.getText())-nilaiToFloat(this.sg1.cells(5,i))) * (nilaiToFloat(this.sg1.cells(7,i)) + nilaiToFloat(this.sg1.cells(12,i)) ) *100)/100);
						this.nilaiSK += nilaiToFloat(this.sg1.cells(9,i));
					}
					bayar += nilaiToFloat(this.sg1.cells(7,i));
					saldo += nilaiToFloat(this.sg1.cells(6,i));					
					beban += nilaiToFloat(this.sg1.cells(8,i));					
					
					if (this.stsSGJurnal == "1") {
						var nilai2 = Math.abs(nilaiToFloat(this.sg1.cells(8,i)));
						var kurs = Math.abs(nilaiToFloat(this.sg1.cells(5,i)));
						if (nilaiToFloat(this.sg1.cells(8,i)) != 0) {
							if (nilaiToFloat(this.sg1.cells(8,i)) > 0) this.sg.appendData([this.akunOE,this.namaOE,"D",this.sg1.cells(3,i),floatToNilai(kurs),nilai2,this.app._kodePP,this.app._namaPP]);
							else this.sg.appendData([this.akunOI,this.namaOI,"C",this.sg1.cells(3,i),floatToNilai(kurs),nilai2,this.app._kodePP,this.app._namaPP]);
						}
					}
				}
			}						
			this.e_saldo.setText(floatToNilai(Math.round(saldo * 100)/100));
			this.e_beban.setText(floatToNilai(Math.round(beban * 100)/100));				
			this.e_total.setText(floatToNilai(Math.round(bayar * 100)/100));							
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doChangeCell1: function(sender, col, row){				
		//kalo ada sisa , maka dianggap beban (adm bank) atau koreksi hut_ppn		
		if (col == 7) {	
			if (this.sg1.cells(6,row)!= "" && this.sg1.cells(7,row)!= "" ) { //this.sg1.cells(7,row) != "0" && 
				this.sg1.cells(0,row,"BAYAR");
				
				if (this.c_ppn.getText() == "SJU") var sls = Math.round((nilaiToFloat(this.sg1.cells(6,row)) - nilaiToFloat(this.sg1.cells(7,row)) - nilaiToFloat(this.sg1.cells(11,row)) - nilaiToFloat(this.sg1.cells(12,row))) * 100)/100;
				else var sls = Math.round((nilaiToFloat(this.sg1.cells(6,row)) - nilaiToFloat(this.sg1.cells(7,row)) - nilaiToFloat(this.sg1.cells(11,row)) - nilaiToFloat(this.sg1.cells(12,row)) - nilaiToFloat(this.sg1.cells(13,row)) ) * 100)/100;
				
				this.sg1.cells(8,row,parseFloat(sls));				
				this.sg1.validasi();
			}
			/*
			else {
				if (this.sg1.cells(7,row) == "0") this.sg1.cells(0,row,"INPROG");
			}
			*/
		}
		if (col == 0) {	
			if (this.sg1.cells(0,row) != "BAYAR") {
				this.sg1.cells(7,row,"0");
				this.sg1.cells(8,row,"0");
			}			
			this.sg1.validasi();
		}
	},		
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.c_ppn.getText() == "SJU") nFee = nilaiToFloat(this.sg1.cells(14,row)) + nilaiToFloat(this.sg1.cells(13,row)) - nilaiToFloat(this.sg1.cells(12,row));
			else nFee = nilaiToFloat(this.sg1.cells(14,row)) - nilaiToFloat(this.sg1.cells(12,row));														
			this.sg1.cells(7,row,parseFloat(Math.round(nFee * 100) / 100));				
			
		} catch(e) {alert(e);}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kopeg_sju_rptJuRincianPremi";
								this.nama_report="server_report_saku2_kopeg_sju_rptJuRincianPremi";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();   
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
				this.pc2.show();   
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
			this.sg1.clear(1); this.sg.clear(1); 					
			setTipeButton(tbSimpan);		
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 5) && (this.sg.cells(5,row) != "")) this.sg.validasi();
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
		if (col == 6) {
			if (sender.cells(6,row) != "") {
				var pp = this.dataPP.get(sender.cells(6,row));
				if (pp) sender.cells(7,row,pp);
				else {
					if (trim(sender.cells(6,row)) != "") system.alert(this,"Kode PP "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(6,row,"");
					sender.cells(7,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += Math.round(nilaiToFloat(this.sg.cells(5,i)) * 100)/100;
					if (this.sg.cells(2,i).toUpperCase() == "C") totD -= Math.round(nilaiToFloat(this.sg.cells(5,i)) * 100)/100;
				}
			}			
			this.e_sls.setText(floatToNilai(Math.round(totD * 100)/100));			
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
			case 6 : 
					if ((this.sg.cells(6,row) == "") && (row > 0)) {
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
						this.sg.setCell(7,row,this.sg.cells(7,(row-1)));
					}
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 6){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.no_link+' - '+isnull(b.nama,'-') as vendor,a.no_del+' - '+isnull(c.nama,'-') as cust "+
		             "from ju_m a "+
					 "left join sju_vendor b on a.no_link=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					 "left join sju_cust c on a.no_del=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'JUFEE4' and a.posted ='F'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_ju,line.tgl,line.keterangan,line.vendor,line.cust]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_link,no_del,no_link,ref1,kode_curr,kurs,jenis,nilai,no_dokumen "+
							 "from ju_m "+							 
							 "where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);					
						this.c_ppn.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.ref1);				
						this.c_curr.setText(line.kode_curr);										
						this.e_kurs.setText(floatToNilai(line.kurs));				
						this.e_total.setText(floatToNilai(line.nilai));				
						this.e_terima.setText(floatToNilai(line.nilai));				
						
						this.cb_vendor.setSQL("select kode_vendor, nama from sju_vendor where kode_vendor='"+line.no_link+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Penanggung",true);									
						this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_cust='"+line.no_del+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);									
						
						if (line.no_link != "" && line.no_link != "-") this.cb_vendor.setText(line.no_link);				
						if (line.no_del != "" && line.no_del != "-") this.cb_cust.setText(line.no_del);				
						
					}
				}
				
				//if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true);				
				//else this.e_kurs.setReadOnly(false); 								
				this.stsSGJurnal = "0";				
				
				if (this.cb_vendor.getText()!="") {
					var filter1 = " a.kode_vendor='"+this.cb_vendor.getText()+"' and ";					
				}
				else {
					var filter1 = " aa.kode_cust='"+this.cb_cust.getText()+"' and ";					
				}
				
				var strSQL = "select a.kode_lokasi,a.no_bill,a.no_polis,a.keterangan,a.akun_piutang,a.akun_hutang,a.kurs,round(a.total-isnull(b.bayar,0),2) as saldo,round(c.nilai_kas,2) as nilai_kas, "+
				             " case no_dokumen when 'SJU' then round(c.nilai_lain-a.hutang-a.pph,2) else round(c.nilai_lain-a.hutang-a.pph-a.ppn,2) end as nilai_lain, "+
							 "round(c.nilai_sk,2) as nilai_sk,a.hutang,round(a.pph,2) as pph,round(a.ppn,2) as ppn,round(a.fee,2) as fee,cc.nama as nama_cust  "+
			             "from ( "+
						 "select a.kode_vendor,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan,a.akun_piutang,a.akun_hutang,a.kurs,"+
						 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as total,sum(round(a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn,2)) as hutang,sum(a.pph) as pph,sum(a.ppn) as ppn,sum(a.fee) as fee   "+ 
						 "from sju_polis_termin a inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
						 "where "+filter1+" (a.premi-a.diskon+a.p_cost+a.materai)>0  and a.kode_lokasi='"+this.app._lokasi+"' and no_bill <> '-' "+
						 "group by a.kode_vendor,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok,aa.no_dok2,a.akun_piutang,a.akun_hutang,a.kurs "+
						 ")a  "+					     						 
						 "inner join ("+
						 "		select no_bukti,kode_lokasi,no_bill,no_polis,sum(nilai_kas) as nilai_kas,sum(nilai_lain) as nilai_lain,sum(nilai_sk) as nilai_sk "+
						 "      from sju_polisbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_bukti,no_bill,no_polis,kode_lokasi "+
						 ")c on a.no_bill=c.no_bill and a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+						 
						 "inner join sju_cust cc on a.kode_cust=cc.kode_cust and a.kode_lokasi=cc.kode_lokasi "+
						 "inner join ju_m x on c.no_bukti=x.no_ju and c.kode_lokasi=x.kode_lokasi "+
						 "left join ( "+
						 "    select no_bill,no_polis,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						 "    from sju_polisbayar_d where no_bukti<>'"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_bill,no_polis,kode_lokasi) b "+
						 "on a.no_bill=b.no_bill and a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						 "where c.no_bukti='"+this.e_nb.getText()+"' and c.kode_lokasi ='"+this.app._lokasi+"'";			
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg1.appendData(["BAYAR",line.no_bill,line.no_polis,line.keterangan,line.akun_piutang,floatToNilai(line.kurs),floatToNilai(line.saldo),floatToNilai(line.nilai_kas),floatToNilai(line.nilai_lain),floatToNilai(line.nilai_sk),line.akun_hutang,floatToNilai(line.hutang),floatToNilai(line.pph),floatToNilai(line.ppn),floatToNilai(line.fee),line.nama_cust]);
					}
				} else this.sg1.clear(1);												
				
				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.kurs,round(a.nilai/a.kurs,2) as nilai,a.kode_pp,c.nama as nama_pp "+
							 "from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							 "where a.jenis = 'SLS' and a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.kurs),floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				}
				this.sg.validasi();								
			}									
		} catch(e) {alert(e);}
	}	
});

