window.app_saku2_transaksi_kopeg_kbitt_fReimDRKNonSimple = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fReimDRKNonSimple.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fReimDRKNonSimple";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Reimburse IF Non Sub Simple: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,12,222,20],caption:"MTA",tag:2,multiSelection:false,change:[this,"doChange"]});         		
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,13,222,20],caption:"DRK",tag:1,multiSelection:false,change:[this,"doChange"]});         				
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_saldo = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Saldo Budget", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_saldoif = new saiLabelEdit(this,{bound:[368,18,202,20],caption:"Saldo Sub I/F", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"Nominal", tag:1, tipeText:ttNilai, text:"0"});
		this.e_user = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"User input", maxLength:50,tag:2});						
		this.c_status = new saiCB(this,{bound:[20,20,202,20],caption:"Status Pajak",items:["NON","P21","P23"], readOnly:true,tag:2,change:[this,"doChange"]});				
		this.e_npajak = new saiLabelEdit(this,{bound:[20,12,202,20],caption:"Nilai Pajak", tag:0, tipeText:ttNilai, text:"0",visible:false});
		this.e_file = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"File", readOnly:true, tag:0,visible:false});		
		this.uploader = new uploader(this,{bound:[480,15,80,18],visible:false,caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		
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
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			if (this.app._userStatus == "A") this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			else this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21','PPH23','ITHUTIF') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "ITHUTIF") this.akunHutIF = line.flag;								
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;								
					if (line.kode_spro == "PPH23") this.akunPPH23 = line.flag;								
				}
			}
			
			this.cekSaldoIF();
			this.e_user.setText(this.app._namaUser);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fReimDRKNonSimple.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fReimDRKNonSimple.implement({	
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','HUTIF','"+this.akunHutIF+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','"+this.app._userLog+"','-','"+this.app._namaUser+"','HUTIFNONSP','"+this.c_status.getText()+"',"+nilaiToFloat(this.e_npajak.getText())+")");										
					
					var nilaiGar = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_npajak.getText());
					if (this.stsGar == "1") {						
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
								"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.e_saldo.getText())+","+nilaiGar+")");
					}							
					sql.add("insert into it_ifreim_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','D','"+this.e_ket.getText()+"',"+nilaiGar+",'BEBAN')");													
					if (this.c_status.getText() == "P21") var akunPajak = this.akunPPH21; else var akunPajak = this.akunPPH23; 								
					sql.add("insert into it_ifreim_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"','"+akunPajak+"','"+this.cb_pp.getText()+"','-','C','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_npajak.getText())+",'"+this.c_status.getText()+"')");								
															
					if (this.c_status.getText() != "NON") sql.add("insert into it_aju_dok(no_bukti,modul,no_gambar,kode_lokasi)values('"+this.e_nb.getText()+"','IFREIM-S','"+this.e_file.getText()+"','"+this.app._lokasi+"')");
					
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
					this.cekSaldoIF();
					this.c_status.setText("NON");
				break;
			case "simpan" :									
				if (nilaiToFloat(this.e_saldoif.getText()) < nilaiToFloat(this.e_nilai.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi saldo I/F (Sub).");
					return false;						
				}
				if (this.stsGar == "1") {
					if (this.cb_drk.getText() == "-") {
						system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.");
						return false;						
					}
					else {					
						var nilaiGar = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_npajak.getText());
						if (nilaiGar > nilaiToFloat(this.e_saldo.getText())) {
							system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi saldo.");
							return false;						
						}
					}
				}									
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
	},	
	cekSaldoIF:function(sender){
		try {
			var strSQL = "select d.kode_bidang,a.kode_pp,a.nilai-isnull(b.ganti,0)-isnull(c.subif,0)-isnull(e.reimburse,0) as saldo "+
						 "from it_if a inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+						 
						 "					 left join (select a.kode_lokasi,a.nik,sum(b.nilai) as ganti "+
						 "								from it_ifver_m a inner join it_ifaju_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and b.no_aju ='-' "+
						 "								where a.nik='"+this.app._userLog+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
						 "								group by a.nik,a.kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						 "                   left join (select nik_if,kode_lokasi,sum(nilai) as subif from it_if_sub group by kode_lokasi,nik_if) c on a.nik=c.nik_if and a.kode_lokasi=c.kode_lokasi "+
						 "			         left join (select nik_panjar,kode_lokasi,sum(nilai) as reimburse "+
						 "                              from it_aju_m where no_kas='-' and modul='HUTIF' and kode_lokasi='"+this.app._lokasi+"' and nik_panjar='"+this.app._userLog+"' "+
						 "                              group by nik_panjar,kode_lokasi) e on a.nik=e.nik_panjar and a.kode_lokasi=e.kode_lokasi "+
						 "where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_saldoif.setText(floatToNilai(line.saldo));					
					this.cb_pp.setText(line.kode_pp);
					this.kodeBidang = line.kode_bidang;
				}
			}
		}
		catch(e) {alert(e);}
	},
	doChange:function(sender){
		if (sender == this.c_status){
			if (this.c_status.getText() == "NON") {
				this.e_npajak.setTag("9");
				this.e_file.setTag("9");
				this.e_npajak.hide();
				this.e_file.hide();
				this.uploader.hide();
			}
			else {
				this.e_npajak.setTag("0");
				this.e_file.setTag("0");
				this.e_npajak.show();
				this.e_file.show();
				this.uploader.show();
			}
		}
		if ((sender == this.cb_pp ||sender == this.e_periode)  && this.cb_pp.getText() !="" && this.e_periode.getText() !="") {
				this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.cb_pp.getText()+"' and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ 
									"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
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
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
			var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				var sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.e_saldo.setText(floatToNilai(sls));				
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);																
							
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);						
			setTipeButton(tbSimpan);
			this.cekSaldoIF();
			this.c_status.setText("NON");
		} catch(e) {
			alert(e);
		}
	}
});