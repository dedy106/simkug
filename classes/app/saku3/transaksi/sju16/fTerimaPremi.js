window.app_saku3_transaksi_sju16_fTerimaPremi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fTerimaPremi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fTerimaPremi";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Premi", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Entry Data","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Curr","Nilai"],
					colWidth:[[4,3,2,1,0],[100,60,300,100,100]],
					colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});	
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[260,16,210,20],caption:"Status",items:["MCM","TRANSFER","CHEQUE","GIRO","NON"], readOnly:true,tag:2});		
		this.e_bank = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,330,20],caption:"Bank - No Ref.",maxLength:50});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[360,14,110,20],caption:"",  labelWidth:0, maxLength:30});				
		this.c_jcurr = new saiCB(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Basis Curr Bayar",items:["CURR","IDR"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Nilai Penerimaan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun Penerimaan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});							
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,140,20],caption:"Curr - Kurs", tag:2, readOnly:true, text:"IDR",change:[this,"doChange"]});				
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[170,14,50,20],caption:"", tag:1, labelWidth:0, tipeText:ttNilai, text:"1",tag:2});		
		this.e_beban = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Nilai Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,268], childPage:["Filter Cari","Data Premi","Jurnal Sisa","Otorisasi"]});		
		this.cb_cust = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]}); 
		this.bLoad = new button(this.pc1.childPage[0],{bound:[120,10,80,18],caption:"Load Data",click:[this,"doLoad"]});			
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:14,tag:0,
				colTitle:["Status","No Bill","No Register","No Polis | Sertifikat","Akun AR","Curr","Kurs","Tagihan","Tagihan IDR","ID",   "Segmen","Penanggung","COB","PIC"],
				colWidth:[[13,12,11,10, 9,8,7,6,5,4,3,2,1,0],[60,60,60,60, 60,100,100,60,60,80,300,100,100,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13],[]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],
				colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],	
				colHide:[[10,11,12,13],[true,true,true,true]],										
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","No Register","Segmen","Penanggung","Tertanggung","COB","PIC"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,80,   100,200,50,150,80]],										
					columnReadOnly:[true,[1,6,7,8,9,10],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],checkItem:true,
					picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});	
		this.e_sls = new saiLabelEdit(this.sgn,{bound:[780,1,200,20],caption:"Tot Jurnal Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[3],{bound:[20,11,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_periksa = new saiCBBL(this.pc1.childPage[3],{bound:[20,12,220,20],caption:"Diperiksa Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_fiat = new saiCBBL(this.pc1.childPage[3],{bound:[20,13,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_otorisasi = new saiCBBL(this.pc1.childPage[3],{bound:[20,14,220,20],caption:"Otorisasi Oleh", multiSelection:false, maxLength:10, tag:2});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.c_jenis.setSQL("select distinct a.no_dokumen, a.nama from sju_dokumen a "+
								"inner join sju_dokumen_form b on a.no_dokumen=b.no_dokumen and b.kode_form = 'SJ023' "+
								"inner join sju_dokumen_pp c on a.no_dokumen=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+
								"inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
								"where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"' ",["a.no_dokumen","a.nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);						

			this.cb_cust.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);

			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                                      "where a.kode_spro in ('AKUNOI','AKUNOE','RKURS','LKURS') and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNOI") { this.akunOI = line.flag;	this.namaOI = line.nama;}							
					if (line.kode_spro == "AKUNOE") { this.akunOE = line.flag; this.namaOE = line.nama; }
					if (line.kode_spro == "RKURS") this.akunRSK = line.flag;								
					if (line.kode_spro == "LKURS") this.akunLSK = line.flag;													
				}
			}
			
			this.e_kurs.setReadOnly(true);
			this.noReg = "";

			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_periksa.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_fiat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_otorisasi.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_buat.setText(this.app._userLog);
			this.cb_periksa.setText("-");
			this.cb_fiat.setText("-");
			this.cb_otorisasi.setText("-");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fTerimaPremi.extend(window.childForm);
window.app_saku3_transaksi_sju16_fTerimaPremi.implement({
	doLoad:function(sender){				
		this.sg1.clear(1);
		if (this.cb_cust.getText()!="" && this.stsSimpan==1 && this.c_curr.getText()!="") {
			
			if (this.c_jcurr.getText() == "CURR") var vCurr = " and a.kode_curr = '"+this.c_curr.getText()+"' ";
			else var vCurr = " ";
			
			this.noReg = "";
			var strSQL = "select a.nu,a.kode_lokasi,a.no_bill,a.no_polis,a.keterangan,a.akun_piutang,a.kode_curr,a.kurs,round(a.total-isnull(b.bayar,0),2) as saldo, round((a.total-isnull(b.bayar,0))* a.kurs,2) as saldo_idr, "+
						 "       a.kode_pp,a.kode_vendor,a.kode_tipe,a.kode_pic "+
			             "from ( "+
						 "select a.nu,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan,a.akun_piutang,a.kurs, "+
						 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as total,aa.kode_pp,bb.kode_vendor,aa.kode_tipe,aa.kode_pic  "+ 
						 "from sju_polis_termin a "+
						 "		inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
						 "		inner join sju_polis_vendor bb on aa.no_polis=bb.no_polis and aa.kode_lokasi=bb.kode_lokasi and bb.status='LEADER' "+
						 "where aa.kode_cust='"+this.cb_cust.getText()+"' and (a.premi-a.diskon+a.p_cost+a.materai)>0  and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill <> '-' "+ 
						 "group by a.nu,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok,aa.no_dok2,a.akun_piutang,a.kurs, "+
						 "		   aa.kode_pp,bb.kode_vendor,aa.kode_tipe,aa.kode_pic "+
						 ")a  "+
						 "left join ( "+
						 "    select nu,no_bill,no_polis,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						 "    from sju_polisbayar_d where kode_lokasi='"+this.app._lokasi+"' group by nu,no_bill,no_polis,kode_lokasi) b "+
						 "on a.nu=b.nu and a.no_bill=b.no_bill and a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						 "where a.kode_cust='"+this.cb_cust.getText()+"' and a.total>isnull(b.bayar,0) and a.kode_lokasi ='"+this.app._lokasi+"' "+vCurr+" order by a.no_polis,a.nu";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];		
					this.sg1.appendData(["INPROG",line.no_bill,line.no_polis,line.keterangan,line.akun_piutang,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.saldo),floatToNilai(line.saldo_idr),line.nu,  line.kode_pp,line.kode_vendor,line.kode_tipe,line.kode_pic]);					
					this.noReg += ",'"+line.no_polis+"'";	
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
	
			this.noReg = this.noReg.substr(1);	

			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("select no_polis,kode_pp from sju_polis_m where no_polis in ("+this.noReg+") and kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);

		}
		this.pc1.setActivePage(this.pc1.childPage[1]);			
	},
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from sju_polisbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.modul+"','TRM_PREMI','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+parseNilai(this.e_total.getText())+",0,0,'-','-','"+this.c_jcurr.getText()+"','"+this.e_bank.getText()+"','"+this.e_dok.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_akun.getText()+"','"+this.c_status.getText()+"','"+this.c_jenis.getText()+"')");
					
					var totalIDR = Math.round(nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;
					var slsJurnal = totalIDR;
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','D',"+totalIDR+","+
							nilaiToFloat(this.e_total.getText())+",'"+this.e_ket.getText()+"','"+this.modul+"','KB','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");
					
					if (this.sg1.getRowValidCount() > 0){
						this.nilaiSK = 0;
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BAYAR"){								
								var nilaiPiu = nilaiToFloat(this.sg1.cells(7,i));
								var nilaiPiuIDR = Math.round(nilaiPiu * nilaiToFloat(this.sg1.cells(6,i)) * 100)/100;							
								slsJurnal -= nilaiPiuIDR;
								
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg1.cells(2,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(4,i)+"','C',"+nilaiPiuIDR+","+
										nilaiPiu+",'piutang atas "+this.cb_cust.rightLabelCaption+" polis "+this.sg1.cells(3,i)+"','"+this.modul+"','B-AR','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.sg1.cells(10,i)+"','-','"+this.cb_cust.getText()+"','"+this.sg1.cells(11,i)+"','-','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(12,i)+"','"+this.sg1.cells(13,i)+"','-')");
													
								sql.add("insert into sju_polisbayar_d(no_bukti,kode_lokasi,no_bill,no_polis,nu,akun_piutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs,no_kashut,kode_vendor,ke)  "+
										"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_bill,no_polis,nu,akun_piutang,premi-diskon+p_cost+materai,0,0,'"+this.e_periode.getText()+"','D','TRM_PREMI',kode_curr,kurs,'-',kode_vendor,ke "+
										"from sju_polis_termin where nu='"+this.sg1.cells(9,i)+"' and no_bill='"+this.sg1.cells(1,i)+"' and no_polis='"+this.sg1.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
							
								if (this.c_jcurr.getText() == "CURR") this.nilaiSK += Math.round((nilaiToFloat(this.e_kurs.getText())-nilaiToFloat(this.sg1.cells(6,i))) * nilaiToFloat(this.sg1.cells(7,i)) *100)/100;					
							}
						}
					}					
																																					
					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var j = 200+i;
								var nilaiSlsIDR = Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;
								if (this.sg.cells(2,i).toUpperCase() == "D") slsJurnal += nilaiSlsIDR;
								else slsJurnal -= nilaiSlsIDR;
								
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(5,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiSlsIDR+","+nilaiToFloat(this.sg.cells(4,i))+",'"+this.sg.cells(3,i)+"','"+this.modul+"','SLS','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.sg.cells(6,i)+"','-','"+this.sg.cells(8,i)+"','"+this.sg.cells(7,i)+"','-','-','"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','-')");						
							}
						}
					}	

					this.nilaiSK = Math.round(this.nilaiSK * 100)/100;					
					slsJurnal = Math.round((slsJurnal - this.nilaiSK) * 100)/100;					
					if (slsJurnal != 0.00) this.nilaiSK = this.nilaiSK - slsJurnal;					
					if (this.nilaiSK > 0) {		
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',666,'"+this.akunLSK+"','C',"+this.nilaiSK+","+this.nilaiSK+",'"+this.e_ket.getText()+"','"+this.modul+"','SKURS','IDR',1,'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");
					}
					if (this.nilaiSK < 0) {						
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',666,'"+this.akunRSK+"','D',"+Math.abs(this.nilaiSK)+","+Math.abs(this.nilaiSK)+",'"+this.e_ket.getText()+"','"+this.modul+"','SKURS','IDR',1,'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");				
					}
					

					sql.add("insert into sju_ttd (no_bukti,kode_lokasi,nik_buat,nik_periksa,nik_fiat,nik_oto) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.cb_periksa.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_otorisasi.getText()+"')");

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
					this.stsSimpan = 1;				
					setTipeButton(tbSimpan);
					this.bLoad.show();
					this.c_jenis.setSQL("select distinct a.no_dokumen, a.nama from sju_dokumen a "+
								"inner join sju_dokumen_form b on a.no_dokumen=b.no_dokumen and b.kode_form = 'SJ023' "+
								"inner join sju_dokumen_pp c on a.no_dokumen=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+
								"inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
								"where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"' ",["a.no_dokumen","a.nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);						
					this.cb_cust.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
				break;
			case "simpan" :														
			case "ubah" :														
				if (this.e_kurs.getText() == "0") {
					system.alert(this,"Transaksi tidak valid.","Nilai Kurs tidak boleh nol.");
					return false;						
				}
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();								
				
				if (nilaiToFloat(this.e_beban.getText()) != nilaiToFloat(this.e_sls.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Selisih tidak sesuai dengan Total Jurnal Selisih.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Penerimaan tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					 system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}					
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from sju_polisbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) this.doClick();				
	},	
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
			if (this.stsSimpan == 1) this.doClick();

			var data = this.dbLib.getDataProvider("select kurs from sju_kurs where kode_curr ='"+this.c_curr.getText()+"' and tanggal='"+this.dp_d1.getDateString()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));											
			}

			var data = this.dbLib.getDataProvider("select modul from sju_dokumen where no_dokumen='"+this.c_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];							
				if (line != undefined) {
					this.modul = line.modul;
					if (line.modul == "KB") this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
					else this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('034') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);

					if (this.modul!="KB") this.c_status.setText("NON");
				}											
			}

			var data = this.dbLib.getDataProvider("select top 1 kode_akun from sju_dokakun where no_dokumen='"+this.c_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];							
				if (line != undefined) {
					this.cb_akun.setText(line.kode_akun);					
				}											
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
			var beban = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_saldo.getText())
			this.e_beban.setText(floatToNilai(Math.round(beban * 100)/100));				
		}		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);
				this.sg.clear(1);
				this.bLoad.show();
			}
			this.stsSimpan = 1;			
			this.c_jenis.setSQL("select distinct a.no_dokumen, a.nama from sju_dokumen a "+
								"inner join sju_dokumen_form b on a.no_dokumen=b.no_dokumen and b.kode_form = 'SJ023' "+
								"inner join sju_dokumen_pp c on a.no_dokumen=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+
								"inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
								"where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"' ",["a.no_dokumen","a.nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);						
			this.cb_cust.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
			
			var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%"+this.c_jenis.getText().substr(2,3);
			var data = this.dbLib.getDataProvider("select isnull(max(no_bukti),0) as no_bukti from trans_m where no_bukti like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_bukti == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
					else {
						var idx = parseFloat(line.no_bukti.substr(8,3)) + 1;
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
	doNilaiChange1: function(){
		try{			
			var saldo = 0;			
			for (var i = 0; i < this.sg1.getRowCount();i++) {
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
				var polis = this.dataPolis.get(sender.cells(5,row));
				if (polis) {
					sender.cells(6,row,polis);
					var strSQL = "select a.kode_pp,b.kode_vendor,a.kode_cust,a.kode_tipe,a.kode_pic "+
								 "from sju_polis_m a inner join sju_polis_vendor b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.status='LEADER' "+
								 "where a.no_polis = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(6,row,line.kode_pp);
							sender.cells(7,row,line.kode_vendor);	
							sender.cells(8,row,line.kode_cust);
							sender.cells(9,row,line.kode_tipe);
							sender.cells(10,row,line.kode_pic);																										
						}
					}	
				}
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"No Register "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
					sender.cells(7,row,"");
					sender.cells(8,row,"");
					sender.cells(9,row,"");
					sender.cells(10,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
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
					this.standarLib.showListData(this, "Daftar Register",sender,undefined, 
							"select no_polis, kode_pp  from sju_polis_m where kode_lokasi = '"+this.app._lokasi+"' and no_polis in ("+this.noReg+")",
							"select count(*)  from sju_polis_m where kode_lokasi = '"+this.app._lokasi+"' and no_polis in ("+this.noReg+")",
							["no_polis","kode_pp"],"and",["No Register","Segmen"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_sju16_rptKbRincianPremi";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
							this.dataPolis = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataPolis.set(line.no_polis, line.kode_pp);										
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
			this.bLoad.show();
			this.stsSimpan=1;				
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);		
			this.c_jenis.setSQL("select distinct a.no_dokumen, a.nama from sju_dokumen a "+
								"inner join sju_dokumen_form b on a.no_dokumen=b.no_dokumen and b.kode_form = 'SJ023' "+
								"inner join sju_dokumen_pp c on a.no_dokumen=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+
								"inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
								"where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"' ",["a.no_dokumen","a.nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);						
			this.cb_cust.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);	
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_curr,round(a.nilai1,0) as nilai1 "+
		             "from trans_m a "+
					 "inner join karyawan_pp q on a.kode_pp=q.kode_pp and a.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
					 "left join (select distinct no_bukti,kode_lokasi from sju_polisbayar_d where no_kashut<>'-' and kode_lokasi='"+this.app._lokasi+"') d on a.no_bukti=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
					 "where d.no_bukti is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'TRM_PREMI' and a.posted ='F'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,line.kode_curr,floatToNilai(line.nilai1)]); 
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
				this.bLoad.hide();
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
						
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.modul = line.modul;		
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setSQL("select no_dokumen, nama from sju_dokumen where no_dokumen='"+line.param3+"' and kode_lokasi='"+this.app._lokasi+"'",["no_dokumen","nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);
						
						this.c_jenis.setText(line.param3);					
						this.c_status.setText(line.param2);					
						this.c_jcurr.setText(line.nik3);	
						this.e_dok.setText(line.no_ref2);											
						this.e_ket.setText(line.keterangan);
						this.e_bank.setText(line.no_ref1);	
						this.cb_akun.setText(line.param1);				
						
						this.c_curr.setText(line.kode_curr);										
						this.e_kurs.setText(floatToNilai(line.kurs));				
						this.e_total.setText(floatToNilai(line.nilai1));														
						this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_cust='"+line.no_ref3+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);														
						this.cb_cust.setText(line.no_ref3);
					}
				}

				var strSQL = "select * from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
										
						this.cb_buat.setText(line.nik_buat);
						this.cb_periksa.setText(line.nik_periksa);
						this.cb_fiat.setText(line.nik_fiat);
						this.cb_otorisasi.setText(line.nik_oto);
						
					}
				}
				
				var strSQL = "select a.nu,a.kode_lokasi,a.no_bill,a.no_polis,a.keterangan,a.akun_piutang,a.kode_curr,a.kurs,round(a.total-isnull(b.bayar,0),2) as saldo,round((a.total-isnull(b.bayar,0)) * a.kurs,2) as saldo_idr, "+
			             "   a.kode_pp,a.kode_vendor,a.kode_tipe,a.kode_pic "+
						 "from ( "+
						
						 "select a.nu,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan,a.akun_piutang,a.kurs, "+
						 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as total,aa.kode_pp,bb.kode_vendor,aa.kode_tipe,aa.kode_pic  "+ 
						 "from sju_polis_termin a "+
						 "		inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
						 "		inner join sju_polis_vendor bb on aa.no_polis=bb.no_polis and aa.kode_lokasi=bb.kode_lokasi and bb.status='LEADER' "+
						 "where aa.kode_cust='"+this.cb_cust.getText()+"' and (a.premi-a.diskon+a.p_cost+a.materai)>0  and a.kode_lokasi='"+this.app._lokasi+"' and no_bill <> '-' "+
						 "group by a.nu,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok,aa.no_dok2,a.akun_piutang,a.kurs, "+
						 "		  aa.kode_pp,bb.kode_vendor,aa.kode_tipe,aa.kode_pic "+
						 ")a  "+
						
						 "inner join sju_polisbayar_d c on a.nu=c.nu and a.no_bill=c.no_bill and a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+						 
						 
						 "left join ( "+
						 "    select nu,no_bill,no_polis,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						 "    from sju_polisbayar_d where no_bukti<>'"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by nu,no_bill,no_polis,kode_lokasi) b "+
						 "on a.nu=b.nu and a.no_bill=b.no_bill and a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						
						 "where c.no_bukti='"+this.e_nb.getText()+"' and c.kode_lokasi ='"+this.app._lokasi+"'  order by a.no_polis,a.nu";


				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData(["BAYAR",line.no_bill,line.no_polis,line.keterangan,line.akun_piutang,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.saldo),floatToNilai(line.saldo_idr),line.nu,  line.kode_pp,line.kode_vendor,line.kode_tipe,line.kode_pic]);
					}
				} else this.sg1.clear(1);		

				this.noReg = "";
				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai_curr,a.kode_pp,a.no_dokumen,a.kode_pp,kode_vendor,kode_cust,no_ref1,no_ref2 "+
							 "from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							 
							 "where a.jenis = 'SLS' and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						 //colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","No Register","Segmen","Penanggung","Tertanggung","COB","PIC"],
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),line.no_dokumen, line.kode_pp,line.kode_vendor,line.kode_cust,line.no_ref1,line.no_ref2]);
						this.noReg += ",'"+line.no_dokumen+"'";
					}
				}
				this.sg.validasi();	

				this.noReg = this.noReg.substr(1);	

				var sql = new server_util_arrayList();
				sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("select no_polis,kode_pp from sju_polis_m where no_polis in ("+this.noReg+") and kode_lokasi = '"+this.app._lokasi+"'");			
				this.dbLib.getMultiDataProviderA(sql);

			}						
		} catch(e) {alert(e);}
	}
});