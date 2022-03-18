window.app_saku3_transaksi_investasi_fDOCtutup = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fDOCtutup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fDOCtutup";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penutupan Deposito: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});								
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenisdata = new saiCB(this,{bound:[20,22,180,20],caption:"Jenis Data",items:["JTHTEMPO","ALL"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_depo = new saiCBBL(this,{bound:[20,18,220,20],caption:"No Deposito", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_akun = new saiLabelEdit(this,{bound:[20,19,450,20],caption:"Akun Deposito", readOnly:true});						
		this.e_bank = new saiLabelEdit(this,{bound:[20,20,450,20],caption:"Bank", readOnly:true});						
		this.e_tanggal = new saiLabelEdit(this,{bound:[20,19,450,20],caption:"Tgl Mulai - JthTempo", readOnly:true});						
		this.e_rate = new saiLabelEdit(this,{bound:[20,21,200,20],caption:"Rate", tipeText:ttNilai, text:"0"});				
		this.e_basis = new saiLabelEdit(this,{bound:[270,21,200,20],caption:"Basis", tipeText:ttNilai, text:"0"});								
		this.e_nominal = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Nominal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});									
		this.e_pinalti = new saiLabelEdit(this,{bound:[270,19,200,20],caption:"Biaya Pinalti", tag:1, tipeText:ttNilai, text:"0"});											
		this.c_jenis = new saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["TUTUP","PERPANJANG"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_biaya = new saiLabelEdit(this,{bound:[270,12,200,20],caption:"Biaya Administrasi", tag:1, tipeText:ttNilai, text:"0"});									
				
		this.e_nb2 = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"No Deposito Baru",maxLength:30,readOnly:true,text:"-"});
		this.e_dok = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"No Bilyet", maxLength:50});								
		this.c_status = new saiCB(this,{bound:[20,12,180,20],caption:"Modul",items:["DEPOSITO","DOC"], readOnly:true,tag:2});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Mulai Baru", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Jth Tempo Baru", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18]}); 
		this.e_npanjang = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Nilai Perpanjang", tag:9, tipeText:ttNilai, text:"0"});											
		this.cb_bsumber = new saiCBBL(this,{bound:[20,19,200,20],caption:"Bank Deposito", multiSelection:false, maxLength:10, tag:9});				
		
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
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='INAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.c_jenisdata.setText("JTHTEMPO");
			this.cb_bsumber.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fDOCtutup.extend(window.childForm);
