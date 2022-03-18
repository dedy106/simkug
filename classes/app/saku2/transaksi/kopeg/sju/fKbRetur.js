window.app_saku2_transaksi_kopeg_sju_fKbRetur = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fKbRetur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fKbRetur";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penerimaan Invoice: Input/Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No KasBank","Tanggal","Status","Bank - No Ref.","Deskripsi","Tertanggung","Akun KasBank"],
					colWidth:[[6,5,4,3,2,1,0],[200,200,250,150,80,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				
		this.c_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});	
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Status",items:["MCM","TRANSFER","CHEQUE","GIRO"], readOnly:true,tag:2});
		this.e_bank = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,320,20],caption:"Bank - No Ref.",maxLength:50});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[350,14,120,20],caption:"",  labelWidth:0, maxLength:30});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});											
		this.e_totIDR = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Nilai IDR", tag:1, tipeText:ttNilai, readOnly:true,text:"0"});			
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,140,20],caption:"Curr - Kurs", tag:2, readOnly:true, text:"IDR",change:[this,"doChange"]});						
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[170,14,50,20],caption:"", tag:1, labelWidth:0, tipeText:ttNilai, text:"1",tag:2,change:[this,"doChange"]});		//readOnly:true, 		
		this.e_sk = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Selisih Kurs", tag:1, tipeText:ttNilai, readOnly:true,text:"0"});	
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,230], childPage:["Data Titipan","Data Invoice"]});		
		this.cb_cust = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.cb_titip = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});											
		this.c_curr2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,140,20],caption:"Curr - Kurs", tag:1, readOnly:true, text:"IDR"});				
		this.e_kurs2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[170,14,50,20],caption:"", tag:1, labelWidth:0, readOnly:true,  tipeText:ttNilai, text:"1",tag:2});				
		this.e_titip = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai Titipan", tag:1,  readOnly:true, tipeText:ttNilai, text:"0",tag:2,change:[this,"doChange"]});				
		
		this.cb_polis = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Polis Return", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.e_pdpt = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai Pendapatan", tag:1,  tipeText:ttNilai, text:"0",tag:2,change:[this,"doChange"]});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai Hut PPN", tag:1,  tipeText:ttNilai, text:"0",tag:2,change:[this,"doChange"]});		
		this.e_pph = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Nilai UM PPh", tag:1,  tipeText:ttNilai, text:"0",tag:2,change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Total KasBank", tag:1, tipeText:ttNilai, readOnly:true,text:"0",change:[this,"doChange"]});	
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
				colTitle:["Status","No Bill","No Register","No Polis | Sertifikat","Kurs","N Premi","Brokerage","PPN","PPh","ID"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,80,100,100,60,200,80,100,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],				
				colFormat:[[4,5,6,7,8,],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],																
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
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
			this.stsSGJurnal = "1";	//tervalidasi otomatis		
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			this.c_jenis.setSQL("select no_dokumen, nama from sju_dokumen where modul = 'KB' and kode_lokasi='"+this.app._lokasi+"'",["no_dokumen","nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);	
			
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                                      "where a.kode_spro in ('HUTPPN','PPPHSJU','RKURS','LKURS') and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "RKURS") this.akunRSK = line.flag;								
					if (line.kode_spro == "LKURS") this.akunLSK = line.flag;	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;						
					if (line.kode_spro == "PPPHSJU") this.akunPPh = line.flag;						
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fKbRetur.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fKbRetur.implement({
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
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_polisretur_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText()+"','"+this.e_dok.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBRETUR','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_cust.getText()+"','"+this.e_bank.getText()+"','-')");
										
					var kasIDR = nilaiToFloat(this.e_totIDR.getText());
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+kasIDR+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBRETUR','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");										
					
					
					var titip = Math.round(nilaiToFloat(this.e_titip.getText()) * nilaiToFloat(this.e_kurs2.getText()) * 100) /100;
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_polis.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunTitip+"','Pengembalian premi "+this.cb_polis.rightLabelCaption+"','D',"+titip+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBRETUR','TITIP','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs2.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_titip.getText())+")");							
					var fee = Math.round(nilaiToFloat(this.e_pdpt.getText()) * nilaiToFloat(this.e_kurs2.getText()) * 100) /100;
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_polis.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunFee+"','Pengembalian premi "+this.cb_polis.rightLabelCaption+"','D',"+fee+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBRETUR','FEE','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs2.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_pdpt.getText())+")");
					var ppn = Math.round(nilaiToFloat(this.e_ppn.getText()) * nilaiToFloat(this.e_kurs2.getText()) * 100) /100;
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_polis.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunPPN+"','Koreksi PPN premi "+this.cb_polis.rightLabelCaption+"','D',"+ppn+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBRETUR','PPN','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs2.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_ppn.getText())+")");
					var pph = Math.round(nilaiToFloat(this.e_pph.getText()) * nilaiToFloat(this.e_kurs2.getText()) * 100) /100;
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_polis.getText()+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPh+"','Koreksi PPh premi "+this.cb_polis.rightLabelCaption+"','C',"+pph+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBRETUR','PPH','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs2.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_pph.getText())+")");
					
					sql.add("insert into sju_polisretur_d(no_bukti,kode_lokasi,kode_cust,no_titip,no_polis,nilai_fee,nilai_ppn,nilai_pph,nilai_sk,periode,dc,modul,kode_curr,kurs)  values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_cust.getText()+"','"+this.cb_titip.getText()+"','"+this.cb_polis.getText()+"',"+nilaiToFloat(this.e_pdpt.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph.getText())+","+nilaiToFloat(this.e_sk.getText())+",'"+this.e_periode.getText()+"','D','KBRETUR','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+")");
					
					if (nilaiToFloat(this.e_sk.getText()) > 0) {						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							    "('"+this.e_nb.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunRSK+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_sk.getText())+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBPOLIS','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_sk.getText())+")");				
					}
					if (nilaiToFloat(this.e_sk.getText()) < 0) {						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							    "('"+this.e_nb.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunLSK+"','"+this.e_ket.getText()+"','C',"+Math.abs(nilaiToFloat(this.e_sk.getText()))+",'"+this.app._kodePP+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBPOLIS','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+Math.abs(nilaiToFloat(this.e_sk.getText()))+")");				
					}
					this.stsSGJurnal = "1";			
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
					this.sg1.clear(1); this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_polisretur_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}	
		if (this.stsSimpan == 1) this.doClick();		
		this.doLoad3();
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
			this.doClick();
			var data = this.dbLib.getDataProvider("select kurs from sju_kurs where kode_curr ='"+this.c_curr.getText()+"' and tanggal='"+this.dp_d1.getDateString()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));											
			}
		}
		if (sender == this.cb_cust && this.cb_cust.getText()!="" && this.stsSimpan==1) {
			var strSQL = "select c.no_kas,c.keterangan "+
						 "from sju_hutbayar_d a "+
						 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						 "inner join kas_m c on a.no_bukti = c.no_kas and a.kode_lokasi=c.kode_lokasi "+
						 "left join (select no_titip,kode_lokasi from sju_polisretur_d where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"') d on a.no_bukti=d.no_titip and a.kode_lokasi=d.kode_lokasi "+
						 "where d.no_titip is null and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'KB' and a.nilai_lain > 0 and b.kode_cust='"+this.cb_cust.getText()+"'";
			this.cb_titip.setSQL(strSQL,["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Titipan",true);						
				
			var strSQL = "select distinct a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan "+ 
						 "from sju_polis_termin a inner join "+
						 "        (select no_polis,kode_lokasi "+
						 "         from sju_polisbayar_d where periode <= '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_polis,kode_lokasi) b "+
						 "         on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+						 						 
						 "        inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
						 "where aa.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill<>'-' ";						 
			this.cb_polis.setSQL(strSQL,["no_polis","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Polis",true);						
		}		
		if (sender == this.cb_titip && this.cb_titip.getText()!="" && this.stsSimpan==1) {
			var data = this.dbLib.getDataProvider("select kode_curr,kurs,nilai_lain from sju_hutbayar_d  where no_bukti = '"+this.cb_titip.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);		
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.c_curr2.setText(line.kode_curr);						
					this.e_kurs2.setText(floatToNilai(line.kurs));						
					this.e_titip.setText(floatToNilai(line.nilai_lain));						
				} 
			}
			var data = this.dbLib.getDataProvider("select top 1 kode_akun from kas_j where jenis = 'SLS' and no_kas = '"+this.cb_titip.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);		
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.akunTitip = line.kode_akun;
				} 
			}
		}		
		if (sender == this.c_jenis && this.stsSimpan==1) {
			this.e_bank.setText(this.c_jenis.rightLabelCaption.substr(0,50));
			this.doClick();				
		}																		
		if (sender == this.cb_akun && this.cb_akun.getText()!="") {			
			var data = this.dbLib.getDataProvider("select kode_curr from masakun where kode_akun = '"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);		
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.c_curr.setText(line.kode_curr);						
				} 
			}					
		}
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {				
				this.e_kurs.setText("1"); 
				this.sg1.validasi();
			}
			else {
				if (this.stsSimpan == 1) this.e_kurs.setText("0"); 				
				this.sg1.validasi();
				var data = this.dbLib.getDataProvider("select kurs from sju_kurs where kode_curr ='"+this.c_curr.getText()+"' and tanggal='"+this.dp_d1.getDateString()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));											
				}
			}
		}				
		if (sender == this.e_kurs || sender == this.e_total) {
			if (this.e_kurs.getText() != "" && this.e_total.getText() != "") {
				var tot = Math.round( nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;
				this.e_totIDR.setText(floatToNilai(tot));				
				var sls = Math.round( nilaiToFloat(this.e_total.getText()) * (nilaiToFloat(this.e_kurs.getText()) - nilaiToFloat(this.e_kurs2.getText())) * 100)/100;
				this.e_sk.setText(floatToNilai(sls));				
			}
		}
		
		if ((sender == this.e_titip || sender == this.e_pdpt || sender == this.e_ppn || sender == this.e_pph)) {		
			if (this.e_titip.getText()!="" && this.e_pdpt.getText()!="" && this.e_ppn.getText()!="" && this.e_pph.getText()!="") {			
				var totKB = Math.round((nilaiToFloat(this.e_titip.getText()) + nilaiToFloat(this.e_pdpt.getText()) + nilaiToFloat(this.e_ppn.getText()) - nilaiToFloat(this.e_pph.getText())) * 100) / 100;
				this.e_total.setText(floatToNilai(totKB));
			}
		}
		if (sender == this.cb_polis && this.cb_polis.getText()!="") {
			this.doLoadData();
		}
	},
	doLoadData:function(sender){
		if (this.cb_polis.getText() != "") {
			var pdpt = ppn = pph = 0 ;
			var strSQL = "select a.akun_fee,a.nu,a.kode_lokasi,a.no_bill,a.no_polis,a.keterangan,a.kurs,round(a.total,2) as premi,round(a.fee,2) as fee,round(a.ppn,2) as ppn,round(a.pph,2) as pph "+
			             "from ( "+
						 "select d.akun_fee,a.nu,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan,a.akun_piutang,a.kurs, "+
						 "sum((a.premi-a.diskon+a.p_cost+a.materai)) as total, sum(a.fee) as fee,sum(a.ppn) as ppn, sum(a.pph) as pph  "+ 
						 "from sju_polis_termin a inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
						 "						  inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
						 "						  inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
						 "where aa.kode_cust='"+this.cb_cust.getText()+"' and (a.premi-a.diskon+a.p_cost+a.materai)>0  and a.kode_lokasi='"+this.app._lokasi+"' and no_bill <> '-' "+
						 "group by d.akun_fee,a.nu,aa.kode_cust,a.kode_curr,a.kode_lokasi,a.no_bill,a.no_polis,aa.no_dok,aa.no_dok2,a.akun_piutang,a.kurs "+
						 ")a  "+
						 "inner join sju_polisbayar_d b on a.no_polis = b.no_polis and a.kode_lokasi=b.kode_lokasi and a.nu=b.nu "+						 
						 "where a.no_polis='"+this.cb_polis.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData(["BAYAR",line.no_bill,line.no_polis,line.keterangan,floatToNilai(line.kurs),floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.ppn),floatToNilai(line.pph),line.nu]);
					pdpt += parseFloat(line.fee);
					ppn += parseFloat(line.ppn);
					pph += parseFloat(line.pph);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();			
			this.e_pdpt.setText(floatToNilai(pdpt));
			this.e_ppn.setText(floatToNilai(ppn));
			this.e_pph.setText(floatToNilai(pph));
			this.akunFee = line.akun_fee;
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);				
			}
			this.stsSimpan = 1;
			this.stsSGJurnal = "1";							
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%"+this.c_jenis.getText().substr(2,3);
			var data = this.dbLib.getDataProvider("select isnull(max(no_kas),0) as no_kas from kas_m where no_kas like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_kas == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
					else {
						var idx = parseFloat(line.no_kas.substr(8,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/"+nu+this.c_jenis.getText().substr(2,3));						
					}
				} 
			}
			this.e_bank.setFocus();
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
								this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);		
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},			
	doLoad3:function(sender){																
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen as status,a.ref1+' - '+a.no_bg as no_ref,a.keterangan,a.no_link+' - '+b.nama as cust,a.akun_kb+' - '+c.nama as akun "+
		             "from kas_m a "+
					 "inner join sju_cust b on a.no_link=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "left join (select distinct no_bukti,kode_lokasi from sju_polisbayar_d where no_kashut<>'-' and kode_lokasi='"+this.app._lokasi+"') d on a.no_kas=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
					 "where d.no_bukti is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBRETUR' and a.posted ='F'";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.status,line.no_ref,line.keterangan,line.cust,line.akun]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_link,akun_kb,no_link,no_dokumen,ref1,kode_curr,kurs,jenis,no_bg,nilai "+
							 "from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);					
						this.c_status.setText(line.no_dokumen);					
						this.e_dok.setText(line.no_bg);					
						this.e_ket.setText(line.keterangan);
						this.e_bank.setText(line.ref1);										
						this.cb_akun.setText(line.akun_kb);				
						this.c_curr.setText(line.kode_curr);										
						this.e_kurs.setText(floatToNilai(line.kurs));											
						this.cb_cust.setText(line.no_link);				
						this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_cust='"+line.no_link+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);									
					}
				}
				
				
				var strSQL = "select c.no_kas,c.keterangan "+
							 "from sju_hutbayar_d a "+
							 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
							 "inner join kas_m c on a.no_bukti = c.no_kas and a.kode_lokasi=c.kode_lokasi "+
							 "inner join sju_polisretur_d d on a.no_bukti=d.no_titip and a.kode_lokasi=d.kode_lokasi "+
							 "where d.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'KB' and a.nilai_lain > 0 and b.kode_cust='"+this.cb_cust.getText()+"'";
				this.cb_titip.setSQL(strSQL,["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Titipan",true);						
					
				var strSQL = "select distinct a.no_polis,aa.no_dok+' | '+aa.no_dok2 as keterangan "+ 
							 "from sju_polis_termin a inner join "+
							 "        (select no_polis,kode_lokasi "+
							 "         from sju_polisbayar_d where periode <= '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_polis,kode_lokasi) b "+
							 "         on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+						 						 
							 "        inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "		  inner join sju_polisretur_d d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi "+
							 "where d.no_bukti='"+this.e_nb.getText()+"' and aa.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill<>'-' ";						 
				this.cb_polis.setSQL(strSQL,["no_polis","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Polis",true);						
				
				var strSQL = "select a.no_titip, a.no_polis,round(a.nilai_fee,2) as nilai_fee,round(a.nilai_ppn,2) as nilai_ppn,round(a.nilai_pph,2) as nilai_pph "+
							 "from sju_polisretur_d a  "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.cb_titip.setText(line.no_titip);				
						this.cb_polis.setText(line.no_polis);				
						this.e_pdpt.setText(floatToNilai(line.nilai_fee));				
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));				
						this.e_pph.setText(floatToNilai(line.nilai_pph));				
					}
				}				
			}						
		} catch(e) {alert(e);}
	}
});