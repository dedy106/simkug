window.app_saku3_transaksi_yakes21_inves_fMIfee = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fMIfee.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fMIfee";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru MI Fee", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Nilai MI Fee", tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Nilai PPN", tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2,visible:false});										
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});		
		this.e_pph = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai PPh", tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Man. Investasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});										
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Tot. MI Fee", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,996,282], childPage:["Data Discre","Atensi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:0,				
				colTitle:["Tanggal","NAB","Nilai Fee"],
				colWidth:[[2,1,0],[150,150,80]],
				colFormat:[[1,2],[cfNilai,cfNilai]],								
				nilaiChange:[this,"doNilaiChange"],				
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.e_namaAtensi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,400,20],caption:"Nama Atensi", maxLength:150});	
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,400,20],caption:"Bank/Cabang", maxLength:150});	
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,400,20],caption:"No Rekening", maxLength:150});
		this.e_nmrek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,400,20],caption:"Nama Rekening", maxLength:150});			

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
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
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan=1;
			var strSQL = "select dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.app._periode.substr(0,4)+"-"+this.app._periode.substr(4,2)+"-01')+1,0)) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					this.dp_d1.setText(line.tglakhir);					
				}
			}

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
												
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where flag_aktif='1' and jenis='MI'",["kode_kelola","nama"],false,["Kode","Nama"],"and","Data MI",true);								
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN','BMHD','HUTPPH3') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "BMHD") this.akunBMHD = line.flag;									
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);	
					if (line.kode_spro == "HUTPPH3") this.akunHutPPh = line.flag;																																																											
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fMIfee.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fMIfee.implement({
	doLoad: function() {
		var strSQL = "select a.tanggal,round(a.nab,0) as nab,round(t1+t2+t3+t4,2) as mi_fee "+
					 "from inv_discre_his a "+
					 "where a.tanggal>'2019-12-30' and a.tanggal<= dateadd(day,-1,'"+this.dp_d1.getDateString()+"') and a.kode_kelola='"+this.cb_kelola.getText()+"' and a.no_akru='-' and a.nab<>0 "+
					 "order by a.tanggal ";							
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.tanggal,floatToNilai(line.nab),floatToNilai(line.mi_fee)]);
			}
		} else this.sg.clear(1);
		this.sg.validasi();
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_discre_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_discre_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("update inv_discre_his set no_akru='-' where no_akru = '"+this.e_nb.getText()+"' ");										
						// sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						// sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						// sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}		
					
					sql.add("insert into inv_discre_m(no_bukti,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,kode_drk,kode_kelola,periode,nilai,nik_buat,tgl_input,nik_user,progress,no_app1,modul,posted,nik_app,kode_plan,no_final, ppn,pph, no_kas ) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.cb_kelola.getText()+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','0','-','MIFEE','F', '-','"+this.cb_plan.getText()+"','-',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph.getText())+",'-')");								
												
					var total = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());		
					sql.add("insert into inv_discre_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunBeban+"','"+this.e_ket.getText()+"','D',"+total+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','MIFEE','BBN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into inv_discre_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.akunBMHD+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','MIFEE','BMHD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into inv_discre_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.akunHutPPh+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_pph.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','MIFEE','HUTPPH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){							
							sql.add("update inv_discre_his set no_akru='"+this.e_nb.getText()+"' where tanggal ='"+this.sg.cells(0,i)+"' and kode_kelola = '"+this.cb_kelola.getText()+"'");										
						}
					}
					
					//----------- PBH -------
					//jurnal langsung bayar tidak lewat PB
					// sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas) values  "+
					// 		"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'MIFEE','0','"+this.kodepp+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.e_nb.getText()+"','-','-','"+this.akunBMHD+"','"+this.app._userLog+"','NONBT','-','-')");					
					// sql.add("insert into pbh_rek(nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
					// 		"(0,'"+this.e_nb.getText()+"','"+this.app._lokasi+"','MIFEE','"+this.e_nmrek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_namaAtensi.getText()+"',"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+")");	
					// sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+		
					// 		"select no_bukti,no_dokumen,tanggal,0,kode_akun,keterangan,'D',nilai,kode_pp,kode_drk,kode_lokasi,'MIFEE','BEBAN',periode,nik_user,tgl_input,kode_curr,kurs "+
					// 		"from inv_discre_j "+
					// 		"where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis = 'BMHD'");		
					
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
					this.sg.clear(1);
					this.sg3.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan =1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);								
				break;
			case "simpan" :					
			case "ubah" :									
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_discre_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_discre_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("update inv_discre_his set no_akru='-' where no_akru = '"+this.e_nb.getText()+"' ");										
					// sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					// sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					// sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;						
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
			this.doLoad();
		}
	},	
	doClick:function(sender){			
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg.clear(1); 				
				this.sg3.clear(1);				
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_discre_m","no_bukti",this.app._lokasi+"-DSC"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}
	},		
	doChange: function(sender) {
		try {
			if (sender == this.cb_plan && this.cb_plan.getText()!="") {			
				var data = this.dbLib.getDataProvider("select kode_param,flag from inv_saham_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('DRKMIFEE','PPINV','MIFEE')",true);						
				if (typeof data == "object"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																	
						if (line.kode_param == "PPINV") this.kodepp = line.flag;													
						if (line.kode_param == "MIFEE") this.akunBeban = line.flag; 					
						if (line.kode_param == "DRKMIFEE") this.cb_drk.setText(line.flag);					
					}
				}
			}
			
			if (sender == this.cb_kelola && this.cb_kelola.getText()!="" && this.stsSimpan==1) {			
				this.doLoad();
			}

			if ((sender == this.e_nilai || sender == this.e_ppn || sender == this.e_pph) && this.e_nilai.getText()!="" && this.e_ppn.getText()!="" && this.e_pph.getText()!="") {
				var tot =  Math.round((nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText()) - nilaiToFloat(this.e_pph.getText())) * 100) / 100;
				this.e_total.setText(floatToNilai(tot));
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doNilaiChange: function(){
		try{
			var fee = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != ""){
					fee += nilaiToFloat(this.sg.cells(2,i));									
				}
			}			
			this.e_nilai.setText(floatToNilai(fee));
			this.e_ppn.setText(floatToNilai(Math.round(fee * 0.1)));
			this.e_pph.setText(floatToNilai(Math.round(fee * 0.02)));
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
			this.sg.clear(1);
			this.sg3.clear(1);	
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);						
			this.pc1.setActivePage(this.pc1.childPage[0]);						
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_discre_m a "+
					 //"inner join pbh_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi and b.progress in ('0','V') "+	
					 "where a.no_final='-' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,line.nilai,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);			
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbHapus);				
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_discre_m where no_bukti= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.tanggal);											
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_plan.setText(line.kode_plan);
						this.cb_drk.setText(line.kode_drk);						
						this.cb_kelola.setText(line.kode_kelola);						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.ppn));
						this.e_pph.setText(floatToNilai(line.pph));
					}
				}

				// var strSQL = "select * from pbh_rek a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				// var data = this.dbLib.getDataProvider(strSQL,true);
				// if (typeof data == "object"){
				// 	var line = data.rs.rows[0];							
				// 	if (line != undefined){													
				// 		this.e_namaAtensi.setText(line.nama);
                //         this.e_bank.setText(line.bank);
                //         this.e_norek.setText(line.no_rek);
                //         this.e_nmrek.setText(line.nama_rek);											
				// 	}
                // }	

				var strSQL = "select a.tanggal,round(a.nab,0) as nab,a.treal as mi_fee "+
							"from inv_discre_his a "+
							"left join inv_tier b on a.kode_kelola=b.kode_kelola and round(a.nab,0) between bawah and atas "+
							"where a.kode_kelola='"+this.cb_kelola.getText()+"' and a.no_akru='"+this.e_nb.getText()+"' and a.nab<>0 order by a.tanggal";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.tanggal,floatToNilai(line.nab),floatToNilai(line.mi_fee)]);
					}
				} else this.sg.clear(1);	
			
			}
		} catch(e) {alert(e);}
	}
});