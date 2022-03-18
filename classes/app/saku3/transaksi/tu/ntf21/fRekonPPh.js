window.app_saku3_transaksi_tu_ntf21_fRekonPPh = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fRekonPPh.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fRekonPPh";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekon PPh Tagihan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["TAK PPN","Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		      		colTitle:["No Rekon","Tanggal","No Dokumen","Deskripsi","Pilih"],
					colWidth:[[4,3,2,1,0],[70,300,200,80,100]],
					readOnly:true,colFormat:[[4],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
					colTitle:["No TAK","Tanggal","No Dokumen","Deskripsi","Pilih"],
					colWidth:[[4,3,2,1,0],[70,300,200,80,100]],
					readOnly:true,colFormat:[[4],[cfButton]],
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],													 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								
		this.cb_proyek = new saiCBBL(this.pc2.childPage[1],{bound:[20,19,220,20],caption:"Proyek", readOnly: true, tag:1,change:[this,"doChange"]});				
		this.cb_cust = new saiCBBL(this.pc2.childPage[1],{bound:[720,19,220,20],caption:"Customer", readOnly: true,  maxLength:10, tag:0,change:[this,"doChange"],visible:false});							

		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,338], childPage:["Data Invoice"]});		
		this.c_stsBP = new saiCB(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Sts Bukti Potong",items:["BP","NON"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_bill = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Tagihan", readOnly: true,  maxLength:10, tag:1,change:[this,"doChange"]});						
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"PP / Unit", readOnly:true, tag:1});						
		this.cb_pph = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Akun BDD",readOnly:true, maxLength:10, tag:1});	
		this.cb_piutang = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Akun Piu/Hut PPh", multiSelection:false,  tag:1});							
		this.e_sisa = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Saldo Piutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_pph = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai PPh", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});					
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);								
			this.cb_pph.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_cust.setSQL("select kode_cust, nama from prb_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_proyek.setSQL("select kode_proyek, nama from prb_proyek where versi='NTF21' and progress='2' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Nama"],"and","Data Proyek",true);			

			this.c_stsBP.setText("NON");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fRekonPPh.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fRekonPPh.implement({
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
						sql.add("delete from prb_prbill_bayar where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from prb_prbdd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("update trans_m set param1 ='-' where no_bukti='"+this.noTak+"' and param1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					} 

					if (this.c_stsBP.getText() == "BP") {
						sql.add("insert into prb_prbill_bayar (no_rekon,kode_lokasi,periode,kode_pp,modul,no_bill,kode_cust,dc,nilai,nilai_pph,no_jurnal,kode_akun,no_tak) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','PPH','"+this.cb_bill.getText()+"','"+this.cb_cust.getText()+"','D',0,"+nilaiToFloat(this.e_pph.getText())+",'-','-','-')");
					}

					sql.add("update trans_m set param1 ='"+this.e_nb.getText()+"' where param1='-' and no_bukti='"+this.noTak+"' and kode_lokasi='"+this.app._lokasi+"'");	
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','NTF29','F','-','-','-','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_pph.getText())+",0,0,'"+this.app._userLog+"','"+this.app._userLog+"','-','"+this.cb_bill.getText()+"','"+this.cb_cust.getText()+"','-','-','"+this.c_stsBP.getText()+"','PPH')"); 					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_bill.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_pph.getText()+"','D',"+parseNilai(this.e_pph.getText())+","+
							parseNilai(this.e_pph.getText())+",'"+this.e_ket.getText()+"','NTF29','PPH','IDR',1,'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");			
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_bill.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.cb_piutang.getText()+"','C',"+parseNilai(this.e_pph.getText())+","+
							parseNilai(this.e_pph.getText())+",'PPh Psl 4 Ayat 2 : "+this.cb_proyek.getText()+"','NTF29','PIU','IDR',1,'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");
				
					sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_pph.getText()+"','"+this.kodePP+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_pph.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_proyek.getText()+"','NTF29')");		

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
					this.doLoad();
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (nilaiToFloat(this.e_pph.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai PPh tidak boleh nol atau kurang.");
					return false;						
				}				
				// if (nilaiToFloat(this.e_pph.getText()) > nilaiToFloat(this.e_sisa.getText()) ) {
				// 	system.alert(this,"Transaksi tidak valid.","Nilai PPh tidak boleh melebihi Saldo Piutang");
				// 	return false;						
				// } resiko andin kt rudi ... 16/3/21
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
					sql.add("delete from prb_prbill_bayar where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("delete from prb_prbdd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("update trans_m set param1 ='-' where no_bukti='"+this.noTak+"' and param1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);						
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);										
		if (this.stsSimpan == 1) {
			this.doClick();				
			this.doLoad();
		}
	},
	doChange:function(sender){				
		if (sender == this.e_periode && this.stsSimpan==1) {
			this.doClick();			
		}

		if ((sender == this.cb_bill || sender == this.c_stsBP) && this.cb_bill.getText()!="" && this.c_stsBP.getText()!="" && this.stsSimpan==1 ) {			
			var strSQL = "select a.no_bill,a.kode_proyek,a.akun_piutang,a.keterangan,round(a.total-isnull(b.bayar,0),2) as saldo,a.kode_pp,a.nilai_ppn "+
			             "from ( "+						 						 
						 
						 //"	select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi, sum(a.nilai+a.nilai_ppn-a.diskon) as total,a.kode_pp "+ 						 
						 "	select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi, a.nilai+a.nilai_ppn-a.diskon as total,a.kode_pp,a.nilai_ppn "+ 						 
						 "  from prb_prbill_m a  "+
						 "  where a.modul='BILL' and a.kode_cust='"+this.cb_cust.getText()+"' and (a.nilai) > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
						 //"  group by a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi,a.kode_pp "+						 
						 ")a  "+						 
						
						 "left join ( "+						
						 "    select no_bill,kode_lokasi,sum(case dc when 'D' then nilai+nilai_pph else -(nilai+nilai_pph) end) as bayar  "+
						 "    from prb_prbill_bayar where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "	  group by no_bill,kode_lokasi "+
						 ") b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+						 
						 
						 "where a.no_bill='"+this.cb_bill.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																
				this.cb_pp.setText(line.kode_pp);
				if (this.c_stsBP.getText() == "BP") {
					this.cb_piutang.setSQL("select kode_akun, nama from masakun where kode_akun='"+line.akun_piutang+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);		
					this.cb_piutang.setText(line.akun_piutang);
				}
				else {
					this.cb_piutang.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag ='060' where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);		
				}
				this.e_sisa.setText(floatToNilai(line.saldo));
				this.e_pph.setText(floatToNilai(line.nilai_ppn));								
			}		
		}	
		
		if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
			var strSQL =  "select a.kode_cust, b.akun_bdd, a.kode_pp "+
			              "from prb_proyek a "+			             
			              "   inner join prb_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+			            
						  "where a.versi='NTF21' and a.kode_proyek = '"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
			 			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];		
				this.cb_cust.setText(line.kode_cust);										
				this.cb_pph.setText(line.akun_bdd);		
				this.kodePP = line.kode_pp;																	
			}
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.sg3.clear(1);
			}
			this.stsSimpan = 1;			
			this.cb_cust.setSQL("select kode_cust, nama from prb_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-RPH"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tu_proyek_rptAkruFinalPphJurnal";
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
			this.sg3.clear(1); 					
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.stsSimpan = 1;
			this.doClick();		
			this.doLoad();
		} catch(e) {
			alert(e);
		}
	},			
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from trans_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'NTF29' and a.posted ='F'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
									
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					if (line != undefined){					
						this.c_stsBP.setText(line.param2);
						this.e_ket.setText(line.keterangan);							
						this.cb_cust.setSQL("select kode_cust, nama from prb_cust where kode_cust='"+line.no_ref2+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);									
						this.cb_cust.setText(line.no_ref2);	
					}
				}

				var strSQL = "select * from trans_j where jenis = 'PPH' and no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_pph.setText(line.kode_akun);
						this.e_pph.setText(floatToNilai(line.nilai));																	
					}
				}
				
				var strSQL = "select a.no_bill,a.no_verppn,a.kode_proyek,a.akun_piutang,a.keterangan,round(a.total-isnull(b.bayar,0),2) as saldo,a.kode_pp "+
							"from ( "+						 						 
							
							"	select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi, sum(a.nilai+a.nilai_ppn-a.diskon) as total,a.kode_pp,a.no_verppn "+ 						 
							"   from prb_prbill_m a  "+
							"   where a.modul='BILL' and a.kode_cust='"+this.cb_cust.getText()+"' and (a.nilai) > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
							"   group by a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi,a.kode_pp,a.no_verppn "+						 
							")a  "+						 
											 
							"inner join trans_m c on a.no_bill=c.no_ref1 and a.kode_lokasi=c.kode_lokasi  "+					 

							"left join ( "+						
						 	"     select no_bill,kode_lokasi,sum(case dc when 'D' then nilai+nilai_pph else -(nilai+nilai_pph) end) as bayar  "+
						 	"     from prb_prbill_bayar where no_rekon <> '"+this.e_nb.getText()+"' and kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"	  group by no_bill,kode_lokasi "+
						 	") b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+						 

							"where c.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];	
					this.cb_bill.setSQL("select no_bill,keterangan from prb_prbill_m where no_bill='"+line.no_bill+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Data Billing",true);			
					this.cb_bill.setText(line.no_bill);											
					this.cb_proyek.setText(line.kode_proyek);
					this.cb_pp.setText(line.kode_pp);
					this.cb_piutang.setText(line.akun_piutang);
					this.e_sisa.setText(floatToNilai(line.saldo));	
					
					this.noTak = line.no_verppn;
					
				}
			}						
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){																		
		var strSQL = "select a.no_app as no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_bill as no_dokumen,b.keterangan "+
		             "from prb_bill_app a "+
					 "inner join trans_m b on a.no_app=b.no_bukti and a.kode_lokasi=b.kode_lokasi and param1='-' "+
					 "inner join prb_prbill_m c on a.no_bukti=c.no_bill and a.kode_lokasi=c.kode_lokasi and c.sts_wapu='NON' and c.nilai_ppn<>0 "+
					 "inner join prb_proyek d on c.kode_proyek=d.kode_proyek and c.kode_lokasi=d.kode_lokasi and d.versi='NTF21' "+
					 "inner join prb_proyek_jenis e on e.kode_jenis=d.kode_jenis and e.kode_lokasi=d.kode_lokasi and e.kelompok='SEWA' "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,"Pilih"]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick(this.sg,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick(this.sg,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);
				this.noTak = this.sg.cells(0,row);
				var noBill = this.sg.cells(2,row);
				
				var strSQL = "select a.kode_proyek,a.kode_cust,a.keterangan,b.nama "+
							 "from prb_prbill_m a inner join prb_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi and b.versi='NTF21' "+
							 "where a.no_bill='"+noBill+"' and a.kode_lokasi='"+this.app._lokasi+"'";								 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_ket.setText(line.nama);					
						this.cb_cust.setText(line.kode_cust);
						this.cb_proyek.setText(line.kode_proyek);
						this.cb_bill.setText(noBill,line.keterangan);
					}
				}

			}						
		} catch(e) {alert(e);}
	}

});