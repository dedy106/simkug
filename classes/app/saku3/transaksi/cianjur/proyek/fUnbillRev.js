window.app_saku3_transaksi_cianjur_proyek_fUnbillRev = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_cianjur_proyek_fUnbillRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_cianjur_proyek_fUnbillRev";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Akru Unbill", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,250,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,300,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,500,20],caption:"Deskripsi", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,15,210,20],caption:"Total Reverse", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,329], childPage:["Data UnBill"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
					colTitle:["Status","No Bukti","Tanggal","Proyek","Deskripsi","Akun Piutang","Nilai UnBill"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,300,150,70,100,70]],					
					readOnly:true,
					buttonStyle:[[0],[bsAuto]], 
					colFormat:[[6],[cfNilai]],picklist:[[0],[new portalui_arrayMap({items:["REVERSE","UNBILL"]})]],checkItem:true,
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_cianjur_proyek_fUnbillRev.extend(window.childForm);
window.app_saku3_transaksi_cianjur_proyek_fUnbillRev.implement({
	loadData: function() {
		//jika sudah direverse maka jadi nol krn sudah ada minus nya
		strSQL = "select * from ("+
				 "select a.no_piutang,convert(varchar,a.tanggal,103) as tgl,a.kode_project,b.nama,a.akun_piutang,sum(a.nilai) as nilai "+
				 "from piutang_d a "+
				 "inner join pr_proyek b on a.kode_project=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
				 "inner join trans_m c on a.no_piutang=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.form in ('UNBILL','RUNBILL')"+
				 "where a.kode_lokasi='"+this.app._lokasi+"' "+
				 "group by a.no_piutang,convert(varchar,a.tanggal,103),a.kode_project,b.nama,a.akun_piutang "+
				 ") x where x.nilai > 0";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line2;
			this.sg.clear();
			for (var i in data.rs.rows){
				line2 = data.rs.rows[i];							
				this.sg.appendData(["UNBILL",line2.no_piutang,line2.tgl,line2.kode_project,line2.nama,line2.akun_piutang,floatToNilai(line2.nilai)]);
			}
		} else this.sg.clear(1);
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from piutang_d where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','RUNBILL','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_nilai.getText())+",0,0,'-','-','-','-','-','-','-','-','-')");

					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "REVERSE") {										
								//angka diminus utk menolkan tagihan unbill sebelumnya
								sql.add("insert into piutang_d(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_cust,kode_curr,kurs,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,nilai_ppn,nilai_pph,no_fp) "+
										"select no_piutang,kode_lokasi,'"+this.e_nb.getText()+"',tanggal,keterangan,kode_project,kode_cust,kode_curr,kurs,kode_pp,-nilai,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),akun_piutang,0,0,'-' "+
										"from piutang_d where no_piutang='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"' and nilai > 0");

								//jurnalbalik		
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
										"select '"+this.e_nb.getText()+"',kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"',no_bukti,'"+this.dp_d1.getDateString()+"',nu,kode_akun,case dc when 'D' then 'C' else 'D' end,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3 "+
										"from trans_j where no_bukti='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");											
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
					this.sg3.clear(1);
					setTipeButton(tbAllFalse);
					this.doClick();
				break;
			case "simpan" :																					
			case "ubah" :																						
				this.preView = "1";								
				this.sg.validasi();														
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				*/
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
				/*
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				*/
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}					
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from piutang_d where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);					
		if (this.stsSimpan == 1) {
			this.doClick();						
			this.loadData();
		}
	},		
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-RUB"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 0) this.sg.validasi();								
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(0,i) == "REVERSE"){										
					tot += nilaiToFloat(this.sg.cells(6,i));					
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));
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
								this.nama_report="server_report_saku3_cianjur_rptPiutangJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg3.clear(1); 												
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select no_bukti,convert(varchar,tanggal,103) as tgl,keterangan,nilai1 from trans_m where posted='F' and form='RUNBILL' and kode_lokasi='"+this.app._lokasi+"' order by no_bukti";						
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from trans_m "+						 
							 "where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
					} 
				}
				
				strSQL = "select a.no_piutang,convert(varchar,a.tanggal,103) as tgl,a.kode_project,b.nama,a.akun_piutang,abs(a.nilai) as nilai "+
						"from piutang_d a "+
						"inner join pr_proyek b on a.kode_project=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
						"inner join trans_m c on a.no_dokumen=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.form in ('RUNBILL') "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.nilai < 0 and a.no_dokumen='"+this.e_nb.getText()+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg.appendData(["REVERSE",line2.no_piutang,line2.tgl,line2.kode_project,line2.nama,line2.akun_piutang,floatToNilai(line2.nilai)]);
					}
				} else this.sg.clear(1);
				
			}									
		} catch(e) {alert(e);}
	}
});