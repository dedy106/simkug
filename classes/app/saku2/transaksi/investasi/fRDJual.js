window.app_saku2_transaksi_investasi_fRDJual = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_investasi_fRDJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fRDJual";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Reksadana: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_drk = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});						
		this.cb_kelola = new saiCBBL(this,{bound:[20,12,200,20],caption:"Manajer Investasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Settlement", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 		
		this.e_komisi = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Nilai Komisi", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_ppn = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Nilai VAT", tag:1, tipeText:ttNilai, text:"0" ,readOnly:true});		
		this.e_levi = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"N Levy+SalesTax", tag:1, tipeText:ttNilai, text:"0" ,readOnly:true});		
		this.e_total = new saiLabelEdit(this,{bound:[712,18,200,20],caption:"Total Jual", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_pph = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai PPh", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_gainlos = new saiLabelEdit(this,{bound:[712,17,200,20],caption:"Total Gain/Loss", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar Penjualan Reksadana"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:13,tag:0,				
				colTitle:["Kd RD","Nama","Jml Unit","Harga Oleh","Harga Buku","Harga Jual","Jml Jual","Nilai Jual","Gain/Loss",
						  "Komisi","VAT","Levy/STax","PPh"],
				colWidth:[[12,11,10,9, 8,7,6,5,4,3,2,1,0],[80,80,80,80,  80,100,70,100,100,100,100,170,60]],
				columnReadOnly:[true,[1,2,3,4,5,8],[0,6,7,9,10,11,12]],
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai  ,cfNilai,cfNilai,cfNilai,cfNilai]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		
		this.rearrangeChild(10, 23);
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			this.cb_kelola.setSQL("select kode_rdkelola, nama from inv_rdkelola",["kode_rdkelola","nama"],false,["Kode","Nama"],"where","Daftar Pengelola",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
					
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('RDDKM','RDNT','RDNTDKM','PPINV','RDSWA','RDMI','RDPIU','RDPIUGL') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;								
					if (line.kode_spro == "RDSWA") this.akunSWA = line.flag;			
					if (line.kode_spro == "RDMI") this.akunMI = line.flag;				
					if (line.kode_spro == "RDDKM") this.akunRDDKM = line.flag;								
					if (line.kode_spro == "RDPIU") this.akunPiutang = line.flag;	
					if (line.kode_spro == "RDPIUGL") this.akunPiuGL = line.flag; 					
					if (line.kode_spro == "RDNT") this.akunNT = line.flag;								
					if (line.kode_spro == "RDNTDKM") this.akunNTDKM = line.flag;								
				}
			}
			var sql = new server_util_arrayList();
			sql.add("select kode_rd, nama from inv_rd");						
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fRDJual.extend(window.childForm);
window.app_saku2_transaksi_investasi_fRDJual.implement({
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var data = this.dbLib.getDataProvider("select jenis,status from inv_rdkelola where kode_rdkelola='"+this.cb_kelola.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						if (line.jenis == "MI") var akunRD = this.akunMI;
						else var akunRD = this.akunSWA;						
						var akunNT = this.akunNT;
						
						if (line.status == "DAKEM") {
							var akunRD = this.akunRDDKM;
							var akunNT = this.akunNTDKM;
						}
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
					var nilaiPiutang = nilaiToFloat(this.e_total.getText()) - nilaiBeban;	
					
					var nilaiPiuGL = nilaiPiutang - this.nilaiRD;
					if (nilaiPiuGL > 0) nilaiPiutang = nilaiPiutang - nilaiPiuGL;
					else nilaiPiuGL = 0;
										
					sql.add("insert into inv_rdjual_m(no_rdjual,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kasjual,nik_buat,no_dokumen,keterangan,kode_drk,kode_rdkelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,akun_piutang,akun_piugl,nilai_piutang,nilai_piugl) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','"+this.cb_buat.getText()+"',  '"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_kelola.getText()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_komisi.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_levi.getText())+","+nilaiToFloat(this.e_pph.getText())+",'"+this.akunPiutang+"','"+this.akunPiuGL+"',"+nilaiPiutang+","+nilaiPiuGL+")");
					
					sql.add("insert into inv_rdjual_j(no_rdjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','"+this.e_ket.getText()+"','D',"+nilaiPiutang+",'"+this.kodepp+"','-','"+this.app._lokasi+"','RDJUAL','PIUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					sql.add("insert into inv_rdjual_j(no_rdjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+akunRD+"','"+this.e_ket.getText()+"','C',"+this.nilaiRD+",'"+this.kodepp+"','-','"+this.app._lokasi+"','RDJUAL','RD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into inv_rdjual_j(no_rdjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunGL+"','"+this.e_ket.getText()+"','"+DCgl+"',"+gainlos+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDJUAL','GAINLOS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");		
																			
					if (nilaiPiuGL > 0) {
						sql.add("insert into inv_rdjual_j(no_rdjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',7,'"+this.akunPiuGL+"','"+this.e_ket.getText()+"','D',"+nilaiPiuGL+",'"+this.kodepp+"','-','"+this.app._lokasi+"','RDJUAL','PIUGL','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					}
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(7,i)) != 0 ) {
								sql.add("update inv_rd_d set jumlah=jumlah-"+nilaiToFloat(this.sg.cells(6,i))+" where kode_rd='"+this.sg.cells(0,i)+"'");
								sql.add("insert into inv_rdjual_d (no_rdjual,kode_rdkelola,kode_rd,h_oleh,h_buku,h_jual,jumlah,n_jual,gainlos, komisi,vat,levi,pph) values "+
								        "('"+this.e_nb.getText()+"','"+this.cb_kelola.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+",  "+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+")");
								
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
									sql.add("insert into inv_rdjual_j(no_rdjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+akunNT+"','"+this.e_ket.getText()+"','"+DCnt+"',"+nilaiSPI+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDJUAL','NAIKTURUN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
									sql.add("insert into inv_rdjual_j(no_rdjual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunSPI+"','"+this.e_ket.getText()+"','"+DCspi+"',"+nilaiSPI+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDJUAL','SPI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");							
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					this.sg.clear(1);
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				for (var i = 0; i < this.sg.rows.getLength();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(6,i)) > nilaiToFloat(this.sg.cells(2,i))) {
							system.alert(this,"Transaksi tidak valid.","Jml unit dijual melebihi stok.");
							return false;												
						}
					}
				}				
				/*
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				*/
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {
			this.sg.clear(1);
			var strSQL = "select akun_spi,akun_gl from inv_rdkelola where kode_rdkelola = '"+this.cb_kelola.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.akunSPI = line.akun_spi;				
				this.akunGL = line.akun_gl;	
			} 
			else {
				this.akunSPI = "-";
				this.akunGL = "-";
			}
		}				
		if (sender == this.e_komisi && this.e_komisi.getText()!="") {
			this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_komisi.getText())*0.1)));			
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_rdjual_m","no_rdjual",this.app._lokasi+"-RDJ"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0 && this.cb_kelola.getText()!=""){
					this.standarLib.showListData(this, "Daftar Reksadana",sender,undefined, 
						"select a.kode_rd, a.nama from inv_rd a inner join inv_rd_d b on a.kode_rd=b.kode_rd and a.kode_rdkelola='"+this.cb_kelola.getText()+"'",
						"select count(a.kode_rd)  from inv_rd a inner join inv_rd_d b on a.kode_rd=b.kode_rd and a.kode_rdkelola='"+this.cb_kelola.getText()+"'",
						["a.kode_rd","a.nama"],"and",["Kode","Nama"],false);				
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
				var rd = this.dataRD.get(sender.cells(0,row));
				if (rd) sender.cells(1,row,rd);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Reksadana "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRD");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}
				sender.onChange.set(this,"doChangeCell");
			}
			
			this.nik_user=this.app._nikUser;						
			var sql = "call sp_rd_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			var strSQL = "select a.jumlah,a.h_oleh,a.h_buku from inv_rd_tmp a "+
						 "where a.kode_rd='"+this.sg.cells(0,row)+"' and a.nik_user='"+this.nik_user+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.sg.cells(2,row,parseFloat(line.jumlah));
				this.sg.cells(3,row,parseFloat(line.h_oleh));				
				this.sg.cells(4,row,parseFloat(line.h_buku));					
				this.sg.cells(5,row,"0");	
				this.sg.cells(6,row,"0");	
				this.sg.cells(7,row,"0");	
				this.sg.cells(8,row,"0");				
				
				this.sg.cells(9,row,"0");				
				this.sg.cells(10,row,"0");				
				this.sg.cells(11,row,"0");				
				this.sg.cells(12,row,"0");												
			} 
		}
		if (col == 6 || col == 7) {
			if (this.sg.cells(7,row) != "" && this.sg.cells(6,row) != "") {								
				this.sg.cells(5,row,parseFloat(nilaiToFloat(this.sg.cells(7,row)) /  nilaiToFloat(this.sg.cells(6,row))));
				this.sg.cells(8,row,floatToNilai(Math.round(nilaiToFloat(this.sg.cells(7,row)) -  Math.round(nilaiToFloat(this.sg.cells(3,row)) * nilaiToFloat(this.sg.cells(6,row))))));					
			}		
			this.sg.validasi();
		}							
		if (col == 9 || col == 10 || col == 11 || col == 12) this.sg.validasi();				
	},
	doNilaiChange: function(){
		try{			
			this.nilaiRD = 0;			
			var tot = gainlos = komisi = vat = levi = pph = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg.cells(7,i));				
					gainlos += nilaiToFloat(this.sg.cells(8,i));				
					this.nilaiRD += nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(6,i));				
					
					komisi += nilaiToFloat(this.sg.cells(9,i));				
					vat += nilaiToFloat(this.sg.cells(10,i));				
					levi += nilaiToFloat(this.sg.cells(11,i));				
					pph += nilaiToFloat(this.sg.cells(12,i));				
				}
			}			
			this.nilaiRD = Math.round(this.nilaiRD);
			this.e_total.setText(floatToNilai(tot));
			this.e_gainlos.setText(floatToNilai(gainlos));									
			
			this.e_komisi.setText(floatToNilai(komisi));						
			this.e_ppn.setText(floatToNilai(vat));						
			this.e_levi.setText(floatToNilai(levi));						
			this.e_pph.setText(floatToNilai(pph));						
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Bukti : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataRD = new portalui_arrayMap();							
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataRD.set(line.kode_rd, line.nama);
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
	}	
});