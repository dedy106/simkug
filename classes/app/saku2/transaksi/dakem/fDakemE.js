window.app_saku2_transaksi_dakem_fDakemE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_dakem_fDakemE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_dakem_fDakemE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Klaim DAKEM: Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.e_nik = new saiLabelEdit(this,{bound:[20,14,180,20],caption:"NIK - Nama", readOnly:true});
		this.e_nama = new saiLabelEdit(this,{bound:[222,14,252,20],caption:"Nama",labelWidth:0,readOnly:true});		
		this.e_mkerja = new saiLabelEdit(this,{bound:[20,16,180,20],caption:"Masa Kerja - Alamat",readOnly:true});
		this.e_alamat = new saiLabelEdit(this,{bound:[222,16,252,20],caption:"Alamat",labelWidth:0,readOnly:true});		
		this.e_aw = new saiLabelEdit(this,{bound:[20,14,454,20],caption:"Ahli Waris", maxLength:50});		
		this.c_status = new saiCB(this,{bound:[20,22,222,20],caption:"Status Ahli Waris",items:["PASANGAN","ANAK","KERABAT LAINNYA"], readOnly:true,tag:2,change:[this,"doChange"]});
		
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.c_jenis = new saiCB(this,{bound:[20,21,182,20],caption:"Jenis Pembayaran",items:["TUNAI","TRANSFER"],change:[this,"doChange"]});
		
		this.e_bank = new saiLabelEdit(this,{bound:[20,14,452,20],caption:"Nama Bank", maxLength:50,tag:9});		
		this.e_cabang = new saiLabelEdit(this,{bound:[20,15,452,20],caption:"Cabang", maxLength:50,tag:9});		
		this.e_norek = new saiLabelEdit(this,{bound:[20,16,452,20],caption:"No Rekening", maxLength:50,tag:9});		
		this.e_namarek = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Nama Rekening", maxLength:50,tag:9});		
		this.e_nilai = new saiLabelEdit(this,{bound:[640,17,180,20],caption:"Nilai", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.p1 = new panel(this,{bound:[20,23,800,180],caption:"Data Peserta Meninggal"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:8,tag:9,
		            colTitle:["NIKES","Nama","Tgl Meninggal","Tgl Klaim","Nilai","Status Klaim","No Kas","Tgl Lahir"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,100,100,100,100,150,80]],
					columnReadOnly:[true,[0,1,2,3,5,6,7],[4]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],colFormat:[[4],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		
		this.rearrangeChild(10, 23);
					
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbSika = new util_dbLib(undefined,'dbSIKA');
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
		
		    this.c_jenis.setText("TUNAI");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_dakem_fDakemE.extend(window.childForm);
window.app_saku2_transaksi_dakem_fDakemE.implement({
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
			if (this.c_jenis.getText() == "TUNAI") {
				this.e_bank.setTag("9");
				this.e_cabang.setTag("9");
				this.e_norek.setTag("9");
				this.e_namarek.setTag("9");
			}
			else {
				this.e_bank.setTag("0");
				this.e_cabang.setTag("0");
				this.e_norek.setTag("0");
				this.e_namarek.setTag("0");
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from yk_dakem_m where no_dakem='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_dakem_d where kdtrans='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into yk_dakem_m(no_dakem, kode_lokasi, periode, nik_user, tgl_input, tanggal, no_dokumen, keterangan, nik_buat, nik, aw, status_aw, tgl_transfer, jenis_bayar, bank, cabang, no_rek, nama_rek,alamat) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"', '"+this.e_ket.getText()+"', '"+this.cb_buat.getText()+"', '"+this.e_nik.getText()+"', '"+this.e_aw.getText()+"', '"+this.c_status.getText()+"', '"+this.dp_d2.getDateString()+"', '"+this.c_jenis.getText()+"', '"+this.e_bank.getText()+"', '"+this.e_cabang.getText()+"', '"+this.e_norek.getText()+"', '"+this.e_namarek.getText()+"','"+this.e_alamat.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(5,i) == "BELUM"){
								sql.add("insert into yk_dakem_d(kdtrans, nik, nikkes, namaaw, statusaw, nominal, tglmeninggal, namabank, norek, cabang, no_kas, kode_lokasi, periode,nama_nikes,tgl_lahir) values "+
										"('"+this.e_nb.getText()+"', '"+this.e_nik.getText()+"', '"+this.sg.cells(0,i)+"', '"+this.e_aw.getText()+"', '"+this.c_status.getText()+"', "+nilaiToFloat(this.sg.cells(4,i))+", '"+this.sg.getCellDateValue(2,i)+"', '"+this.e_bank.getText()+"', '"+this.e_norek.getText()+"', '"+this.e_cabang.getText()+"', '-', '"+this.app._lokasi+"', '"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.getCellDateValue(7,i)+"')");
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
					setTipeButton(tbHapus);					
				break;
			case "ubah" :					
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(6,i) != "-"){
							system.alert(this,"Transaksi tidak valid.","Transaksi sudah dibayarkan");
							return false;						
						}
					}
				}
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
			case "hapus" :	
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(6,i) != "-"){
							system.alert(this,"Transaksi tidak valid.","Transaksi sudah dibayarkan");
							return false;						
						}
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_dakem_m where no_dakem='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_dakem_d where kdtrans='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {		
			this.e_nb.setSQL("select no_dakem, keterangan from yk_dakem_m where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_dakem","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data4 = this.dbLib.getDataProvider("select nikkes from yk_dakem_d where kdtrans='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);	
			if (typeof data4 == "object"){
				var line4 = data4.rs.rows[0];							
				if (line4 != undefined){										
					this.nikkes = line4.nikkes;
				}						
			}			
			var strSQL = "select * from yk_dakem_m where no_dakem='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);	
					this.e_dok.setText(line.no_dokumen);					
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat);
					this.e_nik.setText(line.nik);
					this.e_aw.setText(line.aw);
					this.c_status.setText(line.status_aw);					
					this.dp_d2.setText(line.tgl_transfer);	
					this.c_jenis.setText(line.jenis_bayar);					
					
					this.e_bank.setText(line.bank);
					this.e_cabang.setText(line.cabang);
					this.e_norek.setText(line.norek);
					this.e_namarek.setText(line.namarek);
										
					var data0 = this.dbSika.getDataProvider("select almt,nm_peserta,nikes,floor(datediff(day,tgl_capeg,tgl_henti_kerja)/365.2199) as mkerja from v_peserta_dakem where nikes = '"+this.e_nik.getText()+".000' and nik='"+this.e_nik.getText()+"' ",true);	
					if (typeof data0 == "object"){
						var line0 = data0.rs.rows[0];							
						if (line0 != undefined){					
							this.e_nama.setText(line0.nm_peserta);					
							this.e_mkerja.setText(line0.mkerja);			
							this.e_alamat.setText(line0.almt);								
						} 
					}	
					var strSQL = "select convert(varchar,tgl_lhr,103) as tgl_lhr,nikes,nm_peserta,convert(varchar,cast(tgl_meninggal as date),103) as tgl_meninggal,'-' as status,0 as nilai from v_peserta_dakem where nikes = '"+this.nikkes+"' and nik='"+this.e_nik.getText()+"' and tgl_meninggal is not null";					
					var data1 = this.dbSika.getDataProvider(strSQL,true);	
					if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
						var line1;
						this.sg.clear();
						for (var i in data1.rs.rows){
							line1 = data1.rs.rows[i];																													
							this.sg.appendData([line1.nikes,line1.nm_peserta,line1.tgl_meninggal,line1.status,floatToNilai(line1.nilai),"BELUM","-",line1.tgl_lhr]);
						}
					} else this.sg.clear(1);									
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){					
							var data2 = this.dbLib.getDataProvider("select convert(varchar,tglmeninggal,103) as tgl,nominal,no_kas from yk_dakem_d where nikkes='"+this.sg.cells(0,i)+"' ",true);	
							if (typeof data2 == "object"){
								var line2 = data2.rs.rows[0];							
								if (line2 != undefined){					
									this.sg.cells(3,i,line2.tgl)
									this.sg.cells(4,i,floatToNilai(line2.nominal))
									this.sg.cells(5,i,"BELUM");
									this.sg.cells(6,i,line2.no_kas)
								}						
							}					
						}
					}
					this.sg.validasi();
			
				} 
			}	
		}		
		if (sender == this.c_jenis || this.c_jenis.getText()!="") {
			if (this.c_jenis.getText() == "TUNAI") {
				this.e_bank.setReadOnly(true);
				this.e_cabang.setReadOnly(true);
				this.e_norek.setReadOnly(true);
				this.e_namarek.setReadOnly(true);
			}
			else {
				this.e_bank.setReadOnly(false);
				this.e_cabang.setReadOnly(false);
				this.e_norek.setReadOnly(false);
				this.e_namarek.setReadOnly(false);
			}
		}
	},	
	doChangeCell: function(sender, col, row){
		if ((col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) == "BELUM" && this.sg.cells(4,i) != "") tot += nilaiToFloat(this.sg.cells(4,i));				
			}
			this.e_nilai.setText(floatToNilai(tot));			
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
