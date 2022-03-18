window.app_saku3_transaksi_bpr_fKbSimpTarik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fKbSimpTarik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fKbSimpTarik";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penarikan Simpanan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
				
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No KasBank","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
				
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,16,210,20],caption:"Status",items:["BK"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,300,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Saldo", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.cb_agg = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Anggota", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Total Ambil", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,285], childPage:["Data Simpanan"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
				colTitle:["No Kartu","Jenis","Deskripsi","Akun Titip","Saldo","Nilai Tarik"],
				colWidth:[[5,4,3,2,1,0],[100,100,80,250,50,120]],
				columnReadOnly:[true,[0,1,2,3,4],[5]],				
				colFormat:[[4,5],[cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
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
						
			this.cb_agg.setSQL("select no_agg, nama from kop_agg where kode_lokasi='"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);			
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fKbSimpTarik.extend(window.childForm);
window.app_saku3_transaksi_bpr_fKbSimpTarik.implement({
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
						sql.add("delete from kop_simpangs_d where no_angs='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KP','KBAMBIL','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+
							"','IDR',1,"+parseNilai(this.e_total.getText())+",0,0,'-','-','-','"+this.cb_akun.getText()+"','-','-','"+this.cb_agg.getText()+"','"+this.c_jenis.getText()+"','-')");
												
					var kasIDR = nilaiToFloat(this.e_total.getText());					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','C',"+kasIDR+","+kasIDR+",'"+this.e_ket.getText()+"','KBAMBIL','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "0"){
							var nilaiTitip = nilaiToFloat(this.sg1.cells(5,i));												
							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(3,i)+"','D',"+nilaiTitip+","+nilaiTitip+",'Pengambilan Simpanan "+this.sg1.cells(0,i)+"','KBAMBIL','TITIP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
							if (this.sg1.cells(1,i) != "BS") var jenis = "SIMP";
							else var jenis = "BSIMP";
							
							sql.add("insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_piutang,nilai,kode_lokasi,dc,periode,modul,no_agg,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','-','"+this.sg1.cells(3,i)+"',"+nilaiTitip+",'"+this.app._lokasi+"','C','"+this.e_periode.getText()+"','SIMPAMBIL','"+this.cb_agg.getText()+"','"+jenis+"')");							
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
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();								
				
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total pengambilan melebihi saldo.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kop_simpangs_d where no_angs='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		try	{
			if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
				this.doClick();			
			}			
			if (sender == this.cb_agg && this.cb_agg.getText()!="" && this.stsSimpan==1) {													 
				var strSQL = "select a.no_simp,a.jenis,e.nama,e.akun_titip,sum(isnull(d.saldo,0)) as saldo "+
							 "from  kop_simp_m a inner join kop_simp_param e on a.kode_param=e.kode_param and a.kode_lokasi=e.kode_lokasi "+
							 "      left outer join "+  
							 "              (select y.no_simp, y.kode_lokasi, sum(case dc when 'D' then y.nilai else -y.nilai end) as saldo "+
							 "               from kop_simpangs_d y inner join trans_m x on y.no_angs=x.no_bukti and y.kode_lokasi=x.kode_lokasi "+
							 "               where y.no_agg = '"+this.cb_agg.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' and y.modul <> 'BTLBILL' and y.jenis <> 'BSIMP' "+
							 "               group by y.no_simp, y.kode_lokasi) d on a.no_simp=d.no_simp and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_agg = '"+this.cb_agg.getText()+"' and a.kode_lokasi= '"+this.app._lokasi+"' "+
							 "group by a.no_simp,a.jenis,e.nama,e.akun_titip "+
							 
							 "union all "+
							 
							 "select a.no_simp,'BS' as jenis,e.nama,e.akun_titip,sum(isnull(d.saldo,0)) as saldo "+
							 "from  kop_simp_m a inner join kop_simp_param e on a.kode_param=e.kode_param and a.kode_lokasi=e.kode_lokasi "+
							 "      left outer join "+  
							 "              (select y.no_simp, y.kode_lokasi, sum(case dc when 'D' then y.nilai else -y.nilai end) as saldo "+
							 "               from kop_simpangs_d y inner join trans_m x on y.no_angs=x.no_bukti and y.kode_lokasi=x.kode_lokasi "+
							 "               where y.no_agg = '"+this.cb_agg.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' and y.modul <> 'BTLBILL' and y.jenis = 'BSIMP' "+
							 "               group by y.no_simp, y.kode_lokasi) d on a.no_simp=d.no_simp and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_agg = '"+this.cb_agg.getText()+"' and a.kode_lokasi= '"+this.app._lokasi+"' and a.jenis='SS' "+
							 "group by a.no_simp,e.nama,e.akun_titip "+
							 
							 "order by a.no_simp"
							 			 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.no_simp,line.jenis.toUpperCase(),line.nama,line.akun_titip,floatToNilai(line.saldo),"0"]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();
			}		
			if (sender == this.c_jenis && this.stsSimpan==1) {
				this.doClick();				
			}																													
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);				
			}
			this.stsSimpan = 1;			
			this.cb_agg.setSQL("select no_agg, nama from kop_agg where kode_lokasi='"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var ambil = saldo = 0;			
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != "" && this.sg1.cells(5,i) != "") {
					saldo += nilaiToFloat(this.sg1.cells(4,i));
					ambil += nilaiToFloat(this.sg1.cells(5,i));
				}
			}			
			this.e_saldo.setText(floatToNilai(Math.round(saldo * 100)/100));			
			this.e_total.setText(floatToNilai(Math.round(ambil * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 5 && sender.cells(5,i) != "") {				
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
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from trans_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'KBAMBIL' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan]); 
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
				
				var strSQL = "select * from trans_m "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.param2);					
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.kode_akun);				
						this.cb_agg.setText(line.param1);				
						this.cb_agg.setSQL("select no_agg, nama from kop_agg where no_agg='"+line.no_link+"' and kode_lokasi='"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);									
					}
				}				
				var strSQL = "select a.no_simp,a.jenis,e.nama,e.akun_titip,isnull(d.saldo,0) as saldo,dd.nilai "+
							 "from  kop_simp_m a inner join kop_simp_param e on a.kode_param=e.kode_param and a.kode_lokasi=e.kode_lokasi "+
							 "                   inner join kop_simpangs_d dd on a.no_simp=dd.no_simp and a.kode_lokasi=dd.kode_lokasi and dd.modul='SIMPAMBIL' "+
							 "      left outer join "+  
							 "              (select y.no_simp, y.kode_lokasi, sum(case dc when 'D' then y.nilai else -y.nilai end) as saldo "+
							 "               from kop_simpangs_d y inner join trans_m x on y.no_angs=x.no_bukti and y.kode_lokasi=x.kode_lokasi "+
							 "               where y.no_angs<>'"+this.e_nb.getText()+"' and y.no_agg = '"+this.cb_agg.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' and y.modul <> 'BTLBILL' "+
							 "               group by y.no_simp, y.kode_lokasi) d on a.no_simp=d.no_simp and a.kode_lokasi=d.kode_lokasi "+
							 "where dd.no_angs = '"+this.e_nb.getText()+"' and a.kode_lokasi= '"+this.app._lokasi+"' order by a.no_simp"; 
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.no_simp,line.jenis,line.nama,line.akun_titip,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();				
			}						
		} catch(e) {alert(e);}
	}	
});