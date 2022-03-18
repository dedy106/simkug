window.app_saku3_report_ypt_flAjuFisikOnline = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_ypt_flAjuFisikOnline.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_ypt_flAjuFisikOnline";
        this.maximize();
        
        // uses("saiCBBL;saiEdit;saiGrid;sgNavigator;app_saku3_yptboard;pageControl;util_ajaxCaller;listView;util_file;app_lab_remote_dataProvider;tinymceCtrl;reportViewer;server_report_report;server_util_Map;webBrowser");

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
			setTipeButton(tbAllFalse);		

			this.openAwal = "0"; 
			this.openAkhir = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,value1,value2 from spro where kode_spro in ('OPEN_JAM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																	
				this.openAwal = parseInt(line.value1);								
				this.openAkhir = parseInt(line.value2);								
			}

			this.doLoad();			

		}catch(e){
			systemAPI.alert(e);
		}
	}

};
window.app_saku3_report_ypt_flAjuFisikOnline.extend(window.childForm);
window.app_saku3_report_ypt_flAjuFisikOnline.implement({
	doLoad:function(){
        try{
			// this.formLock = 0;
			// var data = this.dbLib.getDataProvider("SELECT cast (substring(CONVERT(VARCHAR(8),GETDATE(),108) ,1,2) as int) as jam_now",true);	
			// if (typeof data == "object" && data.rs.rows[0] != undefined) {
			// 	var line = data.rs.rows[0];
			// 	if (parseInt(line.jam_now) < this.openAwal || parseInt(line.jam_now) > this.openAkhir) {
			// 		this.formLock = 1;					
			// 	}
			// }

			// var data = this.dbLib.getDataProvider("SELECT FORMAT(getdate(), 'dddd') AS hari",true);	
			// if (typeof data == "object" && data.rs.rows[0] != undefined) {
			// 	var line = data.rs.rows[0];
			// 	if (line.hari == "Sunday" || line.hari == "Saturday") {
			// 		this.formLock = 1;	
			// 	}
			// }
			var data = this.dbLib.getDataProvider("SELECT substring(convert(varchar,getdate(),103),7,4) as tahun,substring(convert(varchar,getdate(),103),4,2) as bulan,substring(convert(varchar,getdate(),103),1,2) as tgl",true);					
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line = data.rs.rows[0];				
				this.tahun = line.tahun;
				this.bulan = line.bulan;
				this.tgl = line.tgl;
			}
				

			this.formLock = 0;
			var data = this.dbLib.getDataProvider("select substring(flag,1,2) as jamawal,substring(flag,4,2) as minawal,  "+
												  "substring(keterangan,1,2) as jamakhir,substring(keterangan,4,2) as minakhir, "+
												  "substring(CONVERT(VARCHAR(8),GETDATE(),108) ,1,2) as jamnow, substring(CONVERT(VARCHAR(8),GETDATE(),108) ,4,2) as minnow "+
												  "from spro where kode_spro in ('OPEN_JAM') and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];																	
				var openAwal = new Date(this.tahun,this.bulan,this.tgl,line.jamawal,line.minawal,0,0);				
				var openAkhir = new Date(this.tahun,this.bulan,this.tgl,line.jamakhir,line.minakhir,0,0);				
				var jamNow = new Date(this.tahun,this.bulan,this.tgl,line.jamnow,line.minnow,0,0);				
				if (jamNow < openAwal || jamNow > openAkhir) {
					this.formLock = 1;								
				}				
			}

            var data = this.dbLib.getDataProvider("SELECT FORMAT(getdate(), 'dddd') AS hari",true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line = data.rs.rows[0];
				if (line.hari == "Sunday" || line.hari == "Saturday") {
					this.formLock = 1;	
				}
			}

			if (this.formLock == 1) {
				system.alert(this,"Form tidak bisa digunakan.","Akses Form ini Berbatas Waktu.");					
				return false;
			}
			else {
				uses("saiCBBL;saiEdit;saiGrid;sgNavigator;app_saku3_dashboard;pageControl;util_ajaxCaller;listView;util_file;app_lab_remote_dataProvider;tinymceCtrl;reportViewer;server_report_report;server_util_Map;webBrowser");

				this.dashboard = new webBrowser(this,{bound:[20, 20, this.width - 60, this.height]});

				uses("server_report_report");
				this.report = new server_report_report();
				var nama_report="server_report_saku3_ypt_rptAjuFisikOnline";
				this.filter="";
				this.showFilter = "";
				this.lokasi = "";

				var tmp = openAwal.getMonth()+ 1;
				if (tmp.toString().length == 1) {
					bulan = "0"+tmp; 
				}else{
					bulan = tmp;
				}
				var openAwal2 = openAwal.getFullYear() + "-" + bulan + "-" + openAwal.getDate() + " " +  openAwal.getHours() + ":" + openAwal.getMinutes() + ":" + openAwal.getSeconds();

				var tmp2 = openAwal.getMonth()+ 1;
				if (tmp2.toString().length == 1) {
					bulan2 = "0"+tmp2; 
				}else{
					bulan2 = tmp2;
				}
				var openAkhir2 = openAkhir.getFullYear() + "-" + bulan2 + "-" + openAkhir.getDate() + " " +  openAkhir.getHours() + ":" + openAkhir.getMinutes() + ":" + openAkhir.getSeconds();

				console.log(openAwal2);
				console.log(openAkhir2);
				this.filter2 = this.app._lokasi+"/"+this.app._periode+"/"+this.app._kodePP+"/"+this.app._userLog+"/"+openAwal2+"/"+openAkhir2;
				
				this.dashboard.navigate(this.report.previewWithBs(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
			}
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

	}
});
