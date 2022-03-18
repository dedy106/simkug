window.app_saku3_transaksi_siaga_fVer4 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fVer4.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fVer4";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Permintaan Bayar [BYMHD]", 0);	
		//budget di rra otomatis
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Verifikasi", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Daftar Pengajuan","Verifikasi","Pencarian"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:14,tag:0,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Due Date","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Verifikasi","Tgl Input","Kode PP","Jenis"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[50,50,110,100,150,100,400,100,150,70,70,80,100,80]],
					colHide:[[12],[true]],					
					readOnly:true,colFormat:[[8],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[370,11,200,20],caption:"No Ver", readOnly:true,visible:true});						
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,12,995,308], childPage:["Data Pengajuan","Item Mata Anggaran","KPA Anggaran","BYMHD  ","File Dok"]});		
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});
		this.e_nobukti = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Pengajuan",maxLength:30,readOnly:true}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[270,11,100,18],caption:"Tgl Pengajuan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[370,11,98,18],readOnly:true}); 				
		this.e_modul = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Modul",maxLength:30,readOnly:true}); 	
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Desk. Peruntukan", maxLength:150});				
		this.e_atensi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Atensi", maxLength:150});				
		this.c_curr = new saiCB(this.pc1.childPage[0],{bound:[20,20,160,20],caption:"Mt Uang - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc1.childPage[0],{bound:[190,20,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});
		this.e_nilaiCurr = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,20,200,20],caption:"Nilai Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai Curr","Nilai IDR"],
					colWidth:[[5,4,3,2,1,0],[120,120,400,50,150,80]],					
					columnReadOnly:[true,[1],[0,2,3,4,5]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 					
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,100,500,100]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.cb_bymhd = new saiCBBL(this.pc1.childPage[3],{bound:[20,17,220,20],caption:"Akun BYMHD", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.e_ju = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"No Bukti", readOnly:true,visible:true,tag:9});						
		this.cb_buat2 = new saiCBBL(this.pc1.childPage[3],{bound:[20,17,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:9});		
		this.cb_app2 = new saiCBBL(this.pc1.childPage[3],{bound:[20,21,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:9});
		
		this.sg1mp2 = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-4,this.pc1.height-35],colCount:4,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3,pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            	

		this.c_modul2 = new saiCB(this.pc2.childPage[2],{bound:[20,11,200,20],caption:"Modul",items:["PBAJU","PJPTG","BMHD"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_nb = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"No Pengajuan", multiSelection:false, maxLength:20, tag:9,change:[this,"doChange"]});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
												
			this.flagAkunKB = "0"; this.flagGarFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('JUAKUNKB','GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "JUAKUNKB") this.flagAkunKB = line.flag;
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
				}
			}						
			this.cb_pp.setSQL("select kode_pp, nama from pp where  tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");
			this.c_modul2.setText("");

			this.cb_bymhd.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='004' "+
								 "where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			this.cb_buat2.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app2.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fVer4.extend(window.childForm);
window.app_saku3_transaksi_siaga_fVer4.implement({
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doLoad:function(sender){			
		var strSQL = "select a.tanggal as due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,'PBAJU' as modul,b.kode_pp+' - '+b.nama as pp,"+
					 "a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_ver as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,a.modul as jenis "+
					 "from gr_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.modul in ('AJU','PJAJU','PJAJUBMHD', 'BYRBMHD','PBADK','PBCOD','PJAJULOG','GAJI','SPJ','KES','KLAIM') and periode >= '201601' and a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"'  "+
					 
					 "union all "+

					 "select a.tanggal as due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,'BMHD' as modul,b.kode_pp+' - '+b.nama as pp,"+
					 "a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_ver as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,a.modul as jenis "+
					 "from gr_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.modul = 'BMHD' and periode >= '201601' and a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"'  "+
					 
					 "union all "+
					 
					 "select a.tanggal as due_date,a.no_ptg as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PJPTG' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_ver as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,'PTG' as jenis "+
					 "from gr_panjarptg_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               		inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where periode >= '201601' and a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"'  "+
					 
					 "order by no_pb";
				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
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
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg3.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_app,line.tglinput,line.kode_pp,line.jenis.toUpperCase()]); 
		}
		this.sg.setNoUrut(start);
		//this.page3 = 0;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
		//this.page3 = page - 1;
	},	
	
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[1]);											
				
				//var baris = (this.page3 * 20) + row; 
				var baris = row;
				
				if (this.sg3.cells(2,row) == "RETURN") this.c_status.setText(this.sg3.cells(2,baris));								
				else this.c_status.setText("APPROVE");								
				
				this.e_nobukti.setText(this.sg3.cells(1,baris));	
				this.e_modul.setText(this.sg3.cells(0,baris));
				this.noAppLama = this.sg3.cells(10,baris);						
				this.kodePPBukti = this.sg3.cells(12,baris);
				this.e_memo.setText(this.sg3.cells(7,baris));	
				this.nilaiCurrLama = nilaiToFloat(this.sg3.cells(8,baris));							
								
				if (this.e_modul.getText() == "PBAJU" || this.e_modul.getText() == "BMHD") 
					var strSQL = "select * from gr_pb_m where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";		
				
				if (this.e_modul.getText() == "PJPTG") 
					var strSQL = "select a.periode,a.tanggal,a.no_dokumen,a.keterangan,'-' as atensi,a.kode_pp,a.nik_buat,a.nik_app as nik_tahu,a.kode_curr,a.kurs,a.no_ver,'PJPTG' as modul "+
								 "from gr_panjarptg_m a "+
								 "where a.no_ptg='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.periodeAju = line.periode;
						this.dp_d2.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.e_atensi.setText(line.atensi);
						this.cb_pp.setText(line.kode_pp);					
						this.cb_buat.setText(line.nik_buat);					
						this.cb_app.setText(line.nik_tahu);					
						this.c_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
						
						this.noVerLama = line.no_ver;	
						
						if (this.e_modul.getText() == "PBAJU" || this.e_modul.getText() == "BMHD" || this.e_modul.getText() == "PJPTG") {
							//untuk yg NON PANJAR -- (bukan PJAJU,PJLOG,PJBMHD)							
							this.modulForm = line.modul.toUpperCase();
							if (this.modulForm == "AJU") this.modulForm = "PBAJU";
							
							//utk yg pbaju dari modul bayarbmhd---> ganti jadi PBAJU
							if (this.modulForm == "BYRBMHD") this.modulForm = "PBAJU";

							//untuk yg PANJAR -- (PJAJU,PJLOG,PJBMHD)	
							this.akunPJ = line.ref1;
						}							
					} 
				}		
				
				if (this.e_modul.getText() == "PBAJU" || this.e_modul.getText() == "BMHD") 
					var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr "+
								 "from gr_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_pb = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
				
				if (this.e_modul.getText() == "PJPTG") 
					var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr "+
								 "from gr_panjarptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.jenis = 'BEBAN' and a.no_ptg = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();
				
				this.doHitungGar();	

				this.sg1mp2.clear();
				var strSQLdok = "select b.kode_jenis,b.nama,a.no_gambar,a.nu "+
								"from gr_pb_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+								
								"where a.no_pb = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu ";				
				var data = this.dbLib.getDataProvider(strSQLdok,true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1mp2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													 
						this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
					}
				} else this.sg1mp2.clear(1);
				
				if (this.sg3.cells(2,baris) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;

					var data = this.dbLib.getDataProvider("select no_ju,ref1,nik_buat,nik_setuju from ju_m where no_dokumen='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.cb_bymhd.setText(line.ref1);					
							this.e_ju.setText(line.no_ju);		
							this.cb_buat2.setText(line.nik_buat);										
							this.cb_app2.setText(line.nik_setuju);										
						} 
						else {							
							this.cb_bymhd.setText("");					
							this.e_ju.setText("");
							this.cb_buat2.setText("");										
							this.cb_app2.setText("");										
						}
					}
				}			
			}
		} catch(e) {alert(e);}
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					sql.add("delete from angg_r where modul='R-AJU' and no_bukti ='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_beban_m where no_beban ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_beban_j where no_beban ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where modul='VER' and no_bukti ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from anggaran_m where no_agg ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from anggaran_d where no_agg ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_m where no_pdrk ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_d where no_pdrk ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");

					if (this.noVerLama != "-") {
						sql.add("delete from ju_m where no_dokumen ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BYMHD'");
						sql.add("delete from ju_j where no_dokumen ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BYMHD'");
						sql.add("delete from gr_bmhd_d where no_dokumen ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BYMHD'");
					}


					if (this.c_status.getText() == "RETURN") {
						var vStatus = "V"; 		
					}
					else {
						var vStatus = "2";
					}


					sql.add("update gr_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='VER' and modul='"+this.e_modul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("insert into gr_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+this.e_modul.getText()+"','VER','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
					

					if (this.e_modul.getText() == "PBAJU" || this.e_modul.getText() == "BMHD")
						sql.add("update gr_pb_m set no_ver='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "PJPTG") 
						sql.add("update gr_panjarptg_m set no_ver='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_ptg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
						
					if (this.c_status.getText() == "APPROVE") {			
						//------------------------------------------------------- bymhd ------------------------------------------------------- 
						if (this.cb_bymhd.getText() != "") {
							//nilai pph jangan di jurnal / dikeluarkan
							var strSQL = "select kode_akun from flag_relasi where kode_flag = '015' and kode_lokasi='"+this.app._lokasi+"'";			
							var dataTmp = this.dbLib.getDataProvider(strSQL,true);
							if (typeof dataTmp == "object" && dataTmp.rs.rows[0] != undefined){
								this.dataPPH = dataTmp;
							}	

							var nilaiPPHCurr = nilaiPPH = 0;
							for (var i=0; i < this.sg.getRowCount();i++){								
								for (var j=0;j < this.dataPPH.rs.rows.length;j++){
									if (this.sg.cells(0,i) == this.dataPPH.rs.rows[j].kode_akun) {
										nilaiPPHCurr = nilaiToFloat(this.sg.cells(4,i));
										nilaiPPH = nilaiToFloat(this.sg.cells(5,i));
										
										//tandai row yg akun pph
										this.sg.cells(1,i,"FLAG-PPH");
									}
								}								
							}


							this.periodeAju = this.e_periode.getText();	

							//jurnal ke JU untuk BMHD adalah tanpa PPH (bruto)
							var nilaiBrutoCurr = nilaiToFloat(this.e_nilaiCurr.getText()) + nilaiPPHCurr;
							var nilaiBruto = nilaiToFloat(this.e_nilai.getText()) + nilaiPPH;
							sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
									"('"+this.e_ju.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','-','BYMHD','BYMHD','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+nilaiBrutoCurr+",'"+this.cb_buat2.getText()+"','"+this.cb_app2.getText()+"','F','-','-','"+this.cb_bymhd.getText()+"',getdate(),'"+this.app._userLog+"')");
							
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_ju.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_bymhd.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiBruto+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','BYMHD','BYMHD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
							
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){		
									//kalo akunnya bukan akun PPH,, boleh di insert
									if (this.sg.cells(1,i) != "FLAG-PPH") {
										sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
												"('"+this.e_ju.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(5,i))+",'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','BYMHD','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");									
									}
								}
							}	
							
							if (this.e_modul.getText() == "BMHD") {
								//yg masuk bruto nya tanpa pph
								sql.add("insert into gr_bmhd_d(no_bukti,no_bmhd,no_dokumen,akun_hutang,keterangan,dc,nilai,kode_pp,kode_lokasi,modul,jenis,periode,kode_curr,kurs) values "+
										"('"+this.e_ju.getText()+"','"+this.e_ju.getText()+"','"+this.e_nb.getText()+"','"+this.cb_bymhd.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiBruto+",'"+this.app._kodePP+"','"+this.app._lokasi+"','BYMHD','AKRU','"+this.e_periode.getText()+"','IDR',1)");
							}
						}
						
						//------------------------------------------------------ reverse budget ---------------------------------------------------
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
								"select no_bukti,'R-AJU',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,case dc when 'D' then 'C' else 'D' end,saldo,nilai "+
								"from angg_r where no_bukti ='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						

						//-------------------------------------------------- kasb untuk lanjut pembayaran -----------------------------------------						
						if (this.e_modul.getText() == "BMHD") var vProg = "Z";
						else var vProg = "0";

						sql.add("insert into gr_beban_m(no_beban,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,nik_buat,nik_app,atensi,kode_curr,kurs,nilai,nilai_curr,periode,nik_user,tgl_input,no_kas,progress,modul,no_spb) values "+
						     	"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_atensi.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilaiCurr.getText())+",'"+this.periodeAju+"','"+this.app._userLog+"',getdate(),'-','"+vProg+"','"+this.e_modul.getText()+"','-')");							
												 
						if (this.modulForm == "PBAJU" || this.modulForm == "PBADK" || this.modulForm == "PJPTG" || this.modulForm == "KES" || this.modulForm == "KLAIM" || this.modulForm == "SPJ" || this.modulForm == "GAJI") {
							//PBAJU, PBAJU yang di-BMHD-kan
							if (this.sg.getRowValidCount() > 0){
								for (var i=0;i < this.sg.getRowCount();i++){
									if (this.sg.rowValid(i)){		
										if (this.cb_bymhd.getText() == "") {																		
											sql.add("insert into gr_beban_j(no_beban,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
													"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.modulForm+"','BEBAN','"+this.periodeAju+"','"+this.app._userLog+"',getdate())");																	
										}
										else {		
											if (this.sg.cells(1,i) != "FLAG-PPH") {																	
												sql.add("insert into gr_beban_j(no_beban,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
														"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.cb_bymhd.getText()+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.modulForm+"','BEBAN','"+this.periodeAju+"','"+this.app._userLog+"',getdate())");
											}
											else {
												sql.add("insert into gr_beban_j(no_beban,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
														"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.modulForm+"','BEBAN','"+this.periodeAju+"','"+this.app._userLog+"',getdate())");
											}
										}
									}
								}
							}
						}						

						if (this.modulForm == "PJAJU" || this.modulForm == "PJAJULOG" || this.modulForm == "PJAJUBMHD") {
							//untuk transaksi panjar akunnya pakai akun PANJAR - BUKAN akun budget
							sql.add("insert into gr_beban_j(no_beban,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPJ+"','"+this.e_ket.getText()+"','D','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_nilaiCurr.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.modulForm+"','BEBAN','"+this.periodeAju+"','"+this.app._userLog+"',getdate())");									
						}
						

						//------------------------------------------------------ serap budget ---------------------------------------------------
						if (this.sg2.getRowValidCount() > 0){
							for (var i=0;i < this.sg2.getRowCount();i++){
								if (this.sg2.rowValid(i)){
									if (nilaiToFloat(this.sg2.cells(3,i)) > 0) {
										var DC = "D"; 
										var nilai = nilaiToFloat(this.sg2.cells(3,i));
									} else {
										var DC = "C";
										var nilai = nilaiToFloat(this.sg2.cells(3,i)) * -1;
									}
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','VER','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.periodeAju+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+")");									
								}
							}
						}					
					}

					//------------------------------------------------------ RRA otomatis ---------------------------------------------------
					//insert pdrk, anggaran_d [budget periode keep dipindah ke budget periode verifikasi]
					if (this.periodeAju != this.e_periode.getText()) {
						sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress,modul) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','RRA "+this.e_ket.getText()+"','"+this.app._kodePP+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"','RR-OTO','-','"+this.app._userLog+"',getdate(),'0','MULTI')");
						sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) "+
								"select '"+this.e_nb.getText()+"',kode_lokasi,0,kode_akun,kode_pp,kode_drk,periode1,0,nilai,'C','-' "+
								"from angg_r "+
								"where no_bukti ='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D' ");					
						sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) "+
								"select '"+this.e_nb.getText()+"',kode_lokasi,0,kode_akun,kode_pp,kode_drk,'"+this.e_periode.getText()+"',0,nilai,'D','-' "+
								"from angg_r "+
								"where no_bukti ='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D' ");
						
						sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','RRA - "+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.app._userLog+"','RR-OTO')");										
						sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) "+		
								"select '"+this.e_nb.getText()+"',kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,1,periode,nilai,nilai,dc,'-','"+this.app._userLog+"',getdate(),'RRA-OTO' "+
								"from rra_pdrk_d "+
								"where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
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
					this.sg.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_curr.setText("IDR");
					this.doLoad();
				break;
			case "simpan" :	
			case "ubah" :						
				
				if (this.cb_bymhd.getText()!="") {
					this.cb_bymhd.setTag("1");
					this.e_ju.setTag("1");
					this.cb_buat2.setTag("1");
					this.cb_app2.setTag("1");

					var data = this.dbLib.getDataProvider("select posted from ju_m where no_ju ='"+this.e_ju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.posted == "T") {
								system.alert(this,"Transaksi sudah diposting.","Lakukan Unposting untuk bukti BYMHD.");
								return false;
							}
						} 
					}

				}
				else {
					this.cb_bymhd.setTag("9");
					this.e_ju.setTag("9");
					this.cb_buat2.setTag("9");
					this.cb_app2.setTag("9");
				}
				if (this.e_modul.getText() == "BMHD" && this.cb_bymhd.getText() == "") {
					system.alert(this,"Transaksi tidak valid.","Data BYMHD harus dilengkapi untuk Modul BMHD.");
					return false;	
				}

				this.preView = "1";							
				this.sg.validasi();
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}
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
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
							var line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.sg2.cells(0,i)) {		
								if (nilaiToFloat(this.sg2.cells(3,i))>0 && nilaiToFloat(this.sg2.cells(2,i)) < nilaiToFloat(this.sg2.cells(3,i))) {
									var k =i+1;
									system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
									return false;						
								}							
							}
						}
					}
				}
				
				if (this.flagAkunKB == "1") {
					this.dataJU = {rs:{rows:[]}};				
					var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataJU = data;
					} 						
					var k=0;
					for (var j=0;j < this.sg.getRowCount();j++){
						if (this.sg.rowValid(j)){
							for (var i=0;i<this.dataJU.rs.rows.length;i++){
								line = this.dataJU.rs.rows[i];
								if (line.kode_akun == this.sg.cells(0,j)) {		
									k = j+1;
									system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak diperkenankan.[Baris : "+k+"]");
									return false;						
								}
							}													
						}
					}
				}	
				/*
				if (nilaiToFloat(this.e_nilaiCurr.getText()) > this.nilaiCurrLama) {
					system.alert(this,"Transaksi tidak valid.","Nilai Verifikasi tidak boleh melebihi Pengajuan.");
					return false;						
				}
				*/																						
				if (this.e_modul.getText() != "PJPTG") {
					if (nilaiToFloat(this.e_nilaiCurr.getText()) <= 0 || nilaiToFloat(this.e_nilai.getText()) <= 0) {
						system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
						return false;						
					}
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				if (this.e_ju.getText()!="") {
					var data = this.dbLib.getDataProvider("select posted from ju_m where no_ju ='"+this.e_ju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.posted == "T") {
								system.alert(this,"Transaksi sudah diposting.","Lakukan Unposting untuk bukti BYMHD.");
								return false;
							}
						} 
					}
				}
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from angg_r where modul='R-AJU' and no_bukti ='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_beban_m where no_beban ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_beban_j where no_beban ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where modul='VER' and no_bukti ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from anggaran_m where no_agg ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from anggaran_d where no_agg ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_m where no_pdrk ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_d where no_pdrk ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");

					if (this.noVerLama != "-") {
						sql.add("delete from ju_m where no_dokumen ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BYMHD'");
						sql.add("delete from ju_j where no_dokumen ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BYMHD'");
						sql.add("delete from gr_bmhd_d where no_dokumen ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BYMHD'");
					}
					sql.add("delete from gr_app_m where no_app='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.e_modul.getText() == "PBAJU" || this.e_modul.getText() == "BMHD")
						sql.add("update gr_pb_m set no_ver='-',progress='1' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "PJPTG") 
						sql.add("update gr_panjarptg_m set no_ver='-',progress='1' where no_ptg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12){
				this.e_periode.setText(y+""+m);
				if (m=="01") this.Aperiode = "A";
				if (m=="02") this.Aperiode = "B";
				if (m=="03") this.Aperiode = "C";
				if (m=="04") this.Aperiode = "D";
				if (m=="05") this.Aperiode = "E";
				if (m=="06") this.Aperiode = "F";
				if (m=="07") this.Aperiode = "G";
				if (m=="08") this.Aperiode = "H";
				if (m=="09") this.Aperiode = "I";
				if (m=="10") this.Aperiode = "J";
				if (m=="11") this.Aperiode = "K";
				if (m=="12") this.Aperiode = "L";			
			}
			else {
				this.e_periode.setText(this.app._periode);		
				if (m=="13") this.Aperiode = "M";			
				if (m=="14") this.Aperiode = "N";			
				if (m=="15") this.Aperiode = "O";			
				if (m=="16") this.Aperiode = "P";						
			}	
			
			if (this.stsSimpan == 1){
				this.doLoad();
				this.doClick();
			}
			
			this.doChange(this.c_curr);
		}
		catch(e) {
			alert(e);
		}
	},	
	doChange:function(sender){		
		
		if (sender == this.cb_pp && this.cb_pp.getText()!="")
			this.cb_buat.setSQL("select nik, nama from karyawan where  kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.validasi();
			}
			else {
				var strSQL = "select kurs from gr_kurs where kode_curr ='"+this.c_curr.getText()+"' and ('"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir) ";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));
					else this.e_kurs.setText("0");					
				}
				this.e_kurs.setReadOnly(false); this.sg.validasi();
			}
		}
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}
		if (sender == this.c_modul2) {
			if (this.c_modul2.getText() == "PBAJU" || this.c_modul2.getText() == "BMHD" || this.c_modul2.getText() == "BYRBMHD") 
				this.cb_nb.setSQL("select no_pb, keterangan from gr_pb_m where modul <> 'AJU2' and periode<='"+this.e_periode.getText()+"' and progress in ('2','V','1') and kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);								
			
			if (this.c_modul2.getText() == "PJPTG") 
				this.cb_nb.setSQL("select no_ptg, keterangan from gr_panjarptg_m where periode<='"+this.e_periode.getText()+"' and progress in ('2','V','1')  and kode_lokasi='"+this.app._lokasi+"'",["no_ptg","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);				
		}
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			if (this.c_modul2.getText() == "PBAJU" || this.c_modul2.getText() == "BMHD") {
				var strSQL = "select a.tanggal as due_date,a.no_pb as no_bukti,case a.progress when '1' then 'INPROG' when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,'"+this.c_modul2.getText()+"' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_ver as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,a.modul as jenis "+
							 "from gr_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 //"				 inner join gr_beban_m d on a.no_ver=d.no_beban and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_pb='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('1','2','V') ";	//d.modul='"+this.c_modul2.getText()+"' and			
			}
			if (this.c_modul2.getText() == "PJPTG") {
				var strSQL = "select a.tanggal as due_date,a.no_ptg as no_bukti,case a.progress when '1' then 'INPROG' when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PJPTG' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_ver as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,'PTG' as jenis "+
							 "from gr_panjarptg_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               		inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 //"				 		inner join gr_beban_m d on a.no_ver=d.no_beban and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_ptg='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('1','2','V') ";				
			}		

				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);
										
			this.pc2.setActivePage(this.pc2.childPage[0]);				
		}

		if (sender == this.cb_bymhd && this.stsSimpan == 1) {
			if (this.cb_bymhd.getText() != "") {
				var AddFormat = "/"+this.Aperiode+"/MEMO/"+this.e_periode.getText().substr(2,2);					
				var data = this.dbLib.getDataProvider("select isnull(max(no_ju),0) as no_ju from ju_m where no_ju like '___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_ju == "0") this.e_ju.setText("001"+AddFormat);
						else {
							var idx = parseFloat(line.no_ju.substr(0,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;
							this.e_ju.setText(nu+AddFormat);						
						}
					} 
				}
			}
			else {
				this.e_ju.setText("");
			}
		}
	},	
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/";			
				
				//var data = this.dbLib.getDataProvider("select isnull(max(substring(no_beban,5,20)),0) as no_beban from gr_beban_m where no_beban like '_______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);

				var data = this.dbLib.getDataProvider("select isnull(max(substring(no_app,5,20)),0) as no_beban from gr_app_m where no_app like '_______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_beban == "0") this.e_nb.setText("KASB001"+AddFormat+this.cb_pp.getText());
						else {
							var idx = parseFloat(line.no_beban.substr(0,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;
							this.e_nb.setText("KASB"+nu+AddFormat+this.cb_pp.getText());
						}
					} 
				}

				if (this.cb_bymhd.getText() != "") {
					var AddFormat = "/"+this.Aperiode+"/MEMO/"+this.e_periode.getText().substr(2,2);					
					var data = this.dbLib.getDataProvider("select isnull(max(no_ju),0) as no_ju from ju_m where no_ju like '___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.no_ju == "0") this.e_ju.setText("001"+AddFormat);
							else {
								var idx = parseFloat(line.no_ju.substr(0,3)) + 1;
								idx = idx.toString();
								if (idx.length == 1) var nu = "00"+idx;
								if (idx.length == 2) var nu = "0"+idx;
								if (idx.length == 3) var nu = idx;
								this.e_ju.setText(nu+AddFormat);						
							}
						} 
					}
				}
				else {
					this.e_ju.setText("");
				}
				
				this.e_memo.setFocus();	
			}		
		}
		catch(e) {
			alert(e);
		}	
	},
	doChangeCell: function(sender, col, row){		
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "" && this.e_kurs.getText() != "") {				
				this.sg.cells(5,row,Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,row))));
				this.sg.validasi();			
			}
		}
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
		sender.onChange.set(this,"doChangeCell");			
	},	
	doNilaiChange: function(){
		try{
			var totCurr = tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg.cells(5,i,floatToNilai(Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,i)))));					
					if (this.sg.cells(2,i).toUpperCase() == "D") {
						totCurr += nilaiToFloat(this.sg.cells(4,i));
						tot += nilaiToFloat(this.sg.cells(5,i));
					}
					if (this.sg.cells(2,i).toUpperCase() == "C") {
						totCurr -= nilaiToFloat(this.sg.cells(4,i));
						tot -= nilaiToFloat(this.sg.cells(5,i));
					}									
				}
			}			
			this.e_nilaiCurr.setText(floatToNilai(totCurr));
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg.cells(2,row,"D");
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(2,i) != "-"){				
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(5,i));
				else nilai = nilaiToFloat(this.sg.cells(5,i)) * -1;				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}
		
		
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.periodeAju == this.e_periode.getText())
				var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.e_nobukti.getText()+"') as gar ",true);
			else 
				var data = this.dbLib.getDataProvider("select fn_cekagg9('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.e_nobukti.getText()+"') as gar ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(2,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sls));
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
								this.nama_report="server_report_saku3_siaga_rptBuktiBeban";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_beban='"+this.e_nb.getText()+"' ";
								this.filter2 = this.app._namaUser;
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
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.c_curr.setText("IDR");
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.doLoad();
		} catch(e) {
			alert(e);
		}
	}
});