window.app_saku3_transaksi_rkm_fTSdis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rkm_fTSdis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rkm_fTSdis";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pendelegasian Target Strategic", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,11,150,20],caption:"Tahun",tag:2,readOnly:false,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Ref",maxLength:30,readOnly:true,visible:false});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,455], childPage:["Pendelegasian TS","Histori"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:9,
		            colTitle:["Kode TS","Deskripsi"],
					colWidth:[[1,0],[500,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.cb_ts = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Kode TS", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});												
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-65],colCount:2,tag:9,
		            colTitle:["Kode Rek","Nama Rektorat"],
					colWidth:[[1,0],[500,100]],	
					buttonStyle:[[0],[bsEllips]], 				
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],													
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);		
					
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
			
			var sql = new server_util_arrayList();			
			sql.add("select kode_rek, nama from rkm_rektorat where kode_lokasi ='"+this.app._lokasi+"' and flag_aktif='1'");			
			this.dbLib.getMultiDataProviderA(sql);
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rkm_fTSdis.extend(window.childForm);
window.app_saku3_transaksi_rkm_fTSdis.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from rkm_ts_rek where kode_ts='"+this.cb_ts.getText()+"' and tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rkm_ts_rek (kode_ts,kode_rek,tahun,kode_lokasi,tgl_input,nik_user) values "+
										"('"+this.cb_ts.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_tahun.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"')");
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
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi kode rektorat untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}							
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;										
		}
	},		
	doChange : function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText() != "") {
			this.cb_ts.setSQL("select kode_ts,nama from rkm_ts where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'",["kode_ts","nama"],false,["Kode","Nama"],"and","Data TS",true);					
		}
		
		if ((sender == this.cb_ts || sender == this.e_tahun) && this.cb_ts.getText() != "" && this.e_tahun.getText() != "") {
			var strSQL = "select a.kode_rek,a.nama "+
						 "from rkm_rektorat a inner join rkm_ts_rek b on a.kode_rek=b.kode_rek and a.kode_lokasi=b.kode_lokasi and b.tahun='"+this.e_tahun.getText()+"' "+							 
						 "where b.kode_ts = '"+this.cb_ts.getText()+"'  and b.kode_lokasi='"+this.app._lokasi+"' order by a.kode_rek";
																	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_rek,line.nama]);
				}
			} else this.sg.clear(1);
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Rektorat",sender,undefined, 
												  "select kode_rek, nama from rkm_rektorat where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  "select count(*) from rkm_rektorat where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  ["kode_rek","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){		
		if (col == 0 && this.sg.cells(0,row)!="") {
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var rek = this.dataRek.get(sender.cells(0,row));
				if (rek) sender.cells(1,row,rek);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Rektorat "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRek");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}	
				sender.onChange.set(this,"doChangeCell");
			}
		}				
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
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataRek = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataRek.set(line.kode_rek, line.nama);
								}
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1);  this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbSimpan);
			this.doLoad3();			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){	
		if (this.e_tahun.getText() != ""){																
			var strSQL = "select distinct a.kode_ts,b.nama from rkm_ts_rek a inner join rkm_ts b on a.kode_ts=b.kode_ts and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
						 "where a.tahun='"+this.e_tahun.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' order by a.kode_ts";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU3 = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);	
		}		
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.kode_ts,line.nama]); 
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
				setTipeButton(tbSimpan);
				this.stsSimpan = 0;				
				this.cb_ts.setText(this.sg3.cells(0,row));	
																							
			}									
		} catch(e) {alert(e);}
	}
});