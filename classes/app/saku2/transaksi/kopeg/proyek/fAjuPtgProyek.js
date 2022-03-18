window.app_saku2_transaksi_kopeg_proyek_fAjuPtgProyek = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fAjuPtgProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fAjuPtgProyek";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar Proyek: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,200,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.c_jenis = new saiCB(this,{bound:[20,11,202,20],caption:"Kode Transaksi",items:["PJPTG"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});								
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"NIK Pemegang",multiSelection:false,change:[this,"doChange"]});
		this.cb_panjar = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"No Panjar",multiSelection:false,change:[this,"doChange"]});
		this.e_nilaipj = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Panjar", tipeText:ttNilai, text:"0", readOnly:true});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,20,220,20],caption:"Bagian / Unit",multiSelection:false});				
		this.cb_id = new portalui_saiCBBL(this,{bound:[20,19,220,20],caption:"ID Project",tag:1,readOnly:true}); 				
		this.e_uraian = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Nama Project", readOnly:true});				
		this.e_nproyek = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai Project", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nor = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Max Beban", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nsaldo = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Saldo Max Beban", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"MTA",multiSelection:false,change:[this,"doChange"]});		
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,20,222,20],caption:"DRK",tag:2,multiSelection:false,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nominal", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_nilaikb = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Kas Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_user = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"User input", maxLength:50});				
		
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
			
			//this.cb_nik.setSQL("select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);									
			this.cb_nik.setSQL("select distinct a.nik,a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			                   "where a.sts_pj='1' and b.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);															
			this.cb_nik.setText(this.app._userLog);
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('045') and a.kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);									
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.c_jenis.setText("PJPTG");
			this.e_user.setText(this.app._namaUser);
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fAjuPtgProyek.extend(window.childForm);
window.app_saku2_transaksi_kopeg_proyek_fAjuPtgProyek.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update it_aju_m set progress='4', no_ptg='"+this.e_nb.getText()+"' where no_aju='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,sts_pajak) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','A','"+this.cb_nik.getText()+"','"+this.cb_panjar.getText()+"','"+this.e_user.getText()+"','NON')");
					
					var nilaiPJ = nilaiToFloat(this.e_nilaipj.getText()) * -1;
					sql.add("insert into pr_beban_d(no_aju,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,no_proyek,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunPJ+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiPJ+",getdate(),'"+this.cb_id.getText()+"','PANJARREV')");							
					sql.add("insert into pr_beban_d(no_aju,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,no_proyek,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.cb_id.getText()+"','PJPTG')");							
					if (this.stsGar == "1") {
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
								"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.e_nilai.getText())+")");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.c_jenis.setText("PJPTG");
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_nilaipj.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai pertanggungan melebihi nilai panjar.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_nsaldo.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo OR.");
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
	},
	doClick:function(sender){
		//this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.e_periode.getText().substr(2,2)+".","00000"));
		//this.cb_nik.setFocus();
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
	},
	doChange:function(sender){
		if (sender == this.cb_nik || this.cb_nik.getText()!="") {									
			this.cb_panjar.setSQL("select a.no_aju,a.keterangan from it_aju_m a inner join pr_beban_d c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi and c.modul='PANJAR' where a.progress='3' and a.nik_panjar ='"+this.cb_nik.getText()+"' and a.modul = 'PANJAR' and a.no_ptg='-' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_aju","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Panjar",true);
		}
		if (sender == this.cb_panjar || this.cb_panjar.getText()!="") {
			var data = this.dbLib.getDataProvider("select b.kode_pp,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai_pj,c.no_proyek,d.no_dokumen,d.keterangan,b.kode_akun "+
			           "from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
					   "   				inner join pr_beban_d c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi and c.modul='PANJAR' "+
					   "   			    inner join pr_proyek_m d on c.no_proyek=d.no_proyek and c.kode_lokasi=d.kode_lokasi "+
					   "where a.no_aju='"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by b.kode_pp,c.no_proyek,d.no_dokumen,d.keterangan,b.kode_akun",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																			
					this.e_nilaipj.setText(floatToNilai(line.nilai_pj));
					this.cb_pp.setText(line.kode_pp);
					this.cb_id.setText(line.no_proyek,line.no_dokumen);
					this.e_uraian.setText(line.keterangan);
					this.akunPJ = line.kode_akun;
				} 
			}			
			var strSQL = "select a.nilai,a.nilai_or,a.nilai_or-isnull(b.beban,0) as saldo "+
						 "from pr_proyek_m a "+
						 "  left join (select no_proyek,kode_lokasi,sum(nilai) as beban from pr_beban_d where no_proyek='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_aju<>'"+this.cb_panjar.getText()+"' group by no_proyek,kode_lokasi) b on a.no_proyek=b.no_proyek and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_proyek = '"+this.cb_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];								
				this.e_nproyek.setText(floatToNilai(line.nilai));				
				this.e_nor.setText(floatToNilai(line.nilai_or));				
				this.e_nsaldo.setText(floatToNilai(line.saldo));								
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
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {
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
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});