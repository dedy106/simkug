window.app_saku3_transaksi_rtrw_fKbDual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_fKbDual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_fKbDual";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Umum Dual Akun: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Transaksi","Transaksi","Cari Data"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No KasBank","Tanggal","No Ref","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,350,150,80,100]],
					colFormat:[[4],[cfNilai]],			
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.c_jenis = new saiCB(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"Jenis",items:["BK","BM"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		this.cb_jurnal = new saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"Referensi", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0"});				
		
		this.e_ket2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_jurnal.setSQL("select kode_jurnal, nama from refju_dual where kode_pp='"+this.app._kodePP+"' and modul='KB' and kode_lokasi='"+this.app._lokasi+"'",["kode_jurnal","nama"],false,["Kode","Nama"],"and","Data Referensi",true);						
			this.c_jenis.setText("BK");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_fKbDual.extend(window.childForm);
window.app_saku3_transaksi_rtrw_fKbDual.implement({	
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
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		
					}
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_jurnal.getText()+"','-','"+this.akunKB+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBDUAL','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");				
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunDebet+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBDUAL','DEBET','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilai.getText())+")");										
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunKredit+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBDUAL','KREDIT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilai.getText())+")");					
							
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"	('"+this.e_nb.getText()+"','KBDUAL','"+this.app._lokasi+"','"+this.akunDebet+"','"+this.app._kodePP+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.e_nilai.getText())+")");
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"	('"+this.e_nb.getText()+"','KBDUAL','"+this.app._lokasi+"','"+this.akunKredit+"','"+this.app._kodePP+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',0,"+nilaiToFloat(this.e_nilai.getText())+")");							
										
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
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";
				this.akunKB = "-";
				if (this.c_jenis.getText() == "BM") {
					var data = this.dbLib.getDataProvider("select kode_flag from flag_relasi where kode_akun='"+this.akunDebet+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){										
							if (line.kode_flag == "001" || line.kode_flag == "009") this.akunKB = this.akunDebet;
						} 
					}
				}
				else {
					var data = this.dbLib.getDataProvider("select kode_flag from flag_relasi where kode_akun='"+this.akunKredit+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){										
							if (line.kode_flag == "001" || line.kode_flag == "009") this.akunKB = this.akunKredit;
						} 
					}			
				}
				if (this.akunKB == "-"){
					system.alert(this,"Transaksi tidak valid.","Tidak ditemukan akun kasbank dalam referensi yang sesuai jenis transaksi.");
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		
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
		this.doLoad3();
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText() != "") {
			if (this.stsSimpan == 0) {								
				this.e_nilai.setText("0");								
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_jurnal.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){
		try {
			if (sender == this.c_jenis && this.stsSimpan == 1) this.doClick();				
			
			if (sender == this.cb_jurnal && this.cb_jurnal.getText()!="" && this.stsSimpan == 1) {			
				var data = this.dbLib.getDataProvider("select keterangan,akun_debet,akun_kredit,nilai from refju_dual where kode_jurnal='"+this.cb_jurnal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.akunDebet = line.akun_debet;
						this.akunKredit = line.akun_kredit;					
					} 
				}															
			}
		}
		catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			setTipeButton(tbAllFalse);		
			this.doLoad3();
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);		
			this.stsSimpan = 1;	
		} catch(e) {
			alert(e);
		}
	},
	doCari:function(sender){																									
		var filter = "";
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		var strSQL = "select distinct a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai,a.tanggal "+
		             "from kas_m a "+			 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBDUAL' and a.posted ='F' "+filter+
					 "order by a.tanggal";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);							
	},
	doLoad3:function(sender){																									
		var strSQL = "select distinct a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai,a.tanggal "+
		             "from kas_m a "+			 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBDUAL' and a.posted ='F' "+
					 "order by a.tanggal";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
		this.pc2.setActivePage(this.pc2.childPage[0]);																		
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select no_dokumen,keterangan,jenis,nilai "+
							 "from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);	
						this.e_ket.setText(line.keterangan);	
						this.cb_jurnal.setText(line.no_dokumen);						
						this.e_nilai.setText(floatToNilai(line.nilai));
					}
				}
				var data = this.dbLib.getDataProvider("select kode_akun from kas_j where dc = 'D' and no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																
						this.akunDebet = line.kode_akun;						
					} 
				}
				var data = this.dbLib.getDataProvider("select kode_akun from kas_j where dc = 'C' and no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																
						this.akunKredit = line.kode_akun;						
					} 
				}
			}
		} catch(e) {alert(e);}		
	}
});