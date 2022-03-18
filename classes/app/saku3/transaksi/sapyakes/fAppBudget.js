window.app_saku3_transaksi_sapyakes_fAppBudget = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sapyakes_fAppBudget.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fAppBudget";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting SAP", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.c_modul3 = new saiCB(this,{bound:[20,10,200,20],caption:"Modul",items:["IFAJU","DAKEM","DAKEMADM","SPPD","PH","RES","RPH","TPIU","DEPO","SHM","RD","SP", "BPJS","PJR","PTG"], tag:9,change:[this,"doChange"]});//log
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,407], childPage:["Daftar Bukti","Detail Bukti","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:0,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Due Date","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Approve","Tgl Input","Kode PP"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[50,110,100,150,100,400,100,150,70,70,80,100,80]],
					colHide:[[12],[true]],					
					readOnly:true,colFormat:[[8],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Bukti", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,12,450,20],caption:"No Dokumen", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,12,220,20],caption:"Total Pengajuan", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Modul", readOnly:true,change:[this,"doChange"]});				
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,450,20],caption:"PP/Unit", readOnly:true});				
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Tgl Bukti", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,450,20],caption:"Deskripsi", readOnly:true});					
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Due Date", readOnly:true});				
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,15,450,20],caption:"Pembuat", readOnly:true});
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,16,this.pc1.width-5,187],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","DC","Keterangan","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,300,60,150,80,150,80,150,80]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],colFormat:[[8],[cfNilai]],
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});					
				
		this.c_modul2 = new saiCB(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Modul",items:["IFAJU","DAKEM","DAKEMADM","SPPD","PH","RES","RPH","TPIU","IDEPO","BDEPO","CBDEP","KBDEP","TTPDEPO","KBDEPTP","BSHM","JSHM","DSHM","KBDSHM","KBJSHM","SPISHM","MIFEE","MIFEEFINAL",     "BRD","JRD","KBJRD","DRD","KBDRD",      "SPIRD","BSP","JSP","DSP", "KBJSP","KBDSP",  "BPJS","PJR","PTG"], readOnly:true,tag:9,change:[this,"doChange"]});
		
		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
				
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.c_modul2.setText("");
			this.c_modul3.setText("");
		
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_sapyakes_fAppBudget.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fAppBudget.implement({	
	doLoad:function(sender){
		if (this.c_modul3.getText() == "PTG")	{
			var strSQL = "select a.tanggal as due_date,a.no_ptg as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PTG' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_postsap as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from ptg_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_ptg=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_posting='"+this.app._userLog+"' ";						 
		}
		
		if (this.c_modul3.getText() == "PJR")	{
			var strSQL = "select a.tanggal as due_date,a.no_panjar as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PJR' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_kas as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_panjar=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_posting='"+this.app._userLog+"' ";						 
		}

		if (this.c_modul3.getText() == "BPJS")	{
			var strSQL = "select a.tanggal as due_date,a.no_bpjs as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BPJS' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from yk_bpjs_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_bpjs=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	//muncul glsap nya detail ,,, tidak boleh koreksi					
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";						 
		}

		if (this.c_modul3.getText() == "IFAJU")	{
			/* 
			<= 2017
			var strSQL = "select a.tanggal as due_date,a.no_aju as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'IFAJU' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from if_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 	 "                inner join karyawan c on a.user_input=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 	 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_aju=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
					 	 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						  "order by a.no_aju";
			*/
			var strSQL = "select a.tanggal as due_date,a.no_aju as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'IFAJU' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_postsap as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from if_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 	 "                inner join karyawan c on a.user_input=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 	 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_aju=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
					 	 "where a.periode>='201801' and a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						  "order by a.no_aju";
		}	
		if (this.c_modul3.getText() == "DAKEM")	{
			var strSQL = "select a.tanggal as due_date,a.no_dakem as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DAKEM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,f.nominal as nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from yk_dakem_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_dakem=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
						 "                inner join yk_dakem_d f on a.no_dakem=f.kdtrans and a.kode_lokasi=f.kode_lokasi "+
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
		}
		if (this.c_modul3.getText() == "DAKEMADM")	{
			var strSQL = "select a.tanggal as due_date,a.no_aju as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DAKEMADM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from yk_dakemadm_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 	 "                inner join karyawan c on a.user_input=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 	 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_aju=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
					 	 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
					 	 "order by a.no_aju";
		}
		if (this.c_modul3.getText() == "SPPD")	{
			var strSQL = "select a.tanggal as due_date,a.no_spj as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'SPPD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.transport+harian as nilai,c.nik+' - '+c.nama as pembuat,a.no_appsap as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from yk_spj_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik  "+
						 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' and no_doksap='-') z on a.no_spj=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
						 "where a.periode<='"+this.e_periode.getText()+"' and (a.modul+a.progress) in ('PDLOCALA','PDLOCAL22') and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_appsap='"+this.app._userLog+"' ";							 
		}		
		if (this.c_modul3.getText() == "PH")	{
			var strSQL = "select a.tanggal as due_date,a.no_hutang as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PH' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from yk_hutang_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_hutang=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	//muncul glsap nya detail ,,, tidak boleh koreksi					
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";						 
		}
		if (this.c_modul3.getText() == "RES")	{
			var strSQL = "select a.tanggal as due_date,a.no_reim as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'RES' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from if_reim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_reim=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+					
						 "where a.modul='RESTITUSI' and a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
		}
		if (this.c_modul3.getText() == "RPH")	{
			var strSQL = "select a.tanggal as due_date,a.no_rekon as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'RPH' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from yk_rekon_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rekon=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	//muncul glsap nya detail ,,, tidak boleh koreksi					
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
		}
		
		if (this.c_modul3.getText() == "TPIU")	{
			var strSQL = "select a.tanggal as due_date,a.no_terima as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'TPIU' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from takterima_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_terima=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 //muncul glsap nya detail ,,, tidak boleh koreksi					
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
		}
		if (this.c_modul3.getText() == "DEPO")	{
			var strSQL = "select a.tanggal as due_date,a.no_depo as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'IDEPO' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,d.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_depo2_m a inner join inv_shop_m d on a.no_shop=d.no_shop and a.kode_lokasi=d.kode_lokasi and d.posted='F' "+ 
						 "				  inner join pp b on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_depo=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and d.nik_sap='"+this.app._userLog+"' "+						 
						 "union all "+
						 "select a.tanggal as due_date,a.no_akru as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BDEPO' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_depoakru_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_akru=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' "+						 
						 "union all "+
						 "select a.tanggal as due_date,a.no_cair as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'CBDEP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_depocair_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_cair=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' "+
						 
						 "union all "+
						 "select a.tanggal as due_date,a.no_kas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDEP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.modul = 'KBDOCCAIR' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						 "select a.tanggal as due_date,a.no_tutup as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'TTPDEPO' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_depotutup_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_tutup=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.posted = 'F' and a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' "+
						 
						 "union all "+
						 
						 "select a.tanggal as due_date,a.no_kas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDEPTP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.modul = 'KBDOCTTP' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 " ";								 
		}							
		if (this.c_modul3.getText() == "SHM")	{
			var strSQL = "select a.tanggal as due_date,a.no_shmbeli as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_shmbeli_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_shmbeli=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						 
						 "select a.tanggal as due_date,a.no_shmjual as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'JSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai_piutang+a.nilai_piugl as nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_shmjual_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_shmjual=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						 
						 "select a.tanggal as due_date,a.no_shmdev as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_shmdev_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_shmdev=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						
						 "select a.tanggal as due_date,a.no_kas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.modul = 'KBSHMDEV' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						
						 "select a.tanggal as due_date,a.no_kas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBJSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.modul = 'KBSHMJUAL' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						
						 "select a.tanggal as due_date,a.no_spi as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'SPISHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_shmspi_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spi=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' "+

						 //discre
						 "union all "+
						
						 "select a.tanggal as due_date,a.no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'MIFEE' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_discre_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_bukti=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+

						 "union all "+
						
						 "select a.tanggal as due_date,a.no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'MIFEEFINAL' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai+a.ppn as nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_discrefinal_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_bukti=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+

						 //reklas akun
						 "union all "+
						 
						 "select a.tanggal as due_date,a.no_shmreklas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'REKLSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai as nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_shmreklas_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_shmreklas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+

						 
						 " ";						 						 
		}
		
		
		if (this.c_modul3.getText() == "RD")	{
			var strSQL = "select a.tanggal as due_date,a.no_rdbeli as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_rdbeli_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rdbeli=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
			
			
						 "select a.tanggal as due_date,a.no_rdjual as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'JRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai_piutang+a.nilai_piugl as nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_rdjual_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rdjual=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						 
						 "select a.tanggal as due_date,a.no_kas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBJRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.modul = 'KBRDJUAL' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						
						 "union all "+
						 
						 "select a.tanggal as due_date,a.no_rddev as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_rddev_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rddev=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						
						 "select a.tanggal as due_date,a.no_kas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.modul = 'KBRDDEV' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						
						 "union all "+
						
						 "select a.tanggal as due_date,a.no_spi as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'SPIRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_rdspi_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spi=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' "+
						 
						 
						 " ";						 						 
		}
		
		if (this.c_modul3.getText() == "SP")	{
			var strSQL =
						 "select a.tanggal as due_date,a.no_spbeli as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_spbeli_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spbeli=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+

						 "select a.tanggal as due_date,a.no_spjual as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'JSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai_piutang+a.nilai_piugl as nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_spjual_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spjual=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						 
						 "select a.tanggal as due_date,a.no_kas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBJSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.modul = 'KBSPJUAL' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+

						 "union all "+

						 "select a.tanggal as due_date,a.no_spdev as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_spdev_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spdev=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						 
						 "union all "+
						
						 "select a.tanggal as due_date,a.no_kas as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+	
						 "where a.modul = 'KBSPDEV' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' "+
						
						 "union all "+

						 "select a.tanggal as due_date,a.no_spi as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'SPISP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from inv_spspi_m a "+ 
						 "				  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spi=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+						
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' "+
						 
						 
						 " ";						 						 
		}
		
		this.e_nobukti.setText("");
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);								
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_app,line.tglinput,line.kode_pp]); 
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
			
			if (this.jmlGLSAP != this.jmlModul) {
				system.alert(this,"Jumlah Record Transaksi tidak valid.","Ditemukan duplikasi jurnal.");
				setTipeButton(tbAllFalse);	
				return false;			
			}
																
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																								
					if (this.c_status.getText() == "RETURN") {
						var vStatus = "C"; 
						var vPosted = "F";
					}
					else {
						var vStatus = "1";
						var vPosted = "T";	
					}
														
					sql.add("update sap_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='APPCAB' and modul='"+this.e_modul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into sap_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+this.e_modul.getText()+"','APPCAB','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
																				
					//---------------- flag bukti		
					if (this.e_modul.getText() == "PTG") sql.add("update ptg_m set no_postsap='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_ptg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					if (this.e_modul.getText() == "PJR") sql.add("update panjar2_m set no_kas='"+this.e_nb.getText()+"',progress='2' where no_panjar='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.e_modul.getText() == "BPJS") sql.add("update yk_bpjs_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_bpjs='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					//<=2017 if (this.e_modul.getText() == "IFAJU") sql.add("update if_aju_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "IFAJU") sql.add("update if_aju_m set no_postsap='"+this.e_nb.getText()+"',progress='2',posted='"+vPosted+"' where no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					if (this.e_modul.getText() == "DAKEM") sql.add("update yk_dakem_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_dakem='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "DAKEMADM") sql.add("update yk_dakemadm_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				

					if (this.e_modul.getText() == "SPPD") {
						sql.add("update yk_spj_m set no_appsap='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_spj='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PDLOCAL'");			
						sql.add("update yk_spj_m set no_appsap='"+this.e_nb.getText()+"',progress='3',posted='"+vPosted+"' where no_spj='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PDLOCAL2'");			
					}

					if (this.e_modul.getText() == "PH") sql.add("update yk_hutang_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_hutang='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "RES") sql.add("update if_reim_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_reim='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					if (this.e_modul.getText() == "RPH") sql.add("update yk_rekon_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_rekon='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.e_modul.getText() == "TPIU") {
						sql.add("update takterima_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_terima='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					if (this.e_modul.getText() == "IDEPO") {
						sql.add("update inv_depo2_m set progress='"+vStatus+"' where no_depo='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update a set  a.no_app='"+this.e_nb.getText()+"',a.progress='"+vStatus+"',a.posted='"+vPosted+"' "+						
								"from inv_shop_m a inner join inv_depo2_m b on a.no_shop=b.no_shop and a.kode_lokasi=b.kode_lokasi "+
								"where b.no_depo='"+this.e_nobukti.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ");						
						//sql.add("update inv_shop_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					}
					
					if (this.e_modul.getText() == "BDEPO") sql.add("update inv_depoakru_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_akru='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					if (this.e_modul.getText() == "CBDEP") sql.add("update inv_depocair_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_cair='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					if (this.e_modul.getText() == "KBDEP") sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',kode_bank='"+vStatus+"',posted='"+vPosted+"' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					if (this.e_modul.getText() == "TTPDEPO") sql.add("update inv_depotutup_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_tutup='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					if (this.e_modul.getText() == "KBDEPTP") sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',kode_bank='"+vStatus+"',posted='"+vPosted+"' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					
					if (this.e_modul.getText() == "BSHM") sql.add("update inv_shmbeli_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_shmbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "JSHM") sql.add("update inv_shmjual_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_shmjual='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "KBJSHM") sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',kode_bank='"+vStatus+"',posted='"+vPosted+"' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.e_modul.getText() == "DSHM") sql.add("update inv_shmdev_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_shmdev='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "KBDSHM") sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',kode_bank='"+vStatus+"',posted='"+vPosted+"' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.e_modul.getText() == "SPISHM") sql.add("update inv_shmspi_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_spi='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "MIFEE") sql.add("update inv_discre_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "MIFEEFINAL") sql.add("update inv_discrefinal_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.e_modul.getText() == "BRD") sql.add("update inv_rdbeli_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_rdbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					if (this.e_modul.getText() == "JRD") sql.add("update inv_rdjual_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_rdjual='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "KBJRD") sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',kode_bank='"+vStatus+"',posted='"+vPosted+"' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.e_modul.getText() == "DRD") sql.add("update inv_rddev_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_rddev='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "KBDRD") sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',kode_bank='"+vStatus+"',posted='"+vPosted+"' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "SPIRD") sql.add("update inv_rdspi_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_spi='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.e_modul.getText() == "BSP") sql.add("update inv_spbeli_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_spbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "JSP") sql.add("update inv_spjual_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_spjual='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "KBJSP") sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',kode_bank='"+vStatus+"',posted='"+vPosted+"' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					if (this.e_modul.getText() == "DSP") sql.add("update inv_spdev_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_spdev='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "KBDSP") sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',kode_bank='"+vStatus+"',posted='"+vPosted+"' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "SPISP") sql.add("update inv_spspi_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"',posted='"+vPosted+"' where no_spi='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					//if (this.e_modul.getText() == "PR") sql.add("update log_pesan_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_pesan='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg1.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
					this.c_modul3.setText("");
				break;
			case "simpan" :	
			case "ubah" :											
				this.preView = "1";					
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				} 
				else this.simpan();				
				
				break;				
				
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from sap_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				

				if (this.e_modul.getText() == "PTG") sql.add("update ptg_m set no_postsap='-',progress='0',posted='F' where no_ptg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				if (this.e_modul.getText() == "PJR") sql.add("update panjar2_m set no_kas='-',progress='1' where no_panjar='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				if (this.e_modul.getText() == "BPJS") sql.add("update yk_bpjs_m set no_app='-',progress='0',posted='F' where no_bpjs='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				//<=2017 if (this.e_modul.getText() == "IFAJU") sql.add("update if_aju_m set no_app='-',progress='0',posted='F' where no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "IFAJU") sql.add("update if_aju_m set no_postsap='-',progress='1',posted='F' where no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				if (this.e_modul.getText() == "DAKEM") sql.add("update yk_dakem_m set no_app='-',progress='0',posted='F' where no_dakem='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "DAKEMADM") sql.add("update yk_dakemadm_m set no_app='-',progress='0',posted='F' where no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
				if (this.e_modul.getText() == "SPPD") {
					sql.add("update yk_spj_m set no_appsap='-',progress='A',posted='F' where no_spj='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PDLOCAL'");			
					sql.add("update yk_spj_m set no_appsap='-',progress='2',posted='F' where no_spj='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PDLOCAL2'");			
				}
				if (this.e_modul.getText() == "PH") sql.add("update yk_hutang_m set no_app='-',progress='0',posted='F' where no_hutang='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "RES") sql.add("update if_reim_m set no_app='-',progress='0',posted='F' where no_reim='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				if (this.e_modul.getText() == "RPH") sql.add("update yk_rekon_m set no_app='-',progress='0',posted='F' where no_rekon='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
				if (this.e_modul.getText() == "TPIU") sql.add("update takterima_m set no_app='-',progress='0',posted='F' where no_terima='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				
				
				if (this.e_modul.getText() == "IDEPO") {
					sql.add("update inv_depo2_m set progress='0' where no_depo='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					//sql.add("update inv_shop_m set no_app='-',progress='0',posted='F' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				
					sql.add("update a set  a.no_app='-',a.progress='0',a.posted='F' "+						
							"from inv_shop_m a inner join inv_depo2_m b on a.no_shop=b.no_shop and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_depo='"+this.e_nobukti.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ");						
								
				}
				if (this.e_modul.getText() == "BDEPO") sql.add("update inv_depoakru_m set no_app='-',progress='0',posted='F' where no_akru='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "CBDEP") sql.add("update inv_depocair_m set no_app='-',progress='0',posted='F' where no_cair='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				if (this.e_modul.getText() == "KBDEP") sql.add("update kas_m set no_link='-',kode_bank='0',posted='F' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				if (this.e_modul.getText() == "TTPDEPO") sql.add("update inv_depotutup_m set no_app='-',progress='0',posted='F' where no_tutup='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "KBDEPTP") sql.add("update kas_m set no_link='-',kode_bank='0',posted='F' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				
				if (this.e_modul.getText() == "BSHM") sql.add("update inv_shmbeli_m set no_app1='-',progress='0',posted='F' where no_shmbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "JSHM") sql.add("update inv_shmjual_m set no_app1='-',progress='0',posted='F' where no_shmjual='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "KBJSHM") sql.add("update kas_m set no_link='-',kode_bank='0',posted='F' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				if (this.e_modul.getText() == "DSHM") sql.add("update inv_shmdev_m set no_app1='-',progress='0',posted='F' where no_shmdev='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "KBDSHM") sql.add("update kas_m set no_link='-',kode_bank='0',posted='F' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "SPISHM") sql.add("update inv_shmspi_m set no_app1='-',progress='0',posted='F' where no_spi='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "MIFEE") sql.add("update inv_discre_m set no_app1='-',progress='0',posted='F' where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "MIFEEFINAL") sql.add("update inv_discrefinal_m set no_app1='-',progress='0',posted='F' where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				if (this.e_modul.getText() == "BRD") sql.add("update inv_rdbeli_m set no_app1='-',progress='0',posted='F' where no_rdbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				if (this.e_modul.getText() == "JRD") sql.add("update inv_rdjual_m set no_app1='-',progress='0',posted='F' where no_rdjual='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "KBJRD") sql.add("update kas_m set no_link='-',kode_bank='0',posted='F' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				if (this.e_modul.getText() == "DRD") sql.add("update inv_rddev_m set no_app1='-',progress='0',posted='F' where no_rddev='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "KBDRD") sql.add("update kas_m set no_link='-',kode_bank='0',posted='F' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "SPIRD") sql.add("update inv_rdspi_m set no_app1='-',progress='0',posted='F' where no_spi='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				

				if (this.e_modul.getText() == "SPISP") sql.add("update inv_spspi_m set no_app1='-',progress='0',posted='F' where no_spi='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "BSP") sql.add("update inv_spbeli_m set no_app1='-',progress='0',posted='F' where no_spbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "JSP") sql.add("update inv_spjual_m set no_app1='-',progress='0',posted='F' where no_spjual='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "KBJSP") sql.add("update kas_m set no_link='-',kode_bank='0',posted='F' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "DSP") sql.add("update inv_spdev_m set no_app1='-',progress='0',posted='F' where no_spdev='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "KBDSP") sql.add("update kas_m set no_link='-',kode_bank='0',posted='F' where no_kas='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				//if (this.e_modul.getText() == "PR") sql.add("update log_pesan_m set no_app='-',progress='0' where no_pesan='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
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
		if (sender == this.c_modul3 && this.c_modul3.getText() != "") {
			this.doLoad();	
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
			
		if ((sender == this.e_nilai || sender == this.e_nilaiVer) && this.e_nilai.getText()!="" && this.e_nilaiVer.getText()!="") {			
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_nilaiVer.getText())));
		}
				
		if (sender == this.c_modul2) {			
			if (this.c_modul2.getText() == "PTG") {
				var strSQL = "select distinct a.no_ptg, a.keterangan from ptg_m a inner join glsap b on a.no_ptg=b.no_bukti and b.no_doksap='-' "+
			                  "where a.nik_posting='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                  "      and a.progress = '1' and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_nb.setSQL(strSQL,["no_ptg","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}

			if (this.c_modul2.getText() == "PJR") {
				var strSQL = "select distinct a.no_panjar, a.keterangan from panjar2_m a inner join glsap b on a.no_panjar=b.no_dokumen and b.no_doksap='-' "+
			                  "where a.nik_posting='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                  "      and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_nb.setSQL(strSQL,["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}

			if (this.c_modul2.getText() == "BPJS") {
				var strSQL = "select distinct a.no_bpjs, a.keterangan from yk_bpjs_m a inner join glsap b on a.no_bpjs=b.no_dokumen and b.no_doksap='-' "+
			                  "where a.nik_setuju='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                  "      and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_nb.setSQL(strSQL,["no_bpjs","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}


			if (this.c_modul2.getText() == "IFAJU") {
				/* <=2017
				this.cb_nb.setSQL("select distinct a.no_aju, a.keterangan from if_aju_m a inner join glsap b on a.no_aju=b.no_bukti and b.no_doksap='-' "+
			                  "where a.nik_app='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                  "      and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",
							  ["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
				*/
				this.cb_nb.setSQL("select distinct a.no_aju, a.keterangan from if_aju_m a inner join glsap b on a.no_aju=b.no_bukti and b.no_doksap='-' "+
			                  "where a.nik_app='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                  "      and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' ",
							  ["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}

			if (this.c_modul2.getText() == "DAKEM") {
				this.cb_nb.setSQL("select distinct a.no_dakem, a.keterangan from yk_dakem_m a inner join glsap b on a.no_dakem=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
								  "		 and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",
								  ["no_dakem","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
				
			}
			if (this.c_modul2.getText() == "DAKEMADM") {
				this.cb_nb.setSQL("select distinct a.no_aju, a.keterangan from yk_dakemadm_m a inner join glsap b on a.no_aju=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
								  "and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",
								  ["no_aju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "SPPD") {
				var strSQL = "select distinct a.no_spj, a.keterangan from yk_spj_m a inner join glsap b on a.no_spj=b.no_bukti and b.no_doksap='-' "+
			                 "where a.nik_appsap='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                 "      and a.modul+a.progress in ('PDLOCAL1','PDLOCALC','PDLOCAL23','PDLOCAL2C') and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_nb.setSQL(strSQL,["no_spj","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "PH") {
				var strSQL = "select distinct a.no_hutang, a.keterangan from yk_hutang_m a inner join glsap b on a.no_hutang=b.no_dokumen and b.no_doksap='-' "+
			                  "where a.nik_setuju='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                  "      and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_nb.setSQL(strSQL,["no_hutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "RES") {
				this.cb_nb.setSQL("select distinct a.no_reim, a.keterangan from if_reim_m a inner join glsap b on a.no_reim=b.no_dokumen and b.no_doksap='-' "+
								  "where a.modul='RESTITUSI' and a.nik_app='"+this.app._userLog+"'  and a.periode='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",
								  ["no_reim","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}	
			if (this.c_modul2.getText() == "RPH") {
				var strSQL = "select distinct a.no_rekon, a.keterangan from yk_rekon_m a inner join glsap b on a.no_rekon=b.no_dokumen and b.no_doksap='-' "+
			                  "where a.nik_setuju='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                  "      and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'";	                  
				this.cb_nb.setSQL(strSQL,["no_rekon","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			if (this.c_modul2.getText() == "TPIU") {
				var strSQL = "select distinct a.no_terima, a.keterangan from takterima_m a inner join glsap b on a.no_terima=b.no_dokumen and b.no_doksap='-' "+
			                  "where a.nik_setuju='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
			                  "      and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'";              
			    this.cb_nb.setSQL(strSQL,["no_terima","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			if (this.c_modul2.getText() == "IDEPO") {
				var strSQL = "select distinct a.no_shop, a.keterangan from inv_shop_m a "+
							 "inner join inv_depo2_m c on a.no_shop=c.no_shop and a.kode_lokasi=c.kode_lokasi "+
							 "inner join glsap b on c.no_depo=b.no_bukti and b.no_doksap='-' "+							 
							 "where a.nik_sap='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'";
				this.cb_nb.setSQL(strSQL,["no_shop","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			if (this.c_modul2.getText() == "BDEPO") {
				this.cb_nb.setSQL("select  distinct a.no_akru, a.keterangan from inv_depoakru_m a inner join glsap b on a.no_akru=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_setuju='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_akru","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			if (this.c_modul2.getText() == "CBDEP") {
				this.cb_nb.setSQL("select  distinct a.no_cair, a.keterangan from inv_depocair_m a inner join glsap b on a.no_cair=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_setuju='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_cair","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			if (this.c_modul2.getText() == "KBDEP") {
				this.cb_nb.setSQL("select distinct a.no_kas, a.keterangan from kas_m a inner join glsap b on a.no_kas=b.no_bukti and b.no_doksap='-' "+
								  "where a.modul='KBDOCCAIR' and a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			if (this.c_modul2.getText() == "TTPDEPO") {
				this.cb_nb.setSQL("select  distinct a.no_tutup, a.keterangan from inv_depotutup_m a inner join glsap b on a.no_tutup=b.no_bukti and b.no_doksap='-' "+
								  "where a.posted='T' and a.nik_setuju='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_tutup","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "KBDEPTP") {
				this.cb_nb.setSQL("select distinct a.no_kas, a.keterangan from kas_m a inner join glsap b on a.no_kas=b.no_bukti and b.no_doksap='-' "+
								  "where a.modul='KBDOCTTP' and a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			
			
			
			if (this.c_modul2.getText() == "BSHM") {
				this.cb_nb.setSQL("select distinct a.no_shmbeli, a.keterangan from inv_shmbeli_m a inner join glsap b on a.no_shmbeli=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_shmbeli","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "JSHM") {
				this.cb_nb.setSQL("select distinct a.no_shmjual, a.keterangan from inv_shmjual_m a inner join glsap b on a.no_shmjual=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_shmjual","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "KBJSHM") {
				this.cb_nb.setSQL("select distinct a.no_kas, a.keterangan from kas_m a inner join glsap b on a.no_kas=b.no_bukti and b.no_doksap='-' "+
								  "where a.modul='KBSHMJUAL' and a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			if (this.c_modul2.getText() == "DSHM") {
				this.cb_nb.setSQL("select distinct a.no_shmdev, a.keterangan from inv_shmdev_m a inner join glsap b on a.no_shmdev=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_shmdev","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "KBDSHM") {
				this.cb_nb.setSQL("select distinct a.no_kas, a.keterangan from kas_m a inner join glsap b on a.no_kas=b.no_bukti and b.no_doksap='-' "+
								  "where a.modul='KBSHMDEV' and a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "SPISHM") {
				this.cb_nb.setSQL("select distinct a.no_spi, a.keterangan from inv_shmspi_m a inner join glsap b on a.no_spi=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_setuju='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_spi","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "MIFEE") {
				this.cb_nb.setSQL("select distinct a.no_bukti, a.keterangan from inv_discre_m a inner join glsap b on a.no_bukti=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "MIFEEFINAL") {
				this.cb_nb.setSQL("select distinct a.no_bukti, a.keterangan from inv_discrefinal_m a inner join glsap b on a.no_bukti=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			
			//belum
			if (this.c_modul2.getText() == "BRD") {
				this.cb_nb.setSQL("select distinct a.no_rdbeli, a.keterangan from inv_rdbeli_m a inner join glsap b on a.no_rdbeli=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_rdbeli","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "JRD") {
				this.cb_nb.setSQL("select distinct a.no_rdjual, a.keterangan from inv_rdjual_m a inner join glsap b on a.no_rdjual=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_rdjual","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}			
			if (this.c_modul2.getText() == "KBJRD") {
				this.cb_nb.setSQL("select distinct a.no_kas, a.keterangan from kas_m a inner join glsap b on a.no_kas=b.no_bukti and b.no_doksap='-' "+
								  "where a.modul='KBRDJUAL' and a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "DRD") {
				this.cb_nb.setSQL("select distinct a.no_rddev, a.keterangan from inv_rddev_m a inner join glsap b on a.no_rddev=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_rddev","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "KBDRD") {
				this.cb_nb.setSQL("select distinct a.no_kas, a.keterangan from kas_m a inner join glsap b on a.no_kas=b.no_bukti and b.no_doksap='-' "+
								  "where a.modul='KBRDDEV' and a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "SPIRD") {
				this.cb_nb.setSQL("select distinct a.no_spi, a.keterangan from inv_rdspi_m a inner join glsap b on a.no_spi=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_setuju='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_spi","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			
			
			
			if (this.c_modul2.getText() == "SPISP") {
				this.cb_nb.setSQL("select distinct a.no_spi, a.keterangan from inv_spspi_m a inner join glsap b on a.no_spi=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_setuju='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_spi","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "BSP") {
				this.cb_nb.setSQL("select distinct a.no_spbeli, a.keterangan from inv_spbeli_m a inner join glsap b on a.no_spbeli=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_spbeli","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}

			if (this.c_modul2.getText() == "JSP") {
				this.cb_nb.setSQL("select distinct a.no_spjual, a.keterangan from inv_spjual_m a inner join glsap b on a.no_spjual=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_spjual","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "KBJSP") {
				this.cb_nb.setSQL("select distinct a.no_kas, a.keterangan from kas_m a inner join glsap b on a.no_kas=b.no_bukti and b.no_doksap='-' "+
								  "where a.modul='KBSPJUAL' and a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "DSP") {
				this.cb_nb.setSQL("select distinct a.no_spdev, a.keterangan from inv_spdev_m a inner join glsap b on a.no_spdev=b.no_bukti and b.no_doksap='-' "+
								  "where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_spdev","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (this.c_modul2.getText() == "KBDSP") {
				this.cb_nb.setSQL("select distinct a.no_kas, a.keterangan from kas_m a inner join glsap b on a.no_kas=b.no_bukti and b.no_doksap='-' "+
								  "where a.modul='KBRDDEV' and a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_bank in ('1','C') and a.kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}

			
		}
		
		//load ke grid
		if (this.cb_nb && this.cb_nb.getText() != "") {
			if (this.c_modul2.getText() == "PTG") {
				var strSQL = "select a.tanggal as due_date,a.no_ptg as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PTG' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_postsap as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from ptg_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                 inner join (select distinct no_bukti  as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_ptg=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_ptg='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_posting='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}

			if (this.c_modul2.getText() == "PJR") {
				var strSQL = "select a.tanggal as due_date,a.no_panjar as no_bukti,case a.progress when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PJR' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_kas as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                 inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_panjar=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_panjar='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_posting='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}


			if (this.c_modul2.getText() == "BPJS") {
				var strSQL = "select a.tanggal as due_date,a.no_bpjs as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BPJS' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_bpjs_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_bpjs=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_bpjs='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}



			if (this.c_modul2.getText() == "IFAJU") {
				/*<=2017
				var strSQL = "select a.tanggal as due_date,a.no_aju as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'IFAJU' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from if_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.user_input=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_aju=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
							 "where a.no_aju='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				*/
				var strSQL = "select a.tanggal as due_date,a.no_aju as no_bukti,case a.progress when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'IFAJU' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_postsap as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from if_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.user_input=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_aju=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
							 "where a.no_aju='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}			
			if (this.c_modul2.getText() == "DAKEM") {
				var strSQL = "select a.tanggal as due_date,a.no_dakem as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DAKEM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,f.nominal as nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_dakem_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_dakem=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
							 "                inner join yk_dakem_d f on a.no_dakem=f.kdtrans and a.kode_lokasi=f.kode_lokasi "+
							 "where a.no_dakem='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "DAKEMADM") {
				var strSQL = "select a.tanggal as due_date,a.no_aju as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DAKEMADM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_dakemadm_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.user_input=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_aju=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
							 "where a.no_aju='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}	
			if (this.c_modul2.getText() == "SPPD") {
				var strSQL = "select a.tanggal as due_date,a.no_spj as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'SPPD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.transport+harian as nilai,c.nik+' - '+c.nama as pembuat,a.no_appsap as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_spj_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik "+
							 "                inner join (select distinct no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spj=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							 
							 "where a.no_spj='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_appsap='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
				
			if (this.c_modul2.getText() == "PH") {
				var strSQL = "select a.tanggal as due_date,a.no_hutang as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PH' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_hutang_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_hutang=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_hutang='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}	
			if (this.c_modul2.getText() == "RES") {
				var strSQL = "select a.tanggal as due_date,a.no_reim as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'RES' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from if_reim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_reim=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.modul='RESTITUSI' and a.no_reim='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}	
			if (this.c_modul2.getText() == "RPH") {
				var strSQL = "select a.tanggal as due_date,a.no_rekon as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'RPH' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_rekon_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rekon=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_rekon='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}	
	
			if (this.c_modul2.getText() == "TPIU") {
				var strSQL = "select a.tanggal as due_date,a.no_terima as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'TPIU' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from takterima_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_dokumen as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_terima=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_terima='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}	
			if (this.c_modul2.getText() == "IDEPO") {
				var strSQL = "select a.tanggal as due_date,a.no_depo as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'IDEPO' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,d.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_depo2_m a inner join inv_shop_m d on a.no_shop=d.no_shop and a.kode_lokasi=d.kode_lokasi "+
							 "				  inner join pp b on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_depo=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_shop='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and d.nik_sap='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}	
			if (this.c_modul2.getText() == "BDEPO") {
				var strSQL = "select a.tanggal as due_date,a.no_akru as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BDEPO' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_depoakru_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_akru=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_akru='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "CBDEP") {
				var strSQL = "select a.tanggal as due_date,a.no_cair as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'CBDEP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_depocair_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_cair=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_cair='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "KBDEP") {
				var strSQL = "select a.tanggal as due_date,a.no_kas as no_bukti,case a.kode_bank when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDEP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_kas='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "TTPDEPO") {
				var strSQL = "select a.tanggal as due_date,a.no_tutup as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'TTPDEPO' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,d.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_depotutup_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_tutup=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_tutup='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "KBDEPTP") {
				var strSQL = "select a.tanggal as due_date,a.no_kas as no_bukti,case a.kode_bank when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDEPTP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_kas='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			
			if (this.c_modul2.getText() == "BSHM") {
				var strSQL = "select a.tanggal as due_date,a.no_shmbeli as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_shmbeli_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_shmbeli=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_shmbeli='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "JSHM") {
				var strSQL = "select a.tanggal as due_date,a.no_shmjual as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'JSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai_piutang+a.nilai_piugl as nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_shmjual_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_shmjual=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_shmjual='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			
			if (this.c_modul2.getText() == "DSHM") {
				var strSQL = "select a.tanggal as due_date,a.no_shmdev as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_shmdev_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_shmdev=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_shmdev='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "KBDSHM") {
				var strSQL = "select a.tanggal as due_date,a.no_kas as no_bukti,case a.kode_bank when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_kas='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "KBJSHM") {
				var strSQL = "select a.tanggal as due_date,a.no_kas as no_bukti,case a.kode_bank when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBJSHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_kas='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}			
			if (this.c_modul2.getText() == "SPISHM") {
				var strSQL = "select a.tanggal as due_date,a.no_spi as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'SPISHM' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_shmspi_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spi=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_spi='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "MIFEE") {
				var strSQL = "select a.tanggal as due_date,a.no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'MIFEE' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_discre_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_bukti=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_bukti='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "MIFEEFINAL") {
				var strSQL = "select a.tanggal as due_date,a.no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'MIFEE' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_discrefinal_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_bukti=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_bukti='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}

			
			if (this.c_modul2.getText() == "BRD") {
				var strSQL = "select a.tanggal as due_date,a.no_rdbeli as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_rdbeli_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rdbeli=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_rdbeli='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "JRD") {
				var strSQL = "select a.tanggal as due_date,a.no_rdjual as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'JRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai_piutang+a.nilai_piugl as nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_rdjual_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rdjual=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_rdjual='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "KBJRD") {
				var strSQL = "select a.tanggal as due_date,a.no_kas as no_bukti,case a.kode_bank when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBJRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_kas='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			
			if (this.c_modul2.getText() == "DRD") {
				var strSQL = "select a.tanggal as due_date,a.no_rddev as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_rddev_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rddev=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_rddev='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "KBDRD") {
				var strSQL = "select a.tanggal as due_date,a.no_kas as no_bukti,case a.kode_bank when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_kas='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "SPIRD") {
				var strSQL = "select a.tanggal as due_date,a.no_spi as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'SPIRD' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_rdspi_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spi=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_spi='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			
			
			
			//sp
			if (this.c_modul2.getText() == "SPISP") {
				var strSQL = "select a.tanggal as due_date,a.no_spi as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'SPISP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_spspi_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spi=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_spi='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_setuju='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "BSP") {
				var strSQL = "select a.tanggal as due_date,a.no_spbeli as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'BSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_spbeli_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_spbeli=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_spbeli='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			
			
			if (this.c_modul2.getText() == "JSP") {
				var strSQL = "select a.tanggal as due_date,a.no_rdjual as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'JSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai_piutang+a.nilai_piugl as nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_spjual_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rdjual=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_spjual='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "KBJSP") {
				var strSQL = "select a.tanggal as due_date,a.no_kas as no_bukti,case a.kode_bank when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBJSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_kas='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			
			if (this.c_modul2.getText() == "DSP") {
				var strSQL = "select a.tanggal as due_date,a.no_rddev as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app1 as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from inv_spdev_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_rddev=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_spdev='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "KBDSP") {
				var strSQL = "select a.tanggal as due_date,a.no_kas as no_bukti,case a.kode_bank when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'KBDSP' as modul,b.kode_pp+' - '+b.nama as pp,z.no_doksap as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_link as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from kas_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "                inner join (select distinct no_bukti as no_bukti,kode_lokasi,no_doksap from glsap where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"') z on a.no_kas=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+							
							 "where a.no_kas='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_app='"+this.app._userLog+"' ";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}



			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sap_app_m","no_app",this.app._lokasi+"-APC"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				
				var baris = row;
				
				if (this.sg.cells(2,row) == "RETURN") this.c_status.setText(this.sg.cells(2,baris));								
				else this.c_status.setText("APPROVE");
												
				this.e_modul.setText(this.sg.cells(0,baris));
				this.e_nobukti.setText(this.sg.cells(1,baris));												
				this.e_tgl.setText(this.sg.cells(3,baris));
				this.e_duedate.setText(this.sg.cells(4,baris));
				this.e_pp.setText(this.sg.cells(5,baris));
				this.e_dok.setText(this.sg.cells(6,baris));
				this.e_ket.setText(this.sg.cells(7,baris));
				this.e_nilai.setText(this.sg.cells(8,baris));				
				this.e_buat.setText(this.sg.cells(9,baris));										
				this.noAppLama = this.sg.cells(10,baris);						
				this.kodePPBukti = this.sg.cells(12,baris);
				this.e_memo.setText(this.sg.cells(7,baris));	
				
				this.doLoadUsulJML(baris);
				this.doLoadUsulGLSAP(baris);
				
				if (this.sg.cells(2,baris) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					//if (this.e_modul.getText() == "IFAJU") setTipeButton(tbUbahHapus);
					//else 
					setTipeButton(tbUbah);
					this.stsSimpan = 0;
				}
				
				
				if (this.jmlGLSAP != this.jmlModul) {
					system.alert(this,"Jumlah Record Transaksi tidak valid.","Ditemukan duplikasi jurnal.");
					setTipeButton(tbAllFalse);				
				}
				
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
		} catch(e) {alert(e);}
	},		
	
	doLoadUsulGLSAP:function(row){
		var strSQL1 = "select a.kode_akun,isnull(b.nama,'-') as nama_akun,a.kode_pp,isnull(c.nama,'-') as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.dc,a.keterangan,a.nilai "+
					  "from glsap a left join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "				left join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					  "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
					  "where a.nilai <> 0 and a.kode_akun <> '11100110' and a.no_bukti like '"+this.e_nobukti.getText()+"%'  order by a.dc desc";//and a.kode_lokasi='"+this.app._lokasi+"'
	
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sg1.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai)]);
			}
		} else this.sg1.clear(1);
		this.jmlGLSAP = parseInt(i)+1;
	},
		
		
		
	doLoadUsulJML:function(row){
		if (this.sg.cells(0,row) == "PTG")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from ptg_j a "+						  
						  "where a.nilai <> 0 and a.no_ptg = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "PJR")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from panjar2_d a "+						  
						  "where a.jenis <> 'BEBAN' and a.nilai <> 0 and a.no_panjar = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}

		if (this.sg.cells(0,row) == "BPJS")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from yk_bpjs_j a "+						  
						  "where a.nilai <> 0 and a.no_bpjs = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}


		if (this.sg.cells(0,row) == "IFAJU") {
			var strSQL1 = "select count(*) as jml "+
						  "from if_aju_j a "+
						  "where a.nilai <> 0 and a.no_aju = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "DAKEM")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from yk_dakem_j a "+						  
						  "where a.nilai <> 0 and a.no_dakem = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "DAKEMADM") {
			var strSQL1 = "select  count(*) as jml "+
						  "from yk_dakemadm_j a "+
						  "where a.nilai <> 0 and a.no_aju = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "SPPD")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from yk_spj_j a "+						  
						  "where a.nilai <> 0 and a.no_spj = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "PH")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from yk_hutang_j a "+						  
						  "where a.nilai <> 0 and a.no_hutang = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "RES")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from if_reim_j a "+						  
						  "where a.nilai <> 0 and a.no_reim = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "RPH")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from yk_rekon_j a "+						  
						  "where a.nilai <> 0 and a.no_rekon = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		
		
		if (this.sg.cells(0,row) == "TPIU")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from takterima_j a "+						  
						  "where a.nilai <> 0 and a.no_terima = '"+this.e_nobukti.getText()+"'";
		}
		if (this.sg.cells(0,row) == "IDEPO")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from glsap a "+						  
						  "where a.nilai <> 0 and a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "BDEPO")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_depoakru_j a "+						  
						  "where a.nilai <> 0 and a.no_akru = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "CBDEP")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_depocair_j a "+						  
						  "where a.nilai <> 0 and a.no_cair = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "KBDEP")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from kas_j a "+						  
						  "where a.nilai <> 0 and a.no_kas = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "TTPDEPO")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_depotutup_j a "+						  
						  "where a.nilai <> 0 and a.no_tutup = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "KBDEPTP")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from kas_j a "+						  
						  "where a.nilai <> 0 and a.no_kas = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		
		
		if (this.sg.cells(0,row) == "BSHM")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_shmbeli_j a "+				  
						  "where a.nilai <> 0 and a.no_shmbeli = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "JSHM")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_shmjual_j a "+				  
						  "where a.nilai <> 0 and a.no_shmjual = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		
		if (this.sg.cells(0,row) == "DSHM")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_shmdev_j a "+				  
						  "where a.nilai <> 0 and a.no_shmdev = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}	
		if (this.sg.cells(0,row) == "KBDSHM")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from kas_j a "+					  
						  "where a.nilai <> 0 and a.no_kas = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "KBJSHM")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from kas_j a "+ 
						  "where a.nilai <> 0 and a.no_kas = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "SPISHM")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_shmspi_j a "+  
						  "where a.nilai <> 0 and a.no_spi = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "MIFEE")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_discre_j a "+  
						  "where a.nilai <> 0 and a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "MIFEEFINAL")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_discrefinal_j a "+  
						  "where a.nilai <> 0 and a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}

		
		if (this.sg.cells(0,row) == "BRD")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_rdbeli_j a "+	  
						  "where a.nilai <> 0 and a.no_rdbeli = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "JRD")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_rdjual_j a "+
						  "where a.nilai <> 0 and a.no_rdjual = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "KBJRD")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from kas_j a "+
						  "where a.nilai <> 0 and a.no_kas = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "DRD")	{
			var strSQL1 = "select count(*) as jml "+
						  "from inv_rddev_j a "+				  
						  "where a.nilai <> 0 and a.no_rddev = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}	
		if (this.sg.cells(0,row) == "KBDRD")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from kas_j a "+						  
						  "where a.nilai <> 0 and a.no_kas = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "SPIRD")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_rdspi_j a "+				  
						  "where a.nilai <> 0 and a.no_spi = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		
		if (this.sg.cells(0,row) == "SPISP")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_spspi_j a "+				  
						  "where a.nilai <> 0 and a.no_spi = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}

		if (this.sg.cells(0,row) == "BSP")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_spbeli_j a "+				  
						  "where a.nilai <> 0 and a.no_spbeli = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}

		if (this.sg.cells(0,row) == "JSP")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from inv_spjual_j a "+
						  "where a.nilai <> 0 and a.no_spjual = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "KBJSP")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from kas_j a "+
						  "where a.nilai <> 0 and a.no_kas = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		if (this.sg.cells(0,row) == "DSP")	{
			var strSQL1 = "select count(*) as jml "+
						  "from inv_spdev_j a "+				  
						  "where a.nilai <> 0 and a.no_spdev = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}	
		if (this.sg.cells(0,row) == "KBDSP")	{
			var strSQL1 = "select  count(*) as jml "+
						  "from kas_j a "+						  
						  "where a.nilai <> 0 and a.no_kas = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		}

		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){													
				this.jmlModul = parseInt(line.jml);											
			}
		}															
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
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
								
								//posting SAP
								if (this.c_status.getText() == "APPROVE") {
									/* sap mati tgl 30 agustus 2021

									if (this.e_modul.getText() == "PTG") this.app.services.postSAP(this.e_nobukti.getText(),"PTG", function(data){ alert(data); });
									
									//if (this.e_modul.getText() == "PJR") this.app.services.postSAP(this.e_nobukti.getText(),"PJR", function(data){ alert(data); });
									//panjar pakai PH,, krn pake akun temporary
									if (this.e_modul.getText() == "PJR") this.app.services.postSAP(this.e_nobukti.getText(),"PH", function(data){ alert(data); });

									if (this.e_modul.getText() == "BPJS") this.app.services.postSAP(this.e_nobukti.getText(),"BPJS", function(data){ alert(data); });

									if (this.e_modul.getText() == "IFAJU") this.app.services.postSAP(this.e_nobukti.getText(),"IFAJU", function(data){ alert(data); });
									if (this.e_modul.getText() == "DAKEM") this.app.services.postSAP(this.e_nobukti.getText(),"DAKEM", function(data){ alert(data); });
									if (this.e_modul.getText() == "DAKEMADM") this.app.services.postSAP(this.e_nobukti.getText(),"DAKEMADM", function(data){ alert(data); });
									
									if (this.e_modul.getText() == "SPPD") this.app.services.postSAP(this.e_nobukti.getText(),"SPPD", function(data){ alert(data); });
									
									if (this.e_modul.getText() == "PH") this.app.services.postSAP(this.e_nobukti.getText(),"PH", function(data){ alert(data); });
									if (this.e_modul.getText() == "RES") this.app.services.postSAP(this.e_nobukti.getText(),"RESTITUSI", function(data){ alert(data); });
									if (this.e_modul.getText() == "RPH") this.app.services.postSAP(this.e_nobukti.getText(),"PH", function(data){ alert(data); });
									
									if (this.e_modul.getText() == "TPIU") this.app.services.postSAP(this.e_nobukti.getText(),"PH", function(data){ alert(data); });
									
									if (this.e_modul.getText() == "IDEPO") this.app.services.postSAP(this.e_nobukti.getText(),"IDEPO", function(data){ alert(data); });
									if (this.e_modul.getText() == "BDEPO") this.app.services.postSAP(this.e_nobukti.getText(),"BDEPO", function(data){ alert(data); });
									if (this.e_modul.getText() == "CBDEP") this.app.services.postSAP(this.e_nobukti.getText(),"CBDEP", function(data){ alert(data); });
									if (this.e_modul.getText() == "KBDEP") this.app.services.postSAP(this.e_nobukti.getText(),"KBDEP", function(data){ alert(data); });
									if (this.e_modul.getText() == "TTPDEPO") this.app.services.postSAP(this.e_nobukti.getText(),"TTPDEPO", function(data){ alert(data); });
									if (this.e_modul.getText() == "KBDEPTP") this.app.services.postSAP(this.e_nobukti.getText(),"KBDEP", function(data){ alert(data); });
									
									if (this.e_modul.getText() == "BSHM") this.app.services.postSAP(this.e_nobukti.getText(),"BSHM", function(data){ alert(data); });
									if (this.e_modul.getText() == "JSHM") this.app.services.postSAP(this.e_nobukti.getText(),"JSHM", function(data){ alert(data); });
									if (this.e_modul.getText() == "DSHM") this.app.services.postSAP(this.e_nobukti.getText(),"DSHM", function(data){ alert(data); });									
									if (this.e_modul.getText() == "KBDSHM") this.app.services.postSAP(this.e_nobukti.getText(),"KBDSHM", function(data){ alert(data); });
									if (this.e_modul.getText() == "KBJSHM") this.app.services.postSAP(this.e_nobukti.getText(),"KBJSHM", function(data){ alert(data); });
									if (this.e_modul.getText() == "SPISHM") this.app.services.postSAP(this.e_nobukti.getText(),"SPISHM", function(data){ alert(data); });
									if (this.e_modul.getText() == "MIFEE") this.app.services.postSAP(this.e_nobukti.getText(),"MIFEE", function(data){ alert(data); });
									if (this.e_modul.getText() == "MIFEEFINAL") this.app.services.postSAP(this.e_nobukti.getText(),"MIFEEFINAL", function(data){ alert(data); });
									
									if (this.e_modul.getText() == "BRD") this.app.services.postSAP(this.e_nobukti.getText(),"BRD", function(data){ alert(data); });									
									if (this.e_modul.getText() == "JRD") this.app.services.postSAP(this.e_nobukti.getText(),"JRD", function(data){ alert(data); });
									if (this.e_modul.getText() == "KBJRD") this.app.services.postSAP(this.e_nobukti.getText(),"KBJRD", function(data){ alert(data); });									
									if (this.e_modul.getText() == "DRD") this.app.services.postSAP(this.e_nobukti.getText(),"DRD", function(data){ alert(data); });
									if (this.e_modul.getText() == "KBDRD") this.app.services.postSAP(this.e_nobukti.getText(),"KBDRD", function(data){ alert(data); });
									if (this.e_modul.getText() == "SPIRD") this.app.services.postSAP(this.e_nobukti.getText(),"SPIRD", function(data){ alert(data); });
									
									if (this.e_modul.getText() == "BSP") this.app.services.postSAP(this.e_nobukti.getText(),"BSP", function(data){ alert(data); });								
									if (this.e_modul.getText() == "JSP") this.app.services.postSAP(this.e_nobukti.getText(),"JSP", function(data){ alert(data); });
									if (this.e_modul.getText() == "KBJSP") this.app.services.postSAP(this.e_nobukti.getText(),"KBJSP", function(data){ alert(data); });									
									if (this.e_modul.getText() == "DSP") this.app.services.postSAP(this.e_nobukti.getText(),"DSP", function(data){ alert(data); });
									if (this.e_modul.getText() == "KBDSP") this.app.services.postSAP(this.e_nobukti.getText(),"KBDSP", function(data){ alert(data); });
									if (this.e_modul.getText() == "SPISP") this.app.services.postSAP(this.e_nobukti.getText(),"SPISP", function(data){ alert(data); });
									
									*/

								}
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
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
			var modul = this.c_modul3.getText();
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg1.clear(1); 
			this.doClick();

			this.c_modul3.setText("");
			this.c_modul3.setText(modul);
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});

