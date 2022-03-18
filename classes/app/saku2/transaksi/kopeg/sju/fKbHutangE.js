window.app_saku2_transaksi_kopeg_sju_fKbHutangE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fKbHutangE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fKbHutangE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pembayaran Premi: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});				
		this.c_jenis = new saiLabelEdit(this,{bound:[20,15,202,20],caption:"Jenis Dok", readOnly:true});				
		this.c_status = new saiCB(this,{bound:[20,12,202,20],caption:"Status",items:["MCM","TRANSFER","CHEQUE","GIRO"], readOnly:true,tag:2});
		this.e_bank = new saiLabelEdit(this,{bound:[20,14,320,20],caption:"Bank - No Ref.",maxLength:30});				
		this.e_dok = new saiLabelEdit(this,{bound:[350,14,120,20],caption:"",  labelWidth:0, maxLength:30});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_kompen = new saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Kompensasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.cb_akun = new saiCBBL(this,{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});									
		this.e_saldo = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total Saldo+PPh", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.c_curr = new saiLabelEdit(this,{bound:[20,14,140,20],caption:"Curr - Kurs", tag:2, readOnly:true, text:"IDR",change:[this,"doChange"]});				
		this.e_kurs = new saiLabelEdit(this,{bound:[170,14,50,20],caption:"", tag:1, labelWidth:0, readOnly:true, tipeText:ttNilai, text:"1",tag:2,change:[this,"doChange"]});				
		this.e_total = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Total KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.cb_vendor = new saiCBBL(this,{bound:[20,19,220,20],caption:"Penanggung", readOnly:true});							
		this.e_beban = new saiLabelEdit(this,{bound:[720,19,200,20],caption:"Total Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,280], childPage:["Data Invoice","Jurnal Sisa","Data Kompensasi"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:12,tag:0,
				colTitle:["Status","No Bukti","No Polis","Keterangan","Akun AP","Kurs","Tagihan","PPh","Nilai Bayar","Sisa","Sls Kurs","ID"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[50,80,80,100,80,100,60,60,150,150,80,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,9,10,11],[8]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],
				colFormat:[[5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],								
				dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Kurs","Nilai","Kode PP","Nama PP"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,60,80,80,250,50,200,80]],					
					columnReadOnly:[true,[1,2,4,5,7],[0,3,6]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[5,6],[cfNilai,cfNilai]],checkItem:true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		this.e_sls = new saiLabelEdit(this.sgn,{bound:[680,1,200,20],caption:"Tot Jurnal Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["No Batal","No Bukti","No Polis","No KasBank","Keterangan","Kurs","Nilai","Kode Akun"],
					colWidth:[[7,6,5,4,3,2,1,0],[60,100,60,200,120,150,120,100]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],					
					colFormat:[[5,6],[cfNilai,cfNilai]],checkItem:true,
					buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
				
		this.rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
	
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                                      "where a.kode_spro in ('PPPHSJU','AKUNOI','AKUNOE','RKURS','LKURS') and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNOI") { this.akunOI = line.flag;	this.namaOI = line.nama;}							
					if (line.kode_spro == "AKUNOE") { this.akunOE = line.flag; this.namaOE = line.nama; }
					if (line.kode_spro == "RKURS") this.akunRSK = line.flag;								
					if (line.kode_spro == "LKURS") this.akunLSK = line.flag;													
					if (line.kode_spro == "PPPHSJU") this.akunPPH = line.flag;	
				}
			}
			
			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);			
			
			this.stsSGJurnal = "1";	//tervalidasi otomatis					
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fKbHutangE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fKbHutangE.implement({
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_hutbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update sju_polisbayar_d set no_kashut = '-' where no_kashut='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update sju_batalpolis_m set no_kashut='-' where no_kashut='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText()+"','"+this.e_dok.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBHUTPOL','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_vendor.getText()+"','"+this.e_bank.getText()+"','-')");
										
					var kasIDR = Math.round(nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText()) * 100)/100;
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+kasIDR+",'"+this.app._kodePP+"','-','-','"+this.cb_vendor.getText()+"','"+this.app._lokasi+"','KBHUTPOL','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");
										
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BAYAR"){
							var j=i+1;
							var nilaiHut = nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)) - nilaiToFloat(this.sg1.cells(7,i));
							var nilaiHutIDR = Math.round(nilaiHut * nilaiToFloat(this.sg1.cells(5,i)) * 100)/100;
							
							var pph = nilaiToFloat(this.sg1.cells(7,i));
							var pphIDR = Math.round(pph * nilaiToFloat(this.e_kurs.getText()) * 100)/100;		
							
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(4,i)+"','hutang premi atas "+this.cb_vendor.rightLabelCaption+" polis "+this.sg1.cells(3,i)+"','D',"+nilaiHutIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBHUTPOL','AP','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.sg1.cells(5,i))+",'"+this.app._userLog+"',getdate(),'-',"+nilaiHut+")");
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunPPH+"','pph atas polis "+this.sg1.cells(3,i)+"','D',"+pphIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBHUTPOL','PPH','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+pph+")");

							sql.add("insert into sju_hutbayar_d(no_bukti,kode_lokasi,no_bill,no_polis,nu,akun_hutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"',"+this.sg1.cells(11,i)+",'"+this.sg1.cells(4,i)+"',"+parseNilai(this.sg1.cells(8,i))+","+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(11,i))+",'"+this.e_periode.getText()+"','D','KB','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+")");														
							
							sql.add("update sju_polisbayar_d set no_kashut='"+this.e_nb.getText()+"' where nu="+this.sg1.cells(11,i)+" and no_bill ='"+this.sg1.cells(1,i)+"' and no_polis='"+this.sg1.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}		
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var nilaiSlsIDR = Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.sg.cells(5,i)) * 100)/100;
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiSlsIDR+",'"+this.sg.cells(6,i)+"','-','-','-','"+this.app._lokasi+"','KBPOLIS','SLS','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.app._userLog+"',getdate(),'-','"+nilaiToFloat(this.sg.cells(5,i))+"')");								
							}
						}
					}
					if (this.nilaiSK < 0) {						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							    "('"+this.e_nb.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunLSK+"','"+this.e_ket.getText()+"','C',"+Math.abs(this.nilaiSK)+",'"+this.app._kodePP+"','-','-','"+this.cb_vendor.getText()+"','"+this.app._lokasi+"','KBHUTPOL','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+Math.abs(this.nilaiSK)+")");				
					}
					if (this.nilaiSK > 0) {						
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							    "('"+this.e_nb.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunRSK+"','"+this.e_ket.getText()+"','D',"+this.nilaiSK+",'"+this.app._kodePP+"','-','-','"+this.cb_vendor.getText()+"','"+this.app._lokasi+"','KBHUTPOL','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+this.nilaiSK+")");				
					}
					//------- kompensasi 
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) {
							sql.add("update sju_batalpolis_m set no_kashut='"+this.e_nb.getText()+"' where no_batal='"+this.sg2.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							var nilaiPiuIDR = Math.round(nilaiToFloat(this.sg2.cells(6,i)) * nilaiToFloat(this.sg2.cells(5,i)) * 100)/100;		
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(7,i)+"','Kompensasi Polis : "+this.sg2.cells(2,i)+"','C',"+nilaiPiuIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBHUTPOL','KOMPEN','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.sg2.cells(5,i))+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg2.cells(6,i))+")");
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
					this.sg1.clear(1); 					
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.stsSGJurnal = "0";
				this.sg1.validasi();												
				for (var i = 0; i < this.sg1.rows.getLength();i++){
					if (this.sg1.rowValid(i)){											
						if (this.sg1.cells(0,i) == "BAYAR") {
							if ((nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(7,i))) != (nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)))) {
								var j = i+1;
								system.alert(this,"Transaksi tidak valid.","Nilai Bayar + Sisa tidak sama dengan Tagihan + PPh. Baris : "+j);
								return false;						
							}
						}
					}
				}				
				if (nilaiToFloat(this.e_beban.getText()) != nilaiToFloat(this.e_sls.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Selisih tidak sesuai dengan Total Jurnal Selisih.");
					return false;						
				}				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
					sql.add("delete from sju_hutbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update sju_polisbayar_d set no_kashut = '-' where no_kashut='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update sju_batalpolis_m set no_kashut='-' where no_kashut='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	},
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_kas, keterangan from kas_m where modul = 'KBHUTPOL' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No KB","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.no_bg,a.keterangan,a.jenis,a.no_link,b.nama as nama_vendor,a.ref1,a.akun_kb,a.kurs,a.kode_curr "+
			           "from kas_m a inner join sju_vendor b on a.no_link=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+			           
					   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.jenis);					
					this.c_status.setText(line.no_dokumen);					
					this.e_dok.setText(line.no_bg);					
					this.e_ket.setText(line.keterangan);
					this.e_bank.setText(line.ref1);										
					this.cb_akun.setText(line.akun_kb);				
					this.c_curr.setText(line.kode_curr);										
					this.e_kurs.setText(floatToNilai(line.kurs));				
					this.cb_vendor.setText(line.no_link,line.nama_vendor);					
										
					this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_curr='"+this.c_curr.getText()+"' and b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);			
				} 
			}									
			this.stsSGJurnal = "0";			
			var strSQL = "select a.nu,a.no_bill,a.no_polis,aa.no_dok as keterangan,a.akun_hutang,a.kurs,round(a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn,2) as nilai_hut,a.pph,d.nilai_kas,d.nilai_lain,d.nilai_sk "+
						 "from sju_polis_termin a inner join sju_polisbayar_d b on a.nu=b.nu and a.no_bill=b.no_bill and a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+						 
						 "                        inner join sju_quo_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+
						 "                        inner join sju_hutbayar_d d on b.no_kashut=d.no_bukti and b.kode_lokasi=d.kode_lokasi and d.nu=b.nu and d.no_bill=b.no_bill and d.no_polis=b.no_polis "+
						 "        				  inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
						 "where b.no_kashut = '"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData(["BAYAR",line.no_bill,line.no_polis,line.keterangan,line.akun_hutang,floatToNilai(line.kurs),floatToNilai(line.nilai_hut),floatToNilai(line.pph),floatToNilai(line.nilai_kas),floatToNilai(line.nilai_lain),floatToNilai(line.nilai_sk),line.nu]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
			var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.kurs,a.nilai_curr,a.kode_pp,c.nama as nama_pp "+
						 "from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "where a.jenis = 'SLS' and a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.kurs),floatToNilai(line.nilai_curr),line.kode_pp,line.nama_pp]);
				}
			} else this.sg.clear(1);
			this.sg.validasi();				
			
			var strSQL = "select a.no_batal,b.no_polis,b.no_dok,a.no_kas,c.keterangan,c.kurs,a.nilai,a.akun_piutang "+
			             "from sju_batalpolis_m a "+
			             "inner join sju_polis_m b on a.keterangan=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						 "inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_kashut='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.no_batal,line.no_polis,line.no_dok,line.no_kas,line.keterangan,floatToNilai(line.kurs),floatToNilai(line.nilai),line.akun_piutang]);
				}
			}
			this.sg2.validasi();							
			this.stsSGJurnal = "1";			
		}		
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg1.validasi();
			}
			else {
				this.e_kurs.setReadOnly(false); this.sg1.validasi();
			}
		}				
		if (sender == this.e_kurs) this.sg1.validasi();
			
	},	
	doNilaiChange1: function(){
		try{
			//skurs dihitung dr kabank yg dipiutangkan pph tidak dihitung 
			if (this.stsSGJurnal == "1") { this.sg.clear(); this.e_sls.setText("0"); }
			this.nilaiSK = 0;
			var beban = nilai = saldo = kompen = 0;									
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="BAYAR" && this.sg1.cells(6,i) != "" && this.e_kurs.getText()!="") {
					if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "" && this.sg1.cells(8,i) != "" && this.sg1.cells(7,i) != "") {
						this.sg1.cells(10,i,floatToNilai(Math.round((nilaiToFloat(this.e_kurs.getText())-nilaiToFloat(this.sg1.cells(5,i))) * (nilaiToFloat(this.sg1.cells(8,i))-nilaiToFloat(this.sg1.cells(7,i)))  *100)/100));
						this.nilaiSK += nilaiToFloat(this.sg1.cells(10,i));
					}
					saldo += nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(7,i));					
					nilai += nilaiToFloat(this.sg1.cells(8,i));					
					beban += nilaiToFloat(this.sg1.cells(9,i));					
					
					if (this.stsSGJurnal == "1") {
						var nilai2 = Math.abs(nilaiToFloat(this.sg1.cells(9,i)));
						var kurs = Math.abs(nilaiToFloat(this.sg1.cells(5,i)));
						if (nilaiToFloat(this.sg1.cells(9,i)) != 0) {
							if (nilaiToFloat(this.sg1.cells(9,i)) < 0) this.sg.appendData([this.akunOE,this.namaOE,"D",this.sg1.cells(2,i),floatToNilai(kurs),nilai2,this.app._kodePP,this.app._namaPP]);
							else this.sg.appendData([this.akunOI,this.namaOI,"C",this.sg1.cells(2,i),floatToNilai(kurs),nilai2,this.app._kodePP,this.app._namaPP]);
						}
					}					
				}
			}				
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(6,i) != "") {
					kompen += nilaiToFloat(this.sg2.cells(6,i));
					//dibalik ngitungnya
					this.nilaiSK += Math.round((nilaiToFloat(this.sg2.cells(5,i))-nilaiToFloat(this.e_kurs.getText())) * nilaiToFloat(this.sg2.cells(6,i))  * 100)/100;
				}
			}
			nilai = nilai - kompen;
			this.e_kompen.setText(floatToNilai(kompen));
			this.e_saldo.setText(floatToNilai(saldo));
			this.e_total.setText(floatToNilai(nilai));			
			this.e_beban.setText(floatToNilai(beban));					
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},								
	doChangeCell1: function(sender, col, row){				
		if (col == 8) {	
			if (this.sg1.cells(8,row) != "0" && this.sg1.cells(8,row)!= "" && this.sg1.cells(7,row)!= "" && this.sg1.cells(6,row)!= "") {
				this.sg1.cells(0,row,"BAYAR");								
				var sls = Math.round((nilaiToFloat(this.sg1.cells(6,row)) + nilaiToFloat(this.sg1.cells(7,row)) - nilaiToFloat(this.sg1.cells(8,row))) * 100)/100;				
				this.sg1.cells(9,row,sls);
				this.sg1.validasi();
			}
		}
		if (col == 0) {	
			if (this.sg1.cells(0,row) != "BAYAR") {
				this.sg1.cells(8,row,"0");
				this.sg1.cells(9,row,"0");
			}
			this.sg1.validasi();
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
							this.dataAkun = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
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
			this.sg1.clear(1); this.sg.clear(1); 			
			setTipeButton(tbUbahHapus);						
		} catch(e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 5) && (this.sg.cells(5,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 6) {
			if (sender.cells(6,row) != "") {
				var pp = this.dataPP.get(sender.cells(6,row));
				if (pp) sender.cells(7,row,pp);
				else {
					if (trim(sender.cells(6,row)) != "") system.alert(this,"Kode PP "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(6,row,"");
					sender.cells(7,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD -= nilaiToFloat(this.sg.cells(5,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totD += nilaiToFloat(this.sg.cells(5,i));
				}
			}			
			this.e_sls.setText(floatToNilai(totD));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"D");						
					}
				break;			
			case 6 : 
					if ((this.sg.cells(6,row) == "") && (row > 0)) {
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
						this.sg.setCell(7,row,this.sg.cells(7,(row-1)));
					}
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 6){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
			}			
			if (sender == this.sg2) {
				if (col == 0 && this.c_curr.getText()!="" && this.cb_vendor.getText()!=""){
					this.standarLib.showListData(this, "Daftar Bukti Pembatalan",sender,undefined, 
						    "select a.no_batal,a.keterangan from sju_batalpolis_m a inner join sju_polis_m b on a.keterangan=b.no_polis and a.kode_lokasi=b.kode_lokasi where a.no_kas<>'-' and (a.no_kashut='-' or a.no_kashut='"+this.e_nb.getText()+"') and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_curr='"+this.c_curr.getText()+"' and b.kode_vendor='"+this.cb_vendor.getText()+"'",
							"select count(a.no_batal) from sju_batalpolis_m a inner join sju_polis_m b on a.keterangan=b.no_polis and a.kode_lokasi=b.kode_lokasi where a.no_kas<>'-' and (a.no_kashut='-' or a.no_kashut='"+this.e_nb.getText()+"') and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_curr='"+this.c_curr.getText()+"' and b.kode_vendor='"+this.cb_vendor.getText()+"'",
							["a.no_batal","a.keterangan"],"and",["No Bukti","No Polis"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){						
		if (col == 0) {			
			var strSQL = "select b.no_dok,a.no_kas,c.keterangan,c.kurs,a.nilai,a.akun_piutang "+
			             "from sju_batalpolis_m a "+
			             "inner join sju_polis_m b on a.keterangan=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						 "inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_batal='"+this.sg2.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.sg2.cells(2,row,line.no_dok);
					this.sg2.cells(3,row,line.no_kas);
					this.sg2.cells(4,row,line.keterangan);
					this.sg2.cells(5,row,floatToNilai(line.kurs));
					this.sg2.cells(6,row,floatToNilai(line.nilai));
					this.sg2.cells(7,row,line.akun_piutang);
				} 
			}
			this.doNilaiChange1();
		}
	}
});