window.app_saku3_transaksi_siaga_simlog_fBaRekon = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_simlog_fBaRekon.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_simlog_fBaRekon";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekosiliasi Hutang - Uang Muka Logistik", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,180,80,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,12,220,20],caption:"Total BAST", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						

		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_adk = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,15,220,20],caption:"Total UM/ADK", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						

		this.cb_spk = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No PO / SPK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});										
		this.e_sls = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Nilai Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,327], childPage:["Data Mitra","Jurnal Terima","Jurnal UM"]});
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Mitra", readOnly:true, tag:2});														
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Alamat", readOnly:true});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-32],colCount:5,
		            colTitle:["No Terima","Tanggal","Keterangan","Kode Akun","Nilai"],
					colWidth:[[4,3,2,1,0],[100,100,450,100,150]],
					colFormat:[[4],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});			
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-32],colCount:5,
					colTitle:["No PB","Tanggal","Keterangan","Kode Akun","Nilai"],
					colWidth:[[4,3,2,1,0],[100,100,450,100,150]],
					colFormat:[[4],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});			
			
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
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fBaRekon.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fBaRekon.implement({	
	isiCBSpk: function() {
		this.cb_spk.setSQL("select a.no_spk, a.keterangan from log_spk_m a "+
						   "where a.no_pks='-' and  a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data PO/SPK",true);						
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
						sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("update log_spk_m set no_pks='-' where no_spk = '"+this.cb_spk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}	

					sql.add("update log_spk_m set no_pks='"+this.e_nb.getText()+"' where no_spk = '"+this.cb_spk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										

					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_spk.getText()+"','"+this.e_ket.getText()+"','-','LOGCLOSE','REKLAS','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','-',getdate(),'"+this.app._userLog+"')");

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){															
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"','D',"+parseNilai(this.sg2.cells(4,i))+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','LOGCLOSE','HUTANG','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.sg2.cells(0,i)+"','-')");									
							}
						}
					}
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){		
								var j = i+1000;													
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg4.cells(3,i)+"','"+this.sg4.cells(2,i)+"','C',"+parseNilai(this.sg4.cells(4,i))+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','LOGCLOSE','UMADK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.sg4.cells(0,i)+"','-')");									
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
					this.sg2.clear(1); this.sg3.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);	
					this.isiCBSpk();
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";
											
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_total.getText()) != nilaiToFloat(this.e_adk.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total BAST dan Total UM/ADK tidak sama.");
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
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("update log_spk_m set no_pks='-' where no_spk = '"+this.cb_spk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																			
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
			this.isiCBSpk();
			this.doClick();		
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_spk && this.cb_spk.getText() != "") {
			var strSQL = "select b.kode_vendor,b.nama,b.alamat "+
						 "from log_spk_m a "+
						 "inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_spk='"+this.cb_spk.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.cb_vendor.setText(line.kode_vendor,line.nama);
					this.e_alamat.setText(line.alamat);					
				}
			}
			
			//jurnal penerimaan barang ambil yg hutang
			var strSQL = "select no_hutang,convert(varchar,tanggal,103) as tgl,keterangan,kode_akun,nilai "+
						 "from hutang_j "+
						 "where no_dokumen='"+this.cb_spk.getText()+"' and modul='LOGBAST' and jenis='HUT' and periode<='"+this.e_periode.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];							
					this.sg2.appendData([line2.no_hutang,line2.tgl,line2.keterangan,line2.kode_akun,floatToNilai(line2.nilai)]);
				}
			} else this.sg2.clear(1);	
			this.sg2.validasi();

			//jurnal UM
			var strSQL = "select a.no_pb,convert(varchar,a.tanggal,103) as tgl,a.keterangan,d.kode_akun,a.nilai "+
						 "from gr_pb_j a inner join gr_pb_m b on a.no_pb=b.no_pb and a.kode_lokasi=b.kode_lokasi "+	
						 "			     inner join hutang_j d on a.no_pb=d.no_hutang and a.kode_lokasi=d.kode_lokasi "+
						 "				 inner join gr_spb2_m c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi and c.no_kas<>'-' "+					 
						 "where b.ref1='"+this.cb_spk.getText()+"' and a.modul='PBADK' and d.jenis='UM' and b.periode<='"+this.e_periode.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];							
					this.sg4.appendData([line2.no_pb,line2.tgl,line2.keterangan,line2.kode_akun,floatToNilai(line2.nilai)]);
				}
			} else this.sg4.clear(1);			
			this.sg4.validasi();

		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg2.clear(1); this.sg3.clear(1); 
				this.isiCBSpk();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},	
	doChangeCell2: function(sender, col, row){
		try {			
			if (col == 0) this.sg2.validasi();					
		}catch(e)
		{
			alert(e);
		}
	},		
	doNilaiChange: function(){
		try{
			var tot2 = tot4 = 0;			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i)){					
					tot2 += nilaiToFloat(this.sg2.cells(4,i));					
				}
			}

			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i)){					
					tot4 += nilaiToFloat(this.sg4.cells(4,i));					
				}
			}

			this.e_total.setText(floatToNilai(tot2));			
			this.e_adk.setText(floatToNilai(tot4));			
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
			this.sg2.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.isiCBSpk();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
					 "from ju_m a "+	 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='LOGCLOSE'";		

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
			this.sg3.appendData([line.no_ju,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
												
				var strSQL = "select  * from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.cb_spk.setSQL("select no_spk, keterangan from log_spk_m where no_spk='"+line.no_dokumen+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data PO/SPK",true);		
						this.cb_spk.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);																													
					}
				}								
				
				var strSQL = "select b.kode_vendor,b.nama,b.alamat "+
							 "from log_spk_m a "+
							 "inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_spk='"+this.cb_spk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_vendor.setText(line.kode_vendor,line.nama);
						this.e_alamat.setText(line.alamat);						
					}
				}
				
				
				
			}									
		} catch(e) {alert(e);}
	}
});