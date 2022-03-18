window.app_saku3_transaksi_sapyakes_fPHmigrasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fPHmigrasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fPHmigrasi";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Piutang - Hutang", 0);	
		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Lokasi Bayar","NIK Approve"],
					colWidth:[[5,4,3,2,1,0],[150,150,100,310,100,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		this.bLoad4 = new portalui_imageButton(this.sgn4,{bound:[this.sgn4.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad4"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,222,20],caption:"Lokasi Bayar", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,222,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2});								
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,10,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});								
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[668,14,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,325], childPage:["Data Billing","Jurnal Akru","Daftar Atensi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:0,
				colTitle:["No Hutang"],
				colWidth:[[0],[150]],pasteEnable:true,
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK","Kode SAP","Rek SAP"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,100,150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7,8,9],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[930,5,100,25],caption:"Preview",selected:true,visible:false});		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
		            colTitle:["Nama Rekening","No Rekening","Bank","Cabang","Pensiun","Pegawai","PPH","Total","Bank Transfer","Kode Mitra","Nama Mitra"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[200,80,80,100,100,100,100,300,80,200,200]],
					readOnly :true,
					colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg3});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
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
			
			this.flagGarFree = "0"; this.ppBPCC = "-";
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('GARFREE','PPBPCC','SAPPH') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;							
					if (line.kode_spro == "PPBPCC") this.kodepp = line.flag;	
					if (line.kode_spro == "SAPPH") this.akunTemp = line.flag;				
				}
			}
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('SAPPH')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "SAPPH") this.akunTemp = line.flag;				
				}
			}
			
			this.sg.clear(1);
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi in ('"+this.app._kodeLokasiPusat+"','"+this.app._lokasi+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Bayar",true);			
			this.cb_lokasi.setText("","");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fPHmigrasi.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fPHmigrasi.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_hutang_m where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_hutang_j where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_hutang_d set no_rekon='-',no_kas='-' where no_kas ='"+this.e_nb.getText()+"' ");						
						sql.add("delete from glsap where no_dokumen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
										
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "0"){
								sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,kode_rek) values "+
										"('"+this.e_nb.getText()+"','"+this.sg2.cells(8,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','HUTKES','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1,'"+this.sg2.cells(9,i)+"')");								
							}
						}
					}										
					var nobukti = ""; 
					var totHut = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							nobukti += ",'"+this.sg.cells(0,i)+"'";							
						}
					}
					totHut += nilaiToFloat(this.e_debet.getText()); 
					
					sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user,kode_loktuj,no_app,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.kodepp+"','MIGRASI','BILL','IDR',1,"+totHut+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','-','0')");
					
					nobukti = nobukti.substr(1);					
					sql.add("update yk_hutang_d set no_rekon='SAPDOC',no_kas='"+this.e_nb.getText()+"' where no_hutang in ("+nobukti+")");
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_hutang+no_dokumen,no_urut,kode_lokasi,'PH',jenis,no_hutang,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"', "+
							"(case when jenis in ('BP','CC') then no_dokumen else '-' end) as kode_cust, "+
							"'-','-',"+
							"(case when jenis in ('PEGAWAI','PENSIUN','PPH') then no_dokumen else '-' end) as kode_vendor,"+
							"'-','-','-',kode_rek,'-','T' "+
							"from yk_hutang_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_hutang='"+this.e_nb.getText()+"'");
				
					
					sql.add("update glsap set kode_vendor='-',kode_rek='-',paymetod='-' "+
							"where no_dokumen='"+this.e_nb.getText()+"' and dc='D'");
							
					//update spesial gl utl=k cust dan vendor		
					sql.add("update a set a.kode_task = b.spe_gl "+
							"from glsap a inner join sap_spe_gl b on a.kode_vendor=b.kode_mitra and a.kode_akun=b.kode_akun and b.jenis='VENDOR' "+
							"where a.no_dokumen='"+this.e_nb.getText()+"'");
						
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
					this.sg.clear(1);this.sg2.clear(1);this.sg3.clear(1);this.sg4.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.doClick(this.i_gen);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.sg2.validasi();
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
				else this.simpan();
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
					sql.add("delete from yk_hutang_m where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_hutang_j where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_hutang_d set no_rekon='-',no_kas='-' where no_kas ='"+this.e_nb.getText()+"' ");						
					sql.add("delete from glsap where no_dokumen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},		
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg2.clear(1);this.sg3.clear(1);this.sg4.clear(1);
				this.e_debet.setText("0");
				this.e_kredit.setText("0");
				this.bTampil.show();
				this.i_appAll.show();
				this.bJurnal.show();
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_hutang_m","no_hutang",this.app._lokasi+"-PH"+this.e_periode.getText().substr(2,4)+".","000"));
			this.cb_app.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}
		if (sender == this.i_appAll) {
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) this.sg.cells(0,i,"APP");
			}
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
   	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg2.clear(1);
			this.sg2.validasi();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1);this.sg2.clear(1);this.sg3.clear(1); this.sg4.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.doClick(this.i_gen);
			
		} catch(e) {
			alert(e);
		}
	},
	doJurnal:function(sender){		
		try {
			var nobukti = "";
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {
					nobukti += ",'"+this.sg.cells(0,i)+"'";
				}
			}
			nobukti = nobukti.substr(1);
			if (nobukti == "") nobukti = "''";			
			//PIUTANG dan HUTANG
			var strSQL = "select "+
						"case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end as ket, "+
						"case f.jenis when 'PENSIUN' then '21010152' else '21010151' end as kode_akun,c.nama as nama_akun,'D' as dc, sum(a.nilai - a.pph) as nilai,  "+
						"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis,'-' as kode_drk,'-' as nama_drk, b.kode_sap as atensi, b.kode_rek "+
						"from yk_bill_d a "+
						"inner join yk_loker ff on a.loker=ff.loker "+
						"inner join cust f on ff.kode_cust=f.kode_cust "+						
						"inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						"inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi  "+
						"inner join masakun c on (case f.jenis when 'PENSIUN' then '21010152' else '21010151' end)=c.kode_akun and b.kode_lokasi=c.kode_lokasi  "+
						"inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi  "+
						"where d.no_hutang in ("+nobukti+") and d.kode_lokasi='"+this.app._lokasi+"' and (a.nilai+a.pph) <> 0 "+
						"group by case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end, "+
						"         case f.jenis when 'PENSIUN' then '21010152' else '21010151' end,c.nama, "+
						"         case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end,b.kode_sap, b.kode_rek "+		
														
						"union all "+													
						
						"select "+
						"case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end as ket, "+
						"case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end as kode_akun,c.nama as nama_akun,'C' as dc, sum(a.nilai - a.pph) as nilai,  "+
						"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis,'-' as kode_drk,'-' as nama_drk, b.kode_sap as atensi, b.kode_rek  "+
						"from yk_bill_d a "+
						"inner join yk_loker ff on a.loker=ff.loker "+
						"inner join cust f on ff.kode_cust=f.kode_cust "+						
						"inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						"inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi  "+
						"inner join masakun c on (case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end)=c.kode_akun and b.kode_lokasi=c.kode_lokasi  "+
						"inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi  "+
						"where  d.no_hutang in ("+nobukti+") and d.kode_lokasi='"+this.app._lokasi+"' and (a.nilai+a.pph) <> 0 "+
						"group by case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end, "+
						"         case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end,c.nama, "+
						"         case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end, b.kode_sap, b.kode_rek "+							
						
						"order by dc desc,kode_akun";
						
						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk,line.atensi,line.kode_rek.toUpperCase()]);
				}
			}
			this.sg2.validasi();								
			this.pc1.setActivePage(this.pc1.childPage[1]);
			
			strSQL = "select b.nama_rek,b.no_rek,b.bank,b.cabang,a.kode_vendor,b.nama as vendor,b.bank_trans,"+
					" 		isnull(sum(case when bb.jenis = 'PENSIUN' then a.nilai else 0 end),0) as pensiun, "+
					" 		isnull(sum(case when bb.jenis <> 'PENSIUN' then a.nilai else 0 end),0) as pegawai, "+
					"       isnull(sum(a.pph),0) as pph, "+
					" 		isnull(sum(case when bb.jenis = 'PENSIUN' then a.nilai else 0 end),0) + isnull(sum(case when bb.jenis <> 'PENSIUN' then a.nilai else 0 end),0) - isnull(sum(a.pph),0) as total "+
					" from yk_bill_d a "+
					"    inner join yk_loker cc on a.loker=cc.loker "+
					"    inner join cust bb on cc.kode_cust=bb.kode_cust "+
					"    inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					"    inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi "+
					" where a.no_hutang in ("+nobukti+")  "+
					" group by b.nama_rek,b.no_rek,b.bank,b.cabang,a.kode_vendor,b.nama,b.bank_trans order by b.bank_trans,a.kode_vendor+' - '+b.nama";
						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.nama_rek,line.no_rek,line.bank,line.cabang,floatToNilai(line.pensiun),floatToNilai(line.pegawai),floatToNilai(line.pph),floatToNilai(line.total),line.bank_trans,line.kode_vendor,line.vendor]);
				}
			}			
		}
		catch(e) {
			systemAPI.alert("step : "+step+"; error = "+e);
		}
	},
	doLoad4:function(sender){																				
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_loktuj+' - '+c.nama as lokbayar,a.nik_setuju+' - '+b.nama as nama "+
		             "from yk_hutang_m a inner join karyawan b on a.nik_setuju=b.nik "+
					 "                   inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+					 
					 "where a.modul = 'MIGRASI' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') and a.posted='F' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);			
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line.no_hutang,line.tgl,line.keterangan,floatToNilai(line.nilai),line.lokbayar,line.nama]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg4.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.bTampil.hide();
				this.i_appAll.hide();
				this.bJurnal.hide();
		
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg4.cells(0,row));								
								
				var strSQL = "select keterangan,tanggal,nik_setuju "+
							 "from yk_hutang_m "+							 
							 "where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);																		
						this.cb_app.setText(line.nik_setuju);						
					}					
				}					
				var strSQL = "select distinct no_hutang "+
							 "from yk_hutang_d  "+
							 "where no_kas = '"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_hutang]);
					}
				} else this.sg.clear(1);				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.no_dokumen,a.kode_rek "+
							"from yk_hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							"                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.no_hutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk,line.nama_drk,line.no_dokumen,line.kode_rek]);
					}
				} else this.sg2.clear(1);
				
			}									
		} catch(e) {alert(e);}
	}	
});