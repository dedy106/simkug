window.app_saku3_transaksi_tu_proyek_fAkruPiu = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fAkruPiu.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fAkruPiu";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengakuan Piutang Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Akru","List Akru"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,500,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:1,multiSelection:false,change:[this,"doChange"]});
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"NIK Approve",tag:2,multiSelection:false}); 						
		this.cb_proyek = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"ID Proyek",tag:1,readOnly:true,multiSelection:false,change:[this,"doChange"]}); 								
		//this.cb_pnj = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"PngJawab Proyek",readOnly:true,tag:2,readOnly:true}); 										
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});									
		this.cb_akunpiu = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Akun Piutang",tag:0,readOnly:false}); 						
		this.cb_akunpyt = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun PYT",tag:0,readOnly:false}); 						
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Saldo Piutang", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Nilai Akru", tag:1, tipeText:ttNilai, text:"0"});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); // kode_pp='"+this.app._kodePP+"' and 
			this.cb_pp.setText(this.app._kodePP);
			
			//this.cb_pnj.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);

			//this.cb_app.setSQL("select a.nik, a.nama from karyawan a  inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			//				   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_akunpiu.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_akunpyt.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fAkruPiu.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fAkruPiu.implement({
	doLoadCBproyek: function() {
			var strSQL = "select a.kode_proyek,a.nama as keterangan "+
						 "from tu_proyek a 							"+
						 "left join ( 								"+
						 
						 "	select no_dokumen,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai_piu "+
						 "	from tu_prpiutang_m					"+
						 "	where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
						 "	group by no_dokumen,kode_lokasi			"+
						 ")	b										"+
						 
						 "on a.kode_proyek=b.no_dokumen and a.kode_lokasi=b.kode_lokasi 			"+
						 "where a.progress='1' and  a.nilai-ISNULL(nilai_piu,0)>0 and 									"+
						 "a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"'	";
			
			this.cb_proyek.setSQL(strSQL,["a.kode_proyek","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Proyek",true);									  
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
						sql.add("delete from tu_prpiutang_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from tu_prpiutang_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																											
					}					
					
					sql.add("insert into tu_prpiutang_m (no_bukti,no_dokumen,tanggal,keterangan,akun_piutang,akun_pyt,nik_buat,nik_app,kode_lokasi,kode_pp,modul,nilai,posted,periode,nik_user,tgl_input, kode_pp2,dc) values "+
					        "('"+this.e_nb.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_akunpiu.getText()+"','"+this.cb_akunpyt.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','PRPIU',"+nilaiToFloat(this.e_nilai.getText())+",'F','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','D')")
					
					sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akunpiu.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PRPIU','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_akunpyt.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PRPIU','PYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					

					
					//jika sudah pernah di akru tidak dapat dikoreksi (harus ke amandemen)
					sql.add("update tu_proyek set progress='2' where progress='1' and kode_proyek ='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
					setTipeButton(tbAllFalse);
					this.sg3.clear(1);					
					//this.doLoadCBproyek();
				break;
			case "simpan" :					
			case "ubah" :
				/*
				cari nilai ny untuk sleesihkan... nilai ubah piutang(total) tidak boleh kurang dari yg sudah nilai akru pdpt
				var strSQL = "select count(*) as jml "+
							 "from tu_prpyt_j "+
							 "where jenis = 'PYT' and no_dokumen='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						if (parseFloat(line.jml) > 0) {
							system.alert(this,"Transaksi tidak dapat dihapus.","Transaksi sudah pernah di akru pendapatan.");
							return false;						
						}																							
					}
				}			
				*/	
				
				
				this.preView = "1";
				 if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_nilai.getText()) ){
					system.alert(this,"Transaksi tidak valid.","Total Akru tidak boleh melebihi Saldo.");
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
				var strSQL = "select count(*) as jml "+
							 "from tu_prpyt_j "+
							 "where jenis = 'PYT' and no_dokumen='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						if (parseFloat(line.jml) > 0) {
							system.alert(this,"Transaksi tidak dapat dihapus.","Transaksi sudah pernah di akru pendapatan.");
							return false;						
						}																							
					}
				}
				this.preView = "0";		
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tu_prpiutang_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from tu_prpiutang_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																											
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				}
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			if (this.stsSimpan == 1) {
				this.doClick();
				//this.doLoadCBproyek();
			}
		}
		catch (e) {
			alert(e);
		}			
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.sg3.clear(1);			
				this.e_nilai.setText("0");	
				//this.doLoadCBproyek();
			}				
			this.stsSimpan = 1; 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prpiutang_m","no_bukti",this.app._lokasi+"-PIU"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_pp.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText() != "") this.doLoadCBproyek();

		if (sender == this.cb_proyek && this.cb_proyek.getText()!="" && this.stsSimpan==1) {
			this.e_ket.setText(this.cb_proyek.rightLabelCaption);
			var strSQL = "select b.akun_piutang,b.akun_pyt,a.nilai-isnull(c.nilai_piu,0) as sisa_akru,a.nik_app "+
						 "from tu_proyek a "+
						 "inner join tu_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+

						 "left join ( "+						 		
						 		"select no_dokumen,kode_lokasi,isnull(sum(case dc when 'D' then nilai else -nilai end),0) as nilai_piu "+
						 		"from tu_prpiutang_m "+
						 		"where no_dokumen='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 		"group by no_dokumen,kode_lokasi "+						 		
						 "		) c "+
						 "		on  a.kode_proyek=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+
						 
					     "where a.kode_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
					     		   			 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.cb_akunpiu.setText(line.akun_piutang);
					this.cb_akunpyt.setText(line.akun_pyt);	
					this.e_saldo.setText(floatToNilai(line.sisa_akru));		
					this.e_nilai.setText(floatToNilai(line.sisa_akru));												
				}
			}
	
		}	
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_tu_rptProyekPiutangJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);
			this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			//this.doLoadCBproyek();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from tu_prpiutang_m a "+
		             "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and posted='F' and modul ='PRPIU'";	
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;					
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				this.cb_proyek.setSQL("select a.kode_proyek, a.nama "+
									  "from tu_proyek a inner join tu_prpiutang_m b on a.kode_proyek =b.no_dokumen and a.kode_lokasi=b.kode_lokasi "+
									  "where b.no_bukti='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.kode_proyek","a.nama"],false,["Kode","Nama"],"and","Data Proyek",true);
									  
				var strSQL = "select * from tu_prpiutang_m a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_proyek.setText(line.no_dokumen);
						this.cb_pp.setText(line.kode_pp);						
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);						
					}
				}																

				var strSQL = "select b.akun_piutang,b.akun_pyt,a.nilai-isnull(c.nilai_piu,0) as sisa_akru,d.nilai, a.nik_app "+
							"from tu_proyek a "+
							"inner join tu_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							"inner join tu_prpiutang_m d on a.kode_proyek=d.no_dokumen and a.kode_lokasi=d.kode_lokasi and d.modul='PRPIU'  "+
							"left join ( "+						 		
									"select no_dokumen,kode_lokasi,isnull(sum(case dc when 'D' then nilai else -nilai end),0) as nilai_piu "+
									"from tu_prpiutang_m "+
									"where no_bukti <> '"+this.e_nb.getText()+"' and no_dokumen='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									"group by no_dokumen,kode_lokasi "+						 		
							"		) c "+
							"		on  a.kode_proyek=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+
							
							"where d.no_bukti='"+this.e_nb.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"'";		
												
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_akunpiu.setText(line.akun_piutang);
						this.cb_akunpyt.setText(line.akun_pyt);	
						this.e_saldo.setText(floatToNilai(line.sisa_akru));		
						this.e_nilai.setText(floatToNilai(line.nilai));		
						//this.cb_pnj.setText(line.nik_app,line.nama);							
					}
				}
														
			}									
		} catch(e) {alert(e);}
	}
});