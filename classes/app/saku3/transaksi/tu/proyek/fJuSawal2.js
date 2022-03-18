window.app_saku3_transaksi_tu_proyek_fJuSawal2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fJuSawal2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fJuSawal2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekon Pelunasan Billing Saldo Awal [Non PAJAK]", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Rekon","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		
		this.c_periode = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai Jurnal", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					
		
		this.cb_bukti = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No Jurnal", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Total Rekon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					
		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});									
		this.e_sisa = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Nilai Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[690,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		

		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,290], childPage:["Data Invoice","Bukti TAK"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
				colTitle:["No Bill","No Proyek","Deskripsi","Akun AR","Saldo Tagihan","N Rekon","PP / Unit","Customer"],
				colWidth:[[7,6,5,4,3,2,1,0],[200,80,100,100,60,320,150,100]],
				columnReadOnly:[true,[0,1,2,3,4,6,7],[5]],				
				colFormat:[[4,5],[cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		/*
		this.cb_pph = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun PPh", multiSelection:false, maxLength:10, tag:1});				
		this.e_pph = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Nilai PPh", tag:1, tipeText:ttNilai, text:"0"});					
		
		this.cb_lokasi = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});				
		this.cb_tak = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Akun TAK", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});					
		this.e_nbtak = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"No TAK",maxLength:30,readOnly:true});
		this.e_tak = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Nilai TAK", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		*/

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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi ='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}
			this.c_periode.setText("");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fJuSawal2.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fJuSawal2.implement({
	doTampilClick : function() {
		var strSQL = "select a.no_bill,a.kode_proyek,a.akun_piutang,a.keterangan,round(a.total-isnull(b.bayar,0),2) as saldo,a.kode_pp,a.cust "+
					"from ( "+						 						 
					
					"  select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi, sum(a.nilai) as total,a.kode_pp, a.kode_cust+' | '+b.nama as cust "+ 						 
					"  from tu_prbill_m a  inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					"  where a.modul='BILL'  and (a.nilai) > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
					"  group by a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi,a.kode_pp,b.nama "+						 
					")a  "+						 
				
					"left join ( "+						
					"    select no_dokumen,kode_lokasi,sum(case dc when 'C' then nilai else -nilai end) as bayar  "+
					"    from ju_j where kode_lokasi='"+this.app._lokasi+"' and jenis='PIU' "+
					"	  group by no_dokumen,kode_lokasi "+
					") b "+

					"on a.no_bill=b.no_dokumen and a.kode_lokasi=b.kode_lokasi "+						 
					
					"where a.total>isnull(b.bayar,0) and a.kode_lokasi ='"+this.app._lokasi+"' order by a.no_bill";
	
	var data = this.dbLib.getDataProvider(strSQL,true);
	if (typeof data == "object" && data.rs.rows[0] != undefined){
		var line;
		this.sg1.clear();
		for (var i in data.rs.rows){
			line = data.rs.rows[i];												
			this.sg1.appendData([line.no_bill,line.kode_proyek,line.keterangan,line.akun_piutang,floatToNilai(line.saldo),"0",line.kode_pp,line.cust]);
		}
	} else this.sg1.clear(1);
	this.sg1.validasi();
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
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					} 
					
					var tot = nilaiToFloat(this.e_total.getText()); 					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_bukti.getText()+"','"+this.e_ket.getText()+"','-','PIUPRO2','REKON','IDR',1,"+tot+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','"+this.c_periode.getText()+"','"+this.cb_akun.getText()+"',getdate(),'"+this.app._userLog+"')");					
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_bukti.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+tot+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','PIUPRO2','TITIP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "0"){							
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(3,i)+"','Pelunasan atas Bill "+this.sg1.cells(0,i)+"','C',"+nilaiToFloat(this.sg1.cells(5,i))+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','PIUPRO2','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
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
					this.sg1.clear(1); this.sg3.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :		
				
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();	
				this.doChange(this.e_total);
										
				for (var i = 0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.rowValid(i)) {
						if (nilaiToFloat(this.sg1.cells(5,i)) > nilaiToFloat(this.sg1.cells(4,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Rekon melebihi Tagihan. (Baris "+k+")");
							return false;						
						}						
					}
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Rekon tidak boleh nol atau kurang.");
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
					sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}	
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){				
		if (sender == this.cb_lokasi) {
			if (this.cb_lokasi.getText() == "") {
				this.e_nbtak.setText("");
				this.e_tak.setText("0");
			}
			else {
				this.e_nbtak.setText(this.e_nb.getText());							
			}			
		}
		
		if (sender == this.e_periode && this.stsSimpan==1) {
			this.doClick();			
		}
		
		if (sender == this.c_periode && this.c_periode.getText()!="") {
			this.cb_bukti.setSQL("select distinct no_bukti,keterangan from gldt where periode='"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
								 "union all "+
								 "select distinct no_bukti,keterangan from gldt_h where periode='"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
								 ["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Jurnal",true);		
		}
		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
			this.cb_akun.setSQL("select distinct a.kode_akun,a.nama from masakun a inner join gldt b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where b.no_bukti='"+this.cb_bukti.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and b.dc ='C' "+
								 "union all "+
								 "select distinct a.kode_akun,a.nama from masakun a inner join gldt_h b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where b.no_bukti='"+this.cb_bukti.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and b.dc ='C' ",
								 ["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Daftar Akun",true);		
		}		
		if (sender == this.cb_akun && this.cb_akun.getText() != "") {
			if (this.c_periode.getText() == this.app._periode) {
				var strSQL = "select sum(nilai) as nilai from gldt "+
						 	 "where dc ='C' and kode_akun='"+this.cb_akun.getText()+"' and no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			}
			else {
				var strSQL = "select sum(nilai) as nilai from gldt_h "+
						 	 "where dc ='C' and kode_akun='"+this.cb_akun.getText()+"' and no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			}									 	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					var nilai = parseFloat(line.nilai);										
				}
			}	
			
			var pakai = 0;
			var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as pakai from ju_j "+
						 "where no_dokumen='"+this.cb_bukti.getText()+"' and kode_akun='"+this.cb_akun.getText()+"' and no_ju <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					var pakai = parseFloat(line.pakai);										
				}
			}	
			
			this.e_saldo.setText(floatToNilai(nilai - pakai));	
		}	
		
		if ((sender == this.e_total || sender == this.e_saldo) && this.e_total.getText() != "" && this.e_saldo.getText() != "") {
			var sisa = nilaiToFloat(this.e_saldo.getText()) - nilaiToFloat(this.e_total.getText());
			this.e_sisa.setText(floatToNilai(Math.round(sisa * 100)/100));				
		}
				
		/*
		if ((sender == this.e_saldo || sender == this.e_total || sender == this.e_tak) && this.e_saldo.getText()!="" && this.e_total.getText()!="" && this.e_tak.getText()!="" ) {
			var pph = nilaiToFloat(this.e_total.getText())+nilaiToFloat(this.e_tak.getText()) - nilaiToFloat(this.e_saldo.getText());
			this.e_pph.setText(floatToNilai(pph));
		}
		*/		
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {
					this.sg1.clear(1);
					this.sg3.clear(1);
				}
				this.stsSimpan = 1;			
				//this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-RPP"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_ket.setFocus();
				setTipeButton(tbSimpan);
			}
		}
		catch(e) {
			alert(e);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var rekon = 0;			
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "") {
					rekon += nilaiToFloat(this.sg1.cells(5,i));
				}
			}			
			this.e_total.setText(floatToNilai(Math.round(rekon * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 5) {				
			this.sg1.validasi();
		}
	},	
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(5,row) == "0") this.sg1.cells(5,row,this.sg1.cells(4,row));
		else this.sg1.cells(5,row,"0");
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tm_rptPiutangJuJurnalPry";
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
			this.sg1.clear(1); this.sg3.clear(1); 					
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.stsSimpan = 1;
			this.doClick();		
		} catch(e) {
			alert(e);
		}
	},		
	
	doLoad3:function(sender){																
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from ju_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PIUPRO2' and a.posted ='F'";
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
			this.sg3.appendData([line.no_ju,line.tgl,line.no_dokumen,line.keterangan]); 
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
						
									
				var strSQL = "select * from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_periode.setText(line.no_link);
						this.cb_bukti.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.ref1);				
						this.e_total.setText(floatToNilai(line.nilai));				
						//this.cb_cust.setSQL("select kode_cust, nama from cust where kode_cust='"+line.no_del+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);									
						//this.cb_cust.setText(line.no_del);																	
					}
				}

				var strSQL = "select a.no_bill,a.kode_proyek,a.akun_piutang,a.keterangan,round(a.total-isnull(b.bayar,0),2) as saldo,a.kode_pp, c.nilai,d.kode_cust+' - '+d.nama as cust "+
							 "from ( "+						 						 
						 
							 "	select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi, sum(a.nilai) as total,a.kode_pp "+ 						 
							 "  from tu_prbill_m a  "+
							 "  where a.modul='BILL' and (a.nilai) > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "  group by a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi,a.kode_pp "+						 
							 ")a  "+	
							 
							 "inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
							 "inner join ju_j c on a.no_bill=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+					 
						
							 "left join ( "+						
							 "    select no_dokumen,kode_lokasi,sum(case dc when 'C' then nilai else -nilai end) as bayar  "+
							 "    from ju_j where no_ju<>'"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='PIU' "+
							 "	  group by no_dokumen,kode_lokasi "+
							 ") b "+

							 "on a.no_bill=b.no_dokumen and a.kode_lokasi=b.kode_lokasi "+						 
						 
							 "where c.no_ju='"+this.e_nb.getText()+"' and c.kode_lokasi ='"+this.app._lokasi+"' order by a.no_bill"; // a.kode_cust='"+this.cb_cust.getText()+"' and a.total>isnull(b.bayar,0) and 
			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.no_bill,line.kode_proyek,line.keterangan,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.nilai),line.kode_pp,line.cust]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();
				
			}						
		} catch(e) {alert(e);}
	}
});