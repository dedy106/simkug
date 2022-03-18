window.app_saku3_transaksi_tu_proyek_fInisialJoinCost = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fInisialJoinCost.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fInisialJoinCost";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Join Cost Project", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});	
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Data Transaksi","Daftar Transaksi"]});		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Jurnal","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,410,100,80,100]],colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,22,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 					
		this.cb_id = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"ID Kegiatan", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_uraian = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,550,20],caption:"Deskripsi", readOnly:true});				
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Saldo Beban", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_totalcost = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Total Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-10,250],colCount:6,tag:1,
		            colTitle:["ID Project","Nama Project","No SPK/PKS","Saldo OR","Nilai Sharing","PP"],
					colWidth:[[5,4,3,2,1,0],[80,100,100,300,200,120]],					
					columnReadOnly:[true,[0,1,2,3,5],[4]],
					colHide:[[5],[true]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[3,4],[cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-6,25],buttonStyle:2,grid:this.sg2});		
		
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							  "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fInisialJoinCost.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fInisialJoinCost.implement({
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
						sql.add("delete from tu_prbeban_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
						sql.add("delete from tu_prbdd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
						sql.add("delete from tu_prbeban_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					}
					
					sql.add("insert into tu_prbeban_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_drk,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
							"('"+this.e_nb.getText()+"','"+this.cb_id.getText()+"','"+this.akunBeban+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_totalcost.getText())+",'"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','"+this.drkBeban+"','"+this.app._lokasi+"','-','"+this.app._userLog+"',getdate(),'X','IDR',1,'JCOSTINI')");																		
					
					// nge-balik nilai bdd dan nilai beban di proyek lama
					sql.add("insert into tu_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBDD+"','"+this.cb_pp.getText()+"','-','"+this.e_uraian.getText()+"','C',"+nilaiToFloat(this.e_totalcost.getText())+",getdate(),'"+this.cb_id.getText()+"','AJUBDD','"+this.cb_id.getText()+"')");									
					sql.add("insert into tu_prbeban_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,periode_beban,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_id.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunBeban+"','"+this.e_uraian.getText()+"','C',"+nilaiToFloat(this.e_totalcost.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','JCOSTINI','BDD','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																										

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								//masuk/makan ke nilai OR di bdd
								sql.add("insert into tu_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
						    			"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBeban+"','"+this.sg2.cells(5,i)+"','-','"+this.e_uraian.getText()+"','D',"+nilaiToFloat(this.sg2.cells(4,i))+",getdate(),'"+this.sg2.cells(0,i)+"','NONBDD','"+this.cb_id.getText()+"')");				
								sql.add("insert into tu_prbeban_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,periode_beban,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunBeban+"','"+this.sg2.cells(1,i)+"','D',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','-','"+this.app._lokasi+"','JCOSTINI','BDD','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																										
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
				break;
			case "simpan" :
			case "ubah" :	
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_totalcost.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi Sharing tidak valid.","Total Sharing melebihi Saldo.");
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
					sql.add("delete from tu_prbeban_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					sql.add("delete from tu_prbdd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					sql.add("delete from tu_prbeban_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
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
		if (this.stsSimpan == 1) this.doClick()		
	},		
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg2.clear(1); this.sg3.clear(1); 
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prbeban_m","no_bukti",this.app._lokasi+"-JCO"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_pp.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},	
	doChange: function(sender){	
		try {
			if (sender==this.cb_pp && this.cb_pp.getText()!="" && this.stsSimpan == 1) {			
				this.cb_id.setText("","");			
				this.cb_id.setSQL("select kode_proyek, nama from tu_proyek where no_app='INISIAL' and kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Keterangan"],"and","Data Proyek",true);																
				this.e_uraian.setText("");							
			}	

			if (sender==this.cb_id && this.cb_id.getText()!="") {			
				var strSQL = "select xx.kode_proyek,xx.nama,xx.akun_beban,xx.akun_bdd,xx.kode_drkb, isnull(dd.saldo_beban,0) as saldo_beban  "+
						    "from ( "+
				
							"select b.kode_proyek,b.nama,c.akun_beban,c.akun_bdd, b.kode_drkb "+
							"from tu_proyek b "+
							"inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+																					
							"where b.kode_lokasi='"+this.app._lokasi+"' and  b.kode_proyek='"+this.cb_id.getText()+"' "+							
							
							") xx "+


							"left join (  "+
							 
							 "	select no_dokumen,sum(case dc when 'D' then nilai else -nilai end) saldo_beban "+
							 "  from tu_prbeban_j "+
							 "  where jenis = 'BEBAN' and no_dokumen='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_bukti <> '"+this.e_nb.getText()+"' "+
							 "  group by no_dokumen,kode_lokasi "+
							 
							 ") dd "+
							 "  on xx.kode_proyek=dd.no_dokumen ";
			
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];				
					this.e_saldo.setText(floatToNilai(line.saldo_beban));				
					this.e_uraian.setText(line.nama);	
					this.akunBDD = line.akun_bdd;
					this.akunBeban = line.akun_beban;
					this.drkBeban = line.kode_drkb;

				}
			}	

		}
		catch(e){
			alert(e);
		}
	},				
	doChangeCell2: function(sender, col, row){
		if (col == 0 && this.stsSimpan == 1) {		
			var strSQL = "select a.nama,a.kode_pp,a.no_pks,a.nilai_or - isnull(c.bdd,0) as saldo "+
			             "from tu_proyek a "+
			             
			             "   inner join tu_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+			            
			             "   left join ( "+
			             
			             "		select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bdd "+
			             "		from tu_prbdd_d where kode_lokasi='"+this.app._lokasi+"' and no_bukti <> '"+this.e_nb.getText()+"' group by kode_proyek,kode_lokasi "+ 
			             
			             "   ) c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+
			             
						 "where a.kode_proyek = '"+this.sg2.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						 			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.sg2.cells(2,row,line.no_pks);
				this.sg2.cells(5,row,line.kode_pp);
				this.sg2.cells(3,row,floatToNilai(line.saldo));								
			}			
		}
		if (col == 4) {			
			if (this.sg2.cells(4,row) != "") this.sg2.validasi();						
		}		
	},		
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Project",sender,undefined, 
						"select kode_proyek, nama from tu_proyek where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
						"select count(*) from tu_proyek where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
						["kode_proyek","nama"],"and",["ID Project ","Nama Project"],false);				
				}						
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange2: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){										
					tot += nilaiToFloat(this.sg2.cells(4,i));									
				}
			}									
			this.e_totalcost.setText(floatToNilai(tot));
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
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();
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
				this.pc1.show();   
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
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){				
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from tu_prbeban_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'JCOSTINI' and a.posted ='X'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from tu_prbeban_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){														
						this.cb_pp.setText(line.kode_pp);
						this.cb_id.setText(line.no_dokumen);					
					}
				}	
				
				var strSQL = "select a.kode_proyek,a.nama,a.kode_pp,a.no_pks,a.nilai_or - isnull(c.bdd,0) as saldo,xx.nilai "+
							 "from tu_proyek a "+
						     "   inner join tu_prbdd_d xx on a.kode_proyek=xx.kode_proyek and a.kode_lokasi=xx.kode_lokasi "+
							 "   inner join tu_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+			            
							 "   left join ( "+
						 
							 "		select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bdd "+
							 "		from tu_prbdd_d where kode_lokasi='"+this.app._lokasi+"' and no_bukti <> '"+this.e_nb.getText()+"' group by kode_proyek,kode_lokasi "+ 
						 
							 "   ) c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+
						 
							 "where xx.no_bukti = '"+this.e_nb.getText()+"' and xx.kode_lokasi='"+this.app._lokasi+"' and xx.dc ='D'";		
		 				 	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.kode_proyek,line.nama,line.no_pks,floatToNilai(line.saldo),floatToNilai(line.nilai),line.kode_pp]);
					}
				} else this.sg2.clear(1);							
			}									
		} catch(e) {alert(e);}
	}
});