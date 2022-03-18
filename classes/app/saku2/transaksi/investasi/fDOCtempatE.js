window.app_saku2_transaksi_investasi_fDOCtempatE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_investasi_fDOCtempatE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fDOCtempatE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penempatan Deposito: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Bilyet", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});		
		this.c_jenis = new saiCB(this,{bound:[20,12,180,20],caption:"Jenis",items:["DOC","DEPOSITO"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_bank = new saiCBBL(this,{bound:[20,19,200,20],caption:"Bank", multiSelection:false, maxLength:10, tag:2});		
		this.cb_doc = new saiCBBL(this,{bound:[20,20,200,20],caption:"Akun Deposito", multiSelection:false, maxLength:10, tag:2});		
		this.cb_piutang = new saiCBBL(this,{bound:[20,21,200,20],caption:"Akun Piu. Bunga", multiSelection:false, maxLength:10, tag:2});		
		this.cb_pdpt = new saiCBBL(this,{bound:[20,22,200,20],caption:"Akun Ppdt Bunga", multiSelection:false, maxLength:10, tag:2});								
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Jth Tempo", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate2"]}); 
		this.e_jml = new saiLabelEdit(this,{bound:[20,13,180,20],caption:"Jumlah Hari", readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_pbunga = new saiLabelEdit(this,{bound:[20,15,180,20],caption:"Rate [%Tahun]", tipeText:ttNilai, text:"0"});				
		this.e_basis = new saiLabelEdit(this,{bound:[20,14,180,20],caption:"Basis [Hari]", tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Nilai Penempatan", tipeText:ttNilai, text:"0"});										
						
		this.rearrangeChild(10, 23);
					
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.cb_bank.setSQL("select kode_bank, nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
			this.cb_doc.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_piutang.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_pdpt.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fDOCtempatE.extend(window.childForm);
window.app_saku2_transaksi_investasi_fDOCtempatE.implement({
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
					sql.add("delete from inv_depo_m where no_depo='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");										
					sql.add("insert into inv_depo_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,modul,no_dokumen,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,kode_bank,akun_doc,akun_piutang,akun_pdpt,nik_buat) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'-','0','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_jenis.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+nilaiToFloat(this.e_jml.getText())+","+nilaiToFloat(this.e_basis.getText())+","+nilaiToFloat(this.e_pbunga.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_bank.getText()+"','"+this.cb_doc.getText()+"','"+this.cb_piutang.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_buat.getText()+"')");
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
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_depo_m where no_depo='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
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
	},
	doSelectDate2: function(sender, y,m,d){		
		var data = this.dbLib.getDataProvider("select datediff (day ,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"') as jml ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.e_jml.setText(floatToNilai(line.jml));
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select no_depo,keterangan from inv_depo_m where progress ='0' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_depo","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {									
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro like '"+this.c_jenis.getText()+"%' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (this.c_jenis.getText() == "DEPO") {
						if (line.kode_spro == "DEPO") this.cb_doc.setText(line.flag);		
						if (line.kode_spro == "DEPOPIU") this.cb_piutang.setText(line.flag);						
						if (line.kode_spro == "DEPOBUNGA") this.cb_pdpt.setText(line.flag);
					}
					else {
						if (line.kode_spro == "DOC") this.cb_doc.setText(line.flag);		
						if (line.kode_spro == "DOCPIU") this.cb_piutang.setText(line.flag);						
						if (line.kode_spro == "DOCBUNGA") this.cb_pdpt.setText(line.flag);
					}
				}
			}			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var data = this.dbLib.getDataProvider("select modul,no_dokumen,tanggal,keterangan,kode_bank,tgl_mulai,tgl_selesai,jml_hari,p_bunga,basis,nilai,akun_doc,akun_piutang,akun_pdpt,nik_buat "+
			           "from inv_depo_m  "+			           
					   "where no_depo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.c_jenis.setText(line.modul);	
					this.dp_d1.setText(line.tanggal);					
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);															
					this.cb_bank.setText(line.kode_bank);										
					this.dp_d2.setText(line.tgl_mulai);
					this.dp_d3.setText(line.tgl_selesai);
					this.e_jml.setText(floatToNilai(line.jml_hari));
					this.e_pbunga.setText(floatToNilai(line.p_bunga));
					this.e_basis.setText(floatToNilai(line.basis));
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.cb_doc.setText(line.akun_doc);
					this.cb_piutang.setText(line.akun_piutang);
					this.cb_pdpt.setText(line.akun_pdpt);
					this.cb_buat.setText(line.nik_buat);					
				} 
			}
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Bukti : "+ this.e_nb.getText()+")");							
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