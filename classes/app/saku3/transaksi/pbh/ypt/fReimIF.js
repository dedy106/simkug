window.app_saku3_transaksi_pbh_ypt_fReimIF = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_pbh_ypt_fReimIF.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_pbh_ypt_fReimIF";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reimburse Imprest Fund", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1200,430], childPage:["Transaksi","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Reimburse","Tanggal","Deskripsi","Nilai","Progress","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,120,100,300,80,100]],
					colFormat:[[3,5],[cfNilai,cfButton]],			
					readOnly:true, click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Status",items:["REIMBURSE","CLOSE"], readOnly:true,tag:2});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Pemegang IF",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[990,14,200,20],caption:"Debet", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 										
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[990,13,200,20],caption:"Kredit", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});					
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[990,16,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,1195,259], childPage:["Item Reimburse","Budget","File Dok","Otorisasi & Bank","Cattn Verf."]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode MTA","Nama MTA","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,250,50,200,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
					colTitle:["Kode Akun","Kode PP","Kode DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],
					readOnly:true,colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});
		
		this.e_norek = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,18,550,20],caption:"NoRek Penerima", maxLength:50});
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,550,20],caption:"Nama Rekenening", maxLength:50});		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,550,20],caption:"Bank - Cabang", maxLength:100});

		this.cb_tahu = new saiCBBL(this.pc1.childPage[3],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc1.childPage[3],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								
		this.cb_ver = new saiCBBL(this.pc1.childPage[3],{bound:[20,14,220,20],caption:"NIK Verifikator", multiSelection:false, maxLength:10, tag:2});						

		this.sgctt = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
			colTitle:["Catatan"],
			colWidth:[[0],[100]],					
			readOnly:true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);			
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
					
			this.cb_app.setSQL("select nik, nama from karyawan where kode_pp ='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_pp ='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTIF','NIKVER') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "HUTIF") this.akunHutIF = line.flag;		
					if (line.kode_spro == "NIKVER") this.cb_ver.setText(line.flag);							
				}
			}
			
			this.isiCBnik();
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_pp.setText(this.app._kodePP);

			var sql = new server_util_arrayList();			
			sql.add("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ 
					"       inner join karyawan_pp d on c.kode_pp = d.kode_pp and c.kode_lokasi=d.kode_lokasi and d.nik='"+this.cb_nik.getText()+"' "+
					"where b.kode_flag in ('062') and a.kode_lokasi='"+this.app._lokasi+"' ");							
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);			
			
			this.cb_tahu.setText(this.app._userLog);

			this.doLoadCtt(this.e_nb.getText());
			this.doLoad3();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_pbh_ypt_fReimIF.extend(window.childForm);
