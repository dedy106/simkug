window.app_saku3_transaksi_rkm_fPU = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rkm_fPU.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rkm_fPU";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Program Utama", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,11,150,20],caption:"Tahun",tag:2,readOnly:false,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Ref",maxLength:30,readOnly:true,visible:false});
		this.cb_bidang = new saiCBBL(this,{bound:[20,12,200,20],caption:"Bidang", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});												
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,455], childPage:["Delegasi SS","Data PU"]});		
		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:9,
		            colTitle:["Kode SS","Deskripsi"],
					colWidth:[[1,0],[500,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				

		this.cb_ss = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"Kode SS",readOnly:true,change:[this,"doChange"]});																
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-65],colCount:2,tag:9,
		            colTitle:["Kode PU","Program Utama"],
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
			
			this.cb_bidang.setSQL("select kode_bidang,nama from rkm_bidang where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_bidang","nama"],false,["Kode","Nama"],"and","Data Bidang",true);										
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rkm_fPU.extend(window.childForm);
window.app_saku3_transaksi_rkm_fPU.implement({
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
					
					sql.add("insert into rkm_pu_h (kode_pu,nama,tahun,kode_lokasi,kode_ss,kode_bidang,nik_user,tgl_input,no_ref,no_flag) "+
							"select kode_pu,nama,tahun,kode_lokasi,kode_ss,kode_bidang,nik_user,tgl_input,no_ref,'"+this.e_nb.getText()+"' "+
							"from rkm_pu where kode_ss='"+this.cb_ss.getText()+"' and kode_bidang='"+this.cb_bidang.getText()+"' and tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
	
					
					sql.add("delete from rkm_pu where kode_ss='"+this.cb_ss.getText()+"' and kode_bidang='"+this.cb_bidang.getText()+"' and tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rkm_pu (kode_pu,nama,tahun,kode_lokasi,kode_ss,kode_bidang,nik_user,tgl_input,no_ref,no_flag) values "+
										"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.e_tahun.getText()+"','"+this.app._lokasi+"','"+this.cb_ss.getText()+"','"+this.cb_bidang.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','-')");
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rkm_pu","no_ref",this.app._lokasi+"-PU"+this.e_tahun.getText().substr(2,2)+".","0000"));		
		setTipeButton(tbSimpan);					
	},		
	doChange : function(sender){	
		if ((sender == this.e_tahun || sender == this.cb_bidang) && this.e_tahun.getText() != "" && this.cb_bidang.getText() != "") {
			this.doLoad3();		
		}
		if (sender == this.e_tahun && this.e_tahun.getText() != "") {
			this.cb_ss.setSQL("select kode_ss,nama from rkm_ss where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'",["kode_ss","nama"],false,["Kode","Nama"],"and","Data SS",true);					
		}
		if ((sender == this.e_tahun || sender == this.cb_bidang || sender == this.cb_ss) && this.e_tahun.getText() != "" && this.cb_bidang.getText() != "" && this.cb_ss.getText() != "") {
			this.doLoad();
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.kode_ss,a.nama from rkm_ss a "+
					 "inner join rkm_ss_bid b on a.kode_ss=b.kode_ss and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
					 "where b.tahun='"+this.e_tahun.getText()+"' and b.kode_bidang='"+this.cb_bidang.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";									 													
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg3.appendData([line.kode_ss,line.nama]);
			}
		} else this.sg3.clear(1);					
	},
	doLoad:function(sender){																
		var strSQL = "select a.kode_pu,a.nama from rkm_pu a "+					 
					 "where a.tahun='"+this.e_tahun.getText()+"' and a.kode_bidang='"+this.cb_bidang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ss='"+this.cb_ss.getText()+"'";									 													
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_pu,line.nama]);
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
				this.cb_ss.setText(this.sg3.cells(0,row));				
				
				var strSQL = "select a.kode_pu,a.nama "+
							 "from rkm_pu a "+					 
							 "where a.kode_ss = '"+this.cb_ss.getText()+"' and a.tahun='"+this.e_tahun.getText()+"' and a.kode_bidang='"+this.cb_bidang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pu";
							 											
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_pu,line.nama]);
					}
				} else this.sg.clear(1);
			}									
		} catch(e) {alert(e);}
	}
});