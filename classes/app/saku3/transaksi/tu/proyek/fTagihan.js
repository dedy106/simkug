window.app_saku3_transaksi_tu_proyek_fTagihan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fTagihan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fTagihan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembuatan Tagihan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Billing","List Billing"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		//this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"No Dokumen", maxLength:50});
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"NIK TTD",tag:2,multiSelection:false}); 								
		this.cb_proyek = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer",readOnly:true, change:[this,"doChange"]});															
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,282], childPage:["Data Tagihan","Data Akru Pdpt"]});
		
		this.e_nilaiproyek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,210,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true});	
		this.e_sisatagih = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,210,20],caption:"Sisa Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});	
		this.e_nilaipdpt = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,210,20],caption:"Tot Akru Pdpt", tag:1, tipeText:ttNilai, text:"0",readOnly:true});										
		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,210,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});										
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,210,20],caption:"PPN 10%", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"], readOnly:false});		
		//this.i_ppn = new portalui_imageButton(this.pc1.childPage[0],{bound:[240,14,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});						
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,210,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:0,
		            colTitle:["Periode","Nilai Pdpt"],
					colWidth:[[1,0],[100,100]],					
					columnReadOnly:[true,[0,1],[]],					
					colFormat:[[1],[cfNilai]],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_proyek.setSQL("select kode_proyek, nama from tu_proyek where progress not in ('R')  and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
							   
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;			
				}
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fTagihan.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fTagihan.implement({
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {
			if (this.stsWAPU == "NON") var ppn = Math.round(nilaiToFloat(this.e_nilai.getText()) * 0.1);	
			else var ppn = "0";

			this.e_ppn.setText(floatToNilai(ppn));
			this.sg.validasi();
			
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
						sql.add("delete from tu_prbill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						//ppn tidak dijurnal - 8-12-16
						//sql.add("delete from tu_prbill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						

						//dijurnal lagi ppn utk yg nonWAPU 14-3-18 
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}

					sql.add("insert into tu_prbill_m (no_bill,kode_lokasi,no_dokumen,tanggal,keterangan,kode_proyek,kode_cust,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,posted,nilai_ppn,modul) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_proyek.getText()+"','"+this.cb_cust.getText()+"','IDR',1,'"+this.cb_app.getText()+"','"+this.kodePP+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunPiutang+"','Z',"+nilaiToFloat(this.e_ppn.getText())+",'BILL')");
					
					/*
					ppn tidak dijurnal - 8-12-16
					sql.add("insert into tu_prbill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','"+this.cb_proyek.getText()+" - " + this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BILL','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");															
					sql.add("insert into tu_prbill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPPN+"','"+this.cb_proyek.getText()+" - " +this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BILL','HUTPPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");															
					*/		
					
					//ppn  dijurnal - 14-3-18,,pake ju_m
					if (this.e_ppn.getText()!="0") {
						sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_proyek.getText()+"','"+this.e_ket.getText()+"','-','BILLPRO','PROYEK','IDR',1,"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','"+this.e_periode.getText()+"','-',getdate(),'"+this.app._userLog+"')");					
						
						sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','BILLPRO','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");	
						sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPPN+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','BILLPRO','HUPPN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");	
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
					this.sg.clear(1); 	
					this.sg3.clear(1); 	
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick();
					this.pc2.setActivePage(this.pc2.childPage[0]);		
					this.pc1.setActivePage(this.pc1.childPage[0]);																
				break;
			case "simpan" :			
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_sisatagih.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Tagihan melebihi Sisa Tagihan.");
					return false;						
				}							
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
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
					sql.add("delete from tu_prbill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					//ppn tidak dijurnal - 8-12-16
					//sql.add("delete from tu_prbill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					//dijurnal lagi ppn utk yg nonWAPU 14-3-18 
					sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						

					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);			
		/*
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}		
		*/	
		if (this.stsSimpan == 1) this.doClick();						
	},	
	doChange:function(sender){	
		try {
			if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
				this.e_ket.setText(this.cb_proyek.rightLabelCaption);
				var strSQL = "select a.kode_pp,a.kode_cust,d.wapu,a.nilai,a.nilai-isnull(c.bill,0) as sisa, b.akun_piutang "+
							 "from tu_proyek a inner join tu_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "				   inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi = d.kode_lokasi "+
							 
							 "   left join (	"+
							 
							 "          select kode_proyek,kode_lokasi,sum(nilai) as bill from tu_prbill_m "+
							 "			where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_proyek.getText()+"' and no_bill<>'"+this.e_nb.getText()+"' "+
							 "			group by kode_lokasi,kode_proyek"+
							 							 
							 "    )  c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+
							 							
							 "where a.kode_proyek ='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){											
						this.cb_cust.setText(line.kode_cust);	
						this.kodePP = line.kode_pp;				
						this.akunPiutang = line.akun_piutang;
						this.e_nilaiproyek.setText(floatToNilai(line.nilai));	
						
						this.e_sisatagih.setText(floatToNilai(line.sisa));	

						this.stsWAPU = line.wapu;						
					}				
				}
				var strSQL = "select periode,sum(case dc when 'C' then nilai else -nilai end) as nilai "+
							 "from tu_prpyt_j where kode_lokasi='"+this.app._lokasi+"' and no_dokumen = '"+this.cb_proyek.getText()+"' and jenis='PDPT' "+
							 "group by periode ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				var tot = 0;
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.periode,floatToNilai(line.nilai)]);
						tot += parseFloat(line.nilai);
					}
					this.e_nilaipdpt.setText(floatToNilai(tot));
				} else this.sg.clear(1);		
			}		
		
			if ((sender == this.e_nilai || sender == this.e_ppn) && this.e_ppn.getText()!="") {		
				if (sender == this.e_nilai) this.doPPN(); 	
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doClick:function(sender){
		if (this.e_periode.getText()!= "" ) {							
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg3.clear(1);				
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prbill_m","no_bill",this.app._lokasi+"-BILP"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_app.setFocus();
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
					case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tu_rptProyekTagihan";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); 	
			this.sg3.clear(1); 	
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick();
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);																		
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																								
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from tu_prbill_m a left join ju_m b on a.no_bill=b.no_ju and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+					 					 
					 "where  a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='BILL'";					 
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
			this.sg3.appendData([line.no_bill,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select a.* "+
							 "from tu_prbill_m a "+	
							 "where a.no_bill = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.cb_app.setText(line.nik_app);	
						this.cb_proyek.setText(line.kode_proyek);																	
						this.e_nilai.setText(floatToNilai(line.nilai));	
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));												
					}
				}																		
			}									
		} catch(e) {alert(e);}
	}	
});