window.app_saku3_transaksi_pbh_ypt_fReimIF.implement({	
	isiCBnik: function() {
		this.cb_nik.setSQL("select a.nik, a.nama from karyawan a "+
						   "inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						   "inner join kas_m c on b.no_kas=c.no_kas and c.kode_lokasi=b.kode_lokasi and c.periode<='"+this.e_periode.getText()+"' "+
						   "where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
		this.cb_nik.setText(this.app._userLog);			
	},
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
					"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},		
	doHitungGar: function(){
		try {
			this.sg2.clear();
			var nilai = total = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != "0") {				
					if (this.sg1.cells(2,i) == "D") nilai = nilaiToFloat(this.sg1.cells(4,i));
					else nilai = nilaiToFloat(this.sg1.cells(4,i)) * -1;		

					var isAda = false;
					var idx = total = 0;
					for (var j=0;j < this.sg2.getRowCount();j++){
						if (this.sg1.cells(0,i) == this.sg2.cells(0,j) && this.sg1.cells(5,i) == this.sg2.cells(1,j) && this.sg1.cells(7,i) == this.sg2.cells(2,j) ) {
							isAda = true;
							idx = j;
							break;
						}
					}
					if (!isAda) {
						this.sg2.appendData([this.sg1.cells(0,i),this.sg1.cells(5,i),this.sg1.cells(7,i),"0",floatToNilai(nilai),"0"]);
					} 
					else { 
						total = nilaiToFloat(this.sg2.cells(4,idx));
						total = total + nilai;
						this.sg2.setCell(4,idx,total);
					}
				}
			}
			
			var sls = 0;
			for (var i=0;i < this.sg2.getRowCount();i++){				
				var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");					
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					this.sg2.cells(3,i,floatToNilai(sls));
					sls = sls - nilaiToFloat(this.sg2.cells(4,i));
					this.sg2.cells(5,i,floatToNilai(sls));
				}
			}
		}
		catch(e) {
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if (this.stsSimpan == 0) {
						sql.add("delete from pbh_pb_m where no_pb ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from pbh_pb_j where no_pb ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from pbh_dok where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  ");
						sql.add("delete from pbh_rek where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from hutang_m where no_hutang ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  ");
						sql.add("delete from hutang_j where no_hutang ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  ");
						sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  ");

						sql.add("update if_nik set no_flag='-',flag_aktif='1' where no_kas='"+this.noIFCair+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					//posted = 'X', menunggu verifikasi utk bisa dapat di posting
					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.noIFCair+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.c_status.getText()+"','"+this.cb_nik.getText()+"','IDR',1,'"+this.cb_app.getText()+"','"+this.app._kodePP+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunHutIF+"','X',0,'IFREIM','-')");									

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"','IDR',1,"+parseNilai(this.sg1.cells(4,i))+","+parseNilai(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','"+this.app._lokasi+"','IFREIM','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
							}
						}
					}

					if (this.c_status.getText() == "REIMBURSE") {
						sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.akunHutIF+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','IFREIM','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");						
						sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final,posted,kode_proyek,no_app2,no_app3,no_fiat,no_kas,akun_hutang,nik_ver) values  "+
								"('"+this.e_nb.getText()+"','"+this.noIFCair+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'IFREIM','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_tahu.getText()+"','-','-','-','-','"+this.app._kodePP+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_total.getText())+",'X','-','-','-','-','-','-','"+this.cb_ver.getText()+"')");
						sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunHutIF+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','IFREIM','HUTIF','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					
						sql.add("insert into pbh_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','IFREIM','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_namarek.getText()+"',"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+")");
					}
					else {
						sql.add("update if_nik set flag_aktif='0',no_flag='"+this.e_nb.getText()+"' where no_flag='-' and no_kas='"+this.noIFCair+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final,posted,kode_proyek,no_app2,no_app3,no_fiat,no_kas,akun_hutang,nik_ver) values  "+
								"('"+this.e_nb.getText()+"','"+this.noIFCair+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'IFCLOSE','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_tahu.getText()+"','-','-','-','-','"+this.app._kodePP+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_total.getText())+",'X','-','-','-','-','-','-','"+this.cb_ver.getText()+"')");
						sql.add("insert into pbh_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','IFCLOSE','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_namarek.getText()+"',"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+")");		
						sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
						 		"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',888,'"+this.akunIF+"','"+this.e_ket.getText()+"','C','IDR',1,"+this.nilaiIF+","+this.nilaiIF+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','IFREIM','R-IF','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");										
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(4,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(4,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(4,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','IFREIM','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(3,i))+","+nilai+")");
							}
						}
					}

					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','IFREIM','"+this.e_nb.getText()+"')");															
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
					setTipeButton(tbSimpan);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.sg1.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1); 	
					this.sgUpld.clear(1);
					this.sgFile.clear(1);					
					this.doClick();					
					if (this.c_status.getText() == "CLOSE") this.cb_nik.setText("");
					else this.isiCBnik();			
					this.doLoad3();		
				break;
			case "simpan" :					
			case "ubah" :
				this.preView = "1";
				if (this.c_status.getText() == "CLOSE") {
					this.sg1.setTag("9");					
					this.e_norek.setTag("9");
					this.e_namarek.setTag("9");
					this.e_bank.setTag("9");	
					if (this.nilaiIF != nilaiToFloat(this.e_saldo.getText())) {
						system.alert(this,"Transaksi CLOSE tidak valid.","Terdapat Proses Reimburse yang belum selesai.");
						return false;
					}				
				}
				else {
					this.sg1.setTag("0");
					this.e_norek.setTag("0");
					this.e_namarek.setTag("0");
					this.e_bank.setTag("0");					
				}
				
				this.sg1.validasi();		
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}

				for (var i=0;i < this.sg1.getRowCount();i++){					
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal.");
							return false;
						}
						else {
							for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
								line = this.dataAkunGar.rs.rows[j];
								if (line.kode_akun == this.sg1.cells(0,i) && this.sg1.cells(7,i) == "-") {		
									var k = i+1;
									system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.[Baris : "+k+"]");
									return false;						
								}
							}
						}
					}										
				}	

				this.doHitungGar();								
				for (var i=0;i < this.sg2.getRowCount();i++){
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_akun == this.sg2.cells(0,i)) {		
							if (nilaiToFloat(this.sg2.cells(4,i))>0 && nilaiToFloat(this.sg2.cells(3,i)) < nilaiToFloat(this.sg2.cells(4,i))) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"] , silahkan melakukan RRA dari menu anggaran");
								return false;						
							}							
						}
					}
				}

				if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo.");
					return false;
				}
				if (nilaiToFloat(this.e_total.getText()) < 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh kurang dari nol.");
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
					sql.add("delete from pbh_pb_m where no_pb ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from pbh_pb_j where no_pb ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from pbh_dok where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  ");
					sql.add("delete from pbh_rek where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from hutang_m where no_hutang ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  ");
					sql.add("delete from hutang_j where no_hutang ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  ");
					sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  ");

					sql.add("update if_nik set no_flag='-',flag_aktif='1' where no_kas='"+this.noIFCair+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) {			
			this.isiCBnik();
			this.doClick();
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);
			this.sg2.clear(1);
			this.sg3.clear(1); 	
			this.sgUpld.clear(1);
			this.sgFile.clear(1);	
			this.isiCBnik();
		}
		this.stsSimpan=1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hutang_m","no_hutang",this.app._lokasi+"-IR"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.cb_nik.setFocus();
		setTipeButton(tbSimpan);
	},		
	doChange:function(sender){				
		if (sender == this.cb_nik && this.cb_nik.getText()!="" && this.stsSimpan==1) {
			var strSQL = "select a.no_kas,a.nilai-isnull(b.pakai,0) as saldo,a.akun_if,a.nilai as nilai_if,a.kode_pp,e.bank+' - '+e.cabang as bank, e.no_rek,e.nama_rek "+
						 "from if_nik a inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi  "+		
						 "				inner join karyawan e on a.nik=e.nik and a.kode_lokasi=e.kode_lokasi "+						 				 						 
						 "				left join (select no_dokumen,sum(nilai) as pakai from pbh_pb_m "+
						 "						   where no_kas='-' and kode_lokasi='"+this.app._lokasi+"'  "+
						 "						   group by no_dokumen) b  on a.no_kas=b.no_dokumen "+
						 "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'";						   			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_saldo.setText(floatToNilai(line.saldo));					
					this.cb_pp.setText(line.kode_pp);					
					this.akunIF = line.akun_if;
					this.nilaiIF = parseFloat(line.nilai_if);
					this.kodePP = line.kode_pp;
					this.noIFCair = line.no_kas;
					this.e_bank.setText(line.bank);
					this.e_norek.setText(line.no_rek);
					this.e_namarek.setText(line.nama_rek);					
				}
			}
		}
	},	
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (sender.cells(2,row) == ""){
						sender.setCell(2,row,"D");						
					}
				break;
			case 3 : 
					if (sender.cells(3,row) == ""){
						if (row == 0) sender.setCell(3,row,this.e_ket.getText());
						else sender.setCell(3,row,sender.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (sender.cells(5,row) == "") {
						if (row == 0) sender.setCell(5,row,this.app._kodePP);
						else {
							sender.setCell(5,row,sender.cells(5,(row-1)));
							sender.setCell(6,row,sender.cells(6,(row-1)));
						}
					}
				break;							
		}
	},
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) sender.validasi();
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
		if (col == 7) {
			if (sender.cells(7,row) != "") {							
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(8,row,line.nama);
					else {						
						sender.cells(7,row,"-");
						sender.cells(8,row,"-");						
					}
				}
			}
		}	
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange1: function(){		
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg1.cells(4,i));
				}
			}			
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
			this.e_total.setText(floatToNilai(totD - totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick1: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						"select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ //and c.kode_pp='"+this.cb_pp.getText()+"'
						"       inner join karyawan_pp d on c.kode_pp = d.kode_pp and c.kode_lokasi=d.kode_lokasi and d.nik='"+this.cb_nik.getText()+"' "+
						"where b.kode_flag in ('062') and a.kode_lokasi='"+this.app._lokasi+"'",
						
						"select count(distinct a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ //and c.kode_pp='"+this.cb_pp.getText()+"' 
						"       inner join karyawan_pp d on c.kode_pp = d.kode_pp and c.kode_lokasi=d.kode_lokasi and d.nik='"+this.cb_nik.getText()+"' "+
						"where b.kode_flag in ('062') and a.kode_lokasi='"+this.app._lokasi+"'",
						["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 5){
				this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
						"select a.kode_pp, a.nama  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",
						"select count(a.kode_pp)  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",						
						["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
			}	
			if (col == 7) {								
				var vUnion = "";
				var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.status_gar != "1") var vUnion = " union select '-','-' "; 
					} 
				}
				this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
						"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion ,
						"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
						["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
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
						if (result.toLowerCase().search("error") == -1) {	
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}							
							if (this.preView == "1") {		

								//this.nama_report="server_report_saku3_pbh_ypt_rptIfForm";
								this.nama_report="server_report_saku3_pbh_ypt_rptIfFormGabung";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";							
								//this.nama_report="server_report_saku3_pbh_rptPengajuanPB";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
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
						} else system.info(this,result,"");	
	    			break;					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();														
							this.dataPP = new portalui_arrayMap();														
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
									this.dataPP.set(line.kode_pp, line.nama);										
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
			this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.sg1.clear(1);
			this.sg2.clear(1);	
			this.sg3.clear(1); 	
			this.sgUpld.clear(1);
			this.sgFile.clear(1);						
			this.doClick();	
			if (this.c_status.getText() == "CLOSE") {
				this.cb_nik.setText("","");
			}
			else this.isiCBnik();		
			this.doLoad3();	
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																			
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai, "+
					 "case b.progress when '0' then 'input' "+
					 "				  when 'R' then 'return dokumen' "+
					 "				  when 'K' then 'return pajak' "+
					 "				  when 'V' then 'return verifikasi' "+					 
					 "end as status "+
					 "from hutang_m a inner join pbh_pb_m b on a.no_hutang=b.no_pb and a.kode_lokasi=b.kode_lokasi and b.progress in ('0','R','K','V') "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted in ('F','X')  "+
					 "and a.modul = 'IFREIM' and a.kode_pp in (select kode_pp from karyawan_pp where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"') "+
					 "order by a.no_hutang desc";	
					 
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
			this.sg3.appendData([line.no_hutang,line.tgl,line.keterangan,floatToNilai(line.nilai),line.status.toUpperCase(),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 5) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
				this.doLoadCtt(this.e_nb.getText());
				
				var strSQL = "select a.keterangan,a.tanggal,b.nik_tahu as nik_tahu,b.nik_app as nik_app, c.no_kas,c.nik,a.kode_project,b.nik_ver as nik_ver "+
							 "from hutang_m a inner join if_nik c on a.no_dokumen = c.no_kas and a.kode_lokasi=c.kode_lokasi "+							 
							 "				  inner join pbh_pb_m b on b.no_pb=a.no_hutang and a.kode_lokasi=b.kode_lokasi  "+
							 "where a.no_hutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";							 								
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.c_status.setText(line.kode_project); //status-->REIMBURSE/CLOSE																
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);						
						this.cb_app.setText(line.nik_app);
						this.cb_tahu.setText(line.nik_tahu);	
						this.cb_ver.setText(line.nik_ver);	
						this.noIFCair = line.no_kas;
						
						this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where b.no_kas='"+this.noIFCair+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
						this.cb_nik.setText(line.nik);			
					}
				}		
				
				var strSQL = "select a.no_kas,a.nilai-isnull(b.pakai,0) as saldo,a.akun_if,a.nilai as nilai_if,a.kode_pp "+
							"from if_nik a inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi  "+									
							"				left join (select no_dokumen,sum(nilai) as pakai from pbh_pb_m "+
							"						   where no_kas='-' and kode_lokasi='"+this.app._lokasi+"' and no_pb <>'"+this.e_nb.getText()+"'  "+
							"						   group by no_dokumen) b  on a.no_kas=b.no_dokumen "+
							"where a.no_kas='"+this.noIFCair+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_saldo.setText(floatToNilai(line.saldo));					
						this.cb_pp.setText(line.kode_pp);					
						this.akunIF = line.akun_if;
						this.nilaiIF = parseFloat(line.nilai_if);
						this.kodePP = line.kode_pp;
						this.noIFCair = line.no_kas;						
					}
				}
				
                var strSQL = "select * from pbh_rek a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
                        this.e_bank.setText(line.bank);
                        this.e_norek.setText(line.no_rek);
                        this.e_namarek.setText(line.nama_rek);											
					}
                }		
                
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																				
							"where a.jenis='BEBAN' and a.no_hutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg1.clear(1);							

				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
		
			}									
		} catch(e) {alert(e);}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from pbh_ver_m "+
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}	
});