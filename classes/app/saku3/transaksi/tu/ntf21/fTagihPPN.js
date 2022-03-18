window.app_saku3_transaksi_tu_ntf21_fTagihPPN = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fTagihPPN.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fTagihPPN";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Penerimaan Faktur PPN Tagihan Proyek [Jurnal PPN]", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[520,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Bill","Data Bill","Filter Cari"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9,
		     		colTitle:["No Tagihan","Tanggal","Deskripsi","No Proyek","Customer","Nilai","PPN","Pilih"],
					colWidth:[[7,6,5,4,3,2,1,0],[70,80,100,130,120,270,80,100]],
					click:[this,"doSgBtnClick3"], colAlign:[[7],[alCenter]],													 
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfButton]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"No Approve", readOnly:true,visible:false});				
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});		
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"NIK Approve",tag:2,multiSelection:false});
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[20,10,450,40],caption:"Cat. Verifikator",tag:9});		
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,306], childPage:["Data Proyek","Detail Tagihan","File Dokumen","Cattn Memo"]});
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 							
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"ID Proyek", readOnly:true});									
		this.e_rab = new saiLabelEdit(this.pc1.childPage[0],{bound:[250,11,200,20],caption:"No RAB",readOnly:true});							
		this.dp_d1 = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,11,200,20],caption:"Tgl Mulai", maxLength:200, tag:1,readOnly:true});
		this.dp_d2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[740,11,200,20],caption:"Tgl Selesai", maxLength:200, tag:1,readOnly:true});
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,430,20],caption:"No Kontrak", maxLength:50, tag:1,readOnly:true});	
		this.dp_d4 = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,10,200,20],caption:"TglMax Admintrsi", maxLength:200, tag:1,readOnly:true});				
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,430,20],caption:"Deskripsi", maxLength:200, tag:1,readOnly:true});	
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis",tag:1,readOnly:true}); 						
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,17,420,20],caption:"Bank VA", tag:1, readOnly:true});			
		this.e_bill = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Tagihan", maxLength:200, tag:1,readOnly:true, change:[this,"doChange"]});				
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,11,420,20],caption:"Nama Rekening",readOnly:true,tag:1});			
		this.dp_d5 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Tgl Tagihan", maxLength:200, tag:1,readOnly:true});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,12,420,20],caption:"No Rekening", readOnly:true, tag:1});			
		this.e_cust = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,410,20],caption:"Customer", maxLength:200, tag:1,readOnly:true});				
		this.c_wapu = new saiCB(this.pc1.childPage[0],{bound:[520,13,200,20],caption:"Status WAPU",items:["WAPU","NON"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});	
		this.e_ketbil = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,420,20],caption:"Deskripsi Tagihan", maxLength:200, tag:1,readOnly:true});						
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Ni. Potongan", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"],readOnly:true});										
		this.e_akunpiu = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,340,20],caption:"Akun Piutang", readOnly:true, tag:1});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});	
		this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,19,340,20],caption:"File F-Pajak", readOnly:true, tag:1});		
		this.bLihat = new button(this.pc1.childPage[0],{bound:[865,19,70,18],caption:"Lihat File",click:[this,"doLihat"]});					
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:0,
					colTitle:["Deskripsi","Harga Satuan","Quantity","SubTotal"],
					colWidth:[[3,2,1,0],[100,100,100,500]],
					columnReadOnly:[true,[0,1,2,3],[]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],									
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		

		this.sg1mp2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-4,this.pc1.height-33],colCount:4,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3,pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            

		this.sgctt = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});

		this.c_status2 = new saiCB(this.pc2.childPage[2],{bound:[20,10,200,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_cust2 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"by :Customer",tag:9,multiSelection:false}); 				
		this.cb_proyek2 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,13,220,20],caption:"by :ID Proyek",tag:9,multiSelection:false}); 				
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,98,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);	

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

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
			this.cb_cust2.setSQL("select kode_cust,nama from prb_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from prb_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);			
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
			
			this.dataPP = this.app._pp;	
			this.cb_pp.setText(this.app._kodePP);		
			this.cb_app.setText(this.app._userLog);

			this.doLoadCtt(this.e_bill.getText());

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN','AKUNTAKLKH','LOKLAKHAR') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;
					if (line.kode_spro == "AKUNTAKLKH") this.akunTAK = line.flag;
					if (line.kode_spro == "LOKLAKHAR") this.lokTerima = line.flag;													
				}
			}						

			this.c_wapu.setText("");
			this.c_status2.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fTagihPPN.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fTagihPPN.implement({	
	doLihat: function(sender){
		try{
			if (sender == this.bLihat) {
				if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
			}		
		}catch(e){
			alert(e);
		}
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_bill_app","no_app",this.app._lokasi+"-JB"+this.e_periode.getText().substr(2,4)+".","0000"));				
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.c_status.getText()=="APPROVE") var prog = "3"; 					
					else {
						if (this.nilaiPPN == 0) var prog = "Y"; //---> kembali ke tagihan (ftagihan.js)						
						else var prog = "X"; //---> kembali ke ypt (validasi ppn di ypt ftagihvalidypt.js)						
						
					}
					
					sql.add("update prb_bill_app set no_appseb='"+this.e_nb.getText()+"' where no_bukti ='"+this.e_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_appseb='-' and modul='VERPPN'");
					sql.add("update prb_prbill_m set sts_wapu='"+this.c_wapu.getText()+"',progress='"+prog+"',no_verppn='"+this.e_nb.getText()+"' where no_bill ='"+this.e_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");


					if (this.c_status.getText()=="APPROVE") {					
						sql.add("insert into prb_bill_app (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,no_bukti,modul,no_appseb,catatan,no_bill,nik_app) values "+
								"('"+this.e_nb.getText()+"','"+this.dp_d3.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+this.e_bill.getText()+"','VERPPN','-','"+this.e_memo.getText()+"','"+this.e_bill.getText()+"','"+this.cb_app.getText()+"')");
						
						if (this.klpProyek == "SEWA") {
							var akunLawan = this.akunPyt;
							var kodeDRK = "-";
						}
						else {
							var akunLawan = this.akunPdpt;
							var kodeDRK = this.kodeDRK;
						}

						sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','PRPIU','F','-','-','"+this.ppProyek+"','"+this.dp_d3.getDateString()+"','"+this.e_bill.getText()+"','"+this.e_ketbil.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",0,'"+this.app._userLog+"','"+this.app._userLog+"','-','"+this.cb_kode.getText()+"','-','-','-','-','-')");
													
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_bill.getText()+"','"+this.dp_d3.getDateString()+"',0,'"+this.akunPiutang+"','D',"+nilaiToFloat(this.e_total.getText())+","+
								nilaiToFloat(this.e_total.getText())+",'"+this.e_ketbil.getText()+"','PRPIU','PIU','IDR',1,'"+this.ppProyek+"','-','-','-','-','-','-','-','-')");				
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_bill.getText()+"','"+this.dp_d3.getDateString()+"',1,'"+akunLawan+"','C',"+nilaiToFloat(this.e_nilai.getText())+","+
								nilaiToFloat(this.e_nilai.getText())+",'"+this.e_ketbil.getText()+"','PRPIU','LAWAN','IDR',1,'"+this.ppProyek+"','"+kodeDRK+"','-','-','-','-','-','-','-')");				
													
						if (this.c_wapu.getText() == "NON" && nilaiToFloat(this.e_ppn.getText()) != 0) {		
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_bill.getText()+"','"+this.dp_d3.getDateString()+"',2,'"+this.akunPPN+"','C',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.e_ketbil.getText()+"','PRPPN','PPN','IDR',1,'"+this.ppProyek+"','-','-','-','-','-','-','-','-')");				
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_bill.getText()+"','"+this.dp_d3.getDateString()+"',3,'"+this.akunPPN+"','D',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.e_ketbil.getText()+"','PRTAKPPN','PPN','IDR',1,'"+this.ppProyek+"','-','-','-','-','-','-','-','-')");				
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_bill.getText()+"','"+this.dp_d3.getDateString()+"',4,'"+this.akunTAK+"','C',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.e_ketbil.getText()+"','PRTAKPPN','TAK','IDR',1,'"+this.ppProyek+"','-','-','-','-','-','-','-','-')");						

							//postingnya dari trans_m		
							sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d3.getDateString()+"','-','"+this.e_ketbil.getText()+"','"+this.app._kodePP+"','PRTAKPPN','KIRIM','IDR',1,"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','X','-','-','"+this.akunTAK+"',getdate(),'"+this.app._userLog+"','"+this.lokTerima+"','0','-','"+this.dp_d3.getDateString()+"')");																
							sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d3.getDateString()+"',999,'"+this.akunTAK+"','"+this.e_ketbil.getText()+"','C',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.ppProyek+"','-','"+this.app._lokasi+"','PRTAKPPN','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");						
						}
					}


					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from takkirim_m	 where no_kirim='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");								
						sql.add("delete from takkirim_j	 where no_kirim='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;									
					this.sg3.clear(1);
					this.sg1mp2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doClick();		
					this.doLoad3();		
					this.pc2.show();   
					this.c_wapu.setText("");
				break;
			case "simpan" :	
			case "ubah" :	
				if (nilaiToFloat(this.e_ppn.getText()) != 0) this.e_file.setTag("1");
				else this.e_file.setTag("9");

				this.preView = "1";	
				this.simpan();					
				break;				
			case "simpancek" : this.simpan();			
				break;							
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();	

				if (this.nilaiPPN == 0) var vProg = "1"; else var vProg = "2";
				sql.add("update prb_prbill_m set progress='"+vProg+"',no_verppn='-' where no_bill ='"+this.e_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from prb_bill_app where no_app='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");

				sql.add("delete from trans_m where no_bukti='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from trans_j where no_bukti='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from takkirim_m	 where no_kirim='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from takkirim_j	 where no_kirim='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");								
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.doLoad3();
		this.doClick();		
	},			
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1); 
			this.sg3.clear(1); 	
			this.sg1mp2.clear(1);		
		}
		this.noVerLama = "-";
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_bill_app","no_app",this.app._lokasi+"-JB"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.c_status.setFocus();
		setTipeButton(tbSimpan);			
	},		
	doChange: function(sender){
		try{
			if (sender == this.e_bill && this.e_bill.getText() != ""){ 
				var strSQL = "select a.*, a.kode_pp as pp_kelola,d.akun_piutang,c.kelompok,c.akun_pyt,c.akun_pdpt,c.kode_drkp,c.jenis_pph42,x.no_rab,d.no_bill,convert(varchar,d.tanggal,103) as tgl_bill,d.keterangan as ket_bil,d.nilai as nilai_bil,d.diskon,d.nilai_ppn as ppn_bil,d.no_verppn,d.sts_wapu, y.nama as nama_akun "+
							 "from prb_proyek a "+
							 "inner join prb_prbill_m d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+
							 "inner join prb_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
							 "inner join prb_rabapp_m x on a.kode_proyek=x.kode_proyek and a.kode_lokasi=x.kode_lokasi "+							 
							 "inner join masakun y on d.akun_piutang=y.kode_akun and d.kode_lokasi=y.kode_lokasi "+
							 "where a.versi='NTF21' and d.no_bill ='"+this.e_bill.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"'";	

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						
						if (this.stsSimpan == 0) {
							this.noVerLama = line.no_verppn;		
							this.c_wapu.setText(line.sts_wapu);
						}
						this.doLoadCtt(this.e_bill.getText());
						
						this.e_rab.setText(line.no_rab);								
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.dp_d4.setText(line.tgl_admin);	
						this.dp_d5.setText(line.tgl_bill);																														
						this.e_ketbil.setText(line.ket_bil);	
						this.e_akunpiu.setText(line.akun_piutang+" | "+line.nama_akun);								
						this.e_nilai.setText(floatToNilai(line.nilai_bil));
						this.e_diskon.setText(floatToNilai(line.diskon));
						this.e_ppn.setText(floatToNilai(line.ppn_bil));
						this.nilaiPPN = parseFloat(line.ppn_bil);
						this.cb_jenis.setText(line.kode_jenis);		
						this.e_bank.setText(line.bank);
						this.e_namarek.setText(line.nama_rek);
						this.e_norek.setText(line.no_rek);
						this.ppProyek = line.pp_kelola;

						this.akunPiutang = line.akun_piutang;
						this.akunPyt = line.akun_pyt;
						this.akunPdpt = line.akun_pdpt;
						this.klpProyek = line.kelompok;
						this.kodeDRK = line.kode_drkp;
						
						var strSQL = "select a.keterangan,a.jumlah,a.harga,a.total "+
									"from prb_prbill_d a  "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill = '"+this.e_bill.getText()+"' "+
									"order by a.nu ";
						var data = this.dbLib.getDataProvider(strSQL,true);
						var tot = 0;
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg2.appendData([line.keterangan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total)]);						
							}												
						} else this.sg2.clear(1);		
						
						this.sg1mp2.clear();
						//fpajak tidak ditampilkan digrid
						var data = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar from prb_rab_dok a inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where nu <> 888 and a.no_ref = '"+this.e_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1mp2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];													 
								this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
							}
						} else this.sg1mp2.clear(1);						
					}	
					
					//faktur ppn
					var data = this.dbLib.getDataProvider("select a.* from prb_rab_dok a where a.nu = 888 and a.no_ref='"+this.e_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_file.setText(line.no_gambar);							
						}
					}

					var strSQL = "select catatan from prb_bill_app where no_app='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
					var data3 = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data3 == "object"){
						var line3 = data3.rs.rows[0];							
						if (line3 != undefined){		
							this.e_memo.setText(line3.catatan);
						}
					}	
					
				}
			}
			
			if ((sender == this.e_ppn || sender == this.e_nilai) && this.e_ppn.getText() != "" && this.e_nilai.getText() != "") {				
				var tot = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_diskon.getText()) + nilaiToFloat(this.e_ppn.getText());
				this.e_total.setText(floatToNilai(tot));
			}

			if (sender==this.c_status2 && this.c_status2.getText()!="") {
				this.getDataProyek();
			}

			if (sender==this.c_wapu && this.c_wapu.getText()!="") {
				if (this.c_wapu.getText()=="WAPU") this.e_ppn.setText("0");
			}
	
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){		
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_tu_proyek_rptAkruJurnalPpnFaktur";
								this.nama_report="server_report_saku3_tu_ntf21_rptAkruJurnalPpnFaktur";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;							
			this.sg3.clear(1);
			this.sg1mp2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.doClick();		
			this.doLoad3();					
			this.pc2.show(); 
			this.c_wapu.setText("");
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		this.pc2.setActivePage(this.pc2.childPage[0]);																			
		var strSQL = "select c.no_bill,convert(varchar,c.tanggal,103) as tgl,c.keterangan,a.kode_proyek,b.nama,c.nilai,c.nilai_ppn "+
					 "from prb_prbill_m c "+
					 "inner join prb_proyek a on c.kode_proyek=a.kode_proyek and c.kode_lokasi=a.kode_lokasi and a.versi='NTF21' "+
					 "inner join prb_rabapp_m d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+					 					 
					 //"inner join prb_rab_cust b on d.no_rab=b.no_rab and d.kode_cust=b.kode_cust and d.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "inner join prb_prbill_cust b on c.no_bill=b.no_bill and c.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "where ((c.nilai_ppn<>0 and c.progress ='2') or (c.nilai_ppn=0 and c.progress ='1')) and c.kode_lokasi='"+this.app._lokasi+"'  order by c.no_bill";					 	
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
			this.sg3.appendData([line.no_bill,line.tgl,line.keterangan,line.kode_proyek,line.nama,floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 7) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(3,row));												
				this.e_bill.setText(this.sg3.cells(0,row));												
				this.e_cust.setText(this.sg3.cells(4,row));				
			}									
		} catch(e) {alert(e);}
	},
	getDataProyek: function() {
		if (this.c_status2.getText() == "APPROVE") filter = " and c.progress = '3' ";
		if (this.c_status2.getText() == "REVISI") filter = " and c.progress = 'X' "; 	

		var strSQL = "select a.kode_proyek,c.keterangan "+
					 "from prb_prbill_m c "+
					 "inner join prb_proyek a on c.kode_proyek=a.kode_proyek and c.kode_lokasi=a.kode_lokasi and a.versi='NTF21' "+
					 "inner join prb_rabapp_m d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+					 					 
					 "inner join prb_rab_cust b on d.no_rab=b.no_rab and d.kode_cust=b.kode_cust and d.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "where c.kode_lokasi='"+this.app._lokasi+"' "+filter;	

		this.cb_proyek2.setSQL(strSQL,["a.kode_proyek","c.keterangan"],false,["ID PRoyek","Deskripsi"],"and","Data Proyek",true);

	},
	doCari:function(sender){	
		this.stsSimpan=0;		
		setTipeButton(tbUbahHapus);		
		
		if (this.c_status2.getText() == "APPROVE") filter = " and c.progress = '3' ";
		if (this.c_status2.getText() == "REVISI") filter = " and c.progress = 'X' "; 		

		if (this.cb_proyek2.getText() == "") var filter = " and b.kode_cust='"+this.cb_cust2.getText()+"' ";
		else var filter = " and a.kode_proyek='"+this.cb_proyek2.getText()+"' ";
		
		var strSQL = "select c.no_bill,convert(varchar,c.tanggal,103) as tgl,c.keterangan,a.kode_proyek,b.nama,c.nilai,c.nilai_ppn "+
					 "from prb_prbill_m c "+
					 "inner join prb_proyek a on c.kode_proyek=a.kode_proyek and c.kode_lokasi=a.kode_lokasi and a.versi='NTF21' "+
					 "inner join prb_rabapp_m d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+					 					 
					 "inner join prb_rab_cust b on d.no_rab=b.no_rab and d.kode_cust=b.kode_cust and d.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "where c.kode_lokasi='"+this.app._lokasi+"' "+filter;	

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
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal from prb_bill_app "+
						 			 "where no_bill='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' and no_app<>'"+this.noVerLama+"' "+
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
								  "from prb_bill_app "+
								  "where no_bill='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' and no_app<>'"+this.noVerLama+"' "+
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