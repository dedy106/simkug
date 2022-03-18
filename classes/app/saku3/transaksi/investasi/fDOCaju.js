window.app_saku3_transaksi_investasi_fDOCaju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fDOCaju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fDOCaju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Penempatan Deposito: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Bilyet", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});								
		this.c_jenis = new saiCB(this,{bound:[20,14,202,20],caption:"Jenis",items:["DOC","DEPOSITO"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.c_stsdana = new saiCB(this,{bound:[20,15,202,20],caption:"Status Dana",items:["DAKES","DAKEM"], readOnly:true,tag:2});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,222,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app1 = new saiCBBL(this,{bound:[20,17,222,20],caption:"Pejabat TTD1", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app2 = new saiCBBL(this,{bound:[20,18,222,20],caption:"Pejabat TTD2", multiSelection:false, maxLength:10, tag:2});				
		this.cb_bsumber = new saiCBBL(this,{bound:[20,11,222,20],caption:"Bank Deposito", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.cb_bcair = new saiCBBL(this,{bound:[20,12,222,20],caption:"Bank Pencairan", multiSelection:false, maxLength:10, tag:2});				
		this.cb_bbunga = new saiCBBL(this,{bound:[20,13,222,20],caption:"Bank Bunga", multiSelection:false, maxLength:10, tag:2});						
		this.cb_bank = new saiCBBL(this,{bound:[20,19,222,20],caption:"Bank Sumber", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.cb_doc = new saiCBBL(this,{bound:[20,20,222,20],caption:"Akun Deposito", multiSelection:false, maxLength:10, tag:2});		
		this.cb_piutang = new saiCBBL(this,{bound:[20,21,222,20],caption:"Akun Piu. Bunga", multiSelection:false, maxLength:10, tag:2});		
		this.cb_pdpt = new saiCBBL(this,{bound:[20,22,222,20],caption:"Akun Ppdt Bunga", multiSelection:false, maxLength:10, tag:2});								
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl3 = new portalui_label(this,{bound:[270,11,100,18],caption:"Tgl Jth Tempo", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[370,11,100,18],selectDate:[this,"doSelectDate2"]}); 		
		this.e_jml = new saiLabelEdit(this,{bound:[20,13,180,20],caption:"Jumlah Hari", readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_pbunga = new saiLabelEdit(this,{bound:[270,13,180,20],caption:"Rate [%Tahun]", tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,220,20],caption:"Nilai Penempatan", tipeText:ttNilai, text:"0"});										
		this.e_basis = new saiLabelEdit(this,{bound:[270,18,180,20],caption:"Basis [Hari]", tipeText:ttNilai, text:"0"});						
		this.e_fax = new saiLabelEdit(this,{bound:[20,14,220,20],caption:"No Faximile", maxLength:50,tag:2});		
		this.e_pyakes = new saiLabelEdit(this,{bound:[20,15,220,20],caption:"PIC Pihak Yakes",  maxLength:50,tag:2});		
		this.e_pmitra = new saiLabelEdit(this,{bound:[270,15,220,20],caption:"PIC Pihak Mitra",  maxLength:50,tag:2});				
		this.cb_kelola = new saiCBBL(this,{bound:[20,12,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:2});				
		
		
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
			this.cb_bsumber.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
			this.cb_bcair.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
			this.cb_bbunga.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);			
			this.cb_bank.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);			
			
			this.cb_doc.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_piutang.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_pdpt.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);			
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_app1.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK App 1",true);			
			this.cb_app2.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK App 2",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			this.c_jenis.setText("DOC");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fDOCaju.extend(window.childForm);
window.app_saku3_transaksi_investasi_fDOCaju.implement({
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
					sql.add("insert into inv_depo_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,modul,no_dokumen,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,kode_bank,akun_doc,akun_piutang,akun_pdpt,nik_buat,nik_app1,nik_app2,bsumber,bcair,bbunga,no_fax,p_yakes,p_mitra,status_dana,kode_kelola) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'-','0','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_jenis.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+nilaiToFloat(this.e_jml.getText())+","+nilaiToFloat(this.e_basis.getText())+","+nilaiToFloat(this.e_pbunga.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_bank.getText()+"','"+this.cb_doc.getText()+"','"+this.cb_piutang.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.cb_bsumber.getText()+"','"+this.cb_bcair.getText()+"','"+this.cb_bbunga.getText()+"','"+this.e_fax.getText()+"','"+this.e_pyakes.getText()+"','"+this.e_pmitra.getText()+"','"+this.c_stsdana.getText()+"','"+this.cb_kelola.getText()+"')");
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
					this.doClick(this.i_gen);
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
		this.doClick(this.i_gen);
	},
	doSelectDate2: function(sender, y,m,d){		
		var data = this.dbLib.getDataProvider("select datediff (day ,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"') as jml ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.e_jml.setText(floatToNilai(line.jml));
		}
	},
	doChange:function(sender){
		if (sender == this.cb_bsumber && this.cb_bsumber.getText()!="") {
			this.cb_bcair.setText(this.cb_bsumber.getText());
			this.cb_bbunga.setText(this.cb_bsumber.getText());
		}
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {												
			if (this.c_jenis.getText() == "DEPOSITO") var strSQL ="select kode_spro,flag from spro where kode_spro like 'DEPO%' and kode_lokasi = '"+this.app._lokasi+"'";
			else var strSQL ="select kode_spro,flag from spro where kode_spro like 'DOC%' and kode_lokasi = '"+this.app._lokasi+"'";
			
			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (this.c_jenis.getText() == "DEPOSITO") {
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
		if (sender == this.cb_bank && this.cb_bank.getText()!="") {
			var strSQL = "select a.jml_hari,a.p_bunga from inv_bank a inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp where a.kode_bank='"+this.cb_bank.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.e_basis.setText(floatToNilai(line.jml_hari));
				this.e_pbunga.setText(floatToNilai(line.p_bunga));				
			} 
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000"));
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