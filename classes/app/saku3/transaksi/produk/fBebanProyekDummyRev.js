window.app_saku3_transaksi_produk_fBebanProyekDummyRev = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fBebanProyekDummyRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fBebanProyekDummyRev";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Beban Proyek Dummy", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Reverse","List Reverse"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,500,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:1,multiSelection:false,change:[this,"doChange"]});
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"NIK Approve",tag:2,multiSelection:false}); 						
		this.cb_proyek = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"ID Proyek",tag:1,readOnly:true,multiSelection:false,change:[this,"doChange"]}); 								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});									
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total Reverse", tag:1, tipeText:ttNilai, text:"0", readOnly:true});

		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[0,5,this.pc2.width-5,293],colCount:9,tag:0,
				colTitle:["Status","No Referensi","Tanggal","Keterangan","Akun Beban","Akun Hutang","DRK","Nilai Akru","Vendor"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,100,80,80,80,250,80,120,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["REVERSE","INPROG"]})]],
				colFormat:[[7],[cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);  
			this.cb_pp.setText(this.app._kodePP);			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_app.setText(this.app._userLog);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fBebanProyekDummyRev.extend(window.childForm);
window.app_saku3_transaksi_produk_fBebanProyekDummyRev.implement({
	doLoadCBproyek: function() {			
			var strSQL = "select distinct a.kode_proyek,a.nama as keterangan "+
						 "from pr_proyek a inner join pr_or_d b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi and b.jenis='BBNDUMMY' and b.no_reverse = '-' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.progress='1' ";			
			this.cb_proyek.setSQL(strSQL,["a.kode_proyek","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Proyek",true);									  
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
						sql.add("delete from pr_or_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
						sql.add("update pr_or_d set no_reverse='-' where no_reverse = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}					
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','PR','REVDUMMY','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_proyek.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'"+this.cb_app.getText()+"','-','-','-','-','-','-','-','-')");
					
					if (this.sg1.getRowValidCount() > 0) {
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "REVERSE"){
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg1.cells(5,i)+"','D',"+parseNilai(this.sg1.cells(7,i))+","+parseNilai(this.sg1.cells(7,i))+",'"+this.e_ket.getText()+"','PR','HUTDUMMY','IDR',1,'"+this.cb_pp.getText()+"','-','-','"+this.sg1.cells(8,i)+"','-','-','-','-','-')");								
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg1.cells(4,i)+"','C',"+parseNilai(this.sg1.cells(7,i))+","+parseNilai(this.sg1.cells(7,i))+",'"+this.e_ket.getText()+"','PR','BBNDUMMY','IDR',1,'"+this.cb_pp.getText()+"','"+this.sg1.cells(6,i)+"','-','-','-','-','-','-','-')");					
										
								sql.add("update pr_or_d set no_reverse='"+this.e_nb.getText()+"' where no_bukti = '"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");									
								sql.add("insert into pr_or_d (no_bukti,kode_lokasi,periode,kode_proyek,kode_akun,dc,nilai,jenis,kode_pp,kode_drk,no_reverse) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.sg1.cells(4,i)+"','C',"+nilaiToFloat(this.sg1.cells(7,i))+",'REVDUMMY','"+this.cb_pp.getText()+"','"+this.sg1.cells(6,i)+"','NONREV')");								
							}
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);															
					setTipeButton(tbAllFalse);
					this.sg3.clear(1);			
					this.sg1.clear(1);							
				break;
			case "simpan" :					
			case "ubah" :									
				this.preView = "1";
				this.sg1.validasi();
				if (nilaiToFloat(this.e_total.getText()) <= 0 ){
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
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
					sql.add("delete from pr_or_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
					sql.add("update pr_or_d set no_reverse='-' where no_reverse = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				}
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			if (this.stsSimpan == 1) {
				this.doClick();				
			}
		}
		catch (e) {
			alert(e);
		}			
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.sg3.clear(1);		
				this.sg1.clear(1);	
				this.e_total.setText("0");					
			}				
			this.stsSimpan = 1; 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BBN"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_pp.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan==1) this.doLoadCBproyek();

		if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
			if (this.stsSimpan==1) {
				this.e_ket.setText(this.cb_proyek.rightLabelCaption);
				var strSQL = "select d.param1 as kode_vendor,c.kode_akun,e.kode_akun as akun_hutang,c.nilai,c.kode_drk,c.no_bukti,convert(varchar,d.tanggal,103) as tgl,d.keterangan "+
							 "from pr_or_d c "+
							 "inner join trans_m d on c.no_bukti=d.no_bukti and c.kode_lokasi=d.kode_lokasi "+						
							 "inner join trans_j e on d.no_bukti=e.no_bukti and e.kode_lokasi=d.kode_lokasi and e.jenis='HUTDUMMY' "+						
							 "where c.jenis='BBNDUMMY' and c.no_reverse='-' and c.kode_proyek='"+this.cb_proyek.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData(["INPROG",line.no_bukti,line.tgl,line.keterangan,line.kode_akun,line.akun_hutang,line.kode_drk,floatToNilai(line.nilai),line.kode_vendor]);
					}
				} else this.sg1.clear(1);
			}			
		}	
	},	
	doNilaiChange1: function(){
		try{			
			var total = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="REVERSE" && this.sg1.cells(7,i) != "") {
					total += nilaiToFloat(this.sg1.cells(7,i));					
				}
			}			
			this.e_total.setText(floatToNilai(Math.round(total * 100)/100));			
		}catch(e)
		{
			alert("[]"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 0) {				
			this.sg1.validasi();
		}
	},		
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) == "INPROG") this.sg1.cells(0,row,"REVERSE");
		else this.sg1.cells(0,row,"INPROG");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_produk_rptProyekBebanRev";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);
			this.sg3.clear(1);
			this.sg1.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);		
			this.doClick();		
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1+a.nilai2 as nilai "+
		             "from trans_m a "+
		             "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and posted='F' and modul ='PR' and form='REVDUMMY'";	
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;					
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				this.cb_proyek.setSQL("select a.kode_proyek, a.nama "+
									  "from pr_proyek a inner join trans_m b on a.kode_proyek =b.no_dokumen and a.kode_lokasi=b.kode_lokasi and b.modul='PR' and b.form='REVDUMMY' "+
									  "where b.no_bukti='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.progress='1'",["a.kode_proyek","a.nama"],false,["Kode","Nama"],"and","Data Proyek",true);
									  
				var strSQL = "select * from trans_m a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_proyek.setText(line.no_dokumen);
						this.cb_pp.setText(line.kode_pp);						
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik1);											
					}
				}																

				var strSQL = "select d.param1 as kode_vendor,c.kode_akun,e.kode_akun as akun_hutang,c.nilai,c.kode_drk,c.no_bukti,convert(varchar,d.tanggal,103) as tgl,d.keterangan "+
							 "from pr_or_d c "+
							 "inner join trans_m d on c.no_bukti=d.no_bukti and c.kode_lokasi=d.kode_lokasi "+						
							 "inner join trans_j e on d.no_bukti=e.no_bukti and e.kode_lokasi=d.kode_lokasi and e.jenis='HUTDUMMY' "+						
							 "where c.no_reverse='"+this.e_nb.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData(["REVERSE",line.no_bukti,line.tgl,line.keterangan,line.kode_akun,line.akun_hutang,line.kode_drk,floatToNilai(line.nilai),line.kode_vendor]);
					}
				} else this.sg1.clear(1);

				this.sg1.validasi();
														
			}									
		} catch(e) {alert(e);}
	}
});