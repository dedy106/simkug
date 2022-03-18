window.app_saku3_transaksi_sapyakes_fSahamJual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fSahamJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fSahamJual";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Saham: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Penjualan","List Penjualan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Progress","Catatan"],
					colWidth:[[4,3,2,1,0],[200,80,350,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,222,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2, visible:false});										
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2, visible:false});						
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Settlement", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18]}); 		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,305], childPage:["Data Saham","Rekap Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:15,tag:0,				
				colTitle:["Kd Saham","Nama Saham","Lbr Unit","Harga Oleh","Harga Buku","Harga Jual","Lbr Jual","Nilai Jual","Gain/Loss", "Komisi","VAT","Levy/STax","PPh","Broker","Nama"],
				colWidth:[[14,13,12,11,10,9, 8,7,6,5,4,3,2,1,0],[100,60,80,80,80,80,  80,100,70,100,100,100,60,170,60]],
				columnReadOnly:[true,[1,2,3,4,5,8,14],[0,6,7,9,10,11,12,13]],
				colFormat:[[2,3,4,5,6,7,8,  9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai ,cfNilai,cfNilai,cfNilai,cfNilai]],				
				buttonStyle:[[0,13],[bsEllips,bsEllips]], 
				pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],				
				defaultRow:1,autoAppend:true,
				});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPage"]});				
				
		this.e_komisi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Nilai Komisi", tag:1, tipeText:ttNilai, text:"0",readOnly:true});	 
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai VAT", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		 
		this.e_net = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Nilai KB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_levi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"N Levy+SalesTax", tag:1, tipeText:ttNilai, text:"0",readOnly:true});  
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,18,200,20],caption:"Total Jual", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_pph = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai PPh", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		 
		this.e_gainlos = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Total Gain/Loss", tag:1,readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bRekap = new button(this.pc1.childPage[1],{bound:[500,17,80,18],caption:"Hit. Rekap",click:[this,"doRekap"]});			
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,195],colCount:4,tag:9, 
		            colTitle:["Saham","Lbr Unit","Jml Lbr","Nilai"],
					colWidth:[[3,2,1,0],[100,100,100,80]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
					
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where flag_aktif='1'",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);							
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('SHMPPH',  'SHMGLMI','SHMGLSWA','SHMSPIMI','SHMSPISWA','SHMNTMI','SHMNTSWA','DRKSHMJ','PPINV','SHMSWA','SHMMI','SHMPIU','SHMPIUGL') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;								
					if (line.kode_spro == "SHMPIU") this.akunPiutang = line.flag;
					if (line.kode_spro == "SHMPIUGL") this.akunPiuGL = line.flag; 
					
					if (line.kode_spro == "SHMSWA") this.akunSWA = line.flag;			
					if (line.kode_spro == "SHMMI") this.akunMI = line.flag;													
					if (line.kode_spro == "SHMNTMI") this.akunNTmi = line.flag;								
					if (line.kode_spro == "SHMNTSWA") this.akunNTswa = line.flag;																		
					if (line.kode_spro == "SHMSPIMI") this.akunSPImi = line.flag;								
					if (line.kode_spro == "SHMSPISWA") this.akunSPIswa = line.flag;													
					if (line.kode_spro == "SHMGLMI") this.akunGLmi = line.flag;								
					if (line.kode_spro == "SHMGLSWA") this.akunGLswa = line.flag;								
					
					if (line.kode_spro == "DRKSHMJ") this.cb_drk.setText(line.flag);		
					if (line.kode_spro == "SHMPPH") this.akunpph = line.flag;
						
				}
			}

			var sql = new server_util_arrayList();
			sql.add("select kode_saham, nama from inv_saham where flag_aktif='1'");			
			sql.add("select kode_broker, nama from inv_broker where flag_aktif='1'");
			this.dbLib.getMultiDataProviderA(sql);
			
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_app.setText(line.nik);
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fSahamJual.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fSahamJual.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			if (this.cb_kelola.getText() != "") {
				for (var i=0;i < this.sg.rows.getLength();i++){						
					this.doChangeCell(this.sg,0,i);		
					this.doChangeCell(this.sg,6,i);		
					this.doChangeCell(this.sg,9,i);		
					this.doChangeCell(this.sg,13,i);							
				}
			}		
			this.doRekap();
		} catch(e) {alert(e);}
	},
	doRekap : function() {
		this.sg2.clear();
		var jumlah = nilai = 0;
		for (var i=0;i < this.sg.rows.getLength();i++){						
			if (this.sg.rowValid(i)) {
				jumlah = nilaiToFloat(this.sg.cells(6,i));
				nilai = nilaiToFloat(this.sg.cells(7,i));
				var isAda = false;
				var idx = totaljml = totalnilai = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}				
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(2,i),floatToNilai(jumlah),floatToNilai(nilai)]);
				} 
				else { 
					totaljml = nilaiToFloat(this.sg2.cells(2,idx));
					totaljml = totaljml + jumlah;
					this.sg2.setCell(2,idx,totaljml);
					
					totalnilai = nilaiToFloat(this.sg2.cells(3,idx));
					totalnilai = totalnilai + nilai;
					this.sg2.setCell(3,idx,totalnilai);
				}								
			}
		}	
	},
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_shmjual_m where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_shmjual_j where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_shmjual_d where no_shmjual='"+this.e_nb.getText()+"' ");					
					
						sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}
					if (this.jKelola == "MI") {
						this.akunSaham = this.akunMI;
						this.akunNT = this.akunNTmi;
						this.akunSPI = this.akunSPImi;
						this.akunGL = this.akunGLmi;						
					}
					else {
						this.akunSaham = this.akunSWA;
						this.akunNT = this.akunNTswa;
						this.akunSPI = this.akunSPIswa;
						this.akunGL = this.akunGLswa;
					}
										
					var nilaiPPh = nilaiToFloat(this.e_pph.getText());
					var nilaiBeban = nilaiToFloat(this.e_komisi.getText())+nilaiToFloat(this.e_ppn.getText())+nilaiToFloat(this.e_levi.getText());
					
					if (nilaiToFloat(this.e_gainlos.getText()) > 0) {						
						var gainlos = nilaiToFloat(this.e_gainlos.getText()) - nilaiBeban;
						var DCgl = "C";						
						if (gainlos < 0) {							
							var gainlos = Math.abs(gainlos);
							var DCgl = "D";							
						}						
					}
					else {
						var gainlos = Math.abs(nilaiToFloat(this.e_gainlos.getText())) + nilaiBeban;
						var DCgl = "D";						
					}
					var nilaiPiutang = nilaiToFloat(this.e_total.getText()) - nilaiBeban + nilaiPPh; // +nilaiPPh 14-01-16 --> diakui di penjualan bukan di kasbank jual	
					
					var nilaiPiuGL = nilaiPiutang - this.nilaiSaham;
					if (nilaiPiuGL > 0) {
						nilaiPiutang = nilaiPiutang - nilaiPiuGL;
					}
					else {
						nilaiPiuGL = 0;
					}

					sql.add("insert into inv_shmjual_m(no_shmjual,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kasjual,nik_buat,no_dokumen,keterangan,kode_drk,kode_kelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,akun_piutang,akun_piugl,nilai_piutang,nilai_piugl,modul,kode_pp,no_app1,progress, nik_app) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','"+this.app._userLog+"',  '-','"+this.e_ket.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_kelola.getText()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_komisi.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_levi.getText())+","+nilaiToFloat(this.e_pph.getText())+",'"+this.akunPiutang+"','"+this.akunPiuGL+"',"+nilaiPiutang+","+nilaiPiuGL+",'SHMJUAL','"+this.kodepp+"','-','0','"+this.cb_app.getText()+"')");
					
					sql.add("insert into inv_shmjual_j(no_shmjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','"+this.e_ket.getText()+"','D',"+nilaiPiutang+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMJUAL','PIUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					sql.add("insert into inv_shmjual_j(no_shmjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunSaham+"','"+this.e_ket.getText()+"','C',"+this.nilaiSaham+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMJUAL','SAHAM','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into inv_shmjual_j(no_shmjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.akunGL+"','"+this.e_ket.getText()+"','"+DCgl+"',"+gainlos+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','SHMJUAL','GAINLOS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");		
																	
					if (nilaiPiuGL > 0) {
						sql.add("insert into inv_shmjual_j(no_shmjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',7,'"+this.akunPiuGL+"','"+this.e_ket.getText()+"','D',"+nilaiPiuGL+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMJUAL','PIUGL','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					}
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(7,i)) != 0 ) {								
								sql.add("insert into inv_shmjual_d (no_shmjual,kode_kelola,kode_saham,h_oleh,h_buku,h_jual,jumlah,n_jual,gainlos, komisi,vat,levi,pph,kode_broker) values "+
								        "('"+this.e_nb.getText()+"','"+this.cb_kelola.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+",  "+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+",'"+this.sg.cells(13,i)+"')");
								
								if (nilaiToFloat(this.sg.cells(3,i)) != nilaiToFloat(this.sg.cells(4,i))) {
									var nilaiSPI = Math.round((nilaiToFloat(this.sg.cells(4,i)) - nilaiToFloat(this.sg.cells(3,i))) * nilaiToFloat(this.sg.cells(6,i)));
								    if (nilaiSPI > 0) {
										var DCnt = "D";
										var DCspi = "C";
									}
									else {
										var DCnt = "C";
										var DCspi = "D";
									}
									nilaiSPI = Math.abs(nilaiSPI);								
									sql.add("insert into inv_shmjual_j(no_shmjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',8,'"+this.akunNT+"','"+this.e_ket.getText()+"','"+DCnt+"',"+nilaiSPI+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','SHMJUAL','NAIKTURUN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
									sql.add("insert into inv_shmjual_j(no_shmjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',9,'"+this.akunSPI+"','"+this.e_ket.getText()+"','"+DCspi+"',"+nilaiSPI+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','SHMJUAL','SPI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");																
								
								}
								
								//14-01-16 --> diakui di penjualan bukan di kasbank jual
								if (nilaiToFloat(this.sg.cells(12,i)) !=0 ) {
									sql.add("insert into inv_shmjual_j(no_shmjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',11,'"+this.akunpph+"','"+'PPH '+this.sg.cells(14,i).substr(0,140) +"','C',"+nilaiToFloat(this.sg.cells(12,i))+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMJUAL','PPH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");							
								}
							}
						}						
					}
					
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod)  "+
								"select no_shmjual,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-','-','-','-' "+
								"from inv_shmjual_j where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
								
								
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
					this.sg.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);
					this.stsSimpan = 1;
					setTipeButton(tbSimpan);					
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				break;
			case "simpan" :	
			case "ubah" :									
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				for (var i = 0; i < this.sg.rows.getLength();i++){
					if (this.sg.rowValid(i)){
						if (this.sg.rowValid(i) && this.sg.cells(13,i) == "-"){
							system.alert(this,"Transaksi tidak valid.","Data Broker di detail tidak boleh - ");
							return false;						
						}
						if (nilaiToFloat(this.sg.cells(6,i)) > nilaiToFloat(this.sg.cells(2,i))) {
							system.alert(this,"Transaksi tidak valid.","Jml unit dijual melebihi stok.");
							return false;												
						}
					}
				}
				for (var i = 0; i < this.sg2.rows.getLength();i++){
					if (this.sg2.rowValid(i)){
						if (nilaiToFloat(this.sg2.cells(2,i)) > nilaiToFloat(this.sg2.cells(1,i))) {
							system.alert(this,"Transaksi tidak valid.","Jml unit dijual melebihi stok. Saham : "+this.sg2.cells(0,i));
							return false;												
						}
					}
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
					sql.add("delete from inv_shmjual_m where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmjual_j where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmjual_d where no_shmjual='"+this.e_nb.getText()+"' ");					
					
					sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {						
			var strSQL = "select jenis from inv_kelola where kode_kelola ='"+this.cb_kelola.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.jKelola = line.jenis;
				}				
			}			
			if (this.stsSimpan == 1) this.sg.clear(1);			
		}				
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1);			
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shmjual_m","no_shmjual",this.app._lokasi+"-SHJ"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0 && this.cb_kelola.getText()!=""){
					this.standarLib.showListData(this, "Daftar Saham",sender,undefined, 
						"select a.kode_saham, a.nama from inv_saham a inner join inv_saham_d b on a.kode_saham=b.kode_saham and b.kode_kelola='"+this.cb_kelola.getText()+"' where a.flag_aktif='1'",
						"select count(a.kode_saham)  from inv_saham a inner join inv_saham_d b on a.kode_saham=b.kode_saham and b.kode_kelola='"+this.cb_kelola.getText()+"' where a.flag_aktif='1'",
						["a.kode_saham","a.nama"],"and",["Kode","Nama"],false);				
				}				
				if (col == 13){
					this.standarLib.showListData(this, "Daftar Broker",sender,undefined, 
												  "select kode_broker, nama from inv_broker where flag_aktif='1'",
												  "select count(kode_broker) from inv_broker where flag_aktif='1'",
												  ["kode_broker","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){					
		if (col == 0 && this.sg.cells(0,row)!=""){			
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var saham = this.dataSaham.get(sender.cells(0,row));
				if (saham) sender.cells(1,row,saham);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Saham "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkSaham");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}
				sender.onChange.set(this,"doChangeCell");
			}
			
			this.nik_user=this.app._nikUser;						
			if (this.stsSimpan == 1) var sql = "call sp_saham_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
			else var sql = "call sp_saham_tmp_edit ('"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";			
			this.dbLib.execQuerySync(sql);	
			
			var strSQL = "select a.jumlah,a.h_oleh,a.h_buku from inv_saham_tmp a inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
						 "where a.kode_saham='"+this.sg.cells(0,row)+"' and a.kode_kelola = '"+this.cb_kelola.getText()+"' and a.nik_user='"+this.nik_user+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.sg.cells(2,row,parseFloat(line.jumlah));
				this.sg.cells(3,row,parseFloat(line.h_oleh));				
				this.sg.cells(4,row,parseFloat(line.h_buku));					
				/*mati
				this.sg.cells(5,row,"0");	
				this.sg.cells(6,row,"0");	
				this.sg.cells(7,row,"0");	
				this.sg.cells(8,row,"0");								
				this.sg.cells(9,row,"0");				
				this.sg.cells(10,row,"0");				
				this.sg.cells(11,row,"0");				
				this.sg.cells(12,row,"0");												
				*/
			} 
		}
		if (col == 6 || col == 7) {
			if (this.sg.cells(7,row) != "" && this.sg.cells(6,row) != "") {								
				this.sg.cells(5,row,parseFloat(nilaiToFloat(this.sg.cells(7,row)) /  nilaiToFloat(this.sg.cells(6,row))));
				this.sg.cells(8,row,floatToNilai(Math.round(nilaiToFloat(this.sg.cells(7,row)) -  Math.round(nilaiToFloat(this.sg.cells(3,row)) * nilaiToFloat(this.sg.cells(6,row))))));		
			
				/*dimatikan
				var komisi = Math.round(nilaiToFloat(this.sg.cells(7,row)) * 0.14273/100);
				var vat = Math.round(10/100 * komisi);
				var levi = Math.round(nilaiToFloat(this.sg.cells(7,row)) * 0.14300/100);
				var pph = Math.round(komisi*2/100);
				this.sg.cells(9,row,floatToNilai(komisi));	
				this.sg.cells(10,row,floatToNilai(vat));	
				this.sg.cells(11,row,floatToNilai(levi));	
				this.sg.cells(12,row,floatToNilai(pph));					
				*/
			}		
			this.sg.validasi();
		}				
		if (col == 13 && this.sg.cells(13,row)!=""){			
			sender.onChange.set(undefined,undefined);
			var broker = this.dataBroker.get(sender.cells(13,row));
			if (broker) sender.cells(14,row,broker);
			else {                                    
				if (trim(sender.cells(13,row)) != "") system.alert(this,"Kode Broker "+sender.cells(13,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBroker");                
				sender.cells(13,row,"");
				sender.cells(14,row,"");
				sender.onChange.set(this,"doChangeCell");
				return false;
			}
			sender.onChange.set(this,"doChangeCell");			
		}		
		if (col == 9 || col == 10 || col == 11 || col == 12) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{			
			this.nilaiSaham = 0;
			var tot = gainlos = komisi = vat = levi = pph = nilaikb = 0 ;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg.cells(7,i));				
					gainlos += nilaiToFloat(this.sg.cells(8,i));									
					this.nilaiSaham += nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(6,i));				
					
					komisi += nilaiToFloat(this.sg.cells(9,i));				
					vat += nilaiToFloat(this.sg.cells(10,i));				
					levi += nilaiToFloat(this.sg.cells(11,i));				
					pph += nilaiToFloat(this.sg.cells(12,i));		

					nilaikb += nilaiToFloat(this.sg.cells(7,i)) - nilaiToFloat(this.sg.cells(9,i)) - nilaiToFloat(this.sg.cells(10,i)) - nilaiToFloat(this.sg.cells(11,i)) + nilaiToFloat(this.sg.cells(12,i)) ;		
				}
			}			
			this.nilaiSaham = Math.round(this.nilaiSaham);
			this.e_total.setText(floatToNilai(tot));
			this.e_gainlos.setText(floatToNilai(gainlos));												
			
			this.e_komisi.setText(floatToNilai(komisi));						
			this.e_ppn.setText(floatToNilai(vat));						
			this.e_levi.setText(floatToNilai(levi));						
			this.e_pph.setText(floatToNilai(pph));						
			
			this.e_net.setText(floatToNilai(nilaikb));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataSaham = new portalui_arrayMap();
							this.dataBroker = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataSaham.set(line.kode_saham, line.nama);
								}
							}	
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataBroker.set(line.kode_broker, line.nama);
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
			this.sg.clear(1);
			this.sg2.clear(1);
			this.sg3.clear(1);
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);					
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_shmjual,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.progress,b.catatan "+
		             "from inv_shmjual_m a "+
					 "     left join inv_app2_m b on a.no_app1=b.no_app  and b.no_flag='-' and b.form='APPMAN' "+					 
					 "where a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' and a.modul='SHMJUAL'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page=1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_shmjual,line.tgl,line.keterangan,line.progress,line.catatan]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_shmjual_m where no_shmjual= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.cb_drk.setText(line.kode_drk);
						this.cb_kelola.setText(line.kode_kelola);
						this.dp_d2.setText(line.tgl_set);	
						this.cb_app.setText(line.nik_app);										
					}
				}
				
				this.nik_user=this.app._nikUser;						
				var sql = "call sp_saham_tmp_edit ('"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";			
				this.dbLib.execQuerySync(sql);	
				
				var strSQL = "select b.kode_saham,b.nama,a.jumlah as jumlah,d.h_oleh,d.h_buku,d.h_jual,d.jumlah as jml,d.n_jual,gainlos,d.komisi,d.vat,d.levi,d.pph,d.kode_broker,e.nama as broker "+
							 "from inv_saham_tmp a inner join inv_saham b on a.kode_saham=b.kode_saham "+						 
							 "     inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
							 "     inner join inv_shmjual_d d on a.kode_saham=d.kode_saham and a.kode_kelola=d.kode_kelola "+
							 "     inner join inv_broker e on d.kode_broker=e.kode_broker "+
							 "where d.no_shmjual = '"+this.e_nb.getText()+"' and a.nik_user='"+this.nik_user+"' ";			
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																													
						this.sg.appendData([line.kode_saham,line.nama,floatToNilai(line.jumlah),floatToNilai(line.h_oleh),floatToNilai(line.h_buku),floatToNilai(line.h_jual),floatToNilai(line.jml),floatToNilai(line.n_jual),floatToNilai(line.gainlos), floatToNilai(line.komisi),floatToNilai(line.vat),floatToNilai(line.levi),floatToNilai(line.pph),line.kode_broker,line.broker]);															
					}					
				} else this.sg.clear(1);															
				
				this.doRekap();
			}
		} catch(e) {alert(e);}
	}
});