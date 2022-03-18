window.app_saku3_transaksi_spm_fPtgAjuPR = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fPtgAjuPR.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fPtgAjuPR";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input Pertanggungan PJ Proyek", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Pertanggungan","List Pertanggungan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:9,tag:9,
		            colTitle:["No Pertggn","Tanggal","Jenis","No Dokumen","Deskripsi","No Panjar","Pemegang","Nilai","Catatan"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[200,100,200,100,210,100,80,80,100]],
					colFormat:[[7],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Nilai Perttg.", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.e_sls = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,10,990,370], childPage:["Data Panjar - Proyek","Deskripsi Pertanggungan","Catatan"]});
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});										
		this.cb_setuju = new saiCBBL(this.pc1.childPage[0],{bound:[20,21,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_pj = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Bukti Panjar", multiSelection:false, readOnly:true, tag:1,change:[this,"doChange"]});				
		this.e_akunpj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Akun Panjar", readOnly:true});								
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_pemegang = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,400,20],caption:"Pemegang Panjar", readOnly:true});								
		
		this.cb_proyek = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Total RAB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_pakai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Real. Biaya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:0,
		            colTitle:["Keterangan","Nilai"],
					colWidth:[[1,0],[100,450]],					
					colFormat:[[1],[cfNilai]],checkItem: true,
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[20,10,450,60],caption:"Catatan",tag:9});	
		
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
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			
			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}						
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			this.cb_proyek.setSQL("select kode_proyek,nama from spm_proyek where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
			
			this.e_memo.setReadOnly(true);
			
			this.cb_pp.setText(this.app._kodePP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fPtgAjuPR.extend(window.childForm);
window.app_saku3_transaksi_spm_fPtgAjuPR.implement({
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
						sql.add("delete from panjarptg2_m where no_ptg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from panjarptg2_j where no_ptg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from spm_proyek_bdd where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("update panjar2_m set progress = '6' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}					
					
					sql.add("update panjar2_m set progress = '7' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into panjarptg2_m (no_ptg,no_panjar,no_final,no_app,no_ver,no_dokumen,tanggal,keterangan,akun_panjar,nik_buat,nik_app,kode_lokasi,kode_pp,nilai_pj,nilai,nilai_kas,progress,periode,nik_user,tgl_input,modul,no_app2) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_pj.getText()+"','-','-','-','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_akunpj.getText()+"','"+this.app._userLog+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_nilaipj.getText())+","+parseNilai(this.e_total.getText())+","+parseNilai(this.e_sls.getText())+",'0','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'PRPTG','-')");
										
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into panjarptg2_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.akunBDD+"','"+this.sg1.cells(0,i)+"','D',"+parseNilai(this.sg1.cells(1,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PRPTG','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
								sql.add("insert into spm_proyek_bdd(no_bukti,modul,kode_proyek,nu,keterangan,dc,nilai,kode_lokasi,periode) values "+
										"('"+this.e_nb.getText()+"','PRPTG','"+this.cb_proyek.getText()+"',"+i+",'"+this.sg1.cells(0,i)+"','D',"+nilaiToFloat(this.sg1.cells(1,i))+",'"+this.app._lokasi+"','"+this.e_periode.getText()+"')");																		
							}
						}
					}
					sql.add("insert into panjarptg2_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.e_akunpj.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilaipj.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PRPTG','PANJAR','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
							
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
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :					
			case "ubah" :	
				this.sg1.validasi();
				if (nilaiToFloat(this.e_sls.getText()) < 0){
					system.alert(this,"Transaksi tidak valid.","Nilai Pertanggungan melebihi Nilai Panjar.");
					return false;
				}												
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					} 															
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();
				if ((nilaiToFloat(this.e_pakai.getText()) + nilaiToFloat(this.e_total.getText())) > nilaiToFloat(this.e_nilaior.getText())  ) {
					system.alert(this,"Transaksi tidak valid.","Total Biaya melebihi Total RAB.");
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from panjarptg2_m where no_ptg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from panjarptg2_j where no_ptg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spm_proyek_bdd where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update panjar2_m set progress = '6' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
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
		if (this.stsSimpan == 1) this.doClick();				
	},	
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.cb_pp) {
			if (this.e_periode.getText()!="" && this.cb_pp.getText()!="" && this.stsSimpan == 1) {				
				this.cb_pj.setSQL("select a.no_panjar, a.keterangan from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
				                  "where a.progress = '6' and a.modul='PJAJU' and b.kode_pp='"+this.app._kodePP+"' and  a.no_kas<>'-' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true); 				
			}
		}
		if (sender == this.cb_pj && this.cb_pj.getText()!="" && this.stsSimpan == 1) {
			var strSQL = "select a.periode,a.nilai,a.akun_panjar,a.nik_buat+' - '+b.nama as pemegang from panjar2_m a inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			             "where a.no_panjar='"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																				
					this.e_pemegang.setText(line.pemegang);
					this.e_akunpj.setText(line.akun_panjar);
					this.e_nilaipj.setText(floatToNilai(line.nilai));															
					this.periodePJ = line.periode;
				} 
			}	
			this.sg1.validasi();								
		}
		if (sender == this.cb_proyek && this.cb_proyek.getText() != "")  {			
			var strSQL = "select b.akun_bdd,a.nilai_or,isnull(c.bdd,0) as bdd "+
						 "from spm_proyek a inner join spm_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+								
						 "           	    left join ("+
						 "							select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as bdd "+
						 "                       	from spm_proyek_bdd "+
						 "							where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_proyek "+
						 "							  ) c on a.kode_proyek=c.kode_proyek "+						 
						 "where a.kode_proyek= '"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";													
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.akunBDD = line.akun_bdd;
					this.e_nilaior.setText(floatToNilai(line.nilai_or));
					this.e_pakai.setText(floatToNilai(line.bdd));
				}
			}			
		}		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); 				
				this.sg3.clear(1); 
				this.e_total.setText("0");			
				this.e_sls.setText("0");			
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"panjarptg2_m","no_ptg",this.app._lokasi+"-PTGR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doChangeCell1: function(sender, col, row){
		if (col == 1 && sender.cells(1,row) != "") this.sg1.validasi();			
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(1,i) != ""){
					totD += nilaiToFloat(this.sg1.cells(1,i));					
				}
			}			
			this.e_total.setText(floatToNilai(totD - totC));
			var sls = nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_total.getText());
			this.e_sls.setText(floatToNilai(sls));
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
							this.nama_report="server_report_saku3_spm_rptPanjarPtgForm";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText();
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
			this.sg1.clear(1); this.sg3.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select c.no_ptg,a.no_panjar,convert(varchar,c.tanggal,103) as tgl,case c.progress when '0' then 'AJU' when 'C' then 'REVISI' when 'V' then 'REV.VER' end as jenis,c.no_dokumen,c.keterangan,a.nik_buat+' - '+b.nama as nama,c.nilai, "+
		 			 "case when a.progress = 'C' then isnull(cc.catatan,'-') else isnull(dd.catatan,'-') end as catatan "+
		             "from panjarptg2_m c inner join panjar2_m a on c.no_panjar=a.no_panjar and c.kode_lokasi=a.kode_lokasi "+
					 "                    inner join karyawan b on a.nik_buat=b.nik "+
					 "                    inner join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
					 "			      left join spm_app_m cc on c.no_ptg=cc.no_bukti and c.kode_lokasi=cc.kode_lokasi and cc.no_flag='-' and cc.form = 'APPCAB' "+
					 "			      left join spm_app_m dd on c.no_ptg=dd.no_bukti and c.kode_lokasi=dd.kode_lokasi and dd.no_flag='-' and dd.form = 'APPVER' "+
					 "where c.modul= 'PRPTG' and c.periode<='"+this.e_periode.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' and c.progress in ('0','C','V','S') and d.kode_pp='"+this.app._kodePP+"'";		
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
			this.sg3.appendData([line.no_ptg,line.tgl,line.jenis.toUpperCase(),line.no_dokumen,line.keterangan,line.no_panjar,line.nama,floatToNilai(line.nilai),line.catatan]); 
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
				this.e_memo.setText(this.sg3.cells(8,row));							
				this.cb_pj.setSQL("select no_panjar, keterangan from panjar2_m where no_panjar='"+this.sg3.cells(5,row)+"' and kode_lokasi='"+this.app._lokasi+"'",["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true); 												  								
				
				var strSQL = "select a.nilai,a.akun_panjar,a.no_panjar,a.keterangan,a.nik_buat+' - '+e.nama as pemegang,b.progress, "+
							 " b.no_dokumen,b.keterangan as ket,b.nik_app,d.nama as nama_app,b.tanggal,b.no_app as no_applama,b.no_ver as no_verlama,a.periode as periodepj "+
							 "from panjar2_m a inner join panjarptg2_m b on a.no_panjar=b.no_panjar and a.kode_lokasi=b.kode_lokasi "+
							 "                 inner join karyawan d on b.nik_app=d.nik and b.kode_lokasi=d.kode_lokasi "+							 
							 "                 inner join karyawan e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi "+							 
							 "where b.no_ptg='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tanggal);
						this.cb_proyek.setText(line.no_dokumen);
						this.e_ket.setText(line.ket);
						this.cb_setuju.setText(line.nik_app,line.nama_app);
						this.cb_pj.setText(line.no_panjar,line.keterangan);
						this.e_akunpj.setText(line.akun_panjar);
						this.e_nilaipj.setText(floatToNilai(line.nilai));															
						this.e_pemegang.setText(line.pemegang);
						this.periodePJ = line.periodepj;
											
					} 
				}			
				var data = this.dbLib.getDataProvider("select a.keterangan,a.nilai "+
							"from panjarptg2_j a "+
							"where a.jenis='BEBAN' and a.no_ptg = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.keterangan,floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);
			}									
		} catch(e) {alert(e);}
	}
});