window.app_saku3_transaksi_investasi_fDOCtutup.implement({
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
					var vPosted = "X";
					if (this.c_jenis.getText()=="PERPANJANG") {
						this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000"));			
						if (nilaiToFloat(this.e_nominal.getText()) == nilaiToFloat(this.e_npanjang.getText())) var noKas = this.e_nb.getText();
						else var noKas = "-";
						if (this.c_status.getText() == "DEPOSITO") var strSQL ="select kode_spro,flag from spro where kode_spro like 'DEPO%' and kode_lokasi = '"+this.app._lokasi+"'";
						else var strSQL ="select kode_spro,flag from spro where kode_spro like 'DOC%' and kode_lokasi = '"+this.app._lokasi+"'";						
						var data = this.dbLib.getDataProvider(strSQL,true);			
						if (typeof data == "object"){
							var line;
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								if (this.c_status.getText() == "DEPOSITO") {
									if (line.kode_spro == "DEPO") this.akundoc = line.flag;
									if (line.kode_spro == "DEPOPIU") this.akunpiutang = line.flag;
									if (line.kode_spro == "DEPOBUNGA") this.akunpdpt = line.flag;									
									if (line.kode_spro == "DEPODAKEM") this.akundakem = line.flag;									
								}
								else {
									if (line.kode_spro == "DOC") this.akundoc = line.flag;
									if (line.kode_spro == "DOCPIU") this.akunpiutang = line.flag;
									if (line.kode_spro == "DOCBUNGA") this.akunpdpt = line.flag;
									if (line.kode_spro == "DOCDAKEM") this.akundakem = line.flag;									
								}
							}
						}												
												
						var data = this.dbLib.getDataProvider("select status_dana from inv_depo_m where no_depo='"+this.cb_depo.getText()+"' ",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];							
							if (line.status_dana == "DAKEM") this.akunpdpt = this.akundakem;
						}
												
						sql.add("insert into inv_depo_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,modul,no_dokumen,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,bsumber,akun_doc,akun_piutang,akun_pdpt,nik_buat,status_dana) "+
						       "select '"+this.e_nb2.getText()+"',kode_lokasi,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','1','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_status.getText()+"','"+this.e_dok.getText()+"',keterangan,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',datediff(day,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"'),"+nilaiToFloat(this.e_basis.getText())+","+nilaiToFloat(this.e_rate.getText())+","+nilaiToFloat(this.e_npanjang.getText())+",'"+this.cb_bsumber.getText()+"','"+this.akundoc+"','"+this.akunpiutang+"','"+this.akunpdpt+"','"+this.cb_buat.getText()+"',status_dana "+
							   "from inv_depo_m where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
						if (this.c_status.getText()!= this.modulLama) {
							vPosted = "F";
							sql.add("insert into inv_depotutup_j(no_tutup,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.e_nb2.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akundoc+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_npanjang.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','DOCPJNG','DOCBARU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
							sql.add("insert into inv_depotutup_j(no_tutup,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunDOCLama+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_npanjang.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','DOCPJNG','DOCLAMA','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						}					
					} else var noKas = "-";
					
					//tutup
					var nilai = nilaiToFloat(this.e_nominal.getText()) - nilaiToFloat(this.e_npanjang.getText());
					sql.add("insert into inv_depotutup_m(no_tutup,no_depo,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,modul,nik_buat,nik_setuju,kode_lokasi,periode,akun_doc,nik_user,tgl_input,no_kas,jenis,nilai_pinalti,nilai_adm,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilai+",'"+this.app._kodePP+"','DOCTTP','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.akunDOCLama+"','"+this.app._userLog+"',getdate(),'"+noKas+"','"+this.c_jenis.getText()+"',"+nilaiToFloat(this.e_pinalti.getText())+","+nilaiToFloat(this.e_biaya.getText())+",'"+vPosted+"')");
					
					if (this.c_jenis.getText()=="PERPANJANG") var vProgress = "X";
					else var vProgress = "Z";
					
					sql.add("update inv_depo_m set progress='"+vProgress+"' where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);					
					setTipeButton(tbSimpan);
					this.e_nb2.setText("-");	
					this.c_jenis.setText("TUTUP");
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.c_jenis.getText()=="PERPANJANG" && ((nilaiToFloat(this.e_nominal.getText()) < nilaiToFloat(this.e_npanjang.getText())) || (nilaiToFloat(this.e_npanjang.getText()) <= 0) )) {
					system.alert(this,"Nilai Perpanjang tidak valid.","Melebihi nominal deposito awal atau kurang dari sama dengan nol.");
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
		this.e_nb.setText("");        		
	},
	doChange:function(sender){		
		if (sender == this.c_jenisdata) {
			this.cb_depo.setText("","");
			if (this.c_jenisdata.getText() == "JTHTEMPO") 
				this.cb_depo.setSQL("select no_depo, keterangan from inv_depo_m where  tgl_selesai<='"+this.dp_d1.getDateString()+"' and progress ='1' and kode_lokasi='"+this.app._lokasi+"' ",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar DOC",true);		
			else this.cb_depo.setSQL("select no_depo, keterangan from inv_depo_m where progress ='1' and kode_lokasi='"+this.app._lokasi+"'",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar DOC",true);		
		}
		if (sender == this.cb_depo && this.cb_depo.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.tgl_selesai,convert(varchar,a.tgl_mulai,103)+'     -     '+convert(varchar,a.tgl_selesai,103) as tgl,a.p_bunga,a.basis,a.nilai,a.akun_doc +' - '+b.nama as nama_akun,a.bsumber +' - '+ c.nama as nama_bank,akun_doc,a.kode_bank,a.bsumber,a.modul "+
			           "from inv_depo_m a inner join masakun b on a.akun_doc=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join inv_bank c on a.bsumber=c.kode_bank "+
					   "where a.no_depo='"+this.cb_depo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.akunDOCLama = line.akun_doc;
					this.modulLama = line.modul;
					this.e_akun.setText(line.nama_akun);																				
					this.e_bank.setText(line.nama_bank);																				
					this.e_tanggal.setText(line.tgl);																				
					this.e_rate.setText(floatToNilai(line.p_bunga));
					this.e_basis.setText(floatToNilai(line.basis));
					this.e_nominal.setText(floatToNilai(line.nilai));					
					this.dp_d2.setText(line.tgl_selesai);
					this.dp_d3.setText(line.tgl_selesai);
					this.e_npanjang.setText("0");					
					this.cb_bsumber.setText(line.bsumber);
				} 
			}			
		}
		if (sender == this.c_jenis && this.c_jenis.getText()=="PERPANJANG") {
			this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_npanjang.setText(floatToNilai(nilaiToFloat(this.e_nominal.getText())));					
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depotutup_m","no_tutup",this.app._lokasi+"-DTP"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
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