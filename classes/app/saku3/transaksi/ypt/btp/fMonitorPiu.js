window.app_saku3_transaksi_ypt_btp_fMonitorPiu = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_btp_fMonitorPiu.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_btp_fMonitorPiu";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Monitoring Piutang Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","No Piutang"],
					colWidth:[[2,1,0],[100,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_cons = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Consumer",tag:2,multiSelection:false,change:[this,"doChange"]});		
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Customer", readOnly:true, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.cb_piutang = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No Piutang", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,22,400,20],caption:"Status",items:["PEMBUATAN LAPORAN","BERITA ACARA","CLOSING WFM","PENERBITAN NPK","BDM","FINANCE","PAID"], readOnly:true,tag:2,change:[this,"doChange"]});

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,282], childPage:["Data Billing"]});		
		this.e_akunpiu = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Akun Piutang", readOnly:true});												
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_nokwi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"No Kuitansi", tag:1, readOnly:true});		
		this.e_umur = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Umur Piutang (bln)", readOnly:true, text:"0", tipeText:ttNilai});									
		this.e_ke = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Termin Ke-", readOnly:true, text:"0", tipeText:ttNilai});									
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Uraian Bill", readOnly:true});													
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Tgl Proyek", readOnly:true});													
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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

			this.cb_cons.setSQL("select kode_cons,nama from consumer where kode_lokasi='"+this.app._lokasi+"'",["kode_cons","nama"],false,["Kode","Nama"],"and","Data Consumer",true);
			this.cb_cust.setSQL("select kode_cust, departemen from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","departemen"],false,["Kode","Nama"],"and","Data Customer",true);												
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_btp_fMonitorPiu.extend(window.childForm);
window.app_saku3_transaksi_ypt_btp_fMonitorPiu.implement({
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
						sql.add("delete from pr_monitor where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update pr_monitor set no_ref='-' where no_piutang='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_ref='"+this.e_nb.getText()+"' ");
					}
					
					
					sql.add("update pr_monitor set no_ref='"+this.e_nb.getText()+"' where no_piutang='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_ref='-' ");
					sql.add("insert into pr_monitor (no_bukti,kode_lokasi,tgl_input,nik_user,tanggal,periode,no_piutang,status,kode_cust,kode_cons,no_ref) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.cb_piutang.getText()+"','"+this.c_status.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_cons.getText()+"','-')");					
					
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
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :	
			case "ubah" :					
				this.simpan();
				break;							
			case "hapus" :	
								
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from pr_monitor where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update pr_monitor set no_ref='-' where no_piutang='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_ref='"+this.e_nb.getText()+"' ");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
			
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick();						
	},
	doChange:function(sender){		
		
		if ((sender == this.e_periode || sender == this.cb_cust) && (this.e_periode.getText()!= "" && this.cb_cust.getText()!= "" && this.stsSimpan==1)) {			
			var strSQL = "select a.no_piutang,a.keterangan from piutang_d a "+						 
						 "where a.kode_cons='"+this.cb_cons.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			this.cb_piutang.setSQL(strSQL,["a.no_piutang","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Piutang",true);											
		}

		if (sender == this.cb_cons && this.cb_cons.getText() != ""){				
			var strSQL = "select a.kode_cust,a.departemen from cust a inner join consumer b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi  "+
						 "where b.kode_cons ='"+this.cb_cons.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";									 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){									
					this.cb_cust.setText(line.kode_cust,line.departemen);
				}
			}
		}

		if (sender == this.cb_piutang && this.cb_piutang.getText()!= "") {
			var strSQL = "select b.keterangan,b.no_dokumen,b.no_kuitansi,a.akun_piutang,a.nilai+a.nilai_ppn as total,a.umur,convert(varchar,b.tgl_mulai,103) +' - '+convert(varchar,b.tgl_selesai,103) as tgl "+			             
						 "from piutang_d a "+	
						 "inner join bill_m b on a.no_piutang=b.no_bill and a.kode_lokasi=b.kode_lokasi "+					 						 
						 "where a.no_piutang='"+this.cb_piutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_akunpiu.setText(line.akun_piutang);	
					this.e_nilai.setText(floatToNilai(line.total));				
					this.e_umur.setText(floatToNilai(line.umur));						
					this.e_nokwi.setText(line.no_kuitansi);	
					this.e_tgl.setText(line.tgl);	
					this.e_ket.setText(line.keterangan);	
					this.e_ke.setText(line.no_dokumen);						
				} 
			}			
		}
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); 				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pr_monitor","no_bukti",this.app._lokasi+"-MON"+this.e_periode.getText().substr(2,4)+".","0000"));									
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
								//this.nama_report="server_report_saku3_travel_rptPiutangKasJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_piutang "+
		             "from pr_monitor a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_piutang]); 
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
								
				var strSQL = "select * from pr_monitor where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.c_status.setText(line.status);		
						this.cb_cons.setText(line.kode_cons);		
						this.cb_cust.setText(line.kode_cust);	
						this.cb_piutang.setText(line.no_piutang);		
					} 
				}							
			}									
		} catch(e) {alert(e);}
	}
});