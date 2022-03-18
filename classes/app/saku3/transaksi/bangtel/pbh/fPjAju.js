window.app_saku3_transaksi_bangtel_pbh_fPjAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_pbh_fPjAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_pbh_fPjAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permohonan Panjar", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl;saiMemo");s
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,455], childPage:["Entri Data","List Data"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9,
		            colTitle:["No Panjar","Tanggal","Jenis","No Dokumen","Deskripsi","Pemegang","Nilai","Catatan"],
					colWidth:[[7,6,5,4,3,2,1,0],[250,100,200,210,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Panjar",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,353], childPage:["Data Panjar","Catatan","Panjar Open","File Dok"]});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tanggal Pakai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18]}); 										
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Akun Panjar", multiSelection:false, maxLength:10, tag:2});								
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_setuju = new saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Nama Rekening", maxLength:100});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"No Rekening", maxLength:50});				
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Bank", maxLength:100});				
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,450,20],caption:"Cabang", maxLength:100});				
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,450,60],caption:"Catatan",tag:9});	
						
		this.sg6 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
					colTitle:["No Panjar","Tanggal","Tgl Pakai","Keterangan","Nilai","Umur (Hari)"],					
					colWidth:[[5,4,3,2,1,0],[80,100,400,80,80,100]],readOnly :true,colFormat:[[4,5],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn6 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg6});		

		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:0,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1});
					this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

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
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
															
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('MAXPJR') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "MAXPJR") this.maxPjr = parseFloat(line.value1);			
				}
			}			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.tipe='posting' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag ='002' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			this.e_memo.setReadOnly(true);		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_pbh_fPjAju.extend(window.childForm);
window.app_saku3_transaksi_bangtel_pbh_fPjAju.implement({
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
					"select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
					"select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
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
						sql.add("delete from panjar2_m where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_rek where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_panjar_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PJAJU'");	
					}					
					
					sql.add("insert into panjar2_m(no_panjar,kode_lokasi,no_dokumen,tanggal,due_date,keterangan,nik_buat,nik_setuju,kode_pp,nilai,periode,nik_user,tgl_input,no_app,no_ver,no_spb,no_kas,progress,akun_panjar,modul,no_app2,no_app3,no_fiat) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','-','-','-','0','"+this.cb_akun.getText()+"','PJAJU','-','-','-')");
					
					sql.add("insert into spm_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,cabang,bruto,pajak,nilai) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','PJAJU','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"',"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+")");
									
					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}														
							sql.add("insert into spm_panjar_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','PJAJU','"+this.e_nb.getText()+"')");															
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg3.clear(1); 
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :	
			case "ubah" :								
				this.preView = "1";								
				var data = this.dbLib.getDataProvider("select no_panjar from panjar2_m where no_panjar <> '"+this.e_nb.getText()+"' and no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_panjar);
						return false;
					} 
				}
											
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.jumOpen >= this.maxPjr) {
					system.alert(this,"Transaksi tidak valid.","Jumlah Panjar Open melebihi maksimal yang diperkenanan ("+this.maxPjr+").");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Permohonan tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();				
				sql.add("delete from panjar2_m where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spm_rek where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spm_panjar_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PJAJU'");																		
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
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {		
				this.sgUpld.clear(1);
				this.sgFile.clear(1);		
				this.e_total.setText("0");			
				this.noAppLama = "-";
				this.noVerLama = "-";
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"panjar2_m","no_panjar",this.app._lokasi+"-PJ"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText() !="") {
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_pp='"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
		}

		if (sender == this.cb_buat && this.cb_buat.getText() !="" && this.stsSimpan == 1) {
			var strSQL = "select bank,cabang,no_rek,nama_rek from karyawan where nik = '"+this.cb_buat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_norek.setText(line.no_rek);												
					this.e_namarek.setText(line.nama_rek);												
					this.e_bank.setText(line.bank);
					this.e_cabang.setText(line.cabang);											
				}
			}

			this.jumOpen = 0;
			var str = "select a.no_panjar,a.keterangan,convert(varchar,a.tanggal,103) as tgl,a.nilai,convert(varchar,a.due_date,103) as tgl_pakai,DATEDIFF(DAY,a.tanggal,getdate()) as umur "+
					  "from panjar2_m a "+
					  "left join ptg_m b on a.no_panjar=b.no_pj and a.kode_lokasi=b.kode_lokasi "+
					  "where a.modul='PJAJU' and b.no_pj is null and a.nik_buat='"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg6.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg6.appendData([line.no_panjar,line.tgl,line.tgl_pakai,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.umur)]);					
				}			
				this.jumOpen = parseInt(i)+1;
			} else this.sg6.clear(1);	

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
								this.nama_report="server_report_saku3_bangtel_rptPanjarForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_panjar='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
			this.progSeb = "";
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg3.clear(1); 
			this.sgUpld.clear(1);
			this.sgFile.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_panjar,convert(varchar,a.tanggal,103) as tgl,case a.progress when '0' then 'AJU' when 'C' then 'REVISI' when 'V' then 'REV.VER' end as jenis,a.no_dokumen,a.keterangan,a.nik_buat+' - '+b.nama as nama,a.nilai, "+
					 "case when a.progress = 'C' then isnull(c.catatan,'-') else isnull(d.catatan,'-') end as catatan "+
		             "from panjar2_m a inner join karyawan b on a.nik_buat=b.nik "+	
					 "				   inner join karyawan_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi and e.nik='"+this.app._userLog+"' "+				 					 
					 "			       left join spm_app_m c on a.no_panjar=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.no_flag='-' and c.form = 'APPCAB' "+
					 "			       left join spm_app_m d on a.no_panjar=d.no_bukti and a.kode_lokasi=d.kode_lokasi and d.no_flag='-' and d.form = 'APPVER' "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','C','V','S') and a.modul='PJAJU'";		
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
			this.sg3.appendData([line.no_panjar,line.tgl,line.jenis.toUpperCase(),line.no_dokumen,line.keterangan,line.nama,floatToNilai(line.nilai),line.catatan]); 
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
				this.e_memo.setText(this.sg3.cells(7,row));							
								
				var strSQL = "select a.nilai,a.keterangan,a.no_dokumen,a.tanggal,a.due_date,a.akun_panjar,a.nik_buat,a.nik_setuju,a.kode_pp,a.progress, "+
							 "b.bank,b.cabang,b.no_rek,b.nama_rek "+
							 "from panjar2_m a inner join spm_rek b on a.no_panjar=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.modul='PJAJU' "+					 
							 "where a.no_panjar = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);																		
						this.dp_d2.setText(line.due_date);
						this.cb_akun.setText(line.akun_panjar);
						this.cb_pp.setText(line.kode_pp);
						this.cb_buat.setSQL("select a.nik, a.nama from karyawan a where a.nik='"+line.nik_buat+"' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
						this.cb_buat.setText(line.nik_buat);
						this.cb_setuju.setText(line.nik_setuju);
						this.e_total.setText(floatToNilai(line.nilai));					
	
						this.e_norek.setText(line.no_rek);												
						this.e_namarek.setText(line.nama_rek);												
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						
					}					
				}	
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from spm_panjar_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
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
	}
});