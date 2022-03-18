window.app_saku3_transaksi_bpr_fKbDual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fKbDual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fKbDual";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Umum Dual Akun", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi","Filter Data"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No KasBank","Tanggal","No Ref","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,350,150,80,100]],
					colFormat:[[4],[cfNilai]],			
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});

		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenis",items:["PENGELUARAN","PENERIMAAN"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.cb_jurnal = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Referensi", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});				
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Unit / PP", readOnly:true});				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Saldo Budget TW", tag:1, tipeText:ttNilai, text:"0",readOnly:true});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Uraian", maxLength:150});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0"});						
		
		this.e_ket2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
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
			this.c_jenis.setText("PENGELUARAN");
			this.doChange(this.c_jenis);

			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fKbDual.extend(window.childForm);
window.app_saku3_transaksi_bpr_fKbDual.implement({	
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
			if (this.stsSimpan == 1) {				
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".","0000"));
			}

			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();			
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBDUAL','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_nilai.getText())+",0,0,'"+this.app._userLog+"','-','-','-','-','-','"+this.cb_jurnal.getText()+"','TUNAI','"+this.jenis+"')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunDebet+"','D',"+parseNilai(this.e_nilai.getText())+","+
							parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','KB','DEBET','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");							
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunKredit+"','C',"+parseNilai(this.e_nilai.getText())+","+
							parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','KB','KREDIT','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");		

					
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (this.garDebet == line.kode_gar) {		
							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) values "+
									"('"+this.e_nb.getText()+"','KB','"+this.app._lokasi+"','"+this.garDebet+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',"+parseNilai(this.e_saldo.getText())+","+
									parseNilai(this.e_nilai.getText())+",0,0,0,'-','-','-')");									
						}
						if (this.garKredit == line.kode_gar) {	
							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) values "+
									"('"+this.e_nb.getText()+"','KB','"+this.app._lokasi+"','"+this.garKredit+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.e_saldo.getText())+","+
									parseNilai(this.e_nilai.getText())+",0,0,0,'-','-','-')");		
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
					setTipeButton(tbSimpan);	
					this.sg3.clear(1);				
				break;
			case "simpan" :					
			case "ubah" :			
				this.dataAkunGar = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_gar from masgar where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}				
				
				for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
					var line = this.dataAkunGar.rs.rows[j];
					if (this.akunDebet == line.kode_gar) {		
						if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi.");
							return false;						
						}							
					}
				}
										
				this.preView = "1";
				this.akunKB = "-";
				if (this.c_jenis.getText() == "PENERIMAAN") {
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
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	},	
	doChange:function(sender){
		try {
			if (sender == this.c_jenis && this.c_jenis.getText()!="") {
				this.cb_jurnal.setText("","");
				var strSQL = "select a.kode_ref, a.nama "+
							 "from trans_ref a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
							 "where a.jenis='"+this.c_jenis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";							
				this.cb_jurnal.setSQL(strSQL,["kode_ref","nama"],false,["Kode","Nama"],"and","Data Referensi",true);

				if (this.c_jenis.getText() == "PENGELUARAN") this.jenis = "BK";
				else this.jenis = "BM";						
			}

			if (sender == this.cb_jurnal && this.cb_jurnal.getText()!="" && this.stsSimpan == 1) {				
				var data = this.dbLib.getDataProvider("select a.nama,a.akun_debet,a.akun_kredit,a.kode_pp, b.kode_gar as gar_debet,c.kode_gar as gar_kredit "+
							"from trans_ref a "+
							"inner join masakun b on a.akun_debet=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"inner join masakun c on a.akun_kredit=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							"where a.kode_ref='"+this.cb_jurnal.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.cb_pp.setText(line.kode_pp);						
						this.e_ket.setText(line.nama);						
						this.akunDebet = line.akun_debet;
						this.akunKredit = line.akun_kredit;		

						this.garDebet = line.gar_debet;
						this.garKredit = line.gar_kredit;

						var data = this.dbLib.getDataProvider("select fn_release1('"+this.app._lokasi+"','"+this.garDebet+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"') as gar ",true);						
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];
							data = line.gar.split(";");			
							this.e_saldo.setText(floatToNilai(parseFloat(data[0])));							
						}
					} 
				}
				this.e_ket.setFocus();															
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
								this.nama_report="server_report_saku3_produk_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			this.stsSimpan = 1;			
			this.sg3.clear(1);			
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},
	doCari:function(sender){																									
		var filter = "";
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		var strSQL = "select distinct a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.param1,a.keterangan,a.nilai1,a.tanggal "+
		             "from trans_m a "+		
					  "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+ 					 	 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KB' and a.form = 'KBDUAL' and a.posted ='F' "+filter+
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
		var strSQL = "select distinct a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.param1,a.keterangan,a.nilai1,a.tanggal "+
		             "from trans_m a "+			
					 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+ 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KB' and a.form = 'KBDUAL' and a.posted ='F'  "+
					 "order by a.tanggal";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.param1,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sg3.setNoUrut(start);
		this.pc2.setActivePage(this.pc2.childPage[1]);																		
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
								
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						
						if (line.jenis=="BM") this.c_jenis.setText("PENERIMAAN");							
						else this.c_jenis.setText("PENGELUARAN");	
						
						this.cb_pp.setText(line.kode_pp);
						this.e_ket.setText(line.keterangan);	
						this.cb_jurnal.setText(line.param1);						
						this.e_nilai.setText(floatToNilai(line.nilai1));
					}
				}
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.kode_gar from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.dc = 'D' and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																
						this.akunDebet = line.kode_akun;	
						this.garDebet = line.kode_gar;						
					} 
				}
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.kode_gar from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.dc = 'C' and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																
						this.akunKredit = line.kode_akun;					
						this.garKredit = line.kode_gar;							
					} 
				}

				var data = this.dbLib.getDataProvider("select fn_release2('"+this.app._lokasi+"','"+this.garDebet+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);						
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");			
					this.e_saldo.setText(floatToNilai(parseFloat(data[0])));							
				}
			}
		} catch(e) {alert(e);}		
	}
});