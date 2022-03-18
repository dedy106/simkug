window.app_saku3_transaksi_bangtel_proyek_fBillDummyRev = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_proyek_fBillDummyRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_proyek_fBillDummyRev";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Akru Piutang Non Bill", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Billing","List Billing"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_proyek = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer",readOnly:true});															
		this.cb_bill = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"No Akru", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,210,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,282], childPage:["Data Akru"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:0,
		            colTitle:["Kode PP","Nama PP","Nilai"],
					colWidth:[[2,1,0],[100,400,100]],					
					columnReadOnly:[true,[0,1,2],[]],					
					colFormat:[[2],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_proyek.setSQL("select kode_proyek, nama from spm_proyek where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_proyek_fBillDummyRev.extend(window.childForm);
window.app_saku3_transaksi_bangtel_proyek_fBillDummyRev.implement({
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
						sql.add("delete from spm_piutang_m where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_piutang_j where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_piutang_d where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into spm_piutang_m(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_proyek,kode_cust,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,posted,nilai_ppn,modul) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_bill.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_proyek.getText()+"','"+this.cb_cust.getText()+"','IDR',1,'"+this.app._userLog+"','"+this.app._kodePP+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunPiu+"','X',0,'REVBILL')");
					sql.add("insert into spm_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_bill.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiu+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','REVBILL','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var j = i+1;
								sql.add("insert into spm_piutang_d(no_piutang,kode_lokasi,periode,kode_proyek,kode_pp,nilai,dc,no_ref) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'C','"+this.cb_bill.getText()+"')");
								sql.add("insert into spm_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_bill.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunPdpt+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(2,i))+",'"+this.sg.cells(0,i)+"','-','"+this.app._lokasi+"','REVBILL','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");								
							}
						}
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) "+
							"select no_piutang,kode_lokasi,tgl_input,nik_user,periode,'AR',modul,'F','0','0',kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai,nilai_ppn,nilai_pph,'-','-','-','-','-','-','-','-','-' "+
							"from spm_piutang_m "+
							"where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select no_piutang,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,no_urut,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from spm_piutang_j "+
							"where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick();
					this.pc2.setActivePage(this.pc2.childPage[0]);																		
				break;
			case "simpan" :			
			case "ubah" :						
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();												
				if (this.flagGarFree == "0") {									
					for (var i=0;i < this.sg.getRowCount();i++){
						if (!this.sg.rowValid(i)){
							var isKosong = true;
							for (var j=0;j < this.sg.getColCount();j++){
								if (this.sg.cells(j,i) != "") {
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
				}							
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from spm_piutang_m where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_piutang_j where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_piutang_d where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
			if (this.stsSimpan == 1) this.cb_bill.setText("","");
			
			var strSQL = "select a.kode_cust,b.akun_piutang,b.akun_pdpt "+
			             "from spm_proyek a inner join spm_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
			             "where a.kode_proyek ='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					this.cb_cust.setText(line.kode_cust);					
					this.akunPiu = line.akun_piutang;
					this.akunPdpt = line.akun_pdpt;
				}							
			}
			if (this.stsSimpan == 1) {
				this.cb_bill.setSQL("select a.no_piutang, a.keterangan from spm_piutang_m a "+
				                    " left join (select no_ref,sum(nilai) as reverse from spm_piutang_d where kode_lokasi='"+this.app._lokasi+"' group by no_ref) b on a.no_piutang = b.no_ref "+
									"where a.nilai > isnull(b.reverse,0) and a.kode_proyek='"+this.cb_proyek.getText()+"'  and a.modul='NONBILL' and a.kode_lokasi='"+this.app._lokasi+"'",["no_piutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Akru",true);			
			}
		}				
		if (sender == this.cb_bill && this.cb_bill.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.kode_pp,b.nama,a.nilai "+
						"from spm_piutang_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_piutang = '"+this.cb_bill.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData([line.kode_pp,line.nama,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);							
		}
	},	
	doClick:function(sender){
		if (this.e_periode.getText()!= "" ) {							
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg3.clear(1);				
				this.cb_proyek.setText("","");				
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_piutang_m","no_piutang",this.app._lokasi+"-RPU"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 3) this.sg.validasi();							
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != ""){										
					tot += nilaiToFloat(this.sg.cells(2,i));									
				}
			}						
			this.e_total.setText(floatToNilai(tot));
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
								//this.nama_report="server_report_saku2_siaga_rptPiutangJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_piutang='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); 	
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick();
			this.pc2.setActivePage(this.pc2.childPage[0]);																		
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																								
		var strSQL = "select a.no_piutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from spm_piutang_m a inner join trans_m z on a.no_piutang=z.no_bukti and a.kode_lokasi=z.kode_lokasi and z.posted='F' "+					 					 
					 "where a.kode_pp='"+this.app._kodePP+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'  and a.modul='REVBILL'";					 
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
			this.sg3.appendData([line.no_piutang,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
				
				var strSQL = "select * "+
							 "from spm_piutang_m a "+								 
							 "where a.no_piutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.cb_proyek.setText(line.kode_proyek);
						this.cb_bill.setSQL("select a.no_piutang, a.keterangan from spm_piutang_m a "+				                    
										    "where a.no_piutang='"+line.no_dokumen+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_piutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Akru",true);			
						this.cb_bill.setText(line.no_dokumen);
					}
				}								
				
			}									
		} catch(e) {alert(e);}
	}	
});