window.app_saku3_transaksi_bpr_fBatalSpb = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fBatalSpb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fBatalSpb";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan PB (Jurnal Reversal)", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,13,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,17,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,327], childPage:["Permintaan Bayar","Jurnal PB"]});		
		this.cb_pb = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"No PB", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});	
		this.e_pp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"Cabang/Unit", readOnly:true});						
		this.e_dok2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", readOnly:true});						
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", readOnly:true});				
		this.e_modul = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Modul", readOnly:true});				
		this.e_nilai2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai PB", readOnly:true,tipeText:ttNilai,text:"0"});						

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:9,tag:9,
			colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","ID Ref","Deskripsi"],
			colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
			readOnly:true,
			colFormat:[[4],[cfNilai]],autoAppend:false,defaultRow:1});				

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
window.app_saku3_transaksi_bpr_fBatalSpb.extend(window.childForm);
window.app_saku3_transaksi_bpr_fBatalSpb.implement({	
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
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='JUSPB'");
						sql.add("update trans_m set progress=prog_seb, no_ref3='-' where no_ref3 = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
						
						if (this.e_modul.getText() == "PBHUT") {
							sql.add("delete from hu_bayar_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.e_modul.getText() == "PBSIM") {
							sql.add("delete from kop_simpangs_d where no_angs = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						}						
						//PBPIN .. tidak bisa dikoreksi, ajukan kembali PB pencairannya lewat menu PB Pinj Cair						
					}					
					

					if (this.e_modul.getText() == "PBHUT") {
						sql.add("insert into hu_bayar_d(no_bukti,no_hutang,kode_lokasi,modul,periode,nik_user,tgl_input,dc,nilai, kode_vendor) "+
								"select '"+this.e_nb.getText()+"',no_hutang,kode_lokasi,'REVPB','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'C',nilai,kode_vendor  "+
								"from hu_bayar_d "+
								"where no_bukti='"+this.cb_pb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}
					if (this.e_modul.getText() == "PBSIM") {
						sql.add("insert into kop_simpangs_d(no_angs,no_simp,no_bill,akun_piutang,nilai,kode_lokasi,dc,periode,modul,no_agg,jenis) "+
								"select '"+this.e_nb.getText()+"',no_simp,no_bill,akun_piutang,nilai,kode_lokasi,'D','"+this.e_periode.getText()+"','REVPB',no_agg,jenis "+
								"from kop_simpangs_d "+
								"where no_angs='"+this.cb_pb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}
					if (this.e_modul.getText() == "PBPIN") {
						sql.add("update kop_pinj_m set no_kas='-' where no_kas='"+this.cb_pb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					}
					

					sql.add("update trans_m set prog_seb=progress,progress='2', no_ref3='"+this.e_nb.getText()+"' where no_bukti = '"+this.cb_pb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','MI','REVPB','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai2.getText())+",0,0,'-','-','-','"+this.cb_pb.getText()+"','-','-','-','-','"+this.e_modul.getText()+"')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"',nu,kode_akun,case dc when 'D' then 'C' else 'D' end,nilai,nilai_curr,keterangan,'REVPB',jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,'"+this.cb_pb.getText()+"','-','-','-' "+
							"from trans_j "+
							"where no_bukti='"+this.cb_pb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) "+
							"select '"+this.e_nb.getText()+"',modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,'"+this.e_periode.getText()+"',case dc when 'D' then nilai else -nilai end,0,nilai,0,0,0,'"+this.cb_pb.getText()+"','-','-' "+
							"from angg_r "+
							"where no_bukti ='"+this.cb_pb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
														
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
					this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);		
					var strSQL = "select no_bukti, keterangan from trans_m  where no_ref3='-' and kode_lokasi='"+this.app._lokasi+"' and form in ('PBDIR','PBHUT','PBSIM')";	
					this.cb_pb.setSQL(strSQL,["no_bukti","keterangan"],false,["No PB","Deskripsi"],"and","Data Permintaan Bayar",true);						
				break;
			case "simpan" :															
			case "ubah" :																			
				this.preView = "1";								
				if (this.standarLib.doCekPeriode(this.dbLib,"MI",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (MI - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"MI",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (MI - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='JUSPB'");
					sql.add("update trans_m set progress=prog_seb, no_ref3='-' where no_ref3 = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					if (this.e_modul.getText() == "PBHUT") {
						sql.add("delete from hu_bayar_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.e_modul.getText() == "PBSIM") {
						sql.add("delete from kop_simpangs_d where no_angs = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					//PBPIN .. tidak bisa dikoreksi, ajukan kembali PB pencairannya lewat menu PB Pinj Cair
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
			this.doClick();		
			var strSQL = "select no_bukti, keterangan from trans_m where no_ref3='-' and kode_lokasi='"+this.app._lokasi+"' and form in ('PBDIR','PBHUT','PBSIM','PBPIN')";	
			this.cb_pb.setSQL(strSQL,["no_bukti","keterangan"],false,["No PB","Deskripsi"],"and","Data Permintaan Bayar",true);							
		}
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();	
		if (sender == this.cb_pb && this.cb_pb.getText() !="") {
			var strSQL = "select b.no_dokumen,b.keterangan,b.nilai1,c.kode_pp+'-'+c.nama as pp, b.form "+
						 "from trans_m b inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
						 "where b.no_bukti='"+this.cb_pb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";				   				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.e_pp.setText(line.pp);		
					this.e_dok2.setText(line.no_dokumen);	
					this.e_ket2.setText(line.keterangan);
					this.e_nilai2.setText(floatToNilai(line.nilai1));		
					this.e_modul.setText(line.form);													
				}
			}

			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_proyek,'-' as nama_proyek "+
						  "from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+												 
						  "where a.no_bukti = '"+this.cb_pb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";

			var data = this.dbLib.getDataProvider(strSQL3,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_proyek,line.nama_proyek]);
				}
			} else this.sg1.clear(1);	

		}					
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); 
				this.sg1.clear(1); 
				var strSQL = "select no_bukti, keterangan from trans_m where no_ref3='-' and kode_lokasi='"+this.app._lokasi+"' and form in ('PBDIR','PBHUT','PBSIM','PBPIN')";	
				this.cb_pb.setSQL(strSQL,["no_bukti","keterangan"],false,["No PB","Deskripsi"],"and","Data Permintaan Bayar",true);							
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
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
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg3.clear(1); 
			this.sg1.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			var strSQL = "select no_bukti, keterangan from trans_m where no_ref3='-' and kode_lokasi='"+this.app._lokasi+"' and form in ('PBDIR','PBHUT','PBSIM','PBPIN')";	
			this.cb_pb.setSQL(strSQL,["no_bukti","keterangan"],false,["No PB","Deskripsi"],"and","Data Permintaan Bayar",true);							
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		//PBPIN .. pembatalannya tidak bisa dibatalkan, solusi : ajukan kembali PB pencairannya lewat menu PB Pinj Cair																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from trans_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and "+
					 "a.form = 'REVPB' and a.param3<>'PBPIN' and a.posted ='F'";		
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
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
						
						var strSQL = "select no_bukti, keterangan from trans_m where no_ref3='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";	
						this.cb_pb.setSQL(strSQL,["no_bukti","keterangan"],false,["No PB","Deskripsi"],"and","Data Permintaan Bayar",true);										
						this.cb_pb.setText(line.no_ref1);										
					}
				}								
				this.pc1.setActivePage(this.pc1.childPage[0]);														
			}									
		} catch(e) {alert(e);}
	}
});