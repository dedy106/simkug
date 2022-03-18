window.app_saku3_transaksi_tu_aka_fCamaba = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_aka_fCamaba.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tu_aka_fCamaba";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload Data Camaba ", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("util_dbLib",true);		
				
		this.c_tahunaka = new saiCB(this,{bound:[20,13,200,20],caption:"Tahun Akademik",readOnly:true,tag:2}); 
		this.c_status = new saiCB(this,{bound:[20,17,200,20],caption:"Status Input",items:["INSERT","REPLACE"], readOnly:true,tag:2});
		this.bValid = new button(this,{bound:[120,14,98,18],caption:"Validasi",click:[this,"doValid"]});

		this.pc1 = new pageControl(this,{bound:[20,20,1000,380], childPage:["Data Camaba","List Error"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:2,tag:9,
				colTitle:["ID Reg","Nama"],
				colWidth:[[1,0],[350,250]],				
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
				colTitle:["ID Error","Kolom","Deskripsi"],
				colWidth:[[2,1,0],[500,150,150]],				
				readOnly:true, 
				autoAppend:false,defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2});		
				
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		setTipeButton(tbAllFalse);				
		
		this.status = "";

		this.c_tahunaka.items.clear();
		var data = this.dbLib.getDataProvider("select distinct tahunaka as tahunaka from aka_tahunaka where kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.c_tahunaka.addItem(i,line.tahunaka);
			}
		}

		var data = this.dbLib.getDataProvider("select tahunaka from aka_tahunaka where periode= substring(convert(varchar,getdate(),112),1,6) and  kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){											
				this.c_tahunaka.setText(line.tahunaka);				
			}
		}
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
				
	}
};
window.app_saku3_transaksi_tu_aka_fCamaba.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_aka_fCamaba.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();		
			
			this.status = "LOAD";
			this.nbTmp = this.app._userLog;
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();												
			sql.add("delete from aka_camaba_tmp where no_load='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");		
			this.dbLib.execQuerySync(sql);	
			
			this.status = "LOAD";
			for (var i=0;i < this.sg1.getRowCount();i++){				
				sql.add("insert into aka_camaba_tmp (no_load,kode_lokasi,no_reg,nama,tahunaka) values "+
						"('"+this.nbTmp+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.c_tahunaka.getText()+"')");																			
			}
			this.dbLib.execArraySQL(sql);								
						
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	doValid: function(sender){
		var temu = false;
		this.sg2.clear();
		
		//cek noreg terdaftar/tidak?
		if (this.c_status.getText() == "INSERT") {
			var strSQL = "select a.no_reg from aka_camaba_tmp a "+
						"left join aka_camaba b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi "+
						"left join aka_mahasiswa c on a.no_reg=c.nim and a.kode_lokasi=c.kode_lokasi "+
						" where a.no_load='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and (b.no_reg is not null or c.nim is not null)";		
		}
		else {
			var strSQL = "select a.no_reg from aka_camaba_tmp a "+
						"left join aka_camaba b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi and b.tahunaka<>'"+this.c_tahunaka.getText()+"' "+
						"left join aka_mahasiswa c on a.no_reg=c.nim and a.kode_lokasi=c.kode_lokasi "+
						" where a.no_load='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and (b.no_reg is not null or c.nim is not null)";		
		}
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true; 
				line = data.rs.rows[i];							
				this.sg2.appendData([line.no_reg,"ID REG","ID REG sudah terdaftar/tercatat di data MHS"]);
			}
		}


		if (temu) {
			this.pc1.setActivePage(this.pc1.childPage[1]);
			setTipeButton(tbAllFalse);
			system.alert(this,"Data tidak valid.","Lihat List Error !");			
		}
		else setTipeButton(tbSimpan);					
		
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
										
					if (this.c_status.getText() == "REPLACE") {
						sql.add("delete from aka_camaba where tahunaka='"+this.c_tahunaka.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}

					sql.add("insert into aka_camaba (no_reg,tahunaka,kode_lokasi,nama, nik_user, tgl_input) "+
							"select no_reg,tahunaka,kode_lokasi,nama,'"+this.app._userLog+"',getdate() from aka_camaba_tmp "+
							"where no_load='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");
															
					setTipeButton(tbAllFalse);					
					this.status = "SIMPAN";
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
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbAllFalse);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				}
				break;
			case "simpan" :	
				this.stsSimpan = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.status == "SIMPAN") {
							if (this.stsSimpan=="1") {							
								// this.nama_report="server_report_saku2_kopeg_aka_rptAkBillJurnal";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
						}
					}else
						system.info(this, result,"");											
				break;
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
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.status = "";
		} catch(e) {
			alert(e);
		}
	}
});
