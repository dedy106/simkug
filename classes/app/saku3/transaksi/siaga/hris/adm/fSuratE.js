window.app_saku3_transaksi_siaga_hris_adm_fSuratE = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fSuratE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fSuratE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Surat Keterangan : Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Surat", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Untuk Keperluan", maxLength:100});		
		this.e_tujuan = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Ditujukan kepada", maxLength:200});
		this.cb_dept = new saiCBBL(this,{bound:[20,15,200,20],caption:"Departemen", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Tujuan", multiSelection:false, maxLength:10, tag:1});
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
			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);
			this.e_nb.setSQL("select no_surat, keterangan from gr_surat where progress = '0' and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",["no_surat","keterangan"],false,["No Surat","Keterangan"],"and","Data Surat",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fSuratE.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fSuratE.implement({
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
					sql.add("delete from gr_surat where no_surat='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into gr_surat(no_surat,kode_lokasi,periode,tanggal,kode_dept,kode_jab,nik_buat,nik_app,keterangan,progress,tgl_input,nik_user,kepada) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_dept.getText()+"','"+this.jab+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"','0',getdate(),'"+this.app._userLog+"','"+this.e_tujuan.getText()+"')");
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
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
					this.cb1.setSelected(false);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_surat where no_surat='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			var data = this.dbLib.getDataProvider(
					   "select a.keterangan,a.tanggal,a.kode_dept,a.nik_buat,a.nik_app,b.nama as nama_dept,c.nama as nama_buat,d.nama as nama_app,a.kode_jab,a.kepada "+
					   "from gr_surat a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
					   "			    inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "			    inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+					   
					   "where a.no_surat='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.e_ket.setText(line.keterangan);										
					this.e_tujuan.setText(line.kepada);										
					this.cb_dept.setText(line.kode_dept,line.nama_dept);
					this.cb_buat.setSQL("select nik, nama ,kode_jab from gr_karyawan where kode_dept ='"+this.cb_dept.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_jab"],false,["NIK","Nama","Kode Jab"],"and","Data NIK Pembuat",true);			
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.jab = line.kode_jab;
				} 
			}			
		}
		if (sender == this.cb_dept) {
			if (this.cb_dept.getText()!="") {				
				this.cb_buat.setSQL("select nik, nama ,kode_jab from gr_karyawan where kode_dept ='"+this.cb_dept.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_jab"],false,["NIK","Nama","Kode Jab"],"and","Data NIK Pembuat",true);			
			}
		}
		if (sender == this.cb_buat) {
			if (this.cb_buat.getText()!="") this.jab = this.cb_buat.dataFromList[2];
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_hris_rptSurat";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_surat='"+this.e_nb.getText()+"' ";
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