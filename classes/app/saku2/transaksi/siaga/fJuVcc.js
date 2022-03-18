window.app_saku2_transaksi_siaga_fJuVcc = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fJuVcc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fJuVcc";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Tagihan TeCC: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Invoice","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,410,180,80,100]],colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,325], childPage:["Data Pembatalan"]});				
		this.cb_inv = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Bukti Invoice", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});					
		this.e_atensi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Terima Dari", readOnly:true});						
		this.e_akunar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Akun Piutang", readOnly:true});									
		this.e_saldo= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Saldo Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
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
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
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
			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}				
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fJuVcc.extend(window.childForm);
window.app_saku2_transaksi_siaga_fJuVcc.implement({
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
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_vccbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_inv.getText()+"','"+this.e_ket.getText()+"','-','JUTECC','JU','IDR',1,"+parseNilai(this.e_saldo.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','-','-',getdate(),'"+this.app._userLog+"')");
				
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref)  "+
							"select '"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',0,c.akun_ar,'"+this.e_ket.getText()+"','C',a.total,b.kode_pp,b.kode_drk,'-','-','-','-','-','-',a.kode_lokasi,'TECC','PIUTANG','"+this.e_periode.getText()+"',b.kode_curr,b.kurs,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from gr_vcc_d a "+
							"inner join gr_vcc_m b on a.no_vcc=b.no_vcc "+
							"inner join gr_vcc c on b.kode_cabang=c.kode_cabang "+
							"where a.total <> 0 and a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref)  "+
							"select '"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',1,c.akun_pot_pend,'"+this.e_ket.getText()+"','C',a.diskon,b.kode_pp,b.kode_drk,'-','-','-','-','-','-',a.kode_lokasi,'TECC','DISKON','"+this.e_periode.getText()+"',b.kode_curr,b.kurs,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from gr_vcc_d a "+
							"inner join gr_vcc_m b on a.no_vcc=b.no_vcc "+
							"inner join gr_vcc c on b.kode_cabang=c.kode_cabang "+
							"where a.diskon <> 0 and a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref)  "+
							"select '"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',2,c.akun_pend,'"+this.e_ket.getText()+"','D',a.nilai,b.kode_pp,b.kode_drk,'-','-','-','-','-','-',a.kode_lokasi,'TECC','PEND','"+this.e_periode.getText()+"',b.kode_curr,b.kurs,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from gr_vcc_d a "+
							"inner join gr_vcc_m b on a.no_vcc=b.no_vcc "+
							"inner join gr_vcc c on b.kode_cabang=c.kode_cabang "+
							"where a.nilai <> 0 and a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref)  "+
							"select '"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',3,c.akun_biaya,'"+this.e_ket.getText()+"','D',a.biaya,b.kode_pp,b.kode_drk,'-','-','-','-','-','-',a.kode_lokasi,'TECC','BIAYA','"+this.e_periode.getText()+"',b.kode_curr,b.kurs,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from gr_vcc_d a "+
							"inner join gr_vcc_m b on a.no_vcc=b.no_vcc "+
							"inner join gr_vcc c on b.kode_cabang=c.kode_cabang "+
							"where a.biaya <> 0 and a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref)  "+
							"select '"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',4,c.akun_materai,'"+this.e_ket.getText()+"','D',a.materai,b.kode_pp,b.kode_drk,'-','-','-','-','-','-',a.kode_lokasi,'TECC','MATERAI','"+this.e_periode.getText()+"',b.kode_curr,b.kurs,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from gr_vcc_d a "+
							"inner join gr_vcc_m b on a.no_vcc=b.no_vcc "+
							"inner join gr_vcc c on b.kode_cabang=c.kode_cabang "+
							"where a.materai <> 0 and a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
									
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref)  "+
							"select '"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',5,c.akun_ppn,'"+this.e_ket.getText()+"','D',a.ppn,b.kode_pp,b.kode_drk,'-','-','-','-','-','-',a.kode_lokasi,'TECC','PPN','"+this.e_periode.getText()+"',b.kode_curr,b.kurs,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from gr_vcc_d a "+
							"inner join gr_vcc_m b on a.no_vcc=b.no_vcc "+
							"inner join gr_vcc c on b.kode_cabang=c.kode_cabang "+
							"where a.ppn <> 0 and a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
								
					
					sql.add("insert into gr_vccbayar_d(no_bukti,kode_lokasi,no_invoice,akun_piutang,nilai_kas,nilai_lain,periode,dc,modul) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_inv.getText()+"','"+this.akunAR+"',"+parseNilai(this.e_saldo.getText())+",0,'"+this.e_periode.getText()+"','D','JU')");
										
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
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.sg3.clear(1);	
					this.stsSimpan = 1;			
					setTipeButton(tbSimpan);
					this.cb_inv.setSQL("select a.no_invoice, a.nama_cust from gr_vcc_d a "+
			                   "       left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_vccbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
							   "where a.total>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_invoice","a.nama_cust"],false,["No Invoice","Customer"],"and","Daftar Bukti",true);
				break;
			case "simpan" :		
			case "ubah" :		
				this.preView = "1";										
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);			
				
				if (nilaiToFloat(this.e_saldo.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
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
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_vccbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) this.doClick();
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="" && this.stsSimpan == 1) {
			this.cb_inv.setSQL("select a.no_invoice, a.nama_cust from gr_vcc_d a "+
			                   "       left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_vccbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
							   "where a.total>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_invoice","a.nama_cust"],false,["No Invoice","Customer"],"and","Daftar Bukti",true);
			this.doClick();		
		}							
		if (sender == this.cb_inv && this.cb_inv.getText()!="") {			
			var data = this.dbLib.getDataProvider("select a.nama_cust,a.total-isnull(c.bayar,0) as total,a.akun_piutang,a.akun_piutang + ' - '+b.nama as nama "+
			           "from gr_vcc_d a inner join masakun b on a.akun_piutang=b.kode_akun and b.kode_lokasi = a.kode_lokasi "+
					   "                 left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar "+
					   "                            from gr_vccbayar_d where no_bukti<>'"+this.e_nb.getText()+"' group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_atensi.setText(line.nama_cust);					
					this.e_saldo.setText(floatToNilai(line.total));			
					this.e_akunar.setText(line.nama);										
					this.akunAR = line.akun_piutang;
				} 
			}			
		}						
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);
			this.cb_inv.setSQL("select a.no_invoice, a.nama_cust from gr_vcc_d a "+
			                   "       left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_vccbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
							   "where a.total>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_invoice","a.nama_cust"],false,["No Invoice","Customer"],"and","Daftar Bukti",true);
		}
		
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
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.sg3.clear(1);
			setTipeButton(tbSimpan);	
			this.stsSimpan = 1;
			this.doClick();		
			this.cb_inv.setSQL("select a.no_invoice, a.nama_cust from gr_vcc_d a "+
			                   "       left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_vccbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
							   "where a.total>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_invoice","a.nama_cust"],false,["No Invoice","Customer"],"and","Daftar Bukti",true);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from ju_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'JUTECC' and a.posted ='F'";						
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
			this.sg3.appendData([line.no_ju,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select * from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_setuju);
						this.e_ket.setText(line.keterangan);
						this.cb_inv.setSQL("select a.no_invoice, a.nama_cust from gr_vcc_d a "+
							  			   "where a.no_invoice='"+line.no_dokumen+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							  			   ["a.no_invoice","a.nama_cust"],false,["No Invoice","Customer"],"and","Daftar Bukti",true);
						this.cb_inv.setText(line.no_dokumen);								
					} 
				}		
				
			}									
		} catch(e) {alert(e);}
	}
});