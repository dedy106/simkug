window.app_saku3_transaksi_yspt_dikti_fAkruBatal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fAkruBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fAkruBatal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Akru Tagihan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_titip = new saiCBBL(this,{bound:[20,18,220,20],caption:"PDD Pelunasan", multiSelection:false, maxLength:10, tag:2 });				
		this.cb_akru = new saiCBBL(this,{bound:[20,19,220,20],caption:"Bukti Akru", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"] });				
		this.bTampil = new button(this,{bound:[120,11,98,20],caption:"Rekap Tagihan", click:[this,"doLoad"]});
		
		this.e_piutang = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_amor = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Total Distribusi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_lunas = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.p1 = new panel(this,{bound:[20,23,1000,340],caption:"Data Tagihan",visible:false});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:15,tag:9,
		            colTitle:["No Bill","Periode","Kode Produk","Nama Produk","Akun Piutang","Akun PDPT","Akun PYT","Nilai Piutang","Nilai Amortisasi","Nilai Pelunasan","Kode DRK","Kode PP","Kode Akt","Tahun Aka","Kode Jalur"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,100,100,100,100,70,70,70,100,80,60,150]],
					colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoPaging:true, rowPerPage:20,
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
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
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_titip.setText(line.flag,line.nama);
			} else this.cb_titip.setText("","");									
			
			this.isiCBakru();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_dikti_fAkruBatal.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fAkruBatal.implement({
	isiCBakru: function(){
		this.cb_akru.setSQL("select no_bukti, keterangan from trans_m where form = 'MHSBILL' and periode <='"+this.e_periode.getText()+"' and no_ref1='-' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
	},
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
			if (this.e_lunas.getText() != "0") this.cb_titip.setTag("2"); 
			else this.cb_titip.setTag("9"); 
			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BBT"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
								
					sql.add("update trans_m set no_ref1 ='"+this.e_nb.getText()+"' where no_bukti='"+this.cb_akru.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");				
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,due_date,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','MHSBILREV','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"', '-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_piutang.getText())+","+parseNilai(this.e_amor.getText())+","+parseNilai(this.e_lunas.getText())+",'-','-','-','"+this.cb_akru.getText()+"','-','-','-','-','-')");

					sql.add("insert into dikti_bill_d(no_bill,kode_lokasi,kode_ta,nim,kode_param,akun_piutang,dc,nilai,periode,periode_dis,modul) "+							
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_ta,nim,kode_param,akun_piutang,'C',nilai,'"+this.e_periode.getText()+"','-','BATAL' "+
							"from dikti_bill_tmp "+
							"where no_bill='"+this.cb_akru.getText()+"'");


					//---------------------------------------------- status parameter == "PYT" ------------------------------------------------
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',0,akun_pyt,'D',sum(nilai),sum(nilai),'"+this.e_ket.getText()+"','MHSBILREV','PYT','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where status_pyt='PYT' and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_pyt,kode_pp");											
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',1,akun_piutang,'C',sum(nilai),sum(nilai),'"+this.e_ket.getText()+"','MHSBILREV','PIUTANG','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where status_pyt='PYT' and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_piutang,kode_pp");	

					//pyt ----------------------------------- status parameter == "PYT"; distribusi !=0  --------------------------------------
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',2,akun_pdpt,'D',sum(pyt),sum(pyt),'"+this.e_ket.getText()+"','MHSBILREV','DISTPDPT','IDR',1,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where status_pyt='PYT' and pyt<>0 and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_pdpt,kode_pp,kode_drk");											
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',3,akun_pyt,'C',sum(pyt),sum(pyt),'"+this.e_ket.getText()+"','MHSBILREV','DISTPYT','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where status_pyt='PYT' and pyt<>0 and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_pyt,kode_pp");											

					sql.add("insert into dikti_pyt_dis(no_pyt,kode_lokasi,no_bill,nim,periode,nilai,kode_param,akun_pyt,akun_pdpt,kode_pp,kode_drk,dc,no_del) "+	
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_bill,nim,'"+this.e_periode.getText()+"',pyt,kode_param,akun_pyt,akun_pdpt,kode_pp,kode_drk,'C','BATAL' "+
							"from dikti_bill_tmp "+
							"where status_pyt='PYT' and pyt<>0 and no_bill='"+this.cb_akru.getText()+"' ");											
					//pyt ----------------------------------- status parameter == "PYT"; distribusi !=0  --------------------------------------

					//lunas------------------------------------ status parameter == "PYT"; lunas !=0 ------------------------------------------					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',4,akun_piutang,'D',sum(lunas),sum(lunas),'"+this.e_ket.getText()+"','MHSREKREV','REKPIU','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where status_pyt='PYT' and lunas<>0 and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_piutang,kode_pp");											
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',5,'"+this.cb_titip.getText()+"','C',sum(lunas),sum(lunas),'"+this.e_ket.getText()+"','MHSREKREV','REKTITIP','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where status_pyt='PYT' and lunas<>0 and no_bill='"+this.cb_akru.getText()+"' "+
							"group by kode_pp");											

					sql.add("insert into dikti_bill_rekon(no_rekon,kode_lokasi,periode,no_bill,nim,kode_param,akun_titip,akun_piutang,nilai,nilai_cd,dc,modul) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',no_bill,nim,kode_param,'"+this.cb_titip.getText()+"',akun_piutang,lunas,0,'C','BATAL' "+
							"from dikti_bill_tmp "+
							"where status_pyt='PYT' and lunas<>0 and no_bill='"+this.cb_akru.getText()+"' ");											
					//lunas------------------------------------ status parameter == "PYT"; lunas !=0 ------------------------------------------					
					//!!-------------------------------------------- status parameter == "PYT" ------------------------------------------------


					//---------------------------------------------- status parameter == "NON" ------------------------------------------------
					//nilai > 0
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',0,akun_pdpt,'D',sum(nilai),sum(nilai),'"+this.e_ket.getText()+"','MHSBILREV','PDPT','IDR',1,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where nilai>0 and status_pyt<>'PYT' and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_pdpt,kode_pp,kode_drk");								
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',1,akun_piutang,'C',sum(nilai),sum(nilai),'"+this.e_ket.getText()+"','MHSBILREV','PIUTANG','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where nilai>0 and status_pyt<>'PYT' and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_piutang,kode_pp");	
					
					//nilai < 0
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',2,akun_piutang,'D',abs(sum(nilai)),abs(sum(nilai)),'"+this.e_ket.getText()+"','MHSBILREV','PIUTANG','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where nilai<0 and status_pyt<>'PYT' and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_piutang,kode_pp");								
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',3,akun_pdpt,'C',abs(sum(nilai)),abs(sum(nilai)),'"+this.e_ket.getText()+"','MHSBILREV','PDPT','IDR',1,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where nilai<0 and status_pyt<>'PYT' and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_pdpt,kode_pp,kode_drk");	
							

					//lunas------------------------------------ status parameter == "NON"; lunas !=0 ------------------------------------------					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',4,akun_piutang,'D',sum(lunas),sum(lunas),'"+this.e_ket.getText()+"','MHSREKREV','REKPIU','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where status_pyt<>'PYT' and lunas<>0 and no_bill='"+this.cb_akru.getText()+"' "+
							"group by akun_piutang,kode_pp");											
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',5,'"+this.cb_titip.getText()+"','C',sum(lunas),sum(lunas),'"+this.e_ket.getText()+"','MHSREKREV','REKTITIP','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from dikti_bill_tmp "+
							"where status_pyt<>'PYT' and lunas<>0 and no_bill='"+this.cb_akru.getText()+"' "+
							"group by kode_pp");											

					sql.add("insert into dikti_bill_rekon(no_rekon,kode_lokasi,periode,no_bill,nim,kode_param,akun_titip,akun_piutang,nilai,nilai_cd,dc,modul) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',no_bill,nim,kode_param,'"+this.cb_titip.getText()+"',akun_piutang,lunas,0,'C','BATAL' "+
							"from dikti_bill_tmp "+
							"where status_pyt<>'PYT' and lunas<>0 and no_bill='"+this.cb_akru.getText()+"' ");																		
					//lunas------------------------------------ status parameter == "NON"; lunas !=0 ------------------------------------------					
					//!!-------------------------------------------- status parameter == "NON" ------------------------------------------------
					
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
					this.isiCBakru();
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.e_nb.setText("");
		this.isiCBakru();
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BBT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
	},
	doLoad: function(sender){		
		try {						
			if (this.cb_akru.getText()!= "") {	
				//insert ke table dikti_bill_tmp
				var sql = "call sp_dikti_bill_tmp ('"+this.app._lokasi+"','"+this.cb_akru.getText()+"')";
				this.dbLib.execQuerySync(sql);	
				
				var strSQL = "select * from dikti_bill_tmp where no_bill = '"+this.cb_akru.getText()+"' ";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					var line;
					var totP = totA = totL = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						totP = totP + parseFloat(line.nilai);
						totA = totA + parseFloat(line.pyt);
						totL = totL + parseFloat(line.lunas);
					}		
					this.e_piutang.setText(floatToNilai(totP));
					this.e_amor.setText(floatToNilai(totA));
					this.e_lunas.setText(floatToNilai(totL));							
				} 				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doTampilData: function(page) {
		this.sg.doSelectPage(page);				
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChange: function(sender){		
		if (sender == this.cb_akru && this.cb_akru.getText()!="") {
			this.sg.clear(1);
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