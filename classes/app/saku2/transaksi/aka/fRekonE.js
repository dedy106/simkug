window.app_saku2_transaksi_aka_fRekonE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fRekonE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fRekonE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekonsiliasi Pelunasan Tagihan : Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_titip = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Pelunasan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_piutang = new saiLabelEdit(this,{bound:[660,17,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_nim = new saiCBBL(this,{bound:[20,18,200,20],caption:"Mahasiswa", readOnly:true});
		this.e_nilai = new saiLabelEdit(this,{bound:[660,18,200,20],caption:"Total Rekon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,840,303],caption:"Data Tagihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:8,tag:0,
		            colTitle:["No Invoice","Periode","Kode Produk","Nama Produk","Akun Piutang","Saldo Tagihan","Nilai Pelunasan","ID Bank"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,100,70,120,80,80,150]],
					colFormat:[[5,6],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5],[6,7]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
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
			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			this.cb_nim.setSQL("select nim, nama from aka_mahasiswa where kode_lokasi='"+this.app._lokasi+"'",["nim","nama"],false,["NIM","Nama"],"and","Daftar Mahasiswa",true);
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
window.app_saku2_transaksi_aka_fRekonE.extend(window.childForm);
window.app_saku2_transaksi_aka_fRekonE.implement({
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
					sql.add("delete from aka_rekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_rekon_j where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_nilai.getText())+",'F','REKON','"+this.cb_titip.getText()+"','"+this.cb_nim.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','REKON','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(6,i) != "0"){
								sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.sg.cells(6,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','REKON','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank) values "+
										"	('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(6,i))+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','D','REKON','"+this.sg.cells(7,i)+"')");
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
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(6,i) != "0"){
						if (nilaiToFloat(this.sg.cells(5,i)) < nilaiToFloat(this.sg.cells(6,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh melebihi saldo. Baris : "+k);
							return false;						
						}
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai rekonsiliasi tidak boleh nol atau kurang.");
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
					sql.add("delete from aka_rekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_rekon_j where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
	},
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_rekon, keterangan from aka_rekon_m where modul = 'REKON' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_rekon","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select distinct convert(varchar,tanggal,103) as tanggal,a.keterangan,a.periode,a.akun_titip,a.nim,b.nama as nama_mhs,c.nama as nama_titip,a.nik_buat,a.nik_app,d.nama as nama_buat,e.nama as nama_app "+
					   "from aka_rekon_m a "+
					   "	inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
					   "	inner join masakun c on a.akun_titip=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					   "	inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
					   "	inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+
					   "where a.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.cb_nim.setText(line.nim,line.nama_mhs);
					this.cb_titip.setText(line.akun_titip,line.nama_titip);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);
				} 
			}
			var data = this.dbLib.getDataProvider("select a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,(a.nilai-isnull(x.tot_batal,0)-isnull(b.tot_lunas,0)) as saldo,xx.nilai "+
						 "from aka_rekon_d xx "+
						 "      inner join aka_bill_d a on a.no_inv=xx.no_inv and a.kode_produk=xx.kode_produk and a.kode_lokasi=xx.kode_lokasi "+
						 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
						 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "                 from aka_rekon_d where no_rekon <> '"+this.e_nb.getText()+"' and nim = '"+this.cb_nim.getText()+"' group by no_inv,kode_produk,kode_lokasi) b on a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
						 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
						 "                 from aka_batal_d where nim = '"+this.cb_nim.getText()+"' group by no_inv,kode_produk,kode_lokasi) x on a.no_inv=x.no_inv and a.kode_produk=x.kode_produk and a.kode_lokasi=x.kode_lokasi "+						 
						 "where (a.nilai-isnull(x.tot_batal,0)-isnull(b.tot_lunas,0)) > 0 and xx.no_rekon = '"+this.e_nb.getText()+"' and xx.kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 6) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var totP = totB = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "" && this.sg.cells(6,i) != ""){
					totP += nilaiToFloat(this.sg.cells(5,i));
					totB += nilaiToFloat(this.sg.cells(6,i));
				}
			}
			this.e_piutang.setText(floatToNilai(totP));
			this.e_nilai.setText(floatToNilai(totB));
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