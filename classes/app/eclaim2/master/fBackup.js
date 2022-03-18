window.app_eclaim2_master_fBackup = function(owner)
{
	if (owner)
	{
		window.app_eclaim2_master_fBackup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim2_master_fBackup";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data lokasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;pageControl;server_report_report");
		this.pg1 = new pageControl(this,{bound:[15,30,600,400], childPage:["Backup Database"]});
		var cnv = this.pg1.childPage[0].getClientCanvas();
		this.pg1.childPage[0].addStyle("background:#ffffff");
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:100%";		
		cnv.appendChild(this.docViewer);
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			//setTipeButton(tbSimpan);
			window.open("http://202.134.4.50/phpmyadmin");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim2_master_fBackup.extend(window.childForm);
window.app_eclaim2_master_fBackup.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					this.report = new server_report_report();
					this.filter = "";
					this.showFilter = "";
					this.lokasi = "";
					this.filter2 = "";
					//this.docViewer.src = this.report.previewWithHeader("server_report_eclaim2_rptBackup",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
					//this.docViewer.src="server_report_eclaim2_rptBackup";
					this.docViewer.src = this.report.previewWithHeader("http://202.134.4.50/phpmyadmin",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
				setTipeButton(tbAllFalse);
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
		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							system.info(this,"Transaksi telah sukses tereksekusi ","");	
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});