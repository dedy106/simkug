window.app_saku3_transaksi_fitnes_fDaftar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fDaftar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fDaftar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pendaftaran", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Registrasi","List Registrasi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,
		            colTitle:["No Reg","ID Peserta","Nikes","Nama","Tgl Mulai","Tgl Selesai","Nilai","No Flag"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,80,80,300,100,100,100]],
					colFormat:[[6],[cfNilai]],readOnly:true, autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"No Register",maxLength:30,readOnly:true,visible:false});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,18,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		this.e_nbkas = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"No KasBank",maxLength:30,readOnly:true,visible:false});
		
		this.cb_agg = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"ID Peserta", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_klp = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,400,20],caption:"Kategori", readOnly:true,change:[this,"doChange"]});		
		this.cb_mcu = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Hasil MCU", multiSelection:false, maxLength:10, tag:2});
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Jml Bulan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Berakhir", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18]}); 				
		this.e_tarif = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Tarif / Bulan", tag:9, tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Total", tag:9, tipeText:ttNilai, text:"0", readOnly:true});		
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Status",items:["CASH","PENDING"], readOnly:true,tag:2,change:[this,"doChange"]});		
		

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
			
			this.cb_agg.setSQL("select kode_agg, nama from fi_anggota where kode_lokasi='"+this.app._lokasi+"'",["kode_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);
			this.cb_mcu.setSQL("select kode_mcu, nama from fi_mcu where kode_lokasi='"+this.app._lokasi+"'",["kode_mcu","nama"],false,["Kode","Deskripsi"],"and","Data Hasil MCU",true);			
						
			this.tarif = 0;
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('FITARIF','FIDAF','FIKAS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "FIDAF") this.akunPdpt = line.flag;
					if (line.kode_spro == "FIKAS") this.akunKas = line.flag;
					if (line.kode_spro == "FITARIF") this.tarif = parseFloat(line.value1);
				}
			}
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fDaftar.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fDaftar.implement({
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
						sql.add("delete from fi_reg where no_reg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_m where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fi_regbayar_d where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into fi_reg(no_reg,kode_lokasi,tgl_awal,tgl_akhir,kode_agg,kode_mcu,tarif,jumlah,nilai,no_kas,periode,nik_user,tgl_input,status_bayar,kode_klp,kode_pp) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_agg.getText()+"','"+this.cb_mcu.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+","+nilaiToFloat(this.e_jml.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_nbkas.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+this.kodeKlp+"','"+this.app._kodePP+"')");					

					sql.add("insert into fi_regbayar_d (no_kas,no_reg,kode_lokasi,periode,nilai,dc,modul) values "+
							"('"+this.e_nbkas.getText()+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'D','KBDAFTAR')");
							
					if (this.c_status.getText() == "CASH") {
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
								"('"+this.e_nbkas.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','-','-','"+this.dp_d1.getDateString()+"','Pembayaran No Reg : "+this.e_nb.getText()+"','"+this.app._kodePP+"','KBDAFTAR','BM','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.e_nb.getText()+"','-','-')");					
					
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"('"+this.e_nbkas.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunKas+"','Pembayaran No Reg : "+this.e_nb.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBDAFTAR','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"('"+this.e_nbkas.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPdpt+"','Pembayaran No Reg : "+this.e_nb.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBDAFTAR','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					
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
					this.sg3.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				break;
			case "simpan" :				
			case "ubah" :				
				this.preView = "1";						
				var data = this.dbLib.getDataProvider("select no_reg from fi_reg where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and no_reg <> '"+this.e_nb.getText()+"' "+
													  "union all "+
													  "select no_reg from fi_reg where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d2.getDateString()+"' between tgl_awal and tgl_akhir and no_reg <> '"+this.e_nb.getText()+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					system.alert(this,"Transaksi tidak valid.","Tanggal masuk dalam range No Reg : "+line.no_reg);
					return false;						
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh kurang nol.");
					return false;						
				}
				if (nilaiToFloat(this.e_jml.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Jumlah tidak boleh nol atau kurang.");
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
					sql.add("delete from fi_reg where no_reg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_m where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fi_regbayar_d where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.sg3.clear(1);
		if (this.stsSimpan == 1) this.doClick();		
	},	
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg3.clear(1);
			this.e_nilai.setText("0");			
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_reg","no_reg",this.app._lokasi+"-RG"+this.e_periode.getText().substr(2,4)+".","00000"));
		this.e_nbkas.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));						
		this.cb_agg.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange: function(sender){
		try{
			if (sender == this.cb_agg && this.cb_agg.getText() != ""){
				var data = this.dbLib.getDataProvider("select b.p_diskon,b.kode_klp+' - '+b.nama as klp,b.kode_klp "+
				                                      "from fi_anggota a inner join fi_peserta_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
													  "where a.kode_agg='"+this.cb_agg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					this.e_klp.setText(line.klp);
					var tarifDisk = this.tarif - Math.round(parseFloat(line.p_diskon)/100 * this.tarif);
					this.e_tarif.setText(floatToNilai(tarifDisk));
					this.kodeKlp = line.kode_klp;
				}
			}
						
			if (sender == this.e_jml && this.e_jml.getText() != ""){
				var data = this.dbLib.getDataProvider("select convert(varchar,dateadd(month, "+nilaiToFloat(this.e_jml.getText())+", '"+this.dp_d1.getDateString()+"'),103) as due_date ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					this.dp_d2.setText(line.due_date);
					
					if (this.e_tarif.getText() != "") {
						var nilai = nilaiToFloat(this.e_jml.getText()) * nilaiToFloat(this.e_tarif.getText());
						this.e_nilai.setText(floatToNilai(nilai));
					}
					
				}
			}				
			
			if (sender == this.e_tarif && this.e_tarif.getText()!="") {
				if (this.e_jml.getText() != "") {
					var nilai = nilaiToFloat(this.e_jml.getText()) * nilaiToFloat(this.e_tarif.getText());
					this.e_nilai.setText(floatToNilai(nilai));
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
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
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){						
		var strSQL = "select a.no_reg,a.kode_agg,b.nama,b.nikkes,convert(varchar,a.tgl_awal,103) as tgl_awal,convert(varchar,a.tgl_akhir,103) as tgl_akhir,a.nilai,c.no_kas "+
		             "from fi_reg a inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "				left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_pp ='"+this.app._kodePP+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.posted='F' and a.tgl_awal='"+this.dp_d1.getDateString()+"' "+
					 "order by a.kode_agg";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();			
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];							
				this.sg3.appendData([line.no_reg,line.kode_agg,line.nikkes,line.nama,line.tgl_awal,line.tgl_akhir,floatToNilai(line.nilai),line.no_kas]); 
			}			
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);
		this.page = page-1;							
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
				
				if (this.page == undefined) this.page = 0;
				row = row + (this.page * 20);								
					
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.e_nbkas.setText(this.sg3.cells(7,row));								
				
				var strSQL = "select a.* "+
				             "from fi_reg a "+				             
							 "where a.no_reg = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tgl_awal);
						this.dp_d2.setText(line.tgl_akhir);
						this.e_jml.setText(floatToNilai(line.jumlah));
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.cb_agg.setText(line.kode_agg);
						this.cb_mcu.setText(line.kode_mcu);	
						this.c_status.setText(line.status_bayar);				
					}
				}																				
			}									
		} catch(e) {alert(e);}
	}
});