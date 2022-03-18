window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgLokDRK2E = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgLokDRK2E.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuPtgLokDRK2E";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar Operasional DRK: Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No Agenda", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.c_jenis = new saiCB(this,{bound:[20,12,202,20],caption:"Kode Transaksi",items:["PJPTG"], readOnly:true,tag:2,visible:false});		
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,13,222,20],caption:"NIK Pemegang",readOnly:true});
		this.cb_panjar = new portalui_saiCBBL(this,{bound:[20,14,222,20],caption:"No Panjar",readOnly:true});
		this.e_nilaipj = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Nilai Panjar", tipeText:ttNilai, text:"0", readOnly:true, change:[this,"doChange"]});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,19,222,20],caption:"Bagian / Unit",readOnly:true});		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"MTA",readOnly:true});		
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,13,222,20],caption:"DRK",readOnly:true});         				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_saldo = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Saldo Budget", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"Nominal", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_nilaikb = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Kas Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
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
			
			//this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);									
			//this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);			
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgLokDRK2E.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgLokDRK2E.implement({	
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
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");
					sql.add("delete from angg_r where no_bukti = '"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='R-KBAJUDRK'");
					
					sql.add("update it_aju_m set progress='4', no_ptg='"+this.e_nb.getText()+"' where no_aju='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_bukti,'R-KBAJUDRK',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,case dc when 'D' then 'C' else 'D' end,0,nilai "+
							"from angg_r where no_bukti='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");
							
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,sts_pajak,npajak,nik_app,form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','"+this.cb_nik.getText()+"','"+this.cb_panjar.getText()+"','NON',0,'"+this.cb_app.getText()+"','SINGLE')");
					if (this.stsGar == "1") {
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
								"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.periodeAju+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.e_saldo.getText())+","+nilaiToFloat(this.e_nilai.getText())+")");
					}
					
					var netto = nilaiToFloat(this.e_nilaikb.getText());
					sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','-',"+netto+",'-')");
							
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
				if (nilaiToFloat(this.e_nilaikb.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pertanggungan melebihi nilai panjar.");
					return false;						
				}
				if (this.stsGar == "1") {
					if (this.cb_drk.getText() == "-") {
						system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.");
						return false;						
					}
					else {
						if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
							
							//nonceksaldobudget
							this.dataAkunNonCek = {rs:{rows:[]}};
							var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag = '053' and kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								this.dataAkunNonCek = data;
							}
							
							var temu = false;
							for (var j=0;j<this.dataAkunNonCek.rs.rows.length;j++){
								line = this.dataAkunNonCek.rs.rows[j];							
								if (line.kode_akun == this.cb_akun.getText()) {		
									temu = true;
								}
							}
							
							if (!temu) {
								system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi saldo.");
								return false;						
							}
							
						}
					}
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
				this.viewLap = false;				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update it_aju_m set progress='3', no_ptg='-' where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");
				sql.add("delete from angg_r where no_bukti = '"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='R-KBAJUDRK'");
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
		//this.cb_drk.setSQL("select kode_drk, nama from drk where tahun='"+this.e_periode.getText().subst(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {						
			if (this.app._userStatus == "A") this.e_nb.setSQL("select no_aju, keterangan from it_aju_m where form not in ('PTGMULTI','PRPJPTG','PTGMULTIBD') and modul='PJPTG' and progress in ('A','0','R') and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_aju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			else //this.e_nb.setSQL("select no_aju, keterangan from it_aju_m where form not in ('PTGMULTI','PRPJPTG','PTGMULTIBD') and kode_pp='"+this.app._kodePP+"' and modul='PJPTG' and progress in ('A','0','R') and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_aju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			this.e_nb.setSQL("select a.no_aju, a.keterangan from it_aju_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.form not in ('PTGMULTI','PRPJPTG','PTGMULTIBD') and a.modul='PJPTG' and a.progress in ('A','0','R') and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["no_aju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.nik_app,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,a.kode_pp,e.nama as nama_pp,a.nik_panjar,a.kode_drk,isnull(d.nama,'-') as nama_drk,isnull(x.no_kpa,'-') as no_ver,isnull(x.catatan,'-') as catatan,a.kode_akun,isnull(b.nama,'-') as nama_akun,c.no_aju as no_pj,c.keterangan as ket_pj "+
					   "from it_aju_m a inner join it_aju_m c on a.no_aju=c.no_ptg and a.kode_lokasi=c.kode_lokasi "+					   
					   "    inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+
					   "	left join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					   
					   "	left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+					   
					   "    left join (select a.no_kpa,a.no_bukti,a.kode_lokasi,a.catatan "+
					   "              from kpa_d a inner join kpa_m b on a.no_kpa=b.no_kpa and a.kode_lokasi=b.kode_lokasi "+
					   "              where b.no_kpaseb='-' and b.kode_lokasi='"+this.app._lokasi+"') x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
					   "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.modul);
					this.cb_app.setText(line.nik_app);
					this.cb_nik.setText(line.nik_panjar);
					this.cb_panjar.setText(line.no_pj,line.ket_pj);
					this.cb_akun.setText(line.kode_akun,line.nama_akun);					
					this.cb_pp.setText(line.kode_pp,line.nama_pp);					
					this.cb_drk.setText(line.kode_drk,line.nama_drk);					
					this.e_ket.setText(line.keterangan);
					this.e_nilai.setText(floatToNilai(line.nilai));										
					this.e_nover.setText(line.no_ver);
					this.e_memo.setText(line.catatan);					
				
					var data = this.dbLib.getDataProvider("select b.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai_pj "+
							   "from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
							   "where a.no_aju='"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by b.periode",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.e_nilaipj.setText(floatToNilai(line.nilai_pj));							
							this.periodeAju = line.periode;
						} 
					}						
					var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.stsGar = line.status_gar;
						} 
						else this.stsGar = "0";
					}	
					var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.periodeAju+"','"+this.cb_panjar.getText()+"') as gar ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];
						data = line.gar.split(";");
						var sls = parseFloat(data[0]) - parseFloat(data[1]) + nilaiToFloat(this.e_nilai.getText());
						this.e_saldo.setText(floatToNilai(sls));				
					}
				} 			
			}			
		}		
		/*
		if (sender == this.cb_akun) {
			if (this.cb_akun.getText()=="-") {
				this.e_nilai.setText("0");
				this.e_nilai.setReadOnly(true);
			}
			else this.e_nilai.setReadOnly(false);
		}
		*/
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
								this.nama_report="server_report_saku2_kopeg_kbitt_rptPtgFormTu";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText()+"/";
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