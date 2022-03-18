window.app_saku3_transaksi_tu_kantin_fNotaLoad19 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fNotaLoad19.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fNotaLoad19";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Data Nota", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,20],selectDate:[this,"doSelectDate"]});		
		this.e_nb = new saiLabelEdit(this,{bound:[20,10,200,20],caption:"No Load",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});														
		this.e_persen = new saiLabelEdit(this,{bound:[790,10,200,20],caption:"% Sharing", maxLength:50, tag:2, tipeText:ttNilai,text:"80"});
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Deskripsi", maxLength:50, tag:1});
		this.e_totnota = new saiLabelEdit(this,{bound:[790,16,200,20],caption:"Total Nota", maxLength:50, tag:1, tipeText:ttNilai,text:"0", readOnly:true});
		this.cb_kantin = new saiCBBL(this,{bound:[20,17,220,20],caption:"Kode Kantin",  multiSelection:false, tag:1});	
		this.e_totkasir = new saiLabelEdit(this,{bound:[790,17,200,20],caption:"Total Kasir", maxLength:50, tag:1, tipeText:ttNilai,text:"0", readOnly:true});
		this.cb_kasir = new saiCBBL(this,{bound:[20,15,220,20],caption:"Kasir",  multiSelection:false, tag:1});	
		this.e_totbayar = new saiLabelEdit(this,{bound:[790,15,200,20],caption:"Total Bayar", maxLength:50, tag:1, tipeText:ttNilai,text:"0", readOnly:true});
		this.bValid = new button(this,{bound:[670,15,100,20],caption:"Validasi", click:[this,"doValidasi"]});

		this.pc1 = new pageControl(this,{bound:[20,12,996,338], childPage:["Nota Tenan","Nota Kasir","Pembayaran","Error Msg","Del Upload"]});						
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-6,this.pc1.height-33],colCount:4,tag:9,
					colTitle:["ID Tenan","Nama Tenan","Qty Nota","Nilai Nota"],
					colWidth:[[3,2,1,0],[100,100,200,100]],
					colFormat:[[2,3],[cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste1"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		

		this.sg4 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-6,this.pc1.height-33],colCount:4,tag:9,
					colTitle:["ID Barang","Nama Barang","Qty","Total"],
					colWidth:[[3,2,1,0],[100,100,200,100]],
					colFormat:[[2,3],[cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste2"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg4, pager:[this,"doPager4"]});		

		this.sg5 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-6,this.pc1.height-33],colCount:4,
					colTitle:["ID Bayar","Jenis Pembayaran","Qty","Total"],
					colWidth:[[3,2,1,0],[100,100,200,150]],
					colFormat:[[2,3],[cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste5"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg5, pager:[this,"doPager5"]});		

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:2,tag:9,
				colTitle:["Jenis","Baris INVALID"],
				colWidth:[[0,1],[100,200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		

		this.cb_load = new saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"No Upload",  multiSelection:false, tag:9});	
		this.bDelete = new button(this.pc1.childPage[4],{bound:[120,16,98,18],caption:"Delete",click:[this,"doDelete"]});					

		this.rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);	

		setTipeButton(tbAllFalse);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);													
			this.cb_kasir.setSQL("select nik, nama from ktu_user where  kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["ID","Nama"],"and","Data Kasir",true);									
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kantin_fNotaLoad19.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fNotaLoad19.implement({
	doDelete: function(){
		if (this.cb_load.getText()!="") {
			this.preView = "0";
			var sql = new server_util_arrayList();									
			sql.add("delete from kantin_load where no_load='"+this.cb_load.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from kantin_nota where no_load='"+this.cb_load.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from kantin_kasir where no_load='"+this.cb_load.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from kantin_bayar where no_load='"+this.cb_load.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.execArraySQL(sql);			
		}
	},
	doAfterPaste1: function(sender,totalRow){
		try {				
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();									
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doAfterPaste4: function(sender,totalRow){
		try {				
			this.sgn4.setTotalPage(sender.getTotalPage());
			this.sgn4.rearrange();									
		} catch(e) {alert(e);}
	},
	doPager4: function(sender,page){
		this.sg4.doSelectPage(page);
	},	
	doAfterPaste5: function(sender,totalRow){
		try {				
			this.sgn5.setTotalPage(sender.getTotalPage());
			this.sgn5.rearrange();									
		} catch(e) {alert(e);}
	},
	doPager5: function(sender,page){
		this.sg5.doSelectPage(page);
	},
	doValidasi: function() {	
		this.inValid = false;	

		var strSQL = "select kode_tenan,nama from ktu_tenan where kode_kantin='"+this.cb_kantin.getText()+"' and kode_lokasi='"+this.app._lokasi+"' union select 'X','X' ";							
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataTenan = dataS;
		}				
	
		var total = 0;
		for (var i=0; i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i)) {	
				this.sg1.cells(0,i,"INVALID | "+this.sg1.cells(0,i));					
				
				if (this.dataTenan.rs.rows.length > 0) {
					for (var j=0;j < this.dataTenan.rs.rows.length;j++){						
						if (this.sg1.cells(0,i).substr(10,20) == this.dataTenan.rs.rows[j].kode_tenan) {
							this.sg1.cells(0,i,this.dataTenan.rs.rows[j].kode_tenan);	
							this.sg1.cells(1,i,this.dataTenan.rs.rows[j].nama);	
							total += nilaiToFloat(this.sg1.cells(3,i));							
						}																					
					}	
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;
				}
				
			}					
		}	
		this.e_totnota.setText(floatToNilai(total));		

		//------------------------------------------------------------------------------
		
		var strSQL = "select kode_barang,nama from ktu_barang where kode_lokasi='"+this.app._lokasi+"'";			
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataBrg = dataS;
		}	

		var total = 0;
		for (var i=0; i < this.sg4.getRowCount();i++){
			if (this.sg4.rowValid(i)) {	
				this.sg4.cells(0,i,"INVALID | "+this.sg4.cells(0,i));					
				
				if (this.dataBrg.rs.rows.length > 0) {
					for (var j=0;j < this.dataBrg.rs.rows.length;j++){	
						if (this.sg4.cells(0,i).substr(10,20) == this.dataBrg.rs.rows[j].kode_barang) {
							this.sg4.cells(0,i,this.dataBrg.rs.rows[j].kode_barang);
							this.sg4.cells(1,i,this.dataBrg.rs.rows[j].nama);	
							total += nilaiToFloat(this.sg4.cells(3,i));							
						}																					
					}	
					if (this.sg4.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;
				}	
			}	
		}
		this.e_totkasir.setText(floatToNilai(total));	

		//--------------------------------------------------------------------------------

		var strSQL = "select kode_bayar,ket from ktu_jbayar where kode_lokasi='"+this.app._lokasi+"'";			
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataByr = dataS;
		}	

		var total = 0;
		for (var i=0; i < this.sg5.getRowCount();i++){
			if (this.sg5.rowValid(i)) {	
				this.sg5.cells(0,i,"INVALID | "+this.sg5.cells(0,i));					
				
				 if (this.dataByr.rs.rows.length > 0) {							 
					for (var j=0;j < this.dataByr.rs.rows.length;j++){													
						if (this.sg5.cells(0,i).substr(10,20) == this.dataByr.rs.rows[j].kode_bayar) {							
							this.sg5.cells(0,i,this.dataByr.rs.rows[j].kode_bayar);	
							this.sg5.cells(1,i,this.dataByr.rs.rows[j].ket);	
							total += nilaiToFloat(this.sg5.cells(3,i));														
						}															
					}	
					if (this.sg5.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;
				}	
			}	
		}
		this.e_totbayar.setText(floatToNilai(total));	
		
		if (!this.inValid) setTipeButton(tbSimpan);	
		else {
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.sg2.clear();
			for (var i=0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.cells(0,i).substr(0,7) == "INVALID") {
					var j = i+1;
					this.sg2.appendData(["NOTA",j]);						
				}
			}
		
			for (var i=0; i < this.sg4.getRowCount();i++) {
				if (this.sg4.cells(0,i).substr(0,7) == "INVALID") {
					var j = i+1;
					this.sg2.appendData(["BARANG",j]);						
				}
			}
			for (var i=0; i < this.sg5.getRowCount();i++) {
				if (this.sg5.cells(0,i).substr(0,7) == "INVALID") {
					var j = i+1;
					this.sg2.appendData(["BAYAR",j]);						
				}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();									
					sql.add("insert into kantin_load (no_load,kode_lokasi,tanggal,keterangan,periode,nik_user,no_bast,kode_kantin,total_nota,total_kasir,total_bayar,nik_kasir,no_kas,persen) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','-','"+this.cb_kantin.getText()+"',"+nilaiToFloat(this.e_totnota.getText())+","+nilaiToFloat(this.e_totkasir.getText())+","+nilaiToFloat(this.e_totbayar.getText())+",'"+this.cb_kasir.getText()+"','-',"+nilaiToFloat(this.e_persen.getText())+")");

					for (var i=0; i < this.sg1.getRowCount();i++) {
						if (this.sg1.rowValid(i)) {	
							sql.add("insert into kantin_nota (no_load,kode_lokasi,kode_tenan,jumlah,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+")");
						}
					}

					for (var i=0; i < this.sg4.getRowCount();i++) {
						if (this.sg4.rowValid(i)) {	
							sql.add("insert into kantin_kasir (no_load,kode_lokasi,kode_barang,jumlah,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+","+nilaiToFloat(this.sg4.cells(3,i))+")");
						}
					}

					for (var i=0; i < this.sg5.getRowCount();i++) {
						if (this.sg5.rowValid(i)) {	
							sql.add("insert into kantin_bayar (no_load,kode_lokasi,kode_bayar,jumlah,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg5.cells(0,i)+"',"+nilaiToFloat(this.sg5.cells(2,i))+","+nilaiToFloat(this.sg5.cells(3,i))+")");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);				
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.doClick();
				this.sg1.clear(1);
				this.sg2.clear(1);
				this.sg4.clear(1);
				this.sg5.clear(1);	
				this.cb_load.setSQL("select no_load, keterangan from kantin_load where no_bast='-' and kode_lokasi = '"+this.app._lokasi+"'",["no_load","keterangan"],false,["No Bukti","Deskripis"],"and","Data Upload",true);			
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_persen.getText()) > 100 || nilaiToFloat(this.e_persen.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","% Sharing tidak valid.(0-100)");
					return false;						
				}
				if (nilaiToFloat(this.e_totbayar.getText()) != (nilaiToFloat(this.e_totnota.getText())+nilaiToFloat(this.e_totkasir.getText()))) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar tidak sama dengan Tot Nota+Kasir.");
					return false;						
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;				
			case "hapus" :	
				
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m);												
		this.doClick();		
		this.cb_load.setSQL("select no_load, keterangan from kantin_load where no_bast='-' and kode_lokasi = '"+this.app._lokasi+"'",["no_load","keterangan"],false,["No Bukti","Deskripis"],"and","Data Upload",true);			
	},
	doClick:function(sender){					
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kantin_load","no_load",this.app._lokasi+"-LD"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();		
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
				this.app._mainForm.bClear.click();			
			break;
		}
	},
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tu_kantin_rptBa";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_load='"+this.e_nb.getText()+"' ";
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
								this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
								this.app._mainForm.bClear.click();
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
	}
});
