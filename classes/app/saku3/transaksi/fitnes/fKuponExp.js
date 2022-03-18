window.app_saku3_transaksi_fitnes_fKuponExp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fKuponExp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fKuponExp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Expired Voucher", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nbju = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No KasBank",maxLength:30,readOnly:true,visible:false});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,12,200,20],caption:"Total Nilai", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,13,995,360], childPage:["Data Voucher"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["No Seri Voucher","Tgl Aktif","Tgl Exp","Nilai"],
					colWidth:[[3,2,1,0],[80,80,80,200]],										
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					autoPaging:true,rowPerPage:20,
					nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});				
		
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
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('FIPYT','FIDAF') and kode_lokasi = '"+this.app._lokasi+"'",true);			
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
window.app_saku3_transaksi_fitnes_fKuponExp.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fKuponExp.implement({
	doLoad:function(sender){								
		var strSQL = "select no_kupon,convert(varchar,tgl_awal,103) as tgl1,convert(varchar,tgl_akhir,103) as tgl2,harga as nilai from fi_kupon_d where kode_lokasi='"+this.app._lokasi+"' and no_flag='-' and tgl_akhir<'"+this.dp_d1.getDateString()+"' ";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();			
			this.sg1.clear();			
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];											
				this.sg1.appendData([line.no_kupon,line.tgl1,line.tgl2,floatToNilai(line.nilai)]); 				
			}			
		} else this.sg1.clear(1);					
		this.sg1.validasi();
	},
	doTampilData1: function(page) {
		this.sg1.doSelectPage(page);						
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
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
						sql.add("delete from ju_m where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update fi_kupon_d set no_flag='-',modul='-' where no_flag = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
							"('"+this.e_nbju.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.app._kodePP+"','JUEXP','KUPON','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','-',getdate(),'"+this.app._userLog+"')");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nbju.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPyt+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUEXP','PYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nbju.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPdpt+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUEXP','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
										
					for (var i=0; i < this.sg1.getRowCount(); i++){					
						sql.add("update fi_kupon_d set no_flag='"+this.e_nbju.getText()+"',modul='JUEXP' where no_kupon='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg3.clear(1); this.sg1.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				break;
			case "simpan" :				
			case "ubah" :				
				this.preView = "1";						
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
					sql.add("delete from ju_m where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update fi_kupon_d set no_flag='-',modul='-' where no_flag = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			this.doLoad();
			this.doClick();		
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg3.clear(1);
			this.e_nilai.setText("0");	
			this.sg1.clear(1);			
		}
		this.stsSimpan = 1;
		this.e_nbju.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));						
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},		
	doNilaiChange1: function(){
		try{
			var tot = 0;			
			for (var i=0; i < this.sg1.getRowCount();i++){				
				if (this.sg1.cells(3,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(3,i));
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
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nbju.getText()+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nbju.getText()+")","");							
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
			this.sg3.clear(1); this.sg1.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){								
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from ju_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' and a.modul='JUEXP' ";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();			
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];							
				this.sg3.appendData([line.no_ju,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.e_nbju.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select * from ju_m  "+				             
							 "where no_ju = '"+this.e_nbju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
					}
				}

				var strSQL = "select no_kupon,convert(varchar,tgl_awal,103) as tgl1,convert(varchar,tgl_akhir,103) as tgl2,harga as nilai from fi_kupon_d where kode_lokasi='"+this.app._lokasi+"' and no_flag='"+this.e_nbju.getText()+"' ";	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();			
					this.sg1.clear();			
					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];											
						this.sg1.appendData([line.no_kupon,line.tgl1,line.tgl2,floatToNilai(line.nilai)]); 				
					}			
				} else this.sg1.clear(1);					
				this.sg1.validasi();
				
			}									
		} catch(e) {alert(e);}
	}
});