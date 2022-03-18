window.app_saku3_transaksi_fitnes_fRefBeban = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fRefBeban.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fRefBeban";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Referensi: Input", 0);	
		
		uses("portalui_uploader;saiCBB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,470], childPage:["Data Referensi","Detail Referensi"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["No Ref","Deskripsi"],
					colWidth:[[1,0],[500,100]],
					readOnly:true,  autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Ref",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,550,20],caption:"Deskripsi", maxLength:150});				
		this.bLoad = new button(this.pc1.childPage[1],{bound:[680,17,80,18],caption:"Load Param",click:[this,"doLoadParam"]});			
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-86],colCount:8,tag:9,
		            colTitle:["Kode","Gerakan","Beban Max","Bbn Latih","Berat Alat","Plan Set1","Plan Set2","Plan Set3"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,200,80]],					
					columnReadOnly:[true,[0,1],[2,3,4,5,6,7]],					
					colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			
			this.doLoad();		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fRefBeban.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fRefBeban.implement({
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
					if (this.stsSimpan == "1") {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_refbeban_m","no_bukti",this.app._lokasi+"-REF.","0000"));
					}
					else {
						sql.add("delete from fi_refbeban_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fi_refbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					sql.add("insert into fi_refbeban_m (no_bukti,kode_lokasi,keterangan) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"')");					
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																							
 								sql.add("insert into fi_refbeban_d(no_bukti,kode_lokasi,no_urut,kode_beban,beban_max,beban_latih,berat,set1,set2,set3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+","+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+")");
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
				this.doLoad();
				break;
			case "simpan" :																				
				this.stsSimpan = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;							
			case "ubah" :																	
				this.stsSimpan = "2";								
				this.simpan();
				break;				
			case "hapus" :	
				this.stsSimpan = "3";
			    uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("delete from fi_refbeban_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from fi_refbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},		
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_refbeban_m","no_bukti",this.app._lokasi+"-REF.","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);	
		this.sg2.clear(1);		
	},
	doLoadParam : function() {
		var strSQL = "select kode_beban,nama,keterangan from fi_beban "+
					 "where kode_lokasi = '"+this.app._lokasi+"'  order by kode_beban";					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_beban,line.nama,"0","0","0","0","0","0"]);
			}
		} else this.sg2.clear(1);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_nb.setText(this.sg1.cells(0,row));	
				this.e_ket.setText(this.sg1.cells(1,row));
								
				var data = this.dbLib.getDataProvider("select b.kode_beban,b.nama,a.beban_max,a.beban_latih,a.berat,a.set1,a.set2,a.set3 "+
				           "from fi_refbeban_d a inner join fi_beban b on a.kode_beban=b.kode_beban and a.kode_lokasi=b.kode_lokasi "+						   
				           "where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_beban,line.nama,floatToNilai(line.beban_max),floatToNilai(line.beban_latih),floatToNilai(line.berat),floatToNilai(line.set1),floatToNilai(line.set2),floatToNilai(line.set3)]);
					}
				} else this.sg2.clear(1);				
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.stsSimpan != "3") {
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi","");							
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg2.clear(1); 
			this.doLoad();
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad:function(sender){						
		var strSQL = "select * from fi_refbeban_m where kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.sg1.clear();
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];							
				this.sg1.appendData([line.no_bukti,line.keterangan]); 
			}
		} else this.sg1.clear(1);					
	},	
	doTampilData: function(page) {
		this.sg1.doSelectPage(page);						
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});