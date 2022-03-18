window.app_saku2_transaksi_siaga_fPiutangBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fPiutangBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fPiutangBatal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Piutang: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
				
		this.pc1 = new pageControl(this,{bound:[20,12,980,280], childPage:["Data Piutang"]});				
		this.cb_cust = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,240,20],caption:"Customer", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});					
		this.cb_inv = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,240,20],caption:"Bukti Invoice", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.e_akunar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Akun Piutang", readOnly:true});									
		this.c_curr = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,140,20],caption:"Mt Uang - Kurs", tag:0, readOnly:true, text:"IDR",change:[this,"doChange"]});				
		this.e_kursar = new saiLabelEdit(this.pc1.childPage[0],{bound:[170,19,50,20],caption:"", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",tag:2});		
		this.e_saldo= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Saldo Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);

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
						
			this.cb_cust.setSQL("select kode_cust, nama from gr_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");			
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fPiutangBatal.extend(window.childForm);
window.app_saku2_transaksi_siaga_fPiutangBatal.implement({
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
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','-','PIUBTL','PIUBTL','IDR',1,"+parseNilai(this.e_saldo.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','-','-',getdate(),'"+this.app._userLog+"')");							
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) "+
							"select '"+this.e_nb.getText()+"',no_piutang,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,'"+this.e_ket.getText()+"',case dc when 'D' then 'C' else 'D' end,nilai,kode_pp,kode_drk,'-','-','-','-','-','-',kode_lokasi,'PIUBTL','PIUBTL','"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from gr_piutang_j where no_piutang='"+this.cb_inv.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into gr_piutangbayar_d(no_bukti,kode_lokasi,no_piutang,akun_piutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_inv.getText()+"','"+this.akunAR+"',0,"+parseNilai(this.e_saldo.getText())+",0,'"+this.e_periode.getText()+"','D','BTL','"+this.c_curr.getText()+"',"+parseNilai(this.e_kursar.getText())+")");					
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
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :						
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_saldo.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Saldo tidak boleh nol atau kurang.");
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
		this.doClick();		
	},
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.cb_cust) {
			if (this.cb_cust.getText()!="" && this.e_periode.getText()!="" ) {
				this.cb_inv.setSQL("select a.no_piutang,a.no_dokumen, a.keterangan from gr_piutang_m a "+
								   "       left join (select no_piutang,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_piutangbayar_d group by no_piutang,kode_lokasi ) c on a.no_piutang=c.no_piutang and a.kode_lokasi=c.kode_lokasi "+
								   "where a.kode_cust='"+this.cb_cust.getText()+"' and a.nilai_curr>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
								   ["a.no_piutang","a.no_dokumen","a.keterangan"],false,["No Bukti","No Dokumen","Keterangan"],"and","Daftar Bukti",true);
			}
		}															
		if (sender == this.cb_inv && this.cb_inv.getText()!="") {			
			var data = this.dbLib.getDataProvider("select a.nilai_curr-isnull(c.bayar,0) as total,a.akun_piutang,a.akun_piutang + ' - '+b.nama as nama,a.kode_curr,a.kurs "+
			           "from gr_piutang_m a inner join masakun b on a.akun_piutang=b.kode_akun and b.kode_lokasi = a.kode_lokasi "+
					   "                    left join (select no_piutang,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_piutangbayar_d group by no_piutang,kode_lokasi ) c on a.no_piutang=c.no_piutang and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_piutang='"+this.cb_inv.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_saldo.setText(floatToNilai(line.total));								
					this.e_akunar.setText(line.nama);										
					this.akunAR = line.akun_piutang;					
					this.c_curr.setText(line.kode_curr);
					this.e_kursar.setText(floatToNilai(line.kurs));										
				} 
			}			
		}		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {									
			var AddFormat = "/"+this.Aperiode+"/MEMO/"+this.e_periode.getText().substr(2,2);					
			var data = this.dbLib.getDataProvider("select isnull(max(no_ju),0) as no_ju from ju_m where no_ju like '___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_ju == "0") this.e_nb.setText("001"+AddFormat);
					else {
						var idx = parseFloat(line.no_ju.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(nu+AddFormat);						
					}
				} 
			}
			this.e_ket.setFocus();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku2_siaga_rptPiutangBatalJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
							this.pc1.hide();							
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
				this.pc1.show();   
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
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);			
		} catch(e) {
			alert(e);
		}
	}
});