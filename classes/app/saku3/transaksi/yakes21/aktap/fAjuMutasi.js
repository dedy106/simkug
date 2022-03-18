window.app_saku3_transaksi_yakes21_aktap_fAjuMutasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_aktap_fAjuMutasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_aktap_fAjuMutasi";		
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pengajuan Mutasi Aset", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_lokasi = new saiCBBL(this,{bound:[20,16,220,20],caption:"Lok. Aktap", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Mutasi","List Mutasi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Pengajuan","Tanggal","No Dokumen","Deskripsi","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,300,150,80,100]],
					colFormat:[[4,5],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"No Dokumen", maxLength:50});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Nilai Perolehan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,315], childPage:["Item Aktap","Otorisasi","File Dok"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["ID Lok.","Lok. Tujuan","ID Aktap","Nama","Tgl Perolehan","Progress","Nilai","PP Tujuan","Nama PP"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,100,80,80,230,150,100,60]],					
					columnReadOnly:[true,[1,3,4,5,6,8],[0,7]],
					colHide:[[5],[true]],
					buttonStyle:[[0,2,7],[bsEllips,bsEllips,bsEllips]], 
					colFormat:[[6],[cfNilai]],checkItem: true,
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								

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

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
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
			
			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_buat.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_aktap_fAjuMutasi.extend(window.childForm);
