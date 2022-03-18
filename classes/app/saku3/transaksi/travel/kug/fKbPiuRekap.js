window.app_saku3_transaksi_travel_kug_fKbPiuRekap = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_kug_fKbPiuRekap.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_kug_fKbPiuRekap";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pelunasan Piutang Rekap", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Bayar","List Bayar"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
		            colTitle:["No KasBank","Tanggal","No Tagihan","Deskripsi","Mitra","Nilai","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,100,200,200,150,80,100]],
					readOnly:true,
					colFormat:[[5,6],[cfNilai,cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],													 							
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});										
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});									
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,15,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,19,200,20],caption:"Nilai KasBank", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.i_dis = new portalui_imageButton(this.pc2.childPage[0],{bound:[975,19,20,20],hint:"Distribusi",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});								

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,292], childPage:["Data Invoice"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,
				colTitle:["No Invoice","Dokumen","No FP","Tanggal","Deskripsi","Akun AR","Tagihan+","PP","Terbayar"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,80,320,80,120,150,120]],
				colHide:[[5,7],[true,true]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],				
				colFormat:[[6,8],[cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_kug_fKbPiuRekap.extend(window.childForm);
window.app_saku3_transaksi_travel_kug_fKbPiuRekap.implement({
	doHitung: function(){
		var nBayar = nilaiToFloat(this.e_total.getText());
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && nBayar != 0){
				if (nBayar > nilaiToFloat(this.sg1.cells(6,i))) {
					this.sg1.cells(8,i,this.sg1.cells(6,i));
					nBayar = nBayar - nilaiToFloat(this.sg1.cells(6,i));
				}
				else {
					this.sg1.cells(8,i,nBayar);
					nBayar = 0;
				}
			}
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
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from piubayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBREKAP','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_cust.getText()+"','"+this.cb_akun.getText()+"','BM')");
							
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+parseNilai(this.e_total.getText())+","+
							parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','KB','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");					
										
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(8,i) != "0"){
							var j=i+1000;
							var nilaiPiu = nilaiToFloat(this.sg1.cells(8,i));
							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg1.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg1.cells(5,i)+"','C',"+nilaiPiu+","+
									nilaiPiu+",'"+this.e_ket.getText()+"','KB','PIUTANG','IDR',1,'"+this.sg1.cells(8,i)+"','-','"+this.cb_cust.getText()+"','-','-','-','"+this.sg1.cells(0,i)+"','-','-')");											

							sql.add("insert into piubayar_d(no_bukti,no_piutang,kode_lokasi,modul,periode,nik_user,tgl_input,dc,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','KBMULTI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'D',"+nilaiPiu+")");
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
					this.sg1.clear(1); this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.sg1.validasi();								
				
				if (this.totDetail != nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak sama dengan Detail Bayar.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh melebihi Saldo Tagihan.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;							
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from piubayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
			this.doClick();
		}	
		if (sender == this.cb_cust && this.cb_cust.getText()!="" && this.stsSimpan==1 ) {			
			var strSQL = "select a.no_piutang,a.no_dokumen,a.no_fp,CONVERT(varchar,a.tanggal,103) as tanggal,a.keterangan,a.akun_piutang,a.nilai+a.nilai_ppn-ISNULL(b.bayar,0) as saldo,a.kode_pp "+
						 "from piutang_d a "+						 
						 "     left join ("+

						 "      select no_piutang,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
						 "      from piubayar_d group by no_piutang,kode_lokasi) b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+

						 "where a.kode_cust ='"+this.cb_cust.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.nilai+a.nilai_ppn-ISNULL(b.bayar,0) >0 ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_piutang,line.no_dokumen,line.no_fp,line.tanggal,line.keterangan,line.akun_piutang,floatToNilai(line.saldo),line.kode_pp,"0"]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
		}		
				
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);				
				this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();				
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var saldo = 0;		
			this.totDetail = 0;	
			for (var i = 0; i < this.sg1.rows.getLength();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != "") {
					saldo += nilaiToFloat(this.sg1.cells(6,i));
					this.totDetail += nilaiToFloat(this.sg1.cells(8,i));
				}
			}			
			this.e_saldo.setText(floatToNilai(Math.round(saldo * 100)/100));			
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
								this.nama_report="server_report_saku3_travel_rptPiutangKasJurnal";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
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
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,b.kode_cust+' - '+ b.nama as cust, a.nilai1 "+
		             "from trans_m a "+
					 "inner join cust b on a.param1=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'KBREKAP' and a.posted ='F'";					 
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,line.cust,floatToNilai(line.nilai1),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 6) this.doDoubleClick3(this.sg,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from trans_m "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.param2);				
						this.e_total.setText(floatToNilai(line.nilai1));				
						this.cb_cust.setText(line.param1);				
						this.cb_cust.setSQL("select kode_cust, nama from cust where kode_cust='"+line.param1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Cust",true);									
					}
				}
				
				var strSQL = "select a.no_piutang,a.no_dokumen,a.no_fp,CONVERT(varchar,a.tanggal,103) as tanggal,a.keterangan,a.akun_piutang,a.nilai+a.nilai_ppn-ISNULL(b.bayar,0) as saldo, a.kode_pp,c.nilai as bayar "+
							 "from piutang_d a  "+
							 "	    inner join piubayar_d c on a.no_piutang=c.no_piutang and a.kode_lokasi=c.kode_lokasi "+		 
							 
							 "		left join ("+
							 "				select no_piutang,kode_lokasi,SUM(case dc when 'D' then nilai else -nilai end) as bayar "+
							 "				from piubayar_d where kode_lokasi ='"+this.app._lokasi+"' and no_bukti <>'"+this.e_nb.getText()+"' "+
							 "				group by no_piutang,kode_lokasi "+
							 "		) b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
							 
							 "where c.no_bukti ='"+this.e_nb.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.no_piutang,line.no_dokumen,line.no_fp,line.tanggal,line.keterangan,line.akun_piutang,floatToNilai(line.saldo),line.kode_pp,floatToNilai(line.bayar)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();

			}						
		} catch(e) {alert(e);}
	}
});