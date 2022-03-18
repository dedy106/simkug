window.app_saku2_transaksi_aka_fTagihBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fTagihBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fTagihBatal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Tagihan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_drk = new saiCBBL(this,{bound:[20,16,200,20],caption:"DRK Pembatalan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_titip = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Titipan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.e_piutang = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_amor = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_nim = new saiCBBL(this,{bound:[20,18,200,20],caption:"Mahasiswa", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_lunas = new saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Pembayaran", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,900,280],caption:"Data Tagihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:10,tag:0,
		            colTitle:["No Invoice","Periode","Kode Produk","Nama Produk","Akun Piutang","Akun PDPT","Akun PDD","Nilai Piutang","Nilai Amortisasi","Nilai Pelunasan"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,70,70,70,100,80,60,150]],
					colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
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
			this.pp = "";
			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_nim.setSQL("select a.nim, a.nama,b.kode_pp from aka_mahasiswa a inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'",["a.nim","a.nama","b.kode_pp"],false,["NIM","Nama","PP"],"and","Daftar Mahasiswa",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_titip.setText(line.flag,line.nama);
			} else this.cb_titip.setText("","");									
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_fTagihBatal.extend(window.childForm);
window.app_saku2_transaksi_aka_fTagihBatal.implement({
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
			if (this.e_lunas.getText() != "0") this.cb_titip.setTag("2"); else this.cb_titip.setTag("9"); 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_batal_m","no_batal",this.app._lokasi+"-BTL"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into aka_batal_m(no_batal,no_dokumen,tanggal,keterangan,nilai_tagih,nilai_amor,nilai_bayar,posted,modul,kode_drk,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_piutang.getText())+","+parseNilai(this.e_amor.getText())+","+parseNilai(this.e_lunas.getText())+",'F','BATAL','"+this.cb_drk.getText()+"','"+this.cb_titip.getText()+"','"+this.cb_nim.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into aka_batal_d(no_batal,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul) values "+
										"	('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(7,i))+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','D','BATAL')");

								if (this.sg.cells(2,i) == "BPP") {
									sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										    "	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(6,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(7,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','PDD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
									sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										    "	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.sg.cells(7,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								
									if (this.sg.cells(8,i) != "0") {
										sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
												"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.sg.cells(5,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(8,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
										sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
												"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.sg.cells(6,i)+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.sg.cells(8,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','PDD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
									}
									if (this.sg.cells(9,i) != "0") {
										sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
												"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(9,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
										sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
												"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.sg.cells(9,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
										sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul) values "+
												"	('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(9,i))+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','C','BATAL')");								
									}
									sql.add("insert into aka_amor_d(no_amor,nim,no_inv,periode,nilai,kode_lokasi,akun_pdd,akun_pdpt,kode_produk,kode_pp,kode_drk,dc,no_del) values "+
											"('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.e_amor.getText())+",'"+this.app._lokasi+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(2,i)+"','"+this.pp+"','"+this.cb_drk.getText()+"','C','BATAL')");
								}
								else {
									sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										    "	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(5,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(7,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
									sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										    "	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.sg.cells(7,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								
									if (this.sg.cells(9,i) != "0") {
										sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
												"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(9,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
										sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
												"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.sg.cells(9,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BATAL','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
										sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul) values "+
												"	('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(9,i))+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','C','BATAL')");
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
					this.cb_titip.setTag("2");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_piutang.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai piutang tidak boleh nol atau kurang.");
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_batal_m","no_batal",this.app._lokasi+"-BTL"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="")
			this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);

		if (sender == this.cb_nim && this.cb_nim.getText()!="") {
			this.pp = this.cb_nim.dataFromList[2];
			this.e_piutang.setText("0");
			this.e_amor.setText("0");			
			this.e_lunas.setText("0");			
			var strSQL = "select a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.nilai-isnull(x.tot_batal,0) as nilai,isnull(d.tot_pdd,0) as pdd,isnull(b.tot_lunas,0) as lunas "+
						 "from aka_bill_d a "+
						 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
						 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "                 from aka_rekon_d where nim = '"+this.cb_nim.getText()+"' group by no_inv,kode_produk,kode_lokasi) b on a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
						 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_pdd "+
						 "                 from aka_amor_d where nim = '"+this.cb_nim.getText()+"' group by no_inv,kode_produk,kode_lokasi) d on a.no_inv=d.no_inv and a.kode_produk=d.kode_produk and a.kode_lokasi=d.kode_lokasi "+
						 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
						 "                 from aka_batal_d where nim = '"+this.cb_nim.getText()+"' group by no_inv,kode_produk,kode_lokasi) x on a.no_inv=x.no_inv and a.kode_produk=x.kode_produk and a.kode_lokasi=x.kode_lokasi "+
						 "where a.nim = '"+this.cb_nim.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_piutang,line.akun_pdpt,line.akun_pdd,floatToNilai(line.nilai),floatToNilai(line.pdd),floatToNilai(line.lunas)]);
				}
			} else this.sg.clear(1);			
		}
	},
	doNilaiChange: function(){
		try{
			var totP = totD = totB = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(8,i) != "" && this.sg.cells(9,i) != ""){
					totP += nilaiToFloat(this.sg.cells(7,i));
					totD += nilaiToFloat(this.sg.cells(8,i));
					totB += nilaiToFloat(this.sg.cells(9,i));
				}
			}
			this.e_piutang.setText(floatToNilai(totP));
			this.e_amor.setText(floatToNilai(totD));
			this.e_lunas.setText(floatToNilai(totB));
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
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});