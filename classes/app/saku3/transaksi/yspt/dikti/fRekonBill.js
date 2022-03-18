window.app_saku3_transaksi_yspt_dikti_fRekonBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fRekonBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fRekonBill";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekonsiliasi Pelunasan Tagihan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pelunasan","List Bukti"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		      colTitle:["No Rekon","Tanggal","N I M","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});							
		this.e_piutang = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_titip = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Akun Pelunasan", multiSelection:false, maxLength:10, tag:2 });
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_nim = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"N I M", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});		
		this.e_cd = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Saldo CD", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this.pc2.childPage[0],{bound:[1,23,995,335],caption:"Data Tagihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:0,
		      colTitle:["No Bill","Kode Param","Nama Parameter","Akun AR","Saldo Tagihan","Nilai Pelunasan","Kode PP"],
					colWidth:[[6,5,4,3,2,1,0],[80,100,100,80,200,80,120]],
					colFormat:[[4,5],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,6],[5]],
					cellEnter:[this,"doCellEnter"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
			
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '061' where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			this.cb_nim.setSQL("select nim, nama from dikti_mhs where kode_lokasi='"+this.app._lokasi+"' ",["nim","nama"],false,["NIM","Nama"],"and","Daftar Mahasiswa",true);
						
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='SISCD' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunCD = line.flag;
			} else this.akunCD = "";
			
			if (this.akunCD == "") {
				system.alert(this,"SPRO CD (SISCD) tidak ditemukan.","");
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_dikti_fRekonBill.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fRekonBill.implement({
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
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from dikti_bill_rekon where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from dikti_cd where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,due_date,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','MI','MHSREKON','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"', '-','"+this.e_ket.getText()+"','IDR',1,"+
									parseNilai(this.e_nilai.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_nim.getText()+"','"+this.cb_titip.getText()+"','-')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_titip.getText()+"','D',"+parseNilai(this.e_nilai.getText())+","+
									parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','MHSREKON','TITIP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");											

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(5,i) != "0"){								
							 	var nilaiAR = nilaiToFloat(this.sg.cells(5,i));	
							
								sql.add("insert into dikti_bill_rekon(no_rekon,kode_lokasi,periode,no_bill,nim,kode_param,akun_titip,akun_piutang,nilai,nilai_cd,dc,modul) values "+
												"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.cb_nim.getText()+"','"+this.sg.cells(1,i)+"','"+this.cb_titip.getText()+"','"+this.sg.cells(3,i)+"',"+nilaiAR+",0,'D','MHSREKON')");

								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
												"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(3,i)+"','C',"+nilaiAR+","+nilaiAR+",'"+this.e_ket.getText()+"','MHSREKON','PIUT','IDR',1,'"+this.sg.cells(6,i)+"','-','-','-','-','-','-','-','-')");

							}
						}
					}			

					sql.add("insert into dikti_cd(no_bukti,nim,periode,nilai,kode_lokasi,akun_cd,kode_param,dc,modul,no_ref1) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','-','C','MHSREKON','-')");							
									
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
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.cb_nim.setSQL("select nis, nama from dikti_mhs where kode_lokasi='"+this.app._lokasi+"' ",["nis","nama"],false,["NIS","Nama"],"and","Daftar Siswa",true);	
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(5,i) != "0"){
						if ((nilaiToFloat(this.sg.cells(5,i)) < 0) || (nilaiToFloat(this.sg.cells(5,i)) > nilaiToFloat(this.sg.cells(4,i)))  ) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh kurang dari nol atau melebihi saldo tagihan. Baris : "+k);
							return false;						
						}
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai rekonsiliasi tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_cd.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Pelunasan tidak boleh melebihi Saldo CD.");
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
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from dikti_bill_rekon where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from dikti_cd where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m)
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.sg.clear(1);
				this.sg.validasi();
				this.cb_nim.setSQL("select nis, nama from dikti_mhs where kode_lokasi='"+this.app._lokasi+"' ",["nis","nama"],false,["NIS","Nama"],"and","Daftar Siswa",true);	
			} 			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			this.stsSimpan = 1;
		}
	},
	doChange: function(sender){
		if (sender == this.cb_nim && this.cb_nim.getText()!="" && this.stsSimpan==1) {
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");		

			var strSQL = "select a.no_bill,a.kode_param,a.nama,a.akun_piutang,a.tot_bill-isnull(b.tot_lunas,0) as saldo,a.kode_pp "+
									 "from ("+

									 "		select a.nim,a.no_bill,a.periode,a.akun_piutang,sum(a.nilai) as tot_bill,a.kode_param,aa.nama,a.kode_pp "+
									 "		from dikti_bill_d a "+
									 "       inner join dikti_param aa on a.kode_param=aa.kode_param and a.kode_lokasi=aa.kode_lokasi "+
									 
									 "		where a.nim = '"+this.cb_nim.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
									 "		group by a.nim,a.no_bill,a.periode,a.akun_piutang,a.kode_param,aa.nama,a.kode_pp "+
									 ") a "+
									
									 "left join ( "+
									 "		select no_bill,nim,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
									 "    from dikti_bill_rekon "+
									 "		where  nim = '"+this.cb_nim.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 "		group by nim,no_bill,kode_lokasi,kode_param "+

									 ") b on a.nim=b.nim and a.no_bill=b.no_bill and a.kode_param=b.kode_param "+						 

									 "where (a.tot_bill-isnull(b.tot_lunas,0)) > 0  "+
									 "order by a.periode";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_bill,line.kode_param,line.nama,line.akun_piutang,floatToNilai(line.saldo),"0",line.kode_pp]);
				}
			} else this.sg.clear(1);			

			var strSQL = "select isnull(sum(case a.dc when 'D' then a.nilai else -a.nilai end),0) as saldo_cd "+
						 			 "from dikti_cd a "+ 
						 			 "where a.kode_lokasi='"+this.app._lokasi+"' and a.nim = '"+this.cb_nim.getText()+"' ";									
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.e_cd.setText(floatToNilai(line.saldo_cd));															
				}
			}	

		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(5,row) == "0") this.sg.cells(5,row,this.sg.cells(4,row));
		}catch(e)
		{
			alert("doubleClick"+e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 5) {			
			this.sg.validasi();		
		}
	},		
	doNilaiChange: function(){
		try{
			var totP = totB = totCD = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.sg.cells(5,i) != ""){										
					totP += nilaiToFloat(this.sg.cells(4,i));
					totB += nilaiToFloat(this.sg.cells(5,i));					
				}
			}
			this.e_piutang.setText(floatToNilai(totP));
			this.e_nilai.setText(floatToNilai(totB));			
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
								this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYpt";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
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
			this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			this.cb_nim.setSQL("select nis, nama from dikti_mhs where kode_lokasi='"+this.app._lokasi+"'",["nis","nama"],false,["NIS","Nama"],"and","Daftar Siswa",true);	
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.param1,a.keterangan "+
		             "from trans_m a "+
					 			 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'MHSREKON' and a.posted ='F'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.param1,line.keterangan]); 
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
						this.e_ket.setText(line.keterangan);
						this.cb_titip.setText(line.param2);				
						this.cb_nim.setSQL("select nim, nama from dikti_mhs where nim ='"+line.param1+"' and kode_lokasi='"+this.app._lokasi+"' ",["nim","nama"],false,["NIM","Nama"],"and","Daftar Mahasiswa",true);		
						this.cb_nim.setText(line.param1);											
					}
				}

				var strSQL = "select isnull(sum(case a.dc when 'D' then a.nilai else -a.nilai end),0) as saldo_cd "+
										 "from dikti_cd a "+ 
										 "where a.no_bukti <> '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nim = '"+this.cb_nim.getText()+"' ";									
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_cd.setText(floatToNilai(line.saldo_cd));															
					}
				}	
				
				var strSQL = "select a.no_bill,a.kode_param,a.nama,a.akun_piutang,a.tot_bill-isnull(b.tot_lunas,0) as saldo,c.nilai,a.kode_pp  "+
									 "from ("+

									 "		select a.nim,a.no_bill,a.periode,a.akun_piutang,sum(a.nilai) as tot_bill,a.kode_param,aa.nama,a.kode_pp "+
									 "		from dikti_bill_d a "+
									 "       inner join dikti_param aa on a.kode_param=aa.kode_param and a.kode_lokasi=aa.kode_lokasi "+
									 
									 "		where a.nim = '"+this.cb_nim.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
									 "		group by a.nim,a.no_bill,a.periode,a.akun_piutang,a.kode_param,aa.nama,a.kode_pp "+
									 ") a "+

									 "inner join dikti_bill_rekon c on a.no_bill=c.no_bill and a.kode_param=c.kode_param and c.kode_lokasi='"+this.app._lokasi+"' "+

									 "left join ( "+
									 "		select no_bill,nim,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
									 "    from dikti_bill_rekon "+
									 "		where  nim = '"+this.cb_nim.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_rekon <> '"+this.e_nb.getText()+"' "+
									 "		group by nim,no_bill,kode_lokasi,kode_param "+

									 ") b on a.nim=b.nim and a.no_bill=b.no_bill and a.kode_param=b.kode_param "+						 

									 "where c.no_rekon='"+this.e_nb.getText()+"'  "+
									 "order by a.periode";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_bill,line.kode_param,line.nama,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.nilai),line.kode_pp]);
					}
				} else this.sg.clear(1);	

			}						
		} catch(e) {alert(e);}
	}
});