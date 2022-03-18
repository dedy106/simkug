window.app_saku3_transaksi_produk_fDiskBarang = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fDiskBarang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fDiskBarang";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Diskon Jual Barang", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
	//	this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,300], childPage:["Diskon Barang","Error Msg"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,
					colTitle:["Kode Barang","Nama Barang","Tgl Mulai","Tgl Selesai","Diskon (%)","Pot. Nilai","Validasi"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,80,120,120,150,100]],
					colFormat:[[4,5],[cfNilai,cfNilai]],
					buttonStyle:[[0,2,3],[bsEllips,bsDate,bsDate]],
					ellipsClick:[this,"doEllipseClick"],
					columnReadOnly:[true,[1,2,3]],
					autoAppend:true,defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager1"]});		
		this.bValid = new button(this.sgn1,{bound:[this.sgn1.width - 100,2,80,22],caption:"Validasi",click:[this,"doValid"]});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fDiskBarang.extend(window.childForm);
window.app_saku3_transaksi_produk_fDiskBarang.implement({
	
	doValid: function() {
		//cek id bank
		var strSQL = "select kode_barang from brg_barang where kode_lokasi='"+this.app._lokasi+"'";			
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataBrg = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(6,i,"INVALID");
			for (var j=0;j < this.dataBrg.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataBrg.rs.rows[j].kode_barang) {
					this.sg1.cells(6,i,"VALID");				
				}
			}	
			if (this.sg1.cells(6,i) == "INVALID") this.inValid = true;									
		}	

		if (this.inValid == false) setTipeButton(tbSimpan);	
		else {
			this.pc1.setActivePage(this.pc1.childPage[1]);	
			this.sg2.clear();
			setTipeButton(tbAllFalse);	
			for (var i=0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.cells(6,i) == "INVALID") {
					var j = i+1;
					this.sg2.appendData([j]);						
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					for (var i=0; i < this.sg1.getRowCount();i++){	
						sql.add("insert into brg_diskonjual_d (kode_barang,kode_lokasi,kode_pp,tgl_mulai,tgl_selesai,p_disk,pot_nilai) values "+
								"('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.sg1.getCellDateValue(2,i)+"','"+this.sg1.getCellDateValue(3,i)+"',"+nilaiToFloat(this.sg1.cells(4,i))+","+nilaiToFloat(this.sg1.cells(5,i))+")");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},

	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_barang,nama from brg_barang where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_barang) from brg_barang where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_barang","nama"],"and",["Kode","Nama"],false);				
			}
		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku3_produk_rptDiskonBrg";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' ";
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
			this.sg.clear(1); 
		} catch(e) {
			alert(e);
		}
	}
});