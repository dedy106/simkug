window.app_saku3_transaksi_tu_proyekbaru_fRekonBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fRekonBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fRekonBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekon Pelunasan Tagihan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		      		colTitle:["No Rekon","Tanggal","No Dokumen","Deskripsi","Pilih"],
					colWidth:[[4,3,2,1,0],[70,300,200,80,100]],
					readOnly:true,colFormat:[[4],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		
		this.c_periode = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});				
		this.cb_bukti = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No Jurnal", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});											
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Nilai Jurnal", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,269], childPage:["Data Invoice","Bukti TAK"]});		
		this.cb_bill = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Tagihan", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.cb_proyek = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Proyek", readOnly:true, tag:1});				
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"PP / Unit", readOnly:true, tag:1});				
		this.cb_piutang = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Akun Piutang", readOnly:true, tag:1});				
		this.e_sisa = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Saldo Piutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai Rekon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					
		
		this.cb_lokasi = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});				
		this.cb_tak = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Akun TAK", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});					
		this.e_nbtak = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"No TAK",maxLength:30,readOnly:true});
		this.e_tak = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.e_kettak = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Keterangan", maxLength:150,tag:1});						

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_piutang.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);		
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);								
			this.cb_cust.setSQL("select kode_cust, nama from prb_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);		
			this.cb_tak.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '016'  "+
							   "where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun TAK",true);		
			
			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi ='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}
			this.c_periode.setText("");

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;			
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fRekonBill.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fRekonBill.implement({
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
						sql.add("delete from prb_prbill_bayar where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from takkirim_m where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from takkirim_j where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from prb_prbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					} 
					
					sql.add("insert into prb_prbill_bayar (no_rekon,kode_lokasi,periode,kode_pp,modul,no_bill,kode_cust,dc,nilai,nilai_pph,no_jurnal,kode_akun,no_tak) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','REKON','"+this.cb_bill.getText()+"','"+this.cb_cust.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",0,'"+this.cb_bukti.getText()+"','"+this.cb_akun.getText()+"','"+this.e_nbtak.getText()+"')");
					
					// no_ref2 = kodecust, no_ref3 = c_periode, param 3=jenis;		
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','BILREKON','F','-','-','-','"+this.dp_d1.getDateString()+"','"+this.cb_bukti.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",0,0,'"+this.app._userLog+"','"+this.app._userLog+"','-','"+this.cb_akun.getText()+"','"+this.cb_cust.getText()+"','"+this.c_periode.getText()+"','-','-','REKON')"); 
					
					//titipan[& pph] pada piutang		
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_bukti.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+parseNilai(this.e_nilai.getText())+","+
									parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','PIUPRO','TITIP','IDR',1,'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_bill.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.cb_piutang.getText()+"','C',"+parseNilai(this.e_nilai.getText())+","+
									parseNilai(this.e_nilai.getText())+",'Pelunasan atas Proyek "+this.cb_proyek.getText()+"','PIUPRO','PIU','IDR',1,'"+this.app._kodePP+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");
		
					if (this.cb_lokasi.getText() != "" && nilaiToFloat(this.e_tak.getText()) != 0) {
						//tidak diposting dari TAK tapi dari trans_m
						sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
								"('"+this.e_nbtak.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_bukti.getText()+"','"+this.e_kettak.getText()+"','"+this.app._kodePP+"','PIUPRO','KIRIM','IDR',1,"+nilaiToFloat(this.e_tak.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','X','-','-','-',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','0','-','"+this.dp_d1.getDateString()+"')");											
						sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nbtak.getText()+"','"+this.cb_bukti.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_tak.getText()+"','"+this.e_kettak.getText()+"','C',"+nilaiToFloat(this.e_tak.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIUPRO','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					

						//jurnal tak ppn		
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_bukti.getText()+"','"+this.dp_d1.getDateString()+"',997,'"+this.akunPPN+"','D',"+parseNilai(this.e_tak.getText())+","+
								parseNilai(this.e_tak.getText())+",'"+this.e_kettak.getText()+"','PIUPRO','HUTPPN','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_bukti.getText()+"','"+this.dp_d1.getDateString()+"',998,'"+this.cb_tak.getText()+"','C',"+parseNilai(this.e_tak.getText())+","+
								parseNilai(this.e_tak.getText())+",'"+this.e_kettak.getText()+"','PIUPRO','TAK','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
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
					this.sg3.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (this.cb_lokasi.getText() != "") {
					this.cb_lokasi.setTag("1");
					this.cb_tak.setTag("1");
					this.e_nbtak.setTag("1");
					this.e_tak.setTag("1");	
					this.e_kettak.setTag("1");					
				}
				else {
					this.cb_lokasi.setTag("9");
					this.cb_tak.setTag("9");
					this.e_nbtak.setTag("9");
					this.e_tak.setTag("9");
					this.e_kettak.setTag("9");					
				}
				
				if (this.cb_lokasi.getText() != "" && nilaiToFloat(this.e_tak.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai PPN (TAK) tidak boleh nol atau kurang untuk transaksi TAK.");
					return false;						
				}				
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText()) ) {
					system.alert(this,"Transaksi tidak valid.","Nilai Rekon tidak boleh melebihi Nilai Jurnal (Saldo Titipan)");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_sisa.getText()) ) {
					system.alert(this,"Transaksi tidak valid.","Ni Rekon tidak boleh melebihi Saldo Piutang");
					return false;						
				}
				if (nilaiToFloat(this.e_tak.getText()) > nilaiToFloat(this.e_nilai.getText()) ) {
					system.alert(this,"Transaksi tidak valid.","Nilai PPN (TAK) tidak boleh melebihi Nilai Rekon.");
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
					sql.add("delete from prb_prbill_bayar where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from takkirim_m where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from takkirim_j where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from prb_prbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);						
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);									
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){				
		if (sender == this.cb_lokasi) {
			if (this.cb_lokasi.getText() == "") {
				this.e_nbtak.setText("");
				this.e_tak.setText("0");
			}
			else {
				this.e_nbtak.setText(this.e_nb.getText());							
			}			
		}
		
		if (sender == this.e_periode && this.stsSimpan==1) {
			this.doClick();			
		}
		
		if (sender == this.c_periode && this.c_periode.getText()!="") {
			this.cb_bukti.setSQL("select distinct no_bukti,keterangan from gldt where periode='"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
								 "union all "+
								 "select distinct no_bukti,keterangan from gldt_h where periode='"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
								 ["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Jurnal",true);		
		}
		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
			this.cb_akun.setSQL("select distinct a.kode_akun,a.nama from masakun a inner join gldt b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where b.no_bukti='"+this.cb_bukti.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and b.dc ='C' "+
								 "union all "+
								 "select distinct a.kode_akun,a.nama from masakun a inner join gldt_h b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where b.no_bukti='"+this.cb_bukti.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and b.dc ='C' ",
								 ["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Daftar Akun",true);		
		}		
		if (sender == this.cb_akun && this.cb_akun.getText() != "") {
			if (this.c_periode.getText() == this.app._periode) {
				var strSQL = "select sum(nilai) as nilai from gldt "+
						 	 "where dc ='C' and kode_akun='"+this.cb_akun.getText()+"' and no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			}
			else {
				var strSQL = "select sum(nilai) as nilai from gldt_h "+
						 	 "where dc ='C' and kode_akun='"+this.cb_akun.getText()+"' and no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			}									 	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					var nilai = parseFloat(line.nilai);										
				}
			}	
			
			var pakai = 0;
			var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as pakai from prb_prbill_bayar "+
						 "where no_jurnal='"+this.cb_bukti.getText()+"' and kode_akun='"+this.cb_akun.getText()+"' and no_rekon <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					var pakai = parseFloat(line.pakai);										
				}
			}				
			this.e_saldo.setText(floatToNilai(nilai - pakai));	
		}	
		
		if (sender == this.cb_cust && this.cb_cust.getText()!="" && this.stsSimpan==1 ) {			
			var strSQL = "select a.no_bill,a.keterangan "+
						 "from ( "+						 						 						
						 "		select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi,a.kode_pp,sum(a.nilai+a.nilai_ppn-a.diskon) as total "+ 						 
						 "  	from prb_prbill_m a  "+
						 "  	where a.modul='BILL' and a.kode_cust='"+this.cb_cust.getText()+"' and (a.nilai) > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "  	group by a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi,a.kode_pp "+						 
						 "	    ) a  "+						 
					
						 "	left join ( "+						
						 "    	select no_bill,kode_lokasi,sum(case dc when 'D' then nilai+nilai_pph else -(nilai+nilai_pph) end) as bayar  "+
						 "    	from prb_prbill_bayar where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "	  	group by no_bill,kode_lokasi "+
						 "		) b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+						 
						
						 "where a.kode_cust='"+this.cb_cust.getText()+"' and a.total > isnull(b.bayar,0) and a.kode_lokasi ='"+this.app._lokasi+"'";

			this.cb_bill.setSQL(strSQL,["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Data Billing",true);			
			this.cb_proyek.setSQL("select kode_proyek, nama from prb_proyek where versi='PRO20' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Nama"],"and","Data Proyek",true);			
		}		

		if (sender == this.cb_bill && this.cb_bill.getText()!="" && this.stsSimpan==1 ) {			
			var strSQL = "select a.no_bill,a.kode_proyek,a.akun_piutang,a.keterangan,round(a.total-isnull(b.bayar,0),2) as saldo,a.kode_pp "+
			             "from ( "+						 						 
						 
						 "	select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi, sum(a.nilai+a.nilai_ppn-a.diskon) as total,a.kode_pp "+ 						 
						 "  from prb_prbill_m a  "+
						 "  where a.modul='BILL' and a.kode_cust='"+this.cb_cust.getText()+"' and (a.nilai) > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "  group by a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi,a.kode_pp "+						 
						 ")a  "+						 
						
						 "left join ( "+						
						 "    select no_bill,kode_lokasi,sum(case dc when 'D' then nilai+nilai_pph else -(nilai+nilai_pph) end) as bayar  "+
						 "    from prb_prbill_bayar where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "	  group by no_bill,kode_lokasi "+
						 ") b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+						 
						 
						 "where a.no_bill='"+this.cb_bill.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];												
				this.cb_proyek.setText(line.kode_proyek);
				this.cb_pp.setText(line.kode_pp);
				this.cb_piutang.setText(line.akun_piutang);
				this.e_sisa.setText(floatToNilai(line.saldo));
				this.e_nilai.setText(floatToNilai(line.saldo));								
			}
		}						
	},

	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.sg3.clear(1);
			}
			this.stsSimpan = 1;			
			this.cb_cust.setSQL("select kode_cust, nama from prb_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-RPP"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
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
								this.nama_report="server_report_saku3_tu_rptProyekRekonJurnal";
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
			this.sg3.clear(1); 					
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.stsSimpan = 1;
			this.doClick();		
		} catch(e) {
			alert(e);
		}
	},			
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from trans_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'BILREKON' and a.posted ='F'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
									
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.c_periode.setText(line.no_ref3);
						this.cb_bukti.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.no_ref1);				
						this.e_nilai.setText(floatToNilai(line.nilai1));		
						this.cb_cust.setSQL("select kode_cust, nama from prb_cust where kode_cust='"+line.no_ref2+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);									
						this.cb_cust.setText(line.no_ref2);	
					}
				}
				var strSQL = "select a.kode_loktuj,a.nilai,b.kode_akun,a.keterangan from takkirim_m a inner join takkirim_j b on a.no_kirim=b.no_kirim and a.kode_lokasi=b.kode_lokasi and b.jenis='TAK' "+
							 "where a.no_kirim = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_lokasi.setText(line.kode_loktuj);	
						this.cb_tak.setText(line.kode_akun);	
						this.e_nbtak.setText(this.e_nb.getText());	
						this.e_tak.setText(floatToNilai(line.nilai));												
						this.e_kettak.setText(line.keterangan);	
					}
				}

				var strSQL = "select a.no_bill,a.kode_proyek,a.akun_piutang,a.keterangan,round(a.total-isnull(b.bayar,0),2) as saldo,a.kode_pp "+
							"from ( "+						 						 
							
							"	select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi, sum(a.nilai+a.nilai_ppn-a.diskon) as total,a.kode_pp "+ 						 
							"   from prb_prbill_m a  "+
							"   where a.modul='BILL' and a.kode_cust='"+this.cb_cust.getText()+"' and (a.nilai) > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
							"   group by a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,a.akun_piutang,a.kode_lokasi,a.kode_pp "+						 
							")a  "+						 
							
							"inner join prb_prbill_bayar c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi  "+					 

							"left join ( "+						
						 	"     select no_bill,kode_lokasi,sum(case dc when 'D' then nilai+nilai_pph else -(nilai+nilai_pph) end) as bayar  "+
						 	"     from prb_prbill_bayar where no_rekon <> '"+this.e_nb.getText()+"' and kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"	  group by no_bill,kode_lokasi "+
						 	") b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+						 

							"where c.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];	
					this.cb_bill.setSQL("select no_bill,keterangan from prb_prbill_m where no_bill='"+line.no_bill+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Data Billing",true);			
					this.cb_bill.setText(line.no_bill);											
					this.cb_proyek.setText(line.kode_proyek);
					this.cb_pp.setText(line.kode_pp);
					this.cb_piutang.setText(line.akun_piutang);
					this.e_sisa.setText(floatToNilai(line.saldo));					
				}
			}						
		} catch(e) {alert(e);}
	}
});