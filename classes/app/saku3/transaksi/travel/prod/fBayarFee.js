window.app_saku3_transaksi_travel_prod_fBayarFee = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fBayarFee.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fBayarFee";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Komisi Agen", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Total"],
					colWidth:[[3,2,1,0],[100,250,80,100]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		

		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Rekening KasBank", multiSelection:false, tag:2});												
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Komisi", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Currency",items:["IDR","USD"], tag:2, change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[290,16,200,22],caption:"Kurs", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_totalIDR = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total IDR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,13,990,305], childPage:["Daftar Komisi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,
		            colTitle:["Status","No Akru","Kode Agen","Nama Agen","Bank","Rekening","Total Komisi","Tot Komisi IDR"],										
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,150,150,170,80,100,80]],					
					readOnly:true,					
					colFormat:[[6,7],[cfNilai,cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","NON"]})]],	
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],		
					dblClick:[this,"doDoubleClick"],						
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LKURS','RKURS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "LKURS") this.lKurs = line.flag;
					if (line.kode_spro == "RKURS") this.rKurs = line.flag;
				}
			}

			this.dataJU = {rs:{rows:[]}};				
			this.c_curr.setText("");

			this.cb_akun.setSQL("select a.kode_akun, a.nama "+
								 "from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag in ('001','009') ",
								 ["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fBayarFee.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fBayarFee.implement({
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
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update dgw_komisi_d set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 										
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBFEE','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_akun.getText()+"','-','BK')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','C',"+nilaiToFloat(this.e_totalIDR.getText())+","+
							nilaiToFloat(this.e_total.getText())+",'"+this.e_ket.getText()+"','KB','KB','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																																			

					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase()=="APP"){
							sql.add("update dgw_komisi_d set no_kas='"+this.e_nb.getText()+"' where no_akru='"+line.no_akru+"' and no_agen='"+line.no_agen+"' and kode_lokasi='"+this.app._lokasi+"'");							
							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.no_akru+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.akun_hutang+"','D',"+parseFloat(line.nilai_idr)+","+
									parseFloat(line.nilai)+",'Pembayaran a.n "+line.nama_agen+"','KB','HUTANG','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																																			
						
							if (parseFloat(line.kurs) != nilaiToFloat(this.e_kurs.getText()))  {
								var sls = (nilaiToFloat(this.e_kurs.getText()) - parseFloat(line.kurs)) * parseFloat(line.nilai);
								if (sls !=0 ) {
									if (sls < 0){ 
										var akunKurs = this.lKurs;
										var dc = "C";
										var dcHutang = "D";
									}
									else {
										var akunKurs = this.rKurs;
										var dc = "D";
										var dcHutang = "C";
									}
									sls = Math.abs(sls);


									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.no_akru+"','"+this.dp_d1.getDateString()+"',777,'"+akunKurs+"','"+dc+"',"+sls+","+
											sls+",'Selisih Kurs Akru Komisi','KB','SKURS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
							
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.no_akru+"','"+this.dp_d1.getDateString()+"',778,'"+line.akun_hutang+"','"+dcHutang+"',"+sls+","+
											sls+",'Selisih Kurs a.n "+line.nama_agen+"','KB','SLSHUT','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																						

								}
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
					this.sg.clear(1); 
					setTipeButton(tbAllFalse);							
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.dataJU = {rs:{rows:[]}};	
					this.c_curr.setText("");
					this.stsSimpan=1;					
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				if (nilaiToFloat(this.e_totalIDR.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total komisi tidak boleh nol atau kurang.");
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
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("update dgw_komisi_d set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m);					
		if (this.stsSimpan==1) this.doClick();			
	},
	doChange: function(sender){
		try{
			if (sender == this.c_curr && this.c_curr.getText() != "" && this.stsSimpan==1) {

				if (this.c_curr.getText() == "USD") {
					this.e_kurs.setReadOnly(false);

					var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = 'USD' and kode_lokasi='"+this.app._lokasi+"' order by id desc ";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.e_kurs.setText(floatToNilai(line.kurs));	
						}					
					}
				}
				else {
					this.e_kurs.setText("1");	
					this.e_kurs.setReadOnly(true);
				}
				
			}
			if (sender == this.e_kurs && this.e_kurs.getText() != "" && this.stsSimpan==1) {
				this.doLoadData();
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doLoadData:function(sender){	
		if (this.e_kurs.getText()!="" && this.e_kurs.getText()!="0") {			
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			var strSQL = "select 'NON' as status,a.no_akru,a.no_agen,b.nama_agen,b.bank+' | '+b.cabang as bank,b.norek+' | '+b.namarek as rek,a.nilai,a.nilai * "+nilaiToFloat(this.e_kurs.getText())+" as nilai_idr,a.akun_hutang,a.kurs "+
						 "from dgw_komisi_d a inner join dgw_agent b on a.no_agen=b.no_agen and a.kode_lokasi=b.kode_lokasi and a.kode_curr='"+this.c_curr.getText()+"' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='-' and a.periode<='"+this.e_periode.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);										
			} else this.sg.clear(1);																		
		}	
		else system.alert(this,"Kurs tidak valid.","");
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_akru,line.no_agen,line.nama_agen,line.bank,line.rek,floatToNilai(line.nilai),floatToNilai(line.nilai_idr)]);		
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doChangeCell: function(sender, col, row){		
		if (col == 0 ){
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
			this.sg.validasi();
		}
	},
	doDoubleClick: function(sender, col , row) {
		if(this.sg.cells(0,row) == "NON") this.sg.cells(0,row,"APP");
		else this.sg.cells(0,row,"NON");
	},
	doNilaiChange: function(){
		var tot = totidr = 0;
			for (var i = 0;i < this.dataJU.rs.rows.length;i++){
				var line = this.dataJU.rs.rows[i];
				if (line.status.toUpperCase() == "APP"){			
					tot += parseFloat(line.nilai);
					totidr += parseFloat(line.nilai_idr);	
				}
			}			
		this.e_total.setText(floatToNilai(tot));
		this.e_totalIDR.setText(floatToNilai(totidr));			
	},
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);
				this.sg.clear(1);		
				this.e_total.setText("0"); this.e_totalIDR.setText("0"); 				
				this.dataJU = {rs:{rows:[]}};											
			}			
			this.stsSimpan = 1;								
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));						
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
								//this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.dataJU = {rs:{rows:[]}};		
			this.c_curr.setText("");
			this.stsSimpan=1;							
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																							
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
		             "from trans_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.form='KBFEE' "+
					 "order by a.tanggal";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai1)]); 
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
						this.cb_akun.setText(line.param1);								
						this.e_ket.setText(line.keterangan);	
						this.c_curr.setText(line.kode_curr);	
						this.e_kurs.setText(floatToNilai(line.kurs));						
					}
				}				
				
				var strSQL = "select 'APP' as status,a.no_akru,a.no_agen,b.nama_agen,b.bank+' | '+b.cabang as bank,b.norek+' | '+b.namarek as rek,a.nilai,a.nilai * "+nilaiToFloat(this.e_kurs.getText())+" as nilai_idr,a.akun_hutang,a.kurs "+
							 "from dgw_komisi_d a inner join dgw_agent b on a.no_agen=b.no_agen and a.kode_lokasi=b.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);										
				} else this.sg.clear(1);
			}						
		} catch(e) {alert(e);}		
	}
});



