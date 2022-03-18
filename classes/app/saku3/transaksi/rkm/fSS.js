window.app_saku3_transaksi_rkm_fSS = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rkm_fSS.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rkm_fSS";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Sasaran Strategic", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,11,150,20],caption:"Tahun",tag:2,readOnly:false,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Ref",maxLength:30,readOnly:true,visible:false});
		this.cb_rek = new saiCBBL(this,{bound:[20,12,200,20],caption:"Rektorat", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});												
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,455], childPage:["Delegasi TS","Data SS"]});		
		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:9,
		            colTitle:["Kode TS","Deskripsi"],
					colWidth:[[1,0],[500,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				

		this.cb_ts = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"Kode TS",readOnly:true,change:[this,"doChange"]});																
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-65],colCount:2,tag:9,
		            colTitle:["Kode SS","Sasaran Strategic"],
					colWidth:[[1,0],[500,100]],	
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],														
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);			
		this.pc2.childPage[1].rearrangeChild(10, 23);		
					
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
			
			var strSQL = "select year(GETDATE())+1 as tahun ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.e_tahun.setText(line.tahun);						
				}					
			}	
			
			this.cb_rek.setSQL("select kode_rek,nama from rkm_rektorat where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_rek","nama"],false,["Kode","Nama"],"and","Data Rektorat",true);										
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rkm_fSS.extend(window.childForm);
window.app_saku3_transaksi_rkm_fSS.implement({
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
					
					sql.add("insert into rkm_ss_h (kode_ss,nama,tahun,kode_lokasi,kode_ts,kode_rek,nik_user,tgl_input,no_ref,no_flag) "+
							"select kode_ss,nama,tahun,kode_lokasi,kode_ts,kode_rek,nik_user,tgl_input,no_ref,'"+this.e_nb.getText()+"' "+
							"from rkm_ss where kode_ts='"+this.cb_ts.getText()+"' and kode_rek='"+this.cb_rek.getText()+"' and tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
	
					
					sql.add("delete from rkm_ss where kode_ts='"+this.cb_ts.getText()+"' and kode_rek='"+this.cb_rek.getText()+"' and tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rkm_ss (kode_ss,nama,tahun,kode_lokasi,kode_ts,kode_rek,nik_user,tgl_input,no_ref,no_flag) values "+
										"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.e_tahun.getText()+"','"+this.app._lokasi+"','"+this.cb_ts.getText()+"','"+this.cb_rek.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','-')");
							}
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.doLoad3();								
				break;
			case "simpan" :	
				this.preView = "1";				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;										
		}
	},		
	doClick:function(sender){				
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rkm_ss","no_ref",this.app._lokasi+"-SS"+this.e_tahun.getText().substr(2,2)+".","0000"));		
		setTipeButton(tbSimpan);					
	},		
	doChange : function(sender){	
		if ((sender == this.e_tahun || sender == this.cb_rek) && this.e_tahun.getText() != "" && this.cb_rek.getText() != "") {
			this.doLoad3();		
		}
		if (sender == this.e_tahun && this.e_tahun.getText() != "") {
			this.cb_ts.setSQL("select kode_ts,nama from rkm_ts where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'",["kode_ts","nama"],false,["Kode","Nama"],"and","Data TS",true);					
		}
		if ((sender == this.e_tahun || sender == this.cb_rek || sender == this.cb_ts) && this.e_tahun.getText() != "" && this.cb_rek.getText() != "" && this.cb_ts.getText() != "") {
			this.doLoad();
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.kode_ts,a.nama from rkm_ts a "+
					 "inner join rkm_ts_rek b on a.kode_ts=b.kode_ts and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
					 "where b.tahun='"+this.e_tahun.getText()+"' and b.kode_rek='"+this.cb_rek.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";									 													
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg3.appendData([line.kode_ts,line.nama]);
			}
		} else this.sg3.clear(1);					
	},
	doLoad:function(sender){																
		var strSQL = "select a.kode_ss,a.nama from rkm_ss a "+					 
					 "where a.tahun='"+this.e_tahun.getText()+"' and a.kode_rek='"+this.cb_rek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ts='"+this.cb_ts.getText()+"'";									 													
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_ss,line.nama]);
			}
		} else this.sg.clear(1);					
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_spm_rptPanjarForm";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_panjar='"+this.e_nb.getText()+"' ";
								//this.filter2 = this.e_periode.getText();
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1);  this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbSimpan);
			this.doLoad3();			
		} catch(e) {
			alert(e);
		}
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.cb_ts.setText(this.sg3.cells(0,row));				
				
				var strSQL = "select a.kode_ss,a.nama "+
							 "from rkm_ss a "+					 
							 "where a.kode_ts = '"+this.cb_ts.getText()+"' and a.tahun='"+this.e_tahun.getText()+"' and a.kode_rek='"+this.cb_rek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_ss";
							 											
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_ss,line.nama]);
					}
				} else this.sg.clear(1);
			}									
		} catch(e) {alert(e);}
	}
});