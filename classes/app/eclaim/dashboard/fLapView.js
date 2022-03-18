/**
 * @author dweexfuad
 */
window.app_eclaim_dashboard_fLapView = function(owner,options, callObj)
{
    if (owner)
    {	
		try{
	        window.app_eclaim_dashboard_fLapView.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_eclaim_dashboard_fLapView";
            this.setCaption("Dashboard");
			this.callObj = callObj;
			this.setColor("");
			this.maximize();
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("pageControl",true);
			this.tab = new pageControl(this,{bound:[10,0,this.width - 30, this.height - 70], childPage:["Inventarisasi","Rekonsiliasi"]});
			this.sg1 = new saiGrid(this.tab.childPage[0], {
				bound: [1, 0, this.tab.width - 4, this.tab.height - 50],
				colCount: 12,
				readOnly: true,
				colTitle: ["No Inventarisasi","Tgl Inventaris","No Gabung", "Alamat","Jumlah Fisik","No Label","Status","Ket. Status","Sertifikat/IMB/PBB/DLL","Luas","Dekripsi Lokasi","Keterangan"],
				colWidth: [[11,10,9,8,7,6,5,4,3,2, 1, 0], [250,200,100,150,150,100,100,150,100,100,100,130]],				
				click: [this, "doSgBtnClick"],
				colAlign: [[2], [alCenter]]
			});
			this.sgn1 = new sgNavigator(this.tab.childPage[0], {
				bound: [1, this.tab.height - 40, this.sg1.width, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				beforePrint: [this, "doBeforePrintSg2"],
				grid: this.sg1
			});
			this.sg2 = new saiGrid(this.tab.childPage[1], {
				bound: [1, 0, this.tab.width - 4, this.tab.height - 50],
				colCount: 14,
				readOnly: true,
				colTitle: ["No Rekonsiliasi", "Tanggal", "No Gabung", "Info. KKIL = KKP?","Aset Tercatat","Selisih","Penjelasan Selisih","Tindak Lanjut","Update Deskrispi Aset","Update Alamat","Update BA","Status Final","Cara Verifikasi","Tindak lanjut final"],
				colWidth: [[13,12,11,10,9,8,7,6,5,4,3,2, 1, 0], [100,100,100,100,250,150,150, 150,100,100,100,100,100,130]],				
				click: [this, "doSgBtnClick"],
				colAlign: [[2], [alCenter]]
			});
			this.sgn2 = new sgNavigator(this.tab.childPage[1], {
				bound: [1, this.tab.height - 40, this.sg1.width, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				beforePrint: [this, "doBeforePrintSg2"],
				grid: this.sg2
			});	
			this.bClose = new imageButton(this,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_eclaim_dashboard_fLapView.extend(window.childForm);
window.app_eclaim_dashboard_fLapView.implement({    
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	setValue: function(value){		
		var sql = new server_util_arrayList();
		sql.add("select a.no_inv, date_format(a.tanggal,'%d-%m-%Y') as tgl, b.no_gabung,  b.jml_fisik, b.no_label, "+ 
					"		b.kode_status, c.nama as nm_status, b.no_sertifikat, b.luas, b.alamat, b.ket_lokasi,b.keterangan "+					
					"	from amu_kkl_m a "+
					"	 inner join amu_kkl_d b on b.no_inv = a.no_inv "+
					"	 inner join amu_status c on c.kode_status = b.kode_status and a.jenis = c.jenis "+
					"where b.no_gabung = '"+value+"' order by a.tanggal desc ");
		sql.add("select b.no_rekon, date_format(a.tanggal, '%d-%m-%Y') as tanggal, b.no_gabung, b.info_kkp, b.status_asset, b.selisih, b.penjelasan, b.tindakan, b.keterangan, b.lokasi, b.ba, b.status_final, b.verifikasi, b.tindakan2 "+
					"	from amu_rekon_m a "+
					" inner join amu_rekon_d  b on b.no_rekon = a.no_rekon "+					
					"where b.no_gabung = '"+value+"' order by a.tanggal desc ");
		
		var data = this.dbLib.getMultiDataProvider(sql,true);
		if (typeof data != "string"){
			var line;
			this.sg1.clear();
			for (var i in data.result[0].rs.rows){
				line = data.result[0].rs.rows[i];				
				this.sg1.appendData([line.no_inv, line.tgl, line.no_gabung, line.alamat,line.jml_fisik, line.no_label, line.kode_status, line.nm_status, line.no_sertifikat, line.luas, line.ket_lokasi, line.keterangan]);
			}
			this.sg2.clear();
			for (var i in data.result[1].rs.rows){
				line = data.result[1].rs.rows[i];				
				this.sg2.appendData([line.no_rekon,line.tanggal, line.no_gabung,line.info_kkp, line.status_asset, line.selisih, line.penjelasan, line.tindakan, line.keterangan, line.lokasi, line.ba, line.status_final, line.verifikasi, line.tindakan2]);
			}				
		}
	},
	setPanelCaption: function(data){		
	}
});
