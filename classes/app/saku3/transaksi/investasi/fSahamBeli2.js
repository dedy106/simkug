window.app_saku3_transaksi_investasi_fSahamBeli2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fSahamBeli2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fSahamBeli2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembelian Saham: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_drk = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});						
		this.cb_kelola = new saiCBBL(this,{bound:[20,12,200,20],caption:"MI", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Settlement", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.e_total = new saiLabelEdit(this,{bound:[710,11,200,20],caption:"Total Pembelian", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.e_komisi = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Komisi", tipeText:ttNilai, text:"0",readOnly:true});         
		this.e_bruto = new saiLabelEdit(this,{bound:[710,17,200,20],caption:"Total +", tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_ppn = new saiLabelEdit(this,{bound:[20,18,180,20],caption:"VAT", tipeText:ttNilai, text:"0",readOnly:true});				  
		this.e_pph = new saiLabelEdit(this,{bound:[710,18,200,20],caption:"Nilai PPh", tipeText:ttNilai, text:"0",readOnly:true});		  
		this.e_levy = new saiLabelEdit(this,{bound:[20,19,180,20],caption:"Levi", tipeText:ttNilai, text:"0",readOnly:true});	          
		this.e_neto = new saiLabelEdit(this,{bound:[710,19,200,20],caption:"Total ++", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.p1 = new panel(this,{bound:[10,23,900,260],caption:"Daftar Pembelian Saham"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:14,tag:0,				
				colTitle:["Kd Saham","Nama Saham","Lbr Unit","Harga Oleh","Harga Buku","Harga Beli","Lbr Beli","Nilai Beli","Komisi","VAT","Levi","PPh","Broker","Nama"],
				colWidth:[[13,12,11,10,9,8,  7,6,5,4,3,2,1,0],[100,60,80,80,80,80,  110,60,100,100,100,60,140,80]],
				columnReadOnly:[true,[1,2,3,4,5,13],[0,6,7, 8,9,10,11,12]],
				colFormat:[[2,3,4,5,6,7, 8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai]],				
				buttonStyle:[[0,12],[bsEllips,bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
				
		this.p2 = new panel(this,{bound:[10,24,900,123],caption:"Data Rekap",visible:false});
		this.sg2 = new saiGrid(this.p2,{bound:[1,20,this.p2.width-5,this.p2.height-50],colCount:3,tag:9,
		            colTitle:["Saham","jumlah","nilai"],
					colWidth:[[2,1,0],[100,100,80]],
					colFormat:[[1,2],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
					
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
									
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola",["kode_kelola","nama"],false,["Kode","Nama"],"where","Daftar Pengelola",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('DRKSHMB','PPINV','SHMSWA','SHMMI','SHMBBN','SHMHUT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;								
					if (line.kode_spro == "SHMSWA") this.akunSWA = line.flag;			
					if (line.kode_spro == "SHMMI") this.akunMI = line.flag;			
					if (line.kode_spro == "SHMBBN") this.akunBeban = line.flag;			
					if (line.kode_spro == "SHMHUT") this.akunHutang = line.flag;			
					if (line.kode_spro == "DRKSHMB") this.cb_drk.setText(line.flag);			
				}
			}
			
			var sql = new server_util_arrayList();
			sql.add("select kode_saham, nama from inv_saham");	
			sql.add("select kode_broker, nama from inv_broker");			
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fSahamBeli2.extend(window.childForm);
window.app_saku3_transaksi_investasi_fSahamBeli2.implement({
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
								this.sg2.appendData([this.sg.cells(0,i),floatToNilai(jumlah),floatToNilai(nilai)]);
							} 
							else { 
								totaljml = nilaiToFloat(this.sg2.cells(1,idx));
								totaljml = totaljml + jumlah;
								this.sg2.setCell(1,idx,totaljml);
								
								totalnilai = nilaiToFloat(this.sg2.cells(2,idx));
								totalnilai = totalnilai + nilai;
								this.sg2.setCell(2,idx,totalnilai);
							}								
						}
					}
				
					
					var data = this.dbLib.getDataProvider("select jenis from inv_kelola where kode_kelola='"+this.cb_kelola.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						if (line.jenis == "MI") var akunSaham = this.akunMI;
						else var akunSaham = this.akunSWA;
					}
					var nilaiBeban = nilaiToFloat(this.e_komisi.getText())+nilaiToFloat(this.e_ppn.getText())+nilaiToFloat(this.e_levy.getText());
					var nilaiHutang = nilaiBeban + nilaiToFloat(this.e_total.getText());
					
					sql.add("insert into inv_shmbeli_m(no_shmbeli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,  no_dokumen,keterangan,kode_drk,kode_kelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','0','"+this.cb_buat.getText()+"',  '"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_kelola.getText()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_komisi.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_levy.getText())+","+nilaiToFloat(this.e_pph.getText())+",'BELI')");
					
					sql.add("insert into inv_shmbeli_j(no_shmbeli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+akunSaham+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMBELI','SHM','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into inv_shmbeli_j(no_shmbeli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunBeban+"','"+this.e_ket.getText()+"','D',"+nilaiBeban+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','SHMBELI','BBN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into inv_shmbeli_j(no_shmbeli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C',"+nilaiHutang+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMBELI','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){
							sql.add("insert into inv_shmbeli_d (no_shmbeli,kode_kelola,kode_saham,h_oleh,h_buku,harga,jumlah,n_beli,  komisi,vat,levi,pph,kode_broker,h_buku2) values "+
								    "('"+this.e_nb.getText()+"','"+this.cb_kelola.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+",  "+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+",'"+this.sg.cells(12,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+")");
						}						
					}
					
					this.nik_user=this.app._nikUser;						
					var strSql = "call sp_saham_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(strSql);	
			
					for (var i = 0; i < this.sg2.rows.getLength();i++){
						if (this.sg2.rowValid(i)) {
							var strSQL = "select kode_saham from inv_saham_tmp where kode_saham='"+this.sg2.cells(0,i)+"' and kode_kelola='"+this.cb_kelola.getText()+"' and nik_user='"+this.nik_user+"'";
							var data0 = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data0 == "object"){
								var line0 = data0.rs.rows[0];		
								if (line0 != undefined){
									var data = this.dbLib.getDataProvider("select jumlah,h_oleh,h_buku from inv_saham_tmp where kode_saham='"+this.sg2.cells(0,i)+"' and kode_kelola='"+this.cb_kelola.getText()+"' and nik_user='"+this.nik_user+"'",true);
									if (typeof data == "object" && data.rs.rows[0] != undefined){
										var line = data.rs.rows[0];							
										var jumlah = parseFloat(line.jumlah);
										var h_oleh = parseFloat(line.h_oleh);
										var h_buku = parseFloat(line.h_buku);
									}
									h_oleh = ((h_oleh * jumlah) + nilaiToFloat(this.sg2.cells(2,i))) / (jumlah+nilaiToFloat(this.sg2.cells(1,i)));
									h_buku = ((h_buku * jumlah) + nilaiToFloat(this.sg2.cells(2,i))) / (jumlah+nilaiToFloat(this.sg2.cells(1,i)));
									sql.add("update inv_saham_d set jumlah=jumlah+"+nilaiToFloat(this.sg2.cells(1,i))+",h_oleh="+h_oleh+",h_buku="+h_buku+" where kode_saham='"+this.sg2.cells(0,i)+"' and kode_kelola='"+this.cb_kelola.getText()+"'");										
								} 
								else {							
									var h_oleh = nilaiToFloat(this.sg2.cells(2,i)) / nilaiToFloat(this.sg2.cells(1,i));
									sql.add("insert into inv_saham_d(kode_saham,kode_kelola,jumlah,h_oleh,h_buku) values "+
											"('"+this.sg2.cells(0,i)+"','"+this.cb_kelola.getText()+"','"+nilaiToFloat(this.sg2.cells(1,i))+"',"+h_oleh+","+h_oleh+")");
								}
							}					
						}
					}																					
					sql.add("insert into angg_r "+
					        "select no_shmbeli,'SHMBELI',kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc, 0,SUM(nilai) "+
							"from inv_shmbeli_j where  kode_akun like '5%' and no_shmbeli='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' "+
							"group by no_shmbeli,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc ");
					
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
				for (var i = 0; i < this.sg.rows.getLength();i++){
					if (this.sg.rowValid(i) && this.sg.cells(12,i) == "-"){
						system.alert(this,"Transaksi tidak valid.","Data Broker di detail tidak boleh - ");
						return false;						
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				/* boleh nol kalo ada bonus
				if (nilaiToFloat(this.e_neto.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
		}		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shmbeli_m","no_shmbeli",this.app._lokasi+"-SHB"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}		
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0 && this.cb_kelola.getText()!=""){
					this.standarLib.showListData(this, "Daftar Saham",sender,undefined, 
												  "select kode_saham, nama from inv_saham",
												  "select count(kode_saham) from inv_saham",
												  ["kode_saham","nama"],"where",["Kode","Nama"],false);				
				}
				if (col == 12){
					this.standarLib.showListData(this, "Daftar Broker",sender,undefined, 
												  "select kode_broker, nama from inv_broker",
												  "select count(kode_broker) from inv_broker",
												  ["kode_broker","nama"],"where",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){		
		if (col == 0 && this.sg.cells(0,row)!="") {
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
			var sql = "call sp_saham_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			var strSQL = "select * from inv_saham_tmp where kode_saham='"+this.sg.cells(0,row)+"' and kode_kelola='"+this.cb_kelola.getText()+"' and nik_user='"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
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
					//this.sg.cells(12,row,"-");	
					//this.sg.cells(13,row,"-");
				} 
				else {
					this.sg.cells(2,row,"0");
					this.sg.cells(3,row,"0");
					this.sg.cells(4,row,"0");					
					this.sg.cells(5,row,"0");	
					this.sg.cells(6,row,"0");	
					this.sg.cells(7,row,"0");	
					this.sg.cells(8,row,"0");	
					this.sg.cells(9,row,"0");	
					this.sg.cells(10,row,"0");	
					this.sg.cells(11,row,"0");	
					//this.sg.cells(12,row,"-");
					//this.sg.cells(13,row,"-");					
				}
			}			
		}
		if (col == 6 || col == 7) {
			if (this.sg.cells(7,row) != "" && this.sg.cells(6,row) != "") {				
				this.sg.cells(5,row,parseFloat(nilaiToFloat(this.sg.cells(7,row)) /  nilaiToFloat(this.sg.cells(6,row))));				
			
				var komisi = Math.round(nilaiToFloat(this.sg.cells(7,row)) * 0.14273/100);
				var vat = Math.round(10/100 * komisi);
				var levi = Math.round(nilaiToFloat(this.sg.cells(7,row)) * 0.04300/100);
				var pph = Math.round(komisi*2/100);
				this.sg.cells(8,row,floatToNilai(komisi));	
				this.sg.cells(9,row,floatToNilai(vat));	
				this.sg.cells(10,row,floatToNilai(levi));	
				this.sg.cells(11,row,floatToNilai(pph));					
			}		
			this.sg.validasi();
		}
		if (col == 12 && this.sg.cells(12,row)!=""){			
			sender.onChange.set(undefined,undefined);
			var broker = this.dataBroker.get(sender.cells(12,row));
			if (broker) sender.cells(13,row,broker);
			else {                                    
				if (trim(sender.cells(12,row)) != "") system.alert(this,"Kode Broker "+sender.cells(12,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBroker");                
				sender.cells(12,row,"");
				sender.cells(13,row,"");
				sender.onChange.set(this,"doChangeCell");
				return false;
			}
			sender.onChange.set(this,"doChangeCell");			
		}
		if (col == 8 || col == 9 || col == 10 || col == 11) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{			
			var tot = gainlos = komisi = vat = levi = pph = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg.cells(7,i));
					
					komisi += nilaiToFloat(this.sg.cells(8,i));
					vat += nilaiToFloat(this.sg.cells(9,i));
					levi += nilaiToFloat(this.sg.cells(10,i));
					pph += nilaiToFloat(this.sg.cells(11,i));
				}
			}			
			this.e_total.setText(floatToNilai(tot));						
			
			this.e_komisi.setText(floatToNilai(komisi));						
			this.e_ppn.setText(floatToNilai(vat));						
			this.e_levy.setText(floatToNilai(levi));						
			this.e_pph.setText(floatToNilai(pph));						
			
			this.e_bruto.setText(floatToNilai(nilaiToFloat(this.e_total.getText()) + nilaiToFloat(this.e_komisi.getText()) + nilaiToFloat(this.e_ppn.getText()) + nilaiToFloat(this.e_levy.getText())));				
			this.e_neto.setText(floatToNilai(nilaiToFloat(this.e_bruto.getText()) - nilaiToFloat(this.e_pph.getText())));
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
	}	
});