window.app_hris_transaksi_adm_fCuti = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fCuti.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fCuti";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Cuti: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Cuti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_cuti = new saiCBBL(this,{bound:[20,13,200,20],caption:"Jenis Cuti", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.l_tgl2 = new portalui_label(this,{bound:[20,14,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,14,100,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl3 = new portalui_label(this,{bound:[20,15,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,15,100,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate2"]}); 
		this.cb_loker = new saiCBBL(this,{bound:[20,19,200,20],caption:"Loker", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.e_saldo = new saiLabelEdit(this,{bound:[20,16,180,20],caption:"Sisa Thn Ini", tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_saldo2 = new saiLabelEdit(this,{bound:[220,16,180,20],caption:"Sisa Thn Lalu", tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_lama = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Jumlah Hari", tipeText:ttNilai, text:"0", readOnly:true});				
		this.e_lama2 = new saiLabelEdit(this,{bound:[220,17,180,20],caption:"Jumlah Thn Lalu", tipeText:ttNilai, text:"0", readOnly:true});				
		this.i_hitung = new portalui_imageButton(this,{bound:[425,17,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_alamat = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Alamat Cuti", maxLength:100});		
		this.e_alasan = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Alasan Cuti", maxLength:200});				
		
		this.p1 = new panel(this,{bound:[10,23,460,200],caption:"Daftar Tanggal Cuti",visible:true});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:1,tag:9,
		            colTitle:["Tanggal"],
					colWidth:[[0],[100]],															
					autoAppend:true,defaultRow:1});		
		this.cb1 = new portalui_checkBox(this,{bound:[420,24,100,25],caption:"Preview",selected:true});
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
			this.cb_cuti.setSQL("select sts_cuti, nama from gr_status_cuti where kode_lokasi='"+this.app._lokasi+"'",["sts_cuti","nama"],false,["Kode","Nama"],"and","Data Jenis Cuti",true);						
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
window.app_hris_transaksi_adm_fCuti.extend(window.childForm);
window.app_hris_transaksi_adm_fCuti.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_cuti","no_cuti",this.app._lokasi+"-CUTI"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_cuti(no_cuti,kode_lokasi,periode,tanggal,sts_cuti,tgl_mulai,tgl_selesai,kode_loker,alamat,alasan,nik_buat,nik_app,progress,tgl_input,nik_user,lama,sisa,lama_lalu,sisa_lalu) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_cuti.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.cb_loker.getText()+"','"+this.e_alamat.getText()+"','"+this.e_alasan.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','0',getdate(),'"+this.app._userLog+"',"+parseNilai(this.e_lama.getText())+","+parseNilai(this.e_saldo.getText())+","+parseNilai(this.e_lama2.getText())+","+parseNilai(this.e_saldo2.getText())+")");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+" 08:00:00','I','CUTI', '-')");
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+" 17:00:00','O','CUTI', '-')");							
						}
					}
					//setTipeButton(tbAllFalse);					
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
					this.sg.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				if ((nilaiToFloat(this.e_lama.getText()) + nilaiToFloat(this.e_lama2.getText())) > (nilaiToFloat(this.e_saldo.getText()) + nilaiToFloat(this.e_saldo2.getText()))) {
					system.alert(this,"Transaksi tidak valid.","Pengajuan tidak boleh melebihi sisa cuti.");
					return false;						
				}
				if ((nilaiToFloat(this.e_lama.getText())+nilaiToFloat(this.e_lama2.getText())) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Pengajuan tidak boleh nol atau kurang.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){	
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doSelectDate2: function(sender, y,m,d){			
		this.e_lama.setText("0");
		this.sg.clear(1);
	},	
	doChange:function(sender){
		if (sender == this.cb_loker && this.cb_loker.getText()!="") {
			//this.cb_buat.setText("","");
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		}
		if ((sender == this.cb_cuti || sender == this.cb_buat) && this.cb_cuti.getText()!="" && this.cb_buat.getText()!="" && this.e_periode.getText()!="") {												 
			this.doCekSaldo();			
		}
	},
	doCekSaldo:function(sender){
		this.e_saldo.setText("0");	
			var data = this.dbLib.getDataProvider("select a.nik,a.ini-isnull(b.pakai,0)-isnull(bb.pakai,0) as sisa,a.lalu-isnull(b.pakai_lalu,0)-isnull(bb.pakai_lalu,0) as sisa_lalu "+
			"from  "+
			"( "+
			"select nik,kode_lokasi,sum(jumlah-kurang) as ini,sum(tambah) as lalu "+
			"from gr_cuti_karyawan  "+
			"where sts_cuti = '"+this.cb_cuti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'  "+
			"group by nik,kode_lokasi "+
			") a  "+
			"left join  "+ 
			"( "+
			"select nik_buat as nik,kode_lokasi,sum(lama) as pakai, sum(lama_lalu) as pakai_lalu from gr_cuti "+
			"where sts_cuti='"+this.cb_cuti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'  "+
			"group by nik_buat,kode_lokasi "+
			") b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			"left join  "+ 
			"( "+
			"select nik,kode_lokasi,sum(lama) as pakai, 0 as pakai_lalu from gr_cuti_d "+
			"where sts_cuti='"+this.cb_cuti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'  "+
			"group by nik,kode_lokasi "+
			") bb on a.nik=bb.nik and a.kode_lokasi=bb.kode_lokasi "+
			"where a.nik='"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_saldo.setText(floatToNilai(line.sisa));
				this.e_saldo2.setText(floatToNilai(line.sisa_lalu));
				//this.e_saldo2.setText(0);
			}
	},
	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_cuti","no_cuti",this.app._lokasi+"-CUTI"+this.e_periode.getText().substr(2,4)+".","000"));
			this.cb_cuti.setFocus();
		}	
		else{					
			var data = this.dbLib.getDataProvider("select * from gr_libur where tahun ='"+this.dp_d2.getDateString().substr(0,4)+"' and (('"+this.dp_d2.getDateString()+"' between tgl_mulai and tgl_akhir) or ('"+this.dp_d3.getDateString()+"' between tgl_mulai and tgl_akhir))",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				system.alert(this,"Tgl Filter tidak valid.","Tgl Mulai dan Tgl Selesai termasuk tanggal libur.");
				return false;						
			}			
			var data = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"')+1 as jumlah",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				var jumlah = parseInt(line.jumlah);
				this.e_lama.setText(floatToNilai(jumlah));
			}		
			
			if (this.cb_cuti.getText() == "1") {
				this.doCekSaldo();
				var data = this.dbLib.getDataProvider("select isnull(sum(datediff(day,tgl_mulai,tgl_akhir)+1),0) as libur from gr_libur where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' and tgl_mulai between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"'",true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];				
					
					var lama = jumlah - parseInt(line.libur);
					if (this.e_saldo2.getText()!= "0") {
							if (nilaiToFloat(this.e_saldo2.getText()) > lama ) {
								this.e_lama.setText("0");
								this.e_lama2.setText(floatToNilai(lama));
							} 
							else {
								this.e_lama2.setText(this.e_saldo2.getText());
								lama = lama - nilaiToFloat(this.e_saldo2.getText());
								this.e_lama.setText(floatToNilai(lama));
								
							}
					}
					else {
						this.e_lama.setText(floatToNilai(lama));
						this.e_lama2.setText("0");
					}
				}				
			}
			
			this.sg.clear(1);
			var j = 0;
			var tanggal = "";
			for (var i=0;i < jumlah;i++){			
				var data = this.dbLib.getDataProvider("select dateadd(day,"+i+",'"+this.dp_d2.getDateString()+"') as tanggal",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];		
					if (this.cb_cuti.getText() == "1") {
						var data2 = this.dbLib.getDataProvider("select tgl_mulai from gr_libur where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' and '"+line.tanggal+"' between tgl_mulai and tgl_akhir",true);			
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){						
						} 
						else {
							tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
							this.sg.cells(0,j,tanggal);
							this.sg.appendRow(1);
							j++;
						}
					} 
					else {
						tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
						this.sg.cells(0,j,tanggal);
						this.sg.appendRow(1);
						j++;
					}
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_hris_rptCuti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_cuti='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+"1";
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
			this.sg.clear(1);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});