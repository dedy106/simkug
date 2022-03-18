window.app_hris_transaksi_adm_fLembur = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fLembur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fLembur";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Lembur Sukarela: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Lembur",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_tugas = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Tugas", maxLength:100});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Dilaporkan Kepada", maxLength:100});	
		this.c_hari = new saiCB(this,{bound:[20,16,180,20],caption:"Hari",items:["SENIN","SELASA","RABU","KAMIS","JUMAT","SABTU","MINGGU"], readOnly:true});
		//this.c_jh = new saiCB(this,{bound:[20,17,180,20],caption:"Jenis Hari",items:["HK","HL"], readOnly:true}); <--- otomatis dari tanggal
		this.c_jh = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Jenis Hari", maxLength:100, tag:2,readOnly:true});	
		this.e_jam = new saiLabelEdit(this,{bound:[20,16,180,20],caption:"Jam [0-24]", maxLength:5, tipeText:ttNilai, change:[this,"doChange"]});		
		this.e_jam2 = new saiLabelEdit(this,{bound:[210,16,120,20],caption:"s/d", labelWidth:50,maxLength:5, tipeText:ttNilai, change:[this,"doChange"]});		
		
		this.e_jk = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Perhtg. Jam Kerja", tipeText:ttNilai, text:"0"});		//readOnly:true, 
		this.cb_loker = new saiCBBL(this,{bound:[20,19,200,20],caption:"Loker", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.cb1 = new portalui_checkBox(this,{bound:[120,24,100,25],caption:"Preview",selected:true});	
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Lokasi Kerja",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_loker.setText(this.app._kodeLoker);
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_adm_fLembur.extend(window.childForm);
window.app_hris_transaksi_adm_fLembur.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_lembur","no_lembur",this.app._lokasi+"-LBR"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_lembur(no_lembur,kode_lokasi,periode,tanggal,kode_loker,jam,tugas,nik_buat,nik_app,keterangan,progress,jam_kerja,tgl_input,nik_user,hari,jenis_hari,no_lembur_gaji) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_loker.getText()+"','"+this.e_jam.getText()+"-"+this.e_jam2.getText()+"','"+this.e_tugas.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"','0',"+parseNilai(this.e_jk.getText())+",getdate(),'"+this.app._userLog+"','"+this.c_hari.getText()+"','"+this.c_jh.getText()+"','-')");
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
				break;
			case "simpan" :					
				if (this.c_jh.getText() == "HK") {
					if (nilaiToFloat(this.e_jam.getText()) > 7 && nilaiToFloat(this.e_jam.getText()) < 18) {
						system.alert(this,"Jam mulai lembur tidak valid.","Jam mulai lembur tidak boleh kurang dari jam 18:00 (HK).");
						return false;						
					}
				}
				if (nilaiToFloat(this.e_jam.getText()) < 0 || nilaiToFloat(this.e_jam2.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Jam lembur tidak boleh kurang dari jam 00.");
					return false;						
				}
				if (nilaiToFloat(this.e_jam.getText()) > 24 || nilaiToFloat(this.e_jam2.getText()) > 24) {
					system.alert(this,"Transaksi tidak valid.","Jam lembur tidak boleh melebihi jam 24.");
					return false;						
				}
				if (nilaiToFloat(this.e_jam.getText()) >= nilaiToFloat(this.e_jam2.getText())) {
					system.alert(this,"Transaksi tidak valid.","Jam mulai tidak boleh melebihi atau sama dengan jam berakhir.");
					return false;						
				}				
				else this.simpan();
				break;							
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		var data = this.dbLib.getDataProvider("select nama from gr_libur where '"+this.dp_d1.getDateString()+"' between tgl_mulai and tgl_akhir and tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.c_jh.setText("HL");			
		} 
		else {
			this.c_jh.setText("HK");
			this.e_jam.setText("18");
		}
		
		var data = this.dbLib.getDataProvider("select datename(dw,'"+this.dp_d1.getDateString()+"') as day ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			if (line.day.toUpperCase() == "MONDAY") var namaHari = "SENIN";
			if (line.day.toUpperCase() == "TUESDAY") var namaHari = "SELASA";
			if (line.day.toUpperCase() == "WEDNESDAY") var namaHari = "RABU";
			if (line.day.toUpperCase() == "THURSDAY") var namaHari = "KAMIS";
			if (line.day.toUpperCase() == "FRIDAY") var namaHari = "JUMAT";
			if (line.day.toUpperCase() == "SATURDAY") var namaHari = "SABTU";
			if (line.day.toUpperCase() == "SUNDAY") var namaHari = "MINGGU";			
			this.c_hari.setText(namaHari);			
		} 		
		this.e_nb.setText("");
	},
	doChange:function(sender){
		if (sender == this.cb_loker) {
			if (this.cb_loker.getText()!="") {
				//this.cb_buat.setText("","");
				this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			}
		}
		if (sender == this.e_jam || sender == this.e_jam2) {
			if (this.e_jam.getText()!="" && this.e_jam2.getText()!="" ) {				
				var lama = nilaiToFloat(this.e_jam2.getText()) - nilaiToFloat(this.e_jam.getText());
				this.e_jk.setText(floatToNilai(lama));
			}
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_lembur","no_lembur",this.app._lokasi+"-LBR"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_tugas.setFocus();
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_hris_rptLembur";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_lembur='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});
