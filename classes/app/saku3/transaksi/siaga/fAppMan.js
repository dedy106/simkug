window.app_saku3_transaksi_siaga_fAppMan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fAppMan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fAppMan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Manager", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Verifikasi", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Daftar Pengajuan","Verifikasi","Pencarian"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:13,tag:0,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Due Date","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Verifikasi","Tgl Input","Kode PP"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[50,110,100,150,100,400,100,150,70,70,80,100,80]],
					colHide:[[12],[true]],					
					readOnly:true,colFormat:[[8],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,12,995,308], childPage:["Data Pengajuan","Item Mata Anggaran","KPA Anggaran","File Dok"]});		
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP",readOnly:true, tag:2,change:[this,"doChange"]});						
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Pembuat",readOnly:true, tag:2});		
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"NIK Mengetahui",readOnly:true, tag:2});
		this.e_nobukti = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Pengajuan",readOnly:true}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Pengajuan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18]}); 				
		this.e_modul = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Modul",readOnly:true}); 	
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"No Dokumen",readOnly:true, maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Desk. Peruntukan",readOnly:true, maxLength:150});				
		this.e_atensi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Atensi", maxLength:150,readOnly:true});				
		this.c_curr = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,160,20],caption:"Mt Uang - Kurs", tag:1, readOnly:true, text:"IDR",change:[this,"doChange"]});		
		this.e_kurs = new saiLabelEdit(this.pc1.childPage[0],{bound:[190,20,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});
		this.e_nilaiCurr = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Nilai Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,220,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai Curr","Nilai IDR"],
					colWidth:[[5,4,3,2,1,0],[120,120,400,50,150,80]],					
					readOnly:true,
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,100,500,100]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.sg1mp2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-4,this.pc1.height-35],colCount:4,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3,pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            

		this.c_modul2 = new saiCB(this.pc2.childPage[2],{bound:[20,11,200,20],caption:"Modul",items:["PBAJU","PJPTG","BMHD","BYRBMHD"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_nb = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);
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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
								
			this.cb_pp.setSQL("select kode_pp, nama from pp where tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.c_curr.setText("IDR");
			this.c_modul2.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fAppMan.extend(window.childForm);
window.app_saku3_transaksi_siaga_fAppMan.implement({
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doLihat: function(sender){
		try{
			if (sender == this.bLihat) {
				if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
			}
			if (sender == this.bLihat2) {
				if (this.e_file2.getText() != "" || this.e_file2.getText() != "-") window.open("server/media/"+this.e_file2.getText());
			}			
			if (sender == this.bLihat3) {
				if (this.e_file3.getText() != "" || this.e_file3.getText() != "-") window.open("server/media/"+this.e_file3.getText());
			}
			if (sender == this.bLihat4) {
				if (this.e_file4.getText() != "" || this.e_file4.getText() != "-") window.open("server/media/"+this.e_file4.getText());
			}
			if (sender == this.bLihat5) {
				if (this.e_file5.getText() != "" || this.e_file5.getText() != "-") window.open("server/media/"+this.e_file5.getText());
			}
		}catch(e){
			alert(e);
		}
	},
	doLoad:function(sender){	
		//BEBAN, PJ AJU, PJAJUBMHD --> gr_pb_m
		//PJPTG         --> gr_panjarptg_m
				
		var strSQL = "select a.tanggal as due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,'PBAJU' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_app as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
					 "from gr_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.modul in ('AJU','PJAJU','PJAJUBMHD','BYRBMHD','PBADK','PBCOD','GAJI','SPJ','KES','KLAIM') and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0','V') and a.kode_lokasi='"+this.app._lokasi+"' "+
					 
					 "union all "+

					 "select a.tanggal as due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,'BMHD' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_app as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
					 "from gr_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.modul = 'BMHD' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0','V') and a.kode_lokasi='"+this.app._lokasi+"' "+
					 
					 "union all "+
					 
					 "select a.tanggal as due_date,a.no_ptg as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PJPTG' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_app as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
					 "from gr_panjarptg_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               		inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0','V') and a.kode_lokasi='"+this.app._lokasi+"' "+
					 
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
			this.sg3.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_app,line.tglinput,line.kode_pp]); 
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
					var strSQL = "select a.periode,a.tanggal,a.no_dokumen,a.keterangan,'-' as atensi,a.kode_pp,a.nik_buat,a.nik_app as nik_tahu,a.kode_curr,a.kurs,a.no_app "+
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
						
						this.noVerLama = line.no_app;						
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
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
													  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
													  "where a.no_bukti='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);

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
					
					if (this.c_status.getText() == "RETURN") {
						var vStatus = "M"; 		
					}
					else {
						var vStatus = "A";
					}
					sql.add("update gr_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='APPBUDGET' and modul='"+this.e_modul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("insert into gr_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+this.e_modul.getText()+"','APPBUDGET','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
					
					if (this.e_modul.getText() == "PBAJU" || this.e_modul.getText() == "BMHD")
						sql.add("update gr_pb_m set no_appman='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "PJPTG") 
						sql.add("update gr_panjarptg_m set no_appman='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_ptg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
															
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
				this.preView = "1";											
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_app_m where no_app='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					if (this.e_modul.getText() == "PBAJU" || this.e_modul.getText() == "BMHD")
						sql.add("update gr_pb_m set no_app='-',progress='0' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "PJPTG") 
						sql.add("update gr_panjarptg_m set no_app='-',progress='0' where no_ptg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
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
			if (this.c_modul2.getText() == "PBAJU" || this.c_modul2.getText() == "BMHD" ) 
				this.cb_nb.setSQL("select no_pb, keterangan from gr_pb_m where periode<='"+this.e_periode.getText()+"' and progress in ('0','R','1') and kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);				
			if (this.c_modul2.getText() == "PJPTG") 
				this.cb_nb.setSQL("select no_ptg, keterangan from gr_panjarptg_m where periode<='"+this.e_periode.getText()+"' and progress in ('0','R','1') and kode_lokasi='"+this.app._lokasi+"'",["no_ptg","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);				
		}
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			if (this.c_modul2.getText() == "PBAJU" || this.c_modul2.getText() == "BMHD") {
				var strSQL = "select a.tanggal as due_date,a.no_pb as no_bukti,case a.progress when '0' then 'INPROG' when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,'PBAJU' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_app as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from gr_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_pb='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('1','0','R') ";
			}		 
			if (this.c_modul2.getText() == "PJPTG") {
				var strSQL = "select a.tanggal as due_date,a.no_ptg as no_bukti,case a.progress when '0' then 'INPROG' when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'PJPTG' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai_curr as nilai,c.nik+' - '+c.nama as pembuat,a.no_app as no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
					 		 "from gr_panjarptg_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               		inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_ptg='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('1','0','R') ";
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
	},	
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {				
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_app_m","no_app",this.app._lokasi+"-GAR"+this.e_periode.getText().substr(2,2)+this.Aperiode+".","0000"));										
				this.e_memo.setFocus();	
			}		
		}
		catch(e) {
			alert(e);
		}	
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
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1" && this.c_status.getText() == "APPROVE" ) {	
								this.nama_report="server_report_saku3_siaga_rptBebanKpa";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='"+this.e_nb.getText()+"' ";
								this.filter2 = this.app._lokasi+"/"+this.e_periode.getText()+"/"+this.app._nikUser;;
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