window.app_saku3_transaksi_yakes21_aktap_fAjuMutasi.implement({		
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
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
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
						sql.add("update a set a.progress=b.prog_seb "+
								"from fa_asset a inner join fa_mutasi_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
								"where b.no_aju = '"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.cb_lokasi.getText()+"'");												

						sql.add("delete from fa_mutasi_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");	
						sql.add("delete from fa_mutasi_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");	
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					}					
															
					sql.add("insert into fa_mutasi_m (no_aju, kode_lokasi, no_dokumen, tanggal, keterangan, periode, nilai, nik_buat, nik_app, tgl_input, nik_user, progress, no_app) values "+
							"('"+this.e_nb.getText()+"', '"+this.cb_lokasi.getText()+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', '"+this.e_ket.getText()+"', '"+this.e_periode.getText()+"', "+nilaiToFloat(this.e_total.getText())+", '"+this.cb_buat.getText()+"', '"+this.cb_app.getText()+"', getdate(), '"+this.app._userLog+"', '0', '-')")

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("update fa_asset set progress='M' where no_fa='"+this.sg1.cells(2,i)+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
								sql.add("insert into fa_mutasi_d (nu,no_aju,no_fa,prog_seb,kode_lokasi,kode_loktuj,kode_pptuj) values "+
										"("+i+",'"+this.e_nb.getText()+"', '"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.cb_lokasi.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(7,i)+"')");
							}
						}
					}
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.cb_lokasi.getText()+"','FAMUTASI','"+this.e_nb.getText()+"')");															
						}	
					}

					sql.add("update a set a.kode_ppasal=b.kode_pp "+
							"from fa_mutasi_d a inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' ");

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
					this.sg1.clear(1); this.sg3.clear(1); 
					this.sgUpld.clear(1);
					this.sgFile.clear(1);							
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);
					this.doClick();
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";								
				this.sg1.validasi();					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update a set a.progress=b.prog_seb "+
						"from fa_asset a inner join fa_mutasi_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
						"where b.no_aju = '"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.cb_lokasi.getText()+"'");												

				sql.add("delete from fa_mutasi_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");												
				sql.add("delete from fa_mutasi_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");												
				sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);

		if (this.stsSimpan == 1) {
			this.doClick();							
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode  && this.stsSimpan ==1) this.doClick();	
		if (sender == this.cb_lokasi && this.cb_lokasi.getText()) {
			var sql = new server_util_arrayList();			
			sql.add("select no_fa,nama from fa_asset where progress in ('0','2') and kode_lokasi = '"+this.cb_lokasi.getText()+"'");												
			this.dbLib.getMultiDataProviderA(sql);
		}					
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.cb_lokasi.getText()!="") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); this.sg3.clear(1);							
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fa_mutasi_m","no_aju",this.cb_lokasi.getText()+"-AM"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},	
	doChangeCell1: function(sender, col, row){
		try {
			if (col == 0) this.sg1.validasi();
			sender.onChange.set(undefined,undefined);	    

			if (col == 0) {
				var strSQL = "select nama from lokasi where kode_lokasi ='"+sender.cells(0,row)+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(1,row,line.nama); 											
					else sender.cells(1,row,"");
				}
			}
			if (col == 2) {
				if (this.sg1.cells(2,row) != "") {				
					var aktap = this.dataAktap.get(sender.cells(2,row));				
					if (aktap) {
						sender.cells(3,row,aktap);
						var strSQL = "select convert(varchar,a.tgl_perolehan,103)  as tgl_oleh,zz.nilai , a.progress "+
									"from fa_asset a "+
									"    inner join (select no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
									"                from fa_nilai where periode<='"+this.e_periode.getText()+"' "+
									"				 group by no_fa "+
									"				) zz on a.no_fa=zz.no_fa "+
									"where a.no_fa ='"+sender.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'";										
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){													
								sender.cells(4,row,line.tgl_oleh); 
								sender.cells(5,row,line.progress); 
								sender.cells(6,row,line.nilai); 
							}
						}
					}
					else {
						if (trim(sender.cells(2,row)) != "") system.alert(this,"ID Aktap "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(2,row,"");
						sender.cells(3,row,"");
						sender.cells(4,row,"");
						sender.cells(5,row,"");
						sender.cells(6,row,"0");
					}				
				}
			}	
			
			if (col == 7) {
				var strSQL = "select nama from pp where kode_pp='"+sender.cells(7,row)+"' and kode_lokasi ='"+sender.cells(0,row)+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(8,row,line.nama); 											
					else sender.cells(8,row,"");
				}
			}
			sender.onChange.set(this,"doChangeCell1");	

		}
		catch(e) {
			alert(e);
		}	
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
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0) {
					this.standarLib.showListData(this, "Daftar Lokasi",sender,undefined, 
						    "select kode_lokasi,nama from lokasi where kode_lokasi not in ('00','"+this.cb_lokasi.getText()+"')",
							"select count(*) from lokasi where kode_lokasi not in ('00','"+this.cb_lokasi.getText()+"')",
							["kode_lokasi","nama"],"and",["ID","Nama"],false);				
				}

				if (col == 2){
					if (this.stsSimpan == 1) {
						var sql1 = "select no_fa,nama from fa_asset where progress in ('0','2') and kode_lokasi = '"+this.cb_lokasi.getText()+"'";
						var sql2 = "select count(*) from fa_asset where progress in ('0','2') and kode_lokasi = '"+this.cb_lokasi.getText()+"'";
					}
					else {
						var sql1 = "select no_fa,nama from fa_asset where progress in ('0','2') and kode_lokasi = '"+this.cb_lokasi.getText()+"' union select a.no_fa as no_fa,a.nama as nama from fa_asset a inner join fa_mutasi_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_aju='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.cb_lokasi.getText()+"'";
						var sql2 = "select count(*) from (select no_fa,nama from fa_asset where progress in ('0','2')  and kode_lokasi = '"+this.cb_lokasi.getText()+"' union select a.no_fa as no_fa,a.nama as nama from fa_asset a inner join fa_mutasi_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_aju='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.cb_lokasi.getText()+"') x";
					}
					this.standarLib.showListData(this, "Daftar Aktap",sender,undefined, 
						    sql1,
							sql2,
							["no_fa","nama"],"and",["ID","Nama"],false);				
				}	
				
				if (col == 7) {
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
						    "select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi = '"+this.sg1.cells(0,row)+"'",
							"select count(*) from pp where flag_aktif='1' and kode_lokasi = '"+this.sg1.cells(0,row)+"'",
							["kode_pp","nama"],"and",["ID","Nama"],false);				
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
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							if (this.preView == "1") {								
								// this.nama_report="server_report_saku3_tu_bmhd_rptBuktiJurnalHU";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
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
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAktap = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAktap.set(line.no_fa, line.nama);										
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
			this.sg1.clear(1); this.sg3.clear(1); 
			this.sgUpld.clear(1);
			this.sgFile.clear(1);							
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);	
			this.doClick();				
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from fa_mutasi_m a "+				
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' and a.progress ='0'";		
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
			this.sg3.appendData([line.no_aju,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 5) {
				this.doDoubleClick3(this.sg3,0,row);
			}
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
								
				var strSQL = "select * from fa_mutasi_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);						
						this.e_ket.setText(line.keterangan);	
						this.e_dok.setText(line.no_dokumen);						
						this.cb_buat.setText(line.nik_buat);	
						this.cb_app.setText(line.nik_app);												
					}
				}					
				
				var sql = new server_util_arrayList();
				sql.add("select no_fa,nama from fa_asset where progress in ('0','2') and kode_lokasi = '"+this.cb_lokasi.getText()+"' "+
						"union "+
						"select a.no_fa as no_fa,a.nama as nama from fa_asset a inner join fa_mutasi_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_aju='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.cb_lokasi.getText()+"'");												
				this.dbLib.getMultiDataProviderA(sql);

				var data = this.dbLib.getDataProvider(
							"select x.kode_lokasi,x.nama as nama_lok, a.no_fa, b.nama, convert(varchar,tgl_perolehan,103)  as tgl_oleh, zz.nilai,a.prog_seb,y.kode_pp,y.nama as nama_pp "+
							"from fa_mutasi_d a "+
							"	 inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							"    inner join (select no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							"                from fa_nilai where periode<='"+this.e_periode.getText()+"'  "+
							"				 group by no_fa "+
							"				) zz on a.no_fa=zz.no_fa "+
							"	 inner join lokasi x on a.kode_loktuj=x.kode_lokasi "+
							"	 inner join pp y on a.kode_pptuj=y.kode_pp and a.kode_loktuj=y.kode_lokasi "+
							"where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_lokasi,line.nama_lok,line.no_fa,line.nama,line.tgl_oleh,line.prog_seb,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg1.clear(1);	
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nu",true);
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
	}
});