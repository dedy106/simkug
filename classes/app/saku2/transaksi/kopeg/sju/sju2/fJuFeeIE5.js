window.app_saku2_transaksi_kopeg_sju_sju2_fJuFeeIE5 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_sju2_fJuFeeIE5.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_sju2_fJuFeeIE5";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Brokerage Non Cash", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Status","No Ref.","Deskripsi","Penanggung/Tertanggung","Kode Akun"],
					colWidth:[[6,5,4,3,2,1,0],[200,200,250,150,80,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});	
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.c_jcurr = new saiCB(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Basis Curr Bayar",items:["CURR","IDR"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"N Penyelesaian", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Acc Penyelesaian", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Tot. Brokerage++ ", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,140,20],caption:"Curr - Kurs", tag:2, readOnly:true, text:"IDR",change:[this,"doChange"]});				
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[170,14,50,20],caption:"", tag:1, labelWidth:0, tipeText:ttNilai, text:"1",tag:2});				
		this.e_beban = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Nilai Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,288], childPage:["Filter Data","Data Invoice","Jurnal Sisa"]});		
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Penanggung", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});							
		this.cb_cust = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});							
		this.bLoad = new button(this.pc1.childPage[0],{bound:[120,10,80,18],caption:"Load Data",click:[this,"doLoad"]});			
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:17,tag:0,
				colTitle:["Status","No Bill","No Register","No Polis | Sertifikat","Tertanggung","Curr","Kurs","Brokerage++","Brokerage IDR++","PPN","PPN IDR","Nilai Premi","N Hutang","PPh","ID","Akun AR","Akun AP"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,60,50,80,100,100,100,80,100,80,  60,50,150,300,100,100,80]],				
				colHide:[[16,15,14,13,12,10,9],[true,true,true,true,true,true,true]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],
				colFormat:[[6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,60,100,300,50,200,80]],										
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],checkItem:true,
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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_vendor.setSQL("select kode_vendor, nama from sju_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Penanggung",true);			
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('034') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.c_jenis.setSQL("select no_dokumen, nama from sju_dokumen where modul = 'JU' and kode_lokasi='"+this.app._lokasi+"'",["no_dokumen","nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);	
			
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                                      "where a.kode_spro in ('PPPHSJU','AKUNOI','AKUNOE','RKURS','LKURS') and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNOI") { this.akunOI = line.flag;	this.namaOI = line.nama;}							
					if (line.kode_spro == "AKUNOE") { this.akunOE = line.flag; this.namaOE = line.nama; }
					if (line.kode_spro == "RKURS") this.akunRSK = line.flag;								
					if (line.kode_spro == "LKURS") this.akunLSK = line.flag;													
					if (line.kode_spro == "PPPHSJU") this.akunPPH = line.flag;	
				}
			}
			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);			
			
			this.e_kurs.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_sju2_fJuFeeIE5.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_sju2_fJuFeeIE5.implement({
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.e_periode.getText().substr(2,4) != this.e_nb.getText().substr(3,4)) {
				system.alert(this,"Transaksi tidak valid.","No Bukti tidak sesuai periode-nya.");
				return false;
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_polisbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_hutbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					if (this.cb_vendor.getText() != "") var custVendor = this.cb_vendor.getText();
					if (this.cb_cust.getText() != "") var custVendor = this.cb_cust.getText();
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','JUFEE5','"+this.c_jenis.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','"+this.cb_cust.getText()+"','"+this.c_jcurr.getText()+"','"+this.cb_vendor.getText()+"',getdate(),'"+this.app._userLog+"')");										
															
					var kasIDR = Math.round(nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;
					var slsJurnal = kasIDR;					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+kasIDR+",'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','JUFEE5','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-','-')");							
														
					this.nilaiSK = 0;
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BAYAR"){
							var j=i+1000;							
							var k=i+2000;
							var l=i+3000;
							//------------ piutang
							var nilaiPiu = nilaiToFloat(this.sg1.cells(11,i));
							var nilaiPiuIDR = Math.round(nilaiPiu * nilaiToFloat(this.sg1.cells(6,i)) * 100)/100;							
							slsJurnal -= nilaiPiuIDR;
							
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(2,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(15,i)+"','piutang atas "+this.sg1.cells(4,i)+" polis "+this.sg1.cells(3,i)+"','C',"+nilaiPiuIDR+",'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','KBFEE5','AR','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.app._userLog+"',getdate(),'-','-')");														
						
							sql.add("insert into sju_polisbayar_d(no_bukti,kode_lokasi,no_bill,no_polis,nu,akun_piutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs,no_kashut,kode_vendor,ke)  "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_bill,no_polis,nu,akun_piutang,premi-diskon+p_cost+materai,0,0,'"+this.e_periode.getText()+"','D','KB',kode_curr,kurs,'"+this.e_nb.getText()+"',kode_vendor,ke "+
									"from sju_polis_termin where nu='"+this.sg1.cells(14,i)+"' and no_bill='"+this.sg1.cells(1,i)+"' and no_polis='"+this.sg1.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
							
							//------------ hutang
							var nilaiHut = nilaiToFloat(this.sg1.cells(12,i));
							var nilaiHutIDR = Math.round(nilaiHut * nilaiToFloat(this.sg1.cells(6,i)) * 100)/100;
							
							if (this.c_jcurr.getText() == "CURR") {
								var pph = nilaiToFloat(this.sg1.cells(13,i));
								var pphIDR = Math.round(pph * nilaiToFloat(this.e_kurs.getText()) * 100)/100;		
							}
							else {
								var pph = nilaiToFloat(this.sg1.cells(13,i));
								var pphIDR = Math.round(pph * nilaiToFloat(this.sg1.cells(6,i)) * 100)/100;		
							}							
							slsJurnal = slsJurnal + (nilaiHutIDR + pphIDR);
														
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(2,i)+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.sg1.cells(16,i)+"','hutang premi atas polis "+this.sg1.cells(3,i)+"','D',"+nilaiHutIDR+",'"+this.app._kodePP+"','-','-','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','KBFEE5','AP','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.app._userLog+"',getdate(),'-','-')");							
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(2,i)+"','"+this.dp_d1.getDateString()+"',"+l+",'"+this.akunPPH+"','pph atas polis "+this.sg1.cells(3,i)+"','D',"+pphIDR+",'"+this.app._kodePP+"','-','-','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.app._lokasi+"','KBFEE5','PPH','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-','-')");							
															
							sql.add("insert into sju_hutbayar_d(no_bukti,kode_lokasi,no_bill,no_polis,nu,akun_hutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs,kode_vendor,ke) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_bill,no_polis,nu,akun_hutang,"+nilaiHut+",0,0,'"+this.e_periode.getText()+"','D','KBFEE',kode_curr,kurs,kode_vendor,ke "+
									"from sju_polis_termin where nu='"+this.sg1.cells(14,i)+"' and no_bill='"+this.sg1.cells(1,i)+"' and no_polis='"+this.sg1.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
																
							if (this.c_jcurr.getText() == "CURR") this.nilaiSK += Math.round((nilaiToFloat(this.e_kurs.getText())-nilaiToFloat(this.sg1.cells(6,i))) * (nilaiToFloat(this.sg1.cells(7,i))-nilaiToFloat(this.sg1.cells(10,i))) *100)/100;												
						}
					}																																		
					
					
					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var nilaiSlsIDR = Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;
								if (this.sg.cells(2,i).toUpperCase() == "C") slsJurnal -= nilaiSlsIDR;
								else slsJurnal += nilaiSlsIDR;
								var k = i+5000;
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+k+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiSlsIDR+",'"+this.sg.cells(5,i)+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','KBFEE5','SLS','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-','-')");
							}
						}
					}					
					this.nilaiSK = Math.round(this.nilaiSK * 100)/100;					
					slsJurnal = Math.round((slsJurnal - this.nilaiSK) * 100)/100;					
					if (slsJurnal != 0.00) this.nilaiSK = this.nilaiSK - slsJurnal;
					
					if (this.nilaiSK > 0) {						
						sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunLSK+"','"+this.e_ket.getText()+"','C',"+this.nilaiSK+",'"+this.app._kodePP+"','-','"+this.cb_vendor.getText()+"','-','-','-','-','-','"+this.app._lokasi+"','JUFEE5','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					}
					if (this.nilaiSK < 0) {						
						sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunRSK+"','"+this.e_ket.getText()+"','D',"+Math.abs(this.nilaiSK)+",'"+this.app._kodePP+"','-','"+this.cb_vendor.getText()+"','-','-','-','-','-','"+this.app._lokasi+"','JUFEE5','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
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
					this.sg1.clear(1); this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();								
				
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
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
			this.doClick();
			var data = this.dbLib.getDataProvider("select kurs from sju_kurs where kode_curr ='"+this.c_curr.getText()+"' and tanggal='"+this.dp_d1.getDateString()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));											
			}
		}
		if (sender == this.c_jcurr && this.c_jcurr.getText()!="") {
			this.sg1.validasi();
		}						
		if (sender == this.c_jenis && this.stsSimpan==1) {
			this.e_bank.setText(this.c_jenis.rightLabelCaption.substr(0,50));
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
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {				
				this.e_kurs.setText("1"); 
				this.sg1.validasi();
				this.e_kurs.setReadOnly(true);
			}
			else {
				this.e_kurs.setReadOnly(false);
				if (this.stsSimpan == 1) this.e_kurs.setText("0"); 				
				this.sg1.validasi();
				var data = this.dbLib.getDataProvider("select kurs from sju_kurs where kode_curr ='"+this.c_curr.getText()+"' and tanggal='"+this.dp_d1.getDateString()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));											
				}
			}
		}				
		if ((sender == this.e_total || sender == this.e_saldo) && this.e_total.getText() != "" && this.e_saldo.getText() != "") {
			var beban = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_saldo.getText());
			this.e_beban.setText(floatToNilai(Math.round(beban * 100)/100));				
		}		
		if (sender == this.cb_vendor && this.cb_vendor.getText() != "" && this.stsSimpan==1) {
			this.cb_cust.setText("","");				
			this.sg1.clear(1);
		}
		if (sender == this.cb_cust && this.cb_cust.getText() != "" && this.stsSimpan==1) {
			this.cb_vendor.setText("","");				
			this.sg1.clear(1);
		}
	},
	doLoad:function(sender){				
		if (this.stsSimpan==1 && this.c_curr.getText()!="") {
			if (this.c_jcurr.getText() == "CURR") var vCurr = " and a.kode_curr = '"+this.c_curr.getText()+"' ";
			else var vCurr = " ";
			
			if (this.cb_vendor.getText()!="") {
				var filter1 = " a.kode_vendor='"+this.cb_vendor.getText()+"' and ";
				var filter2 = " a.kode_vendor='"+this.cb_vendor.getText()+"' and ";
			}
			else {
				var filter1 = " aa.kode_cust='"+this.cb_cust.getText()+"' and ";
				var filter2 = " a.kode_cust='"+this.cb_cust.getText()+"' and ";
			}
						
			var strSQL = "select a.nu,a.kode_lokasi,a.no_bill,a.no_polis,a.keterangan,a.akun_piutang,a.akun_hutang,a.kode_curr,a.kurs,round(a.fee+a.ppn-a.pph,2) as fee, round((a.fee+a.ppn-a.pph) * a.kurs,2) as fee_idr,c.nama as cust,round(a.piutang,2) as piutang,round(a.hutang,2) as hutang,round(a.ppn,2) as ppn,round(a.ppn * a.kurs,2) as ppn_idr,round(a.pph,2) as pph "+
			             "from ( "+
						 "select a.kode_vendor,a.nu,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan,a.akun_piutang,a.akun_hutang,a.kurs, "+
						 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as total,"+
						 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as piutang,"+
						 "sum((a.premi-a.diskon+a.p_cost+a.materai-a.fee-a.ppn)) as hutang, "+						 
						 "sum(a.ppn) as ppn, sum(a.pph) as pph,sum(a.fee) as fee "+ 
						 "from sju_polis_termin a inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
						 "where "+filter1+" (a.premi-a.diskon+a.p_cost+a.materai)>0  and a.kode_lokasi='"+this.app._lokasi+"' and no_bill <> '-' "+
						 "group by a.nu,a.kode_vendor,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok,aa.no_dok2,a.akun_piutang,a.akun_hutang,a.kurs "+
						 ")a  "+
						 "inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
						 "left join ( "+
						 "    select nu,no_bill,no_polis,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						 "    from sju_polisbayar_d where kode_lokasi='"+this.app._lokasi+"' group by nu,no_bill,no_polis,kode_lokasi) b "+
						 "on a.nu=b.nu and a.no_bill=b.no_bill and a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						 "where "+filter2+" a.total>isnull(b.bayar,0) and a.kode_lokasi ='"+this.app._lokasi+"' "+vCurr+" order by a.no_polis,a.nu";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					var vFee = Math.round(parseFloat(line.fee) * 100)/100;
					this.sg1.appendData(["INPROG",line.no_bill,line.no_polis,line.keterangan,line.cust,line.kode_curr,floatToNilai(line.kurs),floatToNilai(vFee),floatToNilai(line.fee_idr),floatToNilai(line.ppn),floatToNilai(line.ppn_idr),floatToNilai(line.piutang),floatToNilai(line.hutang),floatToNilai(line.pph),line.nu,line.akun_piutang,line.akun_hutang]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
			this.pc1.setActivePage(this.pc1.childPage[1]);			
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);
				this.sg.clear(1);
			}
			this.stsSimpan = 1;			
			this.cb_vendor.setSQL("select kode_vendor, nama from sju_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Penanggung",true);						
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
			var saldo = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="BAYAR" && this.sg1.cells(7,i) != "" && this.sg1.cells(8,i) != "") {
					if (this.c_jcurr.getText() == "CURR") saldo += nilaiToFloat(this.sg1.cells(7,i));
					else saldo += nilaiToFloat(this.sg1.cells(8,i));
				}
			}			
			this.e_saldo.setText(floatToNilai(Math.round(saldo * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 0) {				
			this.sg1.validasi();
		}
	},		
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) == "INPROG") this.sg1.cells(0,row,"BAYAR");
		else this.sg1.cells(0,row,"INPROG");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
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
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},	
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
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
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
					if (this.sg.cells(2,i).toUpperCase() == "D") totD -= nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totD += nilaiToFloat(this.sg.cells(4,i));
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
	},
	doLoad3:function(sender){																
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen as status,a.no_del as no_ref,a.keterangan,a.no_del+' - '+b.nama as cust,a.no_dokumen+' - '+c.nama as akun "+
		             "from ju_m a "+
					 "inner join sju_cust b on a.no_del=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "inner join masakun c on a.no_dokumen=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'JUFEE5' and a.posted ='F' "+
					 "union "+
					 "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen as status,a.ref1 as no_ref,a.keterangan,a.ref1+' - '+b.nama as cust,a.no_dokumen+' - '+c.nama as akun "+
		             "from ju_m a "+
					 "inner join sju_vendor b on a.ref1=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					 "inner join masakun c on a.no_dokumen=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'JUFEE5' and a.posted ='F' ";
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
			this.sg3.appendData([line.no_ju,line.tgl,line.status,line.no_ref,line.keterangan,line.cust,line.akun]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_link,no_dokumen,ref1,kode_curr,kurs,jenis,no_del,nilai,tanggal "+
							 "from ju_m "+
							 "where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);					
						this.c_jenis.setText(line.jenis);					
						this.c_jcurr.setText(line.no_link);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.no_dokumen);				
						this.c_curr.setText(line.kode_curr);										
						this.e_kurs.setText(floatToNilai(line.kurs));				
						this.e_total.setText(floatToNilai(line.nilai));				
						
						this.cb_vendor.setSQL("select kode_vendor, nama from sju_vendor where kode_vendor='"+line.ref1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Penanggung",true);									
						this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_cust='"+line.no_del+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);									
						
						if (line.ref1 != "" && line.ref1 != "-") this.cb_vendor.setText(line.ref1);										
						if (line.no_del != "" && line.no_del != "-") this.cb_cust.setText(line.no_del);				
							
						if (this.cb_vendor.getText()!="") var filter1 = " a.kode_vendor='"+this.cb_vendor.getText()+"' and ";
						else var filter1 = " aa.kode_cust='"+this.cb_cust.getText()+"' and ";
						
					}
				}
				
				var strSQL = "select a.nu,a.kode_lokasi,a.no_bill,a.no_polis,a.keterangan,a.akun_piutang,a.akun_hutang,a.kode_curr,a.kurs,round(a.fee+a.ppn-a.pph,2) as fee, round((a.fee+a.ppn-a.pph) * a.kurs,2) as fee_idr,c.nama as cust,round(a.piutang,2) as piutang,round(a.hutang,2) as hutang,round(a.ppn,2) as ppn,round(a.ppn * a.kurs,2) as ppn_idr,round(a.pph,2) as pph "+
							 "from ( "+
							 "select a.kode_vendor,a.nu,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan,a.akun_piutang,a.akun_hutang,a.kurs, "+
							 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as total,"+
							 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as piutang,"+
							 "sum((a.premi-a.diskon+a.p_cost+a.materai-a.fee-a.ppn)) as hutang, "+						 
							 "sum(a.ppn) as ppn, sum(a.pph) as pph,sum(a.fee) as fee "+ 
							 "from sju_polis_termin a inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "where "+filter1+" (a.premi-a.diskon+a.p_cost+a.materai)>0  and a.kode_lokasi='"+this.app._lokasi+"' and no_bill <> '-' "+
							 "group by a.nu,a.kode_vendor,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok,aa.no_dok2,a.akun_piutang,a.akun_hutang,a.kurs "+
							 ")a  "+
							 "inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							 "inner join sju_polisbayar_d b on a.nu=b.nu and a.no_bill=b.no_bill and a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+							 
							 "where b.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' order by a.no_polis,a.nu";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData(["BAYAR",line.no_bill,line.no_polis,line.keterangan,line.cust,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.fee),floatToNilai(line.fee_idr),floatToNilai(line.ppn),floatToNilai(line.ppn_idr),floatToNilai(line.piutang),floatToNilai(line.hutang),floatToNilai(line.pph),line.nu,line.akun_piutang,line.akun_hutang]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();
				
				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							 "from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							 "where a.jenis = 'SLS' and a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				}				
				this.sg.validasi();								
			}						
		} catch(e) {alert(e);}
	}
});