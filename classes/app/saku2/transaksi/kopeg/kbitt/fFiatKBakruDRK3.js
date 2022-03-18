window.app_saku2_transaksi_kopeg_kbitt_fFiatKBakruDRK3 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fFiatKBakruDRK3.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fFiatKBakruDRK3";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Akun Pengajuan DRK: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");	
		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:true});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[320,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Data Pengajuan","Detail Pengajuan","Item Jurnal","Data KPA","","File Dok"]});
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Jenis Dokumen",items:["OFFLINE","ONLINE"], tag:3,change:[this,"doChange"]}); 		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [250, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [510, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 7, change: [this, "doLoad"] });
		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,20,this.pc1.width-5,this.pc1.height-65],colCount:13,tag:0,
				colTitle:["No Agenda","Tanggal","Modul","Bagian / Unit","Akun","DRK","Uraian","Nominal","Tgl Input","User","No Ver.","Tgl Ver","Catatan Verifikasi"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[250,80,100,150,60,80,200,60,150,150,60,60,80]],
				readOnly:true,colFormat:[[7],[cfNilai]],
				dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REVISI"], readOnly:true,tag:2,change:[this,"doChange"]}); 
		this.cb_jstatus = new saiCBBL(this.pc1.childPage[1],{bound:[230,10,220,20],caption:"Jenis Status", multiSelection:false});
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Agenda", readOnly:true});						
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Modul", readOnly:true});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Akun", readOnly:true});								
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Bagian/Unit", readOnly:true});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_drk = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"DRK", readOnly:true});												
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Tanggal", readOnly:true});								
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Tgl Input", readOnly:true});												
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"User Input", readOnly:true});								
		this.e_nikpj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,450,20],caption:"NIK Panjar", readOnly:true, tag:9});								
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,200,20],caption:"Nilai Panjar (Ptg)", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ver = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Verifikasi", readOnly:true});												
		this.e_tglver = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Tgl Ver.", readOnly:true});								
		this.e_memo2 = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,50],caption:"Cat. Ver. Dok",tag:9,readOnly:true});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[520,13,450,50],caption:"Cat. Ver. Akun",tag:9,readOnly:true});		
		this.e_totRek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Tot Rekening", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,200,20],caption:"Jenis Dok", readOnly:true});								
		
		this.sgRek = new saiGrid(this.pc1.childPage[1],{bound:[5,5,990,150],colCount:10,tag:0,
				colTitle:["Kd Mitra","Bruto","Pot. Pajak","Netto","Berita/Penerima","Nama Rek","Bank","No Rekening","Kode Pajak","NPWP"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,80,150,150,150,150,80,80,80,60]],
				columnReadOnly:[true,[0,3,8,9],[1,2,4,5,6,7]],				
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],												
				nilaiChange:[this,"doNilaiChangeRek"],change:[this,"doChangeCellRek"],
				defaultRow:1,autoAppend:false});
						
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-7,this.pc1.height-110],colCount:9,tag:0, 
				colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","DRK","Nama DRK"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,250,40,150,80]],					
				columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
				buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
				colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
				cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				autoAppend:true,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-105,this.pc1.width-3,25],buttonStyle:2,grid:this.sg1});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});						
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
				colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
				readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-5,this.pc1.height-15],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Nama File","DownLoad","Jenis"],
				colWidth:[[4,3,2,1,0],[50,80,300,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3],[cfButton]], 					
				click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]],
				readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);					
		this.pc1.childPage[4].rearrangeChild(10, 23);	

		this.e_debet = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,357,200,20],caption:"Total Debet", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_kredit = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,380,200,20],caption:"Total Kredit", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilaikb = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,403,200,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select convert(varchar,getdate(),103) as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}
			
			this.c_jenis.setText("");
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21','PPH23') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;								
					if (line.kode_spro == "PPH23") this.akunPPH23 = line.flag;								
				}				
			}

			this.stsCol = [0, 0, 0, 0, 0];
			this.c_show.setText("25");
			this.timeout = null;


			this.cb_jstatus.setSQL("select kode_jenis, nama from jenis_app where kode_Lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"where","Daftar Jenis App",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fFiatKBakruDRK3.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fFiatKBakruDRK3.implement({
	doChange: function(sender) {
		if (sender == this.c_jenis) {
			this.doLoad();
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3) {
				if(this.sgUpld.getCell(4,row) == "1"){
					window.open(this.sgUpld.getCell(2,row));
				}else{
					window.open("server/media/"+this.sgUpld.getCell(2,row));
				}
			}
		}catch(e){
			alert(e);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fiat_m","no_fiat",this.app._lokasi+"-FKA"+this.e_periode.getText().substr(2,4)+".","00000"));		
			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.c_status.getText()=="APPROVE")  var prog = "2";
					if (this.c_status.getText()=="REVISI")  var prog = "F";
					if (this.e_modul.getText() == "PJPTG" && nilaiToFloat(this.e_nilaikb.getText()) == 0 && prog == "2") prog = "4"; 
						
					sql.add("update a set no_fiatseb ='"+this.e_nb.getText()+"' "+
					        "from fiat_m a inner join fiat_d b on a.no_fiat=b.no_fiat and a.kode_lokasi=b.kode_lokasi and a.no_fiatseb='-' "+
							"where b.no_bukti ='"+this.e_noaju.getText()+"' and b.modul='ITKBAJU' and b.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update it_aju_m set progress='"+prog+"',no_fiat='"+this.e_nb.getText()+"' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into fiat_m (no_fiat,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_fiatseb,kode_cf, kode_jenis) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','ITKBAJU','-','X', '"+this.cb_jstatus.getText()+"')");					
					sql.add("insert into fiat_d (no_fiat,status,modul,no_bukti,kode_lokasi,catatan,no_app) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','ITKBAJU','"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"','"+this.noAppAju+"')");					
																				
					if (this.c_status.getText()=="APPROVE") {
						if (this.formInput == "PRPTGMULTI" || this.formInput == "PRPTG" || this.formInput == "ISPJPTG" || this.formInput == "PRPJPTG" || this.formInput == "PRAGENDA" || this.formInput == "PRBEBAN" ||
						    this.formInput == "NTF05" || this.formInput == "NTF06" || this.formInput == "NTF07" || this.formInput == "NTF19" || this.formInput == "NTF20" || this.formInput == "NTF21" || this.formInput == "NTF23" || this.formInput == "NTF30" ) {
							
							//hapus data inputan sebelumnya (atau yg dari pengajuan)
							sql.add("delete from it_aju_d where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						
						if (this.sg1.getRowValidCount() > 0){
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){
									var j = i+1;
									sql.add("insert into it_aju_d(no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
											"('"+this.e_noaju.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i)+"','IDR',1,"+parseNilai(this.sg1.cells(4,i))+","+parseNilai(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','"+this.app._lokasi+"','ITKBAJU','FIAT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");									
																			
								}
							}
						}
						
						//utk modul PTG panjar, nourut 99 adalah utk akun panjar posisi kreditnya (jurnal pembalance)
						if (this.e_modul.getText() == "PJPTG" && this.formInput != "NTF07" && this.formInput != "NTF21") {							
							sql.add("insert into it_aju_d(no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) "+
									"select '"+this.e_noaju.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',99,a.kode_akun,a.keterangan,'C','IDR',1,a.nilai,a.nilai,a.kode_pp,a.kode_drk,a.kode_lokasi,'ITKBAJU','PJ','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate() "+
									"from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
									"where b.no_aju='"+this.e_noaju.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");							
						}
						
						if (this.e_modul.getText() == "PJPTG" && (this.formInput == "NTF07" || this.formInput == "NTF21")) {							
							sql.add("insert into it_aju_d(no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) "+
									"select '"+this.e_noaju.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',99,a.kode_akun,a.keterangan,'C','IDR',1,"+parseNilai(this.e_nilaipj.getText())+","+parseNilai(this.e_nilaipj.getText())+",a.kode_pp,a.kode_drk,a.kode_lokasi,'ITKBAJU','PJ','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate() "+
									"from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
									"where b.no_aju='"+this.e_noaju.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");	
									
							sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) "+
									"select '"+this.e_noaju.getText()+"',kode_lokasi,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_akun,kode_pp,'"+this.e_nb.getText()+"','C',nilai,getdate(),'"+this.app._userLog+"',kode_proyek,'FIAT' "+
									"from prb_prbdd_d where no_bukti='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									

							sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) "+
									"select '"+this.e_noaju.getText()+"',kode_lokasi,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_akun,kode_pp,'"+this.e_nb.getText()+"','D',"+nilaiToFloat(this.e_debet.getText())+",getdate(),'"+this.app._userLog+"',kode_proyek,'FIAT' "+
									"from prb_prbdd_d where no_bukti='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and form in ('NTF07','NTF21') ");		
						}

						if (this.e_modul.getText() != "PANJAR") {
							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
									"select no_bukti,'R-KBAJUDRK',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,case dc when 'D' then 'C' else 'D' end,0,nilai "+
									"from angg_r where no_bukti='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul in ('ITKBAJUDRK','PRBEBAN')");
						}	
										
						if (this.sg2.getRowValidCount() > 0){
							for (var i=0;i < this.sg2.getRowCount();i++){
								if (this.sg2.rowValid(i)){
									if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
										var DC = "D"; 
										var nilai = nilaiToFloat(this.sg2.cells(7,i));
									} else {
										var DC = "C";
										var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
									}
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_noaju.getText()+"','ITKBAJU','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.periodeAju+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
								}
							}
						}			
						
						////pertanggungan panjar alias plusplos gak ada kasbank
						if (prog == "4") { 
							sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input) values "+
									"('"+this.e_noaju.getText()+"','-','-','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','IDR',1,'-','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.app._kodePP+"','ITPJPTG',"+parseNilai(this.e_nilaipj.getText())+",0,'-','2','F','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");
														
							sql.add("insert into ptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)  "+
									"select '"+this.e_noaju.getText()+"','-','"+this.dp_d1.getDateString()+"',0,kode_akun,keterangan,dc,"+nilaiToFloat(this.e_nilaipj.getText())+",kode_pp,kode_drk,kode_lokasi,'ITPJPTG',jenis,'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from it_aju_d where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");														
						}												
					}
					
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
					for (var i=0;i < this.sgRek.getRowCount();i++){
						if (this.sgRek.rowValid(i)){							
							sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan,pajak,berita,kode_pajak,npwp) values "+
									"('"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.sgRek.cells(6,i)+"','"+this.sgRek.cells(7,i)+"','"+this.sgRek.cells(5,i)+"','-',"+nilaiToFloat(this.sgRek.cells(3,i))+",'"+this.sgRek.cells(0,i)+"',"+nilaiToFloat(this.sgRek.cells(2,i))+",'"+this.sgRek.cells(4,i)+"','"+this.sgRek.cells(8,i)+"','"+this.sgRek.cells(9,i)+"')");
							
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
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); 
					this.doClick();
					this.doLoad();
					this.e_memo2.setText("-");
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);		
					this.c_status.setText("APPROVE");					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :			
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
				this.sg1.validasi();				
				this.doHitungGar();				
				if (this.flagGarFree == "0") {
					this.dataAkunGar = {rs:{rows:[]}};	
					var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataAkunGar = data;
					}				
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (!this.sg1.rowValid(i)){
							var isKosong = true;
							for (var j=0;j < this.sg1.getColCount();j++){
								if (this.sg1.cells(j,i) != "") {
									isKosong = false;
									break;
								}
							}						
							if (!isKosong) {
								system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
								return false;
							}
						}
						else {
							for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
								line = this.dataAkunGar.rs.rows[j];
								if (line.kode_akun == this.sg1.cells(0,i) && this.sg1.cells(8,i) == "-") {
									var k = i+1;
									system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.[Baris : "+k+"]");
									return false;						
								}
							}
						}
					}				
					
					//nonceksaldobudget
					this.dataAkunNonCek = {rs:{rows:[]}};
					var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag = '053' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataAkunNonCek = data;
					}

					for (var i=0;i < this.sg2.getRowCount();i++){
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
							var line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.sg2.cells(0, i)) {
								if (nilaiToFloat(this.sg2.cells(7, i)) > 0 && nilaiToFloat(this.sg2.cells(6, i)) < nilaiToFloat(this.sg2.cells(7, i))) {
									
									var temu = false;
									for (var m=0;m<this.dataAkunNonCek.rs.rows.length;m++){
										line2 = this.dataAkunNonCek.rs.rows[m];							
										if (line2.kode_akun == this.sg2.cells(0,i)) {		
											temu = true;
										}
									}
									
									//NTF05,NTF07,NTF19 -->pakai BDD (non budget, kontrol pakai OR)
									if (!temu  && this.formInput != "NTF23" && this.formInput != "NTF30" && this.formInput != "NTF21" && this.formInput != "NTF19" && this.formInput != "NTF05" && this.formInput != "NTF07" && this.formInput != "INISIASI" && this.formInput == "PRPTG" && this.formInput == "ISPJPTG" && this.formInput == "PRPJPTG" && this.formInput == "PRAGENDA" && this.formInput == "PRBEBAN") {
										var k =i+1;
										system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
										return false;						
									}

								}
							}
						}
					}			
				}		
				if (nilaiToFloat(this.e_nilaikb.getText()) != nilaiToFloat(this.e_totRek.getText())) {
					system.alert(this, "Transaksi tidak valid.", "Nilai KasBank tidak sama dengan Total Rekening.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		var sql = new server_util_arrayList();			
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' union select '-','-' ");
		this.dbLib.getMultiDataProviderA(sql);		
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fiat_m","no_fiat",this.app._lokasi+"-FKA"+this.e_periode.getText().substr(2,4)+".","00000"));		
	},			
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {					
			this.pc1.setActivePage(this.pc1.childPage[1]);						
			this.e_noaju.setText(this.sg.cells(0,row));			
			this.e_modul.setText(this.sg.cells(2,row));			
			this.e_akun.setText(this.sg.cells(4,row));			
			this.e_pp.setText(this.sg.cells(3,row));			
			this.e_ket.setText(this.sg.cells(6,row));			
			this.e_drk.setText(this.sg.cells(5,row));			
			this.e_tgl.setText(this.sg.cells(1,row));			
			this.e_tglinput.setText(this.sg.cells(8,row));			
			this.e_user.setText(this.sg.cells(9,row));			
			this.e_total.setText(this.sg.cells(7,row));									
			this.e_ver.setText(this.sg.cells(10,row));			
			this.e_tglver.setText(this.sg.cells(11,row));			
			this.e_memo2.setText(this.sg.cells(12,row));							
			this.e_memo.setText("-");							
		
			if (this.e_modul.getText() == "PANJAR") {
				var strSQL = "select a.kode_drk+' - '+isnull(b.nama,'-') as drk "+						 
							 "from angg_r a left join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and substring(a.periode1,1,4)=b.tahun "+						
							 "where a.no_bukti='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){															
						this.e_drk.setText(line.drk);													
					} 
				}
			}			

			this.formInput = "";
			
			if (this.e_modul.getText().substr(0,5) == "HUTIF") {
				var strAJU = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from it_ifreim_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
							"                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
							"where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
			}
			else {			
				var strSQL = "select form,no_app from it_aju_m where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){															
						var vForm = line.form;
						this.formInput = line.form;
						this.noAppAju = line.no_app;
					} 
				}	
				
				if (vForm == "KANTIN" || vForm == "BMULTIREK" || vForm == "BMULTI" || vForm == "PTGMULTI" || vForm == "PTGMULTIBD" || vForm == "SPPD2" ) {
					var strAJU = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,isnull(aa.nik_panjar,'-')+' - '+isnull(e.nama,'-') as nik_panjar "+
							"from it_aju_multi a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
							"                    inner join it_aju_m aa on a.no_aju=aa.no_aju and a.kode_lokasi=aa.kode_lokasi "+
							"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
							"                    left join karyawan e on aa.nik_panjar=e.nik and aa.kode_lokasi=e.kode_lokasi "+						
							"where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				}				
				else {
					if (vForm == "NTF30" || vForm == "NTF23" || vForm == "NTF19" || vForm == "NTF20" || vForm == "NTF21" || vForm == "NTF05" || vForm == "NTF06" || vForm == "NTF07" || vForm == "PRPTG" || this.formInput == "ISPJPTG" || vForm == "PRPJPTG" || vForm == "PRAGENDA" || vForm == "PRBEBAN" ) {						
						var strAJU = "select aa.kode_akun,isnull(b.nama,'-') as nama_akun,aa.dc,aa.keterangan,"+
									"aa.nilai,"+
									"aa.kode_pp,c.nama as nama_pp,aa.kode_drk,isnull(d.nama,'-') as nama_drk,a.nik_panjar+' - '+isnull(e.nama,'-') as nik_panjar "+
									"from it_aju_m a  "+
									"                inner join it_aju_d aa on a.no_aju=aa.no_aju and a.kode_lokasi=aa.kode_lokasi "+
									"                inner join pp c on aa.kode_pp=c.kode_pp and aa.kode_lokasi=c.kode_lokasi "+
									"                left join drk d on aa.kode_drk=d.kode_drk and aa.kode_lokasi=d.kode_lokasi and d.tahun=substring(aa.periode,1,4) "+						
									"                left join karyawan e on a.nik_panjar=e.nik and a.kode_lokasi=e.kode_lokasi "+						
									"				 left join masakun b on aa.kode_akun=b.kode_akun and aa.kode_lokasi=b.kode_lokasi "+
									"where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
					}
					else {											
						var strAJU = "select a.kode_akun,isnull(b.nama,'-') as nama_akun,'D' as dc,a.keterangan,"+
									"case when a.sts_pajak = 'NON' then a.nilai else a.nilai+a.npajak end as nilai,"+
									"a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.nik_panjar+' - '+isnull(e.nama,'-') as nik_panjar "+
									"from it_aju_m a  "+
									"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+						
									"                left join karyawan e on a.nik_panjar=e.nik and a.kode_lokasi=e.kode_lokasi "+						
									"				 left join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";  
																
					}
				}
			}					

			var data = this.dbLib.getDataProvider(strAJU,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg1.clear(1);
			this.e_nikpj.setText(line.nik_panjar);				
			
			if (this.e_modul.getText().substr(0,5) != "HUTIF") {
				if (vForm != "NTF05" && vForm != "NTF06" && vForm != "NTF07" && vForm != "NTF19" && vForm != "NTF20"  && vForm != "NTF21" && vForm != "NTF23" && vForm != "NTF30") { //yg ntf sudah dicreate dr pengajuan akun pajaknya
					var data = this.dbLib.getDataProvider("select 'C' as dc,a.keterangan,a.sts_pajak,a.npajak as nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
														"from it_aju_m a  "+													  
														"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													  
														"where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.sts_pajak == "P21" || line.sts_pajak == "P23" ) {
								if (line.sts_pajak == "P21") var akunPajak = this.akunPPH21; else var akunPajak = this.akunPPH23; 
								this.sg1.appendData([akunPajak,"-",line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
								
								for (var i = 0; i < this.sg1.rows.getLength();i++){
									this.doChangeCell1(this.sg1, 0, i);
								}
							}
						}
					}
				}
			}
			
			this.periodeAju = "";
			//kalo akunnya hutang gak muncul di angg_r jadi gak bisa cek budget :   var data = this.dbLib.getDataProvider("select periode1 from angg_r where no_bukti='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);			
			var data = this.dbLib.getDataProvider("select a.periode as periode1,b.jenis from it_aju_m a inner join it_ajuapp_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi where a.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.periodeAju = line.periode1;			
					this.e_jenis.setText(line.jenis);			
				}
			}
			
			
			var strSQL = "select isnull(b.kode_dosen,'-') as kode_dosen,a.nilai+isnull(a.pajak,0) as bruto,a.pajak,a.nilai,a.berita,"+							 
						 " a.bank as bank, a.no_rek as rek, a.nama_rek as nama, "+							 
						 "isnull(a.kode_pajak,'-') as kode_pajak,a.npwp "+
						 "from it_aju_rek a left join it_dosen b on a.keterangan=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgRek.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sgRek.appendData([line.kode_dosen,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai),line.berita,line.nama,line.bank,line.rek,line.kode_pajak,line.npwp]);
				}
				this.sgRek.validasi();
			} else this.sgRek.clear(1);											


			this.sgUpld.clear(); 
			var data = this.dbLib.getDataProvider(							 
							"select a.kode_jenis,a.nama,b.no_gambar,b.jenis "+
							"from dok_jenis a left join it_aju_dok b on a.kode_jenis='DOK' and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_noaju.getText()+"' "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and b.no_gambar is not null ",true);							 							 
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad",line.jenis]);						
				}
			} else this.sgUpld.clear(1);
			
		}
	},
	doLoad:function(sender){		
		if (this.c_jenis.getText() == "") var fJenis = " ";
		else var fJenis = " h.jenis='"+this.c_jenis.getText()+"' and  ";

		var show = parseInt(this.c_show.getText());			
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,isnull(g.kode_drk+' - '+isnull(g.nama,'-'),'-') as drk,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,e.no_ver,convert(varchar,e.tgl_input,103) as tgl_ver,case f.catatan when '' then '-' else f.catatan end as catatan "+
		             "from it_aju_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "inner join ver_m e on a.no_ver=e.no_ver and a.kode_lokasi=e.kode_lokasi "+
					 "inner join ver_d f on f.no_ver=e.no_ver and f.kode_lokasi=e.kode_lokasi "+
					 "inner join it_ajuapp_m h on a.no_aju=h.no_aju and a.kode_lokasi=h.kode_lokasi "+
					 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "left join drk g on a.kode_drk=g.kode_drk and a.kode_lokasi=g.kode_lokasi and substring(a.periode,1,4)=g.tahun "+
					 "where "+fJenis+" a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"'";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/show));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},	
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['a.no_aju', 'a.nilai'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}
			
			var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,g.kode_drk+' - '+isnull(g.nama,'-') as drk,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,e.no_ver,convert(varchar,e.tgl_input,103) as tgl_ver,f.catatan "+
		             "from it_aju_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "inner join ver_m e on a.no_ver=e.no_ver and a.kode_lokasi=e.kode_lokasi "+
					 "inner join ver_d f on f.no_ver=e.no_ver and f.kode_lokasi=e.kode_lokasi "+
					 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "left join drk g on a.kode_drk=g.kode_drk and a.kode_lokasi=g.kode_lokasi and substring(a.periode,1,4)=g.tahun "+
					 "where ("+filter_string+") and a.progress ='1' and a.kode_lokasi='"+this.app._lokasi+"'";					 										

			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / show));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		catch (e) {
			alert(e);
		}
	},
	doTampilData: function(page) {
		var show = parseInt(this.c_show.getText());
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * show;
		var finish = (start + show > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+show);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.no_aju,line.tanggal,line.modul,line.pp,line.akun,line.drk,line.keterangan,floatToNilai(line.nilai),line.tgl_input,line.nik_user,line.no_ver,line.tgl_ver,line.catatan]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();
							
						}else system.info(this,result,"");	    			
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataDRK = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataDRK.set(line.kode_drk, line.nama);
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
	doChangeCell1: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg1.cells(2,row) != "" && this.sg1.cells(4,row) != "") {
				this.sg1.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
			}
		}
		if (col == 7) {
			if (sender.cells(7,row) != "") {
				var drk = this.dataDRK.get(sender.cells(7,row));
				if (drk) sender.cells(8,row,drk);
				else {
					if (trim(sender.cells(7,row)) != "") system.alert(this,"Kode DRK "+sender.cells(7,row)+" tidak ditemukan","Inputkan kode lainnya.","checkDRK");                
					sender.cells(7,row,"");
					sender.cells(8,row,"");
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell1");			
	},	
	doNilaiChange1: function(){
		try{			
			var debet = kredit = tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "C") {
						tot -= nilaiToFloat(this.sg1.cells(4,i));
						kredit += nilaiToFloat(this.sg1.cells(4,i));
					}
					else {
						tot += nilaiToFloat(this.sg1.cells(4,i));
						debet += nilaiToFloat(this.sg1.cells(4,i));
					}
				}
			}	

			if (this.e_modul.getText() != "PJPTG") this.e_nilaikb.setText(floatToNilai(tot));						
			else {				
				var data = this.dbLib.getDataProvider(
					   "select case when b.status_if='OPEN' then b.nilai else a.nilai-isnull(e.totptg,0) end as nilai_pj "+
			           "from it_aju_m a "+
					   "inner join it_aju_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
					   
					   "left join ("+
					   "	select no_ptg as no_pj,kode_lokasi,sum(nilai+npajak) as totptg "+
					   "	from it_aju_m where form='NTF21' and kode_lokasi='"+this.app._lokasi+"' and no_aju <>'"+this.e_noaju.getText()+"' "+
					   "	group by	no_ptg,kode_lokasi "+
					   ")e on b.no_ptg=e.no_pj and b.kode_lokasi=e.kode_lokasi  "+	

					   "where b.no_aju='"+this.e_noaju.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);

				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_nilaipj.setText(floatToNilai(line.nilai_pj));						
					} 
				}

				this.e_nilaikb.setText(floatToNilai(tot - nilaiToFloat(this.e_nilaipj.getText())));						
			}
			this.e_debet.setText(floatToNilai(debet));			
			this.e_kredit.setText(floatToNilai(kredit));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						this.sg1.setCell(2,row,"D");						
					}
				break;			
			case 3 : 
					if (this.sg1.cells(3,row) == ""){
						if (row == 0) this.sg1.setCell(3,row,this.e_ket.getText());
						else this.sg1.setCell(3,row,this.sg1.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg1.cells(5,row) == "") && (row > 0)) {
						this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
						this.sg1.setCell(6,row,this.sg1.cells(6,(row-1)));
					}
					else {
						this.sg1.setCell(5,row,this.app._kodePP);
						this.sg1.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "-" && this.sg1.cells(7,i)!= "-"){				
				if (this.sg1.cells(2,i) == "D") nilai = nilaiToFloat(this.sg1.cells(4,i));
				else nilai = nilaiToFloat(this.sg1.cells(4,i)) * -1;				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg1.cells(0,i) == this.sg2.cells(0,j) && this.sg1.cells(5,i) == this.sg2.cells(2,j) && this.sg1.cells(7,i) == this.sg2.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg1.cells(0,i),this.sg1.cells(1,i),this.sg1.cells(5,i),this.sg1.cells(6,i),this.sg1.cells(7,i),this.sg1.cells(8,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(7,idx));
					total = total + nilai;
					this.sg2.setCell(7,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.periodeAju+"','"+this.e_noaju.getText()+"') as gar ",true);						
			if (typeof data == "object" && data.rs.rows[0] != undefined){				
				var line = data.rs.rows[0];
				data = line.gar.split(";");				
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); 
			this.doClick();
			this.doLoad();
			this.e_memo2.setText("-");
			this.e_memo.setText("-");
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doNilaiChangeRek: function(){
		try{			
			var totrek = 0;
			for (var i = 0; i < this.sgRek.rows.getLength();i++){
				if (this.sgRek.rowValid(i) && this.sgRek.cells(3,i) != ""){
					totrek += nilaiToFloat(this.sgRek.cells(3,i));					
				}
			}									
			this.e_totRek.setText(floatToNilai(totrek));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCellRek: function(sender, col, row){
		if (col == 1 || col == 2) {			
			if (this.sgRek.cells(1,row) != "" && this.sgRek.cells(2,row) != "") {
				var neto = nilaiToFloat(this.sgRek.cells(1,row)) - nilaiToFloat(this.sgRek.cells(2,row));
				this.sgRek.cells(3,row,floatToNilai(neto));
				this.sgRek.validasi();			
			}
		}		
	}
});