window.app_saku3_transaksi_siaga_svc_fKbSVCmulti = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_svc_fKbSVCmulti.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_svc_fKbSVCmulti";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penerimaan SVC Multi: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["CD","BD"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,220,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_bank = new saiCBBL(this,{bound:[20,14,220,20],caption:"Kas/Bank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_buat = new saiCBBL(this,{bound:[20,15,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_saldo = new saiLabelEdit(this,{bound:[800,18,200,20],caption:"Total Saldo", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_atensi = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Terima Dari",maxLength:50});
		this.e_total = new saiLabelEdit(this,{bound:[800,14,200,20],caption:"Total KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.cb_akun = new saiCBBL(this,{bound:[20,19,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});					
		this.e_beban = new saiLabelEdit(this,{bound:[800,19,200,20],caption:"Total Beban", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,240], childPage:["Data Pelunasan","Data Anggaran"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
				colTitle:["No Invoice","Nama Cust","Akun AR","Saldo","Nilai KB","Nilai Beban"],
				colWidth:[[5,4,3,2,1,0],[100,100,100,100,300,100]],
				columnReadOnly:[true,[0,1,2,3],[4,5]],
				colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],				
				ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				buttonStyle:[[0],[bsEllips]],defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
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
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setText("CD");
						
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			this.cb_cabang.setSQL("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_cabang","b.nama"],false,["Kode","Nama"],"and","Data Cabang",true);
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
			
			/*
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('AKUNOI','AKUNOE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNOI") this.akunOI = line.flag;								
					if (line.kode_spro == "AKUNOE") this.akunOE = line.flag;								
				}
			}
			*/
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_svc_fKbSVCmulti.extend(window.childForm);
window.app_saku3_transaksi_siaga_svc_fKbSVCmulti.implement({
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
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','KBSVCM','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR','1',"+parseNilai(this.e_total.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.e_atensi.getText()+"','"+this.cb_bank.getText()+"')");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','"+this.e_atensi.getText()+"','"+this.app._lokasi+"','KBSVCM','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',"+nilaiToFloat(this.e_total.getText())+")");
										
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){	
							if (nilaiToFloat(this.sg1.cells(4,i)) <= nilaiToFloat(this.sg1.cells(3,i))) 
								var nilai = nilaiToFloat(this.sg1.cells(4,i)) + nilaiToFloat(this.sg1.cells(5,i));
							else var nilai = nilaiToFloat(this.sg1.cells(3,i));								
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(2,i)+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.app._kodePP+"','-','-','"+this.sg1.cells(1,i)+"','"+this.app._lokasi+"','KBSVCM','AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilai+")");																	
							
							var nilaiLain = 0;
							if (nilaiToFloat(this.sg1.cells(5,i)) > 0) 
								nilaiLain = nilaiToFloat(this.sg1.cells(5,i));
							else {
								if (nilaiToFloat(this.sg1.cells(4,i)) > nilaiToFloat(this.sg1.cells(3,i))) 							
								nilaiLain = nilaiToFloat(this.sg1.cells(3,i)) - nilaiToFloat(this.sg1.cells(4,i));														
							}
							sql.add("insert into gr_svcbayar_d(no_bukti,kode_lokasi,no_invoice,akun_piutang,nilai_kas,nilai_lain,periode,dc,modul) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"',"+parseNilai(this.sg1.cells(4,i))+","+nilaiLain+",'"+this.e_periode.getText()+"','D','KB')");
						}
					}																			
					if (nilaiToFloat(this.e_beban.getText()) > 0) {
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',98,'"+this.akunOE+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_beban.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBSVCM','OE','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+parseNilai(this.e_beban.getText())+")");										
					}					
					if (this.nilaiOI != 0) {
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',99,'"+this.akunOI+"','"+this.e_ket.getText()+"','C',"+this.nilaiOI+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBSVCM','OI','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+this.nilaiOI+")");										
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
					this.sg1.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();								
				for (var i = 0; i < this.sg1.rows.getLength();i++){
					if (this.sg1.rowValid(i)){											
						if ((nilaiToFloat(this.sg1.cells(4,i)) > nilaiToFloat(this.sg1.cells(3,i))) && (nilaiToFloat(this.sg1.cells(5,i)) != 0)) {
							var j = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Beban tidak valid. Baris : "+j);
							return false;						
						}						
						if ( (nilaiToFloat(this.sg1.cells(5,i)) > 0) && ((nilaiToFloat(this.sg1.cells(5,i)) + nilaiToFloat(this.sg1.cells(4,i))) > nilaiToFloat(this.sg1.cells(3,i))) ) {
							var j = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Beban tidak valid. Baris : "+j);
							return false;						
						}
					}
				}				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
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
		this.doClick();
	},
	doChange:function(sender){		
		if (sender == this.c_jenis || sender == this.cb_cabang || sender == this.cb_bank) {
			this.doClick();				
		}	
		if (sender == this.cb_cabang && this.cb_cabang.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.kode_akun,a.nama from masakun a inner join gr_svc b on a.kode_akun=b.akun_oi where b.kode_cabang='"+this.cb_cabang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.akunOI = line.kode_akun;												
					this.namaOI = line.nama;	
				} 
			}
			var data = this.dbLib.getDataProvider("select a.kode_akun,a.nama from masakun a inner join gr_svc b on a.kode_akun=b.akun_oe where b.kode_cabang='"+this.cb_cabang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.akunOE = line.kode_akun;												
					this.namaOE = line.nama;	
				} 
			}
		}																	
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
			this.e_ket.setFocus();
		}
	},
	doNilaiChange1: function(){
		try{
			this.nilaiOI = 0;
			var beban = nilai = saldo = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){					
					saldo += nilaiToFloat(this.sg1.cells(3,i));					
					nilai += nilaiToFloat(this.sg1.cells(4,i));					
					beban += nilaiToFloat(this.sg1.cells(5,i));					
					if (nilaiToFloat(this.sg1.cells(4,i)) > nilaiToFloat(this.sg1.cells(3,i)))
						this.nilaiOI += nilaiToFloat(this.sg1.cells(4,i)) - nilaiToFloat(this.sg1.cells(3,i));
				}
			}			
			this.e_saldo.setText(floatToNilai(saldo));
			this.e_total.setText(floatToNilai(nilai));			
			this.e_beban.setText(floatToNilai(beban));		
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},				
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Invoice",sender,undefined, 
												   "select a.no_invoice, a.nama_cust from gr_svc_d a "+
												   "       left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_svcbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
												   "where a.total>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												   "select count(a.no_invoice) from gr_svc_d a "+
												   "       left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_svcbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
												   "where a.total>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.no_invoice","a.nama_cust"],"and",["Invoice","Cust"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell1: function(sender, col, row){
		if (col == 0) {			
			var data = this.dbLib.getDataProvider("select a.nama_cust,a.total-isnull(c.bayar,0) as total,a.akun_piutang,a.akun_piutang + ' - '+b.nama as nama "+
			           "from gr_svc_d a inner join masakun b on a.akun_piutang=b.kode_akun and b.kode_lokasi = a.kode_lokasi "+
					   "                 left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_svcbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_invoice='"+this.sg1.cells(0,row)+"' and a.kode_lokasi ='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.sg1.cells(2,row,line.akun_piutang);
					this.sg1.cells(3,row,floatToNilai(line.total));					
				} 
			}
		}
		if (col == 4) {	
			this.sg1.validasi();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_siaga_rptBuktiBank";
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
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataDRK = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataDRK.set(line.kode_drk, line.nama);
								}
							}							
						}else throw result;
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
			this.sg1.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);			
		} catch(e) {
			alert(e);
		}
	}
});