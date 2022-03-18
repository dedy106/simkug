window.app_saku2_transaksi_siaga_fVccBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fVccBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fVccBatal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Invoice VCC: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
						
		this.cb_inv = new saiCBBL(this,{bound:[20,13,240,20],caption:"Bukti Invoice", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});					
		this.e_novcc = new saiLabelEdit(this,{bound:[20,12,450,20],caption:"No VCC", readOnly:true});						
		this.e_atensi = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Terima Dari", readOnly:true});						
		this.e_akunar = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Akun Piutang", readOnly:true});									
		
		this.e_nilai= new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange2"]});		
		this.e_diskon= new saiLabelEdit(this,{bound:[20,21,200,20],caption:"Nilai Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange2"]});		
		this.e_neto= new saiLabelEdit(this,{bound:[20,22,200,20],caption:"Nilai Netto", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ppn= new saiLabelEdit(this,{bound:[20,24,200,20],caption:"Nilai PPN", tag:1,  tipeText:ttNilai, text:"0",change:[this,"doChange2"]});		
		this.e_biaya= new saiLabelEdit(this,{bound:[20,23,200,20],caption:"Nilai Biaya", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange2"]});		
		this.e_mat= new saiLabelEdit(this,{bound:[20,24,200,20],caption:"Nilai Materai", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange2"]});		
		this.e_total= new saiLabelEdit(this,{bound:[20,25,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_bayar= new saiLabelEdit(this,{bound:[20,21,200,20],caption:"Nilai Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
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
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_cabang.setSQL("select a.kode_cabang,a.nama from gr_cabang a where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Cabang",true);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}				
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fVccBatal.extend(window.childForm);
window.app_saku2_transaksi_siaga_fVccBatal.implement({
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var data = this.dbLib.getDataProvider("select * from gr_vcc where kode_cabang='"+this.cb_cabang.getText()+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							this.akunPotPdpt = line.akun_pot_pend;
							this.akunPdpt = line.akun_pend;
							this.akunBiaya = line.akun_biaya;
							this.akunMat = line.akun_materai;
							this.akunPPN = line.akun_ppn;
						} 
					}
					
					sql.add("insert into gr_vcc_m(no_vcc,tanggal,keterangan,kode_cabang,nik_buat,nik_app,kode_lokasi,kode_pp,kode_curr,kurs,nilai_curr,nilai,posted,periode,nik_user,tgl_input,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'F','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.kodeDRK+"')");
					
					//reverse yang lama
					/*
					sql.add("update gr_vcc_d set no_invoice='"+this.e_nb.getText()+"' where no_vcc='"+this.e_novcc.getText()+"' and no_invoice='"+this.cb_inv.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("insert into gr_vccbayar_d(no_bukti,kode_lokasi,no_invoice,akun_piutang,nilai_kas,nilai_lain,periode,dc,modul) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','"+this.akunAR+"',0,"+this.totalLama+",'"+this.e_periode.getText()+"','D','BATAL')");															
					*/
					sql.add("delete from gr_vcc_d where no_vcc='"+this.e_novcc.getText()+"' and no_invoice='"+this.cb_inv.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

					if (this.totalLama != 0)
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunAR+"','"+this.e_ket.getText()+"','C','IDR',1,"+this.totalLama+","+this.totalLama+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','RVCC','PIUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					if (this.diskonLama != 0)
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPotPdpt+"','"+this.e_ket.getText()+"','C','IDR',1,"+this.diskonLama+","+this.diskonLama+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','RVCC','DISKON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					if (this.nilaiLama != 0)
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunPdpt+"','"+this.e_ket.getText()+"','D','IDR',1,"+this.nilaiLama+","+this.nilaiLama+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','RVCC','PEND','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.biayaLama != 0)
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunBiaya+"','"+this.e_ket.getText()+"','D','IDR',1,"+this.biayaLama+","+this.biayaLama+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','RVCC','BIAYA','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.matLama != 0)
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',4,'"+this.akunMat+"','"+this.e_ket.getText()+"','D','IDR',1,"+this.matLama+","+this.matLama+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','RVCC','MATERAI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.ppnLama != 0)
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',5,'"+this.akunPPN+"','"+this.e_ket.getText()+"','D','IDR',1,"+this.ppnLama+","+this.ppnLama+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','RVCC','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
														
					//inv baru 							
					sql.add("insert into gr_vcc_d(no_vcc,kode_lokasi,no_invoice,nama_cust,nilai,diskon,neto,ppn,biaya,materai,total,akun_piutang,periode) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_inv.getText()+"','"+this.e_atensi.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_diskon.getText())+","+parseNilai(this.e_neto.getText())+","+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_biaya.getText())+","+parseNilai(this.e_mat.getText())+","+parseNilai(this.e_total.getText())+",'"+this.akunAR+"','"+this.e_periode.getText()+"')");					
					
					if (this.e_total.getText() != "0")
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunAR+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','VCC','PIUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.e_diskon.getText() != "0")
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPotPdpt+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_diskon.getText())+","+parseNilai(this.e_diskon.getText())+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','VCC','DISKON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.e_nilai.getText() != "0")
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunPdpt+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','VCC','PEND','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.e_biaya.getText() != "0")
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunBiaya+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_biaya.getText())+","+parseNilai(this.e_biaya.getText())+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','VCC','BIAYA','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.e_mat.getText() != "0")
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',4,'"+this.akunMat+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_mat.getText())+","+parseNilai(this.e_mat.getText())+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','VCC','MATERAI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					if (this.e_ppn.getText() != "0")
					sql.add("insert into gr_vcc_j(no_vcc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_inv.getText()+"','"+this.dp_d1.getDateString()+"',5,'"+this.akunPPN+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._kodePP+"','"+this.kodeDRK+"','"+this.app._lokasi+"','VCC','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");				
					
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :													
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_bayar.getText()) > nilaiToFloat(this.e_nilai.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh melebihi nilai invoice.");
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}		
		this.doClick();
	},
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.cb_cabang) {
			if (this.e_periode.getText()!="" && this.cb_cabang.getText()!="") {
				this.cb_inv.setSQL("select a.no_invoice, a.nama_cust from gr_vcc_d a inner join gr_vcc_m b on a.no_vcc=b.no_vcc and a.kode_lokasi=b.kode_lokasi "+
								   "       left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_vccbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
								   "where b.kode_cabang = '"+this.cb_cabang.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_invoice","a.nama_cust"],false,["No Invoice","Customer"],"and","Daftar Bukti",true);
			}
		}
		if (sender == this.cb_cabang) {
			this.doClick();				
		}												
		if (sender == this.cb_inv && this.cb_inv.getText()!="") {								  
			var data = this.dbLib.getDataProvider("select a.no_vcc,a.nama_cust,a.nilai,a.diskon,a.ppn,a.biaya,a.materai,a.total,isnull(c.bayar,0) as bayar,a.akun_piutang,a.akun_piutang + ' - '+b.nama as nama,d.kode_drk,d.periode "+
			           "from gr_vcc_d a inner join masakun b on a.akun_piutang=b.kode_akun and b.kode_lokasi = a.kode_lokasi "+
					   "                 inner join gr_vcc_m d on a.no_vcc=d.no_vcc and a.kode_lokasi=d.kode_lokasi "+
					   "                 left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_vccbayar_d group by no_invoice,kode_lokasi ) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_invoice='"+this.cb_inv.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_novcc.setText(line.no_vcc);										
					this.e_atensi.setText(line.nama_cust);										
					this.e_akunar.setText(line.nama);															
					this.akunAR = line.akun_piutang;
					this.kodeDRK = line.kode_drk;
					this.perLama = line.periode;
					
					this.e_nilai.setText(floatToNilai(line.nilai));			
					this.e_diskon.setText(floatToNilai(line.diskon));								
					this.e_ppn.setText(floatToNilai(line.ppn));			
					this.e_biaya.setText(floatToNilai(line.biaya));								
					this.e_mat.setText(floatToNilai(line.materai));			
					
					this.e_bayar.setText(floatToNilai(line.bayar));			
					
					this.nilaiLama = parseFloat(line.nilai);			
					this.diskonLama = parseFloat(line.diskon);
					this.ppnLama = parseFloat(line.ppn);
					this.biayaLama = parseFloat(line.biaya);
					this.matLama = parseFloat(line.materai);
					this.totalLama = parseFloat(line.total);
				} 
			}			
		}						
	},
	doChange2:function(sender){
		if (this.e_nilai.getText()!="" && this.e_diskon.getText()!="" && this.e_ppn.getText()!="" && this.e_biaya.getText()!="" && this.e_mat.getText()!="") {
			var neto = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_diskon.getText());
			this.e_neto.setText(floatToNilai(neto));
			var total = neto + nilaiToFloat(this.e_ppn.getText()) + nilaiToFloat(this.e_biaya.getText()) + nilaiToFloat(this.e_mat.getText());
			this.e_total.setText(floatToNilai(total));
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.cb_cabang.getText()!= "") {				
			var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/"+this.cb_cabang.getText();
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_vcc,5,20)),0) as no_vcc from gr_vcc_m where no_vcc like '_______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_vcc == "0") this.e_nb.setText("RVCC001"+AddFormat);
					else {
						var idx = parseFloat(line.no_vcc.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText("RVCC"+nu+AddFormat);
					}
				} 
			}
			this.e_ket.setFocus();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tereksekusi : "+this.e_nb.getText());
						this.app._mainForm.bClear.click();              
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});