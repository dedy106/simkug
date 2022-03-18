window.app_saku2_transaksi_siaga_fKbKurs = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKbKurs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fKbKurs";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Selisih Kurs: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["MC"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_bank = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kas/Bank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.cb_akun = new saiCBBL(this,{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.c_curr = new saiLabelEdit(this,{bound:[20,20,140,20],caption:"Mt Uang - Kurs", tag:1, readOnly:true, change:[this,"doChange"]});						
		this.e_kurs = new saiLabelEdit(this,{bound:[170,20,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.i_hitung = new portalui_imageButton(this,{bound:[245,20,20,20],hint:"Hitung Selisih",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		
		this.e_saldocurr = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Saldo Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_saldoidr = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Saldo IDR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_selisih = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Selisih (IDR-Curr)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.dataAkun = this.app._masakun;
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setText("MC");
						
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_curr<>'IDR' and b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			this.cb_cabang.setSQL("select kode_cabang, nama from gr_cabang where kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Cabang",true);
			this.cb_bank.setSQL("select kode_bank, nama from gr_bank where kode_lokasi='"+this.app._lokasi+"'",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			this.cb_bank.setText("KAS");
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}				
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");	
						
			this.c_curr.setText("USD");
			
			this.flagAkunKB = "0"; this.flagGarFree = "0"; this.flagDokFree = "0"; 
			this.akunLKurs = ""; this.akunRKurs = "";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LKURS','RKURS','JUAKUNKB','GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "JUAKUNKB") this.flagAkunKB = line.flag;
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
					if (line.kode_spro == "LKURS") this.akunLKurs = line.flag;			
					if (line.kode_spro == "RKURS") this.akunRKurs = line.flag;			
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fKbKurs.extend(window.childForm);
window.app_saku2_transaksi_siaga_fKbKurs.implement({
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','KBMC','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"','"+nilaiToFloat(this.e_kurs.getText())+"',"+nilaiToFloat(this.e_selisih.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_bank.getText()+"')");
					
					if (nilaiToFloat(this.e_selisih.getText())<0) {
						var DCkb = "D";
						var DCsk = "C";
						var akunSK = this.akunLKurs;
					}
					else {
						var DCkb = "C";
						var DCsk = "D";
						var akunSK = this.akunRKurs;
					}								
					var n_sls = Math.abs(nilaiToFloat(this.e_selisih.getText()));
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','"+DCkb+"',"+n_sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBMC','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',0)");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+akunSK+"','"+this.e_ket.getText()+"','"+DCsk+"',"+n_sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBMC','SLSKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',0)");
										
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
					this.c_curr.setText("USD");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_selisih.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai selisih tidak boleh nol.");
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
				else this.simpan();
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
		var sql = new server_util_arrayList();			
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' ");
		this.dbLib.getMultiDataProviderA(sql);		
		this.doClick(this.i_gen);
		this.doChange(this.c_curr);
	},	
	doChange:function(sender){
		if (sender == this.c_jenis || sender == this.cb_cabang || sender == this.cb_bank) {
			this.doClick(this.i_gen);
		}						
		if (sender == this.cb_akun && this.cb_akun.getText()!="") {
			var strSQL = "select kode_curr from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";							 			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) {
					this.c_curr.setText(line.kode_curr);										
				}
			}
			var strSQL = "select kurs from gr_kurs where kode_curr ='"+this.c_curr.getText()+"' and ('"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir) ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));
				else this.e_kurs.setText("0");					
			}							
		}		
		if (sender == this.e_kurs) {
			this.e_saldocurr.setText("0");
			this.e_saldoidr.setText("0");
			this.e_selisih.setText("0");
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
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
				this.e_ket.setFocus();
			}
		}
		else {
			if (this.cb_akun.getText()!="" && this.e_kurs.getText()!="" && this.e_kurs.getText()!="0") {
				var strSQL = "select "+					 
						 "round(isnull(a.so_akhir_curr,0) + isnull(b.mutasi_curr,0),2) as sak_curr, "+					 
						 "round(isnull(a.so_akhir,0) + isnull(b.mutasi,0),0)  as sak, "+
						 "round((isnull(a.so_akhir,0) + isnull(b.mutasi,0)) - ("+nilaiToFloat(this.e_kurs.getText())+" * (isnull(a.so_akhir_curr,0) + isnull(b.mutasi_curr,0))) ,0) as sls "+
						 "from masakun c left join glma a on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and a.periode = '"+this.e_periode.getText().substr(0,4)+"01' "+
						 "left join ( "+
						 "     select kode_akun,kode_lokasi, "+
						 "     sum(case dc when 'D' then nilai_curr else -nilai_curr end) as mutasi_curr, "+
						 "     sum(case dc when 'D' then nilai else -nilai end) as mutasi "+
						 "     from kas_j where periode between '"+this.e_periode.getText().substr(0,4)+"01' and '"+this.e_periode.getText()+"' "+
						 "     group by kode_akun,kode_lokasi "+
						 ") b on c.kode_akun=b.kode_akun and c.kode_lokasi=b.kode_lokasi "+
						 "where c.kode_akun='"+this.cb_akun.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'";							 							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {							
						this.e_saldocurr.setText(floatToNilai(line.sak_curr));					
						this.e_saldoidr.setText(floatToNilai(line.sak));					
						this.e_selisih.setText(floatToNilai(line.sls));					
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
							this.nama_report="server_report_saku2_siaga_rptBuktiMc";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
							this.filter2 = this.app._namaUser;
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
			this.c_curr.setText("USD");
		} catch(e) {
			alert(e);
		}
	}
});