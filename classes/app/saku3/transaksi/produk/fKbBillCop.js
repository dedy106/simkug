window.app_saku3_transaksi_produk_fKbBillCop = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fKbBillCop.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fKbBillCop";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Pelunasan Tagihan CASH", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});
		this.cb_titip = new saiCBBL(this,{bound:[20,18,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2 });
	//	this.e_piutang = new saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bValid = new button(this,{bound:[620,17,80,20],caption:"Validasi",click:[this,"doValid"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,300], childPage:["Data Tagihan","Error Msg"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,
					colTitle:["ID Bank","NIS","Nilai Bayar","Tanggal","No. Bukti","Validasi ID Bank","Validasi NIS","Validasi Tanggal"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,150,100,100,100]],
					colFormat:[[2],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
					nilaiChange:[this,"doNilaiChange"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager1"]});		

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		
		
		this.rearrangeChild(10, 23);
		
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
			
			var strSQL = "select convert(varchar(6), GETDATE(),112) as tanggal ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.e_periode.setText(line3.tanggal);	
				}
			}

			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a "+
								 "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
								 "where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.flag_aktif='1' where b.kode_lokasi='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
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
window.app_saku3_transaksi_produk_fKbBillCop.extend(window.childForm);
window.app_saku3_transaksi_produk_fKbBillCop.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();
						
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doValid: function() {
		//cek id bank
		var strSQL = "select id_bank from sis_siswa where kode_lokasi='"+this.app._lokasi+"'";			
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataBank = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(5,i,"INVALID");
			for (var j=0;j < this.dataBank.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataBank.rs.rows[j].id_bank) {
					this.sg1.cells(5,i,"VALID");				
				}
			}	
			if (this.sg1.cells(5,i) == "INVALID") this.inValid = true;									
		}	

		//cek NIS
		var strSQL = "select nis from sis_siswa where kode_lokasi='"+this.app._lokasi+"'";			
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataNIS = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(6,i,"INVALID");
			for (var j=0;j < this.dataNIS.rs.rows.length;j++){
				if (this.sg1.cells(1,i) == this.dataNIS.rs.rows[j].nis) {
					this.sg1.cells(6,i,"VALID");				
				}
			}	
			if (this.sg1.cells(6,i) == "INVALID") this.inValid = true;									
		}		

		//generate nomor bukti
		var nbfa = nbfa2 = this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.cb_pp.getText()+"-BM"+this.e_periode.getText().substr(2,4)+".","000");
		nbfa = nbfa.substr(0,10);
		var idx = parseFloat(nbfa2.substr(11,4));
		var nu = idx2 = "";
		for (var i=0; i < this.sg1.getRowCount();i++){	 						
			idx2 = idx.toString();
			if (idx2.length == 1) var nu = "000"+idx2;
			if (idx2.length == 2) var nu = "00"+idx2;
			if (idx2.length == 3) var nu = "0"+idx2;
			if (idx2.length == 4) var nu = idx2;
					
			nbfa2 = nbfa+nu;									
				this.sg1.cells(4,i,nbfa2);	
			var idx = idx + 1;						
		}						

		//cek tanggal
		
		for (var i=0; i < this.sg1.getRowCount();i++) {
			this.sg1.cells(7,i,"INVALID");
			if(this.sg1.cells(3,i).substr(0,4)+this.sg1.cells(3,i).substr(5,2) == this.e_periode.getText()){
				this.sg1.cells(7,i,"VALID");
			}
			if (this.sg1.cells(7,i) == "INVALID") this.inValid = true;
		}

		if (this.inValid == false) setTipeButton(tbSimpan);	
		else {
			this.pc1.setActivePage(this.pc1.childPage[1]);	
			this.sg2.clear();
			setTipeButton(tbAllFalse);	
			for (var i=0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.cells(5,i) == "INVALID" || this.sg1.cells(6,i) == "INVALID" || this.sg1.cells(7,i) == "INVALID") {
					var j = i+1;
					this.sg2.appendData([j]);						
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					for (var i=0; i < this.sg1.getRowCount();i++){	
						sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.sg1.cells(5,i)+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','V','KBBILL','X','0','0','"+this.app._kodePP+"','"+this.sg1.cells(4,i)+"','-','-','IDR',1,"+nilaiToFloat(this.sg1.cells(2,i))+",0,0,'-','-','-','-','-','-','"+this.cb_titip.getText()+"','-','-')");
					
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.sg1.cells(5,i)+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.sg1.cells(4,i)+"',"+i+",'"+this.cb_titip.getText()+"','D',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(2,i))+",'-','V','KBBILL','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','"+this.sg1.cells(1,i)+"','-','-')");
						
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.sg1.cells(5,i)+"','"+this.app. _lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.sg1.cells(4,i)+"',"+i+",'"+this.cb_titip.getText()+"','C',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(2,i))+",'-','V','KBBILL','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','"+this.sg1.cells(1,i)+"','-','-')");
											
						sql.add("insert into sis_cd_d(no_bukti,nis,periode,nilai,kode_lokasi,akun_cd,kode_param,dc,modul,kode_pp,no_ref1) values "+
								"('"+this.sg1.cells(5,i)+"','"+this.sg1.cells(1,i)+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(2,i))+",'"+this.app._lokasi+"','"+this.akunCD+"','-','D','KBBILL','"+this.cb_pp.getText()+"','-')");
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
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
												
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh nol atau kurang.");
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},

	doNilaiChange: function(){
		var tot = 0;
			for (var i=0; i < this.sg1.getRowCount();i++){	
				tot += nilaiToFloat(this.sg1.cells(2,i));
			}			
		this.e_nilai.setText(floatToNilai(tot));			
	},	
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							//this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYpt";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); 
		} catch(e) {
			alert(e);
		}
	}
});