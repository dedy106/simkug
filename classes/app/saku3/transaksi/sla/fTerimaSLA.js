window.app_saku3_transaksi_sla_fTerimaSLA = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sla_fTerimaSLA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fTerimaSLA";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi SLA", 0);	
						
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Approval","List Approval"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Periode","Deskripsi"],
					colWidth:[[3,2,1,0],[400,80,80,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});						
		this.bTampil = new button(this.pc2.childPage[0],{bound:[890,14,80,18],caption:"Load Data",click:[this,"doLoad"]});			

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,350], childPage:["Daftar Master","Data Rekap","Master SLA","Trial Balance"]});							
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:0,
				colTitle:["Cocd","Nama Perusahaan","No Dokumen","Deskripsi","Periode"],
				colWidth:[[4,3,2,1,0],[70,300,100,250,100]],
				readOnly:true, 				
				dblClick:[this,"doDoubleClick4"],			
				defaultRow:1,autoAppend:false}); 
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});

		this.e_cocd = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"CoCd", readOnly:true});						
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-63],colCount:5, tag:0,
				colTitle:["Jenis","Total KKP","Nilai TB","Selisih","Catatan"],
				colWidth:[[4,3,2,1,0],[300,150,150,150,150]],
				readOnly:true, 				
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]], 	
				dblClick:[this,"doDoubleClick"],			
				defaultRow:1,autoAppend:false}); 
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:17,tag:0,
				colTitle:["ID SLA", "Classification", "Deskripsi", "Mitra", "Curr", 
						  "Princ. YAJT Gross", "Unamortised YAJT", "Princ. Net YAJT", "Interest YAJT", "Cash Out YAJT", "Fair Value YAJT", 
						  "Princ. Gross KJPA", "Unamortised KJPA", "Princ. Net KJPA", "Interest KJPA", "Cash Out KJPA", "Fair Value KJPA"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100, 100,100,100,100,100,100,  50,150,200,150,100]],
				readOnly:true,
				colFormat:[[5,6,7,8,9,10,11,12,13,14,15,16],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
				defaultRow:1,autoAppend:false  });
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1,pager:[this,"doPager1"]});

		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:0,				
			colTitle:["Jenis","Kode Akun","Nama","Nilai"],
			colWidth:[[3,2,1,0],[100,200,100,100]],
			readOnly:true,			
			colFormat:[[3],[cfNilai]],				
			defaultRow:1,autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});				

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			//this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.dp_d1.setText("30/09/2020");
						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fTerimaSLA.extend(window.childForm);
