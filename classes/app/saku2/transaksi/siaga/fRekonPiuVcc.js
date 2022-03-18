window.app_saku2_transaksi_siaga_fRekonPiuVcc = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fRekonPiuVcc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fRekonPiuVcc";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekon Piutang VCC", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.cb_bukti = new saiCBBL(this,{bound:[20,13,250,20],caption:"No KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});					
				
		this.pc1 = new pageControl(this,{bound:[20,12,980,400], childPage:["Data Pelunasan"]});				
		this.cb_inv = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,240,20],caption:"Bukti Invoice", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});					
		this.e_atensi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Terima Dari", readOnly:true});						
		this.e_akunar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Akun Piutang", readOnly:true});									
		this.e_saldo= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Saldo Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilai= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Nilai KasBank", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_pph= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,200,20],caption:"Nilai PPh", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_lain= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,26,200,20],caption:"Nilai Lain", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_total= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,24,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.cb_pph = new saiCBBL(this.pc1.childPage[0],{bound:[20,25,220,20],caption:"Akun PPh", multiSelection:false, maxLength:3, tag:2,change:[this,"doChange"]});
		this.cb_lain = new saiCBBL(this.pc1.childPage[0],{bound:[20,27,220,20],caption:"Akun Lain", multiSelection:false, maxLength:3, tag:2,change:[this,"doChange"]});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"No Memo", readOnly:true,text:"-"});									
		
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

			this.cb_pph.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='015' "+
							   "where a.kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun PPh",true);			
			this.cb_lain.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag not in ('001','009') "+
							   "where a.kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun PPh",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fRekonPiuVcc.extend(window.childForm);
window.app_saku2_transaksi_siaga_fRekonPiuVcc.implement({
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

					var pphLain = nilaiToFloat(this.e_pph.getText()) + nilaiToFloat(this.e_lain.getText());				

					sql.add("insert into gr_vccbayar_d(no_bukti,kode_lokasi,no_invoice,akun_piutang,nilai_kas,nilai_lain,periode,dc,modul,akun_pph,akun_lain) values "+
							"('"+this.cb_bukti.getText()+"','"+this.app._lokasi+"','"+this.cb_inv.getText()+"','"+this.akunAR+"',"+parseNilai(this.e_nilai.getText())+","+pphLain+",'"+this.periodeKas+"','D','"+this.modul+"','"+this.cb_pph.getText()+"','"+this.cb_lain.getText()+"')");
					
					//pph dijurnal ke ju		
					if (this.e_pph.getText()!="0" || this.e_lain.getText()!="0") {						
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

						sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_bukti.getText()+"','Penyelesaian atas Invoice : "+this.cb_inv.getText()+"','-','REKVCC','JU','IDR',1,"+pphLain+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','"+this.cb_inv.getText()+"',getdate(),'"+this.app._userLog+"')");		
								
						if (this.e_pph.getText()!="0") {			
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_pph.getText()+"','PPh atas Invoice : "+this.cb_inv.getText()+"','D',"+parseNilai(this.e_pph.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','REKVCC','PPH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunAR+"','Penyelesaian atas Invoice : "+this.cb_inv.getText()+"','C',"+parseNilai(this.e_pph.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','REKVCC','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
						}
						if (this.e_lain.getText()!="0") {			
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.cb_lain.getText()+"','Penyelesaian atas Invoice : "+this.cb_inv.getText()+"','D',"+parseNilai(this.e_lain.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','REKVCC','LAIN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.akunAR+"','Penyelesaian atas Invoice : "+this.cb_inv.getText()+"','C',"+parseNilai(this.e_lain.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','REKVCC','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
						}

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
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
					this.e_nb.setText("-");		
				break;
			case "simpan" :													
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.e_pph.getText()!="0" && this.cb_pph.getText()=="-") {
					system.alert(this,"Transaksi tidak valid.","Akun PPh tidak boleh - / strip.");
					return false;						
				}
				if (this.e_lain.getText()!="0" && this.cb_lain.getText()=="-") {
					system.alert(this,"Transaksi tidak valid.","Akun Lain tidak boleh - / strip.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh melebihi saldo.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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

		this.cb_bukti.setSQL("select no_kas, keterangan from kas_m where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							 "union "+
							 "select no_ju, keterangan from ju_m where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
							 ["no_kas","keterangan"],false,["No Bukti","Keterangan"],"and","Daftar Bukti",true);	
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.cb_inv.setSQL("select a.no_invoice, a.nama_cust from gr_vcc_d a "+
			                   "       left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_vccbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
							   "where a.total>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_invoice","a.nama_cust"],false,["No Invoice","Customer"],"and","Daftar Bukti",true);
		}		
		if (sender == this.cb_inv && this.cb_inv.getText()!="") {			
			var data = this.dbLib.getDataProvider("select a.nama_cust,a.total-isnull(c.bayar,0) as total,a.akun_piutang,a.akun_piutang + ' - '+b.nama as nama "+
			           "from gr_vcc_d a inner join masakun b on a.akun_piutang=b.kode_akun and b.kode_lokasi = a.kode_lokasi "+
					   "                 left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_vccbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_atensi.setText(line.nama_cust);					
					this.e_saldo.setText(floatToNilai(line.total));			
					this.e_nilai.setText(floatToNilai(line.total));			
					this.e_akunar.setText(line.nama);										
					this.akunAR = line.akun_piutang;
				} 
			}			
		}	

		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {	
			this.modul = "";
			var data = this.dbLib.getDataProvider("select periode from kas_m where no_kas='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.periodeKas = line.periode;
					this.modul = "KB";
				} 
			}

			if (this.modul == "") {
				var data = this.dbLib.getDataProvider("select periode from ju_m where no_ju='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.periodeKas = line.periode;
						this.modul = "JU";
					} 
				}
			}
		}

		if ((sender == this.e_nilai || sender == this.e_pph || sender == this.e_lain) && this.e_nilai.getText()!="" && this.e_pph.getText()!="" && this.e_lain.getText()!="") {
			var total = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_pph.getText()) + nilaiToFloat(this.e_lain.getText());
			this.e_total.setText(floatToNilai(total));
		}

		if (sender == this.cb_pph || sender == this.cb_lain) {
			if (this.cb_pph.getText() == "-" && this.cb_lain.getText() == "-") {
				this.e_nb.setText("-");
			}
			else  {
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
			}
		}	

	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb_pph.getText()!="-" || this.cb_lain.getText()!="-") {									
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
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
			this.e_nb.setText("-");				
		} catch(e) {
			alert(e);
		}
	}
});