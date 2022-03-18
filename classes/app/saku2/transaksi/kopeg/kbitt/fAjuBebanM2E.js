window.app_saku2_transaksi_kopeg_kbitt_fAjuBebanM2E = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuBebanM2E.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuBebanM2E";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Beban Multi PP: Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,13,222,20],caption:"Unit / PP",tag:2,multiSelection:false,change:[this,"doChange"]});         				
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No Agenda", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.c_jenis = new saiCB(this,{bound:[20,12,202,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2,visible:false});				
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"MTA",tag:1,multiSelection:false});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		
		this.e_total = new saiLabelEdit(this,{bound:[820,14,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.e_nover = new saiLabelEdit(this,{bound:[20,17,550,20],caption:"No Verifikasi", tag:9, readOnly:true});										
		this.e_memo = new saiMemo(this,{bound:[20,18,550,60],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,287], childPage:["Item Pertanggungan"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:0,
		            colTitle:["Nama Rek","No Rek","Bank-Cabang","Nilai"],
					colWidth:[[3,2,1,0],[100,300,200,300]],					
					colFormat:[[3],[cfNilai]],checkItem: true,
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],					
					afterPaste:[this,"doAfterPaste"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
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
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+								
								"where b.kode_flag in ('099') and b.kode_akun like '2%' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													

			
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a "+
								"inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+
								"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);													

			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAjuBebanM2E.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuBebanM2E.implement({		
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{				
					this.viewLap = true;
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from it_aju_multi where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										

					
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.app._namaUser+"','BMULTIREK','NON',0,'"+this.cb_app.getText()+"')");					
					
					sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'BEBAN')");

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){										
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(0,i)+"','-',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.e_ket.getText()+"')");																						
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
					setTipeButton(tbUbahHapus);					
					this.sg1.clear(1);
					this.sg2.clear(1);			
				break;
			case "ubah" :	
				this.sg1.validasi();		
								
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
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal.");
							return false;
						}
					}										
				}				
			
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				this.viewLap = false;				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_aju_multi where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
	},	
	doChange:function(sender){						
		try {
			if ((sender == this.e_periode || sender == this.cb_pp) && this.e_periode.getText()!="" && this.cb_pp.getText()!="") {						
				if (this.app._userStatus == "A") this.e_nb.setSQL("select no_aju, keterangan from it_aju_m where form = 'BMULTIREK' and modul='UMUM' and progress in ('A','K','R') and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_aju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
				else this.e_nb.setSQL("select no_aju, keterangan from it_aju_m where kode_pp ='"+this.cb_pp.getText()+"' and form = 'BMULTIREK' and modul='UMUM' and progress in ('A','K','R') and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_aju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		

			}		
			if (sender == this.e_nb && this.e_nb.getText()!="") {
				var data = this.dbLib.getDataProvider("select a.kode_pp,a.nik_app,a.kode_akun,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,"+
						   							  "isnull(x.no_kpa,'-') as no_ver,isnull(x.catatan,'-') as catatan "+
													  "from it_aju_m a "+						   
													  "left join (select a.no_kpa,a.no_bukti,a.kode_lokasi,a.catatan "+
													  "          from kpa_d a inner join kpa_m b on a.no_kpa=b.no_kpa and a.kode_lokasi=b.kode_lokasi "+
													  "          where b.no_kpaseb='-' and b.kode_lokasi='"+this.app._lokasi+"') x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   					   
													  "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.cb_pp.setText(line.kode_pp);
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);					
						this.cb_app.setText(line.nik_app);
						this.cb_akun.setText(line.kode_akun);
						this.e_ket.setText(line.keterangan);
						this.e_total.setText(floatToNilai(line.nilai));										
						this.e_nover.setText(line.no_ver);
						this.e_memo.setText(line.catatan);
						
					} 
				}		

				
				var data = this.dbLib.getDataProvider("select * from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.nama_rek,line.no_rek,line.bank,floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);							
				
			}								
		} 
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.viewLap) {
								this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu2";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			setTipeButton(tbUbahHapus);			
			this.sg1.clear(1);					
		} catch(e) {
			alert(e);
		}
	},
	doNilaiChange1: function(){		
		try{
			var totD =  0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != ""){
					totD += nilaiToFloat(this.sg1.cells(3,i));					
				}
			}						
			this.e_total.setText(floatToNilai(totD));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	}
});