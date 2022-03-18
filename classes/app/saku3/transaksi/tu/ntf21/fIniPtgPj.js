/*
control yang dipake bukan budget (anggaran_d) tapi alokasi biaya proyek (nilai OR)
*/
window.app_saku3_transaksi_tu_ntf21_fIniPtgPj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fIniPtgPj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fIniPtgPj";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar Inisiasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Netto Pertangg.","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,500,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"Kode Transaksi",items:["PJPTG"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});								
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"NIK Panjar",multiSelection:false,change:[this,"doChange"]});
		this.cb_panjar = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"No Panjar",multiSelection:false,change:[this,"doChange"]});
		this.e_nilaipj = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Panjar", tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"Bagian / Unit",readOnly:true});				
		this.cb_id = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"ID Inisiasi",tag:1,readOnly:true}); 				
		this.e_uraian = new saiLabelEdit(this.pc2.childPage[0],{bound:[230,19,340,20],caption:"", labelWidth:0, readOnly:true});				
		this.e_nsaldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,200,20],caption:"Saldo Alokasi", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Nilai Bruto", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Status Pajak",items:["NON","P21","P23"], readOnly:true,tag:2,change:[this,"doChange"]});						
		this.e_npajak = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Potongan Pajak", tag:0, tipeText:ttNilai, text:"0", readOnly:true , change:[this,"doChange"], readOnly:true});		
		this.e_netto = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Netto Pertgng.", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nilaikb = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Selisih Kas", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_user = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"User input", maxLength:50,tag:2});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21','PPH23') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;								
					if (line.kode_spro == "PPH23") this.akunPPH23 = line.flag;								
				}				
			}

			this.cb_nik.setSQL("select distinct a.nik,a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							   "where a.sts_pj='1' and b.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);															
							   
			this.cb_nik.setText(this.app._userLog);
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.c_jenis.setText("PJPTG");

			this.e_user.setText(this.app._namaUser);
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fIniPtgPj.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fIniPtgPj.implement({	
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.stsSimpan == 0) {
						sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_d where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from prb_prbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from prb_prbdd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update it_aju_m set progress='3', no_ptg='-' where no_aju='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("update it_aju_m set progress='4', no_ptg='"+this.e_nb.getText()+"' where no_aju='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					var netto = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_npajak.getText());
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,sts_pajak,form,npajak) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.akunBDD+"','"+this.cb_pp.getText()+"','-','"+this.cb_id.getText()+"|"+this.e_ket.getText()+"',"+netto+",getdate(),'"+this.app._userLog+"','-','-','-','A','"+this.cb_nik.getText()+"','"+this.cb_panjar.getText()+"','"+this.e_user.getText()+"','"+this.c_status.getText()+"','NTF07',"+nilaiToFloat(this.e_npajak.getText())+")");
										
					//reverse beban saat ambil pj		
					//masuk beban riil saat ptg (murni tidak dikurangi pajak-->lihat fIniAjuBeban.js)		
					sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunPJ+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilaipj.getText()) +",getdate(),'"+this.cb_id.getText()+"','AJUBEBAN','-','ITAJU')");					
					sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBDD+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.cb_id.getText()+"','AJUBEBAN','-','ITAJU')");
					sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBDD+"','"+this.cb_pp.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_id.getText()+"','NTF07')");

					sql.add("insert into it_aju_d (no_aju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input, akun_seb ) values "+
							"('"+this.e_nb.getText()+"', '"+this.cb_id.getText()+"', '"+this.dp_d1.getDateString()+"', 0, '"+this.akunBDD+"', '"+this.e_ket.getText()+"', 'D', 'IDR', 1, "+nilaiToFloat(this.e_nilai.getText())+", "+nilaiToFloat(this.e_nilai.getText())+", '"+this.cb_pp.getText()+"', '-', '"+this.app._lokasi+"', 'NTF07', 'BDD', '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '-' )");

					if (this.c_status.getText() != "NON") {
						if (this.c_status.getText() == "P21") var akunPajak = this.akunPPH21;
						else var akunPajak = this.akunPPH23;

						sql.add("insert into it_aju_d (no_aju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input, akun_seb ) values "+
								"('"+this.e_nb.getText()+"', '"+this.cb_id.getText()+"', '"+this.dp_d1.getDateString()+"', 1, '"+akunPajak+"', '"+this.e_ket.getText()+"', 'C', 'IDR', 1, "+nilaiToFloat(this.e_npajak.getText())+", "+nilaiToFloat(this.e_npajak.getText())+", '"+this.cb_pp.getText()+"', '-', '"+this.app._lokasi+"', 'NTF07', '"+this.c_status.getText()+"', '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '-' )");						
					}		

					var namarek = norek = bank = "-";		
					var strSQL = "select no_rek,nama_rek,bank+' - '+cabang as bank from karyawan "+			             
								 "where nik = '"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
					var data = this.dbLib.getDataProvider(strSQL,true);	
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];				
						var namarek = line.nama_rek;
						var norek = line.no_rek;
						var bank = line.bank;
					}

					var nilaikb = nilaiToFloat(this.e_nilaikb.getText());
					if (nilaikb >0 ) nilaikb = -nilaikb;
					sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+bank+"','"+norek+"','"+namarek+"','-',"+nilaikb+",'-')");
							
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
					this.c_status.setText("NON");
					this.stsSimpan =1;		
					this.sg3.clear(1);			
					if (this.stsSimpan == 1) this.doClick();
				break;
			case "simpan" :	
			case "ubah"   :		
				this.preView = "1";				
				this.c_jenis.setText("PJPTG");
				
				var d = new Date();
				var d1 = d.strToDate(this.tglMulai);
				var d2 = d.strToDate(this.dp_d1.getText());
				if (d2 < d1) {												
					system.alert(this,"Tanggal pertanggungan tidak valid.","Tanggal Awal Administrasi = '"+this.tglMulai+"'");
					return false;
				}

				var d = new Date();
				var d1 = d.strToDate(this.tglAdm);
				var d2 = d.strToDate(this.dp_d1.getText());
				if (d2 > d1) {												
					system.alert(this,"Tanggal pertanggungan tidak valid.","Batas Tanggal Administrasi = '"+this.tglAdm+"'");
					return false;
				}
				if (nilaiToFloat(this.e_npajak.getText()) != 0 && this.c_status.getText()=="NON") {
					system.alert(this,"Transaksi tidak valid.","Nilai Pajak tidak sesuai dengan status pajak.");
					return false;
				}
				if (nilaiToFloat(this.e_npajak.getText()) == 0 && this.c_status.getText()!="NON") {
					system.alert(this,"Transaksi tidak valid.","Nilai Pajak tidak sesuai dengan status pajak.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_nilaipj.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai pertanggungan melebihi nilai panjar.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_nsaldo.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo Alokasi.");
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
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("insert into it_aju_his(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app,nik_del,tgl_del) "+
						"select no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app,'"+this.app._userLog+"',getdate() "+
						"from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				sql.add("delete from it_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_d where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from prb_prbeban_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from prb_prbdd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update it_aju_m set progress='3', no_ptg='-' where no_aju='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);		
			this.c_status.setText("NON");	
			this.e_nilai.setText("0");				
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_nik.setFocus();
		setTipeButton(tbSimpan);
	},
	doChange:function(sender){
		if (sender == this.cb_nik && this.cb_nik.getText()!="" && this.stsSimpan==1) {	
			this.cb_panjar.setSQL("select a.no_aju,a.keterangan "+
								  "from it_aju_m a "+
								  "inner join prb_prbeban_d c on a.no_aju=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.modul='AJUBEBAN' "+
			                      "where a.progress='3' and a.nik_panjar ='"+this.cb_nik.getText()+"' and a.form='NTF06' and a.no_ptg='-' and a.kode_lokasi='"+this.app._lokasi+"'",
			                      ["a.no_aju","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Panjar",true);
		}
		if (sender == this.cb_panjar && this.cb_panjar.getText()!="") {	
			var strSQL = "select a.nilai,a.kode_pp,b.kode_proyek,a.kode_akun,c.nama,d.akun_bdd,c.nama as nama_proyek "+
						 "from it_aju_m a inner join prb_prbeban_d b on a.no_aju=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join prb_proyek c on b.kode_proyek=c.kode_proyek and b.kode_lokasi=c.kode_lokasi "+	
						 "                inner join prb_proyek_jenis d on c.kode_jenis=d.kode_jenis and c.kode_lokasi=d.kode_lokasi "+						
						 "where a.no_aju='"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.e_nilaipj.setText(floatToNilai(line.nilai));
					this.cb_pp.setText(line.kode_pp);
					this.cb_id.setText(line.kode_proyek);
					this.e_uraian.setText(line.nama_proyek);
					this.akunPJ = line.kode_akun;
					this.akunBDD = line.akun_bdd;											
				} 
			}
			
			var strSQL = "select a.nama,a.nilai_or - isnull(c.beban,0) as saldo, convert(varchar,a.tgl_mulai,103) as tgl_mulai, convert(varchar,a.tgl_admin,103) as tgl_admin "+
			             "from prb_proyek a "+			             
						 "   inner join prb_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+			            						 
			             "   left join ( "+			             
			             "		    select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as beban "+
						 "		    from prb_prbeban_d "+
						 "          where  modul='AJUBEBAN' and kode_lokasi='"+this.app._lokasi+"' "+
						 "				   and no_bukti not in ('"+this.cb_panjar.getText()+"','"+this.e_nb.getText()+"') "+
						 "		     group by kode_proyek,kode_lokasi "+			             
						 "   ) c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+			             
						
						 "where a.kode_proyek = '"+this.cb_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						 			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.e_nsaldo.setText(floatToNilai(line.saldo));				
				this.e_uraian.setText(line.nama);			
				this.tglMulai = line.tgl_mulai;
				this.tglAdm = line.tgl_admin;									
			}		
			this.e_ket.setFocus();				
		}
	
		if (sender == this.e_nilaipj || sender == this.e_nilai || sender == this.e_npajak) {
			if (this.e_nilaipj.getText()!="" && this.e_nilai.getText()!="" && this.e_npajak.getText()!="") {
				this.e_netto.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_npajak.getText())));
				this.e_nilaikb.setText(floatToNilai(nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_npajak.getText()) ));
			}
		}	
		if (sender == this.c_status) {
			if (this.c_status.getText() == "NON") {
				this.e_npajak.setReadOnly(true);
				this.e_npajak.setText("0");
			}
			else this.e_npajak.setReadOnly(false);
		}	
	},

	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if (this.preView == "1") {
								this.nama_report = "server_report_saku2_kopeg_kbitt_rptBebanFormTu2";
								this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_aju='" + this.e_nb.getText() + "' ";
								this.filter2 = this.e_periode.getText() + "/";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
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
				this.pc2.show();			
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
			setTipeButton(tbSimpan);
			this.sg3.clear(1);
			this.stsSimpan = 1;		
			this.c_status.setText("NON");	
			if (this.stsSimpan == 1) this.doClick();			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){	
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from it_aju_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "where a.form='NTF07' and a.progress in ('0','A','R') "+
					 "		and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"'";	
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
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);		
						
				this.stsSimpan = 0;					
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai+a.npajak as nilai,a.kode_pp,a.nik_panjar,a.kode_akun,c.no_aju as no_pj,c.keterangan as ket_pj,c.kode_akun as akun_pj,a.kode_drk,  "+
							 "d.kode_proyek,d.nama as nama_proyek, a.sts_pajak,a.npajak "+						     
							 "from it_aju_m a "+
							 "		inner join it_aju_m c on a.no_aju=c.no_ptg and a.kode_lokasi=c.kode_lokasi "+					   
						     "      inner join prb_prbeban_d cc on c.no_aju=cc.no_bukti and c.kode_lokasi=cc.kode_lokasi and cc.modul='AJUBEBAN' "+
					 		 "   	inner join prb_proyek d on cc.kode_proyek=d.kode_proyek and cc.kode_lokasi=d.kode_lokasi "+						     				   
				     		 "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);
						this.cb_nik.setText(line.nik_panjar);
						this.c_status.setText(line.sts_pajak);
						
						this.cb_panjar.setSQL("select a.no_aju,a.keterangan from it_aju_m a where a.no_aju='"+line.no_pj+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_aju","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Panjar",true);						
						this.cb_panjar.setText(line.no_pj,line.ket_pj);

						this.cb_pp.setText(line.kode_pp);					
						this.e_ket.setText(line.keterangan.substr(16,200));
						this.e_npajak.setText(floatToNilai(line.npajak));										
						this.e_nilai.setText(floatToNilai(line.nilai));	
						
						this.cb_id.setText(line.kode_proyek);
						this.e_uraian.setText(line.nama_proyek);						
					} 			
				}						
															
			}									
		} catch(e) {alert(e);}
	}
});