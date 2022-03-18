window.app_saku3_transaksi_yakes21_simlog_fPbBast = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_simlog_fPbBast.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_simlog_fPbBast";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","PB BAST", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data PB","List PB"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,150,80,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});								
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[790,13,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[890,13,100,18]}); 				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total PB", tag:4, tipeText:ttNilai, text:"0"});				

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,348], childPage:["Data Bast","Data PB","Item Pajak","Otorisasi","File Dok","Cattn. Verf"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
					colTitle:["Pilih","No BAST","Tanggal","Keterangan","Akun Utang","Nilai","Saldo","Vendor"],
					colWidth:[[7,6,5,4,3,2,1,0],[200,100,100,70,290,70,100,70]],					
					dblClick:[this,"doDoubleClick"],readOnly:true,colFormat:[[0,5,6],[cfButton,cfNilai,cfNilai]],
					click:[this,"doSgBtnClick"], colAlign:[[0],[alCenter]],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		

		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Kode Vendor", readOnly:true,tag:4});				
		this.cb_rek = new saiCBBL(this.pc1.childPage[1],{bound:[520,16,220,20],caption:"ID Rekening", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_namavendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama Vendor", readOnly:true,tag:4});				
		this.e_banktrans = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"B. Transfer", readOnly:true,tag:4});				
		this.e_nohutang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"No Hutang", readOnly:true,tag:4});				
		this.e_tanggal = new saiLabelEdit(this.pc1.childPage[1],{bound:[250,16,220,20],caption:"Tanggal", readOnly:true,tag:4});						
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Bank", readOnly:true,tag:4});						
		this.e_kethut = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Keterangan", readOnly:true,tag:4});						
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"No Rekening", readOnly:true,tag:4});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Kode Akun", readOnly:true,tag:4});						
		this.e_namaakun = new saiLabelEdit(this.pc1.childPage[1],{bound:[250,16,220,20],labelWidth:0, caption:"", readOnly:true,tag:4});						
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Nama Rekening", readOnly:true,tag:4});								
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Saldo Hutang", tag:4, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Nilai Final", tag:4, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
				
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,290,50,200,80]],								
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]], picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});					
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[3],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc1.childPage[3],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								
		this.cb_ver = new saiCBBL(this.pc1.childPage[3],{bound:[20,14,220,20],caption:"NIK Verifikator", multiSelection:false, maxLength:10, tag:2});						
		
		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClickDok"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[4],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.sgctt = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});
												
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
			
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp ='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('NIKVER') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "NIKVER") this.cb_ver.setText(line.flag);								
				}
			}					
			this.cb_buat.setText(this.app._userLog);

			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'");						
			this.dbLib.getMultiDataProviderA(sql);		

			this.doLoadCtt(this.e_nb.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_simlog_fPbBast.extend(window.childForm);
window.app_saku3_transaksi_yakes21_simlog_fPbBast.implement({	
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
					"select kode_jenis, nama  from pbh_dok_ver  ", 
					"select count(*) from pbh_dok_ver ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClickDok: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from (select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') x",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					var strPP = "select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'";
					var strPPCount = "select count(*) from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'";                    
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strPP,
							strPPCount,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}												
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell4: function(sender, col, row){
		try {
			if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) this.sg4.validasi();
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {
				if (sender.cells(0,row) != "") {				
					var akun = this.dataAkunPjk.get(sender.cells(0,row));				
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
			sender.onChange.set(this,"doChangeCell4");		
		}
		catch(e){
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,4])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from hutang_bayar where no_bayar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}			
										
					sql.add("insert into hutang_bayar (no_bayar,no_hutang,kode_lokasi,akun_hutang,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor,sts_pajak,pajak) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_nohutang.getText()+"','"+this.app._lokasi+"','"+this.e_akun.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','PBBAST','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'D','-','-',0)");		

					sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'PBBAST','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_buat.getText()+"','"+this.e_nohutang.getText()+"','-','-','"+this.e_akun.getText()+"','"+this.cb_ver.getText()+"','"+this.e_banktrans.getText()+"','-','-')");

					sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.e_akun.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBBAST','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										

					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){										
								sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg4.cells(4,i))+",'"+this.sg4.cells(5,i)+"','-','"+this.app._lokasi+"','PBBAST','PAJAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
						}
					}		

					sql.add("insert into pbh_rek(kode_vendor,nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
							"('"+this.e_vendor.getText()+"',"+this.cb_rek.getText()+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBBAST','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_vendor.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+this.niPajak+","+nilaiToFloat(this.e_total.getText())+")");
					
					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','PBBAST','"+this.e_nb.getText()+"')");															
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
					this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
					this.sg3.clear(1); this.sg.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1); this.sg4.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);					
					this.stsSimpan = 1;
					this.dataHutang();									
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";												
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar melebihi Saldo.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar tidak boleh nol atau kurang.");
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
					sql.add("delete from hutang_bayar where no_bayar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.dataHutang();						
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();					
		if (sender == this.e_nilai && this.e_nilai.getText()!="") this.sg4.validasi();		

		if (sender == this.cb_rek && this.cb_rek.getText()!="") {
			var data = this.dbLib.getDataProvider("select * from vendor_rek where nu="+this.cb_rek.getText()+" and kode_vendor='"+this.e_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_banktrans.setText(line.bank_trans);			
					this.e_bank.setText(line.bank+' - '+line.cabang);
					this.e_norek.setText(line.no_rek);
					this.e_namarek.setText(line.nama_rek);					
				}
			}
		}

	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.sg4.clear(1);
					this.standarLib.clearByTag(this, new Array("4"),this.e_nb);
					this.dataHutang();				
				}					
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},	
	doNilaiChange: function(){		
		try{
			var tot = 0; this.niPajak = 0;			
			for (var i = 0; i < this.sg4.getRowCount();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != ""){
					if (this.sg4.cells(2,i).toUpperCase() == "D") tot += nilaiToFloat(this.sg4.cells(4,i));
					if (this.sg4.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg4.cells(4,i));
				}
			}
			this.niPajak = Math.abs(tot); 
			tot = tot + nilaiToFloat(this.e_nilai.getText());
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

							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_hutang_rptPbForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
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
						}else system.info(this,result,"");
	    			break;					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkunPjk = new portalui_arrayMap();														
							this.dataPP = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkunPjk.set(line.kode_akun, line.nama);										
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
			this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
			this.sg3.clear(1); this.sg.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1); this.sg4.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.stsSimpan = 1;
			this.dataHutang();							
		} catch(e) {
			alert(e);
		}
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 0) {
				this.doDoubleClick(this.sg,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {		
		if (this.sg.cells(0,row) != "") {
			this.pc1.setActivePage(this.pc1.childPage[1]);																		
			
			this.e_nohutang.setText(this.sg.cells(1,row));
			this.e_tanggal.setText(this.sg.cells(2,row));
			this.e_kethut.setText(this.sg.cells(3,row));
			this.e_akun.setText(this.sg.cells(4,row));			
			this.e_saldo.setText(this.sg.cells(5,row));			
			if (this.stsSimpan == 1) this.e_nilai.setText(this.sg.cells(6,row));
			
			var strSQL = "select a.kode_vendor,b.nama, c.nama as nama_akun,d.nu "+
			             "from hutang_m a "+
						 "inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
			             "inner join masakun c on a.akun_hutang=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "inner join vendor_rek d on b.kode_vendor=d.kode_vendor and b.kode_lokasi=d.kode_lokasi and d.status='1' "+
						 "where a.no_hutang='"+this.e_nohutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.e_vendor.setText(line.kode_vendor);
					this.e_namaakun.setText(line.nama_akun);
					this.e_namavendor.setText(line.nama);
					this.cb_rek.setSQL("select nu, bank+'-'+cabang as bank from vendor_rek where kode_vendor='"+line.kode_vendor+"' and kode_lokasi='"+this.app._lokasi+"'",["nu","bank"],false,["Kode","Bank"],"and","Data Rekening",true);
					if (this.stsSimpan == 1) {						
						this.cb_rek.setText(line.nu);												
					}
				}
			}															
		}
	},
	dataHutang:function(sender){				
		if (this.e_periode.getText()!="") {
			var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.akun_hutang,a.nilai,a.nilai-isnull(pb,0) as saldo,b.kode_vendor+' - '+b.nama as vendor "+
					 "from hutang_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+				 
					 "                inner join pp z on a.kode_pp=z.kode_pp and a.kode_lokasi=z.kode_lokasi "+					 
					 "                left join (select kode_lokasi,no_hutang,sum(nilai) as pb "+
					 "                           from hutang_bayar where kode_lokasi='"+this.app._lokasi+"' and modul='PBBAST' "+
					 "                           group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
					 "where a.modul='LOGBAST' and a.nilai-isnull(pb,0) > 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.periode <='"+this.e_periode.getText()+"'";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["Pilih",line.no_hutang,line.tgl,line.keterangan,line.akun_hutang,floatToNilai(line.nilai),floatToNilai(line.saldo),line.vendor]);
				}
			} else this.sg.clear(1);							
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_pb,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from pbh_pb_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PBBAST' and a.progress in ('0','V') ";					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);							
		this.dataHutang();				
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_pb,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.doLoadCtt(this.e_nb.getText());

				var strSQL = "select b.nilai,a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_buat,a.nik_app,a.nik_ver,a.no_hutang, "+
							"       c.kode_vendor,c.nu,c.no_rek,c.bank,c.nama_rek,d.bank_trans "+
							"from pbh_pb_m a "+
							"inner join hutang_bayar b on a.no_pb=b.no_bayar and a.kode_lokasi=b.kode_lokasi "+								 
							"inner join pbh_rek c on a.no_pb=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
							"inner join vendor_rek d on c.kode_vendor=d.kode_vendor and c.nu=d.nu and d.kode_lokasi=d.kode_lokasi "+
							"where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);						
						this.e_nohutang.setText(line.no_hutang);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.cb_app.setText(line.nik_app);
						this.cb_buat.setText(line.nik_buat);
						this.cb_ver.setText(line.nik_ver);																							

						this.e_vendor.setText(line.kode_vendor);
						this.cb_rek.setText(line.nu);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.e_banktrans.setText(line.bank_trans);
					}
				}	

				var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.akun_hutang,a.nilai,a.nilai-isnull(pb,0) as saldo,b.kode_vendor+' - '+b.nama as vendor "+
							 "from hutang_m a "+
							 "		inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+				 
							 "      left join (select kode_lokasi,no_hutang,sum(nilai) as pb "+
							 "                 from hutang_bayar where kode_lokasi='"+this.app._lokasi+"' and modul='PBBAST' and no_bayar<>'"+this.e_nb.getText()+"' "+
							 "                 group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_hutang ='"+this.e_nohutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["Pilih",line.no_hutang,line.tgl,line.keterangan,line.akun_hutang,floatToNilai(line.nilai),floatToNilai(line.saldo),line.vendor]);
					}
					this.doDoubleClick(this.sg,0,0);
				} else this.sg.clear(1);	

				var strSQL4 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
						"from pbh_pb_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi<>'00' "+							
						"where a.jenis = 'PAJAK' and a.no_pb = '"+this.e_nb.getText()+"' ";						
				var data = this.dbLib.getDataProvider(strSQL4,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg4.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg4.clear(1);		
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(							 
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
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