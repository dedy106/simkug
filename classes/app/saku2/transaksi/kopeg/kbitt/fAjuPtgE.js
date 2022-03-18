window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuPtgE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar Operasional: Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Agenda", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Kode Transaksi",items:["PJPTG"], readOnly:true,tag:2});		
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,12,202,20],caption:"NIK Pemegang",readOnly:true});
		this.cb_panjar = new portalui_saiCBBL(this,{bound:[20,13,202,20],caption:"No Panjar",readOnly:true});
		this.e_nilaipj = new saiLabelEdit(this,{bound:[20,18,180,20],caption:"Nilai Panjar", tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,19,202,20],caption:"Bagian / Unit",multiSelection:false});		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,11,202,20],caption:"MTA",multiSelection:false,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Nominal", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_nilaikb = new saiLabelEdit(this,{bound:[20,18,180,20],caption:"Kas Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.e_nover = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"No Verifikasi", tag:9, readOnly:true});										
		this.e_memo = new saiMemo(this,{bound:[20,12,450,80],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
				
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
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);									
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgE.implement({	
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
					this.viewLap = true;
					
					sql.add("update it_aju_m set progress='3', no_ptg='-' where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update it_aju_m set progress='4', no_ptg='"+this.e_nb.getText()+"' where no_aju='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','0','"+this.cb_nik.getText()+"','"+this.cb_panjar.getText()+"')");
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
				this.viewLap = false;				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update it_aju_m set progress='3', no_ptg='-' where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
			this.e_nb.setSQL("select a.no_aju, a.keterangan from it_aju_m a left join pr_beban_d c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi and c.modul='PJPTG' "+
			                 "where c.no_aju is null and a.modul='PJPTG' and a.progress in ('0','R') and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,a.kode_pp,a.nik_panjar,a.kode_drk,isnull(x.no_ver,'-') as no_ver,isnull(x.catatan,'-') as catatan,a.kode_akun,isnull(b.nama,'-') as nama_akun,c.no_aju as no_pj,c.keterangan as ket_pj "+
					   "from it_aju_m a inner join it_aju_m c on a.no_aju=c.no_ptg and a.kode_lokasi=c.kode_lokasi "+					   
					   "	left join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					   
					   "	left join ver_d x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
					   "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.modul);
					this.cb_nik.setText(line.nik_panjar);
					this.cb_panjar.setText(line.no_pj,line.ket_pj);
					this.cb_akun.setText(line.kode_akun,line.nama_akun);					
					this.cb_pp.setText(line.kode_pp);					
					this.e_ket.setText(line.keterangan);
					this.e_nilai.setText(floatToNilai(line.nilai));										
					this.e_nover.setText(line.no_ver);
					this.e_memo.setText(line.catatan);					
				
					var data = this.dbLib.getDataProvider("select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai_pj "+
							   "from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
							   "where a.no_aju='"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.e_nilaipj.setText(floatToNilai(line.nilai_pj));							
						} 
					}
				} 			
			}			
		}		
		if (sender == this.cb_akun) {
			if (this.cb_akun.getText()=="-") {
				this.e_nilai.setText("0");
				this.e_nilai.setReadOnly(true);
			}
			else this.e_nilai.setReadOnly(false);
		}
		if (sender == this.e_nilaipj || sender == this.e_nilai) {
			if (this.e_nilaipj.getText()!="" && this.e_nilai.getText()!="") {
				this.e_nilaikb.setText(floatToNilai(nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_nilai.getText())));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.viewLap) {
								this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanForm";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
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