window.app_saku3_transaksi_produk_fSawal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fSawal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fSawal";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Saldo Awal Stok Barang ", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Tahun",tag:2,maxLength:4});		
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[5,12,990,415], childPage:["Data Item Barang"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
		            colTitle:["Kode","Nama","Satuan","Harga","Jumlah"],					
					colWidth:[[4,3,2,1,0],[80,80,80,400,80]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],					
					readOnly:true,colFormat:[[3,4],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"selectPage"]});		
			
		this.rearrangeChild(10, 22);
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.sgn.uploader.setParam3("object");
			this.sg.setAllowBlank(true);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
								 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								 "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			var data = this.dbLib.getDataProvider("select top 1 kode_gudang from brg_gudang where kode_pp ='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.cb_gudang.setText(line.kode_gudang); 										
			}
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun ",true);
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
window.app_saku3_transaksi_produk_fSawal.extend(window.portalui_childForm);
window.app_saku3_transaksi_produk_fSawal.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg.doSelectPage(page);
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
					
					sql.add("delete from brg_sawal where kode_gudang='"+this.cb_gudang.getText()+"' and periode = '"+this.e_tahun.getText()+"01' and kode_lokasi='"+this.app._lokasi+"'");															
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into brg_sawal(kode_barang,kode_lokasi,kode_gudang,jumlah,harga,periode) values "+
										"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.cb_gudang.getText()+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'"+this.e_tahun.getText()+"01')");
							}
						}						
					}			
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);										
				}
				break;
			case "simpan" :				
				this.preView = "1";								
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;			
		}
	},		
	doChange:function(sender){		
		if (sender == this.cb_gudang && this.stsSimpan == 1) {
			this.sg.clear(1);
		}				
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_tahun.getText()+"01' ";
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
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);						
		} catch(e) {
			alert(e);
		}
	}
});