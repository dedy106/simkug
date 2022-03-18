window.app_saku2_transaksi_kopeg_kb_fKbDual = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kb_fKbDual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kb_fKbDual";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Umum Dual Akun: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.c_jenis = new saiCB(this,{bound:[20,12,202,20],caption:"Jenis",items:["CK","BK","CD","BD"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,202,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_bank = new saiCBBL(this,{bound:[20,14,202,20],caption:"Kas/Bank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_buat = new saiCBBL(this,{bound:[20,15,202,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});						
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		this.cb_jurnal = new saiCBBL(this,{bound:[20,15,222,20],caption:"Referensi", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0"});				
		
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
			
			this.cb_jurnal.setSQL("select kode_jurnal, nama from refju_dual where modul='KB' and kode_lokasi='"+this.app._lokasi+"'",["kode_jurnal","nama"],false,["Kode","Nama"],"and","Data Referensi",true);			
			
			this.cb_cabang.setSQL("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_cabang","b.nama"],false,["Kode","Nama"],"and","Data Cabang",true);
			this.cb_bank.setSQL("select kode_bank, nama from gr_bank where kode_lokasi='"+this.app._lokasi+"'",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);									
			this.cb_bank.setText("KAS");
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");						
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");		
			
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
			
			this.c_jenis.setText("CK");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kb_fKbDual.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kb_fKbDual.implement({	
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
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.akunKB+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','KBDUAL','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.kodeDRK+"','"+this.cb_bank.getText()+"')");
										
					if (this.akunDebet == this.akunKB) var kodebank = this.cb_bank.getText(); else var kodebank = "-";
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunDebet+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodePP+"','"+this.kodeDRK+"','-','-','"+this.app._lokasi+"','KBDUAL','DEBET','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+kodebank+"',"+nilaiToFloat(this.e_nilai.getText())+")");					
					if (this.akunKredit == this.akunKB) var kodebank = this.cb_bank.getText(); else var kodebank = "-";
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunKredit+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodePP+"','"+this.kodeDRK+"','-','-','"+this.app._lokasi+"','KBDUAL','KREDIT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+kodebank+"',"+nilaiToFloat(this.e_nilai.getText())+")");					
							
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"	('"+this.e_nb.getText()+"','KBDUAL','"+this.app._lokasi+"','"+this.akunDebet+"','"+this.kodePP+"','"+this.kodeDRK+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.e_nilai.getText())+")");
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"	('"+this.e_nb.getText()+"','KBDUAL','"+this.app._lokasi+"','"+this.akunKredit+"','"+this.kodePP+"','"+this.kodeDRK+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',0,"+nilaiToFloat(this.e_nilai.getText())+")");							
					
					if (this.flagFAGL == "1") {
						sql.add("insert into gl_fa_asset (no_fa,kode_lokasi,kode_pp,kode_klpakun,umur,persen,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,progress,tgl_perolehan,periode,tgl_susut,periode_susut,nik_user,tgl_input,kode_akun,kode_pp_susut,nilai_susut,no_ref) "+
							"select case when len(cast(no_urut as varchar)) = 1 then  a.no_kas + '-00'+cast(no_urut as varchar)  "+
							"            when len(cast(no_urut as varchar)) = 2 then  a.no_kas + '-0'+cast(no_urut as varchar)  "+
							"            when len(cast(no_urut as varchar)) = 3 then  a.no_kas + '-'+cast(no_urut as varchar) end "+
							",'"+this.app._lokasi+"',a.kode_pp,b.kode_klpakun,b.umur,b.persen,a.keterangan,'IDR',1,a.nilai,1,b.kode_drk,'2','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),a.kode_akun,'"+this.ppFA+"',case when b.umur = 0 then 0 else round(a.nilai/b.umur,0) end as susut,'"+this.e_nb.getText()+"' "+
							"from kas_j a inner join fa_klpakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ") ;
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.akunKB = "-";
				if (this.c_jenis.getText() == "CD" || this.c_jenis.getText() == "BD") {
					var data = this.dbLib.getDataProvider("select kode_flag from flag_relasi where kode_akun='"+this.akunDebet+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){										
							if (line.kode_flag == "001" || line.kode_flag == "009") this.akunKB = this.akunDebet;
						} 
					}
				}
				else {
					var data = this.dbLib.getDataProvider("select kode_flag from flag_relasi where kode_akun='"+this.akunKredit+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){										
							if (line.kode_flag == "001" || line.kode_flag == "009") this.akunKB = this.akunKredit;
						} 
					}			
				}
				if (this.akunKB == "-"){
					system.alert(this,"Transaksi tidak valid.","Tidak ditemukan akun kasbank dalam referensi yang sesuai jenis transaksi.");
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}
		this.doClick();
	},
	doClick:function(sender){
		if (this.c_jenis.getText()!= "" && this.cb_cabang.getText()!= "" && this.cb_bank.getText()!= "") {			
			var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/"+this.cb_cabang.getText()+"/";			
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_kas,3,20)),0) as no_kas from kas_m where no_kas like '_____"+AddFormat+"%"+this.cb_bank.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_kas == "0") this.e_nb.setText(this.c_jenis.getText()+"001"+AddFormat+this.cb_bank.getText());
					else {
						var idx = parseFloat(line.no_kas.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(this.c_jenis.getText()+nu+AddFormat+this.cb_bank.getText());
					}
				} 
			}
			this.cb_jurnal.setFocus();
		}		
	},
	doChange:function(sender){
		if (sender == this.c_jenis || sender == this.cb_cabang || sender == this.cb_bank) {
			this.doClick();				
		}		
		if (sender == this.cb_jurnal && this.cb_jurnal.getText()!="") {
			var data = this.dbLib.getDataProvider("select keterangan,akun_debet,akun_kredit,nilai,kode_pp,kode_drk from refju_dual where kode_jurnal='"+this.cb_jurnal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.e_ket.setText(line.keterangan);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.akunDebet = line.akun_debet;
					this.akunKredit = line.akun_kredit;
					this.kodePP = line.kode_pp;
					this.kodeDRK = line.kode_drk;					
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
							this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});