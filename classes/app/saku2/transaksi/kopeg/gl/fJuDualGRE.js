window.app_saku2_transaksi_kopeg_gl_fJuDualGRE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_gl_fJuDualGRE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_gl_fJuDualGRE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Umum Dual Akun: Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0"});				
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.flagFAGL = "0"; this.ppFA = "-";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('FAGL','FAPP') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "FAGL") this.flagFAGL = line.flag;			
					if (line.kode_spro == "FAPP") this.ppFA = line.flag;			
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_gl_fJuDualGRE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_gl_fJuDualGRE.implement({	
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
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul ='JU'");					
					sql.add("delete from gl_fa_asset where no_ref = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.kodePP+"','JU','DUAL','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','"+this.kodeDRK+"',getdate(),'"+this.app._userLog+"')");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunDebet+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodePP+"','"+this.kodeDRK+"','-','-','-','-','-','-','"+this.app._lokasi+"','JU','DUAL','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunKredit+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodePP+"','"+this.kodeDRK+"','-','-','-','-','-','-','"+this.app._lokasi+"','JU','DUAL','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
										
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"	('"+this.e_nb.getText()+"','JU','"+this.app._lokasi+"','"+this.akunDebet+"','"+this.kodePP+"','"+this.kodeDRK+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.e_nilai.getText())+")");
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"	('"+this.e_nb.getText()+"','JU','"+this.app._lokasi+"','"+this.akunKredit+"','"+this.kodePP+"','"+this.kodeDRK+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',0,"+nilaiToFloat(this.e_nilai.getText())+")");
					
					if (this.flagFAGL == "1") {
						sql.add("insert into gl_fa_asset (no_fa,kode_lokasi,kode_pp,kode_klpakun,umur,persen,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,progress,tgl_perolehan,periode,tgl_susut,periode_susut,nik_user,tgl_input,kode_akun,kode_pp_susut,nilai_susut,no_ref) "+
							"select case when len(cast(no_urut as varchar)) = 1 then  a.no_ju + '-00'+cast(no_urut as varchar)  "+
							"            when len(cast(no_urut as varchar)) = 2 then  a.no_ju + '-0'+cast(no_urut as varchar)  "+
							"            when len(cast(no_urut as varchar)) = 3 then  a.no_ju + '-'+cast(no_urut as varchar) end "+
							",'"+this.app._lokasi+"',a.kode_pp,b.kode_klpakun,b.umur,b.persen,a.keterangan,'IDR',1,a.nilai,1,b.kode_drk,'2','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),a.kode_akun,'"+this.ppFA+"',case when b.umur = 0 then 0 else round(a.nilai/b.umur,0) end as susut,'"+this.e_nb.getText()+"' "+
							"from ju_j a inner join fa_klpakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ") ;
					}
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
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 										
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (line.kode_akun == this.akunDebet || line.kode_akun == this.akunKredit) {		
						k = j+1;
						system.alert(this,"Transaksi tidak valid.","Transaksi Akun KasBank tidak diperkenankan.");
						return false;						
					}
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul ='JU'");
					sql.add("delete from gl_fa_asset where no_ref = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_ju, keterangan from ju_m where modul = 'JU' and jenis = 'DUAL' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_ju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.nilai,a.kode_pp,a.ref1 "+
					   "from ju_m a where a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.e_nilai.setText(floatToNilai(line.nilai));					
					this.kodePP = line.kode_pp;
					this.kodeDRK = line.ref1;
				} 
			}
			var data = this.dbLib.getDataProvider("select a.kode_akun,a.dc from ju_j a where a.no_ju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line.dc == "D") this.akunDebet = line.kode_akun;
					if (line.dc == "C") this.akunKredit = line.kode_akun;
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
							this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
						}else system.info(this,result,"");
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