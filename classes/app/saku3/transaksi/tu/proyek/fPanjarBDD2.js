window.app_saku3_transaksi_tu_proyek_fPanjarBDD2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fPanjarBDD2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fPanjarBDD2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Panjar Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
	
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,500,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"Kode Transaksi",items:["PANJAR"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});						
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,222,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 
		this.cb_id = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,222,20],caption:"ID Project",tag:1,multiSelection:false,change:[this,"doChange"]}); 						
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,222,20],caption:"Akun BDD",tag:1, readOnly:true,visible:false}); 		
		this.e_uraian = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Deskripsi Proyek", readOnly:true});				
		this.e_nproyek = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,202,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nor = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,202,20],caption:"Nilai Max OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nsaldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,202,20],caption:"Saldo OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_saldoBMHD = new saiLabelEdit(this.pc2.childPage[0],{bound:[370,19,200,20],caption:"Saldo BMHD", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				

		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,222,20],caption:"NIK Panjar",tag:2,multiSelection:false});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,202,20],caption:"Nominal", tag:1, tipeText:ttNilai, text:"0"});
		this.e_user = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"User input", maxLength:50});				
		
		this.e_namarek = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,550,20],caption:"Nama Rekening", maxLength:50});
		this.e_norek = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,550,20],caption:"No Rekening", maxLength:50});
		this.e_bank = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,550,20],caption:"Bank - Cabang", maxLength:100});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							"where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			
			this.cb_nik.setSQL("select distinct a.nik,a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			                   "where a.sts_pj='1' and b.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);															

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'ITPJR' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																						
				this.akunPJ = line.flag;								
			} 			
			
			this.c_jenis.setText("PANJAR");
			this.e_user.setText(this.app._namaUser);
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fPanjarBDD2.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fPanjarBDD2.implement({	
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_d where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from tu_prbdd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					var saldoBMHD = nilaiToFloat(this.e_saldoBMHD.getText());					
					if (saldoBMHD == 0) {						
						var nilaiBDD = nilaiToFloat(this.e_nilai.getText());
						var nilaiBMHD = 0;
						var akunAJU = this.akunBDD;
					}
					else {
						if (nilaiToFloat(this.e_nilai.getText()) <= saldoBMHD) {
							var nilaiBDD = 0;
							var nilaiBMHD = nilaiToFloat(this.e_nilai.getText());
							
							var akunAJU = this.akunBMHD;
						}
						else {
							var nilaiBDD = nilaiToFloat(this.e_nilai.getText()) - saldoBMHD;
							var nilaiBMHD = saldoBMHD;
							
							var akunAJU = this.akunBDD;
						}
					}

					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.akunPJ+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','A','"+this.cb_nik.getText()+"','-','"+this.e_user.getText()+"','PJPROYEK','NON')");					
										
					//bdd
					if (nilaiBDD != 0) {
						sql.add("insert into it_aju_d (no_aju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input, akun_seb) values "+
								"('"+this.e_nb.getText()+"', '-', '"+this.dp_d1.getDateString()+"', 0, '"+this.akunBDD+"', '"+this.e_ket.getText()+"', 'D', 'IDR', 1, "+nilaiBDD+", "+nilaiBDD+", '"+this.cb_pp.getText()+"', '-', '"+this.app._lokasi+"', 'PRAGENDA', 'BDD', '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '-')");		
						sql.add("insert into tu_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBDD+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"','D',"+nilaiBDD +",getdate(),'"+this.cb_id.getText()+"','NONBDD','-')");						
					}
					//bmhd
					if (nilaiBMHD != 0) {						
						sql.add("insert into it_aju_d (no_aju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input, akun_seb) values "+
								"('"+this.e_nb.getText()+"', '-', '"+this.dp_d1.getDateString()+"', 0, '"+this.akunBMHD+"', '"+this.e_ket.getText()+"', 'D', 'IDR', 1, "+nilaiBMHD+", "+nilaiBMHD+", '"+this.cb_pp.getText()+"', '-', '"+this.app._lokasi+"', 'PRAGENDA', 'BMHD', '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '-')");		
						sql.add("insert into tu_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBMHD+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"','C',"+nilaiBMHD+",getdate(),'"+this.cb_id.getText()+"','REVBMHD','PRAGENDA')");					
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
					setTipeButton(tbSimpan);
					this.stsSimpan =1;
					//this.e_nover.hide();
					//this.e_memo.hide();
					if (this.stsSimpan == 1) this.doClick();
				break;
			case "simpan" :
			case "ubah" :
				this.preView = "1";			
				this.c_jenis.setText("PANJAR");

				var d = new Date();
				this.d2 = d.strToDate(this.dp_d1.getText());
				var jumlah = this.d2.DateDiff(this.d1);
				if (jumlah > 0) {
					system.alert(this,"Transaksi tidak valid.","Tanggal Transaksi melebihi Tanggal Selesai Proyek");
					return false;
				}

				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
				
				var cekSaldoOR = 0;
				var saldoBMHD = nilaiToFloat(this.e_saldoBMHD.getText());					
				if (saldoBMHD == 0) {						
					cekSaldoOR = 1;
				}
				else {
					if (nilaiToFloat(this.e_nilai.getText()) <= saldoBMHD) {
						cekSaldoOR = 0;
					}
					else {
						var nilaiBDD = nilaiToFloat(this.e_nilai.getText()) - saldoBMHD;
						var nilaiBMHD = saldoBMHD;
						
						cekSaldoOR = 1;
					}
				}
					
				if (cekSaldoOR == 1) {
					if (nilaiBDD > nilaiToFloat(this.e_nsaldo.getText())) {
						system.alert(this,"Nilai transaksi tidak valid.","Nilai BDD (Selisih BMHD) tidak boleh melebihi Saldo OR.");
						return false;
					}
				}



				var data = this.dbLib.getDataProvider("select count(no_aju) as jml from it_aju_m where progress ='3' and nik_panjar ='"+this.cb_nik.getText()+"' and modul = 'PANJAR' and no_ptg='-' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					if (parseFloat(line.jml) + 1 >  this.maxPJ) {
						system.alert(this,"Transaksi tidak valid.","Panjar Outstanding sudah maksimal.");
						return false;						
					}
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
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_d where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from tu_prbdd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
		if (this.stsSimpan == 1) this.doClick();
	},
	doChange:function(sender){
		if (sender==this.cb_pp && this.cb_pp.getText()!="" && this.stsSimpan == 1) {			
			this.cb_id.setText("","");
			this.cb_id.setSQL("select kode_proyek, nama from tu_proyek where kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and progress<>'0' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Keterangan"],"and","Data Proyek",true);						
			this.e_nproyek.setText("0");				
			this.e_nor.setText("0");				
			this.e_uraian.setText("");				
		}		
		if (sender==this.cb_id && this.cb_id.getText()!="") {
			var strSQL = "select a.nama,b.akun_bdd,a.nilai,a.nilai_or,a.nilai_or - isnull(c.bdd,0) as saldo, b.akun_bmhd,  convert(varchar,a.tgl_selesai,103) as tgl_selesai  "+
			             "from tu_proyek a "+
			             
			             "   inner join tu_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+			            
			             "   left join ( "+
			             
			             "		select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bdd "+
			             "		from tu_prbdd_d where kode_lokasi='"+this.app._lokasi+"' and no_bukti <> '"+this.e_nb.getText()+"' and modul in ('AJUBDD','NONBDD','REVBDD') group by kode_proyek,kode_lokasi "+
			             
			             "   ) c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+
			             
						 "where a.kode_proyek = '"+this.cb_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						 			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];		
				
				var d = new Date();	
				this.d1 = d.strToDate(line.tgl_selesai);

				this.e_nproyek.setText(floatToNilai(line.nilai));				
				this.e_nor.setText(floatToNilai(line.nilai_or));				
				this.e_nsaldo.setText(floatToNilai(line.saldo));				
				this.e_uraian.setText(line.nama);	
				this.cb_akun.setText(line.akun_bdd);	
				
				this.akunBDD = line.akun_bdd;
				this.akunBMHD = line.akun_bmhd;
			}

			//19-01-18 (tambahan rudi)
			//saldo bymhd = ambil total bmhd (tambahan = yg D-->REVBDD), dikurangi BYMHD yg diselesaikan (yg C-->REVBMHD)
			var strSQL = "select isnull(sum(case dc when 'D' then a.nilai else -a.nilai end),0) as saldo_bymhd "+
						 "from tu_prbdd_d a  "+
						 "inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
						 "inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+							
						 "where a.modul in ('REVBDD','REVBMHD') and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' and a.no_bukti <> '"+this.e_nb.getText()+"' "+
						 " and b.kode_proyek='"+this.cb_id.getText()+"' ";
	 
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.e_saldoBMHD.setText(floatToNilai(line.saldo_bymhd));							
			}

		}		
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);			
			this.e_nilai.setText("0");	
			//this.e_nover.hide();
			//this.e_memo.hide();					
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_id.setFocus();
		setTipeButton(tbSimpan);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if (this.preView == "1") {						
								this.nama_report="server_report_saku3_tu_rptProyekPanjar";
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
								this.pc2.hide(); 
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
				this.pc2.show(); 			
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
			this.stsSimpan = 1;
			//this.e_nover.hide();
			//this.e_memo.hide();
			if (this.stsSimpan == 1) this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from it_aju_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
		             "where a.form='PJPROYEK' and a.modul='PANJAR' and a.progress in ('0','A','R') and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"'";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);		
				
				//this.e_nover.show();
				//this.e_memo.show();
						
				this.stsSimpan = 0;					
				this.e_nb.setText(this.sg3.cells(0,row));								
														  				
				var strSQL = "select a.nik_panjar,aa.kode_proyek,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,a.kode_pp,a.kode_akun,a.kode_drk,isnull(x.no_ver,'-') as no_ver,isnull(x.catatan,'-') as catatan,a.user_input,a.kode_drk, "+
						     "r.bank,r.no_rek,r.nama_rek "+
						     "from it_aju_m a "+
						     "				inner join tu_prbdd_d aa on a.no_aju=aa.no_bukti and a.kode_lokasi=aa.kode_lokasi and aa.modul in ('NONBDD','REVBMHD') "+
						     "				inner join it_aju_rek r on a.no_aju=r.no_aju and a.kode_lokasi=r.kode_lokasi "+
						     "				left join ver_d x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
						     "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);
						this.cb_akun.setText(line.kode_akun);
						this.cb_pp.setText(line.kode_pp);					
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));										
						this.e_user.setText(line.user_input);
						this.cb_nik.setText(line.nik_panjar);
						//this.e_nover.setText(line.no_ver);
					
						this.e_bank.setText(line.bank);					
						this.e_norek.setText(line.no_rek);					
						this.e_namarek.setText(line.nama_rek);					
					
						//this.e_memo.setText(line.catatan);					
						this.cb_id.setSQL("select kode_proyek, nama from tu_proyek where kode_proyek='"+line.kode_proyek+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Deskripsi"],"and","Data Proyek",true);												

						this.cb_id.setText(line.kode_proyek);
					} 
				}				
															
			}									
		} catch(e) {alert(e);}
	}
});