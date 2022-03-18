window.app_saku3_report_uin_flComment = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_uin_flComment.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_uin_flComment";
        this.maximize();
        
        // uses("saiCBBL;saiEdit;saiGrid;sgNavigator;app_saku3_dashboard;pageControl;util_ajaxCaller;listView;util_file;app_lab_remote_dataProvider;tinymceCtrl;reportViewer;server_report_report;server_util_Map;webBrowser");

		// this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		// uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib");	
		// this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		// this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
		// 		selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
		// 		colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
		// 		buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		// this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		// this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		// this.report = new server_report_report();
		// this.report.addListener(this);
        
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
window.app_saku3_report_uin_flComment.extend(window.childForm);
window.app_saku3_report_uin_flComment.implement({
	doLoad:function(){
        try{
            uses("saiCBBL;saiEdit;saiGrid;sgNavigator;app_saku3_dashboard;pageControl;util_ajaxCaller;listView;util_file;app_lab_remote_dataProvider;tinymceCtrl;reportViewer;server_report_report;server_util_Map;webBrowser");

            this.dashboard = new webBrowser(this,{bound:[20, 20, this.width - 60, this.height-44]});

			uses("server_report_report");
			this.report = new server_report_report();
			var nama_report="server_report_saku3_uin_vComment";
			this.filter="";
			this.showFilter = "";
			this.lokasi = "";

			this.filter2 = this.app._lokasi+"/"+this.app._periode+"/"+this.app._kodePP+"/"+this.app._userLog;
			
            this.dashboard.navigate(this.report.previewWithBs(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
        }catch(e){
			error_log(e);
		}
	},
	doOpen: function(nama_report,filter,filter2){
		
		this.filter=filter;
		this.showFilter = "";
		this.lokasi = "";
		this.filter2 = filter2;
		this.dashboard.navigate(this.report.previewWithBs(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());

	},
});
