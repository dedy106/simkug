window.app_saku2_transaksi_investasi_fObliJual = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_investasi_fObliJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fObliJual";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Obligasi: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.e_kupon = new saiLabelEdit(this,{bound:[712,17,200,20],caption:"Pdpt Kupon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.e_piukupon = new saiLabelEdit(this,{bound:[712,16,200,20],caption:"Piutang Kupon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_drk = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});						
		this.e_total = new saiLabelEdit(this,{bound:[712,10,200,20],caption:"Total Jual", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_jenis = new saiCBBL(this,{bound:[20,12,200,20],caption:"Jenis", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_gainlos = new saiLabelEdit(this,{bound:[712,12,200,20],caption:"Total Gain/Loss", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar Penjualan Obligasi"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:9,tag:0,				
				colTitle:["No Beli","Status","Nominal","Nilai Oleh","Nilai Buku","Piutang Kupon","Nilai Jual","Gain/Loss","Nilai Kupon"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,60,180]],
				columnReadOnly:[true,[1,2,3,4,5,7],[0,6,8]],
				colFormat:[[2,3,4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
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
									
			this.cb_jenis.setSQL("select kode_jenis, nama from inv_oblijenis",["kode_jenis","nama"],false,["Kode","Nama"],"where","Daftar Jenis",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
					
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('OBLNT','PPINV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;								
					if (line.kode_spro == "OBLNT") this.akunNT = line.flag;								
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fObliJual.extend(window.childForm);
window.app_saku2_transaksi_investasi_fObliJual.implement({
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
					var nilaiPPh = 0;
					var nilaiBeban = nilaiToFloat(this.e_piukupon.getText());
					
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
					//curigai....
					var nilaiKupon = nilaiToFloat(this.e_kupon.getText()) - nilaiBeban;	
					if (nilaiKupon < 0) {
						var nilaiPiutang = nilaiToFloat(this.e_total.getText()) + nilaiKupon;	
						nilaiKupon = 0;
					}
					else {
						var nilaiPiutang = nilaiToFloat(this.e_total.getText());	
					}
					
					sql.add("insert into inv_oblijual_m(no_oblijual,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kasjual,nik_buat,no_dokumen,keterangan,kode_drk,kode_jenis,akun_piutang,akun_piukupon) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','"+this.cb_buat.getText()+"',  '"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_jenis.getText()+"','"+this.akunPiutang+"','"+this.akunPiukupon+"')");					
					
					sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','"+this.e_ket.getText()+"','D',"+nilaiPiutang+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','PIUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");														
					sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunGL+"','"+this.e_ket.getText()+"','"+DCgl+"',"+gainlos+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLJUAL','GAINLOS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");		
					
					//piutang kupon talangan diselesaikan
					if (nilaiToFloat(this.e_piukupon.getText()) != 0) {
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPiukupon+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_piukupon.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLJUAL','RPIUKUPON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");		
					}
					if (nilaiToFloat(this.e_kupon.getText()) > 0) {
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPiukupon+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_kupon.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','PIUKUPON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");														
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',4,'"+this.akunKupon+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_kupon.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','KUPON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");														
					}
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(6,i)) != 0 ) {
								sql.add("update inv_obli_d set no_oblijual='"+this.e_nb.getText()+"' where no_beli='"+this.sg.cells(0,i)+"' and kode_jenis='"+this.cb_jenis.getText()+"'");
								
								if (this.sg.cells(1,i) == "HTM") var nilaiObli = nilaiToFloat(this.sg.cells(4,i));
								else var nilaiObli = nilaiToFloat(this.sg.cells(3,i));								
								sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunObli+"','"+this.e_ket.getText()+"','C',"+nilaiObli+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','OBLI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								
								sql.add("insert into inv_oblijual_d (no_oblijual,kode_jenis,no_beli,n_oleh,n_buku,n_piukupon,n_jual,gainlos,n_kupon) values "+
								        "('"+this.e_nb.getText()+"','"+this.cb_jenis.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+")");
								
								if (this.sg.cells(1,i) != "HTM") {
									if (nilaiToFloat(this.sg.cells(3,i)) != nilaiToFloat(this.sg.cells(4,i))) {
										var nilaiSPI = nilaiToFloat(this.sg.cells(4,i)) - nilaiToFloat(this.sg.cells(3,i));
										if (nilaiSPI > 0) {
											var DCnt = "D";
											var DCspi = "C";
										}
										else {
											var DCnt = "C";
											var DCspi = "D";
										}
										nilaiSPI = Math.abs(nilaiSPI);								
										sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
												"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',97,'"+this.akunNT+"','"+this.e_ket.getText()+"','"+DCnt+"',"+nilaiSPI+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLJUAL','NAIKTURUN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
										sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
												"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',98,'"+this.akunSPI+"','"+this.e_ket.getText()+"','"+DCspi+"',"+nilaiSPI+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLJUAL','SPI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");							
									}
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
		if (sender == this.cb_jenis && this.cb_jenis.getText()!="") {
			this.sg.clear(1);			
			var strSQL = "select a.akun_piutang,a.akun_piukupon,a.akun_kupon,a.akun_obligasi,a.akun_spi,a.akun_gl "+
			             "from inv_obligor a inner join inv_oblijenis b on a.kode_obligor=b.kode_obligor where b.kode_jenis = '"+this.cb_jenis.getText()+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.akunSPI = line.akun_spi;				
				this.akunGL = line.akun_gl;	
				this.akunObli = line.akun_obligasi;
				this.akunPiutang = line.akun_piutang;
				this.akunPiukupon = line.akun_piukupon;
				this.akunKupon = line.akun_kupon;
			} 
			else {
				this.akunSPI = "-";
				this.akunGL = "-";
				this.akunObli = "-";
				this.akunPiutang = "-";
				this.akunPiukupon = "-";
				this.akunKupon = "-";
			}
		}						
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_oblijual_m","no_oblijual",this.app._lokasi+"-OBLJ"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0 && this.cb_jenis.getText()!=""){
					this.standarLib.showListData(this, "Daftar Obligasi",sender,undefined, 						
						"select a.no_beli, a.status from inv_obli_d a inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis where a.kode_jenis='"+this.cb_jenis.getText()+"' and a.no_oblijual='-'",
						"select count(a.no_beli)  from inv_obli_d a inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis where a.kode_jenis='"+this.cb_jenis.getText()+"' and a.no_oblijual='-'",
						["a.no_beli","a.status"],"and",["No Beli","Status"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){					
		if (col == 0 && this.sg.cells(0,row)!=""){			
			var strSQL = "select a.nilai as nominal, a.nilai_beli,a.nilai_buku+isnull(b.amor,0) as nilai_buku,case when a.no_cair_piukupon ='-' then a.nilai_piukupon else 0 end as nilai_piukupon "+
			             "from inv_obli_d a left join ("+
						 "					select kode_jenis,no_beli,sum(case dc when 'D' then nilai else -nilai end) as amor "+
						 "                  from inv_obliamor_d group by kode_jenis,no_beli "+
						 ") b on a.no_beli=b.no_beli and a.kode_jenis=b.kode_jenis "+
						 "where a.no_beli='"+this.sg.cells(0,row)+"' and a.kode_jenis = '"+this.cb_jenis.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.sg.cells(2,row,parseFloat(line.nominal));
				this.sg.cells(3,row,parseFloat(line.nilai_beli));				
				this.sg.cells(4,row,parseFloat(line.nilai_buku));					
				this.sg.cells(5,row,parseFloat(line.nilai_piukupon));	
				this.sg.cells(6,row,"0");	
				this.sg.cells(7,row,"0");					
				this.sg.cells(8,row,"0");		
			} 
		}
		if (col == 6) {
			if (this.sg.cells(6,row) != "") {	
				//HTM dari nilai selisih dari harga buku (hasil amorisasai)
				//AFS dari harga beli awal sebelum SPI
				if (this.sg.cells(1,row) == "HTM")
					this.sg.cells(7,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) -  nilaiToFloat(this.sg.cells(4,row))));		
				else
					this.sg.cells(7,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) -  nilaiToFloat(this.sg.cells(3,row))));		
			}		
			this.sg.validasi();
		}
		if (col == 8) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{						
			var kupon = piukupon = tot = gainlos = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(7,i) != "" && this.sg.cells(5,i) != ""){
					tot += nilaiToFloat(this.sg.cells(6,i));				
					gainlos += nilaiToFloat(this.sg.cells(7,i));									
					piukupon += nilaiToFloat(this.sg.cells(5,i));									
					kupon += nilaiToFloat(this.sg.cells(8,i));									
				}
			}			
			this.e_total.setText(floatToNilai(tot));
			this.e_gainlos.setText(floatToNilai(gainlos));												
			this.e_piukupon.setText(floatToNilai(piukupon));												
			this.e_kupon.setText(floatToNilai(kupon));												
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});