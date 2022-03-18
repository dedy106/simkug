window.app_saku2_transaksi_siaga_fBillTeCCE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fBillTeCCE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fBillTeCCE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Biling TeCC: Edit", 0);	
		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_nb = new saiCBBL(this,{bound:[20,16,240,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_drk = new saiCBBL(this,{bound:[20,13,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});		
		this.cb_buat = new saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
						
		this.cb_inv = new saiCBBL(this,{bound:[20,16,220,20],caption:"No Invoice", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.e_cust = new saiLabelEdit(this,{bound:[20,19,450,20],caption:"Customer", maxLength:100});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,11,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_diskon = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_neto = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Netto", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ppn = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"PPN", tag:1,tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_biaya = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Biaya", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_materai = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Materai", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_bayar = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Nilai Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
						
			this.cb_cabang.setSQL("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Cabang",true);			
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fBillTeCCE.extend(window.childForm);
window.app_saku2_transaksi_siaga_fBillTeCCE.implement({	
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
					sql.add("delete from gr_tecc_m where no_tecc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_tecc_j where no_tecc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from gr_tecc_d where no_tecc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into gr_tecc_m(no_tecc,tanggal,keterangan,kode_cabang,nik_buat,nik_app,kode_lokasi,kode_pp,kode_curr,kurs,nilai_curr,nilai,posted,periode,nik_user,tgl_input,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'F','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_drk.getText()+"')");
					
					var data = this.dbLib.getDataProvider("select akun_ar,akun_pot_pend,akun_pend,akun_ppn,akun_biaya,akun_materai from gr_tecc where kode_cabang = '"+this.cb_cabang.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){	
							var akun_ar = line.akun_ar;
							if (this.e_total.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_ar+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','TECC','PIUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_diskon.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pot_pend+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_diskon.getText())+","+parseNilai(this.e_diskon.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','DISKON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_nilai.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+line.akun_pend+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','PEND','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_biaya.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+line.akun_biaya+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_biaya.getText())+","+parseNilai(this.e_biaya.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','BIAYA','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_materai.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+line.akun_materai+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_materai.getText())+","+parseNilai(this.e_materai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','MATERAI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_ppn.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+line.akun_ppn+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
						} 
					}
					
					sql.add("insert into gr_tecc_d(no_tecc,kode_lokasi,no_invoice,nama_cust,nilai,diskon,neto,ppn,biaya,materai,total,akun_piutang,periode) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_inv.getText()+"','"+this.e_cust.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_diskon.getText())+","+parseNilai(this.e_neto.getText())+","+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_biaya.getText())+","+parseNilai(this.e_materai.getText())+","+parseNilai(this.e_total.getText())+",'"+akun_ar+"','"+this.e_periode.getText()+"')");
					
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
					setTipeButton(tbUbahHapus);					
				break;
			case "ubah" :						
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																																		
				if (this.e_bayar.getText() != "0"){
					system.alert(this,"Data sudah pernah dilunasi.","Data tidak dapat diubah.");
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" : 				
				if (this.e_bayar.getText() != "0"){
					system.alert(this,"Data sudah pernah dilunasi.","Data tidak dapat dibatalkan.");
					return false;
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_tecc_m where no_tecc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_tecc_j where no_tecc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from gr_tecc_d where no_tecc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){		
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12)this.e_periode.setText(y+""+m);			
		else this.e_periode.setText(this.app._periode);									
	},
	doChange:function(sender){		
		if (sender == this.e_periode || sender == this.cb_cabang) {
			if (this.e_periode.getText()!="" && this.cb_cabang.getText()!="") 
				this.e_nb.setSQL("select no_tecc,keterangan from gr_tecc_m where posted='F' and kode_cabang='"+this.cb_cabang.getText()+"' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_tecc","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);							 		
		}
		if (sender == this.e_nilai || sender == this.e_diskon || sender == this.e_ppn || sender == this.e_biaya || sender == this.e_materai) {
			if (this.e_nilai.getText() != "" && this.e_diskon.getText()!="") {
				var neto = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_diskon.getText());
				this.e_neto.setText(floatToNilai(neto));
			}
			if (this.e_neto.getText() != "" && this.e_ppn.getText()!="" && this.e_biaya.getText()!="" && this.e_materai.getText()!="") {
				var total = nilaiToFloat(this.e_neto.getText()) + nilaiToFloat(this.e_ppn.getText()) + nilaiToFloat(this.e_biaya.getText()) + nilaiToFloat(this.e_materai.getText());
				this.e_total.setText(floatToNilai(total));
			}
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {						
			var data = this.dbLib.getDataProvider("select a.periode,a.tanggal,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nik_buat,c.nama as nama_buat,a.nik_app,d.nama as nama_app,a.kode_drk,e.nama as nama_drk "+
			           "from gr_tecc_m a inner join pp b on a.kode_pp = b.kode_pp and a.kode_lokasi=b.kode_lokasi "+	
					   "                 inner join karyawan c on a.nik_buat = c.nik and a.kode_lokasi=c.kode_lokasi "+	
					   "                 inner join karyawan d on a.nik_app = d.nik and a.kode_lokasi=d.kode_lokasi "+	
					   "                 inner join drk e on a.kode_drk = e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun=substring(a.periode,1,4)"+	
					   "where a.no_tecc='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
                    this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);					
					this.cb_pp.setText(line.kode_pp,line.nama_pp);										
					this.cb_drk.setText(line.kode_drk,line.nama_drk);										
					this.cb_buat.setText(line.nik_buat,line.nama_buat);										
					this.cb_app.setText(line.nik_app,line.nama_app);															
				} 
			}
			this.cb_inv.setSQL("select no_invoice,nama_cust from gr_tecc_d where no_tecc = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_invoice","nama_cust"],false,["No Invoice","Nama Cust"],"and","Daftar Invoice",true);							 		
		}		
		if (sender == this.cb_inv && this.cb_inv.getText()!="") {			
			var strSQL = "select a.nama_cust,a.nilai,a.diskon,a.neto,a.ppn,a.biaya,a.materai,a.total,isnull(c.bayar,0) as bayar "+
			             "from gr_tecc_d a  "+
			             "left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_teccbayar_d group by no_invoice,kode_lokasi) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_invoice ='"+this.cb_inv.getText()+"' and a.no_tecc='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					this.e_cust.setText(line.nama_cust);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_diskon.setText(floatToNilai(line.diskon));
					this.e_neto.setText(floatToNilai(line.neto));
					this.e_ppn.setText(floatToNilai(line.ppn));
					this.e_biaya.setText(floatToNilai(line.biaya));
					this.e_materai.setText(floatToNilai(line.materai));
					this.e_total.setText(floatToNilai(line.total));			
					this.e_bayar.setText(floatToNilai(line.bayar));						
				}
			}
		}
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tereksekusi");
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