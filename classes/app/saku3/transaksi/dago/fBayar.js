window.app_saku3_transaksi_dago_fBayar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fBayar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fBayar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[20,10,1000,420], childPage:["Data Pembayaran","List Pembayaran"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,
		            colTitle:["No Bukti","Tanggal","Nama Jamaah","Paket","Jadwal","Nilai Paket","Nilai Tambahan","Total"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,80,200,200,80,100]],
					readOnly:true,
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],					
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Rekening KasBank", multiSelection:false, tag:2});						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});									
		this.cb_regis = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"No Registrasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_jadwal = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Jadwal",tag:3, readOnly:true});										
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Nama Jamaah",tag:3, readOnly:true});		
		this.e_paket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Paket",tag:3, readOnly:true});			
		this.e_status = new saiCB(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Status Bayar",items:["TUNAI","TRANSFER"],readOnly:true,tag:2});		
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Currency",readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[270,16,200,22],caption:"Kurs", tag:3,readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_nilaip = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Bayar Paket", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});							
		this.e_nilait = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,22],caption:"Bayar Tambahan", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});										
		this.e_harga = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Total Paket",tag:3,readOnly:true , tipeText:ttNilai, text:"0",change:[this,"doChange"]});																				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[270,17,200,20],caption:"Saldo Paket", tag:3, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_tambahan = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Tot Biaya+ (IDR)",tag:3, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});																		
		this.e_saldot = new saiLabelEdit(this.pc2.childPage[0],{bound:[270,19,200,20],caption:"Saldo Biaya+ (IDR)", tag:3, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,22],caption:"Total Bayar (IDR)", tag:3, tipeText:ttNilai, text:"0",readOnly:true});						

		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,14,this.pc2.width-5,179], childPage:["Rincian Biaya","Rincian Pembayaran","Kalkulator Kurs"]});				
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,169],colCount:6,tag:9,
		            colTitle:["Kode","Nama Biaya","Curr","Tarif","Jumlah","Nilai"],
					colWidth:[[5,4,3,2,1,0],[150,150,150,80,300,100]],
					columnReadOnly:[true,[0,1,2,3,4,5]],					
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
					nilaiChange:[this,"doNilaiChange4"],
					autoAppend:false,defaultRow:1});		
					
		this.sg5 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,169],colCount:7,tag:9,
		            colTitle:["No Bukti","Tgl Bayar","Curr","Kurs","Nilai Paket","Nilai Tambahan (IDR)","Total (IDR)"],
					colWidth:[[6,5,4,3,2,1,0],[100,110,100,100,80,100,100]],
					readOnly:true,					
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});	
					
		this.e_nilaiIDR = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,19,200,20],caption:"IDR --> USD", tag:9, tipeText:ttNilai, text:"0"});			
		this.bHitung = new button(this.pc1.childPage[2],{bound:[225,19,60,18],caption:"Hitung",click:[this,"doConvert"]});					
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		
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

			this.cb_regis.setSQL("select a.no_reg, b.nama "+
								 "from dgw_reg a inner join dgw_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
								 "where a.kode_lokasi='"+this.app._lokasi+"' ",
								 ["a.no_reg","a.nama"],false,["No Registrasi","Nama"],"and","Data Registrasi",true);
		
			this.cb_akun.setSQL("select a.kode_akun, a.nama "+
								 "from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag in ('001','009') ",
								 ["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
								 
			this.akunTitip = "";

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fBayar.extend(window.childForm);
window.app_saku3_transaksi_dago_fBayar.implement({
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
					var bayarPaketIDR = nilaiToFloat(this.e_nilaip.getText()) * nilaiToFloat(this.e_kurs.getText());
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_regis.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','Pembayaran a.n "+this.e_nama.getText()+"','"+this.app._kodePP+"','KBREG','BM','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','Pembayaran a.n "+this.e_nama.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBREG','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");										
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunTitip+"','Pembayaran a.n "+this.e_nama.getText()+"','C',"+bayarPaketIDR+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBREG','TTPPAKET','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilaip.getText())+")");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunTitip+"','Pembayaran a.n "+this.e_nama.getText()+"','C',"+nilaiToFloat(this.e_nilait.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBREG','TTPTAMBAH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilait.getText())+")");
					
					sql.add("insert into dgw_pembayaran (no_kwitansi,no_reg,jadwal,tgl_bayar,paket,bayar_paket,sistem_bayar,bayar_tambahan,kode_lokasi,periode,saldo_t,saldo_p,nilai_t,nilai_p,kode_curr,kurs) values  "+ 
							"('"+this.e_nb.getText()+"','"+this.cb_regis.getText()+"','"+this.e_jadwal.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_paket.getText()+"',"+nilaiToFloat(this.e_harga.getText())+",'"+this.e_status.getText()+"',"+nilaiToFloat(this.e_tambahan.getText())+",'"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_saldot.getText())+","+nilaiToFloat(this.e_saldo.getText())+","+nilaiToFloat(this.e_nilait.getText())+","+nilaiToFloat(this.e_nilaip.getText())+",'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+")");
					
					//hitung selisih kurs pembyaran dan closing jadwal (untuk yg di piutang-kan - saat berangkat blm lunas)
					if (this.kurs_closing != 0 && this.kurs_closing != nilaiToFloat(this.e_kurs.getText()))  {
						var sls = (nilaiToFloat(this.e_kurs.getText()) - this.kurs_closing) * nilaiToFloat(this.e_nilaip.getText());
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
									"('"+this.e_nb.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+akunKurs+"','Selisih Kurs Piutang Closing','"+dc+"',"+sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBREG','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+sls+")");
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_regis.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunTitip+"','Selisih Kurs a.n "+this.e_nama.getText()+"','"+dcPiutang+"',"+sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBREG','SLSPIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+sls+")");
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
				this.pc2.setActivePage(this.pc2.childPage[0]);								
				break;
				
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";		
				if (nilaiToFloat(this.e_nilaip.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar Paket melebihi Saldo Paket.");
					return false;						
				}	
				if (nilaiToFloat(this.e_nilait.getText()) > nilaiToFloat(this.e_saldot.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar Biaya Tambahan melebihi Saldo Biaya Tambahan.");
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
				this.cb_regis.setText("","");
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);				
				this.sg3.clear(1);				
				this.sg4.clear(1);
				this.sg5.clear(1);					
			}			

			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));			
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){		
		try{
			if (sender == this.cb_regis && this.cb_regis.getText()!= "") {		
				var data = this.dbLib.getDataProvider("select a.nama,d.tgl_berangkat,e.nama as paket,e.kode_curr,b.harga + b.harga_room as harga_tot,  case when d.no_closing ='-' then f.kode_akun else f.akun_piutang end as kode_akun,d.kurs_closing "+
							   "from dgw_peserta a inner join dgw_reg b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
							   "				   inner join dgw_jadwal d on b.no_paket=d.no_paket and b.no_jadwal=d.no_jadwal and b.kode_lokasi=d.kode_lokasi "+
							   "			       inner join dgw_paket e on b.no_paket=e.no_paket and b.kode_lokasi=e.kode_lokasi "+
							   "				   inner join dgw_jenis_produk f on e.kode_produk=f.kode_produk and e.kode_lokasi=f.kode_lokasi "+							  
							   "where b.no_reg='"+this.cb_regis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);		
							   				   
				if (typeof data == "object") {
					var line = data.rs.rows[0];							
					if (line != undefined) {										
						this.e_nama.setText(line.nama);
						this.e_jadwal.setText(line.tgl_berangkat);						
						this.e_paket.setText(line.paket);
						this.e_harga.setText(floatToNilai(line.harga_tot));												
						this.c_curr.setText(line.kode_curr);
						this.akunTitip = line.kode_akun;
						this.kurs_closing = parseFloat(line.kurs_closing);
						
						var strSQL = "select a.kode_biaya, a.tarif, a.nilai, a.jml, b.nama, 'IDR' as curr "+
								     "from dgw_reg_biaya a "+
									 "inner join dgw_biaya b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi "+
									 "where a.nilai <> 0 and a.no_reg='"+this.cb_regis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									 
									 "union all "+
									 
									 "select 'ROOM' as kode_biaya, harga_room as tarif, harga_room as nilai, 1 as jml, 'ROOM' as nama, 'USD' as curr "+
								     "from dgw_reg  "+									 
									 "where harga_room <> 0 and no_reg='"+this.cb_regis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 
									 "union all "+
									 
									 "select 'PAKET' as kode_biaya, harga as tarif, harga as nilai, 1 as jml, 'PAKET' as nama, 'USD' as curr "+
								     "from dgw_reg  "+									 
									 "where harga <> 0 and no_reg='"+this.cb_regis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 
									 "order by curr desc";
									 					
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg4.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg4.appendData([line.kode_biaya.toUpperCase(),line.nama.toUpperCase(),line.curr.toUpperCase(),floatToNilai(line.tarif),floatToNilai(line.jml),floatToNilai(line.nilai)]);
							}
						} 
						else this.sg4.clear(1);								
						
						this.sg4.validasi();
						
						//data bayar
						var data = this.dbLib.getDataProvider("select isnull(sum(nilai_p),0) as paket, isnull(sum(nilai_t),0) as tambahan "+
									 						  "from dgw_pembayaran "+
															  "where no_reg='"+this.cb_regis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_kwitansi <>'"+this.e_nb.getText()+"'",true);						   
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){										
								this.bayarTambah = parseFloat(line.tambahan)
								this.bayarPaket = parseFloat(line.paket)					
							}
						}
						var saldo = nilaiToFloat(this.e_harga.getText()) - this.bayarPaket;
						var saldot = nilaiToFloat(this.e_tambahan.getText()) - this.bayarTambah;						 
						this.e_saldo.setText(floatToNilai(saldo));
						this.e_saldot.setText(floatToNilai(saldot));
						
						//rincian bayar
						var strSQL = "select no_kwitansi,tgl_bayar,kode_curr,kurs,nilai_p,nilai_t,(nilai_p*kurs) + nilai_t as total_idr "+
									 "from dgw_pembayaran where no_reg='"+this.cb_regis.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and no_kwitansi <>'"+this.e_nb.getText()+"' "+
									 "order by tgl_bayar desc";
									 					
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg5.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg5.appendData([line.no_kwitansi,line.tgl_bayar,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.nilai_p),floatToNilai(line.nilai_t),floatToNilai(line.total_idr)]);
							}
						} 
						else this.sg5.clear(1);	
						
					}				
				}
			}
			if (sender == this.e_kurs || sender == this.e_nilaip || sender == this.e_nilait) {
				var total = (nilaiToFloat(this.e_kurs.getText()) *  nilaiToFloat(this.e_nilaip.getText())) + nilaiToFloat(this.e_nilait.getText());
				total = Math.round(total);				
				this.e_total.setText(floatToNilai(total));
			}
			
			if (sender == this.c_curr && this.c_curr.getText()!= ""){
				var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = '"+this.c_curr.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by id DESC ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_kurs.setText(floatToNilai(line.kurs));							
					}					
				}
			}		
		 	
		}catch(e){
			systemAPI.alert(e);
		}	
	},	
	doNilaiChange4: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(5,i) != "" && this.sg4.cells(2,i) == "IDR"){					
					tot += nilaiToFloat(this.sg4.cells(5,i));					
				}
			}
			this.e_tambahan.setText(floatToNilai(tot));			
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
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																					
		var strSQL = "select a.no_kwitansi, a.tgl_bayar, a.no_reg, paket, a.jadwal, round(a.nilai_p,4) as nilai_p, a.nilai_t, (a.nilai_p * a.kurs) + a.nilai_t as total_idr "+
					 "from dgw_pembayaran a inner join kas_m b on a.no_kwitansi=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
					 "where b.kode_lokasi='"+this.app._lokasi+"' and b.posted='F' and b.modul='KBREG' ";			
		var data = this.dbLib.getDataProvider(strSQL,true);		
		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
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
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_kwitansi,line.tgl_bayar,line.no_reg,line.paket,line.jadwal,line.nilai_p,line.nilai_t,line.total_idr]); 
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
				this.cb_regis.setText(this.sg3.cells(2,row));
				
				var data = this.dbLib.getDataProvider("select a.sistem_bayar,a.kurs,a.nilai_p,a.nilai_t,b.akun_kb from dgw_pembayaran a inner join kas_m b on a.no_kwitansi = b.no_kas and a.kode_lokasi=b.kode_lokasi "+
													  "where a.no_reg='"+this.cb_regis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kwitansi ='"+this.e_nb.getText()+"'",true);						   
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.e_nilaip.setText(floatToNilai(line.nilai_p));		
						this.e_nilait.setText(floatToNilai(line.nilai_t));	
						this.cb_akun.setText(line.akun_kb);			
						this.e_status.setText(line.sistem_bayar);
					}
				}
																	
			}
		} catch(e) {alert(e);}
	}
});