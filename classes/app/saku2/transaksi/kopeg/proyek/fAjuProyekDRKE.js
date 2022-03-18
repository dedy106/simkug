window.app_saku2_transaksi_kopeg_proyek_fAjuProyekDRKE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fAjuProyekDRKE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fAjuProyekDRKE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Beban Project: Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.c_jenis = new saiCB(this,{bound:[20,12,202,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2,visible:false});		
		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"Bagian / Unit",tag:1,readOnly:true}); 				
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"MTA",tag:2,multiSelection:false});         		
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"DRK",tag:2,multiSelection:false}); 			
		
		this.cb_id = new portalui_saiCBBL(this,{bound:[20,19,220,20],caption:"ID Project",readOnly:true}); 				
		this.e_uraian = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Nama Project", readOnly:true});				
		this.e_nproyek = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai Project", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nor = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Max Beban", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nsaldo = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Saldo Max Beban", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nominal", tag:1, tipeText:ttNilai, text:"0"});
		this.e_user = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"User input", maxLength:50});				

		this.e_namarek = new saiLabelEdit(this,{bound:[20,17,550,20],caption:"Nama Rekening", maxLength:50});
		this.e_norek = new saiLabelEdit(this,{bound:[20,18,550,20],caption:"No Rekening", maxLength:50});
		this.e_bank = new saiLabelEdit(this,{bound:[20,19,550,20],caption:"Bank - Cabang", maxLength:100});
		
		this.e_nover = new saiLabelEdit(this,{bound:[20,15,550,20],caption:"No Verifikasi", tag:9, readOnly:true});										
		this.e_memo = new saiMemo(this,{bound:[20,12,550,80],caption:"Catatan",tag:9, readOnly:true});
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
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('045') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);									
			//this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							"where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fAjuProyekDRKE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_proyek_fAjuProyekDRKE.implement({	
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
					sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from pr_beban_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");										
					
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','A','-','-','"+this.e_user.getText()+"','PROYEK','NON')");					
					sql.add("insert into pr_beban_d(no_aju,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,no_proyek,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.cb_id.getText()+"','BEBAN')");
					
					if (this.stsGar == "1") {						
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
								"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.e_nilai.getText())+")");
					}
					
					var netto = nilaiToFloat(this.e_nilai.getText());
					sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','-',"+netto+",'-')");
							
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
				this.c_jenis.setText("UMUM");
				this.viewLap = true;				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_nsaldo.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo OR.");
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
				this.viewLap = false;				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from pr_beban_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");										
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
			this.e_nb.setSQL("select no_aju, keterangan from it_aju_m where form = 'PROYEK' and modul='UMUM' and progress in ('0','A','R') and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_aju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select aa.no_proyek,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,a.kode_pp,a.kode_akun,a.kode_drk,isnull(x.no_ver,'-') as no_ver,isnull(x.catatan,'-') as catatan,a.user_input,a.kode_drk, "+
					   "r.bank,r.no_rek,r.nama_rek "+
					   "from it_aju_m a inner join pr_beban_d aa on a.no_aju=aa.no_aju and a.kode_lokasi=aa.kode_lokasi and aa.modul='BEBAN' "+
					   "inner join it_aju_rek r on a.no_aju=r.no_aju and a.kode_lokasi=r.kode_lokasi "+
					   "left join ver_d x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
					   "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.modul);
					this.cb_akun.setText(line.kode_akun);
					this.cb_pp.setText(line.kode_pp);					
					this.cb_drk.setText(line.kode_drk);					
					this.e_ket.setText(line.keterangan);
					this.e_nilai.setText(floatToNilai(line.nilai));										
					this.e_user.setText(line.user_input);
					this.e_nover.setText(line.no_ver);
					
					this.e_bank.setText(line.bank);					
					this.e_norek.setText(line.no_rek);					
					this.e_namarek.setText(line.nama_rek);					
					
					this.e_memo.setText(line.catatan);					
					//this.cb_id.setSQL("select no_proyek, no_dokumen from pr_proyek_m where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_proyek","no_dokumen"],false,["ID Project","No Dokumen"],"and","Data Project",true);												
					this.cb_id.setSQL("select no_proyek, no_dokumen from pr_proyek_m where kode_lokasi='"+this.app._lokasi+"'",["no_proyek","no_dokumen"],false,["ID Project","No Dokumen"],"and","Data Project",true);												

					this.cb_id.setText(line.no_proyek);
				} 
			}
			var strSQL = "select a.keterangan,a.nilai,a.nilai_or,a.nilai_or-isnull(b.beban,0) as saldo "+
						 "from pr_proyek_m a inner join pr_beban_d aa on a.no_proyek=aa.no_proyek and a.kode_lokasi=aa.kode_lokasi and aa.modul='BEBAN' "+
						 "  left join (select no_proyek,kode_lokasi,sum(nilai) as beban from pr_beban_d where no_proyek='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_aju<>'"+this.e_nb.getText()+"' group by no_proyek,kode_lokasi) b on a.no_proyek=b.no_proyek and a.kode_lokasi=b.kode_lokasi "+
						 "where aa.no_aju = '"+this.e_nb.getText()+"' and aa.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];								
				this.e_nproyek.setText(floatToNilai(line.nilai));				
				this.e_nor.setText(floatToNilai(line.nilai_or));				
				this.e_nsaldo.setText(floatToNilai(line.saldo));				
				this.e_uraian.setText(line.keterangan);				
			}
		}		
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {
			this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);											
			var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.stsGar = line.status_gar;
				} 
			}
			if (this.stsGar == "1") this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);											
			else this.cb_drk.setSQL("select '-' as kode_drk, '-' as nama ",["kode_drk","nama"],false,["Kode","Nama"],"where","Data DRK",true);											
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu2";
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