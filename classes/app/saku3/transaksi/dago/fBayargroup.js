window.app_saku3_transaksi_dago_fBayargroup = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fBayargroup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fBayargroup";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Group", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[20,10,1000,420], childPage:["Data Pembayaran Group","List Pembayaran Group"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Nama Agen","Total"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					readOnly:true,
					colFormat:[[3],[cfNilai]],					
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Rekening KasBank", multiSelection:false, tag:2});						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});									
		this.e_status = new saiCB(this.pc2.childPage[0],{bound:[780,16,200,20],caption:"Status Bayar",items:["TUNAI","TRANSFER"],readOnly:true,tag:2});				
		this.cb_agen = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No Agen", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_nilaip = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,17,200,22],caption:"Bayar Paket", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Currency",readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_nilait = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,18,200,22],caption:"Bayar Tambah", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,22],caption:"Kurs", tag:2,readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,19,200,22],caption:"Total Bayar (IDR)", tag:9, tipeText:ttNilai, text:"0",readOnly:true});						
		this.bHitung = new button(this.pc2.childPage[0],{bound:[670,19,80,18],caption:"Hitung",click:[this,"doHitung"]});					

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,14,this.pc2.width-5,270], childPage:["Data Registrasi","Kalkulator"]});				
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:12,tag:0,
		            colTitle:["No Registrasi","Jadwal","Paket","No Jamaah","Nama",   "Saldo Paket","Saldo Tambah","Bayar Paket","Bayar Tambah",   "No Closing","Akun Kredit","Kurs Closing"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,  90, 90, 90,90,220,80,100,80,100]],
					colHide:[[9,10,11],[true,true,true]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11]],					
					colFormat:[[5,6,7,8,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					nilaiChange:[this,"doNilaiChange4"],
					autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});

		this.e_nilaiIDR = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"IDR --> USD", tag:9, tipeText:ttNilai, text:"0"});			
		this.bHitung = new button(this.pc1.childPage[1],{bound:[225,19,60,18],caption:"Hitung",click:[this,"doConvert"]});					
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
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
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LKURS','RKURS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "LKURS") this.lKurs = line.flag;
					if (line.kode_spro == "RKURS") this.rKurs = line.flag;
				}
			}	
			this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
		
			this.cb_akun.setSQL("select a.kode_akun, a.nama "+
								 "from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag in ('001','009') ",
								 ["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.akunTitip = "";
			this.c_curr.setText("USD");					 
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fBayargroup.extend(window.childForm);
window.app_saku3_transaksi_dago_fBayargroup.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("delete from dgw_pembayaran where no_kwitansi='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					}
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.app._kodePP+"','KBGROUP','BM','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.e_status.getText()+"','"+this.cb_agen.getText()+"','-')");
					

					if (nilaiToFloat(this.e_nilaip.getText()) > 0) {
						var paketIDR = nilaiToFloat(this.e_nilaip.getText()) * nilaiToFloat(this.e_kurs.getText());
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','-','D',"+paketIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBGROUP','KBPKT','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilaip.getText())+")");
					}
					if (nilaiToFloat(this.e_nilait.getText()) > 0) {															
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','-','D',"+nilaiToFloat(this.e_nilait.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBGROUP','KBTBH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilait.getText())+")");					
					}

					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("insert into dgw_pembayaran (no_kwitansi,no_reg,jadwal,tgl_bayar,paket,bayar_paket,sistem_bayar,bayar_tambahan,kode_lokasi,periode,saldo_t,saldo_p,nilai_t,nilai_p,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(1,i)+"','"+this.dp_d1.getDateString()+"','"+this.sg4.cells(2,i)+"',"+nilaiToFloat(this.sg4.cells(5,i))+",'"+this.e_status.getText()+"',"+nilaiToFloat(this.sg4.cells(6,i))+",'"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg4.cells(6,i))+","+nilaiToFloat(this.sg4.cells(5,i))+","+nilaiToFloat(this.sg4.cells(8,i))+","+nilaiToFloat(this.sg4.cells(7,i))+",'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+")");
								
								if (nilaiToFloat(this.sg4.cells(7,i)) > 0) {
									var paketIDR = nilaiToFloat(this.sg4.cells(7,i)) * nilaiToFloat(this.e_kurs.getText());
									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
											"('"+this.e_nb.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(10,i)+"','Pembayaran a.n Reg "+this.sg4.cells(0,i)+"','C',"+paketIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBGROUP','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg4.cells(7,i))+")");
								
									//hitung selisih kurs pembyaran dan closing jadwal (untuk yg di piutang-kan - saat berangkat blm lunas)								
									if (this.sg4.cells(10,i) != "-") {
										this.kurs_closing = nilaiToFloat(this.sg4.cells(11,i));
										if (this.kurs_closing != 0 && this.kurs_closing != nilaiToFloat(this.e_kurs.getText()))  {
											var sls = (nilaiToFloat(this.e_kurs.getText()) - this.kurs_closing) * nilaiToFloat(this.sg4.cells(7,i));
											if (sls !=0 ) {
												if (sls > 0){ 
													var akunKurs = this.lKurs;
													var dc = "C";
													var dcPiutang = "D";
												}
												else {
													var akunKurs = this.rKurs;
													var dc = "D";
													var dcPiutang = "C";
												}
												sls = Math.abs(sls);

												sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
														"('"+this.e_nb.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',0,'"+akunKurs+"','Selisih Kurs Piutang Closing','"+dc+"',"+sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBGROUP','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+sls+")");
												sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
														"('"+this.e_nb.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg4.cells(10,i)+"','Selisih Kurs Piutang Closing','"+dcPiutang+"',"+sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBGROUP','SLSPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+sls+")");
											}
										}		
									}					
								}
								if (nilaiToFloat(this.sg4.cells(8,i)) > 0) {
									var j = i + 1000;
									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
											"('"+this.e_nb.getText()+"','"+this.sg4.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg4.cells(10,i)+"','Pembayaran a.n Reg "+this.sg4.cells(0,i)+"','C',"+nilaiToFloat(this.sg4.cells(8,i))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBGROUP','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg4.cells(8,i))+")");
								}
							}
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);
				this.sg3.clear(1);
				this.sg4.clear(1);
				this.pc2.setActivePage(this.pc2.childPage[0]);	
				this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
				this.stsSimpan = 1;							
				break;
				
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";	
				this.sg4.validasi(); 
				var totP = totT = 0;
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						totP += nilaiToFloat(this.sg4.cells(7,i));
						totT += nilaiToFloat(this.sg4.cells(8,i));
						
						if ((nilaiToFloat(this.sg4.cells(5,i)) < nilaiToFloat(this.sg4.cells(7,i))) || (nilaiToFloat(this.sg4.cells(6,i)) < nilaiToFloat(this.sg4.cells(8,i)))  ) {
							var j = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Pembayaran melebihi Saldo.[Baris : "+j+"]");
							return false;
						}
					}
				}
				if (nilaiToFloat(this.e_nilaip.getText()) != totP) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar Paket tidak sama dengan rincian");
					return false;						
				}
				if (nilaiToFloat(this.e_nilait.getText()) != totT) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar Tambahan tidak sama dengan rincian");
					return false;						
				}															
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar tidak boleh nol atau kurang");
					return false;						
				}	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
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
				this.simpan();
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from dgw_pembayaran where no_kwitansi='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
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
		if (this.stsSimpan == 1) {
			this.doClick();
		}
	},	
	doClick:function(sender) {
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.cb_agen.setText("","");
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);				
				this.sg3.clear(1);				
				this.sg4.clear(1);
				this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);				
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));			
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){		
		try {
			if (sender == this.c_curr && this.c_curr.getText() != "") {
				var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = 'USD' and kode_lokasi='"+this.app._lokasi+"' order by id desc ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_kurs.setText(floatToNilai(line.kurs));	
					}					
				}
			}
			if (sender == this.cb_agen && this.cb_agen.getText()!= "" && this.stsSimpan==1) {						
				var strSQL = "select a.nama, b.no_reg, b.no_peserta, "+
							 "round((b.harga+b.harga_room) - isnull(g.bayar_p,0),4) as saldo_p, "+
							 " isnull(h.nilai_t,0) - isnull(g.bayar_t,0) as saldo_t, "+
							 "convert(varchar,c.tgl_berangkat,103) as tgl_berangkat, e.nama as paket, case when c.no_closing ='-' then f.kode_akun else f.akun_piutang end as kode_akun, c.no_closing, c.kurs_closing "+
							 "from dgw_peserta a "+
							 "inner join dgw_reg b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
							 "inner join dgw_jadwal c on b.no_paket = c.no_paket and b.no_jadwal = c.no_jadwal and b.kode_lokasi=c.kode_lokasi "+
							 "inner join dgw_paket e on b.no_paket=e.no_paket and b.kode_lokasi=e.kode_lokasi "+	
							 "inner join dgw_jenis_produk f on e.kode_produk=f.kode_produk and e.kode_lokasi=f.kode_lokasi "+	
							
							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai) as nilai_t "+
							 "   from dgw_reg_biaya "+
							 "   where kode_lokasi='"+this.app._lokasi+"' group by no_reg,kode_lokasi  "+							
							 ") h on b.no_reg=h.no_reg and a.kode_lokasi=h.kode_lokasi "+

							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai_p) as bayar_p, sum(nilai_t) as bayar_t "+
							 "   from dgw_pembayaran "+
							 "   where kode_lokasi='"+this.app._lokasi+"' and no_kwitansi <> '"+this.e_nb.getText()+"' group by no_reg,kode_lokasi  "+							
							 ") g on b.no_reg=g.no_reg and a.kode_lokasi=g.kode_lokasi "+

							 "where (((b.harga+b.harga_room) - isnull(g.bayar_p,0) > 0)  or  (isnull(h.nilai_t,0) - isnull(g.bayar_t,0) > 0)) and b.no_agen='"+this.cb_agen.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.no_reg,line.tgl_berangkat,line.paket,line.no_peserta,line.nama,floatToNilai(line.saldo_p),floatToNilai(line.saldo_t),"0","0",line.no_closing,line.kode_akun,floatToNilai(line.kurs_closing)]);
					}
				} 
				else this.sg4.clear(1);

				var strSQL = "select count(*) as jumlah "+
							 "from dgw_peserta a "+
							 "inner join dgw_reg b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
							 "inner join dgw_jadwal c on b.no_paket = c.no_paket and b.no_jadwal = c.no_jadwal "+	
							 
							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai) as nilai_t "+
							 "   from dgw_reg_biaya "+
							 "   where kode_lokasi='"+this.app._lokasi+"' group by no_reg,kode_lokasi  "+							
							 ") h on b.no_reg=h.no_reg and a.kode_lokasi=h.kode_lokasi "+

							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai_p) as bayar_p, sum(nilai_t) as bayar_t "+
							 "   from dgw_pembayaran "+
							 "   where kode_lokasi='"+this.app._lokasi+"' and no_kwitansi <> '"+this.e_nb.getText()+"' group by no_reg,kode_lokasi "+							
							 ") g on b.no_reg=g.no_reg and a.kode_lokasi=g.kode_lokasi "+

							 "where  (((b.harga+b.harga_room) - isnull(g.bayar_p,0) > 0)  or  (isnull(h.nilai_t,0) - isnull(g.bayar_t,0) > 0)) and b.no_agen='"+this.cb_agen.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";						
				var data = this.dbLib.getDataProvider(strSQL,true);						   
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.jmlRow=parseInt(line.jumlah);
					}
				}						
			}		
			if (sender == this.e_kurs || sender == this.e_nilaip || sender == this.e_nilait) {
				var total = (nilaiToFloat(this.e_kurs.getText()) *  nilaiToFloat(this.e_nilaip.getText())) + nilaiToFloat(this.e_nilait.getText());
				total = Math.round(total);				
				this.e_total.setText(floatToNilai(total));
			}	
		}catch(e){
			systemAPI.alert(e);
		}	
	},
	doConvert:function(sender){	
		try{							
			if (this.e_kurs.getText() != "" && this.e_nilaiIDR.getText() != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);				
				var total = (nilaiToFloat(this.e_nilaiIDR.getText()) /  nilaiToFloat(this.e_kurs.getText()));
				total = Math.round(total * 10000) / 10000;
				this.e_nilaip.setText(floatToNilai(total));
			}
		} catch(e){
			alert(e);
		}
	},
	doHitung:function(sender){	
		try{
			//nilai paket = USD							
			if (this.e_nilaip.getText() != "" && this.jmlRow != 0) {
				var total = (nilaiToFloat(this.e_nilaip.getText()) /  this.jmlRow);
				this.nilaiDis = Math.round(total*10000)/10000;
				
				var nTemp = 0;
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						if (nilaiToFloat(this.sg4.cells(5,i))  > 0) {
							if (nilaiToFloat(this.sg4.cells(5,i)) > this.nilaiDis) {
								this.sg4.cells(7,i,this.nilaiDis);
								nTemp += this.nilaiDis;
							}
							else {
								this.sg4.cells(7,i,nilaiToFloat(this.sg4.cells(5,i)));
								nTemp += nilaiToFloat(this.sg4.cells(5,i));
							}
							var j=i;
						}
					}
				}	
				var x = (nilaiToFloat(this.e_nilaip.getText()) * 10000) - (nTemp * 10000);
				x = x + (nilaiToFloat(this.sg4.cells(7,j)) * 10000);
				this.sg4.cells(7,j,x/10000);				
			}
            //nilai tambah = IDR
			if (this.e_nilait.getText() != "" && this.jmlRow != 0) {
				var total = (nilaiToFloat(this.e_nilait.getText()) /  this.jmlRow);
				this.nilaiDis = Math.round(total);
				
				var nTemp = 0;
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (this.sg4.rowValid(i)){
						if (nilaiToFloat(this.sg4.cells(6,i))  > 0) {
							if (nilaiToFloat(this.sg4.cells(6,i)) > this.nilaiDis) {
								this.sg4.cells(8,i,this.nilaiDis);
								nTemp += this.nilaiDis;
							}
							else {
								this.sg4.cells(8,i,nilaiToFloat(this.sg4.cells(6,i)));
								nTemp += nilaiToFloat(this.sg4.cells(6,i));
							}
							var j=i;
						}
					}
				}	
				var x = (nilaiToFloat(this.e_nilait.getText())) - (nTemp);
				x = x + (nilaiToFloat(this.sg4.cells(8,j)));
				this.sg4.cells(8,j,x);				
			}
		} catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_dago_rptKwitansi";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kwitansi='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			this.sg3.clear(1); 
			this.sg4.clear(1); 
			setTipeButton(tbAllFalse);		
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
			this.stsSimpan = 1;			
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																				
		var strSQL = "select a.no_kas, convert(varchar,a.tanggal,103) as tanggal, b.no_agen+' - '+b.nama_agen as agen, a.nilai "+
					 "from kas_m a inner join dgw_agent b on a.ref1=b.no_agen and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F'  and a.modul='KBGROUP' ";			
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
			this.sg3.appendData([line.no_kas,line.tanggal,line.agen,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				this.e_nb.setText(this.sg3.cells(0,row));
				
				var data = this.dbLib.getDataProvider("select b.ref1,a.sistem_bayar,a.kurs,sum(a.nilai_p) as nilai_p,sum(a.nilai_t) as nilai_t,b.akun_kb from dgw_pembayaran a inner join kas_m b on a.no_kwitansi = b.no_kas and a.kode_lokasi=b.kode_lokasi "+
													  "where a.no_kwitansi='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by a.sistem_bayar,a.kurs,b.akun_kb,ref1",true);						   
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.e_nilaip.setText(floatToNilai(line.nilai_p));		
						this.e_nilait.setText(floatToNilai(line.nilai_t));	
						this.cb_akun.setText(line.akun_kb);			
						this.e_status.setText(line.sistem_bayar);
						this.cb_agen.setSQL("select no_agen, nama_agen from dgw_agent where no_agen='"+line.ref1+"' and kode_lokasi='"+this.app._lokasi+"'",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
						this.cb_agen.setText(line.ref1);
					}
				}



				var strSQL = "select a.nama, b.no_reg, b.no_peserta, i.nilai_p,i.nilai_t, "+
							 "round((b.harga+b.harga_room) - isnull(g.bayar_p,0),4) as saldo_p, "+
							 " isnull(h.nilai_t,0) - isnull(g.bayar_t,0) as saldo_t, "+
							 "convert(varchar,c.tgl_berangkat,103) as tgl_berangkat, e.nama as paket, case when c.no_closing ='-' then f.kode_akun else f.akun_piutang end as kode_akun, c.no_closing "+
							 "from dgw_peserta a "+
							 "inner join dgw_reg b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
							 "inner join dgw_jadwal c on b.no_paket = c.no_paket and b.no_jadwal = c.no_jadwal  "+
							 "inner join dgw_paket e on b.no_paket=e.no_paket and b.kode_lokasi=e.kode_lokasi "+	
							 "inner join dgw_jenis_produk f on e.kode_produk=f.kode_produk and e.kode_lokasi=f.kode_lokasi "+	
							 "inner join dgw_pembayaran i on b.no_reg=i.no_reg and b.kode_lokasi=i.kode_lokasi "+	
							
							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai) as nilai_t "+
							 "   from dgw_reg_biaya "+
							 "   where kode_lokasi='"+this.app._lokasi+"' group by no_reg,kode_lokasi  "+							
							 ") h on b.no_reg=h.no_reg and a.kode_lokasi=h.kode_lokasi "+

							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai_p) as bayar_p, sum(nilai_t) as bayar_t "+
							 "   from dgw_pembayaran "+
							 "   where kode_lokasi='"+this.app._lokasi+"' and no_kwitansi <> '"+this.e_nb.getText()+"' group by no_reg,kode_lokasi  "+							
							 ") g on b.no_reg=g.no_reg and a.kode_lokasi=g.kode_lokasi "+

							 "where i.no_kwitansi='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.no_reg,line.tgl_berangkat,line.paket,line.no_peserta,line.nama,floatToNilai(line.saldo_p),floatToNilai(line.saldo_t),floatToNilai(line.nilai_p),floatToNilai(line.nilai_t),line.no_closing,line.kode_akun]);
					}
				} 
				else this.sg4.clear(1);

				var strSQL = "select count(*) as jumlah "+
							 "from dgw_peserta a "+
							 "inner join dgw_reg b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
							 "inner join dgw_jadwal c on b.no_paket = c.no_paket and b.no_jadwal = c.no_jadwal "+	
							 "inner join dgw_pembayaran i on b.no_reg=i.no_reg and b.kode_lokasi=i.kode_lokasi "+	

							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai) as nilai_t "+
							 "   from dgw_reg_biaya "+
							 "   where kode_lokasi='"+this.app._lokasi+"' group by no_reg,kode_lokasi  "+							
							 ") h on b.no_reg=h.no_reg and a.kode_lokasi=h.kode_lokasi "+

							 "left join ("+
							 "   select no_reg,kode_lokasi,sum(nilai_p) as bayar_p, sum(nilai_t) as bayar_t "+
							 "   from dgw_pembayaran "+
							 "   where kode_lokasi='"+this.app._lokasi+"' and no_kwitansi <> '"+this.e_nb.getText()+"' group by no_reg,kode_lokasi "+							
							 ") g on b.no_reg=g.no_reg and a.kode_lokasi=g.kode_lokasi "+

							 "where i.no_kwitansi='"+this.e_nb.getText()+"' and  b.kode_lokasi='"+this.app._lokasi+"' ";						
				var data = this.dbLib.getDataProvider(strSQL,true);						   
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.jmlRow=parseInt(line.jumlah);
					}
				}						
																	
			}
		} catch(e) {alert(e);}
	}
});
