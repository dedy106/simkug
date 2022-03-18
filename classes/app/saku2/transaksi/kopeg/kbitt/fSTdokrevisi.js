window.app_saku2_transaksi_kopeg_kbitt_fSTdokrevisi = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fSTdokrevisi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fSTdokrevisi";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Serah Terima Berkas Revisi Verifikasi Dokumen", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		
		this.e_noaju = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"No Agenda",multiSelection:false, tag:0, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"Nominal", tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_pp = new saiLabelEdit(this,{bound:[20,12,550,20],caption:"PP/Unit", readOnly:true});				
		this.e_akun = new saiLabelEdit(this,{bound:[20,13,550,20],caption:"Akun", readOnly:true});				
		this.e_drk = new saiLabelEdit(this,{bound:[20,14,550,20],caption:"DRK", readOnly:true});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150, readOnly:true});						
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],visible:false});

		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
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
												  "from spro where kode_spro in ('OPEN_JAM2') and kode_lokasi = '"+this.app._lokasi+"'",true);
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
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fSTdokrevisi.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fSTdokrevisi.implement({
	isiCBagenda: function() {
		this.e_noaju.setSQL("select a.no_aju,a.keterangan "+
							"from it_aju_m a "+					 
							"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
							"inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='OFFLINE' and a.no_app=f.no_app "+					 					 
							//"left join it_aju_fisik e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi "+							
							"where a.no_app like '__-APP%' and a.progress in ('D')  and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "
							,["a.no_aju","a.keterangan"],false,["No Agenda","Deskripsi"],"and","Data Agenda",true);
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
			var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_fisik","no_bukti",this.app._lokasi+"-STR"+this.e_periode.getText().substr(2,4)+".","00000");		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("insert into it_aju_fisik(no_bukti,no_aju,kode_lokasi,tgl_input,nik_user) values "+
							"('"+nb+"','"+this.e_noaju.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"')");

					sql.add("update it_aju_m set progress='R' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
					setTipeButton(tbSimpan);
					this.isiCBagenda();					
				break;
			case "simpan" :	
				this.formLock = 0;
				var data = this.dbLib.getDataProvider("select substring(flag,1,2) as jamawal,substring(flag,4,2) as minawal,  "+
													"substring(keterangan,1,2) as jamakhir,substring(keterangan,4,2) as minakhir, "+
													"substring(CONVERT(VARCHAR(8),GETDATE(),108) ,1,2) as jamnow, substring(CONVERT(VARCHAR(8),GETDATE(),108) ,4,2) as minnow "+
													"from spro where kode_spro in ('OPEN_JAM2') and kode_lokasi = '"+this.app._lokasi+"'",true);
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
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick();
		this.isiCBagenda();		
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_fisik","no_bukti",this.app._lokasi+"-STR"+this.e_periode.getText().substr(2,4)+".","00000"));		
		this.e_noaju.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){		
		if (sender==this.e_noaju) {			
			if (this.e_noaju.getText() != "") {
				var strSQL = "select a.form,a.nilai,a.kode_pp,a.keterangan,a.tanggal,a.kode_pp+' - '+b.nama as pp,a.kode_akun+' - '+c.nama as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk "+
							 "from it_aju_m a "+
							 "                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_app like '__-APP%' and a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('D') ";				
				
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.kodePP = line.kode_pp;
					this.e_ket.setText(line.keterangan);				
					this.e_pp.setText(line.pp);				
					this.e_akun.setText(line.akun);				
					this.e_drk.setText(line.drk);				
					this.dp_d2.setText(line.tanggal);	
					this.e_nilai.setText(floatToNilai(line.nilai));			
					this.modul = line.form;					
				}	
				
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormDokFisik";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_noaju.getText()+"' ";
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
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}						
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);						
			setTipeButton(tbSimpan);
			this.isiCBagenda();			
		} catch(e) {
			alert(e);
		}
	}
});