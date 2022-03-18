window.app_saku3_transaksi_investasi_fDOCcairE = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fDOCcairE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fDOCcairE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Bunga Deposito: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"DRK BuDep", multiSelection:false, maxLength:10, tag:2 });
		this.cb_pp = new saiCBBL(this,{bound:[20,15,200,20],caption:"PP/Unit", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.cb_depo = new saiCBBL(this,{bound:[20,18,220,20],caption:"No Deposito", readOnly:true, tag:1});
		this.e_tanggal = new saiLabelEdit(this,{bound:[20,19,450,20],caption:"Tgl Mulai - JthTempo", readOnly:true});						
		this.e_rate = new saiLabelEdit(this,{bound:[20,21,200,20],caption:"Rate", readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_basis = new saiLabelEdit(this,{bound:[270,21,200,20],caption:"Basis", readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_akru = new saiLabelEdit(this,{bound:[720,21,200,20],caption:"Tot. Net Akru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nominal = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Nominal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.e_nilai = new saiLabelEdit(this,{bound:[720,19,200,20],caption:"Tot. Net Cair", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
	
		this.p1 = new panel(this,{bound:[20,23,900,213],caption:"Data Akru Deposito"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:12,tag:9,
		            colTitle:["No Akru","Keterangan","Tgl Akru","Akun Piutang","Akun Pdpt","Kode DRK","Jml Hari","Net Akru","Bruto Hitung","Pajak","Net Cair","Nilai ADM"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[60,80,70,80,80,60,70,70,70,70,170,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[10,11]],
					colHide:[[5],[true]],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
					colFormat:[[6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
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
						
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP/Unit",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='FAAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.cb_pp.setText(this.app._kodePP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fDOCcairE.extend(window.childForm);
window.app_saku3_transaksi_investasi_fDOCcairE.implement({
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
					sql.add("delete from inv_depocair_m where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depocair_j where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='DOCCAIR'");
					sql.add("update inv_depoakru_d set no_cair='-',nilai_cair=0  where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("update inv_depo_m set tgl_akru = tgl_akru_seb where no_depo = '"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");					
					
					sql.add("insert into inv_depocair_m(no_cair,no_depo,tanggal,keterangan,kode_curr,kurs,nilai_rev,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_akru.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','F','DOCCAIR','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");														
					sql.add("update inv_depo_m set tgl_akru = '"+this.dp_d1.getDateString()+"' where no_depo = '"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(10,i) != "" && this.sg.cells(10,i) != "0"){
							if (this.sg.cells(0,i).substr(0,7) != "NONAKRU") {
								sql.add("insert into inv_depocair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(4,i)+"','"+this.sg.cells(1,i)+"','D',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.cb_pp.getText()+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','DOCCAIR','PDPTREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
								sql.add("insert into inv_depocair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(3,i)+"','"+this.sg.cells(1,i)+"','C',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.cb_pp.getText()+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','DOCCAIR','PIUREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");		
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','DOCCAIR','"+this.app._lokasi+"','"+this.sg.cells(4,i)+"','"+this.cb_pp.getText()+"','"+this.sg.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.sg.cells(7,i))+")");												
								sql.add("update inv_depoakru_d set no_cair='"+this.e_nb.getText()+"',nilai_cair="+nilaiToFloat(this.sg.cells(10,i))+",nilai_adm="+nilaiToFloat(this.sg.cells(11,i))+" where no_depo='"+this.cb_depo.getText()+"' and no_akru='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
							else {
								sql.add("insert into inv_depoakru_d(no_akru,no_depo,periode,nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,dc,no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm) values "+
										"('"+this.sg.cells(0,i)+"','"+this.cb_depo.getText()+"','"+this.e_periode.getText()+"',0,'"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','D','-',"+nilaiToFloat(this.e_nominal.getText())+",0,'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','-',"+nilaiToFloat(this.sg.cells(10,i))+",0,0,0,"+nilaiToFloat(this.sg.cells(11,i))+")");
							}
							sql.add("insert into inv_depocair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(3,i)+"','"+this.sg.cells(1,i)+"','D',"+nilaiToFloat(this.sg.cells(10,i))+",'"+this.cb_pp.getText()+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','DOCCAIR','PIUCAIR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
							sql.add("insert into inv_depocair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(4,i)+"','"+this.sg.cells(1,i)+"','C',"+nilaiToFloat(this.sg.cells(10,i))+",'"+this.cb_pp.getText()+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','DOCCAIR','PDPTCAIR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																	
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
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol atau kurang.");
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
					sql.add("delete from inv_depocair_m where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depocair_j where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='DOCCAIR'");
					sql.add("update inv_depoakru_d set no_cair='-',nilai_cair=0 where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					sql.add("update inv_depo_m set tgl_akru = tgl_akru_seb where no_depo = '"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
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
		if (sender == this.e_periode) {			
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);					
			this.sg.clear(1); 
			this.e_akru.setText("0");	
			this.e_nilai.setText("0");			
			this.e_nb.setSQL("select no_cair, keterangan from inv_depocair_m where no_del='-' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_cair not in ("+
							 "select distinct no_cair from inv_depoakru_d where no_kas<>'-' and kode_lokasi='"+this.app._lokasi+"' "+
							 ")",["no_cair","keterangan"],false,["No Cair","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {		
			var data = this.dbLib.getDataProvider(
			           "select a.no_depo,a.keterangan,convert(varchar,a.tgl_mulai,103)+'     -     '+convert(varchar,a.tgl_selesai,103) as tanggal,a.p_bunga,a.basis,a.nilai, "+
			           "b.keterangan as ket,b.periode,b.tanggal as tgl,b.kode_drk,b.kode_pp,b.nik_buat,b.nik_setuju "+
					   "from inv_depo_m a inner join inv_depocair_m b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+					
					   "where b.no_cair='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.perLama = line.periode;
					this.dp_d1.setText(line.tgl);
					this.e_ket.setText(line.ket);																				
					this.cb_drk.setText(line.kode_drk);					
					this.cb_pp.setText(line.kode_pp);					
					this.cb_buat.setText(line.nik_buat);					
					this.cb_app.setText(line.nik_setuju);										
					this.cb_depo.setText(line.no_depo,line.keterangan);					
					this.e_tanggal.setText(line.tanggal);																				
					this.e_rate.setText(floatToNilai(line.p_bunga));
					this.e_basis.setText(floatToNilai(line.basis));
					this.e_nominal.setText(floatToNilai(line.nilai));					
				} 
			}
			this.e_akru.setText("0");
			this.e_nilai.setText("0");
			var strSQL = "select a.no_akru,b.keterangan,convert(varchar,a.tgl_akhir,103) as tgl_akhir,a.akun_piutang,a.akun_pdpt,a.kode_drk,a.jml_hari,a.nilai-a.pajak_akru as net_akru,a.nilai_hitung,a.nilai_cair,a.pajak_hitung,nilai_adm "+
			             "from inv_depoakru_d a inner join inv_depoakru_m b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_cair<>a.no_akru and a.no_depo='"+this.cb_depo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_cair='"+this.e_nb.getText()+"' "+
						 "union "+
						 "select a.no_akru,'-' as keterangan,convert(varchar,a.tgl_akhir,103) as tgl_akhir,'-' as akun_piutang,a.akun_pdpt,'-' as kode_drk,a.jml_hari,a.nilai-a.pajak_akru as net_akru,a.nilai_hitung,a.nilai_cair,a.pajak_hitung,nilai_adm "+
			             "from inv_depoakru_d a where a.no_cair=a.no_akru and a.no_depo='"+this.cb_depo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_cair='"+this.e_nb.getText()+"' ";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_akru,line.keterangan,line.tgl_akhir,line.akun_piutang,line.akun_pdpt,line.kode_drk,floatToNilai(line.jml_hari),floatToNilai(line.net_akru),floatToNilai(line.nilai_hitung),floatToNilai(line.pajak_hitung),floatToNilai(line.nilai_cair),floatToNilai(line.nilai_adm)]);
				}
			} else this.sg.clear(1);						
		}
	},			
	doChangeCell: function(sender, col, row){
		if (col == 10 ) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{						
			var akru = cair = pajak = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(10,i) != ""){
					akru += nilaiToFloat(this.sg.cells(7,i));				
					cair += nilaiToFloat(this.sg.cells(10,i));									
				}
			}
			this.e_akru.setText(floatToNilai(akru));
			this.e_nilai.setText(floatToNilai(cair));			
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