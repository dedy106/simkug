window.app_saku2_transaksi_kopeg_kbitt_fAjuPDDuser = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuPDDuser.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuPDDuser";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Pengeluaran PDD - User", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Transaksi","List Data"]});				
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenis",items:["MALA"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[520,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 				
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_file = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"File", readOnly:true, tag:0});		
		this.uploader = new uploader(this.pc2.childPage[0],{bound:[489,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,258], childPage:["Daftar Pengajuan","Error","Catatan Appr"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,				
				colTitle:["NIM","Nama","Tagihan","Potongan","Beasiswa","Tot Tagihan","Tot Bayar","Lebih Bayar","No Rek","Bank","Nama Rek","Keterangan","Thn Akademik","No Duplikasi"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,150,150,100,100,100,100,100,100,100,200,100]],
				readOnly:true,
				colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
				afterPaste:[this,"doAfterPaste"],
				pasteEnable:true,autoPaging:true,rowPerPage:1000,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});
			
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
				colTitle:["Baris INVALID","Keterangan","Tipe Err"],
				colWidth:[[2,1,0],[250,100,100]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		
		
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No Approver", readOnly:true,tag:9});				
		this.e_catat = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,550,20],caption:"Catatan", readOnly:true,tag:9});				

		this.cb_nb = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,222,20],caption:"No Agenda", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});		
		this.bLoad = new portalui_button(this.pc2.childPage[1],{bound:[120,15,98,20],caption:"Load",hint:"Load",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);

		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[1].rearrangeChild(10, 23);	
				
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
			 				  "where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);			
			
			this.cb_pp.setText(this.app._kodePP);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			

			this.c_jenis.setText("MALA");
			this.akunPDD = "2141101";

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAjuPDDuser.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuPDDuser.implement({	
	doLoad: function() {
		this.stsSimpan = 0;
		var data = this.dbLib.getDataProvider(
					"select a.no_ref1,a.nik_app,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai as bruto,a.kode_pp,a.kode_akun, a.user_input,isnull(c.no_gambar,'') as no_gambar,isnull(d.catatan,'-') as catatan,isnull(d.no_bukti,'-') as no_app    "+
					"from it_aju_m a "+
					"left join it_aju_dok c on a.no_aju=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+					   
					"left join it_pdd_app d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi and d.no_ref='-' "+
					"where a.no_aju='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_ref1='MALA' ",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.nbLama = this.cb_nb.getText();	
				this.e_nb.setText(this.cb_nb.getText());			
				this.dp_d1.setText(line.tanggal);
				this.c_jenis.setText(line.no_ref1);
				this.cb_app.setText(line.nik_app);				
				this.cb_pp.setText(line.kode_pp);									
				this.e_ket.setText(line.keterangan);
				this.e_nilai.setText(floatToNilai(line.bruto));																
				this.e_file.setText(line.no_gambar);
				this.fileBfr = line.no_gambar;

				this.e_noapp.setText(line.no_app);
				this.e_catat.setText(line.catatan);
				
				setTipeButton(tbUbahHapus);
			} 
		}			
		
		var strSQL = "select * from aka_pddout_d where no_bukti='"+this.cb_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg1.appendData([line.nim,line.nama,floatToNilai(line.tagihan),floatToNilai(line.beasiswa),floatToNilai(line.potongan),floatToNilai(line.tot_tagih),floatToNilai(line.tot_bayar),floatToNilai(line.lebih_bayar),line.no_rek,line.bank,line.nama_rek,line.jenis_bea,line.tahun_aka,line.no_duplikat]);
			}
		} else this.sg1.clear(1);	

		this.pc2.setActivePage(this.pc2.childPage[0]);					
		this.pc1.setActivePage(this.pc1.childPage[0]);				

	},
	isiCBnb: function() {
		//J = input, L = return dr verifikator
		this.cb_nb.setSQL("select no_aju, keterangan from it_aju_m where form = 'PDDOUTAJU' and progress in ('J','L','R') and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_ref1='MALA' ",["no_aju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);				
	},
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	

			//------------ cek duplikasi grid ------------
			this.inValid = false;
			this.sg2.clear();
			for (var i=0; i < this.sg1.getRowCount();i++){
				for (var j=0; j < this.sg1.getRowCount();j++){
					if (this.sg1.cells(0,i) == this.sg1.cells(0,j) && this.sg1.cells(12,i) == this.sg1.cells(12,j) && (i != j) ) {
						this.inValid = true;
						var k = i+1;
						var l = j+1;						
						this.sg2.appendData([k,l,"DUPLIKASI BARIS"]);										
					}
				}
			}

			if (this.inValid == true) {
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				return false;
			}
			//------------ cek duplikasi grid ------------
			
			//pecah menu
			//if (this.c_jenis.getText() == "MALA") 
			var strSQL = "select nim from aka_mahasiswa where kode_lokasi ='"+this.app._lokasi+"'";			
			//else var strSQL = "select no_tes as nim from aka_maba where kode_lokasi ='"+this.app._lokasi+"'";			

			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataNIS = dataS;
			}		
			
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(0,i,"INVALID | "+this.sg1.cells(0,i));
				
				if (this.dataNIS.rs.rows.length > 0) {
					for (var j=0;j < this.dataNIS.rs.rows.length;j++){				
						if (this.sg1.cells(0,i).substr(10,30) == this.dataNIS.rs.rows[j].nim) {
							
							//------------ cek duplikasi tabel ------------
							var temu = false;
							var data = this.dbLib.getDataProvider("select no_bukti from aka_cd_d where no_bukti <> '"+this.e_nb.getText()+"' and nim='"+this.dataNIS.rs.rows[j].nim+"' and tahunaka='"+this.sg1.cells(12,i)+"'",true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined){
									this.sg1.cells(13,i,line.no_bukti);
									temu = true;		
								} 							
							}	
							//------------ cek duplikasi tabel ------------
							
							if (temu == false)	this.sg1.cells(0,i,this.dataNIS.rs.rows[j].nim);
						}						
					}	
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;								
				}											
			}
			
			if (this.inValid == false) {
				this.sg1.validasi();
				if (this.stsSimpan==1) setTipeButton(tbSimpan);	
				else setTipeButton(tbUbahHapus);	
			}
			else {
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID") {
						var j = i+1;
						this.sg2.appendData([j,this.sg1.cells(13,i),"NIM TIDAK TERDAFTAR / DUPLIKASI DATA"]);						
					}
				}
			}

		} catch(e) {alert(e);}
	},
	doPage1: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
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
			if (this.stsSimpan==1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if (this.stsSimpan == 0) {
						sql.add("delete from it_aju_m where no_aju='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_rek where no_aju='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from it_aju_dok where no_bukti='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from aka_cd_d where no_bukti='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from aka_pddout_d where no_bukti='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					var netto = nilaiToFloat(this.e_nilai.getText());
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app,no_ref1) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','UMUM','"+this.akunPDD+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+netto+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','J','-','-','"+this.app._namaUser+"','PDDOUTAJU','NON',0,'"+this.cb_app.getText()+"','"+this.c_jenis.getText()+"')");					
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into aka_cd_d (no_bukti,kode_lokasi,periode,nim,kode_akun,dc,nilai,ref1,  bank,no_rek,nama_rek, tahunaka) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.akunPDD+"','C',"+nilaiToFloat(this.sg1.cells(7,i))+",'-', '"+this.sg1.cells(9,i)+"','"+this.sg1.cells(8,i)+"','"+this.sg1.cells(10,i)+"','"+this.sg1.cells(12,i)+"')");		
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,pajak,keterangan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(9,i)+"','"+this.sg1.cells(8,i)+"','"+this.sg1.cells(10,i)+"','-',"+nilaiToFloat(this.sg1.cells(7,i))+",0,'"+this.sg1.cells(0,i)+"')");										

								sql.add("insert into aka_pddout_d (no_bukti,kode_lokasi, nim,nama,tagihan,beasiswa,potongan,tot_tagih,tot_bayar,lebih_bayar,no_rek,bank,nama_rek,jenis_bea,tahun_aka,no_duplikat) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"', '"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+","+nilaiToFloat(this.sg1.cells(4,i))+","+nilaiToFloat(this.sg1.cells(5,i))+","+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+",'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(9,i)+"','"+this.sg1.cells(10,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','"+this.sg1.cells(13,i)+"')");
							}
						}
					}
										
					sql.add("insert into it_aju_dok(no_bukti,modul,no_gambar,kode_lokasi)values('"+this.e_nb.getText()+"','AJUBBN','"+this.e_file.getText()+"','"+this.app._lokasi+"')");
					
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
					this.sg1.clear(1);
					this.sg2.clear(1);
					setTipeButton(tbAllFalse);		
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.isiCBnb();		
					this.stsSimpan=1;									
				break;
			case "simpan" :	
			case "ubah" :				
				this.preView = "1";																
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from it_aju_m where no_aju='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_rek where no_aju='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_dok where no_bukti='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_cd_d where no_bukti='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_pddout_d where no_bukti='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) {
			this.doClick();
			this.isiCBnb();
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);
			this.sg2.clear(1);
			this.isiCBnb();
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_pp.setFocus();
		setTipeButton(tbAllFalse);					
		this.stsSimpan=1;
	},	
	doChange:function(sender){
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {
			//if (this.c_jenis.getText() == "MALA") 
			this.akunPDD = "2141101";
			//else this.this.akunPDD = "2141104";
		}
	},	
	doNilaiChange: function(){
		try{			
			var totB = 0;			
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (this.sg1.cells(5,i) != "") {
					totB += nilaiToFloat(this.sg1.cells(7,i));					
				}
			}									
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
							if (this.preView == "1") {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
								//this.nama_report="server_report_saku2_kopeg_kbitt_rptAjuPDD";
								this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTuPddGabung";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/";
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
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			setTipeButton(tbAllFalse);				
			this.pc2.setActivePage(this.pc2.childPage[0]);					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.sg1.clear(1);
			this.sg2.clear(1);
			this.isiCBnb();
			this.stsSimpan=1;
		} catch(e) {
			alert(e);
		}
	}
});