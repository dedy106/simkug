window.app_saku3_transaksi_sapyakes_fBpjsPremi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fBpjsPremi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fBpjsPremi";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Premi BPJS", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.c_jenis = new saiCB(this,{bound:[20,13,200,20],caption:"Jenis",items:["PEGAWAI","PENSIUN","YAKES"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this,{bound:[20,14,220,20],caption:"Akun Debet", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"] });
		this.cb_vendor = new saiCBBL(this,{bound:[20,18,220,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"] });
		this.e_total = new saiLabelEdit(this,{bound:[820,18,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			

		this.pc1 = new pageControl(this,{bound:[20,12,1000,320], childPage:["Data Billing","Error Msg"]});		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:13,
					colTitle:["no_kartu", "nik", "npp", "nama", "hub_klg", "tgl_lahir", 
							  "faskes1", "faskesg", "tmt", "sts_peserta", "nilai","Validasi NPP","Validasi FASKES1"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,100]],
					colFormat:[[10],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});	

		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn1.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
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

			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi ='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
					
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.nikApp = line.nik;
			}

			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('PPBPCC') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPBPCC") this.kodepp = line.flag;										
				}
			}

			var data = this.dbLib.getDataProvider("select top 1 kode_drkcc from yk_produk",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.kodeDRK = line.kode_drkcc;
			}

			this.c_jenis.setText("PENSIUN");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fBpjsPremi.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fBpjsPremi.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
			
			var tot = 0 ;
			for (var i=0; i < this.sg1.getRowCount();i++){
				tot += nilaiToFloat(this.sg1.cells(10,i));	
			}	
			this.e_total.setText(floatToNilai(tot));

			this.inValid = false;
			

			/*
			dimatikan krn terlalu lemot 
			setTipeButton(tbAllFalse);
			this.doCekDataNikes();

			if (this.inValid) {
				system.alert(this,"Data tidak valid.","Terdapat data NPP yang tidak terdaftar.");
				return false;						
			} 
			else {
				setTipeButton(tbSimpan);
			}
			*/


			setTipeButton(tbAllFalse);
			this.doCekDataFaskes1();

			if (this.inValid) {
				system.alert(this,"Data tidak valid.","Terdapat data Faskes1 yang tidak terdaftar.");
				return false;						
			} 
			else {
				setTipeButton(tbSimpan);
			}


		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doCekDataNikes: function() {		
		var strSQL = "select nikes from yk_peserta ";					
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataNIS = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(11,i,"INVALID");
			for (var j=0;j < this.dataNIS.rs.rows.length;j++){
				if (this.sg1.cells(2,i) == this.dataNIS.rs.rows[j].nikes) {					
					this.sg1.cells(11,i,"VALID");				
				}
			}	
			if (this.sg1.cells(11,i) == "INVALID") this.inValid = true;									
		}	

		this.pc1.setActivePage(this.pc1.childPage[1]);	

		this.sg2.clear();
		for (var i=0; i < this.sg1.getRowCount();i++) {
			if (this.sg1.cells(11,i) == "INVALID") {
				var j = i+1;
				this.sg2.appendData([j+" - "+this.sg1.cells(2,i)]);						
			}
		}
	},
	doCekDataFaskes1: function() {		
		var strSQL = "select kode_tpkk from yk_tpkk ";					
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataTPKK = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(12,i,"INVALID");
			for (var j=0;j < this.dataTPKK.rs.rows.length;j++){
				if (this.sg1.cells(6,i) == this.dataTPKK.rs.rows[j].kode_tpkk) {					
					this.sg1.cells(12,i,"VALID");				
				}
			}	
			if (this.sg1.cells(12,i) == "INVALID") this.inValid = true;									
		}	

		this.pc1.setActivePage(this.pc1.childPage[1]);	

		this.sg2.clear();
		for (var i=0; i < this.sg1.getRowCount();i++) {
			if (this.sg1.cells(12,i) == "INVALID") {
				var j = i+1;
				this.sg2.appendData([j+" - "+this.sg1.cells(6,i)]);						
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_bpjs_m","no_bpjs",this.app._lokasi+"-BPPR"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into yk_bpjs_m(no_bpjs,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user,kode_loktuj,no_app,progress,  akun_debet,kode_vendor) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.kodepp+"','BPJSPREMI','"+this.c_jenis.getText()+"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.nikApp+"','F',getdate(),'"+this.app._userLog+"','"+this.app._lokasi+"','-','0', '"+this.cb_akun.getText()+"','"+this.cb_vendor.getText()+"')");

					sql.add("insert into yk_bpjs_j(no_bpjs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,kode_rek) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.kodepp+"','"+this.kodeDRK+"','"+this.app._lokasi+"','BPJSPREMI','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1,'-')");								
					sql.add("insert into yk_bpjs_j(no_bpjs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,kode_rek) values "+
							"('"+this.e_nb.getText()+"','"+this.kodeSAP+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_total.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','BPJSPREMI','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1,'"+this.kodeRek+"')");								

					for (var i=0; i < this.sg1.getRowCount();i++){
						if (nilaiToFloat(this.sg1.cells(2,i)) != 0) {				
							sql.add("insert into yk_bpjs_d ( nu, no_bpjs, kode_lokasi, no_kartu, nik, npp, nama, hub_klg, tgl_lahir, faskes1, faskesg, tmt, sts_peserta, nilai, periode, jenis) values "+
									"("+i+", '"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '"+this.sg1.cells(0,i)+"', '"+this.sg1.cells(1,i)+"', '"+this.sg1.cells(2,i)+"', '"+this.sg1.cells(3,i)+"', '"+this.sg1.cells(4,i)+"', '"+this.sg1.cells(5,i)+"', '"+this.sg1.cells(6,i)+"', '"+this.sg1.cells(7,i)+"', '"+this.sg1.cells(8,i)+"', '"+this.sg1.cells(9,i)+"', "+nilaiToFloat(this.sg1.cells(10,i))+", '"+this.e_periode.getText()+"', '"+this.c_jenis.getText()+"')");							
						}
					}			


					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_bpjs,no_urut,kode_lokasi,'PH',jenis,no_bpjs,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"', "+
							"'-' as kode_cust, "+
							"'-','-',"+
							"no_dokumen as kode_vendor,"+
							"'-','-','-',kode_rek,'-',case dc when 'D' then '-' else 'T' end "+
							"from yk_bpjs_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_bpjs='"+this.e_nb.getText()+"'");

					sql.add("update a set a.kode_task = b.spe_gl "+
							"from glsap a inner join sap_spe_gl b on a.kode_vendor=b.kode_mitra and a.kode_akun=b.kode_akun and b.jenis='VENDOR' "+
							"where a.no_bukti='"+this.e_nb.getText()+"'");
					
					
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (this.inValid) {
					system.alert(this,"Transaksi tidak valid.","Data tidak dapat disimpan.");
					return false;						
				}

				if (nilaiToFloat(this.e_total.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh kurang nol.");
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_bpjs_m","no_bpjs",this.app._lokasi+"-BPPR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doChange:function(sender){
		if (sender == this.cb_vendor && this.cb_vendor.getText()!="") {
			var data = this.dbLib.getDataProvider("select b.bp_hut, a.kode_sap,a.kode_rek "+
					"from vendor a inner join vendor_klp b on a.kode_klpvendor=b.kode_klpvendor and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_vendor='"+this.cb_vendor.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.akunHutang = line.bp_hut;
				this.kodeSAP = line.kode_sap;
				//this.kodeRek = line.kode_rek; --> diambil dari jenis PEGAWAI =R001 PENSIUN=R002
			}
		}

		if (sender == this.c_jenis && this.c_jenis.getText()!="") {
			if (this.c_jenis.getText() == "PEGAWAI") {
				this.cb_akun.setText("11050308");
				this.kodeRek = "R001";
			}
			if (this.c_jenis.getText() == "PENSIUN") {
				this.cb_akun.setText("61010201");
				this.kodeRek = "R002";
			}
			if (this.c_jenis.getText() == "YAKES") {
				this.cb_akun.setText("21080102");
				this.kodeRek = "R001";
			}
		}
	},

	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							//this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYptNon";
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
			this.sg1.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});