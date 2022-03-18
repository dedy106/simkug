window.app_saku3_transaksi_tarbak_simak_fKbBillSiswa = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fKbBillSiswa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fKbBillSiswa";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pelunasan Billing KasBank Per Siswa", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Pelunasan","List Bukti"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
					colTitle:["No Kas","Tanggal","N I S","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_titip = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2 });		
		this.e_piutang = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.cb_nim = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Siswa", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,295], childPage:["Data Tagihan","Denda"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,
					colTitle:["No Bill","Periode","Kode Param","Nama Parameter","Akun AR","Saldo Tagihan","Nilai Pelunasan","Nilai CD","Keterangan Bill"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[250,80,100,100,70,300,80,80,150]],
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,7,8],[6]],
					cellEnter:[this,"doCellEnter"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	

		this.e_denda = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								

		this.rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);

		setTipeButton(tbSimpan);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			//tgl batas denda
			var strSQL = "select flag from spro where kode_spro='SISTGDD' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.tglDenda = line3.flag;	
				}
			}

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a "+
								 "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
								 "where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			
			var data = this.dbLib.getDataProvider("select akun_cd from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunCD = line.akun_cd;
			} else this.akunCD = "";

			if (this.akunCD == "" || this.akunCD == "-") {
				system.alert(this,"Akun CD belum di seting di Form PP.","");
			}

			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.kode_ta = line3.kode_ta;	
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fKbBillSiswa.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fKbBillSiswa.implement({
	doDenda: function() {		
		var tglBatas = this.tglDenda+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4);
		var d = new Date();
		var d1 = d.strToDate(this.dp_d1.getText());
		var d2 = d.strToDate(tglBatas);

		this.e_denda.setText("0");
		if (d1 > d2) {							
			var strSQL = "select a.tarif from sis_siswa_tarif a "+
						 " 			inner join sis_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi and c.sts_param='3' and '"+this.e_periode.getText()+"' between a.per_awal and a.per_akhir  "+
						 "where a.nis = '"+this.cb_nim.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_denda.setText(floatToNilai(line.tarif));
			}
			
			
			var strSQL = "select a.nilai from sis_bill_d a "+
						 "inner join sis_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi and c.sts_param='3' "+
						 "where a.periode='"+this.e_periode.getText()+"' and a.nis = '"+this.cb_nim.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_denda.setText("0");
			}

		}
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from sis_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from sis_cd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");

						sql.add("delete from sis_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sis_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_titip.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','KBBILSIS','BM','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.cb_nim.getText()+"','-')");
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBBILSIS','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilai.getText())+")");
				
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(6,i) != "0"){
								
								if (nilaiToFloat(this.sg.cells(6,i)) > nilaiToFloat(this.sg.cells(5,i)))
									var nilaiAR = nilaiToFloat(this.sg.cells(5,i));
								else var nilaiAR = nilaiToFloat(this.sg.cells(6,i));	
								
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','C',"+nilaiAR+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBBILSIS','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiAR+")");
								sql.add("insert into sis_rekon_d(no_rekon,nis,no_bill,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_param,dc,modul,id_bank,kode_pp, nilai_cd,periode_bill) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+nilaiAR+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','D','REKONCD','-','"+this.cb_pp.getText()+"', "+parseNilai(this.sg.cells(7,i))+",'"+this.sg.cells(1,i)+"')");
								
								if (nilaiToFloat(this.sg.cells(7,i)) != 0) {
									sql.add("insert into sis_cd_d(no_bukti,nis,periode,nilai,kode_lokasi,akun_cd,kode_param,dc,modul,kode_pp,no_ref1) values "+
											"('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.app._lokasi+"','"+this.akunCD+"','-','D','KBBILSIS','"+this.cb_pp.getText()+"','-')");									
									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',777,'"+this.akunCD+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBBILSIS','CD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg.cells(7,i))+")");
								}	

							}
						}
					}	

					if (this.e_denda.getText() != "0") {
						sql.add("insert into sis_bill_m(no_bill,kode_lokasi,periode,tanggal,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_app,posted,tgl_input,nik_user) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','KBBILSIS','BILL','IDR',1,"+nilaiToFloat(this.e_denda.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','X',getdate(),'"+this.app._userLog+"')");

						sql.add("insert into sis_bill_d (no_bill,kode_lokasi,nis,kode_kelas,kode_param,nilai,dc,periode,akun_piutang,modul,kode_pp,kode_ta,kode_sem) "+
								"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nis,b.kode_kelas,b.kode_param,b.tarif,'D','"+this.e_periode.getText()+"',c.akun_piutang,'BILL','"+this.cb_pp.getText()+"', '"+this.kode_ta+"','"+this.sem+"' "+
								"from sis_siswa a "+
								"inner join sis_siswa_tarif b on a.nis=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and '"+this.e_periode.getText()+"' between b.per_awal and b.per_akhir "+
								"inner join sis_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi and c.sts_param='3' "+
								"where a.nis='"+this.cb_nim.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"'");
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
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.cb_nim.setSQL("select nis, nama from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["nis","nama"],false,["NIS","Nama"],"and","Daftar Siswa",true);	
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
												
				if (nilaiToFloat(this.e_nilai.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh kurang nol.");
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from sis_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from sis_cd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");

					sql.add("delete from sis_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sis_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m)
		this.e_nb.setText("");

		if(m >= 1 && m <= 6) this.sem = "GENAP";
		if(m >= 7 && m <= 12) this.sem = "GANJIL";
		this.doDenda();
	},
	doClick:function(sender){
		if (this.stsSimpan==0) {
			this.sg.clear(1);
			this.sg.validasi();
			this.cb_nim.setSQL("select nis, nama from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["nis","nama"],false,["NIS","Nama"],"and","Daftar Siswa",true);	
		}
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan=1;
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(6,row) == "0") this.sg.cells(6,row,this.sg.cells(5,row));
		}catch(e)
		{
			alert("doubleClick"+e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 6) {		
			if (nilaiToFloat(this.sg.cells(6,row)) > nilaiToFloat(this.sg.cells(5,row))) {
				var sisa = nilaiToFloat(this.sg.cells(6,row)) - nilaiToFloat(this.sg.cells(5,row));
				this.sg.cells(7,row,sisa);
			}
			this.sg.validasi();		
		}
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
	doChange: function(sender){
		if (sender == this.cb_pp && this.cb_pp.getText()!=""){
			this.cb_nim.setSQL("select nis, nama from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",["nis","nama"],false,["NIS","Nama"],"and","Daftar Siswa",true);
		}
		if (sender == this.cb_nim && this.cb_nim.getText()!="" && this.stsSimpan==1) {
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");	
			
			var strSQL = "select a.no_bill,a.periode,a.kode_param,a.nama,a.akun_piutang,a.tot_bill-isnull(b.tot_lunas,0) as saldo, a.keterangan "+
						 "from ("+

						 "		select a.nis,a.no_bill,a.periode,a.akun_piutang,sum(a.nilai) as tot_bill,a.kode_param,aa.nama,c.idx, e.keterangan "+
						 "		from sis_bill_d a "+
						 "			inner join sis_bill_m e on a.no_bill=e.no_bill and a.kode_lokasi=e.kode_lokasi "+
						 "      	inner join sis_param aa on a.kode_param=aa.kode_param and a.kode_lokasi=aa.kode_lokasi "+
						 "      	inner join sis_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi and e.kode_pp=d.kode_pp "+						
						 "      	inner join sis_param_idx c on a.kode_param = c.kode_param and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp and c.kode_pp='"+this.cb_pp.getText()+"' "+						
						 "		where a.nis = '"+this.cb_nim.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and e.kode_pp= '"+this.cb_pp.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "		group by a.nis,a.no_bill,a.periode,a.akun_piutang,a.kode_param,aa.nama,c.idx, e.keterangan  "+
						 ") a "+
						 
						 "left join ( "+
						 "		select no_bill,nis,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "      from sis_rekon_d "+
						 "		where  nis = '"+this.cb_nim.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
						 "		group by nis,no_bill,kode_lokasi,kode_param "+

						 ") b on a.nis=b.nis and a.no_bill=b.no_bill and a.kode_param=b.kode_param "+						 

						 "where (a.tot_bill-isnull(b.tot_lunas,0)) > 0 "+
						 "order by a.periode,a.idx";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_bill,line.periode,line.kode_param,line.nama,line.akun_piutang,floatToNilai(line.saldo),"0","0",line.keterangan]);
				}
			} else this.sg.clear(1);	

			this.doDenda();
					
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if (this.preView == "1") {						
								this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYptNon";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 							
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
			this.stsSimpan=1;
			this.cb_nim.setSQL("select nis, nama from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["nis","nama"],false,["NIS","Nama"],"and","Daftar Siswa",true);	
		} catch(e) {
			alert(e);
		}
	},

	doLoad3:function(sender){																
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.ref1 as nis,a.keterangan "+
		             "from kas_m a "+
					 "where a.kode_pp='"+this.cb_pp.getText()+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBBILSIS' and a.posted ='F'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_kas,line.tgl,line.nis,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.cb_pp.setText(line.kode_pp);	
						this.e_ket.setText(line.keterangan);
						this.cb_titip.setText(line.akun_kb);				
						this.cb_nim.setSQL("select nis, nama from sis_siswa where nis ='"+line.ref1+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["nis","nama"],false,["NIS","Nama"],"and","Daftar Siswa",true);		
						this.cb_nim.setText(line.ref1);											
					}
				}

				var strSQL = "select a.no_bill,a.periode,a.kode_param,a.nama,a.akun_piutang,a.tot_bill-isnull(b.tot_lunas,0) as saldo,dd.nilai+dd.nilai_cd as nilai,dd.nilai_cd,dd.id_bank, a.keterangan  "+
							 "from ("+
	
							 "		select a.kode_lokasi,a.nis,a.no_bill,a.periode,a.akun_piutang,sum(a.nilai) as tot_bill,a.kode_param,aa.nama,c.idx, e.keterangan "+
							 "		from sis_bill_d a "+
							 "			inner join sis_bill_m e on a.no_bill=e.no_bill and a.kode_lokasi=e.kode_lokasi "+
							 "      	inner join sis_param aa on a.kode_param=aa.kode_param and a.kode_lokasi=aa.kode_lokasi "+
							 "      	inner join sis_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi and e.kode_pp=d.kode_pp "+						
							 "      	inner join sis_param_idx c on a.kode_param = c.kode_param and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp and c.kode_pp='"+this.cb_pp.getText()+"' "+						
							 "		where a.nis = '"+this.cb_nim.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and e.kode_pp= '"+this.cb_pp.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							 "		group by a.kode_lokasi,a.nis,a.no_bill,a.periode,a.akun_piutang,a.kode_param,aa.nama,c.idx, e.keterangan "+
							 ") a "+

							 "      inner join sis_rekon_d dd on a.no_bill=dd.no_bill and a.kode_param=dd.kode_param and a.kode_lokasi=dd.kode_lokasi and a.nis=dd.nis "+
							 
							 "left join ( "+
							 "		select no_bill,nis,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
							 "      from sis_rekon_d "+
							 "		where  no_rekon <>'"+this.e_nb.getText()+"' and nis = '"+this.cb_nim.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
							 "		group by nis,no_bill,kode_lokasi,kode_param "+
	
							 ") b on a.nis=b.nis and a.no_bill=b.no_bill and a.kode_param=b.kode_param "+						 
	
							 "where dd.no_rekon='"+this.e_nb.getText()+"' and dd.kode_lokasi = '"+this.app._lokasi+"'  "+
							 "order by dd.no_bill ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_bill,line.periode,line.kode_param,line.nama,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.nilai_cd),line.keterangan]);
					}
				} else this.sg.clear(1);
				this.sg.validasi();
				
			}						
		} catch(e) {alert(e);}
	}
});