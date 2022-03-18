window.app_saku3_transaksi_produk_fPjptgSimpleBDD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fPjptgSimpleBDD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fPjptgSimpleBDD";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar via BDD", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","No KasBank"],
					colWidth:[[3,2,1,0],[100,400,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Pertanggungan",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_pj = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No Panjar", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,293], childPage:["Data Panjar","Item Pertanggungan","Data OR"]});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal Panjar", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18]}); 		
		this.cb_akunpj = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Akun Panjar", readOnly:true, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP",readOnly:true, maxLength:10, tag:2});
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_nilaiptg = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai Pertggn.", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_nilaikb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai KasBank", tag:9, tipeText:ttNilai, text:"0",change:[this,"doChange"], readOnly:true });				
		this.c_jenis = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Jenis KB",readOnly:true, tag:9,visible:false});
		this.e_kb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,200,20],caption:"No KasBank",maxLength:30,readOnly:true, tag:9,visible:false});
		this.cb_akunkb = new saiCBBL(this.pc1.childPage[0],{bound:[20,24,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:9,visible:false});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:9,
		            colTitle:["ID Proyek","Deskripsi","Akun BDD","PP","Ket. Peruntukan","Nilai","PPN Masukan","Pot. PPh23","Pot. PPh21","Total"],					
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,80,80,80,100,200,80,80,200,100]],
					columnReadOnly:[true,[1,2,3,9],[0,4,5,6,7,8]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["ID Proyek","Deskripsi","Saldo OR","Total Beban","Sisa OR"],
					colWidth:[[4,3,2,1,0],[100,100,100,400,150]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[965,2,20,20],hint:"Lihat OR",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungOR"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 22);
					
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);		
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setText("BM");
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar NIK Approval",true);
			this.cb_akunkb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						          "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);									
			this.cb_akunpj.setSQL("select a.kode_akun, a.nama from masakun a "+
						          "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);									
			

			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPNM','HUTPPH21','HUTPPH23') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPNM") this.akunPPNM = line.flag;			
					if (line.kode_spro == "HUTPPH21") this.hutPPh21 = line.flag;			
					if (line.kode_spro == "HUTPPH23") this.hutPPh23 = line.flag;			
				}
			}			
			
			var sql = new server_util_arrayList();
			sql.add("select kode_proyek,nama from pr_proyek where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ");									
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fPjptgSimpleBDD.extend(window.childForm);
window.app_saku3_transaksi_produk_fPjptgSimpleBDD.implement({
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
			if (nilaiToFloat(this.e_nilaikb.getText()) != 0) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
			else this.e_kb.setText("-"); 
			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();								
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.nobuktiLama+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.nobuktiLama+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pr_or_d where no_bukti = '"+this.nobuktiLama+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update panjar_m set progress = '2' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("update panjar_m set progress = '3' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
						var nilai = Math.abs(nilaiToFloat(this.e_nilaikb.getText()));
						this.nb = this.e_kb.getText();

						var noKas = this.e_kb.getText();
						var akunKas = this.cb_akunkb.getText();
						var jenis = this.c_jenis.getText();
					}
					else {
						var nilai = nilaiToFloat(this.e_nilaiptg.getText());
						this.nb = this.e_nb.getText();

						var noKas = "-";
						var akunKas = "-";
						var jenis = "-";
					}

					sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input) values "+					
							"('"+this.e_nb.getText()+"','"+this.cb_pj.getText()+"','"+noKas+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','IDR',1,'"+this.cb_akunpj.getText()+"','"+akunKas+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','PJPTG',"+parseNilai(this.e_nilaiptg.getText())+","+parseNilai(this.e_nilaikb.getText())+",'-','2','X','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.nb+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.modul+"','PJPTGBDD','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_pj.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
							nilai+",0,0,'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-','"+this.cb_pj.getText()+"','-','-','"+jenis+"','-','-')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++) {
							if (this.sg.rowValid(i)){
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.nb+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(2,i)+"','D',"+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.sg.cells(4,i)+"','"+this.modul+"','BEBAN','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");
								
								if (this.sg.cells(6,i) != "0") {
									//PPNM
									var j = 1000+i;
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.nb+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunPPNM+"','D',"+parseNilai(this.sg.cells(6,i))+","+parseNilai(this.sg.cells(6,i))+",'PPN Masukan : "+this.sg.cells(0,i)+"','"+this.modul+"','PPNM','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");
								}
								if (this.sg.cells(7,i) != "0") {
									//PPH21
									var k = 2000+i;
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.nb+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.hutPPh21+"','C',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(7,i))+",'Hutang PPh21 : "+this.sg.cells(0,i)+"','"+this.modul+"','HUTPPH21','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");
								}
								if (this.sg.cells(8,i) != "0") {
									//PPH23
									var l = 3000+i;
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.nb+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+l+",'"+this.hutPPh23+"','C',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'Hutang PPh23 : "+this.sg.cells(0,i)+"','"+this.modul+"','HUTPPH23','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");
								}
							}
						}
					}
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.nb+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',99,'"+this.cb_akunpj.getText()+"','C',"+parseNilai(this.e_nilaipj.getText())+","+parseNilai(this.e_nilaipj.getText())+",'"+this.e_ket.getText()+"','"+this.modul+"','PJ','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','"+this.cb_pj.getText()+"','-','-','-')");									
				
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
						if (this.c_jenis.getText() == "BK") var DC = "C"; else var DC = "D"; 
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.nb+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',98,'"+this.cb_akunkb.getText()+"','"+DC+"',"+Math.abs(parseNilai(this.e_nilaikb.getText()))+","+Math.abs(parseNilai(this.e_nilaikb.getText()))+",'"+this.e_ket.getText()+"','"+this.modul+"','KB','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");									
					}			
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++) {
							var data = this.dbLib.getDataProvider("select a.akun_bdd,b.kode_pp from pr_jenis a inner join pr_proyek b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi where b.kode_proyek='"+this.sg2.cells(0,i)+"' and b.kode_lokasi='"+this.app._lokasi+"' ",true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined){
									var bddProyek = line.akun_bdd;
									var ppProyek = line.kode_pp;									
								} 
							}

							sql.add("insert into pr_or_d (no_bukti,kode_lokasi,periode,kode_proyek,kode_akun,dc,nilai,jenis,kode_pp,kode_drk,no_reverse) values "+
									"('"+this.nb+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg2.cells(0,i)+"','"+bddProyek+"','D',"+nilaiToFloat(this.sg2.cells(3,i))+",'BDD','"+ppProyek+"','-','NONREV')");								
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				this.sg.validasi();	

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
					this.e_nilaikb.setTag("0");
					this.c_jenis.setTag("0");
					this.e_kb.setTag("0");
					this.cb_akunkb.setTag("0");	
					this.modul = "KB";				
				} else {
					this.e_nilaikb.setTag("9");
					this.c_jenis.setTag("9");
					this.e_kb.setTag("9");
					this.cb_akunkb.setTag("9");		
					this.modul = "MI";							
				}				
				this.doHitungOR();				
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (nilaiToFloat(this.sg2.cells(4,i)) < 0) {
						var k =i+1;
						system.alert(this,"Transaksi tidak valid.","Saldo OR tidak mencukupi. [Baris : "+k+"]");
						return false;						
					}
				}
				
				if (this.c_jenis.getText() == "BK") var nilaikb = nilaiToFloat(this.e_nilaikb.getText()) * -1; 
				else var nilaikb = nilaiToFloat(this.e_nilaikb.getText());
				
				if (nilaiToFloat(this.e_nilaipj.getText()) != nilaiToFloat(this.e_nilaiptg.getText())+nilaiToFloat(this.e_nilaikb.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Pertanggungan,KasBank dan Panjar tidak sama.");
					return false;						
				}
				if (parseFloat(this.perPJ) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode panjar.["+this.perPJ+"]");
					return false;
				}				
				if (this.standarLib.doCekPeriode(this.dbLib,this.modul,this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid ("+this.modul+" - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				this.nb = this.nobuktiLama;
				if (this.standarLib.doCekPeriode(this.dbLib,this.modul,this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid ("+this.modul+" - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.nobuktiLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.nobuktiLama+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from pr_or_d where no_bukti = '"+this.nobuktiLama+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
					sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update panjar_m set progress = '2' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();
		this.e_kb.setText("");
	},
	doChange:function(sender){
		if (sender == this.cb_buat && this.cb_buat.getText()!="" && this.stsSimpan==1) this.cb_pj.setSQL("select no_pj, keterangan from panjar_m where progress = '2' and nik_pengaju='"+this.cb_buat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pj","keterangan"],false,["No Panjar","Keterangan"],"and","Data Panjar",true);
		if (sender == this.cb_pj && this.cb_pj.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,a.tanggal,103) as tanggal,a.akun_pj,b.nama as nama_pj,a.nilai,a.periode,a.kode_pp,c.nama as nama_pp "+
					   "from panjar_m a inner join masakun b on a.akun_pj=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_pj='"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perPJ = line.periode;
					this.dp_d2.setText(line.tanggal);
					this.cb_akunpj.setText(line.akun_pj,line.nama_pj);
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.e_nilaipj.setText(floatToNilai(line.nilai));
				} 
			}
		}		
		if (sender == this.e_nilaiptg || sender == this.e_nilaipj) {
			var nilai = nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_nilaiptg.getText());
			this.e_nilaikb.setText(floatToNilai(nilai));
			
			if (nilai > 0) this.c_jenis.setText("BM");
			else this.c_jenis.setText("BK");
			
			if (this.c_jenis.getText()!="" && this.e_nilaikb.getText()!="") {
				if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
					if (this.stsSimpan == 1) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
				}
				else this.e_kb.setText("");
			}
		}
		if (sender == this.e_nilaikb) {
			if (this.e_nilaikb.getText() == "0"){
				this.c_jenis.hide();
				this.e_kb.hide();
				this.cb_akunkb.hide();	
			}
			else {
				this.c_jenis.show();
				this.e_kb.show();
				this.cb_akunkb.show();	
			}
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg.clear(1); this.sg2.clear(1);
		}
		this.stsSimpan = 1;
		setTipeButton(tbSimpan);
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ptg_m","no_ptg",this.app._lokasi+"-PTG"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
	},
	doChangeCell: function(sender, col, row){
		try {
			if (col == 5 || col == 6 || col == 7 || col == 8) {
				if (this.sg.cells(5,row) != "" && this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "" && this.sg.cells(8,row) != "") {
					var total = nilaiToFloat(this.sg.cells(5,row)) + nilaiToFloat(this.sg.cells(6,row)) - nilaiToFloat(this.sg.cells(7,row)) - nilaiToFloat(this.sg.cells(8,row));
					this.sg.cells(9,row,total);
				}
				this.sg.validasi();
			}
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {
				if (sender.cells(0,row) != "") {
					var pr = this.dataPR.get(sender.cells(0,row));
					if (pr) {
						sender.cells(1,row,pr);
						var data = this.dbLib.getDataProvider(
								"select a.kode_pp,b.akun_bdd "+
								"from pr_proyek a inner join pr_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_proyek='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								sender.cells(2,row,line.akun_bdd);
								sender.cells(3,row,line.kode_pp);								
							} 
						}
					}
					else {
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Proyek "+sender.cells(7,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
						sender.cells(2,row,"");
						sender.cells(3,row,"");						
					}				
				}
			}
			sender.onChange.set(this,"doChangeCell");	
		}
		catch(e){
			alert(e);
		}	
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != ""){
					tot += nilaiToFloat(this.sg.cells(9,i));					
				}
			}
			this.e_nilaiptg.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Proyek",sender,undefined, 
												  "select kode_proyek, nama  from pr_proyek where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif ='1'",
												  "select count(kode_proyek)  from pr_proyek where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif ='1'",
												  ["kode_proyek","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitungOR: function(){		
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)){
				//PPN gak masuk karena bisa dikreditkan, pph juga tidak dihitung krn tetp bayar ke pajak
				nilai = nilaiToFloat(this.sg.cells(5,i));
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}
		
		var sawal = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var strSQL = "select a.nilai_or-isnull(c.tot_bdd,0) as sisa_or "+
						 "from pr_proyek a "+												
						 "left join ( "+
						 "   select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as tot_bdd "+
						 "	 from pr_or_d where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_proyek "+						 
						 ") c on a.kode_proyek=c.kode_proyek "+

						 "where a.kode_proyek='"+this.sg2.cells(0,i)+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
											
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					
					sawal = parseFloat(line.sisa_or);
					this.sg2.cells(2,i,floatToNilai(sawal));
					sawal = sawal - nilaiToFloat(this.sg2.cells(3,i));
					this.sg2.cells(4,i,floatToNilai(sawal));
				}
			}

		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_produk_rptProyekPanjarBdd";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.nb+"' ";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.nb+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPR = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPR.set(line.kode_proyek, line.nama);										
								}								
							}							
						}else throw result;
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.nb);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.sg3.clear(1);
			this.sg.clear(1);
			this.sg2.clear(1);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_ptg, convert(varchar,a.tanggal,103) as tgl, a.keterangan,a.no_kas from ptg_m a inner join trans_m b on a.no_ptg=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.form='PJPTGBDD' where a.nilai_kas=0 and b.posted = 'F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "union "+
					 "select a.no_ptg, convert(varchar,a.tanggal,103) as tgl, a.keterangan,a.no_kas from ptg_m a inner join trans_m b on a.no_kas=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.form='PJPTGBDD' where a.nilai_kas<>0 and b.posted = 'F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";		
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
			this.sg3.appendData([line.no_ptg,line.tgl,line.keterangan,line.no_kas]); 
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
					
				if (this.sg3.cells(3,row) == "-") {
					this.nobuktiLama = this.sg3.cells(0,row);
					var strSQL = "select b.modul,a.no_kas,b.param1 as jenis,a.tanggal,a.keterangan,a.nik_buat,a.nik_setuju,a.nilai,a.nilai_kas,a.no_pj,a.akun_kas "+
								 "from ptg_m a "+
								 "inner join trans_m b on a.no_ptg=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+								
						     	 "where a.no_ptg='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}
				else { 
					this.nobuktiLama = this.sg3.cells(3,row);
					var strSQL = "select b.modul,a.no_kas,b.param1 as jenis,a.tanggal,a.keterangan,a.nik_buat,a.nik_setuju,a.nilai,a.nilai_kas,a.no_pj,a.akun_kas "+
								 "from ptg_m a "+
								 "inner join trans_m b on a.no_kas=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+								
						     	 "where a.no_ptg='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.modul = line.modul;
						this.nokas = line.no_kas;
						this.jenis = line.jenis;
						this.dp_d1.setText(line.tanggal);						
						this.e_ket.setText(line.keterangan);
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_setuju);
						this.e_nilaiptg.setText(floatToNilai(line.nilai));
						this.e_nilaikb.setText(floatToNilai(line.nilai_kas));
						
						this.cb_pj.setSQL("select no_pj, keterangan from panjar_m where no_pj='"+line.no_pj+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pj","keterangan"],false,["No Panjar","Keterangan"],"and","Data Panjar",true);
						this.cb_pj.setText(line.no_pj);
						
						/*						
						this.dp_d2.setText(line.tgl_pj);
						this.cb_akunpj.setText(line.akun_pj,line.nama_pj);
						this.e_nilaipj.setText(floatToNilai(line.nilai_pj));
						this.perPJ = line.perPJ;						
						this.cb_pp.setText(line.kode_pp,line.nama_pp);
						*/

						this.c_jenis.setText(line.jenis);
						this.e_kb.setText(line.no_kas);
						if (line.no_kas == "-") this.cb_akunkb.setText("","");
						else this.cb_akunkb.setText(line.akun_kas);
							
					} 
				}
				
			
				var strSQL = "select b.kode_proyek,b.nama,c.akun_bdd,b.kode_pp,a.keterangan,a.nilai,isnull(d.nilai,0) as ppnm,isnull(e.nilai,0) as pph21,isnull(f.nilai,0) as pph23, "+
							 " a.nilai+isnull(d.nilai,0)-isnull(e.nilai,0)-isnull(f.nilai,0) as total  "+
							 "from trans_j a "+
							 "inner join pr_proyek b on a.no_dokumen=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
							 "inner join pr_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi "+
							 "left join ( "+
							 "		select no_bukti,nu,nilai from trans_j where jenis='PPNM' and kode_lokasi='"+this.app._lokasi+"' and no_bukti='"+this.nobuktiLama+"' "+
							 " ) d on a.no_bukti=d.no_bukti and (a.nu+1000)=d.nu "+
							 "left join ( "+
							 "		select no_bukti,nu,nilai from trans_j where jenis='HUTPPH21' and kode_lokasi='"+this.app._lokasi+"' and no_bukti='"+this.nobuktiLama+"' "+
							 " ) e on a.no_bukti=e.no_bukti and (a.nu+2000)=e.nu "+
							 "left join ( "+
							 "		select no_bukti,nu,nilai from trans_j where jenis='HUTPPH23' and kode_lokasi='"+this.app._lokasi+"' and no_bukti='"+this.nobuktiLama+"' "+
							 " ) f on a.no_bukti=f.no_bukti and (a.nu+2000)=f.nu "+
							 "where a.no_bukti = '"+this.nobuktiLama+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='BEBAN'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_proyek,line.nama,line.akun_bdd,line.kode_pp,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.ppnm),floatToNilai(line.pph21),floatToNilai(line.pph23),floatToNilai(line.total)]);
					}
				} else this.sg.clear(1);
				
				this.sg.validasi();
				this.doHitungOR();
			}									
		} catch(e) {alert(e);}
	}	
});
