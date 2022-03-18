window.app_mede_report_fMonitoring = function(owner){
	if (owner){
		window.app_mede_report_fMonitoring.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_report_fMonitoring";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Monitoring FPJP", 0);					
		this.sg1 = new portalui_saiGrid(this,{bound:[20,20,this.width - 40,this.height - 100],colCount:8,colTitle:["Invoice","NIK","Nama","Tanggal","Aktifitas","HR & Admin","Accounting","Treasury"],
			colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,250,80,150,80,100]],readOnly:true, change:[this,"doGridChange"]});		
		this.standarLib = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);				
		this.onClose.set(this,"doClose");
		this.sg1.clear();
		this.sg1.appendData(["INV/0910/001","785690","User 1","10/10/2009","Operation and Maintenance","Close","Open","Open"]);		
		this.sg1.appendData(["INV/0910/002","785690","User 1","10/10/2009","Operation and Maintenance","Open","Open","Open"]);		
		this.sg1.appendData(["INV/0910/003","785690","User 1","10/10/2009","Operation and Maintenance","Close","Close","Close"]);		
		this.sg1.appendData(["INV/0910/004","785690","User 1","10/10/2009","Operation and Maintenance","Close","Close","Open"]);	
        this.sg1.appendData(["INV/0910/005","785690","User 1","10/10/2009","Operation and Maintenance","Open","Open","Open"]);		
        this.sg1.appendData(["INV/0910/006","785690","User 1","10/10/2009","Operation and Maintenance","Open","Open","Open"]);		
        this.sg1.appendData(["INV/0910/007","785690","User 1","10/10/2009","Operation and Maintenance","Close","Close","Close"]);		
        this.sg1.appendData(["INV/0910/008","785690","User 1","10/10/2009","Operation and Maintenance","Open","Open","Open"]);		
        this.sg1.appendData(["INV/0910/009","785690","User 1","10/10/2009","Operation and Maintenance","Close","Close","Open"]);		
        this.sg1.appendData(["INV/0910/010","785690","User 1","10/10/2009","Operation and Maintenance","Close","Close","Close"]);		
        this.sg1.appendData(["INV/0910/011","785690","User 1","10/10/2009","Operation and Maintenance","Open","Open","Open"]);		
        this.sg1.appendData(["INV/0910/012","785690","User 1","10/10/2009","Operation and Maintenance","Open","Open","Open"]);		
        this.sg1.appendData(["INV/0910/013","785690","User 1","10/10/2009","Operation and Maintenance","Open","Open","Open"]);		
        			
	
	}
};
window.app_mede_report_fMonitoring.extend(window.portalui_childForm);
window.app_mede_report_fMonitoring.implement({});
