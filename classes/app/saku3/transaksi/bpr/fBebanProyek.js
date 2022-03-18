window.app_saku3_transaksi_bpr_fBebanProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fBebanProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fBebanProyek";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Beban [Bayar] Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Beban","List Beban"]});		
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
		this.e_saldogar = new saiLabelEdit(this.pc2.childPage[0],{bound:[775,12,200,20],caption:"Saldo Budget", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.cb_proyek = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"ID Proyek",tag:1,readOnly:true,multiSelection:false,change:[this,"doChange"]}); 										
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[775,14,200,20],caption:"Saldo OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Akun Beban",tag:1,readOnly:true, change:[this,"doChange"]}); 									
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[775,17,200,20],caption:"Total Rincian", tag:1, tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});		
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Vendor",tag:1,readOnly:true,multiSelection:false}); 										
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[775,15,200,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[975,15,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});									
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[775,16,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0", readOnly:true});

		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[0,5,this.pc2.width-5,248],colCount:5,tag:0,
				colTitle:["Deskripsi Peruntukan","Satuan","Jumlah","Harga Sat","Total"],
				colWidth:[[4,3,2,1,0],[100,100,100,100,500]],
				columnReadOnly:[true,[4],[0,1,2,3]],
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],			
				pasteEnable:true,autoPaging:true,rowPerPage:50,afterPaste:[this,"doAfterPaste"], 									
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1, pager:[this,"doPager1"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);  
			this.cb_pp.setText(this.app._kodePP);			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.cb_app.setText(this.app._userLog);

			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);  
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPNM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "PPNM") this.akunPPNM = line.flag;											
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fBebanProyek.extend(window.childForm);
window.app_saku3_transaksi_bpr_fBebanProyek.implement({
	doAfterPaste: function(sender,totalRow){
		try {				
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();		

			this.sg1.validasi();							
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doPPN: function() {			
		if (this.e_nilai.getText() != "") {
			var ppn = Math.round(nilaiToFloat(this.e_nilai.getText()) * 0.1);
			this.e_ppn.setText(floatToNilai(ppn));
		}
	},	
	doLoadCBproyek: function() {			
			var strSQL = "select a.kode_proyek,a.nama as keterangan "+
						 "from pr_proyek a "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.progress='1'";			
			this.cb_proyek.setSQL(strSQL,["a.kode_proyek","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Proyek",true);									  
	},	
	doHitungGar: function(){
		var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){							
				this.statusGar = line.status_gar;					
			}
		}
		if (this.statusGar == "1") {
			var sakhir = 0;
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_release1('"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_release2('"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");			
				this.e_saldogar.setText(floatToNilai(parseFloat(data[0])));				
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {						
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
						sql.add("delete from pr_or_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
						sql.add("delete from pr_biaya_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','PR','BEBAN','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_proyek.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_ppn.getText())+",0,'"+this.cb_app.getText()+"','-','-','-','-','-','"+this.cb_vendor.getText()+"','-','-')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','PR','BEBAN','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");								
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunHutang+"','C',"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','PR','HUTANG','IDR',1,'"+this.cb_pp.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-','-','-','-')");								
					
					if (this.e_ppn.getText() != "0") {
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPPNM+"','D',"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.e_ket.getText()+"','PR','PPNM','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");								
					}	

					sql.add("insert into pr_or_d (no_bukti,kode_lokasi,periode,kode_proyek,kode_akun,dc,nilai,jenis,kode_pp,kode_drk,no_reverse) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.cb_akun.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'BEBAN','"+this.cb_pp.getText()+"','-','NONREV')");								
					
					if (this.sg1.getRowValidCount() > 0) {
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)) {
								sql.add("insert into pr_biaya_d (no_bukti,kode_lokasi,kode_proyek,nu,keterangan,jumlah,harga,satuan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_proyek.getText()+"',"+i+",'"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.sg1.cells(1,i)+"')");								
							}
						}
					}
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+												
							"('"+this.e_nb.getText()+"','BEBAN','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',"+parseNilai(this.e_saldogar.getText())+","+parseNilai(this.e_nilai.getText())+")");

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
					this.sg1.clear(1);							
				break;
			case "simpan" :					
			case "ubah" :									
				this.preView = "1";
				this.doHitungGar();
				this.sg1.validasi();				
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText()) ){
					system.alert(this,"Transaksi tidak valid.","Total Rincian tidak boleh melebihi Saldo OR.");
					return false;
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0 ){
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				if (this.statusGar == "1" && nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldogar.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh melebihi Saldo Budget");
					return false;
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
				this.preView = "0";		
				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
					sql.add("delete from pr_or_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
					sql.add("delete from pr_biaya_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																																	
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				this.sg1.clear(1);	
				this.e_total.setText("0");					
			}				
			this.stsSimpan = 1; 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BDD"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_pp.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){		
		try {
			if (sender == this.cb_pp || sender == this.cb_akun) {
				if (this.cb_pp.getText() != "" && this.cb_akun.getText() != "") {
					this.doHitungGar();
				}
			}

			if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan==1) this.doLoadCBproyek();
			if (sender == this.e_nilai || sender == this.e_ppn) {
				var tot = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());
				this.e_total.setText(floatToNilai(tot));
			}
			if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
				var strSQL = "select b.akun_beban,a.kode_drkb,b.akun_bmhd, a.nilai_or-isnull(c.tot_bdd,0) as sisa_or "+
							"from pr_proyek a "+						
							
							"inner join pr_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							
							"left join ( "+
							"   select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as tot_bdd "+
							"	 from pr_or_d where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_proyek "+						 
							") c on a.kode_proyek=c.kode_proyek "+

							"where a.kode_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='1'";		
												
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_saldo.setText(floatToNilai(line.sisa_or));	
						this.cb_akun.setText(line.akun_beban);						
						this.akunHutang = line.akun_bmhd;						
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doNilaiChange1: function(){
		try{			
			var sub = total = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(2,i) != "" && this.sg1.cells(3,i) != "") {					
					sub = nilaiToFloat(this.sg1.cells(2,i)) * nilaiToFloat(this.sg1.cells(3,i));										 
					this.sg1.cells(4,i,sub);
					total += nilaiToFloat(this.sg1.cells(2,i)) * nilaiToFloat(this.sg1.cells(3,i));										
				}
			}			
			this.e_nilai.setText(floatToNilai(Math.round(total * 100)/100));			
		}catch(e)
		{
			alert("[]"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 2 || col == 3) {	
			var sub = nilaiToFloat(this.sg1.cells(2,row)) * nilaiToFloat(this.sg1.cells(3,row));								
			this.sg1.cells(4,row,floatToNilai(sub));
			this.sg1.validasi();
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_produk_rptProyekJurnalBeban";
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
			this.sg1.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);		
			this.doClick();		
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1+a.nilai2 as nilai "+
		             "from trans_m a "+
		             "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and posted='F' and modul ='PR' and form='BEBAN'";	
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
									  "from pr_proyek a inner join trans_m b on a.kode_proyek =b.no_dokumen and a.kode_lokasi=b.kode_lokasi and b.modul='PR' and b.form='BEBAN' "+
									  "where b.no_bukti='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.progress='1'",["a.kode_proyek","a.nama"],false,["Kode","Nama"],"and","Data Proyek",true);
									  
				var strSQL = "select * from trans_m a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_proyek.setText(line.no_dokumen);
						this.cb_pp.setText(line.kode_pp);						
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik1);		
						this.cb_vendor.setText(line.param1);		
						this.e_ppn.setText(floatToNilai(line.nilai2));									
					}
				}																

				var strSQL = "select *,jumlah*harga as total from pr_biaya_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];								
						this.sg1.appendData([line.keterangan,line.satuan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();													
			}									
		} catch(e) {alert(e);}
	}
});