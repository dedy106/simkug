window.app_saku3_transaksi_rkm_fSSdis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rkm_fSSdis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rkm_fSSdis";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pendelegasian Sasaran Strategic", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,11,150,20],caption:"Tahun",tag:2,readOnly:false,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"No Ref",maxLength:30,readOnly:true,visible:false});
		this.cb_rek = new saiCBBL(this,{bound:[20,12,200,20],caption:"Rektorat", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});												
		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,425], childPage:["Pendelegasian SS","Histori"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:9,
		            colTitle:["Kode SS","Deskripsi"],
					colWidth:[[1,0],[500,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.cb_ss = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Kode SS", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});												
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-65],colCount:2,tag:9,
		            colTitle:["Kode Bidang","Nama Bidang"],
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
			
			this.cb_rek.setSQL("select kode_rek, nama from rkm_rektorat where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama"],false,["Kode","Deskripsi"],"and","Data Rektorat",true);			
			
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rkm_fSSdis.extend(window.childForm);
window.app_saku3_transaksi_rkm_fSSdis.implement({
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
					sql.add("delete from rkm_ss_bid where kode_ss='"+this.cb_ss.getText()+"' and tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rkm_ss_bid (kode_ss,kode_bidang,tahun,kode_lokasi,tgl_input,nik_user) values "+
										"('"+this.cb_ss.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_tahun.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"')");
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
		if ((sender == this.e_tahun || sender == this.cb_rek) && this.e_tahun.getText() != ""  && this.cb_rek.getText() != "") {
			this.cb_ss.setSQL("select kode_ss,nama from rkm_ss where kode_rek='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'",["kode_ss","nama"],false,["Kode","Nama"],"and","Data SS",true);					
		}
		
		if ((sender == this.cb_ss || sender == this.e_tahun) && this.cb_ss.getText() != "" && this.e_tahun.getText() != "") {
			var strSQL = "select a.kode_bidang,a.nama "+
						 "from rkm_bidang a inner join rkm_ss_bid b on a.kode_bidang=b.kode_bidang and a.kode_lokasi=b.kode_lokasi and b.tahun='"+this.e_tahun.getText()+"' "+							 
						 "where b.kode_ss = '"+this.cb_ss.getText()+"'  and b.kode_lokasi='"+this.app._lokasi+"' order by a.kode_bidang";
																	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_bidang,line.nama]);
				}
			} else this.sg.clear(1);
		}
		
		if (sender == this.cb_rek && this.cb_rek.getText()!= "") {
			var sql = new server_util_arrayList();			
			sql.add("select kode_bidang, nama from rkm_bidang where kode_rek='"+this.cb_rek.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and flag_aktif='1'");			
			this.dbLib.getMultiDataProviderA(sql);			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{	
			if (this.cb_rek.getText() != "") {		
				if (sender == this.sg) {				
					if (col == 0){
						this.standarLib.showListData(this, "Daftar Bidang",sender,undefined, 
													  "select kode_bidang, nama from rkm_bidang where kode_rek='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
													  "select count(*) from rkm_bidang where  kode_rek='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
													  ["kode_bidang","nama"],"and",["Kode","Nama"],false);				
					}				
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
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Bidang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRek");                
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
									this.dataRek.set(line.kode_bidang, line.nama);
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
			var strSQL = "select distinct a.kode_ss,b.nama from rkm_ss_bid a inner join rkm_ss b on a.kode_ss=b.kode_ss and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
						 "where a.tahun='"+this.e_tahun.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' order by a.kode_ss";		
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
			this.sg3.appendData([line.kode_ss,line.nama]); 
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
				this.cb_ss.setText(this.sg3.cells(0,row));	
																							
			}									
		} catch(e) {alert(e);}
	}
});