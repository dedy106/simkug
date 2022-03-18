window.app_saku3_report_gl_flSopNonTk = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_gl_flSopNonTk.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_gl_flSopNonTk";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 99);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		
	}
	
	
	this.viewer.prepare();
	this.viewer.setVisible(true);
	this.viewer.useIframe("sop/sop_nontk.pdf");
                
};
window.app_saku3_report_gl_flSopNonTk.extend(window.childForm);
window.app_saku3_report_gl_flSopNonTk.implement({
	
});
