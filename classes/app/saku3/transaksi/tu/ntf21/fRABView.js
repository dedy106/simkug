window.app_saku3_transaksi_tu_ntf21_fRABView = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fRABView.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fRABView";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Verifikasi RAB Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true, visible:false});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"], visible:false});		
		
		this.pc2 = new pageControl(this,{bound:[10,12,1000,460], childPage:["Pengajuan RAB","Data RAB","Filter Cari"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,
		      colTitle:["No RAB","Customer","Deskripsi","Nilai Proyeksi","No Verifikasi","No NTF","Review"],
			  colWidth:[[6,5,4,3,2,1,0],[60,100,100,100,300,200,100]],
			  readOnly:true,
			  colFormat:[[3,6],[cfNilai,cfButton]],	
			  click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],													 
			  dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,11,200,20],caption:"No Approve", readOnly:true,visible:false});						
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 					
		this.cb_ppkelola = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"Unit Pengelola",tag:2,readOnly:true}); 					
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"No RAB", readOnly:true, change:[this,"doChange"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,358], childPage:["Data RAB","Detail PDPT", "Detail RAB","File Dokumen","Inisiasi Unit","Cattn Revisi"]});
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:2});						
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"No Kontrak", maxLength:50, tag:1});					
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Deskripsi", maxLength:200, tag:1,readOnly:true});			
		this.c_stsva = new saiCB(this.pc1.childPage[0],{bound:[520,16,200,20],caption:"Permintaan VA",items:["YA","TIDAK"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Png. Jawab",tag:1,readOnly:true}); 						
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,400,20],caption:"Bank", maxLength:100, tag:1, readOnly:true});					
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]}); 		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,400,20],caption:"Nama Rekening", maxLength:100, tag:1, readOnly:true});					
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18]}); 
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,14,400,20],caption:"No Rekening", maxLength:50, tag:1, readOnly:true, tipeText:ttAngka});					
		this.l_tgl4 = new portalui_label(this.pc1.childPage[0],{bound:[20,15,100,18],caption:"TglMax Adminstrsi", underline:true});
		this.dp_d4 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,15,98,18]}); 		
		this.e_nomemo = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,400,20],caption:"No Memo", maxLength:50, tag:1});													
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis",tag:2,multiSelection:false, change:[this,"doChange"]}); 								
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});	
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});										
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",readOnly:true});										
		this.e_join = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Ni JoinCost", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			
		this.e_totrab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Total RAB", tag:1, tipeText:ttNilai, text:"0", readOnly:true,   visible:false,change:[this,"doChange"]});						
		
		this.sgp = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
					colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal"],
					colWidth:[[3,2,1,0],[100,100,100,500]],
					//columnReadOnly:[true,[3],[]],
					readOnly:true,
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					pasteEnable:true,afterPaste:[this,"doAfterPastep"], 
					nilaiChange:[this,"doNilaiChangep"],change:[this,"doChangeCellsp"],autoAppend:true,defaultRow:1});
		this.sgnp = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sgp});		

		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Nilai Pajak PPh", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-63],colCount:4,tag:9,
		      		colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal"],
					colWidth:[[3,2,1,0],[100,100,100,500]],
					//columnReadOnly:[true,[3],[]],
					readOnly:true,
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					pasteEnable:true,afterPaste:[this,"doAfterPaste"], 
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg1mp2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-4,this.pc1.height-33],colCount:4,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3, pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            
		
		this.sg6 = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:9,
					colTitle:["No Agenda","Keterangan","ID Kegiatan","Deskripsi","Nilai Agenda","Tot JoinCost","Saldo Agenda","Ni JoinCost"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,250,120,200,100]],
					colHide:[[4,5],[true,true]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[7]],
					colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					nilaiChange:[this,"doNilaiChange6"],change:[this,"doChangeCell6"],	
					autoAppend:false,defaultRow:1});
		this.sgn6 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg6});		

		this.sgctt = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
			colTitle:["Catatan"],
			colWidth:[[0],[100]],					
			readOnly:true,autoAppend:false,defaultRow:1});

		this.c_status2 = new saiCB(this.pc2.childPage[2],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:9});
		this.cb_cust2 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Customer",tag:9,multiSelection:false}); 				
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,98,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);		
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);		
			
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[520,10,450,42],caption:"Catatan Verifikasi",tag:9});

		setTipeButton(tbAllFalse);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		this.maximize();		
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
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_ppkelola.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cust2.setSQL("select kode_cust,nama from prb_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_app.setSQL("select a.nik,a.nama from karyawan a where a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
			
			this.cb_pp.setText(this.app._kodePP);		
			this.c_status.setText("APPROVE");		
			this.doLoadCtt(this.cb_kode.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fRABView.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fRABView.implement({	
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
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
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
			if (this.stsSimpan==1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_proyek_app","no_app",this.app._lokasi+"-VF"+this.e_periode.getText().substr(2,4)+".","0000"));				
			else this.e_nb.setText(this.noAppLama);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="RETURN")  var prog = "R";												
										
					if (this.stsSimpan == 0) sql.add("delete from prb_proyek_app where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");

					//delete data rab_app sebelumnya (tidak perlu ada histori) krn prb_rabapp_m --> copy dari prb_rab_m
					sql.add("delete from prb_rabapp_m where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from prb_rabapp_d where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					
					sql.add("update prb_rab_m set progress='"+prog+"',no_memo='"+this.e_nomemo.getText()+"' where no_rab ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update prb_proyek_app set no_appseb = '"+this.e_nb.getText()+"' where no_appseb ='-' and no_bukti='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='VER_RAB'");
					

					if(this.c_status.getText()=="APPROVE")	{						
						sql.add("insert into prb_proyek_app (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,no_bukti,modul,no_appseb,catatan,no_rab,nik_app) values "+													   
								"('"+this.e_nb.getText()+"','"+this.dp_d3.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+this.cb_kode.getText()+"','VER_RAB','-','"+this.e_memo.getText()+"','"+this.cb_kode.getText()+"','-')");

						sql.add("insert into prb_rabapp_m(no_app,no_rab,keterangan,kode_lokasi,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nik_app,progress,kode_proyek,pp_kelola,periode,no_dok, no_memo,ppn,pph42,no_appntf,no_appaktif, sts_va,bank,nama_rek,no_rek,tgl_admin) values "+	
								"('"+this.e_nb.getText()+"','"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.kodeCust+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+
								this.cb_jenis.getText()+"','"+this.cb_app.getText()+"','"+prog+"','-','"+this.cb_ppkelola.getText()+"','"+this.periode+"','"+this.e_dok.getText()+"', '"+this.e_nomemo.getText()+"',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph4.getText())+",'-','-', '"+this.c_stsva.getText()+"','"+this.e_bank.getText()+"','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.dp_d4.getDateString()+"')"); //"+this.e_nomemo.getText()+"  
				
						for (var i=0;i < this.sgp.getRowCount();i++){
							if (this.sgp.rowValid(i)){								
								sql.add("insert into prb_rabapp_d(no_app,no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sgp.cells(0,i)+"',"+nilaiToFloat(this.sgp.cells(1,i))+","+nilaiToFloat(this.sgp.cells(2,i))+","+nilaiToFloat(this.sgp.cells(3,i))+",'PDPT')");
							}
						}

						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into prb_rabapp_d(no_app,no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'BEBAN')");
							}							
						}
						
						if (nilaiToFloat(this.e_pph4.getText()) != 0) {
							sql.add("insert into prb_rabapp_d(no_app,no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_kode.getText()+"','"+this.app._lokasi+"',999,'PPh Atas RAB: "+this.cb_kode.getText()+"',1,"+nilaiToFloat(this.e_pph4.getText())+","+nilaiToFloat(this.e_pph4.getText())+",'BEBAN')");
						}


						//delete data joincost yg pakai nobukti --> no_rab
						sql.add("delete from prb_prbeban_d where no_bukti='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from prb_prbdd_d where no_bukti='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						for (var i=0;i < this.sg6.getRowCount();i++) {
							if (this.sg6.rowValid(i)) {							
								if (nilaiToFloat(this.sg6.cells(7,i)) != 0) {
									sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
											"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.periode+"','"+this.periode+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','-','"+this.e_nama.getText()+"','D',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.cb_kode.getText()+"','AJUBEBAN','"+this.sg6.cells(0,i)+"','NONITAJU')");		
									sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
											"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.periode+"','"+this.periode+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','-','"+this.e_nama.getText()+"','C',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.sg6.cells(2,i)+"','AJUBEBAN','-','NONITAJU')");
									
									sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
											"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.periode+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','"+this.e_nama.getText()+"','D',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.app._userLog+"','"+this.cb_kode.getText()+"','NTF10')");
									sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
											"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.periode+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','"+this.e_nama.getText()+"','C',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.app._userLog+"','"+this.sg6.cells(2,i)+"','NTF10')");		
								}
							}
						}

					}		
					else {
						sql.add("insert into prb_proyek_app (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,no_bukti,modul,no_appseb,catatan,no_rab) values "+													   
								"('"+this.e_nb.getText()+"','"+this.dp_d3.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+this.cb_kode.getText()+"','VER_RAB','-','"+this.e_memo.getText()+"','"+this.cb_kode.getText()+"')");
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
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;				
					this.sg.clear(1);
					this.sgp.clear(1);
					this.sg3.clear(1);
					this.sg1mp2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);								
					this.doLoad3();			
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.dp_d2.getText());
				var d4 = d.strToDate(this.dp_d4.getText());

				if (d1 > d2) {
					system.alert(this,"Tgl Proyek tidak valid.","Tanggal Mulai harus lebih awal dari Tanggal Selesai");
					return false;
				}
				if (d1 > d4) {						
					system.alert(this,"Tgl Max Administrasi tidak valid.","Tgl Max Administrasi tidak boleh lebih awal dari Tgl Mulai Proyek");
					return false;
				}
				if (this.c_stsva.getText() == "TIDAK") {
					if (this.e_bank.getText() == "-" || this.e_namarek.getText() == "-" || this.e_norek.getText() == "-") {
						system.alert(this,"Data Bank dan Rekening tidak valid.","Data bank dan rekening tidak boleh '-' (strip)");
						return false;
					}
				}
				if (nilaiToFloat(this.e_nilaior.getText()) < nilaiToFloat(this.e_join.getText())) {
					system.alert(this,"Nilai JoinCost tidak valid.","Nilai JoinCost melebihi Nilai OR.");
					return false;
				}
				if (nilaiToFloat(this.e_nilaior.getText()) != nilaiToFloat(this.e_totrab.getText())) {
					system.alert(this,"Nilai OR tidak valid.","Nilai OR tidak sama dengan Total RAB.");
					return false;
				}
				if (this.e_nomemo.getText()=="" || this.e_nomemo.getText()=="-") {
					system.alert(this,"No Memo tidak valid.","No Memo harus terisi.");
					return false;
				}
				else this.simpan();								
				break;				
			case "simpancek" : this.simpan();			
				break;							
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();				
				sql.add("delete from prb_proyek_app where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from prb_rabapp_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from prb_rabapp_d where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update prb_rab_m set progress='0',no_memo='-' where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.doLoad3();
	},		
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != "") {					
				if (this.noAppLama == "-") {	
					setTipeButton(tbSimpan);				
					var strSQL = "select a.* from prb_rab_m a where a.versi='NTF21' and a.no_rab ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";									
				}
				else {
					setTipeButton(tbUbahHapus);
					var strSQL = "select a.* from prb_rabapp_m a where a.no_rab ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				}

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						if (this.noAppLama != "-") {
							var strSQL = "select catatan from prb_proyek_app where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'";
							var data2 = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data2 == "object"){
								var line2 = data2.rs.rows[0];							
								if (line2 != undefined) {	
									this.e_memo.setText(line2.catatan);
								}
							}
						}

						this.kodeCust = line.kode_cust;																	
						this.e_nama.setText(line.keterangan);
						this.e_dok.setText(line.no_dok);
						this.cb_pp.setText(line.kode_pp);
						this.cb_ppkelola.setText(line.pp_kelola);	
						this.cb_jenis.setSQL("select kode_jenis,nama from prb_proyek_jenis where kode_pp='"+line.pp_kelola+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);								
						if (line.kode_jenis != "-") this.cb_jenis.setText(line.kode_jenis);
						
						this.periode = line.periode;
						this.cb_app.setText(line.nik_app);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.dp_d4.setText(line.tgl_admin);						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));							
						this.e_ppn.setText(floatToNilai(line.ppn));
						this.e_pph4.setText(floatToNilai(line.pph42));
						
						if (this.noAppLama != "-") {
							this.cb_jenis.setText(line.kode_jenis);					
							this.e_nomemo.setText(line.no_memo);
						}
						else this.e_nomemo.setText("-");

						this.c_stsva.setText(line.sts_va);
						this.e_bank.setText(line.bank);
						this.e_namarek.setText(line.nama_rek);
						this.e_norek.setText(line.no_rek);

						this.bankRAB = line.bank;
						this.namarekRAB = line.nama_rek;
						this.norekRAB = line.no_rek;
						

						if (this.noAppLama == "-") //RAB baru atao amandemen
							var data = this.dbLib.getDataProvider("select * from prb_rab_d where jenis='PDPT' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);							 						
						else var data = this.dbLib.getDataProvider("select * from prb_rabapp_d where jenis='PDPT' and no_app='"+this.noAppLama+"' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);						

						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgp.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sgp.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 
						else this.sgp.clear(1);	
						
						//999 = pph; sudah diload diatas, tidak perlu di load di grid
						if (this.noAppLama == "-") 
							var data = this.dbLib.getDataProvider("select * from prb_rab_d where jenis='BEBAN' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nu<>999 order by nu",true);													
						else var data = this.dbLib.getDataProvider("select * from prb_rabapp_d where jenis='BEBAN' and no_app='"+this.noAppLama+"' and no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nu<>999 order by nu",true);

						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 
						else this.sg.clear(1);	
						
						this.sg1mp2.clear();
						var data = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar from prb_rab_dok a inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_rab = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);														
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1mp2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];													 
								this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
							}
						} else this.sg1mp2.clear(1);	

						//inisiasi join cost
						var strSQL = "select a.no_bukti,a.keterangan,a.kode_proyek,d.nama,a.nilai as ni_agenda, isnull(c.joincost,0) as joincost, a.nilai - isnull(c.joincost,0) as sisa_agenda,isnull(e.nilai_join,0) as nilai_join "+
									"from prb_prbeban_d a "+
									"inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
									"inner join prb_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+

									"left join ( "+
									"			select no_ref1,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as joincost "+
									"			from prb_prbeban_d "+
									"			where kode_lokasi = '"+this.app._lokasi+"' and kode_proyek<>'"+this.cb_kode.getText()+"' group by no_ref1,kode_lokasi "+
									") c on a.no_bukti=c.no_ref1 and a.kode_lokasi=c.kode_lokasi "+

									"left join ( "+
									"			select no_ref1,kode_lokasi,sum(case dc when 'D' then nilai else 0 end) as nilai_join "+
									"			from prb_prbeban_d "+
									"			where kode_lokasi = '"+this.app._lokasi+"' and kode_proyek='"+this.cb_kode.getText()+"' group by no_ref1,kode_lokasi "+
									") e on a.no_bukti=e.no_ref1 and a.kode_lokasi=e.kode_lokasi "+

									"where d.kode_pp ='"+this.cb_pp.getText()+"' and b.form in ('NTF05','NTF07') and dc='D' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"      and a.nilai > isnull(c.joincost,0) and (b.no_kas<>'-' or b.no_juspb<>'-') order by a.no_bukti";						

						var data2 = this.dbLib.getDataProvider(strSQL,true);							
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg6.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];										
								this.sg6.appendData([line2.no_bukti,line2.keterangan,line2.kode_proyek,line2.nama,floatToNilai(line2.ni_agenda),floatToNilai(line2.joincost),floatToNilai(line2.sisa_agenda),floatToNilai(line2.nilai_join)]);
							}
						} else this.sg6.clear(1);

					}					
				}
			}	

			if (sender == this.e_pph4 && this.e_pph4.getText() != "") {		
				this.sg.validasi();
			}
			if (sender == this.e_totrab && this.e_totrab.getText() != "") {								
				this.e_nilaior.setText(this.e_totrab.getText());
				if (this.e_nilai.getText()!= "0") {
					var persenOR = Math.round((nilaiToFloat(this.e_nilaior.getText()) / nilaiToFloat(this.e_nilai.getText())) * 10000) / 100;
					this.e_persenor.setText(floatToNilai(persenOR));					
				}
			}

			if (sender == this.c_stsva && this.c_stsva.getText()!="") {
				if (this.c_stsva.getText() == "YA") {
					this.e_bank.setReadOnly(true);
					this.e_namarek.setReadOnly(true);
					this.e_norek.setReadOnly(true);
					this.e_bank.setText("-");
					this.e_namarek.setText("-");
					this.e_norek.setText("-");
				}
				else {
					this.e_bank.setReadOnly(false);
					this.e_namarek.setReadOnly(false);
					this.e_norek.setReadOnly(false);
					if (this.stsSimpan==1) {
						//ambil data sebelumnya (form RAB)
						this.e_bank.setText(this.bankRAB);
						this.e_namarek.setText(this.namarekRAB);
						this.e_norek.setText(this.norekRAB);
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
			tot += nilaiToFloat(this.e_pph4.getText());	
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
	doChangeCell6: function(sender, col, row){
		if (col == 7 && this.sg6.cells(7,row) != "") this.sg6.validasi();				
	},
	doNilaiChange6: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg6.getRowCount();i++){
				if (this.sg6.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg6.cells(7,i));					
				}
			}						
			this.e_join.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("doNilaiChange6:"+e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_tu_proyek_rptFormRAB";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rab='"+this.cb_kode.getText()+"' ";
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
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;				
			this.sg.clear(1);
			this.sgp.clear(1);
			this.sg3.clear(1);
			this.sg1mp2.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);								
			this.doLoad3();			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		this.pc2.setActivePage(this.pc2.childPage[0]);																			
		var strSQL = "select distinct a.no_rab,b.nama,a.keterangan,a.nilai,'-' as no_app,'-' as no_apppr "+
					 "from prb_rab_m a "+					 
					 "		inner join prb_rab_cust b on a.no_rab=b.no_rab and a.kode_lokasi=b.kode_lokasi "+	
					 "		inner join prb_rab_pp d on a.kode_pp=d.pp_rab and a.kode_lokasi=d.kode_lokasi and d.pp_ver='"+this.app._kodePP+"' "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress = '0' and a.versi='NTF21' "+ 				
					 "order by a.no_rab desc";	

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
			this.sg3.appendData([line.no_rab,line.nama,line.keterangan,floatToNilai(line.nilai),line.no_app,line.no_apppr,"Review"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 6) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				
				//noapplama='-' && noappproyek != '-' ---> statusnya adalah amandemen
				this.noAppLama = this.sg3.cells(4,row);	
				this.noAppPoyek = this.sg3.cells(5,row);			
				this.cb_kode.setText(this.sg3.cells(0,row));		
				this.doLoadCtt(this.cb_kode.getText());

				if (this.noAppLama == "-") {
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_proyek_app","no_app",this.app._lokasi+"-VF"+this.e_periode.getText().substr(2,4)+".","0000"));				
					this.c_status.setFocus();
				}
				
			}									
		} catch(e) {alert(e);}
	},
	doCari:function(sender){			
		this.stsSimpan=0;		
		setTipeButton(tbUbahHapus);			
		var filter = " and c.status = '"+this.c_status2.getText()+"' ";

		var strSQL = "select distinct a.no_rab,b.nama,a.keterangan,a.nilai,c.no_app, isnull(e.kode_proyek,'-') as no_apppr "+
					 "from prb_rab_m a "+
					 "  inner join prb_rab_cust b on a.no_rab=b.no_rab and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "  inner join prb_proyek_app c on a.no_rab=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.no_appseb='-' and c.modul='VER_RAB' "+					 
					 "  inner join prb_rab_pp f on f.pp_rab=a.kode_pp and f.kode_lokasi=a.kode_lokasi and f.pp_ver='"+this.app._kodePP+"' "+
					 "	left join prb_rabapp_m e on a.no_rab=e.no_rab and a.kode_lokasi=e.kode_lokasi "+
					 "where a.versi='NTF21' and a.progress in ('1','R') and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" and a.kode_cust='"+this.cb_cust2.getText()+"' order by a.no_rab desc";			

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);	
		this.pc2.setActivePage(this.pc2.childPage[0]);	
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal from prb_proyek_app "+
						 			 "where no_rab='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' and no_app<>'"+this.noAppLama+"' "+
									 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 300px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_app, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from prb_proyek_app "+
								  "where no_rab='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' and no_app<>'"+this.noAppLama+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_app+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});