window.app_hris_transaksi_adm_fAbsenE = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fAbsenE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fAbsenE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Absensi : Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Absen", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,14,100,18],caption:"Tgl Absensi", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,14,100,18],date:new Date().getDateStr()}); 		
		this.cb_absen = new saiCBBL(this,{bound:[20,18,200,20],caption:"Status Absensi", multiSelection:false, maxLength:10, tag:1});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Keterangan", maxLength:100});		
		this.cb_loker = new saiCBBL(this,{bound:[20,21,200,20],caption:"Loker", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,22,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1});
		this.cb_app = new saiCBBL(this,{bound:[20,23,200,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:1});
		this.cb1 = new portalui_checkBox(this,{bound:[120,24,100,25],caption:"Preview",selected:true});	
		this.rearrangeChild(10, 23);
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
	
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_absen.setSQL("select sts_absen, nama from gr_status_absen where kode_lokasi='"+this.app._lokasi+"'",["sts_absen","nama"],false,["Kode","Nama"],"and","Data Status Absensi",true);						
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Lokasi Kerja",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);			

			this.e_nb.setSQL("select no_absen, keterangan from gr_absen where progress = '0' and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",["no_absen","keterangan"],false,["No Absen","Keterangan"],"and","Data Absensi",true);			
			this.cb_loker.setText(this.app._kodeLoker);
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_adm_fAbsenE.extend(window.childForm);
window.app_hris_transaksi_adm_fAbsenE.implement({
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
					sql.add("delete from gr_absen where no_absen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into gr_absen(no_absen,kode_lokasi,periode,tanggal,kode_loker,sts_absen,nik_buat,nik_app,keterangan,progress,tgl_input,nik_user,tgl_absen) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_loker.getText()+"','"+this.cb_absen.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"','0',getdate(),'"+this.app._userLog+"','"+this.dp_d2.getDateString()+"')");
					sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
							"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+" 00:00:00','"+this.cb_absen.getText()+"','ABSEN', '-')");

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
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.cb1.setSelected(true);
				var data = this.dbLib.getDataProvider("select nama from gr_libur where '"+this.dp_d2.getDateString()+"' between tgl_mulai and tgl_akhir and tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					system.alert(this,"Transaksi tidak valid.","Tanggal masuk dalam hari libur : ["+line.nama+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
					this.cb1.setSelected(false);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_absen where no_absen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
	},
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.dp_d2.setFocus();
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.keterangan,a.kode_loker,a.sts_absen,a.nik_buat,a.nik_app,"+
					   "b.nama as nama_loker,c.nama as nama_absen,e.nama as nama_buat,f.nama as nama_app,a.tgl_absen "+					   
					   "from gr_absen a "+
					   "     inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
					   "     inner join gr_status_absen c on a.sts_absen=c.sts_absen and a.kode_lokasi=c.kode_lokasi "+					   
					   "     inner join gr_karyawan e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi "+
					   "     inner join gr_karyawan f on a.nik_app=f.nik and a.kode_lokasi=f.kode_lokasi "+					   
					   "where a.no_absen='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);									
					this.dp_d2.setText(line.tgl_absen);									
					this.e_ket.setText(line.keterangan);
					this.cb_loker.setText(line.kode_loker,line.nama_loker);
					this.cb_absen.setText(line.sts_absen,line.nama_absen);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);					
				} 
			}			
		}
		if (this.cb_loker.getText()!="") {			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_hris_rptAbsen";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_absen='"+this.e_nb.getText()+"' ";
								this.filter2 = "1";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});