window.app_saku3_transaksi_sla_fTerimaSLA.implement({	
	doLoad: function() {
		var strSQL = "select a.no_app,a.keterangan,a.kode_cocd,b.company_name as nama,a.periode "+
					 "from sla_app_m a inner join mysym_company_code b on a.kode_cocd=b.cocd "+
					 "where a.modul='GEN' and a.no_ver<>'-' and a.no_terima='-'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sg4.clear();
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];																	
				this.sg4.appendData([line.kode_cocd,line.nama,line.no_app,line.keterangan,line.periode]);
			}				
		} else this.sg4.clear(1);
	},		
	doDoubleClick4: function(sender, col , row) {
		try{
			this.pc1.setActivePage(this.pc1.childPage[1]);	
			this.nogen = this.sg4.cells(2,row);
			this.cocd = this.sg4.cells(0,row);
			this.periode = this.sg4.cells(4,row);
			this.e_cocd.setText(this.sg4.cells(0,row)+" - "+this.sg4.cells(1,row));

			var strSQL = "select * from sla_app_d where no_app='"+this.nogen+"' and kode_cocd='"+this.cocd+"' order by nu";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																										
					this.sg.appendData([line.jenis,floatToNilai(line.nilai),floatToNilai(line.nilai_tb),floatToNilai(line.selisih),line.keterangan]);
				}
			} else this.sg.clear(1);
			
			var strSQL = "select b.jenis,a.kode_akun,c.short_text as nama,a.nilai "+
						 "from sla_tb a "+
						 "inner join sla_subclass_akun b on a.kode_akun=b.kode_akun and a.kode_cocd=b.kode_cocd and a.periode=b.periode "+
						 "inner join mysym_f19_gl_account c on a.kode_akun=c.gl_acct and a.kode_cocd=c.cocd "+
						 "where a.no_gen='"+this.nogen+"' and a.kode_cocd='"+this.cocd+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sg2.clear();
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];																	
					this.sg2.appendData([line.jenis,line.kode_akun,line.nama,floatToNilai(line.nilai)]);
				}				
			} else this.sg2.clear(1);

			var amorYAJT = amorKJPA = intYAJT = intKJPA = coYAJT = coKJPA = fvYAJT = fvKJPA = 0;
			var strSQL = "select a.no_sla,b.classification,b.deskripsi,b.bank,b.kode_curr, "+
						"sum(case when a.tahun = '"+this.periode.substr(0,4)+"' then pricipal_gross else 0 end) as principal_gross_yajt, "+
						"sum(case when a.tahun = '"+this.periode.substr(0,4)+"' then amortisasi else 0 end) as amortisasi_yajt, "+
						"sum(case when a.tahun = '"+this.periode.substr(0,4)+"' then pricipal_net else 0 end) as principal_net_yajt, "+
						"sum(case when a.tahun = '"+this.periode.substr(0,4)+"' then interest else 0 end) as interest_yajt, "+
						"sum(case when a.tahun = '"+this.periode.substr(0,4)+"' then cash_out else 0 end) as cash_out_yajt, "+
						"sum(case when a.tahun = '"+this.periode.substr(0,4)+"' then fair_value else 0 end) as fair_value_yajt, "+
						"sum(case when a.tahun > '"+this.periode.substr(0,4)+"' then pricipal_gross else 0 end) as principal_gross_kjpa, "+
						"sum(case when a.tahun > '"+this.periode.substr(0,4)+"' then amortisasi else 0 end) as amortisasi_kjpa, "+
						"sum(case when a.tahun > '"+this.periode.substr(0,4)+"' then pricipal_net else 0 end) as principal_net_kjpa, "+
						"sum(case when a.tahun > '"+this.periode.substr(0,4)+"' then interest else 0 end) as interest_kjpa, "+
						"sum(case when a.tahun > '"+this.periode.substr(0,4)+"' then cash_out else 0 end) as cash_out_kjpa, "+
						"sum(case when a.tahun > '"+this.periode.substr(0,4)+"' then fair_value else 0 end) as fair_value_kjpa "+

						"from sla_master_d a "+
						"inner join sla_master b on a.no_sla=b.no_sla and a.kode_cocd=b.kode_cocd "+
						"where b.no_gen='"+this.nogen+"' and a.kode_cocd='"+this.cocd+"' "+
						"group by a.no_sla,b.classification,b.deskripsi,b.bank,b.kode_curr ";
						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sg1.clear();				
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];												
					this.sg1.appendData([line.no_sla,line.classification,line.deskripsi,line.bank,line.kode_curr,
						floatToNilai(line.principal_gross_yajt),floatToNilai(line.amortisasi_yajt),floatToNilai(line.principal_net_yajt),
						floatToNilai(line.interest_yajt),floatToNilai(line.cash_out_yajt),floatToNilai(line.fair_value_yajt),
						floatToNilai(line.principal_gross_kjpa),floatToNilai(line.amortisasi_kjpa),floatToNilai(line.principal_net_kjpa),
						floatToNilai(line.interest_kjpa),floatToNilai(line.cash_out_kjpa),floatToNilai(line.fair_value_kjpa)]);
					amorYAJT += parseFloat(line.amortisasi_yajt);
					amorKJPA += parseFloat(line.amortisasi_kjpa);
					intYAJT += parseFloat(line.interest_yajt);
					intKJPA += parseFloat(line.interest_kjpa);
					coYAJT += parseFloat(line.cash_out_yajt);
					coKJPA += parseFloat(line.cash_out_kjpa);
					fvYAJT += parseFloat(line.fair_value_yajt);
					fvKJPA += parseFloat(line.fair_value_kjpa);
				}				
			} else this.sg1.clear(1);

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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sla_app_m","no_app","VER"+this.e_periode.getText().substr(2,4)+".","000"));								
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					 															
					if (this.stsSimpan == 0) {
						sql.add("delete from sla_app_m where no_app='"+this.e_nb.getText()+"' ");						
						sql.add("update sla_app_m set no_terima='-' where modul='GEN' and no_app='"+this.nogen+"' and kode_cocd='"+this.cocd+"'");		
					}															
									
					sql.add("insert into sla_app_m (no_app,tanggal,keterangan,nik_app,periode,nik_user,tgl_input,kode_cocd,modul,no_ver,no_terima) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.periode+"','"+this.app._userLog+"',getdate(),'"+this.cocd+"','TERIMA','"+this.nogen+"','X')");										
					sql.add("update sla_app_m set no_terima='"+this.e_nb.getText()+"' where modul='GEN' and no_app='"+this.nogen+"' and kode_cocd='"+this.cocd+"'");		
										
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
					this.sg.clear(1);
					this.sg1.clear(1);											
					this.sg2.clear(1);											
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);							
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";											
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :															
					this.preView = "0";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sla_app_m where no_app='"+this.e_nb.getText()+"'");						
					sql.add("update sla_app_m set no_terima='-' where modul='GEN' and no_app='"+this.nogen+"' and kode_cocd='"+this.cocd+"'");		
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);									
				break								
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
			this.dataJU = {rs:{rows:[]}};			
			this.sg.clear(1);
			this.sg1.clear(1);											
			this.sg2.clear(1);											
		}
		catch(e) {
			alert(e);
		}
	},					
	doChange:function(sender){		
		if ((sender == this.e_periode) && this.stsSimpan == 1) this.doClick();				
	},	
	doClick:function(sender){				
		if (this.e_periode.getText()!= "") {			
			this.stsSimpan = 1;			
			this.sg.clear(1); 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sla_app_m","no_app","VER"+this.e_periode.getText().substr(2,4)+".","000"));								
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	 		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if (this.preView == "1") {								
								// this.nama_report="server_report_saku2_kopeg_sju_rptKbRincianAkru";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_akru='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1);
			this.sg1.clear(1);											
			this.sg2.clear(1);											
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);			
			this.doLoad3();
			this.stsSimpan = 1;			
			this.dataJU = {rs:{rows:[]}};					
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_app,convert(varchar,a.tanggal,105) as tgl,a.periode,a.keterangan "+
		             "from sla_app_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.modul='TERIMA'";					 
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
			this.sg3.appendData([line.no_app,line.tgl,line.periode,line.keterangan]); 
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
				
				var strSQL = "select * from sla_app_m where no_app = '"+this.e_nb.getText()+"' ";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cocd = line.kode_cocd;		
						this.periode = line.periode;		
						this.nogen = line.no_ver;		

						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);							
					}
				}	

				var strSQL = "select a.no_app,a.keterangan,a.kode_cocd,b.nama,a.periode "+
							"from sla_app_m a inner join sla_cocd b on a.kode_cocd=b.kode_cocd "+
							"where a.modul='GEN' and a.no_terima='"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sg4.clear();
					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];																	
						this.sg4.appendData([line.kode_cocd,line.nama,line.no_app,line.keterangan,line.periode]);
					}				
				} else this.sg4.clear(1);

				this.doDoubleClick4(this.sg4,0,row);
			}			
		} catch(e) {alert(e);}
	}
});
