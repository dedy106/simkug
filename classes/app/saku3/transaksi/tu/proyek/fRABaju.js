window.app_saku3_transaksi_tu_proyek_fRABaju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fRABaju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fRABaju";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pengajuan RAB", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,470], childPage:["Data RAB","List RAB"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No RAB","Keterangan","Customer","Nilai OR"],
					colWidth:[[3,2,1,0],[100,300,300,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagin / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 					
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,200,20],caption:"No RAB", readOnly:true, change:[this,"doChange"]});	
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,390], childPage:["Data Proyeksi","Detail PDPT","Detail RAB","File Dokumen","Customer","Approval"]});
		this.cb_buat = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Dibuat Oleh",tag:2,multiSelection:false});
		//this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal RAB", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18]}); 
		
		this.cb_ppkelola = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Unit Pengelola",tag:2,multiSelection:false}); 					
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,430,20],caption:"No Kontrak", maxLength:50, tag:1});					
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Png. Jawab",tag:2,multiSelection:false}); 						
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.e_jenissewa = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Kategori Proyek", readOnly:true, tag:1});			
		this.e_nomemo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,430,20],caption:"No Memo", maxLength:50, tag:1});					
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});		
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true}); //,change:[this,"doChange"]								
		//this.bHitung = new portalui_button(this.pc1.childPage[0],{bound:[250,15,80,18],caption:"Sync RAB",click:[this,"doHitung"]});		
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai OR RAB", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_totrab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Total RAB", tag:1, tipeText:ttNilai, text:"0", readOnly:true,   visible:false,change:[this,"doChange"]});						
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0", visible:false});	
		this.bPPN = new portalui_button(this.pc1.childPage[0],{bound:[250,19,80,18],caption:"Hitung",click:[this,"doHitungPajak"],visible:false});							
		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"PPh 4 ayat 1", tag:1, tipeText:ttNilai, text:"0",visible:false});						
		
		this.sgp = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
				colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal"],
				colWidth:[[3,2,1,0],[100,100,100,500]],
				columnReadOnly:[true,[3],[]],
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
				pasteEnable:true,afterPaste:[this,"doAfterPastep"], 
				nilaiChange:[this,"doNilaiChangep"],change:[this,"doChangeCellsp"],autoAppend:true,defaultRow:1});
		this.sgnp = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sgp});		


		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal"],
					colWidth:[[3,2,1,0],[100,100,100,500]],
					columnReadOnly:[true,[3],[]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					pasteEnable:true,afterPaste:[this,"doAfterPaste"], 
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		

		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,14,220,20],caption:"Customer",tag:2,multiSelection:false,change:[this,"doChange"]});		
		this.e_namacust = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1});					
		this.e_tel = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,13,500,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_mail = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,15,500,20],caption:"Email", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,500,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,17,500,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,18,500,20],caption:"P I C", maxLength:50, tag:1});			
		this.e_jabatan = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,19,500,20],caption:"Jabatan", maxLength:50, tag:1});				
						
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,11,200,20],caption:"No Approve", readOnly:true, tag:9});
		this.e_memo = new saiMemo(this.pc1.childPage[5],{bound:[20,10,450,80],caption:"Catatan Approve",tag:9,readOnly:true});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		this.pc1.childPage[5].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
			
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d3,this.dp_d3.year,this.dp_d3.month,this.dp_d3.day);
			
			this.cb_app.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
							  "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_ppkelola.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_buat.setSQL("select distinct a.nik,a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							   "where a.flag_aktif='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
			
			this.cb_pp.setText(this.app._kodePP);	

			this.e_memo.setReadOnly(true);	
			
			this.cb_buat.setText(this.app._userLog);


				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fRABaju.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fRABaju.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sg.validasi();
		} catch(e) {alert(e);}
	},
	doAfterPastep: function(sender,totalRow){
		try {
			this.sgp.validasi();
		} catch(e) {alert(e);}
	},
	doHitungPajak: function(sender){
		var sepuluhPersen = 0.1 * nilaiToFloat(this.e_nilai.getText());
		this.e_ppn.setText(floatToNilai(sepuluhPersen));
		this.e_pph4.setText(floatToNilai(sepuluhPersen));
	},
	/*
	doHitung: function(sender){
		try{	
			var subttl = total = bobot = 0;		
			total = nilaiToFloat(this.e_totrab.getText());
			for (var i=0;i < this.sg.getRowCount();i++){
				this.sg.cells(3,i,"0");
			}

			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {													
					bobot = nilaiToFloat(this.sg.cells(3,i)) / total;
					
					this.sg.cells(3,i,  Math.round(bobot * nilaiToFloat(this.e_nilaior.getText())) );
					this.sg.cells(1,i,  Math.round(Math.round(bobot * nilaiToFloat(this.e_nilaior.getText())) / nilaiToFloat(this.sg.cells(2,i)) * 100) / 100 );
					
					subttl += nilaiToFloat(this.sg.cells(3,i));
				}
			}
			var sls = nilaiToFloat(this.e_nilaior.getText()) - subttl;
			sls = sls + nilaiToFloat(this.sg.cells(3,i-1));			
			this.sg.cells(3,i-1,sls);		
			
			this.sg.validasi();
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	*/
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
			if (this.stsSimpan == 1) this.noRAB = this.standarLib.noBuktiOtomatis(this.dbLib,"tu_rab_m","no_rab",this.app._lokasi+"-RAB"+this.periode.substr(2,4)+".","0000");						
			else this.noRAB = this.cb_kode.getText();

			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from tu_rab_m where no_rab = '"+this.noRAB+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from tu_rab_d where no_rab = '"+this.noRAB+"' and kode_lokasi='"+this.app._lokasi+"'");													
						sql.add("delete from tu_rab_dok where no_rab='"+this.noRAB+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from tu_rab_cust where no_rab='"+this.noRAB+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					sql.add("insert into tu_rab_m(no_rab,keterangan,kode_lokasi,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nik_app,progress,no_app,pp_kelola,periode,no_dok,tanggal,nik_buat,cat_app_proyek, no_memo,ppn,pph4) values "+
							"('"+this.noRAB+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+
							nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+this.cb_jenis.getText()+"','"+this.cb_app.getText()+"','0','-','"+this.cb_ppkelola.getText()+"','"+this.periode+"','"+this.e_dok.getText()+"','"+this.dp_d3.getDateString()+"','"+this.cb_buat.getText()+"','-','"+this.e_nomemo.getText()+"',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph4.getText())+")");
					
					for (var i=0;i < this.sgp.getRowCount();i++){
						if (this.sgp.rowValid(i)){								
							sql.add("insert into tu_rab_d(no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
									"('"+this.noRAB+"','"+this.app._lokasi+"',"+i+",'"+this.sgp.cells(0,i)+"',"+nilaiToFloat(this.sgp.cells(1,i))+","+nilaiToFloat(this.sgp.cells(2,i))+","+nilaiToFloat(this.sgp.cells(3,i))+",'PDPT')");
						}
					}

					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){								
							sql.add("insert into tu_rab_d(no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
									"('"+this.noRAB+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'BEBAN')");
						}
					}
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into tu_rab_dok(no_rab,no_gambar,nu,kode_jenis,kode_lokasi) values ('"+this.noRAB+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}	
					
					sql.add("insert into tu_rab_cust (no_rab,kode_lokasi,kode_cust,nama,alamat,no_tel,email,npwp,alamat2,pic,jabatan) values "+
							"('"+this.noRAB+"','"+this.app._lokasi+"','"+this.cb_cust.getText()+"','"+this.e_namacust.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_npwp.getText()+"','"+this.e_alamat2.getText()+"','"+this.e_pic.getText()+"','"+this.e_jabatan.getText()+"')");

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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tu_rab_m where no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from tu_rab_d where no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
					sql.add("delete from tu_rab_dok where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_rab_cust where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.stsSimpan = 1;				
					this.sg.clear(1);
					this.sg3.clear(1);
					this.sgUpld.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doClick();					
				break;
			case "simpan" :	
			case "ubah" :	
					this.preView = "1";
					if (nilaiToFloat(this.e_nilaior.getText()) != nilaiToFloat(this.e_totrab.getText())) {
						system.alert(this,"Nilai OR tidak valid.","Nilai OR tidak sama dengan Total RAB.");
						return false;
					}
					else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
							
			case "hapus" :	
				this.preView = "0";				
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;	
		if (this.stsSimpan == 1) this.doClick();			
	},
	doClick:function(sender){		
		try {
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_rab_m","no_rab",this.app._lokasi+"-RAB"+this.periode.substr(2,4)+".","0000"));						
			this.cb_buat.setFocus();	
			this.stsSimpan = 1;		
			setTipeButton(tbSimpan);
		}
		catch(e) {
			alert(e);
		}
	},		
	doChange: function(sender){
		try{			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select a.*,isnull(b.catatan,'-') as catatan, a.tanggal as tanggal_rab,a.nik_buat as nik_rab "+
							 "from tu_rab_m a "+
							 "left join tu_proyek_app b on a.no_rab=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_appseb='-'  "+
							 "where a.no_rab ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.stsSimpan = 0;		
						this.e_noapp.setText(line.no_app);	
						this.e_memo.setText(line.catatan);

						this.e_dok.setText(line.no_dok);	
						this.e_nama.setText(line.keterangan);											
						this.cb_buat.setText(line.nik_rab);
						this.cb_pp.setText(line.kode_pp);
						this.cb_ppkelola.setText(line.pp_kelola);
						this.cb_cust.setText(line.kode_cust);
						this.cb_app.setText(line.nik_app);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.dp_d3.setText(line.tanggal_rab);
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.e_nomemo.setText(line.no_memo);

						this.e_ppn.setText(floatToNilai(line.ppn));
						this.e_pph4.setText(floatToNilai(line.pph4));
						
						this.periode = line.periode;
						
						var data = this.dbLib.getDataProvider("select * from tu_rab_d where jenis='PDPT' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgp.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sgp.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 
						else this.sgp.clear(1);	


						var data = this.dbLib.getDataProvider("select * from tu_rab_d where jenis='BEBAN' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 
						else this.sg.clear(1);	
						
						this.sgUpld.clear();
						this.deleteFiles = [];
						this.listFiles = new arrayMap();			
						var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from tu_rab_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_rab = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgUpld.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.listFiles.set(line.no_gambar,line.no_gambar); 
								this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
							}
						} else this.sgUpld.clear(1);


						var strSQL = "select * from tu_rab_cust where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){		
								this.e_namacust.setText(line.nama);
								this.e_alamat.setText(line.alamat);
								this.e_tel.setText(line.no_tel);						
								this.e_mail.setText(line.email);
								this.e_npwp.setText(line.npwp);
								this.e_alamat2.setText(line.alamat2);
								this.e_pic.setText(line.pic);	
								this.e_jabatan.setText(line.jabatan);	
							}
						}
												
						setTipeButton(tbUbahHapus);
					}
					else{
						this.stsSimpan = 1;
						this.sg.clear(1);
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}

			/*
			if ((sender == this.e_persenor || sender == this.e_nilai) && this.e_persenor.getText() != "" && this.e_nilai.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
			}
			*/
			
			if (sender == this.e_totrab && this.e_totrab.getText() != "") {								
				this.e_nilaior.setText(this.e_totrab.getText());

				if (this.e_nilai.getText()!= "0") {
					var persenOR = Math.round((nilaiToFloat(this.e_nilaior.getText()) / nilaiToFloat(this.e_nilai.getText())) * 10000) / 100;
					this.e_persenor.setText(floatToNilai(persenOR));					
				}
			}
			if (sender == this.cb_cust && this.cb_cust.getText()!="" && this.stsSimpan == 1) {	
				var strSQL = "select * from cust where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_namacust.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);						
						this.e_mail.setText(line.email);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);	
						this.e_jabatan.setText(line.jabatan);	
					}
				}
			}
			if (sender == this.cb_pp && this.cb_pp.getText()!="") {
				this.cb_jenis.setSQL("select kode_jenis,nama from tu_proyek_jenis where kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			}

			if (sender == this.cb_jenis && this.cb_jenis.getText()!="") {
				var strSQL = "select * from tu_proyek_jenis where kode_jenis='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					if (line != undefined){		
						this.e_jenissewa.setText(line.jenis_sewa);
						if (line.jenis_sewa == "SEWA") {
							this.e_ppn.setReadOnly(false);
							this.e_pph4.setReadOnly(false);
							this.e_ppn.setTag("1");
							this.e_pph4.setTag("1");
							this.bPPN.show();
							this.e_ppn.show();
							this.e_pph4.show();
						}
						else {
							this.e_ppn.setReadOnly(true);
							this.e_pph4.setReadOnly(true);
							this.e_ppn.setTag("9");
							this.e_pph4.setTag("9");
							this.bPPN.hide();
							this.e_ppn.hide();
							this.e_pph4.hide();
						}


						if (line.flag_memo == "1") {
							this.e_nomemo.setReadOnly(false);							
						}
						else {
							this.e_nomemo.setReadOnly(true);
							this.e_nomemo.setText("-");
						}
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCells: function(sender, col, row){
		if ((col == 1 || col == 2) && this.sg.cells(1,row) != "" && this.sg.cells(2,row) != "") this.sg.validasi();				
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.cells(1,i) != "" && this.sg.cells(2,i) != ""){
					var subttl = Math.round(nilaiToFloat(this.sg.cells(1,i)) * nilaiToFloat(this.sg.cells(2,i)) * 100) / 100; 
					this.sg.cells(3,i,subttl);
					tot += nilaiToFloat(this.sg.cells(3,i));					
				}
			}						
			this.e_totrab.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	

	doChangeCellsp: function(sender, col, row){
		if ((col == 1 || col == 2) && this.sgp.cells(1,row) != "" && this.sgp.cells(2,row) != "") this.sgp.validasi();				
	},
	doNilaiChangep: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sgp.getRowCount();i++){
				if (this.sgp.cells(1,i) != "" && this.sgp.cells(2,i) != ""){
					var subttl = Math.round(nilaiToFloat(this.sgp.cells(1,i)) * nilaiToFloat(this.sgp.cells(2,i)) * 100) / 100; 
					this.sgp.cells(3,i,subttl);
					tot += nilaiToFloat(this.sgp.cells(3,i));					
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	

	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },

	/*
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();

							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";

						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	*/


	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_tu_rptProyekRab";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rab='"+this.noRAB+"' ";
								this.filter2 = this.filter;
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
								this.allBtn = false									
								this.pc2.hide(); 
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_kode.getText()+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
			setTipeButton(tbAllFalse);
			this.stsSimpan = 1;				
			this.sg.clear(1);
			this.sg3.clear(1);
			this.sgUpld.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.doClick();	
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_rab,a.keterangan,b.kode_cust+'-'+b.nama as cust,a.nilai_or "+
		             "from tu_rab_m a "+
					 "	inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+	
					 "	inner join karyawan_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.nik='"+this.app._userLog+"' "+				 					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') ";
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
			this.sg3.appendData([line.no_rab,line.keterangan,line.cust,floatToNilai(line.nilai_or)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});