window.app_saku3_transaksi_amu_fUploadDokLantai = function (owner) {
    if (owner) {
        window.app_saku3_transaksi_amu_fUploadDokLantai.prototype.parent.constructor.call(this, owner);
        this.className = "app_saku3_transaksi_amu_fUploadDokLantai";
        this.maximize();

        try {
            this.dbLib = new util_dbLib();
            this.dbLib.addListener(this);
            uses("util_standar");
            this.standarLib = new util_standar();

            this.doLoad();

        } catch (e) {
            systemAPI.alert(e);
        }
    }

};
window.app_saku3_transaksi_amu_fUploadDokLantai.extend(window.childForm);
window.app_saku3_transaksi_amu_fUploadDokLantai.implement({
    doLoad: function () {
        try {
            uses("saiCBBL;saiEdit;saiGrid;sgNavigator;app_saku3_dashboard;pageControl;util_ajaxCaller;listView;util_file;app_lab_remote_dataProvider;tinymceCtrl;reportViewer;server_report_report;server_util_Map;webBrowser");

            this.dashboard = new webBrowser(this, { bound: [20, 20, this.width - 60, this.height -50] });

            uses("server_report_report");
            this.report = new server_report_report();
            var nama_report = "server_report_saku3_amu_rptUploadDokLantai";
            this.filter = "";
            this.showFilter = "";
            this.lokasi = "";

            this.filter2 = this.app._lokasi + "/" + this.app._periode + "/" + this.app._kodePP+"/"+this.app._userLog+"/"+this.app._userPwd;

            this.dashboard.navigate(this.report.previewWithBs(nama_report, this.filter, 1, 1, this.showFilter, this.lokasi, this.filter2) + "&resource=" + this.resourceId + "&fullId=" + this.getFullId());
        } catch (e) {
            error_log(e);
        }
    },
    doOpen: function (nama_report, filter, filter2) {

        this.filter = filter;
        this.showFilter = "";
        this.lokasi = "";
        this.filter2 = filter2;
        this.dashboard.navigate(this.report.previewWithBs(nama_report, this.filter, 1, 1, this.showFilter, this.lokasi, this.filter2) + "&resource=" + this.resourceId + "&fullId=" + this.getFullId());

    },
});
