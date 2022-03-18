window.app_saku3_transaksi_yspt_dikti_fCDinCamaba = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fCDinCamaba.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fCDinCamaba";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Penerimaan Biaya Registrasi Calon MHS", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});		
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		
		this.pc1 = new pageControl(this,{bound:[20,14,1000,430], childPage:["List PDD","List Bukti"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});										
		this.cb_titip = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2 });		
		this.bRekon = new button(this.pc1.childPage[0],{bound:[660,16,100,20],caption:"Validasi", click:[this,"doRekon"]});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[780,16,200,20],caption:"Total Bayar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,327], childPage:["Data Pembayaran","Error Msg"]});							
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:2,tag:9,
		      colTitle:["ID Registrasi","Nilai Bayar"],					
					colWidth:[[1,0],[100,250]],		
					colFormat:[[1],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});		

		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPage3"]});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		      colTitle:["No. Bukti","Tanggal","Keterangan"],
					colWidth:[[2,1,0],[350,150,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load",click:[this,"doLoad"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
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

			this.doClick();		
			this.doLoad();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
	
			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Kas",true);			
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
window.app_saku3_transaksi_yspt_dikti_fCDinCamaba.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fCDinCamaba.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();						
		} catch(e) {alert(e);}
	},
	doPager2: function(sender,page){
		this.sg2.doSelectPage(page);
	},
	doRekon: function(sender){				
		try {
			var strSQL = "select a.no_reg from dikti_camaba a where a.kode_lokasi='"+this.app._lokasi+"'";								 			 
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataNo = dataS;
			}
			var tot = 0;
			this.inValid = false;
			for (var i=0; i < this.sg2.getRowCount();i++){
				this.sg2.cells(0,i,"INVALID-"+this.sg2.cells(0,i));				
				for (var j=0;j < this.dataNo.rs.rows.length;j++){					
					if (this.sg2.cells(0,i).substr(8,30) == this.dataNo.rs.rows[j].no_reg) {						
						this.sg2.cells(0,i,this.sg2.cells(0,i).substr(8,30));							
					}					
				}	
				if (this.sg2.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;
				else tot += nilaiToFloat(this.sg2.cells(1,i));									
			}

			this.e_nilai.setText(floatToNilai(tot));	
			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg3.clear();
				setTipeButton(tbAllFalse);	
				for (var i=0; i < this.sg2.getRowCount();i++) {
					if (this.sg2.cells(0,i).substr(0,7) == "INVALID") {
						var j = i+1;	
						this.sg3.appendData([j]);
					}
				}
			}
		}
		catch(e) {
			alert(e);
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
			if (this.stsSimpan == 1) this.doClick();	
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");						
						sql.add("delete from dikti_cd where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					}			

					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_titip.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','CDINREG','BM','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");																
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','CDINREG','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+parseNilai(this.e_nilai.getText())+")");
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunCD+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','CDINREG','TITIP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+parseNilai(this.e_nilai.getText())+")");
				
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(0,i).substr(0,7) != "INVALID"){								
								sql.add("insert into dikti_cd(no_bukti,nim,periode,nilai,kode_lokasi,akun_cd,kode_param,dc,modul,no_ref1) values "+
												"('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg2.cells(1,i))+",'"+this.app._lokasi+"','"+this.akunCD+"','-','D','CDINREG','-')");
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
	
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");						
						sql.add("delete from dikti_cd where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.sg1.clear();
				this.sg2.clear();
				this.sg3.clear();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.doClick();
				this.doLoad();
				break;
			case "simpan" :
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);

				tot = 0;
				for (var i=0; i < this.sg2.getRowCount();i++){
					tot += nilaiToFloat(this.sg2.cells(1,i));										
				}
				this.e_nilai.setText(floatToNilai(tot));	

				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-CRI"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.stsSimpan = 1;
		setTipeButton(tbSimpan);
		this.e_ket.setFocus();
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan=0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select * from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.cb_titip.setText(line.akun_kb);													
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));										
					}
				}	

				var strSQL = "select a.nim,a.nilai from dikti_cd a where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg2.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg2.appendData([line1.nim,line1.nilai]);
					}
				} else this.sg2.clear(1);
			}	
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_siswa_rptSisBayarDaftar";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 = this.filter2;
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
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		var strSQL = "select a.no_kas, convert(varchar,a.tanggal,103) as tgl, a.keterangan "+
					 			 "from kas_m a "+
					 			 "where a.modul='CDINREG' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' ";
		var data = this.dbLib.getDataProvider(strSQL,true);		

		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_kas,line.tgl,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[1]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
});
