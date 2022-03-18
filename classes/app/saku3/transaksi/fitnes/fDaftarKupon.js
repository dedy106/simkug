window.app_saku3_transaksi_fitnes_fDaftarKupon = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fDaftarKupon.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fDaftarKupon";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Aktifasi Voucher", 0);	
		
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
		this.e_nbju = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"No JU",maxLength:30,readOnly:true,visible:false});
		
		this.cb_agg = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"ID Peserta", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_status = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Status", readOnly:true});		
		this.cb_mcu = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Hasil MCU", multiSelection:false, maxLength:10, tag:2});		
		this.cb_kupon = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"No Voucher", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_tglaktif = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Tgl Aktif", tag:1, readOnly:true});		
		this.e_tglakhir = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Tgl Akhir", tag:1, readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		

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
									
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('FIDAF','FIPYT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "FIPYT") this.akunPyt = line.flag;					
					if (line.kode_spro == "FIDAF") this.akunPdpt = line.flag;					
				}
			}
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fDaftarKupon.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fDaftarKupon.implement({
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
						sql.add("delete from ju_m where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fi_regbayar_d where no_kas = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update fi_kupon_d set no_flag='-',modul='-' where no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}					
					
					sql.add("insert into fi_reg(no_reg,kode_lokasi,tgl_awal,tgl_akhir,kode_agg,kode_mcu,tarif,jumlah,nilai,no_kas,periode,nik_user,tgl_input) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.cb_agg.getText()+"','"+this.cb_mcu.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_nbju.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					

					sql.add("insert into fi_regbayar_d (no_kas,no_reg,kode_lokasi,periode,nilai,dc,modul) values "+
							"('"+this.e_nbju.getText()+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'D','JUKUPON')");
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
							"('"+this.e_nbju.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','Aktifasi Voucher : "+this.cb_kupon.getText()+"','"+this.app._kodePP+"','JUKUPON','KUPON','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','"+this.cb_kupon.getText()+"',getdate(),'"+this.app._userLog+"')");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nbju.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPyt+"','Aktifasi Voucher "+this.cb_kupon.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUKUPON','PYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nbju.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPdpt+"','Aktifasi Voucher "+this.cb_kupon.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUKUPON','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
										
					sql.add("update fi_kupon_d set no_flag='"+this.e_nb.getText()+"',modul='JUKUPON' where no_kupon='"+this.cb_kupon.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							
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
					this.cb_kupon.setSQL("select no_kupon, convert(varchar,tgl_akhir,103) as tgl_akhir from fi_kupon_d where '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and no_flag='-' and kode_lokasi='"+this.app._lokasi+"'",["no_kupon","tgl_akhir"],false,["No Voucher","Exp Date"],"and","Data Voucher",true);			
				break;
			case "simpan" :				
			case "ubah" :				
				this.preView = "1";						
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.e_status.getText() == "AKTIF") {
					system.alert(this,"Transaksi tidak valid.","Peserta masih berstatus AKTIF.");
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
					sql.add("delete from ju_m where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fi_regbayar_d where no_kas = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update fi_kupon_d set no_flag='-',modul='-' where no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) {
			this.cb_kupon.setText("","");
			this.cb_kupon.setSQL("select no_kupon, convert(varchar,tgl_akhir,103) as tgl_akhir from fi_kupon_d where '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and no_flag='-' and kode_lokasi='"+this.app._lokasi+"'",["no_kupon","tgl_akhir"],false,["No Voucher","Exp Date"],"and","Data Voucher",true);			
			this.doClick();		
		}
	},	
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg3.clear(1);
			this.e_nilai.setText("0");			
			this.cb_kupon.setSQL("select no_kupon, convert(varchar,tgl_akhir,103) as tgl_akhir from fi_kupon_d where '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and no_flag='-' and kode_lokasi='"+this.app._lokasi+"'",["no_kupon","tgl_akhir"],false,["No Voucher","Exp Date"],"and","Data Voucher",true);			
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_reg","no_reg",this.app._lokasi+"-RG"+this.e_periode.getText().substr(2,4)+".","00000"));
		this.e_nbju.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));						
		this.cb_agg.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange: function(sender){
		try{
			if (sender == this.cb_agg && this.cb_agg.getText() != ""){
				var data = this.dbLib.getDataProvider("select no_reg,kode_mcu from fi_reg where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];			
					this.e_status.setText("AKTIF");									
				} 
				else {
					this.e_status.setText("NONAKTIF");					
				}
			}					
			if (sender == this.cb_kupon && this.cb_kupon.getText() != "") {
				var data = this.dbLib.getDataProvider("select convert(varchar,tgl_awal,103) as tgl1,convert(varchar,tgl_akhir,103) as tgl2,harga from fi_kupon_d where no_kupon='"+this.cb_kupon.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];			
					this.e_tglaktif.setText(line.tgl1);									
					this.e_tglakhir.setText(line.tgl2);									
					this.e_nilai.setText(floatToNilai(line.harga));									
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
			this.cb_kupon.setSQL("select no_kupon, convert(varchar,tgl_akhir,103) as tgl_akhir from fi_kupon_d where '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and no_flag='-' and kode_lokasi='"+this.app._lokasi+"'",["no_kupon","tgl_akhir"],false,["No Voucher","Exp Date"],"and","Data Voucher",true);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){						
		var strSQL = "select a.no_reg,a.kode_agg,b.nama,b.nikkes,convert(varchar,a.tgl_awal,103) as tgl_awal,convert(varchar,a.tgl_akhir,103) as tgl_akhir,a.nilai,c.no_ju "+
		             "from fi_reg a inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "				inner join ju_m c on a.no_kas=c.no_ju and a.kode_lokasi=c.kode_lokasi "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.posted='F'";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();			
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];							
				this.sg3.appendData([line.no_reg,line.kode_agg,line.nikkes,line.nama,line.tgl_awal,line.tgl_akhir,floatToNilai(line.nilai),line.no_ju]); 
			}			
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);						
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
				this.e_nbju.setText(this.sg3.cells(7,row));								
				
				var strSQL = "select a.*,b.no_kupon "+
				             "from fi_reg a inner join fi_kupon_d b on a.no_reg=b.no_flag and a.kode_lokasi=b.kode_lokasi "+				             
							 "where a.no_reg = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tgl_awal);
						this.cb_agg.setText(line.kode_agg);
						this.cb_mcu.setText(line.kode_mcu);						
						
						this.cb_kupon.setSQL("select no_kupon, convert(varchar,tgl_akhir,103) as tgl_akhir from fi_kupon_d where no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kupon","tgl_akhir"],false,["No Voucher","Exp Date"],"and","Data Voucher",true);			
						this.cb_kupon.setText(line.no_kupon);						
					}
				}																				
			}									
		} catch(e) {alert(e);}
	}
});