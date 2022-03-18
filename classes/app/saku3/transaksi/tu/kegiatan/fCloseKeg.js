window.app_saku3_transaksi_tu_kegiatan_fCloseKeg = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_tu_kegiatan_fCloseKeg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kegiatan_fCloseKeg";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Kegiatan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Daftar Kegiatan","Detail Kegiatan","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:0,
		            colTitle:["ID","Status","Kegiatan","Nilai Budget","Panitia","Tempat","Tgl Mulai","Tgl Selesai","Dasar / Sasaran","No Closing","Tgl Input"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[110,100,250,70,70,150,200,100,250,70,100]],					
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["CLOSE"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Closing", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,12,990,307], childPage:["Rekap"]});
		this.e_nobukti = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,250,20],caption:"ID Kegiatan", readOnly:true});		
		this.e_tgl1 = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,250,20],caption:"Tgl Mulai-Selesai", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Kegiatan", readOnly:true});					
		this.e_dasar = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"Dasar Kegiatan", readOnly:true});					
		this.e_sasar = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Sasaran Kegiatan", readOnly:true});					
		this.e_tempat = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"Tempat", readOnly:true});				
		this.cb_panitia = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Panitia", readOnly:true});								
		this.cb_budget = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Alokasi Budget", readOnly:true});

		this.e_budget = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Nilai Budget", readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Total Realisasi", readOnly:true, tipeText:ttNilai,text:"0"});						
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Saldo Budget", readOnly:true, tipeText:ttNilai, text:"0"});				
		
		//search
		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"ID Kegiatan", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);
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
			
			this.doLoad();					
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			//lintas lokasis
			this.cb_panitia.setSQL("select kode_panitia, nama from keg_panitia_m",["kode_panitia","nama"],false,["ID","Nama"],"and","Data Panitia",true);	
			this.cb_budget.setSQL("select kode_budget, nama from keg_budget",["kode_budget","nama"],false,["ID","Nama"],"and","Data Budget",true);														
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_tu_kegiatan_fCloseKeg.extend(window.childForm);
window.app_saku3_transaksi_tu_kegiatan_fCloseKeg.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		

					var vStatus = "C"; 																				
					sql.add("insert into keg_close_m (no_close,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','KEGIATAN','CLSKEG','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-')");								
					sql.add("update keg_aju_m set no_closing='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_aju='"+this.e_nobukti.getText()+"' ");
					

					//mengembalikan sisa budget yang sudah dialokasikan di pusat					
					var nilaiRev = -nilaiToFloat(this.e_saldo.getText());
					sql.add("insert into keg_aju_m (no_aju,kode_lokasi,nik_user,tgl_input,periode,kode_panitia,kode_budget,keterangan,tgl_mulai,tgl_selesai, dasar,sasaran,tempat,nilai,progress,kode_lokapp,no_app,nik_app,nik_panjar,no_closing) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.cb_panitia.getText()+"','"+this.cb_budget.getText()+"','REV BUDGET - CLOSING','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"', '-','-','-',"+nilaiRev+",'X','"+this.app._lokasi+"','"+this.e_nb.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.e_nb.getText()+"')");

					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);	
					this.doLoad();
					this.pc1.setActivePage(this.pc1.childPage[0]);			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.pc2.setActivePage(this.pc2.childPage[0]);															
					this.e_memo.setText("");					
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";		
				this.simpan();				
				break;				
				
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				
				sql.add("delete from keg_close_m where no_close='"+this.noAppLama+"'");	
				sql.add("delete from keg_aju_m where no_aju='"+this.noAppLama+"'");
				sql.add("update keg_aju_m set no_closing='-',progress='1' where no_aju='"+this.e_nobukti.getText()+"' ");	

				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
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
		this.cb_nb.setSQL("select a.no_aju as no_bukti, a.keterangan from keg_aju_m a inner join keg_close_m b on a.no_closing=b.no_close and a.kode_lokasi=b.kode_lokasi "+
						  "where b.nik_user='"+this.app._userLog+"' and b.kode_lokasi ='"+this.app._lokasi+"' and a.progress='C' ",["no_bukti","keterangan"],false,["No Pengajuan","Deskripsi"],"and","Daftar Pengajuan",true);	

		if (this.stsSimpan == 1) {
			this.doClick();
			this.doLoad();
		}
	},	
	doChange:function(sender){						
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {			
			var strSQL = "select a.no_aju as no_bukti,'CLOSE' as status,a.keterangan,a.nilai,"+
					" 	a.kode_panitia+' | '+b.nama as panitia,a.tempat, "+
					" 	convert(varchar,a.tgl_mulai,103) as tglawal, convert(varchar,a.tgl_selesai,103) as tglakhir, "+
					" 	a.dasar +' | '+a.sasaran as dasar,a.no_closing,convert(varchar,a.tgl_input,120) as tglinput "+
					"from keg_aju_m a "+
					"	  inner join keg_panitia_m b on a.kode_panitia=b.kode_panitia and a.kode_lokasi=b.kode_lokasi "+					
					"where a.no_aju='"+this.cb_nb.getText()+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);										
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"keg_close_m","no_close",this.app._lokasi+"-CLS"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();										
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				this.c_status.setText("CLOSE");						
				
				this.e_nobukti.setText(this.sg.cells(0,row));												
				var strSQL = "select a.no_aju as no_bukti,a.keterangan,a.nilai,"+
							" 	a.kode_panitia,a.kode_budget,a.tempat, "+
							" 	convert(varchar,a.tgl_mulai,103) +' - '+ convert(varchar,a.tgl_selesai,103) as tglkeg, "+
							" 	a.dasar,a.sasaran,a.no_closing "+
							"from keg_aju_m a "+
							"	  inner join keg_panitia_m b on a.kode_panitia=b.kode_panitia and a.kode_lokasi=b.kode_lokasi "+					
							"where a.no_aju='"+this.e_nobukti.getText()+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					this.e_tgl1.setText(line.tglkeg);
					this.e_ket.setText(line.keterangan);
					this.e_dasar.setText(line.dasar);
					this.e_sasar.setText(line.sasaran);
					this.e_tempat.setText(line.tempat);
					this.cb_panitia.setText(line.kode_panitia);
					this.cb_budget.setText(line.kode_budget);
					this.e_budget.setText(floatToNilai(line.nilai));
					
					this.noAppLama = line.no_closing;				
					this.e_memo.setText("-");						

					var data = this.dbLib.getDataProvider("select isnull(sum(nilai),0) as pakai from it_aju_m where no_ajukeg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and progress+modul <> '4PANJAR' ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];																		
						this.e_nilai.setText(floatToNilai(line.pakai));
					}
					var saldo = nilaiToFloat(this.e_budget.getText()) - nilaiToFloat(this.e_nilai.getText()); 
					this.e_saldo.setText(floatToNilai(saldo));
				}
				
				if (this.sg.cells(1,row) == "OPEN") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbHapus);							
					this.stsSimpan = 0;
				}
				
			}
		} catch(e) {alert(e);}
	},		
	doLoad:function(sender){
		if (this.app._userStatus == "A") var filter =  "  ";
		else var filter =  " a.nik_user='"+this.app._userLog+"' ";
		var strSQL = "select a.no_aju as no_bukti,'OPEN' as status,a.keterangan,a.nilai,"+
					" 	a.kode_panitia+' | '+b.nama as panitia,a.tempat, "+
					" 	convert(varchar,a.tgl_mulai,103) as tglawal, convert(varchar,a.tgl_selesai,103) as tglakhir, "+
					" 	a.dasar +' | '+a.sasaran as dasar,a.no_closing,convert(varchar,a.tgl_input,120) as tglinput "+
					"from keg_aju_m a "+
					"	  inner join keg_panitia_m b on a.kode_panitia=b.kode_panitia and a.kode_lokasi=b.kode_lokasi "+					
					"where a.kode_lokasi='"+this.app._lokasi+"' and a.progress = '1' "+filter;
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
			this.sg.appendData([line.no_bukti,line.status.toUpperCase(),line.keterangan,floatToNilai(line.nilai), line.panitia,line.tempat,line.tglawal,line.tglakhir,line.dasar,line.no_closing,line.tglinput]); 
		}
		this.sg.setNoUrut(start);
	},
	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
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
								this.pc1.hide();
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
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.pc2.setActivePage(this.pc2.childPage[0]);																
			this.e_memo.setText("");			
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});

