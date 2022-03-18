window.app_saku3_transaksi_rkm_fTS = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rkm_fTS.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rkm_fTS";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Target Strategic", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,11,150,20],caption:"Tahun",tag:2,readOnly:false,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Ref",maxLength:30,readOnly:true,visible:false});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,455], childPage:["TS Histori","Data TS"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:9,
		            colTitle:["No Ref","Tanggal","User"],
					colWidth:[[2,1,0],[80,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,
		            colTitle:["Kode TS","Target Strategic"],
					colWidth:[[1,0],[500,100]], 
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],														
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		this.bLoad3 = new portalui_imageButton(this.sgn,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear Data",click:[this,"doClear"]});		

		this.rearrangeChild(10, 23);		
					
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
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rkm_fTS.extend(window.childForm);
window.app_saku3_transaksi_rkm_fTS.implement({
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
					sql.add("insert into rkm_ts_h (kode_ts,nama,tahun,kode_lokasi,no_ref,tgl_input,nik_user,no_flag) "+
							"select kode_ts,nama,tahun,kode_lokasi,no_ref,tgl_input,nik_user,'"+this.e_nb.getText()+"' from rkm_ts where tahun='"+this.e_tahun.getText()+"'"); 
					
					sql.add("delete from rkm_ts where tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rkm_ts (kode_ts,nama,tahun,kode_lokasi,no_ref,tgl_input,nik_user,no_flag) values "+
										"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.e_tahun.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"',getdate(),'"+this.app._userLog+"','-')");
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rkm_ts","no_ref",this.app._lokasi+"-TS"+this.e_tahun.getText().substr(2,2)+".","0000"));		
		setTipeButton(tbSimpan);					
	},		
	doChange : function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText() != "") this.doLoad3();
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
	doLoad3:function(sender){	
		if (this.e_tahun.getText() != ""){																
			var strSQL = "select a.no_ref,a.tgl,a.nik_user "+
						 "from ( "+
						 
						 "		select distinct no_ref,convert(varchar,tgl_input,103) as tgl,nik_user,tahun from rkm_ts where kode_lokasi='"+this.app._lokasi+"' "+
						 "		union all "+
						 "		select distinct no_ref,convert(varchar,tgl_input,103) as tgl,nik_user,tahun from rkm_ts_h where kode_lokasi='"+this.app._lokasi+"' "+
						 "		) a	"+
						 "where a.tahun='"+this.e_tahun.getText()+"' order by a.no_ref desc";		
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
			this.sg3.appendData([line.no_ref,line.tgl,line.nik_user]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doClear: function() {
		try{			
			this.sg.clear(1);
		}
		catch(e) {
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbSimpan);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.kode_ts,a.nama "+
							 "from ("+
							 "		select no_ref,kode_ts,nama from rkm_ts where kode_lokasi='"+this.app._lokasi+"' "+
							 "		union all "+
							 "		select no_ref,kode_ts,nama from rkm_ts_h where kode_lokasi='"+this.app._lokasi+"' "+
							 " ) a "+							 
							 "where a.no_ref = '"+this.e_nb.getText()+"'  order by a.kode_ts";
							 											
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_ts,line.nama]);
					}
				} else this.sg.clear(1);
			}									
		} catch(e) {alert(e);}
	}
});