window.app_saku3_transaksi_sapyakes_fBelajarPhp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fBelajarPhp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fBelajarPhp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Testing", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_akun = new saiLabelEdit(this,{bound:[20,16,220,20],caption:"Akun", maxLength:150,change:[this,"doChange"]});				
		this.e_nama = new saiLabelEdit(this,{bound:[20,17,220,20],caption:"Nama", maxLength:150});				
		
		this.e_pp = new saiLabelEdit(this,{bound:[20,11,220,20],caption:"PP", maxLength:150});				
		this.e_tahun = new saiLabelEdit(this,{bound:[20,12,220,20],caption:"Tahun", maxLength:150});
		this.bTampil1 = new button(this,{bound:[245,12,80,18],caption:"Tampil1",click:[this,"doLoad"]});			
		this.bTampil2 = new button(this,{bound:[345,12,80,18],caption:"Tampil2",click:[this,"doLoad2"]});			

		this.sg = new saiGrid(this,{bound:[20,5,500,200],colCount:3,tag:9,
		            colTitle:["Akun","Periode","Nilai"],
					colWidth:[[2,1,0],[100,100,100]],
					colFormat:[[2],[cfNilai]],	
					readOnly:true,autoAppend:false,defaultRow:1});		
		

		this.sg1 = new saiGrid(this,{bound:[20,6,500,200],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Nilai"],
					colWidth:[[2,1,0],[100,100,100]],
					colFormat:[[2],[cfNilai]],	autoPaging:true,rowPerPage:20,				
					readOnly:true,autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this,{bound:[20,10,500,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});				


		this.rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
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
window.app_saku3_transaksi_sapyakes_fBelajarPhp.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fBelajarPhp.implement({		
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
					setTipeButton(tbSimpan);
					
				break;
			case "simpan" :									
			case "ubah" :									
				
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},	
	doChange:function(sender){	
		if (sender == this.e_akun && this.e_akun.getText()!="") {

			var akun = this.e_akun.getText();
			var self = this;
		
			this.app.services.call("getNamaAkun",[this.app._lokasi, akun] ,function(data){
				self.e_nama.setText(data);
			});


		}		
	},
	doLoad:function(sender){	
		try {
			if (this.e_pp.getText()!="" && this.e_tahun.getText()!="") {
				var self = this;			
				this.app.services.call("getDataBudget",[this.app._lokasi, this.e_tahun.getText(),this.e_pp.getText()] ,function(data){

					for (var i in data){
						var line = data[i];																
						self.sg.appendData([line.kode_akun,line.periode,floatToNilai(line.gar)]);
					}					
				});
			}	
		}
		catch(e) {
			alert(e);
		}	
	},





	doLoad2:function(sender){	
		try {
			if (this.e_pp.getText()!="" && this.e_tahun.getText()!="") {
				var self = this;			
				this.app.services.call("getSAPBudget",[this.app._lokasi, this.e_tahun.getText(),this.e_pp.getText()] ,function(data){

					for (var i in data){
						var line = data[i];																
						self.sg1.appendData([line.kode_akun,line.nama,"0"]);
					}
					
					self.sgn1.setTotalPage(Math.ceil(data.length/20));
					self.sgn1.rearrange();
					self.dataArray = data;

				});


			}	

		}
		catch(e) {
			alert(e);
		}	
	},
	doTampilData1: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataArray.length? this.dataArray.length:start + 20);

		for (var i=start;i<finish;i++){
			line = this.dataArray[i];							
			this.sg1.appendData([line.kode_akun,line.nama,"0"]);
		}
		this.sg1.setNoUrut(start);		
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},









	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_if_rptIfForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
								
								this.app.services.keepBudget(this.e_nb.getText(), function(data){ alert(data); });
								
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
			setTipeButton(tbSimpan);			
		} catch(e) {
			alert(e);
		}
	}
});