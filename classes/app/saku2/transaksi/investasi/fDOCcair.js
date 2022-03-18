window.app_saku2_transaksi_investasi_fDOCcair = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_investasi_fDOCcair.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fDOCcair";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Bunga Deposito: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"DRK BuDep", multiSelection:false, maxLength:10, tag:2 });
		this.cb_pp = new saiCBBL(this,{bound:[20,15,200,20],caption:"PP/Unit", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.cb_depo = new saiCBBL(this,{bound:[20,18,220,20],caption:"No Deposito", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_tanggal = new saiLabelEdit(this,{bound:[20,19,450,20],caption:"Tgl Mulai - JthTempo", readOnly:true});						
		this.e_rate = new saiLabelEdit(this,{bound:[20,21,200,20],caption:"Rate", readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_basis = new saiLabelEdit(this,{bound:[270,21,200,20],caption:"Basis", readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_akru = new saiLabelEdit(this,{bound:[720,21,200,20],caption:"Tot. Net Akru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nominal = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Nominal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.i_nonakru = new portalui_imageButton(this,{bound:[675,19,20,20],hint:"Non Akru",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[720,19,200,20],caption:"Tot. Net Cair", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
	
		this.p1 = new panel(this,{bound:[20,23,900,253],caption:"Data Akru Deposito"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:12,tag:9,
		            colTitle:["No Akru","Keterangan","Tgl Akru","Akun Piutang","Akun Pdpt","Kode DRK","Jml Hari","Net Akru","Bruto Hitung","Pajak","Net Cair","Biaya ADM"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[60,80,70,80,80,60,70,70,70,70,170,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[10,11]],
					colHide:[[5],[true]],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
					colFormat:[[6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
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
window.app_saku2_transaksi_investasi_fDOCcair.extend(window.childForm);
window.app_saku2_transaksi_investasi_fDOCcair.implement({
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol atau kurang.");
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
		this.cb_depo.setSQL("select no_depo, convert(varchar,tgl_mulai,103) + ' - ' +keterangan as keterangan from inv_depo_m where progress <> '0' and kode_lokasi='"+this.app._lokasi+"'",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar DOC",true);
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);			
			this.sg.clear(1); 
			this.e_akru.setText("0");	
			this.e_nilai.setText("0");
		}
		if (sender == this.cb_depo && this.cb_depo.getText()!="") {
			var data = this.dbLib.getDataProvider("select convert(varchar,tgl_mulai,103)+'     -     '+convert(varchar,tgl_selesai,103) as tgl,p_bunga,basis,nilai,akun_pdpt,akun_piutang from inv_depo_m where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_tanggal.setText(line.tgl);																				
					this.e_rate.setText(floatToNilai(line.p_bunga));
					this.e_basis.setText(floatToNilai(line.basis));
					this.e_nominal.setText(floatToNilai(line.nilai));	
					this.akunPiutang = line.akun_piutang;
					this.akunPDPT = line.akun_pdpt;
				} 
			}
			this.e_akru.setText("0");
			this.e_nilai.setText("0");			
			var strSQL = "select a.no_akru,b.keterangan,convert(varchar,a.tgl_akhir,103) as tgl_akhir,a.akun_piutang,a.akun_pdpt,a.kode_drk,a.jml_hari,a.nilai-pajak_akru as net_akru,nilai_hitung,pajak_hitung, nilai_hitung-pajak_hitung as net_hitung "+
			             "from inv_depoakru_d a inner join inv_depoakru_m b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi where a.no_depo='"+this.cb_depo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_cair='-'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_akru,line.keterangan,line.tgl_akhir,line.akun_piutang,line.akun_pdpt,line.kode_drk,floatToNilai(line.jml_hari),floatToNilai(line.net_akru),floatToNilai(line.nilai_hitung),floatToNilai(line.pajak_hitung),floatToNilai(line.net_hitung),'0']);
				}
			} else this.sg.clear(1);						
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depocair_m","no_cair",this.app._lokasi+"-DCA"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_nonakru && this.cb_depo.getText()!="") {			
			if (this.sg.cells(0,0) == "") this.sg.clear();
			var i = this.sg.rows.getLength()+1;
			this.sg.appendData(['NONAKRU-'+i,'NONAKRU',this.dp_d1.getDateString(),this.akunPiutang,this.akunPDPT,this.cb_drk.getText(),'0','0','0','0','0','0']);
		}
	},		
	doChangeCell: function(sender, col, row){
		if (col == 10) this.sg.validasi();		
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