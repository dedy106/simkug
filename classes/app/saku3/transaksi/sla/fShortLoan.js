window.app_saku3_transaksi_sla_fShortLoan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sla_fShortLoan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fShortLoan";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data ShortLoan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.cb_cocd = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Data CoCd",tag:2, multiSelection:false , change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,410], childPage:["Data ShortTerm","Daftar ShortTerm"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["ID Data","Periode","Deskripsi","Total Eq. IDR"],
					colWidth:[[3,2,1,0],[100,250,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
			
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"ID Data",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,500,20],caption:"Deskripsi",maxLength:200});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,330], childPage:["Data Load","Rekap Data"]});						
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:18,tag:0,
				colTitle:["Bank","Company","Status JB","Type Interest","Curr","Nilai Curr","Nilai IDR","Years","Sum of Ttl. Faclty","Due Date","Intrs Paymt Perd","Rate of Intrs","Rate","Sum Coll Recvbl","Sum Coll Fixed Asset","Sum Coll Invntry","Info DueDate","Info Others"],
				colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,150,100,100,100,100,100,100,100,100,100,100,100,100,100,100]],
				readOnly:true,
				colFormat:[[5,6,8,12,13,14,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				pasteEnable:true,afterPaste:[this,"doAfterPaste"],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.e_total = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Total Eq. IDR",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});									
		this.e_totscr = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"SoC Receivible",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});									
		this.e_totsca = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,200,20],caption:"SoC Asset",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});									
		this.e_totsci = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"SoC Inventory",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});									

		// this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,327], childPage:["Data MoU","Schedule Angsuran","Rekap Pinjaman","Upload Dokumen"]});						
		// this.cb_mitra = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Data Mitra",tag:1, multiSelection:false, change:[this,"doChange"]});
		// this.cb_class = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Classification",tag:1, multiSelection:false , change:[this,"doChange"]});
		// this.cb_mou = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"M o U",tag:1, multiSelection:false,change:[this,"doChange"]});
		// this.e_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Currency",tag:1,readOnly:true});									
		// this.e_nilaimou = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Nilai",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});									
		// this.e_real = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Realisasi",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});											
		// this.e_sisa = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,200,20],caption:"Sisa MoU",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});											

		// this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:0,
		// 		colTitle:["Tgl Schedule","Akru. Bunga","Cicilan Pokok","Total Kas","Saldo Loan","Beban Bunga","Amortisasi","Ni. Tercatat Loan"],
		// 		colWidth:[[7,6,5,4,3,2,1,0],[120,120,120,120,120,120,120,80]],
		// 		columnReadOnly:[true,[0],[]],				
		// 		colFormat:[[1,2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
		// 		pasteEnable:true,afterPaste:[this,"doAfterPaste"],
		// 		defaultRow:1,autoAppend:false});
		// this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});
				
		// this.l_tgl1 = new portalui_label(this.pc2.childPage[2],{bound:[20,11,100,18],caption:"Tanggal Perjanjian", underline:true});
		// this.dp_d1 = new portalui_datePicker(this.pc2.childPage[2],{bound:[120,11,100,18]}); 		
		// this.c_perbunga = new saiCB(this.pc2.childPage[2],{bound:[20,12,200,20],caption:"Periode Bunga",items:["Kuartalan","Bulanan"], readOnly:true,tag:2});		
		// this.c_tipe = new saiCB(this.pc2.childPage[2],{bound:[20,13,200,20],caption:"Type of Interest",items:["Floating","Fixed"], readOnly:true,tag:2,change:[this,"doChange"]});		
		// this.cb_rate = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Jenis Rate",tag:2, multiSelection:false});
		// this.e_bunga = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,14,200,20],caption:"Rate of Interest %",tipeText:ttNilai, text:"0"});		
		// this.e_jamin = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,13,500,20],caption:"Jaminan",tag:2,maxLength:200});		
		// this.e_nilai = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,29,200,20],caption:"Nilai Nominal", tipeText:ttNilai, text:"0", readOnly:true});
		// this.e_nbiaya = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,26,200,20],caption:"Biaya Transaksi", tipeText:ttNilai, text:"0", readOnly:true});
		// this.e_total = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,27,200,20],caption:"Ni Tercatat Loan", tipeText:ttNilai, text:"0", readOnly:true});
		// this.e_thntempo = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,16,200,20],caption:"Jth Tempo(Tahun)",tipeText:ttAngka, text:"",readOnly:true});	
		// this.e_basis = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,17,200,20],caption:"Basis Hari",tag:2, tipeText:ttNilai, text:"0"});		
		
		// this.sgUpld = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5, tag:9,
		// 		colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
		// 		colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
		// 		columnReadOnly:[true,[0,1,2,3,4],[]],					
		// 		colFormat:[[3,4],[cfUpload,cfButton]], 
		// 		buttonStyle:[[0],[bsEllips]], 	
		// 		click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
		// 		ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		// this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		// this.sgnUpld = new sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});

		// this.sgFile = new saiGrid(this.pc2.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
		// 	colTitle:["namaFile","status"],
		// 	colWidth:[[1,0],[80,180]],
		// 	readOnly: true,autoAppend:false,defaultRow:1});
			
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc2.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan = 1;			
			
			this.cb_cocd.setSQL("select cocd,company_name from mysym_company_code",["cocd","company_name"],false,["Kode","Nama"],"and","Data CoCd",true);									
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fShortLoan.extend(window.portalui_childForm);
window.app_saku3_transaksi_sla_fShortLoan.implement({	
	doAfterPaste: function(sender,totalRow){
		try {			
			totIDR = totSCR = totSCA = totSCI = 0;
			for (var i=0;i < this.sg.rows.getLength();i++){						
				totIDR += nilaiToFloat(this.sg.cells(6,i));
				totSCR += nilaiToFloat(this.sg.cells(13,i));
				totSCA += nilaiToFloat(this.sg.cells(14,i));
				totSCI += nilaiToFloat(this.sg.cells(15,i));
			}						
			this.e_total.setText(floatToNilai(totIDR));
			this.e_totscr.setText(floatToNilai(totSCR));
			this.e_totsca.setText(floatToNilai(totSCA));
			this.e_totsci.setText(floatToNilai(totSCI));
		} catch(e) {alert(e);}
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from sla_short_m where no_bukti = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
						sql.add("delete from sla_short_d where no_bukti = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");						
					}
					
					var period = this.dp_d1.getText().substr(6,4) + this.dp_d1.getText().substr(3,2);
					sql.add("insert into sla_short_m (no_bukti,keterangan,nik_user,tgl_input,progress,nilai,coll_receiv,coll_asset,coll_inv,tanggal,periode,kode_cocd) values "+
							"('"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"',getdate(),'0',"+nilaiToFloat(this.e_total.getText())+",'"+nilaiToFloat(this.e_totscr.getText())+"',"+nilaiToFloat(this.e_totsca.getText())+","+nilaiToFloat(this.e_totsci.getText())+",'"+this.dp_d1.getDateString()+"','"+period+"','"+this.cb_cocd.getText()+"')");
					
					for (var i=0; i < this.sg.getRowCount(); i++) {					
					  var tgl = this.sg.cells(9,i).substr(6,4) +"-"+ this.sg.cells(9,i).substr(3,2) +"-"+ this.sg.cells(9,i).substr(0,2);
					  sql.add("insert into sla_short_d (nu,no_bukti,kode_cocd,periode, bank,company,status_jb,tipe_rate,curr,nilai_curr,nilai_idr,year,facility,due_date,periode_bunga,jenis_rate,p_bunga,coll_receiv,coll_asset,coll_inv,info_duedate,info_others) values "+
					  		  "("+i+",'"+this.e_nb.getText()+"','"+this.cb_cocd.getText()+"','"+period+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(7,i)+"',"+nilaiToFloat(this.sg.cells(8,i))+",'"+tgl+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(11,i)+"',"+nilaiToFloat(this.sg.cells(12,i))+","+nilaiToFloat(this.sg.cells(13,i))+","+nilaiToFloat(this.sg.cells(14,i))+","+nilaiToFloat(this.sg.cells(15,i))+",'"+this.sg.cells(16,i)+"','"+this.sg.cells(17,i)+"')");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
					this.sg.clear(1);					
				}
				break;
			
			case "simpan" :	
			case "ubah" :	
				this.simpan();
				break;
			
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from sla_short_m where no_bukti = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
				sql.add("delete from sla_short_d where no_bukti = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{					
			if (sender == this.cb_cocd && this.cb_cocd.getText() != "" && this.stsSimpan == 1) this.doClick();			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doClick:function(sender){
		try {			
			if (this.cb_cocd.getText() != "") {
				var thn = this.dp_d1.getDateString().substr(2,2);
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sla_short_m","no_bukti",this.cb_cocd.getText()+"-ST"+thn+".","000"));		
				this.e_ket.setFocus();
				setTipeButton(tbSimpan);
			}
			else system.info(this,"Data CoCd harus terisi.","Pilih data CoCd.");
		}
		catch (e) {
			alert(e);
		}
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
								this.pc1.hide();   
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); this.sg.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																					
		var strSQL = "select a.no_bukti,a.keterangan,a.periode,a.nilai "+
		             "from sla_short_m a  "+					 
					 "where a.kode_cocd='"+this.cb_cocd.getText()+"' order by periode desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.periode,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * from sla_short_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						
						this.e_total.setText(floatToNilai(line.nilai));
						this.e_totscr.setText(floatToNilai(line.coll_receiv));
						this.e_totsca.setText(floatToNilai(line.coll_asset));
						this.e_totsci.setText(floatToNilai(line.coll_inv));
						
						this.dp_d1.setText(line.tanggal);						
						this.e_ket.setText(line.keterangan);
						
						var strSQL = "select *,convert(varchar,due_date,105) as tgl from sla_short_d where kode_cocd='"+this.cb_cocd.getText()+"' and no_bukti='"+this.e_nb.getText()+"' order by nu";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];			
								this.sg.appendData([line.bank,line.company,line.status_jb,line.tipe_rate,line.curr,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.year,floatToNilai(line.facility),line.tgl,line.periode_bunga,line.jenis_rate,floatToNilai(line.p_bunga),floatToNilai(line.coll_receiv),floatToNilai(line.coll_asset),floatToNilai(line.coll_inv),line.info_duedate,line.info_others]);
							}
						} else this.sg.clear(1);													
						
					}
				}					
			}									
		} catch(e) {alert(e);}
	}	
	
});

